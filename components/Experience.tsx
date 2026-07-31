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
    <section ref={containerRef} className="relative py-32 px-6 md:px-20 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-16 font-medium">
          Professional Trajectory
        </h2>
        
        <div ref={timelineRef} className="relative border-l border-neutral-800 ml-4 md:ml-0 pl-8 md:pl-12 space-y-16">
          {experience?.map((job: any) => (
            <div key={job._id} className="timeline-item relative group opacity-0">
              {/* Timeline Node */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full border-2 border-background bg-neutral-700 group-hover:bg-accent-primary group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-500" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100 group-hover:text-white transition-colors">
                  {job.role}
                </h3>
                <span className="text-accent-primary text-sm md:text-base font-mono tracking-wider">
                  @ {job.company}
                </span>
              </div>
              
              <div className="inline-block px-3 py-1 mb-6 border border-neutral-800 bg-neutral-900/50 rounded-full text-xs tracking-widest text-neutral-400 uppercase group-hover:border-accent-primary group-hover:text-white transition-all duration-300">
                {job.period}
              </div>
              
              <p className="text-neutral-400 font-light leading-relaxed max-w-2xl whitespace-pre-line">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}