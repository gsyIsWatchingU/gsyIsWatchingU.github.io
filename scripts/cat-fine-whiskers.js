import * as THREE from 'three';
// 胡须由头部表面推算的细线制作，避免在源网格上形成粗硬枝条。
export function addFineCatWhiskers(model,face){
 const head=model.getObjectByName('DEF_head'),group=new THREE.Group();group.name='cat_fine_whiskers';group.userData.petFur=true;
 model.updateMatrixWorld(true);const center=new THREE.Vector3();face.eyes.forEach(e=>center.add(new THREE.Vector3(...e.center)));center.multiplyScalar(.5).add(new THREE.Vector3(0,-.041,0));
 const front=new THREE.Vector3(...face.frontNormal).normalize(),side=new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),front).normalize();center.addScaledVector(front,.022);
 const vertices=[],colors=[],colorA=new THREE.Color('#96826d'),colorB=new THREE.Color('#dbd2c0');
 for(const sign of [-1,1])for(let row=0;row<6;row++){
  const start=center.clone().addScaledVector(side,sign*.049).add(new THREE.Vector3(0,(row-2.5)*.0025,0)),end=start.clone().addScaledVector(side,sign*(.060+row*.002)).addScaledVector(front,.022).add(new THREE.Vector3(0,(row-2.5)*.009,0));
  const curve=new THREE.QuadraticBezierCurve3(start,start.clone().lerp(end,.5).addScaledVector(front,.014),end),points=curve.getPoints(20);
  for(let i=0;i<20;i++)for(const k of [i,i+1]){const point=head.worldToLocal(points[k].clone()),color=colorA.clone().lerp(colorB,k/20);vertices.push(point.x,point.y,point.z);colors.push(color.r,color.g,color.b);}
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 const lines=new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.70,depthWrite:false}));lines.raycast=()=>{};group.add(lines);head.add(group);return{setVisible:value=>group.visible=value,count:12};
}
