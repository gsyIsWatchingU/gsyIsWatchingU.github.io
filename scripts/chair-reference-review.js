import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
const entries=new Map();
for(const host of document.querySelectorAll('[data-chair-view]')){
  const id=host.dataset.chairView,canvas=host.querySelector('canvas'),scene=new THREE.Scene();scene.background=new THREE.Color('#eeeede');
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  const camera=new THREE.PerspectiveCamera(35,1,.05,30);camera.position.set(.32,1.05,3.7);
  const controls=new OrbitControls(camera,canvas);controls.target.set(0,.81,0);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=1.4;controls.maxDistance=6;controls.maxPolarAngle=Math.PI*.53;
  scene.add(new THREE.HemisphereLight(0xfff6e2,0x7b8b72,1.8));const key=new THREE.DirectionalLight(0xffe6c2,2.4);key.position.set(-3,5,4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-2;key.shadow.camera.right=2;key.shadow.camera.top=3;key.shadow.camera.bottom=-2;key.shadow.normalBias=.012;scene.add(key);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.17}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  const entry={host,camera,controls,scene,renderer,status:'loading',triangles:0};entries.set(id,entry);
  new GLTFLoader().load(id==='before'?'../../assets/house-review/props/chair.glb':'./chair.glb',gltf=>{
    const model=gltf.scene,wrapper=new THREE.Group(),bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3()),scale=1.62/size.y;
    wrapper.add(model);wrapper.scale.setScalar(scale);wrapper.position.set(-center.x*scale,-bounds.min.y*scale,-center.z*scale);
    model.traverse(n=>{if(!n.isMesh)return;n.castShadow=true;n.receiveShadow=true;entry.triangles+=(n.geometry.index?.count??n.geometry.attributes.position.count)/3;});scene.add(wrapper);
    entry.status='ready';entry.rawDimensions=size.toArray();entry.model=wrapper;host.dataset.state='ready';host.querySelector('.state').textContent='';
  },undefined,()=>{entry.status='error';host.dataset.state='error';host.querySelector('.state').textContent='模型未能载入，请刷新重试';});
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};new ResizeObserver(resize).observe(host);resize();
}
document.querySelectorAll('[data-angle]').forEach(button=>button.addEventListener('click',()=>{const e=entries.get(button.dataset.view),angle=Number(button.dataset.angle),distance=3.7;e.camera.position.set(Math.sin(angle)*distance,1.05,Math.cos(angle)*distance);e.controls.update();}));
function frame(){requestAnimationFrame(frame);for(const e of entries.values()){e.controls.update();e.renderer.render(e.scene,e.camera);}}frame();
window.__chairReview=()=>[...entries].map(([id,e])=>({id,status:e.status,triangles:e.triangles,rawDimensions:e.rawDimensions,camera:e.camera.position.toArray()}));
