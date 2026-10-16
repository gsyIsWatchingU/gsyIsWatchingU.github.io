"""猫咪曲面诊断：纯 NumPy；每个真交叉都保留源网格基线与面编号。"""
import argparse
import hashlib
import itertools
import json
import math
import struct
import time
from collections import Counter, defaultdict
from pathlib import Path

import numpy as np


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def read_glb(path, part_names):
    raw = Path(path).read_bytes()
    if raw[:4] != b'glTF':
        raise ValueError('Input is not a GLB')
    size = struct.unpack_from('<I', raw, 12)[0]
    gltf = json.loads(raw[20:20+size])
    blob = raw[28+size:]
    types = {5120: '<i1', 5121: '<u1', 5122: '<i2', 5123: '<u2', 5125: '<u4', 5126: '<f4'}
    widths = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}

    def array(index):
        accessor = gltf['accessors'][index]
        view = gltf['bufferViews'][accessor['bufferView']]
        if 'EXT_meshopt_compression' in view.get('extensions', {}):
            raise ValueError('Supply the uncompressed anatomy-neutral.glb')
        dtype = np.dtype(types[accessor['componentType']])
        width = widths[accessor['type']]
        return np.ndarray((accessor['count'], width), dtype=dtype, buffer=blob,
                          offset=view.get('byteOffset', 0)+accessor.get('byteOffset', 0),
                          strides=(view.get('byteStride', width*dtype.itemsize), dtype.itemsize)).copy()

    nodes = {n.get('name'): n for n in gltf['nodes'] if 'mesh' in n}
    vertices, faces, skin_ids, skin_weights, parts, offset, face_offset = [], [], [], [], [], 0, 0
    for name in part_names:
        node = nodes[name]
        if node.get('translation', [0, 0, 0]) != [0, 0, 0] or 'matrix' in node or 'rotation' in node or 'scale' in node:
            raise ValueError('QC requires neutral mesh nodes in the same model coordinates as the GPU points')
        primitive = gltf['meshes'][node['mesh']]['primitives'][0]
        attrs = primitive['attributes']
        points = array(attrs['POSITION']).astype(np.float64)
        triangles = array(primitive['indices']).reshape(-1, 3).astype(np.int64)
        vertices.append(points)
        faces.append(triangles+offset)
        skin_ids.append(array(attrs['JOINTS_0']).astype(np.int64))
        skin_weights.append(array(attrs['WEIGHTS_0']).astype(np.float64))
        parts.append({'name': name, 'vertexOffset': offset, 'vertices': len(points),
                      'faceOffset': face_offset, 'faces': len(triangles)})
        offset += len(points)
        face_offset += len(triangles)
    joint_names = [gltf['nodes'][i]['name'] for i in gltf['skins'][0]['joints']]
    return np.concatenate(vertices), np.concatenate(faces), np.concatenate(skin_ids), np.concatenate(skin_weights), parts, joint_names


def unit(v):
    return v/np.maximum(np.linalg.norm(v, axis=-1, keepdims=True), 1e-30)


def face_geometry(points, faces):
    tri = points[faces]
    cross = np.cross(tri[:, 1]-tri[:, 0], tri[:, 2]-tri[:, 0])
    double_area = np.linalg.norm(cross, axis=1)
    return tri, cross/np.maximum(double_area[:, None], 1e-30), double_area*.5


def family(name):
    for prefix in ['front_l', 'front_r', 'back_l', 'back_r']:
        if name.startswith('DEF_'+prefix+'_'):
            return prefix
    if name in ('DEF_head', 'DEF_neck') or name.startswith('DEF_ear'):
        return 'head_neck'
    if name.startswith('DEF_tail'):
        return 'tail'
    return 'torso'


def topology(points, faces, ids, weights, names, parts, weld_tolerance):
    _, weld = np.unique(np.rint(points/weld_tolerance).astype(np.int64), axis=0, return_inverse=True)
    weld_faces = weld[faces]
    edges = np.sort(np.concatenate([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]]), axis=1)
    edges = np.unique(edges, axis=0)
    lengths = np.linalg.norm(points[edges[:, 0]]-points[edges[:, 1]], axis=1)
    edge_faces = defaultdict(list)
    for face_id, tri in enumerate(weld_faces):
        for a, b in [(tri[0], tri[1]), (tri[1], tri[2]), (tri[2], tri[0])]:
            if a != b:
                edge_faces[(min(int(a), int(b)), max(int(a), int(b)))].append(face_id)
    interior = np.array([v for v in edge_faces.values() if len(v) == 2], dtype=np.int64).reshape(-1, 2)
    source_keys, count = np.unique(np.sort(weld_faces, axis=1), axis=0, return_counts=True)
    source_joint = np.array([names[int(j)] for j in ids[np.arange(len(ids)), weights.argmax(axis=1)]])
    source_region = np.array([family(n) for n in source_joint])
    face_region = np.array([Counter(source_region[tri]).most_common(1)[0][0] for tri in faces])
    weld_to_vertices = defaultdict(list)
    for i, w in enumerate(weld):
        weld_to_vertices[int(w)].append(i)
    part_index = np.empty(len(points), dtype=np.int64)
    for index, part in enumerate(parts):
        part_index[part['vertexOffset']:part['vertexOffset']+part['vertices']] = index
    seams = []
    for group in weld_to_vertices.values():
        for a, b in itertools.combinations(group, 2):
            if part_index[a] != part_index[b]:
                seams.append((a, b))
    return {'weld': weld, 'weldFaces': weld_faces, 'edges': edges, 'edgeLengths': lengths,
            'interior': interior, 'seams': np.array(seams, dtype=np.int64).reshape(-1, 2),
            'vertexRegion': source_region, 'vertexJoint': source_joint, 'faceRegion': face_region,
            'baselineTopology': {'weldTolerance': weld_tolerance, 'weldedVertices': int(weld.max()+1),
                                 'boundaryEdges': sum(len(v) == 1 for v in edge_faces.values()),
                                 'nonManifoldEdges': sum(len(v) > 2 for v in edge_faces.values()),
                                 'duplicateFaceGroups': int(np.sum(count > 1)),
                                 'duplicateFacesExtra': int(np.sum(np.maximum(count-1, 0))),
                                 'crossPartCoincidentVertexPairs': len(seams)}}


def candidate_pairs(triangles, cell_size):
    """完整空间哈希；不抽样、不限制候选对数；随后做精确 AABB 相交过滤。"""
    low, high = triangles.min(axis=1), triangles.max(axis=1)
    origin = low.min(axis=0)
    lo = np.floor((low-origin)/cell_size).astype(np.int64)
    hi = np.floor((high-origin)/cell_size).astype(np.int64)
    grid = defaultdict(list)
    assignments = 0
    for index, (a, b) in enumerate(zip(lo, hi)):
        for x in range(a[0], b[0]+1):
            for y in range(a[1], b[1]+1):
                for z in range(a[2], b[2]+1):
                    grid[(int(x), int(y), int(z))].append(index)
                    assignments += 1
    count = len(triangles)
    chunks = []
    for group in grid.values():
        if len(group) < 2:
            continue
        a, b = np.triu_indices(len(group), 1)
        ids = np.asarray(group, dtype=np.int64)
        chunks.append(ids[a]*count+ids[b])
    if not chunks:
        return np.empty((0, 2), dtype=np.int64), {'gridCells': len(grid), 'cellAssignments': assignments, 'hashedPairs': 0}
    encoded = np.unique(np.concatenate(chunks))
    pairs = np.column_stack([encoded//count, encoded % count])
    overlap = np.all(low[pairs[:, 0]] <= high[pairs[:, 1]]+1e-10, axis=1) & np.all(low[pairs[:, 1]] <= high[pairs[:, 0]]+1e-10, axis=1)
    return pairs[overlap], {'gridCells': len(grid), 'cellAssignments': assignments, 'hashedPairs': len(pairs)}


def segment_triangle(start, end, triangle):
    """Möller–Trumbore：只计真正穿过三角内部的线段，排除仅接触边界。"""
    direction = end-start
    e1, e2 = triangle[:, 1]-triangle[:, 0], triangle[:, 2]-triangle[:, 0]
    h = np.cross(direction, e2)
    det = np.einsum('ij,ij->i', e1, h)
    good = np.abs(det) > 1e-13
    inv = np.zeros_like(det)
    inv[good] = 1/det[good]
    s = start-triangle[:, 0]
    u = np.einsum('ij,ij->i', s, h)*inv
    cross = np.cross(s, e1)
    w = np.einsum('ij,ij->i', direction, cross)*inv
    t = np.einsum('ij,ij->i', e2, cross)*inv
    eps = 1e-7
    hit = good & (u > eps) & (w > eps) & (u+w < 1-eps) & (t > eps) & (t < 1-eps)
    return hit, start+direction*t[:, None]


def pair_scales(points, faces, pairs):
    """交线长度与三角平面穿越深度代理；后者不是封闭体穿透深度。"""
    if not len(pairs):
        return np.empty(0), np.empty(0), np.empty(0), np.empty((0, 2, 3))
    triangles = points[faces[pairs]]
    samples, masks = [], []
    for source, target in [(triangles[:, 0], triangles[:, 1]), (triangles[:, 1], triangles[:, 0])]:
        for k in range(3):
            hit, at = segment_triangle(source[:, k], source[:, (k+1) % 3], target)
            samples.append(at)
            masks.append(hit)
    samples, masks = np.stack(samples, axis=1), np.stack(masks, axis=1)
    distances = np.linalg.norm(samples[:, :, None]-samples[:, None, :], axis=-1)
    distances = np.where(masks[:, :, None] & masks[:, None, :], distances, 0)
    extreme = distances.reshape(len(pairs), -1).argmax(axis=1)
    chords = distances.reshape(len(pairs), -1).max(axis=1)
    endpoints = samples[np.arange(len(pairs))[:, None], np.column_stack([extreme//6, extreme % 6])]
    normals = unit(np.cross(triangles[:, :, 1]-triangles[:, :, 0], triangles[:, :, 2]-triangles[:, :, 0]))
    depths = []
    for a, b in [(0, 1), (1, 0)]:
        signed = np.einsum('nki,ni->nk', triangles[:, a]-triangles[:, b, 0, None], normals[:, b])
        depths.append(np.maximum(0, np.minimum(signed.max(axis=1), -signed.min(axis=1))))
    depth = np.maximum(depths[0], depths[1])
    angle = np.degrees(np.arccos(np.clip(np.abs(np.einsum('ij,ij->i', normals[:, 0], normals[:, 1])), 0, 1)))
    return chords, depth, angle, endpoints


def orient2(a, b, c):
    return (b[:, 0]-a[:, 0])*(c[:, 1]-a[:, 1])-(b[:, 1]-a[:, 1])*(c[:, 0]-a[:, 0])


def coplanar_overlap(a, b, normal):
    """共面三角的严格面积重叠；共享几何顶点已在调用前剔除。"""
    output = np.zeros(len(a), dtype=bool)
    witnesses = np.zeros((len(a), 3))
    axes = np.abs(normal).argmax(axis=1)
    for drop in range(3):
        mask = axes == drop
        if not np.any(mask):
            continue
        keep = [axis for axis in range(3) if axis != drop]
        aa, bb = a[mask][:, :, keep], b[mask][:, :, keep]
        hit = np.zeros(len(aa), dtype=bool)
        at = np.zeros((len(aa), 3))
        for i in range(3):
            for j in range(3):
                ac, ad = orient2(aa[:, i], aa[:, (i+1) % 3], bb[:, j]), orient2(aa[:, i], aa[:, (i+1) % 3], bb[:, (j+1) % 3])
                bc, bd = orient2(bb[:, j], bb[:, (j+1) % 3], aa[:, i]), orient2(bb[:, j], bb[:, (j+1) % 3], aa[:, (i+1) % 3])
                crosses = (ac*ad < -1e-22) & (bc*bd < -1e-22)
                if np.any(crosses):
                    r, s = aa[:, (i+1) % 3]-aa[:, i], bb[:, (j+1) % 3]-bb[:, j]
                    offset = bb[:, j]-aa[:, i]
                    denominator = r[:, 0]*s[:, 1]-r[:, 1]*s[:, 0]
                    fraction = np.zeros(len(aa))
                    fraction[crosses] = ((offset[:, 0]*s[:, 1]-offset[:, 1]*s[:, 0])/np.where(crosses, denominator, 1))[crosses]
                    at[crosses] = (a[mask][:, i]+fraction[:, None]*(a[mask][:, (i+1) % 3]-a[mask][:, i]))[crosses]
                hit |= crosses
        for outer, inner, inner3d in [(aa, bb, b[mask]), (bb, aa, a[mask])]:
            for corner in range(3):
                signs = np.column_stack([orient2(outer[:, i], outer[:, (i+1) % 3], inner[:, corner]) for i in range(3)])
                contained = np.all(signs > 1e-11, axis=1) | np.all(signs < -1e-11, axis=1)
                at[contained] = inner3d[contained, corner]
                hit |= contained
        output[mask] = hit
        witnesses[mask] = at
    return output, witnesses


def intersections(points, faces, topo, cell_size):
    triangles, normals, areas = face_geometry(points, faces)
    candidates, broad = candidate_pairs(triangles, cell_size)
    aabb_count = len(candidates)
    shared = np.any(topo['weldFaces'][candidates[:, 0], :, None] == topo['weldFaces'][candidates[:, 1], None, :], axis=(1, 2))
    candidates = candidates[~shared]
    non_degenerate = (areas[candidates[:, 0]] > 1e-12) & (areas[candidates[:, 1]] > 1e-12)
    candidates = candidates[non_degenerate]
    hits, coplanar_hits, witnesses = [], [], []
    for begin in range(0, len(candidates), 50000):
        pairs = candidates[begin:begin+50000]
        a, b = triangles[pairs[:, 0]], triangles[pairs[:, 1]]
        an, bn = normals[pairs[:, 0]], normals[pairs[:, 1]]
        ab_distance = np.einsum('nki,ni->nk', b-a[:, 0, None, :], an)
        ba_distance = np.einsum('nki,ni->nk', a-b[:, 0, None, :], bn)
        separate = np.all(ab_distance > 1e-9, axis=1) | np.all(ab_distance < -1e-9, axis=1) | np.all(ba_distance > 1e-9, axis=1) | np.all(ba_distance < -1e-9, axis=1)
        coplanar = (np.max(np.abs(ab_distance), axis=1) < 1e-9) & (np.max(np.abs(ba_distance), axis=1) < 1e-9)
        hit = np.zeros(len(pairs), dtype=bool)
        witness = np.zeros((len(pairs), 3))
        active = ~separate & ~coplanar
        if np.any(active):
            for source, target in [(a, b), (b, a)]:
                for corner in range(3):
                    found, at = segment_triangle(source[active, corner], source[active, (corner+1) % 3], target[active])
                    indices = np.flatnonzero(active)[found]
                    witness[indices] = at[found]
                    hit[indices] = True
        coplanar_hit = np.zeros(len(pairs), dtype=bool)
        if np.any(coplanar):
            overlap, at = coplanar_overlap(a[coplanar], b[coplanar], an[coplanar])
            coplanar_hit[coplanar] = overlap
            witness[np.flatnonzero(coplanar)[overlap]] = at[overlap]
        all_hit = hit | coplanar_hit
        hits.extend(pairs[all_hit].tolist())
        witnesses.extend(witness[all_hit].tolist())
        coplanar_hits.extend(coplanar_hit[all_hit].tolist())
    return np.array(hits, dtype=np.int64).reshape(-1, 2), np.array(witnesses).reshape(-1, 3), np.array(coplanar_hits, dtype=bool), {
        **broad, 'aabbPairs': aabb_count, 'nonAdjacentPairsTested': len(candidates),
        'complete': True, 'strictBoundaryExcluded': True, 'coplanarAreaOverlapIncluded': True}


def regions(values):
    return dict(sorted(Counter(str(v) for v in values).items()))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True)
    parser.add_argument('--goals', required=True)
    parser.add_argument('--skin', required=True, help='A *-skin.f32 file or directory')
    parser.add_argument('--out', required=True)
    parser.add_argument('--poses', default='')
    parser.add_argument('--edge-min', type=float, default=.002)
    parser.add_argument('--cell-size', type=float, default=.025)
    parser.add_argument('--weld-tolerance', type=float, default=1e-6)
    parser.add_argument('--skip-intersections', action='store_true', help='Explicitly mark self-intersections untested')
    args = parser.parse_args()
    started = time.perf_counter()
    metadata = json.loads(Path(args.goals).read_text(encoding='utf-8-sig'))
    points, faces, ids, weights, parts, names = read_glb(args.source, [p['name'] for p in metadata['parts']])
    if len(points) != metadata['vertexCount']:
        raise ValueError('Source vertex count differs from goals.json')
    actual_source = sha(args.source)
    topo = topology(points, faces, ids, weights, names, parts, args.weld_tolerance)
    _, rest_normals, rest_areas = face_geometry(points, faces)
    interior = topo['interior']
    rest_angles = np.degrees(np.arccos(np.clip(np.einsum('ij,ij->i', rest_normals[interior[:, 0]], rest_normals[interior[:, 1]]), -1, 1)))
    edge_mask = topo['edgeLengths'] > args.edge_min
    valid_edges, rest_lengths = topo['edges'][edge_mask], topo['edgeLengths'][edge_mask]
    region_labels = np.array(['|'.join(sorted(set(topo['vertexRegion'][edge]))) for edge in valid_edges])
    baseline_pairs, baseline_witness, baseline_coplanar, broad = (intersections(points, faces, topo, args.cell_size) if not args.skip_intersections else
        (np.empty((0, 2), dtype=np.int64), np.empty((0, 3)), np.empty(0, dtype=bool), {'complete': False}))
    baseline_codes = set(int(a)*len(faces)+int(b) for a, b in baseline_pairs)
    baseline_chords, baseline_depths, baseline_pair_angles, baseline_endpoints = pair_scales(points, faces, baseline_pairs)
    baseline_scale = {int(a)*len(faces)+int(b): (float(chord), float(depth)) for (a, b), chord, depth in zip(baseline_pairs, baseline_chords, baseline_depths)}
    face_part = np.empty(len(faces), dtype=object)
    vertex_part = np.empty(len(points), dtype=object)
    for part in parts:
        face_part[part['faceOffset']:part['faceOffset']+part['faces']] = part['name']
        vertex_part[part['vertexOffset']:part['vertexOffset']+part['vertices']] = part['name']

    def face_info(face_id):
        face_id = int(face_id)
        return {'face': face_id, 'part': str(face_part[face_id]), 'region': str(topo['faceRegion'][face_id]), 'vertices': faces[face_id].tolist(),
                'dominantVertexJoints': topo['vertexJoint'][faces[face_id]].tolist(), 'sourceCenter': points[faces[face_id]].mean(axis=0).tolist()}

    def pair_info(pair, at, coplanar):
        return {'a': face_info(pair[0]), 'b': face_info(pair[1]), 'witness': np.asarray(at).tolist(), 'coplanar': bool(coplanar)}

    report = {'status': 'diagnostic-review', 'humanReview': 'pending', 'source': str(Path(args.source)), 'sourceSHA256': actual_source,
              'goalsSHA256': sha(args.goals), 'declaredSourceSHA256': metadata.get('sourceSHA256'),
              'sourceHashMatchesGoals': actual_source == metadata.get('sourceSHA256'),
              'scope': 'All supplied frames, unique original edges > edge-min, exact strict non-adjacent triangle crossings plus coplanar area overlaps; source defects retained separately',
              'limits': ['Sub-epsilon/tangential contact is excluded; intersections count triangle pairs, not physical penetration volume.',
                         'A new intersecting face pair can move within an existing source defect; review region and witnesses before calling it motion-induced.',
                         'Transported-normal disagreement and sharp folds are diagnostic candidates, not an automatic anatomical verdict.',
                         'Triangle-plane crossing depth is a local proxy, not a closed-volume penetration distance or physical millimetres.',
                         'No closed-volume penetration or visual quality approval is inferred from these geometric checks.'],
              'thresholds': {'edgeMinimum': args.edge_min, 'weldTolerance': args.weld_tolerance, 'hashCellSize': args.cell_size,
                             'degenerateArea': 1e-12, 'reliableAreaMinimum': 1e-9, 'areaCollapseRatio': .10, 'sharpFoldDegrees': 140, 'restSmoothDegrees': 70,
                             'macroIntersectionChord': .002, 'macroPlaneCrossDepthProxy': .001, 'sourceDepthGrowthFlag': .0005, 'sourceChordGrowthFlag': .001},
              'parts': parts, 'vertices': len(points), 'faces': len(faces), 'testedEdges': len(valid_edges),
              'baseline': {**topo['baselineTopology'], 'degenerateFaces': int(np.sum(rest_areas <= 1e-12)),
                           'degenerateFaceSamples': [face_info(f) for f in np.flatnonzero(rest_areas <= 1e-12)[:20]],
                           'selfIntersectionPairs': len(baseline_pairs), 'coplanarPairs': int(np.sum(baseline_coplanar)),
                           'selfIntersectionTested': not args.skip_intersections, 'facePairIndices': baseline_pairs.tolist(),
                           'maximumIntersectionChord': float(np.max(baseline_chords, initial=0)),
                           'maximumPlaneCrossDepthProxy': float(np.max(baseline_depths, initial=0)),
                           'sourcePairScales': [{'faces': pair.tolist(), 'chord': float(chord), 'planeDepthProxy': float(depth),
                                                'acuteNormalAngleDegrees': float(angle), 'lineEndpoints': ends.tolist()} for pair, chord, depth, angle, ends in
                                               zip(baseline_pairs, baseline_chords, baseline_depths, baseline_pair_angles, baseline_endpoints)],
                           'selfIntersectionRegionPairs': regions('|'.join(sorted([topo['faceRegion'][a], topo['faceRegion'][b]])) for a, b in baseline_pairs),
                           'intersectionSamples': [pair_info(pair, at, cop) for pair, at, cop in zip(baseline_pairs[:20], baseline_witness[:20], baseline_coplanar[:20])],
                           'intersectionBroadPhase': broad}, 'records': []}
    print('baseline', json.dumps({k: report['baseline'][k] for k in ['boundaryEdges', 'nonManifoldEdges', 'selfIntersectionPairs', 'degenerateFaces']}), flush=True)
    selected = set(filter(None, args.poses.split(',')))
    skin_path = Path(args.skin)
    for pose in metadata['poses']:
        if selected and pose['id'] not in selected:
            continue
        path = skin_path/(pose['id']+'-skin.f32') if skin_path.is_dir() else skin_path
        if not path.exists() or (not skin_path.is_dir() and not path.name.startswith(pose['id']+'-')):
            continue
        expected = len(pose['times'])*len(points)*6
        data = np.fromfile(path, dtype='<f4')
        if data.size != expected:
            raise ValueError(f'{path}: {data.size} floats, expected {expected}; no frame truncation is allowed')
        data = data.reshape(len(pose['times']), 2, len(points), 3).astype(np.float64)
        matrix_path = Path(args.goals).parent/pose.get('matrices', '')
        matrices = None
        if pose.get('matrices') and matrix_path.is_file():
            matrices = np.fromfile(matrix_path, dtype='<f4').reshape(len(pose['times']), metadata['bones'], 4, 4).transpose(0, 1, 3, 2)
        manifests = []
        for manifest_path in sorted(path.parent.glob('*manifest.json')):
            manifest = json.loads(manifest_path.read_text())
            if pose['id'] in manifest.get('poses', []) or manifest_path.name == pose['id']+'-manifest.json':
                manifests.append({'path': str(manifest_path), 'sourceSHA256': manifest.get('sourceSHA256'), 'SHA256': sha(manifest_path)})
        manifest_matches = all(m['sourceSHA256'] == actual_source for m in manifests) if manifests else None
        skin_sha, matrix_sha = sha(path), sha(matrix_path) if matrices is not None else None
        stand_codes, stand_available = set(), False
        for index, progress in enumerate(pose['times']):
            frame_started = time.perf_counter()
            posed, supplied_normals = data[index]
            if not np.isfinite(posed).all():
                report['records'].append({'pose': pose['id'], 'progress': progress, 'finitePositions': False})
                continue
            triangles, normals, areas = face_geometry(posed, faces)
            ratios = np.linalg.norm(posed[valid_edges[:, 0]]-posed[valid_edges[:, 1]], axis=1)/rest_lengths
            worst_ids = np.argsort(ratios)[-12:][::-1]
            sharp_angles = np.degrees(np.arccos(np.clip(np.einsum('ij,ij->i', normals[interior[:, 0]], normals[interior[:, 1]]), -1, 1)))
            new_sharp = np.flatnonzero((sharp_angles > 140) & (rest_angles < 70))
            reliable = rest_areas > 1e-9
            area_ratios = areas/np.maximum(rest_areas, 1e-30)
            collapsed = np.flatnonzero(reliable & (area_ratios < .1))
            degenerate = np.flatnonzero((areas <= 1e-12) & (rest_areas > 1e-12))
            pair_array, witnesses, coplanar, phase = (intersections(posed, faces, topo, args.cell_size) if not args.skip_intersections else
                (np.empty((0, 2), dtype=np.int64), np.empty((0, 3)), np.empty(0, dtype=bool), {'complete': False}))
            new_mask = np.array([int(a)*len(faces)+int(b) not in baseline_codes for a, b in pair_array], dtype=bool)
            if abs(progress) < 1e-8:
                stand_codes = set(int(a)*len(faces)+int(b) for a, b in pair_array)
                stand_available = True
            new_stand_mask = np.array([int(a)*len(faces)+int(b) not in baseline_codes | stand_codes for a, b in pair_array], dtype=bool)
            chords, depths, crossing_angles, line_endpoints = pair_scales(posed, faces, pair_array)
            macro = (chords >= .002) & (depths >= .001)
            source_growth = []
            escalated_source = []
            for pair_id in np.flatnonzero(~new_mask):
                a, b = pair_array[pair_id]
                rest_chord, rest_depth = baseline_scale[int(a)*len(faces)+int(b)]
                growth = {'faces': [int(a), int(b)], 'sourceChord': rest_chord, 'posedChord': float(chords[pair_id]),
                          'sourcePlaneDepthProxy': rest_depth, 'posedPlaneDepthProxy': float(depths[pair_id]),
                          'chordGrowth': float(chords[pair_id]-rest_chord), 'depthGrowth': float(depths[pair_id]-rest_depth)}
                source_growth.append(growth)
                if macro[pair_id] and (growth['depthGrowth'] > .0005 or growth['chordGrowth'] > .001):
                    escalated_source.append(growth)
            macro_order = np.flatnonzero(macro)
            macro_order = macro_order[np.argsort(depths[macro_order])[::-1]]
            new_by_region = defaultdict(list)
            for pair, at, cop in zip(pair_array[new_mask], witnesses[new_mask], coplanar[new_mask]):
                key = '|'.join(sorted([topo['faceRegion'][pair[0]], topo['faceRegion'][pair[1]]]))
                if len(new_by_region[key]) < 2:
                    new_by_region[key].append(pair_info(pair, at, cop))
            seam_distances = np.linalg.norm(posed[topo['seams'][:, 0]]-posed[topo['seams'][:, 1]], axis=1)
            seam_worst = np.argsort(seam_distances)[-10:][::-1]
            normal_lengths = np.linalg.norm(supplied_normals, axis=1)
            avg_supplied = unit(supplied_normals[faces].sum(axis=1))
            bad_supplied = np.flatnonzero(np.einsum('ij,ij->i', normals, avg_supplied) < -.1)
            transport = {'available': False}
            if matrices is not None:
                rotations = matrices[index, ids[faces], :3, :3]
                face_rotation = np.sum(rotations*weights[faces][..., None, None]/3, axis=(1, 2))
                expected_normals = unit(np.einsum('fij,fj->fi', face_rotation, rest_normals))
                normal_dot = np.einsum('ij,ij->i', normals, expected_normals)
                reversed_ids = np.flatnonzero(reliable & (normal_dot < -.1))
                transport = {'available': True, 'matrixSHA256': matrix_sha, 'opposedFaces': len(reversed_ids),
                             'regionCounts': regions(topo['faceRegion'][reversed_ids]),
                             'worstSamples': [{**face_info(f), 'normalDot': float(normal_dot[f])} for f in reversed_ids[np.argsort(normal_dot[reversed_ids])[:12]]]}
            record = {'pose': pose['id'], 'progress': progress, 'skinSHA256': skin_sha, 'manifestSourceMatches': manifest_matches, 'manifests': manifests,
                      'finitePositions': True, 'edgeStretch': {'maximum': float(ratios.max()), 'minimum': float(ratios.min()),
                          'p99': float(np.quantile(ratios, .99)), 'over2': int(np.sum(ratios > 2)), 'fractionOver2': float(np.mean(ratios > 2)),
                          'over3': int(np.sum(ratios > 3)), 'underPoint2': int(np.sum(ratios < .2)),
                          'over2RegionCounts': regions(region_labels[ratios > 2]),
                          'worst': [{'a': int(valid_edges[i, 0]), 'b': int(valid_edges[i, 1]), 'part': str(vertex_part[valid_edges[i, 0]]),
                                     'regions': str(region_labels[i]), 'restLength': float(rest_lengths[i]), 'ratio': float(ratios[i]),
                                     'pointA': posed[valid_edges[i, 0]].tolist(), 'pointB': posed[valid_edges[i, 1]].tolist(),
                                     'jointsA': [{'name': names[int(j)], 'weight': float(w)} for j, w in zip(ids[valid_edges[i, 0]], weights[valid_edges[i, 0]]) if w > 0],
                                     'jointsB': [{'name': names[int(j)], 'weight': float(w)} for j, w in zip(ids[valid_edges[i, 1]], weights[valid_edges[i, 1]]) if w > 0]} for i in worst_ids]},
                      'seams': {'pairs': len(seam_distances), 'maximumGap': float(seam_distances.max()) if len(seam_distances) else None,
                                'overPoint001': int(np.sum(seam_distances > .001)),
                                'worst': [{'vertices': topo['seams'][i].tolist(), 'gap': float(seam_distances[i])} for i in seam_worst]},
                      'faces': {'newDegenerate': len(degenerate), 'newDegenerateSamples': [face_info(f) for f in degenerate[:12]], 'collapsedAreaBelowPoint1': len(collapsed),
                                'collapsedRegionCounts': regions(topo['faceRegion'][collapsed]),
                                'collapsedSamples': [{**face_info(f), 'areaRatio': float(area_ratios[f])} for f in collapsed[:12]],
                                'newSharpFolds': len(new_sharp), 'sharpFoldSamples': [{'faces': interior[i].tolist(), 'restDegrees': float(rest_angles[i]),
                                    'posedDegrees': float(sharp_angles[i]), 'regions': topo['faceRegion'][interior[i]].tolist()} for i in new_sharp[:12]]},
                      'normals': {'finite': bool(np.isfinite(supplied_normals).all()), 'zeroCount': int(np.sum(normal_lengths < .1)),
                                  'maxUnitLengthError': float(np.max(np.abs(normal_lengths-1))), 'opposedToGeometricFaces': len(bad_supplied)},
                      'transportedNormals': transport,
                      'selfIntersection': {'pairs': len(pair_array), 'coplanarPairs': int(np.sum(coplanar)), 'newFacePairsVsSource': int(np.sum(new_mask)),
                          'tested': not args.skip_intersections, 'newFacePairIndices': pair_array[new_mask].tolist(),
                          'newFacePairsVsSourceAndStand': int(np.sum(new_stand_mask)), 'standCalibrationAvailable': stand_available,
                          'maximumIntersectionChord': float(np.max(chords, initial=0)), 'maximumPlaneCrossDepthProxy': float(np.max(depths, initial=0)),
                          'macroCrossingCandidates': int(np.sum(macro)), 'newMacroCandidatesVsSourceAndStand': int(np.sum(macro & new_stand_mask)),
                          'maximumMacroIntersectionChord': float(np.max(chords[macro], initial=0)),
                          'maximumMacroPlaneCrossDepthProxy': float(np.max(depths[macro], initial=0)),
                          'escalatedSourceMacroCandidates': len(escalated_source), 'escalatedSourcePairs': escalated_source,
                          'retainedSourcePairScales': source_growth,
                          'macroRegionPairs': regions('|'.join(sorted([topo['faceRegion'][a], topo['faceRegion'][b]])) for a, b in pair_array[macro]),
                          'macroSamples': [{**pair_info(pair_array[i], witnesses[i], coplanar[i]), 'chord': float(chords[i]), 'planeDepthProxy': float(depths[i]),
                                            'acuteNormalAngleDegrees': float(crossing_angles[i]), 'lineEndpoints': line_endpoints[i].tolist()} for i in macro_order[:30]],
                          'retainedSourceFacePairs': int(np.sum(~new_mask)),
                          'newRegionPairs': regions('|'.join(sorted([topo['faceRegion'][a], topo['faceRegion'][b]])) for a, b in pair_array[new_mask]),
                          'newSamples': [pair_info(pair, at, cop) for pair, at, cop in zip(pair_array[new_mask][:30], witnesses[new_mask][:30], coplanar[new_mask][:30])],
                          'newSamplesByRegion': dict(new_by_region),
                          'broadPhase': phase}, 'seconds': time.perf_counter()-frame_started}
            report['records'].append(record)
            print(pose['id'], progress, 'edgeMax', round(record['edgeStretch']['maximum'], 3), 'newIntersections', record['selfIntersection']['newFacePairsVsSource'],
                  'collapse', len(collapsed), 'seconds', round(record['seconds'], 2), flush=True)
    report['seconds'] = time.perf_counter()-started
    report['frames'] = len(report['records'])
    if not report['records']:
        raise ValueError('No matching skin frames were found')
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out).write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print('saved', args.out, report['frames'], 'frames', round(report['seconds'], 2), 'seconds', flush=True)


if __name__ == '__main__':
    main()
