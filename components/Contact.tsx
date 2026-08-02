"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Magnetic from "./Magnetic"; 

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        ...data,
        portfolioSource: process.env.NEXT_PUBLIC_PORTFOLIO_ID || "unknown",
      };

      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000); 
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section className="relative min-h-screen flex items-center py-32 px-6 md:px-20 border-t border-neutral-900/50 bg-background overflow-hidden">
      
      {/* Background glow for aesthetic */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-accent-primary/5 blur-[120px] pointer-events-none transform-gpu translate-x-1/4 translate-y-1/4" />

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
        
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-8 font-medium">
              Initiate Contact
            </h2>
            <h3 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-8">
              Let's architect something <span className="italic text-neutral-500">exceptional.</span>
            </h3>
          </div>
          
          <div className="mt-12 md:mt-0 space-y-4">
            <p className="text-neutral-400 font-light tracking-wide">Ready for deployment.</p>
            <a href="mailto:your-email@example.com" className="text-xl md:text-2xl font-light hover:text-accent-primary transition-colors">
              hello@yourdomain.com
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-surface/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Success Overlay */}
          <div className={`absolute inset-0 bg-neutral-900/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center transition-all duration-500 ${isSuccess ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <CheckCircle2 className="w-16 h-16 text-accent-primary mb-6" />
            <h4 className="text-2xl font-medium text-white mb-2 tracking-tight">Transmission Received</h4>
            <p className="text-neutral-400 font-light text-center max-w-xs">Your message has been securely routed to the database. I will review it shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Identification</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background border-b border-neutral-800 px-0 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-accent-primary transition-colors rounded-none" 
                placeholder="What is your name?" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Return Address</label>
              <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-background border-b border-neutral-800 px-0 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-accent-primary transition-colors rounded-none" 
                placeholder="Enter your email address" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Message Payload</label>
              <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-background border-b border-neutral-800 px-0 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-accent-primary transition-colors resize-none rounded-none" 
                placeholder="How can we collaborate?" />
            </div>

            <div className="pt-4 flex justify-end">
              <Magnetic>
                <button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide hover:bg-neutral-200 transition-colors disabled:opacity-70"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Encrypting...
                    </>
                  ) : (
                    <>
                      Transmit Request
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </Magnetic>
            </div>

            {mutation.isError && (
              <p className="text-red-500 text-sm mt-4 tracking-wide text-right">
                Transmission failed. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}