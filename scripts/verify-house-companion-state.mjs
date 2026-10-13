import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createCompanionState } from './house-companion-state.js';
const spec=JSON.parse(readFileSync(new URL('../src/data/house-companion.json',import.meta.url)));
const state=createCompanionState(spec);
for(const step of spec.schedule){const now=state.snapshot();assert.equal(now.room,step.room);assert.equal(now.action,step.action);state.tick(20);}
assert.equal(state.snapshot().day,0);
state.follow('bedroom');assert.equal(state.snapshot().action,'journal');state.tick(10);assert.equal(state.snapshot().action,'rest');state.tick(10);assert.equal(state.snapshot().action,'sleep');
const before=state.snapshot();state.tick(100,true);assert.deepEqual(state.snapshot(),before);
assert.equal(state.act('exec'),false);assert.equal(state.follow('unknown'),false);
state.act('sleep');const dayDuringChat=state.snapshot().day;state.tick(2,true,true);assert.equal(state.snapshot().day,dayDuringChat);assert(state.snapshot().commanded);
assert(state.act('bubble'));assert.equal(state.snapshot().room,'roof');state.follow('living');assert.equal(state.snapshot().room,'living');assert.equal(state.snapshot().commanded,false);
state.follow(null);assert.equal(state.snapshot().following,false);
console.log('companion schedule / follow / pause / whitelist / cancellation: PASS');
