"""仅修整动作后的颈圈；同一函数支持 NumPy/CuPy，脸耳和颈外曲面保持。"""
import argparse
import importlib.util
import json
import os
from pathlib import Path
import socket
import subprocess

import numpy as np


def smooth(a, b, value):
    t = np.clip((value-a)/(b-a), 0, 1)
    return t*t*(3-2*t)


def prepare_continuous_neck_weights(rest, ids, weights, names):
    """后颈使用一个连续轴向场，消除原相邻顶点的 head 权重跳变。"""
    dense = np.zeros((len(rest), len(names)), dtype=np.float32)
    for slot in range(ids.shape[1]):
        np.add.at(dense, (np.arange(len(rest)), ids[:, slot]), weights[:, slot])
    chest, neck, head = [names.index('DEF_'+name) for name in ('chest', 'neck', 'head')]
    chain = [i for i, name in enumerate(names) if name.startswith(('DEF_pelvis', 'DEF_spine')) or name in ('DEF_chest', 'DEF_neck', 'DEF_head')]
    total = dense[:, chain].sum(axis=1)
    dense[:, chain] = 0
    diagonal = rest[:, 1]+1.4*rest[:, 2]
    head_share = smooth(.84, 1.01, diagonal)
    neck_share = smooth(.70, .84, diagonal)*(1-head_share)
    dense[:, head] = total*head_share
    dense[:, neck] = total*neck_share
    dense[:, chest] = total*(1-head_share-neck_share)
    return dense


def matrix_quaternions(matrices):
    """35 个刚性骨矩阵转 xyzw；无 SciPy 依赖。"""
    result = np.zeros((len(matrices), 4), dtype=np.float64)
    for i, matrix in enumerate(matrices):
        rotation = matrix[:3, :3]
        trace = np.trace(rotation)
        if trace > 0:
            scale = np.sqrt(trace+1)*2
            result[i] = [(rotation[2, 1]-rotation[1, 2])/scale,
                         (rotation[0, 2]-rotation[2, 0])/scale,
                         (rotation[1, 0]-rotation[0, 1])/scale, .25*scale]
        else:
            j = int(np.argmax(np.diag(rotation)))
            k, l = (j+1) % 3, (j+2) % 3
            scale = np.sqrt(max(1+rotation[j, j]-rotation[k, k]-rotation[l, l], 0))*2
            result[i, j] = .25*scale
            result[i, k] = (rotation[k, j]+rotation[j, k])/scale
            result[i, l] = (rotation[l, j]+rotation[j, l])/scale
            result[i, 3] = (rotation[l, k]-rotation[k, l])/scale
    return result/np.linalg.norm(result, axis=1)[:, None]


def quaternion_multiply(xp, a, b):
    xyz = a[..., 3:]*b[..., :3]+b[..., 3:]*a[..., :3]+xp.cross(a[..., :3], b[..., :3])
    scalar = a[..., 3:]*b[..., 3:]-xp.sum(a[..., :3]*b[..., :3], axis=-1, keepdims=True)
    return xp.concatenate([xyz, scalar], axis=-1)


def dual_quaternion_goal(xp, rest, dense_weights, matrices):
    rotation = xp.asarray(matrix_quaternions(matrices), dtype=rest.dtype)
    translation = xp.asarray(matrices[:, :3, 3], dtype=rest.dtype)
    dual = .5*quaternion_multiply(xp, xp.concatenate([translation, xp.zeros((len(matrices), 1), dtype=rest.dtype)], axis=1), rotation)
    reference = rotation[xp.argmax(dense_weights, axis=1)]
    signs = xp.where(reference @ rotation.T < 0, -1., 1.)
    weighted = dense_weights*signs
    q, d = weighted @ rotation, weighted @ dual
    length = xp.maximum(xp.linalg.norm(q, axis=1), 1e-10)[:, None]
    q, d = q/length, d/length
    conjugate = q*xp.asarray([-1, -1, -1, 1], dtype=rest.dtype)
    translation = 2*quaternion_multiply(xp, d, conjugate)[:, :3]
    cross = xp.cross(q[:, :3], rest)
    return rest+2*(q[:, 3:]*cross+xp.cross(q[:, :3], cross))+translation


def apply_dq_neck_target(xp, points, prepared, goal, progress=1., strength=.8):
    if progress <= 1e-8:
        return points.copy()
    t = float(np.clip((progress-.12)/.35, 0, 1))
    return points+(goal-points)*(prepared['amount']*strength*t*t*(3-2*t))[:, None]


def support_height(xp, points, pose, progress, pillow, heights):
    """与原 CUDA solver.floor_gpu 相同的地面/运动枕头高度场。"""
    result = xp.full(len(points), .003, dtype=xp.float32)
    if pose != 'pillow':
        return result
    t = float(np.clip((progress-.15)/.40, 0, 1))
    offset = .28*(1-t*t*(3-2*t))
    x = (points[:, 0]-pillow['minX'])/(pillow['maxX']-pillow['minX'])*(pillow['n']-1)
    z = (points[:, 2]-offset-pillow['minZ'])/(pillow['maxZ']-pillow['minZ'])*(pillow['n']-1)
    valid = (x >= 0) & (z >= 0) & (x <= pillow['n']-1) & (z <= pillow['n']-1)
    a, b = xp.clip(x.astype(xp.int32), 0, pillow['n']-2), xp.clip(z.astype(xp.int32), 0, pillow['n']-2)
    u, v = xp.clip(x-a, 0, 1), xp.clip(z-b, 0, 1)
    height = (heights[b, a]*(1-u)+heights[b, a+1]*u)*(1-v)+(heights[b+1, a]*(1-u)+heights[b+1, a+1]*u)*v
    return result+xp.where(valid, height, 0)


def prepare_neck_fairing(rest, triangles, ids, weights, names):
    diagonal = rest[:, 1]+1.4*rest[:, 2]
    axis = np.array([.4917950678296253, 0, .7928000002303839])
    axis /= np.linalg.norm(axis)
    forward = rest @ axis
    head = [i for i, n in enumerate(names) if n == 'DEF_head']
    ears = [i for i, n in enumerate(names) if n.startswith('DEF_ear')]
    related = [i for i, n in enumerate(names) if n in ('DEF_chest', 'DEF_neck', 'DEF_head') or n.startswith('DEF_ear')]
    limbs = [i for i, n in enumerate(names) if n.startswith(('DEF_front_', 'DEF_back_'))]
    head_mass = np.sum(weights*np.isin(ids, head), axis=1)
    ear_mass = np.sum(weights*np.isin(ids, ears), axis=1)
    related_mass = np.sum(weights*np.isin(ids, related), axis=1)
    limb_mass = np.sum(weights*np.isin(ids, limbs), axis=1)
    protected = (ear_mass > .005) | (rest[:, 1] > .60) | ((head_mass > .985) & ((forward > .37) | (diagonal > 1.08)))
    amount = smooth(.74, .82, diagonal)*(1-smooth(1.06, 1.14, diagonal))*smooth(.22, .28, rest[:, 1])
    amount *= (1-smooth(.37, .43, forward))*(1-smooth(.57, .60, rest[:, 1]))*smooth(.35, .70, related_mass)
    amount *= 1-smooth(0, .005, ear_mass)
    amount[(limb_mass > .15) | protected] = 0
    edges = np.sort(np.concatenate([triangles[:, [0, 1]], triangles[:, [1, 2]], triangles[:, [2, 0]]]), axis=1)
    edges = np.unique(edges[edges[:, 0] != edges[:, 1]], axis=0)
    degree = np.bincount(edges.ravel(), minlength=len(rest)).astype(np.float32)
    amount[degree == 0] = 0
    fit = ((diagonal > .72) & (diagonal < 1.06) & (rest[:, 1] > .22) & (ear_mass < .005) & (related_mass > .4) & (degree > 0))
    t = (diagonal-.88)/.14
    u = rest[:, 0]
    v = (1.4*rest[:, 1]-rest[:, 2])/np.sqrt(2.96)
    bins = np.clip(((diagonal-.72)/.34*16).astype(int), 0, 15)
    centers = [(np.median(t[fit & (bins == i)]), np.median(u[fit & (bins == i)]), np.median(v[fit & (bins == i)])) for i in range(16) if np.sum(fit & (bins == i)) > 8]
    centers = np.asarray(centers)
    cu, cv = np.polyfit(centers[:, 0], centers[:, 1], 3), np.polyfit(centers[:, 0], centers[:, 2], 3)
    theta = np.arctan2(v-np.polyval(cv, t), u-np.polyval(cu, t))
    harmonic = np.column_stack([np.ones(len(rest)), np.cos(theta), np.sin(theta), np.cos(2*theta), np.sin(2*theta)])
    design = np.column_stack([harmonic*t[:, None]**power for power in range(4)]).astype(np.float32)
    angle_bins = np.clip(((theta+np.pi)/(2*np.pi)*12).astype(int), 0, 11)
    cell = bins*12+angle_bins
    counts = np.bincount(cell[fit], minlength=192)
    fit_weights = 1/np.sqrt(np.maximum(counts[cell[fit]], 1))
    ridge = np.array([.0008*((power*.5)**4+order**4)+1e-7 for power in range(4) for order in [0, 1, 1, 2, 2]])*fit_weights.sum()
    return {'a': edges[:, 0], 'b': edges[:, 1], 'degree': degree,
            'guardA': edges[np.linalg.norm(rest[edges[:, 1]]-rest[edges[:, 0]], axis=1) > .002, 0],
            'guardB': edges[np.linalg.norm(rest[edges[:, 1]]-rest[edges[:, 0]], axis=1) > .002, 1],
            'guardRestLengths': np.linalg.norm(rest[edges[:, 1]]-rest[edges[:, 0]], axis=1)[np.linalg.norm(rest[edges[:, 1]]-rest[edges[:, 0]], axis=1) > .002],
            'amount': amount.astype(np.float32), 'protected': protected,
            'diagonal': diagonal, 'forward': forward, 'fitIndices': np.flatnonzero(fit),
            'design': design, 'fitWeights': fit_weights.astype(np.float32), 'ridge': ridge.astype(np.float32), 'fitBins': bins}


def apply_periodic_neck_fairing(xp, points, prepared, progress=1., max_move=.025):
    """低阶周期颈圈，保持原截面中位半径；仅作用于固定脸耳之外的颈带。"""
    if progress <= 1e-8:
        return points.copy()
    t = float(np.clip((progress-.12)/.35, 0, 1))
    blend = t*t*(3-2*t)
    design, selected = prepared['design'], prepared['fitIndices']
    basis, target = design[selected], points[selected]
    original_weights = prepared['fitWeights']
    weights = original_weights.copy()
    for _ in range(3):
        system = basis.T @ (basis*weights[:, None])+xp.diag(prepared['ridge'])
        rhs = basis.T @ (target*weights[:, None])
        coefficient = xp.linalg.solve(system, rhs)
        residual = xp.linalg.norm(basis @ coefficient-target, axis=1)
        weights = original_weights*xp.minimum(1., .0075/xp.maximum(residual, 1e-7))
    fitted = design @ coefficient
    # Harmonic zero columns describe the centreline; retain median cross-section
    # radius instead of allowing a least-squares collar to shrink into the neck.
    center = design[:, [0, 5, 10, 15]] @ coefficient[[0, 5, 10, 15]]
    radius_before = xp.linalg.norm(points-center, axis=1)
    radius_after = xp.linalg.norm(fitted-center, axis=1)
    ratios = xp.ones(16, dtype=points.dtype)
    for index in range(16):
        chosen = selected[prepared['fitBins'][selected] == index]
        if len(chosen) > 8:
            ratios[index] = xp.clip(xp.median(radius_before[chosen])/xp.maximum(xp.median(radius_after[chosen]), 1e-6), .95, 1.08)
    fitted = center+(fitted-center)*ratios[prepared['fitBins']][:, None]
    delta = fitted-points
    length = xp.linalg.norm(delta, axis=1)
    delta *= xp.minimum(1., max_move/xp.maximum(length, 1e-7))[:, None]
    return points+delta*(prepared['amount']*blend)[:, None]


def prepare_wrist_fairing(rest, ids, weights, names, joints, graph):
    """仅前腕皮肤；刚性掌底、躯干、脸耳不进入面域。"""
    amount = np.zeros(len(rest))
    protected = np.ones(len(rest), dtype=bool)
    for family in ['front_l', 'front_r']:
        family_ids = [i for i, n in enumerate(names) if n.startswith('DEF_'+family+'_')]
        paw_ids = [i for i, n in enumerate(names) if n in ('DEF_'+family+'_paw', 'DEF_'+family+'_toe')]
        mass = np.sum(weights*np.isin(ids, family_ids), axis=1)
        paw = np.sum(weights*np.isin(ids, paw_ids), axis=1)
        center = np.array(next(j['position'] for j in joints if j['name'] == 'DEF_'+family+'_paw'))
        distance = np.linalg.norm(rest-center, axis=1)
        local = (1-smooth(.055, .095, distance))*smooth(.030, .055, rest[:, 1])
        local *= (1-smooth(.85, .96, paw))*smooth(.50, .80, mass)
        local[(rest[:, 1] < .030) | (paw > .95) | (mass < .5) | (graph['degree'] == 0)] = 0
        amount = np.maximum(amount, local)
        protected &= local == 0
    return {**graph, 'amount': amount.astype(np.float32), 'protected': protected}


def apply_neck_fairing(xp, points, prepared, progress=1., cycles=12, positive=.45, negative=-.47):
    """points/所有 prepared 数组位于 xp；不移动站姿，不做纹理或渲染遮盖。"""
    if progress <= 1e-8:
        return points.copy()
    t = float(np.clip((progress-.12)/.35, 0, 1))
    blend = t*t*(3-2*t)
    a, b = prepared['a'], prepared['b']
    factor = prepared['amount'][:, None]*blend
    degree = xp.maximum(prepared['degree'], 1)[:, None]
    output = points.copy()
    for _ in range(cycles):
        for amount in (positive, negative):
            average = xp.zeros_like(output)
            xp.add.at(average, a, output[b])
            xp.add.at(average, b, output[a])
            average /= degree
            output += (average-output)*(amount*factor)
    return output


def guard_corrective_edges(xp, raw, candidate, prepared):
    """单一全局 alpha，逐边限制原长>2mm 的动作修正不使原坏边更坏。"""
    a, b, rest = prepared['guardA'], prepared['guardB'], prepared['guardRestLengths']
    edge = raw[b]-raw[a]
    raw_lengths = xp.linalg.norm(edge, axis=1)
    limits = xp.maximum(raw_lengths, 1.95*rest)+1e-7
    delta = candidate-raw
    edge_delta = delta[b]-delta[a]
    coefficient_a = xp.sum(edge_delta*edge_delta, axis=1)
    coefficient_b = 2*xp.sum(edge*edge_delta, axis=1)
    coefficient_c = xp.sum(edge*edge, axis=1)-limits*limits
    root = xp.sqrt(xp.maximum(coefficient_b**2-4*coefficient_a*coefficient_c, 0))
    upper = xp.where(coefficient_b >= 0,
                     -2*coefficient_c/xp.maximum(coefficient_b+root, 1e-30),
                     (-coefficient_b+root)/xp.maximum(2*coefficient_a, 1e-30))
    upper = xp.where(coefficient_a > 1e-24, upper, 1.)
    alpha = float(xp.clip(xp.min(upper), 0, 1))
    # float32 写盘前留微小余量；所有点使用同一比例，避免修正本身切出新边界。
    if alpha < 1:
        alpha = max(0., alpha-1e-7)
    output = (raw+alpha*delta).astype(xp.float32).astype(xp.float64)
    # 门禁针对最终 f32 顶点；接近阈值时不能忽略写盘量化造成的超界。
    if bool(xp.any(xp.linalg.norm(output[b]-output[a], axis=1) > limits)):
        lower, upper_alpha = 0., alpha
        for _ in range(26):
            middle = .5*(lower+upper_alpha)
            trial = (raw+middle*delta).astype(xp.float32).astype(xp.float64)
            if bool(xp.all(xp.linalg.norm(trial[b]-trial[a], axis=1) <= limits)):
                lower = middle
            else:
                upper_alpha = middle
        alpha = lower
        output = (raw+alpha*delta).astype(xp.float32).astype(xp.float64)
    final_lengths = xp.linalg.norm(output[b]-output[a], axis=1)
    record = {'alpha': alpha, 'rawMaximumMeaningfulEdgeRatio': float(xp.max(raw_lengths/rest)),
              'candidateMaximumMeaningfulEdgeRatio': float(xp.max(xp.linalg.norm(candidate[b]-candidate[a], axis=1)/rest)),
              'finalMaximumMeaningfulEdgeRatio': float(xp.max(final_lengths/rest)),
              'maximumEdgeBoundExcess': float(xp.max(final_lengths-limits)), 'meaningfulEdges': len(a)}
    return output, record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', required=True)
    parser.add_argument('--skin', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--poses', default='pillow,loaf')
    parser.add_argument('--cycles', type=int, default=12)
    parser.add_argument('--gpu', type=int, default=None, help='CUDA device for the independent fairing stage; omitted uses NumPy')
    parser.add_argument('--memory-limit', type=int, default=4294967296)
    parser.add_argument('--no-neck', action='store_true')
    parser.add_argument('--wrists', action='store_true')
    parser.add_argument('--wrist-cycles', type=int, default=12)
    parser.add_argument('--wrist-mode', choices=['taubin', 'dq'], default='taubin')
    parser.add_argument('--wrist-dq-blend', type=float, default=1.)
    parser.add_argument('--neck-mode', choices=['taubin', 'periodic', 'dq', 'dq-continuous'], default='taubin')
    parser.add_argument('--neck-dq-blend', type=float, default=.8)
    parser.add_argument('--neck-rest-cycles', type=int, default=0, help='Fair only the old rest cut-ring before evaluating its DQ target; source and t0 remain unchanged')
    parser.add_argument('--neck-rest-fit', action='store_true')
    args = parser.parse_args()
    spec = importlib.util.spec_from_file_location('cat_surface_qc', Path(__file__).with_name('cat_repair_v2_surface_qc.py'))
    qc = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(qc)
    input_root, skin_root, out = Path(args.input), Path(args.skin), Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    meta = json.loads((input_root/'goals.json').read_text(encoding='utf-8-sig'))
    source = input_root/'anatomy-neutral.glb'
    points, faces, ids, weights, parts, names = qc.read_glb(source, [p['name'] for p in meta['parts']])
    if qc.sha(source) != meta['sourceSHA256']:
        raise ValueError('Source SHA mismatch')
    rest, first, inverse = np.unique(np.round(points, 6), axis=0, return_index=True, return_inverse=True)
    rest = points[first]
    triangles = inverse[faces]
    prepared = prepare_neck_fairing(rest, triangles, ids[first], weights[first], names)
    joints = json.loads((input_root/'anatomy-skeleton.json').read_text())
    wrist = prepare_wrist_fairing(rest, ids[first], weights[first], names, joints, prepared)
    if args.no_neck:
        prepared['amount'].fill(0)
    xp = np
    postprocess_device = 'CPU NumPy'
    gpu_uuid = None
    if args.gpu is not None:
        os.environ['CUDA_VISIBLE_DEVICES'] = str(args.gpu)
        import cupy as cp
        xp = cp
        cp.get_default_memory_pool().set_limit(size=args.memory_limit)
        postprocess_device = cp.cuda.runtime.getDeviceProperties(0)['name']
        if isinstance(postprocess_device, bytes):
            postprocess_device = postprocess_device.decode()
        gpu_uuid = subprocess.run(['nvidia-smi', '--id='+str(args.gpu), '--query-gpu=uuid', '--format=csv,noheader'], capture_output=True, text=True).stdout.strip()
    def transfer(value):
        return {key: xp.asarray(item) for key, item in value.items()}
    prepared_device, wrist_device = transfer(prepared), transfer(wrist)
    pillow = json.loads((input_root/'pillow-surface.json').read_text())
    pillow_heights = xp.asarray(pillow['heights'], dtype=xp.float32).reshape(pillow['n'], pillow['n'])
    target_rest = rest.copy()
    if args.neck_rest_cycles or args.neck_rest_fit:
        rest_ring = {**prepared, 'amount': prepared['amount']*smooth(.76, .81, prepared['diagonal'])*(1-smooth(.89, .94, prepared['diagonal']))}
        if args.neck_rest_fit:
            target_rest = apply_periodic_neck_fairing(np, target_rest, rest_ring, progress=1, max_move=.012)
        target_rest = apply_neck_fairing(np, target_rest, rest_ring, progress=1, cycles=args.neck_rest_cycles)
    dense_weights = prepare_continuous_neck_weights(rest, ids[first], weights[first], names)
    source_dense = np.zeros_like(dense_weights)
    for slot in range(ids.shape[1]):
        np.add.at(source_dense, (np.arange(len(rest)), ids[first, slot]), weights[first, slot])
    if args.neck_mode == 'dq':
        dense_weights = source_dense
    dense_weights_device, rest_device = xp.asarray(dense_weights), xp.asarray(target_rest, dtype=xp.float32)
    source_weights_device, source_rest_device = xp.asarray(source_dense), xp.asarray(rest, dtype=xp.float32)
    triangles_device = xp.asarray(triangles)
    effective_amount = np.maximum(prepared['amount'], wrist['amount'] if args.wrists else 0)
    face_protected = prepared['protected']
    reports, outputs, parents = [], [], []
    wanted = set(args.poses.split(','))
    parent_manifests = [(p, json.loads(p.read_text())) for p in skin_root.glob('*-manifest.json')]
    for pose in meta['poses']:
        if pose['id'] not in wanted:
            continue
        file = skin_root/(pose['id']+'-skin.f32')
        original = np.fromfile(file, dtype='<f4').reshape(len(pose['times']), 2, len(points), 3)
        matching = [(p, m, a) for p, m in parent_manifests for a in m.get('outputs', []) if a.get('file') == file.name]
        if len(matching) != 1:
            raise ValueError('Missing/unresolved completed GPU manifest: '+file.name)
        path, parent, artifact = matching[0]
        if parent['sourceSHA256'] != meta['sourceSHA256'] or artifact['sha256'] != qc.sha(file):
            raise ValueError('GPU source/output hash mismatch')
        parents.append({'manifest': str(path), 'manifestSHA256': qc.sha(path), 'artifact': artifact})
        result = original.copy()
        matrices = np.fromfile(input_root/pose['matrices'], dtype='<f4').reshape(len(pose['times']), meta['bones'], 4, 4).transpose(0, 1, 3, 2)
        for frame, progress in enumerate(pose['times']):
            before = original[frame, 0, first].astype(np.float64)
            after_device = xp.asarray(before, dtype=xp.float32)
            if args.neck_mode == 'periodic' and not args.no_neck:
                after_device = apply_periodic_neck_fairing(xp, after_device, prepared_device, progress=progress)
            if args.neck_mode.startswith('dq') and not args.no_neck:
                goal = dual_quaternion_goal(xp, rest_device, dense_weights_device, matrices[frame])
                after_device = apply_dq_neck_target(xp, after_device, prepared_device, goal, progress=progress, strength=args.neck_dq_blend)
            after_device = apply_neck_fairing(xp, after_device, prepared_device, progress=progress, cycles=args.cycles)
            if args.wrists:
                if args.wrist_mode == 'dq':
                    wrist_goal = dual_quaternion_goal(xp, source_rest_device, source_weights_device, matrices[frame])
                    after_device = apply_dq_neck_target(xp, after_device, wrist_device, wrist_goal, progress=progress, strength=args.wrist_dq_blend)
                else:
                    after_device = apply_neck_fairing(xp, after_device, wrist_device, progress=progress, cycles=args.wrist_cycles)
            # 只约束本轮实际改动的非保护颈点；不接管原 GPU 的其他接触。
            support = support_height(xp, after_device, pose['id'], progress, pillow, pillow_heights)
            neck_changed = (prepared_device['amount'] > 0) & (~prepared_device['protected'])
            neck_changed &= xp.any(after_device != xp.asarray(before, dtype=xp.float32), axis=1)
            if progress <= 1e-8:
                neck_changed[:] = False
            lift = xp.where(neck_changed, xp.maximum(support-after_device[:, 1], 0), 0)
            after_device[:, 1] += lift
            after_device, edge_guard = guard_corrective_edges(xp, xp.asarray(before, dtype=xp.float64), after_device, prepared_device)
            support = support_height(xp, after_device, pose['id'], progress, pillow, pillow_heights)
            neck_changed &= xp.any(after_device != xp.asarray(before, dtype=xp.float64), axis=1)
            rejected_reason = None
            if bool(xp.any(neck_changed & (after_device[:, 1] < support-1e-6))):
                rejected_reason = 'Constraint conflict: the global edge guard leaves a modified neck point below support; whole corrective frame restored to raw, including normals'
                after_device = xp.asarray(before, dtype=xp.float64)
                edge_guard['alpha'] = 0.
                edge_guard['finalMaximumMeaningfulEdgeRatio'] = edge_guard['rawMaximumMeaningfulEdgeRatio']
                edge_guard['maximumEdgeBoundExcess'] = -1e-7
                neck_changed[:] = False
                support = support_height(xp, after_device, pose['id'], progress, pillow, pillow_heights)
            after = after_device if xp is np else xp.asnumpy(after_device)
            result[frame, 0] = after[inverse]
            normal_device = xp.zeros_like(after_device)
            cross = xp.cross(after_device[triangles_device[:, 1]]-after_device[triangles_device[:, 0]], after_device[triangles_device[:, 2]]-after_device[triangles_device[:, 0]])
            for corner in range(3):
                xp.add.at(normal_device, triangles_device[:, corner], cross)
            normal = normal_device if xp is np else xp.asnumpy(normal_device)
            length = np.linalg.norm(normal, axis=1)
            normal /= np.maximum(length[:, None], 1e-12)
            normal[length < 1e-10] = original[frame, 1, first][length < 1e-10]
            normal[face_protected] = original[frame, 1, first][face_protected]
            result[frame, 1] = normal[inverse]
            # 未进入面域的原顶点法线也须逐字保持；站姿整帧完全不处理。
            result[frame, 1, effective_amount[inverse] == 0] = original[frame, 1, effective_amount[inverse] == 0]
            if progress <= 1e-8 or rejected_reason:
                result[frame] = original[frame]
            displacement = np.linalg.norm(after-before, axis=1)
            record = {'pose': pose['id'], 'progress': progress, 'maximumDisplacement': float(displacement.max()),
                      'protectedFaceEarMaximumDisplacement': float(displacement[face_protected].max()),
                      'outsideMaskMaximumDisplacement': float(displacement[effective_amount == 0].max()),
                      'supportProjectedVertices': int(xp.count_nonzero(lift > 0)), 'maximumSupportLift': float(xp.max(lift)),
                      'edgeGuard': edge_guard,
                      'rejectedReason': rejected_reason,
                      'minimumModifiedNeckSupportGap': float(xp.min((after_device[:, 1]-support)[neck_changed])) if bool(xp.any(neck_changed)) else None,
                      'minimumY': float(after[:, 1].min()), 'sourceRoundTripError': float(np.linalg.norm(points-rest[inverse], axis=1).max())}
            reports.append(record)
        output_file = out/file.name
        result.astype('<f4').tofile(output_file)
        outputs.append({'pose': pose['id'], 'file': output_file.name, 'bytes': output_file.stat().st_size, 'sha256': qc.sha(output_file)})
    if not outputs:
        raise ValueError('No requested GPU poses')
    manifest = {k: parent.get(k) for k in ['host', 'device', 'deviceIndex', 'gpuUUID', 'solverSHA256']}
    manifest.update({'status': 'review', 'humanReview': 'pending', 'method': 'Parent CUDA ARAP output plus local '+('NumPy' if args.gpu is None else 'CuPy CUDA')+' cervical/wrist fairing; face/ears and outside masks fixed',
                     'sourceSHA256': qc.sha(source), 'goalsSHA256': qc.sha(input_root/'goals.json'),
                     'postprocessSHA256': qc.sha(__file__), 'poses': sorted(wanted), 'outputs': outputs, 'records': reports,
                     'postprocess': {'neckEnabled': not args.no_neck, 'neckMode': args.neck_mode, 'neckDQBlend': args.neck_dq_blend, 'neckRestCycles': args.neck_rest_cycles, 'neckRestFit': args.neck_rest_fit, 'maximumRestTargetDisplacement': float(np.linalg.norm(target_rest-rest, axis=1).max()), 'continuousNeckHeadDiagonalRange': [.84, 1.01], 'cycles': args.cycles, 'wristEnabled': args.wrists, 'wristMode': args.wrist_mode, 'wristDQBlend': args.wrist_dq_blend, 'wristCycles': args.wrist_cycles,
                                     'positive': .45, 'negative': -.47, 'processedNeckUniqueVertices': int(np.sum(prepared['amount'] > 0)),
                                     'processedWristUniqueVertices': int(np.sum(wrist['amount'] > 0)) if args.wrists else 0,
                                     'protectedFaceEarUniqueVertices': int(face_protected.sum()), 'newVertices': 0,
                                     'supportProjection': 'Only modified nonprotected neck points, exact parent CUDA floor .003 plus bilinear moving pillow; t0 unchanged',
                                     'edgeGuard': 'One global alpha on raw-to-candidate displacement including support projection; every original edge >.002 limited to max(raw length,1.95*rest length)+1e-7',
                                     'host': socket.gethostname(), 'device': postprocess_device, 'deviceIndex': args.gpu, 'gpuUUID': gpu_uuid, 'memoryLimitBytes': args.memory_limit}, 'parentGpuArtifacts': parents})
    (out/'neck-fairing-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({'out': str(out), 'outputs': outputs, 'records': reports, 'postprocess': manifest['postprocess']}, indent=2))


if __name__ == '__main__':
    main()
