(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,79598,e=>{"use strict";var r=e.i(43476),t=e.i(71645),n=e.i(51052);e.s(["default",0,function(){let[e,o]=(0,t.useState)([]),[i,s]=(0,t.useState)({}),[a,c]=(0,t.useState)("loading");return((0,t.useEffect)(()=>{let e=new AbortController;return fetch("https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod",{method:"POST",body:JSON.stringify({action:"batch",count:-1}),signal:e.signal}).then(e=>e.json()).then(e=>{if(400===e.statusCode)throw Error("API error");o(JSON.parse(e.body)),c("ready")}).catch(e=>{"AbortError"!==e.name&&(console.error("error:",e),c("error"))}),()=>e.abort()},[]),"loading"===a)?(0,r.jsx)("p",{className:"text-center text-gray-500",children:"Loading shaders…"}):"error"===a?(0,r.jsx)("p",{className:"text-center text-gray-500",children:"Could not load shaders."}):(0,r.jsx)("div",{className:"grid md:grid-cols-2 grid-cols-1 gap-8",children:e.filter(e=>e.code?.length>0&&!i[e.id]).map(e=>(0,r.jsx)(n.default,{height:300,width:300,code:JSON.parse(e.code),author:e.author,onError:()=>s(r=>({...r,[e.id]:!0}))},e.id))})}])},30551,function(e){e.n(e.i(79598))},51052,e=>{"use strict";var r=e.i(43476),t=e.i(71645);let n=`#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

in vec2 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`,o=`#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){gl_FragColor = vec4(vec3(0.0), 1.0);}`,i={backgroundColor:"rgba(0.0, 0.0, 0.0, 0.0)",alpha:!0,antialias:!0,depth:!0,failIfMajorPerformanceCaveat:!0,powerPreference:"default",premultipliedAlpha:!0,preserveDrawingBuffer:!1,stencil:!1,desynchronized:!1};function s(e,r){r.trimStart().startsWith("#version 300 es")?e.load(r,n):e.load(r)}e.s(["DEFAULT_SHADER",0,o,"default",0,function({width:n,height:o,code:a,author:c,onError:u=()=>{},onCompile:l=()=>{},className:d,wrapClassName:f,pauseOnHidden:h=!0}){let p=(0,t.useRef)(null),m=(0,t.useRef)(null),g=(0,t.useRef)(null),v=(0,t.useRef)(a),x=(0,t.useRef)({onError:u,onCompile:l});return v.current=a,x.current={onError:u,onCompile:l},(0,t.useEffect)(()=>{let r=!1;return(async function(){let{Canvas:t}=await e.A(78304);if(r||!p.current)return;let n=new t(p.current,i);g.current=n,n.on("error",e=>x.current.onError(e)),s(n,v.current),x.current.onCompile()})().catch(e=>x.current.onError(e)),()=>{r=!0,g.current?.pause?.(),g.current=null}},[]),(0,t.useEffect)(()=>{let e=window.setTimeout(()=>{g.current&&(s(g.current,a),x.current.onCompile())},700);return()=>window.clearTimeout(e)},[a]),(0,t.useEffect)(()=>{if(!h||!m.current||!("IntersectionObserver"in window))return;let e=new IntersectionObserver(([e])=>{let r=g.current;r&&(e.isIntersecting?r.play():r.pause())});return e.observe(m.current),()=>e.disconnect()},[h]),(0,r.jsxs)("div",{ref:m,className:f,children:[(0,r.jsx)("canvas",{ref:p,height:o,width:n,className:d}),c?(0,r.jsx)("p",{className:"text-right",children:c}):null]})}])},78304,e=>{e.v(r=>Promise.all(["static/chunks/1koqz21xpqrq2.js"].map(r=>e.l(r))).then(()=>r(95978)))}]);