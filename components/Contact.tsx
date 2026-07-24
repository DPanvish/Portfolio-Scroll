import Magnetic from "./Magnetic";

export default function Contact() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-neutral-900/50 bg-background overflow-hidden">
      
      <div className="absolute bottom-[-30%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-primary/10 blur-[150px] pointer-events-none transform-gpu" />

      <div className="flex flex-col z-10 w-full max-w-7xl mx-auto">
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-8 font-medium">
          Start a project
        </h2>
        
        {/* Massive Email Link */}
        <a 
          href="panvishd@gmail.com" 
          className="text-[10vw] md:text-[8vw] font-black uppercase tracking-tighter text-white hover:text-accent-secondary transition-colors duration-500 cursor-pointer block leading-[0.85] mb-20"
        >
          Let's Build
          <br />
          Together.
        </a>
      </div>

      {/* Footer Meta */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center w-full max-w-7xl mx-auto z-10 mt-auto border-t border-neutral-800/50 pt-8">
        
        <div className="flex gap-8 mb-8 md:mb-0">
          <Magnetic>
            <a href="#" className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer">
              LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer">
              GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer">
              Twitter
            </a>
          </Magnetic>
        </div>

        <p className="text-xs tracking-widest text-neutral-600 uppercase">
          © {new Date().getFullYear()} — Engineered from scratch.
        </p>

      </div>
    </section>
  );
}