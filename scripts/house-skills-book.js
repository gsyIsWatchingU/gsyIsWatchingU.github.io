import * as THREE from 'three';

// 图书馆中的履历阅读展示件；封面、书脊、页块使用独立曲面，保留实体厚度。
export function createSkillsBook(d) {
  const [width,height]=d.size;
  const group=new THREE.Group();group.name='content-skills-book';
  Object.assign(group.userData,{roomId:d.room,contentId:d.id});
  group.position.fromArray(d.position);
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(...d.normal).normalize());
  const rounded=(w,h,depth)=>{
    const s=new THREE.Shape(),x=-w/2,y=-h/2,r=.035;
    s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
    s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
    s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
    return new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:false,curveSegments:6});
  };
  const add=(geometry,color,z,x=0)=>{
    const mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,roughness:.94}));
    mesh.position.set(x,0,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;
  };
  add(rounded(width-.025,height-.025,.14),0xf2e6bf,-.07);
  const coverGeometry=rounded(width+.04,height+.04,.02);
  for(const z of [-.093,.073])add(coverGeometry,0xe5b842,z);
  add(rounded(.09,height+.04,.18),0x356e7b,-.09,-width/2+.025);
  const lines=[];
  for(let i=1;i<6;i++)lines.push(new THREE.Vector3(-width/2+.055,-height/2+.011,-.07+i*.023),new THREE.Vector3(width/2-.014,-height/2+.011,-.07+i*.023));
  group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lines),new THREE.LineBasicMaterial({color:0xc8b892})));

  const cover=document.createElement('canvas');cover.width=768;cover.height=1056;
  const ctx=cover.getContext('2d');ctx.fillStyle='#efc453';ctx.fillRect(0,0,768,1056);
  ctx.strokeStyle='#3b737e';ctx.lineWidth=9;ctx.strokeRect(47,47,674,962);
  ctx.fillStyle='#356572';ctx.textAlign='center';ctx.font='bold 138px sans-serif';
  ctx.fillText('专业',384,286);ctx.fillText('技能',384,453);
  ctx.lineWidth=6;ctx.beginPath();ctx.arc(384,625,73,0,Math.PI*2);ctx.stroke();
  ctx.font='bold 48px sans-serif';ctx.fillText('AI',384,643);
  ctx.font='33px sans-serif';ctx.fillText('全栈开发 · AI 提效',384,809);ctx.fillText('Agent 工程',384,873);
  const texture=new THREE.CanvasTexture(cover);texture.colorSpace=THREE.SRGBColorSpace;
  const face=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshStandardMaterial({map:texture,roughness:.96}));
  face.position.z=.094;face.receiveShadow=true;group.add(face);
  return group;
}
