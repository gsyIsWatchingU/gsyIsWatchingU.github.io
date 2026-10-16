"""自有 CUDA 工位：软骨心 ARAP、原曲面共享接缝、局部拉伸/接触约束。"""
import argparse
import hashlib
import json
import os
import struct
import socket
import subprocess
import time
from pathlib import Path

import numpy as np
from scipy import sparse
from scipy.spatial import cKDTree
from scipy.spatial.transform import Rotation
from cat_volume_skin import VolumeSkin


def read_skin(path):
    raw = Path(path).read_bytes()
    n = struct.unpack_from('<I', raw, 12)[0]
    g = json.loads(raw[20:20+n])
    blob = raw[28+n:]
    def array(index):
        a = g['accessors'][index]
        b = g['bufferViews'][a['bufferView']]
        dtype = {5126: np.float32, 5125: np.uint32, 5123: np.uint16, 5121: np.uint8}[a['componentType']]
        size = {'VEC3': 3, 'VEC4': 4, 'SCALAR': 1}[a['type']]
        width = np.dtype(dtype).itemsize
        return np.ndarray((a['count'], size), dtype=dtype, buffer=blob, offset=b.get('byteOffset', 0)+a.get('byteOffset', 0), strides=(b.get('byteStride', size*width), width)).copy()
    primitives = [g['meshes'][node['mesh']]['primitives'][0] for node in g['nodes'] if 'mesh' in node]
    return np.concatenate([array(p['attributes']['JOINTS_0']) for p in primitives]), np.concatenate([array(p['attributes']['WEIGHTS_0']) for p in primitives])


class CudaCatSkin(VolumeSkin):
    def __init__(self, root, iterations=20, dual_quaternion_poses=('side', 'prone')):
        import cupy as cp
        import cupyx.scipy.sparse as gpu_sparse
        self.cp = cp
        self.iterations = iterations
        self.dual_quaternion_poses = set(dual_quaternion_poses)
        super().__init__(root/'anatomy-neutral.glb', root/'anatomy-skeleton.json', root/'pillow-surface.json', prepare_factor=False)
        joints = json.loads((root/'anatomy-skeleton.json').read_text())
        self.joint_names = [j['name'] for j in joints]
        self.centers = np.array([j['position'] for j in joints])
        count = len(self.rest)
        ids, skin_weights = read_skin(root/'anatomy-neutral.glb')
        source_ids = ids[self.unique]
        source_weights = skin_weights[self.unique]
        head_ids = [i for i, name in enumerate(self.joint_names) if name == 'DEF_head' or name.startswith('DEF_ear')]
        torso_ids = [i for i, name in enumerate(self.joint_names) if name.startswith(('DEF_pelvis', 'DEF_spine', 'DEF_chest'))]
        paw_ids = [i for i, name in enumerate(self.joint_names) if name.endswith(('_paw', '_toe'))]
        head_mass = np.sum(source_weights*np.isin(source_ids, head_ids), axis=1)
        rigid_head_mass = np.max(source_weights*np.isin(source_ids, head_ids), axis=1)
        torso_mass = np.sum(source_weights*np.isin(source_ids, torso_ids), axis=1)
        paw_mass = np.sum(source_weights*np.isin(source_ids, paw_ids), axis=1)
        # 骨心是软目标；只有原头骨与脚底使用刚性锚点，避免两条骨心硬夹出膜片。
        self.fixed[:self.volume_count] = False
        surface_rest = self.rest[self.volume_count:]
        self.fixed[self.volume_count:] = (rigid_head_mass > .985) | (surface_rest[:, 1] < .025)
        self.free = np.where(~self.fixed)[0]
        self.pins = np.where(self.fixed)[0]
        self.free_mask = cp.asarray(~self.fixed)
        self.pins_gpu = cp.asarray(self.pins)
        self.free_gpu = cp.asarray(self.free)
        self.rest_gpu = cp.asarray(self.rest, dtype=cp.float32)
        self.a_gpu = cp.asarray(self.a)
        self.b_gpu = cp.asarray(self.b)
        # 曲面边保留轮廓，内部笼保持体积传递，连接边阻止表皮脱离内部。
        surface_edge = (self.a >= self.volume_count) & (self.b >= self.volume_count)
        attachment = (self.a < self.volume_count) != (self.b < self.volume_count)
        weights = np.where(surface_edge, 1.20, np.where(attachment, .65, 1.)).astype(np.float32)
        self.weights_gpu = cp.asarray(weights)
        self.dr_gpu = cp.asarray(self.rest_edges, dtype=cp.float32)
        a, b = self.a, self.b
        lap = sparse.coo_matrix((np.concatenate([weights, weights, -weights, -weights]), (np.concatenate([a, b, a, b]), np.concatenate([a, b, b, a]))), shape=(count, count)).tocsr()
        nearest = cKDTree(self.centers).query(self.rest[:self.volume_count], k=4)[0][:, 0]
        strength = np.concatenate([np.where(nearest < .035, 3., .025), .025+8*head_mass**8+12*paw_mass**4]).astype(np.float32)
        self.strength_gpu = cp.asarray(strength)
        system = lap + sparse.diags(strength)
        self.matrix = gpu_sparse.csr_matrix(system[self.free][:, self.free].astype(np.float32))
        self.base_matrix = self.matrix
        self.gpu_sparse = gpu_sparse
        self.coupling_gpu = gpu_sparse.csr_matrix(lap[self.free][:, self.pins].astype(np.float32))
        self.diagonal = cp.asarray(system.diagonal()[self.free], dtype=cp.float32)[:, None]
        self.base_diagonal = self.diagonal.copy()
        self.torso_mass = cp.asarray(torso_mass, dtype=cp.float32)
        # 体积点沿局部骨链插值，复用修正过的表面权重，避免最近骨赢家硬切换。
        _, nearest_surface = cKDTree(self.rest[self.volume_count:]).query(self.rest[:self.volume_count], k=1)
        self.volume_ids = cp.asarray(source_ids[nearest_surface], dtype=cp.int32)
        self.volume_weights = cp.asarray(source_weights[nearest_surface], dtype=cp.float32)
        self.skin_ids = cp.concatenate([self.volume_ids, cp.asarray(source_ids, dtype=cp.int32)])
        self.skin_weights = cp.concatenate([self.volume_weights, cp.asarray(source_weights, dtype=cp.float32)])
        self.surface_inverse_gpu = cp.asarray(self.inverse)
        self.surface_unique_gpu = cp.asarray(self.unique)
        self.triangles_gpu = cp.asarray(self.triangles)
        self.surface_edges_gpu = cp.asarray(self.surface_edges)
        self.edge_lengths_gpu = cp.linalg.norm(self.rest_gpu[self.volume_count+self.surface_edges_gpu[:, 0]]-self.rest_gpu[self.volume_count+self.surface_edges_gpu[:, 1]], axis=1)
        self.pillow_heights = cp.asarray(self.pillow['heights'], dtype=cp.float32).reshape(self.pillow['n'], self.pillow['n'])
        self.current_gpu = self.rest_gpu.copy()
        self.previous_pose = None
        self._prepare_collisions(source_ids, source_weights, nearest_surface, joints)
        self._prepare_surface_contacts()

    def _prepare_surface_contacts(self):
        cp = self.cp
        live = np.unique(self.triangles)
        vertices = np.concatenate([np.repeat(live[:, None], 3, axis=1), self.triangles])+self.volume_count
        bary = np.concatenate([np.tile([1., 0., 0.], (len(live), 1)), np.full((len(self.triangles), 3), 1/3)]).astype(np.float32)
        self.particle_vertices = cp.asarray(vertices)
        self.particle_bary = cp.asarray(bary)
        self.rest_particles = np.sum(self.rest[vertices]*bary[:, :, None], axis=1)
        self.contact_tick = 0
        self.contact_pairs = None
        self.maximum_surface_contact_pairs = 0

    def project_surface_contacts(self, positions):
        cp = self.cp
        particle = cp.sum(positions[self.particle_vertices]*self.particle_bary[:, :, None], axis=1)
        self.contact_tick += 1
        if self.contact_pairs is None or self.contact_tick % 4 == 0:
            current = cp.asnumpy(particle)
            pairs = cKDTree(current).query_pairs(.008, output_type='ndarray')
            if len(pairs):
                apart = np.linalg.norm(self.rest_particles[pairs[:, 0]]-self.rest_particles[pairs[:, 1]], axis=1) > .026
                pairs = pairs[apart]
            self.contact_pairs = cp.asarray(pairs, dtype=cp.int32)
            self.maximum_surface_contact_pairs = max(self.maximum_surface_contact_pairs, len(pairs))
        pairs = self.contact_pairs
        if not len(pairs): return
        a, b = pairs[:, 0], pairs[:, 1]
        va, vb = self.particle_vertices[a], self.particle_vertices[b]
        wa = self.particle_bary[a]*self.free_mask[va]
        wb = self.particle_bary[b]*self.free_mask[vb]
        denominator = cp.sum(wa*wa+wb*wb, axis=1)
        delta = particle[a]-particle[b]
        distance = cp.linalg.norm(delta, axis=1)
        depth = cp.maximum(.006-distance, 0)
        correction = delta*(.70*depth/cp.maximum(distance, 1e-7)/cp.maximum(denominator, 1e-7))[:, None]
        adjust = cp.zeros_like(positions)
        degree = cp.zeros(len(positions), dtype=cp.float32)
        active = (depth > 0).astype(cp.float32)
        for k in range(3):
            cp.add.at(adjust, va[:, k], correction*wa[:, k, None])
            cp.add.at(adjust, vb[:, k], -correction*wb[:, k, None])
            cp.add.at(degree, va[:, k], active*wa[:, k])
            cp.add.at(degree, vb[:, k], active*wb[:, k])
        positions += adjust/cp.maximum(degree, 1.)[:, None]

    def _prepare_collisions(self, ids, weights, nearest_surface, joints):
        cp = self.cp
        def group(name):
            for i, prefix in enumerate(['DEF_front_l_', 'DEF_front_r_', 'DEF_back_l_', 'DEF_back_r_'], 2):
                if name.startswith(prefix): return i
            return 1 if name in ('DEF_head', 'DEF_neck') else 6 if name.startswith('DEF_tail') else 0
        joint_group = np.array([group(n) for n in self.joint_names])
        masses = np.zeros((len(ids), 7))
        for k in range(4):
            masses[np.arange(len(ids)), joint_group[ids[:, k]]] += weights[:, k]
        surface_group = masses.argmax(axis=1)
        all_group = np.concatenate([surface_group[nearest_surface], surface_group])
        self.groups = cp.asarray(all_group)
        self.capsules = []
        for i, joint in enumerate(joints):
            family = joint_group[i]
            if family < 2 or family > 5 or joint['name'].endswith('_toe'): continue
            children = [k for k, j in enumerate(joints) if j['parent'] == i]
            if not children: continue
            child = children[0]
            start, end = self.centers[i], self.centers[child]
            axis = end-start
            along = np.clip((self.rest-start) @ axis/max(1e-12, axis @ axis), 0, 1)
            rest_distance = np.linalg.norm(self.rest-start-along[:, None]*axis, axis=1)
            radius = .025 if 'hock' in joint['name'] else .028 if 'lower' in joint['name'] else .033 if 'paw' in joint['name'] else .044
            eligible = (all_group >= 2) & (all_group <= 5) & (all_group != family) & (rest_distance > radius+.012) & (~self.fixed)
            self.capsules.append((i, cp.asarray(start, dtype=cp.float32), cp.asarray(end, dtype=cp.float32), radius, cp.asarray(eligible)))

    def floor_gpu(self, points, pose, progress):
        cp = self.cp
        result = cp.full(len(points), .003, dtype=cp.float32)
        if pose != 'pillow': return result
        p = self.pillow
        t = np.clip((progress-.15)/.40, 0, 1)
        offset = .28*(1-t*t*(3-2*t))
        x = (points[:, 0]-p['minX'])/(p['maxX']-p['minX'])*(p['n']-1)
        z = (points[:, 2]-offset-p['minZ'])/(p['maxZ']-p['minZ'])*(p['n']-1)
        valid = (x >= 0) & (z >= 0) & (x <= p['n']-1) & (z <= p['n']-1)
        a = cp.clip(x.astype(cp.int32), 0, p['n']-2)
        b = cp.clip(z.astype(cp.int32), 0, p['n']-2)
        u, v = cp.clip(x-a, 0, 1), cp.clip(z-b, 0, 1)
        h = self.pillow_heights
        height = (h[b, a]*(1-u)+h[b, a+1]*u)*(1-v)+(h[b+1, a]*(1-u)+h[b+1, a+1]*u)*v
        result += cp.where(valid, height, 0)
        return result

    def cg(self, rhs, initial):
        cp = self.cp
        x = initial.copy()
        r = rhs-self.matrix @ x
        z = r/self.diagonal
        p = z.copy()
        rz = cp.sum(r*z, axis=0)
        for iteration in range(90):
            ap = self.matrix @ p
            alpha = rz/cp.maximum(cp.sum(p*ap, axis=0), 1e-20)
            x += p*alpha
            r -= ap*alpha
            if iteration % 15 == 14 and float(cp.max(cp.linalg.norm(r, axis=0))) < 1e-5: break
            z = r/self.diagonal
            next_rz = cp.sum(r*z, axis=0)
            p = z+p*(next_rz/cp.maximum(rz, 1e-20))
            rz = next_rz
        return x

    def project_edges(self, positions, repeats=3):
        cp = self.cp
        e = self.surface_edges_gpu+self.volume_count
        a, b = e[:, 0], e[:, 1]
        free_a, free_b = self.free_mask[a].astype(cp.float32), self.free_mask[b].astype(cp.float32)
        for _ in range(repeats):
            delta = positions[b]-positions[a]
            length = cp.linalg.norm(delta, axis=1)
            desired = cp.clip(length, self.edge_lengths_gpu*.42, self.edge_lengths_gpu*1.85)
            correction = delta*((length-desired)/cp.maximum(length, 1e-7))[:, None]
            denominator = cp.maximum(free_a+free_b, 1.)
            adjust = cp.zeros_like(positions)
            degree = cp.zeros(len(positions), dtype=cp.float32)
            cp.add.at(adjust, a, correction*(free_a/denominator)[:, None])
            cp.add.at(adjust, b, -correction*(free_b/denominator)[:, None])
            cp.add.at(degree, a, free_a)
            cp.add.at(degree, b, free_b)
            positions += adjust/cp.maximum(degree, 1.)[:, None]

    def project_contacts(self, positions, matrices, pose, progress):
        cp = self.cp
        positions[self.free_gpu, 1] = cp.maximum(positions[self.free_gpu, 1], self.floor_gpu(positions[self.free_gpu], pose, progress))
        for bone, rest_start, rest_end, radius, eligible in self.capsules:
            matrix = matrices[bone]
            start = matrix[:3, :3] @ rest_start+matrix[:3, 3]
            end = matrix[:3, :3] @ rest_end+matrix[:3, 3]
            axis = end-start
            t = cp.clip(cp.sum((positions-start)*axis, axis=1)/cp.maximum(axis @ axis, 1e-10), 0, 1)
            delta = positions-start-t[:, None]*axis
            distance = cp.linalg.norm(delta, axis=1)
            depth = cp.where(eligible, cp.maximum(radius-distance, 0), 0)
            positions += delta*(depth/cp.maximum(distance, 1e-6))[:, None]
        self.project_surface_contacts(positions)
        positions[self.free_gpu, 1] = cp.maximum(positions[self.free_gpu, 1], self.floor_gpu(positions[self.free_gpu], pose, progress))

    def solve_key(self, pose, progress, posed, matrices):
        cp = self.cp
        started = time.perf_counter()
        self.maximum_surface_contact_pairs = 0
        self.contact_pairs = None
        matrices_gpu = cp.asarray(matrices.reshape(-1, 4, 4).transpose(0, 2, 1), dtype=cp.float32)
        raw = cp.asarray(posed, dtype=cp.float32)
        # 双四元数目标保留颈、髋及腕部弯曲时的截面，避免LBS混合矩阵把关节压成薄环。
        rigid = np.asarray(matrices).reshape(-1, 4, 4).transpose(0, 2, 1)
        rotations = cp.asarray(Rotation.from_matrix(rigid[:, :3, :3]).as_quat(), dtype=cp.float32)
        translations = cp.asarray(rigid[:, :3, 3], dtype=cp.float32)
        def multiply(a, b):
            return cp.concatenate([a[..., 3, None]*b[..., :3]+b[..., 3, None]*a[..., :3]+cp.cross(a[..., :3], b[..., :3]), (a[..., 3]*b[..., 3]-cp.sum(a[..., :3]*b[..., :3], axis=-1))[..., None]], axis=-1)
        dual = .5*multiply(cp.concatenate([translations, cp.zeros((len(translations), 1), dtype=cp.float32)], axis=1), rotations)
        q, d = rotations[self.skin_ids], dual[self.skin_ids]
        sign = cp.where(cp.sum(q*q[:, :1], axis=-1) < 0, -1., 1.).astype(cp.float32)
        q = cp.sum(q*(sign*self.skin_weights)[..., None], axis=1)
        d = cp.sum(d*(sign*self.skin_weights)[..., None], axis=1)
        length = cp.maximum(cp.linalg.norm(q, axis=1), 1e-8)[:, None]
        q, d = q/length, d/length
        conjugate = q.copy(); conjugate[:, :3] *= -1
        translation = 2*multiply(d, conjugate)[:, :3]
        cross = cp.cross(q[:, :3], self.rest_gpu)
        goal = self.rest_gpu+2*(q[:, 3, None]*cross+cp.cross(q[:, :3], cross))+translation
        if pose not in self.dual_quaternion_poses:
            volume = self.rest_gpu[:self.volume_count]
            matrix = matrices_gpu[self.volume_ids]
            goals = cp.sum((cp.einsum('nkij,nj->nki', matrix[:, :, :3, :3], volume)+matrix[:, :, :3, 3])*self.volume_weights[:, :, None], axis=1)
            goal = cp.concatenate([goals, raw[self.surface_unique_gpu]])
        if self.previous_pose != pose:
            self.current_gpu = self.rest_gpu.copy()
            self.contact_pairs = None
            self.previous_goal = self.rest_gpu.copy()
            self.previous_matrices = cp.tile(cp.eye(4, dtype=cp.float32), (len(matrices_gpu), 1, 1))
            self.previous_progress = 0.
        current = self.current_gpu
        origin = self.previous_goal
        # 全部软/硬目标一起连续推进，每步最多移动约8mm，避免头或腿瞬移穿过身体。
        displacement = float(cp.max(cp.linalg.norm(goal-origin, axis=1)))
        stages = max(1, int(np.ceil(displacement/.008)))
        stage_iterations = max(4, int(np.ceil(self.iterations/stages)))
        for stage in range(1, stages+1):
            fraction = stage/stages
            stage_goal = origin*(1-fraction)+goal*fraction
            stage_matrices = self.previous_matrices*(1-fraction)+matrices_gpu*fraction
            stage_progress = self.previous_progress*(1-fraction)+progress*fraction
            # 胸腹支撑随当前子步变化，不提前吸向整段动作的终点。
            extra = cp.zeros(len(goal), dtype=cp.float32)
            ramp = float(np.clip((stage_progress-.28)/.32, 0, 1))
            contact = (self.torso_mass > .70) & (stage_goal[self.volume_count:, 1] < self.floor_gpu(stage_goal[self.volume_count:], pose, stage_progress)+.035)
            extra[self.volume_count:] = contact.astype(cp.float32)*(2.5*ramp)
            self.matrix = self.base_matrix+self.gpu_sparse.diags(extra[self.free_gpu], format='csr')
            self.diagonal = self.base_diagonal+extra[self.free_gpu, None]
            effective_strength = self.strength_gpu+extra
            anchors = stage_goal[self.pins_gpu]
            current[self.pins_gpu] = anchors
            for _ in range(stage_iterations):
                delta = current[self.a_gpu]-current[self.b_gpu]
                local = self.weights_gpu[:, None, None]*delta[:, :, None]*self.dr_gpu[:, None, :]
                covariance = cp.zeros((len(current), 3, 3), dtype=cp.float32)
                cp.add.at(covariance, self.a_gpu, local)
                cp.add.at(covariance, self.b_gpu, local)
                u, _, vt = cp.linalg.svd(covariance)
                rotation = u @ vt
                negative = cp.linalg.det(rotation) < 0
                u[negative, :, -1] *= -1
                rotation = u @ vt
                force = self.weights_gpu[:, None]*cp.einsum('nij,nj->ni', (rotation[self.a_gpu]+rotation[self.b_gpu])*.5, self.dr_gpu)
                rhs = cp.zeros_like(current)
                cp.add.at(rhs, self.a_gpu, force)
                cp.add.at(rhs, self.b_gpu, -force)
                rhs += effective_strength[:, None]*stage_goal
                current[self.free_gpu] = self.cg(rhs[self.free_gpu]-self.coupling_gpu @ anchors, current[self.free_gpu])
                self.project_edges(current)
                self.project_contacts(current, stage_matrices, pose, stage_progress)
                current[self.pins_gpu] = anchors
        # 全局旋转收敛后继续消除局部极值；不能让99分位数掩盖一条尖膜边。
        final_passes = 0
        for final_passes in range(20):
            self.project_edges(current, repeats=8)
            self.project_contacts(current, matrices_gpu, pose, progress)
            current[self.pins_gpu] = goal[self.pins_gpu]
            e = self.surface_edges_gpu
            ratio = cp.linalg.norm(current[self.volume_count+e[:, 0]]-current[self.volume_count+e[:, 1]], axis=1)/cp.maximum(self.edge_lengths_gpu, 1e-8)
            if float(cp.max(ratio[self.edge_lengths_gpu > .002])) < 1.95: break
        self.previous_pose = pose
        self.previous_goal = goal.copy()
        self.previous_matrices = matrices_gpu.copy()
        self.previous_progress = progress
        surface = current[self.volume_count:]
        tri = self.triangles_gpu
        face = cp.cross(surface[tri[:, 1]]-surface[tri[:, 0]], surface[tri[:, 2]]-surface[tri[:, 0]])
        normals = cp.zeros_like(surface)
        for corner in range(3): cp.add.at(normals, tri[:, corner], face)
        normals /= cp.maximum(cp.linalg.norm(normals, axis=1)[:, None], 1e-9)
        e = self.surface_edges_gpu
        ratio = cp.linalg.norm(surface[e[:, 0]]-surface[e[:, 1]], axis=1)/cp.maximum(self.edge_lengths_gpu, 1e-8)
        output = surface[self.surface_inverse_gpu]
        cp.cuda.Stream.null.synchronize()
        meaningful = ratio[self.edge_lengths_gpu > .002]
        report = {'pose': pose, 'progress': progress, 'seconds': time.perf_counter()-started, 'substeps': stages, 'maximumStretchAllEdges': float(ratio.max()), 'maximumStretch': float(meaningful.max()), 'p99Stretch': float(cp.percentile(meaningful, 99)), 'fractionEdgesOver2': float(cp.mean(meaningful > 2)), 'finalProjectionPasses': final_passes+1, 'maximumSurfaceContactPairs': self.maximum_surface_contact_pairs, 'maximumCorrection': float(cp.max(cp.linalg.norm(output-raw, axis=1))), 'minimumFloor': float(cp.min(output[:, 1]-self.floor_gpu(output, pose, progress))), 'cudaMemoryPoolBytes': cp.get_default_memory_pool().total_bytes()}
        return cp.asnumpy(output), cp.asnumpy(normals[self.surface_inverse_gpu]), report


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--poses', required=True)
    parser.add_argument('--gpu', type=int, default=0)
    parser.add_argument('--iterations', type=int, default=20)
    parser.add_argument('--dual-quaternion-poses', default='side,prone')
    args = parser.parse_args()
    os.environ['CUDA_VISIBLE_DEVICES'] = str(args.gpu)
    args.output.mkdir(parents=True, exist_ok=True)
    meta = json.loads((args.input/'goals.json').read_text())
    expected = hashlib.sha256((args.input/'anatomy-neutral.glb').read_bytes()).hexdigest()
    if expected != meta['sourceSHA256']: raise RuntimeError('Neutral input hash mismatch')
    solver = CudaCatSkin(args.input, iterations=args.iterations, dual_quaternion_poses=args.dual_quaternion_poses.split(','))
    import cupy as cp
    selected = args.poses.split(',')
    device = cp.cuda.runtime.getDeviceProperties(0)['name'].decode()
    records = []
    outputs = []
    print(json.dumps({'ready': True, 'device': device, 'inputSHA256': expected, 'volumePoints': solver.volume_count, 'surfacePoints': len(solver.rest)-solver.volume_count}), flush=True)
    for pose in meta['poses']:
        if pose['id'] not in selected: continue
        frames = len(pose['times'])
        points = np.fromfile(args.input/pose['goals'], dtype=np.float32).reshape(frames, meta['vertexCount'], 3)
        matrices = np.fromfile(args.input/pose['matrices'], dtype=np.float32).reshape(frames, meta['bones'], 16)
        output = args.output/(pose['id']+'-skin.f32')
        with output.open('wb') as stream:
            for i, progress in enumerate(pose['times']):
                positions, normals, record = solver.solve_key(pose['id'], progress, points[i], matrices[i])
                positions.astype(np.float32).tofile(stream)
                normals.astype(np.float32).tofile(stream)
                records.append(record)
                print(json.dumps(record), flush=True)
                (args.output/'progress.json').write_text(json.dumps({'device': device, 'records': records}, indent=2))
        artifact = {'pose': pose['id'], 'file': output.name, 'bytes': output.stat().st_size, 'sha256': hashlib.sha256(output.read_bytes()).hexdigest()}
        outputs.append(artifact)
        print(json.dumps({'completedPose': pose['id'], **artifact}), flush=True)
    uuid = subprocess.run(['nvidia-smi', '--id='+str(args.gpu), '--query-gpu=uuid', '--format=csv,noheader'], capture_output=True, text=True).stdout.strip()
    (args.output/'manifest.json').write_text(json.dumps({'status': 'review', 'humanReview': 'pending', 'method': 'CUDA CuPy soft-core volumetric ARAP; continuous targets, edge/thickness contacts; original GPU mesh and face pixels', 'dualQuaternionPoses': args.dual_quaternion_poses.split(','), 'host': socket.gethostname(), 'device': device, 'deviceIndex': args.gpu, 'gpuUUID': uuid, 'sourceSHA256': expected, 'goalsSHA256': hashlib.sha256((args.input/'goals.json').read_bytes()).hexdigest(), 'solverSHA256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(), 'poses': selected, 'outputs': outputs, 'records': records}, indent=2))


if __name__ == '__main__':
    main()
