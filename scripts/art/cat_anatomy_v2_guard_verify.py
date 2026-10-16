"""只读核验最终 f32 曲面的逐边上界、回退帧与保护域。"""
import argparse
import json
from pathlib import Path
import numpy as np
import cat_anatomy_v2_fairing as helper
import cat_repair_v2_surface_qc as qc

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--input', required=True)
parser.add_argument('--raw', required=True)
parser.add_argument('--final', required=True)
parser.add_argument('--out', required=True)
args = parser.parse_args()
inp, raw_root, final_root = map(Path, [args.input, args.raw, args.final])
meta = json.loads((inp/'goals.json').read_text(encoding='utf-8-sig'))
points, faces, ids, weights, parts, names = qc.read_glb(inp/'anatomy-neutral.glb', [p['name'] for p in meta['parts']])
rest, first, inverse = np.unique(np.round(points, 6), axis=0, return_index=True, return_inverse=True)
rest = points[first]
prepared = helper.prepare_neck_fairing(rest, inverse[faces], ids[first], weights[first], names)
a, b, lengths = [prepared[k] for k in ('guardA', 'guardB', 'guardRestLengths')]
manifests = [(p, json.loads(p.read_text())) for p in final_root.glob('*-manifest.json')]
records = []
for pose in meta['poses']:
    name = pose['id']+'-skin.f32'
    shape = (len(pose['times']), 2, len(points), 3)
    raw = np.fromfile(raw_root/name, dtype='<f4').reshape(shape)
    final = np.fromfile(final_root/name, dtype='<f4').reshape(shape)
    matched = [(path, manifest, artifact) for path, manifest in manifests for artifact in manifest.get('outputs', []) if artifact['file'] == name]
    if len(matched) != 1:
        raise ValueError('Unresolved final manifest: '+name)
    path, manifest, artifact = matched[0]
    if artifact['sha256'] != qc.sha(final_root/name) or manifest['sourceSHA256'] != meta['sourceSHA256']:
        raise ValueError('Final artifact/source SHA mismatch')
    if manifest['postprocessSHA256'] != qc.sha(Path(helper.__file__)):
        raise ValueError('Final helper SHA mismatch')
    before, after = raw[:, 0, first].astype(float), final[:, 0, first].astype(float)
    raw_lengths = np.linalg.norm(before[:, b]-before[:, a], axis=-1)
    final_lengths = np.linalg.norm(after[:, b]-after[:, a], axis=-1)
    limits = np.maximum(raw_lengths, 1.95*lengths)+1e-7
    entries = [r for r in manifest['records'] if r['pose'] == pose['id']]
    rejected = [i for i, r in enumerate(entries) if r.get('rejectedReason')]
    protected = prepared['protected'][inverse]
    outside = prepared['amount'][inverse] == 0
    reports = {'pose': pose['id'], 'frames': len(pose['times']), 'finalSHA256': artifact['sha256'],
               'manifestSHA256': qc.sha(path), 'postprocessDevice': manifest['postprocess'],
               't0FullByteEqual': bool(np.array_equal(raw[0], final[0])),
               'protectedFaceEarPositionMaximumDisplacement': float(np.linalg.norm((final[:, 0]-raw[:, 0])[:, protected], axis=-1).max()),
               'outsidePositionMaximumDisplacement': float(np.linalg.norm((final[:, 0]-raw[:, 0])[:, outside], axis=-1).max()),
               'outsideNormalByteEqual': bool(np.array_equal(final[:, 1, outside], raw[:, 1, outside])),
               'sharedPointMaximumGap': float(np.linalg.norm(final[:, 0]-final[:, 0, first][:, inverse], axis=-1).max()),
               'maximumWrittenEdgeBoundExcess': float((final_lengths-limits).max()),
               'writtenEdgeViolations': int(np.sum(final_lengths > limits)),
               'rawMaximumMeaningfulEdgeRatio': float(np.max(raw_lengths/lengths)),
               'finalMaximumMeaningfulEdgeRatio': float(np.max(final_lengths/lengths)),
               'terminalRawMaximumMeaningfulEdgeRatio': float(np.max(raw_lengths[-1]/lengths)),
               'terminalFinalMaximumMeaningfulEdgeRatio': float(np.max(final_lengths[-1]/lengths)),
               'alphaMinimum': min(r['edgeGuard']['alpha'] for r in entries),
               'alphaTerminal': entries[-1]['edgeGuard']['alpha'], 'rejectedFrames': rejected,
               'rejectedFramesFullByteEqual': all(np.array_equal(raw[i], final[i]) for i in rejected)}
    records.append(reports)
report = {'sourceSHA256': meta['sourceSHA256'], 'goalsSHA256': qc.sha(inp/'goals.json'),
          'postprocessSHA256': qc.sha(Path(helper.__file__)), 'scope': 'Actual final GPU f32 output. Edge bounds and protected domains; no claim of zero intersections or full visual approval.', 'records': records}
Path(args.out).write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps([{k: v for k, v in r.items() if k not in ('postprocessDevice', 'finalSHA256', 'manifestSHA256')} for r in records], indent=2))
