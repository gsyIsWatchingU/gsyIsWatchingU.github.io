import * as THREE from 'three';
import connections from '../src/data/house-connections.json';

export function createHouseConnections({root,camera,rooms,getRoom,focusRoom}) {
  const host=document.createElement('nav');
  host.className='house-connections';host.setAttribute('aria-label','通往相邻房间');host.hidden=true;root.append(host);
  const words={door:'穿门',up:'上楼',down:'下楼'};
  const buttons=connections.map(link=>{
    const button=document.createElement('button');button.type='button';button.className='room-label passage-label';
    button.textContent=`${words[link.kind]} → ${rooms.get(link.to).name}`;
    button.dataset.housePassage=`${link.from}-${link.to}`;
    button.setAttribute('aria-label',`${words[link.kind]}，从${rooms.get(link.from).name}前往${rooms.get(link.to).name}`);
    button.addEventListener('click',()=>{
      if(getRoom()===link.from && root.dataset.houseState==='ready' && focusRoom(link.to))
        root.querySelector('[data-house-back]').focus({preventScroll:true});
    });
    host.append(button);return {link,button};
  });
  return {
    update(){
      const room=getRoom(),ready=root.dataset.houseState==='ready';host.hidden=!room || !ready;
      const placed=[...root.querySelectorAll('[data-house-object]:not([hidden])')].map(button=>{
        const r=button.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,half:r.width/2+12};
      });
      for(const {link,button} of buttons){
        button.hidden=!ready || link.from!==room;button.disabled=root.dataset.cameraTransition==='moving';
        if(button.hidden)continue;
        const point=new THREE.Vector3(...link.anchor).project(camera),width=root.clientWidth,height=root.clientHeight,half=button.offsetWidth/2+12;
        let x=THREE.MathUtils.clamp((point.x*.5+.5)*width,half,width-half);
        let y=THREE.MathUtils.clamp((-point.y*.5+.5)*height,210,height-70);
        if(point.z>1){x=width-half;y=height-90;}
        for(const other of placed)if(Math.abs(x-other.x)<half+other.half && Math.abs(y-other.y)<46)y=other.y+48;
        if(y>height-70)y=height-70-placed.length*48;
        placed.push({x,y,half});button.style.left=`${x}px`;button.style.top=`${y}px`;
      }
    },
    pick:node=>connections.find(link=>link.from===getRoom() && link.meshes?.some(prefix=>node.name.startsWith(prefix))),
    label:link=>`${words[link.kind]} → ${rooms.get(link.to).name}`,
  };
}
