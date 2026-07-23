import { experienceData } from "@/data/mockDB";

export default function Experience() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-accent-purple">Experience</h2>
        
        <div className="flex flex-col gap-12 border-l-2 border-neutral-800 pl-8 md:pl-12">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative">
              {/* Timeline node */}
              <div className="absolute -left-[37px] md:-left-[53px] top-1 w-4 h-4 rounded-full bg-accent-purple" />
              
              <h3 className="text-3xl font-bold">{exp.role}</h3>
              <h4 className="text-xl text-gray-400 mb-2">{exp.company} • {exp.period}</h4>
              <p className="text-gray-300 max-w-2xl">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}