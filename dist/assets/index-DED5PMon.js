(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ja="160",cd=0,_o=1,dd=2,cc=1,ud=2,Jn=3,xi=0,pn=1,In=2,gi=0,ur=1,xo=2,yo=3,bo=4,pd=5,Pi=100,fd=101,hd=102,Mo=103,So=104,md=200,gd=201,vd=202,_d=203,ka=204,Oa=205,xd=206,yd=207,bd=208,Md=209,Sd=210,Ed=211,Td=212,wd=213,Cd=214,Ad=0,Ld=1,Rd=2,Fs=3,Pd=4,Dd=5,Id=6,Nd=7,dc=0,Fd=1,Ud=2,vi=0,kd=1,Od=2,Bd=3,zd=4,Hd=5,Gd=6,uc=300,fr=301,hr=302,Ba=303,za=304,Hs=306,Ha=1e3,Nn=1001,Ga=1002,on=1003,Eo=1004,ta=1005,dn=1006,Vd=1007,Fr=1008,_i=1009,Wd=1010,Xd=1011,Za=1012,pc=1013,fi=1014,hi=1015,Ur=1016,fc=1017,hc=1018,Fi=1020,$d=1021,Fn=1023,qd=1024,Yd=1025,Ui=1026,mr=1027,Kd=1028,mc=1029,jd=1030,gc=1031,vc=1033,na=33776,ia=33777,ra=33778,sa=33779,To=35840,wo=35841,Co=35842,Ao=35843,_c=36196,Lo=37492,Ro=37496,Po=37808,Do=37809,Io=37810,No=37811,Fo=37812,Uo=37813,ko=37814,Oo=37815,Bo=37816,zo=37817,Ho=37818,Go=37819,Vo=37820,Wo=37821,aa=36492,Xo=36494,$o=36495,Zd=36283,qo=36284,Yo=36285,Ko=36286,xc=3e3,ki=3001,Jd=3200,Qd=3201,eu=0,tu=1,Mn="",Kt="srgb",ti="srgb-linear",Ja="display-p3",Gs="display-p3-linear",Us="linear",wt="srgb",ks="rec709",Os="p3",$i=7680,jo=519,nu=512,iu=513,ru=514,yc=515,su=516,au=517,ou=518,lu=519,Zo=35044,Jo="300 es",Va=1035,ei=2e3,Bs=2001;class _r{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oa=Math.PI/180,Wa=180/Math.PI;function Br(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function un(n,e,t){return Math.max(e,Math.min(t,n))}function cu(n,e){return(n%e+e)%e}function la(n,e,t){return(1-t)*n+t*e}function Qo(n){return(n&n-1)===0&&n!==0}function Xa(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Tr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class xt{constructor(e=0,t=0){xt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(un(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,i,r,s,o,a,c,l){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],d=i[4],f=i[7],v=i[2],x=i[5],b=i[8],E=r[0],h=r[3],p=r[6],T=r[1],u=r[4],m=r[7],S=r[2],y=r[5],g=r[8];return s[0]=o*E+a*T+c*S,s[3]=o*h+a*u+c*y,s[6]=o*p+a*m+c*g,s[1]=l*E+d*T+f*S,s[4]=l*h+d*u+f*y,s[7]=l*p+d*m+f*g,s[2]=v*E+x*T+b*S,s[5]=v*h+x*u+b*y,s[8]=v*p+x*m+b*g,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8];return t*o*d-t*a*l-i*s*d+i*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],f=d*o-a*l,v=a*c-d*s,x=l*s-o*c,b=t*f+i*v+r*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/b;return e[0]=f*E,e[1]=(r*l-d*i)*E,e[2]=(a*i-r*o)*E,e[3]=v*E,e[4]=(d*t-r*c)*E,e[5]=(r*s-a*t)*E,e[6]=x*E,e[7]=(i*c-l*t)*E,e[8]=(o*t-i*s)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ca.makeScale(e,t)),this}rotate(e){return this.premultiply(ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ca=new dt;function bc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function du(){const n=zs("canvas");return n.style.display="block",n}const el={};function Nr(n){n in el||(el[n]=!0,console.warn(n))}const tl=new dt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nl=new dt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),as={[ti]:{transfer:Us,primaries:ks,toReference:n=>n,fromReference:n=>n},[Kt]:{transfer:wt,primaries:ks,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Gs]:{transfer:Us,primaries:Os,toReference:n=>n.applyMatrix3(nl),fromReference:n=>n.applyMatrix3(tl)},[Ja]:{transfer:wt,primaries:Os,toReference:n=>n.convertSRGBToLinear().applyMatrix3(nl),fromReference:n=>n.applyMatrix3(tl).convertLinearToSRGB()}},uu=new Set([ti,Gs]),bt={enabled:!0,_workingColorSpace:ti,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!uu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=as[e].toReference,r=as[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return as[n].primaries},getTransfer:function(n){return n===Mn?Us:as[n].transfer}};function pr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function da(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let qi;class Mc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{qi===void 0&&(qi=zs("canvas")),qi.width=e.width,qi.height=e.height;const i=qi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=pr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(pr(t[i]/255)*255):t[i]=pr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let pu=0;class Sc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=Br(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ua(r[o].image)):s.push(ua(r[o]))}else s=ua(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ua(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Mc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fu=0;class fn extends _r{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,i=Nn,r=Nn,s=dn,o=Fr,a=Fn,c=_i,l=fn.DEFAULT_ANISOTROPY,d=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Br(),this.name="",this.source=new Sc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===ki?Kt:Mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ha:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case Ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ha:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case Ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Kt?ki:xc}set encoding(e){Nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ki?Kt:Mn}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=uc;fn.DEFAULT_ANISOTROPY=1;class jt{constructor(e=0,t=0,i=0,r=1){jt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],f=c[8],v=c[1],x=c[5],b=c[9],E=c[2],h=c[6],p=c[10];if(Math.abs(d-v)<.01&&Math.abs(f-E)<.01&&Math.abs(b-h)<.01){if(Math.abs(d+v)<.1&&Math.abs(f+E)<.1&&Math.abs(b+h)<.1&&Math.abs(l+x+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const u=(l+1)/2,m=(x+1)/2,S=(p+1)/2,y=(d+v)/4,g=(f+E)/4,w=(b+h)/4;return u>m&&u>S?u<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(u),r=y/i,s=g/i):m>S?m<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(m),i=y/r,s=w/r):S<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),i=g/s,r=w/s),this.set(i,r,s,t),this}let T=Math.sqrt((h-b)*(h-b)+(f-E)*(f-E)+(v-d)*(v-d));return Math.abs(T)<.001&&(T=1),this.x=(h-b)/T,this.y=(f-E)/T,this.z=(v-d)/T,this.w=Math.acos((l+x+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class hu extends _r{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new jt(0,0,e,t),this.scissorTest=!1,this.viewport=new jt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Nr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ki?Kt:Mn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new fn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Sc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends hu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ec extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mu extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],d=i[r+2],f=i[r+3];const v=s[o+0],x=s[o+1],b=s[o+2],E=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=f;return}if(a===1){e[t+0]=v,e[t+1]=x,e[t+2]=b,e[t+3]=E;return}if(f!==E||c!==v||l!==x||d!==b){let h=1-a;const p=c*v+l*x+d*b+f*E,T=p>=0?1:-1,u=1-p*p;if(u>Number.EPSILON){const S=Math.sqrt(u),y=Math.atan2(S,p*T);h=Math.sin(h*y)/S,a=Math.sin(a*y)/S}const m=a*T;if(c=c*h+v*m,l=l*h+x*m,d=d*h+b*m,f=f*h+E*m,h===1-a){const S=1/Math.sqrt(c*c+l*l+d*d+f*f);c*=S,l*=S,d*=S,f*=S}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],d=i[r+3],f=s[o],v=s[o+1],x=s[o+2],b=s[o+3];return e[t]=a*b+d*f+c*x-l*v,e[t+1]=c*b+d*v+l*f-a*x,e[t+2]=l*b+d*x+a*v-c*f,e[t+3]=d*b-a*f-c*v-l*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),d=a(r/2),f=a(s/2),v=c(i/2),x=c(r/2),b=c(s/2);switch(o){case"XYZ":this._x=v*d*f+l*x*b,this._y=l*x*f-v*d*b,this._z=l*d*b+v*x*f,this._w=l*d*f-v*x*b;break;case"YXZ":this._x=v*d*f+l*x*b,this._y=l*x*f-v*d*b,this._z=l*d*b-v*x*f,this._w=l*d*f+v*x*b;break;case"ZXY":this._x=v*d*f-l*x*b,this._y=l*x*f+v*d*b,this._z=l*d*b+v*x*f,this._w=l*d*f-v*x*b;break;case"ZYX":this._x=v*d*f-l*x*b,this._y=l*x*f+v*d*b,this._z=l*d*b-v*x*f,this._w=l*d*f+v*x*b;break;case"YZX":this._x=v*d*f+l*x*b,this._y=l*x*f+v*d*b,this._z=l*d*b-v*x*f,this._w=l*d*f-v*x*b;break;case"XZY":this._x=v*d*f-l*x*b,this._y=l*x*f-v*d*b,this._z=l*d*b+v*x*f,this._w=l*d*f+v*x*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],d=t[6],f=t[10],v=i+a+f;if(v>0){const x=.5/Math.sqrt(v+1);this._w=.25/x,this._x=(d-c)*x,this._y=(s-l)*x,this._z=(o-r)*x}else if(i>a&&i>f){const x=2*Math.sqrt(1+i-a-f);this._w=(d-c)/x,this._x=.25*x,this._y=(r+o)/x,this._z=(s+l)/x}else if(a>f){const x=2*Math.sqrt(1+a-i-f);this._w=(s-l)/x,this._x=(r+o)/x,this._y=.25*x,this._z=(c+d)/x}else{const x=2*Math.sqrt(1+f-i-a);this._w=(o-r)/x,this._x=(s+l)/x,this._y=(c+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(un(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+o*a+r*l-s*c,this._y=r*d+o*c+s*a-i*l,this._z=s*d+o*l+i*c-r*a,this._w=o*d-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const x=1-t;return this._w=x*o+t*this._w,this._x=x*i+t*this._x,this._y=x*r+t*this._y,this._z=x*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,a),f=Math.sin((1-t)*d)/l,v=Math.sin(t*d)/l;return this._w=o*f+this._w*v,this._x=i*f+this._x*v,this._y=r*f+this._y*v,this._z=s*f+this._z*v,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class re{constructor(e=0,t=0,i=0){re.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),d=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+c*l+o*f-a*d,this.y=i+c*d+a*l-s*f,this.z=r+c*f+s*d-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pa.copy(this).projectOnVector(e),this.sub(pa)}reflect(e){return this.sub(pa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(un(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new re,il=new zr;class Hr{constructor(e=new re(1/0,1/0,1/0),t=new re(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Cn):Cn.fromBufferAttribute(s,o),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),os.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),os.copy(i.boundingBox)),os.applyMatrix4(e.matrixWorld),this.union(os)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),ls.subVectors(this.max,wr),Yi.subVectors(e.a,wr),Ki.subVectors(e.b,wr),ji.subVectors(e.c,wr),oi.subVectors(Ki,Yi),li.subVectors(ji,Ki),Ei.subVectors(Yi,ji);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Ei.z,Ei.y,oi.z,0,-oi.x,li.z,0,-li.x,Ei.z,0,-Ei.x,-oi.y,oi.x,0,-li.y,li.x,0,-Ei.y,Ei.x,0];return!fa(t,Yi,Ki,ji,ls)||(t=[1,0,0,0,1,0,0,0,1],!fa(t,Yi,Ki,ji,ls))?!1:(cs.crossVectors(oi,li),t=[cs.x,cs.y,cs.z],fa(t,Yi,Ki,ji,ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const qn=[new re,new re,new re,new re,new re,new re,new re,new re],Cn=new re,os=new Hr,Yi=new re,Ki=new re,ji=new re,oi=new re,li=new re,Ei=new re,wr=new re,ls=new re,cs=new re,Ti=new re;function fa(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ti.fromArray(n,s);const a=r.x*Math.abs(Ti.x)+r.y*Math.abs(Ti.y)+r.z*Math.abs(Ti.z),c=e.dot(Ti),l=t.dot(Ti),d=i.dot(Ti);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const gu=new Hr,Cr=new re,ha=new re;class Qa{constructor(e=new re,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):gu.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cr.subVectors(e,this.center);const t=Cr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Cr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cr.copy(e.center).add(ha)),this.expandByPoint(Cr.copy(e.center).sub(ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Yn=new re,ma=new re,ds=new re,ci=new re,ga=new re,us=new re,va=new re;class Tc{constructor(e=new re,t=new re(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ma.copy(e).add(t).multiplyScalar(.5),ds.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(ma);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ds),a=ci.dot(this.direction),c=-ci.dot(ds),l=ci.lengthSq(),d=Math.abs(1-o*o);let f,v,x,b;if(d>0)if(f=o*c-a,v=o*a-c,b=s*d,f>=0)if(v>=-b)if(v<=b){const E=1/d;f*=E,v*=E,x=f*(f+o*v+2*a)+v*(o*f+v+2*c)+l}else v=s,f=Math.max(0,-(o*v+a)),x=-f*f+v*(v+2*c)+l;else v=-s,f=Math.max(0,-(o*v+a)),x=-f*f+v*(v+2*c)+l;else v<=-b?(f=Math.max(0,-(-o*s+a)),v=f>0?-s:Math.min(Math.max(-s,-c),s),x=-f*f+v*(v+2*c)+l):v<=b?(f=0,v=Math.min(Math.max(-s,-c),s),x=v*(v+2*c)+l):(f=Math.max(0,-(o*s+a)),v=f>0?s:Math.min(Math.max(-s,-c),s),x=-f*f+v*(v+2*c)+l);else v=o>0?-s:s,f=Math.max(0,-(o*v+a)),x=-f*f+v*(v+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ma).addScaledVector(ds,v),x}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);const i=Yn.dot(this.direction),r=Yn.dot(Yn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,v=this.origin;return l>=0?(i=(e.min.x-v.x)*l,r=(e.max.x-v.x)*l):(i=(e.max.x-v.x)*l,r=(e.min.x-v.x)*l),d>=0?(s=(e.min.y-v.y)*d,o=(e.max.y-v.y)*d):(s=(e.max.y-v.y)*d,o=(e.min.y-v.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-v.z)*f,c=(e.max.z-v.z)*f):(a=(e.max.z-v.z)*f,c=(e.min.z-v.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,i,r,s){ga.subVectors(t,e),us.subVectors(i,e),va.crossVectors(ga,us);let o=this.direction.dot(va),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,e);const c=a*this.direction.dot(us.crossVectors(ci,us));if(c<0)return null;const l=a*this.direction.dot(ga.cross(ci));if(l<0||c+l>o)return null;const d=-a*ci.dot(va);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(e,t,i,r,s,o,a,c,l,d,f,v,x,b,E,h){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,d,f,v,x,b,E,h)}set(e,t,i,r,s,o,a,c,l,d,f,v,x,b,E,h){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=d,p[10]=f,p[14]=v,p[3]=x,p[7]=b,p[11]=E,p[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Zi.setFromMatrixColumn(e,0).length(),s=1/Zi.setFromMatrixColumn(e,1).length(),o=1/Zi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const v=o*d,x=o*f,b=a*d,E=a*f;t[0]=c*d,t[4]=-c*f,t[8]=l,t[1]=x+b*l,t[5]=v-E*l,t[9]=-a*c,t[2]=E-v*l,t[6]=b+x*l,t[10]=o*c}else if(e.order==="YXZ"){const v=c*d,x=c*f,b=l*d,E=l*f;t[0]=v+E*a,t[4]=b*a-x,t[8]=o*l,t[1]=o*f,t[5]=o*d,t[9]=-a,t[2]=x*a-b,t[6]=E+v*a,t[10]=o*c}else if(e.order==="ZXY"){const v=c*d,x=c*f,b=l*d,E=l*f;t[0]=v-E*a,t[4]=-o*f,t[8]=b+x*a,t[1]=x+b*a,t[5]=o*d,t[9]=E-v*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const v=o*d,x=o*f,b=a*d,E=a*f;t[0]=c*d,t[4]=b*l-x,t[8]=v*l+E,t[1]=c*f,t[5]=E*l+v,t[9]=x*l-b,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const v=o*c,x=o*l,b=a*c,E=a*l;t[0]=c*d,t[4]=E-v*f,t[8]=b*f+x,t[1]=f,t[5]=o*d,t[9]=-a*d,t[2]=-l*d,t[6]=x*f+b,t[10]=v-E*f}else if(e.order==="XZY"){const v=o*c,x=o*l,b=a*c,E=a*l;t[0]=c*d,t[4]=-f,t[8]=l*d,t[1]=v*f+E,t[5]=o*d,t[9]=x*f-b,t[2]=b*f-x,t[6]=a*d,t[10]=E*f+v}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vu,e,_u)}lookAt(e,t,i){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),di.crossVectors(i,hn),di.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),di.crossVectors(i,hn)),di.normalize(),ps.crossVectors(hn,di),r[0]=di.x,r[4]=ps.x,r[8]=hn.x,r[1]=di.y,r[5]=ps.y,r[9]=hn.y,r[2]=di.z,r[6]=ps.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],d=i[1],f=i[5],v=i[9],x=i[13],b=i[2],E=i[6],h=i[10],p=i[14],T=i[3],u=i[7],m=i[11],S=i[15],y=r[0],g=r[4],w=r[8],_=r[12],M=r[1],C=r[5],D=r[9],G=r[13],P=r[2],k=r[6],F=r[10],$=r[14],ee=r[3],X=r[7],N=r[11],q=r[15];return s[0]=o*y+a*M+c*P+l*ee,s[4]=o*g+a*C+c*k+l*X,s[8]=o*w+a*D+c*F+l*N,s[12]=o*_+a*G+c*$+l*q,s[1]=d*y+f*M+v*P+x*ee,s[5]=d*g+f*C+v*k+x*X,s[9]=d*w+f*D+v*F+x*N,s[13]=d*_+f*G+v*$+x*q,s[2]=b*y+E*M+h*P+p*ee,s[6]=b*g+E*C+h*k+p*X,s[10]=b*w+E*D+h*F+p*N,s[14]=b*_+E*G+h*$+p*q,s[3]=T*y+u*M+m*P+S*ee,s[7]=T*g+u*C+m*k+S*X,s[11]=T*w+u*D+m*F+S*N,s[15]=T*_+u*G+m*$+S*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],d=e[2],f=e[6],v=e[10],x=e[14],b=e[3],E=e[7],h=e[11],p=e[15];return b*(+s*c*f-r*l*f-s*a*v+i*l*v+r*a*x-i*c*x)+E*(+t*c*x-t*l*v+s*o*v-r*o*x+r*l*d-s*c*d)+h*(+t*l*f-t*a*x-s*o*f+i*o*x+s*a*d-i*l*d)+p*(-r*a*d-t*c*f+t*a*v+r*o*f-i*o*v+i*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],d=e[8],f=e[9],v=e[10],x=e[11],b=e[12],E=e[13],h=e[14],p=e[15],T=f*h*l-E*v*l+E*c*x-a*h*x-f*c*p+a*v*p,u=b*v*l-d*h*l-b*c*x+o*h*x+d*c*p-o*v*p,m=d*E*l-b*f*l+b*a*x-o*E*x-d*a*p+o*f*p,S=b*f*c-d*E*c-b*a*v+o*E*v+d*a*h-o*f*h,y=t*T+i*u+r*m+s*S;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const g=1/y;return e[0]=T*g,e[1]=(E*v*s-f*h*s-E*r*x+i*h*x+f*r*p-i*v*p)*g,e[2]=(a*h*s-E*c*s+E*r*l-i*h*l-a*r*p+i*c*p)*g,e[3]=(f*c*s-a*v*s-f*r*l+i*v*l+a*r*x-i*c*x)*g,e[4]=u*g,e[5]=(d*h*s-b*v*s+b*r*x-t*h*x-d*r*p+t*v*p)*g,e[6]=(b*c*s-o*h*s-b*r*l+t*h*l+o*r*p-t*c*p)*g,e[7]=(o*v*s-d*c*s+d*r*l-t*v*l-o*r*x+t*c*x)*g,e[8]=m*g,e[9]=(b*f*s-d*E*s-b*i*x+t*E*x+d*i*p-t*f*p)*g,e[10]=(o*E*s-b*a*s+b*i*l-t*E*l-o*i*p+t*a*p)*g,e[11]=(d*a*s-o*f*s-d*i*l+t*f*l+o*i*x-t*a*x)*g,e[12]=S*g,e[13]=(d*E*r-b*f*r+b*i*v-t*E*v-d*i*h+t*f*h)*g,e[14]=(b*a*r-o*E*r-b*i*c+t*E*c+o*i*h-t*a*h)*g,e[15]=(o*f*r-d*a*r+d*i*c-t*f*c-o*i*v+t*a*v)*g,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,d=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,d*a+i,d*c-r*o,0,l*c-r*a,d*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,d=o+o,f=a+a,v=s*l,x=s*d,b=s*f,E=o*d,h=o*f,p=a*f,T=c*l,u=c*d,m=c*f,S=i.x,y=i.y,g=i.z;return r[0]=(1-(E+p))*S,r[1]=(x+m)*S,r[2]=(b-u)*S,r[3]=0,r[4]=(x-m)*y,r[5]=(1-(v+p))*y,r[6]=(h+T)*y,r[7]=0,r[8]=(b+u)*g,r[9]=(h-T)*g,r[10]=(1-(v+E))*g,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Zi.set(r[0],r[1],r[2]).length();const o=Zi.set(r[4],r[5],r[6]).length(),a=Zi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],An.copy(this);const l=1/s,d=1/o,f=1/a;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=d,An.elements[5]*=d,An.elements[6]*=d,An.elements[8]*=f,An.elements[9]*=f,An.elements[10]*=f,t.setFromRotationMatrix(An),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=ei){const c=this.elements,l=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),v=(i+r)/(i-r);let x,b;if(a===ei)x=-(o+s)/(o-s),b=-2*o*s/(o-s);else if(a===Bs)x=-o/(o-s),b=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=v,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ei){const c=this.elements,l=1/(t-e),d=1/(i-r),f=1/(o-s),v=(t+e)*l,x=(i+r)*d;let b,E;if(a===ei)b=(o+s)*f,E=-2*f;else if(a===Bs)b=s*f,E=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-v,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-x,c[2]=0,c[6]=0,c[10]=E,c[14]=-b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Zi=new re,An=new Zt,vu=new re(0,0,0),_u=new re(1,1,1),di=new re,ps=new re,hn=new re,rl=new Zt,sl=new zr;class Vs{constructor(e=0,t=0,i=0,r=Vs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],d=r[9],f=r[2],v=r[6],x=r[10];switch(t){case"XYZ":this._y=Math.asin(un(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(v,l),this._z=0);break;case"YXZ":this._x=Math.asin(-un(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,x),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(un(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-f,x),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-un(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(v,x),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(un(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,x));break;case"XZY":this._z=Math.asin(-un(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(v,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return rl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sl.setFromEuler(this),this.setFromQuaternion(sl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vs.DEFAULT_ORDER="XYZ";class eo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xu=0;const al=new re,Ji=new zr,Kn=new Zt,fs=new re,Ar=new re,yu=new re,bu=new zr,ol=new re(1,0,0),ll=new re(0,1,0),cl=new re(0,0,1),Mu={type:"added"},Su={type:"removed"};class gn extends _r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new re,t=new Vs,i=new zr,r=new re(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Zt},normalMatrix:{value:new dt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(ol,e)}rotateY(e){return this.rotateOnAxis(ll,e)}rotateZ(e){return this.rotateOnAxis(cl,e)}translateOnAxis(e,t){return al.copy(e).applyQuaternion(this.quaternion),this.position.add(al.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ol,e)}translateY(e){return this.translateOnAxis(ll,e)}translateZ(e){return this.translateOnAxis(cl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fs.copy(e):fs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Ar,fs,this.up):Kn.lookAt(fs,Ar,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),Ji.setFromRotationMatrix(Kn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Mu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Su)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,yu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,bu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),d=o(e.images),f=o(e.shapes),v=o(e.skeletons),x=o(e.animations),b=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),v.length>0&&(i.skeletons=v),x.length>0&&(i.animations=x),b.length>0&&(i.nodes=b)}return i.object=r,i;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}gn.DEFAULT_UP=new re(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ln=new re,jn=new re,_a=new re,Zn=new re,Qi=new re,er=new re,dl=new re,xa=new re,ya=new re,ba=new re;let hs=!1;class Pn{constructor(e=new re,t=new re,i=new re){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ln.subVectors(e,t),r.cross(Ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ln.subVectors(r,t),jn.subVectors(i,t),_a.subVectors(e,t);const o=Ln.dot(Ln),a=Ln.dot(jn),c=Ln.dot(_a),l=jn.dot(jn),d=jn.dot(_a),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const v=1/f,x=(l*c-a*d)*v,b=(o*d-a*c)*v;return s.set(1-x-b,b,x)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getUV(e,t,i,r,s,o,a,c){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),this.getInterpolation(e,t,i,r,s,o,a,c)}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static isFrontFacing(e,t,i,r){return Ln.subVectors(i,t),jn.subVectors(e,t),Ln.cross(jn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Ln.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),Pn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return Pn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Qi.subVectors(r,i),er.subVectors(s,i),xa.subVectors(e,i);const c=Qi.dot(xa),l=er.dot(xa);if(c<=0&&l<=0)return t.copy(i);ya.subVectors(e,r);const d=Qi.dot(ya),f=er.dot(ya);if(d>=0&&f<=d)return t.copy(r);const v=c*f-d*l;if(v<=0&&c>=0&&d<=0)return o=c/(c-d),t.copy(i).addScaledVector(Qi,o);ba.subVectors(e,s);const x=Qi.dot(ba),b=er.dot(ba);if(b>=0&&x<=b)return t.copy(s);const E=x*l-c*b;if(E<=0&&l>=0&&b<=0)return a=l/(l-b),t.copy(i).addScaledVector(er,a);const h=d*b-x*f;if(h<=0&&f-d>=0&&x-b>=0)return dl.subVectors(s,r),a=(f-d)/(f-d+(x-b)),t.copy(r).addScaledVector(dl,a);const p=1/(h+E+v);return o=E*p,a=v*p,t.copy(i).addScaledVector(Qi,o).addScaledVector(er,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},ms={h:0,s:0,l:0};function Ma(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Mt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=bt.workingColorSpace){return this.r=e,this.g=t,this.b=i,bt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=bt.workingColorSpace){if(e=cu(e,1),t=un(t,0,1),i=un(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Ma(o,s,e+1/3),this.g=Ma(o,s,e),this.b=Ma(o,s,e-1/3)}return bt.toWorkingColorSpace(this,r),this}setStyle(e,t=Kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const i=wc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}copyLinearToSRGB(e){return this.r=da(e.r),this.g=da(e.g),this.b=da(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return bt.fromWorkingColorSpace(tn.copy(this),e),Math.round(un(tn.r*255,0,255))*65536+Math.round(un(tn.g*255,0,255))*256+Math.round(un(tn.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.fromWorkingColorSpace(tn.copy(this),t);const i=tn.r,r=tn.g,s=tn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=d<=.5?f/(o+a):f/(2-o-a),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=bt.workingColorSpace){return bt.fromWorkingColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=Kt){bt.fromWorkingColorSpace(tn.copy(this),e);const t=tn.r,i=tn.g,r=tn.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(ms);const i=la(ui.h,ms.h,t),r=la(ui.s,ms.s,t),s=la(ui.l,ms.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new Mt;Mt.NAMES=wc;let Eu=0;class Ws extends _r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=Br(),this.name="",this.type="Material",this.blending=ur,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ka,this.blendDst=Oa,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ka&&(i.blendSrc=this.blendSrc),this.blendDst!==Oa&&(i.blendDst=this.blendDst),this.blendEquation!==Pi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xs extends Ws{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ot=new re,gs=new xt;class Gn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Zo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)gs.fromBufferAttribute(this,t),gs.applyMatrix3(e),this.setXY(t,gs.x,gs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Tr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array),s=cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zo&&(e.usage=this.usage),e}}class Cc extends Gn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ac extends Gn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Oi extends Gn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Tu=0;const xn=new Zt,Sa=new gn,tr=new re,mn=new Hr,Lr=new Hr,Wt=new re;class Hi extends _r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Br(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bc(e)?Ac:Cc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new dt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,i){return xn.makeTranslation(e,t,i),this.applyMatrix4(xn),this}scale(e,t,i){return xn.makeScale(e,t,i),this.applyMatrix4(xn),this}lookAt(e){return Sa.lookAt(e),Sa.updateMatrix(),this.applyMatrix4(Sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Oi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new re(-1/0,-1/0,-1/0),new re(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new re,1/0);return}if(e){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Lr.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(mn.min,Lr.min),mn.expandByPoint(Wt),Wt.addVectors(mn.max,Lr.max),mn.expandByPoint(Wt)):(mn.expandByPoint(Lr.min),mn.expandByPoint(Lr.max))}mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Wt.fromBufferAttribute(a,l),c&&(tr.fromBufferAttribute(e,l),Wt.add(tr)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gn(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],d=[];for(let M=0;M<a;M++)l[M]=new re,d[M]=new re;const f=new re,v=new re,x=new re,b=new xt,E=new xt,h=new xt,p=new re,T=new re;function u(M,C,D){f.fromArray(r,M*3),v.fromArray(r,C*3),x.fromArray(r,D*3),b.fromArray(o,M*2),E.fromArray(o,C*2),h.fromArray(o,D*2),v.sub(f),x.sub(f),E.sub(b),h.sub(b);const G=1/(E.x*h.y-h.x*E.y);isFinite(G)&&(p.copy(v).multiplyScalar(h.y).addScaledVector(x,-E.y).multiplyScalar(G),T.copy(x).multiplyScalar(E.x).addScaledVector(v,-h.x).multiplyScalar(G),l[M].add(p),l[C].add(p),l[D].add(p),d[M].add(T),d[C].add(T),d[D].add(T))}let m=this.groups;m.length===0&&(m=[{start:0,count:i.length}]);for(let M=0,C=m.length;M<C;++M){const D=m[M],G=D.start,P=D.count;for(let k=G,F=G+P;k<F;k+=3)u(i[k+0],i[k+1],i[k+2])}const S=new re,y=new re,g=new re,w=new re;function _(M){g.fromArray(s,M*3),w.copy(g);const C=l[M];S.copy(C),S.sub(g.multiplyScalar(g.dot(C))).normalize(),y.crossVectors(w,C);const G=y.dot(d[M])<0?-1:1;c[M*4]=S.x,c[M*4+1]=S.y,c[M*4+2]=S.z,c[M*4+3]=G}for(let M=0,C=m.length;M<C;++M){const D=m[M],G=D.start,P=D.count;for(let k=G,F=G+P;k<F;k+=3)_(i[k+0]),_(i[k+1]),_(i[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Gn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let v=0,x=i.count;v<x;v++)i.setXYZ(v,0,0,0);const r=new re,s=new re,o=new re,a=new re,c=new re,l=new re,d=new re,f=new re;if(e)for(let v=0,x=e.count;v<x;v+=3){const b=e.getX(v+0),E=e.getX(v+1),h=e.getX(v+2);r.fromBufferAttribute(t,b),s.fromBufferAttribute(t,E),o.fromBufferAttribute(t,h),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),a.fromBufferAttribute(i,b),c.fromBufferAttribute(i,E),l.fromBufferAttribute(i,h),a.add(d),c.add(d),l.add(d),i.setXYZ(b,a.x,a.y,a.z),i.setXYZ(E,c.x,c.y,c.z),i.setXYZ(h,l.x,l.y,l.z)}else for(let v=0,x=t.count;v<x;v+=3)r.fromBufferAttribute(t,v+0),s.fromBufferAttribute(t,v+1),o.fromBufferAttribute(t,v+2),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),i.setXYZ(v+0,d.x,d.y,d.z),i.setXYZ(v+1,d.x,d.y,d.z),i.setXYZ(v+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){const l=a.array,d=a.itemSize,f=a.normalized,v=new l.constructor(c.length*d);let x=0,b=0;for(let E=0,h=c.length;E<h;E++){a.isInterleavedBufferAttribute?x=c[E]*a.data.stride+a.offset:x=c[E]*d;for(let p=0;p<d;p++)v[b++]=l[x++]}return new Gn(v,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Hi,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let d=0,f=l.length;d<f;d++){const v=l[d],x=e(v,i);c.push(x)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let f=0,v=l.length;f<v;f++){const x=l[f];d.push(x.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],f=s[l];for(let v=0,x=f.length;v<x;v++)d.push(f[v].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,d=o.length;l<d;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ul=new Zt,wi=new Tc,vs=new Qa,pl=new re,nr=new re,ir=new re,rr=new re,Ea=new re,_s=new re,xs=new xt,ys=new xt,bs=new xt,fl=new re,hl=new re,ml=new re,Ms=new re,Ss=new re;class Hn extends gn{constructor(e=new Hi,t=new Xs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){_s.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=a[c],f=s[c];d!==0&&(Ea.fromBufferAttribute(f,e),o?_s.addScaledVector(Ea,d):_s.addScaledVector(Ea.sub(t),d))}t.add(_s)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere),vs.applyMatrix4(s),wi.copy(e.ray).recast(e.near),!(vs.containsPoint(wi.origin)===!1&&(wi.intersectSphere(vs,pl)===null||wi.origin.distanceToSquared(pl)>(e.far-e.near)**2))&&(ul.copy(s).invert(),wi.copy(e.ray).applyMatrix4(ul),!(i.boundingBox!==null&&wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,v=s.groups,x=s.drawRange;if(a!==null)if(Array.isArray(o))for(let b=0,E=v.length;b<E;b++){const h=v[b],p=o[h.materialIndex],T=Math.max(h.start,x.start),u=Math.min(a.count,Math.min(h.start+h.count,x.start+x.count));for(let m=T,S=u;m<S;m+=3){const y=a.getX(m),g=a.getX(m+1),w=a.getX(m+2);r=Es(this,p,e,i,l,d,f,y,g,w),r&&(r.faceIndex=Math.floor(m/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const b=Math.max(0,x.start),E=Math.min(a.count,x.start+x.count);for(let h=b,p=E;h<p;h+=3){const T=a.getX(h),u=a.getX(h+1),m=a.getX(h+2);r=Es(this,o,e,i,l,d,f,T,u,m),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let b=0,E=v.length;b<E;b++){const h=v[b],p=o[h.materialIndex],T=Math.max(h.start,x.start),u=Math.min(c.count,Math.min(h.start+h.count,x.start+x.count));for(let m=T,S=u;m<S;m+=3){const y=m,g=m+1,w=m+2;r=Es(this,p,e,i,l,d,f,y,g,w),r&&(r.faceIndex=Math.floor(m/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const b=Math.max(0,x.start),E=Math.min(c.count,x.start+x.count);for(let h=b,p=E;h<p;h+=3){const T=h,u=h+1,m=h+2;r=Es(this,o,e,i,l,d,f,T,u,m),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}}}function wu(n,e,t,i,r,s,o,a){let c;if(e.side===pn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===xi,a),c===null)return null;Ss.copy(a),Ss.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ss);return l<t.near||l>t.far?null:{distance:l,point:Ss.clone(),object:n}}function Es(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,nr),n.getVertexPosition(c,ir),n.getVertexPosition(l,rr);const d=wu(n,e,t,i,nr,ir,rr,Ms);if(d){r&&(xs.fromBufferAttribute(r,a),ys.fromBufferAttribute(r,c),bs.fromBufferAttribute(r,l),d.uv=Pn.getInterpolation(Ms,nr,ir,rr,xs,ys,bs,new xt)),s&&(xs.fromBufferAttribute(s,a),ys.fromBufferAttribute(s,c),bs.fromBufferAttribute(s,l),d.uv1=Pn.getInterpolation(Ms,nr,ir,rr,xs,ys,bs,new xt),d.uv2=d.uv1),o&&(fl.fromBufferAttribute(o,a),hl.fromBufferAttribute(o,c),ml.fromBufferAttribute(o,l),d.normal=Pn.getInterpolation(Ms,nr,ir,rr,fl,hl,ml,new re),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new re,materialIndex:0};Pn.getNormal(nr,ir,rr,f.normal),d.face=f}return d}class Gr extends Hi{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],d=[],f=[];let v=0,x=0;b("z","y","x",-1,-1,i,t,e,o,s,0),b("z","y","x",1,-1,i,t,-e,o,s,1),b("x","z","y",1,1,e,i,t,r,o,2),b("x","z","y",1,-1,e,i,-t,r,o,3),b("x","y","z",1,-1,e,t,i,r,s,4),b("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Oi(l,3)),this.setAttribute("normal",new Oi(d,3)),this.setAttribute("uv",new Oi(f,2));function b(E,h,p,T,u,m,S,y,g,w,_){const M=m/g,C=S/w,D=m/2,G=S/2,P=y/2,k=g+1,F=w+1;let $=0,ee=0;const X=new re;for(let N=0;N<F;N++){const q=N*C-G;for(let U=0;U<k;U++){const H=U*M-D;X[E]=H*T,X[h]=q*u,X[p]=P,l.push(X.x,X.y,X.z),X[E]=0,X[h]=0,X[p]=y>0?1:-1,d.push(X.x,X.y,X.z),f.push(U/g),f.push(1-N/w),$+=1}}for(let N=0;N<w;N++)for(let q=0;q<g;q++){const U=v+q+k*N,H=v+q+k*(N+1),I=v+(q+1)+k*(N+1),B=v+(q+1)+k*N;c.push(U,H,B),c.push(H,I,B),ee+=6}a.addGroup(x,ee,_),x+=ee,v+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function gr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function an(n){const e={};for(let t=0;t<n.length;t++){const i=gr(n[t]);for(const r in i)e[r]=i[r]}return e}function Cu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Lc(n){return n.getRenderTarget()===null?n.outputColorSpace:bt.workingColorSpace}const Au={clone:gr,merge:an};var Lu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ru=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends Ws{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lu,this.fragmentShader=Ru,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gr(e.uniforms),this.uniformsGroups=Cu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Rc extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Dn extends Rc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wa*2*Math.atan(Math.tan(oa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(oa*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const sr=-90,ar=1;class Pu extends gn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Dn(sr,ar,e,t);r.layers=this.layers,this.add(r);const s=new Dn(sr,ar,e,t);s.layers=this.layers,this.add(s);const o=new Dn(sr,ar,e,t);o.layers=this.layers,this.add(o);const a=new Dn(sr,ar,e,t);a.layers=this.layers,this.add(a);const c=new Dn(sr,ar,e,t);c.layers=this.layers,this.add(c);const l=new Dn(sr,ar,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===ei)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,d]=this.children,f=e.getRenderTarget(),v=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),e.render(t,d),e.setRenderTarget(f,v,x),e.xr.enabled=b,i.texture.needsPMREMUpdate=!0}}class Pc extends fn{constructor(e,t,i,r,s,o,a,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:fr,super(e,t,i,r,s,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Du extends Bi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Nr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ki?Kt:Mn),this.texture=new Pc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Gr(5,5,5),s=new zi({name:"CubemapFromEquirect",uniforms:gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:gi});s.uniforms.tEquirect.value=t;const o=new Hn(r,s),a=t.minFilter;return t.minFilter===Fr&&(t.minFilter=dn),new Pu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Ta=new re,Iu=new re,Nu=new dt;class Ai{constructor(e=new re(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ta.subVectors(i,t).cross(Iu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ta),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Nu.getNormalMatrix(e),r=this.coplanarPoint(Ta).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new Qa,Ts=new re;class Dc{constructor(e=new Ai,t=new Ai,i=new Ai,r=new Ai,s=new Ai,o=new Ai){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ei){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],d=r[5],f=r[6],v=r[7],x=r[8],b=r[9],E=r[10],h=r[11],p=r[12],T=r[13],u=r[14],m=r[15];if(i[0].setComponents(c-s,v-l,h-x,m-p).normalize(),i[1].setComponents(c+s,v+l,h+x,m+p).normalize(),i[2].setComponents(c+o,v+d,h+b,m+T).normalize(),i[3].setComponents(c-o,v-d,h-b,m-T).normalize(),i[4].setComponents(c-a,v-f,h-E,m-u).normalize(),t===ei)i[5].setComponents(c+a,v+f,h+E,m+u).normalize();else if(t===Bs)i[5].setComponents(a,f,E,u).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){return Ci.center.set(0,0,0),Ci.radius=.7071067811865476,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ts.x=r.normal.x>0?e.max.x:e.min.x,Ts.y=r.normal.y>0?e.max.y:e.min.y,Ts.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ts)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ic(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Fu(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,d){const f=l.array,v=l.usage,x=f.byteLength,b=n.createBuffer();n.bindBuffer(d,b),n.bufferData(d,f,v),l.onUploadCallback();let E;if(f instanceof Float32Array)E=n.FLOAT;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)E=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)E=n.SHORT;else if(f instanceof Uint32Array)E=n.UNSIGNED_INT;else if(f instanceof Int32Array)E=n.INT;else if(f instanceof Int8Array)E=n.BYTE;else if(f instanceof Uint8Array)E=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)E=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:b,type:E,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:x}}function s(l,d,f){const v=d.array,x=d._updateRange,b=d.updateRanges;if(n.bindBuffer(f,l),x.count===-1&&b.length===0&&n.bufferSubData(f,0,v),b.length!==0){for(let E=0,h=b.length;E<h;E++){const p=b[E];t?n.bufferSubData(f,p.start*v.BYTES_PER_ELEMENT,v,p.start,p.count):n.bufferSubData(f,p.start*v.BYTES_PER_ELEMENT,v.subarray(p.start,p.start+p.count))}d.clearUpdateRanges()}x.count!==-1&&(t?n.bufferSubData(f,x.offset*v.BYTES_PER_ELEMENT,v,x.offset,x.count):n.bufferSubData(f,x.offset*v.BYTES_PER_ELEMENT,v.subarray(x.offset,x.offset+x.count)),x.count=-1),d.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const d=i.get(l);d&&(n.deleteBuffer(d.buffer),i.delete(l))}function c(l,d){if(l.isGLBufferAttribute){const v=i.get(l);(!v||v.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);if(f===void 0)i.set(l,r(l,d));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,l,d),f.version=l.version}}return{get:o,remove:a,update:c}}class Vr extends Hi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,d=c+1,f=e/a,v=t/c,x=[],b=[],E=[],h=[];for(let p=0;p<d;p++){const T=p*v-o;for(let u=0;u<l;u++){const m=u*f-s;b.push(m,-T,0),E.push(0,0,1),h.push(u/a),h.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<a;T++){const u=T+l*p,m=T+l*(p+1),S=T+1+l*(p+1),y=T+1+l*p;x.push(u,m,y),x.push(m,S,y)}this.setIndex(x),this.setAttribute("position",new Oi(b,3)),this.setAttribute("normal",new Oi(E,3)),this.setAttribute("uv",new Oi(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Uu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ku=`#ifdef USE_ALPHAHASH
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
#endif`,Ou=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Hu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gu=`#ifdef USE_AOMAP
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
#endif`,Vu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wu=`#ifdef USE_BATCHING
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
#endif`,Xu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,$u=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ku=`#ifdef USE_IRIDESCENCE
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
#endif`,ju=`#ifdef USE_BUMPMAP
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
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,sp=`#define PI 3.141592653589793
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
} // validated`,ap=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,op=`vec3 transformedNormal = objectNormal;
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
#endif`,lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",fp=`
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
}`,hp=`#ifdef USE_ENVMAP
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
#endif`,mp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gp=`#ifdef USE_ENVMAP
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
#endif`,vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_p=`#ifdef USE_ENVMAP
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
#endif`,xp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sp=`#ifdef USE_GRADIENTMAP
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
}`,Ep=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ap=`uniform bool receiveShadow;
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
#endif`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Rp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Np=`PhysicalMaterial material;
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
#endif`,Fp=`struct PhysicalMaterial {
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
}`,Up=`
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
#endif`,kp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Op=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Gp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$p=`#if defined( USE_POINTS_UV )
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
#endif`,qp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jp=`#ifdef USE_MORPHNORMALS
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
#endif`,Zp=`#ifdef USE_MORPHTARGETS
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
#endif`,Jp=`#ifdef USE_MORPHTARGETS
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
#endif`,Qp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ef=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sf=`#ifdef USE_NORMALMAP
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
#endif`,af=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,of=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,df=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,uf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ff=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bf=`float getShadowMask() {
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
}`,Mf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sf=`#ifdef USE_SKINNING
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
#endif`,Ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tf=`#ifdef USE_SKINNING
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
#endif`,wf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Af=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rf=`#ifdef USE_TRANSMISSION
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
#endif`,Pf=`#ifdef USE_TRANSMISSION
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
#endif`,Df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ff=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Uf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kf=`uniform sampler2D t2D;
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
}`,Of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gf=`#include <common>
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
}`,Vf=`#if DEPTH_PACKING == 3200
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
}`,Wf=`#define DISTANCE
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
}`,Xf=`#define DISTANCE
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
}`,$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`uniform float scale;
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
}`,Kf=`uniform vec3 diffuse;
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
}`,jf=`#include <common>
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
}`,Zf=`uniform vec3 diffuse;
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
}`,Jf=`#define LAMBERT
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
}`,Qf=`#define LAMBERT
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
}`,eh=`#define MATCAP
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
}`,th=`#define MATCAP
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
}`,nh=`#define NORMAL
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
}`,ih=`#define NORMAL
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
}`,rh=`#define PHONG
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
}`,sh=`#define PHONG
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
}`,ah=`#define STANDARD
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
}`,oh=`#define STANDARD
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
}`,lh=`#define TOON
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
}`,ch=`#define TOON
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
}`,dh=`uniform float size;
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
}`,uh=`uniform vec3 diffuse;
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
}`,ph=`#include <common>
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
}`,fh=`uniform vec3 color;
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
}`,hh=`uniform float rotation;
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
}`,mh=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:Uu,alphahash_pars_fragment:ku,alphamap_fragment:Ou,alphamap_pars_fragment:Bu,alphatest_fragment:zu,alphatest_pars_fragment:Hu,aomap_fragment:Gu,aomap_pars_fragment:Vu,batching_pars_vertex:Wu,batching_vertex:Xu,begin_vertex:$u,beginnormal_vertex:qu,bsdfs:Yu,iridescence_fragment:Ku,bumpmap_pars_fragment:ju,clipping_planes_fragment:Zu,clipping_planes_pars_fragment:Ju,clipping_planes_pars_vertex:Qu,clipping_planes_vertex:ep,color_fragment:tp,color_pars_fragment:np,color_pars_vertex:ip,color_vertex:rp,common:sp,cube_uv_reflection_fragment:ap,defaultnormal_vertex:op,displacementmap_pars_vertex:lp,displacementmap_vertex:cp,emissivemap_fragment:dp,emissivemap_pars_fragment:up,colorspace_fragment:pp,colorspace_pars_fragment:fp,envmap_fragment:hp,envmap_common_pars_fragment:mp,envmap_pars_fragment:gp,envmap_pars_vertex:vp,envmap_physical_pars_fragment:Lp,envmap_vertex:_p,fog_vertex:xp,fog_pars_vertex:yp,fog_fragment:bp,fog_pars_fragment:Mp,gradientmap_pars_fragment:Sp,lightmap_fragment:Ep,lightmap_pars_fragment:Tp,lights_lambert_fragment:wp,lights_lambert_pars_fragment:Cp,lights_pars_begin:Ap,lights_toon_fragment:Rp,lights_toon_pars_fragment:Pp,lights_phong_fragment:Dp,lights_phong_pars_fragment:Ip,lights_physical_fragment:Np,lights_physical_pars_fragment:Fp,lights_fragment_begin:Up,lights_fragment_maps:kp,lights_fragment_end:Op,logdepthbuf_fragment:Bp,logdepthbuf_pars_fragment:zp,logdepthbuf_pars_vertex:Hp,logdepthbuf_vertex:Gp,map_fragment:Vp,map_pars_fragment:Wp,map_particle_fragment:Xp,map_particle_pars_fragment:$p,metalnessmap_fragment:qp,metalnessmap_pars_fragment:Yp,morphcolor_vertex:Kp,morphnormal_vertex:jp,morphtarget_pars_vertex:Zp,morphtarget_vertex:Jp,normal_fragment_begin:Qp,normal_fragment_maps:ef,normal_pars_fragment:tf,normal_pars_vertex:nf,normal_vertex:rf,normalmap_pars_fragment:sf,clearcoat_normal_fragment_begin:af,clearcoat_normal_fragment_maps:of,clearcoat_pars_fragment:lf,iridescence_pars_fragment:cf,opaque_fragment:df,packing:uf,premultiplied_alpha_fragment:pf,project_vertex:ff,dithering_fragment:hf,dithering_pars_fragment:mf,roughnessmap_fragment:gf,roughnessmap_pars_fragment:vf,shadowmap_pars_fragment:_f,shadowmap_pars_vertex:xf,shadowmap_vertex:yf,shadowmask_pars_fragment:bf,skinbase_vertex:Mf,skinning_pars_vertex:Sf,skinning_vertex:Ef,skinnormal_vertex:Tf,specularmap_fragment:wf,specularmap_pars_fragment:Cf,tonemapping_fragment:Af,tonemapping_pars_fragment:Lf,transmission_fragment:Rf,transmission_pars_fragment:Pf,uv_pars_fragment:Df,uv_pars_vertex:If,uv_vertex:Nf,worldpos_vertex:Ff,background_vert:Uf,background_frag:kf,backgroundCube_vert:Of,backgroundCube_frag:Bf,cube_vert:zf,cube_frag:Hf,depth_vert:Gf,depth_frag:Vf,distanceRGBA_vert:Wf,distanceRGBA_frag:Xf,equirect_vert:$f,equirect_frag:qf,linedashed_vert:Yf,linedashed_frag:Kf,meshbasic_vert:jf,meshbasic_frag:Zf,meshlambert_vert:Jf,meshlambert_frag:Qf,meshmatcap_vert:eh,meshmatcap_frag:th,meshnormal_vert:nh,meshnormal_frag:ih,meshphong_vert:rh,meshphong_frag:sh,meshphysical_vert:ah,meshphysical_frag:oh,meshtoon_vert:lh,meshtoon_frag:ch,points_vert:dh,points_frag:uh,shadow_vert:ph,shadow_frag:fh,sprite_vert:hh,sprite_frag:mh},we={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},zn={basic:{uniforms:an([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:an([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Mt(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:an([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:an([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:an([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Mt(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:an([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:an([we.points,we.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:an([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:an([we.common,we.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:an([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:an([we.sprite,we.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:an([we.common,we.displacementmap,{referencePosition:{value:new re},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:an([we.lights,we.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};zn.physical={uniforms:an([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};const ws={r:0,b:0,g:0};function gh(n,e,t,i,r,s,o){const a=new Mt(0);let c=s===!0?0:1,l,d,f=null,v=0,x=null;function b(h,p){let T=!1,u=p.isScene===!0?p.background:null;u&&u.isTexture&&(u=(p.backgroundBlurriness>0?t:e).get(u)),u===null?E(a,c):u&&u.isColor&&(E(u,1),T=!0);const m=n.xr.getEnvironmentBlendMode();m==="additive"?i.buffers.color.setClear(0,0,0,1,o):m==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),u&&(u.isCubeTexture||u.mapping===Hs)?(d===void 0&&(d=new Hn(new Gr(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:gr(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(S,y,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=u,d.material.uniforms.flipEnvMap.value=u.isCubeTexture&&u.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,d.material.toneMapped=bt.getTransfer(u.colorSpace)!==wt,(f!==u||v!==u.version||x!==n.toneMapping)&&(d.material.needsUpdate=!0,f=u,v=u.version,x=n.toneMapping),d.layers.enableAll(),h.unshift(d,d.geometry,d.material,0,0,null)):u&&u.isTexture&&(l===void 0&&(l=new Hn(new Vr(2,2),new zi({name:"BackgroundMaterial",uniforms:gr(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=u,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=bt.getTransfer(u.colorSpace)!==wt,u.matrixAutoUpdate===!0&&u.updateMatrix(),l.material.uniforms.uvTransform.value.copy(u.matrix),(f!==u||v!==u.version||x!==n.toneMapping)&&(l.material.needsUpdate=!0,f=u,v=u.version,x=n.toneMapping),l.layers.enableAll(),h.unshift(l,l.geometry,l.material,0,0,null))}function E(h,p){h.getRGB(ws,Lc(n)),i.buffers.color.setClear(ws.r,ws.g,ws.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(h,p=1){a.set(h),c=p,E(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(h){c=h,E(a,c)},render:b}}function vh(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},c=h(null);let l=c,d=!1;function f(P,k,F,$,ee){let X=!1;if(o){const N=E($,F,k);l!==N&&(l=N,x(l.object)),X=p(P,$,F,ee),X&&T(P,$,F,ee)}else{const N=k.wireframe===!0;(l.geometry!==$.id||l.program!==F.id||l.wireframe!==N)&&(l.geometry=$.id,l.program=F.id,l.wireframe=N,X=!0)}ee!==null&&t.update(ee,n.ELEMENT_ARRAY_BUFFER),(X||d)&&(d=!1,w(P,k,F,$),ee!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ee).buffer))}function v(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function x(P){return i.isWebGL2?n.bindVertexArray(P):s.bindVertexArrayOES(P)}function b(P){return i.isWebGL2?n.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function E(P,k,F){const $=F.wireframe===!0;let ee=a[P.id];ee===void 0&&(ee={},a[P.id]=ee);let X=ee[k.id];X===void 0&&(X={},ee[k.id]=X);let N=X[$];return N===void 0&&(N=h(v()),X[$]=N),N}function h(P){const k=[],F=[],$=[];for(let ee=0;ee<r;ee++)k[ee]=0,F[ee]=0,$[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:F,attributeDivisors:$,object:P,attributes:{},index:null}}function p(P,k,F,$){const ee=l.attributes,X=k.attributes;let N=0;const q=F.getAttributes();for(const U in q)if(q[U].location>=0){const I=ee[U];let B=X[U];if(B===void 0&&(U==="instanceMatrix"&&P.instanceMatrix&&(B=P.instanceMatrix),U==="instanceColor"&&P.instanceColor&&(B=P.instanceColor)),I===void 0||I.attribute!==B||B&&I.data!==B.data)return!0;N++}return l.attributesNum!==N||l.index!==$}function T(P,k,F,$){const ee={},X=k.attributes;let N=0;const q=F.getAttributes();for(const U in q)if(q[U].location>=0){let I=X[U];I===void 0&&(U==="instanceMatrix"&&P.instanceMatrix&&(I=P.instanceMatrix),U==="instanceColor"&&P.instanceColor&&(I=P.instanceColor));const B={};B.attribute=I,I&&I.data&&(B.data=I.data),ee[U]=B,N++}l.attributes=ee,l.attributesNum=N,l.index=$}function u(){const P=l.newAttributes;for(let k=0,F=P.length;k<F;k++)P[k]=0}function m(P){S(P,0)}function S(P,k){const F=l.newAttributes,$=l.enabledAttributes,ee=l.attributeDivisors;F[P]=1,$[P]===0&&(n.enableVertexAttribArray(P),$[P]=1),ee[P]!==k&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,k),ee[P]=k)}function y(){const P=l.newAttributes,k=l.enabledAttributes;for(let F=0,$=k.length;F<$;F++)k[F]!==P[F]&&(n.disableVertexAttribArray(F),k[F]=0)}function g(P,k,F,$,ee,X,N){N===!0?n.vertexAttribIPointer(P,k,F,ee,X):n.vertexAttribPointer(P,k,F,$,ee,X)}function w(P,k,F,$){if(i.isWebGL2===!1&&(P.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;u();const ee=$.attributes,X=F.getAttributes(),N=k.defaultAttributeValues;for(const q in X){const U=X[q];if(U.location>=0){let H=ee[q];if(H===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(H=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(H=P.instanceColor)),H!==void 0){const I=H.normalized,B=H.itemSize,V=t.get(H);if(V===void 0)continue;const Y=V.buffer,se=V.type,ue=V.bytesPerElement,be=i.isWebGL2===!0&&(se===n.INT||se===n.UNSIGNED_INT||H.gpuType===pc);if(H.isInterleavedBufferAttribute){const ne=H.data,W=ne.stride,Ce=H.offset;if(ne.isInstancedInterleavedBuffer){for(let oe=0;oe<U.locationSize;oe++)S(U.location+oe,ne.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let oe=0;oe<U.locationSize;oe++)m(U.location+oe);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let oe=0;oe<U.locationSize;oe++)g(U.location+oe,B/U.locationSize,se,I,W*ue,(Ce+B/U.locationSize*oe)*ue,be)}else{if(H.isInstancedBufferAttribute){for(let ne=0;ne<U.locationSize;ne++)S(U.location+ne,H.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let ne=0;ne<U.locationSize;ne++)m(U.location+ne);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let ne=0;ne<U.locationSize;ne++)g(U.location+ne,B/U.locationSize,se,I,B*ue,B/U.locationSize*ne*ue,be)}}else if(N!==void 0){const I=N[q];if(I!==void 0)switch(I.length){case 2:n.vertexAttrib2fv(U.location,I);break;case 3:n.vertexAttrib3fv(U.location,I);break;case 4:n.vertexAttrib4fv(U.location,I);break;default:n.vertexAttrib1fv(U.location,I)}}}}y()}function _(){D();for(const P in a){const k=a[P];for(const F in k){const $=k[F];for(const ee in $)b($[ee].object),delete $[ee];delete k[F]}delete a[P]}}function M(P){if(a[P.id]===void 0)return;const k=a[P.id];for(const F in k){const $=k[F];for(const ee in $)b($[ee].object),delete $[ee];delete k[F]}delete a[P.id]}function C(P){for(const k in a){const F=a[k];if(F[P.id]===void 0)continue;const $=F[P.id];for(const ee in $)b($[ee].object),delete $[ee];delete F[P.id]}}function D(){G(),d=!0,l!==c&&(l=c,x(l.object))}function G(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:D,resetDefaultState:G,dispose:_,releaseStatesOfGeometry:M,releaseStatesOfProgram:C,initAttributes:u,enableAttribute:m,disableUnusedAttributes:y}}function _h(n,e,t,i){const r=i.isWebGL2;let s;function o(d){s=d}function a(d,f){n.drawArrays(s,d,f),t.update(f,s,1)}function c(d,f,v){if(v===0)return;let x,b;if(r)x=n,b="drawArraysInstanced";else if(x=e.get("ANGLE_instanced_arrays"),b="drawArraysInstancedANGLE",x===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[b](s,d,f,v),t.update(f,s,v)}function l(d,f,v){if(v===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let b=0;b<v;b++)this.render(d[b],f[b]);else{x.multiDrawArraysWEBGL(s,d,0,f,0,v);let b=0;for(let E=0;E<v;E++)b+=f[E];t.update(b,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function xh(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const g=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(g){if(g==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),b=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),E=n.getParameter(n.MAX_VERTEX_ATTRIBS),h=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),u=v>0,m=o||e.has("OES_texture_float"),S=u&&m,y=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:d,maxTextures:f,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:b,maxAttributes:E,maxVertexUniforms:h,maxVaryings:p,maxFragmentUniforms:T,vertexTextures:u,floatFragmentTextures:m,floatVertexTextures:S,maxSamples:y}}function yh(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Ai,a=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,v){const x=f.length!==0||v||i!==0||r;return r=v,i=f.length,x},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,v){t=d(f,v,0)},this.setState=function(f,v,x){const b=f.clippingPlanes,E=f.clipIntersection,h=f.clipShadows,p=n.get(f);if(!r||b===null||b.length===0||s&&!h)s?d(null):l();else{const T=s?0:i,u=T*4;let m=p.clippingState||null;c.value=m,m=d(b,v,u,x);for(let S=0;S!==u;++S)m[S]=t[S];p.clippingState=m,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,v,x,b){const E=f!==null?f.length:0;let h=null;if(E!==0){if(h=c.value,b!==!0||h===null){const p=x+E*4,T=v.matrixWorldInverse;a.getNormalMatrix(T),(h===null||h.length<p)&&(h=new Float32Array(p));for(let u=0,m=x;u!==E;++u,m+=4)o.copy(f[u]).applyMatrix4(T,a),o.normal.toArray(h,m),h[m+3]=o.constant}c.value=h,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,h}}function bh(n){let e=new WeakMap;function t(o,a){return a===Ba?o.mapping=fr:a===za&&(o.mapping=hr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ba||a===za)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Du(c.height/2);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Nc extends Rc{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const cr=4,gl=[.125,.215,.35,.446,.526,.582],Di=20,wa=new Nc,vl=new Mt;let Ca=null,Aa=0,La=0;const Li=(1+Math.sqrt(5))/2,or=1/Li,_l=[new re(1,1,1),new re(-1,1,1),new re(1,1,-1),new re(-1,1,-1),new re(0,Li,or),new re(0,Li,-or),new re(or,0,Li),new re(-or,0,Li),new re(Li,or,0),new re(-Li,or,0)];class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ca=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ca,Aa,La),e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fr||e.mapping===hr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ca=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:Ur,format:Fn,colorSpace:ti,depthBuffer:!1},r=yl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mh(s)),this._blurMaterial=Sh(s,e,t)}return r}_compileMaterial(e){const t=new Hn(this._lodPlanes[0],e);this._renderer.compile(t,wa)}_sceneToCubeUV(e,t,i,r){const a=new Dn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,v=d.toneMapping;d.getClearColor(vl),d.toneMapping=vi,d.autoClear=!1;const x=new Xs({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),b=new Hn(new Gr,x);let E=!1;const h=e.background;h?h.isColor&&(x.color.copy(h),e.background=null,E=!0):(x.color.copy(vl),E=!0);for(let p=0;p<6;p++){const T=p%3;T===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):T===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const u=this._cubeSize;Cs(r,T*u,p>2?u:0,u,u),d.setRenderTarget(r),E&&d.render(b,a),d.render(e,a)}b.geometry.dispose(),b.material.dispose(),d.toneMapping=v,d.autoClear=f,e.background=h}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===fr||e.mapping===hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Hn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Cs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,wa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=_l[(r-1)%_l.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new Hn(this._lodPlanes[r],l),v=l.uniforms,x=this._sizeLods[i]-1,b=isFinite(s)?Math.PI/(2*x):2*Math.PI/(2*Di-1),E=s/b,h=isFinite(s)?1+Math.floor(d*E):Di;h>Di&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${Di}`);const p=[];let T=0;for(let g=0;g<Di;++g){const w=g/E,_=Math.exp(-w*w/2);p.push(_),g===0?T+=_:g<h&&(T+=2*_)}for(let g=0;g<p.length;g++)p[g]=p[g]/T;v.envMap.value=e.texture,v.samples.value=h,v.weights.value=p,v.latitudinal.value=o==="latitudinal",a&&(v.poleAxis.value=a);const{_lodMax:u}=this;v.dTheta.value=b,v.mipInt.value=u-i;const m=this._sizeLods[r],S=3*m*(r>u-cr?r-u+cr:0),y=4*(this._cubeSize-m);Cs(t,S,y,3*m,2*m),c.setRenderTarget(t),c.render(f,wa)}}function Mh(n){const e=[],t=[],i=[];let r=n;const s=n-cr+1+gl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>n-cr?c=gl[o-n+cr-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),d=-l,f=1+l,v=[d,d,f,d,f,f,d,d,f,f,d,f],x=6,b=6,E=3,h=2,p=1,T=new Float32Array(E*b*x),u=new Float32Array(h*b*x),m=new Float32Array(p*b*x);for(let y=0;y<x;y++){const g=y%3*2/3-1,w=y>2?0:-1,_=[g,w,0,g+2/3,w,0,g+2/3,w+1,0,g,w,0,g+2/3,w+1,0,g,w+1,0];T.set(_,E*b*y),u.set(v,h*b*y);const M=[y,y,y,y,y,y];m.set(M,p*b*y)}const S=new Hi;S.setAttribute("position",new Gn(T,E)),S.setAttribute("uv",new Gn(u,h)),S.setAttribute("faceIndex",new Gn(m,p)),e.push(S),r>cr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function yl(n,e,t){const i=new Bi(n,e,t);return i.texture.mapping=Hs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Sh(n,e,t){const i=new Float32Array(Di),r=new re(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:to(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function bl(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:to(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ml(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:to(),fragmentShader:`

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
	`}function Eh(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ba||c===za,d=c===fr||c===hr;if(l||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new xl(n)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(l&&f&&f.height>0||d&&f&&r(f)){t===null&&(t=new xl(n));const v=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,v),a.addEventListener("dispose",s),v.texture}else return null}}}return a}function r(a){let c=0;const l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Th(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function wh(n,e,t,i){const r={},s=new WeakMap;function o(f){const v=f.target;v.index!==null&&e.remove(v.index);for(const b in v.attributes)e.remove(v.attributes[b]);for(const b in v.morphAttributes){const E=v.morphAttributes[b];for(let h=0,p=E.length;h<p;h++)e.remove(E[h])}v.removeEventListener("dispose",o),delete r[v.id];const x=s.get(v);x&&(e.remove(x),s.delete(v)),i.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function a(f,v){return r[v.id]===!0||(v.addEventListener("dispose",o),r[v.id]=!0,t.memory.geometries++),v}function c(f){const v=f.attributes;for(const b in v)e.update(v[b],n.ARRAY_BUFFER);const x=f.morphAttributes;for(const b in x){const E=x[b];for(let h=0,p=E.length;h<p;h++)e.update(E[h],n.ARRAY_BUFFER)}}function l(f){const v=[],x=f.index,b=f.attributes.position;let E=0;if(x!==null){const T=x.array;E=x.version;for(let u=0,m=T.length;u<m;u+=3){const S=T[u+0],y=T[u+1],g=T[u+2];v.push(S,y,y,g,g,S)}}else if(b!==void 0){const T=b.array;E=b.version;for(let u=0,m=T.length/3-1;u<m;u+=3){const S=u+0,y=u+1,g=u+2;v.push(S,y,y,g,g,S)}}else return;const h=new(bc(v)?Ac:Cc)(v,1);h.version=E;const p=s.get(f);p&&e.remove(p),s.set(f,h)}function d(f){const v=s.get(f);if(v){const x=f.index;x!==null&&v.version<x.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:d}}function Ch(n,e,t,i){const r=i.isWebGL2;let s;function o(x){s=x}let a,c;function l(x){a=x.type,c=x.bytesPerElement}function d(x,b){n.drawElements(s,b,a,x*c),t.update(b,s,1)}function f(x,b,E){if(E===0)return;let h,p;if(r)h=n,p="drawElementsInstanced";else if(h=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",h===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[p](s,b,a,x*c,E),t.update(b,s,E)}function v(x,b,E){if(E===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let p=0;p<E;p++)this.render(x[p]/c,b[p]);else{h.multiDrawElementsWEBGL(s,b,0,a,x,0,E);let p=0;for(let T=0;T<E;T++)p+=b[T];t.update(p,s,1)}}this.setMode=o,this.setIndex=l,this.render=d,this.renderInstances=f,this.renderMultiDraw=v}function Ah(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Lh(n,e){return n[0]-e[0]}function Rh(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Ph(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new jt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,d,f){const v=l.morphTargetInfluences;if(e.isWebGL2===!0){const b=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,E=b!==void 0?b.length:0;let h=s.get(d);if(h===void 0||h.count!==E){let k=function(){G.dispose(),s.delete(d),d.removeEventListener("dispose",k)};var x=k;h!==void 0&&h.texture.dispose();const u=d.morphAttributes.position!==void 0,m=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],g=d.morphAttributes.normal||[],w=d.morphAttributes.color||[];let _=0;u===!0&&(_=1),m===!0&&(_=2),S===!0&&(_=3);let M=d.attributes.position.count*_,C=1;M>e.maxTextureSize&&(C=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const D=new Float32Array(M*C*4*E),G=new Ec(D,M,C,E);G.type=hi,G.needsUpdate=!0;const P=_*4;for(let F=0;F<E;F++){const $=y[F],ee=g[F],X=w[F],N=M*C*4*F;for(let q=0;q<$.count;q++){const U=q*P;u===!0&&(o.fromBufferAttribute($,q),D[N+U+0]=o.x,D[N+U+1]=o.y,D[N+U+2]=o.z,D[N+U+3]=0),m===!0&&(o.fromBufferAttribute(ee,q),D[N+U+4]=o.x,D[N+U+5]=o.y,D[N+U+6]=o.z,D[N+U+7]=0),S===!0&&(o.fromBufferAttribute(X,q),D[N+U+8]=o.x,D[N+U+9]=o.y,D[N+U+10]=o.z,D[N+U+11]=X.itemSize===4?o.w:1)}}h={count:E,texture:G,size:new xt(M,C)},s.set(d,h),d.addEventListener("dispose",k)}let p=0;for(let u=0;u<v.length;u++)p+=v[u];const T=d.morphTargetsRelative?1:1-p;f.getUniforms().setValue(n,"morphTargetBaseInfluence",T),f.getUniforms().setValue(n,"morphTargetInfluences",v),f.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}else{const b=v===void 0?0:v.length;let E=i[d.id];if(E===void 0||E.length!==b){E=[];for(let m=0;m<b;m++)E[m]=[m,0];i[d.id]=E}for(let m=0;m<b;m++){const S=E[m];S[0]=m,S[1]=v[m]}E.sort(Rh);for(let m=0;m<8;m++)m<b&&E[m][1]?(a[m][0]=E[m][0],a[m][1]=E[m][1]):(a[m][0]=Number.MAX_SAFE_INTEGER,a[m][1]=0);a.sort(Lh);const h=d.morphAttributes.position,p=d.morphAttributes.normal;let T=0;for(let m=0;m<8;m++){const S=a[m],y=S[0],g=S[1];y!==Number.MAX_SAFE_INTEGER&&g?(h&&d.getAttribute("morphTarget"+m)!==h[y]&&d.setAttribute("morphTarget"+m,h[y]),p&&d.getAttribute("morphNormal"+m)!==p[y]&&d.setAttribute("morphNormal"+m,p[y]),r[m]=g,T+=g):(h&&d.hasAttribute("morphTarget"+m)===!0&&d.deleteAttribute("morphTarget"+m),p&&d.hasAttribute("morphNormal"+m)===!0&&d.deleteAttribute("morphNormal"+m),r[m]=0)}const u=d.morphTargetsRelative?1:1-T;f.getUniforms().setValue(n,"morphTargetBaseInfluence",u),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function Dh(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,d=c.geometry,f=e.get(c,d);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const v=c.skeleton;r.get(v)!==l&&(v.update(),r.set(v,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class Fc extends fn{constructor(e,t,i,r,s,o,a,c,l,d){if(d=d!==void 0?d:Ui,d!==Ui&&d!==mr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Ui&&(i=fi),i===void 0&&d===mr&&(i=Fi),super(null,r,s,o,a,c,d,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:on,this.minFilter=c!==void 0?c:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Uc=new fn,kc=new Fc(1,1);kc.compareFunction=yc;const Oc=new Ec,Bc=new mu,zc=new Pc,Sl=[],El=[],Tl=new Float32Array(16),wl=new Float32Array(9),Cl=new Float32Array(4);function xr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Sl[r];if(s===void 0&&(s=new Float32Array(r),Sl[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Vt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function $s(n,e){let t=El[e];t===void 0&&(t=new Int32Array(e),El[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ih(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Nh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2fv(this.addr,e),Vt(t,e)}}function Fh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;n.uniform3fv(this.addr,e),Vt(t,e)}}function Uh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4fv(this.addr,e),Vt(t,e)}}function kh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;Cl.set(i),n.uniformMatrix2fv(this.addr,!1,Cl),Vt(t,i)}}function Oh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;wl.set(i),n.uniformMatrix3fv(this.addr,!1,wl),Vt(t,i)}}function Bh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,i))return;Tl.set(i),n.uniformMatrix4fv(this.addr,!1,Tl),Vt(t,i)}}function zh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Hh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2iv(this.addr,e),Vt(t,e)}}function Gh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3iv(this.addr,e),Vt(t,e)}}function Vh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4iv(this.addr,e),Vt(t,e)}}function Wh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Xh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2uiv(this.addr,e),Vt(t,e)}}function $h(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3uiv(this.addr,e),Vt(t,e)}}function qh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4uiv(this.addr,e),Vt(t,e)}}function Yh(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?kc:Uc;t.setTexture2D(e||s,r)}function Kh(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Bc,r)}function jh(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||zc,r)}function Zh(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Oc,r)}function Jh(n){switch(n){case 5126:return Ih;case 35664:return Nh;case 35665:return Fh;case 35666:return Uh;case 35674:return kh;case 35675:return Oh;case 35676:return Bh;case 5124:case 35670:return zh;case 35667:case 35671:return Hh;case 35668:case 35672:return Gh;case 35669:case 35673:return Vh;case 5125:return Wh;case 36294:return Xh;case 36295:return $h;case 36296:return qh;case 35678:case 36198:case 36298:case 36306:case 35682:return Yh;case 35679:case 36299:case 36307:return Kh;case 35680:case 36300:case 36308:case 36293:return jh;case 36289:case 36303:case 36311:case 36292:return Zh}}function Qh(n,e){n.uniform1fv(this.addr,e)}function em(n,e){const t=xr(e,this.size,2);n.uniform2fv(this.addr,t)}function tm(n,e){const t=xr(e,this.size,3);n.uniform3fv(this.addr,t)}function nm(n,e){const t=xr(e,this.size,4);n.uniform4fv(this.addr,t)}function im(n,e){const t=xr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function rm(n,e){const t=xr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function sm(n,e){const t=xr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function am(n,e){n.uniform1iv(this.addr,e)}function om(n,e){n.uniform2iv(this.addr,e)}function lm(n,e){n.uniform3iv(this.addr,e)}function cm(n,e){n.uniform4iv(this.addr,e)}function dm(n,e){n.uniform1uiv(this.addr,e)}function um(n,e){n.uniform2uiv(this.addr,e)}function pm(n,e){n.uniform3uiv(this.addr,e)}function fm(n,e){n.uniform4uiv(this.addr,e)}function hm(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Uc,s[o])}function mm(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Bc,s[o])}function gm(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||zc,s[o])}function vm(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Oc,s[o])}function _m(n){switch(n){case 5126:return Qh;case 35664:return em;case 35665:return tm;case 35666:return nm;case 35674:return im;case 35675:return rm;case 35676:return sm;case 5124:case 35670:return am;case 35667:case 35671:return om;case 35668:case 35672:return lm;case 35669:case 35673:return cm;case 5125:return dm;case 36294:return um;case 36295:return pm;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return hm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return vm}}class xm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Jh(t.type)}}class ym{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_m(t.type)}}class bm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Ra=/(\w+)(\])?(\[|\.)?/g;function Al(n,e){n.seq.push(e),n.map[e.id]=e}function Mm(n,e,t){const i=n.name,r=i.length;for(Ra.lastIndex=0;;){const s=Ra.exec(i),o=Ra.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Al(t,l===void 0?new xm(a,n,e):new ym(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new bm(a),Al(t,f)),t=f}}}class Ps{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Mm(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ll(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Sm=37297;let Em=0;function Tm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function wm(n){const e=bt.getPrimaries(bt.workingColorSpace),t=bt.getPrimaries(n);let i;switch(e===t?i="":e===Os&&t===ks?i="LinearDisplayP3ToLinearSRGB":e===ks&&t===Os&&(i="LinearSRGBToLinearDisplayP3"),n){case ti:case Gs:return[i,"LinearTransferOETF"];case Kt:case Ja:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Rl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Tm(n.getShaderSource(e),o)}else return r}function Cm(n,e){const t=wm(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Am(n,e){let t;switch(e){case kd:t="Linear";break;case Od:t="Reinhard";break;case Bd:t="OptimizedCineon";break;case zd:t="ACESFilmic";break;case Gd:t="AgX";break;case Hd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Lm(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(dr).join(`
`)}function Rm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(dr).join(`
`)}function Pm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Dm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function dr(n){return n!==""}function Pl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Im=/^[ \t]*#include +<([\w\d./]+)>/gm;function $a(n){return n.replace(Im,Fm)}const Nm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Fm(n,e){let t=lt[e];if(t===void 0){const i=Nm.get(e);if(i!==void 0)t=lt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return $a(t)}const Um=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(n){return n.replace(Um,km)}function km(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Nl(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Om(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===cc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===ud?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function Bm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case fr:case hr:e="ENVMAP_TYPE_CUBE";break;case Hs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case hr:e="ENVMAP_MODE_REFRACTION";break}return e}function Hm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case dc:e="ENVMAP_BLENDING_MULTIPLY";break;case Fd:e="ENVMAP_BLENDING_MIX";break;case Ud:e="ENVMAP_BLENDING_ADD";break}return e}function Gm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Vm(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Om(t),l=Bm(t),d=zm(t),f=Hm(t),v=Gm(t),x=t.isWebGL2?"":Lm(t),b=Rm(t),E=Pm(s),h=r.createProgram();let p,T,u=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(dr).join(`
`),p.length>0&&(p+=`
`),T=[x,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(dr).join(`
`),T.length>0&&(T+=`
`)):(p=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),T=[x,Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vi?"#define TONE_MAPPING":"",t.toneMapping!==vi?lt.tonemapping_pars_fragment:"",t.toneMapping!==vi?Am("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,Cm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(dr).join(`
`)),o=$a(o),o=Pl(o,t),o=Dl(o,t),a=$a(a),a=Pl(a,t),a=Dl(a,t),o=Il(o),a=Il(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(u=`#version 300 es
`,p=[b,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const m=u+p+o,S=u+T+a,y=Ll(r,r.VERTEX_SHADER,m),g=Ll(r,r.FRAGMENT_SHADER,S);r.attachShader(h,y),r.attachShader(h,g),t.index0AttributeName!==void 0?r.bindAttribLocation(h,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(h,0,"position"),r.linkProgram(h);function w(D){if(n.debug.checkShaderErrors){const G=r.getProgramInfoLog(h).trim(),P=r.getShaderInfoLog(y).trim(),k=r.getShaderInfoLog(g).trim();let F=!0,$=!0;if(r.getProgramParameter(h,r.LINK_STATUS)===!1)if(F=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,h,y,g);else{const ee=Rl(r,y,"vertex"),X=Rl(r,g,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(h,r.VALIDATE_STATUS)+`

Program Info Log: `+G+`
`+ee+`
`+X)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(P===""||k==="")&&($=!1);$&&(D.diagnostics={runnable:F,programLog:G,vertexShader:{log:P,prefix:p},fragmentShader:{log:k,prefix:T}})}r.deleteShader(y),r.deleteShader(g),_=new Ps(r,h),M=Dm(r,h)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(h,Sm)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(h),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Em++,this.cacheKey=e,this.usedTimes=1,this.program=h,this.vertexShader=y,this.fragmentShader=g,this}let Wm=0;class Xm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new $m(e),t.set(e,i)),i}}class $m{constructor(e){this.id=Wm++,this.code=e,this.usedTimes=0}}function qm(n,e,t,i,r,s,o){const a=new eo,c=new Xm,l=[],d=r.isWebGL2,f=r.logarithmicDepthBuffer,v=r.vertexTextures;let x=r.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(_){return _===0?"uv":`uv${_}`}function h(_,M,C,D,G){const P=D.fog,k=G.geometry,F=_.isMeshStandardMaterial?D.environment:null,$=(_.isMeshStandardMaterial?t:e).get(_.envMap||F),ee=$&&$.mapping===Hs?$.image.height:null,X=b[_.type];_.precision!==null&&(x=r.getMaxPrecision(_.precision),x!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",x,"instead."));const N=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,q=N!==void 0?N.length:0;let U=0;k.morphAttributes.position!==void 0&&(U=1),k.morphAttributes.normal!==void 0&&(U=2),k.morphAttributes.color!==void 0&&(U=3);let H,I,B,V;if(X){const fe=zn[X];H=fe.vertexShader,I=fe.fragmentShader}else H=_.vertexShader,I=_.fragmentShader,c.update(_),B=c.getVertexShaderID(_),V=c.getFragmentShaderID(_);const Y=n.getRenderTarget(),se=G.isInstancedMesh===!0,ue=G.isBatchedMesh===!0,be=!!_.map,ne=!!_.matcap,W=!!$,Ce=!!_.aoMap,oe=!!_.lightMap,Ae=!!_.bumpMap,ge=!!_.normalMap,Ve=!!_.displacementMap,Ue=!!_.emissiveMap,L=!!_.metalnessMap,A=!!_.roughnessMap,J=_.anisotropy>0,de=_.clearcoat>0,ce=_.iridescence>0,le=_.sheen>0,ke=_.transmission>0,xe=J&&!!_.anisotropyMap,Ne=de&&!!_.clearcoatMap,Oe=de&&!!_.clearcoatNormalMap,et=de&&!!_.clearcoatRoughnessMap,pe=ce&&!!_.iridescenceMap,ot=ce&&!!_.iridescenceThicknessMap,tt=le&&!!_.sheenColorMap,Je=le&&!!_.sheenRoughnessMap,We=!!_.specularMap,Fe=!!_.specularColorMap,j=!!_.specularIntensityMap,Se=ke&&!!_.transmissionMap,He=ke&&!!_.thicknessMap,Le=!!_.gradientMap,ae=!!_.alphaMap,O=_.alphaTest>0,he=!!_.alphaHash,ve=!!_.extensions,Ee=!!k.attributes.uv1,De=!!k.attributes.uv2,$e=!!k.attributes.uv3;let nt=vi;return _.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(nt=n.toneMapping),{isWebGL2:d,shaderID:X,shaderType:_.type,shaderName:_.name,vertexShader:H,fragmentShader:I,defines:_.defines,customVertexShaderID:B,customFragmentShaderID:V,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:x,batching:ue,instancing:se,instancingColor:se&&G.instanceColor!==null,supportsVertexTextures:v,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ti,map:be,matcap:ne,envMap:W,envMapMode:W&&$.mapping,envMapCubeUVHeight:ee,aoMap:Ce,lightMap:oe,bumpMap:Ae,normalMap:ge,displacementMap:v&&Ve,emissiveMap:Ue,normalMapObjectSpace:ge&&_.normalMapType===tu,normalMapTangentSpace:ge&&_.normalMapType===eu,metalnessMap:L,roughnessMap:A,anisotropy:J,anisotropyMap:xe,clearcoat:de,clearcoatMap:Ne,clearcoatNormalMap:Oe,clearcoatRoughnessMap:et,iridescence:ce,iridescenceMap:pe,iridescenceThicknessMap:ot,sheen:le,sheenColorMap:tt,sheenRoughnessMap:Je,specularMap:We,specularColorMap:Fe,specularIntensityMap:j,transmission:ke,transmissionMap:Se,thicknessMap:He,gradientMap:Le,opaque:_.transparent===!1&&_.blending===ur,alphaMap:ae,alphaTest:O,alphaHash:he,combine:_.combine,mapUv:be&&E(_.map.channel),aoMapUv:Ce&&E(_.aoMap.channel),lightMapUv:oe&&E(_.lightMap.channel),bumpMapUv:Ae&&E(_.bumpMap.channel),normalMapUv:ge&&E(_.normalMap.channel),displacementMapUv:Ve&&E(_.displacementMap.channel),emissiveMapUv:Ue&&E(_.emissiveMap.channel),metalnessMapUv:L&&E(_.metalnessMap.channel),roughnessMapUv:A&&E(_.roughnessMap.channel),anisotropyMapUv:xe&&E(_.anisotropyMap.channel),clearcoatMapUv:Ne&&E(_.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&E(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&E(_.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&E(_.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&E(_.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&E(_.sheenColorMap.channel),sheenRoughnessMapUv:Je&&E(_.sheenRoughnessMap.channel),specularMapUv:We&&E(_.specularMap.channel),specularColorMapUv:Fe&&E(_.specularColorMap.channel),specularIntensityMapUv:j&&E(_.specularIntensityMap.channel),transmissionMapUv:Se&&E(_.transmissionMap.channel),thicknessMapUv:He&&E(_.thicknessMap.channel),alphaMapUv:ae&&E(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ge||J),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:Ee,vertexUv2s:De,vertexUv3s:$e,pointsUvs:G.isPoints===!0&&!!k.attributes.uv&&(be||ae),fog:!!P,useFog:_.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:G.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:U,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:be&&_.map.isVideoTexture===!0&&bt.getTransfer(_.map.colorSpace)===wt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===In,flipSided:_.side===pn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:ve&&_.extensions.derivatives===!0,extensionFragDepth:ve&&_.extensions.fragDepth===!0,extensionDrawBuffers:ve&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ve&&_.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function p(_){const M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)M.push(C),M.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(T(M,_),u(M,_),M.push(n.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function T(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function u(_,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function m(_){const M=b[_.type];let C;if(M){const D=zn[M];C=Au.clone(D.uniforms)}else C=_.uniforms;return C}function S(_,M){let C;for(let D=0,G=l.length;D<G;D++){const P=l[D];if(P.cacheKey===M){C=P,++C.usedTimes;break}}return C===void 0&&(C=new Vm(n,M,_,s),l.push(C)),C}function y(_){if(--_.usedTimes===0){const M=l.indexOf(_);l[M]=l[l.length-1],l.pop(),_.destroy()}}function g(_){c.remove(_)}function w(){c.dispose()}return{getParameters:h,getProgramCacheKey:p,getUniforms:m,acquireProgram:S,releaseProgram:y,releaseShaderCache:g,programs:l,dispose:w}}function Ym(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Km(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Fl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ul(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,v,x,b,E,h){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:v,material:x,groupOrder:b,renderOrder:f.renderOrder,z:E,group:h},n[e]=p):(p.id=f.id,p.object=f,p.geometry=v,p.material=x,p.groupOrder=b,p.renderOrder=f.renderOrder,p.z=E,p.group=h),e++,p}function a(f,v,x,b,E,h){const p=o(f,v,x,b,E,h);x.transmission>0?i.push(p):x.transparent===!0?r.push(p):t.push(p)}function c(f,v,x,b,E,h){const p=o(f,v,x,b,E,h);x.transmission>0?i.unshift(p):x.transparent===!0?r.unshift(p):t.unshift(p)}function l(f,v){t.length>1&&t.sort(f||Km),i.length>1&&i.sort(v||Fl),r.length>1&&r.sort(v||Fl)}function d(){for(let f=e,v=n.length;f<v;f++){const x=n[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:d,sort:l}}function jm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Ul,n.set(i,[o])):r>=s.length?(o=new Ul,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Zm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new re,color:new Mt};break;case"SpotLight":t={position:new re,direction:new re,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new re,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new re,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new re,halfWidth:new re,halfHeight:new re};break}return n[e.id]=t,t}}}function Jm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Qm=0;function eg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function tg(n,e){const t=new Zm,i=Jm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new re);const s=new re,o=new Zt,a=new Zt;function c(d,f){let v=0,x=0,b=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let E=0,h=0,p=0,T=0,u=0,m=0,S=0,y=0,g=0,w=0,_=0;d.sort(eg);const M=f===!0?Math.PI:1;for(let D=0,G=d.length;D<G;D++){const P=d[D],k=P.color,F=P.intensity,$=P.distance,ee=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)v+=k.r*F*M,x+=k.g*F*M,b+=k.b*F*M;else if(P.isLightProbe){for(let X=0;X<9;X++)r.probe[X].addScaledVector(P.sh.coefficients[X],F);_++}else if(P.isDirectionalLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity*M),P.castShadow){const N=P.shadow,q=i.get(P);q.shadowBias=N.bias,q.shadowNormalBias=N.normalBias,q.shadowRadius=N.radius,q.shadowMapSize=N.mapSize,r.directionalShadow[E]=q,r.directionalShadowMap[E]=ee,r.directionalShadowMatrix[E]=P.shadow.matrix,m++}r.directional[E]=X,E++}else if(P.isSpotLight){const X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(k).multiplyScalar(F*M),X.distance=$,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,r.spot[p]=X;const N=P.shadow;if(P.map&&(r.spotLightMap[g]=P.map,g++,N.updateMatrices(P),P.castShadow&&w++),r.spotLightMatrix[p]=N.matrix,P.castShadow){const q=i.get(P);q.shadowBias=N.bias,q.shadowNormalBias=N.normalBias,q.shadowRadius=N.radius,q.shadowMapSize=N.mapSize,r.spotShadow[p]=q,r.spotShadowMap[p]=ee,y++}p++}else if(P.isRectAreaLight){const X=t.get(P);X.color.copy(k).multiplyScalar(F),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),r.rectArea[T]=X,T++}else if(P.isPointLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity*M),X.distance=P.distance,X.decay=P.decay,P.castShadow){const N=P.shadow,q=i.get(P);q.shadowBias=N.bias,q.shadowNormalBias=N.normalBias,q.shadowRadius=N.radius,q.shadowMapSize=N.mapSize,q.shadowCameraNear=N.camera.near,q.shadowCameraFar=N.camera.far,r.pointShadow[h]=q,r.pointShadowMap[h]=ee,r.pointShadowMatrix[h]=P.shadow.matrix,S++}r.point[h]=X,h++}else if(P.isHemisphereLight){const X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(F*M),X.groundColor.copy(P.groundColor).multiplyScalar(F*M),r.hemi[u]=X,u++}}T>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=we.LTC_FLOAT_1,r.rectAreaLTC2=we.LTC_FLOAT_2):(r.rectAreaLTC1=we.LTC_HALF_1,r.rectAreaLTC2=we.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=we.LTC_FLOAT_1,r.rectAreaLTC2=we.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=we.LTC_HALF_1,r.rectAreaLTC2=we.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=v,r.ambient[1]=x,r.ambient[2]=b;const C=r.hash;(C.directionalLength!==E||C.pointLength!==h||C.spotLength!==p||C.rectAreaLength!==T||C.hemiLength!==u||C.numDirectionalShadows!==m||C.numPointShadows!==S||C.numSpotShadows!==y||C.numSpotMaps!==g||C.numLightProbes!==_)&&(r.directional.length=E,r.spot.length=p,r.rectArea.length=T,r.point.length=h,r.hemi.length=u,r.directionalShadow.length=m,r.directionalShadowMap.length=m,r.pointShadow.length=S,r.pointShadowMap.length=S,r.spotShadow.length=y,r.spotShadowMap.length=y,r.directionalShadowMatrix.length=m,r.pointShadowMatrix.length=S,r.spotLightMatrix.length=y+g-w,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=w,r.numLightProbes=_,C.directionalLength=E,C.pointLength=h,C.spotLength=p,C.rectAreaLength=T,C.hemiLength=u,C.numDirectionalShadows=m,C.numPointShadows=S,C.numSpotShadows=y,C.numSpotMaps=g,C.numLightProbes=_,r.version=Qm++)}function l(d,f){let v=0,x=0,b=0,E=0,h=0;const p=f.matrixWorldInverse;for(let T=0,u=d.length;T<u;T++){const m=d[T];if(m.isDirectionalLight){const S=r.directional[v];S.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),v++}else if(m.isSpotLight){const S=r.spot[b];S.position.setFromMatrixPosition(m.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),b++}else if(m.isRectAreaLight){const S=r.rectArea[E];S.position.setFromMatrixPosition(m.matrixWorld),S.position.applyMatrix4(p),a.identity(),o.copy(m.matrixWorld),o.premultiply(p),a.extractRotation(o),S.halfWidth.set(m.width*.5,0,0),S.halfHeight.set(0,m.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),E++}else if(m.isPointLight){const S=r.point[x];S.position.setFromMatrixPosition(m.matrixWorld),S.position.applyMatrix4(p),x++}else if(m.isHemisphereLight){const S=r.hemi[h];S.direction.setFromMatrixPosition(m.matrixWorld),S.direction.transformDirection(p),h++}}}return{setup:c,setupView:l,state:r}}function kl(n,e){const t=new tg(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function c(f){t.setup(i,f)}function l(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function ng(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let c;return a===void 0?(c=new kl(n,e),t.set(s,[c])):o>=a.length?(c=new kl(n,e),a.push(c)):c=a[o],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class ig extends Ws{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rg extends Ws{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const sg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ag=`uniform sampler2D shadow_pass;
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
}`;function og(n,e,t){let i=new Dc;const r=new xt,s=new xt,o=new jt,a=new ig({depthPacking:Qd}),c=new rg,l={},d=t.maxTextureSize,f={[xi]:pn,[pn]:xi,[In]:In},v=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:sg,fragmentShader:ag}),x=v.clone();x.defines.HORIZONTAL_PASS=1;const b=new Hi;b.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Hn(b,v),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cc;let p=this.type;this.render=function(y,g,w){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||y.length===0)return;const _=n.getRenderTarget(),M=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),D=n.state;D.setBlending(gi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const G=p!==Jn&&this.type===Jn,P=p===Jn&&this.type!==Jn;for(let k=0,F=y.length;k<F;k++){const $=y[k],ee=$.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;r.copy(ee.mapSize);const X=ee.getFrameExtents();if(r.multiply(X),s.copy(ee.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/X.x),r.x=s.x*X.x,ee.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/X.y),r.y=s.y*X.y,ee.mapSize.y=s.y)),ee.map===null||G===!0||P===!0){const q=this.type!==Jn?{minFilter:on,magFilter:on}:{};ee.map!==null&&ee.map.dispose(),ee.map=new Bi(r.x,r.y,q),ee.map.texture.name=$.name+".shadowMap",ee.camera.updateProjectionMatrix()}n.setRenderTarget(ee.map),n.clear();const N=ee.getViewportCount();for(let q=0;q<N;q++){const U=ee.getViewport(q);o.set(s.x*U.x,s.y*U.y,s.x*U.z,s.y*U.w),D.viewport(o),ee.updateMatrices($,q),i=ee.getFrustum(),m(g,w,ee.camera,$,this.type)}ee.isPointLightShadow!==!0&&this.type===Jn&&T(ee,w),ee.needsUpdate=!1}p=this.type,h.needsUpdate=!1,n.setRenderTarget(_,M,C)};function T(y,g){const w=e.update(E);v.defines.VSM_SAMPLES!==y.blurSamples&&(v.defines.VSM_SAMPLES=y.blurSamples,x.defines.VSM_SAMPLES=y.blurSamples,v.needsUpdate=!0,x.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Bi(r.x,r.y)),v.uniforms.shadow_pass.value=y.map.texture,v.uniforms.resolution.value=y.mapSize,v.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(g,null,w,v,E,null),x.uniforms.shadow_pass.value=y.mapPass.texture,x.uniforms.resolution.value=y.mapSize,x.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(g,null,w,x,E,null)}function u(y,g,w,_){let M=null;const C=w.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(C!==void 0)M=C;else if(M=w.isPointLight===!0?c:a,n.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0){const D=M.uuid,G=g.uuid;let P=l[D];P===void 0&&(P={},l[D]=P);let k=P[G];k===void 0&&(k=M.clone(),P[G]=k,g.addEventListener("dispose",S)),M=k}if(M.visible=g.visible,M.wireframe=g.wireframe,_===Jn?M.side=g.shadowSide!==null?g.shadowSide:g.side:M.side=g.shadowSide!==null?g.shadowSide:f[g.side],M.alphaMap=g.alphaMap,M.alphaTest=g.alphaTest,M.map=g.map,M.clipShadows=g.clipShadows,M.clippingPlanes=g.clippingPlanes,M.clipIntersection=g.clipIntersection,M.displacementMap=g.displacementMap,M.displacementScale=g.displacementScale,M.displacementBias=g.displacementBias,M.wireframeLinewidth=g.wireframeLinewidth,M.linewidth=g.linewidth,w.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const D=n.properties.get(M);D.light=w}return M}function m(y,g,w,_,M){if(y.visible===!1)return;if(y.layers.test(g.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===Jn)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,y.matrixWorld);const G=e.update(y),P=y.material;if(Array.isArray(P)){const k=G.groups;for(let F=0,$=k.length;F<$;F++){const ee=k[F],X=P[ee.materialIndex];if(X&&X.visible){const N=u(y,X,_,M);y.onBeforeShadow(n,y,g,w,G,N,ee),n.renderBufferDirect(w,null,G,N,y,ee),y.onAfterShadow(n,y,g,w,G,N,ee)}}}else if(P.visible){const k=u(y,P,_,M);y.onBeforeShadow(n,y,g,w,G,k,null),n.renderBufferDirect(w,null,G,k,y,null),y.onAfterShadow(n,y,g,w,G,k,null)}}const D=y.children;for(let G=0,P=D.length;G<P;G++)m(D[G],g,w,_,M)}function S(y){y.target.removeEventListener("dispose",S);for(const w in l){const _=l[w],M=y.target.uuid;M in _&&(_[M].dispose(),delete _[M])}}}function lg(n,e,t){const i=t.isWebGL2;function r(){let O=!1;const he=new jt;let ve=null;const Ee=new jt(0,0,0,0);return{setMask:function(De){ve!==De&&!O&&(n.colorMask(De,De,De,De),ve=De)},setLocked:function(De){O=De},setClear:function(De,$e,nt,mt,fe){fe===!0&&(De*=mt,$e*=mt,nt*=mt),he.set(De,$e,nt,mt),Ee.equals(he)===!1&&(n.clearColor(De,$e,nt,mt),Ee.copy(he))},reset:function(){O=!1,ve=null,Ee.set(-1,0,0,0)}}}function s(){let O=!1,he=null,ve=null,Ee=null;return{setTest:function(De){De?ue(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(De){he!==De&&!O&&(n.depthMask(De),he=De)},setFunc:function(De){if(ve!==De){switch(De){case Ad:n.depthFunc(n.NEVER);break;case Ld:n.depthFunc(n.ALWAYS);break;case Rd:n.depthFunc(n.LESS);break;case Fs:n.depthFunc(n.LEQUAL);break;case Pd:n.depthFunc(n.EQUAL);break;case Dd:n.depthFunc(n.GEQUAL);break;case Id:n.depthFunc(n.GREATER);break;case Nd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=De}},setLocked:function(De){O=De},setClear:function(De){Ee!==De&&(n.clearDepth(De),Ee=De)},reset:function(){O=!1,he=null,ve=null,Ee=null}}}function o(){let O=!1,he=null,ve=null,Ee=null,De=null,$e=null,nt=null,mt=null,fe=null;return{setTest:function(Pe){O||(Pe?ue(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(Pe){he!==Pe&&!O&&(n.stencilMask(Pe),he=Pe)},setFunc:function(Pe,ye,Me){(ve!==Pe||Ee!==ye||De!==Me)&&(n.stencilFunc(Pe,ye,Me),ve=Pe,Ee=ye,De=Me)},setOp:function(Pe,ye,Me){($e!==Pe||nt!==ye||mt!==Me)&&(n.stencilOp(Pe,ye,Me),$e=Pe,nt=ye,mt=Me)},setLocked:function(Pe){O=Pe},setClear:function(Pe){fe!==Pe&&(n.clearStencil(Pe),fe=Pe)},reset:function(){O=!1,he=null,ve=null,Ee=null,De=null,$e=null,nt=null,mt=null,fe=null}}}const a=new r,c=new s,l=new o,d=new WeakMap,f=new WeakMap;let v={},x={},b=new WeakMap,E=[],h=null,p=!1,T=null,u=null,m=null,S=null,y=null,g=null,w=null,_=new Mt(0,0,0),M=0,C=!1,D=null,G=null,P=null,k=null,F=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,X=0;const N=n.getParameter(n.VERSION);N.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(N)[1]),ee=X>=1):N.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),ee=X>=2);let q=null,U={};const H=n.getParameter(n.SCISSOR_BOX),I=n.getParameter(n.VIEWPORT),B=new jt().fromArray(H),V=new jt().fromArray(I);function Y(O,he,ve,Ee){const De=new Uint8Array(4),$e=n.createTexture();n.bindTexture(O,$e),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let nt=0;nt<ve;nt++)i&&(O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY)?n.texImage3D(he,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(he+nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return $e}const se={};se[n.TEXTURE_2D]=Y(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=Y(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(se[n.TEXTURE_2D_ARRAY]=Y(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=Y(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ue(n.DEPTH_TEST),c.setFunc(Fs),Ue(!1),L(_o),ue(n.CULL_FACE),ge(gi);function ue(O){v[O]!==!0&&(n.enable(O),v[O]=!0)}function be(O){v[O]!==!1&&(n.disable(O),v[O]=!1)}function ne(O,he){return x[O]!==he?(n.bindFramebuffer(O,he),x[O]=he,i&&(O===n.DRAW_FRAMEBUFFER&&(x[n.FRAMEBUFFER]=he),O===n.FRAMEBUFFER&&(x[n.DRAW_FRAMEBUFFER]=he)),!0):!1}function W(O,he){let ve=E,Ee=!1;if(O)if(ve=b.get(he),ve===void 0&&(ve=[],b.set(he,ve)),O.isWebGLMultipleRenderTargets){const De=O.texture;if(ve.length!==De.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let $e=0,nt=De.length;$e<nt;$e++)ve[$e]=n.COLOR_ATTACHMENT0+$e;ve.length=De.length,Ee=!0}}else ve[0]!==n.COLOR_ATTACHMENT0&&(ve[0]=n.COLOR_ATTACHMENT0,Ee=!0);else ve[0]!==n.BACK&&(ve[0]=n.BACK,Ee=!0);Ee&&(t.isWebGL2?n.drawBuffers(ve):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ve))}function Ce(O){return h!==O?(n.useProgram(O),h=O,!0):!1}const oe={[Pi]:n.FUNC_ADD,[fd]:n.FUNC_SUBTRACT,[hd]:n.FUNC_REVERSE_SUBTRACT};if(i)oe[Mo]=n.MIN,oe[So]=n.MAX;else{const O=e.get("EXT_blend_minmax");O!==null&&(oe[Mo]=O.MIN_EXT,oe[So]=O.MAX_EXT)}const Ae={[md]:n.ZERO,[gd]:n.ONE,[vd]:n.SRC_COLOR,[ka]:n.SRC_ALPHA,[Sd]:n.SRC_ALPHA_SATURATE,[bd]:n.DST_COLOR,[xd]:n.DST_ALPHA,[_d]:n.ONE_MINUS_SRC_COLOR,[Oa]:n.ONE_MINUS_SRC_ALPHA,[Md]:n.ONE_MINUS_DST_COLOR,[yd]:n.ONE_MINUS_DST_ALPHA,[Ed]:n.CONSTANT_COLOR,[Td]:n.ONE_MINUS_CONSTANT_COLOR,[wd]:n.CONSTANT_ALPHA,[Cd]:n.ONE_MINUS_CONSTANT_ALPHA};function ge(O,he,ve,Ee,De,$e,nt,mt,fe,Pe){if(O===gi){p===!0&&(be(n.BLEND),p=!1);return}if(p===!1&&(ue(n.BLEND),p=!0),O!==pd){if(O!==T||Pe!==C){if((u!==Pi||y!==Pi)&&(n.blendEquation(n.FUNC_ADD),u=Pi,y=Pi),Pe)switch(O){case ur:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xo:n.blendFunc(n.ONE,n.ONE);break;case yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xo:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case yo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}m=null,S=null,g=null,w=null,_.set(0,0,0),M=0,T=O,C=Pe}return}De=De||he,$e=$e||ve,nt=nt||Ee,(he!==u||De!==y)&&(n.blendEquationSeparate(oe[he],oe[De]),u=he,y=De),(ve!==m||Ee!==S||$e!==g||nt!==w)&&(n.blendFuncSeparate(Ae[ve],Ae[Ee],Ae[$e],Ae[nt]),m=ve,S=Ee,g=$e,w=nt),(mt.equals(_)===!1||fe!==M)&&(n.blendColor(mt.r,mt.g,mt.b,fe),_.copy(mt),M=fe),T=O,C=!1}function Ve(O,he){O.side===In?be(n.CULL_FACE):ue(n.CULL_FACE);let ve=O.side===pn;he&&(ve=!ve),Ue(ve),O.blending===ur&&O.transparent===!1?ge(gi):ge(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),c.setFunc(O.depthFunc),c.setTest(O.depthTest),c.setMask(O.depthWrite),a.setMask(O.colorWrite);const Ee=O.stencilWrite;l.setTest(Ee),Ee&&(l.setMask(O.stencilWriteMask),l.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),l.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),J(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(O){D!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),D=O)}function L(O){O!==cd?(ue(n.CULL_FACE),O!==G&&(O===_o?n.cullFace(n.BACK):O===dd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),G=O}function A(O){O!==P&&(ee&&n.lineWidth(O),P=O)}function J(O,he,ve){O?(ue(n.POLYGON_OFFSET_FILL),(k!==he||F!==ve)&&(n.polygonOffset(he,ve),k=he,F=ve)):be(n.POLYGON_OFFSET_FILL)}function de(O){O?ue(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function ce(O){O===void 0&&(O=n.TEXTURE0+$-1),q!==O&&(n.activeTexture(O),q=O)}function le(O,he,ve){ve===void 0&&(q===null?ve=n.TEXTURE0+$-1:ve=q);let Ee=U[ve];Ee===void 0&&(Ee={type:void 0,texture:void 0},U[ve]=Ee),(Ee.type!==O||Ee.texture!==he)&&(q!==ve&&(n.activeTexture(ve),q=ve),n.bindTexture(O,he||se[O]),Ee.type=O,Ee.texture=he)}function ke(){const O=U[q];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function xe(){try{n.compressedTexImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ne(){try{n.compressedTexImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Oe(){try{n.texSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{n.texSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function pe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function tt(){try{n.texStorage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Je(){try{n.texStorage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function We(){try{n.texImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(){try{n.texImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(O){B.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),B.copy(O))}function Se(O){V.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),V.copy(O))}function He(O,he){let ve=f.get(he);ve===void 0&&(ve=new WeakMap,f.set(he,ve));let Ee=ve.get(O);Ee===void 0&&(Ee=n.getUniformBlockIndex(he,O.name),ve.set(O,Ee))}function Le(O,he){const Ee=f.get(he).get(O);d.get(he)!==Ee&&(n.uniformBlockBinding(he,Ee,O.__bindingPointIndex),d.set(he,Ee))}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),v={},q=null,U={},x={},b=new WeakMap,E=[],h=null,p=!1,T=null,u=null,m=null,S=null,y=null,g=null,w=null,_=new Mt(0,0,0),M=0,C=!1,D=null,G=null,P=null,k=null,F=null,B.set(0,0,n.canvas.width,n.canvas.height),V.set(0,0,n.canvas.width,n.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:ue,disable:be,bindFramebuffer:ne,drawBuffers:W,useProgram:Ce,setBlending:ge,setMaterial:Ve,setFlipSided:Ue,setCullFace:L,setLineWidth:A,setPolygonOffset:J,setScissorTest:de,activeTexture:ce,bindTexture:le,unbindTexture:ke,compressedTexImage2D:xe,compressedTexImage3D:Ne,texImage2D:We,texImage3D:Fe,updateUBOMapping:He,uniformBlockBinding:Le,texStorage2D:tt,texStorage3D:Je,texSubImage2D:Oe,texSubImage3D:et,compressedTexSubImage2D:pe,compressedTexSubImage3D:ot,scissor:j,viewport:Se,reset:ae}}function cg(n,e,t,i,r,s,o){const a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let f;const v=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(L,A){return x?new OffscreenCanvas(L,A):zs("canvas")}function E(L,A,J,de){let ce=1;if((L.width>de||L.height>de)&&(ce=de/Math.max(L.width,L.height)),ce<1||A===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const le=A?Xa:Math.floor,ke=le(ce*L.width),xe=le(ce*L.height);f===void 0&&(f=b(ke,xe));const Ne=J?b(ke,xe):f;return Ne.width=ke,Ne.height=xe,Ne.getContext("2d").drawImage(L,0,0,ke,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+ke+"x"+xe+")."),Ne}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function h(L){return Qo(L.width)&&Qo(L.height)}function p(L){return a?!1:L.wrapS!==Nn||L.wrapT!==Nn||L.minFilter!==on&&L.minFilter!==dn}function T(L,A){return L.generateMipmaps&&A&&L.minFilter!==on&&L.minFilter!==dn}function u(L){n.generateMipmap(L)}function m(L,A,J,de,ce=!1){if(a===!1)return A;if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let le=A;if(A===n.RED&&(J===n.FLOAT&&(le=n.R32F),J===n.HALF_FLOAT&&(le=n.R16F),J===n.UNSIGNED_BYTE&&(le=n.R8)),A===n.RED_INTEGER&&(J===n.UNSIGNED_BYTE&&(le=n.R8UI),J===n.UNSIGNED_SHORT&&(le=n.R16UI),J===n.UNSIGNED_INT&&(le=n.R32UI),J===n.BYTE&&(le=n.R8I),J===n.SHORT&&(le=n.R16I),J===n.INT&&(le=n.R32I)),A===n.RG&&(J===n.FLOAT&&(le=n.RG32F),J===n.HALF_FLOAT&&(le=n.RG16F),J===n.UNSIGNED_BYTE&&(le=n.RG8)),A===n.RGBA){const ke=ce?Us:bt.getTransfer(de);J===n.FLOAT&&(le=n.RGBA32F),J===n.HALF_FLOAT&&(le=n.RGBA16F),J===n.UNSIGNED_BYTE&&(le=ke===wt?n.SRGB8_ALPHA8:n.RGBA8),J===n.UNSIGNED_SHORT_4_4_4_4&&(le=n.RGBA4),J===n.UNSIGNED_SHORT_5_5_5_1&&(le=n.RGB5_A1)}return(le===n.R16F||le===n.R32F||le===n.RG16F||le===n.RG32F||le===n.RGBA16F||le===n.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function S(L,A,J){return T(L,J)===!0||L.isFramebufferTexture&&L.minFilter!==on&&L.minFilter!==dn?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function y(L){return L===on||L===Eo||L===ta?n.NEAREST:n.LINEAR}function g(L){const A=L.target;A.removeEventListener("dispose",g),_(A),A.isVideoTexture&&d.delete(A)}function w(L){const A=L.target;A.removeEventListener("dispose",w),C(A)}function _(L){const A=i.get(L);if(A.__webglInit===void 0)return;const J=L.source,de=v.get(J);if(de){const ce=de[A.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&M(L),Object.keys(de).length===0&&v.delete(J)}i.remove(L)}function M(L){const A=i.get(L);n.deleteTexture(A.__webglTexture);const J=L.source,de=v.get(J);delete de[A.__cacheKey],o.memory.textures--}function C(L){const A=L.texture,J=i.get(L),de=i.get(A);if(de.__webglTexture!==void 0&&(n.deleteTexture(de.__webglTexture),o.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(J.__webglFramebuffer[ce]))for(let le=0;le<J.__webglFramebuffer[ce].length;le++)n.deleteFramebuffer(J.__webglFramebuffer[ce][le]);else n.deleteFramebuffer(J.__webglFramebuffer[ce]);J.__webglDepthbuffer&&n.deleteRenderbuffer(J.__webglDepthbuffer[ce])}else{if(Array.isArray(J.__webglFramebuffer))for(let ce=0;ce<J.__webglFramebuffer.length;ce++)n.deleteFramebuffer(J.__webglFramebuffer[ce]);else n.deleteFramebuffer(J.__webglFramebuffer);if(J.__webglDepthbuffer&&n.deleteRenderbuffer(J.__webglDepthbuffer),J.__webglMultisampledFramebuffer&&n.deleteFramebuffer(J.__webglMultisampledFramebuffer),J.__webglColorRenderbuffer)for(let ce=0;ce<J.__webglColorRenderbuffer.length;ce++)J.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(J.__webglColorRenderbuffer[ce]);J.__webglDepthRenderbuffer&&n.deleteRenderbuffer(J.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let ce=0,le=A.length;ce<le;ce++){const ke=i.get(A[ce]);ke.__webglTexture&&(n.deleteTexture(ke.__webglTexture),o.memory.textures--),i.remove(A[ce])}i.remove(A),i.remove(L)}let D=0;function G(){D=0}function P(){const L=D;return L>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),D+=1,L}function k(L){const A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function F(L,A){const J=i.get(L);if(L.isVideoTexture&&Ve(L),L.isRenderTargetTexture===!1&&L.version>0&&J.__version!==L.version){const de=L.image;if(de===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{B(J,L,A);return}}t.bindTexture(n.TEXTURE_2D,J.__webglTexture,n.TEXTURE0+A)}function $(L,A){const J=i.get(L);if(L.version>0&&J.__version!==L.version){B(J,L,A);return}t.bindTexture(n.TEXTURE_2D_ARRAY,J.__webglTexture,n.TEXTURE0+A)}function ee(L,A){const J=i.get(L);if(L.version>0&&J.__version!==L.version){B(J,L,A);return}t.bindTexture(n.TEXTURE_3D,J.__webglTexture,n.TEXTURE0+A)}function X(L,A){const J=i.get(L);if(L.version>0&&J.__version!==L.version){V(J,L,A);return}t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture,n.TEXTURE0+A)}const N={[Ha]:n.REPEAT,[Nn]:n.CLAMP_TO_EDGE,[Ga]:n.MIRRORED_REPEAT},q={[on]:n.NEAREST,[Eo]:n.NEAREST_MIPMAP_NEAREST,[ta]:n.NEAREST_MIPMAP_LINEAR,[dn]:n.LINEAR,[Vd]:n.LINEAR_MIPMAP_NEAREST,[Fr]:n.LINEAR_MIPMAP_LINEAR},U={[nu]:n.NEVER,[lu]:n.ALWAYS,[iu]:n.LESS,[yc]:n.LEQUAL,[ru]:n.EQUAL,[ou]:n.GEQUAL,[su]:n.GREATER,[au]:n.NOTEQUAL};function H(L,A,J){if(J?(n.texParameteri(L,n.TEXTURE_WRAP_S,N[A.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,N[A.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,N[A.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,q[A.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,q[A.minFilter])):(n.texParameteri(L,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(L,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(A.wrapS!==Nn||A.wrapT!==Nn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(L,n.TEXTURE_MAG_FILTER,y(A.magFilter)),n.texParameteri(L,n.TEXTURE_MIN_FILTER,y(A.minFilter)),A.minFilter!==on&&A.minFilter!==dn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,U[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const de=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===on||A.minFilter!==ta&&A.minFilter!==Fr||A.type===hi&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===Ur&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||i.get(A).__currentAnisotropy)&&(n.texParameterf(L,de.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy)}}function I(L,A){let J=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",g));const de=A.source;let ce=v.get(de);ce===void 0&&(ce={},v.set(de,ce));const le=k(A);if(le!==L.__cacheKey){ce[le]===void 0&&(ce[le]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,J=!0),ce[le].usedTimes++;const ke=ce[L.__cacheKey];ke!==void 0&&(ce[L.__cacheKey].usedTimes--,ke.usedTimes===0&&M(A)),L.__cacheKey=le,L.__webglTexture=ce[le].texture}return J}function B(L,A,J){let de=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(de=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(de=n.TEXTURE_3D);const ce=I(L,A),le=A.source;t.bindTexture(de,L.__webglTexture,n.TEXTURE0+J);const ke=i.get(le);if(le.version!==ke.__version||ce===!0){t.activeTexture(n.TEXTURE0+J);const xe=bt.getPrimaries(bt.workingColorSpace),Ne=A.colorSpace===Mn?null:bt.getPrimaries(A.colorSpace),Oe=A.colorSpace===Mn||xe===Ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);const et=p(A)&&h(A.image)===!1;let pe=E(A.image,et,!1,r.maxTextureSize);pe=Ue(A,pe);const ot=h(pe)||a,tt=s.convert(A.format,A.colorSpace);let Je=s.convert(A.type),We=m(A.internalFormat,tt,Je,A.colorSpace,A.isVideoTexture);H(de,A,ot);let Fe;const j=A.mipmaps,Se=a&&A.isVideoTexture!==!0&&We!==_c,He=ke.__version===void 0||ce===!0,Le=S(A,pe,ot);if(A.isDepthTexture)We=n.DEPTH_COMPONENT,a?A.type===hi?We=n.DEPTH_COMPONENT32F:A.type===fi?We=n.DEPTH_COMPONENT24:A.type===Fi?We=n.DEPTH24_STENCIL8:We=n.DEPTH_COMPONENT16:A.type===hi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Ui&&We===n.DEPTH_COMPONENT&&A.type!==Za&&A.type!==fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=fi,Je=s.convert(A.type)),A.format===mr&&We===n.DEPTH_COMPONENT&&(We=n.DEPTH_STENCIL,A.type!==Fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Fi,Je=s.convert(A.type))),He&&(Se?t.texStorage2D(n.TEXTURE_2D,1,We,pe.width,pe.height):t.texImage2D(n.TEXTURE_2D,0,We,pe.width,pe.height,0,tt,Je,null));else if(A.isDataTexture)if(j.length>0&&ot){Se&&He&&t.texStorage2D(n.TEXTURE_2D,Le,We,j[0].width,j[0].height);for(let ae=0,O=j.length;ae<O;ae++)Fe=j[ae],Se?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Fe.width,Fe.height,tt,Je,Fe.data):t.texImage2D(n.TEXTURE_2D,ae,We,Fe.width,Fe.height,0,tt,Je,Fe.data);A.generateMipmaps=!1}else Se?(He&&t.texStorage2D(n.TEXTURE_2D,Le,We,pe.width,pe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe.width,pe.height,tt,Je,pe.data)):t.texImage2D(n.TEXTURE_2D,0,We,pe.width,pe.height,0,tt,Je,pe.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Se&&He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Le,We,j[0].width,j[0].height,pe.depth);for(let ae=0,O=j.length;ae<O;ae++)Fe=j[ae],A.format!==Fn?tt!==null?Se?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Fe.width,Fe.height,pe.depth,tt,Fe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,We,Fe.width,Fe.height,pe.depth,0,Fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Fe.width,Fe.height,pe.depth,tt,Je,Fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,We,Fe.width,Fe.height,pe.depth,0,tt,Je,Fe.data)}else{Se&&He&&t.texStorage2D(n.TEXTURE_2D,Le,We,j[0].width,j[0].height);for(let ae=0,O=j.length;ae<O;ae++)Fe=j[ae],A.format!==Fn?tt!==null?Se?t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,Fe.width,Fe.height,tt,Fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,We,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Fe.width,Fe.height,tt,Je,Fe.data):t.texImage2D(n.TEXTURE_2D,ae,We,Fe.width,Fe.height,0,tt,Je,Fe.data)}else if(A.isDataArrayTexture)Se?(He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Le,We,pe.width,pe.height,pe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,tt,Je,pe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,We,pe.width,pe.height,pe.depth,0,tt,Je,pe.data);else if(A.isData3DTexture)Se?(He&&t.texStorage3D(n.TEXTURE_3D,Le,We,pe.width,pe.height,pe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,tt,Je,pe.data)):t.texImage3D(n.TEXTURE_3D,0,We,pe.width,pe.height,pe.depth,0,tt,Je,pe.data);else if(A.isFramebufferTexture){if(He)if(Se)t.texStorage2D(n.TEXTURE_2D,Le,We,pe.width,pe.height);else{let ae=pe.width,O=pe.height;for(let he=0;he<Le;he++)t.texImage2D(n.TEXTURE_2D,he,We,ae,O,0,tt,Je,null),ae>>=1,O>>=1}}else if(j.length>0&&ot){Se&&He&&t.texStorage2D(n.TEXTURE_2D,Le,We,j[0].width,j[0].height);for(let ae=0,O=j.length;ae<O;ae++)Fe=j[ae],Se?t.texSubImage2D(n.TEXTURE_2D,ae,0,0,tt,Je,Fe):t.texImage2D(n.TEXTURE_2D,ae,We,tt,Je,Fe);A.generateMipmaps=!1}else Se?(He&&t.texStorage2D(n.TEXTURE_2D,Le,We,pe.width,pe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,tt,Je,pe)):t.texImage2D(n.TEXTURE_2D,0,We,tt,Je,pe);T(A,ot)&&u(de),ke.__version=le.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function V(L,A,J){if(A.image.length!==6)return;const de=I(L,A),ce=A.source;t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+J);const le=i.get(ce);if(ce.version!==le.__version||de===!0){t.activeTexture(n.TEXTURE0+J);const ke=bt.getPrimaries(bt.workingColorSpace),xe=A.colorSpace===Mn?null:bt.getPrimaries(A.colorSpace),Ne=A.colorSpace===Mn||ke===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const Oe=A.isCompressedTexture||A.image[0].isCompressedTexture,et=A.image[0]&&A.image[0].isDataTexture,pe=[];for(let ae=0;ae<6;ae++)!Oe&&!et?pe[ae]=E(A.image[ae],!1,!0,r.maxCubemapSize):pe[ae]=et?A.image[ae].image:A.image[ae],pe[ae]=Ue(A,pe[ae]);const ot=pe[0],tt=h(ot)||a,Je=s.convert(A.format,A.colorSpace),We=s.convert(A.type),Fe=m(A.internalFormat,Je,We,A.colorSpace),j=a&&A.isVideoTexture!==!0,Se=le.__version===void 0||de===!0;let He=S(A,ot,tt);H(n.TEXTURE_CUBE_MAP,A,tt);let Le;if(Oe){j&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,He,Fe,ot.width,ot.height);for(let ae=0;ae<6;ae++){Le=pe[ae].mipmaps;for(let O=0;O<Le.length;O++){const he=Le[O];A.format!==Fn?Je!==null?j?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,0,0,he.width,he.height,Je,he.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,Fe,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,0,0,he.width,he.height,Je,We,he.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,Fe,he.width,he.height,0,Je,We,he.data)}}}else{Le=A.mipmaps,j&&Se&&(Le.length>0&&He++,t.texStorage2D(n.TEXTURE_CUBE_MAP,He,Fe,pe[0].width,pe[0].height));for(let ae=0;ae<6;ae++)if(et){j?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,pe[ae].width,pe[ae].height,Je,We,pe[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Fe,pe[ae].width,pe[ae].height,0,Je,We,pe[ae].data);for(let O=0;O<Le.length;O++){const ve=Le[O].image[ae].image;j?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,0,0,ve.width,ve.height,Je,We,ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,Fe,ve.width,ve.height,0,Je,We,ve.data)}}else{j?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Je,We,pe[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Fe,Je,We,pe[ae]);for(let O=0;O<Le.length;O++){const he=Le[O];j?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,0,0,Je,We,he.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,Fe,Je,We,he.image[ae])}}}T(A,tt)&&u(n.TEXTURE_CUBE_MAP),le.__version=ce.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function Y(L,A,J,de,ce,le){const ke=s.convert(J.format,J.colorSpace),xe=s.convert(J.type),Ne=m(J.internalFormat,ke,xe,J.colorSpace);if(!i.get(A).__hasExternalTextures){const et=Math.max(1,A.width>>le),pe=Math.max(1,A.height>>le);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,le,Ne,et,pe,A.depth,0,ke,xe,null):t.texImage2D(ce,le,Ne,et,pe,0,ke,xe,null)}t.bindFramebuffer(n.FRAMEBUFFER,L),ge(A)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,de,ce,i.get(J).__webglTexture,0,Ae(A)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,de,ce,i.get(J).__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(L,A,J){if(n.bindRenderbuffer(n.RENDERBUFFER,L),A.depthBuffer&&!A.stencilBuffer){let de=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(J||ge(A)){const ce=A.depthTexture;ce&&ce.isDepthTexture&&(ce.type===hi?de=n.DEPTH_COMPONENT32F:ce.type===fi&&(de=n.DEPTH_COMPONENT24));const le=Ae(A);ge(A)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,de,A.width,A.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,le,de,A.width,A.height)}else n.renderbufferStorage(n.RENDERBUFFER,de,A.width,A.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,L)}else if(A.depthBuffer&&A.stencilBuffer){const de=Ae(A);J&&ge(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,n.DEPTH24_STENCIL8,A.width,A.height):ge(A)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,n.DEPTH24_STENCIL8,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,L)}else{const de=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ce=0;ce<de.length;ce++){const le=de[ce],ke=s.convert(le.format,le.colorSpace),xe=s.convert(le.type),Ne=m(le.internalFormat,ke,xe,le.colorSpace),Oe=Ae(A);J&&ge(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,Ne,A.width,A.height):ge(A)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Oe,Ne,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,Ne,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ue(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),F(A.depthTexture,0);const de=i.get(A.depthTexture).__webglTexture,ce=Ae(A);if(A.depthTexture.format===Ui)ge(A)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0);else if(A.depthTexture.format===mr)ge(A)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function be(L){const A=i.get(L),J=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");ue(A.__webglFramebuffer,L)}else if(J){A.__webglDepthbuffer=[];for(let de=0;de<6;de++)t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[de]),A.__webglDepthbuffer[de]=n.createRenderbuffer(),se(A.__webglDepthbuffer[de],L,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=n.createRenderbuffer(),se(A.__webglDepthbuffer,L,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ne(L,A,J){const de=i.get(L);A!==void 0&&Y(de.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),J!==void 0&&be(L)}function W(L){const A=L.texture,J=i.get(L),de=i.get(A);L.addEventListener("dispose",w),L.isWebGLMultipleRenderTargets!==!0&&(de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture()),de.__version=A.version,o.memory.textures++);const ce=L.isWebGLCubeRenderTarget===!0,le=L.isWebGLMultipleRenderTargets===!0,ke=h(L)||a;if(ce){J.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(a&&A.mipmaps&&A.mipmaps.length>0){J.__webglFramebuffer[xe]=[];for(let Ne=0;Ne<A.mipmaps.length;Ne++)J.__webglFramebuffer[xe][Ne]=n.createFramebuffer()}else J.__webglFramebuffer[xe]=n.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){J.__webglFramebuffer=[];for(let xe=0;xe<A.mipmaps.length;xe++)J.__webglFramebuffer[xe]=n.createFramebuffer()}else J.__webglFramebuffer=n.createFramebuffer();if(le)if(r.drawBuffers){const xe=L.texture;for(let Ne=0,Oe=xe.length;Ne<Oe;Ne++){const et=i.get(xe[Ne]);et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&ge(L)===!1){const xe=le?A:[A];J.__webglMultisampledFramebuffer=n.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Ne=0;Ne<xe.length;Ne++){const Oe=xe[Ne];J.__webglColorRenderbuffer[Ne]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,J.__webglColorRenderbuffer[Ne]);const et=s.convert(Oe.format,Oe.colorSpace),pe=s.convert(Oe.type),ot=m(Oe.internalFormat,et,pe,Oe.colorSpace,L.isXRRenderTarget===!0),tt=Ae(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,tt,ot,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ne,n.RENDERBUFFER,J.__webglColorRenderbuffer[Ne])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(J.__webglDepthRenderbuffer=n.createRenderbuffer(),se(J.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,de.__webglTexture),H(n.TEXTURE_CUBE_MAP,A,ke);for(let xe=0;xe<6;xe++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let Ne=0;Ne<A.mipmaps.length;Ne++)Y(J.__webglFramebuffer[xe][Ne],L,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ne);else Y(J.__webglFramebuffer[xe],L,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);T(A,ke)&&u(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){const xe=L.texture;for(let Ne=0,Oe=xe.length;Ne<Oe;Ne++){const et=xe[Ne],pe=i.get(et);t.bindTexture(n.TEXTURE_2D,pe.__webglTexture),H(n.TEXTURE_2D,et,ke),Y(J.__webglFramebuffer,L,et,n.COLOR_ATTACHMENT0+Ne,n.TEXTURE_2D,0),T(et,ke)&&u(n.TEXTURE_2D)}t.unbindTexture()}else{let xe=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?xe=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(xe,de.__webglTexture),H(xe,A,ke),a&&A.mipmaps&&A.mipmaps.length>0)for(let Ne=0;Ne<A.mipmaps.length;Ne++)Y(J.__webglFramebuffer[Ne],L,A,n.COLOR_ATTACHMENT0,xe,Ne);else Y(J.__webglFramebuffer,L,A,n.COLOR_ATTACHMENT0,xe,0);T(A,ke)&&u(xe),t.unbindTexture()}L.depthBuffer&&be(L)}function Ce(L){const A=h(L)||a,J=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let de=0,ce=J.length;de<ce;de++){const le=J[de];if(T(le,A)){const ke=L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,xe=i.get(le).__webglTexture;t.bindTexture(ke,xe),u(ke),t.unbindTexture()}}}function oe(L){if(a&&L.samples>0&&ge(L)===!1){const A=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],J=L.width,de=L.height;let ce=n.COLOR_BUFFER_BIT;const le=[],ke=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(L),Ne=L.isWebGLMultipleRenderTargets===!0;if(Ne)for(let Oe=0;Oe<A.length;Oe++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Oe=0;Oe<A.length;Oe++){le.push(n.COLOR_ATTACHMENT0+Oe),L.depthBuffer&&le.push(ke);const et=xe.__ignoreDepthValues!==void 0?xe.__ignoreDepthValues:!1;if(et===!1&&(L.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),Ne&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Oe]),et===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ke]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ke])),Ne){const pe=i.get(A[Oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pe,0)}n.blitFramebuffer(0,0,J,de,0,0,J,de,ce,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,le)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Ne)for(let Oe=0;Oe<A.length;Oe++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.RENDERBUFFER,xe.__webglColorRenderbuffer[Oe]);const et=i.get(A[Oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.TEXTURE_2D,et,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}}function Ae(L){return Math.min(r.maxSamples,L.samples)}function ge(L){const A=i.get(L);return a&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ve(L){const A=o.render.frame;d.get(L)!==A&&(d.set(L,A),L.update())}function Ue(L,A){const J=L.colorSpace,de=L.format,ce=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Va||J!==ti&&J!==Mn&&(bt.getTransfer(J)===wt?a===!1?e.has("EXT_sRGB")===!0&&de===Fn?(L.format=Va,L.minFilter=dn,L.generateMipmaps=!1):A=Mc.sRGBToLinear(A):(de!==Fn||ce!==_i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),A}this.allocateTextureUnit=P,this.resetTextureUnits=G,this.setTexture2D=F,this.setTexture2DArray=$,this.setTexture3D=ee,this.setTextureCube=X,this.rebindTextures=ne,this.setupRenderTarget=W,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=Y,this.useMultisampledRTT=ge}function dg(n,e,t){const i=t.isWebGL2;function r(s,o=Mn){let a;const c=bt.getTransfer(o);if(s===_i)return n.UNSIGNED_BYTE;if(s===fc)return n.UNSIGNED_SHORT_4_4_4_4;if(s===hc)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Wd)return n.BYTE;if(s===Xd)return n.SHORT;if(s===Za)return n.UNSIGNED_SHORT;if(s===pc)return n.INT;if(s===fi)return n.UNSIGNED_INT;if(s===hi)return n.FLOAT;if(s===Ur)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===$d)return n.ALPHA;if(s===Fn)return n.RGBA;if(s===qd)return n.LUMINANCE;if(s===Yd)return n.LUMINANCE_ALPHA;if(s===Ui)return n.DEPTH_COMPONENT;if(s===mr)return n.DEPTH_STENCIL;if(s===Va)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Kd)return n.RED;if(s===mc)return n.RED_INTEGER;if(s===jd)return n.RG;if(s===gc)return n.RG_INTEGER;if(s===vc)return n.RGBA_INTEGER;if(s===na||s===ia||s===ra||s===sa)if(c===wt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===na)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ia)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ra)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===sa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===na)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ia)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ra)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===sa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===To||s===wo||s===Co||s===Ao)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===To)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===wo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Co)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ao)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===_c)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Lo||s===Ro)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Lo)return c===wt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ro)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Po||s===Do||s===Io||s===No||s===Fo||s===Uo||s===ko||s===Oo||s===Bo||s===zo||s===Ho||s===Go||s===Vo||s===Wo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Po)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Do)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Io)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===No)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Fo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Uo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===ko)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Oo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Bo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===zo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ho)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Go)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Vo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Wo)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===aa||s===Xo||s===$o)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===aa)return c===wt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Xo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===$o)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Zd||s===qo||s===Yo||s===Ko)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===aa)return a.COMPRESSED_RED_RGTC1_EXT;if(s===qo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Yo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ko)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Fi?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class ug extends Dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class As extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pg={type:"move"};class Pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new As,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new As,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new re,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new re),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new As,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new re,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new re),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const E of e.hand.values()){const h=t.getJointPose(E,i),p=this._getHandJoint(l,E);h!==null&&(p.matrix.fromArray(h.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=h.radius),p.visible=h!==null}const d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],v=d.position.distanceTo(f.position),x=.02,b=.005;l.inputState.pinching&&v>x+b?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&v<=x-b&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pg)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new As;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class fg extends _r{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,d=null,f=null,v=null,x=null,b=null;const E=t.getContextAttributes();let h=null,p=null;const T=[],u=[],m=new xt;let S=null;const y=new Dn;y.layers.enable(1),y.viewport=new jt;const g=new Dn;g.layers.enable(2),g.viewport=new jt;const w=[y,g],_=new ug;_.layers.enable(1),_.layers.enable(2);let M=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let I=T[H];return I===void 0&&(I=new Pa,T[H]=I),I.getTargetRaySpace()},this.getControllerGrip=function(H){let I=T[H];return I===void 0&&(I=new Pa,T[H]=I),I.getGripSpace()},this.getHand=function(H){let I=T[H];return I===void 0&&(I=new Pa,T[H]=I),I.getHandSpace()};function D(H){const I=u.indexOf(H.inputSource);if(I===-1)return;const B=T[I];B!==void 0&&(B.update(H.inputSource,H.frame,l||o),B.dispatchEvent({type:H.type,data:H.inputSource}))}function G(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",P);for(let H=0;H<T.length;H++){const I=u[H];I!==null&&(u[H]=null,T[H].disconnect(I))}M=null,C=null,e.setRenderTarget(h),x=null,v=null,f=null,r=null,p=null,U.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(m.width,m.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return v!==null?v:x},this.getBinding=function(){return f},this.getFrame=function(){return b},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",G),r.addEventListener("inputsourceschange",P),E.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(m),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const I={antialias:r.renderState.layers===void 0?E.antialias:!0,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};x=new XRWebGLLayer(r,t,I),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),p=new Bi(x.framebufferWidth,x.framebufferHeight,{format:Fn,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil})}else{let I=null,B=null,V=null;E.depth&&(V=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,I=E.stencil?mr:Ui,B=E.stencil?Fi:fi);const Y={colorFormat:t.RGBA8,depthFormat:V,scaleFactor:s};f=new XRWebGLBinding(r,t),v=f.createProjectionLayer(Y),r.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),p=new Bi(v.textureWidth,v.textureHeight,{format:Fn,type:_i,depthTexture:new Fc(v.textureWidth,v.textureHeight,B,void 0,void 0,void 0,void 0,void 0,void 0,I),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0});const se=e.properties.get(p);se.__ignoreDepthValues=v.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),U.setContext(r),U.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(H){for(let I=0;I<H.removed.length;I++){const B=H.removed[I],V=u.indexOf(B);V>=0&&(u[V]=null,T[V].disconnect(B))}for(let I=0;I<H.added.length;I++){const B=H.added[I];let V=u.indexOf(B);if(V===-1){for(let se=0;se<T.length;se++)if(se>=u.length){u.push(B),V=se;break}else if(u[se]===null){u[se]=B,V=se;break}if(V===-1)break}const Y=T[V];Y&&Y.connect(B)}}const k=new re,F=new re;function $(H,I,B){k.setFromMatrixPosition(I.matrixWorld),F.setFromMatrixPosition(B.matrixWorld);const V=k.distanceTo(F),Y=I.projectionMatrix.elements,se=B.projectionMatrix.elements,ue=Y[14]/(Y[10]-1),be=Y[14]/(Y[10]+1),ne=(Y[9]+1)/Y[5],W=(Y[9]-1)/Y[5],Ce=(Y[8]-1)/Y[0],oe=(se[8]+1)/se[0],Ae=ue*Ce,ge=ue*oe,Ve=V/(-Ce+oe),Ue=Ve*-Ce;I.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Ue),H.translateZ(Ve),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const L=ue+Ve,A=be+Ve,J=Ae-Ue,de=ge+(V-Ue),ce=ne*be/A*L,le=W*be/A*L;H.projectionMatrix.makePerspective(J,de,ce,le,L,A),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function ee(H,I){I===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(I.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;_.near=g.near=y.near=H.near,_.far=g.far=y.far=H.far,(M!==_.near||C!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),M=_.near,C=_.far);const I=H.parent,B=_.cameras;ee(_,I);for(let V=0;V<B.length;V++)ee(B[V],I);B.length===2?$(_,y,g):_.projectionMatrix.copy(y.projectionMatrix),X(H,_,I)};function X(H,I,B){B===null?H.matrix.copy(I.matrixWorld):(H.matrix.copy(B.matrixWorld),H.matrix.invert(),H.matrix.multiply(I.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(I.projectionMatrix),H.projectionMatrixInverse.copy(I.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Wa*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(v===null&&x===null))return c},this.setFoveation=function(H){c=H,v!==null&&(v.fixedFoveation=H),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=H)};let N=null;function q(H,I){if(d=I.getViewerPose(l||o),b=I,d!==null){const B=d.views;x!==null&&(e.setRenderTargetFramebuffer(p,x.framebuffer),e.setRenderTarget(p));let V=!1;B.length!==_.cameras.length&&(_.cameras.length=0,V=!0);for(let Y=0;Y<B.length;Y++){const se=B[Y];let ue=null;if(x!==null)ue=x.getViewport(se);else{const ne=f.getViewSubImage(v,se);ue=ne.viewport,Y===0&&(e.setRenderTargetTextures(p,ne.colorTexture,v.ignoreDepthValues?void 0:ne.depthStencilTexture),e.setRenderTarget(p))}let be=w[Y];be===void 0&&(be=new Dn,be.layers.enable(Y),be.viewport=new jt,w[Y]=be),be.matrix.fromArray(se.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(se.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(ue.x,ue.y,ue.width,ue.height),Y===0&&(_.matrix.copy(be.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),V===!0&&_.cameras.push(be)}}for(let B=0;B<T.length;B++){const V=u[B],Y=T[B];V!==null&&Y!==void 0&&Y.update(V,I,l||o)}N&&N(H,I),I.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:I}),b=null}const U=new Ic;U.setAnimationLoop(q),this.setAnimationLoop=function(H){N=H},this.dispose=function(){}}}function hg(n,e){function t(h,p){h.matrixAutoUpdate===!0&&h.updateMatrix(),p.value.copy(h.matrix)}function i(h,p){p.color.getRGB(h.fogColor.value,Lc(n)),p.isFog?(h.fogNear.value=p.near,h.fogFar.value=p.far):p.isFogExp2&&(h.fogDensity.value=p.density)}function r(h,p,T,u,m){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(h,p):p.isMeshToonMaterial?(s(h,p),f(h,p)):p.isMeshPhongMaterial?(s(h,p),d(h,p)):p.isMeshStandardMaterial?(s(h,p),v(h,p),p.isMeshPhysicalMaterial&&x(h,p,m)):p.isMeshMatcapMaterial?(s(h,p),b(h,p)):p.isMeshDepthMaterial?s(h,p):p.isMeshDistanceMaterial?(s(h,p),E(h,p)):p.isMeshNormalMaterial?s(h,p):p.isLineBasicMaterial?(o(h,p),p.isLineDashedMaterial&&a(h,p)):p.isPointsMaterial?c(h,p,T,u):p.isSpriteMaterial?l(h,p):p.isShadowMaterial?(h.color.value.copy(p.color),h.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(h,p){h.opacity.value=p.opacity,p.color&&h.diffuse.value.copy(p.color),p.emissive&&h.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.bumpMap&&(h.bumpMap.value=p.bumpMap,t(p.bumpMap,h.bumpMapTransform),h.bumpScale.value=p.bumpScale,p.side===pn&&(h.bumpScale.value*=-1)),p.normalMap&&(h.normalMap.value=p.normalMap,t(p.normalMap,h.normalMapTransform),h.normalScale.value.copy(p.normalScale),p.side===pn&&h.normalScale.value.negate()),p.displacementMap&&(h.displacementMap.value=p.displacementMap,t(p.displacementMap,h.displacementMapTransform),h.displacementScale.value=p.displacementScale,h.displacementBias.value=p.displacementBias),p.emissiveMap&&(h.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,h.emissiveMapTransform)),p.specularMap&&(h.specularMap.value=p.specularMap,t(p.specularMap,h.specularMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest);const T=e.get(p).envMap;if(T&&(h.envMap.value=T,h.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.reflectivity.value=p.reflectivity,h.ior.value=p.ior,h.refractionRatio.value=p.refractionRatio),p.lightMap){h.lightMap.value=p.lightMap;const u=n._useLegacyLights===!0?Math.PI:1;h.lightMapIntensity.value=p.lightMapIntensity*u,t(p.lightMap,h.lightMapTransform)}p.aoMap&&(h.aoMap.value=p.aoMap,h.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,h.aoMapTransform))}function o(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform))}function a(h,p){h.dashSize.value=p.dashSize,h.totalSize.value=p.dashSize+p.gapSize,h.scale.value=p.scale}function c(h,p,T,u){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.size.value=p.size*T,h.scale.value=u*.5,p.map&&(h.map.value=p.map,t(p.map,h.uvTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function l(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.rotation.value=p.rotation,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function d(h,p){h.specular.value.copy(p.specular),h.shininess.value=Math.max(p.shininess,1e-4)}function f(h,p){p.gradientMap&&(h.gradientMap.value=p.gradientMap)}function v(h,p){h.metalness.value=p.metalness,p.metalnessMap&&(h.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,h.metalnessMapTransform)),h.roughness.value=p.roughness,p.roughnessMap&&(h.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,h.roughnessMapTransform)),e.get(p).envMap&&(h.envMapIntensity.value=p.envMapIntensity)}function x(h,p,T){h.ior.value=p.ior,p.sheen>0&&(h.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),h.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(h.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,h.sheenColorMapTransform)),p.sheenRoughnessMap&&(h.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,h.sheenRoughnessMapTransform))),p.clearcoat>0&&(h.clearcoat.value=p.clearcoat,h.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(h.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,h.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(h.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===pn&&h.clearcoatNormalScale.value.negate())),p.iridescence>0&&(h.iridescence.value=p.iridescence,h.iridescenceIOR.value=p.iridescenceIOR,h.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(h.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,h.iridescenceMapTransform)),p.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),p.transmission>0&&(h.transmission.value=p.transmission,h.transmissionSamplerMap.value=T.texture,h.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(h.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,h.transmissionMapTransform)),h.thickness.value=p.thickness,p.thicknessMap&&(h.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=p.attenuationDistance,h.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(h.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(h.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=p.specularIntensity,h.specularColor.value.copy(p.specularColor),p.specularColorMap&&(h.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,h.specularColorMapTransform)),p.specularIntensityMap&&(h.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,h.specularIntensityMapTransform))}function b(h,p){p.matcap&&(h.matcap.value=p.matcap)}function E(h,p){const T=e.get(p).light;h.referencePosition.value.setFromMatrixPosition(T.matrixWorld),h.nearDistance.value=T.shadow.camera.near,h.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function mg(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(T,u){const m=u.program;i.uniformBlockBinding(T,m)}function l(T,u){let m=r[T.id];m===void 0&&(b(T),m=d(T),r[T.id]=m,T.addEventListener("dispose",h));const S=u.program;i.updateUBOMapping(T,S);const y=e.render.frame;s[T.id]!==y&&(v(T),s[T.id]=y)}function d(T){const u=f();T.__bindingPointIndex=u;const m=n.createBuffer(),S=T.__size,y=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,m),n.bufferData(n.UNIFORM_BUFFER,S,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,u,m),m}function f(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(T){const u=r[T.id],m=T.uniforms,S=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,u);for(let y=0,g=m.length;y<g;y++){const w=Array.isArray(m[y])?m[y]:[m[y]];for(let _=0,M=w.length;_<M;_++){const C=w[_];if(x(C,y,_,S)===!0){const D=C.__offset,G=Array.isArray(C.value)?C.value:[C.value];let P=0;for(let k=0;k<G.length;k++){const F=G[k],$=E(F);typeof F=="number"||typeof F=="boolean"?(C.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,D+P,C.__data)):F.isMatrix3?(C.__data[0]=F.elements[0],C.__data[1]=F.elements[1],C.__data[2]=F.elements[2],C.__data[3]=0,C.__data[4]=F.elements[3],C.__data[5]=F.elements[4],C.__data[6]=F.elements[5],C.__data[7]=0,C.__data[8]=F.elements[6],C.__data[9]=F.elements[7],C.__data[10]=F.elements[8],C.__data[11]=0):(F.toArray(C.__data,P),P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function x(T,u,m,S){const y=T.value,g=u+"_"+m;if(S[g]===void 0)return typeof y=="number"||typeof y=="boolean"?S[g]=y:S[g]=y.clone(),!0;{const w=S[g];if(typeof y=="number"||typeof y=="boolean"){if(w!==y)return S[g]=y,!0}else if(w.equals(y)===!1)return w.copy(y),!0}return!1}function b(T){const u=T.uniforms;let m=0;const S=16;for(let g=0,w=u.length;g<w;g++){const _=Array.isArray(u[g])?u[g]:[u[g]];for(let M=0,C=_.length;M<C;M++){const D=_[M],G=Array.isArray(D.value)?D.value:[D.value];for(let P=0,k=G.length;P<k;P++){const F=G[P],$=E(F),ee=m%S;ee!==0&&S-ee<$.boundary&&(m+=S-ee),D.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=m,m+=$.storage}}}const y=m%S;return y>0&&(m+=S-y),T.__size=m,T.__cache={},this}function E(T){const u={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(u.boundary=4,u.storage=4):T.isVector2?(u.boundary=8,u.storage=8):T.isVector3||T.isColor?(u.boundary=16,u.storage=12):T.isVector4?(u.boundary=16,u.storage=16):T.isMatrix3?(u.boundary=48,u.storage=48):T.isMatrix4?(u.boundary=64,u.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),u}function h(T){const u=T.target;u.removeEventListener("dispose",h);const m=o.indexOf(u.__bindingPointIndex);o.splice(m,1),n.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}function p(){for(const T in r)n.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class Hc{constructor(e={}){const{canvas:t=du(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let v;i!==null?v=i.getContextAttributes().alpha:v=o;const x=new Uint32Array(4),b=new Int32Array(4);let E=null,h=null;const p=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Kt,this._useLegacyLights=!1,this.toneMapping=vi,this.toneMappingExposure=1;const u=this;let m=!1,S=0,y=0,g=null,w=-1,_=null;const M=new jt,C=new jt;let D=null;const G=new Mt(0);let P=0,k=t.width,F=t.height,$=1,ee=null,X=null;const N=new jt(0,0,k,F),q=new jt(0,0,k,F);let U=!1;const H=new Dc;let I=!1,B=!1,V=null;const Y=new Zt,se=new xt,ue=new re,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ne(){return g===null?$:1}let W=i;function Ce(R,K){for(let Q=0;Q<R.length;Q++){const te=R[Q],Z=t.getContext(te,K);if(Z!==null)return Z}return null}try{const R={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ja}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",he,!1),W===null){const K=["webgl2","webgl","experimental-webgl"];if(u.isWebGL1Renderer===!0&&K.shift(),W=Ce(K,R),W===null)throw Ce(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&W instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let oe,Ae,ge,Ve,Ue,L,A,J,de,ce,le,ke,xe,Ne,Oe,et,pe,ot,tt,Je,We,Fe,j,Se;function He(){oe=new Th(W),Ae=new xh(W,oe,e),oe.init(Ae),Fe=new dg(W,oe,Ae),ge=new lg(W,oe,Ae),Ve=new Ah(W),Ue=new Ym,L=new cg(W,oe,ge,Ue,Ae,Fe,Ve),A=new bh(u),J=new Eh(u),de=new Fu(W,Ae),j=new vh(W,oe,de,Ae),ce=new wh(W,de,Ve,j),le=new Dh(W,ce,de,Ve),tt=new Ph(W,Ae,L),et=new yh(Ue),ke=new qm(u,A,J,oe,Ae,j,et),xe=new hg(u,Ue),Ne=new jm,Oe=new ng(oe,Ae),ot=new gh(u,A,J,ge,le,v,c),pe=new og(u,le,Ae),Se=new mg(W,Ve,Ae,ge),Je=new _h(W,oe,Ve,Ae),We=new Ch(W,oe,Ve,Ae),Ve.programs=ke.programs,u.capabilities=Ae,u.extensions=oe,u.properties=Ue,u.renderLists=Ne,u.shadowMap=pe,u.state=ge,u.info=Ve}He();const Le=new fg(u,W);this.xr=Le,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const R=oe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=oe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(R){R!==void 0&&($=R,this.setSize(k,F,!1))},this.getSize=function(R){return R.set(k,F)},this.setSize=function(R,K,Q=!0){if(Le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=R,F=K,t.width=Math.floor(R*$),t.height=Math.floor(K*$),Q===!0&&(t.style.width=R+"px",t.style.height=K+"px"),this.setViewport(0,0,R,K)},this.getDrawingBufferSize=function(R){return R.set(k*$,F*$).floor()},this.setDrawingBufferSize=function(R,K,Q){k=R,F=K,$=Q,t.width=Math.floor(R*Q),t.height=Math.floor(K*Q),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(M)},this.getViewport=function(R){return R.copy(N)},this.setViewport=function(R,K,Q,te){R.isVector4?N.set(R.x,R.y,R.z,R.w):N.set(R,K,Q,te),ge.viewport(M.copy(N).multiplyScalar($).floor())},this.getScissor=function(R){return R.copy(q)},this.setScissor=function(R,K,Q,te){R.isVector4?q.set(R.x,R.y,R.z,R.w):q.set(R,K,Q,te),ge.scissor(C.copy(q).multiplyScalar($).floor())},this.getScissorTest=function(){return U},this.setScissorTest=function(R){ge.setScissorTest(U=R)},this.setOpaqueSort=function(R){ee=R},this.setTransparentSort=function(R){X=R},this.getClearColor=function(R){return R.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(R=!0,K=!0,Q=!0){let te=0;if(R){let Z=!1;if(g!==null){const Re=g.texture.format;Z=Re===vc||Re===gc||Re===mc}if(Z){const Re=g.texture.type,ze=Re===_i||Re===fi||Re===Za||Re===Fi||Re===fc||Re===hc,qe=ot.getClearColor(),Ye=ot.getClearAlpha(),Ke=qe.r,Qe=qe.g,st=qe.b;ze?(x[0]=Ke,x[1]=Qe,x[2]=st,x[3]=Ye,W.clearBufferuiv(W.COLOR,0,x)):(b[0]=Ke,b[1]=Qe,b[2]=st,b[3]=Ye,W.clearBufferiv(W.COLOR,0,b))}else te|=W.COLOR_BUFFER_BIT}K&&(te|=W.DEPTH_BUFFER_BIT),Q&&(te|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",he,!1),Ne.dispose(),Oe.dispose(),Ue.dispose(),A.dispose(),J.dispose(),le.dispose(),j.dispose(),Se.dispose(),ke.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",fe),Le.removeEventListener("sessionend",Pe),V&&(V.dispose(),V=null),ye.stop()};function ae(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),m=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),m=!1;const R=Ve.autoReset,K=pe.enabled,Q=pe.autoUpdate,te=pe.needsUpdate,Z=pe.type;He(),Ve.autoReset=R,pe.enabled=K,pe.autoUpdate=Q,pe.needsUpdate=te,pe.type=Z}function he(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ve(R){const K=R.target;K.removeEventListener("dispose",ve),Ee(K)}function Ee(R){De(R),Ue.remove(R)}function De(R){const K=Ue.get(R).programs;K!==void 0&&(K.forEach(function(Q){ke.releaseProgram(Q)}),R.isShaderMaterial&&ke.releaseShaderCache(R))}this.renderBufferDirect=function(R,K,Q,te,Z,Re){K===null&&(K=be);const ze=Z.isMesh&&Z.matrixWorld.determinant()<0,qe=nn(R,K,Q,te,Z);ge.setMaterial(te,ze);let Ye=Q.index,Ke=1;if(te.wireframe===!0){if(Ye=ce.getWireframeAttribute(Q),Ye===void 0)return;Ke=2}const Qe=Q.drawRange,st=Q.attributes.position;let Ct=Qe.start*Ke,St=(Qe.start+Qe.count)*Ke;Re!==null&&(Ct=Math.max(Ct,Re.start*Ke),St=Math.min(St,(Re.start+Re.count)*Ke)),Ye!==null?(Ct=Math.max(Ct,0),St=Math.min(St,Ye.count)):st!=null&&(Ct=Math.max(Ct,0),St=Math.min(St,st.count));const Rt=St-Ct;if(Rt<0||Rt===1/0)return;j.setup(Z,te,qe,Q,Ye);let kn,Et=Je;if(Ye!==null&&(kn=de.get(Ye),Et=We,Et.setIndex(kn)),Z.isMesh)te.wireframe===!0?(ge.setLineWidth(te.wireframeLinewidth*ne()),Et.setMode(W.LINES)):Et.setMode(W.TRIANGLES);else if(Z.isLine){let rt=te.linewidth;rt===void 0&&(rt=1),ge.setLineWidth(rt*ne()),Z.isLineSegments?Et.setMode(W.LINES):Z.isLineLoop?Et.setMode(W.LINE_LOOP):Et.setMode(W.LINE_STRIP)}else Z.isPoints?Et.setMode(W.POINTS):Z.isSprite&&Et.setMode(W.TRIANGLES);if(Z.isBatchedMesh)Et.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)Et.renderInstances(Ct,Rt,Z.count);else if(Q.isInstancedBufferGeometry){const rt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,bi=Math.min(Q.instanceCount,rt);Et.renderInstances(Ct,Rt,bi)}else Et.render(Ct,Rt)};function $e(R,K,Q){R.transparent===!0&&R.side===In&&R.forceSinglePass===!1?(R.side=pn,R.needsUpdate=!0,Lt(R,K,Q),R.side=xi,R.needsUpdate=!0,Lt(R,K,Q),R.side=In):Lt(R,K,Q)}this.compile=function(R,K,Q=null){Q===null&&(Q=R),h=Oe.get(Q),h.init(),T.push(h),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(K.layers)&&(h.pushLight(Z),Z.castShadow&&h.pushShadow(Z))}),R!==Q&&R.traverseVisible(function(Z){Z.isLight&&Z.layers.test(K.layers)&&(h.pushLight(Z),Z.castShadow&&h.pushShadow(Z))}),h.setupLights(u._useLegacyLights);const te=new Set;return R.traverse(function(Z){const Re=Z.material;if(Re)if(Array.isArray(Re))for(let ze=0;ze<Re.length;ze++){const qe=Re[ze];$e(qe,Q,Z),te.add(qe)}else $e(Re,Q,Z),te.add(Re)}),T.pop(),h=null,te},this.compileAsync=function(R,K,Q=null){const te=this.compile(R,K,Q);return new Promise(Z=>{function Re(){if(te.forEach(function(ze){Ue.get(ze).currentProgram.isReady()&&te.delete(ze)}),te.size===0){Z(R);return}setTimeout(Re,10)}oe.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let nt=null;function mt(R){nt&&nt(R)}function fe(){ye.stop()}function Pe(){ye.start()}const ye=new Ic;ye.setAnimationLoop(mt),typeof self<"u"&&ye.setContext(self),this.setAnimationLoop=function(R){nt=R,Le.setAnimationLoop(R),R===null?ye.stop():ye.start()},Le.addEventListener("sessionstart",fe),Le.addEventListener("sessionend",Pe),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(m===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(K),K=Le.getCamera()),R.isScene===!0&&R.onBeforeRender(u,R,K,g),h=Oe.get(R,T.length),h.init(),T.push(h),Y.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),H.setFromProjectionMatrix(Y),B=this.localClippingEnabled,I=et.init(this.clippingPlanes,B),E=Ne.get(R,p.length),E.init(),p.push(E),Me(R,K,0,u.sortObjects),E.finish(),u.sortObjects===!0&&E.sort(ee,X),this.info.render.frame++,I===!0&&et.beginShadows();const Q=h.state.shadowsArray;if(pe.render(Q,R,K),I===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset(),ot.render(E,R),h.setupLights(u._useLegacyLights),K.isArrayCamera){const te=K.cameras;for(let Z=0,Re=te.length;Z<Re;Z++){const ze=te[Z];je(E,R,ze,ze.viewport)}}else je(E,R,K);g!==null&&(L.updateMultisampleRenderTarget(g),L.updateRenderTargetMipmap(g)),R.isScene===!0&&R.onAfterRender(u,R,K),j.resetDefaultState(),w=-1,_=null,T.pop(),T.length>0?h=T[T.length-1]:h=null,p.pop(),p.length>0?E=p[p.length-1]:E=null};function Me(R,K,Q,te){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)Q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)h.pushLight(R),R.castShadow&&h.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||H.intersectsSprite(R)){te&&ue.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Y);const ze=le.update(R),qe=R.material;qe.visible&&E.push(R,ze,qe,Q,ue.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||H.intersectsObject(R))){const ze=le.update(R),qe=R.material;if(te&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ue.copy(R.boundingSphere.center)):(ze.boundingSphere===null&&ze.computeBoundingSphere(),ue.copy(ze.boundingSphere.center)),ue.applyMatrix4(R.matrixWorld).applyMatrix4(Y)),Array.isArray(qe)){const Ye=ze.groups;for(let Ke=0,Qe=Ye.length;Ke<Qe;Ke++){const st=Ye[Ke],Ct=qe[st.materialIndex];Ct&&Ct.visible&&E.push(R,ze,Ct,Q,ue.z,st)}}else qe.visible&&E.push(R,ze,qe,Q,ue.z,null)}}const Re=R.children;for(let ze=0,qe=Re.length;ze<qe;ze++)Me(Re[ze],K,Q,te)}function je(R,K,Q,te){const Z=R.opaque,Re=R.transmissive,ze=R.transparent;h.setupLightsView(Q),I===!0&&et.setGlobalState(u.clippingPlanes,Q),Re.length>0&&Be(Z,Re,K,Q),te&&ge.viewport(M.copy(te)),Z.length>0&&it(Z,K,Q),Re.length>0&&it(Re,K,Q),ze.length>0&&it(ze,K,Q),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Be(R,K,Q,te){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;const Re=Ae.isWebGL2;V===null&&(V=new Bi(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")?Ur:_i,minFilter:Fr,samples:Re?4:0})),u.getDrawingBufferSize(se),Re?V.setSize(se.x,se.y):V.setSize(Xa(se.x),Xa(se.y));const ze=u.getRenderTarget();u.setRenderTarget(V),u.getClearColor(G),P=u.getClearAlpha(),P<1&&u.setClearColor(16777215,.5),u.clear();const qe=u.toneMapping;u.toneMapping=vi,it(R,Q,te),L.updateMultisampleRenderTarget(V),L.updateRenderTargetMipmap(V);let Ye=!1;for(let Ke=0,Qe=K.length;Ke<Qe;Ke++){const st=K[Ke],Ct=st.object,St=st.geometry,Rt=st.material,kn=st.group;if(Rt.side===In&&Ct.layers.test(te.layers)){const Et=Rt.side;Rt.side=pn,Rt.needsUpdate=!0,Ft(Ct,Q,te,St,Rt,kn),Rt.side=Et,Rt.needsUpdate=!0,Ye=!0}}Ye===!0&&(L.updateMultisampleRenderTarget(V),L.updateRenderTargetMipmap(V)),u.setRenderTarget(ze),u.setClearColor(G,P),u.toneMapping=qe}function it(R,K,Q){const te=K.isScene===!0?K.overrideMaterial:null;for(let Z=0,Re=R.length;Z<Re;Z++){const ze=R[Z],qe=ze.object,Ye=ze.geometry,Ke=te===null?ze.material:te,Qe=ze.group;qe.layers.test(Q.layers)&&Ft(qe,K,Q,Ye,Ke,Qe)}}function Ft(R,K,Q,te,Z,Re){R.onBeforeRender(u,K,Q,te,Z,Re),R.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Z.onBeforeRender(u,K,Q,te,R,Re),Z.transparent===!0&&Z.side===In&&Z.forceSinglePass===!1?(Z.side=pn,Z.needsUpdate=!0,u.renderBufferDirect(Q,K,te,Z,R,Re),Z.side=xi,Z.needsUpdate=!0,u.renderBufferDirect(Q,K,te,Z,R,Re),Z.side=In):u.renderBufferDirect(Q,K,te,Z,R,Re),R.onAfterRender(u,K,Q,te,Z,Re)}function Lt(R,K,Q){K.isScene!==!0&&(K=be);const te=Ue.get(R),Z=h.state.lights,Re=h.state.shadowsArray,ze=Z.state.version,qe=ke.getParameters(R,Z.state,Re,K,Q),Ye=ke.getProgramCacheKey(qe);let Ke=te.programs;te.environment=R.isMeshStandardMaterial?K.environment:null,te.fog=K.fog,te.envMap=(R.isMeshStandardMaterial?J:A).get(R.envMap||te.environment),Ke===void 0&&(R.addEventListener("dispose",ve),Ke=new Map,te.programs=Ke);let Qe=Ke.get(Ye);if(Qe!==void 0){if(te.currentProgram===Qe&&te.lightsStateVersion===ze)return zt(R,qe),Qe}else qe.uniforms=ke.getUniforms(R),R.onBuild(Q,qe,u),R.onBeforeCompile(qe,u),Qe=ke.acquireProgram(qe,Ye),Ke.set(Ye,Qe),te.uniforms=qe.uniforms;const st=te.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(st.clippingPlanes=et.uniform),zt(R,qe),te.needsLights=yi(R),te.lightsStateVersion=ze,te.needsLights&&(st.ambientLightColor.value=Z.state.ambient,st.lightProbe.value=Z.state.probe,st.directionalLights.value=Z.state.directional,st.directionalLightShadows.value=Z.state.directionalShadow,st.spotLights.value=Z.state.spot,st.spotLightShadows.value=Z.state.spotShadow,st.rectAreaLights.value=Z.state.rectArea,st.ltc_1.value=Z.state.rectAreaLTC1,st.ltc_2.value=Z.state.rectAreaLTC2,st.pointLights.value=Z.state.point,st.pointLightShadows.value=Z.state.pointShadow,st.hemisphereLights.value=Z.state.hemi,st.directionalShadowMap.value=Z.state.directionalShadowMap,st.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,st.spotShadowMap.value=Z.state.spotShadowMap,st.spotLightMatrix.value=Z.state.spotLightMatrix,st.spotLightMap.value=Z.state.spotLightMap,st.pointShadowMap.value=Z.state.pointShadowMap,st.pointShadowMatrix.value=Z.state.pointShadowMatrix),te.currentProgram=Qe,te.uniformsList=null,Qe}function Jt(R){if(R.uniformsList===null){const K=R.currentProgram.getUniforms();R.uniformsList=Ps.seqWithValue(K.seq,R.uniforms)}return R.uniformsList}function zt(R,K){const Q=Ue.get(R);Q.outputColorSpace=K.outputColorSpace,Q.batching=K.batching,Q.instancing=K.instancing,Q.instancingColor=K.instancingColor,Q.skinning=K.skinning,Q.morphTargets=K.morphTargets,Q.morphNormals=K.morphNormals,Q.morphColors=K.morphColors,Q.morphTargetsCount=K.morphTargetsCount,Q.numClippingPlanes=K.numClippingPlanes,Q.numIntersection=K.numClipIntersection,Q.vertexAlphas=K.vertexAlphas,Q.vertexTangents=K.vertexTangents,Q.toneMapping=K.toneMapping}function nn(R,K,Q,te,Z){K.isScene!==!0&&(K=be),L.resetTextureUnits();const Re=K.fog,ze=te.isMeshStandardMaterial?K.environment:null,qe=g===null?u.outputColorSpace:g.isXRRenderTarget===!0?g.texture.colorSpace:ti,Ye=(te.isMeshStandardMaterial?J:A).get(te.envMap||ze),Ke=te.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Qe=!!Q.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),st=!!Q.morphAttributes.position,Ct=!!Q.morphAttributes.normal,St=!!Q.morphAttributes.color;let Rt=vi;te.toneMapped&&(g===null||g.isXRRenderTarget===!0)&&(Rt=u.toneMapping);const kn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Et=kn!==void 0?kn.length:0,rt=Ue.get(te),bi=h.state.lights;if(I===!0&&(B===!0||R!==_)){const Qt=R===_&&te.id===w;et.setState(te,R,Qt)}let yt=!1;te.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==bi.state.version||rt.outputColorSpace!==qe||Z.isBatchedMesh&&rt.batching===!1||!Z.isBatchedMesh&&rt.batching===!0||Z.isInstancedMesh&&rt.instancing===!1||!Z.isInstancedMesh&&rt.instancing===!0||Z.isSkinnedMesh&&rt.skinning===!1||!Z.isSkinnedMesh&&rt.skinning===!0||Z.isInstancedMesh&&rt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&rt.instancingColor===!1&&Z.instanceColor!==null||rt.envMap!==Ye||te.fog===!0&&rt.fog!==Re||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==et.numPlanes||rt.numIntersection!==et.numIntersection)||rt.vertexAlphas!==Ke||rt.vertexTangents!==Qe||rt.morphTargets!==st||rt.morphNormals!==Ct||rt.morphColors!==St||rt.toneMapping!==Rt||Ae.isWebGL2===!0&&rt.morphTargetsCount!==Et)&&(yt=!0):(yt=!0,rt.__version=te.version);let Sn=rt.currentProgram;yt===!0&&(Sn=Lt(te,K,Z));let Wn=!1,rn=!1,On=!1;const At=Sn.getUniforms(),It=rt.uniforms;if(ge.useProgram(Sn.program)&&(Wn=!0,rn=!0,On=!0),te.id!==w&&(w=te.id,rn=!0),Wn||_!==R){At.setValue(W,"projectionMatrix",R.projectionMatrix),At.setValue(W,"viewMatrix",R.matrixWorldInverse);const Qt=At.map.cameraPosition;Qt!==void 0&&Qt.setValue(W,ue.setFromMatrixPosition(R.matrixWorld)),Ae.logarithmicDepthBuffer&&At.setValue(W,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&At.setValue(W,"isOrthographic",R.isOrthographicCamera===!0),_!==R&&(_=R,rn=!0,On=!0)}if(Z.isSkinnedMesh){At.setOptional(W,Z,"bindMatrix"),At.setOptional(W,Z,"bindMatrixInverse");const Qt=Z.skeleton;Qt&&(Ae.floatVertexTextures?(Qt.boneTexture===null&&Qt.computeBoneTexture(),At.setValue(W,"boneTexture",Qt.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(At.setOptional(W,Z,"batchingTexture"),At.setValue(W,"batchingTexture",Z._matricesTexture,L));const vn=Q.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0&&Ae.isWebGL2===!0)&&tt.update(Z,Q,Sn),(rn||rt.receiveShadow!==Z.receiveShadow)&&(rt.receiveShadow=Z.receiveShadow,At.setValue(W,"receiveShadow",Z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(It.envMap.value=Ye,It.flipEnvMap.value=Ye.isCubeTexture&&Ye.isRenderTargetTexture===!1?-1:1),rn&&(At.setValue(W,"toneMappingExposure",u.toneMappingExposure),rt.needsLights&&ii(It,On),Re&&te.fog===!0&&xe.refreshFogUniforms(It,Re),xe.refreshMaterialUniforms(It,te,$,F,V),Ps.upload(W,Jt(rt),It,L)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Ps.upload(W,Jt(rt),It,L),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&At.setValue(W,"center",Z.center),At.setValue(W,"modelViewMatrix",Z.modelViewMatrix),At.setValue(W,"normalMatrix",Z.normalMatrix),At.setValue(W,"modelMatrix",Z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const Qt=te.uniformsGroups;for(let ri=0,Mi=Qt.length;ri<Mi;ri++)if(Ae.isWebGL2){const ln=Qt[ri];Se.update(ln,Sn),Se.bind(ln,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function ii(R,K){R.ambientLightColor.needsUpdate=K,R.lightProbe.needsUpdate=K,R.directionalLights.needsUpdate=K,R.directionalLightShadows.needsUpdate=K,R.pointLights.needsUpdate=K,R.pointLightShadows.needsUpdate=K,R.spotLights.needsUpdate=K,R.spotLightShadows.needsUpdate=K,R.rectAreaLights.needsUpdate=K,R.hemisphereLights.needsUpdate=K}function yi(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return g},this.setRenderTargetTextures=function(R,K,Q){Ue.get(R.texture).__webglTexture=K,Ue.get(R.depthTexture).__webglTexture=Q;const te=Ue.get(R);te.__hasExternalTextures=!0,te.__hasExternalTextures&&(te.__autoAllocateDepthBuffer=Q===void 0,te.__autoAllocateDepthBuffer||oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,K){const Q=Ue.get(R);Q.__webglFramebuffer=K,Q.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(R,K=0,Q=0){g=R,S=K,y=Q;let te=!0,Z=null,Re=!1,ze=!1;if(R){const Ye=Ue.get(R);Ye.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(W.FRAMEBUFFER,null),te=!1):Ye.__webglFramebuffer===void 0?L.setupRenderTarget(R):Ye.__hasExternalTextures&&L.rebindTextures(R,Ue.get(R.texture).__webglTexture,Ue.get(R.depthTexture).__webglTexture);const Ke=R.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(ze=!0);const Qe=Ue.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Qe[K])?Z=Qe[K][Q]:Z=Qe[K],Re=!0):Ae.isWebGL2&&R.samples>0&&L.useMultisampledRTT(R)===!1?Z=Ue.get(R).__webglMultisampledFramebuffer:Array.isArray(Qe)?Z=Qe[Q]:Z=Qe,M.copy(R.viewport),C.copy(R.scissor),D=R.scissorTest}else M.copy(N).multiplyScalar($).floor(),C.copy(q).multiplyScalar($).floor(),D=U;if(ge.bindFramebuffer(W.FRAMEBUFFER,Z)&&Ae.drawBuffers&&te&&ge.drawBuffers(R,Z),ge.viewport(M),ge.scissor(C),ge.setScissorTest(D),Re){const Ye=Ue.get(R.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ye.__webglTexture,Q)}else if(ze){const Ye=Ue.get(R.texture),Ke=K||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ye.__webglTexture,Q||0,Ke)}w=-1},this.readRenderTargetPixels=function(R,K,Q,te,Z,Re,ze){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=Ue.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ze!==void 0&&(qe=qe[ze]),qe){ge.bindFramebuffer(W.FRAMEBUFFER,qe);try{const Ye=R.texture,Ke=Ye.format,Qe=Ye.type;if(Ke!==Fn&&Fe.convert(Ke)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const st=Qe===Ur&&(oe.has("EXT_color_buffer_half_float")||Ae.isWebGL2&&oe.has("EXT_color_buffer_float"));if(Qe!==_i&&Fe.convert(Qe)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Qe===hi&&(Ae.isWebGL2||oe.has("OES_texture_float")||oe.has("WEBGL_color_buffer_float")))&&!st){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=R.width-te&&Q>=0&&Q<=R.height-Z&&W.readPixels(K,Q,te,Z,Fe.convert(Ke),Fe.convert(Qe),Re)}finally{const Ye=g!==null?Ue.get(g).__webglFramebuffer:null;ge.bindFramebuffer(W.FRAMEBUFFER,Ye)}}},this.copyFramebufferToTexture=function(R,K,Q=0){const te=Math.pow(2,-Q),Z=Math.floor(K.image.width*te),Re=Math.floor(K.image.height*te);L.setTexture2D(K,0),W.copyTexSubImage2D(W.TEXTURE_2D,Q,0,0,R.x,R.y,Z,Re),ge.unbindTexture()},this.copyTextureToTexture=function(R,K,Q,te=0){const Z=K.image.width,Re=K.image.height,ze=Fe.convert(Q.format),qe=Fe.convert(Q.type);L.setTexture2D(Q,0),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,Q.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,Q.unpackAlignment),K.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,te,R.x,R.y,Z,Re,ze,qe,K.image.data):K.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,te,R.x,R.y,K.mipmaps[0].width,K.mipmaps[0].height,ze,K.mipmaps[0].data):W.texSubImage2D(W.TEXTURE_2D,te,R.x,R.y,ze,qe,K.image),te===0&&Q.generateMipmaps&&W.generateMipmap(W.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(R,K,Q,te,Z=0){if(u.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Re=R.max.x-R.min.x+1,ze=R.max.y-R.min.y+1,qe=R.max.z-R.min.z+1,Ye=Fe.convert(te.format),Ke=Fe.convert(te.type);let Qe;if(te.isData3DTexture)L.setTexture3D(te,0),Qe=W.TEXTURE_3D;else if(te.isDataArrayTexture||te.isCompressedArrayTexture)L.setTexture2DArray(te,0),Qe=W.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,te.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,te.unpackAlignment);const st=W.getParameter(W.UNPACK_ROW_LENGTH),Ct=W.getParameter(W.UNPACK_IMAGE_HEIGHT),St=W.getParameter(W.UNPACK_SKIP_PIXELS),Rt=W.getParameter(W.UNPACK_SKIP_ROWS),kn=W.getParameter(W.UNPACK_SKIP_IMAGES),Et=Q.isCompressedTexture?Q.mipmaps[Z]:Q.image;W.pixelStorei(W.UNPACK_ROW_LENGTH,Et.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Et.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,R.min.x),W.pixelStorei(W.UNPACK_SKIP_ROWS,R.min.y),W.pixelStorei(W.UNPACK_SKIP_IMAGES,R.min.z),Q.isDataTexture||Q.isData3DTexture?W.texSubImage3D(Qe,Z,K.x,K.y,K.z,Re,ze,qe,Ye,Ke,Et.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Qe,Z,K.x,K.y,K.z,Re,ze,qe,Ye,Et.data)):W.texSubImage3D(Qe,Z,K.x,K.y,K.z,Re,ze,qe,Ye,Ke,Et),W.pixelStorei(W.UNPACK_ROW_LENGTH,st),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Ct),W.pixelStorei(W.UNPACK_SKIP_PIXELS,St),W.pixelStorei(W.UNPACK_SKIP_ROWS,Rt),W.pixelStorei(W.UNPACK_SKIP_IMAGES,kn),Z===0&&te.generateMipmaps&&W.generateMipmap(Qe),ge.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?L.setTextureCube(R,0):R.isData3DTexture?L.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?L.setTexture2DArray(R,0):L.setTexture2D(R,0),ge.unbindTexture()},this.resetState=function(){S=0,y=0,g=null,ge.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ja?"display-p3":"srgb",t.unpackColorSpace=bt.workingColorSpace===Gs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Kt?ki:xc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ki?Kt:ti}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class gg extends Hc{}gg.prototype.isWebGL1Renderer=!0;class vg extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class _g extends fn{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xg{constructor(e,t,i=0,r=1/0){this.ray=new Tc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new eo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return qa(e,this,i,t),i.sort(Ol),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)qa(e[r],this,i,t);return i.sort(Ol),i}}function Ol(n,e){return n.distance-e.distance}function qa(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,o=r.length;s<o;s++)qa(r[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);function Da(n,e){const[t,i,r,s,o,a]=n,[c,l,d,f,v,x]=e;return[t*c+r*l,i*c+s*l,t*d+r*f,i*d+s*f,t*v+r*x+o,i*v+s*x+a]}function yg(n){const[e,t,i,r,s,o]=n,a=e*r-t*i;if(Math.abs(a)<1e-8)return[1,0,0,1,-s,-o];const c=1/a,l=r*c,d=-t*c,f=-i*c,v=e*c,x=-(l*s+f*o),b=-(d*s+v*o);return[l,d,f,v,x,b]}function Bl(n,e,t,i=1,r=1){const s=t*Math.PI/180,o=Math.cos(s),a=Math.sin(s);return[o*i,a*i,-a*r,o*r,n,e]}function mi(n,e,t){return{x:n[0]*e+n[2]*t+n[4],y:n[1]*e+n[3]*t+n[5]}}function Ii(n,e){const t=new Map,i=new Map(n.map(s=>[s.id,s]));function r(s,o=new Set){const a=t.get(s.id);if(a)return a;o.add(s.id);const c=s.parentId&&!o.has(s.parentId)?i.get(s.parentId):void 0,l=c?r(c,o):void 0,d=e==null?void 0:e.get(s.id),f=(d==null?void 0:d.dX)??0,v=(d==null?void 0:d.dY)??0,x=(d==null?void 0:d.dRotation)??0,b=(d==null?void 0:d.scaleX)??1,E=(d==null?void 0:d.scaleY)??1,h=Bl(s.restX,s.restY,s.restRotation,1,1),p=l?Da(l.bindMatrix,h):h,T=yg(p),u=mi(p,0,0),m=mi(p,s.length,0),S=l?l.bindWorldAngleDeg+s.restRotation:s.restRotation,y=Bl(s.restX+f,s.restY+v,s.restRotation+x,b,E),g=l?Da(l.worldMatrix,y):y,w=mi(g,0,0),_=mi(g,s.length,0),M=l?l.worldAngleDeg+s.restRotation+x:s.restRotation+x,C=l?l.worldScaleX*b:b,D=l?l.worldScaleY*E:E,G=Da(g,T),P={id:s.id,name:s.name,parentId:s.parentId,bindHeadX:u.x,bindHeadY:u.y,bindTailX:m.x,bindTailY:m.y,bindWorldAngleDeg:S,bindMatrix:p,bindInverseMatrix:T,headX:w.x,headY:w.y,tailX:_.x,tailY:_.y,worldAngleDeg:M,worldScaleX:C,worldScaleY:D,worldMatrix:g,skinMatrix:G,length:s.length,color:s.color};return t.set(s.id,P),P}for(const s of n)r(s);return t}function bg(n,e,t,i,r){const s=new Map;for(const[q,U]of e.entries())s.set(q,{...U});const o=new Map(n.map(q=>[q.id,q])),a=o.get(t);if(!a)return s;const c=Ii(n,s),l=c.get(a.id);if(!l)return s;const d=a.parentId?o.get(a.parentId):void 0,f=d?c.get(d.id):void 0;if(!d||!f){const q=Math.atan2(r-l.headY,i-l.headX)*180/Math.PI,U=Ni(q-a.restRotation),H=s.get(a.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};return s.set(a.id,{...H,dRotation:U}),s}const v=f.headX,x=f.headY,b=Math.max(1,Math.hypot(l.headX-v,l.headY-x)),E=Math.max(1,a.length*l.worldScaleX),h=i-v,p=r-x,T=Math.hypot(h,p),u=Math.max(1,b+E-.01),m=Math.abs(b-E)+.01,S=Math.max(m,Math.min(u,T)),y=Math.atan2(p,h),g=Math.max(-1,Math.min(1,(b*b+S*S-E*E)/(2*b*S))),w=Math.max(-1,Math.min(1,(b*b+E*E-S*S)/(2*b*E))),_=a.ikBendPositive===!1?-1:1,M=y-_*Math.acos(g),C=Math.acos(w),D=_*(Math.PI-C),G=d.parentId?c.get(d.parentId):void 0,P=G?G.worldAngleDeg:0,k=M*180/Math.PI,F=Ni(k-P-d.restRotation),$=D*180/Math.PI,ee=Ni($-a.restRotation),X=s.get(d.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};s.set(d.id,{...X,dRotation:F});const N=s.get(a.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};return s.set(a.id,{...N,dRotation:ee}),s}function Ni(n){let e=((n+180)%360+360)%360-180;return e===-180&&(e=180),e}function Gc(n,e,t,i,r,s){const o=r-t,a=s-i,c=o*o+a*a;if(c<1e-6)return Math.hypot(n-t,e-i);const l=Math.max(0,Math.min(1,((n-t)*o+(e-i)*a)/c)),d=t+l*o,f=i+l*a;return Math.hypot(n-d,e-f)}function Mg(n,e,t,i=10,r=10){if(t.length===0)return null;const s=e.getContext("2d");if(!s)return null;const o=e.width,a=e.height,c=s.getImageData(0,0,o,a).data;let l=o,d=a,f=0,v=0,x=!1;const b=4;for(let S=0;S<a;S+=b)for(let y=0;y<o;y+=b)c[(S*o+y)*4+3]>8&&(x=!0,y<l&&(l=y),S<d&&(d=S),y>f&&(f=y),S>v&&(v=S));x?(l=Math.max(0,l-24),d=Math.max(0,d-24),f=Math.min(o,f+24),v=Math.min(a,v+24)):(l=0,d=0,f=o,v=a);const E=Math.max(32,f-l),h=Math.max(32,v-d),p=Array.from(Ii(t).values()),T=[];for(let S=0;S<=r;S++){const y=S/r,g=d+y*h;for(let w=0;w<=i;w++){const _=w/i,M=l+_*E,C=p.map(k=>{const F=Gc(M,g,k.bindHeadX,k.bindHeadY,k.bindTailX,k.bindTailY),$=1/Math.pow(Math.max(6,F),2.2);return{boneId:k.id,weight:$}});C.sort((k,F)=>F.weight-k.weight);const D=C.slice(0,Math.min(3,C.length)),G=D.reduce((k,F)=>k+F.weight,0)||1,P=D.map(k=>({boneId:k.boneId,weight:k.weight/G}));T.push({x:M,y:g,u:_,v:y,weights:P})}}const u=[],m=i+1;for(let S=0;S<r;S++)for(let y=0;y<i;y++){const g=S*m+y,w=g+1,_=(S+1)*m+y,M=_+1;u.push([g,w,_]),u.push([w,M,_])}return{layerId:n,cols:i,rows:r,bounds:{x:l,y:d,w:E,h},vertices:T,indices:u}}function Sg(n,e,t,i){const r=new Array(t.vertices.length);for(let l=0;l<t.vertices.length;l++){const d=t.vertices[l];let f=0,v=0,x=0;for(const b of d.weights){const E=i.get(b.boneId);if(!E)continue;const h=mi(E.skinMatrix,d.x,d.y);f+=h.x*b.weight,v+=h.y*b.weight,x+=b.weight}x>0?r[l]={x:f/x,y:v/x}:r[l]={x:d.x,y:d.y}}const{x:s,y:o,w:a,h:c}=t.bounds;for(const[l,d,f]of t.indices){const v=t.vertices[l],x=t.vertices[d],b=t.vertices[f],E=r[l],h=r[d],p=r[f],T=s+v.u*a,u=o+v.v*c,m=s+x.u*a,S=o+x.v*c,y=s+b.u*a,g=o+b.v*c;Eg(n,e,T,u,m,S,y,g,E.x,E.y,h.x,h.y,p.x,p.y)}}function Eg(n,e,t,i,r,s,o,a,c,l,d,f,v,x){const b=t*(a-s)-r*a+o*s+(r-o)*i;if(Math.abs(b)<1e-5)return;const E=(c+d+v)/3,h=(l+f+x)/3,p=(C,D)=>{const G=Math.hypot(C-E,D-h);if(G<.001)return{x:C,y:D};const P=(G+.45)/G;return{x:E+(C-E)*P,y:h+(D-h)*P}},T=p(c,l),u=p(d,f),m=p(v,x);n.save(),n.beginPath(),n.moveTo(T.x,T.y),n.lineTo(u.x,u.y),n.lineTo(m.x,m.y),n.closePath(),n.clip();const S=-(i*(v-d)-s*v+a*d+(s-a)*c)/b,y=(s*x+i*(f-x)-a*f+(a-s)*l)/b,g=(t*(v-d)-r*v+o*d+(r-o)*c)/b,w=-(r*x+t*(f-x)-o*f+(o-r)*l)/b,_=(t*(a*d-s*v)+i*(r*v-o*d)+(o*s-r*a)*c)/b,M=(t*(a*f-s*x)+i*(r*x-o*f)+(o*s-r*a)*l)/b;n.transform(S,y,g,w,_,M),n.drawImage(e,0,0),n.restore()}const Tg={x:0,y:0,scaleX:1,scaleY:1,rotation:0,opacity:1};function zl(){return{fps:12,totalFrames:24,startFrame:1,endFrame:24,currentFrame:1,loop:!0,isPlaying:!1,division:5,timeFormat:"frames"}}function lr(n,e){const t=new Map;return e&&t.set(1,e),{id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:1,endFrame:n,exposures:t}}function Yt(n){n.exposures.clear(),n.clips.sort((e,t)=>e.startFrame-t.startFrame);for(const e of n.clips)for(const[t,i]of e.exposures.entries())t>=e.startFrame&&t<=e.endFrame&&n.exposures.set(t,i)}function Ia(n,e,t){let i=n.clips.find(o=>e>=o.startFrame&&e<=o.endFrame);if(i)return i;if(n.clips.length===0)return i=lr(t),n.clips.push(i),i;n.clips.sort((o,a)=>o.startFrame-a.startFrame);const r=[...n.clips].reverse().find(o=>o.endFrame<e);if(r){const o=n.clips.find(a=>a.startFrame>e);return r.endFrame=o?Math.min(e,o.startFrame-1):Math.max(r.endFrame,e),r}const s=n.clips[0];return s.startFrame=Math.min(s.startFrame,e),s}const Hl=["#00e5ff","#ffd43b","#ff6b6b","#51cf66","#cc5de8","#ff922b","#4dabf7"];function wg(n){let e=1,t=1,i=null;const r={id:"scene-1",name:"Escena 1",settings:zl(),tracks:[],bones:[],boneKeyframes:new Map},s=[r];let o=r.id;function a(){return s.find(u=>u.id===o)??s[0]}function c(){return{x:0,y:0,rotation:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1}}const l={enabled:!1,prevFrames:2,nextFrames:2,prevColor:"#38bdf8",nextColor:"#4ade80",startOpacity:.5,stepOpacity:.15,mode:"tint",activeReferenceCelId:null,transforms:new Map,customReferences:[]},d=new Set;function f(){for(const u of d)u()}let v=null,x=0,b=0;function E(u){const m=a().settings;if(!m.isPlaying)return;x===0&&(x=u);const S=u-x;x=u,b+=S;const y=1e3/m.fps;if(b>=y){const g=Math.floor(b/y);b%=y;let w=m.currentFrame+g;if(w>m.endFrame)if(m.loop){const _=Math.max(1,m.endFrame-m.startFrame+1);w=m.startFrame+(w-m.startFrame)%_}else w=m.endFrame,T.pause();m.currentFrame!==w&&(m.currentFrame=w,h(),f())}m.isPlaying&&(v=requestAnimationFrame(E))}function h(){const u=a(),m=u.tracks,S=u.settings;if(m.length===0)return;const y=n.getActiveLayer();let g=m.find(w=>w.folderId===y.id||w.folderId===y.parentId);if(!g&&m.length>0&&(g=m[0]),g){const w=T.getActiveCelForFrame(g.id,S.currentFrame);w&&w.id!==y.id&&n.setActiveLayer(w.id)}}function p(){const u=a(),m=u.tracks,S=u.settings,y=n.layers.filter(_=>_.type==="folder"&&_.isAnimationFolder),g=new Set;for(let _=m.length-1;_>=0;_--){const M=m[_].folderId;!y.some(C=>C.id===M)||g.has(M)?m.splice(_,1):g.add(M)}for(const _ of y){let M=m.find(D=>D.folderId===_.id);const C=n.layers.filter(D=>D.parentId===_.id);if(M)M.name=_.name,M.visible=_.visible,M.clips.length===0&&M.clips.push(lr(S.totalFrames)),C.length>0&&M.exposures.size===0&&(M.clips[0].exposures.set(M.clips[0].startFrame,C[0].id),Yt(M));else{const D=lr(S.totalFrames,C.length>0?C[0].id:void 0);M={id:_.id,folderId:_.id,name:_.name,visible:_.visible,clips:[D],exposures:new Map,keyframesEnabled:!1,keyframes:new Map},Yt(M),m.push(M)}}const w=new Map(y.map((_,M)=>[_.id,M]));m.sort((_,M)=>(w.get(M.folderId)??0)-(w.get(_.folderId)??0))}n.subscribe(()=>{p(),f()});const T={get settings(){return a().settings},get onionSkin(){return l},get tracks(){return a().tracks},get scenes(){return s},get activeSceneId(){return o},get activeScene(){return a()},get bones(){return a().bones},get boneKeyframes(){return a().boneKeyframes},get selectedBoneId(){return i},createScene(u,m=!1){var D;T.pause(),e++;const S=a(),y=m?{...S.settings,isPlaying:!1,currentFrame:1}:zl(),g=[],w=n.layers.filter(G=>G.type==="folder"&&G.isAnimationFolder);for(const G of w){const P=S.tracks.find(F=>F.folderId===G.id),k=n.layers.filter(F=>F.parentId===G.id);if(m&&P){const F=P.clips.map(X=>({id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:X.startFrame,endFrame:X.endFrame,exposures:new Map(X.exposures)})),$=new Map;for(const[X,N]of P.keyframes.entries())$.set(X,{...N});const ee={id:G.id,folderId:G.id,name:G.name,visible:G.visible,clips:F,exposures:new Map,keyframesEnabled:P.keyframesEnabled,keyframes:$};Yt(ee),g.push(ee)}else{let F=(D=k[0])==null?void 0:D.id;if(!m){let X=0;for(const q of k){const U=q.name.match(/^(\d+)$/);U&&(X=Math.max(X,parseInt(U[1],10)))}F=n.createLayer(`${X+1}`,G.id).id}const $=lr(y.totalFrames,F),ee={id:G.id,folderId:G.id,name:G.name,visible:G.visible,clips:[$],exposures:new Map,keyframesEnabled:!1,keyframes:new Map};Yt(ee),g.push(ee)}}const _=S.bones.map(G=>({...G})),M=new Map;if(m)for(const[G,P]of S.boneKeyframes.entries()){const k=new Map;for(const[F,$]of P.poses.entries())k.set(F,{...$});M.set(G,{frame:P.frame,interpolation:P.interpolation,poses:k})}const C={id:`scene-${Date.now()}-${e}`,name:(u==null?void 0:u.trim())||`Escena ${e}`,settings:y,tracks:g,bones:_,boneKeyframes:M};return s.push(C),o=C.id,p(),h(),f(),C},switchScene(u){if(u===o)return;const m=s.find(S=>S.id===u);m&&(T.pause(),o=m.id,p(),h(),f())},renameScene(u,m){const S=s.find(g=>g.id===u),y=m.trim();S&&y&&(S.name=y,f())},deleteScene(u){if(s.length<=1)return!1;const m=s.findIndex(S=>S.id===u);return m===-1?!1:(T.pause(),s.splice(m,1),o===u&&(o=s[Math.max(0,m-1)].id),p(),h(),f(),!0)},play(){const u=a().settings;u.isPlaying||(u.isPlaying=!0,x=0,b=0,v=requestAnimationFrame(E),f())},pause(){const u=a().settings;u.isPlaying&&(u.isPlaying=!1,v!==null&&(cancelAnimationFrame(v),v=null),f())},togglePlay(){a().settings.isPlaying?T.pause():T.play()},setFps(u){const m=a().settings;m.fps=Math.max(1,Math.min(120,Math.round(u))),f()},setTotalFrames(u,m=!0){const S=a(),y=S.settings,g=y.totalFrames,w=Math.max(1,Math.min(2e3,Math.round(u)));if(w===g)return;const _=y.endFrame===g;y.totalFrames=w,(m&&(_||y.endFrame>w)||y.endFrame>w)&&(y.endFrame=w),y.startFrame>y.endFrame&&(y.startFrame=Math.max(1,y.endFrame)),y.currentFrame>w&&(y.currentFrame=w);for(const M of S.tracks){for(const C of M.clips)(C.endFrame===g||C.endFrame>w)&&(C.endFrame=w),C.startFrame>w&&(C.startFrame=w);Yt(M)}h(),f()},setRange(u,m){const S=a().settings,y=Math.max(1,Math.min(S.totalFrames,Math.round(u))),g=Math.max(y,Math.min(S.totalFrames,Math.round(m)));S.startFrame=y,S.endFrame=g,S.currentFrame<y&&(S.currentFrame=y),S.currentFrame>g&&(S.currentFrame=g),h(),f()},setLoop(u){a().settings.loop=u,f()},setDivision(u){a().settings.division=Math.max(2,Math.min(24,Math.round(u))),f()},setTimeFormat(u){a().settings.timeFormat=u,f()},updateTimelineSettings(u){const m=a();if(u.sceneName!==void 0&&u.sceneName.trim()&&(m.name=u.sceneName.trim()),u.totalFrames!==void 0&&T.setTotalFrames(u.totalFrames,!0),u.fps!==void 0&&(m.settings.fps=Math.max(1,Math.min(120,Math.round(u.fps)))),u.startFrame!==void 0||u.endFrame!==void 0){const S=u.startFrame??m.settings.startFrame,y=u.endFrame??m.settings.endFrame;T.setRange(S,y)}u.loop!==void 0&&(m.settings.loop=u.loop),u.division!==void 0&&(m.settings.division=Math.max(2,Math.min(24,Math.round(u.division)))),u.timeFormat!==void 0&&(m.settings.timeFormat=u.timeFormat),f()},goToFrame(u){const m=a().settings,S=Math.max(1,Math.min(m.totalFrames,Math.round(u)));m.currentFrame!==S&&(m.currentFrame=S,h(),f())},nextFrame(){const u=a().settings;let m=u.currentFrame+1;m>u.endFrame&&(m=u.loop?u.startFrame:u.endFrame),T.goToFrame(m)},prevFrame(){const u=a().settings;let m=u.currentFrame-1;m<u.startFrame&&(m=u.loop?u.endFrame:u.startFrame),T.goToFrame(m)},firstFrame(){T.goToFrame(a().settings.startFrame)},lastFrame(){T.goToFrame(a().settings.endFrame)},nextCel(u){const{tracks:m,settings:S}=a(),y=u?m.find(_=>_.id===u):m[0];if(!y)return;const g=Array.from(y.exposures.keys()).sort((_,M)=>_-M),w=g.find(_=>_>S.currentFrame);w!==void 0?T.goToFrame(w):S.loop&&g.length>0&&T.goToFrame(g[0])},prevCel(u){const{tracks:m,settings:S}=a(),y=u?m.find(_=>_.id===u):m[0];if(!y)return;const g=Array.from(y.exposures.keys()).sort((_,M)=>M-_),w=g.find(_=>_<S.currentFrame);w!==void 0?T.goToFrame(w):S.loop&&g.length>0&&T.goToFrame(g[0])},createTrack(u){const{tracks:m,settings:S}=a(),y=n.createAnimationFolder(u||`Animation ${m.length+1}`);let g=m.find(_=>_.folderId===y.id);g||(g={id:y.id,folderId:y.id,name:y.name,visible:!0,clips:[lr(S.totalFrames)],exposures:new Map,keyframesEnabled:!1,keyframes:new Map},m.push(g));const w=n.layers.filter(_=>_.parentId===y.id);if(w.length===0){const _=n.createLayer("1",y.id);g.clips[0].exposures.set(1,_.id),Yt(g),n.setActiveLayer(_.id)}else g.exposures.size===0&&(g.clips[0].exposures.set(1,w[0].id),Yt(g),n.setActiveLayer(w[0].id));return f(),g},deleteTrack(u){const{tracks:m}=a(),S=m.findIndex(y=>y.id===u);if(S!==-1){const y=m[S];m.splice(S,1),n.deleteLayer(y.folderId),f()}},createCel(u,m){const{tracks:S,settings:y}=a();let g=u?S.find(P=>P.id===u):S[0];g||(g=T.createTrack());const w=m!==void 0?m:y.currentFrame,_=n.layers.filter(P=>P.parentId===g.folderId);let M=0;for(const P of _){const k=P.name.match(/^(\d+)$/);if(k){const F=parseInt(k[1],10);F>M&&(M=F)}}const C=`${M+1}`,D=n.createLayer(C,g.folderId);return Ia(g,w,y.totalFrames).exposures.set(w,D.id),Yt(g),n.setActiveLayer(D.id),f(),D},specifyCel(u,m,S){const{tracks:y,settings:g}=a(),w=y.find(M=>M.id===u);if(!w)return;m>g.totalFrames&&T.setTotalFrames(m,!0),Ia(w,m,g.totalFrames).exposures.set(m,S),Yt(w),h(),f()},moveExposure(u,m,S){const{tracks:y,settings:g}=a(),w=y.find(D=>D.id===u);if(!w)return!1;const _=w.exposures.get(m);if(!_)return!1;const M=Math.max(1,Math.round(S));if(M===m)return!1;M>g.totalFrames&&T.setTotalFrames(M,!0);for(const D of w.clips)D.exposures.delete(m);return Ia(w,M,g.totalFrames).exposures.set(M,_),Yt(w),g.currentFrame=M,h(),f(),!0},moveCelSpan(u,m,S,y){const{tracks:g,settings:w}=a(),_=g.find(P=>P.id===u);if(!_)return!1;const M=_.exposures.get(m);if(!M)return!1;const C=Math.max(1,Math.round(S)),D=C+Math.max(1,y)-1;if(C===m)return!1;D>w.totalFrames&&T.setTotalFrames(D,!0);const G=_.clips.find(P=>P.exposures.has(m));if(!G)return!1;if(G.exposures.delete(m),G.exposures.size===0)G.startFrame=C,G.endFrame=D,G.exposures.set(C,M);else{const P=Array.from(G.exposures.keys()).sort((F,$)=>F-$);if(P.length>0&&(G.startFrame=Math.min(G.startFrame,P[0]),m>P[P.length-1])){const F=P[P.length-1];G.endFrame=Math.max(F,m-1)}const k={id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:C,endFrame:D,exposures:new Map([[C,M]])};_.clips.push(k)}return _.clips.sort((P,k)=>P.startFrame-k.startFrame),Yt(_),w.currentFrame=C,h(),f(),!0},resizeCelSpan(u,m,S,y,g="ripple"){const{tracks:w,settings:_}=a(),M=w.find(X=>X.id===u);if(!M)return!1;const C=M.clips.find(X=>X.exposures.has(m));if(!C)return!1;const D=Array.from(C.exposures.entries()).sort((X,N)=>X[0]-N[0]),G=D.findIndex(([X])=>X===m);if(G===-1)return!1;const[P,k]=D[G],F=D[G+1],$=G>0?D[G-1]:void 0,ee=F?F[0]-1:C.endFrame;if(S==="right"){const X=Math.max(P,Math.round(y)),N=X-ee;if(N===0)return!1;if(X>_.totalFrames&&T.setTotalFrames(X,!0),!F)C.endFrame=Math.max(P,X),C.endFrame>_.totalFrames&&T.setTotalFrames(C.endFrame,!0);else if(g==="ripple"){const q=new Map;for(let U=0;U<=G;U++)q.set(D[U][0],D[U][1]);for(let U=G+1;U<D.length;U++){const H=Math.max(P+(U-G),D[U][0]+N);q.set(H,D[U][1]),H>C.endFrame&&(C.endFrame=H)}C.endFrame>_.totalFrames&&T.setTotalFrames(C.endFrame,!0),C.exposures=q}else{const q=X+1;C.exposures.delete(F[0]),q<=C.endFrame&&C.exposures.set(q,F[1])}}else{const X=$?$[0]+1:1,q=Math.max(X,Math.min(ee,Math.round(y)));if(q===P)return!1;q<C.startFrame&&(C.startFrame=q),C.exposures.delete(P),C.exposures.set(q,k)}return Yt(M),h(),f(),!0},resizeClip(u,m,S,y){const{tracks:g,settings:w}=a(),_=g.find(G=>G.id===u);if(!_)return!1;const M=_.clips.find(G=>G.id===m);if(!M)return!1;const C=Math.max(1,Math.round(S)),D=Math.max(C,Math.round(y));if(D>w.totalFrames&&T.setTotalFrames(D,!0),C!==M.startFrame&&M.exposures.has(M.startFrame)&&!M.exposures.has(C)){const G=M.exposures.get(M.startFrame);M.exposures.delete(M.startFrame),M.exposures.set(C,G)}return M.startFrame=C,M.endFrame=D,Yt(_),h(),f(),!0},splitClip(u,m){const{tracks:S}=a(),y=S.find(C=>C.id===u);if(!y)return!1;const g=y.clips.find(C=>m>C.startFrame&&m<=C.endFrame);if(!g)return!1;const w=T.getActiveCelForFrame(u,m),_=new Map;for(const[C,D]of Array.from(g.exposures.entries()))C>=m&&(_.set(C,D),g.exposures.delete(C));!_.has(m)&&w&&_.set(m,w.id);const M={id:`clip-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,startFrame:m,endFrame:g.endFrame,exposures:_};return g.endFrame=m-1,y.clips.push(M),Yt(y),f(),!0},removeExposure(u,m){const{tracks:S}=a(),y=S.find(g=>g.id===u);if(y){for(const g of y.clips)g.exposures.delete(m);Yt(y),h(),f()}},getCelsInTrack(u){const{tracks:m}=a(),S=m.find(y=>y.id===u);return S?n.layers.filter(y=>y.parentId===S.folderId):[]},deleteCelLayer(u,m){const{tracks:S}=a();if(!S.find(w=>w.id===u))return!1;for(const w of s)for(const _ of w.tracks){for(const M of _.clips)for(const[C,D]of Array.from(M.exposures.entries()))D===m&&M.exposures.delete(C);Yt(_)}const g=n.deleteLayer(m);return h(),f(),g},batchSpecifyCels(u,m=2){const{tracks:S,settings:y}=a(),g=S.find(G=>G.id===u);if(!g)return;const w=n.layers.filter(G=>G.parentId===g.folderId);if(w.length===0)return;const _=Math.max(1,Math.round(m)),M=(w.length-1)*_+_;M>y.totalFrames&&T.setTotalFrames(M,!0);const C=lr(y.totalFrames);let D=1;for(const G of w){if(D>y.totalFrames)break;C.exposures.set(D,G.id),D+=_}g.clips=[C],Yt(g),h(),f()},toggleTrackKeyframes(u,m){const{tracks:S,settings:y}=a(),g=S.find(w=>w.id===u);g&&(g.keyframesEnabled=m!==void 0?m:!g.keyframesEnabled,g.keyframesEnabled&&g.keyframes.size===0&&g.keyframes.set(y.currentFrame,{frame:y.currentFrame,x:0,y:0,scaleX:1,scaleY:1,rotation:0,opacity:1,interpolation:"smooth"}),f())},addOrUpdateKeyframe(u,m,S){const{tracks:y,settings:g}=a(),w=y.find(G=>G.id===u);if(!w)return null;w.keyframesEnabled=!0;const _=Math.max(1,Math.min(g.totalFrames,Math.round(m))),M=w.keyframes.get(_);if(M)return S&&Object.assign(M,S),f(),M;const C=T.getInterpolatedTransform(u,_),D={frame:_,x:(S==null?void 0:S.x)??C.x,y:(S==null?void 0:S.y)??C.y,scaleX:(S==null?void 0:S.scaleX)??C.scaleX,scaleY:(S==null?void 0:S.scaleY)??C.scaleY,rotation:(S==null?void 0:S.rotation)??C.rotation,opacity:(S==null?void 0:S.opacity)??C.opacity,interpolation:(S==null?void 0:S.interpolation)??"smooth"};return w.keyframes.set(_,D),f(),D},moveKeyframe(u,m,S){const{tracks:y,settings:g}=a(),w=y.find(C=>C.id===u);if(!w)return!1;const _=w.keyframes.get(m);if(!_)return!1;const M=Math.max(1,Math.min(g.totalFrames,Math.round(S)));return M===m?!1:(w.keyframes.delete(m),_.frame=M,w.keyframes.set(M,_),f(),!0)},deleteKeyframe(u,m){const{tracks:S}=a(),y=S.find(w=>w.id===u);if(!y)return!1;const g=y.keyframes.delete(m);return g&&f(),g},setKeyframeInterpolation(u,m,S){const{tracks:y}=a(),g=y.find(_=>_.id===u);if(!g)return;const w=g.keyframes.get(m);w&&(w.interpolation=S,f())},getInterpolatedTransform(u,m){const{tracks:S}=a(),y=S.find(D=>D.id===u);if(!y||!y.keyframesEnabled||y.keyframes.size===0)return{...Tg};const g=Array.from(y.keyframes.values()).sort((D,G)=>D.frame-G.frame);if(m<=g[0].frame){const D=g[0];return{x:D.x,y:D.y,scaleX:D.scaleX,scaleY:D.scaleY,rotation:D.rotation,opacity:D.opacity}}if(m>=g[g.length-1].frame){const D=g[g.length-1];return{x:D.x,y:D.y,scaleX:D.scaleX,scaleY:D.scaleY,rotation:D.rotation,opacity:D.opacity}}let w=g[0],_=g[1];for(let D=0;D<g.length-1;D++)if(m>=g[D].frame&&m<=g[D+1].frame){w=g[D],_=g[D+1];break}if(w.interpolation==="hold"||w.frame===_.frame)return{x:w.x,y:w.y,scaleX:w.scaleX,scaleY:w.scaleY,rotation:w.rotation,opacity:w.opacity};const M=(m-w.frame)/(_.frame-w.frame),C=w.interpolation==="smooth"?M*M*(3-2*M):M;return{x:w.x+(_.x-w.x)*C,y:w.y+(_.y-w.y)*C,scaleX:w.scaleX+(_.scaleX-w.scaleX)*C,scaleY:w.scaleY+(_.scaleY-w.scaleY)*C,rotation:w.rotation+(_.rotation-w.rotation)*C,opacity:w.opacity+(_.opacity-w.opacity)*C}},selectBone(u){i!==u&&(i=u,f())},createBoneFromWorld(u,m,S,y,g,w){const _=a(),M=Ii(_.bones),C=g!==void 0?g:i&&_.bones.some(H=>H.id===i)?i:null,D=C?M.get(C):void 0,G=S-u,P=y-m,k=Math.max(18,Math.hypot(G,P)),F=Math.atan2(P,G)*180/Math.PI;let $=u,ee=m,X=F;if(D){const H=mi(D.bindInverseMatrix,u,m);$=H.x,ee=H.y,X=Ni(F-D.bindWorldAngleDeg)}const N=`bone-${Date.now()}-${t++}`,q=Hl[_.bones.length%Hl.length],U={id:N,name:(w==null?void 0:w.trim())||`Hueso ${_.bones.length+1}`,parentId:C,restX:$,restY:ee,restRotation:X,length:k,color:q,ikBendPositive:!0};return _.bones.push(U),i=U.id,f(),U},updateBoneEndpointWorld(u,m,S){const y=a(),g=y.bones.find(k=>k.id===u);if(!g)return;const w=Ii(y.bones),_=w.get(u);if(!_)return;const M=m-_.bindHeadX,C=S-_.bindHeadY,D=Math.max(12,Math.hypot(M,C)),G=Math.atan2(C,M)*180/Math.PI,P=g.parentId?w.get(g.parentId):void 0;g.length=D,g.restRotation=P?Ni(G-P.bindWorldAngleDeg):G,f()},moveBoneHeadWorld(u,m,S){const y=a(),g=y.bones.find(M=>M.id===u);if(!g)return;const w=Ii(y.bones),_=g.parentId?w.get(g.parentId):void 0;if(_){const M=mi(_.bindInverseMatrix,m,S);g.restX=M.x,g.restY=M.y}else g.restX=m,g.restY=S;f()},renameBone(u,m){const y=a().bones.find(w=>w.id===u),g=m.trim();y&&g&&(y.name=g,f())},setBoneParent(u,m){const S=a(),y=S.bones.find(C=>C.id===u);if(!y||y.id===m)return;let g=m?S.bones.find(C=>C.id===m):void 0;for(;g;){if(g.id===y.id)return;g=g.parentId?S.bones.find(C=>C.id===g.parentId):void 0}const w=Ii(S.bones),_=w.get(y.id);if(!_)return;const M=m?w.get(m):void 0;if(M){const C=mi(M.bindInverseMatrix,_.bindHeadX,_.bindHeadY);y.restX=C.x,y.restY=C.y,y.restRotation=Ni(_.bindWorldAngleDeg-M.bindWorldAngleDeg)}else y.restX=_.bindHeadX,y.restY=_.bindHeadY,y.restRotation=_.bindWorldAngleDeg;y.parentId=m,f()},toggleBoneIKBend(u){const S=a().bones.find(y=>y.id===u);S&&(S.ikBendPositive=S.ikBendPositive===!1,f())},deleteBone(u){var w;const m=a(),S=m.bones.findIndex(_=>_.id===u);if(S===-1)return!1;const y=m.bones[S],g=m.bones.filter(_=>_.parentId===u);for(const _ of g)T.setBoneParent(_.id,y.parentId);m.bones.splice(S,1);for(const _ of m.boneKeyframes.values())_.poses.delete(u);for(const _ of n.layers)_.boundBoneId===u&&(_.boundBoneId=null);return i===u&&(i=((w=m.bones[0])==null?void 0:w.id)??null),f(),!0},createHumanoidPreset(u,m){const S=a();S.bones=[],S.boneKeyframes.clear();const y=T.createBoneFromWorld(u,m+40,u,m-60,null,"Torso"),g=T.createBoneFromWorld(u,m-60,u,m-135,y.id,"Cabeza"),w=T.createBoneFromWorld(u-10,m-50,u-85,m-10,y.id,"Brazo Izq");T.createBoneFromWorld(u-85,m-10,u-145,m+35,w.id,"Antebrazo Izq");const _=T.createBoneFromWorld(u+10,m-50,u+85,m-10,y.id,"Brazo Der");T.createBoneFromWorld(u+85,m-10,u+145,m+35,_.id,"Antebrazo Der");const M=T.createBoneFromWorld(u-18,m+40,u-30,m+135,y.id,"Muslo Izq");T.createBoneFromWorld(u-30,m+135,u-35,m+230,M.id,"Pierna Izq");const C=T.createBoneFromWorld(u+18,m+40,u+30,m+135,y.id,"Muslo Der");T.createBoneFromWorld(u+30,m+135,u+35,m+230,C.id,"Pierna Der"),i=g.id,T.addOrUpdateBoneKeyframe(1,"smooth"),f()},setBonePoseAtFrame(u,m,S,y="smooth"){const g=a(),w=Math.max(1,Math.min(g.settings.totalFrames,Math.round(u)));let _=g.boneKeyframes.get(w);if(!_){const C=T.getInterpolatedBonePoses(w);_={frame:w,interpolation:y,poses:C},g.boneKeyframes.set(w,_)}const M=_.poses.get(m)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1};_.poses.set(m,{...M,...S}),f()},applyTwoBoneIKAtFrame(u,m,S,y){const g=a(),w=Math.max(1,Math.min(g.settings.totalFrames,Math.round(u))),_=T.getInterpolatedBonePoses(w),M=bg(g.bones,_,m,S,y);let C=g.boneKeyframes.get(w);C?C.poses=M:(C={frame:w,interpolation:"smooth",poses:M},g.boneKeyframes.set(w,C)),f()},addOrUpdateBoneKeyframe(u,m="smooth"){const S=a(),y=Math.max(1,Math.min(S.settings.totalFrames,Math.round(u)));let g=S.boneKeyframes.get(y);if(g)return g.interpolation=m,f(),g;const w=T.getInterpolatedBonePoses(y);for(const _ of S.bones)w.has(_.id)||w.set(_.id,{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1});return g={frame:y,interpolation:m,poses:w},S.boneKeyframes.set(y,g),f(),g},moveBoneKeyframe(u,m){const S=a(),y=S.boneKeyframes.get(u);if(!y)return!1;const g=Math.max(1,Math.min(S.settings.totalFrames,Math.round(m)));return g===u?!1:(S.boneKeyframes.delete(u),y.frame=g,S.boneKeyframes.set(g,y),f(),!0)},deleteBoneKeyframe(u){const S=a().boneKeyframes.delete(u);return S&&f(),S},resetBonePoseAtFrame(u,m){const S=a(),y=S.boneKeyframes.get(u);if(y){if(m)y.poses.set(m,{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1});else for(const g of S.bones)y.poses.set(g.id,{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1});f()}},getInterpolatedBonePoses(u){const m=a(),S=new Map;if(m.bones.length===0||m.boneKeyframes.size===0)return S;const y=Array.from(m.boneKeyframes.values()).sort((C,D)=>C.frame-D.frame);if(u<=y[0].frame){for(const[C,D]of y[0].poses.entries())S.set(C,{...D});return S}if(u>=y[y.length-1].frame){for(const[C,D]of y[y.length-1].poses.entries())S.set(C,{...D});return S}let g=y[0],w=y[1];for(let C=0;C<y.length-1;C++)if(u>=y[C].frame&&u<=y[C+1].frame){g=y[C],w=y[C+1];break}if(g.interpolation==="hold"||g.frame===w.frame){for(const[C,D]of g.poses.entries())S.set(C,{...D});return S}const _=(u-g.frame)/(w.frame-g.frame),M=g.interpolation==="smooth"?_*_*(3-2*_):_;for(const C of m.bones){const D=g.poses.get(C.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1},G=w.poses.get(C.id)??{dX:0,dY:0,dRotation:0,scaleX:1,scaleY:1},P=Ni(G.dRotation-D.dRotation);S.set(C.id,{dX:D.dX+(G.dX-D.dX)*M,dY:D.dY+(G.dY-D.dY)*M,dRotation:D.dRotation+P*M,scaleX:D.scaleX+(G.scaleX-D.scaleX)*M,scaleY:D.scaleY+(G.scaleY-D.scaleY)*M})}return S},getEvaluatedBones(u){const m=a(),S=u??m.settings.currentFrame,y=T.getInterpolatedBonePoses(S);return Ii(m.bones,y)},hitTestBoneAtWorld(u,m,S){const y=a();if(y.bones.length===0)return null;const g=T.getEvaluatedBones(S),w=14;for(let _=y.bones.length-1;_>=0;_--){const M=y.bones[_],C=g.get(M.id);if(C&&Math.hypot(u-C.tailX,m-C.tailY)<=w)return{bone:M,part:"tail",evalBone:C}}for(let _=y.bones.length-1;_>=0;_--){const M=y.bones[_],C=g.get(M.id);if(C&&Math.hypot(u-C.headX,m-C.headY)<=w)return{bone:M,part:"head",evalBone:C}}for(let _=y.bones.length-1;_>=0;_--){const M=y.bones[_],C=g.get(M.id);if(!C)continue;if(Gc(u,m,C.headX,C.headY,C.tailX,C.tailY)<=12)return{bone:M,part:"body",evalBone:C}}return null},setOnionSkin(u){Object.assign(l,u),f()},toggleOnionSkin(u){l.enabled=u!==void 0?u:!l.enabled,f()},getOnionSkinTransform(u){let m=l.transforms.get(u);return m||(m=c(),l.transforms.set(u,m)),m},updateOnionSkinTransform(u,m){const S=T.getOnionSkinTransform(u);Object.assign(S,m);const y=l.customReferences.find(g=>g.celId===u);y&&(y.transform=S),f()},resetOnionSkinTransform(u){const m=c();l.transforms.set(u,m);const S=l.customReferences.find(y=>y.celId===u);S&&(S.transform=m),f()},addCustomOnionReference(u,m){const S=n.layers.find(D=>D.id===u);if(!S)return null;const y=l.customReferences.find(D=>D.celId===u);if(y)return y.visible=!0,l.activeReferenceCelId=u,f(),y;const g=a();let w,_=g.settings.currentFrame;for(const D of g.tracks){for(const[G,P]of D.exposures.entries())if(P===u){w=D,_=G;break}if(w)break}const M=T.getOnionSkinTransform(u),C={id:`ref-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,celId:S.id,name:m||S.name,trackId:w?w.id:"",trackName:w?w.name:"Pista",frame:_,visible:!0,opacity:l.startOpacity,colorMode:"monochrome",tintColor:"#ffd43b",transform:M};return l.customReferences.push(C),l.activeReferenceCelId=u,f(),C},removeCustomOnionReference(u){const m=l.customReferences.findIndex(S=>S.id===u||S.celId===u);if(m!==-1){const S=l.customReferences.splice(m,1)[0];l.activeReferenceCelId===S.celId&&(l.activeReferenceCelId=l.customReferences.length>0?l.customReferences[0].celId:null),f()}},updateCustomOnionReference(u,m){const S=l.customReferences.find(y=>y.id===u||y.celId===u);S&&(Object.assign(S,m),m.transform&&l.transforms.set(S.celId,S.transform),f())},setActiveReferenceCel(u){l.activeReferenceCelId=u,f()},getActiveCelForFrame(u,m){const{tracks:S}=a(),y=S.find(M=>M.id===u);if(!y)return;const g=y.clips.find(M=>m>=M.startFrame&&m<=M.endFrame);if(!g)return;let w,_=-1;for(const[M,C]of g.exposures.entries())M>=g.startFrame&&M<=m&&M>_&&(_=M,w=C);if(w)return n.layers.find(M=>M.id===w)},getOnionSkinCels(u,m){if(!l.enabled)return[];const{tracks:S,settings:y}=a(),g=S.find(k=>k.id===u);if(!g||!g.visible)return[];const w=T.getActiveCelForFrame(u,m),_=w?w.id:null,M=[];let C=0;const D=new Set;_&&D.add(_);for(let k=m-1;k>=1&&!(C>=l.prevFrames);k--){const F=T.getActiveCelForFrame(u,k);if(F&&!D.has(F.id)){D.add(F.id),C++;const $=Math.max(.05,l.startOpacity-(C-1)*l.stepOpacity);M.push({layer:F,isPrev:!0,distance:C,opacity:$,tintColor:l.prevColor,transform:T.getInterpolatedTransform(u,k),onionTransform:T.getOnionSkinTransform(F.id)})}}let G=0;const P=new Set;_&&P.add(_);for(let k=m+1;k<=y.totalFrames&&!(G>=l.nextFrames);k++){const F=T.getActiveCelForFrame(u,k);if(F&&!P.has(F.id)){P.add(F.id),G++;const $=Math.max(.05,l.startOpacity-(G-1)*l.stepOpacity);M.push({layer:F,isPrev:!1,distance:G,opacity:$,tintColor:l.nextColor,transform:T.getInterpolatedTransform(u,k),onionTransform:T.getOnionSkinTransform(F.id)})}}for(const k of l.customReferences){if(!k.visible)continue;const F=n.layers.find($=>$.id===k.celId);F&&F.id!==_&&!M.some($=>$.layer.id===F.id)&&M.push({layer:F,isPrev:!0,distance:0,opacity:k.opacity??l.startOpacity,tintColor:k.tintColor??"#ffd43b",onionTransform:T.getOnionSkinTransform(F.id)})}return M},isLayerVisibleAtFrame(u,m){if(!u.visible)return!1;let S;if(u.parentId&&(S=n.layers.find(y=>y.id===u.parentId)),S&&S.isAnimationFolder){const y=T.getActiveCelForFrame(S.id,m);return y?u.id===y.id?!0:u.parentId===y.id:!1}return!0},getLayerTransformAtFrame(u,m){let S;if(u.parentId&&(S=n.layers.find(y=>y.id===u.parentId)),S&&S.isAnimationFolder){const{tracks:y}=a(),g=y.find(w=>w.folderId===S.id);if(g&&g.keyframesEnabled&&g.keyframes.size>0)return T.getInterpolatedTransform(g.id,m)}return null},get lightTable(){return{get enabled(){return l.enabled},set enabled(u){l.enabled=u},get activeRegistrationId(){return l.activeReferenceCelId??null},set activeRegistrationId(u){l.activeReferenceCelId=u},get registrations(){return l.customReferences}}},toggleLightTable(u){T.toggleOnionSkin(u)},registerCelToLightTable(u,m){return T.addCustomOnionReference(u,m)},registerPrevCelToLightTable(u){const m=a(),S=u?m.tracks.find(C=>C.id===u):m.tracks[0];if(!S)return null;const y=m.settings.currentFrame,w=[...Array.from(S.exposures.keys()).sort((C,D)=>C-D)].reverse().find(C=>C<y);if(w===void 0)return null;const _=S.exposures.get(w);if(!_)return null;const M=T.addCustomOnionReference(_);return M&&(M.tintColor="#38bdf8",M.colorMode="monochrome"),M},registerNextCelToLightTable(u){const m=a(),S=u?m.tracks.find(C=>C.id===u):m.tracks[0];if(!S)return null;const y=m.settings.currentFrame,w=Array.from(S.exposures.keys()).sort((C,D)=>C-D).find(C=>C>y);if(w===void 0)return null;const _=S.exposures.get(w);if(!_)return null;const M=T.addCustomOnionReference(_);return M&&(M.tintColor="#4ade80",M.colorMode="monochrome"),M},unregisterLightTable(u){T.removeCustomOnionReference(u)},updateLightTableRegistration(u,m){T.updateCustomOnionReference(u,m)},updateLightTableTransform(u,m){const S=l.customReferences.find(y=>y.id===u||y.celId===u);S&&T.updateOnionSkinTransform(S.celId,m)},resetLightTableTransform(u){const m=l.customReferences.find(S=>S.id===u||S.celId===u);m&&T.resetOnionSkinTransform(m.celId)},setActiveLightTableRegistration(u){T.setActiveReferenceCel(u)},getLightTableRegistrations(){return l.customReferences},subscribe(u){return d.add(u),()=>{d.delete(u)}}};return p(),T}let at=24;const Gl=10,Vl=64;function Cg(n,e,t="frames"){if(t==="frames")return String(n);const i=n-1,r=Math.floor(i/e),s=i%e+1;if(t==="sec_frames")return`${r}s+${s}f`;const o=Math.floor(r/60),a=r%60;return`${String(o).padStart(2,"0")}:${String(a).padStart(2,"0")}:${String(s-1).padStart(2,"0")}`}function Ag(n,e,t){var Fe;n.innerHTML="";const i=document.createElement("div");i.className="timeline-panel",i.style.setProperty("--cell-width",`${at}px`);const r=document.createElement("div");r.className="csp-timeline-height-resizer",r.title="Arrastrar para cambiar la altura de la línea de tiempo";const s=localStorage.getItem("oniri.timeline.height");if(s){const j=Math.max(90,Math.min(600,Number(s)));document.documentElement.style.setProperty("--timeline-height",`${j}px`)}let o=!1,a=0,c=190;r.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),o=!0,a=j.clientY,c=i.offsetHeight,r.classList.add("dragging"),r.setPointerCapture(j.pointerId)}),r.addEventListener("pointermove",j=>{if(!o)return;const Se=j.clientY-a,He=Math.max(90,Math.min(600,c-Se));document.documentElement.style.setProperty("--timeline-height",`${He}px`),localStorage.setItem("oniri.timeline.height",String(He))});const l=j=>{if(o){o=!1,r.classList.remove("dragging");try{r.releasePointerCapture(j.pointerId)}catch{}}};r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),i.appendChild(r);let d=((Fe=e.tracks[0])==null?void 0:Fe.id)??null,f=null,v=null;function x(){const j=e.tracks.find(Se=>Se.id===d);if(j)return j;if(e.tracks.length>0)return d=e.tracks[0].id,e.tracks[0]}function b(j){at=Math.max(Gl,Math.min(Vl,Math.round(j))),i.style.setProperty("--cell-width",`${at}px`),f&&(f.value=String(at)),v&&(v.textContent=`${at}px`),Oe()}const E=document.createElement("div");E.className="timeline-header";const h=document.createElement("div");h.className="timeline-transport-group";const p=document.createElement("button");p.className="timeline-btn icon-only",p.title="Minimizar / Expandir Línea de Tiempo",p.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,p.addEventListener("click",()=>{i.classList.toggle("collapsed");const j=i.classList.contains("collapsed");p.innerHTML=j?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'}),h.appendChild(p);const T=document.createElement("div");T.className="timeline-scene-group";const u=document.createElement("select");u.className="timeline-select scene-select",u.title="Seleccionar Escena de Animación (Clip Studio Paint Multi-Timeline)",u.addEventListener("change",()=>{e.switchScene(u.value)}),T.appendChild(u);const m=document.createElement("button");m.className="timeline-btn icon-only",m.title="Edición de Escena (Gestionar, Crear nueva, Duplicar, Renombrar, Eliminar)",m.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
      <line x1="7" y1="4" x2="5" y2="9"/>
      <line x1="12" y1="4" x2="10" y2="9"/>
      <line x1="17" y1="4" x2="15" y2="9"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  `,m.addEventListener("click",()=>{Lg(e)}),T.appendChild(m),h.appendChild(T);const S=document.createElement("div");S.className="timeline-separator",h.appendChild(S);const y=document.createElement("button");y.className="timeline-btn icon-only",y.title="Primer fotograma (Shift+Izquierda)",y.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
    </svg>
  `,y.addEventListener("click",()=>e.firstFrame()),h.appendChild(y);const g=document.createElement("button");g.className="timeline-btn icon-only",g.title="Celda anterior (Atajo: [)",g.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="5" width="2.5" height="14" rx="0.5"/>
      <polygon points="20 6 9 12 20 18"/>
    </svg>
  `,g.addEventListener("click",()=>e.prevCel(d??void 0)),h.appendChild(g);const w=document.createElement("button");w.className="timeline-btn icon-only",w.title="Fotograma anterior (Flecha Izquierda)",w.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `,w.addEventListener("click",()=>e.prevFrame()),h.appendChild(w);const _=document.createElement("button");_.className="timeline-btn play-btn icon-only",_.title="Reproducir / Pausa (Enter)",_.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  `,_.addEventListener("click",()=>e.togglePlay()),h.appendChild(_);const M=document.createElement("button");M.className="timeline-btn icon-only",M.title="Fotograma siguiente (Flecha Derecha)",M.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  `,M.addEventListener("click",()=>e.nextFrame()),h.appendChild(M);const C=document.createElement("button");C.className="timeline-btn icon-only",C.title="Celda siguiente (Atajo: ])",C.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="4 6 15 12 4 18"/>
      <rect x="17.5" y="5" width="2.5" height="14" rx="0.5"/>
    </svg>
  `,C.addEventListener("click",()=>e.nextCel(d??void 0)),h.appendChild(C);const D=document.createElement("button");D.className="timeline-btn icon-only",D.title="Último fotograma (Shift+Derecha)",D.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  `,D.addEventListener("click",()=>e.lastFrame()),h.appendChild(D);const G=document.createElement("button");G.className=`timeline-btn icon-only ${e.settings.loop?"active":""}`,G.title="Repetir en bucle",G.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  `,G.addEventListener("click",()=>{e.setLoop(!e.settings.loop)}),h.appendChild(G);const P=document.createElement("div");P.className="timeline-separator",h.appendChild(P);const k=document.createElement("button");k.className="timeline-frame-counter",k.title="Fotograma actual / Total. Clic para abrir Edición de Línea de Tiempo",k.addEventListener("click",()=>{Wl(e)}),h.appendChild(k);const F=document.createElement("button");F.className="timeline-btn icon-only",F.title="Edición de Línea de Tiempo (Cantidad de fotogramas, FPS, Rango In/Out, División)",F.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `,F.addEventListener("click",()=>{Wl(e)}),h.appendChild(F),E.appendChild(h);const $=document.createElement("div");$.className="timeline-actions-group";const ee=document.createElement("button");ee.className="timeline-btn icon-only",ee.title="Nueva Carpeta de Animación (Pista)",ee.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  `,ee.addEventListener("click",()=>{d=e.createTrack().id,Oe()}),$.appendChild(ee);const X=document.createElement("button");X.className="timeline-btn icon-only",X.title="Nueva Celda de Animación en el fotograma actual",X.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="12" x2="12" y2="18"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `,X.addEventListener("click",()=>{const j=x();e.createCel(j==null?void 0:j.id,e.settings.currentFrame)}),$.appendChild(X);const N=document.createElement("button");N.className="timeline-btn icon-only",N.title="Eliminar especificación de celda en fotograma actual",N.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `,N.addEventListener("click",()=>{const j=x();j&&e.removeExposure(j.id,e.settings.currentFrame)}),$.appendChild(N);const q=document.createElement("div");q.className="timeline-separator",$.appendChild(q);const U=document.createElement("button");U.className="timeline-btn icon-only",U.title="Activar / Desactivar fotogramas clave en esta pista (CSP Enable Keyframes)",U.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffd43b" stroke-width="2.2">
      <polygon points="12 2 22 12 12 22 2 12 12 2"/>
    </svg>
  `,U.addEventListener("click",()=>{const j=x();j&&e.toggleTrackKeyframes(j.id)}),$.appendChild(U);const H=document.createElement("button");H.className="timeline-btn icon-only",H.title="Añadir / Editar Keyframe en el fotograma actual (Atajo: K)",H.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffd43b" stroke="#ffd43b" stroke-width="1.5">
      <polygon points="12 3 21 12 12 21 3 12 12 3"/>
    </svg>
  `,H.addEventListener("click",()=>{const j=x();if(!j)return;const Se=e.settings.currentFrame;j.keyframes.has(Se)||e.addOrUpdateKeyframe(j.id,Se),Ds(e,j,Se)}),$.appendChild(H);const I=document.createElement("select");I.className="timeline-select interp-select-compact",I.title="Interpolación del Keyframe (Suave / Lineal / Fijo)",I.innerHTML=`
    <option value="smooth">◆ Suave</option>
    <option value="linear">◇ Lineal</option>
    <option value="hold">■ Fijo</option>
  `,I.addEventListener("change",()=>{const j=x();if(!j)return;const Se=e.settings.currentFrame,He=I.value;j.keyframes.has(Se)?e.setKeyframeInterpolation(j.id,Se,He):e.addOrUpdateKeyframe(j.id,Se,{interpolation:He})}),$.appendChild(I);const B=document.createElement("button");B.className="timeline-btn icon-only",B.title="Esqueleto 2D / Pose Keyframe (Crear esqueleto o registrar pose en este fotograma)",B.innerHTML='<span style="font-size:13px; line-height:1;">🦴</span>',B.addEventListener("click",()=>{e.bones.length===0?e.createHumanoidPreset(800,450):e.addOrUpdateBoneKeyframe(e.settings.currentFrame,I.value)}),$.appendChild(B);const V=document.createElement("div");V.className="timeline-separator",$.appendChild(V);const Y=document.createElement("button");Y.className=`timeline-btn icon-only ${e.onionSkin.enabled?"active":""}`,Y.title="Activar / Desactivar Papel Cebolla (Atajo: O)",Y.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1"/>
    </svg>
  `,Y.addEventListener("click",()=>{e.toggleOnionSkin()}),$.appendChild(Y);const se=document.createElement("button");se.className="timeline-btn icon-only",se.title="Ajustes de Papel Cebolla",se.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  `,se.addEventListener("click",()=>{Rg(e)}),$.appendChild(se);const ue=document.createElement("div");ue.className="timeline-separator",$.appendChild(ue);const be=document.createElement("div");be.className="timeline-zoom-group",be.title="Zoom de ancho de fotogramas (Ctrl + Rueda)";const ne=document.createElement("button");ne.className="timeline-btn icon-only",ne.title="Reducir ancho de fotograma",ne.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `,ne.addEventListener("click",()=>b(at-3)),f=document.createElement("input"),f.type="range",f.className="timeline-zoom-slider",f.min=String(Gl),f.max=String(Vl),f.value=String(at),f.title="Ajustar tamaño visual de las celdas en la línea de tiempo",f.addEventListener("input",()=>{b(Number(f.value))});const W=document.createElement("button");W.className="timeline-btn icon-only",W.title="Aumentar ancho de fotograma",W.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `,W.addEventListener("click",()=>b(at+3)),v=document.createElement("span"),v.className="timeline-zoom-label",v.textContent=`${at}px`,be.append(ne,f,W,v),$.appendChild(be),E.appendChild($),i.appendChild(E);const Ce=document.createElement("div");Ce.className="timeline-body";const oe=document.createElement("div");oe.className="timeline-tracks-header-col";const Ae=document.createElement("div");Ae.className="timeline-tracks-corner",Ae.innerHTML="<span>Pistas / Keyframes</span>",oe.appendChild(Ae);const ge=document.createElement("div");ge.className="timeline-track-headers-list",oe.appendChild(ge),Ce.appendChild(oe);const Ve=document.createElement("div");Ve.className="csp-timeline-track-splitter",Ve.title="Arrastrar para cambiar el ancho de la columna de pistas";const Ue=localStorage.getItem("oniri.timeline.tracks-width");if(Ue){const j=Math.max(120,Math.min(380,Number(Ue)));document.documentElement.style.setProperty("--timeline-tracks-width",`${j}px`)}let L=!1,A=0,J=180;Ve.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),L=!0,A=j.clientX,J=oe.offsetWidth,Ve.classList.add("dragging"),Ve.setPointerCapture(j.pointerId)}),Ve.addEventListener("pointermove",j=>{if(!L)return;const Se=j.clientX-A,He=Math.max(120,Math.min(380,J+Se));document.documentElement.style.setProperty("--timeline-tracks-width",`${He}px`),localStorage.setItem("oniri.timeline.tracks-width",String(He))});const de=j=>{if(L){L=!1,Ve.classList.remove("dragging");try{Ve.releasePointerCapture(j.pointerId)}catch{}}};Ve.addEventListener("pointerup",de),Ve.addEventListener("pointercancel",de),Ce.appendChild(Ve);const ce=document.createElement("div");ce.className="timeline-grid-container";const le=document.createElement("div");le.className="timeline-grid-content",ce.appendChild(le),Ce.appendChild(ce),i.style.pointerEvents="auto",i.appendChild(Ce),n.appendChild(i);let ke=!1;function xe(j,Se=!1){const He=ce.getBoundingClientRect(),Le=j-He.left+ce.scrollLeft,ae=Math.floor(Le/at)+1;return Se?Math.max(1,Math.min(2e3,ae)):Math.max(1,Math.min(e.settings.totalFrames,ae))}function Ne(j){e.goToFrame(xe(j.clientX,!1))}ce.addEventListener("mousedown",j=>{j.button===0&&(ke=!0,Ne(j))}),ce.addEventListener("wheel",j=>{if(j.ctrlKey){j.preventDefault();const Se=j.deltaY<0?2:-2;b(at+Se)}},{passive:!1}),window.addEventListener("mousemove",j=>{ke&&Ne(j)}),window.addEventListener("mouseup",()=>{ke=!1});function Oe(){const j=x();u.innerHTML="";for(const fe of e.scenes){const Pe=document.createElement("option");Pe.value=fe.id,Pe.textContent=`🎬 ${fe.name} (${fe.settings.totalFrames}f)`,fe.id===e.activeSceneId&&(Pe.selected=!0),u.appendChild(Pe)}e.settings.isPlaying?(_.classList.add("playing"),_.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      `):(_.classList.remove("playing"),_.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      `),G.classList.toggle("active",e.settings.loop),Y.classList.toggle("active",e.onionSkin.enabled),k.textContent=`${e.settings.currentFrame} / ${e.settings.totalFrames}`;const Se=!!(j!=null&&j.keyframesEnabled);U.classList.toggle("active",Se);const He=j==null?void 0:j.keyframes.get(e.settings.currentFrame);if(He&&(I.value=He.interpolation),ge.innerHTML="",e.bones.length>0){const fe=document.createElement("div");fe.className="timeline-track-header-item",fe.style.height="28px",fe.style.background="rgba(56, 189, 248, 0.08)",fe.style.borderBottom="1px solid rgba(56, 189, 248, 0.25)";const Pe=document.createElement("span");Pe.className="timeline-track-name",Pe.style.color="#38bdf8",Pe.style.fontWeight="600",Pe.textContent=`🦴 Esqueleto 2D (${e.bones.length})`,fe.appendChild(Pe);const ye=document.createElement("button");ye.className="timeline-track-kf-btn",ye.title="Restablecer pose a postura base en este fotograma",ye.textContent="↺",ye.addEventListener("click",je=>{je.stopPropagation(),e.resetBonePoseAtFrame(e.settings.currentFrame)}),fe.appendChild(ye);const Me=document.createElement("span");Me.className="timeline-track-badge",Me.textContent=`${e.boneKeyframes.size}k`,fe.appendChild(Me),ge.appendChild(fe)}for(const fe of e.tracks){const Pe=document.createElement("div");Pe.className=`timeline-track-header-item ${fe.id===d?"selected":""} ${fe.keyframesEnabled?"has-kf-lane":""}`,Pe.addEventListener("click",()=>{d=fe.id,Oe()});const ye=document.createElement("button");ye.className="timeline-track-eye-btn",ye.innerHTML=fe.visible?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/></svg>',ye.addEventListener("click",it=>{it.stopPropagation(),fe.visible=!fe.visible,t.setLayerVisibility(fe.folderId,fe.visible),Oe()}),Pe.appendChild(ye);const Me=document.createElement("span");Me.className="timeline-track-name",Me.textContent=fe.name,Pe.appendChild(Me);const je=document.createElement("button");je.className=`timeline-track-kf-btn ${fe.keyframesEnabled?"active":""}`,je.title=fe.keyframesEnabled?"Fotogramas clave activados (Clic para ocultar/desactivar)":"Activar transformación por Keyframes en esta pista",je.innerHTML=`
        <svg width="11" height="11" viewBox="0 0 24 24" fill="${fe.keyframesEnabled?"#ffd43b":"none"}" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 22 12 12 22 2 12 12 2"/>
        </svg>
      `,je.addEventListener("click",it=>{it.stopPropagation(),d=fe.id,e.toggleTrackKeyframes(fe.id)}),Pe.appendChild(je);const Be=document.createElement("span");Be.className="timeline-track-badge",Be.textContent=`${fe.exposures.size}c`,Pe.appendChild(Be),ge.appendChild(Pe)}le.innerHTML="";const Le=e.settings.totalFrames,ae=Le*at;le.style.width=`${ae+140}px`;const O=document.createElement("div");O.className="timeline-ruler",O.style.width=`${ae+140}px`;const he=e.settings.division??5,ve=e.settings.timeFormat??"frames";for(let fe=1;fe<=Le;fe++){const Pe=document.createElement("div");Pe.className="timeline-ruler-cell",(fe%he===0||fe===1)&&(Pe.classList.add("major"),Pe.textContent=Cg(fe,e.settings.fps,ve)),fe>=e.settings.startFrame&&fe<=e.settings.endFrame&&Pe.classList.add("playback-bound"),fe===e.settings.startFrame&&Pe.classList.add("range-start"),fe===e.settings.endFrame&&Pe.classList.add("range-end"),Pe.addEventListener("click",ye=>{ye.stopPropagation(),e.goToFrame(fe)}),O.appendChild(Pe)}const Ee=document.createElement("div");Ee.className="timeline-range-bracket start-bracket",Ee.title=`Inicio de reproducción (Fotograma ${e.settings.startFrame}). Arrastra para cambiar inicio.`,Ee.style.left=`${(e.settings.startFrame-1)*at}px`,pe(Ee,"start"),O.appendChild(Ee);const De=document.createElement("div");De.className="timeline-range-bracket end-bracket",De.title=`Fin de reproducción (Fotograma ${e.settings.endFrame}). Arrastra para cambiar fin.`,De.style.left=`${e.settings.endFrame*at-6}px`,pe(De,"end"),O.appendChild(De);const $e=document.createElement("div");if($e.className="timeline-total-end-handle",$e.style.left=`${ae}px`,$e.title=`Duración total: ${Le} fotogramas. Arrastra a la derecha o izquierda para aumentar/reducir la cantidad de frames de la línea de tiempo.`,$e.innerHTML=`<span class="end-handle-pill">⇔ ${Le}f</span>`,et($e),le.appendChild($e),le.appendChild(O),e.bones.length>0){const fe=document.createElement("div");fe.className="timeline-keyframe-lane",fe.style.width=`${ae}px`,fe.style.height="28px",fe.style.background="rgba(56, 189, 248, 0.05)",fe.style.borderBottom="1px solid rgba(56, 189, 248, 0.25)";for(let ye=1;ye<=Le;ye++){const Me=document.createElement("div");Me.className="timeline-kf-cell",Me.title=`Fotograma ${ye}: Doble clic para registrar Keyframe de Pose 2D`,Me.addEventListener("click",je=>{je.stopPropagation(),e.goToFrame(ye)}),Me.addEventListener("dblclick",je=>{je.stopPropagation(),e.goToFrame(ye),e.addOrUpdateBoneKeyframe(ye,I.value)}),fe.appendChild(Me)}const Pe=Array.from(e.boneKeyframes.values()).sort((ye,Me)=>ye.frame-Me.frame);for(let ye=0;ye<Pe.length-1;ye++){const Me=Pe[ye],je=Pe[ye+1];if(Me.interpolation!=="hold"){const Be=document.createElement("div");Be.className=`timeline-kf-span-line ${Me.interpolation}`,Be.style.left=`${(Me.frame-1)*at+at/2}px`,Be.style.width=`${(je.frame-Me.frame)*at}px`,Be.style.background="#38bdf8",fe.appendChild(Be)}}for(const ye of Pe){if(ye.frame>Le)continue;const Me=document.createElement("div");Me.className=`timeline-kf-diamond ${ye.interpolation} ${e.settings.currentFrame===ye.frame?"active":""}`,Me.style.left=`${(ye.frame-1)*at+at/2}px`,Me.style.borderColor="#38bdf8",Me.title=`Pose Keyframe F${ye.frame} (${ye.interpolation}) | ${ye.poses.size} huesos posados
Clic para ir al fotograma, Arrastra para mover, Clic derecho para eliminar`,Me.addEventListener("mousedown",je=>{if(je.button!==0)return;je.stopPropagation(),je.preventDefault();let Be=!1,it=ye.frame;const Ft=Jt=>{const zt=xe(Jt.clientX,!1);zt!==ye.frame&&(Be=!0),it=zt,Me.style.left=`${(zt-1)*at+at/2}px`},Lt=()=>{window.removeEventListener("mousemove",Ft),window.removeEventListener("mouseup",Lt),Be&&it!==ye.frame?(e.moveBoneKeyframe(ye.frame,it),e.goToFrame(it)):e.goToFrame(ye.frame)};window.addEventListener("mousemove",Ft),window.addEventListener("mouseup",Lt)}),Me.addEventListener("contextmenu",je=>{je.preventDefault(),je.stopPropagation(),e.deleteBoneKeyframe(ye.frame)}),fe.appendChild(Me)}le.appendChild(fe)}for(const fe of e.tracks){const Pe=document.createElement("div");Pe.className=`timeline-track-row-wrapper ${fe.keyframesEnabled?"has-kf-lane":""}`,Pe.style.width=`${ae}px`;const ye=document.createElement("div");ye.className="timeline-track-row",ye.style.width=`${ae}px`;for(let Me=1;Me<=Le;Me++){const je=document.createElement("div");je.className="timeline-frame-cell",fe.exposures.has(Me)&&je.classList.add("key-cell"),je.addEventListener("click",Be=>{Be.stopPropagation(),d=fe.id,e.goToFrame(Me)}),je.addEventListener("dblclick",Be=>{Be.stopPropagation(),d=fe.id,e.createCel(fe.id,Me)}),je.addEventListener("contextmenu",Be=>{Be.preventDefault(),Be.stopPropagation(),d=fe.id,Xl(Be.clientX,Be.clientY,fe,Me,e,t)}),ye.appendChild(je)}for(const Me of fe.clips){const je=Math.max(1,Me.startFrame),Be=Math.min(Le,Me.endFrame);if(Be<je)continue;const it=document.createElement("div");it.className="timeline-clip-container",it.style.left=`${(je-1)*at}px`,it.style.width=`${(Be-je+1)*at}px`;const Ft=document.createElement("div");Ft.className="timeline-clip-grip left",Ft.title="Arrastrar inicio del Clip",ot(Ft,fe.id,Me.id,"left",Me.startFrame,Me.endFrame),it.appendChild(Ft);const Lt=document.createElement("div");Lt.className="timeline-clip-grip right",Lt.title="Arrastrar fin del Clip (extiende la pista o la línea de tiempo)",ot(Lt,fe.id,Me.id,"right",Me.startFrame,Me.endFrame),it.appendChild(Lt),ye.appendChild(it);const Jt=Array.from(Me.exposures.entries()).filter(([zt])=>zt>=je&&zt<=Be).sort((zt,nn)=>zt[0]-nn[0]);for(let zt=0;zt<Jt.length;zt++){const[nn,ii]=Jt[zt],yi=Jt[zt+1],R=yi?Math.min(Be,yi[0]-1):Be,K=Math.max(1,R-nn+1),Q=t.layers.find(Ke=>Ke.id===ii),te=Q?Q.name:"?",Z=document.createElement("div");Z.className="timeline-cel-block",e.settings.currentFrame>=nn&&e.settings.currentFrame<=R&&Z.classList.add("active-cel"),Z.style.left=`${(nn-1)*at}px`,Z.style.width=`${K*at-2}px`;const Re=document.createElement("div");Re.className="cel-resize-handle left",Re.title="Arrastrar borde izquierdo para cambiar inicio de esta celda",tt(Re,Z,ye,fe,nn,R,"left"),Z.appendChild(Re);const ze=document.createElement("div");ze.className="timeline-cel-dot",Z.appendChild(ze);const qe=document.createElement("span");qe.className="timeline-cel-label",qe.textContent=`${te} (${K}f)`,Z.appendChild(qe);const Ye=document.createElement("div");Ye.className="cel-resize-handle right",Ye.title="Arrastrar a la derecha o izquierda para aumentar/reducir duración de la celda (Alt = sin desplazar siguientes)",tt(Ye,Z,ye,fe,nn,R,"right"),Z.appendChild(Ye),Je(Z,ye,fe,nn,K,te,Q==null?void 0:Q.id),Z.addEventListener("contextmenu",Ke=>{Ke.preventDefault(),Ke.stopPropagation(),d=fe.id;const Qe=xe(Ke.clientX,!1);Xl(Ke.clientX,Ke.clientY,fe,Qe,e,t)}),ye.appendChild(Z)}}if(Pe.appendChild(ye),fe.keyframesEnabled){const Me=document.createElement("div");Me.className="timeline-keyframe-lane",Me.style.width=`${ae}px`;for(let Be=1;Be<=Le;Be++){const it=document.createElement("div");it.className="timeline-kf-cell",it.title=`Fotograma ${Be}: Doble clic para crear/editar Keyframe`,it.addEventListener("dblclick",Ft=>{Ft.stopPropagation(),d=fe.id,e.goToFrame(Be),e.addOrUpdateKeyframe(fe.id,Be),Ds(e,fe,Be)}),Me.appendChild(it)}const je=Array.from(fe.keyframes.values()).sort((Be,it)=>Be.frame-it.frame);for(let Be=0;Be<je.length-1;Be++){const it=je[Be],Ft=je[Be+1];if(it.interpolation!=="hold"){const Lt=document.createElement("div");Lt.className=`timeline-kf-span-line ${it.interpolation}`,Lt.style.left=`${(it.frame-1)*at+at/2}px`,Lt.style.width=`${(Ft.frame-it.frame)*at}px`,Me.appendChild(Lt)}}for(const Be of je){if(Be.frame>Le)continue;const it=document.createElement("div");it.className=`timeline-kf-diamond ${Be.interpolation} ${e.settings.currentFrame===Be.frame?"active":""}`,it.style.left=`${(Be.frame-1)*at+at/2}px`,it.title=`Keyframe F${Be.frame} (${Be.interpolation}) | X:${Math.round(Be.x)} Y:${Math.round(Be.y)} Escala:${Math.round(Be.scaleX*100)}% Rot:${Math.round(Be.rotation)}° Opacidad:${Math.round(Be.opacity*100)}%
Clic para editar, Arrastra para mover, Clic derecho para eliminar`,We(it,fe,Be.frame),Me.appendChild(it)}Pe.appendChild(Me)}le.appendChild(Pe)}const nt=document.createElement("div");nt.className="timeline-playhead",nt.style.left=`${(e.settings.currentFrame-1)*at+at/2}px`;const mt=document.createElement("div");mt.className="timeline-playhead-cap",nt.appendChild(mt),le.appendChild(nt)}function et(j){j.addEventListener("mousedown",Se=>{if(Se.button!==0)return;Se.stopPropagation(),Se.preventDefault(),j.classList.add("dragging");const He=ae=>{const O=Math.max(1,xe(ae.clientX,!0));O!==e.settings.totalFrames&&e.setTotalFrames(O,!0)},Le=()=>{j.classList.remove("dragging"),window.removeEventListener("mousemove",He),window.removeEventListener("mouseup",Le)};window.addEventListener("mousemove",He),window.addEventListener("mouseup",Le)})}function pe(j,Se){j.addEventListener("mousedown",He=>{if(He.button!==0)return;He.stopPropagation(),He.preventDefault();const Le=O=>{const he=xe(O.clientX,!0);Se==="start"?e.setRange(Math.min(he,e.settings.endFrame),e.settings.endFrame):(he>e.settings.totalFrames&&e.setTotalFrames(he,!0),e.setRange(e.settings.startFrame,Math.max(he,e.settings.startFrame)))},ae=()=>{window.removeEventListener("mousemove",Le),window.removeEventListener("mouseup",ae)};window.addEventListener("mousemove",Le),window.addEventListener("mouseup",ae)})}function ot(j,Se,He,Le,ae,O){j.addEventListener("mousedown",he=>{if(he.button!==0)return;he.stopPropagation(),he.preventDefault();const ve=De=>{const $e=xe(De.clientX,!0);Le==="left"?e.resizeClip(Se,He,Math.min($e,O),O):e.resizeClip(Se,He,ae,Math.max($e,ae))},Ee=()=>{window.removeEventListener("mousemove",ve),window.removeEventListener("mouseup",Ee)};window.addEventListener("mousemove",ve),window.addEventListener("mouseup",Ee)})}function tt(j,Se,He,Le,ae,O,he){j.addEventListener("mousedown",ve=>{if(ve.button!==0)return;ve.stopPropagation(),ve.preventDefault(),Se.classList.add("resizing");let Ee=he==="right"?O:ae;const De=nt=>{var fe,Pe;const mt=xe(nt.clientX,!0);if(he==="right"){Ee=Math.max(ae,mt);const ye=Ee-ae+1;Se.style.width=`${ye*at-2}px`;const Me=Se.querySelector(".timeline-cel-label");if(Me){const je=((fe=Me.textContent)==null?void 0:fe.replace(/\s*\(\d+f\)$/,""))??"";Me.textContent=`${je} (${ye}f)`}}else{Ee=Math.max(1,Math.min(O,mt));const ye=O-Ee+1;Se.style.left=`${(Ee-1)*at}px`,Se.style.width=`${ye*at-2}px`;const Me=Se.querySelector(".timeline-cel-label");if(Me){const je=((Pe=Me.textContent)==null?void 0:Pe.replace(/\s*\(\d+f\)$/,""))??"";Me.textContent=`${je} (${ye}f)`}}He.querySelectorAll(".timeline-frame-cell").forEach((ye,Me)=>{ye.classList.toggle("drop-target",Me+1===Ee)})},$e=nt=>{window.removeEventListener("mousemove",De),window.removeEventListener("mouseup",$e),Se.classList.remove("resizing"),He.querySelectorAll(".timeline-frame-cell").forEach(fe=>fe.classList.remove("drop-target"));const mt=nt.altKey?"overwrite":"ripple";e.resizeCelSpan(Le.id,ae,he,Ee,mt)};window.addEventListener("mousemove",De),window.addEventListener("mouseup",$e)})}function Je(j,Se,He,Le,ae,O,he){let ve=0,Ee=!1,De=0,$e=Le;j.addEventListener("mousedown",nt=>{if(nt.button!==0||nt.target.classList.contains("cel-resize-handle"))return;nt.stopPropagation(),d=He.id,ve=nt.clientX,Ee=!1;const mt=xe(nt.clientX,!0);De=Math.max(0,Math.min(ae-1,mt-Le)),$e=Le;const fe=ye=>{const Me=ye.clientX-ve;if(!Ee&&Math.abs(Me)>4&&(Ee=!0,j.classList.add("dragging"),j.classList.add("moving-body")),Ee){const je=xe(ye.clientX,!0);$e=Math.max(1,je-De),j.style.left=`${($e-1)*at}px`,j.style.width=`${ae*at-2}px`;const Be=j.querySelector(".timeline-cel-label");Be&&(Be.textContent=`${O} (${ae}f) → F${$e}`);const it=$e+ae-1;Se.querySelectorAll(".timeline-frame-cell").forEach((Ft,Lt)=>{const Jt=Lt+1;Ft.classList.toggle("drop-target",Jt>=$e&&Jt<=it)})}},Pe=()=>{if(window.removeEventListener("mousemove",fe),window.removeEventListener("mouseup",Pe),Se.querySelectorAll(".timeline-frame-cell").forEach(ye=>ye.classList.remove("drop-target")),Ee)if(j.classList.remove("dragging"),j.classList.remove("moving-body"),$e!==Le)e.moveCelSpan(He.id,Le,$e,ae);else{j.style.left=`${(Le-1)*at}px`,j.style.width=`${ae*at-2}px`;const ye=j.querySelector(".timeline-cel-label");ye&&(ye.textContent=`${O} (${ae}f)`)}else e.goToFrame(Le),he&&t.setActiveLayer(he)};window.addEventListener("mousemove",fe),window.addEventListener("mouseup",Pe)})}function We(j,Se,He){let Le=0,ae=!1;j.addEventListener("mousedown",O=>{if(O.button!==0)return;O.stopPropagation(),d=Se.id,Le=O.clientX,ae=!1;const he=Ee=>{if(!ae&&Math.abs(Ee.clientX-Le)>4&&(ae=!0,j.classList.add("dragging")),ae){const De=xe(Ee.clientX,!1);j.style.left=`${(De-1)*at+at/2}px`}},ve=Ee=>{if(window.removeEventListener("mousemove",he),window.removeEventListener("mouseup",ve),j.classList.remove("dragging"),ae){const De=xe(Ee.clientX,!1);De!==He?(e.moveKeyframe(Se.id,He,De),e.goToFrame(De)):Oe()}else e.goToFrame(He),Ds(e,Se,He)};window.addEventListener("mousemove",he),window.addEventListener("mouseup",ve)}),j.addEventListener("contextmenu",O=>{O.preventDefault(),O.stopPropagation(),e.deleteKeyframe(Se.id,He)})}window.addEventListener("keydown",j=>{if(!["INPUT","SELECT","TEXTAREA"].includes(j.target.tagName)){if(j.code==="Enter"||j.code==="NumpadEnter")j.preventDefault(),e.togglePlay();else if(j.code==="ArrowRight")j.preventDefault(),j.shiftKey?e.lastFrame():e.nextFrame();else if(j.code==="ArrowLeft")j.preventDefault(),j.shiftKey?e.firstFrame():e.prevFrame();else if(j.key==="]"||j.key==="}")j.preventDefault(),e.nextCel(d??void 0);else if(j.key==="["||j.key==="{")j.preventDefault(),e.prevCel(d??void 0);else if(j.key==="o"||j.key==="O")j.preventDefault(),e.toggleOnionSkin();else if(j.key==="k"||j.key==="K"){j.preventDefault();const Se=x();Se&&e.addOrUpdateKeyframe(Se.id,e.settings.currentFrame)}}}),e.subscribe(Oe),Oe()}function Wl(n){var p,T;const e=document.createElement("div");e.className="onion-modal-backdrop";const t=document.createElement("div");t.className="onion-modal timeline-settings-modal";const i=n.settings,r=n.activeScene;t.innerHTML=`
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
  `,e.appendChild(t),document.body.appendChild(e);const s=t.querySelector("#tl-scene-name"),o=t.querySelector("#tl-total-frames"),a=t.querySelector("#tl-fps"),c=t.querySelector("#tl-fps-preset"),l=t.querySelector("#tl-start-frame"),d=t.querySelector("#tl-end-frame"),f=t.querySelector("#tl-time-format"),v=t.querySelector("#tl-division"),x=t.querySelector("#tl-loop"),b=t.querySelector("#tl-duration-summary"),E=()=>{const u=Math.max(1,Number(o.value)||1),m=Math.max(1,Number(a.value)||12);b.textContent=`Duración total: ${(u/m).toFixed(2)} seg (${u} fotogramas a ${m} FPS)`};o.addEventListener("input",()=>{const u=Math.max(1,Number(o.value)||1);(Number(d.value)===i.totalFrames||Number(d.value)>u)&&(d.value=String(u)),E()}),a.addEventListener("input",E),c.addEventListener("change",()=>{c.value&&(a.value=c.value,E())});const h=()=>e.remove();(p=t.querySelector("#tl-modal-cancel"))==null||p.addEventListener("click",h),(T=t.querySelector("#tl-modal-apply"))==null||T.addEventListener("click",()=>{const u=Math.max(1,Number(o.value)||i.totalFrames),m=Math.max(1,Number(a.value)||i.fps),S=Math.max(1,Number(l.value)||1),y=Math.max(S,Math.min(u,Number(d.value)||u));n.updateTimelineSettings({sceneName:s.value,totalFrames:u,fps:m,startFrame:S,endFrame:y,timeFormat:f.value,division:Number(v.value),loop:x.checked}),h()}),e.addEventListener("click",u=>{u.target===e&&h()})}function Lg(n){const e=document.createElement("div");e.className="onion-modal-backdrop";const t=document.createElement("div");t.className="onion-modal scene-manager-modal",t.style.width="390px";const i=()=>{var a,c,l,d,f,v,x;const r=n.activeScene,s=n.scenes;t.innerHTML=`
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
        ${s.map(b=>`
          <div class="scene-list-row" style="display:flex; align-items:center; justify-content:space-between; padding:6px 10px; border-bottom:1px solid #222; font-size:12px; background:${b.id===n.activeSceneId?"#1a2632":"transparent"};">
            <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
              <span style="color:${b.id===n.activeSceneId?"#00e5ff":"#666"};">🎬</span>
              <span style="font-weight:${b.id===n.activeSceneId?"600":"400"}; color:${b.id===n.activeSceneId?"#00e5ff":"#eee"}; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:160px;">${b.name}</span>
              <span style="font-size:10px; color:#777;">${b.settings.totalFrames}f (${(b.settings.totalFrames/b.settings.fps).toFixed(1)}s)</span>
            </div>
            <div style="display:flex; gap:4px; align-items:center;">
              ${b.id!==n.activeSceneId?`<button class="timeline-btn btn-switch-sc" data-id="${b.id}" style="height:22px; padding:0 8px; font-size:10px;">Activar</button>`:'<span style="font-size:10px; color:#00e5ff; font-weight:600; padding:0 6px;">Activa</span>'}
              ${s.length>1?`<button class="timeline-btn btn-del-sc" data-id="${b.id}" style="height:22px; width:22px; padding:0; color:#ff6b6b; font-size:12px;" title="Eliminar Escena">✕</button>`:""}
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
    `,(a=t.querySelector("#sm-rename-btn"))==null||a.addEventListener("click",()=>{const b=t.querySelector("#sm-active-name");b&&b.value.trim()&&(n.updateTimelineSettings({sceneName:b.value.trim()}),i())});const o=t.querySelector("#sm-new-scene-form");(c=t.querySelector("#sm-new-scene-btn"))==null||c.addEventListener("click",()=>{o.style.display=o.style.display==="none"?"block":"none"}),(l=t.querySelector("#sm-new-cancel"))==null||l.addEventListener("click",()=>{o.style.display="none"}),(d=t.querySelector("#sm-new-create"))==null||d.addEventListener("click",()=>{const b=t.querySelector("#sm-new-name").value,E=Number(t.querySelector("#sm-new-frames").value)||24,h=Number(t.querySelector("#sm-new-fps").value)||12,p=t.querySelector("#sm-new-dup").checked;n.createScene(b,p),n.updateTimelineSettings({totalFrames:E,fps:h,startFrame:1,endFrame:E}),i()}),(f=t.querySelector("#sm-dup-scene-btn"))==null||f.addEventListener("click",()=>{n.createScene(`${n.activeScene.name} (Copia)`,!0),i()}),t.querySelectorAll(".btn-switch-sc").forEach(b=>{b.addEventListener("click",()=>{const E=b.dataset.id;E&&(n.switchScene(E),i())})}),t.querySelectorAll(".btn-del-sc").forEach(b=>{b.addEventListener("click",()=>{const E=b.dataset.id;if(E&&n.scenes.length>1){const h=n.scenes.find(p=>p.id===E);confirm(`¿Eliminar la escena "${h==null?void 0:h.name}"?`)&&(n.deleteScene(E),i())}})}),(v=t.querySelector("#sm-del-active-btn"))==null||v.addEventListener("click",()=>{n.scenes.length>1&&confirm(`¿Eliminar la escena "${n.activeScene.name}"?`)&&(n.deleteScene(n.activeSceneId),i())}),(x=t.querySelector("#sm-close-btn"))==null||x.addEventListener("click",()=>{e.remove()})};i(),e.appendChild(t),document.body.appendChild(e),e.addEventListener("click",r=>{r.target===e&&e.remove()})}function Ds(n,e,t){var E,h,p;const i=document.createElement("div");i.className="onion-modal-backdrop";const r=document.createElement("div");r.className="onion-modal";const o=e.keyframes.get(t)??{...n.getInterpolatedTransform(e.id,t),interpolation:"smooth"};r.innerHTML=`
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
  `,i.appendChild(r),document.body.appendChild(i);const a=r.querySelector("#kf-interp"),c=r.querySelector("#kf-x"),l=r.querySelector("#kf-y"),d=r.querySelector("#kf-scale"),f=r.querySelector("#kf-rot"),v=r.querySelector("#kf-opacity"),x=()=>{const T=Math.max(.05,(Number(d.value)||100)/100);n.addOrUpdateKeyframe(e.id,t,{interpolation:a.value,x:Number(c.value)||0,y:Number(l.value)||0,scaleX:T,scaleY:T,rotation:Number(f.value)||0,opacity:Math.max(0,Math.min(1,(Number(v.value)??100)/100))})};a.addEventListener("change",x),c.addEventListener("input",x),l.addEventListener("input",x),d.addEventListener("input",x),f.addEventListener("input",x),v.addEventListener("input",x);const b=()=>i.remove();(E=r.querySelector("#kf-reset"))==null||E.addEventListener("click",()=>{c.value="0",l.value="0",d.value="100",f.value="0",v.value="100",x()}),(h=r.querySelector("#kf-delete"))==null||h.addEventListener("click",()=>{n.deleteKeyframe(e.id,t),b()}),(p=r.querySelector("#kf-close"))==null||p.addEventListener("click",b),i.addEventListener("click",T=>{T.target===i&&b()})}function Rg(n,e){const t=document.createElement("div");t.className="onion-modal-backdrop";const i=document.createElement("div");i.className="onion-modal";let r="general";const s=()=>{var b,E,h,p,T,u,m,S,y,g,w,_,M,C,D,G,P,k,F,$,ee;const a=n.onionSkin,c=a.customReferences;let l=c.find(X=>X.celId===a.activeReferenceCelId)??c[0],d=null,f="Celda Anterior";if(!l&&n.tracks.length>0){const X=n.tracks[0],N=n.settings.currentFrame,U=[...Array.from(X.exposures.keys()).sort((H,I)=>H-I)].reverse().find(H=>H<N);U!==void 0&&(d=X.exposures.get(U)??null,d&&(f=`${X.name} (F${U})`))}const v=l?l.celId:d,x=v?n.getOnionSkinTransform(v):null;if(i.innerHTML=`
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

          ${c.map(X=>`
              <div class="csp-lt-item-row ${l&&l.id===X.id?"active":""}" data-id="${X.id}">
                <button class="csp-lt-eye-btn ${X.visible?"visible":""}" data-id="${X.id}" title="${X.visible?"Ocultar":"Mostrar"}">
                  ${X.visible?"👁":"─"}
                </button>
                <div class="csp-lt-item-info">
                  <span class="csp-lt-item-name">${X.name}</span>
                  <span class="csp-lt-item-sub">${X.trackName??"Pista"} · F${X.frame??"?"}</span>
                </div>
                <div class="csp-lt-item-swatch" style="background:${X.colorMode==="color"?"linear-gradient(45deg, #f00, #0f0, #00f)":X.tintColor??"#ffd43b"};"></div>
                <button class="csp-lt-item-del" data-id="${X.id}" title="Quitar referencia">✕</button>
              </div>
            `).join("")}
        </div>

        ${v&&x?`
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
    `,(b=i.querySelector("#tab-onion-general"))==null||b.addEventListener("click",()=>{r="general",s()}),(E=i.querySelector("#tab-onion-lt"))==null||E.addEventListener("click",()=>{r="lightTable",s()}),(h=i.querySelector("#onion-modal-top-close"))==null||h.addEventListener("click",o),(p=i.querySelector("#onion-modal-close"))==null||p.addEventListener("click",o),r==="general"){const X=i.querySelector("#onion-enable"),N=i.querySelector("#onion-mode"),q=i.querySelector("#onion-prev-count"),U=i.querySelector("#onion-prev-color"),H=i.querySelector("#onion-next-count"),I=i.querySelector("#onion-next-color"),B=i.querySelector("#onion-start-opacity-range"),V=i.querySelector("#onion-step-opacity-range"),Y=()=>{n.setOnionSkin({enabled:X.checked,mode:N.value,prevFrames:Number(q.value),prevColor:U.value,nextFrames:Number(H.value),nextColor:I.value,startOpacity:Number(B.value)/100,stepOpacity:Number(V.value)/100});const se=i.querySelector("#onion-start-opacity-lbl");se&&(se.textContent=`${B.value}%`);const ue=i.querySelector("#onion-step-opacity-lbl");ue&&(ue.textContent=`${V.value}%`)};X==null||X.addEventListener("change",Y),N==null||N.addEventListener("change",Y),q==null||q.addEventListener("input",Y),U==null||U.addEventListener("input",Y),H==null||H.addEventListener("input",Y),I==null||I.addEventListener("input",Y),B==null||B.addEventListener("input",Y),V==null||V.addEventListener("input",Y)}else{(T=i.querySelector("#onion-lt-add-prev"))==null||T.addEventListener("click",()=>{n.registerPrevCelToLightTable(),s()}),(u=i.querySelector("#onion-lt-add-next"))==null||u.addEventListener("click",()=>{n.registerNextCelToLightTable(),s()}),(m=i.querySelector("#onion-lt-clear-all"))==null||m.addEventListener("click",()=>{const N=[...n.onionSkin.customReferences];for(const q of N)n.removeCustomOnionReference(q.id);s()});const X=i.querySelector("#onion-lt-add-select");if(X){for(const N of n.tracks){const q=n.getCelsInTrack(N.id);for(const U of q){const H=document.createElement("option");H.value=U.id,H.textContent=`${N.name}: ${U.name}`,X.appendChild(H)}}X.addEventListener("change",()=>{X.value&&(n.addCustomOnionReference(X.value),s())})}if(i.querySelectorAll(".csp-lt-item-row").forEach(N=>{const q=N.dataset.id;N.addEventListener("click",U=>{const H=U.target;if(!(H.classList.contains("csp-lt-eye-btn")||H.classList.contains("csp-lt-item-del"))&&q){const I=n.onionSkin.customReferences.find(B=>B.id===q);I&&(n.setActiveReferenceCel(I.celId),s())}})}),i.querySelectorAll(".csp-lt-eye-btn").forEach(N=>{N.addEventListener("click",q=>{q.stopPropagation();const U=N.dataset.id,H=n.onionSkin.customReferences.find(I=>I.id===U);H&&(n.updateCustomOnionReference(H.id,{visible:!H.visible}),s())})}),i.querySelectorAll(".csp-lt-item-del").forEach(N=>{N.addEventListener("click",q=>{q.stopPropagation();const U=N.dataset.id;U&&(n.removeCustomOnionReference(U),s())})}),v&&x){const N=v;(S=i.querySelector("#onion-lt-reset-btn"))==null||S.addEventListener("click",()=>{n.resetOnionSkinTransform(N),s()}),(y=i.querySelector("#onion-ref-opacity"))==null||y.addEventListener("input",I=>{const B=Number(I.target.value)/100;l?n.updateCustomOnionReference(l.id,{opacity:B}):n.setOnionSkin({startOpacity:B});const V=I.target.nextElementSibling;V&&(V.textContent=`${Math.round(B*100)}%`)}),(g=i.querySelector("#onion-ref-tint"))==null||g.addEventListener("input",I=>{const B=I.target.value;l?n.updateCustomOnionReference(l.id,{tintColor:B,colorMode:"monochrome"}):n.setOnionSkin({prevColor:B})}),(w=i.querySelector("#onion-flip-h"))==null||w.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{flipX:!I.flipX}),s()}),(_=i.querySelector("#onion-flip-v"))==null||_.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{flipY:!I.flipY}),s()});const q=5;(M=i.querySelector("#onion-pad-up"))==null||M.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{y:I.y-q}),s()}),(C=i.querySelector("#onion-pad-down"))==null||C.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{y:I.y+q}),s()}),(D=i.querySelector("#onion-pad-left"))==null||D.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{x:I.x-q}),s()}),(G=i.querySelector("#onion-pad-right"))==null||G.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{x:I.x+q}),s()}),(P=i.querySelector("#onion-pad-center"))==null||P.addEventListener("click",()=>{n.updateOnionSkinTransform(N,{x:0,y:0}),s()}),(k=i.querySelector("#onion-num-x"))==null||k.addEventListener("change",I=>{const B=Number(I.target.value);n.updateOnionSkinTransform(N,{x:B})}),(F=i.querySelector("#onion-num-y"))==null||F.addEventListener("change",I=>{const B=Number(I.target.value);n.updateOnionSkinTransform(N,{y:B})});const U=i.querySelector("#onion-rot-slider");U==null||U.addEventListener("input",()=>{var V;const I=Number(U.value);n.updateOnionSkinTransform(N,{rotation:I});const B=(V=U.nextElementSibling)==null?void 0:V.nextElementSibling;B&&(B.textContent=`${I}°`)}),($=i.querySelector("#onion-rot-m15"))==null||$.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{rotation:I.rotation-15}),s()}),(ee=i.querySelector("#onion-rot-p15"))==null||ee.addEventListener("click",()=>{const I=n.getOnionSkinTransform(N);n.updateOnionSkinTransform(N,{rotation:I.rotation+15}),s()});const H=i.querySelector("#onion-scale-slider");H==null||H.addEventListener("input",()=>{const I=Number(H.value),B=I/100;n.updateOnionSkinTransform(N,{scaleX:B,scaleY:B});const V=H.nextElementSibling;V&&(V.textContent=`${I}%`)})}}},o=()=>{t.remove()};t.addEventListener("click",a=>{a.target===t&&o()}),s(),t.appendChild(i),document.body.appendChild(t)}function Xl(n,e,t,i,r,s){document.querySelectorAll(".timeline-context-menu").forEach(g=>g.remove());const o=document.createElement("div");o.className="timeline-context-menu";const a=document.createElement("div");a.className="context-menu-header",a.innerHTML=`<span>${t.name}</span><span style="color:#00e5ff;">Fotograma ${i}</span>`,o.appendChild(a);const c=r.getCelsInTrack(t.id),l=t.exposures.get(i),d=r.getActiveCelForFrame(t.id,i),f=document.createElement("div");f.className="context-menu-section-title",f.textContent="Asignar Celda Existente",o.appendChild(f);const v=document.createElement("div");if(v.className="context-menu-cels-list",c.length===0){const g=document.createElement("div");g.className="context-menu-item",g.style.color="#777777",g.style.fontStyle="italic",g.textContent="(Sin celdas en la pista)",v.appendChild(g)}else for(const g of c){const w=document.createElement("div");w.className="context-menu-item";const _=l===g.id;_&&w.classList.add("active"),w.innerHTML=`
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="width:7px; height:7px; border-radius:50%; background:${_?"#00e5ff":"#627d98"};"></span>
          <span>${g.name}</span>
        </span>
        ${_?'<span style="color:#00e5ff; font-weight:bold;">✓</span>':""}
      `,w.addEventListener("click",()=>{r.specifyCel(t.id,i,g.id),r.goToFrame(i),s.setActiveLayer(g.id),o.remove()}),v.appendChild(w)}o.appendChild(v);const x=document.createElement("div");x.className="context-menu-separator",o.appendChild(x);const b=document.createElement("div");b.className="context-menu-item",b.innerHTML=`
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
      <span>Nueva celda de animación</span>
    </span>
  `,b.addEventListener("click",()=>{r.createCel(t.id,i),r.goToFrame(i),o.remove()}),o.appendChild(b);const E=document.createElement("div");E.className="context-menu-item",E.innerHTML=`
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
  `,p.querySelectorAll("button").forEach(g=>{g.addEventListener("click",w=>{w.stopPropagation();const _=Number(g.dataset.step)||2;r.batchSpecifyCels(t.id,_),o.remove()})}),o.appendChild(p),t.exposures.has(i)){const g=document.createElement("div");g.className="context-menu-item",g.innerHTML=`
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Eliminar exposición de este frame</span>
      </span>
    `,g.addEventListener("click",()=>{r.removeExposure(t.id,i),o.remove()}),o.appendChild(g)}if(d){const g=document.createElement("div");g.className="context-menu-separator",o.appendChild(g);const w=document.createElement("div");w.className="context-menu-item danger",w.innerHTML=`
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        <span>Eliminar celda "${d.name}" del proyecto</span>
      </span>
    `,w.addEventListener("click",()=>{confirm(`¿Eliminar la celda "${d.name}" permanentemente del proyecto?`)&&r.deleteCelLayer(t.id,d.id),o.remove()}),o.appendChild(w)}document.body.appendChild(o);const T=o.getBoundingClientRect();let u=n,m=e;u+T.width>window.innerWidth&&(u=window.innerWidth-T.width-10),m+T.height>window.innerHeight&&(m=e-T.height-4),o.style.left=`${Math.max(10,u)}px`,o.style.top=`${Math.max(10,m)}px`;const S=g=>{o.contains(g.target)||(o.remove(),window.removeEventListener("mousedown",S),window.removeEventListener("keydown",y))},y=g=>{g.key==="Escape"&&(o.remove(),window.removeEventListener("mousedown",S),window.removeEventListener("keydown",y))};window.addEventListener("mousedown",S),window.addEventListener("keydown",y)}const kr=[{id:"g-pen",name:"Pluma G (G-Pen)",tool:"pen",description:"Trazo nítido y dinámico con alta respuesta a la presión.",settings:{size:6,minSizeRatio:0,pressureSize:!0,pressureCurve:1.35,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:8,taperEnd:18,stabilization:5}},{id:"real-g-pen",name:"Pluma G Real",tool:"pen",description:"Textura analógica y leve sangrado para manga tradicional.",settings:{size:5,minSizeRatio:.1,pressureSize:!0,pressureCurve:1.2,flow:.95,pressureFlow:!0,inkMode:"uniform",hardness:.85,antiAliasing:"weak",spacing:.07,tipShape:"circle",taperStart:6,taperEnd:14,stabilization:4}},{id:"turnip-pen",name:"Pluma Cuchara (Kabura)",tool:"pen",description:"Grosor consistente y líneas limpias para entintar detalles.",settings:{size:4,minSizeRatio:.65,pressureSize:!0,pressureCurve:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:3,taperEnd:8,stabilization:6}},{id:"manga-line",name:"manga line art",tool:"pen",description:"Inspirado en el legendario pincel todo-en-uno de CSP (怠けものブラシ): línea principal con presión fuerte, acuarela y pintura suave con presión ligera.",settings:{size:8,minSizeRatio:.1,pressureSize:!0,pressureCurve:1.45,flow:.98,pressureFlow:!0,inkMode:"accumulate",hardness:.9,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:8,taperEnd:18,stabilization:7}},{id:"maru-pen",name:"Pluma Maru (Redonda)",tool:"pen",description:"Plumilla fina de CSP para cabello, ojos y detalles delicados.",settings:{size:3,minSizeRatio:.05,pressureSize:!0,pressureCurve:1.3,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:5,taperEnd:12,stabilization:5}},{id:"calligraphy-pen",name:"Caligrafía",tool:"pen",description:"Punta biselada de grosor variable según el ángulo del trazo.",settings:{size:14,minSizeRatio:.35,pressureSize:!0,pressureCurve:1.1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.04,tipShape:"calligraphic",tipRoundness:.25,tipAngle:45,taperStart:6,taperEnd:14,stabilization:6}},{id:"millipen",name:"Marcador Millipen",tool:"pen",description:"Estilógrafo técnico de grosor uniforme sin variación por presión.",settings:{size:5,minSizeRatio:1,pressureSize:!1,pressureCurve:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:4}},{id:"manga-line-art-brush",name:"manga line art",tool:"brush",description:"Inspirado en el legendario pincel todo-en-uno de CSP (怠けものブラシ): trazo firme con presión fuerte, veladura y mezcla acuarela con presión ligera.",settings:{size:14,minSizeRatio:.1,pressureSize:!0,pressureCurve:1.45,flow:.95,pressureFlow:!0,inkMode:"accumulate",hardness:.88,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:8,taperEnd:18,stabilization:7}},{id:"watercolor",name:"Acuarela Suave",tool:"brush",description:"Bordes suaves translúcidos ideales para colorear y sombras.",settings:{size:30,minSizeRatio:.5,pressureSize:!0,pressureCurve:1.2,flow:.45,pressureFlow:!0,inkMode:"accumulate",hardness:.35,antiAliasing:"strong",spacing:.08,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:3}},{id:"thick-paint",name:"Óleo / Pintura Densa",tool:"brush",description:"Pincelada corpórea con cobertura rápida y buena mezcla.",settings:{size:26,minSizeRatio:.6,pressureSize:!0,pressureCurve:1.2,flow:.85,pressureFlow:!0,inkMode:"accumulate",hardness:.7,antiAliasing:"medium",spacing:.06,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"airbrush",name:"Aerógrafo Suave",tool:"brush",description:"Gradaciones difuminadas sin textura de borde evidente.",settings:{size:60,minSizeRatio:.4,pressureSize:!0,pressureCurve:1.1,flow:.3,pressureFlow:!0,inkMode:"accumulate",hardness:.1,antiAliasing:"strong",spacing:.04,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:1}},{id:"flat-brush",name:"Pincel Plano",tool:"brush",description:"Puntas rectangulares para fondos arquitectónicos y ropa.",settings:{size:22,minSizeRatio:.7,pressureSize:!1,pressureCurve:1.2,flow:.85,pressureFlow:!0,inkMode:"accumulate",hardness:.9,antiAliasing:"medium",spacing:.05,tipShape:"square",tipRoundness:.28,tipAngle:35,followDirection:!0,taperStart:0,taperEnd:0,stabilization:2}},{id:"gouache-brush",name:"Gouache Opaco",tool:"brush",description:"Cobertura mate de bordes definidos ideal para fondos de animación.",settings:{size:32,minSizeRatio:.45,pressureSize:!0,pressureCurve:1.15,flow:.92,pressureFlow:!0,inkMode:"uniform",hardness:.85,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:2,taperEnd:4,stabilization:3}},{id:"airbrush-highlight",name:"Aerógrafo de Brillo",tool:"brush",description:"Haz concentrado para luces especulares y atmósfera.",settings:{size:42,minSizeRatio:.25,pressureSize:!0,pressureCurve:1.4,flow:.55,pressureFlow:!0,inkMode:"accumulate",hardness:.25,antiAliasing:"strong",spacing:.04,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"hard-eraser",name:"Borrador Duro",tool:"eraser",description:"Eliminación 100% limpia sin halos difusos.",settings:{size:24,minSizeRatio:.3,pressureSize:!1,pressureCurve:1.2,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:3}},{id:"soft-eraser",name:"Borrador Suave",tool:"eraser",description:"Desvanecimiento gradual para degradados y luz.",settings:{size:36,minSizeRatio:.5,pressureSize:!0,pressureCurve:1.2,flow:.6,pressureFlow:!0,inkMode:"accumulate",hardness:.25,antiAliasing:"strong",spacing:.05,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"kneaded-eraser",name:"Goma Maleable",tool:"eraser",description:"Baja opacidad para aclarar trazos suavemente.",settings:{size:50,minSizeRatio:.6,pressureSize:!0,pressureCurve:1.1,flow:.3,pressureFlow:!0,inkMode:"accumulate",hardness:.4,antiAliasing:"strong",spacing:.06,tipShape:"circle",taperStart:0,taperEnd:0,stabilization:2}},{id:"straight-line",name:"Línea Directa",tool:"shape",description:"Trazos rectos precisos entre dos puntos.",settings:{shapeType:"line",shapeFill:"stroke",size:4}},{id:"rect",name:"Rectángulo",tool:"shape",description:"Cajas delimitadoras y marcos ortogonales.",settings:{shapeType:"rectangle",shapeFill:"stroke",size:4}},{id:"ellipse",name:"Elipse / Círculo",tool:"shape",description:"Círculos y óvalos con o sin relleno.",settings:{shapeType:"ellipse",shapeFill:"stroke",size:4}},{id:"bucket-layer",name:"Capa de Edición",tool:"bucket",description:"Rellena respetando únicamente las líneas de la capa actual.",settings:{tolerance:20}},{id:"bucket-all",name:"Todas las Capas",tool:"bucket",description:"Rellena respetando la composición visible de todas las capas.",settings:{tolerance:35}},{id:"eyedropper-pixel",name:"Cuentagotas",tool:"eyedropper",description:"Muestrea el color exacto del píxel seleccionado.",settings:{}},{id:"hand-pan",name:"Mover Lienzo",tool:"hand",description:"Desplaza el encuadre del lienzo sin alterarlo.",settings:{}},{id:"bone-rig",name:"Crear / Editar Esqueleto (Rig)",tool:"bone",description:"Haz clic y arrastra en el lienzo para crear cadenas de huesos 2D o mover articulaciones en reposo.",settings:{}},{id:"bone-pose-fk",name:"Posar Huesos FK (Rotar / Mover)",tool:"bone",description:"Rota huesos individuales con cinemática directa (FK) y registra keyframes automáticamente.",settings:{}},{id:"bone-pose-ik",name:"Posar Cadena IK (Cinemática Inversa)",tool:"bone",description:"Arrastra la punta de una extremidad (mano/pie) para resolver el ángulo de articulación automáticamente con IK de 2 huesos.",settings:{}}],no={size:6,minSizeRatio:.15,pressureSize:!0,pressureCurve:1.2,opacity:1,flow:1,pressureFlow:!1,inkMode:"uniform",hardness:1,antiAliasing:"medium",spacing:.06,tipShape:"circle",tipRoundness:1,tipAngle:0,followDirection:!1,taperStart:6,taperEnd:12,stabilization:5,tolerance:20,shapeType:"rectangle",shapeFill:"stroke",color:"#000000"},Pg=["#000000","#ffffff","#e74c3c","#e67e22","#f1c40f","#2ecc71","#1abc9c","#3498db","#9b59b6","#34495e","#7f8c8d","#bdc3c7"],Dg=[{id:"csp-standard",name:"Conjunto Estándar CSP",colors:["#000000","#333333","#666666","#999999","#cccccc","#ffffff","#e53935","#fb8c00","#fdd835","#43a047","#00acc1","#1e88e5","#3949ab","#8e24aa","#d81b60","#6d4c41","#546e7a","#f4511e","#ffcdd2","#ffe0b2","#fff9c4","#c8e6c9","#b2ebf2","#bbdefb"]},{id:"anime-skin",name:"Tonos de Piel & Anime",colors:["#fff5eb","#ffecd9","#ffe0c2","#f7cba4","#eba87c","#d1845c","#f9d5c5","#eec0ad","#dfa088","#c67d63","#9c563f","#6e3726","#ffcad4","#f4acb7","#9d8189","#4a3f45","#2b2429","#1a1518"]},{id:"vibrant-cel",name:"Cel Shading Vibrante",colors:["#ff1744","#ff9100","#ffea00","#00e676","#00e5ff","#2979ff","#651fff","#d500f9","#ff4081","#1de9b6","#76ff03","#c6ff00"]}],Ig=["size","opacity","hardness","stabilization"],Vc="oniri.subtools.v1",Ng=["pen","brush","eraser","eyedropper","bucket","shape","bone","hand"];function Fg(n){if(!n||typeof n!="object")return!1;const e=n;return typeof e.id=="string"&&typeof e.name=="string"&&typeof e.tool=="string"&&Ng.includes(e.tool)&&!!e.settings&&typeof e.settings=="object"}function $l(n){return n.map(e=>({...e,settings:{...e.settings}}))}let Or=[];function Ug(){try{const n=localStorage.getItem(Vc);if(n){const e=JSON.parse(n);if(e&&e.v===1&&Array.isArray(e.items)&&e.items.length>0&&e.items.every(Fg)){const t=$l(e.items);Or=Array.isArray(e.deleted)?e.deleted.filter(r=>typeof r=="string"):[];const i=new Set(t.map(r=>r.id));for(const r of kr){const s=t.find(o=>o.id===r.id);s&&!s.custom&&(r.id==="manga-line"||r.id==="manga-line-art-brush")&&(s.name=r.name,s.description=r.description,s.settings={...r.settings,...s.settings,pressureFlow:!0,inkMode:"accumulate"}),!i.has(r.id)&&!Or.includes(r.id)&&t.push({...r,settings:{...r.settings}})}return t}}}catch{}return $l(kr)}let Un=Ug();function Wr(){try{const n={v:1,items:Un,deleted:[...Or]};localStorage.setItem(Vc,JSON.stringify(n))}catch{}}function ni(n){return Un.find(e=>e.id===n)}function kg(n){const e=kr.find(t=>t.tool===n);return e?{...e.settings}:{}}function Xr(n,e){return{...no,...n.settings,color:e}}const Wc="oniri.colorsets.v1",Xc="oniri.visibleprops.v1";function Og(){try{const n=localStorage.getItem(Wc);if(n){const e=JSON.parse(n);if(Array.isArray(e)&&e.length>0)return e}}catch{}return Dg.map(n=>({...n,colors:[...n.colors]}))}function $c(n){try{localStorage.setItem(Wc,JSON.stringify(n))}catch{}}function Bg(){try{const n=localStorage.getItem(Xc);if(n){const e=JSON.parse(n);if(Array.isArray(e)&&e.length>0)return e}}catch{}return[...Ig]}function zg(n){try{localStorage.setItem(Xc,JSON.stringify(n))}catch{}}const Ls=ni("g-pen")??Un[0],ql=Og();var lc;let _e={tool:"pen",activeSubToolId:Ls?Ls.id:"g-pen",brush:Ls?Xr(Ls,"#000000"):{...no},propertiesOpen:!0,visibleProperties:Bg(),previewBgMode:"paper",boneMode:"rig",showBonesOverlay:!0,autoKeyBones:!0,colorTab:"picker",primaryColor:"#000000",secondaryColor:"#ffffff",activeColorSlot:"primary",isTransparentColor:!1,colorHistory:Pg,colorSets:ql,activeColorSetId:((lc=ql[0])==null?void 0:lc.id)??"csp-standard"};const Ya=new Set;function Bt(){for(const n of Ya)n(_e)}function pt(){return _e}function Rr(){return _e.tool}function Qn(n){if(_e.tool===n)return;const t=Un.filter(s=>s.tool===n)[0],i=t?t.id:_e.activeSubToolId;let r=_e.boneMode;n==="bone"&&(i==="bone-rig"?r="rig":i==="bone-pose-fk"?r="pose_fk":i==="bone-pose-ik"&&(r="pose_ik")),_e={..._e,tool:n,activeSubToolId:i,boneMode:r,brush:t?Xr(t,_e.brush.color):_e.brush},Bt()}function Yl(n){const e=ni(n);if(!e)return;let t=_e.boneMode;e.id==="bone-rig"?t="rig":e.id==="bone-pose-fk"?t="pose_fk":e.id==="bone-pose-ik"&&(t="pose_ik"),_e={..._e,tool:e.tool,activeSubToolId:e.id,boneMode:t,brush:Xr(e,_e.brush.color)},Bt()}function Hg(n){_e={..._e,tool:"bone",activeSubToolId:n==="rig"?"bone-rig":n==="pose_fk"?"bone-pose-fk":"bone-pose-ik",boneMode:n},Bt()}function Gg(n){_e={..._e,showBonesOverlay:n},Bt()}function Vg(n){_e={..._e,autoKeyBones:n},Bt()}function Wg(n){const t=_e.visibleProperties.includes(n)?_e.visibleProperties.filter(i=>i!==n):[..._e.visibleProperties,n];_e={..._e,visibleProperties:t},zg(t),Bt()}function Xg(n){_e={..._e,previewBgMode:n},Bt()}function $g(n){_e.colorTab!==n&&(_e={..._e,colorTab:n},Bt())}function qg(n){_e.colorSets.some(e=>e.id===n)&&(_e={..._e,activeColorSetId:n},Bt())}function Yg(n){if(!n||n==="transparent")return;const e=n.toLowerCase(),t=_e.colorSets.map(i=>i.id!==_e.activeColorSetId?i:{...i,colors:[...i.colors,e]});_e={..._e,colorSets:t},$c(t),Bt()}function Kg(n){const e=_e.colorSets.map(t=>t.id!==_e.activeColorSetId||t.colors.length<=1?t:{...t,colors:t.colors.filter((i,r)=>r!==n)});_e={..._e,colorSets:e},$c(e),Bt()}function jg(n){return Un.filter(e=>e.tool===n)}function Kl(){return ni(_e.activeSubToolId)}function ft(n){_e={..._e,brush:{..._e.brush,...n}};const e=ni(_e.activeSubToolId);if(e){const t={...n};delete t.color,e.settings={...e.settings,...t},Wr()}n.color&&!_e.isTransparentColor&&(_e.activeColorSlot==="primary"?_e.primaryColor=n.color:_e.secondaryColor=n.color,io(n.color)),Bt()}let jl=0;function qc(){return jl+=1,`custom-${Date.now().toString(36)}-${jl.toString(36)}`}function Zg(n,e){var o;const t=_e.tool,i={...((o=ni(_e.activeSubToolId))==null?void 0:o.settings)??{}},r=ni(_e.activeSubToolId),s={id:qc(),name:n.trim()||"Pincel nuevo",tool:t,description:r?`Pincel personalizado basado en ${r.name}.`:"Pincel personalizado.",settings:Object.keys(i).length>0?i:{...no},custom:!0};return Un.push(s),Wr(),s}function Jg(n){const e=ni(n);if(!e)return null;const t={...e,id:qc(),name:`${e.name} (copia)`,description:`Copia personalizada de ${e.name}.`,settings:{...e.settings},custom:!0};return Un.push(t),Wr(),t}function Qg(n){const e=ni(n);if(!e||Un.filter(i=>i.tool===e.tool).length<=1)return!1;if(Un=Un.filter(i=>i.id!==n),kr.some(i=>i.id===n)&&!Or.includes(n)&&Or.push(n),Wr(),_e.activeSubToolId===n){const i=Un.find(r=>r.tool===e.tool);i&&(_e={..._e,tool:i.tool,activeSubToolId:i.id,brush:Xr(i,_e.brush.color)})}return Bt(),!0}function Yc(n){const e=ni(n);if(!e)return;const t=kr.find(i=>i.id===n);e.settings=t?{...t.settings}:kg(e.tool),Wr(),_e.activeSubToolId===n&&(_e={..._e,brush:Xr(e,_e.brush.color)}),Bt()}function yn(n){_e={..._e,primaryColor:n,isTransparentColor:!1,activeColorSlot:"primary",brush:{..._e.brush,color:n}},io(n),Bt()}function bn(n){_e={..._e,secondaryColor:n,isTransparentColor:!1,activeColorSlot:"secondary",brush:{..._e.brush,color:n}},io(n),Bt()}function Zl(n){const e=n==="primary"?_e.primaryColor:_e.secondaryColor;_e={..._e,activeColorSlot:n,isTransparentColor:!1,brush:{..._e.brush,color:e}},Bt()}function Kc(){const n=_e.primaryColor,e=_e.secondaryColor,t=_e.activeColorSlot==="primary"?e:n;_e={..._e,primaryColor:e,secondaryColor:n,brush:{..._e.brush,color:t}},Bt()}function jc(n){const e=!_e.isTransparentColor;_e={..._e,isTransparentColor:e,brush:{..._e.brush,color:e?"transparent":_e.activeColorSlot==="primary"?_e.primaryColor:_e.secondaryColor}},Bt()}function io(n){if(!n||n==="transparent")return;const e=n.toLowerCase(),t=_e.colorHistory.filter(i=>i.toLowerCase()!==e);_e.colorHistory=[e,...t].slice(0,16)}function Rn(n){const e=n.replace("#","").trim();if(e.length!==6)return{r:17,g:17,b:17};const t=parseInt(e,16);return Number.isNaN(t)?{r:17,g:17,b:17}:{r:t>>16&255,g:t>>8&255,b:t&255}}function Is(n,e,t){const i=r=>Math.max(0,Math.min(255,Math.round(r)));return"#"+[i(n),i(e),i(t)].map(r=>r.toString(16).padStart(2,"0")).join("")}function Ri(n,e,t){const i=n/255,r=e/255,s=t/255,o=Math.max(i,r,s),a=Math.min(i,r,s),c=o-a;let l=0;const d=o===0?0:c/o,f=o;if(o!==a){switch(o){case i:l=(r-s)/c+(r<s?6:0);break;case r:l=(s-i)/c+2;break;default:l=(i-r)/c+4;break}l*=60}return{h:l,s:d,v:f}}function e0(n,e,t){const i=(n%360+360)%360,r=t*e,s=r*(1-Math.abs(i/60%2-1)),o=t-r;let a=0,c=0,l=0;return i<60?[a,c,l]=[r,s,0]:i<120?[a,c,l]=[s,r,0]:i<180?[a,c,l]=[0,r,s]:i<240?[a,c,l]=[0,s,r]:i<300?[a,c,l]=[s,0,r]:[a,c,l]=[r,0,s],{r:Math.round((a+o)*255),g:Math.round((c+o)*255),b:Math.round((l+o)*255)}}function Xt(n,e,t){const{r:i,g:r,b:s}=e0(n,e,t);return Is(i,r,s)}function t0(n){const{r:e,g:t,b:i}=Rn(n),{h:r,s,v:o}=Ri(e,t,i),a=s<.12?.68:s,c=o<.18?.78:o;return[{label:"Complementario (Contraste Directo)",colors:[{hex:n,tag:"Base"},{hex:Xt(r+180,a,c),tag:"180° Opuesto"}]},{label:"Complementario Dividido",colors:[{hex:n,tag:"Base"},{hex:Xt(r+150,a,c),tag:"+150°"},{hex:Xt(r+210,a,c),tag:"+210°"}]},{label:"Tríada Armónica",colors:[{hex:n,tag:"Base"},{hex:Xt(r+120,a,c),tag:"+120°"},{hex:Xt(r+240,a,c),tag:"+240°"}]},{label:"Análogos (Cercanos)",colors:[{hex:Xt(r-30,a,c),tag:"-30°"},{hex:n,tag:"Base"},{hex:Xt(r+30,a,c),tag:"+30°"}]},{label:"Escala de Luz y Sombra (Cel Shading)",colors:[{hex:Xt(r+8,Math.max(.15,a*.45),Math.min(1,c*1.25)),tag:"Luz+"},{hex:Xt(r+4,Math.max(.25,a*.75),Math.min(1,c*1.12)),tag:"Luz"},{hex:n,tag:"Base"},{hex:Xt(r-8,Math.min(1,a*1.1),Math.max(.12,c*.75)),tag:"Sombra 1"},{hex:Xt(r-16,Math.min(1,a*1.2),Math.max(.08,c*.5)),tag:"Sombra 2"}]}]}function Jl(n){const e=n!==void 0?n:!_e.propertiesOpen;_e.propertiesOpen!==e&&(_e={..._e,propertiesOpen:e},Bt())}function ro(n){return Ya.add(n),()=>{Ya.delete(n)}}function n0(n,e,t,i,r=20){const s=n.canvas.width,o=n.canvas.height;if(e<0||e>=s||t<0||t>=o)return;const a=n.getImageData(0,0,s,o),c=a.data,l=parseInt(i.slice(1,3),16)||0,d=parseInt(i.slice(3,5),16)||0,f=parseInt(i.slice(5,7),16)||0,v=255,x=(t*s+e)*4,b=c[x],E=c[x+1],h=c[x+2],p=c[x+3];if(b===l&&E===d&&h===f&&p===v)return;const T=(r/100*255)**2*3;function u(g){const w=c[g]-b,_=c[g+1]-E,M=c[g+2]-h,C=c[g+3]-p;return w*w+_*_+M*M+C*C<=T}function m(g){c[g]=l,c[g+1]=d,c[g+2]=f,c[g+3]=v}const S=new Uint8Array(s*o),y=[[e,t]];for(S[t*s+e]=1;y.length>0;){const[g,w]=y.pop(),_=w*s;let M=g;for(;M>0;){const D=(_+M-1)*4;if(S[_+M-1]||!u(D))break;M--}let C=g;for(;C<s-1;){const D=(_+C+1)*4;if(S[_+C+1]||!u(D))break;C++}for(let D=M;D<=C;D++)S[_+D]=1,m((_+D)*4);for(const D of[w-1,w+1]){if(D<0||D>=o)continue;const G=D*s;let P=!1;for(let k=M;k<=C;k++){const F=(G+k)*4,$=!S[G+k]&&u(F);!P&&$?(y.push([k,D]),P=!0):P&&!$&&(P=!1)}}}n.putImageData(a,0,0)}function i0(n=30){const e=[],t=[];return{push(i,r){e.push({layerId:i,data:r}),e.length>n&&e.shift(),t.length=0},undo(i,r){return e.length===0?null:(t.push({layerId:i,data:r}),e.pop()??null)},redo(i,r){return t.length===0?null:(e.push({layerId:i,data:r}),t.pop()??null)},canUndo(){return e.length>0},canRedo(){return t.length>0},clear(){e.length=0,t.length=0}}}function r0(n){const e=[],t=r=>n.filter(s=>s.parentId===r);function i(r){const s=t(r);for(const o of s)o.type==="folder"?i(o.id):e.push(o)}return i(null),e}function Na(n,e){const t=document.createElement("canvas");return t.width=n,t.height=e,t}function s0(n,e){let t=1;const i=[],r=new Set;function s(){for(const b of r)b()}const o=Na(n,e),a=o.getContext("2d");a.fillStyle="#ffffff",a.fillRect(0,0,n,e);const c={id:"layer-paper",type:"raster",name:"Paper",canvas:o,context:a,visible:!0,opacity:1,blendMode:"source-over",isPaper:!0,parentId:null,collapsed:!1,clipped:!1};i.push(c);const l=Na(n,e),d=l.getContext("2d"),f={id:`layer-${t}`,type:"raster",name:`Layer ${t}`,canvas:l,context:d,visible:!0,opacity:1,blendMode:"source-over",isPaper:!1,parentId:null,collapsed:!1,clipped:!1};i.push(f);let v=f.id;const x={get layers(){return i},get activeLayerId(){return v},set activeLayerId(b){v!==b&&(v=b,s())},createLayer(b,E,h=!1,p){t++;const T=Na(n,e),u=T.getContext("2d");p&&(u.fillStyle=p,u.fillRect(0,0,n,e));let m=E;if(m===void 0){const g=i.find(w=>w.id===v);(g==null?void 0:g.type)==="folder"?m=g.id:g!=null&&g.parentId?m=g.parentId:m=null}const S={id:`layer-${Date.now()}-${t}`,type:"raster",name:b||`Layer ${t}`,canvas:T,context:u,visible:!0,opacity:1,blendMode:"source-over",isPaper:h,parentId:m,collapsed:!1,clipped:!1},y=i.findIndex(g=>g.id===v);return y!==-1?i.splice(y+1,0,S):i.push(S),v=S.id,s(),S},createFolder(b,E=null,h=!1){t++;const p={id:`folder-${Date.now()}-${t}`,type:"folder",name:b||(h?`Animation Folder ${t}`:`Folder ${t}`),visible:!0,opacity:1,blendMode:"source-over",isAnimationFolder:h,parentId:E,collapsed:!1,clipped:!1},T=i.findIndex(u=>u.id===v);return T!==-1?i.splice(T+1,0,p):i.push(p),v=p.id,s(),p},createAnimationFolder(b){return x.createFolder(b,null,!0)},deleteLayer(b){if(i.length<=1)return!1;const E=i.find(T=>T.id===b);if(!E||E.isPaper)return!1;const h=new Set([b]);let p=!0;for(;p;){p=!1;for(const T of i)T.parentId&&h.has(T.parentId)&&!h.has(T.id)&&(h.add(T.id),p=!0)}if(h.size>=i.length)return!1;for(let T=i.length-1;T>=0;T--)h.has(i[T].id)&&i.splice(T,1);return h.has(v)&&(v=i[i.length-1].id),s(),!0},renameLayer(b,E){const h=E.trim();if(!h)return;const p=i.find(T=>T.id===b);p&&p.name!==h&&(p.name=h,s())},toggleFolderCollapse(b){const E=i.find(h=>h.id===b&&h.type==="folder");E&&(E.collapsed=!E.collapsed,s())},toggleLayerClipping(b){const E=i.find(h=>h.id===b);E&&!E.isPaper&&(E.clipped=!E.clipped,s())},setLayerBoneBinding(b,E,h){const p=i.find(T=>T.id===b);!p||p.isPaper||(p.boundBoneId=E,h!==void 0&&(p.meshSkinningEnabled=h),s())},moveToFolder(b,E){const h=i.find(p=>p.id===b);if(!h||h.isPaper||h.id===E)return!1;if(E!==null){let p=i.find(T=>T.id===E);for(;p;){if(p.id===h.id)return!1;p=p.parentId?i.find(T=>T.id===p.parentId):void 0}}return h.parentId=E,s(),!0},getActiveLayer(){return i.find(b=>b.id===v)??i[i.length-1]},getActiveDrawableLayer(){const b=i.find(h=>h.id===v);if(b&&b.type==="raster"&&b.context)return b;if(b&&b.type==="folder"){const h=i.find(p=>p.parentId===b.id&&p.type==="raster"&&p.context);if(h)return h}const E=[...i].reverse().find(h=>h.type==="raster"&&h.context&&!h.isPaper);return E||x.createLayer()},setActiveLayer(b){v!==b&&(v=b,s())},setLayerVisibility(b,E){const h=i.find(p=>p.id===b);h&&h.visible!==E&&(h.visible=E,s())},setLayerOpacity(b,E){const h=i.find(p=>p.id===b);h&&(h.opacity=Math.max(0,Math.min(1,E)),s())},setLayerBlendMode(b,E){const h=i.find(p=>p.id===b);h&&(h.blendMode=E,s())},moveLayer(b,E){if(b<0||b>=i.length||E<0||E>=i.length||b===E)return;const[h]=i.splice(b,1);i.splice(E,0,h),s()},moveLayerBranch(b,E){const h=i.find(w=>w.id===b);if(!h||h.isPaper)return!1;const p=i.filter(w=>w.parentId===h.parentId),T=p.findIndex(w=>w.id===h.id);if(T===-1)return!1;let u;if(E==="up"){if(T>=p.length-1)return!1;u=p[T+1]}else if(T<=0||(u=p[T-1],u.isPaper))return!1;const m=new Set([h.id]);let S=!0;for(;S;){S=!1;for(const w of i)w.parentId&&m.has(w.parentId)&&!m.has(w.id)&&(m.add(w.id),S=!0)}const y=i.filter(w=>m.has(w.id));for(let w=i.length-1;w>=0;w--)m.has(i[w].id)&&i.splice(w,1);const g=new Set([u.id]);for(S=!0;S;){S=!1;for(const w of i)w.parentId&&g.has(w.parentId)&&!g.has(w.id)&&(g.add(w.id),S=!0)}if(E==="up"){let w=-1;for(let _=i.length-1;_>=0;_--)if(g.has(i[_].id)){w=_;break}i.splice(w+1,0,...y)}else{const w=i.findIndex(_=>_.id===u.id);i.splice(w,0,...y)}return s(),!0},subscribe(b){return r.add(b),()=>{r.delete(b)}}};return x}function a0(n,e,t,i,r,s,o,a,c){if(n.save(),n.strokeStyle=c,n.fillStyle=c,n.lineWidth=Math.max(1,Math.round(a)),n.lineCap="round",n.lineJoin="round",n.beginPath(),s==="line")n.moveTo(e,t),n.lineTo(i,r),n.stroke();else if(s==="rectangle"){const l=Math.min(e,i),d=Math.min(t,r),f=Math.abs(i-e),v=Math.abs(r-t);o==="fill"?n.fillRect(l,d,f,v):n.strokeRect(l,d,f,v)}else if(s==="ellipse"){const l=(e+i)/2,d=(t+r)/2,f=Math.abs(i-e)/2,v=Math.abs(r-t)/2;n.ellipse(l,d,Math.max(.1,f),Math.max(.1,v),0,0,Math.PI*2),o==="fill"?n.fill():n.stroke()}n.restore()}const o0=256,Ql=2,l0={none:0,weak:.6,medium:1.1,strong:1.8},Rs=new Map;function c0(n){const e=n.startsWith("#")?n.slice(1):n;if(/^[0-9a-fA-F]{3}$/.test(e)){const t=parseInt(e[0]+e[0],16),i=parseInt(e[1]+e[1],16),r=parseInt(e[2]+e[2],16);return[t,i,r]}if(/^[0-9a-fA-F]{6}$/.test(e)){const t=parseInt(e.slice(0,2),16),i=parseInt(e.slice(2,4),16),r=parseInt(e.slice(4,6),16);return[t,i,r]}return[0,0,0]}function d0(n,e,t,i,r,s){const o=n/2,a=r==="square",c=Math.max(.1,s),l=l0[i],d=Math.max(l,o*(1-e)),f=(a?o*Math.sqrt(1+c*c):o)+d/2,v=Math.max(Ql,Math.ceil(f-o)+Ql),x=Math.max(2,Math.ceil(n))+v*2,b=document.createElement("canvas");b.width=x,b.height=x;const E=b.getContext("2d"),h=E.createImageData(x,x),p=h.data,[T,u,m]=c0(t),S=x/2,y=d<=1e-4,g=i==="none";let w=0;for(let _=0;_<x;_++){const M=(_+.5-S)/c;for(let C=0;C<x;C++){const D=C+.5-S;let G;if(a){const k=Math.abs(D)-o,F=Math.abs(M)-o,$=k>0?k:0,ee=F>0?F:0;G=Math.hypot($,ee)+Math.min(Math.max(k,F),0)}else G=Math.hypot(D,M)-o;let P;y?P=G<0?1:0:(P=(d*.5-G)/d,P<0?P=0:P>1&&(P=1)),g&&(P=P>=.5?1:0),p[w]=T,p[w+1]=u,p[w+2]=m,p[w+3]=P*255,w+=4}}return E.putImageData(h,0,0),b}function Zc(n){const e=Math.max(.4,n.diameter),t=Math.min(1,Math.max(0,n.hardness)),i=n.color||"#000000",r=n.antiAliasing??"medium",s=n.tipShape??"circle",o=Math.min(1,Math.max(.1,n.tipRoundness??1)),a=e>20?.5:.25,c=Math.max(.4,Math.round(e/a)*a),l=`${c.toFixed(2)}:${t.toFixed(3)}:${i}:${r}:${s}:${o.toFixed(2)}`;let d=Rs.get(l);return d||(Rs.size>=o0&&Rs.clear(),d=d0(c,t,i,r,s,o),Rs.set(l,d)),d}const Pt=1600,Dt=900,Jc=.4,ec=.35,u0=2e4;function Ka(n){return n<0?0:n>1?1:n}function Ir(n,e,t){const i=Ka(e),r=n.pressureSize?Math.pow(i,Math.max(.1,n.pressureCurve)):1;let s=1;if(n.taperStart>0){const a=Math.min(1,t/n.taperStart);s=a*a*(3-2*a)}const o=n.minSizeRatio+(1-n.minSizeRatio)*r*s;return Math.max(Jc,n.size*o)}function Qc(n,e){const t=Ka(e),i=n.pressureFlow?n.flow*Math.pow(t,1.2):n.flow,r=Ka(i);if(n.inkMode==="uniform")return Math.max(.04,r);if(r>=.88)return 1;const s=Math.max(.2,n.spacing*2.5),o=1-Math.pow(1-r,s);return Math.min(1,Math.max(.04,o))}function tc(n,e,t){const i=n.followDirection&&n.tipShape!=="calligraphic";let r=0;return i&&(e!==0||t!==0)&&(r=Math.atan2(t,e)*180/Math.PI),(n.tipAngle+r)*Math.PI/180}function Pr(n,e){const t=document.createElement("canvas");return t.width=n,t.height=e,t}function p0(n,e){let t=n;for(;t;){if(!t.visible)return!1;t=t.parentId?e.get(t.parentId):void 0}return!0}function nc(n,e){let t=n.opacity,i=n.parentId?e.get(n.parentId):void 0;for(;i;)t*=i.opacity,i=i.parentId?e.get(i.parentId):void 0;return t}function f0(){const n=s0(Pt,Dt),e=Pr(Pt,Dt),t=Pr(Pt,Dt),i=Pr(Pt,Dt),r=Pr(Pt,Dt),s=Pr(Pt,Dt),o=e.getContext("2d"),a=t.getContext("2d"),c=i.getContext("2d"),l=r.getContext("2d"),d=s.getContext("2d"),f=i0(30);let v=null,x=null,b=0,E=0,h=1,p=0,T=0,u=1,m=0,S=0,y=0,g={...pt().brush},w=null,_="";function M(N,q,U,H,I,B,V){const Y=g,se=Zc({diameter:I,hardness:Y.hardness,color:q?"#000000":Y.color,antiAliasing:Y.antiAliasing,tipShape:Y.tipShape,tipRoundness:Y.tipRoundness}),ue=Qc(Y,B),be=se.width,ne=se.height,W=Y.tipShape!=="square"&&Y.tipRoundness>=.999;N.save(),q&&(N.globalCompositeOperation="destination-out"),N.globalAlpha=ue,!W&&V!==0?(N.translate(U,H),N.rotate(V),N.drawImage(se,-be/2,-ne/2)):N.drawImage(se,U-be/2,H-ne/2),N.restore()}function C(N,q,U,H,I,B,V,Y){const se=g,ue=B-U,be=V-H,ne=Math.hypot(ue,be);if(ne===0)return;const W=Math.min(.5,Math.max(.03,se.spacing)),Ce=tc(se,ue,be);m=Ce;let oe=0,Ae=S,ge=0;for(;!(++ge>u0);){const Ve=oe/ne,Ue=I+(Y-I)*Ve;let A=Math.max(ec,Ir(se,Ue,y+oe)*W)-Ae;if(A<0&&(A=0),oe+A>ne){Ae+=ne-oe;break}oe+=A,Ae=0;const J=oe/ne,de=I+(Y-I)*J;M(N,q,U+ue*J,H+be*J,Ir(se,de,y+oe),de,Ce)}y+=ne,S=Ae}function D(){return n.getActiveDrawableLayer().context??null}function G(N){const q=g;if(q.taperEnd<=0)return;const U=Math.hypot(N.vx,N.vy);if(U<=.5)return;const H=x==="erase",I=H?D():o;if(!I)return;const B=N.vx/U,V=N.vy/U,Y=Math.max(1,N.isMouse?q.taperEnd:Math.min(q.taperEnd,U*2.5)),se=Math.min(.5,Math.max(.03,q.spacing)),ue=Ir(q,h,y),be=m;let ne=0,W=0;for(;ne<=Y&&W++<4e3;){const Ce=Math.pow(1-ne/Y,1.5),oe=Math.max(Jc,ue*Ce);M(I,H,b+B*ne,E+V*ne,oe,h*Ce,be),ne+=Math.max(ec,oe*se)}}function P(){if(!x)return;const N=n.getActiveDrawableLayer();x==="paint"&&Math.hypot(p-b,T-E)>.5&&(C(o,!1,b,E,h,p,T,u),b=p,E=T,h=u),(x==="paint"||x==="shape")&&(N.context&&(N.context.globalAlpha=pt().brush.opacity,N.context.drawImage(e,0,0),N.context.globalAlpha=1),o.clearRect(0,0,Pt,Dt)),w&&(f.push(_,w),k.delete(_),w=null),X.compositeDirty=!0,x=null}const k=new Map;function F(N,q,U){const H=pt(),I=H.tool==="bone";if(!(!H.showBonesOverlay&&!I)&&q.size!==0){N.save();for(const B of q.values()){if(!B.parentId)continue;const V=q.get(B.parentId);if(!V)continue;Math.hypot(B.headX-V.tailX,B.headY-V.tailY)>2&&(N.beginPath(),N.setLineDash([4,4]),N.strokeStyle="rgba(255, 255, 255, 0.45)",N.lineWidth=1.5,N.moveTo(V.tailX,V.tailY),N.lineTo(B.headX,B.headY),N.stroke(),N.setLineDash([]))}for(const B of q.values()){const V=B.id===U,Y=B.tailX-B.headX,se=B.tailY-B.headY,ue=Math.max(1,Math.hypot(Y,se)),be=Y/ue,ne=se/ue,W=-ne,Ce=be,oe=Math.min(ue*.22,24),Ae=Math.max(5,Math.min(14,ue*.1)),ge=B.headX+be*oe,Ve=B.headY+ne*oe;if(N.beginPath(),N.moveTo(B.headX,B.headY),N.lineTo(ge+W*Ae,Ve+Ce*Ae),N.lineTo(B.tailX,B.tailY),N.lineTo(ge-W*Ae,Ve-Ce*Ae),N.closePath(),N.fillStyle=V?"rgba(255, 212, 59, 0.48)":`${B.color}44`,N.fill(),N.lineWidth=V?2.4:1.6,N.strokeStyle=V?"#ffd43b":B.color,N.stroke(),N.beginPath(),N.arc(B.headX,B.headY,V?6.5:5,0,Math.PI*2),N.fillStyle=V?"#ffd43b":"#161616",N.fill(),N.lineWidth=2,N.strokeStyle=V?"#ffffff":B.color,N.stroke(),N.beginPath(),N.arc(B.tailX,B.tailY,V?6:4.5,0,Math.PI*2),N.fillStyle=H.boneMode==="pose_ik"?"#ff6b6b":B.color,N.fill(),N.lineWidth=1.5,N.strokeStyle="#111111",N.stroke(),I||V){N.font="600 11px sans-serif";const Ue=(B.headX+B.tailX)/2,L=(B.headY+B.tailY)/2-8;N.fillStyle="rgba(0, 0, 0, 0.75)",N.fillText(B.name,Ue+1,L+1),N.fillStyle=V?"#ffd43b":"#ffffff",N.fillText(B.name,Ue,L)}}N.restore()}}function $(){var be;a.clearRect(0,0,Pt,Dt);const N=new Map(n.layers.map(ne=>[ne.id,ne])),q=n.getActiveDrawableLayer(),U=v&&v.bones.length>0?v.getEvaluatedBones(v.settings.currentFrame):null;function H(ne){let W=ne;for(;W;){if(W.boundBoneId)return W.boundBoneId;W=W.parentId?N.get(W.parentId):void 0}return null}function I(ne){let W=ne;for(;W;){if(W.meshSkinningEnabled)return!0;W=W.parentId?N.get(W.parentId):void 0}return!1}function B(ne,W,Ce){if(!W.canvas)return;const oe=v&&!W.isPaper?v.getLayerTransformAtFrame(W,v.settings.currentFrame):null;ne.save();const Ae=oe?Ce*oe.opacity:Ce;if(ne.globalAlpha=Math.max(0,Math.min(1,Ae)),ne.globalCompositeOperation=W.blendMode,oe&&(oe.x!==0||oe.y!==0||oe.scaleX!==1||oe.scaleY!==1||oe.rotation!==0)){const L=Pt/2,A=Dt/2;ne.translate(L+oe.x,A+oe.y),oe.rotation!==0&&ne.rotate(oe.rotation*Math.PI/180),(oe.scaleX!==1||oe.scaleY!==1)&&ne.scale(oe.scaleX,oe.scaleY),ne.translate(-L,-A)}const ge=!W.isPaper&&U&&U.size>0&&I(W),Ve=!W.isPaper&&U?H(W):null,Ue=Ve&&U?U.get(Ve):void 0;if(ge&&v&&U){let L=k.get(W.id);if(!L||L.boneCount!==v.bones.length){const A=Mg(W.id,W.canvas,v.bones,10,10);A&&(L={boneCount:v.bones.length,mesh:A},k.set(W.id,L))}L?Sg(ne,W.canvas,L.mesh,U):ne.drawImage(W.canvas,0,0)}else if(Ue){const[L,A,J,de,ce,le]=Ue.skinMatrix;ne.transform(L,A,J,de,ce,le),ne.drawImage(W.canvas,0,0)}else ne.drawImage(W.canvas,0,0);W.id===q.id&&(x==="paint"||x==="shape")&&(ne.globalAlpha=Math.max(0,Math.min(1,Ae*pt().brush.opacity)),ne.drawImage(e,0,0)),ne.restore()}const V=n.layers.find(ne=>ne.isPaper&&ne.visible);if(V&&V.canvas&&B(a,V,V.opacity),v&&v.onionSkin.enabled&&v.tracks.length>0)for(const ne of v.tracks){if(!ne.visible)continue;const W=v.getOnionSkinCels(ne.id,v.settings.currentFrame);for(const Ce of W){if(!Ce.layer.canvas)continue;d.clearRect(0,0,Pt,Dt),d.save();const oe=Pt/2,Ae=Dt/2;if(Ce.transform&&(Ce.transform.x!==0||Ce.transform.y!==0||Ce.transform.scaleX!==1||Ce.transform.scaleY!==1||Ce.transform.rotation!==0)&&(d.translate(oe+Ce.transform.x,Ae+Ce.transform.y),d.rotate(Ce.transform.rotation*Math.PI/180),d.scale(Ce.transform.scaleX,Ce.transform.scaleY),d.translate(-oe,-Ae)),Ce.onionTransform){const ge=Ce.onionTransform,Ve=ge.rotation*Math.PI/180,Ue=ge.scaleX*(ge.flipX?-1:1),L=ge.scaleY*(ge.flipY?-1:1);d.translate(oe+ge.x,Ae+ge.y),Ve!==0&&d.rotate(Ve),(Ue!==1||L!==1)&&d.scale(Ue,L),d.translate(-oe,-Ae)}d.drawImage(Ce.layer.canvas,0,0),d.restore(),v.onionSkin.mode==="tint"&&Ce.tintColor&&(d.save(),d.globalCompositeOperation="source-in",d.fillStyle=Ce.tintColor,d.fillRect(0,0,Pt,Dt),d.restore()),a.save(),a.globalAlpha=Ce.opacity*(((be=Ce.transform)==null?void 0:be.opacity)??1),a.drawImage(s,0,0),a.restore()}}const se=r0(n.layers).filter(ne=>!(ne.type!=="raster"||!ne.canvas||ne.isPaper||!p0(ne,N)||v&&!v.isLayerVisibleAtFrame(ne,v.settings.currentFrame)));let ue=0;for(;ue<se.length;){const ne=se[ue],W=nc(ne,N),Ce=[];let oe=ue+1;for(;oe<se.length&&se[oe].clipped;)Ce.push(se[oe]),oe++;if(Ce.length===0)B(a,ne,W),ue++;else{c.clearRect(0,0,Pt,Dt),B(c,ne,1);for(const Ae of Ce){const ge=nc(Ae,N);l.clearRect(0,0,Pt,Dt),B(l,Ae,ge),l.save(),l.globalCompositeOperation="destination-in",l.drawImage(ne.canvas,0,0),l.restore(),c.save(),c.globalCompositeOperation=Ae.blendMode,c.drawImage(r,0,0),c.restore()}a.save(),a.globalAlpha=W,a.globalCompositeOperation=ne.blendMode,a.drawImage(i,0,0),a.restore(),ue=oe}}v&&U&&U.size>0&&!v.settings.isPlaying&&F(a,U,v.selectedBoneId),X.compositeDirty=!1}function ee(N,q,U,H){const I=n.getActiveDrawableLayer();I.context&&(w=I.context.getImageData(0,0,Pt,Dt),_=I.id,g={...pt().brush},x=H?"erase":"paint",b=N,E=q,h=U,p=N,T=q,u=U,m=tc(g,0,0),S=0,y=0,M(H?I.context:o,H,N,q,Ir(g,U,0),U,m),X.compositeDirty=!0)}n.subscribe(()=>{X.compositeDirty=!0});const X={layerManager:n,strokeCanvas:e,compositeCanvas:t,compositeDirty:!0,setTimelineManager(N){v=N,N.subscribe(()=>{pt().boneMode==="rig"&&k.clear(),X.compositeDirty=!0}),X.compositeDirty=!0},getTimelineManager(){return v},beginStroke(N,q,U){P(),ee(N,q,U,!1)},continueStroke(N,q,U){if(x!=="paint")return;p=N,T=q,u=U;const H=Math.min(20,Math.max(0,g.stabilization));let I=N,B=q,V=U;if(H>0){const Y=1/(1+H*.4);I=b+(N-b)*Y,B=E+(q-E)*Y,V=h+(U-h)*Y}C(o,!1,b,E,h,I,B,V),b=I,E=B,h=V,X.compositeDirty=!0},beginErase(N,q,U){P(),ee(N,q,U,!0)},continueErase(N,q,U){if(x!=="erase")return;const H=n.getActiveDrawableLayer();if(!H.context)return;p=N,T=q,u=U;const I=Math.min(20,Math.max(0,g.stabilization));let B=N,V=q,Y=U;if(I>0){const se=1/(1+I*.4);B=b+(N-b)*se,V=E+(q-E)*se,Y=h+(U-h)*se}C(H.context,!0,b,E,h,B,V,Y),b=B,E=V,h=Y,X.compositeDirty=!0},beginShape(N,q){P();const U=n.getActiveDrawableLayer();U.context&&(w=U.context.getImageData(0,0,Pt,Dt),_=U.id,x="shape",b=N,E=q,o.clearRect(0,0,Pt,Dt),X.compositeDirty=!0)},updateShape(N,q){if(x!=="shape")return;o.clearRect(0,0,Pt,Dt);const{size:U,color:H,shapeType:I,shapeFill:B}=pt().brush;a0(o,b,E,N,q,I,B,U,H),X.compositeDirty=!0},endStroke(N){(x==="paint"||x==="erase")&&N&&G(N),P()},fill(N,q,U,H){x&&P();const I=n.getActiveDrawableLayer();if(!I.context)return;const B=I.context.getImageData(0,0,Pt,Dt);f.push(I.id,B),n0(I.context,N,q,U,H),k.delete(I.id),X.compositeDirty=!0},undo(){x&&P();const N=n.getActiveDrawableLayer();if(!N.context)return!1;const q=N.context.getImageData(0,0,Pt,Dt),U=f.undo(N.id,q);if(!U)return!1;const H=n.layers.find(I=>I.id===U.layerId);return H&&H.context?(H.context.putImageData(U.data,0,0),k.delete(H.id),X.compositeDirty=!0,!0):!1},redo(){x&&P();const N=n.getActiveDrawableLayer();if(!N.context)return!1;const q=N.context.getImageData(0,0,Pt,Dt),U=f.redo(N.id,q);if(!U)return!1;const H=n.layers.find(I=>I.id===U.layerId);return H&&H.context?(H.context.putImageData(U.data,0,0),k.delete(H.id),X.compositeDirty=!0,!0):!1},canUndo(){return f.canUndo()},canRedo(){return f.canRedo()},updateComposite:$};return ro(()=>{X.compositeDirty=!0}),$(),X}const h0=.25,ic=6;function m0(n){const e=n.getCoalescedEvents;if(typeof e!="function")return[n];try{const t=e.call(n);return t&&t.length>0?t:[n]}catch{return[n]}}function rc(n){return n.pointerType==="pen"?n.pressure>0?n.pressure:.5:1}function g0(n){const{canvas:e,camera:t,plane:i,engine:r,docW:s,docH:o,onPickColor:a}=n,c=new xg,l=new xt;let d=null,f=null,v="mouse",x=null,b=!1,E=!1,h=0,p=0,T=0,u=0,m=0,S=0,y=[],g=null,w=0,_=0,M=1;function C(){E?e.style.cursor="grabbing":b||Rr()==="hand"?e.style.cursor="grab":Rr()==="eyedropper"?e.style.cursor="cell":Rr()==="bone"?e.style.cursor="pointer":e.style.cursor="crosshair"}const D=ro(()=>C());C();const G=I=>{const B=e.getBoundingClientRect();l.x=(I.clientX-B.left)/B.width*2-1,l.y=-((I.clientY-B.top)/B.height)*2+1,c.setFromCamera(l,t);const V=c.intersectObject(i,!1);return V.length===0||!V[0].uv?null:{x:V[0].uv.x*s,y:(1-V[0].uv.y)*o}},P=(I,B,V)=>{d==="eraser"?r.continueErase(I,B,V):d==="brush"&&r.continueStroke(I,B,V)},k=(I,B,V)=>{const Y={x:I,y:B,p:V};if(y.length===0){y.push(Y),g=Y;return}const se=y[y.length-1],ue=y.length>=2?y[y.length-2]:y[0],be=(ue.x+se.x)/2,ne=(ue.y+se.y)/2,W=(ue.p+se.p)/2,Ce=(se.x+Y.x)/2,oe=(se.y+Y.y)/2,Ae=(se.p+Y.p)/2;for(let ge=1;ge<=ic;ge++){const Ve=ge/ic,Ue=1-Ve,L=Ue*Ue*be+2*Ue*Ve*se.x+Ve*Ve*Ce,A=Ue*Ue*ne+2*Ue*Ve*se.y+Ve*Ve*oe,J=W+(Ae-W)*Ve;P(L,A,J)}g={x:Ce,y:oe,p:Ae},y.push(Y),y.length>3&&y.shift()},F=(I,B)=>{const V=I.x-m,Y=I.y-S;if(Math.hypot(V,Y)<h0)return;w=w*.55+V*.45,_=_*.55+Y*.45,m=I.x,S=I.y,M=B;const se=pt().brush.stabilization;if(se<=0)T=I.x,u=I.y;else{const ue=1/(1+se*.35);T+=(I.x-T)*ue,u+=(I.y-u)*ue}k(T,u,B)},$=I=>{const B=d==="bone";if(d==="brush"||d==="eraser"){const V=pt().brush.stabilization;if(V>0){const Y=1/(1+V*.35);for(let se=0;se<3;se++)T+=(m-T)*Y,u+=(S-u)*Y}else T=m,u=S;k(T,u,M),g&&(P(T,u,M),g={x:T,y:u,p:M})}if(d=null,x=null,I!==void 0&&e.hasPointerCapture(I))try{e.releasePointerCapture(I)}catch{}f=null,B||r.endStroke({vx:w,vy:_,isMouse:v!=="pen"})},ee=I=>{if(b||Rr()==="hand"||I.button===1){E=!0,h=I.clientX,p=I.clientY,f=I.pointerId;try{e.setPointerCapture(I.pointerId)}catch{}C();return}if(d)return;const B=Rr(),V=G(I);if(!V)return;if(B==="eyedropper"){const ue=r.compositeCanvas.getContext("2d"),[be,ne,W]=ue.getImageData(Math.floor(V.x),Math.floor(V.y),1,1).data,Ce="#"+[be,ne,W].map(oe=>oe.toString(16).padStart(2,"0")).join("");a==null||a(Ce);return}if(B==="bucket"){const{color:ue,tolerance:be}=pt().brush;r.fill(Math.floor(V.x),Math.floor(V.y),ue,be);return}if(B==="bone"){const ue=r.getTimelineManager();if(!ue)return;const be=pt().boneMode,ne=ue.hitTestBoneAtWorld(V.x,V.y,ue.settings.currentFrame);f=I.pointerId,v=I.pointerType||"mouse";try{e.setPointerCapture(I.pointerId)}catch{}if(d="bone",be==="rig"){if(ne&&!I.shiftKey)ue.selectBone(ne.bone.id),ne.part==="tail"?x={kind:"rig_tail",boneId:ne.bone.id,startDocX:V.x,startDocY:V.y,headX:ne.evalBone.headX,headY:ne.evalBone.headY,startAngleDeg:0,startDRotation:0,startDX:0,startDY:0}:x={kind:"rig_head",boneId:ne.bone.id,startDocX:V.x,startDocY:V.y,headX:ne.evalBone.headX,headY:ne.evalBone.headY,startAngleDeg:0,startDRotation:0,startDX:ne.evalBone.headX-V.x,startDY:ne.evalBone.headY-V.y};else{const W=ne?ne.bone.id:I.altKey?null:ue.selectedBoneId,Ce=ne&&ne.part==="tail"?ne.evalBone.tailX:V.x,oe=ne&&ne.part==="tail"?ne.evalBone.tailY:V.y;x={kind:"rig_tail",boneId:ue.createBoneFromWorld(Ce,oe,V.x+24,V.y,W).id,startDocX:Ce,startDocY:oe,headX:Ce,headY:oe,startAngleDeg:0,startDRotation:0,startDX:0,startDY:0}}return}if(be==="pose_fk"){if(!ne){ue.selectBone(null);return}ue.selectBone(ne.bone.id);const Ce=ue.getInterpolatedBonePoses(ue.settings.currentFrame).get(ne.bone.id)??{dX:0,dY:0,dRotation:0};if(ne.part==="head"&&!ne.bone.parentId||I.shiftKey)x={kind:"pose_fk_move",boneId:ne.bone.id,startDocX:V.x,startDocY:V.y,headX:ne.evalBone.headX,headY:ne.evalBone.headY,startAngleDeg:0,startDRotation:Ce.dRotation,startDX:Ce.dX,startDY:Ce.dY};else{const oe=Math.atan2(V.y-ne.evalBone.headY,V.x-ne.evalBone.headX)*180/Math.PI;x={kind:"pose_fk_rotate",boneId:ne.bone.id,startDocX:V.x,startDocY:V.y,headX:ne.evalBone.headX,headY:ne.evalBone.headY,startAngleDeg:oe,startDRotation:Ce.dRotation,startDX:Ce.dX,startDY:Ce.dY}}return}if(be==="pose_ik"){const W=ne?ne.bone.id:ue.selectedBoneId;if(!W)return;ue.selectBone(W),x={kind:"pose_ik",boneId:W,startDocX:V.x,startDocY:V.y,headX:V.x,headY:V.y,startAngleDeg:0,startDRotation:0,startDX:0,startDY:0},ue.applyTwoBoneIKAtFrame(ue.settings.currentFrame,W,V.x,V.y);return}return}f=I.pointerId,v=I.pointerType||"mouse";try{e.setPointerCapture(I.pointerId)}catch{}if(B==="shape"){d="shape",r.beginShape(V.x,V.y);return}const Y=rc(I);T=V.x,u=V.y,m=V.x,S=V.y,M=Y,w=0,_=0,y=[{x:V.x,y:V.y,p:Y}],g=y[0],B==="eraser"||pt().isTransparentColor?(d="eraser",r.beginErase(V.x,V.y,Y)):(d="brush",r.beginStroke(V.x,V.y,Y))},X=I=>{if(E){const B=I.clientX-h,V=I.clientY-p;h=I.clientX,p=I.clientY;const se=(t.top-t.bottom)/t.zoom/window.innerHeight;t.position.x-=B*se,t.position.y+=V*se;return}if(d){if(d==="bone"){const B=r.getTimelineManager(),V=G(I);if(!B||!V||!x)return;if(x.kind==="rig_tail")B.updateBoneEndpointWorld(x.boneId,V.x,V.y);else if(x.kind==="rig_head")B.moveBoneHeadWorld(x.boneId,V.x+x.startDX,V.y+x.startDY);else if(x.kind==="pose_fk_move")B.setBonePoseAtFrame(B.settings.currentFrame,x.boneId,{dX:x.startDX+(V.x-x.startDocX),dY:x.startDY+(V.y-x.startDocY)});else if(x.kind==="pose_fk_rotate"){let se=Math.atan2(V.y-x.headY,V.x-x.headX)*180/Math.PI-x.startAngleDeg;for(;se>180;)se-=360;for(;se<-180;)se+=360;B.setBonePoseAtFrame(B.settings.currentFrame,x.boneId,{dRotation:Math.round((x.startDRotation+se)*10)/10})}else x.kind==="pose_ik"&&B.applyTwoBoneIKAtFrame(B.settings.currentFrame,x.boneId,V.x,V.y);return}if(d==="shape"){const B=G(I);B&&r.updateShape(B.x,B.y);return}for(const B of m0(I)){const V=G(B);V&&F(V,rc(B))}}},N=I=>{if(E){if(E=!1,e.hasPointerCapture(I.pointerId))try{e.releasePointerCapture(I.pointerId)}catch{}f=null,C();return}d&&$(I.pointerId)},q=I=>{I.preventDefault();const B=I.deltaY<0?1.12:.88;t.zoom=Math.max(.1,Math.min(25,t.zoom*B)),t.updateProjectionMatrix()},U=I=>{if(I.target instanceof HTMLInputElement||I.target instanceof HTMLTextAreaElement)return;if(I.code==="Space"&&!I.repeat){I.preventDefault(),b=!0,C();return}const B=I.ctrlKey||I.metaKey,V=I.key.toLowerCase();if(B&&V==="z"&&!I.shiftKey){I.preventDefault(),r.undo();return}if(B&&(V==="y"||I.shiftKey&&V==="z")){I.preventDefault(),r.redo();return}if(B&&V==="0"){I.preventDefault(),t.position.set(0,0,10),t.zoom=1,t.updateProjectionMatrix();return}!B&&!I.altKey&&(V==="p"?Qn("pen"):V==="b"?Qn("brush"):V==="e"?Qn("eraser"):V==="i"?Qn("eyedropper"):V==="g"?Qn("bucket"):V==="u"?Qn("shape"):V==="j"?Qn("bone"):V==="h"?Qn("hand"):V==="x"?Kc():V==="c"&&jc())},H=I=>{I.code==="Space"&&(b=!1,C())};return e.addEventListener("pointerdown",ee),e.addEventListener("pointermove",X),e.addEventListener("pointerup",N),e.addEventListener("pointercancel",N),e.addEventListener("wheel",q,{passive:!1}),window.addEventListener("keydown",U),window.addEventListener("keyup",H),{dispose:()=>{D(),d&&$(f??void 0),e.removeEventListener("pointerdown",ee),e.removeEventListener("pointermove",X),e.removeEventListener("pointerup",N),e.removeEventListener("pointercancel",N),e.removeEventListener("wheel",q),window.removeEventListener("keydown",U),window.removeEventListener("keyup",H)}}}const v0=[{id:"source-over",label:"Normal"},{id:"multiply",label:"Multiply"},{id:"screen",label:"Screen"},{id:"overlay",label:"Overlay"},{id:"darken",label:"Darken"},{id:"lighten",label:"Lighten"},{id:"color-dodge",label:"Color Dodge"},{id:"difference",label:"Difference"}];function _0(n,e){let t=0,i=n.parentId?e.get(n.parentId):void 0;for(;i;)t++,i=i.parentId?e.get(i.parentId):void 0;return t}function x0(n,e){let t=n.parentId?e.get(n.parentId):void 0;for(;t;){if(t.collapsed)return!0;t=t.parentId?e.get(t.parentId):void 0}return!1}function y0(n){const e=[],t=r=>n.filter(s=>s.parentId===r).reverse();function i(r){const s=t(r);for(const o of s)e.push(o),o.type==="folder"&&i(o.id)}return i(null),e}function b0(n,e,t){n.innerHTML="",n.style.position="absolute",n.style.top="0",n.style.right="0",n.style.bottom="0",n.style.width="var(--right-dock-width, 250px)",n.style.pointerEvents="auto",n.style.zIndex="100",n.style.display="block";const i=document.createElement("aside");i.className="layers-panel";const r=document.createElement("div");r.className="csp-layers-width-resizer",r.title="Arrastrar para cambiar el ancho del panel de capas";const s=localStorage.getItem("oniri.layers.width");if(s){const F=Math.max(180,Math.min(480,Number(s)));document.documentElement.style.setProperty("--right-dock-width",`${F}px`)}let o=!1,a=0,c=250;r.addEventListener("pointerdown",F=>{F.preventDefault(),F.stopPropagation(),o=!0,a=F.clientX,c=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--right-dock-width"))||250,r.classList.add("dragging"),r.setPointerCapture(F.pointerId)}),r.addEventListener("pointermove",F=>{if(!o)return;const $=F.clientX-a,ee=Math.max(180,Math.min(480,c-$));document.documentElement.style.setProperty("--right-dock-width",`${ee}px`),localStorage.setItem("oniri.layers.width",String(ee))});const l=F=>{if(o){o=!1,r.classList.remove("dragging");try{r.releasePointerCapture(F.pointerId)}catch{}}};r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),i.appendChild(r);const d=document.createElement("div");d.className="layers-tab-header";const f=document.createElement("div");f.className="layers-tab-title active",f.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
    <span>Layer</span>
  `,d.appendChild(f),i.appendChild(d);const v=document.createElement("div");v.className="layer-controls-row";const x=document.createElement("select");x.className="layer-blend-select";for(const F of v0){const $=document.createElement("option");$.value=F.id,$.textContent=F.label,x.appendChild($)}x.addEventListener("change",()=>{e.setLayerBlendMode(e.activeLayerId,x.value)}),v.appendChild(x);const b=document.createElement("div");b.className="layer-opacity-box";const E=document.createElement("span");E.className="layer-opacity-label",E.textContent="100%";const h=document.createElement("input");h.type="range",h.className="layer-opacity-slider",h.min="0",h.max="100",h.step="1",h.value="100",h.addEventListener("input",()=>{const F=Number(h.value);E.textContent=`${F}%`,e.setLayerOpacity(e.activeLayerId,F/100)}),b.append(h,E),v.appendChild(b),i.appendChild(v);const p=document.createElement("div");p.className="layer-folder-assign-row",p.innerHTML='<span class="assign-label">Parent:</span>';const T=document.createElement("select");T.className="layer-folder-select",T.addEventListener("change",()=>{const F=T.value==="root"?null:T.value;e.moveToFolder(e.activeLayerId,F)}),p.appendChild(T),i.appendChild(p);const u=document.createElement("div");u.className="layer-folder-assign-row",u.style.gap="4px",u.innerHTML='<span class="assign-label" title="Vincular esta capa a un Hueso 2D">🦴 Hueso:</span>';const m=document.createElement("select");m.className="layer-folder-select",m.style.flex="1",m.title="Vincular capa rígidamente a un hueso del esqueleto",m.addEventListener("change",()=>{const F=e.getActiveLayer();if(!F||F.isPaper)return;const $=m.value===""?null:m.value;e.setLayerBoneBinding(F.id,$,!!F.meshSkinningEnabled)});const S=document.createElement("button");S.className="layer-action-btn",S.style.width="auto",S.style.padding="2px 6px",S.style.fontSize="10px",S.textContent="🕸️ Malla",S.title="Malla Deformable (Linear Blend Skinning): deforma suavemente el dibujo de esta capa con todos los huesos cercanos",S.addEventListener("click",()=>{const F=e.getActiveLayer();!F||F.isPaper||F.type!=="raster"||e.setLayerBoneBinding(F.id,F.boundBoneId??null,!F.meshSkinningEnabled)}),u.append(m,S),i.appendChild(u);const y=document.createElement("div");y.className="layers-actions-bar";const g=document.createElement("button");g.className="layer-action-btn",g.title="New Raster Layer",g.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `,g.addEventListener("click",()=>e.createLayer());const w=document.createElement("button");w.className="layer-action-btn",w.title="New Layer Folder",w.innerHTML=`
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
  `,_.addEventListener("click",()=>e.createAnimationFolder());const M=document.createElement("button");M.className="layer-action-btn clip-btn",M.title="Clip at Layer Below",M.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="7" y="7" width="14" height="14" rx="2"/>
      <path d="M3 17V5a2 2 0 0 1 2-2h12"/>
      <polyline points="10 14 7 14 7 17"/>
    </svg>
  `,M.addEventListener("click",()=>{e.toggleLayerClipping(e.activeLayerId)});const C=document.createElement("button");C.className="layer-action-btn",C.title="Delete Selected Layer / Folder",C.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  `,C.addEventListener("click",()=>{e.deleteLayer(e.activeLayerId)});const D=document.createElement("button");D.className="layer-action-btn",D.title="Move Layer Up",D.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `,D.addEventListener("click",()=>{e.moveLayerBranch(e.activeLayerId,"up")});const G=document.createElement("button");G.className="layer-action-btn",G.title="Move Layer Down",G.innerHTML=`
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `,G.addEventListener("click",()=>{e.moveLayerBranch(e.activeLayerId,"down")}),y.append(g,w,_,M,C,D,G),i.appendChild(y);const P=document.createElement("div");P.className="layers-list",i.appendChild(P),n.appendChild(i);function k(){P.innerHTML="";const F=e.getActiveLayer();if(F){x.value=F.blendMode;const U=Math.round(F.opacity*100);h.value=String(U),E.textContent=`${U}%`,M.classList.toggle("active",!!F.clipped)}const $=e.layers.filter(U=>U.type==="folder"&&U.id!==(F==null?void 0:F.id));T.innerHTML='<option value="root">None (Root Level)</option>';for(const U of $){const H=document.createElement("option");H.value=U.id,H.textContent=`📁 ${U.name}`,T.appendChild(H)}T.value=(F==null?void 0:F.parentId)??"root",T.disabled=!F||!!F.isPaper;const ee=(t==null?void 0:t.bones)??[];m.innerHTML='<option value="">(Sin hueso)</option>';for(const U of ee){const H=document.createElement("option");H.value=U.id,H.textContent=`🦴 ${U.name}`,m.appendChild(H)}m.value=(F==null?void 0:F.boundBoneId)??"",m.disabled=!F||!!F.isPaper||F.type!=="raster",S.classList.toggle("active",!!(F!=null&&F.meshSkinningEnabled)),S.style.color=F!=null&&F.meshSkinningEnabled?"#fbbf24":"",S.disabled=!F||!!F.isPaper||F.type!=="raster";const X=new Map(e.layers.map(U=>[U.id,U])),N=new Map(ee.map(U=>[U.id,U])),q=y0(e.layers);for(const U of q){if(x0(U,X))continue;const H=_0(U,X),I=document.createElement("div");if(I.className="layer-item",I.dataset.layerId=U.id,I.classList.toggle("active",U.id===e.activeLayerId),I.classList.toggle("is-folder",U.type==="folder"),I.classList.toggle("is-clipped",!!U.clipped),H>0&&(I.style.paddingLeft=`${8+H*14}px`),U.type==="folder"){const Y=document.createElement("button");Y.className="layer-folder-chevron",Y.title=U.collapsed?"Expand Folder":"Collapse Folder",Y.innerHTML=`
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="${U.collapsed?"collapsed":""}">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        `,Y.addEventListener("click",se=>{se.stopPropagation(),e.toggleFolderCollapse(U.id)}),I.appendChild(Y)}else{const Y=document.createElement("span");Y.className="layer-chevron-spacer",I.appendChild(Y)}const B=document.createElement("button");if(B.className="layer-eye-btn",B.title=U.visible?"Hide Layer":"Show Layer",B.innerHTML=U.visible?'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555555" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',B.addEventListener("click",Y=>{Y.stopPropagation(),e.setLayerVisibility(U.id,!U.visible)}),I.appendChild(B),U.clipped){const Y=document.createElement("div");Y.className="layer-clip-indicator",Y.title="Clipped at layer below",I.appendChild(Y)}if(U.type==="folder"){const Y=document.createElement("div");Y.className="layer-folder-icon",U.isAnimationFolder?(Y.innerHTML=`
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
          `,Y.title="Animation Folder (Track)"):Y.innerHTML=`
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          `,I.appendChild(Y)}else{const Y=document.createElement("canvas");Y.className="layer-thumb",Y.width=36,Y.height=22;const se=Y.getContext("2d");U.isPaper?(se.fillStyle="#ffffff",se.fillRect(0,0,36,22)):U.canvas&&(se.fillStyle="#262626",se.fillRect(0,0,36,22),se.drawImage(U.canvas,0,0,36,22)),I.appendChild(Y)}const V=document.createElement("span");if(V.className="layer-name-text",V.textContent=U.name,V.title="Double click to rename",V.addEventListener("dblclick",Y=>{Y.stopPropagation();const se=document.createElement("input");se.type="text",se.className="layer-name-input",se.value=U.name;const ue=()=>{e.renameLayer(U.id,se.value)};se.addEventListener("blur",ue),se.addEventListener("keydown",be=>{be.key==="Enter"?(se.removeEventListener("blur",ue),ue()):be.key==="Escape"&&(se.removeEventListener("blur",ue),k())}),V.replaceWith(se),se.focus(),se.select()}),I.appendChild(V),U.meshSkinningEnabled){const Y=document.createElement("span");Y.className="layer-badge",Y.style.color="#fbbf24",Y.style.fontSize="10px",Y.title="Malla 2D Deformable (Linear Blend Skinning)",Y.textContent="🕸️",I.appendChild(Y)}else if(U.boundBoneId){const Y=N.get(U.boundBoneId),se=document.createElement("span");se.className="layer-badge",se.style.color=(Y==null?void 0:Y.color)??"#38bdf8",se.style.fontSize="10px",se.title=`Vinculado a hueso: ${(Y==null?void 0:Y.name)??U.boundBoneId}`,se.textContent="🦴",I.appendChild(se)}if(U.isPaper){const Y=document.createElement("span");Y.className="layer-badge",Y.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',I.appendChild(Y)}I.addEventListener("click",()=>{e.setActiveLayer(U.id)}),P.appendChild(I)}}e.subscribe(k),t==null||t.subscribe(k),k()}const M0=[{id:"pen",label:"Pluma",shortcut:"P",icon:'<path d="M12 19l7-7 3 3-7 7-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="11" cy="11" r="1.5" fill="currentColor"/>'},{id:"brush",label:"Pincel",shortcut:"B",icon:'<path d="M4 20l3-1 11-11a2 2 0 0 0-3-3L4 16z" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/>'},{id:"eraser",label:"Goma de Borrar",shortcut:"E",icon:'<path d="M16 3l5 5-9 9h-5l-3-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'},{id:"eyedropper",label:"Cuentagotas",shortcut:"I",icon:'<path d="M13 3l4 4 6-2-2 6-4 4-8-8z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 11l-6 6a1 1 0 0 0 0 2l3 3a1 1 0 0 0 2 0l6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'},{id:"bucket",label:"Relleno",shortcut:"G",icon:'<path d="M19 11l-8-8-8.5 8.5a2.12 2.12 0 0 0 0 3l5 5a2.12 2.12 0 0 0 3 0L19 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 2l5 5" stroke="currentColor" stroke-width="1.8"/><path d="M2 13l7.5 7.5" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="19" r="2" fill="currentColor"/>'},{id:"shape",label:"Figura",shortcut:"U",icon:'<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>'},{id:"bone",label:"Huesos 2D (Rig & Pose)",shortcut:"J",icon:'<circle cx="6" cy="6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="18" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8l8 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="8,8 13,9.5 9.5,13" fill="currentColor"/>'},{id:"hand",label:"Mover Lienzo",shortcut:"H",icon:'<path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M6 14v1a7 7 0 0 0 14 0v-5a2 2 0 0 0-4 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'}],S0=[3,5,8,12,18,28,45,70],ed=[{id:"circle",label:"Círculo"},{id:"square",label:"Plano"},{id:"calligraphic",label:"Caligráfico"}],td=[{id:"none",label:"Ninguno"},{id:"weak",label:"Débil"},{id:"medium",label:"Medio"},{id:"strong",label:"Fuerte"}];function Fa(n=""){const e=document.createElement("div");e.className=`csp-scroll-wrap ${n}`;const t=document.createElement("div");t.className="csp-scroll-list";const i=document.createElement("div");i.className="csp-custom-scrollbar";const r=document.createElement("div");r.className="csp-custom-scroll-thumb",i.appendChild(r),e.append(t,i);const s=()=>{const d=t.clientHeight,f=t.scrollHeight,v=t.scrollTop;if(f<=d+2){i.classList.add("hidden");return}i.classList.remove("hidden");const x=Math.max(20,d/f*d),b=f-d,E=d-x,h=b>0?v/b*E:0;r.style.height=`${Math.round(x)}px`,r.style.transform=`translateY(${Math.round(h)}px)`};t.addEventListener("scroll",s,{passive:!0});let o=!1,a=0,c=0;r.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),o=!0,a=d.clientY,c=t.scrollTop,r.classList.add("dragging"),r.setPointerCapture(d.pointerId)}),r.addEventListener("pointermove",d=>{if(!o)return;const f=d.clientY-a,v=t.clientHeight,x=t.scrollHeight,b=Math.max(20,v/x*v),E=x-v,h=v-b;h>0&&(t.scrollTop=c+f/h*E)});const l=d=>{if(o){o=!1,r.classList.remove("dragging");try{r.releasePointerCapture(d.pointerId)}catch{}}};return r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),i.addEventListener("pointerdown",d=>{if(d.target===r)return;const f=i.getBoundingClientRect(),v=d.clientY-f.top,x=t.clientHeight,b=t.scrollHeight,E=Math.max(0,Math.min(1,v/x));t.scrollTop=E*(b-x)}),{wrap:e,list:t,scrollbar:i,thumb:r,update:s}}let Ns=null;function Dr(){Ns&&(Ns.remove(),Ns=null)}function Ua(n){var b,E,h;Dr();const e=document.createElement("div");e.className="csp-modal-backdrop",e.addEventListener("click",p=>{p.target===e&&Dr()});const t=document.createElement("div");t.className="csp-subtool-detail-window";const i=document.createElement("div");i.className="csp-subtool-detail-header",i.innerHTML=`
    <div style="display:flex;align-items:center;gap:6px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
      <span>Detalle de subherramienta — <strong>${n.name}</strong></span>
    </div>
    <button class="csp-subtool-action-btn" id="csp-detail-close" title="Cerrar (Esc)">✕</button>
  `,(b=i.querySelector("#csp-detail-close"))==null||b.addEventListener("click",Dr),t.appendChild(i);const r=document.createElement("div");r.className="csp-subtool-detail-body";const s=document.createElement("div");s.className="csp-subtool-detail-cats";const o=document.createElement("div");o.className="csp-subtool-detail-content";const a=[{id:"size",label:"Tamaño del pincel"},{id:"ink",label:"Tinta"},{id:"smooth",label:"Suavizado"},{id:"tip",label:"Punta del pincel"},{id:"stroke",label:"Trazo"},{id:"taper",label:"Inicio y fin"},{id:"correction",label:"Corrección"}];let c="size";const l=new Map;function d(p){const T=document.createElement("button");T.className="csp-eye-pin-btn";const u=pt().visibleProperties.includes(p);return T.classList.toggle("pinned",u),T.title=u?"Visible en la barra lateral. Haz clic para ocultar.":"Oculto de la barra lateral. Haz clic para fijar (👁).",T.innerHTML=`<span style="font-size:12px;">${u?"👁":"◦"}</span>`,T.addEventListener("click",()=>{Wg(p);const m=pt().visibleProperties.includes(p);T.classList.toggle("pinned",m),T.title=m?"Visible en la barra lateral. Haz clic para ocultar.":"Oculto de la barra lateral. Haz clic para fijar (👁).",T.innerHTML=`<span style="font-size:12px;">${m?"👁":"◦"}</span>`}),T}function f(p){o.innerHTML="";const u=pt().brush;if(p==="size"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("size"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Tamaño del pincel</span>
          <span class="prop-value" id="dt-size-val">${Math.round(u.size)} px</span>
        </div>
      `;const g=document.createElement("input");g.type="range",g.className="csp-slider",g.min="1",g.max="200",g.value=String(Math.round(u.size)),g.addEventListener("input",()=>{ft({size:Number(g.value)});const k=y.querySelector("#dt-size-val");k&&(k.textContent=`${g.value} px`)}),y.appendChild(g),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("pressureSize"),M=document.createElement("div");M.className="csp-detail-prop-main",M.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Tamaño mínimo por presión</span>
          <span class="prop-value" id="dt-psize-val">${Math.round(u.minSizeRatio*100)}%</span>
        </div>
      `;const C=document.createElement("div");C.className="csp-toggle-row";const D=document.createElement("input");D.type="checkbox",D.className="csp-checkbox",D.id="dt-psize-chk",D.checked=u.pressureSize;const G=document.createElement("label");G.className="csp-check-label",G.htmlFor="dt-psize-chk",G.textContent="Activar variación de tamaño por presión",C.append(D,G);const P=document.createElement("input");P.type="range",P.className="csp-slider",P.min="0",P.max="100",P.value=String(Math.round(u.minSizeRatio*100)),P.disabled=!u.pressureSize,D.addEventListener("change",()=>{ft({pressureSize:D.checked}),P.disabled=!D.checked}),P.addEventListener("input",()=>{ft({minSizeRatio:Number(P.value)/100});const k=M.querySelector("#dt-psize-val");k&&(k.textContent=`${P.value}%`)}),M.append(C,P),w.append(_,M),o.appendChild(w)}else if(p==="ink"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("opacity"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Opacidad general</span>
          <span class="prop-value" id="dt-op-val">${Math.round(u.opacity*100)}%</span>
        </div>
      `;const g=document.createElement("input");g.type="range",g.className="csp-slider",g.min="1",g.max="100",g.value=String(Math.round(u.opacity*100)),g.addEventListener("input",()=>{ft({opacity:Number(g.value)/100});const k=y.querySelector("#dt-op-val");k&&(k.textContent=`${g.value}%`)}),y.appendChild(g),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("flow"),M=document.createElement("div");M.className="csp-detail-prop-main",M.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Densidad de pintura / Flujo</span>
          <span class="prop-value" id="dt-fl-val">${Math.round(u.flow*100)}%</span>
        </div>
      `;const C=document.createElement("input");C.type="range",C.className="csp-slider",C.min="1",C.max="100",C.value=String(Math.round(u.flow*100)),C.addEventListener("input",()=>{ft({flow:Number(C.value)/100});const k=M.querySelector("#dt-fl-val");k&&(k.textContent=`${C.value}%`)});const D=document.createElement("div");D.className="csp-toggle-row";const G=document.createElement("input");G.type="checkbox",G.className="csp-checkbox",G.id="dt-fl-chk",G.checked=u.pressureFlow;const P=document.createElement("label");P.className="csp-check-label",P.htmlFor="dt-fl-chk",P.textContent="Densidad según presión de pluma",D.append(G,P),G.addEventListener("change",()=>{ft({pressureFlow:G.checked})}),M.append(C,D),w.append(_,M),o.appendChild(w)}else if(p==="smooth"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("stabilization"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Estabilización de trazo</span>
          <span class="prop-value" id="dt-st-val">${Math.round(u.stabilization)}</span>
        </div>
      `;const g=document.createElement("input");g.type="range",g.className="csp-slider",g.min="0",g.max="10",g.value=String(Math.round(u.stabilization)),g.addEventListener("input",()=>{ft({stabilization:Number(g.value)});const D=y.querySelector("#dt-st-val");D&&(D.textContent=g.value)}),y.appendChild(g),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("antiAliasing"),M=document.createElement("div");M.className="csp-detail-prop-main",M.innerHTML='<span class="prop-label">Suavizado (Anti-Aliasing)</span>';const C=document.createElement("div");C.className="csp-seg-group";for(const D of td){const G=document.createElement("button");G.className=`csp-seg-btn${u.antiAliasing===D.id?" active":""}`,G.textContent=D.label,G.addEventListener("click",()=>{ft({antiAliasing:D.id}),f("smooth")}),C.appendChild(G)}M.appendChild(C),w.append(_,M),o.appendChild(w)}else if(p==="tip"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("tipShape"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML='<span class="prop-label">Forma de la punta</span>';const g=document.createElement("div");g.className="csp-seg-group";for(const F of ed){const $=document.createElement("button");$.className=`csp-seg-btn${u.tipShape===F.id?" active":""}`,$.textContent=F.label,$.addEventListener("click",()=>{ft({tipShape:F.id}),f("tip")}),g.appendChild($)}y.appendChild(g),m.append(S,y),o.appendChild(m);const w=document.createElement("div");w.className="csp-detail-prop-row";const _=d("roundness"),M=document.createElement("div");M.className="csp-detail-prop-main",M.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Achatamiento / Redondez</span>
          <span class="prop-value" id="dt-rn-val">${Math.round(u.tipRoundness*100)}%</span>
        </div>
      `;const C=document.createElement("input");C.type="range",C.className="csp-slider",C.min="10",C.max="100",C.value=String(Math.round(u.tipRoundness*100)),C.addEventListener("input",()=>{ft({tipRoundness:Number(C.value)/100});const F=M.querySelector("#dt-rn-val");F&&(F.textContent=`${C.value}%`)}),M.appendChild(C),w.append(_,M),o.appendChild(w);const D=document.createElement("div");D.className="csp-detail-prop-row";const G=d("angle"),P=document.createElement("div");P.className="csp-detail-prop-main",P.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Ángulo de inclinación</span>
          <span class="prop-value" id="dt-an-val">${Math.round(u.tipAngle)}°</span>
        </div>
      `;const k=document.createElement("input");k.type="range",k.className="csp-slider",k.min="0",k.max="180",k.value=String(Math.round(u.tipAngle)),k.addEventListener("input",()=>{ft({tipAngle:Number(k.value)});const F=P.querySelector("#dt-an-val");F&&(F.textContent=`${k.value}°`)}),P.appendChild(k),D.append(G,P),o.appendChild(D)}else if(p==="stroke"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("spacing"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Intervalo entre estampas (Espaciado)</span>
          <span class="prop-value" id="dt-sp-val">${Math.round(u.spacing*100)}%</span>
        </div>
      `;const g=document.createElement("input");g.type="range",g.className="csp-slider",g.min="3",g.max="50",g.value=String(Math.round(u.spacing*100)),g.addEventListener("input",()=>{ft({spacing:Number(g.value)/100});const w=y.querySelector("#dt-sp-val");w&&(w.textContent=`${g.value}%`)}),y.appendChild(g),m.append(S,y),o.appendChild(m)}else if(p==="taper"){const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("taper"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Afinado de inicio (Entrada)</span>
          <span class="prop-value" id="dt-tps-val">${Math.round(u.taperStart)} px</span>
        </div>
      `;const g=document.createElement("input");g.type="range",g.className="csp-slider",g.min="0",g.max="60",g.value=String(Math.round(u.taperStart)),g.addEventListener("input",()=>{ft({taperStart:Number(g.value)});const M=y.querySelector("#dt-tps-val");M&&(M.textContent=`${g.value} px`)});const w=document.createElement("div");w.className="prop-row-header",w.style.marginTop="6px",w.innerHTML=`
        <span class="prop-label">Afinado de fin (Salida)</span>
        <span class="prop-value" id="dt-tpe-val">${Math.round(u.taperEnd)} px</span>
      `;const _=document.createElement("input");_.type="range",_.className="csp-slider",_.min="0",_.max="80",_.value=String(Math.round(u.taperEnd)),_.addEventListener("input",()=>{ft({taperEnd:Number(_.value)});const M=w.querySelector("#dt-tpe-val");M&&(M.textContent=`${_.value} px`)}),y.append(g,w,_),m.append(S,y),o.appendChild(m)}else{const m=document.createElement("div");m.className="csp-detail-prop-row";const S=d("hardness"),y=document.createElement("div");y.className="csp-detail-prop-main",y.innerHTML=`
        <div class="prop-row-header">
          <span class="prop-label">Dureza de punta</span>
          <span class="prop-value" id="dt-hd-val">${Math.round(u.hardness*100)}%</span>
        </div>
      `;const g=document.createElement("input");g.type="range",g.className="csp-slider",g.min="10",g.max="100",g.value=String(Math.round(u.hardness*100)),g.addEventListener("input",()=>{ft({hardness:Number(g.value)/100});const w=y.querySelector("#dt-hd-val");w&&(w.textContent=`${g.value}%`)}),y.appendChild(g),m.append(S,y),o.appendChild(m)}}for(const p of a){const T=document.createElement("button");T.className=`csp-detail-cat-btn${p.id===c?" active":""}`,T.textContent=p.label,T.addEventListener("click",()=>{c=p.id;for(const[u,m]of l)m.classList.toggle("active",u===c);f(c)}),s.appendChild(T),l.set(p.id,T)}r.append(s,o),t.appendChild(r);const v=document.createElement("div");v.className="csp-subtool-detail-footer",v.innerHTML=`
    <button class="csp-seg-btn" id="dt-reset-btn" style="padding:4px 8px;">↺ Ajustes de fábrica</button>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:10px;color:#8c95a4;">👁 Haz clic en el ojo para fijar al panel lateral</span>
      <button class="csp-seg-btn active" id="dt-ok-btn" style="padding:4px 12px;font-weight:600;">Cerrar</button>
    </div>
  `,(E=v.querySelector("#dt-reset-btn"))==null||E.addEventListener("click",()=>{Yc(n.id),f(c)}),(h=v.querySelector("#dt-ok-btn"))==null||h.addEventListener("click",Dr),t.appendChild(v),e.appendChild(t),document.body.appendChild(e),Ns=e,f("size");const x=p=>{p.key==="Escape"&&(Dr(),window.removeEventListener("keydown",x))};window.addEventListener("keydown",x)}function E0(n,e){var mo,go;n.innerHTML="",n.className="tools-root";const t=document.createElement("aside");t.className="lateral-toolbar";const i=new Map;for(const z of M0){const ie=document.createElement("button");ie.className="lateral-btn tool-btn",ie.dataset.tool=z.id,ie.title=`${z.label} (${z.shortcut})`,ie.setAttribute("aria-label",z.label),ie.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        ${z.icon}
      </svg>
      <span class="btn-shortcut">${z.shortcut}</span>
    `,ie.addEventListener("click",()=>{Qn(z.id),pt().propertiesOpen||Jl(!0)}),t.appendChild(ie),i.set(z.id,ie)}const r=document.createElement("div");r.className="toolbar-divider",t.appendChild(r);const s=document.createElement("button");s.className="lateral-btn action-btn",s.title="Deshacer (Ctrl+Z)",s.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  `,s.addEventListener("click",()=>{var z;return(z=e==null?void 0:e.onUndo)==null?void 0:z.call(e)}),t.appendChild(s);const o=document.createElement("button");o.className="lateral-btn action-btn",o.title="Rehacer (Ctrl+Y)",o.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  `,o.addEventListener("click",()=>{var z;return(z=e==null?void 0:e.onRedo)==null?void 0:z.call(e)}),t.appendChild(o);const a=document.createElement("div");a.style.flex="1",t.appendChild(a);const c=document.createElement("div");c.className="csp-color-widget",c.title="Colores (X: Alternar principal/secundario, C: Color transparente)";const l=document.createElement("div");l.className="csp-swatches-overlap";const d=document.createElement("div");d.className="csp-swatch secondary",d.title="Color Secundario (Clic para seleccionar)",d.addEventListener("click",()=>Zl("secondary"));const f=document.createElement("div");f.className="csp-swatch primary",f.title="Color Principal (Clic para seleccionar)",f.addEventListener("click",()=>Zl("primary"));const v=document.createElement("button");v.className="csp-swap-btn",v.title="Alternar color principal y secundario (Atajo: X)",v.innerHTML=`
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="7 10 12 15 17 10"/>
      <path d="M12 15V3"/>
    </svg>
  `,v.addEventListener("click",z=>{z.stopPropagation(),Kc()}),l.append(d,f,v),c.appendChild(l);const x=document.createElement("div");x.className="csp-transparent-tile",x.title="Color Transparente (Atajo: C) - Convierte el pincel en borrador conservando su textura",x.innerHTML='<div class="csp-checkerboard"></div>',x.addEventListener("click",()=>jc()),c.appendChild(x),t.appendChild(c);const b=document.createElement("button");b.className="lateral-btn drawer-toggle-btn",b.title="Ocultar / Mostrar Panel de Propiedades y Subherramientas",b.innerHTML=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  `,b.addEventListener("click",()=>Jl()),t.appendChild(b),n.appendChild(t);const E=document.createElement("div");E.className="csp-sidebar-dock";const h=localStorage.getItem("oniri.dock.width");let p=h?Math.max(220,Math.min(480,Number(h))):240;document.documentElement.style.setProperty("--left-dock-inner-width",`${p}px`);const T=document.createElement("div");T.className="csp-dock-width-resizer",T.title="Arrastrar para cambiar el ancho de la barra lateral";let u=!1,m=0,S=240;T.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),u=!0,m=z.clientX,S=E.offsetWidth,T.classList.add("dragging"),T.setPointerCapture(z.pointerId)}),T.addEventListener("pointermove",z=>{if(!u)return;const ie=z.clientX-m;p=Math.max(220,Math.min(480,S+ie)),document.documentElement.style.setProperty("--left-dock-inner-width",`${p}px`),document.documentElement.style.setProperty("--left-dock-width",`${p+48}px`),localStorage.setItem("oniri.dock.width",String(p)),F.update(),I.update(),Gi.update()});const y=z=>{if(u){u=!1,T.classList.remove("dragging");try{T.releasePointerCapture(z.pointerId)}catch{}}};T.addEventListener("pointerup",y),T.addEventListener("pointercancel",y),E.appendChild(T);const g=document.createElement("div");g.className="dock-section subtool-section";const w=localStorage.getItem("oniri.subtool.height");let _=w?Math.max(70,Math.min(400,Number(w))):140;g.style.height=`${_}px`;const M=document.createElement("div");M.className="dock-section-header",M.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
    <span class="subtool-section-title">Subherramientas</span>
  `;function C(z,ie,Te=!1){const Ge=document.createElement("button");return Ge.className=`csp-subtool-action-btn${Te?" danger":""}`,Ge.textContent=z,Ge.title=ie,Ge}const D=C("+","Crear un pincel nuevo a partir del actual (duplicar)"),G=C("↺","Restaurar los ajustes de fábrica de este pincel"),P=C("🗑","Eliminar este pincel personalizado",!0);D.addEventListener("click",()=>{const z=pt().activeSubToolId,ie=Jg(z)??Zg("Pincel nuevo");Yl(ie.id)}),G.addEventListener("click",()=>{Yc(pt().activeSubToolId)}),P.addEventListener("click",()=>{Qg(pt().activeSubToolId)});const k=document.createElement("div");k.className="subtool-header-actions",k.append(D,G,P),M.appendChild(k),g.appendChild(M);const F=Fa("csp-subtool-scroll-wrap");g.appendChild(F.wrap),E.appendChild(g);const $=document.createElement("div");$.className="csp-dock-splitter",$.title="Arrastrar para cambiar el tamaño de Subherramientas y Propiedades";let ee=!1,X=0,N=140;$.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),ee=!0,X=z.clientY,N=g.offsetHeight,$.classList.add("dragging"),$.setPointerCapture(z.pointerId)}),$.addEventListener("pointermove",z=>{if(!ee)return;const ie=z.clientY-X;_=Math.max(70,Math.min(400,N+ie)),g.style.height=`${_}px`,localStorage.setItem("oniri.subtool.height",String(_)),F.update(),I.update()});const q=z=>{if(ee){ee=!1,$.classList.remove("dragging");try{$.releasePointerCapture(z.pointerId)}catch{}}};$.addEventListener("pointerup",q),$.addEventListener("pointercancel",q),E.appendChild($);const U=document.createElement("div");U.className="dock-section prop-section";const H=document.createElement("div");H.className="dock-section-header",H.innerHTML=`
    <div style="display:flex;align-items:center;gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
      <span class="prop-section-title">Propiedad de herramienta</span>
    </div>
    <button class="csp-subtool-action-btn" id="csp-header-wrench" title="Ajustes de subherramienta" style="display:flex;align-items:center;justify-content:center;width:24px;height:22px;padding:0;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
  `,(mo=H.querySelector("#csp-header-wrench"))==null||mo.addEventListener("click",()=>{const z=Kl();z&&Ua(z)}),U.appendChild(H);const I=Fa("csp-prop-scroll-wrap"),B=I.list,V=new Map;function Y(z,ie){const Te=document.createElement("div");Te.className="prop-row-header";const Ge=document.createElement("span");Ge.className="prop-label",Ge.textContent=z;const ut=document.createElement("span");return ut.className="prop-value",ut.textContent=ie,Te.append(Ge,ut),{header:Te,value:ut}}function se(z,ie,Te){const Ge=document.createElement("input");return Ge.type="range",Ge.className="csp-slider",Ge.min=z,Ge.max=ie,Ge.step=Te,Ge}function ue(z,ie){const Te=document.createElement("input");Te.type="checkbox",Te.className="csp-checkbox",Te.id=z;const Ge=document.createElement("label");return Ge.className="csp-check-label",Ge.htmlFor=z,Ge.textContent=ie,{box:Te,label:Ge}}function be(z,ie){const Te=document.createElement("div");Te.className="csp-seg-group";const Ge=new Map;for(const ut of z){const ht=document.createElement("button");ht.className="csp-seg-btn",ht.textContent=ut.label,ht.addEventListener("click",()=>ie(ut.id)),Te.appendChild(ht),Ge.set(ut.id,ht)}return{group:Te,buttons:Ge}}const ne=210,W=62,Ce=Math.min(2,window.devicePixelRatio||1),oe=document.createElement("div");oe.className="prop-row-box ink-only",oe.style.display="none";const Ae=document.createElement("div");Ae.className="csp-preview-wrap";const ge=document.createElement("canvas");ge.className="csp-preview-canvas bg-paper",ge.width=Math.round(ne*Ce),ge.height=Math.round(W*Ce),ge.title="Visión del pincel (Trazo dinámico con respuesta a presión)",Ae.appendChild(ge);const Ve=document.createElement("div");Ve.className="csp-preview-overlay-bar";const Ue=document.createElement("button");Ue.className="csp-preview-mini-btn",Ue.innerHTML='<span>◐</span><span id="preview-bg-name">Papel</span>',Ue.title="Cambiar fondo de vista previa (Papel / Damero / Oscuro)",Ue.addEventListener("click",()=>{const z=pt().previewBgMode;Xg(z==="paper"?"checker":z==="checker"?"dark":"paper")}),Ve.appendChild(Ue),Ae.appendChild(Ve),oe.appendChild(Ae),B.appendChild(oe);const L=()=>{const z=ge.getContext("2d");if(!z)return;const ie=pt(),Te=ie.brush,Ge=ie.previewBgMode;ge.className=`csp-preview-canvas bg-${Ge}`;const ut=oe.querySelector("#preview-bg-name");ut&&(ut.textContent=Ge==="paper"?"Papel":Ge==="checker"?"Damero":"Oscuro"),z.setTransform(Ce,0,0,Ce,0,0),z.clearRect(0,0,ne,W);let ht=!Te.color||Te.color==="transparent"?"#111111":Te.color;if(Ge==="dark"){const Tt=Rn(ht);(Tt.r*299+Tt.g*587+Tt.b*114)/1e3<65&&(ht="#f3f4f6")}const Nt=12,Ht=W/2,$t=W/2-Nt,En=ne-Nt*2,Tn=Math.min(1,30/Math.max(1,Te.size)),qt=Math.min(.5,Math.max(.03,Te.spacing)),Ie=120,me=[],Xe=[],Ze=[0];for(let Tt=0;Tt<=Ie;Tt++){const ct=Tt/Ie,Ut=Nt+ct*En,sn=Ht+Math.sin(ct*Math.PI*2)*$t;if(Tt>0){const kt=Tt-1;Ze.push(Ze[kt]+Math.hypot(Ut-me[kt],sn-Xe[kt]))}me.push(Ut),Xe.push(sn)}const vt=Ze[Ie],_t=Tt=>{let ct=1;for(;ct<Ie&&Ze[ct]<Tt;)ct++;const Ut=Ze[ct-1],sn=Ze[ct],kt=sn>Ut?(Tt-Ut)/(sn-Ut):0;return{x:me[ct-1]+(me[ct]-me[ct-1])*kt,y:Xe[ct-1]+(Xe[ct]-Xe[ct-1])*kt,dx:me[ct]-me[ct-1],dy:Xe[ct]-Xe[ct-1]}};let gt=0,wn=0;for(;gt<=vt&&wn++<3e3;){const Tt=gt/vt,ct=_t(gt),Ut=.25+.75*Math.pow(Math.sin(Math.PI*Tt),.7),sn=Ir(Te,Ut,gt/Math.max(Tn,.001)),kt=Math.max(.4,sn*Tn),ss=Qc(Te,Ut),$n=Zc({diameter:kt,hardness:Te.hardness,color:ht,antiAliasing:Te.antiAliasing,tipShape:Te.tipShape,tipRoundness:Te.tipRoundness}),vo=(Te.followDirection&&Te.tipShape!=="calligraphic"?Math.atan2(ct.dy,ct.dx)*180/Math.PI:0)+Te.tipAngle,ld=Te.tipShape!=="square"&&Te.tipRoundness>=.999;z.globalAlpha=ss,!ld&&vo!==0?(z.save(),z.translate(ct.x,ct.y),z.rotate(vo*Math.PI/180),z.drawImage($n,-$n.width/2,-$n.height/2),z.restore()):z.drawImage($n,ct.x-$n.width/2,ct.y-$n.height/2),gt+=Math.max(.3,kt*qt)}z.globalAlpha=1};let A=!1;const J=()=>{A||(A=!0,requestAnimationFrame(()=>{A=!1,L()}))},de=document.createElement("div");de.className="prop-row-box";const ce=document.createElement("div");ce.className="prop-row-header",ce.innerHTML=`
    <span class="prop-label">Tamaño del pincel</span>
    <span class="prop-value" id="size-val">6.0 px</span>
  `;const le=document.createElement("input");le.type="range",le.className="csp-slider",le.min="1",le.max="200",le.step="1",le.addEventListener("input",()=>{ft({size:Number(le.value)})});const ke=document.createElement("div");ke.className="csp-quick-size-row";for(const z of S0){const ie=document.createElement("button");ie.className="csp-quick-size-btn",ie.textContent=String(z),ie.addEventListener("click",()=>{ft({size:z})}),ke.appendChild(ie)}de.append(ce,le,ke),B.appendChild(de),V.set("size",de);const xe=document.createElement("div");xe.className="prop-row-box";const Ne=document.createElement("div");Ne.className="prop-row-header",Ne.innerHTML=`
    <span class="prop-label">Opacidad</span>
    <span class="prop-value" id="opacity-val">100%</span>
  `;const Oe=document.createElement("input");Oe.type="range",Oe.className="csp-slider",Oe.min="1",Oe.max="100",Oe.addEventListener("input",()=>{ft({opacity:Number(Oe.value)/100})}),xe.append(Ne,Oe),B.appendChild(xe),V.set("opacity",xe);const et=document.createElement("div");et.className="prop-row-box";const pe=document.createElement("div");pe.className="prop-row-header",pe.innerHTML=`
    <span class="prop-label">Densidad del pincel</span>
    <span class="prop-value" id="flow-val">100%</span>
  `;const ot=document.createElement("input");ot.type="range",ot.className="csp-slider",ot.min="1",ot.max="100",ot.addEventListener("input",()=>{ft({flow:Number(ot.value)/100})});const tt=ue("flow-pressure-check","Densidad por presión"),Je=document.createElement("div");Je.className="csp-toggle-row",Je.append(tt.box,tt.label),tt.box.addEventListener("change",()=>{ft({pressureFlow:tt.box.checked})}),et.append(pe,ot,Je),B.appendChild(et),V.set("flow",et);const We=document.createElement("div");We.className="prop-row-box";const Fe=document.createElement("div");Fe.className="prop-row-header",Fe.innerHTML=`
    <span class="prop-label">Dureza</span>
    <span class="prop-value" id="hardness-val">100%</span>
  `;const j=document.createElement("div");j.className="csp-hardness-dots-container";const Se=[{val:.1,label:"Muy suave"},{val:.35,label:"Suave"},{val:.6,label:"Medio"},{val:.8,label:"Firme"},{val:1,label:"Duro"}],He=Se.map((z,ie)=>{const Te=document.createElement("button");return Te.className="csp-hardness-dot-btn",Te.title=z.label,Te.innerHTML=`<span class="dot-preview" style="transform: scale(${.4+ie*.15});"></span>`,Te.addEventListener("click",()=>{ft({hardness:z.val})}),j.appendChild(Te),Te});We.append(Fe,j),B.appendChild(We),V.set("hardness",We);const Le=document.createElement("div");Le.className="prop-row-box";const ae=document.createElement("div");ae.className="prop-row-header",ae.innerHTML=`
    <span class="prop-label">Estabilización</span>
    <span class="prop-value" id="stab-val">5</span>
  `;const O=document.createElement("input");O.type="range",O.className="csp-slider",O.min="0",O.max="10",O.step="1",O.addEventListener("input",()=>{ft({stabilization:Number(O.value)})}),Le.append(ae,O),B.appendChild(Le),V.set("stabilization",Le);const he=document.createElement("div");he.className="prop-row-box";const ve=Y("Tamaño mínimo por presión","15%"),Ee=ue("psize-check","Tamaño por presión"),De=document.createElement("div");De.className="csp-toggle-row",De.append(Ee.box,Ee.label);const $e=se("0","100","1");Ee.box.addEventListener("change",()=>ft({pressureSize:Ee.box.checked})),$e.addEventListener("input",()=>{ft({minSizeRatio:Number($e.value)/100})}),he.append(ve.header,De,$e),B.appendChild(he),V.set("pressureSize",he);const nt=document.createElement("div");nt.className="prop-row-box";const mt=Y("Afinado de inicio","0 px"),fe=se("0","60","1");fe.addEventListener("input",()=>{ft({taperStart:Number(fe.value)})});const Pe=Y("Afinado de fin","0 px"),ye=se("0","80","1");ye.addEventListener("input",()=>{ft({taperEnd:Number(ye.value)})}),nt.append(mt.header,fe,Pe.header,ye),B.appendChild(nt),V.set("taper",nt);const Me=document.createElement("div");Me.className="prop-row-box";const je=document.createElement("span");je.className="prop-label",je.textContent="Forma de punta";const Be=be(ed,z=>ft({tipShape:z}));Me.append(je,Be.group),B.appendChild(Me),V.set("tipShape",Me);const it=document.createElement("div");it.className="prop-row-box";const Ft=document.createElement("span");Ft.className="prop-label",Ft.textContent="Suavizado (anti-aliasing)";const Lt=be(td,z=>ft({antiAliasing:z}));it.append(Ft,Lt.group),B.appendChild(it),V.set("antiAliasing",it);const Jt=document.createElement("div");Jt.className="prop-row-box";const zt=Y("Achatamiento de punta","100%"),nn=se("10","100","1");nn.addEventListener("input",()=>{ft({tipRoundness:Number(nn.value)/100})}),Jt.append(zt.header,nn),B.appendChild(Jt),V.set("roundness",Jt);const ii=document.createElement("div");ii.className="prop-row-box";const yi=Y("Ángulo de punta","0°"),R=se("0","180","1");R.addEventListener("input",()=>{ft({tipAngle:Number(R.value)})}),ii.append(yi.header,R),B.appendChild(ii),V.set("angle",ii);const K=document.createElement("div");K.className="prop-row-box bucket-only";const Q=document.createElement("div");Q.className="prop-row-header",Q.innerHTML=`
    <span class="prop-label">Tolerancia de color</span>
    <span class="prop-value" id="tol-val">20%</span>
  `;const te=document.createElement("input");te.type="range",te.className="csp-slider",te.min="0",te.max="100",te.addEventListener("input",()=>{ft({tolerance:Number(te.value)})}),K.append(Q,te),B.appendChild(K);const Z=document.createElement("div");Z.className="prop-row-box shape-only";const Re=document.createElement("span");Re.className="prop-label",Re.textContent="Tipo de figura",Z.appendChild(Re);const ze=document.createElement("div");ze.className="csp-seg-group";const qe=[{id:"line",label:"Línea"},{id:"rectangle",label:"Rect"},{id:"ellipse",label:"Elipse"}],Ye=new Map;for(const z of qe){const ie=document.createElement("button");ie.className="csp-seg-btn",ie.textContent=z.label,ie.addEventListener("click",()=>ft({shapeType:z.id})),ze.appendChild(ie),Ye.set(z.id,ie)}Z.appendChild(ze);const Ke=document.createElement("span");Ke.className="prop-label",Ke.style.marginTop="6px",Ke.textContent="Modo de relleno",Z.appendChild(Ke);const Qe=document.createElement("div");Qe.className="csp-seg-group";const st=[{id:"stroke",label:"Contorno"},{id:"fill",label:"Relleno"}],Ct=new Map;for(const z of st){const ie=document.createElement("button");ie.className="csp-seg-btn",ie.textContent=z.label,ie.addEventListener("click",()=>ft({shapeFill:z.id})),Qe.appendChild(ie),Ct.set(z.id,ie)}Z.appendChild(Qe),B.appendChild(Z);const St=document.createElement("div");St.className="prop-row-box bone-only",St.style.display="none",St.style.flexDirection="column",St.style.gap="6px";const Rt=document.createElement("span");Rt.className="prop-label",Rt.textContent="Modo de Esqueleto 2D",St.appendChild(Rt);const Et=be([{id:"rig",label:"Rig / Crear"},{id:"pose_fk",label:"Posar FK"},{id:"pose_ik",label:"Posar IK"}],z=>Hg(z));St.appendChild(Et.group);const rt=ue("show-bones-check","Mostrar huesos en el lienzo"),bi=document.createElement("div");bi.className="csp-toggle-row",bi.append(rt.box,rt.label),rt.box.addEventListener("change",()=>{Gg(rt.box.checked)}),St.appendChild(bi);const yt=ue("autokey-bones-check","Auto-Keyframe al posar"),Sn=document.createElement("div");Sn.className="csp-toggle-row",Sn.append(yt.box,yt.label),yt.box.addEventListener("change",()=>{Vg(yt.box.checked)}),St.appendChild(Sn);const Wn=document.createElement("div");Wn.style.display="grid",Wn.style.gridTemplateColumns="1fr 1fr",Wn.style.gap="4px",Wn.style.marginTop="2px";const rn=document.createElement("button");rn.className="csp-seg-btn",rn.style.gridColumn="1 / -1",rn.style.padding="5px 6px",rn.style.color="#fbbf24",rn.style.borderColor="rgba(251, 191, 36, 0.35)",rn.textContent="🧍 + Esqueleto Humanoide (Preset)",rn.title="Generar un rig humanoide completo en el centro del lienzo",rn.addEventListener("click",()=>{var z;(z=e==null?void 0:e.timeline)==null||z.createHumanoidPreset(800,450)});const On=document.createElement("button");On.className="csp-seg-btn",On.style.padding="4px 6px",On.textContent="✦ Fijar Pose",On.title="Registrar Keyframe de pose de esqueleto en el fotograma actual",On.addEventListener("click",()=>{const z=e==null?void 0:e.timeline;z&&z.addOrUpdateBoneKeyframe(z.settings.currentFrame,"smooth")});const At=document.createElement("button");At.className="csp-seg-btn",At.style.padding="4px 6px",At.textContent="↺ Restablecer",At.title="Restablecer la pose a la postura base (Bind Pose) en este fotograma",At.addEventListener("click",()=>{const z=e==null?void 0:e.timeline;z&&z.resetBonePoseAtFrame(z.settings.currentFrame)}),Wn.append(rn,On,At),St.appendChild(Wn);const It=document.createElement("div");It.style.display="flex",It.style.flexDirection="column",It.style.gap="5px",It.style.marginTop="4px",It.style.paddingTop="6px",It.style.borderTop="1px solid rgba(255,255,255,0.08)",St.appendChild(It);const vn=document.createElement("div");vn.style.fontSize="10px",vn.style.lineHeight="1.35",vn.style.color="#9aa0a6",vn.style.marginTop="2px",St.appendChild(vn),B.appendChild(St);const Qt=document.createElement("div");Qt.className="csp-prop-footer";const ri=document.createElement("span");ri.className="csp-prop-visible-count",ri.textContent="Propiedades fijadas";const Mi=document.createElement("button");Mi.className="csp-wrench-btn",Mi.textContent="Ajustes",Mi.title="Ajustes de subherramienta",Mi.addEventListener("click",()=>{const z=Kl();z&&Ua(z)}),Qt.append(ri,Mi),B.appendChild(Qt),U.appendChild(I.wrap),E.appendChild(U);const ln=document.createElement("div");ln.className="csp-dock-splitter",ln.title="Arrastrar para cambiar el tamaño de Propiedades y Color";let qr=!1,oo=0,lo=270;ln.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),qr=!0,oo=z.clientY,lo=Si.offsetHeight,ln.classList.add("dragging"),ln.setPointerCapture(z.pointerId)}),ln.addEventListener("pointermove",z=>{if(!qr)return;const ie=z.clientY-oo;Yr=Math.max(120,Math.min(500,lo-ie)),Si.style.height=`${Yr}px`,localStorage.setItem("oniri.color.height",String(Yr)),Gi.update(),I.update()});const co=z=>{if(qr){qr=!1,ln.classList.remove("dragging");try{ln.releasePointerCapture(z.pointerId)}catch{}}};ln.addEventListener("pointerup",co),ln.addEventListener("pointercancel",co),E.appendChild(ln);const Si=document.createElement("div");Si.className="dock-section color-section";const uo=localStorage.getItem("oniri.color.height");let Yr=uo?Math.max(120,Math.min(500,Number(uo))):270;Si.style.height=`${Yr}px`;const Ys=document.createElement("div");Ys.className="dock-section-header",Ys.innerHTML=`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 0 0 20v-4a6 6 0 0 1 0-12V2z" fill="currentColor"/>
    </svg>
    <span class="color-section-title">Color y Muestras</span>
  `,Si.appendChild(Ys);const Gi=Fa("csp-color-scroll-wrap"),Kr=Gi.list,Ks=document.createElement("div");Ks.className="csp-color-tabs";const ad=[{id:"picker",label:"Círculo"},{id:"rgb",label:"RGB"},{id:"set",label:"Conjunto"},{id:"harmony",label:"Armonía"}],po=new Map;for(const z of ad){const ie=document.createElement("button");ie.className="csp-color-tab-btn",ie.textContent=z.label,ie.addEventListener("click",()=>$g(z.id)),Ks.appendChild(ie),po.set(z.id,ie)}Kr.appendChild(Ks);const Xn=document.createElement("div");Xn.style.display="flex",Xn.style.flexDirection="column",Xn.style.gap="8px",Kr.appendChild(Xn);const js=document.createElement("div");js.className="csp-color-picker-row";const si=document.createElement("input");si.type="color",si.className="csp-color-input",si.title="Selector nativo del sistema",si.addEventListener("input",()=>{pt().activeColorSlot==="primary"?yn(si.value):bn(si.value)});const ai=document.createElement("input");ai.type="text",ai.className="csp-hex-input",ai.maxLength=7,ai.placeholder="#000000",ai.addEventListener("change",()=>{let z=ai.value.trim();z.startsWith("#")||(z="#"+z),/^#[0-9a-fA-F]{6}$/.test(z)&&(pt().activeColorSlot==="primary"?yn(z):bn(z))});const yr=document.createElement("span");yr.className="csp-slot-badge",yr.textContent="Principal",js.append(si,ai,yr),Kr.appendChild(js);const jr=document.createElement("div");jr.className="csp-history-grid",Kr.appendChild(jr),Si.appendChild(Gi.wrap),E.appendChild(Si),n.appendChild(E);const Zs=document.createElement("div");Zs.className="csp-color-wheel-wrap";const _n=document.createElement("canvas");_n.className="csp-color-wheel-canvas";const Bn=176,Zr=Math.min(2,window.devicePixelRatio||1);_n.width=Math.round(Bn*Zr),_n.height=Math.round(Bn*Zr),Zs.appendChild(_n);let br=!1,Mr=!1;const od=z=>{const ie=_n.getContext("2d");if(!ie)return;ie.setTransform(Zr,0,0,Zr,0,0),ie.clearRect(0,0,Bn,Bn);const Te=Bn/2,Ge=Bn/2,ut=Bn/2-4,ht=ut-18;for(let kt=0;kt<360;kt+=1){const ss=(kt-.5)*Math.PI/180,$n=(kt+1.5)*Math.PI/180;ie.beginPath(),ie.arc(Te,Ge,ut,ss,$n),ie.arc(Te,Ge,ht,$n,ss,!0),ie.closePath(),ie.fillStyle=`hsl(${kt}, 100%, 50%)`,ie.fill()}const{r:Nt,g:Ht,b:$t}=Rn(z),{h:En,s:Tn,v:qt}=Ri(Nt,Ht,$t),Ie=(ht-8)/Math.SQRT2,me=Te-Ie,Xe=Ge-Ie,Ze=Ie*2,vt=ie.createLinearGradient(me,0,me+Ze,0);vt.addColorStop(0,"#ffffff"),vt.addColorStop(1,`hsl(${Math.round(En)}, 100%, 50%)`),ie.fillStyle=vt,ie.fillRect(me,Xe,Ze,Ze);const _t=ie.createLinearGradient(0,Xe,0,Xe+Ze);_t.addColorStop(0,"rgba(0,0,0,0)"),_t.addColorStop(1,"#000000"),ie.fillStyle=_t,ie.fillRect(me,Xe,Ze,Ze),ie.strokeStyle="rgba(255,255,255,0.2)",ie.lineWidth=1,ie.strokeRect(me,Xe,Ze,Ze);const gt=En*Math.PI/180,wn=(ut+ht)/2,Tt=Te+Math.cos(gt)*wn,ct=Ge+Math.sin(gt)*wn;ie.beginPath(),ie.arc(Tt,ct,4.5,0,Math.PI*2),ie.strokeStyle="#ffffff",ie.lineWidth=2,ie.stroke(),ie.beginPath(),ie.arc(Tt,ct,5.5,0,Math.PI*2),ie.strokeStyle="#111111",ie.lineWidth=1,ie.stroke();const Ut=me+Tn*Ze,sn=Xe+(1-qt)*Ze;ie.beginPath(),ie.arc(Ut,sn,4,0,Math.PI*2),ie.strokeStyle=qt>.5?"#111111":"#ffffff",ie.lineWidth=2,ie.stroke(),ie.beginPath(),ie.arc(Ut,sn,5,0,Math.PI*2),ie.strokeStyle=qt>.5?"#ffffff":"#111111",ie.lineWidth=1,ie.stroke()},fo=z=>{const ie=_n.getBoundingClientRect(),Te=z.clientX-ie.left,Ge=z.clientY-ie.top,ut=Bn/2,ht=Bn/2,Nt=Math.hypot(Te-ut,Ge-ht),Ht=Bn/2-4,$t=Ht-18,En=($t-8)/Math.SQRT2,Tn=ut-En,qt=ht-En,Ie=En*2,me=pt(),Xe=me.activeColorSlot==="primary"?me.primaryColor:me.secondaryColor,{r:Ze,g:vt,b:_t}=Rn(Xe);let{h:gt,s:wn,v:Tt}=Ri(Ze,vt,_t);br||!Mr&&Nt>=$t-4&&Nt<=Ht+6?(br=!0,gt=(Math.atan2(Ge-ht,Te-ut)*180/Math.PI+360)%360):(Mr||!br&&Te>=Tn-4&&Te<=Tn+Ie+4&&Ge>=qt-4&&Ge<=qt+Ie+4)&&(Mr=!0,wn=Math.max(0,Math.min(1,(Te-Tn)/Ie)),Tt=Math.max(0,Math.min(1,1-(Ge-qt)/Ie)));const ct=Xt(gt,wn,Tt);me.activeColorSlot==="primary"?yn(ct):bn(ct)};_n.addEventListener("pointerdown",z=>{_n.setPointerCapture(z.pointerId),fo(z)}),_n.addEventListener("pointermove",z=>{(br||Mr)&&fo(z)});const ho=z=>{br=!1,Mr=!1;try{_n.releasePointerCapture(z.pointerId)}catch{}};_n.addEventListener("pointerup",ho),_n.addEventListener("pointercancel",ho);const Js=document.createElement("div");Js.className="csp-rgb-sliders-wrap";function Vi(z,ie,Te,Ge){const ut=document.createElement("div");ut.className="csp-channel-row";const ht=document.createElement("span");ht.className="csp-channel-tag",ht.textContent=z;const Nt=document.createElement("input");Nt.type="range",Nt.className="csp-channel-slider",Nt.min=String(ie),Nt.max=String(Te);const Ht=document.createElement("input");return Ht.type="number",Ht.className="csp-channel-num",Ht.min=String(ie),Ht.max=String(Te),Nt.addEventListener("input",()=>{const $t=Number(Nt.value);Ht.value=String($t),Ge($t)}),Ht.addEventListener("change",()=>{let $t=Number(Ht.value);$t=Math.max(ie,Math.min(Te,$t)),Nt.value=String($t),Ge($t)}),ut.append(ht,Nt,Ht),{row:ut,slider:Nt,numInput:Ht}}const Jr=Vi("R",0,255,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),Ge=Is(z,Te.g,Te.b);ie.activeColorSlot==="primary"?yn(Ge):bn(Ge)}),Qr=Vi("G",0,255,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),Ge=Is(Te.r,z,Te.b);ie.activeColorSlot==="primary"?yn(Ge):bn(Ge)}),es=Vi("B",0,255,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),Ge=Is(Te.r,Te.g,z);ie.activeColorSlot==="primary"?yn(Ge):bn(Ge)}),ts=Vi("H",0,360,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),{s:Ge,v:ut}=Ri(Te.r,Te.g,Te.b),ht=Xt(z,Ge,ut);ie.activeColorSlot==="primary"?yn(ht):bn(ht)}),ns=Vi("S",0,100,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),{h:Ge,v:ut}=Ri(Te.r,Te.g,Te.b),ht=Xt(Ge,z/100,ut);ie.activeColorSlot==="primary"?yn(ht):bn(ht)}),is=Vi("V",0,100,z=>{const ie=pt(),Te=Rn(ie.activeColorSlot==="primary"?ie.primaryColor:ie.secondaryColor),{h:Ge,s:ut}=Ri(Te.r,Te.g,Te.b),ht=Xt(Ge,ut,z/100);ie.activeColorSlot==="primary"?yn(ht):bn(ht)});ts.slider.style.background="linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",Js.append(Jr.row,Qr.row,es.row,document.createElement("div"),ts.row,ns.row,is.row);const Wi=document.createElement("div");Wi.style.display="flex",Wi.style.flexDirection="column",Wi.style.gap="6px";const Qs=document.createElement("div");Qs.className="csp-colorset-toolbar";const Xi=document.createElement("select");Xi.className="csp-colorset-select",Xi.addEventListener("change",()=>{qg(Xi.value)});const Sr=document.createElement("button");Sr.className="csp-subtool-action-btn",Sr.textContent="+ Guardar",Sr.title="Añadir color actual a este conjunto",Sr.addEventListener("click",()=>{const z=pt(),ie=z.activeColorSlot==="primary"?z.primaryColor:z.secondaryColor;Yg(ie)}),Qs.append(Xi,Sr),Wi.appendChild(Qs);const Er=document.createElement("div");Er.className="csp-history-grid",Er.style.gridTemplateColumns="repeat(8, 1fr)",Wi.appendChild(Er);const rs=document.createElement("div");rs.className="csp-harmony-list";const ea=z=>{for(const[Ie,me]of i)me.classList.toggle("active",z.tool===Ie);E.classList.toggle("open",z.propertiesOpen),b.classList.toggle("active",z.propertiesOpen),b.innerHTML=z.propertiesOpen?'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',document.documentElement.style.setProperty("--left-dock-width",z.propertiesOpen?`${p+48}px`:"48px"),f.style.background=z.primaryColor,d.style.background=z.secondaryColor,f.classList.toggle("active-slot",z.activeColorSlot==="primary"&&!z.isTransparentColor),d.classList.toggle("active-slot",z.activeColorSlot==="secondary"&&!z.isTransparentColor),x.classList.toggle("active",z.isTransparentColor);const ie=jg(z.tool),Te=ie.find(Ie=>Ie.id===z.activeSubToolId);F.list.innerHTML="";for(const Ie of ie){const me=document.createElement("div");me.className="csp-subtool-item",me.classList.toggle("active",Ie.id===z.activeSubToolId),me.classList.toggle("custom",!!Ie.custom);const Xe=document.createElement("span");Xe.className="csp-subtool-dot",me.appendChild(Xe);const Ze=document.createElement("span");if(Ze.className="csp-subtool-name",Ze.textContent=Ie.name,me.appendChild(Ze),Ie.settings.size!==void 0){const _t=document.createElement("span");_t.className="csp-subtool-size-badge",_t.textContent=`${Math.round(Ie.settings.size)}`,me.appendChild(_t)}const vt=document.createElement("button");vt.className="csp-subtool-gear-btn",vt.title=`Ajustes de subherramienta (${Ie.name})`,vt.innerHTML=`
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      `,vt.addEventListener("click",_t=>{_t.stopPropagation(),Ua(Ie)}),me.appendChild(vt),me.title=Ie.description,me.addEventListener("click",()=>{Yl(Ie.id)}),F.list.appendChild(me)}requestAnimationFrame(()=>{F.update(),I.update(),Gi.update()}),G.disabled=!Te,P.disabled=!Te||!Te.custom;const Ge=z.tool==="bone",ut=z.tool==="pen"||z.tool==="brush"||z.tool==="eraser";oe.style.display=ut?"block":"none";for(const[Ie,me]of V)if(ut){const Xe=z.visibleProperties.includes(Ie);me.style.display=Xe?"block":"none"}else me.style.display="none";ri.textContent=ut?`👁 ${z.visibleProperties.length} propiedades fijadas`:`${ie.length} subherramientas`,ut&&J(),le.value=String(Math.round(z.brush.size));const ht=B.querySelector("#size-val");ht&&(ht.textContent=`${Math.round(z.brush.size)} px`),ke.querySelectorAll(".csp-quick-size-btn").forEach(Ie=>{Ie.classList.toggle("active",Number(Ie.textContent)===Math.round(z.brush.size))}),Oe.value=String(Math.round(z.brush.opacity*100));const Nt=B.querySelector("#opacity-val");Nt&&(Nt.textContent=`${Math.round(z.brush.opacity*100)}%`),ot.value=String(Math.round(z.brush.flow*100));const Ht=B.querySelector("#flow-val");Ht&&(Ht.textContent=`${Math.round(z.brush.flow*100)}%`),tt.box.checked=z.brush.pressureFlow;const $t=B.querySelector("#hardness-val");$t&&($t.textContent=`${Math.round(z.brush.hardness*100)}%`),He.forEach((Ie,me)=>{const Xe=Se[me];Ie.classList.toggle("active",Math.abs(z.brush.hardness-Xe.val)<.12)}),O.value=String(Math.round(z.brush.stabilization));const En=B.querySelector("#stab-val");En&&(En.textContent=String(Math.round(z.brush.stabilization))),Ee.box.checked=z.brush.pressureSize,$e.value=String(Math.round(z.brush.minSizeRatio*100)),$e.disabled=!z.brush.pressureSize,ve.value.textContent=`${Math.round(z.brush.minSizeRatio*100)}%`,fe.value=String(Math.round(z.brush.taperStart)),mt.value.textContent=`${Math.round(z.brush.taperStart)} px`,ye.value=String(Math.round(z.brush.taperEnd)),Pe.value.textContent=`${Math.round(z.brush.taperEnd)} px`;for(const[Ie,me]of Be.buttons)me.classList.toggle("active",z.brush.tipShape===Ie);for(const[Ie,me]of Lt.buttons)me.classList.toggle("active",z.brush.antiAliasing===Ie);nn.value=String(Math.round(z.brush.tipRoundness*100)),zt.value.textContent=`${Math.round(z.brush.tipRoundness*100)}%`,R.value=String(Math.round(z.brush.tipAngle)),yi.value.textContent=`${Math.round(z.brush.tipAngle)}°`,K.style.display=z.tool==="bucket"?"block":"none",te.value=String(Math.round(z.brush.tolerance));const Tn=B.querySelector("#tol-val");Tn&&(Tn.textContent=`${Math.round(z.brush.tolerance)}%`),Z.style.display=z.tool==="shape"?"block":"none";for(const[Ie,me]of Ye)me.classList.toggle("active",z.brush.shapeType===Ie);for(const[Ie,me]of Ct)me.classList.toggle("active",z.brush.shapeFill===Ie);if(St.style.display=Ge?"flex":"none",Ge){for(const[me,Xe]of Et.buttons)Xe.classList.toggle("active",z.boneMode===me);rt.box.checked=z.showBonesOverlay,yt.box.checked=z.autoKeyBones,z.boneMode==="rig"?vn.textContent="Rig: Clic y arrastra en vacío para crear hueso. Arrastra la punta/base para editar. Shift+clic en punta encadena hijo; Alt+clic crea raíz.":z.boneMode==="pose_fk"?vn.textContent="Posar FK: Arrastra el cuerpo de un hueso para rotarlo. Arrastra la base raíz (o Shift+arrastrar) para trasladar.":vn.textContent="Posar IK: Haz clic y arrastra el hueso extremo (mano, antebrazo, pie) para doblar la cadena de 2 huesos automáticamente.",It.innerHTML="";const Ie=e==null?void 0:e.timeline;if(Ie){const me=Ie.bones.find(Xe=>Xe.id===Ie.selectedBoneId)??null;if(me){const Xe=document.createElement("div");Xe.className="prop-row-header",Xe.innerHTML=`<span class="prop-label">Hueso activo</span><span class="prop-value" style="color:${me.color}">${me.name}</span>`,It.appendChild(Xe);const Ze=document.createElement("input");Ze.type="text",Ze.className="csp-hex-input",Ze.style.width="100%",Ze.value=me.name,Ze.title="Nombre del hueso",Ze.addEventListener("change",()=>{Ze.value.trim()&&Ie.renameBone(me.id,Ze.value.trim())}),It.appendChild(Ze);const vt=document.createElement("div");vt.style.display="flex",vt.style.alignItems="center",vt.style.gap="4px";const _t=document.createElement("span");_t.className="prop-label",_t.textContent="Padre:";const gt=document.createElement("select");gt.style.flex="1",gt.style.background="#1e1e1e",gt.style.color="#e0e0e0",gt.style.border="1px solid #3c3c3c",gt.style.borderRadius="3px",gt.style.fontSize="11px",gt.style.padding="2px 4px";const wn=document.createElement("option");wn.value="",wn.textContent="(Raíz / Ninguno)",gt.appendChild(wn);for(const sn of Ie.bones){if(sn.id===me.id)continue;const kt=document.createElement("option");kt.value=sn.id,kt.textContent=sn.name,sn.id===me.parentId&&(kt.selected=!0),gt.appendChild(kt)}gt.addEventListener("change",()=>{Ie.setBoneParent(me.id,gt.value||null)}),vt.append(_t,gt),It.appendChild(vt);const Tt=document.createElement("div");Tt.style.display="flex",Tt.style.gap="4px";const ct=document.createElement("button");ct.className="csp-seg-btn",ct.style.flex="1",ct.textContent=`⇄ Codo IK (${me.ikBendPositive?"+":"-"})`,ct.title="Invertir la dirección de flexión del codo/rodilla en Cinemática Inversa",ct.addEventListener("click",()=>{Ie.toggleBoneIKBend(me.id)});const Ut=document.createElement("button");Ut.className="csp-seg-btn",Ut.style.color="#f87171",Ut.textContent="🗑 Eliminar",Ut.title="Eliminar este hueso",Ut.addEventListener("click",()=>{Ie.deleteBone(me.id)}),Tt.append(ct,Ut),It.appendChild(Tt)}else{const Xe=document.createElement("span");Xe.className="prop-label",Xe.style.color="#80868b",Xe.textContent=`Huesos en escena: ${Ie.bones.length} (Haz clic en un hueso para inspeccionarlo)`,It.appendChild(Xe)}}}const qt=z.activeColorSlot==="primary"?z.primaryColor:z.secondaryColor;si.value=qt,ai.value=qt.toUpperCase(),yr.textContent=z.activeColorSlot==="primary"?"Principal":"Secundario",z.isTransparentColor&&(yr.textContent="Transparente");for(const[Ie,me]of po)me.classList.toggle("active",z.colorTab===Ie);if(Xn.innerHTML="",z.colorTab==="picker")Xn.appendChild(Zs),od(qt);else if(z.colorTab==="rgb"){Xn.appendChild(Js);const{r:Ie,g:me,b:Xe}=Rn(qt),{h:Ze,s:vt,v:_t}=Ri(Ie,me,Xe);Jr.slider.value=String(Ie),Jr.numInput.value=String(Ie),Jr.slider.style.background=`linear-gradient(90deg, rgb(0,${me},${Xe}), rgb(255,${me},${Xe}))`,Qr.slider.value=String(me),Qr.numInput.value=String(me),Qr.slider.style.background=`linear-gradient(90deg, rgb(${Ie},0,${Xe}), rgb(${Ie},255,${Xe}))`,es.slider.value=String(Xe),es.numInput.value=String(Xe),es.slider.style.background=`linear-gradient(90deg, rgb(${Ie},${me},0), rgb(${Ie},${me},255))`,ts.slider.value=String(Math.round(Ze)),ts.numInput.value=String(Math.round(Ze)),ns.slider.value=String(Math.round(vt*100)),ns.numInput.value=String(Math.round(vt*100)),ns.slider.style.background=`linear-gradient(90deg, ${Xt(Ze,0,_t)}, ${Xt(Ze,1,_t)})`,is.slider.value=String(Math.round(_t*100)),is.numInput.value=String(Math.round(_t*100)),is.slider.style.background=`linear-gradient(90deg, #000000, ${Xt(Ze,vt,1)})`}else if(z.colorTab==="set"){Xn.appendChild(Wi),Xi.innerHTML="";for(const me of z.colorSets){const Xe=document.createElement("option");Xe.value=me.id,Xe.textContent=`${me.name} (${me.colors.length})`,me.id===z.activeColorSetId&&(Xe.selected=!0),Xi.appendChild(Xe)}const Ie=z.colorSets.find(me=>me.id===z.activeColorSetId)??z.colorSets[0];Er.innerHTML="",Ie&&Ie.colors.forEach((me,Xe)=>{const Ze=document.createElement("div");Ze.className="csp-history-chip",Ze.style.backgroundColor=me,Ze.title=`${me.toUpperCase()} (Clic para elegir, Shift+clic para borrar)`,Ze.classList.toggle("active",me.toLowerCase()===qt.toLowerCase()),Ze.addEventListener("click",vt=>{vt.shiftKey?Kg(Xe):z.activeColorSlot==="primary"?yn(me):bn(me)}),Er.appendChild(Ze)})}else if(z.colorTab==="harmony"){Xn.appendChild(rs),rs.innerHTML="";const Ie=t0(qt);for(const me of Ie){const Xe=document.createElement("div");Xe.className="csp-harmony-group";const Ze=document.createElement("span");Ze.className="csp-harmony-title",Ze.textContent=me.label,Xe.appendChild(Ze);const vt=document.createElement("div");vt.className="csp-harmony-swatches";for(const _t of me.colors){const gt=document.createElement("button");gt.className="csp-harmony-swatch-btn",gt.style.backgroundColor=_t.hex,gt.title=`${_t.tag}: ${_t.hex.toUpperCase()}`,gt.innerHTML=`<span class="csp-harmony-swatch-tag">${_t.tag}</span>`,gt.addEventListener("click",()=>{z.activeColorSlot==="primary"?yn(_t.hex):bn(_t.hex)}),vt.appendChild(gt)}Xe.appendChild(vt),rs.appendChild(Xe)}}jr.innerHTML="";for(const Ie of z.colorHistory){const me=document.createElement("div");me.className="csp-history-chip",me.style.backgroundColor=Ie,me.title=Ie.toUpperCase(),me.classList.toggle("active",Ie.toLowerCase()===qt.toLowerCase()),me.addEventListener("click",()=>{z.activeColorSlot==="primary"?yn(Ie):bn(Ie)}),jr.appendChild(me)}requestAnimationFrame(()=>{F.update(),I.update(),Gi.update()})};ea(pt()),ro(ea),(go=e==null?void 0:e.timeline)==null||go.subscribe(()=>{pt().tool==="bone"&&ea(pt())})}const T0=document.getElementById("viewport")??document.body,so=document.createElement("canvas");T0.appendChild(so);const qs=new Hc({canvas:so,antialias:!0,alpha:!0});qs.setSize(window.innerWidth,window.innerHeight);qs.setPixelRatio(Math.min(window.devicePixelRatio,2));const ao=new vg,pi=new Nc(-1,1,1,-1,.1,100);pi.position.set(0,.6,10);function nd(){const n=window.innerWidth,e=window.innerHeight,t=n/e;qs.setSize(n,e);const i=11.5,r=19,s=i*t,o=s<r?r/s:1,a=i*o;pi.left=-a*t/2,pi.right=a*t/2,pi.top=a/2,pi.bottom=-a/2,pi.updateProjectionMatrix()}window.addEventListener("resize",nd);nd();const w0=new Vr(16.08,9.08),C0=new Xs({color:526344,side:In}),id=new Hn(w0,C0);id.position.set(0,0,-.01);ao.add(id);const Vn=f0(),vr=wg(Vn.layerManager);Vn.setTimelineManager(vr);vr.tracks.length===0&&vr.createTrack("Animation 1");const $r=new _g(Vn.compositeCanvas);$r.minFilter=dn;$r.magFilter=dn;$r.generateMipmaps=!1;const A0=new Vr(16,9),L0=new Xs({map:$r,side:In}),rd=new Hn(A0,L0);ao.add(rd);g0({canvas:so,camera:pi,plane:rd,engine:Vn,docW:Pt,docH:Dt,onPickColor:n=>{ft({color:n})}});const sc=document.getElementById("tools-container");sc&&E0(sc,{onUndo:()=>Vn.undo(),onRedo:()=>Vn.redo(),timeline:vr});const ac=document.getElementById("layers-container");ac&&b0(ac,Vn.layerManager,vr);const oc=document.getElementById("timeline-container");oc&&Ag(oc,vr,Vn.layerManager);function sd(){requestAnimationFrame(sd),Vn.compositeDirty&&(Vn.updateComposite(),$r.needsUpdate=!0),qs.render(ao,pi)}sd();console.log("AnimacionApp: Lateral Toolbar, Layers Panel, Timeline and Brush Engine mounted.");
