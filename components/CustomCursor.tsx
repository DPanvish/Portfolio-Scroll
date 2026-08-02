"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use GSAP quickTo for maximum performance
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });
    
    // Elastic trailing effect for the follower ring
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("button") ||
        target.closest("a");

      if (isClickable && !isHovering) {
        isHovering = true;
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, { 
          scale: 3, 
          backgroundColor: "rgba(255,255,255,1)", 
          mixBlendMode: "difference",
          borderWidth: 0,
          duration: 0.3,
          ease: "power2.out" 
        });
      } else if (!isClickable && isHovering) {
        isHovering = false;
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { 
          scale: 1, 
          backgroundColor: "transparent", 
          mixBlendMode: "normal",
          borderWidth: 1,
          duration: 0.3,
          ease: "power2.out" 
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    // Hide native cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-accent-secondary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-accent-secondary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors"
      />
    </>
  );
}