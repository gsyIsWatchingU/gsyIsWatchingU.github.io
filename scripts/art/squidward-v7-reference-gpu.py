import hashlib
import json
import pathlib
import sys
import time
import torch
from diffusers import ZImagePipeline

root = pathlib.Path(sys.argv[1])
config = json.loads((root / 'references.json').read_text(encoding='utf-8'))
model = '/workspace/models/imagegen/huggingface/hub/models--Tongyi-MAI--Z-Image-Turbo/snapshots/f332072aa78be7aecdf3ee76d5c247082da564a6'
pipe = ZImagePipeline.from_pretrained(model, torch_dtype=torch.bfloat16, local_files_only=True).to('cuda')
records = []
for item in config['items']:
    output = root / 'refs' / (item['id'] + '.png')
    prompt = item['prompt'] + ('' if item.get('kind') == 'texture' else config['style'])
    if not output.exists():
        image = pipe(prompt=prompt, height=1024, width=1024, num_inference_steps=9,
                     guidance_scale=0.0, generator=torch.Generator('cuda').manual_seed(item['seed'])).images[0]
        image.save(output)
    record = {**item, 'prompt':prompt, 'backend':'Z-Image-Turbo', 'revision':'f332072aa78be7aecdf3ee76d5c247082da564a6',
              'host':'gsy013', 'reference':str(output), 'referenceSHA256':hashlib.sha256(output.read_bytes()).hexdigest(),
              'primaryReferenceSHA256':config['sourceSHA256'], 'status':'review'}
    records.append(record)
    (root / 'reference-manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'id':item['id'], 'sha256':record['referenceSHA256'], 'time':time.time()}), flush=True)
