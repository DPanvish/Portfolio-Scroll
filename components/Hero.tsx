"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Magnetic from "@/components/Magnetic";

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
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, rgba(0,0,0,0) 70%)',
            transform: 'translateZ(0)' 
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2322C55E\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(transparent,black)] pointer-events-none" />
      </div>
      
      <div className="z-10 text-center w-full px-4 flex flex-col items-center">
        <div 
          ref={roleRef}
          className="mb-8 px-6 py-2 rounded-full border border-accent-primary/20 bg-accent-primary/5 backdrop-blur-md text-sm font-medium tracking-widest text-accent-primary uppercase shadow-[0_0_20px_rgba(34,197,94,0.1)]"
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-emerald-300 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            Systems
          </span>
        </h1>

        <div className="mt-12 opacity-0 transform translate-y-8" ref={el => {
          // Add this to your timeline animation so it fades in last
          if (el) gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power3.out" });
        }}>
          <Magnetic>
            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide text-sm uppercase hover:bg-accent-primary hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 cursor-pointer">
              Explore Architecture
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}