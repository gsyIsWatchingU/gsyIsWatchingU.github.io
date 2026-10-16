import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {createCatRepairRig} from '../cat-repair-v2-rig.js';

const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(1400,800);renderer.setPixelRatio(1);renderer.setScissorTest(true);document.body.append(renderer.domElement);
const cameras=[],scenes=[],rigs=[],surface=await(await fetch('../../../docs/cat-eight-poses-review/pillow-surface.json')).json();
for(const variant of ['neck-patch','neck-weighted']){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#ddd9ce');scene.add(new THREE.HemisphereLight(0xffffff,0x777166,2));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(-2,4,2);scene.add(light);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshStandardMaterial({color:'#d0c8b8'}));floor.rotation.x=-Math.PI/2;floor.position.y=-.002;scene.add(floor);
 const model=(await new GLTFLoader().loadAsync('../'+variant+'/anatomy-neutral.glb?neck-review=2')).scene;scene.add(model);model.traverse(n=>{if(n.isMesh){n.material=new THREE.MeshStandardMaterial({color:'#e8e6df',roughness:.9,side:THREE.DoubleSide});n.frustumCulled=false;}});rigs.push(createCatRepairRig(model,{pillowSurface:surface}));scenes.push(scene);cameras.push(new THREE.PerspectiveCamera(32,700/800,.01,20));
}
const views={diagonal:[-1.65,.88,1.75],opposite:[-2,.6,.08],front:[0,.65,2.2],rear:[-1.3,.75,-1.85],top:[0,2.8,.04],necklow:[-1,.16,1.25],neckside:[-1.7,.42,.35]};
window.__neck={ready:true,set(id,t=1,view='diagonal'){rigs.forEach((rig,i)=>{rig.pose(id,t);const c=cameras[i];c.position.fromArray(views[view]);c.lookAt(0,view.startsWith('neck')?.28:.20,view.startsWith('neck')?.30:.10);c.zoom=view.startsWith('neck')?1.15:1.22;c.updateProjectionMatrix();renderer.setViewport(i*700,0,700,800);renderer.setScissor(i*700,0,700,800);renderer.render(scenes[i],c);});return{id,t,view};}};
window.__neck.set('prone',1);
