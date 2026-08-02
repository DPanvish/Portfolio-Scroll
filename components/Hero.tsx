"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardRef.current || !titleRef.current) return;

    // Advanced Text Reveal
    const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
    gsap.set(splitTitle.chars, { opacity: 0, scale: 0, rotationX: 90, z: -100 });
    
    gsap.to(splitTitle.chars, {
      opacity: 1,
      scale: 1,
      rotationX: 0,
      z: 0,
      duration: 1.5,
      stagger: 0.04,
      ease: "elastic.out(1, 0.5)",
      delay: 0.2
    });

    // 3D Magnetic Hover for the massive Hero Card
    const xTo = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      // Calculate from center of the screen
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      // intense tilt
      xTo(x * 20); 
      yTo(y * -20);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      splitTitle.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background perspective-1000">
      
      {/* Intense Glowing Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent-primary/20 blur-[150px] pointer-events-none transform-gpu" />

      {/* Massive 3D Floating Card */}
      <div 
        ref={cardRef} 
        className="preserve-3d w-full max-w-5xl aspect-[16/9] md:aspect-video mx-6 glass-panel rounded-[2rem] md:rounded-[4rem] border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.1)] flex flex-col items-center justify-center relative group"
      >
        {/* Layer 1: Background Elements */}
        <div className="absolute inset-0 preserve-3d" style={{ transform: "translateZ(-50px)" }}>
           <div className="w-full h-full border border-white/5 rounded-[2rem] md:rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>

        {/* Layer 2: Main Content */}
        <div className="relative z-10 text-center px-6 preserve-3d" style={{ transform: "translateZ(80px)" }}>
          <p className="font-sans text-accent-secondary text-sm md:text-base tracking-[0.4em] uppercase mb-6 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
            Full-Stack System Architect
          </p>
          
          <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl mb-8 leading-tight">
            ENGINEERING <br/>
            <span className="text-glow text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary via-accent-primary to-accent-secondary">
              IMMERSION.
            </span>
          </h1>
          
          <p className="font-sans text-neutral-400 max-w-xl mx-auto text-sm md:text-lg mb-12">
            Bridging heavy backend logic with hyper-interactive frontend experiences. We don't just build UI; we architect spatial realities.
          </p>
        </div>

        {/* Layer 3: Floating Action */}
        <div className="absolute bottom-12 md:bottom-20 preserve-3d" style={{ transform: "translateZ(120px)" }}>
          <Magnetic>
            <button className="px-8 py-4 rounded-full bg-white text-black font-sans text-xs font-bold tracking-[0.2em] uppercase hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Initiate Sequence
            </button>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}