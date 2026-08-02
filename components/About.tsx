"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Loader2 } from "lucide-react";
import { getAbout } from "@/lib/api";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { data: about, isLoading, isError } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  useEffect(() => {
    if (isLoading || isError || !about) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", 
        pin: true,
        scrub: 1,
      });

      gsap.to(textRef.current, {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        }
      });

      gsap.to(imageContainerRef.current, {
        scale: 0.9,
        rotationZ: -2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        }
      });

      gsap.to(imageRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, isError, about]);

  if (isLoading) {
    return (
      <section className="h-screen flex flex-col items-center justify-center border-t border-neutral-900/50">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary mb-4" />
        <p className="text-neutral-500 uppercase tracking-widest text-sm">Loading Profile...</p>
      </section>
    );
  }

  if (isError || !about) return null;

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden border-t border-neutral-900/50 bg-background py-32">
      
      <div className="absolute top-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent-primary/10 blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none transform-gpu" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 z-10 flex flex-col">
        
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-12 font-medium text-center">
          Engineering Philosophy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]" ref={textRef}>
          
          {/* Main Statement (Takes up 2 columns) */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-surface/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-end relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-2xl md:text-4xl text-neutral-200 font-light leading-tight relative z-10">
              {about.tagline || "I architect robust, scalable systems that solve complex problems."}
            </p>
          </div>

          {/* Abstract Graphic / Avatar Placeholder */}
          <div className="col-span-1 row-span-1 bg-surface/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden relative group hover:border-white/10 transition-colors duration-500" ref={imageContainerRef}>
            <div 
              ref={imageRef}
              className="absolute inset-[-20%] bg-surface border border-neutral-800"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'10\' height=\'10\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 10 0 L 0 0 0 10\' fill=\'none\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3Cpattern id=\'grid\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23smallGrid)\'/%3E%3Cpath d=\'M 100 0 L 0 0 0 100\' fill=\'none\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
               <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="text-white tracking-widest uppercase text-xs font-semibold px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10">Location: Earth</span>
            </div>
          </div>

          {/* Bio (Takes up 1 column, spans 2 rows if needed, but let's do 1 row) */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-surface/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col justify-center group hover:border-white/10 transition-colors duration-500">
            <h3 className="text-white font-mono text-sm mb-4 opacity-50 uppercase tracking-widest">About</h3>
            <p className="text-neutral-400 leading-relaxed text-sm font-light">
              {about.bio || "System architect bridging the gap between heavy backend logic and premium UI/UX."}
            </p>
          </div>

          {/* Skills Cloud (Takes up 2 columns) */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-surface/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col justify-center group hover:border-white/10 transition-colors duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-white font-mono text-sm mb-6 opacity-50 uppercase tracking-widest relative z-10">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 relative z-10">
               {about.skills?.map((skill: string, index: number) => (
                 <span key={index} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 text-xs tracking-wider uppercase hover:border-accent-primary hover:bg-accent-primary/10 hover:text-white transition-all duration-300 cursor-default">
                   {skill}
                 </span>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}