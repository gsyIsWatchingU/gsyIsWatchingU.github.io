import fs from 'node:fs';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {splitArchGeometry} from './neighborhood-exterior.js';

// 实际菠萝网格裁切：三角面积守恒、UV 连续、门扇与壳体各自非空。
const buffer=fs.readFileSync('assets/models/pineapple-shell.glb');
const jsonLength=buffer.readUInt32LE(12),gltf=JSON.parse(buffer.subarray(20,20+jsonLength)),binary=buffer.subarray(28+jsonLength);
function accessor(index){
  const a=gltf.accessors[index],v=gltf.bufferViews[a.bufferView],size={SCALAR:1,VEC2:2,VEC3:3}[a.type],Type={5123:Uint16Array,5125:Uint32Array,5126:Float32Array}[a.componentType];
  const bytes=binary.subarray((v.byteOffset||0)+(a.byteOffset||0),(v.byteOffset||0)+(a.byteOffset||0)+a.count*size*Type.BYTES_PER_ELEMENT);
  return new THREE.BufferAttribute(new Type(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)),size);
}
const primitive=gltf.meshes[0].primitives[0],geometry=new THREE.BufferGeometry();
for(const [name,key] of [['position','POSITION'],['normal','NORMAL'],['uv','TEXCOORD_0']])geometry.setAttribute(name,accessor(primitive.attributes[key]));
geometry.setIndex(accessor(primitive.indices));
const outline=[[-.14,.008],[.14,.008],[.14,.39]];
for(let i=1;i<=24;i++){const a=i/24*Math.PI;outline.push([.14*Math.cos(a),.39+.14*Math.sin(a)]);}
const {inside,outside}=splitArchGeometry(geometry,outline,.46);
function area(g){const p=g.index?g.toNonIndexed().attributes.position:g.attributes.position,a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();let sum=0;for(let i=0;i<p.count;i+=3){a.fromBufferAttribute(p,i);b.fromBufferAttribute(p,i+1);c.fromBufferAttribute(p,i+2);sum+=b.sub(a).cross(c.sub(a)).length()/2;}return sum;}
assert(inside.attributes.position.count>100);assert(outside.attributes.position.count>100);
for(const g of [inside,outside])for(const a of Object.values(g.attributes))assert([...a.array].every(Number.isFinite));
const originalArea=area(geometry),splitArea=area(inside)+area(outside),relativeError=Math.abs(originalArea-splitArea)/originalArea;
assert(relativeError<1e-6);
assert(Math.abs(inside.boundingBox.min.x+.14)<1e-5&&Math.abs(inside.boundingBox.max.x-.14)<1e-5);
assert(inside.boundingBox.min.z>=.46-1e-6);
console.log(JSON.stringify({sourceTriangles:geometry.index.count/3,doorTriangles:inside.attributes.position.count/3,shellTriangles:outside.attributes.position.count/3,relativeAreaError:relativeError,finiteAttributes:true},null,2));
