"use client";

import { useEffect, useState } from "react";
import ShaderClient from "@/components/ShaderClient";

const shaderApi = "https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod";

export default function GalleryClient() {
  const [shaders, setShaders] = useState([]);
  const [errored, setErrored] = useState({});
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch(shaderApi, {
      method: "POST",
      body: JSON.stringify({ action: "batch", count: -1 }),
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 400) throw new Error("API error");
        setShaders(JSON.parse(response.body));
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("error:", error);
        setStatus("error");
      });

    return () => controller.abort();
  }, []);

  if (status === "loading") return <p className="text-center text-gray-500">Loading shaders…</p>;
  if (status === "error") return <p className="text-center text-gray-500">Could not load shaders.</p>;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {shaders
        .filter((shader) => shader.code?.length > 0 && !errored[shader.id])
        .map((shader) => (
          <ShaderClient
            key={shader.id}
            height={300}
            width={300}
            code={JSON.parse(shader.code)}
            author={shader.author}
            wrapClassName="w-full"
            className="w-full h-auto block"
            onError={() => setErrored((current) => ({ ...current, [shader.id]: true }))}
          />
        ))}
    </div>
  );
}
