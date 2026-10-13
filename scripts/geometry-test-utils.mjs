import { readFileSync } from 'node:fs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export async function loadGeometry(path){
  const bytes=readFileSync(path),length=bytes.readUInt32LE(12),gltf=JSON.parse(bytes.subarray(20,20+length));
  for(const m of gltf.materials??[]){for(const k of Object.keys(m))if(k.endsWith('Texture'))delete m[k];for(const k of Object.keys(m.pbrMetallicRoughness??{}))if(k.endsWith('Texture'))delete m.pbrMetallicRoughness[k];delete m.extensions;}
  delete gltf.textures;delete gltf.images;
  const json=Buffer.from(JSON.stringify(gltf)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);
  const binary=bytes.subarray(20+length),data=Buffer.alloc(20+padded.length+binary.length);data.writeUInt32LE(0x46546c67);data.writeUInt32LE(2,4);data.writeUInt32LE(data.length,8);data.writeUInt32LE(padded.length,12);data.writeUInt32LE(0x4e4f534a,16);padded.copy(data,20);binary.copy(data,20+padded.length);
  return new GLTFLoader().parseAsync(data.buffer.slice(data.byteOffset,data.byteOffset+data.byteLength),'');
}
