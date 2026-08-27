"use client";

import dynamic from "next/dynamic";

const ThrowShaderClient = dynamic(() => import("@/components/ThrowShaderClient"), {
  ssr: false,
  loading: () => <p className="text-center text-gray-500">Loading shader editor…</p>,
});

export default function ThrowShaderLoader() {
  return <ThrowShaderClient />;
}
