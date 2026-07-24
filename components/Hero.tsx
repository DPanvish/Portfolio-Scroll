"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !subtextRef.current) return;

    const splitHeadline = new SplitType(headlineRef.current, { types: 'lines,chars' });
    const splitSubtext = new SplitType(subtextRef.current, { types: 'lines' });

    gsap.set(splitHeadline.chars, { y: 100, opacity: 0 });
    gsap.set(splitSubtext.lines, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(splitHeadline.chars, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.02,
      delay: 0.2, 
    })
    .to(splitSubtext.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
    }, "-=0.8"); 

    return () => {
      splitHeadline.revert();
      splitSubtext.revert();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      
      {/* Dynamic Ambient Lighting - Offset to the top right */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-blue/10 blur-[140px] pointer-events-none mix-blend-screen" />
      
      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-end gap-12 lg:gap-0 mt-32">
        
        {/* Left side: Massive Typography */}
        <div className="w-full lg:w-2/3">
          <h1 
            ref={headlineRef} 
            className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-neutral-100"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} 
          >
            Software
            <br />
            <span className="text-neutral-500">Architecture</span>
          </h1>
        </div>

        {/* Right side: Asymmetric Subtext */}
        <div className="w-full lg:w-1/3 flex justify-end">
          <p 
            ref={subtextRef} 
            className="text-lg md:text-xl text-neutral-400 max-w-sm text-right lg:text-left leading-relaxed font-light"
          >
            Engineering robust backend systems and crafting immersive frontend experiences. I don't just write code; I build infrastructure.
          </p>
        </div>

      </div>
    </section>
  );
}