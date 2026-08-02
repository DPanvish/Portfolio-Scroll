"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Loader2 } from "lucide-react";
import { getExperience } from "@/lib/api";

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { data: experience, isLoading, isError } = useQuery({
    queryKey: ["experience"],
    queryFn: getExperience,
  });

  useEffect(() => {
    if (isLoading || isError || !experience) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
      
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotationX: -10, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, isError, experience]);

  if (isLoading) {
    return (
      <section className="py-32 flex flex-col items-center justify-center border-t border-white/5">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary mb-4" />
      </section>
    );
  }

  if (isError) return null;

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-12 bg-background border-t border-white/5 overflow-hidden perspective-1000">
      
      {/* Intense Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[50vw] h-[50vw] rounded-full bg-accent-secondary/10 blur-[150px] pointer-events-none transform-gpu" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-accent-primary mb-16 text-center drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
          Professional Trajectory
        </h2>
          
        <div ref={timelineRef} className="relative flex flex-col gap-8 pb-32">
          {/* Timeline Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent opacity-30 hidden md:block" />

          {experience?.map((job: any, index: number) => (
            <div 
              key={job._id} 
              className={`timeline-card relative w-full flex flex-col md:flex-row justify-between items-center group preserve-3d sticky top-32`}
              style={{ zIndex: index }}
            >
              
              {/* Spacer for alternating layout on desktop */}
              <div className={`hidden md:block w-5/12 ${index % 2 === 0 ? 'order-1' : 'order-3'}`} />
              
              {/* Timeline Dot */}
              <div className="hidden md:flex order-2 w-2/12 justify-center relative z-20">
                <div className="w-4 h-4 rounded-full bg-accent-primary shadow-[0_0_15px_rgba(59,130,246,0.8)] border-2 border-background transition-transform duration-500 group-hover:scale-150" />
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 glass-panel rounded-3xl p-8 md:p-10 shadow-[0_0_30px_rgba(59,130,246,0.05)] group-hover:border-accent-primary/30 transition-colors duration-500 preserve-3d ${index % 2 === 0 ? 'order-3' : 'order-1'}`}>
                
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-accent-secondary mb-4 block">
                    {job.period}
                  </span>
                  
                  <h3 className="font-serif text-3xl font-bold text-white mb-2 group-hover:text-glow transition-all duration-300">
                    {job.role}
                  </h3>
                  
                  <h4 className="font-sans text-sm tracking-[0.2em] uppercase text-neutral-400 mb-6">
                    {job.company}
                  </h4>
                  
                  <p className="font-sans text-neutral-400 font-light leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {job.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}