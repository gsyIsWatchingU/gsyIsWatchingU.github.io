import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mat, texMat, woodTex, makeCanvas, srgb } from './patrick-build.js';

// 收藏物沿沙层断面露出；原有菠萝屋资产复用，不改原文件。
export function createPatrickRelics(onChange) {
  const group = new THREE.Group(); group.name = 'buried-collection';
  const items = [], loader = new GLTFLoader(), rust = texMat(woodTex(256, 'dark'), .95);
  const glass = mat(0x468b81, .4), brass = mat(0xc09248, .7, { metalness: .32 });
  const relic = (mesh, x, y, label, story, tilt = 0) => {
    const holder = new THREE.Group(); holder.add(mesh); holder.position.set(x, y-.22, Math.sqrt(4.36 ** 2 - x ** 2));
    holder.rotation.set(.08, Math.asin(x / 4.36), tilt); holder.userData.interaction = 'relic';
    holder.userData.label = label; holder.userData.story = story; holder.userData.home = holder.position.clone();
    holder.name = 'relic-' + items.length; mesh.traverse(n => { if(n.isMesh) n.castShadow = n.receiveShadow = true; });
    group.add(holder); items.push(holder); return holder;
  };
  const bottleGeo = new THREE.LatheGeometry([[0,0],[.08,.02],[.09,.22],[.045,.3],[.032,.32],[.032,.42],[.04,.43],[0,.43]].map(p=>new THREE.Vector2(...p)),24);
  for (const [i,x,y] of [[0,-2.6,-2.75],[1,-.65,-3.08],[2,1.18,-2.73],[3,2.8,-3.03]]) {
    const bottle = new THREE.Mesh(bottleGeo, glass); bottle.position.y=-.2; bottle.scale.setScalar(i===2?1.1:.85);
    relic(bottle,x,y,'漂流瓶','里面没有信，只有一粒昨天捡来的沙子。',i%2?.55:-.55);
  }
  const wheel = new THREE.Group();
  const rim = new THREE.Mesh(new THREE.TorusGeometry(.18,.025,10,40),rust); wheel.add(rim);
  for(let i=0;i<6;i++) { const bar=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.52,10),rust);bar.rotation.z=i*Math.PI/3;wheel.add(bar); }
  wheel.add(new THREE.Mesh(new THREE.SphereGeometry(.047,12,10),brass));
  relic(wheel,-1.85,-2.93,'旧船舵','派大星说，这是他的方向盘。虽然他没有船。',-.28);
  const anchor = new THREE.Group();
  for(const points of [[[0,.22,0],[0,-.2,0]], [[-.18,-.04,0],[-.13,-.17,0],[0,-.23,0],[.13,-.17,0],[.18,-.04,0]], [[-.1,.08,0],[.1,.08,0]]]) {
    anchor.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),24,.022,10,false),brass));
  }
  const loop=new THREE.Mesh(new THREE.TorusGeometry(.05,.018,8,24),brass);loop.position.y=.27;anchor.add(loop);
  relic(anchor,2.05,-2.8,'生锈的小锚','从沙里挖出来的小锚，被派大星当成了幸运挂件。',.36);
  for(const [x,y,color,symbol] of [[-.95,-2.6,'#d0b98c','★'],[.2,-3.02,'#678884','♫'],[2.95,-2.62,'#c9b47f','♡']]) {
    const [canvas,ctx]=makeCanvas(128,160);ctx.fillStyle=color;ctx.fillRect(0,0,128,160);
    ctx.strokeStyle='#68583e';ctx.lineWidth=9;ctx.strokeRect(8,8,112,144);
    ctx.fillStyle='#574736';ctx.textAlign='center';ctx.font='64px serif';ctx.fillText(symbol,64,103);
    for(let i=0;i<90;i++){ctx.fillStyle='rgba(78,52,25,.12)';ctx.fillRect((i*37)%128,(i*23)%160,3,3);}
    const picture=new THREE.Mesh(new THREE.BoxGeometry(.22,.28,.04),texMat(srgb(new THREE.CanvasTexture(canvas)),.94));
    relic(picture,x,y,'旧相框','这张画很值钱。至少派大星是这么认为的。',x*.13);
  }
  const sources = [
    ['treasure',-3.25,-2.7,.42,'宝箱碎片','亮闪闪的东西都值得收藏。'],
    ['barrel',-.05,-2.68,.3,'旧木桶','空的木桶，也可以装满快乐。'],
    ['chest',.65,-2.92,.42,'小箱子','派大星的小秘密：里面还是一个更小的箱子。'],
  ];
  const loaded = Promise.all(sources.map(async ([file,x,y,size,label,story]) => {
    const {scene} = await loader.loadAsync(`./assets/house-review/props/${file}.glb`);
    scene.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(scene),s=box.getSize(new THREE.Vector3()),c=box.getCenter(new THREE.Vector3());
    const wrapper=new THREE.Group();scene.position.sub(c);wrapper.add(scene);wrapper.scale.setScalar(size/Math.max(s.x,s.y,s.z));
    relic(wrapper,x,y,label,story,-.2);onChange?.();
  }));
  let selected=null,time=0;
  return {group,items,loaded,
    activate(item){ if(selected)selected.position.copy(selected.userData.home);selected=item;time=0;return item.userData.story; },
    update(dt){if(!selected)return;time+=dt;const k=time<.6?Math.sin(time/.6*Math.PI/2):time<2.4?1:Math.max(0,1-(time-2.4)/.6);selected.position.copy(selected.userData.home).add(new THREE.Vector3(0,k*.24,k*.23));if(time>=3)selected=null;},
    snapshot:()=>({count:items.length,selected:selected?.name??null}),
  };
}
