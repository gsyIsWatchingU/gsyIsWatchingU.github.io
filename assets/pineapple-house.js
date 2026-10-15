(()=>{/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var as={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ls={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rd=0,Qc=1,Cd=2;var Us=1,Pd=2,Rr=3,jn=0,Tn=1,kt=2,Si=0,Cr=1,eu=2,tu=3,nu=4,Id=5;var Fs=100,Ld=101,Dd=102,Nd=103,Ud=104,Fd=200,Od=201,Bd=202,Hd=203,iu=204,su=205,kd=206,Vd=207,zd=208,Gd=209,Wd=210,Xd=211,qd=212,Yd=213,Zd=214,Ta=0,wa=1,Aa=2,ar=3,Ra=4,Ca=5,Pa=6,Ia=7,ru=0,Kd=1,jd=2,ai=0,ou=1,au=2,lu=3,Io=4,cu=5,uu=6,hu=7,Hc="attached",$d="detached",du=300,cs=301,Os=302,il=303,sl=304,Lo=306,gi=1e3,Yn=1001,lr=1002,Kt=1003,rl=1004;var Bs=1005;var jt=1006,Pr=1007;var li=1008;var Nn=1009,fu=1010,pu=1011,Ir=1012,ol=1013,ci=1014,zn=1015,ui=1016,al=1017,ll=1018,Lr=1020,mu=35902,gu=35899,_u=1021,xu=1022,Gn=1023,_i=1026,us=1027,cl=1028,ul=1029,hs=1030,hl=1031;var dl=1033,Do=33776,No=33777,Uo=33778,Fo=33779,fl=35840,pl=35841,ml=35842,gl=35843,_l=36196,xl=37492,yl=37496,vl=37488,Ml=37489,Oo=37490,bl=37491,Sl=37808,El=37809,Tl=37810,wl=37811,Al=37812,Rl=37813,Cl=37814,Pl=37815,Il=37816,Ll=37817,Dl=37818,Nl=37819,Ul=37820,Fl=37821,Ol=36492,Bl=36494,Hl=36495,kl=36283,Vl=36284,Bo=36285,zl=36286,Jd=2200,Qd=2201,ef=2202,Ss=2300,Es=2301,ba=2302,kc=2303,vs=2400,Ms=2401,no=2402,Gl=2500,tf=2501,yu=0,Ho=1,Dr=2,nf=3200;var Wl=0,sf=1,Gi="",St="srgb",En="srgb-linear",io="linear",Ct="srgb";var Sa=7680;var rf=519,of=512,af=513,lf=514,Xl=515,cf=516,uf=517,ql=518,hf=519,vu=35044;var Mu="300 es",ii=2e3,cr=2001;function qp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Yp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function df(){let i=ur("canvas");return i.style.display="block",i}var Oh={},hr=null;function so(...i){let e="THREE."+i.shift();hr?hr("log",e,...i):console.log(e,...i)}function ff(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ze(...i){i=ff(i);let e="THREE."+i.shift();if(hr)hr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function tt(...i){i=ff(i);let e="THREE."+i.shift();if(hr)hr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function bs(...i){let e=i.join(" ");e in Oh||(Oh[e]=!0,Ze(...i))}function pf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var mf={[Ta]:wa,[Aa]:Pa,[Ra]:Ia,[ar]:Ca,[wa]:Ta,[Pa]:Aa,[Ia]:Ra,[Ca]:ar},Kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bh=1234567,Jr=Math.PI/180,Ts=180/Math.PI;function Zn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]).toLowerCase()}function ft(i,e,t){return Math.max(e,Math.min(t,i))}function bu(i,e){return(i%e+e)%e}function Zp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Kp(i,e,t){return i!==e?(t-i)/(e-i):0}function Qr(i,e,t){return(1-t)*i+t*e}function jp(i,e,t,n){return Qr(i,e,1-Math.exp(-t*n))}function $p(i,e=1){return e-Math.abs(bu(i,e*2)-e)}function Jp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Qp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function em(i,e){return i+Math.floor(Math.random()*(e-i+1))}function tm(i,e){return i+Math.random()*(e-i)}function nm(i){return i*(.5-Math.random())}function im(i){i!==void 0&&(Bh=i);let e=Bh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sm(i){return i*Jr}function rm(i){return i*Ts}function om(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function am(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function lm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cm(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),h=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*d,l*h,a*c);break;case"YZY":i.set(l*h,a*u,l*d,a*c);break;case"ZXZ":i.set(l*d,l*h,a*u,a*c);break;case"XZX":i.set(a*u,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*u,a*c);break;default:Ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ye={DEG2RAD:Jr,RAD2DEG:Ts,generateUUID:Zn,clamp:ft,euclideanModulo:bu,mapLinear:Zp,inverseLerp:Kp,lerp:Qr,damp:jp,pingpong:$p,smoothstep:Jp,smootherstep:Qp,randInt:em,randFloat:tm,randFloatSpread:nm,seededRandom:im,degToRad:sm,radToDeg:rm,isPowerOfTwo:om,ceilPowerOfTwo:am,floorPowerOfTwo:lm,setQuaternionFromProperEuler:cm,normalize:Pt,denormalize:ni},Ru=class Ru{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ru.prototype.isVector2=!0;var Me=Ru,Pe=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],h=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(d!==_||l!==h||c!==f||u!==m){let p=l*h+c*f+u*m+d*_;p<0&&(h=-h,f=-f,m=-m,_=-_,p=-p);let g=1-a;if(p<.9995){let b=Math.acos(p),A=Math.sin(b);g=Math.sin(g*b)/A,a=Math.sin(a*b)/A,l=l*g+h*a,c=c*g+f*a,u=u*g+m*a,d=d*g+_*a}else{l=l*g+h*a,c=c*g+f*a,u=u*g+m*a,d=d*g+_*a;let b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[o],h=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+u*d+l*f-c*h,e[t+1]=l*m+u*h+c*d-a*f,e[t+2]=c*m+u*f+a*h-l*d,e[t+3]=u*m-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),d=a(r/2),h=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Cu=class Cu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dc.copy(this).projectOnVector(e),this.sub(dc)}reflect(e){return this.sub(dc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Cu.prototype.isVector3=!0;var S=Cu,dc=new S,Hh=new Pe,Pu=class Pu{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],_=s[0],p=s[3],g=s[6],b=s[1],A=s[4],v=s[7],E=s[2],R=s[5],T=s[8];return r[0]=o*_+a*b+l*E,r[3]=o*p+a*A+l*R,r[6]=o*g+a*v+l*T,r[1]=c*_+u*b+d*E,r[4]=c*p+u*A+d*R,r[7]=c*g+u*v+d*T,r[2]=h*_+f*b+m*E,r[5]=h*p+f*A+m*R,r[8]=h*g+f*v+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*r,f=c*r-o*l,m=t*d+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=d*_,e[1]=(s*c-u*n)*_,e[2]=(a*n-s*o)*_,e[3]=h*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return bs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fc.makeScale(e,t)),this}rotate(e){return bs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fc.makeRotation(-e)),this}translate(e,t){return bs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Pu.prototype.isMatrix3=!0;var at=Pu,fc=new at,kh=new at().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vh=new at().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function um(){let i={enabled:!0,workingColorSpace:En,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ct&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ct&&(s.r=or(s.r),s.g=or(s.g),s.b=or(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Gi?io:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return bs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return bs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[En]:{primaries:e,whitePoint:n,transfer:io,toXYZ:kh,fromXYZ:Vh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:e,whitePoint:n,transfer:Ct,toXYZ:kh,fromXYZ:Vh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:St}}}),i}var _t=um();function Ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function or(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var qs,La=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qs===void 0&&(qs=ur("canvas")),qs.width=e.width,qs.height=e.height;let s=qs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=qs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ur("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ni(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ni(t[n]/255)*255):t[n]=Ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},hm=0,dr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(pc(s[o].image)):r.push(pc(s[o]))}else r=pc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function pc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?La.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}var dm=0,mc=new S,rn=class i extends Kn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Yn,s=Yn,r=jt,o=li,a=Gn,l=Nn,c=i.DEFAULT_ANISOTROPY,u=Gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=Zn(),this.name="",this.source=new dr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(mc).x}get height(){return this.source.getSize(mc).y}get depth(){return this.source.getSize(mc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gi:e.x=e.x-Math.floor(e.x);break;case Yn:e.x=e.x<0?0:1;break;case lr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gi:e.y=e.y-Math.floor(e.y);break;case Yn:e.y=e.y<0?0:1;break;case lr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=du;rn.DEFAULT_ANISOTROPY=1;var Iu=class Iu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,v=(f+1)/2,E=(g+1)/2,R=(u+h)/4,T=(d+_)/4,x=(m+p)/4;return A>v&&A>E?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=R/n,r=T/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=R/s,r=x/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=T/r,s=x/r),this.set(n,s,r,t),this}let b=Math.sqrt((p-m)*(p-m)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(p-m)/b,this.y=(d-_)/b,this.z=(h-u)/b,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Iu.prototype.isVector4=!0;var It=Iu,Da=class extends Kn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new rn(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new dr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cn=class extends Da{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ro=class extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Na=class extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var nl=class nl{constructor(e,t,n,s,r,o,a,l,c,u,d,h,f,m,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,d,h,f,m,_,p)}set(e,t,n,s,r,o,a,l,c,u,d,h,f,m,_,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=u,g[10]=d,g[14]=h,g[3]=f,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Ys.setFromMatrixColumn(e,0).length(),r=1/Ys.setFromMatrixColumn(e,1).length(),o=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=o*u,f=o*d,m=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,m=c*u,_=c*d;t[0]=h+_*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-m,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,m=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let h=o*u,f=o*d,m=a*u,_=a*d;t[0]=l*u,t[4]=m*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let h=o*l,f=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=m*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+m,t[10]=h-_*d}else if(e.order==="XZY"){let h=o*l,f=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fm,e,pm)}lookAt(e,t,n){let s=this.elements;return On.subVectors(e,t),On.lengthSq()===0&&(On.z=1),On.normalize(),Ki.crossVectors(n,On),Ki.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),Ki.crossVectors(n,On)),Ki.normalize(),Ko.crossVectors(On,Ki),s[0]=Ki.x,s[4]=Ko.x,s[8]=On.x,s[1]=Ki.y,s[5]=Ko.y,s[9]=On.y,s[2]=Ki.z,s[6]=Ko.z,s[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],_=n[6],p=n[10],g=n[14],b=n[3],A=n[7],v=n[11],E=n[15],R=s[0],T=s[4],x=s[8],C=s[12],N=s[1],H=s[5],B=s[9],k=s[13],D=s[2],W=s[6],J=s[10],j=s[14],ae=s[3],X=s[7],re=s[11],ie=s[15];return r[0]=o*R+a*N+l*D+c*ae,r[4]=o*T+a*H+l*W+c*X,r[8]=o*x+a*B+l*J+c*re,r[12]=o*C+a*k+l*j+c*ie,r[1]=u*R+d*N+h*D+f*ae,r[5]=u*T+d*H+h*W+f*X,r[9]=u*x+d*B+h*J+f*re,r[13]=u*C+d*k+h*j+f*ie,r[2]=m*R+_*N+p*D+g*ae,r[6]=m*T+_*H+p*W+g*X,r[10]=m*x+_*B+p*J+g*re,r[14]=m*C+_*k+p*j+g*ie,r[3]=b*R+A*N+v*D+E*ae,r[7]=b*T+A*H+v*W+E*X,r[11]=b*x+A*B+v*J+E*re,r[15]=b*C+A*k+v*j+E*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],_=e[7],p=e[11],g=e[15],b=l*f-c*h,A=a*f-c*d,v=a*h-l*d,E=o*f-c*u,R=o*h-l*u,T=o*d-a*u;return t*(_*b-p*A+g*v)-n*(m*b-p*E+g*R)+s*(m*A-_*E+g*T)-r*(m*v-_*R+p*T)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-n*(r*u-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],_=e[13],p=e[14],g=e[15],b=t*a-n*o,A=t*l-s*o,v=t*c-r*o,E=n*l-s*a,R=n*c-r*a,T=s*c-r*l,x=u*_-d*m,C=u*p-h*m,N=u*g-f*m,H=d*p-h*_,B=d*g-f*_,k=h*g-f*p,D=b*k-A*B+v*H+E*N-R*C+T*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let W=1/D;return e[0]=(a*k-l*B+c*H)*W,e[1]=(s*B-n*k-r*H)*W,e[2]=(_*T-p*R+g*E)*W,e[3]=(h*R-d*T-f*E)*W,e[4]=(l*N-o*k-c*C)*W,e[5]=(t*k-s*N+r*C)*W,e[6]=(p*v-m*T-g*A)*W,e[7]=(u*T-h*v+f*A)*W,e[8]=(o*B-a*N+c*x)*W,e[9]=(n*N-t*B-r*x)*W,e[10]=(m*R-_*v+g*b)*W,e[11]=(d*v-u*R-f*b)*W,e[12]=(a*C-o*H-l*x)*W,e[13]=(t*H-n*C+s*x)*W,e[14]=(_*A-m*E-p*b)*W,e[15]=(u*E-d*A+h*b)*W,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,h=r*c,f=r*u,m=r*d,_=o*u,p=o*d,g=a*d,b=l*c,A=l*u,v=l*d,E=n.x,R=n.y,T=n.z;return s[0]=(1-(_+g))*E,s[1]=(f+v)*E,s[2]=(m-A)*E,s[3]=0,s[4]=(f-v)*R,s[5]=(1-(h+g))*R,s[6]=(p+b)*R,s[7]=0,s[8]=(m+A)*T,s[9]=(p-b)*T,s[10]=(1-(h+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Ys.set(s[0],s[1],s[2]).length(),a=Ys.set(s[4],s[5],s[6]).length(),l=Ys.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Qn.copy(this);let c=1/o,u=1/a,d=1/l;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=u,Qn.elements[5]*=u,Qn.elements[6]*=u,Qn.elements[8]*=d,Qn.elements[9]*=d,Qn.elements[10]*=d,t.setFromRotationMatrix(Qn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=ii,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),m,_;if(l)m=r/(o-r),_=o*r/(o-r);else if(a===ii)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===cr)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ii,l=!1){let c=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s),m,_;if(l)m=1/(o-r),_=o/(o-r);else if(a===ii)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===cr)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};nl.prototype.isMatrix4=!0;var ut=nl,Ys=new S,Qn=new ut,fm=new S(0,0,0),pm=new S(1,1,1),Ki=new S,Ko=new S,On=new S,zh=new ut,Gh=new Pe,Pn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gh.setFromEuler(this),this.setFromQuaternion(Gh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pn.DEFAULT_ORDER="XYZ";var fr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mm=0,Wh=new S,Zs=new Pe,Ri=new ut,jo=new S,Gr=new S,gm=new S,_m=new Pe,Xh=new S(1,0,0),qh=new S(0,1,0),Yh=new S(0,0,1),Zh={type:"added"},xm={type:"removed"},Ks={type:"childadded",child:null},gc={type:"childremoved",child:null},zt=class i extends Kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new S,t=new Pn,n=new Pe,s=new S(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new at}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.premultiply(Zs),this}rotateX(e){return this.rotateOnAxis(Xh,e)}rotateY(e){return this.rotateOnAxis(qh,e)}rotateZ(e){return this.rotateOnAxis(Yh,e)}translateOnAxis(e,t){return Wh.copy(e).applyQuaternion(this.quaternion),this.position.add(Wh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xh,e)}translateY(e){return this.translateOnAxis(qh,e)}translateZ(e){return this.translateOnAxis(Yh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jo.copy(e):jo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Gr,jo,this.up):Ri.lookAt(jo,Gr,this.up),this.quaternion.setFromRotationMatrix(Ri),s&&(Ri.extractRotation(s.matrixWorld),Zs.setFromRotationMatrix(Ri),this.quaternion.premultiply(Zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(tt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zh),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null):tt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xm),gc.child=e,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zh),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,e,gm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,_m,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};zt.DEFAULT_UP=new S(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pt=class extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},ym={type:"move"},pr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let p=t.getJointPose(_,n),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ym)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new pt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},gf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},$o={h:0,s:0,l:0};function _c(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=_t.workingColorSpace){if(e=bu(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=_c(o,r,e+1/3),this.g=_c(o,r,e),this.b=_c(o,r,e-1/3)}return _t.colorSpaceToWorking(this,s),this}setStyle(e,t=St){function n(r){r!==void 0&&parseFloat(r)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){let n=gf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return _t.workingToColorSpace(yn.copy(this),e),Math.round(ft(yn.r*255,0,255))*65536+Math.round(ft(yn.g*255,0,255))*256+Math.round(ft(yn.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(yn.copy(this),t);let n=yn.r,s=yn.g,r=yn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=St){_t.workingToColorSpace(yn.copy(this),e);let t=yn.r,n=yn.g,s=yn.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL($o);let n=Qr(ji.h,$o.h,t),s=Qr(ji.s,$o.s,t),r=Qr(ji.l,$o.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new Qe;Qe.NAMES=gf;var oo=class extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ei=new S,Ci=new S,xc=new S,Pi=new S,js=new S,$s=new S,Kh=new S,yc=new S,vc=new S,Mc=new S,bc=new It,Sc=new It,Ec=new It,ts=class i{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ei.subVectors(e,t),s.cross(ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ei.subVectors(s,t),Ci.subVectors(n,t),xc.subVectors(e,t);let o=ei.dot(ei),a=ei.dot(Ci),l=ei.dot(xc),c=Ci.dot(Ci),u=Ci.dot(xc),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-a*u)*h,m=(o*u-a*l)*h;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pi.x),l.addScaledVector(o,Pi.y),l.addScaledVector(a,Pi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return bc.setScalar(0),Sc.setScalar(0),Ec.setScalar(0),bc.fromBufferAttribute(e,t),Sc.fromBufferAttribute(e,n),Ec.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(bc,r.x),o.addScaledVector(Sc,r.y),o.addScaledVector(Ec,r.z),o}static isFrontFacing(e,t,n,s){return ei.subVectors(n,t),Ci.subVectors(e,t),ei.cross(Ci).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ei.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;js.subVectors(s,n),$s.subVectors(r,n),yc.subVectors(e,n);let l=js.dot(yc),c=$s.dot(yc);if(l<=0&&c<=0)return t.copy(n);vc.subVectors(e,s);let u=js.dot(vc),d=$s.dot(vc);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(js,o);Mc.subVectors(e,r);let f=js.dot(Mc),m=$s.dot(Mc);if(m>=0&&f<=m)return t.copy(r);let _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector($s,a);let p=u*m-f*d;if(p<=0&&d-u>=0&&f-m>=0)return Kh.subVectors(r,s),a=(d-u)/(d-u+(f-m)),t.copy(s).addScaledVector(Kh,a);let g=1/(p+_+h);return o=_*g,a=h*g,t.copy(n).addScaledVector(js,o).addScaledVector($s,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ot=class{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ti):ti.fromBufferAttribute(r,o),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jo.copy(n.boundingBox)),Jo.applyMatrix4(e.matrixWorld),this.union(Jo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wr),Qo.subVectors(this.max,Wr),Js.subVectors(e.a,Wr),Qs.subVectors(e.b,Wr),er.subVectors(e.c,Wr),$i.subVectors(Qs,Js),Ji.subVectors(er,Qs),gs.subVectors(Js,er);let t=[0,-$i.z,$i.y,0,-Ji.z,Ji.y,0,-gs.z,gs.y,$i.z,0,-$i.x,Ji.z,0,-Ji.x,gs.z,0,-gs.x,-$i.y,$i.x,0,-Ji.y,Ji.x,0,-gs.y,gs.x,0];return!Tc(t,Js,Qs,er,Qo)||(t=[1,0,0,0,1,0,0,0,1],!Tc(t,Js,Qs,er,Qo))?!1:(ea.crossVectors($i,Ji),t=[ea.x,ea.y,ea.z],Tc(t,Js,Qs,er,Qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ii=[new S,new S,new S,new S,new S,new S,new S,new S],ti=new S,Jo=new Ot,Js=new S,Qs=new S,er=new S,$i=new S,Ji=new S,gs=new S,Wr=new S,Qo=new S,ea=new S,_s=new S;function Tc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){_s.fromArray(i,r);let a=s.x*Math.abs(_s.x)+s.y*Math.abs(_s.y)+s.z*Math.abs(_s.z),l=e.dot(_s),c=t.dot(_s),u=n.dot(_s);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var nn=new S,ta=new Me,vm=0,Zt=class extends Kn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vu,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix3(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ws=class extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ao=class extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ht=class extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Mm=new Ot,Xr=new S,wc=new S,In=class{constructor(e=new S,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Mm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xr.subVectors(e,this.center);let t=Xr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Xr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xr.copy(e.center).add(wc)),this.expandByPoint(Xr.copy(e.center).sub(wc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},bm=0,qn=new ut,Ac=new zt,tr=new S,Bn=new Ot,qr=new Ot,cn=new S,At=class i extends Kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qp(e)?ao:ws)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new at().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,n){return qn.makeTranslation(e,t,n),this.applyMatrix4(qn),this}scale(e,t,n){return qn.makeScale(e,t,n),this.applyMatrix4(qn),this}lookAt(e){return Ac.lookAt(e),Ac.updateMatrix(),this.applyMatrix4(Ac.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ht(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ot);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){tt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&tt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){tt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(e){let n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];qr.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Bn.min,qr.min),Bn.expandByPoint(cn),cn.addVectors(Bn.max,qr.max),Bn.expandByPoint(cn)):(Bn.expandByPoint(qr.min),Bn.expandByPoint(qr.max))}Bn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)cn.fromBufferAttribute(a,c),l&&(tr.fromBufferAttribute(e,c),cn.add(tr)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&tt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){tt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let x=0;x<n.count;x++)a[x]=new S,l[x]=new S;let c=new S,u=new S,d=new S,h=new Me,f=new Me,m=new Me,_=new S,p=new S;function g(x,C,N){c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,C),d.fromBufferAttribute(n,N),h.fromBufferAttribute(r,x),f.fromBufferAttribute(r,C),m.fromBufferAttribute(r,N),u.sub(c),d.sub(c),f.sub(h),m.sub(h);let H=1/(f.x*m.y-m.x*f.y);isFinite(H)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(H),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(H),a[x].add(_),a[C].add(_),a[N].add(_),l[x].add(p),l[C].add(p),l[N].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,C=b.length;x<C;++x){let N=b[x],H=N.start,B=N.count;for(let k=H,D=H+B;k<D;k+=3)g(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let A=new S,v=new S,E=new S,R=new S;function T(x){E.fromBufferAttribute(s,x),R.copy(E);let C=a[x];A.copy(C),A.sub(E.multiplyScalar(E.dot(C))).normalize(),v.crossVectors(R,C);let H=v.dot(l[x])<0?-1:1;o.setXYZW(x,A.x,A.y,A.z,H)}for(let x=0,C=b.length;x<C;++x){let N=b[x],H=N.start,B=N.count;for(let k=H,D=H+B;k<D;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new S,r=new S,o=new S,a=new S,l=new S,c=new S,u=new S,d=new S;if(e)for(let h=0,f=e.count;h<f;h+=3){let m=e.getX(h+0),_=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u),f=0,m=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let g=0;g<u;g++)h[m++]=c[f++]}return new Zt(h,u,d)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},mr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=vu,this.updateRanges=[],this.version=0,this.uuid=Zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Sn=new S,gr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix4(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyNormalMatrix(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.transformDirection(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){so("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){so("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Rc=new S,Sm=new S,Em=new at,vn=class{constructor(e=new S(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Rc.subVectors(n,t).cross(Sm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Rc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Em.getNormalMatrix(e),s=this.coplanarPoint(Rc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Tm=0,Ln=class extends Kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Zn(),this.name="",this.type="Material",this.blending=Cr,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=iu,this.blendDst=su,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sa,this.stencilZFail=Sa,this.stencilZPass=Sa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new vn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Li=new S,Cc=new S,na=new S,ia=new S,xi=class{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,t),Li.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Cc.copy(e).add(t).multiplyScalar(.5),na.copy(t).sub(e).normalize(),ia.copy(this.origin).sub(Cc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(na),a=ia.dot(this.direction),l=-ia.dot(na),c=ia.lengthSq(),u=Math.abs(1-o*o),d,h,f,m;if(u>0)if(d=o*l-a,h=o*a-l,m=r*u,d>=0)if(h>=-m)if(h<=m){let _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Cc).addScaledVector(na,h),f}intersectSphere(e,t){if(e.radius<0)return null;Li.subVectors(e.center,this.origin);let n=Li.dot(this.direction),s=Li.dot(Li)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,u=a.z,d=e.x-o.x,h=e.y-o.y,f=e.z-o.z,m=t.x-o.x,_=t.y-o.y,p=t.z-o.z,g=n.x-o.x,b=n.y-o.y,A=n.z-o.z,v=Math.abs(l),E=Math.abs(c),R=Math.abs(u),T,x,C,N,H,B,k,D,W,J,j,ae;if(v>=E&&v>=R?(C=l,B=d,W=m,ae=g,l>=0?(T=c,x=u,N=h,H=f,k=_,D=p,J=b,j=A):(T=u,x=c,N=f,H=h,k=p,D=_,J=A,j=b)):E>=R?(C=c,B=h,W=_,ae=b,c>=0?(T=u,x=l,N=f,H=d,k=p,D=m,J=A,j=g):(T=l,x=u,N=d,H=f,k=m,D=p,J=g,j=A)):(C=u,B=f,W=p,ae=A,u>=0?(T=l,x=c,N=d,H=h,k=m,D=_,J=g,j=b):(T=c,x=l,N=h,H=d,k=_,D=m,J=b,j=g)),C===0)return null;let X=T/C,re=x/C,ie=1/C,ye=N-X*B,xe=H-re*B,Ie=k-X*W,Xe=D-re*W,et=J-X*ae,O=j-re*ae,w=et*Xe-O*Ie,I=ye*O-xe*et,F=Ie*xe-Xe*ye;if(s){if(w<0||I<0||F<0)return null}else if((w<0||I<0||F<0)&&(w>0||I>0||F>0))return null;let U=w+I+F;if(U===0)return null;let ee=ie*(w*B+I*W+F*ae);return(U>0?ee<0:ee>0)?null:this.at(ee/U,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},si=class extends Ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=ru,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},jh=new ut,xs=new xi,sa=new In,$h=new S,ra=new S,oa=new S,aa=new S,Pc=new S,la=new S,Jh=new S,ca=new S,$e=class extends zt{constructor(e=new At,t=new si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){la.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],d=r[l];u!==0&&(Pc.fromBufferAttribute(d,e),o?la.addScaledVector(Pc,u):la.addScaledVector(Pc.sub(t),u))}t.add(la)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(r),xs.copy(e.ray).recast(e.near),!(sa.containsPoint(xs.origin)===!1&&(xs.intersectSphere(sa,$h)===null||xs.origin.distanceToSquared($h)>(e.far-e.near)**2))&&(jh.copy(r).invert(),xs.copy(e.ray).applyMatrix4(jh),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xs)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){let p=h[m],g=o[p.materialIndex],b=Math.max(p.start,f.start),A=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,E=A;v<E;v+=3){let R=a.getX(v),T=a.getX(v+1),x=a.getX(v+2);s=ua(this,g,e,n,c,u,d,R,T,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let b=a.getX(p),A=a.getX(p+1),v=a.getX(p+2);s=ua(this,o,e,n,c,u,d,b,A,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){let p=h[m],g=o[p.materialIndex],b=Math.max(p.start,f.start),A=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,E=A;v<E;v+=3){let R=v,T=v+1,x=v+2;s=ua(this,g,e,n,c,u,d,R,T,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=m,g=_;p<g;p+=3){let b=p,A=p+1,v=p+2;s=ua(this,o,e,n,c,u,d,b,A,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function wm(i,e,t,n,s,r,o,a){let l;if(e.side===Tn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===jn,a),l===null)return null;ca.copy(a),ca.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ca);return c<t.near||c>t.far?null:{distance:c,point:ca.clone(),object:i}}function ua(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,ra),i.getVertexPosition(l,oa),i.getVertexPosition(c,aa);let u=wm(i,e,t,n,ra,oa,aa,Jh);if(u){let d=new S;ts.getBarycoord(Jh,ra,oa,aa,d),s&&(u.uv=ts.getInterpolatedAttribute(s,a,l,c,d,new Me)),r&&(u.uv1=ts.getInterpolatedAttribute(r,a,l,c,d,new Me)),o&&(u.normal=ts.getInterpolatedAttribute(o,a,l,c,d,new S),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new S,materialIndex:0};ts.getNormal(ra,oa,aa,h.normal),u.face=h,u.barycoord=d}return u}var Yr=new It,Qh=new It,ed=new It,Am=new It,td=new ut,ha=new S,Ic=new In,nd=new ut,Lc=new xi,ns=class extends $e{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Hc,this.bindMatrix=new ut,this.bindMatrixInverse=new ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ot),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ha),this.boundingBox.expandByPoint(ha)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ha),this.boundingSphere.expandByPoint(ha)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ic.copy(this.boundingSphere),Ic.applyMatrix4(s),e.ray.intersectsSphere(Ic)!==!1&&(nd.copy(s).invert(),Lc.copy(e.ray).applyMatrix4(nd),!(this.boundingBox!==null&&Lc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new It,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Hc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$d?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ze("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Qh.fromBufferAttribute(s.attributes.skinIndex,e),ed.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Yr.copy(t),t.set(0,0,0,0)):(Yr.set(...t,1),t.set(0,0,0)),Yr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=ed.getComponent(r);if(o!==0){let a=Qh.getComponent(r);td.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Am.copy(Yr).applyMatrix4(td),o)}}return t.isVector4&&(t.w=Yr.w),t.applyMatrix4(this.bindMatrixInverse)}},_r=class extends zt{constructor(){super(),this.isBone=!0,this.type="Bone"}},xr=class extends rn{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Kt,u=Kt,d,h){super(null,o,a,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},id=new ut,Rm=new ut,lo=class i{constructor(e=[],t=[]){this.uuid=Zn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ze("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ut)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ut;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Rm;id.multiplyMatrices(a,t[r]),id.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new xr(t,e,e,Gn,zn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(Ze("Skeleton: No bone found with UUID:",r),o=new _r),this.bones.push(o),this.boneInverses.push(new ut().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Ui=class extends Zt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},nr=new ut,sd=new ut,da=[],rd=new Ot,Cm=new ut,Zr=new $e,Kr=new In,co=class extends $e{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ui(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Cm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ot),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,nr),rd.copy(e.boundingBox).applyMatrix4(nr),this.boundingBox.union(rd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,nr),Kr.copy(e.boundingSphere).applyMatrix4(nr),this.boundingSphere.union(Kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Zr.geometry=this.geometry,Zr.material=this.material,Zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Kr.copy(this.boundingSphere),Kr.applyMatrix4(n),e.ray.intersectsSphere(Kr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,nr),sd.multiplyMatrices(n,nr),Zr.matrixWorld=sd,Zr.raycast(e,da);for(let o=0,a=da.length;o<a;o++){let l=da[o];l.instanceId=r,l.object=this,t.push(l)}da.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ui(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new xr(new Float32Array(s*this.count),s,this.count,cl,zn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ys=new In,Pm=new Me(.5,.5),fa=new S,yr=class{constructor(e=new vn,t=new vn,n=new vn,s=new vn,r=new vn,o=new vn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ii,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8],_=r[9],p=r[10],g=r[11],b=r[12],A=r[13],v=r[14],E=r[15];if(s[0].setComponents(c-o,f-u,g-m,E-b).normalize(),s[1].setComponents(c+o,f+u,g+m,E+b).normalize(),s[2].setComponents(c+a,f+d,g+_,E+A).normalize(),s[3].setComponents(c-a,f-d,g-_,E-A).normalize(),n)s[4].setComponents(l,h,p,v).normalize(),s[5].setComponents(c-l,f-h,g-p,E-v).normalize();else if(s[4].setComponents(c-l,f-h,g-p,E-v).normalize(),t===ii)s[5].setComponents(c+l,f+h,g+p,E+v).normalize();else if(t===cr)s[5].setComponents(l,h,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ys.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ys.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ys)}intersectsSprite(e){ys.center.set(0,0,0);let t=Pm.distanceTo(e.center);return ys.radius=.7071067811865476+t,ys.applyMatrix4(e.matrixWorld),this.intersectsSphere(ys)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(fa.x=s.normal.x>0?e.max.x:e.min.x,fa.y=s.normal.y>0?e.max.y:e.min.y,fa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(fa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ri=class extends Ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ua=new S,Fa=new S,od=new ut,jr=new xi,pa=new In,Dc=new S,ad=new S,yi=class extends zt{constructor(e=new At,t=new ri){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ua.fromBufferAttribute(t,s-1),Fa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ua.distanceTo(Fa);e.setAttribute("lineDistance",new ht(n,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,e.ray.intersectsSphere(pa)===!1)return;od.copy(s).invert(),jr.copy(e.ray).applyMatrix4(od);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=c){let g=u.getX(_),b=u.getX(_+1),A=ma(this,e,jr,l,g,b,_);A&&t.push(A)}if(this.isLineLoop){let _=u.getX(m-1),p=u.getX(f),g=ma(this,e,jr,l,_,p,m-1);g&&t.push(g)}}else{let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,p=m-1;_<p;_+=c){let g=ma(this,e,jr,l,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){let _=ma(this,e,jr,l,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ma(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Ua.fromBufferAttribute(a,s),Fa.fromBufferAttribute(a,r),t.distanceSqToSegment(Ua,Fa,Dc,ad)>n)return;Dc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Dc);if(!(c<e.near||c>e.far))return{distance:c,point:ad.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var ld=new S,cd=new S,As=class extends yi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)ld.fromBufferAttribute(t,s),cd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ld.distanceTo(cd);e.setAttribute("lineDistance",new ht(n,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},uo=class extends yi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},vr=class extends Ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ud=new ut,Vc=new xi,ga=new In,_a=new S,ho=class extends zt{constructor(e=new At,t=new vr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(s),ga.radius+=r,e.ray.intersectsSphere(ga)===!1)return;ud.copy(s).invert(),Vc.copy(e.ray).applyMatrix4(ud);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=h,_=f;m<_;m++){let p=c.getX(m);_a.fromBufferAttribute(d,p),hd(_a,p,l,s,e,t,this)}}else{let h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=h,_=f;m<_;m++)_a.fromBufferAttribute(d,m),hd(_a,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function hd(i,e,t,n,s,r,o){let a=Vc.distanceSqToPoint(i);if(a<t){let l=new S;Vc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var fo=class extends rn{constructor(e=[],t=cs,n,s,r,o,a,l,c,u){super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},mn=class extends rn{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var is=class extends rn{constructor(e,t,n=ci,s,r,o,a=Kt,l=Kt,c,u=_i,d=1){if(u!==_i&&u!==us)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new dr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Oa=class extends is{constructor(e,t=ci,n=cs,s,r,o=Kt,a=Kt,l,c=_i){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},po=class extends rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Mn=class i extends At{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2));function m(_,p,g,b,A,v,E,R,T,x,C){let N=v/T,H=E/x,B=v/2,k=E/2,D=R/2,W=T+1,J=x+1,j=0,ae=0,X=new S;for(let re=0;re<J;re++){let ie=re*H-k;for(let ye=0;ye<W;ye++){let xe=ye*N-B;X[_]=xe*b,X[p]=ie*A,X[g]=D,c.push(X.x,X.y,X.z),X[_]=0,X[p]=0,X[g]=R>0?1:-1,u.push(X.x,X.y,X.z),d.push(ye/T),d.push(1-re/x),j+=1}}for(let re=0;re<x;re++)for(let ie=0;ie<T;ie++){let ye=h+ie+W*re,xe=h+ie+W*(re+1),Ie=h+(ie+1)+W*(re+1),Xe=h+(ie+1)+W*re;l.push(ye,xe,Xe),l.push(xe,Ie,Xe),ae+=6}a.addGroup(f,ae,C),f+=ae,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var vi=class i extends At{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new S,u=new Me;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ht(o,3)),this.setAttribute("normal",new ht(a,3)),this.setAttribute("uv",new ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Fi=class i extends At{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],m=0,_=[],p=n/2,g=0;b(),o===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(f,2));function b(){let v=new S,E=new S,R=0,T=(t-e)/n;for(let x=0;x<=r;x++){let C=[],N=x/r,H=N*(t-e)+e;for(let B=0;B<=s;B++){let k=B/s,D=k*l+a,W=Math.sin(D),J=Math.cos(D);E.x=H*W,E.y=-N*n+p,E.z=H*J,d.push(E.x,E.y,E.z),v.set(W,T,J).normalize(),h.push(v.x,v.y,v.z),f.push(k,1-N),C.push(m++)}_.push(C)}for(let x=0;x<s;x++)for(let C=0;C<r;C++){let N=_[C][x],H=_[C+1][x],B=_[C+1][x+1],k=_[C][x+1];(e>0||C!==0)&&(u.push(N,H,k),R+=3),(t>0||C!==r-1)&&(u.push(H,B,k),R+=3)}c.addGroup(g,R,0),g+=R}function A(v){let E=m,R=new Me,T=new S,x=0,C=v===!0?e:t,N=v===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,p*N,0),h.push(0,N,0),f.push(.5,.5),m++;let H=m;for(let B=0;B<=s;B++){let D=B/s*l+a,W=Math.cos(D),J=Math.sin(D);T.x=C*J,T.y=p*N,T.z=C*W,d.push(T.x,T.y,T.z),h.push(0,N,0),R.x=W*.5+.5,R.y=J*.5*N+.5,f.push(R.x,R.y),m++}for(let B=0;B<s;B++){let k=E+B,D=H+B;v===!0?u.push(D,D+1,k):u.push(D+1,D,k),x+=3}c.addGroup(g,x,v===!0?1:2),g+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Hn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let u=n[s],h=n[s+1]-u,f=(o-u)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Me:new S);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new S,s=[],r=[],o=[],a=new S,l=new ut;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new S)}r[0]=new S,o[0]=new S;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(ft(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(ft(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Mr=class extends Hn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Me){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ba=class extends Mr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Su(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let h=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,f*=u,s(o,a,h,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var dd=new S,fd=new S,Nc=new Su,Uc=new Su,Fc=new Su,Rs=class extends Hn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new S){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(fd.subVectors(s[0],s[1]).add(s[0]),c=fd);let d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(dd.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=dd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),Nc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,m,_,p),Uc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,m,_,p),Fc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,m,_,p)}else this.curveType==="catmullrom"&&(Nc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Uc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Fc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(Nc.calc(l),Uc.calc(l),Fc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new S().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function pd(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function Im(i,e){let t=1-i;return t*t*e}function Lm(i,e){return 2*(1-i)*i*e}function Dm(i,e){return i*i*e}function eo(i,e,t,n){return Im(i,e)+Lm(i,t)+Dm(i,n)}function Nm(i,e){let t=1-i;return t*t*t*e}function Um(i,e){let t=1-i;return 3*t*t*i*e}function Fm(i,e){return 3*(1-i)*i*i*e}function Om(i,e){return i*i*i*e}function to(i,e,t,n,s){return Nm(i,e)+Um(i,t)+Fm(i,n)+Om(i,s)}var mo=class extends Hn{constructor(e=new Me,t=new Me,n=new Me,s=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Me){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(to(e,s.x,r.x,o.x,a.x),to(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ha=class extends Hn{constructor(e=new S,t=new S,n=new S,s=new S){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new S){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(to(e,s.x,r.x,o.x,a.x),to(e,s.y,r.y,o.y,a.y),to(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},go=class extends Hn{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends Hn{constructor(e=new S,t=new S){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new S){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new S){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_o=class extends Hn{constructor(e=new Me,t=new Me,n=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Me){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(eo(e,s.x,r.x,o.x),eo(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Va=class extends Hn{constructor(e=new S,t=new S,n=new S){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new S){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(eo(e,s.x,r.x,o.x),eo(e,s.y,r.y,o.y),eo(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xo=class extends Hn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(pd(a,l.x,c.x,u.x,d.x),pd(a,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Me().fromArray(s))}return this}},zc=Object.freeze({__proto__:null,ArcCurve:Ba,CatmullRomCurve3:Rs,CubicBezierCurve:mo,CubicBezierCurve3:Ha,EllipseCurve:Mr,LineCurve:go,LineCurve3:ka,QuadraticBezierCurve:_o,QuadraticBezierCurve3:Va,SplineCurve:xo}),za=class extends Hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new zc[s.type]().fromJSON(s))}return this}},br=class extends za{constructor(e){super(),this.type="Path",this.currentPoint=new Me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new go(this.currentPoint.clone(),new Me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new _o(this.currentPoint.clone(),new Me(e,t),new Me(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new mo(this.currentPoint.clone(),new Me(e,t),new Me(n,s),new Me(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new xo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new Mr(e,t,n,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},oi=class extends br{constructor(e){super(e),this.uuid=Zn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new br().fromJSON(s))}return this}};function Bm(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=_f(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Gm(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let u=a,d=l;for(let h=t;h<s;h+=t){let f=i[h],m=i[h+1];f<a&&(a=f),m<l&&(l=m),f>u&&(u=f),m>d&&(d=m)}c=Math.max(u-a,d-l),c=c!==0?32767/c:0}return yo(r,o,t,a,l,c,0),o}function _f(i,e,t,n,s){let r;if(s===e0(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=md(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=md(o/n|0,i[o],i[o+1],r);return r&&Sr(r,r.next)&&(Mo(r),r=r.next),r}function Cs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Sr(t,t.next)||Xt(t.prev,t,t.next)===0)){if(Mo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function yo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Zm(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?km(i,n,s,r):Hm(i)){e.push(l.i,i.i,c.i),Mo(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Vm(Cs(i),e),yo(i,e,t,n,s,r,2)):o===2&&zm(i,e,t,n,s,r):yo(Cs(i),e,t,n,s,r,1);break}}}function Hm(i){let e=i.prev,t=i,n=i.next;if(Xt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=Math.min(s,r,o),d=Math.min(a,l,c),h=Math.max(s,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=h&&m.y>=d&&m.y<=f&&$r(s,a,r,l,o,c,m.x,m.y)&&Xt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function km(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Xt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,u=s.y,d=r.y,h=o.y,f=Math.min(a,l,c),m=Math.min(u,d,h),_=Math.max(a,l,c),p=Math.max(u,d,h),g=Gc(f,m,e,t,n),b=Gc(_,p,e,t,n),A=i.prevZ,v=i.nextZ;for(;A&&A.z>=g&&v&&v.z<=b;){if(A.x>=f&&A.x<=_&&A.y>=m&&A.y<=p&&A!==s&&A!==o&&$r(a,u,l,d,c,h,A.x,A.y)&&Xt(A.prev,A,A.next)>=0||(A=A.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&$r(a,u,l,d,c,h,v.x,v.y)&&Xt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;A&&A.z>=g;){if(A.x>=f&&A.x<=_&&A.y>=m&&A.y<=p&&A!==s&&A!==o&&$r(a,u,l,d,c,h,A.x,A.y)&&Xt(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&$r(a,u,l,d,c,h,v.x,v.y)&&Xt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Vm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Sr(n,s)&&yf(n,t,t.next,s)&&vo(n,s)&&vo(s,n)&&(e.push(n.i,t.i,s.i),Mo(t),Mo(t.next),t=i=s),t=t.next}while(t!==i);return Cs(t)}function zm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$m(o,a)){let l=vf(o,a);o=Cs(o,o.next),l=Cs(l,l.next),yo(o,e,t,n,s,r,0),yo(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Gm(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=_f(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(jm(c))}s.sort(Wm);for(let r=0;r<s.length;r++)t=Xm(s[r],t);return t}function Wm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Xm(i,e){let t=qm(i,e);if(!t)return e;let n=vf(t,i);return Cs(n,n.next),Cs(t,t.next)}function qm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(Sr(i,t))return t;do{if(Sr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,u=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&xf(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);vo(t,i)&&(d<u||d===u&&(t.x>o.x||t.x===o.x&&Ym(o,t)))&&(o=t,u=d)}t=t.next}while(t!==a);return o}function Ym(i,e){return Xt(i.prev,i,e.prev)<0&&Xt(e.next,i,i.next)<0}function Zm(i,e,t,n){let s=i;do s.z===0&&(s.z=Gc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Km(s)}function Km(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Gc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function jm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function xf(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function $r(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&xf(i,e,t,n,s,r,o,a)}function $m(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Jm(i,e)&&(vo(i,e)&&vo(e,i)&&Qm(i,e)&&(Xt(i.prev,i,e.prev)||Xt(i,e.prev,e))||Sr(i,e)&&Xt(i.prev,i,i.next)>0&&Xt(e.prev,e,e.next)>0)}function Xt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Sr(i,e){return i.x===e.x&&i.y===e.y}function yf(i,e,t,n){let s=ya(Xt(i,e,t)),r=ya(Xt(i,e,n)),o=ya(Xt(t,n,i)),a=ya(Xt(t,n,e));return!!(s!==r&&o!==a||s===0&&xa(i,t,e)||r===0&&xa(i,n,e)||o===0&&xa(t,i,n)||a===0&&xa(t,e,n))}function xa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ya(i){return i>0?1:i<0?-1:0}function Jm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&yf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function vo(i,e){return Xt(i.prev,i,i.next)<0?Xt(i,e,i.next)>=0&&Xt(i,i.prev,e)>=0:Xt(i,e,i.prev)<0||Xt(i,i.next,e)<0}function Qm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function vf(i,e){let t=Wc(i.i,i.x,i.y),n=Wc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function md(i,e,t,n){let s=Wc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Mo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Wc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function e0(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Xc=class{static triangulate(e,t,n=2){return Bm(e,t,n)}},pi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];gd(e),_d(n,e);let o=e.length;t.forEach(gd);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,_d(n,t[l]);let a=Xc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function gd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function _d(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ps=class i extends At{constructor(e=new oi([new Me(.5,.5),new Me(-.5,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new ht(s,3)),this.setAttribute("uv",new ht(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:t0,A,v=!1,E,R,T,x;if(g){A=g.getSpacedPoints(u),v=!0,h=!1;let q=g.isCatmullRomCurve3?g.closed:!1;E=g.computeFrenetFrames(u,q),R=new S,T=new S,x=new S}h||(p=0,f=0,m=0,_=0);let C=a.extractPoints(c),N=C.shape,H=C.holes;if(!pi.isClockWise(N)){N=N.reverse();for(let q=0,Z=H.length;q<Z;q++){let te=H[q];pi.isClockWise(te)&&(H[q]=te.reverse())}}function k(q){let te=10000000000000001e-36,le=q[0];for(let ge=1;ge<=q.length;ge++){let Le=ge%q.length,Fe=q[Le],Se=Fe.x-le.x,Oe=Fe.y-le.y,z=Se*Se+Oe*Oe,gt=Math.max(Math.abs(Fe.x),Math.abs(Fe.y),Math.abs(le.x),Math.abs(le.y)),it=te*gt*gt;if(z<=it){q.splice(Le,1),ge--;continue}le=Fe}}k(N),H.forEach(k);let D=H.length,W=N;for(let q=0;q<D;q++){let Z=H[q];N=N.concat(Z)}function J(q,Z,te){return Z||tt("ExtrudeGeometry: vec does not exist"),q.clone().addScaledVector(Z,te)}let j=N.length;function ae(q,Z,te){let le,ge,Le,Fe=q.x-Z.x,Se=q.y-Z.y,Oe=te.x-q.x,z=te.y-q.y,gt=Fe*Fe+Se*Se,it=Fe*z-Se*Oe;if(Math.abs(it)>Number.EPSILON){let P=Math.sqrt(gt),y=Math.sqrt(Oe*Oe+z*z),Y=Z.x-Se/P,ne=Z.y+Fe/P,ce=te.x-z/y,be=te.y+Oe/y,Te=((ce-Y)*z-(be-ne)*Oe)/(Fe*z-Se*Oe);le=Y+Fe*Te-q.x,ge=ne+Se*Te-q.y;let ue=le*le+ge*ge;if(ue<=2)return new Me(le,ge);Le=Math.sqrt(ue/2)}else{let P=!1;Fe>Number.EPSILON?Oe>Number.EPSILON&&(P=!0):Fe<-Number.EPSILON?Oe<-Number.EPSILON&&(P=!0):Math.sign(Se)===Math.sign(z)&&(P=!0),P?(le=-Se,ge=Fe,Le=Math.sqrt(gt)):(le=Fe,ge=Se,Le=Math.sqrt(gt/2))}return new Me(le/Le,ge/Le)}let X=[];for(let q=0,Z=W.length,te=Z-1,le=q+1;q<Z;q++,te++,le++)te===Z&&(te=0),le===Z&&(le=0),X[q]=ae(W[q],W[te],W[le]);let re=[],ie,ye=X.concat();for(let q=0,Z=D;q<Z;q++){let te=H[q];ie=[];for(let le=0,ge=te.length,Le=ge-1,Fe=le+1;le<ge;le++,Le++,Fe++)Le===ge&&(Le=0),Fe===ge&&(Fe=0),ie[le]=ae(te[le],te[Le],te[Fe]);re.push(ie),ye=ye.concat(ie)}let xe;if(p===0)xe=pi.triangulateShape(W,H);else{let q=[],Z=[];for(let te=0;te<p;te++){let le=te/p,ge=f*Math.cos(le*Math.PI/2),Le=m*Math.sin(le*Math.PI/2)+_;for(let Fe=0,Se=W.length;Fe<Se;Fe++){let Oe=J(W[Fe],X[Fe],Le);I(Oe.x,Oe.y,-ge),le===0&&q.push(Oe)}for(let Fe=0,Se=D;Fe<Se;Fe++){let Oe=H[Fe];ie=re[Fe];let z=[];for(let gt=0,it=Oe.length;gt<it;gt++){let P=J(Oe[gt],ie[gt],Le);I(P.x,P.y,-ge),le===0&&z.push(P)}le===0&&Z.push(z)}}xe=pi.triangulateShape(q,Z)}let Ie=xe.length,Xe=m+_;for(let q=0;q<j;q++){let Z=h?J(N[q],ye[q],Xe):N[q];v?(T.copy(E.normals[0]).multiplyScalar(Z.x),R.copy(E.binormals[0]).multiplyScalar(Z.y),x.copy(A[0]).add(T).add(R),I(x.x,x.y,x.z)):I(Z.x,Z.y,0)}for(let q=1;q<=u;q++)for(let Z=0;Z<j;Z++){let te=h?J(N[Z],ye[Z],Xe):N[Z];v?(T.copy(E.normals[q]).multiplyScalar(te.x),R.copy(E.binormals[q]).multiplyScalar(te.y),x.copy(A[q]).add(T).add(R),I(x.x,x.y,x.z)):I(te.x,te.y,d/u*q)}for(let q=p-1;q>=0;q--){let Z=q/p,te=f*Math.cos(Z*Math.PI/2),le=m*Math.sin(Z*Math.PI/2)+_;for(let ge=0,Le=W.length;ge<Le;ge++){let Fe=J(W[ge],X[ge],le);I(Fe.x,Fe.y,d+te)}for(let ge=0,Le=H.length;ge<Le;ge++){let Fe=H[ge];ie=re[ge];for(let Se=0,Oe=Fe.length;Se<Oe;Se++){let z=J(Fe[Se],ie[Se],le);v?I(z.x,z.y+A[u-1].y,A[u-1].x+te):I(z.x,z.y,d+te)}}}et(),O();function et(){let q=s.length/3;if(h){let Z=0,te=j*Z;for(let le=0;le<Ie;le++){let ge=xe[le];F(ge[2]+te,ge[1]+te,ge[0]+te)}Z=u+p*2,te=j*Z;for(let le=0;le<Ie;le++){let ge=xe[le];F(ge[0]+te,ge[1]+te,ge[2]+te)}}else{for(let Z=0;Z<Ie;Z++){let te=xe[Z];F(te[2],te[1],te[0])}for(let Z=0;Z<Ie;Z++){let te=xe[Z];F(te[0]+j*u,te[1]+j*u,te[2]+j*u)}}n.addGroup(q,s.length/3-q,0)}function O(){let q=s.length/3,Z=0;w(W,Z),Z+=W.length;for(let te=0,le=H.length;te<le;te++){let ge=H[te];w(ge,Z),Z+=ge.length}n.addGroup(q,s.length/3-q,1)}function w(q,Z){let te=q.length;for(;--te>=0;){let le=te,ge=te-1;ge<0&&(ge=q.length-1);for(let Le=0,Fe=u+p*2;Le<Fe;Le++){let Se=j*Le,Oe=j*(Le+1),z=Z+le+Se,gt=Z+ge+Se,it=Z+ge+Oe,P=Z+le+Oe;U(z,gt,it,P)}}}function I(q,Z,te){l.push(q),l.push(Z),l.push(te)}function F(q,Z,te){ee(q),ee(Z),ee(te);let le=s.length/3,ge=b.generateTopUV(n,s,le-3,le-2,le-1);he(ge[0]),he(ge[1]),he(ge[2])}function U(q,Z,te,le){ee(q),ee(Z),ee(le),ee(Z),ee(te),ee(le);let ge=s.length/3,Le=b.generateSideWallUV(n,s,ge-6,ge-3,ge-2,ge-1);he(Le[0]),he(Le[1]),he(Le[3]),he(Le[1]),he(Le[2]),he(Le[3])}function ee(q){s.push(l[q*3+0]),s.push(l[q*3+1]),s.push(l[q*3+2])}function he(q){r.push(q.x),r.push(q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return n0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new zc[s.type]().fromJSON(s)),new i(n,e.options)}},t0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new Me(r,o),new Me(a,l),new Me(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[s*3],f=e[s*3+1],m=e[s*3+2],_=e[r*3],p=e[r*3+1],g=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new Me(o,1-l),new Me(c,1-d),new Me(h,1-m),new Me(_,1-g)]:[new Me(a,1-l),new Me(u,1-d),new Me(f,1-m),new Me(p,1-g)]}};function n0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var un=class i extends At{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,d=e/a,h=t/l,f=[],m=[],_=[],p=[];for(let g=0;g<u;g++){let b=g*h-o;for(let A=0;A<c;A++){let v=A*d-r;m.push(v,-b,0),_.push(0,0,1),p.push(A/a),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<a;b++){let A=b+c*g,v=b+c*(g+1),E=b+1+c*(g+1),R=b+1+c*g;f.push(A,v,R),f.push(v,E,R)}this.setIndex(f),this.setAttribute("position",new ht(m,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Er=class i extends At{constructor(e=new oi([new Me(0,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new ht(s,3)),this.setAttribute("normal",new ht(r,3)),this.setAttribute("uv",new ht(o,2));function c(u){let d=s.length/3,h=u.extractPoints(t),f=h.shape,m=h.holes;pi.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,g=m.length;p<g;p++){let b=m[p];pi.isClockWise(b)===!0&&(m[p]=b.reverse())}let _=pi.triangulateShape(f,m);for(let p=0,g=m.length;p<g;p++){let b=m[p];f=f.concat(b)}for(let p=0,g=f.length;p<g;p++){let b=f[p];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let p=0,g=_.length;p<g;p++){let b=_[p],A=b[0]+d,v=b[1]+d,E=b[2]+d;n.push(A,v,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return i0(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function i0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var kn=class i extends At{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],d=new S,h=new S,f=[],m=[],_=[],p=[];for(let g=0;g<=n;g++){let b=[],A=g/n,v=o+A*a,E=e*Math.cos(v),R=Math.sqrt(e*e-E*E),T=0;g===0&&o===0?T=.5/t:g===n&&l===Math.PI&&(T=-.5/t);for(let x=0;x<=t;x++){let C=x/t,N=s+C*r;d.x=-R*Math.cos(N),d.y=E,d.z=R*Math.sin(N),m.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),p.push(C+T,1-A),b.push(c++)}u.push(b)}for(let g=0;g<n;g++)for(let b=0;b<t;b++){let A=u[g][b+1],v=u[g][b],E=u[g+1][b],R=u[g+1][b+1];(g!==0||o>0)&&f.push(A,v,R),(g!==n-1||l<Math.PI)&&f.push(v,E,R)}this.setIndex(f),this.setAttribute("position",new ht(m,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Is=class i extends At{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],u=[],d=[],h=new S,f=new S,m=new S;for(let _=0;_<=n;_++){let p=o+_/n*a;for(let g=0;g<=s;g++){let b=g/s*r;f.x=(e+t*Math.cos(p))*Math.cos(b),f.y=(e+t*Math.cos(p))*Math.sin(b),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),m.subVectors(f,h).normalize(),u.push(m.x,m.y,m.z),d.push(g/s),d.push(_/n)}}for(let _=1;_<=n;_++)for(let p=1;p<=s;p++){let g=(s+1)*_+p-1,b=(s+1)*(_-1)+p-1,A=(s+1)*(_-1)+p,v=(s+1)*_+p;l.push(g,b,v),l.push(b,A,v)}this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Hs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(xd(s))s.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(xd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function bn(i){let e={};for(let t=0;t<i.length;t++){let n=Hs(i[t]);for(let s in n)e[s]=n[s]}return e}function xd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function s0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Eu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var Mf={clone:Hs,merge:bn},r0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Vn=class extends Ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r0,this.fragmentShader=o0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hs(e.uniforms),this.uniformsGroups=s0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Qe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Me().fromArray(s.value);break;case"v3":this.uniforms[n].value=new S().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new at().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ut().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ga=class extends Vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},mt=class extends Ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},hn=class extends mt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Wa=class extends Ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xa=class extends Ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function es(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ea(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function a0(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function yd(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function l0(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Mi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},qa=class extends Mi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vs,endingEnd:vs}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ms:r=e,a=2*t-n;break;case no:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ms:o=e,l=2*n-t;break;case no:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),_=m*m,p=_*m,g=-h*p+2*h*_-h*m,b=(1+h)*p+(-1.5-2*h)*_+(-.5+h)*m+1,A=(-1-f)*p+(1.5+f)*_+.5*m,v=f*p-f*_;for(let E=0;E!==a;++E)r[E]=g*o[u+E]+b*o[c+E]+A*o[l+E]+v*o[d+E];return r}},bo=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}},Ya=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Za=class extends Mi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(n-t)/(s-t),_=1-m;for(let p=0;p!==a;++p)r[p]=o[c+p]*_+o[l+p]*m;return r}let h=a*2,f=e-1;for(let m=0;m!==a;++m){let _=o[c+m],p=o[l+m],g=f*h+m*2,b=d[g],A=d[g+1],v=e*h+m*2,E=u[v],R=u[v+1],T=u0(n,t,b,E,s);r[m]=bf(T,_,A,R,p)}return r}};function bf(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function c0(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function u0(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=bf(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=c0(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Dn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=es(t,this.TimeBufferType),this.values=es(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:es(e.times,Array),values:es(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ea(e.settings)&&(n.settings={inTangents:es(e.settings.inTangents,Array),outTangents:es(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Za(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ss:t=this.InterpolantFactoryMethodDiscrete;break;case Es:t=this.InterpolantFactoryMethodLinear;break;case ba:t=this.InterpolantFactoryMethodSmooth;break;case kc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ze("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return Es;case this.InterpolantFactoryMethodSmooth:return ba;case this.InterpolantFactoryMethodBezier:return kc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ea(this.settings)&&(vd(this.settings.inTangents,e),vd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(tt("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(tt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){tt("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){tt("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&Yp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){tt("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ba,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let d=a*n,h=d-n,f=d+n;for(let m=0;m!==n;++m){let _=t[d+m];if(_!==t[h+m]||_!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,h=o*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ea(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function vd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Dn.prototype.ValueTypeName="";Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=Es;var Oi=class extends Dn{constructor(e,t,n){super(e,t,n)}};Oi.prototype.ValueTypeName="bool";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=Ss;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var So=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};So.prototype.ValueTypeName="color";var Bi=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};Bi.prototype.ValueTypeName="number";var Ka=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)Pe.slerpFlat(r,0,o,c-a,o,c,l);return r}},Hi=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ka(this.times,this.values,this.getValueSize(),e)}};Hi.prototype.ValueTypeName="quaternion";Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends Dn{constructor(e,t,n){super(e,t,n)}};ki.prototype.ValueTypeName="string";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=Ss;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var ss=class extends Dn{constructor(e,t,n,s){super(e,t,n,s)}};ss.prototype.ValueTypeName="vector";var Ls=class{constructor(e="",t=-1,n=[],s=Gl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Zn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(d0(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Dn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let u=a0(l);l=yd(l,1,u),c=yd(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Bi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],u=c.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function h0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bi;case"vector":case"vector2":case"vector3":case"vector4":return ss;case"color":return So;case"quaternion":return Hi;case"bool":case"boolean":return Oi;case"string":return ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function d0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=h0(i.type);if(i.times===void 0){let n=[],s=[];l0(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Ea(i.settings)&&(t.settings={inTangents:es(i.settings.inTangents,Float32Array),outTangents:es(i.settings.outTangents,Float32Array)}),t}var mi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Md(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Md(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Md(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ja=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Sf=new ja,bi=class{constructor(e){this.manager=e!==void 0?e:Sf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Di={},qc=class extends Error{constructor(e,t){super(e),this.response=t}},Tr=class extends bi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=mi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Di[e]!==void 0){Di[e].push({onLoad:t,onProgress:n,onError:s});return}Di[e]=[],Di[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ze("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Di[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,m=f!==0,_=0,p=new ReadableStream({start(g){b();function b(){d.read().then(({done:A,value:v})=>{if(A)g.close();else{_+=v.byteLength;let E=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let R=0,T=u.length;R<T;R++){let x=u[R];x.onProgress&&x.onProgress(E)}g.enqueue(v),b()}},A=>{g.error(A)})}}});return new Response(p)}else throw new qc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{mi.add(`file:${e}`,c);let u=Di[e];delete Di[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Di[e];if(u===void 0)throw this.manager.itemError(e),c;delete Di[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ir=new WeakMap,$a=class extends bi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=mi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=ir.get(o);d===void 0&&(d=[],ir.set(o,d)),d.push({onLoad:t,onError:s})}return o}let a=ur("img");function l(){u(),t&&t(this);let d=ir.get(this)||[];for(let h=0;h<d.length;h++){let f=d[h];f.onLoad&&f.onLoad(this)}ir.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),mi.remove(`image:${e}`);let h=ir.get(this)||[];for(let f=0;f<h.length;f++){let m=h[f];m.onError&&m.onError(d)}ir.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),mi.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Vi=class extends bi{constructor(e){super(e)}load(e,t,n,s){let r=new rn,o=new $a(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ds=class extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Eo=class extends Ds{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Oc=new ut,bd=new S,Sd=new S,wr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yr,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;bd.setFromMatrixPosition(e.matrixWorld),t.position.copy(bd),Sd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Oc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Oc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===cr||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Oc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},va=new S,Ma=new Pe,fi=new S,To=class extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,Ma,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,fi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(va,Ma,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Qi=new S,Ed=new Me,Td=new Me,sn=class extends To{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ts*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(Jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,Ed,Td),t.subVectors(Td,Ed)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Yc=class extends wr{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ts*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},wo=class extends Ds{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Yc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Zc=class extends wr{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}},Ao=class extends Ds{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Zc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},rs=class extends To{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Kc=class extends wr{constructor(){super(new rs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},os=class extends Ds{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new Kc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var zi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Bc=new WeakMap,Ro=class extends bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ze("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ze("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=mi.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{Bc.has(o)===!0?(s&&s(Bc.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return mi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Bc.set(l,c),mi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});mi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var sr=-90,rr=1,Ja=class extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new sn(sr,rr,e,t);s.layers=this.layers,this.add(s);let r=new sn(sr,rr,e,t);r.layers=this.layers,this.add(r);let o=new sn(sr,rr,e,t);o.layers=this.layers,this.add(o);let a=new sn(sr,rr,e,t);a.layers=this.layers,this.add(a);let l=new sn(sr,rr,e,t);l.layers=this.layers,this.add(l);let c=new sn(sr,rr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Qa=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var el=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){Pe.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;Pe.multiplyQuaternionsFlat(e,o,e,t,e,n),Pe.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},Tu="\\[\\]\\.:\\/",f0=new RegExp("["+Tu+"]","g"),wu="[^"+Tu+"]",p0="[^"+Tu.replace("\\.","")+"]",m0=/((?:WC+[\/:])*)/.source.replace("WC",wu),g0=/(WCOD+)?/.source.replace("WCOD",p0),_0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wu),x0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wu),y0=new RegExp("^"+m0+g0+_0+x0+"$"),v0=["material","materials","bones","map"],jc=class{constructor(e,t,n){let s=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(f0,"")}static parseTrackName(e){let t=y0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);v0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){tt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){tt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){tt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){tt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){tt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){tt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){tt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;tt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){tt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){tt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=jc;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var tl=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:vs,endingEnd:vs};for(let c=0;c!==o;++c){let u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Qd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case tf:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case Gl:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===ef;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Jd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=Ms,s.endingEnd=Ms):(e?s.endingStart=this.zeroSlopeAtStart?Ms:vs:s.endingStart=no,t?s.endingEnd=this.zeroSlopeAtEnd?Ms:vs:s.endingEnd=no)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},M0=new Float32Array(1),Co=class extends Kn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==r;++d){let h=s[d],f=h.name,m=u[f];if(m!==void 0)++m.referenceCount,o[d]=m;else{if(m=o[d],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}let _=t&&t._propertyBindings[d].binding.parsedPath;m=new el(Ut.create(n,f,_),h.ValueTypeName,h.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[d]=m}a[d].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let d=a.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new bo(new Float32Array(2),new Float32Array(2),1,M0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Ls.findByName(s,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Gl),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let u=new tl(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Ls.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var wd=new ut,Ns=class{constructor(e,t,n=0,s=1/0){this.ray=new xi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new fr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):tt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return wd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wd),this}intersectObject(e,t=!0,n=[]){return $c(e,this,n,t),n.sort(Ad),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)$c(e[s],this,n,t);return n.sort(Ad),n}};function Ad(i,e){return i.distance-e.distance}function $c(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)$c(r[o],e,t,!0)}}var Ar=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ft(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Lu=class Lu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Lu.prototype.isMatrix2=!0;var Jc=Lu;var Po=class extends Kn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Au(i,e,t,n){let s=b0(n);switch(t){case _u:return i*e;case cl:return i*e/s.components*s.byteLength;case ul:return i*e/s.components*s.byteLength;case hs:return i*e*2/s.components*s.byteLength;case hl:return i*e*2/s.components*s.byteLength;case xu:return i*e*3/s.components*s.byteLength;case Gn:return i*e*4/s.components*s.byteLength;case dl:return i*e*4/s.components*s.byteLength;case Do:case No:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Uo:case Fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:case gl:return Math.max(i,16)*Math.max(e,8)/4;case fl:case ml:return Math.max(i,8)*Math.max(e,8)/2;case _l:case xl:case vl:case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yl:case Oo:case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case wl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Il:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ul:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ol:case Bl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kl:case Vl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Bo:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function b0(i){switch(i){case Nn:case fu:return{byteLength:1,components:1};case Ir:case pu:case ui:return{byteLength:2,components:1};case al:case ll:return{byteLength:2,components:4};case ci:case ol:case zn:return{byteLength:4,components:1};case mu:case gu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xf(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function R0(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var C0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,P0=`#ifdef USE_ALPHAHASH
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
#endif`,I0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,L0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,D0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,U0=`#ifdef USE_AOMAP
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
#endif`,F0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,O0=`#ifdef USE_BATCHING
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
#endif`,B0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,H0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,k0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,V0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,z0=`#ifdef USE_IRIDESCENCE
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
#endif`,G0=`#ifdef USE_BUMPMAP
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
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,K0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,j0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,J0=`#define PI 3.141592653589793
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
} // validated`,Q0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,eg=`vec3 transformedNormal = objectNormal;
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
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ng=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ig=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rg="gl_FragColor = linearToOutputTexel( gl_FragColor );",og=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ag=`#ifdef USE_ENVMAP
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
#endif`,lg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cg=`#ifdef USE_ENVMAP
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
#endif`,ug=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
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
#endif`,dg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gg=`#ifdef USE_GRADIENTMAP
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
}`,_g=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Mg=`#ifdef USE_ENVMAP
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
#endif`,bg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Eg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wg=`PhysicalMaterial material;
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
#endif`,Ag=`uniform sampler2D dfgLUT;
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
}`,Rg=`
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
#endif`,Cg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ig=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ng=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ug=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Og=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hg=`#if defined( USE_POINTS_UV )
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
#endif`,kg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xg=`#ifdef USE_MORPHTARGETS
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
#endif`,qg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Kg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$g=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Jg=`#ifdef USE_NORMALMAP
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
#endif`,Qg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,r_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,l_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,u_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,h_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,f_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,p_=`float getShadowMask() {
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
}`,m_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g_=`#ifdef USE_SKINNING
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
#endif`,__=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,x_=`#ifdef USE_SKINNING
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
#endif`,y_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,M_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,S_=`#ifdef USE_TRANSMISSION
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
#endif`,E_=`#ifdef USE_TRANSMISSION
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
#endif`,T_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,C_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P_=`uniform sampler2D t2D;
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
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,D_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U_=`#include <common>
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
}`,F_=`#if DEPTH_PACKING == 3200
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
}`,O_=`#define DISTANCE
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
}`,B_=`#define DISTANCE
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
}`,H_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V_=`uniform float scale;
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
}`,z_=`uniform vec3 diffuse;
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
}`,G_=`#include <common>
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
}`,W_=`uniform vec3 diffuse;
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
}`,X_=`#define LAMBERT
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
}`,q_=`#define LAMBERT
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
}`,Y_=`#define MATCAP
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
}`,Z_=`#define MATCAP
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
}`,K_=`#define NORMAL
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
}`,j_=`#define NORMAL
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
}`,$_=`#define PHONG
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
}`,J_=`#define PHONG
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
}`,Q_=`#define STANDARD
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
}`,ex=`#define STANDARD
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
}`,tx=`#define TOON
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
}`,nx=`#define TOON
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
}`,ix=`uniform float size;
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
}`,sx=`uniform vec3 diffuse;
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
}`,rx=`#include <common>
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
}`,ox=`uniform vec3 color;
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
}`,ax=`uniform float rotation;
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
}`,lx=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:C0,alphahash_pars_fragment:P0,alphamap_fragment:I0,alphamap_pars_fragment:L0,alphatest_fragment:D0,alphatest_pars_fragment:N0,aomap_fragment:U0,aomap_pars_fragment:F0,batching_pars_vertex:O0,batching_vertex:B0,begin_vertex:H0,beginnormal_vertex:k0,bsdfs:V0,iridescence_fragment:z0,bumpmap_pars_fragment:G0,clipping_planes_fragment:W0,clipping_planes_pars_fragment:X0,clipping_planes_pars_vertex:q0,clipping_planes_vertex:Y0,color_fragment:Z0,color_pars_fragment:K0,color_pars_vertex:j0,color_vertex:$0,common:J0,cube_uv_reflection_fragment:Q0,defaultnormal_vertex:eg,displacementmap_pars_vertex:tg,displacementmap_vertex:ng,emissivemap_fragment:ig,emissivemap_pars_fragment:sg,colorspace_fragment:rg,colorspace_pars_fragment:og,envmap_fragment:ag,envmap_common_pars_fragment:lg,envmap_pars_fragment:cg,envmap_pars_vertex:ug,envmap_physical_pars_fragment:Mg,envmap_vertex:hg,fog_vertex:dg,fog_pars_vertex:fg,fog_fragment:pg,fog_pars_fragment:mg,gradientmap_pars_fragment:gg,lightmap_pars_fragment:_g,lights_lambert_fragment:xg,lights_lambert_pars_fragment:yg,lights_pars_begin:vg,lights_toon_fragment:bg,lights_toon_pars_fragment:Sg,lights_phong_fragment:Eg,lights_phong_pars_fragment:Tg,lights_physical_fragment:wg,lights_physical_pars_fragment:Ag,lights_fragment_begin:Rg,lights_fragment_maps:Cg,lights_fragment_end:Pg,lightprobes_pars_fragment:Ig,logdepthbuf_fragment:Lg,logdepthbuf_pars_fragment:Dg,logdepthbuf_pars_vertex:Ng,logdepthbuf_vertex:Ug,map_fragment:Fg,map_pars_fragment:Og,map_particle_fragment:Bg,map_particle_pars_fragment:Hg,metalnessmap_fragment:kg,metalnessmap_pars_fragment:Vg,morphinstance_vertex:zg,morphcolor_vertex:Gg,morphnormal_vertex:Wg,morphtarget_pars_vertex:Xg,morphtarget_vertex:qg,normal_fragment_begin:Yg,normal_fragment_maps:Zg,normal_pars_fragment:Kg,normal_pars_vertex:jg,normal_vertex:$g,normalmap_pars_fragment:Jg,clearcoat_normal_fragment_begin:Qg,clearcoat_normal_fragment_maps:e_,clearcoat_pars_fragment:t_,iridescence_pars_fragment:n_,opaque_fragment:i_,packing:s_,premultiplied_alpha_fragment:r_,project_vertex:o_,dithering_fragment:a_,dithering_pars_fragment:l_,roughnessmap_fragment:c_,roughnessmap_pars_fragment:u_,shadowmap_pars_fragment:h_,shadowmap_pars_vertex:d_,shadowmap_vertex:f_,shadowmask_pars_fragment:p_,skinbase_vertex:m_,skinning_pars_vertex:g_,skinning_vertex:__,skinnormal_vertex:x_,specularmap_fragment:y_,specularmap_pars_fragment:v_,tonemapping_fragment:M_,tonemapping_pars_fragment:b_,transmission_fragment:S_,transmission_pars_fragment:E_,uv_pars_fragment:T_,uv_pars_vertex:w_,uv_vertex:A_,worldpos_vertex:R_,background_vert:C_,background_frag:P_,backgroundCube_vert:I_,backgroundCube_frag:L_,cube_vert:D_,cube_frag:N_,depth_vert:U_,depth_frag:F_,distance_vert:O_,distance_frag:B_,equirect_vert:H_,equirect_frag:k_,linedashed_vert:V_,linedashed_frag:z_,meshbasic_vert:G_,meshbasic_frag:W_,meshlambert_vert:X_,meshlambert_frag:q_,meshmatcap_vert:Y_,meshmatcap_frag:Z_,meshnormal_vert:K_,meshnormal_frag:j_,meshphong_vert:$_,meshphong_frag:J_,meshphysical_vert:Q_,meshphysical_frag:ex,meshtoon_vert:tx,meshtoon_frag:nx,points_vert:ix,points_frag:sx,shadow_vert:rx,shadow_frag:ox,sprite_vert:ax,sprite_frag:lx},Be={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new S},probesMax:{value:new S},probesResolution:{value:new S}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},Ti={basic:{uniforms:bn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:bn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:bn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:bn([Be.common,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.roughnessmap,Be.metalnessmap,Be.fog,Be.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:bn([Be.common,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.gradientmap,Be.fog,Be.lights,{emissive:{value:new Qe(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:bn([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:bn([Be.points,Be.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:bn([Be.common,Be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:bn([Be.common,Be.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:bn([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:bn([Be.sprite,Be.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:bn([Be.common,Be.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:bn([Be.lights,Be.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};Ti.physical={uniforms:bn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};var Yl={r:0,b:0,g:0},cx=new ut,qf=new at;qf.set(-1,0,0,0,1,0,0,0,1);function ux(i,e,t,n,s,r){let o=new Qe(0),a=s===!0?0:1,l,c,u=null,d=0,h=null;function f(b){let A=b.isScene===!0?b.background:null;if(A&&A.isTexture){let v=b.backgroundBlurriness>0;A=e.get(A,v)}return A}function m(b){let A=!1,v=f(b);v===null?p(o,a):v&&v.isColor&&(p(v,1),A=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(b,A){let v=f(A);v&&(v.isCubeTexture||v.mapping===Lo)?(c===void 0&&(c=new $e(new Mn(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Hs(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qf),c.material.toneMapped=_t.getTransfer(v.colorSpace)!==Ct,(u!==v||d!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new $e(new un(2,2),new Vn({name:"BackgroundMaterial",uniforms:Hs(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=_t.getTransfer(v.colorSpace)!==Ct,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,A){b.getRGB(Yl,Eu(i)),t.buffers.color.setClear(Yl.r,Yl.g,Yl.b,A,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,A=1){o.set(b),a=A,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,p(o,a)},render:m,addToRenderList:_,dispose:g}}function hx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(H,B,k,D,W){let J=!1,j=d(H,D,k,B);r!==j&&(r=j,c(r.object)),J=f(H,D,k,W),J&&m(H,D,k,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,v(H,B,k,D),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(H){return i.bindVertexArray(H)}function u(H){return i.deleteVertexArray(H)}function d(H,B,k,D){let W=D.wireframe===!0,J=n[B.id];J===void 0&&(J={},n[B.id]=J);let j=H.isInstancedMesh===!0?H.id:0,ae=J[j];ae===void 0&&(ae={},J[j]=ae);let X=ae[k.id];X===void 0&&(X={},ae[k.id]=X);let re=X[W];return re===void 0&&(re=h(l()),X[W]=re),re}function h(H){let B=[],k=[],D=[];for(let W=0;W<t;W++)B[W]=0,k[W]=0,D[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:k,attributeDivisors:D,object:H,attributes:{},index:null}}function f(H,B,k,D){let W=r.attributes,J=B.attributes,j=0,ae=k.getAttributes();for(let X in ae)if(ae[X].location>=0){let ie=W[X],ye=J[X];if(ye===void 0&&(X==="instanceMatrix"&&H.instanceMatrix&&(ye=H.instanceMatrix),X==="instanceColor"&&H.instanceColor&&(ye=H.instanceColor)),ie===void 0||ie.attribute!==ye||ye&&ie.data!==ye.data)return!0;j++}return r.attributesNum!==j||r.index!==D}function m(H,B,k,D){let W={},J=B.attributes,j=0,ae=k.getAttributes();for(let X in ae)if(ae[X].location>=0){let ie=J[X];ie===void 0&&(X==="instanceMatrix"&&H.instanceMatrix&&(ie=H.instanceMatrix),X==="instanceColor"&&H.instanceColor&&(ie=H.instanceColor));let ye={};ye.attribute=ie,ie&&ie.data&&(ye.data=ie.data),W[X]=ye,j++}r.attributes=W,r.attributesNum=j,r.index=D}function _(){let H=r.newAttributes;for(let B=0,k=H.length;B<k;B++)H[B]=0}function p(H){g(H,0)}function g(H,B){let k=r.newAttributes,D=r.enabledAttributes,W=r.attributeDivisors;k[H]=1,D[H]===0&&(i.enableVertexAttribArray(H),D[H]=1),W[H]!==B&&(i.vertexAttribDivisor(H,B),W[H]=B)}function b(){let H=r.newAttributes,B=r.enabledAttributes;for(let k=0,D=B.length;k<D;k++)B[k]!==H[k]&&(i.disableVertexAttribArray(k),B[k]=0)}function A(H,B,k,D,W,J,j){j===!0?i.vertexAttribIPointer(H,B,k,W,J):i.vertexAttribPointer(H,B,k,D,W,J)}function v(H,B,k,D){_();let W=D.attributes,J=k.getAttributes(),j=B.defaultAttributeValues;for(let ae in J){let X=J[ae];if(X.location>=0){let re=W[ae];if(re===void 0&&(ae==="instanceMatrix"&&H.instanceMatrix&&(re=H.instanceMatrix),ae==="instanceColor"&&H.instanceColor&&(re=H.instanceColor)),re!==void 0){let ie=re.normalized,ye=re.itemSize,xe=e.get(re);if(xe===void 0)continue;let Ie=xe.buffer,Xe=xe.type,et=xe.bytesPerElement,O=Xe===i.INT||Xe===i.UNSIGNED_INT||re.gpuType===ol;if(re.isInterleavedBufferAttribute){let w=re.data,I=w.stride,F=re.offset;if(w.isInstancedInterleavedBuffer){for(let U=0;U<X.locationSize;U++)g(X.location+U,w.meshPerAttribute);H.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=w.meshPerAttribute*w.count)}else for(let U=0;U<X.locationSize;U++)p(X.location+U);i.bindBuffer(i.ARRAY_BUFFER,Ie);for(let U=0;U<X.locationSize;U++)A(X.location+U,ye/X.locationSize,Xe,ie,I*et,(F+ye/X.locationSize*U)*et,O)}else{if(re.isInstancedBufferAttribute){for(let w=0;w<X.locationSize;w++)g(X.location+w,re.meshPerAttribute);H.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let w=0;w<X.locationSize;w++)p(X.location+w);i.bindBuffer(i.ARRAY_BUFFER,Ie);for(let w=0;w<X.locationSize;w++)A(X.location+w,ye/X.locationSize,Xe,ie,ye*et,ye/X.locationSize*w*et,O)}}else if(j!==void 0){let ie=j[ae];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(X.location,ie);break;case 3:i.vertexAttrib3fv(X.location,ie);break;case 4:i.vertexAttrib4fv(X.location,ie);break;default:i.vertexAttrib1fv(X.location,ie)}}}}b()}function E(){C();for(let H in n){let B=n[H];for(let k in B){let D=B[k];for(let W in D){let J=D[W];for(let j in J)u(J[j].object),delete J[j];delete D[W]}}delete n[H]}}function R(H){if(n[H.id]===void 0)return;let B=n[H.id];for(let k in B){let D=B[k];for(let W in D){let J=D[W];for(let j in J)u(J[j].object),delete J[j];delete D[W]}}delete n[H.id]}function T(H){for(let B in n){let k=n[B];for(let D in k){let W=k[D];if(W[H.id]===void 0)continue;let J=W[H.id];for(let j in J)u(J[j].object),delete J[j];delete W[H.id]}}}function x(H){for(let B in n){let k=n[B],D=H.isInstancedMesh===!0?H.id:0,W=k[D];if(W!==void 0){for(let J in W){let j=W[J];for(let ae in j)u(j[ae].object),delete j[ae];delete W[J]}delete k[D],Object.keys(k).length===0&&delete n[B]}}}function C(){N(),o=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:N,dispose:E,releaseStatesOfGeometry:R,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function dx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function fx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==Gn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let x=T===ui&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Nn&&T!==zn&&!x&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ze("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:v,maxSamples:E,samples:R}}function px(i){let e=this,t=null,n=0,s=!1,r=!1,o=new vn,a=new at,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,g=i.get(d);if(!s||m===null||m.length===0||r&&!p)r?u(null):c();else{let b=r?0:n,A=b*4,v=g.clippingState||null;l.value=v,v=u(m,h,A,f);for(let E=0;E!==A;++E)v[E]=t[E];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,m){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=l.value,m!==!0||p===null){let g=f+_*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<g)&&(p=new Float32Array(g));for(let A=0,v=f;A!==_;++A,v+=4)o.copy(d[A]).applyMatrix4(b,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}var Ur=4,mx=6,gx=20,_x=256,ko=new rs,Ef=new Qe,Du=null,Nu=0,Uu=0,Fu=!1,xx=new S,ks=new S,Kl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=xx}=r;Du=this._renderer.getRenderTarget(),Nu=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Af(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Du,Nu,Uu),this._renderer.xr.enabled=Fu,e.scissorTest=!1,Nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cs||e.mapping===Os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Du=this._renderer.getRenderTarget(),Nu=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:ui,format:Gn,colorSpace:En,depthBuffer:!1},s=Tf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=yx(r)),this._blurMaterial=Mx(r,e,t),this._ggxMaterial=vx(r,e,t)}return s}_compileMaterial(e){let t=new $e(new At,e);this._renderer.compile(t,ko)}_sceneToCubeUV(e,t,n,s,r){let l=new sn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Ef),d.toneMapping=ai,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $e(new Mn,new si({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,p=_.material,g=!1,b=e.background;b?b.isColor&&(p.color.copy(b),e.background=null,g=!0):(p.color.copy(Ef),g=!0);for(let A=0;A<6;A++){let v=A%3;v===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[A],r.y,r.z)):v===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[A]));let E=this._cubeSize;Nr(s,v*E,A>2?E:0,E,E),d.setRenderTarget(s),g&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===cs||e.mapping===Os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Af()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Nr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ko)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,f=d*h,{_lodMax:m}=this,_=this._sizeLods[n],p=3*_*(n>m-Ur?n-m+Ur:0),g=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,Nr(r,p,g,3*_,2*_),s.setRenderTarget(r),s.render(a,ko),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,Nr(e,p,g,3*_,2*_),s.setRenderTarget(e),s.render(a,ko)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Ur?s-this._lodMax+Ur:0),h=4*(this._cubeSize-u);Nr(t,d,h,3*u,2*u),o.setRenderTarget(t),o.render(l,ko)}};function yx(i){let e=[],t=[],n=i,s=i-Ur+1+mx;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),l=-a,c=1+a,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,f=3,m=new Float32Array(f*h*d),_=new Float32Array(f*h*d);for(let g=0;g<d;g++){let b=g%3*2/3-1,A=g>2?0:-1,v=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];m.set(v,f*h*g);for(let E=0;E<h;E++){let R=u[E*2]*2-1,T=u[E*2+1]*2-1;g===0?ks.set(1,T,R):g===1?ks.set(-R,1,-T):g===2?ks.set(-R,T,1):g===3?ks.set(-1,T,-R):g===4?ks.set(-R,-1,T):ks.set(R,T,-1),ks.toArray(_,(g*h+E)*f)}}let p=new At;p.setAttribute("position",new Zt(m,f)),p.setAttribute("outputDirection",new Zt(_,f)),t.push(new $e(p,null)),n>Ur&&n--}return{lodMeshes:t,sizeLods:e}}function Tf(i,e,t){let n=new Cn(i,e,t);return n.texture.mapping=Lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Nr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function vx(i,e,t){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_x,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Mx(i,e,t){return new Vn({name:"SphericalGaussianBlur",defines:{SAMPLES:gx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Jl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function wf(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jl(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Af(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jl(),fragmentShader:`

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
	`}var jl=class extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Mn(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:Hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tn,blending:Si});r.uniforms.tEquirect.value=t;let o=new $e(s,r),a=t.minFilter;return t.minFilter===li&&(t.minFilter=jt),new Ja(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function bx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?o(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===il||f===sl)if(e.has(h)){let m=e.get(h).texture;return a(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let _=new jl(m.height);return _.fromEquirectangularTexture(i,h),e.set(h,_),h.addEventListener("dispose",c),a(_.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let f=h.mapping,m=f===il||f===sl,_=f===cs||f===Os;if(m||_){let p=t.get(h),g=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return n===null&&(n=new Kl(i)),p=m?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let b=h.image;return m&&b&&b.height>0||_&&b&&l(b)?(n===null&&(n=new Kl(i)),p=m?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function a(h,f){return f===il?h.mapping=cs:f===sl&&(h.mapping=Os),h}function l(h){let f=0,m=6;for(let _=0;_<m;_++)h[_]!==void 0&&f++;return f===m}function c(h){let f=h.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Sx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&bs("WebGLRenderer: "+n+" extension not supported."),s}}}function Ex(i,e,t,n){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,m=d.attributes.position,_=0;if(m===void 0)return;if(f!==null){let b=f.array;_=f.version;for(let A=0,v=b.length;A<v;A+=3){let E=b[A+0],R=b[A+1],T=b[A+2];h.push(E,R,R,T,T,E)}}else{let b=m.array;_=m.version;for(let A=0,v=b.length/3-1;A<v;A+=3){let E=A+0,R=A+1,T=A+2;h.push(E,R,R,T,T,E)}}let p=new(m.count>=65535?ao:ws)(h,1);p.version=_;let g=r.get(d);g&&e.remove(g),r.set(d,p)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Tx(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,h){i.drawElements(n,h,r,d*o),t.update(h,n,1)}function c(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,d*o,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let _=0;for(let p=0;p<f;p++)_+=h[p];t.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function wx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:tt("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Ax(i,e,t){let n=new WeakMap,s=new It;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let C=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",C)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],A=0;f===!0&&(A=1),m===!0&&(A=2),_===!0&&(A=3);let v=a.attributes.position.count*A,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let R=new Float32Array(v*E*4*d),T=new ro(R,v,E,d);T.type=zn,T.needsUpdate=!0;let x=A*4;for(let N=0;N<d;N++){let H=p[N],B=g[N],k=b[N],D=v*E*4*N;for(let W=0;W<H.count;W++){let J=W*x;f===!0&&(s.fromBufferAttribute(H,W),R[D+J+0]=s.x,R[D+J+1]=s.y,R[D+J+2]=s.z,R[D+J+3]=0),m===!0&&(s.fromBufferAttribute(B,W),R[D+J+4]=s.x,R[D+J+5]=s.y,R[D+J+6]=s.z,R[D+J+7]=0),_===!0&&(s.fromBufferAttribute(k,W),R[D+J+8]=s.x,R[D+J+9]=s.y,R[D+J+10]=s.z,R[D+J+11]=k.itemSize===4?s.w:1)}}h={count:d,texture:T,size:new Me(v,E)},n.set(a,h),a.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Rx(i,e,t,n,s){let r=new WeakMap;function o(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function a(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var Cx={[ou]:"LINEAR_TONE_MAPPING",[au]:"REINHARD_TONE_MAPPING",[lu]:"CINEON_TONE_MAPPING",[Io]:"ACES_FILMIC_TONE_MAPPING",[uu]:"AGX_TONE_MAPPING",[hu]:"NEUTRAL_TONE_MAPPING",[cu]:"CUSTOM_TONE_MAPPING"};function Px(i,e,t,n,s,r){let o=new Cn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new At;c.setAttribute("position",new ht([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ht([0,2,0,0,2,0],2));let u=new Ga({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new $e(c,u),h=new rs(-1,1,1,-1,0,1),f=null,m=null,_=!1,p,g=null,b=[],A=!1;this.setSize=function(v,E){o.setSize(v,E),a!==null&&a.setSize(v,E),l!==null&&l.setSize(v,E);for(let R=0;R<b.length;R++){let T=b[R];T.setSize&&T.setSize(v,E)}},this.setEffects=function(v){b=v,A=b.length>0&&b[0].isRenderPass===!0;let E=o.width,R=o.height;b.length>0&&a===null&&(a=new Cn(E,R,{type:ui,depthBuffer:!1,stencilBuffer:!1}),l=new Cn(E,R,{type:ui,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<b.length;T++){let x=b[T];x.setSize&&x.setSize(E,R)}},this.begin=function(v,E){if(_||v.toneMapping===ai&&b.length===0)return!1;if(g=E,E!==null){let R=E.width,T=E.height;(o.width!==R||o.height!==T)&&this.setSize(R,T)}return A===!1&&v.setRenderTarget(o),p=v.toneMapping,v.toneMapping=ai,!0},this.hasRenderPass=function(){return A},this.end=function(v,E){v.toneMapping=p,_=!0;let R=o,T=a;for(let x=0;x<b.length;x++){let C=b[x];C.enabled!==!1&&(C.render(v,T,R,E),C.needsSwap!==!1&&(R=T,T=T===a?l:a))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,u.defines={},_t.getTransfer(f)===Ct&&(u.defines.SRGB_TRANSFER="");let x=Cx[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=R.texture,v.setRenderTarget(g),v.render(d,h),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var Yf=new rn,Hu=new is(1,1),Zf=new ro,Kf=new Na,jf=new fo,Rf=[],Cf=[],Pf=new Float32Array(16),If=new Float32Array(9),Lf=new Float32Array(4);function Or(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Rf[s];if(r===void 0&&(r=new Float32Array(s),Rf[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function on(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function an(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ql(i,e){let t=Cf[e];t===void 0&&(t=new Int32Array(e),Cf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ix(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2fv(this.addr,e),an(t,e)}}function Dx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;i.uniform3fv(this.addr,e),an(t,e)}}function Nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4fv(this.addr,e),an(t,e)}}function Ux(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Lf.set(n),i.uniformMatrix2fv(this.addr,!1,Lf),an(t,n)}}function Fx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;If.set(n),i.uniformMatrix3fv(this.addr,!1,If),an(t,n)}}function Ox(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Pf.set(n),i.uniformMatrix4fv(this.addr,!1,Pf),an(t,n)}}function Bx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Hx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2iv(this.addr,e),an(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3iv(this.addr,e),an(t,e)}}function Vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4iv(this.addr,e),an(t,e)}}function zx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2uiv(this.addr,e),an(t,e)}}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3uiv(this.addr,e),an(t,e)}}function Xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4uiv(this.addr,e),an(t,e)}}function qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Hu.compareFunction=t.isReversedDepthBuffer()?ql:Xl,r=Hu):r=Yf,t.setTexture2D(e||r,s)}function Yx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Kf,s)}function Zx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||jf,s)}function Kx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Zf,s)}function jx(i){switch(i){case 5126:return Ix;case 35664:return Lx;case 35665:return Dx;case 35666:return Nx;case 35674:return Ux;case 35675:return Fx;case 35676:return Ox;case 5124:case 35670:return Bx;case 35667:case 35671:return Hx;case 35668:case 35672:return kx;case 35669:case 35673:return Vx;case 5125:return zx;case 36294:return Gx;case 36295:return Wx;case 36296:return Xx;case 35678:case 36198:case 36298:case 36306:case 35682:return qx;case 35679:case 36299:case 36307:return Yx;case 35680:case 36300:case 36308:case 36293:return Zx;case 36289:case 36303:case 36311:case 36292:return Kx}}function $x(i,e){i.uniform1fv(this.addr,e)}function Jx(i,e){let t=Or(e,this.size,2);i.uniform2fv(this.addr,t)}function Qx(i,e){let t=Or(e,this.size,3);i.uniform3fv(this.addr,t)}function ey(i,e){let t=Or(e,this.size,4);i.uniform4fv(this.addr,t)}function ty(i,e){let t=Or(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ny(i,e){let t=Or(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function iy(i,e){let t=Or(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function sy(i,e){i.uniform1iv(this.addr,e)}function ry(i,e){i.uniform2iv(this.addr,e)}function oy(i,e){i.uniform3iv(this.addr,e)}function ay(i,e){i.uniform4iv(this.addr,e)}function ly(i,e){i.uniform1uiv(this.addr,e)}function cy(i,e){i.uniform2uiv(this.addr,e)}function uy(i,e){i.uniform3uiv(this.addr,e)}function hy(i,e){i.uniform4uiv(this.addr,e)}function dy(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Hu:o=Yf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function fy(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Kf,r[o])}function py(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||jf,r[o])}function my(i,e,t){let n=this.cache,s=e.length,r=Ql(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Zf,r[o])}function gy(i){switch(i){case 5126:return $x;case 35664:return Jx;case 35665:return Qx;case 35666:return ey;case 35674:return ty;case 35675:return ny;case 35676:return iy;case 5124:case 35670:return sy;case 35667:case 35671:return ry;case 35668:case 35672:return oy;case 35669:case 35673:return ay;case 5125:return ly;case 36294:return cy;case 36295:return uy;case 36296:return hy;case 35678:case 36198:case 36298:case 36306:case 35682:return dy;case 35679:case 36299:case 36307:return fy;case 35680:case 36300:case 36308:case 36293:return py;case 36289:case 36303:case 36311:case 36292:return my}}var ku=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jx(t.type)}},Vu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gy(t.type)}},zu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Ou=/(\w+)(\])?(\[|\.)?/g;function Df(i,e){i.seq.push(e),i.map[e.id]=e}function _y(i,e,t){let n=i.name,s=n.length;for(Ou.lastIndex=0;;){let r=Ou.exec(n),o=Ou.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Df(t,c===void 0?new ku(a,i,e):new Vu(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new zu(a),Df(t,d)),t=d}}}var Fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);_y(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Nf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var xy=37297,yy=0;function vy(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Uf=new at;function My(i){_t._getMatrix(Uf,_t.workingColorSpace,i);let e=`mat3( ${Uf.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(i)){case io:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ff(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+vy(i.getShaderSource(e),a)}else return r}function by(i,e){let t=My(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Sy={[ou]:"Linear",[au]:"Reinhard",[lu]:"Cineon",[Io]:"ACESFilmic",[uu]:"AgX",[hu]:"Neutral",[cu]:"Custom"};function Ey(i,e){let t=Sy[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Zl=new S;function Ty(){_t.getLuminanceCoefficients(Zl);let i=Zl.x.toFixed(4),e=Zl.y.toFixed(4),t=Zl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zo).join(`
`)}function Ay(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ry(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function zo(i){return i!==""}function Of(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Cy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gu(i){return i.replace(Cy,Iy)}var Py=new Map;function Iy(i,e){let t=dt[e];if(t===void 0){let n=Py.get(e);if(n!==void 0)t=dt[n],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Gu(t)}var Ly=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hf(i){return i.replace(Ly,Dy)}function Dy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function kf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Ny={[Us]:"SHADOWMAP_TYPE_PCF",[Rr]:"SHADOWMAP_TYPE_VSM"};function Uy(i){return Ny[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Fy={[cs]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE",[Lo]:"ENVMAP_TYPE_CUBE_UV"};function Oy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Fy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var By={[Os]:"ENVMAP_MODE_REFRACTION"};function Hy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":By[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ky={[ru]:"ENVMAP_BLENDING_MULTIPLY",[Kd]:"ENVMAP_BLENDING_MIX",[jd]:"ENVMAP_BLENDING_ADD"};function Vy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ky[i.combine]||"ENVMAP_BLENDING_NONE"}function zy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Gy(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Uy(t),c=Oy(t),u=Hy(t),d=Vy(t),h=zy(t),f=wy(t),m=Ay(r),_=s.createProgram(),p,g,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zo).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zo).join(`
`),g.length>0&&(g+=`
`)):(p=[kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zo).join(`
`),g=[kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?dt.tonemapping_pars_fragment:"",t.toneMapping!==ai?Ey("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,by("linearToOutputTexel",t.outputColorSpace),Ty(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zo).join(`
`)),o=Gu(o),o=Of(o,t),o=Bf(o,t),a=Gu(a),a=Of(a,t),a=Bf(a,t),o=Hf(o),a=Hf(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Mu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let A=b+p+o,v=b+g+a,E=Nf(s,s.VERTEX_SHADER,A),R=Nf(s,s.FRAGMENT_SHADER,v);s.attachShader(_,E),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(H){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(E)||"",D=s.getShaderInfoLog(R)||"",W=B.trim(),J=k.trim(),j=D.trim(),ae=!0,X=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ae=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,R);else{let re=Ff(s,E,"vertex"),ie=Ff(s,R,"fragment");tt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+W+`
`+re+`
`+ie)}else W!==""?Ze("WebGLProgram: Program Info Log:",W):(J===""||j==="")&&(X=!1);X&&(H.diagnostics={runnable:ae,programLog:W,vertexShader:{log:J,prefix:p},fragmentShader:{log:j,prefix:g}})}s.deleteShader(E),s.deleteShader(R),x=new Fr(s,_),C=Ry(s,_)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let C;this.getAttributes=function(){return C===void 0&&T(this),C};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(_,xy)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=R,this}var Wy=0,Wu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xu(e),t.set(e,n)),n}},Xu=class{constructor(e){this.id=Wy++,this.code=e,this.usedTimes=0}};function Xy(i){return i===hs||i===Oo||i===Bo}function qy(i,e,t,n,s,r){let o=new fr,a=new Wu,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,C,N,H,B,k){let D=H.fog,W=B.geometry,J=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?H.environment:null,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ae=e.get(x.envMap||J,j),X=ae&&ae.mapping===Lo?ae.image.height:null,re=f[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&Ze("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ye=ie!==void 0?ie.length:0,xe=0;W.morphAttributes.position!==void 0&&(xe=1),W.morphAttributes.normal!==void 0&&(xe=2),W.morphAttributes.color!==void 0&&(xe=3);let Ie,Xe,et,O;if(re){let V=Ti[re];Ie=V.vertexShader,Xe=V.fragmentShader}else{Ie=x.vertexShader,Xe=x.fragmentShader;let V=a.getVertexShaderStage(x),_e=a.getFragmentShaderStage(x);a.update(x,V,_e),et=V.id,O=_e.id}let w=i.getRenderTarget(),I=i.state.buffers.depth.getReversed(),F=B.isInstancedMesh===!0,U=B.isBatchedMesh===!0,ee=!!x.map,he=!!x.matcap,q=!!ae,Z=!!x.aoMap,te=!!x.lightMap,le=!!x.bumpMap&&x.wireframe===!1,ge=!!x.normalMap,Le=!!x.displacementMap,Fe=!!x.emissiveMap,Se=!!x.metalnessMap,Oe=!!x.roughnessMap,z=x.anisotropy>0,gt=x.clearcoat>0,it=x.dispersion>0,P=x.retroreflectivity>0,y=x.iridescence>0,Y=x.sheen>0,ne=x.transmission>0,ce=z&&!!x.anisotropyMap,be=gt&&!!x.clearcoatMap,Te=gt&&!!x.clearcoatNormalMap,ue=gt&&!!x.clearcoatRoughnessMap,pe=y&&!!x.iridescenceMap,Ee=y&&!!x.iridescenceThicknessMap,qe=Y&&!!x.sheenColorMap,Ae=Y&&!!x.sheenRoughnessMap,Re=!!x.specularMap,ze=!!x.specularColorMap,Ke=!!x.specularIntensityMap,rt=ne&&!!x.transmissionMap,L=ne&&!!x.thicknessMap,me=!!x.gradientMap,se=!!x.alphaMap,ve=x.alphaTest>0,de=!!x.alphaHash,fe=!!x.extensions,De=ai;x.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(De=i.toneMapping);let Ne={shaderID:re,shaderType:x.type,shaderName:x.name,vertexShader:Ie,fragmentShader:Xe,defines:x.defines,customVertexShaderID:et,customFragmentShaderID:O,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:U,batchingColor:U&&B._colorsTexture!==null,instancing:F,instancingColor:F&&B.instanceColor!==null,instancingMorph:F&&B.morphTexture!==null,outputColorSpace:w===null?i.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ee,matcap:he,envMap:q,envMapMode:q&&ae.mapping,envMapCubeUVHeight:X,aoMap:Z,lightMap:te,bumpMap:le,normalMap:ge,displacementMap:Le,emissiveMap:Fe,normalMapObjectSpace:ge&&x.normalMapType===sf,normalMapTangentSpace:ge&&x.normalMapType===Wl,packedNormalMap:ge&&x.normalMapType===Wl&&Xy(x.normalMap.format),metalnessMap:Se,roughnessMap:Oe,anisotropy:z,anisotropyMap:ce,clearcoat:gt,clearcoatMap:be,clearcoatNormalMap:Te,clearcoatRoughnessMap:ue,dispersion:it,retroreflection:P,iridescence:y,iridescenceMap:pe,iridescenceThicknessMap:Ee,sheen:Y,sheenColorMap:qe,sheenRoughnessMap:Ae,specularMap:Re,specularColorMap:ze,specularIntensityMap:Ke,transmission:ne,transmissionMap:rt,thicknessMap:L,gradientMap:me,opaque:x.transparent===!1&&x.blending===Cr&&x.alphaToCoverage===!1,alphaMap:se,alphaTest:ve,alphaHash:de,combine:x.combine,mapUv:ee&&m(x.map.channel),aoMapUv:Z&&m(x.aoMap.channel),lightMapUv:te&&m(x.lightMap.channel),bumpMapUv:le&&m(x.bumpMap.channel),normalMapUv:ge&&m(x.normalMap.channel),displacementMapUv:Le&&m(x.displacementMap.channel),emissiveMapUv:Fe&&m(x.emissiveMap.channel),metalnessMapUv:Se&&m(x.metalnessMap.channel),roughnessMapUv:Oe&&m(x.roughnessMap.channel),anisotropyMapUv:ce&&m(x.anisotropyMap.channel),clearcoatMapUv:be&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:Te&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(x.sheenRoughnessMap.channel),specularMapUv:Re&&m(x.specularMap.channel),specularColorMapUv:ze&&m(x.specularColorMap.channel),specularIntensityMapUv:Ke&&m(x.specularIntensityMap.channel),transmissionMapUv:rt&&m(x.transmissionMap.channel),thicknessMapUv:L&&m(x.thicknessMap.channel),alphaMapUv:se&&m(x.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ge||z),vertexNormals:!!W.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!W.attributes.uv&&(ee||se),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||W.attributes.normal===void 0&&ge===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:I,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:xe,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:ee&&x.map.isVideoTexture===!0&&_t.getTransfer(x.map.colorSpace)===Ct,decodeVideoTextureEmissive:Fe&&x.emissiveMap.isVideoTexture===!0&&_t.getTransfer(x.emissiveMap.colorSpace)===Ct,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===kt,flipSided:x.side===Tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:fe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&x.extensions.multiDraw===!0||U)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function p(x){let C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)C.push(N),C.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(g(C,x),b(C,x),C.push(i.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function g(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numSunLights),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numSunLightShadows),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function b(x,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.retroreflection&&o.enable(24),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),C.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function A(x){let C=f[x.type],N;if(C){let H=Ti[C];N=Mf.clone(H.uniforms)}else N=x.uniforms;return N}function v(x,C){let N=u.get(C);return N!==void 0?++N.usedTimes:(N=new Gy(i,C,x,s),c.push(N),u.set(C,N)),N}function E(x){if(--x.usedTimes===0){let C=c.indexOf(x);c[C]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function R(x){a.remove(x)}function T(){a.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:A,acquireProgram:v,releaseProgram:E,releaseShaderCache:R,programs:c,dispose:T}}function Yy(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Zy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Vf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,m,_,p,g){let b=i[e];return b===void 0?(b={id:h.id,object:h,geometry:f,material:m,materialVariant:o(h),groupOrder:_,renderOrder:h.renderOrder,z:p,group:g},i[e]=b):(b.id=h.id,b.object=h,b.geometry=f,b.material=m,b.materialVariant=o(h),b.groupOrder=_,b.renderOrder=h.renderOrder,b.z=p,b.group=g),e++,b}function l(h,f,m,_,p,g,b){b.reversedDepth===!0&&(p=-p);let A=a(h,f,m,_,p,g);m.transmission>0?n.push(A):m.transparent===!0?s.push(A):t.push(A)}function c(h,f,m,_,p,g){let b=a(h,f,m,_,p,g);m.transmission>0?n.unshift(b):m.transparent===!0?s.unshift(b):t.unshift(b)}function u(h,f){t.length>1&&t.sort(h||Zy),n.length>1&&n.sort(f||Vf),s.length>1&&s.sort(f||Vf)}function d(){for(let h=e,f=i.length;h<f;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function Ky(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new zf,i.set(n,[o])):s>=r.length?(o=new zf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function jy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new S,color:new Qe};break;case"SpotLight":t={position:new S,direction:new S,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new S,halfWidth:new S,halfHeight:new S};break}return i[e.id]=t,t}}}function $y(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Jy=0;function Qy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ev(i){let e=new jy,t=$y(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new S);let s=new S,r=new ut,o=new ut;function a(c){let u=0,d=0,h=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,m=0,_=0,p=0,g=0,b=0,A=0,v=0,E=0,R=0,T=0,x=0,C=0,N=0;c.sort(Qy);for(let B=0,k=c.length;B<k;B++){let D=c[B],W=D.color,J=D.intensity,j=D.distance,ae=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===hs?ae=D.shadow.map.texture:ae=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=W.r*J,d+=W.g*J,h+=W.b*J;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],J);N++}else if(D.isSunLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let re=D.shadow,ie=t.get(D);ie.shadowIntensity=re.intensity,ie.shadowBias=re.bias,ie.shadowNormalBias=re.normalBias,ie.shadowRadius=re.radius,ie.shadowMapSize.copy(re.mapSize).multiply(re.getFrameExtents()),n.sunShadow[m]=ie,n.sunShadowMap[m]=ae;let ye=re.getViewportCount();for(let xe=0;xe<ye;xe++)n.sunShadowMatrix[_+xe]=re.getMatrix(xe),n.sunShadowCascade[_+xe]=re._cascadeData[xe];_+=ye,m++}n.sun[f]=X,f++}else if(D.isDirectionalLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let re=D.shadow,ie=t.get(D);ie.shadowIntensity=re.intensity,ie.shadowBias=re.bias,ie.shadowNormalBias=re.normalBias,ie.shadowRadius=re.radius,ie.shadowMapSize=re.mapSize,n.directionalShadow[p]=ie,n.directionalShadowMap[p]=ae,n.directionalShadowMatrix[p]=D.shadow.matrix,E++}n.directional[p]=X,p++}else if(D.isSpotLight){let X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(W).multiplyScalar(J),X.distance=j,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[b]=X;let re=D.shadow;if(D.map&&(n.spotLightMap[x]=D.map,x++,re.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[b]=re.matrix,D.castShadow){let ie=t.get(D);ie.shadowIntensity=re.intensity,ie.shadowBias=re.bias,ie.shadowNormalBias=re.normalBias,ie.shadowRadius=re.radius,ie.shadowMapSize=re.mapSize,n.spotShadow[b]=ie,n.spotShadowMap[b]=ae,T++}b++}else if(D.isRectAreaLight){let X=e.get(D);X.color.copy(W).multiplyScalar(J),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[A]=X,A++}else if(D.isPointLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){let re=D.shadow,ie=t.get(D);ie.shadowIntensity=re.intensity,ie.shadowBias=re.bias,ie.shadowNormalBias=re.normalBias,ie.shadowRadius=re.radius,ie.shadowMapSize=re.mapSize,ie.shadowCameraNear=re.camera.near,ie.shadowCameraFar=re.camera.far,n.pointShadow[g]=ie,n.pointShadowMap[g]=ae,n.pointShadowMatrix[g]=D.shadow.matrix,R++}n.point[g]=X,g++}else if(D.isHemisphereLight){let X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(J),X.groundColor.copy(D.groundColor).multiplyScalar(J),n.hemi[v]=X,v++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Be.LTC_FLOAT_1,n.rectAreaLTC2=Be.LTC_FLOAT_2):(n.rectAreaLTC1=Be.LTC_HALF_1,n.rectAreaLTC2=Be.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let H=n.hash;(H.sunLength!==f||H.directionalLength!==p||H.pointLength!==g||H.spotLength!==b||H.rectAreaLength!==A||H.hemiLength!==v||H.numSunShadows!==m||H.numDirectionalShadows!==E||H.numPointShadows!==R||H.numSpotShadows!==T||H.numSpotMaps!==x||H.numLightProbes!==N)&&(n.sun.length=f,n.directional.length=p,n.spot.length=b,n.rectArea.length=A,n.point.length=g,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+x-C,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=N,H.sunLength=f,H.directionalLength=p,H.pointLength=g,H.spotLength=b,H.rectAreaLength=A,H.hemiLength=v,H.numSunShadows=m,H.numDirectionalShadows=E,H.numPointShadows=R,H.numSpotShadows=T,H.numSpotMaps=x,H.numLightProbes=N,n.version=Jy++)}function l(c,u){let d=0,h=0,f=0,m=0,_=0,p=0,g=u.matrixWorldInverse;for(let b=0,A=c.length;b<A;b++){let v=c[b];if(v.isSunLight){let E=n.sun[d];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(g),d++}else if(v.isDirectionalLight){let E=n.directional[h];E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),h++}else if(v.isSpotLight){let E=n.spot[m];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let E=n.rectArea[_];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let E=n.hemi[p];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(g),p++}}}return{setup:a,setupView:l,state:n}}function Gf(i){let e=new ev(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function o(h){t.push(h)}function a(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function tv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Gf(i),e.set(s,[a])):r>=o.length?(a=new Gf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var nv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iv=`uniform sampler2D shadow_pass;
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
}`,sv=[new S(1,0,0),new S(-1,0,0),new S(0,1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1)],rv=[new S(0,-1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1),new S(0,-1,0),new S(0,-1,0)],Wf=new ut,Vo=new S,Bu=new S;function ov(i,e,t){let n=new yr,s=new Me,r=new Me,o=new It,a=new Wa,l=new Xa,c={},u=t.maxTextureSize,d={[jn]:Tn,[Tn]:jn,[kt]:kt},h=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:nv,fragmentShader:iv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new At;m.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new $e(m,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Us;let g=this.type;this.render=function(R,T,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;this.type===Pd&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Us);let C=i.getRenderTarget(),N=i.getActiveCubeFace(),H=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Si),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let k=g!==this.type;k&&T.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(W=>W.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,W=R.length;D<W;D++){let J=R[D],j=J.shadow;if(j===void 0){Ze("WebGLShadowMap:",J,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);let ae=j.getFrameExtents();s.multiply(ae),r.copy(j.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ae.x),s.x=r.x*ae.x,j.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ae.y),s.y=r.y*ae.y,j.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(j.camera._reversedDepth=X,j.map===null||k===!0){if(j.map!==null&&(j.map.depthTexture!==null&&(j.map.depthTexture.dispose(),j.map.depthTexture=null),j.map.dispose()),this.type===Rr){if(J.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}j.map=new Cn(s.x,s.y,{format:hs,type:ui,minFilter:jt,magFilter:jt,generateMipmaps:!1}),j.map.texture.name=J.name+".shadowMap",j.map.depthTexture=new is(s.x,s.y,zn),j.map.depthTexture.name=J.name+".shadowMapDepth",j.map.depthTexture.format=_i,j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Kt,j.map.depthTexture.magFilter=Kt}else J.isPointLight?(j.map=new jl(s.x),j.map.depthTexture=new Oa(s.x,ci)):(j.map=new Cn(s.x,s.y),j.map.depthTexture=new is(s.x,s.y,ci)),j.map.depthTexture.name=J.name+".shadowMap",j.map.depthTexture.format=_i,this.type===Us?(j.map.depthTexture.compareFunction=X?ql:Xl,j.map.depthTexture.minFilter=jt,j.map.depthTexture.magFilter=jt):(j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Kt,j.map.depthTexture.magFilter=Kt);j.camera.updateProjectionMatrix()}j.map.isWebGLCubeRenderTarget!==!0&&(j.map.width!==s.x||j.map.height!==s.y)&&j.map.setSize(s.x,s.y);let re=j.map.isWebGLCubeRenderTarget?6:j.getViewportCount();J.isPointLight!==!0&&j.updateMatrices(J,x);for(let ie=0;ie<re;ie++){let ye=j.getCamera(ie);if(J.isPointLight){let xe=j.camera,Ie=j.matrix,Xe=J.distance||xe.far;Xe!==xe.far&&(xe.far=Xe,xe.updateProjectionMatrix()),Vo.setFromMatrixPosition(J.matrixWorld),xe.position.copy(Vo),Bu.copy(xe.position),Bu.add(sv[ie]),xe.up.copy(rv[ie]),xe.lookAt(Bu),xe.updateMatrixWorld(),Ie.makeTranslation(-Vo.x,-Vo.y,-Vo.z),Wf.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),j._frustum.setFromProjectionMatrix(Wf,xe.coordinateSystem,xe.reversedDepth)}if(j.map.isWebGLCubeRenderTarget)i.setRenderTarget(j.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(j.map),i.clear());let xe=j.getViewport(ie);o.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),B.viewport(o)}n=j.getFrustum(ie),v(T,x,ye,J,this.type)}j.isPointLightShadow!==!0&&this.type===Rr&&b(j,x),j.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(C,N,H)};function b(R,T){let x=e.update(_);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null?R.mapPass=new Cn(s.x,s.y,{format:hs,type:ui}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),h.uniforms.shadow_pass.value=R.map.depthTexture,h.uniforms.resolution.value.set(R.map.width,R.map.height),h.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(T,null,x,h,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(T,null,x,f,_,null)}function A(R,T,x,C){let N=null,H=x.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(H!==void 0)N=H;else if(N=x.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let B=N.uuid,k=T.uuid,D=c[B];D===void 0&&(D={},c[B]=D);let W=D[k];W===void 0&&(W=N.clone(),D[k]=W,T.addEventListener("dispose",E)),N=W}if(N.visible=T.visible,N.wireframe=T.wireframe,C===Rr?N.side=T.shadowSide!==null?T.shadowSide:T.side:N.side=T.shadowSide!==null?T.shadowSide:d[T.side],N.alphaMap=T.alphaMap,N.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,N.map=T.map,N.clipShadows=T.clipShadows,N.clippingPlanes=T.clippingPlanes,N.clipIntersection=T.clipIntersection,N.displacementMap=T.displacementMap,N.displacementScale=T.displacementScale,N.displacementBias=T.displacementBias,N.wireframeLinewidth=T.wireframeLinewidth,N.linewidth=T.linewidth,x.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let B=i.properties.get(N);B.light=x}return N}function v(R,T,x,C,N){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&N===Rr)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,R.matrixWorld);let k=e.update(R),D=R.material;if(Array.isArray(D)){let W=k.groups;for(let J=0,j=W.length;J<j;J++){let ae=W[J],X=D[ae.materialIndex];if(X&&X.visible){let re=A(R,X,C,N);R.onBeforeShadow(i,R,T,x,k,re,ae),i.renderBufferDirect(x,null,k,re,R,ae),R.onAfterShadow(i,R,T,x,k,re,ae)}}}else if(D.visible){let W=A(R,D,C,N);R.onBeforeShadow(i,R,T,x,k,W,null),i.renderBufferDirect(x,null,k,W,R,null),R.onAfterShadow(i,R,T,x,k,W,null)}}let B=R.children;for(let k=0,D=B.length;k<D;k++)v(B[k],T,x,C,N)}function E(R){R.target.removeEventListener("dispose",E);for(let x in c){let C=c[x],N=R.target.uuid;N in C&&(C[N].dispose(),delete C[N])}}}function av(i,e){function t(){let L=!1,me=new It,se=null,ve=new It(0,0,0,0);return{setMask:function(de){se!==de&&!L&&(i.colorMask(de,de,de,de),se=de)},setLocked:function(de){L=de},setClear:function(de,fe,De,Ne,V){V===!0&&(de*=Ne,fe*=Ne,De*=Ne),me.set(de,fe,De,Ne),ve.equals(me)===!1&&(i.clearColor(de,fe,De,Ne),ve.copy(me))},reset:function(){L=!1,se=null,ve.set(-1,0,0,0)}}}function n(){let L=!1,me=!1,se=null,ve=null,de=null;return{setReversed:function(fe){if(me!==fe){let De=e.get("EXT_clip_control");fe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),me=fe;let Ne=de;de=null,this.setClear(Ne)}},getReversed:function(){return me},setTest:function(fe){fe?w(i.DEPTH_TEST):I(i.DEPTH_TEST)},setMask:function(fe){se!==fe&&!L&&(i.depthMask(fe),se=fe)},setFunc:function(fe){if(me&&(fe=mf[fe]),ve!==fe){switch(fe){case Ta:i.depthFunc(i.NEVER);break;case wa:i.depthFunc(i.ALWAYS);break;case Aa:i.depthFunc(i.LESS);break;case ar:i.depthFunc(i.LEQUAL);break;case Ra:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Pa:i.depthFunc(i.GREATER);break;case Ia:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=fe}},setLocked:function(fe){L=fe},setClear:function(fe){de!==fe&&(de=fe,me&&(fe=1-fe),i.clearDepth(fe))},reset:function(){L=!1,se=null,ve=null,de=null,me=!1}}}function s(){let L=!1,me=null,se=null,ve=null,de=null,fe=null,De=null,Ne=null,V=null;return{setTest:function(_e){L||(_e?w(i.STENCIL_TEST):I(i.STENCIL_TEST))},setMask:function(_e){me!==_e&&!L&&(i.stencilMask(_e),me=_e)},setFunc:function(_e,Ue,st){(se!==_e||ve!==Ue||de!==st)&&(i.stencilFunc(_e,Ue,st),se=_e,ve=Ue,de=st)},setOp:function(_e,Ue,st){(fe!==_e||De!==Ue||Ne!==st)&&(i.stencilOp(_e,Ue,st),fe=_e,De=Ue,Ne=st)},setLocked:function(_e){L=_e},setClear:function(_e){V!==_e&&(i.clearStencil(_e),V=_e)},reset:function(){L=!1,me=null,se=null,ve=null,de=null,fe=null,De=null,Ne=null,V=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],_=null,p=!1,g=null,b=null,A=null,v=null,E=null,R=null,T=null,x=new Qe(0,0,0),C=0,N=!1,H=null,B=null,k=null,D=null,W=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ae=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(X)[1]),j=ae>=1):X.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),j=ae>=2);let re=null,ie={},ye=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),Ie=new It().fromArray(ye),Xe=new It().fromArray(xe);function et(L,me,se,ve){let de=new Uint8Array(4),fe=i.createTexture();i.bindTexture(L,fe),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<se;De++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(me,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,de):i.texImage2D(me+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,de);return fe}let O={};O[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),O[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),O[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),w(i.DEPTH_TEST),o.setFunc(ar),le(!1),ge(Qc),w(i.CULL_FACE),Z(Si);function w(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function I(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function F(L,me){return h[L]!==me?(i.bindFramebuffer(L,me),h[L]=me,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=me),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=me),!0):!1}function U(L,me){let se=m,ve=!1;if(L){se=f.get(me),se===void 0&&(se=[],f.set(me,se));let de=L.textures;if(se.length!==de.length||se[0]!==i.COLOR_ATTACHMENT0){for(let fe=0,De=de.length;fe<De;fe++)se[fe]=i.COLOR_ATTACHMENT0+fe;se.length=de.length,ve=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,ve=!0);ve&&i.drawBuffers(se)}function ee(L){return _!==L?(i.useProgram(L),_=L,!0):!1}let he={[Fs]:i.FUNC_ADD,[Ld]:i.FUNC_SUBTRACT,[Dd]:i.FUNC_REVERSE_SUBTRACT};he[Nd]=i.MIN,he[Ud]=i.MAX;let q={[Fd]:i.ZERO,[Od]:i.ONE,[Bd]:i.SRC_COLOR,[iu]:i.SRC_ALPHA,[Wd]:i.SRC_ALPHA_SATURATE,[zd]:i.DST_COLOR,[kd]:i.DST_ALPHA,[Hd]:i.ONE_MINUS_SRC_COLOR,[su]:i.ONE_MINUS_SRC_ALPHA,[Gd]:i.ONE_MINUS_DST_COLOR,[Vd]:i.ONE_MINUS_DST_ALPHA,[Xd]:i.CONSTANT_COLOR,[qd]:i.ONE_MINUS_CONSTANT_COLOR,[Yd]:i.CONSTANT_ALPHA,[Zd]:i.ONE_MINUS_CONSTANT_ALPHA};function Z(L,me,se,ve,de,fe,De,Ne,V,_e){if(L===Si){p===!0&&(I(i.BLEND),p=!1);return}if(p===!1&&(w(i.BLEND),p=!0),L!==Id){if(L!==g||_e!==N){if((b!==Fs||E!==Fs)&&(i.blendEquation(i.FUNC_ADD),b=Fs,E=Fs),_e)switch(L){case Cr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eu:i.blendFunc(i.ONE,i.ONE);break;case tu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:tt("WebGLState: Invalid blending: ",L);break}else switch(L){case Cr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case tu:tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nu:tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:tt("WebGLState: Invalid blending: ",L);break}A=null,v=null,R=null,T=null,x.set(0,0,0),C=0,g=L,N=_e}return}de=de||me,fe=fe||se,De=De||ve,(me!==b||de!==E)&&(i.blendEquationSeparate(he[me],he[de]),b=me,E=de),(se!==A||ve!==v||fe!==R||De!==T)&&(i.blendFuncSeparate(q[se],q[ve],q[fe],q[De]),A=se,v=ve,R=fe,T=De),(Ne.equals(x)===!1||V!==C)&&(i.blendColor(Ne.r,Ne.g,Ne.b,V),x.copy(Ne),C=V),g=L,N=!1}function te(L,me){L.side===kt?I(i.CULL_FACE):w(i.CULL_FACE);let se=L.side===Tn;me&&(se=!se),le(se),L.blending===Cr&&L.transparent===!1?Z(Si):Z(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let ve=L.stencilWrite;a.setTest(ve),ve&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Fe(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?w(i.SAMPLE_ALPHA_TO_COVERAGE):I(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(L){H!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),H=L)}function ge(L){L!==Rd?(w(i.CULL_FACE),L!==B&&(L===Qc?i.cullFace(i.BACK):L===Cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):I(i.CULL_FACE),B=L}function Le(L){L!==k&&(j&&i.lineWidth(L),k=L)}function Fe(L,me,se){L?(w(i.POLYGON_OFFSET_FILL),(D!==me||W!==se)&&(D=me,W=se,o.getReversed()&&(me=-me),i.polygonOffset(me,se))):I(i.POLYGON_OFFSET_FILL)}function Se(L){L?w(i.SCISSOR_TEST):I(i.SCISSOR_TEST)}function Oe(L){L===void 0&&(L=i.TEXTURE0+J-1),re!==L&&(i.activeTexture(L),re=L)}function z(L,me,se){se===void 0&&(re===null?se=i.TEXTURE0+J-1:se=re);let ve=ie[se];ve===void 0&&(ve={type:void 0,texture:void 0},ie[se]=ve),(ve.type!==L||ve.texture!==me)&&(re!==se&&(i.activeTexture(se),re=se),i.bindTexture(L,me||O[L]),ve.type=L,ve.texture=me)}function gt(){let L=ie[re];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function it(){try{i.compressedTexImage2D(...arguments)}catch(L){tt("WebGLState:",L)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(L){tt("WebGLState:",L)}}function y(){try{i.texSubImage2D(...arguments)}catch(L){tt("WebGLState:",L)}}function Y(){try{i.texSubImage3D(...arguments)}catch(L){tt("WebGLState:",L)}}function ne(){try{i.compressedTexSubImage2D(...arguments)}catch(L){tt("WebGLState:",L)}}function ce(){try{i.compressedTexSubImage3D(...arguments)}catch(L){tt("WebGLState:",L)}}function be(){try{i.texStorage2D(...arguments)}catch(L){tt("WebGLState:",L)}}function Te(){try{i.texStorage3D(...arguments)}catch(L){tt("WebGLState:",L)}}function ue(){try{i.texImage2D(...arguments)}catch(L){tt("WebGLState:",L)}}function pe(){try{i.texImage3D(...arguments)}catch(L){tt("WebGLState:",L)}}function Ee(L){return d[L]!==void 0?d[L]:i.getParameter(L)}function qe(L,me){d[L]!==me&&(i.pixelStorei(L,me),d[L]=me)}function Ae(L){Ie.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Ie.copy(L))}function Re(L){Xe.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Xe.copy(L))}function ze(L,me){let se=c.get(me);se===void 0&&(se=new WeakMap,c.set(me,se));let ve=se.get(L);ve===void 0&&(ve=i.getUniformBlockIndex(me,L.name),se.set(L,ve))}function Ke(L,me){let ve=c.get(me).get(L);l.get(me)!==ve&&(i.uniformBlockBinding(me,ve,L.__bindingPointIndex),l.set(me,ve))}function rt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},h={},f=new WeakMap,m=[],_=null,p=!1,g=null,b=null,A=null,v=null,E=null,R=null,T=null,x=new Qe(0,0,0),C=0,N=!1,H=null,B=null,k=null,D=null,W=null,Ie.set(0,0,i.canvas.width,i.canvas.height),Xe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:w,disable:I,bindFramebuffer:F,drawBuffers:U,useProgram:ee,setBlending:Z,setMaterial:te,setFlipSided:le,setCullFace:ge,setLineWidth:Le,setPolygonOffset:Fe,setScissorTest:Se,activeTexture:Oe,bindTexture:z,unbindTexture:gt,compressedTexImage2D:it,compressedTexImage3D:P,texImage2D:ue,texImage3D:pe,pixelStorei:qe,getParameter:Ee,updateUBOMapping:ze,uniformBlockBinding:Ke,texStorage2D:be,texStorage3D:Te,texSubImage2D:y,texSubImage3D:Y,compressedTexSubImage2D:ne,compressedTexSubImage3D:ce,scissor:Ae,viewport:Re,reset:rt}}function lv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Me,u=new WeakMap,d=new Set,h,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,y){return m?new OffscreenCanvas(P,y):ur("canvas")}function p(P,y,Y){let ne=1,ce=it(P);if((ce.width>Y||ce.height>Y)&&(ne=Y/Math.max(ce.width,ce.height)),ne<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let be=Math.floor(ne*ce.width),Te=Math.floor(ne*ce.height);h===void 0&&(h=_(be,Te));let ue=y?_(be,Te):h;return ue.width=be,ue.height=Te,ue.getContext("2d").drawImage(P,0,0,be,Te),Ze("WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+be+"x"+Te+")."),ue}else return"data"in P&&Ze("WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),P;return P}function g(P){return P.generateMipmaps}function b(P){i.generateMipmap(P)}function A(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(P,y,Y,ne,ce,be=!1){if(P!==null){if(i[P]!==void 0)return i[P];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Te;ne&&(Te=e.get("EXT_texture_norm16"),Te||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=y;if(y===i.RED&&(Y===i.FLOAT&&(ue=i.R32F),Y===i.HALF_FLOAT&&(ue=i.R16F),Y===i.UNSIGNED_BYTE&&(ue=i.R8),Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.R16_EXT),Y===i.SHORT&&Te&&(ue=Te.R16_SNORM_EXT)),y===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.R8UI),Y===i.UNSIGNED_SHORT&&(ue=i.R16UI),Y===i.UNSIGNED_INT&&(ue=i.R32UI),Y===i.BYTE&&(ue=i.R8I),Y===i.SHORT&&(ue=i.R16I),Y===i.INT&&(ue=i.R32I)),y===i.RG&&(Y===i.FLOAT&&(ue=i.RG32F),Y===i.HALF_FLOAT&&(ue=i.RG16F),Y===i.UNSIGNED_BYTE&&(ue=i.RG8),Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.RG16_EXT),Y===i.SHORT&&Te&&(ue=Te.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.RG8UI),Y===i.UNSIGNED_SHORT&&(ue=i.RG16UI),Y===i.UNSIGNED_INT&&(ue=i.RG32UI),Y===i.BYTE&&(ue=i.RG8I),Y===i.SHORT&&(ue=i.RG16I),Y===i.INT&&(ue=i.RG32I)),y===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(ue=i.RGB16UI),Y===i.UNSIGNED_INT&&(ue=i.RGB32UI),Y===i.BYTE&&(ue=i.RGB8I),Y===i.SHORT&&(ue=i.RGB16I),Y===i.INT&&(ue=i.RGB32I)),y===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ue=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(ue=i.RGBA16UI),Y===i.UNSIGNED_INT&&(ue=i.RGBA32UI),Y===i.BYTE&&(ue=i.RGBA8I),Y===i.SHORT&&(ue=i.RGBA16I),Y===i.INT&&(ue=i.RGBA32I)),y===i.RGB&&(Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.RGB16_EXT),Y===i.SHORT&&Te&&(ue=Te.RGB16_SNORM_EXT),Y===i.UNSIGNED_INT_5_9_9_9_REV&&(ue=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(ue=i.R11F_G11F_B10F)),y===i.RGBA){let pe=be?io:_t.getTransfer(ce);Y===i.FLOAT&&(ue=i.RGBA32F),Y===i.HALF_FLOAT&&(ue=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(ue=pe===Ct?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT&&Te&&(ue=Te.RGBA16_EXT),Y===i.SHORT&&Te&&(ue=Te.RGBA16_SNORM_EXT),Y===i.UNSIGNED_SHORT_4_4_4_4&&(ue=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(ue=i.RGB5_A1)}return(ue===i.R16F||ue===i.R32F||ue===i.RG16F||ue===i.RG32F||ue===i.RGBA16F||ue===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function E(P,y){let Y;return P?y===null||y===ci||y===Lr?Y=i.DEPTH24_STENCIL8:y===zn?Y=i.DEPTH32F_STENCIL8:y===Ir&&(Y=i.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ci||y===Lr?Y=i.DEPTH_COMPONENT24:y===zn?Y=i.DEPTH_COMPONENT32F:y===Ir&&(Y=i.DEPTH_COMPONENT16),Y}function R(P,y){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Kt&&P.minFilter!==jt?Math.log2(Math.max(y.width,y.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?y.mipmaps.length:1}function T(P){let y=P.target;y.removeEventListener("dispose",T),C(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&d.delete(y)}function x(P){let y=P.target;y.removeEventListener("dispose",x),H(y)}function C(P){let y=n.get(P);if(y.__webglInit===void 0)return;let Y=P.source,ne=f.get(Y);if(ne){let ce=ne[y.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&N(P),Object.keys(ne).length===0&&f.delete(Y)}n.remove(P)}function N(P){let y=n.get(P);i.deleteTexture(y.__webglTexture);let Y=P.source,ne=f.get(Y);delete ne[y.__cacheKey],o.memory.textures--}function H(P){let y=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(y.__webglFramebuffer[ne]))for(let ce=0;ce<y.__webglFramebuffer[ne].length;ce++)i.deleteFramebuffer(y.__webglFramebuffer[ne][ce]);else i.deleteFramebuffer(y.__webglFramebuffer[ne]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[ne])}else{if(Array.isArray(y.__webglFramebuffer))for(let ne=0;ne<y.__webglFramebuffer.length;ne++)i.deleteFramebuffer(y.__webglFramebuffer[ne]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ne=0;ne<y.__webglColorRenderbuffer.length;ne++)y.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[ne]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let Y=P.textures;for(let ne=0,ce=Y.length;ne<ce;ne++){let be=n.get(Y[ne]);be.__webglTexture&&(i.deleteTexture(be.__webglTexture),o.memory.textures--),n.remove(Y[ne])}n.remove(P)}let B=0;function k(){B=0}function D(){return B}function W(P){B=P}function J(){let P=B;return P>=s.maxTextures&&Ze("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,P}function j(P){let y=[];return y.push(P.wrapS),y.push(P.wrapT),y.push(P.wrapR||0),y.push(P.magFilter),y.push(P.minFilter),y.push(P.anisotropy),y.push(P.internalFormat),y.push(P.format),y.push(P.type),y.push(P.generateMipmaps),y.push(P.premultiplyAlpha),y.push(P.flipY),y.push(P.unpackAlignment),y.push(P.colorSpace),y.join()}function ae(P,y){let Y=n.get(P);if(P.isVideoTexture&&z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&Y.__version!==P.version){let ne=P.image;if(ne===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{I(Y,P,y);return}}else P.isExternalTexture&&(Y.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+y)}function X(P,y){let Y=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){I(Y,P,y);return}else P.isExternalTexture&&(Y.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+y)}function re(P,y){let Y=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){I(Y,P,y);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+y)}function ie(P,y){let Y=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&Y.__version!==P.version){F(Y,P,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+y)}let ye={[gi]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[lr]:i.MIRRORED_REPEAT},xe={[Kt]:i.NEAREST,[rl]:i.NEAREST_MIPMAP_NEAREST,[Bs]:i.NEAREST_MIPMAP_LINEAR,[jt]:i.LINEAR,[Pr]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},Ie={[of]:i.NEVER,[hf]:i.ALWAYS,[af]:i.LESS,[Xl]:i.LEQUAL,[lf]:i.EQUAL,[ql]:i.GEQUAL,[cf]:i.GREATER,[uf]:i.NOTEQUAL};function Xe(P,y){if(y.type===zn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===jt||y.magFilter===Pr||y.magFilter===Bs||y.magFilter===li||y.minFilter===jt||y.minFilter===Pr||y.minFilter===Bs||y.minFilter===li)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ye[y.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ye[y.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ye[y.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,xe[y.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,xe[y.minFilter]),y.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Ie[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Kt||y.minFilter!==Bs&&y.minFilter!==li||y.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function et(P,y){let Y=!1;P.__webglInit===void 0&&(P.__webglInit=!0,y.addEventListener("dispose",T));let ne=y.source,ce=f.get(ne);ce===void 0&&(ce={},f.set(ne,ce));let be=j(y);if(be!==P.__cacheKey){ce[be]===void 0&&(ce[be]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),ce[be].usedTimes++;let Te=ce[P.__cacheKey];Te!==void 0&&(ce[P.__cacheKey].usedTimes--,Te.usedTimes===0&&N(y)),P.__cacheKey=be,P.__webglTexture=ce[be].texture}return Y}function O(P,y,Y){return Math.floor(Math.floor(P/Y)/y)}function w(P,y,Y,ne){let be=P.updateRanges;if(be.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,Y,ne,y.data);else{be.sort((qe,Ae)=>qe.start-Ae.start);let Te=0;for(let qe=1;qe<be.length;qe++){let Ae=be[Te],Re=be[qe],ze=Ae.start+Ae.count,Ke=O(Re.start,y.width,4),rt=O(Ae.start,y.width,4);Re.start<=ze+1&&Ke===rt&&O(Re.start+Re.count-1,y.width,4)===Ke?Ae.count=Math.max(Ae.count,Re.start+Re.count-Ae.start):(++Te,be[Te]=Re)}be.length=Te+1;let ue=t.getParameter(i.UNPACK_ROW_LENGTH),pe=t.getParameter(i.UNPACK_SKIP_PIXELS),Ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let qe=0,Ae=be.length;qe<Ae;qe++){let Re=be[qe],ze=Math.floor(Re.start/4),Ke=Math.ceil(Re.count/4),rt=ze%y.width,L=Math.floor(ze/y.width),me=Ke,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),t.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,rt,L,me,se,Y,ne,y.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ue),t.pixelStorei(i.UNPACK_SKIP_PIXELS,pe),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function I(P,y,Y){let ne=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ne=i.TEXTURE_3D);let ce=et(P,y),be=y.source;t.bindTexture(ne,P.__webglTexture,i.TEXTURE0+Y);let Te=n.get(be);if(be.version!==Te.__version||ce===!0){if(t.activeTexture(i.TEXTURE0+Y),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let se=_t.getPrimaries(_t.workingColorSpace),ve=y.colorSpace===Gi?null:_t.getPrimaries(y.colorSpace),de=y.colorSpace===Gi||se===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let pe=p(y.image,!1,s.maxTextureSize);pe=gt(y,pe);let Ee=r.convert(y.format,y.colorSpace),qe=r.convert(y.type),Ae=v(y.internalFormat,Ee,qe,y.normalized,y.colorSpace,y.isVideoTexture);Xe(ne,y);let Re,ze=y.mipmaps,Ke=y.isVideoTexture!==!0,rt=Te.__version===void 0||ce===!0,L=be.dataReady,me=R(y,pe);if(y.isDepthTexture)Ae=E(y.format===us,y.type),rt&&(Ke?t.texStorage2D(i.TEXTURE_2D,1,Ae,pe.width,pe.height):t.texImage2D(i.TEXTURE_2D,0,Ae,pe.width,pe.height,0,Ee,qe,null));else if(y.isDataTexture)if(ze.length>0){Ke&&rt&&t.texStorage2D(i.TEXTURE_2D,me,Ae,ze[0].width,ze[0].height);for(let se=0,ve=ze.length;se<ve;se++)Re=ze[se],Ke?L&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,Re.width,Re.height,Ee,qe,Re.data):t.texImage2D(i.TEXTURE_2D,se,Ae,Re.width,Re.height,0,Ee,qe,Re.data);y.generateMipmaps=!1}else Ke?(rt&&t.texStorage2D(i.TEXTURE_2D,me,Ae,pe.width,pe.height),L&&w(y,pe,Ee,qe)):t.texImage2D(i.TEXTURE_2D,0,Ae,pe.width,pe.height,0,Ee,qe,pe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ke&&rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Ae,ze[0].width,ze[0].height,pe.depth);for(let se=0,ve=ze.length;se<ve;se++)if(Re=ze[se],y.format!==Gn)if(Ee!==null)if(Ke){if(L)if(y.layerUpdates.size>0){let de=Au(Re.width,Re.height,y.format,y.type);for(let fe of y.layerUpdates){let De=Re.data.subarray(fe*de/Re.data.BYTES_PER_ELEMENT,(fe+1)*de/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,fe,Re.width,Re.height,1,Ee,De)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,Re.width,Re.height,pe.depth,Ee,Re.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Ae,Re.width,Re.height,pe.depth,0,Re.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ke?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,Re.width,Re.height,pe.depth,Ee,qe,Re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Ae,Re.width,Re.height,pe.depth,0,Ee,qe,Re.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Ke&&rt&&t.texStorage2D(i.TEXTURE_2D,me,Ae,ze[0].width,ze[0].height);for(let se=0,ve=ze.length;se<ve;se++)Re=ze[se],y.format!==Gn?Ee!==null?Ke?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,Re.width,Re.height,Ee,Re.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Ae,Re.width,Re.height,0,Re.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?L&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,Re.width,Re.height,Ee,qe,Re.data):t.texImage2D(i.TEXTURE_2D,se,Ae,Re.width,Re.height,0,Ee,qe,Re.data)}else if(y.isDataArrayTexture)if(Ke){if(rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Ae,pe.width,pe.height,pe.depth),L)if(y.layerUpdates.size>0){let se=Au(pe.width,pe.height,y.format,y.type);for(let ve of y.layerUpdates){let de=pe.data.subarray(ve*se/pe.data.BYTES_PER_ELEMENT,(ve+1)*se/pe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,pe.width,pe.height,1,Ee,qe,de)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Ee,qe,pe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,pe.width,pe.height,pe.depth,0,Ee,qe,pe.data);else if(y.isData3DTexture)Ke?(rt&&t.texStorage3D(i.TEXTURE_3D,me,Ae,pe.width,pe.height,pe.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Ee,qe,pe.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,pe.width,pe.height,pe.depth,0,Ee,qe,pe.data);else if(y.isFramebufferTexture){if(rt)if(Ke)t.texStorage2D(i.TEXTURE_2D,me,Ae,pe.width,pe.height);else{let se=pe.width,ve=pe.height;for(let de=0;de<me;de++)t.texImage2D(i.TEXTURE_2D,de,Ae,se,ve,0,Ee,qe,null),se>>=1,ve>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),pe.parentNode!==se){se.appendChild(pe),d.add(y),se.onpaint=ve=>{let de=ve.changedElements;for(let fe of d)de.includes(fe.image)&&(fe.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,pe);else{let de=i.RGBA,fe=i.RGBA,De=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,de,fe,De,pe)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ze.length>0){if(Ke&&rt){let se=it(ze[0]);t.texStorage2D(i.TEXTURE_2D,me,Ae,se.width,se.height)}for(let se=0,ve=ze.length;se<ve;se++)Re=ze[se],Ke?L&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,Ee,qe,Re):t.texImage2D(i.TEXTURE_2D,se,Ae,Ee,qe,Re);y.generateMipmaps=!1}else if(Ke){if(rt){let se=it(pe);t.texStorage2D(i.TEXTURE_2D,me,Ae,se.width,se.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,qe,pe)}else t.texImage2D(i.TEXTURE_2D,0,Ae,Ee,qe,pe);g(y)&&b(ne),Te.__version=be.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function F(P,y,Y){if(y.image.length!==6)return;let ne=et(P,y),ce=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+Y);let be=n.get(ce);if(ce.version!==be.__version||ne===!0){t.activeTexture(i.TEXTURE0+Y);let Te=_t.getPrimaries(_t.workingColorSpace),ue=y.colorSpace===Gi?null:_t.getPrimaries(y.colorSpace),pe=y.colorSpace===Gi||Te===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let Ee=y.isCompressedTexture||y.image[0].isCompressedTexture,qe=y.image[0]&&y.image[0].isDataTexture,Ae=[];for(let fe=0;fe<6;fe++)!Ee&&!qe?Ae[fe]=p(y.image[fe],!0,s.maxCubemapSize):Ae[fe]=qe?y.image[fe].image:y.image[fe],Ae[fe]=gt(y,Ae[fe]);let Re=Ae[0],ze=r.convert(y.format,y.colorSpace),Ke=r.convert(y.type),rt=v(y.internalFormat,ze,Ke,y.normalized,y.colorSpace),L=y.isVideoTexture!==!0,me=be.__version===void 0||ne===!0,se=ce.dataReady,ve=R(y,Re);Xe(i.TEXTURE_CUBE_MAP,y);let de;if(Ee){L&&me&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,rt,Re.width,Re.height);for(let fe=0;fe<6;fe++){de=Ae[fe].mipmaps;for(let De=0;De<de.length;De++){let Ne=de[De];y.format!==Gn?ze!==null?L?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,0,0,Ne.width,Ne.height,ze,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,rt,Ne.width,Ne.height,0,Ne.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,0,0,Ne.width,Ne.height,ze,Ke,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De,rt,Ne.width,Ne.height,0,ze,Ke,Ne.data)}}}else{if(de=y.mipmaps,L&&me){de.length>0&&ve++;let fe=it(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,rt,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(qe){L?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ae[fe].width,Ae[fe].height,ze,Ke,Ae[fe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,rt,Ae[fe].width,Ae[fe].height,0,ze,Ke,Ae[fe].data);for(let De=0;De<de.length;De++){let V=de[De].image[fe].image;L?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,0,0,V.width,V.height,ze,Ke,V.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,rt,V.width,V.height,0,ze,Ke,V.data)}}else{L?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,ze,Ke,Ae[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,rt,ze,Ke,Ae[fe]);for(let De=0;De<de.length;De++){let Ne=de[De];L?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,0,0,ze,Ke,Ne.image[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,De+1,rt,ze,Ke,Ne.image[fe])}}}g(y)&&b(i.TEXTURE_CUBE_MAP),be.__version=ce.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function U(P,y,Y,ne,ce,be){let Te=r.convert(Y.format,Y.colorSpace),ue=r.convert(Y.type),pe=v(Y.internalFormat,Te,ue,Y.normalized,Y.colorSpace),Ee=n.get(y),qe=n.get(Y);if(qe.__renderTarget=y,!Ee.__hasExternalTextures){let Ae=Math.max(1,y.width>>be),Re=Math.max(1,y.height>>be);ce===i.TEXTURE_3D||ce===i.TEXTURE_2D_ARRAY?t.texImage3D(ce,be,pe,Ae,Re,y.depth,0,Te,ue,null):t.texImage2D(ce,be,pe,Ae,Re,0,Te,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Oe(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ce,qe.__webglTexture,0,Se(y)):(ce===i.TEXTURE_2D||ce>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,ce,qe.__webglTexture,be),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(P,y,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,P),y.depthBuffer){let ne=y.depthTexture,ce=ne&&ne.isDepthTexture?ne.type:null,be=E(y.stencilBuffer,ce),Te=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Oe(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(y),be,y.width,y.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(y),be,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,be,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,P)}else{let ne=y.textures;for(let ce=0;ce<ne.length;ce++){let be=ne[ce],Te=r.convert(be.format,be.colorSpace),ue=r.convert(be.type),pe=v(be.internalFormat,Te,ue,be.normalized,be.colorSpace);Oe(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(y),pe,y.width,y.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(y),pe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,pe,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(P,y,Y){let ne=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ce=n.get(y.depthTexture);if(ce.__renderTarget=y,(!ce.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),ne){if(ce.__webglInit===void 0&&(ce.__webglInit=!0,y.depthTexture.addEventListener("dispose",T)),ce.__webglTexture===void 0){ce.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,y.depthTexture);let Ee=r.convert(y.depthTexture.format),qe=r.convert(y.depthTexture.type),Ae;y.depthTexture.format===_i?Ae=i.DEPTH_COMPONENT24:y.depthTexture.format===us&&(Ae=i.DEPTH24_STENCIL8);for(let Re=0;Re<6;Re++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,Ae,y.width,y.height,0,Ee,qe,null)}}else ae(y.depthTexture,0);let be=ce.__webglTexture,Te=Se(y),ue=ne?i.TEXTURE_CUBE_MAP_POSITIVE_X+Y:i.TEXTURE_2D,pe=y.depthTexture.format===us?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===_i)Oe(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pe,ue,be,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,pe,ue,be,0);else if(y.depthTexture.format===us)Oe(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pe,ue,be,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,pe,ue,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function q(P){let y=n.get(P),Y=P.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==P.depthTexture){let ne=P.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ne){let ce=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ne.removeEventListener("dispose",ce)};ne.addEventListener("dispose",ce),y.__depthDisposeCallback=ce}y.__boundDepthTexture=ne}if(P.depthTexture&&!y.__autoAllocateDepthBuffer)if(Y)for(let ne=0;ne<6;ne++)he(y.__webglFramebuffer[ne],P,ne);else{let ne=P.texture.mipmaps;ne&&ne.length>0?he(y.__webglFramebuffer[0],P,0):he(y.__webglFramebuffer,P,0)}else if(Y){y.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[ne]),y.__webglDepthbuffer[ne]===void 0)y.__webglDepthbuffer[ne]=i.createRenderbuffer(),ee(y.__webglDepthbuffer[ne],P,!1);else{let ce=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=y.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,be),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,be)}}else{let ne=P.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),ee(y.__webglDepthbuffer,P,!1);else{let ce=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,be),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,be)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(P,y,Y){let ne=n.get(P);y!==void 0&&U(ne.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&q(P)}function te(P){let y=P.texture,Y=n.get(P),ne=n.get(y);P.addEventListener("dispose",x);let ce=P.textures,be=P.isWebGLCubeRenderTarget===!0,Te=ce.length>1;if(Te||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=y.version,o.memory.textures++),be){Y.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0){Y.__webglFramebuffer[ue]=[];for(let pe=0;pe<y.mipmaps.length;pe++)Y.__webglFramebuffer[ue][pe]=i.createFramebuffer()}else Y.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ue=0;ue<y.mipmaps.length;ue++)Y.__webglFramebuffer[ue]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ue=0,pe=ce.length;ue<pe;ue++){let Ee=n.get(ce[ue]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Oe(P)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ue=0;ue<ce.length;ue++){let pe=ce[ue];Y.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ue]);let Ee=r.convert(pe.format,pe.colorSpace),qe=r.convert(pe.type),Ae=v(pe.internalFormat,Ee,qe,pe.normalized,pe.colorSpace,P.isXRRenderTarget===!0),Re=Se(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,Ae,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),ee(Y.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(be){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,y);for(let ue=0;ue<6;ue++)if(y.mipmaps&&y.mipmaps.length>0)for(let pe=0;pe<y.mipmaps.length;pe++)U(Y.__webglFramebuffer[ue][pe],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,pe);else U(Y.__webglFramebuffer[ue],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);g(y)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let ue=0,pe=ce.length;ue<pe;ue++){let Ee=ce[ue],qe=n.get(Ee),Ae=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ae=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ae,qe.__webglTexture),Xe(Ae,Ee),U(Y.__webglFramebuffer,P,Ee,i.COLOR_ATTACHMENT0+ue,Ae,0),g(Ee)&&b(Ae)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ue=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ne.__webglTexture),Xe(ue,y),y.mipmaps&&y.mipmaps.length>0)for(let pe=0;pe<y.mipmaps.length;pe++)U(Y.__webglFramebuffer[pe],P,y,i.COLOR_ATTACHMENT0,ue,pe);else U(Y.__webglFramebuffer,P,y,i.COLOR_ATTACHMENT0,ue,0);g(y)&&b(ue),t.unbindTexture()}P.depthBuffer&&q(P)}function le(P){let y=P.textures;for(let Y=0,ne=y.length;Y<ne;Y++){let ce=y[Y];if(g(ce)){let be=A(P),Te=n.get(ce).__webglTexture;t.bindTexture(be,Te),b(be),t.unbindTexture()}}}let ge=[],Le=[];function Fe(P){if(P.samples>0){if(Oe(P)===!1){let y=P.textures,Y=P.width,ne=P.height,ce=i.COLOR_BUFFER_BIT,be=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(P),ue=y.length>1;if(ue)for(let Ee=0;Ee<y.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);let pe=P.texture.mipmaps;pe&&pe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Ee=0;Ee<y.length;Ee++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ce|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ce|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);let qe=n.get(y[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qe,0)}i.blitFramebuffer(0,0,Y,ne,0,0,Y,ne,ce,i.NEAREST),l===!0&&(ge.length=0,Le.length=0,ge.push(i.COLOR_ATTACHMENT0+Ee),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(ge.push(be),Le.push(be),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Ee=0;Ee<y.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Ee]);let qe=n.get(y[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Se(P){return Math.min(s.maxSamples,P.samples)}function Oe(P){let y=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function z(P){let y=o.render.frame;u.get(P)!==y&&(u.set(P,y),P.update())}function gt(P,y){let Y=P.colorSpace,ne=P.format,ce=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Y!==En&&Y!==Gi&&(_t.getTransfer(Y)===Ct?(ne!==Gn||ce!==Nn)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):tt("WebGLTextures: Unsupported texture color space:",Y)),y}function it(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=k,this.getTextureUnits=D,this.setTextureUnits=W,this.setTexture2D=ae,this.setTexture2DArray=X,this.setTexture3D=re,this.setTextureCube=ie,this.rebindTextures=Z,this.setupRenderTarget=te,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=U,this.useMultisampledRTT=Oe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function cv(i,e){function t(n,s=Gi){let r,o=_t.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===al)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fu)return i.BYTE;if(n===pu)return i.SHORT;if(n===Ir)return i.UNSIGNED_SHORT;if(n===ol)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===zn)return i.FLOAT;if(n===ui)return i.HALF_FLOAT;if(n===_u)return i.ALPHA;if(n===xu)return i.RGB;if(n===Gn)return i.RGBA;if(n===_i)return i.DEPTH_COMPONENT;if(n===us)return i.DEPTH_STENCIL;if(n===cl)return i.RED;if(n===ul)return i.RED_INTEGER;if(n===hs)return i.RG;if(n===hl)return i.RG_INTEGER;if(n===dl)return i.RGBA_INTEGER;if(n===Do||n===No||n===Uo||n===Fo)if(o===Ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Do)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Do)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fl||n===pl||n===ml||n===gl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_l||n===xl||n===yl||n===vl||n===Ml||n===Oo||n===bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_l||n===xl)return o===Ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vl)return r.COMPRESSED_R11_EAC;if(n===Ml)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Oo)return r.COMPRESSED_RG11_EAC;if(n===bl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Sl||n===El||n===Tl||n===wl||n===Al||n===Rl||n===Cl||n===Pl||n===Il||n===Ll||n===Dl||n===Nl||n===Ul||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Al)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Pl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Il)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Nl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ul)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return o===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ol||n===Bl||n===Hl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ol)return o===Ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kl||n===Vl||n===Bo||n===zl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===kl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Lr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var uv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hv=`
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

}`,qu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new po(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Vn({vertexShader:uv,fragmentShader:hv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $e(new un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yu=class extends Kn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null,_=typeof XRWebGLBinding<"u",p=new qu,g={},b=t.getContextAttributes(),A=null,v=null,E=[],R=[],T=new Me,x=null,C=null,N=new sn;N.viewport=new It;let H=new sn;H.viewport=new It;let B=[N,H],k=new Qa,D=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let w=E[O];return w===void 0&&(w=new pr,E[O]=w),w.getTargetRaySpace()},this.getControllerGrip=function(O){let w=E[O];return w===void 0&&(w=new pr,E[O]=w),w.getGripSpace()},this.getHand=function(O){let w=E[O];return w===void 0&&(w=new pr,E[O]=w),w.getHandSpace()};function J(O){let w=R.indexOf(O.inputSource);if(w===-1)return;let I=E[w];I!==void 0&&(I.update(O.inputSource,O.frame,c||o),I.dispatchEvent({type:O.type,data:O.inputSource}))}function j(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",ae);for(let O=0;O<E.length;O++){let w=R[O];w!==null&&(R[O]=null,E[O].disconnect(w))}D=null,W=null,p.reset();for(let O in g)delete g[O];if(e.setRenderTarget(A),f=null,h=null,d=null,s=null,v=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(T.width,T.height,!1),C!==null){let O=C.camera;O.fov=C.fov,O.zoom=C.zoom,O.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,n.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",j),s.addEventListener("inputsourceschange",ae),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let I=null,F=null,U=null;b.depth&&(U=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,I=b.stencil?us:_i,F=b.stencil?Lr:ci);let ee={colorFormat:t.RGBA8,depthFormat:U,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(ee),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Cn(h.textureWidth,h.textureHeight,{format:Gn,type:Nn,depthTexture:new is(h.textureWidth,h.textureHeight,F,void 0,void 0,void 0,void 0,void 0,void 0,I),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let I={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,I),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Cn(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),et.setContext(s),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ae(O){for(let w=0;w<O.removed.length;w++){let I=O.removed[w],F=R.indexOf(I);F>=0&&(R[F]=null,E[F].disconnect(I))}for(let w=0;w<O.added.length;w++){let I=O.added[w],F=R.indexOf(I);if(F===-1){for(let ee=0;ee<E.length;ee++)if(ee>=R.length){R.push(I),F=ee;break}else if(R[ee]===null){R[ee]=I,F=ee;break}if(F===-1)break}let U=E[F];U&&U.connect(I)}}let X=new S,re=new S;function ie(O,w,I){X.setFromMatrixPosition(w.matrixWorld),re.setFromMatrixPosition(I.matrixWorld);let F=X.distanceTo(re),U=w.projectionMatrix.elements,ee=I.projectionMatrix.elements,he=U[14]/(U[10]-1),q=U[14]/(U[10]+1),Z=(U[9]+1)/U[5],te=(U[9]-1)/U[5],le=(U[8]-1)/U[0],ge=(ee[8]+1)/ee[0],Le=he*le,Fe=he*ge,Se=F/(-le+ge),Oe=Se*-le;if(w.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Oe),O.translateZ(Se),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),U[10]===-1)O.projectionMatrix.copy(w.projectionMatrix),O.projectionMatrixInverse.copy(w.projectionMatrixInverse);else{let z=he+Se,gt=q+Se,it=Le-Oe,P=Fe+(F-Oe),y=Z*q/gt*z,Y=te*q/gt*z;O.projectionMatrix.makePerspective(it,P,y,Y,z,gt),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function ye(O,w){w===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(w.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;let w=O.near,I=O.far;p.texture!==null&&(p.depthNear>0&&(w=p.depthNear),p.depthFar>0&&(I=p.depthFar)),k.near=H.near=N.near=w,k.far=H.far=N.far=I,(D!==k.near||W!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),D=k.near,W=k.far),k.layers.mask=O.layers.mask|6,N.layers.mask=k.layers.mask&-5,H.layers.mask=k.layers.mask&-3;let F=O.parent,U=k.cameras;ye(k,F);for(let ee=0;ee<U.length;ee++)ye(U[ee],F);U.length===2?ie(k,N,H):k.projectionMatrix.copy(N.projectionMatrix),C===null&&O.isPerspectiveCamera&&(C={camera:O,fov:O.fov,zoom:O.zoom}),xe(O,k,F)};function xe(O,w,I){I===null?O.matrix.copy(w.matrixWorld):(O.matrix.copy(I.matrixWorld),O.matrix.invert(),O.matrix.multiply(w.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(w.projectionMatrix),O.projectionMatrixInverse.copy(w.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Ts*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(O){l=O,h!==null&&(h.fixedFoveation=O),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=O)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(k)},this.getCameraTexture=function(O){return g[O]};let Ie=null;function Xe(O,w){if(u=w.getViewerPose(c||o),m=w,u!==null){let I=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let F=!1;I.length!==k.cameras.length&&(k.cameras.length=0,F=!0);for(let q=0;q<I.length;q++){let Z=I[q],te=null;if(f!==null)te=f.getViewport(Z);else{let ge=d.getViewSubImage(h,Z);te=ge.viewport,q===0&&(e.setRenderTargetTextures(v,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(v))}let le=B[q];le===void 0&&(le=new sn,le.layers.enable(q),le.viewport=new It,B[q]=le),le.matrix.fromArray(Z.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(Z.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(te.x,te.y,te.width,te.height),q===0&&(k.matrix.copy(le.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),F===!0&&k.cameras.push(le)}let U=s.enabledFeatures;if(U&&U.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let q=d.getDepthInformation(I[0]);q&&q.isValid&&q.texture&&p.init(q,s.renderState)}if(U&&U.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let q=0;q<I.length;q++){let Z=I[q].camera;if(Z){let te=g[Z];te||(te=new po,g[Z]=te);let le=d.getCameraImage(Z);te.sourceTexture=le}}}}for(let I=0;I<E.length;I++){let F=R[I],U=E[I];F!==null&&U!==void 0&&U.update(F,w,c||o)}Ie&&Ie(O,w),w.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:w}),m=null}let et=new Xf;et.setAnimationLoop(Xe),this.setAnimationLoop=function(O){Ie=O},this.dispose=function(){}}},dv=new ut,$f=new at;$f.set(-1,0,0,0,1,0,0,0,1);function fv(i,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Eu(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,b,A,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),h(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?l(p,g,b,A):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Tn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Tn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let b=e.get(g),A=b.envMap,v=b.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(dv.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply($f),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,b,A){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*b,p.scale.value=A*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function h(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,b){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Tn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let b=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function pv(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){let R=E.program;n.uniformBlockBinding(v,R)}function c(v,E){let R=s[v.id];R===void 0&&(p(v),R=u(v),s[v.id]=R,v.addEventListener("dispose",b));let T=E.program;n.updateUBOMapping(v,T);let x=e.render.frame;r[v.id]!==x&&(h(v),r[v.id]=x)}function u(v){let E=d();v.__bindingPointIndex=E;let R=i.createBuffer(),T=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,R),i.bufferData(i.UNIFORM_BUFFER,T,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,R),R}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let E=s[v.id],R=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let x=0,C=R.length;x<C;x++){let N=R[x];if(Array.isArray(N))for(let H=0,B=N.length;H<B;H++)f(N[H],x,H,T);else f(N,x,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,E,R,T){if(_(v,E,R,T)===!0){let x=v.__offset,C=v.value;if(Array.isArray(C)){let N=0;for(let H=0;H<C.length;H++){let B=C[H],k=g(B);m(B,v.__data,N),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(N+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(C,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function m(v,E,R){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,R)}function _(v,E,R,T){let x=v.value,C=E+"_"+R;if(T[C]===void 0)return typeof x=="number"||typeof x=="boolean"?T[C]=x:ArrayBuffer.isView(x)?T[C]=x.slice():T[C]=x.clone(),!0;{let N=T[C];if(typeof x=="number"||typeof x=="boolean"){if(N!==x)return T[C]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(N.equals(x)===!1)return N.copy(x),!0}}return!1}function p(v){let E=v.uniforms,R=0,T=16;for(let C=0,N=E.length;C<N;C++){let H=Array.isArray(E[C])?E[C]:[E[C]];for(let B=0,k=H.length;B<k;B++){let D=H[B],W=Array.isArray(D.value)?D.value:[D.value];for(let J=0,j=W.length;J<j;J++){let ae=W[J],X=g(ae),re=R%T,ie=re%X.boundary,ye=re+ie;R+=ie,ye!==0&&T-ye<X.storage&&(R+=T-ye),D.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=R,R+=X.storage}}}let x=R%T;return x>0&&(R+=T-x),v.__size=R,v.__cache={},this}function g(v){let E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",v),E}function b(v){let E=v.target;E.removeEventListener("dispose",b);let R=o.indexOf(E.__bindingPointIndex);o.splice(R,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function A(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:A}}var mv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ei=null;function gv(){return Ei===null&&(Ei=new xr(mv,16,16,hs,ui),Ei.name="DFG_LUT",Ei.minFilter=jt,Ei.magFilter=jt,Ei.wrapS=Yn,Ei.wrapT=Yn,Ei.generateMipmaps=!1,Ei.needsUpdate=!0),Ei}var $l=class{constructor(e={}){let{canvas:t=df(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Nn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let _=f,p=new Set([dl,hl,ul]),g=new Set([Nn,ci,Ir,Lr,al,ll]),b=new Uint32Array(4),A=new Int32Array(4),v=new S,E=null,R=null,T=[],x=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,H=!1,B=null,k=null,D=null,W=null;this._outputColorSpace=St;let J=0,j=0,ae=null,X=-1,re=null,ie=new It,ye=new It,xe=null,Ie=new Qe(0),Xe=0,et=t.width,O=t.height,w=1,I=null,F=null,U=new It(0,0,et,O),ee=new It(0,0,et,O),he=!1,q=new yr,Z=!1,te=!1,le=new ut,ge=new S,Le=new It,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Oe(){return ae===null?w:1}let z=n;function gt(M,G){return t.getContext(M,G)}let it,P,y,Y,ne,ce,be,Te,ue,pe,Ee,qe,Ae,Re,ze,Ke,rt,L,me,se,ve,de,fe;try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",V,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",Ue,!1),z===null){let G="webgl2";if(z=gt(G,M),z===null)throw gt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(M){throw t.removeEventListener("webglcontextlost",V,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",Ue,!1),tt("WebGLRenderer: "+M.message),M}function De(){it=new Sx(z),it.init(),ve=new cv(z,it),P=new fx(z,it,e,ve),y=new av(z,it),P.reversedDepthBuffer&&h&&y.buffers.depth.setReversed(!0),k=z.createFramebuffer(),D=z.createFramebuffer(),W=z.createFramebuffer(),Y=new wx(z),ne=new Yy,ce=new lv(z,it,y,ne,P,ve,Y),be=new bx(N),Te=new R0(z),de=new hx(z,Te),ue=new Ex(z,Te,Y,de),pe=new Rx(z,ue,Te,de,Y),L=new Ax(z,P,ce),ze=new px(ne),Ee=new qy(N,be,it,P,de,ze),qe=new fv(N,ne),Ae=new Ky,Re=new tv(it),rt=new ux(N,be,y,pe,m,l),Ke=new ov(N,pe,P),fe=new pv(z,Y,P,y),me=new dx(z,it,Y),se=new Tx(z,it,Y),Y.programs=Ee.programs,N.capabilities=P,N.extensions=it,N.properties=ne,N.renderLists=Ae,N.shadowMap=Ke,N.state=y,N.info=Y}_!==Nn&&(C=new Px(_,t.width,t.height,a,s,r));let Ne=new Yu(N,z);this.xr=Ne,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let M=it.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=it.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return w},this.setPixelRatio=function(M){M!==void 0&&(w=M,this.setSize(et,O,!1))},this.getSize=function(M){return M.set(et,O)},this.setSize=function(M,G,$=!0){if(Ne.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}et=M,O=G,t.width=Math.floor(M*w),t.height=Math.floor(G*w),$===!0&&(t.style.width=M+"px",t.style.height=G+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,M,G)},this.getDrawingBufferSize=function(M){return M.set(et*w,O*w).floor()},this.setDrawingBufferSize=function(M,G,$){et=M,O=G,w=$,t.width=Math.floor(M*$),t.height=Math.floor(G*$),this.setViewport(0,0,M,G)},this.setEffects=function(M){if(_===Nn){tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let G=0;G<M.length;G++)if(M[G].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ie)},this.getViewport=function(M){return M.copy(U)},this.setViewport=function(M,G,$,K){M.isVector4?U.set(M.x,M.y,M.z,M.w):U.set(M,G,$,K),y.viewport(ie.copy(U).multiplyScalar(w).round())},this.getScissor=function(M){return M.copy(ee)},this.setScissor=function(M,G,$,K){M.isVector4?ee.set(M.x,M.y,M.z,M.w):ee.set(M,G,$,K),y.scissor(ye.copy(ee).multiplyScalar(w).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(M){y.setScissorTest(he=M)},this.setOpaqueSort=function(M){I=M},this.setTransparentSort=function(M){F=M},this.getClearColor=function(M){return M.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(M=!0,G=!0,$=!0){let K=0;if(M){let Q=!1;if(ae!==null){let Ce=ae.texture.format;Q=p.has(Ce)}if(Q){let Ce=ae.texture.type,He=g.has(Ce),we=rt.getClearColor(),Ve=rt.getClearAlpha(),Ge=we.r,lt=we.g,ot=we.b;He?(b[0]=Ge,b[1]=lt,b[2]=ot,b[3]=Ve,z.clearBufferuiv(z.COLOR,0,b)):(A[0]=Ge,A[1]=lt,A[2]=ot,A[3]=Ve,z.clearBufferiv(z.COLOR,0,A))}else K|=z.COLOR_BUFFER_BIT}G&&(K|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(K|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&z.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),B=M},this.dispose=function(){t.removeEventListener("webglcontextlost",V,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",Ue,!1),rt.dispose(),Ae.dispose(),Re.dispose(),ne.dispose(),be.dispose(),pe.dispose(),de.dispose(),fe.dispose(),Ee.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",nt),Ne.removeEventListener("sessionend",Vt),bt.stop()};function V(M){M.preventDefault(),so("WebGLRenderer: Context Lost."),H=!0}function _e(){so("WebGLRenderer: Context Restored."),H=!1;let M=Y.autoReset,G=Ke.enabled,$=Ke.autoUpdate,K=Ke.needsUpdate,Q=Ke.type;De(),Y.autoReset=M,Ke.enabled=G,Ke.autoUpdate=$,Ke.needsUpdate=K,Ke.type=Q}function Ue(M){tt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function st(M){let G=M.target;G.removeEventListener("dispose",st),Je(G)}function Je(M){je(M),ne.remove(M)}function je(M){let G=ne.get(M).programs;G!==void 0&&(G.forEach(function($){Ee.releaseProgram($)}),M.isShaderMaterial&&Ee.releaseShaderCache(M))}this.renderBufferDirect=function(M,G,$,K,Q,Ce){G===null&&(G=Fe);let He=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,we=ms(M,G,$,K,Q);y.setMaterial(K,He);let Ve=$.index,Ge=1;if(K.wireframe===!0){if(Ve=ue.getWireframeAttribute($),Ve===void 0)return;Ge=2}let lt=$.drawRange,ot=$.attributes.position,We=lt.start*Ge,Rt=(lt.start+lt.count)*Ge;Ce!==null&&(We=Math.max(We,Ce.start*Ge),Rt=Math.min(Rt,(Ce.start+Ce.count)*Ge)),Ve!==null?(We=Math.max(We,0),Rt=Math.min(Rt,Ve.count)):ot!=null&&(We=Math.max(We,0),Rt=Math.min(Rt,ot.count));let Gt=Rt-We;if(Gt<0||Gt===1/0)return;de.setup(Q,K,we,$,Ve);let Ft,ct=me;if(Ve!==null&&(Ft=Te.get(Ve),ct=se,ct.setIndex(Ft)),Q.isMesh)K.wireframe===!0?(y.setLineWidth(K.wireframeLinewidth*Oe()),ct.setMode(z.LINES)):ct.setMode(z.TRIANGLES);else if(Q.isLine){let Tt=K.linewidth;Tt===void 0&&(Tt=1),y.setLineWidth(Tt*Oe()),Q.isLineSegments?ct.setMode(z.LINES):Q.isLineLoop?ct.setMode(z.LINE_LOOP):ct.setMode(z.LINE_STRIP)}else Q.isPoints?ct.setMode(z.POINTS):Q.isSprite&&ct.setMode(z.TRIANGLES);if(Q.isBatchedMesh)if(it.get("WEBGL_multi_draw"))ct.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let Tt=Q._multiDrawStarts,ke=Q._multiDrawCounts,Wt=Q._multiDrawCount,yt=Ve?Te.get(Ve).bytesPerElement:1,pn=ne.get(K).currentProgram.getUniforms();for(let Rn=0;Rn<Wt;Rn++)pn.setValue(z,"_gl_DrawID",Rn),ct.render(Tt[Rn]/yt,ke[Rn])}else if(Q.isInstancedMesh)ct.renderInstances(We,Gt,Q.count);else if($.isInstancedBufferGeometry){let Tt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,ke=Math.min($.instanceCount,Tt);ct.renderInstances(We,Gt,ke)}else ct.render(We,Gt)};function Et(M,G,$,K){B!==null&&M.isNodeMaterial&&B.setObject(K,M),Z===!0&&ze.setState(M,$,!1),M.transparent===!0&&M.side===kt&&M.forceSinglePass===!1?(M.side=Tn,M.needsUpdate=!0,Jn(M,G,K),M.side=jn,M.needsUpdate=!0,Jn(M,G,K),M.side=kt):Jn(M,G,K)}this.compile=function(M,G,$=null){$===null&&($=M),B!==null&&B.renderStart(M,G,$),R=Re.get($),R.init(G),x.push(R),$.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(R.pushLight(Q),Q.castShadow&&R.pushShadow(Q))}),M!==$&&M.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(R.pushLight(Q),Q.castShadow&&R.pushShadow(Q))}),R.setupLights(),B!==null&&B.updateLights(R.state.lightsArray),te=this.localClippingEnabled,Z=ze.init(this.clippingPlanes,te),Z===!0&&ze.setGlobalState(this.clippingPlanes,G),B!==null&&Ke.render(R.state.shadowsArray,$,G);let K=new Set;return M.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let Ce=Q.material;if(Ce)if(Array.isArray(Ce))for(let He=0;He<Ce.length;He++){let we=Ce[He];Et(we,$,G,Q),K.add(we)}else Et(Ce,$,G,Q),K.add(Ce)}),R=x.pop(),B!==null&&B.renderEnd(),K},this.compileAsync=function(M,G,$=null){let K=this.compile(M,G,$);return new Promise(Q=>{function Ce(){if(K.forEach(function(He){let Ve=ne.get(He).currentProgram;(Ve===void 0||Ve.isReady())&&K.delete(He)}),K.size===0){Q(M);return}setTimeout(Ce,10)}it.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let wt=null;function Qt(M){wt&&wt(M)}function nt(){bt.stop()}function Vt(){bt.start()}let bt=new Xf;bt.setAnimationLoop(Qt),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(M){wt=M,Ne.setAnimationLoop(M),M===null?bt.stop():bt.start()},Ne.addEventListener("sessionstart",nt),Ne.addEventListener("sessionend",Vt),this.render=function(M,G){if(G!==void 0&&G.isCamera!==!0){tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;B!==null&&B.renderStart(M,G);let $=Ne.enabled===!0&&Ne.isPresenting===!0,K=C!==null&&(ae===null||$)&&C.begin(N,ae);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(G),G=Ne.getCamera()),M.isScene===!0&&M.onBeforeRender(N,M,G,ae),R=Re.get(M,x.length),R.init(G),R.state.textureUnits=ce.getTextureUnits(),x.push(R),le.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),q.setFromProjectionMatrix(le,ii,G.reversedDepth),te=this.localClippingEnabled,Z=ze.init(this.clippingPlanes,te),E=Ae.get(M,T.length),E.init(),T.push(E),Ne.enabled===!0&&Ne.isPresenting===!0){let He=N.xr.getDepthSensingMesh();He!==null&&en(He,G,-1/0,N.sortObjects)}en(M,G,0,N.sortObjects),E.finish(),B!==null&&B.updateLights(R.state.lightsArray),N.sortObjects===!0&&E.sort(I,F),Se=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,Se&&rt.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Z===!0&&ze.beginShadows();let Q=R.state.shadowsArray;if(Ke.render(Q,M,G),Z===!0&&ze.endShadows(),(K&&C.hasRenderPass())===!1){let He=E.opaque,we=E.transmissive;if(R.setupLights(),G.isArrayCamera){let Ve=G.cameras;if(we.length>0)for(let Ge=0,lt=Ve.length;Ge<lt;Ge++){let ot=Ve[Ge];hi(He,we,M,ot)}Se&&rt.render(M);for(let Ge=0,lt=Ve.length;Ge<lt;Ge++){let ot=Ve[Ge];tn(E,M,ot,ot.viewport)}}else we.length>0&&hi(He,we,M,G),Se&&rt.render(M),tn(E,M,G)}ae!==null&&j===0&&(ce.updateMultisampleRenderTarget(ae),ce.updateRenderTargetMipmap(ae)),K&&C.end(N),M.isScene===!0&&M.onAfterRender(N,M,G),de.resetDefaultState(),X=-1,re=null,x.pop(),x.length>0?(R=x[x.length-1],ce.setTextureUnits(R.state.textureUnits),Z===!0&&ze.setGlobalState(N.clippingPlanes,R.state.camera)):R=null,T.pop(),T.length>0?E=T[T.length-1]:E=null,B!==null&&B.renderEnd()};function en(M,G,$,K){if(M.visible===!1)return;if(M.layers.test(G.layers)){if(M.isGroup)$=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(G);else if(M.isLightProbeGrid)R.pushLightProbeGrid(M);else if(M.isLight)R.pushLight(M),M.castShadow&&R.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(q)){K&&Le.setFromMatrixPosition(M.matrixWorld).applyMatrix4(le);let He=pe.update(M),we=M.material;we.visible&&E.push(M,He,we,$,Le.z,null,G)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(q))){let He=pe.update(M),we=M.material;if(K&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Le.copy(M.boundingSphere.center)):(He.boundingSphere===null&&He.computeBoundingSphere(),Le.copy(He.boundingSphere.center)),Le.applyMatrix4(M.matrixWorld).applyMatrix4(le)),Array.isArray(we)){let Ve=He.groups;for(let Ge=0,lt=Ve.length;Ge<lt;Ge++){let ot=Ve[Ge],We=we[ot.materialIndex];We&&We.visible&&E.push(M,He,We,$,Le.z,ot,G)}}else we.visible&&E.push(M,He,we,$,Le.z,null,G)}}let Ce=M.children;for(let He=0,we=Ce.length;He<we;He++)en(Ce[He],G,$,K)}function tn(M,G,$,K){let{opaque:Q,transmissive:Ce,transparent:He}=M;R.setupLightsView($),Z===!0&&ze.setGlobalState(N.clippingPlanes,$),K&&y.viewport(ie.copy(K)),Q.length>0&&qi(Q,G,$),Ce.length>0&&qi(Ce,G,$),He.length>0&&qi(He,G,$),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function hi(M,G,$,K){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[K.id]===void 0){let We=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[K.id]=new Cn(1,1,{generateMipmaps:!0,type:We?ui:Nn,minFilter:li,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_t.workingColorSpace})}let Ce=R.state.transmissionRenderTarget[K.id],He=K.viewport||ie;Ce.setSize(He.z*N.transmissionResolutionScale,He.w*N.transmissionResolutionScale);let we=N.getRenderTarget(),Ve=N.getActiveCubeFace(),Ge=N.getActiveMipmapLevel();N.setRenderTarget(Ce),N.getClearColor(Ie),Xe=N.getClearAlpha(),Xe<1&&N.setClearColor(16777215,.5),N.clear(),Se&&rt.render($);let lt=N.toneMapping;N.toneMapping=ai;let ot=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),R.setupLightsView(K),Z===!0&&ze.setGlobalState(N.clippingPlanes,K),qi(M,$,K),ce.updateMultisampleRenderTarget(Ce),ce.updateRenderTargetMipmap(Ce),it.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Rt=0,Gt=G.length;Rt<Gt;Rt++){let Ft=G[Rt],{object:ct,geometry:Tt,material:ke,group:Wt}=Ft;if(ke.side===kt&&ct.layers.test(K.layers)){let yt=ke.side;ke.side=Tn,ke.needsUpdate=!0,Wn(ct,$,K,Tt,ke,Wt),ke.side=yt,ke.needsUpdate=!0,We=!0}}We===!0&&(ce.updateMultisampleRenderTarget(Ce),ce.updateRenderTargetMipmap(Ce))}N.setRenderTarget(we,Ve,Ge),N.setClearColor(Ie,Xe),ot!==void 0&&(K.viewport=ot),N.toneMapping=lt}function qi(M,G,$){let K=G.isScene===!0?G.overrideMaterial:null;for(let Q=0,Ce=M.length;Q<Ce;Q++){let He=M[Q],{object:we,geometry:Ve,group:Ge}=He,lt=He.material;lt.allowOverride===!0&&K!==null&&(lt=K),we.layers.test($.layers)&&Wn(we,G,$,Ve,lt,Ge)}}function Wn(M,G,$,K,Q,Ce){B!==null&&Q.isNodeMaterial&&B.setObject(M,Q),M.onBeforeRender(N,G,$,K,Q,Ce),M.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),Q.onBeforeRender(N,G,$,K,M,Ce),Q.transparent===!0&&Q.side===kt&&Q.forceSinglePass===!1?(Q.side=Tn,Q.needsUpdate=!0,N.renderBufferDirect($,G,K,Q,M,Ce),Q.side=jn,Q.needsUpdate=!0,N.renderBufferDirect($,G,K,Q,M,Ce),Q.side=kt):N.renderBufferDirect($,G,K,Q,M,Ce),M.onAfterRender(N,G,$,K,Q,Ce)}function Jn(M,G,$){G.isScene!==!0&&(G=Fe);let K=ne.get(M),Q=R.state.lights,Ce=R.state.shadowsArray,He=Q.state.version,we=Ee.getParameters(M,Q.state,Ce,G,$,R.state.lightProbeGridArray),Ve=Ee.getProgramCacheKey(we),Ge=K.programs;K.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?G.environment:null,K.fog=G.fog;let lt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;K.envMap=be.get(M.envMap||K.environment,lt),K.envMapRotation=K.environment!==null&&M.envMap===null?G.environmentRotation:M.envMapRotation,Ge===void 0&&(M.addEventListener("dispose",st),Ge=new Map,K.programs=Ge);let ot=Ge.get(Ve);if(ot!==void 0){if(K.currentProgram===ot&&K.lightsStateVersion===He)return Fn(M,we),ot}else we.uniforms=Ee.getUniforms(M),B!==null&&M.isNodeMaterial&&B.build(M,$,we),M.onBeforeCompile(we,N),ot=Ee.acquireProgram(we,Ve),Ge.set(Ve,ot),K.uniforms=we.uniforms;let We=K.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(We.clippingPlanes=ze.uniform),Fn(M,we),K.needsLights=xt(M),K.lightsStateVersion=He,K.needsLights&&(We.ambientLightColor.value=Q.state.ambient,We.lightProbe.value=Q.state.probe,We.sunLights.value=Q.state.sun,We.sunLightShadows.value=Q.state.sunShadow,We.directionalLights.value=Q.state.directional,We.directionalLightShadows.value=Q.state.directionalShadow,We.spotLights.value=Q.state.spot,We.spotLightShadows.value=Q.state.spotShadow,We.rectAreaLights.value=Q.state.rectArea,We.ltc_1.value=Q.state.rectAreaLTC1,We.ltc_2.value=Q.state.rectAreaLTC2,We.pointLights.value=Q.state.point,We.pointLightShadows.value=Q.state.pointShadow,We.hemisphereLights.value=Q.state.hemi,We.sunShadowMatrix.value=Q.state.sunShadowMatrix,We.sunShadowCascade.value=Q.state.sunShadowCascade,We.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,We.spotLightMatrix.value=Q.state.spotLightMatrix,We.spotLightMap.value=Q.state.spotLightMap,We.pointShadowMatrix.value=Q.state.pointShadowMatrix),K.lightProbeGrid=R.state.lightProbeGridArray.length>0,K.currentProgram=ot,K.uniformsList=null,ot}function Gs(M){if(M.uniformsList===null){let G=M.currentProgram.getUniforms();M.uniformsList=Fr.seqWithValue(G.seq,M.uniforms)}return M.uniformsList}function Fn(M,G){let $=ne.get(M);$.outputColorSpace=G.outputColorSpace,$.batching=G.batching,$.batchingColor=G.batchingColor,$.instancing=G.instancing,$.instancingColor=G.instancingColor,$.instancingMorph=G.instancingMorph,$.skinning=G.skinning,$.morphTargets=G.morphTargets,$.morphNormals=G.morphNormals,$.morphColors=G.morphColors,$.morphTargetsCount=G.morphTargetsCount,$.numClippingPlanes=G.numClippingPlanes,$.numIntersection=G.numClipIntersection,$.vertexAlphas=G.vertexAlphas,$.vertexTangents=G.vertexTangents,$.toneMapping=G.toneMapping}function di(M,G){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;v.setFromMatrixPosition(G.matrixWorld);for(let $=0,K=M.length;$<K;$++){let Q=M[$];if(Q.texture!==null&&Q.boundingBox.containsPoint(v))return Q}return null}function ms(M,G,$,K,Q){G.isScene!==!0&&(G=Fe),ce.resetTextureUnits();let Ce=G.fog,He=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?G.environment:null,we=ae===null?N.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:_t.workingColorSpace,Ve=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ge=be.get(K.envMap||He,Ve),lt=K.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ot=!!$.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),We=!!$.morphAttributes.position,Rt=!!$.morphAttributes.normal,Gt=!!$.morphAttributes.color,Ft=ai;K.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Ft=N.toneMapping);let ct=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Tt=ct!==void 0?ct.length:0,ke=ne.get(K),Wt=R.state.lights;if(Z===!0&&(te===!0||M!==re)){let Ht=M===re&&K.id===X;ze.setState(K,M,Ht)}let yt=!1;K.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Wt.state.version||ke.outputColorSpace!==we||Q.isBatchedMesh&&ke.batching===!1||!Q.isBatchedMesh&&ke.batching===!0||Q.isBatchedMesh&&ke.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&ke.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&ke.instancing===!1||!Q.isInstancedMesh&&ke.instancing===!0||Q.isSkinnedMesh&&ke.skinning===!1||!Q.isSkinnedMesh&&ke.skinning===!0||Q.isInstancedMesh&&ke.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&ke.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&ke.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&ke.instancingMorph===!1&&Q.morphTexture!==null||ke.envMap!==Ge||K.fog===!0&&ke.fog!==Ce||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==ze.numPlanes||ke.numIntersection!==ze.numIntersection)||ke.vertexAlphas!==lt||ke.vertexTangents!==ot||ke.morphTargets!==We||ke.morphNormals!==Rt||ke.morphColors!==Gt||ke.toneMapping!==Ft||ke.morphTargetsCount!==Tt||!!ke.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(yt=!0):(yt=!0,ke.__version=K.version);let pn=ke.currentProgram;yt===!0&&(pn=Jn(K,G,Q),B&&K.isNodeMaterial&&B.onUpdateProgram(K,pn,ke));let Rn=!1,Xn=!1,Ws=!1,Nt=pn.getUniforms(),Yt=ke.uniforms;if(y.useProgram(pn.program)&&(Rn=!0,Xn=!0,Ws=!0),K.id!==X&&(X=K.id,Xn=!0),ke.needsLights){let Ht=di(R.state.lightProbeGridArray,Q);ke.lightProbeGrid!==Ht&&(ke.lightProbeGrid=Ht,Xn=!0)}if(Rn||re!==M){y.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Nt.setValue(z,"projectionMatrix",M.projectionMatrix),Nt.setValue(z,"viewMatrix",M.matrixWorldInverse);let Zi=Nt.map.cameraPosition;Zi!==void 0&&Zi.setValue(z,ge.setFromMatrixPosition(M.matrixWorld)),P.logarithmicDepthBuffer&&Nt.setValue(z,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Nt.setValue(z,"isOrthographic",M.isOrthographicCamera===!0),re!==M&&(re=M,Xn=!0,Ws=!0)}if(ke.needsLights&&(Wt.state.sunShadowMap.length>0&&Nt.setValue(z,"sunShadowMap",Wt.state.sunShadowMap,ce),Wt.state.directionalShadowMap.length>0&&Nt.setValue(z,"directionalShadowMap",Wt.state.directionalShadowMap,ce),Wt.state.spotShadowMap.length>0&&Nt.setValue(z,"spotShadowMap",Wt.state.spotShadowMap,ce),Wt.state.pointShadowMap.length>0&&Nt.setValue(z,"pointShadowMap",Wt.state.pointShadowMap,ce)),Q.isSkinnedMesh){Nt.setOptional(z,Q,"bindMatrix"),Nt.setOptional(z,Q,"bindMatrixInverse");let Ht=Q.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Nt.setValue(z,"boneTexture",Ht.boneTexture,ce))}Q.isBatchedMesh&&(Nt.setOptional(z,Q,"batchingTexture"),Nt.setValue(z,"batchingTexture",Q._matricesTexture,ce),Nt.setOptional(z,Q,"batchingIdTexture"),Nt.setValue(z,"batchingIdTexture",Q._indirectTexture,ce),Nt.setOptional(z,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Nt.setValue(z,"batchingColorTexture",Q._colorsTexture,ce));let Yi=$.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&L.update(Q,$,pn),(Xn||ke.receiveShadow!==Q.receiveShadow)&&(ke.receiveShadow=Q.receiveShadow,Nt.setValue(z,"receiveShadow",Q.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&G.environment!==null&&(Yt.envMapIntensity.value=G.environmentIntensity),Yt.dfgLUT!==void 0&&(Yt.dfgLUT.value=gv()),Xn){if(Nt.setValue(z,"toneMappingExposure",N.toneMappingExposure),ke.needsLights&&oe(Yt,Ws),Ce&&K.fog===!0&&qe.refreshFogUniforms(Yt,Ce),qe.refreshMaterialUniforms(Yt,K,w,O,R.state.transmissionRenderTarget[M.id]),ke.needsLights&&ke.lightProbeGrid){let Ht=ke.lightProbeGrid;Yt.probesSH.value=Ht.texture,Yt.probesMin.value.copy(Ht.boundingBox.min),Yt.probesMax.value.copy(Ht.boundingBox.max),Yt.probesResolution.value.copy(Ht.resolution)}Fr.upload(z,Gs(ke),Yt,ce)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Fr.upload(z,Gs(ke),Yt,ce),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Nt.setValue(z,"center",Q.center),Nt.setValue(z,"modelViewMatrix",Q.modelViewMatrix),Nt.setValue(z,"normalMatrix",Q.normalMatrix),Nt.setValue(z,"modelMatrix",Q.matrixWorld),K.uniformsGroups!==void 0){let Ht=K.uniformsGroups;for(let Zi=0,Xs=Ht.length;Zi<Xs;Zi++){let Fh=Ht[Zi];fe.update(Fh,pn),fe.bind(Fh,pn)}}return pn}function oe(M,G){M.ambientLightColor.needsUpdate=G,M.lightProbe.needsUpdate=G,M.sunLights.needsUpdate=G,M.sunLightShadows.needsUpdate=G,M.directionalLights.needsUpdate=G,M.directionalLightShadows.needsUpdate=G,M.pointLights.needsUpdate=G,M.pointLightShadows.needsUpdate=G,M.spotLights.needsUpdate=G,M.spotLightShadows.needsUpdate=G,M.rectAreaLights.needsUpdate=G,M.hemisphereLights.needsUpdate=G}function xt(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(M,G,$){let K=ne.get(M);K.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),ne.get(M.texture).__webglTexture=G,ne.get(M.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:$,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,G){let $=ne.get(M);$.__webglFramebuffer=G,$.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(M,G=0,$=0){ae=M,J=G,j=$;let K=null,Q=!1,Ce=!1;if(M){let we=ne.get(M);if(we.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(z.FRAMEBUFFER,we.__webglFramebuffer),ie.copy(M.viewport),ye.copy(M.scissor),xe=M.scissorTest,y.viewport(ie),y.scissor(ye),y.setScissorTest(xe),X=-1;return}else if(we.__webglFramebuffer===void 0)ce.setupRenderTarget(M);else if(we.__hasExternalTextures)ce.rebindTextures(M,ne.get(M.texture).__webglTexture,ne.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let lt=M.depthTexture;if(we.__boundDepthTexture!==lt){if(lt!==null&&ne.has(lt)&&(M.width!==lt.image.width||M.height!==lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ce.setupDepthRenderbuffer(M)}}let Ve=M.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Ce=!0);let Ge=ne.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ge[G])?K=Ge[G][$]:K=Ge[G],Q=!0):M.samples>0&&ce.useMultisampledRTT(M)===!1?K=ne.get(M).__webglMultisampledFramebuffer:Array.isArray(Ge)?K=Ge[$]:K=Ge,ie.copy(M.viewport),ye.copy(M.scissor),xe=M.scissorTest}else ie.copy(U).multiplyScalar(w).floor(),ye.copy(ee).multiplyScalar(w).floor(),xe=he;if($!==0&&(K=k),y.bindFramebuffer(z.FRAMEBUFFER,K)&&y.drawBuffers(M,K),y.viewport(ie),y.scissor(ye),y.setScissorTest(xe),Q){let we=ne.get(M.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+G,we.__webglTexture,$)}else if(Ce){let we=G;for(let Ve=0;Ve<M.textures.length;Ve++){let Ge=ne.get(M.textures[Ve]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ve,Ge.__webglTexture,$,we)}}else if(M!==null&&$!==0){let we=ne.get(M.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,we.__webglTexture,$)}X=-1};function Dt(M){let G=ne.get(M);return(G.__readFormat!==M.format||G.__readType!==M.type)&&(G.__readFormat=M.format,G.__readType=M.type,G.__formatReadable=P.textureFormatReadable(M.format),G.__typeReadable=P.textureTypeReadable(M.type)),G}this.readRenderTargetPixels=function(M,G,$,K,Q,Ce,He,we=0){if(!(M&&M.isWebGLRenderTarget)){tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&He!==void 0&&(Ve=Ve[He]),Ve){y.bindFramebuffer(z.FRAMEBUFFER,Ve);try{let Ge=M.textures[we],lt=Ge.format,ot=Ge.type;M.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+we);let We=Dt(Ge);if(We.__formatReadable===!1){tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(We.__typeReadable===!1){tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=M.width-K&&$>=0&&$<=M.height-Q&&z.readPixels(G,$,K,Q,ve.convert(lt),ve.convert(ot),Ce)}finally{let Ge=ae!==null?ne.get(ae).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(M,G,$,K,Q,Ce,He,we=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&He!==void 0&&(Ve=Ve[He]),Ve)if(G>=0&&G<=M.width-K&&$>=0&&$<=M.height-Q){y.bindFramebuffer(z.FRAMEBUFFER,Ve);let Ge=M.textures[we],lt=Ge.format,ot=Ge.type;M.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+we);let We=Dt(Ge);if(We.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(We.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Rt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Rt),z.bufferData(z.PIXEL_PACK_BUFFER,Ce.byteLength,z.STREAM_READ),z.readPixels(G,$,K,Q,ve.convert(lt),ve.convert(ot),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let Gt=ae!==null?ne.get(ae).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,Gt);let Ft=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await pf(z,Ft,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Rt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Ce),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(Rt),z.deleteSync(Ft),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,G=null,$=0){let K=Math.pow(2,-$),Q=Math.floor(M.image.width*K),Ce=Math.floor(M.image.height*K),He=G!==null?G.x:0,we=G!==null?G.y:0;ce.setTexture2D(M,0),z.copyTexSubImage2D(z.TEXTURE_2D,$,0,0,He,we,Q,Ce),y.unbindTexture()},this.copyTextureToTexture=function(M,G,$=null,K=null,Q=0,Ce=0){let He,we,Ve,Ge,lt,ot,We,Rt,Gt,Ft=M.isCompressedTexture?M.mipmaps[Ce]:M.image;if($!==null)He=$.max.x-$.min.x,we=$.max.y-$.min.y,Ve=$.isBox3?$.max.z-$.min.z:1,Ge=$.min.x,lt=$.min.y,ot=$.isBox3?$.min.z:0;else{let Yt=Math.pow(2,-Q);He=Math.floor(Ft.width*Yt),we=Math.floor(Ft.height*Yt),M.isDataArrayTexture?Ve=Ft.depth:M.isData3DTexture?Ve=Math.floor(Ft.depth*Yt):Ve=1,Ge=0,lt=0,ot=0}K!==null?(We=K.x,Rt=K.y,Gt=K.z):(We=0,Rt=0,Gt=0);let ct=ve.convert(G.format),Tt=ve.convert(G.type),ke;G.isData3DTexture?(ce.setTexture3D(G,0),ke=z.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(ce.setTexture2DArray(G,0),ke=z.TEXTURE_2D_ARRAY):(ce.setTexture2D(G,0),ke=z.TEXTURE_2D),y.activeTexture(z.TEXTURE0),y.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),y.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),y.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);let Wt=y.getParameter(z.UNPACK_ROW_LENGTH),yt=y.getParameter(z.UNPACK_IMAGE_HEIGHT),pn=y.getParameter(z.UNPACK_SKIP_PIXELS),Rn=y.getParameter(z.UNPACK_SKIP_ROWS),Xn=y.getParameter(z.UNPACK_SKIP_IMAGES);y.pixelStorei(z.UNPACK_ROW_LENGTH,Ft.width),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ft.height),y.pixelStorei(z.UNPACK_SKIP_PIXELS,Ge),y.pixelStorei(z.UNPACK_SKIP_ROWS,lt),y.pixelStorei(z.UNPACK_SKIP_IMAGES,ot);let Ws=M.isDataArrayTexture||M.isData3DTexture,Nt=G.isDataArrayTexture||G.isData3DTexture;if(M.isDepthTexture){let Yt=ne.get(M),Yi=ne.get(G),Ht=ne.get(Yt.__renderTarget),Zi=ne.get(Yi.__renderTarget);y.bindFramebuffer(z.READ_FRAMEBUFFER,Ht.__webglFramebuffer),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,Zi.__webglFramebuffer);for(let Xs=0;Xs<Ve;Xs++)Ws&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ne.get(M).__webglTexture,Q,ot+Xs),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ne.get(G).__webglTexture,Ce,Gt+Xs)),z.blitFramebuffer(Ge,lt,He,we,We,Rt,He,we,z.DEPTH_BUFFER_BIT,z.NEAREST);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Q!==0||M.isRenderTargetTexture||ne.has(M)){let Yt=ne.get(M),Yi=ne.get(G);y.bindFramebuffer(z.READ_FRAMEBUFFER,D),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,W);for(let Ht=0;Ht<Ve;Ht++)Ws?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Yt.__webglTexture,Q,ot+Ht):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Yt.__webglTexture,Q),Nt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Yi.__webglTexture,Ce,Gt+Ht):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Yi.__webglTexture,Ce),Q!==0?z.blitFramebuffer(Ge,lt,He,we,We,Rt,He,we,z.COLOR_BUFFER_BIT,z.NEAREST):Nt?z.copyTexSubImage3D(ke,Ce,We,Rt,Gt+Ht,Ge,lt,He,we):z.copyTexSubImage2D(ke,Ce,We,Rt,Ge,lt,He,we);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Nt?M.isDataTexture||M.isData3DTexture?z.texSubImage3D(ke,Ce,We,Rt,Gt,He,we,Ve,ct,Tt,Ft.data):G.isCompressedArrayTexture?z.compressedTexSubImage3D(ke,Ce,We,Rt,Gt,He,we,Ve,ct,Ft.data):z.texSubImage3D(ke,Ce,We,Rt,Gt,He,we,Ve,ct,Tt,Ft):M.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Ce,We,Rt,He,we,ct,Tt,Ft.data):M.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Ce,We,Rt,Ft.width,Ft.height,ct,Ft.data):z.texSubImage2D(z.TEXTURE_2D,Ce,We,Rt,He,we,ct,Tt,Ft);y.pixelStorei(z.UNPACK_ROW_LENGTH,Wt),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,yt),y.pixelStorei(z.UNPACK_SKIP_PIXELS,pn),y.pixelStorei(z.UNPACK_SKIP_ROWS,Rn),y.pixelStorei(z.UNPACK_SKIP_IMAGES,Xn),Ce===0&&G.generateMipmaps&&z.generateMipmap(ke),y.unbindTexture()},this.initRenderTarget=function(M){ne.get(M).__webglFramebuffer===void 0&&ce.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ce.setTextureCube(M,0):M.isData3DTexture?ce.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ce.setTexture2DArray(M,0):ce.setTexture2D(M,0),y.unbindTexture()},this.resetState=function(){J=0,j=0,ae=null,y.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};function Zu(i,e){if(e===yu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Dr||e===Ho){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Dr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Jf(i){let e=new Map,t=new Map,n=i.clone();return Qf(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Qf(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Qf(i.children[n],e.children[n],t)}var Hr=class extends bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new th(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new Ju(t)}),this.register(function(t){return new ec(t,vt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new ec(t,vt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ph(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=zi.extractUrlBase(e);o=zi.resolveURL(c,this.path)}else o=zi.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Tr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===sp){try{o[vt.KHR_BINARY_GLTF]=new mh(e)}catch(d){s&&s(d);return}r=JSON.parse(o[vt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new bh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case vt.KHR_MATERIALS_UNLIT:o[d]=new Qu;break;case vt.KHR_DRACO_MESH_COMPRESSION:o[d]=new gh(r,this.dracoLoader);break;case vt.KHR_TEXTURE_TRANSFORM:o[d]=new _h;break;case vt.KHR_MESH_QUANTIZATION:o[d]=new xh;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function _v(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function $t(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Ju=class{constructor(e){this.parser=e,this.name=vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new Qe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],En);let d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new os(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ao(u),c.distance=d;break;case"spot":c=new wo(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),wi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},Qu=class{constructor(){this.name=vt.KHR_MATERIALS_UNLIT}getMaterialType(){return si}extendParams(e,t,n){let s=[];e.color=new Qe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],En),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,St))}return Promise.all(s)}},eh=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},th=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Me(r,r)}return Promise.all(s)}},nh=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},ih=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},sh=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SHEEN}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Qe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],En)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,St)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},rh=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},oh=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_VOLUME}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Qe().setRGB(r[0],r[1],r[2],En),Promise.all(s)}},ah=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IOR}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},lh=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Qe().setRGB(r[0],r[1],r[2],En),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,St)),Promise.all(s)}},ch=class{constructor(e){this.parser=e,this.name=vt.EXT_MATERIALS_BUMP}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},uh=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return $t(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=$t(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},hh=class{constructor(e){this.parser=e,this.name=vt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},dh=class{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},fh=class{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},ec=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(f),u,d,h,s.mode,s.filter),f})})}else return null}},ph=class{constructor(e){this.name=vt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==$n.TRIANGLES&&c.mode!==$n.TRIANGLE_STRIP&&c.mode!==$n.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(let m of d){let _=new ut,p=new S,g=new Pe,b=new S(1,1,1),A=new co(m.geometry,m.material,h);for(let E=0;E<h;E++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,E),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,E),l.SCALE&&b.fromBufferAttribute(l.SCALE,E),A.setMatrixAt(E,_.compose(p,g,b));let v=null;for(let E in l)if(E==="_COLOR_0"){let R=l[E];A.instanceColor=new Ui(R.array,R.itemSize,R.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(v===null){let T=A.geometry;v=new At,v.name=T.name;for(let x in T.attributes)v.setAttribute(x,T.attributes[x]);for(let x in T.morphAttributes)v.morphAttributes[x]=T.morphAttributes[x];T.index!==null&&v.setIndex(T.index),v.morphTargetsRelative=T.morphTargetsRelative;for(let x of T.groups)v.addGroup(x.start,x.count,x.materialIndex);T.boundingBox!==null&&(v.boundingBox=T.boundingBox.clone()),T.boundingSphere!==null&&(v.boundingSphere=T.boundingSphere.clone()),v.drawRange.start=T.drawRange.start,v.drawRange.count=T.drawRange.count,v.userData=Object.assign({},T.userData),A.geometry=v}let R=l[E];v.setAttribute(E,new Ui(R.array,R.itemSize,R.normalized))}zt.prototype.copy.call(A,m),this.parser.assignFinalMaterial(A),f.push(A)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},sp="glTF",Go=12,ep={JSON:1313821514,BIN:5130562},mh=class{constructor(e){this.name=vt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Go),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==sp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Go,r=new DataView(e,Go),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===ep.JSON){let c=new Uint8Array(e,Go+o,a);this.content=n.decode(c)}else if(l===ep.BIN){let c=Go+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},gh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=vt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let u in o){let d=vh[u]||u.toLowerCase();a[d]=o[u]}for(let u in e.attributes){let d=vh[u]||u.toLowerCase();if(o[u]!==void 0){let h=n.accessors[e.attributes[u]],f=Br[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(f){for(let m in f.attributes){let _=f.attributes[m],p=l[m];p!==void 0&&(_.normalized=p)}d(f)},a,c,En,h)})})}},_h=class{constructor(){this.name=vt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},xh=class{constructor(){this.name=vt.KHR_MESH_QUANTIZATION}},tc=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=s-t,d=(n-t)/u,h=d*d,f=h*d,m=e*c,_=m-c,p=-2*f+3*h,g=f-h,b=1-p,A=g-h+d;for(let v=0;v!==a;v++){let E=o[_+v+a],R=o[_+v+l]*u,T=o[m+v+a],x=o[m+v]*u;r[v]=b*E+A*R+p*T+g*x}return r}},xv=new Pe,yh=class extends tc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return xv.fromArray(r).normalize().toArray(r),r}},$n={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Br={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},tp={9728:Kt,9729:jt,9984:rl,9985:Pr,9986:Bs,9987:li},np={33071:Yn,33648:lr,10497:gi},Ku={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},vh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ds={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},yv={CUBICSPLINE:void 0,LINEAR:Es,STEP:Ss},ju={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function vv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new mt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:jn})),i.DefaultMaterial}function Vs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function wi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Mv(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){let d=e[c];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;o.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let u=c[0],d=c[1],h=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function bv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Sv(i){let e,t=i.extensions&&i.extensions[vt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$u(t.attributes):e=i.indices+":"+$u(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+$u(i.targets[n]);return e}function $u(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Mh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ev(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Tv=new ut,bh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new _v,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Vi(this.options.manager):this.textureLoader=new Ro(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Tr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Vs(r,a,s),wi(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,u]of o.children.entries())r(u,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[vt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(zi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Ku[s.type],a=Br[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Zt(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=Ku[s.type],c=Br[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,_,p;if(f&&f!==d){let g=Math.floor(h/f),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count,A=t.cache.get(b);A||(_=new c(a,g*f,s.count*f/u),A=new mr(_,f/u),t.cache.add(b,A)),p=new gr(A,l,h%f/u,m)}else a===null?_=new c(s.count*l):_=new c(a,h,s.count*l),p=new Zt(_,l,m);if(s.sparse!==void 0){let g=Ku.SCALAR,b=Br[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,E=new b(o[1],A,s.sparse.count*g),R=new c(o[2],v,s.sparse.count*l);a!==null&&(p=new Zt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let T=0,x=E.length;T<x;T++){let C=E[T];if(p.setX(C,R[T*l]),l>=2&&p.setY(C,R[T*l+1]),l>=3&&p.setZ(C,R[T*l+2]),l>=4&&p.setW(C,R[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=m}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let h=(r.samplers||{})[o.sampler]||{};return u.magFilter=tp[h.magFilter]||jt,u.minFilter=tp[h.minFilter]||li,u.wrapS=np[h.wrapS]||gi,u.wrapT=np[h.wrapT]||gi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Kt&&u.minFilter!==jt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;let h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let m=h;t.isImageBitmapLoader===!0&&(m=function(_){let p=new rn(_);p.needsUpdate=!0,h(p)}),t.load(zi.resolveURL(d,r.path),m,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),wi(d,o),d.userData.mimeType=o.mimeType||Ev(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[vt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[vt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[vt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new vr,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new ri,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return mt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[vt.KHR_MATERIALS_UNLIT]){let d=s[vt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,r,t))}else{let d=r.pbrMetallicRoughness||{};if(a.color=new Qe(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],En),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,St)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=kt);let u=r.alphaMode||ju.OPAQUE;if(u===ju.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ju.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==si&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Me(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==si&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==si){let d=r.emissiveFactor;a.emissive=new Qe().setRGB(d[0],d[1],d[2],En)}return r.emissiveTexture!==void 0&&o!==si&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,St)),Promise.all(c).then(function(){let d=new o(a);return r.name&&(d.name=r.name),wi(d,r),t.associations.set(d,{materials:e}),r.extensions&&Vs(s,d,r),d})}createUniqueName(e){let t=Ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return ip(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],u=Sv(c),d=s[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[vt.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=ip(new At,c,t),c.mode===$n.TRIANGLE_STRIP?h=h.then(f=>Zu(f,Ho)):c.mode===$n.TRIANGLE_FAN&&(h=h.then(f=>Zu(f,Dr))),s[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let u=o[l].material===void 0?vv(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,m=u.length;f<m;f++){let _=u[f],p=o[f],g,b=c[f];if(p.mode===$n.TRIANGLES||p.mode===$n.TRIANGLE_STRIP||p.mode===$n.TRIANGLE_FAN||p.mode===void 0){let A=r.isSkinnedMesh===!0,v=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");A&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=A&&v?new ns(_,b):new $e(_,b),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(p.mode===$n.LINES)g=new As(_,b);else if(p.mode===$n.LINE_STRIP)g=new yi(_,b);else if(p.mode===$n.LINE_LOOP)g=new uo(_,b);else if(p.mode===$n.POINTS)g=new ho(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(g.geometry.morphAttributes).length>0&&bv(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),wi(g,r),p.extensions&&Vs(s,g,p),t.assignFinalMaterial(g),d.push(g)}for(let f=0,m=d.length;f<m;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Vs(s,d[0],r),d[0];let h=new pt;r.extensions&&Vs(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,m=d.length;f<m;f++)h.add(d[f]);return h})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(Ye.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new rs(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),wi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,u=o.length;c<u;c++){let d=o[c];if(d){a.push(d);let h=new ut;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new lo(a,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let f=s.channels[d],m=s.samplers[f.sampler],_=f.target,p=_.node,g=s.parameters!==void 0?s.parameters[m.input]:m.input,b=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",b)),c.push(m),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],m=d[2],_=d[3],p=d[4],g=[];for(let A=0,v=h.length;A<v;A++){let E=h[A],R=f[A],T=m[A],x=_[A],C=p[A];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let N=n._createAnimationTracks(E,R,T,x,C);if(N)for(let H=0;H<N.length;H++)g.push(N[H])}let b=new Ls(r,void 0,g);return wi(b,s),b})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,Tv)});for(let f=0,m=d.length;f<m;f++)u.add(d[f]);if(u.userData.pivot!==void 0&&d.length>0){let f=u.userData.pivot,m=d[0];u.pivot=new S().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],m.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new _r:c.length>1?u=new pt:c.length===1?u=c[0]:u=new zt,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=o),wi(u,r),r.extensions&&Vs(n,u,r),r.matrix!==void 0){let d=new ut;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new pt;n.name&&(r.name=s.createUniqueName(n.name)),wi(r,n),n.extensions&&Vs(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++){let h=l[u];h.parent!==null?r.add(Jf(h)):r.add(h)}let c=u=>{let d=new Map;for(let[h,f]of s.associations)(h instanceof Ln||h instanceof rn)&&d.set(h,f);return u.traverse(h=>{let f=s.associations.get(h);f!=null&&d.set(h,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}ds[r.path]===ds.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(a);let u;switch(ds[r.path]){case ds.weights:u=Bi;break;case ds.rotation:u=Hi;break;case ds.translation:case ds.scale:u=ss;break;default:n.itemSize===1?u=Bi:u=ss;break}let d=s.interpolation!==void 0?yv[s.interpolation]:Es,h=this._getArrayFromAccessor(n);for(let f=0,m=l.length;f<m;f++){let _=new u(l[f]+"."+ds[r.path],t.array,h,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Mh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Hi?yh:tc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function wv(i,e,t){let n=e.attributes,s=new Ot;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new S(l[0],l[1],l[2]),new S(c[0],c[1],c[2])),a.normalized){let u=Mh(Br[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new S,l=new S;for(let c=0,u=r.length;c<u;c++){let d=r[c];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,m=h.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),h.normalized){let _=Mh(Br[h.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new In;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function ip(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=vh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return _t.workingColorSpace!==En&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${_t.workingColorSpace}" not supported.`),wi(i,e),wv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Mv(i,e.targets,t):i})}var rp={type:"change"},Eh={type:"start"},ap={type:"end"},nc=new xi,op=new vn,Av=Math.cos(70*Ye.DEG2RAD),ln=new S,Un=2*Math.PI,Lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sh=1e-6,ic=class extends Po{constructor(e,t=null){super(e,t),this.state=Lt.NONE,this.target=new S,this.cursor=new S,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:as.ROTATE,MIDDLE:as.DOLLY,RIGHT:as.PAN},this.touches={ONE:ls.ROTATE,TWO:ls.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new S,this._lastQuaternion=new Pe,this._lastTargetPosition=new S,this._quat=new Pe().setFromUnitVectors(e.up,new S(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ar,this._sphericalDelta=new Ar,this._scale=1,this._panOffset=new S,this._rotateStart=new Me,this._rotateEnd=new Me,this._rotateDelta=new Me,this._panStart=new Me,this._panEnd=new Me,this._panDelta=new Me,this._dollyStart=new Me,this._dollyEnd=new Me,this._dollyDelta=new Me,this._dollyDirection=new S,this._mouse=new Me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cv.bind(this),this._onPointerDown=Rv.bind(this),this._onPointerUp=Pv.bind(this),this._onContextMenu=Ov.bind(this),this._onMouseWheel=Dv.bind(this),this._onKeyDown=Nv.bind(this),this._onTouchStart=Uv.bind(this),this._onTouchMove=Fv.bind(this),this._onMouseDown=Iv.bind(this),this._onMouseMove=Lv.bind(this),this._interceptControlDown=Bv.bind(this),this._interceptControlUp=Hv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Lt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(rp),this.update(),this.state=Lt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;ln.copy(t).sub(this.target),ln.applyQuaternion(this._quat),this._spherical.setFromVector3(ln),this.autoRotate&&this.state===Lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Un:n>Math.PI&&(n-=Un),s<-Math.PI?s+=Un:s>Math.PI&&(s-=Un),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ln.setFromSpherical(this._spherical),ln.applyQuaternion(this._quatInverse),t.copy(this.target).add(ln),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=ln.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new S(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new S(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=ln.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(nc.origin.copy(this.object.position),nc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nc.direction))<Av?this.object.lookAt(this.target):(op.setFromNormalAndCoplanarPoint(this.object.up,this.target),nc.intersectPlane(op,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Sh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sh||this._lastTargetPosition.distanceToSquared(this.target)>Sh?(this.dispatchEvent(rp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Un/60*this.autoRotateSpeed*e:Un/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ln.setFromMatrixColumn(t,0),ln.multiplyScalar(-e),this._panOffset.add(ln)}_panUp(e,t){this.screenSpacePanning===!0?ln.setFromMatrixColumn(t,1):(ln.setFromMatrixColumn(t,0),ln.crossVectors(this.object.up,ln)),ln.multiplyScalar(e),this._panOffset.add(ln)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ln.copy(s).sub(this.target);let r=ln.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Un*this._rotateDelta.x/t.clientHeight),this._rotateUp(Un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Un*this._rotateDelta.x/t.clientHeight),this._rotateUp(Un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Rv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Cv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Pv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ap),this.state=Lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Iv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case as.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Lt.DOLLY;break;case as.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}break;case as.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Lt.PAN}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Eh)}function Lv(i){switch(this.state){case Lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Dv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Lt.NONE||(i.preventDefault(),this.dispatchEvent(Eh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ap))}function Nv(i){this.enabled!==!1&&this._handleKeyDown(i)}function Uv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ls.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Lt.TOUCH_ROTATE;break;case ls.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Lt.TOUCH_PAN;break;default:this.state=Lt.NONE}break;case 2:switch(this.touches.TWO){case ls.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Lt.TOUCH_DOLLY_PAN;break;case ls.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Lt.TOUCH_DOLLY_ROTATE;break;default:this.state=Lt.NONE}break;default:this.state=Lt.NONE}this.state!==Lt.NONE&&this.dispatchEvent(Eh)}function Fv(i){switch(this._trackPointer(i),this.state){case Lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Lt.NONE}}function Ov(i){this.enabled!==!1&&i.preventDefault()}function Bv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Hv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function lp(i){let[e,t]=i.size,n=new pt;n.name="content-skills-book",Object.assign(n.userData,{roomId:i.room,contentId:i.id}),n.position.fromArray(i.position),n.quaternion.setFromUnitVectors(new S(0,0,1),new S(...i.normal).normalize());let s=(h,f,m)=>{let _=new oi,p=-h/2,g=-f/2,b=.035;return _.moveTo(p+b,g),_.lineTo(p+h-b,g),_.quadraticCurveTo(p+h,g,p+h,g+b),_.lineTo(p+h,g+f-b),_.quadraticCurveTo(p+h,g+f,p+h-b,g+f),_.lineTo(p+b,g+f),_.quadraticCurveTo(p,g+f,p,g+f-b),_.lineTo(p,g+b),_.quadraticCurveTo(p,g,p+b,g),new Ps(_,{depth:m,bevelEnabled:!1,curveSegments:6})},r=(h,f,m,_=0)=>{let p=new $e(h,new mt({color:f,roughness:.94}));return p.position.set(_,0,m),p.castShadow=!0,p.receiveShadow=!0,n.add(p),p};r(s(e-.025,t-.025,.14),15918783,-.07);let o=s(e+.04,t+.04,.02);for(let h of[-.093,.073])r(o,15054914,h);r(s(.09,t+.04,.18),3501691,-.09,-e/2+.025);let a=[];for(let h=1;h<6;h++)a.push(new S(-e/2+.055,-t/2+.011,-.07+h*.023),new S(e/2-.014,-t/2+.011,-.07+h*.023));n.add(new As(new At().setFromPoints(a),new ri({color:13154450})));let l=document.createElement("canvas");l.width=768,l.height=1056;let c=l.getContext("2d");c.fillStyle="#efc453",c.fillRect(0,0,768,1056),c.strokeStyle="#3b737e",c.lineWidth=9,c.strokeRect(47,47,674,962),c.fillStyle="#356572",c.textAlign="center",c.font="bold 138px sans-serif",c.fillText("\u4E13\u4E1A",384,286),c.fillText("\u6280\u80FD",384,453),c.lineWidth=6,c.beginPath(),c.arc(384,625,73,0,Math.PI*2),c.stroke(),c.font="bold 48px sans-serif",c.fillText("AI",384,643),c.font="33px sans-serif",c.fillText("\u5168\u6808\u5F00\u53D1 \xB7 AI \u63D0\u6548",384,809),c.fillText("Agent \u5DE5\u7A0B",384,873);let u=new mn(l);u.colorSpace=St;let d=new $e(new un(e,t),new mt({map:u,roughness:.96}));return d.position.z=.094,d.receiveShadow=!0,n.add(d),n}function cp(i,e){let t=(.22-i.z)/.5,n=Ye.clamp(t,0,1),s=n*n*(3-2*n),r=.178*6*n*(1-n)/.5,o=.34/.5,a=Math.hypot(r,o),l=o/a,c=-r/a,u=i.y-.268,d=new S(i.x*(1+.04*s),Math.max(.006,.298-.178*s+u*l),.22-.34*t+u*c);return i.clone().lerp(d,e)}var Th=(i,e,t)=>{let n=Ye.clamp((t-i)/(e-i),0,1);return n*n*(3-2*n)};function up(i,e){let t=(.22-i.z)/.5,n=i.y-.268,s=.205,r=.3,o=Math.hypot(s,r),a=new S(i.x*(1+.07*Th(.35,.8,t)),.335-.205*t+n*r/o-.075*Th(.35,.95,t),.22-.3*t-n*s/o),l=new S(i.x*1.1,.088+(i.y-.268)*.85,-.12+(i.z+.26)*.75);return a.lerp(l,Th(.4,.95,t)),t>.6&&(a.y=Math.max(.003,a.y)),i.clone().lerp(a,e)}function hp(i,e,{root:t,canvas:n,camera:s,reducedMotion:r}){let o=new Map;i.traverse(V=>{V.isBone&&o.set(V.name,{node:V,quaternion:V.quaternion.clone(),position:V.position.clone()}),V.isSkinnedMesh&&(V.frustumCulled=!1),V.userData.petId=e.id}),i.updateMatrixWorld(!0);let a=i.matrixWorld.clone().invert(),l=i.getWorldQuaternion(new Pe),c=["back_r","front_r","back_l","front_l"],u=new Map;i.traverse(V=>{V.isBone&&u.set(V.name,V.getWorldPosition(new S).applyMatrix4(i.matrixWorld.clone().invert()))});let d=V=>V.getWorldPosition(new S),h=c.map((V,_e)=>{let Ue=o.get(`pet_${V}_upper`)?.node,st=o.get(`pet_${V}_lower`)?.node,Je=o.get(`pet_${V}_paw`)?.node;if(!Ue||!st||!Je)throw new Error(`\u66B9\u7F57\u732B\u7F3A\u5C11\u56DB\u8DB3\u9AA8\u9ABC\uFF1A${V}`);let je=d(Ue),Et=d(st),wt=d(Je),Qt=wt.clone().applyMatrix4(a),nt=Et.clone().sub(je.clone().lerp(wt,.5)).transformDirection(a);return{name:V,offset:-_e*.25,upper:Ue,lower:st,paw:Je,rest:Qt,pole:nt,hipRest:je.clone().applyMatrix4(a),a:je.distanceTo(Et),b:Et.distanceTo(wt),pawQuaternion:l.clone().invert().multiply(Je.getWorldQuaternion(new Pe)),anchorQuaternion:Je.getWorldQuaternion(new Pe),targetQuaternion:Je.getWorldQuaternion(new Pe),landingQuaternion:Je.getWorldQuaternion(new Pe),startQuaternion:Je.getWorldQuaternion(new Pe),anchor:wt.clone(),target:wt.clone(),start:wt.clone(),landing:wt.clone(),swing:!1,phase:0,contacts:0}});for(let V of h)V.pawSurface=[],i.traverse(_e=>{if(!_e.isSkinnedMesh||_e.userData.petFur)return;let Ue=_e.geometry.attributes.position,st=_e.geometry.attributes.skinIndex,Je=_e.geometry.attributes.skinWeight;for(let je=0;je<Ue.count;je++){let Et=0;for(let wt=0;wt<4;wt++)_e.skeleton.bones[st.array[je*4+wt]].name===V.paw.name&&(Et+=Je.array[je*4+wt]);Et>.95&&V.pawSurface.push(new S().fromBufferAttribute(Ue,je).applyMatrix4(_e.matrixWorld).applyMatrix4(a).sub(V.rest).applyQuaternion(V.pawQuaternion.clone().invert()))}});for(let V of h){let _e=V.pawSurface.map(je=>{let Et=je.clone().applyQuaternion(V.pawQuaternion).add(V.rest).sub(V.hipRest);return{x:Et.x,y:Et.y,raw:je}}).sort((je,Et)=>je.x-Et.x||je.y-Et.y),Ue=(je,Et,wt)=>(Et.x-je.x)*(wt.y-je.y)-(Et.y-je.y)*(wt.x-je.x),st=[],Je=[];for(let je of _e){for(;st.length>1&&Ue(st.at(-2),st.at(-1),je)<=0;)st.pop();st.push(je)}for(let je of[..._e].reverse()){for(;Je.length>1&&Ue(Je.at(-2),Je.at(-1),je)<=0;)Je.pop();Je.push(je)}V.supportSurface=[...st.slice(0,-1),...Je.slice(0,-1)].map(je=>je.raw),V.floorBaseline=V.rest.y+Math.min(...V.pawSurface.map(je=>je.clone().applyQuaternion(V.pawQuaternion).y))}let f=new Rs([i.position.clone(),...e.pet.route.map(([V,_e])=>new S(V,e.position[1],_e))],!0,"centripetal"),m=f.getLength(),_=e.pet.gaitCycle??.94,p=.66,g=e.pet.walkSpeed??.13,b=0,A="idle",v=0,E=0,R=0,T=0,x=4.5,C=0,N=0,H=!1,B="idle",k=0,D=!1,W=0,J=0,j=!1,ae=0,X=null,re=0,ie=null,ye=e.pet.bodyScale??1,xe=!!e.pet.restPoses,Ie=!!e.pet.groundedSideLie,Xe=.335*ye,et=[];Ie&&i.traverse(V=>{if(!V.isSkinnedMesh||V.userData.petFur)return;let _e=V.geometry.attributes.position,Ue=V.geometry.attributes.skinIndex,st=V.geometry.attributes.skinWeight;for(let Je=0;Je<_e.count;Je++){let je=0;for(let Et=0;Et<4;Et++)["pet_root","pet_chest","pet_haunch"].includes(V.skeleton.bones[Ue.array[Je*4+Et]].name)&&(je+=st.array[Je*4+Et]);je>.55&&_e.getY(Je)>.16&&_e.getY(Je)<.44&&et.push(new S().fromBufferAttribute(_e,Je))}});let O=V=>{let _e=1/0,Ue=Math.sin(V),st=Math.cos(V);for(let Je of et)_e=Math.min(_e,Ue*Je.x+st*(Je.y-Xe));return-_e+.004},w=.165*ye;xe&&i.traverse(V=>{if(V.isSkinnedMesh&&!V.userData.petFur){let _e=V.geometry.attributes.position;for(let Ue=0;Ue<_e.count;Ue++)_e.getY(Ue)>.22&&_e.getY(Ue)<.55&&Math.abs(_e.getZ(Ue))<.2&&(w=Math.max(w,-_e.getX(Ue)+.004))}});let I=0,F=0,U=null,ee="idle",he=[];i.traverse(V=>{V.isMesh&&V.morphTargetDictionary?.sit_100!==void 0&&he.push(V)});let q=[];i.traverse(V=>{V.isMesh&&V.morphTargetDictionary?.lie_100!==void 0&&q.push(V)});let Z=new S(0,1,0),te=new S(0,1,0),le=e.position[1],ge=V=>V*V*(3-2*V),Le=V=>f.getPointAt((V%m+m)%m/m),Fe=V=>{let _e=f.getTangentAt((V%m+m)%m/m);return Math.atan2(_e.x,_e.z)},Se=e.rotation,Oe=o.get("pet_head"),z=e.pet.faceForward?Math.atan2(e.pet.faceForward[0],e.pet.faceForward[2]):0,gt=new S().fromArray(e.pet.faceForward??[0,0,1]).applyQuaternion(l).applyQuaternion(Oe.node.getWorldQuaternion(new Pe).invert()),it=e.pet.faceCenter?new S().fromArray(e.pet.faceCenter).applyMatrix4(i.matrixWorld).applyMatrix4(Oe.node.matrixWorld.clone().invert()):null,P=(V,_e)=>Math.atan2(Math.sin(_e-V),Math.cos(_e-V)),y=(V,_e,Ue)=>V+Math.max(-Ue,Math.min(Ue,_e-V)),Y=()=>{let V=it?it.clone().applyMatrix4(Oe.node.matrixWorld):d(Oe.node),_e=X??s.position;return Math.atan2(_e.x-V.x,_e.z-V.z)},ne=4,ce=0,be=document.createElement("div");be.className="pet-greeting",be.setAttribute("role","status"),be.setAttribute("aria-live","polite"),be.hidden=!0,t.append(be);function Te(V=!H){let _e=new S(0,1.02,.2).applyMatrix4(i.matrixWorld).project(s),Ue=n.getBoundingClientRect(),st=t.getBoundingClientRect();be.hidden=!V||ce<=0||_e.z<-1||_e.z>1,be.style.left=`${Ye.clamp(Ue.left-st.left+(_e.x*.5+.5)*Ue.width,40,Ue.width-40)}px`,be.style.top=`${Ye.clamp(Ue.top-st.top+(-_e.y*.5+.5)*Ue.height,45,Ue.height-45)}px`}function ue(){for(let{node:V,quaternion:_e,position:Ue}of o.values())V.quaternion.copy(_e),V.position.copy(Ue)}function pe(V,_e=0,Ue=0,st=0){let Je=o.get(V);Je&&(V==="pet_head"&&(_e=Ye.clamp(_e,-.07,.07),Ue=Ye.clamp(Ue,-.36,.36),st=Ye.clamp(st,-.19,.19)),Je.node.rotateX(_e),Je.node.rotateY(Ue),Je.node.rotateZ(st))}function Ee(V,_e){let Ue=V.getWorldQuaternion(new Pe),st=_e.clone().sub(d(V)).normalize(),Je=new Pe().setFromUnitVectors(te.clone().applyQuaternion(Ue),st),je=V.parent.getWorldQuaternion(new Pe).invert();V.quaternion.copy(je.multiply(Je.multiply(Ue))),V.updateWorldMatrix(!1,!0)}function qe(V){let _e=d(V.upper);if(V.relaxedSide>0){let bt=V.target.clone().sub(_e),en=(V.a+V.b)*(V.stretch??1)-1e-4,tn=Math.hypot(bt.x,bt.z),hi=Math.sqrt(Math.max(1e-5,en*en-bt.y*bt.y));tn>hi&&(V.target.x=_e.x+bt.x*hi/tn,V.target.z=_e.z+bt.z*hi/tn)}let Ue=V.target.clone().sub(_e),st=Ue.length();Ue.normalize();let Je=V.a*(V.stretch??1),je=V.b*(V.stretch??1),Et=Math.max(Math.abs(Je-je)+1e-5,Math.min(Je+je-1e-5,st)),wt=V.pole.clone().applyQuaternion(i.getWorldQuaternion(new Pe));V.relaxedSide>0&&wt.lerp(new S(-.2,.1,V.name.startsWith("front")?-1:1).applyAxisAngle(Z,Se).normalize(),V.relaxedSide).normalize(),wt.addScaledVector(Ue,-wt.dot(Ue)).normalize();let Qt=Ye.clamp((Je*Je+Et*Et-je*je)/(2*Je*Et),-1,1),nt=_e.clone().addScaledVector(Ue,Je*Qt).addScaledVector(wt,Je*Math.sqrt(1-Qt*Qt));Ee(V.upper,nt),Ee(V.lower,_e.clone().addScaledVector(Ue,Et));let Vt=V.targetQuaternion.clone();if(V.relaxedSide>0){let bt=new Pe().setFromAxisAngle(Z,Se).multiply(new Pe().setFromAxisAngle(new S(0,0,1),-.25)).multiply(V.pawQuaternion).slerp(V.lower.getWorldQuaternion(new Pe).multiply(o.get(V.paw.name).quaternion),.4);Vt.slerp(bt,V.relaxedSide)}V.paw.quaternion.copy(V.paw.parent.getWorldQuaternion(new Pe).invert().multiply(Vt)),V.paw.updateWorldMatrix(!1,!0)}function Ae(V,_e){let Ue=b+_e*_*(1-p+p*.5);return V.rest.clone().applyAxisAngle(Z,Fe(Ue)).add(Le(Ue))}function Re(V="idle"){A="settling",v=0,x=1/0,B=V;for(let _e of h)_e.settled=!1,_e.landingIsRest=!1}function ze(V="idle"){(V==="sit"&&e.pet.sitEnabled===!1||V==="lie"&&e.pet.lieEnabled===!1)&&(V="idle"),A=V,v=0,x=V==="curious"?1/0:V==="lie"?7+T%3:4.5+T%3*.7}function Ke(V){A=V,v=0,x=V==="walk"?5.5+T%4*1.1:1/0;for(let _e of h)_e.settled=!1,_e.waitForStance=((R/_+_e.offset)%1+1)%1>=p}function rt(){N++,ce=ne,D=!0,W=0,j=k>.5,xe&&(ee=U??(F>.1?"lie":I>.1?"sit":"idle"),U=null,j=!1),be.textContent="\u55B5\uFF5E",Te(),A==="walk"||A==="turn"?Re("curious"):A==="settling"?B="curious":ze("curious"),me()}function L(){return{state:H?"paused":A,position:i.position.toArray().map(V=>+V.toFixed(5)),yaw:+Se.toFixed(5),steps:h.reduce((V,_e)=>V+_e.contacts,0),reactions:N,reducedMotion:r,bones:o.size,crouch:+k.toFixed(4),facingCamera:+Math.cos(P(Math.atan2(gt.clone().applyQuaternion(Oe.node.getWorldQuaternion(new Pe)).x,gt.clone().applyQuaternion(Oe.node.getWorldQuaternion(new Pe)).z),Y())).toFixed(5),sit:+I.toFixed(4),sideLie:+F.toFixed(4),tailLift:+ae.toFixed(4),interaction:re>0,head:o.get("pet_head")?.node.quaternion.toArray(),tail:o.get("pet_tail_tip")?.node.quaternion.toArray(),feet:h.map(V=>({name:V.name,swing:V.swing,phase:+V.phase.toFixed(4),contacts:V.contacts,target:V.target.toArray(),actual:d(V.paw).toArray()}))}}function me(){let V=L();t.dataset.petState=V.state,t.dataset.petPosition=JSON.stringify(V.position),t.dataset.petPose=JSON.stringify({head:V.head,tail:V.tail,yaw:V.yaw,crouch:V.crouch,sit:V.sit,sideLie:V.sideLie,facingCamera:V.facingCamera}),t.dataset.petFeet=JSON.stringify(V.feet),t.dataset.petSteps=String(V.steps),t.dataset.petReactions=String(N),t.dataset.petBones=String(o.size),t.dataset.petFacing=String(D&&V.sit<.02&&V.sideLie<.02&&V.facingCamera>.995);let _e=d(Oe.node).add(new S(0,.12,0)).project(s),Ue=n.getBoundingClientRect();t.dataset.petScreen=JSON.stringify([Ue.left+(_e.x*.5+.5)*Ue.width,Ue.top+(-_e.y*.5+.5)*Ue.height])}function se(V,_e){if(H=!_e,_e){ce=Math.max(0,ce-V),E+=V,(!r||D)&&(v+=V),re=Math.max(0,re-V),X&&re===0&&(X=null,U=ie,ie=null),v>=x&&U===null&&(A==="idle"&&!r?(T++,Ke("turn")):A==="walk"?Re(xe?T%2===0?"lie":"sit":T%2===0?"lie":"idle"):(A==="lie"||A==="sit")&&ze());let Ue=D||re>0,st=Ue?Y()-z:Fe(b),Je=P(Se,st),je=Math.abs(Je)>(Ue?.26:.035);A==="curious"&&je&&k<.02&&I<.02&&F<.02&&Ke("turn");let Et=!xe||I<.001&&F<.001,wt=A==="turn"&&Et;wt&&(Se+=Ye.clamp(Je,-.3*V,.3*V),i.rotation.y=Se,Math.abs(P(Se,st))<.035&&Re(D?"curious":"walk"));let Qt=A==="walk"&&Et,nt=Et&&(Qt||A==="settling"||A==="turn"),Vt=Fe(b+.025)-Fe(b),bt=Math.abs(Math.atan2(Math.sin(Vt),Math.cos(Vt)))/.025,en=Qt?Math.min(g,.28/Math.max(.01,bt))*ge(Math.min(1,v/1.1))*ge(Math.min(1,(x-v)/1.1)):0;Qt&&(b+=en*V,i.position.copy(Le(b)),Se=Fe(b),i.rotation.y=Se);let tn=r?A==="curious"?.6:0:1;if(k=y(k,!xe&&(A==="lie"||D&&j&&!je)?1:0,V/1.4),i.position.y=le-.125*ge(k)+.0015*Math.sin(E*1.5)*tn,ue(),xe){let oe=A!=="settling"&&A!=="walk"&&A!=="turn";I=y(I,e.pet.sitEnabled!==!1&&!D&&oe&&F<.001&&(U??A)==="sit"?1:0,V/1.9),F=y(F,e.pet.lieEnabled!==!1&&!D&&oe&&I<.001&&(U??A)==="lie"?1:0,V/2.3);let xt=ge(I),Dt=ge(F),M=Dt*(Ie?-Math.PI*.5:Math.PI*.5);i.quaternion.setFromAxisAngle(Z,Se).multiply(new Pe().setFromAxisAngle(new S(0,0,1),M));let G=(Ie?Xe:.32*ye)*Math.sin(M),$=e.pet.poseSitV2||e.pet.poseSitV3?0:.12*ye*xt,K=Le(b);i.position.x=K.x+G*Math.cos(Se)+$*Math.sin(Se),i.position.z=K.z-G*Math.sin(Se)+$*Math.cos(Se),i.position.y=le+(Ie?Ye.lerp(Xe,O(M),Dt)-Xe*Math.cos(M):(w+.008)*Math.sin(M)),i.updateMatrixWorld(!0);let Q=o.get("pet_chest")?.node,Ce=o.get("pet_root")?.node;if(Q&&Ce){let we=d(Q).add(new S(-$*Math.sin(Se),e.pet.poseSitV3?.064*xt:e.pet.poseSitV2?.03*xt:e.pet.sitCorrectives?.018*xt:0,-$*Math.cos(Se))),Ve=Q.getWorldQuaternion(new Pe),Ge=Ce.parent.getWorldQuaternion(new Pe),lt=new S(1,0,0).applyAxisAngle(Z,Se),ot=new Pe().setFromAxisAngle(lt,e.pet.poseSitV2||e.pet.poseSitV3?0:-.45*xt);Ce.quaternion.copy(Ge.clone().invert().multiply(ot).multiply(Ge).multiply(Ce.quaternion)),i.updateMatrixWorld(!0),Q.position.copy(we.applyMatrix4(Q.parent.matrixWorld.clone().invert())),Q.quaternion.copy(Q.parent.getWorldQuaternion(new Pe).invert().multiply(Ve)),i.updateMatrixWorld(!0)}let He=o.get("pet_haunch")?.node;if(e.pet.poseSitV2||e.pet.poseSitV3)for(let we of["pet_haunch","pet_back_l_upper","pet_back_r_upper"]){let Ve=o.get(we)?.node;if(!Ve)continue;let Ge=(e.pet.poseSitV3?up:cp)(u.get(we),xt).applyMatrix4(i.matrixWorld);Ve.position.copy(Ge.applyMatrix4(Ve.parent.matrixWorld.clone().invert())),Ve.updateWorldMatrix(!1,!0)}else if(He){let we=e.pet.sitCorrectives?new S(0,.01*xt,.055*xt).applyAxisAngle(Z,Se):new S(0,-.02*ye*xt,0);He.position.add(we.applyQuaternion(He.parent.getWorldQuaternion(new Pe).invert()))}}let qi=ce>0?ge(Math.min(1,(ne-ce)/.2))*ge(Math.min(1,ce/.65)):0,Wn=Ie?Ye.lerp(.3,.09,ge(F)):.3;J=Ye.damp(J,Ue?Ye.clamp(P(Se+z,Y()),-Wn,Wn):(Qt?.025:.15)*Math.sin(E*.65)*tn,7,V),i.updateMatrixWorld(!0);let Jn=Oe.node.parent.getWorldQuaternion(new Pe),Gs=new Pe().setFromAxisAngle(Z,Qt?Ye.clamp(J,-.035,.035):J);Oe.node.quaternion.copy(Jn.clone().invert().multiply(Gs).multiply(Jn).multiply(Oe.quaternion));let Fn=X??s.position,di=d(Oe.node),ms=Ue?Ye.clamp(Math.atan2(Fn.y-di.y,Math.hypot(Fn.x-di.x,Fn.z-di.z))*.1,-.03,.03):(Qt?.006:.035)*Math.sin(E*.9)*tn;if(Oe.node.rotateX(ms),Ue||Oe.node.rotateZ((Qt?.018:.035)*Math.sin(E*.9)*tn),xe&&F>0){let oe=new S(0,0,1).applyAxisAngle(Z,Se),xt=Oe.node.parent.getWorldQuaternion(new Pe),Dt=new Pe().setFromAxisAngle(oe,(Ie?Math.PI/9:-.25*Math.PI*.5)*ge(F));if(Ie){let M=new Pe().setFromAxisAngle(new S(0,1,0).applyQuaternion(i.quaternion),-z*.5*ge(F));Oe.node.quaternion.copy(xt.clone().invert().multiply(M).multiply(xt).multiply(Oe.node.quaternion))}Oe.node.quaternion.copy(xt.clone().invert().multiply(Dt).multiply(xt).multiply(Oe.node.quaternion))}ae=Ye.damp(ae,Ue&&(!e.pet.poseSideArap||F<.01)?1:A==="walk"?.3:.07,Ue?5:1.8,V);for(let[oe,xt]of[["pet_tail",e.pet.poseSitV2?-1.15-.3*I+.57*F:-1.15+.35*I+.57*F],["pet_tail_tip",e.pet.poseSitV2?-.7+.5*I+.4*F:-.7+.2*I+.4*F]]){let Dt=o.get(oe),M=Dt.node.parent.getWorldQuaternion(new Pe),G=new S(1,0,0).applyAxisAngle(Z,Se),$=new Pe().setFromAxisAngle(Z,e.pet.poseSideArap&&F>.01?0:.055*Math.sin(E*1.5)*tn+.12*Math.sin(E*4)*qi).multiply(new Pe().setFromAxisAngle(G,xt*(1-ae)));Dt.node.quaternion.copy(M.clone().invert().multiply($).multiply(M).multiply(Dt.node.quaternion)),Dt.node.updateWorldMatrix(!1,!0)}if(Ie&&F>0){let oe=ge(F),xt=o.get("pet_tail").node,Dt=o.get("pet_tail_tip").node;for(let M of[xt,Dt]){let G=M.quaternion.clone(),$=d(M).add(new S(.025*ye,0,-.16*ye).applyAxisAngle(Z,Se));$.y=le+(M===xt?.095:.09)*ye,Ee(M,$);let K=M.quaternion.clone();M.quaternion.copy(G).slerp(K,oe),M.updateWorldMatrix(!1,!0)}}i.updateMatrixWorld(!0),nt&&(R+=V);for(let oe of h){if(e.pet.poseSideArap&&Ie&&F>0){let M=ge(F),G=oe.rest.x<0,$=new S(0,0,1).applyAxisAngle(Z,Se),K=d(oe.upper),Q=d(oe.paw),Ce=oe.paw.getWorldQuaternion(new Pe),He=oe.supportSurface.map(ct=>{let Tt=ct.clone().applyQuaternion(Ce).add(Q).sub(K);return[Tt.y,$.clone().cross(Tt).y]}),we=ct=>{let Tt=Math.cos(ct),ke=Math.sin(ct),Wt=1/0;for(let[yt,pn]of He)Wt=Math.min(Wt,yt*Tt+pn*ke);return K.y+Wt},Ve=(G?Math.PI/3:.05)*M,Ge=Array.from({length:77},(ct,Tt)=>-1.52+Tt*.04),lt=Math.min(...Ge.map(we)),ot=Math.max(le+Ye.lerp(oe.floorBaseline,.001,M)+(G?.035*M:0),lt+5e-4*M),We=[];for(let ct=1;ct<Ge.length;ct++){let Tt=Ge[ct-1],ke=Ge[ct],Wt=we(Tt)-ot,yt=we(ke)-ot;if(!(Wt*yt>0)){for(let pn=0;pn<15;pn++){let Rn=(Tt+ke)*.5,Xn=we(Rn)-ot;Wt*Xn<=0?(ke=Rn,yt=Xn):(Tt=Rn,Wt=Xn)}We.push((Tt+ke)*.5)}}let Rt=We.length?We.reduce((ct,Tt)=>Math.abs(Tt-Ve)<Math.abs(ct-Ve)?Tt:ct):Ge.reduce((ct,Tt)=>Math.abs(we(Tt)-ot)<Math.abs(we(ct)-ot)?Tt:ct),Gt=oe.upper.parent.getWorldQuaternion(new Pe),Ft=new Pe().setFromAxisAngle(Z,(oe.name.startsWith("front")?Math.PI/6:-Math.PI/9)*M).multiply(new Pe().setFromAxisAngle($,Rt));oe.upper.quaternion.copy(Gt.clone().invert().multiply(Ft).multiply(Gt).multiply(oe.upper.quaternion)),oe.upper.updateWorldMatrix(!1,!0),oe.anchor.copy(d(oe.paw)),oe.target.copy(oe.anchor),oe.anchorQuaternion.copy(oe.paw.getWorldQuaternion(new Pe)),oe.targetQuaternion.copy(oe.anchorQuaternion),oe.swing=!1,oe.relaxedSide=0;continue}if(xe&&F>.001&&!Ie){let M=ge(F),G=oe.upper.parent.getWorldQuaternion(new Pe),$=new S(0,0,1).applyAxisAngle(Z,Se),K=new Pe().setFromAxisAngle($,-.5*M*(oe.rest.x>0?1:.025));oe.upper.quaternion.copy(G.clone().invert().multiply(K).multiply(G).multiply(oe.upper.quaternion)),oe.lower.rotateX((oe.name.startsWith("front")?.12:-.12)*M),oe.swing=!1,oe.anchor.copy(oe.rest).applyAxisAngle(Z,Se).add(Le(b)),oe.target.copy(oe.anchor),oe.anchorQuaternion.setFromAxisAngle(Z,Se).multiply(oe.pawQuaternion),oe.targetQuaternion.copy(oe.anchorQuaternion);continue}let xt=((R/_+oe.offset)%1+1)%1;xt<p&&(oe.waitForStance=!1);let Dt=nt&&!oe.settled&&!oe.waitForStance&&xt>=p;if(oe.phase=xt,Dt&&!oe.swing&&(oe.start.copy(oe.anchor),oe.startQuaternion.copy(oe.anchorQuaternion),oe.landing.copy(Qt?Ae(oe,en):oe.rest.clone().applyAxisAngle(Z,Se+(wt?Ye.clamp(P(Se,st),-.15,.15):0)).add(xe&&!wt?Le(b):i.position)),oe.landing.y=le+oe.rest.y,oe.landingIsRest=!Qt&&!wt,oe.landingQuaternion.setFromAxisAngle(Z,Qt?Fe(b+en*_*(1-p+p*.5)):Se+(wt?Ye.clamp(P(Se,st),-.15,.15):0)).multiply(oe.pawQuaternion)),!Dt&&oe.swing&&(oe.anchor.copy(oe.landing),oe.anchorQuaternion.copy(oe.landingQuaternion),oe.contacts++,oe.landingIsRest&&(oe.settled=!0)),Dt){let M=(xt-p)/(1-p);oe.target.lerpVectors(oe.start,oe.landing,ge(M)),oe.target.y+=(e.pet.stepHeight??.032)*Math.sin(Math.PI*M),oe.targetQuaternion.slerpQuaternions(oe.startQuaternion,oe.landingQuaternion,ge(M))}else oe.target.copy(oe.anchor),oe.targetQuaternion.copy(oe.anchorQuaternion);if(k>0&&!nt){let M=oe.rest.clone();oe.name.startsWith("front")?M.z+=.08*ge(k):(M.x+=Math.sign(M.x)*.02*ge(k),M.z-=.025*ge(k)),oe.target.copy(M.applyAxisAngle(Z,Se).add(i.position)),oe.target.y=le+oe.rest.y,oe.anchor.copy(oe.target)}if(xe&&I>0&&!nt){let M=oe.rest.clone();oe.name.startsWith("back")&&(M.z+=(e.pet.poseSitV3?.13:e.pet.poseSitV2?.155:.1*ye)*ge(I),M.x+=Math.sign(M.x)*(e.pet.poseSitV2?-.012:e.pet.poseSitV3?0:.015*ye)*ge(I)),oe.target.copy(M.applyAxisAngle(Z,Se).add(Le(b))),oe.target.y=le+oe.rest.y,e.pet.poseSitV2&&oe.name.startsWith("back")&&(oe.target.y=le+oe.rest.y*(1-.55*ge(I))+.008*Math.sin(Math.PI*I)),e.pet.poseSitV3&&oe.name.startsWith("back")&&(oe.target.y=le+oe.rest.y+(.002+oe.rest.y*.6-oe.rest.y)*ge(I)),oe.anchor.copy(oe.target)}if(Ie&&F>0&&!nt){let M=ge(F),G=oe.rest.x<0,$=oe.name.startsWith("front");if(G){let Ce=new S(0,-.075*M,0).applyQuaternion(oe.upper.parent.getWorldQuaternion(new Pe).invert());oe.upper.position.add(Ce),i.updateMatrixWorld(!0)}let K=oe.rest.clone(),Q=new S((G?-.18:-.24)*ye/.8,K.y,$?(G?.29:.31)*ye/.8:(G?-.28:-.31)*ye/.8);K.lerp(Q,M),oe.target.copy(K.applyAxisAngle(Z,Se).add(Le(b))),oe.anchor.copy(oe.target),oe.targetQuaternion.setFromAxisAngle(Z,Se).multiply(oe.pawQuaternion),oe.anchorQuaternion.copy(oe.targetQuaternion)}if(oe.stretch=e.pet.poseSitV3&&oe.name.startsWith("front")?1+.3*ge(I):1,oe.stretch!==1&&(oe.lower.position.copy(o.get(oe.lower.name).position).multiplyScalar(oe.stretch),oe.paw.position.copy(o.get(oe.paw.name).position).multiplyScalar(oe.stretch),i.updateMatrixWorld(!0)),oe.relaxedSide=Ie?ge(F):0,oe.swing=Dt,oe.relaxedSide>0)for(let M=0;M<6;M++){qe(oe);let G=Z.clone().applyQuaternion(oe.paw.getWorldQuaternion(new Pe).invert()),$=1/0;for(let K of oe.pawSurface)$=Math.min($,K.dot(G));oe.target.y=le-$+.001,oe.anchor.copy(oe.target)}qe(oe)}i.updateMatrixWorld(!0);for(let oe of he){let xt=["sit_25","sit_50","sit_75","sit_100"],Dt=I*4,M=Math.floor(Dt),G=Dt-M;for(let $ of xt)oe.morphTargetInfluences[oe.morphTargetDictionary[$]]=0;M>0&&(oe.morphTargetInfluences[oe.morphTargetDictionary[xt[M-1]]]=1-G),M<4&&(oe.morphTargetInfluences[oe.morphTargetDictionary[xt[M]]]=G)}for(let oe of q){let xt=Object.keys(oe.morphTargetDictionary).filter($=>$.startsWith("lie_")).sort(($,K)=>Number($.slice(4))-Number(K.slice(4))),Dt=F*xt.length,M=Math.floor(Dt),G=Dt-M;for(let $ of xt)oe.morphTargetInfluences[oe.morphTargetDictionary[$]]=0;M>0&&(oe.morphTargetInfluences[oe.morphTargetDictionary[xt[M-1]]]=1-G),M<xt.length&&(oe.morphTargetInfluences[oe.morphTargetDictionary[xt[M]]]=G)}A==="settling"&&h.every(oe=>oe.settled)&&(B==="walk"?Ke("walk"):ze(B)),D&&A==="curious"&&!je&&I<.02&&F<.02&&Math.abs(P(J,P(Se+z,Y())))<.025&&(W+=V,W>4.5&&(D=!1,ze(xe?ee:j?"lie":"idle")))}Te(_e),C+=V,C>.1&&(C=0,me())}i.rotation.y=Se=Fe(0),i.updateMatrixWorld(!0);for(let V of h)V.anchor.copy(V.rest).applyMatrix4(i.matrixWorld),V.target.copy(V.anchor),V.anchorQuaternion.copy(i.getWorldQuaternion(new Pe).multiply(V.pawQuaternion)),V.targetQuaternion.copy(V.anchorQuaternion);function ve(V){!xe||!["idle","sit","lie","walk"].includes(V)||(V==="lie"&&e.pet.lieEnabled===!1&&(V="idle"),D=!1,U=V==="walk"?null:V,V==="walk"?(T++,Ke("turn")):Re(V))}function de(V){ie=U,U=e.pet.sitEnabled===!1?"idle":"sit",D=!1,X=new S().fromArray(V),re=14,Re(U)}function fe(V){re>0&&X.fromArray(V)}function De(){X&&(X=null,re=0,U=ie,ie=null)}let Ne=()=>(i.updateMatrixWorld(!0),it?it.clone().applyMatrix4(Oe.node.matrixWorld).add(new S(0,.05,0)):d(Oe.node));return me(),{update:se,react:rt,snapshot:L,setRestPose:ve,beginInteraction:de,trackCompanion:fe,endInteraction:De,touchPoint:Ne}}var kv=`
  float paws = 1.0 - smoothstep(.10, .24, vFurRest.y);
  float facePoint = smoothstep(.38,.46,vFurRest.z) * (1.0-smoothstep(.57,.65,vFurRest.y)) * smoothstep(.46,.51,vFurRest.y);
  float earPoint = smoothstep(.075,.105,abs(vFurRest.x)) * smoothstep(.68,.72,vFurRest.y);
  float bright = smoothstep(.12,.38,dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)));
  float blueEye = step(diffuseColor.r*1.25,diffuseColor.b)*step(.08,diffuseColor.b);
  vec3 pointColor = vec3(.025,.011,.006);
  diffuseColor.rgb = mix(diffuseColor.rgb, pointColor, bright * max(max(paws,facePoint),earPoint) * (1.0-blueEye));
`;function dp(i,{layers:e=8,length:t=.009,strands:n=24e3,bodyScale:s=1,limbRatio:r=1,preserveTexture:o=!1}={}){let a=o?"":kv,l=f=>new S(f.x/s,f.y/s<.3*r?f.y/s/r:f.y/s+.3*(1-r),f.z/s),c=`vFurRest = position / ${s.toFixed(4)}; vFurRest.y = vFurRest.y < ${(.3*r).toFixed(4)} ? vFurRest.y / ${r.toFixed(4)} : vFurRest.y + ${(.3*(1-r)).toFixed(4)};`,u=[];i.traverse(f=>{f.isSkinnedMesh&&u.push(f)});let d=[],h=0;for(let f of u){f.material.roughness=.95,f.material.metalness=0,f.material.roughnessMap=null,f.material.metalnessMap=null,f.material.isMeshPhysicalMaterial&&(f.material.sheen=.25,f.material.sheenColor.set("#9b8c77"),f.material.sheenRoughness=1),f.material.onBeforeCompile=F=>{F.vertexShader=`varying vec3 vFurRest;
`+F.vertexShader,F.vertexShader=F.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+c),F.fragmentShader=`varying vec3 vFurRest;
`+F.fragmentShader,F.fragmentShader=F.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+a)},f.material.customProgramCacheKey=()=>"siamese-point-coat-v1"+(o?"-source-texture":""),f.material.needsUpdate=!0;let m=f.geometry.clone(),_=m.attributes.position,p=new Float32Array(_.count);for(let F=0;F<_.count;F++){let U=l(new S().fromBufferAttribute(_,F)),ee=U.y,he=U.z,q=ee>.47&&he>.19;p[F]=ee<.32?.38:q?.22:1}m.setAttribute("furLength",new Zt(p,1));for(let F=1;F<=e;F++){let U=F/e,ee=f.material.clone();ee.roughness=.97,ee.metalness=0,ee.alphaTest=.01,ee.alphaToCoverage=!1,ee.transparent=!0,ee.depthWrite=!1,ee.side=jn,ee.onBeforeCompile=q=>{q.uniforms.furDepth={value:U},q.uniforms.furLengthScale={value:t},q.vertexShader=`attribute float furLength; varying vec3 vFurRest; varying float vFurLength; uniform float furDepth; uniform float furLengthScale;
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
        `)},ee.customProgramCacheKey=()=>`siamese-plush-fur-v3-${s}-${r}-${o}`;let he=new ns(m,ee);he.name=`siamese_short_fur_${F}`,he.position.copy(f.position),he.quaternion.copy(f.quaternion),he.scale.copy(f.scale),he.bindMode=f.bindMode,he.bind(f.skeleton,f.bindMatrix),f.morphTargetInfluences&&(he.morphTargetInfluences=f.morphTargetInfluences),he.frustumCulled=!1,he.userData={...f.userData,petFur:!0},he.raycast=()=>{},f.parent.add(he),d.push(he)}let g=m.index,b=m.attributes.uv,A=m.attributes.normal,v=m.attributes.skinIndex,E=m.attributes.skinWeight,R=[],T=0,x=new S,C=new S,N=new S,H=new S,B=new S;for(let F=0;F<g.count;F+=3)x.fromBufferAttribute(_,g.getX(F)),C.fromBufferAttribute(_,g.getX(F+1)),N.fromBufferAttribute(_,g.getX(F+2)),T+=H.subVectors(C,x).cross(B.subVectors(N,x)).length()*.5,R.push(T);let k=1040,D=()=>(k=Math.imul(k,1664525)+1013904223>>>0,k/4294967296),W=[],J=[],j=[],ae=[],X=[],re=[],ie=(m.morphAttributes.position??[]).map(()=>[]),ye=new S,xe=new S,Ie=new S,Xe=new S,et=new S;for(let F=0;F<n;F++){let U=D()*T,ee=0,he=R.length-1;for(;ee<he;){let P=ee+he>>1;R[P]<U?ee=P+1:he=P}let q=[0,1,2].map(P=>g.getX(ee*3+P)),Z=Math.sqrt(D()),te=D(),le=[1-Z,Z*(1-te),Z*te];ye.set(0,0,0),xe.set(0,0,0);let ge=new Me;q.forEach((P,y)=>{ye.addScaledVector(x.fromBufferAttribute(_,P),le[y]),xe.addScaledVector(x.fromBufferAttribute(A,P),le[y]),ge.x+=b.getX(P)*le[y],ge.y+=b.getY(P)*le[y]}),xe.normalize();let Le=l(ye),Fe=Le.y>.45&&Le.z>.22&&Le.y<.69;if(Fe&&Math.abs(Le.x)<.11||Le.y<.18||ye.y<.025&&xe.y<-.15)continue;let Se=(Le.y<.22?.004:Fe||Le.y>.69?.0032:t)*(.7+D()*.65);et.set(0,-1,0).addScaledVector(xe,xe.y).normalize(),Xe.copy(xe).multiplyScalar(.86).addScaledVector(et,.35).normalize(),Ie.crossVectors(xe,new S(D()-.5,D()-.5,D()-.5)).normalize();let Oe=new Map;q.forEach((P,y)=>{for(let Y=0;Y<4;Y++){let ne=v.array[P*4+Y];Oe.set(ne,(Oe.get(ne)??0)+E.array[P*4+Y]*le[y])}});let z=[...Oe].sort((P,y)=>y[1]-P[1]).slice(0,4),gt=z.reduce((P,y)=>P+y[1],0);for(;z.length<4;)z.push([0,0]);let it=W.length/3;for(let P=0;P<2;P++){P&&Ie.crossVectors(Xe,Ie).normalize();for(let Y=0;Y<4;Y++){let ne=Y>1,ce=ne?6e-5:45e-5,be=Y%2?1:-1,Te=ye.clone().addScaledVector(xe,35e-5).addScaledVector(Xe,ne?Se:0).addScaledVector(Ie,be*ce);W.push(Te.x,Te.y,Te.z),J.push(xe.x,xe.y,xe.z),j.push(ge.x,ge.y),ie.forEach((ue,pe)=>{let Ee=new S;q.forEach((qe,Ae)=>Ee.addScaledVector(x.fromBufferAttribute(m.morphAttributes.position[pe],qe),le[Ae])),ue.push(Ee.x,Ee.y,Ee.z)});for(let ue=0;ue<4;ue++)ae.push(z[ue][0]),X.push(z[ue][1]/gt)}let y=it+P*4;re.push(y,y+1,y+2,y+2,y+1,y+3)}}let O=new At;O.setAttribute("position",new ht(W,3)),O.setAttribute("normal",new ht(J,3)),O.setAttribute("uv",new ht(j,2)),O.setAttribute("skinIndex",new ws(ae,4)),O.setAttribute("skinWeight",new ht(X,4)),O.setIndex(re),ie.length&&(O.morphTargetsRelative=!0,O.morphAttributes.position=ie.map(F=>new ht(F,3))),h+=W.length/24;let w=f.material.clone();w.side=kt,w.roughness=1,w.onBeforeCompile=F=>{f.material.onBeforeCompile(F),F.fragmentShader=F.fragmentShader.replace("#include <normal_fragment_begin>",dt.normal_fragment_begin.replace("normal *= faceDirection;",""))},w.customProgramCacheKey=()=>"siamese-fiber-coat-v1"+(o?"-source-texture":"");let I=new ns(O,w);I.name="siamese_fine_fibers",I.position.copy(f.position),I.quaternion.copy(f.quaternion),I.scale.copy(f.scale),I.bindMode=f.bindMode,I.bind(f.skeleton,f.bindMatrix),I.frustumCulled=!1,I.userData={...f.userData,petFur:!0},I.raycast=()=>{},f.parent.add(I),d.push(I),f.morphTargetInfluences&&(I.morphTargetInfluences=f.morphTargetInfluences)}return{layers:e,length:t,fibers:h,meshes:u.length,setVisible:f=>d.forEach(m=>m.visible=f)}}function fp({actor:i,avatar:e,model:t,bones:n,houseGroup:s,getBed:r,root:o,height:a}){let l,c,u,d,h,f,m=!1,_="idle",p=null,g=new Map([...n].map(([B,k])=>[B,k.quaternion.clone()])),b=new Pe,A=new Pn,v=[],E=[],R=e.matrixWorld.clone().invert();t.updateWorldMatrix(!0,!0),t.traverse(B=>{if(!B.isMesh||B.name.includes("eyelid"))return;let k=[];for(let D=0;D<B.geometry.attributes.position.count;D++){let W=B.getVertexPosition(D,new S).applyMatrix4(B.matrixWorld).applyMatrix4(R);W.y>.35&&W.y<1.15&&k.push(D)}v.push({node:B,ids:k}),E.push(B)});let T=B=>(B=Ye.clamp(B,0,1),B*B*(3-2*B));function x(B,k){let D=n.get("comp_arm_"+B),W=n.get("comp_forearm_"+B),J=n.get("comp_hand_"+B);if(!D||!W||!J)return;s.updateMatrixWorld(!0);let j=D.getWorldPosition(new S),ae=W.getWorldPosition(new S),X=J.getWorldPosition(new S),re=j.distanceTo(ae),ie=ae.distanceTo(X),ye=k.clone().sub(j),xe=Math.min(ye.length(),re+ie-1e-4);ye.normalize();let Ie=new S(0,-1,.15);Ie.addScaledVector(ye,-Ie.dot(ye)).normalize();let Xe=Ye.clamp((re*re+xe*xe-ie*ie)/(2*re*xe),-1,1),et=j.clone().addScaledVector(ye,re*Xe).addScaledVector(Ie,re*Math.sqrt(1-Xe*Xe)),O=(w,I,F)=>{let U=w.getWorldPosition(new S),ee=w.getWorldQuaternion(new Pe),he=I.getWorldPosition(new S).sub(U).normalize(),q=new Pe().setFromUnitVectors(he,F.clone().sub(U).normalize());w.quaternion.copy(w.parent.getWorldQuaternion(new Pe).invert().multiply(q.multiply(ee))),w.updateWorldMatrix(!1,!0)};O(D,W,et),O(W,J,j.clone().addScaledVector(ye,xe))}function C(){m=!1,_="idle",c&&(c.visible=!0),u&&(u.visible=!1),o.dataset.companionSleep="idle"}function N(){if(C(),l=r(),!l)return;l.updateWorldMatrix(!0,!0);let B=[];if(l.traverse(k=>{!k.isMesh||k===u||(k.material?.name==="purple quilt"&&(c=k),k.material?.name==="blue porcelain"&&B.push(k))}),f=Math.max(...B.map(k=>new Ot().setFromObject(k).max.y)),!(!Number.isFinite(f)||!c)){if(!u){let k=c.geometry.clone(),D=l.matrixWorld.clone().invert().multiply(c.matrixWorld);k.applyMatrix4(D),k.computeBoundingBox(),h=k.boundingBox.clone(),d=k.attributes.position.array.slice(),u=new $e(k,c.material),u.name="companion-sleep-quilt",u.userData.roomId="bedroom",u.castShadow=!0,u.receiveShadow=!0,l.add(u)}u.visible=!1,m=!0,p=null}}function H(B){if(!m)return;let k=T(B/1.2),D=T((B-1.2)/1.4),W=T((B-2.6)/1.4),J=T((B-4)/1.2);_=B<1.2?"pull":B<2.6?"climb":B<4?"lie":B<5.2?"cover":"sleep",o.dataset.companionSleep=_,i.position.set(l.position.x+.87*(1-D),l.position.y+(f-l.position.y)*D,l.position.z+.3+(a/2-.3)*W),e.rotation.set((-Math.PI/2+.18)*W,-Math.PI/2*(1-W),0),e.position.set(0,0,0);let j=(O,w,I,F)=>{let U=n.get(O);U&&U.quaternion.copy(g.get(O)).multiply(b.setFromEuler(A.set(w,I,F)))},ae=1-W;j("comp_arm_l",-.55*ae,0,.16*ae),j("comp_arm_r",-.55*ae,0,-.16*ae),j("comp_forearm_l",0,-.45*ae,0),j("comp_forearm_r",0,.45*ae,0),j("comp_leg_l",-.65*D*(1-W),0,0),j("comp_leg_r",-.65*D*(1-W),0,0);for(let O of["l","r"])j("comp_shin_"+O,0,0,0),j("comp_foot_"+O,0,0,0);if(W>0){s.updateMatrixWorld(!0);let O=1/0;for(let{node:w,ids:I}of v)for(let F of I)O=Math.min(O,w.getVertexPosition(F,new S).applyMatrix4(w.matrixWorld).y);Number.isFinite(O)&&(e.position.y+=(f+.007-O)*W,s.updateMatrixWorld(!0),p=W===1?O+e.position.y-f:null)}if(_==="pull"||_==="climb")for(let[O,w]of[["l",-.12],["r",.12]])x(O,new S(l.position.x+.57,f+.04+.1*k*(1-D),l.position.z+.56+w));if(_==="cover")for(let[O,w]of[["l",-.25],["r",.25]])x(O,new S(l.position.x+w,f+.23,l.position.z+.5-.4*J));o.dataset.companionBedSurface=String(f),o.dataset.companionBedGap=p===null?"":p.toFixed(4);let X=u.geometry.attributes.position,{min:re,max:ie}=h,ye=Ye.lerp(Ye.lerp(re.z,.3,k),.1,J),xe=l.matrixWorld.clone().invert(),Ie=new Float32Array(25).fill(ie.y),Xe=.24;if(W>0){s.updateMatrixWorld(!0);for(let O of E)for(let w=0;w<O.geometry.attributes.position.count;w++){let I=O.getVertexPosition(w,new S).applyMatrix4(O.matrixWorld).applyMatrix4(xe);if(I.z>ye-.025&&I.z<ie.z&&Math.abs(I.x)<.48){let F=Ye.clamp(Math.round((I.z-ye)/(ie.z-ye)*24),0,24);Ie[F]=Math.max(Ie[F],I.y+.075),Xe=Math.max(Xe,Math.abs(I.x))}}}let et=Ie.map((O,w)=>Math.max(...Ie.slice(Math.max(0,w-2),Math.min(25,w+3))));for(let O=0;O<X.count;O++){let w=d[O*3],I=d[O*3+1],F=d[O*3+2],U=(F-re.z)/(ie.z-re.z),ee=1-T((Math.abs(w)-Xe-.035)/(ie.x-Xe-.035)),he=U*24,q=Ye.lerp(et[Math.floor(he)],et[Math.min(24,Math.ceil(he))],he%1),Z=Math.max(0,q-ie.y)*J,te=.08*k*(1-J)*(1-U)**2;X.setXYZ(O,w,I+Z*ee+te,ye+(ie.z-ye)*U)}X.needsUpdate=!0,u.geometry.computeVertexNormals(),u.geometry.computeBoundingBox(),u.geometry.computeBoundingSphere(),u.visible=!0,c.visible=!1}return{begin:N,reset:C,update:H,snapshot:()=>({phase:_,surface:f,contactGap:p,active:m})}}var Jt={status:"review",version:"20261013-diary-toy-v9",model:"assets/house-companion/spongebob.glb",api:"https://gsy-gpu.tail660bdf.ts.net/house-api",height:.88,daySeconds:120,activitySeconds:10,schedule:[{room:"bedroom",action:"wake",label:"\u8D77\u5E8A\u5566"},{room:"bathroom",action:"wash",label:"\u6D17\u6F31\u65F6\u95F4"},{room:"living",action:"listen",label:"\u542C\u542C\u97F3\u4E50"},{room:"library",action:"rest",label:"\u6ED1\u6ED1\u68AF\uFF0C\u6B47\u4E00\u4F1A\u513F"},{room:"bedroom",action:"journal",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0"},{room:"bedroom",action:"toy",label:"\u73A9\u73A9\u5177\u7BB1"},{room:"roof",action:"bubble",label:"\u5439\u6CE1\u6CE1"},{room:"bedroom",action:"sleep",label:"\u665A\u5B89\uFF0C\u597D\u68A6"}],rooms:{living:{entry:[-.6,0,2.25],position:[.25,0,1.25],activities:["listen","pet","rest"]},storage:{entry:[-3.45,0,1.65],position:[-3.4,0,.8],activities:["tidy","rest"]},bathroom:{entry:[-.65,3,2.05],position:[-.45,3,.9],activities:["wash","rest"]},bedroom:{entry:[.2,6,1.9],position:[-1.5,6,1.3],activities:["journal","toy","rest","sleep"],bed:[-1.65,6.85,-.2]},library:{entry:[2.60267,3,2.22],waypoints:[[3.6,3,2.1]],position:[3.6,3,1.05],activities:["rest"]},roof:{entry:[1.8,9,.9],position:[.65,9,.85],activities:["bubble","rest"]}},actions:{wave:{room:null,label:"\u5411\u4F60\u6253\u62DB\u547C"},journal:{room:"bedroom",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0",duration:12},toy:{room:"bedroom",label:"\u73A9\u73A9\u5177\u7BB1",duration:10},read:{room:"bedroom",label:"\u7FFB\u5B9E\u4E60\u65E5\u8BB0",duration:12},rest:{room:null,label:"\u6B47\u4E00\u5C0F\u4F1A\u513F"},sleep:{room:"bedroom",label:"\u51C6\u5907\u7761\u89C9",duration:30},wash:{room:"bathroom",label:"\u6D17\u6F31"},listen:{room:"living",label:"\u542C\u97F3\u4E50"},pet:{room:"living",label:"\u966A\u966A\u5C0F\u732B",duration:16},bubble:{room:"roof",label:"\u5439\u6CE1\u6CE1"},tidy:{room:"storage",label:"\u6574\u7406\u6536\u85CF"},wake:{room:"bedroom",label:"\u8D77\u5E8A\u4F38\u4E2A\u61D2\u8170"}}};function pp({actor:i,avatar:e,bones:t,houseGroup:n,getDisplay:s,getToyChest:r,root:o}){let a=T=>(T=Ye.clamp(T,0,1),T*T*(3-2*T)),l=null,c=null,u=null,d="idle",h=0,f=new S,m=new S,_=0,p=null,g=null;function b(){l&&c&&(c.parent.add(l),l.position.copy(c.position),l.quaternion.copy(c.quaternion),l.scale.copy(c.scale),l.userData.diary.update(0,!0,0)),r?.()?.setCompanionPlaying(!1),l=null,c=null,u=null,d="idle",h=0,p=null,o.dataset.companionProp="idle"}function A(T){if(b(),!!["journal","read","toy"].includes(T)){if(u=T==="toy"?"toy":"journal",f.copy(i.position),u==="journal"){if(l=s("work-journal"),!l){u=null;return}c={parent:l.parent,position:l.position.clone(),quaternion:l.quaternion.clone(),scale:l.scale.clone()},c.housePosition=l.position.clone(),c.houseQuaternion=l.quaternion.clone(),c.houseScale=l.scale.clone(),m.copy(l.position).add(new S(-.36,0,.155*l.scale.x)),m.y=6}else{let x=r?.();if(!x){u=null;return}m.copy(n.worldToLocal(x.touchPoint())).add(new S(-.26,0,.3)),m.y=6}_=Math.PI,d="approach"}}function v(T){if(!u)return null;if(i.position.lerpVectors(f,m,a(T/2)),T<2){d="approach";let x=m.clone().sub(f);_=Math.atan2(x.x,x.z)}else _=u==="journal"?Math.PI/2:Math.PI,d=u==="toy"?T<3?"open":T<7.4?"play":T<8.6?"close":"done":T<3.2?"reach":T<4.5?"lift":T<7?"read":T<8.3?"return":T<9.1?"release":"done";if(u==="toy"&&r()?.setCompanionPlaying(T>=2.75&&T<8),u==="journal"){let x=(C,N)=>{let H=(T-C)/N;return H>0&&H<1?.36*Math.sin(Math.PI*H):0};i.position.y+=x(2.35,1.7)+x(7.45,1.7),T>4.5&&T<7&&(_=Ye.lerp(Math.PI/2,.1,a((T-4.5)/.6))),T>=7&&T<7.5&&(_=Ye.lerp(.1,Math.PI/2,a((T-7)/.5)))}return o.dataset.companionProp=u+":"+d,{walking:d==="approach",yaw:_,phase:d}}function E(T,x,C=1){let N=t.get("comp_arm_"+T),H=t.get("comp_forearm_"+T),B=t.get("comp_hand_"+T);if(!N||!H||!B)return;n.updateMatrixWorld(!0);let k=N.getWorldPosition(new S),D=H.getWorldPosition(new S),W=B.getWorldPosition(new S);x=W.clone().lerp(x,C);let J=k.distanceTo(D),j=D.distanceTo(W),ae=x.clone().sub(k),X=Math.min(ae.length(),J+j-1e-4);ae.normalize(),g={shoulder:k.toArray(),target:x.toArray(),length:J+j,distance:k.distanceTo(x)};let re=new S(0,-1,.15).transformDirection(e.matrixWorld);re.addScaledVector(ae,-re.dot(ae)).normalize();let ie=Ye.clamp((J*J+X*X-j*j)/(2*J*X),-1,1),ye=k.clone().addScaledVector(ae,J*ie).addScaledVector(re,J*Math.sqrt(1-ie*ie)),xe=(Ie,Xe,et)=>{let O=Ie.getWorldPosition(new S),w=Ie.getWorldQuaternion(new Pe),I=Xe.getWorldPosition(new S).sub(O).normalize(),F=new Pe().setFromUnitVectors(I,et.clone().sub(O).normalize());Ie.quaternion.copy(Ie.parent.getWorldQuaternion(new Pe).invert().multiply(F.multiply(w))),Ie.updateWorldMatrix(!1,!0)};return xe(N,H,ye),xe(H,B,k.clone().addScaledVector(ae,X)),B.getWorldPosition(new S).distanceTo(x)}function R(T,x){if(p=null,!u||d==="approach")return;if(u==="toy"){let D=r()?.touchPoint();D&&(D.y+=d==="play"?.04+.04*Math.sin(T*4):0,p=E("r",D,d==="done"?0:a((T-2)/.6)));return}let C=T<4.5?a((T-3.2)/1.3):1-a((T-7)/1.3);h=T<4.5?a((T-3.65)/.85):1-a((T-7)/.55),n.updateMatrixWorld(!0);let N=e.localToWorld(new S(0,.53,.36));c.parent.worldToLocal(N);let H=c.parent.getWorldQuaternion(new Pe).invert().multiply(e.getWorldQuaternion(new Pe)).multiply(new Pe().setFromEuler(new Pn(0,Math.PI,0))).multiply(new Pe().setFromEuler(new Pn(-1.19,0,0)));l.position.lerpVectors(c.housePosition,N,C),l.quaternion.slerpQuaternions(c.houseQuaternion,H,C),l.scale.copy(c.houseScale),l.userData.diary.update(T,x,h),l.updateWorldMatrix(!0,!0);let B=d==="reach"?a((T-2)/1.2):d==="release"?1-a((T-8.3)/.8):d==="done"?0:1,k=[];for(let[D,W]of[["l",1],["r",-1]]){let J=.155-W*.2,j=l.localToWorld(new S(Ye.lerp(J,-W*.3,h),-.11,.035)),ae=E(D,j,B);ae!==void 0&&k.push(ae)}p=k.length?Math.max(...k):null}return{begin:A,reset:b,place:v,update:R,snapshot:()=>({kind:u,phase:d,opening:h,handGap:p,reach:g,source:l?.name??null,sourceId:l?.uuid??null,position:l?.position.toArray()??null,home:c?.housePosition.toArray()??null,visible:l?.visible??!1})}}function mp(i,e,t=!1,n="auto",s=null){let r=m=>{let _=(i%20-m)/.24;return _>=0&&_<=1?Math.sin(Math.PI*_):0},o=Math.max(...[2.8,7.2,7.55,12.6,17.4].map(r)),a=["read","journal","tidy"].includes(e),l=e==="sleep",c=a?Math.sin(i*.75)*.28:Math.sin(i*.47)*.38,u=a?-.95:Math.sin(i*.31)*.16;s&&!a&&(c=s.x*.85,u=s.y*.65);let d=["wave","bubble","pet","wake"].includes(e)?.85:.25,h=e==="rest"?.8:a?.65:0;o=Math.max(o,a?.18:e==="rest"?.12:0);let f=e==="wave"?.8:a?.2:.1;return l&&(o=1,c=0,u=0,d=.1,h=1,f=0),n==="blink"&&(o=1),n==="left"&&(o=0,c=-1,u=0),n==="right"&&(o=0,c=1,u=0),n==="happy"&&(o=.13,d=1,h=0,f=1),n==="calm"&&(o=.35,d=0,h=1,f=0),{blink:o,lookRight:Math.max(0,c),lookLeft:Math.max(0,-c),lookUp:Math.max(0,u),lookDown:Math.max(0,-u),smile:d,calm:h,browRaise:f,talk:t?(Math.sin(i*13)+1)*.42:0}}function gp(i,e){let t=[i.entry,...i.waypoints??[],i.position],n=t.slice(1).map((r,o)=>Math.hypot(...r.map((a,l)=>a-t[o][l]))),s=Math.max(0,Math.min(1,e))*n.reduce((r,o)=>r+o,0);for(let r=0;r<n.length;r++){if(s<=n[r]||r===n.length-1){let o=n[r]?Math.min(1,s/n[r]):1;return{position:t[r].map((a,l)=>a+(t[r+1][l]-a)*o),direction:t[r+1].map((a,l)=>a-t[r][l])}}s-=n[r]}}function _p(i){let e=Math.max(0,Math.min(1,i)),t=e*e*(3-2*e);return{position:[2.25+.6*Math.sin(e*Math.PI*.8),7.65-4.45*t,-.4+2.1*e],direction:[.6*Math.PI*.8*Math.cos(e*Math.PI*.8),-26.7*e*(1-e),2.1]}}function xp({actor:i,avatar:e,model:t,bones:n,houseGroup:s}){let r=[];s.updateMatrixWorld(!0);let o=e.matrixWorld.clone().invert();t.traverse(d=>{if(!d.isMesh||d.name.includes("eyelid"))return;let h=[];for(let f=0;f<d.geometry.attributes.position.count;f++){let m=d.getVertexPosition(f,new S).applyMatrix4(d.matrixWorld).applyMatrix4(o);m.y>.26&&m.y<.43&&Math.abs(m.x)<.32&&h.push(f)}r.push({node:d,ids:h})});function a(d,h,f){let m=d.getWorldPosition(new S),_=d.getWorldQuaternion(new Pe),p=h.getWorldPosition(new S).sub(m).normalize(),g=new Pe().setFromUnitVectors(p,f.clone().normalize());d.quaternion.copy(d.parent.getWorldQuaternion(new Pe).invert().multiply(g.multiply(_))),d.updateWorldMatrix(!1,!0)}let l=0,c=0;function u(d,h,f){c=d;let m=_p(d),_=new S(...m.position),p=new S(...m.direction).normalize();i.position.copy(_).lerp(new S(...f),h),e.rotation.set(-.1*(1-h),Math.atan2(p.x,p.z),0),e.position.set(0,0,0);let g=new S(p.z,0,-p.x).normalize(),b=new S().crossVectors(p,g).normalize();if(s.updateMatrixWorld(!0),h<1){for(let v of["l","r"]){let E=n.get("comp_leg_"+v),R=n.get("comp_shin_"+v),T=n.get("comp_foot_"+v);!E||!R||!T||(a(E,R,p.clone().addScaledVector(b,.3)),a(R,T,p.clone().addScaledVector(b,.08)))}s.updateMatrixWorld(!0);let A=1/0;for(let{node:v,ids:E}of r)for(let R of E)A=Math.min(A,v.getVertexPosition(R,new S).applyMatrix4(v.matrixWorld).sub(_).dot(b));Number.isFinite(A)&&e.position.addScaledVector(b,(.012-A)*(1-h)),s.updateMatrixWorld(!0);for(let v of["l","r"]){let E=n.get("comp_arm_"+v),R=n.get("comp_forearm_"+v),T=n.get("comp_hand_"+v),x=n.get("comp_shin_"+v);if(!E||!R||!T||!x)continue;let C=E.getWorldPosition(new S),N=R.getWorldPosition(new S),H=T.getWorldPosition(new S),B=C.distanceTo(N),k=N.distanceTo(H),D=x.getWorldPosition(new S).addScaledVector(b,.07).sub(C),W=Math.min(D.length(),B+k-.001);D.normalize();let J=g.clone().multiplyScalar(v==="l"?1:-1);J.addScaledVector(D,-J.dot(D)).normalize();let j=Ye.clamp((B*B+W*W-k*k)/(2*B*W),-1,1),ae=C.clone().addScaledVector(D,B*j).addScaledVector(J,B*Math.sqrt(1-j*j));a(E,R,ae.sub(C)),a(R,T,C.clone().addScaledVector(D,W).sub(R.getWorldPosition(new S)))}s.updateMatrixWorld(!0),l=1/0;for(let{node:v,ids:E}of r)for(let R of E)l=Math.min(l,v.getVertexPosition(R,new S).applyMatrix4(v.matrixWorld).sub(_).dot(b));Number.isFinite(l)||(l=null)}return{slide:m,contact:l}}return{update:u,snapshot:()=>({progress:c,contact:l,posture:"seated"})}}function yp(i){let e=0,t=0,n=null,s=null,r=0,o=()=>i.schedule[Math.floor(e/(i.daySeconds/i.schedule.length))%i.schedule.length],a=()=>{let l=o(),c=s?.room??n??l.room,u=i.rooms[c].activities,d=s?.action??(n?u[Math.floor(t/i.activitySeconds)%u.length]:l.action);return{room:c,action:d,day:e,phase:Math.floor(e/(i.daySeconds/i.schedule.length)),revision:r,following:!!n,commanded:!!s}};return{snapshot:a,tick(l,c=!1,u=!1){return c||(e=(e+Math.max(0,l))%i.daySeconds,t+=Math.max(0,l)),s&&(!c||u)&&(s.remaining-=Math.max(0,l),s.remaining<=0&&(s=null)),a()},follow(l){return l&&!i.rooms[l]?!1:(n=l,t=0,s=null,r++,!0)},act(l){let c=i.actions[l];return c?(s={action:l,room:c.room??n??o().room,remaining:c.duration??10},r++,!0):!1},cancel(){s=null,r++}}}function vp({root:i,canvas:e,camera:t,houseGroup:n,focusRoom:s,getRoom:r,getAsset:o,getPet:a,getDisplay:l,getToyChest:c,reducedMotion:u,onReady:d=()=>{},onError:h=()=>{}}){let f=yp(Jt),m=new pt;m.name="spongebob-companion",n.add(m),m.userData.companionId="spongebob";let _=new pt;m.add(_);let p=Jt.height/1.25;_.scale.setScalar(p);let g=new Map,b=new Map,A=null,v=null,E=null,R=null,T=null,x=null,C=[],N=[],H=[],B=0,k="auto",D={},W=null,J=-10,j=0,ae=null,X=null,re=0,ie=0,ye=!1,xe=0,Ie=.64,Xe=.32,et=null,O=!1,w=!1,I=2,F=null,U=0,ee=null,he=null,q=document.createElement("section");q.className="companion-hud",q.setAttribute("aria-label","\u6D77\u7EF5\u5B9D\u5B9D\u7684\u4F5C\u606F"),q.hidden=!i.hasAttribute("data-house-companion-preview"),q.innerHTML='<span class="companion-day">\u6D77\u7EF5\u5B9D\u5B9D\u5165\u4F4F\u9884\u89C8 \xB7 \u5F85\u5BA1</span><strong data-companion-activity>\u6B63\u5728\u8F7D\u5165\u6D77\u7EF5\u5B9D\u5B9D\u2026</strong><div class="companion-review-controls"><select aria-label="\u9884\u89C8\u89D2\u8272\u52A8\u4F5C" data-companion-action disabled>'+Object.entries(Jt.actions).filter(([L])=>L!=="wake"&&L!=="tidy").map(([L,me])=>'<option value="'+L+'">'+me.label+"</option>").join("")+"</select></div>",i.append(q);let Z=document.createElement("select");Z.setAttribute("aria-label","\u9884\u89C8\u89D2\u8272\u8868\u60C5"),Z.innerHTML='<option value="auto">\u81EA\u7136\u8868\u60C5</option><option value="blink">\u95ED\u773C</option><option value="left">\u770B\u5DE6\u8FB9</option><option value="right">\u770B\u53F3\u8FB9</option><option value="happy">\u5F00\u5FC3</option><option value="calm">\u653E\u677E</option>',q.querySelector(".companion-review-controls").append(Z),Z.addEventListener("change",()=>{k=Z.value}),e.addEventListener("pointermove",L=>{let me=e.getBoundingClientRect();W={x:((L.clientX-me.left)/me.width-.5)*2,y:(.5-(L.clientY-me.top)/me.height)*2},J=B});let te=document.createElement("div");te.className="companion-bubble",te.hidden=!0,te.setAttribute("role","status"),i.append(te);let le=document.createElement("dialog");le.className="companion-chat",le.setAttribute("aria-label","\u548C\u6D77\u7EF5\u5B9D\u5B9D\u804A\u5929"),le.innerHTML=`<header><div><b>\u6D77\u7EF5\u5B9D\u5B9D</b><small>\u6709\u7A7A\u804A\u4E24\u53E5\u5417\uFF1F</small></div><button type="button" data-companion-close aria-label="\u5173\u95ED\u804A\u5929"></button></header>
    <p data-companion-config class="companion-config">\u6B63\u5728\u8FDE\u63A5\u804A\u5929\u2026</p>
    <div class="companion-messages" role="log" aria-live="polite"></div>
    <div class="companion-suggestions"><button type="button" data-say="\u7FFB\u7FFB\u5B9E\u4E60\u65E5\u8BB0\u5427">\u7FFB\u65E5\u8BB0</button><button type="button" data-say="\u6211\u4EEC\u4E00\u8D77\u5439\u6CE1\u6CE1\u5427">\u5439\u6CE1\u6CE1</button><button type="button" data-say="\u53BB\u7761\u89C9\u5427">\u665A\u5B89</button></div>
    <form><label for="companion-input">\u8DDF\u4ED6\u8BF4\u53E5\u8BDD</label><div class="companion-input-row"><input id="companion-input" maxlength="400" autocomplete="off" placeholder="\u6BD4\u5982\uFF1A\u4E00\u8D77\u53BB\u8BFB\u4E66\u5427"><button type="submit">\u53D1\u9001</button></div></form>
    <footer><span data-companion-status role="status"></span></footer>`,document.body.append(le);let ge=q.querySelector("[data-companion-activity]"),Le=le.querySelector(".companion-messages"),Fe=le.querySelector("[data-companion-status]"),Se=le.querySelector("input"),Oe=le.querySelector("[type=submit]"),z={snapshot:()=>({...f.snapshot(),loaded:ye,room:ae,activity:X,entryTime:re,chatOpen:le.open,position:m.position.toArray(),height:Jt.height,face:D,bedHeight:et,backOffset:Xe,sleep:R?.snapshot(),slide:T?.snapshot(),book:Ae.snapshot(),petContact:x,bones:[...g.keys()],animations:A?.userData.animations??[],status:"review"}),actor:m};i.dataset.companionState="loading";let gt=document.createElement("link");gt.rel="stylesheet",gt.href="./styles/house-companion.css?v="+Jt.version,document.head.append(gt);function it(L,me="assistant"){let se=document.createElement("p");for(se.className="companion-message "+me,se.textContent=L,Le.append(se);Le.children.length>24;)Le.firstElementChild.remove();Le.scrollTop=Le.scrollHeight}function P(L=!0){U++,ee?.abort(),ee=null,Oe.disabled=!1,Fe.textContent="",L&&f.cancel()}function y(){P(!1),le.open&&le.close(),he?.focus({preventScroll:!0})}function Y(){xe=3,te.textContent="\u55E8\uFF01\u6211\u51C6\u5907\u597D\u5566\uFF01",te.hidden=!1,f.act("wave")}function ne(L=e){ye&&(he=L,Y(),le.open||le.show(),Se.focus())}le.querySelector("[data-companion-close]").addEventListener("click",y),q.querySelector("[data-companion-action]").addEventListener("change",L=>{if(!ye)return;P();let me=L.target.value,se=Jt.actions[me].room;se&&s(se),f.act(me),X=null}),document.addEventListener("keydown",L=>{L.key==="Escape"&&le.open&&!document.querySelector("dialog:modal")&&(L.preventDefault(),y())}),le.addEventListener("cancel",L=>{L.preventDefault(),y()}),le.addEventListener("close",()=>{P(!1)});async function ce(L,me,se){let ve=await fetch(Jt.api+L,{method:me?"POST":"GET",headers:me?{"Content-Type":"application/json"}:void 0,body:me?JSON.stringify(me):void 0,signal:se});if(!ve.ok){let de=await ve.json().catch(()=>null);throw new Error(typeof de?.detail=="string"?de.detail:"\u5C0F\u5C4B\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u8BD5")}return ve}let be=new AbortController,Te=setTimeout(()=>be.abort(),8e3);ce("/health",null,be.signal).then(L=>L.json()).then(L=>{le.querySelector("[data-companion-config]").textContent=L.chatConfigured?"\u6587\u5B57\u804A\u5929":"\u804A\u5929\u5C1A\u672A\u914D\u7F6E \xB7 \u9700\u8981\u670D\u52A1\u5668 DeepSeek \u5BC6\u94A5",i.dataset.companionChatConfigured=String(L.chatConfigured)}).catch(()=>{le.querySelector("[data-companion-config]").textContent="\u804A\u5929\u670D\u52A1\u6682\u65F6\u672A\u8FDE\u63A5\uFF0C\u4F5C\u606F\u548C\u623F\u95F4\u966A\u4F34\u4ECD\u53EF\u4F53\u9A8C",i.dataset.companionChatConfigured="false"}).finally(()=>clearTimeout(Te));async function ue(L){if(L=L.trim(),!L||L.length>400||Oe.disabled)return;P();let me=U,se=new AbortController;ee=se;let ve=setTimeout(()=>se.abort(),6e4);Oe.disabled=!0,it(L,"user"),Se.value="",Fe.textContent="\u6D77\u7EF5\u5B9D\u5B9D\u6B63\u5728\u60F3\u2026";try{F||(F=(await(await ce("/session",{},se.signal)).json()).session);let fe=await(await ce("/chat",{session:F,message:L,room:ae??"living",activity:X??"idle"},se.signal)).json();if(me!==U)return;if(it(fe.reply),Fe.textContent="",fe.action&&Jt.actions[fe.action]){let De=Jt.actions[fe.action].room;pe=!0;try{De&&De!==r()&&s(De)}finally{pe=!1}f.act(fe.action),X=null}}catch(de){if(me!==U)return;de.name==="AbortError"?Fe.textContent="\u56DE\u590D\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u53D1\u9001":(Fe.textContent=de.message,de.message.includes("\u4F1A\u8BDD\u5DF2\u8FC7\u671F")&&(F=null))}finally{clearTimeout(ve),me===U&&(Oe.disabled=!1,ee=null)}}le.querySelector("form").addEventListener("submit",L=>{L.preventDefault(),ue(Se.value)}),le.querySelectorAll("[data-say]").forEach(L=>L.addEventListener("click",()=>ue(L.dataset.say)));let pe=!1;window.addEventListener("house:room-changed",L=>{O=L.detail.id==="library",pe||P(),f.follow(L.detail.id),X=null}),document.addEventListener("visibilitychange",()=>{document.hidden&&P()});let Ee=new pt;m.add(Ee);let qe=new hn({color:11528950,transparent:!0,opacity:.28,roughness:.1,metalness:.05,clearcoat:1});for(let L=0;L<6;L++){let me=new $e(new kn(.05+L*.006,12,8),qe);Ee.add(me)}Ee.visible=!1;let Ae=pp({actor:m,avatar:_,bones:g,houseGroup:n,getDisplay:l,getToyChest:c,root:i});new Hr().load(Jt.model+"?v="+Jt.version,L=>{A=L.scene,_.add(A),n.updateMatrixWorld(!0);let me=new Ot;A.traverse(de=>{de.isMesh&&(de.isSkinnedMesh?de.computeBoundingBox():de.geometry.computeBoundingBox(),me.union((de.isSkinnedMesh?de.boundingBox:de.geometry.boundingBox).clone().applyMatrix4(de.matrixWorld).applyMatrix4(_.matrixWorld.clone().invert())))});let se=me.getSize(new S);A.scale.setScalar(1.25/se.y),Ie=se.z*A.scale.x,A.position.set(0,-me.min.y*A.scale.x,-(me.min.z+me.max.z)*.5*A.scale.x),A.traverse(de=>{de.userData.companionId="spongebob",de.isMesh&&(de.castShadow=!0,de.receiveShadow=!0),de.morphTargetDictionary&&C.push(de),de.isSkinnedMesh&&(de.frustumCulled=!1),de.isBone&&(g.set(de.name,de),b.set(de.name,{q:de.quaternion.clone(),p:de.position.clone()}))}),A.updateMatrixWorld(!0),A.traverse(de=>{if(!de.isSkinnedMesh||de.name.includes("eyelid"))return;let fe=de.geometry.attributes.position,De=[];for(let Ne=0;Ne<fe.count;Ne++)fe.getY(Ne)<.16&&De.push(Ne);N.push({node:de,indices:De})});let ve=1/0;A.traverse(de=>{if(!de.isMesh)return;let fe=de.geometry.attributes.position;for(let De=0;De<fe.count;De++){let Ne=new S().fromBufferAttribute(fe,De).applyMatrix4(de.matrixWorld).applyMatrix4(_.matrixWorld.clone().invert());Ne.y>.5&&Ne.y<1.1&&(ve=Math.min(ve,Ne.z))}}),Xe=Number.isFinite(ve)?-ve:Ie/2,A.userData.animations=L.animations.map(de=>de.name),v=new Co(A),R=fp({actor:m,avatar:_,model:A,bones:g,houseGroup:n,getBed:()=>o?.("bed"),root:i,height:Jt.height}),T=xp({actor:m,avatar:_,model:A,bones:g,houseGroup:n}),z.clips=L.animations,ye=!0,q.querySelector("select").disabled=!1,i.dataset.companionState="ready",X=null,d()},void 0,()=>{i.dataset.companionState="error",ge.textContent="\u89D2\u8272\u672A\u80FD\u8F7D\u5165\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5",h({id:"companion",name:"\u6D77\u7EF5\u5B9D\u5B9D",url:Jt.model,kind:"companion"})});function Re(L){let me={head:["head","Head","mixamorigHead","comp_head"],hips:["Hips","pelvis","hips","comp_root"],leftArm:["LeftArm","upperarm_l","left_upper_arm","comp_arm_l"],rightArm:["RightArm","upperarm_r","right_upper_arm","comp_arm_r"],leftLeg:["LeftUpLeg","thigh_l","left_upper_leg","comp_leg_l"],rightLeg:["RightUpLeg","thigh_r","right_upper_leg","comp_leg_r"],jaw:["jaw","Jaw","comp_jaw"]};for(let se of me[L]??[]){if(g.has(se))return g.get(se);let ve=[...g].find(([de])=>de.toLowerCase().replace(/[^a-z_]/g,"").endsWith(se.toLowerCase()));if(ve)return ve[1]}return null}function ze(L,me=0,se=0,ve=0){let de=Re(L);de&&(de.rotateX(me),de.rotateY(se),de.rotateZ(ve))}function Ke(L){R?.reset(),Ae.reset(),a?.()?.endInteraction?.();let me=ae!==L.room||O;if(O=!1,ae=L.room,X=L.action,ie=0,m.userData.roomId=ae,m.userData.revision=L.revision,m.traverse(se=>{se.userData.roomId=ae,se.userData.companionId="spongebob"}),me&&(w=ae==="library",I=w?5.6:2,m.position.fromArray(Jt.rooms[ae].entry),re=0),ge.textContent=Jt.actions[X]?.label??X,i.dataset.companionRoom=ae,i.dataset.companionActivity=X,X==="sleep"){R?.begin();let se=o?.("bed"),ve=Jt.rooms.bedroom.bed,de=new Ns(new S(ve[0],9,ve[2]+.35),new S(0,-1,0));se?.updateMatrixWorld(!0),et=se?de.intersectObject(se,!0).find(fe=>fe.point.y<7.05&&fe.point.y>6.3&&fe.face.normal.clone().transformDirection(fe.object.matrixWorld).y>.8)?.point.y:null}Ae.begin(X),X==="pet"&&a?.()?.beginInteraction?.(m.position.toArray())}z.react=()=>ne(e),window.addEventListener("house:pet-greet",()=>{ye&&(s("living"),f.act("pet"),X=null)});function rt(L){if(!L||E?.getClip()===L)return;let me=v.clipAction(L),se=H.findIndex(ve=>ve.action===me);se>=0&&H.splice(se,1),E&&(E.fadeOut(.18),H.push({action:E,time:.18})),E=me,me.reset().fadeIn(.18).play()}return z.update=(L,me)=>{if(!ye)return;let se=!me||document.hidden,ve=se||!!document.querySelector("dialog[open]"),de=f.tick(L,ve,!se&&le.open),fe=se||ve&&!de.commanded;if(!se&&(!ve||le.open)&&(B+=L),(ae!==de.room||X!==de.action||m.userData.revision!==de.revision)&&Ke(de),m.visible=!r()||r()===ae,!m.visible){te.hidden=!0;return}fe||(re=Math.min(I,re+L),ie+=L);let De=w&&!u&&re<3.6;ge.textContent=De?"\u6ED1\u6ED1\u68AF":Jt.actions[X]?.label??X;let Ne=Jt.rooms[ae],V=u||re>=I?1:Math.max(0,Math.min(1,(re-(w?3.6:0))/2)),_e=V*V*(3-2*V),Ue=new S(...Ne.position);if(X==="pet"){let nt=o?.("siamese-cat");nt&&Ue.copy(nt.position).add(new S(.4,0,.38))}let st=gp(Ne,_e);m.position.fromArray(st.position),X==="pet"&&m.position.lerpVectors(new S(...Ne.entry),Ue,_e),_.rotation.set(0,0,0),_.position.set(0,0,0),_.scale.setScalar(p);let Je=Ae.place(ie),je=Je?.walking??(!De&&V<1),Et=De?"slide":je?"walk":Je?["read","lift","return"].includes(Je.phase)?"read":"idle":{rest:"sit",sleep:"lie",listen:"idle"}[X]??X,wt=z.clips?.find(nt=>nt.name===Et);rt(wt),je?_.rotation.y=Math.atan2(st.direction[0],st.direction[2]):_.rotation.y=(["read","journal"].includes(X)?-.22:.1)+(u?0:Math.sin(B*.55)*.035),Je&&(_.rotation.y=Je.yaw);for(let[nt,Vt]of b){let bt=g.get(nt);bt.quaternion.copy(Vt.q),bt.position.copy(Vt.p)}if(v?.update(fe?0:L),!fe)for(let nt=H.length-1;nt>=0;nt--)H[nt].time-=L,H[nt].time<=0&&(H[nt].action.stop(),H.splice(nt,1));wt||(je?(ze("leftLeg",Math.sin(ie*8)*.3),ze("rightLeg",-Math.sin(ie*8)*.3)):X==="wave"?ze("rightArm",0,0,-.55+Math.sin(ie*9)*.13):["journal","read","tidy","wash","bubble","pet"].includes(X)&&(ze("leftArm",-.5,0,.12),ze("rightArm",-.5,0,-.12),ze("head",.08))),X==="sleep"&&!je&&R?.update(u?6:Math.max(0,ie-I));let Qt=X==="sleep"&&!["cover","sleep"].includes(i.dataset.companionSleep)?"rest":X;D=mp(B,De?"bubble":Qt,!1,k,B-J<4?W:null),X==="pet"&&!je&&(D.lookDown=.7,D.lookLeft=.55);for(let nt of C)for(let[Vt,bt]of Object.entries(D)){let en=nt.morphTargetDictionary[Vt];en!==void 0&&(nt.morphTargetInfluences[en]=bt)}if(!je&&!De&&X!=="sleep"&&!u&&ze("hips",(["read","journal"].includes(X)?.055:0)+Math.sin(B*1.7)*.008,0,Math.sin(B*.85)*.01),le.open&&!de.commanded){let nt=t.position.clone().sub(m.position);_.rotation.y=Math.atan2(nt.x,nt.z)}if(x=null,X==="pet"&&!je&&_.rotation.set(.1,.1,0),De)T?.update(Math.min(1,re/3.2),Ye.clamp((re-3.2)/.4,0,1),Ne.entry);else if(X!=="sleep"||je){n.updateMatrixWorld(!0);let nt=1/0,Vt=new S;for(let{node:bt,indices:en}of N)for(let tn of en)Vt.fromBufferAttribute(bt.geometry.attributes.position,tn),bt.applyBoneTransform(tn,Vt),Vt.applyMatrix4(bt.matrixWorld),nt=Math.min(nt,Vt.y);Number.isFinite(nt)&&(_.position.y+=(Je?m.position.y:Ne.position[1])-nt+.008)}if(X==="pet"&&!je){let nt=a?.()?.touchPoint?.();if(nt){a?.()?.trackCompanion?.(m.position.clone().add(new S(0,.7,0)).toArray()),n.updateMatrixWorld(!0);let Vt=g.get("comp_arm_r"),bt=g.get("comp_forearm_r"),en=g.get("comp_hand_r");if(Vt&&bt&&en){let tn=Vt.getWorldPosition(new S),hi=bt.getWorldPosition(new S),qi=en.getWorldPosition(new S),Wn=tn.distanceTo(hi),Jn=hi.distanceTo(qi),Gs=nt.clone().add(new S(0,.018,.018*Math.sin(ie*3))),Fn=Gs.sub(tn),di=Math.min(Fn.length(),Wn+Jn-.001);Fn.normalize();let ms=new S(0,-1,0);ms.addScaledVector(Fn,-ms.dot(Fn)).normalize();let oe=Ye.clamp((Wn*Wn+di*di-Jn*Jn)/(2*Wn*di),-1,1),xt=tn.clone().addScaledVector(Fn,Wn*oe).addScaledVector(ms,Wn*Math.sqrt(1-oe*oe)),Dt=(M,G,$)=>{let K=M.getWorldPosition(new S),Q=M.getWorldQuaternion(new Pe),Ce=G.getWorldPosition(new S).sub(K).normalize(),He=new Pe().setFromUnitVectors(Ce,$.clone().sub(K).normalize());M.quaternion.copy(M.parent.getWorldQuaternion(new Pe).invert().multiply(He.multiply(Q))),M.updateWorldMatrix(!1,!0)};Dt(Vt,bt,xt),Dt(bt,en,tn.clone().addScaledVector(Fn,di)),x=en.getWorldPosition(new S).distanceTo(nt)}}}if(j+=L,j>.2&&(j=0,i.dataset.companionFace=JSON.stringify(D),i.dataset.companionPosition=JSON.stringify(m.position.toArray()),i.dataset.companionHeight=String(Jt.height),i.dataset.companionArrival=De?"slide":je?"walk":"activity"),Ae.update(ie,u),Ee.visible=!je&&X==="bubble",Ee.children.forEach((nt,Vt)=>{let bt=(ie*.25+Vt*.17)%1;nt.position.set(.23+Math.sin(Vt+bt*4)*.18,.9+bt*.8,.5+bt*.3),nt.scale.setScalar(.4+bt*.8)}),q.querySelector(".companion-day").textContent=`${Math.floor(de.day/120*24).toString().padStart(2,"0")}:00 \xB7 ${de.following?"\u966A\u4F60\u901B\u901B":"\u5FAA\u73AF\u7684\u4E00\u5929"} \xB7 \u9884\u89C8\u5F85\u5BA1`,xe>0){xe-=L;let nt=m.position.clone().add(new S(0,Jt.height+.13,0)).project(t);te.hidden=xe<=0||!m.visible||nt.z<-1||nt.z>1,te.style.left=Ye.clamp((nt.x*.5+.5)*i.clientWidth,95,i.clientWidth-95)+"px",te.style.top=Ye.clamp((-.5*nt.y+.5)*i.clientHeight,80,i.clientHeight-80)+"px"}},z}var wn={version:"20261013-cat-side-quarantine-v15",status:"review",toiletProjects:{asset:"toilet",room:"bathroom",anchor:[-1.3,4.1,-.4]},structure:{id:"structure",name:"\u4E09\u5C42\u623F\u5C4B\u7ED3\u6784",url:"assets/house-review/structure.glb"},rooms:[{id:"living",name:"\u5BA2\u5385",floor:"\u4E00\u5C42",level:0,label:[0,.5,2.75],bounds:[[-2.5,0,-2.5],[2.2,2.9,2.8]],target:[0,1.25,0],camera:[0,2.25,8.6]},{id:"storage",name:"\u50A8\u85CF\u5BA4",floor:"\u4E00\u5C42",level:0,label:[-3.45,1.5,1],bounds:[[-4.2,0,-2.5],[-2.55,2.9,1.6]],target:[-3.32,1.15,0],camera:[-4.6,2.2,5.7]},{id:"bathroom",name:"\u6D74\u5BA4",floor:"\u4E8C\u5C42",level:1,label:[-2,3.55,2.7],bounds:[[-4.6,3,-2.4],[.25,5.95,2.7]],target:[-1.75,4.25,0],camera:[-2.6,5.1,7.7]},{id:"bedroom",name:"\u5367\u5BA4",floor:"\u4E09\u5C42",level:2,label:[-1.2,6.55,2.2],bounds:[[-4.1,6,-2.1],[1.12,8.95,2.6]],target:[-1.2,7.2,0],camera:[-2.3,8.15,7.6]},{id:"library",name:"\u56FE\u4E66\u9986",floor:"\u4E8C\u3001\u4E09\u5C42 \xB7 \u6311\u9AD8",level:1,label:[3.3,4.8,1.2],bounds:[[.25,3,-2.8],[4.65,8.8,2.7]],target:[2.7,5.7,0],camera:[4.7,7.1,12.5]},{id:"roof",name:"\u5C4B\u9876\u82B1\u56ED",floor:"\u5929\u53F0",level:3,label:[0,9.45,1.2],bounds:[[-2.5,9,-2],[2.5,10.8,2]],target:[0,9.6,0],camera:[0,12.4,7.9]}],assets:[{id:"chair",name:"\u7EA2\u6276\u624B\u6905",room:"living",url:"assets/house-review/props/chair.glb",position:[-1.3,0,-.3],rotation:.13},{id:"couch",name:"\u7EFF\u7BA1\u6C99\u53D1",room:"living",url:"assets/house-review/props/couch.glb",position:[1.1,0,-.35],rotation:-.18},{id:"table",name:"\u5706\u684C",room:"living",url:"assets/house-review/props/table-speaker-base.glb",position:[0,0,.05],rotation:0},{id:"bluetooth-speaker",name:"\u84DD\u7259\u97F3\u7BB1",room:"living",url:"assets/house-review/props/speaker.glb",position:[0,.76,.05],rotation:-.08},{id:"laptop",name:"\u6C99\u53D1\u4E0A\u7684\u7B14\u8BB0\u672C\u7535\u8111",room:"living",url:"assets/house-review/props/laptop.glb",position:[1.08,.49,-.1],rotation:-.18},{id:"siamese-cat",name:"\u66B9\u7F57\u732B",room:"living",url:"assets/house-review/props/siamese-kitten-compact.glb",position:[-1.55,0,1.6],rotation:.22,pet:{route:[[-1.4,1.95],[-.65,2.08],[.25,2.05],[.85,1.88],[.7,1.48],[0,1.43],[-.95,1.44]],fur:!0,restPoses:!0,groundedSideLie:!1,lieEnabled:!1,sitCorrectives:!1,sitEnabled:!1,poseSitV2:!1,runtimeSha256:"d32d168d6d59511661863545365ee95f8e704d7ccd664b3a5a8028d351dac5b6",faceForward:[.7452153247454482,0,.6668239046139065],faceCenter:[.124894668,.46660155,.339340067],bodyScale:.8,limbRatio:.78,walkSpeed:.055,stepHeight:.011,gaitCycle:.62}},{id:"treasure",name:"\u50A8\u85CF\u5BA4\u5B9D\u85CF",room:"storage",url:"assets/house-review/props/treasure.glb",position:[-3.3,0,-.1],rotation:0},{id:"bathtub",name:"\u6D74\u7F38",room:"bathroom",url:"assets/house-review/props/bathtub.glb",position:[-2.7,3,.7],rotation:.1},{id:"sink",name:"\u6876\u5F0F\u6D17\u624B\u6C60",room:"bathroom",url:"assets/house-review/props/sink.glb",position:[-1.65,3.62,-2.6],rotation:0},{id:"toilet",name:"\u9A6C\u6876",room:"bathroom",url:"assets/house-review/props/toilet.glb",position:[-1.3,3,-.6],rotation:0},{id:"bed",name:"\u7AF9\u8282\u5E8A",room:"bedroom",url:"assets/house-review/props/bed.glb",position:[-1.65,6,-.25],rotation:0},{id:"barrel",name:"\u5367\u5BA4\u6876\u67DC",room:"bedroom",url:"assets/house-review/props/barrel.glb",position:[-3,6,-.55],rotation:0},{id:"chest",name:"\u5367\u5BA4\u6536\u7EB3\u7BB1",room:"bedroom",url:"assets/house-review/props/chest.glb",position:[.05,6,.65],rotation:-.15},{id:"lounger",name:"\u5929\u53F0\u8EBA\u6905",room:"roof",url:"assets/house-review/props/lounger.glb",position:[-.95,9,.9],rotation:.15}],displays:[{id:"national-2021",kind:"award",room:"storage",level:0,position:[-3.81021,1.43,-1.31209],normal:[.82983,0,.55801],size:[.43,.31041]},{id:"national-2023",kind:"award",room:"storage",level:0,position:[-3.33921,1.43,-1.84648],normal:[.67977,0,.73342],size:[.43,.30167]},{id:"math-2022",kind:"award",room:"storage",level:0,position:[-2.86678,1.43,-2.21072],normal:[.55374,0,.83269],size:[.43,.31175]},{id:"holtek-2023",kind:"award",room:"storage",level:0,position:[-3.81143,2.02,-1.41627],normal:[.80946,0,.58717],size:[.43,.30436]},{id:"mathorcup-2022",kind:"award",room:"storage",level:0,position:[-3.3401,2.02,-1.923],normal:[.66501,0,.74684],size:[.43,.29025]},{id:"scholarship-2022",kind:"award",room:"storage",level:0,position:[-2.86743,2.02,-2.27552],normal:[.54283,0,.83984],size:[.33825,.48]},{id:"graduate-2024",kind:"award",room:"storage",level:0,position:[-3.81205,2.61,-1.46938],normal:[.7991,0,.6012],size:[.35475,.48]},{id:"merit-2021",kind:"award",room:"storage",level:0,position:[-3.34055,2.61,-1.96296],normal:[.65745,0,.7535],size:[.3525,.48]},{id:"merit-2022",kind:"award",room:"storage",level:0,position:[-2.86777,2.61,-2.30964],normal:[.53723,0,.84344],size:[.3495,.48]},{id:"league-2021",kind:"award",room:"storage",level:0,position:[-2.66,1.91,-1.3],normal:[-1,0,0],size:[.5,.35078]},{id:"union-2021",kind:"award",room:"storage",level:0,position:[-2.66,2.52,-1.3],normal:[-1,0,0],size:[.5,.33203]},{id:"skills-book",kind:"content",room:"library",level:1,position:[1.45,3.6,1.42],normal:[.15,0,.99],size:[.8,1.1]},{id:"work-journal",kind:"content",room:"bedroom",level:2,position:[-2.07,6.842,.2],normal:[0,1,0],size:[.48,.6],style:"book"}],interactions:[{id:"living-speaker",room:"living",action:"music",label:"\u84DD\u7259\u97F3\u7BB1 \xB7 \u7F51\u9875\u80CC\u666F\u97F3\u4E50",button:"\u542C\u97F3\u4E50",asset:"bluetooth-speaker",anchor:[0,1.3,.05]},{id:"laptop-profile",room:"living",section:"overview",label:"\u7B14\u8BB0\u672C\u7535\u8111 \xB7 \u57FA\u672C\u4FE1\u606F",button:"\u57FA\u672C\u4FE1\u606F",asset:"laptop",anchor:[1.08,1.3,-.1]},{id:"skills-book",room:"library",section:"skills",label:"\u4E13\u4E1A\u6280\u80FD\u4E66 \xB7 \u5168\u6808\u4E0E Agent \u5DE5\u7A0B",button:"\u4E13\u4E1A\u6280\u80FD",anchor:[1.45,4.37,1.47]},{id:"work-journal",room:"bedroom",section:"internship",label:"\u5E8A\u4E0A\u65E5\u8BB0\u672C \xB7 \u5B9E\u4E60\u7ECF\u5386",button:"\u5B9E\u4E60\u65E5\u8BB0",anchor:[-2.07,7.14,.2]},{id:"education-clock",room:"bedroom",section:"education",label:"\u6559\u80B2\u7ECF\u5386",button:"\u6559\u80B2\u7ECF\u5386",asset:"barrel",localBounds:[[-.14,.615,-.12],[.14,.91,.13]],anchor:[-3,7.1,-.45]},{id:"toy-chest",room:"bedroom",action:"toy",label:"\u73A9\u5177\u7BB1 \xB7 \u6253\u5F00\u79C1\u85CF\u753B\u5ECA",button:"\u73A9\u5177\u7BB1",asset:"chest",anchor:[.05,7.1,.65]},{id:"honor-trophies",room:"storage",section:"honors",label:"\u5956\u676F\u4E0E\u8BC1\u4E66 \xB7 \u4E2A\u4EBA\u8363\u8A89",button:"\u8363\u8A89\u5956\u676F",asset:"treasure",anchor:[-3.3,1.05,-.1]}]};var Wo=[{id:"national-2021",title:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D1",detail:"2020\u20142021 \u5B66\u5E74",sourceName:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D12021.jpg",sourceSHA256:"a53837456384b6d78a20a7e25bbf9c5ab42c4d29eff23be8e60001d36a9cd930",thumbnail:"./assets/house-profile/national-2021.jpg",original:"./assets/house-profile/national-2021-original.jpg",width:640,height:462,rotation:90,crop:[.045,.235,.97,.955]},{id:"national-2023",title:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D1",detail:"2022\u20142023 \u5B66\u5E74",sourceName:"\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D12023.jpg",sourceSHA256:"597f4b90d5cf32ea33160c3d95331d83d57cdd579ffbc3098383625bf32655bc",thumbnail:"./assets/house-profile/national-2023.jpg",original:"./assets/house-profile/national-2023-original.jpg",width:640,height:449,rotation:90,crop:[.01,.19,.99,.975]},{id:"math-2022",title:"\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B \xB7 \u4E00\u7B49\u5956",detail:"\u7B2C\u5341\u56DB\u5C4A \xB7 \u975E\u6570\u5B66\u7C7B",sourceName:"\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B.jpg",sourceSHA256:"411b2f002172a09df06e6500447ad551604086aa51fdb72d1db623e3ffacbb79",thumbnail:"./assets/house-profile/math-2022.jpg",original:"./assets/house-profile/math-2022-original.jpg",width:640,height:464,rotation:90,crop:[.01,.14,.99,.9]},{id:"holtek-2023",title:"\u5408\u6CF0\u676F \xB7 \u4E00\u7B49\u5956",detail:"2023 \u5E74\u5355\u7247\u673A\u5E94\u7528\u8BBE\u8BA1\u7ADE\u8D5B",sourceName:"\u5408\u6CF0\u676F2023.jpg",sourceSHA256:"4e755594fcec2eb7c740d82b38c9e6e05a9e03c2cd44ec3ee629de983187ccc7",thumbnail:"./assets/house-profile/holtek-2023.jpg",original:"./assets/house-profile/holtek-2023-original.jpg",width:640,height:453,rotation:90,crop:[.03,.13,.985,.89]},{id:"mathorcup-2022",title:"MathorCup \xB7 \u4E09\u7B49\u5956",detail:"2022 \u5E74 \xB7 \u672C\u79D1\u751F\u7EC4",sourceName:"mathorcup\u9AD8\u6821\u6570\u6A21\u6311\u6218\u8D5B.jpg",sourceSHA256:"f635ea9f270f143fba58d2744922f20927c7cb9b3b05bb1ab0178d13e939443b",thumbnail:"./assets/house-profile/mathorcup-2022.jpg",original:"./assets/house-profile/mathorcup-2022-original.jpg",width:640,height:432,rotation:90,crop:[.035,.16,.97,.94]},{id:"scholarship-2022",title:"\u4E00\u7B49\u5956\u5B66\u91D1",detail:"2021\u20142022 \u5B66\u5E74",sourceName:"\u4E00\u7B49\u5956\u5B66\u91D12022.jpg",sourceSHA256:"157bd5ae21962e0aa6d4af3977bb261c8899834e0f241acb74deeb0cbf2a517d",thumbnail:"./assets/house-profile/scholarship-2022.jpg",original:"./assets/house-profile/scholarship-2022-original.jpg",width:451,height:640,rotation:0,crop:[.015,.11,.98,.88]},{id:"graduate-2024",title:"\u4F18\u79C0\u6BD5\u4E1A\u751F",detail:"\u897F\u5357\u5927\u5B66 \xB7 2024 \u5E74",sourceName:"\u4F18\u79C0\u6BD5\u4E1A\u751F2024.jpg",sourceSHA256:"2831a13120b0875a395c39bb5c30dbabe3468e58c2aae0a7ae9980274f6d5262",thumbnail:"./assets/house-profile/graduate-2024.jpg",original:"./assets/house-profile/graduate-2024-original.jpg",width:473,height:640,rotation:0,crop:[.015,.14,.98,.875]},{id:"merit-2021",title:"\u4E09\u597D\u5B66\u751F",detail:"2020\u20142021 \u5B66\u5E74",sourceName:"\u6821\u4E09\u597D2021.jpg",sourceSHA256:"ee6d5d7e07ea7be0ed49d146339d6b82d8750f4acf5b0263d2f66c232edb0ade",thumbnail:"./assets/house-profile/merit-2021.jpg",original:"./assets/house-profile/merit-2021-original.jpg",width:470,height:640,rotation:90,crop:[.055,.035,.79,.995]},{id:"merit-2022",title:"\u4E09\u597D\u5B66\u751F",detail:"2021\u20142022 \u5B66\u5E74",sourceName:"\u6821\u4E09\u597D2022.jpg",sourceSHA256:"23f1564ec3411c58db1c1fb5456cd4b9475ac54731889da98cbe4dc45efeaaa6",thumbnail:"./assets/house-profile/merit-2022.jpg",original:"./assets/house-profile/merit-2022-original.jpg",width:466,height:640,rotation:0,crop:[.015,.2,.985,.95]},{id:"league-2021",title:"\u4F18\u79C0\u5171\u9752\u56E2\u5458",detail:"2020 \u5E74\u5EA6 \xB7 \u897F\u5357\u5927\u5B66",sourceName:"\u4F18\u79C0\u5171\u9752\u56E2\u54582021.jpg",sourceSHA256:"d178912952354cdf571f22d99377ca0082f7486ebb557fd9bbcde05dea4e5fb5",thumbnail:"./assets/house-profile/league-2021.jpg",original:"./assets/house-profile/league-2021-original.jpg",width:640,height:449,rotation:90,crop:[0,.145,.98,.93]},{id:"union-2021",title:"\u5B66\u751F\u4F1A\u5DE5\u4F5C\u7ECF\u5386 \xB7 \u8058\u4E66",detail:"\u9662\u5B66\u751F\u4F1A\u5BA3\u4F20\u90E8\u90E8\u957F \xB7 2020.09\u20142021.06",sourceName:"\u5B66\u751F\u4F1A2021.jpg",sourceSHA256:"78c95dc9ffa5835cf130127ecb4f2356718036266658d71f15bb358d1f14d796",thumbnail:"./assets/house-profile/union-2021.jpg",original:"./assets/house-profile/union-2021-original.jpg",width:640,height:425,rotation:90,crop:[.005,.11,.985,.94]}];function Mp({title:i="\u5B9E\u4E60\u65E5\u8BB0"}={}){let e=new pt;e.name="companion-open-book";let t=h=>{let f=document.createElement("canvas");f.width=512,f.height=640;let m=f.getContext?.("2d");if(!m)return null;if(m.fillStyle=h?"#fff5dc":"#285861",m.fillRect(0,0,512,640),h){m.fillStyle="#6c5844",m.textAlign="center",m.font="bold 35px serif",m.fillText(i,256,85),m.strokeStyle="#bcad8e",m.lineWidth=3;for(let p=150;p<550;p+=36)m.beginPath(),m.moveTo(60,p),m.lineTo(450-p%3*12,p),m.stroke();m.fillStyle="#ad976f",m.font="23px serif",m.fillText("\u2726",256,598)}else m.strokeStyle="#d5b86b",m.lineWidth=12,m.strokeRect(28,28,456,584),m.fillStyle="#f5d994",m.font="bold 46px serif",m.textAlign="center",m.fillText(i,256,260),m.font="80px serif",m.fillText("\u2693",256,390);let _=new mn(f);return _.colorSpace=St,_},n=new mt({color:3434866,map:t(!1),roughness:.92}),s=new mt({color:16379340,roughness:1}),r=new mt({color:16777215,map:t(!0),roughness:1,side:kt}),o=[];for(let h of[-1,1]){let f=new pt;f.rotation.y=-h*.32,e.add(f),o.push(f);let m=new $e(new Mn(.307,.335,.016),n);m.position.set(h*.155,0,-.011),f.add(m);let _=new $e(new Mn(.285,.312,.025),s);_.position.set(h*.154,0,.01),f.add(_);let p=new $e(new un(.281,.307),r);p.position.set(h*.154,0,.024),f.add(p);for(let g=0;g<5;g++){let b=new $e(new Mn(.285,.0014,.001),new mt({color:13285781,roughness:1}));b.position.set(h*.154,-.154,.002+g*.004),f.add(b)}}let a=new $e(new Fi(.018,.018,.333,12),n);e.add(a);let l=new pt;l.position.z=.035,e.add(l);let c=new un(.281,.307,14,1),u=c.attributes.position;for(let h=0;h<u.count;h++){let f=u.getX(h)+.1405;u.setXYZ(h,f,u.getY(h),.018*Math.sin(f/.281*Math.PI))}c.computeVertexNormals(),l.add(new $e(c,r)),e.traverse(h=>{h.isMesh&&(h.castShadow=!0,h.receiveShadow=!0)});let d=0;return{group:e,grip:h=>new S(h*.3,-.11,.03),update(h,f,m=1){d=Ye.clamp(m,0,1),o[0].rotation.y=Ye.lerp(-Math.PI,.32,d),o[0].position.z=.04*(1-d),o[1].rotation.y=-.32*d;let _=h%4.8;l.visible=d>.98&&!f&&_>2.4&&_<4.2;let p=Ye.clamp((_-2.4)/1.8,0,1),g=p*p*(3-2*p);l.rotation.y=-Math.PI*g,l.scale.x=1-.72*Math.sin(Math.PI*g)},snapshot:()=>({open:d>.98,opening:d,visible:e.visible,turning:l.visible,coverThickness:.016,pageThickness:.025,spread:.64})}}var Wi=[["pearl","\u6234\u73CD\u73E0\u8033\u73AF\u7684\u7AE0\u9C7C\u54E5"],["mona-lisa","\u7AE0\u9C7C\u54E5\u7684\u5FAE\u7B11"],["starry-portrait","\u661F\u591C\u81EA\u753B\u50CF"],["scream","\u7AE0\u9C7C\u54E5\u7684\u5450\u558A"],["cubist","\u51E0\u4F55\u8096\u50CF"]],wh=i=>`assets/house-art/${i}.png`;function Wv(i){let e=document.createElement("dialog");e.className="chest-gallery",e.setAttribute("aria-labelledby","chest-gallery-title"),e.innerHTML=`<header><div><span>\u5367\u5BA4 \xB7 \u79C1\u85CF\u753B\u4F5C</span><h2 id="chest-gallery-title">\u73A9\u5177\u7BB1\u91CC\u7684\u5C0F\u753B\u5ECA</h2></div><button class="chest-gallery-close" type="button" aria-label="\u5173\u95ED\u753B\u5ECA">\xD7</button></header><figure><div class="chest-art-frame"><img alt="" width="1080" height="1350"></div><figcaption></figcaption></figure><nav aria-label="\u5207\u6362\u753B\u4F5C"><button type="button" data-art-prev aria-label="\u4E0A\u4E00\u5E45\u753B">\u2190</button><div class="chest-art-thumbs">${Wi.map(([o,a],l)=>`<button type="button" data-art-index="${l}" aria-label="\u67E5\u770B${a}" aria-pressed="false"><img src="${wh(o)}" alt="" width="40" height="50" loading="lazy"></button>`).join("")}</div><button type="button" data-art-next aria-label="\u4E0B\u4E00\u5E45\u753B">\u2192</button></nav>`,document.body.append(e);let t=0,n,s=e.querySelector("figure img");function r(o){t=(o+Wi.length)%Wi.length;let[a,l]=Wi[t];s.src=wh(a),s.alt=l,e.dataset.artIndex=String(t),e.querySelector("figcaption").textContent=`${l} \xB7 ${t+1} / ${Wi.length}`,e.querySelectorAll("[data-art-index]").forEach(c=>c.setAttribute("aria-pressed",String(Number(c.dataset.artIndex)===t)))}return e.querySelector(".chest-gallery-close").addEventListener("click",()=>e.close()),e.querySelector("[data-art-prev]").addEventListener("click",()=>r(t-1)),e.querySelector("[data-art-next]").addEventListener("click",()=>r(t+1)),e.querySelectorAll("[data-art-index]").forEach(o=>o.addEventListener("click",()=>r(Number(o.dataset.artIndex)))),e.addEventListener("keydown",o=>{(o.key==="ArrowLeft"||o.key==="ArrowRight")&&(o.preventDefault(),r(t+(o.key==="ArrowRight"?1:-1)))}),e.addEventListener("click",o=>{let a=e.getBoundingClientRect();o.target===e&&(o.clientX<a.left||o.clientX>a.right||o.clientY<a.top||o.clientY>a.bottom)&&e.close()}),e.addEventListener("close",()=>{i(),n?.focus({preventScroll:!0})}),{open(){n=document.activeElement,r(0),e.showModal()},close(){e.close()}}}function bp(i,{root:e,version:t,reducedMotion:n}){let s=new pt;s.position.set(0,.325,-.245),i.add(s);let r=[];i.traverse(_=>{_.isMesh&&_.name.endsWith("__lid")&&r.push(_)});for(let _ of r)s.attach(_);let o=new pt;o.visible=!1,i.add(o);let a=new mt({color:12420914,metalness:.72,roughness:.32}),l=new mt({color:16045450,metalness:.6,roughness:.26}),c=!1,u=0,d=0,h=!1,f=!1;e.dataset.toyChest="closed",e.dataset.toyChestReady="loading";let m=Wv(()=>{c=!1,e.dataset.toyChest="closed"});return Wi.forEach(([_],p)=>{let g=new pt,b=.25,A=.3125,v=(T,x,C,N,H,B)=>{let k=new $e(new Mn(T,x,H),B);k.position.set(C,N,.008),g.add(k)};for(let[T,x,C]of[[.025,.027,a],[.006,.033,l]])v(b+T*2,T,0,A/2+T/2,x,C),v(b+T*2,T,0,-A/2-T/2,x,C),v(T,A,-b/2-T/2,0,x,C),v(T,A,b/2+T/2,0,x,C);let E=new Vi().load(`${wh(_)}?v=${t}`,()=>{d++,e.dataset.toyChestReady=h?"false":d===Wi.length?"true":"loading"},void 0,()=>{h=!0,e.dataset.toyChestReady="false"});E.colorSpace=St;let R=new $e(new un(b,A),new mt({map:E,roughness:.85,side:kt}));R.position.z=.026,g.add(R),g.position.set((p-2)*.082,.2+Math.abs(p-2)*.007,(2-p)*.028),g.rotation.set(-.12,0,(p-2)*-.12),o.add(g),g.traverse(T=>{T.isMesh&&(T.castShadow=!0,T.receiveShadow=!0),T.userData.roomId="bedroom",T.userData.contentId="toy-chest"})}),{toggle(){if(c){m.close();return}c=!0,e.dataset.toyChest="open",m.open()},setCompanionPlaying(_){f=!!_,e.dataset.toyChestCompanion=String(f)},touchPoint(){return i.updateWorldMatrix(!0,!1),i.localToWorld(new S(0,.32,.12))},update(_){let p=c||f?1:0;u=n?p:Ye.damp(u,p,6,_),Math.abs(u-p)<.001&&(u=p),s.rotation.x=-1.4*u,o.visible=u>.05,o.position.y=.06+.22*u,o.scale.setScalar(.55+.45*u)},snapshot:()=>({open:c,companionPlaying:f,amount:u,ready:d===Wi.length,lidParts:r.length,paintings:Wi.length,loaded:d})}}var fs=[{id:"date",title:"\u7EA6\u4F1A \xB7 \u30C7\u30FC\u30C8",credit:"RADWIMPS \u4F5C\u66F2 \xB7 \u620F\u8BF4\u94A2\u7434\u6F14\u594F",recording:"\u300A\u4F60\u7684\u540D\u5B57\u300B\u94A2\u7434\u7248",url:"https://music.163.com/song/media/outer/url?id=1951778950.mp3",page:"https://music.163.com/#/song?id=1951778950"},{id:"lawrence",title:"\u5723\u8BDE\u5FEB\u4E50\uFF0C\u52B3\u4F26\u65AF\u5148\u751F",credit:"\u5742\u672C\u9F99\u4E00 \xB7 \u94A2\u7434\u73B0\u573A\u7248",recording:"Playing the Piano 2009 Japan",url:"https://music.163.com/song/media/outer/url?id=22650506.mp3",page:"https://music.163.com/#/song?id=22650506"},{id:"summer",title:"\u83CA\u6B21\u90CE\u7684\u590F\u5929 \xB7 Summer",credit:"\u4E45\u77F3\u8BA9 \xB7 \u73B0\u573A\u6F14\u594F\u7248",recording:"Best Live 2003",url:"https://music.163.com/song/media/outer/url?id=29405958.mp3",page:"https://music.163.com/#/song?id=29405958"}];var dn=document.createElement("section");dn.className="house-music";dn.hidden=!0;dn.setAttribute("aria-label","\u4E2A\u4EBA\u7F51\u9875\u80CC\u666F\u97F3\u4E50");dn.innerHTML=`<header><h2>\u266B \u6211\u7684\u97F3\u4E50</h2><button type="button" data-music-close aria-label="\u5173\u95ED\u97F3\u4E50\u5E76\u6682\u505C\u64AD\u653E"></button></header>
  <div class="music-tracks" aria-label="\u9009\u62E9\u97F3\u4E50"></div>
  <p class="music-status" role="status" aria-live="polite"></p>
  <div class="music-controls"><button type="button" data-music-play>\u64AD\u653E</button><button type="button" data-music-next>\u4E0B\u4E00\u9996 \u2192</button></div>
  <label class="music-position"><span data-music-time>0:00 / 0:00</span><input type="range" data-music-seek min="0" max="100" value="0" step="0.1" aria-label="\u64AD\u653E\u8FDB\u5EA6" disabled></label>
  <label class="music-volume">\u97F3\u91CF <input type="range" min="0" max="1" step="0.05" value="0.4" aria-label="\u97F3\u4E50\u97F3\u91CF"></label>
  <button type="button" data-music-retry hidden>\u91CD\u8BD5</button>`;document.body.append(dn);var Bt=new Audio;Bt.preload="none";Bt.volume=.4;Bt.dataset.houseAudio="";document.body.append(Bt);var sc=dn.querySelector(".music-status"),rc=dn.querySelector("[data-music-play]"),oc=dn.querySelector("[data-music-seek]"),ac=dn.querySelector("[data-music-retry]"),Xi=0,Ah=null,kr=0,qv=fs.map((i,e)=>{let t=document.createElement("button");return t.type="button",t.innerHTML=`<strong>${i.title}</strong><small>${i.credit}</small>`,t.dataset.musicTrack=i.id,t.addEventListener("click",()=>Xo(e,!0)),dn.querySelector(".music-tracks").append(t),t}),Sp=i=>Number.isFinite(i)?`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`:"0:00";function lc(){rc.textContent=Bt.paused?"\u64AD\u653E":"\u6682\u505C",rc.setAttribute("aria-label",`${Bt.paused?"\u64AD\u653E":"\u6682\u505C"}${fs[Xi].title}`);let i=Number.isFinite(Bt.duration)&&Bt.duration>0;oc.disabled=!i,oc.value=i?Bt.currentTime/Bt.duration*100:0,dn.querySelector("[data-music-time]").textContent=`${Sp(Bt.currentTime)} / ${Sp(Bt.duration)}`,dn.dataset.musicState=Bt.error?"error":Bt.paused?"paused":"playing"}function Ep(){sc.textContent="\u8FD9\u9996\u66F2\u5B50\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\uFF0C\u8BF7\u91CD\u8BD5\u3002",ac.hidden=!1,lc()}async function Rh(){let i=++kr;ac.hidden=!0,sc.textContent="\u6B63\u5728\u8F7D\u5165\u97F3\u4E50\u2026";try{await Bt.play(),i===kr&&(sc.textContent=fs[Xi].recording,lc())}catch(e){if(i!==kr||e.name==="AbortError")return;Ep()}}function Xo(i,e=!1){++kr,Bt.pause(),Xi=(i+fs.length)%fs.length,Bt.src=fs[Xi].url,qv.forEach((t,n)=>t.setAttribute("aria-pressed",String(n===Xi))),sc.textContent=fs[Xi].recording,ac.hidden=!0,lc(),e&&Rh()}function Tp(){++kr,Bt.pause(),dn.hidden=!0,Ah?.getClientRects().length?Ah.focus({preventScroll:!0}):document.querySelector("[data-house-back]")?.focus({preventScroll:!0})}window.addEventListener("house:music",()=>{Ah=document.activeElement,dn.hidden=!1,rc.focus({preventScroll:!0})});dn.querySelector("[data-music-close]").addEventListener("click",Tp);rc.addEventListener("click",()=>{Bt.paused?Rh():(++kr,Bt.pause())});dn.querySelector("[data-music-next]").addEventListener("click",()=>Xo(Xi+1,!0));ac.addEventListener("click",()=>{Xo(Xi),Rh()});oc.addEventListener("input",()=>{Number.isFinite(Bt.duration)&&(Bt.currentTime=Number(oc.value)/100*Bt.duration)});dn.querySelector(".music-volume input").addEventListener("input",i=>Bt.volume=Number(i.target.value));Bt.addEventListener("error",Ep);Bt.addEventListener("ended",()=>Xo(Xi+1,!0));for(let i of["timeupdate","durationchange","play","pause"])Bt.addEventListener(i,lc);window.addEventListener("keydown",i=>{i.key==="Escape"&&!dn.hidden&&!document.querySelector("dialog[open]")&&(i.preventDefault(),i.stopImmediatePropagation(),Tp())},!0);Xo(0);var Ch=[{from:"living",to:"storage",kind:"door",anchor:[-2.45,.95,.25]},{from:"storage",to:"living",kind:"door",anchor:[-2.65,.95,.25]},{from:"living",to:"bathroom",kind:"up",anchor:[2.8,1.2,-1.35],meshes:["stairs_"],bounds:[[-1.1,0,-3.6],[0,1.9,-1.4]]},{from:"bathroom",to:"living",kind:"down",anchor:[-.4,3.95,-1.4],bounds:[[-.9,3,-3.7],[.1,4.9,-1.5]]},{from:"bathroom",to:"library",kind:"door",anchor:[.15,3.95,.5]},{from:"library",to:"bathroom",kind:"door",anchor:[.45,3.95,.5]},{from:"library",to:"bedroom",kind:"up",anchor:[1.3,6.85,-.6]},{from:"bedroom",to:"library",kind:"door",anchor:[1,6.9,-.6]},{from:"bedroom",to:"roof",kind:"up",anchor:[.3,7.4,-1.4],meshes:["stairs_"],bounds:[[-.3,6,-2.8],[.85,7.9,-1.1]]},{from:"roof",to:"bedroom",kind:"down",anchor:[1.8,9.35,-.6],meshes:["roof_landing","roof_access_","stairs_"]}];function wp({root:i,camera:e,rooms:t,getRoom:n,focusRoom:s}){let r=document.createElement("nav");r.className="house-connections",r.setAttribute("aria-label","\u901A\u5F80\u76F8\u90BB\u623F\u95F4"),r.hidden=!0,i.append(r);let o=l=>`\u2192 ${t.get(l.to).name}`,a=Ch.map(l=>{let c=document.createElement("button");return c.type="button",c.className="room-label passage-label",c.textContent=o(l),c.dataset.housePassage=`${l.from}-${l.to}`,c.setAttribute("aria-label",`\u524D\u5F80${t.get(l.to).name}`),c.addEventListener("click",()=>{n()===l.from&&i.dataset.houseState==="ready"&&s(l.to)&&i.querySelector("[data-house-back]").focus({preventScroll:!0})}),r.append(c),{link:l,button:c}});return{update(){let l=n(),c=i.dataset.houseState==="ready";r.hidden=!l||!c;let u=[...i.querySelectorAll("[data-house-object]:not([hidden])")].map(d=>{let h=d.getBoundingClientRect();return{x:h.x+h.width/2,y:h.y+h.height/2,half:h.width/2+12}});for(let{link:d,button:h}of a){if(h.hidden=!c||d.from!==l,h.disabled=i.dataset.cameraTransition==="moving",h.hidden)continue;let f=new S(...d.anchor).project(e),m=i.clientWidth,_=i.clientHeight,p=h.offsetWidth/2+12,g=Ye.clamp((f.x*.5+.5)*m,p,m-p),b=Ye.clamp((-f.y*.5+.5)*_,210,_-70);f.z>1&&(g=m-p,b=_-90);for(let A of u)Math.abs(g-A.x)<p+A.half&&Math.abs(b-A.y)<46&&(b=A.y+48);b>_-70&&(b=_-70-u.length*48),u.push({x:g,y:b,half:p}),h.style.left=`${g}px`,h.style.top=`${b}px`}},pick:(l,c)=>Ch.find(u=>u.from===n()&&(u.meshes?.some(d=>l.name.startsWith(d))||u.bounds&&l.userData.roomId===u.from&&c.toArray().every((d,h)=>d>=u.bounds[0][h]&&d<=u.bounds[1][h]))),label:o}}var ps={version:"20261015-entrances-1",order:["patrick","squidward","pineapple"],houses:[{id:"patrick",name:"\u6D3E\u5927\u661F\u7684\u5BB6",height:3.8,x:-9.5,z:0,entry:"patrick-house.html?neighborhood=1",component:"patrick-exterior",source:"scripts/patrick-house.js:\u95ED\u5408\u5916\u58F3\u4E0E\u98CE\u5411\u6807"},{id:"squidward",name:"\u7AE0\u9C7C\u54E5\u7684\u5BB6",url:"assets/models/neighborhood/squidward-house.glb",height:8.6,x:0,z:0,shellOnly:!0,entry:"docs/squidward-home/index.html?autotest=cutaway"},{id:"pineapple",name:"\u6D77\u7EF5\u5B9D\u5B9D\u7684\u5BB6",url:"assets/models/pineapple-shell.glb",height:10.5,x:10,z:0}]};var Ph=20261013,An=()=>(Ph=Math.imul(Ph,1664525)+1013904223>>>0,Ph/4294967296),Kv=(i,e)=>{let t=document.createElement("canvas");return t.width=i,t.height=e,[t,t.getContext("2d")]},jv=i=>(i.colorSpace=St,i),$v=(i,e=.85,t={})=>new mt({color:i,roughness:e,...t}),Ap=(i,e=.85,t={})=>new mt({map:i,roughness:e,...t});function Rp(i=512,e="#7c4b66"){let[t,n]=Kv(i,i);n.fillStyle=e,n.fillRect(0,0,i,i);let s=["#8a5570","#6e4059","#94607a","#5f3748","#845072","#754963"],r="#a0718d",o="#523047";e!=="#7c4b66"&&(s.length=0,s.push("#909997","#777f7d","#a8adaa","#626d6c","#8e9691","#818b87"));let a=e!=="#7c4b66"?"#bdc5bd":r,l=e!=="#7c4b66"?"#485856":o;for(let c=0;c<70;c++){n.fillStyle=s[An()*s.length|0],n.globalAlpha=.12+An()*.2;let u=i*(.04+An()*.16);n.beginPath(),n.arc(An()*i,An()*i,u,0,Math.PI*2),n.fill()}n.globalAlpha=1;for(let c=0;c<2600;c++)n.fillStyle=An()>.5?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.08)",n.fillRect(An()*i,An()*i,1.5,1.5);n.globalAlpha=.14;for(let c=0;c<26;c++){let u=An()*i,d=i*(.2+An()*.5);n.strokeStyle=An()>.5?a:l,n.lineWidth=2+An()*5,n.beginPath(),n.moveTo(u,An()*i*.3),n.lineTo(u+(An()-.5)*20,An()*i*.3+d),n.stroke()}return n.globalAlpha=1,jv(new mn(t))}function Jv(){return $v(14266943,.3,{metalness:.55,roughness:.32})}var Qv=i=>(i.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),i);function Cp(){let i=new pt,e=Jv(),t=new $e(new Fi(.035,.05,1,10),e);t.position.y=.5,i.add(t);let n=new pt;n.position.y=1;let s=new $e(new Fi(.026,.026,1.1,8),e);s.rotation.z=Math.PI/2,n.add(s);let r=new oi;r.moveTo(-.4,.035),r.lineTo(.4,.035),r.bezierCurveTo(.43,.08,.43,.145,.5,.145),r.bezierCurveTo(.6,.15,.64,.04,.59,0),r.bezierCurveTo(.64,-.04,.6,-.15,.5,-.145),r.bezierCurveTo(.43,-.145,.43,-.08,.4,-.035),r.lineTo(-.4,-.035),r.bezierCurveTo(-.43,-.08,-.43,-.145,-.5,-.145),r.bezierCurveTo(-.6,-.15,-.64,-.04,-.59,0),r.bezierCurveTo(-.64,.04,-.6,.15,-.5,.145),r.bezierCurveTo(-.43,.145,-.43,.08,-.4,.035);let o=new Ps(r,{depth:.045,bevelEnabled:!0,bevelThickness:.017,bevelSize:.017,bevelSegments:3,curveSegments:14});o.translate(0,0,-.0225),n.add(new $e(o,e));let a=new $e(new Fi(.095,.15,.085,24),e);a.position.y=.045,i.add(a);for(let c of[.16,.51,.96]){let u=new $e(new Is(.043,.012,8,24),e);u.rotation.x=Math.PI/2,u.position.y=c,i.add(u)}let l=new $e(new kn(.07,12,10),e);return n.add(l),i.add(n),i.userData.vaneTop=n,Qv(i)}function Pp(){function i(o,a){let l=o.attributes.position,c=new S,u=a*12.9898;for(let d=0;d<l.count;d++){c.fromBufferAttribute(l,d);let h=c.length();if(h<.001)continue;let f=c.x/h,m=c.y/h,_=c.z/h,p=Math.sin(u+f*6.2+m*3.1)*Math.cos(u+_*5.1-m*2.2)+.5*Math.sin(u+f*11.3-_*7.7+m*4.4)+.25*Math.cos(u+f*17.7+_*13.1+m*8.8),g=m<.12?Math.max(0,1-(.12-m)*4):1,b=1+Math.max(-.035,Math.min(.035,p*.012))*g;c.setLength(h*b),l.setXYZ(d,c.x,c.y,c.z)}return l.needsUpdate=!0,o.computeVertexNormals(),o}let e=new pt,t=new kn(4.5,64,28,0,Math.PI*2,0,Math.PI/2),n=Ap(Rp(512),.9);n.side=kt,i(t,1),e.add(new $e(t,n));let s=new $e(new vi(4.5,64),n);s.name="rock_solid_underside",s.rotation.x=Math.PI/2,e.add(s);let r=Cp();return r.position.set(0,4.5,0),e.add(r),e}var Lh=i=>i*i*(3-2*i);function eM(i,e,t,n,s=24){let r=[[i-t,e],[i+t,e],[i+t,n]];for(let o=1;o<=s;o++){let a=o/s*Math.PI;r.push([i+t*Math.cos(a),n+t*Math.sin(a)])}return r}function Ip(i){return new oi(i.map(([e,t])=>new Me(e,t)))}function Vr(i,e,t,n){let s=new $e(i,e);return s.name=t,n.add(s),s}function tM(i){return i.updateWorldMatrix(!0,!0),new Ot().setFromObject(i)}function nM(i,e){e.updateWorldMatrix(!0,!0);let t=e.geometry.attributes.position,n=new Map,s=new S;for(let l=0;l<t.count;l++)s.fromBufferAttribute(t,l),i.worldToLocal(e.localToWorld(s)),n.set(s.x.toFixed(6)+","+s.y.toFixed(6),[s.x,s.y]);let r=[...n.values()].sort((l,c)=>l[0]-c[0]||l[1]-c[1]),o=(l,c,u)=>(c[0]-l[0])*(u[1]-l[1])-(c[1]-l[1])*(u[0]-l[0]),a=l=>{let c=[];for(let u of l){for(;c.length>=2&&o(c.at(-2),c.at(-1),u)<=1e-9;)c.pop();c.push(u)}return c.pop(),c};return[...a(r),...a([...r].reverse())]}function Ih(i,e,t){let n=e.map((d,h)=>{let f=e[(h+1)%e.length];return[-f[1]+d[1],f[0]-d[0],0,(f[1]-d[1])*d[0]-(f[0]-d[0])*d[1]]});n.push([0,0,1,-t]);let s=i.index?i.toNonIndexed():i,r=[],o=[],a=["position","normal","uv"].filter(d=>s.attributes[d]);function l(d){return a.flatMap(h=>Array.from({length:s.attributes[h].itemSize},(f,m)=>s.attributes[h].array[d*s.attributes[h].itemSize+m]))}function c(d,h){for(let f=1;f<d.length-1;f++)h.push(d[0],d[f],d[f+1])}for(let d=0;d<s.attributes.position.count;d+=3){let h=[l(d),l(d+1),l(d+2)];if(n.some(([f,m,_,p])=>h.every(g=>f*g[0]+m*g[1]+_*g[2]+p<-1e-8))){c(h,o);continue}for(let[f,m,_,p]of n){if(!h.length)break;let g=[],b=[];for(let A=0;A<h.length;A++){let v=h[A],E=h[(A+1)%h.length],R=f*v[0]+m*v[1]+_*v[2]+p,T=f*E[0]+m*E[1]+_*E[2]+p;if((R>=-1e-8?g:b).push(v),R>1e-8&&T<-1e-8||R<-1e-8&&T>1e-8){let x=R/(R-T),C=v.map((N,H)=>N+(E[H]-N)*x);g.push(C),b.push(C)}}c(b,o),h=g}c(h,r)}function u(d){let h=new At,f=0;for(let m of a){let _=s.attributes[m].itemSize;h.setAttribute(m,new ht(d.flatMap(p=>p.slice(f,f+_)),_)),f+=_}return h.computeBoundingBox(),h.computeBoundingSphere(),h}return{inside:u(r),outside:u(o)}}function Lp(i,e,t,n){let s=new pt;s.name="entrance_hinge",s.position.copy(n),i.add(s),i.updateMatrixWorld(!0);for(let r of[e,t].filter(Boolean))s.attach(r);return s}function iM(){let i=document.createElement("canvas");i.width=512,i.height=768;let e=i.getContext("2d"),t=18,n=()=>(t=t*16807%2147483647,t/2147483647);for(let r=0;r<6;r++){let o=r*512/6,a=512/6;e.fillStyle=["#b57b34","#c99245","#bf873d","#ce9a4e","#bc8238","#c58e42"][r],e.fillRect(o,0,a+1,768);for(let l=0;l<85;l++){let c=o+3+n()*(a-6);e.strokeStyle=l%3?"#f3c97b18":"#67421c20",e.lineWidth=.5+n()*1.3,e.beginPath(),e.moveTo(c,0),e.bezierCurveTo(c+8*n(),260,c-8*n(),500,c,768),e.stroke()}e.fillStyle="#553818",e.fillRect(o,0,6,768),e.fillStyle="#edbf6a",e.fillRect(o+6,0,2,768)}for(let[r,o]of[[125,225],[365,530]]){e.strokeStyle="#7d501f88",e.lineWidth=2;for(let a=1;a<4;a++)e.beginPath(),e.ellipse(r,o,a*3,a*11,.06,0,Math.PI*2),e.stroke()}let s=new mn(i);return s.colorSpace=St,s}function Dp(i){i.updateMatrixWorld(!0);let e=[];i.traverse(v=>{v.isMesh&&v.visible&&/^(shell_main|shell_cutaway_cover)/.test(v.name)&&e.push(v)});let t=e.find(v=>v.material.name==="v7_blue_volcanic_stone")?.material.clone();if(t){t.color.setRGB(.78,.93,1.32),t.roughness=.87,t.bumpMap=t.map,t.bumpScale=.009,i.traverse(T=>{T.isMesh&&T.visible&&T.material.name==="v7_blue_volcanic_stone"&&(T.material=t)});let v=new Map,E=-1/0;for(let T of e){if(T.material!==t)continue;let x=T.geometry.attributes.position;for(let C=0;C<x.count;C++)E=Math.max(E,x.getY(C))}for(let T of e){if(T.material!==t)continue;let x=T.geometry.attributes.position;for(let C=0;C<x.count;C++)if(Math.abs(x.getY(C)-E)<.001){let N=x.getX(C),H=x.getZ(C);Math.hypot(N,H)>.1&&v.set(Math.atan2(H,N).toFixed(5),[N,E,H])}}let R=[...v.values()].sort((T,x)=>Math.atan2(T[2],T[0])-Math.atan2(x[2],x[0]));if(R.length>=3){let T=[],x=[];for(let N=0;N<R.length;N++){let H=R[N],B=R[(N+1)%R.length];for(let k of[[0,E+.018,0],B,H])T.push(...k),x.push(k[0]/2.8+.5,k[2]/2.8+.5)}let C=new At;C.setAttribute("position",new ht(T,3)),C.setAttribute("uv",new ht(x,2)),C.computeVertexNormals(),Vr(C,t,"shell_roof_closed",i),i.userData.roofClosed=!0}}let n=new mt({color:1388131,roughness:.74,metalness:.06}),s=i.getObjectByName("door_frame"),r=i.getObjectByName("door_panel"),o=i.getObjectByName("door_handle");if(!r)throw new Error("Missing Squidward door panel");s.position.y-=.15,r.position.y-=.15,s.scale.x=r.scale.x=1.12,r.position.x*=1.12,s.material=n;let a=tM(r),l=nM(i,r),c=l.map(([v,E])=>[v*1.015,E-.003]),u=Ih(s.geometry,l.map(([v,E])=>[v/s.scale.x,E-s.position.y]),1);s.geometry=u.outside,u.inside.dispose();for(let v of e)if(v.material===t){let E=Ih(v.geometry,c,1.15);v.geometry=E.outside,E.inside.dispose()}let d=iM(),h=r.material.clone();h.map=d,h.color.set("#d8ba89"),h.bumpMap=d,h.bumpScale=.004,h.roughness=.78,r.material=h;let f=r.geometry.clone(),m=f.attributes.position,_=[];for(let v=0;v<m.count;v++)_.push(m.getX(v)/.6624,m.getY(v)/.9968);f.setAttribute("uv",new ht(_,2)),r.geometry=f;let p=Vr(new kn(.045,20,14),new mt({color:14199880,roughness:.4,metalness:.4}),"door_brass_knob",i);p.position.set(.255*1.12,.4,1.636),o.visible=!1;let g=new mt({color:1056297,roughness:1,side:kt}),b=Vr(new Er(Ip(l)),g,"entrance_recess",i);b.position.z=1.4;let A=Lp(i,r,p,new S(a.min.x,a.min.y,1.56));return{pivot:A,anchor:new S(0,.45,1.59),doorMeshes:[r,p,s],setOpen:v=>{A.rotation.y=-Lh(v)*Math.PI*.57},reset(){A.rotation.y=0}}}function Np(i){let e=i.getObjectByProperty("isMesh",!0),t=eM(0,.008,.14,.39),n=Ih(e.geometry,t,.46);e.geometry=n.outside;let s=Vr(n.inside,e.material.clone(),"pineapple_original_door",e.parent);s.material.side=kt,s.position.copy(e.position),s.quaternion.copy(e.quaternion),s.scale.copy(e.scale);let r=Vr(new Er(Ip(t)),new mt({color:1059906,roughness:1,side:kt}),"pineapple_entrance_recess",i);r.position.z=.48;let o=Lp(i,s,null,new S(-.14,.008,.59));return{pivot:o,anchor:new S(0,.27,.59),doorMeshes:[s],setOpen:a=>{o.rotation.y=-Lh(a)*Math.PI*.56},reset(){o.rotation.y=0}}}function Up(i){let e=new pt;e.name="rock_back_hinge",e.position.set(0,0,-4.35),i.add(e),i.updateMatrixWorld(!0);for(let n of[...i.children])n!==e&&e.attach(n);let t=Vr(new vi(4.32,72),new mt({color:2760740,roughness:1,side:kt}),"under_rock_entrance",i);return t.rotation.x=-Math.PI/2,t.position.y=.012,{pivot:e,anchor:new S(0,.1,0),doorMeshes:[e],setOpen:n=>{e.rotation.x=-Lh(n)*Math.PI*.46},reset(){e.rotation.x=0}}}function sM(i){if(i.userData.portholeDetails)return;i.userData.portholeDetails=!0;let e=new pt;e.name="porthole_details";let t=new mt({color:5858993,roughness:.65,metalness:.12}),n=document.createElement("canvas");n.width=n.height=128;let s=n.getContext("2d"),r=s.createRadialGradient(46,38,4,64,64,88);r.addColorStop(0,"#cfdfdb"),r.addColorStop(.45,"#739ab7"),r.addColorStop(1,"#345172"),s.fillStyle=r,s.fillRect(0,0,128,128),s.strokeStyle="rgba(240,250,248,0.3)",s.lineWidth=8,s.beginPath(),s.moveTo(18,22),s.lineTo(91,101),s.stroke();let o=new mn(n);o.colorSpace=St;let a=new hn({map:o,metalness:.08,roughness:.22,transparent:!1,clearcoat:.9,clearcoatRoughness:.15});i.traverse(l=>{if(!l.isMesh||!/^shell_porthole_[LR]$/.test(l.name))return;let c=new Ot().setFromObject(l),u=c.getCenter(new S),d=c.getSize(new S),h=Math.max(d.x,d.z)/2,f=new S(0,0,1),m=new $e(new Is(h*.94,h*.18,10,40),t);m.position.copy(i.worldToLocal(new S(u.x,u.y,c.max.z+.012))),m.lookAt(m.position.clone().add(f)),e.add(m);let _=new mt({color:2702965,roughness:.6,metalness:.2});for(let g=0;g<8;g++){let b=g/8*Math.PI*2,A=new $e(new kn(h*.055,8,6),_);A.position.copy(m.position).add(new S(Math.cos(b)*h*.94,Math.sin(b)*h*.94,h*.16)),A.scale.z=.4,e.add(A)}let p=new $e(new vi(h*.66,28),a);p.position.copy(i.worldToLocal(new S(u.x,u.y,c.max.z+.025))),p.lookAt(p.position.clone().add(f)),e.add(p)}),e.children.length&&i.add(e)}function Fp({root:i,scene:e,loader:t,camera:n,canvas:s,controls:r,reducedMotion:o,onTransition:a,onProgress:l,onFailure:c,onPineapple:u,onStreet:d}){let h=new pt;h.name="bikini-bottom-neighborhood",e.add(h);let f=new Map,m=new Map,_=new Map,p=!0,g=!1,b=null,A=null,v=null,E=document.createElement("nav");E.className="neighborhood-labels",E.setAttribute("aria-label","\u6BD4\u5947\u5821\u4E09\u4F4D\u90BB\u5C45"),i.append(E);let R=document.createElement("button");R.className="neighborhood-return",R.textContent="\u2190 \u8FD4\u56DE\u6BD4\u5947\u5821",R.hidden=!0,i.append(R);let T=document.createElement("p");T.className="neighborhood-hint",T.textContent="\u70B9\u51FB\u623F\u5B50\u53BB\u505A\u5BA2 \xB7 \u62D6\u52A8\u73AF\u987E \xB7 \u6EDA\u8F6E\u6216\u53CC\u6307\u7F29\u653E",i.append(T);let x=document.createElement("section");x.className="neighborhood-visit",x.hidden=!0,x.setAttribute("aria-label","\u90BB\u5C45\u5BB6\u4E2D"),i.append(x);let C=document.createElement("div");C.className="neighborhood-fade",C.hidden=!0,i.append(C);function N(O,w="",I=0){i.dataset.entranceState=O,i.dataset.entranceHouse=w,i.dataset.entranceProgress=I.toFixed(3)}function H(){clearTimeout(v),C.style.opacity="0",v=setTimeout(()=>{C.hidden=!0},350)}function B(){b&&(b.remove(),b=null),x.hidden=!0,g=!1}function k(O){let w=ps.houses.find(I=>I.id===O);A=null,r.enabled=!0,r.enableDamping=!0,N("inside",O,1),O==="pineapple"?(p=!1,h.visible=!1,i.dataset.neighborhood="inside",u(),v=setTimeout(H,o?0:680)):(g=!0,i.dataset.neighborhood="visit",x.hidden=!1,b=document.createElement("iframe"),b.title=w.name,b.addEventListener("load",H,{once:!0}),b.src=w.entry,x.append(b),R.focus({preventScroll:!0}))}function D(O){if(i.dataset.houseState!=="ready"||!f.has(O)||A||g||!p)return;J(),E.hidden=!0,T.hidden=!0,R.hidden=!1,C.hidden=!1,C.style.opacity="0";let w=f.get(O),I=_.get(O),F=w.localToWorld(I.anchor.clone()),U=O==="patrick";a(),r.enabled=!1,r.enableDamping=!1;let ee=Math.max(U?15:5,(U?4.2:1.2)/(Math.tan(Ye.degToRad(n.fov/2))*n.aspect)),he=F.clone().add(new S(0,U?2.4:0,0)),q=F.clone().add(new S(U?2:.25,U?ee*.5:ee*.13,ee));A={id:O,start:performance.now(),from:n.position.clone(),fromTarget:r.target.clone(),position:q,target:he,anchor:F,entrance:I,rock:U},N("approaching",O)}let W=new Map(ps.houses.map(O=>{let w=document.createElement("button");return w.className="neighborhood-label",w.textContent=O.name,w.dataset.neighbor=O.id,w.disabled=!0,w.addEventListener("click",()=>D(O.id)),E.append(w),[O.id,w]}));function J(){let O=i.querySelector("[data-house-tooltip]");O&&(O.hidden=!0)}function j(){clearTimeout(v),A=null,r.enabled=!0,r.enableDamping=!0,C.hidden=!0;for(let O of _.values())O.reset();N("idle"),J(),B(),p=!0,h.visible=!0,E.hidden=!1,T.hidden=!1,R.hidden=!0,i.dataset.neighborhood="street",d()}R.addEventListener("click",j),window.addEventListener("keydown",O=>{O.key==="Escape"&&(g||A)&&(O.preventDefault(),j())});function ae(){let O=document.createElement("canvas");O.width=O.height=256;let w=O.getContext("2d");w.fillStyle="#e8dba5",w.fillRect(0,0,256,256);let I=31;for(let U=0;U<3600;U++){I=I*16807%2147483647;let ee=I%256;I=I*16807%2147483647;let he=I%256;w.fillStyle=U%3?"#c9ba862e":"#fff8d355",w.fillRect(ee,he,1,1)}let F=new mn(O);return F.colorSpace=St,F.wrapS=F.wrapT=gi,F.repeat.set(12,12),F}let X=new $e(new un(1e3,1e3),new mt({map:ae(),roughness:1}));X.rotation.x=-Math.PI/2,X.position.y=-.025,X.receiveShadow=!0,h.add(X);let re=new mt({color:4350826,roughness:1}),ie=new $e(new un(150,4.5),re);ie.rotation.x=-Math.PI/2,ie.position.set(0,-.012,9),ie.receiveShadow=!0,h.add(ie);function ye(O,w){let I=w.max.z-.08,F=6.75;if(O.id==="squidward")for(let U=I+.3;U<F;U+=.72){let ee=new $e(new Mn(1.5,.045,.4),new mt({color:7764325,roughness:1}));ee.position.set(O.x,0,U),ee.rotation.y=.04*Math.sin(U*5),ee.receiveShadow=!0,h.add(ee)}else{let U=Math.max(.4,F-I),ee=new $e(new un(O.id==="patrick"?2.1:1.7,U),re);if(ee.rotation.x=-Math.PI/2,ee.position.set(O.x,-.005,I+U/2),ee.receiveShadow=!0,h.add(ee),O.id==="pineapple")for(let he=I+.3;he<F;he+=.65){let q=new $e(new vi(.25,7),new mt({color:10134617,roughness:1}));q.rotation.x=-Math.PI/2,q.scale.x=1.3,q.position.set(O.x+.25*Math.sin(he*4),.004,he),h.add(q)}}}async function xe(O){try{let w=O.component==="patrick-exterior"?Pp():(await t.loadAsync(O.url+"?v="+ps.version)).scene;O.shellOnly&&w.traverse(Z=>{if(Z.isMesh){let te=Z,le=!1;for(;te&&te!==w;)/^(shell_|door_)/.test(te.name)&&(le=!0),te=te.parent;Z.visible=le}}),O.id==="squidward"&&sM(w);let I=O.id==="squidward"?Dp(w):O.id==="pineapple"?Np(w):Up(w);_.set(O.id,I),w.updateMatrixWorld(!0);let F=new Ot;w.traverse(Z=>{Z.isMesh&&Z.visible&&F.union(new Ot().setFromObject(Z))});let U=F.getSize(new S),ee=F.getCenter(new S),he=O.height/U.y;w.scale.set(he*(O.widthScale||1),he,he),w.position.set(O.x-ee.x*he*(O.widthScale||1),-F.min.y*he,O.z-ee.z*he),w.userData.neighbor=O.id,w.traverse(Z=>{Z.isMesh&&(Z.castShadow=!0,Z.receiveShadow=!0)}),h.add(w),w.updateMatrixWorld(!0);let q=new Ot;return w.traverse(Z=>{Z.isMesh&&Z.visible&&q.union(new Ot().setFromObject(Z))}),m.set(O.id,q),f.set(O.id,w),ye(O,q),W.get(O.id).disabled=!1,i.dataset.neighborhoodBounds=JSON.stringify(ps.houses.filter(Z=>m.has(Z.id)).map(Z=>({id:Z.id,min:m.get(Z.id).min.toArray(),max:m.get(Z.id).max.toArray()}))),l(O.id),!0}catch{return c({id:"neighbor-"+O.id,name:O.name,url:O.url||"scripts/patrick-exterior.js",kind:"neighbor",neighbor:O.id}),!1}}function Ie(){let O=Ye.degToRad(n.fov),w=Math.max(14,33/n.aspect)/(2*Math.tan(O/2))*1.12;return{target:new S(.5,4.3,0),position:new S(.5,4.3+w*.1,w)}}function Xe(O){let w=O.intersectObjects([...f.values()],!0).filter(F=>{let U=F.object;for(;U;){if(!U.visible)return!1;U=U.parent}return!0});if(!w.length)return null;let I=w[0].object;for(;I&&!I.userData.neighbor;)I=I.parent;return I?.userData.neighbor||null}function et(O,w,I=performance.now()){if(!(!p||g)){if(A){let F=A,U=(I-F.start)/(o?700:2450),ee=he=>(he=Ye.clamp(he,0,1),he*he*(3-2*he));if(U<.3){let he=ee(U/.3);n.position.lerpVectors(F.from,F.position,he),r.target.lerpVectors(F.fromTarget,F.target,he),N("approaching",F.id,U)}else{let he=ee((U-.3)/.34);if(F.entrance.setOpen(he),N(F.rock?"lifting-rock":"opening-door",F.id,U),U>.64){let q=ee((U-.64)/.36),Z=F.anchor.clone().add(F.rock?new S(0,-1.7,0):new S(0,0,-1.3)),te=F.anchor.clone().add(F.rock?new S(0,-2.5,-1):new S(0,0,-3));n.position.lerpVectors(F.position,Z,q),r.target.lerpVectors(F.target,te,q),N("entering",F.id,U),C.style.opacity=String(ee((U-.88)/.12))}}n.lookAt(r.target),n.updateMatrixWorld(!0),i.dataset.entranceAngle=(F.rock?F.entrance.pivot.rotation.x:F.entrance.pivot.rotation.y).toFixed(3),U>=1&&(C.style.opacity="1",k(F.id))}for(let F of ps.houses){let U=m.get(F.id);if(!U)continue;let ee=new S(F.x,-.45,U.max.z).project(n),he=W.get(F.id);he.style.left=`${(ee.x*.5+.5)*O}px`,he.style.top=`${(-ee.y*.5+.5)*w}px`}}}return i.dataset.neighborhood="street",N("idle"),{group:h,pose:Ie,pick:Xe,choose:D,show:j,update:et,loadAll:()=>Promise.all(ps.houses.map(xe)),retry:O=>xe(ps.houses.find(w=>w.id===O)),get loadedCount(){return f.size},get visible(){return p},get visiting(){return g},get transitioning(){return!!A}}}var Mt=document.querySelector(".house"),qt=document.querySelector("[data-house-canvas]"),uc=document.querySelector("[data-house-loading]"),hc=document.querySelector("[data-house-error]"),Op=document.querySelector("[data-house-progress]"),Dh=document.querySelector("[data-house-caption]"),qo=document.querySelector("[data-house-labels]"),Nh=document.querySelector("[data-house-objects]"),Ai=document.querySelector("[data-house-tooltip]"),Yo=new Map(wn.rooms.map(i=>[i.id,i])),kp=new Map(wn.interactions.map(i=>[i.id,i]));function Bp(i){let e=kp.get(i);if(e){if(e.action==="toy"){window.dispatchEvent(new CustomEvent("house:toy-chest"));return}window.dispatchEvent(new CustomEvent(e.action==="music"?"house:music":"house:content",{detail:{id:i,section:e.section}}))}}var zr=matchMedia("(prefers-reduced-motion: reduce)").matches,Zo=new URLSearchParams(location.search).has("structure"),Vp=new URLSearchParams(location.search).has("privacy");Vp&&document.body.classList.add("privacy-preview");var zp=[wn.structure,...Zo?[]:wn.assets],Gp=Zo?[]:Wo.map(i=>({id:`award-${i.id}`,name:i.title,url:i.thumbnail,kind:"texture",award:i})),Wp=Mt.hasAttribute("data-house-companion")||Mt.hasAttribute("data-house-companion-preview"),Xp=Mt.hasAttribute("data-house-neighborhood"),Hp=zp.length+Gp.length+Number(Wp)+(Xp?3:0),rM=performance.now(),cc=new Set,zs=new Map,fn=new Map,_n;function Uh(i){Mt.dataset.houseState="error",Mt.setAttribute("aria-busy","false"),uc.hidden=!0,hc.hidden=!1,hc.querySelector("h2").textContent=fn.size?"\u90E8\u5206\u8D44\u6E90\u672A\u80FD\u8F7D\u5165":"\u65E0\u6CD5\u663E\u793A\u4E09\u7EF4\u623F\u5C4B",document.querySelector("[data-house-error-message]").textContent=i;let e=document.querySelector("[data-house-error-list]");e.replaceChildren();for(let[t,n]of fn){let s=document.createElement("li");s.textContent=`${n.name}\uFF1A${n.url}`,s.dataset.assetId=t,e.append(s)}}try{_n=new $l({canvas:qt,antialias:!0,alpha:!0})}catch{Uh("\u6D4F\u89C8\u5668\u672A\u80FD\u542F\u7528 WebGL\u3002\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u7684\u786C\u4EF6\u52A0\u901F\u8BBE\u7F6E\u540E\u91CD\u8BD5\u3002"),document.querySelector("[data-house-retry]").addEventListener("click",()=>location.reload())}if(_n){let J=function(w,I,F,U,ee,he,q){let Z=new pt;Z.name=w,Object.assign(Z.userData,q),Z.position.fromArray(ee),Z.quaternion.setFromUnitVectors(new S(0,0,1),he.clone().normalize());let te=q.book,le=new $e(new Mn(I+.045,F+.045,.045),new mt({color:te?15984585:9597254,roughness:.88}));le.receiveShadow=!0,Z.add(le);let ge=new $e(new un(te?I+.055:I,te?F+.055:F),U);if(ge.position.z=.024,Z.add(ge),te){let Le=ge.clone();Le.position.z=-.024,Le.rotation.y=Math.PI,Z.add(Le);let Fe=le.clone();Fe.scale.set(.06,1.02,1.16),Fe.position.x=-I/2,Fe.material=new mt({color:4287609,roughness:.95}),Z.add(Fe);for(let Se=0;Se<3;Se++){let Oe=[new S(-I/2,-F/2-.023,-.013+Se*.011),new S(I/2+.022,-F/2-.023,-.013+Se*.011)];Z.add(new yi(new At().setFromPoints(Oe),new ri({color:13351836})))}}return c.add(Z),Z},j=function(w){return new Promise(I=>{if(Vp){let F=document.createElement("canvas");F.width=512,F.height=360;let U=F.getContext("2d");U.fillStyle="#f8f0d9",U.fillRect(0,0,512,360),U.strokeStyle="#ad894c",U.lineWidth=12,U.strokeRect(18,18,476,324),U.fillStyle="#53665d",U.textAlign="center",U.font="bold 48px sans-serif",U.fillText("\u8363\u8A89\u8BC1\u4E66",256,162),U.font="28px sans-serif",U.fillText("\u4E2A\u4EBA\u4FE1\u606F\u5DF2\u9690\u85CF",256,226);let ee=new mn(F);ee.colorSpace=St;let he=u.get(w.award.id);he.map=ee,he.needsUpdate=!0,cc.add(w.id),Ie(),I(!0);return}new Vi().load(w.url,F=>{F.colorSpace=St,F.anisotropy=Math.min(4,_n.capabilities.getMaxAnisotropy());let U=u.get(w.award.id);U.map=F,U.needsUpdate=!0,cc.add(w.id),fn.delete(w.id),Ie(),I(!0)},void 0,()=>{fn.set(w.id,w),Ie(),I(!1)})})},ae=function(){let F=Ye.degToRad(s.fov),U=Math.max(15.8/(2*Math.tan(F/2)),11.8/(2*Math.tan(F/2)*s.aspect))*1.07;return{target:new S(0,5.8,0),position:new S(U*.055,5.8+U*.105,U)}},X=function(w,I){Mt.dataset.cameraTransition="moving",r.enabled=!1,b={start:performance.now(),fromPosition:s.position.clone(),fromTarget:r.target.clone(),position:w,target:I,duration:zr?0:650}},re=function(){c.children.forEach(w=>{w.visible=!p||w.userData.roomId===p}),Nh.hidden=!p;for(let w of zs.values())w.traverse(I=>{let F=I.userData;if(!I.isMesh)return;let U=w.userData.assetId==="structure",ee=U&&F.roomId==="living"&&(F.occluder||I.name==="living_L0_sand");if(ee&&(Array.isArray(I.material)?I.material:[I.material]).forEach(Z=>{Z.clippingPlanes=t[p]??null}),!p){I.visible=!F.roomViewOnly;return}let he=F.roomId===p;if(!U)he=w.userData.roomId===p;else if(p==="storage"&&ee)he=!0;else if(F.roomId==="stairs"){I.visible=!1;return}U&&I.name==="roof_L3_leaf"&&(he=!1),I.visible=F.roomViewOnly?F.roomViewOnly===p:he});if(p==="roof"){let w=[];zs.get("structure")?.traverse(I=>{I.isMesh&&I.userData.roomId==="stairs"&&I.userData.level>=2&&w.push({name:I.name,level:I.userData.level,roofAccess:!!I.userData.roofAccess,visible:I.visible})}),Mt.dataset.roofMeshes=JSON.stringify(w)}},ie=function(w){let I=Yo.get(w);if(!I||!E||T||g?.visible)return!1;let F=p!==w;p=w,Mt.dataset.houseView="room",Dh.hidden=!1,qo.hidden=!0,Ai.hidden=!0,document.querySelector("[data-house-floor]").textContent=I.floor,document.querySelector("[data-house-room-name]").textContent=I.name,re();let U=new S(...I.target),ee=new S(...I.camera),he=I.bounds[1][0]-I.bounds[0][0],q=I.bounds[1][1]-I.bounds[0][1],Z=Math.tan(Ye.degToRad(s.fov/2)),te=Math.max(he/(2*Z*s.aspect),q/(2*Z))*1.08,le=ee.clone().sub(U);return le.multiplyScalar(Math.max(1,te/le.length())),ee.copy(U).add(le),X(ee,U),F&&window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:w}})),!0},ye=function(){if(g?.visible){g.show();return}p=null,Mt.dataset.houseView="whole",Dh.hidden=!0,qo.hidden=!1,Ai.hidden=!0,re();let w=ae();X(w.position,w.target),window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:null}}))},xe=function(w,I){let F=qt.getBoundingClientRect();f.set((w-F.left)/F.width*2-1,-(I-F.top)/F.height*2+1),h.setFromCamera(f,s);let U=[];l.traverse(he=>{if(!he.isMesh)return;let q=he;for(;q;){if(!q.visible)return;q=q.parent}U.push(he)});let ee=h.intersectObjects(U,!1);for(let he of ee){if((Array.isArray(he.object.material)?he.object.material[he.face.materialIndex]:he.object.material).clippingPlanes?.some(ge=>ge.distanceToPoint(he.point)<0))continue;let Z=x.pick(he.object,he.point);if(Z)return{passage:Z,roomId:p};let te=he.object;for(;te&&!te.userData.roomId&&!te.userData.awardId&&!te.userData.contentId;)te=te.parent;if(te?.userData.companionId)return{companionId:te.userData.companionId,roomId:te.userData.roomId};if(te?.userData.petId)return{petId:te.userData.petId,roomId:te.userData.roomId};if(te?.userData.contentId&&(!te.userData.contentBounds||te.userData.contentBounds.containsPoint(te.worldToLocal(he.point.clone()))))return{contentId:te.userData.contentId,roomId:te.userData.roomId};if(te?.userData.awardId)return{awardId:te.userData.awardId,roomId:"storage"};let le=te?.userData.roomId;if(Yo.has(le))return{roomId:le}}return null},Ie=function(){Mt.dataset.loadedModels=String(zs.size),Mt.dataset.loadedTextures=String(cc.size),Mt.dataset.failedModels=String([...fn.values()].filter(F=>F.kind!=="texture").length),Mt.dataset.failedTextures=String([...fn.values()].filter(F=>F.kind==="texture").length),Mt.dataset.failedResources=String(fn.size);let w=zs.size+cc.size+Number(W?.snapshot().loaded??!1)+(g?.loadedCount||0);Op.value=w/Hp*100;let I=uc.querySelector("[data-house-load-value]");I&&(I.textContent=`${Math.floor(Op.value)}%`),fn.size?(clearTimeout(R),R=null,E=!1,Uh("\u5C65\u5386\u53EF\u4EE5\u7EE7\u7EED\u9605\u8BFB\u3002\u8BF7\u91CD\u8BD5\u4EE5\u4E0B\u8D44\u6E90\uFF0C\u5168\u90E8\u8F7D\u5165\u540E\u5373\u53EF\u8FDB\u5165\u623F\u95F4\u3002")):w===Hp&&!E&&R===null&&(R=setTimeout(()=>{R=null,!(fn.size||T)&&(E=!0,Mt.dataset.houseState="ready",Mt.setAttribute("aria-busy","false"),uc.hidden=!0,hc.hidden=!0,window.dispatchEvent(new CustomEvent("house:ready")))},Math.max(0,(zr?0:700)-(performance.now()-rM))))},Xe=function(w){return new Promise(I=>{d.load(`${w.url}?v=${wn.version}`,F=>{let U=F.scene;U.userData.assetId=w.id,w.room&&(U.userData.roomId=w.room,U.position.fromArray(w.position),U.rotation.y=w.rotation),U.traverse(ee=>{if(!ee.isMesh)return;let he=ee.parent;for(;he&&he!==U.parent;){for(let te of["roomId","level","occluder","roomViewOnly","roofAccess"])ee.userData[te]===void 0&&he.userData[te]!==void 0&&(ee.userData[te]=he.userData[te]);if(he===U)break;he=he.parent}ee.castShadow=!0,ee.receiveShadow=!0,w.room&&(ee.userData.roomId=w.room),w.id==="structure"&&ee.userData.roomId==="living"&&(ee.userData.occluder||ee.name==="living_L0_sand")&&(ee.material=Array.isArray(ee.material)?ee.material.map(te=>te.clone()):ee.material.clone(),(Array.isArray(ee.material)?ee.material:[ee.material]).forEach(te=>{te.clipShadows=!0}));let q=wn.interactions.find(te=>te.asset===w.id);q&&(ee.userData.contentId=q.id,q.localBounds&&(ee.userData.contentBounds=new Ot(new S(...q.localBounds[0]),new S(...q.localBounds[1])))),(Array.isArray(ee.material)?ee.material:[ee.material]).forEach(te=>{te.roughness=Math.max(te.roughness??.8,.7),te.metalness=Math.min(te.metalness??0,.08),te.name==="window_glass"&&(te.emissive=new Qe(2908020),te.emissiveIntensity=.16)})}),l.add(U),w.id==="chest"&&(k=bp(U,{root:Mt,version:wn.version,reducedMotion:zr})),w.pet&&(w.pet.fur&&dp(U,{bodyScale:w.pet.bodyScale??1,limbRatio:w.pet.limbRatio??1,layers:i<600?6:8,strands:i<600?18e3:24e3}),B=hp(U,w,{root:Mt,canvas:qt,camera:s,reducedMotion:zr})),zs.set(w.id,U),fn.delete(w.id),re(),Ie(),I(!0)},void 0,()=>{fn.set(w.id,w),Ie(),I(!1)})})},O=function(w){if(requestAnimationFrame(O),T||g?.visiting)return;if(b){let U=b.duration?Math.min((w-b.start)/b.duration,1):1,ee=U*U*(3-2*U);s.position.lerpVectors(b.fromPosition,b.position,ee),r.target.lerpVectors(b.fromTarget,b.target,ee),U===1&&(b=null,r.enabled=!0,Mt.dataset.cameraTransition="idle",window.dispatchEvent(new CustomEvent("house:camera-settled",{detail:{id:p}})))}r.update(),s.updateMatrixWorld();let I=D===null?0:Math.min((w-D)/1e3,1),F=D===null?0:Math.min((w-D)/1e3,.06);if(D=w,k?.update(F),B?.update(F,E&&!g?.visible&&!document.hidden&&(!p||p==="living")&&!document.querySelector("dialog[open]")),W?.update(I,E&&!g?.visible),g?.update(i,e),!p)for(let U of wn.rooms){let ee=new S(...U.label).project(s),he=m.get(U.id);he.hidden=ee.z>1||Math.abs(ee.x)>1||Math.abs(ee.y)>1,he.style.left=`${(ee.x*.5+.5)*i}px`,he.style.top=`${(-ee.y*.5+.5)*e}px`}for(let U of wn.interactions){let ee=_.get(U.id),he=new S(...U.anchor).project(s);ee.hidden=!E||p!==U.room||he.z>1||Math.abs(he.x)>1||Math.abs(he.y)>1,ee.style.left=`${(he.x*.5+.5)*i}px`,ee.style.top=`${(-he.y*.5+.5)*e}px`}x.update(),_n.render(n,s),C++,w-N>2e3&&(H=C*1e3/(w-N),qt.dataset.fps=H.toFixed(1),qt.dataset.triangles=String(_n.info.render.triangles),qt.dataset.drawCalls=String(_n.info.render.calls),C=0,N=w)},i=Math.max(1,Mt.clientWidth),e=Math.max(1,Mt.clientHeight);_n.setPixelRatio(Math.min(devicePixelRatio,1.6)),_n.setSize(i,e,!1),_n.outputColorSpace=St,_n.toneMapping=Io,_n.toneMappingExposure=1.14,_n.shadowMap.enabled=!0,_n.shadowMap.type=Us,_n.localClippingEnabled=!0;let t={living:[new vn(new S(1,0,0),2.55)],storage:[new vn(new S(-1,0,0),-2.55)]},n=new oo,s=new sn(34,i/e,.1,260),r=new ic(s,qt);r.enableDamping=!0,r.dampingFactor=.08,r.enablePan=!1,r.minDistance=3.5,r.maxDistance=60,r.minPolarAngle=Math.PI*.26,r.maxPolarAngle=Math.PI*.56,r.minAzimuthAngle=-Math.PI*.3,r.maxAzimuthAngle=Math.PI*.3,n.add(new Eo(16315871,7771041,2.15));let o=new os(16773842,2.6);o.position.set(-8,17,13),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-8,right:8,top:15,bottom:-6,near:1,far:42}),o.shadow.bias=-5e-4,o.shadow.normalBias=.025,o.target.position.set(0,5,0),n.add(o,o.target);let a=new os(13757951,.8);a.position.set(7,8,8),n.add(a);let l=new pt;n.add(l);let c=new pt;l.add(c);let u=new Map,d=new Hr,h=new Ns,f=new Me,m=new Map,_=new Map,p=null,g=null,b=null,A=null,v=!1,E=!1,R=null,T=!1,x=wp({root:Mt,camera:s,rooms:Yo,getRoom:()=>p,focusRoom:ie}),C=0,N=performance.now(),H=0,B=null,k=null;window.addEventListener("house:toy-chest",()=>k?.toggle());let D=null,W=Wp?vp({root:Mt,canvas:qt,camera:s,houseGroup:l,focusRoom:ie,getRoom:()=>p,getAsset:w=>zs.get(w),getPet:()=>B,getDisplay:w=>c.children.find(I=>I.userData.contentId===w),getToyChest:()=>k,reducedMotion:zr,onReady:Ie,onError:w=>{fn.set(w.id,w),Ie()}}):null;if(Xp&&(g=Fp({root:Mt,scene:n,loader:d,camera:s,canvas:qt,controls:r,reducedMotion:zr,onTransition:()=>{b=null},onProgress:w=>{fn.delete("neighbor-"+w),Ie()},onFailure:w=>{fn.set(w.id,w),Ie()},onPineapple:()=>{l.visible=!0,n.background=null,r.maxDistance=60,r.minAzimuthAngle=-Math.PI*.3,r.maxAzimuthAngle=Math.PI*.3,ye()},onStreet:()=>{p=null,l.visible=!1,Mt.dataset.houseView="street",qo.hidden=!0,Nh.hidden=!0,Dh.hidden=!0,n.background=new Qe("#54c5d7"),r.maxDistance=170,r.minAzimuthAngle=-Math.PI*.24,r.maxAzimuthAngle=Math.PI*.24;let w=g.pose();X(w.position,w.target),window.dispatchEvent(new CustomEvent("house:room-changed",{detail:{id:null}}))}}),l.visible=!1,qo.hidden=!0,n.background=new Qe("#54c5d7"),r.maxDistance=170,r.minAzimuthAngle=-Math.PI*.24,r.maxAzimuthAngle=Math.PI*.24,Object.assign(o.shadow.camera,{left:-22,right:22,top:20,bottom:-15,far:70})),!Zo){Wo.forEach((w,I)=>{let F=new mt({color:16777215,roughness:.96});u.set(w.id,F);let U=wn.displays.find(ee=>ee.kind==="award"&&ee.id===w.id);J(`certificate-${w.id}`,...U.size,F,U.position,new S(...U.normal),{roomId:U.room,awardId:w.id})});for(let w of wn.displays.filter(I=>I.kind==="content")){if(w.id==="work-journal"&&W){let F=Mp(),U=F.group;U.name="content-work-journal",Object.assign(U.userData,{roomId:w.room,contentId:w.id,diary:F}),U.position.fromArray(w.position),U.scale.setScalar(.62),U.position.x=-2.32,U.position.z-=.155*.62,U.quaternion.setFromUnitVectors(new S(0,0,1),new S(...w.normal)),U.rotateZ(-Math.PI/2),F.update(0,!0,0),c.add(U);continue}if(w.id==="skills-book"){c.add(lp(w));continue}let I;if(w.sourceAward)I=u.get(w.sourceAward);else{let F=document.createElement("canvas");F.width=768,F.height=512;let U=F.getContext("2d"),ee=w.id==="skills-chart";if(U.fillStyle=ee?"#e5efe1":"#447a81",U.fillRect(0,0,768,512),U.strokeStyle=ee?"#bca172":"#d4b86b",U.lineWidth=14,U.strokeRect(22,22,724,468),U.fillStyle=ee?"#335d62":"#fff0be",U.textAlign="center",U.font="bold 68px sans-serif",U.fillText(ee?"\u6280\u672F\u822A\u6D77\u56FE":"\u5B9E\u4E60\u65E5\u8BB0",384,126),ee){for(let[q,Z]of["AI / Agent","\u5168\u6808\u5F00\u53D1","\u5DE5\u7A0B\u4EA4\u4ED8"].entries()){let te=154+q*230;U.strokeStyle="#6e9990",U.lineWidth=5,U.beginPath(),U.arc(te,284,66,0,Math.PI*2),U.stroke(),U.font="25px sans-serif",U.fillText(Z,te,294),q<2&&(U.font="35px sans-serif",U.fillText("\u2192",te+114,294))}U.font="27px sans-serif",U.fillText("\u628A\u6280\u672F\u5E26\u8FDB\u771F\u5B9E\u4E1A\u52A1",384,416)}else U.font="40px sans-serif",U.fillText("\u5B57\u8282\u8DF3\u52A8",384,244),U.font="30px sans-serif",U.fillText("AI \u76F4\u64AD \xB7 Agent \u5DE5\u7A0B",384,330),U.font="26px sans-serif",U.fillText("2026.06 \u2014 2026.09",384,413);let he=new mn(F);he.colorSpace=St,I=new mt({map:he,roughness:.96})}J(`content-${w.id}`,...w.size,I,w.position,new S(...w.normal),{roomId:w.room,contentId:w.id,book:w.style==="book"})}Mt.dataset.awardDisplays=String(Wo.length),Mt.dataset.projectDisplays="0"}for(let[w,I,F,U]of[[-9,8,1.5,9225166],[8,11,2,10012620],[-7,1,1,10734800],[8,3,1.2,10208206]]){let ee=[];for(let he=0;he<=160;he++){let q=he*Math.PI*2/160,Z=F*(.73+.27*Math.cos(q*5));ee.push(new S(w+Math.cos(q)*Z,I+Math.sin(q)*Z,-6))}n.add(new yi(new At().setFromPoints(ee),new ri({color:U,transparent:!0,opacity:.38})))}for(let w of wn.rooms){let I=document.createElement("button");I.type="button",I.className="room-label",I.textContent=w.name,I.dataset.houseRoom=w.id,I.setAttribute("aria-label",`${w.floor} ${w.name}\uFF0C\u8FDB\u5165\u8FD1\u666F`),I.addEventListener("click",()=>{ie(w.id)&&document.querySelector("[data-house-back]").focus({preventScroll:!0})}),qo.append(I),m.set(w.id,I)}for(let w of wn.interactions){let I=document.createElement("button");I.type="button",I.className="room-label object-label",I.textContent=w.button,I.dataset.houseObject=w.id,I.setAttribute("aria-label",`\u70B9\u51FB${w.label}`),I.addEventListener("click",()=>{E&&p===w.room&&Bp(w.id)}),Nh.append(I),_.set(w.id,I)}document.querySelector("[data-house-back]").addEventListener("click",()=>{let w=p;ye(),m.get(w)?.focus({preventScroll:!0})}),window.addEventListener("keydown",w=>{if(w.key==="Escape"&&!w.defaultPrevented&&!document.querySelector("dialog[open]")&&p){let I=p;ye(),m.get(I)?.focus({preventScroll:!0})}}),r.addEventListener("start",()=>{b=null,Mt.dataset.cameraTransition="idle",v=!0,Ai.hidden=!0}),r.addEventListener("end",()=>{v=!1}),r.addEventListener("change",()=>{qt.dataset.camera=JSON.stringify(s.position.toArray().map(w=>Number(w.toFixed(3)))),qt.dataset.target=JSON.stringify(r.target.toArray().map(w=>Number(w.toFixed(3))))}),qt.addEventListener("pointerdown",w=>{if(!w.isPrimary){A=null;return}A={x:w.clientX,y:w.clientY,time:performance.now(),id:w.pointerId}}),qt.addEventListener("pointercancel",()=>{A=null}),qt.addEventListener("pointerup",w=>{let I=A;if(A=null,!I||I.id!==w.pointerId||Math.hypot(w.clientX-I.x,w.clientY-I.y)>7||performance.now()-I.time>650||!E)return;if(g?.visible){let U=qt.getBoundingClientRect();f.set((w.clientX-U.left)/U.width*2-1,-(w.clientY-U.top)/U.height*2+1),h.setFromCamera(f,s);let ee=g.pick(h);ee&&g.choose(ee);return}let F=xe(w.clientX,w.clientY);if(!p){F&&(ie(F.roomId),F.companionId&&W?.react(),F.petId&&B?.react());return}!F||F.roomId!==p||(F.passage?Mt.dataset.cameraTransition!=="moving"&&ie(F.passage.to):F.companionId?W?.react():F.petId?(B?.react(),window.dispatchEvent(new CustomEvent("house:pet-greet"))):F.contentId?Bp(F.contentId):F?.awardId&&window.dispatchEvent(new CustomEvent("house:award",{detail:{id:F.awardId}})))}),qt.addEventListener("pointermove",w=>{if(w.pointerType!=="mouse"||v||!E){Ai.hidden=!0;return}if(g?.visible){let U=qt.getBoundingClientRect();f.set((w.clientX-U.left)/U.width*2-1,-(w.clientY-U.top)/U.height*2+1),h.setFromCamera(f,s),qt.style.cursor=g.pick(h)?"pointer":"grab",Ai.hidden=!0;return}let I=xe(w.clientX,w.clientY),F=I&&(!p||I.roomId===p&&(I.passage||I.companionId||I.petId||I.awardId||I.contentId));if(qt.style.cursor=F?"pointer":"grab",Ai.hidden=!F,F){Ai.textContent=I.passage?x.label(I.passage):I.companionId?"\u6D77\u7EF5\u5B9D\u5B9D \xB7 \u70B9\u51FB\u804A\u804A\u5929":p?I.petId?"\u66B9\u7F57\u732B \xB7 \u6253\u4E2A\u62DB\u547C":I.contentId?kp.get(I.contentId).label:Wo.find(ee=>ee.id===I.awardId)?.title??"":Yo.get(I.roomId).name;let U=qt.getBoundingClientRect();Ai.style.left=`${Math.min(w.clientX-U.left+14,i-120)}px`,Ai.style.top=`${Math.min(w.clientY-U.top+14,e-40)}px`}}),qt.addEventListener("pointerleave",()=>{Ai.hidden=!0}),document.querySelector("[data-house-retry]").addEventListener("click",async()=>{if(T||[...fn.values()].some(I=>I.kind==="companion")){location.reload();return}hc.hidden=!0,uc.hidden=!1,Mt.dataset.houseState="loading",Mt.setAttribute("aria-busy","true");let w=[...fn.values()];fn.clear(),await Promise.all(w.map(I=>I.kind==="texture"?j(I):I.kind==="neighbor"?g.retry(I.neighbor):Xe(I))),Ie()}),qt.addEventListener("webglcontextlost",w=>{w.preventDefault(),T=!0,E=!1,Uh("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E22\u5931\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u9884\u89C8\u3002")}),new ResizeObserver(()=>{if(g?.transitioning&&g.show(),i=Math.max(1,Mt.clientWidth),e=Math.max(1,Mt.clientHeight),s.aspect=i/e,s.updateProjectionMatrix(),_n.setPixelRatio(Math.min(devicePixelRatio,1.6)),_n.setSize(i,e,!1),p)E&&ie(p);else{let w=g?.visible?g.pose():ae();X(w.position,w.target)}}).observe(Mt);let et=g?.visible?g.pose():ae();s.position.copy(et.position),r.target.copy(et.target),r.update(),Mt.dataset.houseView=g?"street":"whole",Mt.dataset.cameraTransition="idle",Zo&&(document.querySelector(".review-note").textContent="\u7ED3\u6784\u5BA1\u67E5 \xB7 \u5BB6\u5177\u5C1A\u672A\u8F7D\u5165"),requestAnimationFrame(O),window.__pineappleHouse={focusRoom:ie,resetView:ye,scene:n,camera:s,controls:r,config:wn,companion:W,toyChest:()=>k?.snapshot(),snapshot:()=>({state:Mt.dataset.houseState,view:Mt.dataset.houseView,loaded:[...zs.keys()],failed:[...fn.keys()],fps:Number(H.toFixed(1)),renderer:_n.info.render,camera:s.position.toArray(),target:r.target.toArray(),pet:B?.snapshot()??null,toyChest:k?.snapshot()??null,status:"review",structureOnly:Zo}),projectRoom:w=>{let I=Yo.get(w);if(!I)return null;let F=new S(...I.label).project(s),U=qt.getBoundingClientRect();return{x:U.left+(F.x*.5+.5)*i,y:U.top+(-.5*F.y+.5)*e}}},Promise.all([...zp.map(Xe),...Gp.map(j),...g?[g.loadAll()]:[]]).then(Ie)}})();
