"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectAnimation({ src, poster, className }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;

    function observe() {
      observer?.disconnect();
      if (motion.matches || navigator.connection?.saveData) {
        setVisible(false);
        return;
      }
      if (!("IntersectionObserver" in window)) {
        setLoaded(true);
        setVisible(true);
        return;
      }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setLoaded(true);
        setVisible(entry.isIntersecting);
      });
      observer.observe(video);
    }

    observe();
    motion.addEventListener("change", observe);
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", observe);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (visible) video.play().catch(() => {}); // Autoplay may be disabled.
    else video.pause();
  }, [visible]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={loaded ? src : undefined}
      poster={poster}
      width="960"
      height="474"
      preload="none"
      muted
      loop
      playsInline
      aria-hidden="true"
    />
  );
}
