import tracks from '../src/data/house-music.json';

const panel=document.createElement('section');
panel.className='house-music';panel.hidden=true;panel.setAttribute('aria-label','个人网页背景音乐');
panel.innerHTML=`<header><h2>♫ 我的音乐</h2><button type="button" data-music-fold aria-expanded="true">收起</button><button type="button" data-music-close aria-label="关闭音乐并暂停播放">×</button></header>
  <p class="music-mini-title" hidden></p>
  <div class="music-tracks" aria-label="选择音乐"></div>
  <p class="music-status" role="status" aria-live="polite"></p>
  <div class="music-controls"><button type="button" data-music-play>播放</button><button type="button" data-music-next>下一首 →</button></div>
  <label class="music-position"><span data-music-time>0:00 / 0:00</span><input type="range" data-music-seek min="0" max="100" value="0" step="0.1" aria-label="播放进度" disabled></label>
  <label class="music-volume">音量 <input type="range" min="0" max="1" step="0.05" value="0.4" aria-label="音乐音量"></label>
  <footer><a target="_blank" rel="noopener noreferrer" data-music-source>网易云音乐 ↗</a><button type="button" data-music-retry hidden>重试</button></footer>`;
document.body.append(panel);
const audio=new Audio();audio.preload='none';audio.volume=.4;audio.dataset.houseAudio='';document.body.append(audio);
const status=panel.querySelector('.music-status'),play=panel.querySelector('[data-music-play]'),seek=panel.querySelector('[data-music-seek]'),retry=panel.querySelector('[data-music-retry]');
let index=0,opener=null,request=0;
const buttons=tracks.map((track,i)=>{
  const b=document.createElement('button');b.type='button';b.innerHTML=`<strong>${track.title}</strong><small>${track.credit}</small>`;
  b.dataset.musicTrack=track.id;b.addEventListener('click',()=>select(i,true));panel.querySelector('.music-tracks').append(b);return b;
});
const clock=n=>Number.isFinite(n)?`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`:'0:00';
function update(){
  play.textContent=audio.paused?'播放':'暂停';play.setAttribute('aria-label',`${audio.paused?'播放':'暂停'}${tracks[index].title}`);
  panel.querySelector('.music-mini-title').textContent=tracks[index].title;
  const valid=Number.isFinite(audio.duration)&&audio.duration>0;seek.disabled=!valid;seek.value=valid?audio.currentTime/audio.duration*100:0;
  panel.querySelector('[data-music-time]').textContent=`${clock(audio.currentTime)} / ${clock(audio.duration)}`;
  panel.dataset.musicState=audio.error?'error':audio.paused?'paused':'playing';
}
function failed(){status.textContent='这首曲子暂时无法播放，请重试或在网易云打开。';retry.hidden=false;update();}
async function start(){
  const token=++request;retry.hidden=true;status.textContent='正在载入音乐…';
  try{await audio.play();if(token===request){status.textContent=tracks[index].recording;update();}}
  catch(error){if(token!==request||error.name==='AbortError')return;failed();}
}
function select(i,autoplay=false){
  ++request;audio.pause();index=(i+tracks.length)%tracks.length;audio.src=tracks[index].url;
  buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===index)));
  panel.querySelector('[data-music-source]').href=tracks[index].page;status.textContent=tracks[index].recording;retry.hidden=true;update();
  if(autoplay)start();
}
function close(){++request;audio.pause();panel.hidden=true;if(opener?.getClientRects().length)opener.focus({preventScroll:true});else document.querySelector('[data-house-back]')?.focus({preventScroll:true});}
function fold(collapsed){panel.classList.toggle('is-collapsed',collapsed);const button=panel.querySelector('[data-music-fold]');button.textContent=collapsed?'展开':'收起';button.setAttribute('aria-expanded',String(!collapsed));panel.querySelector('.music-mini-title').hidden=!collapsed;}
window.addEventListener('house:music',()=>{opener=document.activeElement;panel.hidden=false;fold(false);play.focus({preventScroll:true});});
panel.querySelector('[data-music-fold]').addEventListener('click',()=>fold(!panel.classList.contains('is-collapsed')));
panel.querySelector('[data-music-close]').addEventListener('click',close);
play.addEventListener('click',()=>{if(audio.paused)start();else{++request;audio.pause();}});
panel.querySelector('[data-music-next]').addEventListener('click',()=>select(index+1,true));
retry.addEventListener('click',()=>{select(index);start();});
seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number(seek.value)/100*audio.duration;});
panel.querySelector('.music-volume input').addEventListener('input',e=>audio.volume=Number(e.target.value));
audio.addEventListener('error',failed);audio.addEventListener('ended',()=>select(index+1,true));
for(const event of ['timeupdate','durationchange','play','pause'])audio.addEventListener(event,update);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden&&!document.querySelector('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();close();}},true);
select(0);
