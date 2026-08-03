"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Loader2 } from "lucide-react";
import { getEducation } from "@/lib/api";

export default function Education() {
  const containerRef = useRef<HTMLElement>(null);

  const { data: education, isLoading, isError } = useQuery({
    queryKey: ["education"],
    queryFn: getEducation,
  });

  useEffect(() => {
    if (isLoading || isError || !education) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".edu-card");
      
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -100 : 100, rotationY: i % 2 === 0 ? -15 : 15 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isLoading, isError, education]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center border-t border-white/5">
        <Loader2 className="w-8 h-8 animate-spin text-accent-secondary mb-4" />
      </section>
    );
  }

  if (isError || !education) return null;

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-12 bg-background border-t border-white/5 overflow-hidden perspective-1000">
      
      <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-accent-primary/5 blur-[150px] pointer-events-none transform-gpu" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-accent-secondary mb-16 text-center drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
          Academic Foundation
        </h2>

        <div className="flex flex-col gap-12">
          {education?.map((edu: any, index: number) => (
            <div 
              key={edu._id} 
              className={`edu-card group relative w-full md:w-3/4 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto md:text-right'} glass-panel rounded-3xl p-8 md:p-12 preserve-3d shadow-[0_0_40px_rgba(59,130,246,0.05)] hover:border-accent-secondary/30 transition-all duration-500`}
            >
              
              <div className={`absolute inset-0 bg-gradient-to-r ${index % 2 === 0 ? 'from-accent-secondary/5 to-transparent' : 'from-transparent to-accent-secondary/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
              
              <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent-primary mb-4 block">
                  {edu.period}
                </span>
                
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-glow transition-all duration-300">
                  {edu.degree}
                </h3>
                
                <h4 className="font-sans text-sm tracking-[0.2em] uppercase text-neutral-400 mb-8">
                  {edu.institution}
                </h4>
                
                <ul className={`flex flex-col gap-4 ${index % 2 !== 0 ? 'md:items-end' : ''}`}>
                  {edu.details?.map((detail: string, i: number) => (
                    <li key={i} className={`font-sans text-neutral-400 font-light text-sm md:text-base flex items-start gap-4 max-w-xl ${index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary mt-2 shrink-0 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}