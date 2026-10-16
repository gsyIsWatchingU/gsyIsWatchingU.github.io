"""只读审查 GPU 颈腕交叉：保留源交叉尺度，新增或加深都触发复看。"""
import argparse
import importlib.util
import json
from pathlib import Path

import numpy as np

spec = importlib.util.spec_from_file_location('cat_baseline', Path(__file__).with_name('cat_anatomy_v2_baseline.py'))
baseline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(baseline)
qc = baseline.qc


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True)
    parser.add_argument('--goals', required=True)
    parser.add_argument('--skin', required=True)
    parser.add_argument('--out', required=True)
    parser.add_argument('--poses', default='side,belly')
    args = parser.parse_args()
    source, goals, folder = Path(args.source), Path(args.goals), Path(args.skin)
    metadata = json.loads(goals.read_text(encoding='utf-8-sig'))
    points, faces, ids, weights, parts, names = qc.read_glb(source, [p['name'] for p in metadata['parts']])
    if len(points) != metadata['vertexCount']:
        raise ValueError('Source vertex count does not match goals')
    actual_sha = qc.sha(source)
    if metadata.get('sourceSHA256') != actual_sha:
        raise ValueError('Source SHA does not match goals; refusing a mixed-source gate')
    topo = qc.topology(points, faces, ids, weights, names, parts, 1e-6)
    source_pairs, _, _, _ = qc.intersections(points, faces, topo, .025)
    source_scale = {tuple(map(int, pair)): baseline.pair_scale(points, faces, pair) for pair in source_pairs}
    report = {'source': str(source), 'sourceSHA256': actual_sha, 'goalsSHA256': qc.sha(goals),
              'selectedPoses': args.poses.split(','), 'sourcePairCount': len(source_scale),
              'thresholds': {'macroChord': .002, 'macroDepthProxy': .001, 'sourceDepthOrChordEscalation': .0005,
                             'maximumSharedSeamGap': .001},
              'limits': ['A triangle-plane depth is not a closed-surface penetration volume.',
                         'New or enlarged source crossings above both size limits require actual continuous visual review.',
                         'Subthreshold geometric candidates are not visual approval; wrists, underchin and the other side remain reviewable.'],
              'records': []}
    selected = set(args.poses.split(','))
    manifests = [(path, json.loads(path.read_text(encoding='utf-8-sig'))) for path in folder.glob('*-manifest.json')]
    for pose in metadata['poses']:
        if pose['id'] not in selected:
            continue
        file = folder/(pose['id']+'-skin.f32')
        if not file.exists():
            continue
        raw = np.fromfile(file, dtype='<f4')
        count = len(pose['times'])*len(points)*6
        if raw.size != count:
            raise ValueError(f'Incomplete GPU file {file}: {raw.size} floats; expected {count}')
        data = raw.reshape(len(pose['times']), 2, len(points), 3).astype(np.float64)
        skin_sha = qc.sha(file)
        matching_manifest = []
        for path, manifest in manifests:
            for artifact in manifest.get('outputs', []):
                if artifact.get('file') != file.name:
                    continue
                if (manifest.get('sourceSHA256') != actual_sha or manifest.get('goalsSHA256') != qc.sha(goals) or
                        artifact.get('sha256') != skin_sha or artifact.get('bytes') != file.stat().st_size):
                    raise ValueError(f'Mismatching completed GPU manifest: {path}/{file.name}')
                matching_manifest.append(str(path))
        if not matching_manifest:
            raise ValueError(f'No completed source/goals/output SHA manifest for {file.name}')
        for frame, progress in enumerate(pose['times']):
            posed, normals = data[frame]
            if not np.isfinite(posed).all() or not np.isfinite(normals).all():
                raise ValueError(f'Non-finite GPU data: {pose["id"]}/{progress}')
            pairs, _, coplanar, broad = qc.intersections(posed, faces, topo, .025)
            macro, escalated, source_retained, small_new = [], [], 0, 0
            for pair, cop in zip(pairs, coplanar):
                key = tuple(map(int, pair))
                scale = baseline.pair_scale(posed, faces, pair)
                old = source_scale.get(key)
                is_macro = scale['intersectionChord'] >= .002 and scale['planeCrossDepthProxy'] >= .001
                record = {'faces': pair.tolist(), 'regions': topo['faceRegion'][pair].tolist(), 'coplanar': bool(cop),
                          **scale, 'sourceScale': old}
                if old is None:
                    if is_macro:
                        macro.append(record)
                    else:
                        small_new += 1
                else:
                    source_retained += 1
                    if is_macro and (scale['intersectionChord'] > old['intersectionChord']+.0005 or
                                     scale['planeCrossDepthProxy'] > old['planeCrossDepthProxy']+.0005):
                        escalated.append(record)
            seam = np.linalg.norm(posed[topo['seams'][:, 0]]-posed[topo['seams'][:, 1]], axis=1)
            maximum_gap = float(seam.max()) if len(seam) else 0.
            worst = sorted(macro+escalated, key=lambda r: r['planeCrossDepthProxy']*r['intersectionChord'], reverse=True)
            result = {'pose': pose['id'], 'progress': progress, 'skinSHA256': skin_sha,
                      'matchingGpuManifests': matching_manifest,
                      'strictCrossingPairs': len(pairs), 'newMacroPairs': len(macro), 'escalatedSourceMacroPairs': len(escalated),
                      'retainedSourcePairs': source_retained, 'newSmallPairs': small_new, 'maximumSeamGap': maximum_gap,
                      'gate': 'requires_close_visual_review' if worst or maximum_gap > .001 else 'no_macro_trigger_at_this_sample',
                      'macroCandidates': worst, 'intersectionScanComplete': broad['complete']}
            report['records'].append(result)
            print(pose['id'], progress, result['gate'], 'newMacro', len(macro), 'sourceEscalation', len(escalated), flush=True)
    if not report['records']:
        raise ValueError('No complete selected GPU output found')
    report['status'] = 'review' if any(r['gate'] != 'no_macro_trigger_at_this_sample' for r in report['records']) else 'sampled-geometric-gate-only'
    report['humanReview'] = 'pending'
    Path(args.out).write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')


if __name__ == '__main__':
    main()
