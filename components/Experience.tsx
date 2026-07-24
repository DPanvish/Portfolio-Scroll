import { experienceData } from "@/data/mockDB";

export default function Experience() {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-20 overflow-hidden">
      
      <div className="absolute left-[-20%] top-[20%] w-[50vw] h-[50vw] rounded-full bg-accent-primary/5 blur-[120px] pointer-events-none transform-gpu" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-500 mb-16 font-medium">
          Career Timeline
        </h2>
        
        <div className="flex flex-col gap-16 border-l border-neutral-800 pl-8 md:pl-12 ml-4">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative group">
              <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-3 h-3 rounded-full bg-neutral-800 border-2 border-neutral-950 group-hover:bg-accent-primary group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all duration-500" />
              
              <h3 className="text-3xl font-medium tracking-tight text-neutral-100">{exp.role}</h3>
              <h4 className="text-lg text-accent-secondary mb-4 font-light">{exp.company} • {exp.period}</h4>
              <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}