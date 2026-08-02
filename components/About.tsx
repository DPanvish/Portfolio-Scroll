"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Loader2 } from "lucide-react";
import { getAbout } from "@/lib/api";
import InteractiveLens from "./InteractiveLens";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { data: about, isLoading, isError } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  useEffect(() => {
    if (isLoading || isError || !about || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered parallax entrance
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 150, rotationX: -15 },
        {
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1.2, 
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // 3D Magnetic tilt for EACH card
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const xTo = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power2.out" });
        const yTo = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power2.out" });

        const handleMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
          const y = (e.clientY - rect.top - rect.height / 2) * -0.05;
          xTo(x);
          yTo(y);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        
        // Clean up inside context doesn't work perfectly for event listeners without external ref, 
        // but we'll let context revert handle DOM cleanup.
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, isError, about]);

  if (isLoading) {
    return (
      <section className="h-screen flex flex-col items-center justify-center border-t border-white/5">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary mb-4" />
      </section>
    );
  }

  if (isError || !about) return null;

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center py-32 bg-background perspective-1000 overflow-hidden border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent-primary/10 blur-[150px] pointer-events-none transform-gpu" />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-accent-secondary mb-12 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
          System Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Statement */}
          <div 
            ref={el => { cardsRef.current[0] = el; }}
            className="col-span-1 md:col-span-2 glass-panel rounded-3xl p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group hover:border-white/20 transition-colors duration-500 preserve-3d min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight relative z-10" style={{ transform: "translateZ(40px)" }}>
              {about.tagline}
            </h3>
          </div>

          {/* Abstract Graphic / Tech */}
          <div 
            ref={el => { cardsRef.current[1] = el; }}
            className="col-span-1 glass-panel rounded-3xl overflow-hidden relative group hover:border-white/20 transition-colors duration-500 preserve-3d min-h-[300px] flex items-center justify-center cursor-crosshair"
          >
            <div className="absolute inset-[-20%] bg-background border border-white/5 transition-transform duration-700 group-hover:scale-110" />
            
            <InteractiveLens />
            
          </div>

          {/* Bio */}
          <div 
            ref={el => { cardsRef.current[2] = el; }}
            className="col-span-1 md:col-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center group hover:border-white/20 transition-colors duration-500 preserve-3d min-h-[300px]"
          >
            <h4 className="text-white font-sans text-xs mb-6 opacity-50 uppercase tracking-[0.2em]" style={{ transform: "translateZ(30px)" }}>Operator Bio</h4>
            <p className="text-neutral-400 leading-relaxed text-sm lg:text-base font-light" style={{ transform: "translateZ(50px)" }}>
              {about.bio}
            </p>
          </div>

          {/* Skills Cloud */}
          <div 
            ref={el => { cardsRef.current[3] = el; }}
            className="col-span-1 md:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center group hover:border-white/20 transition-colors duration-500 overflow-hidden relative preserve-3d min-h-[300px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h4 className="text-white font-sans text-xs mb-8 opacity-50 uppercase tracking-[0.2em] relative z-10" style={{ transform: "translateZ(30px)" }}>Tech Stack</h4>
            
            <div className="flex flex-wrap gap-3 relative z-10" style={{ transform: "translateZ(50px)" }}>
              {about.skills?.map((skill: string, index: number) => (
                <span 
                  key={index} 
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white text-xs font-sans tracking-widest hover:border-accent-secondary hover:text-accent-secondary hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}