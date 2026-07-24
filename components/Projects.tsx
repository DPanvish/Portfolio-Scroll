"use client";

import { useEffect, useRef } from "react";
import { projectsData } from "@/data/mockDB";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // The main horizontal translation
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1.5, // Increased scrub time for a smoother, weightier feel
        invalidateOnRefresh: true,
      });

      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(cardsRef.current, "skewX", "deg");
      let clamp = gsap.utils.clamp(-5, 5); 

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew - proxy.skew) > 0.1) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="h-full flex flex-col justify-center pt-24 pb-12">
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 px-6 md:px-20 mb-8 font-medium">
          Select Architecture
        </h2>
        
        <div ref={trackRef} className="flex items-center gap-12 w-max pl-[10vw] pr-[20vw] h-[60vh]">
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              ref={el => { cardsRef.current[index] = el; }}
              className="group w-[80vw] md:w-[45vw] lg:w-[32vw] h-full rounded-2xl p-8 flex flex-col justify-between shrink-0 relative overflow-hidden bg-surface border border-neutral-800 transition-colors duration-500 hover:border-neutral-600"
              style={{ 
                transformOrigin: "bottom center",
                willChange: "transform",
                transform: "translateZ(0)" 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-20 mt-auto">
                <h3 className="text-3xl font-medium tracking-tight mb-3 text-neutral-100">{project.title}</h3>
                <p className="text-neutral-400 mb-6 text-sm leading-relaxed font-light">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-black border border-neutral-800 rounded text-neutral-300">
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