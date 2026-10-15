import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import config from '../src/data/pineapple-house.json';
import './house-music.js';

const canvas=document.querySelector('canvas'),stage=document.querySelector('.review-stage');
const status=document.querySelector('#load-status'),music=document.querySelector('#shell-music');
document.querySelector('[data-music-close]').textContent='×';
const scene=new THREE.Scene();scene.background=new THREE.Color(0xe4ebdf);
const camera=new THREE.PerspectiveCamera(35,1,.01,80);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.localClippingEnabled=true;
const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.enablePan=false;
controls.minDistance=.3;controls.maxDistance=15;controls.maxPolarAngle=Math.PI*.49;
scene.add(new THREE.HemisphereLight(0xffffed,0x738a7b,2));
const light=new THREE.DirectionalLight(0xfff4d6,3);light.position.set(-3,6,5);light.castShadow=true;
light.shadow.mapSize.set(2048,2048);Object.assign(light.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:20});
light.shadow.normalBias=.012;light.shadow.bias=-.0003;scene.add(light);
const fill=new THREE.DirectionalLight(0xd4e6ff,1.2);fill.position.set(4,3,-2);scene.add(fill);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(40,40),new THREE.MeshStandardMaterial({color:0xdfe6d9,roughness:1}));
floor.rotation.x=-Math.PI/2;floor.position.y=-.003;floor.receiveShadow=true;scene.add(floor);
const groups={sofa:new THREE.Group(),shell:new THREE.Group(),room:new THREE.Group()};
Object.values(groups).forEach(group=>scene.add(group));
const loader=new GLTFLoader(),models=new Map(),materials=new Set();let active='sofa',ready=false,wireframe=false,down=null;
const assetBase='../../assets/';
function prepare(model){model.traverse(node=>{if(!node.isMesh)return;node.castShadow=true;node.receiveShadow=true;for(const m of Array.isArray(node.material)?node.material:[node.material]){materials.add(m);m.roughness=Math.max(m.roughness??.7,.52);m.metalness=Math.min(m.metalness??0,.08);}});return model;}
async function load(id,url){const gltf=await loader.loadAsync(url+'?v=20261015-living-v1');const model=prepare(gltf.scene);models.set(id,model);return model;}
function fit(model,width){const box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3());model.scale.multiplyScalar(width/size.x);const scaled=new THREE.Box3().setFromObject(model),center=scaled.getCenter(new THREE.Vector3());model.position.set(-center.x,-scaled.min.y,-center.z);const wrapper=new THREE.Group();wrapper.add(model);return wrapper;}
function setCamera(view='diagonal'){
  if(!ready)return;
  const box=new THREE.Box3().setFromObject(groups[active]),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
  // 客厅用与正式页相同的前方近景；单件按当前视口适配尺寸。
  const target=active==='room'?new THREE.Vector3(0,.83,-.1):center;
  const halfFov=THREE.MathUtils.degToRad(camera.fov/2),fitAngle=Math.min(halfFov,Math.atan(Math.tan(halfFov)*camera.aspect));
  const distance=active==='room'?3.7/(2*Math.tan(halfFov))*1.4:size.length()/2/Math.sin(fitAngle)*1.12;
  const directions={front:[0,.19,1],side:[1,.24,.04],rear:[0,.24,-1],diagonal:[.55,.35,1]};
  const direction=new THREE.Vector3(...directions[view]).normalize();
  if(active==='room' && view==='diagonal')direction.set(.12,.19,1).normalize();
  controls.target.copy(target);camera.position.copy(target).addScaledVector(direction,distance);
  controls.minDistance=active==='room'?2:.25;controls.maxDistance=distance*2.5;controls.update();
}
function show(id){active=id;for(const [key,group] of Object.entries(groups))group.visible=key===id;
  document.querySelectorAll('[data-asset]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.asset===id)));
  const shell=id==='shell';document.querySelector('#object-title').textContent=id==='room'?'客厅摆放':shell?'紫色贝壳':'绿管沙发';
  document.querySelector('#object-description').textContent=id==='room'?'使用原客厅的红扶手椅、圆桌与墙地面，对照沙发和贝壳的摆放比例。':shell?'侧卧的紫色螺旋贝壳，保留螺旋尖端、壳口和浅色外缘。':'三根绿色横管、两道红棕绑带、顶部绳圈与一整块蓝色软垫。';
  const ref=document.querySelector('#user-reference'),modelRef=document.querySelector('#model-reference');
  ref.src=`sources/user-${shell||id==='room'?'shell':'sofa'}.png`;ref.alt=shell?'用户提供的紫色贝壳参考':'用户提供的客厅沙发参考';
  modelRef.src=`sources/${shell?'shell':'sofa-clean'}.png`;modelRef.alt=shell?'整理后的单件贝壳参考':'整理后的单件沙发参考';
  music.hidden=id==='sofa';floor.visible=id!=='room';setCamera();
}
document.querySelectorAll('[data-asset]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.asset)));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>setCamera(button.dataset.view)));
document.querySelector('#rotate').addEventListener('click',e=>{controls.autoRotate=!controls.autoRotate;e.currentTarget.setAttribute('aria-pressed',String(controls.autoRotate));});
document.querySelector('#wireframe').addEventListener('click',e=>{wireframe=!wireframe;materials.forEach(m=>m.wireframe=wireframe);e.currentTarget.setAttribute('aria-pressed',String(wireframe));});
const play=()=>window.dispatchEvent(new CustomEvent('house:music'));
music.addEventListener('click',play);
canvas.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
canvas.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;down=null;if(!ready||active==='sofa')return;const rect=canvas.getBoundingClientRect(),pointer=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),ray=new THREE.Raycaster();ray.setFromCamera(pointer,camera);const hits=ray.intersectObject(groups[active],true);if(hits[0] && (active==='shell'||hits[0].object.userData.musicShell))play();});
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();setCamera();}
new ResizeObserver(resize).observe(stage);resize();
renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera);});
async function start(){
  const [sofa,shell,structure,chair,table]=await Promise.all([
    load('sofa',assetBase+'living-furniture-review/sofa.glb'),load('shell',assetBase+'living-furniture-review/shell.glb'),
    load('structure',assetBase+'house-review/structure.glb'),load('chair',assetBase+'house-review/props/chair.glb'),load('table',assetBase+'house-review/props/table-speaker-base.glb')]);
  const sofaModel=fit(sofa,1.76),shellModel=fit(shell,.58);groups.sofa.add(sofaModel);groups.shell.add(shellModel);
  shellModel.traverse(node=>{if(node.isMesh)node.userData.musicShell=true;});
  const contextSofa=sofaModel.clone(true),contextShell=shellModel.clone(true);contextSofa.position.set(1.1,0,-.35);contextSofa.rotation.y=-.18;
  contextShell.position.set(0,.7418,.05);contextShell.rotation.y=-.08;
  for(const [id,model] of [['chair',chair],['table',table]]){const spec=config.assets.find(item=>item.id===id);model.position.fromArray(spec.position);model.rotation.y=spec.rotation;}
  structure.traverse(node=>{if(!node.isMesh)return;let parent=node.parent;while(parent&&parent!==structure.parent){for(const key of ['roomId','occluder','roomViewOnly'])if(node.userData[key]===undefined&&parent.userData[key]!==undefined)node.userData[key]=parent.userData[key];parent=parent.parent;}
    node.visible=node.userData.roomId==='living';
    if(node.visible&&(node.userData.occluder||node.name==='living_L0_sand')){node.material=Array.isArray(node.material)?node.material.map(m=>m.clone()):node.material.clone();for(const m of Array.isArray(node.material)?node.material:[node.material]){m.clippingPlanes=[new THREE.Plane(new THREE.Vector3(1,0,0),2.55)];m.clipShadows=true;materials.add(m);}}
  });
  groups.room.add(structure,chair,table,contextSofa,contextShell);ready=true;document.body.dataset.reviewState='ready';status.textContent='模型已载入';show(active);
}
start().catch(error=>{document.body.dataset.reviewState='error';status.textContent='模型载入失败，请刷新重试';console.error(error);});
window.__livingReview={snapshot:()=>({ready,active,wireframe,camera:camera.position.toArray(),target:controls.target.toArray(),renderer:renderer.info.render,models:[...models.keys()],bounds:Object.fromEntries(Object.entries(groups).map(([id,group])=>{const b=new THREE.Box3().setFromObject(group);return[id,{min:b.min.toArray(),max:b.max.toArray()}];})),musicOpen:!document.querySelector('.house-music').hidden}),shellPoint:()=>{const shell=active==='room'?groups.room.children.at(-1):groups.shell;const center=new THREE.Box3().setFromObject(shell).getCenter(new THREE.Vector3()).project(camera),rect=canvas.getBoundingClientRect();return{x:rect.left+(center.x+1)*rect.width/2,y:rect.top+(1-center.y)*rect.height/2};}};
