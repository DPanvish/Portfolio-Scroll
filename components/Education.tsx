"use client";

import { useEffect, useRef } from "react";
import { educationData } from "@/data/mockDB";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Education() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardRef.current && containerRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", 
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-12 font-medium">
          Academic Foundation
        </h2>
        
        <div ref={cardRef} className="relative group perspective-1000">
          <div className="w-full bg-surface/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-8 md:p-12 transition-colors duration-500 hover:border-neutral-600">
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
            
            {educationData.map((edu) => (
              <div key={edu.id} className="relative z-10 flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100 mb-2">
                    {edu.degree}
                  </h3>
                  <h4 className="text-lg text-accent-primary font-light mb-6">
                    {edu.institution}
                  </h4>
                  
                  <ul className="flex flex-col gap-2">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="text-neutral-400 font-light flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-1/3 flex md:justify-end items-start">
                  <span className="px-4 py-2 border border-neutral-700 bg-neutral-900/50 rounded-full text-sm font-medium tracking-widest text-neutral-300">
                    {edu.period}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}