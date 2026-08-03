"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2, 
    });

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = gsap.ticker;
    ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    ticker.lagSmoothing(0);
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}