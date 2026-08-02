"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InteractiveLens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pupilRef.current) return;

    const xTo = gsap.quickTo(pupilRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(pupilRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      // Calculate cursor position relative to the center of the container
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Limit the movement radius
      const angle = Math.atan2(y, x);
      const distance = Math.min(Math.hypot(x, y) * 0.2, 30); // Max 30px movement

      xTo(Math.cos(angle) * distance);
      yTo(Math.sin(angle) * distance);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    // Attach to window so it follows cursor anywhere on screen
    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative z-10 w-40 h-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(59,130,246,0.1)] flex items-center justify-center overflow-hidden group-hover:border-accent-primary/50 transition-colors duration-500"
      style={{ transform: "translateZ(60px)" }}
    >
      {/* Target Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-full h-[1px] bg-white" />
        <div className="h-full w-[1px] bg-white absolute" />
      </div>
      
      {/* Moving Pupil */}
      <div 
        ref={pupilRef}
        className="w-16 h-16 rounded-full bg-accent-primary flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.8)] relative"
      >
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
