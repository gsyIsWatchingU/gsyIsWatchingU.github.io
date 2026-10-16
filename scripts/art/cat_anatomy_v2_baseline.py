"""最终猫咪源的只读自交尺度基线；复用独立曲面 QC，不修改源或求解器。"""
import importlib.util
import json
from pathlib import Path
import sys

import numpy as np

spec = importlib.util.spec_from_file_location('cat_surface_qc', Path(__file__).with_name('cat_repair_v2_surface_qc.py'))
qc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qc)


def pair_scale(points, faces, pair):
    triangles = points[faces[np.asarray(pair)]]
    intersections = []
    for a, b in [(triangles[0], triangles[1]), (triangles[1], triangles[0])]:
        for k in range(3):
            hit, at = qc.segment_triangle(a[k][None], a[(k+1) % 3][None], b[None])
            if hit[0]:
                intersections.append(at[0])
    if intersections:
        samples = np.unique(np.round(intersections, 10), axis=0)
        chord = np.linalg.norm(samples[:, None]-samples[None, :], axis=2).max()
        center = samples.mean(axis=0)
    else:
        samples = np.empty((0, 3))
        chord = 0.
        center = triangles.mean(axis=(0, 1))
    normal = qc.unit(np.cross(triangles[:, 1]-triangles[:, 0], triangles[:, 2]-triangles[:, 0]))
    depth = []
    for a, b, n in [(triangles[0], triangles[1], normal[1]), (triangles[1], triangles[0], normal[0])]:
        d = (a-b[0]) @ n
        depth.append(max(0., min(d.max(), -d.min())))
    angle = np.degrees(np.arccos(np.clip(abs(normal[0] @ normal[1]), 0, 1)))
    return {'intersectionChord': float(chord), 'planeCrossDepthProxy': float(max(depth)),
            'acuteNormalAngleDegrees': float(angle), 'center': center.tolist(),
            'linePoints': samples.tolist()}


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else 'tmp/cat-repair-v2')
    source = root/'neck-weighted/anatomy-neutral.glb'
    points, faces, ids, weights, parts, names = qc.read_glb(source, ['siamese_cat', 'siamese_cat_head'])
    topo = qc.topology(points, faces, ids, weights, names, parts, 1e-6)
    pairs, witnesses, coplanar, broad = qc.intersections(points, faces, topo, .025)
    part_by_face = np.empty(len(faces), dtype=object)
    for p in parts:
        part_by_face[p['faceOffset']:p['faceOffset']+p['faces']] = p['name']
    records = []
    for pair, at, cop in zip(pairs, witnesses, coplanar):
        record = {'faces': pair.tolist(), 'parts': part_by_face[pair].tolist(),
                  'regions': topo['faceRegion'][pair].tolist(),
                  'sourceVertexIndices': faces[pair].tolist(), 'coplanar': bool(cop),
                  **pair_scale(points, faces, pair)}
        record['macroCrossingCandidate'] = (record['intersectionChord'] >= .002 and record['planeCrossDepthProxy'] >= .001)
        records.append(record)
    # 仅用于定位同一片原始缺陷；不把这一空间邻域用作免检白名单。
    parent = list(range(len(records)))
    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i
    for a in range(len(records)):
        for b in range(a+1, len(records)):
            shared_face = bool(set(records[a]['faces']) & set(records[b]['faces']))
            close = np.linalg.norm(np.array(records[a]['center'])-records[b]['center']) < .01
            if shared_face or close:
                parent[find(b)] = find(a)
    clusters = []
    for key in sorted(set(find(i) for i in range(len(records)))):
        selected = [i for i in range(len(records)) if find(i) == key]
        centers = np.array([records[i]['center'] for i in selected])
        clusters.append({'pairs': len(selected), 'pairIds': selected,
                         'centerBoundsMin': centers.min(axis=0).tolist(), 'centerBoundsMax': centers.max(axis=0).tolist(),
                         'maximumChord': max(records[i]['intersectionChord'] for i in selected),
                         'maximumDepthProxy': max(records[i]['planeCrossDepthProxy'] for i in selected),
                         'regions': sorted(set(r for i in selected for r in records[i]['regions'])),
                         'macroCrossingCandidates': sum(records[i]['macroCrossingCandidate'] for i in selected)})
    report = {'source': str(source), 'sourceSHA256': qc.sha(source), 'vertices': len(points), 'faces': len(faces),
              'dimensions': np.ptp(points, axis=0).tolist(), 'baselineTopology': topo['baselineTopology'],
              'strictIntersectionPairs': len(records), 'coplanarPairs': int(coplanar.sum()),
              'macroCrossingCandidates': sum(r['macroCrossingCandidate'] for r in records),
              'maximumChord': max([r['intersectionChord'] for r in records], default=0),
              'maximumDepthProxy': max([r['planeCrossDepthProxy'] for r in records], default=0),
              'pairRecords': records, 'clusters': clusters, 'broadPhase': broad,
              'limits': ['Model units are not physical millimetres.',
                         'Plane-cross depth is a local triangle-plane proxy, not a penetration volume or signed closed-surface distance.',
                         'A source pair is only a baseline identity, not permission for it to deepen in animation.',
                         'Cluster distance .01 groups diagnosis locations only; nearby new face pairs remain reviewable.'],
              'proposedGate': {'allSourceAndOutputHashesMatch': True, 'newOrEscalatedMacroCrossingChord': .002,
                               'newOrEscalatedMacroCrossingDepthProxy': .001,
                               'meaning': 'Flag every new pair or source pair that crosses both dimensions; inspect continuous close views before acceptance.'}}
    out = root/'binding-source-baseline.json'
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({k: v for k, v in report.items() if k not in ('pairRecords', 'limits')}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
