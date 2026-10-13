import * as THREE from 'three';

export function createCompanionBook({title='实习日记'}={}) {
  const group=new THREE.Group();group.name='companion-open-book';
  const texture=(paper)=>{
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=640;
    const ctx=canvas.getContext?.('2d');if(!ctx)return null;
    ctx.fillStyle=paper?'#fff5dc':'#285861';ctx.fillRect(0,0,512,640);
    if(paper){
      ctx.fillStyle='#6c5844';ctx.textAlign='center';ctx.font='bold 35px serif';ctx.fillText(title,256,85);
      ctx.strokeStyle='#bcad8e';ctx.lineWidth=3;for(let y=150;y<550;y+=36){ctx.beginPath();ctx.moveTo(60,y);ctx.lineTo(450-(y%3)*12,y);ctx.stroke();}
      ctx.fillStyle='#ad976f';ctx.font='23px serif';ctx.fillText('✦',256,598);
    }else{
      ctx.strokeStyle='#d5b86b';ctx.lineWidth=12;ctx.strokeRect(28,28,456,584);
      ctx.fillStyle='#f5d994';ctx.font='bold 46px serif';ctx.textAlign='center';ctx.fillText(title,256,260);
      ctx.font='80px serif';ctx.fillText('⚓',256,390);
    }
    const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;return map;
  };
  const cover=new THREE.MeshStandardMaterial({color:0x346972,map:texture(false),roughness:.92});
  const pages=new THREE.MeshStandardMaterial({color:0xf9edcc,roughness:1});
  const ink=new THREE.MeshStandardMaterial({color:0xffffff,map:texture(true),roughness:1,side:THREE.DoubleSide});
  const wings=[];
  for(const side of [-1,1]){
    const wing=new THREE.Group();wing.rotation.y=-side*.32;group.add(wing);wings.push(wing);
    const binding=new THREE.Mesh(new THREE.BoxGeometry(.307,.335,.016),cover);binding.position.set(side*.155,0,-.011);wing.add(binding);
    const block=new THREE.Mesh(new THREE.BoxGeometry(.285,.312,.025),pages);block.position.set(side*.154,0,.010);wing.add(block);
    const page=new THREE.Mesh(new THREE.PlaneGeometry(.281,.307),ink);page.position.set(side*.154,0,.024);wing.add(page);
    for(let row=0;row<5;row++){
      const edge=new THREE.Mesh(new THREE.BoxGeometry(.285,.0014,.001),new THREE.MeshStandardMaterial({color:0xcab995,roughness:1}));edge.position.set(side*.154,-.154,.002+row*.004);wing.add(edge);
    }
  }
  const spine=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.333,12),cover);group.add(spine);
  const turner=new THREE.Group();turner.position.z=.035;group.add(turner);
  const geometry=new THREE.PlaneGeometry(.281,.307,14,1),p=geometry.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i)+.1405;p.setXYZ(i,x,p.getY(i),.018*Math.sin(x/.281*Math.PI));}
  geometry.computeVertexNormals();turner.add(new THREE.Mesh(geometry,ink));
  group.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;}});
  let opening=0;
  return {group,
    grip:side=>new THREE.Vector3(side*.30,-.11,.03),
    update(time,reducedMotion,amount=1){opening=THREE.MathUtils.clamp(amount,0,1);
      wings[0].rotation.y=THREE.MathUtils.lerp(-Math.PI,.32,opening);wings[0].position.z=.04*(1-opening);
      wings[1].rotation.y=-.32*opening;
      const phase=time%4.8;turner.visible=opening>.98&&!reducedMotion&&phase>2.4&&phase<4.2;const t=THREE.MathUtils.clamp((phase-2.4)/1.8,0,1),fold=t*t*(3-2*t);turner.rotation.y=-Math.PI*fold;
      // 翻页时纸面收拢，避免整张刚性纸页竖起后再次碰到嘴部。
      turner.scale.x=1-.72*Math.sin(Math.PI*fold);
    },
    snapshot:()=>({open:opening>.98,opening,visible:group.visible,turning:turner.visible,coverThickness:.016,pageThickness:.025,spread:.64})
  };
}
