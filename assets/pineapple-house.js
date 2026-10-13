(()=>{/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var ts={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ns={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},_d=0,Xc=1,xd=2;var As=1,yd=2,xr=3,Yn=0,xn=1,an=2,gi=0,yr=1,qc=2,Yc=3,Zc=4,vd=5;var Rs=100,Md=101,Sd=102,bd=103,Ed=104,Td=200,wd=201,Ad=202,Rd=203,Kc=204,jc=205,Cd=206,Id=207,Pd=208,Ld=209,Dd=210,Nd=211,Ud=212,Fd=213,Od=214,xa=0,ya=1,va=2,$s=3,Ma=4,Sa=5,ba=6,Ea=7,$c=0,Bd=1,Hd=2,ni=0,Jc=1,Qc=2,eu=3,To=4,tu=5,nu=6,iu=7,Pc="attached",zd="detached",su=300,is=301,Cs=302,ja=303,$a=304,wo=306,Ki=1e3,Wn=1001,Js=1002,qt=1003,Ja=1004;var Is=1005;var Yt=1006,vr=1007;var ii=1008;var Pn=1009,ru=1010,ou=1011,Mr=1012,Qa=1013,si=1014,Bn=1015,ri=1016,el=1017,tl=1018,Sr=1020,au=35902,lu=35899,cu=1021,uu=1022,Hn=1023,ui=1026,ss=1027,nl=1028,il=1029,rs=1030,sl=1031;var rl=1033,Ao=33776,Ro=33777,Co=33778,Io=33779,ol=35840,al=35841,ll=35842,cl=35843,ul=36196,hl=37492,dl=37496,fl=37488,pl=37489,Po=37490,ml=37491,gl=37808,_l=37809,xl=37810,yl=37811,vl=37812,Ml=37813,Sl=37814,bl=37815,El=37816,Tl=37817,wl=37818,Al=37819,Rl=37820,Cl=37821,Il=36492,Pl=36494,Ll=36495,Dl=36283,Nl=36284,Lo=36285,Ul=36286,kd=2200,Vd=2201,Gd=2202,xs=2300,ys=2301,ma=2302,Lc=2303,ps=2400,ms=2401,qr=2402,Fl=2500,Wd=2501,hu=0,Do=1,br=2,Xd=3200;var Ol=0,qd=1,Fi="",bt="srgb",_n="srgb-linear",Yr="linear",Et="srgb";var ga=7680;var Yd=519,Zd=512,Kd=513,jd=514,Bl=515,$d=516,Jd=517,Hl=518,Qd=519,du=35044;var fu="300 es",Qn=2e3,Qs=2001;function Tp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function wp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function er(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ef(){let i=er("canvas");return i.style.display="block",i}var wh={},tr=null;function Zr(...i){let e="THREE."+i.shift();tr?tr("log",e,...i):console.log(e,...i)}function tf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Qe(...i){i=tf(i);let e="THREE."+i.shift();if(tr)tr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function st(...i){i=tf(i);let e="THREE."+i.shift();if(tr)tr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function _s(...i){let e=i.join(" ");e in wh||(wh[e]=!0,Qe(...i))}function nf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var sf={[xa]:ya,[va]:ba,[Ma]:Ea,[$s]:Sa,[ya]:xa,[ba]:va,[Ea]:Ma,[Sa]:$s},qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ah=1234567,Vr=Math.PI/180,vs=180/Math.PI;function Xn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function ft(i,e,t){return Math.max(e,Math.min(t,i))}function pu(i,e){return(i%e+e)%e}function Ap(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Rp(i,e,t){return i!==e?(t-i)/(e-i):0}function Gr(i,e,t){return(1-t)*i+t*e}function Cp(i,e,t,n){return Gr(i,e,1-Math.exp(-t*n))}function Ip(i,e=1){return e-Math.abs(pu(i,e*2)-e)}function Pp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Lp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Dp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Np(i,e){return i+Math.random()*(e-i)}function Up(i){return i*(.5-Math.random())}function Fp(i){i!==void 0&&(Ah=i);let e=Ah+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Op(i){return i*Vr}function Bp(i){return i*vs}function Hp(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function zp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function kp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vp(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*h,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*u,a*c);break;default:Qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Jn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var et={DEG2RAD:Vr,RAD2DEG:vs,generateUUID:Xn,clamp:ft,euclideanModulo:pu,mapLinear:Ap,inverseLerp:Rp,lerp:Gr,damp:Cp,pingpong:Ip,smoothstep:Pp,smootherstep:Lp,randInt:Dp,randFloat:Np,randFloatSpread:Up,seededRandom:Fp,degToRad:Op,radToDeg:Bp,isPowerOfTwo:Hp,ceilPowerOfTwo:zp,floorPowerOfTwo:kp,setQuaternionFromProperEuler:Vp,normalize:wt,denormalize:Jn},vu=class vu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};vu.prototype.isVector2=!0;var be=vu,Le=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(h!==x||l!==d||c!==f||u!==g){let p=l*d+c*f+u*g+h*x;p<0&&(d=-d,f=-f,g=-g,x=-x,p=-p);let m=1-a;if(p<.9995){let T=Math.acos(p),A=Math.sin(T);m=Math.sin(m*T)/A,a=Math.sin(a*T)/A,l=l*m+d*a,c=c*m+f*a,u=u*m+g*a,h=h*m+x*a}else{l=l*m+d*a,c=c*m+f*a,u=u*m+g*a,h=h*m+x*a;let T=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=T,c*=T,u*=T,h*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-a*f,e[t+2]=c*g+u*f+a*d-l*h,e[t+3]=u*g-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),h=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:Qe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Mu=class Mu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sc.copy(this).projectOnVector(e),this.sub(sc)}reflect(e){return this.sub(sc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Mu.prototype.isVector3=!0;var S=Mu,sc=new S,Rh=new Le,Su=class Su{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=s[0],p=s[3],m=s[6],T=s[1],A=s[4],M=s[7],b=s[2],w=s[5],E=s[8];return r[0]=o*x+a*T+l*b,r[3]=o*p+a*A+l*w,r[6]=o*m+a*M+l*E,r[1]=c*x+u*T+h*b,r[4]=c*p+u*A+h*w,r[7]=c*m+u*M+h*E,r[2]=d*x+f*T+g*b,r[5]=d*p+f*A+g*w,r[8]=d*m+f*M+g*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=h*x,e[1]=(s*c-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=d*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return _s("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(rc.makeScale(e,t)),this}rotate(e){return _s("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(rc.makeRotation(-e)),this}translate(e,t){return _s("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(rc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Su.prototype.isMatrix3=!0;var at=Su,rc=new at,Ch=new at().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ih=new at().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gp(){let i={enabled:!0,workingColorSpace:_n,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Et&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Et&&(s.r=js(s.r),s.g=js(s.g),s.b=js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fi?Yr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _s("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _s("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[_n]:{primaries:e,whitePoint:n,transfer:Yr,toXYZ:Ch,fromXYZ:Ih,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:Ch,fromXYZ:Ih,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),i}var pt=Gp();function Ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function js(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Fs,Ta=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Fs===void 0&&(Fs=er("canvas")),Fs.width=e.width,Fs.height=e.height;let s=Fs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Fs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=er("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ri(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ri(t[n]/255)*255):t[n]=Ri(t[n]);return{data:t,width:e.width,height:e.height}}else return Qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wp=0,nr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Xn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(oc(s[o].image)):r.push(oc(s[o]))}else r=oc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function oc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ta.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Qe("Texture: Unable to serialize Texture."),{})}var Xp=0,ac=new S,Jt=class i extends qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Wn,s=Wn,r=Yt,o=ii,a=Hn,l=Pn,c=i.DEFAULT_ANISOTROPY,u=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Xn(),this.name="",this.source=new nr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ac).x}get height(){return this.source.getSize(ac).y}get depth(){return this.source.getSize(ac).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==su)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ki:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case Js:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ki:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case Js:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=su;Jt.DEFAULT_ANISOTROPY=1;var bu=class bu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,M=(f+1)/2,b=(m+1)/2,w=(u+d)/4,E=(h+x)/4,_=(g+p)/4;return A>M&&A>b?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=w/n,r=E/n):M>b?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=E/r,s=_/r),this.set(n,s,r,t),this}let T=Math.sqrt((p-g)*(p-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(h-x)/T,this.z=(d-u)/T,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bu.prototype.isVector4=!0;var Ct=bu,wa=class extends qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Jt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new nr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},En=class extends wa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Kr=class extends Jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Aa=class extends Jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ka=class Ka{constructor(e,t,n,s,r,o,a,l,c,u,h,d,f,g,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,h,d,f,g,x,p)}set(e,t,n,s,r,o,a,l,c,u,h,d,f,g,x,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ka().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Os.setFromMatrixColumn(e,0).length(),r=1/Os.setFromMatrixColumn(e,1).length(),o=1/Os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=o*u,f=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d-x*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,f=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=x-d*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-x*h}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qp,e,Yp)}lookAt(e,t,n){let s=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),Vi.crossVectors(n,Nn),Vi.lengthSq()===0&&(Math.abs(n.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),Vi.crossVectors(n,Nn)),Vi.normalize(),Vo.crossVectors(Nn,Vi),s[0]=Vi.x,s[4]=Vo.x,s[8]=Nn.x,s[1]=Vi.y,s[5]=Vo.y,s[9]=Nn.y,s[2]=Vi.z,s[6]=Vo.z,s[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],p=n[10],m=n[14],T=n[3],A=n[7],M=n[11],b=n[15],w=s[0],E=s[4],_=s[8],R=s[12],L=s[1],O=s[5],N=s[9],z=s[13],D=s[2],G=s[6],Z=s[10],V=s[14],oe=s[3],$=s[7],se=s[11],re=s[15];return r[0]=o*w+a*L+l*D+c*oe,r[4]=o*E+a*O+l*G+c*$,r[8]=o*_+a*N+l*Z+c*se,r[12]=o*R+a*z+l*V+c*re,r[1]=u*w+h*L+d*D+f*oe,r[5]=u*E+h*O+d*G+f*$,r[9]=u*_+h*N+d*Z+f*se,r[13]=u*R+h*z+d*V+f*re,r[2]=g*w+x*L+p*D+m*oe,r[6]=g*E+x*O+p*G+m*$,r[10]=g*_+x*N+p*Z+m*se,r[14]=g*R+x*z+p*V+m*re,r[3]=T*w+A*L+M*D+b*oe,r[7]=T*E+A*O+M*G+b*$,r[11]=T*_+A*N+M*Z+b*se,r[15]=T*R+A*z+M*V+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],x=e[7],p=e[11],m=e[15],T=l*f-c*d,A=a*f-c*h,M=a*d-l*h,b=o*f-c*u,w=o*d-l*u,E=o*h-a*u;return t*(x*T-p*A+m*M)-n*(g*T-p*b+m*w)+s*(g*A-x*b+m*E)-r*(g*M-x*w+p*E)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-n*(r*u-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],x=e[13],p=e[14],m=e[15],T=t*a-n*o,A=t*l-s*o,M=t*c-r*o,b=n*l-s*a,w=n*c-r*a,E=s*c-r*l,_=u*x-h*g,R=u*p-d*g,L=u*m-f*g,O=h*p-d*x,N=h*m-f*x,z=d*m-f*p,D=T*z-A*N+M*O+b*L-w*R+E*_;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/D;return e[0]=(a*z-l*N+c*O)*G,e[1]=(s*N-n*z-r*O)*G,e[2]=(x*E-p*w+m*b)*G,e[3]=(d*w-h*E-f*b)*G,e[4]=(l*L-o*z-c*R)*G,e[5]=(t*z-s*L+r*R)*G,e[6]=(p*M-g*E-m*A)*G,e[7]=(u*E-d*M+f*A)*G,e[8]=(o*N-a*L+c*_)*G,e[9]=(n*L-t*N-r*_)*G,e[10]=(g*w-x*M+m*T)*G,e[11]=(h*M-u*w-f*T)*G,e[12]=(a*R-o*O-l*_)*G,e[13]=(t*O-n*R+s*_)*G,e[14]=(x*A-g*b-p*T)*G,e[15]=(u*b-h*A+d*T)*G,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,g=r*h,x=o*u,p=o*h,m=a*h,T=l*c,A=l*u,M=l*h,b=n.x,w=n.y,E=n.z;return s[0]=(1-(x+m))*b,s[1]=(f+M)*b,s[2]=(g-A)*b,s[3]=0,s[4]=(f-M)*w,s[5]=(1-(d+m))*w,s[6]=(p+T)*w,s[7]=0,s[8]=(g+A)*E,s[9]=(p-T)*E,s[10]=(1-(d+x))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Os.set(s[0],s[1],s[2]).length(),a=Os.set(s[4],s[5],s[6]).length(),l=Os.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Kn.copy(this);let c=1/o,u=1/a,h=1/l;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=h,Kn.elements[9]*=h,Kn.elements[10]*=h,t.setFromRotationMatrix(Kn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=Qn,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===Qn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Qs)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Qn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===Qn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Qs)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ka.prototype.isMatrix4=!0;var ut=Ka,Os=new S,Kn=new ut,qp=new S(0,0,0),Yp=new S(1,1,1),Vi=new S,Vo=new S,Nn=new S,Ph=new ut,Lh=new Le,Tn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ft(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ph,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lh.setFromEuler(this),this.setFromQuaternion(Lh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER="XYZ";var ir=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Zp=0,Dh=new S,Bs=new Le,Si=new ut,Go=new S,Dr=new S,Kp=new S,jp=new Le,Nh=new S(1,0,0),Uh=new S(0,1,0),Fh=new S(0,0,1),Oh={type:"added"},$p={type:"removed"},Hs={type:"childadded",child:null},lc={type:"childremoved",child:null},Ht=class i extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new S,t=new Tn,n=new Le,s=new S(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new at}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ir,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.premultiply(Bs),this}rotateX(e){return this.rotateOnAxis(Nh,e)}rotateY(e){return this.rotateOnAxis(Uh,e)}rotateZ(e){return this.rotateOnAxis(Fh,e)}translateOnAxis(e,t){return Dh.copy(e).applyQuaternion(this.quaternion),this.position.add(Dh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nh,e)}translateY(e){return this.translateOnAxis(Uh,e)}translateZ(e){return this.translateOnAxis(Fh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Go.copy(e):Go.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(Dr,Go,this.up):Si.lookAt(Go,Dr,this.up),this.quaternion.setFromRotationMatrix(Si),s&&(Si.extractRotation(s.matrixWorld),Bs.setFromRotationMatrix(Si),this.quaternion.premultiply(Bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(st("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Oh),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($p),lc.child=e,this.dispatchEvent(lc),lc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Oh),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,Kp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,jp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ht.DEFAULT_UP=new S(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var At=class extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}},Jp={type:"move"},sr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},rf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},Wo={h:0,s:0,l:0};function cc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var nt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=pt.workingColorSpace){if(e=pu(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=cc(o,r,e+1/3),this.g=cc(o,r,e),this.b=cc(o,r,e-1/3)}return pt.colorSpaceToWorking(this,s),this}setStyle(e,t=bt){function n(r){r!==void 0&&parseFloat(r)<1&&Qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){let n=rf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return pt.workingToColorSpace(dn.copy(this),e),Math.round(ft(dn.r*255,0,255))*65536+Math.round(ft(dn.g*255,0,255))*256+Math.round(ft(dn.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(dn.copy(this),t);let n=dn.r,s=dn.g,r=dn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(dn.copy(this),t),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=bt){pt.workingToColorSpace(dn.copy(this),e);let t=dn.r,n=dn.g,s=dn.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(Wo);let n=Gr(Gi.h,Wo.h,t),s=Gr(Gi.s,Wo.s,t),r=Gr(Gi.l,Wo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},dn=new nt;nt.NAMES=rf;var jr=class extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},jn=new S,bi=new S,uc=new S,Ei=new S,zs=new S,ks=new S,Bh=new S,hc=new S,dc=new S,fc=new S,pc=new Ct,mc=new Ct,gc=new Ct,Zi=class i{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),jn.subVectors(e,t),s.cross(jn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){jn.subVectors(s,t),bi.subVectors(n,t),uc.subVectors(e,t);let o=jn.dot(jn),a=jn.dot(bi),l=jn.dot(uc),c=bi.dot(bi),u=bi.dot(uc),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(c*l-a*u)*d,g=(o*u-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ei)===null?!1:Ei.x>=0&&Ei.y>=0&&Ei.x+Ei.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ei.x),l.addScaledVector(o,Ei.y),l.addScaledVector(a,Ei.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return pc.setScalar(0),mc.setScalar(0),gc.setScalar(0),pc.fromBufferAttribute(e,t),mc.fromBufferAttribute(e,n),gc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(pc,r.x),o.addScaledVector(mc,r.y),o.addScaledVector(gc,r.z),o}static isFrontFacing(e,t,n,s){return jn.subVectors(n,t),bi.subVectors(e,t),jn.cross(bi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),jn.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;zs.subVectors(s,n),ks.subVectors(r,n),hc.subVectors(e,n);let l=zs.dot(hc),c=ks.dot(hc);if(l<=0&&c<=0)return t.copy(n);dc.subVectors(e,s);let u=zs.dot(dc),h=ks.dot(dc);if(u>=0&&h<=u)return t.copy(s);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(zs,o);fc.subVectors(e,r);let f=zs.dot(fc),g=ks.dot(fc);if(g>=0&&f<=g)return t.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ks,a);let p=u*g-f*h;if(p<=0&&h-u>=0&&f-g>=0)return Bh.subVectors(r,s),a=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(Bh,a);let m=1/(p+x+d);return o=x*m,a=d*m,t.copy(n).addScaledVector(zs,o).addScaledVector(ks,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qt=class{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,$n):$n.fromBufferAttribute(r,o),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xo.copy(n.boundingBox)),Xo.applyMatrix4(e.matrixWorld),this.union(Xo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Nr),qo.subVectors(this.max,Nr),Vs.subVectors(e.a,Nr),Gs.subVectors(e.b,Nr),Ws.subVectors(e.c,Nr),Wi.subVectors(Gs,Vs),Xi.subVectors(Ws,Gs),us.subVectors(Vs,Ws);let t=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-us.z,us.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,us.z,0,-us.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-us.y,us.x,0];return!_c(t,Vs,Gs,Ws,qo)||(t=[1,0,0,0,1,0,0,0,1],!_c(t,Vs,Gs,Ws,qo))?!1:(Yo.crossVectors(Wi,Xi),t=[Yo.x,Yo.y,Yo.z],_c(t,Vs,Gs,Ws,qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ti=[new S,new S,new S,new S,new S,new S,new S,new S],$n=new S,Xo=new Qt,Vs=new S,Gs=new S,Ws=new S,Wi=new S,Xi=new S,us=new S,Nr=new S,qo=new S,Yo=new S,hs=new S;function _c(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){hs.fromArray(i,r);let a=s.x*Math.abs(hs.x)+s.y*Math.abs(hs.y)+s.z*Math.abs(hs.z),l=e.dot(hs),c=t.dot(hs),u=n.dot(hs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Kt=new S,Zo=new be,Qp=0,Xt=class extends qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=du,this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Zo.fromBufferAttribute(this,t),Zo.applyMatrix3(e),this.setXY(t,Zo.x,Zo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),s=wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),s=wt(s,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ms=class extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var $r=class extends Xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Rt=class extends Xt{constructor(e,t,n){super(new Float32Array(e),t,n)}},em=new Qt,Ur=new S,xc=new S,wn=class{constructor(e=new S,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):em.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);let t=Ur.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ur,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(xc)),this.expandByPoint(Ur.copy(e.center).sub(xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},tm=0,Gn=new ut,yc=new Ht,Xs=new S,Un=new Qt,Fr=new Qt,on=new S,Bt=class i extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tp(e)?$r:Ms)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new at().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,n){return Gn.makeTranslation(e,t,n),this.applyMatrix4(Gn),this}scale(e,t,n){return Gn.makeScale(e,t,n),this.applyMatrix4(Gn),this}lookAt(e){return yc.lookAt(e),yc.updateMatrix(),this.applyMatrix4(yc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xs).negate(),this.translate(Xs.x,Xs.y,Xs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Rt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Un.setFromBufferAttribute(r),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(e){let n=this.boundingSphere.center;if(Un.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Fr.setFromBufferAttribute(a),this.morphTargetsRelative?(on.addVectors(Un.min,Fr.min),Un.expandByPoint(on),on.addVectors(Un.max,Fr.max),Un.expandByPoint(on)):(Un.expandByPoint(Fr.min),Un.expandByPoint(Fr.max))}Un.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)on.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(on));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)on.fromBufferAttribute(a,c),l&&(Xs.fromBufferAttribute(e,c),on.add(Xs)),s=Math.max(s,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Xt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let _=0;_<n.count;_++)a[_]=new S,l[_]=new S;let c=new S,u=new S,h=new S,d=new be,f=new be,g=new be,x=new S,p=new S;function m(_,R,L){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,R),h.fromBufferAttribute(n,L),d.fromBufferAttribute(r,_),f.fromBufferAttribute(r,R),g.fromBufferAttribute(r,L),u.sub(c),h.sub(c),f.sub(d),g.sub(d);let O=1/(f.x*g.y-g.x*f.y);isFinite(O)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(O),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(O),a[_].add(x),a[R].add(x),a[L].add(x),l[_].add(p),l[R].add(p),l[L].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let _=0,R=T.length;_<R;++_){let L=T[_],O=L.start,N=L.count;for(let z=O,D=O+N;z<D;z+=3)m(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let A=new S,M=new S,b=new S,w=new S;function E(_){b.fromBufferAttribute(s,_),w.copy(b);let R=a[_];A.copy(R),A.sub(b.multiplyScalar(b.dot(R))).normalize(),M.crossVectors(w,R);let O=M.dot(l[_])<0?-1:1;o.setXYZW(_,A.x,A.y,A.z,O)}for(let _=0,R=T.length;_<R;++_){let L=T[_],O=L.start,N=L.count;for(let z=O,D=O+N;z<D;z+=3)E(e.getX(z+0)),E(e.getX(z+1)),E(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new S,r=new S,o=new S,a=new S,l=new S,c=new S,u=new S,h=new S;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,p),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),f=0,g=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let m=0;m<u;m++)d[g++]=c[f++]}return new Xt(d,u,h)}if(this.index===null)return Qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},rr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=du,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},gn=new S,or=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),s=wt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),s=wt(s,this.array),r=wt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Zr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Zr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},vc=new S,nm=new S,im=new at,fn=class{constructor(e=new S(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=vc.subVectors(n,t).cross(nm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(vc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||im.getNormalMatrix(e),s=this.coplanarPoint(vc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},sm=0,An=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=yr,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kc,this.blendDst=jc,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ga,this.stencilZFail=ga,this.stencilZPass=ga,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Qe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new nt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new fn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new be().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new be().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var wi=new S,Mc=new S,Ko=new S,jo=new S,hi=class{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wi.copy(this.origin).addScaledVector(this.direction,t),wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Mc.copy(e).add(t).multiplyScalar(.5),Ko.copy(t).sub(e).normalize(),jo.copy(this.origin).sub(Mc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ko),a=jo.dot(this.direction),l=-jo.dot(Ko),c=jo.lengthSq(),u=Math.abs(1-o*o),h,d,f,g;if(u>0)if(h=o*l-a,d=o*a-l,g=r*u,h>=0)if(d>=-g)if(d<=g){let x=1/u;h*=x,d*=x,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Mc).addScaledVector(Ko,d),f}intersectSphere(e,t){if(e.radius<0)return null;wi.subVectors(e.center,this.origin);let n=wi.dot(this.direction),s=wi.dot(wi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,wi)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,u=a.z,h=e.x-o.x,d=e.y-o.y,f=e.z-o.z,g=t.x-o.x,x=t.y-o.y,p=t.z-o.z,m=n.x-o.x,T=n.y-o.y,A=n.z-o.z,M=Math.abs(l),b=Math.abs(c),w=Math.abs(u),E,_,R,L,O,N,z,D,G,Z,V,oe;if(M>=b&&M>=w?(R=l,N=h,G=g,oe=m,l>=0?(E=c,_=u,L=d,O=f,z=x,D=p,Z=T,V=A):(E=u,_=c,L=f,O=d,z=p,D=x,Z=A,V=T)):b>=w?(R=c,N=d,G=x,oe=T,c>=0?(E=u,_=l,L=f,O=h,z=p,D=g,Z=A,V=m):(E=l,_=u,L=h,O=f,z=g,D=p,Z=m,V=A)):(R=u,N=f,G=p,oe=A,u>=0?(E=l,_=c,L=h,O=d,z=g,D=x,Z=m,V=T):(E=c,_=l,L=d,O=h,z=x,D=g,Z=T,V=m)),R===0)return null;let $=E/R,se=_/R,re=1/R,ye=L-$*N,Me=O-se*N,We=z-$*G,ke=D-se*G,W=Z-$*oe,I=V-se*oe,P=W*ke-I*We,F=ye*I-Me*W,K=We*Me-ke*ye;if(s){if(P<0||F<0||K<0)return null}else if((P<0||F<0||K<0)&&(P>0||F>0||K>0))return null;let te=P+F+K;if(te===0)return null;let ge=re*(P*N+F*G+K*oe);return(te>0?ge<0:ge>0)?null:this.at(ge/te,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ei=class extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=$c,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Hh=new ut,ds=new hi,$o=new wn,zh=new S,Jo=new S,Qo=new S,ea=new S,Sc=new S,ta=new S,kh=new S,na=new S,_t=class extends Ht{constructor(e=new Bt,t=new ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],h=r[l];u!==0&&(Sc.fromBufferAttribute(h,e),o?ta.addScaledVector(Sc,u):ta.addScaledVector(Sc.sub(t),u))}t.add(ta)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$o.copy(n.boundingSphere),$o.applyMatrix4(r),ds.copy(e.ray).recast(e.near),!($o.containsPoint(ds.origin)===!1&&(ds.intersectSphere($o,zh)===null||ds.origin.distanceToSquared(zh)>(e.far-e.near)**2))&&(Hh.copy(r).invert(),ds.copy(e.ray).applyMatrix4(Hh),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ds)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=o[p.materialIndex],T=Math.max(p.start,f.start),A=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let M=T,b=A;M<b;M+=3){let w=a.getX(M),E=a.getX(M+1),_=a.getX(M+2);s=ia(this,m,e,n,c,u,h,w,E,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let T=a.getX(p),A=a.getX(p+1),M=a.getX(p+2);s=ia(this,o,e,n,c,u,h,T,A,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=o[p.materialIndex],T=Math.max(p.start,f.start),A=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=T,b=A;M<b;M+=3){let w=M,E=M+1,_=M+2;s=ia(this,m,e,n,c,u,h,w,E,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let T=p,A=p+1,M=p+2;s=ia(this,o,e,n,c,u,h,T,A,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function rm(i,e,t,n,s,r,o,a){let l;if(e.side===xn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Yn,a),l===null)return null;na.copy(a),na.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(na);return c<t.near||c>t.far?null:{distance:c,point:na.clone(),object:i}}function ia(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Jo),i.getVertexPosition(l,Qo),i.getVertexPosition(c,ea);let u=rm(i,e,t,n,Jo,Qo,ea,kh);if(u){let h=new S;Zi.getBarycoord(kh,Jo,Qo,ea,h),s&&(u.uv=Zi.getInterpolatedAttribute(s,a,l,c,h,new be)),r&&(u.uv1=Zi.getInterpolatedAttribute(r,a,l,c,h,new be)),o&&(u.normal=Zi.getInterpolatedAttribute(o,a,l,c,h,new S),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new S,materialIndex:0};Zi.getNormal(Jo,Qo,ea,d.normal),u.face=d,u.barycoord=h}return u}var Or=new Ct,Vh=new Ct,Gh=new Ct,om=new Ct,Wh=new ut,sa=new S,bc=new wn,Xh=new ut,Ec=new hi,ji=class extends _t{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Pc,this.bindMatrix=new ut,this.bindMatrixInverse=new ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sa),this.boundingBox.expandByPoint(sa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sa),this.boundingSphere.expandByPoint(sa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bc.copy(this.boundingSphere),bc.applyMatrix4(s),e.ray.intersectsSphere(bc)!==!1&&(Xh.copy(s).invert(),Ec.copy(e.ray).applyMatrix4(Xh),!(this.boundingBox!==null&&Ec.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ec)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ct,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Pc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Qe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Vh.fromBufferAttribute(s.attributes.skinIndex,e),Gh.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Or.copy(t),t.set(0,0,0,0)):(Or.set(...t,1),t.set(0,0,0)),Or.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Gh.getComponent(r);if(o!==0){let a=Vh.getComponent(r);Wh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(om.copy(Or).applyMatrix4(Wh),o)}}return t.isVector4&&(t.w=Or.w),t.applyMatrix4(this.bindMatrixInverse)}},ar=class extends Ht{constructor(){super(),this.isBone=!0,this.type="Bone"}},lr=class extends Jt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=qt,u=qt,h,d){super(null,o,a,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},qh=new ut,am=new ut,Jr=class i{constructor(e=[],t=[]){this.uuid=Xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Qe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ut)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ut;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:am;qh.multiplyMatrices(a,t[r]),qh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new lr(t,e,e,Hn,Bn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(Qe("Skeleton: No bone found with UUID:",r),o=new ar),this.bones.push(o),this.boneInverses.push(new ut().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Ci=class extends Xt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},qs=new ut,Yh=new ut,ra=[],Zh=new Qt,lm=new ut,Br=new _t,Hr=new wn,Qr=class extends _t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ci(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,lm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qs),Zh.copy(e.boundingBox).applyMatrix4(qs),this.boundingBox.union(Zh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qs),Hr.copy(e.boundingSphere).applyMatrix4(qs),this.boundingSphere.union(Hr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hr.copy(this.boundingSphere),Hr.applyMatrix4(n),e.ray.intersectsSphere(Hr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,qs),Yh.multiplyMatrices(n,qs),Br.matrixWorld=Yh,Br.raycast(e,ra);for(let o=0,a=ra.length;o<a;o++){let l=ra[o];l.instanceId=r,l.object=this,t.push(l)}ra.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ci(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lr(new Float32Array(s*this.count),s,this.count,nl,Bn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},fs=new wn,cm=new be(.5,.5),oa=new S,cr=class{constructor(e=new fn,t=new fn,n=new fn,s=new fn,r=new fn,o=new fn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],g=r[8],x=r[9],p=r[10],m=r[11],T=r[12],A=r[13],M=r[14],b=r[15];if(s[0].setComponents(c-o,f-u,m-g,b-T).normalize(),s[1].setComponents(c+o,f+u,m+g,b+T).normalize(),s[2].setComponents(c+a,f+h,m+x,b+A).normalize(),s[3].setComponents(c-a,f-h,m-x,b-A).normalize(),n)s[4].setComponents(l,d,p,M).normalize(),s[5].setComponents(c-l,f-d,m-p,b-M).normalize();else if(s[4].setComponents(c-l,f-d,m-p,b-M).normalize(),t===Qn)s[5].setComponents(c+l,f+d,m+p,b+M).normalize();else if(t===Qs)s[5].setComponents(l,d,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(e){fs.center.set(0,0,0);let t=cm.distanceTo(e.center);return fs.radius=.7071067811865476+t,fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(oa.x=s.normal.x>0?e.max.x:e.min.x,oa.y=s.normal.y>0?e.max.y:e.min.y,oa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(oa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ti=class extends An{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ra=new S,Ca=new S,Kh=new ut,zr=new hi,aa=new wn,Tc=new S,jh=new S,di=class extends Ht{constructor(e=new Bt,t=new ti){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ra.fromBufferAttribute(t,s-1),Ca.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ra.distanceTo(Ca);e.setAttribute("lineDistance",new Rt(n,1))}else Qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(s),aa.radius+=r,e.ray.intersectsSphere(aa)===!1)return;Kh.copy(s).invert(),zr.copy(e.ray).applyMatrix4(Kh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,p=g-1;x<p;x+=c){let m=u.getX(x),T=u.getX(x+1),A=la(this,e,zr,l,m,T,x);A&&t.push(A)}if(this.isLineLoop){let x=u.getX(g-1),p=u.getX(f),m=la(this,e,zr,l,x,p,g-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,p=g-1;x<p;x+=c){let m=la(this,e,zr,l,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=la(this,e,zr,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function la(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Ra.fromBufferAttribute(a,s),Ca.fromBufferAttribute(a,r),t.distanceSqToSegment(Ra,Ca,Tc,jh)>n)return;Tc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Tc);if(!(c<e.near||c>e.far))return{distance:c,point:jh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var $h=new S,Jh=new S,Ss=class extends di{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)$h.fromBufferAttribute(t,s),Jh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+$h.distanceTo(Jh);e.setAttribute("lineDistance",new Rt(n,1))}else Qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},eo=class extends di{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ur=class extends An{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Qh=new ut,Dc=new hi,ca=new wn,ua=new S,to=class extends Ht{constructor(e=new Bt,t=new ur){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ca.copy(n.boundingSphere),ca.applyMatrix4(s),ca.radius+=r,e.ray.intersectsSphere(ca)===!1)return;Qh.copy(s).invert(),Dc.copy(e.ray).applyMatrix4(Qh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let p=c.getX(g);ua.fromBufferAttribute(h,p),ed(ua,p,l,s,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=d,x=f;g<x;g++)ua.fromBufferAttribute(h,g),ed(ua,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ed(i,e,t,n,s,r,o){let a=Dc.distanceSqToPoint(i);if(a<t){let l=new S;Dc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var no=class extends Jt{constructor(e=[],t=is,n,s,r,o,a,l,c,u){super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},fi=class extends Jt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var $i=class extends Jt{constructor(e,t,n=si,s,r,o,a=qt,l=qt,c,u=ui,h=1){if(u!==ui&&u!==ss)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new nr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ia=class extends $i{constructor(e,t=si,n=is,s,r,o=qt,a=qt,l,c=ui){let u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},io=class extends Jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Rn=class i extends Bt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(h,2));function g(x,p,m,T,A,M,b,w,E,_,R){let L=M/E,O=b/_,N=M/2,z=b/2,D=w/2,G=E+1,Z=_+1,V=0,oe=0,$=new S;for(let se=0;se<Z;se++){let re=se*O-z;for(let ye=0;ye<G;ye++){let Me=ye*L-N;$[x]=Me*T,$[p]=re*A,$[m]=D,c.push($.x,$.y,$.z),$[x]=0,$[p]=0,$[m]=w>0?1:-1,u.push($.x,$.y,$.z),h.push(ye/E),h.push(1-se/_),V+=1}}for(let se=0;se<_;se++)for(let re=0;re<E;re++){let ye=d+re+G*se,Me=d+re+G*(se+1),We=d+(re+1)+G*(se+1),ke=d+(re+1)+G*se;l.push(ye,Me,ke),l.push(Me,We,ke),oe+=6}a.addGroup(f,oe,R),f+=oe,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var so=class i extends Bt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],d=[],f=[],g=0,x=[],p=n/2,m=0;T(),o===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new Rt(h,3)),this.setAttribute("normal",new Rt(d,3)),this.setAttribute("uv",new Rt(f,2));function T(){let M=new S,b=new S,w=0,E=(t-e)/n;for(let _=0;_<=r;_++){let R=[],L=_/r,O=L*(t-e)+e;for(let N=0;N<=s;N++){let z=N/s,D=z*l+a,G=Math.sin(D),Z=Math.cos(D);b.x=O*G,b.y=-L*n+p,b.z=O*Z,h.push(b.x,b.y,b.z),M.set(G,E,Z).normalize(),d.push(M.x,M.y,M.z),f.push(z,1-L),R.push(g++)}x.push(R)}for(let _=0;_<s;_++)for(let R=0;R<r;R++){let L=x[R][_],O=x[R+1][_],N=x[R+1][_+1],z=x[R][_+1];(e>0||R!==0)&&(u.push(L,O,z),w+=3),(t>0||R!==r-1)&&(u.push(O,N,z),w+=3)}c.addGroup(m,w,0),m+=w}function A(M){let b=g,w=new be,E=new S,_=0,R=M===!0?e:t,L=M===!0?1:-1;for(let N=1;N<=s;N++)h.push(0,p*L,0),d.push(0,L,0),f.push(.5,.5),g++;let O=g;for(let N=0;N<=s;N++){let D=N/s*l+a,G=Math.cos(D),Z=Math.sin(D);E.x=R*Z,E.y=p*L,E.z=R*G,h.push(E.x,E.y,E.z),d.push(0,L,0),w.x=G*.5+.5,w.y=Z*.5*L+.5,f.push(w.x,w.y),g++}for(let N=0;N<s;N++){let z=b+N,D=O+N;M===!0?u.push(D,D+1,z):u.push(D+1,D,z),_+=3}c.addGroup(m,_,M===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Qe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let u=n[s],d=n[s+1]-u,f=(o-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new be:new S);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new S,s=[],r=[],o=[],a=new S,l=new ut;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new S)}r[0]=new S,o[0]=new S;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ft(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(ft(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},hr=class extends Fn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new be){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Pa=class extends hr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function mu(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var td=new S,nd=new S,wc=new mu,Ac=new mu,Rc=new mu,dr=class extends Fn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new S){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(nd.subVectors(s[0],s[1]).add(s[0]),c=nd);let h=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(td.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=td),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),wc.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,x,p),Ac.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,x,p),Rc.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,x,p)}else this.curveType==="catmullrom"&&(wc.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Ac.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Rc.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(wc.calc(l),Ac.calc(l),Rc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new S().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function id(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function um(i,e){let t=1-i;return t*t*e}function hm(i,e){return 2*(1-i)*i*e}function dm(i,e){return i*i*e}function Wr(i,e,t,n){return um(i,e)+hm(i,t)+dm(i,n)}function fm(i,e){let t=1-i;return t*t*t*e}function pm(i,e){let t=1-i;return 3*t*t*i*e}function mm(i,e){return 3*(1-i)*i*i*e}function gm(i,e){return i*i*i*e}function Xr(i,e,t,n,s){return fm(i,e)+pm(i,t)+mm(i,n)+gm(i,s)}var ro=class extends Fn{constructor(e=new be,t=new be,n=new be,s=new be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new be){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xr(e,s.x,r.x,o.x,a.x),Xr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},La=class extends Fn{constructor(e=new S,t=new S,n=new S,s=new S){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new S){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xr(e,s.x,r.x,o.x,a.x),Xr(e,s.y,r.y,o.y,a.y),Xr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},oo=class extends Fn{constructor(e=new be,t=new be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new be){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Da=class extends Fn{constructor(e=new S,t=new S){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new S){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new S){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ao=class extends Fn{constructor(e=new be,t=new be,n=new be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new be){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Wr(e,s.x,r.x,o.x),Wr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Na=class extends Fn{constructor(e=new S,t=new S,n=new S){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new S){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Wr(e,s.x,r.x,o.x),Wr(e,s.y,r.y,o.y),Wr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lo=class extends Fn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new be){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(id(a,l.x,c.x,u.x,h.x),id(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new be().fromArray(s))}return this}},Nc=Object.freeze({__proto__:null,ArcCurve:Pa,CatmullRomCurve3:dr,CubicBezierCurve:ro,CubicBezierCurve3:La,EllipseCurve:hr,LineCurve:oo,LineCurve3:Da,QuadraticBezierCurve:ao,QuadraticBezierCurve3:Na,SplineCurve:lo}),Ua=class extends Fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Nc[s.type]().fromJSON(s))}return this}},co=class extends Ua{constructor(e){super(),this.type="Path",this.currentPoint=new be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new oo(this.currentPoint.clone(),new be(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new ao(this.currentPoint.clone(),new be(e,t),new be(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new ro(this.currentPoint.clone(),new be(e,t),new be(n,s),new be(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new lo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new hr(e,t,n,s,r,o,a,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},fr=class extends co{constructor(e){super(e),this.uuid=Xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new co().fromJSON(s))}return this}};function _m(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=of(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Sm(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let u=a,h=l;for(let d=t;d<s;d+=t){let f=i[d],g=i[d+1];f<a&&(a=f),g<l&&(l=g),f>u&&(u=f),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return uo(r,o,t,a,l,c,0),o}function of(i,e,t,n,s){let r;if(s===Dm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=sd(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=sd(o/n|0,i[o],i[o+1],r);return r&&pr(r,r.next)&&(fo(r),r=r.next),r}function bs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(pr(t,t.next)||Gt(t.prev,t,t.next)===0)){if(fo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function uo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Am(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?ym(i,n,s,r):xm(i)){e.push(l.i,i.i,c.i),fo(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=vm(bs(i),e),uo(i,e,t,n,s,r,2)):o===2&&Mm(i,e,t,n,s,r):uo(bs(i),e,t,n,s,r,1);break}}}function xm(i){let e=i.prev,t=i,n=i.next;if(Gt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=Math.min(s,r,o),h=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&kr(s,a,r,l,o,c,g.x,g.y)&&Gt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ym(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Gt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,d=o.y,f=Math.min(a,l,c),g=Math.min(u,h,d),x=Math.max(a,l,c),p=Math.max(u,h,d),m=Uc(f,g,e,t,n),T=Uc(x,p,e,t,n),A=i.prevZ,M=i.nextZ;for(;A&&A.z>=m&&M&&M.z<=T;){if(A.x>=f&&A.x<=x&&A.y>=g&&A.y<=p&&A!==s&&A!==o&&kr(a,u,l,h,c,d,A.x,A.y)&&Gt(A.prev,A,A.next)>=0||(A=A.prevZ,M.x>=f&&M.x<=x&&M.y>=g&&M.y<=p&&M!==s&&M!==o&&kr(a,u,l,h,c,d,M.x,M.y)&&Gt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;A&&A.z>=m;){if(A.x>=f&&A.x<=x&&A.y>=g&&A.y<=p&&A!==s&&A!==o&&kr(a,u,l,h,c,d,A.x,A.y)&&Gt(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;M&&M.z<=T;){if(M.x>=f&&M.x<=x&&M.y>=g&&M.y<=p&&M!==s&&M!==o&&kr(a,u,l,h,c,d,M.x,M.y)&&Gt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function vm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!pr(n,s)&&lf(n,t,t.next,s)&&ho(n,s)&&ho(s,n)&&(e.push(n.i,t.i,s.i),fo(t),fo(t.next),t=i=s),t=t.next}while(t!==i);return bs(t)}function Mm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Im(o,a)){let l=cf(o,a);o=bs(o,o.next),l=bs(l,l.next),uo(o,e,t,n,s,r,0),uo(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Sm(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=of(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Cm(c))}s.sort(bm);for(let r=0;r<s.length;r++)t=Em(s[r],t);return t}function bm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Em(i,e){let t=Tm(i,e);if(!t)return e;let n=cf(t,i);return bs(n,n.next),bs(t,t.next)}function Tm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(pr(i,t))return t;do{if(pr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,o=t.x<t.next.x?t:t.next,h===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,u=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&af(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let h=Math.abs(s-t.y)/(n-t.x);ho(t,i)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&wm(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function wm(i,e){return Gt(i.prev,i,e.prev)<0&&Gt(e.next,i,i.next)<0}function Am(i,e,t,n){let s=i;do s.z===0&&(s.z=Uc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Rm(s)}function Rm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Uc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Cm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function af(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function kr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&af(i,e,t,n,s,r,o,a)}function Im(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Pm(i,e)&&(ho(i,e)&&ho(e,i)&&Lm(i,e)&&(Gt(i.prev,i,e.prev)||Gt(i,e.prev,e))||pr(i,e)&&Gt(i.prev,i,i.next)>0&&Gt(e.prev,e,e.next)>0)}function Gt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function pr(i,e){return i.x===e.x&&i.y===e.y}function lf(i,e,t,n){let s=da(Gt(i,e,t)),r=da(Gt(i,e,n)),o=da(Gt(t,n,i)),a=da(Gt(t,n,e));return!!(s!==r&&o!==a||s===0&&ha(i,t,e)||r===0&&ha(i,n,e)||o===0&&ha(t,i,n)||a===0&&ha(t,e,n))}function ha(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function da(i){return i>0?1:i<0?-1:0}function Pm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&lf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ho(i,e){return Gt(i.prev,i,i.next)<0?Gt(i,e,i.next)>=0&&Gt(i,i.prev,e)>=0:Gt(i,e,i.prev)<0||Gt(i,i.next,e)<0}function Lm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function cf(i,e){let t=Fc(i.i,i.x,i.y),n=Fc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function sd(i,e,t,n){let s=Fc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function fo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Dm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Oc=class{static triangulate(e,t,n=2){return _m(e,t,n)}},gs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];rd(e),od(n,e);let o=e.length;t.forEach(rd);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,od(n,t[l]);let a=Oc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function rd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function od(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var po=class i extends Bt{constructor(e=new fr([new be(.5,.5),new be(-.5,.5),new be(-.5,-.5),new be(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new Rt(s,3)),this.setAttribute("uv",new Rt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:Nm,A,M=!1,b,w,E,_;if(m){A=m.getSpacedPoints(u),M=!0,d=!1;let X=m.isCatmullRomCurve3?m.closed:!1;b=m.computeFrenetFrames(u,X),w=new S,E=new S,_=new S}d||(p=0,f=0,g=0,x=0);let R=a.extractPoints(c),L=R.shape,O=R.holes;if(!gs.isClockWise(L)){L=L.reverse();for(let X=0,ee=O.length;X<ee;X++){let me=O[X];gs.isClockWise(me)&&(O[X]=me.reverse())}}function z(X){let me=10000000000000001e-36,fe=X[0];for(let de=1;de<=X.length;de++){let Ve=de%X.length,Oe=X[Ve],Se=Oe.x-fe.x,ze=Oe.y-fe.y,k=Se*Se+ze*ze,je=Math.max(Math.abs(Oe.x),Math.abs(Oe.y),Math.abs(fe.x),Math.abs(fe.y)),Ke=me*je*je;if(k<=Ke){X.splice(Ve,1),de--;continue}fe=Oe}}z(L),O.forEach(z);let D=O.length,G=L;for(let X=0;X<D;X++){let ee=O[X];L=L.concat(ee)}function Z(X,ee,me){return ee||st("ExtrudeGeometry: vec does not exist"),X.clone().addScaledVector(ee,me)}let V=L.length;function oe(X,ee,me){let fe,de,Ve,Oe=X.x-ee.x,Se=X.y-ee.y,ze=me.x-X.x,k=me.y-X.y,je=Oe*Oe+Se*Se,Ke=Oe*k-Se*ze;if(Math.abs(Ke)>Number.EPSILON){let C=Math.sqrt(je),y=Math.sqrt(ze*ze+k*k),q=ee.x-Se/C,ne=ee.y+Oe/C,ae=me.x-k/y,_e=me.y+ze/y,Te=((ae-q)*k-(_e-ne)*ze)/(Oe*k-Se*ze);fe=q+Oe*Te-X.x,de=ne+Se*Te-X.y;let le=fe*fe+de*de;if(le<=2)return new be(fe,de);Ve=Math.sqrt(le/2)}else{let C=!1;Oe>Number.EPSILON?ze>Number.EPSILON&&(C=!0):Oe<-Number.EPSILON?ze<-Number.EPSILON&&(C=!0):Math.sign(Se)===Math.sign(k)&&(C=!0),C?(fe=-Se,de=Oe,Ve=Math.sqrt(je)):(fe=Oe,de=Se,Ve=Math.sqrt(je/2))}return new be(fe/Ve,de/Ve)}let $=[];for(let X=0,ee=G.length,me=ee-1,fe=X+1;X<ee;X++,me++,fe++)me===ee&&(me=0),fe===ee&&(fe=0),$[X]=oe(G[X],G[me],G[fe]);let se=[],re,ye=$.concat();for(let X=0,ee=D;X<ee;X++){let me=O[X];re=[];for(let fe=0,de=me.length,Ve=de-1,Oe=fe+1;fe<de;fe++,Ve++,Oe++)Ve===de&&(Ve=0),Oe===de&&(Oe=0),re[fe]=oe(me[fe],me[Ve],me[Oe]);se.push(re),ye=ye.concat(re)}let Me;if(p===0)Me=gs.triangulateShape(G,O);else{let X=[],ee=[];for(let me=0;me<p;me++){let fe=me/p,de=f*Math.cos(fe*Math.PI/2),Ve=g*Math.sin(fe*Math.PI/2)+x;for(let Oe=0,Se=G.length;Oe<Se;Oe++){let ze=Z(G[Oe],$[Oe],Ve);F(ze.x,ze.y,-de),fe===0&&X.push(ze)}for(let Oe=0,Se=D;Oe<Se;Oe++){let ze=O[Oe];re=se[Oe];let k=[];for(let je=0,Ke=ze.length;je<Ke;je++){let C=Z(ze[je],re[je],Ve);F(C.x,C.y,-de),fe===0&&k.push(C)}fe===0&&ee.push(k)}}Me=gs.triangulateShape(X,ee)}let We=Me.length,ke=g+x;for(let X=0;X<V;X++){let ee=d?Z(L[X],ye[X],ke):L[X];M?(E.copy(b.normals[0]).multiplyScalar(ee.x),w.copy(b.binormals[0]).multiplyScalar(ee.y),_.copy(A[0]).add(E).add(w),F(_.x,_.y,_.z)):F(ee.x,ee.y,0)}for(let X=1;X<=u;X++)for(let ee=0;ee<V;ee++){let me=d?Z(L[ee],ye[ee],ke):L[ee];M?(E.copy(b.normals[X]).multiplyScalar(me.x),w.copy(b.binormals[X]).multiplyScalar(me.y),_.copy(A[X]).add(E).add(w),F(_.x,_.y,_.z)):F(me.x,me.y,h/u*X)}for(let X=p-1;X>=0;X--){let ee=X/p,me=f*Math.cos(ee*Math.PI/2),fe=g*Math.sin(ee*Math.PI/2)+x;for(let de=0,Ve=G.length;de<Ve;de++){let Oe=Z(G[de],$[de],fe);F(Oe.x,Oe.y,h+me)}for(let de=0,Ve=O.length;de<Ve;de++){let Oe=O[de];re=se[de];for(let Se=0,ze=Oe.length;Se<ze;Se++){let k=Z(Oe[Se],re[Se],fe);M?F(k.x,k.y+A[u-1].y,A[u-1].x+me):F(k.x,k.y,h+me)}}}W(),I();function W(){let X=s.length/3;if(d){let ee=0,me=V*ee;for(let fe=0;fe<We;fe++){let de=Me[fe];K(de[2]+me,de[1]+me,de[0]+me)}ee=u+p*2,me=V*ee;for(let fe=0;fe<We;fe++){let de=Me[fe];K(de[0]+me,de[1]+me,de[2]+me)}}else{for(let ee=0;ee<We;ee++){let me=Me[ee];K(me[2],me[1],me[0])}for(let ee=0;ee<We;ee++){let me=Me[ee];K(me[0]+V*u,me[1]+V*u,me[2]+V*u)}}n.addGroup(X,s.length/3-X,0)}function I(){let X=s.length/3,ee=0;P(G,ee),ee+=G.length;for(let me=0,fe=O.length;me<fe;me++){let de=O[me];P(de,ee),ee+=de.length}n.addGroup(X,s.length/3-X,1)}function P(X,ee){let me=X.length;for(;--me>=0;){let fe=me,de=me-1;de<0&&(de=X.length-1);for(let Ve=0,Oe=u+p*2;Ve<Oe;Ve++){let Se=V*Ve,ze=V*(Ve+1),k=ee+fe+Se,je=ee+de+Se,Ke=ee+de+ze,C=ee+fe+ze;te(k,je,Ke,C)}}}function F(X,ee,me){l.push(X),l.push(ee),l.push(me)}function K(X,ee,me){ge(X),ge(ee),ge(me);let fe=s.length/3,de=T.generateTopUV(n,s,fe-3,fe-2,fe-1);Ue(de[0]),Ue(de[1]),Ue(de[2])}function te(X,ee,me,fe){ge(X),ge(ee),ge(fe),ge(ee),ge(me),ge(fe);let de=s.length/3,Ve=T.generateSideWallUV(n,s,de-6,de-3,de-2,de-1);Ue(Ve[0]),Ue(Ve[1]),Ue(Ve[3]),Ue(Ve[1]),Ue(Ve[2]),Ue(Ve[3])}function ge(X){s.push(l[X*3+0]),s.push(l[X*3+1]),s.push(l[X*3+2])}function Ue(X){r.push(X.x),r.push(X.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Um(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Nc[s.type]().fromJSON(s)),new i(n,e.options)}},Nm={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new be(r,o),new be(a,l),new be(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],x=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new be(o,1-l),new be(c,1-h),new be(d,1-g),new be(x,1-m)]:[new be(a,1-l),new be(u,1-h),new be(f,1-g),new be(p,1-m)]}};function Um(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Cn=class i extends Bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,h=e/a,d=t/l,f=[],g=[],x=[],p=[];for(let m=0;m<u;m++){let T=m*d-o;for(let A=0;A<c;A++){let M=A*h-r;g.push(M,-T,0),x.push(0,0,1),p.push(A/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<a;T++){let A=T+c*m,M=T+c*(m+1),b=T+1+c*(m+1),w=T+1+c*m;f.push(A,M,w),f.push(M,b,w)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(x,3)),this.setAttribute("uv",new Rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var mo=class i extends Bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],h=new S,d=new S,f=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){let T=[],A=m/n,M=o+A*a,b=e*Math.cos(M),w=Math.sqrt(e*e-b*b),E=0;m===0&&o===0?E=.5/t:m===n&&l===Math.PI&&(E=-.5/t);for(let _=0;_<=t;_++){let R=_/t,L=s+R*r;h.x=-w*Math.cos(L),h.y=b,h.z=w*Math.sin(L),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),p.push(R+E,1-A),T.push(c++)}u.push(T)}for(let m=0;m<n;m++)for(let T=0;T<t;T++){let A=u[m][T+1],M=u[m][T],b=u[m+1][T],w=u[m+1][T+1];(m!==0||o>0)&&f.push(A,M,w),(m!==n-1||l<Math.PI)&&f.push(M,b,w)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(x,3)),this.setAttribute("uv",new Rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Ps(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(ad(s))s.isRenderTargetTexture?(Qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ad(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function mn(i){let e={};for(let t=0;t<i.length;t++){let n=Ps(i[t]);for(let s in n)e[s]=n[s]}return e}function ad(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Fm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function gu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}var uf={clone:Ps,merge:mn},Om=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,On=class extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Om,this.fragmentShader=Bm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=Fm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new nt().setHex(s.value);break;case"v2":this.uniforms[n].value=new be().fromArray(s.value);break;case"v3":this.uniforms[n].value=new S().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ct().fromArray(s.value);break;case"m3":this.uniforms[n].value=new at().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ut().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Fa=class extends On{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},zt=class extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},pn=class extends zt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Oa=class extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ba=class extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Yi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function _a(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function Hm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function ld(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function zm(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var pi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ha=class extends pi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ps,endingEnd:ps}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ms:r=e,a=2*t-n;break;case qr:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ms:o=e,l=2*n-t;break;case qr:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),x=g*g,p=x*g,m=-d*p+2*d*x-d*g,T=(1+d)*p+(-1.5-2*d)*x+(-.5+d)*g+1,A=(-1-f)*p+(1.5+f)*x+.5*g,M=f*p-f*x;for(let b=0;b!==a;++b)r[b]=m*o[u+b]+T*o[c+b]+A*o[l+b]+M*o[h+b];return r}},go=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*h+o[l+d]*u;return r}},za=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ka=class extends pi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this.inTangents,h=this.outTangents;if(!u||!h){let g=(n-t)/(s-t),x=1-g;for(let p=0;p!==a;++p)r[p]=o[c+p]*x+o[l+p]*g;return r}let d=a*2,f=e-1;for(let g=0;g!==a;++g){let x=o[c+g],p=o[l+g],m=f*d+g*2,T=h[m],A=h[m+1],M=e*d+g*2,b=u[M],w=u[M+1],E=Vm(n,t,T,b,s);r[g]=hf(E,x,A,w,p)}return r}};function hf(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function km(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Vm(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=hf(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=km(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var In=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Yi(t,this.TimeBufferType),this.values=Yi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Yi(e.times,Array),values:Yi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),_a(e.settings)&&(n.settings={inTangents:Yi(e.settings.inTangents,Array),outTangents:Yi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ka(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case xs:t=this.InterpolantFactoryMethodDiscrete;break;case ys:t=this.InterpolantFactoryMethodLinear;break;case ma:t=this.InterpolantFactoryMethodSmooth;break;case Lc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Qe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xs;case this.InterpolantFactoryMethodLinear:return ys;case this.InterpolantFactoryMethodSmooth:return ma;case this.InterpolantFactoryMethodBezier:return Lc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;_a(this.settings)&&(cd(this.settings.inTangents,e),cd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(st("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(st("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){st("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){st("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&wp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){st("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ma,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let h=a*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let x=t[h+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,_a(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function cd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}In.prototype.ValueTypeName="";In.prototype.TimeBufferType=Float32Array;In.prototype.ValueBufferType=Float32Array;In.prototype.DefaultInterpolation=ys;var Ii=class extends In{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="bool";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=xs;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends In{constructor(e,t,n,s){super(e,t,n,s)}};_o.prototype.ValueTypeName="color";var Pi=class extends In{constructor(e,t,n,s){super(e,t,n,s)}};Pi.prototype.ValueTypeName="number";var Va=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)Le.slerpFlat(r,0,o,c-a,o,c,l);return r}},Li=class extends In{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Va(this.times,this.values,this.getValueSize(),e)}};Li.prototype.ValueTypeName="quaternion";Li.prototype.InterpolantFactoryMethodSmooth=void 0;var Di=class extends In{constructor(e,t,n){super(e,t,n)}};Di.prototype.ValueTypeName="string";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=xs;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends In{constructor(e,t,n,s){super(e,t,n,s)}};Ji.prototype.ValueTypeName="vector";var Es=class{constructor(e="",t=-1,n=[],s=Fl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Xn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Wm(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(In.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let u=Hm(l);l=ld(l,1,u),c=ld(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Pi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],u=c.name.match(r);if(u&&u.length>1){let h=u[1],d=s[h];d||(s[h]=d=[]),d.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Gm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Pi;case"vector":case"vector2":case"vector3":case"vector4":return Ji;case"color":return _o;case"quaternion":return Li;case"bool":case"boolean":return Ii;case"string":return Di}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Wm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Gm(i.type);if(i.times===void 0){let n=[],s=[];zm(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),_a(i.settings)&&(t.settings={inTangents:Yi(i.settings.inTangents,Float32Array),outTangents:Yi(i.settings.outTangents,Float32Array)}),t}var ci={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(ud(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!ud(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function ud(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ga=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},df=new Ga,mi=class{constructor(e){this.manager=e!==void 0?e:df,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};mi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ai={},Bc=class extends Error{constructor(e,t){super(e),this.response=t}},mr=class extends mi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ci.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Ai[e]!==void 0){Ai[e].push({onLoad:t,onProgress:n,onError:s});return}Ai[e]=[],Ai[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Qe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Ai[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,p=new ReadableStream({start(m){T();function T(){h.read().then(({done:A,value:M})=>{if(A)m.close();else{x+=M.byteLength;let b=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let w=0,E=u.length;w<E;w++){let _=u[w];_.onProgress&&_.onProgress(b)}m.enqueue(M),T()}},A=>{m.error(A)})}}});return new Response(p)}else throw new Bc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ci.add(`file:${e}`,c);let u=Ai[e];delete Ai[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Ai[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ai[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ys=new WeakMap,Wa=class extends mi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ci.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=Ys.get(o);h===void 0&&(h=[],Ys.set(o,h)),h.push({onLoad:t,onError:s})}return o}let a=er("img");function l(){u(),t&&t(this);let h=Ys.get(this)||[];for(let d=0;d<h.length;d++){let f=h[d];f.onLoad&&f.onLoad(this)}Ys.delete(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),ci.remove(`image:${e}`);let d=Ys.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(h)}Ys.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ci.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Ni=class extends mi{constructor(e){super(e)}load(e,t,n,s){let r=new Jt,o=new Wa(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ts=class extends Ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},xo=class extends Ts{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Cc=new ut,hd=new S,dd=new S,gr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cr,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;hd.setFromMatrixPosition(e.matrixWorld),t.position.copy(hd),dd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Cc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Cc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Qs||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},fa=new S,pa=new Le,li=new S,yo=class extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(fa,pa,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,li.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(fa,pa,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,li.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qi=new S,fd=new be,pd=new be,jt=class extends yo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,t){return this.getViewBounds(e,fd,pd),t.subVectors(pd,fd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Vr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Hc=class extends gr{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=vs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},vo=class extends Ts{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Hc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},zc=class extends gr{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}},Mo=class extends Ts{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new zc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Qi=class extends yo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},kc=class extends gr{constructor(){super(new Qi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},es=class extends Ts{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new kc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ui=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Ic=new WeakMap,So=class extends mi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Qe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Qe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ci.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{Ic.has(o)===!0?(s&&s(Ic.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ci.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Ic.set(l,c),ci.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ci.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Zs=-90,Ks=1,Xa=class extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new jt(Zs,Ks,e,t);s.layers=this.layers,this.add(s);let r=new jt(Zs,Ks,e,t);r.layers=this.layers,this.add(r);let o=new jt(Zs,Ks,e,t);o.layers=this.layers,this.add(o);let a=new jt(Zs,Ks,e,t);a.layers=this.layers,this.add(a);let l=new jt(Zs,Ks,e,t);l.layers=this.layers,this.add(l);let c=new jt(Zs,Ks,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},qa=class extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Ya=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){Le.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;Le.multiplyQuaternionsFlat(e,o,e,t,e,n),Le.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},_u="\\[\\]\\.:\\/",Xm=new RegExp("["+_u+"]","g"),xu="[^"+_u+"]",qm="[^"+_u.replace("\\.","")+"]",Ym=/((?:WC+[\/:])*)/.source.replace("WC",xu),Zm=/(WCOD+)?/.source.replace("WCOD",qm),Km=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xu),jm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xu),$m=new RegExp("^"+Ym+Zm+Km+jm+"$"),Jm=["material","materials","bones","map"],Vc=class{constructor(e,t,n){let s=n||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Lt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Xm,"")}static parseTrackName(e){let t=$m.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Jm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Qe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){st("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){st("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){st("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){st("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){st("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){st("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){st("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;st("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Lt.Composite=Vc;Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray];Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Za=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:ps,endingEnd:ps};for(let c=0;c!==o;++c){let u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Vd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Wd:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case Fl:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===Gd;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===kd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=ms,s.endingEnd=ms):(e?s.endingStart=this.zeroSlopeAtStart?ms:ps:s.endingStart=qr,t?s.endingEnd=this.zeroSlopeAtEnd?ms:ps:s.endingEnd=qr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},Qm=new Float32Array(1),bo=class extends qn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){let d=s[h],f=d.name,g=u[f];if(g!==void 0)++g.referenceCount,o[h]=g;else{if(g=o[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}let x=t&&t._propertyBindings[h].binding.parsedPath;g=new Ya(Lt.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[h]=g}a[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let h=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new go(new Float32Array(2),new Float32Array(2),1,Qm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Es.findByName(s,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Fl),l!==void 0){let h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let u=new Za(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Es.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var md=new ut,ws=class{constructor(e,t,n=0,s=1/0){this.ray=new hi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ir,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):st("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return md.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(md),this}intersectObject(e,t=!0,n=[]){return Gc(e,this,n,t),n.sort(gd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Gc(e[s],this,n,t);return n.sort(gd),n}};function gd(i,e){return i.distance-e.distance}function Gc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Gc(r[o],e,t,!0)}}var _r=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ft(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Eu=class Eu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Eu.prototype.isMatrix2=!0;var Wc=Eu;var Eo=class extends qn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function yu(i,e,t,n){let s=eg(n);switch(t){case cu:return i*e;case nl:return i*e/s.components*s.byteLength;case il:return i*e/s.components*s.byteLength;case rs:return i*e*2/s.components*s.byteLength;case sl:return i*e*2/s.components*s.byteLength;case uu:return i*e*3/s.components*s.byteLength;case Hn:return i*e*4/s.components*s.byteLength;case rl:return i*e*4/s.components*s.byteLength;case Ao:case Ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Co:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:case cl:return Math.max(i,16)*Math.max(e,8)/4;case ol:case ll:return Math.max(i,8)*Math.max(e,8)/2;case ul:case hl:case fl:case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dl:case Po:case ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _l:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case xl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Il:case Pl:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Dl:case Nl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Lo:case Ul:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function eg(i){switch(i){case Pn:case ru:return{byteLength:1,components:1};case Mr:case ou:case ri:return{byteLength:2,components:1};case el:case tl:return{byteLength:2,components:4};case si:case Qa:case Bn:return{byteLength:4,components:1};case au:case lu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Nf(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ng(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){let g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){let x=h[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ig=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,og=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ag=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ug=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,dg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_g=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,wg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ag=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Cg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ig=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ng=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ug=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Fg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Bg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Kg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$g=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,t0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );

		irradiance *= sheenEnergyComp;

	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,n0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,i0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,r0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,o0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,h0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,d0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,f0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,x0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,v0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,S0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,b0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,w0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,A0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,R0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,C0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,P0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,L0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,D0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,N0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,U0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,B0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif

				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,z0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,k0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,V0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,G0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,X0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,K0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,j0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,t_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,n_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,i_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,s_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,u_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,h_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,d_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,f_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,p_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,g_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,__=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,x_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,S_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,E_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,T_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,R_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN

		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;

	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,L_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,D_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,U_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,F_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dt={alphahash_fragment:ig,alphahash_pars_fragment:sg,alphamap_fragment:rg,alphamap_pars_fragment:og,alphatest_fragment:ag,alphatest_pars_fragment:lg,aomap_fragment:cg,aomap_pars_fragment:ug,batching_pars_vertex:hg,batching_vertex:dg,begin_vertex:fg,beginnormal_vertex:pg,bsdfs:mg,iridescence_fragment:gg,bumpmap_pars_fragment:_g,clipping_planes_fragment:xg,clipping_planes_pars_fragment:yg,clipping_planes_pars_vertex:vg,clipping_planes_vertex:Mg,color_fragment:Sg,color_pars_fragment:bg,color_pars_vertex:Eg,color_vertex:Tg,common:wg,cube_uv_reflection_fragment:Ag,defaultnormal_vertex:Rg,displacementmap_pars_vertex:Cg,displacementmap_vertex:Ig,emissivemap_fragment:Pg,emissivemap_pars_fragment:Lg,colorspace_fragment:Dg,colorspace_pars_fragment:Ng,envmap_fragment:Ug,envmap_common_pars_fragment:Fg,envmap_pars_fragment:Og,envmap_pars_vertex:Bg,envmap_physical_pars_fragment:Kg,envmap_vertex:Hg,fog_vertex:zg,fog_pars_vertex:kg,fog_fragment:Vg,fog_pars_fragment:Gg,gradientmap_pars_fragment:Wg,lightmap_pars_fragment:Xg,lights_lambert_fragment:qg,lights_lambert_pars_fragment:Yg,lights_pars_begin:Zg,lights_toon_fragment:jg,lights_toon_pars_fragment:$g,lights_phong_fragment:Jg,lights_phong_pars_fragment:Qg,lights_physical_fragment:e0,lights_physical_pars_fragment:t0,lights_fragment_begin:n0,lights_fragment_maps:i0,lights_fragment_end:s0,lightprobes_pars_fragment:r0,logdepthbuf_fragment:o0,logdepthbuf_pars_fragment:a0,logdepthbuf_pars_vertex:l0,logdepthbuf_vertex:c0,map_fragment:u0,map_pars_fragment:h0,map_particle_fragment:d0,map_particle_pars_fragment:f0,metalnessmap_fragment:p0,metalnessmap_pars_fragment:m0,morphinstance_vertex:g0,morphcolor_vertex:_0,morphnormal_vertex:x0,morphtarget_pars_vertex:y0,morphtarget_vertex:v0,normal_fragment_begin:M0,normal_fragment_maps:S0,normal_pars_fragment:b0,normal_pars_vertex:E0,normal_vertex:T0,normalmap_pars_fragment:w0,clearcoat_normal_fragment_begin:A0,clearcoat_normal_fragment_maps:R0,clearcoat_pars_fragment:C0,iridescence_pars_fragment:I0,opaque_fragment:P0,packing:L0,premultiplied_alpha_fragment:D0,project_vertex:N0,dithering_fragment:U0,dithering_pars_fragment:F0,roughnessmap_fragment:O0,roughnessmap_pars_fragment:B0,shadowmap_pars_fragment:H0,shadowmap_pars_vertex:z0,shadowmap_vertex:k0,shadowmask_pars_fragment:V0,skinbase_vertex:G0,skinning_pars_vertex:W0,skinning_vertex:X0,skinnormal_vertex:q0,specularmap_fragment:Y0,specularmap_pars_fragment:Z0,tonemapping_fragment:K0,tonemapping_pars_fragment:j0,transmission_fragment:$0,transmission_pars_fragment:J0,uv_pars_fragment:Q0,uv_pars_vertex:e_,uv_vertex:t_,worldpos_vertex:n_,background_vert:i_,background_frag:s_,backgroundCube_vert:r_,backgroundCube_frag:o_,cube_vert:a_,cube_frag:l_,depth_vert:c_,depth_frag:u_,distance_vert:h_,distance_frag:d_,equirect_vert:f_,equirect_frag:p_,linedashed_vert:m_,linedashed_frag:g_,meshbasic_vert:__,meshbasic_frag:x_,meshlambert_vert:y_,meshlambert_frag:v_,meshmatcap_vert:M_,meshmatcap_frag:S_,meshnormal_vert:b_,meshnormal_frag:E_,meshphong_vert:T_,meshphong_frag:w_,meshphysical_vert:A_,meshphysical_frag:R_,meshtoon_vert:C_,meshtoon_frag:I_,points_vert:P_,points_frag:L_,shadow_vert:D_,shadow_frag:N_,sprite_vert:U_,sprite_frag:F_},Ne={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new S},probesMax:{value:new S},probesResolution:{value:new S}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},xi={basic:{uniforms:mn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:mn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new nt(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:mn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:mn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:mn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new nt(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:mn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:mn([Ne.points,Ne.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:mn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:mn([Ne.common,Ne.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:mn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:mn([Ne.sprite,Ne.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:mn([Ne.common,Ne.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:mn([Ne.lights,Ne.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};xi.physical={uniforms:mn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};var zl={r:0,b:0,g:0},O_=new ut,Uf=new at;Uf.set(-1,0,0,0,1,0,0,0,1);function B_(i,e,t,n,s,r){let o=new nt(0),a=s===!0?0:1,l,c,u=null,h=0,d=null;function f(T){let A=T.isScene===!0?T.background:null;if(A&&A.isTexture){let M=T.backgroundBlurriness>0;A=e.get(A,M)}return A}function g(T){let A=!1,M=f(T);M===null?p(o,a):M&&M.isColor&&(p(M,1),A=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(T,A){let M=f(A);M&&(M.isCubeTexture||M.mapping===wo)?(c===void 0&&(c=new _t(new Rn(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:Ps(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(O_.makeRotationFromEuler(A.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Uf),c.material.toneMapped=pt.getTransfer(M.colorSpace)!==Et,(u!==M||h!==M.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,d=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new _t(new Cn(2,2),new On({name:"BackgroundMaterial",uniforms:Ps(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=pt.getTransfer(M.colorSpace)!==Et,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,d=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function p(T,A){T.getRGB(zl,gu(i)),t.buffers.color.setClear(zl.r,zl.g,zl.b,A,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,A=1){o.set(T),a=A,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(T){a=T,p(o,a)},render:g,addToRenderList:x,dispose:m}}function H_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(O,N,z,D,G){let Z=!1,V=h(O,D,z,N);r!==V&&(r=V,c(r.object)),Z=f(O,D,z,G),Z&&g(O,D,z,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,M(O,N,z,D),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(O){return i.bindVertexArray(O)}function u(O){return i.deleteVertexArray(O)}function h(O,N,z,D){let G=D.wireframe===!0,Z=n[N.id];Z===void 0&&(Z={},n[N.id]=Z);let V=O.isInstancedMesh===!0?O.id:0,oe=Z[V];oe===void 0&&(oe={},Z[V]=oe);let $=oe[z.id];$===void 0&&($={},oe[z.id]=$);let se=$[G];return se===void 0&&(se=d(l()),$[G]=se),se}function d(O){let N=[],z=[],D=[];for(let G=0;G<t;G++)N[G]=0,z[G]=0,D[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:z,attributeDivisors:D,object:O,attributes:{},index:null}}function f(O,N,z,D){let G=r.attributes,Z=N.attributes,V=0,oe=z.getAttributes();for(let $ in oe)if(oe[$].location>=0){let re=G[$],ye=Z[$];if(ye===void 0&&($==="instanceMatrix"&&O.instanceMatrix&&(ye=O.instanceMatrix),$==="instanceColor"&&O.instanceColor&&(ye=O.instanceColor)),re===void 0||re.attribute!==ye||ye&&re.data!==ye.data)return!0;V++}return r.attributesNum!==V||r.index!==D}function g(O,N,z,D){let G={},Z=N.attributes,V=0,oe=z.getAttributes();for(let $ in oe)if(oe[$].location>=0){let re=Z[$];re===void 0&&($==="instanceMatrix"&&O.instanceMatrix&&(re=O.instanceMatrix),$==="instanceColor"&&O.instanceColor&&(re=O.instanceColor));let ye={};ye.attribute=re,re&&re.data&&(ye.data=re.data),G[$]=ye,V++}r.attributes=G,r.attributesNum=V,r.index=D}function x(){let O=r.newAttributes;for(let N=0,z=O.length;N<z;N++)O[N]=0}function p(O){m(O,0)}function m(O,N){let z=r.newAttributes,D=r.enabledAttributes,G=r.attributeDivisors;z[O]=1,D[O]===0&&(i.enableVertexAttribArray(O),D[O]=1),G[O]!==N&&(i.vertexAttribDivisor(O,N),G[O]=N)}function T(){let O=r.newAttributes,N=r.enabledAttributes;for(let z=0,D=N.length;z<D;z++)N[z]!==O[z]&&(i.disableVertexAttribArray(z),N[z]=0)}function A(O,N,z,D,G,Z,V){V===!0?i.vertexAttribIPointer(O,N,z,G,Z):i.vertexAttribPointer(O,N,z,D,G,Z)}function M(O,N,z,D){x();let G=D.attributes,Z=z.getAttributes(),V=N.defaultAttributeValues;for(let oe in Z){let $=Z[oe];if($.location>=0){let se=G[oe];if(se===void 0&&(oe==="instanceMatrix"&&O.instanceMatrix&&(se=O.instanceMatrix),oe==="instanceColor"&&O.instanceColor&&(se=O.instanceColor)),se!==void 0){let re=se.normalized,ye=se.itemSize,Me=e.get(se);if(Me===void 0)continue;let We=Me.buffer,ke=Me.type,W=Me.bytesPerElement,I=ke===i.INT||ke===i.UNSIGNED_INT||se.gpuType===Qa;if(se.isInterleavedBufferAttribute){let P=se.data,F=P.stride,K=se.offset;if(P.isInstancedInterleavedBuffer){for(let te=0;te<$.locationSize;te++)m($.location+te,P.meshPerAttribute);O.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let te=0;te<$.locationSize;te++)p($.location+te);i.bindBuffer(i.ARRAY_BUFFER,We);for(let te=0;te<$.locationSize;te++)A($.location+te,ye/$.locationSize,ke,re,F*W,(K+ye/$.locationSize*te)*W,I)}else{if(se.isInstancedBufferAttribute){for(let P=0;P<$.locationSize;P++)m($.location+P,se.meshPerAttribute);O.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let P=0;P<$.locationSize;P++)p($.location+P);i.bindBuffer(i.ARRAY_BUFFER,We);for(let P=0;P<$.locationSize;P++)A($.location+P,ye/$.locationSize,ke,re,ye*W,ye/$.locationSize*P*W,I)}}else if(V!==void 0){let re=V[oe];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv($.location,re);break;case 3:i.vertexAttrib3fv($.location,re);break;case 4:i.vertexAttrib4fv($.location,re);break;default:i.vertexAttrib1fv($.location,re)}}}}T()}function b(){R();for(let O in n){let N=n[O];for(let z in N){let D=N[z];for(let G in D){let Z=D[G];for(let V in Z)u(Z[V].object),delete Z[V];delete D[G]}}delete n[O]}}function w(O){if(n[O.id]===void 0)return;let N=n[O.id];for(let z in N){let D=N[z];for(let G in D){let Z=D[G];for(let V in Z)u(Z[V].object),delete Z[V];delete D[G]}}delete n[O.id]}function E(O){for(let N in n){let z=n[N];for(let D in z){let G=z[D];if(G[O.id]===void 0)continue;let Z=G[O.id];for(let V in Z)u(Z[V].object),delete Z[V];delete G[O.id]}}}function _(O){for(let N in n){let z=n[N],D=O.isInstancedMesh===!0?O.id:0,G=z[D];if(G!==void 0){for(let Z in G){let V=G[Z];for(let oe in V)u(V[oe].object),delete V[oe];delete G[Z]}delete z[D],Object.keys(z).length===0&&delete n[N]}}}function R(){L(),o=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:L,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:p,disableUnusedAttributes:T}}function z_(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function k_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==Hn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let _=E===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Pn&&E!==Bn&&!_&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Qe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:T,maxVaryings:A,maxFragmentUniforms:M,maxSamples:b,samples:w}}function V_(i){let e=this,t=null,n=0,s=!1,r=!1,o=new fn,a=new at,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,m=i.get(h);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{let T=r?0:n,A=T*4,M=m.clippingState||null;l.value=M,M=u(g,d,A,f);for(let b=0;b!==A;++b)M[b]=t[b];m.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){let x=h!==null?h.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(p===null||p.length<m)&&(p=new Float32Array(m));for(let A=0,M=f;A!==x;++A,M+=4)o.copy(h[A]).applyMatrix4(T,a),o.normal.toArray(p,M),p[M+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}var Tr=4,G_=6,W_=20,X_=256,No=new Qi,ff=new nt,Tu=null,wu=0,Au=0,Ru=!1,q_=new S,Ls=new S,Vl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=q_}=r;Tu=this._renderer.getRenderTarget(),wu=this._renderer.getActiveCubeFace(),Au=this._renderer.getActiveMipmapLevel(),Ru=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Tu,wu,Au),this._renderer.xr.enabled=Ru,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===Cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tu=this._renderer.getRenderTarget(),wu=this._renderer.getActiveCubeFace(),Au=this._renderer.getActiveMipmapLevel(),Ru=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:ri,format:Hn,colorSpace:_n,depthBuffer:!1},s=pf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Y_(r)),this._blurMaterial=K_(r,e,t),this._ggxMaterial=Z_(r,e,t)}return s}_compileMaterial(e){let t=new _t(new Bt,e);this._renderer.compile(t,No)}_sceneToCubeUV(e,t,n,s,r){let l=new jt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(ff),h.toneMapping=ni,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _t(new Rn,new ei({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,p=x.material,m=!1,T=e.background;T?T.isColor&&(p.color.copy(T),e.background=null,m=!0):(p.color.copy(ff),m=!0);for(let A=0;A<6;A++){let M=A%3;M===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[A],r.y,r.z)):M===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[A]));let b=this._cubeSize;Er(s,M*b,A>2?b:0,b,b),h.setRenderTarget(s),m&&h.render(x,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=T}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===is||e.mapping===Cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Er(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,No)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=c*1.25,f=h*d,{_lodMax:g}=this,x=this._sizeLods[n],p=3*x*(n>g-Tr?n-g+Tr:0),m=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Er(r,p,m,3*x,2*x),s.setRenderTarget(r),s.render(a,No),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Er(e,p,m,3*x,2*x),s.setRenderTarget(e),s.render(a,No)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],h=3*u*(s>this._lodMax-Tr?s-this._lodMax+Tr:0),d=4*(this._cubeSize-u);Er(t,h,d,3*u,2*u),o.setRenderTarget(t),o.render(l,No)}};function Y_(i){let e=[],t=[],n=i,s=i-Tr+1+G_;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),l=-a,c=1+a,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,d=6,f=3,g=new Float32Array(f*d*h),x=new Float32Array(f*d*h);for(let m=0;m<h;m++){let T=m%3*2/3-1,A=m>2?0:-1,M=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];g.set(M,f*d*m);for(let b=0;b<d;b++){let w=u[b*2]*2-1,E=u[b*2+1]*2-1;m===0?Ls.set(1,E,w):m===1?Ls.set(-w,1,-E):m===2?Ls.set(-w,E,1):m===3?Ls.set(-1,E,-w):m===4?Ls.set(-w,-1,E):Ls.set(w,E,-1),Ls.toArray(x,(m*d+b)*f)}}let p=new Bt;p.setAttribute("position",new Xt(g,f)),p.setAttribute("outputDirection",new Xt(x,f)),t.push(new _t(p,null)),n>Tr&&n--}return{lodMeshes:t,sizeLods:e}}function pf(i,e,t){let n=new En(i,e,t);return n.texture.mapping=wo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Z_(i,e,t){return new On({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:X_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function K_(i,e,t){return new On({name:"SphericalGaussianBlur",defines:{SAMPLES:W_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function mf(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function gf(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Xl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Gl=class extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new no(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Rn(5,5,5),r=new On({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:gi});r.uniforms.tEquirect.value=t;let o=new _t(s,r),a=t.minFilter;return t.minFilter===ii&&(t.minFilter=Yt),new Xa(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function j_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===ja||f===$a)if(e.has(d)){let g=e.get(d).texture;return a(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new Gl(g.height);return x.fromEquirectangularTexture(i,d),e.set(d,x),d.addEventListener("dispose",c),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,g=f===ja||f===$a,x=f===is||f===Cs;if(g||x){let p=t.get(d),m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Vl(i)),p=g?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{let T=d.image;return g&&T&&T.height>0||x&&T&&l(T)?(n===null&&(n=new Vl(i)),p=g?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function a(d,f){return f===ja?d.mapping=is:f===$a&&(d.mapping=Cs),d}function l(d){let f=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&f++;return f===g}function c(d){let f=d.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(d){let f=d.target;f.removeEventListener("dispose",u);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:h}}function $_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&_s("WebGLRenderer: "+n+" extension not supported."),s}}}function J_(i,e,t,n){let s={},r=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){let d=[],f=h.index,g=h.attributes.position,x=0;if(g===void 0)return;if(f!==null){let T=f.array;x=f.version;for(let A=0,M=T.length;A<M;A+=3){let b=T[A+0],w=T[A+1],E=T[A+2];d.push(b,w,w,E,E,b)}}else{let T=g.array;x=g.version;for(let A=0,M=T.length/3-1;A<M;A+=3){let b=A+0,w=A+1,E=A+2;d.push(b,w,w,E,E,b)}}let p=new(g.count>=65535?$r:Ms)(d,1);p.version=x;let m=r.get(h);m&&e.remove(m),r.set(h,p)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Q_(i,e,t){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,d){i.drawElements(n,d,r,h*o),t.update(d,n,1)}function c(h,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,h*o,f),t.update(d,n,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,h,0,f);let x=0;for(let p=0;p<f;p++)x+=d[p];t.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function ex(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:st("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function tx(i,e,t){let n=new WeakMap,s=new Ct;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let R=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",R)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],A=0;f===!0&&(A=1),g===!0&&(A=2),x===!0&&(A=3);let M=a.attributes.position.count*A,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let w=new Float32Array(M*b*4*h),E=new Kr(w,M,b,h);E.type=Bn,E.needsUpdate=!0;let _=A*4;for(let L=0;L<h;L++){let O=p[L],N=m[L],z=T[L],D=M*b*4*L;for(let G=0;G<O.count;G++){let Z=G*_;f===!0&&(s.fromBufferAttribute(O,G),w[D+Z+0]=s.x,w[D+Z+1]=s.y,w[D+Z+2]=s.z,w[D+Z+3]=0),g===!0&&(s.fromBufferAttribute(N,G),w[D+Z+4]=s.x,w[D+Z+5]=s.y,w[D+Z+6]=s.z,w[D+Z+7]=0),x===!0&&(s.fromBufferAttribute(z,G),w[D+Z+8]=s.x,w[D+Z+9]=s.y,w[D+Z+10]=s.z,w[D+Z+11]=z.itemSize===4?s.w:1)}}d={count:h,texture:E,size:new be(M,b)},n.set(a,d),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function nx(i,e,t,n,s){let r=new WeakMap;function o(c){let u=s.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function a(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var ix={[Jc]:"LINEAR_TONE_MAPPING",[Qc]:"REINHARD_TONE_MAPPING",[eu]:"CINEON_TONE_MAPPING",[To]:"ACES_FILMIC_TONE_MAPPING",[nu]:"AGX_TONE_MAPPING",[iu]:"NEUTRAL_TONE_MAPPING",[tu]:"CUSTOM_TONE_MAPPING"};function sx(i,e,t,n,s,r){let o=new En(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Bt;c.setAttribute("position",new Rt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Rt([0,2,0,0,2,0],2));let u=new Fa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new _t(c,u),d=new Qi(-1,1,1,-1,0,1),f=null,g=null,x=!1,p,m=null,T=[],A=!1;this.setSize=function(M,b){o.setSize(M,b),a!==null&&a.setSize(M,b),l!==null&&l.setSize(M,b);for(let w=0;w<T.length;w++){let E=T[w];E.setSize&&E.setSize(M,b)}},this.setEffects=function(M){T=M,A=T.length>0&&T[0].isRenderPass===!0;let b=o.width,w=o.height;T.length>0&&a===null&&(a=new En(b,w,{type:ri,depthBuffer:!1,stencilBuffer:!1}),l=new En(b,w,{type:ri,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<T.length;E++){let _=T[E];_.setSize&&_.setSize(b,w)}},this.begin=function(M,b){if(x||M.toneMapping===ni&&T.length===0)return!1;if(m=b,b!==null){let w=b.width,E=b.height;(o.width!==w||o.height!==E)&&this.setSize(w,E)}return A===!1&&M.setRenderTarget(o),p=M.toneMapping,M.toneMapping=ni,!0},this.hasRenderPass=function(){return A},this.end=function(M,b){M.toneMapping=p,x=!0;let w=o,E=a;for(let _=0;_<T.length;_++){let R=T[_];R.enabled!==!1&&(R.render(M,E,w,b),R.needsSwap!==!1&&(w=E,E=E===a?l:a))}if(f!==M.outputColorSpace||g!==M.toneMapping){f=M.outputColorSpace,g=M.toneMapping,u.defines={},pt.getTransfer(f)===Et&&(u.defines.SRGB_TRANSFER="");let _=ix[g];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,M.setRenderTarget(m),M.render(h,d),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var Ff=new Jt,Pu=new $i(1,1),Of=new Kr,Bf=new Aa,Hf=new no,_f=[],xf=[],yf=new Float32Array(16),vf=new Float32Array(9),Mf=new Float32Array(4);function Ar(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=_f[s];if(r===void 0&&(r=new Float32Array(s),_f[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function en(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function tn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ql(i,e){let t=xf[e];t===void 0&&(t=new Int32Array(e),xf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function rx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;i.uniform2fv(this.addr,e),tn(t,e)}}function ax(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(en(t,e))return;i.uniform3fv(this.addr,e),tn(t,e)}}function lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;i.uniform4fv(this.addr,e),tn(t,e)}}function cx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;Mf.set(n),i.uniformMatrix2fv(this.addr,!1,Mf),tn(t,n)}}function ux(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;vf.set(n),i.uniformMatrix3fv(this.addr,!1,vf),tn(t,n)}}function hx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;yf.set(n),i.uniformMatrix4fv(this.addr,!1,yf),tn(t,n)}}function dx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;i.uniform2iv(this.addr,e),tn(t,e)}}function px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;i.uniform3iv(this.addr,e),tn(t,e)}}function mx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;i.uniform4iv(this.addr,e),tn(t,e)}}function gx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function _x(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;i.uniform2uiv(this.addr,e),tn(t,e)}}function xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;i.uniform3uiv(this.addr,e),tn(t,e)}}function yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;i.uniform4uiv(this.addr,e),tn(t,e)}}function vx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Pu.compareFunction=t.isReversedDepthBuffer()?Hl:Bl,r=Pu):r=Ff,t.setTexture2D(e||r,s)}function Mx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Bf,s)}function Sx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Hf,s)}function bx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Of,s)}function Ex(i){switch(i){case 5126:return rx;case 35664:return ox;case 35665:return ax;case 35666:return lx;case 35674:return cx;case 35675:return ux;case 35676:return hx;case 5124:case 35670:return dx;case 35667:case 35671:return fx;case 35668:case 35672:return px;case 35669:case 35673:return mx;case 5125:return gx;case 36294:return _x;case 36295:return xx;case 36296:return yx;case 35678:case 36198:case 36298:case 36306:case 35682:return vx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return Sx;case 36289:case 36303:case 36311:case 36292:return bx}}function Tx(i,e){i.uniform1fv(this.addr,e)}function wx(i,e){let t=Ar(e,this.size,2);i.uniform2fv(this.addr,t)}function Ax(i,e){let t=Ar(e,this.size,3);i.uniform3fv(this.addr,t)}function Rx(i,e){let t=Ar(e,this.size,4);i.uniform4fv(this.addr,t)}function Cx(i,e){let t=Ar(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ix(i,e){let t=Ar(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Px(i,e){let t=Ar(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Lx(i,e){i.uniform1iv(this.addr,e)}function Dx(i,e){i.uniform2iv(this.addr,e)}function Nx(i,e){i.uniform3iv(this.addr,e)}function Ux(i,e){i.uniform4iv(this.addr,e)}function Fx(i,e){i.uniform1uiv(this.addr,e)}function Ox(i,e){i.uniform2uiv(this.addr,e)}function Bx(i,e){i.uniform3uiv(this.addr,e)}function Hx(i,e){i.uniform4uiv(this.addr,e)}function zx(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);en(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Pu:o=Ff;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function kx(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);en(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Bf,r[o])}function Vx(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);en(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Hf,r[o])}function Gx(i,e,t){let n=this.cache,s=e.length,r=ql(t,s);en(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Of,r[o])}function Wx(i){switch(i){case 5126:return Tx;case 35664:return wx;case 35665:return Ax;case 35666:return Rx;case 35674:return Cx;case 35675:return Ix;case 35676:return Px;case 5124:case 35670:return Lx;case 35667:case 35671:return Dx;case 35668:case 35672:return Nx;case 35669:case 35673:return Ux;case 5125:return Fx;case 36294:return Ox;case 36295:return Bx;case 36296:return Hx;case 35678:case 36198:case 36298:case 36306:case 35682:return zx;case 35679:case 36299:case 36307:return kx;case 35680:case 36300:case 36308:case 36293:return Vx;case 36289:case 36303:case 36311:case 36292:return Gx}}var Lu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ex(t.type)}},Du=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wx(t.type)}},Nu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Cu=/(\w+)(\])?(\[|\.)?/g;function Sf(i,e){i.seq.push(e),i.map[e.id]=e}function Xx(i,e,t){let n=i.name,s=n.length;for(Cu.lastIndex=0;;){let r=Cu.exec(n),o=Cu.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Sf(t,c===void 0?new Lu(a,i,e):new Du(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Nu(a),Sf(t,h)),t=h}}}var wr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Xx(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function bf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var qx=37297,Yx=0;function Zx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Ef=new at;function Kx(i){pt._getMatrix(Ef,pt.workingColorSpace,i);let e=`mat3( ${Ef.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(i)){case Yr:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Tf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Zx(i.getShaderSource(e),a)}else return r}function jx(i,e){let t=Kx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var $x={[Jc]:"Linear",[Qc]:"Reinhard",[eu]:"Cineon",[To]:"ACESFilmic",[nu]:"AgX",[iu]:"Neutral",[tu]:"Custom"};function Jx(i,e){let t=$x[e];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var kl=new S;function Qx(){pt.getLuminanceCoefficients(kl);let i=kl.x.toFixed(4),e=kl.y.toFixed(4),t=kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ey(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fo).join(`
`)}function ty(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ny(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Fo(i){return i!==""}function wf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Af(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var iy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uu(i){return i.replace(iy,ry)}var sy=new Map;function ry(i,e){let t=dt[e];if(t===void 0){let n=sy.get(e);if(n!==void 0)t=dt[n],Qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Uu(t)}var oy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rf(i){return i.replace(oy,ay)}function ay(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var ly={[As]:"SHADOWMAP_TYPE_PCF",[xr]:"SHADOWMAP_TYPE_VSM"};function cy(i){return ly[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var uy={[is]:"ENVMAP_TYPE_CUBE",[Cs]:"ENVMAP_TYPE_CUBE",[wo]:"ENVMAP_TYPE_CUBE_UV"};function hy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":uy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var dy={[Cs]:"ENVMAP_MODE_REFRACTION"};function fy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":dy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var py={[$c]:"ENVMAP_BLENDING_MULTIPLY",[Bd]:"ENVMAP_BLENDING_MIX",[Hd]:"ENVMAP_BLENDING_ADD"};function my(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":py[i.combine]||"ENVMAP_BLENDING_NONE"}function gy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function _y(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=cy(t),c=hy(t),u=fy(t),h=my(t),d=gy(t),f=ey(t),g=ty(r),x=s.createProgram(),p,m,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fo).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fo).join(`
`),m.length>0&&(m+=`
`)):(p=[Cf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fo).join(`
`),m=[Cf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?dt.tonemapping_pars_fragment:"",t.toneMapping!==ni?Jx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,jx("linearToOutputTexel",t.outputColorSpace),Qx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fo).join(`
`)),o=Uu(o),o=wf(o,t),o=Af(o,t),a=Uu(a),a=wf(a,t),a=Af(a,t),o=Rf(o),a=Rf(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===fu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let A=T+p+o,M=T+m+a,b=bf(s,s.VERTEX_SHADER,A),w=bf(s,s.FRAGMENT_SHADER,M);s.attachShader(x,b),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(O){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(b)||"",D=s.getShaderInfoLog(w)||"",G=N.trim(),Z=z.trim(),V=D.trim(),oe=!0,$=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(oe=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,b,w);else{let se=Tf(s,b,"vertex"),re=Tf(s,w,"fragment");st("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+G+`
`+se+`
`+re)}else G!==""?Qe("WebGLProgram: Program Info Log:",G):(Z===""||V==="")&&($=!1);$&&(O.diagnostics={runnable:oe,programLog:G,vertexShader:{log:Z,prefix:p},fragmentShader:{log:V,prefix:m}})}s.deleteShader(b),s.deleteShader(w),_=new wr(s,x),R=ny(s,x)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let R;this.getAttributes=function(){return R===void 0&&E(this),R};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(x,qx)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=w,this}var xy=0,Fu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ou(e),t.set(e,n)),n}},Ou=class{constructor(e){this.id=xy++,this.code=e,this.usedTimes=0}};function yy(i){return i===rs||i===Po||i===Lo}function vy(i,e,t,n,s,r){let o=new ir,a=new Fu,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,R,L,O,N,z){let D=O.fog,G=N.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?O.environment:null,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,oe=e.get(_.envMap||Z,V),$=oe&&oe.mapping===wo?oe.image.height:null,se=f[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Qe("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));let re=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ye=re!==void 0?re.length:0,Me=0;G.morphAttributes.position!==void 0&&(Me=1),G.morphAttributes.normal!==void 0&&(Me=2),G.morphAttributes.color!==void 0&&(Me=3);let We,ke,W,I;if(se){let B=xi[se];We=B.vertexShader,ke=B.fragmentShader}else{We=_.vertexShader,ke=_.fragmentShader;let B=a.getVertexShaderStage(_),pe=a.getFragmentShaderStage(_);a.update(_,B,pe),W=B.id,I=pe.id}let P=i.getRenderTarget(),F=i.state.buffers.depth.getReversed(),K=N.isInstancedMesh===!0,te=N.isBatchedMesh===!0,ge=!!_.map,Ue=!!_.matcap,X=!!oe,ee=!!_.aoMap,me=!!_.lightMap,fe=!!_.bumpMap&&_.wireframe===!1,de=!!_.normalMap,Ve=!!_.displacementMap,Oe=!!_.emissiveMap,Se=!!_.metalnessMap,ze=!!_.roughnessMap,k=_.anisotropy>0,je=_.clearcoat>0,Ke=_.dispersion>0,C=_.retroreflectivity>0,y=_.iridescence>0,q=_.sheen>0,ne=_.transmission>0,ae=k&&!!_.anisotropyMap,_e=je&&!!_.clearcoatMap,Te=je&&!!_.clearcoatNormalMap,le=je&&!!_.clearcoatRoughnessMap,ue=y&&!!_.iridescenceMap,we=y&&!!_.iridescenceThicknessMap,Je=q&&!!_.sheenColorMap,Re=q&&!!_.sheenRoughnessMap,Ce=!!_.specularMap,Ye=!!_.specularColorMap,ce=!!_.specularIntensityMap,Ie=ne&&!!_.transmissionMap,U=ne&&!!_.thicknessMap,xe=!!_.gradientMap,Y=!!_.alphaMap,ve=_.alphaTest>0,Ee=!!_.alphaHash,he=!!_.extensions,$e=ni;_.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&($e=i.toneMapping);let Ze={shaderID:se,shaderType:_.type,shaderName:_.name,vertexShader:We,fragmentShader:ke,defines:_.defines,customVertexShaderID:W,customFragmentShaderID:I,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:te,batchingColor:te&&N._colorsTexture!==null,instancing:K,instancingColor:K&&N.instanceColor!==null,instancingMorph:K&&N.morphTexture!==null,outputColorSpace:P===null?i.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:pt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ge,matcap:Ue,envMap:X,envMapMode:X&&oe.mapping,envMapCubeUVHeight:$,aoMap:ee,lightMap:me,bumpMap:fe,normalMap:de,displacementMap:Ve,emissiveMap:Oe,normalMapObjectSpace:de&&_.normalMapType===qd,normalMapTangentSpace:de&&_.normalMapType===Ol,packedNormalMap:de&&_.normalMapType===Ol&&yy(_.normalMap.format),metalnessMap:Se,roughnessMap:ze,anisotropy:k,anisotropyMap:ae,clearcoat:je,clearcoatMap:_e,clearcoatNormalMap:Te,clearcoatRoughnessMap:le,dispersion:Ke,retroreflection:C,iridescence:y,iridescenceMap:ue,iridescenceThicknessMap:we,sheen:q,sheenColorMap:Je,sheenRoughnessMap:Re,specularMap:Ce,specularColorMap:Ye,specularIntensityMap:ce,transmission:ne,transmissionMap:Ie,thicknessMap:U,gradientMap:xe,opaque:_.transparent===!1&&_.blending===yr&&_.alphaToCoverage===!1,alphaMap:Y,alphaTest:ve,alphaHash:Ee,combine:_.combine,mapUv:ge&&g(_.map.channel),aoMapUv:ee&&g(_.aoMap.channel),lightMapUv:me&&g(_.lightMap.channel),bumpMapUv:fe&&g(_.bumpMap.channel),normalMapUv:de&&g(_.normalMap.channel),displacementMapUv:Ve&&g(_.displacementMap.channel),emissiveMapUv:Oe&&g(_.emissiveMap.channel),metalnessMapUv:Se&&g(_.metalnessMap.channel),roughnessMapUv:ze&&g(_.roughnessMap.channel),anisotropyMapUv:ae&&g(_.anisotropyMap.channel),clearcoatMapUv:_e&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:Te&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:we&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Re&&g(_.sheenRoughnessMap.channel),specularMapUv:Ce&&g(_.specularMap.channel),specularColorMapUv:Ye&&g(_.specularColorMap.channel),specularIntensityMapUv:ce&&g(_.specularIntensityMap.channel),transmissionMapUv:Ie&&g(_.transmissionMap.channel),thicknessMapUv:U&&g(_.thicknessMap.channel),alphaMapUv:Y&&g(_.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(de||k),vertexNormals:!!G.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!G.attributes.uv&&(ge||Y),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||G.attributes.normal===void 0&&de===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:F,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Me,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:$e,decodeVideoTexture:ge&&_.map.isVideoTexture===!0&&pt.getTransfer(_.map.colorSpace)===Et,decodeVideoTextureEmissive:Oe&&_.emissiveMap.isVideoTexture===!0&&pt.getTransfer(_.emissiveMap.colorSpace)===Et,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===an,flipSided:_.side===xn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:he&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&_.extensions.multiDraw===!0||te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ze.vertexUv1s=l.has(1),Ze.vertexUv2s=l.has(2),Ze.vertexUv3s=l.has(3),l.clear(),Ze}function p(_){let R=[];if(_.shaderID?R.push(_.shaderID):(R.push(_.customVertexShaderID),R.push(_.customFragmentShaderID)),_.defines!==void 0)for(let L in _.defines)R.push(L),R.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(m(R,_),T(R,_),R.push(i.outputColorSpace)),R.push(_.customProgramCacheKey),R.join()}function m(_,R){_.push(R.precision),_.push(R.outputColorSpace),_.push(R.envMapMode),_.push(R.envMapCubeUVHeight),_.push(R.mapUv),_.push(R.alphaMapUv),_.push(R.lightMapUv),_.push(R.aoMapUv),_.push(R.bumpMapUv),_.push(R.normalMapUv),_.push(R.displacementMapUv),_.push(R.emissiveMapUv),_.push(R.metalnessMapUv),_.push(R.roughnessMapUv),_.push(R.anisotropyMapUv),_.push(R.clearcoatMapUv),_.push(R.clearcoatNormalMapUv),_.push(R.clearcoatRoughnessMapUv),_.push(R.iridescenceMapUv),_.push(R.iridescenceThicknessMapUv),_.push(R.sheenColorMapUv),_.push(R.sheenRoughnessMapUv),_.push(R.specularMapUv),_.push(R.specularColorMapUv),_.push(R.specularIntensityMapUv),_.push(R.transmissionMapUv),_.push(R.thicknessMapUv),_.push(R.combine),_.push(R.fogExp2),_.push(R.sizeAttenuation),_.push(R.morphTargetsCount),_.push(R.morphAttributeCount),_.push(R.numSunLights),_.push(R.numDirLights),_.push(R.numPointLights),_.push(R.numSpotLights),_.push(R.numSpotLightMaps),_.push(R.numHemiLights),_.push(R.numRectAreaLights),_.push(R.numSunLightShadows),_.push(R.numDirLightShadows),_.push(R.numPointLightShadows),_.push(R.numSpotLightShadows),_.push(R.numSpotLightShadowsWithMaps),_.push(R.numLightProbes),_.push(R.shadowMapType),_.push(R.toneMapping),_.push(R.numClippingPlanes),_.push(R.numClipIntersection),_.push(R.depthPacking)}function T(_,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.retroreflection&&o.enable(24),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function A(_){let R=f[_.type],L;if(R){let O=xi[R];L=uf.clone(O.uniforms)}else L=_.uniforms;return L}function M(_,R){let L=u.get(R);return L!==void 0?++L.usedTimes:(L=new _y(i,R,_,s),c.push(L),u.set(R,L)),L}function b(_){if(--_.usedTimes===0){let R=c.indexOf(_);c[R]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function w(_){a.remove(_)}function E(){a.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:A,acquireProgram:M,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:E}}function My(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Sy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function If(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Pf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,g,x,p,m){let T=i[e];return T===void 0?(T={id:d.id,object:d,geometry:f,material:g,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:p,group:m},i[e]=T):(T.id=d.id,T.object=d,T.geometry=f,T.material=g,T.materialVariant=o(d),T.groupOrder=x,T.renderOrder=d.renderOrder,T.z=p,T.group=m),e++,T}function l(d,f,g,x,p,m,T){T.reversedDepth===!0&&(p=-p);let A=a(d,f,g,x,p,m);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):t.push(A)}function c(d,f,g,x,p,m){let T=a(d,f,g,x,p,m);g.transmission>0?n.unshift(T):g.transparent===!0?s.unshift(T):t.unshift(T)}function u(d,f){t.length>1&&t.sort(d||Sy),n.length>1&&n.sort(f||If),s.length>1&&s.sort(f||If)}function h(){for(let d=e,f=i.length;d<f;d++){let g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function by(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Pf,i.set(n,[o])):s>=r.length?(o=new Pf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ey(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new S,color:new nt};break;case"SpotLight":t={position:new S,direction:new S,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new S,halfWidth:new S,halfHeight:new S};break}return i[e.id]=t,t}}}function Ty(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var wy=0;function Ay(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ry(i){let e=new Ey,t=Ty(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new S);let s=new S,r=new ut,o=new ut;function a(c){let u=0,h=0,d=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,g=0,x=0,p=0,m=0,T=0,A=0,M=0,b=0,w=0,E=0,_=0,R=0,L=0;c.sort(Ay);for(let N=0,z=c.length;N<z;N++){let D=c[N],G=D.color,Z=D.intensity,V=D.distance,oe=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===rs?oe=D.shadow.map.texture:oe=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=G.r*Z,h+=G.g*Z,d+=G.b*Z;else if(D.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(D.sh.coefficients[$],Z);L++}else if(D.isSunLight){let $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let se=D.shadow,re=t.get(D);re.shadowIntensity=se.intensity,re.shadowBias=se.bias,re.shadowNormalBias=se.normalBias,re.shadowRadius=se.radius,re.shadowMapSize.copy(se.mapSize).multiply(se.getFrameExtents()),n.sunShadow[g]=re,n.sunShadowMap[g]=oe;let ye=se.getViewportCount();for(let Me=0;Me<ye;Me++)n.sunShadowMatrix[x+Me]=se.getMatrix(Me),n.sunShadowCascade[x+Me]=se._cascadeData[Me];x+=ye,g++}n.sun[f]=$,f++}else if(D.isDirectionalLight){let $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let se=D.shadow,re=t.get(D);re.shadowIntensity=se.intensity,re.shadowBias=se.bias,re.shadowNormalBias=se.normalBias,re.shadowRadius=se.radius,re.shadowMapSize=se.mapSize,n.directionalShadow[p]=re,n.directionalShadowMap[p]=oe,n.directionalShadowMatrix[p]=D.shadow.matrix,b++}n.directional[p]=$,p++}else if(D.isSpotLight){let $=e.get(D);$.position.setFromMatrixPosition(D.matrixWorld),$.color.copy(G).multiplyScalar(Z),$.distance=V,$.coneCos=Math.cos(D.angle),$.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),$.decay=D.decay,n.spot[T]=$;let se=D.shadow;if(D.map&&(n.spotLightMap[_]=D.map,_++,se.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[T]=se.matrix,D.castShadow){let re=t.get(D);re.shadowIntensity=se.intensity,re.shadowBias=se.bias,re.shadowNormalBias=se.normalBias,re.shadowRadius=se.radius,re.shadowMapSize=se.mapSize,n.spotShadow[T]=re,n.spotShadowMap[T]=oe,E++}T++}else if(D.isRectAreaLight){let $=e.get(D);$.color.copy(G).multiplyScalar(Z),$.halfWidth.set(D.width*.5,0,0),$.halfHeight.set(0,D.height*.5,0),n.rectArea[A]=$,A++}else if(D.isPointLight){let $=e.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),$.distance=D.distance,$.decay=D.decay,D.castShadow){let se=D.shadow,re=t.get(D);re.shadowIntensity=se.intensity,re.shadowBias=se.bias,re.shadowNormalBias=se.normalBias,re.shadowRadius=se.radius,re.shadowMapSize=se.mapSize,re.shadowCameraNear=se.camera.near,re.shadowCameraFar=se.camera.far,n.pointShadow[m]=re,n.pointShadowMap[m]=oe,n.pointShadowMatrix[m]=D.shadow.matrix,w++}n.point[m]=$,m++}else if(D.isHemisphereLight){let $=e.get(D);$.skyColor.copy(D.color).multiplyScalar(Z),$.groundColor.copy(D.groundColor).multiplyScalar(Z),n.hemi[M]=$,M++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let O=n.hash;(O.sunLength!==f||O.directionalLength!==p||O.pointLength!==m||O.spotLength!==T||O.rectAreaLength!==A||O.hemiLength!==M||O.numSunShadows!==g||O.numDirectionalShadows!==b||O.numPointShadows!==w||O.numSpotShadows!==E||O.numSpotMaps!==_||O.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=p,n.spot.length=T,n.rectArea.length=A,n.point.length=m,n.hemi.length=M,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+_-R,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,O.sunLength=f,O.directionalLength=p,O.pointLength=m,O.spotLength=T,O.rectAreaLength=A,O.hemiLength=M,O.numSunShadows=g,O.numDirectionalShadows=b,O.numPointShadows=w,O.numSpotShadows=E,O.numSpotMaps=_,O.numLightProbes=L,n.version=wy++)}function l(c,u){let h=0,d=0,f=0,g=0,x=0,p=0,m=u.matrixWorldInverse;for(let T=0,A=c.length;T<A;T++){let M=c[T];if(M.isSunLight){let b=n.sun[h];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(m),h++}else if(M.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(M.isSpotLight){let b=n.spot[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),g++}else if(M.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){let b=n.hemi[p];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(m),p++}}}return{setup:a,setupView:l,state:n}}function Lf(i){let e=new Ry(i),t=[],n=[],s=[];function r(d){h.camera=d,t.length=0,n.length=0,s.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Cy(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Lf(i),e.set(s,[a])):r>=o.length?(a=new Lf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Iy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Py=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ly=[new S(1,0,0),new S(-1,0,0),new S(0,1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1)],Dy=[new S(0,-1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1),new S(0,-1,0),new S(0,-1,0)],Df=new ut,Uo=new S,Iu=new S;function Ny(i,e,t){let n=new cr,s=new be,r=new be,o=new Ct,a=new Oa,l=new Ba,c={},u=t.maxTextureSize,h={[Yn]:xn,[xn]:Yn,[an]:an},d=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:Iy,fragmentShader:Py}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Bt;g.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new _t(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=As;let m=this.type;this.render=function(w,E,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===yd&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=As);let R=i.getRenderTarget(),L=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),N=i.state;N.setBlending(gi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let z=m!==this.type;z&&E.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(G=>G.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,G=w.length;D<G;D++){let Z=w[D],V=Z.shadow;if(V===void 0){Qe("WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let oe=V.getFrameExtents();s.multiply(oe),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/oe.x),s.x=r.x*oe.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/oe.y),s.y=r.y*oe.y,V.mapSize.y=r.y));let $=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=$,V.map===null||z===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===xr){if(Z.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new En(s.x,s.y,{format:rs,type:ri,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),V.map.texture.name=Z.name+".shadowMap",V.map.depthTexture=new $i(s.x,s.y,Bn),V.map.depthTexture.name=Z.name+".shadowMapDepth",V.map.depthTexture.format=ui,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=qt,V.map.depthTexture.magFilter=qt}else Z.isPointLight?(V.map=new Gl(s.x),V.map.depthTexture=new Ia(s.x,si)):(V.map=new En(s.x,s.y),V.map.depthTexture=new $i(s.x,s.y,si)),V.map.depthTexture.name=Z.name+".shadowMap",V.map.depthTexture.format=ui,this.type===As?(V.map.depthTexture.compareFunction=$?Hl:Bl,V.map.depthTexture.minFilter=Yt,V.map.depthTexture.magFilter=Yt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=qt,V.map.depthTexture.magFilter=qt);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let se=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();Z.isPointLight!==!0&&V.updateMatrices(Z,_);for(let re=0;re<se;re++){let ye=V.getCamera(re);if(Z.isPointLight){let Me=V.camera,We=V.matrix,ke=Z.distance||Me.far;ke!==Me.far&&(Me.far=ke,Me.updateProjectionMatrix()),Uo.setFromMatrixPosition(Z.matrixWorld),Me.position.copy(Uo),Iu.copy(Me.position),Iu.add(Ly[re]),Me.up.copy(Dy[re]),Me.lookAt(Iu),Me.updateMatrixWorld(),We.makeTranslation(-Uo.x,-Uo.y,-Uo.z),Df.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Df,Me.coordinateSystem,Me.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,re),i.clear();else{re===0&&(i.setRenderTarget(V.map),i.clear());let Me=V.getViewport(re);o.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),N.viewport(o)}n=V.getFrustum(re),M(E,_,ye,Z,this.type)}V.isPointLightShadow!==!0&&this.type===xr&&T(V,_),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(R,L,O)};function T(w,E){let _=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new En(s.x,s.y,{format:rs,type:ri}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(E,null,_,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(E,null,_,f,x,null)}function A(w,E,_,R){let L=null,O=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(O!==void 0)L=O;else if(L=_.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let N=L.uuid,z=E.uuid,D=c[N];D===void 0&&(D={},c[N]=D);let G=D[z];G===void 0&&(G=L.clone(),D[z]=G,E.addEventListener("dispose",b)),L=G}if(L.visible=E.visible,L.wireframe=E.wireframe,R===xr?L.side=E.shadowSide!==null?E.shadowSide:E.side:L.side=E.shadowSide!==null?E.shadowSide:h[E.side],L.alphaMap=E.alphaMap,L.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,L.map=E.map,L.clipShadows=E.clipShadows,L.clippingPlanes=E.clippingPlanes,L.clipIntersection=E.clipIntersection,L.displacementMap=E.displacementMap,L.displacementScale=E.displacementScale,L.displacementBias=E.displacementBias,L.wireframeLinewidth=E.wireframeLinewidth,L.linewidth=E.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let N=i.properties.get(L);N.light=_}return L}function M(w,E,_,R,L){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===xr)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);let z=e.update(w),D=w.material;if(Array.isArray(D)){let G=z.groups;for(let Z=0,V=G.length;Z<V;Z++){let oe=G[Z],$=D[oe.materialIndex];if($&&$.visible){let se=A(w,$,R,L);w.onBeforeShadow(i,w,E,_,z,se,oe),i.renderBufferDirect(_,null,z,se,w,oe),w.onAfterShadow(i,w,E,_,z,se,oe)}}}else if(D.visible){let G=A(w,D,R,L);w.onBeforeShadow(i,w,E,_,z,G,null),i.renderBufferDirect(_,null,z,G,w,null),w.onAfterShadow(i,w,E,_,z,G,null)}}let N=w.children;for(let z=0,D=N.length;z<D;z++)M(N[z],E,_,R,L)}function b(w){w.target.removeEventListener("dispose",b);for(let _ in c){let R=c[_],L=w.target.uuid;L in R&&(R[L].dispose(),delete R[L])}}}function Uy(i,e){function t(){let U=!1,xe=new Ct,Y=null,ve=new Ct(0,0,0,0);return{setMask:function(Ee){Y!==Ee&&!U&&(i.colorMask(Ee,Ee,Ee,Ee),Y=Ee)},setLocked:function(Ee){U=Ee},setClear:function(Ee,he,$e,Ze,B){B===!0&&(Ee*=Ze,he*=Ze,$e*=Ze),xe.set(Ee,he,$e,Ze),ve.equals(xe)===!1&&(i.clearColor(Ee,he,$e,Ze),ve.copy(xe))},reset:function(){U=!1,Y=null,ve.set(-1,0,0,0)}}}function n(){let U=!1,xe=!1,Y=null,ve=null,Ee=null;return{setReversed:function(he){if(xe!==he){let $e=e.get("EXT_clip_control");he?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT),xe=he;let Ze=Ee;Ee=null,this.setClear(Ze)}},getReversed:function(){return xe},setTest:function(he){he?P(i.DEPTH_TEST):F(i.DEPTH_TEST)},setMask:function(he){Y!==he&&!U&&(i.depthMask(he),Y=he)},setFunc:function(he){if(xe&&(he=sf[he]),ve!==he){switch(he){case xa:i.depthFunc(i.NEVER);break;case ya:i.depthFunc(i.ALWAYS);break;case va:i.depthFunc(i.LESS);break;case $s:i.depthFunc(i.LEQUAL);break;case Ma:i.depthFunc(i.EQUAL);break;case Sa:i.depthFunc(i.GEQUAL);break;case ba:i.depthFunc(i.GREATER);break;case Ea:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=he}},setLocked:function(he){U=he},setClear:function(he){Ee!==he&&(Ee=he,xe&&(he=1-he),i.clearDepth(he))},reset:function(){U=!1,Y=null,ve=null,Ee=null,xe=!1}}}function s(){let U=!1,xe=null,Y=null,ve=null,Ee=null,he=null,$e=null,Ze=null,B=null;return{setTest:function(pe){U||(pe?P(i.STENCIL_TEST):F(i.STENCIL_TEST))},setMask:function(pe){xe!==pe&&!U&&(i.stencilMask(pe),xe=pe)},setFunc:function(pe,De,tt){(Y!==pe||ve!==De||Ee!==tt)&&(i.stencilFunc(pe,De,tt),Y=pe,ve=De,Ee=tt)},setOp:function(pe,De,tt){(he!==pe||$e!==De||Ze!==tt)&&(i.stencilOp(pe,De,tt),he=pe,$e=De,Ze=tt)},setLocked:function(pe){U=pe},setClear:function(pe){B!==pe&&(i.clearStencil(pe),B=pe)},reset:function(){U=!1,xe=null,Y=null,ve=null,Ee=null,he=null,$e=null,Ze=null,B=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,u={},h={},d={},f=new WeakMap,g=[],x=null,p=!1,m=null,T=null,A=null,M=null,b=null,w=null,E=null,_=new nt(0,0,0),R=0,L=!1,O=null,N=null,z=null,D=null,G=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,oe=0,$=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec($)[1]),V=oe>=1):$.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),V=oe>=2);let se=null,re={},ye=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),We=new Ct().fromArray(ye),ke=new Ct().fromArray(Me);function W(U,xe,Y,ve){let Ee=new Uint8Array(4),he=i.createTexture();i.bindTexture(U,he),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $e=0;$e<Y;$e++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(xe+$e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return he}let I={};I[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),I[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),I[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),P(i.DEPTH_TEST),o.setFunc($s),fe(!1),de(Xc),P(i.CULL_FACE),ee(gi);function P(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function F(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function K(U,xe){return d[U]!==xe?(i.bindFramebuffer(U,xe),d[U]=xe,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=xe),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function te(U,xe){let Y=g,ve=!1;if(U){Y=f.get(xe),Y===void 0&&(Y=[],f.set(xe,Y));let Ee=U.textures;if(Y.length!==Ee.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let he=0,$e=Ee.length;he<$e;he++)Y[he]=i.COLOR_ATTACHMENT0+he;Y.length=Ee.length,ve=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,ve=!0);ve&&i.drawBuffers(Y)}function ge(U){return x!==U?(i.useProgram(U),x=U,!0):!1}let Ue={[Rs]:i.FUNC_ADD,[Md]:i.FUNC_SUBTRACT,[Sd]:i.FUNC_REVERSE_SUBTRACT};Ue[bd]=i.MIN,Ue[Ed]=i.MAX;let X={[Td]:i.ZERO,[wd]:i.ONE,[Ad]:i.SRC_COLOR,[Kc]:i.SRC_ALPHA,[Dd]:i.SRC_ALPHA_SATURATE,[Pd]:i.DST_COLOR,[Cd]:i.DST_ALPHA,[Rd]:i.ONE_MINUS_SRC_COLOR,[jc]:i.ONE_MINUS_SRC_ALPHA,[Ld]:i.ONE_MINUS_DST_COLOR,[Id]:i.ONE_MINUS_DST_ALPHA,[Nd]:i.CONSTANT_COLOR,[Ud]:i.ONE_MINUS_CONSTANT_COLOR,[Fd]:i.CONSTANT_ALPHA,[Od]:i.ONE_MINUS_CONSTANT_ALPHA};function ee(U,xe,Y,ve,Ee,he,$e,Ze,B,pe){if(U===gi){p===!0&&(F(i.BLEND),p=!1);return}if(p===!1&&(P(i.BLEND),p=!0),U!==vd){if(U!==m||pe!==L){if((T!==Rs||b!==Rs)&&(i.blendEquation(i.FUNC_ADD),T=Rs,b=Rs),pe)switch(U){case yr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qc:i.blendFunc(i.ONE,i.ONE);break;case Yc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:st("WebGLState: Invalid blending: ",U);break}else switch(U){case yr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Yc:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zc:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",U);break}A=null,M=null,w=null,E=null,_.set(0,0,0),R=0,m=U,L=pe}return}Ee=Ee||xe,he=he||Y,$e=$e||ve,(xe!==T||Ee!==b)&&(i.blendEquationSeparate(Ue[xe],Ue[Ee]),T=xe,b=Ee),(Y!==A||ve!==M||he!==w||$e!==E)&&(i.blendFuncSeparate(X[Y],X[ve],X[he],X[$e]),A=Y,M=ve,w=he,E=$e),(Ze.equals(_)===!1||B!==R)&&(i.blendColor(Ze.r,Ze.g,Ze.b,B),_.copy(Ze),R=B),m=U,L=!1}function me(U,xe){U.side===an?F(i.CULL_FACE):P(i.CULL_FACE);let Y=U.side===xn;xe&&(Y=!Y),fe(Y),U.blending===yr&&U.transparent===!1?ee(gi):ee(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let ve=U.stencilWrite;a.setTest(ve),ve&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Oe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?P(i.SAMPLE_ALPHA_TO_COVERAGE):F(i.SAMPLE_ALPHA_TO_COVERAGE)}function fe(U){O!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),O=U)}function de(U){U!==_d?(P(i.CULL_FACE),U!==N&&(U===Xc?i.cullFace(i.BACK):U===xd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):F(i.CULL_FACE),N=U}function Ve(U){U!==z&&(V&&i.lineWidth(U),z=U)}function Oe(U,xe,Y){U?(P(i.POLYGON_OFFSET_FILL),(D!==xe||G!==Y)&&(D=xe,G=Y,o.getReversed()&&(xe=-xe),i.polygonOffset(xe,Y))):F(i.POLYGON_OFFSET_FILL)}function Se(U){U?P(i.SCISSOR_TEST):F(i.SCISSOR_TEST)}function ze(U){U===void 0&&(U=i.TEXTURE0+Z-1),se!==U&&(i.activeTexture(U),se=U)}function k(U,xe,Y){Y===void 0&&(se===null?Y=i.TEXTURE0+Z-1:Y=se);let ve=re[Y];ve===void 0&&(ve={type:void 0,texture:void 0},re[Y]=ve),(ve.type!==U||ve.texture!==xe)&&(se!==Y&&(i.activeTexture(Y),se=Y),i.bindTexture(U,xe||I[U]),ve.type=U,ve.texture=xe)}function je(){let U=re[se];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Ke(){try{i.compressedTexImage2D(...arguments)}catch(U){st("WebGLState:",U)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(U){st("WebGLState:",U)}}function y(){try{i.texSubImage2D(...arguments)}catch(U){st("WebGLState:",U)}}function q(){try{i.texSubImage3D(...arguments)}catch(U){st("WebGLState:",U)}}function ne(){try{i.compressedTexSubImage2D(...arguments)}catch(U){st("WebGLState:",U)}}function ae(){try{i.compressedTexSubImage3D(...arguments)}catch(U){st("WebGLState:",U)}}function _e(){try{i.texStorage2D(...arguments)}catch(U){st("WebGLState:",U)}}function Te(){try{i.texStorage3D(...arguments)}catch(U){st("WebGLState:",U)}}function le(){try{i.texImage2D(...arguments)}catch(U){st("WebGLState:",U)}}function ue(){try{i.texImage3D(...arguments)}catch(U){st("WebGLState:",U)}}function we(U){return h[U]!==void 0?h[U]:i.getParameter(U)}function Je(U,xe){h[U]!==xe&&(i.pixelStorei(U,xe),h[U]=xe)}function Re(U){We.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),We.copy(U))}function Ce(U){ke.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),ke.copy(U))}function Ye(U,xe){let Y=c.get(xe);Y===void 0&&(Y=new WeakMap,c.set(xe,Y));let ve=Y.get(U);ve===void 0&&(ve=i.getUniformBlockIndex(xe,U.name),Y.set(U,ve))}function ce(U,xe){let ve=c.get(xe).get(U);l.get(xe)!==ve&&(i.uniformBlockBinding(xe,ve,U.__bindingPointIndex),l.set(xe,ve))}function Ie(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},h={},se=null,re={},d={},f=new WeakMap,g=[],x=null,p=!1,m=null,T=null,A=null,M=null,b=null,w=null,E=null,_=new nt(0,0,0),R=0,L=!1,O=null,N=null,z=null,D=null,G=null,We.set(0,0,i.canvas.width,i.canvas.height),ke.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:P,disable:F,bindFramebuffer:K,drawBuffers:te,useProgram:ge,setBlending:ee,setMaterial:me,setFlipSided:fe,setCullFace:de,setLineWidth:Ve,setPolygonOffset:Oe,setScissorTest:Se,activeTexture:ze,bindTexture:k,unbindTexture:je,compressedTexImage2D:Ke,compressedTexImage3D:C,texImage2D:le,texImage3D:ue,pixelStorei:Je,getParameter:we,updateUBOMapping:Ye,uniformBlockBinding:ce,texStorage2D:_e,texStorage3D:Te,texSubImage2D:y,texSubImage3D:q,compressedTexSubImage2D:ne,compressedTexSubImage3D:ae,scissor:Re,viewport:Ce,reset:Ie}}function Fy(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,u=new WeakMap,h=new Set,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,y){return g?new OffscreenCanvas(C,y):er("canvas")}function p(C,y,q){let ne=1,ae=Ke(C);if((ae.width>q||ae.height>q)&&(ne=q/Math.max(ae.width,ae.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let _e=Math.floor(ne*ae.width),Te=Math.floor(ne*ae.height);d===void 0&&(d=x(_e,Te));let le=y?x(_e,Te):d;return le.width=_e,le.height=Te,le.getContext("2d").drawImage(C,0,0,_e,Te),Qe("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+_e+"x"+Te+")."),le}else return"data"in C&&Qe("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),C;return C}function m(C){return C.generateMipmaps}function T(C){i.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,y,q,ne,ae,_e=!1){if(C!==null){if(i[C]!==void 0)return i[C];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Te;ne&&(Te=e.get("EXT_texture_norm16"),Te||Qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let le=y;if(y===i.RED&&(q===i.FLOAT&&(le=i.R32F),q===i.HALF_FLOAT&&(le=i.R16F),q===i.UNSIGNED_BYTE&&(le=i.R8),q===i.UNSIGNED_SHORT&&Te&&(le=Te.R16_EXT),q===i.SHORT&&Te&&(le=Te.R16_SNORM_EXT)),y===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.R8UI),q===i.UNSIGNED_SHORT&&(le=i.R16UI),q===i.UNSIGNED_INT&&(le=i.R32UI),q===i.BYTE&&(le=i.R8I),q===i.SHORT&&(le=i.R16I),q===i.INT&&(le=i.R32I)),y===i.RG&&(q===i.FLOAT&&(le=i.RG32F),q===i.HALF_FLOAT&&(le=i.RG16F),q===i.UNSIGNED_BYTE&&(le=i.RG8),q===i.UNSIGNED_SHORT&&Te&&(le=Te.RG16_EXT),q===i.SHORT&&Te&&(le=Te.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.RG8UI),q===i.UNSIGNED_SHORT&&(le=i.RG16UI),q===i.UNSIGNED_INT&&(le=i.RG32UI),q===i.BYTE&&(le=i.RG8I),q===i.SHORT&&(le=i.RG16I),q===i.INT&&(le=i.RG32I)),y===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.RGB8UI),q===i.UNSIGNED_SHORT&&(le=i.RGB16UI),q===i.UNSIGNED_INT&&(le=i.RGB32UI),q===i.BYTE&&(le=i.RGB8I),q===i.SHORT&&(le=i.RGB16I),q===i.INT&&(le=i.RGB32I)),y===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(le=i.RGBA16UI),q===i.UNSIGNED_INT&&(le=i.RGBA32UI),q===i.BYTE&&(le=i.RGBA8I),q===i.SHORT&&(le=i.RGBA16I),q===i.INT&&(le=i.RGBA32I)),y===i.RGB&&(q===i.UNSIGNED_SHORT&&Te&&(le=Te.RGB16_EXT),q===i.SHORT&&Te&&(le=Te.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(le=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(le=i.R11F_G11F_B10F)),y===i.RGBA){let ue=_e?Yr:pt.getTransfer(ae);q===i.FLOAT&&(le=i.RGBA32F),q===i.HALF_FLOAT&&(le=i.RGBA16F),q===i.UNSIGNED_BYTE&&(le=ue===Et?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&Te&&(le=Te.RGBA16_EXT),q===i.SHORT&&Te&&(le=Te.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(le=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(le=i.RGB5_A1)}return(le===i.R16F||le===i.R32F||le===i.RG16F||le===i.RG32F||le===i.RGBA16F||le===i.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function b(C,y){let q;return C?y===null||y===si||y===Sr?q=i.DEPTH24_STENCIL8:y===Bn?q=i.DEPTH32F_STENCIL8:y===Mr&&(q=i.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===si||y===Sr?q=i.DEPTH_COMPONENT24:y===Bn?q=i.DEPTH_COMPONENT32F:y===Mr&&(q=i.DEPTH_COMPONENT16),q}function w(C,y){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==qt&&C.minFilter!==Yt?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function E(C){let y=C.target;y.removeEventListener("dispose",E),R(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&h.delete(y)}function _(C){let y=C.target;y.removeEventListener("dispose",_),O(y)}function R(C){let y=n.get(C);if(y.__webglInit===void 0)return;let q=C.source,ne=f.get(q);if(ne){let ae=ne[y.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&L(C),Object.keys(ne).length===0&&f.delete(q)}n.remove(C)}function L(C){let y=n.get(C);i.deleteTexture(y.__webglTexture);let q=C.source,ne=f.get(q);delete ne[y.__cacheKey],o.memory.textures--}function O(C){let y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(y.__webglFramebuffer[ne]))for(let ae=0;ae<y.__webglFramebuffer[ne].length;ae++)i.deleteFramebuffer(y.__webglFramebuffer[ne][ae]);else i.deleteFramebuffer(y.__webglFramebuffer[ne]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[ne])}else{if(Array.isArray(y.__webglFramebuffer))for(let ne=0;ne<y.__webglFramebuffer.length;ne++)i.deleteFramebuffer(y.__webglFramebuffer[ne]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ne=0;ne<y.__webglColorRenderbuffer.length;ne++)y.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[ne]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let q=C.textures;for(let ne=0,ae=q.length;ne<ae;ne++){let _e=n.get(q[ne]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),o.memory.textures--),n.remove(q[ne])}n.remove(C)}let N=0;function z(){N=0}function D(){return N}function G(C){N=C}function Z(){let C=N;return C>=s.maxTextures&&Qe("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,C}function V(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function oe(C,y){let q=n.get(C);if(C.isVideoTexture&&k(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&q.__version!==C.version){let ne=C.image;if(ne===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{F(q,C,y);return}}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+y)}function $(C,y){let q=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){F(q,C,y);return}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+y)}function se(C,y){let q=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){F(q,C,y);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+y)}function re(C,y){let q=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&q.__version!==C.version){K(q,C,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+y)}let ye={[Ki]:i.REPEAT,[Wn]:i.CLAMP_TO_EDGE,[Js]:i.MIRRORED_REPEAT},Me={[qt]:i.NEAREST,[Ja]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[Yt]:i.LINEAR,[vr]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},We={[Zd]:i.NEVER,[Qd]:i.ALWAYS,[Kd]:i.LESS,[Bl]:i.LEQUAL,[jd]:i.EQUAL,[Hl]:i.GEQUAL,[$d]:i.GREATER,[Jd]:i.NOTEQUAL};function ke(C,y){if(y.type===Bn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Yt||y.magFilter===vr||y.magFilter===Is||y.magFilter===ii||y.minFilter===Yt||y.minFilter===vr||y.minFilter===Is||y.minFilter===ii)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ye[y.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ye[y.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ye[y.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Me[y.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Me[y.minFilter]),y.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,We[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===qt||y.minFilter!==Is&&y.minFilter!==ii||y.type===Bn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function W(C,y){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",E));let ne=y.source,ae=f.get(ne);ae===void 0&&(ae={},f.set(ne,ae));let _e=V(y);if(_e!==C.__cacheKey){ae[_e]===void 0&&(ae[_e]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ae[_e].usedTimes++;let Te=ae[C.__cacheKey];Te!==void 0&&(ae[C.__cacheKey].usedTimes--,Te.usedTimes===0&&L(y)),C.__cacheKey=_e,C.__webglTexture=ae[_e].texture}return q}function I(C,y,q){return Math.floor(Math.floor(C/q)/y)}function P(C,y,q,ne){let _e=C.updateRanges;if(_e.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,q,ne,y.data);else{_e.sort((Je,Re)=>Je.start-Re.start);let Te=0;for(let Je=1;Je<_e.length;Je++){let Re=_e[Te],Ce=_e[Je],Ye=Re.start+Re.count,ce=I(Ce.start,y.width,4),Ie=I(Re.start,y.width,4);Ce.start<=Ye+1&&ce===Ie&&I(Ce.start+Ce.count-1,y.width,4)===ce?Re.count=Math.max(Re.count,Ce.start+Ce.count-Re.start):(++Te,_e[Te]=Ce)}_e.length=Te+1;let le=t.getParameter(i.UNPACK_ROW_LENGTH),ue=t.getParameter(i.UNPACK_SKIP_PIXELS),we=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Je=0,Re=_e.length;Je<Re;Je++){let Ce=_e[Je],Ye=Math.floor(Ce.start/4),ce=Math.ceil(Ce.count/4),Ie=Ye%y.width,U=Math.floor(Ye/y.width),xe=ce,Y=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Ie,U,xe,Y,q,ne,y.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,le),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(i.UNPACK_SKIP_ROWS,we)}}function F(C,y,q){let ne=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ne=i.TEXTURE_3D);let ae=W(C,y),_e=y.source;t.bindTexture(ne,C.__webglTexture,i.TEXTURE0+q);let Te=n.get(_e);if(_e.version!==Te.__version||ae===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let Y=pt.getPrimaries(pt.workingColorSpace),ve=y.colorSpace===Fi?null:pt.getPrimaries(y.colorSpace),Ee=y.colorSpace===Fi||Y===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let ue=p(y.image,!1,s.maxTextureSize);ue=je(y,ue);let we=r.convert(y.format,y.colorSpace),Je=r.convert(y.type),Re=M(y.internalFormat,we,Je,y.normalized,y.colorSpace,y.isVideoTexture);ke(ne,y);let Ce,Ye=y.mipmaps,ce=y.isVideoTexture!==!0,Ie=Te.__version===void 0||ae===!0,U=_e.dataReady,xe=w(y,ue);if(y.isDepthTexture)Re=b(y.format===ss,y.type),Ie&&(ce?t.texStorage2D(i.TEXTURE_2D,1,Re,ue.width,ue.height):t.texImage2D(i.TEXTURE_2D,0,Re,ue.width,ue.height,0,we,Je,null));else if(y.isDataTexture)if(Ye.length>0){ce&&Ie&&t.texStorage2D(i.TEXTURE_2D,xe,Re,Ye[0].width,Ye[0].height);for(let Y=0,ve=Ye.length;Y<ve;Y++)Ce=Ye[Y],ce?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Ce.width,Ce.height,we,Je,Ce.data):t.texImage2D(i.TEXTURE_2D,Y,Re,Ce.width,Ce.height,0,we,Je,Ce.data);y.generateMipmaps=!1}else ce?(Ie&&t.texStorage2D(i.TEXTURE_2D,xe,Re,ue.width,ue.height),U&&P(y,ue,we,Je)):t.texImage2D(i.TEXTURE_2D,0,Re,ue.width,ue.height,0,we,Je,ue.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ce&&Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Re,Ye[0].width,Ye[0].height,ue.depth);for(let Y=0,ve=Ye.length;Y<ve;Y++)if(Ce=Ye[Y],y.format!==Hn)if(we!==null)if(ce){if(U)if(y.layerUpdates.size>0){let Ee=yu(Ce.width,Ce.height,y.format,y.type);for(let he of y.layerUpdates){let $e=Ce.data.subarray(he*Ee/Ce.data.BYTES_PER_ELEMENT,(he+1)*Ee/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,he,Ce.width,Ce.height,1,we,$e)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Ce.width,Ce.height,ue.depth,we,Ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Re,Ce.width,Ce.height,ue.depth,0,Ce.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ce?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Ce.width,Ce.height,ue.depth,we,Je,Ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,Re,Ce.width,Ce.height,ue.depth,0,we,Je,Ce.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ce&&Ie&&t.texStorage2D(i.TEXTURE_2D,xe,Re,Ye[0].width,Ye[0].height);for(let Y=0,ve=Ye.length;Y<ve;Y++)Ce=Ye[Y],y.format!==Hn?we!==null?ce?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,Ce.width,Ce.height,we,Ce.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,Re,Ce.width,Ce.height,0,Ce.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Ce.width,Ce.height,we,Je,Ce.data):t.texImage2D(i.TEXTURE_2D,Y,Re,Ce.width,Ce.height,0,we,Je,Ce.data)}else if(y.isDataArrayTexture)if(ce){if(Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Re,ue.width,ue.height,ue.depth),U)if(y.layerUpdates.size>0){let Y=yu(ue.width,ue.height,y.format,y.type);for(let ve of y.layerUpdates){let Ee=ue.data.subarray(ve*Y/ue.data.BYTES_PER_ELEMENT,(ve+1)*Y/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,ue.width,ue.height,1,we,Je,Ee)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,we,Je,ue.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ue.width,ue.height,ue.depth,0,we,Je,ue.data);else if(y.isData3DTexture)ce?(Ie&&t.texStorage3D(i.TEXTURE_3D,xe,Re,ue.width,ue.height,ue.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,we,Je,ue.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ue.width,ue.height,ue.depth,0,we,Je,ue.data);else if(y.isFramebufferTexture){if(Ie)if(ce)t.texStorage2D(i.TEXTURE_2D,xe,Re,ue.width,ue.height);else{let Y=ue.width,ve=ue.height;for(let Ee=0;Ee<xe;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,Re,Y,ve,0,we,Je,null),Y>>=1,ve>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let Y=i.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),ue.parentNode!==Y){Y.appendChild(ue),h.add(y),Y.onpaint=ve=>{let Ee=ve.changedElements;for(let he of h)Ee.includes(he.image)&&(he.needsUpdate=!0)},Y.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ue);else{let Ee=i.RGBA,he=i.RGBA,$e=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ee,he,$e,ue)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ye.length>0){if(ce&&Ie){let Y=Ke(Ye[0]);t.texStorage2D(i.TEXTURE_2D,xe,Re,Y.width,Y.height)}for(let Y=0,ve=Ye.length;Y<ve;Y++)Ce=Ye[Y],ce?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,we,Je,Ce):t.texImage2D(i.TEXTURE_2D,Y,Re,we,Je,Ce);y.generateMipmaps=!1}else if(ce){if(Ie){let Y=Ke(ue);t.texStorage2D(i.TEXTURE_2D,xe,Re,Y.width,Y.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,Je,ue)}else t.texImage2D(i.TEXTURE_2D,0,Re,we,Je,ue);m(y)&&T(ne),Te.__version=_e.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function K(C,y,q){if(y.image.length!==6)return;let ne=W(C,y),ae=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+q);let _e=n.get(ae);if(ae.version!==_e.__version||ne===!0){t.activeTexture(i.TEXTURE0+q);let Te=pt.getPrimaries(pt.workingColorSpace),le=y.colorSpace===Fi?null:pt.getPrimaries(y.colorSpace),ue=y.colorSpace===Fi||Te===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let we=y.isCompressedTexture||y.image[0].isCompressedTexture,Je=y.image[0]&&y.image[0].isDataTexture,Re=[];for(let he=0;he<6;he++)!we&&!Je?Re[he]=p(y.image[he],!0,s.maxCubemapSize):Re[he]=Je?y.image[he].image:y.image[he],Re[he]=je(y,Re[he]);let Ce=Re[0],Ye=r.convert(y.format,y.colorSpace),ce=r.convert(y.type),Ie=M(y.internalFormat,Ye,ce,y.normalized,y.colorSpace),U=y.isVideoTexture!==!0,xe=_e.__version===void 0||ne===!0,Y=ae.dataReady,ve=w(y,Ce);ke(i.TEXTURE_CUBE_MAP,y);let Ee;if(we){U&&xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ie,Ce.width,Ce.height);for(let he=0;he<6;he++){Ee=Re[he].mipmaps;for(let $e=0;$e<Ee.length;$e++){let Ze=Ee[$e];y.format!==Hn?Ye!==null?U?Y&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e,0,0,Ze.width,Ze.height,Ye,Ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e,Ie,Ze.width,Ze.height,0,Ze.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e,0,0,Ze.width,Ze.height,Ye,ce,Ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e,Ie,Ze.width,Ze.height,0,Ye,ce,Ze.data)}}}else{if(Ee=y.mipmaps,U&&xe){Ee.length>0&&ve++;let he=Ke(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ie,he.width,he.height)}for(let he=0;he<6;he++)if(Je){U?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Re[he].width,Re[he].height,Ye,ce,Re[he].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Ie,Re[he].width,Re[he].height,0,Ye,ce,Re[he].data);for(let $e=0;$e<Ee.length;$e++){let B=Ee[$e].image[he].image;U?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e+1,0,0,B.width,B.height,Ye,ce,B.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e+1,Ie,B.width,B.height,0,Ye,ce,B.data)}}else{U?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ye,ce,Re[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Ie,Ye,ce,Re[he]);for(let $e=0;$e<Ee.length;$e++){let Ze=Ee[$e];U?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e+1,0,0,Ye,ce,Ze.image[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,$e+1,Ie,Ye,ce,Ze.image[he])}}}m(y)&&T(i.TEXTURE_CUBE_MAP),_e.__version=ae.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function te(C,y,q,ne,ae,_e){let Te=r.convert(q.format,q.colorSpace),le=r.convert(q.type),ue=M(q.internalFormat,Te,le,q.normalized,q.colorSpace),we=n.get(y),Je=n.get(q);if(Je.__renderTarget=y,!we.__hasExternalTextures){let Re=Math.max(1,y.width>>_e),Ce=Math.max(1,y.height>>_e);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,_e,ue,Re,Ce,y.depth,0,Te,le,null):t.texImage2D(ae,_e,ue,Re,Ce,0,Te,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),ze(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ae,Je.__webglTexture,0,Se(y)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,ae,Je.__webglTexture,_e),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(C,y,q){if(i.bindRenderbuffer(i.RENDERBUFFER,C),y.depthBuffer){let ne=y.depthTexture,ae=ne&&ne.isDepthTexture?ne.type:null,_e=b(y.stencilBuffer,ae),Te=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ze(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(y),_e,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(y),_e,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,_e,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,C)}else{let ne=y.textures;for(let ae=0;ae<ne.length;ae++){let _e=ne[ae],Te=r.convert(_e.format,_e.colorSpace),le=r.convert(_e.type),ue=M(_e.internalFormat,Te,le,_e.normalized,_e.colorSpace);ze(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(y),ue,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(y),ue,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ue,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(C,y,q){let ne=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ae=n.get(y.depthTexture);if(ae.__renderTarget=y,(!ae.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),ne){if(ae.__webglInit===void 0&&(ae.__webglInit=!0,y.depthTexture.addEventListener("dispose",E)),ae.__webglTexture===void 0){ae.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),ke(i.TEXTURE_CUBE_MAP,y.depthTexture);let we=r.convert(y.depthTexture.format),Je=r.convert(y.depthTexture.type),Re;y.depthTexture.format===ui?Re=i.DEPTH_COMPONENT24:y.depthTexture.format===ss&&(Re=i.DEPTH24_STENCIL8);for(let Ce=0;Ce<6;Ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,Re,y.width,y.height,0,we,Je,null)}}else oe(y.depthTexture,0);let _e=ae.__webglTexture,Te=Se(y),le=ne?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,ue=y.depthTexture.format===ss?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===ui)ze(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ue,le,_e,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,ue,le,_e,0);else if(y.depthTexture.format===ss)ze(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ue,le,_e,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,ue,le,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function X(C){let y=n.get(C),q=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let ne=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ne){let ae=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ne.removeEventListener("dispose",ae)};ne.addEventListener("dispose",ae),y.__depthDisposeCallback=ae}y.__boundDepthTexture=ne}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(q)for(let ne=0;ne<6;ne++)Ue(y.__webglFramebuffer[ne],C,ne);else{let ne=C.texture.mipmaps;ne&&ne.length>0?Ue(y.__webglFramebuffer[0],C,0):Ue(y.__webglFramebuffer,C,0)}else if(q){y.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[ne]),y.__webglDepthbuffer[ne]===void 0)y.__webglDepthbuffer[ne]=i.createRenderbuffer(),ge(y.__webglDepthbuffer[ne],C,!1);else{let ae=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=y.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,_e)}}else{let ne=C.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),ge(y.__webglDepthbuffer,C,!1);else{let ae=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,_e)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(C,y,q){let ne=n.get(C);y!==void 0&&te(ne.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&X(C)}function me(C){let y=C.texture,q=n.get(C),ne=n.get(y);C.addEventListener("dispose",_);let ae=C.textures,_e=C.isWebGLCubeRenderTarget===!0,Te=ae.length>1;if(Te||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=y.version,o.memory.textures++),_e){q.__webglFramebuffer=[];for(let le=0;le<6;le++)if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer[le]=[];for(let ue=0;ue<y.mipmaps.length;ue++)q.__webglFramebuffer[le][ue]=i.createFramebuffer()}else q.__webglFramebuffer[le]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer=[];for(let le=0;le<y.mipmaps.length;le++)q.__webglFramebuffer[le]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Te)for(let le=0,ue=ae.length;le<ue;le++){let we=n.get(ae[le]);we.__webglTexture===void 0&&(we.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&ze(C)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let le=0;le<ae.length;le++){let ue=ae[le];q.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[le]);let we=r.convert(ue.format,ue.colorSpace),Je=r.convert(ue.type),Re=M(ue.internalFormat,we,Je,ue.normalized,ue.colorSpace,C.isXRRenderTarget===!0),Ce=Se(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Re,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,q.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(_e){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),ke(i.TEXTURE_CUBE_MAP,y);for(let le=0;le<6;le++)if(y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)te(q.__webglFramebuffer[le][ue],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ue);else te(q.__webglFramebuffer[le],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(y)&&T(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let le=0,ue=ae.length;le<ue;le++){let we=ae[le],Je=n.get(we),Re=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Re=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Re,Je.__webglTexture),ke(Re,we),te(q.__webglFramebuffer,C,we,i.COLOR_ATTACHMENT0+le,Re,0),m(we)&&T(Re)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(le=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,ne.__webglTexture),ke(le,y),y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)te(q.__webglFramebuffer[ue],C,y,i.COLOR_ATTACHMENT0,le,ue);else te(q.__webglFramebuffer,C,y,i.COLOR_ATTACHMENT0,le,0);m(y)&&T(le),t.unbindTexture()}C.depthBuffer&&X(C)}function fe(C){let y=C.textures;for(let q=0,ne=y.length;q<ne;q++){let ae=y[q];if(m(ae)){let _e=A(C),Te=n.get(ae).__webglTexture;t.bindTexture(_e,Te),T(_e),t.unbindTexture()}}}let de=[],Ve=[];function Oe(C){if(C.samples>0){if(ze(C)===!1){let y=C.textures,q=C.width,ne=C.height,ae=i.COLOR_BUFFER_BIT,_e=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(C),le=y.length>1;if(le)for(let we=0;we<y.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);let ue=C.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let we=0;we<y.length;we++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[we]);let Je=n.get(y[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Je,0)}i.blitFramebuffer(0,0,q,ne,0,0,q,ne,ae,i.NEAREST),l===!0&&(de.length=0,Ve.length=0,de.push(i.COLOR_ATTACHMENT0+we),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(de.push(_e),Ve.push(_e),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ve)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let we=0;we<y.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,Te.__webglColorRenderbuffer[we]);let Je=n.get(y[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,Je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Se(C){return Math.min(s.maxSamples,C.samples)}function ze(C){let y=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function k(C){let y=o.render.frame;u.get(C)!==y&&(u.set(C,y),C.update())}function je(C,y){let q=C.colorSpace,ne=C.format,ae=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==_n&&q!==Fi&&(pt.getTransfer(q)===Et?(ne!==Hn||ae!==Pn)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",q)),y}function Ke(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=z,this.getTextureUnits=D,this.setTextureUnits=G,this.setTexture2D=oe,this.setTexture2DArray=$,this.setTexture3D=se,this.setTextureCube=re,this.rebindTextures=ee,this.setupRenderTarget=me,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=te,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Oy(i,e){function t(n,s=Fi){let r,o=pt.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===el)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===au)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===lu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ru)return i.BYTE;if(n===ou)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===Qa)return i.INT;if(n===si)return i.UNSIGNED_INT;if(n===Bn)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===cu)return i.ALPHA;if(n===uu)return i.RGB;if(n===Hn)return i.RGBA;if(n===ui)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===nl)return i.RED;if(n===il)return i.RED_INTEGER;if(n===rs)return i.RG;if(n===sl)return i.RG_INTEGER;if(n===rl)return i.RGBA_INTEGER;if(n===Ao||n===Ro||n===Co||n===Io)if(o===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Io)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ol||n===al||n===ll||n===cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ul||n===hl||n===dl||n===fl||n===pl||n===Po||n===ml)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ul||n===hl)return o===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===fl)return r.COMPRESSED_R11_EAC;if(n===pl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Po)return r.COMPRESSED_RG11_EAC;if(n===ml)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===gl||n===_l||n===xl||n===yl||n===vl||n===Ml||n===Sl||n===bl||n===El||n===Tl||n===wl||n===Al||n===Rl||n===Cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===gl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_l)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ml)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===El)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Al)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Cl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Il||n===Pl||n===Ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Il)return o===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dl||n===Nl||n===Lo||n===Ul)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Dl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Nl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ul)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var By=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Bu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new io(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new On({vertexShader:By,fragmentShader:Hy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new Cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Hu=class extends qn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null,x=typeof XRWebGLBinding<"u",p=new Bu,m={},T=t.getContextAttributes(),A=null,M=null,b=[],w=[],E=new be,_=null,R=null,L=new jt;L.viewport=new Ct;let O=new jt;O.viewport=new Ct;let N=[L,O],z=new qa,D=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let P=b[I];return P===void 0&&(P=new sr,b[I]=P),P.getTargetRaySpace()},this.getControllerGrip=function(I){let P=b[I];return P===void 0&&(P=new sr,b[I]=P),P.getGripSpace()},this.getHand=function(I){let P=b[I];return P===void 0&&(P=new sr,b[I]=P),P.getHandSpace()};function Z(I){let P=w.indexOf(I.inputSource);if(P===-1)return;let F=b[P];F!==void 0&&(F.update(I.inputSource,I.frame,c||o),F.dispatchEvent({type:I.type,data:I.inputSource}))}function V(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",oe);for(let I=0;I<b.length;I++){let P=w[I];P!==null&&(w[I]=null,b[I].disconnect(P))}D=null,G=null,p.reset();for(let I in m)delete m[I];if(e.setRenderTarget(A),f=null,d=null,h=null,s=null,M=null,W.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(E.width,E.height,!1),R!==null){let I=R.camera;I.fov=R.fov,I.zoom=R.zoom,I.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,n.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){a=I,n.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(I){c=I},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(I){if(s=I,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",oe),T.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let F=null,K=null,te=null;T.depth&&(te=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,F=T.stencil?ss:ui,K=T.stencil?Sr:si);let ge={colorFormat:t.RGBA8,depthFormat:te,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(ge),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new En(d.textureWidth,d.textureHeight,{format:Hn,type:Pn,depthTexture:new $i(d.textureWidth,d.textureHeight,K,void 0,void 0,void 0,void 0,void 0,void 0,F),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let F={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,F),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new En(f.framebufferWidth,f.framebufferHeight,{format:Hn,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),W.setContext(s),W.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function oe(I){for(let P=0;P<I.removed.length;P++){let F=I.removed[P],K=w.indexOf(F);K>=0&&(w[K]=null,b[K].disconnect(F))}for(let P=0;P<I.added.length;P++){let F=I.added[P],K=w.indexOf(F);if(K===-1){for(let ge=0;ge<b.length;ge++)if(ge>=w.length){w.push(F),K=ge;break}else if(w[ge]===null){w[ge]=F,K=ge;break}if(K===-1)break}let te=b[K];te&&te.connect(F)}}let $=new S,se=new S;function re(I,P,F){$.setFromMatrixPosition(P.matrixWorld),se.setFromMatrixPosition(F.matrixWorld);let K=$.distanceTo(se),te=P.projectionMatrix.elements,ge=F.projectionMatrix.elements,Ue=te[14]/(te[10]-1),X=te[14]/(te[10]+1),ee=(te[9]+1)/te[5],me=(te[9]-1)/te[5],fe=(te[8]-1)/te[0],de=(ge[8]+1)/ge[0],Ve=Ue*fe,Oe=Ue*de,Se=K/(-fe+de),ze=Se*-fe;if(P.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(ze),I.translateZ(Se),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),te[10]===-1)I.projectionMatrix.copy(P.projectionMatrix),I.projectionMatrixInverse.copy(P.projectionMatrixInverse);else{let k=Ue+Se,je=X+Se,Ke=Ve-ze,C=Oe+(K-ze),y=ee*X/je*k,q=me*X/je*k;I.projectionMatrix.makePerspective(Ke,C,y,q,k,je),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function ye(I,P){P===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(P.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(s===null)return;let P=I.near,F=I.far;p.texture!==null&&(p.depthNear>0&&(P=p.depthNear),p.depthFar>0&&(F=p.depthFar)),z.near=O.near=L.near=P,z.far=O.far=L.far=F,(D!==z.near||G!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),D=z.near,G=z.far),z.layers.mask=I.layers.mask|6,L.layers.mask=z.layers.mask&-5,O.layers.mask=z.layers.mask&-3;let K=I.parent,te=z.cameras;ye(z,K);for(let ge=0;ge<te.length;ge++)ye(te[ge],K);te.length===2?re(z,L,O):z.projectionMatrix.copy(L.projectionMatrix),R===null&&I.isPerspectiveCamera&&(R={camera:I,fov:I.fov,zoom:I.zoom}),Me(I,z,K)};function Me(I,P,F){F===null?I.matrix.copy(P.matrixWorld):(I.matrix.copy(F.matrixWorld),I.matrix.invert(),I.matrix.multiply(P.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(P.projectionMatrix),I.projectionMatrixInverse.copy(P.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=vs*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(I){l=I,d!==null&&(d.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(z)},this.getCameraTexture=function(I){return m[I]};let We=null;function ke(I,P){if(u=P.getViewerPose(c||o),g=P,u!==null){let F=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let K=!1;F.length!==z.cameras.length&&(z.cameras.length=0,K=!0);for(let X=0;X<F.length;X++){let ee=F[X],me=null;if(f!==null)me=f.getViewport(ee);else{let de=h.getViewSubImage(d,ee);me=de.viewport,X===0&&(e.setRenderTargetTextures(M,de.colorTexture,de.depthStencilTexture),e.setRenderTarget(M))}let fe=N[X];fe===void 0&&(fe=new jt,fe.layers.enable(X),fe.viewport=new Ct,N[X]=fe),fe.matrix.fromArray(ee.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(ee.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(me.x,me.y,me.width,me.height),X===0&&(z.matrix.copy(fe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),K===!0&&z.cameras.push(fe)}let te=s.enabledFeatures;if(te&&te.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){h=n.getBinding();let X=h.getDepthInformation(F[0]);X&&X.isValid&&X.texture&&p.init(X,s.renderState)}if(te&&te.includes("camera-access")&&x){e.state.unbindTexture(),h=n.getBinding();for(let X=0;X<F.length;X++){let ee=F[X].camera;if(ee){let me=m[ee];me||(me=new io,m[ee]=me);let fe=h.getCameraImage(ee);me.sourceTexture=fe}}}}for(let F=0;F<b.length;F++){let K=w[F],te=b[F];K!==null&&te!==void 0&&te.update(K,P,c||o)}We&&We(I,P),P.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:P}),g=null}let W=new Nf;W.setAnimationLoop(ke),this.setAnimationLoop=function(I){We=I},this.dispose=function(){}}},zy=new ut,zf=new at;zf.set(-1,0,0,0,1,0,0,0,1);function ky(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,gu(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,T,A,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),h(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),x(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,T,A):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===xn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===xn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let T=e.get(m),A=T.envMap,M=T.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(zy.makeRotationFromEuler(M)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(zf),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,T,A){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*T,p.scale.value=A*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,T){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===xn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let T=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Vy(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,b){let w=b.program;n.uniformBlockBinding(M,w)}function c(M,b){let w=s[M.id];w===void 0&&(p(M),w=u(M),s[M.id]=w,M.addEventListener("dispose",T));let E=b.program;n.updateUBOMapping(M,E);let _=e.render.frame;r[M.id]!==_&&(d(M),r[M.id]=_)}function u(M){let b=h();M.__bindingPointIndex=b;let w=i.createBuffer(),E=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,E,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,w),w}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let b=s[M.id],w=M.uniforms,E=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,R=w.length;_<R;_++){let L=w[_];if(Array.isArray(L))for(let O=0,N=L.length;O<N;O++)f(L[O],_,O,E);else f(L,_,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,b,w,E){if(x(M,b,w,E)===!0){let _=M.__offset,R=M.value;if(Array.isArray(R)){let L=0;for(let O=0;O<R.length;O++){let N=R[O],z=m(N);g(N,M.__data,L),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(L+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(R,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,b,w){typeof M=="number"||typeof M=="boolean"?b[0]=M:M.isMatrix3?(b[0]=M.elements[0],b[1]=M.elements[1],b[2]=M.elements[2],b[3]=0,b[4]=M.elements[3],b[5]=M.elements[4],b[6]=M.elements[5],b[7]=0,b[8]=M.elements[6],b[9]=M.elements[7],b[10]=M.elements[8],b[11]=0):ArrayBuffer.isView(M)?b.set(new M.constructor(M.buffer,M.byteOffset,b.length)):M.toArray(b,w)}function x(M,b,w,E){let _=M.value,R=b+"_"+w;if(E[R]===void 0)return typeof _=="number"||typeof _=="boolean"?E[R]=_:ArrayBuffer.isView(_)?E[R]=_.slice():E[R]=_.clone(),!0;{let L=E[R];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return E[R]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function p(M){let b=M.uniforms,w=0,E=16;for(let R=0,L=b.length;R<L;R++){let O=Array.isArray(b[R])?b[R]:[b[R]];for(let N=0,z=O.length;N<z;N++){let D=O[N],G=Array.isArray(D.value)?D.value:[D.value];for(let Z=0,V=G.length;Z<V;Z++){let oe=G[Z],$=m(oe),se=w%E,re=se%$.boundary,ye=se+re;w+=re,ye!==0&&E-ye<$.storage&&(w+=E-ye),D.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=$.storage}}}let _=w%E;return _>0&&(w+=E-_),M.__size=w,M.__cache={},this}function m(M){let b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):Qe("WebGLRenderer: Unsupported uniform value type.",M),b}function T(M){let b=M.target;b.removeEventListener("dispose",T);let w=o.indexOf(b.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function A(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:A}}var Gy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_i=null;function Wy(){return _i===null&&(_i=new lr(Gy,16,16,rs,ri),_i.name="DFG_LUT",_i.minFilter=Yt,_i.magFilter=Yt,_i.wrapS=Wn,_i.wrapT=Wn,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}var Wl=class{constructor(e={}){let{canvas:t=ef(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Pn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let x=f,p=new Set([rl,sl,il]),m=new Set([Pn,si,Mr,Sr,el,tl]),T=new Uint32Array(4),A=new Int32Array(4),M=new S,b=null,w=null,E=[],_=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,O=!1,N=null,z=null,D=null,G=null;this._outputColorSpace=bt;let Z=0,V=0,oe=null,$=-1,se=null,re=new Ct,ye=new Ct,Me=null,We=new nt(0),ke=0,W=t.width,I=t.height,P=1,F=null,K=null,te=new Ct(0,0,W,I),ge=new Ct(0,0,W,I),Ue=!1,X=new cr,ee=!1,me=!1,fe=new ut,de=new S,Ve=new Ct,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function ze(){return oe===null?P:1}let k=n;function je(v,H){return t.getContext(v,H)}let Ke,C,y,q,ne,ae,_e,Te,le,ue,we,Je,Re,Ce,Ye,ce,Ie,U,xe,Y,ve,Ee,he;try{let v={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",B,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",De,!1),k===null){let H="webgl2";if(k=je(H,v),k===null)throw je(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$e()}catch(v){throw t.removeEventListener("webglcontextlost",B,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",De,!1),st("WebGLRenderer: "+v.message),v}function $e(){Ke=new $_(k),Ke.init(),ve=new Oy(k,Ke),C=new k_(k,Ke,e,ve),y=new Uy(k,Ke),C.reversedDepthBuffer&&d&&y.buffers.depth.setReversed(!0),z=k.createFramebuffer(),D=k.createFramebuffer(),G=k.createFramebuffer(),q=new ex(k),ne=new My,ae=new Fy(k,Ke,y,ne,C,ve,q),_e=new j_(L),Te=new ng(k),Ee=new H_(k,Te),le=new J_(k,Te,q,Ee),ue=new nx(k,le,Te,Ee,q),U=new tx(k,C,ae),Ye=new V_(ne),we=new vy(L,_e,Ke,C,Ee,Ye),Je=new ky(L,ne),Re=new by,Ce=new Cy(Ke),Ie=new B_(L,_e,y,ue,g,l),ce=new Ny(L,ue,C),he=new Vy(k,q,C,y),xe=new z_(k,Ke,q),Y=new Q_(k,Ke,q),q.programs=we.programs,L.capabilities=C,L.extensions=Ke,L.properties=ne,L.renderLists=Re,L.shadowMap=ce,L.state=y,L.info=q}x!==Pn&&(R=new sx(x,t.width,t.height,a,s,r));let Ze=new Hu(L,k);this.xr=Ze,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let v=Ke.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Ke.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(v){v!==void 0&&(P=v,this.setSize(W,I,!1))},this.getSize=function(v){return v.set(W,I)},this.setSize=function(v,H,J=!0){if(Ze.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}W=v,I=H,t.width=Math.floor(v*P),t.height=Math.floor(H*P),J===!0&&(t.style.width=v+"px",t.style.height=H+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,v,H)},this.getDrawingBufferSize=function(v){return v.set(W*P,I*P).floor()},this.setDrawingBufferSize=function(v,H,J){W=v,I=H,P=J,t.width=Math.floor(v*J),t.height=Math.floor(H*J),this.setViewport(0,0,v,H)},this.setEffects=function(v){if(x===Pn){st("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let H=0;H<v.length;H++)if(v[H].isOutputPass===!0){Qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(re)},this.getViewport=function(v){return v.copy(te)},this.setViewport=function(v,H,J,j){v.isVector4?te.set(v.x,v.y,v.z,v.w):te.set(v,H,J,j),y.viewport(re.copy(te).multiplyScalar(P).round())},this.getScissor=function(v){return v.copy(ge)},this.setScissor=function(v,H,J,j){v.isVector4?ge.set(v.x,v.y,v.z,v.w):ge.set(v,H,J,j),y.scissor(ye.copy(ge).multiplyScalar(P).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(v){y.setScissorTest(Ue=v)},this.setOpaqueSort=function(v){F=v},this.setTransparentSort=function(v){K=v},this.getClearColor=function(v){return v.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(v=!0,H=!0,J=!0){let j=0;if(v){let Q=!1;if(oe!==null){let Pe=oe.texture.format;Q=p.has(Pe)}if(Q){let Pe=oe.texture.type,Be=m.has(Pe),Ae=Ie.getClearColor(),He=Ie.getClearAlpha(),Ge=Ae.r,lt=Ae.g,ot=Ae.b;Be?(T[0]=Ge,T[1]=lt,T[2]=ot,T[3]=He,k.clearBufferuiv(k.COLOR,0,T)):(A[0]=Ge,A[1]=lt,A[2]=ot,A[3]=He,k.clearBufferiv(k.COLOR,0,A))}else j|=k.COLOR_BUFFER_BIT}H&&(j|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(j|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&k.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),N=v},this.dispose=function(){t.removeEventListener("webglcontextlost",B,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",De,!1),Ie.dispose(),Re.dispose(),Ce.dispose(),ne.dispose(),_e.dispose(),ue.dispose(),Ee.dispose(),he.dispose(),we.dispose(),Ze.dispose(),Ze.removeEventListener("sessionstart",St),Ze.removeEventListener("sessionend",rn),Ft.stop()};function B(v){v.preventDefault(),Zr("WebGLRenderer: Context Lost."),O=!0}function pe(){Zr("WebGLRenderer: Context Restored."),O=!1;let v=q.autoReset,H=ce.enabled,J=ce.autoUpdate,j=ce.needsUpdate,Q=ce.type;$e(),q.autoReset=v,ce.enabled=H,ce.autoUpdate=J,ce.needsUpdate=j,ce.type=Q}function De(v){st("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function tt(v){let H=v.target;H.removeEventListener("dispose",tt),it(H)}function it(v){rt(v),ne.remove(v)}function rt(v){let H=ne.get(v).programs;H!==void 0&&(H.forEach(function(J){we.releaseProgram(J)}),v.isShaderMaterial&&we.releaseShaderCache(v))}this.renderBufferDirect=function(v,H,J,j,Q,Pe){H===null&&(H=Oe);let Be=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Ae=Lr(v,H,J,j,Q);y.setMaterial(j,Be);let He=J.index,Ge=1;if(j.wireframe===!0){if(He=le.getWireframeAttribute(J),He===void 0)return;Ge=2}let lt=J.drawRange,ot=J.attributes.position,qe=lt.start*Ge,Mt=(lt.start+lt.count)*Ge;Pe!==null&&(qe=Math.max(qe,Pe.start*Ge),Mt=Math.min(Mt,(Pe.start+Pe.count)*Ge)),He!==null?(qe=Math.max(qe,0),Mt=Math.min(Mt,He.count)):ot!=null&&(qe=Math.max(qe,0),Mt=Math.min(Mt,ot.count));let kt=Mt-qe;if(kt<0||kt===1/0)return;Ee.setup(Q,j,Ae,J,He);let Nt,ct=xe;if(He!==null&&(Nt=Te.get(He),ct=Y,ct.setIndex(Nt)),Q.isMesh)j.wireframe===!0?(y.setLineWidth(j.wireframeLinewidth*ze()),ct.setMode(k.LINES)):ct.setMode(k.TRIANGLES);else if(Q.isLine){let vt=j.linewidth;vt===void 0&&(vt=1),y.setLineWidth(vt*ze()),Q.isLineSegments?ct.setMode(k.LINES):Q.isLineLoop?ct.setMode(k.LINE_LOOP):ct.setMode(k.LINE_STRIP)}else Q.isPoints?ct.setMode(k.POINTS):Q.isSprite&&ct.setMode(k.TRIANGLES);if(Q.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))ct.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let vt=Q._multiDrawStarts,Fe=Q._multiDrawCounts,Vt=Q._multiDrawCount,mt=He?Te.get(He).bytesPerElement:1,cn=ne.get(j).currentProgram.getUniforms();for(let bn=0;bn<Vt;bn++)cn.setValue(k,"_gl_DrawID",bn),ct.render(vt[bn]/mt,Fe[bn])}else if(Q.isInstancedMesh)ct.renderInstances(qe,kt,Q.count);else if(J.isInstancedBufferGeometry){let vt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Fe=Math.min(J.instanceCount,vt);ct.renderInstances(qe,kt,Fe)}else ct.render(qe,kt)};function yt(v,H,J,j){N!==null&&v.isNodeMaterial&&N.setObject(j,v),ee===!0&&Ye.setState(v,J,!1),v.transparent===!0&&v.side===an&&v.forceSinglePass===!1?(v.side=xn,v.needsUpdate=!0,Sn(v,H,j),v.side=Yn,v.needsUpdate=!0,Sn(v,H,j),v.side=an):Sn(v,H,j)}this.compile=function(v,H,J=null){J===null&&(J=v),N!==null&&N.renderStart(v,H,J),w=Ce.get(J),w.init(H),_.push(w),J.traverseVisible(function(Q){Q.isLight&&Q.layers.test(H.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),v!==J&&v.traverseVisible(function(Q){Q.isLight&&Q.layers.test(H.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),w.setupLights(),N!==null&&N.updateLights(w.state.lightsArray),me=this.localClippingEnabled,ee=Ye.init(this.clippingPlanes,me),ee===!0&&Ye.setGlobalState(this.clippingPlanes,H),N!==null&&ce.render(w.state.shadowsArray,J,H);let j=new Set;return v.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let Pe=Q.material;if(Pe)if(Array.isArray(Pe))for(let Be=0;Be<Pe.length;Be++){let Ae=Pe[Be];yt(Ae,J,H,Q),j.add(Ae)}else yt(Pe,J,H,Q),j.add(Pe)}),w=_.pop(),N!==null&&N.renderEnd(),j},this.compileAsync=function(v,H,J=null){let j=this.compile(v,H,J);return new Promise(Q=>{function Pe(){if(j.forEach(function(Be){let He=ne.get(Be).currentProgram;(He===void 0||He.isReady())&&j.delete(Be)}),j.size===0){Q(v);return}setTimeout(Pe,10)}Ke.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let Xe=null;function xt(v){Xe&&Xe(v)}function St(){Ft.stop()}function rn(){Ft.start()}let Ft=new Nf;Ft.setAnimationLoop(xt),typeof self<"u"&&Ft.setContext(self),this.setAnimationLoop=function(v){Xe=v,Ze.setAnimationLoop(v),v===null?Ft.stop():Ft.start()},Ze.addEventListener("sessionstart",St),Ze.addEventListener("sessionend",rn),this.render=function(v,H){if(H!==void 0&&H.isCamera!==!0){st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;N!==null&&N.renderStart(v,H);let J=Ze.enabled===!0&&Ze.isPresenting===!0,j=R!==null&&(oe===null||J)&&R.begin(L,oe);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Ze.enabled===!0&&Ze.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ze.cameraAutoUpdate===!0&&Ze.updateCamera(H),H=Ze.getCamera()),v.isScene===!0&&v.onBeforeRender(L,v,H,oe),w=Ce.get(v,_.length),w.init(H),w.state.textureUnits=ae.getTextureUnits(),_.push(w),fe.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),X.setFromProjectionMatrix(fe,Qn,H.reversedDepth),me=this.localClippingEnabled,ee=Ye.init(this.clippingPlanes,me),b=Re.get(v,E.length),b.init(),E.push(b),Ze.enabled===!0&&Ze.isPresenting===!0){let Be=L.xr.getDepthSensingMesh();Be!==null&&Dn(Be,H,-1/0,L.sortObjects)}Dn(v,H,0,L.sortObjects),b.finish(),N!==null&&N.updateLights(w.state.lightsArray),L.sortObjects===!0&&b.sort(F,K),Se=Ze.enabled===!1||Ze.isPresenting===!1||Ze.hasDepthSensing()===!1,Se&&Ie.addToRenderList(b,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&Ye.beginShadows();let Q=w.state.shadowsArray;if(ce.render(Q,v,H),ee===!0&&Ye.endShadows(),(j&&R.hasRenderPass())===!1){let Be=b.opaque,Ae=b.transmissive;if(w.setupLights(),H.isArrayCamera){let He=H.cameras;if(Ae.length>0)for(let Ge=0,lt=He.length;Ge<lt;Ge++){let ot=He[Ge];Mn(Be,Ae,v,ot)}Se&&Ie.render(v);for(let Ge=0,lt=He.length;Ge<lt;Ge++){let ot=He[Ge];vn(b,v,ot,ot.viewport)}}else Ae.length>0&&Mn(Be,Ae,v,H),Se&&Ie.render(v),vn(b,v,H)}oe!==null&&V===0&&(ae.updateMultisampleRenderTarget(oe),ae.updateRenderTargetMipmap(oe)),j&&R.end(L),v.isScene===!0&&v.onAfterRender(L,v,H),Ee.resetDefaultState(),$=-1,se=null,_.pop(),_.length>0?(w=_[_.length-1],ae.setTextureUnits(w.state.textureUnits),ee===!0&&Ye.setGlobalState(L.clippingPlanes,w.state.camera)):w=null,E.pop(),E.length>0?b=E[E.length-1]:b=null,N!==null&&N.renderEnd()};function Dn(v,H,J,j){if(v.visible===!1)return;if(v.layers.test(H.layers)){if(v.isGroup)J=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(H);else if(v.isLightProbeGrid)w.pushLightProbeGrid(v);else if(v.isLight)w.pushLight(v),v.castShadow&&w.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(X)){j&&Ve.setFromMatrixPosition(v.matrixWorld).applyMatrix4(fe);let Be=ue.update(v),Ae=v.material;Ae.visible&&b.push(v,Be,Ae,J,Ve.z,null,H)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(X))){let Be=ue.update(v),Ae=v.material;if(j&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ve.copy(v.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),Ve.copy(Be.boundingSphere.center)),Ve.applyMatrix4(v.matrixWorld).applyMatrix4(fe)),Array.isArray(Ae)){let He=Be.groups;for(let Ge=0,lt=He.length;Ge<lt;Ge++){let ot=He[Ge],qe=Ae[ot.materialIndex];qe&&qe.visible&&b.push(v,Be,qe,J,Ve.z,ot,H)}}else Ae.visible&&b.push(v,Be,Ae,J,Ve.z,null,H)}}let Pe=v.children;for(let Be=0,Ae=Pe.length;Be<Ae;Be++)Dn(Pe[Be],H,J,j)}function vn(v,H,J,j){let{opaque:Q,transmissive:Pe,transparent:Be}=v;w.setupLightsView(J),ee===!0&&Ye.setGlobalState(L.clippingPlanes,J),j&&y.viewport(re.copy(j)),Q.length>0&&oi(Q,H,J),Pe.length>0&&oi(Pe,H,J),Be.length>0&&oi(Be,H,J),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Mn(v,H,J,j){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[j.id]===void 0){let qe=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[j.id]=new En(1,1,{generateMipmaps:!0,type:qe?ri:Pn,minFilter:ii,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pt.workingColorSpace})}let Pe=w.state.transmissionRenderTarget[j.id],Be=j.viewport||re;Pe.setSize(Be.z*L.transmissionResolutionScale,Be.w*L.transmissionResolutionScale);let Ae=L.getRenderTarget(),He=L.getActiveCubeFace(),Ge=L.getActiveMipmapLevel();L.setRenderTarget(Pe),L.getClearColor(We),ke=L.getClearAlpha(),ke<1&&L.setClearColor(16777215,.5),L.clear(),Se&&Ie.render(J);let lt=L.toneMapping;L.toneMapping=ni;let ot=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),w.setupLightsView(j),ee===!0&&Ye.setGlobalState(L.clippingPlanes,j),oi(v,J,j),ae.updateMultisampleRenderTarget(Pe),ae.updateRenderTargetMipmap(Pe),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Mt=0,kt=H.length;Mt<kt;Mt++){let Nt=H[Mt],{object:ct,geometry:vt,material:Fe,group:Vt}=Nt;if(Fe.side===an&&ct.layers.test(j.layers)){let mt=Fe.side;Fe.side=xn,Fe.needsUpdate=!0,cs(ct,J,j,vt,Fe,Vt),Fe.side=mt,Fe.needsUpdate=!0,qe=!0}}qe===!0&&(ae.updateMultisampleRenderTarget(Pe),ae.updateRenderTargetMipmap(Pe))}L.setRenderTarget(Ae,He,Ge),L.setClearColor(We,ke),ot!==void 0&&(j.viewport=ot),L.toneMapping=lt}function oi(v,H,J){let j=H.isScene===!0?H.overrideMaterial:null;for(let Q=0,Pe=v.length;Q<Pe;Q++){let Be=v[Q],{object:Ae,geometry:He,group:Ge}=Be,lt=Be.material;lt.allowOverride===!0&&j!==null&&(lt=j),Ae.layers.test(J.layers)&&cs(Ae,H,J,He,lt,Ge)}}function cs(v,H,J,j,Q,Pe){N!==null&&Q.isNodeMaterial&&N.setObject(v,Q),v.onBeforeRender(L,H,J,j,Q,Pe),v.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),Q.onBeforeRender(L,H,J,j,v,Pe),Q.transparent===!0&&Q.side===an&&Q.forceSinglePass===!1?(Q.side=xn,Q.needsUpdate=!0,L.renderBufferDirect(J,H,j,Q,v,Pe),Q.side=Yn,Q.needsUpdate=!0,L.renderBufferDirect(J,H,j,Q,v,Pe),Q.side=an):L.renderBufferDirect(J,H,j,Q,v,Pe),v.onAfterRender(L,H,J,j,Q,Pe)}function Sn(v,H,J){H.isScene!==!0&&(H=Oe);let j=ne.get(v),Q=w.state.lights,Pe=w.state.shadowsArray,Be=Q.state.version,Ae=we.getParameters(v,Q.state,Pe,H,J,w.state.lightProbeGridArray),He=we.getProgramCacheKey(Ae),Ge=j.programs;j.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?H.environment:null,j.fog=H.fog;let lt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;j.envMap=_e.get(v.envMap||j.environment,lt),j.envMapRotation=j.environment!==null&&v.envMap===null?H.environmentRotation:v.envMapRotation,Ge===void 0&&(v.addEventListener("dispose",tt),Ge=new Map,j.programs=Ge);let ot=Ge.get(He);if(ot!==void 0){if(j.currentProgram===ot&&j.lightsStateVersion===Be)return ai(v,Ae),ot}else Ae.uniforms=we.getUniforms(v),N!==null&&v.isNodeMaterial&&N.build(v,J,Ae),v.onBeforeCompile(Ae,L),ot=we.acquireProgram(Ae,He),Ge.set(He,ot),j.uniforms=Ae.uniforms;let qe=j.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(qe.clippingPlanes=Ye.uniform),ai(v,Ae),j.needsLights=ht(v),j.lightsStateVersion=Be,j.needsLights&&(qe.ambientLightColor.value=Q.state.ambient,qe.lightProbe.value=Q.state.probe,qe.sunLights.value=Q.state.sun,qe.sunLightShadows.value=Q.state.sunShadow,qe.directionalLights.value=Q.state.directional,qe.directionalLightShadows.value=Q.state.directionalShadow,qe.spotLights.value=Q.state.spot,qe.spotLightShadows.value=Q.state.spotShadow,qe.rectAreaLights.value=Q.state.rectArea,qe.ltc_1.value=Q.state.rectAreaLTC1,qe.ltc_2.value=Q.state.rectAreaLTC2,qe.pointLights.value=Q.state.point,qe.pointLightShadows.value=Q.state.pointShadow,qe.hemisphereLights.value=Q.state.hemi,qe.sunShadowMatrix.value=Q.state.sunShadowMatrix,qe.sunShadowCascade.value=Q.state.sunShadowCascade,qe.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,qe.spotLightMatrix.value=Q.state.spotLightMatrix,qe.spotLightMap.value=Q.state.spotLightMap,qe.pointShadowMatrix.value=Q.state.pointShadowMatrix),j.lightProbeGrid=w.state.lightProbeGridArray.length>0,j.currentProgram=ot,j.uniformsList=null,ot}function vi(v){if(v.uniformsList===null){let H=v.currentProgram.getUniforms();v.uniformsList=wr.seqWithValue(H.seq,v.uniforms)}return v.uniformsList}function ai(v,H){let J=ne.get(v);J.outputColorSpace=H.outputColorSpace,J.batching=H.batching,J.batchingColor=H.batchingColor,J.instancing=H.instancing,J.instancingColor=H.instancingColor,J.instancingMorph=H.instancingMorph,J.skinning=H.skinning,J.morphTargets=H.morphTargets,J.morphNormals=H.morphNormals,J.morphColors=H.morphColors,J.morphTargetsCount=H.morphTargetsCount,J.numClippingPlanes=H.numClippingPlanes,J.numIntersection=H.numClipIntersection,J.vertexAlphas=H.vertexAlphas,J.vertexTangents=H.vertexTangents,J.toneMapping=H.toneMapping}function Mi(v,H){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;M.setFromMatrixPosition(H.matrixWorld);for(let J=0,j=v.length;J<j;J++){let Q=v[J];if(Q.texture!==null&&Q.boundingBox.containsPoint(M))return Q}return null}function Lr(v,H,J,j,Q){H.isScene!==!0&&(H=Oe),ae.resetTextureUnits();let Pe=H.fog,Be=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?H.environment:null,Ae=oe===null?L.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:pt.workingColorSpace,He=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,Ge=_e.get(j.envMap||Be,He),lt=j.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ot=!!J.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),qe=!!J.morphAttributes.position,Mt=!!J.morphAttributes.normal,kt=!!J.morphAttributes.color,Nt=ni;j.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Nt=L.toneMapping);let ct=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,vt=ct!==void 0?ct.length:0,Fe=ne.get(j),Vt=w.state.lights;if(ee===!0&&(me===!0||v!==se)){let Ot=v===se&&j.id===$;Ye.setState(j,v,Ot)}let mt=!1;j.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Vt.state.version||Fe.outputColorSpace!==Ae||Q.isBatchedMesh&&Fe.batching===!1||!Q.isBatchedMesh&&Fe.batching===!0||Q.isBatchedMesh&&Fe.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Fe.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Fe.instancing===!1||!Q.isInstancedMesh&&Fe.instancing===!0||Q.isSkinnedMesh&&Fe.skinning===!1||!Q.isSkinnedMesh&&Fe.skinning===!0||Q.isInstancedMesh&&Fe.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Fe.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Fe.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Fe.instancingMorph===!1&&Q.morphTexture!==null||Fe.envMap!==Ge||j.fog===!0&&Fe.fog!==Pe||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==Ye.numPlanes||Fe.numIntersection!==Ye.numIntersection)||Fe.vertexAlphas!==lt||Fe.vertexTangents!==ot||Fe.morphTargets!==qe||Fe.morphNormals!==Mt||Fe.morphColors!==kt||Fe.toneMapping!==Nt||Fe.morphTargetsCount!==vt||!!Fe.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(mt=!0):(mt=!0,Fe.__version=j.version);let cn=Fe.currentProgram;mt===!0&&(cn=Sn(j,H,Q),N&&j.isNodeMaterial&&N.onUpdateProgram(j,cn,Fe));let bn=!1,Vn=!1,Ns=!1,Pt=cn.getUniforms(),Wt=Fe.uniforms;if(y.useProgram(cn.program)&&(bn=!0,Vn=!0,Ns=!0),j.id!==$&&($=j.id,Vn=!0),Fe.needsLights){let Ot=Mi(w.state.lightProbeGridArray,Q);Fe.lightProbeGrid!==Ot&&(Fe.lightProbeGrid=Ot,Vn=!0)}if(bn||se!==v){y.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Pt.setValue(k,"projectionMatrix",v.projectionMatrix),Pt.setValue(k,"viewMatrix",v.matrixWorldInverse);let ki=Pt.map.cameraPosition;ki!==void 0&&ki.setValue(k,de.setFromMatrixPosition(v.matrixWorld)),C.logarithmicDepthBuffer&&Pt.setValue(k,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Pt.setValue(k,"isOrthographic",v.isOrthographicCamera===!0),se!==v&&(se=v,Vn=!0,Ns=!0)}if(Fe.needsLights&&(Vt.state.sunShadowMap.length>0&&Pt.setValue(k,"sunShadowMap",Vt.state.sunShadowMap,ae),Vt.state.directionalShadowMap.length>0&&Pt.setValue(k,"directionalShadowMap",Vt.state.directionalShadowMap,ae),Vt.state.spotShadowMap.length>0&&Pt.setValue(k,"spotShadowMap",Vt.state.spotShadowMap,ae),Vt.state.pointShadowMap.length>0&&Pt.setValue(k,"pointShadowMap",Vt.state.pointShadowMap,ae)),Q.isSkinnedMesh){Pt.setOptional(k,Q,"bindMatrix"),Pt.setOptional(k,Q,"bindMatrixInverse");let Ot=Q.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Pt.setValue(k,"boneTexture",Ot.boneTexture,ae))}Q.isBatchedMesh&&(Pt.setOptional(k,Q,"batchingTexture"),Pt.setValue(k,"batchingTexture",Q._matricesTexture,ae),Pt.setOptional(k,Q,"batchingIdTexture"),Pt.setValue(k,"batchingIdTexture",Q._indirectTexture,ae),Pt.setOptional(k,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Pt.setValue(k,"batchingColorTexture",Q._colorsTexture,ae));let zi=J.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&U.update(Q,J,cn),(Vn||Fe.receiveShadow!==Q.receiveShadow)&&(Fe.receiveShadow=Q.receiveShadow,Pt.setValue(k,"receiveShadow",Q.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&H.environment!==null&&(Wt.envMapIntensity.value=H.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=Wy()),Vn){if(Pt.setValue(k,"toneMappingExposure",L.toneMappingExposure),Fe.needsLights&&ie(Wt,Ns),Pe&&j.fog===!0&&Je.refreshFogUniforms(Wt,Pe),Je.refreshMaterialUniforms(Wt,j,P,I,w.state.transmissionRenderTarget[v.id]),Fe.needsLights&&Fe.lightProbeGrid){let Ot=Fe.lightProbeGrid;Wt.probesSH.value=Ot.texture,Wt.probesMin.value.copy(Ot.boundingBox.min),Wt.probesMax.value.copy(Ot.boundingBox.max),Wt.probesResolution.value.copy(Ot.resolution)}wr.upload(k,vi(Fe),Wt,ae)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(wr.upload(k,vi(Fe),Wt,ae),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Pt.setValue(k,"center",Q.center),Pt.setValue(k,"modelViewMatrix",Q.modelViewMatrix),Pt.setValue(k,"normalMatrix",Q.normalMatrix),Pt.setValue(k,"modelMatrix",Q.matrixWorld),j.uniformsGroups!==void 0){let Ot=j.uniformsGroups;for(let ki=0,Us=Ot.length;ki<Us;ki++){let Th=Ot[ki];he.update(Th,cn),he.bind(Th,cn)}}return cn}function ie(v,H){v.ambientLightColor.needsUpdate=H,v.lightProbe.needsUpdate=H,v.sunLights.needsUpdate=H,v.sunLightShadows.needsUpdate=H,v.directionalLights.needsUpdate=H,v.directionalLightShadows.needsUpdate=H,v.pointLights.needsUpdate=H,v.pointLightShadows.needsUpdate=H,v.spotLights.needsUpdate=H,v.spotLightShadows.needsUpdate=H,v.rectAreaLights.needsUpdate=H,v.hemisphereLights.needsUpdate=H}function ht(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(v,H,J){let j=ne.get(v);j.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),ne.get(v.texture).__webglTexture=H,ne.get(v.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:J,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,H){let J=ne.get(v);J.__webglFramebuffer=H,J.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(v,H=0,J=0){oe=v,Z=H,V=J;let j=null,Q=!1,Pe=!1;if(v){let Ae=ne.get(v);if(Ae.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(k.FRAMEBUFFER,Ae.__webglFramebuffer),re.copy(v.viewport),ye.copy(v.scissor),Me=v.scissorTest,y.viewport(re),y.scissor(ye),y.setScissorTest(Me),$=-1;return}else if(Ae.__webglFramebuffer===void 0)ae.setupRenderTarget(v);else if(Ae.__hasExternalTextures)ae.rebindTextures(v,ne.get(v.texture).__webglTexture,ne.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let lt=v.depthTexture;if(Ae.__boundDepthTexture!==lt){if(lt!==null&&ne.has(lt)&&(v.width!==lt.image.width||v.height!==lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ae.setupDepthRenderbuffer(v)}}let He=v.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Pe=!0);let Ge=ne.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ge[H])?j=Ge[H][J]:j=Ge[H],Q=!0):v.samples>0&&ae.useMultisampledRTT(v)===!1?j=ne.get(v).__webglMultisampledFramebuffer:Array.isArray(Ge)?j=Ge[J]:j=Ge,re.copy(v.viewport),ye.copy(v.scissor),Me=v.scissorTest}else re.copy(te).multiplyScalar(P).floor(),ye.copy(ge).multiplyScalar(P).floor(),Me=Ue;if(J!==0&&(j=z),y.bindFramebuffer(k.FRAMEBUFFER,j)&&y.drawBuffers(v,j),y.viewport(re),y.scissor(ye),y.setScissorTest(Me),Q){let Ae=ne.get(v.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ae.__webglTexture,J)}else if(Pe){let Ae=H;for(let He=0;He<v.textures.length;He++){let Ge=ne.get(v.textures[He]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+He,Ge.__webglTexture,J,Ae)}}else if(v!==null&&J!==0){let Ae=ne.get(v.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ae.__webglTexture,J)}$=-1};function Dt(v){let H=ne.get(v);return(H.__readFormat!==v.format||H.__readType!==v.type)&&(H.__readFormat=v.format,H.__readType=v.type,H.__formatReadable=C.textureFormatReadable(v.format),H.__typeReadable=C.textureTypeReadable(v.type)),H}this.readRenderTargetPixels=function(v,H,J,j,Q,Pe,Be,Ae=0){if(!(v&&v.isWebGLRenderTarget)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=ne.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Be!==void 0&&(He=He[Be]),He){y.bindFramebuffer(k.FRAMEBUFFER,He);try{let Ge=v.textures[Ae],lt=Ge.format,ot=Ge.type;v.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ae);let qe=Dt(Ge);if(qe.__formatReadable===!1){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qe.__typeReadable===!1){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=v.width-j&&J>=0&&J<=v.height-Q&&k.readPixels(H,J,j,Q,ve.convert(lt),ve.convert(ot),Pe)}finally{let Ge=oe!==null?ne.get(oe).__webglFramebuffer:null;y.bindFramebuffer(k.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(v,H,J,j,Q,Pe,Be,Ae=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=ne.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Be!==void 0&&(He=He[Be]),He)if(H>=0&&H<=v.width-j&&J>=0&&J<=v.height-Q){y.bindFramebuffer(k.FRAMEBUFFER,He);let Ge=v.textures[Ae],lt=Ge.format,ot=Ge.type;v.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ae);let qe=Dt(Ge);if(qe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Mt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Mt),k.bufferData(k.PIXEL_PACK_BUFFER,Pe.byteLength,k.STREAM_READ),k.readPixels(H,J,j,Q,ve.convert(lt),ve.convert(ot),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let kt=oe!==null?ne.get(oe).__webglFramebuffer:null;y.bindFramebuffer(k.FRAMEBUFFER,kt);let Nt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await nf(k,Nt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Mt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Pe),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(Mt),k.deleteSync(Nt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,H=null,J=0){let j=Math.pow(2,-J),Q=Math.floor(v.image.width*j),Pe=Math.floor(v.image.height*j),Be=H!==null?H.x:0,Ae=H!==null?H.y:0;ae.setTexture2D(v,0),k.copyTexSubImage2D(k.TEXTURE_2D,J,0,0,Be,Ae,Q,Pe),y.unbindTexture()},this.copyTextureToTexture=function(v,H,J=null,j=null,Q=0,Pe=0){let Be,Ae,He,Ge,lt,ot,qe,Mt,kt,Nt=v.isCompressedTexture?v.mipmaps[Pe]:v.image;if(J!==null)Be=J.max.x-J.min.x,Ae=J.max.y-J.min.y,He=J.isBox3?J.max.z-J.min.z:1,Ge=J.min.x,lt=J.min.y,ot=J.isBox3?J.min.z:0;else{let Wt=Math.pow(2,-Q);Be=Math.floor(Nt.width*Wt),Ae=Math.floor(Nt.height*Wt),v.isDataArrayTexture?He=Nt.depth:v.isData3DTexture?He=Math.floor(Nt.depth*Wt):He=1,Ge=0,lt=0,ot=0}j!==null?(qe=j.x,Mt=j.y,kt=j.z):(qe=0,Mt=0,kt=0);let ct=ve.convert(H.format),vt=ve.convert(H.type),Fe;H.isData3DTexture?(ae.setTexture3D(H,0),Fe=k.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(ae.setTexture2DArray(H,0),Fe=k.TEXTURE_2D_ARRAY):(ae.setTexture2D(H,0),Fe=k.TEXTURE_2D),y.activeTexture(k.TEXTURE0),y.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),y.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),y.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);let Vt=y.getParameter(k.UNPACK_ROW_LENGTH),mt=y.getParameter(k.UNPACK_IMAGE_HEIGHT),cn=y.getParameter(k.UNPACK_SKIP_PIXELS),bn=y.getParameter(k.UNPACK_SKIP_ROWS),Vn=y.getParameter(k.UNPACK_SKIP_IMAGES);y.pixelStorei(k.UNPACK_ROW_LENGTH,Nt.width),y.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Nt.height),y.pixelStorei(k.UNPACK_SKIP_PIXELS,Ge),y.pixelStorei(k.UNPACK_SKIP_ROWS,lt),y.pixelStorei(k.UNPACK_SKIP_IMAGES,ot);let Ns=v.isDataArrayTexture||v.isData3DTexture,Pt=H.isDataArrayTexture||H.isData3DTexture;if(v.isDepthTexture){let Wt=ne.get(v),zi=ne.get(H),Ot=ne.get(Wt.__renderTarget),ki=ne.get(zi.__renderTarget);y.bindFramebuffer(k.READ_FRAMEBUFFER,Ot.__webglFramebuffer),y.bindFramebuffer(k.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Us=0;Us<He;Us++)Ns&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ne.get(v).__webglTexture,Q,ot+Us),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ne.get(H).__webglTexture,Pe,kt+Us)),k.blitFramebuffer(Ge,lt,Be,Ae,qe,Mt,Be,Ae,k.DEPTH_BUFFER_BIT,k.NEAREST);y.bindFramebuffer(k.READ_FRAMEBUFFER,null),y.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(Q!==0||v.isRenderTargetTexture||ne.has(v)){let Wt=ne.get(v),zi=ne.get(H);y.bindFramebuffer(k.READ_FRAMEBUFFER,D),y.bindFramebuffer(k.DRAW_FRAMEBUFFER,G);for(let Ot=0;Ot<He;Ot++)Ns?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Wt.__webglTexture,Q,ot+Ot):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Wt.__webglTexture,Q),Pt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,zi.__webglTexture,Pe,kt+Ot):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,zi.__webglTexture,Pe),Q!==0?k.blitFramebuffer(Ge,lt,Be,Ae,qe,Mt,Be,Ae,k.COLOR_BUFFER_BIT,k.NEAREST):Pt?k.copyTexSubImage3D(Fe,Pe,qe,Mt,kt+Ot,Ge,lt,Be,Ae):k.copyTexSubImage2D(Fe,Pe,qe,Mt,Ge,lt,Be,Ae);y.bindFramebuffer(k.READ_FRAMEBUFFER,null),y.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Pt?v.isDataTexture||v.isData3DTexture?k.texSubImage3D(Fe,Pe,qe,Mt,kt,Be,Ae,He,ct,vt,Nt.data):H.isCompressedArrayTexture?k.compressedTexSubImage3D(Fe,Pe,qe,Mt,kt,Be,Ae,He,ct,Nt.data):k.texSubImage3D(Fe,Pe,qe,Mt,kt,Be,Ae,He,ct,vt,Nt):v.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Pe,qe,Mt,Be,Ae,ct,vt,Nt.data):v.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Pe,qe,Mt,Nt.width,Nt.height,ct,Nt.data):k.texSubImage2D(k.TEXTURE_2D,Pe,qe,Mt,Be,Ae,ct,vt,Nt);y.pixelStorei(k.UNPACK_ROW_LENGTH,Vt),y.pixelStorei(k.UNPACK_IMAGE_HEIGHT,mt),y.pixelStorei(k.UNPACK_SKIP_PIXELS,cn),y.pixelStorei(k.UNPACK_SKIP_ROWS,bn),y.pixelStorei(k.UNPACK_SKIP_IMAGES,Vn),Pe===0&&H.generateMipmaps&&k.generateMipmap(Fe),y.unbindTexture()},this.initRenderTarget=function(v){ne.get(v).__webglFramebuffer===void 0&&ae.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?ae.setTextureCube(v,0):v.isData3DTexture?ae.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?ae.setTexture2DArray(v,0):ae.setTexture2D(v,0),y.unbindTexture()},this.resetState=function(){Z=0,V=0,oe=null,y.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}};function zu(i,e){if(e===hu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===br||e===Do){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===br)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function kf(i){let e=new Map,t=new Map,n=i.clone();return Vf(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Vf(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Vf(i.children[n],e.children[n],t)}var Cr=class extends mi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Yu(t)}),this.register(function(t){return new Zu(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new ju(t)}),this.register(function(t){return new $u(t)}),this.register(function(t){return new Ju(t)}),this.register(function(t){return new Qu(t)}),this.register(function(t){return new qu(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new Ku(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new Wu(t)}),this.register(function(t){return new Yl(t,gt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Yl(t,gt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new oh(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=Ui.extractUrlBase(e);o=Ui.resolveURL(c,this.path)}else o=Ui.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new mr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Yf){try{o[gt.KHR_BINARY_GLTF]=new ah(e)}catch(h){s&&s(h);return}r=JSON.parse(o[gt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new ph(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case gt.KHR_MATERIALS_UNLIT:o[h]=new Xu;break;case gt.KHR_DRACO_MESH_COMPRESSION:o[h]=new lh(r,this.dracoLoader);break;case gt.KHR_TEXTURE_TRANSFORM:o[h]=new ch;break;case gt.KHR_MESH_QUANTIZATION:o[h]=new uh;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Xy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Zt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var gt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Wu=class{constructor(e){this.parser=e,this.name=gt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new nt(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],_n);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new es(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Mo(u),c.distance=h;break;case"spot":c=new vo(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),yi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},Xu=class{constructor(){this.name=gt.KHR_MATERIALS_UNLIT}getMaterialType(){return ei}extendParams(e,t,n){let s=[];e.color=new nt(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],_n),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,bt))}return Promise.all(s)}},qu=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Yu=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new be(r,r)}return Promise.all(s)}},Zu=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Ku=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},ju=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_SHEEN}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new nt(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],_n)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,bt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},$u=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Ju=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_VOLUME}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new nt().setRGB(r[0],r[1],r[2],_n),Promise.all(s)}},Qu=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_IOR}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},eh=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new nt().setRGB(r[0],r[1],r[2],_n),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,bt)),Promise.all(s)}},th=class{constructor(e){this.parser=e,this.name=gt.EXT_MATERIALS_BUMP}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},nh=class{constructor(e){this.parser=e,this.name=gt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?pn:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},ih=class{constructor(e){this.parser=e,this.name=gt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},sh=class{constructor(e){this.parser=e,this.name=gt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},rh=class{constructor(e){this.parser=e,this.name=gt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},Yl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}},oh=class{constructor(e){this.name=gt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==Zn.TRIANGLES&&c.mode!==Zn.TRIANGLE_STRIP&&c.mode!==Zn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let g of h){let x=new ut,p=new S,m=new Le,T=new S(1,1,1),A=new Qr(g.geometry,g.material,d);for(let b=0;b<d;b++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,b),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,b),l.SCALE&&T.fromBufferAttribute(l.SCALE,b),A.setMatrixAt(b,x.compose(p,m,T));let M=null;for(let b in l)if(b==="_COLOR_0"){let w=l[b];A.instanceColor=new Ci(w.array,w.itemSize,w.normalized)}else if(b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"){if(M===null){let E=A.geometry;M=new Bt,M.name=E.name;for(let _ in E.attributes)M.setAttribute(_,E.attributes[_]);for(let _ in E.morphAttributes)M.morphAttributes[_]=E.morphAttributes[_];E.index!==null&&M.setIndex(E.index),M.morphTargetsRelative=E.morphTargetsRelative;for(let _ of E.groups)M.addGroup(_.start,_.count,_.materialIndex);E.boundingBox!==null&&(M.boundingBox=E.boundingBox.clone()),E.boundingSphere!==null&&(M.boundingSphere=E.boundingSphere.clone()),M.drawRange.start=E.drawRange.start,M.drawRange.count=E.drawRange.count,M.userData=Object.assign({},E.userData),A.geometry=M}let w=l[b];M.setAttribute(b,new Ci(w.array,w.itemSize,w.normalized))}Ht.prototype.copy.call(A,g),this.parser.assignFinalMaterial(A),f.push(A)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Yf="glTF",Oo=12,Gf={JSON:1313821514,BIN:5130562},ah=class{constructor(e){this.name=gt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Oo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Yf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Oo,r=new DataView(e,Oo),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===Gf.JSON){let c=new Uint8Array(e,Oo+o,a);this.content=n.decode(c)}else if(l===Gf.BIN){let c=Oo+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},lh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=gt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let u in o){let h=dh[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=dh[u]||u.toLowerCase();if(o[u]!==void 0){let d=n.accessors[e.attributes[u]],f=Rr[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(let g in f.attributes){let x=f.attributes[g],p=l[g];p!==void 0&&(x.normalized=p)}h(f)},a,c,_n,d)})})}},ch=class{constructor(){this.name=gt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},uh=class{constructor(){this.name=gt.KHR_MESH_QUANTIZATION}},Zl=class extends pi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,g=e*c,x=g-c,p=-2*f+3*d,m=f-d,T=1-p,A=m-d+h;for(let M=0;M!==a;M++){let b=o[x+M+a],w=o[x+M+l]*u,E=o[g+M+a],_=o[g+M]*u;r[M]=T*b+A*w+p*E+m*_}return r}},qy=new Le,hh=class extends Zl{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return qy.fromArray(r).normalize().toArray(r),r}},Zn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Rr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Wf={9728:qt,9729:Yt,9984:Ja,9985:vr,9986:Is,9987:ii},Xf={33071:Wn,33648:Js,10497:Ki},ku={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},dh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},os={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Yy={CUBICSPLINE:void 0,LINEAR:ys,STEP:xs},Vu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Zy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new zt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yn})),i.DefaultMaterial}function Ds(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function yi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ky(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(d)}if(s){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(d)}if(r){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function jy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function $y(i){let e,t=i.extensions&&i.extensions[gt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gu(t.attributes):e=i.indices+":"+Gu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Gu(i.targets[n]);return e}function Gu(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function fh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Jy(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Qy=new ut,ph=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Xy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Ni(this.options.manager):this.textureLoader=new So(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new mr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Ds(r,a,s),yi(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,u]of o.children.entries())r(u,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[gt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Ui.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=ku[s.type],a=Rr[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Xt(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=ku[s.type],c=Rr[s.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,p;if(f&&f!==h){let m=Math.floor(d/f),T="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,A=t.cache.get(T);A||(x=new c(a,m*f,s.count*f/u),A=new rr(x,f/u),t.cache.add(T,A)),p=new or(A,l,d%f/u,g)}else a===null?x=new c(s.count*l):x=new c(a,d,s.count*l),p=new Xt(x,l,g);if(s.sparse!==void 0){let m=ku.SCALAR,T=Rr[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,b=new T(o[1],A,s.sparse.count*m),w=new c(o[2],M,s.sparse.count*l);a!==null&&(p=new Xt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let E=0,_=b.length;E<_;E++){let R=b[E];if(p.setX(R,w[E*l]),l>=2&&p.setY(R,w[E*l+1]),l>=3&&p.setZ(R,w[E*l+2]),l>=4&&p.setW(R,w[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return u.magFilter=Wf[d.magFilter]||Yt,u.minFilter=Wf[d.minFilter]||ii,u.wrapS=Xf[d.wrapS]||Ki,u.wrapT=Xf[d.wrapT]||Ki,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==qt&&u.minFilter!==Yt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let p=new Jt(x);p.needsUpdate=!0,d(p)}),t.load(Ui.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),yi(h,o),h.userData.mimeType=o.mimeType||Jy(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[gt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[gt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[gt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new ur,An.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new ti,An.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return zt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[gt.KHR_MATERIALS_UNLIT]){let h=s[gt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new nt(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],_n),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,bt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=an);let u=r.alphaMode||Vu.OPAQUE;if(u===Vu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Vu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==ei&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new be(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==ei&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==ei){let h=r.emissiveFactor;a.emissive=new nt().setRGB(h[0],h[1],h[2],_n)}return r.emissiveTexture!==void 0&&o!==ei&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,bt)),Promise.all(c).then(function(){let h=new o(a);return r.name&&(h.name=r.name),yi(h,r),t.associations.set(h,{materials:e}),r.extensions&&Ds(s,h,r),h})}createUniqueName(e){let t=Lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[gt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return qf(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],u=$y(c),h=s[u];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[gt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=qf(new Bt,c,t),c.mode===Zn.TRIANGLE_STRIP?d=d.then(f=>zu(f,Do)):c.mode===Zn.TRIANGLE_FAN&&(d=d.then(f=>zu(f,br))),s[u]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let u=o[l].material===void 0?Zy(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,g=u.length;f<g;f++){let x=u[f],p=o[f],m,T=c[f];if(p.mode===Zn.TRIANGLES||p.mode===Zn.TRIANGLE_STRIP||p.mode===Zn.TRIANGLE_FAN||p.mode===void 0){let A=r.isSkinnedMesh===!0,M=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");A&&M===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=A&&M?new ji(x,T):new _t(x,T),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(p.mode===Zn.LINES)m=new Ss(x,T);else if(p.mode===Zn.LINE_STRIP)m=new di(x,T);else if(p.mode===Zn.LINE_LOOP)m=new eo(x,T);else if(p.mode===Zn.POINTS)m=new to(x,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&jy(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),yi(m,r),p.extensions&&Ds(s,m,p),t.assignFinalMaterial(m),h.push(m)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&Ds(s,h[0],r),h[0];let d=new At;r.extensions&&Ds(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(et.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Qi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),yi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,u=o.length;c<u;c++){let h=o[c];if(h){a.push(h);let d=new ut;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Jr(a,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){let f=s.channels[h],g=s.samplers[f.sampler],x=f.target,p=x.node,m=s.parameters!==void 0?s.parameters[g.input]:g.input,T=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",T)),c.push(g),u.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],g=h[2],x=h[3],p=h[4],m=[];for(let A=0,M=d.length;A<M;A++){let b=d[A],w=f[A],E=g[A],_=x[A],R=p[A];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();let L=n._createAnimationTracks(b,w,E,_,R);if(L)for(let O=0;O<L.length;O++)m.push(L[O])}let T=new Es(r,void 0,m);return yi(T,s),T})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Qy)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);if(u.userData.pivot!==void 0&&h.length>0){let f=u.userData.pivot,g=h[0];u.pivot=new S().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],g.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new ar:c.length>1?u=new At:c.length===1?u=c[0]:u=new Ht,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=o),yi(u,r),r.extensions&&Ds(n,u,r),r.matrix!==void 0){let h=new ut;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new At;n.name&&(r.name=s.createUniqueName(n.name)),yi(r,n),n.extensions&&Ds(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++){let d=l[u];d.parent!==null?r.add(kf(d)):r.add(d)}let c=u=>{let h=new Map;for(let[d,f]of s.associations)(d instanceof An||d instanceof Jt)&&h.set(d,f);return u.traverse(d=>{let f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}os[r.path]===os.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(a);let u;switch(os[r.path]){case os.weights:u=Pi;break;case os.rotation:u=Li;break;case os.translation:case os.scale:u=Ji;break;default:n.itemSize===1?u=Pi:u=Ji;break}let h=s.interpolation!==void 0?Yy[s.interpolation]:ys,d=this._getArrayFromAccessor(n);for(let f=0,g=l.length;f<g;f++){let x=new u(l[f]+"."+os[r.path],t.array,d,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=fh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Li?hh:Zl;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function ev(i,e,t){let n=e.attributes,s=new Qt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new S(l[0],l[1],l[2]),new S(c[0],c[1],c[2])),a.normalized){let u=fh(Rr[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new S,l=new S;for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=fh(Rr[d.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new wn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function qf(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=dh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return pt.workingColorSpace!==_n&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${pt.workingColorSpace}" not supported.`),yi(i,e),ev(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Ky(i,e.targets,t):i})}var Zf={type:"change"},gh={type:"start"},jf={type:"end"},Kl=new hi,Kf=new fn,tv=Math.cos(70*et.DEG2RAD),nn=new S,Ln=2*Math.PI,It={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},mh=1e-6,jl=class extends Eo{constructor(e,t=null){super(e,t),this.state=It.NONE,this.target=new S,this.cursor=new S,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ts.ROTATE,MIDDLE:ts.DOLLY,RIGHT:ts.PAN},this.touches={ONE:ns.ROTATE,TWO:ns.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new S,this._lastQuaternion=new Le,this._lastTargetPosition=new S,this._quat=new Le().setFromUnitVectors(e.up,new S(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _r,this._sphericalDelta=new _r,this._scale=1,this._panOffset=new S,this._rotateStart=new be,this._rotateEnd=new be,this._rotateDelta=new be,this._panStart=new be,this._panEnd=new be,this._panDelta=new be,this._dollyStart=new be,this._dollyEnd=new be,this._dollyDelta=new be,this._dollyDirection=new S,this._mouse=new be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=iv.bind(this),this._onPointerDown=nv.bind(this),this._onPointerUp=sv.bind(this),this._onContextMenu=hv.bind(this),this._onMouseWheel=av.bind(this),this._onKeyDown=lv.bind(this),this._onTouchStart=cv.bind(this),this._onTouchMove=uv.bind(this),this._onMouseDown=rv.bind(this),this._onMouseMove=ov.bind(this),this._interceptControlDown=dv.bind(this),this._interceptControlUp=fv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=It.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zf),this.update(),this.state=It.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;nn.copy(t).sub(this.target),nn.applyQuaternion(this._quat),this._spherical.setFromVector3(nn),this.autoRotate&&this.state===It.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ln:n>Math.PI&&(n-=Ln),s<-Math.PI?s+=Ln:s>Math.PI&&(s-=Ln),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(nn.setFromSpherical(this._spherical),nn.applyQuaternion(this._quatInverse),t.copy(this.target).add(nn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=nn.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new S(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new S(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=nn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Kl.origin.copy(this.object.position),Kl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Kl.direction))<tv?this.object.lookAt(this.target):(Kf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Kl.intersectPlane(Kf,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>mh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>mh||this._lastTargetPosition.distanceToSquared(this.target)>mh?(this.dispatchEvent(Zf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ln/60*this.autoRotateSpeed*e:Ln/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){nn.setFromMatrixColumn(t,0),nn.multiplyScalar(-e),this._panOffset.add(nn)}_panUp(e,t){this.screenSpacePanning===!0?nn.setFromMatrixColumn(t,1):(nn.setFromMatrixColumn(t,0),nn.crossVectors(this.object.up,nn)),nn.multiplyScalar(e),this._panOffset.add(nn)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;nn.copy(s).sub(this.target);let r=nn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new be,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function nv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function iv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function sv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(jf),this.state=It.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function rv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ts.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=It.DOLLY;break;case ts.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=It.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=It.ROTATE}break;case ts.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=It.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=It.PAN}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(gh)}function ov(i){switch(this.state){case It.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case It.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case It.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function av(i){this.enabled===!1||this.enableZoom===!1||this.state!==It.NONE||(i.preventDefault(),this.dispatchEvent(gh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(jf))}function lv(i){this.enabled!==!1&&this._handleKeyDown(i)}function cv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ns.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=It.TOUCH_ROTATE;break;case ns.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=It.TOUCH_PAN;break;default:this.state=It.NONE}break;case 2:switch(this.touches.TWO){case ns.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=It.TOUCH_DOLLY_PAN;break;case ns.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=It.TOUCH_DOLLY_ROTATE;break;default:this.state=It.NONE}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(gh)}function uv(i){switch(this._trackPointer(i),this.state){case It.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case It.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case It.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case It.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=It.NONE}}function hv(i){this.enabled!==!1&&i.preventDefault()}function dv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function fv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $f(i){let[e,t]=i.size,n=new At;n.name="content-skills-book",Object.assign(n.userData,{roomId:i.room,contentId:i.id}),n.position.fromArray(i.position),n.quaternion.setFromUnitVectors(new S(0,0,1),new S(...i.normal).normalize());let s=(d,f,g)=>{let x=new fr,p=-d/2,m=-f/2,T=.035;return x.moveTo(p+T,m),x.lineTo(p+d-T,m),x.quadraticCurveTo(p+d,m,p+d,m+T),x.lineTo(p+d,m+f-T),x.quadraticCurveTo(p+d,m+f,p+d-T,m+f),x.lineTo(p+T,m+f),x.quadraticCurveTo(p,m+f,p,m+f-T),x.lineTo(p,m+T),x.quadraticCurveTo(p,m,p+T,m),new po(x,{depth:g,bevelEnabled:!1,curveSegments:6})},r=(d,f,g,x=0)=>{let p=new _t(d,new zt({color:f,roughness:.94}));return p.position.set(x,0,g),p.castShadow=!0,p.receiveShadow=!0,n.add(p),p};r(s(e-.025,t-.025,.14),15918783,-.07);let o=s(e+.04,t+.04,.02);for(let d of[-.093,.073])r(o,15054914,d);r(s(.09,t+.04,.18),3501691,-.09,-e/2+.025);let a=[];for(let d=1;d<6;d++)a.push(new S(-e/2+.055,-t/2+.011,-.07+d*.023),new S(e/2-.014,-t/2+.011,-.07+d*.023));n.add(new Ss(new Bt().setFromPoints(a),new ti({color:13154450})));let l=document.createElement("canvas");l.width=768,l.height=1056;let c=l.getContext("2d");c.fillStyle="#efc453",c.fillRect(0,0,768,1056),c.strokeStyle="#3b737e",c.lineWidth=9,c.strokeRect(47,47,674,962),c.fillStyle="#356572",c.textAlign="center",c.font="bold 138px sans-serif",c.fillText("\u4E13\u4E1A",384,286),c.fillText("\u6280\u80FD",384,453),c.lineWidth=6,c.beginPath(),c.arc(384,625,73,0,Math.PI*2),c.stroke(),c.font="bold 48px sans-serif",c.fillText("AI",384,643),c.font="33px sans-serif",c.fillText("\u5168\u6808\u5F00\u53D1 \xB7 AI \u63D0\u6548",384,809),c.fillText("Agent \u5DE5\u7A0B",384,873);let u=new fi(l);u.colorSpace=bt;let h=new _t(new Cn(e,t),new zt({map:u,roughness:.96}));return h.position.z=.094,h.receiveShadow=!0,n.add(h),n}function Jf(i,e){let t=(.22-i.z)/.5,n=et.clamp(t,0,1),s=n*n*(3-2*n),r=.178*6*n*(1-n)/.5,o=.34/.5,a=Math.hypot(r,o),l=o/a,c=-r/a,u=i.y-.268,h=new S(i.x*(1+.04*s),Math.max(.006,.298-.178*s+u*l),.22-.34*t+u*c);return i.clone().lerp(h,e)}var _h=(i,e,t)=>{let n=et.clamp((t-i)/(e-i),0,1);return n*n*(3-2*n)};function Qf(i,e){let t=(.22-i.z)/.5,n=i.y-.268,s=.205,r=.3,o=Math.hypot(s,r),a=new S(i.x*(1+.07*_h(.35,.8,t)),.335-.205*t+n*r/o-.075*_h(.35,.95,t),.22-.3*t-n*s/o),l=new S(i.x*1.1,.088+(i.y-.268)*.85,-.12+(i.z+.26)*.75);return a.lerp(l,_h(.4,.95,t)),t>.6&&(a.y=Math.max(.003,a.y)),i.clone().lerp(a,e)}function ep(i,e,{root:t,canvas:n,camera:s,reducedMotion:r}){let o=new Map;i.traverse(B=>{B.isBone&&o.set(B.name,{node:B,quaternion:B.quaternion.clone(),position:B.position.clone()}),B.isSkinnedMesh&&(B.frustumCulled=!1),B.userData.petId=e.id}),i.updateMatrixWorld(!0);let a=i.matrixWorld.clone().invert(),l=i.getWorldQuaternion(new Le),c=["back_r","front_r","back_l","front_l"],u=new Map;i.traverse(B=>{B.isBone&&u.set(B.name,B.getWorldPosition(new S).applyMatrix4(i.matrixWorld.clone().invert()))});let h=B=>B.getWorldPosition(new S),d=c.map((B,pe)=>{let De=o.get(`pet_${B}_upper`)?.node,tt=o.get(`pet_${B}_lower`)?.node,it=o.get(`pet_${B}_paw`)?.node;if(!De||!tt||!it)throw new Error(`\u66B9\u7F57\u732B\u7F3A\u5C11\u56DB\u8DB3\u9AA8\u9ABC\uFF1A${B}`);let rt=h(De),yt=h(tt),Xe=h(it),xt=Xe.clone().applyMatrix4(a),St=yt.clone().sub(rt.clone().lerp(Xe,.5)).transformDirection(a);return{name:B,offset:-pe*.25,upper:De,lower:tt,paw:it,rest:xt,pole:St,hipRest:rt.clone().applyMatrix4(a),a:rt.distanceTo(yt),b:yt.distanceTo(Xe),pawQuaternion:l.clone().invert().multiply(it.getWorldQuaternion(new Le)),anchorQuaternion:it.getWorldQuaternion(new Le),targetQuaternion:it.getWorldQuaternion(new Le),landingQuaternion:it.getWorldQuaternion(new Le),startQuaternion:it.getWorldQuaternion(new Le),anchor:Xe.clone(),target:Xe.clone(),start:Xe.clone(),landing:Xe.clone(),swing:!1,phase:0,contacts:0}});for(let B of d)B.pawSurface=[],i.traverse(pe=>{if(!pe.isSkinnedMesh||pe.userData.petFur)return;let De=pe.geometry.attributes.position,tt=pe.geometry.attributes.skinIndex,it=pe.geometry.attributes.skinWeight;for(let rt=0;rt<De.count;rt++){let yt=0;for(let Xe=0;Xe<4;Xe++)pe.skeleton.bones[tt.array[rt*4+Xe]].name===B.paw.name&&(yt+=it.array[rt*4+Xe]);yt>.95&&B.pawSurface.push(new S().fromBufferAttribute(De,rt).applyMatrix4(pe.matrixWorld).applyMatrix4(a).sub(B.rest).applyQuaternion(B.pawQuaternion.clone().invert()))}});for(let B of d){let pe=B.pawSurface.map(rt=>{let yt=rt.clone().applyQuaternion(B.pawQuaternion).add(B.rest).sub(B.hipRest);return{x:yt.x,y:yt.y,raw:rt}}).sort((rt,yt)=>rt.x-yt.x||rt.y-yt.y),De=(rt,yt,Xe)=>(yt.x-rt.x)*(Xe.y-rt.y)-(yt.y-rt.y)*(Xe.x-rt.x),tt=[],it=[];for(let rt of pe){for(;tt.length>1&&De(tt.at(-2),tt.at(-1),rt)<=0;)tt.pop();tt.push(rt)}for(let rt of[...pe].reverse()){for(;it.length>1&&De(it.at(-2),it.at(-1),rt)<=0;)it.pop();it.push(rt)}B.supportSurface=[...tt.slice(0,-1),...it.slice(0,-1)].map(rt=>rt.raw),B.floorBaseline=B.rest.y+Math.min(...B.pawSurface.map(rt=>rt.clone().applyQuaternion(B.pawQuaternion).y))}let f=new dr([i.position.clone(),...e.pet.route.map(([B,pe])=>new S(B,e.position[1],pe))],!0,"centripetal"),g=f.getLength(),x=e.pet.gaitCycle??.94,p=.66,m=e.pet.walkSpeed??.13,T=0,A="idle",M=0,b=0,w=0,E=0,_=4.5,R=0,L=0,O=!1,N="idle",z=0,D=!1,G=0,Z=0,V=!1,oe=0,$=null,se=0,re=null,ye=e.pet.bodyScale??1,Me=!!e.pet.restPoses,We=!!e.pet.groundedSideLie,ke=.335*ye,W=[];We&&i.traverse(B=>{if(!B.isSkinnedMesh||B.userData.petFur)return;let pe=B.geometry.attributes.position,De=B.geometry.attributes.skinIndex,tt=B.geometry.attributes.skinWeight;for(let it=0;it<pe.count;it++){let rt=0;for(let yt=0;yt<4;yt++)["pet_root","pet_chest","pet_haunch"].includes(B.skeleton.bones[De.array[it*4+yt]].name)&&(rt+=tt.array[it*4+yt]);rt>.55&&pe.getY(it)>.16&&pe.getY(it)<.44&&W.push(new S().fromBufferAttribute(pe,it))}});let I=B=>{let pe=1/0,De=Math.sin(B),tt=Math.cos(B);for(let it of W)pe=Math.min(pe,De*it.x+tt*(it.y-ke));return-pe+.004},P=.165*ye;Me&&i.traverse(B=>{if(B.isSkinnedMesh&&!B.userData.petFur){let pe=B.geometry.attributes.position;for(let De=0;De<pe.count;De++)pe.getY(De)>.22&&pe.getY(De)<.55&&Math.abs(pe.getZ(De))<.2&&(P=Math.max(P,-pe.getX(De)+.004))}});let F=0,K=0,te=null,ge="idle",Ue=[];i.traverse(B=>{B.isMesh&&B.morphTargetDictionary?.sit_100!==void 0&&Ue.push(B)});let X=[];i.traverse(B=>{B.isMesh&&B.morphTargetDictionary?.lie_100!==void 0&&X.push(B)});let ee=new S(0,1,0),me=new S(0,1,0),fe=e.position[1],de=B=>B*B*(3-2*B),Ve=B=>f.getPointAt((B%g+g)%g/g),Oe=B=>{let pe=f.getTangentAt((B%g+g)%g/g);return Math.atan2(pe.x,pe.z)},Se=e.rotation,ze=o.get("pet_head"),k=e.pet.faceForward?Math.atan2(e.pet.faceForward[0],e.pet.faceForward[2]):0,je=new S().fromArray(e.pet.faceForward??[0,0,1]).applyQuaternion(l).applyQuaternion(ze.node.getWorldQuaternion(new Le).invert()),Ke=e.pet.faceCenter?new S().fromArray(e.pet.faceCenter).applyMatrix4(i.matrixWorld).applyMatrix4(ze.node.matrixWorld.clone().invert()):null,C=(B,pe)=>Math.atan2(Math.sin(pe-B),Math.cos(pe-B)),y=(B,pe,De)=>B+Math.max(-De,Math.min(De,pe-B)),q=()=>{let B=Ke?Ke.clone().applyMatrix4(ze.node.matrixWorld):h(ze.node),pe=$??s.position;return Math.atan2(pe.x-B.x,pe.z-B.z)},ne=4,ae=0,_e=document.createElement("div");_e.className="pet-greeting",_e.setAttribute("role","status"),_e.setAttribute("aria-live","polite"),_e.hidden=!0,t.append(_e);function Te(B=!O){let pe=new S(0,1.02,.2).applyMatrix4(i.matrixWorld).project(s),De=n.getBoundingClientRect(),tt=t.getBoundingClientRect();_e.hidden=!B||ae<=0||pe.z<-1||pe.z>1,_e.style.left=`${et.clamp(De.left-tt.left+(pe.x*.5+.5)*De.width,40,De.width-40)}px`,_e.style.top=`${et.clamp(De.top-tt.top+(-pe.y*.5+.5)*De.height,45,De.height-45)}px`}function le(){for(let{node:B,quaternion:pe,position:De}of o.values())B.quaternion.copy(pe),B.position.copy(De)}function ue(B,pe=0,De=0,tt=0){let it=o.get(B);it&&(B==="pet_head"&&(pe=et.clamp(pe,-.07,.07),De=et.clamp(De,-.36,.36),tt=et.clamp(tt,-.19,.19)),it.node.rotateX(pe),it.node.rotateY(De),it.node.rotateZ(tt))}function we(B,pe){let De=B.getWorldQuaternion(new Le),tt=pe.clone().sub(h(B)).normalize(),it=new Le().setFromUnitVectors(me.clone().applyQuaternion(De),tt),rt=B.parent.getWorldQuaternion(new Le).invert();B.quaternion.copy(rt.multiply(it.multiply(De))),B.updateWorldMatrix(!1,!0)}function Je(B){let pe=h(B.upper);if(B.relaxedSide>0){let Ft=B.target.clone().sub(pe),Dn=(B.a+B.b)*(B.stretch??1)-1e-4,vn=Math.hypot(Ft.x,Ft.z),Mn=Math.sqrt(Math.max(1e-5,Dn*Dn-Ft.y*Ft.y));vn>Mn&&(B.target.x=pe.x+Ft.x*Mn/vn,B.target.z=pe.z+Ft.z*Mn/vn)}let De=B.target.clone().sub(pe),tt=De.length();De.normalize();let it=B.a*(B.stretch??1),rt=B.b*(B.stretch??1),yt=Math.max(Math.abs(it-rt)+1e-5,Math.min(it+rt-1e-5,tt)),Xe=B.pole.clone().applyQuaternion(i.getWorldQuaternion(new Le));B.relaxedSide>0&&Xe.lerp(new S(-.2,.1,B.name.startsWith("front")?-1:1).applyAxisAngle(ee,Se).normalize(),B.relaxedSide).normalize(),Xe.addScaledVector(De,-Xe.dot(De)).normalize();let xt=et.clamp((it*it+yt*yt-rt*rt)/(2*it*yt),-1,1),St=pe.clone().addScaledVector(De,it*xt).addScaledVector(Xe,it*Math.sqrt(1-xt*xt));we(B.upper,St),we(B.lower,pe.clone().addScaledVector(De,yt));let rn=B.targetQuaternion.clone();if(B.relaxedSide>0){let Ft=new Le().setFromAxisAngle(ee,Se).multiply(new Le().setFromAxisAngle(new S(0,0,1),-.25)).multiply(B.pawQuaternion).slerp(B.lower.getWorldQuaternion(new Le).multiply(o.get(B.paw.name).quaternion),.4);rn.slerp(Ft,B.relaxedSide)}B.paw.quaternion.copy(B.paw.parent.getWorldQuaternion(new Le).invert().multiply(rn)),B.paw.updateWorldMatrix(!1,!0)}function Re(B,pe){let De=T+pe*x*(1-p+p*.5);return B.rest.clone().applyAxisAngle(ee,Oe(De)).add(Ve(De))}function Ce(B="idle"){A="settling",M=0,_=1/0,N=B;for(let pe of d)pe.settled=!1,pe.landingIsRest=!1}function Ye(B="idle"){(B==="sit"&&e.pet.sitEnabled===!1||B==="lie"&&e.pet.lieEnabled===!1)&&(B="idle"),A=B,M=0,_=B==="curious"?1/0:B==="lie"?7+E%3:4.5+E%3*.7}function ce(B){A=B,M=0,_=B==="walk"?5.5+E%4*1.1:1/0;for(let pe of d)pe.settled=!1,pe.waitForStance=((w/x+pe.offset)%1+1)%1>=p}function Ie(){L++,ae=ne,D=!0,G=0,V=z>.5,Me&&(ge=te??(K>.1?"lie":F>.1?"sit":"idle"),te=null,V=!1),_e.textContent="\u55B5\uFF5E",Te(),A==="walk"||A==="turn"?Ce("curious"):A==="settling"?N="curious":Ye("curious"),xe()}function U(){return{state:O?"paused":A,position:i.position.toArray().map(B=>+B.toFixed(5)),yaw:+Se.toFixed(5),steps:d.reduce((B,pe)=>B+pe.contacts,0),reactions:L,reducedMotion:r,bones:o.size,crouch:+z.toFixed(4),facingCamera:+Math.cos(C(Math.atan2(je.clone().applyQuaternion(ze.node.getWorldQuaternion(new Le)).x,je.clone().applyQuaternion(ze.node.getWorldQuaternion(new Le)).z),q())).toFixed(5),sit:+F.toFixed(4),sideLie:+K.toFixed(4),tailLift:+oe.toFixed(4),interaction:se>0,head:o.get("pet_head")?.node.quaternion.toArray(),tail:o.get("pet_tail_tip")?.node.quaternion.toArray(),feet:d.map(B=>({name:B.name,swing:B.swing,phase:+B.phase.toFixed(4),contacts:B.contacts,target:B.target.toArray(),actual:h(B.paw).toArray()}))}}function xe(){let B=U();t.dataset.petState=B.state,t.dataset.petPosition=JSON.stringify(B.position),t.dataset.petPose=JSON.stringify({head:B.head,tail:B.tail,yaw:B.yaw,crouch:B.crouch,sit:B.sit,sideLie:B.sideLie,facingCamera:B.facingCamera}),t.dataset.petFeet=JSON.stringify(B.feet),t.dataset.petSteps=String(B.steps),t.dataset.petReactions=String(L),t.dataset.petBones=String(o.size),t.dataset.petFacing=String(D&&B.sit<.02&&B.sideLie<.02&&B.facingCamera>.995);let pe=h(ze.node).add(new S(0,.12,0)).project(s),De=n.getBoundingClientRect();t.dataset.petScreen=JSON.stringify([De.left+(pe.x*.5+.5)*De.width,De.top+(-pe.y*.5+.5)*De.height])}function Y(B,pe){if(O=!pe,pe){ae=Math.max(0,ae-B),b+=B,(!r||D)&&(M+=B),se=Math.max(0,se-B),$&&se===0&&($=null,te=re,re=null),M>=_&&te===null&&(A==="idle"&&!r?(E++,ce("turn")):A==="walk"?Ce(Me?E%2===0?"lie":"sit":E%2===0?"lie":"idle"):(A==="lie"||A==="sit")&&Ye());let De=D||se>0,tt=De?q()-k:Oe(T),it=C(Se,tt),rt=Math.abs(it)>(De?.26:.035);A==="curious"&&rt&&z<.02&&F<.02&&K<.02&&ce("turn");let yt=!Me||F<.001&&K<.001,Xe=A==="turn"&&yt;Xe&&(Se+=et.clamp(it,-.3*B,.3*B),i.rotation.y=Se,Math.abs(C(Se,tt))<.035&&Ce(D?"curious":"walk"));let xt=A==="walk"&&yt,St=yt&&(xt||A==="settling"||A==="turn"),rn=Oe(T+.025)-Oe(T),Ft=Math.abs(Math.atan2(Math.sin(rn),Math.cos(rn)))/.025,Dn=xt?Math.min(m,.28/Math.max(.01,Ft))*de(Math.min(1,M/1.1))*de(Math.min(1,(_-M)/1.1)):0;xt&&(T+=Dn*B,i.position.copy(Ve(T)),Se=Oe(T),i.rotation.y=Se);let vn=r?A==="curious"?.6:0:1;if(z=y(z,!Me&&(A==="lie"||D&&V&&!rt)?1:0,B/1.4),i.position.y=fe-.125*de(z)+.0015*Math.sin(b*1.5)*vn,le(),Me){let ie=A!=="settling"&&A!=="walk"&&A!=="turn";F=y(F,e.pet.sitEnabled!==!1&&!D&&ie&&K<.001&&(te??A)==="sit"?1:0,B/1.9),K=y(K,e.pet.lieEnabled!==!1&&!D&&ie&&F<.001&&(te??A)==="lie"?1:0,B/2.3);let ht=de(F),Dt=de(K),v=Dt*(We?-Math.PI*.5:Math.PI*.5);i.quaternion.setFromAxisAngle(ee,Se).multiply(new Le().setFromAxisAngle(new S(0,0,1),v));let H=(We?ke:.32*ye)*Math.sin(v),J=e.pet.poseSitV2||e.pet.poseSitV3?0:.12*ye*ht,j=Ve(T);i.position.x=j.x+H*Math.cos(Se)+J*Math.sin(Se),i.position.z=j.z-H*Math.sin(Se)+J*Math.cos(Se),i.position.y=fe+(We?et.lerp(ke,I(v),Dt)-ke*Math.cos(v):(P+.008)*Math.sin(v)),i.updateMatrixWorld(!0);let Q=o.get("pet_chest")?.node,Pe=o.get("pet_root")?.node;if(Q&&Pe){let Ae=h(Q).add(new S(-J*Math.sin(Se),e.pet.poseSitV3?.064*ht:e.pet.poseSitV2?.03*ht:e.pet.sitCorrectives?.018*ht:0,-J*Math.cos(Se))),He=Q.getWorldQuaternion(new Le),Ge=Pe.parent.getWorldQuaternion(new Le),lt=new S(1,0,0).applyAxisAngle(ee,Se),ot=new Le().setFromAxisAngle(lt,e.pet.poseSitV2||e.pet.poseSitV3?0:-.45*ht);Pe.quaternion.copy(Ge.clone().invert().multiply(ot).multiply(Ge).multiply(Pe.quaternion)),i.updateMatrixWorld(!0),Q.position.copy(Ae.applyMatrix4(Q.parent.matrixWorld.clone().invert())),Q.quaternion.copy(Q.parent.getWorldQuaternion(new Le).invert().multiply(He)),i.updateMatrixWorld(!0)}let Be=o.get("pet_haunch")?.node;if(e.pet.poseSitV2||e.pet.poseSitV3)for(let Ae of["pet_haunch","pet_back_l_upper","pet_back_r_upper"]){let He=o.get(Ae)?.node;if(!He)continue;let Ge=(e.pet.poseSitV3?Qf:Jf)(u.get(Ae),ht).applyMatrix4(i.matrixWorld);He.position.copy(Ge.applyMatrix4(He.parent.matrixWorld.clone().invert())),He.updateWorldMatrix(!1,!0)}else if(Be){let Ae=e.pet.sitCorrectives?new S(0,.01*ht,.055*ht).applyAxisAngle(ee,Se):new S(0,-.02*ye*ht,0);Be.position.add(Ae.applyQuaternion(Be.parent.getWorldQuaternion(new Le).invert()))}}let oi=ae>0?de(Math.min(1,(ne-ae)/.2))*de(Math.min(1,ae/.65)):0,cs=We?et.lerp(.3,.09,de(K)):.3;Z=et.damp(Z,De?et.clamp(C(Se+k,q()),-cs,cs):(xt?.025:.15)*Math.sin(b*.65)*vn,7,B),i.updateMatrixWorld(!0);let Sn=ze.node.parent.getWorldQuaternion(new Le),vi=new Le().setFromAxisAngle(ee,xt?et.clamp(Z,-.035,.035):Z);ze.node.quaternion.copy(Sn.clone().invert().multiply(vi).multiply(Sn).multiply(ze.quaternion));let ai=$??s.position,Mi=h(ze.node),Lr=De?et.clamp(Math.atan2(ai.y-Mi.y,Math.hypot(ai.x-Mi.x,ai.z-Mi.z))*.1,-.03,.03):(xt?.006:.035)*Math.sin(b*.9)*vn;if(ze.node.rotateX(Lr),De||ze.node.rotateZ((xt?.018:.035)*Math.sin(b*.9)*vn),Me&&K>0){let ie=new S(0,0,1).applyAxisAngle(ee,Se),ht=ze.node.parent.getWorldQuaternion(new Le),Dt=new Le().setFromAxisAngle(ie,(We?Math.PI/9:-.25*Math.PI*.5)*de(K));if(We){let v=new Le().setFromAxisAngle(new S(0,1,0).applyQuaternion(i.quaternion),-k*.5*de(K));ze.node.quaternion.copy(ht.clone().invert().multiply(v).multiply(ht).multiply(ze.node.quaternion))}ze.node.quaternion.copy(ht.clone().invert().multiply(Dt).multiply(ht).multiply(ze.node.quaternion))}oe=et.damp(oe,De&&(!e.pet.poseSideArap||K<.01)?1:A==="walk"?.3:.07,De?5:1.8,B);for(let[ie,ht]of[["pet_tail",e.pet.poseSitV2?-1.15-.3*F+.57*K:-1.15+.35*F+.57*K],["pet_tail_tip",e.pet.poseSitV2?-.7+.5*F+.4*K:-.7+.2*F+.4*K]]){let Dt=o.get(ie),v=Dt.node.parent.getWorldQuaternion(new Le),H=new S(1,0,0).applyAxisAngle(ee,Se),J=new Le().setFromAxisAngle(ee,e.pet.poseSideArap&&K>.01?0:.055*Math.sin(b*1.5)*vn+.12*Math.sin(b*4)*oi).multiply(new Le().setFromAxisAngle(H,ht*(1-oe)));Dt.node.quaternion.copy(v.clone().invert().multiply(J).multiply(v).multiply(Dt.node.quaternion)),Dt.node.updateWorldMatrix(!1,!0)}if(We&&K>0){let ie=de(K),ht=o.get("pet_tail").node,Dt=o.get("pet_tail_tip").node;for(let v of[ht,Dt]){let H=v.quaternion.clone(),J=h(v).add(new S(.025*ye,0,-.16*ye).applyAxisAngle(ee,Se));J.y=fe+(v===ht?.095:.09)*ye,we(v,J);let j=v.quaternion.clone();v.quaternion.copy(H).slerp(j,ie),v.updateWorldMatrix(!1,!0)}}i.updateMatrixWorld(!0),St&&(w+=B);for(let ie of d){if(e.pet.poseSideArap&&We&&K>0){let v=de(K),H=ie.rest.x<0,J=new S(0,0,1).applyAxisAngle(ee,Se),j=h(ie.upper),Q=h(ie.paw),Pe=ie.paw.getWorldQuaternion(new Le),Be=ie.supportSurface.map(ct=>{let vt=ct.clone().applyQuaternion(Pe).add(Q).sub(j);return[vt.y,J.clone().cross(vt).y]}),Ae=ct=>{let vt=Math.cos(ct),Fe=Math.sin(ct),Vt=1/0;for(let[mt,cn]of Be)Vt=Math.min(Vt,mt*vt+cn*Fe);return j.y+Vt},He=(H?Math.PI/3:.05)*v,Ge=Array.from({length:77},(ct,vt)=>-1.52+vt*.04),lt=Math.min(...Ge.map(Ae)),ot=Math.max(fe+et.lerp(ie.floorBaseline,.001,v)+(H?.035*v:0),lt+5e-4*v),qe=[];for(let ct=1;ct<Ge.length;ct++){let vt=Ge[ct-1],Fe=Ge[ct],Vt=Ae(vt)-ot,mt=Ae(Fe)-ot;if(!(Vt*mt>0)){for(let cn=0;cn<15;cn++){let bn=(vt+Fe)*.5,Vn=Ae(bn)-ot;Vt*Vn<=0?(Fe=bn,mt=Vn):(vt=bn,Vt=Vn)}qe.push((vt+Fe)*.5)}}let Mt=qe.length?qe.reduce((ct,vt)=>Math.abs(vt-He)<Math.abs(ct-He)?vt:ct):Ge.reduce((ct,vt)=>Math.abs(Ae(vt)-ot)<Math.abs(Ae(ct)-ot)?vt:ct),kt=ie.upper.parent.getWorldQuaternion(new Le),Nt=new Le().setFromAxisAngle(ee,(ie.name.startsWith("front")?Math.PI/6:-Math.PI/9)*v).multiply(new Le().setFromAxisAngle(J,Mt));ie.upper.quaternion.copy(kt.clone().invert().multiply(Nt).multiply(kt).multiply(ie.upper.quaternion)),ie.upper.updateWorldMatrix(!1,!0),ie.anchor.copy(h(ie.paw)),ie.target.copy(ie.anchor),ie.anchorQuaternion.copy(ie.paw.getWorldQuaternion(new Le)),ie.targetQuaternion.copy(ie.anchorQuaternion),ie.swing=!1,ie.relaxedSide=0;continue}if(Me&&K>.001&&!We){let v=de(K),H=ie.upper.parent.getWorldQuaternion(new Le),J=new S(0,0,1).applyAxisAngle(ee,Se),j=new Le().setFromAxisAngle(J,-.5*v*(ie.rest.x>0?1:.025));ie.upper.quaternion.copy(H.clone().invert().multiply(j).multiply(H).multiply(ie.upper.quaternion)),ie.lower.rotateX((ie.name.startsWith("front")?.12:-.12)*v),ie.swing=!1,ie.anchor.copy(ie.rest).applyAxisAngle(ee,Se).add(Ve(T)),ie.target.copy(ie.anchor),ie.anchorQuaternion.setFromAxisAngle(ee,Se).multiply(ie.pawQuaternion),ie.targetQuaternion.copy(ie.anchorQuaternion);continue}let ht=((w/x+ie.offset)%1+1)%1;ht<p&&(ie.waitForStance=!1);let Dt=St&&!ie.settled&&!ie.waitForStance&&ht>=p;if(ie.phase=ht,Dt&&!ie.swing&&(ie.start.copy(ie.anchor),ie.startQuaternion.copy(ie.anchorQuaternion),ie.landing.copy(xt?Re(ie,Dn):ie.rest.clone().applyAxisAngle(ee,Se+(Xe?et.clamp(C(Se,tt),-.15,.15):0)).add(Me&&!Xe?Ve(T):i.position)),ie.landing.y=fe+ie.rest.y,ie.landingIsRest=!xt&&!Xe,ie.landingQuaternion.setFromAxisAngle(ee,xt?Oe(T+Dn*x*(1-p+p*.5)):Se+(Xe?et.clamp(C(Se,tt),-.15,.15):0)).multiply(ie.pawQuaternion)),!Dt&&ie.swing&&(ie.anchor.copy(ie.landing),ie.anchorQuaternion.copy(ie.landingQuaternion),ie.contacts++,ie.landingIsRest&&(ie.settled=!0)),Dt){let v=(ht-p)/(1-p);ie.target.lerpVectors(ie.start,ie.landing,de(v)),ie.target.y+=(e.pet.stepHeight??.032)*Math.sin(Math.PI*v),ie.targetQuaternion.slerpQuaternions(ie.startQuaternion,ie.landingQuaternion,de(v))}else ie.target.copy(ie.anchor),ie.targetQuaternion.copy(ie.anchorQuaternion);if(z>0&&!St){let v=ie.rest.clone();ie.name.startsWith("front")?v.z+=.08*de(z):(v.x+=Math.sign(v.x)*.02*de(z),v.z-=.025*de(z)),ie.target.copy(v.applyAxisAngle(ee,Se).add(i.position)),ie.target.y=fe+ie.rest.y,ie.anchor.copy(ie.target)}if(Me&&F>0&&!St){let v=ie.rest.clone();ie.name.startsWith("back")&&(v.z+=(e.pet.poseSitV3?.13:e.pet.poseSitV2?.155:.1*ye)*de(F),v.x+=Math.sign(v.x)*(e.pet.poseSitV2?-.012:e.pet.poseSitV3?0:.015*ye)*de(F)),ie.target.copy(v.applyAxisAngle(ee,Se).add(Ve(T))),ie.target.y=fe+ie.rest.y,e.pet.poseSitV2&&ie.name.startsWith("back")&&(ie.target.y=fe+ie.rest.y*(1-.55*de(F))+.008*Math.sin(Math.PI*F)),e.pet.poseSitV3&&ie.name.startsWith("back")&&(ie.target.y=fe+ie.rest.y+(.002+ie.rest.y*.6-ie.rest.y)*de(F)),ie.anchor.copy(ie.target)}if(We&&K>0&&!St){let v=de(K),H=ie.rest.x<0,J=ie.name.startsWith("front");if(H){let Pe=new S(0,-.075*v,0).applyQuaternion(ie.upper.parent.getWorldQuaternion(new Le).invert());ie.upper.position.add(Pe),i.updateMatrixWorld(!0)}let j=ie.rest.clone(),Q=new S((H?-.18:-.24)*ye/.8,j.y,J?(H?.29:.31)*ye/.8:(H?-.28:-.31)*ye/.8);j.lerp(Q,v),ie.target.copy(j.applyAxisAngle(ee,Se).add(Ve(T))),ie.anchor.copy(ie.target),ie.targetQuaternion.setFromAxisAngle(ee,Se).multiply(ie.pawQuaternion),ie.anchorQuaternion.copy(ie.targetQuaternion)}if(ie.stretch=e.pet.poseSitV3&&ie.name.startsWith("front")?1+.3*de(F):1,ie.stretch!==1&&(ie.lower.position.copy(o.get(ie.lower.name).position).multiplyScalar(ie.stretch),ie.paw.position.copy(o.get(ie.paw.name).position).multiplyScalar(ie.stretch),i.updateMatrixWorld(!0)),ie.relaxedSide=We?de(K):0,ie.swing=Dt,ie.relaxedSide>0)for(let v=0;v<6;v++){Je(ie);let H=ee.clone().applyQuaternion(ie.paw.getWorldQuaternion(new Le).invert()),J=1/0;for(let j of ie.pawSurface)J=Math.min(J,j.dot(H));ie.target.y=fe-J+.001,ie.anchor.copy(ie.target)}Je(ie)}i.updateMatrixWorld(!0);for(let ie of Ue){let ht=["sit_25","sit_50","sit_75","sit_100"],Dt=F*4,v=Math.floor(Dt),H=Dt-v;for(let J of ht)ie.morphTargetInfluences[ie.morphTargetDictionary[J]]=0;v>0&&(ie.morphTargetInfluences[ie.morphTargetDictionary[ht[v-1]]]=1-H),v<4&&(ie.morphTargetInfluences[ie.morphTargetDictionary[ht[v]]]=H)}for(let ie of X){let ht=Object.keys(ie.morphTargetDictionary).filter(J=>J.startsWith("lie_")).sort((J,j)=>Number(J.slice(4))-Number(j.slice(4))),Dt=K*ht.length,v=Math.floor(Dt),H=Dt-v;for(let J of ht)ie.morphTargetInfluences[ie.morphTargetDictionary[J]]=0;v>0&&(ie.morphTargetInfluences[ie.morphTargetDictionary[ht[v-1]]]=1-H),v<ht.length&&(ie.morphTargetInfluences[ie.morphTargetDictionary[ht[v]]]=H)}A==="settling"&&d.every(ie=>ie.settled)&&(N==="walk"?ce("walk"):Ye(N)),D&&A==="curious"&&!rt&&F<.02&&K<.02&&Math.abs(C(Z,C(Se+k,q())))<.025&&(G+=B,G>4.5&&(D=!1,Ye(Me?ge:V?"lie":"idle")))}Te(pe),R+=B,R>.1&&(R=0,xe())}i.rotation.y=Se=Oe(0),i.updateMatrixWorld(!0);for(let B of d)B.anchor.copy(B.rest).applyMatrix4(i.matrixWorld),B.target.copy(B.anchor),B.anchorQuaternion.copy(i.getWorldQuaternion(new Le).multiply(B.pawQuaternion)),B.targetQuaternion.copy(B.anchorQuaternion);function ve(B){!Me||!["idle","sit","lie","walk"].includes(B)||(B==="lie"&&e.pet.lieEnabled===!1&&(B="idle"),D=!1,te=B==="walk"?null:B,B==="walk"?(E++,ce("turn")):Ce(B))}function Ee(B){re=te,te=e.pet.sitEnabled===!1?"idle":"sit",D=!1,$=new S().fromArray(B),se=14,Ce(te)}function he(B){se>0&&$.fromArray(B)}function $e(){$&&($=null,se=0,te=re,re=null)}let Ze=()=>(i.updateMatrixWorld(!0),Ke?Ke.clone().applyMatrix4(ze.node.matrixWorld).add(new S(0,.05,0)):h(ze.node));return xe(),{update:Y,react:Ie,snapshot:U,setRestPose:ve,beginInteraction:Ee,trackCompanion:he,endInteraction:$e,touchPoint:Ze}}var tp=`
  float paws = 1.0 - smoothstep(.10, .24, vFurRest.y);
  float facePoint = smoothstep(.38,.46,vFurRest.z) * (1.0-smoothstep(.57,.65,vFurRest.y)) * smoothstep(.46,.51,vFurRest.y);
  float earPoint = smoothstep(.075,.105,abs(vFurRest.x)) * smoothstep(.68,.72,vFurRest.y);
  float bright = smoothstep(.12,.38,dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)));
  float blueEye = step(diffuseColor.r*1.25,diffuseColor.b)*step(.08,diffuseColor.b);
  vec3 pointColor = vec3(.025,.011,.006);
  diffuseColor.rgb = mix(diffuseColor.rgb, pointColor, bright * max(max(paws,facePoint),earPoint) * (1.0-blueEye));
`;function np(i,{layers:e=8,length:t=.009,strands:n=24e3,bodyScale:s=1,limbRatio:r=1}={}){let o=h=>new S(h.x/s,h.y/s<.3*r?h.y/s/r:h.y/s+.3*(1-r),h.z/s),a=`vFurRest = position / ${s.toFixed(4)}; vFurRest.y = vFurRest.y < ${(.3*r).toFixed(4)} ? vFurRest.y / ${r.toFixed(4)} : vFurRest.y + ${(.3*(1-r)).toFixed(4)};`,l=[];i.traverse(h=>{h.isSkinnedMesh&&l.push(h)});let c=[],u=0;for(let h of l){h.material.roughness=.95,h.material.metalness=0,h.material.roughnessMap=null,h.material.metalnessMap=null,h.material.isMeshPhysicalMaterial&&(h.material.sheen=.25,h.material.sheenColor.set("#9b8c77"),h.material.sheenRoughness=1),h.material.onBeforeCompile=P=>{P.vertexShader=`varying vec3 vFurRest;
`+P.vertexShader,P.vertexShader=P.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+a),P.fragmentShader=`varying vec3 vFurRest;
`+P.fragmentShader,P.fragmentShader=P.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+tp)},h.material.customProgramCacheKey=()=>"siamese-point-coat-v1",h.material.needsUpdate=!0;let d=h.geometry.clone(),f=d.attributes.position,g=new Float32Array(f.count);for(let P=0;P<f.count;P++){let F=o(new S().fromBufferAttribute(f,P)),K=F.y,te=F.z,ge=K>.47&&te>.19;g[P]=K<.32?.38:ge?.22:1}d.setAttribute("furLength",new Xt(g,1));for(let P=1;P<=e;P++){let F=P/e,K=h.material.clone();K.roughness=.97,K.metalness=0,K.alphaTest=.01,K.alphaToCoverage=!1,K.transparent=!0,K.depthWrite=!1,K.side=Yn,K.onBeforeCompile=ge=>{ge.uniforms.furDepth={value:F},ge.uniforms.furLengthScale={value:t},ge.vertexShader=`attribute float furLength; varying vec3 vFurRest; varying float vFurLength; uniform float furDepth; uniform float furLengthScale;
`+ge.vertexShader,ge.vertexShader=ge.vertexShader.replace("#include <begin_vertex>",`
          #include <begin_vertex>
          ${a} vFurLength = furLength;
          transformed += normal * furLengthScale * furDepth * furLength;
        `),ge.fragmentShader=`varying vec3 vFurRest; varying float vFurLength; uniform float furDepth;
`+ge.fragmentShader,ge.fragmentShader=ge.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+tp),ge.fragmentShader=ge.fragmentShader.replace("#include <alphatest_fragment>",`
          vec3 furCell = floor(vFurRest * 390.0);
          float strand = fract(sin(dot(furCell, vec3(127.1,311.7,74.7))) * 43758.5453);
          float coverage = smoothstep(furDepth * .86, furDepth * .86 + .16, strand);
          // \u84DD\u773C\u73E0\u7684\u9AD8\u5149\u548C\u6E7F\u6DA6\u9F3B\u5C16\u76F4\u63A5\u9732\u51FA\u5E95\u5C42\u8868\u9762\u3002
          float eye = step(diffuseColor.r * 1.25, diffuseColor.b) * step(.18, diffuseColor.b);
          diffuseColor.a *= coverage * (1.0 - eye) * .24;
          diffuseColor.rgb *= 1.0 + .045 * furDepth;
          #include <alphatest_fragment>
        `)},K.customProgramCacheKey=()=>`siamese-plush-fur-v3-${s}-${r}`;let te=new ji(d,K);te.name=`siamese_short_fur_${P}`,te.position.copy(h.position),te.quaternion.copy(h.quaternion),te.scale.copy(h.scale),te.bindMode=h.bindMode,te.bind(h.skeleton,h.bindMatrix),h.morphTargetInfluences&&(te.morphTargetInfluences=h.morphTargetInfluences),te.frustumCulled=!1,te.userData={...h.userData,petFur:!0},te.raycast=()=>{},h.parent.add(te),c.push(te)}let x=d.index,p=d.attributes.uv,m=d.attributes.normal,T=d.attributes.skinIndex,A=d.attributes.skinWeight,M=[],b=0,w=new S,E=new S,_=new S,R=new S,L=new S;for(let P=0;P<x.count;P+=3)w.fromBufferAttribute(f,x.getX(P)),E.fromBufferAttribute(f,x.getX(P+1)),_.fromBufferAttribute(f,x.getX(P+2)),b+=R.subVectors(E,w).cross(L.subVectors(_,w)).length()*.5,M.push(b);let O=1040,N=()=>(O=Math.imul(O,1664525)+1013904223>>>0,O/4294967296),z=[],D=[],G=[],Z=[],V=[],oe=[],$=(d.morphAttributes.position??[]).map(()=>[]),se=new S,re=new S,ye=new S,Me=new S,We=new S;for(let P=0;P<n;P++){let F=N()*b,K=0,te=M.length-1;for(;K<te;){let je=K+te>>1;M[je]<F?K=je+1:te=je}let ge=[0,1,2].map(je=>x.getX(K*3+je)),Ue=Math.sqrt(N()),X=N(),ee=[1-Ue,Ue*(1-X),Ue*X];se.set(0,0,0),re.set(0,0,0);let me=new be;ge.forEach((je,Ke)=>{se.addScaledVector(w.fromBufferAttribute(f,je),ee[Ke]),re.addScaledVector(w.fromBufferAttribute(m,je),ee[Ke]),me.x+=p.getX(je)*ee[Ke],me.y+=p.getY(je)*ee[Ke]}),re.normalize();let fe=o(se),de=fe.y>.45&&fe.z>.22&&fe.y<.69;if(de&&Math.abs(fe.x)<.11||fe.y<.18||se.y<.025&&re.y<-.15)continue;let Ve=(fe.y<.22?.004:de||fe.y>.69?.0032:t)*(.7+N()*.65);We.set(0,-1,0).addScaledVector(re,re.y).normalize(),Me.copy(re).multiplyScalar(.86).addScaledVector(We,.35).normalize(),ye.crossVectors(re,new S(N()-.5,N()-.5,N()-.5)).normalize();let Oe=new Map;ge.forEach((je,Ke)=>{for(let C=0;C<4;C++){let y=T.array[je*4+C];Oe.set(y,(Oe.get(y)??0)+A.array[je*4+C]*ee[Ke])}});let Se=[...Oe].sort((je,Ke)=>Ke[1]-je[1]).slice(0,4),ze=Se.reduce((je,Ke)=>je+Ke[1],0);for(;Se.length<4;)Se.push([0,0]);let k=z.length/3;for(let je=0;je<2;je++){je&&ye.crossVectors(Me,ye).normalize();for(let C=0;C<4;C++){let y=C>1,q=y?6e-5:45e-5,ne=C%2?1:-1,ae=se.clone().addScaledVector(re,35e-5).addScaledVector(Me,y?Ve:0).addScaledVector(ye,ne*q);z.push(ae.x,ae.y,ae.z),D.push(re.x,re.y,re.z),G.push(me.x,me.y),$.forEach((_e,Te)=>{let le=new S;ge.forEach((ue,we)=>le.addScaledVector(w.fromBufferAttribute(d.morphAttributes.position[Te],ue),ee[we])),_e.push(le.x,le.y,le.z)});for(let _e=0;_e<4;_e++)Z.push(Se[_e][0]),V.push(Se[_e][1]/ze)}let Ke=k+je*4;oe.push(Ke,Ke+1,Ke+2,Ke+2,Ke+1,Ke+3)}}let ke=new Bt;ke.setAttribute("position",new Rt(z,3)),ke.setAttribute("normal",new Rt(D,3)),ke.setAttribute("uv",new Rt(G,2)),ke.setAttribute("skinIndex",new Ms(Z,4)),ke.setAttribute("skinWeight",new Rt(V,4)),ke.setIndex(oe),$.length&&(ke.morphTargetsRelative=!0,ke.morphAttributes.position=$.map(P=>new Rt(P,3))),u+=z.length/24;let W=h.material.clone();W.side=an,W.roughness=1,W.onBeforeCompile=P=>{h.material.onBeforeCompile(P),P.fragmentShader=P.fragmentShader.replace("#include <normal_fragment_begin>",dt.normal_fragment_begin.replace("normal *= faceDirection;",""))},W.customProgramCacheKey=()=>"siamese-fiber-coat-v1";let I=new ji(ke,W);I.name="siamese_fine_fibers",I.position.copy(h.position),I.quaternion.copy(h.quaternion),I.scale.copy(h.scale),I.bindMode=h.bindMode,I.bind(h.skeleton,h.bindMatrix),I.frustumCulled=!1,I.userData={...h.userData,petFur:!0},I.raycast=()=>{},h.parent.add(I),c.push(I),h.morphTargetInfluences&&(I.morphTargetInfluences=h.morphTargetInfluences)}return{layers:e,length:t,fibers:u,meshes:l.length,setVisible:h=>c.forEach(d=>d.visible=h)}}function ip({actor:i,avatar:e,model:t,bones:n,houseGroup:s,getBed:r,root:o,height:a}){let l,c,u,h,d,f,g=!1,x="idle",p=null,m=new Map([...n].map(([N,z])=>[N,z.quaternion.clone()])),T=new Le,A=new Tn,M=[],b=[],w=e.matrixWorld.clone().invert();t.updateWorldMatrix(!0,!0),t.traverse(N=>{if(!N.isMesh||N.name.includes("eyelid"))return;let z=[];for(let D=0;D<N.geometry.attributes.position.count;D++){let G=N.getVertexPosition(D,new S).applyMatrix4(N.matrixWorld).applyMatrix4(w);G.y>.35&&G.y<1.15&&z.push(D)}M.push({node:N,ids:z}),b.push(N)});let E=N=>(N=et.clamp(N,0,1),N*N*(3-2*N));function _(N,z){let D=n.get("comp_arm_"+N),G=n.get("comp_forearm_"+N),Z=n.get("comp_hand_"+N);if(!D||!G||!Z)return;s.updateMatrixWorld(!0);let V=D.getWorldPosition(new S),oe=G.getWorldPosition(new S),$=Z.getWorldPosition(new S),se=V.distanceTo(oe),re=oe.distanceTo($),ye=z.clone().sub(V),Me=Math.min(ye.length(),se+re-1e-4);ye.normalize();let We=new S(0,-1,.15);We.addScaledVector(ye,-We.dot(ye)).normalize();let ke=et.clamp((se*se+Me*Me-re*re)/(2*se*Me),-1,1),W=V.clone().addScaledVector(ye,se*ke).addScaledVector(We,se*Math.sqrt(1-ke*ke)),I=(P,F,K)=>{let te=P.getWorldPosition(new S),ge=P.getWorldQuaternion(new Le),Ue=F.getWorldPosition(new S).sub(te).normalize(),X=new Le().setFromUnitVectors(Ue,K.clone().sub(te).normalize());P.quaternion.copy(P.parent.getWorldQuaternion(new Le).invert().multiply(X.multiply(ge))),P.updateWorldMatrix(!1,!0)};I(D,G,W),I(G,Z,V.clone().addScaledVector(ye,Me))}function R(){g=!1,x="idle",c&&(c.visible=!0),u&&(u.visible=!1),o.dataset.companionSleep="idle"}function L(){if(R(),l=r(),!l)return;l.updateWorldMatrix(!0,!0);let N=[];if(l.traverse(z=>{!z.isMesh||z===u||(z.material?.name==="purple quilt"&&(c=z),z.material?.name==="blue porcelain"&&N.push(z))}),f=Math.max(...N.map(z=>new Qt().setFromObject(z).max.y)),!(!Number.isFinite(f)||!c)){if(!u){let z=c.geometry.clone(),D=l.matrixWorld.clone().invert().multiply(c.matrixWorld);z.applyMatrix4(D),z.computeBoundingBox(),d=z.boundingBox.clone(),h=z.attributes.position.array.slice(),u=new _t(z,c.material),u.name="companion-sleep-quilt",u.userData.roomId="bedroom",u.castShadow=!0,u.receiveShadow=!0,l.add(u)}u.visible=!1,g=!0,p=null}}function O(N){if(!g)return;let z=E(N/1.2),D=E((N-1.2)/1.4),G=E((N-2.6)/1.4),Z=E((N-4)/1.2);x=N<1.2?"pull":N<2.6?"climb":N<4?"lie":N<5.2?"cover":"sleep",o.dataset.companionSleep=x,i.position.set(l.position.x+.87*(1-D),l.position.y+(f-l.position.y)*D,l.position.z+.3+(a/2-.3)*G),e.rotation.set((-Math.PI/2+.18)*G,-Math.PI/2*(1-G),0),e.position.set(0,0,0);let V=(I,P,F,K)=>{let te=n.get(I);te&&te.quaternion.copy(m.get(I)).multiply(T.setFromEuler(A.set(P,F,K)))},oe=1-G;V("comp_arm_l",-.55*oe,0,.16*oe),V("comp_arm_r",-.55*oe,0,-.16*oe),V("comp_forearm_l",0,-.45*oe,0),V("comp_forearm_r",0,.45*oe,0),V("comp_leg_l",-.65*D*(1-G),0,0),V("comp_leg_r",-.65*D*(1-G),0,0);for(let I of["l","r"])V("comp_shin_"+I,0,0,0),V("comp_foot_"+I,0,0,0);if(G>0){s.updateMatrixWorld(!0);let I=1/0;for(let{node:P,ids:F}of M)for(let K of F)I=Math.min(I,P.getVertexPosition(K,new S).applyMatrix4(P.matrixWorld).y);Number.isFinite(I)&&(e.position.y+=(f+.007-I)*G,s.updateMatrixWorld(!0),p=G===1?I+e.position.y-f:null)}if(x==="pull"||x==="climb")for(let[I,P]of[["l",-.12],["r",.12]])_(I,new S(l.position.x+.57,f+.04+.1*z*(1-D),l.position.z+.56+P));if(x==="cover")for(let[I,P]of[["l",-.25],["r",.25]])_(I,new S(l.position.x+P,f+.23,l.position.z+.5-.4*Z));o.dataset.companionBedSurface=String(f),o.dataset.companionBedGap=p===null?"":p.toFixed(4);let $=u.geometry.attributes.position,{min:se,max:re}=d,ye=et.lerp(et.lerp(se.z,.3,z),.1,Z),Me=l.matrixWorld.clone().invert(),We=new Float32Array(25).fill(re.y),ke=.24;if(G>0){s.updateMatrixWorld(!0);for(let I of b)for(let P=0;P<I.geometry.attributes.position.count;P++){let F=I.getVertexPosition(P,new S).applyMatrix4(I.matrixWorld).applyMatrix4(Me);if(F.z>ye-.025&&F.z<re.z&&Math.abs(F.x)<.48){let K=et.clamp(Math.round((F.z-ye)/(re.z-ye)*24),0,24);We[K]=Math.max(We[K],F.y+.075),ke=Math.max(ke,Math.abs(F.x))}}}let W=We.map((I,P)=>Math.max(...We.slice(Math.max(0,P-2),Math.min(25,P+3))));for(let I=0;I<$.count;I++){let P=h[I*3],F=h[I*3+1],K=h[I*3+2],te=(K-se.z)/(re.z-se.z),ge=1-E((Math.abs(P)-ke-.035)/(re.x-ke-.035)),Ue=te*24,X=et.lerp(W[Math.floor(Ue)],W[Math.min(24,Math.ceil(Ue))],Ue%1),ee=Math.max(0,X-re.y)*Z,me=.08*z*(1-Z)*(1-te)**2;$.setXYZ(I,P,F+ee*ge+me,ye+(re.z-ye)*te)}$.needsUpdate=!0,u.geometry.computeVertexNormals(),u.geometry.computeBoundingBox(),u.geometry.computeBoundingSphere(),u.visible=!0,c.visible=!1}return{begin:L,reset:R,update:O,snapshot:()=>({phase:x,surface:f,contactGap:p,active:g})}}var $t={status:"review",version:"20261013-diary-toy-v9",model:"assets/house-companion/spongebob.glb",api:"https://gsy-gpu.tail660bdf.ts.net/house-api",height:.88,daySeconds:120,activitySeconds:10,schedule:[{room:"bedroom",action:"wake",label:"\u8D77\u5E8A\u5566"},{room:"bathroom",action:"wash",label:"\u6D17\u6F31\u65F6\u95F4"},{room:"living",action:"listen",label:"\u542C\u542C\u97F3\u4E50"},{room:"library",action:"rest",label:"\u6ED1\u6ED1\u68AF\uFF0C\u6B47\u4E00\u4F1A\u513F"},{room:"bedroom",action:"journal",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0"},{room:"bedroom",action:"toy",label:"\u73A9\u73A9\u5177\u7BB1"},{room:"roof",action:"bubble",label:"\u5439\u6CE1\u6CE1"},{room:"bedroom",action:"sleep",label:"\u665A\u5B89\uFF0C\u597D\u68A6"}],rooms:{living:{entry:[-.6,0,2.25],position:[.25,0,1.25],activities:["listen","pet","rest"]},storage:{entry:[-3.45,0,1.65],position:[-3.4,0,.8],activities:["tidy","rest"]},bathroom:{entry:[-.65,3,2.05],position:[-.45,3,.9],activities:["wash","rest"]},bedroom:{entry:[.2,6,1.9],position:[-1.5,6,1.3],activities:["journal","toy","rest","sleep"],bed:[-1.65,6.85,-.2]},library:{entry:[2.60267,3,2.22],waypoints:[[3.6,3,2.1]],position:[3.6,3,1.05],activities:["rest"]},roof:{entry:[1.8,9,.9],position:[.65,9,.85],activities:["bubble","rest"]}},actions:{wave:{room:null,label:"\u5411\u4F60\u6253\u62DB\u547C"},journal:{room:"bedroom",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0",duration:12},toy:{room:"bedroom",label:"\u73A9\u73A9\u5177\u7BB1",duration:10},read:{room:"bedroom",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0",duration:12},rest:{room:null,label:"\u6B47\u4E00\u5C0F\u4F1A\u513F"},sleep:{room:"bedroom",label:"\u51C6\u5907\u7761\u89C9",duration:30},wash:{room:"bathroom",label:"\u6D17\u6F31"},listen:{room:"living",label:"\u542C\u97F3\u4E50"},pet:{room:"living",label:"\u966A\u966A\u5C0F\u732B",duration:16},bubble:{room:"roof",label:"\u5439\u6CE1\u6CE1"},tidy:{room:"storage",label:"\u6574\u7406\u6536\u85CF"},wake:{room:"bedroom",label:"\u8D77\u5E8A\u4F38\u4E2A\u61D2\u8170"}}};function sp({actor:i,avatar:e,bones:t,houseGroup:n,getDisplay:s,getToyChest:r,root:o}){let a=E=>(E=et.clamp(E,0,1),E*E*(3-2*E)),l=null,c=null,u=null,h="idle",d=0,f=new S,g=new S,x=0,p=null,m=null;function T(){l&&c&&(c.parent.add(l),l.position.copy(c.position),l.quaternion.copy(c.quaternion),l.scale.copy(c.scale),l.userData.diary.update(0,!0,0)),r?.()?.setCompanionPlaying(!1),l=null,c=null,u=null,h="idle",d=0,p=null,o.dataset.companionProp="idle"}function A(E){if(T(),!!["journal","read","toy"].includes(E)){if(u=E==="toy"?"toy":"journal",f.copy(i.position),u==="journal"){if(l=s("work-journal"),!l){u=null;return}c={parent:l.parent,position:l.position.clone(),quaternion:l.quaternion.clone(),scale:l.scale.clone()},c.housePosition=l.position.clone(),c.houseQuaternion=l.quaternion.clone(),c.houseScale=l.scale.clone(),g.copy(l.position).add(new S(-.36,0,.155*l.scale.x)),g.y=6}else{let _=r?.();if(!_){u=null;return}g.copy(n.worldToLocal(_.touchPoint())).add(new S(-.26,0,.3)),g.y=6}x=Math.PI,h="approach"}}function M(E){if(!u)return null;if(i.position.lerpVectors(f,g,a(E/2)),E<2){h="approach";let _=g.clone().sub(f);x=Math.atan2(_.x,_.z)}else x=u==="journal"?Math.PI/2:Math.PI,h=u==="toy"?E<3?"open":E<7.4?"play":E<8.6?"close":"done":E<3.2?"reach":E<4.5?"lift":E<7?"read":E<8.3?"return":E<9.1?"release":"done";if(u==="toy"&&r()?.setCompanionPlaying(E>=2.75&&E<8),u==="journal"){let _=(R,L)=>{let O=(E-R)/L;return O>0&&O<1?.36*Math.sin(Math.PI*O):0};i.position.y+=_(2.35,1.7)+_(7.45,1.7),E>4.5&&E<7&&(x=et.lerp(Math.PI/2,.1,a((E-4.5)/.6))),E>=7&&E<7.5&&(x=et.lerp(.1,Math.PI/2,a((E-7)/.5)))}return o.dataset.companionProp=u+":"+h,{walking:h==="approach",yaw:x,phase:h}}function b(E,_,R=1){let L=t.get("comp_arm_"+E),O=t.get("comp_forearm_"+E),N=t.get("comp_hand_"+E);if(!L||!O||!N)return;n.updateMatrixWorld(!0);let z=L.getWorldPosition(new S),D=O.getWorldPosition(new S),G=N.getWorldPosition(new S);_=G.clone().lerp(_,R);let Z=z.distanceTo(D),V=D.distanceTo(G),oe=_.clone().sub(z),$=Math.min(oe.length(),Z+V-1e-4);oe.normalize(),m={shoulder:z.toArray(),target:_.toArray(),length:Z+V,distance:z.distanceTo(_)};let se=new S(0,-1,.15).transformDirection(e.matrixWorld);se.addScaledVector(oe,-se.dot(oe)).normalize();let re=et.clamp((Z*Z+$*$-V*V)/(2*Z*$),-1,1),ye=z.clone().addScaledVector(oe,Z*re).addScaledVector(se,Z*Math.sqrt(1-re*re)),Me=(We,ke,W)=>{let I=We.getWorldPosition(new S),P=We.getWorldQuaternion(new Le),F=ke.getWorldPosition(new S).sub(I).normalize(),K=new Le().setFromUnitVectors(F,W.clone().sub(I).normalize());We.quaternion.copy(We.parent.getWorldQuaternion(new Le).invert().multiply(K.multiply(P))),We.updateWorldMatrix(!1,!0)};return Me(L,O,ye),Me(O,N,z.clone().addScaledVector(oe,$)),N.getWorldPosition(new S).distanceTo(_)}function w(E,_){if(p=null,!u||h==="approach")return;if(u==="toy"){let D=r()?.touchPoint();D&&(D.y+=h==="play"?.04+.04*Math.sin(E*4):0,p=b("r",D,h==="done"?0:a((E-2)/.6)));return}let R=E<4.5?a((E-3.2)/1.3):1-a((E-7)/1.3);d=E<4.5?a((E-3.65)/.85):1-a((E-7)/.55),n.updateMatrixWorld(!0);let L=e.localToWorld(new S(0,.53,.36));c.parent.worldToLocal(L);let O=c.parent.getWorldQuaternion(new Le).invert().multiply(e.getWorldQuaternion(new Le)).multiply(new Le().setFromEuler(new Tn(0,Math.PI,0))).multiply(new Le().setFromEuler(new Tn(-1.19,0,0)));l.position.lerpVectors(c.housePosition,L,R),l.quaternion.slerpQuaternions(c.houseQuaternion,O,R),l.scale.copy(c.houseScale),l.userData.diary.update(E,_,d),l.updateWorldMatrix(!0,!0);let N=h==="reach"?a((E-2)/1.2):h==="release"?1-a((E-8.3)/.8):h==="done"?0:1,z=[];for(let[D,G]of[["l",1],["r",-1]]){let Z=.155-G*.2,V=l.localToWorld(new S(et.lerp(Z,-G*.3,d),-.11,.035)),oe=b(D,V,N);oe!==void 0&&z.push(oe)}p=z.length?Math.max(...z):null}return{begin:A,reset:T,place:M,update:w,snapshot:()=>({kind:u,phase:h,opening:d,handGap:p,reach:m,source:l?.name??null,sourceId:l?.uuid??null,position:l?.position.toArray()??null,home:c?.housePosition.toArray()??null,visible:l?.visible??!1})}}function rp(i,e,t=!1,n="auto",s=null){let r=g=>{let x=(i%20-g)/.24;return x>=0&&x<=1?Math.sin(Math.PI*x):0},o=Math.max(...[2.8,7.2,7.55,12.6,17.4].map(r)),a=["read","journal","tidy"].includes(e),l=e==="sleep",c=a?Math.sin(i*.75)*.28:Math.sin(i*.47)*.38,u=a?-.95:Math.sin(i*.31)*.16;s&&!a&&(c=s.x*.85,u=s.y*.65);let h=["wave","bubble","pet","wake"].includes(e)?.85:.25,d=e==="rest"?.8:a?.65:0;o=Math.max(o,a?.18:e==="rest"?.12:0);let f=e==="wave"?.8:a?.2:.1;return l&&(o=1,c=0,u=0,h=.1,d=1,f=0),n==="blink"&&(o=1),n==="left"&&(o=0,c=-1,u=0),n==="right"&&(o=0,c=1,u=0),n==="happy"&&(o=.13,h=1,d=0,f=1),n==="calm"&&(o=.35,h=0,d=1,f=0),{blink:o,lookRight:Math.max(0,c),lookLeft:Math.max(0,-c),lookUp:Math.max(0,u),lookDown:Math.max(0,-u),smile:h,calm:d,browRaise:f,talk:t?(Math.sin(i*13)+1)*.42:0}}function op(i,e){let t=[i.entry,...i.waypoints??[],i.position],n=t.slice(1).map((r,o)=>Math.hypot(...r.map((a,l)=>a-t[o][l]))),s=Math.max(0,Math.min(1,e))*n.reduce((r,o)=>r+o,0);for(let r=0;r<n.length;r++){if(s<=n[r]||r===n.length-1){let o=n[r]?Math.min(1,s/n[r]):1;return{position:t[r].map((a,l)=>a+(t[r+1][l]-a)*o),direction:t[r+1].map((a,l)=>a-t[r][l])}}s-=n[r]}}function ap(i){let e=Math.max(0,Math.min(1,i)),t=e*e*(3-2*e);return{position:[2.25+.6*Math.sin(e*Math.PI*.8),7.65-4.45*t,-.4+2.1*e],direction:[.6*Math.PI*.8*Math.cos(e*Math.PI*.8),-26.7*e*(1-e),2.1]}}function lp({actor:i,avatar:e,model:t,bones:n,houseGroup:s}){let r=[];s.updateMatrixWorld(!0);let o=e.matrixWorld.clone().invert();t.traverse(h=>{if(!h.isMesh||h.name.includes("eyelid"))return;let d=[];for(let f=0;f<h.geometry.attributes.position.count;f++){let g=h.getVertexPosition(f,new S).applyMatrix4(h.matrixWorld).applyMatrix4(o);g.y>.26&&g.y<.43&&Math.abs(g.x)<.32&&d.push(f)}r.push({node:h,ids:d})});function a(h,d,f){let g=h.getWorldPosition(new S),x=h.getWorldQuaternion(new Le),p=d.getWorldPosition(new S).sub(g).normalize(),m=new Le().setFromUnitVectors(p,f.clone().normalize());h.quaternion.copy(h.parent.getWorldQuaternion(new Le).invert().multiply(m.multiply(x))),h.updateWorldMatrix(!1,!0)}let l=0,c=0;function u(h,d,f){c=h;let g=ap(h),x=new S(...g.position),p=new S(...g.direction).normalize();i.position.copy(x).lerp(new S(...f),d),e.rotation.set(-.1*(1-d),Math.atan2(p.x,p.z),0),e.position.set(0,0,0);let m=new S(p.z,0,-p.x).normalize(),T=new S().crossVectors(p,m).normalize();if(s.updateMatrixWorld(!0),d<1){for(let M of["l","r"]){let b=n.get("comp_leg_"+M),w=n.get("comp_shin_"+M),E=n.get("comp_foot_"+M);!b||!w||!E||(a(b,w,p.clone().addScaledVector(T,.3)),a(w,E,p.clone().addScaledVector(T,.08)))}s.updateMatrixWorld(!0);let A=1/0;for(let{node:M,ids:b}of r)for(let w of b)A=Math.min(A,M.getVertexPosition(w,new S).applyMatrix4(M.matrixWorld).sub(x).dot(T));Number.isFinite(A)&&e.position.addScaledVector(T,(.012-A)*(1-d)),s.updateMatrixWorld(!0);for(let M of["l","r"]){let b=n.get("comp_arm_"+M),w=n.get("comp_forearm_"+M),E=n.get("comp_hand_"+M),_=n.get("comp_shin_"+M);if(!b||!w||!E||!_)continue;let R=b.getWorldPosition(new S),L=w.getWorldPosition(new S),O=E.getWorldPosition(new S),N=R.distanceTo(L),z=L.distanceTo(O),D=_.getWorldPosition(new S).addScaledVector(T,.07).sub(R),G=Math.min(D.length(),N+z-.001);D.normalize();let Z=m.clone().multiplyScalar(M==="l"?1:-1);Z.addScaledVector(D,-Z.dot(D)).normalize();let V=et.clamp((N*N+G*G-z*z)/(2*N*G),-1,1),oe=R.clone().addScaledVector(D,N*V).addScaledVector(Z,N*Math.sqrt(1-V*V));a(b,w,oe.sub(R)),a(w,E,R.clone().addScaledVector(D,G).sub(w.getWorldPosition(new S)))}s.updateMatrixWorld(!0),l=1/0;for(let{node:M,ids:b}of r)for(let w of b)l=Math.min(l,M.getVertexPosition(w,new S).applyMatrix4(M.matrixWorld).sub(x).dot(T));Number.isFinite(l)||(l=null)}return{slide:g,contact:l}}return{update:u,snapshot:()=>({progress:c,contact:l,posture:"seated"})}}function cp(i){let e=0,t=0,n=null,s=null,r=0,o=()=>i.schedule[Math.floor(e/(i.daySeconds/i.schedule.length))%i.schedule.length],a=()=>{let l=o(),c=s?.room??n??l.room,u=i.rooms[c].activities,h=s?.action??(n?u[Math.floor(t/i.activitySeconds)%u.length]:l.action);return{room:c,action:h,day:e,phase:Math.floor(e/(i.daySeconds/i.schedule.length)),revision:r,following:!!n,commanded:!!s}};return{snapshot:a,tick(l,c=!1,u=!1){return c||(e=(e+Math.max(0,l))%i.daySeconds,t+=Math.max(0,l)),s&&(!c||u)&&(s.remaining-=Math.max(0,l),s.remaining<=0&&(s=null)),a()},follow(l){return l&&!i.rooms[l]?!1:(n=l,t=0,s=null,r++,!0)},act(l){let c=i.actions[l];return c?(s={action:l,room:c.room??n??o().room,remaining:c.duration??10},r++,!0):!1},cancel(){s=null,r++}}}function up({root:i,canvas:e,camera:t,houseGroup:n,focusRoom:s,getRoom:r,getAsset:o,getPet:a,getDisplay:l,getToyChest:c,reducedMotion:u}){let h=cp($t),d=new At;d.name="spongebob-companion",n.add(d),d.userData.companionId="spongebob";let f=new At;d.add(f);let g=$t.height/1.25;f.scale.setScalar(g);let x=new Map,p=new Map,m=null,T=null,A=null,M=null,b=null,w=null,E=[],_=[],R=[],L=0,O="auto",N={},z=null,D=-10,G=0,Z=null,V=null,oe=0,$=0,se=!1,re=0,ye=.64,Me=.32,We=null,ke=!1,W=!1,I=2,P=null,F=0,K=null,te=null,ge=document.createElement("section");ge.className="companion-hud",ge.setAttribute("aria-label","\u6D77\u7EF5\u5B9D\u5B9D\u7684\u4F5C\u606F"),ge.innerHTML='<span class="companion-day">\u6D77\u7EF5\u5B9D\u5B9D\u5165\u4F4F\u9884\u89C8 \xB7 \u5F85\u5BA1</span><strong data-companion-activity>\u6B63\u5728\u8F7D\u5165\u6D77\u7EF5\u5B9D\u5B9D\u2026</strong><div class="companion-review-controls"><select aria-label="\u9884\u89C8\u89D2\u8272\u52A8\u4F5C" data-companion-action disabled>'+Object.entries($t.actions).filter(([ce])=>ce!=="wake"&&ce!=="tidy").map(([ce,Ie])=>'<option value="'+ce+'">'+Ie.label+"</option>").join("")+"</select></div>",i.append(ge);let Ue=document.createElement("select");Ue.setAttribute("aria-label","\u9884\u89C8\u89D2\u8272\u8868\u60C5"),Ue.innerHTML='<option value="auto">\u81EA\u7136\u8868\u60C5</option><option value="blink">\u95ED\u773C</option><option value="left">\u770B\u5DE6\u8FB9</option><option value="right">\u770B\u53F3\u8FB9</option><option value="happy">\u5F00\u5FC3</option><option value="calm">\u653E\u677E</option>',ge.querySelector(".companion-review-controls").append(Ue),Ue.addEventListener("change",()=>{O=Ue.value}),e.addEventListener("pointermove",ce=>{let Ie=e.getBoundingClientRect();z={x:((ce.clientX-Ie.left)/Ie.width-.5)*2,y:(.5-(ce.clientY-Ie.top)/Ie.height)*2},D=L});let X=document.createElement("div");X.className="companion-bubble",X.hidden=!0,X.setAttribute("role","status"),i.append(X);let ee=document.createElement("dialog");ee.className="companion-chat",ee.setAttribute("aria-label","\u548C\u6D77\u7EF5\u5B9D\u5B9D\u804A\u5929"),ee.innerHTML=`<header><div><b>\u6D77\u7EF5\u5B9D\u5B9D</b><small>\u6709\u7A7A\u804A\u4E24\u53E5\u5417\uFF1F</small></div><button type="button" data-companion-close aria-label="\u5173\u95ED\u804A\u5929"></button></header>
    <p data-companion-config class="companion-config">\u6B63\u5728\u8FDE\u63A5\u804A\u5929\u2026</p>
    <div class="companion-messages" role="log" aria-live="polite"></div>
    <div class="companion-suggestions"><button type="button" data-say="\u7FFB\u7FFB\u5B9E\u4E60\u65E5\u8BB0\u5427">\u7FFB\u65E5\u8BB0</button><button type="button" data-say="\u6211\u4EEC\u4E00\u8D77\u5439\u6CE1\u6CE1\u5427">\u5439\u6CE1\u6CE1</button><button type="button" data-say="\u53BB\u7761\u89C9\u5427">\u665A\u5B89</button></div>
    <form><label for="companion-input">\u8DDF\u4ED6\u8BF4\u53E5\u8BDD</label><div class="companion-input-row"><input id="companion-input" maxlength="400" autocomplete="off" placeholder="\u6BD4\u5982\uFF1A\u4E00\u8D77\u53BB\u8BFB\u4E66\u5427"><button type="submit">\u53D1\u9001</button></div></form>
    <footer><span data-companion-status role="status"></span></footer>`,document.body.append(ee);let me=ge.querySelector("[data-companion-activity]"),fe=ee.querySelector(".companion-messages"),de=ee.querySelector("[data-companion-status]"),Ve=ee.querySelector("input"),Oe=ee.querySelector("[type=submit]"),Se={snapshot:()=>({...h.snapshot(),loaded:se,room:Z,activity:V,entryTime:oe,chatOpen:ee.open,position:d.position.toArray(),height:$t.height,face:N,bedHeight:We,backOffset:Me,sleep:M?.snapshot(),slide:b?.snapshot(),book:we.snapshot(),petContact:w,bones:[...x.keys()],animations:m?.userData.animations??[],status:"review"}),actor:d};i.dataset.companionState="loading";let ze=document.createElement("link");ze.rel="stylesheet",ze.href="./styles/house-companion.css?v="+$t.version,document.head.append(ze);function k(ce,Ie="assistant"){let U=document.createElement("p");for(U.className="companion-message "+Ie,U.textContent=ce,fe.append(U);fe.children.length>24;)fe.firstElementChild.remove();fe.scrollTop=fe.scrollHeight}function je(ce=!0){F++,K?.abort(),K=null,Oe.disabled=!1,de.textContent="",ce&&h.cancel()}function Ke(){je(!1),ee.open&&ee.close(),te?.focus({preventScroll:!0})}function C(){re=3,X.textContent="\u55E8\uFF01\u6211\u51C6\u5907\u597D\u5566\uFF01",X.hidden=!1,h.act("wave")}function y(ce=e){se&&(te=ce,C(),ee.open||ee.show(),Ve.focus())}ee.querySelector("[data-companion-close]").addEventListener("click",Ke),ge.querySelector("[data-companion-action]").addEventListener("change",ce=>{if(!se)return;je();let Ie=ce.target.value,U=$t.actions[Ie].room;U&&s(U),h.act(Ie),V=null}),document.addEventListener("keydown",ce=>{ce.key==="Escape"&&ee.open&&!document.querySelector("dialog:modal")&&(ce.preventDefault(),Ke())}),ee.addEventListener("cancel",ce=>{ce.preventDefault(),Ke()}),ee.addEventListener("close",()=>{je(!1)});async function q(ce,Ie,U){let xe=await fetch($t.api+ce,{method:Ie?"POST":"GET",headers:Ie?{"Content-Type":"application/json"}:void 0,body:Ie?JSON.stringify(Ie):void 0,signal:U});if(!xe.ok){let Y=await xe.json().catch(()=>null);throw new Error(typeof Y?.detail=="string"?Y.detail:"\u5C0F\u5C4B\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u8BD5")}return xe}let ne=new AbortController,ae=setTimeout(()=>ne.abort(),8e3);q("/health",null,ne.signal).then(ce=>ce.json()).then(ce=>{ee.querySelector("[data-companion-config]").textContent=ce.chatConfigured?"\u6587\u5B57\u804A\u5929":"\u804A\u5929\u5C1A\u672A\u914D\u7F6E \xB7 \u9700\u8981\u670D\u52A1\u5668 DeepSeek \u5BC6\u94A5",i.dataset.companionChatConfigured=String(ce.chatConfigured)}).catch(()=>{ee.querySelector("[data-companion-config]").textContent="\u804A\u5929\u670D\u52A1\u6682\u65F6\u672A\u8FDE\u63A5\uFF0C\u4F5C\u606F\u548C\u623F\u95F4\u966A\u4F34\u4ECD\u53EF\u4F53\u9A8C",i.dataset.companionChatConfigured="false"}).finally(()=>clearTimeout(ae));async function _e(ce){if(ce=ce.trim(),!ce||ce.length>400||Oe.disabled)return;je();let Ie=F,U=new AbortController;K=U;let xe=setTimeout(()=>U.abort(),6e4);Oe.disabled=!0,k(ce,"user"),Ve.value="",de.textContent="\u6D77\u7EF5\u5B9D\u5B9D\u6B63\u5728\u60F3\u2026";try{P||(P=(await(await q("/session",{},U.signal)).json()).session);let ve=await(await q("/chat",{session:P,message:ce,room:Z??"living",activity:V??"idle"},U.signal)).json();if(Ie!==F)return;if(k(ve.reply),de.textContent="",ve.action&&$t.actions[ve.action]){let Ee=$t.actions[ve.action].room;Te=!0;try{Ee&&Ee!==r()&&s(Ee)}finally{Te=!1}h.act(ve.action),V=null}}catch(Y){if(Ie!==F)return;Y.name==="AbortError"?de.textContent="\u56DE\u590D\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u53D1\u9001":(de.textContent=Y.message,Y.message.includes("\u4F1A\u8BDD\u5DF2\u8FC7\u671F")&&(P=null))}finally{clearTimeout(xe),Ie===F&&(Oe.disabled=!1,K=null)}}ee.querySelector("form").addEventListener("submit",ce=>{ce.preventDefault(),_e(Ve.value)}),ee.querySelectorAll("[data-say]").forEach(ce=>ce.addEventListener("click",()=>_e(ce.dataset.say)));let Te=!1;window.addEventListener("house:room-changed",ce=>{ke=ce.detail.id==="library",Te||je(),h.follow(ce.detail.id),V=null}),document.addEventListener("visibilitychange",()=>{document.hidden&&je()});let le=new At;d.add(le);let ue=new pn({color:11528950,transparent:!0,opacity:.28,roughness:.1,metalness:.05,clearcoat:1});for(let ce=0;ce<6;ce++){let Ie=new _t(new mo(.05+ce*.006,12,8),ue);le.add(Ie)}le.visible=!1;let we=sp({actor:d,avatar:f,bones:x,houseGroup:n,getDisplay:l,getToyChest:c,root:i});new Cr().load($t.model+"?v="+$t.version,ce=>{m=ce.scene,f.add(m),n.updateMatrixWorld(!0);let Ie=new Qt;m.traverse(Y=>{Y.isMesh&&(Y.isSkinnedMesh?Y.computeBoundingBox():Y.geometry.computeBoundingBox(),Ie.union((Y.isSkinnedMesh?Y.boundingBox:Y.geometry.boundingBox).clone().applyMatrix4(Y.matrixWorld).applyMatrix4(f.matrixWorld.clone().invert())))});let U=Ie.getSize(new S);m.scale.setScalar(1.25/U.y),ye=U.z*m.scale.x,m.position.set(0,-Ie.min.y*m.scale.x,-(Ie.min.z+Ie.max.z)*.5*m.scale.x),m.traverse(Y=>{Y.userData.companionId="spongebob",Y.isMesh&&(Y.castShadow=!0,Y.receiveShadow=!0),Y.morphTargetDictionary&&E.push(Y),Y.isSkinnedMesh&&(Y.frustumCulled=!1),Y.isBone&&(x.set(Y.name,Y),p.set(Y.name,{q:Y.quaternion.clone(),p:Y.position.clone()}))}),m.updateMatrixWorld(!0),m.traverse(Y=>{if(!Y.isSkinnedMesh||Y.name.includes("eyelid"))return;let ve=Y.geometry.attributes.position,Ee=[];for(let he=0;he<ve.count;he++)ve.getY(he)<.16&&Ee.push(he);_.push({node:Y,indices:Ee})});let xe=1/0;m.traverse(Y=>{if(!Y.isMesh)return;let ve=Y.geometry.attributes.position;for(let Ee=0;Ee<ve.count;Ee++){let he=new S().fromBufferAttribute(ve,Ee).applyMatrix4(Y.matrixWorld).applyMatrix4(f.matrixWorld.clone().invert());he.y>.5&&he.y<1.1&&(xe=Math.min(xe,he.z))}}),Me=Number.isFinite(xe)?-xe:ye/2,m.userData.animations=ce.animations.map(Y=>Y.name),T=new bo(m),M=ip({actor:d,avatar:f,model:m,bones:x,houseGroup:n,getBed:()=>o?.("bed"),root:i,height:$t.height}),b=lp({actor:d,avatar:f,model:m,bones:x,houseGroup:n}),Se.clips=ce.animations,se=!0,ge.querySelector("select").disabled=!1,i.dataset.companionState="ready",V=null},void 0,()=>{i.dataset.companionState="error",me.textContent="\u89D2\u8272\u672A\u80FD\u8F7D\u5165\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5"});function Je(ce){let Ie={head:["head","Head","mixamorigHead","comp_head"],hips:["Hips","pelvis","hips","comp_root"],leftArm:["LeftArm","upperarm_l","left_upper_arm","comp_arm_l"],rightArm:["RightArm","upperarm_r","right_upper_arm","comp_arm_r"],leftLeg:["LeftUpLeg","thigh_l","left_upper_leg","comp_leg_l"],rightLeg:["RightUpLeg","thigh_r","right_upper_leg","comp_leg_r"],jaw:["jaw","Jaw","comp_jaw"]};for(let U of Ie[ce]??[]){if(x.has(U))return x.get(U);let xe=[...x].find(([Y])=>Y.toLowerCase().replace(/[^a-z_]/g,"").endsWith(U.toLowerCase()));if(xe)return xe[1]}return null}function Re(ce,Ie=0,U=0,xe=0){let Y=Je(ce);Y&&(Y.rotateX(Ie),Y.rotateY(U),Y.rotateZ(xe))}function Ce(ce){M?.reset(),we.reset(),a?.()?.endInteraction?.();let Ie=Z!==ce.room||ke;if(ke=!1,Z=ce.room,V=ce.action,$=0,d.userData.roomId=Z,d.userData.revision=ce.revision,d.traverse(U=>{U.userData.roomId=Z,U.userData.companionId="spongebob"}),Ie&&(W=Z==="library",I=W?5.6:2,d.position.fromArray($t.rooms[Z].entry),oe=0),me.textContent=$t.actions[V]?.label??V,i.dataset.companionRoom=Z,i.dataset.companionActivity=V,V==="sleep"){M?.begin();let U=o?.("bed"),xe=$t.rooms.bedroom.bed,Y=new ws(new S(xe[0],9,xe[2]+.35),new S(0,-1,0));U?.updateMatrixWorld(!0),We=U?Y.intersectObject(U,!0).find(ve=>ve.point.y<7.05&&ve.point.y>6.3&&ve.face.normal.clone().transformDirection(ve.object.matrixWorld).y>.8)?.point.y:null}we.begin(V),V==="pet"&&a?.()?.beginInteraction?.(d.position.toArray())}Se.react=()=>y(e),window.addEventListener("house:pet-greet",()=>{se&&(s("living"),h.act("pet"),V=null)});function Ye(ce){if(!ce||A?.getClip()===ce)return;let Ie=T.clipAction(ce),U=R.findIndex(xe=>xe.action===Ie);U>=0&&R.splice(U,1),A&&(A.fadeOut(.18),R.push({action:A,time:.18})),A=Ie,Ie.reset().fadeIn(.18).play()}return Se.update=(ce,Ie)=>{if(!se)return;let U=!Ie||document.hidden,xe=U||!!document.querySelector("dialog[open]"),Y=h.tick(ce,xe,!U&&ee.open),ve=U||xe&&!Y.commanded;if(!U&&(!xe||ee.open)&&(L+=ce),(Z!==Y.room||V!==Y.action||d.userData.revision!==Y.revision)&&Ce(Y),d.visible=!r()||r()===Z,!d.visible){X.hidden=!0;return}ve||(oe=Math.min(I,oe+ce),$+=ce);let Ee=W&&!u&&oe<3.6;me.textContent=Ee?"\u6ED1\u6ED1\u68AF":$t.actions[V]?.label??V;let he=$t.rooms[Z],$e=u||oe>=I?1:Math.max(0,Math.min(1,(oe-(W?3.6:0))/2)),Ze=$e*$e*(3-2*$e),B=new S(...he.position);if(V==="pet"){let Xe=o?.("siamese-cat");Xe&&B.copy(Xe.position).add(new S(.4,0,.38))}let pe=op(he,Ze);d.position.fromArray(pe.position),V==="pet"&&d.position.lerpVectors(new S(...he.entry),B,Ze),f.rotation.set(0,0,0),f.position.set(0,0,0),f.scale.setScalar(g);let De=we.place($),tt=De?.walking??(!Ee&&$e<1),it=Ee?"slide":tt?"walk":De?["read","lift","return"].includes(De.phase)?"read":"idle":{rest:"sit",sleep:"lie",listen:"idle"}[V]??V,rt=Se.clips?.find(Xe=>Xe.name===it);Ye(rt),tt?f.rotation.y=Math.atan2(pe.direction[0],pe.direction[2]):f.rotation.y=(["read","journal"].includes(V)?-.22:.1)+(u?0:Math.sin(L*.55)*.035),De&&(f.rotation.y=De.yaw);for(let[Xe,xt]of p){let St=x.get(Xe);St.quaternion.copy(xt.q),St.position.copy(xt.p)}if(T?.update(ve?0:ce),!ve)for(let Xe=R.length-1;Xe>=0;Xe--)R[Xe].time-=ce,R[Xe].time<=0&&(R[Xe].action.stop(),R.splice(Xe,1));rt||(tt?(Re("leftLeg",Math.sin($*8)*.3),Re("rightLeg",-Math.sin($*8)*.3)):V==="wave"?Re("rightArm",0,0,-.55+Math.sin($*9)*.13):["journal","read","tidy","wash","bubble","pet"].includes(V)&&(Re("leftArm",-.5,0,.12),Re("rightArm",-.5,0,-.12),Re("head",.08))),V==="sleep"&&!tt&&M?.update(u?6:Math.max(0,$-I));let yt=V==="sleep"&&!["cover","sleep"].includes(i.dataset.companionSleep)?"rest":V;N=rp(L,Ee?"bubble":yt,!1,O,L-D<4?z:null),V==="pet"&&!tt&&(N.lookDown=.7,N.lookLeft=.55);for(let Xe of E)for(let[xt,St]of Object.entries(N)){let rn=Xe.morphTargetDictionary[xt];rn!==void 0&&(Xe.morphTargetInfluences[rn]=St)}if(!tt&&!Ee&&V!=="sleep"&&!u&&Re("hips",(["read","journal"].includes(V)?.055:0)+Math.sin(L*1.7)*.008,0,Math.sin(L*.85)*.01),ee.open&&!Y.commanded){let Xe=t.position.clone().sub(d.position);f.rotation.y=Math.atan2(Xe.x,Xe.z)}if(w=null,V==="pet"&&!tt&&f.rotation.set(.1,.1,0),Ee)b?.update(Math.min(1,oe/3.2),et.clamp((oe-3.2)/.4,0,1),he.entry);else if(V!=="sleep"||tt){n.updateMatrixWorld(!0);let Xe=1/0,xt=new S;for(let{node:St,indices:rn}of _)for(let Ft of rn)xt.fromBufferAttribute(St.geometry.attributes.position,Ft),St.applyBoneTransform(Ft,xt),xt.applyMatrix4(St.matrixWorld),Xe=Math.min(Xe,xt.y);Number.isFinite(Xe)&&(f.position.y+=(De?d.position.y:he.position[1])-Xe+.008)}if(V==="pet"&&!tt){let Xe=a?.()?.touchPoint?.();if(Xe){a?.()?.trackCompanion?.(d.position.clone().add(new S(0,.7,0)).toArray()),n.updateMatrixWorld(!0);let xt=x.get("comp_arm_r"),St=x.get("comp_forearm_r"),rn=x.get("comp_hand_r");if(xt&&St&&rn){let Ft=xt.getWorldPosition(new S),Dn=St.getWorldPosition(new S),vn=rn.getWorldPosition(new S),Mn=Ft.distanceTo(Dn),oi=Dn.distanceTo(vn),cs=Xe.clone().add(new S(0,.018,.018*Math.sin($*3))),Sn=cs.sub(Ft),vi=Math.min(Sn.length(),Mn+oi-.001);Sn.normalize();let ai=new S(0,-1,0);ai.addScaledVector(Sn,-ai.dot(Sn)).normalize();let Mi=et.clamp((Mn*Mn+vi*vi-oi*oi)/(2*Mn*vi),-1,1),Lr=Ft.clone().addScaledVector(Sn,Mn*Mi).addScaledVector(ai,Mn*Math.sqrt(1-Mi*Mi)),ie=(ht,Dt,v)=>{let H=ht.getWorldPosition(new S),J=ht.getWorldQuaternion(new Le),j=Dt.getWorldPosition(new S).sub(H).normalize(),Q=new Le().setFromUnitVectors(j,v.clone().sub(H).normalize());ht.quaternion.copy(ht.parent.getWorldQuaternion(new Le).invert().multiply(Q.multiply(J))),ht.updateWorldMatrix(!1,!0)};ie(xt,St,Lr),ie(St,rn,Ft.clone().addScaledVector(Sn,vi)),w=rn.getWorldPosition(new S).distanceTo(Xe)}}}if(G+=ce,G>.2&&(G=0,i.dataset.companionFace=JSON.stringify(N),i.dataset.companionPosition=JSON.stringify(d.position.toArray()),i.dataset.companionHeight=String($t.height),i.dataset.companionArrival=Ee?"slide":tt?"walk":"activity"),we.update($,u),le.visible=!tt&&V==="bubble",le.children.forEach((Xe,xt)=>{let St=($*.25+xt*.17)%1;Xe.position.set(.23+Math.sin(xt+St*4)*.18,.9+St*.8,.5+St*.3),Xe.scale.setScalar(.4+St*.8)}),ge.querySelector(".companion-day").textContent=`${Math.floor(Y.day/120*24).toString().padStart(2,"0")}:00 \xB7 ${Y.following?"\u966A\u4F60\u901B\u901B":"\u5FAA\u73AF\u7684\u4E00\u5929"} \xB7 \u9884\u89C8\u5F85\u5BA1`,re>0){re-=ce;let Xe=d.position.clone().add(new S(0,$t.height+.13,0)).project(t);X.hidden=re<=0||!d.visible||Xe.z<-1||Xe.z>1,X.style.left=et.clamp((Xe.x*.5+.5)*i.clientWidth,95,i.clientWidth-95)+"px",X.style.top=et.clamp((-.5*Xe.y+.5)*i.clientHeight,80,i.clientHeight-80)+"px"}},Se}var yn={version:"20261013-cat-side-quarantine-v15",status:"review",toiletProjects:{asset:"toilet",room:"bathroom",anchor:[-1.3,4.1,-.4]},structure:{id:"structure",name:"\u4E09\u5C42\u623F\u5C4B\u7ED3\u6784",url:"assets/house-review/structure.glb"},rooms:[{id:"living",name:"\u5BA2\u5385",floor:"\u4E00\u5C42",level:0,label:[0,.5,2.75],bounds:[[-2.5,0,-2.5],[2.2,2.9,2.8]],target:[0,1.25,0],camera:[0,2.25,8.6]},{id:"storage",name:"\u50A8\u85CF\u5BA4",floor:"\u4E00\u5C42",level:0,label:[-3.45,1.5,1],bounds:[[-4.2,0,-2.5],[-2.55,2.9,1.6]],target:[-3.32,1.15,0],camera:[-4.6,2.2,5.7]},{id:"bathroom",name:"\u6D74\u5BA4",floor:"\u4E8C\u5C42",level:1,label:[-2,3.55,2.7],bounds:[[-4.6,3,-2.4],[.25,5.95,2.7]],target:[-1.75,4.25,0],camera:[-2.6,5.1,7.7]},{id:"bedroom",name:"\u5367\u5BA4",floor:"\u4E09\u5C42",level:2,label:[-1.2,6.55,2.2],bounds:[[-4.1,6,-2.1],[1.12,8.95,2.6]],target:[-1.2,7.2,0],camera:[-2.3,8.15,7.6]},{id:"library",name:"\u56FE\u4E66\u9986",floor:"\u4E8C\u3001\u4E09\u5C42 \xB7 \u6311\u9AD8",level:1,label:[3.3,4.8,1.2],bounds:[[.25,3,-2.8],[4.65,8.8,2.7]],target:[2.7,5.7,0],camera:[4.7,7.1,12.5]},{id:"roof",name:"\u5C4B\u9876\u82B1\u56ED",floor:"\u5929\u53F0",level:3,label:[0,9.45,1.2],bounds:[[-2.5,9,-2],[2.5,10.8,2]],target:[0,9.6,0],camera:[0,12.4,7.9]}],assets:[{id:"chair",name:"\u7EA2\u6276\u624B\u6905",room:"living",url:"assets/house-review/props/chair.glb",position:[-1.3,0,-.3],rotation:.13},{id:"couch",name:"\u7EFF\u7BA1\u6C99\u53D1",room:"living",url:"assets/house-review/props/couch.glb",position:[1.1,0,-.35],rotation:-.18},{id:"table",name:"\u5706\u684C",room:"living",url:"assets/house-review/props/table-speaker-base.glb",position:[0,0,.05],rotation:0},{id:"bluetooth-speaker",name:"\u84DD\u7259\u97F3\u7BB1",room:"living",url:"assets/house-review/props/speaker.glb",position:[0,.76,.05],rotation:-.08},{id:"laptop",name:"\u6C99\u53D1\u4E0A\u7684\u7B14\u8BB0\u672C\u7535\u8111",room:"living",url:"assets/house-review/props/laptop.glb",position:[1.08,.49,-.1],rotation:-.18},{id:"siamese-cat",name:"\u66B9\u7F57\u732B",room:"living",url:"assets/house-review/props/siamese-kitten-compact.glb",position:[-1.55,0,1.6],rotation:.22,pet:{route:[[-1.4,1.95],[-.65,2.08],[.25,2.05],[.85,1.88],[.7,1.48],[0,1.43],[-.95,1.44]],fur:!0,restPoses:!0,groundedSideLie:!1,lieEnabled:!1,sitCorrectives:!1,sitEnabled:!1,poseSitV2:!1,runtimeSha256:"d32d168d6d59511661863545365ee95f8e704d7ccd664b3a5a8028d351dac5b6",faceForward:[.7452153247454482,0,.6668239046139065],faceCenter:[.124894668,.46660155,.339340067],bodyScale:.8,limbRatio:.78,walkSpeed:.055,stepHeight:.011,gaitCycle:.62}},{id:"treasure",name:"\u50A8\u85CF\u5BA4\u5B9D\u85CF",room:"storage",url:"assets/house-review/props/treasure.glb",position:[-3.3,0,-.1],rotation:0},{id:"bathtub",name:"\u6D74\u7F38",room:"bathroom",url:"assets/house-review/props/bathtub.glb",position:[-2.7,3,.7],rotation:.1},{id:"sink",name:"\u6876\u5F0F\u6D17\u624B\u6C60",room:"bathroom",url:"assets/house-review/props/sink.glb",position:[-1.65,3.62,-2.6],rotation:0},{id:"toilet",name:"\u9A6C\u6876",room:"bathroom",url:"assets/house-review/props/toilet.glb",position:[-1.3,3,-.6],rotation:0},{id:"bed",name:"\u7AF9\u8282\u5E8A",room:"bedroom",url:"assets/house-review/props/bed.glb",position:[-1.65,6,-.25],rotation:0},{id:"barrel",name:"\u5367\u5BA4\u6876\u67DC",room:"bedroom",url:"assets/house-review/props/barrel.glb",position:[-3,6,-.55],rotation:0},{id:"chest",name:"\u5367\u5BA4\u6536\u7EB3\u7BB1",room:"bedroom",url:"assets/house-review/props/chest.glb",position:[.05,6,.65],rotation:-.15},{id:"lounger",name:"\u5929\u53F0\u8EBA\u6905",room:"roof",url:"assets/house-review/props/lounger.glb",position:[-.95,9,.9],rotation:.15}],displays:[{id:"national-2021",kind:"award",room:"storage",level:0,position:[-3.81021,1.43,-1.31209],normal:[.82983,0,.55801],size:[.43,.31041]},{id:"national-2023",kind:"award",room:"storage",level:0,position:[-3.33921,1.43,-1.84648],normal:[.67977,0,.73342],size:[.43,.30167]},{id:"math-2022",kind:"award",room:"storage",level:0,position:[-2.86678,1.43,-2.21072],normal:[.55374,0,.83269],size:[.43,.31175]},{id:"holtek-2023",kind:"award",room:"storage",level:0,position:[-3.81143,2.02,-1.41627],normal:[.80946,0,.58717],size:[.43,.30436]},{id:"mathorcup-2022",kind:"award",room:"storage",level:0,position:[-3.3401,2.02,-1.923],normal:[.66501,0,.74684],size:[.43,.29025]},{id:"scholarship-2022",kind:"award",room:"storage",level:0,position:[-2.86743,2.02,-2.27552],normal:[.54283,0,.83984],size:[.33825,.48]},{id:"graduate-2024",kind:"award",room:"storage",level:0,position:[-3.81205,2.61,-1.46938],normal:[.7991,0,.6012],size:[.35475,.48]},{id:"merit-2021",kind:"award",room:"storage",level:0,position:[-3.34055,2.61,-1.96296],normal:[.65745,0,.7535],size:[.3525,.48]},{id:"merit-2022",kind:"award",room:"storage",level:0,position:[-2.86777,2.61,-2.30964],normal:[.53723,0,.84344],size:[.3495,.48]},{id:"league-2021",kind:"award",room:"storage",level:0,position:[-2.66,1.91,-1.3],normal:[-1,0,0],size:[.5,.35078]},{id:"union-2021",kind:"award",room:"storage",level:0,position:[-2.66,2.52,-1.3],normal:[-1,0,0],size:[.5,.33203]},{id:"skills-book",kind:"content",room:"library",level:1,position:[1.45,3.6,1.42],normal:[.15,0,.99],size:[.8,1.1]},{id:"work-journal",kind:"content",room:"bedroom",level:2,position:[-2.07,6.842,.2],normal:[0,1,0],size:[.48,.6],style:"book"}],interactions:[{id:"living-speaker",room:"living",action:"music",label:"\u84DD\u7259\u97F3\u7BB1 \xB7 \u7F51\u9875\u80CC\u666F\u97F3\u4E50",button:"\u542C\u97F3\u4E50",asset:"bluetooth-speaker",anchor:[0,1.3,.05]},{id:"laptop-profile",room:"living",section:"overview",label:"\u7B14\u8BB0\u672C\u7535\u8111 \xB7 \u57FA\u672C\u4FE1\u606F",button:"\u57FA\u672C\u4FE1\u606F",asset:"laptop",anchor:[1.08,1.3,-.1]},{id:"skills-book",room:"library",section:"skills",label:"\u4E13\u4E1A\u6280\u80FD\u4E66 \xB7 \u5168\u6808\u4E0E Agent \u5DE5\u7A0B",button:"\u4E13\u4E1A\u6280\u80FD",anchor:[1.45,4.37,1.47]},{id:"work-journal",room:"bedroom",section:"internship",label:"\u5E8A\u4E0A\u65E5\u8BB0\u672C \xB7 \u5B9E\u4E60\u7ECF\u5386",button:"\u5B9E\u4E60\u65E5\u8BB0",anchor:[-2.07,7.14,.2]},{id:"education-clock",room:"bedroom",section:"education",label:"\u6559\u80B2\u7ECF\u5386",button:"\u6559\u80B2\u7ECF\u5386",asset:"barrel",localBounds:[[-.14,.615,-.12],[.14,.91,.13]],anchor:[-3,7.1,-.45]},{id:"toy-chest",room:"bedroom",action:"toy",label:"\u73A9\u5177\u7BB1 \xB7 \u6253\u5F00\u79C1\u85CF\u753B\u5ECA",button:"\u73A9\u5177\u7BB1",asset:"chest",anchor:[.05,7.1,.65]},{id:"honor-trophies",room:"storage",section:"honors",label:"\u5956\u676F\u4E0E\u8BC1\u4E66 \xB7 \u4E2A\u4EBA\u8363\u8A89",button:"\u8363\u8A89\u5956\u676F",asset:"treasure",anchor:[-3.3,1.05,-.1]}]};var Bo=[{id:"national-2021",title:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D1",detail:"2020\u20142021 \u5B66\u5E74",sourceName:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D12021.jpg",sourceSHA256:"a53837456384b6d78a20a7e25bbf9c5ab42c4d29eff23be8e60001d36a9cd930",thumbnail:"./assets/house-profile/national-2021.jpg",original:"./assets/house-profile/national-2021-original.jpg",width:640,height:462,rotation:90,crop:[.045,.235,.97,.955]},{id:"national-2023",title:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D1",detail:"2022\u20142023 \u5B66\u5E74",sourceName:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D12023.jpg",sourceSHA256:"597f4b90d5cf32ea33160c3d95331d83d57cdd579ffbc3098383625bf32655bc",thumbnail:"./assets/house-profile/national-2023.jpg",original:"./assets/house-profile/national-2023-original.jpg",width:640,height:449,rotation:90,crop:[.01,.19,.99,.975]},{id:"math-2022",title:"\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B \xB7 \u4E00\u7B49\u5956",detail:"\u7B2C\u5341\u56DB\u5C4A \xB7 \u975E\u6570\u5B66\u7C7B",sourceName:"\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B.jpg",sourceSHA256:"411b2f002172a09df06e6500447ad551604086aa51fdb72d1db623e3ffacbb79",thumbnail:"./assets/house-profile/math-2022.jpg",original:"./assets/house-profile/math-2022-original.jpg",width:640,height:464,rotation:90,crop:[.01,.14,.99,.9]},{id:"holtek-2023",title:"\u5408\u6CF0\u676F \xB7 \u4E00\u7B49\u5956",detail:"2023 \u5E74\u5355\u7247\u673A\u5E94\u7528\u8BBE\u8BA1\u7ADE\u8D5B",sourceName:"\u5408\u6CF0\u676F2023.jpg",sourceSHA256:"4e755594fcec2eb7c740d82b38c9e6e05a9e03c2cd44ec3ee629de983187ccc7",thumbnail:"./assets/house-profile/holtek-2023.jpg",original:"./assets/house-profile/holtek-2023-original.jpg",width:640,height:453,rotation:90,crop:[.03,.13,.985,.89]},{id:"mathorcup-2022",title:"MathorCup \xB7 \u4E09\u7B49\u5956",detail:"2022 \u5E74 \xB7 \u672C\u79D1\u751F\u7EC4",sourceName:"mathorcup\u9AD8\u6821\u6570\u6A21\u6311\u6218\u8D5B.jpg",sourceSHA256:"f635ea9f270f143fba58d2744922f20927c7cb9b3b05bb1ab0178d13e939443b",thumbnail:"./assets/house-profile/mathorcup-2022.jpg",original:"./assets/house-profile/mathorcup-2022-original.jpg",width:640,height:432,rotation:90,crop:[.035,.16,.97,.94]},{id:"scholarship-2022",title:"\u4E00\u7B49\u5956\u5B66\u91D1",detail:"2021\u20142022 \u5B66\u5E74",sourceName:"\u4E00\u7B49\u5956\u5B66\u91D12022.jpg",sourceSHA256:"157bd5ae21962e0aa6d4af3977bb261c8899834e0f241acb74deeb0cbf2a517d",thumbnail:"./assets/house-profile/scholarship-2022.jpg",original:"./assets/house-profile/scholarship-2022-original.jpg",width:451,height:640,rotation:0,crop:[.015,.11,.98,.88]},{id:"graduate-2024",title:"\u4F18\u79C0\u6BD5\u4E1A\u751F",detail:"\u897F\u5357\u5927\u5B66 \xB7 2024 \u5E74",sourceName:"\u4F18\u79C0\u6BD5\u4E1A\u751F2024.jpg",sourceSHA256:"2831a13120b0875a395c39bb5c30dbabe3468e58c2aae0a7ae9980274f6d5262",thumbnail:"./assets/house-profile/graduate-2024.jpg",original:"./assets/house-profile/graduate-2024-original.jpg",width:473,height:640,rotation:0,crop:[.015,.14,.98,.875]},{id:"merit-2021",title:"\u4E09\u597D\u5B66\u751F",detail:"2020\u20142021 \u5B66\u5E74",sourceName:"\u6821\u4E09\u597D2021.jpg",sourceSHA256:"ee6d5d7e07ea7be0ed49d146339d6b82d8750f4acf5b0263d2f66c232edb0ade",thumbnail:"./assets/house-profile/merit-2021.jpg",original:"./assets/house-profile/merit-2021-original.jpg",width:470,height:640,rotation:90,crop:[.055,.035,.79,.995]},{id:"merit-2022",title:"\u4E09\u597D\u5B66\u751F",detail:"2021\u20142022 \u5B66\u5E74",sourceName:"\u6821\u4E09\u597D2022.jpg",sourceSHA256:"23f1564ec3411c58db1c1fb5456cd4b9475ac54731889da98cbe4dc45efeaaa6",thumbnail:"./assets/house-profile/merit-2022.jpg",original:"./assets/house-profile/merit-2022-original.jpg",width:466,height:640,rotation:0,crop:[.015,.2,.985,.95]},{id:"league-2021",title:"\u4F18\u79C0\u5171\u9752\u56E2\u5458",detail:"2020 \u5E74\u5EA6 \xB7 \u897F\u5357\u5927\u5B66",sourceName:"\u4F18\u79C0\u5171\u9752\u56E2\u54582021.jpg",sourceSHA256:"d178912952354cdf571f22d99377ca0082f7486ebb557fd9bbcde05dea4e5fb5",thumbnail:"./assets/house-profile/league-2021.jpg",original:"./assets/house-profile/league-2021-original.jpg",width:640,height:449,rotation:90,crop:[0,.145,.98,.93]},{id:"union-2021",title:"\u5B66\u751F\u4F1A\u5DE5\u4F5C\u7ECF\u5386 \xB7 \u8058\u4E66",detail:"\u9662\u5B66\u751F\u4F1A\u5BA3\u4F20\u90E8\u90E8\u957F \xB7 2020.09\u20142021.06",sourceName:"\u5B66\u751F\u4F1A2021.jpg",sourceSHA256:"78c95dc9ffa5835cf130127ecb4f2356718036266658d71f15bb358d1f14d796",thumbnail:"./assets/house-profile/union-2021.jpg",original:"./assets/house-profile/union-2021-original.jpg",width:640,height:425,rotation:90,crop:[.005,.11,.985,.94]}];function hp({title:i="\u5B9E\u4E60\u65E5\u8BB0"}={}){let e=new At;e.name="companion-open-book";let t=d=>{let f=document.createElement("canvas");f.width=512,f.height=640;let g=f.getContext?.("2d");if(!g)return null;if(g.fillStyle=d?"#fff5dc":"#285861",g.fillRect(0,0,512,640),d){g.fillStyle="#6c5844",g.textAlign="center",g.font="bold 35px serif",g.fillText(i,256,85),g.strokeStyle="#bcad8e",g.lineWidth=3;for(let p=150;p<550;p+=36)g.beginPath(),g.moveTo(60,p),g.lineTo(450-p%3*12,p),g.stroke();g.fillStyle="#ad976f",g.font="23px serif",g.fillText("\u2726",256,598)}else g.strokeStyle="#d5b86b",g.lineWidth=12,g.strokeRect(28,28,456,584),g.fillStyle="#f5d994",g.font="bold 46px serif",g.textAlign="center",g.fillText(i,256,260),g.font="80px serif",g.fillText("\u2693",256,390);let x=new fi(f);return x.colorSpace=bt,x},n=new zt({color:3434866,map:t(!1),roughness:.92}),s=new zt({color:16379340,roughness:1}),r=new zt({color:16777215,map:t(!0),roughness:1,side:an}),o=[];for(let d of[-1,1]){let f=new At;f.rotation.y=-d*.32,e.add(f),o.push(f);let g=new _t(new Rn(.307,.335,.016),n);g.position.set(d*.155,0,-.011),f.add(g);let x=new _t(new Rn(.285,.312,.025),s);x.position.set(d*.154,0,.01),f.add(x);let p=new _t(new Cn(.281,.307),r);p.position.set(d*.154,0,.024),f.add(p);for(let m=0;m<5;m++){let T=new _t(new Rn(.285,.0014,.001),new zt({color:13285781,roughness:1}));T.position.set(d*.154,-.154,.002+m*.004),f.add(T)}}let a=new _t(new so(.018,.018,.333,12),n);e.add(a);let l=new At;l.position.z=.035,e.add(l);let c=new Cn(.281,.307,14,1),u=c.attributes.position;for(let d=0;d<u.count;d++){let f=u.getX(d)+.1405;u.setXYZ(d,f,u.getY(d),.018*Math.sin(f/.281*Math.PI))}c.computeVertexNormals(),l.add(new _t(c,r)),e.traverse(d=>{d.isMesh&&(d.castShadow=!0,d.receiveShadow=!0)});let h=0;return{group:e,grip:d=>new S(d*.3,-.11,.03),update(d,f,g=1){h=et.clamp(g,0,1),o[0].rotation.y=et.lerp(-Math.PI,.32,h),o[0].position.z=.04*(1-h),o[1].rotation.y=-.32*h;let x=d%4.8;l.visible=h>.98&&!f&&x>2.4&&x<4.2;let p=et.clamp((x-2.4)/1.8,0,1),m=p*p*(3-2*p);l.rotation.y=-Math.PI*m,l.scale.x=1-.72*Math.sin(Math.PI*m)},snapshot:()=>({open:h>.98,opening:h,visible:e.visible,turning:l.visible,coverThickness:.016,pageThickness:.025,spread:.64})}}var Oi=[["pearl","\u6234\u73CD\u73E0\u8033\u73AF\u7684\u7AE0\u9C7C\u54E5"],["mona-lisa","\u7AE0\u9C7C\u54E5\u7684\u5FAE\u7B11"],["starry-portrait","\u661F\u591C\u81EA\u753B\u50CF"],["scream","\u7AE0\u9C7C\u54E5\u7684\u5450\u558A"],["cubist","\u51E0\u4F55\u8096\u50CF"]],xh=i=>`assets/house-art/${i}.png`;function _v(i){let e=document.createElement("dialog");e.className="chest-gallery",e.setAttribute("aria-labelledby","chest-gallery-title"),e.innerHTML=`<header><div><span>\u5367\u5BA4 \xB7 \u79C1\u85CF\u753B\u4F5C</span><h2 id="chest-gallery-title">\u73A9\u5177\u7BB1\u91CC\u7684\u5C0F\u753B\u5ECA</h2></div><button class="chest-gallery-close" type="button" aria-label="\u5173\u95ED\u753B\u5ECA">\xD7</button></header><figure><div class="chest-art-frame"><img alt="" width="1080" height="1350"></div><figcaption></figcaption></figure><nav aria-label="\u5207\u6362\u753B\u4F5C"><button type="button" data-art-prev aria-label="\u4E0A\u4E00\u5E45\u753B">\u2190</button><div class="chest-art-thumbs">${Oi.map(([o,a],l)=>`<button type="button" data-art-index="${l}" aria-label="\u67E5\u770B${a}" aria-pressed="false"><img src="${xh(o)}" alt="" width="40" height="50" loading="lazy"></button>`).join("")}</div><button type="button" data-art-next aria-label="\u4E0B\u4E00\u5E45\u753B">\u2192</button></nav>`,document.body.append(e);let t=0,n,s=e.querySelector("figure img");function r(o){t=(o+Oi.length)%Oi.length;let[a,l]=Oi[t];s.src=xh(a),s.alt=l,e.dataset.artIndex=String(t),e.querySelector("figcaption").textContent=`${l} \xB7 ${t+1} / ${Oi.length}`,e.querySelectorAll("[data-art-index]").forEach(c=>c.setAttribute("aria-pressed",String(Number(c.dataset.artIndex)===t)))}return e.querySelector(".chest-gallery-close").addEventListener("click",()=>e.close()),e.querySelector("[data-art-prev]").addEventListener("click",()=>r(t-1)),e.querySelector("[data-art-next]").addEventListener("click",()=>r(t+1)),e.querySelectorAll("[data-art-index]").forEach(o=>o.addEventListener("click",()=>r(Number(o.dataset.artIndex)))),e.addEventListener("keydown",o=>{(o.key==="ArrowLeft"||o.key==="ArrowRight")&&(o.preventDefault(),r(t+(o.key==="ArrowRight"?1:-1)))}),e.addEventListener("click",o=>{let a=e.getBoundingClientRect();o.target===e&&(o.clientX<a.left||o.clientX>a.right||o.clientY<a.top||o.clientY>a.bottom)&&e.close()}),e.addEventListener("close",()=>{i(),n?.focus({preventScroll:!0})}),{open(){n=document.activeElement,r(0),e.showModal()},close(){e.close()}}}function dp(i,{root:e,version:t,reducedMotion:n}){let s=new At;s.position.set(0,.325,-.245),i.add(s);let r=[];i.traverse(x=>{x.isMesh&&x.name.endsWith("__lid")&&r.push(x)});for(let x of r)s.attach(x);let o=new At;o.visible=!1,i.add(o);let a=new zt({color:12420914,metalness:.72,roughness:.32}),l=new zt({color:16045450,metalness:.6,roughness:.26}),c=!1,u=0,h=0,d=!1,f=!1;e.dataset.toyChest="closed",e.dataset.toyChestReady="loading";let g=_v(()=>{c=!1,e.dataset.toyChest="closed"});return Oi.forEach(([x],p)=>{let m=new At,T=.25,A=.3125,M=(E,_,R,L,O,N)=>{let z=new _t(new Rn(E,_,O),N);z.position.set(R,L,.008),m.add(z)};for(let[E,_,R]of[[.025,.027,a],[.006,.033,l]])M(T+E*2,E,0,A/2+E/2,_,R),M(T+E*2,E,0,-A/2-E/2,_,R),M(E,A,-T/2-E/2,0,_,R),M(E,A,T/2+E/2,0,_,R);let b=new Ni().load(`${xh(x)}?v=${t}`,()=>{h++,e.dataset.toyChestReady=d?"false":h===Oi.length?"true":"loading"},void 0,()=>{d=!0,e.dataset.toyChestReady="false"});b.colorSpace=bt;let w=new _t(new Cn(T,A),new zt({map:b,roughness:.85,side:an}));w.position.z=.026,m.add(w),m.position.set((p-2)*.082,.2+Math.abs(p-2)*.007,(2-p)*.028),m.rotation.set(-.12,0,(p-2)*-.12),o.add(m),m.traverse(E=>{E.isMesh&&(E.castShadow=!0,E.receiveShadow=!0),E.userData.roomId="bedroom",E.userData.contentId="toy-chest"})}),{toggle(){if(c){g.close();return}c=!0,e.dataset.toyChest="open",g.open()},setCompanionPlaying(x){f=!!x,e.dataset.toyChestCompanion=String(f)},touchPoint(){return i.updateWorldMatrix(!0,!1),i.localToWorld(new S(0,.32,.12))},update(x){let p=c||f?1:0;u=n?p:et.damp(u,p,6,x),Math.abs(u-p)<.001&&(u=p),s.rotation.x=-1.4*u,o.visible=u>.05,o.position.y=.06+.22*u,o.scale.setScalar(.55+.45*u)},snapshot:()=>({open:c,companionPlaying:f,amount:u,ready:h===Oi.length,lidParts:r.length,paintings:Oi.length,loaded:h})}}var as=[{id:"date",title:"\u7EA6\u4F1A \xB7 \u30C7\u30FC\u30C8",credit:"RADWIMPS \u4F5C\u66F2 \xB7 \u620F\u8BF4\u94A2\u7434\u6F14\u594F",recording:"\u300A\u4F60\u7684\u540D\u5B57\u300B\u94A2\u7434\u7248",url:"https://music.163.com/song/media/outer/url?id=1951778950.mp3",page:"https://music.163.com/#/song?id=1951778950"},{id:"lawrence",title:"\u5723\u8BDE\u5FEB\u4E50\uFF0C\u52B3\u4F26\u65AF\u5148\u751F",credit:"\u5742\u672C\u9F99\u4E00 \xB7 \u94A2\u7434\u73B0\u573A\u7248",recording:"Playing the Piano 2009 Japan",url:"https://music.163.com/song/media/outer/url?id=22650506.mp3",page:"https://music.163.com/#/song?id=22650506"},{id:"summer",title:"\u83CA\u6B21\u90CE\u7684\u590F\u5929 \xB7 Summer",credit:"\u4E45\u77F3\u8BA9 \xB7 \u73B0\u573A\u6F14\u594F\u7248",recording:"Best Live 2003",url:"https://music.163.com/song/media/outer/url?id=29405958.mp3",page:"https://music.163.com/#/song?id=29405958"}];var ln=document.createElement("section");ln.className="house-music";ln.hidden=!0;ln.setAttribute("aria-label","\u4E2A\u4EBA\u7F51\u9875\u80CC\u666F\u97F3\u4E50");ln.innerHTML=`<header><h2>\u266B \u6211\u7684\u97F3\u4E50</h2><button type="button" data-music-close aria-label="\u5173\u95ED\u97F3\u4E50\u5E76\u6682\u505C\u64AD\u653E"></button></header>
  <div class="music-tracks" aria-label="\u9009\u62E9\u97F3\u4E50"></div>
  <p class="music-status" role="status" aria-live="polite"></p>
  <div class="music-controls"><button type="button" data-music-play>\u64AD\u653E</button><button type="button" data-music-next>\u4E0B\u4E00\u9996 \u2192</button></div>
  <label class="music-position"><span data-music-time>0:00 / 0:00</span><input type="range" data-music-seek min="0" max="100" value="0" step="0.1" aria-label="\u64AD\u653E\u8FDB\u5EA6" disabled></label>
  <label class="music-volume">\u97F3\u91CF <input type="range" min="0" max="1" step="0.05" value="0.4" aria-label="\u97F3\u4E50\u97F3\u91CF"></label>
  <button type="button" data-music-retry hidden>\u91CD\u8BD5</button>`;document.body.append(ln);var Ut=new Audio;Ut.preload="none";Ut.volume=.4;Ut.dataset.houseAudio="";document.body.append(Ut);var $l=ln.querySelector(".music-status"),Jl=ln.querySelector("[data-music-play]"),Ql=ln.querySelector("[data-music-seek]"),ec=ln.querySelector("[data-music-retry]"),Bi=0,yh=null,Ir=0,yv=as.map((i,e)=>{let t=document.createElement("button");return t.type="button",t.innerHTML=`<strong>${i.title}</strong><small>${i.credit}</small>`,t.dataset.musicTrack=i.id,t.addEventListener("click",()=>Ho(e,!0)),ln.querySelector(".music-tracks").append(t),t}),fp=i=>Number.isFinite(i)?`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`:"0:00";function tc(){Jl.textContent=Ut.paused?"\u64AD\u653E":"\u6682\u505C",Jl.setAttribute("aria-label",`${Ut.paused?"\u64AD\u653E":"\u6682\u505C"}${as[Bi].title}`);let i=Number.isFinite(Ut.duration)&&Ut.duration>0;Ql.disabled=!i,Ql.value=i?Ut.currentTime/Ut.duration*100:0,ln.querySelector("[data-music-time]").textContent=`${fp(Ut.currentTime)} / ${fp(Ut.duration)}`,ln.dataset.musicState=Ut.error?"error":Ut.paused?"paused":"playing"}function pp(){$l.textContent="\u8FD9\u9996\u66F2\u5B50\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\uFF0C\u8BF7\u91CD\u8BD5\u3002",ec.hidden=!1,tc()}async function vh(){let i=++Ir;ec.hidden=!0,$l.textContent="\u6B63\u5728\u8F7D\u5165\u97F3\u4E50\u2026";try{await Ut.play(),i===Ir&&($l.textContent=as[Bi].recording,tc())}catch(e){if(i!==Ir||e.name==="AbortError")return;pp()}}function Ho(i,e=!1){++Ir,Ut.pause(),Bi=(i+as.length)%as.length,Ut.src=as[Bi].url,yv.forEach((t,n)=>t.setAttribute("aria-pressed",String(n===Bi))),$l.textContent=as[Bi].recording,ec.hidden=!0,tc(),e&&vh()}function mp(){++Ir,Ut.pause(),ln.hidden=!0,yh?.getClientRects().length?yh.focus({preventScroll:!0}):document.querySelector("[data-house-back]")?.focus({preventScroll:!0})}window.addEventListener("house:music",()=>{yh=document.activeElement,ln.hidden=!1,Jl.focus({preventScroll:!0})});ln.querySelector("[data-music-close]").addEventListener("click",mp);Jl.addEventListener("click",()=>{Ut.paused?vh():(++Ir,Ut.pause())});ln.querySelector("[data-music-next]").addEventListener("click",()=>Ho(Bi+1,!0));ec.addEventListener("click",()=>{Ho(Bi),vh()});Ql.addEventListener("input",()=>{Number.isFinite(Ut.duration)&&(Ut.currentTime=Number(Ql.value)/100*Ut.duration)});ln.querySelector(".music-volume input").addEventListener("input",i=>Ut.volume=Number(i.target.value));Ut.addEventListener("error",pp);Ut.addEventListener("ended",()=>Ho(Bi+1,!0));for(let i of["timeupdate","durationchange","play","pause"])Ut.addEventListener(i,tc);window.addEventListener("keydown",i=>{i.key==="Escape"&&!ln.hidden&&!document.querySelector("dialog[open]")&&(i.preventDefault(),i.stopImmediatePropagation(),mp())},!0);Ho(0);var Mh=[{from:"living",to:"storage",kind:"door",anchor:[-2.45,.95,.25]},{from:"storage",to:"living",kind:"door",anchor:[-2.65,.95,.25]},{from:"living",to:"bathroom",kind:"up",anchor:[2.8,1.2,-1.35],meshes:["stairs_"],bounds:[[-1.1,0,-3.6],[0,1.9,-1.4]]},{from:"bathroom",to:"living",kind:"down",anchor:[-.4,3.95,-1.4],bounds:[[-.9,3,-3.7],[.1,4.9,-1.5]]},{from:"bathroom",to:"library",kind:"door",anchor:[.15,3.95,.5]},{from:"library",to:"bathroom",kind:"door",anchor:[.45,3.95,.5]},{from:"library",to:"bedroom",kind:"up",anchor:[1.3,6.85,-.6]},{from:"bedroom",to:"library",kind:"door",anchor:[1,6.9,-.6]},{from:"bedroom",to:"roof",kind:"up",anchor:[.3,7.4,-1.4],meshes:["stairs_"],bounds:[[-.3,6,-2.8],[.85,7.9,-1.1]]},{from:"roof",to:"bedroom",kind:"down",anchor:[1.8,9.35,-.6],meshes:["roof_landing","roof_access_","stairs_"]}];function gp({root:i,camera:e,rooms:t,getRoom:n,focusRoom:s}){let r=document.createElement("nav");r.className="house-connections",r.setAttribute("aria-label","\u901A\u5F80\u76F8\u90BB\u623F\u95F4"),r.hidden=!0,i.append(r);let o={door:"\u7A7F\u95E8",up:"\u4E0A\u697C",down:"\u4E0B\u697C"},a=Mh.map(l=>{let c=document.createElement("button");return c.type="button",c.className="room-label passage-label",c.textContent=`${o[l.kind]} \u2192 ${t.get(l.to).name}`,c.dataset.housePassage=`${l.from}-${l.to}`,c.setAttribute("aria-label",`${o[l.kind]}\uFF0C\u4ECE${t.get(l.from).name}\u524D\u5F80${t.get(l.to).name}`),c.addEventListener("click",()=>{n()===l.from&&i.dataset.houseState==="ready"&&s(l.to)&&i.querySelector("[data-house-back]").focus({preventScroll:!0})}),r.append(c),{link:l,button:c}});return{update(){let l=n(),c=i.dataset.houseState==="ready";r.hidden=!l||!c;let u=[...i.querySelectorAll("[data-house-object]:not([hidden])")].map(h=>{let d=h.getBoundingClientRect();return{x:d.x+d.width/2,y:d.y+d.height/2,half:d.width/2+12}});for(let{link:h,button:d}of a){if(d.hidden=!c||h.from!==l,d.disabled=i.dataset.cameraTransition==="moving",d.hidden)continue;let f=new S(...h.anchor).project(e),g=i.clientWidth,x=i.clientHeight,p=d.offsetWidth/2+12,m=et.clamp((f.x*.5+.5)*g,p,g-p),T=et.clamp((-f.y*.5+.5)*x,210,x-70);f.z>1&&(m=g-p,T=x-90);for(let A of u)Math.abs(m-A.x)<p+A.half&&Math.abs(T-A.y)<46&&(T=A.y+48);T>x-70&&(T=x-70-u.length*48),u.push({x:m,y:T,half:p}),d.style.left=`${m}px`,d.style.top=`${T}px`}},pick:(l,c)=>Mh.find(u=>u.from===n()&&(u.meshes?.some(h=>l.name.startsWith(h))||u.bounds&&l.userData.roomId===u.from&&c.toArray().every((h,d)=>h>=u.bounds[0][d]&&h<=u.bounds[1][d]))),label:l=>`${o[l.kind]} \u2192 ${t.get(l.to).name}`}}var Tt=document.querySelector(".house"),sn=document.querySelector("[data-house-canvas]"),bh=document.querySelector("[data-house-loading]"),ic=document.querySelector("[data-house-error]"),Mv=document.querySelector("[data-house-progress]"),_p=document.querySelector("[data-house-caption]"),Sh=document.querySelector("[data-house-labels]"),xp=document.querySelector("[data-house-objects]"),Hi=document.querySelector("[data-house-tooltip]"),Pr=new Map(yn.rooms.map(i=>[i.id,i])),Mp=new Map(yn.interactions.map(i=>[i.id,i]));function yp(i){let e=Mp.get(i);if(e){if(e.action==="toy"){window.dispatchEvent(new CustomEvent("house:toy-chest"));return}window.dispatchEvent(new CustomEvent(e.action==="music"?"house:music":"house:content",{detail:{id:i,section:e.section}}))}}var nc=matchMedia("(prefers-reduced-motion: reduce)").matches,ko=new URLSearchParams(location.search).has("structure"),Sp=new URLSearchParams(location.search).has("privacy");Sp&&document.body.classList.add("privacy-preview");var bp=[yn.structure,...ko?[]:yn.assets],Ep=ko?[]:Bo.map(i=>({id:`award-${i.id}`,name:i.title,url:i.thumbnail,kind:"texture",award:i})),vp=bp.length+Ep.length,zo=new Set,ls=new Map,kn=new Map,un;function Eh(i){Tt.dataset.houseState="error",bh.hidden=!0,ic.hidden=!1,ic.querySelector("h2").textContent=kn.size?"\u90E8\u5206\u8D44\u6E90\u672A\u80FD\u8F7D\u5165":"\u65E0\u6CD5\u663E\u793A\u4E09\u7EF4\u623F\u5C4B",document.querySelector("[data-house-error-message]").textContent=i;let e=document.querySelector("[data-house-error-list]");e.replaceChildren();for(let[t,n]of kn){let s=document.createElement("li");s.textContent=`${n.name}\uFF1A${n.url}`,s.dataset.assetId=t,e.append(s)}}try{un=new Wl({canvas:sn,antialias:!0,alpha:!0})}catch{Eh("\u6D4F\u89C8\u5668\u672A\u80FD\u542F\u7528 WebGL\u3002\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u7684\u786C\u4EF6\u52A0\u901F\u8BBE\u7F6E\u540E\u91CD\u8BD5\u3002"),document.querySelector("[data-house-retry]").addEventListener("click",()=>location.reload())}if(un){let D=function(W,I,P,F,K,te,ge){let Ue=new At;Ue.name=W,Object.assign(Ue.userData,ge),Ue.position.fromArray(K),Ue.quaternion.setFromUnitVectors(new S(0,0,1),te.clone().normalize());let X=ge.book,ee=new _t(new Rn(I+.045,P+.045,.045),new zt({color:X?15984585:9597254,roughness:.88}));ee.receiveShadow=!0,Ue.add(ee);let me=new _t(new Cn(X?I+.055:I,X?P+.055:P),F);if(me.position.z=.024,Ue.add(me),X){let fe=me.clone();fe.position.z=-.024,fe.rotation.y=Math.PI,Ue.add(fe);let de=ee.clone();de.scale.set(.06,1.02,1.16),de.position.x=-I/2,de.material=new zt({color:4287609,roughness:.95}),Ue.add(de);for(let Ve=0;Ve<3;Ve++){let Oe=[new S(-I/2,-P/2-.023,-.013+Ve*.011),new S(I/2+.022,-P/2-.023,-.013+Ve*.011)];Ue.add(new di(new Bt().setFromPoints(Oe),new ti({color:13351836})))}}return c.add(Ue),Ue},G=function(W){return new Promise(I=>{if(Sp){let P=document.createElement("canvas");P.width=512,P.height=360;let F=P.getContext("2d");F.fillStyle="#f8f0d9",F.fillRect(0,0,512,360),F.strokeStyle="#ad894c",F.lineWidth=12,F.strokeRect(18,18,476,324),F.fillStyle="#53665d",F.textAlign="center",F.font="bold 48px sans-serif",F.fillText("\u8363\u8A89\u8BC1\u4E66",256,162),F.font="28px sans-serif",F.fillText("\u4E2A\u4EBA\u4FE1\u606F\u5DF2\u9690\u85CF",256,226);let K=new fi(P);K.colorSpace=bt;let te=u.get(W.award.id);te.map=K,te.needsUpdate=!0,zo.add(W.id),ye(),I(!0);return}new Ni().load(W.url,P=>{P.colorSpace=bt,P.anisotropy=Math.min(4,un.capabilities.getMaxAnisotropy());let F=u.get(W.award.id);F.map=P,F.needsUpdate=!0,zo.add(W.id),kn.delete(W.id),ye(),I(!0)},void 0,()=>{kn.set(W.id,W),ye(),I(!1)})})},Z=function(){let P=et.degToRad(s.fov),F=Math.max(15.8/(2*Math.tan(P/2)),11.8/(2*Math.tan(P/2)*s.aspect))*1.07;return{target:new S(0,5.8,0),position:new S(F*.055,5.8+F*.105,F)}},V=function(W,I){Tt.dataset.cameraTransition="moving",r.enabled=!1,m={start:performance.now(),fromPosition:s.position.clone(),fromTarget:r.target.clone(),position:W,target:I,duration:nc?0:650}},oe=function(){c.children.forEach(W=>{W.visible=!p||W.userData.roomId===p}),xp.hidden=!p;for(let W of ls.values())W.traverse(I=>{let P=I.userData;if(!I.isMesh)return;let F=W.userData.assetId==="structure",K=F&&P.roomId==="living"&&(P.occluder||I.name==="living_L0_sand");if(K&&(Array.isArray(I.material)?I.material:[I.material]).forEach(Ue=>{Ue.clippingPlanes=t[p]??null}),!p){I.visible=!P.roomViewOnly;return}let te=P.roomId===p;F?p==="storage"&&K?te=!0:P.roomId==="stairs"&&(te=p==="roof"?P.level===3||P.roofAccess===!0:p==="library"?P.level===1||P.level===2:P.level===Pr.get(p).level):te=W.userData.roomId===p,F&&I.name==="roof_L3_leaf"&&(te=!1),I.visible=P.roomViewOnly?P.roomViewOnly===p:te});if(p==="roof"){let W=[];ls.get("structure")?.traverse(I=>{I.isMesh&&I.userData.roomId==="stairs"&&I.userData.level>=2&&W.push({name:I.name,level:I.userData.level,roofAccess:!!I.userData.roofAccess,visible:I.visible})}),Tt.dataset.roofMeshes=JSON.stringify(W)}},$=function(W){let I=Pr.get(W);if(!I||!M||b)return!1;let P=p!==W;p=W,Tt.dataset.houseView="room",_p.hidden=!1,Sh.hidden=!0,Hi.hidden=!0,document.querySelector("[data-house-floor]").textContent=I.floor,document.querySelector("[data-house-room-name]").textContent=I.name,oe();let F=new S(...I.target),K=new S(...I.camera),te=I.bounds[1][0]-I.bounds[0][0],ge=I.bounds[1][1]-I.bounds[0][1],Ue=Math.tan(et.degToRad(s.fov/2)),X=Math.max(te/(2*Ue*s.aspect),ge/(2*Ue))*1.08,ee=K.clone().sub(F);return ee.multiplyScalar(Math.max(1,X/ee.length())),K.copy(F).add(ee),V(K,F),P&&window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:W}})),!0},se=function(){p=null,Tt.dataset.houseView="whole",_p.hidden=!0,Sh.hidden=!1,Hi.hidden=!0,oe();let W=Z();V(W.position,W.target),window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:null}}))},re=function(W,I){let P=sn.getBoundingClientRect();f.set((W-P.left)/P.width*2-1,-(I-P.top)/P.height*2+1),d.setFromCamera(f,s);let F=[];l.traverse(te=>{if(!te.isMesh)return;let ge=te;for(;ge;){if(!ge.visible)return;ge=ge.parent}F.push(te)});let K=d.intersectObjects(F,!1);for(let te of K){if((Array.isArray(te.object.material)?te.object.material[te.face.materialIndex]:te.object.material).clippingPlanes?.some(me=>me.distanceToPoint(te.point)<0))continue;let Ue=w.pick(te.object,te.point);if(Ue)return{passage:Ue,roomId:p};let X=te.object;for(;X&&!X.userData.roomId&&!X.userData.awardId&&!X.userData.contentId;)X=X.parent;if(X?.userData.companionId)return{companionId:X.userData.companionId,roomId:X.userData.roomId};if(X?.userData.petId)return{petId:X.userData.petId,roomId:X.userData.roomId};if(X?.userData.contentId&&(!X.userData.contentBounds||X.userData.contentBounds.containsPoint(X.worldToLocal(te.point.clone()))))return{contentId:X.userData.contentId,roomId:X.userData.roomId};if(X?.userData.awardId)return{awardId:X.userData.awardId,roomId:"storage"};let ee=X?.userData.roomId;if(Pr.has(ee))return{roomId:ee}}return null},ye=function(){if(Tt.dataset.loadedModels=String(ls.size),Tt.dataset.loadedTextures=String(zo.size),Tt.dataset.failedModels=String([...kn.values()].filter(W=>W.kind!=="texture").length),Tt.dataset.failedTextures=String([...kn.values()].filter(W=>W.kind==="texture").length),Tt.dataset.failedResources=String(kn.size),Mv.value=(ls.size+zo.size)/vp*100,kn.size)M=!1,Eh("\u5C65\u5386\u53EF\u4EE5\u7EE7\u7EED\u9605\u8BFB\u3002\u8BF7\u91CD\u8BD5\u4EE5\u4E0B\u8D44\u6E90\uFF0C\u5168\u90E8\u8F7D\u5165\u540E\u5373\u53EF\u8FDB\u5165\u623F\u95F4\u3002");else if(ls.size+zo.size===vp){let W=!M;M=!0,Tt.dataset.houseState="ready",bh.hidden=!0,ic.hidden=!0,W&&window.dispatchEvent(new CustomEvent("house:ready"))}},Me=function(W){return new Promise(I=>{h.load(`${W.url}?v=${yn.version}`,P=>{let F=P.scene;F.userData.assetId=W.id,W.room&&(F.userData.roomId=W.room,F.position.fromArray(W.position),F.rotation.y=W.rotation),F.traverse(K=>{if(!K.isMesh)return;let te=K.parent;for(;te&&te!==F.parent;){for(let X of["roomId","level","occluder","roomViewOnly","roofAccess"])K.userData[X]===void 0&&te.userData[X]!==void 0&&(K.userData[X]=te.userData[X]);if(te===F)break;te=te.parent}K.castShadow=!0,K.receiveShadow=!0,W.room&&(K.userData.roomId=W.room),W.id==="structure"&&K.userData.roomId==="living"&&(K.userData.occluder||K.name==="living_L0_sand")&&(K.material=Array.isArray(K.material)?K.material.map(X=>X.clone()):K.material.clone(),(Array.isArray(K.material)?K.material:[K.material]).forEach(X=>{X.clipShadows=!0}));let ge=yn.interactions.find(X=>X.asset===W.id);ge&&(K.userData.contentId=ge.id,ge.localBounds&&(K.userData.contentBounds=new Qt(new S(...ge.localBounds[0]),new S(...ge.localBounds[1])))),(Array.isArray(K.material)?K.material:[K.material]).forEach(X=>{X.roughness=Math.max(X.roughness??.8,.7),X.metalness=Math.min(X.metalness??0,.08),X.name==="window_glass"&&(X.emissive=new nt(2908020),X.emissiveIntensity=.16)})}),l.add(F),W.id==="chest"&&(O=dp(F,{root:Tt,version:yn.version,reducedMotion:nc})),W.pet&&(W.pet.fur&&np(F,{bodyScale:W.pet.bodyScale??1,limbRatio:W.pet.limbRatio??1,layers:i<600?6:8,strands:i<600?18e3:24e3}),L=ep(F,W,{root:Tt,canvas:sn,camera:s,reducedMotion:nc})),ls.set(W.id,F),kn.delete(W.id),oe(),ye(),I(!0)},void 0,()=>{kn.set(W.id,W),ye(),I(!1)})})},ke=function(W){if(requestAnimationFrame(ke),b)return;if(m){let F=m.duration?Math.min((W-m.start)/m.duration,1):1,K=F*F*(3-2*F);s.position.lerpVectors(m.fromPosition,m.position,K),r.target.lerpVectors(m.fromTarget,m.target,K),F===1&&(m=null,r.enabled=!0,Tt.dataset.cameraTransition="idle",window.dispatchEvent(new CustomEvent("house:camera-settled",{detail:{id:p}})))}r.update(),s.updateMatrixWorld();let I=N===null?0:Math.min((W-N)/1e3,1),P=N===null?0:Math.min((W-N)/1e3,.06);if(N=W,O?.update(P),L?.update(P,M&&!document.hidden&&(!p||p==="living")&&!document.querySelector("dialog[open]")),z?.update(I,M),!p)for(let F of yn.rooms){let K=new S(...F.label).project(s),te=g.get(F.id);te.hidden=K.z>1||Math.abs(K.x)>1||Math.abs(K.y)>1,te.style.left=`${(K.x*.5+.5)*i}px`,te.style.top=`${(-K.y*.5+.5)*e}px`}for(let F of yn.interactions){let K=x.get(F.id),te=new S(...F.anchor).project(s);K.hidden=!M||p!==F.room||te.z>1||Math.abs(te.x)>1||Math.abs(te.y)>1,K.style.left=`${(te.x*.5+.5)*i}px`,K.style.top=`${(-te.y*.5+.5)*e}px`}w.update(),un.render(n,s),E++,W-_>2e3&&(R=E*1e3/(W-_),sn.dataset.fps=R.toFixed(1),sn.dataset.triangles=String(un.info.render.triangles),sn.dataset.drawCalls=String(un.info.render.calls),E=0,_=W)},i=Math.max(1,Tt.clientWidth),e=Math.max(1,Tt.clientHeight);un.setPixelRatio(Math.min(devicePixelRatio,1.6)),un.setSize(i,e,!1),un.outputColorSpace=bt,un.toneMapping=To,un.toneMappingExposure=1.14,un.shadowMap.enabled=!0,un.shadowMap.type=As,un.localClippingEnabled=!0;let t={living:[new fn(new S(1,0,0),2.55)],storage:[new fn(new S(-1,0,0),-2.55)]},n=new jr,s=new jt(34,i/e,.1,120),r=new jl(s,sn);r.enableDamping=!0,r.dampingFactor=.08,r.enablePan=!1,r.minDistance=3.5,r.maxDistance=60,r.minPolarAngle=Math.PI*.26,r.maxPolarAngle=Math.PI*.56,r.minAzimuthAngle=-Math.PI*.3,r.maxAzimuthAngle=Math.PI*.3,n.add(new xo(16315871,7771041,2.15));let o=new es(16773842,2.6);o.position.set(-8,17,13),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:15,bottom:-6,near:1,far:42}),o.shadow.bias=-5e-4,o.shadow.normalBias=.025,o.target.position.set(0,5,0),n.add(o,o.target);let a=new es(13757951,.8);a.position.set(7,8,8),n.add(a);let l=new At;n.add(l);let c=new At;l.add(c);let u=new Map,h=new Cr,d=new ws,f=new be,g=new Map,x=new Map,p=null,m=null,T=null,A=!1,M=!1,b=!1,w=gp({root:Tt,camera:s,rooms:Pr,getRoom:()=>p,focusRoom:$}),E=0,_=performance.now(),R=0,L=null,O=null;window.addEventListener("house:toy-chest",()=>O?.toggle());let N=null,z=Tt.hasAttribute("data-house-companion-preview")?up({root:Tt,canvas:sn,camera:s,houseGroup:l,focusRoom:$,getRoom:()=>p,getAsset:W=>ls.get(W),getPet:()=>L,getDisplay:W=>c.children.find(I=>I.userData.contentId===W),getToyChest:()=>O,reducedMotion:nc}):null;if(!ko){Bo.forEach((W,I)=>{let P=new zt({color:16777215,roughness:.96});u.set(W.id,P);let F=yn.displays.find(K=>K.kind==="award"&&K.id===W.id);D(`certificate-${W.id}`,...F.size,P,F.position,new S(...F.normal),{roomId:F.room,awardId:W.id})});for(let W of yn.displays.filter(I=>I.kind==="content")){if(W.id==="work-journal"&&z){let P=hp(),F=P.group;F.name="content-work-journal",Object.assign(F.userData,{roomId:W.room,contentId:W.id,diary:P}),F.position.fromArray(W.position),F.scale.setScalar(.62),F.position.x=-2.32,F.position.z-=.155*.62,F.quaternion.setFromUnitVectors(new S(0,0,1),new S(...W.normal)),F.rotateZ(-Math.PI/2),P.update(0,!0,0),c.add(F);continue}if(W.id==="skills-book"){c.add($f(W));continue}let I;if(W.sourceAward)I=u.get(W.sourceAward);else{let P=document.createElement("canvas");P.width=768,P.height=512;let F=P.getContext("2d"),K=W.id==="skills-chart";if(F.fillStyle=K?"#e5efe1":"#447a81",F.fillRect(0,0,768,512),F.strokeStyle=K?"#bca172":"#d4b86b",F.lineWidth=14,F.strokeRect(22,22,724,468),F.fillStyle=K?"#335d62":"#fff0be",F.textAlign="center",F.font="bold 68px sans-serif",F.fillText(K?"\u6280\u672F\u822A\u6D77\u56FE":"\u5B9E\u4E60\u65E5\u8BB0",384,126),K){for(let[ge,Ue]of["AI / Agent","\u5168\u6808\u5F00\u53D1","\u5DE5\u7A0B\u4EA4\u4ED8"].entries()){let X=154+ge*230;F.strokeStyle="#6e9990",F.lineWidth=5,F.beginPath(),F.arc(X,284,66,0,Math.PI*2),F.stroke(),F.font="25px sans-serif",F.fillText(Ue,X,294),ge<2&&(F.font="35px sans-serif",F.fillText("\u2192",X+114,294))}F.font="27px sans-serif",F.fillText("\u628A\u6280\u672F\u5E26\u8FDB\u771F\u5B9E\u4E1A\u52A1",384,416)}else F.font="40px sans-serif",F.fillText("\u5B57\u8282\u8DF3\u52A8",384,244),F.font="30px sans-serif",F.fillText("AI \u76F4\u64AD \xB7 Agent \u5DE5\u7A0B",384,330),F.font="26px sans-serif",F.fillText("2026.06 \u2014 2026.09",384,413);let te=new fi(P);te.colorSpace=bt,I=new zt({map:te,roughness:.96})}D(`content-${W.id}`,...W.size,I,W.position,new S(...W.normal),{roomId:W.room,contentId:W.id,book:W.style==="book"})}Tt.dataset.awardDisplays=String(Bo.length),Tt.dataset.projectDisplays="0"}for(let[W,I,P,F]of[[-9,8,1.5,9225166],[8,11,2,10012620],[-7,1,1,10734800],[8,3,1.2,10208206]]){let K=[];for(let te=0;te<=160;te++){let ge=te*Math.PI*2/160,Ue=P*(.73+.27*Math.cos(ge*5));K.push(new S(W+Math.cos(ge)*Ue,I+Math.sin(ge)*Ue,-6))}n.add(new di(new Bt().setFromPoints(K),new ti({color:F,transparent:!0,opacity:.38})))}for(let W of yn.rooms){let I=document.createElement("button");I.type="button",I.className="room-label",I.textContent=W.name,I.dataset.houseRoom=W.id,I.setAttribute("aria-label",`${W.floor} ${W.name}\uFF0C\u8FDB\u5165\u8FD1\u666F`),I.addEventListener("click",()=>{$(W.id)&&document.querySelector("[data-house-back]").focus({preventScroll:!0})}),Sh.append(I),g.set(W.id,I)}for(let W of yn.interactions){let I=document.createElement("button");I.type="button",I.className="room-label object-label",I.textContent=W.button,I.dataset.houseObject=W.id,I.setAttribute("aria-label",`\u70B9\u51FB${W.label}`),I.addEventListener("click",()=>{M&&p===W.room&&yp(W.id)}),xp.append(I),x.set(W.id,I)}document.querySelector("[data-house-back]").addEventListener("click",()=>{let W=p;se(),g.get(W)?.focus({preventScroll:!0})}),window.addEventListener("keydown",W=>{if(W.key==="Escape"&&!W.defaultPrevented&&!document.querySelector("dialog[open]")&&p){let I=p;se(),g.get(I)?.focus({preventScroll:!0})}}),r.addEventListener("start",()=>{m=null,Tt.dataset.cameraTransition="idle",A=!0,Hi.hidden=!0}),r.addEventListener("end",()=>{A=!1}),r.addEventListener("change",()=>{sn.dataset.camera=JSON.stringify(s.position.toArray().map(W=>Number(W.toFixed(3)))),sn.dataset.target=JSON.stringify(r.target.toArray().map(W=>Number(W.toFixed(3))))}),sn.addEventListener("pointerdown",W=>{if(!W.isPrimary){T=null;return}T={x:W.clientX,y:W.clientY,time:performance.now(),id:W.pointerId}}),sn.addEventListener("pointercancel",()=>{T=null}),sn.addEventListener("pointerup",W=>{let I=T;if(T=null,!I||I.id!==W.pointerId||Math.hypot(W.clientX-I.x,W.clientY-I.y)>7||performance.now()-I.time>650||!M)return;let P=re(W.clientX,W.clientY);if(!p){P&&($(P.roomId),P.companionId&&z?.react(),P.petId&&L?.react());return}!P||P.roomId!==p||(P.passage?Tt.dataset.cameraTransition!=="moving"&&$(P.passage.to):P.companionId?z?.react():P.petId?(L?.react(),window.dispatchEvent(new CustomEvent("house:pet-greet"))):P.contentId?yp(P.contentId):P?.awardId&&window.dispatchEvent(new CustomEvent("house:award",{detail:{id:P.awardId}})))}),sn.addEventListener("pointermove",W=>{if(W.pointerType!=="mouse"||A||!M){Hi.hidden=!0;return}let I=re(W.clientX,W.clientY),P=I&&(!p||I.roomId===p&&(I.passage||I.companionId||I.petId||I.awardId||I.contentId));if(sn.style.cursor=P?"pointer":"grab",Hi.hidden=!P,P){Hi.textContent=I.passage?w.label(I.passage):I.companionId?"\u6D77\u7EF5\u5B9D\u5B9D \xB7 \u70B9\u51FB\u804A\u804A\u5929":p?I.petId?"\u66B9\u7F57\u732B \xB7 \u6253\u4E2A\u62DB\u547C":I.contentId?Mp.get(I.contentId).label:Bo.find(K=>K.id===I.awardId)?.title??"":Pr.get(I.roomId).name;let F=sn.getBoundingClientRect();Hi.style.left=`${Math.min(W.clientX-F.left+14,i-120)}px`,Hi.style.top=`${Math.min(W.clientY-F.top+14,e-40)}px`}}),sn.addEventListener("pointerleave",()=>{Hi.hidden=!0}),document.querySelector("[data-house-retry]").addEventListener("click",async()=>{if(b){location.reload();return}ic.hidden=!0,bh.hidden=!1,Tt.dataset.houseState="loading";let W=[...kn.values()];kn.clear(),await Promise.all(W.map(I=>I.kind==="texture"?G(I):Me(I))),ye()}),sn.addEventListener("webglcontextlost",W=>{W.preventDefault(),b=!0,M=!1,Eh("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u9884\u89C8\u3002")}),new ResizeObserver(()=>{if(i=Math.max(1,Tt.clientWidth),e=Math.max(1,Tt.clientHeight),s.aspect=i/e,s.updateProjectionMatrix(),un.setPixelRatio(Math.min(devicePixelRatio,1.6)),un.setSize(i,e,!1),p)M&&$(p);else{let W=Z();V(W.position,W.target)}}).observe(Tt);let We=Z();s.position.copy(We.position),r.target.copy(We.target),r.update(),Tt.dataset.houseView="whole",Tt.dataset.cameraTransition="idle",ko&&(document.querySelector(".review-note").textContent="\u7ED3\u6784\u5BA1\u67E5 \xB7 \u5BB6\u5177\u5C1A\u672A\u8F7D\u5165"),requestAnimationFrame(ke),window.__pineappleHouse={focusRoom:$,resetView:se,scene:n,camera:s,controls:r,config:yn,companion:z,toyChest:()=>O?.snapshot(),snapshot:()=>({state:Tt.dataset.houseState,view:p??"whole",loaded:[...ls.keys()],failed:[...kn.keys()],fps:Number(R.toFixed(1)),renderer:un.info.render,camera:s.position.toArray(),target:r.target.toArray(),pet:L?.snapshot()??null,toyChest:O?.snapshot()??null,status:"review",structureOnly:ko}),projectRoom:W=>{let I=Pr.get(W);if(!I)return null;let P=new S(...I.label).project(s),F=sn.getBoundingClientRect();return{x:F.left+(P.x*.5+.5)*i,y:F.top+(-.5*P.y+.5)*e}}},Promise.all([...bp.map(Me),...Ep.map(G)]).then(ye)}})();
