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
            <div className="w-full max-w-6xl aspect-[4/5] md:aspect-[21/9] rounded-3xl overflow-hidden relative group border border-white/5 shadow-2xl">
              
              {/* Edge-to-edge Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black md:via-black/70 md:to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Content Box */}
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end md:justify-center w-full md:w-3/4 lg:w-2/3 z-10">
                
                <div className="text-accent-primary font-mono text-sm mb-4 text-glow opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
                  0{index + 1}
                </div>
                
                <h4 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-150">
                  {project.title}
                </h4>
                
                <p className="text-neutral-300 font-light leading-relaxed mb-8 max-w-xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-200">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-300">
                  {project.techStack.map((tech: string, i: number) => (
                    <span key={i} className="px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-xs tracking-wider uppercase hover:border-accent-primary hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-8 mt-auto md:mt-0 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-500">
                  {project.liveUrl && (
                    <Magnetic>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-accent-primary hover:text-glow transition-all duration-300 group/link cursor-pointer">
                        Live Deployment <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    </Magnetic>
                  )}
                  {project.githubUrl && (
                    <Magnetic>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer">
                        Source Code
                      </a>
                    </Magnetic>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
        
        <div className="w-[10vw] h-full shrink-0" />
      </div>
    </section>
  );
}