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
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
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
      <section className="py-32 flex flex-col items-center justify-center border-t border-neutral-900/50">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary mb-4" />
        <p className="text-neutral-500 uppercase tracking-widest text-sm">Loading Experience...</p>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-20 bg-background overflow-hidden min-h-screen">
      
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-primary/5 blur-[150px] pointer-events-none transform-gpu" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-20 font-medium text-center">
          Professional Trajectory
        </h2>
        
        <div ref={timelineRef} className="relative flex flex-col gap-4 pb-32">
          {experience?.map((job: any, index: number) => (
            <div 
              key={job._id} 
              className="timeline-item sticky top-32 bg-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-16 group hover:border-white/20 transition-colors duration-500"
              style={{ 
                zIndex: index + 10,
                top: `calc(100px + ${index * 20}px)` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />
              
              {/* Left Column: Period & Company */}
              <div className="md:w-1/3 flex flex-col relative z-10 shrink-0">
                <div className="inline-block px-4 py-1.5 mb-6 border border-neutral-800 bg-neutral-900/50 rounded-full text-xs tracking-widest text-neutral-400 uppercase w-fit group-hover:border-accent-primary group-hover:text-white transition-all duration-300">
                  {job.period}
                </div>
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-white mb-2">
                  {job.company}
                </h3>
              </div>
              
              {/* Right Column: Role & Details */}
              <div className="md:w-2/3 flex flex-col relative z-10">
                <h4 className="text-xl md:text-2xl font-light text-accent-primary mb-6">
                  {job.role}
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}