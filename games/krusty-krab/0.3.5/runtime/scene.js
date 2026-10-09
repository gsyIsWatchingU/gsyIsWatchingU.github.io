(function(){
"use strict";
const THREE=window.THREE;
const { employeePhoto, DRAWER_CONTENTS }=window.KrustyArt;

// 固定种子的手绘旧材质：木纹、漆面污渍和划痕，避免每次载入随机变样。
function agedSurface(color,wood=false){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
  const ctx=canvas.getContext('2d');let seed=1739;
  const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  ctx.fillStyle=color;ctx.fillRect(0,0,256,256);
  for(let i=0;i<1400;i++){ctx.fillStyle=random()>.5?'rgba(230,211,168,.045)':'rgba(32,25,20,.07)';ctx.fillRect(random()*256,random()*256,1+random()*4,1+random()*2);}
  if(wood){
    for(let x=0;x<256;x+=64){ctx.fillStyle='#201e1760';ctx.fillRect(x,0,2,256);ctx.fillStyle='#d4bd8e24';ctx.fillRect(x+2,0,1,256);}
    for(let i=0;i<95;i++){const x=random()*256;ctx.strokeStyle='#30281d28';ctx.lineWidth=.5+random();ctx.beginPath();ctx.moveTo(x,0);ctx.bezierCurveTo(x+random()*7,70,x-random()*6,190,x,256);ctx.stroke();}
    for(let i=0;i<5;i++){ctx.strokeStyle='#2e251b45';const x=random()*256,y=random()*256;for(let j=1;j<4;j++){ctx.beginPath();ctx.ellipse(x,y,j*2,j*7,.08,0,Math.PI*2);ctx.stroke();}}
  }else{
    for(let i=0;i<16;i++){const x=random()*256,y=random()*256,r=12+random()*26,g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'#3d251b30');g.addColorStop(1,'#3d251b00');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
    ctx.strokeStyle='#d2bf9628';for(let i=0;i<28;i++){const x=random()*256,y=random()*256;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+2+random()*16,y-1);ctx.stroke();}
  }
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.magFilter=THREE.LinearFilter;return texture;
}

function buildRestaurant(data, geometryData) {
  const imageTextures=data.images.map(path=>{
    const texture=new THREE.TextureLoader().load(path);
    texture.colorSpace=THREE.SRGBColorSpace;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;
    texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
    return texture;
  });
  const materials=data.materials.map(m=>{
    const p=m.pbrMetallicRoughness||{},c=p.baseColorFactor||[1,1,1,1];
    const mat=new THREE.MeshLambertMaterial({name:m.name,color:new THREE.Color(c[0],c[1],c[2]),side:m.doubleSided?THREE.DoubleSide:THREE.FrontSide});
    if(p.baseColorTexture)mat.map=imageTextures[data.textures[p.baseColorTexture.index].source];
    if(c[3]<1){mat.transparent=true;mat.opacity=.19;mat.depthWrite=false;mat.side=THREE.DoubleSide;}
    return mat;
  });
  const wood=agedSurface('#7b775b',true),paint=agedSurface('#6a8078'),cream=agedSurface('#b3a47f'),iron=agedSurface('#52645e');
  [2,4,5,6].forEach(i=>{materials[i].map=wood;materials[i].color.set(i===5?0xb3a17c:0xb1b49a);});
  [8,10,13,15,16,20].forEach(i=>{materials[i].map=paint;materials[i].color.set(i===20?0x85978b:0xb0bcb0);});
  [11,18].forEach(i=>{materials[i].map=cream;materials[i].color.set(0xd4c6a5);});
  [14,19,21].forEach(i=>{materials[i].map=iron;materials[i].color.set(i===21?0x5c6359:0xa7b2a6);});
  materials[12].color.set(0x663d31);materials[7].color.set(0x8e8469);
  const geometries=geometryData.map(primitives=>primitives.map(p=>{
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(p.position,3));
    if(p.normal)g.setAttribute('normal',new THREE.Float32BufferAttribute(p.normal,3));else g.computeVertexNormals();
    if(p.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(p.uv,2));
    if(p.index)g.setIndex(p.index);
    g.computeBoundingSphere();return g;
  }));
  const nodes=data.nodes.map(n=>{
    const group=new THREE.Group();group.name=n.name||'';group.userData=n.extras||{};
    if(n.matrix){group.matrix.fromArray(n.matrix);group.matrix.decompose(group.position,group.quaternion,group.scale);}
    if(n.translation)group.position.fromArray(n.translation);if(n.rotation)group.quaternion.fromArray(n.rotation);if(n.scale)group.scale.fromArray(n.scale);
    if(n.mesh!==undefined)geometryData[n.mesh].forEach((p,i)=>{const mesh=new THREE.Mesh(geometries[n.mesh][i],materials[p.material]);mesh.name=group.name;mesh.userData=group.userData;group.add(mesh);});
    return group;
  });
  data.nodes.forEach((n,i)=>(n.children||[]).forEach(j=>nodes[i].add(nodes[j])));
  const inner=new THREE.Group();inner.rotation.y=Math.PI;
  data.scenes[data.scene||0].nodes.forEach(i=>inner.add(nodes[i]));inner.updateMatrixWorld(true);
  const collisions=[],groups=new Map(),remove=[],kitchenCleanup={bottleTriangles:0,panTriangles:0};
  const matrix=new THREE.Matrix3(),point=new THREE.Vector3(),normal=new THREE.Vector3();
  inner.traverse(obj=>{
    if(!obj.isMesh)return;
    if(obj.userData.collision)collisions.push(new THREE.Box3().setFromObject(obj));
    let parent=obj,dynamic=false;
    while(parent){if(/^DoorHinge/.test(parent.name))dynamic=true;parent=parent.parent;}
    if(dynamic)return;
    const key=materials.indexOf(obj.material);
    if(!groups.has(key))groups.set(key,{positions:[],normals:[],uvs:[],indices:[]});
    const batch=groups.get(key),g=obj.geometry,a=g.attributes.position,b=g.attributes.normal,uv=g.attributes.uv,offset=batch.positions.length/3;
    matrix.getNormalMatrix(obj.matrixWorld);
    for(let i=0;i<a.count;i++){
      point.fromBufferAttribute(a,i).applyMatrix4(obj.matrixWorld);batch.positions.push(point.x,point.y,point.z);
      normal.fromBufferAttribute(b,i).applyMatrix3(matrix).normalize();batch.normals.push(normal.x,normal.y,normal.z);
      batch.uvs.push(uv?uv.getX(i):0,uv?uv.getY(i):0);
    }
    // 原模型的收银机已合并进三个材质批次；只去掉其占用范围内的面，避免两台机器重叠。
    function oldRegisterTriangle(indices){
      return [17,19,21].includes(key)&&indices.every(i=>{const x=batch.positions[i*3],y=batch.positions[i*3+1],z=batch.positions[i*3+2];return x>1.73&&x<2.27&&y>1.099&&y<1.66&&z>2.10&&z<2.61;});
    }
    function oldPrepTriangle(indices){
      // 去掉实心旧柜体、抽屉面和把手，保留现有工作台面与上面的瓶罐。
      return [19,20].includes(key)&&indices.every(i=>{const x=batch.positions[i*3],y=batch.positions[i*3+1],z=batch.positions[i*3+2];return x> -5.9&&x< -1.9&&y>.18&&y<(key===20?1.17:1.14)&&z>7.72&&z<8.76;});
    }
    function repeatedKitchenTriangle(indices){
      // 旧挤酱瓶和挂锅已合进原材质网格；按各自完整占用范围移除，再接入不同轮廓的道具。
      const bottle=[11,12,18,21].includes(key)&&indices.every(i=>{const x=batch.positions[i*3],y=batch.positions[i*3+1],z=batch.positions[i*3+2];return x>-5.25&&x<-2.55&&y>1.24&&y<1.81&&z>8.075&&z<8.37;});
      const pan=key===21&&indices.every(i=>{const x=batch.positions[i*3],y=batch.positions[i*3+1],z=batch.positions[i*3+2];return x>-5.32&&x<-2.90&&y>1.64&&y<2.32&&z>8.50&&z<8.65;});
      if(bottle)kitchenCleanup.bottleTriangles++;if(pan)kitchenCleanup.panTriangles++;return bottle||pan;
    }
    const count=g.index?g.index.count:a.count;
    for(let i=0;i<count;i+=3){const indices=[0,1,2].map(j=>offset+(g.index?g.index.getX(i+j):i+j));if(!oldRegisterTriangle(indices)&&!oldPrepTriangle(indices)&&!repeatedKitchenTriangle(indices))batch.indices.push(...indices);}
    remove.push(obj);
  });
  remove.forEach(o=>o.parent.remove(o));
  const model=new THREE.Group();model.add(inner);
  groups.forEach((batch,key)=>{
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(batch.positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(batch.normals,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(batch.uvs,2));g.setIndex(batch.indices);g.computeBoundingSphere();
    const mesh=new THREE.Mesh(g,materials[key]);mesh.name='NightStatic_'+key;model.add(mesh);
  });
  model.updateMatrixWorld(true);
  return {model,collisions,kitchenCleanup,hinges:[inner.getObjectByName('DoorHingeLeft'),inner.getObjectByName('DoorHingeRight')]};
}

function createNightProps(scene, greybox=false) {
  const root=new THREE.Group(),proxies=new THREE.Group(),decor=new THREE.Group();scene.add(root,proxies);root.add(decor);
  const targets=[],textures=[],shared=new Map(),drawers=[],counterObjects=[];
  let faucetRunning=false,worldClock=0,cueId=null;
  function material(color){if(!shared.has(color))shared.set(color,new THREE.MeshLambertMaterial({color,map:greybox?null:agedSurface('#b3a88c'),flatShading:false}));return shared.get(color);}
  function box(name,pos,size,color=0x4a716c){
    const [w,h,d]=size,b=Math.min(w,h,d)*.085,shape=new THREE.Shape();
    shape.moveTo(-w/2+b,-h/2+b);shape.lineTo(w/2-b,-h/2+b);shape.lineTo(w/2-b,h/2-b);shape.lineTo(-w/2+b,h/2-b);shape.closePath();
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:d-b*2,bevelEnabled:true,bevelSize:b,bevelThickness:b,bevelSegments:1,steps:1});geometry.translate(0,0,-d/2+b);
    const m=new THREE.Mesh(geometry,material(greybox?0x7d8c84:color));m.name=name;m.position.fromArray(pos);root.add(m);return m;
  }
  function paper(name,pos,size,lines,color='#cbbc95',rotation=Math.PI){
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=384;
    const ctx=canvas.getContext('2d'),t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.magFilter=THREE.LinearFilter;t.minFilter=THREE.LinearMipmapLinearFilter;textures.push(t);
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(...size),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));mesh.name=name;mesh.position.fromArray(pos);mesh.rotation.y=rotation;root.add(mesh);
    function draw(text){ctx.save();ctx.scale(2,2);ctx.fillStyle=color;ctx.fillRect(0,0,256,192);const g=ctx.createRadialGradient(130,75,30,128,96,170);g.addColorStop(0,'#77503200');g.addColorStop(1,'#68401c65');ctx.fillStyle=g;ctx.fillRect(0,0,256,192);for(let i=0;i<130;i++){ctx.fillStyle=i%2?'#59482b12':'#f3e4bd17';ctx.fillRect((i*73)%256,(i*37)%192,2+(i%5),1);}ctx.strokeStyle='#7c705b';ctx.strokeRect(9,9,238,174);ctx.strokeStyle='#65513420';ctx.beginPath();ctx.moveTo(0,94);ctx.lineTo(256,98);ctx.stroke();ctx.fillStyle='#38382b';ctx.font='18px Microsoft YaHei, sans-serif';ctx.textAlign='center';text.forEach((line,i)=>ctx.fillText(line,128,38+i*32));ctx.restore();t.needsUpdate=true;}
    draw(lines);return {mesh,draw};
  }
  function plaque(name,pos,size,lines,finish='enamel',rotation=Math.PI){
    const colors={chalk:['#223b30','#d0d5b6'],wood:['#6b5538','#e3d5ad'],enamel:['#a9bcaa','#283f32'],brass:['#979577','#303f31']},palette=colors[finish];
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=384;
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);
    const face=new THREE.MeshBasicMaterial({map:texture}),edge=material(finish==='wood'?0x4b3f2e:0x6b7e6c);
    const geometry=new THREE.BoxGeometry(size[0],size[1],.022);geometry.clearGroups();geometry.addGroup(0,24,0);geometry.addGroup(24,12,1);
    const mesh=new THREE.Mesh(geometry,[edge,face]);mesh.name=name;mesh.position.fromArray(pos);mesh.rotation.y=rotation;root.add(mesh);
    function draw(text){
      const ctx=canvas.getContext('2d');ctx.fillStyle=palette[0];ctx.fillRect(0,0,512,384);
      ctx.strokeStyle=finish==='chalk'?'#99ac9530':'#354d3430';ctx.lineWidth=2;
      for(let i=0;i<35;i++){ctx.beginPath();const y=(i*71)%384;ctx.moveTo(0,y);ctx.lineTo(512,y+(finish==='wood'?4:35));ctx.stroke();}
      if(finish!=='chalk'){ctx.fillStyle='#788567';for(const x of [22,490])for(const y of [22,362]){ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();}}
      ctx.fillStyle=palette[1];ctx.textAlign='center';ctx.font='35px Microsoft YaHei, sans-serif';text.forEach((line,i)=>ctx.fillText(line,256,80+i*70));texture.needsUpdate=true;
    }
    draw(lines);return {mesh,draw};
  }
  function target(id,name,room,pos,size=[.7,.6,.25],maxDistance=3.8,offset=[0,.35,-1.15]){
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));mesh.position.fromArray(pos);mesh.name='interaction_'+id;proxies.add(mesh);
    const entry={id,name,room,mesh,position:pos,maxDistance,offset};targets.push(entry);return entry;
  }
  function layOnSurface(mesh){
    // 简化模型的台面略有倾斜，纸面跟随真实三角形法线。
    scene.updateMatrixWorld(true);
    const ray=new THREE.Raycaster(mesh.position.clone().add(new THREE.Vector3(0,.25,0)),new THREE.Vector3(0,-1,0),0,.5);
    const hit=ray.intersectObjects(scene.children.filter(o=>o!==root&&o!==proxies),true)[0];
    if(!hit)return;
    const normal=hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
    mesh.position.copy(hit.point).addScaledVector(normal,mesh.geometry.type==='BoxGeometry'?.013:.002);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),normal);
  }
  function detail(name,pos,size,color){const m=box(name,pos,size,color);root.remove(m);decor.add(m);return m;}
  function round(name,pos,radius,depth,color,axis='z'){
    const m=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,depth,12),material(color));m.name=name;m.position.fromArray(pos);if(axis==='z')m.rotation.x=Math.PI/2;decor.add(m);return m;
  }
  function frame(name,pos,size,color=0x695441){
    detail(name+'Back',[pos[0],pos[1],pos[2]+.022],[size[0]+.05,size[1]+.05,.035],0x322c25);
    for(const x of [-1,1])detail(name+'Side',[pos[0]+x*(size[0]/2+.018),pos[1],pos[2]],[.038,size[1]+.08,.06],color);
    for(const y of [-1,1])detail(name+'Rail',[pos[0],pos[1]+y*(size[1]/2+.018),pos[2]],[size[0]+.08,.038,.06],color);
  }
  // 收银台顶面为 1.095；纸张贴在托板上，托板落在台面上。
  detail('ReceiptClipboard',[1.53,1.106,2.39],[.43,.022,.48],0x735f45);
  detail('ReceiptClip',[1.53,1.135,2.57],[.16,.027,.05],0xa18b59);
  const order=paper('LastOrder',[1.53,1.118,2.36],[.37,.4],['最后一单','蟹堡 × 1 / 饮料 × 1','优惠 0.50','领餐人：——']);order.mesh.rotation.set(-Math.PI/2,0,.025);
  detail('ShiftBoardStand',[2.51,1.26,2.39],[.045,.30,.08],0x68583b);
  detail('ShiftBoardFoot',[2.51,1.12,2.39],[.39,.035,.19],0x68583b);
  const note=plaque('ClosingNote',[2.51,1.52,2.36],[.47,.49],['夜班须知','结清最后一单','到办公室来','—— 蟹老板'],'wood');
  plaque('NightMenu',[-.55,3.74,2.88],[1.44,1.05],['夜班菜单','蟹堡　3.00','饮料　2.00','优惠　0.50'],'chalk');
  frame('MenuFrame',[-.55,3.74,2.88],[1.44,1.05]);
  for(const x of [-1.10,0])detail('MenuHanger',[x,4.48,2.91],[.024,.43,.024],0x6f715b);
  detail('RegisterFoot',[2,1.119,2.4],[.48,.047,.43],0x403a30);
  detail('RegisterBody',[2,1.32,2.4],[.43,.35,.36],0x3b4c45);
  detail('RegisterDisplayRim',[2,1.48,2.202],[.4,.2,.035],0x9e885f);
  const digits=paper('NightRegisterDigits',[2,1.48,2.18],[.34,.14],['0.00'],'#a6b38b');
  detail('RegisterDrawer',[2,1.173,2.191],[.4,.06,.02],0x7c7154);
  detail('RegisterDrawerHandle',[2,1.172,2.168],[.13,.018,.025],0xb1a17b);
  for(let row=0;row<2;row++)for(let col=0;col<5;col++){
    const key=round('RegisterIvoryKey',[1.85+col*.075,1.335-row*.067,2.2],.025,.025,0xc2b58f);key.rotation.x=Math.PI/2+.14;
  }
  target('order','最后一张订单','cashier',[1.53,1.14,2.36],[.41,.06,.44],3.8,[0,.8,-.75]);
  target('note','值班牌','cashier',[2.51,1.52,2.33],[.50,.52,.12],3.8,[0,.35,-.75]);
  target('menu','夜班菜单','cashier',[-.55,3.74,2.83],[1.44,1.05,.18],5.8);
  target('register','收银机','cashier',[2,1.35,2.22],[.5,.5,.42]);
  // 大厅后墙右端、办公室门右侧。进入使用同一存档驱动的交互近景，无需钥匙。
  box('RestroomDoorRecess',[6.08,1.46,3.22],[1.17,2.57,.07],0x182b24);
  for(let i=0;i<6;i++)detail('RestroomDoorPlank',[5.62+i*.184,1.46,3.15],[.176,2.48,.07],i%2?0x75806a:0x677664);
  for(const x of [5.46,6.69])detail('RestroomDoorJamb',[x,1.48,3.12],[.10,2.67,.14],0x61533f);
  detail('RestroomDoorLintel',[6.08,2.82,3.12],[1.33,.12,.14],0x61533f);
  for(const y of [.55,2.4])detail('RestroomDoorStrap',[6.08,y,3.10],[1.08,.06,.03],0x576255);
  plaque('RestroomSign',[6.08,2.02,3.08],[.58,.43],['厕所','WC'],'enamel');
  box('RestroomKnob',[6.45,1.28,3.02],[.13,.08,.12],0xafa27b);
  target('restroom','厕所门','lobby',[6.08,1.55,3.00],[1.20,2.55,.24],3.5,[0,.15,-1.2]);
  const gate=box('OfficeLockedDoor',[4.65,1.47,3.29],[1.28,2.58,.13],0x587678);
  gate.material=new THREE.MeshLambertMaterial({color:0x85785f,map:greybox?null:agedSurface('#98856b',true)});
  // 门板、铭牌与五金共用真实门轴，打开后仍保留在场景中。
  const doorHardware=new THREE.Group();root.add(doorHardware);
  for(const [x,y] of [[4.13,.8],[4.13,2.25],[5.04,1.2]]){const bolt=round('DoorBrassHardware',[x,y,3.195],.038,.032,0xa08c60);decor.remove(bolt);doorHardware.add(bolt);}
  const officeHinge=new THREE.Group();officeHinge.name='OfficeOldHinge';officeHinge.position.set(4.01,.18,3.29);root.add(officeHinge);root.updateMatrixWorld(true);
  [gate,doorHardware].forEach(mesh=>officeHinge.attach(mesh));
  detail('OfficeJambLeft',[3.96,1.48,3.29],[.10,2.7,.21],0x514537);
  detail('OfficeJambRight',[5.34,1.48,3.29],[.10,2.7,.21],0x514537);
  detail('OfficeJambTop',[4.65,2.82,3.29],[1.48,.12,.21],0x514537);
  const doorKnob=round('OfficeOldKnob',[5.05,1.27,3.17],.063,.072,0xa18a57);officeHinge.attach(doorKnob);
  target('officeDoor','办公室门','lobby',[4.65,1.6,3.1],[1.3,2.4,.25]);
  // 场景与近景使用同一张清晰合影，不再放置第二张镜面顺序图。
  const photoCanvas=document.createElement('canvas');photoCanvas.width=900;photoCanvas.height=600;
  const photoContext=photoCanvas.getContext('2d');photoContext.fillStyle='#728f87';photoContext.fillRect(0,0,900,600);
  const photoTexture=new THREE.CanvasTexture(photoCanvas);photoTexture.colorSpace=THREE.SRGBColorSpace;photoTexture.magFilter=THREE.LinearFilter;photoTexture.minFilter=THREE.LinearMipmapLinearFilter;textures.push(photoTexture);
  const photoMesh=new THREE.Mesh(new THREE.PlaneGeometry(1.02,.68),new THREE.MeshBasicMaterial({map:photoTexture,side:THREE.FrontSide}));photoMesh.name='EmployeePhoto';photoMesh.position.set(4.48,1.72,7.03);photoMesh.rotation.y=Math.PI;root.add(photoMesh);
  let photoState=false;
  const photoImages=[0,1,2].map(index=>{
    const image=new Image();image.onload=()=>{if(photoState===index)drawPhoto();};image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(employeePhoto(index>0,index===2));return image;
  });
  function drawPhoto(){const image=photoImages[Number(photoState)];if(!image.complete||!image.naturalWidth)return;photoContext.clearRect(0,0,900,600);photoContext.drawImage(image,0,0,900,600);photoTexture.needsUpdate=true;}
  frame('PhotoFrame',[4.48,1.72,7.03],[1.02,.68]);
  detail('PhotoStand',[4.48,1.245,7.09],[.08,.28,.08],0x695441);
  detail('PhotoFoot',[4.48,1.09,7.10],[.4,.03,.25],0x695441);
  detail('LedgerCover',[5.3,1.09,7.0],[.5,.03,.38],0x604435);
  detail('LedgerPages',[5.3,1.112,7.0],[.46,.025,.35],0xc3b18b);
  detail('LedgerSpine',[5.07,1.117,7.0],[.045,.05,.38],0x604435);
  const ledgerPaper=paper('LedgerTitle',[5.3,1.126,7.0],[.4,.3],['夜班账本','打卡记录','10月07日晚班']);ledgerPaper.mesh.rotation.set(-Math.PI/2,0,0);
  detail('LedgerRecorder',[5.44,1.15,7.05],[.07,.035,.28],0x283a3c);
  detail('LedgerRecorderScreen',[5.44,1.172,7.04],[.045,.008,.065],0x94a793);
  round('LedgerRecorderPlay',[5.44,1.176,6.95],.016,.006,0x718c84,'y');
  detail('SafeInsetDoor',[6.07,1.0,7.663],[.94,1.05,.055],0x41564f);
  detail('SafeBrassPlate',[6.07,1.12,7.625],[.64,.29,.03],0xa29168);
  for(let i=0;i<3;i++)round('SafeCombinationDial',[5.87+i*.2,1.12,7.599],.074,.055,0x605b46);
  for(const x of [5.69,6.45])for(const y of [.59,1.4])round('SafeRivet',[x,y,7.615],.023,.022,0xad9a71);
  box('SafeHintPointer',[5.87,1.12,7.568],[.10,.012,.007],0xb4a179);
  detail('SafeHandle',[6.32,.8,7.588],[.18,.035,.05],0xb4a179);
  target('photo','员工合影','office',[4.48,1.72,6.99],[1.1,.76,.2]);
  target('safe','员工保险柜','office',[6.07,1.12,7.54],[1.15,1.2,.2]);
  target('ledger','夜班账本','office',[5.3,1.27,7.0],[.55,.35,.55]);
  detail('RecordSideTable',[6.13,1.08,4.55],[.82,.12,.65],0x66503d);
  for(const x of [5.79,6.47])for(const z of [4.3,4.8])detail('RecordTableLeg',[x,.62,z],[.065,.8,.065],0x554a38);
  detail('RecordPlayerBase',[6.13,1.16,4.55],[.65,.13,.47],0x66503d);
  round('RecordDisc',[6.13,1.239,4.55],.21,.02,0x253735,'y');
  box('RecordArm',[6.32,1.28,4.55],[.025,.025,.31],0xb8a174);
  // 谱页标签贴在机身正面，不悬在唱片上方。
  target('music','桌上的留声机','office',[6.13,1.34,4.55],[.65,.35,.5],3.8,[-.1,.45,-.8]);
  const badge=plaque('OldNameBadge',[6.07,.64,7.6215],[.45,.24],['旧员工：小海','工号：001'],'brass');
  const clock=paper('NightClock',[4.32,2.53,8.67],[.58,.58],['夜班时间','23:59'],'#c6b994');
  const clockCanvas=document.createElement('canvas');clockCanvas.width=clockCanvas.height=256;
  const clockTexture=new THREE.CanvasTexture(clockCanvas);clockTexture.colorSpace=THREE.SRGBColorSpace;
  clock.mesh.geometry.dispose();clock.mesh.geometry=new THREE.CircleGeometry(.28,40);clock.mesh.material.map=clockTexture;
  round('ClockBrassCase',[4.32,2.53,8.7],.32,.09,0x907952);
  clock.draw=text=>{
    const ctx=clockCanvas.getContext('2d');ctx.fillStyle='#c7b98f';ctx.fillRect(0,0,256,256);ctx.strokeStyle='#4b4634';ctx.lineWidth=3;
    for(let i=0;i<60;i++){const a=i*Math.PI/30;ctx.beginPath();ctx.moveTo(128+Math.sin(a)*108,128-Math.cos(a)*108);ctx.lineTo(128+Math.sin(a)*(i%5?102:93),128-Math.cos(a)*(i%5?102:93));ctx.stroke();}
    ctx.font='18px Georgia';ctx.textAlign='center';ctx.fillStyle='#474333';for(let i=1;i<=12;i++){const a=i*Math.PI/6;ctx.fillText(['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][i-1],128+Math.sin(a)*77,134-Math.cos(a)*77);}
    const final=text.some(line=>line.includes('00:01')),minute=(final?1:59)*Math.PI/30,hour=(final?.017:11.983)*Math.PI/6;
    ctx.lineCap='round';for(const [a,length,width] of [[hour,47,6],[minute,85,3]]){ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(128,128);ctx.lineTo(128+Math.sin(a)*length,128-Math.cos(a)*length);ctx.stroke();}ctx.fillStyle='#614b30';ctx.beginPath();ctx.arc(128,128,5,0,Math.PI*2);ctx.fill();clockTexture.needsUpdate=true;
  };clock.draw(['23:59']);
  const frozen=box('FrozenMemory',[6.07,1.25,7.61],[.26,.3,.25],0x82acb3);const innerCube=box('BlackInsideIce',[6.07,1.28,7.45],[.12,.12,.04],0x152029);
  frozen.visible=innerCube.visible=false;
  const pot=new THREE.Group();root.add(pot);pot.position.set(-3.9,1.2925,8.04);
  const pan=new THREE.Mesh(new THREE.CylinderGeometry(.25,.21,.25,24,1,true),material(0x687a75));pot.add(pan);
  const handle=box('WaterPanHandle',[-3.45,1.3225,8.04],[.43,.06,.1],0x263239);
  const panBase=new THREE.Mesh(new THREE.CylinderGeometry(.21,.21,.025,24),material(0x687a75));panBase.position.y=-.12;pot.add(panBase);
  const panRim=new THREE.Mesh(new THREE.TorusGeometry(.248,.013,6,24),material(0xa6a899));panRim.rotation.x=Math.PI/2;panRim.position.y=.12;pot.add(panRim);
  const water=new THREE.Mesh(new THREE.CircleGeometry(.23,12),new THREE.MeshBasicMaterial({color:0x64989c,side:THREE.DoubleSide}));water.rotation.x=-Math.PI/2;water.position.y=.04;water.visible=false;pot.add(water);
  const potIce=new THREE.Mesh(new THREE.BoxGeometry(.16,.19,.16),material(0x9ebdc2));potIce.position.y=.08;potIce.visible=false;pot.add(potIce);
  const reflection=new THREE.Group();pot.add(reflection);reflection.position.y=.05;
  const face=new THREE.Mesh(new THREE.CircleGeometry(.055,12),new THREE.MeshBasicMaterial({color:0x152b2d,side:THREE.DoubleSide}));face.rotation.x=-Math.PI/2;face.position.z=-.055;reflection.add(face);
  const body=new THREE.Mesh(new THREE.PlaneGeometry(.115,.105),face.material);body.rotation.x=-Math.PI/2;body.position.z=.05;reflection.add(body);reflection.visible=false;
  target('pot','备餐台上的锅','kitchen',[-3.9,1.34,7.97],[.85,.4,.6],3.8);
  target('sink','水槽与水龙头','kitchen',[-6.14,1.48,5.15],[.77,.7,1.18],3.8, [.95,.35,0]);
  target('stove','炉台','kitchen',[-.5,1.43,4.45],[2.4,.65,.32],3.8,[0,.3,1.0]);
  box('FridgeHandleHint',[1.46,1.75,7.267],[.04,.02,.025],0x8d9c87);
  box('StoveKnobHint',[-.8,1.08,4.608],[.08,.012,.008],0x9a997d);
  target('fridge','冰柜上的标签','kitchen',[1.28,1.95,7.32],[1.0,.9,.1]);
  const recipeCard=plaque('RecoveredRecipe',[-2.3,1.277,8.02],[.55,.38],['事故原始记录','员工 001 / 小海','改为自动离职'],'enamel');layOnSurface(recipeCard.mesh);recipeCard.mesh.visible=false;
  target('recipe','炉台旁的事故夹页','kitchen',[-2.3,1.4,8.02],[.65,.30,.55],4,[0,.8,-.9]);
  // 台面陈列有不同用途、轮廓与高度；食材前方和锅边保持空位。
  function counterObject(name,pos){const g=new THREE.Group();g.name=name;g.position.fromArray(pos);root.add(g);counterObjects.push(g);return g;}
  function objectMesh(group,geometry,pos,color){const m=new THREE.Mesh(geometry,material(color));m.position.fromArray(pos);group.add(m);return m;}
  function objectBox(group,pos,size,color){const m=box('CounterDetail',pos,size,color);root.remove(m);group.add(m);return m;}
  function objectTube(group,points,radius,color){return objectMesh(group,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),12,radius,6,false),[0,0,0],color);}
  const board=counterObject('CounterCuttingBoard',[-3.15,1.275,8.46]),boardShape=new THREE.Shape();
  boardShape.moveTo(-.22,.025);boardShape.quadraticCurveTo(-.245,0,-.245,.045);boardShape.lineTo(-.245,.50);boardShape.quadraticCurveTo(-.24,.55,-.07,.55);boardShape.lineTo(-.065,.66);boardShape.quadraticCurveTo(0,.73,.065,.66);boardShape.lineTo(.07,.55);boardShape.quadraticCurveTo(.24,.55,.245,.50);boardShape.lineTo(.245,.045);boardShape.quadraticCurveTo(.245,0,.22,.025);boardShape.closePath();
  const boardHole=new THREE.Path();boardHole.absarc(0,.635,.028,0,Math.PI*2,true);boardShape.holes.push(boardHole);
  const boardGeo=new THREE.ExtrudeGeometry(boardShape,{depth:.035,bevelEnabled:true,bevelSize:.009,bevelThickness:.006,bevelSegments:2,steps:1});boardGeo.translate(0,0,-.0175);
  const boardMesh=objectMesh(board,boardGeo,[0,0,0],0xa7824b);boardMesh.material=new THREE.MeshLambertMaterial({color:0xc4a068,map:agedSurface('#94734c',true)});board.rotation.set(-.20,0,-.13);
  for(let i=0;i<7;i++)objectTube(board,[[-.14+i*.03,.12,-.027],[-.10+i*.03,.25,-.029],[-.06+i*.03,.34,-.027]],.0015,0x7a5d39);
  const crock=counterObject('CounterCeramicCrock',[-2.46,1.275,8.47]);
  const profile=[[.125,0],[.15,.025],[.182,.08],[.19,.17],[.155,.25],[.135,.27],[.135,.285],[.119,.285],[.119,.25],[.159,.15],[.135,.045],[0,.045]].map(p=>new THREE.Vector2(...p));
  objectMesh(crock,new THREE.LatheGeometry(profile,24),[0,0,0],0xb9b897);
  const crockLip=objectMesh(crock,new THREE.TorusGeometry(.13,.015,7,24),[0,.282,0],0x6d9889);crockLip.rotation.x=Math.PI/2;
  for(const sign of [-1,1])objectTube(crock,[[sign*.17,.19,0],[sign*.24,.18,0],[sign*.245,.11,0],[sign*.177,.095,0]],.013,0x9baa8d);
  objectTube(crock,[[-.045,.045,0],[-.075,.34,-.012],[-.10,.49,-.022]],.012,0x9e7b47);
  objectMesh(crock,new THREE.SphereGeometry(.052,14,8),[-.10,.51,-.022],0xa98750).scale.set(.67,1.2,.32);
  objectTube(crock,[[.03,.05,.02],[.055,.29,.04],[.085,.39,.048]],.013,0x7d613b);
  const seasoning=counterObject('CounterSeasoningBox',[-4.17,1.275,8.52]);
  objectBox(seasoning,[0,.058,0],[.31,.116,.24],0x7d8469);
  objectBox(seasoning,[0,.125,0],[.34,.024,.26],0xa5ac8a);
  objectBox(seasoning,[0,.147,0],[.10,.021,.035],0x6b6d4c);
  for(const x of [-.11,.11])objectBox(seasoning,[x,.06,-.122],[.025,.10,.006],0x5f715c);
  // 只留一口旧挂锅，另一个挂位放软布，其余挂位留空。
  const skillet=counterObject('SingleHangingPan',[-5.22,1.86,8.575]);
  const skilletBody=objectMesh(skillet,new THREE.CylinderGeometry(.175,.153,.035,24),[0,0,0],0x34443d);skilletBody.rotation.x=Math.PI/2;
  objectMesh(skillet,new THREE.TorusGeometry(.161,.012,6,24),[0,0,-.028],0x62746a);
  objectBox(skillet,[0,.275,0],[.036,.23,.035],0x575744);
  const towel=counterObject('CounterHangingTowel',[-3.80,2.12,8.545]),towelGeo=new THREE.PlaneGeometry(.29,.40,10,10),towelPos=towelGeo.attributes.position;
  for(let i=0;i<towelPos.count;i++){const x=towelPos.getX(i),y=towelPos.getY(i);towelPos.setZ(i,.018*Math.cos(x*80)*(1-(y+.2)/.4));}towelGeo.computeVertexNormals();
  const towelMesh=objectMesh(towel,towelGeo,[0,0,0],0x879e90);towelMesh.material=new THREE.MeshLambertMaterial({color:0x9ea995,map:agedSurface('#97a58e'),side:THREE.DoubleSide});
  for(const x of [-.07,.015,.10])objectTube(towel,[[x,.20,.002],[x,0,.004],[x,-.195,.019*Math.cos(x*80)]],.002,0x596e63);
  objectTube(towel,[[-.15,.205,0],[.15,.205,0]],.008,0x9aa47f);
  scene.updateMatrixWorld(true);
  [board,crock,seasoning].forEach(g=>{
    const ray=new THREE.Raycaster(g.position.clone().add(new THREE.Vector3(0,.25,0)),new THREE.Vector3(0,-1,0),0,.5),hit=ray.intersectObjects(scene.children.filter(o=>o!==root&&o!==proxies),true)[0];
    if(hit){const bounds=new THREE.Box3().setFromObject(g);g.position.y+=hit.point.y-bounds.min.y+.001;}
  });
  // 柜体有真实空腔，抽屉是独立的盒体，沿滑轨拉出。
  detail('PrepCabinetBottom',[-3.9,.28,8.3],[3.8,.12,.85],0x456458);
  detail('PrepCabinetBack',[-3.9,.72,8.70],[3.8,.86,.05],0x344b42);
  for(const x of [-5.77,-4.475,-3.325,-2.03])detail('PrepCabinetDivider',[x,.72,8.30],[.055,.86,.84],0x415d50);
  for(const [i,x] of [-5.05,-3.9,-2.75].entries()){
    detail('PrepLowerDoor'+i,[x,.555,7.875],[1.07,.44,.04],0x486d5d);
    const group=new THREE.Group();group.name='KitchenDrawer'+i;root.add(group);
    function part(name,pos,size,color){const m=box(name,pos,size,color);group.attach(m);return m;}
    part('DrawerBottom'+i,[x,.842,8.17],[1.06,.035,.62],0x554e38);
    for(const xx of [x-.525,x+.525])part('DrawerSide'+i,[xx,.937,8.17],[.035,.16,.62],0x62583d);
    part('DrawerBack'+i,[x,.937,8.465],[1.06,.16,.035],0x62583d);
    part('DrawerFront'+i,[x,.947,7.85],[1.1,.26,.055],0x527664);
    part('DrawerHandle'+i,[x,.947,7.794],[.30,.035,.055],0x72836f);
    function roundPart(name,pos,radius,depth,color){const m=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,depth,16),material(color));m.name=name;m.position.fromArray(pos);root.add(m);group.attach(m);return m;}
    if(i===0){
      part('SpatulaWoodGrip',[x-.23,.888,8.29],[.075,.045,.23],0x8f623e);
      part('SpatulaNeck',[x-.23,.889,8.13],[.035,.022,.12],0xa4afa0);
      for(let n=0;n<4;n++)part('SpatulaSlotRail',[x-.31+n*.053,.89,8.00],[.026,.024,.18],0xa4afa0);
      part('SpatulaHeadEnd',[x-.23,.89,7.91],[.19,.024,.025],0xa4afa0);
      part('ForkGrip',[x+.23,.887,8.24],[.028,.025,.28],0xadb5a6);
      part('ForkShoulder',[x+.23,.887,8.095],[.10,.025,.035],0xadb5a6);
      for(let n=0;n<4;n++){const tooth=part('ForkTooth',[x+.19+n*.026,.887,8.04],[.012,.025,.095],0xadb5a6);if(n===0)tooth.rotation.y=.35;}
    }else if(i===1){
      roundPart('SaltGlass',[x-.21,.95,8.16],.095,.18,0x88a79a);
      roundPart('SaltLid',[x-.21,1.046,8.16],.101,.024,0xb2b29b);
      for(let n=0;n<3;n++)roundPart('SaltLidHole',[x-.255+n*.045,1.060,8.16],.008,.002,0x35483a);
      roundPart('OldSpiceTin',[x+.23,.92,8.14],.125,.12,0x8c805b);
      roundPart('TinRustRim',[x+.23,.984,8.14],.13,.012,0x976d46);
      roundPart('TinPowder',[x+.23,.991,8.14],.11,.002,0x554332);
    }else{
      for(let n=0;n<3;n++)part('FoldedCloth',[x-.18,.873+n*.014,8.15],[.32,.015,.26],n%2?0xa5b19b:0x789481);
      for(let n=0;n<4;n++)part('ClothStripe',[x-.30+n*.065,.913,8.15],[.014,.002,.26],0x527466);
      const bowl=new THREE.Mesh(new THREE.SphereGeometry(.065,16,8,0,Math.PI*2,Math.PI/2,Math.PI/2),material(0xa5b6aa));bowl.name='MeasureSpoonBowl';bowl.material.side=THREE.DoubleSide;bowl.position.set(x+.22,.927,8.04);root.add(bowl);group.attach(bowl);
      part('MeasureSpoonHandle',[x+.22,.906,8.215],[.025,.015,.24],0xa5b6aa);
    }
    const entry=target('drawer'+i,['餐具抽屉','调料抽屉','擦布抽屉'][i],'kitchen',[x,.947,7.77],[1.02,.23,.16],3.2);
    const content=target('drawerContents'+i,'抽屉里的物件','kitchen',[x,.97,8.15],[.91,.21,.53],3.2);
    const collision=new THREE.Box3();drawers.push({group,entry,content,open:false,amount:0,collision});
  }
  // 过期食材放在旧托盘内，靠霉斑、缩水与变色表现，不堆文字标签。
  const food=new THREE.Group();food.name='ExpiredIngredients';food.position.set(-5.02,1.275,8.03);root.add(food);
  function foodBox(name,pos,size,color){const m=box(name,pos,size,color);root.remove(m);food.add(m);return m;}
  function foodRound(name,pos,radius,scale,color){const m=new THREE.Mesh(new THREE.SphereGeometry(radius,12,7),material(color));m.name=name;m.position.fromArray(pos);m.scale.fromArray(scale);food.add(m);return m;}
  foodBox('OldFoodTray',[0,.012,0],[.98,.024,.54],0x58655a);
  for(const z of [-.26,.26])foodBox('TrayRim',[0,.048,z],[.98,.06,.02],0x7a8169);
  for(const x of [-.48,.48])foodBox('TrayRim',[x,.048,0],[.02,.06,.54],0x7a8169);
  function foodMesh(name,geometry,pos,color){const mesh=new THREE.Mesh(geometry,material(color));mesh.name=name;mesh.position.fromArray(pos);food.add(mesh);return mesh;}
  function foodLine(name,points,width,color){return foodMesh(name,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),10,width,5,false),[0,0,0],color);}
  // 面包是带切口的拱顶，肉饼是不规则薄圆盘，番茄有凹陷与蒂，生菜有卷边叶脉。
  const bun=foodMesh('StaleBun',new THREE.SphereGeometry(.15,20,10,0,Math.PI*2,0,Math.PI/2),[-.27,.042,-.05],0xc09b65);bun.scale.set(1,.7,.90);
  foodMesh('BunCrust',new THREE.CylinderGeometry(.15,.142,.024,20),[-.27,.035,-.05],0x9b784b).scale.z=.90;
  for(let i=0;i<3;i++)foodLine('BunCrack'+i,[[-.35+i*.045,.108,-.12],[-.34+i*.045,.137,-.055],[-.33+i*.045,.111,.015]],.003,0x6c5036);
  for(let i=0;i<9;i++){const a=i*2.4,r=.04+(i%3)*.024;foodRound('BunMold'+i,[-.27+Math.cos(a)*r,.046+.105*Math.sqrt(1-r*r/.0225),-.05+Math.sin(a)*r*.9],.013,[1,.18,1],i%2?0x667b56:0xafb198);}
  const pattyGeometry=new THREE.CylinderGeometry(.135,.143,.034,20),pv=pattyGeometry.attributes.position;
  for(let n=0;n<pv.count;n++){const x=pv.getX(n),z=pv.getZ(n),r=1+.05*Math.sin(Math.atan2(z,x)*7);pv.setXYZ(n,x*r,pv.getY(n),z*r);}pattyGeometry.computeVertexNormals();
  foodMesh('MoldyPatty',pattyGeometry,[.07,.047,-.12],0x5e4833);
  for(let i=0;i<10;i++){const a=i*2.4,r=.025+(i%3)*.031;foodRound('PattyMold'+i,[.07+Math.cos(a)*r,.066,-.12+Math.sin(a)*r],.023,[1,.1,.75],i%2?0x667b49:0x849060);}
  const tomatoGeometry=new THREE.SphereGeometry(.085,20,12),tv=tomatoGeometry.attributes.position;
  for(let n=0;n<tv.count;n++){const x=tv.getX(n),y=tv.getY(n),z=tv.getZ(n),a=Math.atan2(z,x),r=.91+.09*Math.cos(a*8);tv.setXYZ(n,x*r,y*(y>0?.72:.86),z*r);}tomatoGeometry.computeVertexNormals();
  foodMesh('DriedTomato',tomatoGeometry,[.32,.099,.045],0xa15843);
  for(let i=0;i<5;i++){const a=i*Math.PI*.4;foodLine('TomatoSepal'+i,[[.32,.165,.045],[.32+Math.cos(a)*.024,.158,.045+Math.sin(a)*.024],[.32+Math.cos(a)*.049,.144,.045+Math.sin(a)*.049]],.006,0x627449);}
  foodLine('TomatoStem',[[.32,.159,.045],[.322,.185,.043],[.33,.193,.04]],.006,0x6c7b4b);
  const leafShape=new THREE.Shape();leafShape.moveTo(0,-.12);leafShape.bezierCurveTo(-.14,-.09,-.16,-.03,-.10,0);leafShape.bezierCurveTo(-.19,.07,-.07,.08,-.04,.10);leafShape.bezierCurveTo(.01,.16,.06,.08,.08,.11);leafShape.bezierCurveTo(.17,.08,.12,.04,.14,.01);leafShape.bezierCurveTo(.15,-.05,.04,-.07,0,-.12);
  const leafGeometry=new THREE.ShapeGeometry(leafShape,8),lv=leafGeometry.attributes.position;
  for(let n=0;n<lv.count;n++){const x=lv.getX(n),y=lv.getY(n);lv.setZ(n,.016+Math.abs(x)*.14+.009*Math.sin(y*38));}leafGeometry.computeVertexNormals();
  const leaf=foodMesh('WiltedLettuce',leafGeometry,[.01,.039,.13],0x7d884f);leaf.rotation.x=-Math.PI/2;leaf.material.side=THREE.DoubleSide;
  foodLine('LettuceMidrib',[[.01,.055,.24],[.01,.069,.13],[.01,.055,.02]],.003,0xb0a466);
  for(let i=0;i<3;i++)for(const sign of [-1,1])foodLine('LettuceVein',[[.01,.065,.19-i*.04],[.01+sign*.035,.067,.16-i*.04],[.01+sign*.080,.073,.13-i*.04]],.002,0xb0a466);
  scene.updateMatrixWorld(true);
  const foodRay=new THREE.Raycaster(food.position.clone().add(new THREE.Vector3(0,.25,0)),new THREE.Vector3(0,-1,0),0,.5);
  const foodSurface=foodRay.intersectObjects(scene.children.filter(o=>o!==root&&o!==proxies),true)[0];
  if(foodSurface){const n=foodSurface.face.normal.clone().transformDirection(foodSurface.object.matrixWorld);food.position.copy(foodSurface.point).addScaledVector(n,.001);food.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),n);}
  target('ingredients','旧食材','kitchen',[-5.02,1.34,8.03],[.98,.20,.54],3.6,[0,.65,-.75]);
  // 龙头平时滴水，拧开后黑水沿出水口落入盆内。
  const dripMaterial=new THREE.MeshBasicMaterial({color:0x647b70}),blackWater=new THREE.MeshBasicMaterial({color:0x0c1613});
  const drops=[0,1,2].map(i=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(.012,8,5),dripMaterial);mesh.name='SinkDrop'+i;root.add(mesh);return mesh;});
  const stream=new THREE.Mesh(new THREE.CylinderGeometry(.012,.018,.30,8),blackWater);stream.name='BlackWaterStream';stream.position.set(-6.10,1.44,5.15);stream.visible=false;root.add(stream);
  const tapHandle=box('TapCrossHandle',[-6.44,1.756,5.15],[.20,.025,.025],0x859481);
  target('faucet','水龙头','kitchen',[-6.30,1.68,5.15],[.30,.28,.34],3.2,[.9,.25,0]);
  const hatch=box('WarehouseHatch',[-1.3,.24,6.35],[1.1,.07,1.28],0x4b635a);
  const hatchHandle=box('HatchHandle',[-1.3,.30,6.23],[.3,.08,.08],0xb7a773);
  const hatchHinge=new THREE.Group();hatchHinge.name='HatchOldHinge';hatchHinge.position.set(-1.3,.24,6.99);root.add(hatchHinge);root.updateMatrixWorld(true);
  [hatch,hatchHandle].forEach(mesh=>hatchHinge.attach(mesh));
  for(let i=0;i<5;i++)detail('HatchPlank',[-1.72+i*.21,.282,6.35],[.197,.023,1.20],i%2?0x6a6751:0x747157);
  for(const z of [5.89,6.8])detail('HatchIronStrap',[-1.3,.301,z],[1.04,.027,.065],0x454c43);
  for(const x of [-1.71,-.89])for(const z of [5.89,6.8])round('HatchBolt',[x,.322,z],.025,.019,0x958563,'y');
  root.updateMatrixWorld(true);
  decor.children.slice().filter(mesh=>/^Hatch(Plank|IronStrap|Bolt)/.test(mesh.name)).forEach(mesh=>hatchHinge.attach(mesh));
  // 舱口下面保留黑暗，门板抬起时才露出，避免像一块悬空木板。
  const hatchDark=new THREE.Mesh(new THREE.PlaneGeometry(1.06,1.24),new THREE.MeshBasicMaterial({color:0x030608,side:THREE.DoubleSide}));hatchDark.rotation.x=-Math.PI/2;hatchDark.position.set(-1.3,.232,6.35);root.add(hatchDark);
  target('hatch','地板舱口','kitchen',[-1.3,.31,6.35],[1.2,.18,1.38],3.8,[0,1.0,-.8]);
  const projector=box('MemoryProjector',[0,-2.18,6.14],[.88,.58,.7],0x435f5b);
  const stand=box('ProjectorStand',[0,-2.73,6.14],[.66,.55,.62],0x4e5544);
  const lens=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.24,24),material(0xc5b787));lens.position.set(0,-2.05,6.59);lens.rotation.x=Math.PI/2;root.add(lens);
  for(const x of [-.26,.26]){const reel=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.09,12),material(0x82968a));reel.position.set(x,-1.72,6.18);reel.rotation.x=Math.PI/2;root.add(reel);}
  const screen=paper('MemoryScreen',[0,-1.62,8.38],[2.1,1.45],['员工 001 / 小海','事故录像尚未装载','◀ 倒序读取门禁'],'#b5c6b8');
  frame('ProjectionFrame',[0,-1.62,8.38],[2.1,1.45],0x65543e);
  const warehouseCards=[];
  for(let i=0;i<3;i++){
    const x=-2.7+(i%3)*.63,y=-1.7-Math.floor(i/3)*.5;
    detail('BadgeRackBacking'+i,[x,y,8.4385],[.47,.31,.035],0x4d4433);
    detail('BadgeCord'+i,[x,y+.21,8.43],[.018,.14,.02],0x92846b);
    warehouseCards.push(plaque('DuplicateBadge'+i,[x,y,8.408],[.43,.27],['员工 001','姓名：■■'],'brass'));
  }
  // 卡架固定在仓库后墙，背板不随纸片一起悬空。
  detail('BadgeRackWallMount',[-2.07,-1.7,8.48],[1.74,.055,.09],0x4d4433);
  for(const x of [-1.12,1.12])detail('ScreenFeet',[x,-2.64,8.42],[.045,.65,.07],0x695441);
  detail('ProjectorVent',[.44,-2.16,6.12],[.025,.27,.43],0x272e2a);
  for(let i=0;i<6;i++)detail('VentSlat',[.457,-2.28+i*.048,6.12],[.015,.012,.37],0x8c927d);
  round('LensGlass',[0,-2.05,6.722],.108,.014,0x263f39);
  for(const x of [-.26,.26]){round('ReelAxle',[x,-1.72,6.24],.044,.05,0xb6a27a);for(let i=0;i<5;i++){const a=i*Math.PI*.4;round('ReelHole',[x+Math.cos(a)*.118,-1.72+Math.sin(a)*.118,6.233],.041,.006,0x36443c);}}
  plaque('ReturnHatchSign',[0,-1.48,1.67],[.75,.7],['↑ 返回厨房','↑'],'enamel',0);
  const returnBoard=detail('ReturnSignBacking',[0,-1.48,1.638],[.82,.78,.04],0x695441);
  detail('ReturnSignPost',[0,-2.48,1.638],[.055,1.24,.04],0x695441);
  detail('ReturnSignFoot',[0,-3.09,1.68],[.55,.03,.32],0x695441);
  target('projector','放映机','storage',[0,-1.92,6.12],[1.3,1.05,.9],4.3);
  target('return','返回厨房的舱口','storage',[0,-1.48,1.73],[1.1,1.1,.3],4, [0,.3,1.15]);
  const letter=paper('PaidEnvelope',[4.3,1.286,-5.2],[.58,.4],['小海 / 未领工资','绩效扣后：0.00'],'#d0c7a7');letter.mesh.rotation.set(-Math.PI/2,0,-.04);
  const burger=box('NormalBurger',[4.75,1.365,-5.2],[.30,.09,.27],0xc6a266);
  const filling=box('BurgerFilling',[4.75,1.3,-5.2],[.31,.04,.28],0x688558);
  const bottomBun=box('BurgerBottomBun',[4.75,1.28,-5.2],[.30,.03,.27],0xc6a266);
  const mealCover=new THREE.Mesh(new THREE.SphereGeometry(.32,16,8,0,Math.PI*2,0,Math.PI/2),material(0xa59c7e));mealCover.position.set(4.75,1.275,-5.2);mealCover.name='MealCover';root.add(mealCover);
  const coverHandle=box('CoverHandle',[4.75,1.62,-5.2],[.09,.05,.06],0xb8a67a);
  const mealNote=plaque('PatrickMealNote',[4.75,1.297,-5.63],[.30,.20],['旧留餐','给小海'],'brass');mealNote.mesh.rotation.set(-Math.PI/2,0,0);
  const finalReminder=paper('FinalMealReminder',[4.36,1.286,-5.63],[.34,.24],['员工公告','休息过久需约谈','—— 蟹老板']);finalReminder.mesh.rotation.set(-Math.PI/2,0,-.03);finalReminder.mesh.visible=false;
  detail('TableFourSignBoard',[4.05,1.446,-5.65],[.42,.32,.045],0x695441);
  detail('TableFourSignFoot',[4.05,1.296,-5.65],[.46,.02,.17],0x695441);
  plaque('TableFourSign',[4.05,1.446,-5.6865],[.38,.3],['04','留餐'],'wood');
  const mealLamp=new THREE.PointLight(0xffcd83,0,4.5,2);mealLamp.position.set(4.95,2.1,-5.2);root.add(mealLamp);
  detail('WarmLampStem',[5.15,1.52,-5.2],[.032,.49,.032],0x94784d);
  const lampShade=new THREE.Mesh(new THREE.ConeGeometry(.13,.18,12),material(0xd2b789));lampShade.position.set(5.15,1.82,-5.2);root.add(lampShade);
  const rememberedChair=new THREE.Group();root.add(rememberedChair);root.updateMatrixWorld(true);
  rememberedChair.attach(box('RememberedChairSeat',[3.25,.54,-5.2],[.55,.08,.53],0x846649));
  rememberedChair.attach(box('RememberedChairBack',[3.25,.94,-5.44],[.55,.7,.045],0x846649));
  for(const x of [3.04,3.46])for(const z of [-5.39,-5.01])rememberedChair.attach(box('RememberedChairLeg',[x,.34,z],[.038,.34,.038],0x64543d));
  target('meal','四号桌的留餐','lobby',[4.75,1.47,-5.2],[.75,.52,.85],4,[0,.6,-.85]);
  target('envelope','桌上的工资信封','lobby',[4.3,1.52,-5.2],[.8,.4,.8],3.8,[0,.4,-.8]);
  target('exit','餐厅正门','lobby',[0,1.55,-8.13],[2.5,2.6,.3],3.5,[0,.3,1.1]);
  let stateKey='';
  function sync(s){
    const f=s.flags,key=JSON.stringify(f);if(key===stateKey)return;stateKey=key;
    officeHinge.rotation.y=f.officeUnlocked?-1.48:0;
    hatchHinge.rotation.x=f.hatchUnlocked?1.38:0;
    frozen.visible=innerCube.visible=f.safeSolved&&!f.iceTaken;
    badge.mesh.visible=f.safeSolved;badge.draw(['旧员工：小海','工号：001']);
    pot.visible=f.potOnStove||!f.potTaken;handle.visible=!f.potTaken;water.visible=f.potFilled;potIce.visible=f.iceInPot&&!f.thawed;
    if(f.potOnStove)pot.position.set(-.5,1.3925,4.12);
    else pot.position.set(-3.9,1.2925,8.04);
    reflection.visible=f.potOnStove&&!f.thawed;
    recipeCard.mesh.visible=f.loopBroken;
    letter.mesh.visible=f.loopBroken;
    finalReminder.mesh.visible=false;
    burger.visible=filling.visible=bottomBun.visible=f.started;
    [burger,filling,bottomBun].forEach(mesh=>{mesh.scale.x=f.loopBroken?1:.52;mesh.position.x=f.loopBroken?4.75:4.68;});
    mealCover.visible=coverHandle.visible=!f.mealRead&&!f.loopBroken;
    rememberedChair.position.x=f.orderSolved?.17:0;
    mealNote.draw(['旧留餐','给小海']);
    mealLamp.intensity=f.loopBroken?2.5:0;
    warehouseCards.forEach(card=>card.draw(['事故档案','员工 001 / 小海']));
    order.draw(['最后一单','蟹堡 × 1 / 饮料 × 1','优惠 0.50',f.orderSolved?'领餐人：新员工 002':'领餐人：——']);
    digits.draw([f.orderSolved?'4.50':'0.00']);
    photoState=2;drawPhoto();
    clock.draw(['夜班时间',f.loopBroken?'00:01':'23:59']);
    if(f.loopBroken)screen.draw(['门禁已解除','小海 / 事故录像','带上证据离开']);
  }
  function active(entry,s){
    const f=s.flags;
    if(entry.room==='office'&&!f.officeUnlocked)return false;
    if(entry.room==='storage'&&!f.hatchUnlocked)return false;
    if(entry.id==='pot'&&f.potTaken)return false;
    if(entry.id==='recipe'&&!f.loopBroken)return false;
    if(entry.id==='envelope'&&!f.loopBroken)return false;
    if(/^drawerContents/.test(entry.id)){const d=drawers[Number(entry.id.slice(-1))];return d.open&&d.amount>.85;}
    return true;
  }
  root.updateMatrixWorld(true);proxies.updateMatrixWorld(true);
  // 静态细节按材质合批，手机无需为每个铆钉额外提交一次绘制。
  function batchGroup(group,preserve=()=>false){
  const batches=new Map();group.updateMatrixWorld(true);
  const inverse=group.matrixWorld.clone().invert(),merged=[];
  group.children.forEach(m=>{
    if(!m.isMesh||preserve(m))return;
    if(!batches.has(m.material))batches.set(m.material,{positions:[],normals:[],uvs:[]});const b=batches.get(m.material),g=m.geometry.index?m.geometry.toNonIndexed():m.geometry;
    const transform=inverse.clone().multiply(m.matrixWorld),normalMatrix=new THREE.Matrix3().getNormalMatrix(transform),v=new THREE.Vector3(),n=new THREE.Vector3();
    for(let i=0;i<g.attributes.position.count;i++){v.fromBufferAttribute(g.attributes.position,i).applyMatrix4(transform);n.fromBufferAttribute(g.attributes.normal,i).applyMatrix3(normalMatrix).normalize();b.positions.push(v.x,v.y,v.z);b.normals.push(n.x,n.y,n.z);b.uvs.push(g.attributes.uv.getX(i),g.attributes.uv.getY(i));}
    if(g!==m.geometry)g.dispose();m.geometry.dispose();
    merged.push(m);
  });
  merged.forEach(m=>group.remove(m));
  batches.forEach((b,mat)=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(b.positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(b.normals,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(b.uvs,2));g.computeBoundingSphere();const mesh=new THREE.Mesh(g,mat);mesh.name=group.name+'Details';group.add(mesh);});
  }
  batchGroup(decor);batchGroup(food);counterObjects.forEach(g=>batchGroup(g));drawers.forEach(d=>batchGroup(d.group,m=>/^DrawerHandle/.test(m.name)));
  function setDoor(id,amount){if(id==='officeDoor')officeHinge.rotation.y=-1.48*amount;else if(id==='hatch')hatchHinge.rotation.x=1.38*amount;}
  function doorStats(){return {office:officeHinge.rotation.y,hatch:hatchHinge.rotation.x};}
  const cueNames={restroom:'RestroomKnob',safe:'SafeHintPointer',music:'RecordArm',pot:'WaterPanHandle',stove:'StoveKnobHint',fridge:'FridgeHandleHint',hatch:'HatchHandle',ingredients:'ExpiredIngredients',faucet:'TapCrossHandle',sink:'TapCrossHandle',drawer0:'DrawerHandle0',drawer1:'DrawerHandle1',drawer2:'DrawerHandle2',order:'LastOrder',note:'ClosingNote',menu:'NightMenu',register:'NightRegisterDigits',officeDoor:'OfficeOldKnob',photo:'EmployeePhoto',ledger:'LedgerTitle',recipe:'RecoveredRecipe',meal:'PatrickMealNote',envelope:'PaidEnvelope',return:'ReturnHatchSign',projector:'MemoryScreen'};
  const cueMeshes={};Object.keys(cueNames).forEach(id=>{const mesh=root.getObjectByName(cueNames[id]);if(mesh)cueMeshes[id]={mesh,position:mesh.position.clone()};});
  function cue(id,seconds){
    if(cueId&&cueMeshes[cueId])cueMeshes[cueId].mesh.position.copy(cueMeshes[cueId].position);
    cueId=id;
    const c=cueMeshes[id];if(!c||!c.mesh.visible)return;
    const phase=seconds%7,amount=phase<1.35?.004*Math.sin(phase*12)*Math.sin(phase*Math.PI/1.35):0;
    const tangent=new THREE.Vector3(1,0,0).applyQuaternion(c.mesh.quaternion);
    c.mesh.position.copy(c.position).addScaledVector(tangent,amount);
  }
  function interact(id){
    const drawer=drawers.find(d=>d.entry.id===id);
    if(drawer){drawer.open=!drawer.open;return true;}
    if(id==='faucet'){faucetRunning=!faucetRunning;return true;}
    return false;
  }
  function closeDrawer(id){const drawer=drawers.find(d=>d.entry.id===id);if(drawer)drawer.open=false;}
  function update(dt){
    worldClock+=dt;
    drawers.forEach(d=>{d.amount+=(Number(d.open)-d.amount)*Math.min(1,dt*8);if(Math.abs(Number(d.open)-d.amount)<.001)d.amount=Number(d.open);d.group.position.z=-d.amount*.65;d.entry.position[2]=7.77+d.group.position.z;d.entry.mesh.position.z=d.entry.position[2];d.content.position[2]=8.15+d.group.position.z;d.content.mesh.position.z=d.content.position[2];d.group.updateMatrixWorld(true);d.collision.setFromObject(d.group);});
    stream.visible=faucetRunning;tapHandle.rotation.y+=(Number(faucetRunning)*Math.PI/2-tapHandle.rotation.y)*Math.min(1,dt*8);
    drops.forEach((mesh,i)=>{const phase=(worldClock*.65+i/3)%1;mesh.position.set(-6.10,1.60-phase*.32,5.15);mesh.scale.set(1,1+phase*.8,1);mesh.visible=!faucetRunning;});
  }
  function resetEnvironment(){drawers.forEach(d=>{d.open=false;d.amount=0;d.group.position.z=0;});faucetRunning=false;cue(null,0);update(0);}
  function environmentStats(){return {faucetRunning,blackStreamVisible:stream.visible,drops:drops.map(m=>({visible:m.visible,y:m.position.y})),drawers:drawers.map((d,i)=>({id:d.entry.id,open:d.open,amount:d.amount,z:d.group.position.z,contents:DRAWER_CONTENTS[i]})),cue:cueId};}
  update(0);
  return {root,proxies,targets,gate,sync,active,screen,setDoor,doorStats,cue,hasCue:id=>!!cueMeshes[id],interact,closeDrawer,update,resetEnvironment,environmentStats,collisions:[new THREE.Box3().setFromObject(projector).union(new THREE.Box3().setFromObject(stand)),...drawers.map(d=>d.collision)]};
}

window.KrustyScene={buildRestaurant,createNightProps};
})();