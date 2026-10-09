(function(){
"use strict";
// GPU 短采样与本地拟音；全部离线。
function createAudio(data={}) {
  let context=null,unlocked=false,muted=false,hidden=false,paused=false,active=false;
  let master,ambience,pressure,air,wet,duck,effects,uiBus,tinnitus,analyser,noise,coverBus,musicBus,musicMeter,room='lobby';
  let musicElapsed=0,nextMusic=.35,musicIndex=0,nextBreath=3.5,lastStepAt=-10,steps=0;
  let queuedMessage=null;
  const musicTransients=new Set(),playerTransients=new Set(),demoTransients=new Set();let demonstrating=false;
  const musicWaveform=new Float32Array(1024);
  let coverActive=false,coverElapsed=0,lastCoverPose=null,nextCoverTick=.6,nextCoverCreak=7;
  let elapsed=0,nextCreak=5,nextTick=1.2,nextSilence=22,nextEerie=14,tension=.15,doorUntil=0,quietUntil=0,lastEerie='',lastUI=-1;
  const buffers=new Map(),playing=new Map(),pending=new Map(),counts={};
  const speechIds=['squid_message','crab_wages','crab_hours'];
  const transients=new Set(),eerieTransients=new Set();
  const waveform=new Float32Array(1024);
  // 环境层单独提高约 8 dB；前景拟音与对白保持原有音量。
  const ambienceLevel=2.5;
  const profiles={lobby:[.038,280],cashier:[.041,340],office:[.032,210],kitchen:[.048,460],storage:[.057,180]};
  function stop(id){const p=playing.get(id);if(p){try{p.source.stop();}catch(e){}playing.delete(id);}pending.delete(id);}
  function count(id){counts[id]=(counts[id]||0)+1;}
  function transient(source,nodes){
    const entry={source,nodes};transients.add(entry);
    source.onended=()=>{transients.delete(entry);eerieTransients.delete(entry);musicTransients.delete(entry);playerTransients.delete(entry);demoTransients.delete(entry);nodes.forEach(node=>node.disconnect());};
  }
  function route(node,bus,pan){
    if(pan&&context.createStereoPanner){const panner=context.createStereoPanner();panner.pan.value=pan;node.connect(panner);panner.connect(bus);return panner;}
    node.connect(bus);return null;
  }
  function tone(freq,duration,level,type='sine',delay=0,end=freq,bus=effects,pan=0,hold=0){
    const start=context.currentTime+delay,osc=context.createOscillator(),gain=context.createGain();
    osc.type=type;osc.frequency.setValueAtTime(freq,start);osc.frequency.exponentialRampToValueAtTime(Math.max(12,end),start+duration);
    gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(level,start+.012);if(hold>0){gain.gain.exponentialRampToValueAtTime(level*.55,start+.35);gain.gain.setValueAtTime(level*.5,start+Math.min(hold,duration-.1));}gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
    osc.connect(gain);const panner=route(gain,bus,pan);transient(osc,[osc,gain].concat(panner?[panner]:[]));osc.start(start);osc.stop(start+duration+.02);
  }
  function hiss(duration,level,freq,type='bandpass',delay=0,bus=effects,pan=0){
    const start=context.currentTime+delay,source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();
    source.buffer=noise;source.loop=true;filter.type=type;filter.frequency.value=freq;filter.Q.value=1.3;
    gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(level,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
    source.connect(filter);filter.connect(gain);const panner=route(gain,bus,pan);transient(source,[source,filter,gain].concat(panner?[panner]:[]));source.start(start,Math.random());source.stop(start+duration+.02);
  }
  // 短促的干声走独立总线，暂停页与结尾也能反馈；不进入恐怖混响。
  function ui(id='click',value=''){
    if(hidden||muted||!unlock())return;
    const now=context.currentTime;
    if(id==='click'&&now-lastUI<.04)return;lastUI=now;count('ui_'+id);
    if(id==='digit'){
      const pitch=value==='.'?580:420+Number(value||0)*28;
      hiss(.028,.08,1900,'bandpass',0,uiBus);tone(pitch,.085,.045,'triangle',0,pitch*.7,uiBus);tone(105,.055,.025,'sine',.025,70,uiBus);
    }else if(id==='clear'){
      hiss(.05,.07,1500,'bandpass',0,uiBus);tone(520,.12,.04,'triangle',0,210,uiBus);
    }else if(id==='error'){
      tone(165,.16,.042,'triangle',0,120,uiBus);tone(150,.14,.035,'triangle',.18,110,uiBus);
    }else if(id==='confirm'){
      tone(620,.10,.04,'sine',0,740,uiBus);tone(930,.18,.033,'sine',.10,1100,uiBus);hiss(.06,.035,1600,'bandpass',0,uiBus);
    }else if(id==='page'){
      hiss(.18,.075,1800,'bandpass',0,uiBus);hiss(.10,.035,2700,'bandpass',.09,uiBus);
    }else{
      hiss(.025,.06,1400,'bandpass',0,uiBus);tone(id==='back'?310:id==='select'?650:480,.07,.028,'triangle',0,id==='back'?220:360,uiBus);
    }
  }
  function holdForeground(seconds){
    if(!context)return;quietUntil=Math.max(quietUntil,context.currentTime+seconds);
    eerieTransients.forEach(entry=>{try{entry.source.stop();}catch(e){}});eerieTransients.clear();
    stopLayer(musicTransients);stopLayer(playerTransients);musicIndex=0;nextMusic=musicElapsed+2;
  }
  function stopLayer(entries){entries.forEach(entry=>{try{entry.source.stop();}catch(e){}});entries.clear();}
  function trackLayer(entries,callback){const before=new Set(transients);callback();transients.forEach(entry=>{if(!before.has(entry))entries.add(entry);});}
  // 暗钢琴音色：有衰减的基音和弱泛音，不用连续蜂鸣当旋律。
  function piano(note,delay=0,duration=1.8,bus=effects,level=.075){
    if(!context||!unlocked||muted||hidden||paused)return;
    const frequencies=[523.251,587.33,659.255,698.456,783.991,880,987.767],base=frequencies[note-1],freq=bus===musicBus?base*.5:base;if(!freq)return;
    if(bus===effects){if(!demonstrating)stopLayer(demoTransients);holdForeground(duration+.15);count('piano_'+note);hiss(.025,.035,1500,'bandpass',delay);}
    tone(freq,duration,level,'sine',delay,freq,bus);tone(freq*2,duration*.55,level*.2,'sine',delay,freq*2,bus);tone(freq*3,duration*.28,level*.045,'sine',delay,freq*3,bus);
  }
  function pianoPhrase(notes){if(!unlock()||muted||hidden||paused)return;stopSpeech();stopLayer(demoTransients);count('piano_demo');const starts=[0,.242,.484,.726,.968,2.42,2.662];demonstrating=true;try{trackLayer(demoTransients,()=>notes.forEach((note,i)=>piano(note,Math.floor(i/7)*4.2+starts[i%7],i%7===4?1.6:.85)));}finally{demonstrating=false;}holdForeground(Math.ceil(notes.length/7)*4.2);}
  // 小二度与降五度构成反复的低音动机，尾音重叠，手机也能听见旋律。
  function updateMusic(dt,calm=false,cover=false){
    musicElapsed+=dt;if(musicElapsed<nextMusic)return;
    const phrase=calm?[261.63,329.63,392,293.66,329.63,261.63,293.66,261.63]:[261.63,277.18,392,369.99,311.13,277.18,246.94,261.63];
    const index=musicIndex,freq=phrase[index],level=cover?.072:calm?.058:.105;
    trackLayer(musicTransients,()=>{
      tone(freq,3.8,level,'sine',0,freq,musicBus,0,2.2);
      tone(freq*.5,4.2,level*.42,'triangle',0,freq*.5,musicBus,0,2.2);
      tone(freq*2.003,2.5,level*.12,'sine',.05,freq*2.003,musicBus,0,1.5);
      if(index===0||index===4){tone(freq*.25,6.5,level*.38,'sine',0,freq*.25,musicBus,0,4.5);tone(freq*.5*1.006,6.3,level*.2,'sine',.08,freq*.5*1.006,musicBus,0,4.5);}
    });count('background_note');
    musicIndex=(index+1)%phrase.length;nextMusic=musicElapsed+[1.7,1.8,2.1,1.7,2.0,1.8,2.2,1.8][index];
    if(!musicIndex)count('background_phrase');
  }
  function completedMusic(notes){
    if(!unlock()||muted||hidden||paused)return;
    pianoPhrase(notes);count('completed_music');
    queuedMessage={id:'squid_message',at:context.currentTime+Math.ceil(notes.length/7)*4.2};
  }
  // 呼吸在玩家身边、居中；与随机出现的远处怪声分开。
  function playerBreath(moving=false){
    if(!context||muted||hidden||paused||coverActive||!active||context.currentTime<quietUntil)return;
    count('player_breath');const lv=(moving?.06:.035)*(1+tension*.25);
    trackLayer(playerTransients,()=>{hiss(.48,lv,790,'bandpass',0,effects);hiss(.72,lv*.72,460,'bandpass',.78,effects);});
  }
  function step(nextRoom,position){
    if(!context||!unlocked||hidden||muted||paused||!active)return;
    room=nextRoom||room;count('step');steps++;lastStepAt=context.currentTime;
    const pan=steps%2?.12:-.12,weight=room==='storage'?1.12:1;
    hiss(.10,.13,820,'bandpass',0,effects,pan);tone(104,.18,.095*weight,'sine',0,46,effects,pan);hiss(.055,.036,2200,'bandpass',.07,effects,pan);
    // 木板先承重弯曲，再松动回弹；脚步变停时不会继续循环。
    count('floor_stress');const pitch=room==='storage'?126:171;
    tone(pitch,.50,.029*weight,'triangle',.055,pitch*.65,effects,pan);hiss(.32,.048*weight,350,'bandpass',.06,effects,pan);
    if(steps%3===0){count('floor_loose');oldHinge(.10,.72,room==='kitchen'?134:97,.018);hiss(.08,.05,460,'bandpass',.44,effects,pan);}
  }
  function eerie(id){
    if(!context||!unlocked||hidden||muted||paused||!active)return;
    const before=new Set(transients);
    // 远处怪声叠在旋律上，不再中断整句背景音乐。
    count('eerie_'+id);lastEerie=id;const pan=(Math.random()<.5?-1:1)*(.45+Math.random()*.35),lv=.75+tension*.4;
    duckAmbience(id==='swell'?3.5:2.5,.12);
    if(id==='breath'){
      hiss(.38,.045*lv,780,'bandpass',.15,effects,pan);hiss(.13,.028*lv,1300,'bandpass',.39,effects,pan);hiss(.85,.038*lv,420,'bandpass',.85,effects,pan*.6);
    }else if(id==='whisper'){
      for(const [delay,freq,duration] of [[.1,950,.22],[.43,650,.34],[.98,1250,.18],[1.3,720,.6]]){
        hiss(duration,.035*lv,freq,'bandpass',delay,effects,pan);tone(130+Math.random()*22,duration,.009,'triangle',delay,98,effects,pan);
      }
    }else if(id==='knock'){
      for(const delay of [0,.28,.91]){tone(72,.24,.05*lv,'sine',delay,34,effects,pan);hiss(.075,.042*lv,480,'bandpass',delay,effects,pan);}
    }else if(id==='scrape'){
      tone(410,1.7,.015*lv,'sawtooth',.1,113,effects,pan);tone(417,1.5,.009,'triangle',.18,122,effects,-pan);hiss(1.5,.035*lv,920,'bandpass',.12,effects,pan);
    }else{
      tone(63,2.8,.042*lv,'sine',0,39,effects,pan);tone(66.2,2.7,.035*lv,'sine',.12,41,effects,-pan);tone(189,2.5,.012,'triangle',.2,119,effects,pan);hiss(1.8,.023,330,'bandpass',.4,effects,pan);
    }
    transients.forEach(entry=>{if(!before.has(entry))eerieTransients.add(entry);});
  }
  function duckAmbience(seconds=1.5,floor=.09){
    if(!context||!duck)return;const now=context.currentTime;
    duck.gain.cancelScheduledValues(now);duck.gain.setValueAtTime(Math.max(.001,duck.gain.value),now);
    duck.gain.exponentialRampToValueAtTime(floor,now+.09);duck.gain.setValueAtTime(floor,now+seconds*.58);duck.gain.exponentialRampToValueAtTime(1,now+seconds);
  }
  function oldHinge(start,duration,frequency,level){
    const when=context.currentTime+start,osc=context.createOscillator(),gain=context.createGain(),filter=context.createBiquadFilter();
    osc.type='sawtooth';filter.type='lowpass';filter.frequency.value=1650;filter.Q.value=1.8;
    // 锈蚀门轴：摩擦音反复攀升又滑落，和门板的三段卡顿同步。
    for(const [part,pitch,weight] of [[0,1,.03],[.12,1.8,1],[.27,1.35,.32],[.40,2.2,.85],[.56,.95,.15],[.70,1.65,.72],[.87,.72,.25],[1,.55,.002]]){
      osc.frequency.exponentialRampToValueAtTime(frequency*pitch,when+part*duration);
      gain.gain.linearRampToValueAtTime(Math.max(.0001,level*weight),when+part*duration);
    }
    const wobble=context.createOscillator(),depth=context.createGain();wobble.frequency.value=23;depth.gain.value=9;wobble.connect(depth);depth.connect(osc.frequency);
    osc.connect(filter);filter.connect(gain);gain.connect(effects);osc.start(when);wobble.start(when);osc.stop(when+duration+.03);wobble.stop(when+duration+.03);
    transient(osc,[osc,gain,filter]);transient(wobble,[wobble,depth]);
    hiss(duration,level*.5,650,'bandpass',start);
  }
  function openDoor(id,duration=3.6){
    if(!context||!unlocked||hidden||muted||paused||!active)return;
    count('door');count('door_'+id);doorUntil=context.currentTime+duration;
    stopLayer(musicTransients);stopLayer(playerTransients);musicIndex=0;nextMusic=musicElapsed+2;
    duckAmbience(duration+.65,.055);
    tone(480,.10,.045,'triangle',0,190);hiss(.075,.065,1900); // 锁舌
    tone(76,.23,.055,'sine',.14,39);
    oldHinge(.38,2.65,id==='hatch'?122:168,.045);
    oldHinge(.58,2.35,id==='hatch'?61:83,.012);
    hiss(.15,.04,430,'bandpass',1.12);hiss(.16,.034,390,'bandpass',1.91); // 木料绷裂
    hiss(2.6,.035,270,'bandpass',.8); // 门缝后面的空气
    tone(43,1.8,.047,'sine',1.5,32);tone(86,1.8,.017,'sine',1.5,64);
    tone(92,.26,.065,'sine',3.15,46);hiss(.18,.052,510,'bandpass',3.14); // 行程末端的闷响
  }
  function foley(id){
    if(!context||!unlocked||hidden||muted||paused||!active)return;
    count(id);
    switch(id){
      case 'step':step(room);break;
      case 'paper':hiss(.38,.07,1500);hiss(.19,.03,2600,'bandpass',.17);break;
      case 'key':tone(1450,.12,.06,'sine');tone(2100,.10,.025,'sine',.06);hiss(.12,.045,1900);break;
      case 'door':openDoor('wood');break;
      case 'descent':duckAmbience(2,.07);tone(48,1.8,.055,'sine',0,29);hiss(.8,.025,360);break;
      case 'water':hiss(1.4,.13,1800);hiss(1.2,.06,720,'bandpass',.15);break;
      case 'shock':holdForeground(2);duckAmbience(2,.02);tone(54,.45,.12,'sine',0,27);hiss(.095,.12,640);tone(790,.3,.03,'triangle',.02,210);break;
      case 'knock':for(const delay of [0,.29,.92]){tone(72,.22,.075,'sine',delay,32);hiss(.06,.05,440,'bandpass',delay);}break;
      case 'stallKnock':tone(72,.12,.055,'sine',0,32);hiss(.045,.035,440,'bandpass');break;
      case 'rattle':tone(380,.16,.05,'triangle',0,185);hiss(.08,.065,1450);tone(96,.24,.06,'sine',.12,51);hiss(.10,.035,500,'bandpass',.27);break;
      case 'heat':hiss(1.6,.09,1100);tone(110,.6,.04,'sine');break;
      case 'melody':
        holdForeground(6);
        duckAmbience(5,.16);
        [293.66,349.23,392,349.23,261.63,293.66].forEach((freq,i)=>{tone(freq,.62,.045,'triangle',i*.68);tone(freq*3,.54,.006,'sine',i*.68);});break;
      case 'warmth':holdForeground(5);duckAmbience(3,.28);[196,246.94,293.66].forEach((freq,i)=>tone(freq,2.5,.018,'sine',i*.13));break;
      case 'broadcast':holdForeground(4);duckAmbience(2,.10);hiss(1.8,.045,1100);tone(146,1.4,.019,'triangle',.2,102);break;
      case 'metal':tone(340,.32,.07,'triangle',0,270);tone(710,.23,.035,'sine',.035);break;
      case 'dial':hiss(.045,.08,1800);tone(410,.085,.042,'triangle',0,280);break;
      case 'creak':tone(165,1.4,.035,'triangle',0,117);hiss(.9,.025,390,'bandpass',.15);break;
      case 'drip':tone(960,.15,.045,'sine',0,480);tone(640,.18,.02,'sine',.12,350);break;
      case 'tick':hiss(.038,.035,1450);break;
      default:hiss(.055,.045,950);tone(290,.07,.022,'sine');
    }
  }
  function init(){
    master=context.createGain();master.gain.value=muted?0:.78;
    const compressor=context.createDynamicsCompressor();compressor.threshold.value=-18;compressor.ratio.value=3;compressor.attack.value=.015;compressor.release.value=.35;
    analyser=context.createAnalyser();analyser.fftSize=2048;
    master.connect(compressor);compressor.connect(analyser);analyser.connect(context.destination);
    ambience=context.createGain();ambience.gain.value=0;ambience.connect(master);
    duck=context.createGain();duck.gain.value=1;duck.connect(ambience);
    pressure=context.createGain();pressure.gain.value=.038;
    const subFilter=context.createBiquadFilter();subFilter.type='lowpass';subFilter.frequency.value=152;pressure.connect(subFilter);subFilter.connect(ambience);
    air=context.createBiquadFilter();air.type='bandpass';air.frequency.value=280;air.Q.value=.65;
    const airGain=context.createGain();airGain.gain.value=.10;air.connect(airGain);airGain.connect(duck);
    effects=context.createGain();effects.gain.value=.9;effects.connect(master);
    uiBus=context.createGain();uiBus.gain.value=.85;uiBus.connect(master);
    // 封面的老灯轻鸣走独立总线，进入游戏后彻底关闭。
    coverBus=context.createGain();coverBus.gain.value=0;coverBus.connect(master);
    for(const [frequency,level] of [[98,.012],[196.6,.003]]){
      const osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.value=level;osc.connect(gain);gain.connect(coverBus);osc.start();
    }
    tinnitus=context.createGain();tinnitus.gain.value=.0001;tinnitus.connect(duck);
    for(const frequency of [1240,1244]){const osc=context.createOscillator();osc.frequency.value=frequency;osc.connect(tinnitus);osc.start();}
    const delay=context.createDelay(.4),filter=context.createBiquadFilter(),reverb=context.createConvolver();wet=context.createGain();
    delay.delayTime.value=.028;filter.type='lowpass';filter.frequency.value=2300;wet.gain.value=.22;
    musicBus=context.createGain();musicBus.gain.value=.65;const musicFilter=context.createBiquadFilter();musicFilter.type='lowpass';musicFilter.frequency.value=1800;musicMeter=context.createAnalyser();musicMeter.fftSize=2048;musicBus.connect(musicFilter);musicFilter.connect(musicMeter);musicMeter.connect(master);musicFilter.connect(delay);
    const impulse=context.createBuffer(2,Math.floor(context.sampleRate*4.1),context.sampleRate);
    for(let channel=0;channel<2;channel++){const samples=impulse.getChannelData(channel);for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*Math.pow(1-i/samples.length,2.7);}
    reverb.buffer=impulse;effects.connect(delay);delay.connect(reverb);reverb.connect(filter);filter.connect(wet);wet.connect(duck);
    noise=context.createBuffer(1,context.sampleRate*3,context.sampleRate);
    const samples=noise.getChannelData(0);let brown=0;
    for(let i=0;i<samples.length;i++){brown=(brown+(Math.random()*2-1)*.025)/1.025;samples[i]=brown*4;}
    const breath=context.createBufferSource();breath.buffer=noise;breath.loop=true;breath.connect(air);breath.start();
    for(const [frequency,level] of [[29.5,.30],[31.1,.24],[55,.40],[110,.32],[112.1,.23]]){
      const osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.value=level;osc.connect(gain);gain.connect(pressure);osc.start();
    }
    const lfo=context.createOscillator(),depth=context.createGain();lfo.frequency.value=.13;depth.gain.value=.007;lfo.connect(depth);depth.connect(pressure.gain);lfo.start();
    Object.keys(data).forEach(id=>{
      try{
        const raw=atob(data[id]),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
        context.decodeAudioData(bytes.buffer,buffer=>{buffers.set(id,buffer);flush();},()=>pending.delete(id));
      }catch(e){pending.delete(id);}
    });
  }
  function flush(){if(!hidden&&!muted)Array.from(pending.entries()).forEach(([id,options])=>{if(buffers.has(id))play(id,options);});}
  function unlock(){
    const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return false;
    if(!context){context=new AudioContext();init();}
    unlocked=true;
    if(context.state==='suspended'&&!hidden)context.resume().then(flush).catch(()=>{});
    return true;
  }
  function startCover(){
    if(!unlock())return false;
    if(coverActive)return true;
    coverActive=active=true;paused=false;coverElapsed=0;lastCoverPose=null;nextCoverTick=.6;nextCoverCreak=7;
    ambience.gain.setTargetAtTime(.95,context.currentTime,.35);
    pressure.gain.setTargetAtTime(.036,context.currentTime,.5);
    coverBus.gain.setTargetAtTime(1,context.currentTime,.3);count('cover_start');
    return true;
  }
  function updateCover(dt,pose){
    if(!coverActive||!context)return;
    if(context.state!=='running'||hidden||muted||paused){lastCoverPose=pose;return;}
    coverElapsed+=dt;
    updateMusic(dt,false,true);
    if(lastCoverPose!==null){
      for(const at of [.12,.90,1.74,2.64])if(lastCoverPose<at&&pose>=at){
        hiss(.62,.09,780,'bandpass',0,coverBus,.4);hiss(.3,.026,1320,'bandpass',.18,coverBus,.25);count('cover_wipe');
      }
      if(lastCoverPose<2.35&&pose>=2.35){duckAmbience(.9,.18);hiss(.08,.035,2200,'bandpass',0,coverBus,.3);count('cover_lamp');}
    }
    lastCoverPose=pose;
    if(coverElapsed>=nextCoverTick){hiss(.035,.025,1700,'bandpass',0,coverBus,-.3);nextCoverTick=coverElapsed+1.05;count('cover_tick');}
    if(coverElapsed>=nextCoverCreak){tone(145,1.15,.012,'triangle',0,108,coverBus,.25);hiss(.6,.018,390,'bandpass',.1,coverBus,.4);nextCoverCreak=coverElapsed+12+Math.random()*5;count('cover_creak');}
  }
  function play(id,options={}){
    if(id==='night_room'){
      active=true;if(ambience)ambience.gain.setTargetAtTime(paused?0:ambienceLevel,context.currentTime,.5);
      if(playing.has(id))return;
    }
    if(!context||!unlocked||muted||hidden||(paused&&speechIds.includes(id))){if(id==='night_room'||options.loop)pending.set(id,options);return;}
    if(!buffers.has(id)){pending.set(id,options);return;}
    if(speechIds.includes(id)){stopSpeech();stopLayer(demoTransients);duckAmbience(buffers.get(id).duration+.4,.055);}
    if(id!=='night_room')holdForeground(id==='film_projector'?8:buffers.get(id).duration+1.5);
    stop(id);const source=context.createBufferSource(),gain=context.createGain();
    source.buffer=buffers.get(id);source.loop=options.loop===true;gain.gain.value=options.volume===undefined?(id==='night_room'?.43:id==='film_projector'?.32:id==='empty_chair'?.55:id==='cash_register'?.45:.74):options.volume;
    source.connect(gain);gain.connect(id==='night_room'?duck:effects);playing.set(id,{source,gain});count(id);
    source.onended=()=>{if(playing.get(id)&&playing.get(id).source===source)playing.delete(id);source.disconnect();gain.disconnect();};source.start();
  }
  function stopSpeech(){queuedMessage=null;speechIds.forEach(stop);}
  function speak(id){if(!speechIds.includes(id)||muted||hidden||paused||!unlock())return;stopSpeech();play(id,{volume:1.1});}
  function stopTransients(){transients.forEach(entry=>{try{entry.source.stop();}catch(e){}entry.nodes.forEach(node=>node.disconnect());});transients.clear();}
  function stopAll(){queuedMessage=null;Array.from(playing.keys()).forEach(stop);pending.clear();stopTransients();musicTransients.clear();playerTransients.clear();musicElapsed=0;nextMusic=.35;musicIndex=0;nextBreath=3.5;lastStepAt=-10;steps=0;active=coverActive=false;coverElapsed=0;lastCoverPose=null;elapsed=0;nextCreak=5;nextTick=1.2;nextSilence=22;nextEerie=14;doorUntil=quietUntil=0;lastEerie='';if(ambience){ambience.gain.cancelScheduledValues(context.currentTime);ambience.gain.value=0;duck.gain.cancelScheduledValues(context.currentTime);duck.gain.value=1;coverBus.gain.cancelScheduledValues(context.currentTime);coverBus.gain.value=0;}}
  function setPaused(value){
    paused=value;if(!context)return;
    if(value){stopSpeech();stopTransients();musicTransients.clear();playerTransients.clear();musicIndex=0;nextMusic=musicElapsed+2;}
    ambience.gain.setTargetAtTime(active&&!value?(coverActive?.95:ambienceLevel):0,context.currentTime,.08);
    coverBus.gain.setTargetAtTime(coverActive&&!value?1:0,context.currentTime,.08);
    effects.gain.setTargetAtTime(value?0:.9,context.currentTime,.03);
  }
  function setMuted(value){muted=value;if(value){stopSpeech();stopLayer(demoTransients);stopLayer(musicTransients);stopLayer(playerTransients);musicIndex=0;nextMusic=musicElapsed+2;}if(master)master.gain.setTargetAtTime(value?0:.78,context.currentTime,.03);if(!value)flush();}
  function setHidden(value){
    hidden=value;if(!context)return;
    if(value)context.suspend().catch(()=>{});
    else if(unlocked)context.resume().then(flush).catch(()=>{});
  }
  function update(dt,nextRoom,progress=0,calm=false){
    if(!active||coverActive||!context||context.state!=='running'||hidden||muted||paused)return;
    if(queuedMessage&&context.currentTime>=queuedMessage.at){const id=queuedMessage.id;queuedMessage=null;speak(id);}
    room=nextRoom||room;elapsed+=dt;const profile=profiles[room]||profiles.lobby;
    tension+=((calm?.12:Math.min(1,progress*.15+(room==='storage'?.45:.15)))-tension)*Math.min(1,dt*.5);
    ambience.gain.setTargetAtTime(calm?ambienceLevel*.65:ambienceLevel,context.currentTime,3);
    pressure.gain.setTargetAtTime((calm?profile[0]*.65:profile[0])+tension*.025,context.currentTime,calm?3:.8);air.frequency.setTargetAtTime(profile[1],context.currentTime,.7);
    wet.gain.setTargetAtTime(room==='storage'?.34:.18,context.currentTime,1);
    tinnitus.gain.setTargetAtTime(calm?.0001:.0002+tension*tension*.0016,context.currentTime,1.5);
    if(context.currentTime<Math.max(doorUntil,quietUntil)||playing.has('film_projector'))return;
    updateMusic(dt,calm);
    if(elapsed>=nextBreath){const moving=context.currentTime-lastStepAt<1.3;playerBreath(moving);nextBreath=elapsed+(moving?3.3:5.1)+Math.random()*.9;}
    if(elapsed>=nextTick){foley(room==='kitchen'||room==='restroom'?'drip':'tick');nextTick=elapsed+1.3+Math.random()*1.4;}
    if(elapsed>=nextCreak){foley('creak');nextCreak=elapsed+9+Math.random()*12;}
    if(elapsed>=nextSilence){duckAmbience(2.1,.06);count('silence');nextSilence=elapsed+34+Math.random()*26;}
    if(!calm&&elapsed>=nextEerie){
      const choices=(room==='restroom'?['whisper','breath','swell']:room==='storage'?['breath','whisper','knock','swell']:room==='kitchen'?['scrape','knock','breath','swell']:['whisper','knock','scrape','breath']).filter(id=>id!==lastEerie);
      eerie(choices[Math.floor(Math.random()*choices.length)]);nextEerie=elapsed+12+Math.random()*15-tension*4;
      nextCreak=Math.max(nextCreak,elapsed+4);nextSilence=Math.max(nextSilence,elapsed+6);
    }
  }
  // 结尾电话与逐渐靠近的警笛，仍遵守静音和后台暂停。
  function report(id){
    if(hidden||muted||!unlock())return;count(id);
    if(id==='report_call'){
      for(let i=0;i<3;i++){tone(440,.15,.045,'sine',i*.23,440,uiBus);tone(620,.15,.035,'sine',i*.23,620,uiBus);}
      tone(430,.8,.025,'sine',.95,430,uiBus);tone(480,.8,.02,'sine',.95,480,uiBus);
    }else for(let i=0;i<8;i++)tone(i%2?820:540,.42,.018+i*.004,'sine',i*.45,i%2?540:820,uiBus);
  }
  function stats(){
    let musicRms=0;if(musicMeter&&context.state==='running'&&!muted&&!paused&&!hidden){musicMeter.getFloatTimeDomainData(musicWaveform);for(const v of musicWaveform)musicRms+=v*v;musicRms=Math.sqrt(musicRms/musicWaveform.length);}
    let rms=0;if(analyser&&context.state==='running'&&!muted&&!hidden){analyser.getFloatTimeDomainData(waveform);for(let i=0;i<waveform.length;i++)rms+=waveform[i]*waveform[i];rms=Math.sqrt(rms/waveform.length);}
    return {available:!!(window.AudioContext||window.webkitAudioContext),unlocked,decoded:buffers.size,playing:Array.from(playing.keys()),muted,hidden,paused,contextState:context?context.state:null,audible:!!context&&context.state==='running'&&!hidden&&!muted&&((!paused&&(active||playing.size>0))||transients.size>0),soundscape:active,coverActive,coverElapsed,room,tension,rms,musicRms,musicVoices:musicTransients.size,playerVoices:playerTransients.size,musicElapsed,queuedMessage:queuedMessage?queuedMessage.id:null,nextMusicIn:Math.max(0,nextMusic-musicElapsed),duck:duck?duck.gain.value:1,pressure:pressure?pressure.gain.value:0,doorActive:!!context&&context.currentTime<doorUntil,nextEerieIn:Math.max(0,nextEerie-elapsed),lastEerie,transients:transients.size,events:Object.assign({},counts)};
  }
  return {report,unlock,startCover,updateCover,play,speak,stopSpeech,stop,stopAll,setMuted,setHidden,setPaused,foley,step,piano,pianoPhrase,completedMusic,ui,openDoor,holdForeground,update,stats};
}

window.KrustyAudio={createAudio};
})();