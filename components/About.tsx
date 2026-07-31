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
    <section ref={containerRef} className="relative h-screen w-full flex items-center overflow-hidden border-t border-neutral-900/50 bg-background">
      
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-primary/5 blur-[120px] pointer-events-none transform-gpu" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24 z-10">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2" ref={textRef}>
          <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-8 font-medium">
            Engineering Philosophy
          </h2>
          
          <p className="text-2xl md:text-4xl text-neutral-200 font-light leading-tight mb-8">
            {about.tagline || "I architect robust, scalable systems that solve complex problems."}
          </p>
          
          <p className="text-neutral-400 leading-relaxed text-lg font-light mb-8 max-w-xl whitespace-pre-line">
            {about.bio || "System architect bridging the gap between heavy backend logic and premium UI/UX."}
          </p>
          
          <div className="flex flex-wrap gap-3">
             {about.skills?.map((skill: string, index: number) => (
               <span key={index} className="px-4 py-2 rounded-full border border-neutral-700 bg-surface/50 text-neutral-300 text-xs tracking-wider uppercase hover:border-accent-primary hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300 cursor-default">
                 {skill}
               </span>
             ))}
          </div>
        </div>

        {/* Right: Abstract Graphic */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-[70vh] rounded-3xl overflow-hidden relative" ref={imageContainerRef}>
          <div 
            ref={imageRef}
            className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-surface border border-neutral-800"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'10\' height=\'10\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 10 0 L 0 0 0 10\' fill=\'none\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3Cpattern id=\'grid\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23smallGrid)\'/%3E%3Cpath d=\'M 100 0 L 0 0 0 100\' fill=\'none\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
             <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
          </div>
        </div>

      </div>
    </section>
  );
}