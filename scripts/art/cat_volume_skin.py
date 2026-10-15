"""在原 GPU 猫咪内部建立体积笼，用局部刚性约束求解皮肤；不生成或替换原曲面。"""
import base64
import json
import struct
import sys
from pathlib import Path

import numpy as np
import trimesh
from scipy import sparse
from scipy.sparse.linalg import splu
from scipy.spatial import cKDTree


class VolumeSkin:
    def __init__(self, source, skeleton, pillow):
        raw = Path(source).read_bytes()
        length = struct.unpack_from('<I', raw, 12)[0]
        gltf = json.loads(raw[20:20 + length])
        blob = raw[28 + length:]

        def array(index):
            a = gltf['accessors'][index]
            view = gltf['bufferViews'][a['bufferView']]
            dtype = {5126: np.float32, 5125: np.uint32, 5123: np.uint16}[a['componentType']]
            width = {'VEC3': 3, 'VEC4': 4, 'SCALAR': 1}[a['type']]
            item = np.dtype(dtype).itemsize
            return np.ndarray((a['count'], width), dtype=dtype, buffer=blob,
                              offset=view.get('byteOffset', 0) + a.get('byteOffset', 0),
                              strides=(view.get('byteStride', item * width), item)).copy()

        primitives = [gltf['meshes'][n['mesh']]['primitives'][0] for n in gltf['nodes'] if 'mesh' in n]
        positions = [array(p['attributes']['POSITION']) for p in primitives]
        self.starts = np.cumsum([0] + [len(a) for a in positions])
        source_positions = np.concatenate(positions)
        indices = np.concatenate([array(p['indices']).reshape(-1, 3) + self.starts[i]
                                  for i, p in enumerate(primitives)])
        surface, unique, self.inverse = np.unique(np.round(source_positions, 6), axis=0,
                                                  return_index=True, return_inverse=True)
        surface = source_positions[unique]
        self.unique = unique
        self.triangles = self.inverse[indices]
        mesh = trimesh.Trimesh(source_positions, indices, process=True)
        self.pitch = .012
        voxel = mesh.voxelized(self.pitch).fill()
        cells = np.argwhere(voxel.matrix)
        volume = voxel.indices_to_points(cells)
        ids = np.full(voxel.matrix.shape, -1, dtype=np.int32)
        ids[tuple(cells.T)] = np.arange(len(cells))
        self.volume_count = len(volume)
        joints = json.loads(Path(skeleton).read_text())
        centers = np.array([j['position'] for j in joints])
        names = [j['name'] for j in joints]
        distances, eligible = [], []
        for i, joint in enumerate(joints):
            name = joint['name']
            if name == 'CTRL_ground' or name.startswith(('DEF_ear', 'DEF_scapula')) or name.endswith('_toe'):
                continue
            children = [k for k, v in enumerate(joints) if v['parent'] == i and not v['name'].startswith('DEF_ear')]
            if name == 'DEF_pelvis':
                children = [names.index('DEF_spine_01')]
            if name == 'DEF_chest':
                children = [names.index('DEF_neck')]
            end = centers[children[0]] if children else centers[i] + (
                np.array([0, .09, .035]) if name == 'DEF_head' else np.array([0, 0, -.025]))
            axis = end - centers[i]
            t = np.clip((volume - centers[i]) @ axis / max(1e-12, axis @ axis), .12, .88)
            distances.append(np.linalg.norm(volume - (centers[i] + t[:, None] * axis), axis=1))
            eligible.append(i)
        distances = np.array(distances).T
        winner = distances.argmin(axis=1)
        fixed = distances.min(axis=1) < .017
        for i in range(len(eligible)):
            fixed[np.argmin(distances[:, i])] = True
        self.winner = np.array(eligible)[winner]
        # 头骨与脚掌保留实际骨骼位置；头身接缝按同一几何点求解。
        surface_fixed = (surface[:, 1] + 1.4 * surface[:, 2] > .92) | (surface[:, 1] > .53) | (surface[:, 1] < .05)
        self.fixed = np.concatenate([fixed, surface_fixed])
        self.rest = np.concatenate([volume, surface]).astype(float)
        edges, weights = [], []
        for axis in range(3):
            other = cells.copy()
            other[:, axis] += 1
            valid = np.all(other < ids.shape, axis=1)
            a = np.where(valid)[0]
            b = ids[tuple(other[valid].T)]
            valid = b >= 0
            edges.append(np.stack([a[valid], b[valid]], axis=1))
            weights.append(np.ones(valid.sum()))
        triangles = self.triangles
        e = np.concatenate([triangles[:, [0, 1]], triangles[:, [1, 2]], triangles[:, [2, 0]]])
        e = np.unique(np.sort(e, axis=1), axis=0)
        e = e[e[:, 0] != e[:, 1]]
        edges.append(e + len(volume))
        weights.append(np.full(len(e), .35))
        _, neighbours = cKDTree(volume).query(surface, k=8)
        edges.append(np.stack([np.repeat(np.arange(len(surface)) + len(volume), 8), neighbours.ravel()], axis=1))
        weights.append(np.full(len(surface) * 8, .50))
        self.a, self.b = np.concatenate(edges).T
        self.weight = np.concatenate(weights)
        a, b, w = self.a, self.b, self.weight
        self.rest_edges = self.rest[a] - self.rest[b]
        laplacian = sparse.coo_matrix((np.concatenate([w, w, -w, -w]),
                                      (np.concatenate([a, b, a, b]), np.concatenate([a, b, b, a]))),
                                     shape=(len(self.rest), len(self.rest))).tocsc()
        self.free = np.where(~self.fixed)[0]
        self.pins = np.where(self.fixed)[0]
        self.factor = splu(laplacian[self.free][:, self.free])
        self.coupling = laplacian[self.free][:, self.pins]
        self.pillow = json.loads(Path(pillow).read_text())
        self.previous_pose = None
        self.previous_t = 0
        self.current = self.rest.copy()
        self.surface_edges = e

    def floor(self, points, pose, progress):
        result = np.full(len(points), .003)
        if pose != 'pillow':
            return result
        p = self.pillow
        t = np.clip((progress - .15) / .40, 0, 1)
        offset = .28 * (1 - t * t * (3 - 2 * t))
        x = (points[:, 0] - p['minX']) / (p['maxX'] - p['minX']) * (p['n'] - 1)
        z = (points[:, 2] - offset - p['minZ']) / (p['maxZ'] - p['minZ']) * (p['n'] - 1)
        valid = (x >= 0) & (z >= 0) & (x <= p['n'] - 1) & (z <= p['n'] - 1)
        x, z = x[valid], z[valid]
        a, b = np.minimum(p['n'] - 2, x.astype(int)), np.minimum(p['n'] - 2, z.astype(int))
        u, v = x - a, z - b
        h = np.array(p['heights']).reshape(p['n'], p['n'])
        result[valid] += (h[b, a] * (1-u) + h[b, a+1] * u) * (1-v) + (h[b+1, a] * (1-u) + h[b+1, a+1] * u) * v
        return result

    def compute(self, request):
        if request.get('action') == 'restore':
            self.current = np.load(request['statePath'])
            self.previous_pose, self.previous_t = request['pose'], request['progress']
            return {'restored': True}
        matrices = np.array(request['matrices']).reshape(-1, 4, 4).transpose(0, 2, 1)
        posed = np.frombuffer(base64.b64decode(request['positions']), dtype=np.float32).reshape(-1, 3)
        volume = self.rest[:self.volume_count]
        goal = np.einsum('ijk,ik->ij', matrices[self.winner, :3, :3], volume) + matrices[self.winner, :3, 3]
        target = np.concatenate([goal, posed[self.unique]])
        pose, progress = request['pose'], request['progress']
        # 按关键帧顺序延续物体状态；随机插入的接地帧从站姿分段求解，避免依赖调用顺序。
        if self.previous_pose == pose and self.previous_t < progress and progress-self.previous_t <= .08:
            stages, iterations = 1, 18
            origin = self.current[self.pins].copy()
        else:
            self.current = self.rest.copy()
            stages, iterations = max(1, int(np.ceil(progress * 16))), 12
            origin = self.rest[self.pins]
        a, b, w, dr = self.a, self.b, self.weight, self.rest_edges
        current = self.current
        for stage in range(1, stages + 1):
            t = stage / stages
            anchors = origin * (1-t) + target[self.pins] * t
            current[self.pins] = anchors
            for _ in range(iterations):
                delta = current[a] - current[b]
                covariance = np.zeros((len(current), 3, 3))
                local = w[:, None, None] * delta[:, :, None] * dr[:, None, :]
                np.add.at(covariance, a, local)
                np.add.at(covariance, b, local)
                u, _, v = np.linalg.svd(covariance)
                rotation = u @ v
                u[np.linalg.det(rotation) < 0, :, -1] *= -1
                rotation = u @ v
                force = w[:, None] * np.einsum('ijk,ik->ij', (rotation[a] + rotation[b]) * .5, dr)
                rhs = np.zeros_like(current)
                np.add.at(rhs, a, force)
                np.add.at(rhs, b, -force)
                current[self.free] = self.factor.solve(rhs[self.free] - self.coupling @ anchors)
                current[self.pins] = anchors
                # 接触投影参与下一轮体积求解，不在最终皮肤上单独压出一层薄片。
                floor = self.floor(current[self.free], pose, progress)
                current[self.free, 1] = np.maximum(current[self.free, 1], floor)
        self.previous_pose, self.previous_t = pose, progress
        if request.get('statePath'):
            np.save(request['statePath'], self.current)
        surface = current[self.volume_count:]
        normals = np.zeros_like(surface)
        tri = self.triangles
        face_normal = np.cross(surface[tri[:, 1]] - surface[tri[:, 0]], surface[tri[:, 2]] - surface[tri[:, 0]])
        for corner in range(3):
            np.add.at(normals, tri[:, corner], face_normal)
        normals /= np.maximum(1e-12, np.linalg.norm(normals, axis=1)[:, None])
        output = np.asarray(surface[self.inverse], dtype=np.float32)
        normal = np.asarray(normals[self.inverse], dtype=np.float32)
        edges = self.surface_edges
        ratio = np.linalg.norm(surface[edges[:, 0]] - surface[edges[:, 1]], axis=1) / np.maximum(
            1e-9, np.linalg.norm(self.rest[self.volume_count:][edges[:, 0]] - self.rest[self.volume_count:][edges[:, 1]], axis=1))
        return {'positions': base64.b64encode(output.tobytes()).decode(),
                'normals': base64.b64encode(normal.tobytes()).decode(),
                'report': {'method': 'Volumetric ARAP with shared surface, rigid skull/soles and iterative support contact',
                           'cagePoints': self.volume_count, 'surfacePoints': len(surface),
                           'minimumFloor': float(np.min(output[:, 1] - self.floor(output, pose, progress))),
                           'maximumCorrection': float(np.max(np.linalg.norm(output - posed, axis=1))),
                           'maximumStretch': float(ratio.max()), 'p99Stretch': float(np.quantile(ratio, .99))}}


if __name__ == '__main__':
    solver = VolumeSkin(*sys.argv[1:4])
    print(json.dumps({'ready': True, 'cagePoints': solver.volume_count}), flush=True)
    for line in sys.stdin:
        try:
            print(json.dumps(solver.compute(json.loads(line)), separators=(',', ':')), flush=True)
        except Exception as error:
            print(json.dumps({'error': str(error)}), flush=True)
