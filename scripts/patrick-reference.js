// 参考图中的墙饰、生活痕迹和收藏。平面画作直接来自用户布局图，网格为独立场景修整。
import * as THREE from 'three';
import { mat, texMat, woodTex, goldMat, makeCanvas, srgb, rbox } from './patrick-build.js';

const loader = new THREE.TextureLoader();
export const artReady = [];
const maps = new Map();
function art(name) {
  if (maps.has(name)) return maps.get(name);
  const map = new THREE.Texture();
  artReady.push(loader.loadAsync(`assets/patrick-reference/art/${name}.png`).then(t => {
    map.image = t.image; map.colorSpace = THREE.SRGBColorSpace; map.needsUpdate = true;
  }));
  maps.set(name, map); return map;
}
function curve(points, radius, material) {
  const c = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(c, 32, radius, 8, false), material);
  mesh.castShadow = true; return mesh;
}
function frame(name, w, h, position, rotation = 0, kind = 'wood') {
  const group = new THREE.Group();group.position.set(...position);group.rotation.y = rotation;
  const image = new THREE.Mesh(new THREE.PlaneGeometry(w, h), texMat(art(name), .95));
  image.position.z = .022;group.add(image);
  const material = kind === 'gold' ? goldMat() : texMat(woodTex(256, 'dark'), .88);
  for (const [width,height,x,y] of [[w+.08,.055,0,h/2],[w+.08,.055,0,-h/2],[.055,h,-w/2,0],[.055,h,w/2,0]]) {
    const rim = new THREE.Mesh(rbox(width,height,.075,.016), material);rim.position.set(x,y,0);group.add(rim);
  }
  return group;
}
function wallArtwork(name, w, h, cx, cy) {
  const nx=12,ny=16,positions=[],uv=[],indices=[];
  const zAt=(x,y)=>-Math.sqrt(Math.max(.1,4.3*4.3-x*x-y*y))+.09;
  for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++){
    const x=cx+(i/nx-.5)*w,y=cy+(j/ny-.5)*h;positions.push(x,y,zAt(x,y));uv.push(i/nx,j/ny);
  }
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;indices.push(a,b,c,b,d,c);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();
  const group=new THREE.Group();group.add(new THREE.Mesh(geo,texMat(art(name),.94,{side:THREE.DoubleSide})));
  const ink=mat(0x694938,.85);
  for(const [x0,y0,x1,y1]of[[cx-w/2,cy-h/2,cx+w/2,cy-h/2],[cx-w/2,cy+h/2,cx+w/2,cy+h/2],[cx-w/2,cy-h/2,cx-w/2,cy+h/2],[cx+w/2,cy-h/2,cx+w/2,cy+h/2]]){
    const points=[];for(let i=0;i<=12;i++){const x=x0+(x1-x0)*i/12,y=y0+(y1-y0)*i/12;points.push([x,y,zAt(x,y)+.008]);}group.add(curve(points,.009,ink));
  }return group;
}
function bottle(color, height = .3) {
  const profile = [[0,0],[.05,0],[.072,.025],[.072,height*.62],[.036,height*.76],[.026,height*.96],[.024,height]];
  const geo = new THREE.LatheGeometry(profile.map(([r,y])=>new THREE.Vector2(r,y)),20);
  const mesh = new THREE.Mesh(geo, mat(color,.6));mesh.castShadow=true;return mesh;
}
function bowl() {
  const profile = [[0,.02],[.16,.02],[.22,.08],[.23,.19],[.2,.2],[.18,.12],[0,.08]];
  const mesh=new THREE.Mesh(new THREE.LatheGeometry(profile.map(([r,y])=>new THREE.Vector2(r,y)),32),mat(0xb3c0b5,.85));mesh.castShadow=true;return mesh;
}
function patternedCloth(base, color) {
  const [c,g]=makeCanvas(256,256);g.fillStyle=base;g.fillRect(0,0,256,256);
  g.strokeStyle=color;g.lineWidth=1;
  for(let y=0;y<256;y+=7){g.globalAlpha=.12;g.beginPath();g.moveTo(0,y);g.lineTo(256,y+2);g.stroke();}
  return srgb(new THREE.CanvasTexture(c));
}
function tin(label, color) {
  const [c,g]=makeCanvas(256,128);g.fillStyle=color;g.fillRect(0,0,256,128);
  g.fillStyle='#e9dba7';g.fillRect(8,17,240,95);g.fillStyle='#73482c';g.font='bold 21px serif';g.textAlign='center';g.fillText(label,128,70);
  const group=new THREE.Group();const metal=mat(0x8b8e82,.46,{metalness:.35});
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.073,.073,.2,20),[texMat(srgb(new THREE.CanvasTexture(c)),.85),metal,metal]);body.position.y=.1;group.add(body);
  return group;
}
function mountedMirror() {
  const g=new THREE.Group();const glass=new THREE.Mesh(rbox(.4,.69,.025,.025),mat(0x69a5b2,.24,{metalness:.2}));g.add(glass);
  for(const [w,h,x,y] of [[.47,.05,0,.365],[.47,.05,0,-.365],[.05,.73,-.235,0],[.05,.73,.235,0]]){
    const rim=new THREE.Mesh(rbox(w,h,.065,.02),goldMat());rim.position.set(x,y,.015);g.add(rim);
  }
  const [c,ctx]=makeCanvas(128,256);ctx.fillStyle='#77aabd';ctx.fillRect(0,0,128,256);ctx.fillStyle='rgba(244,249,237,.35)';ctx.beginPath();ctx.moveTo(15,0);ctx.lineTo(65,0);ctx.lineTo(128,256);ctx.lineTo(100,256);ctx.fill();
  const sheen=new THREE.Mesh(new THREE.PlaneGeometry(.4,.69),texMat(srgb(new THREE.CanvasTexture(c)),.35));sheen.position.z=.025;g.add(sheen);return g;
}
function pedestalSink() {
  const g=new THREE.Group();const porcelain=mat(0xa6b9ba,.47);
  const stem=new THREE.Mesh(new THREE.LatheGeometry([[.16,0],[.14,.04],[.08,.13],[.065,.42],[.14,.54]].map(p=>new THREE.Vector2(...p)),32),porcelain);g.add(stem);
  const basin=new THREE.Mesh(new THREE.LatheGeometry([[.055,.53],[.18,.55],[.3,.67],[.32,.72],[.3,.75],[.25,.7],[.13,.64],[.07,.64]].map(p=>new THREE.Vector2(...p)),40),porcelain);g.add(basin);
  const metal=mat(0xa8b5b0,.35,{metalness:.4});g.add(curve([[0,.72,-.19],[0,.89,-.2],[0,.91,-.08],[0,.84,-.04]],.025,metal));
  for(const x of [-.13,.13]){const tap=new THREE.Mesh(new THREE.SphereGeometry(.035,12,8),metal);tap.position.set(x,.77,-.19);g.add(tap);}return g;
}
function speaker() {
  const g=new THREE.Group();const body=new THREE.Mesh(rbox(.36,.76,.28,.04),mat(0x687875,.74));body.position.y=.38;g.add(body);
  for(const [y,r]of[[.21,.105],[.5,.085],[.68,.035]]){
    const disc=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.018,24),mat(0x303934,.9));disc.rotation.x=Math.PI/2;disc.position.set(0,y,.148);g.add(disc);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.008,6,24),mat(0x95a09a,.7));rim.position.set(0,y,.163);g.add(rim);
  }return g;
}
function souvenir(kind, index) {
  const g=new THREE.Group(),brass=goldMat(),wood=texMat(woodTex(128,'dark'),.9);
  if(kind==='wheel'){
    g.add(new THREE.Mesh(new THREE.TorusGeometry(.19,.024,8,32),wood));
    for(let i=0;i<8;i++){const a=i*Math.PI/4;g.add(curve([[0,0,0],[Math.cos(a)*.25,Math.sin(a)*.25,0]],.018,wood));}
    g.add(new THREE.Mesh(new THREE.SphereGeometry(.045,12,8),brass));
  }else if(kind==='clock'){
    const [c,p]=makeCanvas(128,128);p.fillStyle='#decf9d';p.fillRect(0,0,128,128);p.strokeStyle='#514334';p.lineWidth=4;
    for(let i=0;i<12;i++){const a=i*Math.PI/6;p.beginPath();p.moveTo(64+Math.sin(a)*43,64+Math.cos(a)*43);p.lineTo(64+Math.sin(a)*49,64+Math.cos(a)*49);p.stroke();}
    p.lineWidth=6;p.beginPath();p.moveTo(64,64);p.lineTo(43,39);p.moveTo(64,64);p.lineTo(90,52);p.stroke();
    g.add(new THREE.Mesh(new THREE.CircleGeometry(.16,32),texMat(srgb(new THREE.CanvasTexture(c)),.9)));
    g.add(new THREE.Mesh(new THREE.TorusGeometry(.17,.024,8,32),brass));
  }else if(kind==='book'){
    const cover=mat([0x417c72,0xb67f37,0xa55f49][index%3],.94);
    for(const z of [-.025,.025]){const m=new THREE.Mesh(rbox(.20,.28,.012,.007),cover);m.position.z=z;g.add(m);}
    g.add(new THREE.Mesh(rbox(.18,.26,.043,.006),mat(0xcdbb94,.95)));
    for(const y of [-.05,.04]){const band=new THREE.Mesh(rbox(.11,.013,.012,.003),brass);band.position.set(0,y,.034);g.add(band);}
  }else{
    const head=new THREE.Mesh(new THREE.TorusGeometry(.058,.016,8,24),brass);head.position.y=.12;g.add(head);
    g.add(curve([[0,.06,0],[0,-.12,0],[.055,-.12,0],[.055,-.08,0]],.018,brass));
  }
  return g;
}
export function addReferenceDetails(groups) {
  const { kitchen, bedroom, gym, living }=groups;
  const mirror=mountedMirror();mirror.position.set(-3.05,1.7,-1.95);mirror.rotation.y=.64;kitchen.add(mirror);
  const sink=pedestalSink();sink.position.set(-2.7,0,-1.05);kitchen.add(sink);
  const toilet=new THREE.Group();const ceramic=mat(0x9cb5ba,.55);
  const reservoir=new THREE.Mesh(rbox(.3,.43,.17,.055),ceramic);reservoir.position.set(0,.46,-.16);toilet.add(reservoir);
  const basin=new THREE.Mesh(new THREE.LatheGeometry([[.1,0],[.14,.06],[.1,.23],[.2,.38],[.22,.48],[.19,.5],[.14,.4],[.05,.32]].map(p=>new THREE.Vector2(...p)),28),ceramic);basin.scale.z=1.2;toilet.add(basin);toilet.position.set(-3.12,0,-.1);kitchen.add(toilet);
  bedroom.add(wallArtwork('poster-band',.57,.82,1.30,1.98));
  bedroom.add(wallArtwork('poster-ocean',.55,.82,2.40,1.89));
  const sound=speaker();sound.position.set(3.10,0,-.18);bedroom.add(sound);
  const mat1=new THREE.Mesh(new THREE.PlaneGeometry(.68,.48),texMat(patternedCloth('#a77943','#e7cd79'),1));mat1.rotation.x=-Math.PI/2;mat1.position.set(.58,.008,.82);gym.add(mat1);
  const flipMaterial=mat(0x759c85,.85);for(const x of [0,.18]){const flip=new THREE.Mesh(rbox(.13,.025,.29,.05),flipMaterial);flip.position.set(.62+x,.025,.73);flip.rotation.y=-.5;gym.add(flip);gym.add(curve([[.59+x,.05,.7],[.63+x,.09,.8],[.7+x,.05,.68]],.012,mat(0xb26b51,.85)));}
  // 厨房顶部的盒与罐、柜台瓶子。
  for(const [label,color,x,z,y]of[['SEA','#a2593e',-.18,-2.5,1.66],['SALT','#3e787a',.06,-2.5,1.66],['KELP','#a17a3f',1.20,-2.73,.78]]){
    const can=tin(label,color);can.position.set(x-2.1,y,z);kitchen.add(can);
  }
  const cereal=new THREE.Mesh(rbox(.28,.46,.22,.022),mat(0xa84244,.9));cereal.position.set(-2.28,1.93,-2.55);kitchen.add(cereal);
  living.add(frame('portrait-a',.3,.38,[-2.45,-1.2,-1.83],.64));living.add(frame('portrait-b',.36,.47,[2.16,-1.3,-2.18],-.66));
  const jar=bowl();jar.scale.setScalar(.95);jar.position.set(-.95,-2.3,-1.25);living.add(jar);
  const coral=curve([[1.45,-2.3,-1.15],[1.43,-1.95,-1.12],[1.7,-1.83,-1.02]],.05,mat(0x8b9b89,.9));living.add(coral);
  living.add(curve([[1.44,-2.08,-1.12],[1.18,-1.95,-1.1],[1.18,-1.79,-1.06]],.042,mat(0x8b9b89,.9)));
  const oldShell=bowl();oldShell.scale.set(.55,.8,.65);oldShell.position.set(.92,-2.3,-1.35);living.add(oldShell);
  // 收藏独立存在地下断面；不是把整张参考贴成假三维场景。
  const collection=new THREE.Group();collection.name='reference-collection';collection.userData.roomId='living';collection.position.y=-2.72;
  const kinds=['wheel','book','key','clock','bottle','book','key','bowl','book','clock','bottle','wheel'];
  for(let i=0;i<kinds.length;i++){
    const angle=(-.72+i*.13);const x=Math.sin(angle)*4.11,z=Math.cos(angle)*4.11;
    const kind=kinds[i],thing=kind==='bottle'?bottle(0x438890,.3):kind==='bowl'?bowl():souvenir(kind,i);
    thing.scale.setScalar(kind==='wheel'?.8:1);thing.position.set(x,(i%2)*-.25+.08,z);thing.rotation.y=angle;thing.rotation.z=(i%2?-.25:.16);
    if(kind==='bottle'||kind==='bowl')thing.rotation.x=Math.PI/2;
    collection.add(thing);
  }
  for(const [x,z,r]of[[-1.9,3.72,-.48],[.9,4.03,.22]]){const card=frame('portrait-c',.20,.28,[x,-.02,z],r);collection.add(card);}
  living.add(collection);
  return { collection, kitchenSink:sink };
}
