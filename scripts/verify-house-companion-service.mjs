import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const base='https://gsy-gpu.tail660bdf.ts.net/house-api';
const origin='http://127.0.0.1:8769';
const health=await fetch(base+'/health',{headers:{Origin:origin}});assert.equal(health.status,200);assert.equal(health.headers.get('access-control-allow-origin'),origin);
const status=await health.json();assert.equal(status.ttsReady,false);
const sessionResponse=await fetch(base+'/session',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:'{}'});assert.equal(sessionResponse.status,200);const {session}=await sessionResponse.json();
let unconfigured=null;
if(!status.chatConfigured){const response=await fetch(base+'/chat',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({session,message:'你好',room:'living',activity:'listen'})});assert.equal(response.status,503);unconfigured=await response.json();}
const denied=await fetch(base+'/speech',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({session,turnId:'nonexistent-turn-id'})});assert.equal(denied.status,404);
const blocked=await fetch(base+'/health',{headers:{Origin:'https://example.invalid'}});assert.equal(blocked.headers.get('access-control-allow-origin'),null);
const report={status:'passed',url:base,health:status,cors:origin,unconfigured,unauthorizedSpeechStatus:denied.status,untrustedOriginAllowed:false,realDeepSeekReplyVerified:false};
writeFileSync('docs/house-companion-review/text-chat/service.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
