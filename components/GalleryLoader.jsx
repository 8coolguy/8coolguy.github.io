"use client";

import dynamic from "next/dynamic";

const GalleryClient = dynamic(() => import("@/components/GalleryClient"), {
  ssr: false,
  loading: () => <p className="text-center text-gray-500">Loading shaders…</p>,
});

export default function GalleryLoader() {
  return <GalleryClient />;
}
