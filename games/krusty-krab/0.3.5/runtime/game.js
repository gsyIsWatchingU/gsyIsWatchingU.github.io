(function(){
"use strict";
const { EVIDENCE, STORY_VIEWS, storyView, FILM_TITLES, FILM_TEXT, archiveIllustration, endingArt }=window.KrustyStory;
const { newState, restoreState, act, inventory, objective, chapter, storyStep, currentHints, ITEMS, SAVE_KEY, MUSIC_PHRASE, MUSIC_PHRASES }=window.KrustyState;
const { portrait, employeePhoto, itemIcon, memoryIllustration, musicFragment, KITCHEN_OBJECTS, DRAWER_CONTENTS, kitchenObject }=window.KrustyArt;
const { coverIllustration }=window.KrustyCover;
const { restroomView }=window.KrustyRestroom;

const NAMES={sponge:'海绵宝宝',patrick:'派大星',squid:'章鱼哥',employee:'员工 001'};
const ROOM_NAMES={lobby:'大厅',cashier:'收银台',office:'办公室',kitchen:'厨房',storage:'地下仓库'};
const FILM_ROOMS=['cashier','office','kitchen'];
const FILM_TIMES=['23:50','23:55','23:59'];
function createGame(hooks) {
  const $=id=>document.getElementById(id);
  let endingElapsed=0,endingStage=-1,echoElapsed=0,echoShown=false,settingsOpen=false,pickupTime=0,lakePickupTime=0,backupPickupTime=0,potPickupTime=0,kitchenDetail=null;
  let restroomElapsed=0,restroomShockAt=0,restroomShockEnd=0,restroomKnockAt=0,restroomKnocks=0,restroomWaterElapsed=0;
  let state=newState(),saved=null,selected=null,view=null,orderInput='',safeOrder=['sponge','sponge','sponge'],reverseOrder=[],task=null,subtitleTime=0,toastTime=0,saveWarning=false,active=false;
  try{const raw=localStorage.getItem(SAVE_KEY);if(raw){const stored=JSON.parse(raw);saved=restoreState(stored);if(!saved&&stored&&stored.version===1)state.muted=stored.muted===true;}}catch(e){saveWarning=true;}
  if(saved)state=saved;
  $('coverScene').innerHTML=coverIllustration();
  let coverStarted=false,coverElapsed=0,coverAnimation=null;
  const reducedCoverMotion=matchMedia('(prefers-reduced-motion: reduce)');
  function startCoverSound(){
    if(active||state.muted||coverStarted)return;
    coverStarted=hooks.onSound('cover')!==false;
    hud();
  }
  function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));$('saveStatus').textContent='';}catch(e){saveWarning=true;$('saveStatus').textContent='暂时无法保存。离开后需要重新开始。';}}
  function toast(text){if(!text)return;$('toast').textContent=text;$('toast').hidden=false;toastTime=4.5;}
  function subtitle(text,seconds=5){$('subtitle').textContent=text;$('subtitle').hidden=false;subtitleTime=seconds;hooks.onDialogue(seconds);}
  function placeMessages(inPanel){
    const target=$(inPanel?'inspectMessages':'ui');
    ['subtitle','toast'].forEach(id=>{if($(id).parentNode!==target)target.appendChild($(id));});
  }
  function hud(){
    const list=inventory(state);if(!list.includes(selected))selected=null;
    $('clock').textContent=state.flags.loopBroken?'00:01':'23:59';$('modeTag').textContent=ROOM_NAMES[state.room];
    $('btnSound').textContent=state.muted?'关闭':'开启';$('btnSound').setAttribute('aria-label',state.muted?'开启声音':'关闭声音');$('btnSound').setAttribute('aria-pressed',String(!state.muted));
    $('inventoryItems').innerHTML=Array.from({length:Math.max(6,list.length)},(_,i)=>{
      const id=list[i];
      if(!id)return '<div class="inventory-slot empty" aria-hidden="true"></div>';
      return `<button class="inventory-slot item${selected===id?' selected':''}" data-item="${id}" aria-label="${ITEMS[id].name}" aria-pressed="${selected===id}" title="${ITEMS[id].description}">${itemIcon(ITEMS[id].icon)}<span class="sr-only">${ITEMS[id].name}</span></button>`;
    }).join('');
    $('selectionLabel').textContent=selected?ITEMS[selected].name:' ';
    if(saveWarning)$('saveStatus').textContent='暂时无法保存。离开后需要重新开始。';
    $('btnEvidence').textContent='证据 '+state.evidence.length+'/5';
    hooks.onState(state);
  }
  function perform(action,data={}){
    const result=act(state,action,data);
    if(result.ok){state=result.state;save();hud();const cue={safe:'metal',takeIce:'metal',takePot:'metal',fillPot:'water',placePot:'metal',insertIce:'metal',insertCube:'metal',envelope:'paper'}[action];if(cue)hooks.onSound(cue);}
    else if(!['seen','room','mute','hint'].includes(action))hooks.onSound('ui_error');
    if(view)$('panelFeedback').textContent=result.message;else toast(result.message);
    return result;
  }
  function event(id,text,sound){if(state.seen.includes(id))return false;const r=perform('seen',{id});if(!r.ok)return false;if(text)subtitle(text);if(sound)hooks.onSound(sound);return true;}
  function clearTask(){task=null;restroomShockAt=restroomShockEnd=0;restroomKnocks=0;hooks.onSound('stopFilm');hooks.onSound('stopSpeech');}
  function close(){
    if(task&&task.type==='door')return;
    const previous=view;clearTask();view=null;placeMessages(false);$('inspect').hidden=true;$('veil').hidden=true;document.body.classList.remove('inspecting');hooks.onInspect(null);hooks.onPause(!active||state.flags.ended);$('closeInspect').blur();
    if(previous)hooks.onSound('ui_back');
    if(previous==='safe'&&state.flags.iceTaken)event('photo');
  }
  function button(label,action,extra='',className='puzzle-button'){return `<button class="${className}" data-action="${action}" ${extra}>${label}</button>`;}
  function receipt(){return `<div class="paper"><h3>最后一单</h3><small>桌号 04 / 23:59<br>领餐人：${state.flags.orderSolved?'新员工 002':'——'}</small>${state.flags.orderSolved?'<small>蟹堡 × 1 · 饮料 × 1<br>优惠券：− 0.50</small>':'<div class="receipt-line"><span>蟹堡</span><span>× 1</span></div><div class="receipt-line"><span>饮料</span><span>× 1</span></div><div class="receipt-line"><span>优惠券</span><span>− 0.50</span></div>'}<small>留餐：四号桌。</small>${state.flags.orderSolved?'<div class="stamp">已结清 · 4.50</div>':''}</div>`;}
  function method(){return `<div class="method"><div>${itemIcon('ice')}<span>冰封物</span></div><b>→</b><div>${itemIcon('pot')}<span>水浴</span></div><b>→</b><div><strong>♨</strong><br><span>小火</span></div></div>`;}
  function kitchenView(ids,drawer=false){
    const selected=ids.includes(kitchenDetail)?kitchenDetail:null;
    return `<div class="kitchen-closeup"><div class="kitchen-tray${drawer?' drawer-tray':''}">${ids.map(id=>button(kitchenObject(id)+`<span>${KITCHEN_OBJECTS[id].name}</span>`,'examineKitchen',`data-object="${id}" aria-pressed="${selected===id}"`,'kitchen-object')).join('')}</div><div class="kitchen-detail" aria-live="polite">${selected?`<div class="kitchen-detail-art">${kitchenObject(selected)}</div><h3>${KITCHEN_OBJECTS[selected].name}</h3><p>${KITCHEN_OBJECTS[selected].text}</p>`:`<p>${drawer?'抽屉底露了出来。':'托盘里剩下四样食材。'}<br>点一件，仔细看看。</p>`}${drawer?button('推回抽屉','shutDrawer',`data-drawer="${view}"`,'secondary wide'):''}</div></div>`;
  }
  function filmHtml(index){return `<div class="clue-layout"><div>${archiveIllustration(index)}</div><div><small>录像备份 · ${index+1} / 3 · ${FILM_TIMES[index]}</small><p>${FILM_TITLES[index]}</p><div class="memory-caption">${FILM_TEXT[index]}</div></div></div>`;}
  function renderView(){
    if(!view)return;
    const f=state.flags;let title='',body='';
    const story=STORY_VIEWS.includes(view)?storyView(view,state,button,employeePhoto):null;
    if(story){title=story.title;body=story.body;}else switch(view){
      case 'restroom':title='厕所';body=restroomView(state,button);break;
      case 'order':title='订单';body=receipt()+`<p class="small-text" style="margin-top:16px">纸还是热的。</p>`;break;
      case 'menu':title='夜班菜单';body='<div class="chalk-menu"><h3>GALLEY GRUB</h3><div class="receipt-line"><span>蟹堡</span><span>3.00</span></div><div class="receipt-line"><span>饮料</span><span>2.00</span></div><small>夜班优惠券：减免 0.50。</small></div>';break;
      case 'register':
        title='收银机';body=f.orderSolved?`${receipt()}<p style="margin-top:15px">钱箱里有一把黄铜钥匙。</p><div class="found-item">${itemIcon('officeKey')}<span>黄铜钥匙</span></div>`:`<div class="two-column"><div>${receipt()}</div><div><div class="register-top"><div class="display" id="registerInput">${orderInput||'0.00'}</div>${button('回退','backspace','','secondary')}${button('结算','submitOrder','', 'primary')}</div><div class="keypad">${['1','2','3','4','5','6','7','8','9','C','0','.'].map(key=>button(key,'digit',`data-value="${key}"`)).join('')}</div></div></div>`;break;
      case 'officeDoor':title='办公室门';body='<p>门开了。</p>';break;
      case 'safe':
        title='员工保险柜';
        if(!f.safeSolved)body=`<p>锁上的刻字：<strong>离店时间 · 从晚到早</strong></p><div class="safe-dials">${safeOrder.map((id,i)=>button(portrait(id)+`<span>${NAMES[id]}</span>`,'dial',`data-index="${i}"`)).join('')}</div>${button('转动锁扣','submitSafe','', 'primary wide')}`;
        else body=`<div class="object-art"><div class="ice-block"><div class="cube"></div></div></div><p>${f.iceTaken?'柜底还剩一张旧工牌。':'冰里有录像卡匣，还有一把钥匙。<br>工牌下面，压着一张简谱。'}</p><div class="identity-card${f.loopBroken?' recovered':''}"><small>旧员工姓名</small><strong>小海</strong><small>001</small></div>${!f.iceTaken&&!f.musicRestored?button('查看桌上的旧琴','openMusic','','primary wide'):''}`;break;
      case 'music': {
        title='办公室旧琴';const phrase=Math.min(2,Math.floor(state.playedNotes.length/7)),offset=phrase*7;
        body=!f.safeSolved?'<p>琴盖下压着一张纸。先查看保险柜里的工牌。</p>':f.musicRestored?`<div class="clue-layout"><div>${musicFragment()}</div><div class="music-message"><p>“嘘，别让老板拿走录像。<br>小海把备份藏起来了。<br>去琴盖里的屏幕找。”</p>${button('再听留言','replayMusic','','secondary wide')}</div></div>${button(f.crossoverSolved?'重看跨屏档案':'进入琴盖屏幕','openCrossover','','primary wide')}`:`<div class="performance"><div class="number-score"><small>1 = C · 慢慢弹，不限速度</small><h3>琴盖里的暗号 · 第 ${phrase+1} / 3 句</h3><div aria-label="第${phrase+1}句简谱">${MUSIC_PHRASES[phrase].map((n,i)=>`<span>${n}${i===4?'—':''}</span>`).join('')}</div><p>数字对应琴键，弹满七音自动翻页。</p></div><div class="played-notes" aria-live="polite">${Array.from({length:7},(_,i)=>`<span>${state.playedNotes[offset+i]||'·'}</span>`).join('')}</div><div class="piano-keys">${[1,2,3,4,5,6,7].map(n=>button(`<b>${n}</b><small>${['C','D','E','F','G','A','B'][n-1]}</small>`,'pianoNote',`data-note="${n}"`,'piano-key')).join('')}</div><div class="performance-actions">${button('试听三句','demoMusic','','secondary')}${button('回退','undoMusic',state.playedNotes.length?'':'disabled','secondary')}${button('重来','resetMusic',state.playedNotes.length?'':'disabled','secondary')}${button('核对简谱','restoreMusic',state.playedNotes.length===MUSIC_PHRASE.length?'':'disabled','primary')}</div></div>`;break;
      }
      case 'fridge':title='冰柜';if(!f.iceTaken){body='<p>门缝结着灰色的霜。</p>'+button('拉一拉把手','touchFridge','','secondary wide');break;}body=`<div class="enamel-panel"><h3>解冻操作牌</h3>${method()}<p>锅中装水，使用小火。</p><small>保留冰内物件。</small></div>`;break;
      case 'pot':title='备餐台上的锅';body=f.iceTaken?`<div class="object-art">${itemIcon('pot')}</div><p>锅是空的，正收入背包……</p>`:`<p>锅沿留着一圈干掉的油。</p>${button('碰一下锅沿','touchPot','','secondary wide')}`;break;
      case 'ingredients':title='旧食材';body=kitchenView(['bun','patty','tomato','lettuce']);break;
      case 'drawer0':case 'drawer1':case 'drawer2':title=['餐具抽屉','调料抽屉','擦布抽屉'][Number(view.slice(-1))];body=kitchenView(DRAWER_CONTENTS[Number(view.slice(-1))],true);break;
      case 'faucet':title='水龙头';body='<div class="object-art">'+itemIcon('tap')+'</div>'+button('拧动龙头','tapWater','','secondary wide');break;
      case 'sink':title='水槽';body=`<div class="object-art">${itemIcon(f.iceTaken&&f.potTaken?'pot':'tap')}</div><p>${f.potFilled?'锅里有水了。':'盆底留着黑色的水痕。'}</p>${button('拧动龙头','tapWater','','secondary wide')}${f.iceTaken&&f.potTaken&&!f.potFilled?button('装水','fillPot','','primary wide'):''}`;break;
      case 'stove':
        title='炉台';
        if(!f.iceTaken&&!f.thawed)body='<p>铁板上结着旧油。</p>'+button('转动旋钮','touchStove','','secondary wide');
        else if(f.thawed)body=`<div class="object-art">${itemIcon('cube')}${itemIcon('warehouseKey')}</div><p>冰融了。<br>录像卡匣和仓库钥匙。</p><p class="small-text">钥匙标签：地板下。</p>`;
        else if(!f.potOnStove)body=`${method()}<p>${f.iceInPot?'水浴锅已经准备好了。选中它，再放到炉台。':'操作牌上画着：水，小火。'}</p>${button('放上水浴锅','placePot','', 'primary wide')}`;
        else body=`<div class="water-reflection">${portrait('employee')}<p>水里映着一张工牌。<br>001。</p></div><p id="heatStatus">${task&&task.type==='heat'?'冰正在融化。':'锅放好了。'}</p><div class="heat-buttons">${['off','low','high'].map((heat,i)=>button(['关火','小火','大火'][i],'heat',`data-heat="${heat}" ${task?'disabled':''}`)).join('')}</div>`;break;
      case 'hatch':title='地板舱口';body='<p>下面有光。</p>';break;
      case 'return':title='返回厨房';body=`<p>上面是厨房的光。</p>${button('返回厨房','ascend','', 'primary wide')}`;break;
      case 'projector':
        title='小海的录像备份';
        if(f.loopBroken)body='<div class="film-frame"><p>门禁已解除</p><small>员工 001 / 小海</small></div><p>小海的事故录像还在。<br>把它存进手机，带证据离开。</p>'+(state.evidence.includes('incident')?'<p class="evidence-saved">事故录像已保存</p>':button('拍下事故录像','collectEvidence','data-evidence="incident"','primary wide'))+button('返回厨房','ascend','','secondary wide');
        else if(!f.cubeInserted)body=`<div class="object-art">${itemIcon('cube')}</div><div class="machine-plate"><small>001 · 档案与门禁控制</small><p>记录：收银台 → 办公室 → 厨房<br>解除门禁：倒序读取</p></div><p>标签写着：小海 / 原始录像。</p>${button('放入录像卡匣','insertCube','', 'primary wide')}`;
        else {
          const playing=task&&task.type==='film';
          body=`<p class="film-step">${playing?'事故录像':'门禁记录'}</p><div class="film-frame${playing?'':' film-ready'}" id="filmFrame">${playing?filmHtml(task.frame):'<p>◀ 倒序读取门禁</p><small>倒序</small>'}</div>`;
          if(playing)body+=button(task.frame===2?'看完录像':'下一段录像','nextMemory','','primary wide');
          else {
            const capture=state.evidence.includes('incident')?'<p class="evidence-saved">已拍下事故录像</p>':button('拍下事故录像','collectEvidence','data-evidence="incident"','primary wide');
            body=`<div class="clue-layout"><div><div class="film-record"><p class="small-text">记录</p><ol>${FILM_ROOMS.map((id,i)=>`<li><small>${FILM_TIMES[i]}</small><span>${ROOM_NAMES[id]}</span></li>`).join('')}</ol></div><p class="film-instruction">刻字：<strong>倒序读取门禁。</strong></p><div class="film-actions">${capture}${button('重看录像','playFilm','','secondary wide')}</div></div><div><div class="film-buttons">${FILM_ROOMS.map(id=>button(itemIcon(id)+ROOM_NAMES[id],'filmKey',`data-room="${id}" ${!f.filmSeen||reverseOrder.includes(id)?'disabled':''}`)).join('')}</div><div class="film-sequence" id="filmSequence" aria-live="polite">${[0,1,2].map(i=>`<span class="film-slot${i===reverseOrder.length?' next':''}"><small>${i+1}</small>${reverseOrder[i]?ROOM_NAMES[reverseOrder[i]]:'待选择'}</span>`).join('')}</div><div class="film-edit">${button('撤销','undoFilm',!reverseOrder.length?'disabled':'')}${button('清空','clearFilm',!reverseOrder.length?'disabled':'')}</div></div></div>`;
          }
        }
        break;
      case 'hints': {
        const i=storyStep(state)-1,count=state.hints[i];title='线索 / '+(f.orderSolved&&!f.officeUnlocked?'办公室门':['装作新员工','童年好友','跨屏取证','冰里的录像','最后一班','带证据逃出'][i]);body='<div class="hint-steps">'+currentHints(state).slice(0,count).map((text,n)=>'<p>'+String(n+1).padStart(2,'0')+'　'+text+'</p>').join('')+'</div>'+button(count<3?'再给一点提示':'已显示全部提示','nextHint',count>=3?'disabled':'','secondary wide');break;
      }
      case 'pause':title='夜班暂停';body='<p>拖动左下角摇杆移动，滑动屏幕环顾。</p><p style="margin-top:12px">点击背包道具选中，再点击近景中的使用位置。</p><p>厕所在大厅后墙右端，办公室门右侧。</p><div class="paused-actions">'+button('继续','close','','primary')+button('重新开始','confirmRestart')+'</div>';break;
      case 'restart':title='重新开始';body='<p>这会清除本关的进度和随身物件。</p><div class="paused-actions">'+button('重新开始这一班','restart','','primary')+button('返回','pause')+'</div>';break;
      default:return;
    }
    $('inspectTitle').textContent=title;$('inspectKicker').textContent=view==='restroom'?'大厅右侧 · 厕所':['pause','hints','restart'].includes(view)?'THE LAST ORDER':ROOM_NAMES[state.room];$('inspectBody').innerHTML=body;$('panelFeedback').textContent='';
    const confirmDoor=(view==='officeDoor'&&f.officeUnlocked)||(view==='hatch'&&f.hatchUnlocked);$('closeInspect').textContent=confirmDoor?'确认':'返回';$('closeInspect').setAttribute('aria-label',confirmDoor?'确认':'返回');
    $('inspect').setAttribute('data-view',view);
    $('inspect').classList.toggle('film-playing',!!task&&task.type==='film');
    arrangeClue();
  }
  function arrangeClue(){
    const node=$('inspectBody'),first=node.firstElementChild;
    if(!first||first.classList.contains('two-column')||first.classList.contains('clue-layout'))return;
    if(view==='safe'&&!state.flags.safeSolved)return;
    const visual=first.matches('.paper,.memory-art,.photo-frame,.object-art,.method,.water-reflection,.film-frame,.recipe-board,.enamel-panel,.machine-plate');
    if(!visual||!first.nextElementSibling)return;
    const layout=document.createElement('div'),left=document.createElement('div'),right=document.createElement('div');
    layout.className='clue-layout';left.className='clue-visual';right.className='clue-content';
    left.appendChild(first);
    while(node.firstChild)right.appendChild(node.firstChild);
    if(view==='safe'){const badge=right.querySelector('.identity-card');if(badge)left.appendChild(badge);}
    layout.appendChild(left);layout.appendChild(right);node.appendChild(layout);
  }
  function inspect(id){
    if(!active||state.flags.ended||(task&&task.type==='door'))return;
    if((id==='officeDoor'&&!state.flags.officeUnlocked)||(id==='hatch'&&!state.flags.hatchUnlocked)){useDoor(id);return;}
    if(['photo','safe','ledger','music'].includes(id)&&!state.flags.officeUnlocked){toast('办公室还锁着。');return;}
    if(['return','projector'].includes(id)&&!state.flags.hatchUnlocked){toast('仓库舱口还锁着。');return;}
    if(id==='pot'&&state.flags.potTaken)return;
    if(id==='pot'&&state.flags.iceTaken)potPickupTime=1.2;
    if(id==='crossover'&&!state.flags.musicRestored)return;
    if(id==='crossover'&&!state.flags.crossoverSolved&&state.cityPosition[0]===2&&state.cityPosition[1]===0)backupPickupTime=1.2;
    if(id==='crossover'&&state.flags.lakeDrawer&&!state.flags.lakeCube)lakePickupTime=1.2;
    if(id==='recipe'&&!state.flags.loopBroken){toast('厨房夹页还压在炉台下，先解除门禁。');return;}
    clearTask();kitchenDetail=null;$('toast').hidden=$('subtitle').hidden=true;toastTime=subtitleTime=0;hooks.onInspect(id);view=id;placeMessages(true);hooks.onPause(true);document.body.classList.add('inspecting');$('veil').hidden=false;$('inspect').hidden=false;$('panelFeedback').textContent='';renderView();$('closeInspect').focus();
    if(['pause','restart','hints'].includes(id))hooks.onSound('ui_click');
    if(['order','photo','ledger','envelope'].includes(id))hooks.onSound('paper');
    if(['note','fridge'].includes(id))hooks.onSound('metal');
    if(id==='envelope')hooks.onSound('crab_wages');
    if(id==='note')hooks.onSound('crab_hours');
    if(id==='music'&&state.flags.musicRestored)hooks.onSound('squid_message');
    if(id==='envelope')perform('envelope');
    if(id==='safe'&&state.flags.safeSolved)event('badge','小海……这好像是我的朋友。');
    if(id==='projector'&&!state.flags.loopBroken)event('broadcast',state.flags.cubeInserted?null:'广播：“员工 001，请结清最后一单。”','broadcast');
    if(id==='projector'&&state.flags.cubeInserted&&!state.flags.filmSeen)startFilm();
    if(id==='restroom'){
      restroomElapsed=restroomWaterElapsed=0;restroomKnockAt=.45;
      restroomKnocks=!state.flags.loopBroken&&!state.flags.restroomStallOpen?3:0;
      hooks.onSound('creak');
    }
  }
  function startFilm(){if(!state.flags.cubeInserted||state.flags.loopBroken)return;subtitleTime=0;$('subtitle').hidden=true;reverseOrder=[];task={type:'film',elapsed:0,frame:0};hooks.onSound('film_projector');hooks.onFilm(0);renderView();}
  function startNew(){
    $('menu').classList.remove('cover-playing');
    const muted=state.muted;
    clearTask();pickupTime=lakePickupTime=backupPickupTime=potPickupTime=0;selected=null;orderInput='';safeOrder=['sponge','sponge','sponge'];reverseOrder=[];state=newState();state.muted=muted;saved=null;active=true;view=null;document.body.classList.remove('at-menu');$('menu').hidden=$('ending').hidden=true;$('veil').hidden=true;document.body.classList.remove('inspecting');hooks.onInspect(null);hooks.onSound('reset');perform('start');hooks.onStart('lobby',state);inspect('intro');
    hooks.onSound('ui_confirm');
  }
  function continueGame(){if(!state.flags.crossoverSolved&&state.cityPosition[0]===2&&state.cityPosition[1]===0)backupPickupTime=1.2;if(state.flags.lakeDrawer&&!state.flags.lakeCube)lakePickupTime=1.2;if(state.flags.crossoverSolved&&!state.flags.iceTaken&&state.flags.safeSolved)pickupTime=.9;$('menu').classList.remove('cover-playing');document.body.classList.remove('at-menu');active=true;$('menu').hidden=true;$('veil').hidden=true;hooks.onStart(state.room,state);hud();hooks.onPause(false);hooks.onSound('ui_confirm');if(state.flags.ended)showEnding();}
  function showMenu(){const resume=saved&&saved.flags.started&&!saved.flags.ended;coverElapsed=0;coverAnimation=null;document.body.classList.add('at-menu');$('menu').hidden=false;$('veil').hidden=false;$('menuButtons').innerHTML=button('<span>开始</span><svg viewBox="0 0 30 20" aria-hidden="true"><path d="M2 10h23m-8-7 8 7-8 7"/></svg>',resume?'continue':'start','','primary cover-start');hud();$('menu').classList.remove('cover-playing');requestAnimationFrame(()=>{if(!$('menu').hidden){$('menu').classList.add('cover-playing');const wipe=$('coverWipe');coverAnimation=typeof wipe.getAnimations==='function'?wipe.getAnimations()[0]:null;}});}
  function showEnding(){
    close();active=false;endingElapsed=0;endingStage=-1;hooks.onExit();hooks.onPause(true);
    $('endingArt').innerHTML=endingArt();$('ending').hidden=false;$('veil').hidden=false;
    $('replay').hidden=true;$('endingSkip').hidden=false;updateEnding(0);
  }
  function updateEnding(dt){
    endingElapsed+=dt;const stage=endingElapsed<3?0:endingElapsed<8?1:endingElapsed<12?2:3;
    $('ending').dataset.stage=String(stage);
    const walker=$('filmWalker'),car=$('filmPolice');
    if(walker)walker.setAttribute('transform','translate('+(194+Math.min(1,endingElapsed/3)*240)+' 257)');
    if(car)car.setAttribute('transform','translate('+(1040-Math.max(0,Math.min(1,(endingElapsed-8)/4))*455)+' 270)');
    if(stage!==endingStage){endingStage=stage;
      $('endingCaption').textContent=['你跑到街上。手机里的五份证据都在。','你拨通电话：“蟹堡王锁着员工。我的朋友小海在这里连续加班后猝死。我有原始记录。”','电话那头：“请在安全处等候，民警正赶来核查。”雨里亮起警灯。','警车停在餐厅门前。你递出证据。小海的事，终于有人来查了。'][stage];
      if(stage===1)hooks.onSound('report_call');if(stage===2)hooks.onSound('report_siren');
      if(stage===3){$('replay').hidden=false;$('endingSkip').hidden=true;}
    }
  }
  function chooseItem(id){
    if(task&&task.type==='door')return;
    if(!inventory(state).includes(id))return;
    hooks.onSound('ui_select');
    if((selected==='ice'&&id==='waterPot')||(selected==='waterPot'&&id==='ice')){
      const r=perform('insertIce',{item:'ice'});if(r.ok){selected='icePot';hud();if(view)renderView();toast(r.message);}return;
    }
    selected=selected===id?null:id;hud();if(selected)toast(ITEMS[selected].description+(selected==='ice'?' 选中后点击装水的锅进行组合。':''));
  }
  function handle(action,buttonNode){
    if(task&&task.type==='door')return;
    if(action==='digit')hooks.onSound(buttonNode.dataset.value==='C'?'ui_clear':'ui_digit:'+buttonNode.dataset.value);
    else if(action==='dial')hooks.onSound('dial');
    else if(['nextMemory','musicPiece'].includes(action))hooks.onSound('ui_page');
    else if(!['pianoNote','demoMusic','start','restart','continue','close','pause','confirmRestart','openMusic','openEnvelope','nextHint'].includes(action))hooks.onSound('ui_click');
    let result;
    switch(action){
      case 'restroomWipe':case 'restroomTap':case 'restroomStall': {
        if(view!=='restroom')return;
        const again=state.flags.restroomWiped;
        result=perform(action);if(!result.ok)return;
        if(action==='restroomWipe'){
          hooks.onSound('paper');
          if(again&&!state.flags.loopBroken&&!state.seen.includes('restroomMirror')&&!restroomShockAt)restroomShockAt=restroomElapsed+1.15;
        }
        if(action==='restroomTap'){hooks.onSound(state.flags.restroomWater?'water':'metal');restroomWaterElapsed=0;}
        if(action==='restroomStall'){restroomKnocks=0;hooks.onSound('rattle');if(state.flags.restroomStallOpen)event('restroomStall');}
        renderView();$('panelFeedback').textContent=result.message;return;
      }
      case 'start':case 'restart':startNew();return;
      case 'continue':continueGame();return;
      case 'close':close();return;
      case 'pause':inspect('pause');return;
      case 'confirmRestart':inspect('restart');return;
      case 'digit': {const key=buttonNode.dataset.value;if(key==='C')orderInput='';else if(orderInput.length<7&&(key!=='.'||!orderInput.includes('.')))orderInput+=key;$('registerInput').textContent=orderInput||'0.00';return;}
      case 'backspace':orderInput=orderInput.slice(0,-1);hooks.onSound('ui_clear');$('registerInput').textContent=orderInput||'0.00';return;
      case 'submitOrder':result=perform('order',{value:orderInput});if(result.ok){renderView();hooks.onSound('ui_confirm');event('chair');hooks.onSound('cash_register');}return;
      case 'tapWater':hooks.onEnvironment('faucet');return;
      case 'toggleDrawer':hooks.onEnvironment(buttonNode.dataset.drawer);return;
      case 'shutDrawer':hooks.onEnvironment(buttonNode.dataset.drawer,'close');close();return;
      case 'examineKitchen':{
        const ids=view==='ingredients'?['bun','patty','tomato','lettuce']:/^drawer[0-2]$/.test(view)?DRAWER_CONTENTS[Number(view.slice(-1))]:[];
        if(ids.includes(buttonNode.dataset.object)){kitchenDetail=buttonNode.dataset.object;renderView();const focus=$('inspectBody').querySelector('[data-object="'+kitchenDetail+'"]');if(focus)focus.focus();}return;
      }
      case 'touchFood':case 'touchPot':case 'touchStove':case 'touchFridge':hooks.onSound('metal');return;
      case 'readMeal':result=perform('readMeal');if(result.ok)hooks.onSound('paper');break;
      case 'openMusic':inspect('music');return;
      case 'pianoNote':hooks.onSound('piano:'+buttonNode.dataset.note);result=perform('musicNote',{note:Number(buttonNode.dataset.note)});if(result.ok&&JSON.stringify(state.playedNotes)===JSON.stringify(MUSIC_PHRASE)){result=perform('restoreMusic');if(result.ok)hooks.onSound('completedMusic');}break;
      case 'demoMusic':hooks.onSound('pianoDemo');return;
      case 'undoMusic':case 'resetMusic':result=perform(action);hooks.onSound('ui_clear');break;
      case 'musicPiece':result=perform('musicPiece',{piece:Number(buttonNode.dataset.piece)});hooks.onSound('paper');break;
      case 'restoreMusic':result=perform('restoreMusic');if(result.ok)hooks.onSound('completedMusic');break;
      case 'replayMusic':if(state.flags.musicRestored)hooks.onSound('squid_message');return;
      case 'playRecording':if(['crab_wages','crab_hours'].includes(buttonNode.dataset.recording))hooks.onSound(buttonNode.dataset.recording);return;
      case 'openEvidence':inspect('evidence');return;
      case 'openCrossover':inspect('crossover');return;
      case 'lakeDrawer':result=perform(action);if(result.ok){lakePickupTime=1.2;hooks.onSound('metal');}break;
      case 'drive':result=perform('drive',{direction:buttonNode.dataset.direction});if(result.ok){if(state.cityPosition[0]===2&&state.cityPosition[1]===0)backupPickupTime=1.2;else backupPickupTime=0;hooks.onSound('ui_page');}break;
      case 'finishCrossover':result=perform('finishCrossover');if(result.ok){pickupTime=.9;hooks.onSound('warmth');}break;
      case 'collectEvidence':result=perform('collectEvidence',{id:buttonNode.dataset.evidence});if(result.ok)hooks.onSound('ui_confirm');break;
      case 'endingSkip':endingElapsed=12;updateEnding(0);hooks.onSound('stopReport');return;
      case 'dial': {const i=Number(buttonNode.dataset.index),options=['sponge','employee','squid'];safeOrder[i]=options[(options.indexOf(safeOrder[i])+1)%3];renderView();return;}
      case 'submitSafe':result=perform('safe',{order:safeOrder});break;
      
      case 'fillPot':result=perform('fillPot',{item:selected});break;
      case 'placePot':result=perform('placePot',{item:selected});break;
      case 'heat':
        if(task)return;
        if(buttonNode.dataset.heat==='off'){$('panelFeedback').textContent='炉火已关闭。';return;}
        if(buttonNode.dataset.heat!=='low'){perform('thaw',{heat:'high'});return;}
        if(!state.flags.potOnStove||state.flags.thawed)return;
        task={type:'heat',elapsed:0};hooks.onSound('heat');renderView();return;
      case 'descend':if(state.flags.hatchUnlocked){close();hooks.onSound('descent');perform('room',{room:'storage'});hooks.onTravel('storage');}return;
      case 'ascend':close();hooks.onSound('step');perform('room',{room:'kitchen'});hooks.onTravel('kitchen');return;
      case 'insertCube':result=perform('insertCube',{item:selected});if(result.ok)startFilm();return;
      case 'nextMemory':
        if(!task||task.type!=='film')return;
        if(task.frame<2){task.frame++;task.elapsed=0;hooks.onFilm(task.frame);renderView();}
        else{task=null;hooks.onSound('stopFilm');perform('filmSeen');renderView();}
        return;
      case 'playFilm':if(!task)startFilm();return;
      case 'undoFilm':case 'clearFilm':
        if(task||!state.flags.filmSeen||state.flags.loopBroken)return;
        if(action==='undoFilm')reverseOrder.pop();else reverseOrder=[];
        renderView();return;
      case 'filmKey':
        if(task||!state.flags.filmSeen||state.flags.loopBroken||!FILM_ROOMS.includes(buttonNode.dataset.room)||reverseOrder.includes(buttonNode.dataset.room))return;
        reverseOrder.push(buttonNode.dataset.room);
        if(reverseOrder.length===3){result=perform('reverse',{order:reverseOrder});reverseOrder=[];renderView();if(result.ok){event('release','控制记录读完了。电锁断开。');hooks.onSound('warmth');}else $('panelFeedback').textContent=result.message;}
        else {renderView();$('panelFeedback').textContent=`第 ${reverseOrder.length} 段：${ROOM_NAMES[reverseOrder[reverseOrder.length-1]]}。`;}return;
      case 'nextHint':perform('hint');hooks.onSound('ui_page');renderView();return;
      case 'exit':result=act(state,'exit');if(result.ok)startDoor('exit');else toast(result.message);return;
      default:return;
    }
    if(result&&result.ok){renderView();$('panelFeedback').textContent=['readMeal','restoreMusic','musicPiece'].includes(action)?'':result.message;}
  }
  function useDoor(id){
    const key=id==='officeDoor'?'officeKey':'warehouseKey',action=id==='officeDoor'?'office':'hatch';
    if(selected!==key){toast(selected?'这把钥匙不匹配。':'开门需要钥匙。');hooks.onSound('rattle');return;}
    const result=perform(action,{item:selected});if(!result.ok)return;
    view=id;hooks.onInspect(id);hooks.onPause(true);startDoor(id);
  }
  function startDoor(id){
    task={type:'door',elapsed:0,id};$('inspect').hidden=$('veil').hidden=true;
    placeMessages(false);document.body.classList.remove('inspecting');document.body.classList.add('door-opening');
    $('toast').hidden=$('subtitle').hidden=true;toastTime=subtitleTime=0;
    $('toast').textContent=$('subtitle').textContent='';$('closeInspect').blur();
    hooks.onDoor(id,3.6);
  }
  document.body.addEventListener('click',e=>{
    const toggle=e.target.closest('summary');if(toggle&&!toggle.closest('[hidden]'))hooks.onSound('ui_page');
    const item=e.target.closest('button[data-item]');if(item){chooseItem(item.dataset.item);return;}
    const command=e.target.closest('button[data-action]');if(command)handle(command.dataset.action,command);
  });
  document.addEventListener('pointerdown',startCoverSound);
  document.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')startCoverSound();});
  function settings(value){settingsOpen=value;$('settingsOverlay').hidden=!value;document.body.classList.toggle('settings-open',value);if(!value)startCoverSound();hooks.onSettings(value);if(value)$('btnSound').focus();else $('btnSettings').focus();}
  $('btnSettings').addEventListener('click',()=>{if(task&&task.type==='door')return;settings(true);hooks.onSound('ui_click');});
  $('closeSettings').addEventListener('click',()=>{settings(false);hooks.onSound('ui_back');});
  $('closeInspect').addEventListener('click',()=>{if(view==='hatch'&&state.flags.hatchUnlocked)handle('descend');else close();});$('replay').addEventListener('click',startNew);
  $('btnEvidence').addEventListener('click',()=>{if(active&&!(task&&task.type==='door'))inspect('evidence');});
  $('btnHelp').addEventListener('click',()=>inspect('pause'));
  $('btnHint').addEventListener('click',()=>{if(!active||(task&&task.type==='door'))return;perform('hint');inspect('hints');});
  $('btnSound').addEventListener('click',()=>{perform('mute');hooks.onSound(state.muted?'mute':'unmute');if(!state.muted){startCoverSound();hooks.onSettings(settingsOpen);hooks.onSound('ui_click');}});
  addEventListener('keydown',e=>{if(e.code==='Escape'){e.preventDefault();if(settingsOpen)settings(false);else if(view)close();else if(active&&!state.flags.ended)inspect('pause');}});
  function update(dt){
    if(settingsOpen)return;
    if(view==='restroom'&&active){
      restroomElapsed+=dt;
      const stage=$('restroomStage');
      if(!state.flags.loopBroken){
        if(restroomKnocks>0&&restroomElapsed>=restroomKnockAt&&!state.flags.restroomStallOpen){
          hooks.onSound('stallKnock');restroomKnocks--;restroomKnockAt=restroomElapsed+.34;
          if(stage){stage.classList.remove('knocking');void stage.offsetWidth;stage.classList.add('knocking');}
          const caption=$('restroomCaption');if(caption)caption.textContent='隔间里传来敲击。';
        }
        if(restroomShockAt&&restroomElapsed>=restroomShockAt){
          restroomShockAt=0;
          if(event('restroomMirror',null,'shock')){restroomShockEnd=restroomElapsed+.22;if(stage)stage.classList.add('startle');}
        }
      }
      if(restroomShockEnd&&restroomElapsed>=restroomShockEnd){restroomShockEnd=0;if(stage)stage.classList.remove('startle');}
      if(state.flags.restroomWater){restroomWaterElapsed+=dt;if(restroomWaterElapsed>=1.3){restroomWaterElapsed=0;hooks.onSound('water');}}
    }
    if(state.flags.ended&&!$('ending').hidden){updateEnding(dt);return;}
    if(active&&potPickupTime>0){potPickupTime-=dt;if(potPickupTime<=0){const r=perform('takePot');if(r.ok&&view==='pot'){close();toast(r.message);}}}
    if(active&&backupPickupTime>0){backupPickupTime-=dt;if(backupPickupTime<=0){const r=perform('finishCrossover');if(r.ok){pickupTime=.9;hooks.onSound('warmth');if(view)renderView();}}}
    if(active&&lakePickupTime>0){lakePickupTime-=dt;if(lakePickupTime<=0){perform('takeLakeCube');hooks.onSound('key');if(view)renderView();}}
    if(pickupTime>0){pickupTime-=dt;if(pickupTime<=0){perform('takeIce');if(view)renderView();}}
    if(view==='photo'&&state.flags.iceTaken&&!state.flags.loopBroken){
      echoElapsed+=dt;
      if(echoElapsed>1.15&&!echoShown&&!state.seen.includes('photoEcho')){
        echoShown=true;event('photoEcho',null,'shock');
        const frame=$('inspectBody').querySelector('.photo-frame');
        if(frame)frame.insertAdjacentHTML('beforeend','<svg class="photo-echo" viewBox="0 0 900 600" aria-hidden="true"><path fill="#32342a" stroke="#22261f" stroke-width="4" d="M548 598q17-182 114-201l-6-42q-35-37-36-124-3-100 82-113 89-2 89 101-2 88-31 124l-3 47q103 22 131 208z"/><path fill="#c0baa0" stroke="#292c24" stroke-width="3" d="M642 218q-4-73 60-78 69 5 67 74l-7 102q-12 50-61 56-50-8-59-58z"/><path fill="#171d19" d="M652 234q18-24 36 0l-4 41q-21 19-30-1zm64 0q20-24 35 0l-1 42q-18 15-28-3zM697 317l15-1-7 26z"/><path fill="none" stroke="#616250" stroke-width="2" d="m703 158-9 23 11 16-5 22m-25 66-9 16 8 16m62-44 11 11-3 15"/></svg>');
      }
      if(echoElapsed>1.38){const echo=$('inspectBody').querySelector('.photo-echo');if(echo)echo.remove();}
    }else{echoElapsed=0;echoShown=false;}
    if(!active&&!$('menu').hidden)coverElapsed+=dt;
    if(subtitleTime>0){subtitleTime-=dt;if(subtitleTime<=0)$('subtitle').hidden=true;}
    if(toastTime>0){toastTime-=dt;if(toastTime<=0)$('toast').hidden=true;}
    if(!task)return;task.elapsed+=dt;
    if(task.type==='door'&&task.elapsed>=3.6){
      const id=task.id;task=null;document.body.classList.remove('door-opening');
      if(id==='exit'){const r=perform('exit');if(r.ok)showEnding();}
      else{placeMessages(true);document.body.classList.add('inspecting');$('inspect').hidden=$('veil').hidden=false;renderView();$('closeInspect').focus();}
    }
    else if(task.type==='heat'&&task.elapsed>=3){task=null;const r=perform('thaw',{heat:'low'});renderView();if(r.ok)event('warning','冰里的录像还完好。','metal');}
    // 录像由玩家逐段推进，阅读、暂停或切到后台都不会跳过台词。
  }
  function visit(room){if(active&&room!==state.room&&['lobby','cashier','office','kitchen','storage'].includes(room)){const r=act(state,'room',{room});if(r.ok){state=r.state;save();hud();}}}
  return {showMenu,inspect,update,visit,toast,subtitle,event,coverTime:()=>reducedCoverMotion.matches?6:coverAnimation&&typeof coverAnimation.currentTime==='number'?coverAnimation.currentTime/1000:coverElapsed,read:()=>JSON.parse(JSON.stringify(state)),readRoom:()=>view==='restroom'?'restroom':state.room,progress:()=>chapter(state),isCalm:()=>state.flags.loopBroken,isPlaying:()=>active&&!view&&!settingsOpen&&!state.flags.ended,hasView:()=>!!view,currentView:()=>view,settingsOpen:()=>settingsOpen,getSelected:()=>selected};
}

window.KrustyGame={createGame};
})();