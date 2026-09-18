"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="home-shader-row">
      <img className="home-shader-pointer" src="/arrow.svg" alt="" aria-hidden="true" />
      <Link className="home-shader-link" href="/gallery/" aria-label="Open the shader gallery">
        <ShaderClient
          height={300}
          width={700}
          code={shader}
          author={author}
          wrapClassName="home-shader"
          className="home-shader-canvas"
          aria-label="Featured community shader"
        />
      </Link>
    </div>
  );
}
