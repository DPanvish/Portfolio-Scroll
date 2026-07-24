"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the whole section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", 
        pin: true,
        scrub: 1,
      });

      // Parallax the text up as we scroll through the pinned section
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

      // Scale down and slightly rotate the image container
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

      // Parallax the inner image within its container (classic GSAP parallax)
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
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen lg:h-screen w-full flex items-center overflow-hidden border-t border-neutral-900/50">
      
      {/* Background Lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-secondary/5 blur-[120px] pointer-events-none transform-gpu" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24 z-10">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2" ref={textRef}>
          <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-8 font-medium">
            Engineering Philosophy
          </h2>
          <p className="text-2xl md:text-4xl text-neutral-200 font-light leading-tight mb-8">
            I don't just assemble components. I architect robust, scalable systems that solve complex problems.
          </p>
          <p className="text-neutral-400 leading-relaxed text-lg font-light mb-8 max-w-xl">
            My expertise lies in full-stack engineering, from optimizing MongoDB queries to rendering buttery-smooth 60fps animations with WebGL and Framer Motion. I bridge the gap between heavy backend logic and premium UI/UX.
          </p>
          
          <div className="flex gap-4">
             {/* We can map tech stack tags here from your DB later */}
             <span className="px-4 py-2 rounded-full border border-neutral-700 bg-surface/50 text-neutral-300 text-sm">Next.js</span>
             <span className="px-4 py-2 rounded-full border border-neutral-700 bg-surface/50 text-neutral-300 text-sm">TypeScript</span>
             <span className="px-4 py-2 rounded-full border border-neutral-700 bg-surface/50 text-neutral-300 text-sm">GSAP</span>
          </div>
        </div>

        {/* Right: Abstract Graphic / Future Portrait Container */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-[70vh] rounded-3xl overflow-hidden relative" ref={imageContainerRef}>
          {/* Inner div that parallaxes */}
          <div 
            ref={imageRef}
            className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-surface border border-neutral-800"
            style={{
              // Placeholder for your actual image
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