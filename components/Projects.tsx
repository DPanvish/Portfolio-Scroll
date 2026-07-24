"use client";

import { useEffect, useRef } from "react";
import { projectsData } from "@/data/mockDB";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;

      const getScrollAmount = () => {
        if (track) {
          const trackWidth = track.scrollWidth;
          return -(trackWidth - window.innerWidth);
        }
        return 0;
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The scroll distance equals the scroll width
        pin: true,
        animation: tween,
        scrub: 1, // Smooth scrubbing effect, tied to scroll position
        invalidateOnRefresh: true, // Recalculates on window resize
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-background overflow-hidden">
      <div className="h-full flex flex-col justify-center px-6 md:px-20 pt-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-10 text-accent-blue">Featured Architecture</h2>
        
        {/* The Track that moves horizontally */}
        <div ref={trackRef} className="flex gap-10 w-max pl-[10vw] pr-[20vw]">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className="group w-[85vw] md:w-[45vw] lg:w-[35vw] h-[55vh] rounded-3xl p-8 flex flex-col justify-between shrink-0 relative overflow-hidden bg-neutral-900/40 backdrop-blur-md border border-neutral-800/50 hover:border-accent-blue/30 transition-colors duration-500"
            >
              {/* Subtle gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 text-neutral-200">{project.title}</h3>
                <p className="text-neutral-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs px-3 py-1 bg-neutral-950/80 border border-neutral-800 rounded-full text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}