"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { getProjects } from "@/lib/api";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  useEffect(() => {
    if (isLoading || isError || !projects) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const scrollWidth = containerRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;

      gsap.to(containerRef.current, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, isError, projects]); 

  if (isLoading) {
    return (
      <section className="h-screen flex flex-col items-center justify-center border-t border-neutral-900/50">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary mb-4" />
        <p className="text-neutral-500 uppercase tracking-widest text-sm">Loading Architecture...</p>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-primary/10 blur-[120px] pointer-events-none transform-gpu" />

      <div ref={containerRef} className="flex h-full w-max items-center relative z-10">
        
        {/* Intro Panel */}
        <div className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-20 shrink-0">
          <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-8 font-medium">
            Selected Works
          </h2>
          <h3 className="text-4xl md:text-7xl font-light tracking-tight text-white max-w-3xl leading-tight">
            Architecting solutions that bridge the gap between complex logic and premium aesthetics.
          </h3>
        </div>

        {projects?.map((project: any, index: number) => (
          <div key={project._id} className="w-[100vw] h-full flex items-center justify-center shrink-0 px-4 md:px-12">
            <div className="w-full max-w-6xl aspect-video md:aspect-[21/9] bg-surface/50 backdrop-blur-sm border border-neutral-800 rounded-3xl overflow-hidden relative group flex flex-col md:flex-row">
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center z-10">
                <div className="text-accent-primary font-mono text-sm mb-4 text-glow opacity-80">
                  0{index + 1}
                </div>
                <h4 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
                  {project.title}
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.techStack.map((tech: string, i: number) => (
                    <span key={i} className="px-4 py-1.5 rounded-full border border-neutral-700 bg-surface/50 text-neutral-300 text-xs tracking-wider uppercase hover:border-accent-primary hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6 mt-auto">
                  {project.liveUrl && (
                    <Magnetic>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-accent-primary hover:text-glow transition-all duration-300 group/link cursor-pointer">
                        Live Deployment <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    </Magnetic>
                  )}
                  {project.githubUrl && (
                    <Magnetic>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white transition-colors cursor-pointer">
                        Source Code
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-neutral-900 border-t md:border-t-0 md:border-l border-neutral-800">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-transparent md:hidden" />
              </div>
            </div>
          </div>
        ))}
        
        <div className="w-[10vw] h-full shrink-0" />
      </div>
    </section>
  );
}