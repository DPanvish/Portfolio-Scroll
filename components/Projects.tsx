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
      <section className="h-screen flex flex-col items-center justify-center border-t border-white/5">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary mb-4" />
      </section>
    );
  }

  if (isError) return null;

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background z-20 border-t border-white/5">
      
      {/* Intense Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-primary/10 blur-[150px] pointer-events-none transform-gpu" />

      <div ref={containerRef} className="flex h-full w-max items-center relative z-10">
        
        {/* Intro Panel */}
        <div className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-20 shrink-0">
          <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-accent-secondary mb-8 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
            Selected Archives
          </h2>
          <h3 className="font-serif text-5xl md:text-8xl font-bold tracking-tighter text-white max-w-4xl leading-tight">
            Architecting solutions that bridge <span className="text-glow text-accent-primary">complex logic</span> and <span className="text-glow text-accent-secondary">premium aesthetics.</span>
          </h3>
        </div>

        {projects?.map((project: any, index: number) => (
          <div key={project._id} className="w-[100vw] h-full flex items-center justify-center shrink-0 px-4 md:px-12 perspective-1000">
            <div className="w-full max-w-7xl h-[70vh] md:h-[80vh] glass-panel rounded-3xl overflow-hidden relative group shadow-[0_0_50px_rgba(59,130,246,0.1)] preserve-3d flex flex-col md:flex-row border border-white/10">
              
              {/* Dynamic Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              {/* Left Side: Immersive Floating Image */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden preserve-3d p-4 md:p-8 flex items-center justify-center">
                <div 
                  className="w-full h-full rounded-2xl overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-700 ease-out group-hover:[transform:rotateY(5deg)_scale(1.05)]"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-10 transition-opacity duration-500" />
                </div>
              </div>
              
              {/* Right Side: Structured Typography */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center relative z-10 preserve-3d border-t md:border-t-0 md:border-l border-white/5 bg-black/40 backdrop-blur-xl">
                
                <div className="relative" style={{ transform: "translateZ(50px)" }}>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-sans text-accent-secondary text-sm md:text-base tracking-[0.3em] font-bold text-glow">
                      0{index + 1}
                    </span>
                    <div className="h-[1px] w-12 bg-accent-secondary/50" />
                  </div>
                  
                  <h4 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-secondary transition-all duration-500">
                    {project.title}
                  </h4>
                  
                  <p className="font-sans text-neutral-400 font-light leading-relaxed mb-8 max-w-md text-sm md:text-base group-hover:text-neutral-300 transition-colors duration-500">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-12">
                    {project.techStack?.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-[10px] md:text-xs font-sans tracking-widest uppercase hover:border-accent-primary hover:text-white transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-6 mt-auto">
                    {project.liveUrl && (
                      <Magnetic>
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-bold font-sans uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          Visit Site <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </Magnetic>
                    )}
                    {project.githubUrl && (
                      <Magnetic>
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent text-white text-xs font-bold font-sans uppercase tracking-[0.2em] hover:bg-white/5 transition-colors">
                          Code <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </Magnetic>
                    )}
                  </div>

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