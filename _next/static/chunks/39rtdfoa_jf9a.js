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
}`,o=`#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){gl_FragColor = vec4(vec3(0.0), 1.0);}`,i={backgroundColor:"rgba(0.0, 0.0, 0.0, 0.0)",alpha:!0,antialias:!1,depth:!0,failIfMajorPerformanceCaveat:!1,powerPreference:"default",premultipliedAlpha:!0,preserveDrawingBuffer:!1,stencil:!1,desynchronized:!1};function c(e,r){let t,o,c=r.trimStart();return c.startsWith("#version 300 es")?e.getContext("webgl2",i)?{fragmentString:c,vertexString:n}:{fragmentString:(t=c.match(/\bout\s+(?:(?:lowp|mediump|highp)\s+)?vec4\s+([A-Za-z_]\w*)\s*;/)?.[1],o=c.replace(/^\s*#version\s+300\s+es\s*\n/,"").replace(/\bout\s+(?:(?:lowp|mediump|highp)\s+)?vec4\s+[A-Za-z_]\w*\s*;/,"").replace(/\btexture\s*\(/g,"texture2D("),t&&(o=o.replace(RegExp(`\\b${t}\\b`,"g"),"gl_FragColor")),o)}:{fragmentString:c}}e.s(["DEFAULT_SHADER",0,o,"default",0,function({width:n,height:o,code:u,author:s,onError:l=()=>{},onCompile:a=()=>{},className:f,wrapClassName:d,pauseOnHidden:p=!0}){let m=(0,t.useRef)(null),g=(0,t.useRef)(null),v=(0,t.useRef)(null),h=(0,t.useRef)(u),w=(0,t.useRef)(null),x=(0,t.useRef)({onError:l,onCompile:a}),[_,b]=(0,t.useState)(0);return h.current=u,x.current={onError:l,onCompile:a},(0,t.useEffect)(()=>{let r,t=!1,n=0;function o({replaceCanvas:e=!1}={}){n+=1;let r=v.current;if(v.current=null,w.current=null,r){if(r.gl){let e=r.gl.getExtension("WEBGL_lose_context");r.destroy(),e?.loseContext()}else r.pause?.();e&&b(e=>e+1)}}async function u(){if(v.current)return void v.current.play?.();let r=++n,{Canvas:o}=await e.A(78304);if(t||r!==n||!m.current)return;let u=h.current,s=c(m.current,u),l=new o(m.current,{...i,...s,onError:e=>x.current.onError(e)});l.devicePixelRatio=Math.min(window.devicePixelRatio||1,2),v.current=l,w.current=u,l.on("error",e=>x.current.onError(e)),l.on("load",()=>x.current.onCompile())}function s(e){x.current.onError(e)}if(p&&"IntersectionObserver"in window){let e=new IntersectionObserver(([e])=>{window.clearTimeout(r),e.isIntersecting?u().catch(s):v.current&&(v.current.pause?.(),r=window.setTimeout(()=>o({replaceCanvas:!0}),500))},{rootMargin:"300px 0px"});return g.current&&e.observe(g.current),()=>{t=!0,window.clearTimeout(r),e.disconnect(),o()}}return u().catch(s),()=>{t=!0,window.clearTimeout(r),o()}},[p,_]),(0,t.useEffect)(()=>{let e=window.setTimeout(()=>{let e=v.current;e&&w.current!==u&&(u.trimStart().startsWith("#version 300 es")!==("u">typeof WebGL2RenderingContext&&e.gl instanceof WebGL2RenderingContext)?b(e=>e+1):(w.current=u,(function(e,r){let{fragmentString:t,vertexString:n}=c(e.canvas,r);return e.load(t,n)})(e,u).then(e=>{e&&x.current.onCompile()}).catch(e=>x.current.onError(e))))},700);return()=>window.clearTimeout(e)},[u]),(0,r.jsxs)("div",{ref:g,className:d,children:[(0,r.jsx)("canvas",{ref:m,height:o,width:n,className:f,style:f?void 0:{width:n,height:o}},_),s?(0,r.jsx)("p",{className:"text-right",children:s}):null]})}])},78304,e=>{e.v(r=>Promise.all(["static/chunks/1koqz21xpqrq2.js"].map(r=>e.l(r))).then(()=>r(95978)))}]);