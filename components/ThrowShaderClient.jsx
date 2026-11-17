"use client";

import { useState } from "react";
import ShaderClient from "@/components/ShaderClient";
import styles from "./ThrowShaderClient.module.css";

const shaderApi = "https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod";

const STARTER_SHADER = `#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = 0.5 + 0.5 * cos(
    u_time + uv.xyx + vec3(0.0, 2.0, 4.0)
  );
  gl_FragColor = vec4(color, 1.0);
}`;

export default function ThrowShaderClient() {
  const [code, setCode] = useState(STARTER_SHADER);
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleKeyDown(event) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    event.currentTarget.setRangeText("\t", event.currentTarget.selectionStart, event.currentTarget.selectionEnd, "end");
    setCode(event.currentTarget.value);
  }

  function handleShaderError(error) {
    setErrorMessage(error?.error || error?.message || "The shader could not compile.");
    setErrorVisible(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!code.trim() || !author.trim() || errorVisible || submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch(shaderApi, {
        method: "POST",
        body: JSON.stringify({
          action: "throw",
          code: JSON.stringify(code),
          author: author.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.statusCode === 400) throw new Error("API error");
      window.location.assign("/");
    } catch (error) {
      setErrorMessage(error.message);
      setErrorVisible(true);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.workspace}>
        <div className={styles.editor}>
          <label htmlFor="code" className="text-sm text-gray-500">Shader code</label>
          <textarea
            id="code"
            className={styles.code}
            value={code}
            rows={16}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            required
          />
          {errorVisible ? (
            <div className={styles.error} role="alert">
              <p>{errorMessage}</p>
              <button type="button" className="underline" onClick={() => setErrorVisible(false)}>Dismiss</button>
            </div>
          ) : null}
        </div>

        <div className={styles.preview} role="region" aria-labelledby="shader-preview-label">
          <p id="shader-preview-label" className="text-sm text-gray-500">Live preview</p>
          <div className={styles.previewCanvas}>
            <ShaderClient
              width={700}
              height={700}
              code={code}
              wrapClassName="w-full h-full"
              className="w-full h-full block"
              pauseOnHidden={false}
              onError={handleShaderError}
              onCompile={() => setErrorVisible(false)}
            />
          </div>
        </div>
      </div>

      <div className={styles.authorField}>
        <label htmlFor="author" className="text-sm text-gray-500">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting || errorVisible}
        className={`${styles.submit} text-white bg-black hover:bg-gray-800 font-medium rounded-lg px-5 py-2.5 mb-2`}
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
