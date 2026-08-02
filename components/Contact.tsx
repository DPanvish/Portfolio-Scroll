"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, Loader2, Send } from "lucide-react";
import Magnetic from "./Magnetic";
import { submitContact } from "@/lib/api";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 150, scale: 0.9, rotationX: 20 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContact(formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="relative py-40 px-6 md:px-12 bg-background border-t border-white/5 overflow-hidden perspective-1000">
      
      {/* Background Matrix / Grid */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        <div ref={cardRef} className="w-full glass-panel rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-24 shadow-[0_0_80px_rgba(59,130,246,0.1)] relative overflow-hidden group preserve-3d flex flex-col lg:flex-row gap-16">
          
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Left Text */}
          <div className="lg:w-1/2 relative z-10" style={{ transform: "translateZ(50px)" }}>
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-accent-secondary mb-8 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
              System Initialization
            </p>

            <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter text-white mb-10 leading-[0.9]">
              LET'S BUILD <br />
              <span className="text-glow text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary via-accent-primary to-accent-secondary">
                THE FUTURE.
              </span>
            </h2>
            
            <p className="font-sans text-neutral-400 font-light max-w-sm mb-12">
              Open a secure channel. Transmit your project details, and I will execute the sequence.
            </p>
            
            <div className="flex flex-col gap-6">
              <Magnetic>
                <a href="mailto:hello@example.com" className="w-fit flex items-center gap-4 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:text-accent-primary transition-colors duration-300">
                  Direct Email
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-fit flex items-center gap-4 text-neutral-400 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors duration-300">
                  GitHub Profile
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </div>
          
          {/* Right Form */}
          <div className="lg:w-1/2 relative z-10" style={{ transform: "translateZ(30px)" }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500">Target Identity (Name)</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white font-sans focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-neutral-700"
                  placeholder="Enter designation..."
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500">Return Address (Email)</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white font-sans focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-neutral-700"
                  placeholder="name@domain.com"
                />
              </div>
              
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="message" className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500">Encrypted Payload (Message)</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white font-sans focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all resize-none placeholder:text-neutral-700"
                  placeholder="Detail the architecture requirements..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className="w-full group relative overflow-hidden rounded-xl bg-white text-black font-sans text-xs font-bold tracking-[0.2em] uppercase py-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-accent-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting...</>
                  ) : isSuccess ? (
                    <><CheckCircle2 className="w-4 h-4 text-green-500 group-hover:text-white" /> Sequence Executed</>
                  ) : (
                    <><Send className="w-4 h-4" /> Execute CommLink</>
                  )}
                </span>
              </button>
              
            </form>
          </div>
          
        </div>

        <div className="mt-24 text-center text-xs font-sans tracking-[0.3em] uppercase text-neutral-600">
          © {new Date().getFullYear()} System Architect. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}