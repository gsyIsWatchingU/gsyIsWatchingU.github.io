import * as THREE from 'three';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {loadGeometry} from './geometry-test-utils.mjs';
import {createCatForepawSupport,catForepawHeight} from './cat-rest-contact.js';
const root='docs/cat-eight-poses-review',runtime=JSON.parse(readFileSync(root+'/runtime.json')),asset=await loadGeometry(runtime.output),model=asset.scene,body=model.getObjectByName('siamese_cat'),head=model.getObjectByName('siamese_cat_head'),mixer=new THREE.AnimationMixer(model),forepaws=createCatForepawSupport(body),records=[];
function indices(mesh,predicate){const a=mesh.geometry.attributes.position;return Array.from({length:a.count},(_,i)=>i).filter(i=>predicate(new THREE.Vector3().fromBufferAttribute(a,i)));}
const belly=indices(body,p=>Math.abs(p.x)<.055&&p.y>.15&&p.y<.28&&p.z>-.025&&p.z<.15),flank=indices(body,p=>p.y>.22&&p.z>-.12&&p.z<.20),cheek=indices(head,p=>p.y>.39&&p.y<.54&&p.z>.35),chin=indices(head,p=>p.y>.32&&p.y<.45&&p.z>.34);
assert(belly.length>30&&flank.length>30&&cheek.length>30);
for(const pose of runtime.poses){mixer.stopAllAction();const clip=asset.animations.find(c=>c.name==='rest_'+pose.id),action=mixer.clipAction(clip).play();action.paused=true;action.time=clip.duration;mixer.update(0);model.updateMatrixWorld(true);body.skeleton.update();head.skeleton.update();const side=['side','belly'].includes(pose.id),surface=side?flank:belly;let bodyGap=Infinity,headGap=Infinity;const support=forepaws.sample();
 for(const i of surface)bodyGap=Math.min(bodyGap,body.getVertexPosition(i,new THREE.Vector3()).y-.003);
 for(const i of side?cheek:chin){const p=head.getVertexPosition(i,new THREE.Vector3()),paw=catForepawHeight(support,p);let height=.003;if(!side&&Number.isFinite(paw)&&paw<p.y+.01)height=Math.max(height,paw+.003);headGap=Math.min(headGap,p.y-height);}
 records.push({pose:pose.id,bodyContact:side?'侧腹或背部':'胸腹',bodyGap,headToSupportGap:headGap});
}
const failures=records.filter(r=>r.bodyGap<-.001||r.bodyGap>.035||r.headToSupportGap<-.008||r.headToSupportGap>.035),report={status:failures.length?'failed':'passed',runtimeSHA256:runtime.runtimeSHA256,scope:'终态实际胸腹/侧腹/背部接地；头部与地面或实际前爪的支撑距离，防止仅脚掌接地而身体悬空。',records,failures};
if(!process.argv.includes('--inspect'))writeFileSync(root+'/contacts.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!process.argv.includes('--inspect'))assert.equal(failures.length,0);
