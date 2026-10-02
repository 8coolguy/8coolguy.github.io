"use client";

import { useEffect, useRef, useState } from "react";

const vertexShader = `#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

in vec2 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texcoord = a_texcoord;
}`;

export const DEFAULT_SHADER = `#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){gl_FragColor = vec4(vec3(0.0), 1.0);}`;

const canvasOptions = {
  backgroundColor: "rgba(0.0, 0.0, 0.0, 0.0)",
  alpha: true,
  // Antialiasing a full-canvas fragment shader only increases the size of the
  // drawing buffer. It is particularly expensive on high-DPI phones.
  antialias: false,
  depth: true,
  // Mobile browsers frequently report a performance caveat even when WebGL is
  // usable. Rejecting those contexts made the canvas stay blank on those
  // devices.
  failIfMajorPerformanceCaveat: false,
  powerPreference: "default",
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  stencil: false,
  desynchronized: false,
};

function webGl1Fallback(code) {
  const output = code.match(
    /\bout\s+(?:(?:lowp|mediump|highp)\s+)?vec4\s+([A-Za-z_]\w*)\s*;/,
  )?.[1];

  let fallback = code
    .replace(/^\s*#version\s+300\s+es\s*\n/, "")
    .replace(/\bout\s+(?:(?:lowp|mediump|highp)\s+)?vec4\s+[A-Za-z_]\w*\s*;/, "")
    .replace(/\btexture\s*\(/g, "texture2D(");

  if (output) {
    fallback = fallback.replace(new RegExp(`\\b${output}\\b`, "g"), "gl_FragColor");
  }

  return fallback;
}

function shaderSources(canvas, code) {
  const source = code.trimStart();
  if (!source.startsWith("#version 300 es")) {
    return { fragmentString: source };
  }

  // Asking for the context on the target canvas is the only reliable WebGL 2
  // capability check. glsl-canvas receives this same context immediately
  // afterward, so this does not allocate an additional GPU context.
  const webGl2 = canvas.getContext("webgl2", canvasOptions);
  if (webGl2) {
    return { fragmentString: source, vertexString: vertexShader };
  }

  // The shaders currently stored by the site only use WebGL 2's output syntax,
  // so they can still run in mobile WebViews that expose WebGL 1 only.
  return { fragmentString: webGl1Fallback(source) };
}

function loadShader(instance, code) {
  const { fragmentString, vertexString } = shaderSources(instance.canvas, code);
  return instance.load(fragmentString, vertexString);
}

export default function ShaderClient({
  width,
  height,
  code,
  author,
  onError = () => {},
  onCompile = () => {},
  className,
  wrapClassName,
  pauseOnHidden = true,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const sandboxRef = useRef(null);
  const codeRef = useRef(code);
  const loadedCodeRef = useRef(null);
  const callbacksRef = useRef({ onError, onCompile });
  const [canvasGeneration, setCanvasGeneration] = useState(0);

  codeRef.current = code;
  callbacksRef.current = { onError, onCompile };

  useEffect(() => {
    let cancelled = false;
    let disposeTimer;
    let initializationId = 0;

    function dispose({ replaceCanvas = false } = {}) {
      initializationId += 1;
      const instance = sandboxRef.current;
      sandboxRef.current = null;
      loadedCodeRef.current = null;

      if (!instance) return;
      // glsl-canvas assumes a context exists when destroy() is called.
      if (instance.gl) {
        const loseContext = instance.gl.getExtension("WEBGL_lose_context");
        instance.destroy();
        loseContext?.loseContext();
      } else {
        instance.pause?.();
      }

      // A context deliberately lost through WEBGL_lose_context cannot be
      // reused. Mount a fresh canvas before this shader comes back on screen.
      if (replaceCanvas) setCanvasGeneration((current) => current + 1);
    }

    async function initialize() {
      if (sandboxRef.current) {
        sandboxRef.current.play?.();
        return;
      }

      const currentInitialization = ++initializationId;
      // The package's published entry points reference non-existent files, so
      // import its browser ESM build directly.
      const { Canvas } = await import("glsl-canvas-js/dist/esm/glsl.js");
      if (
        cancelled ||
        currentInitialization !== initializationId ||
        !canvasRef.current
      ) return;

      const initialCode = codeRef.current;
      const sources = shaderSources(canvasRef.current, initialCode);
      const instance = new Canvas(canvasRef.current, {
        ...canvasOptions,
        ...sources,
        onError: (error) => callbacksRef.current.onError(error),
      });
      // A DPR of 3 or 4 can turn a modest mobile canvas into a multi-million
      // pixel drawing buffer. Two retains sharp rendering without exhausting
      // mobile GPU memory.
      instance.devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      sandboxRef.current = instance;
      loadedCodeRef.current = initialCode;
      instance.on("error", (event) => callbacksRef.current.onError(event));
      instance.on("load", () => callbacksRef.current.onCompile());
    }

    function reportInitializationError(error) {
      callbacksRef.current.onError(error);
    }

    if (pauseOnHidden && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          window.clearTimeout(disposeTimer);
          if (entry.isIntersecting) {
            initialize().catch(reportInitializationError);
          } else if (sandboxRef.current) {
            sandboxRef.current.pause?.();
            // Releasing off-screen contexts keeps the gallery below mobile
            // browsers' small limit on simultaneous WebGL contexts.
            disposeTimer = window.setTimeout(
              () => dispose({ replaceCanvas: true }),
              500,
            );
          }
        },
        { rootMargin: "300px 0px" },
      );

      if (wrapperRef.current) observer.observe(wrapperRef.current);

      return () => {
        cancelled = true;
        window.clearTimeout(disposeTimer);
        observer.disconnect();
        dispose();
      };
    }

    initialize().catch(reportInitializationError);

    return () => {
      cancelled = true;
      window.clearTimeout(disposeTimer);
      dispose();
    };
  }, [pauseOnHidden, canvasGeneration]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const instance = sandboxRef.current;
      if (!instance || loadedCodeRef.current === code) return;

      const wantsWebGl2 = code.trimStart().startsWith("#version 300 es");
      const usesWebGl2 =
        typeof WebGL2RenderingContext !== "undefined" &&
        instance.gl instanceof WebGL2RenderingContext;

      // glsl-canvas changes context versions by replacing its canvas behind
      // React's back. Remount it through React instead so refs and cleanup stay
      // correct when an editor switches between GLSL 1 and GLSL 3.
      if (wantsWebGl2 !== usesWebGl2) {
        setCanvasGeneration((current) => current + 1);
        return;
      }

      loadedCodeRef.current = code;
      loadShader(instance, code)
        .then((valid) => {
          if (valid) callbacksRef.current.onCompile();
        })
        .catch((error) => callbacksRef.current.onError(error));
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [code]);

  return (
    <div ref={wrapperRef} className={wrapClassName}>
      <canvas
        key={canvasGeneration}
        ref={canvasRef}
        height={height}
        width={width}
        className={className}
        style={className ? undefined : { width, height }}
      />
      {author ? <p className="text-right">{author}</p> : null}
    </div>
  );
}
