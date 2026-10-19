(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ws="160",pl=0,Os=1,ml=2,Eo=1,gl=2,un=3,An=0,It=1,$t=2,yn=0,ui=1,Bs=2,zs=3,ks=4,_l=5,Nn=100,vl=101,xl=102,Hs=103,Gs=104,Ml=200,Sl=201,El=202,yl=203,ps=204,ms=205,bl=206,Tl=207,Al=208,wl=209,Cl=210,Rl=211,Ll=212,Pl=213,Dl=214,Il=0,Ul=1,Nl=2,xr=3,Fl=4,Ol=5,Bl=6,zl=7,yo=0,kl=1,Hl=2,bn=0,Gl=1,Vl=2,Wl=3,Xl=4,ql=5,Yl=6,bo=300,fi=301,pi=302,gs=303,_s=304,wr=306,vs=1e3,Kt=1001,xs=1002,wt=1003,Vs=1004,Ur=1005,Pt=1006,$l=1007,Pi=1008,Tn=1009,Kl=1010,jl=1011,Cs=1012,To=1013,Sn=1014,En=1015,Di=1016,Ao=1017,wo=1018,On=1020,Zl=1021,jt=1023,Jl=1024,Ql=1025,Bn=1026,mi=1027,ec=1028,Co=1029,tc=1030,Ro=1031,Lo=1033,Nr=33776,Fr=33777,Or=33778,Br=33779,Ws=35840,Xs=35841,qs=35842,Ys=35843,Po=36196,$s=37492,Ks=37496,js=37808,Zs=37809,Js=37810,Qs=37811,ea=37812,ta=37813,na=37814,ia=37815,ra=37816,sa=37817,aa=37818,oa=37819,la=37820,ca=37821,zr=36492,da=36494,ua=36495,nc=36283,ha=36284,fa=36285,pa=36286,Do=3e3,zn=3001,ic=3200,rc=3201,sc=0,ac=1,Ht="",xt="srgb",fn="srgb-linear",Rs="display-p3",Cr="display-p3-linear",Mr="linear",rt="srgb",Sr="rec709",Er="p3",Yn=7680,ma=519,oc=512,lc=513,cc=514,Io=515,dc=516,uc=517,hc=518,fc=519,ga=35044,_a="300 es",Ms=1035,hn=2e3,yr=2001;class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kr=Math.PI/180,Ss=180/Math.PI;function Ni(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yt[i&255]+yt[i>>8&255]+yt[i>>16&255]+yt[i>>24&255]+"-"+yt[e&255]+yt[e>>8&255]+"-"+yt[e>>16&15|64]+yt[e>>24&255]+"-"+yt[t&63|128]+yt[t>>8&255]+"-"+yt[t>>16&255]+yt[t>>24&255]+yt[n&255]+yt[n>>8&255]+yt[n>>16&255]+yt[n>>24&255]).toLowerCase()}function Dt(i,e,t){return Math.max(e,Math.min(t,i))}function pc(i,e){return(i%e+e)%e}function Hr(i,e,t){return(1-t)*i+t*e}function va(i){return(i&i-1)===0&&i!==0}function Es(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class je{constructor(e=0,t=0){je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,r,s,o,a,c,u){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,u)}set(e,t,n,r,s,o,a,c,u){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],u=n[1],h=n[4],m=n[7],f=n[2],p=n[5],_=n[8],g=r[0],d=r[3],l=r[6],M=r[1],S=r[4],b=r[7],R=r[2],w=r[5],A=r[8];return s[0]=o*g+a*M+c*R,s[3]=o*d+a*S+c*w,s[6]=o*l+a*b+c*A,s[1]=u*g+h*M+m*R,s[4]=u*d+h*S+m*w,s[7]=u*l+h*b+m*A,s[2]=f*g+p*M+_*R,s[5]=f*d+p*S+_*w,s[8]=f*l+p*b+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],u=e[7],h=e[8];return t*o*h-t*a*u-n*s*h+n*a*c+r*s*u-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],u=e[7],h=e[8],m=h*o-a*u,f=a*c-h*s,p=u*s-o*c,_=t*m+n*f+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=m*g,e[1]=(r*u-h*n)*g,e[2]=(a*n-r*o)*g,e[3]=f*g,e[4]=(h*t-r*c)*g,e[5]=(r*s-a*t)*g,e[6]=p*g,e[7]=(n*c-u*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),u=Math.sin(s);return this.set(n*c,n*u,-n*(c*o+u*a)+o+e,-r*u,r*c,-r*(-u*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Gr.makeScale(e,t)),this}rotate(e){return this.premultiply(Gr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Gr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Gr=new Ve;function Uo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mc(){const i=br("canvas");return i.style.display="block",i}const xa={};function Li(i){i in xa||(xa[i]=!0,console.warn(i))}const Ma=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Sa=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qi={[fn]:{transfer:Mr,primaries:Sr,toReference:i=>i,fromReference:i=>i},[xt]:{transfer:rt,primaries:Sr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Cr]:{transfer:Mr,primaries:Er,toReference:i=>i.applyMatrix3(Sa),fromReference:i=>i.applyMatrix3(Ma)},[Rs]:{transfer:rt,primaries:Er,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Sa),fromReference:i=>i.applyMatrix3(Ma).convertLinearToSRGB()}},gc=new Set([fn,Cr]),Je={enabled:!0,_workingColorSpace:fn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!gc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=qi[e].toReference,r=qi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return qi[i].primaries},getTransfer:function(i){return i===Ht?Mr:qi[i].transfer}};function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Vr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let $n;class No{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{$n===void 0&&($n=br("canvas")),$n.width=e.width,$n.height=e.height;const n=$n.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=$n}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=hi(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(hi(t[n]/255)*255):t[n]=hi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _c=0;class Fo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_c++}),this.uuid=Ni(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Wr(r[o].image)):s.push(Wr(r[o]))}else s=Wr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Wr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?No.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vc=0;class Ut extends _i{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=Kt,r=Kt,s=Pt,o=Pi,a=jt,c=Tn,u=Ut.DEFAULT_ANISOTROPY,h=Ht){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vc++}),this.uuid=Ni(),this.name="",this.source=new Fo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=c,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Li("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===zn?xt:Ht),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vs:e.x=e.x-Math.floor(e.x);break;case Kt:e.x=e.x<0?0:1;break;case xs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vs:e.y=e.y-Math.floor(e.y);break;case Kt:e.y=e.y<0?0:1;break;case xs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Li("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===xt?zn:Do}set encoding(e){Li("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===zn?xt:Ht}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=bo;Ut.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,n=0,r=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,u=c[0],h=c[4],m=c[8],f=c[1],p=c[5],_=c[9],g=c[2],d=c[6],l=c[10];if(Math.abs(h-f)<.01&&Math.abs(m-g)<.01&&Math.abs(_-d)<.01){if(Math.abs(h+f)<.1&&Math.abs(m+g)<.1&&Math.abs(_+d)<.1&&Math.abs(u+p+l-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(u+1)/2,b=(p+1)/2,R=(l+1)/2,w=(h+f)/4,A=(m+g)/4,z=(_+d)/4;return S>b&&S>R?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=w/n,s=A/n):b>R?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=w/r,s=z/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=A/s,r=z/s),this.set(n,r,s,t),this}let M=Math.sqrt((d-_)*(d-_)+(m-g)*(m-g)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(d-_)/M,this.y=(m-g)/M,this.z=(f-h)/M,this.w=Math.acos((u+p+l-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xc extends _i{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Li("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===zn?xt:Ht),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ut(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hn extends xc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Oo extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mc extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],u=n[r+1],h=n[r+2],m=n[r+3];const f=s[o+0],p=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=c,e[t+1]=u,e[t+2]=h,e[t+3]=m;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=_,e[t+3]=g;return}if(m!==g||c!==f||u!==p||h!==_){let d=1-a;const l=c*f+u*p+h*_+m*g,M=l>=0?1:-1,S=1-l*l;if(S>Number.EPSILON){const R=Math.sqrt(S),w=Math.atan2(R,l*M);d=Math.sin(d*w)/R,a=Math.sin(a*w)/R}const b=a*M;if(c=c*d+f*b,u=u*d+p*b,h=h*d+_*b,m=m*d+g*b,d===1-a){const R=1/Math.sqrt(c*c+u*u+h*h+m*m);c*=R,u*=R,h*=R,m*=R}}e[t]=c,e[t+1]=u,e[t+2]=h,e[t+3]=m}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],u=n[r+2],h=n[r+3],m=s[o],f=s[o+1],p=s[o+2],_=s[o+3];return e[t]=a*_+h*m+c*p-u*f,e[t+1]=c*_+h*f+u*m-a*p,e[t+2]=u*_+h*p+a*f-c*m,e[t+3]=h*_-a*m-c*f-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,u=a(n/2),h=a(r/2),m=a(s/2),f=c(n/2),p=c(r/2),_=c(s/2);switch(o){case"XYZ":this._x=f*h*m+u*p*_,this._y=u*p*m-f*h*_,this._z=u*h*_+f*p*m,this._w=u*h*m-f*p*_;break;case"YXZ":this._x=f*h*m+u*p*_,this._y=u*p*m-f*h*_,this._z=u*h*_-f*p*m,this._w=u*h*m+f*p*_;break;case"ZXY":this._x=f*h*m-u*p*_,this._y=u*p*m+f*h*_,this._z=u*h*_+f*p*m,this._w=u*h*m-f*p*_;break;case"ZYX":this._x=f*h*m-u*p*_,this._y=u*p*m+f*h*_,this._z=u*h*_-f*p*m,this._w=u*h*m+f*p*_;break;case"YZX":this._x=f*h*m+u*p*_,this._y=u*p*m+f*h*_,this._z=u*h*_-f*p*m,this._w=u*h*m-f*p*_;break;case"XZY":this._x=f*h*m-u*p*_,this._y=u*p*m-f*h*_,this._z=u*h*_+f*p*m,this._w=u*h*m+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],u=t[2],h=t[6],m=t[10],f=n+a+m;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(n>a&&n>m){const p=2*Math.sqrt(1+n-a-m);this._w=(h-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>m){const p=2*Math.sqrt(1+a-n-m);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+m-n-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,u=t._z,h=t._w;return this._x=n*h+o*a+r*u-s*c,this._y=r*h+o*c+s*a-n*u,this._z=s*h+o*u+n*c-r*a,this._w=o*h-n*a-r*c-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const u=Math.sqrt(c),h=Math.atan2(u,a),m=Math.sin((1-t)*h)/u,f=Math.sin(t*h)/u;return this._w=o*m+this._w*f,this._x=n*m+this._x*f,this._y=r*m+this._y*f,this._z=s*m+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,t=0,n=0){K.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ea.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ea.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,u=2*(o*r-a*n),h=2*(a*t-s*r),m=2*(s*n-o*t);return this.x=t+c*u+o*m-a*h,this.y=n+c*h+a*u-s*m,this.z=r+c*m+s*h-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xr.copy(this).projectOnVector(e),this.sub(Xr)}reflect(e){return this.sub(Xr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xr=new K,Ea=new Fi;class Oi{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Vt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vt):Vt.fromBufferAttribute(s,o),Vt.applyMatrix4(e.matrixWorld),this.expandByPoint(Vt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yi.copy(n.boundingBox)),Yi.applyMatrix4(e.matrixWorld),this.union(Yi)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Vt),Vt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),$i.subVectors(this.max,bi),Kn.subVectors(e.a,bi),jn.subVectors(e.b,bi),Zn.subVectors(e.c,bi),pn.subVectors(jn,Kn),mn.subVectors(Zn,jn),Rn.subVectors(Kn,Zn);let t=[0,-pn.z,pn.y,0,-mn.z,mn.y,0,-Rn.z,Rn.y,pn.z,0,-pn.x,mn.z,0,-mn.x,Rn.z,0,-Rn.x,-pn.y,pn.x,0,-mn.y,mn.x,0,-Rn.y,Rn.x,0];return!qr(t,Kn,jn,Zn,$i)||(t=[1,0,0,0,1,0,0,0,1],!qr(t,Kn,jn,Zn,$i))?!1:(Ki.crossVectors(pn,mn),t=[Ki.x,Ki.y,Ki.z],qr(t,Kn,jn,Zn,$i))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(an),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const an=[new K,new K,new K,new K,new K,new K,new K,new K],Vt=new K,Yi=new Oi,Kn=new K,jn=new K,Zn=new K,pn=new K,mn=new K,Rn=new K,bi=new K,$i=new K,Ki=new K,Ln=new K;function qr(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ln.fromArray(i,s);const a=r.x*Math.abs(Ln.x)+r.y*Math.abs(Ln.y)+r.z*Math.abs(Ln.z),c=e.dot(Ln),u=t.dot(Ln),h=n.dot(Ln);if(Math.max(-Math.max(c,u,h),Math.min(c,u,h))>a)return!1}return!0}const Sc=new Oi,Ti=new K,Yr=new K;class Ls{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Sc.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ti.subVectors(e,this.center);const t=Ti.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ti,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ti.copy(e.center).add(Yr)),this.expandByPoint(Ti.copy(e.center).sub(Yr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new K,$r=new K,ji=new K,gn=new K,Kr=new K,Zi=new K,jr=new K;class Bo{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,on)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=on.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(on.copy(this.origin).addScaledVector(this.direction,t),on.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){$r.copy(e).add(t).multiplyScalar(.5),ji.copy(t).sub(e).normalize(),gn.copy(this.origin).sub($r);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ji),a=gn.dot(this.direction),c=-gn.dot(ji),u=gn.lengthSq(),h=Math.abs(1-o*o);let m,f,p,_;if(h>0)if(m=o*c-a,f=o*a-c,_=s*h,m>=0)if(f>=-_)if(f<=_){const g=1/h;m*=g,f*=g,p=m*(m+o*f+2*a)+f*(o*m+f+2*c)+u}else f=s,m=Math.max(0,-(o*f+a)),p=-m*m+f*(f+2*c)+u;else f=-s,m=Math.max(0,-(o*f+a)),p=-m*m+f*(f+2*c)+u;else f<=-_?(m=Math.max(0,-(-o*s+a)),f=m>0?-s:Math.min(Math.max(-s,-c),s),p=-m*m+f*(f+2*c)+u):f<=_?(m=0,f=Math.min(Math.max(-s,-c),s),p=f*(f+2*c)+u):(m=Math.max(0,-(o*s+a)),f=m>0?s:Math.min(Math.max(-s,-c),s),p=-m*m+f*(f+2*c)+u);else f=o>0?-s:s,m=Math.max(0,-(o*f+a)),p=-m*m+f*(f+2*c)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,m),r&&r.copy($r).addScaledVector(ji,f),p}intersectSphere(e,t){on.subVectors(e.center,this.origin);const n=on.dot(this.direction),r=on.dot(on)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const u=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,f=this.origin;return u>=0?(n=(e.min.x-f.x)*u,r=(e.max.x-f.x)*u):(n=(e.max.x-f.x)*u,r=(e.min.x-f.x)*u),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),m>=0?(a=(e.min.z-f.z)*m,c=(e.max.z-f.z)*m):(a=(e.max.z-f.z)*m,c=(e.min.z-f.z)*m),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,on)!==null}intersectTriangle(e,t,n,r,s){Kr.subVectors(t,e),Zi.subVectors(n,e),jr.crossVectors(Kr,Zi);let o=this.direction.dot(jr),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gn.subVectors(this.origin,e);const c=a*this.direction.dot(Zi.crossVectors(gn,Zi));if(c<0)return null;const u=a*this.direction.dot(Kr.cross(gn));if(u<0||c+u>o)return null;const h=-a*gn.dot(jr);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class St{constructor(e,t,n,r,s,o,a,c,u,h,m,f,p,_,g,d){St.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,u,h,m,f,p,_,g,d)}set(e,t,n,r,s,o,a,c,u,h,m,f,p,_,g,d){const l=this.elements;return l[0]=e,l[4]=t,l[8]=n,l[12]=r,l[1]=s,l[5]=o,l[9]=a,l[13]=c,l[2]=u,l[6]=h,l[10]=m,l[14]=f,l[3]=p,l[7]=_,l[11]=g,l[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Jn.setFromMatrixColumn(e,0).length(),s=1/Jn.setFromMatrixColumn(e,1).length(),o=1/Jn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),u=Math.sin(r),h=Math.cos(s),m=Math.sin(s);if(e.order==="XYZ"){const f=o*h,p=o*m,_=a*h,g=a*m;t[0]=c*h,t[4]=-c*m,t[8]=u,t[1]=p+_*u,t[5]=f-g*u,t[9]=-a*c,t[2]=g-f*u,t[6]=_+p*u,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,p=c*m,_=u*h,g=u*m;t[0]=f+g*a,t[4]=_*a-p,t[8]=o*u,t[1]=o*m,t[5]=o*h,t[9]=-a,t[2]=p*a-_,t[6]=g+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,p=c*m,_=u*h,g=u*m;t[0]=f-g*a,t[4]=-o*m,t[8]=_+p*a,t[1]=p+_*a,t[5]=o*h,t[9]=g-f*a,t[2]=-o*u,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,p=o*m,_=a*h,g=a*m;t[0]=c*h,t[4]=_*u-p,t[8]=f*u+g,t[1]=c*m,t[5]=g*u+f,t[9]=p*u-_,t[2]=-u,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,p=o*u,_=a*c,g=a*u;t[0]=c*h,t[4]=g-f*m,t[8]=_*m+p,t[1]=m,t[5]=o*h,t[9]=-a*h,t[2]=-u*h,t[6]=p*m+_,t[10]=f-g*m}else if(e.order==="XZY"){const f=o*c,p=o*u,_=a*c,g=a*u;t[0]=c*h,t[4]=-m,t[8]=u*h,t[1]=f*m+g,t[5]=o*h,t[9]=p*m-_,t[2]=_*m-p,t[6]=a*h,t[10]=g*m+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ec,e,yc)}lookAt(e,t,n){const r=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),_n.crossVectors(n,Ot),_n.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),_n.crossVectors(n,Ot)),_n.normalize(),Ji.crossVectors(Ot,_n),r[0]=_n.x,r[4]=Ji.x,r[8]=Ot.x,r[1]=_n.y,r[5]=Ji.y,r[9]=Ot.y,r[2]=_n.z,r[6]=Ji.z,r[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],u=n[12],h=n[1],m=n[5],f=n[9],p=n[13],_=n[2],g=n[6],d=n[10],l=n[14],M=n[3],S=n[7],b=n[11],R=n[15],w=r[0],A=r[4],z=r[8],E=r[12],x=r[1],H=r[5],G=r[9],te=r[13],L=r[2],C=r[6],U=r[10],B=r[14],V=r[3],Y=r[7],j=r[11],ee=r[15];return s[0]=o*w+a*x+c*L+u*V,s[4]=o*A+a*H+c*C+u*Y,s[8]=o*z+a*G+c*U+u*j,s[12]=o*E+a*te+c*B+u*ee,s[1]=h*w+m*x+f*L+p*V,s[5]=h*A+m*H+f*C+p*Y,s[9]=h*z+m*G+f*U+p*j,s[13]=h*E+m*te+f*B+p*ee,s[2]=_*w+g*x+d*L+l*V,s[6]=_*A+g*H+d*C+l*Y,s[10]=_*z+g*G+d*U+l*j,s[14]=_*E+g*te+d*B+l*ee,s[3]=M*w+S*x+b*L+R*V,s[7]=M*A+S*H+b*C+R*Y,s[11]=M*z+S*G+b*U+R*j,s[15]=M*E+S*te+b*B+R*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],u=e[13],h=e[2],m=e[6],f=e[10],p=e[14],_=e[3],g=e[7],d=e[11],l=e[15];return _*(+s*c*m-r*u*m-s*a*f+n*u*f+r*a*p-n*c*p)+g*(+t*c*p-t*u*f+s*o*f-r*o*p+r*u*h-s*c*h)+d*(+t*u*m-t*a*p-s*o*m+n*o*p+s*a*h-n*u*h)+l*(-r*a*h-t*c*m+t*a*f+r*o*m-n*o*f+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],u=e[7],h=e[8],m=e[9],f=e[10],p=e[11],_=e[12],g=e[13],d=e[14],l=e[15],M=m*d*u-g*f*u+g*c*p-a*d*p-m*c*l+a*f*l,S=_*f*u-h*d*u-_*c*p+o*d*p+h*c*l-o*f*l,b=h*g*u-_*m*u+_*a*p-o*g*p-h*a*l+o*m*l,R=_*m*c-h*g*c-_*a*f+o*g*f+h*a*d-o*m*d,w=t*M+n*S+r*b+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=M*A,e[1]=(g*f*s-m*d*s-g*r*p+n*d*p+m*r*l-n*f*l)*A,e[2]=(a*d*s-g*c*s+g*r*u-n*d*u-a*r*l+n*c*l)*A,e[3]=(m*c*s-a*f*s-m*r*u+n*f*u+a*r*p-n*c*p)*A,e[4]=S*A,e[5]=(h*d*s-_*f*s+_*r*p-t*d*p-h*r*l+t*f*l)*A,e[6]=(_*c*s-o*d*s-_*r*u+t*d*u+o*r*l-t*c*l)*A,e[7]=(o*f*s-h*c*s+h*r*u-t*f*u-o*r*p+t*c*p)*A,e[8]=b*A,e[9]=(_*m*s-h*g*s-_*n*p+t*g*p+h*n*l-t*m*l)*A,e[10]=(o*g*s-_*a*s+_*n*u-t*g*u-o*n*l+t*a*l)*A,e[11]=(h*a*s-o*m*s-h*n*u+t*m*u+o*n*p-t*a*p)*A,e[12]=R*A,e[13]=(h*g*r-_*m*r+_*n*f-t*g*f-h*n*d+t*m*d)*A,e[14]=(_*a*r-o*g*r-_*n*c+t*g*c+o*n*d-t*a*d)*A,e[15]=(o*m*r-h*a*r+h*n*c-t*m*c-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,u=s*o,h=s*a;return this.set(u*o+n,u*a-r*c,u*c+r*a,0,u*a+r*c,h*a+n,h*c-r*o,0,u*c-r*a,h*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,u=s+s,h=o+o,m=a+a,f=s*u,p=s*h,_=s*m,g=o*h,d=o*m,l=a*m,M=c*u,S=c*h,b=c*m,R=n.x,w=n.y,A=n.z;return r[0]=(1-(g+l))*R,r[1]=(p+b)*R,r[2]=(_-S)*R,r[3]=0,r[4]=(p-b)*w,r[5]=(1-(f+l))*w,r[6]=(d+M)*w,r[7]=0,r[8]=(_+S)*A,r[9]=(d-M)*A,r[10]=(1-(f+g))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Jn.set(r[0],r[1],r[2]).length();const o=Jn.set(r[4],r[5],r[6]).length(),a=Jn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Wt.copy(this);const u=1/s,h=1/o,m=1/a;return Wt.elements[0]*=u,Wt.elements[1]*=u,Wt.elements[2]*=u,Wt.elements[4]*=h,Wt.elements[5]*=h,Wt.elements[6]*=h,Wt.elements[8]*=m,Wt.elements[9]*=m,Wt.elements[10]*=m,t.setFromRotationMatrix(Wt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=hn){const c=this.elements,u=2*s/(t-e),h=2*s/(n-r),m=(t+e)/(t-e),f=(n+r)/(n-r);let p,_;if(a===hn)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===yr)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=m,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=hn){const c=this.elements,u=1/(t-e),h=1/(n-r),m=1/(o-s),f=(t+e)*u,p=(n+r)*h;let _,g;if(a===hn)_=(o+s)*m,g=-2*m;else if(a===yr)_=s*m,g=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Jn=new K,Wt=new St,Ec=new K(0,0,0),yc=new K(1,1,1),_n=new K,Ji=new K,Ot=new K,ya=new St,ba=new Fi;class Rr{constructor(e=0,t=0,n=0,r=Rr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],u=r[5],h=r[9],m=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-m,s),this._z=0);break;case"ZXY":this._x=Math.asin(Dt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-m,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Dt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-m,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ya.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ya,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ba.setFromEuler(this),this.setFromQuaternion(ba,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rr.DEFAULT_ORDER="XYZ";class Ps{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let bc=0;const Ta=new K,Qn=new Fi,ln=new St,Qi=new K,Ai=new K,Tc=new K,Ac=new Fi,Aa=new K(1,0,0),wa=new K(0,1,0),Ca=new K(0,0,1),wc={type:"added"},Cc={type:"removed"};class zt extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bc++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new K,t=new Rr,n=new Fi,r=new K(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Ve}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ps,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qn.setFromAxisAngle(e,t),this.quaternion.multiply(Qn),this}rotateOnWorldAxis(e,t){return Qn.setFromAxisAngle(e,t),this.quaternion.premultiply(Qn),this}rotateX(e){return this.rotateOnAxis(Aa,e)}rotateY(e){return this.rotateOnAxis(wa,e)}rotateZ(e){return this.rotateOnAxis(Ca,e)}translateOnAxis(e,t){return Ta.copy(e).applyQuaternion(this.quaternion),this.position.add(Ta.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Aa,e)}translateY(e){return this.translateOnAxis(wa,e)}translateZ(e){return this.translateOnAxis(Ca,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qi.copy(e):Qi.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ai.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Ai,Qi,this.up):ln.lookAt(Qi,Ai,this.up),this.quaternion.setFromRotationMatrix(ln),r&&(ln.extractRotation(r.matrixWorld),Qn.setFromRotationMatrix(ln),this.quaternion.premultiply(Qn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(wc)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(ln),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,e,Tc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,Ac,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let u=0,h=c.length;u<h;u++){const m=c[u];s(e.shapes,m)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,u=this.material.length;c<u;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),u=o(e.textures),h=o(e.images),m=o(e.shapes),f=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),u.length>0&&(n.textures=u),h.length>0&&(n.images=h),m.length>0&&(n.shapes=m),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function o(a){const c=[];for(const u in a){const h=a[u];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}zt.DEFAULT_UP=new K(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xt=new K,cn=new K,Zr=new K,dn=new K,ei=new K,ti=new K,Ra=new K,Jr=new K,Qr=new K,es=new K;let er=!1;class qt{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Xt.subVectors(e,t),r.cross(Xt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Xt.subVectors(r,t),cn.subVectors(n,t),Zr.subVectors(e,t);const o=Xt.dot(Xt),a=Xt.dot(cn),c=Xt.dot(Zr),u=cn.dot(cn),h=cn.dot(Zr),m=o*u-a*a;if(m===0)return s.set(0,0,0),null;const f=1/m,p=(u*c-a*h)*f,_=(o*h-a*c)*f;return s.set(1-p-_,_,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,dn)===null?!1:dn.x>=0&&dn.y>=0&&dn.x+dn.y<=1}static getUV(e,t,n,r,s,o,a,c){return er===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),er=!0),this.getInterpolation(e,t,n,r,s,o,a,c)}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,dn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,dn.x),c.addScaledVector(o,dn.y),c.addScaledVector(a,dn.z),c)}static isFrontFacing(e,t,n,r){return Xt.subVectors(n,t),cn.subVectors(e,t),Xt.cross(cn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),Xt.cross(cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return qt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return er===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),er=!0),qt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return qt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;ei.subVectors(r,n),ti.subVectors(s,n),Jr.subVectors(e,n);const c=ei.dot(Jr),u=ti.dot(Jr);if(c<=0&&u<=0)return t.copy(n);Qr.subVectors(e,r);const h=ei.dot(Qr),m=ti.dot(Qr);if(h>=0&&m<=h)return t.copy(r);const f=c*m-h*u;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(ei,o);es.subVectors(e,s);const p=ei.dot(es),_=ti.dot(es);if(_>=0&&p<=_)return t.copy(s);const g=p*u-c*_;if(g<=0&&u>=0&&_<=0)return a=u/(u-_),t.copy(n).addScaledVector(ti,a);const d=h*_-p*m;if(d<=0&&m-h>=0&&p-_>=0)return Ra.subVectors(s,r),a=(m-h)/(m-h+(p-_)),t.copy(r).addScaledVector(Ra,a);const l=1/(d+g+f);return o=g*l,a=f*l,t.copy(n).addScaledVector(ei,o).addScaledVector(ti,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vn={h:0,s:0,l:0},tr={h:0,s:0,l:0};function ts(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Je.workingColorSpace){if(e=pc(e,1),t=Dt(t,0,1),n=Dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=ts(o,s,e+1/3),this.g=ts(o,s,e),this.b=ts(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=xt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xt){const n=zo[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hi(e.r),this.g=hi(e.g),this.b=hi(e.b),this}copyLinearToSRGB(e){return this.r=Vr(e.r),this.g=Vr(e.g),this.b=Vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xt){return Je.fromWorkingColorSpace(bt.copy(this),e),Math.round(Dt(bt.r*255,0,255))*65536+Math.round(Dt(bt.g*255,0,255))*256+Math.round(Dt(bt.b*255,0,255))}getHexString(e=xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(bt.copy(this),t);const n=bt.r,r=bt.g,s=bt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,u;const h=(a+o)/2;if(a===o)c=0,u=0;else{const m=o-a;switch(u=h<=.5?m/(o+a):m/(2-o-a),o){case n:c=(r-s)/m+(r<s?6:0);break;case r:c=(s-n)/m+2;break;case s:c=(n-r)/m+4;break}c/=6}return e.h=c,e.s=u,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=xt){Je.fromWorkingColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,r=bt.b;return e!==xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(vn),this.setHSL(vn.h+e,vn.s+t,vn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vn),e.getHSL(tr);const n=Hr(vn.h,tr.h,t),r=Hr(vn.s,tr.s,t),s=Hr(vn.l,tr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new Qe;Qe.NAMES=zo;let Rc=0;class Lr extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rc++}),this.uuid=Ni(),this.name="",this.type="Material",this.blending=ui,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ps,this.blendDst=ms,this.blendEquation=Nn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yn,this.stencilZFail=Yn,this.stencilZPass=Yn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ui&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ps&&(n.blendSrc=this.blendSrc),this.blendDst!==ms&&(n.blendDst=this.blendDst),this.blendEquation!==Nn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ma&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Pr extends Lr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lt=new K,nr=new je;class nn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ga,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix3(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix4(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyNormalMatrix(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.transformDirection(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),r=Lt(r,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ga&&(e.usage=this.usage),e}}class ko extends nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ho extends nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kn extends nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Lc=0;const kt=new St,ns=new zt,ni=new K,Bt=new Oi,wi=new Oi,_t=new K;class Vn extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lc++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uo(e)?Ho:ko)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kt.makeRotationFromQuaternion(e),this.applyMatrix4(kt),this}rotateX(e){return kt.makeRotationX(e),this.applyMatrix4(kt),this}rotateY(e){return kt.makeRotationY(e),this.applyMatrix4(kt),this}rotateZ(e){return kt.makeRotationZ(e),this.applyMatrix4(kt),this}translate(e,t,n){return kt.makeTranslation(e,t,n),this.applyMatrix4(kt),this}scale(e,t,n){return kt.makeScale(e,t,n),this.applyMatrix4(kt),this}lookAt(e){return ns.lookAt(e),ns.updateMatrix(),this.applyMatrix4(ns.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ni).negate(),this.translate(ni.x,ni.y,ni.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new kn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Bt.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new K,1/0);return}if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];wi.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(Bt.min,wi.min),Bt.expandByPoint(_t),_t.addVectors(Bt.max,wi.max),Bt.expandByPoint(_t)):(Bt.expandByPoint(wi.min),Bt.expandByPoint(wi.max))}Bt.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)_t.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(_t));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let u=0,h=a.count;u<h;u++)_t.fromBufferAttribute(a,u),c&&(ni.fromBufferAttribute(e,u),_t.add(ni)),r=Math.max(r,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,u=[],h=[];for(let x=0;x<a;x++)u[x]=new K,h[x]=new K;const m=new K,f=new K,p=new K,_=new je,g=new je,d=new je,l=new K,M=new K;function S(x,H,G){m.fromArray(r,x*3),f.fromArray(r,H*3),p.fromArray(r,G*3),_.fromArray(o,x*2),g.fromArray(o,H*2),d.fromArray(o,G*2),f.sub(m),p.sub(m),g.sub(_),d.sub(_);const te=1/(g.x*d.y-d.x*g.y);isFinite(te)&&(l.copy(f).multiplyScalar(d.y).addScaledVector(p,-g.y).multiplyScalar(te),M.copy(p).multiplyScalar(g.x).addScaledVector(f,-d.x).multiplyScalar(te),u[x].add(l),u[H].add(l),u[G].add(l),h[x].add(M),h[H].add(M),h[G].add(M))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let x=0,H=b.length;x<H;++x){const G=b[x],te=G.start,L=G.count;for(let C=te,U=te+L;C<U;C+=3)S(n[C+0],n[C+1],n[C+2])}const R=new K,w=new K,A=new K,z=new K;function E(x){A.fromArray(s,x*3),z.copy(A);const H=u[x];R.copy(H),R.sub(A.multiplyScalar(A.dot(H))).normalize(),w.crossVectors(z,H);const te=w.dot(h[x])<0?-1:1;c[x*4]=R.x,c[x*4+1]=R.y,c[x*4+2]=R.z,c[x*4+3]=te}for(let x=0,H=b.length;x<H;++x){const G=b[x],te=G.start,L=G.count;for(let C=te,U=te+L;C<U;C+=3)E(n[C+0]),E(n[C+1]),E(n[C+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const r=new K,s=new K,o=new K,a=new K,c=new K,u=new K,h=new K,m=new K;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),g=e.getX(f+1),d=e.getX(f+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,d),h.subVectors(o,s),m.subVectors(r,s),h.cross(m),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),u.fromBufferAttribute(n,d),a.add(h),c.add(h),u.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(d,u.x,u.y,u.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),m.subVectors(r,s),h.cross(m),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,c){const u=a.array,h=a.itemSize,m=a.normalized,f=new u.constructor(c.length*h);let p=0,_=0;for(let g=0,d=c.length;g<d;g++){a.isInterleavedBufferAttribute?p=c[g]*a.data.stride+a.offset:p=c[g]*h;for(let l=0;l<h;l++)f[_++]=u[p++]}return new nn(f,h,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vn,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],u=e(c,n);t.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const c=[],u=s[a];for(let h=0,m=u.length;h<m;h++){const f=u[h],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const u=n[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],h=[];for(let m=0,f=u.length;m<f;m++){const p=u[m];h.push(p.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const u in r){const h=r[u];this.setAttribute(u,h.clone(t))}const s=e.morphAttributes;for(const u in s){const h=[],m=s[u];for(let f=0,p=m.length;f<p;f++)h.push(m[f].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,h=o.length;u<h;u++){const m=o[u];this.addGroup(m.start,m.count,m.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const La=new St,Pn=new Bo,ir=new Ls,Pa=new K,ii=new K,ri=new K,si=new K,is=new K,rr=new K,sr=new je,ar=new je,or=new je,Da=new K,Ia=new K,Ua=new K,lr=new K,cr=new K;class tn extends zt{constructor(e=new Vn,t=new Pr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){rr.set(0,0,0);for(let c=0,u=s.length;c<u;c++){const h=a[c],m=s[c];h!==0&&(is.fromBufferAttribute(m,e),o?rr.addScaledVector(is,h):rr.addScaledVector(is.sub(t),h))}t.add(rr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(s),Pn.copy(e.ray).recast(e.near),!(ir.containsPoint(Pn.origin)===!1&&(Pn.intersectSphere(ir,Pa)===null||Pn.origin.distanceToSquared(Pa)>(e.far-e.near)**2))&&(La.copy(s).invert(),Pn.copy(e.ray).applyMatrix4(La),!(n.boundingBox!==null&&Pn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,u=s.attributes.uv,h=s.attributes.uv1,m=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const d=f[_],l=o[d.materialIndex],M=Math.max(d.start,p.start),S=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let b=M,R=S;b<R;b+=3){const w=a.getX(b),A=a.getX(b+1),z=a.getX(b+2);r=dr(this,l,e,n,u,h,m,w,A,z),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=d.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let d=_,l=g;d<l;d+=3){const M=a.getX(d),S=a.getX(d+1),b=a.getX(d+2);r=dr(this,o,e,n,u,h,m,M,S,b),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const d=f[_],l=o[d.materialIndex],M=Math.max(d.start,p.start),S=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let b=M,R=S;b<R;b+=3){const w=b,A=b+1,z=b+2;r=dr(this,l,e,n,u,h,m,w,A,z),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=d.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(c.count,p.start+p.count);for(let d=_,l=g;d<l;d+=3){const M=d,S=d+1,b=d+2;r=dr(this,o,e,n,u,h,m,M,S,b),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}}function Pc(i,e,t,n,r,s,o,a){let c;if(e.side===It?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===An,a),c===null)return null;cr.copy(a),cr.applyMatrix4(i.matrixWorld);const u=t.ray.origin.distanceTo(cr);return u<t.near||u>t.far?null:{distance:u,point:cr.clone(),object:i}}function dr(i,e,t,n,r,s,o,a,c,u){i.getVertexPosition(a,ii),i.getVertexPosition(c,ri),i.getVertexPosition(u,si);const h=Pc(i,e,t,n,ii,ri,si,lr);if(h){r&&(sr.fromBufferAttribute(r,a),ar.fromBufferAttribute(r,c),or.fromBufferAttribute(r,u),h.uv=qt.getInterpolation(lr,ii,ri,si,sr,ar,or,new je)),s&&(sr.fromBufferAttribute(s,a),ar.fromBufferAttribute(s,c),or.fromBufferAttribute(s,u),h.uv1=qt.getInterpolation(lr,ii,ri,si,sr,ar,or,new je),h.uv2=h.uv1),o&&(Da.fromBufferAttribute(o,a),Ia.fromBufferAttribute(o,c),Ua.fromBufferAttribute(o,u),h.normal=qt.getInterpolation(lr,ii,ri,si,Da,Ia,Ua,new K),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const m={a,b:c,c:u,normal:new K,materialIndex:0};qt.getNormal(ii,ri,si,m.normal),h.face=m}return h}class Bi extends Vn{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],u=[],h=[],m=[];let f=0,p=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,r,o,2),_("x","z","y",1,-1,e,n,-t,r,o,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new kn(u,3)),this.setAttribute("normal",new kn(h,3)),this.setAttribute("uv",new kn(m,2));function _(g,d,l,M,S,b,R,w,A,z,E){const x=b/A,H=R/z,G=b/2,te=R/2,L=w/2,C=A+1,U=z+1;let B=0,V=0;const Y=new K;for(let j=0;j<U;j++){const ee=j*H-te;for(let Z=0;Z<C;Z++){const P=Z*x-G;Y[g]=P*M,Y[d]=ee*S,Y[l]=L,u.push(Y.x,Y.y,Y.z),Y[g]=0,Y[d]=0,Y[l]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),m.push(Z/A),m.push(1-j/z),B+=1}}for(let j=0;j<z;j++)for(let ee=0;ee<A;ee++){const Z=f+ee+C*j,P=f+ee+C*(j+1),k=f+(ee+1)+C*(j+1),N=f+(ee+1)+C*j;c.push(Z,P,N),c.push(P,k,N),V+=6}a.addGroup(p,V,E),p+=V,f+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function gi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function At(i){const e={};for(let t=0;t<i.length;t++){const n=gi(i[t]);for(const r in n)e[r]=n[r]}return e}function Dc(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Go(i){return i.getRenderTarget()===null?i.outputColorSpace:Je.workingColorSpace}const Ic={clone:gi,merge:At};var Uc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends Lr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uc,this.fragmentShader=Nc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gi(e.uniforms),this.uniformsGroups=Dc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Vo extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=hn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Yt extends Vo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ss*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(kr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/u,r*=o.width/c,n*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ai=-90,oi=1;class Fc extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Yt(ai,oi,e,t);r.layers=this.layers,this.add(r);const s=new Yt(ai,oi,e,t);s.layers=this.layers,this.add(s);const o=new Yt(ai,oi,e,t);o.layers=this.layers,this.add(o);const a=new Yt(ai,oi,e,t);a.layers=this.layers,this.add(a);const c=new Yt(ai,oi,e,t);c.layers=this.layers,this.add(c);const u=new Yt(ai,oi,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const u of t)this.remove(u);if(e===hn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,u,h]=this.children,m=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,u),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(m,f,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Wo extends Ut{constructor(e,t,n,r,s,o,a,c,u,h){e=e!==void 0?e:[],t=t!==void 0?t:fi,super(e,t,n,r,s,o,a,c,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Oc extends Hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Li("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===zn?xt:Ht),this.texture=new Wo(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Bi(5,5,5),s=new Gn({name:"CubemapFromEquirect",uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:It,blending:yn});s.uniforms.tEquirect.value=t;const o=new tn(r,s),a=t.minFilter;return t.minFilter===Pi&&(t.minFilter=Pt),new Fc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const rs=new K,Bc=new K,zc=new Ve;class In{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=rs.subVectors(n,t).cross(Bc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(rs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zc.getNormalMatrix(e),r=this.coplanarPoint(rs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dn=new Ls,ur=new K;class Xo{constructor(e=new In,t=new In,n=new In,r=new In,s=new In,o=new In){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hn){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],u=r[4],h=r[5],m=r[6],f=r[7],p=r[8],_=r[9],g=r[10],d=r[11],l=r[12],M=r[13],S=r[14],b=r[15];if(n[0].setComponents(c-s,f-u,d-p,b-l).normalize(),n[1].setComponents(c+s,f+u,d+p,b+l).normalize(),n[2].setComponents(c+o,f+h,d+_,b+M).normalize(),n[3].setComponents(c-o,f-h,d-_,b-M).normalize(),n[4].setComponents(c-a,f-m,d-g,b-S).normalize(),t===hn)n[5].setComponents(c+a,f+m,d+g,b+S).normalize();else if(t===yr)n[5].setComponents(a,m,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Dn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dn)}intersectsSprite(e){return Dn.center.set(0,0,0),Dn.radius=.7071067811865476,Dn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ur.x=r.normal.x>0?e.max.x:e.min.x,ur.y=r.normal.y>0?e.max.y:e.min.y,ur.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ur)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qo(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function kc(i,e){const t=e.isWebGL2,n=new WeakMap;function r(u,h){const m=u.array,f=u.usage,p=m.byteLength,_=i.createBuffer();i.bindBuffer(h,_),i.bufferData(h,m,f),u.onUploadCallback();let g;if(m instanceof Float32Array)g=i.FLOAT;else if(m instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(m instanceof Int16Array)g=i.SHORT;else if(m instanceof Uint32Array)g=i.UNSIGNED_INT;else if(m instanceof Int32Array)g=i.INT;else if(m instanceof Int8Array)g=i.BYTE;else if(m instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:_,type:g,bytesPerElement:m.BYTES_PER_ELEMENT,version:u.version,size:p}}function s(u,h,m){const f=h.array,p=h._updateRange,_=h.updateRanges;if(i.bindBuffer(m,u),p.count===-1&&_.length===0&&i.bufferSubData(m,0,f),_.length!==0){for(let g=0,d=_.length;g<d;g++){const l=_[g];t?i.bufferSubData(m,l.start*f.BYTES_PER_ELEMENT,f,l.start,l.count):i.bufferSubData(m,l.start*f.BYTES_PER_ELEMENT,f.subarray(l.start,l.start+l.count))}h.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(m,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):i.bufferSubData(m,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),n.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const h=n.get(u);h&&(i.deleteBuffer(h.buffer),n.delete(u))}function c(u,h){if(u.isGLBufferAttribute){const f=n.get(u);(!f||f.version<u.version)&&n.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const m=n.get(u);if(m===void 0)n.set(u,r(u,h));else if(m.version<u.version){if(m.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,u,h),m.version=u.version}}return{get:o,remove:a,update:c}}class zi extends Vn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),u=a+1,h=c+1,m=e/a,f=t/c,p=[],_=[],g=[],d=[];for(let l=0;l<h;l++){const M=l*f-o;for(let S=0;S<u;S++){const b=S*m-s;_.push(b,-M,0),g.push(0,0,1),d.push(S/a),d.push(1-l/c)}}for(let l=0;l<c;l++)for(let M=0;M<a;M++){const S=M+u*l,b=M+u*(l+1),R=M+1+u*(l+1),w=M+1+u*l;p.push(S,b,w),p.push(b,R,w)}this.setIndex(p),this.setAttribute("position",new kn(_,3)),this.setAttribute("normal",new kn(g,3)),this.setAttribute("uv",new kn(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Hc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gc=`#ifdef USE_ALPHAHASH
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
#endif`,Vc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xc=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,qc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yc=`#ifdef USE_AOMAP
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
#endif`,$c=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kc=`#ifdef USE_BATCHING
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
#endif`,jc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Zc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qc=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ed=`#ifdef USE_IRIDESCENCE
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
#endif`,td=`#ifdef USE_BUMPMAP
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
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,dd=`#define PI 3.141592653589793
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
} // validated`,ud=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hd=`vec3 transformedNormal = objectNormal;
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
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_d="gl_FragColor = linearToOutputTexel( gl_FragColor );",vd=`
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
}`,xd=`#ifdef USE_ENVMAP
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
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sd=`#ifdef USE_ENVMAP
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
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yd=`#ifdef USE_ENVMAP
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
#endif`,bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cd=`#ifdef USE_GRADIENTMAP
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
}`,Rd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ld=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Id=`uniform bool receiveShadow;
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
#endif`,Ud=`#ifdef USE_ENVMAP
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
#endif`,Nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Od=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zd=`PhysicalMaterial material;
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
#endif`,kd=`struct PhysicalMaterial {
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
}`,Hd=`
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
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Yd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,$d=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zd=`#if defined( USE_POINTS_UV )
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
#endif`,Jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tu=`#ifdef USE_MORPHNORMALS
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
#endif`,nu=`#ifdef USE_MORPHTARGETS
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
#endif`,iu=`#ifdef USE_MORPHTARGETS
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
#endif`,ru=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,su=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,au=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ou=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cu=`#ifdef USE_NORMALMAP
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
#endif`,du=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_u=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Su=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Eu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tu=`float getShadowMask() {
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
}`,Au=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wu=`#ifdef USE_SKINNING
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
#endif`,Cu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ru=`#ifdef USE_SKINNING
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
#endif`,Lu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Du=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Iu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Uu=`#ifdef USE_TRANSMISSION
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
#endif`,Nu=`#ifdef USE_TRANSMISSION
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
#endif`,Fu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ou=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ku=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hu=`uniform sampler2D t2D;
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
}`,Gu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vu=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qu=`#include <common>
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
}`,Yu=`#if DEPTH_PACKING == 3200
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
}`,$u=`#define DISTANCE
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
}`,Ku=`#define DISTANCE
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
}`,ju=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ju=`uniform float scale;
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
}`,Qu=`uniform vec3 diffuse;
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
}`,eh=`#include <common>
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
}`,th=`uniform vec3 diffuse;
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
}`,nh=`#define LAMBERT
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
}`,ih=`#define LAMBERT
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
}`,rh=`#define MATCAP
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
}`,sh=`#define MATCAP
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
}`,ah=`#define NORMAL
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
}`,oh=`#define NORMAL
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
}`,lh=`#define PHONG
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
}`,ch=`#define PHONG
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
}`,dh=`#define STANDARD
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
}`,uh=`#define STANDARD
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
}`,hh=`#define TOON
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
}`,fh=`#define TOON
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
}`,ph=`uniform float size;
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
}`,mh=`uniform vec3 diffuse;
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
}`,gh=`#include <common>
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
}`,_h=`uniform vec3 color;
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
}`,vh=`uniform float rotation;
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
}`,xh=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Hc,alphahash_pars_fragment:Gc,alphamap_fragment:Vc,alphamap_pars_fragment:Wc,alphatest_fragment:Xc,alphatest_pars_fragment:qc,aomap_fragment:Yc,aomap_pars_fragment:$c,batching_pars_vertex:Kc,batching_vertex:jc,begin_vertex:Zc,beginnormal_vertex:Jc,bsdfs:Qc,iridescence_fragment:ed,bumpmap_pars_fragment:td,clipping_planes_fragment:nd,clipping_planes_pars_fragment:id,clipping_planes_pars_vertex:rd,clipping_planes_vertex:sd,color_fragment:ad,color_pars_fragment:od,color_pars_vertex:ld,color_vertex:cd,common:dd,cube_uv_reflection_fragment:ud,defaultnormal_vertex:hd,displacementmap_pars_vertex:fd,displacementmap_vertex:pd,emissivemap_fragment:md,emissivemap_pars_fragment:gd,colorspace_fragment:_d,colorspace_pars_fragment:vd,envmap_fragment:xd,envmap_common_pars_fragment:Md,envmap_pars_fragment:Sd,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:Ud,envmap_vertex:yd,fog_vertex:bd,fog_pars_vertex:Td,fog_fragment:Ad,fog_pars_fragment:wd,gradientmap_pars_fragment:Cd,lightmap_fragment:Rd,lightmap_pars_fragment:Ld,lights_lambert_fragment:Pd,lights_lambert_pars_fragment:Dd,lights_pars_begin:Id,lights_toon_fragment:Nd,lights_toon_pars_fragment:Fd,lights_phong_fragment:Od,lights_phong_pars_fragment:Bd,lights_physical_fragment:zd,lights_physical_pars_fragment:kd,lights_fragment_begin:Hd,lights_fragment_maps:Gd,lights_fragment_end:Vd,logdepthbuf_fragment:Wd,logdepthbuf_pars_fragment:Xd,logdepthbuf_pars_vertex:qd,logdepthbuf_vertex:Yd,map_fragment:$d,map_pars_fragment:Kd,map_particle_fragment:jd,map_particle_pars_fragment:Zd,metalnessmap_fragment:Jd,metalnessmap_pars_fragment:Qd,morphcolor_vertex:eu,morphnormal_vertex:tu,morphtarget_pars_vertex:nu,morphtarget_vertex:iu,normal_fragment_begin:ru,normal_fragment_maps:su,normal_pars_fragment:au,normal_pars_vertex:ou,normal_vertex:lu,normalmap_pars_fragment:cu,clearcoat_normal_fragment_begin:du,clearcoat_normal_fragment_maps:uu,clearcoat_pars_fragment:hu,iridescence_pars_fragment:fu,opaque_fragment:pu,packing:mu,premultiplied_alpha_fragment:gu,project_vertex:_u,dithering_fragment:vu,dithering_pars_fragment:xu,roughnessmap_fragment:Mu,roughnessmap_pars_fragment:Su,shadowmap_pars_fragment:Eu,shadowmap_pars_vertex:yu,shadowmap_vertex:bu,shadowmask_pars_fragment:Tu,skinbase_vertex:Au,skinning_pars_vertex:wu,skinning_vertex:Cu,skinnormal_vertex:Ru,specularmap_fragment:Lu,specularmap_pars_fragment:Pu,tonemapping_fragment:Du,tonemapping_pars_fragment:Iu,transmission_fragment:Uu,transmission_pars_fragment:Nu,uv_pars_fragment:Fu,uv_pars_vertex:Ou,uv_vertex:Bu,worldpos_vertex:zu,background_vert:ku,background_frag:Hu,backgroundCube_vert:Gu,backgroundCube_frag:Vu,cube_vert:Wu,cube_frag:Xu,depth_vert:qu,depth_frag:Yu,distanceRGBA_vert:$u,distanceRGBA_frag:Ku,equirect_vert:ju,equirect_frag:Zu,linedashed_vert:Ju,linedashed_frag:Qu,meshbasic_vert:eh,meshbasic_frag:th,meshlambert_vert:nh,meshlambert_frag:ih,meshmatcap_vert:rh,meshmatcap_frag:sh,meshnormal_vert:ah,meshnormal_frag:oh,meshphong_vert:lh,meshphong_frag:ch,meshphysical_vert:dh,meshphysical_frag:uh,meshtoon_vert:hh,meshtoon_frag:fh,points_vert:ph,points_frag:mh,shadow_vert:gh,shadow_frag:_h,sprite_vert:vh,sprite_frag:xh},ue={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},en={basic:{uniforms:At([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:At([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Qe(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:At([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:At([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:At([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Qe(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:At([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:At([ue.points,ue.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:At([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:At([ue.common,ue.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:At([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:At([ue.sprite,ue.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:At([ue.common,ue.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:At([ue.lights,ue.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};en.physical={uniforms:At([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const hr={r:0,b:0,g:0};function Mh(i,e,t,n,r,s,o){const a=new Qe(0);let c=s===!0?0:1,u,h,m=null,f=0,p=null;function _(d,l){let M=!1,S=l.isScene===!0?l.background:null;S&&S.isTexture&&(S=(l.backgroundBlurriness>0?t:e).get(S)),S===null?g(a,c):S&&S.isColor&&(g(S,1),M=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),S&&(S.isCubeTexture||S.mapping===wr)?(h===void 0&&(h=new tn(new Bi(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:gi(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=l.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,h.material.toneMapped=Je.getTransfer(S.colorSpace)!==rt,(m!==S||f!==S.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,m=S,f=S.version,p=i.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(u===void 0&&(u=new tn(new zi(2,2),new Gn({name:"BackgroundMaterial",uniforms:gi(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=S,u.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,u.material.toneMapped=Je.getTransfer(S.colorSpace)!==rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),u.material.uniforms.uvTransform.value.copy(S.matrix),(m!==S||f!==S.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,m=S,f=S.version,p=i.toneMapping),u.layers.enableAll(),d.unshift(u,u.geometry,u.material,0,0,null))}function g(d,l){d.getRGB(hr,Go(i)),n.buffers.color.setClear(hr.r,hr.g,hr.b,l,o)}return{getClearColor:function(){return a},setClearColor:function(d,l=1){a.set(d),c=l,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(d){c=d,g(a,c)},render:_}}function Sh(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},c=d(null);let u=c,h=!1;function m(L,C,U,B,V){let Y=!1;if(o){const j=g(B,U,C);u!==j&&(u=j,p(u.object)),Y=l(L,B,U,V),Y&&M(L,B,U,V)}else{const j=C.wireframe===!0;(u.geometry!==B.id||u.program!==U.id||u.wireframe!==j)&&(u.geometry=B.id,u.program=U.id,u.wireframe=j,Y=!0)}V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,z(L,C,U,B),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(L){return n.isWebGL2?i.bindVertexArray(L):s.bindVertexArrayOES(L)}function _(L){return n.isWebGL2?i.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function g(L,C,U){const B=U.wireframe===!0;let V=a[L.id];V===void 0&&(V={},a[L.id]=V);let Y=V[C.id];Y===void 0&&(Y={},V[C.id]=Y);let j=Y[B];return j===void 0&&(j=d(f()),Y[B]=j),j}function d(L){const C=[],U=[],B=[];for(let V=0;V<r;V++)C[V]=0,U[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:B,object:L,attributes:{},index:null}}function l(L,C,U,B){const V=u.attributes,Y=C.attributes;let j=0;const ee=U.getAttributes();for(const Z in ee)if(ee[Z].location>=0){const k=V[Z];let N=Y[Z];if(N===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(N=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(N=L.instanceColor)),k===void 0||k.attribute!==N||N&&k.data!==N.data)return!0;j++}return u.attributesNum!==j||u.index!==B}function M(L,C,U,B){const V={},Y=C.attributes;let j=0;const ee=U.getAttributes();for(const Z in ee)if(ee[Z].location>=0){let k=Y[Z];k===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(k=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(k=L.instanceColor));const N={};N.attribute=k,k&&k.data&&(N.data=k.data),V[Z]=N,j++}u.attributes=V,u.attributesNum=j,u.index=B}function S(){const L=u.newAttributes;for(let C=0,U=L.length;C<U;C++)L[C]=0}function b(L){R(L,0)}function R(L,C){const U=u.newAttributes,B=u.enabledAttributes,V=u.attributeDivisors;U[L]=1,B[L]===0&&(i.enableVertexAttribArray(L),B[L]=1),V[L]!==C&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,C),V[L]=C)}function w(){const L=u.newAttributes,C=u.enabledAttributes;for(let U=0,B=C.length;U<B;U++)C[U]!==L[U]&&(i.disableVertexAttribArray(U),C[U]=0)}function A(L,C,U,B,V,Y,j){j===!0?i.vertexAttribIPointer(L,C,U,V,Y):i.vertexAttribPointer(L,C,U,B,V,Y)}function z(L,C,U,B){if(n.isWebGL2===!1&&(L.isInstancedMesh||B.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;S();const V=B.attributes,Y=U.getAttributes(),j=C.defaultAttributeValues;for(const ee in Y){const Z=Y[ee];if(Z.location>=0){let P=V[ee];if(P===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(P=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(P=L.instanceColor)),P!==void 0){const k=P.normalized,N=P.itemSize,Q=t.get(P);if(Q===void 0)continue;const ae=Q.buffer,Me=Q.type,le=Q.bytesPerElement,de=n.isWebGL2===!0&&(Me===i.INT||Me===i.UNSIGNED_INT||P.gpuType===To);if(P.isInterleavedBufferAttribute){const Te=P.data,F=Te.stride,Oe=P.offset;if(Te.isInstancedInterleavedBuffer){for(let _e=0;_e<Z.locationSize;_e++)R(Z.location+_e,Te.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Te.meshPerAttribute*Te.count)}else for(let _e=0;_e<Z.locationSize;_e++)b(Z.location+_e);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let _e=0;_e<Z.locationSize;_e++)A(Z.location+_e,N/Z.locationSize,Me,k,F*le,(Oe+N/Z.locationSize*_e)*le,de)}else{if(P.isInstancedBufferAttribute){for(let Te=0;Te<Z.locationSize;Te++)R(Z.location+Te,P.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let Te=0;Te<Z.locationSize;Te++)b(Z.location+Te);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let Te=0;Te<Z.locationSize;Te++)A(Z.location+Te,N/Z.locationSize,Me,k,N*le,N/Z.locationSize*Te*le,de)}}else if(j!==void 0){const k=j[ee];if(k!==void 0)switch(k.length){case 2:i.vertexAttrib2fv(Z.location,k);break;case 3:i.vertexAttrib3fv(Z.location,k);break;case 4:i.vertexAttrib4fv(Z.location,k);break;default:i.vertexAttrib1fv(Z.location,k)}}}}w()}function E(){G();for(const L in a){const C=a[L];for(const U in C){const B=C[U];for(const V in B)_(B[V].object),delete B[V];delete C[U]}delete a[L]}}function x(L){if(a[L.id]===void 0)return;const C=a[L.id];for(const U in C){const B=C[U];for(const V in B)_(B[V].object),delete B[V];delete C[U]}delete a[L.id]}function H(L){for(const C in a){const U=a[C];if(U[L.id]===void 0)continue;const B=U[L.id];for(const V in B)_(B[V].object),delete B[V];delete U[L.id]}}function G(){te(),h=!0,u!==c&&(u=c,p(u.object))}function te(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:m,reset:G,resetDefaultState:te,dispose:E,releaseStatesOfGeometry:x,releaseStatesOfProgram:H,initAttributes:S,enableAttribute:b,disableUnusedAttributes:w}}function Eh(i,e,t,n){const r=n.isWebGL2;let s;function o(h){s=h}function a(h,m){i.drawArrays(s,h,m),t.update(m,s,1)}function c(h,m,f){if(f===0)return;let p,_;if(r)p=i,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,h,m,f),t.update(m,s,f)}function u(h,m,f){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f;_++)this.render(h[_],m[_]);else{p.multiDrawArraysWEBGL(s,h,0,m,0,f);let _=0;for(let g=0;g<f;g++)_+=m[g];t.update(_,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=u}function yh(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const u=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),d=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),l=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,b=o||e.has("OES_texture_float"),R=S&&b,w=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:m,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:d,maxVaryings:l,maxFragmentUniforms:M,vertexTextures:S,floatFragmentTextures:b,floatVertexTextures:R,maxSamples:w}}function bh(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new In,a=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,f){const p=m.length!==0||f||n!==0||r;return r=f,n=m.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(m,f){t=h(m,f,0)},this.setState=function(m,f,p){const _=m.clippingPlanes,g=m.clipIntersection,d=m.clipShadows,l=i.get(m);if(!r||_===null||_.length===0||s&&!d)s?h(null):u();else{const M=s?0:n,S=M*4;let b=l.clippingState||null;c.value=b,b=h(_,f,S,p);for(let R=0;R!==S;++R)b[R]=t[R];l.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(m,f,p,_){const g=m!==null?m.length:0;let d=null;if(g!==0){if(d=c.value,_!==!0||d===null){const l=p+g*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(d===null||d.length<l)&&(d=new Float32Array(l));for(let S=0,b=p;S!==g;++S,b+=4)o.copy(m[S]).applyMatrix4(M,a),o.normal.toArray(d,b),d[b+3]=o.constant}c.value=d,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,d}}function Th(i){let e=new WeakMap;function t(o,a){return a===gs?o.mapping=fi:a===_s&&(o.mapping=pi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===gs||a===_s)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const u=new Oc(c.height/2);return u.fromEquirectangularTexture(i,o),e.set(o,u),o.addEventListener("dispose",r),t(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Yo extends Vo{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ci=4,Na=[.125,.215,.35,.446,.526,.582],Fn=20,ss=new Yo,Fa=new Qe;let as=null,os=0,ls=0;const Un=(1+Math.sqrt(5))/2,li=1/Un,Oa=[new K(1,1,1),new K(-1,1,1),new K(1,1,-1),new K(-1,1,-1),new K(0,Un,li),new K(0,Un,-li),new K(li,0,Un),new K(-li,0,Un),new K(Un,li,0),new K(-Un,li,0)];class Ba{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){as=this._renderer.getRenderTarget(),os=this._renderer.getActiveCubeFace(),ls=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ha(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ka(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(as,os,ls),e.scissorTest=!1,fr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fi||e.mapping===pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),as=this._renderer.getRenderTarget(),os=this._renderer.getActiveCubeFace(),ls=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:Di,format:jt,colorSpace:fn,depthBuffer:!1},r=za(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=za(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ah(s)),this._blurMaterial=wh(s,e,t)}return r}_compileMaterial(e){const t=new tn(this._lodPlanes[0],e);this._renderer.compile(t,ss)}_sceneToCubeUV(e,t,n,r){const a=new Yt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,m=h.autoClear,f=h.toneMapping;h.getClearColor(Fa),h.toneMapping=bn,h.autoClear=!1;const p=new Pr({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),_=new tn(new Bi,p);let g=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,g=!0):(p.color.copy(Fa),g=!0);for(let l=0;l<6;l++){const M=l%3;M===0?(a.up.set(0,c[l],0),a.lookAt(u[l],0,0)):M===1?(a.up.set(0,0,c[l]),a.lookAt(0,u[l],0)):(a.up.set(0,c[l],0),a.lookAt(0,0,u[l]));const S=this._cubeSize;fr(r,M*S,l>2?S:0,S,S),h.setRenderTarget(r),g&&h.render(_,a),h.render(e,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=m,e.background=d}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===fi||e.mapping===pi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ha()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ka());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new tn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;fr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ss)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Oa[(r-1)%Oa.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,m=new tn(this._lodPlanes[r],u),f=u.uniforms,p=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Fn-1),g=s/_,d=isFinite(s)?1+Math.floor(h*g):Fn;d>Fn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Fn}`);const l=[];let M=0;for(let A=0;A<Fn;++A){const z=A/g,E=Math.exp(-z*z/2);l.push(E),A===0?M+=E:A<d&&(M+=2*E)}for(let A=0;A<l.length;A++)l[A]=l[A]/M;f.envMap.value=e.texture,f.samples.value=d,f.weights.value=l,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=_,f.mipInt.value=S-n;const b=this._sizeLods[r],R=3*b*(r>S-ci?r-S+ci:0),w=4*(this._cubeSize-b);fr(t,R,w,3*b,2*b),c.setRenderTarget(t),c.render(m,ss)}}function Ah(i){const e=[],t=[],n=[];let r=i;const s=i-ci+1+Na.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-ci?c=Na[o-i+ci-1]:o===0&&(c=0),n.push(c);const u=1/(a-2),h=-u,m=1+u,f=[h,h,m,h,m,m,h,h,m,m,h,m],p=6,_=6,g=3,d=2,l=1,M=new Float32Array(g*_*p),S=new Float32Array(d*_*p),b=new Float32Array(l*_*p);for(let w=0;w<p;w++){const A=w%3*2/3-1,z=w>2?0:-1,E=[A,z,0,A+2/3,z,0,A+2/3,z+1,0,A,z,0,A+2/3,z+1,0,A,z+1,0];M.set(E,g*_*w),S.set(f,d*_*w);const x=[w,w,w,w,w,w];b.set(x,l*_*w)}const R=new Vn;R.setAttribute("position",new nn(M,g)),R.setAttribute("uv",new nn(S,d)),R.setAttribute("faceIndex",new nn(b,l)),e.push(R),r>ci&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function za(i,e,t){const n=new Hn(i,e,t);return n.texture.mapping=wr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function wh(i,e,t){const n=new Float32Array(Fn),r=new K(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Fn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function ka(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Ha(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Ds(){return`

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
	`}function Ch(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,u=c===gs||c===_s,h=c===fi||c===pi;if(u||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let m=e.get(a);return t===null&&(t=new Ba(i)),m=u?t.fromEquirectangular(a,m):t.fromCubemap(a,m),e.set(a,m),m.texture}else{if(e.has(a))return e.get(a).texture;{const m=a.image;if(u&&m&&m.height>0||h&&m&&r(m)){t===null&&(t=new Ba(i));const f=u?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let c=0;const u=6;for(let h=0;h<u;h++)a[h]!==void 0&&c++;return c===u}function s(a){const c=a.target;c.removeEventListener("dispose",s);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Rh(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Lh(i,e,t,n){const r={},s=new WeakMap;function o(m){const f=m.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const g=f.morphAttributes[_];for(let d=0,l=g.length;d<l;d++)e.remove(g[d])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(m,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(m){const f=m.attributes;for(const _ in f)e.update(f[_],i.ARRAY_BUFFER);const p=m.morphAttributes;for(const _ in p){const g=p[_];for(let d=0,l=g.length;d<l;d++)e.update(g[d],i.ARRAY_BUFFER)}}function u(m){const f=[],p=m.index,_=m.attributes.position;let g=0;if(p!==null){const M=p.array;g=p.version;for(let S=0,b=M.length;S<b;S+=3){const R=M[S+0],w=M[S+1],A=M[S+2];f.push(R,w,w,A,A,R)}}else if(_!==void 0){const M=_.array;g=_.version;for(let S=0,b=M.length/3-1;S<b;S+=3){const R=S+0,w=S+1,A=S+2;f.push(R,w,w,A,A,R)}}else return;const d=new(Uo(f)?Ho:ko)(f,1);d.version=g;const l=s.get(m);l&&e.remove(l),s.set(m,d)}function h(m){const f=s.get(m);if(f){const p=m.index;p!==null&&f.version<p.version&&u(m)}else u(m);return s.get(m)}return{get:a,update:c,getWireframeAttribute:h}}function Ph(i,e,t,n){const r=n.isWebGL2;let s;function o(p){s=p}let a,c;function u(p){a=p.type,c=p.bytesPerElement}function h(p,_){i.drawElements(s,_,a,p*c),t.update(_,s,1)}function m(p,_,g){if(g===0)return;let d,l;if(r)d=i,l="drawElementsInstanced";else if(d=e.get("ANGLE_instanced_arrays"),l="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[l](s,_,a,p*c,g),t.update(_,s,g)}function f(p,_,g){if(g===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let l=0;l<g;l++)this.render(p[l]/c,_[l]);else{d.multiDrawElementsWEBGL(s,_,0,a,p,0,g);let l=0;for(let M=0;M<g;M++)l+=_[M];t.update(l,s,1)}}this.setMode=o,this.setIndex=u,this.render=h,this.renderInstances=m,this.renderMultiDraw=f}function Dh(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Ih(i,e){return i[0]-e[0]}function Uh(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Nh(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new Mt,a=[];for(let u=0;u<8;u++)a[u]=[u,0];function c(u,h,m){const f=u.morphTargetInfluences;if(e.isWebGL2===!0){const _=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=_!==void 0?_.length:0;let d=s.get(h);if(d===void 0||d.count!==g){let C=function(){te.dispose(),s.delete(h),h.removeEventListener("dispose",C)};var p=C;d!==void 0&&d.texture.dispose();const S=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],z=h.morphAttributes.color||[];let E=0;S===!0&&(E=1),b===!0&&(E=2),R===!0&&(E=3);let x=h.attributes.position.count*E,H=1;x>e.maxTextureSize&&(H=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const G=new Float32Array(x*H*4*g),te=new Oo(G,x,H,g);te.type=En,te.needsUpdate=!0;const L=E*4;for(let U=0;U<g;U++){const B=w[U],V=A[U],Y=z[U],j=x*H*4*U;for(let ee=0;ee<B.count;ee++){const Z=ee*L;S===!0&&(o.fromBufferAttribute(B,ee),G[j+Z+0]=o.x,G[j+Z+1]=o.y,G[j+Z+2]=o.z,G[j+Z+3]=0),b===!0&&(o.fromBufferAttribute(V,ee),G[j+Z+4]=o.x,G[j+Z+5]=o.y,G[j+Z+6]=o.z,G[j+Z+7]=0),R===!0&&(o.fromBufferAttribute(Y,ee),G[j+Z+8]=o.x,G[j+Z+9]=o.y,G[j+Z+10]=o.z,G[j+Z+11]=Y.itemSize===4?o.w:1)}}d={count:g,texture:te,size:new je(x,H)},s.set(h,d),h.addEventListener("dispose",C)}let l=0;for(let S=0;S<f.length;S++)l+=f[S];const M=h.morphTargetsRelative?1:1-l;m.getUniforms().setValue(i,"morphTargetBaseInfluence",M),m.getUniforms().setValue(i,"morphTargetInfluences",f),m.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),m.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}else{const _=f===void 0?0:f.length;let g=n[h.id];if(g===void 0||g.length!==_){g=[];for(let b=0;b<_;b++)g[b]=[b,0];n[h.id]=g}for(let b=0;b<_;b++){const R=g[b];R[0]=b,R[1]=f[b]}g.sort(Uh);for(let b=0;b<8;b++)b<_&&g[b][1]?(a[b][0]=g[b][0],a[b][1]=g[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(Ih);const d=h.morphAttributes.position,l=h.morphAttributes.normal;let M=0;for(let b=0;b<8;b++){const R=a[b],w=R[0],A=R[1];w!==Number.MAX_SAFE_INTEGER&&A?(d&&h.getAttribute("morphTarget"+b)!==d[w]&&h.setAttribute("morphTarget"+b,d[w]),l&&h.getAttribute("morphNormal"+b)!==l[w]&&h.setAttribute("morphNormal"+b,l[w]),r[b]=A,M+=A):(d&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),l&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),r[b]=0)}const S=h.morphTargetsRelative?1:1-M;m.getUniforms().setValue(i,"morphTargetBaseInfluence",S),m.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:c}}function Fh(i,e,t,n){let r=new WeakMap;function s(c){const u=n.render.frame,h=c.geometry,m=e.get(c,h);if(r.get(m)!==u&&(e.update(m),r.set(m,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return m}function o(){r=new WeakMap}function a(c){const u=c.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}class $o extends Ut{constructor(e,t,n,r,s,o,a,c,u,h){if(h=h!==void 0?h:Bn,h!==Bn&&h!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Bn&&(n=Sn),n===void 0&&h===mi&&(n=On),super(null,r,s,o,a,c,h,n,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:wt,this.minFilter=c!==void 0?c:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ko=new Ut,jo=new $o(1,1);jo.compareFunction=Io;const Zo=new Oo,Jo=new Mc,Qo=new Wo,Ga=[],Va=[],Wa=new Float32Array(16),Xa=new Float32Array(9),qa=new Float32Array(4);function vi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ga[r];if(s===void 0&&(s=new Float32Array(r),Ga[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Dr(i,e){let t=Va[e];t===void 0&&(t=new Int32Array(e),Va[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Oh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Bh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2fv(this.addr,e),mt(t,e)}}function zh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;i.uniform3fv(this.addr,e),mt(t,e)}}function kh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4fv(this.addr,e),mt(t,e)}}function Hh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;qa.set(n),i.uniformMatrix2fv(this.addr,!1,qa),mt(t,n)}}function Gh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Xa.set(n),i.uniformMatrix3fv(this.addr,!1,Xa),mt(t,n)}}function Vh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Wa.set(n),i.uniformMatrix4fv(this.addr,!1,Wa),mt(t,n)}}function Wh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Xh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2iv(this.addr,e),mt(t,e)}}function qh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3iv(this.addr,e),mt(t,e)}}function Yh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4iv(this.addr,e),mt(t,e)}}function $h(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Kh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2uiv(this.addr,e),mt(t,e)}}function jh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3uiv(this.addr,e),mt(t,e)}}function Zh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4uiv(this.addr,e),mt(t,e)}}function Jh(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?jo:Ko;t.setTexture2D(e||s,r)}function Qh(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Jo,r)}function ef(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Qo,r)}function tf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Zo,r)}function nf(i){switch(i){case 5126:return Oh;case 35664:return Bh;case 35665:return zh;case 35666:return kh;case 35674:return Hh;case 35675:return Gh;case 35676:return Vh;case 5124:case 35670:return Wh;case 35667:case 35671:return Xh;case 35668:case 35672:return qh;case 35669:case 35673:return Yh;case 5125:return $h;case 36294:return Kh;case 36295:return jh;case 36296:return Zh;case 35678:case 36198:case 36298:case 36306:case 35682:return Jh;case 35679:case 36299:case 36307:return Qh;case 35680:case 36300:case 36308:case 36293:return ef;case 36289:case 36303:case 36311:case 36292:return tf}}function rf(i,e){i.uniform1fv(this.addr,e)}function sf(i,e){const t=vi(e,this.size,2);i.uniform2fv(this.addr,t)}function af(i,e){const t=vi(e,this.size,3);i.uniform3fv(this.addr,t)}function of(i,e){const t=vi(e,this.size,4);i.uniform4fv(this.addr,t)}function lf(i,e){const t=vi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cf(i,e){const t=vi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function df(i,e){const t=vi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function uf(i,e){i.uniform1iv(this.addr,e)}function hf(i,e){i.uniform2iv(this.addr,e)}function ff(i,e){i.uniform3iv(this.addr,e)}function pf(i,e){i.uniform4iv(this.addr,e)}function mf(i,e){i.uniform1uiv(this.addr,e)}function gf(i,e){i.uniform2uiv(this.addr,e)}function _f(i,e){i.uniform3uiv(this.addr,e)}function vf(i,e){i.uniform4uiv(this.addr,e)}function xf(i,e,t){const n=this.cache,r=e.length,s=Dr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Ko,s[o])}function Mf(i,e,t){const n=this.cache,r=e.length,s=Dr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Jo,s[o])}function Sf(i,e,t){const n=this.cache,r=e.length,s=Dr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Qo,s[o])}function Ef(i,e,t){const n=this.cache,r=e.length,s=Dr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Zo,s[o])}function yf(i){switch(i){case 5126:return rf;case 35664:return sf;case 35665:return af;case 35666:return of;case 35674:return lf;case 35675:return cf;case 35676:return df;case 5124:case 35670:return uf;case 35667:case 35671:return hf;case 35668:case 35672:return ff;case 35669:case 35673:return pf;case 5125:return mf;case 36294:return gf;case 36295:return _f;case 36296:return vf;case 35678:case 36198:case 36298:case 36306:case 35682:return xf;case 35679:case 36299:case 36307:return Mf;case 35680:case 36300:case 36308:case 36293:return Sf;case 36289:case 36303:case 36311:case 36292:return Ef}}class bf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nf(t.type)}}class Tf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yf(t.type)}}class Af{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const cs=/(\w+)(\])?(\[|\.)?/g;function Ya(i,e){i.seq.push(e),i.map[e.id]=e}function wf(i,e,t){const n=i.name,r=n.length;for(cs.lastIndex=0;;){const s=cs.exec(n),o=cs.lastIndex;let a=s[1];const c=s[2]==="]",u=s[3];if(c&&(a=a|0),u===void 0||u==="["&&o+2===r){Ya(t,u===void 0?new bf(a,i,e):new Tf(a,i,e));break}else{let m=t.map[a];m===void 0&&(m=new Af(a),Ya(t,m)),t=m}}}class vr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);wf(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function $a(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Cf=37297;let Rf=0;function Lf(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Pf(i){const e=Je.getPrimaries(Je.workingColorSpace),t=Je.getPrimaries(i);let n;switch(e===t?n="":e===Er&&t===Sr?n="LinearDisplayP3ToLinearSRGB":e===Sr&&t===Er&&(n="LinearSRGBToLinearDisplayP3"),i){case fn:case Cr:return[n,"LinearTransferOETF"];case xt:case Rs:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ka(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Lf(i.getShaderSource(e),o)}else return r}function Df(i,e){const t=Pf(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function If(i,e){let t;switch(e){case Gl:t="Linear";break;case Vl:t="Reinhard";break;case Wl:t="OptimizedCineon";break;case Xl:t="ACESFilmic";break;case Yl:t="AgX";break;case ql:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Uf(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(di).join(`
`)}function Nf(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(di).join(`
`)}function Ff(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Of(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function di(i){return i!==""}function ja(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Za(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Bf=/^[ \t]*#include +<([\w\d./]+)>/gm;function ys(i){return i.replace(Bf,kf)}const zf=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function kf(i,e){let t=He[e];if(t===void 0){const n=zf.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ys(t)}const Hf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ja(i){return i.replace(Hf,Gf)}function Gf(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Qa(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Vf(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Eo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===gl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===un&&(e="SHADOWMAP_TYPE_VSM"),e}function Wf(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fi:case pi:e="ENVMAP_TYPE_CUBE";break;case wr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xf(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case pi:e="ENVMAP_MODE_REFRACTION";break}return e}function qf(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case yo:e="ENVMAP_BLENDING_MULTIPLY";break;case kl:e="ENVMAP_BLENDING_MIX";break;case Hl:e="ENVMAP_BLENDING_ADD";break}return e}function Yf(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function $f(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Vf(t),u=Wf(t),h=Xf(t),m=qf(t),f=Yf(t),p=t.isWebGL2?"":Uf(t),_=Nf(t),g=Ff(s),d=r.createProgram();let l,M,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(l=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(di).join(`
`),l.length>0&&(l+=`
`),M=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(di).join(`
`),M.length>0&&(M+=`
`)):(l=[Qa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(di).join(`
`),M=[p,Qa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?He.tonemapping_pars_fragment:"",t.toneMapping!==bn?If("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Df("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(di).join(`
`)),o=ys(o),o=ja(o,t),o=Za(o,t),a=ys(a),a=ja(a,t),a=Za(a,t),o=Ja(o),a=Ja(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,l=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+l,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===_a?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_a?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const b=S+l+o,R=S+M+a,w=$a(r,r.VERTEX_SHADER,b),A=$a(r,r.FRAGMENT_SHADER,R);r.attachShader(d,w),r.attachShader(d,A),t.index0AttributeName!==void 0?r.bindAttribLocation(d,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(d,0,"position"),r.linkProgram(d);function z(G){if(i.debug.checkShaderErrors){const te=r.getProgramInfoLog(d).trim(),L=r.getShaderInfoLog(w).trim(),C=r.getShaderInfoLog(A).trim();let U=!0,B=!0;if(r.getProgramParameter(d,r.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,d,w,A);else{const V=Ka(r,w,"vertex"),Y=Ka(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(d,r.VALIDATE_STATUS)+`

Program Info Log: `+te+`
`+V+`
`+Y)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(L===""||C==="")&&(B=!1);B&&(G.diagnostics={runnable:U,programLog:te,vertexShader:{log:L,prefix:l},fragmentShader:{log:C,prefix:M}})}r.deleteShader(w),r.deleteShader(A),E=new vr(r,d),x=Of(r,d)}let E;this.getUniforms=function(){return E===void 0&&z(this),E};let x;this.getAttributes=function(){return x===void 0&&z(this),x};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=r.getProgramParameter(d,Cf)),H},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(d),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rf++,this.cacheKey=e,this.usedTimes=1,this.program=d,this.vertexShader=w,this.fragmentShader=A,this}let Kf=0;class jf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Zf(e),t.set(e,n)),n}}class Zf{constructor(e){this.id=Kf++,this.code=e,this.usedTimes=0}}function Jf(i,e,t,n,r,s,o){const a=new Ps,c=new jf,u=[],h=r.isWebGL2,m=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return E===0?"uv":`uv${E}`}function d(E,x,H,G,te){const L=G.fog,C=te.geometry,U=E.isMeshStandardMaterial?G.environment:null,B=(E.isMeshStandardMaterial?t:e).get(E.envMap||U),V=B&&B.mapping===wr?B.image.height:null,Y=_[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const j=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,ee=j!==void 0?j.length:0;let Z=0;C.morphAttributes.position!==void 0&&(Z=1),C.morphAttributes.normal!==void 0&&(Z=2),C.morphAttributes.color!==void 0&&(Z=3);let P,k,N,Q;if(Y){const st=en[Y];P=st.vertexShader,k=st.fragmentShader}else P=E.vertexShader,k=E.fragmentShader,c.update(E),N=c.getVertexShaderID(E),Q=c.getFragmentShaderID(E);const ae=i.getRenderTarget(),Me=te.isInstancedMesh===!0,le=te.isBatchedMesh===!0,de=!!E.map,Te=!!E.matcap,F=!!B,Oe=!!E.aoMap,_e=!!E.lightMap,Ae=!!E.bumpMap,me=!!E.normalMap,Ge=!!E.displacementMap,Ie=!!E.emissiveMap,T=!!E.metalnessMap,v=!!E.roughnessMap,W=E.anisotropy>0,se=E.clearcoat>0,re=E.iridescence>0,ne=E.sheen>0,Ee=E.transmission>0,oe=W&&!!E.anisotropyMap,xe=se&&!!E.clearcoatMap,Ce=se&&!!E.clearcoatNormalMap,Pe=se&&!!E.clearcoatRoughnessMap,ie=re&&!!E.iridescenceMap,We=re&&!!E.iridescenceThicknessMap,Fe=ne&&!!E.sheenColorMap,Ne=ne&&!!E.sheenRoughnessMap,we=!!E.specularMap,Se=!!E.specularColorMap,ze=!!E.specularIntensityMap,qe=Ee&&!!E.transmissionMap,it=Ee&&!!E.thicknessMap,ke=!!E.gradientMap,ce=!!E.alphaMap,D=E.alphaTest>0,ge=!!E.alphaHash,he=!!E.extensions,Ue=!!C.attributes.uv1,De=!!C.attributes.uv2,Ye=!!C.attributes.uv3;let $e=bn;return E.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&($e=i.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:E.type,shaderName:E.name,vertexShader:P,fragmentShader:k,defines:E.defines,customVertexShaderID:N,customFragmentShaderID:Q,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:le,instancing:Me,instancingColor:Me&&te.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:fn,map:de,matcap:Te,envMap:F,envMapMode:F&&B.mapping,envMapCubeUVHeight:V,aoMap:Oe,lightMap:_e,bumpMap:Ae,normalMap:me,displacementMap:f&&Ge,emissiveMap:Ie,normalMapObjectSpace:me&&E.normalMapType===ac,normalMapTangentSpace:me&&E.normalMapType===sc,metalnessMap:T,roughnessMap:v,anisotropy:W,anisotropyMap:oe,clearcoat:se,clearcoatMap:xe,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Pe,iridescence:re,iridescenceMap:ie,iridescenceThicknessMap:We,sheen:ne,sheenColorMap:Fe,sheenRoughnessMap:Ne,specularMap:we,specularColorMap:Se,specularIntensityMap:ze,transmission:Ee,transmissionMap:qe,thicknessMap:it,gradientMap:ke,opaque:E.transparent===!1&&E.blending===ui,alphaMap:ce,alphaTest:D,alphaHash:ge,combine:E.combine,mapUv:de&&g(E.map.channel),aoMapUv:Oe&&g(E.aoMap.channel),lightMapUv:_e&&g(E.lightMap.channel),bumpMapUv:Ae&&g(E.bumpMap.channel),normalMapUv:me&&g(E.normalMap.channel),displacementMapUv:Ge&&g(E.displacementMap.channel),emissiveMapUv:Ie&&g(E.emissiveMap.channel),metalnessMapUv:T&&g(E.metalnessMap.channel),roughnessMapUv:v&&g(E.roughnessMap.channel),anisotropyMapUv:oe&&g(E.anisotropyMap.channel),clearcoatMapUv:xe&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:We&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&g(E.sheenRoughnessMap.channel),specularMapUv:we&&g(E.specularMap.channel),specularColorMapUv:Se&&g(E.specularColorMap.channel),specularIntensityMapUv:ze&&g(E.specularIntensityMap.channel),transmissionMapUv:qe&&g(E.transmissionMap.channel),thicknessMapUv:it&&g(E.thicknessMap.channel),alphaMapUv:ce&&g(E.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(me||W),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:De,vertexUv3s:Ye,pointsUvs:te.isPoints===!0&&!!C.attributes.uv&&(de||ce),fog:!!L,useFog:E.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:m,skinning:te.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:Z,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&H.length>0,shadowMapType:i.shadowMap.type,toneMapping:$e,useLegacyLights:i._useLegacyLights,decodeVideoTexture:de&&E.map.isVideoTexture===!0&&Je.getTransfer(E.map.colorSpace)===rt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===$t,flipSided:E.side===It,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:he&&E.extensions.derivatives===!0,extensionFragDepth:he&&E.extensions.fragDepth===!0,extensionDrawBuffers:he&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:he&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:he&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function l(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const H in E.defines)x.push(H),x.push(E.defines[H]);return E.isRawShaderMaterial===!1&&(M(x,E),S(x,E),x.push(i.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function M(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function S(E,x){a.disableAll(),x.isWebGL2&&a.enable(0),x.supportsVertexTextures&&a.enable(1),x.instancing&&a.enable(2),x.instancingColor&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),E.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.skinning&&a.enable(4),x.morphTargets&&a.enable(5),x.morphNormals&&a.enable(6),x.morphColors&&a.enable(7),x.premultipliedAlpha&&a.enable(8),x.shadowMapEnabled&&a.enable(9),x.useLegacyLights&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function b(E){const x=_[E.type];let H;if(x){const G=en[x];H=Ic.clone(G.uniforms)}else H=E.uniforms;return H}function R(E,x){let H;for(let G=0,te=u.length;G<te;G++){const L=u[G];if(L.cacheKey===x){H=L,++H.usedTimes;break}}return H===void 0&&(H=new $f(i,x,E,s),u.push(H)),H}function w(E){if(--E.usedTimes===0){const x=u.indexOf(E);u[x]=u[u.length-1],u.pop(),E.destroy()}}function A(E){c.remove(E)}function z(){c.dispose()}return{getParameters:d,getProgramCacheKey:l,getUniforms:b,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:z}}function Qf(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function ep(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function eo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function to(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(m,f,p,_,g,d){let l=i[e];return l===void 0?(l={id:m.id,object:m,geometry:f,material:p,groupOrder:_,renderOrder:m.renderOrder,z:g,group:d},i[e]=l):(l.id=m.id,l.object=m,l.geometry=f,l.material=p,l.groupOrder=_,l.renderOrder=m.renderOrder,l.z=g,l.group=d),e++,l}function a(m,f,p,_,g,d){const l=o(m,f,p,_,g,d);p.transmission>0?n.push(l):p.transparent===!0?r.push(l):t.push(l)}function c(m,f,p,_,g,d){const l=o(m,f,p,_,g,d);p.transmission>0?n.unshift(l):p.transparent===!0?r.unshift(l):t.unshift(l)}function u(m,f){t.length>1&&t.sort(m||ep),n.length>1&&n.sort(f||eo),r.length>1&&r.sort(f||eo)}function h(){for(let m=e,f=i.length;m<f;m++){const p=i[m];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:h,sort:u}}function tp(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new to,i.set(n,[o])):r>=s.length?(o=new to,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function np(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new K,color:new Qe};break;case"SpotLight":t={position:new K,direction:new K,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new K,halfWidth:new K,halfHeight:new K};break}return i[e.id]=t,t}}}function ip(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let rp=0;function sp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ap(i,e){const t=new np,n=ip(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new K);const s=new K,o=new St,a=new St;function c(h,m){let f=0,p=0,_=0;for(let G=0;G<9;G++)r.probe[G].set(0,0,0);let g=0,d=0,l=0,M=0,S=0,b=0,R=0,w=0,A=0,z=0,E=0;h.sort(sp);const x=m===!0?Math.PI:1;for(let G=0,te=h.length;G<te;G++){const L=h[G],C=L.color,U=L.intensity,B=L.distance,V=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=C.r*U*x,p+=C.g*U*x,_+=C.b*U*x;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)r.probe[Y].addScaledVector(L.sh.coefficients[Y],U);E++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*x),L.castShadow){const j=L.shadow,ee=n.get(L);ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,r.directionalShadow[g]=ee,r.directionalShadowMap[g]=V,r.directionalShadowMatrix[g]=L.shadow.matrix,b++}r.directional[g]=Y,g++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(C).multiplyScalar(U*x),Y.distance=B,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,r.spot[l]=Y;const j=L.shadow;if(L.map&&(r.spotLightMap[A]=L.map,A++,j.updateMatrices(L),L.castShadow&&z++),r.spotLightMatrix[l]=j.matrix,L.castShadow){const ee=n.get(L);ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,r.spotShadow[l]=ee,r.spotShadowMap[l]=V,w++}l++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(C).multiplyScalar(U),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),r.rectArea[M]=Y,M++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*x),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const j=L.shadow,ee=n.get(L);ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,ee.shadowCameraNear=j.camera.near,ee.shadowCameraFar=j.camera.far,r.pointShadow[d]=ee,r.pointShadowMap[d]=V,r.pointShadowMatrix[d]=L.shadow.matrix,R++}r.point[d]=Y,d++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(U*x),Y.groundColor.copy(L.groundColor).multiplyScalar(U*x),r.hemi[S]=Y,S++}}M>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ue.LTC_FLOAT_1,r.rectAreaLTC2=ue.LTC_FLOAT_2):(r.rectAreaLTC1=ue.LTC_HALF_1,r.rectAreaLTC2=ue.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ue.LTC_FLOAT_1,r.rectAreaLTC2=ue.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ue.LTC_HALF_1,r.rectAreaLTC2=ue.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=p,r.ambient[2]=_;const H=r.hash;(H.directionalLength!==g||H.pointLength!==d||H.spotLength!==l||H.rectAreaLength!==M||H.hemiLength!==S||H.numDirectionalShadows!==b||H.numPointShadows!==R||H.numSpotShadows!==w||H.numSpotMaps!==A||H.numLightProbes!==E)&&(r.directional.length=g,r.spot.length=l,r.rectArea.length=M,r.point.length=d,r.hemi.length=S,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=R,r.pointShadowMap.length=R,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=R,r.spotLightMatrix.length=w+A-z,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=z,r.numLightProbes=E,H.directionalLength=g,H.pointLength=d,H.spotLength=l,H.rectAreaLength=M,H.hemiLength=S,H.numDirectionalShadows=b,H.numPointShadows=R,H.numSpotShadows=w,H.numSpotMaps=A,H.numLightProbes=E,r.version=rp++)}function u(h,m){let f=0,p=0,_=0,g=0,d=0;const l=m.matrixWorldInverse;for(let M=0,S=h.length;M<S;M++){const b=h[M];if(b.isDirectionalLight){const R=r.directional[f];R.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(l),f++}else if(b.isSpotLight){const R=r.spot[_];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(l),R.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(l),_++}else if(b.isRectAreaLight){const R=r.rectArea[g];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(l),a.identity(),o.copy(b.matrixWorld),o.premultiply(l),a.extractRotation(o),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const R=r.point[p];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(l),p++}else if(b.isHemisphereLight){const R=r.hemi[d];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(l),d++}}}return{setup:c,setupView:u,state:r}}function no(i,e){const t=new ap(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(m){n.push(m)}function a(m){r.push(m)}function c(m){t.setup(n,m)}function u(m){t.setupView(n,m)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a}}function op(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let c;return a===void 0?(c=new no(i,e),t.set(s,[c])):o>=a.length?(c=new no(i,e),a.push(c)):c=a[o],c}function r(){t=new WeakMap}return{get:n,dispose:r}}class lp extends Lr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ic,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cp extends Lr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const dp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,up=`uniform sampler2D shadow_pass;
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
}`;function hp(i,e,t){let n=new Xo;const r=new je,s=new je,o=new Mt,a=new lp({depthPacking:rc}),c=new cp,u={},h=t.maxTextureSize,m={[An]:It,[It]:An,[$t]:$t},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:dp,fragmentShader:up}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new Vn;_.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new tn(_,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eo;let l=this.type;this.render=function(w,A,z){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),x=i.getActiveCubeFace(),H=i.getActiveMipmapLevel(),G=i.state;G.setBlending(yn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const te=l!==un&&this.type===un,L=l===un&&this.type!==un;for(let C=0,U=w.length;C<U;C++){const B=w[C],V=B.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const Y=V.getFrameExtents();if(r.multiply(Y),s.copy(V.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Y.x),r.x=s.x*Y.x,V.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Y.y),r.y=s.y*Y.y,V.mapSize.y=s.y)),V.map===null||te===!0||L===!0){const ee=this.type!==un?{minFilter:wt,magFilter:wt}:{};V.map!==null&&V.map.dispose(),V.map=new Hn(r.x,r.y,ee),V.map.texture.name=B.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const j=V.getViewportCount();for(let ee=0;ee<j;ee++){const Z=V.getViewport(ee);o.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),G.viewport(o),V.updateMatrices(B,ee),n=V.getFrustum(),b(A,z,V.camera,B,this.type)}V.isPointLightShadow!==!0&&this.type===un&&M(V,z),V.needsUpdate=!1}l=this.type,d.needsUpdate=!1,i.setRenderTarget(E,x,H)};function M(w,A){const z=e.update(g);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Hn(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,z,f,g,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,z,p,g,null)}function S(w,A,z,E){let x=null;const H=z.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(H!==void 0)x=H;else if(x=z.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const G=x.uuid,te=A.uuid;let L=u[G];L===void 0&&(L={},u[G]=L);let C=L[te];C===void 0&&(C=x.clone(),L[te]=C,A.addEventListener("dispose",R)),x=C}if(x.visible=A.visible,x.wireframe=A.wireframe,E===un?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:m[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,z.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const G=i.properties.get(x);G.light=z}return x}function b(w,A,z,E,x){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===un)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld);const te=e.update(w),L=w.material;if(Array.isArray(L)){const C=te.groups;for(let U=0,B=C.length;U<B;U++){const V=C[U],Y=L[V.materialIndex];if(Y&&Y.visible){const j=S(w,Y,E,x);w.onBeforeShadow(i,w,A,z,te,j,V),i.renderBufferDirect(z,null,te,j,w,V),w.onAfterShadow(i,w,A,z,te,j,V)}}}else if(L.visible){const C=S(w,L,E,x);w.onBeforeShadow(i,w,A,z,te,C,null),i.renderBufferDirect(z,null,te,C,w,null),w.onAfterShadow(i,w,A,z,te,C,null)}}const G=w.children;for(let te=0,L=G.length;te<L;te++)b(G[te],A,z,E,x)}function R(w){w.target.removeEventListener("dispose",R);for(const z in u){const E=u[z],x=w.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}function fp(i,e,t){const n=t.isWebGL2;function r(){let D=!1;const ge=new Mt;let he=null;const Ue=new Mt(0,0,0,0);return{setMask:function(De){he!==De&&!D&&(i.colorMask(De,De,De,De),he=De)},setLocked:function(De){D=De},setClear:function(De,Ye,$e,at,st){st===!0&&(De*=at,Ye*=at,$e*=at),ge.set(De,Ye,$e,at),Ue.equals(ge)===!1&&(i.clearColor(De,Ye,$e,at),Ue.copy(ge))},reset:function(){D=!1,he=null,Ue.set(-1,0,0,0)}}}function s(){let D=!1,ge=null,he=null,Ue=null;return{setTest:function(De){De?le(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(De){ge!==De&&!D&&(i.depthMask(De),ge=De)},setFunc:function(De){if(he!==De){switch(De){case Il:i.depthFunc(i.NEVER);break;case Ul:i.depthFunc(i.ALWAYS);break;case Nl:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case Fl:i.depthFunc(i.EQUAL);break;case Ol:i.depthFunc(i.GEQUAL);break;case Bl:i.depthFunc(i.GREATER);break;case zl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=De}},setLocked:function(De){D=De},setClear:function(De){Ue!==De&&(i.clearDepth(De),Ue=De)},reset:function(){D=!1,ge=null,he=null,Ue=null}}}function o(){let D=!1,ge=null,he=null,Ue=null,De=null,Ye=null,$e=null,at=null,st=null;return{setTest:function(Xe){D||(Xe?le(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(Xe){ge!==Xe&&!D&&(i.stencilMask(Xe),ge=Xe)},setFunc:function(Xe,ut,Ct){(he!==Xe||Ue!==ut||De!==Ct)&&(i.stencilFunc(Xe,ut,Ct),he=Xe,Ue=ut,De=Ct)},setOp:function(Xe,ut,Ct){(Ye!==Xe||$e!==ut||at!==Ct)&&(i.stencilOp(Xe,ut,Ct),Ye=Xe,$e=ut,at=Ct)},setLocked:function(Xe){D=Xe},setClear:function(Xe){st!==Xe&&(i.clearStencil(Xe),st=Xe)},reset:function(){D=!1,ge=null,he=null,Ue=null,De=null,Ye=null,$e=null,at=null,st=null}}}const a=new r,c=new s,u=new o,h=new WeakMap,m=new WeakMap;let f={},p={},_=new WeakMap,g=[],d=null,l=!1,M=null,S=null,b=null,R=null,w=null,A=null,z=null,E=new Qe(0,0,0),x=0,H=!1,G=null,te=null,L=null,C=null,U=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Y=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(j)[1]),V=Y>=1):j.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),V=Y>=2);let ee=null,Z={};const P=i.getParameter(i.SCISSOR_BOX),k=i.getParameter(i.VIEWPORT),N=new Mt().fromArray(P),Q=new Mt().fromArray(k);function ae(D,ge,he,Ue){const De=new Uint8Array(4),Ye=i.createTexture();i.bindTexture(D,Ye),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $e=0;$e<he;$e++)n&&(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)?i.texImage3D(ge,0,i.RGBA,1,1,Ue,0,i.RGBA,i.UNSIGNED_BYTE,De):i.texImage2D(ge+$e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,De);return Ye}const Me={};Me[i.TEXTURE_2D]=ae(i.TEXTURE_2D,i.TEXTURE_2D,1),Me[i.TEXTURE_CUBE_MAP]=ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Me[i.TEXTURE_2D_ARRAY]=ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Me[i.TEXTURE_3D]=ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),u.setClear(0),le(i.DEPTH_TEST),c.setFunc(xr),Ie(!1),T(Os),le(i.CULL_FACE),me(yn);function le(D){f[D]!==!0&&(i.enable(D),f[D]=!0)}function de(D){f[D]!==!1&&(i.disable(D),f[D]=!1)}function Te(D,ge){return p[D]!==ge?(i.bindFramebuffer(D,ge),p[D]=ge,n&&(D===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=ge),D===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=ge)),!0):!1}function F(D,ge){let he=g,Ue=!1;if(D)if(he=_.get(ge),he===void 0&&(he=[],_.set(ge,he)),D.isWebGLMultipleRenderTargets){const De=D.texture;if(he.length!==De.length||he[0]!==i.COLOR_ATTACHMENT0){for(let Ye=0,$e=De.length;Ye<$e;Ye++)he[Ye]=i.COLOR_ATTACHMENT0+Ye;he.length=De.length,Ue=!0}}else he[0]!==i.COLOR_ATTACHMENT0&&(he[0]=i.COLOR_ATTACHMENT0,Ue=!0);else he[0]!==i.BACK&&(he[0]=i.BACK,Ue=!0);Ue&&(t.isWebGL2?i.drawBuffers(he):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(he))}function Oe(D){return d!==D?(i.useProgram(D),d=D,!0):!1}const _e={[Nn]:i.FUNC_ADD,[vl]:i.FUNC_SUBTRACT,[xl]:i.FUNC_REVERSE_SUBTRACT};if(n)_e[Hs]=i.MIN,_e[Gs]=i.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(_e[Hs]=D.MIN_EXT,_e[Gs]=D.MAX_EXT)}const Ae={[Ml]:i.ZERO,[Sl]:i.ONE,[El]:i.SRC_COLOR,[ps]:i.SRC_ALPHA,[Cl]:i.SRC_ALPHA_SATURATE,[Al]:i.DST_COLOR,[bl]:i.DST_ALPHA,[yl]:i.ONE_MINUS_SRC_COLOR,[ms]:i.ONE_MINUS_SRC_ALPHA,[wl]:i.ONE_MINUS_DST_COLOR,[Tl]:i.ONE_MINUS_DST_ALPHA,[Rl]:i.CONSTANT_COLOR,[Ll]:i.ONE_MINUS_CONSTANT_COLOR,[Pl]:i.CONSTANT_ALPHA,[Dl]:i.ONE_MINUS_CONSTANT_ALPHA};function me(D,ge,he,Ue,De,Ye,$e,at,st,Xe){if(D===yn){l===!0&&(de(i.BLEND),l=!1);return}if(l===!1&&(le(i.BLEND),l=!0),D!==_l){if(D!==M||Xe!==H){if((S!==Nn||w!==Nn)&&(i.blendEquation(i.FUNC_ADD),S=Nn,w=Nn),Xe)switch(D){case ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bs:i.blendFunc(i.ONE,i.ONE);break;case zs:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ks:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bs:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case zs:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ks:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,R=null,A=null,z=null,E.set(0,0,0),x=0,M=D,H=Xe}return}De=De||ge,Ye=Ye||he,$e=$e||Ue,(ge!==S||De!==w)&&(i.blendEquationSeparate(_e[ge],_e[De]),S=ge,w=De),(he!==b||Ue!==R||Ye!==A||$e!==z)&&(i.blendFuncSeparate(Ae[he],Ae[Ue],Ae[Ye],Ae[$e]),b=he,R=Ue,A=Ye,z=$e),(at.equals(E)===!1||st!==x)&&(i.blendColor(at.r,at.g,at.b,st),E.copy(at),x=st),M=D,H=!1}function Ge(D,ge){D.side===$t?de(i.CULL_FACE):le(i.CULL_FACE);let he=D.side===It;ge&&(he=!he),Ie(he),D.blending===ui&&D.transparent===!1?me(yn):me(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),a.setMask(D.colorWrite);const Ue=D.stencilWrite;u.setTest(Ue),Ue&&(u.setMask(D.stencilWriteMask),u.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),u.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),W(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?le(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(D){G!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),G=D)}function T(D){D!==pl?(le(i.CULL_FACE),D!==te&&(D===Os?i.cullFace(i.BACK):D===ml?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),te=D}function v(D){D!==L&&(V&&i.lineWidth(D),L=D)}function W(D,ge,he){D?(le(i.POLYGON_OFFSET_FILL),(C!==ge||U!==he)&&(i.polygonOffset(ge,he),C=ge,U=he)):de(i.POLYGON_OFFSET_FILL)}function se(D){D?le(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function re(D){D===void 0&&(D=i.TEXTURE0+B-1),ee!==D&&(i.activeTexture(D),ee=D)}function ne(D,ge,he){he===void 0&&(ee===null?he=i.TEXTURE0+B-1:he=ee);let Ue=Z[he];Ue===void 0&&(Ue={type:void 0,texture:void 0},Z[he]=Ue),(Ue.type!==D||Ue.texture!==ge)&&(ee!==he&&(i.activeTexture(he),ee=he),i.bindTexture(D,ge||Me[D]),Ue.type=D,Ue.texture=ge)}function Ee(){const D=Z[ee];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function oe(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Fe(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function we(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ze(D){N.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),N.copy(D))}function qe(D){Q.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Q.copy(D))}function it(D,ge){let he=m.get(ge);he===void 0&&(he=new WeakMap,m.set(ge,he));let Ue=he.get(D);Ue===void 0&&(Ue=i.getUniformBlockIndex(ge,D.name),he.set(D,Ue))}function ke(D,ge){const Ue=m.get(ge).get(D);h.get(ge)!==Ue&&(i.uniformBlockBinding(ge,Ue,D.__bindingPointIndex),h.set(ge,Ue))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ee=null,Z={},p={},_=new WeakMap,g=[],d=null,l=!1,M=null,S=null,b=null,R=null,w=null,A=null,z=null,E=new Qe(0,0,0),x=0,H=!1,G=null,te=null,L=null,C=null,U=null,N.set(0,0,i.canvas.width,i.canvas.height),Q.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),u.reset()}return{buffers:{color:a,depth:c,stencil:u},enable:le,disable:de,bindFramebuffer:Te,drawBuffers:F,useProgram:Oe,setBlending:me,setMaterial:Ge,setFlipSided:Ie,setCullFace:T,setLineWidth:v,setPolygonOffset:W,setScissorTest:se,activeTexture:re,bindTexture:ne,unbindTexture:Ee,compressedTexImage2D:oe,compressedTexImage3D:xe,texImage2D:we,texImage3D:Se,updateUBOMapping:it,uniformBlockBinding:ke,texStorage2D:Fe,texStorage3D:Ne,texSubImage2D:Ce,texSubImage3D:Pe,compressedTexSubImage2D:ie,compressedTexSubImage3D:We,scissor:ze,viewport:qe,reset:ce}}function pp(i,e,t,n,r,s,o){const a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let m;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return p?new OffscreenCanvas(T,v):br("canvas")}function g(T,v,W,se){let re=1;if((T.width>se||T.height>se)&&(re=se/Math.max(T.width,T.height)),re<1||v===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const ne=v?Es:Math.floor,Ee=ne(re*T.width),oe=ne(re*T.height);m===void 0&&(m=_(Ee,oe));const xe=W?_(Ee,oe):m;return xe.width=Ee,xe.height=oe,xe.getContext("2d").drawImage(T,0,0,Ee,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+Ee+"x"+oe+")."),xe}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function d(T){return va(T.width)&&va(T.height)}function l(T){return a?!1:T.wrapS!==Kt||T.wrapT!==Kt||T.minFilter!==wt&&T.minFilter!==Pt}function M(T,v){return T.generateMipmaps&&v&&T.minFilter!==wt&&T.minFilter!==Pt}function S(T){i.generateMipmap(T)}function b(T,v,W,se,re=!1){if(a===!1)return v;if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ne=v;if(v===i.RED&&(W===i.FLOAT&&(ne=i.R32F),W===i.HALF_FLOAT&&(ne=i.R16F),W===i.UNSIGNED_BYTE&&(ne=i.R8)),v===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(ne=i.R8UI),W===i.UNSIGNED_SHORT&&(ne=i.R16UI),W===i.UNSIGNED_INT&&(ne=i.R32UI),W===i.BYTE&&(ne=i.R8I),W===i.SHORT&&(ne=i.R16I),W===i.INT&&(ne=i.R32I)),v===i.RG&&(W===i.FLOAT&&(ne=i.RG32F),W===i.HALF_FLOAT&&(ne=i.RG16F),W===i.UNSIGNED_BYTE&&(ne=i.RG8)),v===i.RGBA){const Ee=re?Mr:Je.getTransfer(se);W===i.FLOAT&&(ne=i.RGBA32F),W===i.HALF_FLOAT&&(ne=i.RGBA16F),W===i.UNSIGNED_BYTE&&(ne=Ee===rt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function R(T,v,W){return M(T,W)===!0||T.isFramebufferTexture&&T.minFilter!==wt&&T.minFilter!==Pt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function w(T){return T===wt||T===Vs||T===Ur?i.NEAREST:i.LINEAR}function A(T){const v=T.target;v.removeEventListener("dispose",A),E(v),v.isVideoTexture&&h.delete(v)}function z(T){const v=T.target;v.removeEventListener("dispose",z),H(v)}function E(T){const v=n.get(T);if(v.__webglInit===void 0)return;const W=T.source,se=f.get(W);if(se){const re=se[v.__cacheKey];re.usedTimes--,re.usedTimes===0&&x(T),Object.keys(se).length===0&&f.delete(W)}n.remove(T)}function x(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const W=T.source,se=f.get(W);delete se[v.__cacheKey],o.memory.textures--}function H(T){const v=T.texture,W=n.get(T),se=n.get(v);if(se.__webglTexture!==void 0&&(i.deleteTexture(se.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(W.__webglFramebuffer[re]))for(let ne=0;ne<W.__webglFramebuffer[re].length;ne++)i.deleteFramebuffer(W.__webglFramebuffer[re][ne]);else i.deleteFramebuffer(W.__webglFramebuffer[re]);W.__webglDepthbuffer&&i.deleteRenderbuffer(W.__webglDepthbuffer[re])}else{if(Array.isArray(W.__webglFramebuffer))for(let re=0;re<W.__webglFramebuffer.length;re++)i.deleteFramebuffer(W.__webglFramebuffer[re]);else i.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&i.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&i.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let re=0;re<W.__webglColorRenderbuffer.length;re++)W.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(W.__webglColorRenderbuffer[re]);W.__webglDepthRenderbuffer&&i.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let re=0,ne=v.length;re<ne;re++){const Ee=n.get(v[re]);Ee.__webglTexture&&(i.deleteTexture(Ee.__webglTexture),o.memory.textures--),n.remove(v[re])}n.remove(v),n.remove(T)}let G=0;function te(){G=0}function L(){const T=G;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),G+=1,T}function C(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function U(T,v){const W=n.get(T);if(T.isVideoTexture&&Ge(T),T.isRenderTargetTexture===!1&&T.version>0&&W.__version!==T.version){const se=T.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(W,T,v);return}}t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+v)}function B(T,v){const W=n.get(T);if(T.version>0&&W.__version!==T.version){N(W,T,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+v)}function V(T,v){const W=n.get(T);if(T.version>0&&W.__version!==T.version){N(W,T,v);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+v)}function Y(T,v){const W=n.get(T);if(T.version>0&&W.__version!==T.version){Q(W,T,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+v)}const j={[vs]:i.REPEAT,[Kt]:i.CLAMP_TO_EDGE,[xs]:i.MIRRORED_REPEAT},ee={[wt]:i.NEAREST,[Vs]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[Pt]:i.LINEAR,[$l]:i.LINEAR_MIPMAP_NEAREST,[Pi]:i.LINEAR_MIPMAP_LINEAR},Z={[oc]:i.NEVER,[fc]:i.ALWAYS,[lc]:i.LESS,[Io]:i.LEQUAL,[cc]:i.EQUAL,[hc]:i.GEQUAL,[dc]:i.GREATER,[uc]:i.NOTEQUAL};function P(T,v,W){if(W?(i.texParameteri(T,i.TEXTURE_WRAP_S,j[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,j[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,j[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ee[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ee[v.minFilter])):(i.texParameteri(T,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(T,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==Kt||v.wrapT!==Kt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(T,i.TEXTURE_MAG_FILTER,w(v.magFilter)),i.texParameteri(T,i.TEXTURE_MIN_FILTER,w(v.minFilter)),v.minFilter!==wt&&v.minFilter!==Pt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Z[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const se=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===wt||v.minFilter!==Ur&&v.minFilter!==Pi||v.type===En&&e.has("OES_texture_float_linear")===!1||a===!1&&v.type===Di&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(T,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function k(T,v){let W=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",A));const se=v.source;let re=f.get(se);re===void 0&&(re={},f.set(se,re));const ne=C(v);if(ne!==T.__cacheKey){re[ne]===void 0&&(re[ne]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),re[ne].usedTimes++;const Ee=re[T.__cacheKey];Ee!==void 0&&(re[T.__cacheKey].usedTimes--,Ee.usedTimes===0&&x(v)),T.__cacheKey=ne,T.__webglTexture=re[ne].texture}return W}function N(T,v,W){let se=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(se=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(se=i.TEXTURE_3D);const re=k(T,v),ne=v.source;t.bindTexture(se,T.__webglTexture,i.TEXTURE0+W);const Ee=n.get(ne);if(ne.version!==Ee.__version||re===!0){t.activeTexture(i.TEXTURE0+W);const oe=Je.getPrimaries(Je.workingColorSpace),xe=v.colorSpace===Ht?null:Je.getPrimaries(v.colorSpace),Ce=v.colorSpace===Ht||oe===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Pe=l(v)&&d(v.image)===!1;let ie=g(v.image,Pe,!1,r.maxTextureSize);ie=Ie(v,ie);const We=d(ie)||a,Fe=s.convert(v.format,v.colorSpace);let Ne=s.convert(v.type),we=b(v.internalFormat,Fe,Ne,v.colorSpace,v.isVideoTexture);P(se,v,We);let Se;const ze=v.mipmaps,qe=a&&v.isVideoTexture!==!0&&we!==Po,it=Ee.__version===void 0||re===!0,ke=R(v,ie,We);if(v.isDepthTexture)we=i.DEPTH_COMPONENT,a?v.type===En?we=i.DEPTH_COMPONENT32F:v.type===Sn?we=i.DEPTH_COMPONENT24:v.type===On?we=i.DEPTH24_STENCIL8:we=i.DEPTH_COMPONENT16:v.type===En&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Bn&&we===i.DEPTH_COMPONENT&&v.type!==Cs&&v.type!==Sn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=Sn,Ne=s.convert(v.type)),v.format===mi&&we===i.DEPTH_COMPONENT&&(we=i.DEPTH_STENCIL,v.type!==On&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=On,Ne=s.convert(v.type))),it&&(qe?t.texStorage2D(i.TEXTURE_2D,1,we,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,we,ie.width,ie.height,0,Fe,Ne,null));else if(v.isDataTexture)if(ze.length>0&&We){qe&&it&&t.texStorage2D(i.TEXTURE_2D,ke,we,ze[0].width,ze[0].height);for(let ce=0,D=ze.length;ce<D;ce++)Se=ze[ce],qe?t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Se.width,Se.height,Fe,Ne,Se.data):t.texImage2D(i.TEXTURE_2D,ce,we,Se.width,Se.height,0,Fe,Ne,Se.data);v.generateMipmaps=!1}else qe?(it&&t.texStorage2D(i.TEXTURE_2D,ke,we,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,Fe,Ne,ie.data)):t.texImage2D(i.TEXTURE_2D,0,we,ie.width,ie.height,0,Fe,Ne,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){qe&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,we,ze[0].width,ze[0].height,ie.depth);for(let ce=0,D=ze.length;ce<D;ce++)Se=ze[ce],v.format!==jt?Fe!==null?qe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Se.width,Se.height,ie.depth,Fe,Se.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ce,we,Se.width,Se.height,ie.depth,0,Se.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Se.width,Se.height,ie.depth,Fe,Ne,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ce,we,Se.width,Se.height,ie.depth,0,Fe,Ne,Se.data)}else{qe&&it&&t.texStorage2D(i.TEXTURE_2D,ke,we,ze[0].width,ze[0].height);for(let ce=0,D=ze.length;ce<D;ce++)Se=ze[ce],v.format!==jt?Fe!==null?qe?t.compressedTexSubImage2D(i.TEXTURE_2D,ce,0,0,Se.width,Se.height,Fe,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,ce,we,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Se.width,Se.height,Fe,Ne,Se.data):t.texImage2D(i.TEXTURE_2D,ce,we,Se.width,Se.height,0,Fe,Ne,Se.data)}else if(v.isDataArrayTexture)qe?(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,we,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Fe,Ne,ie.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,ie.width,ie.height,ie.depth,0,Fe,Ne,ie.data);else if(v.isData3DTexture)qe?(it&&t.texStorage3D(i.TEXTURE_3D,ke,we,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Fe,Ne,ie.data)):t.texImage3D(i.TEXTURE_3D,0,we,ie.width,ie.height,ie.depth,0,Fe,Ne,ie.data);else if(v.isFramebufferTexture){if(it)if(qe)t.texStorage2D(i.TEXTURE_2D,ke,we,ie.width,ie.height);else{let ce=ie.width,D=ie.height;for(let ge=0;ge<ke;ge++)t.texImage2D(i.TEXTURE_2D,ge,we,ce,D,0,Fe,Ne,null),ce>>=1,D>>=1}}else if(ze.length>0&&We){qe&&it&&t.texStorage2D(i.TEXTURE_2D,ke,we,ze[0].width,ze[0].height);for(let ce=0,D=ze.length;ce<D;ce++)Se=ze[ce],qe?t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Fe,Ne,Se):t.texImage2D(i.TEXTURE_2D,ce,we,Fe,Ne,Se);v.generateMipmaps=!1}else qe?(it&&t.texStorage2D(i.TEXTURE_2D,ke,we,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Fe,Ne,ie)):t.texImage2D(i.TEXTURE_2D,0,we,Fe,Ne,ie);M(v,We)&&S(se),Ee.__version=ne.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Q(T,v,W){if(v.image.length!==6)return;const se=k(T,v),re=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+W);const ne=n.get(re);if(re.version!==ne.__version||se===!0){t.activeTexture(i.TEXTURE0+W);const Ee=Je.getPrimaries(Je.workingColorSpace),oe=v.colorSpace===Ht?null:Je.getPrimaries(v.colorSpace),xe=v.colorSpace===Ht||Ee===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ce=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,ie=[];for(let ce=0;ce<6;ce++)!Ce&&!Pe?ie[ce]=g(v.image[ce],!1,!0,r.maxCubemapSize):ie[ce]=Pe?v.image[ce].image:v.image[ce],ie[ce]=Ie(v,ie[ce]);const We=ie[0],Fe=d(We)||a,Ne=s.convert(v.format,v.colorSpace),we=s.convert(v.type),Se=b(v.internalFormat,Ne,we,v.colorSpace),ze=a&&v.isVideoTexture!==!0,qe=ne.__version===void 0||se===!0;let it=R(v,We,Fe);P(i.TEXTURE_CUBE_MAP,v,Fe);let ke;if(Ce){ze&&qe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,it,Se,We.width,We.height);for(let ce=0;ce<6;ce++){ke=ie[ce].mipmaps;for(let D=0;D<ke.length;D++){const ge=ke[D];v.format!==jt?Ne!==null?ze?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,0,0,ge.width,ge.height,Ne,ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,Se,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,0,0,ge.width,ge.height,Ne,we,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,Se,ge.width,ge.height,0,Ne,we,ge.data)}}}else{ke=v.mipmaps,ze&&qe&&(ke.length>0&&it++,t.texStorage2D(i.TEXTURE_CUBE_MAP,it,Se,ie[0].width,ie[0].height));for(let ce=0;ce<6;ce++)if(Pe){ze?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ie[ce].width,ie[ce].height,Ne,we,ie[ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Se,ie[ce].width,ie[ce].height,0,Ne,we,ie[ce].data);for(let D=0;D<ke.length;D++){const he=ke[D].image[ce].image;ze?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,0,0,he.width,he.height,Ne,we,he.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,Se,he.width,he.height,0,Ne,we,he.data)}}else{ze?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ne,we,ie[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Se,Ne,we,ie[ce]);for(let D=0;D<ke.length;D++){const ge=ke[D];ze?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,0,0,Ne,we,ge.image[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,Se,Ne,we,ge.image[ce])}}}M(v,Fe)&&S(i.TEXTURE_CUBE_MAP),ne.__version=re.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ae(T,v,W,se,re,ne){const Ee=s.convert(W.format,W.colorSpace),oe=s.convert(W.type),xe=b(W.internalFormat,Ee,oe,W.colorSpace);if(!n.get(v).__hasExternalTextures){const Pe=Math.max(1,v.width>>ne),ie=Math.max(1,v.height>>ne);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,ne,xe,Pe,ie,v.depth,0,Ee,oe,null):t.texImage2D(re,ne,xe,Pe,ie,0,Ee,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),me(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,re,n.get(W).__webglTexture,0,Ae(v)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,se,re,n.get(W).__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Me(T,v,W){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer&&!v.stencilBuffer){let se=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(W||me(v)){const re=v.depthTexture;re&&re.isDepthTexture&&(re.type===En?se=i.DEPTH_COMPONENT32F:re.type===Sn&&(se=i.DEPTH_COMPONENT24));const ne=Ae(v);me(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,se,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,se,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,se,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,T)}else if(v.depthBuffer&&v.stencilBuffer){const se=Ae(v);W&&me(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,v.width,v.height):me(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,T)}else{const se=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let re=0;re<se.length;re++){const ne=se[re],Ee=s.convert(ne.format,ne.colorSpace),oe=s.convert(ne.type),xe=b(ne.internalFormat,Ee,oe,ne.colorSpace),Ce=Ae(v);W&&me(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,xe,v.width,v.height):me(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ce,xe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,xe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function le(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),U(v.depthTexture,0);const se=n.get(v.depthTexture).__webglTexture,re=Ae(v);if(v.depthTexture.format===Bn)me(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(v.depthTexture.format===mi)me(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function de(T){const v=n.get(T),W=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");le(v.__webglFramebuffer,T)}else if(W){v.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[se]),v.__webglDepthbuffer[se]=i.createRenderbuffer(),Me(v.__webglDepthbuffer[se],T,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),Me(v.__webglDepthbuffer,T,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(T,v,W){const se=n.get(T);v!==void 0&&ae(se.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&de(T)}function F(T){const v=T.texture,W=n.get(T),se=n.get(v);T.addEventListener("dispose",z),T.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture()),se.__version=v.version,o.memory.textures++);const re=T.isWebGLCubeRenderTarget===!0,ne=T.isWebGLMultipleRenderTargets===!0,Ee=d(T)||a;if(re){W.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer[oe]=[];for(let xe=0;xe<v.mipmaps.length;xe++)W.__webglFramebuffer[oe][xe]=i.createFramebuffer()}else W.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(a&&v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer=[];for(let oe=0;oe<v.mipmaps.length;oe++)W.__webglFramebuffer[oe]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(ne)if(r.drawBuffers){const oe=T.texture;for(let xe=0,Ce=oe.length;xe<Ce;xe++){const Pe=n.get(oe[xe]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&me(T)===!1){const oe=ne?v:[v];W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let xe=0;xe<oe.length;xe++){const Ce=oe[xe];W.__webglColorRenderbuffer[xe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[xe]);const Pe=s.convert(Ce.format,Ce.colorSpace),ie=s.convert(Ce.type),We=b(Ce.internalFormat,Pe,ie,Ce.colorSpace,T.isXRRenderTarget===!0),Fe=Ae(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,We,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,W.__webglColorRenderbuffer[xe])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),Me(W.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),P(i.TEXTURE_CUBE_MAP,v,Ee);for(let oe=0;oe<6;oe++)if(a&&v.mipmaps&&v.mipmaps.length>0)for(let xe=0;xe<v.mipmaps.length;xe++)ae(W.__webglFramebuffer[oe][xe],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe);else ae(W.__webglFramebuffer[oe],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);M(v,Ee)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const oe=T.texture;for(let xe=0,Ce=oe.length;xe<Ce;xe++){const Pe=oe[xe],ie=n.get(Pe);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),P(i.TEXTURE_2D,Pe,Ee),ae(W.__webglFramebuffer,T,Pe,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,0),M(Pe,Ee)&&S(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?oe=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,se.__webglTexture),P(oe,v,Ee),a&&v.mipmaps&&v.mipmaps.length>0)for(let xe=0;xe<v.mipmaps.length;xe++)ae(W.__webglFramebuffer[xe],T,v,i.COLOR_ATTACHMENT0,oe,xe);else ae(W.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,oe,0);M(v,Ee)&&S(oe),t.unbindTexture()}T.depthBuffer&&de(T)}function Oe(T){const v=d(T)||a,W=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let se=0,re=W.length;se<re;se++){const ne=W[se];if(M(ne,v)){const Ee=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,oe=n.get(ne).__webglTexture;t.bindTexture(Ee,oe),S(Ee),t.unbindTexture()}}}function _e(T){if(a&&T.samples>0&&me(T)===!1){const v=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],W=T.width,se=T.height;let re=i.COLOR_BUFFER_BIT;const ne=[],Ee=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(T),xe=T.isWebGLMultipleRenderTargets===!0;if(xe)for(let Ce=0;Ce<v.length;Ce++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Ce=0;Ce<v.length;Ce++){ne.push(i.COLOR_ATTACHMENT0+Ce),T.depthBuffer&&ne.push(Ee);const Pe=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Pe===!1&&(T.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),xe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Ce]),Pe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Ee]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Ee])),xe){const ie=n.get(v[Ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,W,se,0,0,W,se,re,i.NEAREST),u&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xe)for(let Ce=0;Ce<v.length;Ce++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Ce]);const Pe=n.get(v[Ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Ae(T){return Math.min(r.maxSamples,T.samples)}function me(T){const v=n.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ge(T){const v=o.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Ie(T,v){const W=T.colorSpace,se=T.format,re=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===Ms||W!==fn&&W!==Ht&&(Je.getTransfer(W)===rt?a===!1?e.has("EXT_sRGB")===!0&&se===jt?(T.format=Ms,T.minFilter=Pt,T.generateMipmaps=!1):v=No.sRGBToLinear(v):(se!==jt||re!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),v}this.allocateTextureUnit=L,this.resetTextureUnits=te,this.setTexture2D=U,this.setTexture2DArray=B,this.setTexture3D=V,this.setTextureCube=Y,this.rebindTextures=Te,this.setupRenderTarget=F,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=me}function mp(i,e,t){const n=t.isWebGL2;function r(s,o=Ht){let a;const c=Je.getTransfer(o);if(s===Tn)return i.UNSIGNED_BYTE;if(s===Ao)return i.UNSIGNED_SHORT_4_4_4_4;if(s===wo)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Kl)return i.BYTE;if(s===jl)return i.SHORT;if(s===Cs)return i.UNSIGNED_SHORT;if(s===To)return i.INT;if(s===Sn)return i.UNSIGNED_INT;if(s===En)return i.FLOAT;if(s===Di)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Zl)return i.ALPHA;if(s===jt)return i.RGBA;if(s===Jl)return i.LUMINANCE;if(s===Ql)return i.LUMINANCE_ALPHA;if(s===Bn)return i.DEPTH_COMPONENT;if(s===mi)return i.DEPTH_STENCIL;if(s===Ms)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===ec)return i.RED;if(s===Co)return i.RED_INTEGER;if(s===tc)return i.RG;if(s===Ro)return i.RG_INTEGER;if(s===Lo)return i.RGBA_INTEGER;if(s===Nr||s===Fr||s===Or||s===Br)if(c===rt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Nr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Fr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Or)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Br)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Nr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Fr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Or)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Br)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ws||s===Xs||s===qs||s===Ys)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ws)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Xs)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===qs)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ys)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Po)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===$s||s===Ks)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===$s)return c===rt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ks)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===js||s===Zs||s===Js||s===Qs||s===ea||s===ta||s===na||s===ia||s===ra||s===sa||s===aa||s===oa||s===la||s===ca)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===js)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Zs)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Js)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Qs)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ea)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ta)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===na)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ia)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ra)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===sa)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===aa)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===oa)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===la)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ca)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===zr||s===da||s===ua)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===zr)return c===rt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===da)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ua)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===nc||s===ha||s===fa||s===pa)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===zr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===ha)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===fa)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===pa)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===On?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class gp extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class pr extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _p={type:"move"};class ds{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const g of e.hand.values()){const d=t.getJointPose(g,n),l=this._getHandJoint(u,g);d!==null&&(l.matrix.fromArray(d.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,l.jointRadius=d.radius),l.visible=d!==null}const h=u.joints["index-finger-tip"],m=u.joints["thumb-tip"],f=h.position.distanceTo(m.position),p=.02,_=.005;u.inputState.pinching&&f>p+_?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&f<=p-_&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_p)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class vp extends _i{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,u=null,h=null,m=null,f=null,p=null,_=null;const g=t.getContextAttributes();let d=null,l=null;const M=[],S=[],b=new je;let R=null;const w=new Yt;w.layers.enable(1),w.viewport=new Mt;const A=new Yt;A.layers.enable(2),A.viewport=new Mt;const z=[w,A],E=new gp;E.layers.enable(1),E.layers.enable(2);let x=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(P){let k=M[P];return k===void 0&&(k=new ds,M[P]=k),k.getTargetRaySpace()},this.getControllerGrip=function(P){let k=M[P];return k===void 0&&(k=new ds,M[P]=k),k.getGripSpace()},this.getHand=function(P){let k=M[P];return k===void 0&&(k=new ds,M[P]=k),k.getHandSpace()};function G(P){const k=S.indexOf(P.inputSource);if(k===-1)return;const N=M[k];N!==void 0&&(N.update(P.inputSource,P.frame,u||o),N.dispatchEvent({type:P.type,data:P.inputSource}))}function te(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",te),r.removeEventListener("inputsourceschange",L);for(let P=0;P<M.length;P++){const k=S[P];k!==null&&(S[P]=null,M[P].disconnect(k))}x=null,H=null,e.setRenderTarget(d),p=null,f=null,m=null,r=null,l=null,Z.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(P){s=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(P){a=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(P){u=P},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return m},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(P){if(r=P,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",te),r.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const k={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,k),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),l=new Hn(p.framebufferWidth,p.framebufferHeight,{format:jt,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let k=null,N=null,Q=null;g.depth&&(Q=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,k=g.stencil?mi:Bn,N=g.stencil?On:Sn);const ae={colorFormat:t.RGBA8,depthFormat:Q,scaleFactor:s};m=new XRWebGLBinding(r,t),f=m.createProjectionLayer(ae),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),l=new Hn(f.textureWidth,f.textureHeight,{format:jt,type:Tn,depthTexture:new $o(f.textureWidth,f.textureHeight,N,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Me=e.properties.get(l);Me.__ignoreDepthValues=f.ignoreDepthValues}l.isXRRenderTarget=!0,this.setFoveation(c),u=null,o=await r.requestReferenceSpace(a),Z.setContext(r),Z.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(P){for(let k=0;k<P.removed.length;k++){const N=P.removed[k],Q=S.indexOf(N);Q>=0&&(S[Q]=null,M[Q].disconnect(N))}for(let k=0;k<P.added.length;k++){const N=P.added[k];let Q=S.indexOf(N);if(Q===-1){for(let Me=0;Me<M.length;Me++)if(Me>=S.length){S.push(N),Q=Me;break}else if(S[Me]===null){S[Me]=N,Q=Me;break}if(Q===-1)break}const ae=M[Q];ae&&ae.connect(N)}}const C=new K,U=new K;function B(P,k,N){C.setFromMatrixPosition(k.matrixWorld),U.setFromMatrixPosition(N.matrixWorld);const Q=C.distanceTo(U),ae=k.projectionMatrix.elements,Me=N.projectionMatrix.elements,le=ae[14]/(ae[10]-1),de=ae[14]/(ae[10]+1),Te=(ae[9]+1)/ae[5],F=(ae[9]-1)/ae[5],Oe=(ae[8]-1)/ae[0],_e=(Me[8]+1)/Me[0],Ae=le*Oe,me=le*_e,Ge=Q/(-Oe+_e),Ie=Ge*-Oe;k.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(Ie),P.translateZ(Ge),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert();const T=le+Ge,v=de+Ge,W=Ae-Ie,se=me+(Q-Ie),re=Te*de/v*T,ne=F*de/v*T;P.projectionMatrix.makePerspective(W,se,re,ne,T,v),P.projectionMatrixInverse.copy(P.projectionMatrix).invert()}function V(P,k){k===null?P.matrixWorld.copy(P.matrix):P.matrixWorld.multiplyMatrices(k.matrixWorld,P.matrix),P.matrixWorldInverse.copy(P.matrixWorld).invert()}this.updateCamera=function(P){if(r===null)return;E.near=A.near=w.near=P.near,E.far=A.far=w.far=P.far,(x!==E.near||H!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),x=E.near,H=E.far);const k=P.parent,N=E.cameras;V(E,k);for(let Q=0;Q<N.length;Q++)V(N[Q],k);N.length===2?B(E,w,A):E.projectionMatrix.copy(w.projectionMatrix),Y(P,E,k)};function Y(P,k,N){N===null?P.matrix.copy(k.matrixWorld):(P.matrix.copy(N.matrixWorld),P.matrix.invert(),P.matrix.multiply(k.matrixWorld)),P.matrix.decompose(P.position,P.quaternion,P.scale),P.updateMatrixWorld(!0),P.projectionMatrix.copy(k.projectionMatrix),P.projectionMatrixInverse.copy(k.projectionMatrixInverse),P.isPerspectiveCamera&&(P.fov=Ss*2*Math.atan(1/P.projectionMatrix.elements[5]),P.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(P){c=P,f!==null&&(f.fixedFoveation=P),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=P)};let j=null;function ee(P,k){if(h=k.getViewerPose(u||o),_=k,h!==null){const N=h.views;p!==null&&(e.setRenderTargetFramebuffer(l,p.framebuffer),e.setRenderTarget(l));let Q=!1;N.length!==E.cameras.length&&(E.cameras.length=0,Q=!0);for(let ae=0;ae<N.length;ae++){const Me=N[ae];let le=null;if(p!==null)le=p.getViewport(Me);else{const Te=m.getViewSubImage(f,Me);le=Te.viewport,ae===0&&(e.setRenderTargetTextures(l,Te.colorTexture,f.ignoreDepthValues?void 0:Te.depthStencilTexture),e.setRenderTarget(l))}let de=z[ae];de===void 0&&(de=new Yt,de.layers.enable(ae),de.viewport=new Mt,z[ae]=de),de.matrix.fromArray(Me.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(Me.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(le.x,le.y,le.width,le.height),ae===0&&(E.matrix.copy(de.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Q===!0&&E.cameras.push(de)}}for(let N=0;N<M.length;N++){const Q=S[N],ae=M[N];Q!==null&&ae!==void 0&&ae.update(Q,k,u||o)}j&&j(P,k),k.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:k}),_=null}const Z=new qo;Z.setAnimationLoop(ee),this.setAnimationLoop=function(P){j=P},this.dispose=function(){}}}function xp(i,e){function t(d,l){d.matrixAutoUpdate===!0&&d.updateMatrix(),l.value.copy(d.matrix)}function n(d,l){l.color.getRGB(d.fogColor.value,Go(i)),l.isFog?(d.fogNear.value=l.near,d.fogFar.value=l.far):l.isFogExp2&&(d.fogDensity.value=l.density)}function r(d,l,M,S,b){l.isMeshBasicMaterial||l.isMeshLambertMaterial?s(d,l):l.isMeshToonMaterial?(s(d,l),m(d,l)):l.isMeshPhongMaterial?(s(d,l),h(d,l)):l.isMeshStandardMaterial?(s(d,l),f(d,l),l.isMeshPhysicalMaterial&&p(d,l,b)):l.isMeshMatcapMaterial?(s(d,l),_(d,l)):l.isMeshDepthMaterial?s(d,l):l.isMeshDistanceMaterial?(s(d,l),g(d,l)):l.isMeshNormalMaterial?s(d,l):l.isLineBasicMaterial?(o(d,l),l.isLineDashedMaterial&&a(d,l)):l.isPointsMaterial?c(d,l,M,S):l.isSpriteMaterial?u(d,l):l.isShadowMaterial?(d.color.value.copy(l.color),d.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function s(d,l){d.opacity.value=l.opacity,l.color&&d.diffuse.value.copy(l.color),l.emissive&&d.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(d.map.value=l.map,t(l.map,d.mapTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,t(l.alphaMap,d.alphaMapTransform)),l.bumpMap&&(d.bumpMap.value=l.bumpMap,t(l.bumpMap,d.bumpMapTransform),d.bumpScale.value=l.bumpScale,l.side===It&&(d.bumpScale.value*=-1)),l.normalMap&&(d.normalMap.value=l.normalMap,t(l.normalMap,d.normalMapTransform),d.normalScale.value.copy(l.normalScale),l.side===It&&d.normalScale.value.negate()),l.displacementMap&&(d.displacementMap.value=l.displacementMap,t(l.displacementMap,d.displacementMapTransform),d.displacementScale.value=l.displacementScale,d.displacementBias.value=l.displacementBias),l.emissiveMap&&(d.emissiveMap.value=l.emissiveMap,t(l.emissiveMap,d.emissiveMapTransform)),l.specularMap&&(d.specularMap.value=l.specularMap,t(l.specularMap,d.specularMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest);const M=e.get(l).envMap;if(M&&(d.envMap.value=M,d.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=l.reflectivity,d.ior.value=l.ior,d.refractionRatio.value=l.refractionRatio),l.lightMap){d.lightMap.value=l.lightMap;const S=i._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=l.lightMapIntensity*S,t(l.lightMap,d.lightMapTransform)}l.aoMap&&(d.aoMap.value=l.aoMap,d.aoMapIntensity.value=l.aoMapIntensity,t(l.aoMap,d.aoMapTransform))}function o(d,l){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,l.map&&(d.map.value=l.map,t(l.map,d.mapTransform))}function a(d,l){d.dashSize.value=l.dashSize,d.totalSize.value=l.dashSize+l.gapSize,d.scale.value=l.scale}function c(d,l,M,S){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,d.size.value=l.size*M,d.scale.value=S*.5,l.map&&(d.map.value=l.map,t(l.map,d.uvTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,t(l.alphaMap,d.alphaMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest)}function u(d,l){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,d.rotation.value=l.rotation,l.map&&(d.map.value=l.map,t(l.map,d.mapTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,t(l.alphaMap,d.alphaMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest)}function h(d,l){d.specular.value.copy(l.specular),d.shininess.value=Math.max(l.shininess,1e-4)}function m(d,l){l.gradientMap&&(d.gradientMap.value=l.gradientMap)}function f(d,l){d.metalness.value=l.metalness,l.metalnessMap&&(d.metalnessMap.value=l.metalnessMap,t(l.metalnessMap,d.metalnessMapTransform)),d.roughness.value=l.roughness,l.roughnessMap&&(d.roughnessMap.value=l.roughnessMap,t(l.roughnessMap,d.roughnessMapTransform)),e.get(l).envMap&&(d.envMapIntensity.value=l.envMapIntensity)}function p(d,l,M){d.ior.value=l.ior,l.sheen>0&&(d.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),d.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(d.sheenColorMap.value=l.sheenColorMap,t(l.sheenColorMap,d.sheenColorMapTransform)),l.sheenRoughnessMap&&(d.sheenRoughnessMap.value=l.sheenRoughnessMap,t(l.sheenRoughnessMap,d.sheenRoughnessMapTransform))),l.clearcoat>0&&(d.clearcoat.value=l.clearcoat,d.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(d.clearcoatMap.value=l.clearcoatMap,t(l.clearcoatMap,d.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,t(l.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(d.clearcoatNormalMap.value=l.clearcoatNormalMap,t(l.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===It&&d.clearcoatNormalScale.value.negate())),l.iridescence>0&&(d.iridescence.value=l.iridescence,d.iridescenceIOR.value=l.iridescenceIOR,d.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(d.iridescenceMap.value=l.iridescenceMap,t(l.iridescenceMap,d.iridescenceMapTransform)),l.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=l.iridescenceThicknessMap,t(l.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),l.transmission>0&&(d.transmission.value=l.transmission,d.transmissionSamplerMap.value=M.texture,d.transmissionSamplerSize.value.set(M.width,M.height),l.transmissionMap&&(d.transmissionMap.value=l.transmissionMap,t(l.transmissionMap,d.transmissionMapTransform)),d.thickness.value=l.thickness,l.thicknessMap&&(d.thicknessMap.value=l.thicknessMap,t(l.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=l.attenuationDistance,d.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(d.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(d.anisotropyMap.value=l.anisotropyMap,t(l.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=l.specularIntensity,d.specularColor.value.copy(l.specularColor),l.specularColorMap&&(d.specularColorMap.value=l.specularColorMap,t(l.specularColorMap,d.specularColorMapTransform)),l.specularIntensityMap&&(d.specularIntensityMap.value=l.specularIntensityMap,t(l.specularIntensityMap,d.specularIntensityMapTransform))}function _(d,l){l.matcap&&(d.matcap.value=l.matcap)}function g(d,l){const M=e.get(l).light;d.referencePosition.value.setFromMatrixPosition(M.matrixWorld),d.nearDistance.value=M.shadow.camera.near,d.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Mp(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(M,S){const b=S.program;n.uniformBlockBinding(M,b)}function u(M,S){let b=r[M.id];b===void 0&&(_(M),b=h(M),r[M.id]=b,M.addEventListener("dispose",d));const R=S.program;n.updateUBOMapping(M,R);const w=e.render.frame;s[M.id]!==w&&(f(M),s[M.id]=w)}function h(M){const S=m();M.__bindingPointIndex=S;const b=i.createBuffer(),R=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,b),b}function m(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const S=r[M.id],b=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,A=b.length;w<A;w++){const z=Array.isArray(b[w])?b[w]:[b[w]];for(let E=0,x=z.length;E<x;E++){const H=z[E];if(p(H,w,E,R)===!0){const G=H.__offset,te=Array.isArray(H.value)?H.value:[H.value];let L=0;for(let C=0;C<te.length;C++){const U=te[C],B=g(U);typeof U=="number"||typeof U=="boolean"?(H.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,G+L,H.__data)):U.isMatrix3?(H.__data[0]=U.elements[0],H.__data[1]=U.elements[1],H.__data[2]=U.elements[2],H.__data[3]=0,H.__data[4]=U.elements[3],H.__data[5]=U.elements[4],H.__data[6]=U.elements[5],H.__data[7]=0,H.__data[8]=U.elements[6],H.__data[9]=U.elements[7],H.__data[10]=U.elements[8],H.__data[11]=0):(U.toArray(H.__data,L),L+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,H.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,S,b,R){const w=M.value,A=S+"_"+b;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const z=R[A];if(typeof w=="number"||typeof w=="boolean"){if(z!==w)return R[A]=w,!0}else if(z.equals(w)===!1)return z.copy(w),!0}return!1}function _(M){const S=M.uniforms;let b=0;const R=16;for(let A=0,z=S.length;A<z;A++){const E=Array.isArray(S[A])?S[A]:[S[A]];for(let x=0,H=E.length;x<H;x++){const G=E[x],te=Array.isArray(G.value)?G.value:[G.value];for(let L=0,C=te.length;L<C;L++){const U=te[L],B=g(U),V=b%R;V!==0&&R-V<B.boundary&&(b+=R-V),G.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=b,b+=B.storage}}}const w=b%R;return w>0&&(b+=R-w),M.__size=b,M.__cache={},this}function g(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function d(M){const S=M.target;S.removeEventListener("dispose",d);const b=o.indexOf(S.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function l(){for(const M in r)i.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:c,update:u,dispose:l}}class el{constructor(e={}){const{canvas:t=mc(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,d=null;const l=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xt,this._useLegacyLights=!1,this.toneMapping=bn,this.toneMappingExposure=1;const S=this;let b=!1,R=0,w=0,A=null,z=-1,E=null;const x=new Mt,H=new Mt;let G=null;const te=new Qe(0);let L=0,C=t.width,U=t.height,B=1,V=null,Y=null;const j=new Mt(0,0,C,U),ee=new Mt(0,0,C,U);let Z=!1;const P=new Xo;let k=!1,N=!1,Q=null;const ae=new St,Me=new je,le=new K,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Te(){return A===null?B:1}let F=n;function Oe(y,O){for(let X=0;X<y.length;X++){const $=y[X],q=t.getContext($,O);if(q!==null)return q}return null}try{const y={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ws}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",ge,!1),F===null){const O=["webgl2","webgl","experimental-webgl"];if(S.isWebGL1Renderer===!0&&O.shift(),F=Oe(O,y),F===null)throw Oe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let _e,Ae,me,Ge,Ie,T,v,W,se,re,ne,Ee,oe,xe,Ce,Pe,ie,We,Fe,Ne,we,Se,ze,qe;function it(){_e=new Rh(F),Ae=new yh(F,_e,e),_e.init(Ae),Se=new mp(F,_e,Ae),me=new fp(F,_e,Ae),Ge=new Dh(F),Ie=new Qf,T=new pp(F,_e,me,Ie,Ae,Se,Ge),v=new Th(S),W=new Ch(S),se=new kc(F,Ae),ze=new Sh(F,_e,se,Ae),re=new Lh(F,se,Ge,ze),ne=new Fh(F,re,se,Ge),Fe=new Nh(F,Ae,T),Pe=new bh(Ie),Ee=new Jf(S,v,W,_e,Ae,ze,Pe),oe=new xp(S,Ie),xe=new tp,Ce=new op(_e,Ae),We=new Mh(S,v,W,me,ne,f,c),ie=new hp(S,ne,Ae),qe=new Mp(F,Ge,Ae,me),Ne=new Eh(F,_e,Ge,Ae),we=new Ph(F,_e,Ge,Ae),Ge.programs=Ee.programs,S.capabilities=Ae,S.extensions=_e,S.properties=Ie,S.renderLists=xe,S.shadowMap=ie,S.state=me,S.info=Ge}it();const ke=new vp(S,F);this.xr=ke,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const y=_e.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=_e.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(y){y!==void 0&&(B=y,this.setSize(C,U,!1))},this.getSize=function(y){return y.set(C,U)},this.setSize=function(y,O,X=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}C=y,U=O,t.width=Math.floor(y*B),t.height=Math.floor(O*B),X===!0&&(t.style.width=y+"px",t.style.height=O+"px"),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(C*B,U*B).floor()},this.setDrawingBufferSize=function(y,O,X){C=y,U=O,B=X,t.width=Math.floor(y*X),t.height=Math.floor(O*X),this.setViewport(0,0,y,O)},this.getCurrentViewport=function(y){return y.copy(x)},this.getViewport=function(y){return y.copy(j)},this.setViewport=function(y,O,X,$){y.isVector4?j.set(y.x,y.y,y.z,y.w):j.set(y,O,X,$),me.viewport(x.copy(j).multiplyScalar(B).floor())},this.getScissor=function(y){return y.copy(ee)},this.setScissor=function(y,O,X,$){y.isVector4?ee.set(y.x,y.y,y.z,y.w):ee.set(y,O,X,$),me.scissor(H.copy(ee).multiplyScalar(B).floor())},this.getScissorTest=function(){return Z},this.setScissorTest=function(y){me.setScissorTest(Z=y)},this.setOpaqueSort=function(y){V=y},this.setTransparentSort=function(y){Y=y},this.getClearColor=function(y){return y.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor.apply(We,arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha.apply(We,arguments)},this.clear=function(y=!0,O=!0,X=!0){let $=0;if(y){let q=!1;if(A!==null){const I=A.texture.format;q=I===Lo||I===Ro||I===Co}if(q){const I=A.texture.type,J=I===Tn||I===Sn||I===Cs||I===On||I===Ao||I===wo,fe=We.getClearColor(),pe=We.getClearAlpha(),Re=fe.r,Le=fe.g,Be=fe.b;J?(p[0]=Re,p[1]=Le,p[2]=Be,p[3]=pe,F.clearBufferuiv(F.COLOR,0,p)):(_[0]=Re,_[1]=Le,_[2]=Be,_[3]=pe,F.clearBufferiv(F.COLOR,0,_))}else $|=F.COLOR_BUFFER_BIT}O&&($|=F.DEPTH_BUFFER_BIT),X&&($|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),xe.dispose(),Ce.dispose(),Ie.dispose(),v.dispose(),W.dispose(),ne.dispose(),ze.dispose(),qe.dispose(),Ee.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",st),ke.removeEventListener("sessionend",Xe),Q&&(Q.dispose(),Q=null),ut.stop()};function ce(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const y=Ge.autoReset,O=ie.enabled,X=ie.autoUpdate,$=ie.needsUpdate,q=ie.type;it(),Ge.autoReset=y,ie.enabled=O,ie.autoUpdate=X,ie.needsUpdate=$,ie.type=q}function ge(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function he(y){const O=y.target;O.removeEventListener("dispose",he),Ue(O)}function Ue(y){De(y),Ie.remove(y)}function De(y){const O=Ie.get(y).programs;O!==void 0&&(O.forEach(function(X){Ee.releaseProgram(X)}),y.isShaderMaterial&&Ee.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,X,$,q,I){O===null&&(O=de);const J=q.isMesh&&q.matrixWorld.determinant()<0,fe=Mi(y,O,X,$,q);me.setMaterial($,J);let pe=X.index,Re=1;if($.wireframe===!0){if(pe=re.getWireframeAttribute(X),pe===void 0)return;Re=2}const Le=X.drawRange,Be=X.attributes.position;let et=Le.start*Re,gt=(Le.start+Le.count)*Re;I!==null&&(et=Math.max(et,I.start*Re),gt=Math.min(gt,(I.start+I.count)*Re)),pe!==null?(et=Math.max(et,0),gt=Math.min(gt,pe.count)):Be!=null&&(et=Math.max(et,0),gt=Math.min(gt,Be.count));const tt=gt-et;if(tt<0||tt===1/0)return;ze.setup(q,$,fe,X,pe);let ot,ye=Ne;if(pe!==null&&(ot=se.get(pe),ye=we,ye.setIndex(ot)),q.isMesh)$.wireframe===!0?(me.setLineWidth($.wireframeLinewidth*Te()),ye.setMode(F.LINES)):ye.setMode(F.TRIANGLES);else if(q.isLine){let ve=$.linewidth;ve===void 0&&(ve=1),me.setLineWidth(ve*Te()),q.isLineSegments?ye.setMode(F.LINES):q.isLineLoop?ye.setMode(F.LINE_LOOP):ye.setMode(F.LINE_STRIP)}else q.isPoints?ye.setMode(F.POINTS):q.isSprite&&ye.setMode(F.TRIANGLES);if(q.isBatchedMesh)ye.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)ye.renderInstances(et,tt,q.count);else if(X.isInstancedBufferGeometry){const ve=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Gt=Math.min(X.instanceCount,ve);ye.renderInstances(et,tt,Gt)}else ye.render(et,tt)};function Ye(y,O,X){y.transparent===!0&&y.side===$t&&y.forceSinglePass===!1?(y.side=It,y.needsUpdate=!0,Xn(y,O,X),y.side=An,y.needsUpdate=!0,Xn(y,O,X),y.side=$t):Xn(y,O,X)}this.compile=function(y,O,X=null){X===null&&(X=y),d=Ce.get(X),d.init(),M.push(d),X.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(d.pushLight(q),q.castShadow&&d.pushShadow(q))}),y!==X&&y.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(d.pushLight(q),q.castShadow&&d.pushShadow(q))}),d.setupLights(S._useLegacyLights);const $=new Set;return y.traverse(function(q){const I=q.material;if(I)if(Array.isArray(I))for(let J=0;J<I.length;J++){const fe=I[J];Ye(fe,X,q),$.add(fe)}else Ye(I,X,q),$.add(I)}),M.pop(),d=null,$},this.compileAsync=function(y,O,X=null){const $=this.compile(y,O,X);return new Promise(q=>{function I(){if($.forEach(function(J){Ie.get(J).currentProgram.isReady()&&$.delete(J)}),$.size===0){q(y);return}setTimeout(I,10)}_e.get("KHR_parallel_shader_compile")!==null?I():setTimeout(I,10)})};let $e=null;function at(y){$e&&$e(y)}function st(){ut.stop()}function Xe(){ut.start()}const ut=new qo;ut.setAnimationLoop(at),typeof self<"u"&&ut.setContext(self),this.setAnimationLoop=function(y){$e=y,ke.setAnimationLoop(y),y===null?ut.stop():ut.start()},ke.addEventListener("sessionstart",st),ke.addEventListener("sessionend",Xe),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(O),O=ke.getCamera()),y.isScene===!0&&y.onBeforeRender(S,y,O,A),d=Ce.get(y,M.length),d.init(),M.push(d),ae.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),P.setFromProjectionMatrix(ae),N=this.localClippingEnabled,k=Pe.init(this.clippingPlanes,N),g=xe.get(y,l.length),g.init(),l.push(g),Ct(y,O,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(V,Y),this.info.render.frame++,k===!0&&Pe.beginShadows();const X=d.state.shadowsArray;if(ie.render(X,y,O),k===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),We.render(g,y),d.setupLights(S._useLegacyLights),O.isArrayCamera){const $=O.cameras;for(let q=0,I=$.length;q<I;q++){const J=$[q];Vi(g,y,J,J.viewport)}}else Vi(g,y,O);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),y.isScene===!0&&y.onAfterRender(S,y,O),ze.resetDefaultState(),z=-1,E=null,M.pop(),M.length>0?d=M[M.length-1]:d=null,l.pop(),l.length>0?g=l[l.length-1]:g=null};function Ct(y,O,X,$){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)X=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLight)d.pushLight(y),y.castShadow&&d.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||P.intersectsSprite(y)){$&&le.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ae);const J=ne.update(y),fe=y.material;fe.visible&&g.push(y,J,fe,X,le.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||P.intersectsObject(y))){const J=ne.update(y),fe=y.material;if($&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),le.copy(y.boundingSphere.center)):(J.boundingSphere===null&&J.computeBoundingSphere(),le.copy(J.boundingSphere.center)),le.applyMatrix4(y.matrixWorld).applyMatrix4(ae)),Array.isArray(fe)){const pe=J.groups;for(let Re=0,Le=pe.length;Re<Le;Re++){const Be=pe[Re],et=fe[Be.materialIndex];et&&et.visible&&g.push(y,J,et,X,le.z,Be)}}else fe.visible&&g.push(y,J,fe,X,le.z,null)}}const I=y.children;for(let J=0,fe=I.length;J<fe;J++)Ct(I[J],O,X,$)}function Vi(y,O,X,$){const q=y.opaque,I=y.transmissive,J=y.transparent;d.setupLightsView(X),k===!0&&Pe.setGlobalState(S.clippingPlanes,X),I.length>0&&Wi(q,I,O,X),$&&me.viewport(x.copy($)),q.length>0&&sn(q,O,X),I.length>0&&sn(I,O,X),J.length>0&&sn(J,O,X),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Wi(y,O,X,$){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;const I=Ae.isWebGL2;Q===null&&(Q=new Hn(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?Di:Tn,minFilter:Pi,samples:I?4:0})),S.getDrawingBufferSize(Me),I?Q.setSize(Me.x,Me.y):Q.setSize(Es(Me.x),Es(Me.y));const J=S.getRenderTarget();S.setRenderTarget(Q),S.getClearColor(te),L=S.getClearAlpha(),L<1&&S.setClearColor(16777215,.5),S.clear();const fe=S.toneMapping;S.toneMapping=bn,sn(y,X,$),T.updateMultisampleRenderTarget(Q),T.updateRenderTargetMipmap(Q);let pe=!1;for(let Re=0,Le=O.length;Re<Le;Re++){const Be=O[Re],et=Be.object,gt=Be.geometry,tt=Be.material,ot=Be.group;if(tt.side===$t&&et.layers.test($.layers)){const ye=tt.side;tt.side=It,tt.needsUpdate=!0,Wn(et,X,$,gt,tt,ot),tt.side=ye,tt.needsUpdate=!0,pe=!0}}pe===!0&&(T.updateMultisampleRenderTarget(Q),T.updateRenderTargetMipmap(Q)),S.setRenderTarget(J),S.setClearColor(te,L),S.toneMapping=fe}function sn(y,O,X){const $=O.isScene===!0?O.overrideMaterial:null;for(let q=0,I=y.length;q<I;q++){const J=y[q],fe=J.object,pe=J.geometry,Re=$===null?J.material:$,Le=J.group;fe.layers.test(X.layers)&&Wn(fe,O,X,pe,Re,Le)}}function Wn(y,O,X,$,q,I){y.onBeforeRender(S,O,X,$,q,I),y.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),q.onBeforeRender(S,O,X,$,y,I),q.transparent===!0&&q.side===$t&&q.forceSinglePass===!1?(q.side=It,q.needsUpdate=!0,S.renderBufferDirect(X,O,$,q,y,I),q.side=An,q.needsUpdate=!0,S.renderBufferDirect(X,O,$,q,y,I),q.side=$t):S.renderBufferDirect(X,O,$,q,y,I),y.onAfterRender(S,O,X,$,q,I)}function Xn(y,O,X){O.isScene!==!0&&(O=de);const $=Ie.get(y),q=d.state.lights,I=d.state.shadowsArray,J=q.state.version,fe=Ee.getParameters(y,q.state,I,O,X),pe=Ee.getProgramCacheKey(fe);let Re=$.programs;$.environment=y.isMeshStandardMaterial?O.environment:null,$.fog=O.fog,$.envMap=(y.isMeshStandardMaterial?W:v).get(y.envMap||$.environment),Re===void 0&&(y.addEventListener("dispose",he),Re=new Map,$.programs=Re);let Le=Re.get(pe);if(Le!==void 0){if($.currentProgram===Le&&$.lightsStateVersion===J)return Cn(y,fe),Le}else fe.uniforms=Ee.getUniforms(y),y.onBuild(X,fe,S),y.onBeforeCompile(fe,S),Le=Ee.acquireProgram(fe,pe),Re.set(pe,Le),$.uniforms=fe.uniforms;const Be=$.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Be.clippingPlanes=Pe.uniform),Cn(y,fe),$.needsLights=Si(y),$.lightsStateVersion=J,$.needsLights&&(Be.ambientLightColor.value=q.state.ambient,Be.lightProbe.value=q.state.probe,Be.directionalLights.value=q.state.directional,Be.directionalLightShadows.value=q.state.directionalShadow,Be.spotLights.value=q.state.spot,Be.spotLightShadows.value=q.state.spotShadow,Be.rectAreaLights.value=q.state.rectArea,Be.ltc_1.value=q.state.rectAreaLTC1,Be.ltc_2.value=q.state.rectAreaLTC2,Be.pointLights.value=q.state.point,Be.pointLightShadows.value=q.state.pointShadow,Be.hemisphereLights.value=q.state.hemi,Be.directionalShadowMap.value=q.state.directionalShadowMap,Be.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Be.spotShadowMap.value=q.state.spotShadowMap,Be.spotLightMatrix.value=q.state.spotLightMatrix,Be.spotLightMap.value=q.state.spotLightMap,Be.pointShadowMap.value=q.state.pointShadowMap,Be.pointShadowMatrix.value=q.state.pointShadowMatrix),$.currentProgram=Le,$.uniformsList=null,Le}function xi(y){if(y.uniformsList===null){const O=y.currentProgram.getUniforms();y.uniformsList=vr.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function Cn(y,O){const X=Ie.get(y);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function Mi(y,O,X,$,q){O.isScene!==!0&&(O=de),T.resetTextureUnits();const I=O.fog,J=$.isMeshStandardMaterial?O.environment:null,fe=A===null?S.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:fn,pe=($.isMeshStandardMaterial?W:v).get($.envMap||J),Re=$.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Le=!!X.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Be=!!X.morphAttributes.position,et=!!X.morphAttributes.normal,gt=!!X.morphAttributes.color;let tt=bn;$.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(tt=S.toneMapping);const ot=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ye=ot!==void 0?ot.length:0,ve=Ie.get($),Gt=d.state.lights;if(k===!0&&(N===!0||y!==E)){const Rt=y===E&&$.id===z;Pe.setState($,y,Rt)}let Ze=!1;$.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==Gt.state.version||ve.outputColorSpace!==fe||q.isBatchedMesh&&ve.batching===!1||!q.isBatchedMesh&&ve.batching===!0||q.isInstancedMesh&&ve.instancing===!1||!q.isInstancedMesh&&ve.instancing===!0||q.isSkinnedMesh&&ve.skinning===!1||!q.isSkinnedMesh&&ve.skinning===!0||q.isInstancedMesh&&ve.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&ve.instancingColor===!1&&q.instanceColor!==null||ve.envMap!==pe||$.fog===!0&&ve.fog!==I||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Pe.numPlanes||ve.numIntersection!==Pe.numIntersection)||ve.vertexAlphas!==Re||ve.vertexTangents!==Le||ve.morphTargets!==Be||ve.morphNormals!==et||ve.morphColors!==gt||ve.toneMapping!==tt||Ae.isWebGL2===!0&&ve.morphTargetsCount!==ye)&&(Ze=!0):(Ze=!0,ve.__version=$.version);let Nt=ve.currentProgram;Ze===!0&&(Nt=Xn($,O,q));let Xi=!1,Et=!1,Ke=!1;const nt=Nt.getUniforms(),Tt=ve.uniforms;if(me.useProgram(Nt.program)&&(Xi=!0,Et=!0,Ke=!0),$.id!==z&&(z=$.id,Et=!0),Xi||E!==y){nt.setValue(F,"projectionMatrix",y.projectionMatrix),nt.setValue(F,"viewMatrix",y.matrixWorldInverse);const Rt=nt.map.cameraPosition;Rt!==void 0&&Rt.setValue(F,le.setFromMatrixPosition(y.matrixWorld)),Ae.logarithmicDepthBuffer&&nt.setValue(F,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&nt.setValue(F,"isOrthographic",y.isOrthographicCamera===!0),E!==y&&(E=y,Et=!0,Ke=!0)}if(q.isSkinnedMesh){nt.setOptional(F,q,"bindMatrix"),nt.setOptional(F,q,"bindMatrixInverse");const Rt=q.skeleton;Rt&&(Ae.floatVertexTextures?(Rt.boneTexture===null&&Rt.computeBoneTexture(),nt.setValue(F,"boneTexture",Rt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(nt.setOptional(F,q,"batchingTexture"),nt.setValue(F,"batchingTexture",q._matricesTexture,T));const Ft=X.morphAttributes;if((Ft.position!==void 0||Ft.normal!==void 0||Ft.color!==void 0&&Ae.isWebGL2===!0)&&Fe.update(q,X,Nt),(Et||ve.receiveShadow!==q.receiveShadow)&&(ve.receiveShadow=q.receiveShadow,nt.setValue(F,"receiveShadow",q.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Tt.envMap.value=pe,Tt.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),Et&&(nt.setValue(F,"toneMappingExposure",S.toneMappingExposure),ve.needsLights&&qn(Tt,Ke),I&&$.fog===!0&&oe.refreshFogUniforms(Tt,I),oe.refreshMaterialUniforms(Tt,$,B,U,Q),vr.upload(F,xi(ve),Tt,T)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(vr.upload(F,xi(ve),Tt,T),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&nt.setValue(F,"center",q.center),nt.setValue(F,"modelViewMatrix",q.modelViewMatrix),nt.setValue(F,"normalMatrix",q.normalMatrix),nt.setValue(F,"modelMatrix",q.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Rt=$.uniformsGroups;for(let Qt=0,Fs=Rt.length;Qt<Fs;Qt++)if(Ae.isWebGL2){const Ei=Rt[Qt];qe.update(Ei,Nt),qe.bind(Ei,Nt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Nt}function qn(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function Si(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(y,O,X){Ie.get(y.texture).__webglTexture=O,Ie.get(y.depthTexture).__webglTexture=X;const $=Ie.get(y);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=X===void 0,$.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(y,O){const X=Ie.get(y);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(y,O=0,X=0){A=y,R=O,w=X;let $=!0,q=null,I=!1,J=!1;if(y){const pe=Ie.get(y);pe.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer(F.FRAMEBUFFER,null),$=!1):pe.__webglFramebuffer===void 0?T.setupRenderTarget(y):pe.__hasExternalTextures&&T.rebindTextures(y,Ie.get(y.texture).__webglTexture,Ie.get(y.depthTexture).__webglTexture);const Re=y.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(J=!0);const Le=Ie.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Le[O])?q=Le[O][X]:q=Le[O],I=!0):Ae.isWebGL2&&y.samples>0&&T.useMultisampledRTT(y)===!1?q=Ie.get(y).__webglMultisampledFramebuffer:Array.isArray(Le)?q=Le[X]:q=Le,x.copy(y.viewport),H.copy(y.scissor),G=y.scissorTest}else x.copy(j).multiplyScalar(B).floor(),H.copy(ee).multiplyScalar(B).floor(),G=Z;if(me.bindFramebuffer(F.FRAMEBUFFER,q)&&Ae.drawBuffers&&$&&me.drawBuffers(y,q),me.viewport(x),me.scissor(H),me.setScissorTest(G),I){const pe=Ie.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,pe.__webglTexture,X)}else if(J){const pe=Ie.get(y.texture),Re=O||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,pe.__webglTexture,X||0,Re)}z=-1},this.readRenderTargetPixels=function(y,O,X,$,q,I,J){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=Ie.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&J!==void 0&&(fe=fe[J]),fe){me.bindFramebuffer(F.FRAMEBUFFER,fe);try{const pe=y.texture,Re=pe.format,Le=pe.type;if(Re!==jt&&Se.convert(Re)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=Le===Di&&(_e.has("EXT_color_buffer_half_float")||Ae.isWebGL2&&_e.has("EXT_color_buffer_float"));if(Le!==Tn&&Se.convert(Le)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Le===En&&(Ae.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-$&&X>=0&&X<=y.height-q&&F.readPixels(O,X,$,q,Se.convert(Re),Se.convert(Le),I)}finally{const pe=A!==null?Ie.get(A).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,pe)}}},this.copyFramebufferToTexture=function(y,O,X=0){const $=Math.pow(2,-X),q=Math.floor(O.image.width*$),I=Math.floor(O.image.height*$);T.setTexture2D(O,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,y.x,y.y,q,I),me.unbindTexture()},this.copyTextureToTexture=function(y,O,X,$=0){const q=O.image.width,I=O.image.height,J=Se.convert(X.format),fe=Se.convert(X.type);T.setTexture2D(X,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,X.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,X.unpackAlignment),O.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,$,y.x,y.y,q,I,J,fe,O.image.data):O.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,$,y.x,y.y,O.mipmaps[0].width,O.mipmaps[0].height,J,O.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,$,y.x,y.y,J,fe,O.image),$===0&&X.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),me.unbindTexture()},this.copyTextureToTexture3D=function(y,O,X,$,q=0){if(S.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const I=y.max.x-y.min.x+1,J=y.max.y-y.min.y+1,fe=y.max.z-y.min.z+1,pe=Se.convert($.format),Re=Se.convert($.type);let Le;if($.isData3DTexture)T.setTexture3D($,0),Le=F.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)T.setTexture2DArray($,0),Le=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,$.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,$.unpackAlignment);const Be=F.getParameter(F.UNPACK_ROW_LENGTH),et=F.getParameter(F.UNPACK_IMAGE_HEIGHT),gt=F.getParameter(F.UNPACK_SKIP_PIXELS),tt=F.getParameter(F.UNPACK_SKIP_ROWS),ot=F.getParameter(F.UNPACK_SKIP_IMAGES),ye=X.isCompressedTexture?X.mipmaps[q]:X.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,ye.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ye.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,y.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,y.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,y.min.z),X.isDataTexture||X.isData3DTexture?F.texSubImage3D(Le,q,O.x,O.y,O.z,I,J,fe,pe,Re,ye.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(Le,q,O.x,O.y,O.z,I,J,fe,pe,ye.data)):F.texSubImage3D(Le,q,O.x,O.y,O.z,I,J,fe,pe,Re,ye),F.pixelStorei(F.UNPACK_ROW_LENGTH,Be),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,et),F.pixelStorei(F.UNPACK_SKIP_PIXELS,gt),F.pixelStorei(F.UNPACK_SKIP_ROWS,tt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ot),q===0&&$.generateMipmaps&&F.generateMipmap(Le),me.unbindTexture()},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),me.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,me.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Rs?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Cr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===xt?zn:Do}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===zn?xt:fn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Sp extends el{}Sp.prototype.isWebGL1Renderer=!0;class Ep extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class yp extends Ut{constructor(e,t,n,r,s,o,a,c,u){super(e,t,n,r,s,o,a,c,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bp{constructor(e,t,n=0,r=1/0){this.ray=new Bo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ps,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return bs(e,this,n,t),n.sort(io),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)bs(e[r],this,n,t);return n.sort(io),n}}function io(i,e){return i.distance-e.distance}function bs(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let s=0,o=r.length;s<o;s++)bs(r[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ws}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ws);function Tp(i){const e={fps:12,totalFrames:24,startFrame:1,endFrame:24,currentFrame:1,loop:!0,isPlaying:!1},t={enabled:!1,prevFrames:2,nextFrames:2,prevColor:"#ff3b30",nextColor:"#34c759",startOpacity:.45,stepOpacity:.15,mode:"tint"},n=[],r=new Set;function s(){for(const p of r)p()}let o=null,a=0,c=0;function u(p){if(!e.isPlaying)return;a===0&&(a=p);const _=p-a;a=p,c+=_;const g=1e3/e.fps;if(c>=g){const d=Math.floor(c/g);c%=g;let l=e.currentFrame+d;if(l>e.endFrame)if(e.loop){const M=e.endFrame-e.startFrame+1;l=e.startFrame+(l-e.startFrame)%M}else l=e.endFrame,f.pause();e.currentFrame!==l&&(e.currentFrame=l,h(),s())}e.isPlaying&&(o=requestAnimationFrame(u))}function h(){if(n.length===0)return;const p=i.getActiveLayer();let _=n.find(g=>g.folderId===p.id||g.folderId===p.parentId);if(!_&&n.length>0&&(_=n[0]),_){const g=f.getActiveCelForFrame(_.id,e.currentFrame);g&&g.id!==p.id&&i.setActiveLayer(g.id)}}function m(){const p=i.layers.filter(d=>d.type==="folder"&&d.isAnimationFolder),_=new Set;for(let d=n.length-1;d>=0;d--){const l=n[d].folderId;!p.some(M=>M.id===l)||_.has(l)?n.splice(d,1):_.add(l)}for(const d of p){let l=n.find(S=>S.folderId===d.id);l?(l.name=d.name,l.visible=d.visible):(l={id:d.id,folderId:d.id,name:d.name,visible:d.visible,exposures:new Map},n.push(l));const M=i.layers.filter(S=>S.parentId===d.id);M.length>0&&l.exposures.size===0&&l.exposures.set(1,M[0].id)}const g=new Map(p.map((d,l)=>[d.id,l]));n.sort((d,l)=>(g.get(l.folderId)??0)-(g.get(d.folderId)??0))}i.subscribe(()=>{m(),s()});const f={get settings(){return e},get onionSkin(){return t},get tracks(){return n},play(){e.isPlaying||(e.isPlaying=!0,a=0,c=0,o=requestAnimationFrame(u),s())},pause(){e.isPlaying&&(e.isPlaying=!1,o!==null&&(cancelAnimationFrame(o),o=null),s())},togglePlay(){e.isPlaying?f.pause():f.play()},setFps(p){e.fps=Math.max(1,Math.min(60,Math.round(p))),s()},setTotalFrames(p){e.totalFrames=Math.max(1,Math.min(240,Math.round(p))),e.endFrame>e.totalFrames&&(e.endFrame=e.totalFrames),e.currentFrame>e.totalFrames&&(e.currentFrame=e.totalFrames),s()},setRange(p,_){const g=Math.max(1,Math.min(e.totalFrames,p)),d=Math.max(g,Math.min(e.totalFrames,_));e.startFrame=g,e.endFrame=d,e.currentFrame<g&&(e.currentFrame=g),e.currentFrame>d&&(e.currentFrame=d),s()},setLoop(p){e.loop=p,s()},goToFrame(p){const _=Math.max(1,Math.min(e.totalFrames,Math.round(p)));e.currentFrame!==_&&(e.currentFrame=_,h(),s())},nextFrame(){let p=e.currentFrame+1;p>e.endFrame&&(p=e.loop?e.startFrame:e.endFrame),f.goToFrame(p)},prevFrame(){let p=e.currentFrame-1;p<e.startFrame&&(p=e.loop?e.endFrame:e.startFrame),f.goToFrame(p)},firstFrame(){f.goToFrame(e.startFrame)},lastFrame(){f.goToFrame(e.endFrame)},nextCel(p){const _=p?n.find(l=>l.id===p):n[0];if(!_)return;const g=Array.from(_.exposures.keys()).sort((l,M)=>l-M),d=g.find(l=>l>e.currentFrame);d!==void 0?f.goToFrame(d):e.loop&&g.length>0&&f.goToFrame(g[0])},prevCel(p){const _=p?n.find(l=>l.id===p):n[0];if(!_)return;const g=Array.from(_.exposures.keys()).sort((l,M)=>M-l),d=g.find(l=>l<e.currentFrame);d!==void 0?f.goToFrame(d):e.loop&&g.length>0&&f.goToFrame(g[0])},createTrack(p){const _=i.createAnimationFolder(p||`Animation ${n.length+1}`);let g=n.find(l=>l.folderId===_.id);g||(g={id:_.id,folderId:_.id,name:_.name,visible:!0,exposures:new Map},n.push(g));const d=i.layers.filter(l=>l.parentId===_.id);if(d.length===0){const l=i.createLayer("1",_.id);g.exposures.set(1,l.id),i.setActiveLayer(l.id)}else g.exposures.size===0&&(g.exposures.set(1,d[0].id),i.setActiveLayer(d[0].id));return s(),g},deleteTrack(p){const _=n.findIndex(g=>g.id===p);if(_!==-1){const g=n[_];n.splice(_,1),i.deleteLayer(g.folderId),s()}},createCel(p,_){let g=p?n.find(R=>R.id===p):n[0];g||(g=f.createTrack());const d=_!==void 0?_:e.currentFrame,l=i.layers.filter(R=>R.parentId===g.folderId);let M=0;for(const R of l){const w=R.name.match(/^(\d+)$/);if(w){const A=parseInt(w[1],10);A>M&&(M=A)}}const S=`${M+1}`,b=i.createLayer(S,g.folderId);return g.exposures.set(d,b.id),i.setActiveLayer(b.id),s(),b},specifyCel(p,_,g){const d=n.find(l=>l.id===p);d&&(d.exposures.set(_,g),h(),s())},moveExposure(p,_,g){const d=n.find(S=>S.id===p);if(!d)return!1;const l=d.exposures.get(_);if(!l)return!1;const M=Math.max(1,Math.min(e.totalFrames,Math.round(g)));return M===_?!1:(d.exposures.delete(_),d.exposures.set(M,l),e.currentFrame=M,h(),s(),!0)},removeExposure(p,_){const g=n.find(d=>d.id===p);g&&(g.exposures.delete(_),h(),s())},getCelsInTrack(p){const _=n.find(g=>g.id===p);return _?i.layers.filter(g=>g.parentId===_.folderId):[]},deleteCelLayer(p,_){const g=n.find(l=>l.id===p);if(!g)return!1;for(const[l,M]of Array.from(g.exposures.entries()))M===_&&g.exposures.delete(l);const d=i.deleteLayer(_);return h(),s(),d},batchSpecifyCels(p,_=2){const g=n.find(M=>M.id===p);if(!g)return;const d=i.layers.filter(M=>M.parentId===g.folderId);if(d.length===0)return;g.exposures.clear();let l=1;for(const M of d){if(l>e.totalFrames)break;g.exposures.set(l,M.id),l+=Math.max(1,_)}h(),s()},setOnionSkin(p){Object.assign(t,p),s()},toggleOnionSkin(p){t.enabled=p!==void 0?p:!t.enabled,s()},getActiveCelForFrame(p,_){const g=n.find(M=>M.id===p);if(!g)return;let d,l=-1;for(const[M,S]of g.exposures.entries())M<=_&&M>l&&(l=M,d=S);if(d)return i.layers.find(M=>M.id===d)},getOnionSkinCels(p,_){if(!t.enabled)return[];const g=n.find(A=>A.id===p);if(!g||!g.visible)return[];const d=f.getActiveCelForFrame(p,_),l=d?d.id:null,M=[];let S=0;const b=new Set;l&&b.add(l);for(let A=_-1;A>=1&&!(S>=t.prevFrames);A--){const z=f.getActiveCelForFrame(p,A);if(z&&!b.has(z.id)){b.add(z.id),S++;const E=Math.max(.05,t.startOpacity-(S-1)*t.stepOpacity);M.push({layer:z,isPrev:!0,distance:S,opacity:E,tintColor:t.prevColor})}}let R=0;const w=new Set;l&&w.add(l);for(let A=_+1;A<=e.totalFrames&&!(R>=t.nextFrames);A++){const z=f.getActiveCelForFrame(p,A);if(z&&!w.has(z.id)){w.add(z.id),R++;const E=Math.max(.05,t.startOpacity-(R-1)*t.stepOpacity);M.push({layer:z,isPrev:!1,distance:R,opacity:E,tintColor:t.nextColor})}}return M},isLayerVisibleAtFrame(p,_){if(!p.visible)return!1;let g;if(p.parentId&&(g=i.layers.find(d=>d.id===p.parentId)),g&&g.isAnimationFolder){const d=f.getActiveCelForFrame(g.id,_);return d?p.id===d.id?!0:p.parentId===d.id:!1}return!0},subscribe(p){return r.add(p),()=>{r.delete(p)}}};return m(),f}let ht=22;const ro=10,so=64;function Ap(i,e,t){i.innerHTML="";const n=document.createElement("div");n.className="timeline-panel",n.style.setProperty("--cell-width",`${ht}px`);let r=null,s=null;function o(N){ht=Math.max(ro,Math.min(so,Math.round(N))),n.style.setProperty("--cell-width",`${ht}px`),r&&(r.value=String(ht)),s&&(s.textContent=`${ht}px`),k()}const a=document.createElement("div");a.className="timeline-header";const c=document.createElement("div");c.className="timeline-transport-group";const u=document.createElement("button");u.className="timeline-btn icon-only",u.title="Minimizar / Expandir Línea de Tiempo",u.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,u.addEventListener("click",()=>{n.classList.toggle("collapsed");const N=n.classList.contains("collapsed");u.innerHTML=N?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'}),c.appendChild(u);const h=document.createElement("button");h.className="timeline-btn icon-only",h.title="Primer fotograma (Shift+Izquierda)",h.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
    </svg>
  `,h.addEventListener("click",()=>e.firstFrame()),c.appendChild(h);const m=document.createElement("button");m.className="timeline-btn icon-only",m.title="Fotograma anterior (Flecha Izquierda)",m.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `,m.addEventListener("click",()=>e.prevFrame()),c.appendChild(m);const f=document.createElement("button");f.className="timeline-btn play-btn icon-only",f.title="Reproducir / Pausa (Enter)",f.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  `,f.addEventListener("click",()=>e.togglePlay()),c.appendChild(f);const p=document.createElement("button");p.className="timeline-btn icon-only",p.title="Fotograma siguiente (Flecha Derecha)",p.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  `,p.addEventListener("click",()=>e.nextFrame()),c.appendChild(p);const _=document.createElement("button");_.className="timeline-btn icon-only",_.title="Último fotograma (Shift+Derecha)",_.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  `,_.addEventListener("click",()=>e.lastFrame()),c.appendChild(_);const g=document.createElement("button");g.className=`timeline-btn icon-only ${e.settings.loop?"active":""}`,g.title="Repetir en bucle",g.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  `,g.addEventListener("click",()=>{e.setLoop(!e.settings.loop)}),c.appendChild(g);const d=document.createElement("div");d.className="timeline-separator",c.appendChild(d);const l=document.createElement("button");l.className="timeline-btn",l.title="Celda anterior (Atajo: [)",l.innerHTML="<span>[ ◀ Cel</span>",l.addEventListener("click",()=>e.prevCel()),c.appendChild(l);const M=document.createElement("button");M.className="timeline-btn",M.title="Celda siguiente (Atajo: ])",M.innerHTML="<span>Cel ▶ ]</span>",M.addEventListener("click",()=>e.nextCel()),c.appendChild(M);const S=document.createElement("div");S.className="timeline-frame-counter",S.title="Fotograma actual / Total. Clic para cambiar duración.",S.textContent=`${e.settings.currentFrame} / ${e.settings.totalFrames}`,S.addEventListener("click",()=>{const N=prompt("Duración total de fotogramas (1 - 240):",String(e.settings.totalFrames));if(N){const Q=parseInt(N,10);!isNaN(Q)&&Q>0&&e.setTotalFrames(Q)}}),c.appendChild(S);const b=document.createElement("select");b.className="timeline-select",b.title="Tasa de fotogramas (FPS)";for(const N of[8,12,16,24,30,60]){const Q=document.createElement("option");Q.value=String(N),Q.textContent=`${N} fps`,N===e.settings.fps&&(Q.selected=!0),b.appendChild(Q)}b.addEventListener("change",()=>{e.setFps(Number(b.value))}),c.appendChild(b),a.appendChild(c);const R=document.createElement("div");R.className="timeline-actions-group";const w=document.createElement("button");w.className="timeline-btn",w.title="Crear nueva Carpeta de Animación",w.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/>
      <line x1="17" y1="2" x2="17" y2="22"/>
    </svg>
    <span>+ Pista</span>
  `,w.addEventListener("click",()=>e.createTrack()),R.appendChild(w);const A=document.createElement("button");A.className="timeline-btn",A.title="Crear nueva celda en el fotograma actual",A.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M5 12h14"/>
    </svg>
    <span>+ Celda</span>
  `,A.addEventListener("click",()=>e.createCel()),R.appendChild(A);const z=document.createElement("button");z.className="timeline-btn",z.title="Asignar celdas por lotes (a doses, a unos)",z.innerHTML="<span>Lotes (a 2s)</span>",z.addEventListener("click",()=>{e.tracks.length>0&&e.batchSpecifyCels(e.tracks[0].id,2)}),R.appendChild(z);const E=document.createElement("div");E.className="timeline-separator",R.appendChild(E);const x=document.createElement("button");x.className=`timeline-btn ${e.onionSkin.enabled?"active":""}`,x.title="Activar / Desactivar Papel Cebolla (Atajo: O)",x.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1"/>
    </svg>
    <span>Papel Cebolla</span>
  `,x.addEventListener("click",()=>{e.toggleOnionSkin()}),R.appendChild(x);const H=document.createElement("button");H.className="timeline-btn icon-only",H.title="Ajustes de Papel Cebolla",H.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  `,H.addEventListener("click",()=>{wp(e)}),R.appendChild(H);const G=document.createElement("div");G.className="timeline-separator",R.appendChild(G);const te=document.createElement("div");te.className="timeline-zoom-group",te.title="Zoom de fotogramas (Ctrl + Rueda sobre la línea de tiempo)";const L=document.createElement("button");L.className="timeline-btn icon-only",L.title="Reducir ancho de fotograma",L.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `,L.addEventListener("click",()=>o(ht-3)),r=document.createElement("input"),r.type="range",r.className="timeline-zoom-slider",r.min=String(ro),r.max=String(so),r.value=String(ht),r.title="Ajustar ancho de celdas",r.addEventListener("input",()=>{o(Number(r.value))});const C=document.createElement("button");C.className="timeline-btn icon-only",C.title="Aumentar ancho de fotograma",C.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `,C.addEventListener("click",()=>o(ht+3)),s=document.createElement("span"),s.className="timeline-zoom-label",s.textContent=`${ht}px`,te.append(L,r,C,s),R.appendChild(te),a.appendChild(R),n.appendChild(a);const U=document.createElement("div");U.className="timeline-body";const B=document.createElement("div");B.className="timeline-tracks-header-col";const V=document.createElement("div");V.className="timeline-tracks-corner",V.textContent="Pistas de Animación",B.appendChild(V);const Y=document.createElement("div");Y.className="timeline-track-headers-list",B.appendChild(Y),U.appendChild(B);const j=document.createElement("div");j.className="timeline-grid-container";const ee=document.createElement("div");ee.className="timeline-grid-content",j.appendChild(ee),U.appendChild(j),n.style.pointerEvents="auto",n.appendChild(U),i.appendChild(n);let Z=!1;function P(N){const Q=j.getBoundingClientRect(),ae=N.clientX-Q.left+j.scrollLeft,Me=Math.max(1,Math.min(e.settings.totalFrames,Math.floor(ae/ht)+1));e.goToFrame(Me)}j.addEventListener("mousedown",N=>{N.button===0&&(Z=!0,P(N))}),j.addEventListener("wheel",N=>{if(N.ctrlKey){N.preventDefault();const Q=N.deltaY<0?2:-2;o(ht+Q)}},{passive:!1}),window.addEventListener("mousemove",N=>{Z&&P(N)}),window.addEventListener("mouseup",()=>{Z=!1});function k(){e.settings.isPlaying?(f.classList.add("playing"),f.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      `):(f.classList.remove("playing"),f.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      `),g.classList.toggle("active",e.settings.loop),x.classList.toggle("active",e.onionSkin.enabled),S.textContent=`${e.settings.currentFrame} / ${e.settings.totalFrames}`,b.value=String(e.settings.fps),Y.innerHTML="";for(const le of e.tracks){const de=document.createElement("div");de.className="timeline-track-header-item";const Te=document.createElement("button");Te.className="timeline-track-eye-btn",Te.innerHTML=le.visible?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/></svg>',Te.addEventListener("click",_e=>{_e.stopPropagation(),le.visible=!le.visible,t.setLayerVisibility(le.folderId,le.visible),k()}),de.appendChild(Te);const F=document.createElement("span");F.className="timeline-track-name",F.textContent=le.name,de.appendChild(F);const Oe=document.createElement("span");Oe.className="timeline-track-badge",Oe.textContent=`${le.exposures.size} cels`,de.appendChild(Oe),Y.appendChild(de)}ee.innerHTML="";const N=e.settings.totalFrames*ht;ee.style.width=`${N}px`;const Q=document.createElement("div");Q.className="timeline-ruler",Q.style.width=`${N}px`;for(let le=1;le<=e.settings.totalFrames;le++){const de=document.createElement("div");de.className="timeline-ruler-cell",(le%5===0||le===1)&&(de.classList.add("major"),de.textContent=String(le)),le>=e.settings.startFrame&&le<=e.settings.endFrame&&de.classList.add("playback-bound"),de.addEventListener("click",Te=>{Te.stopPropagation(),e.goToFrame(le)}),Q.appendChild(de)}ee.appendChild(Q);for(const le of e.tracks){const de=document.createElement("div");de.className="timeline-track-row",de.style.width=`${N}px`;for(let F=1;F<=e.settings.totalFrames;F++){const Oe=document.createElement("div");Oe.className="timeline-frame-cell",le.exposures.has(F)&&Oe.classList.add("key-cell"),Oe.addEventListener("click",_e=>{_e.stopPropagation(),e.goToFrame(F)}),Oe.addEventListener("dblclick",_e=>{_e.stopPropagation(),e.createCel(le.id,F)}),Oe.addEventListener("contextmenu",_e=>{_e.preventDefault(),_e.stopPropagation(),ao(_e.clientX,_e.clientY,le,F,e,t)}),de.appendChild(Oe)}const Te=Array.from(le.exposures.entries()).sort((F,Oe)=>F[0]-Oe[0]);for(let F=0;F<Te.length;F++){const[Oe,_e]=Te[F],Ae=Te[F+1],me=Ae?Ae[0]-1:e.settings.totalFrames,Ge=me-Oe+1,Ie=t.layers.find(oe=>oe.id===_e),T=Ie?Ie.name:"?",v=document.createElement("div");v.className="timeline-cel-block",e.settings.currentFrame>=Oe&&e.settings.currentFrame<=me&&v.classList.add("active-cel"),v.style.left=`${(Oe-1)*ht}px`,v.style.width=`${Ge*ht-2}px`;const W=document.createElement("div");W.className="timeline-cel-dot",v.appendChild(W);const se=document.createElement("span");se.className="timeline-cel-label",se.textContent=T,v.appendChild(se);let re=0,ne=Oe,Ee=!1;v.addEventListener("mousedown",oe=>{if(oe.button!==0)return;oe.stopPropagation(),re=oe.clientX,ne=Oe,Ee=!1;const xe=Pe=>{const ie=Pe.clientX-re;if(!Ee&&Math.abs(ie)>4&&(Ee=!0,v.classList.add("dragging")),Ee){const We=j.getBoundingClientRect(),Fe=Pe.clientX-We.left+j.scrollLeft,Ne=Math.max(1,Math.min(e.settings.totalFrames,Math.floor(Fe/ht)+1));de.querySelectorAll(".timeline-frame-cell").forEach((we,Se)=>{we.classList.toggle("drop-target",Se+1===Ne)})}},Ce=Pe=>{if(window.removeEventListener("mousemove",xe),window.removeEventListener("mouseup",Ce),de.querySelectorAll(".timeline-frame-cell").forEach(ie=>ie.classList.remove("drop-target")),Ee){v.classList.remove("dragging");const ie=j.getBoundingClientRect(),We=Pe.clientX-ie.left+j.scrollLeft,Fe=Math.max(1,Math.min(e.settings.totalFrames,Math.floor(We/ht)+1));Fe!==ne&&e.moveExposure(le.id,ne,Fe)}else e.goToFrame(Oe),Ie&&t.setActiveLayer(Ie.id)};window.addEventListener("mousemove",xe),window.addEventListener("mouseup",Ce)}),v.addEventListener("contextmenu",oe=>{oe.preventDefault(),oe.stopPropagation();const xe=j.getBoundingClientRect(),Ce=oe.clientX-xe.left+j.scrollLeft,Pe=Math.max(1,Math.min(e.settings.totalFrames,Math.floor(Ce/ht)+1));ao(oe.clientX,oe.clientY,le,Pe,e,t)}),de.appendChild(v)}ee.appendChild(de)}const ae=document.createElement("div");ae.className="timeline-playhead",ae.style.left=`${(e.settings.currentFrame-1)*ht+ht/2}px`;const Me=document.createElement("div");Me.className="timeline-playhead-cap",ae.appendChild(Me),ee.appendChild(ae)}window.addEventListener("keydown",N=>{["INPUT","SELECT","TEXTAREA"].includes(N.target.tagName)||(N.code==="Enter"||N.code==="NumpadEnter"?(N.preventDefault(),e.togglePlay()):N.code==="ArrowRight"?(N.preventDefault(),N.shiftKey?e.lastFrame():e.nextFrame()):N.code==="ArrowLeft"?(N.preventDefault(),N.shiftKey?e.firstFrame():e.prevFrame()):N.key==="]"||N.key==="}"?(N.preventDefault(),e.nextCel()):N.key==="["||N.key==="{"?(N.preventDefault(),e.prevCel()):(N.key==="o"||N.key==="O")&&(N.preventDefault(),e.toggleOnionSkin()))}),e.subscribe(k),k()}function wp(i){const e=document.createElement("div");e.className="onion-modal-backdrop";const t=document.createElement("div");t.className="onion-modal",t.innerHTML=`
    <h3>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
      Ajustes de Papel Cebolla
    </h3>
    
    <div class="onion-setting-row">
      <label>Mostrar Papel Cebolla</label>
      <input type="checkbox" id="onion-enable" ${i.onionSkin.enabled?"checked":""}/>
    </div>

    <div class="onion-setting-row">
      <label>Modo de color</label>
      <select id="onion-mode">
        <option value="tint" ${i.onionSkin.mode==="tint"?"selected":""}>Tintado (CSP)</option>
        <option value="color" ${i.onionSkin.mode==="color"?"selected":""}>Color Original</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>Celdas anteriores (Pasado)</label>
      <input type="number" id="onion-prev-count" min="1" max="10" value="${i.onionSkin.prevFrames}"/>
    </div>

    <div class="onion-setting-row">
      <label>Color celdas anteriores</label>
      <input type="color" id="onion-prev-color" value="${i.onionSkin.prevColor}"/>
    </div>

    <div class="onion-setting-row">
      <label>Celdas posteriores (Futuro)</label>
      <input type="number" id="onion-next-count" min="1" max="10" value="${i.onionSkin.nextFrames}"/>
    </div>

    <div class="onion-setting-row">
      <label>Color celdas posteriores</label>
      <input type="color" id="onion-next-color" value="${i.onionSkin.nextColor}"/>
    </div>

    <div class="onion-setting-row">
      <label>Opacidad inicial (%)</label>
      <input type="number" id="onion-start-opacity" min="5" max="100" step="5" value="${Math.round(i.onionSkin.startOpacity*100)}"/>
    </div>

    <div class="onion-modal-actions">
      <button class="timeline-btn" id="onion-modal-close">Cerrar</button>
    </div>
  `,e.appendChild(t),document.body.appendChild(e);const n=t.querySelector("#onion-enable"),r=t.querySelector("#onion-mode"),s=t.querySelector("#onion-prev-count"),o=t.querySelector("#onion-prev-color"),a=t.querySelector("#onion-next-count"),c=t.querySelector("#onion-next-color"),u=t.querySelector("#onion-start-opacity"),h=t.querySelector("#onion-modal-close");function m(){i.setOnionSkin({enabled:n.checked,mode:r.value,prevFrames:Number(s.value),prevColor:o.value,nextFrames:Number(a.value),nextColor:c.value,startOpacity:Number(u.value)/100})}n.addEventListener("change",m),r.addEventListener("change",m),s.addEventListener("input",m),o.addEventListener("input",m),a.addEventListener("input",m),c.addEventListener("input",m),u.addEventListener("input",m);const f=()=>{e.remove()};h.addEventListener("click",f),e.addEventListener("click",p=>{p.target===e&&f()})}function ao(i,e,t,n,r,s){document.querySelectorAll(".timeline-context-menu").forEach(b=>b.remove());const o=document.createElement("div");o.className="timeline-context-menu";const a=document.createElement("div");a.className="context-menu-header",a.innerHTML=`<span>${t.name}</span><span style="color:#00e5ff;">Fotograma ${n}</span>`,o.appendChild(a);const c=r.getCelsInTrack(t.id),u=t.exposures.get(n),h=r.getActiveCelForFrame(t.id,n),m=document.createElement("div");m.className="context-menu-section-title",m.textContent="Asignar Celda Existente",o.appendChild(m);const f=document.createElement("div");if(f.className="context-menu-cels-list",c.length===0){const b=document.createElement("div");b.className="context-menu-item",b.style.color="#777777",b.style.fontStyle="italic",b.textContent="(Sin celdas en la pista)",f.appendChild(b)}else for(const b of c){const R=document.createElement("div");R.className="context-menu-item";const w=u===b.id;w&&R.classList.add("active"),R.innerHTML=`
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="width:7px; height:7px; border-radius:50%; background:${w?"#00e5ff":"#627d98"};"></span>
          <span>${b.name}</span>
        </span>
        ${w?'<span style="color:#00e5ff; font-weight:bold;">✓</span>':""}
      `,R.addEventListener("click",()=>{r.specifyCel(t.id,n,b.id),r.goToFrame(n),s.setActiveLayer(b.id),o.remove()}),f.appendChild(R)}o.appendChild(f);const p=document.createElement("div");p.className="context-menu-separator",o.appendChild(p);const _=document.createElement("div");if(_.className="context-menu-item",_.innerHTML=`
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
      <span>Nueva celda de animación</span>
    </span>
  `,_.addEventListener("click",()=>{r.createCel(t.id,n),r.goToFrame(n),o.remove()}),o.appendChild(_),t.exposures.has(n)){const b=document.createElement("div");b.className="context-menu-item",b.innerHTML=`
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Eliminar asignación de este frame</span>
      </span>
    `,b.addEventListener("click",()=>{r.removeExposure(t.id,n),o.remove()}),o.appendChild(b)}if(h){const b=document.createElement("div");b.className="context-menu-separator",o.appendChild(b);const R=document.createElement("div");R.className="context-menu-item danger",R.innerHTML=`
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        <span>Eliminar celda "${h.name}" de la pista</span>
      </span>
    `,R.addEventListener("click",()=>{confirm(`¿Eliminar la celda "${h.name}" permanentemente del proyecto?`)&&r.deleteCelLayer(t.id,h.id),o.remove()}),o.appendChild(R)}document.body.appendChild(o);const g=o.getBoundingClientRect();let d=i,l=e;d+g.width>window.innerWidth&&(d=window.innerWidth-g.width-10),l+g.height>window.innerHeight&&(l=e-g.height-4),o.style.left=`${Math.max(10,d)}px`,o.style.top=`${Math.max(10,l)}px`;const M=b=>{o.contains(b.target)||(o.remove(),window.removeEventListener("mousedown",M),window.removeEventListener("keydown",S))},S=b=>{b.key==="Escape"&&(o.remove(),window.removeEventListener("mousedown",M),window.removeEventListener("keydown",S))};window.addEventListener("mousedown",M),window.addEventListener("keydown",S)}const Ii=[{id:"g-pen",name:"Pluma G (G-Pen)",tool:"pen",description:"Trazo nítido y dinámico con alta respuesta a la presión.",settings:{size:6,minSizeRatio:0,pressureSize:!0,pressureCurve:1.35,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:8,taperEnd:18,stabilization:5}},{id:"real-g-pen",name:"Pluma G Real",tool:"pen",description:"Textura analógica y leve sangrado para manga tradicional.",settings:{size:5,minSizeRatio:.1,pressureSize:!0,pressureCurve:1.2,flow:.95,pressureFlow:!0,inkMode:"uniform",hardness:.85,antiAliasing:"weak",spacing:.07,tipShape:"circle",taperStart:6,taperEnd:14,stabilization:4}},{id:"turnip-pen",name:"Pluma Cuchara (Kabura)",tool:"pen",description:"Grosor consistente y líneas limpias para entintar detalles.",settings:{size:4,minSizeRatio:.65,pressureSize:!0,pressureCurve:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:3,taperEnd:8,stabilization:6}},{id:"manga-line",name:"Entintado Manga",tool:"pen",description:"Estabilización alta para curvas suaves sin temblor de pulso.",settings:{size:8,minSizeRatio:0,pressureSize:!0,pressureCurve:1.5,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"weak",spacing:.05,tipShape:"circle",taperStart:12,taperEnd:24,stabilization:8}},{id:"watercolor",name:"Acuarela Suave",tool:"brush",description:"Bordes suaves translúcidos ideales para colorear y sombras.",settings:{size:30,minSizeRatio:.5,pressureSize:!0,pressureCurve:1.2,flow:.45,pressureFlow:!0,inkMode:"accumulate",hardness:.35,antiAliasing:"strong",spacing:.08,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:3}},{id:"thick-paint",name:"Óleo / Pintura Densa",tool:"brush",description:"Pincelada corpórea con cobertura rápida y buena mezcla.",settings:{size:26,minSizeRatio:.6,pressureSize:!0,pressureCurve:1.2,flow:.85,pressureFlow:!0,inkMode:"accumulate",hardness:.7,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"airbrush",name:"Aerógrafo Suave",tool:"brush",description:"Gradaciones difuminadas sin textura de borde evidente.",settings:{size:60,minSizeRatio:.4,pressureSize:!0,pressureCurve:1.1,flow:.3,pressureFlow:!0,inkMode:"accumulate",hardness:.1,antiAliasing:"strong",spacing:.04,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:1}},{id:"flat-brush",name:"Pincel Plano",tool:"brush",description:"Puntas rectangulares para fondos arquitectónicos y ropa.",settings:{size:22,minSizeRatio:.7,pressureSize:!1,pressureCurve:1.2,flow:.85,pressureFlow:!0,inkMode:"accumulate",hardness:.9,antiAliasing:"medium",spacing:.05,tipShape:"square",tipRoundness:.28,tipAngle:35,followDirection:!0,taperStart:0,taperEnd:0,stabilization:2}},{id:"hard-eraser",name:"Borrador Duro",tool:"eraser",description:"Eliminación 100% limpia sin halos difusos.",settings:{size:24,minSizeRatio:.3,pressureSize:!1,pressureCurve:1.2,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:3}},{id:"soft-eraser",name:"Borrador Suave",tool:"eraser",description:"Desvanecimiento gradual para degradados y luz.",settings:{size:36,minSizeRatio:.5,pressureSize:!0,pressureCurve:1.2,flow:.6,pressureFlow:!0,inkMode:"accumulate",hardness:.25,antiAliasing:"strong",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"kneaded-eraser",name:"Goma Maleable",tool:"eraser",description:"Baja opacidad para aclarar trazos suavemente.",settings:{size:50,minSizeRatio:.6,pressureSize:!0,pressureCurve:1.1,flow:.3,pressureFlow:!0,inkMode:"accumulate",hardness:.4,antiAliasing:"strong",spacing:.06,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"straight-line",name:"Línea Directa",tool:"shape",description:"Trazos rectos precisos entre dos puntos.",settings:{shapeType:"line",shapeFill:"stroke",size:4}},{id:"rect",name:"Rectángulo",tool:"shape",description:"Cajas delimitadoras y marcos ortogonales.",settings:{shapeType:"rectangle",shapeFill:"stroke",size:4}},{id:"ellipse",name:"Elipse / Círculo",tool:"shape",description:"Círculos y óvalos con o sin relleno.",settings:{shapeType:"ellipse",shapeFill:"stroke",size:4}},{id:"bucket-layer",name:"Capa de Edición",tool:"bucket",description:"Rellena respetando únicamente las líneas de la capa actual.",settings:{tolerance:20}},{id:"bucket-all",name:"Todas las Capas",tool:"bucket",description:"Rellena respetando la composición visible de todas las capas.",settings:{tolerance:35}},{id:"eyedropper-pixel",name:"Cuentagotas",tool:"eyedropper",description:"Muestrea el color exacto del píxel seleccionado.",settings:{}},{id:"hand-pan",name:"Mover Lienzo",tool:"hand",description:"Desplaza el encuadre del lienzo sin alterarlo.",settings:{}}],Tr={size:6,minSizeRatio:.15,pressureSize:!0,pressureCurve:1.2,opacity:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",tipRoundness:1,tipAngle:0,followDirection:!1,taperStart:6,taperEnd:12,stabilization:5,tolerance:20,shapeType:"rectangle",shapeFill:"stroke",color:"#111111"},Cp=["#111111","#ffffff","#e74c3c","#e67e22","#f1c40f","#2ecc71","#1abc9c","#3498db","#9b59b6","#34495e","#7f8c8d","#bdc3c7"],tl="oniri.subtools.v1",Rp=["pen","brush","eraser","eyedropper","bucket","shape","hand"];function Lp(i){if(!i||typeof i!="object")return!1;const e=i;return typeof e.id=="string"&&typeof e.name=="string"&&typeof e.tool=="string"&&Rp.includes(e.tool)&&!!e.settings&&typeof e.settings=="object"}function oo(i){return i.map(e=>({...e,settings:{...e.settings}}))}let Ui=[];function Pp(){try{const i=localStorage.getItem(tl);if(i){const e=JSON.parse(i);if(e&&e.v===1&&Array.isArray(e.items)&&e.items.length>0&&e.items.every(Lp)){const t=oo(e.items);Ui=Array.isArray(e.deleted)?e.deleted.filter(r=>typeof r=="string"):[];const n=new Set(t.map(r=>r.id));for(const r of Ii)!n.has(r.id)&&!Ui.includes(r.id)&&t.push({...r,settings:{...r.settings}});return t}}}catch{}return oo(Ii)}let Zt=Pp();function ki(){try{const i={v:1,items:Zt,deleted:[...Ui]};localStorage.setItem(tl,JSON.stringify(i))}catch{}}function wn(i){return Zt.find(e=>e.id===i)}function Dp(i){const e=Ii.find(t=>t.tool===i);return e?{...e.settings}:{}}function Hi(i,e){return{...Tr,...i.settings,color:e}}const mr=wn("g-pen")??Zt[0];let be={tool:"pen",activeSubToolId:mr?mr.id:"g-pen",brush:mr?Hi(mr,Tr.color):{...Tr},propertiesOpen:!0,primaryColor:"#111111",secondaryColor:"#ffffff",activeColorSlot:"primary",isTransparentColor:!1,colorHistory:Cp};const Ts=new Set;function Jt(){for(const i of Ts)i(be)}function vt(){return be}function gr(){return be.tool}function xn(i){if(be.tool===i)return;const t=Zt.filter(r=>r.tool===i)[0],n=t?t.id:be.activeSubToolId;be={...be,tool:i,activeSubToolId:n,brush:t?Hi(t,be.brush.color):be.brush},Jt()}function lo(i){const e=wn(i);e&&(be={...be,tool:e.tool,activeSubToolId:e.id,brush:Hi(e,be.brush.color)},Jt())}function Ip(i){return Zt.filter(e=>e.tool===i)}function ft(i){be={...be,brush:{...be.brush,...i}};const e=wn(be.activeSubToolId);if(e){const t={...i};delete t.color,e.settings={...e.settings,...t},ki()}i.color&&!be.isTransparentColor&&(be.activeColorSlot==="primary"?be.primaryColor=i.color:be.secondaryColor=i.color,Is(i.color)),Jt()}let co=0;function nl(){return co+=1,`custom-${Date.now().toString(36)}-${co.toString(36)}`}function Up(i,e){var o;const t=be.tool,n={...((o=wn(be.activeSubToolId))==null?void 0:o.settings)??{}},r=wn(be.activeSubToolId),s={id:nl(),name:i.trim()||"Pincel nuevo",tool:t,description:r?`Pincel personalizado basado en ${r.name}.`:"Pincel personalizado.",settings:Object.keys(n).length>0?n:{...Tr},custom:!0};return Zt.push(s),ki(),s}function Np(i){const e=wn(i);if(!e)return null;const t={...e,id:nl(),name:`${e.name} (copia)`,description:`Copia personalizada de ${e.name}.`,settings:{...e.settings},custom:!0};return Zt.push(t),ki(),t}function Fp(i){const e=wn(i);if(!e||Zt.filter(n=>n.tool===e.tool).length<=1)return!1;if(Zt=Zt.filter(n=>n.id!==i),Ii.some(n=>n.id===i)&&!Ui.includes(i)&&Ui.push(i),ki(),be.activeSubToolId===i){const n=Zt.find(r=>r.tool===e.tool);n&&(be={...be,tool:n.tool,activeSubToolId:n.id,brush:Hi(n,be.brush.color)})}return Jt(),!0}function Op(i){const e=wn(i);if(!e)return;const t=Ii.find(n=>n.id===i);e.settings=t?{...t.settings}:Dp(e.tool),ki(),be.activeSubToolId===i&&(be={...be,brush:Hi(e,be.brush.color)}),Jt()}function us(i){be={...be,primaryColor:i,isTransparentColor:!1,activeColorSlot:"primary",brush:{...be.brush,color:i}},Is(i),Jt()}function hs(i){be={...be,secondaryColor:i,isTransparentColor:!1,activeColorSlot:"secondary",brush:{...be.brush,color:i}},Is(i),Jt()}function uo(i){const e=i==="primary"?be.primaryColor:be.secondaryColor;be={...be,activeColorSlot:i,isTransparentColor:!1,brush:{...be.brush,color:e}},Jt()}function il(){const i=be.primaryColor,e=be.secondaryColor,t=be.activeColorSlot==="primary"?e:i;be={...be,primaryColor:e,secondaryColor:i,brush:{...be.brush,color:t}},Jt()}function rl(i){const e=!be.isTransparentColor;be={...be,isTransparentColor:e,brush:{...be.brush,color:e?"transparent":be.activeColorSlot==="primary"?be.primaryColor:be.secondaryColor}},Jt()}function Is(i){if(!i||i==="transparent")return;const e=i.toLowerCase(),t=be.colorHistory.filter(n=>n.toLowerCase()!==e);be.colorHistory=[e,...t].slice(0,16)}function ho(i){const e=i!==void 0?i:!be.propertiesOpen;be.propertiesOpen!==e&&(be={...be,propertiesOpen:e},Jt())}function sl(i){return Ts.add(i),()=>{Ts.delete(i)}}function Bp(i,e,t,n,r=20){const s=i.canvas.width,o=i.canvas.height;if(e<0||e>=s||t<0||t>=o)return;const a=i.getImageData(0,0,s,o),c=a.data,u=parseInt(n.slice(1,3),16)||0,h=parseInt(n.slice(3,5),16)||0,m=parseInt(n.slice(5,7),16)||0,f=255,p=(t*s+e)*4,_=c[p],g=c[p+1],d=c[p+2],l=c[p+3];if(_===u&&g===h&&d===m&&l===f)return;const M=(r/100*255)**2*3;function S(A){const z=c[A]-_,E=c[A+1]-g,x=c[A+2]-d,H=c[A+3]-l;return z*z+E*E+x*x+H*H<=M}function b(A){c[A]=u,c[A+1]=h,c[A+2]=m,c[A+3]=f}const R=new Uint8Array(s*o),w=[[e,t]];for(R[t*s+e]=1;w.length>0;){const[A,z]=w.pop(),E=z*s;let x=A;for(;x>0;){const G=(E+x-1)*4;if(R[E+x-1]||!S(G))break;x--}let H=A;for(;H<s-1;){const G=(E+H+1)*4;if(R[E+H+1]||!S(G))break;H++}for(let G=x;G<=H;G++)R[E+G]=1,b((E+G)*4);for(const G of[z-1,z+1]){if(G<0||G>=o)continue;const te=G*s;let L=!1;for(let C=x;C<=H;C++){const U=(te+C)*4,B=!R[te+C]&&S(U);!L&&B?(w.push([C,G]),L=!0):L&&!B&&(L=!1)}}}i.putImageData(a,0,0)}function zp(i=30){const e=[],t=[];return{push(n,r){e.push({layerId:n,data:r}),e.length>i&&e.shift(),t.length=0},undo(n,r){return e.length===0?null:(t.push({layerId:n,data:r}),e.pop()??null)},redo(n,r){return t.length===0?null:(e.push({layerId:n,data:r}),t.pop()??null)},canUndo(){return e.length>0},canRedo(){return t.length>0},clear(){e.length=0,t.length=0}}}function kp(i){const e=[],t=r=>i.filter(s=>s.parentId===r);function n(r){const s=t(r);for(const o of s)o.type==="folder"?n(o.id):e.push(o)}return n(null),e}function fs(i,e){const t=document.createElement("canvas");return t.width=i,t.height=e,t}function Hp(i,e){let t=1;const n=[],r=new Set;function s(){for(const _ of r)_()}const o=fs(i,e),a=o.getContext("2d");a.fillStyle="#ffffff",a.fillRect(0,0,i,e);const c={id:"layer-paper",type:"raster",name:"Paper",canvas:o,context:a,visible:!0,opacity:1,blendMode:"source-over",isPaper:!0,parentId:null,collapsed:!1,clipped:!1};n.push(c);const u=fs(i,e),h=u.getContext("2d"),m={id:`layer-${t}`,type:"raster",name:`Layer ${t}`,canvas:u,context:h,visible:!0,opacity:1,blendMode:"source-over",isPaper:!1,parentId:null,collapsed:!1,clipped:!1};n.push(m);let f=m.id;const p={get layers(){return n},get activeLayerId(){return f},set activeLayerId(_){f!==_&&(f=_,s())},createLayer(_,g,d=!1,l){t++;const M=fs(i,e),S=M.getContext("2d");l&&(S.fillStyle=l,S.fillRect(0,0,i,e));let b=g;if(b===void 0){const A=n.find(z=>z.id===f);(A==null?void 0:A.type)==="folder"?b=A.id:A!=null&&A.parentId?b=A.parentId:b=null}const R={id:`layer-${Date.now()}-${t}`,type:"raster",name:_||`Layer ${t}`,canvas:M,context:S,visible:!0,opacity:1,blendMode:"source-over",isPaper:d,parentId:b,collapsed:!1,clipped:!1},w=n.findIndex(A=>A.id===f);return w!==-1?n.splice(w+1,0,R):n.push(R),f=R.id,s(),R},createFolder(_,g=null,d=!1){t++;const l={id:`folder-${Date.now()}-${t}`,type:"folder",name:_||(d?`Animation Folder ${t}`:`Folder ${t}`),visible:!0,opacity:1,blendMode:"source-over",isAnimationFolder:d,parentId:g,collapsed:!1,clipped:!1},M=n.findIndex(S=>S.id===f);return M!==-1?n.splice(M+1,0,l):n.push(l),f=l.id,s(),l},createAnimationFolder(_){return p.createFolder(_,null,!0)},deleteLayer(_){if(n.length<=1)return!1;const g=n.find(M=>M.id===_);if(!g||g.isPaper)return!1;const d=new Set([_]);let l=!0;for(;l;){l=!1;for(const M of n)M.parentId&&d.has(M.parentId)&&!d.has(M.id)&&(d.add(M.id),l=!0)}if(d.size>=n.length)return!1;for(let M=n.length-1;M>=0;M--)d.has(n[M].id)&&n.splice(M,1);return d.has(f)&&(f=n[n.length-1].id),s(),!0},renameLayer(_,g){const d=g.trim();if(!d)return;const l=n.find(M=>M.id===_);l&&l.name!==d&&(l.name=d,s())},toggleFolderCollapse(_){const g=n.find(d=>d.id===_&&d.type==="folder");g&&(g.collapsed=!g.collapsed,s())},toggleLayerClipping(_){const g=n.find(d=>d.id===_);g&&!g.isPaper&&(g.clipped=!g.clipped,s())},moveToFolder(_,g){const d=n.find(l=>l.id===_);if(!d||d.isPaper||d.id===g)return!1;if(g!==null){let l=n.find(M=>M.id===g);for(;l;){if(l.id===d.id)return!1;l=l.parentId?n.find(M=>M.id===l.parentId):void 0}}return d.parentId=g,s(),!0},getActiveLayer(){return n.find(_=>_.id===f)??n[n.length-1]},getActiveDrawableLayer(){const _=n.find(d=>d.id===f);if(_&&_.type==="raster"&&_.context)return _;if(_&&_.type==="folder"){const d=n.find(l=>l.parentId===_.id&&l.type==="raster"&&l.context);if(d)return d}const g=[...n].reverse().find(d=>d.type==="raster"&&d.context&&!d.isPaper);return g||p.createLayer()},setActiveLayer(_){f!==_&&(f=_,s())},setLayerVisibility(_,g){const d=n.find(l=>l.id===_);d&&d.visible!==g&&(d.visible=g,s())},setLayerOpacity(_,g){const d=n.find(l=>l.id===_);d&&(d.opacity=Math.max(0,Math.min(1,g)),s())},setLayerBlendMode(_,g){const d=n.find(l=>l.id===_);d&&(d.blendMode=g,s())},moveLayer(_,g){if(_<0||_>=n.length||g<0||g>=n.length||_===g)return;const[d]=n.splice(_,1);n.splice(g,0,d),s()},moveLayerBranch(_,g){const d=n.find(z=>z.id===_);if(!d||d.isPaper)return!1;const l=n.filter(z=>z.parentId===d.parentId),M=l.findIndex(z=>z.id===d.id);if(M===-1)return!1;let S;if(g==="up"){if(M>=l.length-1)return!1;S=l[M+1]}else if(M<=0||(S=l[M-1],S.isPaper))return!1;const b=new Set([d.id]);let R=!0;for(;R;){R=!1;for(const z of n)z.parentId&&b.has(z.parentId)&&!b.has(z.id)&&(b.add(z.id),R=!0)}const w=n.filter(z=>b.has(z.id));for(let z=n.length-1;z>=0;z--)b.has(n[z].id)&&n.splice(z,1);const A=new Set([S.id]);for(R=!0;R;){R=!1;for(const z of n)z.parentId&&A.has(z.parentId)&&!A.has(z.id)&&(A.add(z.id),R=!0)}if(g==="up"){let z=-1;for(let E=n.length-1;E>=0;E--)if(A.has(n[E].id)){z=E;break}n.splice(z+1,0,...w)}else{const z=n.findIndex(E=>E.id===S.id);n.splice(z,0,...w)}return s(),!0},subscribe(_){return r.add(_),()=>{r.delete(_)}}};return p}function Gp(i,e,t,n,r,s,o,a,c){if(i.save(),i.strokeStyle=c,i.fillStyle=c,i.lineWidth=Math.max(1,Math.round(a)),i.lineCap="round",i.lineJoin="round",i.beginPath(),s==="line")i.moveTo(e,t),i.lineTo(n,r),i.stroke();else if(s==="rectangle"){const u=Math.min(e,n),h=Math.min(t,r),m=Math.abs(n-e),f=Math.abs(r-t);o==="fill"?i.fillRect(u,h,m,f):i.strokeRect(u,h,m,f)}else if(s==="ellipse"){const u=(e+n)/2,h=(t+r)/2,m=Math.abs(n-e)/2,f=Math.abs(r-t)/2;i.ellipse(u,h,Math.max(.1,m),Math.max(.1,f),0,0,Math.PI*2),o==="fill"?i.fill():i.stroke()}i.restore()}const Vp=256,fo=2,Wp={none:0,weak:.6,medium:1.1,strong:1.8},_r=new Map;function Xp(i){const e=i.startsWith("#")?i.slice(1):i;if(/^[0-9a-fA-F]{3}$/.test(e)){const t=parseInt(e[0]+e[0],16),n=parseInt(e[1]+e[1],16),r=parseInt(e[2]+e[2],16);return[t,n,r]}if(/^[0-9a-fA-F]{6}$/.test(e)){const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),r=parseInt(e.slice(4,6),16);return[t,n,r]}return[0,0,0]}function qp(i,e,t,n,r,s){const o=i/2,a=r==="square",c=Math.max(.1,s),u=Wp[n],h=Math.max(u,o*(1-e)),m=(a?o*Math.sqrt(1+c*c):o)+h/2,f=Math.max(fo,Math.ceil(m-o)+fo),p=Math.max(2,Math.ceil(i))+f*2,_=document.createElement("canvas");_.width=p,_.height=p;const g=_.getContext("2d"),d=g.createImageData(p,p),l=d.data,[M,S,b]=Xp(t),R=p/2,w=h<=1e-4,A=n==="none";let z=0;for(let E=0;E<p;E++){const x=(E+.5-R)/c;for(let H=0;H<p;H++){const G=H+.5-R;let te;if(a){const C=Math.abs(G)-o,U=Math.abs(x)-o,B=C>0?C:0,V=U>0?U:0;te=Math.hypot(B,V)+Math.min(Math.max(C,U),0)}else te=Math.hypot(G,x)-o;let L;w?L=te<0?1:0:(L=(h*.5-te)/h,L<0?L=0:L>1&&(L=1)),A&&(L=L>=.5?1:0),l[z]=M,l[z+1]=S,l[z+2]=b,l[z+3]=L*255,z+=4}}return g.putImageData(d,0,0),_}function al(i){const e=Math.max(.4,i.diameter),t=Math.min(1,Math.max(0,i.hardness)),n=i.color||"#000000",r=i.antiAliasing??"medium",s=i.tipShape??"circle",o=Math.min(1,Math.max(.1,i.tipRoundness??1)),a=e>20?.5:.25,c=Math.max(.4,Math.round(e/a)*a),u=`${c.toFixed(2)}:${t.toFixed(3)}:${n}:${r}:${s}:${o.toFixed(2)}`;let h=_r.get(u);return h||(_r.size>=Vp&&_r.clear(),h=qp(c,t,n,r,s,o),_r.set(u,h)),h}const ct=1600,dt=900,ol=.4,po=.35,Yp=2e4;function As(i){return i<0?0:i>1?1:i}function Ri(i,e,t){const n=As(e),r=i.pressureSize?Math.pow(n,Math.max(.1,i.pressureCurve)):1;let s=1;if(i.taperStart>0){const a=Math.min(1,t/i.taperStart);s=a*a*(3-2*a)}const o=i.minSizeRatio+(1-i.minSizeRatio)*r*s;return Math.max(ol,i.size*o)}function ll(i,e){const t=As(i.pressureFlow?i.flow*Math.pow(As(e),1.2):i.flow);if(i.inkMode==="uniform"&&!i.pressureFlow)return Math.max(.02,t);const n=Math.max(.2,i.spacing*2.5),r=1-Math.pow(1-t,n);return Math.min(1,Math.max(.02,r))}function mo(i,e,t){const n=i.followDirection&&i.tipShape!=="calligraphic";let r=0;return n&&(e!==0||t!==0)&&(r=Math.atan2(t,e)*180/Math.PI),(i.tipAngle+r)*Math.PI/180}function Ci(i,e){const t=document.createElement("canvas");return t.width=i,t.height=e,t}function $p(i,e){let t=i;for(;t;){if(!t.visible)return!1;t=t.parentId?e.get(t.parentId):void 0}return!0}function go(i,e){let t=i.opacity,n=i.parentId?e.get(i.parentId):void 0;for(;n;)t*=n.opacity,n=n.parentId?e.get(n.parentId):void 0;return t}function Kp(){const i=Hp(ct,dt),e=Ci(ct,dt),t=Ci(ct,dt),n=Ci(ct,dt),r=Ci(ct,dt),s=Ci(ct,dt),o=e.getContext("2d"),a=t.getContext("2d"),c=n.getContext("2d"),u=r.getContext("2d"),h=s.getContext("2d"),m=zp(30);let f=null,p=null,_=0,g=0,d=1,l=0,M=0,S=0,b={...vt().brush},R=null,w="";function A(C,U,B,V,Y,j,ee){const Z=b,P=al({diameter:Y,hardness:Z.hardness,color:U?"#000000":Z.color,antiAliasing:Z.antiAliasing,tipShape:Z.tipShape,tipRoundness:Z.tipRoundness}),k=ll(Z,j),N=P.width,Q=P.height,ae=Z.tipShape!=="square"&&Z.tipRoundness>=.999;C.save(),U&&(C.globalCompositeOperation="destination-out"),C.globalAlpha=k,!ae&&ee!==0?(C.translate(B,V),C.rotate(ee),C.drawImage(P,-N/2,-Q/2)):C.drawImage(P,B-N/2,V-Q/2),C.restore()}function z(C,U,B,V,Y,j,ee,Z){const P=b,k=j-B,N=ee-V,Q=Math.hypot(k,N);if(Q===0)return;const ae=Math.min(.5,Math.max(.03,P.spacing)),Me=mo(P,k,N);l=Me;let le=0,de=M,Te=0;for(;!(++Te>Yp);){const F=le/Q,Oe=Y+(Z-Y)*F;let Ae=Math.max(po,Ri(P,Oe,S+le)*ae)-de;if(Ae<0&&(Ae=0),le+Ae>Q){de+=Q-le;break}le+=Ae,de=0;const me=le/Q,Ge=Y+(Z-Y)*me;A(C,U,B+k*me,V+N*me,Ri(P,Ge,S+le),Ge,Me)}S+=Q,M=de}function E(){return i.getActiveDrawableLayer().context??null}function x(C){const U=b;if(U.taperEnd<=0)return;const B=Math.hypot(C.vx,C.vy);if(B<=.5)return;const V=p==="erase",Y=V?E():o;if(!Y)return;const j=C.vx/B,ee=C.vy/B,Z=Math.max(1,C.isMouse?U.taperEnd:Math.min(U.taperEnd,B*2.5)),P=Math.min(.5,Math.max(.03,U.spacing)),k=Ri(U,d,S),N=l;let Q=0,ae=0;for(;Q<=Z&&ae++<4e3;){const Me=Math.pow(1-Q/Z,1.5),le=Math.max(ol,k*Me);A(Y,V,_+j*Q,g+ee*Q,le,d*Me,N),Q+=Math.max(po,le*P)}}function H(){if(!p)return;const C=i.getActiveDrawableLayer();(p==="paint"||p==="shape")&&(C.context&&(C.context.globalAlpha=vt().brush.opacity,C.context.drawImage(e,0,0),C.context.globalAlpha=1),o.clearRect(0,0,ct,dt)),R&&(m.push(w,R),R=null),L.compositeDirty=!0,p=null}function G(){a.clearRect(0,0,ct,dt);const C=new Map(i.layers.map(Z=>[Z.id,Z])),U=i.getActiveDrawableLayer();function B(Z,P,k){P.canvas&&(Z.save(),Z.globalAlpha=k,Z.globalCompositeOperation=P.blendMode,Z.drawImage(P.canvas,0,0),P.id===U.id&&(p==="paint"||p==="shape")&&(Z.globalAlpha=k*vt().brush.opacity,Z.drawImage(e,0,0)),Z.restore())}const V=i.layers.find(Z=>Z.isPaper&&Z.visible);if(V&&V.canvas&&B(a,V,V.opacity),f&&f.onionSkin.enabled&&f.tracks.length>0)for(const Z of f.tracks){if(!Z.visible)continue;const P=f.getOnionSkinCels(Z.id,f.settings.currentFrame);for(const k of P)k.layer.canvas&&(h.clearRect(0,0,ct,dt),h.drawImage(k.layer.canvas,0,0),f.onionSkin.mode==="tint"&&(h.save(),h.globalCompositeOperation="source-in",h.fillStyle=k.tintColor,h.fillRect(0,0,ct,dt),h.restore()),a.save(),a.globalAlpha=k.opacity,a.drawImage(s,0,0),a.restore())}const j=kp(i.layers).filter(Z=>!(Z.type!=="raster"||!Z.canvas||Z.isPaper||!$p(Z,C)||f&&!f.isLayerVisibleAtFrame(Z,f.settings.currentFrame)));let ee=0;for(;ee<j.length;){const Z=j[ee],P=go(Z,C),k=[];let N=ee+1;for(;N<j.length&&j[N].clipped;)k.push(j[N]),N++;if(k.length===0)B(a,Z,P),ee++;else{c.clearRect(0,0,ct,dt),B(c,Z,1);for(const Q of k){const ae=go(Q,C);u.clearRect(0,0,ct,dt),B(u,Q,ae),u.save(),u.globalCompositeOperation="destination-in",u.drawImage(Z.canvas,0,0),u.restore(),c.save(),c.globalCompositeOperation=Q.blendMode,c.drawImage(r,0,0),c.restore()}a.save(),a.globalAlpha=P,a.globalCompositeOperation=Z.blendMode,a.drawImage(n,0,0),a.restore(),ee=N}}L.compositeDirty=!1}function te(C,U,B,V){const Y=i.getActiveDrawableLayer();Y.context&&(R=Y.context.getImageData(0,0,ct,dt),w=Y.id,b={...vt().brush},p=V?"erase":"paint",_=C,g=U,d=B,l=mo(b,0,0),M=0,S=0,A(V?Y.context:o,V,C,U,Ri(b,B,0),B,l),L.compositeDirty=!0)}i.subscribe(()=>{L.compositeDirty=!0});const L={layerManager:i,strokeCanvas:e,compositeCanvas:t,compositeDirty:!0,setTimelineManager(C){f=C,C.subscribe(()=>{L.compositeDirty=!0}),L.compositeDirty=!0},getTimelineManager(){return f},beginStroke(C,U,B){H(),te(C,U,B,!1)},continueStroke(C,U,B){p==="paint"&&(z(o,!1,_,g,d,C,U,B),_=C,g=U,d=B,L.compositeDirty=!0)},beginErase(C,U,B){H(),te(C,U,B,!0)},continueErase(C,U,B){if(p!=="erase")return;const V=i.getActiveDrawableLayer();V.context&&(z(V.context,!0,_,g,d,C,U,B),_=C,g=U,d=B,L.compositeDirty=!0)},beginShape(C,U){H();const B=i.getActiveDrawableLayer();B.context&&(R=B.context.getImageData(0,0,ct,dt),w=B.id,p="shape",_=C,g=U,o.clearRect(0,0,ct,dt),L.compositeDirty=!0)},updateShape(C,U){if(p!=="shape")return;o.clearRect(0,0,ct,dt);const{size:B,color:V,shapeType:Y,shapeFill:j}=vt().brush;Gp(o,_,g,C,U,Y,j,B,V),L.compositeDirty=!0},endStroke(C){(p==="paint"||p==="erase")&&C&&x(C),H()},fill(C,U,B,V){p&&H();const Y=i.getActiveDrawableLayer();if(!Y.context)return;const j=Y.context.getImageData(0,0,ct,dt);m.push(Y.id,j),Bp(Y.context,C,U,B,V),L.compositeDirty=!0},undo(){p&&H();const C=i.getActiveDrawableLayer();if(!C.context)return!1;const U=C.context.getImageData(0,0,ct,dt),B=m.undo(C.id,U);if(!B)return!1;const V=i.layers.find(Y=>Y.id===B.layerId);return V&&V.context?(V.context.putImageData(B.data,0,0),L.compositeDirty=!0,!0):!1},redo(){p&&H();const C=i.getActiveDrawableLayer();if(!C.context)return!1;const U=C.context.getImageData(0,0,ct,dt),B=m.redo(C.id,U);if(!B)return!1;const V=i.layers.find(Y=>Y.id===B.layerId);return V&&V.context?(V.context.putImageData(B.data,0,0),L.compositeDirty=!0,!0):!1},canUndo(){return m.canUndo()},canRedo(){return m.canRedo()},updateComposite:G};return G(),L}const jp=.25,_o=6;function Zp(i){const e=i.getCoalescedEvents;if(typeof e!="function")return[i];try{const t=e.call(i);return t&&t.length>0?t:[i]}catch{return[i]}}function vo(i){return i.pointerType==="pen"?i.pressure>0?i.pressure:.5:1}function Jp(i){const{canvas:e,camera:t,plane:n,engine:r,docW:s,docH:o,onPickColor:a}=i,c=new bp,u=new je;let h=null,m=null,f="mouse",p=!1,_=!1,g=0,d=0,l=0,M=0,S=0,b=0,R=[],w=null,A=0,z=0,E=1;function x(){_?e.style.cursor="grabbing":p||gr()==="hand"?e.style.cursor="grab":gr()==="eyedropper"?e.style.cursor="cell":e.style.cursor="crosshair"}const H=sl(()=>x());x();const G=P=>{const k=e.getBoundingClientRect();u.x=(P.clientX-k.left)/k.width*2-1,u.y=-((P.clientY-k.top)/k.height)*2+1,c.setFromCamera(u,t);const N=c.intersectObject(n,!1);return N.length===0||!N[0].uv?null:{x:N[0].uv.x*s,y:(1-N[0].uv.y)*o}},te=(P,k,N)=>{h==="eraser"?r.continueErase(P,k,N):h==="brush"&&r.continueStroke(P,k,N)},L=(P,k,N)=>{const Q={x:P,y:k,p:N};if(R.length===0){R.push(Q),w=Q;return}const ae=R[R.length-1],Me=R.length>=2?R[R.length-2]:R[0],le=(Me.x+ae.x)/2,de=(Me.y+ae.y)/2,Te=(Me.p+ae.p)/2,F=(ae.x+Q.x)/2,Oe=(ae.y+Q.y)/2,_e=(ae.p+Q.p)/2;for(let Ae=1;Ae<=_o;Ae++){const me=Ae/_o,Ge=1-me,Ie=Ge*Ge*le+2*Ge*me*ae.x+me*me*F,T=Ge*Ge*de+2*Ge*me*ae.y+me*me*Oe,v=Te+(_e-Te)*me;te(Ie,T,v)}w={x:F,y:Oe,p:_e},R.push(Q),R.length>3&&R.shift()},C=(P,k)=>{const N=P.x-S,Q=P.y-b;if(Math.hypot(N,Q)<jp)return;A=A*.55+N*.45,z=z*.55+Q*.45,S=P.x,b=P.y,E=k;const ae=vt().brush.stabilization;if(ae<=0)l=P.x,M=P.y;else{const Me=1/(1+ae*.35);l+=(P.x-l)*Me,M+=(P.y-M)*Me}L(l,M,k)},U=P=>{if(h==="brush"||h==="eraser"){const k=vt().brush.stabilization;if(k>0){const N=1/(1+k*.35);for(let Q=0;Q<3;Q++)l+=(S-l)*N,M+=(b-M)*N}else l=S,M=b;L(l,M,E),w&&(te(l,M,E),w={x:l,y:M,p:E})}if(h=null,P!==void 0&&e.hasPointerCapture(P))try{e.releasePointerCapture(P)}catch{}m=null,r.endStroke({vx:A,vy:z,isMouse:f!=="pen"})},B=P=>{if(p||gr()==="hand"||P.button===1){_=!0,g=P.clientX,d=P.clientY,m=P.pointerId;try{e.setPointerCapture(P.pointerId)}catch{}x();return}if(h)return;const k=gr(),N=G(P);if(!N)return;if(k==="eyedropper"){const Me=r.compositeCanvas.getContext("2d"),[le,de,Te]=Me.getImageData(Math.floor(N.x),Math.floor(N.y),1,1).data,F="#"+[le,de,Te].map(Oe=>Oe.toString(16).padStart(2,"0")).join("");a==null||a(F);return}if(k==="bucket"){const{color:Me,tolerance:le}=vt().brush;r.fill(Math.floor(N.x),Math.floor(N.y),Me,le);return}m=P.pointerId,f=P.pointerType||"mouse";try{e.setPointerCapture(P.pointerId)}catch{}if(k==="shape"){h="shape",r.beginShape(N.x,N.y);return}const Q=vo(P);l=N.x,M=N.y,S=N.x,b=N.y,E=Q,A=0,z=0,R=[{x:N.x,y:N.y,p:Q}],w=R[0],k==="eraser"||vt().isTransparentColor?(h="eraser",r.beginErase(N.x,N.y,Q)):(h="brush",r.beginStroke(N.x,N.y,Q))},V=P=>{if(_){const k=P.clientX-g,N=P.clientY-d;g=P.clientX,d=P.clientY;const ae=(t.top-t.bottom)/t.zoom/window.innerHeight;t.position.x-=k*ae,t.position.y+=N*ae;return}if(h){if(h==="shape"){const k=G(P);k&&r.updateShape(k.x,k.y);return}for(const k of Zp(P)){const N=G(k);N&&C(N,vo(k))}}},Y=P=>{if(_){if(_=!1,e.hasPointerCapture(P.pointerId))try{e.releasePointerCapture(P.pointerId)}catch{}m=null,x();return}h&&U(P.pointerId)},j=P=>{P.preventDefault();const k=P.deltaY<0?1.12:.88;t.zoom=Math.max(.1,Math.min(25,t.zoom*k)),t.updateProjectionMatrix()},ee=P=>{if(P.target instanceof HTMLInputElement||P.target instanceof HTMLTextAreaElement)return;if(P.code==="Space"&&!P.repeat){P.preventDefault(),p=!0,x();return}const k=P.ctrlKey||P.metaKey,N=P.key.toLowerCase();if(k&&N==="z"&&!P.shiftKey){P.preventDefault(),r.undo();return}if(k&&(N==="y"||P.shiftKey&&N==="z")){P.preventDefault(),r.redo();return}if(k&&N==="0"){P.preventDefault(),t.position.set(0,0,10),t.zoom=1,t.updateProjectionMatrix();return}!k&&!P.altKey&&(N==="p"?xn("pen"):N==="b"?xn("brush"):N==="e"?xn("eraser"):N==="i"?xn("eyedropper"):N==="g"?xn("bucket"):N==="u"?xn("shape"):N==="h"?xn("hand"):N==="x"?il():N==="c"&&rl())},Z=P=>{P.code==="Space"&&(p=!1,x())};return e.addEventListener("pointerdown",B),e.addEventListener("pointermove",V),e.addEventListener("pointerup",Y),e.addEventListener("pointercancel",Y),e.addEventListener("wheel",j,{passive:!1}),window.addEventListener("keydown",ee),window.addEventListener("keyup",Z),{dispose:()=>{H(),h&&U(m??void 0),e.removeEventListener("pointerdown",B),e.removeEventListener("pointermove",V),e.removeEventListener("pointerup",Y),e.removeEventListener("pointercancel",Y),e.removeEventListener("wheel",j),window.removeEventListener("keydown",ee),window.removeEventListener("keyup",Z)}}}const Qp=[{id:"source-over",label:"Normal"},{id:"multiply",label:"Multiply"},{id:"screen",label:"Screen"},{id:"overlay",label:"Overlay"},{id:"darken",label:"Darken"},{id:"lighten",label:"Lighten"},{id:"color-dodge",label:"Color Dodge"},{id:"difference",label:"Difference"}];function em(i,e){let t=0,n=i.parentId?e.get(i.parentId):void 0;for(;n;)t++,n=n.parentId?e.get(n.parentId):void 0;return t}function tm(i,e){let t=i.parentId?e.get(i.parentId):void 0;for(;t;){if(t.collapsed)return!0;t=t.parentId?e.get(t.parentId):void 0}return!1}function nm(i){const e=[],t=r=>i.filter(s=>s.parentId===r).reverse();function n(r){const s=t(r);for(const o of s)e.push(o),o.type==="folder"&&n(o.id)}return n(null),e}function im(i,e){i.innerHTML="",i.style.position="absolute",i.style.top="0",i.style.right="0",i.style.bottom="0",i.style.width="250px",i.style.pointerEvents="auto",i.style.zIndex="100",i.style.display="block";const t=document.createElement("aside");t.className="layers-panel";const n=document.createElement("div");n.className="layers-tab-header";const r=document.createElement("div");r.className="layers-tab-title active",r.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
    <span>Layer</span>
  `,n.appendChild(r),t.appendChild(n);const s=document.createElement("div");s.className="layer-controls-row";const o=document.createElement("select");o.className="layer-blend-select";for(const w of Qp){const A=document.createElement("option");A.value=w.id,A.textContent=w.label,o.appendChild(A)}o.addEventListener("change",()=>{e.setLayerBlendMode(e.activeLayerId,o.value)}),s.appendChild(o);const a=document.createElement("div");a.className="layer-opacity-box";const c=document.createElement("span");c.className="layer-opacity-label",c.textContent="100%";const u=document.createElement("input");u.type="range",u.className="layer-opacity-slider",u.min="0",u.max="100",u.step="1",u.value="100",u.addEventListener("input",()=>{const w=Number(u.value);c.textContent=`${w}%`,e.setLayerOpacity(e.activeLayerId,w/100)}),a.append(u,c),s.appendChild(a),t.appendChild(s);const h=document.createElement("div");h.className="layer-folder-assign-row",h.innerHTML='<span class="assign-label">Parent:</span>';const m=document.createElement("select");m.className="layer-folder-select",m.addEventListener("change",()=>{const w=m.value==="root"?null:m.value;e.moveToFolder(e.activeLayerId,w)}),h.appendChild(m),t.appendChild(h);const f=document.createElement("div");f.className="layers-actions-bar";const p=document.createElement("button");p.className="layer-action-btn",p.title="New Raster Layer",p.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `,p.addEventListener("click",()=>e.createLayer());const _=document.createElement("button");_.className="layer-action-btn",_.title="New Layer Folder",_.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  `,_.addEventListener("click",()=>e.createFolder());const g=document.createElement("button");g.className="layer-action-btn",g.title="New Animation Folder (CSP Style)",g.innerHTML=`
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
  `,g.addEventListener("click",()=>e.createAnimationFolder());const d=document.createElement("button");d.className="layer-action-btn clip-btn",d.title="Clip at Layer Below",d.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="7" y="7" width="14" height="14" rx="2"/>
      <path d="M3 17V5a2 2 0 0 1 2-2h12"/>
      <polyline points="10 14 7 14 7 17"/>
    </svg>
  `,d.addEventListener("click",()=>{e.toggleLayerClipping(e.activeLayerId)});const l=document.createElement("button");l.className="layer-action-btn",l.title="Delete Selected Layer / Folder",l.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  `,l.addEventListener("click",()=>{e.deleteLayer(e.activeLayerId)});const M=document.createElement("button");M.className="layer-action-btn",M.title="Move Layer Up",M.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `,M.addEventListener("click",()=>{e.moveLayerBranch(e.activeLayerId,"up")});const S=document.createElement("button");S.className="layer-action-btn",S.title="Move Layer Down",S.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,S.addEventListener("click",()=>{e.moveLayerBranch(e.activeLayerId,"down")}),f.append(p,_,g,d,l,M,S),t.appendChild(f);const b=document.createElement("div");b.className="layers-list",t.appendChild(b),i.appendChild(t);function R(){b.innerHTML="";const w=e.getActiveLayer();if(w){o.value=w.blendMode;const x=Math.round(w.opacity*100);u.value=String(x),c.textContent=`${x}%`,d.classList.toggle("active",!!w.clipped)}const A=e.layers.filter(x=>x.type==="folder"&&x.id!==(w==null?void 0:w.id));m.innerHTML='<option value="root">None (Root Level)</option>';for(const x of A){const H=document.createElement("option");H.value=x.id,H.textContent=`📁 ${x.name}`,m.appendChild(H)}m.value=(w==null?void 0:w.parentId)??"root",m.disabled=!w||!!w.isPaper;const z=new Map(e.layers.map(x=>[x.id,x])),E=nm(e.layers);for(const x of E){if(tm(x,z))continue;const H=em(x,z),G=document.createElement("div");if(G.className="layer-item",G.dataset.layerId=x.id,G.classList.toggle("active",x.id===e.activeLayerId),G.classList.toggle("is-folder",x.type==="folder"),G.classList.toggle("is-clipped",!!x.clipped),H>0&&(G.style.paddingLeft=`${8+H*14}px`),x.type==="folder"){const C=document.createElement("button");C.className="layer-folder-chevron",C.title=x.collapsed?"Expand Folder":"Collapse Folder",C.innerHTML=`
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="${x.collapsed?"collapsed":""}">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        `,C.addEventListener("click",U=>{U.stopPropagation(),e.toggleFolderCollapse(x.id)}),G.appendChild(C)}else{const C=document.createElement("span");C.className="layer-chevron-spacer",G.appendChild(C)}const te=document.createElement("button");if(te.className="layer-eye-btn",te.title=x.visible?"Hide Layer":"Show Layer",te.innerHTML=x.visible?'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555555" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',te.addEventListener("click",C=>{C.stopPropagation(),e.setLayerVisibility(x.id,!x.visible)}),G.appendChild(te),x.clipped){const C=document.createElement("div");C.className="layer-clip-indicator",C.title="Clipped at layer below",G.appendChild(C)}if(x.type==="folder"){const C=document.createElement("div");C.className="layer-folder-icon",x.isAnimationFolder?(C.innerHTML=`
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
          `,C.title="Animation Folder (Track)"):C.innerHTML=`
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          `,G.appendChild(C)}else{const C=document.createElement("canvas");C.className="layer-thumb",C.width=36,C.height=22;const U=C.getContext("2d");x.isPaper?(U.fillStyle="#ffffff",U.fillRect(0,0,36,22)):x.canvas&&(U.fillStyle="#262626",U.fillRect(0,0,36,22),U.drawImage(x.canvas,0,0,36,22)),G.appendChild(C)}const L=document.createElement("span");if(L.className="layer-name-text",L.textContent=x.name,L.title="Double click to rename",L.addEventListener("dblclick",C=>{C.stopPropagation();const U=document.createElement("input");U.type="text",U.className="layer-name-input",U.value=x.name;const B=()=>{e.renameLayer(x.id,U.value)};U.addEventListener("blur",B),U.addEventListener("keydown",V=>{V.key==="Enter"?(U.removeEventListener("blur",B),B()):V.key==="Escape"&&(U.removeEventListener("blur",B),R())}),L.replaceWith(U),U.focus(),U.select()}),G.appendChild(L),x.isPaper){const C=document.createElement("span");C.className="layer-badge",C.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',G.appendChild(C)}G.addEventListener("click",()=>{e.setActiveLayer(x.id)}),b.appendChild(G)}}e.subscribe(R),R()}const rm=[{id:"pen",label:"Pluma",shortcut:"P",icon:'<path d="M12 19l7-7 3 3-7 7-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="11" cy="11" r="1.5" fill="currentColor"/>'},{id:"brush",label:"Pincel",shortcut:"B",icon:'<path d="M4 20l3-1 11-11a2 2 0 0 0-3-3L4 16z" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/>'},{id:"eraser",label:"Goma de Borrar",shortcut:"E",icon:'<path d="M16 3l5 5-9 9h-5l-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'},{id:"eyedropper",label:"Cuentagotas",shortcut:"I",icon:'<path d="M13 3l4 4 6-2-2 6-4 4-8-8z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 11l-6 6a1 1 0 0 0 0 2l3 3a1 1 0 0 0 2 0l6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'},{id:"bucket",label:"Relleno",shortcut:"G",icon:'<path d="M19 11l-8-8-8.5 8.5a2.12 2.12 0 0 0 0 3l5 5a2.12 2.12 0 0 0 3 0L19 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 2l5 5" stroke="currentColor" stroke-width="1.8"/><path d="M2 13l7.5 7.5" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="19" r="2" fill="currentColor"/>'},{id:"shape",label:"Figura",shortcut:"U",icon:'<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>'},{id:"hand",label:"Mover Lienzo",shortcut:"H",icon:'<path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M6 14v1a7 7 0 0 0 14 0v-5a2 2 0 0 0-4 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'}],sm=[3,5,8,12,18,28,45,70],am=[{id:"circle",label:"Círculo"},{id:"square",label:"Plano"},{id:"calligraphic",label:"Caligráfico"}],om=[{id:"none",label:"Ninguno"},{id:"weak",label:"Débil"},{id:"medium",label:"Medio"},{id:"strong",label:"Fuerte"}];function lm(i,e){i.innerHTML="",i.className="tools-root";const t=document.createElement("aside");t.className="lateral-toolbar";const n=new Map;for(const I of rm){const J=document.createElement("button");J.className="lateral-btn tool-btn",J.dataset.tool=I.id,J.title=`${I.label} (${I.shortcut})`,J.setAttribute("aria-label",I.label),J.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        ${I.icon}
      </svg>
      <span class="btn-shortcut">${I.shortcut}</span>
    `,J.addEventListener("click",()=>{xn(I.id),vt().propertiesOpen||ho(!0)}),t.appendChild(J),n.set(I.id,J)}const r=document.createElement("div");r.className="toolbar-divider",t.appendChild(r);const s=document.createElement("button");s.className="lateral-btn action-btn",s.title="Deshacer (Ctrl+Z)",s.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  `,s.addEventListener("click",()=>{var I;return(I=e==null?void 0:e.onUndo)==null?void 0:I.call(e)}),t.appendChild(s);const o=document.createElement("button");o.className="lateral-btn action-btn",o.title="Rehacer (Ctrl+Y)",o.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  `,o.addEventListener("click",()=>{var I;return(I=e==null?void 0:e.onRedo)==null?void 0:I.call(e)}),t.appendChild(o);const a=document.createElement("div");a.style.flex="1",t.appendChild(a);const c=document.createElement("div");c.className="csp-color-widget",c.title="Colores (X: Alternar principal/secundario, C: Color transparente)";const u=document.createElement("div");u.className="csp-swatches-overlap";const h=document.createElement("div");h.className="csp-swatch secondary",h.title="Color Secundario (Clic para seleccionar)",h.addEventListener("click",()=>uo("secondary"));const m=document.createElement("div");m.className="csp-swatch primary",m.title="Color Principal (Clic para seleccionar)",m.addEventListener("click",()=>uo("primary"));const f=document.createElement("button");f.className="csp-swap-btn",f.title="Alternar color principal y secundario (Atajo: X)",f.innerHTML=`
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="7 10 12 15 17 10"/>
      <path d="M12 15V3"/>
    </svg>
  `,f.addEventListener("click",I=>{I.stopPropagation(),il()}),u.append(h,m,f),c.appendChild(u);const p=document.createElement("div");p.className="csp-transparent-tile",p.title="Color Transparente (Atajo: C) - Convierte el pincel en borrador conservando su textura",p.innerHTML=`
    <div class="csp-checkerboard"></div>
  `,p.addEventListener("click",()=>rl()),c.appendChild(p),t.appendChild(c);const _=document.createElement("button");_.className="lateral-btn drawer-toggle-btn",_.title="Ocultar / Mostrar Panel de Propiedades y Subherramientas",_.innerHTML=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  `,_.addEventListener("click",()=>ho()),t.appendChild(_),i.appendChild(t);const g=document.createElement("div");g.className="csp-sidebar-dock";const d=document.createElement("div");d.className="dock-section subtool-section";const l=document.createElement("div");l.className="dock-section-header",l.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
    <span class="subtool-section-title">Subherramientas</span>
  `;function M(I,J,fe=!1){const pe=document.createElement("button");return pe.className=`csp-subtool-action-btn${fe?" danger":""}`,pe.textContent=I,pe.title=J,pe}const S=M("+","Crear un pincel nuevo a partir del actual (duplicar)"),b=M("↺","Restaurar los ajustes de fábrica de este pincel"),R=M("🗑","Eliminar este pincel personalizado",!0);S.addEventListener("click",()=>{const I=vt().activeSubToolId,J=Np(I)??Up("Pincel nuevo");lo(J.id)}),b.addEventListener("click",()=>{Op(vt().activeSubToolId)}),R.addEventListener("click",()=>{Fp(vt().activeSubToolId)});const w=document.createElement("div");w.className="subtool-header-actions",w.append(S,b,R),l.appendChild(w),d.appendChild(l);const A=document.createElement("div");A.className="csp-subtool-list",d.appendChild(A),g.appendChild(d);const z=document.createElement("div");z.className="dock-section prop-section";const E=document.createElement("div");E.className="dock-section-header",E.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
    <span class="prop-section-title">Propiedad de herramienta</span>
  `,z.appendChild(E);const x=document.createElement("div");x.className="dock-section-body";const H=[];function G(){const I=document.createElement("div");return I.className="prop-row-box ink-only",I.style.display="none",H.push(I),I}function te(I,J){const fe=document.createElement("div");fe.className="prop-row-header";const pe=document.createElement("span");pe.className="prop-label",pe.textContent=I;const Re=document.createElement("span");return Re.className="prop-value",Re.textContent=J,fe.append(pe,Re),{header:fe,value:Re}}function L(I,J,fe){const pe=document.createElement("input");return pe.type="range",pe.className="csp-slider",pe.min=I,pe.max=J,pe.step=fe,pe}function C(I,J){const fe=document.createElement("input");fe.type="checkbox",fe.className="csp-checkbox",fe.id=I;const pe=document.createElement("label");return pe.className="csp-check-label",pe.htmlFor=I,pe.textContent=J,{box:fe,label:pe}}function U(I,J){const fe=document.createElement("div");fe.className="csp-seg-group";const pe=new Map;for(const Re of I){const Le=document.createElement("button");Le.className="csp-seg-btn",Le.textContent=Re.label,Le.addEventListener("click",()=>J(Re.id)),fe.appendChild(Le),pe.set(Re.id,Le)}return{group:fe,buttons:pe}}const B=210,V=64,Y=Math.min(2,window.devicePixelRatio||1),j=G(),ee=document.createElement("canvas");ee.className="csp-preview-canvas",ee.width=Math.round(B*Y),ee.height=Math.round(V*Y),ee.title="Vista previa del trazo con el pincel actual",j.appendChild(ee),x.appendChild(j);const Z=()=>{const I=ee.getContext("2d");if(!I)return;const J=vt().brush;I.setTransform(Y,0,0,Y,0,0),I.clearRect(0,0,B,V);const fe=!J.color||J.color==="transparent"?"#111111":J.color,pe=12,Re=V/2,Le=V/2-pe,Be=B-pe*2,et=Math.min(1,30/Math.max(1,J.size)),gt=Math.min(.5,Math.max(.03,J.spacing)),tt=120,ot=[],ye=[],ve=[0];for(let Et=0;Et<=tt;Et++){const Ke=Et/tt,nt=pe+Ke*Be,Tt=Re+Math.sin(Ke*Math.PI*2)*Le;if(Et>0){const Ft=Et-1;ve.push(ve[Ft]+Math.hypot(nt-ot[Ft],Tt-ye[Ft]))}ot.push(nt),ye.push(Tt)}const Gt=ve[tt],Ze=Et=>{let Ke=1;for(;Ke<tt&&ve[Ke]<Et;)Ke++;const nt=ve[Ke-1],Tt=ve[Ke],Ft=Tt>nt?(Et-nt)/(Tt-nt):0;return{x:ot[Ke-1]+(ot[Ke]-ot[Ke-1])*Ft,y:ye[Ke-1]+(ye[Ke]-ye[Ke-1])*Ft,dx:ot[Ke]-ot[Ke-1],dy:ye[Ke]-ye[Ke-1]}};let Nt=0,Xi=0;for(;Nt<=Gt&&Xi++<3e3;){const Et=Nt/Gt,Ke=Ze(Nt),nt=.25+.75*Math.pow(Math.sin(Math.PI*Et),.7),Tt=Ri(J,nt,Nt/Math.max(et,.001)),Ft=Math.max(.4,Tt*et),Rt=ll(J,nt),Qt=al({diameter:Ft,hardness:J.hardness,color:fe,antiAliasing:J.antiAliasing,tipShape:J.tipShape,tipRoundness:J.tipRoundness}),Ei=(J.followDirection&&J.tipShape!=="calligraphic"?Math.atan2(Ke.dy,Ke.dx)*180/Math.PI:0)+J.tipAngle,fl=J.tipShape!=="square"&&J.tipRoundness>=.999;I.globalAlpha=Rt,!fl&&Ei!==0?(I.save(),I.translate(Ke.x,Ke.y),I.rotate(Ei*Math.PI/180),I.drawImage(Qt,-Qt.width/2,-Qt.height/2),I.restore()):I.drawImage(Qt,Ke.x-Qt.width/2,Ke.y-Qt.height/2),Nt+=Math.max(.3,Ft*gt)}I.globalAlpha=1};let P=!1;const k=()=>{P||(P=!0,requestAnimationFrame(()=>{P=!1,Z()}))},N=document.createElement("div");N.className="prop-row-box";const Q=document.createElement("div");Q.className="prop-row-header",Q.innerHTML=`
    <span class="prop-label">Tamaño del pincel</span>
    <span class="prop-value" id="size-val">6.0 px</span>
  `;const ae=document.createElement("input");ae.type="range",ae.className="csp-slider",ae.min="1",ae.max="200",ae.step="1",ae.addEventListener("input",()=>{ft({size:Number(ae.value)})});const Me=document.createElement("div");Me.className="csp-quick-size-row";for(const I of sm){const J=document.createElement("button");J.className="csp-quick-size-btn",J.textContent=String(I),J.addEventListener("click",()=>{ft({size:I})}),Me.appendChild(J)}N.append(Q,ae,Me),x.appendChild(N);const le=document.createElement("div");le.className="prop-row-box";const de=document.createElement("div");de.className="prop-row-header",de.innerHTML=`
    <span class="prop-label">Opacidad</span>
    <span class="prop-value" id="opacity-val">100%</span>
  `;const Te=document.createElement("input");Te.type="range",Te.className="csp-slider",Te.min="1",Te.max="100",Te.addEventListener("input",()=>{ft({opacity:Number(Te.value)/100})}),le.append(de,Te),x.appendChild(le);const F=document.createElement("div");F.className="prop-row-box";const Oe=document.createElement("div");Oe.className="prop-row-header",Oe.innerHTML=`
    <span class="prop-label">Densidad del pincel</span>
    <span class="prop-value" id="flow-val">100%</span>
  `;const _e=document.createElement("input");_e.type="range",_e.className="csp-slider",_e.min="1",_e.max="100",_e.addEventListener("input",()=>{ft({flow:Number(_e.value)/100})});const Ae=C("flow-pressure-check","Densidad por presión"),me=document.createElement("div");me.className="csp-toggle-row",me.append(Ae.box,Ae.label),Ae.box.addEventListener("change",()=>{ft({pressureFlow:Ae.box.checked})}),F.append(Oe,_e,me),x.appendChild(F);const Ge=document.createElement("div");Ge.className="prop-row-box";const Ie=document.createElement("div");Ie.className="prop-row-header",Ie.innerHTML=`
    <span class="prop-label">Dureza</span>
    <span class="prop-value" id="hardness-val">100%</span>
  `;const T=document.createElement("div");T.className="csp-hardness-dots-container";const v=[{val:.1,label:"Muy suave"},{val:.35,label:"Suave"},{val:.6,label:"Medio"},{val:.8,label:"Firme"},{val:1,label:"Duro"}],W=v.map((I,J)=>{const fe=document.createElement("button");return fe.className="csp-hardness-dot-btn",fe.title=I.label,fe.innerHTML=`<span class="dot-preview" style="transform: scale(${.4+J*.15});"></span>`,fe.addEventListener("click",()=>{ft({hardness:I.val})}),T.appendChild(fe),fe});Ge.append(Ie,T),x.appendChild(Ge);const se=document.createElement("div");se.className="prop-row-box";const re=document.createElement("div");re.className="prop-row-header",re.innerHTML=`
    <span class="prop-label">Estabilización</span>
    <span class="prop-value" id="stab-val">5</span>
  `;const ne=document.createElement("input");ne.type="range",ne.className="csp-slider",ne.min="0",ne.max="10",ne.step="1",ne.addEventListener("input",()=>{ft({stabilization:Number(ne.value)})}),se.append(re,ne),x.appendChild(se);const Ee=G(),oe=te("Tamaño mínimo por presión","15%"),xe=C("psize-check","Tamaño por presión"),Ce=document.createElement("div");Ce.className="csp-toggle-row",Ce.append(xe.box,xe.label);const Pe=L("0","100","1");xe.box.addEventListener("change",()=>ft({pressureSize:xe.box.checked})),Pe.addEventListener("input",()=>{ft({minSizeRatio:Number(Pe.value)/100})}),Ee.append(oe.header,Ce,Pe),x.appendChild(Ee);const ie=G(),We=te("Afinado de inicio","0 px"),Fe=L("0","60","1");Fe.addEventListener("input",()=>{ft({taperStart:Number(Fe.value)})});const Ne=te("Afinado de fin","0 px"),we=L("0","80","1");we.addEventListener("input",()=>{ft({taperEnd:Number(we.value)})}),ie.append(We.header,Fe,Ne.header,we),x.appendChild(ie);const Se=G(),ze=document.createElement("span");ze.className="prop-label",ze.textContent="Forma de punta";const qe=U(am,I=>ft({tipShape:I}));Se.append(ze,qe.group),x.appendChild(Se);const it=G(),ke=document.createElement("span");ke.className="prop-label",ke.textContent="Suavizado (anti-aliasing)";const ce=U(om,I=>ft({antiAliasing:I}));it.append(ke,ce.group),x.appendChild(it);const D=G(),ge=te("Achatamiento de punta","100%"),he=L("10","100","1");he.addEventListener("input",()=>{ft({tipRoundness:Number(he.value)/100})}),D.append(ge.header,he),x.appendChild(D);const Ue=G(),De=te("Ángulo de punta","0°"),Ye=L("0","180","1");Ye.addEventListener("input",()=>{ft({tipAngle:Number(Ye.value)})}),Ue.append(De.header,Ye),x.appendChild(Ue);const $e=document.createElement("div");$e.className="prop-row-box bucket-only";const at=document.createElement("div");at.className="prop-row-header",at.innerHTML=`
    <span class="prop-label">Tolerancia de color</span>
    <span class="prop-value" id="tol-val">20%</span>
  `;const st=document.createElement("input");st.type="range",st.className="csp-slider",st.min="0",st.max="100",st.addEventListener("input",()=>{ft({tolerance:Number(st.value)})}),$e.append(at,st),x.appendChild($e);const Xe=document.createElement("div");Xe.className="prop-row-box shape-only";const ut=document.createElement("span");ut.className="prop-label",ut.textContent="Tipo de figura",Xe.appendChild(ut);const Ct=document.createElement("div");Ct.className="csp-seg-group";const Vi=[{id:"line",label:"Línea"},{id:"rectangle",label:"Rect"},{id:"ellipse",label:"Elipse"}],Wi=new Map;for(const I of Vi){const J=document.createElement("button");J.className="csp-seg-btn",J.textContent=I.label,J.addEventListener("click",()=>ft({shapeType:I.id})),Ct.appendChild(J),Wi.set(I.id,J)}Xe.appendChild(Ct);const sn=document.createElement("span");sn.className="prop-label",sn.style.marginTop="6px",sn.textContent="Modo de relleno",Xe.appendChild(sn);const Wn=document.createElement("div");Wn.className="csp-seg-group";const Xn=[{id:"stroke",label:"Contorno"},{id:"fill",label:"Relleno"}],xi=new Map;for(const I of Xn){const J=document.createElement("button");J.className="csp-seg-btn",J.textContent=I.label,J.addEventListener("click",()=>ft({shapeFill:I.id})),Wn.appendChild(J),xi.set(I.id,J)}Xe.appendChild(Wn),x.appendChild(Xe),z.appendChild(x),g.appendChild(z);const Cn=document.createElement("div");Cn.className="dock-section color-section";const Mi=document.createElement("div");Mi.className="dock-section-header",Mi.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 0 0 20v-4a6 6 0 0 1 0-12V2z" fill="currentColor"/>
    </svg>
    <span class="color-section-title">Color y Muestras</span>
  `,Cn.appendChild(Mi);const qn=document.createElement("div");qn.className="dock-section-body";const Si=document.createElement("div");Si.className="csp-color-picker-row";const y=document.createElement("input");y.type="color",y.className="csp-color-input",y.title="Abrir selector de color nativo",y.addEventListener("input",()=>{vt().activeColorSlot==="primary"?us(y.value):hs(y.value)});const O=document.createElement("input");O.type="text",O.className="csp-hex-input",O.maxLength=7,O.placeholder="#000000",O.addEventListener("change",()=>{let I=O.value.trim();I.startsWith("#")||(I="#"+I),/^#[0-9a-fA-F]{6}$/.test(I)&&(vt().activeColorSlot==="primary"?us(I):hs(I))});const X=document.createElement("span");X.className="csp-slot-badge",X.textContent="Principal",Si.append(y,O,X),qn.appendChild(Si);const $=document.createElement("div");$.className="csp-history-grid",qn.appendChild($),Cn.appendChild(qn),g.appendChild(Cn),i.appendChild(g);const q=I=>{for(const[ye,ve]of n)ve.classList.toggle("active",I.tool===ye);g.classList.toggle("open",I.propertiesOpen),_.classList.toggle("active",I.propertiesOpen),_.innerHTML=I.propertiesOpen?'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',document.documentElement.style.setProperty("--left-dock-width",I.propertiesOpen?"278px":"48px"),m.style.background=I.primaryColor,h.style.background=I.secondaryColor,m.classList.toggle("active-slot",I.activeColorSlot==="primary"&&!I.isTransparentColor),h.classList.toggle("active-slot",I.activeColorSlot==="secondary"&&!I.isTransparentColor),p.classList.toggle("active",I.isTransparentColor);const J=Ip(I.tool),fe=J.find(ye=>ye.id===I.activeSubToolId);A.innerHTML="";for(const ye of J){const ve=document.createElement("div");ve.className="csp-subtool-item",ve.classList.toggle("active",ye.id===I.activeSubToolId),ve.classList.toggle("custom",!!ye.custom);const Gt=document.createElement("span");Gt.className="csp-subtool-dot",ve.appendChild(Gt);const Ze=document.createElement("span");Ze.className="csp-subtool-name",Ze.textContent=ye.name,ve.appendChild(Ze),ve.title=ye.description,ve.addEventListener("click",()=>{lo(ye.id)}),A.appendChild(ve)}b.disabled=!fe,R.disabled=!fe||!fe.custom;const pe=I.activeColorSlot==="primary"?I.primaryColor:I.secondaryColor;y.value=pe,O.value=pe.toUpperCase(),X.textContent=I.activeColorSlot==="primary"?"Principal":"Secundario",I.isTransparentColor&&(X.textContent="Transparente"),ae.value=String(Math.round(I.brush.size));const Re=x.querySelector("#size-val");Re&&(Re.textContent=`${Math.round(I.brush.size)} px`),Me.querySelectorAll(".csp-quick-size-btn").forEach(ye=>{ye.classList.toggle("active",Number(ye.textContent)===Math.round(I.brush.size))}),Te.value=String(Math.round(I.brush.opacity*100));const Le=x.querySelector("#opacity-val");Le&&(Le.textContent=`${Math.round(I.brush.opacity*100)}%`),_e.value=String(Math.round(I.brush.flow*100));const Be=x.querySelector("#flow-val");Be&&(Be.textContent=`${Math.round(I.brush.flow*100)}%`),Ae.box.checked=I.brush.pressureFlow;const et=x.querySelector("#hardness-val");et&&(et.textContent=`${Math.round(I.brush.hardness*100)}%`),W.forEach((ye,ve)=>{const Gt=v[ve];ye.classList.toggle("active",Math.abs(I.brush.hardness-Gt.val)<.12)}),ne.value=String(Math.round(I.brush.stabilization));const gt=x.querySelector("#stab-val");gt&&(gt.textContent=String(Math.round(I.brush.stabilization))),xe.box.checked=I.brush.pressureSize,Pe.value=String(Math.round(I.brush.minSizeRatio*100)),Pe.disabled=!I.brush.pressureSize,oe.value.textContent=`${Math.round(I.brush.minSizeRatio*100)}%`,Fe.value=String(Math.round(I.brush.taperStart)),We.value.textContent=`${Math.round(I.brush.taperStart)} px`,we.value=String(Math.round(I.brush.taperEnd)),Ne.value.textContent=`${Math.round(I.brush.taperEnd)} px`;for(const[ye,ve]of qe.buttons)ve.classList.toggle("active",I.brush.tipShape===ye);for(const[ye,ve]of ce.buttons)ve.classList.toggle("active",I.brush.antiAliasing===ye);he.value=String(Math.round(I.brush.tipRoundness*100)),ge.value.textContent=`${Math.round(I.brush.tipRoundness*100)}%`,Ye.value=String(Math.round(I.brush.tipAngle)),De.value.textContent=`${Math.round(I.brush.tipAngle)}°`;const tt=I.tool==="pen"||I.tool==="brush"||I.tool==="eraser";for(const ye of H)ye.style.display=tt?"flex":"none";tt&&k(),$e.style.display=I.tool==="bucket"?"block":"none",st.value=String(Math.round(I.brush.tolerance));const ot=x.querySelector("#tol-val");ot&&(ot.textContent=`${Math.round(I.brush.tolerance)}%`),Xe.style.display=I.tool==="shape"?"block":"none";for(const[ye,ve]of Wi)ve.classList.toggle("active",I.brush.shapeType===ye);for(const[ye,ve]of xi)ve.classList.toggle("active",I.brush.shapeFill===ye);$.innerHTML="";for(const ye of I.colorHistory){const ve=document.createElement("div");ve.className="csp-history-chip",ve.style.backgroundColor=ye,ve.title=ye.toUpperCase(),ve.classList.toggle("active",ye.toLowerCase()===pe.toLowerCase()),ve.addEventListener("click",()=>{I.activeColorSlot==="primary"?us(ye):hs(ye)}),$.appendChild(ve)}};q(vt()),sl(q)}const cm=document.getElementById("viewport")??document.body,Us=document.createElement("canvas");cm.appendChild(Us);const Ir=new el({canvas:Us,antialias:!0,alpha:!0});Ir.setSize(window.innerWidth,window.innerHeight);Ir.setPixelRatio(Math.min(window.devicePixelRatio,2));const Ns=new Ep,Mn=new Yo(-1,1,1,-1,.1,100);Mn.position.set(0,.6,10);function cl(){const i=window.innerWidth,e=window.innerHeight,t=i/e;Ir.setSize(i,e);const n=11.5,r=19,s=n*t,o=s<r?r/s:1,a=n*o;Mn.left=-a*t/2,Mn.right=a*t/2,Mn.top=a/2,Mn.bottom=-a/2,Mn.updateProjectionMatrix()}window.addEventListener("resize",cl);cl();const dm=new zi(16.08,9.08),um=new Pr({color:526344,side:$t}),dl=new tn(dm,um);dl.position.set(0,0,-.01);Ns.add(dl);const rn=Kp(),Ar=Tp(rn.layerManager);rn.setTimelineManager(Ar);Ar.tracks.length===0&&Ar.createTrack("Animation 1");const Gi=new yp(rn.compositeCanvas);Gi.minFilter=Pt;Gi.magFilter=Pt;Gi.generateMipmaps=!1;const hm=new zi(16,9),fm=new Pr({map:Gi,side:$t}),ul=new tn(hm,fm);Ns.add(ul);Jp({canvas:Us,camera:Mn,plane:ul,engine:rn,docW:ct,docH:dt,onPickColor:i=>{ft({color:i})}});const xo=document.getElementById("tools-container");xo&&lm(xo,{onUndo:()=>rn.undo(),onRedo:()=>rn.redo()});const Mo=document.getElementById("layers-container");Mo&&im(Mo,rn.layerManager);const So=document.getElementById("timeline-container");So&&Ap(So,Ar,rn.layerManager);function hl(){requestAnimationFrame(hl),rn.compositeDirty&&(rn.updateComposite(),Gi.needsUpdate=!0),Ir.render(Ns,Mn)}hl();console.log("AnimacionApp: Lateral Toolbar, Layers Panel, Timeline and Brush Engine mounted.");
