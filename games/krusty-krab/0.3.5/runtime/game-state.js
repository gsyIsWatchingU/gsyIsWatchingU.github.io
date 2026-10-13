(function(){
"use strict";
const { EVIDENCE }=window.KrustyStory;
// 关卡规则与存档独立于渲染；背包由事实状态派生，避免重复领物与物品丢失。
const SAVE_KEY = 'krusty-krab:escape:v2';
// 首句沿用现有短句，新增两句取证暗号；延音只按一次。
const MUSIC_PHRASES = [[1,5,1,5,1,1,5],[3,2,1,2,3,5,3],[2,3,5,3,2,1,1]];
const MUSIC_PHRASE = [].concat(...MUSIC_PHRASES);
const SEEN_EVENTS=['chair','photo','warning','release','ending','badge','broadcast','drawerKnock','photoEcho','restroomMirror','restroomStall'];
const FLAG_NAMES = ['started','orderSolved','mealRead','officeUnlocked','safeSolved','musicRestored','iceTaken','potTaken','potFilled','iceInPot','potOnStove','thawed','hatchUnlocked','cubeInserted','filmSeen','loopBroken','lakeDrawer','lakeCube','crossoverSolved','envelopeRead','ended','restroomWiped','restroomWater','restroomStallOpen','restroomFound'];
const ITEMS = {
  lakeCube:{name:'黑方块',icon:'cube',description:'从绣湖抽屉收入的黑方块，在雨夜街道化作车钥匙。'},
  officeKey:{name:'办公室钥匙',icon:'officeKey',description:'钱箱里的一把黄铜钥匙。'},
  ice:{name:'冰封物',icon:'ice',description:'录像卡匣与仓库钥匙藏在冰里，标签写着：别让老板找到。'},
  pot:{name:'空锅',icon:'pot',description:'可以装水，适合缓慢加热。'},
  waterPot:{name:'装水的锅',icon:'pot',description:'还可以放入需要水浴的东西。'},
  icePot:{name:'水浴锅',icon:'pot',description:'水与冰封物都在锅里。'},
  cube:{name:'录像卡匣',icon:'cube',description:'小海留下的事故录像，校验标记已从另一个游戏带回。'},
  warehouseKey:{name:'仓库钥匙',icon:'warehouseKey',description:'标签写着：厨房地板下。'},
};
function newState() {
  const flags={};FLAG_NAMES.forEach(k=>{flags[k]=false;});
  return {version:2,storyRevision:5,flags,room:'lobby',seen:[],hints:[0,0,0,0,0,0],musicOrder:[],playedNotes:[],evidence:[],cityPosition:[0,2],muted:false};
}
function inventory(s) {
  const f=s.flags, out=[];
  if(f.lakeCube&&!f.crossoverSolved)out.push('lakeCube');
  if(f.orderSolved&&!f.officeUnlocked)out.push('officeKey');
  if(f.iceTaken&&!f.iceInPot&&!f.thawed)out.push('ice');
  if(f.potTaken&&!f.potOnStove&&!f.thawed)out.push(f.iceInPot?'icePot':f.potFilled?'waterPot':'pot');
  if(f.thawed&&!f.cubeInserted)out.push('cube');
  if(f.thawed&&!f.hatchUnlocked)out.push('warehouseKey');
  return out;
}
function chapter(s) {
  const f=s.flags;
  return !f.orderSolved?0:!f.safeSolved?1:!f.thawed?2:3;
}
function storyStep(s){
  const f=s.flags;
  return !f.orderSolved?1:!f.safeSolved?2:!f.crossoverSolved?3:!f.thawed?4:!f.loopBroken?5:6;
}
function objective(s) {
  const f=s.flags;
  if(f.ended)return '已逃出餐厅';
  if(f.loopBroken)return s.evidence.length===5?'证据已存好。从大厅正门逃出去。':'电锁已松开。打开手机，补齐没拍下的证据。';
  if(f.filmSeen)return '倒序读取控制记录，解除门禁；把事故录像存入手机。';
  if(f.cubeInserted)return '看完小海最后一班的录像。';
  if(f.hatchUnlocked)return '地下放映机可以读取录像卡匣。';
  if(f.thawed)return '用冰里的钥匙打开厨房舱口。';
  if(f.musicRestored&&!f.crossoverSolved)return '琴盖里多了一块屏幕。小海把备份藏到了别的游戏里。';
  if(f.safeSolved&&!f.musicRestored)return '工牌下的简谱，是小海留下的暗号。';
  if(f.safeSolved)return '小火水浴，取出冰里的录像。';
  if(f.officeUnlocked)return '拍下办公室的文件，按离店时间打开保险柜。';
  if(f.orderSolved)return '先装作员工。用钥匙进办公室，找出口的线索。';
  return '门被锁住了。先结清订单，别引起注意。';
}
const HINTS = [
  ['先照值班牌上的要求结算订单；也可以拍下这块牌。','查看订单与菜单，把蟹堡、饮料和优惠算在一起。','3.00 + 2.00 − 0.50 = 4.50。结算后取钥匙，去办公室。'],
  ['合影里有你童年好友小海；账本可以分别拍工资与考勤。','保险柜按离店时间从晚到早排列，合影排位不是密码。','章鱼哥、海绵宝宝、员工 001。打开后弹工牌下的简谱。'],
  ['工牌下的简谱对应旧琴数字键，弹完一句会翻到下一句，弹错可回退。','三句简谱：1515115 / 3212353 / 2353211。正确弹完后会完整重播。','进入琴盖屏幕：绣湖房间拉开最后一格；雨夜街道开车向右、向上、向右、向上，到档案格取件。'],
  ['备份校验标记已带回，冰封物自动入包。去厨房拿锅。','选锅点水槽装水，再用背包把冰封物和装水的锅组合，放到炉台。','点击小火。录像卡匣与钥匙入包后，用钥匙打开舱口。'],
  ['进入地下仓库，把录像卡匣放进放映机，看完三个片段。','拍下事故录像。设备标牌写着倒序读取门禁记录。','依次点厨房、办公室、收银台；电锁会松开。'],
  ['打开手机证据册查看缺项，回到相应物件拍下证据。','需要：值班牌、工资表、打卡表、好友身份、事故录像，共五份。','补齐五份后到大厅正门逃出；随后播放举报与警车到场。'],
];
function currentHints(s){
  if(s.flags.musicRestored&&!s.flags.crossoverSolved)return HINTS[2];
  if(s.flags.orderSolved&&!s.flags.officeUnlocked)return ['钥匙在背包里。办公室在收银台后。','选中背包里的办公室钥匙，再点击办公室门。','进去后先查看合影与账本。'];
  return HINTS[storyStep(s)-1];
}
function restoreState(raw) {
  if(!raw||raw.version!==2||raw.storyRevision!==5||!raw.flags||typeof raw.flags!=='object')return null;
  const s=newState();for(const k of FLAG_NAMES)s.flags[k]=raw.flags[k]===true;
  const f=s.flags;if(!f.started)return null;
  const dependencies={officeUnlocked:['orderSolved'],safeSolved:['officeUnlocked'],musicRestored:['safeSolved'],lakeDrawer:['musicRestored'],lakeCube:['lakeDrawer'],crossoverSolved:['lakeCube'],iceTaken:['safeSolved','crossoverSolved'],potTaken:['iceTaken'],potFilled:['potTaken'],iceInPot:['iceTaken','potFilled'],potOnStove:['iceInPot'],thawed:['potOnStove'],hatchUnlocked:['thawed'],cubeInserted:['hatchUnlocked'],filmSeen:['cubeInserted'],loopBroken:['filmSeen'],envelopeRead:['officeUnlocked']};
  for(const [key,deps] of Object.entries(dependencies))if(!deps.every(k=>f[k]))f[key]=false;
  s.room=['lobby','cashier','kitchen','office','storage'].includes(raw.room)?raw.room:'lobby';
  if((s.room==='office'&&!f.officeUnlocked)||(s.room==='storage'&&!f.hatchUnlocked))s.room='lobby';
  s.seen=Array.isArray(raw.seen)?Array.from(new Set(raw.seen.filter(x=>SEEN_EVENTS.includes(x)))):[];
  s.hints=s.hints.map((_,i)=>Math.max(0,Math.min(3,Number(raw.hints&&raw.hints[i])||0)));
  if(Array.isArray(raw.playedNotes))s.playedNotes=raw.playedNotes.filter(n=>Number.isInteger(n)&&n>=1&&n<=7).slice(0,MUSIC_PHRASE.length);
  if(f.musicRestored){s.playedNotes=MUSIC_PHRASE.slice();s.musicOrder=[1,2,3];}
  else if(Array.isArray(raw.musicOrder))for(let i=0;i<3&&raw.musicOrder[i]===i+1;i++)s.musicOrder.push(i+1);
  if(f.lakeCube&&Array.isArray(raw.cityPosition)&&raw.cityPosition.length===2&&raw.cityPosition.every(Number.isInteger)){
    const [x,y]=raw.cityPosition;if(x>=0&&x<4&&y>=0&&y<3&&![[0,1],[2,2],[3,1]].some(p=>p[0]===x&&p[1]===y))s.cityPosition=[x,y];
  }
  s.evidence=Array.isArray(raw.evidence)?Array.from(new Set(raw.evidence.filter(id=>Object.prototype.hasOwnProperty.call(EVIDENCE,id)&&(id==='management'||(id==='incident'?f.filmSeen:f.officeUnlocked))))):[];
  if(!f.loopBroken||s.evidence.length!==5)f.ended=false;
  s.muted=raw.muted===true;return s;
}
function act(current, action, data={}) {
  const s=JSON.parse(JSON.stringify(current)),f=s.flags;
  const fail=message=>({ok:false,state:current,message});
  const success=message=>({ok:true,state:s,message});
  if(action==='start'){f.started=true;return success('先装作新员工，偷偷寻找出口。');}
  if(action==='mute'){s.muted=!s.muted;return success(s.muted?'声音已关闭。':'声音已开启。');}
  if(!f.started||f.ended)return fail('这一班已经结束。');
  switch(action) {
    case 'restroomWipe':
      f.restroomWiped=true;return success(f.loopBroken?'镜里，小海终于抬起了头。':'镜里的那个人，没有脸。');
    case 'restroomTap':
      f.restroomWater=!f.restroomWater;return success(f.restroomWater?'水流进木桶。':f.restroomWiped&&!f.loopBroken?'水停了。镜里的人还在洗手。':'水停了。');
    case 'restroomStall':
      f.restroomStallOpen=!f.restroomStallOpen;
      if(f.restroomStallOpen)f.restroomFound=true;
      return success(f.restroomStallOpen?(f.loopBroken?'隔间里没有声音。旧围裙还在。':'敲击停了。里面没人，只有一件旧围裙。'):'麻布重新遮住了隔间。');
    case 'order':
      if(f.orderSolved)return fail('这张订单已经结清。');
      if(!/^\d+(?:\.\d{1,2})?$/.test(String(data.value))||Number(data.value)!==4.5)return fail('金额不对。');
      f.orderSolved=true;return success('钱箱打开了。你拿到了办公室钥匙。');
    case 'office':
      if(f.officeUnlocked)return fail('办公室已经打开。');
      if(!f.orderSolved||data.item!=='officeKey')return fail('门锁着。试试办公室钥匙。');
      f.officeUnlocked=true;return success('办公室门开了。');
    case 'readMeal':
      if(f.mealRead)return fail('保温罩已经揭开了。');
      f.mealRead=true;return success('罩子下面，留着半份饭。');
    case 'musicPiece':
      if(!f.officeUnlocked||f.musicRestored)return fail('这段曲子已经修好了。');
      if(Number(data.piece)!==s.musicOrder.length+1)return fail('断口接不上。');
      s.musicOrder.push(Number(data.piece));return success('散页已放入。');
    case 'restoreMusic':
      if(!f.officeUnlocked||f.musicRestored)return fail('这段曲子已经弹过了。');
      if(JSON.stringify(s.playedNotes)!==JSON.stringify(MUSIC_PHRASE))return fail('最后几个音，和谱上不一样。');
      s.musicOrder=[1,2,3];
      f.musicRestored=true;return success('琴盖里亮起一块屏幕。小海写着：换个游戏，取回备份。');
    case 'musicNote':
      if(!f.officeUnlocked||!f.safeSolved||f.musicRestored||s.playedNotes.length>=MUSIC_PHRASE.length||!Number.isInteger(data.note)||data.note<1||data.note>7)return fail('');
      s.playedNotes.push(data.note);return success('');
    case 'undoMusic':
      if(!f.officeUnlocked||f.musicRestored||!s.playedNotes.length)return fail('');
      s.playedNotes.pop();return success('');
    case 'resetMusic':
      if(!f.officeUnlocked||f.musicRestored)return fail('');
      s.playedNotes=[];return success('');
    case 'safe':
      if(!f.officeUnlocked)return fail('先打开办公室门。');
      if(f.safeSolved)return fail('保险柜已经打开。');
      if(JSON.stringify(data.order)!==JSON.stringify(['squid','sponge','employee']))return fail('锁扣没有动。');
      f.safeSolved=true;return success('锁扣松开了。里面有什么被冰封着。');
    case 'takeIce':
      if(!f.safeSolved||f.iceTaken)return fail('这里没有可以取走的冰封物。');
      if(!f.crossoverSolved)return fail('暗格未开。先进入琴盖屏幕，取回备份校验标记。');
      f.iceTaken=true;return success('获得冰封物。');
    case 'takePot':
      if(!f.iceTaken)return fail('这口锅暂时用不上。');
      if(f.potTaken)return fail('锅已经拿走了。');
      f.potTaken=true;return success('获得空锅。');
    case 'fillPot':
      if(!f.potTaken||f.potFilled||data.item!=='pot')return fail('选中空锅，再用水龙头装水。');
      f.potFilled=true;return success('锅里装好了水。');
    case 'insertIce':
      if(!f.iceTaken||!f.potFilled||f.iceInPot||data.item!=='ice')return fail('需要把冰封物放入装水的锅。');
      f.iceInPot=true;return success('冰封物浸在水里。');
    case 'placePot':
      if(!f.iceInPot||f.potOnStove||data.item!=='icePot')return fail('请选中装着水和冰封物的水浴锅。');
      f.potOnStove=true;return success('锅放好了。');
    case 'thaw':
      if(!f.potOnStove||f.thawed)return fail('先准备水浴锅。');
      if(data.heat!=='low')return fail('火太大。操作牌上画着小火。');
      f.thawed=true;return success('冰融了。录像卡匣和仓库钥匙露出来了。');
    case 'hatch':
      if(f.hatchUnlocked)return fail('舱口已经打开。');
      if(!f.thawed||data.item!=='warehouseKey')return fail('舱口锁着。需要选中仓库钥匙。');
      f.hatchUnlocked=true;return success('仓库舱口打开了。');
    case 'insertCube':
      if(!f.hatchUnlocked||!f.thawed||f.cubeInserted||data.item!=='cube')return fail('方形插槽需要录像卡匣。');
      f.cubeInserted=true;return success('放映机开始读取小海的录像。');
    case 'filmSeen':
      if(!f.cubeInserted)return fail('还没有可以播放的录像。');
      f.filmSeen=true;return success('录像看完了。拍下证据，再倒序读取门禁记录。');
    case 'reverse':
      if(!f.filmSeen||f.loopBroken)return fail('先看完这一班的三个片段。');
      if(JSON.stringify(data.order)!==JSON.stringify(['kitchen','office','cashier']))return fail('顺序不对。先从最后发生的地方开始。');
      f.loopBroken=true;return success('电锁停止供电。正门可以打开了，先确认五份证据。');
    case 'lakeDrawer':
      if(!f.musicRestored||f.lakeDrawer)return fail('抽屉暂时拉不开。');
      f.lakeDrawer=true;return success('抽屉里有一块黑方块。');
    case 'takeLakeCube':
      if(!f.lakeDrawer||f.lakeCube)return fail('先拉开最后一格抽屉。');
      f.lakeCube=true;return success('黑方块变成了车钥匙。你落进另一个游戏。');
    case 'drive': {
      if(!f.lakeCube||f.crossoverSolved)return fail('取证车还没有出现。');
      const delta={north:[0,-1],south:[0,1],west:[-1,0],east:[1,0]}[data.direction];
      if(!delta)return fail('方向无效。');
      const p=[s.cityPosition[0]+delta[0],s.cityPosition[1]+delta[1]];
      if(p[0]<0||p[0]>3||p[1]<0||p[1]>2||[[0,1],[2,2],[3,1]].some(v=>v[0]===p[0]&&v[1]===p[1]))return fail('这条路封了。换个方向，备份不会丢。');
      s.cityPosition=p;return success(p[0]===2&&p[1]===0?'档案车到了。取走备份。':'车穿过雨夜街口。');
    }
    case 'finishCrossover':
      if(!f.lakeCube||f.crossoverSolved||s.cityPosition[0]!==2||s.cityPosition[1]!==0)return fail('先把车开到档案格。');
      f.crossoverSolved=true;return success('备份校验标记带回餐厅，冷藏暗格打开了。');
    case 'collectEvidence': {
      const id=data.id;
      if(!Object.prototype.hasOwnProperty.call(EVIDENCE,id))return fail('这份材料无效。');
      if(s.evidence.includes(id))return fail('这份证据已存好。');
      if(id==='incident'?!f.filmSeen:id!=='management'&&!f.officeUnlocked)return fail('先找到并读完这份原始记录。');
      s.evidence.push(id);return success('已拍下：'+EVIDENCE[id].title+'。');
    }
    case 'envelope':
      if(!f.officeUnlocked)return fail('先找到办公室里的档案。');
      f.envelopeRead=true;return success('小海的未领工资：0.00。');
    case 'exit':
      if(!f.loopBroken)return fail('正门电锁还没有解除。');
      if(s.evidence.length!==5)return fail('打开手机证据册，补齐五份材料再离开。');
      f.ended=true;s.room='lobby';return success('你带着证据逃出了餐厅。');
    case 'room':
      if(!['lobby','cashier','kitchen','office','storage'].includes(data.room))return fail('未知区域。');
      if(data.room==='office'&&!f.officeUnlocked)return fail('办公室还没有打开。');
      if(data.room==='storage'&&!f.hatchUnlocked)return fail('仓库舱口还锁着。');
      s.room=data.room;return success('');
    case 'seen':
      if(!SEEN_EVENTS.includes(data.id)||s.seen.includes(data.id))return fail('');
      s.seen.push(data.id);return success('');
    case 'hint': {
      const i=storyStep(s)-1;s.hints[i]=Math.min(3,s.hints[i]+1);return success(currentHints(s)[s.hints[i]-1]);
    }
    default:return fail('未知操作。');
  }
}

window.KrustyState={SAVE_KEY,MUSIC_PHRASES,MUSIC_PHRASE,FLAG_NAMES,ITEMS,newState,inventory,chapter,storyStep,objective,HINTS,currentHints,restoreState,act};
})();