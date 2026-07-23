export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-glow">
          Full-Stack <br /> Engineer
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto">
          Building high-performance systems and immersive digital experiences.
        </p>
      </div>
    </section>
  );
}