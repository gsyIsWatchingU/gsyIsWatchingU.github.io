import {MeshoptEncoder} from 'meshoptimizer/encoder';
import {MeshoptDecoder} from 'three/examples/jsm/libs/meshopt_decoder.module.js';

// 默认逐字节无损；可显式启用仅补形的有界量化，均使用网页实际解码器回读。
export async function compressCatGlb(bytes,{morphQuantization=null}={}){
 await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
 const length=bytes.readUInt32LE(12),g=JSON.parse(bytes.subarray(20,20+length)),bin=bytes.subarray(28+length),chunks=[];
 const sizes={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16},components={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4},accessors=new Map();
 for(const a of g.accessors)if(a.bufferView!==undefined&&!accessors.has(a.bufferView))accessors.set(a.bufferView,a);
 const morphViews=new Map();
 if(morphQuantization)for(const mesh of g.meshes??[])for(const primitive of mesh.primitives)for(const target of primitive.targets??[])for(const semantic of ['POSITION','NORMAL'])if(target[semantic]!==undefined)morphViews.set(g.accessors[target[semantic]].bufferView,semantic);
 let offset=0,fallback=0,compressedViews=0,verifiedBytes=0,quantizedViews=0,maximumPositionQuantizationError=0,maximumNormalQuantizationError=0;
 function append(data){const padding=(-offset)&3;if(padding){chunks.push(Buffer.alloc(padding));offset+=padding;}const start=offset;chunks.push(data);offset+=data.byteLength;return start;}
 g.bufferViews.forEach((view,index)=>{
  const source=bin.subarray(view.byteOffset??0,(view.byteOffset??0)+view.byteLength),a=accessors.get(index);
  const mode=a?.type==='SCALAR'&&a.componentType!==5126?'INDICES':'ATTRIBUTES',stride=view.byteStride??(a?sizes[a.type]*components[a.componentType]:0),count=stride?source.byteLength/stride:0;
  const eligible=Number.isInteger(count)&&count>0&&(mode==='INDICES'?[2,4].includes(stride):stride>0&&stride<=256&&stride%4===0);
  if(eligible){
   const semantic=morphViews.get(index),quantize=semantic&&a?.componentType===5126&&a.type==='VEC3'&&stride===12;
   const bits=semantic==='POSITION'?(morphQuantization?.positionBits??18):(morphQuantization?.normalBits??14);
   if(quantize&&(!Number.isInteger(bits)||bits<12||bits>24))throw Error('补形量化精度必须为12至24位');
   const floats=quantize?new Float32Array(source.buffer.slice(source.byteOffset,source.byteOffset+source.byteLength)):null;
   const filtered=quantize?MeshoptEncoder.encodeFilterExp(floats,count,stride,bits,'SharedVector'):source,filter=quantize?'EXPONENTIAL':'NONE';
   const encoded=MeshoptEncoder.encodeGltfBuffer(filtered,count,stride,mode,0),decoded=new Uint8Array(source.byteLength);MeshoptDecoder.decodeGltfBuffer(decoded,count,stride,encoded,mode,filter);
   let error=0,decodedFloats;
   if(quantize){decodedFloats=new Float32Array(decoded.buffer);for(let i=0;i<floats.length;i+=3)error=Math.max(error,Math.hypot(decodedFloats[i]-floats[i],decodedFloats[i+1]-floats[i+1],decodedFloats[i+2]-floats[i+2]));const limit=semantic==='POSITION'?(morphQuantization.maxPositionError??.00002):(morphQuantization.maxNormalError??.0005);if(!Number.isFinite(error)||error>limit)throw Error('补形量化误差超过门禁：'+semantic+' '+error);}
   else if(!Buffer.from(decoded).equals(source))throw Error('Meshopt 回读改变了模型数据：'+index);verifiedBytes+=source.byteLength;
   if(encoded.byteLength<source.byteLength){
    if(quantize){quantizedViews++;if(semantic==='POSITION')maximumPositionQuantizationError=Math.max(maximumPositionQuantizationError,error);else maximumNormalQuantizationError=Math.max(maximumNormalQuantizationError,error);if(a.min||a.max){a.min=[Infinity,Infinity,Infinity];a.max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<decodedFloats.length;i++){const k=i%3;a.min[k]=Math.min(a.min[k],decodedFloats[i]);a.max[k]=Math.max(a.max[k],decodedFloats[i]);}}}
    fallback=(fallback+3)&~3;view.buffer=1;view.byteOffset=fallback;fallback+=source.byteLength;view.extensions={...view.extensions,EXT_meshopt_compression:{buffer:0,byteOffset:append(Buffer.from(encoded)),byteLength:encoded.byteLength,byteStride:stride,count,mode,filter}};compressedViews++;return;
   }
  }
  view.buffer=0;view.byteOffset=append(source);
 });
 const padding=(-offset)&3;if(padding){chunks.push(Buffer.alloc(padding));offset+=padding;}
 g.buffers=[{byteLength:offset},{byteLength:fallback,extensions:{EXT_meshopt_compression:{fallback:true}}}];g.extensionsUsed=[...new Set([...(g.extensionsUsed??[]),'EXT_meshopt_compression'])];g.extensionsRequired=[...new Set([...(g.extensionsRequired??[]),'EXT_meshopt_compression'])];
 const json=Buffer.from(JSON.stringify(g)),padded=Buffer.alloc(Math.ceil(json.length/4)*4,32);json.copy(padded);const output=Buffer.alloc(28+padded.length+offset);output.writeUInt32LE(0x46546c67);output.writeUInt32LE(2,4);output.writeUInt32LE(output.byteLength,8);output.writeUInt32LE(padded.length,12);output.writeUInt32LE(0x4e4f534a,16);padded.copy(output,20);output.writeUInt32LE(offset,20+padded.length);output.writeUInt32LE(0x004e4942,24+padded.length);let cursor=28+padded.length;for(const chunk of chunks){chunk.copy(output,cursor);cursor+=chunk.byteLength;}
 return{bytes:output,report:{method:quantizedViews?'EXT_meshopt_compression / v0 / bounded EXPONENTIAL morphs; other attributes lossless':'EXT_meshopt_compression / v0 / lossless / NONE filter',originalBytes:bytes.byteLength,compressedBytes:output.byteLength,compressedViews,verifiedBytes,byteExactRoundTrip:quantizedViews===0,...(quantizedViews?{morphQuantization:{...morphQuantization,quantizedViews,maximumPositionQuantizationError,maximumNormalQuantizationError,baseGeometryUvSkinTexturesLossless:true}}:{})}};
}
