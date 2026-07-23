import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Experience />
      <Projects />
      <section className="h-screen flex items-center justify-center bg-black">
        <h2 className="text-4xl text-gray-500">Contact / Footer</h2>
      </section>
    </main>
  );
}