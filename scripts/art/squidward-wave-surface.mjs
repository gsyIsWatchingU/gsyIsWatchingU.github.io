import * as T from 'three';

// 触手用连续椭圆截面放样；末端展开后下垂，不回卷成钩或分叉成手指。
export function armSurface(){
 const wrist=new T.Vector3(-.223,.838,.055),handY=new T.Vector3(-.07,-.145,.005).normalize(),handX=new T.Vector3(-handY.y,handY.x,0).normalize();
 const world=(x,y,z=0)=>wrist.clone().addScaledVector(handX,x).addScaledVector(handY,y).add(new T.Vector3(0,0,z));
 const controls=[
  [-.171,1.170,.025,.027,.026],[-.185,1.095,.032,.029,.027],[-.205,1.005,.040,.030,.027],[-.216,.915,.049,.025,.023],[-.223,.838,.055,.022,.020],
  ...[[0,.028,0,.028,.019],[.012,.056,0,.037,.017],[.040,.079,0,.041,.015],[.075,.083,0,.035,.013],[.110,.070,0,.025,.010],[.143,.052,0,.012,.006],[.159,.048,0,0,0]].map(([x,y,z,w,d])=>[...world(x,y,z).toArray(),w,d])
 ];
 const curve=new T.CatmullRomCurve3(controls.map(p=>new T.Vector3(...p.slice(0,3))),false,'centripetal'),profile=new T.CatmullRomCurve3(controls.map(p=>new T.Vector3(p[3],p[4],0)),false,'catmullrom',.35),rings=112,sides=32,positions=[],indices=[],weights=[];
 const smooth=t=>{t=T.MathUtils.clamp(t,0,1);return t*t*t*(10+t*(-15+6*t));};
 function bind(t){const seg=t*(controls.length-1),upper=1-smooth((seg-1.45)/1.05),hand=smooth((seg-3.3)/1.05),chest=(1-smooth(seg/.5))*.35;return[chest,upper*(1-chest),(1-upper)*(1-hand)*(1-chest),(1-upper)*hand*(1-chest)];}
 for(let i=0;i<rings;i++){
  const t=i/rings,point=curve.getPoint(t),tangent=curve.getTangent(t),normal=new T.Vector3(tangent.y,-tangent.x,0).normalize(),binormal=new T.Vector3().crossVectors(tangent,normal).normalize(),radius=profile.getPoint(t),width=radius.x,depth=radius.y;
  for(let k=0;k<sides;k++){const angle=k/sides*Math.PI*2;positions.push(...point.clone().addScaledVector(normal,Math.cos(angle)*width).addScaledVector(binormal,Math.sin(angle)*depth).toArray());weights.push(...bind(t));}
 }
 for(let i=0;i<rings-1;i++)for(let k=0;k<sides;k++){const a=i*sides+k,b=i*sides+(k+1)%sides,c=a+sides,d=b+sides;indices.push(a,b,c,b,d,c);}
 const start=positions.length/3;positions.push(...controls[0].slice(0,3));weights.push(...bind(0));const end=positions.length/3;positions.push(...controls.at(-1).slice(0,3));weights.push(...bind(1));
 for(let k=0;k<sides;k++){indices.push(start,(k+1)%sides,k);indices.push(end,(rings-1)*sides+k,(rings-1)*sides+(k+1)%sides);}
 let volume=0;for(let i=0;i<indices.length;i+=3){const [a,b,c]=indices.slice(i,i+3).map(k=>new T.Vector3().fromArray(positions,k*3));volume+=a.dot(new T.Vector3().crossVectors(b,c))/6;}if(volume<0)for(let i=0;i<indices.length;i+=3)[indices[i+1],indices[i+2]]=[indices[i+2],indices[i+1]];
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();
 return{positions,normals:Array.from(geometry.attributes.normal.array),indices,weights};
}
