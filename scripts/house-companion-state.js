// 纯状态机：时间只累计可见、未暂停的真实帧时间。
export function createCompanionState(config) {
  let day = 0, local = 0, focused = null, command = null, revision = 0;
  const scheduled = () => config.schedule[Math.floor(day / (config.daySeconds / config.schedule.length)) % config.schedule.length];
  const current = () => {
    const base = scheduled();
    const room = command?.room ?? focused ?? base.room;
    const activities = config.rooms[room].activities;
    const action = command?.action ?? (focused ? activities[Math.floor(local / config.activitySeconds) % activities.length] : base.action);
    return {room, action, day, phase:Math.floor(day / (config.daySeconds / config.schedule.length)), revision, following:!!focused, commanded:!!command};
  };
  return {
    snapshot:current,
    tick(dt, paused=false, runCommand=false) {
      if (!paused) {day=(day+Math.max(0,dt)) % config.daySeconds; local+=Math.max(0,dt);}
      if(command && (!paused || runCommand)){command.remaining-=Math.max(0,dt);if(command.remaining<=0)command=null;}
      return current();
    },
    follow(room) {if(room && !config.rooms[room])return false; focused=room;local=0;command=null;revision++;return true;},
    act(action) {const spec=config.actions[action];if(!spec)return false;command={action,room:spec.room??focused??scheduled().room,remaining:spec.duration??10};revision++;return true;},
    cancel() {command=null;revision++;}
  };
}
