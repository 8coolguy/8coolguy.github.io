(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,51052,e=>{"use strict";var r=e.i(43476),t=e.i(71645);let n=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

in vec2 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`,i=`#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){gl_FragColor = vec4(vec3(0.0), 1.0);}`,o={backgroundColor:"rgba(0.0, 0.0, 0.0, 0.0)",alpha:!0,antialias:!0,depth:!0,failIfMajorPerformanceCaveat:!0,powerPreference:"default",premultipliedAlpha:!0,preserveDrawingBuffer:!1,stencil:!1,desynchronized:!1};function c(e,r){r.trimStart().startsWith("#version 300 es")?e.load(r,n):e.load(r)}e.s(["DEFAULT_SHADER",0,i,"default",0,function({width:n,height:i,code:u,author:s,onError:l=()=>{},onCompile:a=()=>{},className:f,wrapClassName:d,pauseOnHidden:p=!0}){let v=(0,t.useRef)(null),m=(0,t.useRef)(null),h=(0,t.useRef)(null),_=(0,t.useRef)(u),w=(0,t.useRef)({onError:l,onCompile:a});return _.current=u,w.current={onError:l,onCompile:a},(0,t.useEffect)(()=>{let r=!1;return(async function(){let{Canvas:t}=await e.A(78304);if(r||!v.current)return;let n=new t(v.current,o);h.current=n,n.on("error",e=>w.current.onError(e)),c(n,_.current),w.current.onCompile()})().catch(e=>w.current.onError(e)),()=>{r=!0,h.current?.pause?.(),h.current=null}},[]),(0,t.useEffect)(()=>{let e=window.setTimeout(()=>{h.current&&(c(h.current,u),w.current.onCompile())},700);return()=>window.clearTimeout(e)},[u]),(0,t.useEffect)(()=>{if(!p||!m.current||!("IntersectionObserver"in window))return;let e=new IntersectionObserver(([e])=>{let r=h.current;r&&(e.isIntersecting?r.play():r.pause())});return e.observe(m.current),()=>e.disconnect()},[p]),(0,r.jsxs)("div",{ref:m,className:d,children:[(0,r.jsx)("canvas",{ref:v,height:i,width:n,className:f,style:f?void 0:{width:n,height:i}}),s?(0,r.jsx)("p",{className:"text-right",children:s}):null]})}])},78304,e=>{e.v(r=>Promise.all(["static/chunks/1koqz21xpqrq2.js"].map(r=>e.l(r))).then(()=>r(95978)))}]);