import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Experience />
      <Projects />
      <section className="h-[50vh] flex items-center justify-center relative">
        <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-accent-primary/5 to-transparent pointer-events-none transform-gpu" />
        <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-600">End of Line</h2>
      </section>
    </main>
  );
}