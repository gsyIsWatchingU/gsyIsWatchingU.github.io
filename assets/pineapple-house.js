(()=>{/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var ls={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Pd=0,eu=1,Id=2;var Us=1,Ld=2,Ar=3,Qn=0,An=1,Vt=2,Si=0,Rr=1,tu=2,nu=3,iu=4,Dd=5;var Fs=100,Nd=101,Ud=102,Fd=103,Od=104,Bd=200,Hd=201,kd=202,Vd=203,su=204,ru=205,zd=206,Gd=207,Wd=208,Xd=209,qd=210,Yd=211,Zd=212,Kd=213,jd=214,Ta=0,wa=1,Aa=2,or=3,Ra=4,Ca=5,Pa=6,Ia=7,ou=0,$d=1,Jd=2,ci=0,au=1,lu=2,cu=3,Io=4,uu=5,hu=6,du=7,kc="attached",Qd="detached",fu=300,us=301,Os=302,il=303,sl=304,Lo=306,gi=1e3,jn=1001,ar=1002,Jt=1003,rl=1004;var Bs=1005;var Qt=1006,Cr=1007;var ui=1008;var Bn=1009,pu=1010,mu=1011,Pr=1012,ol=1013,hi=1014,Xn=1015,di=1016,al=1017,ll=1018,Ir=1020,gu=35902,_u=35899,xu=1021,yu=1022,qn=1023,_i=1026,hs=1027,cl=1028,ul=1029,ds=1030,hl=1031;var dl=1033,Do=33776,No=33777,Uo=33778,Fo=33779,fl=35840,pl=35841,ml=35842,gl=35843,_l=36196,xl=37492,yl=37496,vl=37488,Ml=37489,Oo=37490,bl=37491,Sl=37808,El=37809,Tl=37810,wl=37811,Al=37812,Rl=37813,Cl=37814,Pl=37815,Il=37816,Ll=37817,Dl=37818,Nl=37819,Ul=37820,Fl=37821,Ol=36492,Bl=36494,Hl=36495,kl=36283,Vl=36284,Bo=36285,zl=36286,ef=2200,tf=2201,nf=2202,Ss=2300,Es=2301,ba=2302,Vc=2303,vs=2400,Ms=2401,no=2402,Gl=2500,sf=2501,vu=0,Ho=1,Lr=2,rf=3200;var Wl=0,of=1,Wi="",Et="srgb",wn="srgb-linear",io="linear",Ct="srgb";var Sa=7680;var af=519,lf=512,cf=513,uf=514,Xl=515,hf=516,df=517,ql=518,ff=519,Mu=35044;var bu="300 es",ri=2e3,lr=2001;function jp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function $p(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pf(){let i=cr("canvas");return i.style.display="block",i}var Hh={},ur=null;function so(...i){let e="THREE."+i.shift();ur?ur("log",e,...i):console.log(e,...i)}function mf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Qe(...i){i=mf(i);let e="THREE."+i.shift();if(ur)ur("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function it(...i){i=mf(i);let e="THREE."+i.shift();if(ur)ur("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function bs(...i){let e=i.join(" ");e in Hh||(Hh[e]=!0,Qe(...i))}function gf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var _f={[Ta]:wa,[Aa]:Pa,[Ra]:Ia,[or]:Ca,[wa]:Ta,[Pa]:Aa,[Ia]:Ra,[Ca]:or},Jn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kh=1234567,Jr=Math.PI/180,Ts=180/Math.PI;function $n(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]).toLowerCase()}function pt(i,e,t){return Math.max(e,Math.min(t,i))}function Su(i,e){return(i%e+e)%e}function Jp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Qp(i,e,t){return i!==e?(t-i)/(e-i):0}function Qr(i,e,t){return(1-t)*i+t*e}function em(i,e,t,n){return Qr(i,e,1-Math.exp(-t*n))}function tm(i,e=1){return e-Math.abs(Su(i,e*2)-e)}function nm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function im(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function sm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function rm(i,e){return i+Math.random()*(e-i)}function om(i){return i*(.5-Math.random())}function am(i){i!==void 0&&(kh=i);let e=kh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lm(i){return i*Jr}function cm(i){return i*Ts}function um(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function hm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function dm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fm(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),h=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*d,l*h,a*c);break;case"YZY":i.set(l*h,a*u,l*d,a*c);break;case"ZXZ":i.set(l*d,l*h,a*u,a*c);break;case"XZX":i.set(a*u,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*u,a*c);break;default:Qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function si(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var $e={DEG2RAD:Jr,RAD2DEG:Ts,generateUUID:$n,clamp:pt,euclideanModulo:Su,mapLinear:Jp,inverseLerp:Qp,lerp:Qr,damp:em,pingpong:tm,smoothstep:nm,smootherstep:im,randInt:sm,randFloat:rm,randFloatSpread:om,seededRandom:am,degToRad:lm,radToDeg:cm,isPowerOfTwo:um,ceilPowerOfTwo:hm,floorPowerOfTwo:dm,setQuaternionFromProperEuler:fm,normalize:Pt,denormalize:si},Cu=class Cu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Cu.prototype.isVector2=!0;var be=Cu,De=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],h=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(d!==_||l!==h||c!==f||u!==m){let p=l*h+c*f+u*m+d*_;p<0&&(h=-h,f=-f,m=-m,_=-_,p=-p);let g=1-a;if(p<.9995){let b=Math.acos(p),w=Math.sin(b);g=Math.sin(g*b)/w,a=Math.sin(a*b)/w,l=l*g+h*a,c=c*g+f*a,u=u*g+m*a,d=d*g+_*a}else{l=l*g+h*a,c=c*g+f*a,u=u*g+m*a,d=d*g+_*a;let b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[o],h=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+u*d+l*f-c*h,e[t+1]=l*m+u*h+c*d-a*f,e[t+2]=c*m+u*f+a*h-l*d,e[t+3]=u*m-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),d=a(r/2),h=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:Qe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Pu=class Pu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fc.copy(this).projectOnVector(e),this.sub(fc)}reflect(e){return this.sub(fc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Pu.prototype.isVector3=!0;var S=Pu,fc=new S,Vh=new De,Iu=class Iu{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],_=s[0],p=s[3],g=s[6],b=s[1],w=s[4],v=s[7],E=s[2],A=s[5],T=s[8];return r[0]=o*_+a*b+l*E,r[3]=o*p+a*w+l*A,r[6]=o*g+a*v+l*T,r[1]=c*_+u*b+d*E,r[4]=c*p+u*w+d*A,r[7]=c*g+u*v+d*T,r[2]=h*_+f*b+m*E,r[5]=h*p+f*w+m*A,r[8]=h*g+f*v+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*r,f=c*r-o*l,m=t*d+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=d*_,e[1]=(s*c-u*n)*_,e[2]=(a*n-s*o)*_,e[3]=h*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return bs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(pc.makeScale(e,t)),this}rotate(e){return bs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(pc.makeRotation(-e)),this}translate(e,t){return bs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Iu.prototype.isMatrix3=!0;var at=Iu,pc=new at,zh=new at().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gh=new at().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pm(){let i={enabled:!0,workingColorSpace:wn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ct&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ct&&(s.r=rr(s.r),s.g=rr(s.g),s.b=rr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wi?io:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return bs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return bs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[wn]:{primaries:e,whitePoint:n,transfer:io,toXYZ:zh,fromXYZ:Gh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:n,transfer:Ct,toXYZ:zh,fromXYZ:Gh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),i}var xt=pm();function Ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Xs,La=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xs===void 0&&(Xs=cr("canvas")),Xs.width=e.width,Xs.height=e.height;let s=Xs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Xs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=cr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ui(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return Qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},mm=0,hr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(mc(s[o].image)):r.push(mc(s[o]))}else r=mc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function mc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?La.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Qe("Texture: Unable to serialize Texture."),{})}var gm=0,gc=new S,sn=class i extends Jn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=jn,s=jn,r=Qt,o=ui,a=qn,l=Bn,c=i.DEFAULT_ANISOTROPY,u=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=$n(),this.name="",this.source=new hr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(gc).x}get height(){return this.source.getSize(gc).y}get depth(){return this.source.getSize(gc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gi:e.x=e.x-Math.floor(e.x);break;case jn:e.x=e.x<0?0:1;break;case ar:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gi:e.y=e.y-Math.floor(e.y);break;case jn:e.y=e.y<0?0:1;break;case ar:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=fu;sn.DEFAULT_ANISOTROPY=1;var Lu=class Lu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,v=(f+1)/2,E=(g+1)/2,A=(u+h)/4,T=(d+_)/4,x=(m+p)/4;return w>v&&w>E?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=A/n,r=T/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=A/s,r=x/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=T/r,s=x/r),this.set(n,s,r,t),this}let b=Math.sqrt((p-m)*(p-m)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(p-m)/b,this.y=(d-_)/b,this.z=(h-u)/b,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Lu.prototype.isVector4=!0;var It=Lu,Da=class extends Jn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new sn(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new hr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dn=class extends Da{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ro=class extends sn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Na=class extends sn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var nl=class nl{constructor(e,t,n,s,r,o,a,l,c,u,d,h,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,d,h,f,m,_,p)}set(e,t,n,s,r,o,a,l,c,u,d,h,f,m,_,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=u,g[10]=d,g[14]=h,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/qs.setFromMatrixColumn(e,0).length(),r=1/qs.setFromMatrixColumn(e,1).length(),o=1/qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=o*u,f=o*d,m=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,m=c*u,_=c*d;t[0]=h+_*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-m,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,m=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let h=o*u,f=o*d,m=a*u,_=a*d;t[0]=l*u,t[4]=m*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let h=o*l,f=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=m*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+m,t[10]=h-_*d}else if(e.order==="XZY"){let h=o*l,f=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_m,e,xm)}lookAt(e,t,n){let s=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),ji.crossVectors(n,kn),ji.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),ji.crossVectors(n,kn)),ji.normalize(),Ko.crossVectors(kn,ji),s[0]=ji.x,s[4]=Ko.x,s[8]=kn.x,s[1]=ji.y,s[5]=Ko.y,s[9]=kn.y,s[2]=ji.z,s[6]=Ko.z,s[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],_=n[6],p=n[10],g=n[14],b=n[3],w=n[7],v=n[11],E=n[15],A=s[0],T=s[4],x=s[8],C=s[12],N=s[1],B=s[5],O=s[9],k=s[13],D=s[2],G=s[6],$=s[10],K=s[14],oe=s[3],W=s[7],ie=s[11],re=s[15];return r[0]=o*A+a*N+l*D+c*oe,r[4]=o*T+a*B+l*G+c*W,r[8]=o*x+a*O+l*$+c*ie,r[12]=o*C+a*k+l*K+c*re,r[1]=u*A+d*N+h*D+f*oe,r[5]=u*T+d*B+h*G+f*W,r[9]=u*x+d*O+h*$+f*ie,r[13]=u*C+d*k+h*K+f*re,r[2]=m*A+_*N+p*D+g*oe,r[6]=m*T+_*B+p*G+g*W,r[10]=m*x+_*O+p*$+g*ie,r[14]=m*C+_*k+p*K+g*re,r[3]=b*A+w*N+v*D+E*oe,r[7]=b*T+w*B+v*G+E*W,r[11]=b*x+w*O+v*$+E*ie,r[15]=b*C+w*k+v*K+E*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],_=e[7],p=e[11],g=e[15],b=l*f-c*h,w=a*f-c*d,v=a*h-l*d,E=o*f-c*u,A=o*h-l*u,T=o*d-a*u;return t*(_*b-p*w+g*v)-n*(m*b-p*E+g*A)+s*(m*w-_*E+g*T)-r*(m*v-_*A+p*T)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-n*(r*u-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],_=e[13],p=e[14],g=e[15],b=t*a-n*o,w=t*l-s*o,v=t*c-r*o,E=n*l-s*a,A=n*c-r*a,T=s*c-r*l,x=u*_-d*m,C=u*p-h*m,N=u*g-f*m,B=d*p-h*_,O=d*g-f*_,k=h*g-f*p,D=b*k-w*O+v*B+E*N-A*C+T*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/D;return e[0]=(a*k-l*O+c*B)*G,e[1]=(s*O-n*k-r*B)*G,e[2]=(_*T-p*A+g*E)*G,e[3]=(h*A-d*T-f*E)*G,e[4]=(l*N-o*k-c*C)*G,e[5]=(t*k-s*N+r*C)*G,e[6]=(p*v-m*T-g*w)*G,e[7]=(u*T-h*v+f*w)*G,e[8]=(o*O-a*N+c*x)*G,e[9]=(n*N-t*O-r*x)*G,e[10]=(m*A-_*v+g*b)*G,e[11]=(d*v-u*A-f*b)*G,e[12]=(a*C-o*B-l*x)*G,e[13]=(t*B-n*C+s*x)*G,e[14]=(_*w-m*E-p*b)*G,e[15]=(u*E-d*w+h*b)*G,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,h=r*c,f=r*u,m=r*d,_=o*u,p=o*d,g=a*d,b=l*c,w=l*u,v=l*d,E=n.x,A=n.y,T=n.z;return s[0]=(1-(_+g))*E,s[1]=(f+v)*E,s[2]=(m-w)*E,s[3]=0,s[4]=(f-v)*A,s[5]=(1-(h+g))*A,s[6]=(p+b)*A,s[7]=0,s[8]=(m+w)*T,s[9]=(p-b)*T,s[10]=(1-(h+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=qs.set(s[0],s[1],s[2]).length(),a=qs.set(s[4],s[5],s[6]).length(),l=qs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),ti.copy(this);let c=1/o,u=1/a,d=1/l;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=u,ti.elements[5]*=u,ti.elements[6]*=u,ti.elements[8]*=d,ti.elements[9]*=d,ti.elements[10]*=d,t.setFromRotationMatrix(ti),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=ri,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),m,_;if(l)m=r/(o-r),_=o*r/(o-r);else if(a===ri)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===lr)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ri,l=!1){let c=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s),m,_;if(l)m=1/(o-r),_=o/(o-r);else if(a===ri)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===lr)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};nl.prototype.isMatrix4=!0;var ct=nl,qs=new S,ti=new ct,_m=new S(0,0,0),xm=new S(1,1,1),ji=new S,Ko=new S,kn=new S,Wh=new ct,Xh=new De,Nn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-pt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xh.setFromEuler(this),this.setFromQuaternion(Xh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Nn.DEFAULT_ORDER="XYZ";var dr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ym=0,qh=new S,Ys=new De,Ci=new ct,jo=new S,Gr=new S,vm=new S,Mm=new De,Yh=new S(1,0,0),Zh=new S(0,1,0),Kh=new S(0,0,1),jh={type:"added"},bm={type:"removed"},Zs={type:"childadded",child:null},_c={type:"childremoved",child:null},zt=class i extends Jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new S,t=new Nn,n=new De,s=new S(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new at}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(Yh,e)}rotateY(e){return this.rotateOnAxis(Zh,e)}rotateZ(e){return this.rotateOnAxis(Kh,e)}translateOnAxis(e,t){return qh.copy(e).applyQuaternion(this.quaternion),this.position.add(qh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yh,e)}translateY(e){return this.translateOnAxis(Zh,e)}translateZ(e){return this.translateOnAxis(Kh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jo.copy(e):jo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Gr,jo,this.up):Ci.lookAt(jo,Gr,this.up),this.quaternion.setFromRotationMatrix(Ci),s&&(Ci.extractRotation(s.matrixWorld),Ys.setFromRotationMatrix(Ci),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jh),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bm),_c.child=e,this.dispatchEvent(_c),_c.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jh),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,e,vm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,Mm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};zt.DEFAULT_UP=new S(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gt=class extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Sm={type:"move"},fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let p=t.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Sm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},xf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},$o={h:0,s:0,l:0};function xc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var tt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=xt.workingColorSpace){if(e=Su(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=xc(o,r,e+1/3),this.g=xc(o,r,e),this.b=xc(o,r,e-1/3)}return xt.colorSpaceToWorking(this,s),this}setStyle(e,t=Et){function n(r){r!==void 0&&parseFloat(r)<1&&Qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let n=xf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=rr(e.r),this.g=rr(e.g),this.b=rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return xt.workingToColorSpace(yn.copy(this),e),Math.round(pt(yn.r*255,0,255))*65536+Math.round(pt(yn.g*255,0,255))*256+Math.round(pt(yn.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(yn.copy(this),t);let n=yn.r,s=yn.g,r=yn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=Et){xt.workingToColorSpace(yn.copy(this),e);let t=yn.r,n=yn.g,s=yn.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL($i),this.setHSL($i.h+e,$i.s+t,$i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($i),e.getHSL($o);let n=Qr($i.h,$o.h,t),s=Qr($i.s,$o.s,t),r=Qr($i.l,$o.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new tt;tt.NAMES=xf;var oo=class extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ni=new S,Pi=new S,yc=new S,Ii=new S,Ks=new S,js=new S,$h=new S,vc=new S,Mc=new S,bc=new S,Sc=new It,Ec=new It,Tc=new It,ns=class i{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ni.subVectors(e,t),s.cross(ni);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ni.subVectors(s,t),Pi.subVectors(n,t),yc.subVectors(e,t);let o=ni.dot(ni),a=ni.dot(Pi),l=ni.dot(yc),c=Pi.dot(Pi),u=Pi.dot(yc),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-a*u)*h,m=(o*u-a*l)*h;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ii.x),l.addScaledVector(o,Ii.y),l.addScaledVector(a,Ii.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Sc.setScalar(0),Ec.setScalar(0),Tc.setScalar(0),Sc.fromBufferAttribute(e,t),Ec.fromBufferAttribute(e,n),Tc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Sc,r.x),o.addScaledVector(Ec,r.y),o.addScaledVector(Tc,r.z),o}static isFrontFacing(e,t,n,s){return ni.subVectors(n,t),Pi.subVectors(e,t),ni.cross(Pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ni.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ni.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Ks.subVectors(s,n),js.subVectors(r,n),vc.subVectors(e,n);let l=Ks.dot(vc),c=js.dot(vc);if(l<=0&&c<=0)return t.copy(n);Mc.subVectors(e,s);let u=Ks.dot(Mc),d=js.dot(Mc);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ks,o);bc.subVectors(e,r);let f=Ks.dot(bc),m=js.dot(bc);if(m>=0&&f<=m)return t.copy(r);let _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(js,a);let p=u*m-f*d;if(p<=0&&d-u>=0&&f-m>=0)return $h.subVectors(r,s),a=(d-u)/(d-u+(f-m)),t.copy(s).addScaledVector($h,a);let g=1/(p+_+h);return o=_*g,a=h*g,t.copy(n).addScaledVector(Ks,o).addScaledVector(js,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ot=class{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ii):ii.fromBufferAttribute(r,o),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jo.copy(n.boundingBox)),Jo.applyMatrix4(e.matrixWorld),this.union(Jo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wr),Qo.subVectors(this.max,Wr),$s.subVectors(e.a,Wr),Js.subVectors(e.b,Wr),Qs.subVectors(e.c,Wr),Ji.subVectors(Js,$s),Qi.subVectors(Qs,Js),gs.subVectors($s,Qs);let t=[0,-Ji.z,Ji.y,0,-Qi.z,Qi.y,0,-gs.z,gs.y,Ji.z,0,-Ji.x,Qi.z,0,-Qi.x,gs.z,0,-gs.x,-Ji.y,Ji.x,0,-Qi.y,Qi.x,0,-gs.y,gs.x,0];return!wc(t,$s,Js,Qs,Qo)||(t=[1,0,0,0,1,0,0,0,1],!wc(t,$s,Js,Qs,Qo))?!1:(ea.crossVectors(Ji,Qi),t=[ea.x,ea.y,ea.z],wc(t,$s,Js,Qs,Qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Li=[new S,new S,new S,new S,new S,new S,new S,new S],ii=new S,Jo=new Ot,$s=new S,Js=new S,Qs=new S,Ji=new S,Qi=new S,gs=new S,Wr=new S,Qo=new S,ea=new S,_s=new S;function wc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){_s.fromArray(i,r);let a=s.x*Math.abs(_s.x)+s.y*Math.abs(_s.y)+s.z*Math.abs(_s.z),l=e.dot(_s),c=t.dot(_s),u=n.dot(_s);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var tn=new S,ta=new be,Em=0,$t=class extends Jn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Em++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Mu,this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=si(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=si(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=si(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=si(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ws=class extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ao=class extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ut=class extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}},Tm=new Ot,Xr=new S,Ac=new S,Un=class{constructor(e=new S,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Tm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xr.subVectors(e,this.center);let t=Xr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Xr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ac.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xr.copy(e.center).add(Ac)),this.expandByPoint(Xr.copy(e.center).sub(Ac))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wm=0,Kn=new ct,Rc=new zt,er=new S,Vn=new Ot,qr=new Ot,ln=new S,wt=class i extends Jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jp(e)?ao:ws)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new at().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Kn.makeRotationFromQuaternion(e),this.applyMatrix4(Kn),this}rotateX(e){return Kn.makeRotationX(e),this.applyMatrix4(Kn),this}rotateY(e){return Kn.makeRotationY(e),this.applyMatrix4(Kn),this}rotateZ(e){return Kn.makeRotationZ(e),this.applyMatrix4(Kn),this}translate(e,t,n){return Kn.makeTranslation(e,t,n),this.applyMatrix4(Kn),this}scale(e,t,n){return Kn.makeScale(e,t,n),this.applyMatrix4(Kn),this}lookAt(e){return Rc.lookAt(e),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ut(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ot);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Vn.setFromBufferAttribute(r),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Vn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Vn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Vn.min),this.boundingBox.expandByPoint(Vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(e){let n=this.boundingSphere.center;if(Vn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];qr.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(Vn.min,qr.min),Vn.expandByPoint(ln),ln.addVectors(Vn.max,qr.max),Vn.expandByPoint(ln)):(Vn.expandByPoint(qr.min),Vn.expandByPoint(qr.max))}Vn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)ln.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(ln));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ln.fromBufferAttribute(a,c),l&&(er.fromBufferAttribute(e,c),ln.add(er)),s=Math.max(s,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new $t(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let x=0;x<n.count;x++)a[x]=new S,l[x]=new S;let c=new S,u=new S,d=new S,h=new be,f=new be,m=new be,_=new S,p=new S;function g(x,C,N){c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,C),d.fromBufferAttribute(n,N),h.fromBufferAttribute(r,x),f.fromBufferAttribute(r,C),m.fromBufferAttribute(r,N),u.sub(c),d.sub(c),f.sub(h),m.sub(h);let B=1/(f.x*m.y-m.x*f.y);isFinite(B)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(B),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(B),a[x].add(_),a[C].add(_),a[N].add(_),l[x].add(p),l[C].add(p),l[N].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,C=b.length;x<C;++x){let N=b[x],B=N.start,O=N.count;for(let k=B,D=B+O;k<D;k+=3)g(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let w=new S,v=new S,E=new S,A=new S;function T(x){E.fromBufferAttribute(s,x),A.copy(E);let C=a[x];w.copy(C),w.sub(E.multiplyScalar(E.dot(C))).normalize(),v.crossVectors(A,C);let B=v.dot(l[x])<0?-1:1;o.setXYZW(x,w.x,w.y,w.z,B)}for(let x=0,C=b.length;x<C;++x){let N=b[x],B=N.start,O=N.count;for(let k=B,D=B+O;k<D;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new S,r=new S,o=new S,a=new S,l=new S,c=new S,u=new S,d=new S;if(e)for(let h=0,f=e.count;h<f;h+=3){let m=e.getX(h+0),_=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u),f=0,m=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let g=0;g<u;g++)h[m++]=c[f++]}return new $t(h,u,d)}if(this.index===null)return Qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},pr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Mu,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Tn=new S,mr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix4(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyNormalMatrix(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.transformDirection(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=si(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=si(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=si(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=si(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){so("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new $t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){so("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Cc=new S,Am=new S,Rm=new at,vn=class{constructor(e=new S(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Cc.subVectors(n,t).cross(Am.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Cc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Rm.getNormalMatrix(e),s=this.coplanarPoint(Cc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Cm=0,Fn=class extends Jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=$n(),this.name="",this.type="Material",this.blending=Rr,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=su,this.blendDst=ru,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=af,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sa,this.stencilZFail=Sa,this.stencilZPass=Sa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Qe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new vn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new be().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new be().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Di=new S,Pc=new S,na=new S,ia=new S,xi=class{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Pc.copy(e).add(t).multiplyScalar(.5),na.copy(t).sub(e).normalize(),ia.copy(this.origin).sub(Pc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(na),a=ia.dot(this.direction),l=-ia.dot(na),c=ia.lengthSq(),u=Math.abs(1-o*o),d,h,f,m;if(u>0)if(d=o*l-a,h=o*a-l,m=r*u,d>=0)if(h>=-m)if(h<=m){let _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Pc).addScaledVector(na,h),f}intersectSphere(e,t){if(e.radius<0)return null;Di.subVectors(e.center,this.origin);let n=Di.dot(this.direction),s=Di.dot(Di)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,u=a.z,d=e.x-o.x,h=e.y-o.y,f=e.z-o.z,m=t.x-o.x,_=t.y-o.y,p=t.z-o.z,g=n.x-o.x,b=n.y-o.y,w=n.z-o.z,v=Math.abs(l),E=Math.abs(c),A=Math.abs(u),T,x,C,N,B,O,k,D,G,$,K,oe;if(v>=E&&v>=A?(C=l,O=d,G=m,oe=g,l>=0?(T=c,x=u,N=h,B=f,k=_,D=p,$=b,K=w):(T=u,x=c,N=f,B=h,k=p,D=_,$=w,K=b)):E>=A?(C=c,O=h,G=_,oe=b,c>=0?(T=u,x=l,N=f,B=d,k=p,D=m,$=w,K=g):(T=l,x=u,N=d,B=f,k=m,D=p,$=g,K=w)):(C=u,O=f,G=p,oe=w,u>=0?(T=l,x=c,N=d,B=h,k=m,D=_,$=g,K=b):(T=c,x=l,N=h,B=d,k=_,D=m,$=b,K=g)),C===0)return null;let W=T/C,ie=x/C,re=1/C,ve=N-W*O,Me=B-ie*O,Ne=k-W*G,Ye=D-ie*G,_e=$-W*oe,H=K-ie*oe,R=_e*Ye-H*Ne,I=ve*H-Me*_e,U=Ne*Me-Ye*ve;if(s){if(R<0||I<0||U<0)return null}else if((R<0||I<0||U<0)&&(R>0||I>0||U>0))return null;let F=R+I+U;if(F===0)return null;let J=re*(R*O+I*G+U*oe);return(F>0?J<0:J>0)?null:this.at(J/F,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},oi=class extends Fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Jh=new ct,xs=new xi,sa=new Un,Qh=new S,ra=new S,oa=new S,aa=new S,Ic=new S,la=new S,ed=new S,ca=new S,et=class extends zt{constructor(e=new wt,t=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){la.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],d=r[l];u!==0&&(Ic.fromBufferAttribute(d,e),o?la.addScaledVector(Ic,u):la.addScaledVector(Ic.sub(t),u))}t.add(la)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(r),xs.copy(e.ray).recast(e.near),!(sa.containsPoint(xs.origin)===!1&&(xs.intersectSphere(sa,Qh)===null||xs.origin.distanceToSquared(Qh)>(e.far-e.near)**2))&&(Jh.copy(r).invert(),xs.copy(e.ray).applyMatrix4(Jh),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xs)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){let p=h[m],g=o[p.materialIndex],b=Math.max(p.start,f.start),w=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,E=w;v<E;v+=3){let A=a.getX(v),T=a.getX(v+1),x=a.getX(v+2);s=ua(this,g,e,n,c,u,d,A,T,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let b=a.getX(p),w=a.getX(p+1),v=a.getX(p+2);s=ua(this,o,e,n,c,u,d,b,w,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){let p=h[m],g=o[p.materialIndex],b=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,E=w;v<E;v+=3){let A=v,T=v+1,x=v+2;s=ua(this,g,e,n,c,u,d,A,T,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let b=p,w=p+1,v=p+2;s=ua(this,o,e,n,c,u,d,b,w,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function Pm(i,e,t,n,s,r,o,a){let l;if(e.side===An?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Qn,a),l===null)return null;ca.copy(a),ca.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ca);return c<t.near||c>t.far?null:{distance:c,point:ca.clone(),object:i}}function ua(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,ra),i.getVertexPosition(l,oa),i.getVertexPosition(c,aa);let u=Pm(i,e,t,n,ra,oa,aa,ed);if(u){let d=new S;ns.getBarycoord(ed,ra,oa,aa,d),s&&(u.uv=ns.getInterpolatedAttribute(s,a,l,c,d,new be)),r&&(u.uv1=ns.getInterpolatedAttribute(r,a,l,c,d,new be)),o&&(u.normal=ns.getInterpolatedAttribute(o,a,l,c,d,new S),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new S,materialIndex:0};ns.getNormal(ra,oa,aa,h.normal),u.face=h,u.barycoord=d}return u}var Yr=new It,td=new It,nd=new It,Im=new It,id=new ct,ha=new S,Lc=new Un,sd=new ct,Dc=new xi,is=class extends et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=kc,this.bindMatrix=new ct,this.bindMatrixInverse=new ct,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ot),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ha),this.boundingBox.expandByPoint(ha)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ha),this.boundingSphere.expandByPoint(ha)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Lc.copy(this.boundingSphere),Lc.applyMatrix4(s),e.ray.intersectsSphere(Lc)!==!1&&(sd.copy(s).invert(),Dc.copy(e.ray).applyMatrix4(sd),!(this.boundingBox!==null&&Dc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Dc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new It,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===kc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Qd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Qe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;td.fromBufferAttribute(s.attributes.skinIndex,e),nd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Yr.copy(t),t.set(0,0,0,0)):(Yr.set(...t,1),t.set(0,0,0)),Yr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=nd.getComponent(r);if(o!==0){let a=td.getComponent(r);id.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Im.copy(Yr).applyMatrix4(id),o)}}return t.isVector4&&(t.w=Yr.w),t.applyMatrix4(this.bindMatrixInverse)}},gr=class extends zt{constructor(){super(),this.isBone=!0,this.type="Bone"}},_r=class extends sn{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Jt,u=Jt,d,h){super(null,o,a,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},rd=new ct,Lm=new ct,lo=class i{constructor(e=[],t=[]){this.uuid=$n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Qe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ct)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ct;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Lm;rd.multiplyMatrices(a,t[r]),rd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new _r(t,e,e,qn,Xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(Qe("Skeleton: No bone found with UUID:",r),o=new gr),this.bones.push(o),this.boneInverses.push(new ct().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Fi=class extends $t{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},tr=new ct,od=new ct,da=[],ad=new Ot,Dm=new ct,Zr=new et,Kr=new Un,co=class extends et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Dm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ot),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),ad.copy(e.boundingBox).applyMatrix4(tr),this.boundingBox.union(ad)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,tr),Kr.copy(e.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(Kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Zr.geometry=this.geometry,Zr.material=this.material,Zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Kr.copy(this.boundingSphere),Kr.applyMatrix4(n),e.ray.intersectsSphere(Kr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,tr),od.multiplyMatrices(n,tr),Zr.matrixWorld=od,Zr.raycast(e,da);for(let o=0,a=da.length;o<a;o++){let l=da[o];l.instanceId=r,l.object=this,t.push(l)}da.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Fi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new _r(new Float32Array(s*this.count),s,this.count,cl,Xn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ys=new Un,Nm=new be(.5,.5),fa=new S,xr=class{constructor(e=new vn,t=new vn,n=new vn,s=new vn,r=new vn,o=new vn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ri,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8],_=r[9],p=r[10],g=r[11],b=r[12],w=r[13],v=r[14],E=r[15];if(s[0].setComponents(c-o,f-u,g-m,E-b).normalize(),s[1].setComponents(c+o,f+u,g+m,E+b).normalize(),s[2].setComponents(c+a,f+d,g+_,E+w).normalize(),s[3].setComponents(c-a,f-d,g-_,E-w).normalize(),n)s[4].setComponents(l,h,p,v).normalize(),s[5].setComponents(c-l,f-h,g-p,E-v).normalize();else if(s[4].setComponents(c-l,f-h,g-p,E-v).normalize(),t===ri)s[5].setComponents(c+l,f+h,g+p,E+v).normalize();else if(t===lr)s[5].setComponents(l,h,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ys.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ys.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ys)}intersectsSprite(e){ys.center.set(0,0,0);let t=Nm.distanceTo(e.center);return ys.radius=.7071067811865476+t,ys.applyMatrix4(e.matrixWorld),this.intersectsSphere(ys)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(fa.x=s.normal.x>0?e.max.x:e.min.x,fa.y=s.normal.y>0?e.max.y:e.min.y,fa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(fa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ai=class extends Fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ua=new S,Fa=new S,ld=new ct,jr=new xi,pa=new Un,Nc=new S,cd=new S,yi=class extends zt{constructor(e=new wt,t=new ai){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ua.fromBufferAttribute(t,s-1),Fa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ua.distanceTo(Fa);e.setAttribute("lineDistance",new ut(n,1))}else Qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,e.ray.intersectsSphere(pa)===!1)return;ld.copy(s).invert(),jr.copy(e.ray).applyMatrix4(ld);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=c){let g=u.getX(_),b=u.getX(_+1),w=ma(this,e,jr,l,g,b,_);w&&t.push(w)}if(this.isLineLoop){let _=u.getX(m-1),p=u.getX(f),g=ma(this,e,jr,l,_,p,m-1);g&&t.push(g)}}else{let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=c){let g=ma(this,e,jr,l,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){let _=ma(this,e,jr,l,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ma(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Ua.fromBufferAttribute(a,s),Fa.fromBufferAttribute(a,r),t.distanceSqToSegment(Ua,Fa,Nc,cd)>n)return;Nc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Nc);if(!(c<e.near||c>e.far))return{distance:c,point:cd.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var ud=new S,hd=new S,As=class extends yi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)ud.fromBufferAttribute(t,s),hd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ud.distanceTo(hd);e.setAttribute("lineDistance",new ut(n,1))}else Qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},uo=class extends yi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},yr=class extends Fn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},dd=new ct,zc=new xi,ga=new Un,_a=new S,ho=class extends zt{constructor(e=new wt,t=new yr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(s),ga.radius+=r,e.ray.intersectsSphere(ga)===!1)return;dd.copy(s).invert(),zc.copy(e.ray).applyMatrix4(dd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=h,_=f;m<_;m++){let p=c.getX(m);_a.fromBufferAttribute(d,p),fd(_a,p,l,s,e,t,this)}}else{let h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=h,_=f;m<_;m++)_a.fromBufferAttribute(d,m),fd(_a,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function fd(i,e,t,n,s,r,o){let a=zc.distanceSqToPoint(i);if(a<t){let l=new S;zc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var fo=class extends sn{constructor(e=[],t=us,n,s,r,o,a,l,c,u){super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},pn=class extends sn{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ss=class extends sn{constructor(e,t,n=hi,s,r,o,a=Jt,l=Jt,c,u=_i,d=1){if(u!==_i&&u!==hs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new hr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Oa=class extends ss{constructor(e,t=hi,n=us,s,r,o=Jt,a=Jt,l,c=_i){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},po=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Mn=class i extends wt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(u,3)),this.setAttribute("uv",new ut(d,2));function m(_,p,g,b,w,v,E,A,T,x,C){let N=v/T,B=E/x,O=v/2,k=E/2,D=A/2,G=T+1,$=x+1,K=0,oe=0,W=new S;for(let ie=0;ie<$;ie++){let re=ie*B-k;for(let ve=0;ve<G;ve++){let Me=ve*N-O;W[_]=Me*b,W[p]=re*w,W[g]=D,c.push(W.x,W.y,W.z),W[_]=0,W[p]=0,W[g]=A>0?1:-1,u.push(W.x,W.y,W.z),d.push(ve/T),d.push(1-ie/x),K+=1}}for(let ie=0;ie<x;ie++)for(let re=0;re<T;re++){let ve=h+re+G*ie,Me=h+re+G*(ie+1),Ne=h+(re+1)+G*(ie+1),Ye=h+(re+1)+G*ie;l.push(ve,Me,Ye),l.push(Me,Ne,Ye),oe+=6}a.addGroup(f,oe,C),f+=oe,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var vi=class i extends wt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new S,u=new be;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(a,3)),this.setAttribute("uv",new ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Oi=class i extends wt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],m=0,_=[],p=n/2,g=0;b(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new ut(d,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(f,2));function b(){let v=new S,E=new S,A=0,T=(t-e)/n;for(let x=0;x<=r;x++){let C=[],N=x/r,B=N*(t-e)+e;for(let O=0;O<=s;O++){let k=O/s,D=k*l+a,G=Math.sin(D),$=Math.cos(D);E.x=B*G,E.y=-N*n+p,E.z=B*$,d.push(E.x,E.y,E.z),v.set(G,T,$).normalize(),h.push(v.x,v.y,v.z),f.push(k,1-N),C.push(m++)}_.push(C)}for(let x=0;x<s;x++)for(let C=0;C<r;C++){let N=_[C][x],B=_[C+1][x],O=_[C+1][x+1],k=_[C][x+1];(e>0||C!==0)&&(u.push(N,B,k),A+=3),(t>0||C!==r-1)&&(u.push(B,O,k),A+=3)}c.addGroup(g,A,0),g+=A}function w(v){let E=m,A=new be,T=new S,x=0,C=v===!0?e:t,N=v===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,p*N,0),h.push(0,N,0),f.push(.5,.5),m++;let B=m;for(let O=0;O<=s;O++){let D=O/s*l+a,G=Math.cos(D),$=Math.sin(D);T.x=C*$,T.y=p*N,T.z=C*G,d.push(T.x,T.y,T.z),h.push(0,N,0),A.x=G*.5+.5,A.y=$*.5*N+.5,f.push(A.x,A.y),m++}for(let O=0;O<s;O++){let k=E+O,D=B+O;v===!0?u.push(D,D+1,k):u.push(D+1,D,k),x+=3}c.addGroup(g,x,v===!0?1:2),g+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var zn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Qe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let u=n[s],h=n[s+1]-u,f=(o-u)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new be:new S);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new S,s=[],r=[],o=[],a=new S,l=new ct;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new S)}r[0]=new S,o[0]=new S;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(pt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(pt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},vr=class extends zn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new be){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ba=class extends vr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Eu(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let h=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,f*=u,s(o,a,h,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var pd=new S,md=new S,Uc=new Eu,Fc=new Eu,Oc=new Eu,Rs=class extends zn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new S){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(md.subVectors(s[0],s[1]).add(s[0]),c=md);let d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(pd.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=pd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),Uc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,m,_,p),Fc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,m,_,p),Oc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,m,_,p)}else this.curveType==="catmullrom"&&(Uc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Fc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Oc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(Uc.calc(l),Fc.calc(l),Oc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new S().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function gd(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function Um(i,e){let t=1-i;return t*t*e}function Fm(i,e){return 2*(1-i)*i*e}function Om(i,e){return i*i*e}function eo(i,e,t,n){return Um(i,e)+Fm(i,t)+Om(i,n)}function Bm(i,e){let t=1-i;return t*t*t*e}function Hm(i,e){let t=1-i;return 3*t*t*i*e}function km(i,e){return 3*(1-i)*i*i*e}function Vm(i,e){return i*i*i*e}function to(i,e,t,n,s){return Bm(i,e)+Hm(i,t)+km(i,n)+Vm(i,s)}var mo=class extends zn{constructor(e=new be,t=new be,n=new be,s=new be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new be){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(to(e,s.x,r.x,o.x,a.x),to(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ha=class extends zn{constructor(e=new S,t=new S,n=new S,s=new S){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new S){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(to(e,s.x,r.x,o.x,a.x),to(e,s.y,r.y,o.y,a.y),to(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},go=class extends zn{constructor(e=new be,t=new be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new be){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends zn{constructor(e=new S,t=new S){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new S){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new S){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_o=class extends zn{constructor(e=new be,t=new be,n=new be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new be){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(eo(e,s.x,r.x,o.x),eo(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Va=class extends zn{constructor(e=new S,t=new S,n=new S){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new S){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(eo(e,s.x,r.x,o.x),eo(e,s.y,r.y,o.y),eo(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xo=class extends zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new be){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(gd(a,l.x,c.x,u.x,d.x),gd(a,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new be().fromArray(s))}return this}},Gc=Object.freeze({__proto__:null,ArcCurve:Ba,CatmullRomCurve3:Rs,CubicBezierCurve:mo,CubicBezierCurve3:Ha,EllipseCurve:vr,LineCurve:go,LineCurve3:ka,QuadraticBezierCurve:_o,QuadraticBezierCurve3:Va,SplineCurve:xo}),za=class extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Gc[s.type]().fromJSON(s))}return this}},Mr=class extends za{constructor(e){super(),this.type="Path",this.currentPoint=new be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new go(this.currentPoint.clone(),new be(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new _o(this.currentPoint.clone(),new be(e,t),new be(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new mo(this.currentPoint.clone(),new be(e,t),new be(n,s),new be(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new xo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new vr(e,t,n,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},li=class extends Mr{constructor(e){super(e),this.uuid=$n(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Mr().fromJSON(s))}return this}};function zm(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=yf(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Ym(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let u=a,d=l;for(let h=t;h<s;h+=t){let f=i[h],m=i[h+1];f<a&&(a=f),m<l&&(l=m),f>u&&(u=f),m>d&&(d=m)}c=Math.max(u-a,d-l),c=c!==0?32767/c:0}return yo(r,o,t,a,l,c,0),o}function yf(i,e,t,n,s){let r;if(s===s0(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=_d(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=_d(o/n|0,i[o],i[o+1],r);return r&&br(r,r.next)&&(Mo(r),r=r.next),r}function Cs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(br(t,t.next)||Xt(t.prev,t,t.next)===0)){if(Mo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function yo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Jm(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Wm(i,n,s,r):Gm(i)){e.push(l.i,i.i,c.i),Mo(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Xm(Cs(i),e),yo(i,e,t,n,s,r,2)):o===2&&qm(i,e,t,n,s,r):yo(Cs(i),e,t,n,s,r,1);break}}}function Gm(i){let e=i.prev,t=i,n=i.next;if(Xt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=Math.min(s,r,o),d=Math.min(a,l,c),h=Math.max(s,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=h&&m.y>=d&&m.y<=f&&$r(s,a,r,l,o,c,m.x,m.y)&&Xt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Wm(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Xt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,u=s.y,d=r.y,h=o.y,f=Math.min(a,l,c),m=Math.min(u,d,h),_=Math.max(a,l,c),p=Math.max(u,d,h),g=Wc(f,m,e,t,n),b=Wc(_,p,e,t,n),w=i.prevZ,v=i.nextZ;for(;w&&w.z>=g&&v&&v.z<=b;){if(w.x>=f&&w.x<=_&&w.y>=m&&w.y<=p&&w!==s&&w!==o&&$r(a,u,l,d,c,h,w.x,w.y)&&Xt(w.prev,w,w.next)>=0||(w=w.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&$r(a,u,l,d,c,h,v.x,v.y)&&Xt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;w&&w.z>=g;){if(w.x>=f&&w.x<=_&&w.y>=m&&w.y<=p&&w!==s&&w!==o&&$r(a,u,l,d,c,h,w.x,w.y)&&Xt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&$r(a,u,l,d,c,h,v.x,v.y)&&Xt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Xm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!br(n,s)&&Mf(n,t,t.next,s)&&vo(n,s)&&vo(s,n)&&(e.push(n.i,t.i,s.i),Mo(t),Mo(t.next),t=i=s),t=t.next}while(t!==i);return Cs(t)}function qm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&t0(o,a)){let l=bf(o,a);o=Cs(o,o.next),l=Cs(l,l.next),yo(o,e,t,n,s,r,0),yo(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Ym(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=yf(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(e0(c))}s.sort(Zm);for(let r=0;r<s.length;r++)t=Km(s[r],t);return t}function Zm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Km(i,e){let t=jm(i,e);if(!t)return e;let n=bf(t,i);return Cs(n,n.next),Cs(t,t.next)}function jm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(br(i,t))return t;do{if(br(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,u=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&vf(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);vo(t,i)&&(d<u||d===u&&(t.x>o.x||t.x===o.x&&$m(o,t)))&&(o=t,u=d)}t=t.next}while(t!==a);return o}function $m(i,e){return Xt(i.prev,i,e.prev)<0&&Xt(e.next,i,i.next)<0}function Jm(i,e,t,n){let s=i;do s.z===0&&(s.z=Wc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Qm(s)}function Qm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Wc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function e0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function vf(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function $r(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&vf(i,e,t,n,s,r,o,a)}function t0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!n0(i,e)&&(vo(i,e)&&vo(e,i)&&i0(i,e)&&(Xt(i.prev,i,e.prev)||Xt(i,e.prev,e))||br(i,e)&&Xt(i.prev,i,i.next)>0&&Xt(e.prev,e,e.next)>0)}function Xt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function br(i,e){return i.x===e.x&&i.y===e.y}function Mf(i,e,t,n){let s=ya(Xt(i,e,t)),r=ya(Xt(i,e,n)),o=ya(Xt(t,n,i)),a=ya(Xt(t,n,e));return!!(s!==r&&o!==a||s===0&&xa(i,t,e)||r===0&&xa(i,n,e)||o===0&&xa(t,i,n)||a===0&&xa(t,e,n))}function xa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ya(i){return i>0?1:i<0?-1:0}function n0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Mf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function vo(i,e){return Xt(i.prev,i,i.next)<0?Xt(i,e,i.next)>=0&&Xt(i,i.prev,e)>=0:Xt(i,e,i.prev)<0||Xt(i,i.next,e)<0}function i0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function bf(i,e){let t=Xc(i.i,i.x,i.y),n=Xc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function _d(i,e,t,n){let s=Xc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Mo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Xc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function s0(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var qc=class{static triangulate(e,t,n=2){return zm(e,t,n)}},pi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];xd(e),yd(n,e);let o=e.length;t.forEach(xd);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,yd(n,t[l]);let a=qc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function xd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function yd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ps=class i extends wt{constructor(e=new li([new be(.5,.5),new be(-.5,.5),new be(-.5,-.5),new be(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new ut(s,3)),this.setAttribute("uv",new ut(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:r0,w,v=!1,E,A,T,x;if(g){w=g.getSpacedPoints(u),v=!0,h=!1;let q=g.isCatmullRomCurve3?g.closed:!1;E=g.computeFrenetFrames(u,q),A=new S,T=new S,x=new S}h||(p=0,f=0,m=0,_=0);let C=a.extractPoints(c),N=C.shape,B=C.holes;if(!pi.isClockWise(N)){N=N.reverse();for(let q=0,te=B.length;q<te;q++){let ne=B[q];pi.isClockWise(ne)&&(B[q]=ne.reverse())}}function k(q){let ne=10000000000000001e-36,pe=q[0];for(let ce=1;ce<=q.length;ce++){let Oe=ce%q.length,Fe=q[Oe],Ee=Fe.x-pe.x,ke=Fe.y-pe.y,z=Ee*Ee+ke*ke,ft=Math.max(Math.abs(Fe.x),Math.abs(Fe.y),Math.abs(pe.x),Math.abs(pe.y)),st=ne*ft*ft;if(z<=st){q.splice(Oe,1),ce--;continue}pe=Fe}}k(N),B.forEach(k);let D=B.length,G=N;for(let q=0;q<D;q++){let te=B[q];N=N.concat(te)}function $(q,te,ne){return te||it("ExtrudeGeometry: vec does not exist"),q.clone().addScaledVector(te,ne)}let K=N.length;function oe(q,te,ne){let pe,ce,Oe,Fe=q.x-te.x,Ee=q.y-te.y,ke=ne.x-q.x,z=ne.y-q.y,ft=Fe*Fe+Ee*Ee,st=Fe*z-Ee*ke;if(Math.abs(st)>Number.EPSILON){let P=Math.sqrt(ft),y=Math.sqrt(ke*ke+z*z),Y=te.x-Ee/P,ee=te.y+Fe/P,ae=ne.x-z/y,Se=ne.y+ke/y,Te=((ae-Y)*z-(Se-ee)*ke)/(Fe*z-Ee*ke);pe=Y+Fe*Te-q.x,ce=ee+Ee*Te-q.y;let ue=pe*pe+ce*ce;if(ue<=2)return new be(pe,ce);Oe=Math.sqrt(ue/2)}else{let P=!1;Fe>Number.EPSILON?ke>Number.EPSILON&&(P=!0):Fe<-Number.EPSILON?ke<-Number.EPSILON&&(P=!0):Math.sign(Ee)===Math.sign(z)&&(P=!0),P?(pe=-Ee,ce=Fe,Oe=Math.sqrt(ft)):(pe=Fe,ce=Ee,Oe=Math.sqrt(ft/2))}return new be(pe/Oe,ce/Oe)}let W=[];for(let q=0,te=G.length,ne=te-1,pe=q+1;q<te;q++,ne++,pe++)ne===te&&(ne=0),pe===te&&(pe=0),W[q]=oe(G[q],G[ne],G[pe]);let ie=[],re,ve=W.concat();for(let q=0,te=D;q<te;q++){let ne=B[q];re=[];for(let pe=0,ce=ne.length,Oe=ce-1,Fe=pe+1;pe<ce;pe++,Oe++,Fe++)Oe===ce&&(Oe=0),Fe===ce&&(Fe=0),re[pe]=oe(ne[pe],ne[Oe],ne[Fe]);ie.push(re),ve=ve.concat(re)}let Me;if(p===0)Me=pi.triangulateShape(G,B);else{let q=[],te=[];for(let ne=0;ne<p;ne++){let pe=ne/p,ce=f*Math.cos(pe*Math.PI/2),Oe=m*Math.sin(pe*Math.PI/2)+_;for(let Fe=0,Ee=G.length;Fe<Ee;Fe++){let ke=$(G[Fe],W[Fe],Oe);I(ke.x,ke.y,-ce),pe===0&&q.push(ke)}for(let Fe=0,Ee=D;Fe<Ee;Fe++){let ke=B[Fe];re=ie[Fe];let z=[];for(let ft=0,st=ke.length;ft<st;ft++){let P=$(ke[ft],re[ft],Oe);I(P.x,P.y,-ce),pe===0&&z.push(P)}pe===0&&te.push(z)}}Me=pi.triangulateShape(q,te)}let Ne=Me.length,Ye=m+_;for(let q=0;q<K;q++){let te=h?$(N[q],ve[q],Ye):N[q];v?(T.copy(E.normals[0]).multiplyScalar(te.x),A.copy(E.binormals[0]).multiplyScalar(te.y),x.copy(w[0]).add(T).add(A),I(x.x,x.y,x.z)):I(te.x,te.y,0)}for(let q=1;q<=u;q++)for(let te=0;te<K;te++){let ne=h?$(N[te],ve[te],Ye):N[te];v?(T.copy(E.normals[q]).multiplyScalar(ne.x),A.copy(E.binormals[q]).multiplyScalar(ne.y),x.copy(w[q]).add(T).add(A),I(x.x,x.y,x.z)):I(ne.x,ne.y,d/u*q)}for(let q=p-1;q>=0;q--){let te=q/p,ne=f*Math.cos(te*Math.PI/2),pe=m*Math.sin(te*Math.PI/2)+_;for(let ce=0,Oe=G.length;ce<Oe;ce++){let Fe=$(G[ce],W[ce],pe);I(Fe.x,Fe.y,d+ne)}for(let ce=0,Oe=B.length;ce<Oe;ce++){let Fe=B[ce];re=ie[ce];for(let Ee=0,ke=Fe.length;Ee<ke;Ee++){let z=$(Fe[Ee],re[Ee],pe);v?I(z.x,z.y+w[u-1].y,w[u-1].x+ne):I(z.x,z.y,d+ne)}}}_e(),H();function _e(){let q=s.length/3;if(h){let te=0,ne=K*te;for(let pe=0;pe<Ne;pe++){let ce=Me[pe];U(ce[2]+ne,ce[1]+ne,ce[0]+ne)}te=u+p*2,ne=K*te;for(let pe=0;pe<Ne;pe++){let ce=Me[pe];U(ce[0]+ne,ce[1]+ne,ce[2]+ne)}}else{for(let te=0;te<Ne;te++){let ne=Me[te];U(ne[2],ne[1],ne[0])}for(let te=0;te<Ne;te++){let ne=Me[te];U(ne[0]+K*u,ne[1]+K*u,ne[2]+K*u)}}n.addGroup(q,s.length/3-q,0)}function H(){let q=s.length/3,te=0;R(G,te),te+=G.length;for(let ne=0,pe=B.length;ne<pe;ne++){let ce=B[ne];R(ce,te),te+=ce.length}n.addGroup(q,s.length/3-q,1)}function R(q,te){let ne=q.length;for(;--ne>=0;){let pe=ne,ce=ne-1;ce<0&&(ce=q.length-1);for(let Oe=0,Fe=u+p*2;Oe<Fe;Oe++){let Ee=K*Oe,ke=K*(Oe+1),z=te+pe+Ee,ft=te+ce+Ee,st=te+ce+ke,P=te+pe+ke;F(z,ft,st,P)}}}function I(q,te,ne){l.push(q),l.push(te),l.push(ne)}function U(q,te,ne){J(q),J(te),J(ne);let pe=s.length/3,ce=b.generateTopUV(n,s,pe-3,pe-2,pe-1);fe(ce[0]),fe(ce[1]),fe(ce[2])}function F(q,te,ne,pe){J(q),J(te),J(pe),J(te),J(ne),J(pe);let ce=s.length/3,Oe=b.generateSideWallUV(n,s,ce-6,ce-3,ce-2,ce-1);fe(Oe[0]),fe(Oe[1]),fe(Oe[3]),fe(Oe[1]),fe(Oe[2]),fe(Oe[3])}function J(q){s.push(l[q*3+0]),s.push(l[q*3+1]),s.push(l[q*3+2])}function fe(q){r.push(q.x),r.push(q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return o0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Gc[s.type]().fromJSON(s)),new i(n,e.options)}},r0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new be(r,o),new be(a,l),new be(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[s*3],f=e[s*3+1],m=e[s*3+2],_=e[r*3],p=e[r*3+1],g=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new be(o,1-l),new be(c,1-d),new be(h,1-m),new be(_,1-g)]:[new be(a,1-l),new be(u,1-d),new be(f,1-m),new be(p,1-g)]}};function o0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var cn=class i extends wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,d=e/a,h=t/l,f=[],m=[],_=[],p=[];for(let g=0;g<u;g++){let b=g*h-o;for(let w=0;w<c;w++){let v=w*d-r;m.push(v,-b,0),_.push(0,0,1),p.push(w/a),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<a;b++){let w=b+c*g,v=b+c*(g+1),E=b+1+c*(g+1),A=b+1+c*g;f.push(w,v,A),f.push(v,E,A)}this.setIndex(f),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Sr=class i extends wt{constructor(e=new li([new be(0,.5),new be(-.5,-.5),new be(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new ut(s,3)),this.setAttribute("normal",new ut(r,3)),this.setAttribute("uv",new ut(o,2));function c(u){let d=s.length/3,h=u.extractPoints(t),f=h.shape,m=h.holes;pi.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,g=m.length;p<g;p++){let b=m[p];pi.isClockWise(b)===!0&&(m[p]=b.reverse())}let _=pi.triangulateShape(f,m);for(let p=0,g=m.length;p<g;p++){let b=m[p];f=f.concat(b)}for(let p=0,g=f.length;p<g;p++){let b=f[p];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let p=0,g=_.length;p<g;p++){let b=_[p],w=b[0]+d,v=b[1]+d,E=b[2]+d;n.push(w,v,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return a0(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function a0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var Gn=class i extends wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],d=new S,h=new S,f=[],m=[],_=[],p=[];for(let g=0;g<=n;g++){let b=[],w=g/n,v=o+w*a,E=e*Math.cos(v),A=Math.sqrt(e*e-E*E),T=0;g===0&&o===0?T=.5/t:g===n&&l===Math.PI&&(T=-.5/t);for(let x=0;x<=t;x++){let C=x/t,N=s+C*r;d.x=-A*Math.cos(N),d.y=E,d.z=A*Math.sin(N),m.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),p.push(C+T,1-w),b.push(c++)}u.push(b)}for(let g=0;g<n;g++)for(let b=0;b<t;b++){let w=u[g][b+1],v=u[g][b],E=u[g+1][b],A=u[g+1][b+1];(g!==0||o>0)&&f.push(w,v,A),(g!==n-1||l<Math.PI)&&f.push(v,E,A)}this.setIndex(f),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Is=class i extends wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],u=[],d=[],h=new S,f=new S,m=new S;for(let _=0;_<=n;_++){let p=o+_/n*a;for(let g=0;g<=s;g++){let b=g/s*r;f.x=(e+t*Math.cos(p))*Math.cos(b),f.y=(e+t*Math.cos(p))*Math.sin(b),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),m.subVectors(f,h).normalize(),u.push(m.x,m.y,m.z),d.push(g/s),d.push(_/n)}}for(let _=1;_<=n;_++)for(let p=1;p<=s;p++){let g=(s+1)*_+p-1,b=(s+1)*(_-1)+p-1,w=(s+1)*(_-1)+p,v=(s+1)*_+p;l.push(g,b,v),l.push(b,w,v)}this.setIndex(l),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(u,3)),this.setAttribute("uv",new ut(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Hs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(vd(s))s.isRenderTargetTexture?(Qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(vd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function bn(i){let e={};for(let t=0;t<i.length;t++){let n=Hs(i[t]);for(let s in n)e[s]=n[s]}return e}function vd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function l0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Tu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}var Sf={clone:Hs,merge:bn},c0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,u0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wn=class extends Fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=c0,this.fragmentShader=u0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hs(e.uniforms),this.uniformsGroups=l0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new tt().setHex(s.value);break;case"v2":this.uniforms[n].value=new be().fromArray(s.value);break;case"v3":this.uniforms[n].value=new S().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new at().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ct().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ga=class extends Wn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},_t=class extends Fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wl,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},un=class extends _t{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new tt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new tt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new tt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Wa=class extends Fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xa=class extends Fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ts(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ea(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function h0(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Md(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function d0(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Mi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},qa=class extends Mi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vs,endingEnd:vs}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ms:r=e,a=2*t-n;break;case no:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ms:o=e,l=2*n-t;break;case no:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,p=_*m,g=-h*p+2*h*_-h*m,b=(1+h)*p+(-1.5-2*h)*_+(-.5+h)*m+1,w=(-1-f)*p+(1.5+f)*_+.5*m,v=f*p-f*_;for(let E=0;E!==a;++E)r[E]=g*o[u+E]+b*o[c+E]+w*o[l+E]+v*o[d+E];return r}},bo=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}},Ya=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Za=class extends Mi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(n-t)/(s-t),_=1-m;for(let p=0;p!==a;++p)r[p]=o[c+p]*_+o[l+p]*m;return r}let h=a*2,f=e-1;for(let m=0;m!==a;++m){let _=o[c+m],p=o[l+m],g=f*h+m*2,b=d[g],w=d[g+1],v=e*h+m*2,E=u[v],A=u[v+1],T=p0(n,t,b,E,s);r[m]=Ef(T,_,w,A,p)}return r}};function Ef(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function f0(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function p0(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=Ef(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=f0(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var On=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ts(t,this.TimeBufferType),this.values=ts(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ts(e.times,Array),values:ts(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ea(e.settings)&&(n.settings={inTangents:ts(e.settings.inTangents,Array),outTangents:ts(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Za(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ss:t=this.InterpolantFactoryMethodDiscrete;break;case Es:t=this.InterpolantFactoryMethodLinear;break;case ba:t=this.InterpolantFactoryMethodSmooth;break;case Vc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Qe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return Es;case this.InterpolantFactoryMethodSmooth:return ba;case this.InterpolantFactoryMethodBezier:return Vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ea(this.settings)&&(bd(this.settings.inTangents,e),bd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(it("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(it("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){it("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){it("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&$p(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){it("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ba,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let d=a*n,h=d-n,f=d+n;for(let m=0;m!==n;++m){let _=t[d+m];if(_!==t[h+m]||_!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,h=o*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ea(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function bd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}On.prototype.ValueTypeName="";On.prototype.TimeBufferType=Float32Array;On.prototype.ValueBufferType=Float32Array;On.prototype.DefaultInterpolation=Es;var Bi=class extends On{constructor(e,t,n){super(e,t,n)}};Bi.prototype.ValueTypeName="bool";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=Ss;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var So=class extends On{constructor(e,t,n,s){super(e,t,n,s)}};So.prototype.ValueTypeName="color";var Hi=class extends On{constructor(e,t,n,s){super(e,t,n,s)}};Hi.prototype.ValueTypeName="number";var Ka=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)De.slerpFlat(r,0,o,c-a,o,c,l);return r}},ki=class extends On{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ka(this.times,this.values,this.getValueSize(),e)}};ki.prototype.ValueTypeName="quaternion";ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Vi=class extends On{constructor(e,t,n){super(e,t,n)}};Vi.prototype.ValueTypeName="string";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Ss;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var rs=class extends On{constructor(e,t,n,s){super(e,t,n,s)}};rs.prototype.ValueTypeName="vector";var Ls=class{constructor(e="",t=-1,n=[],s=Gl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=$n(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(g0(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(On.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let u=h0(l);l=Md(l,1,u),c=Md(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Hi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],u=c.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function m0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hi;case"vector":case"vector2":case"vector3":case"vector4":return rs;case"color":return So;case"quaternion":return ki;case"bool":case"boolean":return Bi;case"string":return Vi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function g0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=m0(i.type);if(i.times===void 0){let n=[],s=[];d0(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Ea(i.settings)&&(t.settings={inTangents:ts(i.settings.inTangents,Float32Array),outTangents:ts(i.settings.outTangents,Float32Array)}),t}var mi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Sd(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Sd(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Sd(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ja=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Tf=new ja,bi=class{constructor(e){this.manager=e!==void 0?e:Tf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ni={},Yc=class extends Error{constructor(e,t){super(e),this.response=t}},Er=class extends bi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=mi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Ni[e]!==void 0){Ni[e].push({onLoad:t,onProgress:n,onError:s});return}Ni[e]=[],Ni[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Qe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Ni[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,m=f!==0,_=0,p=new ReadableStream({start(g){b();function b(){d.read().then(({done:w,value:v})=>{if(w)g.close();else{_+=v.byteLength;let E=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let A=0,T=u.length;A<T;A++){let x=u[A];x.onProgress&&x.onProgress(E)}g.enqueue(v),b()}},w=>{g.error(w)})}}});return new Response(p)}else throw new Yc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{mi.add(`file:${e}`,c);let u=Ni[e];delete Ni[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Ni[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ni[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var nr=new WeakMap,$a=class extends bi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=mi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=nr.get(o);d===void 0&&(d=[],nr.set(o,d)),d.push({onLoad:t,onError:s})}return o}let a=cr("img");function l(){u(),t&&t(this);let d=nr.get(this)||[];for(let h=0;h<d.length;h++){let f=d[h];f.onLoad&&f.onLoad(this)}nr.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),mi.remove(`image:${e}`);let h=nr.get(this)||[];for(let f=0;f<h.length;f++){let m=h[f];m.onError&&m.onError(d)}nr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),mi.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var zi=class extends bi{constructor(e){super(e)}load(e,t,n,s){let r=new sn,o=new $a(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ds=class extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Eo=class extends Ds{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Bc=new ct,Ed=new S,Td=new S,Tr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=Bn,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xr,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ed.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ed),Td.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Td),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Bc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Bc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===lr||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Bc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},va=new S,Ma=new De,fi=new S,To=class extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,Ma,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,fi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(va,Ma,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},es=new S,wd=new be,Ad=new be,nn=class extends To{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ts*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(Jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(es.x,es.y).multiplyScalar(-e/es.z),es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(es.x,es.y).multiplyScalar(-e/es.z)}getViewSize(e,t){return this.getViewBounds(e,wd,Ad),t.subVectors(Ad,wd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Zc=class extends Tr{constructor(){super(new nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ts*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},wo=class extends Ds{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Zc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Kc=class extends Tr{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0}},Ao=class extends Ds{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Kc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},os=class extends To{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},jc=class extends Tr{constructor(){super(new os(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},as=class extends Ds{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new jc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Gi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Hc=new WeakMap,Ro=class extends bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Qe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Qe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=mi.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{Hc.has(o)===!0?(s&&s(Hc.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return mi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Hc.set(l,c),mi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});mi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ir=-90,sr=1,Ja=class extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new nn(ir,sr,e,t);s.layers=this.layers,this.add(s);let r=new nn(ir,sr,e,t);r.layers=this.layers,this.add(r);let o=new nn(ir,sr,e,t);o.layers=this.layers,this.add(o);let a=new nn(ir,sr,e,t);a.layers=this.layers,this.add(a);let l=new nn(ir,sr,e,t);l.layers=this.layers,this.add(l);let c=new nn(ir,sr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ri)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Qa=class extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var el=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){De.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;De.multiplyQuaternionsFlat(e,o,e,t,e,n),De.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},wu="\\[\\]\\.:\\/",_0=new RegExp("["+wu+"]","g"),Au="[^"+wu+"]",x0="[^"+wu.replace("\\.","")+"]",y0=/((?:WC+[\/:])*)/.source.replace("WC",Au),v0=/(WCOD+)?/.source.replace("WCOD",x0),M0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Au),b0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Au),S0=new RegExp("^"+y0+v0+M0+b0+"$"),E0=["material","materials","bones","map"],$c=class{constructor(e,t,n){let s=n||Nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Nt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(_0,"")}static parseTrackName(e){let t=S0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);E0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Qe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){it("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){it("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){it("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){it("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){it("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){it("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){it("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;it("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Nt.Composite=$c;Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray];Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var tl=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:vs,endingEnd:vs};for(let c=0;c!==o;++c){let u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=tf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case sf:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case Gl:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===nf;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===ef){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=Ms,s.endingEnd=Ms):(e?s.endingStart=this.zeroSlopeAtStart?Ms:vs:s.endingStart=no,t?s.endingEnd=this.zeroSlopeAtEnd?Ms:vs:s.endingEnd=no)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},T0=new Float32Array(1),Co=class extends Jn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==r;++d){let h=s[d],f=h.name,m=u[f];if(m!==void 0)++m.referenceCount,o[d]=m;else{if(m=o[d],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}let _=t&&t._propertyBindings[d].binding.parsedPath;m=new el(Nt.create(n,f,_),h.ValueTypeName,h.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[d]=m}a[d].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let d=a.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new bo(new Float32Array(2),new Float32Array(2),1,T0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Ls.findByName(s,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Gl),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let u=new tl(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Ls.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Rd=new ct,Ns=class{constructor(e,t,n=0,s=1/0){this.ray=new xi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new dr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):it("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Rd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rd),this}intersectObject(e,t=!0,n=[]){return Jc(e,this,n,t),n.sort(Cd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Jc(e[s],this,n,t);return n.sort(Cd),n}};function Cd(i,e){return i.distance-e.distance}function Jc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Jc(r[o],e,t,!0)}}var wr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=pt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Du=class Du{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Du.prototype.isMatrix2=!0;var Qc=Du;var Po=class extends Jn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ru(i,e,t,n){let s=w0(n);switch(t){case xu:return i*e;case cl:return i*e/s.components*s.byteLength;case ul:return i*e/s.components*s.byteLength;case ds:return i*e*2/s.components*s.byteLength;case hl:return i*e*2/s.components*s.byteLength;case yu:return i*e*3/s.components*s.byteLength;case qn:return i*e*4/s.components*s.byteLength;case dl:return i*e*4/s.components*s.byteLength;case Do:case No:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Uo:case Fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:case gl:return Math.max(i,16)*Math.max(e,8)/4;case fl:case ml:return Math.max(i,8)*Math.max(e,8)/2;case _l:case xl:case vl:case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yl:case Oo:case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case wl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Il:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ul:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ol:case Bl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kl:case Vl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Bo:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function w0(i){switch(i){case Bn:case pu:return{byteLength:1,components:1};case Pr:case mu:case di:return{byteLength:2,components:1};case al:case ll:return{byteLength:2,components:4};case hi:case ol:case Xn:return{byteLength:4,components:1};case gu:case _u:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yf(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function L0(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var D0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N0=`#ifdef USE_ALPHAHASH
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
#endif`,U0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,F0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,O0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,H0=`#ifdef USE_AOMAP
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
#endif`,k0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,V0=`#ifdef USE_BATCHING
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
#endif`,z0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,G0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,W0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,X0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,q0=`#ifdef USE_IRIDESCENCE
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
#endif`,Y0=`#ifdef USE_BUMPMAP
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
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,J0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ng=`#define PI 3.141592653589793
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
} // validated`,ig=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sg=`vec3 transformedNormal = objectNormal;
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
#endif`,rg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ag=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hg=`#ifdef USE_ENVMAP
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
#endif`,dg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fg=`#ifdef USE_ENVMAP
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
#endif`,pg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
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
#endif`,gg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_g=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vg=`#ifdef USE_GRADIENTMAP
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
}`,Mg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Eg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tg=`#ifdef USE_ENVMAP
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
#endif`,wg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ag=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pg=`PhysicalMaterial material;
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
#endif`,Ig=`uniform sampler2D dfgLUT;
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
}`,Lg=`
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
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ug=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Fg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Og=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gg=`#if defined( USE_POINTS_UV )
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
#endif`,Wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`#ifdef USE_MORPHTARGETS
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
#endif`,jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$g=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,n_=`#ifdef USE_NORMALMAP
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
#endif`,i_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,o_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,a_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,c_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,g_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,__=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,x_=`float getShadowMask() {
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
}`,y_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,v_=`#ifdef USE_SKINNING
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
#endif`,M_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,b_=`#ifdef USE_SKINNING
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
#endif`,S_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,A_=`#ifdef USE_TRANSMISSION
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
#endif`,R_=`#ifdef USE_TRANSMISSION
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
#endif`,C_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,D_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N_=`uniform sampler2D t2D;
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
}`,U_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,O_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H_=`#include <common>
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
}`,k_=`#if DEPTH_PACKING == 3200
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
}`,V_=`#define DISTANCE
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
}`,z_=`#define DISTANCE
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
}`,G_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X_=`uniform float scale;
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
}`,q_=`uniform vec3 diffuse;
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
}`,Y_=`#include <common>
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
}`,Z_=`uniform vec3 diffuse;
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
}`,K_=`#define LAMBERT
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
}`,j_=`#define LAMBERT
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
}`,$_=`#define MATCAP
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
}`,J_=`#define MATCAP
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
}`,Q_=`#define NORMAL
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
}`,ex=`#define NORMAL
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
}`,tx=`#define PHONG
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
}`,nx=`#define PHONG
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
}`,ix=`#define STANDARD
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
}`,sx=`#define STANDARD
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
}`,rx=`#define TOON
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
}`,ox=`#define TOON
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
}`,ax=`uniform float size;
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
}`,lx=`uniform vec3 diffuse;
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
}`,cx=`#include <common>
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
}`,ux=`uniform vec3 color;
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
}`,hx=`uniform float rotation;
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
}`,dx=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:D0,alphahash_pars_fragment:N0,alphamap_fragment:U0,alphamap_pars_fragment:F0,alphatest_fragment:O0,alphatest_pars_fragment:B0,aomap_fragment:H0,aomap_pars_fragment:k0,batching_pars_vertex:V0,batching_vertex:z0,begin_vertex:G0,beginnormal_vertex:W0,bsdfs:X0,iridescence_fragment:q0,bumpmap_pars_fragment:Y0,clipping_planes_fragment:Z0,clipping_planes_pars_fragment:K0,clipping_planes_pars_vertex:j0,clipping_planes_vertex:$0,color_fragment:J0,color_pars_fragment:Q0,color_pars_vertex:eg,color_vertex:tg,common:ng,cube_uv_reflection_fragment:ig,defaultnormal_vertex:sg,displacementmap_pars_vertex:rg,displacementmap_vertex:og,emissivemap_fragment:ag,emissivemap_pars_fragment:lg,colorspace_fragment:cg,colorspace_pars_fragment:ug,envmap_fragment:hg,envmap_common_pars_fragment:dg,envmap_pars_fragment:fg,envmap_pars_vertex:pg,envmap_physical_pars_fragment:Tg,envmap_vertex:mg,fog_vertex:gg,fog_pars_vertex:_g,fog_fragment:xg,fog_pars_fragment:yg,gradientmap_pars_fragment:vg,lightmap_pars_fragment:Mg,lights_lambert_fragment:bg,lights_lambert_pars_fragment:Sg,lights_pars_begin:Eg,lights_toon_fragment:wg,lights_toon_pars_fragment:Ag,lights_phong_fragment:Rg,lights_phong_pars_fragment:Cg,lights_physical_fragment:Pg,lights_physical_pars_fragment:Ig,lights_fragment_begin:Lg,lights_fragment_maps:Dg,lights_fragment_end:Ng,lightprobes_pars_fragment:Ug,logdepthbuf_fragment:Fg,logdepthbuf_pars_fragment:Og,logdepthbuf_pars_vertex:Bg,logdepthbuf_vertex:Hg,map_fragment:kg,map_pars_fragment:Vg,map_particle_fragment:zg,map_particle_pars_fragment:Gg,metalnessmap_fragment:Wg,metalnessmap_pars_fragment:Xg,morphinstance_vertex:qg,morphcolor_vertex:Yg,morphnormal_vertex:Zg,morphtarget_pars_vertex:Kg,morphtarget_vertex:jg,normal_fragment_begin:$g,normal_fragment_maps:Jg,normal_pars_fragment:Qg,normal_pars_vertex:e_,normal_vertex:t_,normalmap_pars_fragment:n_,clearcoat_normal_fragment_begin:i_,clearcoat_normal_fragment_maps:s_,clearcoat_pars_fragment:r_,iridescence_pars_fragment:o_,opaque_fragment:a_,packing:l_,premultiplied_alpha_fragment:c_,project_vertex:u_,dithering_fragment:h_,dithering_pars_fragment:d_,roughnessmap_fragment:f_,roughnessmap_pars_fragment:p_,shadowmap_pars_fragment:m_,shadowmap_pars_vertex:g_,shadowmap_vertex:__,shadowmask_pars_fragment:x_,skinbase_vertex:y_,skinning_pars_vertex:v_,skinning_vertex:M_,skinnormal_vertex:b_,specularmap_fragment:S_,specularmap_pars_fragment:E_,tonemapping_fragment:T_,tonemapping_pars_fragment:w_,transmission_fragment:A_,transmission_pars_fragment:R_,uv_pars_fragment:C_,uv_pars_vertex:P_,uv_vertex:I_,worldpos_vertex:L_,background_vert:D_,background_frag:N_,backgroundCube_vert:U_,backgroundCube_frag:F_,cube_vert:O_,cube_frag:B_,depth_vert:H_,depth_frag:k_,distance_vert:V_,distance_frag:z_,equirect_vert:G_,equirect_frag:W_,linedashed_vert:X_,linedashed_frag:q_,meshbasic_vert:Y_,meshbasic_frag:Z_,meshlambert_vert:K_,meshlambert_frag:j_,meshmatcap_vert:$_,meshmatcap_frag:J_,meshnormal_vert:Q_,meshnormal_frag:ex,meshphong_vert:tx,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:sx,meshtoon_vert:rx,meshtoon_frag:ox,points_vert:ax,points_frag:lx,shadow_vert:cx,shadow_frag:ux,sprite_vert:hx,sprite_frag:dx},He={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new S},probesMax:{value:new S},probesResolution:{value:new S}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},Ti={basic:{uniforms:bn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:bn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:bn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:bn([He.common,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.roughnessmap,He.metalnessmap,He.fog,He.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:bn([He.common,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.gradientmap,He.fog,He.lights,{emissive:{value:new tt(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:bn([He.common,He.bumpmap,He.normalmap,He.displacementmap,He.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:bn([He.points,He.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:bn([He.common,He.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:bn([He.common,He.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:bn([He.common,He.bumpmap,He.normalmap,He.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:bn([He.sprite,He.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:bn([He.common,He.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:bn([He.lights,He.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};Ti.physical={uniforms:bn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};var Yl={r:0,b:0,g:0},fx=new ct,Zf=new at;Zf.set(-1,0,0,0,1,0,0,0,1);function px(i,e,t,n,s,r){let o=new tt(0),a=s===!0?0:1,l,c,u=null,d=0,h=null;function f(b){let w=b.isScene===!0?b.background:null;if(w&&w.isTexture){let v=b.backgroundBlurriness>0;w=e.get(w,v)}return w}function m(b){let w=!1,v=f(b);v===null?p(o,a):v&&v.isColor&&(p(v,1),w=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(b,w){let v=f(w);v&&(v.isCubeTexture||v.mapping===Lo)?(c===void 0&&(c=new et(new Mn(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Hs(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(w.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Zf),c.material.toneMapped=xt.getTransfer(v.colorSpace)!==Ct,(u!==v||d!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new et(new cn(2,2),new Wn({name:"BackgroundMaterial",uniforms:Hs(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=xt.getTransfer(v.colorSpace)!==Ct,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,w){b.getRGB(Yl,Tu(i)),t.buffers.color.setClear(Yl.r,Yl.g,Yl.b,w,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,w=1){o.set(b),a=w,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,p(o,a)},render:m,addToRenderList:_,dispose:g}}function mx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(B,O,k,D,G){let $=!1,K=d(B,D,k,O);r!==K&&(r=K,c(r.object)),$=f(B,D,k,G),$&&m(B,D,k,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,v(B,O,k,D),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(B){return i.bindVertexArray(B)}function u(B){return i.deleteVertexArray(B)}function d(B,O,k,D){let G=D.wireframe===!0,$=n[O.id];$===void 0&&($={},n[O.id]=$);let K=B.isInstancedMesh===!0?B.id:0,oe=$[K];oe===void 0&&(oe={},$[K]=oe);let W=oe[k.id];W===void 0&&(W={},oe[k.id]=W);let ie=W[G];return ie===void 0&&(ie=h(l()),W[G]=ie),ie}function h(B){let O=[],k=[],D=[];for(let G=0;G<t;G++)O[G]=0,k[G]=0,D[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:k,attributeDivisors:D,object:B,attributes:{},index:null}}function f(B,O,k,D){let G=r.attributes,$=O.attributes,K=0,oe=k.getAttributes();for(let W in oe)if(oe[W].location>=0){let re=G[W],ve=$[W];if(ve===void 0&&(W==="instanceMatrix"&&B.instanceMatrix&&(ve=B.instanceMatrix),W==="instanceColor"&&B.instanceColor&&(ve=B.instanceColor)),re===void 0||re.attribute!==ve||ve&&re.data!==ve.data)return!0;K++}return r.attributesNum!==K||r.index!==D}function m(B,O,k,D){let G={},$=O.attributes,K=0,oe=k.getAttributes();for(let W in oe)if(oe[W].location>=0){let re=$[W];re===void 0&&(W==="instanceMatrix"&&B.instanceMatrix&&(re=B.instanceMatrix),W==="instanceColor"&&B.instanceColor&&(re=B.instanceColor));let ve={};ve.attribute=re,re&&re.data&&(ve.data=re.data),G[W]=ve,K++}r.attributes=G,r.attributesNum=K,r.index=D}function _(){let B=r.newAttributes;for(let O=0,k=B.length;O<k;O++)B[O]=0}function p(B){g(B,0)}function g(B,O){let k=r.newAttributes,D=r.enabledAttributes,G=r.attributeDivisors;k[B]=1,D[B]===0&&(i.enableVertexAttribArray(B),D[B]=1),G[B]!==O&&(i.vertexAttribDivisor(B,O),G[B]=O)}function b(){let B=r.newAttributes,O=r.enabledAttributes;for(let k=0,D=O.length;k<D;k++)O[k]!==B[k]&&(i.disableVertexAttribArray(k),O[k]=0)}function w(B,O,k,D,G,$,K){K===!0?i.vertexAttribIPointer(B,O,k,G,$):i.vertexAttribPointer(B,O,k,D,G,$)}function v(B,O,k,D){_();let G=D.attributes,$=k.getAttributes(),K=O.defaultAttributeValues;for(let oe in $){let W=$[oe];if(W.location>=0){let ie=G[oe];if(ie===void 0&&(oe==="instanceMatrix"&&B.instanceMatrix&&(ie=B.instanceMatrix),oe==="instanceColor"&&B.instanceColor&&(ie=B.instanceColor)),ie!==void 0){let re=ie.normalized,ve=ie.itemSize,Me=e.get(ie);if(Me===void 0)continue;let Ne=Me.buffer,Ye=Me.type,_e=Me.bytesPerElement,H=Ye===i.INT||Ye===i.UNSIGNED_INT||ie.gpuType===ol;if(ie.isInterleavedBufferAttribute){let R=ie.data,I=R.stride,U=ie.offset;if(R.isInstancedInterleavedBuffer){for(let F=0;F<W.locationSize;F++)g(W.location+F,R.meshPerAttribute);B.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let F=0;F<W.locationSize;F++)p(W.location+F);i.bindBuffer(i.ARRAY_BUFFER,Ne);for(let F=0;F<W.locationSize;F++)w(W.location+F,ve/W.locationSize,Ye,re,I*_e,(U+ve/W.locationSize*F)*_e,H)}else{if(ie.isInstancedBufferAttribute){for(let R=0;R<W.locationSize;R++)g(W.location+R,ie.meshPerAttribute);B.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let R=0;R<W.locationSize;R++)p(W.location+R);i.bindBuffer(i.ARRAY_BUFFER,Ne);for(let R=0;R<W.locationSize;R++)w(W.location+R,ve/W.locationSize,Ye,re,ve*_e,ve/W.locationSize*R*_e,H)}}else if(K!==void 0){let re=K[oe];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(W.location,re);break;case 3:i.vertexAttrib3fv(W.location,re);break;case 4:i.vertexAttrib4fv(W.location,re);break;default:i.vertexAttrib1fv(W.location,re)}}}}b()}function E(){C();for(let B in n){let O=n[B];for(let k in O){let D=O[k];for(let G in D){let $=D[G];for(let K in $)u($[K].object),delete $[K];delete D[G]}}delete n[B]}}function A(B){if(n[B.id]===void 0)return;let O=n[B.id];for(let k in O){let D=O[k];for(let G in D){let $=D[G];for(let K in $)u($[K].object),delete $[K];delete D[G]}}delete n[B.id]}function T(B){for(let O in n){let k=n[O];for(let D in k){let G=k[D];if(G[B.id]===void 0)continue;let $=G[B.id];for(let K in $)u($[K].object),delete $[K];delete G[B.id]}}}function x(B){for(let O in n){let k=n[O],D=B.isInstancedMesh===!0?B.id:0,G=k[D];if(G!==void 0){for(let $ in G){let K=G[$];for(let oe in K)u(K[oe].object),delete K[oe];delete G[$]}delete k[D],Object.keys(k).length===0&&delete n[O]}}}function C(){N(),o=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:N,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function gx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function _x(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==qn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let x=T===di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Bn&&T!==Xn&&!x&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Qe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:v,maxSamples:E,samples:A}}function xx(i){let e=this,t=null,n=0,s=!1,r=!1,o=new vn,a=new at,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,g=i.get(d);if(!s||m===null||m.length===0||r&&!p)r?u(null):c();else{let b=r?0:n,w=b*4,v=g.clippingState||null;l.value=v,v=u(m,h,w,f);for(let E=0;E!==w;++E)v[E]=t[E];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,m){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=f+_*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<g)&&(p=new Float32Array(g));for(let w=0,v=f;w!==_;++w,v+=4)o.copy(d[w]).applyMatrix4(b,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}var Nr=4,yx=6,vx=20,Mx=256,ko=new os,wf=new tt,Nu=null,Uu=0,Fu=0,Ou=!1,bx=new S,ks=new S,Kl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=bx}=r;Nu=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Fu=this._renderer.getActiveMipmapLevel(),Ou=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Nu,Uu,Fu),this._renderer.xr.enabled=Ou,e.scissorTest=!1,Dr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===Os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nu=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Fu=this._renderer.getActiveMipmapLevel(),Ou=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:di,format:qn,colorSpace:wn,depthBuffer:!1},s=Af(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Af(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Sx(r)),this._blurMaterial=Tx(r,e,t),this._ggxMaterial=Ex(r,e,t)}return s}_compileMaterial(e){let t=new et(new wt,e);this._renderer.compile(t,ko)}_sceneToCubeUV(e,t,n,s,r){let l=new nn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(wf),d.toneMapping=ci,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new et(new Mn,new oi({name:"PMREM.Background",side:An,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,p=_.material,g=!1,b=e.background;b?b.isColor&&(p.color.copy(b),e.background=null,g=!0):(p.color.copy(wf),g=!0);for(let w=0;w<6;w++){let v=w%3;v===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[w],r.y,r.z)):v===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[w]));let E=this._cubeSize;Dr(s,v*E,w>2?E:0,E,E),d.setRenderTarget(s),g&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===us||e.mapping===Os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Dr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ko)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,f=d*h,{_lodMax:m}=this,_=this._sizeLods[n],p=3*_*(n>m-Nr?n-m+Nr:0),g=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,Dr(r,p,g,3*_,2*_),s.setRenderTarget(r),s.render(a,ko),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,Dr(e,p,g,3*_,2*_),s.setRenderTarget(e),s.render(a,ko)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Nr?s-this._lodMax+Nr:0),h=4*(this._cubeSize-u);Dr(t,d,h,3*u,2*u),o.setRenderTarget(t),o.render(l,ko)}};function Sx(i){let e=[],t=[],n=i,s=i-Nr+1+yx;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),l=-a,c=1+a,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,f=3,m=new Float32Array(f*h*d),_=new Float32Array(f*h*d);for(let g=0;g<d;g++){let b=g%3*2/3-1,w=g>2?0:-1,v=[b,w,0,b+2/3,w,0,b+2/3,w+1,0,b,w,0,b+2/3,w+1,0,b,w+1,0];m.set(v,f*h*g);for(let E=0;E<h;E++){let A=u[E*2]*2-1,T=u[E*2+1]*2-1;g===0?ks.set(1,T,A):g===1?ks.set(-A,1,-T):g===2?ks.set(-A,T,1):g===3?ks.set(-1,T,-A):g===4?ks.set(-A,-1,T):ks.set(A,T,-1),ks.toArray(_,(g*h+E)*f)}}let p=new wt;p.setAttribute("position",new $t(m,f)),p.setAttribute("outputDirection",new $t(_,f)),t.push(new et(p,null)),n>Nr&&n--}return{lodMeshes:t,sizeLods:e}}function Af(i,e,t){let n=new Dn(i,e,t);return n.texture.mapping=Lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Dr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ex(i,e,t){return new Wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Mx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Tx(i,e,t){return new Wn({name:"SphericalGaussianBlur",defines:{SAMPLES:vx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Jl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Rf(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Cf(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Jl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var jl=class extends Dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Mn(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:Hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:An,blending:Si});r.uniforms.tEquirect.value=t;let o=new et(s,r),a=t.minFilter;return t.minFilter===ui&&(t.minFilter=Qt),new Ja(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function wx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?o(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===il||f===sl)if(e.has(h)){let m=e.get(h).texture;return a(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let _=new jl(m.height);return _.fromEquirectangularTexture(i,h),e.set(h,_),h.addEventListener("dispose",c),a(_.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let f=h.mapping,m=f===il||f===sl,_=f===us||f===Os;if(m||_){let p=t.get(h),g=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return n===null&&(n=new Kl(i)),p=m?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let b=h.image;return m&&b&&b.height>0||_&&b&&l(b)?(n===null&&(n=new Kl(i)),p=m?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function a(h,f){return f===il?h.mapping=us:f===sl&&(h.mapping=Os),h}function l(h){let f=0,m=6;for(let _=0;_<m;_++)h[_]!==void 0&&f++;return f===m}function c(h){let f=h.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Ax(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&bs("WebGLRenderer: "+n+" extension not supported."),s}}}function Rx(i,e,t,n){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,m=d.attributes.position,_=0;if(m===void 0)return;if(f!==null){let b=f.array;_=f.version;for(let w=0,v=b.length;w<v;w+=3){let E=b[w+0],A=b[w+1],T=b[w+2];h.push(E,A,A,T,T,E)}}else{let b=m.array;_=m.version;for(let w=0,v=b.length/3-1;w<v;w+=3){let E=w+0,A=w+1,T=w+2;h.push(E,A,A,T,T,E)}}let p=new(m.count>=65535?ao:ws)(h,1);p.version=_;let g=r.get(d);g&&e.remove(g),r.set(d,p)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Cx(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,h){i.drawElements(n,h,r,d*o),t.update(h,n,1)}function c(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,d*o,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let _=0;for(let p=0;p<f;p++)_+=h[p];t.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Px(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:it("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Ix(i,e,t){let n=new WeakMap,s=new It;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let C=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",C)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],w=0;f===!0&&(w=1),m===!0&&(w=2),_===!0&&(w=3);let v=a.attributes.position.count*w,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let A=new Float32Array(v*E*4*d),T=new ro(A,v,E,d);T.type=Xn,T.needsUpdate=!0;let x=w*4;for(let N=0;N<d;N++){let B=p[N],O=g[N],k=b[N],D=v*E*4*N;for(let G=0;G<B.count;G++){let $=G*x;f===!0&&(s.fromBufferAttribute(B,G),A[D+$+0]=s.x,A[D+$+1]=s.y,A[D+$+2]=s.z,A[D+$+3]=0),m===!0&&(s.fromBufferAttribute(O,G),A[D+$+4]=s.x,A[D+$+5]=s.y,A[D+$+6]=s.z,A[D+$+7]=0),_===!0&&(s.fromBufferAttribute(k,G),A[D+$+8]=s.x,A[D+$+9]=s.y,A[D+$+10]=s.z,A[D+$+11]=k.itemSize===4?s.w:1)}}h={count:d,texture:T,size:new be(v,E)},n.set(a,h),a.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Lx(i,e,t,n,s){let r=new WeakMap;function o(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function a(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var Dx={[au]:"LINEAR_TONE_MAPPING",[lu]:"REINHARD_TONE_MAPPING",[cu]:"CINEON_TONE_MAPPING",[Io]:"ACES_FILMIC_TONE_MAPPING",[hu]:"AGX_TONE_MAPPING",[du]:"NEUTRAL_TONE_MAPPING",[uu]:"CUSTOM_TONE_MAPPING"};function Nx(i,e,t,n,s,r){let o=new Dn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new wt;c.setAttribute("position",new ut([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ut([0,2,0,0,2,0],2));let u=new Ga({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new et(c,u),h=new os(-1,1,1,-1,0,1),f=null,m=null,_=!1,p,g=null,b=[],w=!1;this.setSize=function(v,E){o.setSize(v,E),a!==null&&a.setSize(v,E),l!==null&&l.setSize(v,E);for(let A=0;A<b.length;A++){let T=b[A];T.setSize&&T.setSize(v,E)}},this.setEffects=function(v){b=v,w=b.length>0&&b[0].isRenderPass===!0;let E=o.width,A=o.height;b.length>0&&a===null&&(a=new Dn(E,A,{type:di,depthBuffer:!1,stencilBuffer:!1}),l=new Dn(E,A,{type:di,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<b.length;T++){let x=b[T];x.setSize&&x.setSize(E,A)}},this.begin=function(v,E){if(_||v.toneMapping===ci&&b.length===0)return!1;if(g=E,E!==null){let A=E.width,T=E.height;(o.width!==A||o.height!==T)&&this.setSize(A,T)}return w===!1&&v.setRenderTarget(o),p=v.toneMapping,v.toneMapping=ci,!0},this.hasRenderPass=function(){return w},this.end=function(v,E){v.toneMapping=p,_=!0;let A=o,T=a;for(let x=0;x<b.length;x++){let C=b[x];C.enabled!==!1&&(C.render(v,T,A,E),C.needsSwap!==!1&&(A=T,T=T===a?l:a))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,u.defines={},xt.getTransfer(f)===Ct&&(u.defines.SRGB_TRANSFER="");let x=Dx[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,v.setRenderTarget(g),v.render(d,h),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var Kf=new sn,ku=new ss(1,1),jf=new ro,$f=new Na,Jf=new fo,Pf=[],If=[],Lf=new Float32Array(16),Df=new Float32Array(9),Nf=new Float32Array(4);function Fr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Pf[s];if(r===void 0&&(r=new Float32Array(s),Pf[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function rn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ql(i,e){let t=If[e];t===void 0&&(t=new Int32Array(e),If[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ux(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function Ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function Hx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(rn(t,n))return;Nf.set(n),i.uniformMatrix2fv(this.addr,!1,Nf),on(t,n)}}function kx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(rn(t,n))return;Df.set(n),i.uniformMatrix3fv(this.addr,!1,Df),on(t,n)}}function Vx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(rn(t,n))return;Lf.set(n),i.uniformMatrix4fv(this.addr,!1,Lf),on(t,n)}}function zx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function Xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function qx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function Zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function Kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function jx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ku.compareFunction=t.isReversedDepthBuffer()?ql:Xl,r=ku):r=Kf,t.setTexture2D(e||r,s)}function $x(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||$f,s)}function Jx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Jf,s)}function Qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||jf,s)}function ey(i){switch(i){case 5126:return Ux;case 35664:return Fx;case 35665:return Ox;case 35666:return Bx;case 35674:return Hx;case 35675:return kx;case 35676:return Vx;case 5124:case 35670:return zx;case 35667:case 35671:return Gx;case 35668:case 35672:return Wx;case 35669:case 35673:return Xx;case 5125:return qx;case 36294:return Yx;case 36295:return Zx;case 36296:return Kx;case 35678:case 36198:case 36298:case 36306:case 35682:return jx;case 35679:case 36299:case 36307:return $x;case 35680:case 36300:case 36308:case 36293:return Jx;case 36289:case 36303:case 36311:case 36292:return Qx}}function ty(i,e){i.uniform1fv(this.addr,e)}function ny(i,e){let t=Fr(e,this.size,2);i.uniform2fv(this.addr,t)}function iy(i,e){let t=Fr(e,this.size,3);i.uniform3fv(this.addr,t)}function sy(i,e){let t=Fr(e,this.size,4);i.uniform4fv(this.addr,t)}function ry(i,e){let t=Fr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function oy(i,e){let t=Fr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ay(i,e){let t=Fr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ly(i,e){i.uniform1iv(this.addr,e)}function cy(i,e){i.uniform2iv(this.addr,e)}function uy(i,e){i.uniform3iv(this.addr,e)}function hy(i,e){i.uniform4iv(this.addr,e)}function dy(i,e){i.uniform1uiv(this.addr,e)}function fy(i,e){i.uniform2uiv(this.addr,e)}function py(i,e){i.uniform3uiv(this.addr,e)}function my(i,e){i.uniform4uiv(this.addr,e)}function gy(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=ku:o=Kf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function _y(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||$f,r[o])}function xy(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Jf,r[o])}function yy(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||jf,r[o])}function vy(i){switch(i){case 5126:return ty;case 35664:return ny;case 35665:return iy;case 35666:return sy;case 35674:return ry;case 35675:return oy;case 35676:return ay;case 5124:case 35670:return ly;case 35667:case 35671:return cy;case 35668:case 35672:return uy;case 35669:case 35673:return hy;case 5125:return dy;case 36294:return fy;case 36295:return py;case 36296:return my;case 35678:case 36198:case 36298:case 36306:case 35682:return gy;case 35679:case 36299:case 36307:return _y;case 35680:case 36300:case 36308:case 36293:return xy;case 36289:case 36303:case 36311:case 36292:return yy}}var Vu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ey(t.type)}},zu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vy(t.type)}},Gu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Bu=/(\w+)(\])?(\[|\.)?/g;function Uf(i,e){i.seq.push(e),i.map[e.id]=e}function My(i,e,t){let n=i.name,s=n.length;for(Bu.lastIndex=0;;){let r=Bu.exec(n),o=Bu.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Uf(t,c===void 0?new Vu(a,i,e):new zu(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Gu(a),Uf(t,d)),t=d}}}var Ur=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);My(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Ff(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var by=37297,Sy=0;function Ey(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Of=new at;function Ty(i){xt._getMatrix(Of,xt.workingColorSpace,i);let e=`mat3( ${Of.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(i)){case io:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Bf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Ey(i.getShaderSource(e),a)}else return r}function wy(i,e){let t=Ty(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Ay={[au]:"Linear",[lu]:"Reinhard",[cu]:"Cineon",[Io]:"ACESFilmic",[hu]:"AgX",[du]:"Neutral",[uu]:"Custom"};function Ry(i,e){let t=Ay[e];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Zl=new S;function Cy(){xt.getLuminanceCoefficients(Zl);let i=Zl.x.toFixed(4),e=Zl.y.toFixed(4),t=Zl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Py(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zo).join(`
`)}function Iy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ly(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function zo(i){return i!==""}function Hf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Dy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wu(i){return i.replace(Dy,Uy)}var Ny=new Map;function Uy(i,e){let t=dt[e];if(t===void 0){let n=Ny.get(e);if(n!==void 0)t=dt[n],Qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Wu(t)}var Fy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vf(i){return i.replace(Fy,Oy)}function Oy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var By={[Us]:"SHADOWMAP_TYPE_PCF",[Ar]:"SHADOWMAP_TYPE_VSM"};function Hy(i){return By[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ky={[us]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE",[Lo]:"ENVMAP_TYPE_CUBE_UV"};function Vy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ky[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var zy={[Os]:"ENVMAP_MODE_REFRACTION"};function Gy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":zy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Wy={[ou]:"ENVMAP_BLENDING_MULTIPLY",[$d]:"ENVMAP_BLENDING_MIX",[Jd]:"ENVMAP_BLENDING_ADD"};function Xy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Wy[i.combine]||"ENVMAP_BLENDING_NONE"}function qy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Yy(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Hy(t),c=Vy(t),u=Gy(t),d=Xy(t),h=qy(t),f=Py(t),m=Iy(r),_=s.createProgram(),p,g,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zo).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zo).join(`
`),g.length>0&&(g+=`
`)):(p=[zf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zo).join(`
`),g=[zf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ci?"#define TONE_MAPPING":"",t.toneMapping!==ci?dt.tonemapping_pars_fragment:"",t.toneMapping!==ci?Ry("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,wy("linearToOutputTexel",t.outputColorSpace),Cy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zo).join(`
`)),o=Wu(o),o=Hf(o,t),o=kf(o,t),a=Wu(a),a=Hf(a,t),a=kf(a,t),o=Vf(o),a=Vf(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===bu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let w=b+p+o,v=b+g+a,E=Ff(s,s.VERTEX_SHADER,w),A=Ff(s,s.FRAGMENT_SHADER,v);s.attachShader(_,E),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(B){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(E)||"",D=s.getShaderInfoLog(A)||"",G=O.trim(),$=k.trim(),K=D.trim(),oe=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(oe=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,A);else{let ie=Bf(s,E,"vertex"),re=Bf(s,A,"fragment");it("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+G+`
`+ie+`
`+re)}else G!==""?Qe("WebGLProgram: Program Info Log:",G):($===""||K==="")&&(W=!1);W&&(B.diagnostics={runnable:oe,programLog:G,vertexShader:{log:$,prefix:p},fragmentShader:{log:K,prefix:g}})}s.deleteShader(E),s.deleteShader(A),x=new Ur(s,_),C=Ly(s,_)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let C;this.getAttributes=function(){return C===void 0&&T(this),C};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(_,by)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=A,this}var Zy=0,Xu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new qu(e),t.set(e,n)),n}},qu=class{constructor(e){this.id=Zy++,this.code=e,this.usedTimes=0}};function Ky(i){return i===ds||i===Oo||i===Bo}function jy(i,e,t,n,s,r){let o=new dr,a=new Xu,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,C,N,B,O,k){let D=B.fog,G=O.geometry,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?B.environment:null,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,oe=e.get(x.envMap||$,K),W=oe&&oe.mapping===Lo?oe.image.height:null,ie=f[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&Qe("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let re=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ve=re!==void 0?re.length:0,Me=0;G.morphAttributes.position!==void 0&&(Me=1),G.morphAttributes.normal!==void 0&&(Me=2),G.morphAttributes.color!==void 0&&(Me=3);let Ne,Ye,_e,H;if(ie){let L=Ti[ie];Ne=L.vertexShader,Ye=L.fragmentShader}else{Ne=x.vertexShader,Ye=x.fragmentShader;let L=a.getVertexShaderStage(x),le=a.getFragmentShaderStage(x);a.update(x,L,le),_e=L.id,H=le.id}let R=i.getRenderTarget(),I=i.state.buffers.depth.getReversed(),U=O.isInstancedMesh===!0,F=O.isBatchedMesh===!0,J=!!x.map,fe=!!x.matcap,q=!!oe,te=!!x.aoMap,ne=!!x.lightMap,pe=!!x.bumpMap&&x.wireframe===!1,ce=!!x.normalMap,Oe=!!x.displacementMap,Fe=!!x.emissiveMap,Ee=!!x.metalnessMap,ke=!!x.roughnessMap,z=x.anisotropy>0,ft=x.clearcoat>0,st=x.dispersion>0,P=x.retroreflectivity>0,y=x.iridescence>0,Y=x.sheen>0,ee=x.transmission>0,ae=z&&!!x.anisotropyMap,Se=ft&&!!x.clearcoatMap,Te=ft&&!!x.clearcoatNormalMap,ue=ft&&!!x.clearcoatRoughnessMap,ge=y&&!!x.iridescenceMap,Ae=y&&!!x.iridescenceThicknessMap,Xe=Y&&!!x.sheenColorMap,Le=Y&&!!x.sheenRoughnessMap,Pe=!!x.specularMap,qe=!!x.specularColorMap,Je=!!x.specularIntensityMap,nt=ee&&!!x.transmissionMap,X=ee&&!!x.thicknessMap,Re=!!x.gradientMap,me=!!x.alphaMap,Ce=x.alphaTest>0,Be=!!x.alphaHash,ye=!!x.extensions,he=ci;x.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(he=i.toneMapping);let xe={shaderID:ie,shaderType:x.type,shaderName:x.name,vertexShader:Ne,fragmentShader:Ye,defines:x.defines,customVertexShaderID:_e,customFragmentShaderID:H,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:F,batchingColor:F&&O._colorsTexture!==null,instancing:U,instancingColor:U&&O.instanceColor!==null,instancingMorph:U&&O.morphTexture!==null,outputColorSpace:R===null?i.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:xt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:J,matcap:fe,envMap:q,envMapMode:q&&oe.mapping,envMapCubeUVHeight:W,aoMap:te,lightMap:ne,bumpMap:pe,normalMap:ce,displacementMap:Oe,emissiveMap:Fe,normalMapObjectSpace:ce&&x.normalMapType===of,normalMapTangentSpace:ce&&x.normalMapType===Wl,packedNormalMap:ce&&x.normalMapType===Wl&&Ky(x.normalMap.format),metalnessMap:Ee,roughnessMap:ke,anisotropy:z,anisotropyMap:ae,clearcoat:ft,clearcoatMap:Se,clearcoatNormalMap:Te,clearcoatRoughnessMap:ue,dispersion:st,retroreflection:P,iridescence:y,iridescenceMap:ge,iridescenceThicknessMap:Ae,sheen:Y,sheenColorMap:Xe,sheenRoughnessMap:Le,specularMap:Pe,specularColorMap:qe,specularIntensityMap:Je,transmission:ee,transmissionMap:nt,thicknessMap:X,gradientMap:Re,opaque:x.transparent===!1&&x.blending===Rr&&x.alphaToCoverage===!1,alphaMap:me,alphaTest:Ce,alphaHash:Be,combine:x.combine,mapUv:J&&m(x.map.channel),aoMapUv:te&&m(x.aoMap.channel),lightMapUv:ne&&m(x.lightMap.channel),bumpMapUv:pe&&m(x.bumpMap.channel),normalMapUv:ce&&m(x.normalMap.channel),displacementMapUv:Oe&&m(x.displacementMap.channel),emissiveMapUv:Fe&&m(x.emissiveMap.channel),metalnessMapUv:Ee&&m(x.metalnessMap.channel),roughnessMapUv:ke&&m(x.roughnessMap.channel),anisotropyMapUv:ae&&m(x.anisotropyMap.channel),clearcoatMapUv:Se&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:Te&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Le&&m(x.sheenRoughnessMap.channel),specularMapUv:Pe&&m(x.specularMap.channel),specularColorMapUv:qe&&m(x.specularColorMap.channel),specularIntensityMapUv:Je&&m(x.specularIntensityMap.channel),transmissionMapUv:nt&&m(x.transmissionMap.channel),thicknessMapUv:X&&m(x.thicknessMap.channel),alphaMapUv:me&&m(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ce||z),vertexNormals:!!G.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(J||me),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||G.attributes.normal===void 0&&ce===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:I,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Me,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:J&&x.map.isVideoTexture===!0&&xt.getTransfer(x.map.colorSpace)===Ct,decodeVideoTextureEmissive:Fe&&x.emissiveMap.isVideoTexture===!0&&xt.getTransfer(x.emissiveMap.colorSpace)===Ct,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Vt,flipSided:x.side===An,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ye&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&x.extensions.multiDraw===!0||F)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return xe.vertexUv1s=l.has(1),xe.vertexUv2s=l.has(2),xe.vertexUv3s=l.has(3),l.clear(),xe}function p(x){let C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)C.push(N),C.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(g(C,x),b(C,x),C.push(i.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function g(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numSunLights),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numSunLightShadows),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function b(x,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.retroreflection&&o.enable(24),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),C.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function w(x){let C=f[x.type],N;if(C){let B=Ti[C];N=Sf.clone(B.uniforms)}else N=x.uniforms;return N}function v(x,C){let N=u.get(C);return N!==void 0?++N.usedTimes:(N=new Yy(i,C,x,s),c.push(N),u.set(C,N)),N}function E(x){if(--x.usedTimes===0){let C=c.indexOf(x);c[C]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function A(x){a.remove(x)}function T(){a.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:w,acquireProgram:v,releaseProgram:E,releaseShaderCache:A,programs:c,dispose:T}}function $y(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Jy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Gf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Wf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,m,_,p,g){let b=i[e];return b===void 0?(b={id:h.id,object:h,geometry:f,material:m,materialVariant:o(h),groupOrder:_,renderOrder:h.renderOrder,z:p,group:g},i[e]=b):(b.id=h.id,b.object=h,b.geometry=f,b.material=m,b.materialVariant=o(h),b.groupOrder=_,b.renderOrder=h.renderOrder,b.z=p,b.group=g),e++,b}function l(h,f,m,_,p,g,b){b.reversedDepth===!0&&(p=-p);let w=a(h,f,m,_,p,g);m.transmission>0?n.push(w):m.transparent===!0?s.push(w):t.push(w)}function c(h,f,m,_,p,g){let b=a(h,f,m,_,p,g);m.transmission>0?n.unshift(b):m.transparent===!0?s.unshift(b):t.unshift(b)}function u(h,f){t.length>1&&t.sort(h||Jy),n.length>1&&n.sort(f||Gf),s.length>1&&s.sort(f||Gf)}function d(){for(let h=e,f=i.length;h<f;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function Qy(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Wf,i.set(n,[o])):s>=r.length?(o=new Wf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function ev(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new S,color:new tt};break;case"SpotLight":t={position:new S,direction:new S,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new S,halfWidth:new S,halfHeight:new S};break}return i[e.id]=t,t}}}function tv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var nv=0;function iv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function sv(i){let e=new ev,t=tv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new S);let s=new S,r=new ct,o=new ct;function a(c){let u=0,d=0,h=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,b=0,w=0,v=0,E=0,A=0,T=0,x=0,C=0,N=0;c.sort(iv);for(let O=0,k=c.length;O<k;O++){let D=c[O],G=D.color,$=D.intensity,K=D.distance,oe=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ds?oe=D.shadow.map.texture:oe=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=G.r*$,d+=G.g*$,h+=G.b*$;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],$);N++}else if(D.isSunLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let ie=D.shadow,re=t.get(D);re.shadowIntensity=ie.intensity,re.shadowBias=ie.bias,re.shadowNormalBias=ie.normalBias,re.shadowRadius=ie.radius,re.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),n.sunShadow[m]=re,n.sunShadowMap[m]=oe;let ve=ie.getViewportCount();for(let Me=0;Me<ve;Me++)n.sunShadowMatrix[_+Me]=ie.getMatrix(Me),n.sunShadowCascade[_+Me]=ie._cascadeData[Me];_+=ve,m++}n.sun[f]=W,f++}else if(D.isDirectionalLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let ie=D.shadow,re=t.get(D);re.shadowIntensity=ie.intensity,re.shadowBias=ie.bias,re.shadowNormalBias=ie.normalBias,re.shadowRadius=ie.radius,re.shadowMapSize=ie.mapSize,n.directionalShadow[p]=re,n.directionalShadowMap[p]=oe,n.directionalShadowMatrix[p]=D.shadow.matrix,E++}n.directional[p]=W,p++}else if(D.isSpotLight){let W=e.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(G).multiplyScalar($),W.distance=K,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[b]=W;let ie=D.shadow;if(D.map&&(n.spotLightMap[x]=D.map,x++,ie.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[b]=ie.matrix,D.castShadow){let re=t.get(D);re.shadowIntensity=ie.intensity,re.shadowBias=ie.bias,re.shadowNormalBias=ie.normalBias,re.shadowRadius=ie.radius,re.shadowMapSize=ie.mapSize,n.spotShadow[b]=re,n.spotShadowMap[b]=oe,T++}b++}else if(D.isRectAreaLight){let W=e.get(D);W.color.copy(G).multiplyScalar($),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),n.rectArea[w]=W,w++}else if(D.isPointLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){let ie=D.shadow,re=t.get(D);re.shadowIntensity=ie.intensity,re.shadowBias=ie.bias,re.shadowNormalBias=ie.normalBias,re.shadowRadius=ie.radius,re.shadowMapSize=ie.mapSize,re.shadowCameraNear=ie.camera.near,re.shadowCameraFar=ie.camera.far,n.pointShadow[g]=re,n.pointShadowMap[g]=oe,n.pointShadowMatrix[g]=D.shadow.matrix,A++}n.point[g]=W,g++}else if(D.isHemisphereLight){let W=e.get(D);W.skyColor.copy(D.color).multiplyScalar($),W.groundColor.copy(D.groundColor).multiplyScalar($),n.hemi[v]=W,v++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=He.LTC_FLOAT_1,n.rectAreaLTC2=He.LTC_FLOAT_2):(n.rectAreaLTC1=He.LTC_HALF_1,n.rectAreaLTC2=He.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let B=n.hash;(B.sunLength!==f||B.directionalLength!==p||B.pointLength!==g||B.spotLength!==b||B.rectAreaLength!==w||B.hemiLength!==v||B.numSunShadows!==m||B.numDirectionalShadows!==E||B.numPointShadows!==A||B.numSpotShadows!==T||B.numSpotMaps!==x||B.numLightProbes!==N)&&(n.sun.length=f,n.directional.length=p,n.spot.length=b,n.rectArea.length=w,n.point.length=g,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+x-C,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=N,B.sunLength=f,B.directionalLength=p,B.pointLength=g,B.spotLength=b,B.rectAreaLength=w,B.hemiLength=v,B.numSunShadows=m,B.numDirectionalShadows=E,B.numPointShadows=A,B.numSpotShadows=T,B.numSpotMaps=x,B.numLightProbes=N,n.version=nv++)}function l(c,u){let d=0,h=0,f=0,m=0,_=0,p=0,g=u.matrixWorldInverse;for(let b=0,w=c.length;b<w;b++){let v=c[b];if(v.isSunLight){let E=n.sun[d];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(g),d++}else if(v.isDirectionalLight){let E=n.directional[h];E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),h++}else if(v.isSpotLight){let E=n.spot[m];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let E=n.rectArea[_];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let E=n.hemi[p];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(g),p++}}}return{setup:a,setupView:l,state:n}}function Xf(i){let e=new sv(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function o(h){t.push(h)}function a(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function rv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Xf(i),e.set(s,[a])):r>=o.length?(a=new Xf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var ov=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,av=`uniform sampler2D shadow_pass;
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
}`,lv=[new S(1,0,0),new S(-1,0,0),new S(0,1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1)],cv=[new S(0,-1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1),new S(0,-1,0),new S(0,-1,0)],qf=new ct,Vo=new S,Hu=new S;function uv(i,e,t){let n=new xr,s=new be,r=new be,o=new It,a=new Wa,l=new Xa,c={},u=t.maxTextureSize,d={[Qn]:An,[An]:Qn,[Vt]:Vt},h=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:ov,fragmentShader:av}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new wt;m.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new et(m,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Us;let g=this.type;this.render=function(A,T,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;this.type===Ld&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Us);let C=i.getRenderTarget(),N=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Si),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let k=g!==this.type;k&&T.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(G=>G.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,G=A.length;D<G;D++){let $=A[D],K=$.shadow;if(K===void 0){Qe("WebGLShadowMap:",$,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let oe=K.getFrameExtents();s.multiply(oe),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/oe.x),s.x=r.x*oe.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/oe.y),s.y=r.y*oe.y,K.mapSize.y=r.y));let W=i.state.buffers.depth.getReversed();if(K.camera._reversedDepth=W,K.map===null||k===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Ar){if($.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Dn(s.x,s.y,{format:ds,type:di,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),K.map.texture.name=$.name+".shadowMap",K.map.depthTexture=new ss(s.x,s.y,Xn),K.map.depthTexture.name=$.name+".shadowMapDepth",K.map.depthTexture.format=_i,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Jt,K.map.depthTexture.magFilter=Jt}else $.isPointLight?(K.map=new jl(s.x),K.map.depthTexture=new Oa(s.x,hi)):(K.map=new Dn(s.x,s.y),K.map.depthTexture=new ss(s.x,s.y,hi)),K.map.depthTexture.name=$.name+".shadowMap",K.map.depthTexture.format=_i,this.type===Us?(K.map.depthTexture.compareFunction=W?ql:Xl,K.map.depthTexture.minFilter=Qt,K.map.depthTexture.magFilter=Qt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Jt,K.map.depthTexture.magFilter=Jt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);let ie=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();$.isPointLight!==!0&&K.updateMatrices($,x);for(let re=0;re<ie;re++){let ve=K.getCamera(re);if($.isPointLight){let Me=K.camera,Ne=K.matrix,Ye=$.distance||Me.far;Ye!==Me.far&&(Me.far=Ye,Me.updateProjectionMatrix()),Vo.setFromMatrixPosition($.matrixWorld),Me.position.copy(Vo),Hu.copy(Me.position),Hu.add(lv[re]),Me.up.copy(cv[re]),Me.lookAt(Hu),Me.updateMatrixWorld(),Ne.makeTranslation(-Vo.x,-Vo.y,-Vo.z),qf.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),K._frustum.setFromProjectionMatrix(qf,Me.coordinateSystem,Me.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)i.setRenderTarget(K.map,re),i.clear();else{re===0&&(i.setRenderTarget(K.map),i.clear());let Me=K.getViewport(re);o.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),O.viewport(o)}n=K.getFrustum(re),v(T,x,ve,$,this.type)}K.isPointLightShadow!==!0&&this.type===Ar&&b(K,x),K.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(C,N,B)};function b(A,T){let x=e.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null?A.mapPass=new Dn(s.x,s.y,{format:ds,type:di}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(T,null,x,h,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(T,null,x,f,_,null)}function w(A,T,x,C){let N=null,B=x.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(B!==void 0)N=B;else if(N=x.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let O=N.uuid,k=T.uuid,D=c[O];D===void 0&&(D={},c[O]=D);let G=D[k];G===void 0&&(G=N.clone(),D[k]=G,T.addEventListener("dispose",E)),N=G}if(N.visible=T.visible,N.wireframe=T.wireframe,C===Ar?N.side=T.shadowSide!==null?T.shadowSide:T.side:N.side=T.shadowSide!==null?T.shadowSide:d[T.side],N.alphaMap=T.alphaMap,N.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,N.map=T.map,N.clipShadows=T.clipShadows,N.clippingPlanes=T.clippingPlanes,N.clipIntersection=T.clipIntersection,N.displacementMap=T.displacementMap,N.displacementScale=T.displacementScale,N.displacementBias=T.displacementBias,N.wireframeLinewidth=T.wireframeLinewidth,N.linewidth=T.linewidth,x.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let O=i.properties.get(N);O.light=x}return N}function v(A,T,x,C,N){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&N===Ar)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,A.matrixWorld);let k=e.update(A),D=A.material;if(Array.isArray(D)){let G=k.groups;for(let $=0,K=G.length;$<K;$++){let oe=G[$],W=D[oe.materialIndex];if(W&&W.visible){let ie=w(A,W,C,N);A.onBeforeShadow(i,A,T,x,k,ie,oe),i.renderBufferDirect(x,null,k,ie,A,oe),A.onAfterShadow(i,A,T,x,k,ie,oe)}}}else if(D.visible){let G=w(A,D,C,N);A.onBeforeShadow(i,A,T,x,k,G,null),i.renderBufferDirect(x,null,k,G,A,null),A.onAfterShadow(i,A,T,x,k,G,null)}}let O=A.children;for(let k=0,D=O.length;k<D;k++)v(O[k],T,x,C,N)}function E(A){A.target.removeEventListener("dispose",E);for(let x in c){let C=c[x],N=A.target.uuid;N in C&&(C[N].dispose(),delete C[N])}}}function hv(i,e){function t(){let X=!1,Re=new It,me=null,Ce=new It(0,0,0,0);return{setMask:function(Be){me!==Be&&!X&&(i.colorMask(Be,Be,Be,Be),me=Be)},setLocked:function(Be){X=Be},setClear:function(Be,ye,he,xe,L){L===!0&&(Be*=xe,ye*=xe,he*=xe),Re.set(Be,ye,he,xe),Ce.equals(Re)===!1&&(i.clearColor(Be,ye,he,xe),Ce.copy(Re))},reset:function(){X=!1,me=null,Ce.set(-1,0,0,0)}}}function n(){let X=!1,Re=!1,me=null,Ce=null,Be=null;return{setReversed:function(ye){if(Re!==ye){let he=e.get("EXT_clip_control");ye?he.clipControlEXT(he.LOWER_LEFT_EXT,he.ZERO_TO_ONE_EXT):he.clipControlEXT(he.LOWER_LEFT_EXT,he.NEGATIVE_ONE_TO_ONE_EXT),Re=ye;let xe=Be;Be=null,this.setClear(xe)}},getReversed:function(){return Re},setTest:function(ye){ye?R(i.DEPTH_TEST):I(i.DEPTH_TEST)},setMask:function(ye){me!==ye&&!X&&(i.depthMask(ye),me=ye)},setFunc:function(ye){if(Re&&(ye=_f[ye]),Ce!==ye){switch(ye){case Ta:i.depthFunc(i.NEVER);break;case wa:i.depthFunc(i.ALWAYS);break;case Aa:i.depthFunc(i.LESS);break;case or:i.depthFunc(i.LEQUAL);break;case Ra:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Pa:i.depthFunc(i.GREATER);break;case Ia:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ce=ye}},setLocked:function(ye){X=ye},setClear:function(ye){Be!==ye&&(Be=ye,Re&&(ye=1-ye),i.clearDepth(ye))},reset:function(){X=!1,me=null,Ce=null,Be=null,Re=!1}}}function s(){let X=!1,Re=null,me=null,Ce=null,Be=null,ye=null,he=null,xe=null,L=null;return{setTest:function(le){X||(le?R(i.STENCIL_TEST):I(i.STENCIL_TEST))},setMask:function(le){Re!==le&&!X&&(i.stencilMask(le),Re=le)},setFunc:function(le,de,Ze){(me!==le||Ce!==de||Be!==Ze)&&(i.stencilFunc(le,de,Ze),me=le,Ce=de,Be=Ze)},setOp:function(le,de,Ze){(ye!==le||he!==de||xe!==Ze)&&(i.stencilOp(le,de,Ze),ye=le,he=de,xe=Ze)},setLocked:function(le){X=le},setClear:function(le){L!==le&&(i.clearStencil(le),L=le)},reset:function(){X=!1,Re=null,me=null,Ce=null,Be=null,ye=null,he=null,xe=null,L=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],_=null,p=!1,g=null,b=null,w=null,v=null,E=null,A=null,T=null,x=new tt(0,0,0),C=0,N=!1,B=null,O=null,k=null,D=null,G=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,oe=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(W)[1]),K=oe>=1):W.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),K=oe>=2);let ie=null,re={},ve=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),Ne=new It().fromArray(ve),Ye=new It().fromArray(Me);function _e(X,Re,me,Ce){let Be=new Uint8Array(4),ye=i.createTexture();i.bindTexture(X,ye),i.texParameteri(X,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(X,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let he=0;he<me;he++)X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?i.texImage3D(Re,0,i.RGBA,1,1,Ce,0,i.RGBA,i.UNSIGNED_BYTE,Be):i.texImage2D(Re+he,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Be);return ye}let H={};H[i.TEXTURE_2D]=_e(i.TEXTURE_2D,i.TEXTURE_2D,1),H[i.TEXTURE_CUBE_MAP]=_e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[i.TEXTURE_2D_ARRAY]=_e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),H[i.TEXTURE_3D]=_e(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),R(i.DEPTH_TEST),o.setFunc(or),pe(!1),ce(eu),R(i.CULL_FACE),te(Si);function R(X){u[X]!==!0&&(i.enable(X),u[X]=!0)}function I(X){u[X]!==!1&&(i.disable(X),u[X]=!1)}function U(X,Re){return h[X]!==Re?(i.bindFramebuffer(X,Re),h[X]=Re,X===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Re),X===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Re),!0):!1}function F(X,Re){let me=m,Ce=!1;if(X){me=f.get(Re),me===void 0&&(me=[],f.set(Re,me));let Be=X.textures;if(me.length!==Be.length||me[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,he=Be.length;ye<he;ye++)me[ye]=i.COLOR_ATTACHMENT0+ye;me.length=Be.length,Ce=!0}}else me[0]!==i.BACK&&(me[0]=i.BACK,Ce=!0);Ce&&i.drawBuffers(me)}function J(X){return _!==X?(i.useProgram(X),_=X,!0):!1}let fe={[Fs]:i.FUNC_ADD,[Nd]:i.FUNC_SUBTRACT,[Ud]:i.FUNC_REVERSE_SUBTRACT};fe[Fd]=i.MIN,fe[Od]=i.MAX;let q={[Bd]:i.ZERO,[Hd]:i.ONE,[kd]:i.SRC_COLOR,[su]:i.SRC_ALPHA,[qd]:i.SRC_ALPHA_SATURATE,[Wd]:i.DST_COLOR,[zd]:i.DST_ALPHA,[Vd]:i.ONE_MINUS_SRC_COLOR,[ru]:i.ONE_MINUS_SRC_ALPHA,[Xd]:i.ONE_MINUS_DST_COLOR,[Gd]:i.ONE_MINUS_DST_ALPHA,[Yd]:i.CONSTANT_COLOR,[Zd]:i.ONE_MINUS_CONSTANT_COLOR,[Kd]:i.CONSTANT_ALPHA,[jd]:i.ONE_MINUS_CONSTANT_ALPHA};function te(X,Re,me,Ce,Be,ye,he,xe,L,le){if(X===Si){p===!0&&(I(i.BLEND),p=!1);return}if(p===!1&&(R(i.BLEND),p=!0),X!==Dd){if(X!==g||le!==N){if((b!==Fs||E!==Fs)&&(i.blendEquation(i.FUNC_ADD),b=Fs,E=Fs),le)switch(X){case Rr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tu:i.blendFunc(i.ONE,i.ONE);break;case nu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case iu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",X);break}else switch(X){case Rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nu:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case iu:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",X);break}w=null,v=null,A=null,T=null,x.set(0,0,0),C=0,g=X,N=le}return}Be=Be||Re,ye=ye||me,he=he||Ce,(Re!==b||Be!==E)&&(i.blendEquationSeparate(fe[Re],fe[Be]),b=Re,E=Be),(me!==w||Ce!==v||ye!==A||he!==T)&&(i.blendFuncSeparate(q[me],q[Ce],q[ye],q[he]),w=me,v=Ce,A=ye,T=he),(xe.equals(x)===!1||L!==C)&&(i.blendColor(xe.r,xe.g,xe.b,L),x.copy(xe),C=L),g=X,N=!1}function ne(X,Re){X.side===Vt?I(i.CULL_FACE):R(i.CULL_FACE);let me=X.side===An;Re&&(me=!me),pe(me),X.blending===Rr&&X.transparent===!1?te(Si):te(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);let Ce=X.stencilWrite;a.setTest(Ce),Ce&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Fe(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?R(i.SAMPLE_ALPHA_TO_COVERAGE):I(i.SAMPLE_ALPHA_TO_COVERAGE)}function pe(X){B!==X&&(X?i.frontFace(i.CW):i.frontFace(i.CCW),B=X)}function ce(X){X!==Pd?(R(i.CULL_FACE),X!==O&&(X===eu?i.cullFace(i.BACK):X===Id?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):I(i.CULL_FACE),O=X}function Oe(X){X!==k&&(K&&i.lineWidth(X),k=X)}function Fe(X,Re,me){X?(R(i.POLYGON_OFFSET_FILL),(D!==Re||G!==me)&&(D=Re,G=me,o.getReversed()&&(Re=-Re),i.polygonOffset(Re,me))):I(i.POLYGON_OFFSET_FILL)}function Ee(X){X?R(i.SCISSOR_TEST):I(i.SCISSOR_TEST)}function ke(X){X===void 0&&(X=i.TEXTURE0+$-1),ie!==X&&(i.activeTexture(X),ie=X)}function z(X,Re,me){me===void 0&&(ie===null?me=i.TEXTURE0+$-1:me=ie);let Ce=re[me];Ce===void 0&&(Ce={type:void 0,texture:void 0},re[me]=Ce),(Ce.type!==X||Ce.texture!==Re)&&(ie!==me&&(i.activeTexture(me),ie=me),i.bindTexture(X,Re||H[X]),Ce.type=X,Ce.texture=Re)}function ft(){let X=re[ie];X!==void 0&&X.type!==void 0&&(i.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function st(){try{i.compressedTexImage2D(...arguments)}catch(X){it("WebGLState:",X)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(X){it("WebGLState:",X)}}function y(){try{i.texSubImage2D(...arguments)}catch(X){it("WebGLState:",X)}}function Y(){try{i.texSubImage3D(...arguments)}catch(X){it("WebGLState:",X)}}function ee(){try{i.compressedTexSubImage2D(...arguments)}catch(X){it("WebGLState:",X)}}function ae(){try{i.compressedTexSubImage3D(...arguments)}catch(X){it("WebGLState:",X)}}function Se(){try{i.texStorage2D(...arguments)}catch(X){it("WebGLState:",X)}}function Te(){try{i.texStorage3D(...arguments)}catch(X){it("WebGLState:",X)}}function ue(){try{i.texImage2D(...arguments)}catch(X){it("WebGLState:",X)}}function ge(){try{i.texImage3D(...arguments)}catch(X){it("WebGLState:",X)}}function Ae(X){return d[X]!==void 0?d[X]:i.getParameter(X)}function Xe(X,Re){d[X]!==Re&&(i.pixelStorei(X,Re),d[X]=Re)}function Le(X){Ne.equals(X)===!1&&(i.scissor(X.x,X.y,X.z,X.w),Ne.copy(X))}function Pe(X){Ye.equals(X)===!1&&(i.viewport(X.x,X.y,X.z,X.w),Ye.copy(X))}function qe(X,Re){let me=c.get(Re);me===void 0&&(me=new WeakMap,c.set(Re,me));let Ce=me.get(X);Ce===void 0&&(Ce=i.getUniformBlockIndex(Re,X.name),me.set(X,Ce))}function Je(X,Re){let Ce=c.get(Re).get(X);l.get(Re)!==Ce&&(i.uniformBlockBinding(Re,Ce,X.__bindingPointIndex),l.set(Re,Ce))}function nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},ie=null,re={},h={},f=new WeakMap,m=[],_=null,p=!1,g=null,b=null,w=null,v=null,E=null,A=null,T=null,x=new tt(0,0,0),C=0,N=!1,B=null,O=null,k=null,D=null,G=null,Ne.set(0,0,i.canvas.width,i.canvas.height),Ye.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:R,disable:I,bindFramebuffer:U,drawBuffers:F,useProgram:J,setBlending:te,setMaterial:ne,setFlipSided:pe,setCullFace:ce,setLineWidth:Oe,setPolygonOffset:Fe,setScissorTest:Ee,activeTexture:ke,bindTexture:z,unbindTexture:ft,compressedTexImage2D:st,compressedTexImage3D:P,texImage2D:ue,texImage3D:ge,pixelStorei:Xe,getParameter:Ae,updateUBOMapping:qe,uniformBlockBinding:Je,texStorage2D:Se,texStorage3D:Te,texSubImage2D:y,texSubImage3D:Y,compressedTexSubImage2D:ee,compressedTexSubImage3D:ae,scissor:Le,viewport:Pe,reset:nt}}function dv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,u=new WeakMap,d=new Set,h,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,y){return m?new OffscreenCanvas(P,y):cr("canvas")}function p(P,y,Y){let ee=1,ae=st(P);if((ae.width>Y||ae.height>Y)&&(ee=Y/Math.max(ae.width,ae.height)),ee<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let Se=Math.floor(ee*ae.width),Te=Math.floor(ee*ae.height);h===void 0&&(h=_(Se,Te));let ue=y?_(Se,Te):h;return ue.width=Se,ue.height=Te,ue.getContext("2d").drawImage(P,0,0,Se,Te),Qe("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Se+"x"+Te+")."),ue}else return"data"in P&&Qe("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),P;return P}function g(P){return P.generateMipmaps}function b(P){i.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(P,y,Y,ee,ae,Se=!1){if(P!==null){if(i[P]!==void 0)return i[P];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Te;ee&&(Te=e.get("EXT_texture_norm16"),Te||Qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=y;if(y===i.RED&&(Y===i.FLOAT&&(ue=i.R32F),Y===i.HALF_FLOAT&&(ue=i.R16F),Y===i.UNSIGNED_BYTE&&(ue=i.R8),Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.R16_EXT),Y===i.SHORT&&Te&&(ue=Te.R16_SNORM_EXT)),y===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.R8UI),Y===i.UNSIGNED_SHORT&&(ue=i.R16UI),Y===i.UNSIGNED_INT&&(ue=i.R32UI),Y===i.BYTE&&(ue=i.R8I),Y===i.SHORT&&(ue=i.R16I),Y===i.INT&&(ue=i.R32I)),y===i.RG&&(Y===i.FLOAT&&(ue=i.RG32F),Y===i.HALF_FLOAT&&(ue=i.RG16F),Y===i.UNSIGNED_BYTE&&(ue=i.RG8),Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.RG16_EXT),Y===i.SHORT&&Te&&(ue=Te.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.RG8UI),Y===i.UNSIGNED_SHORT&&(ue=i.RG16UI),Y===i.UNSIGNED_INT&&(ue=i.RG32UI),Y===i.BYTE&&(ue=i.RG8I),Y===i.SHORT&&(ue=i.RG16I),Y===i.INT&&(ue=i.RG32I)),y===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(ue=i.RGB16UI),Y===i.UNSIGNED_INT&&(ue=i.RGB32UI),Y===i.BYTE&&(ue=i.RGB8I),Y===i.SHORT&&(ue=i.RGB16I),Y===i.INT&&(ue=i.RGB32I)),y===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(ue=i.RGBA16UI),Y===i.UNSIGNED_INT&&(ue=i.RGBA32UI),Y===i.BYTE&&(ue=i.RGBA8I),Y===i.SHORT&&(ue=i.RGBA16I),Y===i.INT&&(ue=i.RGBA32I)),y===i.RGB&&(Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.RGB16_EXT),Y===i.SHORT&&Te&&(ue=Te.RGB16_SNORM_EXT),Y===i.UNSIGNED_INT_5_9_9_9_REV&&(ue=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(ue=i.R11F_G11F_B10F)),y===i.RGBA){let ge=Se?io:xt.getTransfer(ae);Y===i.FLOAT&&(ue=i.RGBA32F),Y===i.HALF_FLOAT&&(ue=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(ue=ge===Ct?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.RGBA16_EXT),Y===i.SHORT&&Te&&(ue=Te.RGBA16_SNORM_EXT),Y===i.UNSIGNED_SHORT_4_4_4_4&&(ue=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(ue=i.RGB5_A1)}return(ue===i.R16F||ue===i.R32F||ue===i.RG16F||ue===i.RG32F||ue===i.RGBA16F||ue===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function E(P,y){let Y;return P?y===null||y===hi||y===Ir?Y=i.DEPTH24_STENCIL8:y===Xn?Y=i.DEPTH32F_STENCIL8:y===Pr&&(Y=i.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===hi||y===Ir?Y=i.DEPTH_COMPONENT24:y===Xn?Y=i.DEPTH_COMPONENT32F:y===Pr&&(Y=i.DEPTH_COMPONENT16),Y}function A(P,y){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Jt&&P.minFilter!==Qt?Math.log2(Math.max(y.width,y.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?y.mipmaps.length:1}function T(P){let y=P.target;y.removeEventListener("dispose",T),C(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&d.delete(y)}function x(P){let y=P.target;y.removeEventListener("dispose",x),B(y)}function C(P){let y=n.get(P);if(y.__webglInit===void 0)return;let Y=P.source,ee=f.get(Y);if(ee){let ae=ee[y.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&N(P),Object.keys(ee).length===0&&f.delete(Y)}n.remove(P)}function N(P){let y=n.get(P);i.deleteTexture(y.__webglTexture);let Y=P.source,ee=f.get(Y);delete ee[y.__cacheKey],o.memory.textures--}function B(P){let y=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(y.__webglFramebuffer[ee]))for(let ae=0;ae<y.__webglFramebuffer[ee].length;ae++)i.deleteFramebuffer(y.__webglFramebuffer[ee][ae]);else i.deleteFramebuffer(y.__webglFramebuffer[ee]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[ee])}else{if(Array.isArray(y.__webglFramebuffer))for(let ee=0;ee<y.__webglFramebuffer.length;ee++)i.deleteFramebuffer(y.__webglFramebuffer[ee]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ee=0;ee<y.__webglColorRenderbuffer.length;ee++)y.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[ee]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let Y=P.textures;for(let ee=0,ae=Y.length;ee<ae;ee++){let Se=n.get(Y[ee]);Se.__webglTexture&&(i.deleteTexture(Se.__webglTexture),o.memory.textures--),n.remove(Y[ee])}n.remove(P)}let O=0;function k(){O=0}function D(){return O}function G(P){O=P}function $(){let P=O;return P>=s.maxTextures&&Qe("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,P}function K(P){let y=[];return y.push(P.wrapS),y.push(P.wrapT),y.push(P.wrapR||0),y.push(P.magFilter),y.push(P.minFilter),y.push(P.anisotropy),y.push(P.internalFormat),y.push(P.format),y.push(P.type),y.push(P.generateMipmaps),y.push(P.premultiplyAlpha),y.push(P.flipY),y.push(P.unpackAlignment),y.push(P.colorSpace),y.join()}function oe(P,y){let Y=n.get(P);if(P.isVideoTexture&&z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&Y.__version!==P.version){let ee=P.image;if(ee===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{I(Y,P,y);return}}else P.isExternalTexture&&(Y.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+y)}function W(P,y){let Y=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){I(Y,P,y);return}else P.isExternalTexture&&(Y.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+y)}function ie(P,y){let Y=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){I(Y,P,y);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+y)}function re(P,y){let Y=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&Y.__version!==P.version){U(Y,P,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+y)}let ve={[gi]:i.REPEAT,[jn]:i.CLAMP_TO_EDGE,[ar]:i.MIRRORED_REPEAT},Me={[Jt]:i.NEAREST,[rl]:i.NEAREST_MIPMAP_NEAREST,[Bs]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[Cr]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},Ne={[lf]:i.NEVER,[ff]:i.ALWAYS,[cf]:i.LESS,[Xl]:i.LEQUAL,[uf]:i.EQUAL,[ql]:i.GEQUAL,[hf]:i.GREATER,[df]:i.NOTEQUAL};function Ye(P,y){if(y.type===Xn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Qt||y.magFilter===Cr||y.magFilter===Bs||y.magFilter===ui||y.minFilter===Qt||y.minFilter===Cr||y.minFilter===Bs||y.minFilter===ui)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ve[y.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ve[y.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ve[y.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Me[y.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Me[y.minFilter]),y.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Ne[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Jt||y.minFilter!==Bs&&y.minFilter!==ui||y.type===Xn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function _e(P,y){let Y=!1;P.__webglInit===void 0&&(P.__webglInit=!0,y.addEventListener("dispose",T));let ee=y.source,ae=f.get(ee);ae===void 0&&(ae={},f.set(ee,ae));let Se=K(y);if(Se!==P.__cacheKey){ae[Se]===void 0&&(ae[Se]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),ae[Se].usedTimes++;let Te=ae[P.__cacheKey];Te!==void 0&&(ae[P.__cacheKey].usedTimes--,Te.usedTimes===0&&N(y)),P.__cacheKey=Se,P.__webglTexture=ae[Se].texture}return Y}function H(P,y,Y){return Math.floor(Math.floor(P/Y)/y)}function R(P,y,Y,ee){let Se=P.updateRanges;if(Se.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,Y,ee,y.data);else{Se.sort((Xe,Le)=>Xe.start-Le.start);let Te=0;for(let Xe=1;Xe<Se.length;Xe++){let Le=Se[Te],Pe=Se[Xe],qe=Le.start+Le.count,Je=H(Pe.start,y.width,4),nt=H(Le.start,y.width,4);Pe.start<=qe+1&&Je===nt&&H(Pe.start+Pe.count-1,y.width,4)===Je?Le.count=Math.max(Le.count,Pe.start+Pe.count-Le.start):(++Te,Se[Te]=Pe)}Se.length=Te+1;let ue=t.getParameter(i.UNPACK_ROW_LENGTH),ge=t.getParameter(i.UNPACK_SKIP_PIXELS),Ae=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Xe=0,Le=Se.length;Xe<Le;Xe++){let Pe=Se[Xe],qe=Math.floor(Pe.start/4),Je=Math.ceil(Pe.count/4),nt=qe%y.width,X=Math.floor(qe/y.width),Re=Je,me=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),t.pixelStorei(i.UNPACK_SKIP_ROWS,X),t.texSubImage2D(i.TEXTURE_2D,0,nt,X,Re,me,Y,ee,y.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ue),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ge),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ae)}}function I(P,y,Y){let ee=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ee=i.TEXTURE_3D);let ae=_e(P,y),Se=y.source;t.bindTexture(ee,P.__webglTexture,i.TEXTURE0+Y);let Te=n.get(Se);if(Se.version!==Te.__version||ae===!0){if(t.activeTexture(i.TEXTURE0+Y),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let me=xt.getPrimaries(xt.workingColorSpace),Ce=y.colorSpace===Wi?null:xt.getPrimaries(y.colorSpace),Be=y.colorSpace===Wi||me===Ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let ge=p(y.image,!1,s.maxTextureSize);ge=ft(y,ge);let Ae=r.convert(y.format,y.colorSpace),Xe=r.convert(y.type),Le=v(y.internalFormat,Ae,Xe,y.normalized,y.colorSpace,y.isVideoTexture);Ye(ee,y);let Pe,qe=y.mipmaps,Je=y.isVideoTexture!==!0,nt=Te.__version===void 0||ae===!0,X=Se.dataReady,Re=A(y,ge);if(y.isDepthTexture)Le=E(y.format===hs,y.type),nt&&(Je?t.texStorage2D(i.TEXTURE_2D,1,Le,ge.width,ge.height):t.texImage2D(i.TEXTURE_2D,0,Le,ge.width,ge.height,0,Ae,Xe,null));else if(y.isDataTexture)if(qe.length>0){Je&&nt&&t.texStorage2D(i.TEXTURE_2D,Re,Le,qe[0].width,qe[0].height);for(let me=0,Ce=qe.length;me<Ce;me++)Pe=qe[me],Je?X&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,Pe.width,Pe.height,Ae,Xe,Pe.data):t.texImage2D(i.TEXTURE_2D,me,Le,Pe.width,Pe.height,0,Ae,Xe,Pe.data);y.generateMipmaps=!1}else Je?(nt&&t.texStorage2D(i.TEXTURE_2D,Re,Le,ge.width,ge.height),X&&R(y,ge,Ae,Xe)):t.texImage2D(i.TEXTURE_2D,0,Le,ge.width,ge.height,0,Ae,Xe,ge.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Je&&nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Le,qe[0].width,qe[0].height,ge.depth);for(let me=0,Ce=qe.length;me<Ce;me++)if(Pe=qe[me],y.format!==qn)if(Ae!==null)if(Je){if(X)if(y.layerUpdates.size>0){let Be=Ru(Pe.width,Pe.height,y.format,y.type);for(let ye of y.layerUpdates){let he=Pe.data.subarray(ye*Be/Pe.data.BYTES_PER_ELEMENT,(ye+1)*Be/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,ye,Pe.width,Pe.height,1,Ae,he)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,Pe.width,Pe.height,ge.depth,Ae,Pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,me,Le,Pe.width,Pe.height,ge.depth,0,Pe.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?X&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,Pe.width,Pe.height,ge.depth,Ae,Xe,Pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,me,Le,Pe.width,Pe.height,ge.depth,0,Ae,Xe,Pe.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Je&&nt&&t.texStorage2D(i.TEXTURE_2D,Re,Le,qe[0].width,qe[0].height);for(let me=0,Ce=qe.length;me<Ce;me++)Pe=qe[me],y.format!==qn?Ae!==null?Je?X&&t.compressedTexSubImage2D(i.TEXTURE_2D,me,0,0,Pe.width,Pe.height,Ae,Pe.data):t.compressedTexImage2D(i.TEXTURE_2D,me,Le,Pe.width,Pe.height,0,Pe.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?X&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,Pe.width,Pe.height,Ae,Xe,Pe.data):t.texImage2D(i.TEXTURE_2D,me,Le,Pe.width,Pe.height,0,Ae,Xe,Pe.data)}else if(y.isDataArrayTexture)if(Je){if(nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Le,ge.width,ge.height,ge.depth),X)if(y.layerUpdates.size>0){let me=Ru(ge.width,ge.height,y.format,y.type);for(let Ce of y.layerUpdates){let Be=ge.data.subarray(Ce*me/ge.data.BYTES_PER_ELEMENT,(Ce+1)*me/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ce,ge.width,ge.height,1,Ae,Xe,Be)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Ae,Xe,ge.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,ge.width,ge.height,ge.depth,0,Ae,Xe,ge.data);else if(y.isData3DTexture)Je?(nt&&t.texStorage3D(i.TEXTURE_3D,Re,Le,ge.width,ge.height,ge.depth),X&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Ae,Xe,ge.data)):t.texImage3D(i.TEXTURE_3D,0,Le,ge.width,ge.height,ge.depth,0,Ae,Xe,ge.data);else if(y.isFramebufferTexture){if(nt)if(Je)t.texStorage2D(i.TEXTURE_2D,Re,Le,ge.width,ge.height);else{let me=ge.width,Ce=ge.height;for(let Be=0;Be<Re;Be++)t.texImage2D(i.TEXTURE_2D,Be,Le,me,Ce,0,Ae,Xe,null),me>>=1,Ce>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let me=i.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),ge.parentNode!==me){me.appendChild(ge),d.add(y),me.onpaint=Ce=>{let Be=Ce.changedElements;for(let ye of d)Be.includes(ye.image)&&(ye.needsUpdate=!0)},me.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ge);else{let Be=i.RGBA,ye=i.RGBA,he=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Be,ye,he,ge)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(qe.length>0){if(Je&&nt){let me=st(qe[0]);t.texStorage2D(i.TEXTURE_2D,Re,Le,me.width,me.height)}for(let me=0,Ce=qe.length;me<Ce;me++)Pe=qe[me],Je?X&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,Ae,Xe,Pe):t.texImage2D(i.TEXTURE_2D,me,Le,Ae,Xe,Pe);y.generateMipmaps=!1}else if(Je){if(nt){let me=st(ge);t.texStorage2D(i.TEXTURE_2D,Re,Le,me.width,me.height)}X&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ae,Xe,ge)}else t.texImage2D(i.TEXTURE_2D,0,Le,Ae,Xe,ge);g(y)&&b(ee),Te.__version=Se.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function U(P,y,Y){if(y.image.length!==6)return;let ee=_e(P,y),ae=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+Y);let Se=n.get(ae);if(ae.version!==Se.__version||ee===!0){t.activeTexture(i.TEXTURE0+Y);let Te=xt.getPrimaries(xt.workingColorSpace),ue=y.colorSpace===Wi?null:xt.getPrimaries(y.colorSpace),ge=y.colorSpace===Wi||Te===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let Ae=y.isCompressedTexture||y.image[0].isCompressedTexture,Xe=y.image[0]&&y.image[0].isDataTexture,Le=[];for(let ye=0;ye<6;ye++)!Ae&&!Xe?Le[ye]=p(y.image[ye],!0,s.maxCubemapSize):Le[ye]=Xe?y.image[ye].image:y.image[ye],Le[ye]=ft(y,Le[ye]);let Pe=Le[0],qe=r.convert(y.format,y.colorSpace),Je=r.convert(y.type),nt=v(y.internalFormat,qe,Je,y.normalized,y.colorSpace),X=y.isVideoTexture!==!0,Re=Se.__version===void 0||ee===!0,me=ae.dataReady,Ce=A(y,Pe);Ye(i.TEXTURE_CUBE_MAP,y);let Be;if(Ae){X&&Re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,nt,Pe.width,Pe.height);for(let ye=0;ye<6;ye++){Be=Le[ye].mipmaps;for(let he=0;he<Be.length;he++){let xe=Be[he];y.format!==qn?qe!==null?X?me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he,0,0,xe.width,xe.height,qe,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he,nt,xe.width,xe.height,0,xe.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he,0,0,xe.width,xe.height,qe,Je,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he,nt,xe.width,xe.height,0,qe,Je,xe.data)}}}else{if(Be=y.mipmaps,X&&Re){Be.length>0&&Ce++;let ye=st(Le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,nt,ye.width,ye.height)}for(let ye=0;ye<6;ye++)if(Xe){X?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Le[ye].width,Le[ye].height,qe,Je,Le[ye].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,nt,Le[ye].width,Le[ye].height,0,qe,Je,Le[ye].data);for(let he=0;he<Be.length;he++){let L=Be[he].image[ye].image;X?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he+1,0,0,L.width,L.height,qe,Je,L.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he+1,nt,L.width,L.height,0,qe,Je,L.data)}}else{X?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,qe,Je,Le[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,nt,qe,Je,Le[ye]);for(let he=0;he<Be.length;he++){let xe=Be[he];X?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he+1,0,0,qe,Je,xe.image[ye]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,he+1,nt,qe,Je,xe.image[ye])}}}g(y)&&b(i.TEXTURE_CUBE_MAP),Se.__version=ae.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function F(P,y,Y,ee,ae,Se){let Te=r.convert(Y.format,Y.colorSpace),ue=r.convert(Y.type),ge=v(Y.internalFormat,Te,ue,Y.normalized,Y.colorSpace),Ae=n.get(y),Xe=n.get(Y);if(Xe.__renderTarget=y,!Ae.__hasExternalTextures){let Le=Math.max(1,y.width>>Se),Pe=Math.max(1,y.height>>Se);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,Se,ge,Le,Pe,y.depth,0,Te,ue,null):t.texImage2D(ae,Se,ge,Le,Pe,0,Te,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),ke(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,ae,Xe.__webglTexture,0,Ee(y)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,ae,Xe.__webglTexture,Se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function J(P,y,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,P),y.depthBuffer){let ee=y.depthTexture,ae=ee&&ee.isDepthTexture?ee.type:null,Se=E(y.stencilBuffer,ae),Te=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ke(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee(y),Se,y.width,y.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee(y),Se,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Se,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,P)}else{let ee=y.textures;for(let ae=0;ae<ee.length;ae++){let Se=ee[ae],Te=r.convert(Se.format,Se.colorSpace),ue=r.convert(Se.type),ge=v(Se.internalFormat,Te,ue,Se.normalized,Se.colorSpace);ke(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee(y),ge,y.width,y.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee(y),ge,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ge,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(P,y,Y){let ee=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ae=n.get(y.depthTexture);if(ae.__renderTarget=y,(!ae.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),ee){if(ae.__webglInit===void 0&&(ae.__webglInit=!0,y.depthTexture.addEventListener("dispose",T)),ae.__webglTexture===void 0){ae.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,y.depthTexture);let Ae=r.convert(y.depthTexture.format),Xe=r.convert(y.depthTexture.type),Le;y.depthTexture.format===_i?Le=i.DEPTH_COMPONENT24:y.depthTexture.format===hs&&(Le=i.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Le,y.width,y.height,0,Ae,Xe,null)}}else oe(y.depthTexture,0);let Se=ae.__webglTexture,Te=Ee(y),ue=ee?i.TEXTURE_CUBE_MAP_POSITIVE_X+Y:i.TEXTURE_2D,ge=y.depthTexture.format===hs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===_i)ke(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,ue,Se,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,ge,ue,Se,0);else if(y.depthTexture.format===hs)ke(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,ue,Se,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,ge,ue,Se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function q(P){let y=n.get(P),Y=P.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==P.depthTexture){let ee=P.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ee){let ae=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ee.removeEventListener("dispose",ae)};ee.addEventListener("dispose",ae),y.__depthDisposeCallback=ae}y.__boundDepthTexture=ee}if(P.depthTexture&&!y.__autoAllocateDepthBuffer)if(Y)for(let ee=0;ee<6;ee++)fe(y.__webglFramebuffer[ee],P,ee);else{let ee=P.texture.mipmaps;ee&&ee.length>0?fe(y.__webglFramebuffer[0],P,0):fe(y.__webglFramebuffer,P,0)}else if(Y){y.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[ee]),y.__webglDepthbuffer[ee]===void 0)y.__webglDepthbuffer[ee]=i.createRenderbuffer(),J(y.__webglDepthbuffer[ee],P,!1);else{let ae=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=y.__webglDepthbuffer[ee];i.bindRenderbuffer(i.RENDERBUFFER,Se),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Se)}}else{let ee=P.texture.mipmaps;if(ee&&ee.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),J(y.__webglDepthbuffer,P,!1);else{let ae=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Se),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Se)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function te(P,y,Y){let ee=n.get(P);y!==void 0&&F(ee.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&q(P)}function ne(P){let y=P.texture,Y=n.get(P),ee=n.get(y);P.addEventListener("dispose",x);let ae=P.textures,Se=P.isWebGLCubeRenderTarget===!0,Te=ae.length>1;if(Te||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=y.version,o.memory.textures++),Se){Y.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0){Y.__webglFramebuffer[ue]=[];for(let ge=0;ge<y.mipmaps.length;ge++)Y.__webglFramebuffer[ue][ge]=i.createFramebuffer()}else Y.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ue=0;ue<y.mipmaps.length;ue++)Y.__webglFramebuffer[ue]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ue=0,ge=ae.length;ue<ge;ue++){let Ae=n.get(ae[ue]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&ke(P)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ue=0;ue<ae.length;ue++){let ge=ae[ue];Y.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ue]);let Ae=r.convert(ge.format,ge.colorSpace),Xe=r.convert(ge.type),Le=v(ge.internalFormat,Ae,Xe,ge.normalized,ge.colorSpace,P.isXRRenderTarget===!0),Pe=Ee(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,Le,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),J(Y.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Se){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,y);for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0)for(let ge=0;ge<y.mipmaps.length;ge++)F(Y.__webglFramebuffer[ue][ge],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ge);else F(Y.__webglFramebuffer[ue],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);g(y)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let ue=0,ge=ae.length;ue<ge;ue++){let Ae=ae[ue],Xe=n.get(Ae),Le=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Le=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Le,Xe.__webglTexture),Ye(Le,Ae),F(Y.__webglFramebuffer,P,Ae,i.COLOR_ATTACHMENT0+ue,Le,0),g(Ae)&&b(Le)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ue=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ee.__webglTexture),Ye(ue,y),y.mipmaps&&y.mipmaps.length>0)for(let ge=0;ge<y.mipmaps.length;ge++)F(Y.__webglFramebuffer[ge],P,y,i.COLOR_ATTACHMENT0,ue,ge);else F(Y.__webglFramebuffer,P,y,i.COLOR_ATTACHMENT0,ue,0);g(y)&&b(ue),t.unbindTexture()}P.depthBuffer&&q(P)}function pe(P){let y=P.textures;for(let Y=0,ee=y.length;Y<ee;Y++){let ae=y[Y];if(g(ae)){let Se=w(P),Te=n.get(ae).__webglTexture;t.bindTexture(Se,Te),b(Se),t.unbindTexture()}}}let ce=[],Oe=[];function Fe(P){if(P.samples>0){if(ke(P)===!1){let y=P.textures,Y=P.width,ee=P.height,ae=i.COLOR_BUFFER_BIT,Se=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(P),ue=y.length>1;if(ue)for(let Ae=0;Ae<y.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);let ge=P.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ae=0;Ae<y.length;Ae++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ae]);let Xe=n.get(y[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xe,0)}i.blitFramebuffer(0,0,Y,ee,0,0,Y,ee,ae,i.NEAREST),l===!0&&(ce.length=0,Oe.length=0,ce.push(i.COLOR_ATTACHMENT0+Ae),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(ce.push(Se),Oe.push(Se),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Oe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ce))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Ae=0;Ae<y.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ae]);let Xe=n.get(y[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,Xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Ee(P){return Math.min(s.maxSamples,P.samples)}function ke(P){let y=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function z(P){let y=o.render.frame;u.get(P)!==y&&(u.set(P,y),P.update())}function ft(P,y){let Y=P.colorSpace,ee=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Y!==wn&&Y!==Wi&&(xt.getTransfer(Y)===Ct?(ee!==qn||ae!==Bn)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",Y)),y}function st(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=k,this.getTextureUnits=D,this.setTextureUnits=G,this.setTexture2D=oe,this.setTexture2DArray=W,this.setTexture3D=ie,this.setTextureCube=re,this.rebindTextures=te,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=F,this.useMultisampledRTT=ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fv(i,e){function t(n,s=Wi){let r,o=xt.getTransfer(s);if(n===Bn)return i.UNSIGNED_BYTE;if(n===al)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_u)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===pu)return i.BYTE;if(n===mu)return i.SHORT;if(n===Pr)return i.UNSIGNED_SHORT;if(n===ol)return i.INT;if(n===hi)return i.UNSIGNED_INT;if(n===Xn)return i.FLOAT;if(n===di)return i.HALF_FLOAT;if(n===xu)return i.ALPHA;if(n===yu)return i.RGB;if(n===qn)return i.RGBA;if(n===_i)return i.DEPTH_COMPONENT;if(n===hs)return i.DEPTH_STENCIL;if(n===cl)return i.RED;if(n===ul)return i.RED_INTEGER;if(n===ds)return i.RG;if(n===hl)return i.RG_INTEGER;if(n===dl)return i.RGBA_INTEGER;if(n===Do||n===No||n===Uo||n===Fo)if(o===Ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Do)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Do)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fl||n===pl||n===ml||n===gl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_l||n===xl||n===yl||n===vl||n===Ml||n===Oo||n===bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_l||n===xl)return o===Ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vl)return r.COMPRESSED_R11_EAC;if(n===Ml)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Oo)return r.COMPRESSED_RG11_EAC;if(n===bl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Sl||n===El||n===Tl||n===wl||n===Al||n===Rl||n===Cl||n===Pl||n===Il||n===Ll||n===Dl||n===Nl||n===Ul||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Al)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Pl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Il)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Nl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ul)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ol||n===Bl||n===Hl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ol)return o===Ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kl||n===Vl||n===Bo||n===zl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===kl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mv=`
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

}`,Yu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new po(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Wn({vertexShader:pv,fragmentShader:mv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new et(new cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Zu=class extends Jn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null,_=typeof XRWebGLBinding<"u",p=new Yu,g={},b=t.getContextAttributes(),w=null,v=null,E=[],A=[],T=new be,x=null,C=null,N=new nn;N.viewport=new It;let B=new nn;B.viewport=new It;let O=[N,B],k=new Qa,D=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let R=E[H];return R===void 0&&(R=new fr,E[H]=R),R.getTargetRaySpace()},this.getControllerGrip=function(H){let R=E[H];return R===void 0&&(R=new fr,E[H]=R),R.getGripSpace()},this.getHand=function(H){let R=E[H];return R===void 0&&(R=new fr,E[H]=R),R.getHandSpace()};function $(H){let R=A.indexOf(H.inputSource);if(R===-1)return;let I=E[R];I!==void 0&&(I.update(H.inputSource,H.frame,c||o),I.dispatchEvent({type:H.type,data:H.inputSource}))}function K(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",oe);for(let H=0;H<E.length;H++){let R=A[H];R!==null&&(A[H]=null,E[H].disconnect(R))}D=null,G=null,p.reset();for(let H in g)delete g[H];if(e.setRenderTarget(w),f=null,h=null,d=null,s=null,v=null,_e.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(T.width,T.height,!1),C!==null){let H=C.camera;H.fov=C.fov,H.zoom=C.zoom,H.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",K),s.addEventListener("inputsourceschange",oe),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let I=null,U=null,F=null;b.depth&&(F=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,I=b.stencil?hs:_i,U=b.stencil?Ir:hi);let J={colorFormat:t.RGBA8,depthFormat:F,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(J),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Dn(h.textureWidth,h.textureHeight,{format:qn,type:Bn,depthTexture:new ss(h.textureWidth,h.textureHeight,U,void 0,void 0,void 0,void 0,void 0,void 0,I),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let I={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,I),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Dn(f.framebufferWidth,f.framebufferHeight,{format:qn,type:Bn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),_e.setContext(s),_e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function oe(H){for(let R=0;R<H.removed.length;R++){let I=H.removed[R],U=A.indexOf(I);U>=0&&(A[U]=null,E[U].disconnect(I))}for(let R=0;R<H.added.length;R++){let I=H.added[R],U=A.indexOf(I);if(U===-1){for(let J=0;J<E.length;J++)if(J>=A.length){A.push(I),U=J;break}else if(A[J]===null){A[J]=I,U=J;break}if(U===-1)break}let F=E[U];F&&F.connect(I)}}let W=new S,ie=new S;function re(H,R,I){W.setFromMatrixPosition(R.matrixWorld),ie.setFromMatrixPosition(I.matrixWorld);let U=W.distanceTo(ie),F=R.projectionMatrix.elements,J=I.projectionMatrix.elements,fe=F[14]/(F[10]-1),q=F[14]/(F[10]+1),te=(F[9]+1)/F[5],ne=(F[9]-1)/F[5],pe=(F[8]-1)/F[0],ce=(J[8]+1)/J[0],Oe=fe*pe,Fe=fe*ce,Ee=U/(-pe+ce),ke=Ee*-pe;if(R.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(ke),H.translateZ(Ee),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),F[10]===-1)H.projectionMatrix.copy(R.projectionMatrix),H.projectionMatrixInverse.copy(R.projectionMatrixInverse);else{let z=fe+Ee,ft=q+Ee,st=Oe-ke,P=Fe+(U-ke),y=te*q/ft*z,Y=ne*q/ft*z;H.projectionMatrix.makePerspective(st,P,y,Y,z,ft),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function ve(H,R){R===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(R.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let R=H.near,I=H.far;p.texture!==null&&(p.depthNear>0&&(R=p.depthNear),p.depthFar>0&&(I=p.depthFar)),k.near=B.near=N.near=R,k.far=B.far=N.far=I,(D!==k.near||G!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),D=k.near,G=k.far),k.layers.mask=H.layers.mask|6,N.layers.mask=k.layers.mask&-5,B.layers.mask=k.layers.mask&-3;let U=H.parent,F=k.cameras;ve(k,U);for(let J=0;J<F.length;J++)ve(F[J],U);F.length===2?re(k,N,B):k.projectionMatrix.copy(N.projectionMatrix),C===null&&H.isPerspectiveCamera&&(C={camera:H,fov:H.fov,zoom:H.zoom}),Me(H,k,U)};function Me(H,R,I){I===null?H.matrix.copy(R.matrixWorld):(H.matrix.copy(I.matrixWorld),H.matrix.invert(),H.matrix.multiply(R.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(R.projectionMatrix),H.projectionMatrixInverse.copy(R.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Ts*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(k)},this.getCameraTexture=function(H){return g[H]};let Ne=null;function Ye(H,R){if(u=R.getViewerPose(c||o),m=R,u!==null){let I=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let U=!1;I.length!==k.cameras.length&&(k.cameras.length=0,U=!0);for(let q=0;q<I.length;q++){let te=I[q],ne=null;if(f!==null)ne=f.getViewport(te);else{let ce=d.getViewSubImage(h,te);ne=ce.viewport,q===0&&(e.setRenderTargetTextures(v,ce.colorTexture,ce.depthStencilTexture),e.setRenderTarget(v))}let pe=O[q];pe===void 0&&(pe=new nn,pe.layers.enable(q),pe.viewport=new It,O[q]=pe),pe.matrix.fromArray(te.transform.matrix),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.projectionMatrix.fromArray(te.projectionMatrix),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert(),pe.viewport.set(ne.x,ne.y,ne.width,ne.height),q===0&&(k.matrix.copy(pe.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),U===!0&&k.cameras.push(pe)}let F=s.enabledFeatures;if(F&&F.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let q=d.getDepthInformation(I[0]);q&&q.isValid&&q.texture&&p.init(q,s.renderState)}if(F&&F.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let q=0;q<I.length;q++){let te=I[q].camera;if(te){let ne=g[te];ne||(ne=new po,g[te]=ne);let pe=d.getCameraImage(te);ne.sourceTexture=pe}}}}for(let I=0;I<E.length;I++){let U=A[I],F=E[I];U!==null&&F!==void 0&&F.update(U,R,c||o)}Ne&&Ne(H,R),R.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:R}),m=null}let _e=new Yf;_e.setAnimationLoop(Ye),this.setAnimationLoop=function(H){Ne=H},this.dispose=function(){}}},gv=new ct,Qf=new at;Qf.set(-1,0,0,0,1,0,0,0,1);function _v(i,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Tu(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,b,w,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),h(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?l(p,g,b,w):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===An&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===An&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let b=e.get(g),w=b.envMap,v=b.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(gv.makeRotationFromEuler(v)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Qf),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,b,w){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*b,p.scale.value=w*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function h(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,b){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===An&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let b=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function xv(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){let A=E.program;n.uniformBlockBinding(v,A)}function c(v,E){let A=s[v.id];A===void 0&&(p(v),A=u(v),s[v.id]=A,v.addEventListener("dispose",b));let T=E.program;n.updateUBOMapping(v,T);let x=e.render.frame;r[v.id]!==x&&(h(v),r[v.id]=x)}function u(v){let E=d();v.__bindingPointIndex=E;let A=i.createBuffer(),T=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,T,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,A),A}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let E=s[v.id],A=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let x=0,C=A.length;x<C;x++){let N=A[x];if(Array.isArray(N))for(let B=0,O=N.length;B<O;B++)f(N[B],x,B,T);else f(N,x,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,E,A,T){if(_(v,E,A,T)===!0){let x=v.__offset,C=v.value;if(Array.isArray(C)){let N=0;for(let B=0;B<C.length;B++){let O=C[B],k=g(O);m(O,v.__data,N),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(N+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(C,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function m(v,E,A){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,A)}function _(v,E,A,T){let x=v.value,C=E+"_"+A;if(T[C]===void 0)return typeof x=="number"||typeof x=="boolean"?T[C]=x:ArrayBuffer.isView(x)?T[C]=x.slice():T[C]=x.clone(),!0;{let N=T[C];if(typeof x=="number"||typeof x=="boolean"){if(N!==x)return T[C]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(N.equals(x)===!1)return N.copy(x),!0}}return!1}function p(v){let E=v.uniforms,A=0,T=16;for(let C=0,N=E.length;C<N;C++){let B=Array.isArray(E[C])?E[C]:[E[C]];for(let O=0,k=B.length;O<k;O++){let D=B[O],G=Array.isArray(D.value)?D.value:[D.value];for(let $=0,K=G.length;$<K;$++){let oe=G[$],W=g(oe),ie=A%T,re=ie%W.boundary,ve=ie+re;A+=re,ve!==0&&T-ve<W.storage&&(A+=T-ve),D.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=A,A+=W.storage}}}let x=A%T;return x>0&&(A+=T-x),v.__size=A,v.__cache={},this}function g(v){let E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):Qe("WebGLRenderer: Unsupported uniform value type.",v),E}function b(v){let E=v.target;E.removeEventListener("dispose",b);let A=o.indexOf(E.__bindingPointIndex);o.splice(A,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function w(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:w}}var yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ei=null;function vv(){return Ei===null&&(Ei=new _r(yv,16,16,ds,di),Ei.name="DFG_LUT",Ei.minFilter=Qt,Ei.magFilter=Qt,Ei.wrapS=jn,Ei.wrapT=jn,Ei.generateMipmaps=!1,Ei.needsUpdate=!0),Ei}var $l=class{constructor(e={}){let{canvas:t=pf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Bn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let _=f,p=new Set([dl,hl,ul]),g=new Set([Bn,hi,Pr,Ir,al,ll]),b=new Uint32Array(4),w=new Int32Array(4),v=new S,E=null,A=null,T=[],x=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,B=!1,O=null,k=null,D=null,G=null;this._outputColorSpace=Et;let $=0,K=0,oe=null,W=-1,ie=null,re=new It,ve=new It,Me=null,Ne=new tt(0),Ye=0,_e=t.width,H=t.height,R=1,I=null,U=null,F=new It(0,0,_e,H),J=new It(0,0,_e,H),fe=!1,q=new xr,te=!1,ne=!1,pe=new ct,ce=new S,Oe=new It,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ee=!1;function ke(){return oe===null?R:1}let z=n;function ft(M,V){return t.getContext(M,V)}let st,P,y,Y,ee,ae,Se,Te,ue,ge,Ae,Xe,Le,Pe,qe,Je,nt,X,Re,me,Ce,Be,ye;try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",L,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",de,!1),z===null){let V="webgl2";if(z=ft(V,M),z===null)throw ft(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}he()}catch(M){throw t.removeEventListener("webglcontextlost",L,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",de,!1),it("WebGLRenderer: "+M.message),M}function he(){st=new Ax(z),st.init(),Ce=new fv(z,st),P=new _x(z,st,e,Ce),y=new hv(z,st),P.reversedDepthBuffer&&h&&y.buffers.depth.setReversed(!0),k=z.createFramebuffer(),D=z.createFramebuffer(),G=z.createFramebuffer(),Y=new Px(z),ee=new $y,ae=new dv(z,st,y,ee,P,Ce,Y),Se=new wx(N),Te=new L0(z),Be=new mx(z,Te),ue=new Rx(z,Te,Y,Be),ge=new Lx(z,ue,Te,Be,Y),X=new Ix(z,P,ae),qe=new xx(ee),Ae=new jy(N,Se,st,P,Be,qe),Xe=new _v(N,ee),Le=new Qy,Pe=new rv(st),nt=new px(N,Se,y,ge,m,l),Je=new uv(N,ge,P),ye=new xv(z,Y,P,y),Re=new gx(z,st,Y),me=new Cx(z,st,Y),Y.programs=Ae.programs,N.capabilities=P,N.extensions=st,N.properties=ee,N.renderLists=Le,N.shadowMap=Je,N.state=y,N.info=Y}_!==Bn&&(C=new Nx(_,t.width,t.height,a,s,r));let xe=new Zu(N,z);this.xr=xe,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let M=st.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=st.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(M){M!==void 0&&(R=M,this.setSize(_e,H,!1))},this.getSize=function(M){return M.set(_e,H)},this.setSize=function(M,V,j=!0){if(xe.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=M,H=V,t.width=Math.floor(M*R),t.height=Math.floor(V*R),j===!0&&(t.style.width=M+"px",t.style.height=V+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,M,V)},this.getDrawingBufferSize=function(M){return M.set(_e*R,H*R).floor()},this.setDrawingBufferSize=function(M,V,j){_e=M,H=V,R=j,t.width=Math.floor(M*j),t.height=Math.floor(V*j),this.setViewport(0,0,M,V)},this.setEffects=function(M){if(_===Bn){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let V=0;V<M.length;V++)if(M[V].isOutputPass===!0){Qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(re)},this.getViewport=function(M){return M.copy(F)},this.setViewport=function(M,V,j,Z){M.isVector4?F.set(M.x,M.y,M.z,M.w):F.set(M,V,j,Z),y.viewport(re.copy(F).multiplyScalar(R).round())},this.getScissor=function(M){return M.copy(J)},this.setScissor=function(M,V,j,Z){M.isVector4?J.set(M.x,M.y,M.z,M.w):J.set(M,V,j,Z),y.scissor(ve.copy(J).multiplyScalar(R).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(M){y.setScissorTest(fe=M)},this.setOpaqueSort=function(M){I=M},this.setTransparentSort=function(M){U=M},this.getClearColor=function(M){return M.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(M=!0,V=!0,j=!0){let Z=0;if(M){let Q=!1;if(oe!==null){let Ie=oe.texture.format;Q=p.has(Ie)}if(Q){let Ie=oe.texture.type,Ue=g.has(Ie),we=nt.getClearColor(),Ve=nt.getClearAlpha(),Ge=we.r,ot=we.g,rt=we.b;Ue?(b[0]=Ge,b[1]=ot,b[2]=rt,b[3]=Ve,z.clearBufferuiv(z.COLOR,0,b)):(w[0]=Ge,w[1]=ot,w[2]=rt,w[3]=Ve,z.clearBufferiv(z.COLOR,0,w))}else Z|=z.COLOR_BUFFER_BIT}V&&(Z|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),O=M},this.dispose=function(){t.removeEventListener("webglcontextlost",L,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",de,!1),nt.dispose(),Le.dispose(),Pe.dispose(),ee.dispose(),Se.dispose(),ge.dispose(),Be.dispose(),ye.dispose(),Ae.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",_n),xe.removeEventListener("sessionend",Sn),Rt.stop()};function L(M){M.preventDefault(),so("WebGLRenderer: Context Lost."),B=!0}function le(){so("WebGLRenderer: Context Restored."),B=!1;let M=Y.autoReset,V=Je.enabled,j=Je.autoUpdate,Z=Je.needsUpdate,Q=Je.type;he(),Y.autoReset=M,Je.enabled=V,Je.autoUpdate=j,Je.needsUpdate=Z,Je.type=Q}function de(M){it("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ze(M){let V=M.target;V.removeEventListener("dispose",Ze),Ke(V)}function Ke(M){je(M),ee.remove(M)}function je(M){let V=ee.get(M).programs;V!==void 0&&(V.forEach(function(j){Ae.releaseProgram(j)}),M.isShaderMaterial&&Ae.releaseShaderCache(M))}this.renderBufferDirect=function(M,V,j,Z,Q,Ie){V===null&&(V=Fe);let Ue=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,we=zr(M,V,j,Z,Q);y.setMaterial(Z,Ue);let Ve=j.index,Ge=1;if(Z.wireframe===!0){if(Ve=ue.getWireframeAttribute(j),Ve===void 0)return;Ge=2}let ot=j.drawRange,rt=j.attributes.position,We=ot.start*Ge,At=(ot.start+ot.count)*Ge;Ie!==null&&(We=Math.max(We,Ie.start*Ge),At=Math.min(At,(Ie.start+Ie.count)*Ge)),Ve!==null?(We=Math.max(We,0),At=Math.min(At,Ve.count)):rt!=null&&(We=Math.max(We,0),At=Math.min(At,rt.count));let Gt=At-We;if(Gt<0||Gt===1/0)return;Be.setup(Q,Z,we,j,Ve);let Ft,lt=Re;if(Ve!==null&&(Ft=Te.get(Ve),lt=me,lt.setIndex(Ft)),Q.isMesh)Z.wireframe===!0?(y.setLineWidth(Z.wireframeLinewidth*ke()),lt.setMode(z.LINES)):lt.setMode(z.TRIANGLES);else if(Q.isLine){let Tt=Z.linewidth;Tt===void 0&&(Tt=1),y.setLineWidth(Tt*ke()),Q.isLineSegments?lt.setMode(z.LINES):Q.isLineLoop?lt.setMode(z.LINE_LOOP):lt.setMode(z.LINE_STRIP)}else Q.isPoints?lt.setMode(z.POINTS):Q.isSprite&&lt.setMode(z.TRIANGLES);if(Q.isBatchedMesh)if(st.get("WEBGL_multi_draw"))lt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let Tt=Q._multiDrawStarts,ze=Q._multiDrawCounts,Wt=Q._multiDrawCount,vt=Ve?Te.get(Ve).bytesPerElement:1,fn=ee.get(Z).currentProgram.getUniforms();for(let Ln=0;Ln<Wt;Ln++)fn.setValue(z,"_gl_DrawID",Ln),lt.render(Tt[Ln]/vt,ze[Ln])}else if(Q.isInstancedMesh)lt.renderInstances(We,Gt,Q.count);else if(j.isInstancedBufferGeometry){let Tt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,ze=Math.min(j.instanceCount,Tt);lt.renderInstances(We,Gt,ze)}else lt.render(We,Gt)};function ht(M,V,j,Z){O!==null&&M.isNodeMaterial&&O.setObject(Z,M),te===!0&&qe.setState(M,j,!1),M.transparent===!0&&M.side===Vt&&M.forceSinglePass===!1?(M.side=An,M.needsUpdate=!0,Ht(M,V,Z),M.side=Qn,M.needsUpdate=!0,Ht(M,V,Z),M.side=Vt):Ht(M,V,Z)}this.compile=function(M,V,j=null){j===null&&(j=M),O!==null&&O.renderStart(M,V,j),A=Pe.get(j),A.init(V),x.push(A),j.traverseVisible(function(Q){Q.isLight&&Q.layers.test(V.layers)&&(A.pushLight(Q),Q.castShadow&&A.pushShadow(Q))}),M!==j&&M.traverseVisible(function(Q){Q.isLight&&Q.layers.test(V.layers)&&(A.pushLight(Q),Q.castShadow&&A.pushShadow(Q))}),A.setupLights(),O!==null&&O.updateLights(A.state.lightsArray),ne=this.localClippingEnabled,te=qe.init(this.clippingPlanes,ne),te===!0&&qe.setGlobalState(this.clippingPlanes,V),O!==null&&Je.render(A.state.shadowsArray,j,V);let Z=new Set;return M.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let Ie=Q.material;if(Ie)if(Array.isArray(Ie))for(let Ue=0;Ue<Ie.length;Ue++){let we=Ie[Ue];ht(we,j,V,Q),Z.add(we)}else ht(Ie,j,V,Q),Z.add(Ie)}),A=x.pop(),O!==null&&O.renderEnd(),Z},this.compileAsync=function(M,V,j=null){let Z=this.compile(M,V,j);return new Promise(Q=>{function Ie(){if(Z.forEach(function(Ue){let Ve=ee.get(Ue).currentProgram;(Ve===void 0||Ve.isReady())&&Z.delete(Ue)}),Z.size===0){Q(M);return}setTimeout(Ie,10)}st.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let St=null;function Kt(M){St&&St(M)}function _n(){Rt.stop()}function Sn(){Rt.start()}let Rt=new Yf;Rt.setAnimationLoop(Kt),typeof self<"u"&&Rt.setContext(self),this.setAnimationLoop=function(M){St=M,xe.setAnimationLoop(M),M===null?Rt.stop():Rt.start()},xe.addEventListener("sessionstart",_n),xe.addEventListener("sessionend",Sn),this.render=function(M,V){if(V!==void 0&&V.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;O!==null&&O.renderStart(M,V);let j=xe.enabled===!0&&xe.isPresenting===!0,Z=C!==null&&(oe===null||j)&&C.begin(N,oe);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(V),V=xe.getCamera()),M.isScene===!0&&M.onBeforeRender(N,M,V,oe),A=Pe.get(M,x.length),A.init(V),A.state.textureUnits=ae.getTextureUnits(),x.push(A),pe.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),q.setFromProjectionMatrix(pe,ri,V.reversedDepth),ne=this.localClippingEnabled,te=qe.init(this.clippingPlanes,ne),E=Le.get(M,T.length),E.init(),T.push(E),xe.enabled===!0&&xe.isPresenting===!0){let Ue=N.xr.getDepthSensingMesh();Ue!==null&&Yn(Ue,V,-1/0,N.sortObjects)}Yn(M,V,0,N.sortObjects),E.finish(),O!==null&&O.updateLights(A.state.lightsArray),N.sortObjects===!0&&E.sort(I,U),Ee=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,Ee&&nt.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),te===!0&&qe.beginShadows();let Q=A.state.shadowsArray;if(Je.render(Q,M,V),te===!0&&qe.endShadows(),(Z&&C.hasRenderPass())===!1){let Ue=E.opaque,we=E.transmissive;if(A.setupLights(),V.isArrayCamera){let Ve=V.cameras;if(we.length>0)for(let Ge=0,ot=Ve.length;Ge<ot;Ge++){let rt=Ve[Ge];Ri(Ue,we,M,rt)}Ee&&nt.render(M);for(let Ge=0,ot=Ve.length;Ge<ot;Ge++){let rt=Ve[Ge];En(E,M,rt,rt.viewport)}}else we.length>0&&Ri(Ue,we,M,V),Ee&&nt.render(M),En(E,M,V)}oe!==null&&K===0&&(ae.updateMultisampleRenderTarget(oe),ae.updateRenderTargetMipmap(oe)),Z&&C.end(N),M.isScene===!0&&M.onAfterRender(N,M,V),Be.resetDefaultState(),W=-1,ie=null,x.pop(),x.length>0?(A=x[x.length-1],ae.setTextureUnits(A.state.textureUnits),te===!0&&qe.setGlobalState(N.clippingPlanes,A.state.camera)):A=null,T.pop(),T.length>0?E=T[T.length-1]:E=null,O!==null&&O.renderEnd()};function Yn(M,V,j,Z){if(M.visible===!1)return;if(M.layers.test(V.layers)){if(M.isGroup)j=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(V);else if(M.isLightProbeGrid)A.pushLightProbeGrid(M);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(q)){Z&&Oe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(pe);let Ue=ge.update(M),we=M.material;we.visible&&E.push(M,Ue,we,j,Oe.z,null,V)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(q))){let Ue=ge.update(M),we=M.material;if(Z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Oe.copy(M.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Oe.copy(Ue.boundingSphere.center)),Oe.applyMatrix4(M.matrixWorld).applyMatrix4(pe)),Array.isArray(we)){let Ve=Ue.groups;for(let Ge=0,ot=Ve.length;Ge<ot;Ge++){let rt=Ve[Ge],We=we[rt.materialIndex];We&&We.visible&&E.push(M,Ue,We,j,Oe.z,rt,V)}}else we.visible&&E.push(M,Ue,we,j,Oe.z,null,V)}}let Ie=M.children;for(let Ue=0,we=Ie.length;Ue<we;Ue++)Yn(Ie[Ue],V,j,Z)}function En(M,V,j,Z){let{opaque:Q,transmissive:Ie,transparent:Ue}=M;A.setupLightsView(j),te===!0&&qe.setGlobalState(N.clippingPlanes,j),Z&&y.viewport(re.copy(Z)),Q.length>0&&yt(Q,V,j),Ie.length>0&&yt(Ie,V,j),Ue.length>0&&yt(Ue,V,j),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Ri(M,V,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[Z.id]===void 0){let We=st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[Z.id]=new Dn(1,1,{generateMipmaps:!0,type:We?di:Bn,minFilter:ui,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:xt.workingColorSpace})}let Ie=A.state.transmissionRenderTarget[Z.id],Ue=Z.viewport||re;Ie.setSize(Ue.z*N.transmissionResolutionScale,Ue.w*N.transmissionResolutionScale);let we=N.getRenderTarget(),Ve=N.getActiveCubeFace(),Ge=N.getActiveMipmapLevel();N.setRenderTarget(Ie),N.getClearColor(Ne),Ye=N.getClearAlpha(),Ye<1&&N.setClearColor(16777215,.5),N.clear(),Ee&&nt.render(j);let ot=N.toneMapping;N.toneMapping=ci;let rt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),A.setupLightsView(Z),te===!0&&qe.setGlobalState(N.clippingPlanes,Z),yt(M,j,Z),ae.updateMultisampleRenderTarget(Ie),ae.updateRenderTargetMipmap(Ie),st.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let At=0,Gt=V.length;At<Gt;At++){let Ft=V[At],{object:lt,geometry:Tt,material:ze,group:Wt}=Ft;if(ze.side===Vt&&lt.layers.test(Z.layers)){let vt=ze.side;ze.side=An,ze.needsUpdate=!0,Yt(lt,j,Z,Tt,ze,Wt),ze.side=vt,ze.needsUpdate=!0,We=!0}}We===!0&&(ae.updateMultisampleRenderTarget(Ie),ae.updateRenderTargetMipmap(Ie))}N.setRenderTarget(we,Ve,Ge),N.setClearColor(Ne,Ye),rt!==void 0&&(Z.viewport=rt),N.toneMapping=ot}function yt(M,V,j){let Z=V.isScene===!0?V.overrideMaterial:null;for(let Q=0,Ie=M.length;Q<Ie;Q++){let Ue=M[Q],{object:we,geometry:Ve,group:Ge}=Ue,ot=Ue.material;ot.allowOverride===!0&&Z!==null&&(ot=Z),we.layers.test(j.layers)&&Yt(we,V,j,Ve,ot,Ge)}}function Yt(M,V,j,Z,Q,Ie){O!==null&&Q.isNodeMaterial&&O.setObject(M,Q),M.onBeforeRender(N,V,j,Z,Q,Ie),M.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),Q.onBeforeRender(N,V,j,Z,M,Ie),Q.transparent===!0&&Q.side===Vt&&Q.forceSinglePass===!1?(Q.side=An,Q.needsUpdate=!0,N.renderBufferDirect(j,V,Z,Q,M,Ie),Q.side=Qn,Q.needsUpdate=!0,N.renderBufferDirect(j,V,Z,Q,M,Ie),Q.side=Vt):N.renderBufferDirect(j,V,Z,Q,M,Ie),M.onAfterRender(N,V,j,Z,Q,Ie)}function Ht(M,V,j){V.isScene!==!0&&(V=Fe);let Z=ee.get(M),Q=A.state.lights,Ie=A.state.shadowsArray,Ue=Q.state.version,we=Ae.getParameters(M,Q.state,Ie,V,j,A.state.lightProbeGridArray),Ve=Ae.getProgramCacheKey(we),Ge=Z.programs;Z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?V.environment:null,Z.fog=V.fog;let ot=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;Z.envMap=Se.get(M.envMap||Z.environment,ot),Z.envMapRotation=Z.environment!==null&&M.envMap===null?V.environmentRotation:M.envMapRotation,Ge===void 0&&(M.addEventListener("dispose",Ze),Ge=new Map,Z.programs=Ge);let rt=Ge.get(Ve);if(rt!==void 0){if(Z.currentProgram===rt&&Z.lightsStateVersion===Ue)return In(M,we),rt}else we.uniforms=Ae.getUniforms(M),O!==null&&M.isNodeMaterial&&O.build(M,j,we),M.onBeforeCompile(we,N),rt=Ae.acquireProgram(we,Ve),Ge.set(Ve,rt),Z.uniforms=we.uniforms;let We=Z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(We.clippingPlanes=qe.uniform),In(M,we),Z.needsLights=mt(M),Z.lightsStateVersion=Ue,Z.needsLights&&(We.ambientLightColor.value=Q.state.ambient,We.lightProbe.value=Q.state.probe,We.sunLights.value=Q.state.sun,We.sunLightShadows.value=Q.state.sunShadow,We.directionalLights.value=Q.state.directional,We.directionalLightShadows.value=Q.state.directionalShadow,We.spotLights.value=Q.state.spot,We.spotLightShadows.value=Q.state.spotShadow,We.rectAreaLights.value=Q.state.rectArea,We.ltc_1.value=Q.state.rectAreaLTC1,We.ltc_2.value=Q.state.rectAreaLTC2,We.pointLights.value=Q.state.point,We.pointLightShadows.value=Q.state.pointShadow,We.hemisphereLights.value=Q.state.hemi,We.sunShadowMatrix.value=Q.state.sunShadowMatrix,We.sunShadowCascade.value=Q.state.sunShadowCascade,We.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,We.spotLightMatrix.value=Q.state.spotLightMatrix,We.spotLightMap.value=Q.state.spotLightMap,We.pointShadowMatrix.value=Q.state.pointShadowMatrix),Z.lightProbeGrid=A.state.lightProbeGridArray.length>0,Z.currentProgram=rt,Z.uniformsList=null,rt}function Pn(M){if(M.uniformsList===null){let V=M.currentProgram.getUniforms();M.uniformsList=Ur.seqWithValue(V.seq,M.uniforms)}return M.uniformsList}function In(M,V){let j=ee.get(M);j.outputColorSpace=V.outputColorSpace,j.batching=V.batching,j.batchingColor=V.batchingColor,j.instancing=V.instancing,j.instancingColor=V.instancingColor,j.instancingMorph=V.instancingMorph,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function Yi(M,V){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;v.setFromMatrixPosition(V.matrixWorld);for(let j=0,Z=M.length;j<Z;j++){let Q=M[j];if(Q.texture!==null&&Q.boundingBox.containsPoint(v))return Q}return null}function zr(M,V,j,Z,Q){V.isScene!==!0&&(V=Fe),ae.resetTextureUnits();let Ie=V.fog,Ue=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?V.environment:null,we=oe===null?N.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:xt.workingColorSpace,Ve=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Ge=Se.get(Z.envMap||Ue,Ve),ot=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,rt=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),We=!!j.morphAttributes.position,At=!!j.morphAttributes.normal,Gt=!!j.morphAttributes.color,Ft=ci;Z.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Ft=N.toneMapping);let lt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Tt=lt!==void 0?lt.length:0,ze=ee.get(Z),Wt=A.state.lights;if(te===!0&&(ne===!0||M!==ie)){let kt=M===ie&&Z.id===W;qe.setState(Z,M,kt)}let vt=!1;Z.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Wt.state.version||ze.outputColorSpace!==we||Q.isBatchedMesh&&ze.batching===!1||!Q.isBatchedMesh&&ze.batching===!0||Q.isBatchedMesh&&ze.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&ze.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&ze.instancing===!1||!Q.isInstancedMesh&&ze.instancing===!0||Q.isSkinnedMesh&&ze.skinning===!1||!Q.isSkinnedMesh&&ze.skinning===!0||Q.isInstancedMesh&&ze.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&ze.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&ze.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&ze.instancingMorph===!1&&Q.morphTexture!==null||ze.envMap!==Ge||Z.fog===!0&&ze.fog!==Ie||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==qe.numPlanes||ze.numIntersection!==qe.numIntersection)||ze.vertexAlphas!==ot||ze.vertexTangents!==rt||ze.morphTargets!==We||ze.morphNormals!==At||ze.morphColors!==Gt||ze.toneMapping!==Ft||ze.morphTargetsCount!==Tt||!!ze.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(vt=!0):(vt=!0,ze.__version=Z.version);let fn=ze.currentProgram;vt===!0&&(fn=Ht(Z,V,Q),O&&Z.isNodeMaterial&&O.onUpdateProgram(Z,fn,ze));let Ln=!1,Zn=!1,Gs=!1,Dt=fn.getUniforms(),jt=ze.uniforms;if(y.useProgram(fn.program)&&(Ln=!0,Zn=!0,Gs=!0),Z.id!==W&&(W=Z.id,Zn=!0),ze.needsLights){let kt=Yi(A.state.lightProbeGridArray,Q);ze.lightProbeGrid!==kt&&(ze.lightProbeGrid=kt,Zn=!0)}if(Ln||ie!==M){y.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Dt.setValue(z,"projectionMatrix",M.projectionMatrix),Dt.setValue(z,"viewMatrix",M.matrixWorldInverse);let Ki=Dt.map.cameraPosition;Ki!==void 0&&Ki.setValue(z,ce.setFromMatrixPosition(M.matrixWorld)),P.logarithmicDepthBuffer&&Dt.setValue(z,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Dt.setValue(z,"isOrthographic",M.isOrthographicCamera===!0),ie!==M&&(ie=M,Zn=!0,Gs=!0)}if(ze.needsLights&&(Wt.state.sunShadowMap.length>0&&Dt.setValue(z,"sunShadowMap",Wt.state.sunShadowMap,ae),Wt.state.directionalShadowMap.length>0&&Dt.setValue(z,"directionalShadowMap",Wt.state.directionalShadowMap,ae),Wt.state.spotShadowMap.length>0&&Dt.setValue(z,"spotShadowMap",Wt.state.spotShadowMap,ae),Wt.state.pointShadowMap.length>0&&Dt.setValue(z,"pointShadowMap",Wt.state.pointShadowMap,ae)),Q.isSkinnedMesh){Dt.setOptional(z,Q,"bindMatrix"),Dt.setOptional(z,Q,"bindMatrixInverse");let kt=Q.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),Dt.setValue(z,"boneTexture",kt.boneTexture,ae))}Q.isBatchedMesh&&(Dt.setOptional(z,Q,"batchingTexture"),Dt.setValue(z,"batchingTexture",Q._matricesTexture,ae),Dt.setOptional(z,Q,"batchingIdTexture"),Dt.setValue(z,"batchingIdTexture",Q._indirectTexture,ae),Dt.setOptional(z,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Dt.setValue(z,"batchingColorTexture",Q._colorsTexture,ae));let Zi=j.morphAttributes;if((Zi.position!==void 0||Zi.normal!==void 0||Zi.color!==void 0)&&X.update(Q,j,fn),(Zn||ze.receiveShadow!==Q.receiveShadow)&&(ze.receiveShadow=Q.receiveShadow,Dt.setValue(z,"receiveShadow",Q.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&V.environment!==null&&(jt.envMapIntensity.value=V.environmentIntensity),jt.dfgLUT!==void 0&&(jt.dfgLUT.value=vv()),Zn){if(Dt.setValue(z,"toneMappingExposure",N.toneMappingExposure),ze.needsLights&&se(jt,Gs),Ie&&Z.fog===!0&&Xe.refreshFogUniforms(jt,Ie),Xe.refreshMaterialUniforms(jt,Z,R,H,A.state.transmissionRenderTarget[M.id]),ze.needsLights&&ze.lightProbeGrid){let kt=ze.lightProbeGrid;jt.probesSH.value=kt.texture,jt.probesMin.value.copy(kt.boundingBox.min),jt.probesMax.value.copy(kt.boundingBox.max),jt.probesResolution.value.copy(kt.resolution)}Ur.upload(z,Pn(ze),jt,ae)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ur.upload(z,Pn(ze),jt,ae),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Dt.setValue(z,"center",Q.center),Dt.setValue(z,"modelViewMatrix",Q.modelViewMatrix),Dt.setValue(z,"normalMatrix",Q.normalMatrix),Dt.setValue(z,"modelMatrix",Q.matrixWorld),Z.uniformsGroups!==void 0){let kt=Z.uniformsGroups;for(let Ki=0,Ws=kt.length;Ki<Ws;Ki++){let Bh=kt[Ki];ye.update(Bh,fn),ye.bind(Bh,fn)}}return fn}function se(M,V){M.ambientLightColor.needsUpdate=V,M.lightProbe.needsUpdate=V,M.sunLights.needsUpdate=V,M.sunLightShadows.needsUpdate=V,M.directionalLights.needsUpdate=V,M.directionalLightShadows.needsUpdate=V,M.pointLights.needsUpdate=V,M.pointLightShadows.needsUpdate=V,M.spotLights.needsUpdate=V,M.spotLightShadows.needsUpdate=V,M.rectAreaLights.needsUpdate=V,M.hemisphereLights.needsUpdate=V}function mt(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(M,V,j){let Z=ee.get(M);Z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),ee.get(M.texture).__webglTexture=V,ee.get(M.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:j,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,V){let j=ee.get(M);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(M,V=0,j=0){oe=M,$=V,K=j;let Z=null,Q=!1,Ie=!1;if(M){let we=ee.get(M);if(we.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(z.FRAMEBUFFER,we.__webglFramebuffer),re.copy(M.viewport),ve.copy(M.scissor),Me=M.scissorTest,y.viewport(re),y.scissor(ve),y.setScissorTest(Me),W=-1;return}else if(we.__webglFramebuffer===void 0)ae.setupRenderTarget(M);else if(we.__hasExternalTextures)ae.rebindTextures(M,ee.get(M.texture).__webglTexture,ee.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ot=M.depthTexture;if(we.__boundDepthTexture!==ot){if(ot!==null&&ee.has(ot)&&(M.width!==ot.image.width||M.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ae.setupDepthRenderbuffer(M)}}let Ve=M.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Ie=!0);let Ge=ee.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ge[V])?Z=Ge[V][j]:Z=Ge[V],Q=!0):M.samples>0&&ae.useMultisampledRTT(M)===!1?Z=ee.get(M).__webglMultisampledFramebuffer:Array.isArray(Ge)?Z=Ge[j]:Z=Ge,re.copy(M.viewport),ve.copy(M.scissor),Me=M.scissorTest}else re.copy(F).multiplyScalar(R).floor(),ve.copy(J).multiplyScalar(R).floor(),Me=fe;if(j!==0&&(Z=k),y.bindFramebuffer(z.FRAMEBUFFER,Z)&&y.drawBuffers(M,Z),y.viewport(re),y.scissor(ve),y.setScissorTest(Me),Q){let we=ee.get(M.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+V,we.__webglTexture,j)}else if(Ie){let we=V;for(let Ve=0;Ve<M.textures.length;Ve++){let Ge=ee.get(M.textures[Ve]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ve,Ge.__webglTexture,j,we)}}else if(M!==null&&j!==0){let we=ee.get(M.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,we.__webglTexture,j)}W=-1};function Ut(M){let V=ee.get(M);return(V.__readFormat!==M.format||V.__readType!==M.type)&&(V.__readFormat=M.format,V.__readType=M.type,V.__formatReadable=P.textureFormatReadable(M.format),V.__typeReadable=P.textureTypeReadable(M.type)),V}this.readRenderTargetPixels=function(M,V,j,Z,Q,Ie,Ue,we=0){if(!(M&&M.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=ee.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ve=Ve[Ue]),Ve){y.bindFramebuffer(z.FRAMEBUFFER,Ve);try{let Ge=M.textures[we],ot=Ge.format,rt=Ge.type;M.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+we);let We=Ut(Ge);if(We.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(We.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=M.width-Z&&j>=0&&j<=M.height-Q&&z.readPixels(V,j,Z,Q,Ce.convert(ot),Ce.convert(rt),Ie)}finally{let Ge=oe!==null?ee.get(oe).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(M,V,j,Z,Q,Ie,Ue,we=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=ee.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ve=Ve[Ue]),Ve)if(V>=0&&V<=M.width-Z&&j>=0&&j<=M.height-Q){y.bindFramebuffer(z.FRAMEBUFFER,Ve);let Ge=M.textures[we],ot=Ge.format,rt=Ge.type;M.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+we);let We=Ut(Ge);if(We.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(We.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let At=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,At),z.bufferData(z.PIXEL_PACK_BUFFER,Ie.byteLength,z.STREAM_READ),z.readPixels(V,j,Z,Q,Ce.convert(ot),Ce.convert(rt),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let Gt=oe!==null?ee.get(oe).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,Gt);let Ft=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await gf(z,Ft,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,At),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Ie),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(At),z.deleteSync(Ft),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,V=null,j=0){let Z=Math.pow(2,-j),Q=Math.floor(M.image.width*Z),Ie=Math.floor(M.image.height*Z),Ue=V!==null?V.x:0,we=V!==null?V.y:0;ae.setTexture2D(M,0),z.copyTexSubImage2D(z.TEXTURE_2D,j,0,0,Ue,we,Q,Ie),y.unbindTexture()},this.copyTextureToTexture=function(M,V,j=null,Z=null,Q=0,Ie=0){let Ue,we,Ve,Ge,ot,rt,We,At,Gt,Ft=M.isCompressedTexture?M.mipmaps[Ie]:M.image;if(j!==null)Ue=j.max.x-j.min.x,we=j.max.y-j.min.y,Ve=j.isBox3?j.max.z-j.min.z:1,Ge=j.min.x,ot=j.min.y,rt=j.isBox3?j.min.z:0;else{let jt=Math.pow(2,-Q);Ue=Math.floor(Ft.width*jt),we=Math.floor(Ft.height*jt),M.isDataArrayTexture?Ve=Ft.depth:M.isData3DTexture?Ve=Math.floor(Ft.depth*jt):Ve=1,Ge=0,ot=0,rt=0}Z!==null?(We=Z.x,At=Z.y,Gt=Z.z):(We=0,At=0,Gt=0);let lt=Ce.convert(V.format),Tt=Ce.convert(V.type),ze;V.isData3DTexture?(ae.setTexture3D(V,0),ze=z.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(ae.setTexture2DArray(V,0),ze=z.TEXTURE_2D_ARRAY):(ae.setTexture2D(V,0),ze=z.TEXTURE_2D),y.activeTexture(z.TEXTURE0),y.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,V.flipY),y.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),y.pixelStorei(z.UNPACK_ALIGNMENT,V.unpackAlignment);let Wt=y.getParameter(z.UNPACK_ROW_LENGTH),vt=y.getParameter(z.UNPACK_IMAGE_HEIGHT),fn=y.getParameter(z.UNPACK_SKIP_PIXELS),Ln=y.getParameter(z.UNPACK_SKIP_ROWS),Zn=y.getParameter(z.UNPACK_SKIP_IMAGES);y.pixelStorei(z.UNPACK_ROW_LENGTH,Ft.width),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ft.height),y.pixelStorei(z.UNPACK_SKIP_PIXELS,Ge),y.pixelStorei(z.UNPACK_SKIP_ROWS,ot),y.pixelStorei(z.UNPACK_SKIP_IMAGES,rt);let Gs=M.isDataArrayTexture||M.isData3DTexture,Dt=V.isDataArrayTexture||V.isData3DTexture;if(M.isDepthTexture){let jt=ee.get(M),Zi=ee.get(V),kt=ee.get(jt.__renderTarget),Ki=ee.get(Zi.__renderTarget);y.bindFramebuffer(z.READ_FRAMEBUFFER,kt.__webglFramebuffer),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let Ws=0;Ws<Ve;Ws++)Gs&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ee.get(M).__webglTexture,Q,rt+Ws),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ee.get(V).__webglTexture,Ie,Gt+Ws)),z.blitFramebuffer(Ge,ot,Ue,we,We,At,Ue,we,z.DEPTH_BUFFER_BIT,z.NEAREST);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Q!==0||M.isRenderTargetTexture||ee.has(M)){let jt=ee.get(M),Zi=ee.get(V);y.bindFramebuffer(z.READ_FRAMEBUFFER,D),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,G);for(let kt=0;kt<Ve;kt++)Gs?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,jt.__webglTexture,Q,rt+kt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,jt.__webglTexture,Q),Dt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Zi.__webglTexture,Ie,Gt+kt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Zi.__webglTexture,Ie),Q!==0?z.blitFramebuffer(Ge,ot,Ue,we,We,At,Ue,we,z.COLOR_BUFFER_BIT,z.NEAREST):Dt?z.copyTexSubImage3D(ze,Ie,We,At,Gt+kt,Ge,ot,Ue,we):z.copyTexSubImage2D(ze,Ie,We,At,Ge,ot,Ue,we);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Dt?M.isDataTexture||M.isData3DTexture?z.texSubImage3D(ze,Ie,We,At,Gt,Ue,we,Ve,lt,Tt,Ft.data):V.isCompressedArrayTexture?z.compressedTexSubImage3D(ze,Ie,We,At,Gt,Ue,we,Ve,lt,Ft.data):z.texSubImage3D(ze,Ie,We,At,Gt,Ue,we,Ve,lt,Tt,Ft):M.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Ie,We,At,Ue,we,lt,Tt,Ft.data):M.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Ie,We,At,Ft.width,Ft.height,lt,Ft.data):z.texSubImage2D(z.TEXTURE_2D,Ie,We,At,Ue,we,lt,Tt,Ft);y.pixelStorei(z.UNPACK_ROW_LENGTH,Wt),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,vt),y.pixelStorei(z.UNPACK_SKIP_PIXELS,fn),y.pixelStorei(z.UNPACK_SKIP_ROWS,Ln),y.pixelStorei(z.UNPACK_SKIP_IMAGES,Zn),Ie===0&&V.generateMipmaps&&z.generateMipmap(ze),y.unbindTexture()},this.initRenderTarget=function(M){ee.get(M).__webglFramebuffer===void 0&&ae.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ae.setTextureCube(M,0):M.isData3DTexture?ae.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ae.setTexture2DArray(M,0):ae.setTexture2D(M,0),y.unbindTexture()},this.resetState=function(){$=0,K=0,oe=null,y.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}};function Ku(i,e){if(e===vu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Lr||e===Ho){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Lr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function ep(i){let e=new Map,t=new Map,n=i.clone();return tp(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function tp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)tp(i.children[n],e.children[n],t)}var Br=class extends bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new nh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new Qu(t)}),this.register(function(t){return new ec(t,Mt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new ec(t,Mt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new mh(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=Gi.extractUrlBase(e);o=Gi.resolveURL(c,this.path)}else o=Gi.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Er(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===op){try{o[Mt.KHR_BINARY_GLTF]=new gh(e)}catch(d){s&&s(d);return}r=JSON.parse(o[Mt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Sh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case Mt.KHR_MATERIALS_UNLIT:o[d]=new eh;break;case Mt.KHR_DRACO_MESH_COMPRESSION:o[d]=new _h(r,this.dracoLoader);break;case Mt.KHR_TEXTURE_TRANSFORM:o[d]=new xh;break;case Mt.KHR_MESH_QUANTIZATION:o[d]=new yh;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Mv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function en(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Mt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Qu=class{constructor(e){this.parser=e,this.name=Mt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new tt(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],wn);let d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new as(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ao(u),c.distance=d;break;case"spot":c=new wo(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),wi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},eh=class{constructor(){this.name=Mt.KHR_MATERIALS_UNLIT}getMaterialType(){return oi}extendParams(e,t,n){let s=[];e.color=new tt(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],wn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Et))}return Promise.all(s)}},th=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},nh=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new be(r,r)}return Promise.all(s)}},ih=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},sh=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},rh=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_SHEEN}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new tt(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],wn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Et)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},oh=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},ah=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_VOLUME}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new tt().setRGB(r[0],r[1],r[2],wn),Promise.all(s)}},lh=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_IOR}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},ch=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new tt().setRGB(r[0],r[1],r[2],wn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Et)),Promise.all(s)}},uh=class{constructor(e){this.parser=e,this.name=Mt.EXT_MATERIALS_BUMP}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},hh=class{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return en(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},dh=class{constructor(e){this.parser=e,this.name=Mt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},fh=class{constructor(e){this.parser=e,this.name=Mt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},ph=class{constructor(e){this.parser=e,this.name=Mt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},ec=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(f),u,d,h,s.mode,s.filter),f})})}else return null}},mh=class{constructor(e){this.name=Mt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==ei.TRIANGLES&&c.mode!==ei.TRIANGLE_STRIP&&c.mode!==ei.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(let m of d){let _=new ct,p=new S,g=new De,b=new S(1,1,1),w=new co(m.geometry,m.material,h);for(let E=0;E<h;E++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,E),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,E),l.SCALE&&b.fromBufferAttribute(l.SCALE,E),w.setMatrixAt(E,_.compose(p,g,b));let v=null;for(let E in l)if(E==="_COLOR_0"){let A=l[E];w.instanceColor=new Fi(A.array,A.itemSize,A.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(v===null){let T=w.geometry;v=new wt,v.name=T.name;for(let x in T.attributes)v.setAttribute(x,T.attributes[x]);for(let x in T.morphAttributes)v.morphAttributes[x]=T.morphAttributes[x];T.index!==null&&v.setIndex(T.index),v.morphTargetsRelative=T.morphTargetsRelative;for(let x of T.groups)v.addGroup(x.start,x.count,x.materialIndex);T.boundingBox!==null&&(v.boundingBox=T.boundingBox.clone()),T.boundingSphere!==null&&(v.boundingSphere=T.boundingSphere.clone()),v.drawRange.start=T.drawRange.start,v.drawRange.count=T.drawRange.count,v.userData=Object.assign({},T.userData),w.geometry=v}let A=l[E];v.setAttribute(E,new Fi(A.array,A.itemSize,A.normalized))}zt.prototype.copy.call(w,m),this.parser.assignFinalMaterial(w),f.push(w)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},op="glTF",Go=12,np={JSON:1313821514,BIN:5130562},gh=class{constructor(e){this.name=Mt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Go),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==op)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Go,r=new DataView(e,Go),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===np.JSON){let c=new Uint8Array(e,Go+o,a);this.content=n.decode(c)}else if(l===np.BIN){let c=Go+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},_h=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Mt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let u in o){let d=Mh[u]||u.toLowerCase();a[d]=o[u]}for(let u in e.attributes){let d=Mh[u]||u.toLowerCase();if(o[u]!==void 0){let h=n.accessors[e.attributes[u]],f=Or[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(f){for(let m in f.attributes){let _=f.attributes[m],p=l[m];p!==void 0&&(_.normalized=p)}d(f)},a,c,wn,h)})})}},xh=class{constructor(){this.name=Mt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},yh=class{constructor(){this.name=Mt.KHR_MESH_QUANTIZATION}},tc=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=s-t,d=(n-t)/u,h=d*d,f=h*d,m=e*c,_=m-c,p=-2*f+3*h,g=f-h,b=1-p,w=g-h+d;for(let v=0;v!==a;v++){let E=o[_+v+a],A=o[_+v+l]*u,T=o[m+v+a],x=o[m+v]*u;r[v]=b*E+w*A+p*T+g*x}return r}},bv=new De,vh=class extends tc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return bv.fromArray(r).normalize().toArray(r),r}},ei={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Or={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ip={9728:Jt,9729:Qt,9984:rl,9985:Cr,9986:Bs,9987:ui},sp={33071:jn,33648:ar,10497:gi},ju={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Mh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Sv={CUBICSPLINE:void 0,LINEAR:Es,STEP:Ss},$u={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ev(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new _t({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Qn})),i.DefaultMaterial}function Vs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function wi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Tv(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){let d=e[c];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;o.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let u=c[0],d=c[1],h=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function wv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Av(i){let e,t=i.extensions&&i.extensions[Mt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ju(t.attributes):e=i.indices+":"+Ju(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Ju(i.targets[n]);return e}function Ju(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function bh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Rv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Cv=new ct,Sh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Mv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new zi(this.options.manager):this.textureLoader=new Ro(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Er(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Vs(r,a,s),wi(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,u]of o.children.entries())r(u,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Mt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Gi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=ju[s.type],a=Or[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new $t(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=ju[s.type],c=Or[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,_,p;if(f&&f!==d){let g=Math.floor(h/f),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count,w=t.cache.get(b);w||(_=new c(a,g*f,s.count*f/u),w=new pr(_,f/u),t.cache.add(b,w)),p=new mr(w,l,h%f/u,m)}else a===null?_=new c(s.count*l):_=new c(a,h,s.count*l),p=new $t(_,l,m);if(s.sparse!==void 0){let g=ju.SCALAR,b=Or[s.sparse.indices.componentType],w=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,E=new b(o[1],w,s.sparse.count*g),A=new c(o[2],v,s.sparse.count*l);a!==null&&(p=new $t(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let T=0,x=E.length;T<x;T++){let C=E[T];if(p.setX(C,A[T*l]),l>=2&&p.setY(C,A[T*l+1]),l>=3&&p.setZ(C,A[T*l+2]),l>=4&&p.setW(C,A[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=m}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let h=(r.samplers||{})[o.sampler]||{};return u.magFilter=ip[h.magFilter]||Qt,u.minFilter=ip[h.minFilter]||ui,u.wrapS=sp[h.wrapS]||gi,u.wrapT=sp[h.wrapT]||gi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Jt&&u.minFilter!==Qt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;let h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let m=h;t.isImageBitmapLoader===!0&&(m=function(_){let p=new sn(_);p.needsUpdate=!0,h(p)}),t.load(Gi.resolveURL(d,r.path),m,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),wi(d,o),d.userData.mimeType=o.mimeType||Rv(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Mt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Mt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[Mt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new yr,Fn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new ai,Fn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return _t}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[Mt.KHR_MATERIALS_UNLIT]){let d=s[Mt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,r,t))}else{let d=r.pbrMetallicRoughness||{};if(a.color=new tt(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],wn),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Et)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Vt);let u=r.alphaMode||$u.OPAQUE;if(u===$u.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===$u.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==oi&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new be(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==oi&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==oi){let d=r.emissiveFactor;a.emissive=new tt().setRGB(d[0],d[1],d[2],wn)}return r.emissiveTexture!==void 0&&o!==oi&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Et)),Promise.all(c).then(function(){let d=new o(a);return r.name&&(d.name=r.name),wi(d,r),t.associations.set(d,{materials:e}),r.extensions&&Vs(s,d,r),d})}createUniqueName(e){let t=Nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Mt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return rp(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],u=Av(c),d=s[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[Mt.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=rp(new wt,c,t),c.mode===ei.TRIANGLE_STRIP?h=h.then(f=>Ku(f,Ho)):c.mode===ei.TRIANGLE_FAN&&(h=h.then(f=>Ku(f,Lr))),s[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let u=o[l].material===void 0?Ev(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,m=u.length;f<m;f++){let _=u[f],p=o[f],g,b=c[f];if(p.mode===ei.TRIANGLES||p.mode===ei.TRIANGLE_STRIP||p.mode===ei.TRIANGLE_FAN||p.mode===void 0){let w=r.isSkinnedMesh===!0,v=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");w&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=w&&v?new is(_,b):new et(_,b),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(p.mode===ei.LINES)g=new As(_,b);else if(p.mode===ei.LINE_STRIP)g=new yi(_,b);else if(p.mode===ei.LINE_LOOP)g=new uo(_,b);else if(p.mode===ei.POINTS)g=new ho(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(g.geometry.morphAttributes).length>0&&wv(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),wi(g,r),p.extensions&&Vs(s,g,p),t.assignFinalMaterial(g),d.push(g)}for(let f=0,m=d.length;f<m;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Vs(s,d[0],r),d[0];let h=new gt;r.extensions&&Vs(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,m=d.length;f<m;f++)h.add(d[f]);return h})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new nn($e.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new os(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),wi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,u=o.length;c<u;c++){let d=o[c];if(d){a.push(d);let h=new ct;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new lo(a,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let f=s.channels[d],m=s.samplers[f.sampler],_=f.target,p=_.node,g=s.parameters!==void 0?s.parameters[m.input]:m.input,b=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",b)),c.push(m),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],m=d[2],_=d[3],p=d[4],g=[];for(let w=0,v=h.length;w<v;w++){let E=h[w],A=f[w],T=m[w],x=_[w],C=p[w];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let N=n._createAnimationTracks(E,A,T,x,C);if(N)for(let B=0;B<N.length;B++)g.push(N[B])}let b=new Ls(r,void 0,g);return wi(b,s),b})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,Cv)});for(let f=0,m=d.length;f<m;f++)u.add(d[f]);if(u.userData.pivot!==void 0&&d.length>0){let f=u.userData.pivot,m=d[0];u.pivot=new S().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],m.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new gr:c.length>1?u=new gt:c.length===1?u=c[0]:u=new zt,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=o),wi(u,r),r.extensions&&Vs(n,u,r),r.matrix!==void 0){let d=new ct;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new gt;n.name&&(r.name=s.createUniqueName(n.name)),wi(r,n),n.extensions&&Vs(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++){let h=l[u];h.parent!==null?r.add(ep(h)):r.add(h)}let c=u=>{let d=new Map;for(let[h,f]of s.associations)(h instanceof Fn||h instanceof sn)&&d.set(h,f);return u.traverse(h=>{let f=s.associations.get(h);f!=null&&d.set(h,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}fs[r.path]===fs.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(a);let u;switch(fs[r.path]){case fs.weights:u=Hi;break;case fs.rotation:u=ki;break;case fs.translation:case fs.scale:u=rs;break;default:n.itemSize===1?u=Hi:u=rs;break}let d=s.interpolation!==void 0?Sv[s.interpolation]:Es,h=this._getArrayFromAccessor(n);for(let f=0,m=l.length;f<m;f++){let _=new u(l[f]+"."+fs[r.path],t.array,h,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=bh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof ki?vh:tc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Pv(i,e,t){let n=e.attributes,s=new Ot;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new S(l[0],l[1],l[2]),new S(c[0],c[1],c[2])),a.normalized){let u=bh(Or[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new S,l=new S;for(let c=0,u=r.length;c<u;c++){let d=r[c];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,m=h.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),h.normalized){let _=bh(Or[h.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Un;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function rp(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=Mh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return xt.workingColorSpace!==wn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xt.workingColorSpace}" not supported.`),wi(i,e),Pv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Tv(i,e.targets,t):i})}var ap={type:"change"},Th={type:"start"},cp={type:"end"},nc=new xi,lp=new vn,Iv=Math.cos(70*$e.DEG2RAD),an=new S,Hn=2*Math.PI,Lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Eh=1e-6,ic=class extends Po{constructor(e,t=null){super(e,t),this.state=Lt.NONE,this.target=new S,this.cursor=new S,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ls.ROTATE,MIDDLE:ls.DOLLY,RIGHT:ls.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new S,this._lastQuaternion=new De,this._lastTargetPosition=new S,this._quat=new De().setFromUnitVectors(e.up,new S(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wr,this._sphericalDelta=new wr,this._scale=1,this._panOffset=new S,this._rotateStart=new be,this._rotateEnd=new be,this._rotateDelta=new be,this._panStart=new be,this._panEnd=new be,this._panDelta=new be,this._dollyStart=new be,this._dollyEnd=new be,this._dollyDelta=new be,this._dollyDirection=new S,this._mouse=new be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Dv.bind(this),this._onPointerDown=Lv.bind(this),this._onPointerUp=Nv.bind(this),this._onContextMenu=Vv.bind(this),this._onMouseWheel=Ov.bind(this),this._onKeyDown=Bv.bind(this),this._onTouchStart=Hv.bind(this),this._onTouchMove=kv.bind(this),this._onMouseDown=Uv.bind(this),this._onMouseMove=Fv.bind(this),this._interceptControlDown=zv.bind(this),this._interceptControlUp=Gv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Lt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ap),this.update(),this.state=Lt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;an.copy(t).sub(this.target),an.applyQuaternion(this._quat),this._spherical.setFromVector3(an),this.autoRotate&&this.state===Lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Hn:n>Math.PI&&(n-=Hn),s<-Math.PI?s+=Hn:s>Math.PI&&(s-=Hn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(an.setFromSpherical(this._spherical),an.applyQuaternion(this._quatInverse),t.copy(this.target).add(an),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=an.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new S(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new S(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=an.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(nc.origin.copy(this.object.position),nc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nc.direction))<Iv?this.object.lookAt(this.target):(lp.setFromNormalAndCoplanarPoint(this.object.up,this.target),nc.intersectPlane(lp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Eh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Eh||this._lastTargetPosition.distanceToSquared(this.target)>Eh?(this.dispatchEvent(ap),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Hn/60*this.autoRotateSpeed*e:Hn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){an.setFromMatrixColumn(t,0),an.multiplyScalar(-e),this._panOffset.add(an)}_panUp(e,t){this.screenSpacePanning===!0?an.setFromMatrixColumn(t,1):(an.setFromMatrixColumn(t,0),an.crossVectors(this.object.up,an)),an.multiplyScalar(e),this._panOffset.add(an)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;an.copy(s).sub(this.target);let r=an.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new be,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Lv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Dv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Nv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(cp),this.state=Lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Uv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ls.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Lt.DOLLY;break;case ls.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}break;case ls.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Th)}function Fv(i){switch(this.state){case Lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ov(i){this.enabled===!1||this.enableZoom===!1||this.state!==Lt.NONE||(i.preventDefault(),this.dispatchEvent(Th),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(cp))}function Bv(i){this.enabled!==!1&&this._handleKeyDown(i)}function Hv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case cs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Lt.TOUCH_ROTATE;break;case cs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Lt.TOUCH_PAN;break;default:this.state=Lt.NONE}break;case 2:switch(this.touches.TWO){case cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Lt.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Lt.TOUCH_DOLLY_ROTATE;break;default:this.state=Lt.NONE}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Th)}function kv(i){switch(this._trackPointer(i),this.state){case Lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Lt.NONE}}function Vv(i){this.enabled!==!1&&i.preventDefault()}function zv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Gv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function up(i){let[e,t]=i.size,n=new gt;n.name="content-skills-book",Object.assign(n.userData,{roomId:i.room,contentId:i.id}),n.position.fromArray(i.position),n.quaternion.setFromUnitVectors(new S(0,0,1),new S(...i.normal).normalize());let s=(h,f,m)=>{let _=new li,p=-h/2,g=-f/2,b=.035;return _.moveTo(p+b,g),_.lineTo(p+h-b,g),_.quadraticCurveTo(p+h,g,p+h,g+b),_.lineTo(p+h,g+f-b),_.quadraticCurveTo(p+h,g+f,p+h-b,g+f),_.lineTo(p+b,g+f),_.quadraticCurveTo(p,g+f,p,g+f-b),_.lineTo(p,g+b),_.quadraticCurveTo(p,g,p+b,g),new Ps(_,{depth:m,bevelEnabled:!1,curveSegments:6})},r=(h,f,m,_=0)=>{let p=new et(h,new _t({color:f,roughness:.94}));return p.position.set(_,0,m),p.castShadow=!0,p.receiveShadow=!0,n.add(p),p};r(s(e-.025,t-.025,.14),15918783,-.07);let o=s(e+.04,t+.04,.02);for(let h of[-.093,.073])r(o,15054914,h);r(s(.09,t+.04,.18),3501691,-.09,-e/2+.025);let a=[];for(let h=1;h<6;h++)a.push(new S(-e/2+.055,-t/2+.011,-.07+h*.023),new S(e/2-.014,-t/2+.011,-.07+h*.023));n.add(new As(new wt().setFromPoints(a),new ai({color:13154450})));let l=document.createElement("canvas");l.width=768,l.height=1056;let c=l.getContext("2d");c.fillStyle="#efc453",c.fillRect(0,0,768,1056),c.strokeStyle="#3b737e",c.lineWidth=9,c.strokeRect(47,47,674,962),c.fillStyle="#356572",c.textAlign="center",c.font="bold 138px sans-serif",c.fillText("\u4E13\u4E1A",384,286),c.fillText("\u6280\u80FD",384,453),c.lineWidth=6,c.beginPath(),c.arc(384,625,73,0,Math.PI*2),c.stroke(),c.font="bold 48px sans-serif",c.fillText("AI",384,643),c.font="33px sans-serif",c.fillText("\u5168\u6808\u5F00\u53D1 \xB7 AI \u63D0\u6548",384,809),c.fillText("Agent \u5DE5\u7A0B",384,873);let u=new pn(l);u.colorSpace=Et;let d=new et(new cn(e,t),new _t({map:u,roughness:.96}));return d.position.z=.094,d.receiveShadow=!0,n.add(d),n}function hp(i,e){let t=(.22-i.z)/.5,n=$e.clamp(t,0,1),s=n*n*(3-2*n),r=.178*6*n*(1-n)/.5,o=.34/.5,a=Math.hypot(r,o),l=o/a,c=-r/a,u=i.y-.268,d=new S(i.x*(1+.04*s),Math.max(.006,.298-.178*s+u*l),.22-.34*t+u*c);return i.clone().lerp(d,e)}var wh=(i,e,t)=>{let n=$e.clamp((t-i)/(e-i),0,1);return n*n*(3-2*n)};function dp(i,e){let t=(.22-i.z)/.5,n=i.y-.268,s=.205,r=.3,o=Math.hypot(s,r),a=new S(i.x*(1+.07*wh(.35,.8,t)),.335-.205*t+n*r/o-.075*wh(.35,.95,t),.22-.3*t-n*s/o),l=new S(i.x*1.1,.088+(i.y-.268)*.85,-.12+(i.z+.26)*.75);return a.lerp(l,wh(.4,.95,t)),t>.6&&(a.y=Math.max(.003,a.y)),i.clone().lerp(a,e)}function fp(i,e,{root:t,canvas:n,camera:s,reducedMotion:r}){let o=new Map;i.traverse(L=>{L.isBone&&o.set(L.name,{node:L,quaternion:L.quaternion.clone(),position:L.position.clone()}),L.isSkinnedMesh&&(L.frustumCulled=!1),L.userData.petId=e.id}),i.updateMatrixWorld(!0);let a=i.matrixWorld.clone().invert(),l=i.getWorldQuaternion(new De),c=["back_r","front_r","back_l","front_l"],u=new Map;i.traverse(L=>{L.isBone&&u.set(L.name,L.getWorldPosition(new S).applyMatrix4(i.matrixWorld.clone().invert()))});let d=L=>L.getWorldPosition(new S),h=c.map((L,le)=>{let de=o.get(`pet_${L}_upper`)?.node,Ze=o.get(`pet_${L}_lower`)?.node,Ke=o.get(`pet_${L}_paw`)?.node;if(!de||!Ze||!Ke)throw new Error(`\u66B9\u7F57\u732B\u7F3A\u5C11\u56DB\u8DB3\u9AA8\u9ABC\uFF1A${L}`);let je=d(de),ht=d(Ze),St=d(Ke),Kt=St.clone().applyMatrix4(a),_n=ht.clone().sub(je.clone().lerp(St,.5)).transformDirection(a);return{name:L,offset:-le*.25,upper:de,lower:Ze,paw:Ke,rest:Kt,pole:_n,hipRest:je.clone().applyMatrix4(a),a:je.distanceTo(ht),b:ht.distanceTo(St),pawQuaternion:l.clone().invert().multiply(Ke.getWorldQuaternion(new De)),anchorQuaternion:Ke.getWorldQuaternion(new De),targetQuaternion:Ke.getWorldQuaternion(new De),landingQuaternion:Ke.getWorldQuaternion(new De),startQuaternion:Ke.getWorldQuaternion(new De),anchor:St.clone(),target:St.clone(),start:St.clone(),landing:St.clone(),swing:!1,phase:0,contacts:0}});for(let L of h)L.pawSurface=[],i.traverse(le=>{if(!le.isSkinnedMesh||le.userData.petFur)return;let de=le.geometry.attributes.position,Ze=le.geometry.attributes.skinIndex,Ke=le.geometry.attributes.skinWeight;for(let je=0;je<de.count;je++){let ht=0;for(let St=0;St<4;St++)le.skeleton.bones[Ze.array[je*4+St]].name===L.paw.name&&(ht+=Ke.array[je*4+St]);ht>.95&&L.pawSurface.push(new S().fromBufferAttribute(de,je).applyMatrix4(le.matrixWorld).applyMatrix4(a).sub(L.rest).applyQuaternion(L.pawQuaternion.clone().invert()))}});for(let L of h){let le=L.pawSurface.map(je=>{let ht=je.clone().applyQuaternion(L.pawQuaternion).add(L.rest).sub(L.hipRest);return{x:ht.x,y:ht.y,raw:je}}).sort((je,ht)=>je.x-ht.x||je.y-ht.y),de=(je,ht,St)=>(ht.x-je.x)*(St.y-je.y)-(ht.y-je.y)*(St.x-je.x),Ze=[],Ke=[];for(let je of le){for(;Ze.length>1&&de(Ze.at(-2),Ze.at(-1),je)<=0;)Ze.pop();Ze.push(je)}for(let je of[...le].reverse()){for(;Ke.length>1&&de(Ke.at(-2),Ke.at(-1),je)<=0;)Ke.pop();Ke.push(je)}L.supportSurface=[...Ze.slice(0,-1),...Ke.slice(0,-1)].map(je=>je.raw),L.floorBaseline=L.rest.y+Math.min(...L.pawSurface.map(je=>je.clone().applyQuaternion(L.pawQuaternion).y))}let f=new Rs([i.position.clone(),...e.pet.route.map(([L,le])=>new S(L,e.position[1],le))],!0,"centripetal"),m=f.getLength(),_=e.pet.gaitCycle??.94,p=.66,g=e.pet.walkSpeed??.13,b=0,w="idle",v=0,E=0,A=0,T=0,x=4.5,C=0,N=0,B=!1,O="idle",k=0,D=!1,G=0,$=0,K=!1,oe=0,W=null,ie=0,re=null,ve=e.pet.bodyScale??1,Me=!!e.pet.restPoses,Ne=!!e.pet.groundedSideLie,Ye=.335*ve,_e=[];Ne&&i.traverse(L=>{if(!L.isSkinnedMesh||L.userData.petFur)return;let le=L.geometry.attributes.position,de=L.geometry.attributes.skinIndex,Ze=L.geometry.attributes.skinWeight;for(let Ke=0;Ke<le.count;Ke++){let je=0;for(let ht=0;ht<4;ht++)["pet_root","pet_chest","pet_haunch"].includes(L.skeleton.bones[de.array[Ke*4+ht]].name)&&(je+=Ze.array[Ke*4+ht]);je>.55&&le.getY(Ke)>.16&&le.getY(Ke)<.44&&_e.push(new S().fromBufferAttribute(le,Ke))}});let H=L=>{let le=1/0,de=Math.sin(L),Ze=Math.cos(L);for(let Ke of _e)le=Math.min(le,de*Ke.x+Ze*(Ke.y-Ye));return-le+.004},R=.165*ve;Me&&i.traverse(L=>{if(L.isSkinnedMesh&&!L.userData.petFur){let le=L.geometry.attributes.position;for(let de=0;de<le.count;de++)le.getY(de)>.22&&le.getY(de)<.55&&Math.abs(le.getZ(de))<.2&&(R=Math.max(R,-le.getX(de)+.004))}});let I=0,U=0,F=null,J="idle",fe=[];i.traverse(L=>{L.isMesh&&L.morphTargetDictionary?.sit_100!==void 0&&fe.push(L)});let q=[];i.traverse(L=>{L.isMesh&&L.morphTargetDictionary?.lie_100!==void 0&&q.push(L)});let te=new S(0,1,0),ne=new S(0,1,0),pe=e.position[1],ce=L=>L*L*(3-2*L),Oe=L=>f.getPointAt((L%m+m)%m/m),Fe=L=>{let le=f.getTangentAt((L%m+m)%m/m);return Math.atan2(le.x,le.z)},Ee=e.rotation,ke=o.get("pet_head"),z=e.pet.faceForward?Math.atan2(e.pet.faceForward[0],e.pet.faceForward[2]):0,ft=new S().fromArray(e.pet.faceForward??[0,0,1]).applyQuaternion(l).applyQuaternion(ke.node.getWorldQuaternion(new De).invert()),st=e.pet.faceCenter?new S().fromArray(e.pet.faceCenter).applyMatrix4(i.matrixWorld).applyMatrix4(ke.node.matrixWorld.clone().invert()):null,P=(L,le)=>Math.atan2(Math.sin(le-L),Math.cos(le-L)),y=(L,le,de)=>L+Math.max(-de,Math.min(de,le-L)),Y=()=>{let L=st?st.clone().applyMatrix4(ke.node.matrixWorld):d(ke.node),le=W??s.position;return Math.atan2(le.x-L.x,le.z-L.z)},ee=4,ae=0,Se=document.createElement("div");Se.className="pet-greeting",Se.setAttribute("role","status"),Se.setAttribute("aria-live","polite"),Se.hidden=!0,t.append(Se);function Te(L=!B){let le=new S(0,1.02,.2).applyMatrix4(i.matrixWorld).project(s),de=n.getBoundingClientRect(),Ze=t.getBoundingClientRect();Se.hidden=!L||ae<=0||le.z<-1||le.z>1,Se.style.left=`${$e.clamp(de.left-Ze.left+(le.x*.5+.5)*de.width,40,de.width-40)}px`,Se.style.top=`${$e.clamp(de.top-Ze.top+(-le.y*.5+.5)*de.height,45,de.height-45)}px`}function ue(){for(let{node:L,quaternion:le,position:de}of o.values())L.quaternion.copy(le),L.position.copy(de)}function ge(L,le=0,de=0,Ze=0){let Ke=o.get(L);Ke&&(L==="pet_head"&&(le=$e.clamp(le,-.07,.07),de=$e.clamp(de,-.36,.36),Ze=$e.clamp(Ze,-.19,.19)),Ke.node.rotateX(le),Ke.node.rotateY(de),Ke.node.rotateZ(Ze))}function Ae(L,le){let de=L.getWorldQuaternion(new De),Ze=le.clone().sub(d(L)).normalize(),Ke=new De().setFromUnitVectors(ne.clone().applyQuaternion(de),Ze),je=L.parent.getWorldQuaternion(new De).invert();L.quaternion.copy(je.multiply(Ke.multiply(de))),L.updateWorldMatrix(!1,!0)}function Xe(L){let le=d(L.upper);if(L.relaxedSide>0){let Rt=L.target.clone().sub(le),Yn=(L.a+L.b)*(L.stretch??1)-1e-4,En=Math.hypot(Rt.x,Rt.z),Ri=Math.sqrt(Math.max(1e-5,Yn*Yn-Rt.y*Rt.y));En>Ri&&(L.target.x=le.x+Rt.x*Ri/En,L.target.z=le.z+Rt.z*Ri/En)}let de=L.target.clone().sub(le),Ze=de.length();de.normalize();let Ke=L.a*(L.stretch??1),je=L.b*(L.stretch??1),ht=Math.max(Math.abs(Ke-je)+1e-5,Math.min(Ke+je-1e-5,Ze)),St=L.pole.clone().applyQuaternion(i.getWorldQuaternion(new De));L.relaxedSide>0&&St.lerp(new S(-.2,.1,L.name.startsWith("front")?-1:1).applyAxisAngle(te,Ee).normalize(),L.relaxedSide).normalize(),St.addScaledVector(de,-St.dot(de)).normalize();let Kt=$e.clamp((Ke*Ke+ht*ht-je*je)/(2*Ke*ht),-1,1),_n=le.clone().addScaledVector(de,Ke*Kt).addScaledVector(St,Ke*Math.sqrt(1-Kt*Kt));Ae(L.upper,_n),Ae(L.lower,le.clone().addScaledVector(de,ht));let Sn=L.targetQuaternion.clone();if(L.relaxedSide>0){let Rt=new De().setFromAxisAngle(te,Ee).multiply(new De().setFromAxisAngle(new S(0,0,1),-.25)).multiply(L.pawQuaternion).slerp(L.lower.getWorldQuaternion(new De).multiply(o.get(L.paw.name).quaternion),.4);Sn.slerp(Rt,L.relaxedSide)}L.paw.quaternion.copy(L.paw.parent.getWorldQuaternion(new De).invert().multiply(Sn)),L.paw.updateWorldMatrix(!1,!0)}function Le(L,le){let de=b+le*_*(1-p+p*.5);return L.rest.clone().applyAxisAngle(te,Fe(de)).add(Oe(de))}function Pe(L="idle"){w="settling",v=0,x=1/0,O=L;for(let le of h)le.settled=!1,le.landingIsRest=!1}function qe(L="idle"){(L==="sit"&&e.pet.sitEnabled===!1||L==="lie"&&e.pet.lieEnabled===!1)&&(L="idle"),w=L,v=0,x=L==="curious"?1/0:L==="lie"?7+T%3:4.5+T%3*.7}function Je(L){w=L,v=0,x=L==="walk"?5.5+T%4*1.1:1/0;for(let le of h)le.settled=!1,le.waitForStance=((A/_+le.offset)%1+1)%1>=p}function nt(){N++,ae=ee,D=!0,G=0,K=k>.5,Me&&(J=F??(U>.1?"lie":I>.1?"sit":"idle"),F=null,K=!1),Se.textContent="\u55B5\uFF5E",Te(),w==="walk"||w==="turn"?Pe("curious"):w==="settling"?O="curious":qe("curious"),Re()}function X(){return{state:B?"paused":w,position:i.position.toArray().map(L=>+L.toFixed(5)),yaw:+Ee.toFixed(5),steps:h.reduce((L,le)=>L+le.contacts,0),reactions:N,reducedMotion:r,bones:o.size,crouch:+k.toFixed(4),facingCamera:+Math.cos(P(Math.atan2(ft.clone().applyQuaternion(ke.node.getWorldQuaternion(new De)).x,ft.clone().applyQuaternion(ke.node.getWorldQuaternion(new De)).z),Y())).toFixed(5),sit:+I.toFixed(4),sideLie:+U.toFixed(4),tailLift:+oe.toFixed(4),interaction:ie>0,head:o.get("pet_head")?.node.quaternion.toArray(),tail:o.get("pet_tail_tip")?.node.quaternion.toArray(),feet:h.map(L=>({name:L.name,swing:L.swing,phase:+L.phase.toFixed(4),contacts:L.contacts,target:L.target.toArray(),actual:d(L.paw).toArray()}))}}function Re(){let L=X();t.dataset.petState=L.state,t.dataset.petPosition=JSON.stringify(L.position),t.dataset.petPose=JSON.stringify({head:L.head,tail:L.tail,yaw:L.yaw,crouch:L.crouch,sit:L.sit,sideLie:L.sideLie,facingCamera:L.facingCamera}),t.dataset.petFeet=JSON.stringify(L.feet),t.dataset.petSteps=String(L.steps),t.dataset.petReactions=String(N),t.dataset.petBones=String(o.size),t.dataset.petFacing=String(D&&L.sit<.02&&L.sideLie<.02&&L.facingCamera>.995);let le=d(ke.node).add(new S(0,.12,0)).project(s),de=n.getBoundingClientRect();t.dataset.petScreen=JSON.stringify([de.left+(le.x*.5+.5)*de.width,de.top+(-le.y*.5+.5)*de.height])}function me(L,le){if(B=!le,le){ae=Math.max(0,ae-L),E+=L,(!r||D)&&(v+=L),ie=Math.max(0,ie-L),W&&ie===0&&(W=null,F=re,re=null),v>=x&&F===null&&(w==="idle"&&!r?(T++,Je("turn")):w==="walk"?Pe(Me?T%2===0?"lie":"sit":T%2===0?"lie":"idle"):(w==="lie"||w==="sit")&&qe());let de=D||ie>0,Ze=de?Y()-z:Fe(b),Ke=P(Ee,Ze),je=Math.abs(Ke)>(de?.26:.035);w==="curious"&&je&&k<.02&&I<.02&&U<.02&&Je("turn");let ht=!Me||I<.001&&U<.001,St=w==="turn"&&ht;St&&(Ee+=$e.clamp(Ke,-.3*L,.3*L),i.rotation.y=Ee,Math.abs(P(Ee,Ze))<.035&&Pe(D?"curious":"walk"));let Kt=w==="walk"&&ht,_n=ht&&(Kt||w==="settling"||w==="turn"),Sn=Fe(b+.025)-Fe(b),Rt=Math.abs(Math.atan2(Math.sin(Sn),Math.cos(Sn)))/.025,Yn=Kt?Math.min(g,.28/Math.max(.01,Rt))*ce(Math.min(1,v/1.1))*ce(Math.min(1,(x-v)/1.1)):0;Kt&&(b+=Yn*L,i.position.copy(Oe(b)),Ee=Fe(b),i.rotation.y=Ee);let En=r?w==="curious"?.6:0:1;if(k=y(k,!Me&&(w==="lie"||D&&K&&!je)?1:0,L/1.4),i.position.y=pe-.125*ce(k)+.0015*Math.sin(E*1.5)*En,ue(),Me){let se=w!=="settling"&&w!=="walk"&&w!=="turn";I=y(I,e.pet.sitEnabled!==!1&&!D&&se&&U<.001&&(F??w)==="sit"?1:0,L/1.9),U=y(U,e.pet.lieEnabled!==!1&&!D&&se&&I<.001&&(F??w)==="lie"?1:0,L/2.3);let mt=ce(I),Ut=ce(U),M=Ut*(Ne?-Math.PI*.5:Math.PI*.5);i.quaternion.setFromAxisAngle(te,Ee).multiply(new De().setFromAxisAngle(new S(0,0,1),M));let V=(Ne?Ye:.32*ve)*Math.sin(M),j=e.pet.poseSitV2||e.pet.poseSitV3?0:.12*ve*mt,Z=Oe(b);i.position.x=Z.x+V*Math.cos(Ee)+j*Math.sin(Ee),i.position.z=Z.z-V*Math.sin(Ee)+j*Math.cos(Ee),i.position.y=pe+(Ne?$e.lerp(Ye,H(M),Ut)-Ye*Math.cos(M):(R+.008)*Math.sin(M)),i.updateMatrixWorld(!0);let Q=o.get("pet_chest")?.node,Ie=o.get("pet_root")?.node;if(Q&&Ie){let we=d(Q).add(new S(-j*Math.sin(Ee),e.pet.poseSitV3?.064*mt:e.pet.poseSitV2?.03*mt:e.pet.sitCorrectives?.018*mt:0,-j*Math.cos(Ee))),Ve=Q.getWorldQuaternion(new De),Ge=Ie.parent.getWorldQuaternion(new De),ot=new S(1,0,0).applyAxisAngle(te,Ee),rt=new De().setFromAxisAngle(ot,e.pet.poseSitV2||e.pet.poseSitV3?0:-.45*mt);Ie.quaternion.copy(Ge.clone().invert().multiply(rt).multiply(Ge).multiply(Ie.quaternion)),i.updateMatrixWorld(!0),Q.position.copy(we.applyMatrix4(Q.parent.matrixWorld.clone().invert())),Q.quaternion.copy(Q.parent.getWorldQuaternion(new De).invert().multiply(Ve)),i.updateMatrixWorld(!0)}let Ue=o.get("pet_haunch")?.node;if(e.pet.poseSitV2||e.pet.poseSitV3)for(let we of["pet_haunch","pet_back_l_upper","pet_back_r_upper"]){let Ve=o.get(we)?.node;if(!Ve)continue;let Ge=(e.pet.poseSitV3?dp:hp)(u.get(we),mt).applyMatrix4(i.matrixWorld);Ve.position.copy(Ge.applyMatrix4(Ve.parent.matrixWorld.clone().invert())),Ve.updateWorldMatrix(!1,!0)}else if(Ue){let we=e.pet.sitCorrectives?new S(0,.01*mt,.055*mt).applyAxisAngle(te,Ee):new S(0,-.02*ve*mt,0);Ue.position.add(we.applyQuaternion(Ue.parent.getWorldQuaternion(new De).invert()))}}let yt=ae>0?ce(Math.min(1,(ee-ae)/.2))*ce(Math.min(1,ae/.65)):0,Yt=Ne?$e.lerp(.3,.09,ce(U)):.3;$=$e.damp($,de?$e.clamp(P(Ee+z,Y()),-Yt,Yt):(Kt?.025:.15)*Math.sin(E*.65)*En,7,L),i.updateMatrixWorld(!0);let Ht=ke.node.parent.getWorldQuaternion(new De),Pn=new De().setFromAxisAngle(te,Kt?$e.clamp($,-.035,.035):$);ke.node.quaternion.copy(Ht.clone().invert().multiply(Pn).multiply(Ht).multiply(ke.quaternion));let In=W??s.position,Yi=d(ke.node),zr=de?$e.clamp(Math.atan2(In.y-Yi.y,Math.hypot(In.x-Yi.x,In.z-Yi.z))*.1,-.03,.03):(Kt?.006:.035)*Math.sin(E*.9)*En;if(ke.node.rotateX(zr),de||ke.node.rotateZ((Kt?.018:.035)*Math.sin(E*.9)*En),Me&&U>0){let se=new S(0,0,1).applyAxisAngle(te,Ee),mt=ke.node.parent.getWorldQuaternion(new De),Ut=new De().setFromAxisAngle(se,(Ne?Math.PI/9:-.25*Math.PI*.5)*ce(U));if(Ne){let M=new De().setFromAxisAngle(new S(0,1,0).applyQuaternion(i.quaternion),-z*.5*ce(U));ke.node.quaternion.copy(mt.clone().invert().multiply(M).multiply(mt).multiply(ke.node.quaternion))}ke.node.quaternion.copy(mt.clone().invert().multiply(Ut).multiply(mt).multiply(ke.node.quaternion))}oe=$e.damp(oe,de&&(!e.pet.poseSideArap||U<.01)?1:w==="walk"?.3:.07,de?5:1.8,L);for(let[se,mt]of[["pet_tail",e.pet.poseSitV2?-1.15-.3*I+.57*U:-1.15+.35*I+.57*U],["pet_tail_tip",e.pet.poseSitV2?-.7+.5*I+.4*U:-.7+.2*I+.4*U]]){let Ut=o.get(se),M=Ut.node.parent.getWorldQuaternion(new De),V=new S(1,0,0).applyAxisAngle(te,Ee),j=new De().setFromAxisAngle(te,e.pet.poseSideArap&&U>.01?0:.055*Math.sin(E*1.5)*En+.12*Math.sin(E*4)*yt).multiply(new De().setFromAxisAngle(V,mt*(1-oe)));Ut.node.quaternion.copy(M.clone().invert().multiply(j).multiply(M).multiply(Ut.node.quaternion)),Ut.node.updateWorldMatrix(!1,!0)}if(Ne&&U>0){let se=ce(U),mt=o.get("pet_tail").node,Ut=o.get("pet_tail_tip").node;for(let M of[mt,Ut]){let V=M.quaternion.clone(),j=d(M).add(new S(.025*ve,0,-.16*ve).applyAxisAngle(te,Ee));j.y=pe+(M===mt?.095:.09)*ve,Ae(M,j);let Z=M.quaternion.clone();M.quaternion.copy(V).slerp(Z,se),M.updateWorldMatrix(!1,!0)}}i.updateMatrixWorld(!0),_n&&(A+=L);for(let se of h){if(e.pet.poseSideArap&&Ne&&U>0){let M=ce(U),V=se.rest.x<0,j=new S(0,0,1).applyAxisAngle(te,Ee),Z=d(se.upper),Q=d(se.paw),Ie=se.paw.getWorldQuaternion(new De),Ue=se.supportSurface.map(lt=>{let Tt=lt.clone().applyQuaternion(Ie).add(Q).sub(Z);return[Tt.y,j.clone().cross(Tt).y]}),we=lt=>{let Tt=Math.cos(lt),ze=Math.sin(lt),Wt=1/0;for(let[vt,fn]of Ue)Wt=Math.min(Wt,vt*Tt+fn*ze);return Z.y+Wt},Ve=(V?Math.PI/3:.05)*M,Ge=Array.from({length:77},(lt,Tt)=>-1.52+Tt*.04),ot=Math.min(...Ge.map(we)),rt=Math.max(pe+$e.lerp(se.floorBaseline,.001,M)+(V?.035*M:0),ot+5e-4*M),We=[];for(let lt=1;lt<Ge.length;lt++){let Tt=Ge[lt-1],ze=Ge[lt],Wt=we(Tt)-rt,vt=we(ze)-rt;if(!(Wt*vt>0)){for(let fn=0;fn<15;fn++){let Ln=(Tt+ze)*.5,Zn=we(Ln)-rt;Wt*Zn<=0?(ze=Ln,vt=Zn):(Tt=Ln,Wt=Zn)}We.push((Tt+ze)*.5)}}let At=We.length?We.reduce((lt,Tt)=>Math.abs(Tt-Ve)<Math.abs(lt-Ve)?Tt:lt):Ge.reduce((lt,Tt)=>Math.abs(we(Tt)-rt)<Math.abs(we(lt)-rt)?Tt:lt),Gt=se.upper.parent.getWorldQuaternion(new De),Ft=new De().setFromAxisAngle(te,(se.name.startsWith("front")?Math.PI/6:-Math.PI/9)*M).multiply(new De().setFromAxisAngle(j,At));se.upper.quaternion.copy(Gt.clone().invert().multiply(Ft).multiply(Gt).multiply(se.upper.quaternion)),se.upper.updateWorldMatrix(!1,!0),se.anchor.copy(d(se.paw)),se.target.copy(se.anchor),se.anchorQuaternion.copy(se.paw.getWorldQuaternion(new De)),se.targetQuaternion.copy(se.anchorQuaternion),se.swing=!1,se.relaxedSide=0;continue}if(Me&&U>.001&&!Ne){let M=ce(U),V=se.upper.parent.getWorldQuaternion(new De),j=new S(0,0,1).applyAxisAngle(te,Ee),Z=new De().setFromAxisAngle(j,-.5*M*(se.rest.x>0?1:.025));se.upper.quaternion.copy(V.clone().invert().multiply(Z).multiply(V).multiply(se.upper.quaternion)),se.lower.rotateX((se.name.startsWith("front")?.12:-.12)*M),se.swing=!1,se.anchor.copy(se.rest).applyAxisAngle(te,Ee).add(Oe(b)),se.target.copy(se.anchor),se.anchorQuaternion.setFromAxisAngle(te,Ee).multiply(se.pawQuaternion),se.targetQuaternion.copy(se.anchorQuaternion);continue}let mt=((A/_+se.offset)%1+1)%1;mt<p&&(se.waitForStance=!1);let Ut=_n&&!se.settled&&!se.waitForStance&&mt>=p;if(se.phase=mt,Ut&&!se.swing&&(se.start.copy(se.anchor),se.startQuaternion.copy(se.anchorQuaternion),se.landing.copy(Kt?Le(se,Yn):se.rest.clone().applyAxisAngle(te,Ee+(St?$e.clamp(P(Ee,Ze),-.15,.15):0)).add(Me&&!St?Oe(b):i.position)),se.landing.y=pe+se.rest.y,se.landingIsRest=!Kt&&!St,se.landingQuaternion.setFromAxisAngle(te,Kt?Fe(b+Yn*_*(1-p+p*.5)):Ee+(St?$e.clamp(P(Ee,Ze),-.15,.15):0)).multiply(se.pawQuaternion)),!Ut&&se.swing&&(se.anchor.copy(se.landing),se.anchorQuaternion.copy(se.landingQuaternion),se.contacts++,se.landingIsRest&&(se.settled=!0)),Ut){let M=(mt-p)/(1-p);se.target.lerpVectors(se.start,se.landing,ce(M)),se.target.y+=(e.pet.stepHeight??.032)*Math.sin(Math.PI*M),se.targetQuaternion.slerpQuaternions(se.startQuaternion,se.landingQuaternion,ce(M))}else se.target.copy(se.anchor),se.targetQuaternion.copy(se.anchorQuaternion);if(k>0&&!_n){let M=se.rest.clone();se.name.startsWith("front")?M.z+=.08*ce(k):(M.x+=Math.sign(M.x)*.02*ce(k),M.z-=.025*ce(k)),se.target.copy(M.applyAxisAngle(te,Ee).add(i.position)),se.target.y=pe+se.rest.y,se.anchor.copy(se.target)}if(Me&&I>0&&!_n){let M=se.rest.clone();se.name.startsWith("back")&&(M.z+=(e.pet.poseSitV3?.13:e.pet.poseSitV2?.155:.1*ve)*ce(I),M.x+=Math.sign(M.x)*(e.pet.poseSitV2?-.012:e.pet.poseSitV3?0:.015*ve)*ce(I)),se.target.copy(M.applyAxisAngle(te,Ee).add(Oe(b))),se.target.y=pe+se.rest.y,e.pet.poseSitV2&&se.name.startsWith("back")&&(se.target.y=pe+se.rest.y*(1-.55*ce(I))+.008*Math.sin(Math.PI*I)),e.pet.poseSitV3&&se.name.startsWith("back")&&(se.target.y=pe+se.rest.y+(.002+se.rest.y*.6-se.rest.y)*ce(I)),se.anchor.copy(se.target)}if(Ne&&U>0&&!_n){let M=ce(U),V=se.rest.x<0,j=se.name.startsWith("front");if(V){let Ie=new S(0,-.075*M,0).applyQuaternion(se.upper.parent.getWorldQuaternion(new De).invert());se.upper.position.add(Ie),i.updateMatrixWorld(!0)}let Z=se.rest.clone(),Q=new S((V?-.18:-.24)*ve/.8,Z.y,j?(V?.29:.31)*ve/.8:(V?-.28:-.31)*ve/.8);Z.lerp(Q,M),se.target.copy(Z.applyAxisAngle(te,Ee).add(Oe(b))),se.anchor.copy(se.target),se.targetQuaternion.setFromAxisAngle(te,Ee).multiply(se.pawQuaternion),se.anchorQuaternion.copy(se.targetQuaternion)}if(se.stretch=e.pet.poseSitV3&&se.name.startsWith("front")?1+.3*ce(I):1,se.stretch!==1&&(se.lower.position.copy(o.get(se.lower.name).position).multiplyScalar(se.stretch),se.paw.position.copy(o.get(se.paw.name).position).multiplyScalar(se.stretch),i.updateMatrixWorld(!0)),se.relaxedSide=Ne?ce(U):0,se.swing=Ut,se.relaxedSide>0)for(let M=0;M<6;M++){Xe(se);let V=te.clone().applyQuaternion(se.paw.getWorldQuaternion(new De).invert()),j=1/0;for(let Z of se.pawSurface)j=Math.min(j,Z.dot(V));se.target.y=pe-j+.001,se.anchor.copy(se.target)}Xe(se)}i.updateMatrixWorld(!0);for(let se of fe){let mt=["sit_25","sit_50","sit_75","sit_100"],Ut=I*4,M=Math.floor(Ut),V=Ut-M;for(let j of mt)se.morphTargetInfluences[se.morphTargetDictionary[j]]=0;M>0&&(se.morphTargetInfluences[se.morphTargetDictionary[mt[M-1]]]=1-V),M<4&&(se.morphTargetInfluences[se.morphTargetDictionary[mt[M]]]=V)}for(let se of q){let mt=Object.keys(se.morphTargetDictionary).filter(j=>j.startsWith("lie_")).sort((j,Z)=>Number(j.slice(4))-Number(Z.slice(4))),Ut=U*mt.length,M=Math.floor(Ut),V=Ut-M;for(let j of mt)se.morphTargetInfluences[se.morphTargetDictionary[j]]=0;M>0&&(se.morphTargetInfluences[se.morphTargetDictionary[mt[M-1]]]=1-V),M<mt.length&&(se.morphTargetInfluences[se.morphTargetDictionary[mt[M]]]=V)}w==="settling"&&h.every(se=>se.settled)&&(O==="walk"?Je("walk"):qe(O)),D&&w==="curious"&&!je&&I<.02&&U<.02&&Math.abs(P($,P(Ee+z,Y())))<.025&&(G+=L,G>4.5&&(D=!1,qe(Me?J:K?"lie":"idle")))}Te(le),C+=L,C>.1&&(C=0,Re())}i.rotation.y=Ee=Fe(0),i.updateMatrixWorld(!0);for(let L of h)L.anchor.copy(L.rest).applyMatrix4(i.matrixWorld),L.target.copy(L.anchor),L.anchorQuaternion.copy(i.getWorldQuaternion(new De).multiply(L.pawQuaternion)),L.targetQuaternion.copy(L.anchorQuaternion);function Ce(L){!Me||!["idle","sit","lie","walk"].includes(L)||(L==="lie"&&e.pet.lieEnabled===!1&&(L="idle"),D=!1,F=L==="walk"?null:L,L==="walk"?(T++,Je("turn")):Pe(L))}function Be(L){re=F,F=e.pet.sitEnabled===!1?"idle":"sit",D=!1,W=new S().fromArray(L),ie=14,Pe(F)}function ye(L){ie>0&&W.fromArray(L)}function he(){W&&(W=null,ie=0,F=re,re=null)}let xe=()=>(i.updateMatrixWorld(!0),st?st.clone().applyMatrix4(ke.node.matrixWorld).add(new S(0,.05,0)):d(ke.node));return Re(),{update:me,react:nt,snapshot:X,setRestPose:Ce,beginInteraction:Be,trackCompanion:ye,endInteraction:he,touchPoint:xe}}var Wv=`
  float paws = 1.0 - smoothstep(.10, .24, vFurRest.y);
  float facePoint = smoothstep(.38,.46,vFurRest.z) * (1.0-smoothstep(.57,.65,vFurRest.y)) * smoothstep(.46,.51,vFurRest.y);
  float earPoint = smoothstep(.075,.105,abs(vFurRest.x)) * smoothstep(.68,.72,vFurRest.y);
  float bright = smoothstep(.12,.38,dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)));
  float blueEye = step(diffuseColor.r*1.25,diffuseColor.b)*step(.08,diffuseColor.b);
  vec3 pointColor = vec3(.025,.011,.006);
  diffuseColor.rgb = mix(diffuseColor.rgb, pointColor, bright * max(max(paws,facePoint),earPoint) * (1.0-blueEye));
`;function pp(i,{layers:e=8,length:t=.009,strands:n=24e3,bodyScale:s=1,limbRatio:r=1,preserveTexture:o=!1}={}){let a=o?"":Wv,l=f=>new S(f.x/s,f.y/s<.3*r?f.y/s/r:f.y/s+.3*(1-r),f.z/s),c=`vFurRest = position / ${s.toFixed(4)}; vFurRest.y = vFurRest.y < ${(.3*r).toFixed(4)} ? vFurRest.y / ${r.toFixed(4)} : vFurRest.y + ${(.3*(1-r)).toFixed(4)};`,u=[];i.traverse(f=>{f.isSkinnedMesh&&u.push(f)});let d=[],h=0;for(let f of u){f.material.roughness=.95,f.material.metalness=0,f.material.roughnessMap=null,f.material.metalnessMap=null,f.material.isMeshPhysicalMaterial&&(f.material.sheen=.25,f.material.sheenColor.set("#9b8c77"),f.material.sheenRoughness=1),f.material.onBeforeCompile=U=>{U.vertexShader=`varying vec3 vFurRest;
`+U.vertexShader,U.vertexShader=U.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+c),U.fragmentShader=`varying vec3 vFurRest;
`+U.fragmentShader,U.fragmentShader=U.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+a)},f.material.customProgramCacheKey=()=>"siamese-point-coat-v1"+(o?"-source-texture":""),f.material.needsUpdate=!0;let m=f.geometry.clone(),_=m.attributes.position,p=new Float32Array(_.count);for(let U=0;U<_.count;U++){let F=l(new S().fromBufferAttribute(_,U)),J=F.y,fe=F.z,q=J>.47&&fe>.19;p[U]=J<.32?.38:q?.22:1}m.setAttribute("furLength",new $t(p,1));for(let U=1;U<=e;U++){let F=U/e,J=f.material.clone();J.roughness=.97,J.metalness=0,J.alphaTest=.01,J.alphaToCoverage=!1,J.transparent=!0,J.depthWrite=!1,J.side=Qn,J.onBeforeCompile=q=>{q.uniforms.furDepth={value:F},q.uniforms.furLengthScale={value:t},q.vertexShader=`attribute float furLength; varying vec3 vFurRest; varying float vFurLength; uniform float furDepth; uniform float furLengthScale;
`+q.vertexShader,q.vertexShader=q.vertexShader.replace("#include <begin_vertex>",`
          #include <begin_vertex>
          ${c} vFurLength = furLength;
          transformed += normal * furLengthScale * furDepth * furLength;
        `),q.fragmentShader=`varying vec3 vFurRest; varying float vFurLength; uniform float furDepth;
`+q.fragmentShader,q.fragmentShader=q.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+a),q.fragmentShader=q.fragmentShader.replace("#include <alphatest_fragment>",`
          vec3 furCell = floor(vFurRest * 390.0);
          float strand = fract(sin(dot(furCell, vec3(127.1,311.7,74.7))) * 43758.5453);
          float coverage = smoothstep(furDepth * .86, furDepth * .86 + .16, strand);
          // \u84DD\u773C\u73E0\u7684\u9AD8\u5149\u548C\u6E7F\u6DA6\u9F3B\u5C16\u76F4\u63A5\u9732\u51FA\u5E95\u5C42\u8868\u9762\u3002
          float eye = step(diffuseColor.r * 1.25, diffuseColor.b) * step(.18, diffuseColor.b);
          diffuseColor.a *= coverage * (1.0 - eye) * .24;
          diffuseColor.rgb *= 1.0 + .045 * furDepth;
          #include <alphatest_fragment>
        `)},J.customProgramCacheKey=()=>`siamese-plush-fur-v3-${s}-${r}-${o}`;let fe=new is(m,J);fe.name=`siamese_short_fur_${U}`,fe.position.copy(f.position),fe.quaternion.copy(f.quaternion),fe.scale.copy(f.scale),fe.bindMode=f.bindMode,fe.bind(f.skeleton,f.bindMatrix),f.morphTargetInfluences&&(fe.morphTargetInfluences=f.morphTargetInfluences),fe.frustumCulled=!1,fe.userData={...f.userData,petFur:!0},fe.raycast=()=>{},f.parent.add(fe),d.push(fe)}let g=m.index,b=m.attributes.uv,w=m.attributes.normal,v=m.attributes.skinIndex,E=m.attributes.skinWeight,A=[],T=0,x=new S,C=new S,N=new S,B=new S,O=new S;for(let U=0;U<g.count;U+=3)x.fromBufferAttribute(_,g.getX(U)),C.fromBufferAttribute(_,g.getX(U+1)),N.fromBufferAttribute(_,g.getX(U+2)),T+=B.subVectors(C,x).cross(O.subVectors(N,x)).length()*.5,A.push(T);let k=1040,D=()=>(k=Math.imul(k,1664525)+1013904223>>>0,k/4294967296),G=[],$=[],K=[],oe=[],W=[],ie=[],re=(m.morphAttributes.position??[]).map(()=>[]),ve=new S,Me=new S,Ne=new S,Ye=new S,_e=new S;for(let U=0;U<n;U++){let F=D()*T,J=0,fe=A.length-1;for(;J<fe;){let P=J+fe>>1;A[P]<F?J=P+1:fe=P}let q=[0,1,2].map(P=>g.getX(J*3+P)),te=Math.sqrt(D()),ne=D(),pe=[1-te,te*(1-ne),te*ne];ve.set(0,0,0),Me.set(0,0,0);let ce=new be;q.forEach((P,y)=>{ve.addScaledVector(x.fromBufferAttribute(_,P),pe[y]),Me.addScaledVector(x.fromBufferAttribute(w,P),pe[y]),ce.x+=b.getX(P)*pe[y],ce.y+=b.getY(P)*pe[y]}),Me.normalize();let Oe=l(ve),Fe=Oe.y>.45&&Oe.z>.22&&Oe.y<.69;if(Fe&&Math.abs(Oe.x)<.11||Oe.y<.18||ve.y<.025&&Me.y<-.15)continue;let Ee=(Oe.y<.22?.004:Fe||Oe.y>.69?.0032:t)*(.7+D()*.65);_e.set(0,-1,0).addScaledVector(Me,Me.y).normalize(),Ye.copy(Me).multiplyScalar(.86).addScaledVector(_e,.35).normalize(),Ne.crossVectors(Me,new S(D()-.5,D()-.5,D()-.5)).normalize();let ke=new Map;q.forEach((P,y)=>{for(let Y=0;Y<4;Y++){let ee=v.array[P*4+Y];ke.set(ee,(ke.get(ee)??0)+E.array[P*4+Y]*pe[y])}});let z=[...ke].sort((P,y)=>y[1]-P[1]).slice(0,4),ft=z.reduce((P,y)=>P+y[1],0);for(;z.length<4;)z.push([0,0]);let st=G.length/3;for(let P=0;P<2;P++){P&&Ne.crossVectors(Ye,Ne).normalize();for(let Y=0;Y<4;Y++){let ee=Y>1,ae=ee?6e-5:45e-5,Se=Y%2?1:-1,Te=ve.clone().addScaledVector(Me,35e-5).addScaledVector(Ye,ee?Ee:0).addScaledVector(Ne,Se*ae);G.push(Te.x,Te.y,Te.z),$.push(Me.x,Me.y,Me.z),K.push(ce.x,ce.y),re.forEach((ue,ge)=>{let Ae=new S;q.forEach((Xe,Le)=>Ae.addScaledVector(x.fromBufferAttribute(m.morphAttributes.position[ge],Xe),pe[Le])),ue.push(Ae.x,Ae.y,Ae.z)});for(let ue=0;ue<4;ue++)oe.push(z[ue][0]),W.push(z[ue][1]/ft)}let y=st+P*4;ie.push(y,y+1,y+2,y+2,y+1,y+3)}}let H=new wt;H.setAttribute("position",new ut(G,3)),H.setAttribute("normal",new ut($,3)),H.setAttribute("uv",new ut(K,2)),H.setAttribute("skinIndex",new ws(oe,4)),H.setAttribute("skinWeight",new ut(W,4)),H.setIndex(ie),re.length&&(H.morphTargetsRelative=!0,H.morphAttributes.position=re.map(U=>new ut(U,3))),h+=G.length/24;let R=f.material.clone();R.side=Vt,R.roughness=1,R.onBeforeCompile=U=>{f.material.onBeforeCompile(U),U.fragmentShader=U.fragmentShader.replace("#include <normal_fragment_begin>",dt.normal_fragment_begin.replace("normal *= faceDirection;",""))},R.customProgramCacheKey=()=>"siamese-fiber-coat-v1"+(o?"-source-texture":"");let I=new is(H,R);I.name="siamese_fine_fibers",I.position.copy(f.position),I.quaternion.copy(f.quaternion),I.scale.copy(f.scale),I.bindMode=f.bindMode,I.bind(f.skeleton,f.bindMatrix),I.frustumCulled=!1,I.userData={...f.userData,petFur:!0},I.raycast=()=>{},f.parent.add(I),d.push(I),f.morphTargetInfluences&&(I.morphTargetInfluences=f.morphTargetInfluences)}return{layers:e,length:t,fibers:h,meshes:u.length,setVisible:f=>d.forEach(m=>m.visible=f)}}function mp({actor:i,avatar:e,model:t,bones:n,houseGroup:s,getBed:r,root:o,height:a}){let l,c,u,d,h,f,m=!1,_="idle",p=null,g=new Map([...n].map(([O,k])=>[O,k.quaternion.clone()])),b=new De,w=new Nn,v=[],E=[],A=e.matrixWorld.clone().invert();t.updateWorldMatrix(!0,!0),t.traverse(O=>{if(!O.isMesh||O.name.includes("eyelid"))return;let k=[];for(let D=0;D<O.geometry.attributes.position.count;D++){let G=O.getVertexPosition(D,new S).applyMatrix4(O.matrixWorld).applyMatrix4(A);G.y>.35&&G.y<1.15&&k.push(D)}v.push({node:O,ids:k}),E.push(O)});let T=O=>(O=$e.clamp(O,0,1),O*O*(3-2*O));function x(O,k){let D=n.get("comp_arm_"+O),G=n.get("comp_forearm_"+O),$=n.get("comp_hand_"+O);if(!D||!G||!$)return;s.updateMatrixWorld(!0);let K=D.getWorldPosition(new S),oe=G.getWorldPosition(new S),W=$.getWorldPosition(new S),ie=K.distanceTo(oe),re=oe.distanceTo(W),ve=k.clone().sub(K),Me=Math.min(ve.length(),ie+re-1e-4);ve.normalize();let Ne=new S(0,-1,.15);Ne.addScaledVector(ve,-Ne.dot(ve)).normalize();let Ye=$e.clamp((ie*ie+Me*Me-re*re)/(2*ie*Me),-1,1),_e=K.clone().addScaledVector(ve,ie*Ye).addScaledVector(Ne,ie*Math.sqrt(1-Ye*Ye)),H=(R,I,U)=>{let F=R.getWorldPosition(new S),J=R.getWorldQuaternion(new De),fe=I.getWorldPosition(new S).sub(F).normalize(),q=new De().setFromUnitVectors(fe,U.clone().sub(F).normalize());R.quaternion.copy(R.parent.getWorldQuaternion(new De).invert().multiply(q.multiply(J))),R.updateWorldMatrix(!1,!0)};H(D,G,_e),H(G,$,K.clone().addScaledVector(ve,Me))}function C(){m=!1,_="idle",c&&(c.visible=!0),u&&(u.visible=!1),o.dataset.companionSleep="idle"}function N(){if(C(),l=r(),!l)return;l.updateWorldMatrix(!0,!0);let O=[];if(l.traverse(k=>{!k.isMesh||k===u||(k.material?.name==="purple quilt"&&(c=k),k.material?.name==="blue porcelain"&&O.push(k))}),f=Math.max(...O.map(k=>new Ot().setFromObject(k).max.y)),!(!Number.isFinite(f)||!c)){if(!u){let k=c.geometry.clone(),D=l.matrixWorld.clone().invert().multiply(c.matrixWorld);k.applyMatrix4(D),k.computeBoundingBox(),h=k.boundingBox.clone(),d=k.attributes.position.array.slice(),u=new et(k,c.material),u.name="companion-sleep-quilt",u.userData.roomId="bedroom",u.castShadow=!0,u.receiveShadow=!0,l.add(u)}u.visible=!1,m=!0,p=null}}function B(O){if(!m)return;let k=T(O/1.2),D=T((O-1.2)/1.4),G=T((O-2.6)/1.4),$=T((O-4)/1.2);_=O<1.2?"pull":O<2.6?"climb":O<4?"lie":O<5.2?"cover":"sleep",o.dataset.companionSleep=_,i.position.set(l.position.x+.87*(1-D),l.position.y+(f-l.position.y)*D,l.position.z+.3+(a/2-.3)*G),e.rotation.set((-Math.PI/2+.18)*G,-Math.PI/2*(1-G),0),e.position.set(0,0,0);let K=(H,R,I,U)=>{let F=n.get(H);F&&F.quaternion.copy(g.get(H)).multiply(b.setFromEuler(w.set(R,I,U)))},oe=1-G;K("comp_arm_l",-.55*oe,0,.16*oe),K("comp_arm_r",-.55*oe,0,-.16*oe),K("comp_forearm_l",0,-.45*oe,0),K("comp_forearm_r",0,.45*oe,0),K("comp_leg_l",-.65*D*(1-G),0,0),K("comp_leg_r",-.65*D*(1-G),0,0);for(let H of["l","r"])K("comp_shin_"+H,0,0,0),K("comp_foot_"+H,0,0,0);if(G>0){s.updateMatrixWorld(!0);let H=1/0;for(let{node:R,ids:I}of v)for(let U of I)H=Math.min(H,R.getVertexPosition(U,new S).applyMatrix4(R.matrixWorld).y);Number.isFinite(H)&&(e.position.y+=(f+.007-H)*G,s.updateMatrixWorld(!0),p=G===1?H+e.position.y-f:null)}if(_==="pull"||_==="climb")for(let[H,R]of[["l",-.12],["r",.12]])x(H,new S(l.position.x+.57,f+.04+.1*k*(1-D),l.position.z+.56+R));if(_==="cover")for(let[H,R]of[["l",-.25],["r",.25]])x(H,new S(l.position.x+R,f+.23,l.position.z+.5-.4*$));o.dataset.companionBedSurface=String(f),o.dataset.companionBedGap=p===null?"":p.toFixed(4);let W=u.geometry.attributes.position,{min:ie,max:re}=h,ve=$e.lerp($e.lerp(ie.z,.3,k),.1,$),Me=l.matrixWorld.clone().invert(),Ne=new Float32Array(25).fill(re.y),Ye=.24;if(G>0){s.updateMatrixWorld(!0);for(let H of E)for(let R=0;R<H.geometry.attributes.position.count;R++){let I=H.getVertexPosition(R,new S).applyMatrix4(H.matrixWorld).applyMatrix4(Me);if(I.z>ve-.025&&I.z<re.z&&Math.abs(I.x)<.48){let U=$e.clamp(Math.round((I.z-ve)/(re.z-ve)*24),0,24);Ne[U]=Math.max(Ne[U],I.y+.075),Ye=Math.max(Ye,Math.abs(I.x))}}}let _e=Ne.map((H,R)=>Math.max(...Ne.slice(Math.max(0,R-2),Math.min(25,R+3))));for(let H=0;H<W.count;H++){let R=d[H*3],I=d[H*3+1],U=d[H*3+2],F=(U-ie.z)/(re.z-ie.z),J=1-T((Math.abs(R)-Ye-.035)/(re.x-Ye-.035)),fe=F*24,q=$e.lerp(_e[Math.floor(fe)],_e[Math.min(24,Math.ceil(fe))],fe%1),te=Math.max(0,q-re.y)*$,ne=.08*k*(1-$)*(1-F)**2;W.setXYZ(H,R,I+te*J+ne,ve+(re.z-ve)*F)}W.needsUpdate=!0,u.geometry.computeVertexNormals(),u.geometry.computeBoundingBox(),u.geometry.computeBoundingSphere(),u.visible=!0,c.visible=!1}return{begin:N,reset:C,update:B,snapshot:()=>({phase:_,surface:f,contactGap:p,active:m})}}var Zt={status:"review",version:"20261015-room-chat-v1",model:"assets/house-companion/spongebob.glb",api:"https://gsy-gpu.tail660bdf.ts.net/house-api",height:.88,daySeconds:120,activitySeconds:10,schedule:[{room:"bedroom",action:"wake",label:"\u8D77\u5E8A\u5566"},{room:"bathroom",action:"wash",label:"\u6D17\u6F31\u65F6\u95F4"},{room:"living",action:"listen",label:"\u542C\u542C\u97F3\u4E50"},{room:"library",action:"rest",label:"\u6ED1\u6ED1\u68AF\uFF0C\u6B47\u4E00\u4F1A\u513F"},{room:"bedroom",action:"journal",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0"},{room:"bedroom",action:"toy",label:"\u73A9\u73A9\u5177\u7BB1"},{room:"roof",action:"bubble",label:"\u5439\u6CE1\u6CE1"},{room:"bedroom",action:"sleep",label:"\u665A\u5B89\uFF0C\u597D\u68A6"}],rooms:{living:{entry:[-.6,0,2.25],position:[.25,0,1.25],activities:["listen","pet","rest"]},storage:{entry:[-3.45,0,1.65],position:[-3.4,0,.8],activities:["tidy","rest"]},bathroom:{entry:[-.65,3,2.05],position:[-.45,3,.9],activities:["wash","rest"]},bedroom:{entry:[.2,6,1.9],position:[-1.5,6,1.3],activities:["journal","toy","rest","sleep"],bed:[-1.65,6.85,-.2]},library:{entry:[2.60267,3,2.22],waypoints:[[3.6,3,2.1]],position:[3.6,3,1.05],activities:["rest"]},roof:{entry:[1.8,9,.9],position:[.65,9,.85],activities:["bubble","rest"]}},actions:{wave:{room:null,label:"\u5411\u4F60\u6253\u62DB\u547C"},journal:{room:"bedroom",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0",duration:12},toy:{room:"bedroom",label:"\u73A9\u73A9\u5177\u7BB1",duration:10},read:{room:"bedroom",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0",duration:12},rest:{room:null,label:"\u6B47\u4E00\u5C0F\u4F1A\u513F"},sleep:{room:"bedroom",label:"\u51C6\u5907\u7761\u89C9",duration:30},wash:{room:"bathroom",label:"\u6D17\u6F31"},listen:{room:"living",label:"\u542C\u97F3\u4E50"},pet:{room:"living",label:"\u966A\u966A\u5C0F\u732B",duration:16},bubble:{room:"roof",label:"\u5439\u6CE1\u6CE1"},tidy:{room:"storage",label:"\u6574\u7406\u6536\u85CF"},wake:{room:"bedroom",label:"\u8D77\u5E8A\u4F38\u4E2A\u61D2\u8170"}}};function gp({actor:i,avatar:e,bones:t,houseGroup:n,getDisplay:s,getToyChest:r,root:o}){let a=T=>(T=$e.clamp(T,0,1),T*T*(3-2*T)),l=null,c=null,u=null,d="idle",h=0,f=new S,m=new S,_=0,p=null,g=null;function b(){l&&c&&(c.parent.add(l),l.position.copy(c.position),l.quaternion.copy(c.quaternion),l.scale.copy(c.scale),l.userData.diary.update(0,!0,0)),r?.()?.setCompanionPlaying(!1),l=null,c=null,u=null,d="idle",h=0,p=null,o.dataset.companionProp="idle"}function w(T){if(b(),!!["journal","read","toy"].includes(T)){if(u=T==="toy"?"toy":"journal",f.copy(i.position),u==="journal"){if(l=s("work-journal"),!l){u=null;return}c={parent:l.parent,position:l.position.clone(),quaternion:l.quaternion.clone(),scale:l.scale.clone()},c.housePosition=l.position.clone(),c.houseQuaternion=l.quaternion.clone(),c.houseScale=l.scale.clone(),m.copy(l.position).add(new S(-.36,0,.155*l.scale.x)),m.y=6}else{let x=r?.();if(!x){u=null;return}m.copy(n.worldToLocal(x.touchPoint())).add(new S(-.26,0,.3)),m.y=6}_=Math.PI,d="approach"}}function v(T){if(!u)return null;if(i.position.lerpVectors(f,m,a(T/2)),T<2){d="approach";let x=m.clone().sub(f);_=Math.atan2(x.x,x.z)}else _=u==="journal"?Math.PI/2:Math.PI,d=u==="toy"?T<3?"open":T<7.4?"play":T<8.6?"close":"done":T<3.2?"reach":T<4.5?"lift":T<7?"read":T<8.3?"return":T<9.1?"release":"done";if(u==="toy"&&r()?.setCompanionPlaying(T>=2.75&&T<8),u==="journal"){let x=(C,N)=>{let B=(T-C)/N;return B>0&&B<1?.36*Math.sin(Math.PI*B):0};i.position.y+=x(2.35,1.7)+x(7.45,1.7),T>4.5&&T<7&&(_=$e.lerp(Math.PI/2,.1,a((T-4.5)/.6))),T>=7&&T<7.5&&(_=$e.lerp(.1,Math.PI/2,a((T-7)/.5)))}return o.dataset.companionProp=u+":"+d,{walking:d==="approach",yaw:_,phase:d}}function E(T,x,C=1){let N=t.get("comp_arm_"+T),B=t.get("comp_forearm_"+T),O=t.get("comp_hand_"+T);if(!N||!B||!O)return;n.updateMatrixWorld(!0);let k=N.getWorldPosition(new S),D=B.getWorldPosition(new S),G=O.getWorldPosition(new S);x=G.clone().lerp(x,C);let $=k.distanceTo(D),K=D.distanceTo(G),oe=x.clone().sub(k),W=Math.min(oe.length(),$+K-1e-4);oe.normalize(),g={shoulder:k.toArray(),target:x.toArray(),length:$+K,distance:k.distanceTo(x)};let ie=new S(0,-1,.15).transformDirection(e.matrixWorld);ie.addScaledVector(oe,-ie.dot(oe)).normalize();let re=$e.clamp(($*$+W*W-K*K)/(2*$*W),-1,1),ve=k.clone().addScaledVector(oe,$*re).addScaledVector(ie,$*Math.sqrt(1-re*re)),Me=(Ne,Ye,_e)=>{let H=Ne.getWorldPosition(new S),R=Ne.getWorldQuaternion(new De),I=Ye.getWorldPosition(new S).sub(H).normalize(),U=new De().setFromUnitVectors(I,_e.clone().sub(H).normalize());Ne.quaternion.copy(Ne.parent.getWorldQuaternion(new De).invert().multiply(U.multiply(R))),Ne.updateWorldMatrix(!1,!0)};return Me(N,B,ve),Me(B,O,k.clone().addScaledVector(oe,W)),O.getWorldPosition(new S).distanceTo(x)}function A(T,x){if(p=null,!u||d==="approach")return;if(u==="toy"){let D=r()?.touchPoint();D&&(D.y+=d==="play"?.04+.04*Math.sin(T*4):0,p=E("r",D,d==="done"?0:a((T-2)/.6)));return}let C=T<4.5?a((T-3.2)/1.3):1-a((T-7)/1.3);h=T<4.5?a((T-3.65)/.85):1-a((T-7)/.55),n.updateMatrixWorld(!0);let N=e.localToWorld(new S(0,.53,.36));c.parent.worldToLocal(N);let B=c.parent.getWorldQuaternion(new De).invert().multiply(e.getWorldQuaternion(new De)).multiply(new De().setFromEuler(new Nn(0,Math.PI,0))).multiply(new De().setFromEuler(new Nn(-1.19,0,0)));l.position.lerpVectors(c.housePosition,N,C),l.quaternion.slerpQuaternions(c.houseQuaternion,B,C),l.scale.copy(c.houseScale),l.userData.diary.update(T,x,h),l.updateWorldMatrix(!0,!0);let O=d==="reach"?a((T-2)/1.2):d==="release"?1-a((T-8.3)/.8):d==="done"?0:1,k=[];for(let[D,G]of[["l",1],["r",-1]]){let $=.155-G*.2,K=l.localToWorld(new S($e.lerp($,-G*.3,h),-.11,.035)),oe=E(D,K,O);oe!==void 0&&k.push(oe)}p=k.length?Math.max(...k):null}return{begin:w,reset:b,place:v,update:A,snapshot:()=>({kind:u,phase:d,opening:h,handGap:p,reach:g,source:l?.name??null,sourceId:l?.uuid??null,position:l?.position.toArray()??null,home:c?.housePosition.toArray()??null,visible:l?.visible??!1})}}function _p(i,e,t=!1,n="auto",s=null){let r=m=>{let _=(i%20-m)/.24;return _>=0&&_<=1?Math.sin(Math.PI*_):0},o=Math.max(...[2.8,7.2,7.55,12.6,17.4].map(r)),a=["read","journal","tidy"].includes(e),l=e==="sleep",c=a?Math.sin(i*.75)*.28:Math.sin(i*.47)*.38,u=a?-.95:Math.sin(i*.31)*.16;s&&!a&&(c=s.x*.85,u=s.y*.65);let d=["wave","bubble","pet","wake"].includes(e)?.85:.25,h=e==="rest"?.8:a?.65:0;o=Math.max(o,a?.18:e==="rest"?.12:0);let f=e==="wave"?.8:a?.2:.1;return l&&(o=1,c=0,u=0,d=.1,h=1,f=0),n==="blink"&&(o=1),n==="left"&&(o=0,c=-1,u=0),n==="right"&&(o=0,c=1,u=0),n==="happy"&&(o=.13,d=1,h=0,f=1),n==="calm"&&(o=.35,d=0,h=1,f=0),{blink:o,lookRight:Math.max(0,c),lookLeft:Math.max(0,-c),lookUp:Math.max(0,u),lookDown:Math.max(0,-u),smile:d,calm:h,browRaise:f,talk:t?(Math.sin(i*13)+1)*.42:0}}function xp(i,e){let t=[i.entry,...i.waypoints??[],i.position],n=t.slice(1).map((r,o)=>Math.hypot(...r.map((a,l)=>a-t[o][l]))),s=Math.max(0,Math.min(1,e))*n.reduce((r,o)=>r+o,0);for(let r=0;r<n.length;r++){if(s<=n[r]||r===n.length-1){let o=n[r]?Math.min(1,s/n[r]):1;return{position:t[r].map((a,l)=>a+(t[r+1][l]-a)*o),direction:t[r+1].map((a,l)=>a-t[r][l])}}s-=n[r]}}function yp(i){let e=Math.max(0,Math.min(1,i)),t=e*e*(3-2*e);return{position:[2.25+.6*Math.sin(e*Math.PI*.8),7.65-4.45*t,-.4+2.1*e],direction:[.6*Math.PI*.8*Math.cos(e*Math.PI*.8),-26.7*e*(1-e),2.1]}}function vp({actor:i,avatar:e,model:t,bones:n,houseGroup:s}){let r=[];s.updateMatrixWorld(!0);let o=e.matrixWorld.clone().invert();t.traverse(d=>{if(!d.isMesh||d.name.includes("eyelid"))return;let h=[];for(let f=0;f<d.geometry.attributes.position.count;f++){let m=d.getVertexPosition(f,new S).applyMatrix4(d.matrixWorld).applyMatrix4(o);m.y>.26&&m.y<.43&&Math.abs(m.x)<.32&&h.push(f)}r.push({node:d,ids:h})});function a(d,h,f){let m=d.getWorldPosition(new S),_=d.getWorldQuaternion(new De),p=h.getWorldPosition(new S).sub(m).normalize(),g=new De().setFromUnitVectors(p,f.clone().normalize());d.quaternion.copy(d.parent.getWorldQuaternion(new De).invert().multiply(g.multiply(_))),d.updateWorldMatrix(!1,!0)}let l=0,c=0;function u(d,h,f){c=d;let m=yp(d),_=new S(...m.position),p=new S(...m.direction).normalize();i.position.copy(_).lerp(new S(...f),h),e.rotation.set(-.1*(1-h),Math.atan2(p.x,p.z),0),e.position.set(0,0,0);let g=new S(p.z,0,-p.x).normalize(),b=new S().crossVectors(p,g).normalize();if(s.updateMatrixWorld(!0),h<1){for(let v of["l","r"]){let E=n.get("comp_leg_"+v),A=n.get("comp_shin_"+v),T=n.get("comp_foot_"+v);!E||!A||!T||(a(E,A,p.clone().addScaledVector(b,.3)),a(A,T,p.clone().addScaledVector(b,.08)))}s.updateMatrixWorld(!0);let w=1/0;for(let{node:v,ids:E}of r)for(let A of E)w=Math.min(w,v.getVertexPosition(A,new S).applyMatrix4(v.matrixWorld).sub(_).dot(b));Number.isFinite(w)&&e.position.addScaledVector(b,(.012-w)*(1-h)),s.updateMatrixWorld(!0);for(let v of["l","r"]){let E=n.get("comp_arm_"+v),A=n.get("comp_forearm_"+v),T=n.get("comp_hand_"+v),x=n.get("comp_shin_"+v);if(!E||!A||!T||!x)continue;let C=E.getWorldPosition(new S),N=A.getWorldPosition(new S),B=T.getWorldPosition(new S),O=C.distanceTo(N),k=N.distanceTo(B),D=x.getWorldPosition(new S).addScaledVector(b,.07).sub(C),G=Math.min(D.length(),O+k-.001);D.normalize();let $=g.clone().multiplyScalar(v==="l"?1:-1);$.addScaledVector(D,-$.dot(D)).normalize();let K=$e.clamp((O*O+G*G-k*k)/(2*O*G),-1,1),oe=C.clone().addScaledVector(D,O*K).addScaledVector($,O*Math.sqrt(1-K*K));a(E,A,oe.sub(C)),a(A,T,C.clone().addScaledVector(D,G).sub(A.getWorldPosition(new S)))}s.updateMatrixWorld(!0),l=1/0;for(let{node:v,ids:E}of r)for(let A of E)l=Math.min(l,v.getVertexPosition(A,new S).applyMatrix4(v.matrixWorld).sub(_).dot(b));Number.isFinite(l)||(l=null)}return{slide:m,contact:l}}return{update:u,snapshot:()=>({progress:c,contact:l,posture:"seated"})}}function Mp(i){let e=0,t=0,n=null,s=null,r=0,o=()=>i.schedule[Math.floor(e/(i.daySeconds/i.schedule.length))%i.schedule.length],a=()=>{let l=o(),c=s?.room??n??l.room,u=i.rooms[c].activities,d=s?.action??(n?u[Math.floor(t/i.activitySeconds)%u.length]:l.action);return{room:c,action:d,day:e,phase:Math.floor(e/(i.daySeconds/i.schedule.length)),revision:r,following:!!n,commanded:!!s}};return{snapshot:a,tick(l,c=!1,u=!1){return c||(e=(e+Math.max(0,l))%i.daySeconds,t+=Math.max(0,l)),s&&(!c||u)&&(s.remaining-=Math.max(0,l),s.remaining<=0&&(s=null)),a()},follow(l){return l&&!i.rooms[l]?!1:(n=l,t=0,s=null,r++,!0)},act(l){let c=i.actions[l];return c?(s={action:l,room:c.room??n??o().room,remaining:c.duration??10},r++,!0):!1},cancel(){s=null,r++}}}var bp="house-visit-purpose",sc={browse:"\u7B80\u5355\u770B\u770B",recruit:"\u62DB\u4EBA",inspiration:"\u627E\u7075\u611F"};function Ah(){try{let i=sessionStorage.getItem(bp);return Object.hasOwn(sc,i)?i:null}catch{return null}}function Sp(i){if(i.hasAttribute("data-house-companion-preview"))return;let e=document.createElement("section");e.className="house-visit-purpose",e.hidden=!!Ah(),e.setAttribute("aria-label","\u9009\u62E9\u6765\u8BBF\u76EE\u7684");let t=document.createElement("h2");t.textContent="\u4ECA\u5929\u60F3\u600E\u4E48\u901B\uFF1F",e.append(t);let n=document.createElement("div");e.append(n);for(let[s,r]of Object.entries(sc)){let o=document.createElement("button");o.type="button",o.dataset.visitPurpose=s,o.textContent=r,o.addEventListener("click",()=>{try{sessionStorage.setItem(bp,s)}catch{}i.dataset.visitPurpose=s,e.hidden=!0,window.dispatchEvent(new CustomEvent("house:visit-purpose-changed",{detail:{id:s}}))}),n.append(o)}i.append(e)}function Ep({root:i,canvas:e,camera:t,houseGroup:n,focusRoom:s,getRoom:r,getAsset:o,getPet:a,getDisplay:l,getToyChest:c,reducedMotion:u,onReady:d=()=>{},onError:h=()=>{}}){let f=Mp(Zt),m=new gt;m.name="spongebob-companion",n.add(m),m.userData.companionId="spongebob";let _=new gt;m.add(_);let p=Zt.height/1.25;_.scale.setScalar(p);let g=new Map,b=new Map,w=null,v=null,E=null,A=null,T=null,x=null,C=[],N=[],B=[],O=0,k="auto",D={},G=null,$=-10,K=0,oe=null,W=null,ie=0,re=0,ve=!1,Me=.64,Ne=.32,Ye=null,_e=!1,H=!1,R=2,I=null,U=0,F=null,J=null,fe="",q=null,te=!1;Sp(i);let ne=document.createElement("section");ne.className="companion-hud",ne.setAttribute("aria-label","\u6D77\u7EF5\u5B9D\u5B9D\u7684\u4F5C\u606F"),ne.hidden=!i.hasAttribute("data-house-companion-preview"),ne.innerHTML='<span class="companion-day">\u6D77\u7EF5\u5B9D\u5B9D\u5165\u4F4F\u9884\u89C8 \xB7 \u5F85\u5BA1</span><strong data-companion-activity>\u6B63\u5728\u8F7D\u5165\u6D77\u7EF5\u5B9D\u5B9D\u2026</strong><div class="companion-review-controls"><select aria-label="\u9884\u89C8\u89D2\u8272\u52A8\u4F5C" data-companion-action disabled>'+Object.entries(Zt.actions).filter(([he])=>he!=="wake"&&he!=="tidy").map(([he,xe])=>'<option value="'+he+'">'+xe.label+"</option>").join("")+"</select></div>",i.append(ne);let pe=document.createElement("select");pe.setAttribute("aria-label","\u9884\u89C8\u89D2\u8272\u8868\u60C5"),pe.innerHTML='<option value="auto">\u81EA\u7136\u8868\u60C5</option><option value="blink">\u95ED\u773C</option><option value="left">\u770B\u5DE6\u8FB9</option><option value="right">\u770B\u53F3\u8FB9</option><option value="happy">\u5F00\u5FC3</option><option value="calm">\u653E\u677E</option>',ne.querySelector(".companion-review-controls").append(pe),pe.addEventListener("change",()=>{k=pe.value}),e.addEventListener("pointermove",he=>{let xe=e.getBoundingClientRect();G={x:((he.clientX-xe.left)/xe.width-.5)*2,y:(.5-(he.clientY-xe.top)/xe.height)*2},$=O});let ce=document.createElement("dialog");ce.className="companion-chat",ce.setAttribute("aria-label","\u548C\u6D77\u7EF5\u5B9D\u5B9D\u804A\u5929"),ce.innerHTML=`<header><div><b>\u6D77\u7EF5\u5B9D\u5B9D</b></div><button type="button" data-companion-close aria-label="\u5173\u95ED\u804A\u5929"></button></header>
    <div class="companion-messages" role="log" aria-live="polite"></div>
    <div class="companion-suggestions" aria-label="\u5F53\u524D\u623F\u95F4\u53EF\u8FDB\u884C\u7684\u52A8\u4F5C"></div>
    <form><div class="companion-input-row"><input id="companion-input" aria-label="\u804A\u5929\u5185\u5BB9" maxlength="400" autocomplete="off"><button type="submit">\u53D1\u9001</button></div></form>
    <footer><span data-companion-status role="status"></span></footer>`,document.body.append(ce);let Oe=ne.querySelector("[data-companion-activity]"),Fe=ce.querySelector(".companion-messages"),Ee=ce.querySelector("[data-companion-status]"),ke=ce.querySelector("input"),z=ce.querySelector("[type=submit]"),ft={snapshot:()=>({...f.snapshot(),loaded:ve,room:oe,activity:W,entryTime:ie,chatOpen:ce.open,position:m.position.toArray(),height:Zt.height,face:D,bedHeight:Ye,backOffset:Ne,sleep:A?.snapshot(),slide:T?.snapshot(),book:Re.snapshot(),petContact:x,bones:[...g.keys()],animations:w?.userData.animations??[],status:"review"}),actor:m};i.dataset.companionState="loading";let st=document.createElement("link");st.rel="stylesheet",st.href="./styles/house-companion.css?v="+Zt.version,document.head.append(st);function P(he,xe="assistant"){let L=document.createElement("p");for(L.className="companion-message "+xe,L.textContent=he,Fe.append(L);Fe.children.length>24;)Fe.firstElementChild.remove();Fe.scrollTop=Fe.scrollHeight}function y(he=!0){U++,F?.abort(),F=null,z.disabled=!1,Ee.textContent="",he&&f.cancel()}function Y(){y(!1),ce.open&&ce.close(),J?.focus({preventScroll:!0})}let ee=()=>r()??f.snapshot().room,ae=()=>i.dataset.visitPurpose??Ah()??"browse",Se={listen:["\u542C\u97F3\u4E50","\u4E00\u8D77\u542C\u97F3\u4E50\u5427"],pet:["\u966A\u5C0F\u732B","\u966A\u5C0F\u732B\u73A9\u4E00\u4F1A\u513F\u5427"],rest:["\u6B47\u4E00\u4F1A\u513F","\u6B47\u4E00\u4F1A\u513F\u5427"],tidy:["\u6574\u7406\u6536\u85CF","\u6574\u7406\u4E00\u4E0B\u6536\u85CF\u5427"],wash:["\u6D17\u6F31","\u6D17\u6F31\u4E00\u4E0B\u5427"],journal:["\u7FFB\u65E5\u8BB0","\u7FFB\u7FFB\u5B9E\u4E60\u65E5\u8BB0\u5427"],toy:["\u73A9\u73A9\u5177","\u4E00\u8D77\u73A9\u73A9\u5177\u5427"],sleep:["\u665A\u5B89","\u53BB\u7761\u89C9\u5427"],bubble:["\u5439\u6CE1\u6CE1","\u6211\u4EEC\u4E00\u8D77\u5439\u6CE1\u6CE1\u5427"]},Te={browse:{living:"\u8981\u4E00\u8D77\u542C\u4F1A\u513F\u97F3\u4E50\uFF0C\u8FD8\u662F\u966A\u5C0F\u732B\u73A9\uFF1F",storage:"\u8FD9\u91CC\u653E\u7740\u4E0D\u5C11\u6536\u85CF\uFF0C\u4F60\u5E73\u65F6\u7231\u6536\u96C6\u4EC0\u4E48\uFF1F",bathroom:"\u4F60\u731C\u4ED6\u628A\u9879\u76EE\u85CF\u5728\u4E86\u6D74\u5BA4\u7684\u54EA\u91CC\uFF1F",bedroom:"\u65E5\u8BB0\u548C\u73A9\u5177\u90FD\u5728\u8FD9\u513F\uFF0C\u4F60\u60F3\u5148\u770B\u770B\u54EA\u4E2A\uFF1F",library:"\u6765\u56FE\u4E66\u9986\u6B47\u4F1A\u513F\u5427\uFF0C\u4F60\u6700\u8FD1\u5728\u770B\u4EC0\u4E48\uFF1F",roof:"\u5C4B\u9876\u6700\u9002\u5408\u5439\u6CE1\u6CE1\u4E86\uFF0C\u8981\u4E00\u8D77\u5417\uFF1F"},recruit:{living:"\u4F60\u5728\u627E\u5168\u6808\u5F00\u53D1\u3001AI \u63D0\u6548\uFF0C\u8FD8\u662F Agent \u5DE5\u7A0B\u65B9\u5411\u7684\u4F19\u4F34\uFF1F",storage:"\u8FD9\u91CC\u6709\u4ED6\u7684\u5956\u676F\u548C\u8BC1\u4E66\uFF0C\u4F60\u66F4\u5173\u6CE8\u54EA\u65B9\u9762\u7684\u79EF\u7D2F\uFF1F",bathroom:"\u4ED6\u7684\u9879\u76EE\u5165\u53E3\u85CF\u5728\u8FD9\u91CC\uFF0C\u4F60\u60F3\u5148\u4E86\u89E3\u54EA\u7C7B\u9879\u76EE\uFF1F",bedroom:"\u5B9E\u4E60\u65E5\u8BB0\u5C31\u5728\u65C1\u8FB9\uFF0C\u4F60\u60F3\u5148\u4E86\u89E3\u4ED6\u5B9E\u9645\u8D1F\u8D23\u8FC7\u4EC0\u4E48\u5417\uFF1F",library:"\u8FD9\u91CC\u6709\u4ED6\u7684\u6280\u80FD\u4E66\uFF0C\u4F60\u66F4\u60F3\u4E86\u89E3\u5168\u6808\u5F00\u53D1\u8FD8\u662F Agent \u5DE5\u7A0B\uFF1F",roof:"\u6211\u4EEC\u8FB9\u5439\u6CE1\u6CE1\u8FB9\u804A\u5427\uFF0C\u4F60\u5E0C\u671B\u65B0\u4F19\u4F34\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\uFF1F"},inspiration:{living:"\u8FD9\u95F4\u5C0F\u5C4B\u628A\u4E2A\u4EBA\u4E3B\u9875\u505A\u6210\u4E86\u53EF\u63A2\u7D22\u7684\u573A\u666F\uFF0C\u4F60\u60F3\u505A\u4EC0\u4E48\u6837\u7684\u4F5C\u54C1\uFF1F",storage:"\u8FD9\u4E9B\u6536\u85CF\u91CC\uFF0C\u4F60\u6700\u60F3\u542C\u54EA\u4E00\u4EF6\u80CC\u540E\u7684\u6545\u4E8B\uFF1F",bathroom:"\u628A\u9879\u76EE\u5165\u53E3\u85CF\u5728\u6D74\u5BA4\u91CC\u662F\u4E0D\u662F\u6709\u70B9\u610F\u5916\uFF1F\u4F60\u559C\u6B22\u600E\u6837\u7684\u63A2\u7D22\u8BBE\u8BA1\uFF1F",bedroom:"\u65E5\u8BB0\u548C\u73A9\u5177\u7BB1\u90FD\u85CF\u7740\u6545\u4E8B\uFF0C\u4F60\u60F3\u804A\u53D9\u4E8B\u8FD8\u662F\u4E92\u52A8\u8BBE\u8BA1\uFF1F",library:"\u4F60\u6700\u8FD1\u60F3\u5C1D\u8BD5 AI \u5E94\u7528\u3001Agent\uFF0C\u8FD8\u662F\u4E09\u7EF4\u4EA4\u4E92\uFF1F",roof:"\u6765\u5C4B\u9876\u653E\u7A7A\u4E00\u4E0B\u5427\uFF0C\u4F60\u8111\u6D77\u91CC\u6709\u6CA1\u6709\u4E00\u4E2A\u8FD8\u6CA1\u52A8\u624B\u7684\u70B9\u5B50\uFF1F"}};function ue(){let he=ce.querySelector(".companion-suggestions");he.replaceChildren();for(let xe of Zt.rooms[ee()]?.activities??[]){let L=Se[xe];if(!L)continue;let le=document.createElement("button");le.type="button",le.dataset.action=xe,le.dataset.say=L[1],le.textContent=L[0],he.append(le)}he.hidden=!he.children.length}function ge(){let he=ae(),xe=ee(),L=he+":"+xe;q!==L&&(fe={browse:"\u55E8\uFF0C\u6211\u662F\u6D77\u7EF5\u5B9D\u5B9D\uFF01\u6B22\u8FCE\u6765\u4E32\u95E8\u3002",recruit:"\u55E8\uFF01\u542C\u8BF4\u4F60\u662F\u6765\u627E\u4F19\u4F34\u7684\uFF0C\u6211\u6765\u966A\u4F60\u4E86\u89E3\u90ED\u4E66\u7FBD\u3002",inspiration:"\u55E8\uFF01\u6765\u627E\u7075\u611F\u5440\uFF0C\u6211\u4EEC\u8FB9\u901B\u8FB9\u804A\uFF01"}[he]+Te[he][xe],q=L,te=!1,P(fe)),f.act("wave")}function Ae(he=e){ve&&(J=he,ue(),ge(),ce.open||ce.show(),ce.querySelector("[data-companion-close]").focus({preventScroll:!0}))}ce.querySelector("[data-companion-close]").addEventListener("click",Y),ne.querySelector("[data-companion-action]").addEventListener("change",he=>{if(!ve)return;y();let xe=he.target.value,L=Zt.actions[xe].room;L&&s(L),f.act(xe),W=null}),document.addEventListener("keydown",he=>{he.key==="Escape"&&ce.open&&!document.querySelector("dialog:modal")&&(he.preventDefault(),Y())}),ce.addEventListener("cancel",he=>{he.preventDefault(),Y()}),ce.addEventListener("close",()=>{y(!1)});async function Xe(he,xe,L){let le=await fetch(Zt.api+he,{method:xe?"POST":"GET",headers:xe?{"Content-Type":"application/json"}:void 0,body:xe?JSON.stringify(xe):void 0,signal:L});if(!le.ok){let de=await le.json().catch(()=>null);throw new Error(typeof de?.detail=="string"?de.detail:"\u5C0F\u5C4B\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u8BD5")}return le}let Le=new AbortController,Pe=setTimeout(()=>Le.abort(),8e3);Xe("/health",null,Le.signal).then(he=>he.json()).then(he=>{i.dataset.companionChatConfigured=String(he.chatConfigured)}).catch(()=>{i.dataset.companionChatConfigured="false"}).finally(()=>clearTimeout(Pe));async function qe(he,xe=null){if(he=he.trim(),!he||he.length>400||z.disabled)return;y();let L=U,le=new AbortController;F=le;let de=setTimeout(()=>le.abort(),6e4);z.disabled=!0,P(he,"user"),ke.value="",Ee.textContent="\u6D77\u7EF5\u5B9D\u5B9D\u6B63\u5728\u60F3\u2026";try{I||(I=(await(await Xe("/session",{},le.signal)).json()).session);let Ze=te?"":"\uFF08\u6765\u8BBF\u76EE\u7684\uFF1A"+sc[ae()]+"\uFF1B\u4F60\u521A\u624D\u7684\u5F00\u573A\u767D\uFF1A"+fe+`\uFF09
`,je=await(await Xe("/chat",{session:I,message:Ze.length+he.length<=400?Ze+he:he,room:ee(),activity:W??"idle"},le.signal)).json();if(L!==U)return;P(je.reply),Ee.textContent="",te=!0;let ht=xe??je.action;if(ht&&Zt.actions[ht]){let St=Zt.actions[ht].room;Je=!0;try{St&&St!==r()&&s(St)}finally{Je=!1}f.act(ht),W=null}}catch(Ze){if(L!==U)return;Ze.name==="AbortError"?Ee.textContent="\u56DE\u590D\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u53D1\u9001":(Ee.textContent=Ze.message,Ze.message.includes("\u4F1A\u8BDD\u5DF2\u8FC7\u671F")&&(I=null))}finally{clearTimeout(de),L===U&&(z.disabled=!1,F=null)}}ce.querySelector("form").addEventListener("submit",he=>{he.preventDefault(),qe(ke.value)}),ce.querySelector(".companion-suggestions").addEventListener("click",he=>{let xe=he.target.closest("[data-say]");xe&&Zt.rooms[ee()]?.activities.includes(xe.dataset.action)&&qe(xe.dataset.say,xe.dataset.action)}),window.addEventListener("house:visit-purpose-changed",()=>{y(),ce.open&&ge()});let Je=!1;window.addEventListener("house:room-changed",he=>{_e=he.detail.id==="library",Je||y(),f.follow(he.detail.id),W=null,ue()}),document.addEventListener("visibilitychange",()=>{document.hidden&&y()});let nt=new gt;m.add(nt);let X=new un({color:11528950,transparent:!0,opacity:.28,roughness:.1,metalness:.05,clearcoat:1});for(let he=0;he<6;he++){let xe=new et(new Gn(.05+he*.006,12,8),X);nt.add(xe)}nt.visible=!1;let Re=gp({actor:m,avatar:_,bones:g,houseGroup:n,getDisplay:l,getToyChest:c,root:i});new Br().load(Zt.model+"?v="+Zt.version,he=>{w=he.scene,_.add(w),n.updateMatrixWorld(!0);let xe=new Ot;w.traverse(de=>{de.isMesh&&(de.isSkinnedMesh?de.computeBoundingBox():de.geometry.computeBoundingBox(),xe.union((de.isSkinnedMesh?de.boundingBox:de.geometry.boundingBox).clone().applyMatrix4(de.matrixWorld).applyMatrix4(_.matrixWorld.clone().invert())))});let L=xe.getSize(new S);w.scale.setScalar(1.25/L.y),Me=L.z*w.scale.x,w.position.set(0,-xe.min.y*w.scale.x,-(xe.min.z+xe.max.z)*.5*w.scale.x),w.traverse(de=>{de.userData.companionId="spongebob",de.isMesh&&(de.castShadow=!0,de.receiveShadow=!0),de.morphTargetDictionary&&C.push(de),de.isSkinnedMesh&&(de.frustumCulled=!1),de.isBone&&(g.set(de.name,de),b.set(de.name,{q:de.quaternion.clone(),p:de.position.clone()}))}),w.updateMatrixWorld(!0),w.traverse(de=>{if(!de.isSkinnedMesh||de.name.includes("eyelid"))return;let Ze=de.geometry.attributes.position,Ke=[];for(let je=0;je<Ze.count;je++)Ze.getY(je)<.16&&Ke.push(je);N.push({node:de,indices:Ke})});let le=1/0;w.traverse(de=>{if(!de.isMesh)return;let Ze=de.geometry.attributes.position;for(let Ke=0;Ke<Ze.count;Ke++){let je=new S().fromBufferAttribute(Ze,Ke).applyMatrix4(de.matrixWorld).applyMatrix4(_.matrixWorld.clone().invert());je.y>.5&&je.y<1.1&&(le=Math.min(le,je.z))}}),Ne=Number.isFinite(le)?-le:Me/2,w.userData.animations=he.animations.map(de=>de.name),v=new Co(w),A=mp({actor:m,avatar:_,model:w,bones:g,houseGroup:n,getBed:()=>o?.("bed"),root:i,height:Zt.height}),T=vp({actor:m,avatar:_,model:w,bones:g,houseGroup:n}),ft.clips=he.animations,ve=!0,ne.querySelector("select").disabled=!1,i.dataset.companionState="ready",W=null,d()},void 0,()=>{i.dataset.companionState="error",Oe.textContent="\u89D2\u8272\u672A\u80FD\u8F7D\u5165\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5",h({id:"companion",name:"\u6D77\u7EF5\u5B9D\u5B9D",url:Zt.model,kind:"companion"})});function me(he){let xe={head:["head","Head","mixamorigHead","comp_head"],hips:["Hips","pelvis","hips","comp_root"],leftArm:["LeftArm","upperarm_l","left_upper_arm","comp_arm_l"],rightArm:["RightArm","upperarm_r","right_upper_arm","comp_arm_r"],leftLeg:["LeftUpLeg","thigh_l","left_upper_leg","comp_leg_l"],rightLeg:["RightUpLeg","thigh_r","right_upper_leg","comp_leg_r"],jaw:["jaw","Jaw","comp_jaw"]};for(let L of xe[he]??[]){if(g.has(L))return g.get(L);let le=[...g].find(([de])=>de.toLowerCase().replace(/[^a-z_]/g,"").endsWith(L.toLowerCase()));if(le)return le[1]}return null}function Ce(he,xe=0,L=0,le=0){let de=me(he);de&&(de.rotateX(xe),de.rotateY(L),de.rotateZ(le))}function Be(he){A?.reset(),Re.reset(),a?.()?.endInteraction?.();let xe=oe!==he.room||_e;if(_e=!1,oe=he.room,W=he.action,re=0,m.userData.roomId=oe,m.userData.revision=he.revision,m.traverse(L=>{L.userData.roomId=oe,L.userData.companionId="spongebob"}),xe&&(H=oe==="library",R=H?5.6:2,m.position.fromArray(Zt.rooms[oe].entry),ie=0),Oe.textContent=Zt.actions[W]?.label??W,i.dataset.companionRoom=oe,i.dataset.companionActivity=W,W==="sleep"){A?.begin();let L=o?.("bed"),le=Zt.rooms.bedroom.bed,de=new Ns(new S(le[0],9,le[2]+.35),new S(0,-1,0));L?.updateMatrixWorld(!0),Ye=L?de.intersectObject(L,!0).find(Ze=>Ze.point.y<7.05&&Ze.point.y>6.3&&Ze.face.normal.clone().transformDirection(Ze.object.matrixWorld).y>.8)?.point.y:null}Re.begin(W),W==="pet"&&a?.()?.beginInteraction?.(m.position.toArray())}ft.react=()=>Ae(e),window.addEventListener("house:pet-greet",()=>{ve&&(s("living"),f.act("pet"),W=null)});function ye(he){if(!he||E?.getClip()===he)return;let xe=v.clipAction(he),L=B.findIndex(le=>le.action===xe);L>=0&&B.splice(L,1),E&&(E.fadeOut(.18),B.push({action:E,time:.18})),E=xe,xe.reset().fadeIn(.18).play()}return ft.update=(he,xe)=>{if(!ve)return;let L=!xe||document.hidden,le=L||!!document.querySelector("dialog[open]"),de=f.tick(he,le,!L&&ce.open),Ze=L||le&&!de.commanded;if(!L&&(!le||ce.open)&&(O+=he),(oe!==de.room||W!==de.action||m.userData.revision!==de.revision)&&Be(de),m.visible=!r()||r()===oe,!m.visible)return;Ze||(ie=Math.min(R,ie+he),re+=he);let Ke=H&&!u&&ie<3.6;Oe.textContent=Ke?"\u6ED1\u6ED1\u68AF":Zt.actions[W]?.label??W;let je=Zt.rooms[oe],ht=u||ie>=R?1:Math.max(0,Math.min(1,(ie-(H?3.6:0))/2)),St=ht*ht*(3-2*ht),Kt=new S(...je.position);if(W==="pet"){let yt=o?.("siamese-cat");yt&&Kt.copy(yt.position).add(new S(.4,0,.38))}let _n=xp(je,St);m.position.fromArray(_n.position),W==="pet"&&m.position.lerpVectors(new S(...je.entry),Kt,St),_.rotation.set(0,0,0),_.position.set(0,0,0),_.scale.setScalar(p);let Sn=Re.place(re),Rt=Sn?.walking??(!Ke&&ht<1),Yn=Ke?"slide":Rt?"walk":Sn?["read","lift","return"].includes(Sn.phase)?"read":"idle":{rest:"sit",sleep:"lie",listen:"idle"}[W]??W,En=ft.clips?.find(yt=>yt.name===Yn);ye(En),Rt?_.rotation.y=Math.atan2(_n.direction[0],_n.direction[2]):_.rotation.y=(["read","journal"].includes(W)?-.22:.1)+(u?0:Math.sin(O*.55)*.035),Sn&&(_.rotation.y=Sn.yaw);for(let[yt,Yt]of b){let Ht=g.get(yt);Ht.quaternion.copy(Yt.q),Ht.position.copy(Yt.p)}if(v?.update(Ze?0:he),!Ze)for(let yt=B.length-1;yt>=0;yt--)B[yt].time-=he,B[yt].time<=0&&(B[yt].action.stop(),B.splice(yt,1));En||(Rt?(Ce("leftLeg",Math.sin(re*8)*.3),Ce("rightLeg",-Math.sin(re*8)*.3)):W==="wave"?Ce("rightArm",0,0,-.55+Math.sin(re*9)*.13):["journal","read","tidy","wash","bubble","pet"].includes(W)&&(Ce("leftArm",-.5,0,.12),Ce("rightArm",-.5,0,-.12),Ce("head",.08))),W==="sleep"&&!Rt&&A?.update(u?6:Math.max(0,re-R));let Ri=W==="sleep"&&!["cover","sleep"].includes(i.dataset.companionSleep)?"rest":W;D=_p(O,Ke?"bubble":Ri,!1,k,O-$<4?G:null),W==="pet"&&!Rt&&(D.lookDown=.7,D.lookLeft=.55);for(let yt of C)for(let[Yt,Ht]of Object.entries(D)){let Pn=yt.morphTargetDictionary[Yt];Pn!==void 0&&(yt.morphTargetInfluences[Pn]=Ht)}if(!Rt&&!Ke&&W!=="sleep"&&!u&&Ce("hips",(["read","journal"].includes(W)?.055:0)+Math.sin(O*1.7)*.008,0,Math.sin(O*.85)*.01),ce.open&&!de.commanded){let yt=t.position.clone().sub(m.position);_.rotation.y=Math.atan2(yt.x,yt.z)}if(x=null,W==="pet"&&!Rt&&_.rotation.set(.1,.1,0),Ke)T?.update(Math.min(1,ie/3.2),$e.clamp((ie-3.2)/.4,0,1),je.entry);else if(W!=="sleep"||Rt){n.updateMatrixWorld(!0);let yt=1/0,Yt=new S;for(let{node:Ht,indices:Pn}of N)for(let In of Pn)Yt.fromBufferAttribute(Ht.geometry.attributes.position,In),Ht.applyBoneTransform(In,Yt),Yt.applyMatrix4(Ht.matrixWorld),yt=Math.min(yt,Yt.y);Number.isFinite(yt)&&(_.position.y+=(Sn?m.position.y:je.position[1])-yt+.008)}if(W==="pet"&&!Rt){let yt=a?.()?.touchPoint?.();if(yt){a?.()?.trackCompanion?.(m.position.clone().add(new S(0,.7,0)).toArray()),n.updateMatrixWorld(!0);let Yt=g.get("comp_arm_r"),Ht=g.get("comp_forearm_r"),Pn=g.get("comp_hand_r");if(Yt&&Ht&&Pn){let In=Yt.getWorldPosition(new S),Yi=Ht.getWorldPosition(new S),zr=Pn.getWorldPosition(new S),se=In.distanceTo(Yi),mt=Yi.distanceTo(zr),Ut=yt.clone().add(new S(0,.018,.018*Math.sin(re*3))),M=Ut.sub(In),V=Math.min(M.length(),se+mt-.001);M.normalize();let j=new S(0,-1,0);j.addScaledVector(M,-j.dot(M)).normalize();let Z=$e.clamp((se*se+V*V-mt*mt)/(2*se*V),-1,1),Q=In.clone().addScaledVector(M,se*Z).addScaledVector(j,se*Math.sqrt(1-Z*Z)),Ie=(Ue,we,Ve)=>{let Ge=Ue.getWorldPosition(new S),ot=Ue.getWorldQuaternion(new De),rt=we.getWorldPosition(new S).sub(Ge).normalize(),We=new De().setFromUnitVectors(rt,Ve.clone().sub(Ge).normalize());Ue.quaternion.copy(Ue.parent.getWorldQuaternion(new De).invert().multiply(We.multiply(ot))),Ue.updateWorldMatrix(!1,!0)};Ie(Yt,Ht,Q),Ie(Ht,Pn,In.clone().addScaledVector(M,V)),x=Pn.getWorldPosition(new S).distanceTo(yt)}}}K+=he,K>.2&&(K=0,i.dataset.companionFace=JSON.stringify(D),i.dataset.companionPosition=JSON.stringify(m.position.toArray()),i.dataset.companionHeight=String(Zt.height),i.dataset.companionArrival=Ke?"slide":Rt?"walk":"activity"),Re.update(re,u),nt.visible=!Rt&&W==="bubble",nt.children.forEach((yt,Yt)=>{let Ht=(re*.25+Yt*.17)%1;yt.position.set(.23+Math.sin(Yt+Ht*4)*.18,.9+Ht*.8,.5+Ht*.3),yt.scale.setScalar(.4+Ht*.8)}),ne.querySelector(".companion-day").textContent=`${Math.floor(de.day/120*24).toString().padStart(2,"0")}:00 \xB7 ${de.following?"\u966A\u4F60\u901B\u901B":"\u5FAA\u73AF\u7684\u4E00\u5929"} \xB7 \u9884\u89C8\u5F85\u5BA1`},ft}var Rn={version:"20261013-cat-side-quarantine-v15",status:"review",toiletProjects:{asset:"toilet",room:"bathroom",anchor:[-1.3,4.1,-.4]},structure:{id:"structure",name:"\u4E09\u5C42\u623F\u5C4B\u7ED3\u6784",url:"assets/house-review/structure.glb"},rooms:[{id:"living",name:"\u5BA2\u5385",floor:"\u4E00\u5C42",level:0,label:[0,.5,2.75],bounds:[[-2.5,0,-2.5],[2.2,2.9,2.8]],target:[0,1.25,0],camera:[0,2.25,8.6]},{id:"storage",name:"\u50A8\u85CF\u5BA4",floor:"\u4E00\u5C42",level:0,label:[-3.45,1.5,1],bounds:[[-4.2,0,-2.5],[-2.55,2.9,1.6]],target:[-3.32,1.15,0],camera:[-4.6,2.2,5.7]},{id:"bathroom",name:"\u6D74\u5BA4",floor:"\u4E8C\u5C42",level:1,label:[-2,3.55,2.7],bounds:[[-4.6,3,-2.4],[.25,5.95,2.7]],target:[-1.75,4.25,0],camera:[-2.6,5.1,7.7]},{id:"bedroom",name:"\u5367\u5BA4",floor:"\u4E09\u5C42",level:2,label:[-1.2,6.55,2.2],bounds:[[-4.1,6,-2.1],[1.12,8.95,2.6]],target:[-1.2,7.2,0],camera:[-2.3,8.15,7.6]},{id:"library",name:"\u56FE\u4E66\u9986",floor:"\u4E8C\u3001\u4E09\u5C42 \xB7 \u6311\u9AD8",level:1,label:[3.3,4.8,1.2],bounds:[[.25,3,-2.8],[4.65,8.8,2.7]],target:[2.7,5.7,0],camera:[4.7,7.1,12.5]},{id:"roof",name:"\u5C4B\u9876\u82B1\u56ED",floor:"\u5929\u53F0",level:3,label:[0,9.45,1.2],bounds:[[-2.5,9,-2],[2.5,10.8,2]],target:[0,9.6,0],camera:[0,12.4,7.9]}],assets:[{id:"chair",name:"\u7EA2\u6276\u624B\u6905",room:"living",url:"assets/house-review/props/chair.glb",position:[-1.3,0,-.3],rotation:.13},{id:"couch",name:"\u7EFF\u7BA1\u6C99\u53D1",room:"living",url:"assets/house-review/props/couch.glb",position:[1.1,0,-.35],rotation:-.18},{id:"table",name:"\u5706\u684C",room:"living",url:"assets/house-review/props/table-speaker-base.glb",position:[0,0,.05],rotation:0},{id:"bluetooth-speaker",name:"\u84DD\u7259\u97F3\u7BB1",room:"living",url:"assets/house-review/props/speaker.glb",position:[0,.76,.05],rotation:-.08},{id:"laptop",name:"\u6C99\u53D1\u4E0A\u7684\u7B14\u8BB0\u672C\u7535\u8111",room:"living",url:"assets/house-review/props/laptop.glb",position:[1.08,.49,-.1],rotation:-.18},{id:"siamese-cat",name:"\u66B9\u7F57\u732B",room:"living",url:"assets/house-review/props/siamese-kitten-compact.glb",position:[-1.55,0,1.6],rotation:.22,pet:{route:[[-1.4,1.95],[-.65,2.08],[.25,2.05],[.85,1.88],[.7,1.48],[0,1.43],[-.95,1.44]],fur:!0,restPoses:!0,groundedSideLie:!1,lieEnabled:!1,sitCorrectives:!1,sitEnabled:!1,poseSitV2:!1,runtimeSha256:"d32d168d6d59511661863545365ee95f8e704d7ccd664b3a5a8028d351dac5b6",faceForward:[.7452153247454482,0,.6668239046139065],faceCenter:[.124894668,.46660155,.339340067],bodyScale:.8,limbRatio:.78,walkSpeed:.055,stepHeight:.011,gaitCycle:.62}},{id:"treasure",name:"\u50A8\u85CF\u5BA4\u5B9D\u85CF",room:"storage",url:"assets/house-review/props/treasure.glb",position:[-3.3,0,-.1],rotation:0},{id:"bathtub",name:"\u6D74\u7F38",room:"bathroom",url:"assets/house-review/props/bathtub.glb",position:[-2.7,3,.7],rotation:.1},{id:"sink",name:"\u6876\u5F0F\u6D17\u624B\u6C60",room:"bathroom",url:"assets/house-review/props/sink.glb",position:[-1.65,3.62,-2.6],rotation:0},{id:"toilet",name:"\u9A6C\u6876",room:"bathroom",url:"assets/house-review/props/toilet.glb",position:[-1.3,3,-.6],rotation:0},{id:"bed",name:"\u7AF9\u8282\u5E8A",room:"bedroom",url:"assets/house-review/props/bed.glb",position:[-1.65,6,-.25],rotation:0},{id:"barrel",name:"\u5367\u5BA4\u6876\u67DC",room:"bedroom",url:"assets/house-review/props/barrel.glb",position:[-3,6,-.55],rotation:0},{id:"chest",name:"\u5367\u5BA4\u6536\u7EB3\u7BB1",room:"bedroom",url:"assets/house-review/props/chest.glb",position:[.05,6,.65],rotation:-.15},{id:"lounger",name:"\u5929\u53F0\u8EBA\u6905",room:"roof",url:"assets/house-review/props/lounger.glb",position:[-.95,9,.9],rotation:.15}],displays:[{id:"national-2021",kind:"award",room:"storage",level:0,position:[-3.81021,1.43,-1.31209],normal:[.82983,0,.55801],size:[.43,.31041]},{id:"national-2023",kind:"award",room:"storage",level:0,position:[-3.33921,1.43,-1.84648],normal:[.67977,0,.73342],size:[.43,.30167]},{id:"math-2022",kind:"award",room:"storage",level:0,position:[-2.86678,1.43,-2.21072],normal:[.55374,0,.83269],size:[.43,.31175]},{id:"holtek-2023",kind:"award",room:"storage",level:0,position:[-3.81143,2.02,-1.41627],normal:[.80946,0,.58717],size:[.43,.30436]},{id:"mathorcup-2022",kind:"award",room:"storage",level:0,position:[-3.3401,2.02,-1.923],normal:[.66501,0,.74684],size:[.43,.29025]},{id:"scholarship-2022",kind:"award",room:"storage",level:0,position:[-2.86743,2.02,-2.27552],normal:[.54283,0,.83984],size:[.33825,.48]},{id:"graduate-2024",kind:"award",room:"storage",level:0,position:[-3.81205,2.61,-1.46938],normal:[.7991,0,.6012],size:[.35475,.48]},{id:"merit-2021",kind:"award",room:"storage",level:0,position:[-3.34055,2.61,-1.96296],normal:[.65745,0,.7535],size:[.3525,.48]},{id:"merit-2022",kind:"award",room:"storage",level:0,position:[-2.86777,2.61,-2.30964],normal:[.53723,0,.84344],size:[.3495,.48]},{id:"league-2021",kind:"award",room:"storage",level:0,position:[-2.66,1.91,-1.3],normal:[-1,0,0],size:[.5,.35078]},{id:"union-2021",kind:"award",room:"storage",level:0,position:[-2.66,2.52,-1.3],normal:[-1,0,0],size:[.5,.33203]},{id:"skills-book",kind:"content",room:"library",level:1,position:[1.45,3.6,1.42],normal:[.15,0,.99],size:[.8,1.1]},{id:"work-journal",kind:"content",room:"bedroom",level:2,position:[-2.07,6.842,.2],normal:[0,1,0],size:[.48,.6],style:"book"}],interactions:[{id:"living-speaker",room:"living",action:"music",label:"\u84DD\u7259\u97F3\u7BB1 \xB7 \u7F51\u9875\u80CC\u666F\u97F3\u4E50",button:"\u542C\u97F3\u4E50",asset:"bluetooth-speaker",anchor:[0,1.3,.05]},{id:"laptop-profile",room:"living",section:"overview",label:"\u7B14\u8BB0\u672C\u7535\u8111 \xB7 \u57FA\u672C\u4FE1\u606F",button:"\u57FA\u672C\u4FE1\u606F",asset:"laptop",anchor:[1.08,1.3,-.1]},{id:"skills-book",room:"library",section:"skills",label:"\u4E13\u4E1A\u6280\u80FD\u4E66 \xB7 \u5168\u6808\u4E0E Agent \u5DE5\u7A0B",button:"\u4E13\u4E1A\u6280\u80FD",anchor:[1.45,4.37,1.47]},{id:"work-journal",room:"bedroom",section:"internship",label:"\u5E8A\u4E0A\u65E5\u8BB0\u672C \xB7 \u5B9E\u4E60\u7ECF\u5386",button:"\u5B9E\u4E60\u65E5\u8BB0",anchor:[-2.07,7.14,.2]},{id:"education-clock",room:"bedroom",section:"education",label:"\u6559\u80B2\u7ECF\u5386",button:"\u6559\u80B2\u7ECF\u5386",asset:"barrel",localBounds:[[-.14,.615,-.12],[.14,.91,.13]],anchor:[-3,7.1,-.45]},{id:"toy-chest",room:"bedroom",action:"toy",label:"\u73A9\u5177\u7BB1 \xB7 \u6253\u5F00\u79C1\u85CF\u753B\u5ECA",button:"\u73A9\u5177\u7BB1",asset:"chest",anchor:[.05,7.1,.65]},{id:"honor-trophies",room:"storage",section:"honors",label:"\u5956\u676F\u4E0E\u8BC1\u4E66 \xB7 \u4E2A\u4EBA\u8363\u8A89",button:"\u8363\u8A89\u5956\u676F",asset:"treasure",anchor:[-3.3,1.05,-.1]}]};var Wo=[{id:"national-2021",title:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D1",detail:"2020\u20142021 \u5B66\u5E74",sourceName:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D12021.jpg",sourceSHA256:"a53837456384b6d78a20a7e25bbf9c5ab42c4d29eff23be8e60001d36a9cd930",thumbnail:"./assets/house-profile/national-2021.jpg",original:"./assets/house-profile/national-2021-original.jpg",width:640,height:462,rotation:90,crop:[.045,.235,.97,.955]},{id:"national-2023",title:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D1",detail:"2022\u20142023 \u5B66\u5E74",sourceName:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D12023.jpg",sourceSHA256:"597f4b90d5cf32ea33160c3d95331d83d57cdd579ffbc3098383625bf32655bc",thumbnail:"./assets/house-profile/national-2023.jpg",original:"./assets/house-profile/national-2023-original.jpg",width:640,height:449,rotation:90,crop:[.01,.19,.99,.975]},{id:"math-2022",title:"\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B \xB7 \u4E00\u7B49\u5956",detail:"\u7B2C\u5341\u56DB\u5C4A \xB7 \u975E\u6570\u5B66\u7C7B",sourceName:"\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B.jpg",sourceSHA256:"411b2f002172a09df06e6500447ad551604086aa51fdb72d1db623e3ffacbb79",thumbnail:"./assets/house-profile/math-2022.jpg",original:"./assets/house-profile/math-2022-original.jpg",width:640,height:464,rotation:90,crop:[.01,.14,.99,.9]},{id:"holtek-2023",title:"\u5408\u6CF0\u676F \xB7 \u4E00\u7B49\u5956",detail:"2023 \u5E74\u5355\u7247\u673A\u5E94\u7528\u8BBE\u8BA1\u7ADE\u8D5B",sourceName:"\u5408\u6CF0\u676F2023.jpg",sourceSHA256:"4e755594fcec2eb7c740d82b38c9e6e05a9e03c2cd44ec3ee629de983187ccc7",thumbnail:"./assets/house-profile/holtek-2023.jpg",original:"./assets/house-profile/holtek-2023-original.jpg",width:640,height:453,rotation:90,crop:[.03,.13,.985,.89]},{id:"mathorcup-2022",title:"MathorCup \xB7 \u4E09\u7B49\u5956",detail:"2022 \u5E74 \xB7 \u672C\u79D1\u751F\u7EC4",sourceName:"mathorcup\u9AD8\u6821\u6570\u6A21\u6311\u6218\u8D5B.jpg",sourceSHA256:"f635ea9f270f143fba58d2744922f20927c7cb9b3b05bb1ab0178d13e939443b",thumbnail:"./assets/house-profile/mathorcup-2022.jpg",original:"./assets/house-profile/mathorcup-2022-original.jpg",width:640,height:432,rotation:90,crop:[.035,.16,.97,.94]},{id:"scholarship-2022",title:"\u4E00\u7B49\u5956\u5B66\u91D1",detail:"2021\u20142022 \u5B66\u5E74",sourceName:"\u4E00\u7B49\u5956\u5B66\u91D12022.jpg",sourceSHA256:"157bd5ae21962e0aa6d4af3977bb261c8899834e0f241acb74deeb0cbf2a517d",thumbnail:"./assets/house-profile/scholarship-2022.jpg",original:"./assets/house-profile/scholarship-2022-original.jpg",width:451,height:640,rotation:0,crop:[.015,.11,.98,.88]},{id:"graduate-2024",title:"\u4F18\u79C0\u6BD5\u4E1A\u751F",detail:"\u897F\u5357\u5927\u5B66 \xB7 2024 \u5E74",sourceName:"\u4F18\u79C0\u6BD5\u4E1A\u751F2024.jpg",sourceSHA256:"2831a13120b0875a395c39bb5c30dbabe3468e58c2aae0a7ae9980274f6d5262",thumbnail:"./assets/house-profile/graduate-2024.jpg",original:"./assets/house-profile/graduate-2024-original.jpg",width:473,height:640,rotation:0,crop:[.015,.14,.98,.875]},{id:"merit-2021",title:"\u4E09\u597D\u5B66\u751F",detail:"2020\u20142021 \u5B66\u5E74",sourceName:"\u6821\u4E09\u597D2021.jpg",sourceSHA256:"ee6d5d7e07ea7be0ed49d146339d6b82d8750f4acf5b0263d2f66c232edb0ade",thumbnail:"./assets/house-profile/merit-2021.jpg",original:"./assets/house-profile/merit-2021-original.jpg",width:470,height:640,rotation:90,crop:[.055,.035,.79,.995]},{id:"merit-2022",title:"\u4E09\u597D\u5B66\u751F",detail:"2021\u20142022 \u5B66\u5E74",sourceName:"\u6821\u4E09\u597D2022.jpg",sourceSHA256:"23f1564ec3411c58db1c1fb5456cd4b9475ac54731889da98cbe4dc45efeaaa6",thumbnail:"./assets/house-profile/merit-2022.jpg",original:"./assets/house-profile/merit-2022-original.jpg",width:466,height:640,rotation:0,crop:[.015,.2,.985,.95]},{id:"league-2021",title:"\u4F18\u79C0\u5171\u9752\u56E2\u5458",detail:"2020 \u5E74\u5EA6 \xB7 \u897F\u5357\u5927\u5B66",sourceName:"\u4F18\u79C0\u5171\u9752\u56E2\u54582021.jpg",sourceSHA256:"d178912952354cdf571f22d99377ca0082f7486ebb557fd9bbcde05dea4e5fb5",thumbnail:"./assets/house-profile/league-2021.jpg",original:"./assets/house-profile/league-2021-original.jpg",width:640,height:449,rotation:90,crop:[0,.145,.98,.93]},{id:"union-2021",title:"\u5B66\u751F\u4F1A\u5DE5\u4F5C\u7ECF\u5386 \xB7 \u8058\u4E66",detail:"\u9662\u5B66\u751F\u4F1A\u5BA3\u4F20\u90E8\u90E8\u957F \xB7 2020.09\u20142021.06",sourceName:"\u5B66\u751F\u4F1A2021.jpg",sourceSHA256:"78c95dc9ffa5835cf130127ecb4f2356718036266658d71f15bb358d1f14d796",thumbnail:"./assets/house-profile/union-2021.jpg",original:"./assets/house-profile/union-2021-original.jpg",width:640,height:425,rotation:90,crop:[.005,.11,.985,.94]}];function Tp({title:i="\u5B9E\u4E60\u65E5\u8BB0"}={}){let e=new gt;e.name="companion-open-book";let t=h=>{let f=document.createElement("canvas");f.width=512,f.height=640;let m=f.getContext?.("2d");if(!m)return null;if(m.fillStyle=h?"#fff5dc":"#285861",m.fillRect(0,0,512,640),h){m.fillStyle="#6c5844",m.textAlign="center",m.font="bold 35px serif",m.fillText(i,256,85),m.strokeStyle="#bcad8e",m.lineWidth=3;for(let p=150;p<550;p+=36)m.beginPath(),m.moveTo(60,p),m.lineTo(450-p%3*12,p),m.stroke();m.fillStyle="#ad976f",m.font="23px serif",m.fillText("\u2726",256,598)}else m.strokeStyle="#d5b86b",m.lineWidth=12,m.strokeRect(28,28,456,584),m.fillStyle="#f5d994",m.font="bold 46px serif",m.textAlign="center",m.fillText(i,256,260),m.font="80px serif",m.fillText("\u2693",256,390);let _=new pn(f);return _.colorSpace=Et,_},n=new _t({color:3434866,map:t(!1),roughness:.92}),s=new _t({color:16379340,roughness:1}),r=new _t({color:16777215,map:t(!0),roughness:1,side:Vt}),o=[];for(let h of[-1,1]){let f=new gt;f.rotation.y=-h*.32,e.add(f),o.push(f);let m=new et(new Mn(.307,.335,.016),n);m.position.set(h*.155,0,-.011),f.add(m);let _=new et(new Mn(.285,.312,.025),s);_.position.set(h*.154,0,.01),f.add(_);let p=new et(new cn(.281,.307),r);p.position.set(h*.154,0,.024),f.add(p);for(let g=0;g<5;g++){let b=new et(new Mn(.285,.0014,.001),new _t({color:13285781,roughness:1}));b.position.set(h*.154,-.154,.002+g*.004),f.add(b)}}let a=new et(new Oi(.018,.018,.333,12),n);e.add(a);let l=new gt;l.position.z=.035,e.add(l);let c=new cn(.281,.307,14,1),u=c.attributes.position;for(let h=0;h<u.count;h++){let f=u.getX(h)+.1405;u.setXYZ(h,f,u.getY(h),.018*Math.sin(f/.281*Math.PI))}c.computeVertexNormals(),l.add(new et(c,r)),e.traverse(h=>{h.isMesh&&(h.castShadow=!0,h.receiveShadow=!0)});let d=0;return{group:e,grip:h=>new S(h*.3,-.11,.03),update(h,f,m=1){d=$e.clamp(m,0,1),o[0].rotation.y=$e.lerp(-Math.PI,.32,d),o[0].position.z=.04*(1-d),o[1].rotation.y=-.32*d;let _=h%4.8;l.visible=d>.98&&!f&&_>2.4&&_<4.2;let p=$e.clamp((_-2.4)/1.8,0,1),g=p*p*(3-2*p);l.rotation.y=-Math.PI*g,l.scale.x=1-.72*Math.sin(Math.PI*g)},snapshot:()=>({open:d>.98,opening:d,visible:e.visible,turning:l.visible,coverThickness:.016,pageThickness:.025,spread:.64})}}var Xi=[["pearl","\u6234\u73CD\u73E0\u8033\u73AF\u7684\u7AE0\u9C7C\u54E5"],["mona-lisa","\u7AE0\u9C7C\u54E5\u7684\u5FAE\u7B11"],["starry-portrait","\u661F\u591C\u81EA\u753B\u50CF"],["scream","\u7AE0\u9C7C\u54E5\u7684\u5450\u558A"],["cubist","\u51E0\u4F55\u8096\u50CF"]],Rh=i=>`assets/house-art/${i}.png`;function Zv(i){let e=document.createElement("dialog");e.className="chest-gallery",e.setAttribute("aria-labelledby","chest-gallery-title"),e.innerHTML=`<header><div><span>\u5367\u5BA4 \xB7 \u79C1\u85CF\u753B\u4F5C</span><h2 id="chest-gallery-title">\u73A9\u5177\u7BB1\u91CC\u7684\u5C0F\u753B\u5ECA</h2></div><button class="chest-gallery-close" type="button" aria-label="\u5173\u95ED\u753B\u5ECA">\xD7</button></header><figure><div class="chest-art-frame"><img alt="" width="1080" height="1350"></div><figcaption></figcaption></figure><nav aria-label="\u5207\u6362\u753B\u4F5C"><button type="button" data-art-prev aria-label="\u4E0A\u4E00\u5E45\u753B">\u2190</button><div class="chest-art-thumbs">${Xi.map(([o,a],l)=>`<button type="button" data-art-index="${l}" aria-label="\u67E5\u770B${a}" aria-pressed="false"><img src="${Rh(o)}" alt="" width="40" height="50" loading="lazy"></button>`).join("")}</div><button type="button" data-art-next aria-label="\u4E0B\u4E00\u5E45\u753B">\u2192</button></nav>`,document.body.append(e);let t=0,n,s=e.querySelector("figure img");function r(o){t=(o+Xi.length)%Xi.length;let[a,l]=Xi[t];s.src=Rh(a),s.alt=l,e.dataset.artIndex=String(t),e.querySelector("figcaption").textContent=`${l} \xB7 ${t+1} / ${Xi.length}`,e.querySelectorAll("[data-art-index]").forEach(c=>c.setAttribute("aria-pressed",String(Number(c.dataset.artIndex)===t)))}return e.querySelector(".chest-gallery-close").addEventListener("click",()=>e.close()),e.querySelector("[data-art-prev]").addEventListener("click",()=>r(t-1)),e.querySelector("[data-art-next]").addEventListener("click",()=>r(t+1)),e.querySelectorAll("[data-art-index]").forEach(o=>o.addEventListener("click",()=>r(Number(o.dataset.artIndex)))),e.addEventListener("keydown",o=>{(o.key==="ArrowLeft"||o.key==="ArrowRight")&&(o.preventDefault(),r(t+(o.key==="ArrowRight"?1:-1)))}),e.addEventListener("click",o=>{let a=e.getBoundingClientRect();o.target===e&&(o.clientX<a.left||o.clientX>a.right||o.clientY<a.top||o.clientY>a.bottom)&&e.close()}),e.addEventListener("close",()=>{i(),n?.focus({preventScroll:!0})}),{open(){n=document.activeElement,r(0),e.showModal()},close(){e.close()}}}function wp(i,{root:e,version:t,reducedMotion:n}){let s=new gt;s.position.set(0,.325,-.245),i.add(s);let r=[];i.traverse(_=>{_.isMesh&&_.name.endsWith("__lid")&&r.push(_)});for(let _ of r)s.attach(_);let o=new gt;o.visible=!1,i.add(o);let a=new _t({color:12420914,metalness:.72,roughness:.32}),l=new _t({color:16045450,metalness:.6,roughness:.26}),c=!1,u=0,d=0,h=!1,f=!1;e.dataset.toyChest="closed",e.dataset.toyChestReady="loading";let m=Zv(()=>{c=!1,e.dataset.toyChest="closed"});return Xi.forEach(([_],p)=>{let g=new gt,b=.25,w=.3125,v=(T,x,C,N,B,O)=>{let k=new et(new Mn(T,x,B),O);k.position.set(C,N,.008),g.add(k)};for(let[T,x,C]of[[.025,.027,a],[.006,.033,l]])v(b+T*2,T,0,w/2+T/2,x,C),v(b+T*2,T,0,-w/2-T/2,x,C),v(T,w,-b/2-T/2,0,x,C),v(T,w,b/2+T/2,0,x,C);let E=new zi().load(`${Rh(_)}?v=${t}`,()=>{d++,e.dataset.toyChestReady=h?"false":d===Xi.length?"true":"loading"},void 0,()=>{h=!0,e.dataset.toyChestReady="false"});E.colorSpace=Et;let A=new et(new cn(b,w),new _t({map:E,roughness:.85,side:Vt}));A.position.z=.026,g.add(A),g.position.set((p-2)*.082,.2+Math.abs(p-2)*.007,(2-p)*.028),g.rotation.set(-.12,0,(p-2)*-.12),o.add(g),g.traverse(T=>{T.isMesh&&(T.castShadow=!0,T.receiveShadow=!0),T.userData.roomId="bedroom",T.userData.contentId="toy-chest"})}),{toggle(){if(c){m.close();return}c=!0,e.dataset.toyChest="open",m.open()},setCompanionPlaying(_){f=!!_,e.dataset.toyChestCompanion=String(f)},touchPoint(){return i.updateWorldMatrix(!0,!1),i.localToWorld(new S(0,.32,.12))},update(_){let p=c||f?1:0;u=n?p:$e.damp(u,p,6,_),Math.abs(u-p)<.001&&(u=p),s.rotation.x=-1.4*u,o.visible=u>.05,o.position.y=.06+.22*u,o.scale.setScalar(.55+.45*u)},snapshot:()=>({open:c,companionPlaying:f,amount:u,ready:d===Xi.length,lidParts:r.length,paintings:Xi.length,loaded:d})}}var ps=[{id:"date",title:"\u7EA6\u4F1A \xB7 \u30C7\u30FC\u30C8",credit:"RADWIMPS \u4F5C\u66F2 \xB7 \u620F\u8BF4\u94A2\u7434\u6F14\u594F",recording:"\u300A\u4F60\u7684\u540D\u5B57\u300B\u94A2\u7434\u7248",url:"https://music.163.com/song/media/outer/url?id=1951778950.mp3",page:"https://music.163.com/#/song?id=1951778950"},{id:"lawrence",title:"\u5723\u8BDE\u5FEB\u4E50\uFF0C\u52B3\u4F26\u65AF\u5148\u751F",credit:"\u5742\u672C\u9F99\u4E00 \xB7 \u94A2\u7434\u73B0\u573A\u7248",recording:"Playing the Piano 2009 Japan",url:"https://music.163.com/song/media/outer/url?id=22650506.mp3",page:"https://music.163.com/#/song?id=22650506"},{id:"summer",title:"\u83CA\u6B21\u90CE\u7684\u590F\u5929 \xB7 Summer",credit:"\u4E45\u77F3\u8BA9 \xB7 \u73B0\u573A\u6F14\u594F\u7248",recording:"Best Live 2003",url:"https://music.163.com/song/media/outer/url?id=29405958.mp3",page:"https://music.163.com/#/song?id=29405958"}];var hn=document.createElement("section");hn.className="house-music";hn.hidden=!0;hn.setAttribute("aria-label","\u4E2A\u4EBA\u7F51\u9875\u80CC\u666F\u97F3\u4E50");hn.innerHTML=`<header><h2>\u266B \u6211\u7684\u97F3\u4E50</h2><button type="button" data-music-close aria-label="\u5173\u95ED\u97F3\u4E50\u5E76\u6682\u505C\u64AD\u653E"></button></header>
  <div class="music-tracks" aria-label="\u9009\u62E9\u97F3\u4E50"></div>
  <p class="music-status" role="status" aria-live="polite"></p>
  <div class="music-controls"><button type="button" data-music-play>\u64AD\u653E</button><button type="button" data-music-next>\u4E0B\u4E00\u9996 \u2192</button></div>
  <label class="music-position"><span data-music-time>0:00 / 0:00</span><input type="range" data-music-seek min="0" max="100" value="0" step="0.1" aria-label="\u64AD\u653E\u8FDB\u5EA6" disabled></label>
  <label class="music-volume">\u97F3\u91CF <input type="range" min="0" max="1" step="0.05" value="0.4" aria-label="\u97F3\u4E50\u97F3\u91CF"></label>
  <button type="button" data-music-retry hidden>\u91CD\u8BD5</button>`;document.body.append(hn);var Bt=new Audio;Bt.preload="none";Bt.volume=.4;Bt.dataset.houseAudio="";document.body.append(Bt);var rc=hn.querySelector(".music-status"),oc=hn.querySelector("[data-music-play]"),ac=hn.querySelector("[data-music-seek]"),lc=hn.querySelector("[data-music-retry]"),qi=0,Ch=null,Hr=0,jv=ps.map((i,e)=>{let t=document.createElement("button");return t.type="button",t.innerHTML=`<strong>${i.title}</strong><small>${i.credit}</small>`,t.dataset.musicTrack=i.id,t.addEventListener("click",()=>Xo(e,!0)),hn.querySelector(".music-tracks").append(t),t}),Ap=i=>Number.isFinite(i)?`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`:"0:00";function cc(){oc.textContent=Bt.paused?"\u64AD\u653E":"\u6682\u505C",oc.setAttribute("aria-label",`${Bt.paused?"\u64AD\u653E":"\u6682\u505C"}${ps[qi].title}`);let i=Number.isFinite(Bt.duration)&&Bt.duration>0;ac.disabled=!i,ac.value=i?Bt.currentTime/Bt.duration*100:0,hn.querySelector("[data-music-time]").textContent=`${Ap(Bt.currentTime)} / ${Ap(Bt.duration)}`,hn.dataset.musicState=Bt.error?"error":Bt.paused?"paused":"playing"}function Rp(){rc.textContent="\u8FD9\u9996\u66F2\u5B50\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\uFF0C\u8BF7\u91CD\u8BD5\u3002",lc.hidden=!1,cc()}async function Ph(){let i=++Hr;lc.hidden=!0,rc.textContent="\u6B63\u5728\u8F7D\u5165\u97F3\u4E50\u2026";try{await Bt.play(),i===Hr&&(rc.textContent=ps[qi].recording,cc())}catch(e){if(i!==Hr||e.name==="AbortError")return;Rp()}}function Xo(i,e=!1){++Hr,Bt.pause(),qi=(i+ps.length)%ps.length,Bt.src=ps[qi].url,jv.forEach((t,n)=>t.setAttribute("aria-pressed",String(n===qi))),rc.textContent=ps[qi].recording,lc.hidden=!0,cc(),e&&Ph()}function Cp(){++Hr,Bt.pause(),hn.hidden=!0,Ch?.getClientRects().length?Ch.focus({preventScroll:!0}):document.querySelector("[data-house-back]")?.focus({preventScroll:!0})}window.addEventListener("house:music",()=>{Ch=document.activeElement,hn.hidden=!1,oc.focus({preventScroll:!0})});hn.querySelector("[data-music-close]").addEventListener("click",Cp);oc.addEventListener("click",()=>{Bt.paused?Ph():(++Hr,Bt.pause())});hn.querySelector("[data-music-next]").addEventListener("click",()=>Xo(qi+1,!0));lc.addEventListener("click",()=>{Xo(qi),Ph()});ac.addEventListener("input",()=>{Number.isFinite(Bt.duration)&&(Bt.currentTime=Number(ac.value)/100*Bt.duration)});hn.querySelector(".music-volume input").addEventListener("input",i=>Bt.volume=Number(i.target.value));Bt.addEventListener("error",Rp);Bt.addEventListener("ended",()=>Xo(qi+1,!0));for(let i of["timeupdate","durationchange","play","pause"])Bt.addEventListener(i,cc);window.addEventListener("keydown",i=>{i.key==="Escape"&&!hn.hidden&&!document.querySelector("dialog[open]")&&(i.preventDefault(),i.stopImmediatePropagation(),Cp())},!0);Xo(0);var Ih=[{from:"living",to:"storage",kind:"door",anchor:[-2.45,.95,.25]},{from:"storage",to:"living",kind:"door",anchor:[-2.65,.95,.25]},{from:"living",to:"bathroom",kind:"up",anchor:[2.8,1.2,-1.35],meshes:["stairs_"],bounds:[[-1.1,0,-3.6],[0,1.9,-1.4]]},{from:"bathroom",to:"living",kind:"down",anchor:[-.4,3.95,-1.4],bounds:[[-.9,3,-3.7],[.1,4.9,-1.5]]},{from:"bathroom",to:"library",kind:"door",anchor:[.15,3.95,.5]},{from:"library",to:"bathroom",kind:"door",anchor:[.45,3.95,.5]},{from:"library",to:"bedroom",kind:"up",anchor:[1.3,6.85,-.6]},{from:"bedroom",to:"library",kind:"door",anchor:[1,6.9,-.6]},{from:"bedroom",to:"roof",kind:"up",anchor:[.3,7.4,-1.4],meshes:["stairs_"],bounds:[[-.3,6,-2.8],[.85,7.9,-1.1]]},{from:"roof",to:"bedroom",kind:"down",anchor:[1.8,9.35,-.6],meshes:["roof_landing","roof_access_","stairs_"]}];function Pp({root:i,camera:e,rooms:t,getRoom:n,focusRoom:s}){let r=document.createElement("nav");r.className="house-connections",r.setAttribute("aria-label","\u901A\u5F80\u76F8\u90BB\u623F\u95F4"),r.hidden=!0,i.append(r);let o=l=>`\u2192 ${t.get(l.to).name}`,a=Ih.map(l=>{let c=document.createElement("button");return c.type="button",c.className="room-label passage-label",c.textContent=o(l),c.dataset.housePassage=`${l.from}-${l.to}`,c.setAttribute("aria-label",`\u524D\u5F80${t.get(l.to).name}`),c.addEventListener("click",()=>{n()===l.from&&i.dataset.houseState==="ready"&&s(l.to)&&i.querySelector("[data-house-back]").focus({preventScroll:!0})}),r.append(c),{link:l,button:c}});return{update(){let l=n(),c=i.dataset.houseState==="ready";r.hidden=!l||!c;let u=[...i.querySelectorAll("[data-house-object]:not([hidden])")].map(d=>{let h=d.getBoundingClientRect();return{x:h.x+h.width/2,y:h.y+h.height/2,half:h.width/2+12}});for(let{link:d,button:h}of a){if(h.hidden=!c||d.from!==l,h.disabled=i.dataset.cameraTransition==="moving",h.hidden)continue;let f=new S(...d.anchor).project(e),m=i.clientWidth,_=i.clientHeight,p=h.offsetWidth/2+12,g=$e.clamp((f.x*.5+.5)*m,p,m-p),b=$e.clamp((-f.y*.5+.5)*_,210,_-70);f.z>1&&(g=m-p,b=_-90);for(let w of u)Math.abs(g-w.x)<p+w.half&&Math.abs(b-w.y)<46&&(b=w.y+48);b>_-70&&(b=_-70-u.length*48),u.push({x:g,y:b,half:p}),h.style.left=`${g}px`,h.style.top=`${b}px`}},pick:(l,c)=>Ih.find(u=>u.from===n()&&(u.meshes?.some(d=>l.name.startsWith(d))||u.bounds&&l.userData.roomId===u.from&&c.toArray().every((d,h)=>d>=u.bounds[0][h]&&d<=u.bounds[1][h]))),label:o}}var ms={version:"20261015-entrances-1",order:["patrick","squidward","pineapple"],houses:[{id:"patrick",name:"\u6D3E\u5927\u661F\u7684\u5BB6",height:3.8,x:-9.5,z:0,entry:"patrick-house.html?neighborhood=1",component:"patrick-exterior",source:"scripts/patrick-house.js:\u95ED\u5408\u5916\u58F3\u4E0E\u98CE\u5411\u6807"},{id:"squidward",name:"\u7AE0\u9C7C\u54E5\u7684\u5BB6",url:"assets/models/neighborhood/squidward-house.glb",height:8.6,x:0,z:0,shellOnly:!0,entry:"docs/squidward-home/index.html?autotest=cutaway"},{id:"pineapple",name:"\u6D77\u7EF5\u5B9D\u5B9D\u7684\u5BB6",url:"assets/models/pineapple-shell.glb",height:10.5,x:10,z:0}]};var Lh=20261013,Cn=()=>(Lh=Math.imul(Lh,1664525)+1013904223>>>0,Lh/4294967296),Qv=(i,e)=>{let t=document.createElement("canvas");return t.width=i,t.height=e,[t,t.getContext("2d")]},eM=i=>(i.colorSpace=Et,i),tM=(i,e=.85,t={})=>new _t({color:i,roughness:e,...t}),Ip=(i,e=.85,t={})=>new _t({map:i,roughness:e,...t});function Lp(i=512,e="#7c4b66"){let[t,n]=Qv(i,i);n.fillStyle=e,n.fillRect(0,0,i,i);let s=["#8a5570","#6e4059","#94607a","#5f3748","#845072","#754963"],r="#a0718d",o="#523047";e!=="#7c4b66"&&(s.length=0,s.push("#909997","#777f7d","#a8adaa","#626d6c","#8e9691","#818b87"));let a=e!=="#7c4b66"?"#bdc5bd":r,l=e!=="#7c4b66"?"#485856":o;for(let c=0;c<70;c++){n.fillStyle=s[Cn()*s.length|0],n.globalAlpha=.12+Cn()*.2;let u=i*(.04+Cn()*.16);n.beginPath(),n.arc(Cn()*i,Cn()*i,u,0,Math.PI*2),n.fill()}n.globalAlpha=1;for(let c=0;c<2600;c++)n.fillStyle=Cn()>.5?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.08)",n.fillRect(Cn()*i,Cn()*i,1.5,1.5);n.globalAlpha=.14;for(let c=0;c<26;c++){let u=Cn()*i,d=i*(.2+Cn()*.5);n.strokeStyle=Cn()>.5?a:l,n.lineWidth=2+Cn()*5,n.beginPath(),n.moveTo(u,Cn()*i*.3),n.lineTo(u+(Cn()-.5)*20,Cn()*i*.3+d),n.stroke()}return n.globalAlpha=1,eM(new pn(t))}function nM(){return tM(14266943,.3,{metalness:.55,roughness:.32})}var iM=i=>(i.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),i);function Dp(){let i=new gt,e=nM(),t=new et(new Oi(.035,.05,1,10),e);t.position.y=.5,i.add(t);let n=new gt;n.position.y=1;let s=new et(new Oi(.026,.026,1.1,8),e);s.rotation.z=Math.PI/2,n.add(s);let r=new li;r.moveTo(-.4,.035),r.lineTo(.4,.035),r.bezierCurveTo(.43,.08,.43,.145,.5,.145),r.bezierCurveTo(.6,.15,.64,.04,.59,0),r.bezierCurveTo(.64,-.04,.6,-.15,.5,-.145),r.bezierCurveTo(.43,-.145,.43,-.08,.4,-.035),r.lineTo(-.4,-.035),r.bezierCurveTo(-.43,-.08,-.43,-.145,-.5,-.145),r.bezierCurveTo(-.6,-.15,-.64,-.04,-.59,0),r.bezierCurveTo(-.64,.04,-.6,.15,-.5,.145),r.bezierCurveTo(-.43,.145,-.43,.08,-.4,.035);let o=new Ps(r,{depth:.045,bevelEnabled:!0,bevelThickness:.017,bevelSize:.017,bevelSegments:3,curveSegments:14});o.translate(0,0,-.0225),n.add(new et(o,e));let a=new et(new Oi(.095,.15,.085,24),e);a.position.y=.045,i.add(a);for(let c of[.16,.51,.96]){let u=new et(new Is(.043,.012,8,24),e);u.rotation.x=Math.PI/2,u.position.y=c,i.add(u)}let l=new et(new Gn(.07,12,10),e);return n.add(l),i.add(n),i.userData.vaneTop=n,iM(i)}function Np(){function i(o,a){let l=o.attributes.position,c=new S,u=a*12.9898;for(let d=0;d<l.count;d++){c.fromBufferAttribute(l,d);let h=c.length();if(h<.001)continue;let f=c.x/h,m=c.y/h,_=c.z/h,p=Math.sin(u+f*6.2+m*3.1)*Math.cos(u+_*5.1-m*2.2)+.5*Math.sin(u+f*11.3-_*7.7+m*4.4)+.25*Math.cos(u+f*17.7+_*13.1+m*8.8),g=m<.12?Math.max(0,1-(.12-m)*4):1,b=1+Math.max(-.035,Math.min(.035,p*.012))*g;c.setLength(h*b),l.setXYZ(d,c.x,c.y,c.z)}return l.needsUpdate=!0,o.computeVertexNormals(),o}let e=new gt,t=new Gn(4.5,64,28,0,Math.PI*2,0,Math.PI/2),n=Ip(Lp(512),.9);n.side=Vt,i(t,1),e.add(new et(t,n));let s=new et(new vi(4.5,64),n);s.name="rock_solid_underside",s.rotation.x=Math.PI/2,e.add(s);let r=Dp();return r.position.set(0,4.5,0),e.add(r),e}var Nh=i=>i*i*(3-2*i);function sM(i,e,t,n,s=24){let r=[[i-t,e],[i+t,e],[i+t,n]];for(let o=1;o<=s;o++){let a=o/s*Math.PI;r.push([i+t*Math.cos(a),n+t*Math.sin(a)])}return r}function Up(i){return new li(i.map(([e,t])=>new be(e,t)))}function kr(i,e,t,n){let s=new et(i,e);return s.name=t,n.add(s),s}function rM(i){return i.updateWorldMatrix(!0,!0),new Ot().setFromObject(i)}function oM(i,e){e.updateWorldMatrix(!0,!0);let t=e.geometry.attributes.position,n=new Map,s=new S;for(let l=0;l<t.count;l++)s.fromBufferAttribute(t,l),i.worldToLocal(e.localToWorld(s)),n.set(s.x.toFixed(6)+","+s.y.toFixed(6),[s.x,s.y]);let r=[...n.values()].sort((l,c)=>l[0]-c[0]||l[1]-c[1]),o=(l,c,u)=>(c[0]-l[0])*(u[1]-l[1])-(c[1]-l[1])*(u[0]-l[0]),a=l=>{let c=[];for(let u of l){for(;c.length>=2&&o(c.at(-2),c.at(-1),u)<=1e-9;)c.pop();c.push(u)}return c.pop(),c};return[...a(r),...a([...r].reverse())]}function Dh(i,e,t){let n=e.map((d,h)=>{let f=e[(h+1)%e.length];return[-f[1]+d[1],f[0]-d[0],0,(f[1]-d[1])*d[0]-(f[0]-d[0])*d[1]]});n.push([0,0,1,-t]);let s=i.index?i.toNonIndexed():i,r=[],o=[],a=["position","normal","uv"].filter(d=>s.attributes[d]);function l(d){return a.flatMap(h=>Array.from({length:s.attributes[h].itemSize},(f,m)=>s.attributes[h].array[d*s.attributes[h].itemSize+m]))}function c(d,h){for(let f=1;f<d.length-1;f++)h.push(d[0],d[f],d[f+1])}for(let d=0;d<s.attributes.position.count;d+=3){let h=[l(d),l(d+1),l(d+2)];if(n.some(([f,m,_,p])=>h.every(g=>f*g[0]+m*g[1]+_*g[2]+p<-1e-8))){c(h,o);continue}for(let[f,m,_,p]of n){if(!h.length)break;let g=[],b=[];for(let w=0;w<h.length;w++){let v=h[w],E=h[(w+1)%h.length],A=f*v[0]+m*v[1]+_*v[2]+p,T=f*E[0]+m*E[1]+_*E[2]+p;if((A>=-1e-8?g:b).push(v),A>1e-8&&T<-1e-8||A<-1e-8&&T>1e-8){let x=A/(A-T),C=v.map((N,B)=>N+(E[B]-N)*x);g.push(C),b.push(C)}}c(b,o),h=g}c(h,r)}function u(d){let h=new wt,f=0;for(let m of a){let _=s.attributes[m].itemSize;h.setAttribute(m,new ut(d.flatMap(p=>p.slice(f,f+_)),_)),f+=_}return h.computeBoundingBox(),h.computeBoundingSphere(),h}return{inside:u(r),outside:u(o)}}function Fp(i,e,t,n){let s=new gt;s.name="entrance_hinge",s.position.copy(n),i.add(s),i.updateMatrixWorld(!0);for(let r of[e,t].filter(Boolean))s.attach(r);return s}function aM(){let i=document.createElement("canvas");i.width=512,i.height=768;let e=i.getContext("2d"),t=18,n=()=>(t=t*16807%2147483647,t/2147483647);for(let r=0;r<6;r++){let o=r*512/6,a=512/6;e.fillStyle=["#b57b34","#c99245","#bf873d","#ce9a4e","#bc8238","#c58e42"][r],e.fillRect(o,0,a+1,768);for(let l=0;l<85;l++){let c=o+3+n()*(a-6);e.strokeStyle=l%3?"#f3c97b18":"#67421c20",e.lineWidth=.5+n()*1.3,e.beginPath(),e.moveTo(c,0),e.bezierCurveTo(c+8*n(),260,c-8*n(),500,c,768),e.stroke()}e.fillStyle="#553818",e.fillRect(o,0,6,768),e.fillStyle="#edbf6a",e.fillRect(o+6,0,2,768)}for(let[r,o]of[[125,225],[365,530]]){e.strokeStyle="#7d501f88",e.lineWidth=2;for(let a=1;a<4;a++)e.beginPath(),e.ellipse(r,o,a*3,a*11,.06,0,Math.PI*2),e.stroke()}let s=new pn(i);return s.colorSpace=Et,s}function Op(i){i.updateMatrixWorld(!0);let e=[];i.traverse(v=>{v.isMesh&&v.visible&&/^(shell_main|shell_cutaway_cover)/.test(v.name)&&e.push(v)});let t=e.find(v=>v.material.name==="v7_blue_volcanic_stone")?.material.clone();if(t){t.color.setRGB(.78,.93,1.32),t.roughness=.87,t.bumpMap=t.map,t.bumpScale=.009,i.traverse(T=>{T.isMesh&&T.visible&&T.material.name==="v7_blue_volcanic_stone"&&(T.material=t)});let v=new Map,E=-1/0;for(let T of e){if(T.material!==t)continue;let x=T.geometry.attributes.position;for(let C=0;C<x.count;C++)E=Math.max(E,x.getY(C))}for(let T of e){if(T.material!==t)continue;let x=T.geometry.attributes.position;for(let C=0;C<x.count;C++)if(Math.abs(x.getY(C)-E)<.001){let N=x.getX(C),B=x.getZ(C);Math.hypot(N,B)>.1&&v.set(Math.atan2(B,N).toFixed(5),[N,E,B])}}let A=[...v.values()].sort((T,x)=>Math.atan2(T[2],T[0])-Math.atan2(x[2],x[0]));if(A.length>=3){let T=[],x=[];for(let N=0;N<A.length;N++){let B=A[N],O=A[(N+1)%A.length];for(let k of[[0,E+.018,0],O,B])T.push(...k),x.push(k[0]/2.8+.5,k[2]/2.8+.5)}let C=new wt;C.setAttribute("position",new ut(T,3)),C.setAttribute("uv",new ut(x,2)),C.computeVertexNormals(),kr(C,t,"shell_roof_closed",i),i.userData.roofClosed=!0}}let n=new _t({color:1388131,roughness:.74,metalness:.06}),s=i.getObjectByName("door_frame"),r=i.getObjectByName("door_panel"),o=i.getObjectByName("door_handle");if(!r)throw new Error("Missing Squidward door panel");s.position.y-=.15,r.position.y-=.15,s.scale.x=r.scale.x=1.12,r.position.x*=1.12,s.material=n;let a=rM(r),l=oM(i,r),c=l.map(([v,E])=>[v*1.015,E-.003]),u=Dh(s.geometry,l.map(([v,E])=>[v/s.scale.x,E-s.position.y]),1);s.geometry=u.outside,u.inside.dispose();for(let v of e)if(v.material===t){let E=Dh(v.geometry,c,1.15);v.geometry=E.outside,E.inside.dispose()}let d=aM(),h=r.material.clone();h.map=d,h.color.set("#d8ba89"),h.bumpMap=d,h.bumpScale=.004,h.roughness=.78,r.material=h;let f=r.geometry.clone(),m=f.attributes.position,_=[];for(let v=0;v<m.count;v++)_.push(m.getX(v)/.6624,m.getY(v)/.9968);f.setAttribute("uv",new ut(_,2)),r.geometry=f;let p=kr(new Gn(.045,20,14),new _t({color:14199880,roughness:.4,metalness:.4}),"door_brass_knob",i);p.position.set(.255*1.12,.4,1.636),o.visible=!1;let g=new _t({color:1056297,roughness:1,side:Vt}),b=kr(new Sr(Up(l)),g,"entrance_recess",i);b.position.z=1.4;let w=Fp(i,r,p,new S(a.min.x,a.min.y,1.56));return{pivot:w,anchor:new S(0,.45,1.59),doorMeshes:[r,p,s],setOpen:v=>{w.rotation.y=-Nh(v)*Math.PI*.57},reset(){w.rotation.y=0}}}function Bp(i){let e=i.getObjectByProperty("isMesh",!0),t=sM(0,.008,.14,.39),n=Dh(e.geometry,t,.46);e.geometry=n.outside;let s=kr(n.inside,e.material.clone(),"pineapple_original_door",e.parent);s.material.side=Vt,s.position.copy(e.position),s.quaternion.copy(e.quaternion),s.scale.copy(e.scale);let r=kr(new Sr(Up(t)),new _t({color:1059906,roughness:1,side:Vt}),"pineapple_entrance_recess",i);r.position.z=.48;let o=Fp(i,s,null,new S(-.14,.008,.59));return{pivot:o,anchor:new S(0,.27,.59),doorMeshes:[s],setOpen:a=>{o.rotation.y=-Nh(a)*Math.PI*.56},reset(){o.rotation.y=0}}}function Hp(i){let e=new gt;e.name="rock_back_hinge",e.position.set(0,0,-4.35),i.add(e),i.updateMatrixWorld(!0);for(let n of[...i.children])n!==e&&e.attach(n);let t=kr(new vi(4.32,72),new _t({color:2760740,roughness:1,side:Vt}),"under_rock_entrance",i);return t.rotation.x=-Math.PI/2,t.position.y=.012,{pivot:e,anchor:new S(0,.1,0),doorMeshes:[e],setOpen:n=>{e.rotation.x=-Nh(n)*Math.PI*.46},reset(){e.rotation.x=0}}}function lM(i){if(i.userData.portholeDetails)return;i.userData.portholeDetails=!0;let e=new gt;e.name="porthole_details";let t=new _t({color:5858993,roughness:.65,metalness:.12}),n=document.createElement("canvas");n.width=n.height=128;let s=n.getContext("2d"),r=s.createRadialGradient(46,38,4,64,64,88);r.addColorStop(0,"#cfdfdb"),r.addColorStop(.45,"#739ab7"),r.addColorStop(1,"#345172"),s.fillStyle=r,s.fillRect(0,0,128,128),s.strokeStyle="rgba(240,250,248,0.3)",s.lineWidth=8,s.beginPath(),s.moveTo(18,22),s.lineTo(91,101),s.stroke();let o=new pn(n);o.colorSpace=Et;let a=new un({map:o,metalness:.08,roughness:.22,transparent:!1,clearcoat:.9,clearcoatRoughness:.15});i.traverse(l=>{if(!l.isMesh||!/^shell_porthole_[LR]$/.test(l.name))return;let c=new Ot().setFromObject(l),u=c.getCenter(new S),d=c.getSize(new S),h=Math.max(d.x,d.z)/2,f=new S(0,0,1),m=new et(new Is(h*.94,h*.18,10,40),t);m.position.copy(i.worldToLocal(new S(u.x,u.y,c.max.z+.012))),m.lookAt(m.position.clone().add(f)),e.add(m);let _=new _t({color:2702965,roughness:.6,metalness:.2});for(let g=0;g<8;g++){let b=g/8*Math.PI*2,w=new et(new Gn(h*.055,8,6),_);w.position.copy(m.position).add(new S(Math.cos(b)*h*.94,Math.sin(b)*h*.94,h*.16)),w.scale.z=.4,e.add(w)}let p=new et(new vi(h*.66,28),a);p.position.copy(i.worldToLocal(new S(u.x,u.y,c.max.z+.025))),p.lookAt(p.position.clone().add(f)),e.add(p)}),e.children.length&&i.add(e)}function kp({root:i,scene:e,loader:t,camera:n,canvas:s,controls:r,reducedMotion:o,onTransition:a,onProgress:l,onFailure:c,onPineapple:u,onStreet:d}){let h=new gt;h.name="bikini-bottom-neighborhood",e.add(h);let f=new Map,m=new Map,_=new Map,p=!0,g=!1,b=null,w=null,v=null,E=document.createElement("nav");E.className="neighborhood-labels",E.setAttribute("aria-label","\u6BD4\u5947\u5821\u4E09\u4F4D\u90BB\u5C45"),i.append(E);let A=document.createElement("button");A.className="neighborhood-return",A.textContent="\u2190 \u8FD4\u56DE\u6BD4\u5947\u5821",A.hidden=!0,i.append(A);let T=document.createElement("section");T.className="neighborhood-visit",T.hidden=!0,T.setAttribute("aria-label","\u90BB\u5C45\u5BB6\u4E2D"),i.append(T);let x=document.createElement("div");x.className="neighborhood-fade",x.hidden=!0,i.append(x);function C(_e,H="",R=0){i.dataset.entranceState=_e,i.dataset.entranceHouse=H,i.dataset.entranceProgress=R.toFixed(3)}function N(){clearTimeout(v),x.style.opacity="0",v=setTimeout(()=>{x.hidden=!0},350)}function B(){b&&(b.remove(),b=null),T.hidden=!0,g=!1}function O(_e){let H=ms.houses.find(R=>R.id===_e);w=null,r.enabled=!0,r.enableDamping=!0,C("inside",_e,1),_e==="pineapple"?(p=!1,h.visible=!1,i.dataset.neighborhood="inside",u(),v=setTimeout(N,o?0:680)):(g=!0,i.dataset.neighborhood="visit",T.hidden=!1,b=document.createElement("iframe"),b.title=H.name,b.addEventListener("load",N,{once:!0}),b.src=H.entry,T.append(b),A.focus({preventScroll:!0}))}function k(_e){if(i.dataset.houseState!=="ready"||!f.has(_e)||w||g||!p)return;G(),E.hidden=!0,A.hidden=!1,x.hidden=!1,x.style.opacity="0";let H=f.get(_e),R=_.get(_e),I=H.localToWorld(R.anchor.clone()),U=_e==="patrick";a(),r.enabled=!1,r.enableDamping=!1;let F=Math.max(U?15:5,(U?4.2:1.2)/(Math.tan($e.degToRad(n.fov/2))*n.aspect)),J=I.clone().add(new S(0,U?2.4:0,0)),fe=I.clone().add(new S(U?2:.25,U?F*.5:F*.13,F));w={id:_e,start:performance.now(),from:n.position.clone(),fromTarget:r.target.clone(),position:fe,target:J,anchor:I,entrance:R,rock:U},C("approaching",_e)}let D=new Map(ms.houses.map(_e=>{let H=document.createElement("button");return H.className="neighborhood-label",H.textContent=_e.name,H.dataset.neighbor=_e.id,H.disabled=!0,H.addEventListener("click",()=>k(_e.id)),E.append(H),[_e.id,H]}));function G(){let _e=i.querySelector("[data-house-tooltip]");_e&&(_e.hidden=!0)}function $(){clearTimeout(v),w=null,r.enabled=!0,r.enableDamping=!0,x.hidden=!0;for(let _e of _.values())_e.reset();C("idle"),G(),B(),p=!0,h.visible=!0,E.hidden=!1,A.hidden=!0,i.dataset.neighborhood="street",d()}A.addEventListener("click",$),window.addEventListener("keydown",_e=>{_e.key==="Escape"&&(g||w)&&(_e.preventDefault(),$())});function K(){let _e=document.createElement("canvas");_e.width=_e.height=256;let H=_e.getContext("2d");H.fillStyle="#e8dba5",H.fillRect(0,0,256,256);let R=31;for(let U=0;U<3600;U++){R=R*16807%2147483647;let F=R%256;R=R*16807%2147483647;let J=R%256;H.fillStyle=U%3?"#c9ba862e":"#fff8d355",H.fillRect(F,J,1,1)}let I=new pn(_e);return I.colorSpace=Et,I.wrapS=I.wrapT=gi,I.repeat.set(12,12),I}let oe=new et(new cn(1e3,1e3),new _t({map:K(),roughness:1}));oe.rotation.x=-Math.PI/2,oe.position.y=-.025,oe.receiveShadow=!0,h.add(oe);let W=new _t({color:4350826,roughness:1}),ie=new et(new cn(150,4.5),W);ie.rotation.x=-Math.PI/2,ie.position.set(0,-.012,9),ie.receiveShadow=!0,h.add(ie);function re(_e,H){let R=H.max.z-.08,I=6.75;if(_e.id==="squidward")for(let U=R+.3;U<I;U+=.72){let F=new et(new Mn(1.5,.045,.4),new _t({color:7764325,roughness:1}));F.position.set(_e.x,0,U),F.rotation.y=.04*Math.sin(U*5),F.receiveShadow=!0,h.add(F)}else{let U=Math.max(.4,I-R),F=new et(new cn(_e.id==="patrick"?2.1:1.7,U),W);if(F.rotation.x=-Math.PI/2,F.position.set(_e.x,-.005,R+U/2),F.receiveShadow=!0,h.add(F),_e.id==="pineapple")for(let J=R+.3;J<I;J+=.65){let fe=new et(new vi(.25,7),new _t({color:10134617,roughness:1}));fe.rotation.x=-Math.PI/2,fe.scale.x=1.3,fe.position.set(_e.x+.25*Math.sin(J*4),.004,J),h.add(fe)}}}async function ve(_e){try{let H=_e.component==="patrick-exterior"?Np():(await t.loadAsync(_e.url+"?v="+ms.version)).scene;_e.shellOnly&&H.traverse(q=>{if(q.isMesh){let te=q,ne=!1;for(;te&&te!==H;)/^(shell_|door_)/.test(te.name)&&(ne=!0),te=te.parent;q.visible=ne}}),_e.id==="squidward"&&lM(H);let R=_e.id==="squidward"?Op(H):_e.id==="pineapple"?Bp(H):Hp(H);_.set(_e.id,R),H.updateMatrixWorld(!0);let I=new Ot;H.traverse(q=>{q.isMesh&&q.visible&&I.union(new Ot().setFromObject(q))});let U=I.getSize(new S),F=I.getCenter(new S),J=_e.height/U.y;H.scale.set(J*(_e.widthScale||1),J,J),H.position.set(_e.x-F.x*J*(_e.widthScale||1),-I.min.y*J,_e.z-F.z*J),H.userData.neighbor=_e.id,H.traverse(q=>{q.isMesh&&(q.castShadow=!0,q.receiveShadow=!0)}),h.add(H),H.updateMatrixWorld(!0);let fe=new Ot;return H.traverse(q=>{q.isMesh&&q.visible&&fe.union(new Ot().setFromObject(q))}),m.set(_e.id,fe),f.set(_e.id,H),re(_e,fe),D.get(_e.id).disabled=!1,i.dataset.neighborhoodBounds=JSON.stringify(ms.houses.filter(q=>m.has(q.id)).map(q=>({id:q.id,min:m.get(q.id).min.toArray(),max:m.get(q.id).max.toArray()}))),l(_e.id),!0}catch{return c({id:"neighbor-"+_e.id,name:_e.name,url:_e.url||"scripts/patrick-exterior.js",kind:"neighbor",neighbor:_e.id}),!1}}function Me(){let _e=$e.degToRad(n.fov),H=Math.max(14,33/n.aspect)/(2*Math.tan(_e/2))*1.12;return{target:new S(.5,4.3,0),position:new S(.5,4.3+H*.1,H)}}function Ne(_e){let H=_e.intersectObjects([...f.values()],!0).filter(I=>{let U=I.object;for(;U;){if(!U.visible)return!1;U=U.parent}return!0});if(!H.length)return null;let R=H[0].object;for(;R&&!R.userData.neighbor;)R=R.parent;return R?.userData.neighbor||null}function Ye(_e,H,R=performance.now()){if(!(!p||g)){if(w){let I=w,U=(R-I.start)/(o?700:2450),F=J=>(J=$e.clamp(J,0,1),J*J*(3-2*J));if(U<.3){let J=F(U/.3);n.position.lerpVectors(I.from,I.position,J),r.target.lerpVectors(I.fromTarget,I.target,J),C("approaching",I.id,U)}else{let J=F((U-.3)/.34);if(I.entrance.setOpen(J),C(I.rock?"lifting-rock":"opening-door",I.id,U),U>.64){let fe=F((U-.64)/.36),q=I.anchor.clone().add(I.rock?new S(0,-1.7,0):new S(0,0,-1.3)),te=I.anchor.clone().add(I.rock?new S(0,-2.5,-1):new S(0,0,-3));n.position.lerpVectors(I.position,q,fe),r.target.lerpVectors(I.target,te,fe),C("entering",I.id,U),x.style.opacity=String(F((U-.88)/.12))}}n.lookAt(r.target),n.updateMatrixWorld(!0),i.dataset.entranceAngle=(I.rock?I.entrance.pivot.rotation.x:I.entrance.pivot.rotation.y).toFixed(3),U>=1&&(x.style.opacity="1",O(I.id))}for(let I of ms.houses){let U=m.get(I.id);if(!U)continue;let F=new S(I.x,-.45,U.max.z).project(n),J=D.get(I.id);J.style.left=`${(F.x*.5+.5)*_e}px`,J.style.top=`${(-F.y*.5+.5)*H}px`}}}return i.dataset.neighborhood="street",C("idle"),{group:h,pose:Me,pick:Ne,choose:k,show:$,update:Ye,loadAll:()=>Promise.all(ms.houses.map(ve)),retry:_e=>ve(ms.houses.find(H=>H.id===_e)),get loadedCount(){return f.size},get visible(){return p},get visiting(){return g},get transitioning(){return!!w}}}var bt=document.querySelector(".house"),qt=document.querySelector("[data-house-canvas]"),hc=document.querySelector("[data-house-loading]"),dc=document.querySelector("[data-house-error]"),Vp=document.querySelector("[data-house-progress]"),Uh=document.querySelector("[data-house-caption]"),qo=document.querySelector("[data-house-labels]"),Fh=document.querySelector("[data-house-objects]"),Ai=document.querySelector("[data-house-tooltip]"),Yo=new Map(Rn.rooms.map(i=>[i.id,i])),Wp=new Map(Rn.interactions.map(i=>[i.id,i]));function zp(i){let e=Wp.get(i);if(e){if(e.action==="toy"){window.dispatchEvent(new CustomEvent("house:toy-chest"));return}window.dispatchEvent(new CustomEvent(e.action==="music"?"house:music":"house:content",{detail:{id:i,section:e.section}}))}}var Vr=matchMedia("(prefers-reduced-motion: reduce)").matches,Zo=new URLSearchParams(location.search).has("structure"),Xp=new URLSearchParams(location.search).has("privacy");Xp&&document.body.classList.add("privacy-preview");var qp=[Rn.structure,...Zo?[]:Rn.assets],Yp=Zo?[]:Wo.map(i=>({id:`award-${i.id}`,name:i.title,url:i.thumbnail,kind:"texture",award:i})),Zp=bt.hasAttribute("data-house-companion")||bt.hasAttribute("data-house-companion-preview"),Kp=bt.hasAttribute("data-house-neighborhood"),Gp=qp.length+Yp.length+Number(Zp)+(Kp?3:0),cM=performance.now(),uc=new Set,zs=new Map,dn=new Map,gn;function Oh(i){bt.dataset.houseState="error",bt.setAttribute("aria-busy","false"),hc.hidden=!0,dc.hidden=!1,dc.querySelector("h2").textContent=dn.size?"\u90E8\u5206\u8D44\u6E90\u672A\u80FD\u8F7D\u5165":"\u65E0\u6CD5\u663E\u793A\u4E09\u7EF4\u623F\u5C4B",document.querySelector("[data-house-error-message]").textContent=i;let e=document.querySelector("[data-house-error-list]");e.replaceChildren();for(let[t,n]of dn){let s=document.createElement("li");s.textContent=`${n.name}\uFF1A${n.url}`,s.dataset.assetId=t,e.append(s)}}try{gn=new $l({canvas:qt,antialias:!0,alpha:!0})}catch{Oh("\u6D4F\u89C8\u5668\u672A\u80FD\u542F\u7528 WebGL\u3002\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u7684\u786C\u4EF6\u52A0\u901F\u8BBE\u7F6E\u540E\u91CD\u8BD5\u3002"),document.querySelector("[data-house-retry]").addEventListener("click",()=>location.reload())}if(gn){let $=function(R,I,U,F,J,fe,q){let te=new gt;te.name=R,Object.assign(te.userData,q),te.position.fromArray(J),te.quaternion.setFromUnitVectors(new S(0,0,1),fe.clone().normalize());let ne=q.book,pe=new et(new Mn(I+.045,U+.045,.045),new _t({color:ne?15984585:9597254,roughness:.88}));pe.receiveShadow=!0,te.add(pe);let ce=new et(new cn(ne?I+.055:I,ne?U+.055:U),F);if(ce.position.z=.024,te.add(ce),ne){let Oe=ce.clone();Oe.position.z=-.024,Oe.rotation.y=Math.PI,te.add(Oe);let Fe=pe.clone();Fe.scale.set(.06,1.02,1.16),Fe.position.x=-I/2,Fe.material=new _t({color:4287609,roughness:.95}),te.add(Fe);for(let Ee=0;Ee<3;Ee++){let ke=[new S(-I/2,-U/2-.023,-.013+Ee*.011),new S(I/2+.022,-U/2-.023,-.013+Ee*.011)];te.add(new yi(new wt().setFromPoints(ke),new ai({color:13351836})))}}return c.add(te),te},K=function(R){return new Promise(I=>{if(Xp){let U=document.createElement("canvas");U.width=512,U.height=360;let F=U.getContext("2d");F.fillStyle="#f8f0d9",F.fillRect(0,0,512,360),F.strokeStyle="#ad894c",F.lineWidth=12,F.strokeRect(18,18,476,324),F.fillStyle="#53665d",F.textAlign="center",F.font="bold 48px sans-serif",F.fillText("\u8363\u8A89\u8BC1\u4E66",256,162),F.font="28px sans-serif",F.fillText("\u4E2A\u4EBA\u4FE1\u606F\u5DF2\u9690\u85CF",256,226);let J=new pn(U);J.colorSpace=Et;let fe=u.get(R.award.id);fe.map=J,fe.needsUpdate=!0,uc.add(R.id),Ne(),I(!0);return}new zi().load(R.url,U=>{U.colorSpace=Et,U.anisotropy=Math.min(4,gn.capabilities.getMaxAnisotropy());let F=u.get(R.award.id);F.map=U,F.needsUpdate=!0,uc.add(R.id),dn.delete(R.id),Ne(),I(!0)},void 0,()=>{dn.set(R.id,R),Ne(),I(!1)})})},oe=function(){let U=$e.degToRad(s.fov),F=Math.max(15.8/(2*Math.tan(U/2)),11.8/(2*Math.tan(U/2)*s.aspect))*1.07;return{target:new S(0,5.8,0),position:new S(F*.055,5.8+F*.105,F)}},W=function(R,I){bt.dataset.cameraTransition="moving",r.enabled=!1,b={start:performance.now(),fromPosition:s.position.clone(),fromTarget:r.target.clone(),position:R,target:I,duration:Vr?0:650}},ie=function(){c.children.forEach(R=>{R.visible=!p||R.userData.roomId===p}),Fh.hidden=!p;for(let R of zs.values())R.traverse(I=>{let U=I.userData;if(!I.isMesh)return;let F=R.userData.assetId==="structure",J=F&&U.roomId==="living"&&(U.occluder||I.name==="living_L0_sand");if(J&&(Array.isArray(I.material)?I.material:[I.material]).forEach(te=>{te.clippingPlanes=t[p]??null}),!p){I.visible=!U.roomViewOnly;return}let fe=U.roomId===p;if(!F)fe=R.userData.roomId===p;else if(p==="storage"&&J)fe=!0;else if(U.roomId==="stairs"){I.visible=!1;return}F&&I.name==="roof_L3_leaf"&&(fe=!1),I.visible=U.roomViewOnly?U.roomViewOnly===p:fe});if(p==="roof"){let R=[];zs.get("structure")?.traverse(I=>{I.isMesh&&I.userData.roomId==="stairs"&&I.userData.level>=2&&R.push({name:I.name,level:I.userData.level,roofAccess:!!I.userData.roofAccess,visible:I.visible})}),bt.dataset.roofMeshes=JSON.stringify(R)}},re=function(R){let I=Yo.get(R);if(!I||!E||T||g?.visible)return!1;let U=p!==R;p=R,bt.dataset.houseView="room",Uh.hidden=!1,qo.hidden=!0,Ai.hidden=!0,document.querySelector("[data-house-floor]").textContent=I.floor,document.querySelector("[data-house-room-name]").textContent=I.name,ie();let F=new S(...I.target),J=new S(...I.camera),fe=I.bounds[1][0]-I.bounds[0][0],q=I.bounds[1][1]-I.bounds[0][1],te=Math.tan($e.degToRad(s.fov/2)),ne=Math.max(fe/(2*te*s.aspect),q/(2*te))*1.08,pe=J.clone().sub(F);return pe.multiplyScalar(Math.max(1,ne/pe.length())),J.copy(F).add(pe),W(J,F),U&&window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:R}})),!0},ve=function(){if(g?.visible){g.show();return}p=null,bt.dataset.houseView="whole",Uh.hidden=!0,qo.hidden=!1,Ai.hidden=!0,ie();let R=oe();W(R.position,R.target),window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:null}}))},Me=function(R,I){let U=qt.getBoundingClientRect();f.set((R-U.left)/U.width*2-1,-(I-U.top)/U.height*2+1),h.setFromCamera(f,s);let F=[];l.traverse(fe=>{if(!fe.isMesh)return;let q=fe;for(;q;){if(!q.visible)return;q=q.parent}F.push(fe)});let J=h.intersectObjects(F,!1);for(let fe of J){if((Array.isArray(fe.object.material)?fe.object.material[fe.face.materialIndex]:fe.object.material).clippingPlanes?.some(ce=>ce.distanceToPoint(fe.point)<0))continue;let te=x.pick(fe.object,fe.point);if(te)return{passage:te,roomId:p};let ne=fe.object;for(;ne&&!ne.userData.roomId&&!ne.userData.awardId&&!ne.userData.contentId;)ne=ne.parent;if(ne?.userData.companionId)return{companionId:ne.userData.companionId,roomId:ne.userData.roomId};if(ne?.userData.petId)return{petId:ne.userData.petId,roomId:ne.userData.roomId};if(ne?.userData.contentId&&(!ne.userData.contentBounds||ne.userData.contentBounds.containsPoint(ne.worldToLocal(fe.point.clone()))))return{contentId:ne.userData.contentId,roomId:ne.userData.roomId};if(ne?.userData.awardId)return{awardId:ne.userData.awardId,roomId:"storage"};let pe=ne?.userData.roomId;if(Yo.has(pe))return{roomId:pe}}return null},Ne=function(){bt.dataset.loadedModels=String(zs.size),bt.dataset.loadedTextures=String(uc.size),bt.dataset.failedModels=String([...dn.values()].filter(U=>U.kind!=="texture").length),bt.dataset.failedTextures=String([...dn.values()].filter(U=>U.kind==="texture").length),bt.dataset.failedResources=String(dn.size);let R=zs.size+uc.size+Number(G?.snapshot().loaded??!1)+(g?.loadedCount||0);Vp.value=R/Gp*100;let I=hc.querySelector("[data-house-load-value]");I&&(I.textContent=`${Math.floor(Vp.value)}%`),dn.size?(clearTimeout(A),A=null,E=!1,Oh("\u5C65\u5386\u53EF\u4EE5\u7EE7\u7EED\u9605\u8BFB\u3002\u8BF7\u91CD\u8BD5\u4EE5\u4E0B\u8D44\u6E90\uFF0C\u5168\u90E8\u8F7D\u5165\u540E\u5373\u53EF\u8FDB\u5165\u623F\u95F4\u3002")):R===Gp&&!E&&A===null&&(A=setTimeout(()=>{A=null,!(dn.size||T)&&(E=!0,bt.dataset.houseState="ready",bt.setAttribute("aria-busy","false"),hc.hidden=!0,dc.hidden=!0,window.dispatchEvent(new CustomEvent("house:ready")))},Math.max(0,(Vr?0:700)-(performance.now()-cM))))},Ye=function(R){return new Promise(I=>{d.load(`${R.url}?v=${Rn.version}`,U=>{let F=U.scene;F.userData.assetId=R.id,R.room&&(F.userData.roomId=R.room,F.position.fromArray(R.position),F.rotation.y=R.rotation),F.traverse(J=>{if(!J.isMesh)return;let fe=J.parent;for(;fe&&fe!==F.parent;){for(let ne of["roomId","level","occluder","roomViewOnly","roofAccess"])J.userData[ne]===void 0&&fe.userData[ne]!==void 0&&(J.userData[ne]=fe.userData[ne]);if(fe===F)break;fe=fe.parent}J.castShadow=!0,J.receiveShadow=!0,R.room&&(J.userData.roomId=R.room),R.id==="structure"&&J.userData.roomId==="living"&&(J.userData.occluder||J.name==="living_L0_sand")&&(J.material=Array.isArray(J.material)?J.material.map(ne=>ne.clone()):J.material.clone(),(Array.isArray(J.material)?J.material:[J.material]).forEach(ne=>{ne.clipShadows=!0}));let q=Rn.interactions.find(ne=>ne.asset===R.id);q&&(J.userData.contentId=q.id,q.localBounds&&(J.userData.contentBounds=new Ot(new S(...q.localBounds[0]),new S(...q.localBounds[1])))),(Array.isArray(J.material)?J.material:[J.material]).forEach(ne=>{ne.roughness=Math.max(ne.roughness??.8,.7),ne.metalness=Math.min(ne.metalness??0,.08),ne.name==="window_glass"&&(ne.emissive=new tt(2908020),ne.emissiveIntensity=.16)})}),l.add(F),R.id==="chest"&&(k=wp(F,{root:bt,version:Rn.version,reducedMotion:Vr})),R.pet&&(R.pet.fur&&pp(F,{bodyScale:R.pet.bodyScale??1,limbRatio:R.pet.limbRatio??1,layers:i<600?6:8,strands:i<600?18e3:24e3}),O=fp(F,R,{root:bt,canvas:qt,camera:s,reducedMotion:Vr})),zs.set(R.id,F),dn.delete(R.id),ie(),Ne(),I(!0)},void 0,()=>{dn.set(R.id,R),Ne(),I(!1)})})},H=function(R){if(requestAnimationFrame(H),T||g?.visiting)return;if(b){let F=b.duration?Math.min((R-b.start)/b.duration,1):1,J=F*F*(3-2*F);s.position.lerpVectors(b.fromPosition,b.position,J),r.target.lerpVectors(b.fromTarget,b.target,J),F===1&&(b=null,r.enabled=!0,bt.dataset.cameraTransition="idle",window.dispatchEvent(new CustomEvent("house:camera-settled",{detail:{id:p}})))}r.update(),s.updateMatrixWorld();let I=D===null?0:Math.min((R-D)/1e3,1),U=D===null?0:Math.min((R-D)/1e3,.06);if(D=R,k?.update(U),O?.update(U,E&&!g?.visible&&!document.hidden&&(!p||p==="living")&&!document.querySelector("dialog[open]")),G?.update(I,E&&!g?.visible),g?.update(i,e),!p)for(let F of Rn.rooms){let J=new S(...F.label).project(s),fe=m.get(F.id);fe.hidden=J.z>1||Math.abs(J.x)>1||Math.abs(J.y)>1,fe.style.left=`${(J.x*.5+.5)*i}px`,fe.style.top=`${(-J.y*.5+.5)*e}px`}for(let F of Rn.interactions){let J=_.get(F.id),fe=new S(...F.anchor).project(s);J.hidden=!E||p!==F.room||fe.z>1||Math.abs(fe.x)>1||Math.abs(fe.y)>1,J.style.left=`${(fe.x*.5+.5)*i}px`,J.style.top=`${(-fe.y*.5+.5)*e}px`}x.update(),gn.render(n,s),C++,R-N>2e3&&(B=C*1e3/(R-N),qt.dataset.fps=B.toFixed(1),qt.dataset.triangles=String(gn.info.render.triangles),qt.dataset.drawCalls=String(gn.info.render.calls),C=0,N=R)},i=Math.max(1,bt.clientWidth),e=Math.max(1,bt.clientHeight);gn.setPixelRatio(Math.min(devicePixelRatio,1.6)),gn.setSize(i,e,!1),gn.outputColorSpace=Et,gn.toneMapping=Io,gn.toneMappingExposure=1.14,gn.shadowMap.enabled=!0,gn.shadowMap.type=Us,gn.localClippingEnabled=!0;let t={living:[new vn(new S(1,0,0),2.55)],storage:[new vn(new S(-1,0,0),-2.55)]},n=new oo,s=new nn(34,i/e,.1,260),r=new ic(s,qt);r.enableDamping=!0,r.dampingFactor=.08,r.enablePan=!1,r.minDistance=3.5,r.maxDistance=60,r.minPolarAngle=Math.PI*.26,r.maxPolarAngle=Math.PI*.56,r.minAzimuthAngle=-Math.PI*.3,r.maxAzimuthAngle=Math.PI*.3,n.add(new Eo(16315871,7771041,2.15));let o=new as(16773842,2.6);o.position.set(-8,17,13),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:15,bottom:-6,near:1,far:42}),o.shadow.bias=-5e-4,o.shadow.normalBias=.025,o.target.position.set(0,5,0),n.add(o,o.target);let a=new as(13757951,.8);a.position.set(7,8,8),n.add(a);let l=new gt;n.add(l);let c=new gt;l.add(c);let u=new Map,d=new Br,h=new Ns,f=new be,m=new Map,_=new Map,p=null,g=null,b=null,w=null,v=!1,E=!1,A=null,T=!1,x=Pp({root:bt,camera:s,rooms:Yo,getRoom:()=>p,focusRoom:re}),C=0,N=performance.now(),B=0,O=null,k=null;window.addEventListener("house:toy-chest",()=>k?.toggle());let D=null,G=Zp?Ep({root:bt,canvas:qt,camera:s,houseGroup:l,focusRoom:re,getRoom:()=>p,getAsset:R=>zs.get(R),getPet:()=>O,getDisplay:R=>c.children.find(I=>I.userData.contentId===R),getToyChest:()=>k,reducedMotion:Vr,onReady:Ne,onError:R=>{dn.set(R.id,R),Ne()}}):null;if(Kp&&(g=kp({root:bt,scene:n,loader:d,camera:s,canvas:qt,controls:r,reducedMotion:Vr,onTransition:()=>{b=null},onProgress:R=>{dn.delete("neighbor-"+R),Ne()},onFailure:R=>{dn.set(R.id,R),Ne()},onPineapple:()=>{l.visible=!0,n.background=null,r.maxDistance=60,r.minAzimuthAngle=-Math.PI*.3,r.maxAzimuthAngle=Math.PI*.3,ve()},onStreet:()=>{p=null,l.visible=!1,bt.dataset.houseView="street",qo.hidden=!0,Fh.hidden=!0,Uh.hidden=!0,n.background=new tt("#54c5d7"),r.maxDistance=170,r.minAzimuthAngle=-Math.PI*.24,r.maxAzimuthAngle=Math.PI*.24;let R=g.pose();W(R.position,R.target),window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:null}}))}}),l.visible=!1,qo.hidden=!0,n.background=new tt("#54c5d7"),r.maxDistance=170,r.minAzimuthAngle=-Math.PI*.24,r.maxAzimuthAngle=Math.PI*.24,Object.assign(o.shadow.camera,{left:-22,right:22,top:20,bottom:-15,far:70})),!Zo){Wo.forEach((R,I)=>{let U=new _t({color:16777215,roughness:.96});u.set(R.id,U);let F=Rn.displays.find(J=>J.kind==="award"&&J.id===R.id);$(`certificate-${R.id}`,...F.size,U,F.position,new S(...F.normal),{roomId:F.room,awardId:R.id})});for(let R of Rn.displays.filter(I=>I.kind==="content")){if(R.id==="work-journal"&&G){let U=Tp(),F=U.group;F.name="content-work-journal",Object.assign(F.userData,{roomId:R.room,contentId:R.id,diary:U}),F.position.fromArray(R.position),F.scale.setScalar(.62),F.position.x=-2.32,F.position.z-=.155*.62,F.quaternion.setFromUnitVectors(new S(0,0,1),new S(...R.normal)),F.rotateZ(-Math.PI/2),U.update(0,!0,0),c.add(F);continue}if(R.id==="skills-book"){c.add(up(R));continue}let I;if(R.sourceAward)I=u.get(R.sourceAward);else{let U=document.createElement("canvas");U.width=768,U.height=512;let F=U.getContext("2d"),J=R.id==="skills-chart";if(F.fillStyle=J?"#e5efe1":"#447a81",F.fillRect(0,0,768,512),F.strokeStyle=J?"#bca172":"#d4b86b",F.lineWidth=14,F.strokeRect(22,22,724,468),F.fillStyle=J?"#335d62":"#fff0be",F.textAlign="center",F.font="bold 68px sans-serif",F.fillText(J?"\u6280\u672F\u822A\u6D77\u56FE":"\u5B9E\u4E60\u65E5\u8BB0",384,126),J){for(let[q,te]of["AI / Agent","\u5168\u6808\u5F00\u53D1","\u5DE5\u7A0B\u4EA4\u4ED8"].entries()){let ne=154+q*230;F.strokeStyle="#6e9990",F.lineWidth=5,F.beginPath(),F.arc(ne,284,66,0,Math.PI*2),F.stroke(),F.font="25px sans-serif",F.fillText(te,ne,294),q<2&&(F.font="35px sans-serif",F.fillText("\u2192",ne+114,294))}F.font="27px sans-serif",F.fillText("\u628A\u6280\u672F\u5E26\u8FDB\u771F\u5B9E\u4E1A\u52A1",384,416)}else F.font="40px sans-serif",F.fillText("\u5B57\u8282\u8DF3\u52A8",384,244),F.font="30px sans-serif",F.fillText("AI \u76F4\u64AD \xB7 Agent \u5DE5\u7A0B",384,330),F.font="26px sans-serif",F.fillText("2026.06 \u2014 2026.09",384,413);let fe=new pn(U);fe.colorSpace=Et,I=new _t({map:fe,roughness:.96})}$(`content-${R.id}`,...R.size,I,R.position,new S(...R.normal),{roomId:R.room,contentId:R.id,book:R.style==="book"})}bt.dataset.awardDisplays=String(Wo.length),bt.dataset.projectDisplays="0"}for(let[R,I,U,F]of[[-9,8,1.5,9225166],[8,11,2,10012620],[-7,1,1,10734800],[8,3,1.2,10208206]]){let J=[];for(let fe=0;fe<=160;fe++){let q=fe*Math.PI*2/160,te=U*(.73+.27*Math.cos(q*5));J.push(new S(R+Math.cos(q)*te,I+Math.sin(q)*te,-6))}n.add(new yi(new wt().setFromPoints(J),new ai({color:F,transparent:!0,opacity:.38})))}for(let R of Rn.rooms){let I=document.createElement("button");I.type="button",I.className="room-label",I.textContent=R.name,I.dataset.houseRoom=R.id,I.setAttribute("aria-label",`${R.floor} ${R.name}\uFF0C\u8FDB\u5165\u8FD1\u666F`),I.addEventListener("click",()=>{re(R.id)&&document.querySelector("[data-house-back]").focus({preventScroll:!0})}),qo.append(I),m.set(R.id,I)}for(let R of Rn.interactions){let I=document.createElement("button");I.type="button",I.className="room-label object-label",I.textContent=R.button,I.dataset.houseObject=R.id,I.setAttribute("aria-label",`\u70B9\u51FB${R.label}`),I.addEventListener("click",()=>{E&&p===R.room&&zp(R.id)}),Fh.append(I),_.set(R.id,I)}document.querySelector("[data-house-back]").addEventListener("click",()=>{let R=p;ve(),m.get(R)?.focus({preventScroll:!0})}),window.addEventListener("keydown",R=>{if(R.key==="Escape"&&!R.defaultPrevented&&!document.querySelector("dialog[open]")&&p){let I=p;ve(),m.get(I)?.focus({preventScroll:!0})}}),r.addEventListener("start",()=>{b=null,bt.dataset.cameraTransition="idle",v=!0,Ai.hidden=!0}),r.addEventListener("end",()=>{v=!1}),r.addEventListener("change",()=>{qt.dataset.camera=JSON.stringify(s.position.toArray().map(R=>Number(R.toFixed(3)))),qt.dataset.target=JSON.stringify(r.target.toArray().map(R=>Number(R.toFixed(3))))}),qt.addEventListener("pointerdown",R=>{if(!R.isPrimary){w=null;return}w={x:R.clientX,y:R.clientY,time:performance.now(),id:R.pointerId}}),qt.addEventListener("pointercancel",()=>{w=null}),qt.addEventListener("pointerup",R=>{let I=w;if(w=null,!I||I.id!==R.pointerId||Math.hypot(R.clientX-I.x,R.clientY-I.y)>7||performance.now()-I.time>650||!E)return;if(g?.visible){let F=qt.getBoundingClientRect();f.set((R.clientX-F.left)/F.width*2-1,-(R.clientY-F.top)/F.height*2+1),h.setFromCamera(f,s);let J=g.pick(h);J&&g.choose(J);return}let U=Me(R.clientX,R.clientY);if(!p){U&&(re(U.roomId),U.companionId&&G?.react(),U.petId&&O?.react());return}!U||U.roomId!==p||(U.passage?bt.dataset.cameraTransition!=="moving"&&re(U.passage.to):U.companionId?G?.react():U.petId?(O?.react(),window.dispatchEvent(new CustomEvent("house:pet-greet"))):U.contentId?zp(U.contentId):U?.awardId&&window.dispatchEvent(new CustomEvent("house:award",{detail:{id:U.awardId}})))}),qt.addEventListener("pointermove",R=>{if(R.pointerType!=="mouse"||v||!E){Ai.hidden=!0;return}if(g?.visible){let F=qt.getBoundingClientRect();f.set((R.clientX-F.left)/F.width*2-1,-(R.clientY-F.top)/F.height*2+1),h.setFromCamera(f,s),qt.style.cursor=g.pick(h)?"pointer":"grab",Ai.hidden=!0;return}let I=Me(R.clientX,R.clientY),U=I&&(!p||I.roomId===p&&(I.passage||I.companionId||I.petId||I.awardId||I.contentId));if(qt.style.cursor=U?"pointer":"grab",Ai.hidden=!U,U){Ai.textContent=I.passage?x.label(I.passage):I.companionId?"\u6D77\u7EF5\u5B9D\u5B9D \xB7 \u70B9\u51FB\u804A\u804A\u5929":p?I.petId?"\u66B9\u7F57\u732B \xB7 \u6253\u4E2A\u62DB\u547C":I.contentId?Wp.get(I.contentId).label:Wo.find(J=>J.id===I.awardId)?.title??"":Yo.get(I.roomId).name;let F=qt.getBoundingClientRect();Ai.style.left=`${Math.min(R.clientX-F.left+14,i-120)}px`,Ai.style.top=`${Math.min(R.clientY-F.top+14,e-40)}px`}}),qt.addEventListener("pointerleave",()=>{Ai.hidden=!0}),document.querySelector("[data-house-retry]").addEventListener("click",async()=>{if(T||[...dn.values()].some(I=>I.kind==="companion")){location.reload();return}dc.hidden=!0,hc.hidden=!1,bt.dataset.houseState="loading",bt.setAttribute("aria-busy","true");let R=[...dn.values()];dn.clear(),await Promise.all(R.map(I=>I.kind==="texture"?K(I):I.kind==="neighbor"?g.retry(I.neighbor):Ye(I))),Ne()}),qt.addEventListener("webglcontextlost",R=>{R.preventDefault(),T=!0,E=!1,Oh("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u9884\u89C8\u3002")}),new ResizeObserver(()=>{if(g?.transitioning&&g.show(),i=Math.max(1,bt.clientWidth),e=Math.max(1,bt.clientHeight),s.aspect=i/e,s.updateProjectionMatrix(),gn.setPixelRatio(Math.min(devicePixelRatio,1.6)),gn.setSize(i,e,!1),p)E&&re(p);else{let R=g?.visible?g.pose():oe();W(R.position,R.target)}}).observe(bt);let _e=g?.visible?g.pose():oe();s.position.copy(_e.position),r.target.copy(_e.target),r.update(),bt.dataset.houseView=g?"street":"whole",bt.dataset.cameraTransition="idle",Zo&&(document.querySelector(".review-note").textContent="\u7ED3\u6784\u5BA1\u67E5 \xB7 \u5BB6\u5177\u5C1A\u672A\u8F7D\u5165"),requestAnimationFrame(H),window.__pineappleHouse={focusRoom:re,resetView:ve,scene:n,camera:s,controls:r,config:Rn,companion:G,toyChest:()=>k?.snapshot(),snapshot:()=>({state:bt.dataset.houseState,view:bt.dataset.houseView,loaded:[...zs.keys()],failed:[...dn.keys()],fps:Number(B.toFixed(1)),renderer:gn.info.render,camera:s.position.toArray(),target:r.target.toArray(),pet:O?.snapshot()??null,toyChest:k?.snapshot()??null,status:"review",structureOnly:Zo}),projectRoom:R=>{let I=Yo.get(R);if(!I)return null;let U=new S(...I.label).project(s),F=qt.getBoundingClientRect();return{x:F.left+(U.x*.5+.5)*i,y:F.top+(-.5*U.y+.5)*e}}},Promise.all([...qp.map(Ye),...Yp.map(K),...g?[g.loadAll()]:[]]).then(Ne)}})();
