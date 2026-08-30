"use client";

import { useEffect, useRef } from "react";

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
  antialias: true,
  depth: true,
  failIfMajorPerformanceCaveat: true,
  powerPreference: "default",
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  stencil: false,
  desynchronized: false,
};

function loadShader(instance, code) {
  if (code.trimStart().startsWith("#version 300 es")) {
    instance.load(code, vertexShader);
  } else {
    instance.load(code);
  }
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
  const callbacksRef = useRef({ onError, onCompile });

  codeRef.current = code;
  callbacksRef.current = { onError, onCompile };

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      // The package's published entry points reference non-existent files, so
      // import its browser ESM build directly.
      const { Canvas } = await import("glsl-canvas-js/dist/esm/glsl.js");
      if (cancelled || !canvasRef.current) return;

      const instance = new Canvas(canvasRef.current, canvasOptions);
      sandboxRef.current = instance;
      instance.on("error", (event) => callbacksRef.current.onError(event));
      loadShader(instance, codeRef.current);
      callbacksRef.current.onCompile();
    }

    initialize().catch((error) => callbacksRef.current.onError(error));

    return () => {
      cancelled = true;
      sandboxRef.current?.pause?.();
      sandboxRef.current = null;
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!sandboxRef.current) return;
      loadShader(sandboxRef.current, code);
      callbacksRef.current.onCompile();
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [code]);

  useEffect(() => {
    if (!pauseOnHidden || !wrapperRef.current || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      const instance = sandboxRef.current;
      if (!instance) return;
      if (entry.isIntersecting) instance.play();
      else instance.pause();
    });

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [pauseOnHidden]);

  return (
    <div ref={wrapperRef} className={wrapClassName}>
      <canvas
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
