import * as THREE from 'three';

// 楼板射线 + 家具占地；目标落在桌子、墙边或剖切缺口时，就近选可达位置。
export class RoomNavigation {
  constructor({floor,parent,floorY,obstacles,radius=.15,step=.08,limit=1.08}) {
    Object.assign(this,{floor,parent,floorY,obstacles,radius,step,limit});
    this.ray=new THREE.Raycaster();this.nodes=[];this.grid=new Map();
    parent.updateMatrixWorld(true);
    for(let ix=-13;ix<=13;ix++)for(let iz=-13;iz<=13;iz++){
      const point=[ix*step,iz*step];if(!this.clear(point))continue;
      const node={id:this.nodes.length,ix,iz,point,neighbors:[]};this.nodes.push(node);this.grid.set(ix+','+iz,node);
    }
    for(const node of this.nodes)for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
      const next=this.grid.get((node.ix+dx)+','+(node.iz+dz));
      if(next&&(!dx||!dz||(this.grid.has((node.ix+dx)+','+node.iz)&&this.grid.has(node.ix+','+(node.iz+dz)))))node.neighbors.push(next);
    }
  }
  clear([x,z]) {
    if(Math.hypot(x,z)>this.limit)return false;
    if(this.obstacles.some(box=>x>box.min.x-this.radius&&x<box.max.x+this.radius&&z>box.min.z-this.radius&&z<box.max.z+this.radius))return false;
    for(const [dx,dz] of [[0,0],[this.radius,0],[-this.radius,0],[0,this.radius],[0,-this.radius]]){
      const origin=this.parent.localToWorld(new THREE.Vector3(x+dx,this.floorY+.5,z+dz));
      this.ray.set(origin,new THREE.Vector3(0,-1,0));const hit=this.ray.intersectObject(this.floor,false)[0];
      if(!hit||Math.abs(this.parent.worldToLocal(hit.point.clone()).y-this.floorY)>.015)return false;
    }
    return true;
  }
  nearest(point,nodes=this.nodes){return nodes.reduce((best,node)=>!best||this.distance(node.point,point)<this.distance(best.point,point)?node:best,null);}
  distance(a,b){return Math.hypot(a[0]-b[0],a[1]-b[1]);}
  reachable(start){const seen=new Set([start.id]),queue=[start];for(let i=0;i<queue.length;i++)for(const node of queue[i].neighbors)if(!seen.has(node.id)){seen.add(node.id);queue.push(node);}return queue;}
  line(a,b){const count=Math.ceil(this.distance(a,b)/.035);for(let i=0;i<=count;i++){const t=count?i/count:0;if(!this.clear([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]))return false;}return true;}
  plan(from,wanted){
    const start=this.nearest(from);if(!start)return null;
    const destination=this.nearest(wanted,this.reachable(start));
    const open=[start],cost=new Map([[start.id,0]]),previous=new Map();
    while(open.length){
      open.sort((a,b)=>(cost.get(a.id)+this.distance(a.point,destination.point))-(cost.get(b.id)+this.distance(b.point,destination.point)));
      const node=open.shift();if(node===destination)break;
      for(const next of node.neighbors){const c=cost.get(node.id)+this.distance(node.point,next.point);if(c>=(cost.get(next.id)??Infinity))continue;cost.set(next.id,c);previous.set(next.id,node);if(!open.includes(next))open.push(next);}
    }
    const path=[destination.point];let at=destination;
    while(at!==start){at=previous.get(at.id);if(!at)return null;path.unshift(at.point);}
    const result=[];let anchor=from,index=0;
    while(index<path.length){let next=index;while(next+1<path.length&&this.line(anchor,path[next+1]))next++;result.push(path[next]);anchor=path[next];index=next+1;}
    return {path:result,point:destination.point,requested:wanted,adjusted:this.distance(wanted,destination.point)>.09};
  }
  random(from){const start=this.nearest(from),pool=this.reachable(start).filter(node=>this.distance(from,node.point)>.35);return pool[Math.floor(Math.random()*pool.length)]?.point||start.point;}
}
