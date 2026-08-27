"use client";

import { useEffect, useState } from "react";
import ShaderClient, { DEFAULT_SHADER } from "@/components/ShaderClient";

const shaderApi = "https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod";

export default function Headshot() {
  const [shader, setShader] = useState(DEFAULT_SHADER);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(shaderApi, {
      method: "POST",
      body: JSON.stringify({ action: "catch" }),
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((response) => {
        const data = JSON.parse(response.body);
        setShader(JSON.parse(data.code));
        setAuthor(data.author);
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => controller.abort();
  }, []);

  return (
    <ShaderClient
      height={300}
      width={300}
      code={shader}
      author={author}
      aria-label="Featured community shader"
    />
  );
}
