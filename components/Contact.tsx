import Magnetic from "./Magnetic";

export default function Contact() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-neutral-900/50 bg-background overflow-hidden">
      
      <div className="absolute bottom-[-30%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-primary/10 blur-[150px] pointer-events-none transform-gpu" />

      <div className="flex flex-col z-10 w-full max-w-7xl mx-auto mb-24">
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-12 font-medium">
          Start a project
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start">
          
          {/* Left Side: Massive Text */}
          <div>
            <a 
              href="mailto:hello@yourdomain.com" 
              className="text-[10vw] md:text-[7vw] font-black uppercase tracking-tighter text-white hover:text-accent-secondary transition-colors duration-500 cursor-pointer block leading-[0.85]"
            >
              Let's Build
              <br />
              Together.
            </a>
          </div>

          {/* Right Side: Premium Contact Form */}
          <div className="w-full max-w-md lg:ml-auto">
            <form className="flex flex-col gap-10">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent border-b border-neutral-800 pb-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent-primary transition-colors duration-300 peer"
                  required
                />
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-transparent border-b border-neutral-800 pb-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent-primary transition-colors duration-300 peer"
                  required
                />
              </div>

              <div className="relative group">
                <textarea 
                  placeholder="Project Details" 
                  rows={4}
                  className="w-full bg-transparent border-b border-neutral-800 pb-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent-primary transition-colors duration-300 resize-none peer"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Magnetic>
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wide text-sm uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Send Request
                  </button>
                </Magnetic>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Footer Meta */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center w-full max-w-7xl mx-auto z-10 mt-auto border-t border-neutral-800/50 pt-8">
        <div className="flex gap-8 mb-8 md:mb-0">
          <Magnetic><a href="#" className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer">LinkedIn</a></Magnetic>
          <Magnetic><a href="#" className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer">GitHub</a></Magnetic>
          <Magnetic><a href="#" className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer">Twitter</a></Magnetic>
        </div>

        <p className="text-xs tracking-widest text-neutral-600 uppercase">
          © {new Date().getFullYear()} — Engineered from scratch.
        </p>
      </div>
    </section>
  );
}