"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !roleRef.current) return;

    const splitHeadline = new SplitType(headlineRef.current, { types: 'chars' });
    
    gsap.set(splitHeadline.chars, { opacity: 0, y: 150, rotateX: -90, transformOrigin: "0% 50% -50" });
    gsap.set(roleRef.current, { opacity: 0, y: 30 });
    
    const tl = gsap.timeline({ defaults: { ease: "expo.out", force3D: true } });

    tl.to(splitHeadline.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.5,
      stagger: 0.04,
      delay: 0.1,
    })
    .to(roleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
    }, "-=1.2");

    return () => {
      splitHeadline.revert();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div 
          className="w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(245,158,11,0.1) 40%, rgba(0,0,0,0) 70%)',
            transform: 'translateZ(0)' 
          }}
        />
      </div>
      
      <div className="z-10 text-center w-full px-4 flex flex-col items-center">
        <div 
          ref={roleRef}
          className="mb-8 px-4 py-1.5 rounded-full border border-neutral-700 bg-surface/80 backdrop-blur-sm text-sm font-medium tracking-widest text-neutral-400 uppercase shadow-xl"
        >
          System Architect & Engineer
        </div>

        <h1 
          ref={headlineRef} 
          className="text-[14vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter uppercase text-white"
          style={{ perspective: "1000px", willChange: "transform, opacity" }}
        >
          Building
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
            Systems
          </span>
        </h1>
      </div>
    </section>
  );
}