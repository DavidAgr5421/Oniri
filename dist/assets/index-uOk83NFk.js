(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ja="160",od=0,go=1,ld=2,oc=1,cd=2,Jn=3,xi=0,pn=1,In=2,gi=0,ur=1,vo=2,_o=3,xo=4,dd=5,Pi=100,ud=101,pd=102,yo=103,bo=104,fd=200,hd=201,md=202,gd=203,ka=204,Oa=205,vd=206,_d=207,xd=208,yd=209,bd=210,Md=211,Sd=212,Ed=213,Td=214,wd=0,Cd=1,Ad=2,Fs=3,Ld=4,Rd=5,Pd=6,Dd=7,lc=0,Id=1,Nd=2,vi=0,Fd=1,Ud=2,kd=3,Od=4,Bd=5,zd=6,cc=300,fr=301,hr=302,Ba=303,za=304,Gs=306,Ha=1e3,Nn=1001,Ga=1002,on=1003,Mo=1004,na=1005,dn=1006,Hd=1007,Fr=1008,_i=1009,Gd=1010,Vd=1011,Za=1012,dc=1013,fi=1014,hi=1015,Ur=1016,uc=1017,pc=1018,Fi=1020,Wd=1021,Fn=1023,Xd=1024,$d=1025,Ui=1026,mr=1027,qd=1028,fc=1029,Yd=1030,hc=1031,mc=1033,ia=33776,ra=33777,sa=33778,aa=33779,So=35840,Eo=35841,To=35842,wo=35843,gc=36196,Co=37492,Ao=37496,Lo=37808,Ro=37809,Po=37810,Do=37811,Io=37812,No=37813,Fo=37814,Uo=37815,ko=37816,Oo=37817,Bo=37818,zo=37819,Ho=37820,Go=37821,oa=36492,Vo=36494,Wo=36495,Kd=36283,Xo=36284,$o=36285,qo=36286,vc=3e3,ki=3001,jd=3200,Zd=3201,Jd=0,Qd=1,Mn="",Kt="srgb",ti="srgb-linear",Ja="display-p3",Vs="display-p3-linear",Us="linear",wt="srgb",ks="rec709",Os="p3",$i=7680,Yo=519,eu=512,tu=513,nu=514,_c=515,iu=516,ru=517,su=518,au=519,Ko=35044,jo="300 es",Va=1035,ei=2e3,Bs=2001;class _r{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],la=Math.PI/180,Wa=180/Math.PI;function Br(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function un(n,e,t){return Math.max(e,Math.min(t,n))}function ou(n,e){return(n%e+e)%e}function ca(n,e,t){return(1-t)*n+t*e}function Zo(n){return(n&n-1)===0&&n!==0}function Xa(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Tr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class xt{constructor(e=0,t=0){xt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(un(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,i,r,s,o,a,c,l){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],d=i[4],f=i[7],g=i[2],x=i[5],M=i[8],E=r[0],h=r[3],p=r[6],T=r[1],u=r[4],m=r[7],S=r[2],y=r[5],v=r[8];return s[0]=o*E+a*T+c*S,s[3]=o*h+a*u+c*y,s[6]=o*p+a*m+c*v,s[1]=l*E+d*T+f*S,s[4]=l*h+d*u+f*y,s[7]=l*p+d*m+f*v,s[2]=g*E+x*T+M*S,s[5]=g*h+x*u+M*y,s[8]=g*p+x*m+M*v,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8];return t*o*d-t*a*l-i*s*d+i*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],f=d*o-a*l,g=a*c-d*s,x=l*s-o*c,M=t*f+i*g+r*x;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=f*E,e[1]=(r*l-d*i)*E,e[2]=(a*i-r*o)*E,e[3]=g*E,e[4]=(d*t-r*c)*E,e[5]=(r*s-a*t)*E,e[6]=x*E,e[7]=(i*c-l*t)*E,e[8]=(o*t-i*s)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(da.makeScale(e,t)),this}rotate(e){return this.premultiply(da.makeRotation(-e)),this}translate(e,t){return this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const da=new dt;function xc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function lu(){const n=zs("canvas");return n.style.display="block",n}const Jo={};function Nr(n){n in Jo||(Jo[n]=!0,console.warn(n))}const Qo=new dt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),el=new dt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),as={[ti]:{transfer:Us,primaries:ks,toReference:n=>n,fromReference:n=>n},[Kt]:{transfer:wt,primaries:ks,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Vs]:{transfer:Us,primaries:Os,toReference:n=>n.applyMatrix3(el),fromReference:n=>n.applyMatrix3(Qo)},[Ja]:{transfer:wt,primaries:Os,toReference:n=>n.convertSRGBToLinear().applyMatrix3(el),fromReference:n=>n.applyMatrix3(Qo).convertLinearToSRGB()}},cu=new Set([ti,Vs]),bt={enabled:!0,_workingColorSpace:ti,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!cu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=as[e].toReference,r=as[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return as[n].primaries},getTransfer:function(n){return n===Mn?Us:as[n].transfer}};function pr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ua(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let qi;class yc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{qi===void 0&&(qi=zs("canvas")),qi.width=e.width,qi.height=e.height;const i=qi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=pr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(pr(t[i]/255)*255):t[i]=pr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let du=0;class bc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=Br(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(pa(r[o].image)):s.push(pa(r[o]))}else s=pa(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function pa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?yc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let uu=0;class fn extends _r{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,i=Nn,r=Nn,s=dn,o=Fr,a=Fn,c=_i,l=fn.DEFAULT_ANISOTROPY,d=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Br(),this.name="",this.source=new bc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===ki?Kt:Mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ha:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case Ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ha:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case Ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Kt?ki:vc}set encoding(e){Nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ki?Kt:Mn}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=cc;fn.DEFAULT_ANISOTROPY=1;class jt{constructor(e=0,t=0,i=0,r=1){jt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],f=c[8],g=c[1],x=c[5],M=c[9],E=c[2],h=c[6],p=c[10];if(Math.abs(d-g)<.01&&Math.abs(f-E)<.01&&Math.abs(M-h)<.01){if(Math.abs(d+g)<.1&&Math.abs(f+E)<.1&&Math.abs(M+h)<.1&&Math.abs(l+x+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const u=(l+1)/2,m=(x+1)/2,S=(p+1)/2,y=(d+g)/4,v=(f+E)/4,w=(M+h)/4;return u>m&&u>S?u<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(u),r=y/i,s=v/i):m>S?m<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(m),i=y/r,s=w/r):S<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),i=v/s,r=w/s),this.set(i,r,s,t),this}let T=Math.sqrt((h-M)*(h-M)+(f-E)*(f-E)+(g-d)*(g-d));return Math.abs(T)<.001&&(T=1),this.x=(h-M)/T,this.y=(f-E)/T,this.z=(g-d)/T,this.w=Math.acos((l+x+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pu extends _r{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new jt(0,0,e,t),this.scissorTest=!1,this.viewport=new jt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Nr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ki?Kt:Mn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new fn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new bc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends pu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Mc extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fu extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],d=i[r+2],f=i[r+3];const g=s[o+0],x=s[o+1],M=s[o+2],E=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=f;return}if(a===1){e[t+0]=g,e[t+1]=x,e[t+2]=M,e[t+3]=E;return}if(f!==E||c!==g||l!==x||d!==M){let h=1-a;const p=c*g+l*x+d*M+f*E,T=p>=0?1:-1,u=1-p*p;if(u>Number.EPSILON){const S=Math.sqrt(u),y=Math.atan2(S,p*T);h=Math.sin(h*y)/S,a=Math.sin(a*y)/S}const m=a*T;if(c=c*h+g*m,l=l*h+x*m,d=d*h+M*m,f=f*h+E*m,h===1-a){const S=1/Math.sqrt(c*c+l*l+d*d+f*f);c*=S,l*=S,d*=S,f*=S}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],d=i[r+3],f=s[o],g=s[o+1],x=s[o+2],M=s[o+3];return e[t]=a*M+d*f+c*x-l*g,e[t+1]=c*M+d*g+l*f-a*x,e[t+2]=l*M+d*x+a*g-c*f,e[t+3]=d*M-a*f-c*g-l*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),d=a(r/2),f=a(s/2),g=c(i/2),x=c(r/2),M=c(s/2);switch(o){case"XYZ":this._x=g*d*f+l*x*M,this._y=l*x*f-g*d*M,this._z=l*d*M+g*x*f,this._w=l*d*f-g*x*M;break;case"YXZ":this._x=g*d*f+l*x*M,this._y=l*x*f-g*d*M,this._z=l*d*M-g*x*f,this._w=l*d*f+g*x*M;break;case"ZXY":this._x=g*d*f-l*x*M,this._y=l*x*f+g*d*M,this._z=l*d*M+g*x*f,this._w=l*d*f-g*x*M;break;case"ZYX":this._x=g*d*f-l*x*M,this._y=l*x*f+g*d*M,this._z=l*d*M-g*x*f,this._w=l*d*f+g*x*M;break;case"YZX":this._x=g*d*f+l*x*M,this._y=l*x*f+g*d*M,this._z=l*d*M-g*x*f,this._w=l*d*f-g*x*M;break;case"XZY":this._x=g*d*f-l*x*M,this._y=l*x*f-g*d*M,this._z=l*d*M+g*x*f,this._w=l*d*f+g*x*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],d=t[6],f=t[10],g=i+a+f;if(g>0){const x=.5/Math.sqrt(g+1);this._w=.25/x,this._x=(d-c)*x,this._y=(s-l)*x,this._z=(o-r)*x}else if(i>a&&i>f){const x=2*Math.sqrt(1+i-a-f);this._w=(d-c)/x,this._x=.25*x,this._y=(r+o)/x,this._z=(s+l)/x}else if(a>f){const x=2*Math.sqrt(1+a-i-f);this._w=(s-l)/x,this._x=(r+o)/x,this._y=.25*x,this._z=(c+d)/x}else{const x=2*Math.sqrt(1+f-i-a);this._w=(o-r)/x,this._x=(s+l)/x,this._y=(c+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(un(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+o*a+r*l-s*c,this._y=r*d+o*c+s*a-i*l,this._z=s*d+o*l+i*c-r*a,this._w=o*d-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const x=1-t;return this._w=x*o+t*this._w,this._x=x*i+t*this._x,this._y=x*r+t*this._y,this._z=x*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,a),f=Math.sin((1-t)*d)/l,g=Math.sin(t*d)/l;return this._w=o*f+this._w*g,this._x=i*f+this._x*g,this._y=r*f+this._y*g,this._z=s*f+this._z*g,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class re{constructor(e=0,t=0,i=0){re.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),d=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+c*l+o*f-a*d,this.y=i+c*d+a*l-s*f,this.z=r+c*f+s*d-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fa.copy(this).projectOnVector(e),this.sub(fa)}reflect(e){return this.sub(fa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(un(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fa=new re,tl=new zr;class Hr{constructor(e=new re(1/0,1/0,1/0),t=new re(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Cn):Cn.fromBufferAttribute(s,o),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),os.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),os.copy(i.boundingBox)),os.applyMatrix4(e.matrixWorld),this.union(os)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),ls.subVectors(this.max,wr),Yi.subVectors(e.a,wr),Ki.subVectors(e.b,wr),ji.subVectors(e.c,wr),oi.subVectors(Ki,Yi),li.subVectors(ji,Ki),Ei.subVectors(Yi,ji);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Ei.z,Ei.y,oi.z,0,-oi.x,li.z,0,-li.x,Ei.z,0,-Ei.x,-oi.y,oi.x,0,-li.y,li.x,0,-Ei.y,Ei.x,0];return!ha(t,Yi,Ki,ji,ls)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,Yi,Ki,ji,ls))?!1:(cs.crossVectors(oi,li),t=[cs.x,cs.y,cs.z],ha(t,Yi,Ki,ji,ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const qn=[new re,new re,new re,new re,new re,new re,new re,new re],Cn=new re,os=new Hr,Yi=new re,Ki=new re,ji=new re,oi=new re,li=new re,Ei=new re,wr=new re,ls=new re,cs=new re,Ti=new re;function ha(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ti.fromArray(n,s);const a=r.x*Math.abs(Ti.x)+r.y*Math.abs(Ti.y)+r.z*Math.abs(Ti.z),c=e.dot(Ti),l=t.dot(Ti),d=i.dot(Ti);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const hu=new Hr,Cr=new re,ma=new re;class Qa{constructor(e=new re,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):hu.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cr.subVectors(e,this.center);const t=Cr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Cr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cr.copy(e.center).add(ma)),this.expandByPoint(Cr.copy(e.center).sub(ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Yn=new re,ga=new re,ds=new re,ci=new re,va=new re,us=new re,_a=new re;class Sc{constructor(e=new re,t=new re(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ga.copy(e).add(t).multiplyScalar(.5),ds.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(ga);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ds),a=ci.dot(this.direction),c=-ci.dot(ds),l=ci.lengthSq(),d=Math.abs(1-o*o);let f,g,x,M;if(d>0)if(f=o*c-a,g=o*a-c,M=s*d,f>=0)if(g>=-M)if(g<=M){const E=1/d;f*=E,g*=E,x=f*(f+o*g+2*a)+g*(o*f+g+2*c)+l}else g=s,f=Math.max(0,-(o*g+a)),x=-f*f+g*(g+2*c)+l;else g=-s,f=Math.max(0,-(o*g+a)),x=-f*f+g*(g+2*c)+l;else g<=-M?(f=Math.max(0,-(-o*s+a)),g=f>0?-s:Math.min(Math.max(-s,-c),s),x=-f*f+g*(g+2*c)+l):g<=M?(f=0,g=Math.min(Math.max(-s,-c),s),x=g*(g+2*c)+l):(f=Math.max(0,-(o*s+a)),g=f>0?s:Math.min(Math.max(-s,-c),s),x=-f*f+g*(g+2*c)+l);else g=o>0?-s:s,f=Math.max(0,-(o*g+a)),x=-f*f+g*(g+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ga).addScaledVector(ds,g),x}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);const i=Yn.dot(this.direction),r=Yn.dot(Yn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,g=this.origin;return l>=0?(i=(e.min.x-g.x)*l,r=(e.max.x-g.x)*l):(i=(e.max.x-g.x)*l,r=(e.min.x-g.x)*l),d>=0?(s=(e.min.y-g.y)*d,o=(e.max.y-g.y)*d):(s=(e.max.y-g.y)*d,o=(e.min.y-g.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-g.z)*f,c=(e.max.z-g.z)*f):(a=(e.max.z-g.z)*f,c=(e.min.z-g.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,i,r,s){va.subVectors(t,e),us.subVectors(i,e),_a.crossVectors(va,us);let o=this.direction.dot(_a),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,e);const c=a*this.direction.dot(us.crossVectors(ci,us));if(c<0)return null;const l=a*this.direction.dot(va.cross(ci));if(l<0||c+l>o)return null;const d=-a*ci.dot(_a);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(e,t,i,r,s,o,a,c,l,d,f,g,x,M,E,h){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,d,f,g,x,M,E,h)}set(e,t,i,r,s,o,a,c,l,d,f,g,x,M,E,h){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=d,p[10]=f,p[14]=g,p[3]=x,p[7]=M,p[11]=E,p[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Zi.setFromMatrixColumn(e,0).length(),s=1/Zi.setFromMatrixColumn(e,1).length(),o=1/Zi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const g=o*d,x=o*f,M=a*d,E=a*f;t[0]=c*d,t[4]=-c*f,t[8]=l,t[1]=x+M*l,t[5]=g-E*l,t[9]=-a*c,t[2]=E-g*l,t[6]=M+x*l,t[10]=o*c}else if(e.order==="YXZ"){const g=c*d,x=c*f,M=l*d,E=l*f;t[0]=g+E*a,t[4]=M*a-x,t[8]=o*l,t[1]=o*f,t[5]=o*d,t[9]=-a,t[2]=x*a-M,t[6]=E+g*a,t[10]=o*c}else if(e.order==="ZXY"){const g=c*d,x=c*f,M=l*d,E=l*f;t[0]=g-E*a,t[4]=-o*f,t[8]=M+x*a,t[1]=x+M*a,t[5]=o*d,t[9]=E-g*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const g=o*d,x=o*f,M=a*d,E=a*f;t[0]=c*d,t[4]=M*l-x,t[8]=g*l+E,t[1]=c*f,t[5]=E*l+g,t[9]=x*l-M,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const g=o*c,x=o*l,M=a*c,E=a*l;t[0]=c*d,t[4]=E-g*f,t[8]=M*f+x,t[1]=f,t[5]=o*d,t[9]=-a*d,t[2]=-l*d,t[6]=x*f+M,t[10]=g-E*f}else if(e.order==="XZY"){const g=o*c,x=o*l,M=a*c,E=a*l;t[0]=c*d,t[4]=-f,t[8]=l*d,t[1]=g*f+E,t[5]=o*d,t[9]=x*f-M,t[2]=M*f-x,t[6]=a*d,t[10]=E*f+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mu,e,gu)}lookAt(e,t,i){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),di.crossVectors(i,hn),di.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),di.crossVectors(i,hn)),di.normalize(),ps.crossVectors(hn,di),r[0]=di.x,r[4]=ps.x,r[8]=hn.x,r[1]=di.y,r[5]=ps.y,r[9]=hn.y,r[2]=di.z,r[6]=ps.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],d=i[1],f=i[5],g=i[9],x=i[13],M=i[2],E=i[6],h=i[10],p=i[14],T=i[3],u=i[7],m=i[11],S=i[15],y=r[0],v=r[4],w=r[8],_=r[12],b=r[1],C=r[5],R=r[9],H=r[13],P=r[2],U=r[6],N=r[10],I=r[14],q=r[3],B=r[7],V=r[11],K=r[15];return s[0]=o*y+a*b+c*P+l*q,s[4]=o*v+a*C+c*U+l*B,s[8]=o*w+a*R+c*N+l*V,s[12]=o*_+a*H+c*I+l*K,s[1]=d*y+f*b+g*P+x*q,s[5]=d*v+f*C+g*U+x*B,s[9]=d*w+f*R+g*N+x*V,s[13]=d*_+f*H+g*I+x*K,s[2]=M*y+E*b+h*P+p*q,s[6]=M*v+E*C+h*U+p*B,s[10]=M*w+E*R+h*N+p*V,s[14]=M*_+E*H+h*I+p*K,s[3]=T*y+u*b+m*P+S*q,s[7]=T*v+u*C+m*U+S*B,s[11]=T*w+u*R+m*N+S*V,s[15]=T*_+u*H+m*I+S*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],d=e[2],f=e[6],g=e[10],x=e[14],M=e[3],E=e[7],h=e[11],p=e[15];return M*(+s*c*f-r*l*f-s*a*g+i*l*g+r*a*x-i*c*x)+E*(+t*c*x-t*l*g+s*o*g-r*o*x+r*l*d-s*c*d)+h*(+t*l*f-t*a*x-s*o*f+i*o*x+s*a*d-i*l*d)+p*(-r*a*d-t*c*f+t*a*g+r*o*f-i*o*g+i*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],f=e[9],g=e[10],x=e[11],M=e[12],E=e[13],h=e[14],p=e[15],T=f*h*l-E*g*l+E*c*x-a*h*x-f*c*p+a*g*p,u=M*g*l-d*h*l-M*c*x+o*h*x+d*c*p-o*g*p,m=d*E*l-M*f*l+M*a*x-o*E*x-d*a*p+o*f*p,S=M*f*c-d*E*c-M*a*g+o*E*g+d*a*h-o*f*h,y=t*T+i*u+r*m+s*S;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const v=1/y;return e[0]=T*v,e[1]=(E*g*s-f*h*s-E*r*x+i*h*x+f*r*p-i*g*p)*v,e[2]=(a*h*s-E*c*s+E*r*l-i*h*l-a*r*p+i*c*p)*v,e[3]=(f*c*s-a*g*s-f*r*l+i*g*l+a*r*x-i*c*x)*v,e[4]=u*v,e[5]=(d*h*s-M*g*s+M*r*x-t*h*x-d*r*p+t*g*p)*v,e[6]=(M*c*s-o*h*s-M*r*l+t*h*l+o*r*p-t*c*p)*v,e[7]=(o*g*s-d*c*s+d*r*l-t*g*l-o*r*x+t*c*x)*v,e[8]=m*v,e[9]=(M*f*s-d*E*s-M*i*x+t*E*x+d*i*p-t*f*p)*v,e[10]=(o*E*s-M*a*s+M*i*l-t*E*l-o*i*p+t*a*p)*v,e[11]=(d*a*s-o*f*s-d*i*l+t*f*l+o*i*x-t*a*x)*v,e[12]=S*v,e[13]=(d*E*r-M*f*r+M*i*g-t*E*g-d*i*h+t*f*h)*v,e[14]=(M*a*r-o*E*r-M*i*c+t*E*c+o*i*h-t*a*h)*v,e[15]=(o*f*r-d*a*r+d*i*c-t*f*c-o*i*g+t*a*g)*v,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,d=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,d*a+i,d*c-r*o,0,l*c-r*a,d*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,d=o+o,f=a+a,g=s*l,x=s*d,M=s*f,E=o*d,h=o*f,p=a*f,T=c*l,u=c*d,m=c*f,S=i.x,y=i.y,v=i.z;return r[0]=(1-(E+p))*S,r[1]=(x+m)*S,r[2]=(M-u)*S,r[3]=0,r[4]=(x-m)*y,r[5]=(1-(g+p))*y,r[6]=(h+T)*y,r[7]=0,r[8]=(M+u)*v,r[9]=(h-T)*v,r[10]=(1-(g+E))*v,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Zi.set(r[0],r[1],r[2]).length();const o=Zi.set(r[4],r[5],r[6]).length(),a=Zi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],An.copy(this);const l=1/s,d=1/o,f=1/a;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=d,An.elements[5]*=d,An.elements[6]*=d,An.elements[8]*=f,An.elements[9]*=f,An.elements[10]*=f,t.setFromRotationMatrix(An),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=ei){const c=this.elements,l=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),g=(i+r)/(i-r);let x,M;if(a===ei)x=-(o+s)/(o-s),M=-2*o*s/(o-s);else if(a===Bs)x=-o/(o-s),M=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ei){const c=this.elements,l=1/(t-e),d=1/(i-r),f=1/(o-s),g=(t+e)*l,x=(i+r)*d;let M,E;if(a===ei)M=(o+s)*f,E=-2*f;else if(a===Bs)M=s*f,E=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-g,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-x,c[2]=0,c[6]=0,c[10]=E,c[14]=-M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Zi=new re,An=new Zt,mu=new re(0,0,0),gu=new re(1,1,1),di=new re,ps=new re,hn=new re,nl=new Zt,il=new zr;class Ws{constructor(e=0,t=0,i=0,r=Ws.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],d=r[9],f=r[2],g=r[6],x=r[10];switch(t){case"XYZ":this._y=Math.asin(un(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(g,l),this._z=0);break;case"YXZ":this._x=Math.asin(-un(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,x),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(un(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-f,x),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-un(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,x),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(un(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,x));break;case"XZY":this._z=Math.asin(-un(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(g,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return nl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return il.setFromEuler(this),this.setFromQuaternion(il,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ws.DEFAULT_ORDER="XYZ";class eo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vu=0;const rl=new re,Ji=new zr,Kn=new Zt,fs=new re,Ar=new re,_u=new re,xu=new zr,sl=new re(1,0,0),al=new re(0,1,0),ol=new re(0,0,1),yu={type:"added"},bu={type:"removed"};class gn extends _r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=Br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new re,t=new Ws,i=new zr,r=new re(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Zt},normalMatrix:{value:new dt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(sl,e)}rotateY(e){return this.rotateOnAxis(al,e)}rotateZ(e){return this.rotateOnAxis(ol,e)}translateOnAxis(e,t){return rl.copy(e).applyQuaternion(this.quaternion),this.position.add(rl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sl,e)}translateY(e){return this.translateOnAxis(al,e)}translateZ(e){return this.translateOnAxis(ol,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fs.copy(e):fs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Ar,fs,this.up):Kn.lookAt(fs,Ar,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),Ji.setFromRotationMatrix(Kn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(yu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,_u),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,xu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),d=o(e.images),f=o(e.shapes),g=o(e.skeletons),x=o(e.animations),M=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),g.length>0&&(i.skeletons=g),x.length>0&&(i.animations=x),M.length>0&&(i.nodes=M)}return i.object=r,i;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}gn.DEFAULT_UP=new re(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ln=new re,jn=new re,xa=new re,Zn=new re,Qi=new re,er=new re,ll=new re,ya=new re,ba=new re,Ma=new re;let hs=!1;class Pn{constructor(e=new re,t=new re,i=new re){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ln.subVectors(e,t),r.cross(Ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ln.subVectors(r,t),jn.subVectors(i,t),xa.subVectors(e,t);const o=Ln.dot(Ln),a=Ln.dot(jn),c=Ln.dot(xa),l=jn.dot(jn),d=jn.dot(xa),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const g=1/f,x=(l*c-a*d)*g,M=(o*d-a*c)*g;return s.set(1-x-M,M,x)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getUV(e,t,i,r,s,o,a,c){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),this.getInterpolation(e,t,i,r,s,o,a,c)}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static isFrontFacing(e,t,i,r){return Ln.subVectors(i,t),jn.subVectors(e,t),Ln.cross(jn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Ln.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),Pn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return Pn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Qi.subVectors(r,i),er.subVectors(s,i),ya.subVectors(e,i);const c=Qi.dot(ya),l=er.dot(ya);if(c<=0&&l<=0)return t.copy(i);ba.subVectors(e,r);const d=Qi.dot(ba),f=er.dot(ba);if(d>=0&&f<=d)return t.copy(r);const g=c*f-d*l;if(g<=0&&c>=0&&d<=0)return o=c/(c-d),t.copy(i).addScaledVector(Qi,o);Ma.subVectors(e,s);const x=Qi.dot(Ma),M=er.dot(Ma);if(M>=0&&x<=M)return t.copy(s);const E=x*l-c*M;if(E<=0&&l>=0&&M<=0)return a=l/(l-M),t.copy(i).addScaledVector(er,a);const h=d*M-x*f;if(h<=0&&f-d>=0&&x-M>=0)return ll.subVectors(s,r),a=(f-d)/(f-d+(x-M)),t.copy(r).addScaledVector(ll,a);const p=1/(h+E+g);return o=E*p,a=g*p,t.copy(i).addScaledVector(Qi,o).addScaledVector(er,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ec={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},ms={h:0,s:0,l:0};function Sa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Mt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=bt.workingColorSpace){return this.r=e,this.g=t,this.b=i,bt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=bt.workingColorSpace){if(e=ou(e,1),t=un(t,0,1),i=un(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Sa(o,s,e+1/3),this.g=Sa(o,s,e),this.b=Sa(o,s,e-1/3)}return bt.toWorkingColorSpace(this,r),this}setStyle(e,t=Kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const i=Ec[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}copyLinearToSRGB(e){return this.r=ua(e.r),this.g=ua(e.g),this.b=ua(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return bt.fromWorkingColorSpace(tn.copy(this),e),Math.round(un(tn.r*255,0,255))*65536+Math.round(un(tn.g*255,0,255))*256+Math.round(un(tn.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.fromWorkingColorSpace(tn.copy(this),t);const i=tn.r,r=tn.g,s=tn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=d<=.5?f/(o+a):f/(2-o-a),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=bt.workingColorSpace){return bt.fromWorkingColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=Kt){bt.fromWorkingColorSpace(tn.copy(this),e);const t=tn.r,i=tn.g,r=tn.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(ms);const i=ca(ui.h,ms.h,t),r=ca(ui.s,ms.s,t),s=ca(ui.l,ms.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new Mt;Mt.NAMES=Ec;let Mu=0;class Xs extends _r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Br(),this.name="",this.type="Material",this.blending=ur,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ka,this.blendDst=Oa,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ka&&(i.blendSrc=this.blendSrc),this.blendDst!==Oa&&(i.blendDst=this.blendDst),this.blendEquation!==Pi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $s extends Xs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ot=new re,gs=new xt;class Gn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ko,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)gs.fromBufferAttribute(this,t),gs.applyMatrix3(e),this.setXY(t,gs.x,gs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Tr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array),s=cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ko&&(e.usage=this.usage),e}}class Tc extends Gn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class wc extends Gn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Oi extends Gn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Su=0;const xn=new Zt,Ea=new gn,tr=new re,mn=new Hr,Lr=new Hr,Wt=new re;class Hi extends _r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Br(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xc(e)?wc:Tc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new dt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,i){return xn.makeTranslation(e,t,i),this.applyMatrix4(xn),this}scale(e,t,i){return xn.makeScale(e,t,i),this.applyMatrix4(xn),this}lookAt(e){return Ea.lookAt(e),Ea.updateMatrix(),this.applyMatrix4(Ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Oi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new re(-1/0,-1/0,-1/0),new re(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new re,1/0);return}if(e){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Lr.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(mn.min,Lr.min),mn.expandByPoint(Wt),Wt.addVectors(mn.max,Lr.max),mn.expandByPoint(Wt)):(mn.expandByPoint(Lr.min),mn.expandByPoint(Lr.max))}mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Wt.fromBufferAttribute(a,l),c&&(tr.fromBufferAttribute(e,l),Wt.add(tr)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gn(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],d=[];for(let b=0;b<a;b++)l[b]=new re,d[b]=new re;const f=new re,g=new re,x=new re,M=new xt,E=new xt,h=new xt,p=new re,T=new re;function u(b,C,R){f.fromArray(r,b*3),g.fromArray(r,C*3),x.fromArray(r,R*3),M.fromArray(o,b*2),E.fromArray(o,C*2),h.fromArray(o,R*2),g.sub(f),x.sub(f),E.sub(M),h.sub(M);const H=1/(E.x*h.y-h.x*E.y);isFinite(H)&&(p.copy(g).multiplyScalar(h.y).addScaledVector(x,-E.y).multiplyScalar(H),T.copy(x).multiplyScalar(E.x).addScaledVector(g,-h.x).multiplyScalar(H),l[b].add(p),l[C].add(p),l[R].add(p),d[b].add(T),d[C].add(T),d[R].add(T))}let m=this.groups;m.length===0&&(m=[{start:0,count:i.length}]);for(let b=0,C=m.length;b<C;++b){const R=m[b],H=R.start,P=R.count;for(let U=H,N=H+P;U<N;U+=3)u(i[U+0],i[U+1],i[U+2])}const S=new re,y=new re,v=new re,w=new re;function _(b){v.fromArray(s,b*3),w.copy(v);const C=l[b];S.copy(C),S.sub(v.multiplyScalar(v.dot(C))).normalize(),y.crossVectors(w,C);const H=y.dot(d[b])<0?-1:1;c[b*4]=S.x,c[b*4+1]=S.y,c[b*4+2]=S.z,c[b*4+3]=H}for(let b=0,C=m.length;b<C;++b){const R=m[b],H=R.start,P=R.count;for(let U=H,N=H+P;U<N;U+=3)_(i[U+0]),_(i[U+1]),_(i[U+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Gn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let g=0,x=i.count;g<x;g++)i.setXYZ(g,0,0,0);const r=new re,s=new re,o=new re,a=new re,c=new re,l=new re,d=new re,f=new re;if(e)for(let g=0,x=e.count;g<x;g+=3){const M=e.getX(g+0),E=e.getX(g+1),h=e.getX(g+2);r.fromBufferAttribute(t,M),s.fromBufferAttribute(t,E),o.fromBufferAttribute(t,h),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),a.fromBufferAttribute(i,M),c.fromBufferAttribute(i,E),l.fromBufferAttribute(i,h),a.add(d),c.add(d),l.add(d),i.setXYZ(M,a.x,a.y,a.z),i.setXYZ(E,c.x,c.y,c.z),i.setXYZ(h,l.x,l.y,l.z)}else for(let g=0,x=t.count;g<x;g+=3)r.fromBufferAttribute(t,g+0),s.fromBufferAttribute(t,g+1),o.fromBufferAttribute(t,g+2),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),i.setXYZ(g+0,d.x,d.y,d.z),i.setXYZ(g+1,d.x,d.y,d.z),i.setXYZ(g+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){const l=a.array,d=a.itemSize,f=a.normalized,g=new l.constructor(c.length*d);let x=0,M=0;for(let E=0,h=c.length;E<h;E++){a.isInterleavedBufferAttribute?x=c[E]*a.data.stride+a.offset:x=c[E]*d;for(let p=0;p<d;p++)g[M++]=l[x++]}return new Gn(g,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Hi,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let d=0,f=l.length;d<f;d++){const g=l[d],x=e(g,i);c.push(x)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let f=0,g=l.length;f<g;f++){const x=l[f];d.push(x.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],f=s[l];for(let g=0,x=f.length;g<x;g++)d.push(f[g].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,d=o.length;l<d;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cl=new Zt,wi=new Sc,vs=new Qa,dl=new re,nr=new re,ir=new re,rr=new re,Ta=new re,_s=new re,xs=new xt,ys=new xt,bs=new xt,ul=new re,pl=new re,fl=new re,Ms=new re,Ss=new re;class Hn extends gn{constructor(e=new Hi,t=new $s){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){_s.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=a[c],f=s[c];d!==0&&(Ta.fromBufferAttribute(f,e),o?_s.addScaledVector(Ta,d):_s.addScaledVector(Ta.sub(t),d))}t.add(_s)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere),vs.applyMatrix4(s),wi.copy(e.ray).recast(e.near),!(vs.containsPoint(wi.origin)===!1&&(wi.intersectSphere(vs,dl)===null||wi.origin.distanceToSquared(dl)>(e.far-e.near)**2))&&(cl.copy(s).invert(),wi.copy(e.ray).applyMatrix4(cl),!(i.boundingBox!==null&&wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,g=s.groups,x=s.drawRange;if(a!==null)if(Array.isArray(o))for(let M=0,E=g.length;M<E;M++){const h=g[M],p=o[h.materialIndex],T=Math.max(h.start,x.start),u=Math.min(a.count,Math.min(h.start+h.count,x.start+x.count));for(let m=T,S=u;m<S;m+=3){const y=a.getX(m),v=a.getX(m+1),w=a.getX(m+2);r=Es(this,p,e,i,l,d,f,y,v,w),r&&(r.faceIndex=Math.floor(m/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),E=Math.min(a.count,x.start+x.count);for(let h=M,p=E;h<p;h+=3){const T=a.getX(h),u=a.getX(h+1),m=a.getX(h+2);r=Es(this,o,e,i,l,d,f,T,u,m),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let M=0,E=g.length;M<E;M++){const h=g[M],p=o[h.materialIndex],T=Math.max(h.start,x.start),u=Math.min(c.count,Math.min(h.start+h.count,x.start+x.count));for(let m=T,S=u;m<S;m+=3){const y=m,v=m+1,w=m+2;r=Es(this,p,e,i,l,d,f,y,v,w),r&&(r.faceIndex=Math.floor(m/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),E=Math.min(c.count,x.start+x.count);for(let h=M,p=E;h<p;h+=3){const T=h,u=h+1,m=h+2;r=Es(this,o,e,i,l,d,f,T,u,m),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}}}function Eu(n,e,t,i,r,s,o,a){let c;if(e.side===pn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===xi,a),c===null)return null;Ss.copy(a),Ss.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ss);return l<t.near||l>t.far?null:{distance:l,point:Ss.clone(),object:n}}function Es(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,nr),n.getVertexPosition(c,ir),n.getVertexPosition(l,rr);const d=Eu(n,e,t,i,nr,ir,rr,Ms);if(d){r&&(xs.fromBufferAttribute(r,a),ys.fromBufferAttribute(r,c),bs.fromBufferAttribute(r,l),d.uv=Pn.getInterpolation(Ms,nr,ir,rr,xs,ys,bs,new xt)),s&&(xs.fromBufferAttribute(s,a),ys.fromBufferAttribute(s,c),bs.fromBufferAttribute(s,l),d.uv1=Pn.getInterpolation(Ms,nr,ir,rr,xs,ys,bs,new xt),d.uv2=d.uv1),o&&(ul.fromBufferAttribute(o,a),pl.fromBufferAttribute(o,c),fl.fromBufferAttribute(o,l),d.normal=Pn.getInterpolation(Ms,nr,ir,rr,ul,pl,fl,new re),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new re,materialIndex:0};Pn.getNormal(nr,ir,rr,f.normal),d.face=f}return d}class Gr extends Hi{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],d=[],f=[];let g=0,x=0;M("z","y","x",-1,-1,i,t,e,o,s,0),M("z","y","x",1,-1,i,t,-e,o,s,1),M("x","z","y",1,1,e,i,t,r,o,2),M("x","z","y",1,-1,e,i,-t,r,o,3),M("x","y","z",1,-1,e,t,i,r,s,4),M("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Oi(l,3)),this.setAttribute("normal",new Oi(d,3)),this.setAttribute("uv",new Oi(f,2));function M(E,h,p,T,u,m,S,y,v,w,_){const b=m/v,C=S/w,R=m/2,H=S/2,P=y/2,U=v+1,N=w+1;let I=0,q=0;const B=new re;for(let V=0;V<N;V++){const K=V*C-H;for(let k=0;k<U;k++){const G=k*b-R;B[E]=G*T,B[h]=K*u,B[p]=P,l.push(B.x,B.y,B.z),B[E]=0,B[h]=0,B[p]=y>0?1:-1,d.push(B.x,B.y,B.z),f.push(k/v),f.push(1-V/w),I+=1}}for(let V=0;V<w;V++)for(let K=0;K<v;K++){const k=g+K+U*V,G=g+K+U*(V+1),F=g+(K+1)+U*(V+1),X=g+(K+1)+U*V;c.push(k,G,X),c.push(G,F,X),q+=6}a.addGroup(x,q,_),x+=q,g+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function gr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function an(n){const e={};for(let t=0;t<n.length;t++){const i=gr(n[t]);for(const r in i)e[r]=i[r]}return e}function Tu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Cc(n){return n.getRenderTarget()===null?n.outputColorSpace:bt.workingColorSpace}const wu={clone:gr,merge:an};var Cu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends Xs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cu,this.fragmentShader=Au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gr(e.uniforms),this.uniformsGroups=Tu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ac extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Dn extends Ac{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(la*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wa*2*Math.atan(Math.tan(la*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(la*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const sr=-90,ar=1;class Lu extends gn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Dn(sr,ar,e,t);r.layers=this.layers,this.add(r);const s=new Dn(sr,ar,e,t);s.layers=this.layers,this.add(s);const o=new Dn(sr,ar,e,t);o.layers=this.layers,this.add(o);const a=new Dn(sr,ar,e,t);a.layers=this.layers,this.add(a);const c=new Dn(sr,ar,e,t);c.layers=this.layers,this.add(c);const l=new Dn(sr,ar,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===ei)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,d]=this.children,f=e.getRenderTarget(),g=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),e.render(t,d),e.setRenderTarget(f,g,x),e.xr.enabled=M,i.texture.needsPMREMUpdate=!0}}class Lc extends fn{constructor(e,t,i,r,s,o,a,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:fr,super(e,t,i,r,s,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ru extends Bi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Nr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ki?Kt:Mn),this.texture=new Lc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Gr(5,5,5),s=new zi({name:"CubemapFromEquirect",uniforms:gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:gi});s.uniforms.tEquirect.value=t;const o=new Hn(r,s),a=t.minFilter;return t.minFilter===Fr&&(t.minFilter=dn),new Lu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const wa=new re,Pu=new re,Du=new dt;class Ai{constructor(e=new re(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=wa.subVectors(i,t).cross(Pu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(wa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Du.getNormalMatrix(e),r=this.coplanarPoint(wa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new Qa,Ts=new re;class Rc{constructor(e=new Ai,t=new Ai,i=new Ai,r=new Ai,s=new Ai,o=new Ai){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ei){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],d=r[5],f=r[6],g=r[7],x=r[8],M=r[9],E=r[10],h=r[11],p=r[12],T=r[13],u=r[14],m=r[15];if(i[0].setComponents(c-s,g-l,h-x,m-p).normalize(),i[1].setComponents(c+s,g+l,h+x,m+p).normalize(),i[2].setComponents(c+o,g+d,h+M,m+T).normalize(),i[3].setComponents(c-o,g-d,h-M,m-T).normalize(),i[4].setComponents(c-a,g-f,h-E,m-u).normalize(),t===ei)i[5].setComponents(c+a,g+f,h+E,m+u).normalize();else if(t===Bs)i[5].setComponents(a,f,E,u).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){return Ci.center.set(0,0,0),Ci.radius=.7071067811865476,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ts.x=r.normal.x>0?e.max.x:e.min.x,Ts.y=r.normal.y>0?e.max.y:e.min.y,Ts.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ts)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Pc(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Iu(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,d){const f=l.array,g=l.usage,x=f.byteLength,M=n.createBuffer();n.bindBuffer(d,M),n.bufferData(d,f,g),l.onUploadCallback();let E;if(f instanceof Float32Array)E=n.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)E=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)E=n.SHORT;else if(f instanceof Uint32Array)E=n.UNSIGNED_INT;else if(f instanceof Int32Array)E=n.INT;else if(f instanceof Int8Array)E=n.BYTE;else if(f instanceof Uint8Array)E=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)E=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:M,type:E,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:x}}function s(l,d,f){const g=d.array,x=d._updateRange,M=d.updateRanges;if(n.bindBuffer(f,l),x.count===-1&&M.length===0&&n.bufferSubData(f,0,g),M.length!==0){for(let E=0,h=M.length;E<h;E++){const p=M[E];t?n.bufferSubData(f,p.start*g.BYTES_PER_ELEMENT,g,p.start,p.count):n.bufferSubData(f,p.start*g.BYTES_PER_ELEMENT,g.subarray(p.start,p.start+p.count))}d.clearUpdateRanges()}x.count!==-1&&(t?n.bufferSubData(f,x.offset*g.BYTES_PER_ELEMENT,g,x.offset,x.count):n.bufferSubData(f,x.offset*g.BYTES_PER_ELEMENT,g.subarray(x.offset,x.offset+x.count)),x.count=-1),d.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const d=i.get(l);d&&(n.deleteBuffer(d.buffer),i.delete(l))}function c(l,d){if(l.isGLBufferAttribute){const g=i.get(l);(!g||g.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);if(f===void 0)i.set(l,r(l,d));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,l,d),f.version=l.version}}return{get:o,remove:a,update:c}}class Vr extends Hi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,d=c+1,f=e/a,g=t/c,x=[],M=[],E=[],h=[];for(let p=0;p<d;p++){const T=p*g-o;for(let u=0;u<l;u++){const m=u*f-s;M.push(m,-T,0),E.push(0,0,1),h.push(u/a),h.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<a;T++){const u=T+l*p,m=T+l*(p+1),S=T+1+l*(p+1),y=T+1+l*p;x.push(u,m,y),x.push(m,S,y)}this.setIndex(x),this.setAttribute("position",new Oi(M,3)),this.setAttribute("normal",new Oi(E,3)),this.setAttribute("uv",new Oi(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Nu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fu=`#ifdef USE_ALPHAHASH
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
#endif`,Uu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ku=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ou=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zu=`#ifdef USE_AOMAP
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
#endif`,Hu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,Vu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Wu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$u=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qu=`#ifdef USE_IRIDESCENCE
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
#endif`,Yu=`#ifdef USE_BUMPMAP
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
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ep=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,ip=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,rp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sp=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,op=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dp="gl_FragColor = linearToOutputTexel( gl_FragColor );",up=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,pp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hp=`#ifdef USE_ENVMAP
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
#endif`,mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_p=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bp=`#ifdef USE_GRADIENTMAP
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
}`,Mp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Sp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ep=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wp=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
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
#endif`,Cp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,Ap=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Ip=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Np=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Up=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Op=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,zp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Hp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wp=`#if defined( USE_POINTS_UV )
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
#endif`,Xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Kp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,jp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Zp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nf=`#ifdef USE_NORMALMAP
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
#endif`,rf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,af=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,of=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,df=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ff=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,vf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_f=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,xf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bf=`#ifdef USE_SKINNING
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
#endif`,Mf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sf=`#ifdef USE_SKINNING
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
#endif`,Ef=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cf=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Af=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lf=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,If=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ff=`uniform sampler2D t2D;
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
}`,Uf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zf=`#include <common>
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
}`,Hf=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Gf=`#define DISTANCE
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
}`,Vf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qf=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yf=`#include <common>
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
}`,Kf=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,jf=`#define LAMBERT
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
}`,Zf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Jf=`#define MATCAP
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
}`,Qf=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,eh=`#define NORMAL
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
}`,th=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,nh=`#define PHONG
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
}`,ih=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,rh=`#define STANDARD
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
}`,sh=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,ah=`#define TOON
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
}`,oh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,lh=`uniform float size;
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
}`,ch=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,dh=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,uh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,ph=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,fh=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,lt={alphahash_fragment:Nu,alphahash_pars_fragment:Fu,alphamap_fragment:Uu,alphamap_pars_fragment:ku,alphatest_fragment:Ou,alphatest_pars_fragment:Bu,aomap_fragment:zu,aomap_pars_fragment:Hu,batching_pars_vertex:Gu,batching_vertex:Vu,begin_vertex:Wu,beginnormal_vertex:Xu,bsdfs:$u,iridescence_fragment:qu,bumpmap_pars_fragment:Yu,clipping_planes_fragment:Ku,clipping_planes_pars_fragment:ju,clipping_planes_pars_vertex:Zu,clipping_planes_vertex:Ju,color_fragment:Qu,color_pars_fragment:ep,color_pars_vertex:tp,color_vertex:np,common:ip,cube_uv_reflection_fragment:rp,defaultnormal_vertex:sp,displacementmap_pars_vertex:ap,displacementmap_vertex:op,emissivemap_fragment:lp,emissivemap_pars_fragment:cp,colorspace_fragment:dp,colorspace_pars_fragment:up,envmap_fragment:pp,envmap_common_pars_fragment:fp,envmap_pars_fragment:hp,envmap_pars_vertex:mp,envmap_physical_pars_fragment:Cp,envmap_vertex:gp,fog_vertex:vp,fog_pars_vertex:_p,fog_fragment:xp,fog_pars_fragment:yp,gradientmap_pars_fragment:bp,lightmap_fragment:Mp,lightmap_pars_fragment:Sp,lights_lambert_fragment:Ep,lights_lambert_pars_fragment:Tp,lights_pars_begin:wp,lights_toon_fragment:Ap,lights_toon_pars_fragment:Lp,lights_phong_fragment:Rp,lights_phong_pars_fragment:Pp,lights_physical_fragment:Dp,lights_physical_pars_fragment:Ip,lights_fragment_begin:Np,lights_fragment_maps:Fp,lights_fragment_end:Up,logdepthbuf_fragment:kp,logdepthbuf_pars_fragment:Op,logdepthbuf_pars_vertex:Bp,logdepthbuf_vertex:zp,map_fragment:Hp,map_pars_fragment:Gp,map_particle_fragment:Vp,map_particle_pars_fragment:Wp,metalnessmap_fragment:Xp,metalnessmap_pars_fragment:$p,morphcolor_vertex:qp,morphnormal_vertex:Yp,morphtarget_pars_vertex:Kp,morphtarget_vertex:jp,normal_fragment_begin:Zp,normal_fragment_maps:Jp,normal_pars_fragment:Qp,normal_pars_vertex:ef,normal_vertex:tf,normalmap_pars_fragment:nf,clearcoat_normal_fragment_begin:rf,clearcoat_normal_fragment_maps:sf,clearcoat_pars_fragment:af,iridescence_pars_fragment:of,opaque_fragment:lf,packing:cf,premultiplied_alpha_fragment:df,project_vertex:uf,dithering_fragment:pf,dithering_pars_fragment:ff,roughnessmap_fragment:hf,roughnessmap_pars_fragment:mf,shadowmap_pars_fragment:gf,shadowmap_pars_vertex:vf,shadowmap_vertex:_f,shadowmask_pars_fragment:xf,skinbase_vertex:yf,skinning_pars_vertex:bf,skinning_vertex:Mf,skinnormal_vertex:Sf,specularmap_fragment:Ef,specularmap_pars_fragment:Tf,tonemapping_fragment:wf,tonemapping_pars_fragment:Cf,transmission_fragment:Af,transmission_pars_fragment:Lf,uv_pars_fragment:Rf,uv_pars_vertex:Pf,uv_vertex:Df,worldpos_vertex:If,background_vert:Nf,background_frag:Ff,backgroundCube_vert:Uf,backgroundCube_frag:kf,cube_vert:Of,cube_frag:Bf,depth_vert:zf,depth_frag:Hf,distanceRGBA_vert:Gf,distanceRGBA_frag:Vf,equirect_vert:Wf,equirect_frag:Xf,linedashed_vert:$f,linedashed_frag:qf,meshbasic_vert:Yf,meshbasic_frag:Kf,meshlambert_vert:jf,meshlambert_frag:Zf,meshmatcap_vert:Jf,meshmatcap_frag:Qf,meshnormal_vert:eh,meshnormal_frag:th,meshphong_vert:nh,meshphong_frag:ih,meshphysical_vert:rh,meshphysical_frag:sh,meshtoon_vert:ah,meshtoon_frag:oh,points_vert:lh,points_frag:ch,shadow_vert:dh,shadow_frag:uh,sprite_vert:ph,sprite_frag:fh},we={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},zn={basic:{uniforms:an([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:an([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Mt(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:an([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:an([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:an([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Mt(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:an([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:an([we.points,we.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:an([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:an([we.common,we.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:an([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:an([we.sprite,we.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:an([we.common,we.displacementmap,{referencePosition:{value:new re},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:an([we.lights,we.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};zn.physical={uniforms:an([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};const ws={r:0,b:0,g:0};function hh(n,e,t,i,r,s,o){const a=new Mt(0);let c=s===!0?0:1,l,d,f=null,g=0,x=null;function M(h,p){let T=!1,u=p.isScene===!0?p.background:null;u&&u.isTexture&&(u=(p.backgroundBlurriness>0?t:e).get(u)),u===null?E(a,c):u&&u.isColor&&(E(u,1),T=!0);const m=n.xr.getEnvironmentBlendMode();m==="additive"?i.buffers.color.setClear(0,0,0,1,o):m==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),u&&(u.isCubeTexture||u.mapping===Gs)?(d===void 0&&(d=new Hn(new Gr(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:gr(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(S,y,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=u,d.material.uniforms.flipEnvMap.value=u.isCubeTexture&&u.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,d.material.toneMapped=bt.getTransfer(u.colorSpace)!==wt,(f!==u||g!==u.version||x!==n.toneMapping)&&(d.material.needsUpdate=!0,f=u,g=u.version,x=n.toneMapping),d.layers.enableAll(),h.unshift(d,d.geometry,d.material,0,0,null)):u&&u.isTexture&&(l===void 0&&(l=new Hn(new Vr(2,2),new zi({name:"BackgroundMaterial",uniforms:gr(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=u,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=bt.getTransfer(u.colorSpace)!==wt,u.matrixAutoUpdate===!0&&u.updateMatrix(),l.material.uniforms.uvTransform.value.copy(u.matrix),(f!==u||g!==u.version||x!==n.toneMapping)&&(l.material.needsUpdate=!0,f=u,g=u.version,x=n.toneMapping),l.layers.enableAll(),h.unshift(l,l.geometry,l.material,0,0,null))}function E(h,p){h.getRGB(ws,Cc(n)),i.buffers.color.setClear(ws.r,ws.g,ws.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(h,p=1){a.set(h),c=p,E(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(h){c=h,E(a,c)},render:M}}function mh(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},c=h(null);let l=c,d=!1;function f(P,U,N,I,q){let B=!1;if(o){const V=E(I,N,U);l!==V&&(l=V,x(l.object)),B=p(P,I,N,q),B&&T(P,I,N,q)}else{const V=U.wireframe===!0;(l.geometry!==I.id||l.program!==N.id||l.wireframe!==V)&&(l.geometry=I.id,l.program=N.id,l.wireframe=V,B=!0)}q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(B||d)&&(d=!1,w(P,U,N,I),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function g(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function x(P){return i.isWebGL2?n.bindVertexArray(P):s.bindVertexArrayOES(P)}function M(P){return i.isWebGL2?n.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function E(P,U,N){const I=N.wireframe===!0;let q=a[P.id];q===void 0&&(q={},a[P.id]=q);let B=q[U.id];B===void 0&&(B={},q[U.id]=B);let V=B[I];return V===void 0&&(V=h(g()),B[I]=V),V}function h(P){const U=[],N=[],I=[];for(let q=0;q<r;q++)U[q]=0,N[q]=0,I[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:N,attributeDivisors:I,object:P,attributes:{},index:null}}function p(P,U,N,I){const q=l.attributes,B=U.attributes;let V=0;const K=N.getAttributes();for(const k in K)if(K[k].location>=0){const F=q[k];let X=B[k];if(X===void 0&&(k==="instanceMatrix"&&P.instanceMatrix&&(X=P.instanceMatrix),k==="instanceColor"&&P.instanceColor&&(X=P.instanceColor)),F===void 0||F.attribute!==X||X&&F.data!==X.data)return!0;V++}return l.attributesNum!==V||l.index!==I}function T(P,U,N,I){const q={},B=U.attributes;let V=0;const K=N.getAttributes();for(const k in K)if(K[k].location>=0){let F=B[k];F===void 0&&(k==="instanceMatrix"&&P.instanceMatrix&&(F=P.instanceMatrix),k==="instanceColor"&&P.instanceColor&&(F=P.instanceColor));const X={};X.attribute=F,F&&F.data&&(X.data=F.data),q[k]=X,V++}l.attributes=q,l.attributesNum=V,l.index=I}function u(){const P=l.newAttributes;for(let U=0,N=P.length;U<N;U++)P[U]=0}function m(P){S(P,0)}function S(P,U){const N=l.newAttributes,I=l.enabledAttributes,q=l.attributeDivisors;N[P]=1,I[P]===0&&(n.enableVertexAttribArray(P),I[P]=1),q[P]!==U&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,U),q[P]=U)}function y(){const P=l.newAttributes,U=l.enabledAttributes;for(let N=0,I=U.length;N<I;N++)U[N]!==P[N]&&(n.disableVertexAttribArray(N),U[N]=0)}function v(P,U,N,I,q,B,V){V===!0?n.vertexAttribIPointer(P,U,N,q,B):n.vertexAttribPointer(P,U,N,I,q,B)}function w(P,U,N,I){if(i.isWebGL2===!1&&(P.isInstancedMesh||I.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;u();const q=I.attributes,B=N.getAttributes(),V=U.defaultAttributeValues;for(const K in B){const k=B[K];if(k.location>=0){let G=q[K];if(G===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(G=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(G=P.instanceColor)),G!==void 0){const F=G.normalized,X=G.itemSize,W=t.get(G);if(W===void 0)continue;const Q=W.buffer,j=W.type,se=W.bytesPerElement,de=i.isWebGL2===!0&&(j===n.INT||j===n.UNSIGNED_INT||G.gpuType===dc);if(G.isInterleavedBufferAttribute){const ae=G.data,$=ae.stride,Ve=G.offset;if(ae.isInstancedInterleavedBuffer){for(let be=0;be<k.locationSize;be++)S(k.location+be,ae.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let be=0;be<k.locationSize;be++)m(k.location+be);n.bindBuffer(n.ARRAY_BUFFER,Q);for(let be=0;be<k.locationSize;be++)v(k.location+be,X/k.locationSize,j,F,$*se,(Ve+X/k.locationSize*be)*se,de)}else{if(G.isInstancedBufferAttribute){for(let ae=0;ae<k.locationSize;ae++)S(k.location+ae,G.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ae=0;ae<k.locationSize;ae++)m(k.location+ae);n.bindBuffer(n.ARRAY_BUFFER,Q);for(let ae=0;ae<k.locationSize;ae++)v(k.location+ae,X/k.locationSize,j,F,X*se,X/k.locationSize*ae*se,de)}}else if(V!==void 0){const F=V[K];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(k.location,F);break;case 3:n.vertexAttrib3fv(k.location,F);break;case 4:n.vertexAttrib4fv(k.location,F);break;default:n.vertexAttrib1fv(k.location,F)}}}}y()}function _(){R();for(const P in a){const U=a[P];for(const N in U){const I=U[N];for(const q in I)M(I[q].object),delete I[q];delete U[N]}delete a[P]}}function b(P){if(a[P.id]===void 0)return;const U=a[P.id];for(const N in U){const I=U[N];for(const q in I)M(I[q].object),delete I[q];delete U[N]}delete a[P.id]}function C(P){for(const U in a){const N=a[U];if(N[P.id]===void 0)continue;const I=N[P.id];for(const q in I)M(I[q].object),delete I[q];delete N[P.id]}}function R(){H(),d=!0,l!==c&&(l=c,x(l.object))}function H(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:R,resetDefaultState:H,dispose:_,releaseStatesOfGeometry:b,releaseStatesOfProgram:C,initAttributes:u,enableAttribute:m,disableUnusedAttributes:y}}function gh(n,e,t,i){const r=i.isWebGL2;let s;function o(d){s=d}function a(d,f){n.drawArrays(s,d,f),t.update(f,s,1)}function c(d,f,g){if(g===0)return;let x,M;if(r)x=n,M="drawArraysInstanced";else if(x=e.get("ANGLE_instanced_arrays"),M="drawArraysInstancedANGLE",x===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[M](s,d,f,g),t.update(f,s,g)}function l(d,f,g){if(g===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let M=0;M<g;M++)this.render(d[M],f[M]);else{x.multiDrawArraysWEBGL(s,d,0,f,0,g);let M=0;for(let E=0;E<g;E++)M+=f[E];t.update(M,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function vh(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const v=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(v){if(v==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),M=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),E=n.getParameter(n.MAX_VERTEX_ATTRIBS),h=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),u=g>0,m=o||e.has("OES_texture_float"),S=u&&m,y=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:M,maxAttributes:E,maxVertexUniforms:h,maxVaryings:p,maxFragmentUniforms:T,vertexTextures:u,floatFragmentTextures:m,floatVertexTextures:S,maxSamples:y}}function _h(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Ai,a=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,g){const x=f.length!==0||g||i!==0||r;return r=g,i=f.length,x},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,g){t=d(f,g,0)},this.setState=function(f,g,x){const M=f.clippingPlanes,E=f.clipIntersection,h=f.clipShadows,p=n.get(f);if(!r||M===null||M.length===0||s&&!h)s?d(null):l();else{const T=s?0:i,u=T*4;let m=p.clippingState||null;c.value=m,m=d(M,g,u,x);for(let S=0;S!==u;++S)m[S]=t[S];p.clippingState=m,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,g,x,M){const E=f!==null?f.length:0;let h=null;if(E!==0){if(h=c.value,M!==!0||h===null){const p=x+E*4,T=g.matrixWorldInverse;a.getNormalMatrix(T),(h===null||h.length<p)&&(h=new Float32Array(p));for(let u=0,m=x;u!==E;++u,m+=4)o.copy(f[u]).applyMatrix4(T,a),o.normal.toArray(h,m),h[m+3]=o.constant}c.value=h,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,h}}function xh(n){let e=new WeakMap;function t(o,a){return a===Ba?o.mapping=fr:a===za&&(o.mapping=hr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ba||a===za)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Ru(c.height/2);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Dc extends Ac{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const cr=4,hl=[.125,.215,.35,.446,.526,.582],Di=20,Ca=new Dc,ml=new Mt;let Aa=null,La=0,Ra=0;const Li=(1+Math.sqrt(5))/2,or=1/Li,gl=[new re(1,1,1),new re(-1,1,1),new re(1,1,-1),new re(-1,1,-1),new re(0,Li,or),new re(0,Li,-or),new re(or,0,Li),new re(-or,0,Li),new re(Li,or,0),new re(-Li,or,0)];class vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Aa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Aa,La,Ra),e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fr||e.mapping===hr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Aa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:Ur,format:Fn,colorSpace:ti,depthBuffer:!1},r=_l(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_l(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yh(s)),this._blurMaterial=bh(s,e,t)}return r}_compileMaterial(e){const t=new Hn(this._lodPlanes[0],e);this._renderer.compile(t,Ca)}_sceneToCubeUV(e,t,i,r){const a=new Dn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,g=d.toneMapping;d.getClearColor(ml),d.toneMapping=vi,d.autoClear=!1;const x=new $s({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),M=new Hn(new Gr,x);let E=!1;const h=e.background;h?h.isColor&&(x.color.copy(h),e.background=null,E=!0):(x.color.copy(ml),E=!0);for(let p=0;p<6;p++){const T=p%3;T===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):T===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const u=this._cubeSize;Cs(r,T*u,p>2?u:0,u,u),d.setRenderTarget(r),E&&d.render(M,a),d.render(e,a)}M.geometry.dispose(),M.material.dispose(),d.toneMapping=g,d.autoClear=f,e.background=h}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===fr||e.mapping===hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Hn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Cs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Ca)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=gl[(r-1)%gl.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new Hn(this._lodPlanes[r],l),g=l.uniforms,x=this._sizeLods[i]-1,M=isFinite(s)?Math.PI/(2*x):2*Math.PI/(2*Di-1),E=s/M,h=isFinite(s)?1+Math.floor(d*E):Di;h>Di&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${Di}`);const p=[];let T=0;for(let v=0;v<Di;++v){const w=v/E,_=Math.exp(-w*w/2);p.push(_),v===0?T+=_:v<h&&(T+=2*_)}for(let v=0;v<p.length;v++)p[v]=p[v]/T;g.envMap.value=e.texture,g.samples.value=h,g.weights.value=p,g.latitudinal.value=o==="latitudinal",a&&(g.poleAxis.value=a);const{_lodMax:u}=this;g.dTheta.value=M,g.mipInt.value=u-i;const m=this._sizeLods[r],S=3*m*(r>u-cr?r-u+cr:0),y=4*(this._cubeSize-m);Cs(t,S,y,3*m,2*m),c.setRenderTarget(t),c.render(f,Ca)}}function yh(n){const e=[],t=[],i=[];let r=n;const s=n-cr+1+hl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>n-cr?c=hl[o-n+cr-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),d=-l,f=1+l,g=[d,d,f,d,f,f,d,d,f,f,d,f],x=6,M=6,E=3,h=2,p=1,T=new Float32Array(E*M*x),u=new Float32Array(h*M*x),m=new Float32Array(p*M*x);for(let y=0;y<x;y++){const v=y%3*2/3-1,w=y>2?0:-1,_=[v,w,0,v+2/3,w,0,v+2/3,w+1,0,v,w,0,v+2/3,w+1,0,v,w+1,0];T.set(_,E*M*y),u.set(g,h*M*y);const b=[y,y,y,y,y,y];m.set(b,p*M*y)}const S=new Hi;S.setAttribute("position",new Gn(T,E)),S.setAttribute("uv",new Gn(u,h)),S.setAttribute("faceIndex",new Gn(m,p)),e.push(S),r>cr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function _l(n,e,t){const i=new Bi(n,e,t);return i.texture.mapping=Gs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function bh(n,e,t){const i=new Float32Array(Di),r=new re(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:to(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function xl(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:to(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function yl(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:to(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function to(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Mh(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ba||c===za,d=c===fr||c===hr;if(l||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new vl(n)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(l&&f&&f.height>0||d&&f&&r(f)){t===null&&(t=new vl(n));const g=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,g),a.addEventListener("dispose",s),g.texture}else return null}}}return a}function r(a){let c=0;const l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Sh(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Eh(n,e,t,i){const r={},s=new WeakMap;function o(f){const g=f.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);for(const M in g.morphAttributes){const E=g.morphAttributes[M];for(let h=0,p=E.length;h<p;h++)e.remove(E[h])}g.removeEventListener("dispose",o),delete r[g.id];const x=s.get(g);x&&(e.remove(x),s.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function a(f,g){return r[g.id]===!0||(g.addEventListener("dispose",o),r[g.id]=!0,t.memory.geometries++),g}function c(f){const g=f.attributes;for(const M in g)e.update(g[M],n.ARRAY_BUFFER);const x=f.morphAttributes;for(const M in x){const E=x[M];for(let h=0,p=E.length;h<p;h++)e.update(E[h],n.ARRAY_BUFFER)}}function l(f){const g=[],x=f.index,M=f.attributes.position;let E=0;if(x!==null){const T=x.array;E=x.version;for(let u=0,m=T.length;u<m;u+=3){const S=T[u+0],y=T[u+1],v=T[u+2];g.push(S,y,y,v,v,S)}}else if(M!==void 0){const T=M.array;E=M.version;for(let u=0,m=T.length/3-1;u<m;u+=3){const S=u+0,y=u+1,v=u+2;g.push(S,y,y,v,v,S)}}else return;const h=new(xc(g)?wc:Tc)(g,1);h.version=E;const p=s.get(f);p&&e.remove(p),s.set(f,h)}function d(f){const g=s.get(f);if(g){const x=f.index;x!==null&&g.version<x.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:d}}function Th(n,e,t,i){const r=i.isWebGL2;let s;function o(x){s=x}let a,c;function l(x){a=x.type,c=x.bytesPerElement}function d(x,M){n.drawElements(s,M,a,x*c),t.update(M,s,1)}function f(x,M,E){if(E===0)return;let h,p;if(r)h=n,p="drawElementsInstanced";else if(h=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",h===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[p](s,M,a,x*c,E),t.update(M,s,E)}function g(x,M,E){if(E===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let p=0;p<E;p++)this.render(x[p]/c,M[p]);else{h.multiDrawElementsWEBGL(s,M,0,a,x,0,E);let p=0;for(let T=0;T<E;T++)p+=M[T];t.update(p,s,1)}}this.setMode=o,this.setIndex=l,this.render=d,this.renderInstances=f,this.renderMultiDraw=g}function wh(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Ch(n,e){return n[0]-e[0]}function Ah(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Lh(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new jt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,d,f){const g=l.morphTargetInfluences;if(e.isWebGL2===!0){const M=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,E=M!==void 0?M.length:0;let h=s.get(d);if(h===void 0||h.count!==E){let U=function(){H.dispose(),s.delete(d),d.removeEventListener("dispose",U)};var x=U;h!==void 0&&h.texture.dispose();const u=d.morphAttributes.position!==void 0,m=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],v=d.morphAttributes.normal||[],w=d.morphAttributes.color||[];let _=0;u===!0&&(_=1),m===!0&&(_=2),S===!0&&(_=3);let b=d.attributes.position.count*_,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const R=new Float32Array(b*C*4*E),H=new Mc(R,b,C,E);H.type=hi,H.needsUpdate=!0;const P=_*4;for(let N=0;N<E;N++){const I=y[N],q=v[N],B=w[N],V=b*C*4*N;for(let K=0;K<I.count;K++){const k=K*P;u===!0&&(o.fromBufferAttribute(I,K),R[V+k+0]=o.x,R[V+k+1]=o.y,R[V+k+2]=o.z,R[V+k+3]=0),m===!0&&(o.fromBufferAttribute(q,K),R[V+k+4]=o.x,R[V+k+5]=o.y,R[V+k+6]=o.z,R[V+k+7]=0),S===!0&&(o.fromBufferAttribute(B,K),R[V+k+8]=o.x,R[V+k+9]=o.y,R[V+k+10]=o.z,R[V+k+11]=B.itemSize===4?o.w:1)}}h={count:E,texture:H,size:new xt(b,C)},s.set(d,h),d.addEventListener("dispose",U)}let p=0;for(let u=0;u<g.length;u++)p+=g[u];const T=d.morphTargetsRelative?1:1-p;f.getUniforms().setValue(n,"morphTargetBaseInfluence",T),f.getUniforms().setValue(n,"morphTargetInfluences",g),f.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}else{const M=g===void 0?0:g.length;let E=i[d.id];if(E===void 0||E.length!==M){E=[];for(let m=0;m<M;m++)E[m]=[m,0];i[d.id]=E}for(let m=0;m<M;m++){const S=E[m];S[0]=m,S[1]=g[m]}E.sort(Ah);for(let m=0;m<8;m++)m<M&&E[m][1]?(a[m][0]=E[m][0],a[m][1]=E[m][1]):(a[m][0]=Number.MAX_SAFE_INTEGER,a[m][1]=0);a.sort(Ch);const h=d.morphAttributes.position,p=d.morphAttributes.normal;let T=0;for(let m=0;m<8;m++){const S=a[m],y=S[0],v=S[1];y!==Number.MAX_SAFE_INTEGER&&v?(h&&d.getAttribute("morphTarget"+m)!==h[y]&&d.setAttribute("morphTarget"+m,h[y]),p&&d.getAttribute("morphNormal"+m)!==p[y]&&d.setAttribute("morphNormal"+m,p[y]),r[m]=v,T+=v):(h&&d.hasAttribute("morphTarget"+m)===!0&&d.deleteAttribute("morphTarget"+m),p&&d.hasAttribute("morphNormal"+m)===!0&&d.deleteAttribute("morphNormal"+m),r[m]=0)}const u=d.morphTargetsRelative?1:1-T;f.getUniforms().setValue(n,"morphTargetBaseInfluence",u),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function Rh(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,d=c.geometry,f=e.get(c,d);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const g=c.skeleton;r.get(g)!==l&&(g.update(),r.set(g,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class Ic extends fn{constructor(e,t,i,r,s,o,a,c,l,d){if(d=d!==void 0?d:Ui,d!==Ui&&d!==mr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Ui&&(i=fi),i===void 0&&d===mr&&(i=Fi),super(null,r,s,o,a,c,d,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:on,this.minFilter=c!==void 0?c:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Nc=new fn,Fc=new Ic(1,1);Fc.compareFunction=_c;const Uc=new Mc,kc=new fu,Oc=new Lc,bl=[],Ml=[],Sl=new Float32Array(16),El=new Float32Array(9),Tl=new Float32Array(4);function xr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=bl[r];if(s===void 0&&(s=new Float32Array(r),bl[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Vt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function qs(n,e){let t=Ml[e];t===void 0&&(t=new Int32Array(e),Ml[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ph(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Dh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2fv(this.addr,e),Vt(t,e)}}function Ih(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;n.uniform3fv(this.addr,e),Vt(t,e)}}function Nh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4fv(this.addr,e),Vt(t,e)}}function Fh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;Tl.set(i),n.uniformMatrix2fv(this.addr,!1,Tl),Vt(t,i)}}function Uh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;El.set(i),n.uniformMatrix3fv(this.addr,!1,El),Vt(t,i)}}function kh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;Sl.set(i),n.uniformMatrix4fv(this.addr,!1,Sl),Vt(t,i)}}function Oh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Bh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2iv(this.addr,e),Vt(t,e)}}function zh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3iv(this.addr,e),Vt(t,e)}}function Hh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4iv(this.addr,e),Vt(t,e)}}function Gh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2uiv(this.addr,e),Vt(t,e)}}function Wh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3uiv(this.addr,e),Vt(t,e)}}function Xh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4uiv(this.addr,e),Vt(t,e)}}function $h(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Fc:Nc;t.setTexture2D(e||s,r)}function qh(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||kc,r)}function Yh(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Oc,r)}function Kh(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Uc,r)}function jh(n){switch(n){case 5126:return Ph;case 35664:return Dh;case 35665:return Ih;case 35666:return Nh;case 35674:return Fh;case 35675:return Uh;case 35676:return kh;case 5124:case 35670:return Oh;case 35667:case 35671:return Bh;case 35668:case 35672:return zh;case 35669:case 35673:return Hh;case 5125:return Gh;case 36294:return Vh;case 36295:return Wh;case 36296:return Xh;case 35678:case 36198:case 36298:case 36306:case 35682:return $h;case 35679:case 36299:case 36307:return qh;case 35680:case 36300:case 36308:case 36293:return Yh;case 36289:case 36303:case 36311:case 36292:return Kh}}function Zh(n,e){n.uniform1fv(this.addr,e)}function Jh(n,e){const t=xr(e,this.size,2);n.uniform2fv(this.addr,t)}function Qh(n,e){const t=xr(e,this.size,3);n.uniform3fv(this.addr,t)}function em(n,e){const t=xr(e,this.size,4);n.uniform4fv(this.addr,t)}function tm(n,e){const t=xr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nm(n,e){const t=xr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function im(n,e){const t=xr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function rm(n,e){n.uniform1iv(this.addr,e)}function sm(n,e){n.uniform2iv(this.addr,e)}function am(n,e){n.uniform3iv(this.addr,e)}function om(n,e){n.uniform4iv(this.addr,e)}function lm(n,e){n.uniform1uiv(this.addr,e)}function cm(n,e){n.uniform2uiv(this.addr,e)}function dm(n,e){n.uniform3uiv(this.addr,e)}function um(n,e){n.uniform4uiv(this.addr,e)}function pm(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Nc,s[o])}function fm(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||kc,s[o])}function hm(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Oc,s[o])}function mm(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Uc,s[o])}function gm(n){switch(n){case 5126:return Zh;case 35664:return Jh;case 35665:return Qh;case 35666:return em;case 35674:return tm;case 35675:return nm;case 35676:return im;case 5124:case 35670:return rm;case 35667:case 35671:return sm;case 35668:case 35672:return am;case 35669:case 35673:return om;case 5125:return lm;case 36294:return cm;case 36295:return dm;case 36296:return um;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return mm}}class vm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=jh(t.type)}}class _m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gm(t.type)}}class xm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Pa=/(\w+)(\])?(\[|\.)?/g;function wl(n,e){n.seq.push(e),n.map[e.id]=e}function ym(n,e,t){const i=n.name,r=i.length;for(Pa.lastIndex=0;;){const s=Pa.exec(i),o=Pa.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){wl(t,l===void 0?new vm(a,n,e):new _m(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new xm(a),wl(t,f)),t=f}}}class Ps{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);ym(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const bm=37297;let Mm=0;function Sm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Em(n){const e=bt.getPrimaries(bt.workingColorSpace),t=bt.getPrimaries(n);let i;switch(e===t?i="":e===Os&&t===ks?i="LinearDisplayP3ToLinearSRGB":e===ks&&t===Os&&(i="LinearSRGBToLinearDisplayP3"),n){case ti:case Vs:return[i,"LinearTransferOETF"];case Kt:case Ja:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Al(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Sm(n.getShaderSource(e),o)}else return r}function Tm(n,e){const t=Em(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function wm(n,e){let t;switch(e){case Fd:t="Linear";break;case Ud:t="Reinhard";break;case kd:t="OptimizedCineon";break;case Od:t="ACESFilmic";break;case zd:t="AgX";break;case Bd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Cm(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(dr).join(`
`)}function Am(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(dr).join(`
`)}function Lm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Rm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function dr(n){return n!==""}function Ll(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pm=/^[ \t]*#include +<([\w\d./]+)>/gm;function $a(n){return n.replace(Pm,Im)}const Dm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Im(n,e){let t=lt[e];if(t===void 0){const i=Dm.get(e);if(i!==void 0)t=lt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return $a(t)}const Nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pl(n){return n.replace(Nm,Fm)}function Fm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Dl(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Um(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===oc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===cd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function km(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case fr:case hr:e="ENVMAP_TYPE_CUBE";break;case Gs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Om(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case hr:e="ENVMAP_MODE_REFRACTION";break}return e}function Bm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case lc:e="ENVMAP_BLENDING_MULTIPLY";break;case Id:e="ENVMAP_BLENDING_MIX";break;case Nd:e="ENVMAP_BLENDING_ADD";break}return e}function zm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Hm(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Um(t),l=km(t),d=Om(t),f=Bm(t),g=zm(t),x=t.isWebGL2?"":Cm(t),M=Am(t),E=Lm(s),h=r.createProgram();let p,T,u=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(dr).join(`
`),p.length>0&&(p+=`
`),T=[x,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(dr).join(`
`),T.length>0&&(T+=`
`)):(p=[Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),T=[x,Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vi?"#define TONE_MAPPING":"",t.toneMapping!==vi?lt.tonemapping_pars_fragment:"",t.toneMapping!==vi?wm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,Tm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(dr).join(`
`)),o=$a(o),o=Ll(o,t),o=Rl(o,t),a=$a(a),a=Ll(a,t),a=Rl(a,t),o=Pl(o),a=Pl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(u=`#version 300 es
`,p=[M,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const m=u+p+o,S=u+T+a,y=Cl(r,r.VERTEX_SHADER,m),v=Cl(r,r.FRAGMENT_SHADER,S);r.attachShader(h,y),r.attachShader(h,v),t.index0AttributeName!==void 0?r.bindAttribLocation(h,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(h,0,"position"),r.linkProgram(h);function w(R){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(h).trim(),P=r.getShaderInfoLog(y).trim(),U=r.getShaderInfoLog(v).trim();let N=!0,I=!0;if(r.getProgramParameter(h,r.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,h,y,v);else{const q=Al(r,y,"vertex"),B=Al(r,v,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(h,r.VALIDATE_STATUS)+`

Program Info Log: `+H+`
`+q+`
`+B)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(P===""||U==="")&&(I=!1);I&&(R.diagnostics={runnable:N,programLog:H,vertexShader:{log:P,prefix:p},fragmentShader:{log:U,prefix:T}})}r.deleteShader(y),r.deleteShader(v),_=new Ps(r,h),b=Rm(r,h)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(h,bm)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(h),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mm++,this.cacheKey=e,this.usedTimes=1,this.program=h,this.vertexShader=y,this.fragmentShader=v,this}let Gm=0;class Vm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Wm(e),t.set(e,i)),i}}class Wm{constructor(e){this.id=Gm++,this.code=e,this.usedTimes=0}}function Xm(n,e,t,i,r,s,o){const a=new eo,c=new Vm,l=[],d=r.isWebGL2,f=r.logarithmicDepthBuffer,g=r.vertexTextures;let x=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(_){return _===0?"uv":`uv${_}`}function h(_,b,C,R,H){const P=R.fog,U=H.geometry,N=_.isMeshStandardMaterial?R.environment:null,I=(_.isMeshStandardMaterial?t:e).get(_.envMap||N),q=I&&I.mapping===Gs?I.image.height:null,B=M[_.type];_.precision!==null&&(x=r.getMaxPrecision(_.precision),x!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",x,"instead."));const V=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,K=V!==void 0?V.length:0;let k=0;U.morphAttributes.position!==void 0&&(k=1),U.morphAttributes.normal!==void 0&&(k=2),U.morphAttributes.color!==void 0&&(k=3);let G,F,X,W;if(B){const pe=zn[B];G=pe.vertexShader,F=pe.fragmentShader}else G=_.vertexShader,F=_.fragmentShader,c.update(_),X=c.getVertexShaderID(_),W=c.getFragmentShaderID(_);const Q=n.getRenderTarget(),j=H.isInstancedMesh===!0,se=H.isBatchedMesh===!0,de=!!_.map,ae=!!_.matcap,$=!!I,Ve=!!_.aoMap,be=!!_.lightMap,Ne=!!_.bumpMap,me=!!_.normalMap,Be=!!_.displacementMap,ze=!!_.emissiveMap,D=!!_.metalnessMap,A=!!_.roughnessMap,ee=_.anisotropy>0,he=_.clearcoat>0,ce=_.iridescence>0,le=_.sheen>0,Fe=_.transmission>0,xe=ee&&!!_.anisotropyMap,De=he&&!!_.clearcoatMap,Ue=he&&!!_.clearcoatNormalMap,et=he&&!!_.clearcoatRoughnessMap,ue=ce&&!!_.iridescenceMap,ot=ce&&!!_.iridescenceThicknessMap,tt=le&&!!_.sheenColorMap,Je=le&&!!_.sheenRoughnessMap,We=!!_.specularMap,Ie=!!_.specularColorMap,Z=!!_.specularIntensityMap,Se=Fe&&!!_.transmissionMap,He=Fe&&!!_.thicknessMap,Ce=!!_.gradientMap,oe=!!_.alphaMap,O=_.alphaTest>0,fe=!!_.alphaHash,ve=!!_.extensions,Ee=!!U.attributes.uv1,Re=!!U.attributes.uv2,$e=!!U.attributes.uv3;let nt=vi;return _.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(nt=n.toneMapping),{isWebGL2:d,shaderID:B,shaderType:_.type,shaderName:_.name,vertexShader:G,fragmentShader:F,defines:_.defines,customVertexShaderID:X,customFragmentShaderID:W,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:x,batching:se,instancing:j,instancingColor:j&&H.instanceColor!==null,supportsVertexTextures:g,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ti,map:de,matcap:ae,envMap:$,envMapMode:$&&I.mapping,envMapCubeUVHeight:q,aoMap:Ve,lightMap:be,bumpMap:Ne,normalMap:me,displacementMap:g&&Be,emissiveMap:ze,normalMapObjectSpace:me&&_.normalMapType===Qd,normalMapTangentSpace:me&&_.normalMapType===Jd,metalnessMap:D,roughnessMap:A,anisotropy:ee,anisotropyMap:xe,clearcoat:he,clearcoatMap:De,clearcoatNormalMap:Ue,clearcoatRoughnessMap:et,iridescence:ce,iridescenceMap:ue,iridescenceThicknessMap:ot,sheen:le,sheenColorMap:tt,sheenRoughnessMap:Je,specularMap:We,specularColorMap:Ie,specularIntensityMap:Z,transmission:Fe,transmissionMap:Se,thicknessMap:He,gradientMap:Ce,opaque:_.transparent===!1&&_.blending===ur,alphaMap:oe,alphaTest:O,alphaHash:fe,combine:_.combine,mapUv:de&&E(_.map.channel),aoMapUv:Ve&&E(_.aoMap.channel),lightMapUv:be&&E(_.lightMap.channel),bumpMapUv:Ne&&E(_.bumpMap.channel),normalMapUv:me&&E(_.normalMap.channel),displacementMapUv:Be&&E(_.displacementMap.channel),emissiveMapUv:ze&&E(_.emissiveMap.channel),metalnessMapUv:D&&E(_.metalnessMap.channel),roughnessMapUv:A&&E(_.roughnessMap.channel),anisotropyMapUv:xe&&E(_.anisotropyMap.channel),clearcoatMapUv:De&&E(_.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&E(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&E(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&E(_.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&E(_.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&E(_.sheenColorMap.channel),sheenRoughnessMapUv:Je&&E(_.sheenRoughnessMap.channel),specularMapUv:We&&E(_.specularMap.channel),specularColorMapUv:Ie&&E(_.specularColorMap.channel),specularIntensityMapUv:Z&&E(_.specularIntensityMap.channel),transmissionMapUv:Se&&E(_.transmissionMap.channel),thicknessMapUv:He&&E(_.thicknessMap.channel),alphaMapUv:oe&&E(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(me||ee),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Ee,vertexUv2s:Re,vertexUv3s:$e,pointsUvs:H.isPoints===!0&&!!U.attributes.uv&&(de||oe),fog:!!P,useFog:_.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:H.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:k,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:de&&_.map.isVideoTexture===!0&&bt.getTransfer(_.map.colorSpace)===wt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===In,flipSided:_.side===pn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:ve&&_.extensions.derivatives===!0,extensionFragDepth:ve&&_.extensions.fragDepth===!0,extensionDrawBuffers:ve&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ve&&_.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function p(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)b.push(C),b.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(T(b,_),u(b,_),b.push(n.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function T(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function u(_,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),_.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function m(_){const b=M[_.type];let C;if(b){const R=zn[b];C=wu.clone(R.uniforms)}else C=_.uniforms;return C}function S(_,b){let C;for(let R=0,H=l.length;R<H;R++){const P=l[R];if(P.cacheKey===b){C=P,++C.usedTimes;break}}return C===void 0&&(C=new Hm(n,b,_,s),l.push(C)),C}function y(_){if(--_.usedTimes===0){const b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),_.destroy()}}function v(_){c.remove(_)}function w(){c.dispose()}return{getParameters:h,getProgramCacheKey:p,getUniforms:m,acquireProgram:S,releaseProgram:y,releaseShaderCache:v,programs:l,dispose:w}}function $m(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function qm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Il(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Nl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,g,x,M,E,h){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:g,material:x,groupOrder:M,renderOrder:f.renderOrder,z:E,group:h},n[e]=p):(p.id=f.id,p.object=f,p.geometry=g,p.material=x,p.groupOrder=M,p.renderOrder=f.renderOrder,p.z=E,p.group=h),e++,p}function a(f,g,x,M,E,h){const p=o(f,g,x,M,E,h);x.transmission>0?i.push(p):x.transparent===!0?r.push(p):t.push(p)}function c(f,g,x,M,E,h){const p=o(f,g,x,M,E,h);x.transmission>0?i.unshift(p):x.transparent===!0?r.unshift(p):t.unshift(p)}function l(f,g){t.length>1&&t.sort(f||qm),i.length>1&&i.sort(g||Il),r.length>1&&r.sort(g||Il)}function d(){for(let f=e,g=n.length;f<g;f++){const x=n[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:d,sort:l}}function Ym(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Nl,n.set(i,[o])):r>=s.length?(o=new Nl,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Km(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new re,color:new Mt};break;case"SpotLight":t={position:new re,direction:new re,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new re,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new re,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new re,halfWidth:new re,halfHeight:new re};break}return n[e.id]=t,t}}}function jm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Zm=0;function Jm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Qm(n,e){const t=new Km,i=jm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new re);const s=new re,o=new Zt,a=new Zt;function c(d,f){let g=0,x=0,M=0;for(let R=0;R<9;R++)r.probe[R].set(0,0,0);let E=0,h=0,p=0,T=0,u=0,m=0,S=0,y=0,v=0,w=0,_=0;d.sort(Jm);const b=f===!0?Math.PI:1;for(let R=0,H=d.length;R<H;R++){const P=d[R],U=P.color,N=P.intensity,I=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)g+=U.r*N*b,x+=U.g*N*b,M+=U.b*N*b;else if(P.isLightProbe){for(let B=0;B<9;B++)r.probe[B].addScaledVector(P.sh.coefficients[B],N);_++}else if(P.isDirectionalLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity*b),P.castShadow){const V=P.shadow,K=i.get(P);K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,r.directionalShadow[E]=K,r.directionalShadowMap[E]=q,r.directionalShadowMatrix[E]=P.shadow.matrix,m++}r.directional[E]=B,E++}else if(P.isSpotLight){const B=t.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(U).multiplyScalar(N*b),B.distance=I,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,r.spot[p]=B;const V=P.shadow;if(P.map&&(r.spotLightMap[v]=P.map,v++,V.updateMatrices(P),P.castShadow&&w++),r.spotLightMatrix[p]=V.matrix,P.castShadow){const K=i.get(P);K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,r.spotShadow[p]=K,r.spotShadowMap[p]=q,y++}p++}else if(P.isRectAreaLight){const B=t.get(P);B.color.copy(U).multiplyScalar(N),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),r.rectArea[T]=B,T++}else if(P.isPointLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity*b),B.distance=P.distance,B.decay=P.decay,P.castShadow){const V=P.shadow,K=i.get(P);K.shadowBias=V.bias,K.shadowNormalBias=V.normalBias,K.shadowRadius=V.radius,K.shadowMapSize=V.mapSize,K.shadowCameraNear=V.camera.near,K.shadowCameraFar=V.camera.far,r.pointShadow[h]=K,r.pointShadowMap[h]=q,r.pointShadowMatrix[h]=P.shadow.matrix,S++}r.point[h]=B,h++}else if(P.isHemisphereLight){const B=t.get(P);B.skyColor.copy(P.color).multiplyScalar(N*b),B.groundColor.copy(P.groundColor).multiplyScalar(N*b),r.hemi[u]=B,u++}}T>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=we.LTC_FLOAT_1,r.rectAreaLTC2=we.LTC_FLOAT_2):(r.rectAreaLTC1=we.LTC_HALF_1,r.rectAreaLTC2=we.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=we.LTC_FLOAT_1,r.rectAreaLTC2=we.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=we.LTC_HALF_1,r.rectAreaLTC2=we.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=g,r.ambient[1]=x,r.ambient[2]=M;const C=r.hash;(C.directionalLength!==E||C.pointLength!==h||C.spotLength!==p||C.rectAreaLength!==T||C.hemiLength!==u||C.numDirectionalShadows!==m||C.numPointShadows!==S||C.numSpotShadows!==y||C.numSpotMaps!==v||C.numLightProbes!==_)&&(r.directional.length=E,r.spot.length=p,r.rectArea.length=T,r.point.length=h,r.hemi.length=u,r.directionalShadow.length=m,r.directionalShadowMap.length=m,r.pointShadow.length=S,r.pointShadowMap.length=S,r.spotShadow.length=y,r.spotShadowMap.length=y,r.directionalShadowMatrix.length=m,r.pointShadowMatrix.length=S,r.spotLightMatrix.length=y+v-w,r.spotLightMap.length=v,r.numSpotLightShadowsWithMaps=w,r.numLightProbes=_,C.directionalLength=E,C.pointLength=h,C.spotLength=p,C.rectAreaLength=T,C.hemiLength=u,C.numDirectionalShadows=m,C.numPointShadows=S,C.numSpotShadows=y,C.numSpotMaps=v,C.numLightProbes=_,r.version=Zm++)}function l(d,f){let g=0,x=0,M=0,E=0,h=0;const p=f.matrixWorldInverse;for(let T=0,u=d.length;T<u;T++){const m=d[T];if(m.isDirectionalLight){const S=r.directional[g];S.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),g++}else if(m.isSpotLight){const S=r.spot[M];S.position.setFromMatrixPosition(m.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),M++}else if(m.isRectAreaLight){const S=r.rectArea[E];S.position.setFromMatrixPosition(m.matrixWorld),S.position.applyMatrix4(p),a.identity(),o.copy(m.matrixWorld),o.premultiply(p),a.extractRotation(o),S.halfWidth.set(m.width*.5,0,0),S.halfHeight.set(0,m.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),E++}else if(m.isPointLight){const S=r.point[x];S.position.setFromMatrixPosition(m.matrixWorld),S.position.applyMatrix4(p),x++}else if(m.isHemisphereLight){const S=r.hemi[h];S.direction.setFromMatrixPosition(m.matrixWorld),S.direction.transformDirection(p),h++}}}return{setup:c,setupView:l,state:r}}function Fl(n,e){const t=new Qm(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function c(f){t.setup(i,f)}function l(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function eg(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let c;return a===void 0?(c=new Fl(n,e),t.set(s,[c])):o>=a.length?(c=new Fl(n,e),a.push(c)):c=a[o],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class tg extends Xs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ng extends Xs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ig=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sg(n,e,t){let i=new Rc;const r=new xt,s=new xt,o=new jt,a=new tg({depthPacking:Zd}),c=new ng,l={},d=t.maxTextureSize,f={[xi]:pn,[pn]:xi,[In]:In},g=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:ig,fragmentShader:rg}),x=g.clone();x.defines.HORIZONTAL_PASS=1;const M=new Hi;M.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Hn(M,g),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oc;let p=this.type;this.render=function(y,v,w){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||y.length===0)return;const _=n.getRenderTarget(),b=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),R=n.state;R.setBlending(gi),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const H=p!==Jn&&this.type===Jn,P=p===Jn&&this.type!==Jn;for(let U=0,N=y.length;U<N;U++){const I=y[U],q=I.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const B=q.getFrameExtents();if(r.multiply(B),s.copy(q.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/B.x),r.x=s.x*B.x,q.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/B.y),r.y=s.y*B.y,q.mapSize.y=s.y)),q.map===null||H===!0||P===!0){const K=this.type!==Jn?{minFilter:on,magFilter:on}:{};q.map!==null&&q.map.dispose(),q.map=new Bi(r.x,r.y,K),q.map.texture.name=I.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const V=q.getViewportCount();for(let K=0;K<V;K++){const k=q.getViewport(K);o.set(s.x*k.x,s.y*k.y,s.x*k.z,s.y*k.w),R.viewport(o),q.updateMatrices(I,K),i=q.getFrustum(),m(v,w,q.camera,I,this.type)}q.isPointLightShadow!==!0&&this.type===Jn&&T(q,w),q.needsUpdate=!1}p=this.type,h.needsUpdate=!1,n.setRenderTarget(_,b,C)};function T(y,v){const w=e.update(E);g.defines.VSM_SAMPLES!==y.blurSamples&&(g.defines.VSM_SAMPLES=y.blurSamples,x.defines.VSM_SAMPLES=y.blurSamples,g.needsUpdate=!0,x.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Bi(r.x,r.y)),g.uniforms.shadow_pass.value=y.map.texture,g.uniforms.resolution.value=y.mapSize,g.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(v,null,w,g,E,null),x.uniforms.shadow_pass.value=y.mapPass.texture,x.uniforms.resolution.value=y.mapSize,x.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(v,null,w,x,E,null)}function u(y,v,w,_){let b=null;const C=w.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(C!==void 0)b=C;else if(b=w.isPointLight===!0?c:a,n.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0){const R=b.uuid,H=v.uuid;let P=l[R];P===void 0&&(P={},l[R]=P);let U=P[H];U===void 0&&(U=b.clone(),P[H]=U,v.addEventListener("dispose",S)),b=U}if(b.visible=v.visible,b.wireframe=v.wireframe,_===Jn?b.side=v.shadowSide!==null?v.shadowSide:v.side:b.side=v.shadowSide!==null?v.shadowSide:f[v.side],b.alphaMap=v.alphaMap,b.alphaTest=v.alphaTest,b.map=v.map,b.clipShadows=v.clipShadows,b.clippingPlanes=v.clippingPlanes,b.clipIntersection=v.clipIntersection,b.displacementMap=v.displacementMap,b.displacementScale=v.displacementScale,b.displacementBias=v.displacementBias,b.wireframeLinewidth=v.wireframeLinewidth,b.linewidth=v.linewidth,w.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const R=n.properties.get(b);R.light=w}return b}function m(y,v,w,_,b){if(y.visible===!1)return;if(y.layers.test(v.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&b===Jn)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,y.matrixWorld);const H=e.update(y),P=y.material;if(Array.isArray(P)){const U=H.groups;for(let N=0,I=U.length;N<I;N++){const q=U[N],B=P[q.materialIndex];if(B&&B.visible){const V=u(y,B,_,b);y.onBeforeShadow(n,y,v,w,H,V,q),n.renderBufferDirect(w,null,H,V,y,q),y.onAfterShadow(n,y,v,w,H,V,q)}}}else if(P.visible){const U=u(y,P,_,b);y.onBeforeShadow(n,y,v,w,H,U,null),n.renderBufferDirect(w,null,H,U,y,null),y.onAfterShadow(n,y,v,w,H,U,null)}}const R=y.children;for(let H=0,P=R.length;H<P;H++)m(R[H],v,w,_,b)}function S(y){y.target.removeEventListener("dispose",S);for(const w in l){const _=l[w],b=y.target.uuid;b in _&&(_[b].dispose(),delete _[b])}}}function ag(n,e,t){const i=t.isWebGL2;function r(){let O=!1;const fe=new jt;let ve=null;const Ee=new jt(0,0,0,0);return{setMask:function(Re){ve!==Re&&!O&&(n.colorMask(Re,Re,Re,Re),ve=Re)},setLocked:function(Re){O=Re},setClear:function(Re,$e,nt,mt,pe){pe===!0&&(Re*=mt,$e*=mt,nt*=mt),fe.set(Re,$e,nt,mt),Ee.equals(fe)===!1&&(n.clearColor(Re,$e,nt,mt),Ee.copy(fe))},reset:function(){O=!1,ve=null,Ee.set(-1,0,0,0)}}}function s(){let O=!1,fe=null,ve=null,Ee=null;return{setTest:function(Re){Re?se(n.DEPTH_TEST):de(n.DEPTH_TEST)},setMask:function(Re){fe!==Re&&!O&&(n.depthMask(Re),fe=Re)},setFunc:function(Re){if(ve!==Re){switch(Re){case wd:n.depthFunc(n.NEVER);break;case Cd:n.depthFunc(n.ALWAYS);break;case Ad:n.depthFunc(n.LESS);break;case Fs:n.depthFunc(n.LEQUAL);break;case Ld:n.depthFunc(n.EQUAL);break;case Rd:n.depthFunc(n.GEQUAL);break;case Pd:n.depthFunc(n.GREATER);break;case Dd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=Re}},setLocked:function(Re){O=Re},setClear:function(Re){Ee!==Re&&(n.clearDepth(Re),Ee=Re)},reset:function(){O=!1,fe=null,ve=null,Ee=null}}}function o(){let O=!1,fe=null,ve=null,Ee=null,Re=null,$e=null,nt=null,mt=null,pe=null;return{setTest:function(Le){O||(Le?se(n.STENCIL_TEST):de(n.STENCIL_TEST))},setMask:function(Le){fe!==Le&&!O&&(n.stencilMask(Le),fe=Le)},setFunc:function(Le,ye,Me){(ve!==Le||Ee!==ye||Re!==Me)&&(n.stencilFunc(Le,ye,Me),ve=Le,Ee=ye,Re=Me)},setOp:function(Le,ye,Me){($e!==Le||nt!==ye||mt!==Me)&&(n.stencilOp(Le,ye,Me),$e=Le,nt=ye,mt=Me)},setLocked:function(Le){O=Le},setClear:function(Le){pe!==Le&&(n.clearStencil(Le),pe=Le)},reset:function(){O=!1,fe=null,ve=null,Ee=null,Re=null,$e=null,nt=null,mt=null,pe=null}}}const a=new r,c=new s,l=new o,d=new WeakMap,f=new WeakMap;let g={},x={},M=new WeakMap,E=[],h=null,p=!1,T=null,u=null,m=null,S=null,y=null,v=null,w=null,_=new Mt(0,0,0),b=0,C=!1,R=null,H=null,P=null,U=null,N=null;const I=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,B=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(V)[1]),q=B>=1):V.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),q=B>=2);let K=null,k={};const G=n.getParameter(n.SCISSOR_BOX),F=n.getParameter(n.VIEWPORT),X=new jt().fromArray(G),W=new jt().fromArray(F);function Q(O,fe,ve,Ee){const Re=new Uint8Array(4),$e=n.createTexture();n.bindTexture(O,$e),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let nt=0;nt<ve;nt++)i&&(O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY)?n.texImage3D(fe,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,Re):n.texImage2D(fe+nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Re);return $e}const j={};j[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(j[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),se(n.DEPTH_TEST),c.setFunc(Fs),ze(!1),D(go),se(n.CULL_FACE),me(gi);function se(O){g[O]!==!0&&(n.enable(O),g[O]=!0)}function de(O){g[O]!==!1&&(n.disable(O),g[O]=!1)}function ae(O,fe){return x[O]!==fe?(n.bindFramebuffer(O,fe),x[O]=fe,i&&(O===n.DRAW_FRAMEBUFFER&&(x[n.FRAMEBUFFER]=fe),O===n.FRAMEBUFFER&&(x[n.DRAW_FRAMEBUFFER]=fe)),!0):!1}function $(O,fe){let ve=E,Ee=!1;if(O)if(ve=M.get(fe),ve===void 0&&(ve=[],M.set(fe,ve)),O.isWebGLMultipleRenderTargets){const Re=O.texture;if(ve.length!==Re.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let $e=0,nt=Re.length;$e<nt;$e++)ve[$e]=n.COLOR_ATTACHMENT0+$e;ve.length=Re.length,Ee=!0}}else ve[0]!==n.COLOR_ATTACHMENT0&&(ve[0]=n.COLOR_ATTACHMENT0,Ee=!0);else ve[0]!==n.BACK&&(ve[0]=n.BACK,Ee=!0);Ee&&(t.isWebGL2?n.drawBuffers(ve):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ve))}function Ve(O){return h!==O?(n.useProgram(O),h=O,!0):!1}const be={[Pi]:n.FUNC_ADD,[ud]:n.FUNC_SUBTRACT,[pd]:n.FUNC_REVERSE_SUBTRACT};if(i)be[yo]=n.MIN,be[bo]=n.MAX;else{const O=e.get("EXT_blend_minmax");O!==null&&(be[yo]=O.MIN_EXT,be[bo]=O.MAX_EXT)}const Ne={[fd]:n.ZERO,[hd]:n.ONE,[md]:n.SRC_COLOR,[ka]:n.SRC_ALPHA,[bd]:n.SRC_ALPHA_SATURATE,[xd]:n.DST_COLOR,[vd]:n.DST_ALPHA,[gd]:n.ONE_MINUS_SRC_COLOR,[Oa]:n.ONE_MINUS_SRC_ALPHA,[yd]:n.ONE_MINUS_DST_COLOR,[_d]:n.ONE_MINUS_DST_ALPHA,[Md]:n.CONSTANT_COLOR,[Sd]:n.ONE_MINUS_CONSTANT_COLOR,[Ed]:n.CONSTANT_ALPHA,[Td]:n.ONE_MINUS_CONSTANT_ALPHA};function me(O,fe,ve,Ee,Re,$e,nt,mt,pe,Le){if(O===gi){p===!0&&(de(n.BLEND),p=!1);return}if(p===!1&&(se(n.BLEND),p=!0),O!==dd){if(O!==T||Le!==C){if((u!==Pi||y!==Pi)&&(n.blendEquation(n.FUNC_ADD),u=Pi,y=Pi),Le)switch(O){case ur:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vo:n.blendFunc(n.ONE,n.ONE);break;case _o:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vo:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case _o:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}m=null,S=null,v=null,w=null,_.set(0,0,0),b=0,T=O,C=Le}return}Re=Re||fe,$e=$e||ve,nt=nt||Ee,(fe!==u||Re!==y)&&(n.blendEquationSeparate(be[fe],be[Re]),u=fe,y=Re),(ve!==m||Ee!==S||$e!==v||nt!==w)&&(n.blendFuncSeparate(Ne[ve],Ne[Ee],Ne[$e],Ne[nt]),m=ve,S=Ee,v=$e,w=nt),(mt.equals(_)===!1||pe!==b)&&(n.blendColor(mt.r,mt.g,mt.b,pe),_.copy(mt),b=pe),T=O,C=!1}function Be(O,fe){O.side===In?de(n.CULL_FACE):se(n.CULL_FACE);let ve=O.side===pn;fe&&(ve=!ve),ze(ve),O.blending===ur&&O.transparent===!1?me(gi):me(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),c.setFunc(O.depthFunc),c.setTest(O.depthTest),c.setMask(O.depthWrite),a.setMask(O.colorWrite);const Ee=O.stencilWrite;l.setTest(Ee),Ee&&(l.setMask(O.stencilWriteMask),l.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),l.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ee(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):de(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(O){R!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),R=O)}function D(O){O!==od?(se(n.CULL_FACE),O!==H&&(O===go?n.cullFace(n.BACK):O===ld?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):de(n.CULL_FACE),H=O}function A(O){O!==P&&(q&&n.lineWidth(O),P=O)}function ee(O,fe,ve){O?(se(n.POLYGON_OFFSET_FILL),(U!==fe||N!==ve)&&(n.polygonOffset(fe,ve),U=fe,N=ve)):de(n.POLYGON_OFFSET_FILL)}function he(O){O?se(n.SCISSOR_TEST):de(n.SCISSOR_TEST)}function ce(O){O===void 0&&(O=n.TEXTURE0+I-1),K!==O&&(n.activeTexture(O),K=O)}function le(O,fe,ve){ve===void 0&&(K===null?ve=n.TEXTURE0+I-1:ve=K);let Ee=k[ve];Ee===void 0&&(Ee={type:void 0,texture:void 0},k[ve]=Ee),(Ee.type!==O||Ee.texture!==fe)&&(K!==ve&&(n.activeTexture(ve),K=ve),n.bindTexture(O,fe||j[O]),Ee.type=O,Ee.texture=fe)}function Fe(){const O=k[K];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function xe(){try{n.compressedTexImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function De(){try{n.compressedTexImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ue(){try{n.texSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{n.texSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ue(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function tt(){try{n.texStorage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Je(){try{n.texStorage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function We(){try{n.texImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ie(){try{n.texImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Z(O){X.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),X.copy(O))}function Se(O){W.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),W.copy(O))}function He(O,fe){let ve=f.get(fe);ve===void 0&&(ve=new WeakMap,f.set(fe,ve));let Ee=ve.get(O);Ee===void 0&&(Ee=n.getUniformBlockIndex(fe,O.name),ve.set(O,Ee))}function Ce(O,fe){const Ee=f.get(fe).get(O);d.get(fe)!==Ee&&(n.uniformBlockBinding(fe,Ee,O.__bindingPointIndex),d.set(fe,Ee))}function oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),g={},K=null,k={},x={},M=new WeakMap,E=[],h=null,p=!1,T=null,u=null,m=null,S=null,y=null,v=null,w=null,_=new Mt(0,0,0),b=0,C=!1,R=null,H=null,P=null,U=null,N=null,X.set(0,0,n.canvas.width,n.canvas.height),W.set(0,0,n.canvas.width,n.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:se,disable:de,bindFramebuffer:ae,drawBuffers:$,useProgram:Ve,setBlending:me,setMaterial:Be,setFlipSided:ze,setCullFace:D,setLineWidth:A,setPolygonOffset:ee,setScissorTest:he,activeTexture:ce,bindTexture:le,unbindTexture:Fe,compressedTexImage2D:xe,compressedTexImage3D:De,texImage2D:We,texImage3D:Ie,updateUBOMapping:He,uniformBlockBinding:Ce,texStorage2D:tt,texStorage3D:Je,texSubImage2D:Ue,texSubImage3D:et,compressedTexSubImage2D:ue,compressedTexSubImage3D:ot,scissor:Z,viewport:Se,reset:oe}}function og(n,e,t,i,r,s,o){const a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let f;const g=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(D,A){return x?new OffscreenCanvas(D,A):zs("canvas")}function E(D,A,ee,he){let ce=1;if((D.width>he||D.height>he)&&(ce=he/Math.max(D.width,D.height)),ce<1||A===!0)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap){const le=A?Xa:Math.floor,Fe=le(ce*D.width),xe=le(ce*D.height);f===void 0&&(f=M(Fe,xe));const De=ee?M(Fe,xe):f;return De.width=Fe,De.height=xe,De.getContext("2d").drawImage(D,0,0,Fe,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+Fe+"x"+xe+")."),De}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function h(D){return Zo(D.width)&&Zo(D.height)}function p(D){return a?!1:D.wrapS!==Nn||D.wrapT!==Nn||D.minFilter!==on&&D.minFilter!==dn}function T(D,A){return D.generateMipmaps&&A&&D.minFilter!==on&&D.minFilter!==dn}function u(D){n.generateMipmap(D)}function m(D,A,ee,he,ce=!1){if(a===!1)return A;if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let le=A;if(A===n.RED&&(ee===n.FLOAT&&(le=n.R32F),ee===n.HALF_FLOAT&&(le=n.R16F),ee===n.UNSIGNED_BYTE&&(le=n.R8)),A===n.RED_INTEGER&&(ee===n.UNSIGNED_BYTE&&(le=n.R8UI),ee===n.UNSIGNED_SHORT&&(le=n.R16UI),ee===n.UNSIGNED_INT&&(le=n.R32UI),ee===n.BYTE&&(le=n.R8I),ee===n.SHORT&&(le=n.R16I),ee===n.INT&&(le=n.R32I)),A===n.RG&&(ee===n.FLOAT&&(le=n.RG32F),ee===n.HALF_FLOAT&&(le=n.RG16F),ee===n.UNSIGNED_BYTE&&(le=n.RG8)),A===n.RGBA){const Fe=ce?Us:bt.getTransfer(he);ee===n.FLOAT&&(le=n.RGBA32F),ee===n.HALF_FLOAT&&(le=n.RGBA16F),ee===n.UNSIGNED_BYTE&&(le=Fe===wt?n.SRGB8_ALPHA8:n.RGBA8),ee===n.UNSIGNED_SHORT_4_4_4_4&&(le=n.RGBA4),ee===n.UNSIGNED_SHORT_5_5_5_1&&(le=n.RGB5_A1)}return(le===n.R16F||le===n.R32F||le===n.RG16F||le===n.RG32F||le===n.RGBA16F||le===n.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function S(D,A,ee){return T(D,ee)===!0||D.isFramebufferTexture&&D.minFilter!==on&&D.minFilter!==dn?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function y(D){return D===on||D===Mo||D===na?n.NEAREST:n.LINEAR}function v(D){const A=D.target;A.removeEventListener("dispose",v),_(A),A.isVideoTexture&&d.delete(A)}function w(D){const A=D.target;A.removeEventListener("dispose",w),C(A)}function _(D){const A=i.get(D);if(A.__webglInit===void 0)return;const ee=D.source,he=g.get(ee);if(he){const ce=he[A.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&b(D),Object.keys(he).length===0&&g.delete(ee)}i.remove(D)}function b(D){const A=i.get(D);n.deleteTexture(A.__webglTexture);const ee=D.source,he=g.get(ee);delete he[A.__cacheKey],o.memory.textures--}function C(D){const A=D.texture,ee=i.get(D),he=i.get(A);if(he.__webglTexture!==void 0&&(n.deleteTexture(he.__webglTexture),o.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(ee.__webglFramebuffer[ce]))for(let le=0;le<ee.__webglFramebuffer[ce].length;le++)n.deleteFramebuffer(ee.__webglFramebuffer[ce][le]);else n.deleteFramebuffer(ee.__webglFramebuffer[ce]);ee.__webglDepthbuffer&&n.deleteRenderbuffer(ee.__webglDepthbuffer[ce])}else{if(Array.isArray(ee.__webglFramebuffer))for(let ce=0;ce<ee.__webglFramebuffer.length;ce++)n.deleteFramebuffer(ee.__webglFramebuffer[ce]);else n.deleteFramebuffer(ee.__webglFramebuffer);if(ee.__webglDepthbuffer&&n.deleteRenderbuffer(ee.__webglDepthbuffer),ee.__webglMultisampledFramebuffer&&n.deleteFramebuffer(ee.__webglMultisampledFramebuffer),ee.__webglColorRenderbuffer)for(let ce=0;ce<ee.__webglColorRenderbuffer.length;ce++)ee.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(ee.__webglColorRenderbuffer[ce]);ee.__webglDepthRenderbuffer&&n.deleteRenderbuffer(ee.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let ce=0,le=A.length;ce<le;ce++){const Fe=i.get(A[ce]);Fe.__webglTexture&&(n.deleteTexture(Fe.__webglTexture),o.memory.textures--),i.remove(A[ce])}i.remove(A),i.remove(D)}let R=0;function H(){R=0}function P(){const D=R;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),R+=1,D}function U(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function N(D,A){const ee=i.get(D);if(D.isVideoTexture&&Be(D),D.isRenderTargetTexture===!1&&D.version>0&&ee.__version!==D.version){const he=D.image;if(he===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(ee,D,A);return}}t.bindTexture(n.TEXTURE_2D,ee.__webglTexture,n.TEXTURE0+A)}function I(D,A){const ee=i.get(D);if(D.version>0&&ee.__version!==D.version){X(ee,D,A);return}t.bindTexture(n.TEXTURE_2D_ARRAY,ee.__webglTexture,n.TEXTURE0+A)}function q(D,A){const ee=i.get(D);if(D.version>0&&ee.__version!==D.version){X(ee,D,A);return}t.bindTexture(n.TEXTURE_3D,ee.__webglTexture,n.TEXTURE0+A)}function B(D,A){const ee=i.get(D);if(D.version>0&&ee.__version!==D.version){W(ee,D,A);return}t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture,n.TEXTURE0+A)}const V={[Ha]:n.REPEAT,[Nn]:n.CLAMP_TO_EDGE,[Ga]:n.MIRRORED_REPEAT},K={[on]:n.NEAREST,[Mo]:n.NEAREST_MIPMAP_NEAREST,[na]:n.NEAREST_MIPMAP_LINEAR,[dn]:n.LINEAR,[Hd]:n.LINEAR_MIPMAP_NEAREST,[Fr]:n.LINEAR_MIPMAP_LINEAR},k={[eu]:n.NEVER,[au]:n.ALWAYS,[tu]:n.LESS,[_c]:n.LEQUAL,[nu]:n.EQUAL,[su]:n.GEQUAL,[iu]:n.GREATER,[ru]:n.NOTEQUAL};function G(D,A,ee){if(ee?(n.texParameteri(D,n.TEXTURE_WRAP_S,V[A.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,V[A.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,V[A.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,K[A.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,K[A.minFilter])):(n.texParameteri(D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(A.wrapS!==Nn||A.wrapT!==Nn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(D,n.TEXTURE_MAG_FILTER,y(A.magFilter)),n.texParameteri(D,n.TEXTURE_MIN_FILTER,y(A.minFilter)),A.minFilter!==on&&A.minFilter!==dn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,k[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const he=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===on||A.minFilter!==na&&A.minFilter!==Fr||A.type===hi&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===Ur&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||i.get(A).__currentAnisotropy)&&(n.texParameterf(D,he.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy)}}function F(D,A){let ee=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",v));const he=A.source;let ce=g.get(he);ce===void 0&&(ce={},g.set(he,ce));const le=U(A);if(le!==D.__cacheKey){ce[le]===void 0&&(ce[le]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,ee=!0),ce[le].usedTimes++;const Fe=ce[D.__cacheKey];Fe!==void 0&&(ce[D.__cacheKey].usedTimes--,Fe.usedTimes===0&&b(A)),D.__cacheKey=le,D.__webglTexture=ce[le].texture}return ee}function X(D,A,ee){let he=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(he=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(he=n.TEXTURE_3D);const ce=F(D,A),le=A.source;t.bindTexture(he,D.__webglTexture,n.TEXTURE0+ee);const Fe=i.get(le);if(le.version!==Fe.__version||ce===!0){t.activeTexture(n.TEXTURE0+ee);const xe=bt.getPrimaries(bt.workingColorSpace),De=A.colorSpace===Mn?null:bt.getPrimaries(A.colorSpace),Ue=A.colorSpace===Mn||xe===De?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);const et=p(A)&&h(A.image)===!1;let ue=E(A.image,et,!1,r.maxTextureSize);ue=ze(A,ue);const ot=h(ue)||a,tt=s.convert(A.format,A.colorSpace);let Je=s.convert(A.type),We=m(A.internalFormat,tt,Je,A.colorSpace,A.isVideoTexture);G(he,A,ot);let Ie;const Z=A.mipmaps,Se=a&&A.isVideoTexture!==!0&&We!==gc,He=Fe.__version===void 0||ce===!0,Ce=S(A,ue,ot);if(A.isDepthTexture)We=n.DEPTH_COMPONENT,a?A.type===hi?We=n.DEPTH_COMPONENT32F:A.type===fi?We=n.DEPTH_COMPONENT24:A.type===Fi?We=n.DEPTH24_STENCIL8:We=n.DEPTH_COMPONENT16:A.type===hi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Ui&&We===n.DEPTH_COMPONENT&&A.type!==Za&&A.type!==fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=fi,Je=s.convert(A.type)),A.format===mr&&We===n.DEPTH_COMPONENT&&(We=n.DEPTH_STENCIL,A.type!==Fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Fi,Je=s.convert(A.type))),He&&(Se?t.texStorage2D(n.TEXTURE_2D,1,We,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,We,ue.width,ue.height,0,tt,Je,null));else if(A.isDataTexture)if(Z.length>0&&ot){Se&&He&&t.texStorage2D(n.TEXTURE_2D,Ce,We,Z[0].width,Z[0].height);for(let oe=0,O=Z.length;oe<O;oe++)Ie=Z[oe],Se?t.texSubImage2D(n.TEXTURE_2D,oe,0,0,Ie.width,Ie.height,tt,Je,Ie.data):t.texImage2D(n.TEXTURE_2D,oe,We,Ie.width,Ie.height,0,tt,Je,Ie.data);A.generateMipmaps=!1}else Se?(He&&t.texStorage2D(n.TEXTURE_2D,Ce,We,ue.width,ue.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue.width,ue.height,tt,Je,ue.data)):t.texImage2D(n.TEXTURE_2D,0,We,ue.width,ue.height,0,tt,Je,ue.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Se&&He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ce,We,Z[0].width,Z[0].height,ue.depth);for(let oe=0,O=Z.length;oe<O;oe++)Ie=Z[oe],A.format!==Fn?tt!==null?Se?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,Ie.width,Ie.height,ue.depth,tt,Ie.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,We,Ie.width,Ie.height,ue.depth,0,Ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,Ie.width,Ie.height,ue.depth,tt,Je,Ie.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,We,Ie.width,Ie.height,ue.depth,0,tt,Je,Ie.data)}else{Se&&He&&t.texStorage2D(n.TEXTURE_2D,Ce,We,Z[0].width,Z[0].height);for(let oe=0,O=Z.length;oe<O;oe++)Ie=Z[oe],A.format!==Fn?tt!==null?Se?t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,Ie.width,Ie.height,tt,Ie.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,We,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?t.texSubImage2D(n.TEXTURE_2D,oe,0,0,Ie.width,Ie.height,tt,Je,Ie.data):t.texImage2D(n.TEXTURE_2D,oe,We,Ie.width,Ie.height,0,tt,Je,Ie.data)}else if(A.isDataArrayTexture)Se?(He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ce,We,ue.width,ue.height,ue.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,tt,Je,ue.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,We,ue.width,ue.height,ue.depth,0,tt,Je,ue.data);else if(A.isData3DTexture)Se?(He&&t.texStorage3D(n.TEXTURE_3D,Ce,We,ue.width,ue.height,ue.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,tt,Je,ue.data)):t.texImage3D(n.TEXTURE_3D,0,We,ue.width,ue.height,ue.depth,0,tt,Je,ue.data);else if(A.isFramebufferTexture){if(He)if(Se)t.texStorage2D(n.TEXTURE_2D,Ce,We,ue.width,ue.height);else{let oe=ue.width,O=ue.height;for(let fe=0;fe<Ce;fe++)t.texImage2D(n.TEXTURE_2D,fe,We,oe,O,0,tt,Je,null),oe>>=1,O>>=1}}else if(Z.length>0&&ot){Se&&He&&t.texStorage2D(n.TEXTURE_2D,Ce,We,Z[0].width,Z[0].height);for(let oe=0,O=Z.length;oe<O;oe++)Ie=Z[oe],Se?t.texSubImage2D(n.TEXTURE_2D,oe,0,0,tt,Je,Ie):t.texImage2D(n.TEXTURE_2D,oe,We,tt,Je,Ie);A.generateMipmaps=!1}else Se?(He&&t.texStorage2D(n.TEXTURE_2D,Ce,We,ue.width,ue.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,tt,Je,ue)):t.texImage2D(n.TEXTURE_2D,0,We,tt,Je,ue);T(A,ot)&&u(he),Fe.__version=le.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function W(D,A,ee){if(A.image.length!==6)return;const he=F(D,A),ce=A.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+ee);const le=i.get(ce);if(ce.version!==le.__version||he===!0){t.activeTexture(n.TEXTURE0+ee);const Fe=bt.getPrimaries(bt.workingColorSpace),xe=A.colorSpace===Mn?null:bt.getPrimaries(A.colorSpace),De=A.colorSpace===Mn||Fe===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Ue=A.isCompressedTexture||A.image[0].isCompressedTexture,et=A.image[0]&&A.image[0].isDataTexture,ue=[];for(let oe=0;oe<6;oe++)!Ue&&!et?ue[oe]=E(A.image[oe],!1,!0,r.maxCubemapSize):ue[oe]=et?A.image[oe].image:A.image[oe],ue[oe]=ze(A,ue[oe]);const ot=ue[0],tt=h(ot)||a,Je=s.convert(A.format,A.colorSpace),We=s.convert(A.type),Ie=m(A.internalFormat,Je,We,A.colorSpace),Z=a&&A.isVideoTexture!==!0,Se=le.__version===void 0||he===!0;let He=S(A,ot,tt);G(n.TEXTURE_CUBE_MAP,A,tt);let Ce;if(Ue){Z&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,He,Ie,ot.width,ot.height);for(let oe=0;oe<6;oe++){Ce=ue[oe].mipmaps;for(let O=0;O<Ce.length;O++){const fe=Ce[O];A.format!==Fn?Je!==null?Z?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O,0,0,fe.width,fe.height,Je,fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O,Ie,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O,0,0,fe.width,fe.height,Je,We,fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O,Ie,fe.width,fe.height,0,Je,We,fe.data)}}}else{Ce=A.mipmaps,Z&&Se&&(Ce.length>0&&He++,t.texStorage2D(n.TEXTURE_CUBE_MAP,He,Ie,ue[0].width,ue[0].height));for(let oe=0;oe<6;oe++)if(et){Z?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ue[oe].width,ue[oe].height,Je,We,ue[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ie,ue[oe].width,ue[oe].height,0,Je,We,ue[oe].data);for(let O=0;O<Ce.length;O++){const ve=Ce[O].image[oe].image;Z?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O+1,0,0,ve.width,ve.height,Je,We,ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O+1,Ie,ve.width,ve.height,0,Je,We,ve.data)}}else{Z?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Je,We,ue[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ie,Je,We,ue[oe]);for(let O=0;O<Ce.length;O++){const fe=Ce[O];Z?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O+1,0,0,Je,We,fe.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,O+1,Ie,Je,We,fe.image[oe])}}}T(A,tt)&&u(n.TEXTURE_CUBE_MAP),le.__version=ce.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function Q(D,A,ee,he,ce,le){const Fe=s.convert(ee.format,ee.colorSpace),xe=s.convert(ee.type),De=m(ee.internalFormat,Fe,xe,ee.colorSpace);if(!i.get(A).__hasExternalTextures){const et=Math.max(1,A.width>>le),ue=Math.max(1,A.height>>le);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,le,De,et,ue,A.depth,0,Fe,xe,null):t.texImage2D(ce,le,De,et,ue,0,Fe,xe,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),me(A)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,he,ce,i.get(ee).__webglTexture,0,Ne(A)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,he,ce,i.get(ee).__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function j(D,A,ee){if(n.bindRenderbuffer(n.RENDERBUFFER,D),A.depthBuffer&&!A.stencilBuffer){let he=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(ee||me(A)){const ce=A.depthTexture;ce&&ce.isDepthTexture&&(ce.type===hi?he=n.DEPTH_COMPONENT32F:ce.type===fi&&(he=n.DEPTH_COMPONENT24));const le=Ne(A);me(A)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,he,A.width,A.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,le,he,A.width,A.height)}else n.renderbufferStorage(n.RENDERBUFFER,he,A.width,A.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,D)}else if(A.depthBuffer&&A.stencilBuffer){const he=Ne(A);ee&&me(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,A.width,A.height):me(A)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,D)}else{const he=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ce=0;ce<he.length;ce++){const le=he[ce],Fe=s.convert(le.format,le.colorSpace),xe=s.convert(le.type),De=m(le.internalFormat,Fe,xe,le.colorSpace),Ue=Ne(A);ee&&me(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue,De,A.width,A.height):me(A)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ue,De,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,De,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function se(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),N(A.depthTexture,0);const he=i.get(A.depthTexture).__webglTexture,ce=Ne(A);if(A.depthTexture.format===Ui)me(A)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0);else if(A.depthTexture.format===mr)me(A)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function de(D){const A=i.get(D),ee=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(ee)throw new Error("target.depthTexture not supported in Cube render targets");se(A.__webglFramebuffer,D)}else if(ee){A.__webglDepthbuffer=[];for(let he=0;he<6;he++)t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[he]),A.__webglDepthbuffer[he]=n.createRenderbuffer(),j(A.__webglDepthbuffer[he],D,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=n.createRenderbuffer(),j(A.__webglDepthbuffer,D,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(D,A,ee){const he=i.get(D);A!==void 0&&Q(he.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),ee!==void 0&&de(D)}function $(D){const A=D.texture,ee=i.get(D),he=i.get(A);D.addEventListener("dispose",w),D.isWebGLMultipleRenderTargets!==!0&&(he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture()),he.__version=A.version,o.memory.textures++);const ce=D.isWebGLCubeRenderTarget===!0,le=D.isWebGLMultipleRenderTargets===!0,Fe=h(D)||a;if(ce){ee.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(a&&A.mipmaps&&A.mipmaps.length>0){ee.__webglFramebuffer[xe]=[];for(let De=0;De<A.mipmaps.length;De++)ee.__webglFramebuffer[xe][De]=n.createFramebuffer()}else ee.__webglFramebuffer[xe]=n.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){ee.__webglFramebuffer=[];for(let xe=0;xe<A.mipmaps.length;xe++)ee.__webglFramebuffer[xe]=n.createFramebuffer()}else ee.__webglFramebuffer=n.createFramebuffer();if(le)if(r.drawBuffers){const xe=D.texture;for(let De=0,Ue=xe.length;De<Ue;De++){const et=i.get(xe[De]);et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&D.samples>0&&me(D)===!1){const xe=le?A:[A];ee.__webglMultisampledFramebuffer=n.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let De=0;De<xe.length;De++){const Ue=xe[De];ee.__webglColorRenderbuffer[De]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,ee.__webglColorRenderbuffer[De]);const et=s.convert(Ue.format,Ue.colorSpace),ue=s.convert(Ue.type),ot=m(Ue.internalFormat,et,ue,Ue.colorSpace,D.isXRRenderTarget===!0),tt=Ne(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,tt,ot,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,ee.__webglColorRenderbuffer[De])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(ee.__webglDepthRenderbuffer=n.createRenderbuffer(),j(ee.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,he.__webglTexture),G(n.TEXTURE_CUBE_MAP,A,Fe);for(let xe=0;xe<6;xe++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let De=0;De<A.mipmaps.length;De++)Q(ee.__webglFramebuffer[xe][De],D,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,De);else Q(ee.__webglFramebuffer[xe],D,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);T(A,Fe)&&u(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){const xe=D.texture;for(let De=0,Ue=xe.length;De<Ue;De++){const et=xe[De],ue=i.get(et);t.bindTexture(n.TEXTURE_2D,ue.__webglTexture),G(n.TEXTURE_2D,et,Fe),Q(ee.__webglFramebuffer,D,et,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,0),T(et,Fe)&&u(n.TEXTURE_2D)}t.unbindTexture()}else{let xe=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(a?xe=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(xe,he.__webglTexture),G(xe,A,Fe),a&&A.mipmaps&&A.mipmaps.length>0)for(let De=0;De<A.mipmaps.length;De++)Q(ee.__webglFramebuffer[De],D,A,n.COLOR_ATTACHMENT0,xe,De);else Q(ee.__webglFramebuffer,D,A,n.COLOR_ATTACHMENT0,xe,0);T(A,Fe)&&u(xe),t.unbindTexture()}D.depthBuffer&&de(D)}function Ve(D){const A=h(D)||a,ee=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let he=0,ce=ee.length;he<ce;he++){const le=ee[he];if(T(le,A)){const Fe=D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,xe=i.get(le).__webglTexture;t.bindTexture(Fe,xe),u(Fe),t.unbindTexture()}}}function be(D){if(a&&D.samples>0&&me(D)===!1){const A=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],ee=D.width,he=D.height;let ce=n.COLOR_BUFFER_BIT;const le=[],Fe=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(D),De=D.isWebGLMultipleRenderTargets===!0;if(De)for(let Ue=0;Ue<A.length;Ue++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Ue=0;Ue<A.length;Ue++){le.push(n.COLOR_ATTACHMENT0+Ue),D.depthBuffer&&le.push(Fe);const et=xe.__ignoreDepthValues!==void 0?xe.__ignoreDepthValues:!1;if(et===!1&&(D.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),De&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Ue]),et===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Fe]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Fe])),De){const ue=i.get(A[Ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,ee,he,0,0,ee,he,ce,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,le)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),De)for(let Ue=0;Ue<A.length;Ue++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Ue]);const et=i.get(A[Ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,et,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}}function Ne(D){return Math.min(r.maxSamples,D.samples)}function me(D){const A=i.get(D);return a&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Be(D){const A=o.render.frame;d.get(D)!==A&&(d.set(D,A),D.update())}function ze(D,A){const ee=D.colorSpace,he=D.format,ce=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===Va||ee!==ti&&ee!==Mn&&(bt.getTransfer(ee)===wt?a===!1?e.has("EXT_sRGB")===!0&&he===Fn?(D.format=Va,D.minFilter=dn,D.generateMipmaps=!1):A=yc.sRGBToLinear(A):(he!==Fn||ce!==_i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ee)),A}this.allocateTextureUnit=P,this.resetTextureUnits=H,this.setTexture2D=N,this.setTexture2DArray=I,this.setTexture3D=q,this.setTextureCube=B,this.rebindTextures=ae,this.setupRenderTarget=$,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=me}function lg(n,e,t){const i=t.isWebGL2;function r(s,o=Mn){let a;const c=bt.getTransfer(o);if(s===_i)return n.UNSIGNED_BYTE;if(s===uc)return n.UNSIGNED_SHORT_4_4_4_4;if(s===pc)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Gd)return n.BYTE;if(s===Vd)return n.SHORT;if(s===Za)return n.UNSIGNED_SHORT;if(s===dc)return n.INT;if(s===fi)return n.UNSIGNED_INT;if(s===hi)return n.FLOAT;if(s===Ur)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Wd)return n.ALPHA;if(s===Fn)return n.RGBA;if(s===Xd)return n.LUMINANCE;if(s===$d)return n.LUMINANCE_ALPHA;if(s===Ui)return n.DEPTH_COMPONENT;if(s===mr)return n.DEPTH_STENCIL;if(s===Va)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===qd)return n.RED;if(s===fc)return n.RED_INTEGER;if(s===Yd)return n.RG;if(s===hc)return n.RG_INTEGER;if(s===mc)return n.RGBA_INTEGER;if(s===ia||s===ra||s===sa||s===aa)if(c===wt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ia)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ra)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===sa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===aa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ia)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ra)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===sa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===aa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===So||s===Eo||s===To||s===wo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===So)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Eo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===To)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===wo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===gc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Co||s===Ao)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Co)return c===wt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ao)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Lo||s===Ro||s===Po||s===Do||s===Io||s===No||s===Fo||s===Uo||s===ko||s===Oo||s===Bo||s===zo||s===Ho||s===Go)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Lo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ro)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Po)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Do)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Io)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===No)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Fo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Uo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ko)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Oo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Bo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===zo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ho)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Go)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===oa||s===Vo||s===Wo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===oa)return c===wt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Vo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Wo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Kd||s===Xo||s===$o||s===qo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===oa)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Xo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===$o)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===qo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Fi?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class cg extends Dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class As extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dg={type:"move"};class Da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new As,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new As,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new re,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new re),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new As,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new re,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new re),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const E of e.hand.values()){const h=t.getJointPose(E,i),p=this._getHandJoint(l,E);h!==null&&(p.matrix.fromArray(h.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=h.radius),p.visible=h!==null}const d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],g=d.position.distanceTo(f.position),x=.02,M=.005;l.inputState.pinching&&g>x+M?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&g<=x-M&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dg)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new As;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class ug extends _r{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,d=null,f=null,g=null,x=null,M=null;const E=t.getContextAttributes();let h=null,p=null;const T=[],u=[],m=new xt;let S=null;const y=new Dn;y.layers.enable(1),y.viewport=new jt;const v=new Dn;v.layers.enable(2),v.viewport=new jt;const w=[y,v],_=new cg;_.layers.enable(1),_.layers.enable(2);let b=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let F=T[G];return F===void 0&&(F=new Da,T[G]=F),F.getTargetRaySpace()},this.getControllerGrip=function(G){let F=T[G];return F===void 0&&(F=new Da,T[G]=F),F.getGripSpace()},this.getHand=function(G){let F=T[G];return F===void 0&&(F=new Da,T[G]=F),F.getHandSpace()};function R(G){const F=u.indexOf(G.inputSource);if(F===-1)return;const X=T[F];X!==void 0&&(X.update(G.inputSource,G.frame,l||o),X.dispatchEvent({type:G.type,data:G.inputSource}))}function H(){r.removeEventListener("select",R),r.removeEventListener("selectstart",R),r.removeEventListener("selectend",R),r.removeEventListener("squeeze",R),r.removeEventListener("squeezestart",R),r.removeEventListener("squeezeend",R),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",P);for(let G=0;G<T.length;G++){const F=u[G];F!==null&&(u[G]=null,T[G].disconnect(F))}b=null,C=null,e.setRenderTarget(h),x=null,g=null,f=null,r=null,p=null,k.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(m.width,m.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(G){l=G},this.getBaseLayer=function(){return g!==null?g:x},this.getBinding=function(){return f},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",R),r.addEventListener("selectstart",R),r.addEventListener("selectend",R),r.addEventListener("squeeze",R),r.addEventListener("squeezestart",R),r.addEventListener("squeezeend",R),r.addEventListener("end",H),r.addEventListener("inputsourceschange",P),E.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(m),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const F={antialias:r.renderState.layers===void 0?E.antialias:!0,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};x=new XRWebGLLayer(r,t,F),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),p=new Bi(x.framebufferWidth,x.framebufferHeight,{format:Fn,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil})}else{let F=null,X=null,W=null;E.depth&&(W=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,F=E.stencil?mr:Ui,X=E.stencil?Fi:fi);const Q={colorFormat:t.RGBA8,depthFormat:W,scaleFactor:s};f=new XRWebGLBinding(r,t),g=f.createProjectionLayer(Q),r.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),p=new Bi(g.textureWidth,g.textureHeight,{format:Fn,type:_i,depthTexture:new Ic(g.textureWidth,g.textureHeight,X,void 0,void 0,void 0,void 0,void 0,void 0,F),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0});const j=e.properties.get(p);j.__ignoreDepthValues=g.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),k.setContext(r),k.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(G){for(let F=0;F<G.removed.length;F++){const X=G.removed[F],W=u.indexOf(X);W>=0&&(u[W]=null,T[W].disconnect(X))}for(let F=0;F<G.added.length;F++){const X=G.added[F];let W=u.indexOf(X);if(W===-1){for(let j=0;j<T.length;j++)if(j>=u.length){u.push(X),W=j;break}else if(u[j]===null){u[j]=X,W=j;break}if(W===-1)break}const Q=T[W];Q&&Q.connect(X)}}const U=new re,N=new re;function I(G,F,X){U.setFromMatrixPosition(F.matrixWorld),N.setFromMatrixPosition(X.matrixWorld);const W=U.distanceTo(N),Q=F.projectionMatrix.elements,j=X.projectionMatrix.elements,se=Q[14]/(Q[10]-1),de=Q[14]/(Q[10]+1),ae=(Q[9]+1)/Q[5],$=(Q[9]-1)/Q[5],Ve=(Q[8]-1)/Q[0],be=(j[8]+1)/j[0],Ne=se*Ve,me=se*be,Be=W/(-Ve+be),ze=Be*-Ve;F.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ze),G.translateZ(Be),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const D=se+Be,A=de+Be,ee=Ne-ze,he=me+(W-ze),ce=ae*de/A*D,le=$*de/A*D;G.projectionMatrix.makePerspective(ee,he,ce,le,D,A),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function q(G,F){F===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(F.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;_.near=v.near=y.near=G.near,_.far=v.far=y.far=G.far,(b!==_.near||C!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),b=_.near,C=_.far);const F=G.parent,X=_.cameras;q(_,F);for(let W=0;W<X.length;W++)q(X[W],F);X.length===2?I(_,y,v):_.projectionMatrix.copy(y.projectionMatrix),B(G,_,F)};function B(G,F,X){X===null?G.matrix.copy(F.matrixWorld):(G.matrix.copy(X.matrixWorld),G.matrix.invert(),G.matrix.multiply(F.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(F.projectionMatrix),G.projectionMatrixInverse.copy(F.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Wa*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(g===null&&x===null))return c},this.setFoveation=function(G){c=G,g!==null&&(g.fixedFoveation=G),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=G)};let V=null;function K(G,F){if(d=F.getViewerPose(l||o),M=F,d!==null){const X=d.views;x!==null&&(e.setRenderTargetFramebuffer(p,x.framebuffer),e.setRenderTarget(p));let W=!1;X.length!==_.cameras.length&&(_.cameras.length=0,W=!0);for(let Q=0;Q<X.length;Q++){const j=X[Q];let se=null;if(x!==null)se=x.getViewport(j);else{const ae=f.getViewSubImage(g,j);se=ae.viewport,Q===0&&(e.setRenderTargetTextures(p,ae.colorTexture,g.ignoreDepthValues?void 0:ae.depthStencilTexture),e.setRenderTarget(p))}let de=w[Q];de===void 0&&(de=new Dn,de.layers.enable(Q),de.viewport=new jt,w[Q]=de),de.matrix.fromArray(j.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(j.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(se.x,se.y,se.width,se.height),Q===0&&(_.matrix.copy(de.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),W===!0&&_.cameras.push(de)}}for(let X=0;X<T.length;X++){const W=u[X],Q=T[X];W!==null&&Q!==void 0&&Q.update(W,F,l||o)}V&&V(G,F),F.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:F}),M=null}const k=new Pc;k.setAnimationLoop(K),this.setAnimationLoop=function(G){V=G},this.dispose=function(){}}}function pg(n,e){function t(h,p){h.matrixAutoUpdate===!0&&h.updateMatrix(),p.value.copy(h.matrix)}function i(h,p){p.color.getRGB(h.fogColor.value,Cc(n)),p.isFog?(h.fogNear.value=p.near,h.fogFar.value=p.far):p.isFogExp2&&(h.fogDensity.value=p.density)}function r(h,p,T,u,m){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(h,p):p.isMeshToonMaterial?(s(h,p),f(h,p)):p.isMeshPhongMaterial?(s(h,p),d(h,p)):p.isMeshStandardMaterial?(s(h,p),g(h,p),p.isMeshPhysicalMaterial&&x(h,p,m)):p.isMeshMatcapMaterial?(s(h,p),M(h,p)):p.isMeshDepthMaterial?s(h,p):p.isMeshDistanceMaterial?(s(h,p),E(h,p)):p.isMeshNormalMaterial?s(h,p):p.isLineBasicMaterial?(o(h,p),p.isLineDashedMaterial&&a(h,p)):p.isPointsMaterial?c(h,p,T,u):p.isSpriteMaterial?l(h,p):p.isShadowMaterial?(h.color.value.copy(p.color),h.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(h,p){h.opacity.value=p.opacity,p.color&&h.diffuse.value.copy(p.color),p.emissive&&h.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.bumpMap&&(h.bumpMap.value=p.bumpMap,t(p.bumpMap,h.bumpMapTransform),h.bumpScale.value=p.bumpScale,p.side===pn&&(h.bumpScale.value*=-1)),p.normalMap&&(h.normalMap.value=p.normalMap,t(p.normalMap,h.normalMapTransform),h.normalScale.value.copy(p.normalScale),p.side===pn&&h.normalScale.value.negate()),p.displacementMap&&(h.displacementMap.value=p.displacementMap,t(p.displacementMap,h.displacementMapTransform),h.displacementScale.value=p.displacementScale,h.displacementBias.value=p.displacementBias),p.emissiveMap&&(h.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,h.emissiveMapTransform)),p.specularMap&&(h.specularMap.value=p.specularMap,t(p.specularMap,h.specularMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest);const T=e.get(p).envMap;if(T&&(h.envMap.value=T,h.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.reflectivity.value=p.reflectivity,h.ior.value=p.ior,h.refractionRatio.value=p.refractionRatio),p.lightMap){h.lightMap.value=p.lightMap;const u=n._useLegacyLights===!0?Math.PI:1;h.lightMapIntensity.value=p.lightMapIntensity*u,t(p.lightMap,h.lightMapTransform)}p.aoMap&&(h.aoMap.value=p.aoMap,h.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,h.aoMapTransform))}function o(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform))}function a(h,p){h.dashSize.value=p.dashSize,h.totalSize.value=p.dashSize+p.gapSize,h.scale.value=p.scale}function c(h,p,T,u){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.size.value=p.size*T,h.scale.value=u*.5,p.map&&(h.map.value=p.map,t(p.map,h.uvTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function l(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.rotation.value=p.rotation,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function d(h,p){h.specular.value.copy(p.specular),h.shininess.value=Math.max(p.shininess,1e-4)}function f(h,p){p.gradientMap&&(h.gradientMap.value=p.gradientMap)}function g(h,p){h.metalness.value=p.metalness,p.metalnessMap&&(h.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,h.metalnessMapTransform)),h.roughness.value=p.roughness,p.roughnessMap&&(h.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,h.roughnessMapTransform)),e.get(p).envMap&&(h.envMapIntensity.value=p.envMapIntensity)}function x(h,p,T){h.ior.value=p.ior,p.sheen>0&&(h.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),h.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(h.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,h.sheenColorMapTransform)),p.sheenRoughnessMap&&(h.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,h.sheenRoughnessMapTransform))),p.clearcoat>0&&(h.clearcoat.value=p.clearcoat,h.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(h.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,h.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(h.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===pn&&h.clearcoatNormalScale.value.negate())),p.iridescence>0&&(h.iridescence.value=p.iridescence,h.iridescenceIOR.value=p.iridescenceIOR,h.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(h.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,h.iridescenceMapTransform)),p.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),p.transmission>0&&(h.transmission.value=p.transmission,h.transmissionSamplerMap.value=T.texture,h.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(h.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,h.transmissionMapTransform)),h.thickness.value=p.thickness,p.thicknessMap&&(h.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=p.attenuationDistance,h.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(h.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(h.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=p.specularIntensity,h.specularColor.value.copy(p.specularColor),p.specularColorMap&&(h.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,h.specularColorMapTransform)),p.specularIntensityMap&&(h.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,h.specularIntensityMapTransform))}function M(h,p){p.matcap&&(h.matcap.value=p.matcap)}function E(h,p){const T=e.get(p).light;h.referencePosition.value.setFromMatrixPosition(T.matrixWorld),h.nearDistance.value=T.shadow.camera.near,h.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function fg(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(T,u){const m=u.program;i.uniformBlockBinding(T,m)}function l(T,u){let m=r[T.id];m===void 0&&(M(T),m=d(T),r[T.id]=m,T.addEventListener("dispose",h));const S=u.program;i.updateUBOMapping(T,S);const y=e.render.frame;s[T.id]!==y&&(g(T),s[T.id]=y)}function d(T){const u=f();T.__bindingPointIndex=u;const m=n.createBuffer(),S=T.__size,y=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,m),n.bufferData(n.UNIFORM_BUFFER,S,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,u,m),m}function f(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(T){const u=r[T.id],m=T.uniforms,S=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,u);for(let y=0,v=m.length;y<v;y++){const w=Array.isArray(m[y])?m[y]:[m[y]];for(let _=0,b=w.length;_<b;_++){const C=w[_];if(x(C,y,_,S)===!0){const R=C.__offset,H=Array.isArray(C.value)?C.value:[C.value];let P=0;for(let U=0;U<H.length;U++){const N=H[U],I=E(N);typeof N=="number"||typeof N=="boolean"?(C.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,R+P,C.__data)):N.isMatrix3?(C.__data[0]=N.elements[0],C.__data[1]=N.elements[1],C.__data[2]=N.elements[2],C.__data[3]=0,C.__data[4]=N.elements[3],C.__data[5]=N.elements[4],C.__data[6]=N.elements[5],C.__data[7]=0,C.__data[8]=N.elements[6],C.__data[9]=N.elements[7],C.__data[10]=N.elements[8],C.__data[11]=0):(N.toArray(C.__data,P),P+=I.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,R,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function x(T,u,m,S){const y=T.value,v=u+"_"+m;if(S[v]===void 0)return typeof y=="number"||typeof y=="boolean"?S[v]=y:S[v]=y.clone(),!0;{const w=S[v];if(typeof y=="number"||typeof y=="boolean"){if(w!==y)return S[v]=y,!0}else if(w.equals(y)===!1)return w.copy(y),!0}return!1}function M(T){const u=T.uniforms;let m=0;const S=16;for(let v=0,w=u.length;v<w;v++){const _=Array.isArray(u[v])?u[v]:[u[v]];for(let b=0,C=_.length;b<C;b++){const R=_[b],H=Array.isArray(R.value)?R.value:[R.value];for(let P=0,U=H.length;P<U;P++){const N=H[P],I=E(N),q=m%S;q!==0&&S-q<I.boundary&&(m+=S-q),R.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=m,m+=I.storage}}}const y=m%S;return y>0&&(m+=S-y),T.__size=m,T.__cache={},this}function E(T){const u={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(u.boundary=4,u.storage=4):T.isVector2?(u.boundary=8,u.storage=8):T.isVector3||T.isColor?(u.boundary=16,u.storage=12):T.isVector4?(u.boundary=16,u.storage=16):T.isMatrix3?(u.boundary=48,u.storage=48):T.isMatrix4?(u.boundary=64,u.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),u}function h(T){const u=T.target;u.removeEventListener("dispose",h);const m=o.indexOf(u.__bindingPointIndex);o.splice(m,1),n.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}function p(){for(const T in r)n.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class Bc{constructor(e={}){const{canvas:t=lu(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let g;i!==null?g=i.getContextAttributes().alpha:g=o;const x=new Uint32Array(4),M=new Int32Array(4);let E=null,h=null;const p=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Kt,this._useLegacyLights=!1,this.toneMapping=vi,this.toneMappingExposure=1;const u=this;let m=!1,S=0,y=0,v=null,w=-1,_=null;const b=new jt,C=new jt;let R=null;const H=new Mt(0);let P=0,U=t.width,N=t.height,I=1,q=null,B=null;const V=new jt(0,0,U,N),K=new jt(0,0,U,N);let k=!1;const G=new Rc;let F=!1,X=!1,W=null;const Q=new Zt,j=new xt,se=new re,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ae(){return v===null?I:1}let $=i;function Ve(L,Y){for(let te=0;te<L.length;te++){const ne=L[te],J=t.getContext(ne,Y);if(J!==null)return J}return null}try{const L={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ja}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",fe,!1),$===null){const Y=["webgl2","webgl","experimental-webgl"];if(u.isWebGL1Renderer===!0&&Y.shift(),$=Ve(Y,L),$===null)throw Ve(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),$.getShaderPrecisionFormat===void 0&&($.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let be,Ne,me,Be,ze,D,A,ee,he,ce,le,Fe,xe,De,Ue,et,ue,ot,tt,Je,We,Ie,Z,Se;function He(){be=new Sh($),Ne=new vh($,be,e),be.init(Ne),Ie=new lg($,be,Ne),me=new ag($,be,Ne),Be=new wh($),ze=new $m,D=new og($,be,me,ze,Ne,Ie,Be),A=new xh(u),ee=new Mh(u),he=new Iu($,Ne),Z=new mh($,be,he,Ne),ce=new Eh($,he,Be,Z),le=new Rh($,ce,he,Be),tt=new Lh($,Ne,D),et=new _h(ze),Fe=new Xm(u,A,ee,be,Ne,Z,et),xe=new pg(u,ze),De=new Ym,Ue=new eg(be,Ne),ot=new hh(u,A,ee,me,le,g,c),ue=new sg(u,le,Ne),Se=new fg($,Be,Ne,me),Je=new gh($,be,Be,Ne),We=new Th($,be,Be,Ne),Be.programs=Fe.programs,u.capabilities=Ne,u.extensions=be,u.properties=ze,u.renderLists=De,u.shadowMap=ue,u.state=me,u.info=Be}He();const Ce=new ug(u,$);this.xr=Ce,this.getContext=function(){return $},this.getContextAttributes=function(){return $.getContextAttributes()},this.forceContextLoss=function(){const L=be.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=be.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(L){L!==void 0&&(I=L,this.setSize(U,N,!1))},this.getSize=function(L){return L.set(U,N)},this.setSize=function(L,Y,te=!0){if(Ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=L,N=Y,t.width=Math.floor(L*I),t.height=Math.floor(Y*I),te===!0&&(t.style.width=L+"px",t.style.height=Y+"px"),this.setViewport(0,0,L,Y)},this.getDrawingBufferSize=function(L){return L.set(U*I,N*I).floor()},this.setDrawingBufferSize=function(L,Y,te){U=L,N=Y,I=te,t.width=Math.floor(L*te),t.height=Math.floor(Y*te),this.setViewport(0,0,L,Y)},this.getCurrentViewport=function(L){return L.copy(b)},this.getViewport=function(L){return L.copy(V)},this.setViewport=function(L,Y,te,ne){L.isVector4?V.set(L.x,L.y,L.z,L.w):V.set(L,Y,te,ne),me.viewport(b.copy(V).multiplyScalar(I).floor())},this.getScissor=function(L){return L.copy(K)},this.setScissor=function(L,Y,te,ne){L.isVector4?K.set(L.x,L.y,L.z,L.w):K.set(L,Y,te,ne),me.scissor(C.copy(K).multiplyScalar(I).floor())},this.getScissorTest=function(){return k},this.setScissorTest=function(L){me.setScissorTest(k=L)},this.setOpaqueSort=function(L){q=L},this.setTransparentSort=function(L){B=L},this.getClearColor=function(L){return L.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(L=!0,Y=!0,te=!0){let ne=0;if(L){let J=!1;if(v!==null){const Ae=v.texture.format;J=Ae===mc||Ae===hc||Ae===fc}if(J){const Ae=v.texture.type,Oe=Ae===_i||Ae===fi||Ae===Za||Ae===Fi||Ae===uc||Ae===pc,qe=ot.getClearColor(),Ye=ot.getClearAlpha(),Ke=qe.r,Qe=qe.g,st=qe.b;Oe?(x[0]=Ke,x[1]=Qe,x[2]=st,x[3]=Ye,$.clearBufferuiv($.COLOR,0,x)):(M[0]=Ke,M[1]=Qe,M[2]=st,M[3]=Ye,$.clearBufferiv($.COLOR,0,M))}else ne|=$.COLOR_BUFFER_BIT}Y&&(ne|=$.DEPTH_BUFFER_BIT),te&&(ne|=$.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),De.dispose(),Ue.dispose(),ze.dispose(),A.dispose(),ee.dispose(),le.dispose(),Z.dispose(),Se.dispose(),Fe.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",pe),Ce.removeEventListener("sessionend",Le),W&&(W.dispose(),W=null),ye.stop()};function oe(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),m=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),m=!1;const L=Be.autoReset,Y=ue.enabled,te=ue.autoUpdate,ne=ue.needsUpdate,J=ue.type;He(),Be.autoReset=L,ue.enabled=Y,ue.autoUpdate=te,ue.needsUpdate=ne,ue.type=J}function fe(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function ve(L){const Y=L.target;Y.removeEventListener("dispose",ve),Ee(Y)}function Ee(L){Re(L),ze.remove(L)}function Re(L){const Y=ze.get(L).programs;Y!==void 0&&(Y.forEach(function(te){Fe.releaseProgram(te)}),L.isShaderMaterial&&Fe.releaseShaderCache(L))}this.renderBufferDirect=function(L,Y,te,ne,J,Ae){Y===null&&(Y=de);const Oe=J.isMesh&&J.matrixWorld.determinant()<0,qe=nn(L,Y,te,ne,J);me.setMaterial(ne,Oe);let Ye=te.index,Ke=1;if(ne.wireframe===!0){if(Ye=ce.getWireframeAttribute(te),Ye===void 0)return;Ke=2}const Qe=te.drawRange,st=te.attributes.position;let Ct=Qe.start*Ke,St=(Qe.start+Qe.count)*Ke;Ae!==null&&(Ct=Math.max(Ct,Ae.start*Ke),St=Math.min(St,(Ae.start+Ae.count)*Ke)),Ye!==null?(Ct=Math.max(Ct,0),St=Math.min(St,Ye.count)):st!=null&&(Ct=Math.max(Ct,0),St=Math.min(St,st.count));const Rt=St-Ct;if(Rt<0||Rt===1/0)return;Z.setup(J,ne,qe,te,Ye);let kn,Et=Je;if(Ye!==null&&(kn=he.get(Ye),Et=We,Et.setIndex(kn)),J.isMesh)ne.wireframe===!0?(me.setLineWidth(ne.wireframeLinewidth*ae()),Et.setMode($.LINES)):Et.setMode($.TRIANGLES);else if(J.isLine){let rt=ne.linewidth;rt===void 0&&(rt=1),me.setLineWidth(rt*ae()),J.isLineSegments?Et.setMode($.LINES):J.isLineLoop?Et.setMode($.LINE_LOOP):Et.setMode($.LINE_STRIP)}else J.isPoints?Et.setMode($.POINTS):J.isSprite&&Et.setMode($.TRIANGLES);if(J.isBatchedMesh)Et.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)Et.renderInstances(Ct,Rt,J.count);else if(te.isInstancedBufferGeometry){const rt=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,bi=Math.min(te.instanceCount,rt);Et.renderInstances(Ct,Rt,bi)}else Et.render(Ct,Rt)};function $e(L,Y,te){L.transparent===!0&&L.side===In&&L.forceSinglePass===!1?(L.side=pn,L.needsUpdate=!0,Lt(L,Y,te),L.side=xi,L.needsUpdate=!0,Lt(L,Y,te),L.side=In):Lt(L,Y,te)}this.compile=function(L,Y,te=null){te===null&&(te=L),h=Ue.get(te),h.init(),T.push(h),te.traverseVisible(function(J){J.isLight&&J.layers.test(Y.layers)&&(h.pushLight(J),J.castShadow&&h.pushShadow(J))}),L!==te&&L.traverseVisible(function(J){J.isLight&&J.layers.test(Y.layers)&&(h.pushLight(J),J.castShadow&&h.pushShadow(J))}),h.setupLights(u._useLegacyLights);const ne=new Set;return L.traverse(function(J){const Ae=J.material;if(Ae)if(Array.isArray(Ae))for(let Oe=0;Oe<Ae.length;Oe++){const qe=Ae[Oe];$e(qe,te,J),ne.add(qe)}else $e(Ae,te,J),ne.add(Ae)}),T.pop(),h=null,ne},this.compileAsync=function(L,Y,te=null){const ne=this.compile(L,Y,te);return new Promise(J=>{function Ae(){if(ne.forEach(function(Oe){ze.get(Oe).currentProgram.isReady()&&ne.delete(Oe)}),ne.size===0){J(L);return}setTimeout(Ae,10)}be.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let nt=null;function mt(L){nt&&nt(L)}function pe(){ye.stop()}function Le(){ye.start()}const ye=new Pc;ye.setAnimationLoop(mt),typeof self<"u"&&ye.setContext(self),this.setAnimationLoop=function(L){nt=L,Ce.setAnimationLoop(L),L===null?ye.stop():ye.start()},Ce.addEventListener("sessionstart",pe),Ce.addEventListener("sessionend",Le),this.render=function(L,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(m===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(Y),Y=Ce.getCamera()),L.isScene===!0&&L.onBeforeRender(u,L,Y,v),h=Ue.get(L,T.length),h.init(),T.push(h),Q.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),G.setFromProjectionMatrix(Q),X=this.localClippingEnabled,F=et.init(this.clippingPlanes,X),E=De.get(L,p.length),E.init(),p.push(E),Me(L,Y,0,u.sortObjects),E.finish(),u.sortObjects===!0&&E.sort(q,B),this.info.render.frame++,F===!0&&et.beginShadows();const te=h.state.shadowsArray;if(ue.render(te,L,Y),F===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset(),ot.render(E,L),h.setupLights(u._useLegacyLights),Y.isArrayCamera){const ne=Y.cameras;for(let J=0,Ae=ne.length;J<Ae;J++){const Oe=ne[J];je(E,L,Oe,Oe.viewport)}}else je(E,L,Y);v!==null&&(D.updateMultisampleRenderTarget(v),D.updateRenderTargetMipmap(v)),L.isScene===!0&&L.onAfterRender(u,L,Y),Z.resetDefaultState(),w=-1,_=null,T.pop(),T.length>0?h=T[T.length-1]:h=null,p.pop(),p.length>0?E=p[p.length-1]:E=null};function Me(L,Y,te,ne){if(L.visible===!1)return;if(L.layers.test(Y.layers)){if(L.isGroup)te=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(Y);else if(L.isLight)h.pushLight(L),L.castShadow&&h.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||G.intersectsSprite(L)){ne&&se.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Q);const Oe=le.update(L),qe=L.material;qe.visible&&E.push(L,Oe,qe,te,se.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||G.intersectsObject(L))){const Oe=le.update(L),qe=L.material;if(ne&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),se.copy(L.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),se.copy(Oe.boundingSphere.center)),se.applyMatrix4(L.matrixWorld).applyMatrix4(Q)),Array.isArray(qe)){const Ye=Oe.groups;for(let Ke=0,Qe=Ye.length;Ke<Qe;Ke++){const st=Ye[Ke],Ct=qe[st.materialIndex];Ct&&Ct.visible&&E.push(L,Oe,Ct,te,se.z,st)}}else qe.visible&&E.push(L,Oe,qe,te,se.z,null)}}const Ae=L.children;for(let Oe=0,qe=Ae.length;Oe<qe;Oe++)Me(Ae[Oe],Y,te,ne)}function je(L,Y,te,ne){const J=L.opaque,Ae=L.transmissive,Oe=L.transparent;h.setupLightsView(te),F===!0&&et.setGlobalState(u.clippingPlanes,te),Ae.length>0&&ke(J,Ae,Y,te),ne&&me.viewport(b.copy(ne)),J.length>0&&it(J,Y,te),Ae.length>0&&it(Ae,Y,te),Oe.length>0&&it(Oe,Y,te),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function ke(L,Y,te,ne){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;const Ae=Ne.isWebGL2;W===null&&(W=new Bi(1,1,{generateMipmaps:!0,type:be.has("EXT_color_buffer_half_float")?Ur:_i,minFilter:Fr,samples:Ae?4:0})),u.getDrawingBufferSize(j),Ae?W.setSize(j.x,j.y):W.setSize(Xa(j.x),Xa(j.y));const Oe=u.getRenderTarget();u.setRenderTarget(W),u.getClearColor(H),P=u.getClearAlpha(),P<1&&u.setClearColor(16777215,.5),u.clear();const qe=u.toneMapping;u.toneMapping=vi,it(L,te,ne),D.updateMultisampleRenderTarget(W),D.updateRenderTargetMipmap(W);let Ye=!1;for(let Ke=0,Qe=Y.length;Ke<Qe;Ke++){const st=Y[Ke],Ct=st.object,St=st.geometry,Rt=st.material,kn=st.group;if(Rt.side===In&&Ct.layers.test(ne.layers)){const Et=Rt.side;Rt.side=pn,Rt.needsUpdate=!0,Ft(Ct,te,ne,St,Rt,kn),Rt.side=Et,Rt.needsUpdate=!0,Ye=!0}}Ye===!0&&(D.updateMultisampleRenderTarget(W),D.updateRenderTargetMipmap(W)),u.setRenderTarget(Oe),u.setClearColor(H,P),u.toneMapping=qe}function it(L,Y,te){const ne=Y.isScene===!0?Y.overrideMaterial:null;for(let J=0,Ae=L.length;J<Ae;J++){const Oe=L[J],qe=Oe.object,Ye=Oe.geometry,Ke=ne===null?Oe.material:ne,Qe=Oe.group;qe.layers.test(te.layers)&&Ft(qe,Y,te,Ye,Ke,Qe)}}function Ft(L,Y,te,ne,J,Ae){L.onBeforeRender(u,Y,te,ne,J,Ae),L.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),J.onBeforeRender(u,Y,te,ne,L,Ae),J.transparent===!0&&J.side===In&&J.forceSinglePass===!1?(J.side=pn,J.needsUpdate=!0,u.renderBufferDirect(te,Y,ne,J,L,Ae),J.side=xi,J.needsUpdate=!0,u.renderBufferDirect(te,Y,ne,J,L,Ae),J.side=In):u.renderBufferDirect(te,Y,ne,J,L,Ae),L.onAfterRender(u,Y,te,ne,J,Ae)}function Lt(L,Y,te){Y.isScene!==!0&&(Y=de);const ne=ze.get(L),J=h.state.lights,Ae=h.state.shadowsArray,Oe=J.state.version,qe=Fe.getParameters(L,J.state,Ae,Y,te),Ye=Fe.getProgramCacheKey(qe);let Ke=ne.programs;ne.environment=L.isMeshStandardMaterial?Y.environment:null,ne.fog=Y.fog,ne.envMap=(L.isMeshStandardMaterial?ee:A).get(L.envMap||ne.environment),Ke===void 0&&(L.addEventListener("dispose",ve),Ke=new Map,ne.programs=Ke);let Qe=Ke.get(Ye);if(Qe!==void 0){if(ne.currentProgram===Qe&&ne.lightsStateVersion===Oe)return zt(L,qe),Qe}else qe.uniforms=Fe.getUniforms(L),L.onBuild(te,qe,u),L.onBeforeCompile(qe,u),Qe=Fe.acquireProgram(qe,Ye),Ke.set(Ye,Qe),ne.uniforms=qe.uniforms;const st=ne.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(st.clippingPlanes=et.uniform),zt(L,qe),ne.needsLights=yi(L),ne.lightsStateVersion=Oe,ne.needsLights&&(st.ambientLightColor.value=J.state.ambient,st.lightProbe.value=J.state.probe,st.directionalLights.value=J.state.directional,st.directionalLightShadows.value=J.state.directionalShadow,st.spotLights.value=J.state.spot,st.spotLightShadows.value=J.state.spotShadow,st.rectAreaLights.value=J.state.rectArea,st.ltc_1.value=J.state.rectAreaLTC1,st.ltc_2.value=J.state.rectAreaLTC2,st.pointLights.value=J.state.point,st.pointLightShadows.value=J.state.pointShadow,st.hemisphereLights.value=J.state.hemi,st.directionalShadowMap.value=J.state.directionalShadowMap,st.directionalShadowMatrix.value=J.state.directionalShadowMatrix,st.spotShadowMap.value=J.state.spotShadowMap,st.spotLightMatrix.value=J.state.spotLightMatrix,st.spotLightMap.value=J.state.spotLightMap,st.pointShadowMap.value=J.state.pointShadowMap,st.pointShadowMatrix.value=J.state.pointShadowMatrix),ne.currentProgram=Qe,ne.uniformsList=null,Qe}function Jt(L){if(L.uniformsList===null){const Y=L.currentProgram.getUniforms();L.uniformsList=Ps.seqWithValue(Y.seq,L.uniforms)}return L.uniformsList}function zt(L,Y){const te=ze.get(L);te.outputColorSpace=Y.outputColorSpace,te.batching=Y.batching,te.instancing=Y.instancing,te.instancingColor=Y.instancingColor,te.skinning=Y.skinning,te.morphTargets=Y.morphTargets,te.morphNormals=Y.morphNormals,te.morphColors=Y.morphColors,te.morphTargetsCount=Y.morphTargetsCount,te.numClippingPlanes=Y.numClippingPlanes,te.numIntersection=Y.numClipIntersection,te.vertexAlphas=Y.vertexAlphas,te.vertexTangents=Y.vertexTangents,te.toneMapping=Y.toneMapping}function nn(L,Y,te,ne,J){Y.isScene!==!0&&(Y=de),D.resetTextureUnits();const Ae=Y.fog,Oe=ne.isMeshStandardMaterial?Y.environment:null,qe=v===null?u.outputColorSpace:v.isXRRenderTarget===!0?v.texture.colorSpace:ti,Ye=(ne.isMeshStandardMaterial?ee:A).get(ne.envMap||Oe),Ke=ne.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,Qe=!!te.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),st=!!te.morphAttributes.position,Ct=!!te.morphAttributes.normal,St=!!te.morphAttributes.color;let Rt=vi;ne.toneMapped&&(v===null||v.isXRRenderTarget===!0)&&(Rt=u.toneMapping);const kn=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Et=kn!==void 0?kn.length:0,rt=ze.get(ne),bi=h.state.lights;if(F===!0&&(X===!0||L!==_)){const Qt=L===_&&ne.id===w;et.setState(ne,L,Qt)}let yt=!1;ne.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==bi.state.version||rt.outputColorSpace!==qe||J.isBatchedMesh&&rt.batching===!1||!J.isBatchedMesh&&rt.batching===!0||J.isInstancedMesh&&rt.instancing===!1||!J.isInstancedMesh&&rt.instancing===!0||J.isSkinnedMesh&&rt.skinning===!1||!J.isSkinnedMesh&&rt.skinning===!0||J.isInstancedMesh&&rt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&rt.instancingColor===!1&&J.instanceColor!==null||rt.envMap!==Ye||ne.fog===!0&&rt.fog!==Ae||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==et.numPlanes||rt.numIntersection!==et.numIntersection)||rt.vertexAlphas!==Ke||rt.vertexTangents!==Qe||rt.morphTargets!==st||rt.morphNormals!==Ct||rt.morphColors!==St||rt.toneMapping!==Rt||Ne.isWebGL2===!0&&rt.morphTargetsCount!==Et)&&(yt=!0):(yt=!0,rt.__version=ne.version);let Sn=rt.currentProgram;yt===!0&&(Sn=Lt(ne,Y,J));let Wn=!1,rn=!1,On=!1;const At=Sn.getUniforms(),It=rt.uniforms;if(me.useProgram(Sn.program)&&(Wn=!0,rn=!0,On=!0),ne.id!==w&&(w=ne.id,rn=!0),Wn||_!==L){At.setValue($,"projectionMatrix",L.projectionMatrix),At.setValue($,"viewMatrix",L.matrixWorldInverse);const Qt=At.map.cameraPosition;Qt!==void 0&&Qt.setValue($,se.setFromMatrixPosition(L.matrixWorld)),Ne.logarithmicDepthBuffer&&At.setValue($,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&At.setValue($,"isOrthographic",L.isOrthographicCamera===!0),_!==L&&(_=L,rn=!0,On=!0)}if(J.isSkinnedMesh){At.setOptional($,J,"bindMatrix"),At.setOptional($,J,"bindMatrixInverse");const Qt=J.skeleton;Qt&&(Ne.floatVertexTextures?(Qt.boneTexture===null&&Qt.computeBoneTexture(),At.setValue($,"boneTexture",Qt.boneTexture,D)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(At.setOptional($,J,"batchingTexture"),At.setValue($,"batchingTexture",J._matricesTexture,D));const vn=te.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0&&Ne.isWebGL2===!0)&&tt.update(J,te,Sn),(rn||rt.receiveShadow!==J.receiveShadow)&&(rt.receiveShadow=J.receiveShadow,At.setValue($,"receiveShadow",J.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(It.envMap.value=Ye,It.flipEnvMap.value=Ye.isCubeTexture&&Ye.isRenderTargetTexture===!1?-1:1),rn&&(At.setValue($,"toneMappingExposure",u.toneMappingExposure),rt.needsLights&&ii(It,On),Ae&&ne.fog===!0&&xe.refreshFogUniforms(It,Ae),xe.refreshMaterialUniforms(It,ne,I,N,W),Ps.upload($,Jt(rt),It,D)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Ps.upload($,Jt(rt),It,D),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&At.setValue($,"center",J.center),At.setValue($,"modelViewMatrix",J.modelViewMatrix),At.setValue($,"normalMatrix",J.normalMatrix),At.setValue($,"modelMatrix",J.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){const Qt=ne.uniformsGroups;for(let ri=0,Mi=Qt.length;ri<Mi;ri++)if(Ne.isWebGL2){const ln=Qt[ri];Se.update(ln,Sn),Se.bind(ln,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function ii(L,Y){L.ambientLightColor.needsUpdate=Y,L.lightProbe.needsUpdate=Y,L.directionalLights.needsUpdate=Y,L.directionalLightShadows.needsUpdate=Y,L.pointLights.needsUpdate=Y,L.pointLightShadows.needsUpdate=Y,L.spotLights.needsUpdate=Y,L.spotLightShadows.needsUpdate=Y,L.rectAreaLights.needsUpdate=Y,L.hemisphereLights.needsUpdate=Y}function yi(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(L,Y,te){ze.get(L.texture).__webglTexture=Y,ze.get(L.depthTexture).__webglTexture=te;const ne=ze.get(L);ne.__hasExternalTextures=!0,ne.__hasExternalTextures&&(ne.__autoAllocateDepthBuffer=te===void 0,ne.__autoAllocateDepthBuffer||be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ne.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,Y){const te=ze.get(L);te.__webglFramebuffer=Y,te.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(L,Y=0,te=0){v=L,S=Y,y=te;let ne=!0,J=null,Ae=!1,Oe=!1;if(L){const Ye=ze.get(L);Ye.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer($.FRAMEBUFFER,null),ne=!1):Ye.__webglFramebuffer===void 0?D.setupRenderTarget(L):Ye.__hasExternalTextures&&D.rebindTextures(L,ze.get(L.texture).__webglTexture,ze.get(L.depthTexture).__webglTexture);const Ke=L.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Oe=!0);const Qe=ze.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Qe[Y])?J=Qe[Y][te]:J=Qe[Y],Ae=!0):Ne.isWebGL2&&L.samples>0&&D.useMultisampledRTT(L)===!1?J=ze.get(L).__webglMultisampledFramebuffer:Array.isArray(Qe)?J=Qe[te]:J=Qe,b.copy(L.viewport),C.copy(L.scissor),R=L.scissorTest}else b.copy(V).multiplyScalar(I).floor(),C.copy(K).multiplyScalar(I).floor(),R=k;if(me.bindFramebuffer($.FRAMEBUFFER,J)&&Ne.drawBuffers&&ne&&me.drawBuffers(L,J),me.viewport(b),me.scissor(C),me.setScissorTest(R),Ae){const Ye=ze.get(L.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ye.__webglTexture,te)}else if(Oe){const Ye=ze.get(L.texture),Ke=Y||0;$.framebufferTextureLayer($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,Ye.__webglTexture,te||0,Ke)}w=-1},this.readRenderTargetPixels=function(L,Y,te,ne,J,Ae,Oe){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=ze.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Oe!==void 0&&(qe=qe[Oe]),qe){me.bindFramebuffer($.FRAMEBUFFER,qe);try{const Ye=L.texture,Ke=Ye.format,Qe=Ye.type;if(Ke!==Fn&&Ie.convert(Ke)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const st=Qe===Ur&&(be.has("EXT_color_buffer_half_float")||Ne.isWebGL2&&be.has("EXT_color_buffer_float"));if(Qe!==_i&&Ie.convert(Qe)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Qe===hi&&(Ne.isWebGL2||be.has("OES_texture_float")||be.has("WEBGL_color_buffer_float")))&&!st){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=L.width-ne&&te>=0&&te<=L.height-J&&$.readPixels(Y,te,ne,J,Ie.convert(Ke),Ie.convert(Qe),Ae)}finally{const Ye=v!==null?ze.get(v).__webglFramebuffer:null;me.bindFramebuffer($.FRAMEBUFFER,Ye)}}},this.copyFramebufferToTexture=function(L,Y,te=0){const ne=Math.pow(2,-te),J=Math.floor(Y.image.width*ne),Ae=Math.floor(Y.image.height*ne);D.setTexture2D(Y,0),$.copyTexSubImage2D($.TEXTURE_2D,te,0,0,L.x,L.y,J,Ae),me.unbindTexture()},this.copyTextureToTexture=function(L,Y,te,ne=0){const J=Y.image.width,Ae=Y.image.height,Oe=Ie.convert(te.format),qe=Ie.convert(te.type);D.setTexture2D(te,0),$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,te.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,te.unpackAlignment),Y.isDataTexture?$.texSubImage2D($.TEXTURE_2D,ne,L.x,L.y,J,Ae,Oe,qe,Y.image.data):Y.isCompressedTexture?$.compressedTexSubImage2D($.TEXTURE_2D,ne,L.x,L.y,Y.mipmaps[0].width,Y.mipmaps[0].height,Oe,Y.mipmaps[0].data):$.texSubImage2D($.TEXTURE_2D,ne,L.x,L.y,Oe,qe,Y.image),ne===0&&te.generateMipmaps&&$.generateMipmap($.TEXTURE_2D),me.unbindTexture()},this.copyTextureToTexture3D=function(L,Y,te,ne,J=0){if(u.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ae=L.max.x-L.min.x+1,Oe=L.max.y-L.min.y+1,qe=L.max.z-L.min.z+1,Ye=Ie.convert(ne.format),Ke=Ie.convert(ne.type);let Qe;if(ne.isData3DTexture)D.setTexture3D(ne,0),Qe=$.TEXTURE_3D;else if(ne.isDataArrayTexture||ne.isCompressedArrayTexture)D.setTexture2DArray(ne,0),Qe=$.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,ne.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,ne.unpackAlignment);const st=$.getParameter($.UNPACK_ROW_LENGTH),Ct=$.getParameter($.UNPACK_IMAGE_HEIGHT),St=$.getParameter($.UNPACK_SKIP_PIXELS),Rt=$.getParameter($.UNPACK_SKIP_ROWS),kn=$.getParameter($.UNPACK_SKIP_IMAGES),Et=te.isCompressedTexture?te.mipmaps[J]:te.image;$.pixelStorei($.UNPACK_ROW_LENGTH,Et.width),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,Et.height),$.pixelStorei($.UNPACK_SKIP_PIXELS,L.min.x),$.pixelStorei($.UNPACK_SKIP_ROWS,L.min.y),$.pixelStorei($.UNPACK_SKIP_IMAGES,L.min.z),te.isDataTexture||te.isData3DTexture?$.texSubImage3D(Qe,J,Y.x,Y.y,Y.z,Ae,Oe,qe,Ye,Ke,Et.data):te.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),$.compressedTexSubImage3D(Qe,J,Y.x,Y.y,Y.z,Ae,Oe,qe,Ye,Et.data)):$.texSubImage3D(Qe,J,Y.x,Y.y,Y.z,Ae,Oe,qe,Ye,Ke,Et),$.pixelStorei($.UNPACK_ROW_LENGTH,st),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,Ct),$.pixelStorei($.UNPACK_SKIP_PIXELS,St),$.pixelStorei($.UNPACK_SKIP_ROWS,Rt),$.pixelStorei($.UNPACK_SKIP_IMAGES,kn),J===0&&ne.generateMipmaps&&$.generateMipmap(Qe),me.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?D.setTextureCube(L,0):L.isData3DTexture?D.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?D.setTexture2DArray(L,0):D.setTexture2D(L,0),me.unbindTexture()},this.resetState=function(){S=0,y=0,v=null,me.reset(),Z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ja?"display-p3":"srgb",t.unpackColorSpace=bt.workingColorSpace===Vs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Kt?ki:vc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ki?Kt:ti}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class hg extends Bc{}hg.prototype.isWebGL1Renderer=!0;class mg extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class gg extends fn{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vg{constructor(e,t,i=0,r=1/0){this.ray=new Sc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new eo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return qa(e,this,i,t),i.sort(Ul),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)qa(e[r],this,i,t);return i.sort(Ul),i}}function Ul(n,e){return n.distance-e.distance}function qa(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,o=r.length;s<o;s++)qa(r[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);function Ia(n,e){const[t,i,r,s,o,a]=n,[c,l,d,f,g,x]=e;return[t*c+r*l,i*c+s*l,t*d+r*f,i*d+s*f,t*g+r*x+o,i*g+s*x+a]}function _g(n){const[e,t,i,r,s,o]=n,a=e*r-t*i;if(Math.abs(a)<1e-8)return[1,0,0,1,-s,-o];const c=1/a,l=r*c,d=-t*c,f=-i*c,g=e*c,x=-(l*s+f*o),M=-(d*s+g*o);return[l,d,f,g,x,M]}function kl(n,e,t,i=1,r=1){const s=t*Math.PI/180,o=Math.cos(s),a=Math.sin(s);return[o*i,a*i,-a*r,o*r,n,e]}function mi(n,e,t){return{x:n[0]*e+n[2]*t+n[4],y:n[1]*e+n[3]*t+n[5]}}function Ii(n,e){const t=new Map,i=new Map(n.map(s=>[s.id,s]));function r(s,o=new Set){const a=t.get(s.id);if(a)return a;o.add(s.id);const c=s.parentId&&!o.has(s.parentId)?i.get(s.parentId):void 0,l=c?r(c,o):void 0,d=e==null?void 0:e.get(s.id),f=(d==null?void 0:d.dX)??0,g=(d==null?void 0:d.dY)??0,x=(d==null?void 0:d.dRotation)??0,M=(d==null?void 0:d.scaleX)??1,E=(d==null?void 0:d.scaleY)??1,h=kl(s.restX,s.restY,s.restRotation,1,1),p=l?Ia(l.bindMatrix,h):h,T=_g(p),u=mi(p,0,0),m=mi(p,s.length,0),S=l?l.bindWorldAngleDeg+s.restRotation:s.restRotation,y=kl(s.restX+f,s.restY+g,s.restRotation+x,M,E),v=l?Ia(l.worldMatrix,y):y,w=mi(v,0,0),_=mi(v,s.length,0),b=l?l.worldAngleDeg+s.restRotation+x:s.restRotation+x,C=l?l.worldScaleX*M:M,R=l?l.worldScaleY*E:E,H=Ia(v,T),P={id:s.id,name:s.name,parentId:s.parentId,bindHeadX:u.x,bindHeadY:u.y,bindTailX:m.x,bindTailY:m.y,bindWorldAngleDeg:S,bindMatrix:p,bindInverseMatrix:T,headX:w.x,headY:w.y,tailX:_.x,tailY:_.y,worldAngleDeg:b,worldScaleX:C,worldScaleY:R,worldMatrix:v,skinMatrix:H,length:s.length,color:s.color};return t.set(s.id,P),P}for(const s of n)r(s);return t}function xg(n,e,t,i,r){const s=new Map;for(const[K,k]of e.entries())s.set(K,{...k});const o=new Map(n.map(K=>[K.id,K])),a=o.get(t);if(!a)return s;const c=Ii(n,s),l=c.get(a.id);if(!l)return s;const d=a.parentId?o.get(a.parentId):void 0,f=d?c.get(d.id):void 0;if(!d||!f){const K=Math.atan2(r-l.headY,i-l.headX)*180/Math.PI,k=Ni(K-a.restRotation),G=s.get(a.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};return s.set(a.id,{...G,dRotation:k}),s}const g=f.headX,x=f.headY,M=Math.max(1,Math.hypot(l.headX-g,l.headY-x)),E=Math.max(1,a.length*l.worldScaleX),h=i-g,p=r-x,T=Math.hypot(h,p),u=Math.max(1,M+E-.01),m=Math.abs(M-E)+.01,S=Math.max(m,Math.min(u,T)),y=Math.atan2(p,h),v=Math.max(-1,Math.min(1,(M*M+S*S-E*E)/(2*M*S))),w=Math.max(-1,Math.min(1,(M*M+E*E-S*S)/(2*M*E))),_=a.ikBendPositive===!1?-1:1,b=y-_*Math.acos(v),C=Math.acos(w),R=_*(Math.PI-C),H=d.parentId?c.get(d.parentId):void 0,P=H?H.worldAngleDeg:0,U=b*180/Math.PI,N=Ni(U-P-d.restRotation),I=R*180/Math.PI,q=Ni(I-a.restRotation),B=s.get(d.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};s.set(d.id,{...B,dRotation:N});const V=s.get(a.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};return s.set(a.id,{...V,dRotation:q}),s}function Ni(n){let e=((n+180)%360+360)%360-180;return e===-180&&(e=180),e}function zc(n,e,t,i,r,s){const o=r-t,a=s-i,c=o*o+a*a;if(c<1e-6)return Math.hypot(n-t,e-i);const l=Math.max(0,Math.min(1,((n-t)*o+(e-i)*a)/c)),d=t+l*o,f=i+l*a;return Math.hypot(n-d,e-f)}function yg(n,e,t,i=10,r=10){if(t.length===0)return null;const s=e.getContext("2d");if(!s)return null;const o=e.width,a=e.height,c=s.getImageData(0,0,o,a).data;let l=o,d=a,f=0,g=0,x=!1;const M=4;for(let S=0;S<a;S+=M)for(let y=0;y<o;y+=M)c[(S*o+y)*4+3]>8&&(x=!0,y<l&&(l=y),S<d&&(d=S),y>f&&(f=y),S>g&&(g=S));x?(l=Math.max(0,l-24),d=Math.max(0,d-24),f=Math.min(o,f+24),g=Math.min(a,g+24)):(l=0,d=0,f=o,g=a);const E=Math.max(32,f-l),h=Math.max(32,g-d),p=Array.from(Ii(t).values()),T=[];for(let S=0;S<=r;S++){const y=S/r,v=d+y*h;for(let w=0;w<=i;w++){const _=w/i,b=l+_*E,C=p.map(U=>{const N=zc(b,v,U.bindHeadX,U.bindHeadY,U.bindTailX,U.bindTailY),I=1/Math.pow(Math.max(6,N),2.2);return{boneId:U.id,weight:I}});C.sort((U,N)=>N.weight-U.weight);const R=C.slice(0,Math.min(3,C.length)),H=R.reduce((U,N)=>U+N.weight,0)||1,P=R.map(U=>({boneId:U.boneId,weight:U.weight/H}));T.push({x:b,y:v,u:_,v:y,weights:P})}}const u=[],m=i+1;for(let S=0;S<r;S++)for(let y=0;y<i;y++){const v=S*m+y,w=v+1,_=(S+1)*m+y,b=_+1;u.push([v,w,_]),u.push([w,b,_])}return{layerId:n,cols:i,rows:r,bounds:{x:l,y:d,w:E,h},vertices:T,indices:u}}function bg(n,e,t,i){const r=new Array(t.vertices.length);for(let l=0;l<t.vertices.length;l++){const d=t.vertices[l];let f=0,g=0,x=0;for(const M of d.weights){const E=i.get(M.boneId);if(!E)continue;const h=mi(E.skinMatrix,d.x,d.y);f+=h.x*M.weight,g+=h.y*M.weight,x+=M.weight}x>0?r[l]={x:f/x,y:g/x}:r[l]={x:d.x,y:d.y}}const{x:s,y:o,w:a,h:c}=t.bounds;for(const[l,d,f]of t.indices){const g=t.vertices[l],x=t.vertices[d],M=t.vertices[f],E=r[l],h=r[d],p=r[f],T=s+g.u*a,u=o+g.v*c,m=s+x.u*a,S=o+x.v*c,y=s+M.u*a,v=o+M.v*c;Mg(n,e,T,u,m,S,y,v,E.x,E.y,h.x,h.y,p.x,p.y)}}function Mg(n,e,t,i,r,s,o,a,c,l,d,f,g,x){const M=t*(a-s)-r*a+o*s+(r-o)*i;if(Math.abs(M)<1e-5)return;const E=(c+d+g)/3,h=(l+f+x)/3,p=(C,R)=>{const H=Math.hypot(C-E,R-h);if(H<.001)return{x:C,y:R};const P=(H+.45)/H;return{x:E+(C-E)*P,y:h+(R-h)*P}},T=p(c,l),u=p(d,f),m=p(g,x);n.save(),n.beginPath(),n.moveTo(T.x,T.y),n.lineTo(u.x,u.y),n.lineTo(m.x,m.y),n.closePath(),n.clip();const S=-(i*(g-d)-s*g+a*d+(s-a)*c)/M,y=(s*x+i*(f-x)-a*f+(a-s)*l)/M,v=(t*(g-d)-r*g+o*d+(r-o)*c)/M,w=-(r*x+t*(f-x)-o*f+(o-r)*l)/M,_=(t*(a*d-s*g)+i*(r*g-o*d)+(o*s-r*a)*c)/M,b=(t*(a*f-s*x)+i*(r*x-o*f)+(o*s-r*a)*l)/M;n.transform(S,y,v,w,_,b),n.drawImage(e,0,0),n.restore()}const Sg={x:0,y:0,scaleX:1,scaleY:1,rotation:0,opacity:1};function Ol(){return{fps:12,totalFrames:24,startFrame:1,endFrame:24,currentFrame:1,loop:!0,isPlaying:!1,division:5,timeFormat:"frames"}}function lr(n,e){const t=new Map;return e&&t.set(1,e),{id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:1,endFrame:n,exposures:t}}function Yt(n){n.exposures.clear(),n.clips.sort((e,t)=>e.startFrame-t.startFrame);for(const e of n.clips)for(const[t,i]of e.exposures.entries())t>=e.startFrame&&t<=e.endFrame&&n.exposures.set(t,i)}function Na(n,e,t){let i=n.clips.find(o=>e>=o.startFrame&&e<=o.endFrame);if(i)return i;if(n.clips.length===0)return i=lr(t),n.clips.push(i),i;n.clips.sort((o,a)=>o.startFrame-a.startFrame);const r=[...n.clips].reverse().find(o=>o.endFrame<e);if(r){const o=n.clips.find(a=>a.startFrame>e);return r.endFrame=o?Math.min(e,o.startFrame-1):Math.max(r.endFrame,e),r}const s=n.clips[0];return s.startFrame=Math.min(s.startFrame,e),s}const Bl=["#00e5ff","#ffd43b","#ff6b6b","#51cf66","#cc5de8","#ff922b","#4dabf7"];function Eg(n){let e=1,t=1,i=null;const r={id:"scene-1",name:"Escena 1",settings:Ol(),tracks:[],bones:[],boneKeyframes:new Map},s=[r];let o=r.id;function a(){return s.find(u=>u.id===o)??s[0]}function c(){return{x:0,y:0,rotation:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1}}const l={enabled:!1,prevFrames:2,nextFrames:2,prevColor:"#38bdf8",nextColor:"#4ade80",startOpacity:.5,stepOpacity:.15,mode:"tint",activeReferenceCelId:null,transforms:new Map,customReferences:[]},d=new Set;function f(){for(const u of d)u()}let g=null,x=0,M=0;function E(u){const m=a().settings;if(!m.isPlaying)return;x===0&&(x=u);const S=u-x;x=u,M+=S;const y=1e3/m.fps;if(M>=y){const v=Math.floor(M/y);M%=y;let w=m.currentFrame+v;if(w>m.endFrame)if(m.loop){const _=Math.max(1,m.endFrame-m.startFrame+1);w=m.startFrame+(w-m.startFrame)%_}else w=m.endFrame,T.pause();m.currentFrame!==w&&(m.currentFrame=w,h(),f())}m.isPlaying&&(g=requestAnimationFrame(E))}function h(){const u=a(),m=u.tracks,S=u.settings;if(m.length===0)return;const y=n.getActiveLayer();let v=m.find(w=>w.folderId===y.id||w.folderId===y.parentId);if(!v&&m.length>0&&(v=m[0]),v){const w=T.getActiveCelForFrame(v.id,S.currentFrame);w&&w.id!==y.id&&n.setActiveLayer(w.id)}}function p(){const u=a(),m=u.tracks,S=u.settings,y=n.layers.filter(_=>_.type==="folder"&&_.isAnimationFolder),v=new Set;for(let _=m.length-1;_>=0;_--){const b=m[_].folderId;!y.some(C=>C.id===b)||v.has(b)?m.splice(_,1):v.add(b)}for(const _ of y){let b=m.find(R=>R.folderId===_.id);const C=n.layers.filter(R=>R.parentId===_.id);if(b)b.name=_.name,b.visible=_.visible,b.clips.length===0&&b.clips.push(lr(S.totalFrames)),C.length>0&&b.exposures.size===0&&(b.clips[0].exposures.set(b.clips[0].startFrame,C[0].id),Yt(b));else{const R=lr(S.totalFrames,C.length>0?C[0].id:void 0);b={id:_.id,folderId:_.id,name:_.name,visible:_.visible,clips:[R],exposures:new Map,keyframesEnabled:!1,keyframes:new Map},Yt(b),m.push(b)}}const w=new Map(y.map((_,b)=>[_.id,b]));m.sort((_,b)=>(w.get(b.folderId)??0)-(w.get(_.folderId)??0))}n.subscribe(()=>{p(),f()});const T={get settings(){return a().settings},get onionSkin(){return l},get tracks(){return a().tracks},get scenes(){return s},get activeSceneId(){return o},get activeScene(){return a()},get bones(){return a().bones},get boneKeyframes(){return a().boneKeyframes},get selectedBoneId(){return i},createScene(u,m=!1){var R;T.pause(),e++;const S=a(),y=m?{...S.settings,isPlaying:!1,currentFrame:1}:Ol(),v=[],w=n.layers.filter(H=>H.type==="folder"&&H.isAnimationFolder);for(const H of w){const P=S.tracks.find(N=>N.folderId===H.id),U=n.layers.filter(N=>N.parentId===H.id);if(m&&P){const N=P.clips.map(B=>({id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:B.startFrame,endFrame:B.endFrame,exposures:new Map(B.exposures)})),I=new Map;for(const[B,V]of P.keyframes.entries())I.set(B,{...V});const q={id:H.id,folderId:H.id,name:H.name,visible:H.visible,clips:N,exposures:new Map,keyframesEnabled:P.keyframesEnabled,keyframes:I};Yt(q),v.push(q)}else{let N=(R=U[0])==null?void 0:R.id;if(!m){let B=0;for(const K of U){const k=K.name.match(/^(\d+)$/);k&&(B=Math.max(B,parseInt(k[1],10)))}N=n.createLayer(`${B+1}`,H.id).id}const I=lr(y.totalFrames,N),q={id:H.id,folderId:H.id,name:H.name,visible:H.visible,clips:[I],exposures:new Map,keyframesEnabled:!1,keyframes:new Map};Yt(q),v.push(q)}}const _=S.bones.map(H=>({...H})),b=new Map;if(m)for(const[H,P]of S.boneKeyframes.entries()){const U=new Map;for(const[N,I]of P.poses.entries())U.set(N,{...I});b.set(H,{frame:P.frame,interpolation:P.interpolation,poses:U})}const C={id:`scene-${Date.now()}-${e}`,name:(u==null?void 0:u.trim())||`Escena ${e}`,settings:y,tracks:v,bones:_,boneKeyframes:b};return s.push(C),o=C.id,p(),h(),f(),C},switchScene(u){if(u===o)return;const m=s.find(S=>S.id===u);m&&(T.pause(),o=m.id,p(),h(),f())},renameScene(u,m){const S=s.find(v=>v.id===u),y=m.trim();S&&y&&(S.name=y,f())},deleteScene(u){if(s.length<=1)return!1;const m=s.findIndex(S=>S.id===u);return m===-1?!1:(T.pause(),s.splice(m,1),o===u&&(o=s[Math.max(0,m-1)].id),p(),h(),f(),!0)},play(){const u=a().settings;u.isPlaying||(u.isPlaying=!0,x=0,M=0,g=requestAnimationFrame(E),f())},pause(){const u=a().settings;u.isPlaying&&(u.isPlaying=!1,g!==null&&(cancelAnimationFrame(g),g=null),f())},togglePlay(){a().settings.isPlaying?T.pause():T.play()},setFps(u){const m=a().settings;m.fps=Math.max(1,Math.min(120,Math.round(u))),f()},setTotalFrames(u,m=!0){const S=a(),y=S.settings,v=y.totalFrames,w=Math.max(1,Math.min(2e3,Math.round(u)));if(w===v)return;const _=y.endFrame===v;y.totalFrames=w,(m&&(_||y.endFrame>w)||y.endFrame>w)&&(y.endFrame=w),y.startFrame>y.endFrame&&(y.startFrame=Math.max(1,y.endFrame)),y.currentFrame>w&&(y.currentFrame=w);for(const b of S.tracks){for(const C of b.clips)(C.endFrame===v||C.endFrame>w)&&(C.endFrame=w),C.startFrame>w&&(C.startFrame=w);Yt(b)}h(),f()},setRange(u,m){const S=a().settings,y=Math.max(1,Math.min(S.totalFrames,Math.round(u))),v=Math.max(y,Math.min(S.totalFrames,Math.round(m)));S.startFrame=y,S.endFrame=v,S.currentFrame<y&&(S.currentFrame=y),S.currentFrame>v&&(S.currentFrame=v),h(),f()},setLoop(u){a().settings.loop=u,f()},setDivision(u){a().settings.division=Math.max(2,Math.min(24,Math.round(u))),f()},setTimeFormat(u){a().settings.timeFormat=u,f()},updateTimelineSettings(u){const m=a();if(u.sceneName!==void 0&&u.sceneName.trim()&&(m.name=u.sceneName.trim()),u.totalFrames!==void 0&&T.setTotalFrames(u.totalFrames,!0),u.fps!==void 0&&(m.settings.fps=Math.max(1,Math.min(120,Math.round(u.fps)))),u.startFrame!==void 0||u.endFrame!==void 0){const S=u.startFrame??m.settings.startFrame,y=u.endFrame??m.settings.endFrame;T.setRange(S,y)}u.loop!==void 0&&(m.settings.loop=u.loop),u.division!==void 0&&(m.settings.division=Math.max(2,Math.min(24,Math.round(u.division)))),u.timeFormat!==void 0&&(m.settings.timeFormat=u.timeFormat),f()},goToFrame(u){const m=a().settings,S=Math.max(1,Math.min(m.totalFrames,Math.round(u)));m.currentFrame!==S&&(m.currentFrame=S,h(),f())},nextFrame(){const u=a().settings;let m=u.currentFrame+1;m>u.endFrame&&(m=u.loop?u.startFrame:u.endFrame),T.goToFrame(m)},prevFrame(){const u=a().settings;let m=u.currentFrame-1;m<u.startFrame&&(m=u.loop?u.endFrame:u.startFrame),T.goToFrame(m)},firstFrame(){T.goToFrame(a().settings.startFrame)},lastFrame(){T.goToFrame(a().settings.endFrame)},nextCel(u){const{tracks:m,settings:S}=a(),y=u?m.find(_=>_.id===u):m[0];if(!y)return;const v=Array.from(y.exposures.keys()).sort((_,b)=>_-b),w=v.find(_=>_>S.currentFrame);w!==void 0?T.goToFrame(w):S.loop&&v.length>0&&T.goToFrame(v[0])},prevCel(u){const{tracks:m,settings:S}=a(),y=u?m.find(_=>_.id===u):m[0];if(!y)return;const v=Array.from(y.exposures.keys()).sort((_,b)=>b-_),w=v.find(_=>_<S.currentFrame);w!==void 0?T.goToFrame(w):S.loop&&v.length>0&&T.goToFrame(v[0])},createTrack(u){const{tracks:m,settings:S}=a(),y=n.createAnimationFolder(u||`Animation ${m.length+1}`);let v=m.find(_=>_.folderId===y.id);v||(v={id:y.id,folderId:y.id,name:y.name,visible:!0,clips:[lr(S.totalFrames)],exposures:new Map,keyframesEnabled:!1,keyframes:new Map},m.push(v));const w=n.layers.filter(_=>_.parentId===y.id);if(w.length===0){const _=n.createLayer("1",y.id);v.clips[0].exposures.set(1,_.id),Yt(v),n.setActiveLayer(_.id)}else v.exposures.size===0&&(v.clips[0].exposures.set(1,w[0].id),Yt(v),n.setActiveLayer(w[0].id));return f(),v},deleteTrack(u){const{tracks:m}=a(),S=m.findIndex(y=>y.id===u);if(S!==-1){const y=m[S];m.splice(S,1),n.deleteLayer(y.folderId),f()}},createCel(u,m){const{tracks:S,settings:y}=a();let v=u?S.find(P=>P.id===u):S[0];v||(v=T.createTrack());const w=m!==void 0?m:y.currentFrame,_=n.layers.filter(P=>P.parentId===v.folderId);let b=0;for(const P of _){const U=P.name.match(/^(\d+)$/);if(U){const N=parseInt(U[1],10);N>b&&(b=N)}}const C=`${b+1}`,R=n.createLayer(C,v.folderId);return Na(v,w,y.totalFrames).exposures.set(w,R.id),Yt(v),n.setActiveLayer(R.id),f(),R},specifyCel(u,m,S){const{tracks:y,settings:v}=a(),w=y.find(b=>b.id===u);if(!w)return;m>v.totalFrames&&T.setTotalFrames(m,!0),Na(w,m,v.totalFrames).exposures.set(m,S),Yt(w),h(),f()},moveExposure(u,m,S){const{tracks:y,settings:v}=a(),w=y.find(R=>R.id===u);if(!w)return!1;const _=w.exposures.get(m);if(!_)return!1;const b=Math.max(1,Math.round(S));if(b===m)return!1;b>v.totalFrames&&T.setTotalFrames(b,!0);for(const R of w.clips)R.exposures.delete(m);return Na(w,b,v.totalFrames).exposures.set(b,_),Yt(w),v.currentFrame=b,h(),f(),!0},moveCelSpan(u,m,S,y){const{tracks:v,settings:w}=a(),_=v.find(P=>P.id===u);if(!_)return!1;const b=_.exposures.get(m);if(!b)return!1;const C=Math.max(1,Math.round(S)),R=C+Math.max(1,y)-1;if(C===m)return!1;R>w.totalFrames&&T.setTotalFrames(R,!0);const H=_.clips.find(P=>P.exposures.has(m));if(!H)return!1;if(H.exposures.delete(m),H.exposures.size===0)H.startFrame=C,H.endFrame=R,H.exposures.set(C,b);else{const P=Array.from(H.exposures.keys()).sort((N,I)=>N-I);if(P.length>0&&(H.startFrame=Math.min(H.startFrame,P[0]),m>P[P.length-1])){const N=P[P.length-1];H.endFrame=Math.max(N,m-1)}const U={id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:C,endFrame:R,exposures:new Map([[C,b]])};_.clips.push(U)}return _.clips.sort((P,U)=>P.startFrame-U.startFrame),Yt(_),w.currentFrame=C,h(),f(),!0},resizeCelSpan(u,m,S,y,v="ripple"){const{tracks:w,settings:_}=a(),b=w.find(B=>B.id===u);if(!b)return!1;const C=b.clips.find(B=>B.exposures.has(m));if(!C)return!1;const R=Array.from(C.exposures.entries()).sort((B,V)=>B[0]-V[0]),H=R.findIndex(([B])=>B===m);if(H===-1)return!1;const[P,U]=R[H],N=R[H+1],I=H>0?R[H-1]:void 0,q=N?N[0]-1:C.endFrame;if(S==="right"){const B=Math.max(P,Math.round(y)),V=B-q;if(V===0)return!1;if(B>_.totalFrames&&T.setTotalFrames(B,!0),!N)C.endFrame=Math.max(P,B),C.endFrame>_.totalFrames&&T.setTotalFrames(C.endFrame,!0);else if(v==="ripple"){const K=new Map;for(let k=0;k<=H;k++)K.set(R[k][0],R[k][1]);for(let k=H+1;k<R.length;k++){const G=Math.max(P+(k-H),R[k][0]+V);K.set(G,R[k][1]),G>C.endFrame&&(C.endFrame=G)}C.endFrame>_.totalFrames&&T.setTotalFrames(C.endFrame,!0),C.exposures=K}else{const K=B+1;C.exposures.delete(N[0]),K<=C.endFrame&&C.exposures.set(K,N[1])}}else{const B=I?I[0]+1:1,K=Math.max(B,Math.min(q,Math.round(y)));if(K===P)return!1;K<C.startFrame&&(C.startFrame=K),C.exposures.delete(P),C.exposures.set(K,U)}return Yt(b),h(),f(),!0},resizeClip(u,m,S,y){const{tracks:v,settings:w}=a(),_=v.find(H=>H.id===u);if(!_)return!1;const b=_.clips.find(H=>H.id===m);if(!b)return!1;const C=Math.max(1,Math.round(S)),R=Math.max(C,Math.round(y));if(R>w.totalFrames&&T.setTotalFrames(R,!0),C!==b.startFrame&&b.exposures.has(b.startFrame)&&!b.exposures.has(C)){const H=b.exposures.get(b.startFrame);b.exposures.delete(b.startFrame),b.exposures.set(C,H)}return b.startFrame=C,b.endFrame=R,Yt(_),h(),f(),!0},splitClip(u,m){const{tracks:S}=a(),y=S.find(C=>C.id===u);if(!y)return!1;const v=y.clips.find(C=>m>C.startFrame&&m<=C.endFrame);if(!v)return!1;const w=T.getActiveCelForFrame(u,m),_=new Map;for(const[C,R]of Array.from(v.exposures.entries()))C>=m&&(_.set(C,R),v.exposures.delete(C));!_.has(m)&&w&&_.set(m,w.id);const b={id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:m,endFrame:v.endFrame,exposures:_};return v.endFrame=m-1,y.clips.push(b),Yt(y),f(),!0},removeExposure(u,m){const{tracks:S}=a(),y=S.find(v=>v.id===u);if(y){for(const v of y.clips)v.exposures.delete(m);Yt(y),h(),f()}},getCelsInTrack(u){const{tracks:m}=a(),S=m.find(y=>y.id===u);return S?n.layers.filter(y=>y.parentId===S.folderId):[]},deleteCelLayer(u,m){const{tracks:S}=a();if(!S.find(w=>w.id===u))return!1;for(const w of s)for(const _ of w.tracks){for(const b of _.clips)for(const[C,R]of Array.from(b.exposures.entries()))R===m&&b.exposures.delete(C);Yt(_)}const v=n.deleteLayer(m);return h(),f(),v},batchSpecifyCels(u,m=2){const{tracks:S,settings:y}=a(),v=S.find(H=>H.id===u);if(!v)return;const w=n.layers.filter(H=>H.parentId===v.folderId);if(w.length===0)return;const _=Math.max(1,Math.round(m)),b=(w.length-1)*_+_;b>y.totalFrames&&T.setTotalFrames(b,!0);const C=lr(y.totalFrames);let R=1;for(const H of w){if(R>y.totalFrames)break;C.exposures.set(R,H.id),R+=_}v.clips=[C],Yt(v),h(),f()},toggleTrackKeyframes(u,m){const{tracks:S,settings:y}=a(),v=S.find(w=>w.id===u);v&&(v.keyframesEnabled=m!==void 0?m:!v.keyframesEnabled,v.keyframesEnabled&&v.keyframes.size===0&&v.keyframes.set(y.currentFrame,{frame:y.currentFrame,x:0,y:0,scaleX:1,scaleY:1,rotation:0,opacity:1,interpolation:"smooth"}),f())},addOrUpdateKeyframe(u,m,S){const{tracks:y,settings:v}=a(),w=y.find(H=>H.id===u);if(!w)return null;w.keyframesEnabled=!0;const _=Math.max(1,Math.min(v.totalFrames,Math.round(m))),b=w.keyframes.get(_);if(b)return S&&Object.assign(b,S),f(),b;const C=T.getInterpolatedTransform(u,_),R={frame:_,x:(S==null?void 0:S.x)??C.x,y:(S==null?void 0:S.y)??C.y,scaleX:(S==null?void 0:S.scaleX)??C.scaleX,scaleY:(S==null?void 0:S.scaleY)??C.scaleY,rotation:(S==null?void 0:S.rotation)??C.rotation,opacity:(S==null?void 0:S.opacity)??C.opacity,interpolation:(S==null?void 0:S.interpolation)??"smooth"};return w.keyframes.set(_,R),f(),R},moveKeyframe(u,m,S){const{tracks:y,settings:v}=a(),w=y.find(C=>C.id===u);if(!w)return!1;const _=w.keyframes.get(m);if(!_)return!1;const b=Math.max(1,Math.min(v.totalFrames,Math.round(S)));return b===m?!1:(w.keyframes.delete(m),_.frame=b,w.keyframes.set(b,_),f(),!0)},deleteKeyframe(u,m){const{tracks:S}=a(),y=S.find(w=>w.id===u);if(!y)return!1;const v=y.keyframes.delete(m);return v&&f(),v},setKeyframeInterpolation(u,m,S){const{tracks:y}=a(),v=y.find(_=>_.id===u);if(!v)return;const w=v.keyframes.get(m);w&&(w.interpolation=S,f())},getInterpolatedTransform(u,m){const{tracks:S}=a(),y=S.find(R=>R.id===u);if(!y||!y.keyframesEnabled||y.keyframes.size===0)return{...Sg};const v=Array.from(y.keyframes.values()).sort((R,H)=>R.frame-H.frame);if(m<=v[0].frame){const R=v[0];return{x:R.x,y:R.y,scaleX:R.scaleX,scaleY:R.scaleY,rotation:R.rotation,opacity:R.opacity}}if(m>=v[v.length-1].frame){const R=v[v.length-1];return{x:R.x,y:R.y,scaleX:R.scaleX,scaleY:R.scaleY,rotation:R.rotation,opacity:R.opacity}}let w=v[0],_=v[1];for(let R=0;R<v.length-1;R++)if(m>=v[R].frame&&m<=v[R+1].frame){w=v[R],_=v[R+1];break}if(w.interpolation==="hold"||w.frame===_.frame)return{x:w.x,y:w.y,scaleX:w.scaleX,scaleY:w.scaleY,rotation:w.rotation,opacity:w.opacity};const b=(m-w.frame)/(_.frame-w.frame),C=w.interpolation==="smooth"?b*b*(3-2*b):b;return{x:w.x+(_.x-w.x)*C,y:w.y+(_.y-w.y)*C,scaleX:w.scaleX+(_.scaleX-w.scaleX)*C,scaleY:w.scaleY+(_.scaleY-w.scaleY)*C,rotation:w.rotation+(_.rotation-w.rotation)*C,opacity:w.opacity+(_.opacity-w.opacity)*C}},selectBone(u){i!==u&&(i=u,f())},createBoneFromWorld(u,m,S,y,v,w){const _=a(),b=Ii(_.bones),C=v!==void 0?v:i&&_.bones.some(G=>G.id===i)?i:null,R=C?b.get(C):void 0,H=S-u,P=y-m,U=Math.max(18,Math.hypot(H,P)),N=Math.atan2(P,H)*180/Math.PI;let I=u,q=m,B=N;if(R){const G=mi(R.bindInverseMatrix,u,m);I=G.x,q=G.y,B=Ni(N-R.bindWorldAngleDeg)}const V=`bone-${Date.now()}-${t++}`,K=Bl[_.bones.length%Bl.length],k={id:V,name:(w==null?void 0:w.trim())||`Hueso ${_.bones.length+1}`,parentId:C,restX:I,restY:q,restRotation:B,length:U,color:K,ikBendPositive:!0};return _.bones.push(k),i=k.id,f(),k},updateBoneEndpointWorld(u,m,S){const y=a(),v=y.bones.find(U=>U.id===u);if(!v)return;const w=Ii(y.bones),_=w.get(u);if(!_)return;const b=m-_.bindHeadX,C=S-_.bindHeadY,R=Math.max(12,Math.hypot(b,C)),H=Math.atan2(C,b)*180/Math.PI,P=v.parentId?w.get(v.parentId):void 0;v.length=R,v.restRotation=P?Ni(H-P.bindWorldAngleDeg):H,f()},moveBoneHeadWorld(u,m,S){const y=a(),v=y.bones.find(b=>b.id===u);if(!v)return;const w=Ii(y.bones),_=v.parentId?w.get(v.parentId):void 0;if(_){const b=mi(_.bindInverseMatrix,m,S);v.restX=b.x,v.restY=b.y}else v.restX=m,v.restY=S;f()},renameBone(u,m){const y=a().bones.find(w=>w.id===u),v=m.trim();y&&v&&(y.name=v,f())},setBoneParent(u,m){const S=a(),y=S.bones.find(C=>C.id===u);if(!y||y.id===m)return;let v=m?S.bones.find(C=>C.id===m):void 0;for(;v;){if(v.id===y.id)return;v=v.parentId?S.bones.find(C=>C.id===v.parentId):void 0}const w=Ii(S.bones),_=w.get(y.id);if(!_)return;const b=m?w.get(m):void 0;if(b){const C=mi(b.bindInverseMatrix,_.bindHeadX,_.bindHeadY);y.restX=C.x,y.restY=C.y,y.restRotation=Ni(_.bindWorldAngleDeg-b.bindWorldAngleDeg)}else y.restX=_.bindHeadX,y.restY=_.bindHeadY,y.restRotation=_.bindWorldAngleDeg;y.parentId=m,f()},toggleBoneIKBend(u){const S=a().bones.find(y=>y.id===u);S&&(S.ikBendPositive=S.ikBendPositive===!1,f())},deleteBone(u){var w;const m=a(),S=m.bones.findIndex(_=>_.id===u);if(S===-1)return!1;const y=m.bones[S],v=m.bones.filter(_=>_.parentId===u);for(const _ of v)T.setBoneParent(_.id,y.parentId);m.bones.splice(S,1);for(const _ of m.boneKeyframes.values())_.poses.delete(u);for(const _ of n.layers)_.boundBoneId===u&&(_.boundBoneId=null);return i===u&&(i=((w=m.bones[0])==null?void 0:w.id)??null),f(),!0},createHumanoidPreset(u,m){const S=a();S.bones=[],S.boneKeyframes.clear();const y=T.createBoneFromWorld(u,m+40,u,m-60,null,"Torso"),v=T.createBoneFromWorld(u,m-60,u,m-135,y.id,"Cabeza"),w=T.createBoneFromWorld(u-10,m-50,u-85,m-10,y.id,"Brazo Izq");T.createBoneFromWorld(u-85,m-10,u-145,m+35,w.id,"Antebrazo Izq");const _=T.createBoneFromWorld(u+10,m-50,u+85,m-10,y.id,"Brazo Der");T.createBoneFromWorld(u+85,m-10,u+145,m+35,_.id,"Antebrazo Der");const b=T.createBoneFromWorld(u-18,m+40,u-30,m+135,y.id,"Muslo Izq");T.createBoneFromWorld(u-30,m+135,u-35,m+230,b.id,"Pierna Izq");const C=T.createBoneFromWorld(u+18,m+40,u+30,m+135,y.id,"Muslo Der");T.createBoneFromWorld(u+30,m+135,u+35,m+230,C.id,"Pierna Der"),i=v.id,T.addOrUpdateBoneKeyframe(1,"smooth"),f()},setBonePoseAtFrame(u,m,S,y="smooth"){const v=a(),w=Math.max(1,Math.min(v.settings.totalFrames,Math.round(u)));let _=v.boneKeyframes.get(w);if(!_){const C=T.getInterpolatedBonePoses(w);_={frame:w,interpolation:y,poses:C},v.boneKeyframes.set(w,_)}const b=_.poses.get(m)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};_.poses.set(m,{...b,...S}),f()},applyTwoBoneIKAtFrame(u,m,S,y){const v=a(),w=Math.max(1,Math.min(v.settings.totalFrames,Math.round(u))),_=T.getInterpolatedBonePoses(w),b=xg(v.bones,_,m,S,y);let C=v.boneKeyframes.get(w);C?C.poses=b:(C={frame:w,interpolation:"smooth",poses:b},v.boneKeyframes.set(w,C)),f()},addOrUpdateBoneKeyframe(u,m="smooth"){const S=a(),y=Math.max(1,Math.min(S.settings.totalFrames,Math.round(u)));let v=S.boneKeyframes.get(y);if(v)return v.interpolation=m,f(),v;const w=T.getInterpolatedBonePoses(y);for(const _ of S.bones)w.has(_.id)||w.set(_.id,{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1});return v={frame:y,interpolation:m,poses:w},S.boneKeyframes.set(y,v),f(),v},moveBoneKeyframe(u,m){const S=a(),y=S.boneKeyframes.get(u);if(!y)return!1;const v=Math.max(1,Math.min(S.settings.totalFrames,Math.round(m)));return v===u?!1:(S.boneKeyframes.delete(u),y.frame=v,S.boneKeyframes.set(v,y),f(),!0)},deleteBoneKeyframe(u){const S=a().boneKeyframes.delete(u);return S&&f(),S},resetBonePoseAtFrame(u,m){const S=a(),y=S.boneKeyframes.get(u);if(y){if(m)y.poses.set(m,{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1});else for(const v of S.bones)y.poses.set(v.id,{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1});f()}},getInterpolatedBonePoses(u){const m=a(),S=new Map;if(m.bones.length===0||m.boneKeyframes.size===0)return S;const y=Array.from(m.boneKeyframes.values()).sort((C,R)=>C.frame-R.frame);if(u<=y[0].frame){for(const[C,R]of y[0].poses.entries())S.set(C,{...R});return S}if(u>=y[y.length-1].frame){for(const[C,R]of y[y.length-1].poses.entries())S.set(C,{...R});return S}let v=y[0],w=y[1];for(let C=0;C<y.length-1;C++)if(u>=y[C].frame&&u<=y[C+1].frame){v=y[C],w=y[C+1];break}if(v.interpolation==="hold"||v.frame===w.frame){for(const[C,R]of v.poses.entries())S.set(C,{...R});return S}const _=(u-v.frame)/(w.frame-v.frame),b=v.interpolation==="smooth"?_*_*(3-2*_):_;for(const C of m.bones){const R=v.poses.get(C.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1},H=w.poses.get(C.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1},P=Ni(H.dRotation-R.dRotation);S.set(C.id,{dX:R.dX+(H.dX-R.dX)*b,dY:R.dY+(H.dY-R.dY)*b,dRotation:R.dRotation+P*b,scaleX:R.scaleX+(H.scaleX-R.scaleX)*b,scaleY:R.scaleY+(H.scaleY-R.scaleY)*b})}return S},getEvaluatedBones(u){const m=a(),S=u??m.settings.currentFrame,y=T.getInterpolatedBonePoses(S);return Ii(m.bones,y)},hitTestBoneAtWorld(u,m,S){const y=a();if(y.bones.length===0)return null;const v=T.getEvaluatedBones(S),w=14;for(let _=y.bones.length-1;_>=0;_--){const b=y.bones[_],C=v.get(b.id);if(C&&Math.hypot(u-C.tailX,m-C.tailY)<=w)return{bone:b,part:"tail",evalBone:C}}for(let _=y.bones.length-1;_>=0;_--){const b=y.bones[_],C=v.get(b.id);if(C&&Math.hypot(u-C.headX,m-C.headY)<=w)return{bone:b,part:"head",evalBone:C}}for(let _=y.bones.length-1;_>=0;_--){const b=y.bones[_],C=v.get(b.id);if(!C)continue;if(zc(u,m,C.headX,C.headY,C.tailX,C.tailY)<=12)return{bone:b,part:"body",evalBone:C}}return null},setOnionSkin(u){Object.assign(l,u),f()},toggleOnionSkin(u){l.enabled=u!==void 0?u:!l.enabled,f()},getOnionSkinTransform(u){let m=l.transforms.get(u);return m||(m=c(),l.transforms.set(u,m)),m},updateOnionSkinTransform(u,m){const S=T.getOnionSkinTransform(u);Object.assign(S,m);const y=l.customReferences.find(v=>v.celId===u);y&&(y.transform=S),f()},resetOnionSkinTransform(u){const m=c();l.transforms.set(u,m);const S=l.customReferences.find(y=>y.celId===u);S&&(S.transform=m),f()},addCustomOnionReference(u,m){const S=n.layers.find(R=>R.id===u);if(!S)return null;const y=l.customReferences.find(R=>R.celId===u);if(y)return y.visible=!0,l.activeReferenceCelId=u,f(),y;const v=a();let w,_=v.settings.currentFrame;for(const R of v.tracks){for(const[H,P]of R.exposures.entries())if(P===u){w=R,_=H;break}if(w)break}const b=T.getOnionSkinTransform(u),C={id:`ref-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,celId:S.id,name:m||S.name,trackId:w?w.id:"",trackName:w?w.name:"Pista",frame:_,visible:!0,opacity:l.startOpacity,colorMode:"monochrome",tintColor:"#ffd43b",transform:b};return l.customReferences.push(C),l.activeReferenceCelId=u,f(),C},removeCustomOnionReference(u){const m=l.customReferences.findIndex(S=>S.id===u||S.celId===u);if(m!==-1){const S=l.customReferences.splice(m,1)[0];l.activeReferenceCelId===S.celId&&(l.activeReferenceCelId=l.customReferences.length>0?l.customReferences[0].celId:null),f()}},updateCustomOnionReference(u,m){const S=l.customReferences.find(y=>y.id===u||y.celId===u);S&&(Object.assign(S,m),m.transform&&l.transforms.set(S.celId,S.transform),f())},setActiveReferenceCel(u){l.activeReferenceCelId=u,f()},getActiveCelForFrame(u,m){const{tracks:S}=a(),y=S.find(b=>b.id===u);if(!y)return;const v=y.clips.find(b=>m>=b.startFrame&&m<=b.endFrame);if(!v)return;let w,_=-1;for(const[b,C]of v.exposures.entries())b>=v.startFrame&&b<=m&&b>_&&(_=b,w=C);if(w)return n.layers.find(b=>b.id===w)},getOnionSkinCels(u,m){if(!l.enabled)return[];const{tracks:S,settings:y}=a(),v=S.find(U=>U.id===u);if(!v||!v.visible)return[];const w=T.getActiveCelForFrame(u,m),_=w?w.id:null,b=[];let C=0;const R=new Set;_&&R.add(_);for(let U=m-1;U>=1&&!(C>=l.prevFrames);U--){const N=T.getActiveCelForFrame(u,U);if(N&&!R.has(N.id)){R.add(N.id),C++;const I=Math.max(.05,l.startOpacity-(C-1)*l.stepOpacity);b.push({layer:N,isPrev:!0,distance:C,opacity:I,tintColor:l.prevColor,transform:T.getInterpolatedTransform(u,U),onionTransform:T.getOnionSkinTransform(N.id)})}}let H=0;const P=new Set;_&&P.add(_);for(let U=m+1;U<=y.totalFrames&&!(H>=l.nextFrames);U++){const N=T.getActiveCelForFrame(u,U);if(N&&!P.has(N.id)){P.add(N.id),H++;const I=Math.max(.05,l.startOpacity-(H-1)*l.stepOpacity);b.push({layer:N,isPrev:!1,distance:H,opacity:I,tintColor:l.nextColor,transform:T.getInterpolatedTransform(u,U),onionTransform:T.getOnionSkinTransform(N.id)})}}for(const U of l.customReferences){if(!U.visible)continue;const N=n.layers.find(I=>I.id===U.celId);N&&N.id!==_&&!b.some(I=>I.layer.id===N.id)&&b.push({layer:N,isPrev:!0,distance:0,opacity:U.opacity??l.startOpacity,tintColor:U.tintColor??"#ffd43b",onionTransform:T.getOnionSkinTransform(N.id)})}return b},isLayerVisibleAtFrame(u,m){if(!u.visible)return!1;let S;if(u.parentId&&(S=n.layers.find(y=>y.id===u.parentId)),S&&S.isAnimationFolder){const y=T.getActiveCelForFrame(S.id,m);return y?u.id===y.id?!0:u.parentId===y.id:!1}return!0},getLayerTransformAtFrame(u,m){let S;if(u.parentId&&(S=n.layers.find(y=>y.id===u.parentId)),S&&S.isAnimationFolder){const{tracks:y}=a(),v=y.find(w=>w.folderId===S.id);if(v&&v.keyframesEnabled&&v.keyframes.size>0)return T.getInterpolatedTransform(v.id,m)}return null},get lightTable(){return{get enabled(){return l.enabled},set enabled(u){l.enabled=u},get activeRegistrationId(){return l.activeReferenceCelId??null},set activeRegistrationId(u){l.activeReferenceCelId=u},get registrations(){return l.customReferences}}},toggleLightTable(u){T.toggleOnionSkin(u)},registerCelToLightTable(u,m){return T.addCustomOnionReference(u,m)},registerPrevCelToLightTable(u){const m=a(),S=u?m.tracks.find(C=>C.id===u):m.tracks[0];if(!S)return null;const y=m.settings.currentFrame,w=[...Array.from(S.exposures.keys()).sort((C,R)=>C-R)].reverse().find(C=>C<y);if(w===void 0)return null;const _=S.exposures.get(w);if(!_)return null;const b=T.addCustomOnionReference(_);return b&&(b.tintColor="#38bdf8",b.colorMode="monochrome"),b},registerNextCelToLightTable(u){const m=a(),S=u?m.tracks.find(C=>C.id===u):m.tracks[0];if(!S)return null;const y=m.settings.currentFrame,w=Array.from(S.exposures.keys()).sort((C,R)=>C-R).find(C=>C>y);if(w===void 0)return null;const _=S.exposures.get(w);if(!_)return null;const b=T.addCustomOnionReference(_);return b&&(b.tintColor="#4ade80",b.colorMode="monochrome"),b},unregisterLightTable(u){T.removeCustomOnionReference(u)},updateLightTableRegistration(u,m){T.updateCustomOnionReference(u,m)},updateLightTableTransform(u,m){const S=l.customReferences.find(y=>y.id===u||y.celId===u);S&&T.updateOnionSkinTransform(S.celId,m)},resetLightTableTransform(u){const m=l.customReferences.find(S=>S.id===u||S.celId===u);m&&T.resetOnionSkinTransform(m.celId)},setActiveLightTableRegistration(u){T.setActiveReferenceCel(u)},getLightTableRegistrations(){return l.customReferences},subscribe(u){return d.add(u),()=>{d.delete(u)}}};return p(),T}let at=24;const zl=10,Hl=64;function Tg(n,e,t="frames"){if(t==="frames")return String(n);const i=n-1,r=Math.floor(i/e),s=i%e+1;if(t==="sec_frames")return`${r}s+${s}f`;const o=Math.floor(r/60),a=r%60;return`${String(o).padStart(2,"0")}:${String(a).padStart(2,"0")}:${String(s-1).padStart(2,"0")}`}function wg(n,e,t){var Ie;n.innerHTML="";const i=document.createElement("div");i.className="timeline-panel",i.style.setProperty("--cell-width",`${at}px`);const r=document.createElement("div");r.className="csp-timeline-height-resizer",r.title="Arrastrar para cambiar la altura de la línea de tiempo";const s=localStorage.getItem("oniri.timeline.height");if(s){const Z=Math.max(90,Math.min(600,Number(s)));document.documentElement.style.setProperty("--timeline-height",`${Z}px`)}let o=!1,a=0,c=190;r.addEventListener("pointerdown",Z=>{Z.preventDefault(),Z.stopPropagation(),o=!0,a=Z.clientY,c=i.offsetHeight,r.classList.add("dragging"),r.setPointerCapture(Z.pointerId)}),r.addEventListener("pointermove",Z=>{if(!o)return;const Se=Z.clientY-a,He=Math.max(90,Math.min(600,c-Se));document.documentElement.style.setProperty("--timeline-height",`${He}px`),localStorage.setItem("oniri.timeline.height",String(He))});const l=Z=>{if(o){o=!1,r.classList.remove("dragging");try{r.releasePointerCapture(Z.pointerId)}catch{}}};r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),i.appendChild(r);let d=((Ie=e.tracks[0])==null?void 0:Ie.id)??null,f=null,g=null;function x(){const Z=e.tracks.find(Se=>Se.id===d);if(Z)return Z;if(e.tracks.length>0)return d=e.tracks[0].id,e.tracks[0]}function M(Z){at=Math.max(zl,Math.min(Hl,Math.round(Z))),i.style.setProperty("--cell-width",`${at}px`),f&&(f.value=String(at)),g&&(g.textContent=`${at}px`),Ue()}const E=document.createElement("div");E.className="timeline-header";const h=document.createElement("div");h.className="timeline-transport-group";const p=document.createElement("button");p.className="timeline-btn icon-only",p.title="Minimizar / Expandir Línea de Tiempo",p.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,p.addEventListener("click",()=>{i.classList.toggle("collapsed");const Z=i.classList.contains("collapsed");p.innerHTML=Z?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'}),h.appendChild(p);const T=document.createElement("div");T.className="timeline-scene-group";const u=document.createElement("select");u.className="timeline-select scene-select",u.title="Seleccionar Escena de Animación (Clip Studio Paint Multi-Timeline)",u.addEventListener("change",()=>{e.switchScene(u.value)}),T.appendChild(u);const m=document.createElement("button");m.className="timeline-btn icon-only",m.title="Edición de Escena (Gestionar, Crear nueva, Duplicar, Renombrar, Eliminar)",m.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
      <line x1="7" y1="4" x2="5" y2="9"/>
      <line x1="12" y1="4" x2="10" y2="9"/>
      <line x1="17" y1="4" x2="15" y2="9"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  `,m.addEventListener("click",()=>{Cg(e)}),T.appendChild(m),h.appendChild(T);const S=document.createElement("div");S.className="timeline-separator",h.appendChild(S);const y=document.createElement("button");y.className="timeline-btn icon-only",y.title="Primer fotograma (Shift+Izquierda)",y.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
    </svg>
  `,y.addEventListener("click",()=>e.firstFrame()),h.appendChild(y);const v=document.createElement("button");v.className="timeline-btn icon-only",v.title="Celda anterior (Atajo: [)",v.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="5" width="2.5" height="14" rx="0.5"/>
      <polygon points="20 6 9 12 20 18"/>
    </svg>
  `,v.addEventListener("click",()=>e.prevCel(d??void 0)),h.appendChild(v);const w=document.createElement("button");w.className="timeline-btn icon-only",w.title="Fotograma anterior (Flecha Izquierda)",w.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `,w.addEventListener("click",()=>e.prevFrame()),h.appendChild(w);const _=document.createElement("button");_.className="timeline-btn play-btn icon-only",_.title="Reproducir / Pausa (Enter)",_.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  `,_.addEventListener("click",()=>e.togglePlay()),h.appendChild(_);const b=document.createElement("button");b.className="timeline-btn icon-only",b.title="Fotograma siguiente (Flecha Derecha)",b.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  `,b.addEventListener("click",()=>e.nextFrame()),h.appendChild(b);const C=document.createElement("button");C.className="timeline-btn icon-only",C.title="Celda siguiente (Atajo: ])",C.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="4 6 15 12 4 18"/>
      <rect x="17.5" y="5" width="2.5" height="14" rx="0.5"/>
    </svg>
  `,C.addEventListener("click",()=>e.nextCel(d??void 0)),h.appendChild(C);const R=document.createElement("button");R.className="timeline-btn icon-only",R.title="Último fotograma (Shift+Derecha)",R.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  `,R.addEventListener("click",()=>e.lastFrame()),h.appendChild(R);const H=document.createElement("button");H.className=`timeline-btn icon-only ${e.settings.loop?"active":""}`,H.title="Repetir en bucle",H.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  `,H.addEventListener("click",()=>{e.setLoop(!e.settings.loop)}),h.appendChild(H);const P=document.createElement("div");P.className="timeline-separator",h.appendChild(P);const U=document.createElement("button");U.className="timeline-frame-counter",U.title="Fotograma actual / Total. Clic para abrir Edición de Línea de Tiempo",U.addEventListener("click",()=>{Gl(e)}),h.appendChild(U);const N=document.createElement("button");N.className="timeline-btn icon-only",N.title="Edición de Línea de Tiempo (Cantidad de fotogramas, FPS, Rango In/Out, División)",N.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `,N.addEventListener("click",()=>{Gl(e)}),h.appendChild(N),E.appendChild(h);const I=document.createElement("div");I.className="timeline-actions-group";const q=document.createElement("button");q.className="timeline-btn icon-only",q.title="Nueva Carpeta de Animación (Pista)",q.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  `,q.addEventListener("click",()=>{d=e.createTrack().id,Ue()}),I.appendChild(q);const B=document.createElement("button");B.className="timeline-btn icon-only",B.title="Nueva Celda de Animación en el fotograma actual",B.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="12" x2="12" y2="18"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `,B.addEventListener("click",()=>{const Z=x();e.createCel(Z==null?void 0:Z.id,e.settings.currentFrame)}),I.appendChild(B);const V=document.createElement("button");V.className="timeline-btn icon-only",V.title="Eliminar especificación de celda en fotograma actual",V.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `,V.addEventListener("click",()=>{const Z=x();Z&&e.removeExposure(Z.id,e.settings.currentFrame)}),I.appendChild(V);const K=document.createElement("div");K.className="timeline-separator",I.appendChild(K);const k=document.createElement("button");k.className="timeline-btn icon-only",k.title="Activar / Desactivar fotogramas clave en esta pista (CSP Enable Keyframes)",k.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffd43b" stroke-width="2.2">
      <polygon points="12 2 22 12 12 22 2 12 12 2"/>
    </svg>
  `,k.addEventListener("click",()=>{const Z=x();Z&&e.toggleTrackKeyframes(Z.id)}),I.appendChild(k);const G=document.createElement("button");G.className="timeline-btn icon-only",G.title="Añadir / Editar Keyframe en el fotograma actual (Atajo: K)",G.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffd43b" stroke="#ffd43b" stroke-width="1.5">
      <polygon points="12 3 21 12 12 21 3 12 12 3"/>
    </svg>
  `,G.addEventListener("click",()=>{const Z=x();if(!Z)return;const Se=e.settings.currentFrame;Z.keyframes.has(Se)||e.addOrUpdateKeyframe(Z.id,Se),Ds(e,Z,Se)}),I.appendChild(G);const F=document.createElement("select");F.className="timeline-select interp-select-compact",F.title="Interpolación del Keyframe (Suave / Lineal / Fijo)",F.innerHTML=`
    <option value="smooth">◆ Suave</option>
    <option value="linear">◇ Lineal</option>
    <option value="hold">■ Fijo</option>
  `,F.addEventListener("change",()=>{const Z=x();if(!Z)return;const Se=e.settings.currentFrame,He=F.value;Z.keyframes.has(Se)?e.setKeyframeInterpolation(Z.id,Se,He):e.addOrUpdateKeyframe(Z.id,Se,{interpolation:He})}),I.appendChild(F);const X=document.createElement("button");X.className="timeline-btn icon-only",X.title="Esqueleto 2D / Pose Keyframe (Crear esqueleto o registrar pose en este fotograma)",X.innerHTML='<span style="font-size:13px; line-height:1;">🦴</span>',X.addEventListener("click",()=>{e.bones.length===0?e.createHumanoidPreset(800,450):e.addOrUpdateBoneKeyframe(e.settings.currentFrame,F.value)}),I.appendChild(X);const W=document.createElement("div");W.className="timeline-separator",I.appendChild(W);const Q=document.createElement("button");Q.className=`timeline-btn icon-only ${e.onionSkin.enabled?"active":""}`,Q.title="Activar / Desactivar Papel Cebolla (Atajo: O)",Q.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1"/>
    </svg>
  `,Q.addEventListener("click",()=>{e.toggleOnionSkin()}),I.appendChild(Q);const j=document.createElement("button");j.className="timeline-btn icon-only",j.title="Ajustes de Papel Cebolla",j.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  `,j.addEventListener("click",()=>{Ag(e)}),I.appendChild(j);const se=document.createElement("div");se.className="timeline-separator",I.appendChild(se);const de=document.createElement("div");de.className="timeline-zoom-group",de.title="Zoom de ancho de fotogramas (Ctrl + Rueda)";const ae=document.createElement("button");ae.className="timeline-btn icon-only",ae.title="Reducir ancho de fotograma",ae.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `,ae.addEventListener("click",()=>M(at-3)),f=document.createElement("input"),f.type="range",f.className="timeline-zoom-slider",f.min=String(zl),f.max=String(Hl),f.value=String(at),f.title="Ajustar tamaño visual de las celdas en la línea de tiempo",f.addEventListener("input",()=>{M(Number(f.value))});const $=document.createElement("button");$.className="timeline-btn icon-only",$.title="Aumentar ancho de fotograma",$.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `,$.addEventListener("click",()=>M(at+3)),g=document.createElement("span"),g.className="timeline-zoom-label",g.textContent=`${at}px`,de.append(ae,f,$,g),I.appendChild(de),E.appendChild(I),i.appendChild(E);const Ve=document.createElement("div");Ve.className="timeline-body";const be=document.createElement("div");be.className="timeline-tracks-header-col";const Ne=document.createElement("div");Ne.className="timeline-tracks-corner",Ne.innerHTML="<span>Pistas / Keyframes</span>",be.appendChild(Ne);const me=document.createElement("div");me.className="timeline-track-headers-list",be.appendChild(me),Ve.appendChild(be);const Be=document.createElement("div");Be.className="csp-timeline-track-splitter",Be.title="Arrastrar para cambiar el ancho de la columna de pistas";const ze=localStorage.getItem("oniri.timeline.tracks-width");if(ze){const Z=Math.max(120,Math.min(380,Number(ze)));document.documentElement.style.setProperty("--timeline-tracks-width",`${Z}px`)}let D=!1,A=0,ee=180;Be.addEventListener("pointerdown",Z=>{Z.preventDefault(),Z.stopPropagation(),D=!0,A=Z.clientX,ee=be.offsetWidth,Be.classList.add("dragging"),Be.setPointerCapture(Z.pointerId)}),Be.addEventListener("pointermove",Z=>{if(!D)return;const Se=Z.clientX-A,He=Math.max(120,Math.min(380,ee+Se));document.documentElement.style.setProperty("--timeline-tracks-width",`${He}px`),localStorage.setItem("oniri.timeline.tracks-width",String(He))});const he=Z=>{if(D){D=!1,Be.classList.remove("dragging");try{Be.releasePointerCapture(Z.pointerId)}catch{}}};Be.addEventListener("pointerup",he),Be.addEventListener("pointercancel",he),Ve.appendChild(Be);const ce=document.createElement("div");ce.className="timeline-grid-container";const le=document.createElement("div");le.className="timeline-grid-content",ce.appendChild(le),Ve.appendChild(ce),i.style.pointerEvents="auto",i.appendChild(Ve),n.appendChild(i);let Fe=!1;function xe(Z,Se=!1){const He=ce.getBoundingClientRect(),Ce=Z-He.left+ce.scrollLeft,oe=Math.floor(Ce/at)+1;return Se?Math.max(1,Math.min(2e3,oe)):Math.max(1,Math.min(e.settings.totalFrames,oe))}function De(Z){e.goToFrame(xe(Z.clientX,!1))}ce.addEventListener("mousedown",Z=>{Z.button===0&&(Fe=!0,De(Z))}),ce.addEventListener("wheel",Z=>{if(Z.ctrlKey){Z.preventDefault();const Se=Z.deltaY<0?2:-2;M(at+Se)}},{passive:!1}),window.addEventListener("mousemove",Z=>{Fe&&De(Z)}),window.addEventListener("mouseup",()=>{Fe=!1});function Ue(){const Z=x();u.innerHTML="";for(const pe of e.scenes){const Le=document.createElement("option");Le.value=pe.id,Le.textContent=`🎬 ${pe.name} (${pe.settings.totalFrames}f)`,pe.id===e.activeSceneId&&(Le.selected=!0),u.appendChild(Le)}e.settings.isPlaying?(_.classList.add("playing"),_.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      `):(_.classList.remove("playing"),_.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      `),H.classList.toggle("active",e.settings.loop),Q.classList.toggle("active",e.onionSkin.enabled),U.textContent=`${e.settings.currentFrame} / ${e.settings.totalFrames}`;const Se=!!(Z!=null&&Z.keyframesEnabled);k.classList.toggle("active",Se);const He=Z==null?void 0:Z.keyframes.get(e.settings.currentFrame);if(He&&(F.value=He.interpolation),me.innerHTML="",e.bones.length>0){const pe=document.createElement("div");pe.className="timeline-track-header-item",pe.style.height="28px",pe.style.background="rgba(56, 189, 248, 0.08)",pe.style.borderBottom="1px solid rgba(56, 189, 248, 0.25)";const Le=document.createElement("span");Le.className="timeline-track-name",Le.style.color="#38bdf8",Le.style.fontWeight="600",Le.textContent=`🦴 Esqueleto 2D (${e.bones.length})`,pe.appendChild(Le);const ye=document.createElement("button");ye.className="timeline-track-kf-btn",ye.title="Restablecer pose a postura base en este fotograma",ye.textContent="↺",ye.addEventListener("click",je=>{je.stopPropagation(),e.resetBonePoseAtFrame(e.settings.currentFrame)}),pe.appendChild(ye);const Me=document.createElement("span");Me.className="timeline-track-badge",Me.textContent=`${e.boneKeyframes.size}k`,pe.appendChild(Me),me.appendChild(pe)}for(const pe of e.tracks){const Le=document.createElement("div");Le.className=`timeline-track-header-item ${pe.id===d?"selected":""} ${pe.keyframesEnabled?"has-kf-lane":""}`,Le.addEventListener("click",()=>{d=pe.id,Ue()});const ye=document.createElement("button");ye.className="timeline-track-eye-btn",ye.innerHTML=pe.visible?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/></svg>',ye.addEventListener("click",it=>{it.stopPropagation(),pe.visible=!pe.visible,t.setLayerVisibility(pe.folderId,pe.visible),Ue()}),Le.appendChild(ye);const Me=document.createElement("span");Me.className="timeline-track-name",Me.textContent=pe.name,Le.appendChild(Me);const je=document.createElement("button");je.className=`timeline-track-kf-btn ${pe.keyframesEnabled?"active":""}`,je.title=pe.keyframesEnabled?"Fotogramas clave activados (Clic para ocultar/desactivar)":"Activar transformación por Keyframes en esta pista",je.innerHTML=`
        <svg width="11" height="11" viewBox="0 0 24 24" fill="${pe.keyframesEnabled?"#ffd43b":"none"}" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 22 12 12 22 2 12 12 2"/>
        </svg>
      `,je.addEventListener("click",it=>{it.stopPropagation(),d=pe.id,e.toggleTrackKeyframes(pe.id)}),Le.appendChild(je);const ke=document.createElement("span");ke.className="timeline-track-badge",ke.textContent=`${pe.exposures.size}c`,Le.appendChild(ke),me.appendChild(Le)}le.innerHTML="";const Ce=e.settings.totalFrames,oe=Ce*at;le.style.width=`${oe+140}px`;const O=document.createElement("div");O.className="timeline-ruler",O.style.width=`${oe+140}px`;const fe=e.settings.division??5,ve=e.settings.timeFormat??"frames";for(let pe=1;pe<=Ce;pe++){const Le=document.createElement("div");Le.className="timeline-ruler-cell",(pe%fe===0||pe===1)&&(Le.classList.add("major"),Le.textContent=Tg(pe,e.settings.fps,ve)),pe>=e.settings.startFrame&&pe<=e.settings.endFrame&&Le.classList.add("playback-bound"),pe===e.settings.startFrame&&Le.classList.add("range-start"),pe===e.settings.endFrame&&Le.classList.add("range-end"),Le.addEventListener("click",ye=>{ye.stopPropagation(),e.goToFrame(pe)}),O.appendChild(Le)}const Ee=document.createElement("div");Ee.className="timeline-range-bracket start-bracket",Ee.title=`Inicio de reproducción (Fotograma ${e.settings.startFrame}). Arrastra para cambiar inicio.`,Ee.style.left=`${(e.settings.startFrame-1)*at}px`,ue(Ee,"start"),O.appendChild(Ee);const Re=document.createElement("div");Re.className="timeline-range-bracket end-bracket",Re.title=`Fin de reproducción (Fotograma ${e.settings.endFrame}). Arrastra para cambiar fin.`,Re.style.left=`${e.settings.endFrame*at-6}px`,ue(Re,"end"),O.appendChild(Re);const $e=document.createElement("div");if($e.className="timeline-total-end-handle",$e.style.left=`${oe}px`,$e.title=`Duración total: ${Ce} fotogramas. Arrastra a la derecha o izquierda para aumentar/reducir la cantidad de frames de la línea de tiempo.`,$e.innerHTML=`<span class="end-handle-pill">⇔ ${Ce}f</span>`,et($e),le.appendChild($e),le.appendChild(O),e.bones.length>0){const pe=document.createElement("div");pe.className="timeline-keyframe-lane",pe.style.width=`${oe}px`,pe.style.height="28px",pe.style.background="rgba(56, 189, 248, 0.05)",pe.style.borderBottom="1px solid rgba(56, 189, 248, 0.25)";for(let ye=1;ye<=Ce;ye++){const Me=document.createElement("div");Me.className="timeline-kf-cell",Me.title=`Fotograma ${ye}: Doble clic para registrar Keyframe de Pose 2D`,Me.addEventListener("click",je=>{je.stopPropagation(),e.goToFrame(ye)}),Me.addEventListener("dblclick",je=>{je.stopPropagation(),e.goToFrame(ye),e.addOrUpdateBoneKeyframe(ye,F.value)}),pe.appendChild(Me)}const Le=Array.from(e.boneKeyframes.values()).sort((ye,Me)=>ye.frame-Me.frame);for(let ye=0;ye<Le.length-1;ye++){const Me=Le[ye],je=Le[ye+1];if(Me.interpolation!=="hold"){const ke=document.createElement("div");ke.className=`timeline-kf-span-line ${Me.interpolation}`,ke.style.left=`${(Me.frame-1)*at+at/2}px`,ke.style.width=`${(je.frame-Me.frame)*at}px`,ke.style.background="#38bdf8",pe.appendChild(ke)}}for(const ye of Le){if(ye.frame>Ce)continue;const Me=document.createElement("div");Me.className=`timeline-kf-diamond ${ye.interpolation} ${e.settings.currentFrame===ye.frame?"active":""}`,Me.style.left=`${(ye.frame-1)*at+at/2}px`,Me.style.borderColor="#38bdf8",Me.title=`Pose Keyframe F${ye.frame} (${ye.interpolation}) | ${ye.poses.size} huesos posados
Clic para ir al fotograma, Arrastra para mover, Clic derecho para eliminar`,Me.addEventListener("mousedown",je=>{if(je.button!==0)return;je.stopPropagation(),je.preventDefault();let ke=!1,it=ye.frame;const Ft=Jt=>{const zt=xe(Jt.clientX,!1);zt!==ye.frame&&(ke=!0),it=zt,Me.style.left=`${(zt-1)*at+at/2}px`},Lt=()=>{window.removeEventListener("mousemove",Ft),window.removeEventListener("mouseup",Lt),ke&&it!==ye.frame?(e.moveBoneKeyframe(ye.frame,it),e.goToFrame(it)):e.goToFrame(ye.frame)};window.addEventListener("mousemove",Ft),window.addEventListener("mouseup",Lt)}),Me.addEventListener("contextmenu",je=>{je.preventDefault(),je.stopPropagation(),e.deleteBoneKeyframe(ye.frame)}),pe.appendChild(Me)}le.appendChild(pe)}for(const pe of e.tracks){const Le=document.createElement("div");Le.className=`timeline-track-row-wrapper ${pe.keyframesEnabled?"has-kf-lane":""}`,Le.style.width=`${oe}px`;const ye=document.createElement("div");ye.className="timeline-track-row",ye.style.width=`${oe}px`;for(let Me=1;Me<=Ce;Me++){const je=document.createElement("div");je.className="timeline-frame-cell",pe.exposures.has(Me)&&je.classList.add("key-cell"),je.addEventListener("click",ke=>{ke.stopPropagation(),d=pe.id,e.goToFrame(Me)}),je.addEventListener("dblclick",ke=>{ke.stopPropagation(),d=pe.id,e.createCel(pe.id,Me)}),je.addEventListener("contextmenu",ke=>{ke.preventDefault(),ke.stopPropagation(),d=pe.id,Vl(ke.clientX,ke.clientY,pe,Me,e,t)}),ye.appendChild(je)}for(const Me of pe.clips){const je=Math.max(1,Me.startFrame),ke=Math.min(Ce,Me.endFrame);if(ke<je)continue;const it=document.createElement("div");it.className="timeline-clip-container",it.style.left=`${(je-1)*at}px`,it.style.width=`${(ke-je+1)*at}px`;const Ft=document.createElement("div");Ft.className="timeline-clip-grip left",Ft.title="Arrastrar inicio del Clip",ot(Ft,pe.id,Me.id,"left",Me.startFrame,Me.endFrame),it.appendChild(Ft);const Lt=document.createElement("div");Lt.className="timeline-clip-grip right",Lt.title="Arrastrar fin del Clip (extiende la pista o la línea de tiempo)",ot(Lt,pe.id,Me.id,"right",Me.startFrame,Me.endFrame),it.appendChild(Lt),ye.appendChild(it);const Jt=Array.from(Me.exposures.entries()).filter(([zt])=>zt>=je&&zt<=ke).sort((zt,nn)=>zt[0]-nn[0]);for(let zt=0;zt<Jt.length;zt++){const[nn,ii]=Jt[zt],yi=Jt[zt+1],L=yi?Math.min(ke,yi[0]-1):ke,Y=Math.max(1,L-nn+1),te=t.layers.find(Ke=>Ke.id===ii),ne=te?te.name:"?",J=document.createElement("div");J.className="timeline-cel-block",e.settings.currentFrame>=nn&&e.settings.currentFrame<=L&&J.classList.add("active-cel"),J.style.left=`${(nn-1)*at}px`,J.style.width=`${Y*at-2}px`;const Ae=document.createElement("div");Ae.className="cel-resize-handle left",Ae.title="Arrastrar borde izquierdo para cambiar inicio de esta celda",tt(Ae,J,ye,pe,nn,L,"left"),J.appendChild(Ae);const Oe=document.createElement("div");Oe.className="timeline-cel-dot",J.appendChild(Oe);const qe=document.createElement("span");qe.className="timeline-cel-label",qe.textContent=`${ne} (${Y}f)`,J.appendChild(qe);const Ye=document.createElement("div");Ye.className="cel-resize-handle right",Ye.title="Arrastrar a la derecha o izquierda para aumentar/reducir duración de la celda (Alt = sin desplazar siguientes)",tt(Ye,J,ye,pe,nn,L,"right"),J.appendChild(Ye),Je(J,ye,pe,nn,Y,ne,te==null?void 0:te.id),J.addEventListener("contextmenu",Ke=>{Ke.preventDefault(),Ke.stopPropagation(),d=pe.id;const Qe=xe(Ke.clientX,!1);Vl(Ke.clientX,Ke.clientY,pe,Qe,e,t)}),ye.appendChild(J)}}if(Le.appendChild(ye),pe.keyframesEnabled){const Me=document.createElement("div");Me.className="timeline-keyframe-lane",Me.style.width=`${oe}px`;for(let ke=1;ke<=Ce;ke++){const it=document.createElement("div");it.className="timeline-kf-cell",it.title=`Fotograma ${ke}: Doble clic para crear/editar Keyframe`,it.addEventListener("dblclick",Ft=>{Ft.stopPropagation(),d=pe.id,e.goToFrame(ke),e.addOrUpdateKeyframe(pe.id,ke),Ds(e,pe,ke)}),Me.appendChild(it)}const je=Array.from(pe.keyframes.values()).sort((ke,it)=>ke.frame-it.frame);for(let ke=0;ke<je.length-1;ke++){const it=je[ke],Ft=je[ke+1];if(it.interpolation!=="hold"){const Lt=document.createElement("div");Lt.className=`timeline-kf-span-line ${it.interpolation}`,Lt.style.left=`${(it.frame-1)*at+at/2}px`,Lt.style.width=`${(Ft.frame-it.frame)*at}px`,Me.appendChild(Lt)}}for(const ke of je){if(ke.frame>Ce)continue;const it=document.createElement("div");it.className=`timeline-kf-diamond ${ke.interpolation} ${e.settings.currentFrame===ke.frame?"active":""}`,it.style.left=`${(ke.frame-1)*at+at/2}px`,it.title=`Keyframe F${ke.frame} (${ke.interpolation}) | X:${Math.round(ke.x)} Y:${Math.round(ke.y)} Escala:${Math.round(ke.scaleX*100)}% Rot:${Math.round(ke.rotation)}° Opacidad:${Math.round(ke.opacity*100)}%
Clic para editar, Arrastra para mover, Clic derecho para eliminar`,We(it,pe,ke.frame),Me.appendChild(it)}Le.appendChild(Me)}le.appendChild(Le)}const nt=document.createElement("div");nt.className="timeline-playhead",nt.style.left=`${(e.settings.currentFrame-1)*at+at/2}px`;const mt=document.createElement("div");mt.className="timeline-playhead-cap",nt.appendChild(mt),le.appendChild(nt)}function et(Z){Z.addEventListener("mousedown",Se=>{if(Se.button!==0)return;Se.stopPropagation(),Se.preventDefault(),Z.classList.add("dragging");const He=oe=>{const O=Math.max(1,xe(oe.clientX,!0));O!==e.settings.totalFrames&&e.setTotalFrames(O,!0)},Ce=()=>{Z.classList.remove("dragging"),window.removeEventListener("mousemove",He),window.removeEventListener("mouseup",Ce)};window.addEventListener("mousemove",He),window.addEventListener("mouseup",Ce)})}function ue(Z,Se){Z.addEventListener("mousedown",He=>{if(He.button!==0)return;He.stopPropagation(),He.preventDefault();const Ce=O=>{const fe=xe(O.clientX,!0);Se==="start"?e.setRange(Math.min(fe,e.settings.endFrame),e.settings.endFrame):(fe>e.settings.totalFrames&&e.setTotalFrames(fe,!0),e.setRange(e.settings.startFrame,Math.max(fe,e.settings.startFrame)))},oe=()=>{window.removeEventListener("mousemove",Ce),window.removeEventListener("mouseup",oe)};window.addEventListener("mousemove",Ce),window.addEventListener("mouseup",oe)})}function ot(Z,Se,He,Ce,oe,O){Z.addEventListener("mousedown",fe=>{if(fe.button!==0)return;fe.stopPropagation(),fe.preventDefault();const ve=Re=>{const $e=xe(Re.clientX,!0);Ce==="left"?e.resizeClip(Se,He,Math.min($e,O),O):e.resizeClip(Se,He,oe,Math.max($e,oe))},Ee=()=>{window.removeEventListener("mousemove",ve),window.removeEventListener("mouseup",Ee)};window.addEventListener("mousemove",ve),window.addEventListener("mouseup",Ee)})}function tt(Z,Se,He,Ce,oe,O,fe){Z.addEventListener("mousedown",ve=>{if(ve.button!==0)return;ve.stopPropagation(),ve.preventDefault(),Se.classList.add("resizing");let Ee=fe==="right"?O:oe;const Re=nt=>{var pe,Le;const mt=xe(nt.clientX,!0);if(fe==="right"){Ee=Math.max(oe,mt);const ye=Ee-oe+1;Se.style.width=`${ye*at-2}px`;const Me=Se.querySelector(".timeline-cel-label");if(Me){const je=((pe=Me.textContent)==null?void 0:pe.replace(/\s*\(\d+f\)$/,""))??"";Me.textContent=`${je} (${ye}f)`}}else{Ee=Math.max(1,Math.min(O,mt));const ye=O-Ee+1;Se.style.left=`${(Ee-1)*at}px`,Se.style.width=`${ye*at-2}px`;const Me=Se.querySelector(".timeline-cel-label");if(Me){const je=((Le=Me.textContent)==null?void 0:Le.replace(/\s*\(\d+f\)$/,""))??"";Me.textContent=`${je} (${ye}f)`}}He.querySelectorAll(".timeline-frame-cell").forEach((ye,Me)=>{ye.classList.toggle("drop-target",Me+1===Ee)})},$e=nt=>{window.removeEventListener("mousemove",Re),window.removeEventListener("mouseup",$e),Se.classList.remove("resizing"),He.querySelectorAll(".timeline-frame-cell").forEach(pe=>pe.classList.remove("drop-target"));const mt=nt.altKey?"overwrite":"ripple";e.resizeCelSpan(Ce.id,oe,fe,Ee,mt)};window.addEventListener("mousemove",Re),window.addEventListener("mouseup",$e)})}function Je(Z,Se,He,Ce,oe,O,fe){let ve=0,Ee=!1,Re=0,$e=Ce;Z.addEventListener("mousedown",nt=>{if(nt.button!==0||nt.target.classList.contains("cel-resize-handle"))return;nt.stopPropagation(),d=He.id,ve=nt.clientX,Ee=!1;const mt=xe(nt.clientX,!0);Re=Math.max(0,Math.min(oe-1,mt-Ce)),$e=Ce;const pe=ye=>{const Me=ye.clientX-ve;if(!Ee&&Math.abs(Me)>4&&(Ee=!0,Z.classList.add("dragging"),Z.classList.add("moving-body")),Ee){const je=xe(ye.clientX,!0);$e=Math.max(1,je-Re),Z.style.left=`${($e-1)*at}px`,Z.style.width=`${oe*at-2}px`;const ke=Z.querySelector(".timeline-cel-label");ke&&(ke.textContent=`${O} (${oe}f) → F${$e}`);const it=$e+oe-1;Se.querySelectorAll(".timeline-frame-cell").forEach((Ft,Lt)=>{const Jt=Lt+1;Ft.classList.toggle("drop-target",Jt>=$e&&Jt<=it)})}},Le=()=>{if(window.removeEventListener("mousemove",pe),window.removeEventListener("mouseup",Le),Se.querySelectorAll(".timeline-frame-cell").forEach(ye=>ye.classList.remove("drop-target")),Ee)if(Z.classList.remove("dragging"),Z.classList.remove("moving-body"),$e!==Ce)e.moveCelSpan(He.id,Ce,$e,oe);else{Z.style.left=`${(Ce-1)*at}px`,Z.style.width=`${oe*at-2}px`;const ye=Z.querySelector(".timeline-cel-label");ye&&(ye.textContent=`${O} (${oe}f)`)}else e.goToFrame(Ce),fe&&t.setActiveLayer(fe)};window.addEventListener("mousemove",pe),window.addEventListener("mouseup",Le)})}function We(Z,Se,He){let Ce=0,oe=!1;Z.addEventListener("mousedown",O=>{if(O.button!==0)return;O.stopPropagation(),d=Se.id,Ce=O.clientX,oe=!1;const fe=Ee=>{if(!oe&&Math.abs(Ee.clientX-Ce)>4&&(oe=!0,Z.classList.add("dragging")),oe){const Re=xe(Ee.clientX,!1);Z.style.left=`${(Re-1)*at+at/2}px`}},ve=Ee=>{if(window.removeEventListener("mousemove",fe),window.removeEventListener("mouseup",ve),Z.classList.remove("dragging"),oe){const Re=xe(Ee.clientX,!1);Re!==He?(e.moveKeyframe(Se.id,He,Re),e.goToFrame(Re)):Ue()}else e.goToFrame(He),Ds(e,Se,He)};window.addEventListener("mousemove",fe),window.addEventListener("mouseup",ve)}),Z.addEventListener("contextmenu",O=>{O.preventDefault(),O.stopPropagation(),e.deleteKeyframe(Se.id,He)})}window.addEventListener("keydown",Z=>{if(!["INPUT","SELECT","TEXTAREA"].includes(Z.target.tagName)){if(Z.code==="Enter"||Z.code==="NumpadEnter")Z.preventDefault(),e.togglePlay();else if(Z.code==="ArrowRight")Z.preventDefault(),Z.shiftKey?e.lastFrame():e.nextFrame();else if(Z.code==="ArrowLeft")Z.preventDefault(),Z.shiftKey?e.firstFrame():e.prevFrame();else if(Z.key==="]"||Z.key==="}")Z.preventDefault(),e.nextCel(d??void 0);else if(Z.key==="["||Z.key==="{")Z.preventDefault(),e.prevCel(d??void 0);else if(Z.key==="o"||Z.key==="O")Z.preventDefault(),e.toggleOnionSkin();else if(Z.key==="k"||Z.key==="K"){Z.preventDefault();const Se=x();Se&&e.addOrUpdateKeyframe(Se.id,e.settings.currentFrame)}}}),e.subscribe(Ue),Ue()}function Gl(n){var p,T;const e=document.createElement("div");e.className="onion-modal-backdrop";const t=document.createElement("div");t.className="onion-modal timeline-settings-modal";const i=n.settings,r=n.activeScene;t.innerHTML=`
    <h3>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
        <rect x="2" y="3" width="20" height="18" rx="2"/>
        <line x1="8" y1="3" x2="8" y2="21"/>
        <line x1="16" y1="3" x2="16" y2="21"/>
        <line x1="2" y1="9" x2="22" y2="9"/>
        <line x1="2" y1="15" x2="22" y2="15"/>
      </svg>
      Ajustes de Línea de Tiempo (Clip Studio Paint)
    </h3>

    <div class="onion-setting-row">
      <label>Nombre de la escena</label>
      <input type="text" id="tl-scene-name" class="tl-text-input" value="${r.name}"/>
    </div>

    <div class="onion-setting-row">
      <label>Cantidad total de fotogramas</label>
      <input type="number" id="tl-total-frames" min="1" max="2000" value="${i.totalFrames}"/>
    </div>

    <div class="onion-setting-row">
      <label>Velocidad (Fotogramas por seg / FPS)</label>
      <div style="display:flex; gap:6px; align-items:center;">
        <input type="number" id="tl-fps" min="1" max="120" value="${i.fps}"/>
        <select id="tl-fps-preset" style="width:95px;">
          <option value="">Preset...</option>
          <option value="8">8 fps (Anime 3s)</option>
          <option value="12">12 fps (2s)</option>
          <option value="24">24 fps (Cine/TV)</option>
          <option value="30">30 fps (Video)</option>
          <option value="60">60 fps (Fluido)</option>
        </select>
      </div>
    </div>

    <div class="onion-setting-row">
      <label>Fotograma de inicio (Playback Start)</label>
      <input type="number" id="tl-start-frame" min="1" max="2000" value="${i.startFrame}"/>
    </div>

    <div class="onion-setting-row">
      <label>Fotograma final (Playback End)</label>
      <input type="number" id="tl-end-frame" min="1" max="2000" value="${i.endFrame}"/>
    </div>

    <div class="onion-setting-row">
      <label>Formato de visualización de tiempo</label>
      <select id="tl-time-format" style="width:140px;">
        <option value="frames" ${(i.timeFormat??"frames")==="frames"?"selected":""}>Fotogramas (1, 5, 10...)</option>
        <option value="sec_frames" ${i.timeFormat==="sec_frames"?"selected":""}>Segundos + Fotogramas (0s+1f)</option>
        <option value="timecode" ${i.timeFormat==="timecode"?"selected":""}>Código de tiempo (00:00:00)</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>División de regla (Línea mayor)</label>
      <select id="tl-division" style="width:90px;">
        <option value="4" ${i.division===4?"selected":""}>Cada 4 f</option>
        <option value="5" ${(i.division??5)===5?"selected":""}>Cada 5 f</option>
        <option value="6" ${i.division===6?"selected":""}>Cada 6 f</option>
        <option value="8" ${i.division===8?"selected":""}>Cada 8 f</option>
        <option value="12" ${i.division===12?"selected":""}>Cada 12 f</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>Reproducción en bucle (Loop)</label>
      <input type="checkbox" id="tl-loop" ${i.loop?"checked":""}/>
    </div>

    <div class="tl-duration-summary" id="tl-duration-summary">
      Duración estimada: ${(i.totalFrames/i.fps).toFixed(2)} seg
    </div>

    <div class="onion-modal-actions">
      <button class="timeline-btn" id="tl-modal-cancel">Cancelar</button>
      <button class="timeline-btn active" id="tl-modal-apply">Aplicar Ajustes</button>
    </div>
  `,e.appendChild(t),document.body.appendChild(e);const s=t.querySelector("#tl-scene-name"),o=t.querySelector("#tl-total-frames"),a=t.querySelector("#tl-fps"),c=t.querySelector("#tl-fps-preset"),l=t.querySelector("#tl-start-frame"),d=t.querySelector("#tl-end-frame"),f=t.querySelector("#tl-time-format"),g=t.querySelector("#tl-division"),x=t.querySelector("#tl-loop"),M=t.querySelector("#tl-duration-summary"),E=()=>{const u=Math.max(1,Number(o.value)||1),m=Math.max(1,Number(a.value)||12);M.textContent=`Duración total: ${(u/m).toFixed(2)} seg (${u} fotogramas a ${m} FPS)`};o.addEventListener("input",()=>{const u=Math.max(1,Number(o.value)||1);(Number(d.value)===i.totalFrames||Number(d.value)>u)&&(d.value=String(u)),E()}),a.addEventListener("input",E),c.addEventListener("change",()=>{c.value&&(a.value=c.value,E())});const h=()=>e.remove();(p=t.querySelector("#tl-modal-cancel"))==null||p.addEventListener("click",h),(T=t.querySelector("#tl-modal-apply"))==null||T.addEventListener("click",()=>{const u=Math.max(1,Number(o.value)||i.totalFrames),m=Math.max(1,Number(a.value)||i.fps),S=Math.max(1,Number(l.value)||1),y=Math.max(S,Math.min(u,Number(d.value)||u));n.updateTimelineSettings({sceneName:s.value,totalFrames:u,fps:m,startFrame:S,endFrame:y,timeFormat:f.value,division:Number(g.value),loop:x.checked}),h()}),e.addEventListener("click",u=>{u.target===e&&h()})}function Cg(n){const e=document.createElement("div");e.className="onion-modal-backdrop";const t=document.createElement("div");t.className="onion-modal scene-manager-modal",t.style.width="390px";const i=()=>{var a,c,l,d,f,g,x;const r=n.activeScene,s=n.scenes;t.innerHTML=`
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <line x1="2" y1="9" x2="22" y2="9"/>
          <line x1="7" y1="4" x2="5" y2="9"/>
          <line x1="12" y1="4" x2="10" y2="9"/>
          <line x1="17" y1="4" x2="15" y2="9"/>
          <circle cx="12" cy="15" r="2"/>
        </svg>
        Edición y Gestión de Escenas
      </h3>

      <!-- 1. Renombrar Escena Activa -->
      <div style="background:#1c1c1c; border:1px solid #383838; border-radius:6px; padding:10px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:600; color:#888; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">
          Escena Activa:
        </div>
        <div style="display:flex; gap:6px;">
          <input type="text" id="sm-active-name" class="tl-text-input" style="flex:1;" value="${r.name}"/>
          <button class="timeline-btn" id="sm-rename-btn">Renombrar</button>
        </div>
      </div>

      <!-- 2. Acciones Rápidas (Nueva / Duplicar) -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:12px;">
        <button class="timeline-btn" id="sm-new-scene-btn" style="height:32px; justify-content:flex-start; padding:0 10px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          <span>Nueva Escena...</span>
        </button>
        <button class="timeline-btn" id="sm-dup-scene-btn" style="height:32px; justify-content:flex-start; padding:0 10px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffd43b" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Duplicar Activa</span>
        </button>
      </div>

      <!-- Subformulario colapsable para crear nueva escena -->
      <div id="sm-new-scene-form" style="display:none; background:#181818; border:1px dashed #00e5ff; border-radius:6px; padding:10px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:600; color:#00e5ff; margin-bottom:8px;">Crear Nueva Escena</div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Nombre</label>
          <input type="text" id="sm-new-name" class="tl-text-input" style="width:140px;" value="Escena ${s.length+1}"/>
        </div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Fotogramas</label>
          <input type="number" id="sm-new-frames" min="1" max="2000" value="${r.settings.totalFrames}"/>
        </div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Velocidad (FPS)</label>
          <input type="number" id="sm-new-fps" min="1" max="120" value="${r.settings.fps}"/>
        </div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Duplicar pistas/dibujos</label>
          <input type="checkbox" id="sm-new-dup"/>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:8px;">
          <button class="timeline-btn" id="sm-new-cancel" style="height:24px;">Cancelar</button>
          <button class="timeline-btn active" id="sm-new-create" style="height:24px;">Crear</button>
        </div>
      </div>

      <!-- 3. Lista de Escenas -->
      <div style="font-size:11px; font-weight:600; color:#888; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">
        Escenas en el Proyecto (${s.length}):
      </div>
      <div class="scene-list-container" style="max-height:160px; overflow-y:auto; border:1px solid #333; border-radius:6px; margin-bottom:14px; background:#141414;">
        ${s.map(M=>`
          <div class="scene-list-row" style="display:flex; align-items:center; justify-content:space-between; padding:6px 10px; border-bottom:1px solid #222; font-size:12px; background:${M.id===n.activeSceneId?"#1a2632":"transparent"};">
            <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
              <span style="color:${M.id===n.activeSceneId?"#00e5ff":"#666"};">🎬</span>
              <span style="font-weight:${M.id===n.activeSceneId?"600":"400"}; color:${M.id===n.activeSceneId?"#00e5ff":"#eee"}; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:160px;">${M.name}</span>
              <span style="font-size:10px; color:#777;">${M.settings.totalFrames}f (${(M.settings.totalFrames/M.settings.fps).toFixed(1)}s)</span>
            </div>
            <div style="display:flex; gap:4px; align-items:center;">
              ${M.id!==n.activeSceneId?`<button class="timeline-btn btn-switch-sc" data-id="${M.id}" style="height:22px; padding:0 8px; font-size:10px;">Activar</button>`:'<span style="font-size:10px; color:#00e5ff; font-weight:600; padding:0 6px;">Activa</span>'}
              ${s.length>1?`<button class="timeline-btn btn-del-sc" data-id="${M.id}" style="height:22px; width:22px; padding:0; color:#ff6b6b; font-size:12px;" title="Eliminar Escena">✕</button>`:""}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- 4. Acciones Inferiores -->
      <div class="onion-modal-actions" style="justify-content:space-between;">
        ${s.length>1?`
          <button class="timeline-btn" id="sm-del-active-btn" style="color:#ff6b6b; border-color:#663333;">
            Eliminar Escena Activa
          </button>
        `:"<div></div>"}
        <button class="timeline-btn active" id="sm-close-btn">Listo</button>
      </div>
    `,(a=t.querySelector("#sm-rename-btn"))==null||a.addEventListener("click",()=>{const M=t.querySelector("#sm-active-name");M&&M.value.trim()&&(n.updateTimelineSettings({sceneName:M.value.trim()}),i())});const o=t.querySelector("#sm-new-scene-form");(c=t.querySelector("#sm-new-scene-btn"))==null||c.addEventListener("click",()=>{o.style.display=o.style.display==="none"?"block":"none"}),(l=t.querySelector("#sm-new-cancel"))==null||l.addEventListener("click",()=>{o.style.display="none"}),(d=t.querySelector("#sm-new-create"))==null||d.addEventListener("click",()=>{const M=t.querySelector("#sm-new-name").value,E=Number(t.querySelector("#sm-new-frames").value)||24,h=Number(t.querySelector("#sm-new-fps").value)||12,p=t.querySelector("#sm-new-dup").checked;n.createScene(M,p),n.updateTimelineSettings({totalFrames:E,fps:h,startFrame:1,endFrame:E}),i()}),(f=t.querySelector("#sm-dup-scene-btn"))==null||f.addEventListener("click",()=>{n.createScene(`${n.activeScene.name} (Copia)`,!0),i()}),t.querySelectorAll(".btn-switch-sc").forEach(M=>{M.addEventListener("click",()=>{const E=M.dataset.id;E&&(n.switchScene(E),i())})}),t.querySelectorAll(".btn-del-sc").forEach(M=>{M.addEventListener("click",()=>{const E=M.dataset.id;if(E&&n.scenes.length>1){const h=n.scenes.find(p=>p.id===E);confirm(`¿Eliminar la escena "${h==null?void 0:h.name}"?`)&&(n.deleteScene(E),i())}})}),(g=t.querySelector("#sm-del-active-btn"))==null||g.addEventListener("click",()=>{n.scenes.length>1&&confirm(`¿Eliminar la escena "${n.activeScene.name}"?`)&&(n.deleteScene(n.activeSceneId),i())}),(x=t.querySelector("#sm-close-btn"))==null||x.addEventListener("click",()=>{e.remove()})};i(),e.appendChild(t),document.body.appendChild(e),e.addEventListener("click",r=>{r.target===e&&e.remove()})}function Ds(n,e,t){var E,h,p;const i=document.createElement("div");i.className="onion-modal-backdrop";const r=document.createElement("div");r.className="onion-modal";const o=e.keyframes.get(t)??{...n.getInterpolatedTransform(e.id,t),interpolation:"smooth"};r.innerHTML=`
    <h3>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd43b" stroke="#ffd43b" stroke-width="1.5">
        <polygon points="12 2 22 12 12 22 2 12 12 2"/>
      </svg>
      Keyframe — ${e.name} (Fotograma ${t})
    </h3>

    <div class="onion-setting-row">
      <label>Interpolación</label>
      <select id="kf-interp" style="width:130px;">
        <option value="smooth" ${o.interpolation==="smooth"?"selected":""}>◆ Suave (Smooth)</option>
        <option value="linear" ${o.interpolation==="linear"?"selected":""}>◇ Lineal (Linear)</option>
        <option value="hold" ${o.interpolation==="hold"?"selected":""}>■ Fijo (Hold)</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>Posición X (px)</label>
      <input type="number" id="kf-x" min="-1600" max="1600" step="5" value="${Math.round(o.x)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Posición Y (px)</label>
      <input type="number" id="kf-y" min="-900" max="900" step="5" value="${Math.round(o.y)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Escala (%)</label>
      <input type="number" id="kf-scale" min="10" max="500" step="5" value="${Math.round(o.scaleX*100)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Rotación (°)</label>
      <input type="number" id="kf-rot" min="-360" max="360" step="5" value="${Math.round(o.rotation)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Opacidad de pista (%)</label>
      <input type="number" id="kf-opacity" min="0" max="100" step="5" value="${Math.round(o.opacity*100)}"/>
    </div>

    <div class="onion-modal-actions" style="justify-content:space-between;">
      <button class="timeline-btn" id="kf-delete" style="color:#ff6b6b; border-color:#663333;">Eliminar Key</button>
      <div style="display:flex; gap:6px;">
        <button class="timeline-btn" id="kf-reset">Resetear</button>
        <button class="timeline-btn active" id="kf-close">Listo</button>
      </div>
    </div>
  `,i.appendChild(r),document.body.appendChild(i);const a=r.querySelector("#kf-interp"),c=r.querySelector("#kf-x"),l=r.querySelector("#kf-y"),d=r.querySelector("#kf-scale"),f=r.querySelector("#kf-rot"),g=r.querySelector("#kf-opacity"),x=()=>{const T=Math.max(.05,(Number(d.value)||100)/100);n.addOrUpdateKeyframe(e.id,t,{interpolation:a.value,x:Number(c.value)||0,y:Number(l.value)||0,scaleX:T,scaleY:T,rotation:Number(f.value)||0,opacity:Math.max(0,Math.min(1,(Number(g.value)??100)/100))})};a.addEventListener("change",x),c.addEventListener("input",x),l.addEventListener("input",x),d.addEventListener("input",x),f.addEventListener("input",x),g.addEventListener("input",x);const M=()=>i.remove();(E=r.querySelector("#kf-reset"))==null||E.addEventListener("click",()=>{c.value="0",l.value="0",d.value="100",f.value="0",g.value="100",x()}),(h=r.querySelector("#kf-delete"))==null||h.addEventListener("click",()=>{n.deleteKeyframe(e.id,t),M()}),(p=r.querySelector("#kf-close"))==null||p.addEventListener("click",M),i.addEventListener("click",T=>{T.target===i&&M()})}function Ag(n,e){const t=document.createElement("div");t.className="onion-modal-backdrop";const i=document.createElement("div");i.className="onion-modal";let r="general";const s=()=>{var M,E,h,p,T,u,m,S,y,v,w,_,b,C,R,H,P,U,N,I,q;const a=n.onionSkin,c=a.customReferences;let l=c.find(B=>B.celId===a.activeReferenceCelId)??c[0],d=null,f="Celda Anterior";if(!l&&n.tracks.length>0){const B=n.tracks[0],V=n.settings.currentFrame,k=[...Array.from(B.exposures.keys()).sort((G,F)=>G-F)].reverse().find(G=>G<V);k!==void 0&&(d=B.exposures.get(k)??null,d&&(f=`${B.name} (F${k})`))}const g=l?l.celId:d,x=g?n.getOnionSkinTransform(g):null;if(i.innerHTML=`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="margin:0;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="12" cy="12" r="1"/>
          </svg>
          Papel Cebolla y Mesa de Luz
        </h3>
        <button class="csp-lt-mini-btn close" id="onion-modal-top-close" title="Cerrar">✕</button>
      </div>

      <div class="onion-modal-tabs">
        <button class="onion-modal-tab-btn ${r==="general"?"active":""}" id="tab-onion-general">
          Configuración General
        </button>
        <button class="onion-modal-tab-btn ${r==="lightTable"?"active":""}" id="tab-onion-lt">
          Mesa de Luz y Calibración
        </button>
      </div>

      ${r==="general"?`
        <div class="onion-setting-row">
          <label>Mostrar Papel Cebolla</label>
          <input type="checkbox" id="onion-enable" ${a.enabled?"checked":""}/>
        </div>

        <div class="onion-setting-row">
          <label>Modo de visualización</label>
          <select id="onion-mode">
            <option value="tint" ${a.mode==="tint"?"selected":""}>Tintado Monocromo (CSP)</option>
            <option value="color" ${a.mode==="color"?"selected":""}>Color Original</option>
          </select>
        </div>

        <div class="onion-setting-row">
          <label>Celdas anteriores (Pasado)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="onion-prev-count" min="1" max="10" value="${a.prevFrames}"/>
            <input type="color" id="onion-prev-color" value="${a.prevColor}"/>
          </div>
        </div>

        <div class="onion-setting-row">
          <label>Celdas posteriores (Futuro)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="onion-next-count" min="1" max="10" value="${a.nextFrames}"/>
            <input type="color" id="onion-next-color" value="${a.nextColor}"/>
          </div>
        </div>

        <div class="onion-setting-row">
          <label>Opacidad inicial (%)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="range" id="onion-start-opacity-range" min="5" max="100" step="5" value="${Math.round(a.startOpacity*100)}" style="width:100px;"/>
            <span id="onion-start-opacity-lbl" style="font-size:11px; font-family:monospace; min-width:32px;">${Math.round(a.startOpacity*100)}%</span>
          </div>
        </div>

        <div class="onion-setting-row">
          <label>Atenuación por distancia (%)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="range" id="onion-step-opacity-range" min="0" max="30" step="5" value="${Math.round(a.stepOpacity*100)}" style="width:100px;"/>
            <span id="onion-step-opacity-lbl" style="font-size:11px; font-family:monospace; min-width:32px;">${Math.round(a.stepOpacity*100)}%</span>
          </div>
        </div>
      `:`
        <!-- Light Table / Reference Calibration Tab -->
        <div class="csp-lt-quick-bar" style="margin-bottom:10px;">
          <button class="timeline-btn" id="onion-lt-add-prev" title="Fijar celda anterior como referencia">
            <span>[◀ Anterior</span>
          </button>
          <button class="timeline-btn" id="onion-lt-add-next" title="Fijar celda siguiente como referencia">
            <span>Siguiente ▶]</span>
          </button>
          <select class="timeline-select" id="onion-lt-add-select" style="flex:1;" title="Añadir cualquier celda a la mesa de luz">
            <option value="">+ Fijar Celda...</option>
          </select>
        </div>

        <div class="csp-lt-section-title">
          <span>Celdas Registradas (${c.length})</span>
          ${c.length>0?'<button class="csp-lt-text-link" id="onion-lt-clear-all">Limpiar todo</button>':""}
        </div>

        <div class="csp-lt-list-wrap" style="max-height:120px; overflow-y:auto; margin-bottom:10px;">
          ${c.length===0?`
            <div class="csp-lt-empty-hint" style="padding:10px 6px;">
              ${d?`Calibrando <strong>${f}</strong>.<br/>Usa <strong>[◀ Anterior]</strong> o <strong>[Siguiente ▶]</strong> para fijar referencias fijas.`:"Sin referencias registradas."}
            </div>
          `:""}

          ${c.map(B=>`
              <div class="csp-lt-item-row ${l&&l.id===B.id?"active":""}" data-id="${B.id}">
                <button class="csp-lt-eye-btn ${B.visible?"visible":""}" data-id="${B.id}" title="${B.visible?"Ocultar":"Mostrar"}">
                  ${B.visible?"👁":"─"}
                </button>
                <div class="csp-lt-item-info">
                  <span class="csp-lt-item-name">${B.name}</span>
                  <span class="csp-lt-item-sub">${B.trackName??"Pista"} · F${B.frame??"?"}</span>
                </div>
                <div class="csp-lt-item-swatch" style="background:${B.colorMode==="color"?"linear-gradient(45deg, #f00, #0f0, #00f)":B.tintColor??"#ffd43b"};"></div>
                <button class="csp-lt-item-del" data-id="${B.id}" title="Quitar referencia">✕</button>
              </div>
            `).join("")}
        </div>

        ${g&&x?`
          <div class="csp-lt-detail-box" style="margin-top:4px;">
            <div class="csp-lt-detail-header">
              <span>Ajustes: <strong>${l?l.name:f}</strong></span>
              <button class="timeline-btn" id="onion-lt-reset-btn" style="height:20px; font-size:10px; padding:0 6px;" title="Restablecer posición, escala y rotación original">
                ↺ Restablecer
              </button>
            </div>

            <!-- Opacity & Tint -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:11px; color:#888;">Opacidad:</label>
                <input type="range" id="onion-ref-opacity" min="5" max="100" value="${Math.round(((l==null?void 0:l.opacity)??a.startOpacity)*100)}" style="width:70px;"/>
                <span style="font-size:10px; font-family:monospace;">${Math.round(((l==null?void 0:l.opacity)??a.startOpacity)*100)}%</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:11px; color:#888;">Tinte:</label>
                <input type="color" id="onion-ref-tint" value="${(l==null?void 0:l.tintColor)??"#ffd43b"}" style="width:24px; height:20px; padding:0; border:1px solid #444; border-radius:3px; cursor:pointer;"/>
              </div>
            </div>

            <!-- Position D-Pad & Inputs -->
            <div class="csp-lt-transform-section">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:10px; font-weight:600; color:#888; text-transform:uppercase;">Posición y Escala</span>
                <div style="display:flex; gap:4px;">
                  <button class="timeline-btn ${x.flipX?"active":""}" id="onion-flip-h" style="height:20px; font-size:10px; padding:0 5px;" title="Voltear Horizontal">⇄ H</button>
                  <button class="timeline-btn ${x.flipY?"active":""}" id="onion-flip-v" style="height:20px; font-size:10px; padding:0 5px;" title="Voltear Vertical">⇅ V</button>
                </div>
              </div>

              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <div class="csp-lt-dpad">
                  <div></div>
                  <button class="csp-lt-dpad-btn" id="onion-pad-up" title="Mover arriba">▲</button>
                  <div></div>
                  <button class="csp-lt-dpad-btn" id="onion-pad-left" title="Mover izquierda">◀</button>
                  <button class="csp-lt-dpad-btn center" id="onion-pad-center" title="Centrar">●</button>
                  <button class="csp-lt-dpad-btn" id="onion-pad-right" title="Mover derecha">▶</button>
                  <div></div>
                  <button class="csp-lt-dpad-btn" id="onion-pad-down" title="Mover abajo">▼</button>
                  <div></div>
                </div>

                <div style="display:flex; flex-direction:column; gap:4px; font-size:11px;">
                  <div style="display:flex; align-items:center; gap:4px;">
                    <span style="color:#777; width:12px;">X:</span>
                    <input type="number" id="onion-num-x" value="${Math.round(x.x)}" style="width:55px; background:#111; border:1px solid #444; border-radius:3px; color:#eee; font-size:11px; padding:2px 4px;"/>
                    <span style="color:#666; font-size:10px;">px</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:4px;">
                    <span style="color:#777; width:12px;">Y:</span>
                    <input type="number" id="onion-num-y" value="${Math.round(x.y)}" style="width:55px; background:#111; border:1px solid #444; border-radius:3px; color:#eee; font-size:11px; padding:2px 4px;"/>
                    <span style="color:#666; font-size:10px;">px</span>
                  </div>
                </div>
              </div>

              <!-- Rotation -->
              <div class="onion-setting-row" style="margin-bottom:6px;">
                <label>Rotación</label>
                <div style="display:flex; align-items:center; gap:4px;">
                  <button class="timeline-btn" id="onion-rot-m15" style="height:20px; padding:0 4px; font-size:10px;">-15°</button>
                  <input type="range" id="onion-rot-slider" min="-180" max="180" value="${Math.round(x.rotation)}" style="width:90px;"/>
                  <button class="timeline-btn" id="onion-rot-p15" style="height:20px; padding:0 4px; font-size:10px;">+15°</button>
                  <span style="font-size:10px; font-family:monospace; min-width:28px; text-align:right;">${Math.round(x.rotation)}°</span>
                </div>
              </div>

              <!-- Scale -->
              <div class="onion-setting-row" style="margin-bottom:0;">
                <label>Escala</label>
                <div style="display:flex; align-items:center; gap:4px;">
                  <input type="range" id="onion-scale-slider" min="20" max="250" value="${Math.round(x.scaleX*100)}" style="width:130px;"/>
                  <span style="font-size:10px; font-family:monospace; min-width:32px; text-align:right;">${Math.round(x.scaleX*100)}%</span>
                </div>
              </div>
            </div>
          </div>
        `:""}
      `}

      <div class="onion-modal-actions" style="margin-top:14px;">
        <button class="timeline-btn" id="onion-modal-close">Cerrar</button>
      </div>
    `,(M=i.querySelector("#tab-onion-general"))==null||M.addEventListener("click",()=>{r="general",s()}),(E=i.querySelector("#tab-onion-lt"))==null||E.addEventListener("click",()=>{r="lightTable",s()}),(h=i.querySelector("#onion-modal-top-close"))==null||h.addEventListener("click",o),(p=i.querySelector("#onion-modal-close"))==null||p.addEventListener("click",o),r==="general"){const B=i.querySelector("#onion-enable"),V=i.querySelector("#onion-mode"),K=i.querySelector("#onion-prev-count"),k=i.querySelector("#onion-prev-color"),G=i.querySelector("#onion-next-count"),F=i.querySelector("#onion-next-color"),X=i.querySelector("#onion-start-opacity-range"),W=i.querySelector("#onion-step-opacity-range"),Q=()=>{n.setOnionSkin({enabled:B.checked,mode:V.value,prevFrames:Number(K.value),prevColor:k.value,nextFrames:Number(G.value),nextColor:F.value,startOpacity:Number(X.value)/100,stepOpacity:Number(W.value)/100});const j=i.querySelector("#onion-start-opacity-lbl");j&&(j.textContent=`${X.value}%`);const se=i.querySelector("#onion-step-opacity-lbl");se&&(se.textContent=`${W.value}%`)};B==null||B.addEventListener("change",Q),V==null||V.addEventListener("change",Q),K==null||K.addEventListener("input",Q),k==null||k.addEventListener("input",Q),G==null||G.addEventListener("input",Q),F==null||F.addEventListener("input",Q),X==null||X.addEventListener("input",Q),W==null||W.addEventListener("input",Q)}else{(T=i.querySelector("#onion-lt-add-prev"))==null||T.addEventListener("click",()=>{n.registerPrevCelToLightTable(),s()}),(u=i.querySelector("#onion-lt-add-next"))==null||u.addEventListener("click",()=>{n.registerNextCelToLightTable(),s()}),(m=i.querySelector("#onion-lt-clear-all"))==null||m.addEventListener("click",()=>{const V=[...n.onionSkin.customReferences];for(const K of V)n.removeCustomOnionReference(K.id);s()});const B=i.querySelector("#onion-lt-add-select");if(B){for(const V of n.tracks){const K=n.getCelsInTrack(V.id);for(const k of K){const G=document.createElement("option");G.value=k.id,G.textContent=`${V.name}: ${k.name}`,B.appendChild(G)}}B.addEventListener("change",()=>{B.value&&(n.addCustomOnionReference(B.value),s())})}if(i.querySelectorAll(".csp-lt-item-row").forEach(V=>{const K=V.dataset.id;V.addEventListener("click",k=>{const G=k.target;if(!(G.classList.contains("csp-lt-eye-btn")||G.classList.contains("csp-lt-item-del"))&&K){const F=n.onionSkin.customReferences.find(X=>X.id===K);F&&(n.setActiveReferenceCel(F.celId),s())}})}),i.querySelectorAll(".csp-lt-eye-btn").forEach(V=>{V.addEventListener("click",K=>{K.stopPropagation();const k=V.dataset.id,G=n.onionSkin.customReferences.find(F=>F.id===k);G&&(n.updateCustomOnionReference(G.id,{visible:!G.visible}),s())})}),i.querySelectorAll(".csp-lt-item-del").forEach(V=>{V.addEventListener("click",K=>{K.stopPropagation();const k=V.dataset.id;k&&(n.removeCustomOnionReference(k),s())})}),g&&x){const V=g;(S=i.querySelector("#onion-lt-reset-btn"))==null||S.addEventListener("click",()=>{n.resetOnionSkinTransform(V),s()}),(y=i.querySelector("#onion-ref-opacity"))==null||y.addEventListener("input",F=>{const X=Number(F.target.value)/100;l?n.updateCustomOnionReference(l.id,{opacity:X}):n.setOnionSkin({startOpacity:X});const W=F.target.nextElementSibling;W&&(W.textContent=`${Math.round(X*100)}%`)}),(v=i.querySelector("#onion-ref-tint"))==null||v.addEventListener("input",F=>{const X=F.target.value;l?n.updateCustomOnionReference(l.id,{tintColor:X,colorMode:"monochrome"}):n.setOnionSkin({prevColor:X})}),(w=i.querySelector("#onion-flip-h"))==null||w.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{flipX:!F.flipX}),s()}),(_=i.querySelector("#onion-flip-v"))==null||_.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{flipY:!F.flipY}),s()});const K=5;(b=i.querySelector("#onion-pad-up"))==null||b.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{y:F.y-K}),s()}),(C=i.querySelector("#onion-pad-down"))==null||C.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{y:F.y+K}),s()}),(R=i.querySelector("#onion-pad-left"))==null||R.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{x:F.x-K}),s()}),(H=i.querySelector("#onion-pad-right"))==null||H.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{x:F.x+K}),s()}),(P=i.querySelector("#onion-pad-center"))==null||P.addEventListener("click",()=>{n.updateOnionSkinTransform(V,{x:0,y:0}),s()}),(U=i.querySelector("#onion-num-x"))==null||U.addEventListener("change",F=>{const X=Number(F.target.value);n.updateOnionSkinTransform(V,{x:X})}),(N=i.querySelector("#onion-num-y"))==null||N.addEventListener("change",F=>{const X=Number(F.target.value);n.updateOnionSkinTransform(V,{y:X})});const k=i.querySelector("#onion-rot-slider");k==null||k.addEventListener("input",()=>{var W;const F=Number(k.value);n.updateOnionSkinTransform(V,{rotation:F});const X=(W=k.nextElementSibling)==null?void 0:W.nextElementSibling;X&&(X.textContent=`${F}°`)}),(I=i.querySelector("#onion-rot-m15"))==null||I.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{rotation:F.rotation-15}),s()}),(q=i.querySelector("#onion-rot-p15"))==null||q.addEventListener("click",()=>{const F=n.getOnionSkinTransform(V);n.updateOnionSkinTransform(V,{rotation:F.rotation+15}),s()});const G=i.querySelector("#onion-scale-slider");G==null||G.addEventListener("input",()=>{const F=Number(G.value),X=F/100;n.updateOnionSkinTransform(V,{scaleX:X,scaleY:X});const W=G.nextElementSibling;W&&(W.textContent=`${F}%`)})}}},o=()=>{t.remove()};t.addEventListener("click",a=>{a.target===t&&o()}),s(),t.appendChild(i),document.body.appendChild(t)}function Vl(n,e,t,i,r,s){document.querySelectorAll(".timeline-context-menu").forEach(v=>v.remove());const o=document.createElement("div");o.className="timeline-context-menu";const a=document.createElement("div");a.className="context-menu-header",a.innerHTML=`<span>${t.name}</span><span style="color:#00e5ff;">Fotograma ${i}</span>`,o.appendChild(a);const c=r.getCelsInTrack(t.id),l=t.exposures.get(i),d=r.getActiveCelForFrame(t.id,i),f=document.createElement("div");f.className="context-menu-section-title",f.textContent="Asignar Celda Existente",o.appendChild(f);const g=document.createElement("div");if(g.className="context-menu-cels-list",c.length===0){const v=document.createElement("div");v.className="context-menu-item",v.style.color="#777777",v.style.fontStyle="italic",v.textContent="(Sin celdas en la pista)",g.appendChild(v)}else for(const v of c){const w=document.createElement("div");w.className="context-menu-item";const _=l===v.id;_&&w.classList.add("active"),w.innerHTML=`
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="width:7px; height:7px; border-radius:50%; background:${_?"#00e5ff":"#627d98"};"></span>
          <span>${v.name}</span>
        </span>
        ${_?'<span style="color:#00e5ff; font-weight:bold;">✓</span>':""}
      `,w.addEventListener("click",()=>{r.specifyCel(t.id,i,v.id),r.goToFrame(i),s.setActiveLayer(v.id),o.remove()}),g.appendChild(w)}o.appendChild(g);const x=document.createElement("div");x.className="context-menu-separator",o.appendChild(x);const M=document.createElement("div");M.className="context-menu-item",M.innerHTML=`
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
      <span>Nueva celda de animación</span>
    </span>
  `,M.addEventListener("click",()=>{r.createCel(t.id,i),r.goToFrame(i),o.remove()}),o.appendChild(M);const E=document.createElement("div");E.className="context-menu-item",E.innerHTML=`
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffd43b" stroke="#ffd43b" stroke-width="1.5"><polygon points="12 2 22 12 12 22 2 12 12 2"/></svg>
      <span>${t.keyframes.has(i)?"Editar Keyframe en este frame":"Insertar Keyframe aquí"}</span>
    </span>
  `,E.addEventListener("click",()=>{r.goToFrame(i),t.keyframes.has(i)||r.addOrUpdateKeyframe(t.id,i),o.remove(),Ds(r,t,i)}),o.appendChild(E);const h=document.createElement("div");h.className="context-menu-item",h.innerHTML=`
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="8 6 4 12 8 18"/><polyline points="16 6 20 12 16 18"/></svg>
      <span>Dividir Clip en fotograma ${i}</span>
    </span>
  `,h.addEventListener("click",()=>{r.splitClip(t.id,i),o.remove()}),o.appendChild(h);const p=document.createElement("div");if(p.className="context-menu-item",p.innerHTML=`
    <span style="display:flex; align-items:center; gap:6px;">
      <span>Asignar celdas en lote:</span>
    </span>
    <span style="display:flex; gap:4px;">
      <button class="timeline-btn" data-step="1" style="height:20px; padding:0 5px;">1s</button>
      <button class="timeline-btn" data-step="2" style="height:20px; padding:0 5px;">2s</button>
      <button class="timeline-btn" data-step="3" style="height:20px; padding:0 5px;">3s</button>
    </span>
  `,p.querySelectorAll("button").forEach(v=>{v.addEventListener("click",w=>{w.stopPropagation();const _=Number(v.dataset.step)||2;r.batchSpecifyCels(t.id,_),o.remove()})}),o.appendChild(p),t.exposures.has(i)){const v=document.createElement("div");v.className="context-menu-item",v.innerHTML=`
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Eliminar exposición de este frame</span>
      </span>
    `,v.addEventListener("click",()=>{r.removeExposure(t.id,i),o.remove()}),o.appendChild(v)}if(d){const v=document.createElement("div");v.className="context-menu-separator",o.appendChild(v);const w=document.createElement("div");w.className="context-menu-item danger",w.innerHTML=`
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        <span>Eliminar celda "${d.name}" del proyecto</span>
      </span>
    `,w.addEventListener("click",()=>{confirm(`¿Eliminar la celda "${d.name}" permanentemente del proyecto?`)&&r.deleteCelLayer(t.id,d.id),o.remove()}),o.appendChild(w)}document.body.appendChild(o);const T=o.getBoundingClientRect();let u=n,m=e;u+T.width>window.innerWidth&&(u=window.innerWidth-T.width-10),m+T.height>window.innerHeight&&(m=e-T.height-4),o.style.left=`${Math.max(10,u)}px`,o.style.top=`${Math.max(10,m)}px`;const S=v=>{o.contains(v.target)||(o.remove(),window.removeEventListener("mousedown",S),window.removeEventListener("keydown",y))},y=v=>{v.key==="Escape"&&(o.remove(),window.removeEventListener("mousedown",S),window.removeEventListener("keydown",y))};window.addEventListener("mousedown",S),window.addEventListener("keydown",y)}const kr=[{id:"g-pen",name:"Pluma G (G-Pen)",tool:"pen",description:"Trazo nítido y dinámico con alta respuesta a la presión.",settings:{size:6,minSizeRatio:0,pressureSize:!0,pressureCurve:1.35,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:8,taperEnd:18,stabilization:5}},{id:"real-g-pen",name:"Pluma G Real",tool:"pen",description:"Textura analógica y leve sangrado para manga tradicional.",settings:{size:5,minSizeRatio:.1,pressureSize:!0,pressureCurve:1.2,flow:.95,pressureFlow:!0,inkMode:"uniform",hardness:.85,antiAliasing:"weak",spacing:.07,tipShape:"circle",taperStart:6,taperEnd:14,stabilization:4}},{id:"turnip-pen",name:"Pluma Cuchara (Kabura)",tool:"pen",description:"Grosor consistente y líneas limpias para entintar detalles.",settings:{size:4,minSizeRatio:.65,pressureSize:!0,pressureCurve:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:3,taperEnd:8,stabilization:6}},{id:"manga-line",name:"Entintado Manga",tool:"pen",description:"Estabilización alta para curvas suaves sin temblor de pulso.",settings:{size:8,minSizeRatio:0,pressureSize:!0,pressureCurve:1.5,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"weak",spacing:.05,tipShape:"circle",taperStart:12,taperEnd:24,stabilization:8}},{id:"maru-pen",name:"Pluma Maru (Redonda)",tool:"pen",description:"Plumilla fina de CSP para cabello, ojos y detalles delicados.",settings:{size:3,minSizeRatio:.05,pressureSize:!0,pressureCurve:1.3,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:5,taperEnd:12,stabilization:5}},{id:"calligraphy-pen",name:"Caligrafía",tool:"pen",description:"Punta biselada de grosor variable según el ángulo del trazo.",settings:{size:14,minSizeRatio:.35,pressureSize:!0,pressureCurve:1.1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.04,tipShape:"calligraphic",tipRoundness:.25,tipAngle:45,taperStart:6,taperEnd:14,stabilization:6}},{id:"millipen",name:"Marcador Millipen",tool:"pen",description:"Estilógrafo técnico de grosor uniforme sin variación por presión.",settings:{size:5,minSizeRatio:1,pressureSize:!1,pressureCurve:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:4}},{id:"watercolor",name:"Acuarela Suave",tool:"brush",description:"Bordes suaves translúcidos ideales para colorear y sombras.",settings:{size:30,minSizeRatio:.5,pressureSize:!0,pressureCurve:1.2,flow:.45,pressureFlow:!0,inkMode:"accumulate",hardness:.35,antiAliasing:"strong",spacing:.08,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:3}},{id:"thick-paint",name:"Óleo / Pintura Densa",tool:"brush",description:"Pincelada corpórea con cobertura rápida y buena mezcla.",settings:{size:26,minSizeRatio:.6,pressureSize:!0,pressureCurve:1.2,flow:.85,pressureFlow:!0,inkMode:"accumulate",hardness:.7,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"airbrush",name:"Aerógrafo Suave",tool:"brush",description:"Gradaciones difuminadas sin textura de borde evidente.",settings:{size:60,minSizeRatio:.4,pressureSize:!0,pressureCurve:1.1,flow:.3,pressureFlow:!0,inkMode:"accumulate",hardness:.1,antiAliasing:"strong",spacing:.04,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:1}},{id:"flat-brush",name:"Pincel Plano",tool:"brush",description:"Puntas rectangulares para fondos arquitectónicos y ropa.",settings:{size:22,minSizeRatio:.7,pressureSize:!1,pressureCurve:1.2,flow:.85,pressureFlow:!0,inkMode:"accumulate",hardness:.9,antiAliasing:"medium",spacing:.05,tipShape:"square",tipRoundness:.28,tipAngle:35,followDirection:!0,taperStart:0,taperEnd:0,stabilization:2}},{id:"gouache-brush",name:"Gouache Opaco",tool:"brush",description:"Cobertura mate de bordes definidos ideal para fondos de animación.",settings:{size:32,minSizeRatio:.45,pressureSize:!0,pressureCurve:1.15,flow:.92,pressureFlow:!0,inkMode:"uniform",hardness:.85,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:2,taperEnd:4,stabilization:3}},{id:"airbrush-highlight",name:"Aerógrafo de Brillo",tool:"brush",description:"Haz concentrado para luces especulares y atmósfera.",settings:{size:42,minSizeRatio:.25,pressureSize:!0,pressureCurve:1.4,flow:.55,pressureFlow:!0,inkMode:"accumulate",hardness:.25,antiAliasing:"strong",spacing:.04,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"hard-eraser",name:"Borrador Duro",tool:"eraser",description:"Eliminación 100% limpia sin halos difusos.",settings:{size:24,minSizeRatio:.3,pressureSize:!1,pressureCurve:1.2,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:3}},{id:"soft-eraser",name:"Borrador Suave",tool:"eraser",description:"Desvanecimiento gradual para degradados y luz.",settings:{size:36,minSizeRatio:.5,pressureSize:!0,pressureCurve:1.2,flow:.6,pressureFlow:!0,inkMode:"accumulate",hardness:.25,antiAliasing:"strong",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"kneaded-eraser",name:"Goma Maleable",tool:"eraser",description:"Baja opacidad para aclarar trazos suavemente.",settings:{size:50,minSizeRatio:.6,pressureSize:!0,pressureCurve:1.1,flow:.3,pressureFlow:!0,inkMode:"accumulate",hardness:.4,antiAliasing:"strong",spacing:.06,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"straight-line",name:"Línea Directa",tool:"shape",description:"Trazos rectos precisos entre dos puntos.",settings:{shapeType:"line",shapeFill:"stroke",size:4}},{id:"rect",name:"Rectángulo",tool:"shape",description:"Cajas delimitadoras y marcos ortogonales.",settings:{shapeType:"rectangle",shapeFill:"stroke",size:4}},{id:"ellipse",name:"Elipse / Círculo",tool:"shape",description:"Círculos y óvalos con o sin relleno.",settings:{shapeType:"ellipse",shapeFill:"stroke",size:4}},{id:"bucket-layer",name:"Capa de Edición",tool:"bucket",description:"Rellena respetando únicamente las líneas de la capa actual.",settings:{tolerance:20}},{id:"bucket-all",name:"Todas las Capas",tool:"bucket",description:"Rellena respetando la composición visible de todas las capas.",settings:{tolerance:35}},{id:"eyedropper-pixel",name:"Cuentagotas",tool:"eyedropper",description:"Muestrea el color exacto del píxel seleccionado.",settings:{}},{id:"hand-pan",name:"Mover Lienzo",tool:"hand",description:"Desplaza el encuadre del lienzo sin alterarlo.",settings:{}},{id:"bone-rig",name:"Crear / Editar Esqueleto (Rig)",tool:"bone",description:"Haz clic y arrastra en el lienzo para crear cadenas de huesos 2D o mover articulaciones en reposo.",settings:{}},{id:"bone-pose-fk",name:"Posar Huesos FK (Rotar / Mover)",tool:"bone",description:"Rota huesos individuales con cinemática directa (FK) y registra keyframes automáticamente.",settings:{}},{id:"bone-pose-ik",name:"Posar Cadena IK (Cinemática Inversa)",tool:"bone",description:"Arrastra la punta de una extremidad (mano/pie) para resolver el ángulo de articulación automáticamente con IK de 2 huesos.",settings:{}}],Hs={size:6,minSizeRatio:.15,pressureSize:!0,pressureCurve:1.2,opacity:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",tipRoundness:1,tipAngle:0,followDirection:!1,taperStart:6,taperEnd:12,stabilization:5,tolerance:20,shapeType:"rectangle",shapeFill:"stroke",color:"#111111"},Lg=["#111111","#ffffff","#e74c3c","#e67e22","#f1c40f","#2ecc71","#1abc9c","#3498db","#9b59b6","#34495e","#7f8c8d","#bdc3c7"],Rg=[{id:"csp-standard",name:"Conjunto Estándar CSP",colors:["#000000","#333333","#666666","#999999","#cccccc","#ffffff","#e53935","#fb8c00","#fdd835","#43a047","#00acc1","#1e88e5","#3949ab","#8e24aa","#d81b60","#6d4c41","#546e7a","#f4511e","#ffcdd2","#ffe0b2","#fff9c4","#c8e6c9","#b2ebf2","#bbdefb"]},{id:"anime-skin",name:"Tonos de Piel & Anime",colors:["#fff5eb","#ffecd9","#ffe0c2","#f7cba4","#eba87c","#d1845c","#f9d5c5","#eec0ad","#dfa088","#c67d63","#9c563f","#6e3726","#ffcad4","#f4acb7","#9d8189","#4a3f45","#2b2429","#1a1518"]},{id:"vibrant-cel",name:"Cel Shading Vibrante",colors:["#ff1744","#ff9100","#ffea00","#00e676","#00e5ff","#2979ff","#651fff","#d500f9","#ff4081","#1de9b6","#76ff03","#c6ff00"]}],Pg=["size","opacity","hardness","stabilization"],Hc="oniri.subtools.v1",Dg=["pen","brush","eraser","eyedropper","bucket","shape","bone","hand"];function Ig(n){if(!n||typeof n!="object")return!1;const e=n;return typeof e.id=="string"&&typeof e.name=="string"&&typeof e.tool=="string"&&Dg.includes(e.tool)&&!!e.settings&&typeof e.settings=="object"}function Wl(n){return n.map(e=>({...e,settings:{...e.settings}}))}let Or=[];function Ng(){try{const n=localStorage.getItem(Hc);if(n){const e=JSON.parse(n);if(e&&e.v===1&&Array.isArray(e.items)&&e.items.length>0&&e.items.every(Ig)){const t=Wl(e.items);Or=Array.isArray(e.deleted)?e.deleted.filter(r=>typeof r=="string"):[];const i=new Set(t.map(r=>r.id));for(const r of kr)!i.has(r.id)&&!Or.includes(r.id)&&t.push({...r,settings:{...r.settings}});return t}}}catch{}return Wl(kr)}let Un=Ng();function Wr(){try{const n={v:1,items:Un,deleted:[...Or]};localStorage.setItem(Hc,JSON.stringify(n))}catch{}}function ni(n){return Un.find(e=>e.id===n)}function Fg(n){const e=kr.find(t=>t.tool===n);return e?{...e.settings}:{}}function Xr(n,e){return{...Hs,...n.settings,color:e}}const Gc="oniri.colorsets.v1",Vc="oniri.visibleprops.v1";function Ug(){try{const n=localStorage.getItem(Gc);if(n){const e=JSON.parse(n);if(Array.isArray(e)&&e.length>0)return e}}catch{}return Rg.map(n=>({...n,colors:[...n.colors]}))}function Wc(n){try{localStorage.setItem(Gc,JSON.stringify(n))}catch{}}function kg(){try{const n=localStorage.getItem(Vc);if(n){const e=JSON.parse(n);if(Array.isArray(e)&&e.length>0)return e}}catch{}return[...Pg]}function Og(n){try{localStorage.setItem(Vc,JSON.stringify(n))}catch{}}const Ls=ni("g-pen")??Un[0],Xl=Ug();var ac;let _e={tool:"pen",activeSubToolId:Ls?Ls.id:"g-pen",brush:Ls?Xr(Ls,Hs.color):{...Hs},propertiesOpen:!0,visibleProperties:kg(),previewBgMode:"paper",boneMode:"rig",showBonesOverlay:!0,autoKeyBones:!0,colorTab:"picker",primaryColor:"#111111",secondaryColor:"#ffffff",activeColorSlot:"primary",isTransparentColor:!1,colorHistory:Lg,colorSets:Xl,activeColorSetId:((ac=Xl[0])==null?void 0:ac.id)??"csp-standard"};const Ya=new Set;function Bt(){for(const n of Ya)n(_e)}function pt(){return _e}function Rr(){return _e.tool}function Qn(n){if(_e.tool===n)return;const t=Un.filter(s=>s.tool===n)[0],i=t?t.id:_e.activeSubToolId;let r=_e.boneMode;n==="bone"&&(i==="bone-rig"?r="rig":i==="bone-pose-fk"?r="pose_fk":i==="bone-pose-ik"&&(r="pose_ik")),_e={..._e,tool:n,activeSubToolId:i,boneMode:r,brush:t?Xr(t,_e.brush.color):_e.brush},Bt()}function $l(n){const e=ni(n);if(!e)return;let t=_e.boneMode;e.id==="bone-rig"?t="rig":e.id==="bone-pose-fk"?t="pose_fk":e.id==="bone-pose-ik"&&(t="pose_ik"),_e={..._e,tool:e.tool,activeSubToolId:e.id,boneMode:t,brush:Xr(e,_e.brush.color)},Bt()}function Bg(n){_e={..._e,tool:"bone",activeSubToolId:n==="rig"?"bone-rig":n==="pose_fk"?"bone-pose-fk":"bone-pose-ik",boneMode:n},Bt()}function zg(n){_e={..._e,showBonesOverlay:n},Bt()}function Hg(n){_e={..._e,autoKeyBones:n},Bt()}function Gg(n){const t=_e.visibleProperties.includes(n)?_e.visibleProperties.filter(i=>i!==n):[..._e.visibleProperties,n];_e={..._e,visibleProperties:t},Og(t),Bt()}function Vg(n){_e={..._e,previewBgMode:n},Bt()}function Wg(n){_e.colorTab!==n&&(_e={..._e,colorTab:n},Bt())}function Xg(n){_e.colorSets.some(e=>e.id===n)&&(_e={..._e,activeColorSetId:n},Bt())}function $g(n){if(!n||n==="transparent")return;const e=n.toLowerCase(),t=_e.colorSets.map(i=>i.id!==_e.activeColorSetId?i:{...i,colors:[...i.colors,e]});_e={..._e,colorSets:t},Wc(t),Bt()}function qg(n){const e=_e.colorSets.map(t=>t.id!==_e.activeColorSetId||t.colors.length<=1?t:{...t,colors:t.colors.filter((i,r)=>r!==n)});_e={..._e,colorSets:e},Wc(e),Bt()}function Yg(n){return Un.filter(e=>e.tool===n)}function Kg(){return ni(_e.activeSubToolId)}function ft(n){_e={..._e,brush:{..._e.brush,...n}};const e=ni(_e.activeSubToolId);if(e){const t={...n};delete t.color,e.settings={...e.settings,...t},Wr()}n.color&&!_e.isTransparentColor&&(_e.activeColorSlot==="primary"?_e.primaryColor=n.color:_e.secondaryColor=n.color,no(n.color)),Bt()}let ql=0;function Xc(){return ql+=1,`custom-${Date.now().toString(36)}-${ql.toString(36)}`}function jg(n,e){var o;const t=_e.tool,i={...((o=ni(_e.activeSubToolId))==null?void 0:o.settings)??{}},r=ni(_e.activeSubToolId),s={id:Xc(),name:n.trim()||"Pincel nuevo",tool:t,description:r?`Pincel personalizado basado en ${r.name}.`:"Pincel personalizado.",settings:Object.keys(i).length>0?i:{...Hs},custom:!0};return Un.push(s),Wr(),s}function Zg(n){const e=ni(n);if(!e)return null;const t={...e,id:Xc(),name:`${e.name} (copia)`,description:`Copia personalizada de ${e.name}.`,settings:{...e.settings},custom:!0};return Un.push(t),Wr(),t}function Jg(n){const e=ni(n);if(!e||Un.filter(i=>i.tool===e.tool).length<=1)return!1;if(Un=Un.filter(i=>i.id!==n),kr.some(i=>i.id===n)&&!Or.includes(n)&&Or.push(n),Wr(),_e.activeSubToolId===n){const i=Un.find(r=>r.tool===e.tool);i&&(_e={..._e,tool:i.tool,activeSubToolId:i.id,brush:Xr(i,_e.brush.color)})}return Bt(),!0}function $c(n){const e=ni(n);if(!e)return;const t=kr.find(i=>i.id===n);e.settings=t?{...t.settings}:Fg(e.tool),Wr(),_e.activeSubToolId===n&&(_e={..._e,brush:Xr(e,_e.brush.color)}),Bt()}function yn(n){_e={..._e,primaryColor:n,isTransparentColor:!1,activeColorSlot:"primary",brush:{..._e.brush,color:n}},no(n),Bt()}function bn(n){_e={..._e,secondaryColor:n,isTransparentColor:!1,activeColorSlot:"secondary",brush:{..._e.brush,color:n}},no(n),Bt()}function Yl(n){const e=n==="primary"?_e.primaryColor:_e.secondaryColor;_e={..._e,activeColorSlot:n,isTransparentColor:!1,brush:{..._e.brush,color:e}},Bt()}function qc(){const n=_e.primaryColor,e=_e.secondaryColor,t=_e.activeColorSlot==="primary"?e:n;_e={..._e,primaryColor:e,secondaryColor:n,brush:{..._e.brush,color:t}},Bt()}function Yc(n){const e=!_e.isTransparentColor;_e={..._e,isTransparentColor:e,brush:{..._e.brush,color:e?"transparent":_e.activeColorSlot==="primary"?_e.primaryColor:_e.secondaryColor}},Bt()}function no(n){if(!n||n==="transparent")return;const e=n.toLowerCase(),t=_e.colorHistory.filter(i=>i.toLowerCase()!==e);_e.colorHistory=[e,...t].slice(0,16)}function Rn(n){const e=n.replace("#","").trim();if(e.length!==6)return{r:17,g:17,b:17};const t=parseInt(e,16);return Number.isNaN(t)?{r:17,g:17,b:17}:{r:t>>16&255,g:t>>8&255,b:t&255}}function Is(n,e,t){const i=r=>Math.max(0,Math.min(255,Math.round(r)));return"#"+[i(n),i(e),i(t)].map(r=>r.toString(16).padStart(2,"0")).join("")}function Ri(n,e,t){const i=n/255,r=e/255,s=t/255,o=Math.max(i,r,s),a=Math.min(i,r,s),c=o-a;let l=0;const d=o===0?0:c/o,f=o;if(o!==a){switch(o){case i:l=(r-s)/c+(r<s?6:0);break;case r:l=(s-i)/c+2;break;default:l=(i-r)/c+4;break}l*=60}return{h:l,s:d,v:f}}function Qg(n,e,t){const i=(n%360+360)%360,r=t*e,s=r*(1-Math.abs(i/60%2-1)),o=t-r;let a=0,c=0,l=0;return i<60?[a,c,l]=[r,s,0]:i<120?[a,c,l]=[s,r,0]:i<180?[a,c,l]=[0,r,s]:i<240?[a,c,l]=[0,s,r]:i<300?[a,c,l]=[s,0,r]:[a,c,l]=[r,0,s],{r:Math.round((a+o)*255),g:Math.round((c+o)*255),b:Math.round((l+o)*255)}}function Xt(n,e,t){const{r:i,g:r,b:s}=Qg(n,e,t);return Is(i,r,s)}function ev(n){const{r:e,g:t,b:i}=Rn(n),{h:r,s,v:o}=Ri(e,t,i),a=s<.12?.68:s,c=o<.18?.78:o;return[{label:"Complementario (Contraste Directo)",colors:[{hex:n,tag:"Base"},{hex:Xt(r+180,a,c),tag:"180° Opuesto"}]},{label:"Complementario Dividido",colors:[{hex:n,tag:"Base"},{hex:Xt(r+150,a,c),tag:"+150°"},{hex:Xt(r+210,a,c),tag:"+210°"}]},{label:"Tríada Armónica",colors:[{hex:n,tag:"Base"},{hex:Xt(r+120,a,c),tag:"+120°"},{hex:Xt(r+240,a,c),tag:"+240°"}]},{label:"Análogos (Cercanos)",colors:[{hex:Xt(r-30,a,c),tag:"-30°"},{hex:n,tag:"Base"},{hex:Xt(r+30,a,c),tag:"+30°"}]},{label:"Escala de Luz y Sombra (Cel Shading)",colors:[{hex:Xt(r+8,Math.max(.15,a*.45),Math.min(1,c*1.25)),tag:"Luz+"},{hex:Xt(r+4,Math.max(.25,a*.75),Math.min(1,c*1.12)),tag:"Luz"},{hex:n,tag:"Base"},{hex:Xt(r-8,Math.min(1,a*1.1),Math.max(.12,c*.75)),tag:"Sombra 1"},{hex:Xt(r-16,Math.min(1,a*1.2),Math.max(.08,c*.5)),tag:"Sombra 2"}]}]}function Kl(n){const e=n!==void 0?n:!_e.propertiesOpen;_e.propertiesOpen!==e&&(_e={..._e,propertiesOpen:e},Bt())}function io(n){return Ya.add(n),()=>{Ya.delete(n)}}function tv(n,e,t,i,r=20){const s=n.canvas.width,o=n.canvas.height;if(e<0||e>=s||t<0||t>=o)return;const a=n.getImageData(0,0,s,o),c=a.data,l=parseInt(i.slice(1,3),16)||0,d=parseInt(i.slice(3,5),16)||0,f=parseInt(i.slice(5,7),16)||0,g=255,x=(t*s+e)*4,M=c[x],E=c[x+1],h=c[x+2],p=c[x+3];if(M===l&&E===d&&h===f&&p===g)return;const T=(r/100*255)**2*3;function u(v){const w=c[v]-M,_=c[v+1]-E,b=c[v+2]-h,C=c[v+3]-p;return w*w+_*_+b*b+C*C<=T}function m(v){c[v]=l,c[v+1]=d,c[v+2]=f,c[v+3]=g}const S=new Uint8Array(s*o),y=[[e,t]];for(S[t*s+e]=1;y.length>0;){const[v,w]=y.pop(),_=w*s;let b=v;for(;b>0;){const R=(_+b-1)*4;if(S[_+b-1]||!u(R))break;b--}let C=v;for(;C<s-1;){const R=(_+C+1)*4;if(S[_+C+1]||!u(R))break;C++}for(let R=b;R<=C;R++)S[_+R]=1,m((_+R)*4);for(const R of[w-1,w+1]){if(R<0||R>=o)continue;const H=R*s;let P=!1;for(let U=b;U<=C;U++){const N=(H+U)*4,I=!S[H+U]&&u(N);!P&&I?(y.push([U,R]),P=!0):P&&!I&&(P=!1)}}}n.putImageData(a,0,0)}function nv(n=30){const e=[],t=[];return{push(i,r){e.push({layerId:i,data:r}),e.length>n&&e.shift(),t.length=0},undo(i,r){return e.length===0?null:(t.push({layerId:i,data:r}),e.pop()??null)},redo(i,r){return t.length===0?null:(e.push({layerId:i,data:r}),t.pop()??null)},canUndo(){return e.length>0},canRedo(){return t.length>0},clear(){e.length=0,t.length=0}}}function iv(n){const e=[],t=r=>n.filter(s=>s.parentId===r);function i(r){const s=t(r);for(const o of s)o.type==="folder"?i(o.id):e.push(o)}return i(null),e}function Fa(n,e){const t=document.createElement("canvas");return t.width=n,t.height=e,t}function rv(n,e){let t=1;const i=[],r=new Set;function s(){for(const M of r)M()}const o=Fa(n,e),a=o.getContext("2d");a.fillStyle="#ffffff",a.fillRect(0,0,n,e);const c={id:"layer-paper",type:"raster",name:"Paper",canvas:o,context:a,visible:!0,opacity:1,blendMode:"source-over",isPaper:!0,parentId:null,collapsed:!1,clipped:!1};i.push(c);const l=Fa(n,e),d=l.getContext("2d"),f={id:`layer-${t}`,type:"raster",name:`Layer ${t}`,canvas:l,context:d,visible:!0,opacity:1,blendMode:"source-over",isPaper:!1,parentId:null,collapsed:!1,clipped:!1};i.push(f);let g=f.id;const x={get layers(){return i},get activeLayerId(){return g},set activeLayerId(M){g!==M&&(g=M,s())},createLayer(M,E,h=!1,p){t++;const T=Fa(n,e),u=T.getContext("2d");p&&(u.fillStyle=p,u.fillRect(0,0,n,e));let m=E;if(m===void 0){const v=i.find(w=>w.id===g);(v==null?void 0:v.type)==="folder"?m=v.id:v!=null&&v.parentId?m=v.parentId:m=null}const S={id:`layer-${Date.now()}-${t}`,type:"raster",name:M||`Layer ${t}`,canvas:T,context:u,visible:!0,opacity:1,blendMode:"source-over",isPaper:h,parentId:m,collapsed:!1,clipped:!1},y=i.findIndex(v=>v.id===g);return y!==-1?i.splice(y+1,0,S):i.push(S),g=S.id,s(),S},createFolder(M,E=null,h=!1){t++;const p={id:`folder-${Date.now()}-${t}`,type:"folder",name:M||(h?`Animation Folder ${t}`:`Folder ${t}`),visible:!0,opacity:1,blendMode:"source-over",isAnimationFolder:h,parentId:E,collapsed:!1,clipped:!1},T=i.findIndex(u=>u.id===g);return T!==-1?i.splice(T+1,0,p):i.push(p),g=p.id,s(),p},createAnimationFolder(M){return x.createFolder(M,null,!0)},deleteLayer(M){if(i.length<=1)return!1;const E=i.find(T=>T.id===M);if(!E||E.isPaper)return!1;const h=new Set([M]);let p=!0;for(;p;){p=!1;for(const T of i)T.parentId&&h.has(T.parentId)&&!h.has(T.id)&&(h.add(T.id),p=!0)}if(h.size>=i.length)return!1;for(let T=i.length-1;T>=0;T--)h.has(i[T].id)&&i.splice(T,1);return h.has(g)&&(g=i[i.length-1].id),s(),!0},renameLayer(M,E){const h=E.trim();if(!h)return;const p=i.find(T=>T.id===M);p&&p.name!==h&&(p.name=h,s())},toggleFolderCollapse(M){const E=i.find(h=>h.id===M&&h.type==="folder");E&&(E.collapsed=!E.collapsed,s())},toggleLayerClipping(M){const E=i.find(h=>h.id===M);E&&!E.isPaper&&(E.clipped=!E.clipped,s())},setLayerBoneBinding(M,E,h){const p=i.find(T=>T.id===M);!p||p.isPaper||(p.boundBoneId=E,h!==void 0&&(p.meshSkinningEnabled=h),s())},moveToFolder(M,E){const h=i.find(p=>p.id===M);if(!h||h.isPaper||h.id===E)return!1;if(E!==null){let p=i.find(T=>T.id===E);for(;p;){if(p.id===h.id)return!1;p=p.parentId?i.find(T=>T.id===p.parentId):void 0}}return h.parentId=E,s(),!0},getActiveLayer(){return i.find(M=>M.id===g)??i[i.length-1]},getActiveDrawableLayer(){const M=i.find(h=>h.id===g);if(M&&M.type==="raster"&&M.context)return M;if(M&&M.type==="folder"){const h=i.find(p=>p.parentId===M.id&&p.type==="raster"&&p.context);if(h)return h}const E=[...i].reverse().find(h=>h.type==="raster"&&h.context&&!h.isPaper);return E||x.createLayer()},setActiveLayer(M){g!==M&&(g=M,s())},setLayerVisibility(M,E){const h=i.find(p=>p.id===M);h&&h.visible!==E&&(h.visible=E,s())},setLayerOpacity(M,E){const h=i.find(p=>p.id===M);h&&(h.opacity=Math.max(0,Math.min(1,E)),s())},setLayerBlendMode(M,E){const h=i.find(p=>p.id===M);h&&(h.blendMode=E,s())},moveLayer(M,E){if(M<0||M>=i.length||E<0||E>=i.length||M===E)return;const[h]=i.splice(M,1);i.splice(E,0,h),s()},moveLayerBranch(M,E){const h=i.find(w=>w.id===M);if(!h||h.isPaper)return!1;const p=i.filter(w=>w.parentId===h.parentId),T=p.findIndex(w=>w.id===h.id);if(T===-1)return!1;let u;if(E==="up"){if(T>=p.length-1)return!1;u=p[T+1]}else if(T<=0||(u=p[T-1],u.isPaper))return!1;const m=new Set([h.id]);let S=!0;for(;S;){S=!1;for(const w of i)w.parentId&&m.has(w.parentId)&&!m.has(w.id)&&(m.add(w.id),S=!0)}const y=i.filter(w=>m.has(w.id));for(let w=i.length-1;w>=0;w--)m.has(i[w].id)&&i.splice(w,1);const v=new Set([u.id]);for(S=!0;S;){S=!1;for(const w of i)w.parentId&&v.has(w.parentId)&&!v.has(w.id)&&(v.add(w.id),S=!0)}if(E==="up"){let w=-1;for(let _=i.length-1;_>=0;_--)if(v.has(i[_].id)){w=_;break}i.splice(w+1,0,...y)}else{const w=i.findIndex(_=>_.id===u.id);i.splice(w,0,...y)}return s(),!0},subscribe(M){return r.add(M),()=>{r.delete(M)}}};return x}function sv(n,e,t,i,r,s,o,a,c){if(n.save(),n.strokeStyle=c,n.fillStyle=c,n.lineWidth=Math.max(1,Math.round(a)),n.lineCap="round",n.lineJoin="round",n.beginPath(),s==="line")n.moveTo(e,t),n.lineTo(i,r),n.stroke();else if(s==="rectangle"){const l=Math.min(e,i),d=Math.min(t,r),f=Math.abs(i-e),g=Math.abs(r-t);o==="fill"?n.fillRect(l,d,f,g):n.strokeRect(l,d,f,g)}else if(s==="ellipse"){const l=(e+i)/2,d=(t+r)/2,f=Math.abs(i-e)/2,g=Math.abs(r-t)/2;n.ellipse(l,d,Math.max(.1,f),Math.max(.1,g),0,0,Math.PI*2),o==="fill"?n.fill():n.stroke()}n.restore()}const av=256,jl=2,ov={none:0,weak:.6,medium:1.1,strong:1.8},Rs=new Map;function lv(n){const e=n.startsWith("#")?n.slice(1):n;if(/^[0-9a-fA-F]{3}$/.test(e)){const t=parseInt(e[0]+e[0],16),i=parseInt(e[1]+e[1],16),r=parseInt(e[2]+e[2],16);return[t,i,r]}if(/^[0-9a-fA-F]{6}$/.test(e)){const t=parseInt(e.slice(0,2),16),i=parseInt(e.slice(2,4),16),r=parseInt(e.slice(4,6),16);return[t,i,r]}return[0,0,0]}function cv(n,e,t,i,r,s){const o=n/2,a=r==="square",c=Math.max(.1,s),l=ov[i],d=Math.max(l,o*(1-e)),f=(a?o*Math.sqrt(1+c*c):o)+d/2,g=Math.max(jl,Math.ceil(f-o)+jl),x=Math.max(2,Math.ceil(n))+g*2,M=document.createElement("canvas");M.width=x,M.height=x;const E=M.getContext("2d"),h=E.createImageData(x,x),p=h.data,[T,u,m]=lv(t),S=x/2,y=d<=1e-4,v=i==="none";let w=0;for(let _=0;_<x;_++){const b=(_+.5-S)/c;for(let C=0;C<x;C++){const R=C+.5-S;let H;if(a){const U=Math.abs(R)-o,N=Math.abs(b)-o,I=U>0?U:0,q=N>0?N:0;H=Math.hypot(I,q)+Math.min(Math.max(U,N),0)}else H=Math.hypot(R,b)-o;let P;y?P=H<0?1:0:(P=(d*.5-H)/d,P<0?P=0:P>1&&(P=1)),v&&(P=P>=.5?1:0),p[w]=T,p[w+1]=u,p[w+2]=m,p[w+3]=P*255,w+=4}}return E.putImageData(h,0,0),M}function Kc(n){const e=Math.max(.4,n.diameter),t=Math.min(1,Math.max(0,n.hardness)),i=n.color||"#000000",r=n.antiAliasing??"medium",s=n.tipShape??"circle",o=Math.min(1,Math.max(.1,n.tipRoundness??1)),a=e>20?.5:.25,c=Math.max(.4,Math.round(e/a)*a),l=`${c.toFixed(2)}:${t.toFixed(3)}:${i}:${r}:${s}:${o.toFixed(2)}`;let d=Rs.get(l);return d||(Rs.size>=av&&Rs.clear(),d=cv(c,t,i,r,s,o),Rs.set(l,d)),d}const Pt=1600,Dt=900,jc=.4,Zl=.35,dv=2e4;function Ka(n){return n<0?0:n>1?1:n}function Ir(n,e,t){const i=Ka(e),r=n.pressureSize?Math.pow(i,Math.max(.1,n.pressureCurve)):1;let s=1;if(n.taperStart>0){const a=Math.min(1,t/n.taperStart);s=a*a*(3-2*a)}const o=n.minSizeRatio+(1-n.minSizeRatio)*r*s;return Math.max(jc,n.size*o)}function Zc(n,e){const t=Ka(n.pressureFlow?n.flow*Math.pow(Ka(e),1.2):n.flow);if(n.inkMode==="uniform"&&!n.pressureFlow)return Math.max(.02,t);const i=Math.max(.2,n.spacing*2.5),r=1-Math.pow(1-t,i);return Math.min(1,Math.max(.02,r))}function Jl(n,e,t){const i=n.followDirection&&n.tipShape!=="calligraphic";let r=0;return i&&(e!==0||t!==0)&&(r=Math.atan2(t,e)*180/Math.PI),(n.tipAngle+r)*Math.PI/180}function Pr(n,e){const t=document.createElement("canvas");return t.width=n,t.height=e,t}function uv(n,e){let t=n;for(;t;){if(!t.visible)return!1;t=t.parentId?e.get(t.parentId):void 0}return!0}function Ql(n,e){let t=n.opacity,i=n.parentId?e.get(n.parentId):void 0;for(;i;)t*=i.opacity,i=i.parentId?e.get(i.parentId):void 0;return t}function pv(){const n=rv(Pt,Dt),e=Pr(Pt,Dt),t=Pr(Pt,Dt),i=Pr(Pt,Dt),r=Pr(Pt,Dt),s=Pr(Pt,Dt),o=e.getContext("2d"),a=t.getContext("2d"),c=i.getContext("2d"),l=r.getContext("2d"),d=s.getContext("2d"),f=nv(30);let g=null,x=null,M=0,E=0,h=1,p=0,T=0,u=0,m={...pt().brush},S=null,y="";function v(I,q,B,V,K,k,G){const F=m,X=Kc({diameter:K,hardness:F.hardness,color:q?"#000000":F.color,antiAliasing:F.antiAliasing,tipShape:F.tipShape,tipRoundness:F.tipRoundness}),W=Zc(F,k),Q=X.width,j=X.height,se=F.tipShape!=="square"&&F.tipRoundness>=.999;I.save(),q&&(I.globalCompositeOperation="destination-out"),I.globalAlpha=W,!se&&G!==0?(I.translate(B,V),I.rotate(G),I.drawImage(X,-Q/2,-j/2)):I.drawImage(X,B-Q/2,V-j/2),I.restore()}function w(I,q,B,V,K,k,G,F){const X=m,W=k-B,Q=G-V,j=Math.hypot(W,Q);if(j===0)return;const se=Math.min(.5,Math.max(.03,X.spacing)),de=Jl(X,W,Q);p=de;let ae=0,$=T,Ve=0;for(;!(++Ve>dv);){const be=ae/j,Ne=K+(F-K)*be;let Be=Math.max(Zl,Ir(X,Ne,u+ae)*se)-$;if(Be<0&&(Be=0),ae+Be>j){$+=j-ae;break}ae+=Be,$=0;const ze=ae/j,D=K+(F-K)*ze;v(I,q,B+W*ze,V+Q*ze,Ir(X,D,u+ae),D,de)}u+=j,T=$}function _(){return n.getActiveDrawableLayer().context??null}function b(I){const q=m;if(q.taperEnd<=0)return;const B=Math.hypot(I.vx,I.vy);if(B<=.5)return;const V=x==="erase",K=V?_():o;if(!K)return;const k=I.vx/B,G=I.vy/B,F=Math.max(1,I.isMouse?q.taperEnd:Math.min(q.taperEnd,B*2.5)),X=Math.min(.5,Math.max(.03,q.spacing)),W=Ir(q,h,u),Q=p;let j=0,se=0;for(;j<=F&&se++<4e3;){const de=Math.pow(1-j/F,1.5),ae=Math.max(jc,W*de);v(K,V,M+k*j,E+G*j,ae,h*de,Q),j+=Math.max(Zl,ae*X)}}function C(){if(!x)return;const I=n.getActiveDrawableLayer();(x==="paint"||x==="shape")&&(I.context&&(I.context.globalAlpha=pt().brush.opacity,I.context.drawImage(e,0,0),I.context.globalAlpha=1),o.clearRect(0,0,Pt,Dt)),S&&(f.push(y,S),R.delete(y),S=null),N.compositeDirty=!0,x=null}const R=new Map;function H(I,q,B){const V=pt(),K=V.tool==="bone";if(!(!V.showBonesOverlay&&!K)&&q.size!==0){I.save();for(const k of q.values()){if(!k.parentId)continue;const G=q.get(k.parentId);if(!G)continue;Math.hypot(k.headX-G.tailX,k.headY-G.tailY)>2&&(I.beginPath(),I.setLineDash([4,4]),I.strokeStyle="rgba(255, 255, 255, 0.45)",I.lineWidth=1.5,I.moveTo(G.tailX,G.tailY),I.lineTo(k.headX,k.headY),I.stroke(),I.setLineDash([]))}for(const k of q.values()){const G=k.id===B,F=k.tailX-k.headX,X=k.tailY-k.headY,W=Math.max(1,Math.hypot(F,X)),Q=F/W,j=X/W,se=-j,de=Q,ae=Math.min(W*.22,24),$=Math.max(5,Math.min(14,W*.1)),Ve=k.headX+Q*ae,be=k.headY+j*ae;if(I.beginPath(),I.moveTo(k.headX,k.headY),I.lineTo(Ve+se*$,be+de*$),I.lineTo(k.tailX,k.tailY),I.lineTo(Ve-se*$,be-de*$),I.closePath(),I.fillStyle=G?"rgba(255, 212, 59, 0.48)":`${k.color}44`,I.fill(),I.lineWidth=G?2.4:1.6,I.strokeStyle=G?"#ffd43b":k.color,I.stroke(),I.beginPath(),I.arc(k.headX,k.headY,G?6.5:5,0,Math.PI*2),I.fillStyle=G?"#ffd43b":"#161616",I.fill(),I.lineWidth=2,I.strokeStyle=G?"#ffffff":k.color,I.stroke(),I.beginPath(),I.arc(k.tailX,k.tailY,G?6:4.5,0,Math.PI*2),I.fillStyle=V.boneMode==="pose_ik"?"#ff6b6b":k.color,I.fill(),I.lineWidth=1.5,I.strokeStyle="#111111",I.stroke(),K||G){I.font="600 11px sans-serif";const Ne=(k.headX+k.tailX)/2,me=(k.headY+k.tailY)/2-8;I.fillStyle="rgba(0, 0, 0, 0.75)",I.fillText(k.name,Ne+1,me+1),I.fillStyle=G?"#ffd43b":"#ffffff",I.fillText(k.name,Ne,me)}}I.restore()}}function P(){var Q;a.clearRect(0,0,Pt,Dt);const I=new Map(n.layers.map(j=>[j.id,j])),q=n.getActiveDrawableLayer(),B=g&&g.bones.length>0?g.getEvaluatedBones(g.settings.currentFrame):null;function V(j){let se=j;for(;se;){if(se.boundBoneId)return se.boundBoneId;se=se.parentId?I.get(se.parentId):void 0}return null}function K(j){let se=j;for(;se;){if(se.meshSkinningEnabled)return!0;se=se.parentId?I.get(se.parentId):void 0}return!1}function k(j,se,de){if(!se.canvas)return;const ae=g&&!se.isPaper?g.getLayerTransformAtFrame(se,g.settings.currentFrame):null;j.save();const $=ae?de*ae.opacity:de;if(j.globalAlpha=Math.max(0,Math.min(1,$)),j.globalCompositeOperation=se.blendMode,ae&&(ae.x!==0||ae.y!==0||ae.scaleX!==1||ae.scaleY!==1||ae.rotation!==0)){const me=Pt/2,Be=Dt/2;j.translate(me+ae.x,Be+ae.y),ae.rotation!==0&&j.rotate(ae.rotation*Math.PI/180),(ae.scaleX!==1||ae.scaleY!==1)&&j.scale(ae.scaleX,ae.scaleY),j.translate(-me,-Be)}const Ve=!se.isPaper&&B&&B.size>0&&K(se),be=!se.isPaper&&B?V(se):null,Ne=be&&B?B.get(be):void 0;if(Ve&&g&&B){let me=R.get(se.id);if(!me||me.boneCount!==g.bones.length){const Be=yg(se.id,se.canvas,g.bones,10,10);Be&&(me={boneCount:g.bones.length,mesh:Be},R.set(se.id,me))}me?bg(j,se.canvas,me.mesh,B):j.drawImage(se.canvas,0,0)}else if(Ne){const[me,Be,ze,D,A,ee]=Ne.skinMatrix;j.transform(me,Be,ze,D,A,ee),j.drawImage(se.canvas,0,0)}else j.drawImage(se.canvas,0,0);se.id===q.id&&(x==="paint"||x==="shape")&&(j.globalAlpha=Math.max(0,Math.min(1,$*pt().brush.opacity)),j.drawImage(e,0,0)),j.restore()}const G=n.layers.find(j=>j.isPaper&&j.visible);if(G&&G.canvas&&k(a,G,G.opacity),g&&g.onionSkin.enabled&&g.tracks.length>0)for(const j of g.tracks){if(!j.visible)continue;const se=g.getOnionSkinCels(j.id,g.settings.currentFrame);for(const de of se){if(!de.layer.canvas)continue;d.clearRect(0,0,Pt,Dt),d.save();const ae=Pt/2,$=Dt/2;if(de.transform&&(de.transform.x!==0||de.transform.y!==0||de.transform.scaleX!==1||de.transform.scaleY!==1||de.transform.rotation!==0)&&(d.translate(ae+de.transform.x,$+de.transform.y),d.rotate(de.transform.rotation*Math.PI/180),d.scale(de.transform.scaleX,de.transform.scaleY),d.translate(-ae,-$)),de.onionTransform){const Ve=de.onionTransform,be=Ve.rotation*Math.PI/180,Ne=Ve.scaleX*(Ve.flipX?-1:1),me=Ve.scaleY*(Ve.flipY?-1:1);d.translate(ae+Ve.x,$+Ve.y),be!==0&&d.rotate(be),(Ne!==1||me!==1)&&d.scale(Ne,me),d.translate(-ae,-$)}d.drawImage(de.layer.canvas,0,0),d.restore(),g.onionSkin.mode==="tint"&&de.tintColor&&(d.save(),d.globalCompositeOperation="source-in",d.fillStyle=de.tintColor,d.fillRect(0,0,Pt,Dt),d.restore()),a.save(),a.globalAlpha=de.opacity*(((Q=de.transform)==null?void 0:Q.opacity)??1),a.drawImage(s,0,0),a.restore()}}const X=iv(n.layers).filter(j=>!(j.type!=="raster"||!j.canvas||j.isPaper||!uv(j,I)||g&&!g.isLayerVisibleAtFrame(j,g.settings.currentFrame)));let W=0;for(;W<X.length;){const j=X[W],se=Ql(j,I),de=[];let ae=W+1;for(;ae<X.length&&X[ae].clipped;)de.push(X[ae]),ae++;if(de.length===0)k(a,j,se),W++;else{c.clearRect(0,0,Pt,Dt),k(c,j,1);for(const $ of de){const Ve=Ql($,I);l.clearRect(0,0,Pt,Dt),k(l,$,Ve),l.save(),l.globalCompositeOperation="destination-in",l.drawImage(j.canvas,0,0),l.restore(),c.save(),c.globalCompositeOperation=$.blendMode,c.drawImage(r,0,0),c.restore()}a.save(),a.globalAlpha=se,a.globalCompositeOperation=j.blendMode,a.drawImage(i,0,0),a.restore(),W=ae}}g&&B&&B.size>0&&!g.settings.isPlaying&&H(a,B,g.selectedBoneId),N.compositeDirty=!1}function U(I,q,B,V){const K=n.getActiveDrawableLayer();K.context&&(S=K.context.getImageData(0,0,Pt,Dt),y=K.id,m={...pt().brush},x=V?"erase":"paint",M=I,E=q,h=B,p=Jl(m,0,0),T=0,u=0,v(V?K.context:o,V,I,q,Ir(m,B,0),B,p),N.compositeDirty=!0)}n.subscribe(()=>{N.compositeDirty=!0});const N={layerManager:n,strokeCanvas:e,compositeCanvas:t,compositeDirty:!0,setTimelineManager(I){g=I,I.subscribe(()=>{pt().boneMode==="rig"&&R.clear(),N.compositeDirty=!0}),N.compositeDirty=!0},getTimelineManager(){return g},beginStroke(I,q,B){C(),U(I,q,B,!1)},continueStroke(I,q,B){x==="paint"&&(w(o,!1,M,E,h,I,q,B),M=I,E=q,h=B,N.compositeDirty=!0)},beginErase(I,q,B){C(),U(I,q,B,!0)},continueErase(I,q,B){if(x!=="erase")return;const V=n.getActiveDrawableLayer();V.context&&(w(V.context,!0,M,E,h,I,q,B),M=I,E=q,h=B,N.compositeDirty=!0)},beginShape(I,q){C();const B=n.getActiveDrawableLayer();B.context&&(S=B.context.getImageData(0,0,Pt,Dt),y=B.id,x="shape",M=I,E=q,o.clearRect(0,0,Pt,Dt),N.compositeDirty=!0)},updateShape(I,q){if(x!=="shape")return;o.clearRect(0,0,Pt,Dt);const{size:B,color:V,shapeType:K,shapeFill:k}=pt().brush;sv(o,M,E,I,q,K,k,B,V),N.compositeDirty=!0},endStroke(I){(x==="paint"||x==="erase")&&I&&b(I),C()},fill(I,q,B,V){x&&C();const K=n.getActiveDrawableLayer();if(!K.context)return;const k=K.context.getImageData(0,0,Pt,Dt);f.push(K.id,k),tv(K.context,I,q,B,V),R.delete(K.id),N.compositeDirty=!0},undo(){x&&C();const I=n.getActiveDrawableLayer();if(!I.context)return!1;const q=I.context.getImageData(0,0,Pt,Dt),B=f.undo(I.id,q);if(!B)return!1;const V=n.layers.find(K=>K.id===B.layerId);return V&&V.context?(V.context.putImageData(B.data,0,0),R.delete(V.id),N.compositeDirty=!0,!0):!1},redo(){x&&C();const I=n.getActiveDrawableLayer();if(!I.context)return!1;const q=I.context.getImageData(0,0,Pt,Dt),B=f.redo(I.id,q);if(!B)return!1;const V=n.layers.find(K=>K.id===B.layerId);return V&&V.context?(V.context.putImageData(B.data,0,0),R.delete(V.id),N.compositeDirty=!0,!0):!1},canUndo(){return f.canUndo()},canRedo(){return f.canRedo()},updateComposite:P};return io(()=>{N.compositeDirty=!0}),P(),N}const fv=.25,ec=6;function hv(n){const e=n.getCoalescedEvents;if(typeof e!="function")return[n];try{const t=e.call(n);return t&&t.length>0?t:[n]}catch{return[n]}}function tc(n){return n.pointerType==="pen"?n.pressure>0?n.pressure:.5:1}function mv(n){const{canvas:e,camera:t,plane:i,engine:r,docW:s,docH:o,onPickColor:a}=n,c=new vg,l=new xt;let d=null,f=null,g="mouse",x=null,M=!1,E=!1,h=0,p=0,T=0,u=0,m=0,S=0,y=[],v=null,w=0,_=0,b=1;function C(){E?e.style.cursor="grabbing":M||Rr()==="hand"?e.style.cursor="grab":Rr()==="eyedropper"?e.style.cursor="cell":Rr()==="bone"?e.style.cursor="pointer":e.style.cursor="crosshair"}const R=io(()=>C());C();const H=F=>{const X=e.getBoundingClientRect();l.x=(F.clientX-X.left)/X.width*2-1,l.y=-((F.clientY-X.top)/X.height)*2+1,c.setFromCamera(l,t);const W=c.intersectObject(i,!1);return W.length===0||!W[0].uv?null:{x:W[0].uv.x*s,y:(1-W[0].uv.y)*o}},P=(F,X,W)=>{d==="eraser"?r.continueErase(F,X,W):d==="brush"&&r.continueStroke(F,X,W)},U=(F,X,W)=>{const Q={x:F,y:X,p:W};if(y.length===0){y.push(Q),v=Q;return}const j=y[y.length-1],se=y.length>=2?y[y.length-2]:y[0],de=(se.x+j.x)/2,ae=(se.y+j.y)/2,$=(se.p+j.p)/2,Ve=(j.x+Q.x)/2,be=(j.y+Q.y)/2,Ne=(j.p+Q.p)/2;for(let me=1;me<=ec;me++){const Be=me/ec,ze=1-Be,D=ze*ze*de+2*ze*Be*j.x+Be*Be*Ve,A=ze*ze*ae+2*ze*Be*j.y+Be*Be*be,ee=$+(Ne-$)*Be;P(D,A,ee)}v={x:Ve,y:be,p:Ne},y.push(Q),y.length>3&&y.shift()},N=(F,X)=>{const W=F.x-m,Q=F.y-S;if(Math.hypot(W,Q)<fv)return;w=w*.55+W*.45,_=_*.55+Q*.45,m=F.x,S=F.y,b=X;const j=pt().brush.stabilization;if(j<=0)T=F.x,u=F.y;else{const se=1/(1+j*.35);T+=(F.x-T)*se,u+=(F.y-u)*se}U(T,u,X)},I=F=>{const X=d==="bone";if(d==="brush"||d==="eraser"){const W=pt().brush.stabilization;if(W>0){const Q=1/(1+W*.35);for(let j=0;j<3;j++)T+=(m-T)*Q,u+=(S-u)*Q}else T=m,u=S;U(T,u,b),v&&(P(T,u,b),v={x:T,y:u,p:b})}if(d=null,x=null,F!==void 0&&e.hasPointerCapture(F))try{e.releasePointerCapture(F)}catch{}f=null,X||r.endStroke({vx:w,vy:_,isMouse:g!=="pen"})},q=F=>{if(M||Rr()==="hand"||F.button===1){E=!0,h=F.clientX,p=F.clientY,f=F.pointerId;try{e.setPointerCapture(F.pointerId)}catch{}C();return}if(d)return;const X=Rr(),W=H(F);if(!W)return;if(X==="eyedropper"){const se=r.compositeCanvas.getContext("2d"),[de,ae,$]=se.getImageData(Math.floor(W.x),Math.floor(W.y),1,1).data,Ve="#"+[de,ae,$].map(be=>be.toString(16).padStart(2,"0")).join("");a==null||a(Ve);return}if(X==="bucket"){const{color:se,tolerance:de}=pt().brush;r.fill(Math.floor(W.x),Math.floor(W.y),se,de);return}if(X==="bone"){const se=r.getTimelineManager();if(!se)return;const de=pt().boneMode,ae=se.hitTestBoneAtWorld(W.x,W.y,se.settings.currentFrame);f=F.pointerId,g=F.pointerType||"mouse";try{e.setPointerCapture(F.pointerId)}catch{}if(d="bone",de==="rig"){if(ae&&!F.shiftKey)se.selectBone(ae.bone.id),ae.part==="tail"?x={kind:"rig_tail",boneId:ae.bone.id,startDocX:W.x,startDocY:W.y,headX:ae.evalBone.headX,headY:ae.evalBone.headY,startAngleDeg:0,startDRotation:0,startDX:0,startDY:0}:x={kind:"rig_head",boneId:ae.bone.id,startDocX:W.x,startDocY:W.y,headX:ae.evalBone.headX,headY:ae.evalBone.headY,startAngleDeg:0,startDRotation:0,startDX:ae.evalBone.headX-W.x,startDY:ae.evalBone.headY-W.y};else{const $=ae?ae.bone.id:F.altKey?null:se.selectedBoneId,Ve=ae&&ae.part==="tail"?ae.evalBone.tailX:W.x,be=ae&&ae.part==="tail"?ae.evalBone.tailY:W.y;x={kind:"rig_tail",boneId:se.createBoneFromWorld(Ve,be,W.x+24,W.y,$).id,startDocX:Ve,startDocY:be,headX:Ve,headY:be,startAngleDeg:0,startDRotation:0,startDX:0,startDY:0}}return}if(de==="pose_fk"){if(!ae){se.selectBone(null);return}se.selectBone(ae.bone.id);const Ve=se.getInterpolatedBonePoses(se.settings.currentFrame).get(ae.bone.id)??{dX:0,dY:0,dRotation:0};if(ae.part==="head"&&!ae.bone.parentId||F.shiftKey)x={kind:"pose_fk_move",boneId:ae.bone.id,startDocX:W.x,startDocY:W.y,headX:ae.evalBone.headX,headY:ae.evalBone.headY,startAngleDeg:0,startDRotation:Ve.dRotation,startDX:Ve.dX,startDY:Ve.dY};else{const be=Math.atan2(W.y-ae.evalBone.headY,W.x-ae.evalBone.headX)*180/Math.PI;x={kind:"pose_fk_rotate",boneId:ae.bone.id,startDocX:W.x,startDocY:W.y,headX:ae.evalBone.headX,headY:ae.evalBone.headY,startAngleDeg:be,startDRotation:Ve.dRotation,startDX:Ve.dX,startDY:Ve.dY}}return}if(de==="pose_ik"){const $=ae?ae.bone.id:se.selectedBoneId;if(!$)return;se.selectBone($),x={kind:"pose_ik",boneId:$,startDocX:W.x,startDocY:W.y,headX:W.x,headY:W.y,startAngleDeg:0,startDRotation:0,startDX:0,startDY:0},se.applyTwoBoneIKAtFrame(se.settings.currentFrame,$,W.x,W.y);return}return}f=F.pointerId,g=F.pointerType||"mouse";try{e.setPointerCapture(F.pointerId)}catch{}if(X==="shape"){d="shape",r.beginShape(W.x,W.y);return}const Q=tc(F);T=W.x,u=W.y,m=W.x,S=W.y,b=Q,w=0,_=0,y=[{x:W.x,y:W.y,p:Q}],v=y[0],X==="eraser"||pt().isTransparentColor?(d="eraser",r.beginErase(W.x,W.y,Q)):(d="brush",r.beginStroke(W.x,W.y,Q))},B=F=>{if(E){const X=F.clientX-h,W=F.clientY-p;h=F.clientX,p=F.clientY;const j=(t.top-t.bottom)/t.zoom/window.innerHeight;t.position.x-=X*j,t.position.y+=W*j;return}if(d){if(d==="bone"){const X=r.getTimelineManager(),W=H(F);if(!X||!W||!x)return;if(x.kind==="rig_tail")X.updateBoneEndpointWorld(x.boneId,W.x,W.y);else if(x.kind==="rig_head")X.moveBoneHeadWorld(x.boneId,W.x+x.startDX,W.y+x.startDY);else if(x.kind==="pose_fk_move")X.setBonePoseAtFrame(X.settings.currentFrame,x.boneId,{dX:x.startDX+(W.x-x.startDocX),dY:x.startDY+(W.y-x.startDocY)});else if(x.kind==="pose_fk_rotate"){let j=Math.atan2(W.y-x.headY,W.x-x.headX)*180/Math.PI-x.startAngleDeg;for(;j>180;)j-=360;for(;j<-180;)j+=360;X.setBonePoseAtFrame(X.settings.currentFrame,x.boneId,{dRotation:Math.round((x.startDRotation+j)*10)/10})}else x.kind==="pose_ik"&&X.applyTwoBoneIKAtFrame(X.settings.currentFrame,x.boneId,W.x,W.y);return}if(d==="shape"){const X=H(F);X&&r.updateShape(X.x,X.y);return}for(const X of hv(F)){const W=H(X);W&&N(W,tc(X))}}},V=F=>{if(E){if(E=!1,e.hasPointerCapture(F.pointerId))try{e.releasePointerCapture(F.pointerId)}catch{}f=null,C();return}d&&I(F.pointerId)},K=F=>{F.preventDefault();const X=F.deltaY<0?1.12:.88;t.zoom=Math.max(.1,Math.min(25,t.zoom*X)),t.updateProjectionMatrix()},k=F=>{if(F.target instanceof HTMLInputElement||F.target instanceof HTMLTextAreaElement)return;if(F.code==="Space"&&!F.repeat){F.preventDefault(),M=!0,C();return}const X=F.ctrlKey||F.metaKey,W=F.key.toLowerCase();if(X&&W==="z"&&!F.shiftKey){F.preventDefault(),r.undo();return}if(X&&(W==="y"||F.shiftKey&&W==="z")){F.preventDefault(),r.redo();return}if(X&&W==="0"){F.preventDefault(),t.position.set(0,0,10),t.zoom=1,t.updateProjectionMatrix();return}!X&&!F.altKey&&(W==="p"?Qn("pen"):W==="b"?Qn("brush"):W==="e"?Qn("eraser"):W==="i"?Qn("eyedropper"):W==="g"?Qn("bucket"):W==="u"?Qn("shape"):W==="j"?Qn("bone"):W==="h"?Qn("hand"):W==="x"?qc():W==="c"&&Yc())},G=F=>{F.code==="Space"&&(M=!1,C())};return e.addEventListener("pointerdown",q),e.addEventListener("pointermove",B),e.addEventListener("pointerup",V),e.addEventListener("pointercancel",V),e.addEventListener("wheel",K,{passive:!1}),window.addEventListener("keydown",k),window.addEventListener("keyup",G),{dispose:()=>{R(),d&&I(f??void 0),e.removeEventListener("pointerdown",q),e.removeEventListener("pointermove",B),e.removeEventListener("pointerup",V),e.removeEventListener("pointercancel",V),e.removeEventListener("wheel",K),window.removeEventListener("keydown",k),window.removeEventListener("keyup",G)}}}const gv=[{id:"source-over",label:"Normal"},{id:"multiply",label:"Multiply"},{id:"screen",label:"Screen"},{id:"overlay",label:"Overlay"},{id:"darken",label:"Darken"},{id:"lighten",label:"Lighten"},{id:"color-dodge",label:"Color Dodge"},{id:"difference",label:"Difference"}];function vv(n,e){let t=0,i=n.parentId?e.get(n.parentId):void 0;for(;i;)t++,i=i.parentId?e.get(i.parentId):void 0;return t}function _v(n,e){let t=n.parentId?e.get(n.parentId):void 0;for(;t;){if(t.collapsed)return!0;t=t.parentId?e.get(t.parentId):void 0}return!1}function xv(n){const e=[],t=r=>n.filter(s=>s.parentId===r).reverse();function i(r){const s=t(r);for(const o of s)e.push(o),o.type==="folder"&&i(o.id)}return i(null),e}function yv(n,e,t){n.innerHTML="",n.style.position="absolute",n.style.top="0",n.style.right="0",n.style.bottom="0",n.style.width="var(--right-dock-width, 250px)",n.style.pointerEvents="auto",n.style.zIndex="100",n.style.display="block";const i=document.createElement("aside");i.className="layers-panel";const r=document.createElement("div");r.className="csp-layers-width-resizer",r.title="Arrastrar para cambiar el ancho del panel de capas";const s=localStorage.getItem("oniri.layers.width");if(s){const N=Math.max(180,Math.min(480,Number(s)));document.documentElement.style.setProperty("--right-dock-width",`${N}px`)}let o=!1,a=0,c=250;r.addEventListener("pointerdown",N=>{N.preventDefault(),N.stopPropagation(),o=!0,a=N.clientX,c=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--right-dock-width"))||250,r.classList.add("dragging"),r.setPointerCapture(N.pointerId)}),r.addEventListener("pointermove",N=>{if(!o)return;const I=N.clientX-a,q=Math.max(180,Math.min(480,c-I));document.documentElement.style.setProperty("--right-dock-width",`${q}px`),localStorage.setItem("oniri.layers.width",String(q))});const l=N=>{if(o){o=!1,r.classList.remove("dragging");try{r.releasePointerCapture(N.pointerId)}catch{}}};r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),i.appendChild(r);const d=document.createElement("div");d.className="layers-tab-header";const f=document.createElement("div");f.className="layers-tab-title active",f.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
    <span>Layer</span>
  `,d.appendChild(f),i.appendChild(d);const g=document.createElement("div");g.className="layer-controls-row";const x=document.createElement("select");x.className="layer-blend-select";for(const N of gv){const I=document.createElement("option");I.value=N.id,I.textContent=N.label,x.appendChild(I)}x.addEventListener("change",()=>{e.setLayerBlendMode(e.activeLayerId,x.value)}),g.appendChild(x);const M=document.createElement("div");M.className="layer-opacity-box";const E=document.createElement("span");E.className="layer-opacity-label",E.textContent="100%";const h=document.createElement("input");h.type="range",h.className="layer-opacity-slider",h.min="0",h.max="100",h.step="1",h.value="100",h.addEventListener("input",()=>{const N=Number(h.value);E.textContent=`${N}%`,e.setLayerOpacity(e.activeLayerId,N/100)}),M.append(h,E),g.appendChild(M),i.appendChild(g);const p=document.createElement("div");p.className="layer-folder-assign-row",p.innerHTML='<span class="assign-label">Parent:</span>';const T=document.createElement("select");T.className="layer-folder-select",T.addEventListener("change",()=>{const N=T.value==="root"?null:T.value;e.moveToFolder(e.activeLayerId,N)}),p.appendChild(T),i.appendChild(p);const u=document.createElement("div");u.className="layer-folder-assign-row",u.style.gap="4px",u.innerHTML='<span class="assign-label" title="Vincular esta capa a un Hueso 2D">🦴 Hueso:</span>';const m=document.createElement("select");m.className="layer-folder-select",m.style.flex="1",m.title="Vincular capa rígidamente a un hueso del esqueleto",m.addEventListener("change",()=>{const N=e.getActiveLayer();if(!N||N.isPaper)return;const I=m.value===""?null:m.value;e.setLayerBoneBinding(N.id,I,!!N.meshSkinningEnabled)});const S=document.createElement("button");S.className="layer-action-btn",S.style.width="auto",S.style.padding="2px 6px",S.style.fontSize="10px",S.textContent="🕸️ Malla",S.title="Malla Deformable (Linear Blend Skinning): deforma suavemente el dibujo de esta capa con todos los huesos cercanos",S.addEventListener("click",()=>{const N=e.getActiveLayer();!N||N.isPaper||N.type!=="raster"||e.setLayerBoneBinding(N.id,N.boundBoneId??null,!N.meshSkinningEnabled)}),u.append(m,S),i.appendChild(u);const y=document.createElement("div");y.className="layers-actions-bar";const v=document.createElement("button");v.className="layer-action-btn",v.title="New Raster Layer",v.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `,v.addEventListener("click",()=>e.createLayer());const w=document.createElement("button");w.className="layer-action-btn",w.title="New Layer Folder",w.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  `,w.addEventListener("click",()=>e.createFolder());const _=document.createElement("button");_.className="layer-action-btn",_.title="New Animation Folder (CSP Style)",_.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/>
      <line x1="17" y1="2" x2="17" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="2" y1="7" x2="7" y2="7"/>
      <line x1="2" y1="17" x2="7" y2="17"/>
      <line x1="17" y1="17" x2="22" y2="17"/>
      <line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  `,_.addEventListener("click",()=>e.createAnimationFolder());const b=document.createElement("button");b.className="layer-action-btn clip-btn",b.title="Clip at Layer Below",b.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="7" y="7" width="14" height="14" rx="2"/>
      <path d="M3 17V5a2 2 0 0 1 2-2h12"/>
      <polyline points="10 14 7 14 7 17"/>
    </svg>
  `,b.addEventListener("click",()=>{e.toggleLayerClipping(e.activeLayerId)});const C=document.createElement("button");C.className="layer-action-btn",C.title="Delete Selected Layer / Folder",C.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  `,C.addEventListener("click",()=>{e.deleteLayer(e.activeLayerId)});const R=document.createElement("button");R.className="layer-action-btn",R.title="Move Layer Up",R.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `,R.addEventListener("click",()=>{e.moveLayerBranch(e.activeLayerId,"up")});const H=document.createElement("button");H.className="layer-action-btn",H.title="Move Layer Down",H.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,H.addEventListener("click",()=>{e.moveLayerBranch(e.activeLayerId,"down")}),y.append(v,w,_,b,C,R,H),i.appendChild(y);const P=document.createElement("div");P.className="layers-list",i.appendChild(P),n.appendChild(i);function U(){P.innerHTML="";const N=e.getActiveLayer();if(N){x.value=N.blendMode;const k=Math.round(N.opacity*100);h.value=String(k),E.textContent=`${k}%`,b.classList.toggle("active",!!N.clipped)}const I=e.layers.filter(k=>k.type==="folder"&&k.id!==(N==null?void 0:N.id));T.innerHTML='<option value="root">None (Root Level)</option>';for(const k of I){const G=document.createElement("option");G.value=k.id,G.textContent=`📁 ${k.name}`,T.appendChild(G)}T.value=(N==null?void 0:N.parentId)??"root",T.disabled=!N||!!N.isPaper;const q=(t==null?void 0:t.bones)??[];m.innerHTML='<option value="">(Sin hueso)</option>';for(const k of q){const G=document.createElement("option");G.value=k.id,G.textContent=`🦴 ${k.name}`,m.appendChild(G)}m.value=(N==null?void 0:N.boundBoneId)??"",m.disabled=!N||!!N.isPaper||N.type!=="raster",S.classList.toggle("active",!!(N!=null&&N.meshSkinningEnabled)),S.style.color=N!=null&&N.meshSkinningEnabled?"#fbbf24":"",S.disabled=!N||!!N.isPaper||N.type!=="raster";const B=new Map(e.layers.map(k=>[k.id,k])),V=new Map(q.map(k=>[k.id,k])),K=xv(e.layers);for(const k of K){if(_v(k,B))continue;const G=vv(k,B),F=document.createElement("div");if(F.className="layer-item",F.dataset.layerId=k.id,F.classList.toggle("active",k.id===e.activeLayerId),F.classList.toggle("is-folder",k.type==="folder"),F.classList.toggle("is-clipped",!!k.clipped),G>0&&(F.style.paddingLeft=`${8+G*14}px`),k.type==="folder"){const Q=document.createElement("button");Q.className="layer-folder-chevron",Q.title=k.collapsed?"Expand Folder":"Collapse Folder",Q.innerHTML=`
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="${k.collapsed?"collapsed":""}">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        `,Q.addEventListener("click",j=>{j.stopPropagation(),e.toggleFolderCollapse(k.id)}),F.appendChild(Q)}else{const Q=document.createElement("span");Q.className="layer-chevron-spacer",F.appendChild(Q)}const X=document.createElement("button");if(X.className="layer-eye-btn",X.title=k.visible?"Hide Layer":"Show Layer",X.innerHTML=k.visible?'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555555" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',X.addEventListener("click",Q=>{Q.stopPropagation(),e.setLayerVisibility(k.id,!k.visible)}),F.appendChild(X),k.clipped){const Q=document.createElement("div");Q.className="layer-clip-indicator",Q.title="Clipped at layer below",F.appendChild(Q)}if(k.type==="folder"){const Q=document.createElement("div");Q.className="layer-folder-icon",k.isAnimationFolder?(Q.innerHTML=`
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
          `,Q.title="Animation Folder (Track)"):Q.innerHTML=`
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          `,F.appendChild(Q)}else{const Q=document.createElement("canvas");Q.className="layer-thumb",Q.width=36,Q.height=22;const j=Q.getContext("2d");k.isPaper?(j.fillStyle="#ffffff",j.fillRect(0,0,36,22)):k.canvas&&(j.fillStyle="#262626",j.fillRect(0,0,36,22),j.drawImage(k.canvas,0,0,36,22)),F.appendChild(Q)}const W=document.createElement("span");if(W.className="layer-name-text",W.textContent=k.name,W.title="Double click to rename",W.addEventListener("dblclick",Q=>{Q.stopPropagation();const j=document.createElement("input");j.type="text",j.className="layer-name-input",j.value=k.name;const se=()=>{e.renameLayer(k.id,j.value)};j.addEventListener("blur",se),j.addEventListener("keydown",de=>{de.key==="Enter"?(j.removeEventListener("blur",se),se()):de.key==="Escape"&&(j.removeEventListener("blur",se),U())}),W.replaceWith(j),j.focus(),j.select()}),F.appendChild(W),k.meshSkinningEnabled){const Q=document.createElement("span");Q.className="layer-badge",Q.style.color="#fbbf24",Q.style.fontSize="10px",Q.title="Malla 2D Deformable (Linear Blend Skinning)",Q.textContent="🕸️",F.appendChild(Q)}else if(k.boundBoneId){const Q=V.get(k.boundBoneId),j=document.createElement("span");j.className="layer-badge",j.style.color=(Q==null?void 0:Q.color)??"#38bdf8",j.style.fontSize="10px",j.title=`Vinculado a hueso: ${(Q==null?void 0:Q.name)??k.boundBoneId}`,j.textContent="🦴",F.appendChild(j)}if(k.isPaper){const Q=document.createElement("span");Q.className="layer-badge",Q.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',F.appendChild(Q)}F.addEventListener("click",()=>{e.setActiveLayer(k.id)}),P.appendChild(F)}}e.subscribe(U),t==null||t.subscribe(U),U()}const bv=[{id:"pen",label:"Pluma",shortcut:"P",icon:'<path d="M12 19l7-7 3 3-7 7-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="11" cy="11" r="1.5" fill="currentColor"/>'},{id:"brush",label:"Pincel",shortcut:"B",icon:'<path d="M4 20l3-1 11-11a2 2 0 0 0-3-3L4 16z" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/>'},{id:"eraser",label:"Goma de Borrar",shortcut:"E",icon:'<path d="M16 3l5 5-9 9h-5l-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'},{id:"eyedropper",label:"Cuentagotas",shortcut:"I",icon:'<path d="M13 3l4 4 6-2-2 6-4 4-8-8z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 11l-6 6a1 1 0 0 0 0 2l3 3a1 1 0 0 0 2 0l6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'},{id:"bucket",label:"Relleno",shortcut:"G",icon:'<path d="M19 11l-8-8-8.5 8.5a2.12 2.12 0 0 0 0 3l5 5a2.12 2.12 0 0 0 3 0L19 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 2l5 5" stroke="currentColor" stroke-width="1.8"/><path d="M2 13l7.5 7.5" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="19" r="2" fill="currentColor"/>'},{id:"shape",label:"Figura",shortcut:"U",icon:'<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>'},{id:"bone",label:"Huesos 2D (Rig & Pose)",shortcut:"J",icon:'<circle cx="6" cy="6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="18" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8l8 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="8,8 13,9.5 9.5,13" fill="currentColor"/>'},{id:"hand",label:"Mover Lienzo",shortcut:"H",icon:'<path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M6 14v1a7 7 0 0 0 14 0v-5a2 2 0 0 0-4 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'}],Mv=[3,5,8,12,18,28,45,70],Jc=[{id:"circle",label:"Círculo"},{id:"square",label:"Plano"},{id:"calligraphic",label:"Caligráfico"}],Qc=[{id:"none",label:"Ninguno"},{id:"weak",label:"Débil"},{id:"medium",label:"Medio"},{id:"strong",label:"Fuerte"}];function Ua(n=""){const e=document.createElement("div");e.className=`csp-scroll-wrap ${n}`;const t=document.createElement("div");t.className="csp-scroll-list";const i=document.createElement("div");i.className="csp-custom-scrollbar";const r=document.createElement("div");r.className="csp-custom-scroll-thumb",i.appendChild(r),e.append(t,i);const s=()=>{const d=t.clientHeight,f=t.scrollHeight,g=t.scrollTop;if(f<=d+2){i.classList.add("hidden");return}i.classList.remove("hidden");const x=Math.max(20,d/f*d),M=f-d,E=d-x,h=M>0?g/M*E:0;r.style.height=`${Math.round(x)}px`,r.style.transform=`translateY(${Math.round(h)}px)`};t.addEventListener("scroll",s,{passive:!0});let o=!1,a=0,c=0;r.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),o=!0,a=d.clientY,c=t.scrollTop,r.classList.add("dragging"),r.setPointerCapture(d.pointerId)}),r.addEventListener("pointermove",d=>{if(!o)return;const f=d.clientY-a,g=t.clientHeight,x=t.scrollHeight,M=Math.max(20,g/x*g),E=x-g,h=g-M;h>0&&(t.scrollTop=c+f/h*E)});const l=d=>{if(o){o=!1,r.classList.remove("dragging");try{r.releasePointerCapture(d.pointerId)}catch{}}};return r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),i.addEventListener("pointerdown",d=>{if(d.target===r)return;const f=i.getBoundingClientRect(),g=d.clientY-f.top,x=t.clientHeight,M=t.scrollHeight,E=Math.max(0,Math.min(1,g/x));t.scrollTop=E*(M-x)}),{wrap:e,list:t,scrollbar:i,thumb:r,update:s}}let Ns=null;function Dr(){Ns&&(Ns.remove(),Ns=null)}function nc(n){var M,E,h;Dr();const e=document.createElement("div");e.className="csp-modal-backdrop",e.addEventListener("click",p=>{p.target===e&&Dr()});const t=document.createElement("div");t.className="csp-subtool-detail-window";const i=document.createElement("div");i.className="csp-subtool-detail-header",i.innerHTML=`
    <div style="display:flex;align-items:center;gap:6px;">
      <span style="color:#38bdf8;">🔧</span>
      <span>Detalle de subherramienta — <strong>${n.name}</strong></span>
    </div>
    <button class="csp-subtool-action-btn" id="csp-detail-close" title="Cerrar (Esc)">✕</button>
  `,(M=i.querySelector("#csp-detail-close"))==null||M.addEventListener("click",Dr),t.appendChild(i);const r=document.createElement("div");r.className="csp-subtool-detail-body";const s=document.createElement("div");s.className="csp-subtool-detail-cats";const o=document.createElement("div");o.className="csp-subtool-detail-content";const a=[{id:"size",label:"Tamaño del pincel"},{id:"ink",label:"Tinta"},{id:"smooth",label:"Suavizado"},{id:"tip",label:"Punta del pincel"},{id:"stroke",label:"Trazo"},{id:"taper",label:"Inicio y fin"},{id:"correction",label:"Corrección"}];let c="size";const l=new Map;function d(p){const T=document.createElement("button");T.className="csp-eye-pin-btn";const u=pt().visibleProperties.includes(p);return T.classList.toggle("pinned",u),T.title=u?"Visible en la barra lateral. Haz clic para ocultar.":"Oculto de la barra lateral. Haz clic para fijar (👁).",T.innerHTML=`<span style="font-size:12px;">${u?"👁":"◦"}</span>`,T.addEventListener("click",()=>{Gg(p);const m=pt().visibleProperties.includes(p);T.classList.toggle("pinned",m),T.title=m?"Visible en la barra lateral. Haz clic para ocultar.":"Oculto de la barra lateral. Haz clic para fijar (👁).",T.innerHTML=`<span style="font-size:12px;">${m?"👁":"◦"}</span>`}),T}function f(p){o.innerHTML="";const u=pt().brush;if(p==="size"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("size"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Tamaño del pincel</span>
          <span class="prop-value" id="dt-size-val">${Math.round(u.size)} px</span>
        </div>
      `;const v=document.createElement("input");v.type="range",v.className="csp-slider",v.min="1",v.max="200",v.value=String(Math.round(u.size)),v.addEventListener("input",()=>{ft({size:Number(v.value)});const U=y.querySelector("#dt-size-val");U&&(U.textContent=`${v.value} px`)}),y.appendChild(v),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("pressureSize"),b=document.createElement("div");b.className="csp-detail-prop-main",b.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Tamaño mínimo por presión</span>
          <span class="prop-value" id="dt-psize-val">${Math.round(u.minSizeRatio*100)}%</span>
        </div>
      `;const C=document.createElement("div");C.className="csp-toggle-row";const R=document.createElement("input");R.type="checkbox",R.className="csp-checkbox",R.id="dt-psize-chk",R.checked=u.pressureSize;const H=document.createElement("label");H.className="csp-check-label",H.htmlFor="dt-psize-chk",H.textContent="Activar variación de tamaño por presión",C.append(R,H);const P=document.createElement("input");P.type="range",P.className="csp-slider",P.min="0",P.max="100",P.value=String(Math.round(u.minSizeRatio*100)),P.disabled=!u.pressureSize,R.addEventListener("change",()=>{ft({pressureSize:R.checked}),P.disabled=!R.checked}),P.addEventListener("input",()=>{ft({minSizeRatio:Number(P.value)/100});const U=b.querySelector("#dt-psize-val");U&&(U.textContent=`${P.value}%`)}),b.append(C,P),w.append(_,b),o.appendChild(w)}else if(p==="ink"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("opacity"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Opacidad general</span>
          <span class="prop-value" id="dt-op-val">${Math.round(u.opacity*100)}%</span>
        </div>
      `;const v=document.createElement("input");v.type="range",v.className="csp-slider",v.min="1",v.max="100",v.value=String(Math.round(u.opacity*100)),v.addEventListener("input",()=>{ft({opacity:Number(v.value)/100});const U=y.querySelector("#dt-op-val");U&&(U.textContent=`${v.value}%`)}),y.appendChild(v),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("flow"),b=document.createElement("div");b.className="csp-detail-prop-main",b.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Densidad de pintura / Flujo</span>
          <span class="prop-value" id="dt-fl-val">${Math.round(u.flow*100)}%</span>
        </div>
      `;const C=document.createElement("input");C.type="range",C.className="csp-slider",C.min="1",C.max="100",C.value=String(Math.round(u.flow*100)),C.addEventListener("input",()=>{ft({flow:Number(C.value)/100});const U=b.querySelector("#dt-fl-val");U&&(U.textContent=`${C.value}%`)});const R=document.createElement("div");R.className="csp-toggle-row";const H=document.createElement("input");H.type="checkbox",H.className="csp-checkbox",H.id="dt-fl-chk",H.checked=u.pressureFlow;const P=document.createElement("label");P.className="csp-check-label",P.htmlFor="dt-fl-chk",P.textContent="Densidad según presión de pluma",R.append(H,P),H.addEventListener("change",()=>{ft({pressureFlow:H.checked})}),b.append(C,R),w.append(_,b),o.appendChild(w)}else if(p==="smooth"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("stabilization"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Estabilización de trazo</span>
          <span class="prop-value" id="dt-st-val">${Math.round(u.stabilization)}</span>
        </div>
      `;const v=document.createElement("input");v.type="range",v.className="csp-slider",v.min="0",v.max="10",v.value=String(Math.round(u.stabilization)),v.addEventListener("input",()=>{ft({stabilization:Number(v.value)});const R=y.querySelector("#dt-st-val");R&&(R.textContent=v.value)}),y.appendChild(v),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("antiAliasing"),b=document.createElement("div");b.className="csp-detail-prop-main",b.innerHTML='<span class="prop-label">Suavizado (Anti-Aliasing)</span>';const C=document.createElement("div");C.className="csp-seg-group";for(const R of Qc){const H=document.createElement("button");H.className=`csp-seg-btn${u.antiAliasing===R.id?" active":""}`,H.textContent=R.label,H.addEventListener("click",()=>{ft({antiAliasing:R.id}),f("smooth")}),C.appendChild(H)}b.appendChild(C),w.append(_,b),o.appendChild(w)}else if(p==="tip"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("tipShape"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML='<span class="prop-label">Forma de la punta</span>';const v=document.createElement("div");v.className="csp-seg-group";for(const N of Jc){const I=document.createElement("button");I.className=`csp-seg-btn${u.tipShape===N.id?" active":""}`,I.textContent=N.label,I.addEventListener("click",()=>{ft({tipShape:N.id}),f("tip")}),v.appendChild(I)}y.appendChild(v),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("roundness"),b=document.createElement("div");b.className="csp-detail-prop-main",b.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Achatamiento / Redondez</span>
          <span class="prop-value" id="dt-rn-val">${Math.round(u.tipRoundness*100)}%</span>
        </div>
      `;const C=document.createElement("input");C.type="range",C.className="csp-slider",C.min="10",C.max="100",C.value=String(Math.round(u.tipRoundness*100)),C.addEventListener("input",()=>{ft({tipRoundness:Number(C.value)/100});const N=b.querySelector("#dt-rn-val");N&&(N.textContent=`${C.value}%`)}),b.appendChild(C),w.append(_,b),o.appendChild(w);const R=document.createElement("div");R.className="csp-detail-prop-row";const H=d("angle"),P=document.createElement("div");P.className="csp-detail-prop-main",P.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Ángulo de inclinación</span>
          <span class="prop-value" id="dt-an-val">${Math.round(u.tipAngle)}°</span>
        </div>
      `;const U=document.createElement("input");U.type="range",U.className="csp-slider",U.min="0",U.max="180",U.value=String(Math.round(u.tipAngle)),U.addEventListener("input",()=>{ft({tipAngle:Number(U.value)});const N=P.querySelector("#dt-an-val");N&&(N.textContent=`${U.value}°`)}),P.appendChild(U),R.append(H,P),o.appendChild(R)}else if(p==="stroke"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("spacing"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Intervalo entre estampas (Espaciado)</span>
          <span class="prop-value" id="dt-sp-val">${Math.round(u.spacing*100)}%</span>
        </div>
      `;const v=document.createElement("input");v.type="range",v.className="csp-slider",v.min="3",v.max="50",v.value=String(Math.round(u.spacing*100)),v.addEventListener("input",()=>{ft({spacing:Number(v.value)/100});const w=y.querySelector("#dt-sp-val");w&&(w.textContent=`${v.value}%`)}),y.appendChild(v),m.append(S,y),o.appendChild(m)}else if(p==="taper"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("taper"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Afinado de inicio (Entrada)</span>
          <span class="prop-value" id="dt-tps-val">${Math.round(u.taperStart)} px</span>
        </div>
      `;const v=document.createElement("input");v.type="range",v.className="csp-slider",v.min="0",v.max="60",v.value=String(Math.round(u.taperStart)),v.addEventListener("input",()=>{ft({taperStart:Number(v.value)});const b=y.querySelector("#dt-tps-val");b&&(b.textContent=`${v.value} px`)});const w=document.createElement("div");w.className="prop-row-header",w.style.marginTop="6px",w.innerHTML=`
        <span class="prop-label">Afinado de fin (Salida)</span>
        <span class="prop-value" id="dt-tpe-val">${Math.round(u.taperEnd)} px</span>
      `;const _=document.createElement("input");_.type="range",_.className="csp-slider",_.min="0",_.max="80",_.value=String(Math.round(u.taperEnd)),_.addEventListener("input",()=>{ft({taperEnd:Number(_.value)});const b=w.querySelector("#dt-tpe-val");b&&(b.textContent=`${_.value} px`)}),y.append(v,w,_),m.append(S,y),o.appendChild(m)}else{const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("hardness"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Dureza de punta</span>
          <span class="prop-value" id="dt-hd-val">${Math.round(u.hardness*100)}%</span>
        </div>
      `;const v=document.createElement("input");v.type="range",v.className="csp-slider",v.min="10",v.max="100",v.value=String(Math.round(u.hardness*100)),v.addEventListener("input",()=>{ft({hardness:Number(v.value)/100});const w=y.querySelector("#dt-hd-val");w&&(w.textContent=`${v.value}%`)}),y.appendChild(v),m.append(S,y),o.appendChild(m)}}for(const p of a){const T=document.createElement("button");T.className=`csp-detail-cat-btn${p.id===c?" active":""}`,T.textContent=p.label,T.addEventListener("click",()=>{c=p.id;for(const[u,m]of l)m.classList.toggle("active",u===c);f(c)}),s.appendChild(T),l.set(p.id,T)}r.append(s,o),t.appendChild(r);const g=document.createElement("div");g.className="csp-subtool-detail-footer",g.innerHTML=`
    <button class="csp-seg-btn" id="dt-reset-btn" style="padding:4px 8px;">↺ Ajustes de fábrica</button>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:10px;color:#8c95a4;">👁 Haz clic en el ojo para fijar al panel lateral</span>
      <button class="csp-seg-btn active" id="dt-ok-btn" style="padding:4px 12px;font-weight:600;">Cerrar</button>
    </div>
  `,(E=g.querySelector("#dt-reset-btn"))==null||E.addEventListener("click",()=>{$c(n.id),f(c)}),(h=g.querySelector("#dt-ok-btn"))==null||h.addEventListener("click",Dr),t.appendChild(g),e.appendChild(t),document.body.appendChild(e),Ns=e,f("size");const x=p=>{p.key==="Escape"&&(Dr(),window.removeEventListener("keydown",x))};window.addEventListener("keydown",x)}function Sv(n,e){var ho;n.innerHTML="",n.className="tools-root";const t=document.createElement("aside");t.className="lateral-toolbar";const i=new Map;for(const z of bv){const ie=document.createElement("button");ie.className="lateral-btn tool-btn",ie.dataset.tool=z.id,ie.title=`${z.label} (${z.shortcut})`,ie.setAttribute("aria-label",z.label),ie.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        ${z.icon}
      </svg>
      <span class="btn-shortcut">${z.shortcut}</span>
    `,ie.addEventListener("click",()=>{Qn(z.id),pt().propertiesOpen||Kl(!0)}),t.appendChild(ie),i.set(z.id,ie)}const r=document.createElement("div");r.className="toolbar-divider",t.appendChild(r);const s=document.createElement("button");s.className="lateral-btn action-btn",s.title="Deshacer (Ctrl+Z)",s.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  `,s.addEventListener("click",()=>{var z;return(z=e==null?void 0:e.onUndo)==null?void 0:z.call(e)}),t.appendChild(s);const o=document.createElement("button");o.className="lateral-btn action-btn",o.title="Rehacer (Ctrl+Y)",o.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  `,o.addEventListener("click",()=>{var z;return(z=e==null?void 0:e.onRedo)==null?void 0:z.call(e)}),t.appendChild(o);const a=document.createElement("div");a.style.flex="1",t.appendChild(a);const c=document.createElement("div");c.className="csp-color-widget",c.title="Colores (X: Alternar principal/secundario, C: Color transparente)";const l=document.createElement("div");l.className="csp-swatches-overlap";const d=document.createElement("div");d.className="csp-swatch secondary",d.title="Color Secundario (Clic para seleccionar)",d.addEventListener("click",()=>Yl("secondary"));const f=document.createElement("div");f.className="csp-swatch primary",f.title="Color Principal (Clic para seleccionar)",f.addEventListener("click",()=>Yl("primary"));const g=document.createElement("button");g.className="csp-swap-btn",g.title="Alternar color principal y secundario (Atajo: X)",g.innerHTML=`
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="7 10 12 15 17 10"/>
      <path d="M12 15V3"/>
    </svg>
  `,g.addEventListener("click",z=>{z.stopPropagation(),qc()}),l.append(d,f,g),c.appendChild(l);const x=document.createElement("div");x.className="csp-transparent-tile",x.title="Color Transparente (Atajo: C) - Convierte el pincel en borrador conservando su textura",x.innerHTML='<div class="csp-checkerboard"></div>',x.addEventListener("click",()=>Yc()),c.appendChild(x),t.appendChild(c);const M=document.createElement("button");M.className="lateral-btn drawer-toggle-btn",M.title="Ocultar / Mostrar Panel de Propiedades y Subherramientas",M.innerHTML=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  `,M.addEventListener("click",()=>Kl()),t.appendChild(M),n.appendChild(t);const E=document.createElement("div");E.className="csp-sidebar-dock";const h=localStorage.getItem("oniri.dock.width");let p=h?Math.max(220,Math.min(480,Number(h))):240;document.documentElement.style.setProperty("--left-dock-inner-width",`${p}px`);const T=document.createElement("div");T.className="csp-dock-width-resizer",T.title="Arrastrar para cambiar el ancho de la barra lateral";let u=!1,m=0,S=240;T.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),u=!0,m=z.clientX,S=E.offsetWidth,T.classList.add("dragging"),T.setPointerCapture(z.pointerId)}),T.addEventListener("pointermove",z=>{if(!u)return;const ie=z.clientX-m;p=Math.max(220,Math.min(480,S+ie)),document.documentElement.style.setProperty("--left-dock-inner-width",`${p}px`),document.documentElement.style.setProperty("--left-dock-width",`${p+48}px`),localStorage.setItem("oniri.dock.width",String(p)),N.update(),F.update(),Gi.update()});const y=z=>{if(u){u=!1,T.classList.remove("dragging");try{T.releasePointerCapture(z.pointerId)}catch{}}};T.addEventListener("pointerup",y),T.addEventListener("pointercancel",y),E.appendChild(T);const v=document.createElement("div");v.className="dock-section subtool-section";const w=localStorage.getItem("oniri.subtool.height");let _=w?Math.max(70,Math.min(400,Number(w))):140;v.style.height=`${_}px`;const b=document.createElement("div");b.className="dock-section-header",b.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
    <span class="subtool-section-title">Subherramientas</span>
  `;function C(z,ie,Te=!1){const Ge=document.createElement("button");return Ge.className=`csp-subtool-action-btn${Te?" danger":""}`,Ge.textContent=z,Ge.title=ie,Ge}const R=C("+","Crear un pincel nuevo a partir del actual (duplicar)"),H=C("↺","Restaurar los ajustes de fábrica de este pincel"),P=C("🗑","Eliminar este pincel personalizado",!0);R.addEventListener("click",()=>{const z=pt().activeSubToolId,ie=Zg(z)??jg("Pincel nuevo");$l(ie.id)}),H.addEventListener("click",()=>{$c(pt().activeSubToolId)}),P.addEventListener("click",()=>{Jg(pt().activeSubToolId)});const U=document.createElement("div");U.className="subtool-header-actions",U.append(R,H,P),b.appendChild(U),v.appendChild(b);const N=Ua("csp-subtool-scroll-wrap");v.appendChild(N.wrap),E.appendChild(v);const I=document.createElement("div");I.className="csp-dock-splitter",I.title="Arrastrar para cambiar el tamaño de Subherramientas y Propiedades";let q=!1,B=0,V=140;I.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),q=!0,B=z.clientY,V=v.offsetHeight,I.classList.add("dragging"),I.setPointerCapture(z.pointerId)}),I.addEventListener("pointermove",z=>{if(!q)return;const ie=z.clientY-B;_=Math.max(70,Math.min(400,V+ie)),v.style.height=`${_}px`,localStorage.setItem("oniri.subtool.height",String(_)),N.update(),F.update()});const K=z=>{if(q){q=!1,I.classList.remove("dragging");try{I.releasePointerCapture(z.pointerId)}catch{}}};I.addEventListener("pointerup",K),I.addEventListener("pointercancel",K),E.appendChild(I);const k=document.createElement("div");k.className="dock-section prop-section";const G=document.createElement("div");G.className="dock-section-header",G.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
    <span class="prop-section-title">Propiedad de herramienta</span>
  `,k.appendChild(G);const F=Ua("csp-prop-scroll-wrap"),X=F.list,W=new Map;function Q(z,ie){const Te=document.createElement("div");Te.className="prop-row-header";const Ge=document.createElement("span");Ge.className="prop-label",Ge.textContent=z;const ut=document.createElement("span");return ut.className="prop-value",ut.textContent=ie,Te.append(Ge,ut),{header:Te,value:ut}}function j(z,ie,Te){const Ge=document.createElement("input");return Ge.type="range",Ge.className="csp-slider",Ge.min=z,Ge.max=ie,Ge.step=Te,Ge}function se(z,ie){const Te=document.createElement("input");Te.type="checkbox",Te.className="csp-checkbox",Te.id=z;const Ge=document.createElement("label");return Ge.className="csp-check-label",Ge.htmlFor=z,Ge.textContent=ie,{box:Te,label:Ge}}function de(z,ie){const Te=document.createElement("div");Te.className="csp-seg-group";const Ge=new Map;for(const ut of z){const ht=document.createElement("button");ht.className="csp-seg-btn",ht.textContent=ut.label,ht.addEventListener("click",()=>ie(ut.id)),Te.appendChild(ht),Ge.set(ut.id,ht)}return{group:Te,buttons:Ge}}const ae=210,$=62,Ve=Math.min(2,window.devicePixelRatio||1),be=document.createElement("div");be.className="prop-row-box ink-only",be.style.display="none";const Ne=document.createElement("div");Ne.className="csp-preview-wrap";const me=document.createElement("canvas");me.className="csp-preview-canvas bg-paper",me.width=Math.round(ae*Ve),me.height=Math.round($*Ve),me.title="Visión del pincel (Trazo dinámico con respuesta a presión)",Ne.appendChild(me);const Be=document.createElement("div");Be.className="csp-preview-overlay-bar";const ze=document.createElement("button");ze.className="csp-preview-mini-btn",ze.innerHTML='<span>◐</span><span id="preview-bg-name">Papel</span>',ze.title="Cambiar fondo de vista previa (Papel / Damero / Oscuro)",ze.addEventListener("click",()=>{const z=pt().previewBgMode;Vg(z==="paper"?"checker":z==="checker"?"dark":"paper")}),Be.appendChild(ze),Ne.appendChild(Be),be.appendChild(Ne),X.appendChild(be);const D=()=>{const z=me.getContext("2d");if(!z)return;const ie=pt(),Te=ie.brush,Ge=ie.previewBgMode;me.className=`csp-preview-canvas bg-${Ge}`;const ut=be.querySelector("#preview-bg-name");ut&&(ut.textContent=Ge==="paper"?"Papel":Ge==="checker"?"Damero":"Oscuro"),z.setTransform(Ve,0,0,Ve,0,0),z.clearRect(0,0,ae,$);let ht=!Te.color||Te.color==="transparent"?"#111111":Te.color;if(Ge==="dark"){const Tt=Rn(ht);(Tt.r*299+Tt.g*587+Tt.b*114)/1e3<65&&(ht="#f3f4f6")}const Nt=12,Ht=$/2,$t=$/2-Nt,En=ae-Nt*2,Tn=Math.min(1,30/Math.max(1,Te.size)),qt=Math.min(.5,Math.max(.03,Te.spacing)),Pe=120,ge=[],Xe=[],Ze=[0];for(let Tt=0;Tt<=Pe;Tt++){const ct=Tt/Pe,Ut=Nt+ct*En,sn=Ht+Math.sin(ct*Math.PI*2)*$t;if(Tt>0){const kt=Tt-1;Ze.push(Ze[kt]+Math.hypot(Ut-ge[kt],sn-Xe[kt]))}ge.push(Ut),Xe.push(sn)}const vt=Ze[Pe],_t=Tt=>{let ct=1;for(;ct<Pe&&Ze[ct]<Tt;)ct++;const Ut=Ze[ct-1],sn=Ze[ct],kt=sn>Ut?(Tt-Ut)/(sn-Ut):0;return{x:ge[ct-1]+(ge[ct]-ge[ct-1])*kt,y:Xe[ct-1]+(Xe[ct]-Xe[ct-1])*kt,dx:ge[ct]-ge[ct-1],dy:Xe[ct]-Xe[ct-1]}};let gt=0,wn=0;for(;gt<=vt&&wn++<3e3;){const Tt=gt/vt,ct=_t(gt),Ut=.25+.75*Math.pow(Math.sin(Math.PI*Tt),.7),sn=Ir(Te,Ut,gt/Math.max(Tn,.001)),kt=Math.max(.4,sn*Tn),ss=Zc(Te,Ut),$n=Kc({diameter:kt,hardness:Te.hardness,color:ht,antiAliasing:Te.antiAliasing,tipShape:Te.tipShape,tipRoundness:Te.tipRoundness}),mo=(Te.followDirection&&Te.tipShape!=="calligraphic"?Math.atan2(ct.dy,ct.dx)*180/Math.PI:0)+Te.tipAngle,ad=Te.tipShape!=="square"&&Te.tipRoundness>=.999;z.globalAlpha=ss,!ad&&mo!==0?(z.save(),z.translate(ct.x,ct.y),z.rotate(mo*Math.PI/180),z.drawImage($n,-$n.width/2,-$n.height/2),z.restore()):z.drawImage($n,ct.x-$n.width/2,ct.y-$n.height/2),gt+=Math.max(.3,kt*qt)}z.globalAlpha=1};let A=!1;const ee=()=>{A||(A=!0,requestAnimationFrame(()=>{A=!1,D()}))},he=document.createElement("div");he.className="prop-row-box";const ce=document.createElement("div");ce.className="prop-row-header",ce.innerHTML=`
    <span class="prop-label">Tamaño del pincel</span>
    <span class="prop-value" id="size-val">6.0 px</span>
  `;const le=document.createElement("input");le.type="range",le.className="csp-slider",le.min="1",le.max="200",le.step="1",le.addEventListener("input",()=>{ft({size:Number(le.value)})});const Fe=document.createElement("div");Fe.className="csp-quick-size-row";for(const z of Mv){const ie=document.createElement("button");ie.className="csp-quick-size-btn",ie.textContent=String(z),ie.addEventListener("click",()=>{ft({size:z})}),Fe.appendChild(ie)}he.append(ce,le,Fe),X.appendChild(he),W.set("size",he);const xe=document.createElement("div");xe.className="prop-row-box";const De=document.createElement("div");De.className="prop-row-header",De.innerHTML=`
    <span class="prop-label">Opacidad</span>
    <span class="prop-value" id="opacity-val">100%</span>
  `;const Ue=document.createElement("input");Ue.type="range",Ue.className="csp-slider",Ue.min="1",Ue.max="100",Ue.addEventListener("input",()=>{ft({opacity:Number(Ue.value)/100})}),xe.append(De,Ue),X.appendChild(xe),W.set("opacity",xe);const et=document.createElement("div");et.className="prop-row-box";const ue=document.createElement("div");ue.className="prop-row-header",ue.innerHTML=`
    <span class="prop-label">Densidad del pincel</span>
    <span class="prop-value" id="flow-val">100%</span>
  `;const ot=document.createElement("input");ot.type="range",ot.className="csp-slider",ot.min="1",ot.max="100",ot.addEventListener("input",()=>{ft({flow:Number(ot.value)/100})});const tt=se("flow-pressure-check","Densidad por presión"),Je=document.createElement("div");Je.className="csp-toggle-row",Je.append(tt.box,tt.label),tt.box.addEventListener("change",()=>{ft({pressureFlow:tt.box.checked})}),et.append(ue,ot,Je),X.appendChild(et),W.set("flow",et);const We=document.createElement("div");We.className="prop-row-box";const Ie=document.createElement("div");Ie.className="prop-row-header",Ie.innerHTML=`
    <span class="prop-label">Dureza</span>
    <span class="prop-value" id="hardness-val">100%</span>
  `;const Z=document.createElement("div");Z.className="csp-hardness-dots-container";const Se=[{val:.1,label:"Muy suave"},{val:.35,label:"Suave"},{val:.6,label:"Medio"},{val:.8,label:"Firme"},{val:1,label:"Duro"}],He=Se.map((z,ie)=>{const Te=document.createElement("button");return Te.className="csp-hardness-dot-btn",Te.title=z.label,Te.innerHTML=`<span class="dot-preview" style="transform: scale(${.4+ie*.15});"></span>`,Te.addEventListener("click",()=>{ft({hardness:z.val})}),Z.appendChild(Te),Te});We.append(Ie,Z),X.appendChild(We),W.set("hardness",We);const Ce=document.createElement("div");Ce.className="prop-row-box";const oe=document.createElement("div");oe.className="prop-row-header",oe.innerHTML=`
    <span class="prop-label">Estabilización</span>
    <span class="prop-value" id="stab-val">5</span>
  `;const O=document.createElement("input");O.type="range",O.className="csp-slider",O.min="0",O.max="10",O.step="1",O.addEventListener("input",()=>{ft({stabilization:Number(O.value)})}),Ce.append(oe,O),X.appendChild(Ce),W.set("stabilization",Ce);const fe=document.createElement("div");fe.className="prop-row-box";const ve=Q("Tamaño mínimo por presión","15%"),Ee=se("psize-check","Tamaño por presión"),Re=document.createElement("div");Re.className="csp-toggle-row",Re.append(Ee.box,Ee.label);const $e=j("0","100","1");Ee.box.addEventListener("change",()=>ft({pressureSize:Ee.box.checked})),$e.addEventListener("input",()=>{ft({minSizeRatio:Number($e.value)/100})}),fe.append(ve.header,Re,$e),X.appendChild(fe),W.set("pressureSize",fe);const nt=document.createElement("div");nt.className="prop-row-box";const mt=Q("Afinado de inicio","0 px"),pe=j("0","60","1");pe.addEventListener("input",()=>{ft({taperStart:Number(pe.value)})});const Le=Q("Afinado de fin","0 px"),ye=j("0","80","1");ye.addEventListener("input",()=>{ft({taperEnd:Number(ye.value)})}),nt.append(mt.header,pe,Le.header,ye),X.appendChild(nt),W.set("taper",nt);const Me=document.createElement("div");Me.className="prop-row-box";const je=document.createElement("span");je.className="prop-label",je.textContent="Forma de punta";const ke=de(Jc,z=>ft({tipShape:z}));Me.append(je,ke.group),X.appendChild(Me),W.set("tipShape",Me);const it=document.createElement("div");it.className="prop-row-box";const Ft=document.createElement("span");Ft.className="prop-label",Ft.textContent="Suavizado (anti-aliasing)";const Lt=de(Qc,z=>ft({antiAliasing:z}));it.append(Ft,Lt.group),X.appendChild(it),W.set("antiAliasing",it);const Jt=document.createElement("div");Jt.className="prop-row-box";const zt=Q("Achatamiento de punta","100%"),nn=j("10","100","1");nn.addEventListener("input",()=>{ft({tipRoundness:Number(nn.value)/100})}),Jt.append(zt.header,nn),X.appendChild(Jt),W.set("roundness",Jt);const ii=document.createElement("div");ii.className="prop-row-box";const yi=Q("Ángulo de punta","0°"),L=j("0","180","1");L.addEventListener("input",()=>{ft({tipAngle:Number(L.value)})}),ii.append(yi.header,L),X.appendChild(ii),W.set("angle",ii);const Y=document.createElement("div");Y.className="prop-row-box bucket-only";const te=document.createElement("div");te.className="prop-row-header",te.innerHTML=`
    <span class="prop-label">Tolerancia de color</span>
    <span class="prop-value" id="tol-val">20%</span>
  `;const ne=document.createElement("input");ne.type="range",ne.className="csp-slider",ne.min="0",ne.max="100",ne.addEventListener("input",()=>{ft({tolerance:Number(ne.value)})}),Y.append(te,ne),X.appendChild(Y);const J=document.createElement("div");J.className="prop-row-box shape-only";const Ae=document.createElement("span");Ae.className="prop-label",Ae.textContent="Tipo de figura",J.appendChild(Ae);const Oe=document.createElement("div");Oe.className="csp-seg-group";const qe=[{id:"line",label:"Línea"},{id:"rectangle",label:"Rect"},{id:"ellipse",label:"Elipse"}],Ye=new Map;for(const z of qe){const ie=document.createElement("button");ie.className="csp-seg-btn",ie.textContent=z.label,ie.addEventListener("click",()=>ft({shapeType:z.id})),Oe.appendChild(ie),Ye.set(z.id,ie)}J.appendChild(Oe);const Ke=document.createElement("span");Ke.className="prop-label",Ke.style.marginTop="6px",Ke.textContent="Modo de relleno",J.appendChild(Ke);const Qe=document.createElement("div");Qe.className="csp-seg-group";const st=[{id:"stroke",label:"Contorno"},{id:"fill",label:"Relleno"}],Ct=new Map;for(const z of st){const ie=document.createElement("button");ie.className="csp-seg-btn",ie.textContent=z.label,ie.addEventListener("click",()=>ft({shapeFill:z.id})),Qe.appendChild(ie),Ct.set(z.id,ie)}J.appendChild(Qe),X.appendChild(J);const St=document.createElement("div");St.className="prop-row-box bone-only",St.style.display="none",St.style.flexDirection="column",St.style.gap="6px";const Rt=document.createElement("span");Rt.className="prop-label",Rt.textContent="Modo de Esqueleto 2D",St.appendChild(Rt);const Et=de([{id:"rig",label:"Rig / Crear"},{id:"pose_fk",label:"Posar FK"},{id:"pose_ik",label:"Posar IK"}],z=>Bg(z));St.appendChild(Et.group);const rt=se("show-bones-check","Mostrar huesos en el lienzo"),bi=document.createElement("div");bi.className="csp-toggle-row",bi.append(rt.box,rt.label),rt.box.addEventListener("change",()=>{zg(rt.box.checked)}),St.appendChild(bi);const yt=se("autokey-bones-check","Auto-Keyframe al posar"),Sn=document.createElement("div");Sn.className="csp-toggle-row",Sn.append(yt.box,yt.label),yt.box.addEventListener("change",()=>{Hg(yt.box.checked)}),St.appendChild(Sn);const Wn=document.createElement("div");Wn.style.display="grid",Wn.style.gridTemplateColumns="1fr 1fr",Wn.style.gap="4px",Wn.style.marginTop="2px";const rn=document.createElement("button");rn.className="csp-seg-btn",rn.style.gridColumn="1 / -1",rn.style.padding="5px 6px",rn.style.color="#fbbf24",rn.style.borderColor="rgba(251, 191, 36, 0.35)",rn.textContent="🧍 + Esqueleto Humanoide (Preset)",rn.title="Generar un rig humanoide completo en el centro del lienzo",rn.addEventListener("click",()=>{var z;(z=e==null?void 0:e.timeline)==null||z.createHumanoidPreset(800,450)});const On=document.createElement("button");On.className="csp-seg-btn",On.style.padding="4px 6px",On.textContent="✦ Fijar Pose",On.title="Registrar Keyframe de pose de esqueleto en el fotograma actual",On.addEventListener("click",()=>{const z=e==null?void 0:e.timeline;z&&z.addOrUpdateBoneKeyframe(z.settings.currentFrame,"smooth")});const At=document.createElement("button");At.className="csp-seg-btn",At.style.padding="4px 6px",At.textContent="↺ Restablecer",At.title="Restablecer la pose a la postura base (Bind Pose) en este fotograma",At.addEventListener("click",()=>{const z=e==null?void 0:e.timeline;z&&z.resetBonePoseAtFrame(z.settings.currentFrame)}),Wn.append(rn,On,At),St.appendChild(Wn);const It=document.createElement("div");It.style.display="flex",It.style.flexDirection="column",It.style.gap="5px",It.style.marginTop="4px",It.style.paddingTop="6px",It.style.borderTop="1px solid rgba(255,255,255,0.08)",St.appendChild(It);const vn=document.createElement("div");vn.style.fontSize="10px",vn.style.lineHeight="1.35",vn.style.color="#9aa0a6",vn.style.marginTop="2px",St.appendChild(vn),X.appendChild(St);const Qt=document.createElement("div");Qt.className="csp-prop-footer";const ri=document.createElement("span");ri.className="csp-prop-visible-count",ri.textContent="Propiedades fijadas";const Mi=document.createElement("button");Mi.className="csp-wrench-btn",Mi.innerHTML="<span>🔧</span><span>Ajustes técnicos...</span>",Mi.title="Abrir Detalle de Subherramienta (Configuración avanzada y fijar propiedades con 👁)",Mi.addEventListener("click",()=>{const z=Kg();z&&nc(z)}),Qt.append(ri,Mi),X.appendChild(Qt),k.appendChild(F.wrap),E.appendChild(k);const ln=document.createElement("div");ln.className="csp-dock-splitter",ln.title="Arrastrar para cambiar el tamaño de Propiedades y Color";let qr=!1,ao=0,oo=270;ln.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),qr=!0,ao=z.clientY,oo=Si.offsetHeight,ln.classList.add("dragging"),ln.setPointerCapture(z.pointerId)}),ln.addEventListener("pointermove",z=>{if(!qr)return;const ie=z.clientY-ao;Yr=Math.max(120,Math.min(500,oo-ie)),Si.style.height=`${Yr}px`,localStorage.setItem("oniri.color.height",String(Yr)),Gi.update(),F.update()});const lo=z=>{if(qr){qr=!1,ln.classList.remove("dragging");try{ln.releasePointerCapture(z.pointerId)}catch{}}};ln.addEventListener("pointerup",lo),ln.addEventListener("pointercancel",lo),E.appendChild(ln);const Si=document.createElement("div");Si.className="dock-section color-section";const co=localStorage.getItem("oniri.color.height");let Yr=co?Math.max(120,Math.min(500,Number(co))):270;Si.style.height=`${Yr}px`;const Ks=document.createElement("div");Ks.className="dock-section-header",Ks.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 0 0 20v-4a6 6 0 0 1 0-12V2z" fill="currentColor"/>
    </svg>
    <span class="color-section-title">Color y Muestras</span>
  `,Si.appendChild(Ks);const Gi=Ua("csp-color-scroll-wrap"),Kr=Gi.list,js=document.createElement("div");js.className="csp-color-tabs";const rd=[{id:"picker",label:"Círculo"},{id:"rgb",label:"RGB"},{id:"set",label:"Conjunto"},{id:"harmony",label:"Armonía"}],uo=new Map;for(const z of rd){const ie=document.createElement("button");ie.className="csp-color-tab-btn",ie.textContent=z.label,ie.addEventListener("click",()=>Wg(z.id)),js.appendChild(ie),uo.set(z.id,ie)}Kr.appendChild(js);const Xn=document.createElement("div");Xn.style.display="flex",Xn.style.flexDirection="column",Xn.style.gap="8px",Kr.appendChild(Xn);const Zs=document.createElement("div");Zs.className="csp-color-picker-row";const si=document.createElement("input");si.type="color",si.className="csp-color-input",si.title="Selector nativo del sistema",si.addEventListener("input",()=>{pt().activeColorSlot==="primary"?yn(si.value):bn(si.value)});const ai=document.createElement("input");ai.type="text",ai.className="csp-hex-input",ai.maxLength=7,ai.placeholder="#000000",ai.addEventListener("change",()=>{let z=ai.value.trim();z.startsWith("#")||(z="#"+z),/^#[0-9a-fA-F]{6}$/.test(z)&&(pt().activeColorSlot==="primary"?yn(z):bn(z))});const yr=document.createElement("span");yr.className="csp-slot-badge",yr.textContent="Principal",Zs.append(si,ai,yr),Kr.appendChild(Zs);const jr=document.createElement("div");jr.className="csp-history-grid",Kr.appendChild(jr),Si.appendChild(Gi.wrap),E.appendChild(Si),n.appendChild(E);const Js=document.createElement("div");Js.className="csp-color-wheel-wrap";const _n=document.createElement("canvas");_n.className="csp-color-wheel-canvas";const Bn=176,Zr=Math.min(2,window.devicePixelRatio||1);_n.width=Math.round(Bn*Zr),_n.height=Math.round(Bn*Zr),Js.appendChild(_n);let br=!1,Mr=!1;const sd=z=>{const ie=_n.getContext("2d");if(!ie)return;ie.setTransform(Zr,0,0,Zr,0,0),ie.clearRect(0,0,Bn,Bn);const Te=Bn/2,Ge=Bn/2,ut=Bn/2-4,ht=ut-18;for(let kt=0;kt<360;kt+=1){const ss=(kt-.5)*Math.PI/180,$n=(kt+1.5)*Math.PI/180;ie.beginPath(),ie.arc(Te,Ge,ut,ss,$n),ie.arc(Te,Ge,ht,$n,ss,!0),ie.closePath(),ie.fillStyle=`hsl(${kt}, 100%, 50%)`,ie.fill()}const{r:Nt,g:Ht,b:$t}=Rn(z),{h:En,s:Tn,v:qt}=Ri(Nt,Ht,$t),Pe=(ht-8)/Math.SQRT2,ge=Te-Pe,Xe=Ge-Pe,Ze=Pe*2,vt=ie.createLinearGradient(ge,0,ge+Ze,0);vt.addColorStop(0,"#ffffff"),vt.addColorStop(1,`hsl(${Math.round(En)}, 100%, 50%)`),ie.fillStyle=vt,ie.fillRect(ge,Xe,Ze,Ze);const _t=ie.createLinearGradient(0,Xe,0,Xe+Ze);_t.addColorStop(0,"rgba(0,0,0,0)"),_t.addColorStop(1,"#000000"),ie.fillStyle=_t,ie.fillRect(ge,Xe,Ze,Ze),ie.strokeStyle="rgba(255,255,255,0.2)",ie.lineWidth=1,ie.strokeRect(ge,Xe,Ze,Ze);const gt=En*Math.PI/180,wn=(ut+ht)/2,Tt=Te+Math.cos(gt)*wn,ct=Ge+Math.sin(gt)*wn;ie.beginPath(),ie.arc(Tt,ct,4.5,0,Math.PI*2),ie.strokeStyle="#ffffff",ie.lineWidth=2,ie.stroke(),ie.beginPath(),ie.arc(Tt,ct,5.5,0,Math.PI*2),ie.strokeStyle="#111111",ie.lineWidth=1,ie.stroke();const Ut=ge+Tn*Ze,sn=Xe+(1-qt)*Ze;ie.beginPath(),ie.arc(Ut,sn,4,0,Math.PI*2),ie.strokeStyle=qt>.5?"#111111":"#ffffff",ie.lineWidth=2,ie.stroke(),ie.beginPath(),ie.arc(Ut,sn,5,0,Math.PI*2),ie.strokeStyle=qt>.5?"#ffffff":"#111111",ie.lineWidth=1,ie.stroke()},po=z=>{const ie=_n.getBoundingClientRect(),Te=z.clientX-ie.left,Ge=z.clientY-ie.top,ut=Bn/2,ht=Bn/2,Nt=Math.hypot(Te-ut,Ge-ht),Ht=Bn/2-4,$t=Ht-18,En=($t-8)/Math.SQRT2,Tn=ut-En,qt=ht-En,Pe=En*2,ge=pt(),Xe=ge.activeColorSlot==="primary"?ge.primaryColor:ge.secondaryColor,{r:Ze,g:vt,b:_t}=Rn(Xe);let{h:gt,s:wn,v:Tt}=Ri(Ze,vt,_t);br||!Mr&&Nt>=$t-4&&Nt<=Ht+6?(br=!0,gt=(Math.atan2(Ge-ht,Te-ut)*180/Math.PI+360)%360):(Mr||!br&&Te>=Tn-4&&Te<=Tn+Pe+4&&Ge>=qt-4&&Ge<=qt+Pe+4)&&(Mr=!0,wn=Math.max(0,Math.min(1,(Te-Tn)/Pe)),Tt=Math.max(0,Math.min(1,1-(Ge-qt)/Pe)));const ct=Xt(gt,wn,Tt);ge.activeColorSlot==="primary"?yn(ct):bn(ct)};_n.addEventListener("pointerdown",z=>{_n.setPointerCapture(z.pointerId),po(z)}),_n.addEventListener("pointermove",z=>{(br||Mr)&&po(z)});const fo=z=>{br=!1,Mr=!1;try{_n.releasePointerCapture(z.pointerId)}catch{}};_n.addEventListener("pointerup",fo),_n.addEventListener("pointercancel",fo);const Qs=document.createElement("div");Qs.className="csp-rgb-sliders-wrap";function Vi(z,ie,Te,Ge){const ut=document.createElement("div");ut.className="csp-channel-row";const ht=document.createElement("span");ht.className="csp-channel-tag",ht.textContent=z;const Nt=document.createElement("input");Nt.type="range",Nt.className="csp-channel-slider",Nt.min=String(ie),Nt.max=String(Te);const Ht=document.createElement("input");return Ht.type="number",Ht.className="csp-channel-num",Ht.min=String(ie),Ht.max=String(Te),Nt.addEventListener("input",()=>{const $t=Number(Nt.value);Ht.value=String($t),Ge($t)}),Ht.addEventListener("change",()=>{let $t=Number(Ht.value);$t=Math.max(ie,Math.min(Te,$t)),Nt.value=String($t),Ge($t)}),ut.append(ht,Nt,Ht),{row:ut,slider:Nt,numInput:Ht}}const Jr=Vi("R",0,255,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),Ge=Is(z,Te.g,Te.b);ie.activeColorSlot==="primary"?yn(Ge):bn(Ge)}),Qr=Vi("G",0,255,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),Ge=Is(Te.r,z,Te.b);ie.activeColorSlot==="primary"?yn(Ge):bn(Ge)}),es=Vi("B",0,255,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),Ge=Is(Te.r,Te.g,z);ie.activeColorSlot==="primary"?yn(Ge):bn(Ge)}),ts=Vi("H",0,360,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),{s:Ge,v:ut}=Ri(Te.r,Te.g,Te.b),ht=Xt(z,Ge,ut);ie.activeColorSlot==="primary"?yn(ht):bn(ht)}),ns=Vi("S",0,100,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),{h:Ge,v:ut}=Ri(Te.r,Te.g,Te.b),ht=Xt(Ge,z/100,ut);ie.activeColorSlot==="primary"?yn(ht):bn(ht)}),is=Vi("V",0,100,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),{h:Ge,s:ut}=Ri(Te.r,Te.g,Te.b),ht=Xt(Ge,ut,z/100);ie.activeColorSlot==="primary"?yn(ht):bn(ht)});ts.slider.style.background="linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",Qs.append(Jr.row,Qr.row,es.row,document.createElement("div"),ts.row,ns.row,is.row);const Wi=document.createElement("div");Wi.style.display="flex",Wi.style.flexDirection="column",Wi.style.gap="6px";const ea=document.createElement("div");ea.className="csp-colorset-toolbar";const Xi=document.createElement("select");Xi.className="csp-colorset-select",Xi.addEventListener("change",()=>{Xg(Xi.value)});const Sr=document.createElement("button");Sr.className="csp-subtool-action-btn",Sr.textContent="+ Guardar",Sr.title="Añadir color actual a este conjunto",Sr.addEventListener("click",()=>{const z=pt(),ie=z.activeColorSlot==="primary"?z.primaryColor:z.secondaryColor;$g(ie)}),ea.append(Xi,Sr),Wi.appendChild(ea);const Er=document.createElement("div");Er.className="csp-history-grid",Er.style.gridTemplateColumns="repeat(8, 1fr)",Wi.appendChild(Er);const rs=document.createElement("div");rs.className="csp-harmony-list";const ta=z=>{for(const[Pe,ge]of i)ge.classList.toggle("active",z.tool===Pe);E.classList.toggle("open",z.propertiesOpen),M.classList.toggle("active",z.propertiesOpen),M.innerHTML=z.propertiesOpen?'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',document.documentElement.style.setProperty("--left-dock-width",z.propertiesOpen?`${p+48}px`:"48px"),f.style.background=z.primaryColor,d.style.background=z.secondaryColor,f.classList.toggle("active-slot",z.activeColorSlot==="primary"&&!z.isTransparentColor),d.classList.toggle("active-slot",z.activeColorSlot==="secondary"&&!z.isTransparentColor),x.classList.toggle("active",z.isTransparentColor);const ie=Yg(z.tool),Te=ie.find(Pe=>Pe.id===z.activeSubToolId);N.list.innerHTML="";for(const Pe of ie){const ge=document.createElement("div");ge.className="csp-subtool-item",ge.classList.toggle("active",Pe.id===z.activeSubToolId),ge.classList.toggle("custom",!!Pe.custom);const Xe=document.createElement("span");Xe.className="csp-subtool-dot",ge.appendChild(Xe);const Ze=document.createElement("span");if(Ze.className="csp-subtool-name",Ze.textContent=Pe.name,ge.appendChild(Ze),Pe.settings.size!==void 0){const _t=document.createElement("span");_t.className="csp-subtool-size-badge",_t.textContent=`${Math.round(Pe.settings.size)}`,ge.appendChild(_t)}const vt=document.createElement("button");vt.className="csp-subtool-gear-btn",vt.title=`Detalle de subherramienta (${Pe.name})`,vt.textContent="🔧",vt.addEventListener("click",_t=>{_t.stopPropagation(),nc(Pe)}),ge.appendChild(vt),ge.title=Pe.description,ge.addEventListener("click",()=>{$l(Pe.id)}),N.list.appendChild(ge)}requestAnimationFrame(()=>{N.update(),F.update(),Gi.update()}),H.disabled=!Te,P.disabled=!Te||!Te.custom;const Ge=z.tool==="bone",ut=z.tool==="pen"||z.tool==="brush"||z.tool==="eraser";be.style.display=ut?"block":"none";for(const[Pe,ge]of W)if(ut){const Xe=z.visibleProperties.includes(Pe);ge.style.display=Xe?"block":"none"}else ge.style.display="none";ri.textContent=ut?`👁 ${z.visibleProperties.length} propiedades fijadas`:`${ie.length} subherramientas`,ut&&ee(),le.value=String(Math.round(z.brush.size));const ht=X.querySelector("#size-val");ht&&(ht.textContent=`${Math.round(z.brush.size)} px`),Fe.querySelectorAll(".csp-quick-size-btn").forEach(Pe=>{Pe.classList.toggle("active",Number(Pe.textContent)===Math.round(z.brush.size))}),Ue.value=String(Math.round(z.brush.opacity*100));const Nt=X.querySelector("#opacity-val");Nt&&(Nt.textContent=`${Math.round(z.brush.opacity*100)}%`),ot.value=String(Math.round(z.brush.flow*100));const Ht=X.querySelector("#flow-val");Ht&&(Ht.textContent=`${Math.round(z.brush.flow*100)}%`),tt.box.checked=z.brush.pressureFlow;const $t=X.querySelector("#hardness-val");$t&&($t.textContent=`${Math.round(z.brush.hardness*100)}%`),He.forEach((Pe,ge)=>{const Xe=Se[ge];Pe.classList.toggle("active",Math.abs(z.brush.hardness-Xe.val)<.12)}),O.value=String(Math.round(z.brush.stabilization));const En=X.querySelector("#stab-val");En&&(En.textContent=String(Math.round(z.brush.stabilization))),Ee.box.checked=z.brush.pressureSize,$e.value=String(Math.round(z.brush.minSizeRatio*100)),$e.disabled=!z.brush.pressureSize,ve.value.textContent=`${Math.round(z.brush.minSizeRatio*100)}%`,pe.value=String(Math.round(z.brush.taperStart)),mt.value.textContent=`${Math.round(z.brush.taperStart)} px`,ye.value=String(Math.round(z.brush.taperEnd)),Le.value.textContent=`${Math.round(z.brush.taperEnd)} px`;for(const[Pe,ge]of ke.buttons)ge.classList.toggle("active",z.brush.tipShape===Pe);for(const[Pe,ge]of Lt.buttons)ge.classList.toggle("active",z.brush.antiAliasing===Pe);nn.value=String(Math.round(z.brush.tipRoundness*100)),zt.value.textContent=`${Math.round(z.brush.tipRoundness*100)}%`,L.value=String(Math.round(z.brush.tipAngle)),yi.value.textContent=`${Math.round(z.brush.tipAngle)}°`,Y.style.display=z.tool==="bucket"?"block":"none",ne.value=String(Math.round(z.brush.tolerance));const Tn=X.querySelector("#tol-val");Tn&&(Tn.textContent=`${Math.round(z.brush.tolerance)}%`),J.style.display=z.tool==="shape"?"block":"none";for(const[Pe,ge]of Ye)ge.classList.toggle("active",z.brush.shapeType===Pe);for(const[Pe,ge]of Ct)ge.classList.toggle("active",z.brush.shapeFill===Pe);if(St.style.display=Ge?"flex":"none",Ge){for(const[ge,Xe]of Et.buttons)Xe.classList.toggle("active",z.boneMode===ge);rt.box.checked=z.showBonesOverlay,yt.box.checked=z.autoKeyBones,z.boneMode==="rig"?vn.textContent="Rig: Clic y arrastra en vacío para crear hueso. Arrastra la punta/base para editar. Shift+clic en punta encadena hijo; Alt+clic crea raíz.":z.boneMode==="pose_fk"?vn.textContent="Posar FK: Arrastra el cuerpo de un hueso para rotarlo. Arrastra la base raíz (o Shift+arrastrar) para trasladar.":vn.textContent="Posar IK: Haz clic y arrastra el hueso extremo (mano, antebrazo, pie) para doblar la cadena de 2 huesos automáticamente.",It.innerHTML="";const Pe=e==null?void 0:e.timeline;if(Pe){const ge=Pe.bones.find(Xe=>Xe.id===Pe.selectedBoneId)??null;if(ge){const Xe=document.createElement("div");Xe.className="prop-row-header",Xe.innerHTML=`<span class="prop-label">Hueso activo</span><span class="prop-value" style="color:${ge.color}">${ge.name}</span>`,It.appendChild(Xe);const Ze=document.createElement("input");Ze.type="text",Ze.className="csp-hex-input",Ze.style.width="100%",Ze.value=ge.name,Ze.title="Nombre del hueso",Ze.addEventListener("change",()=>{Ze.value.trim()&&Pe.renameBone(ge.id,Ze.value.trim())}),It.appendChild(Ze);const vt=document.createElement("div");vt.style.display="flex",vt.style.alignItems="center",vt.style.gap="4px";const _t=document.createElement("span");_t.className="prop-label",_t.textContent="Padre:";const gt=document.createElement("select");gt.style.flex="1",gt.style.background="#1e1e1e",gt.style.color="#e0e0e0",gt.style.border="1px solid #3c3c3c",gt.style.borderRadius="3px",gt.style.fontSize="11px",gt.style.padding="2px 4px";const wn=document.createElement("option");wn.value="",wn.textContent="(Raíz / Ninguno)",gt.appendChild(wn);for(const sn of Pe.bones){if(sn.id===ge.id)continue;const kt=document.createElement("option");kt.value=sn.id,kt.textContent=sn.name,sn.id===ge.parentId&&(kt.selected=!0),gt.appendChild(kt)}gt.addEventListener("change",()=>{Pe.setBoneParent(ge.id,gt.value||null)}),vt.append(_t,gt),It.appendChild(vt);const Tt=document.createElement("div");Tt.style.display="flex",Tt.style.gap="4px";const ct=document.createElement("button");ct.className="csp-seg-btn",ct.style.flex="1",ct.textContent=`⇄ Codo IK (${ge.ikBendPositive?"+":"-"})`,ct.title="Invertir la dirección de flexión del codo/rodilla en Cinemática Inversa",ct.addEventListener("click",()=>{Pe.toggleBoneIKBend(ge.id)});const Ut=document.createElement("button");Ut.className="csp-seg-btn",Ut.style.color="#f87171",Ut.textContent="🗑 Eliminar",Ut.title="Eliminar este hueso",Ut.addEventListener("click",()=>{Pe.deleteBone(ge.id)}),Tt.append(ct,Ut),It.appendChild(Tt)}else{const Xe=document.createElement("span");Xe.className="prop-label",Xe.style.color="#80868b",Xe.textContent=`Huesos en escena: ${Pe.bones.length} (Haz clic en un hueso para inspeccionarlo)`,It.appendChild(Xe)}}}const qt=z.activeColorSlot==="primary"?z.primaryColor:z.secondaryColor;si.value=qt,ai.value=qt.toUpperCase(),yr.textContent=z.activeColorSlot==="primary"?"Principal":"Secundario",z.isTransparentColor&&(yr.textContent="Transparente");for(const[Pe,ge]of uo)ge.classList.toggle("active",z.colorTab===Pe);if(Xn.innerHTML="",z.colorTab==="picker")Xn.appendChild(Js),sd(qt);else if(z.colorTab==="rgb"){Xn.appendChild(Qs);const{r:Pe,g:ge,b:Xe}=Rn(qt),{h:Ze,s:vt,v:_t}=Ri(Pe,ge,Xe);Jr.slider.value=String(Pe),Jr.numInput.value=String(Pe),Jr.slider.style.background=`linear-gradient(90deg, rgb(0,${ge},${Xe}), rgb(255,${ge},${Xe}))`,Qr.slider.value=String(ge),Qr.numInput.value=String(ge),Qr.slider.style.background=`linear-gradient(90deg, rgb(${Pe},0,${Xe}), rgb(${Pe},255,${Xe}))`,es.slider.value=String(Xe),es.numInput.value=String(Xe),es.slider.style.background=`linear-gradient(90deg, rgb(${Pe},${ge},0), rgb(${Pe},${ge},255))`,ts.slider.value=String(Math.round(Ze)),ts.numInput.value=String(Math.round(Ze)),ns.slider.value=String(Math.round(vt*100)),ns.numInput.value=String(Math.round(vt*100)),ns.slider.style.background=`linear-gradient(90deg, ${Xt(Ze,0,_t)}, ${Xt(Ze,1,_t)})`,is.slider.value=String(Math.round(_t*100)),is.numInput.value=String(Math.round(_t*100)),is.slider.style.background=`linear-gradient(90deg, #000000, ${Xt(Ze,vt,1)})`}else if(z.colorTab==="set"){Xn.appendChild(Wi),Xi.innerHTML="";for(const ge of z.colorSets){const Xe=document.createElement("option");Xe.value=ge.id,Xe.textContent=`${ge.name} (${ge.colors.length})`,ge.id===z.activeColorSetId&&(Xe.selected=!0),Xi.appendChild(Xe)}const Pe=z.colorSets.find(ge=>ge.id===z.activeColorSetId)??z.colorSets[0];Er.innerHTML="",Pe&&Pe.colors.forEach((ge,Xe)=>{const Ze=document.createElement("div");Ze.className="csp-history-chip",Ze.style.backgroundColor=ge,Ze.title=`${ge.toUpperCase()} (Clic para elegir, Shift+clic para borrar)`,Ze.classList.toggle("active",ge.toLowerCase()===qt.toLowerCase()),Ze.addEventListener("click",vt=>{vt.shiftKey?qg(Xe):z.activeColorSlot==="primary"?yn(ge):bn(ge)}),Er.appendChild(Ze)})}else if(z.colorTab==="harmony"){Xn.appendChild(rs),rs.innerHTML="";const Pe=ev(qt);for(const ge of Pe){const Xe=document.createElement("div");Xe.className="csp-harmony-group";const Ze=document.createElement("span");Ze.className="csp-harmony-title",Ze.textContent=ge.label,Xe.appendChild(Ze);const vt=document.createElement("div");vt.className="csp-harmony-swatches";for(const _t of ge.colors){const gt=document.createElement("button");gt.className="csp-harmony-swatch-btn",gt.style.backgroundColor=_t.hex,gt.title=`${_t.tag}: ${_t.hex.toUpperCase()}`,gt.innerHTML=`<span class="csp-harmony-swatch-tag">${_t.tag}</span>`,gt.addEventListener("click",()=>{z.activeColorSlot==="primary"?yn(_t.hex):bn(_t.hex)}),vt.appendChild(gt)}Xe.appendChild(vt),rs.appendChild(Xe)}}jr.innerHTML="";for(const Pe of z.colorHistory){const ge=document.createElement("div");ge.className="csp-history-chip",ge.style.backgroundColor=Pe,ge.title=Pe.toUpperCase(),ge.classList.toggle("active",Pe.toLowerCase()===qt.toLowerCase()),ge.addEventListener("click",()=>{z.activeColorSlot==="primary"?yn(Pe):bn(Pe)}),jr.appendChild(ge)}requestAnimationFrame(()=>{N.update(),F.update(),Gi.update()})};ta(pt()),io(ta),(ho=e==null?void 0:e.timeline)==null||ho.subscribe(()=>{pt().tool==="bone"&&ta(pt())})}const Ev=document.getElementById("viewport")??document.body,ro=document.createElement("canvas");Ev.appendChild(ro);const Ys=new Bc({canvas:ro,antialias:!0,alpha:!0});Ys.setSize(window.innerWidth,window.innerHeight);Ys.setPixelRatio(Math.min(window.devicePixelRatio,2));const so=new mg,pi=new Dc(-1,1,1,-1,.1,100);pi.position.set(0,.6,10);function ed(){const n=window.innerWidth,e=window.innerHeight,t=n/e;Ys.setSize(n,e);const i=11.5,r=19,s=i*t,o=s<r?r/s:1,a=i*o;pi.left=-a*t/2,pi.right=a*t/2,pi.top=a/2,pi.bottom=-a/2,pi.updateProjectionMatrix()}window.addEventListener("resize",ed);ed();const Tv=new Vr(16.08,9.08),wv=new $s({color:526344,side:In}),td=new Hn(Tv,wv);td.position.set(0,0,-.01);so.add(td);const Vn=pv(),vr=Eg(Vn.layerManager);Vn.setTimelineManager(vr);vr.tracks.length===0&&vr.createTrack("Animation 1");const $r=new gg(Vn.compositeCanvas);$r.minFilter=dn;$r.magFilter=dn;$r.generateMipmaps=!1;const Cv=new Vr(16,9),Av=new $s({map:$r,side:In}),nd=new Hn(Cv,Av);so.add(nd);mv({canvas:ro,camera:pi,plane:nd,engine:Vn,docW:Pt,docH:Dt,onPickColor:n=>{ft({color:n})}});const ic=document.getElementById("tools-container");ic&&Sv(ic,{onUndo:()=>Vn.undo(),onRedo:()=>Vn.redo(),timeline:vr});const rc=document.getElementById("layers-container");rc&&yv(rc,Vn.layerManager,vr);const sc=document.getElementById("timeline-container");sc&&wg(sc,vr,Vn.layerManager);function id(){requestAnimationFrame(id),Vn.compositeDirty&&(Vn.updateComposite(),$r.needsUpdate=!0),Ys.render(so,pi)}id();console.log("AnimacionApp: Lateral Toolbar, Layers Panel, Timeline and Brush Engine mounted.");
