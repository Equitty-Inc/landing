'use client';

import { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video continues playing after navigation
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, user interaction required
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#1a2332]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        aria-hidden="true"
        preload="auto"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
