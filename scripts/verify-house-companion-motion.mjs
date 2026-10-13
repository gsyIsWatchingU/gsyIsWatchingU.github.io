import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {companionFace,companionRoute,companionSlide} from './house-companion-motion.js';
const spec=JSON.parse(readFileSync('src/data/house-companion.json','utf8'));
assert(spec.height<1&&spec.height>.7);
let closed=0,opened=0;const looks=new Set();
for(let i=0;i<=12000;i++){
  const time=i/100,face=companionFace(time,'wave');
  for(const value of Object.values(face))assert(Number.isFinite(value)&&value>=0&&value<=1);
  if(face.blink>.98)closed++;if(face.blink===0)opened++;
  looks.add(face.lookLeft>0?'left':'right');
  assert.equal(companionFace(time,'sleep').blink,1);
  assert(companionFace(time,'read').lookDown>.8);
}
assert(closed>30&&opened>10000&&looks.size===2,'两分钟内应有真实闭眼、睁眼和左右视线');
assert.deepEqual(companionRoute(spec.rooms.library,0).position,spec.rooms.library.entry);
assert.deepEqual(companionRoute(spec.rooms.library,1).position,spec.rooms.library.position);
for(let i=0;i<=100;i++){
  const p=companionRoute(spec.rooms.library,i/100).position;
  // 原穿模区域是 x=2.3..3.2、z=1.1..2.05 的滑梯出口。
  assert(!(p[0]<3.3&&p[2]<2.05),'走出滑梯后必须绕开出口再去读书');
  const slide=companionSlide(i/100);assert(slide.position.every(Number.isFinite));
  if(i>0)assert(slide.position[1]<=companionSlide((i-1)/100).position[1]);
}
assert.deepEqual(companionSlide(0).position,[2.25,7.65,-.4]);
assert(Math.abs(companionSlide(1).position[1]-3.2)<1e-8);
assert.equal(companionFace(1,'wave',false,'left').lookLeft,1);
assert.equal(companionFace(1,'wave',false,'right').lookRight,1);
console.log('通过：尺寸、两分钟眨眼与视线、睡眠闭眼、阅读视线、滑梯轨迹及出口避让');
