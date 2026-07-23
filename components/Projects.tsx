import { projectsData } from "@/data/mockDB";

export default function Projects() {
  return (
    <section className="relative h-screen bg-background overflow-hidden" id="projects-container">
      {/* This wrapper will be pinned by GSAP */}
      <div className="h-full flex flex-col justify-center px-6 md:px-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-10 text-accent-blue">Featured Architecture</h2>
        
        {/* This track will move horizontally */}
        <div className="flex gap-10 w-max" id="projects-track">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className="w-[80vw] md:w-[40vw] h-[50vh] bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between shrink-0"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs px-3 py-1 bg-neutral-800 rounded-full text-accent-blue">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}