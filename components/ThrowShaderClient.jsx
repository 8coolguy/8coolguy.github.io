"use client";

import { useCallback, useEffect, useState } from "react";
import ShaderClient, { DEFAULT_SHADER } from "@/components/ShaderClient";

const shaderApi = "https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod";

export default function ThrowShaderClient() {
  const [code, setCode] = useState(DEFAULT_SHADER);
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [rows, setRows] = useState(12);
  const [compactMode, setCompactMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateRows = useCallback(() => {
    const maxRows = window.innerWidth < 768 ? 12 : 22;
    setRows(Math.max(6, Math.min(maxRows, Math.floor((window.innerHeight - 250) / 27))));
  }, []);

  useEffect(() => {
    updateRows();
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, [updateRows]);

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
    <>
      {errorVisible ? (
        <div className="bg-red-300 px-4 py-3 rounded-lg shadow-md mb-4" role="alert">
          <p className="text-xl text-bold">Error</p>
          <p>{errorMessage}</p>
          <button type="button" className="underline" onClick={() => setErrorVisible(false)}>Dismiss</button>
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4" style={{ aspectRatio: compactMode ? "2 / 1" : "1 / 1" }}>
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

        <label htmlFor="author" className="text-sm text-gray-500">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <label htmlFor="code" className="text-sm text-gray-500">Shader code</label>
        <textarea
          id="code"
          className="w-full border rounded px-3 py-2 font-mono text-sm mb-4 resize-y"
          value={code}
          rows={rows}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={handleKeyDown}
          required
        />

        <button
          type="submit"
          disabled={submitting || errorVisible}
          className="w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg px-5 py-2.5 mb-2"
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => setCompactMode((current) => !current)}
          className="w-full text-sm text-gray-500 hover:text-gray-800 mb-4"
        >
          {compactMode ? "Enlarge preview" : "Shrink preview"}
        </button>
      </form>
    </>
  );
}
