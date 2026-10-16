import * as THREE from 'three';
import {readFileSync,writeFileSync} from 'node:fs';
import {loadGeometry} from '../geometry-test-utils.mjs';
import {createCatRepairRig,catRestPoses} from '../cat-repair-v2-rig.js';

const root=process.argv[2]??'tmp/cat-repair-v2',surface=JSON.parse(readFileSync('docs/cat-eight-poses-review/pillow-surface.json')),records=[];
const band=p=>p.y>.22&&p.y+1.4*p.z>.78&&p.y+1.4*p.z<.99;
function distance(p,a,b){const axis=b.clone().sub(a),t=THREE.MathUtils.clamp(p.clone().sub(a).dot(axis)/axis.lengthSq(),0,1);return p.distanceTo(a.clone().addScaledVector(axis,t));}
for(const variant of ['neck-patch','neck-weighted']){
 const model=(await loadGeometry(root+'/'+variant+'/anatomy-neutral.glb')).scene,rig=createCatRepairRig(model,{pillowSurface:surface}),parts=['siamese_cat','siamese_cat_head'].map(n=>model.getObjectByName(n));
 const data=parts.map(mesh=>{const g=mesh.geometry,p=g.attributes.position,edges=new Map(),triangles=[],points=Array.from({length:p.count},()=>new THREE.Vector3());
  for(let i=0;i<g.index.count;i+=3){const ids=[0,1,2].map(k=>g.index.getX(i+k)),ps=ids.map(i=>new THREE.Vector3().fromBufferAttribute(p,i));if(!ps.some(band))continue;const normal=ps[1].clone().sub(ps[0]).cross(ps[2].clone().sub(ps[0]));if(normal.length()<2e-10)continue;normal.normalize();triangles.push({ids,normal});
   for(let k=0;k<3;k++){const a=ids[k],b=ids[(k+1)%3],key=Math.min(a,b)+'/'+Math.max(a,b),length=ps[k].distanceTo(ps[(k+1)%3]);if(length>.002&&!edges.has(key))edges.set(key,{a,b,length});}
  }
  const restNeck=rig.saved.get('DEF_neck').world,restHead=rig.saved.get('DEF_head').world,indices=[...new Set(triangles.flatMap(t=>t.ids))].filter(i=>{const q=new THREE.Vector3().fromBufferAttribute(p,i);return band(q)&&distance(q,restNeck,restHead)>.04;});
  return{mesh,g,p,points,edges:[...edges.values()],triangles,indices};
 });
 for(const pose of catRestPoses){let maximumStretch=0,maximumFoldedFaces=0,maximumCollapsedPoints=0,minimumNeckRadius=Infinity,worst=null;
  for(let frame=0;frame<=40;frame++){
   const t=frame/40;rig.pose(pose.id,t);model.updateMatrixWorld(true);const a=rig.bones.get('DEF_neck').getWorldPosition(new THREE.Vector3()),b=rig.bones.get('DEF_head').getWorldPosition(new THREE.Vector3());let folded=0,collapsed=0;
   for(const d of data){d.mesh.skeleton.update();for(let i=0;i<d.points.length;i++)d.mesh.getVertexPosition(i,d.points[i]);
    for(const e of d.edges){const ratio=d.points[e.a].distanceTo(d.points[e.b])/e.length;if(ratio>maximumStretch){maximumStretch=ratio;worst={pose:pose.id,t,part:d.mesh.name,vertices:[e.a,e.b],restLength:e.length,posedLength:ratio*e.length};}}
    for(const tri of d.triangles){const field=new Map();for(const i of tri.ids)for(let k=0;k<4;k++){const id=d.g.attributes.skinIndex.array[i*4+k],w=d.g.attributes.skinWeight.array[i*4+k]/3;field.set(id,(field.get(id)??0)+w);}const linear=new THREE.Matrix3().set(0,0,0,0,0,0,0,0,0);for(const[id,w]of field){const matrix=new THREE.Matrix4().multiplyMatrices(d.mesh.skeleton.bones[id].matrixWorld,d.mesh.skeleton.boneInverses[id]),part=new THREE.Matrix3().setFromMatrix4(matrix);for(let k=0;k<9;k++)linear.elements[k]+=part.elements[k]*w;}
     const determinant=linear.determinant();if(Math.abs(determinant)<.001)continue;const expected=tri.normal.clone().applyMatrix3(linear.clone().invert().transpose()).multiplyScalar(Math.sign(determinant)).normalize(),[x,y,z]=tri.ids.map(i=>d.points[i]),normal=y.clone().sub(x).cross(z.clone().sub(x));if(normal.dot(expected)<-1e-10)folded++;
    }
    for(const i of d.indices){const radius=distance(d.points[i],a,b);minimumNeckRadius=Math.min(minimumNeckRadius,radius);if(radius<.025)collapsed++;}
   }
   maximumFoldedFaces=Math.max(maximumFoldedFaces,folded);maximumCollapsedPoints=Math.max(maximumCollapsedPoints,collapsed);
  }
  records.push({variant,pose:pose.id,frames:41,maximumStretch,maximumFoldedFaces,maximumCollapsedPoints,minimumNeckRadius,worst});
 }
}
const report={scope:'Raw neck band only, same new pose modules. Folding compares the posed triangle orientation with its constant averaged skin transform; neck-radius counts are a diagnostic proxy, not an anatomical acceptance threshold.',records};
writeFileSync(root+'/neck-weighted/neck-raw-probe.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(records,null,2));
