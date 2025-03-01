import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { Project } from "../types/project.ts";
import { getProjects } from "../utils/projects.ts";

export const handler: Handlers<Project[]> = {
  async GET(_req, ctx) {
    const projects = await getProjects();
    return ctx.render(projects);
  },
};

export default function ProjectsPage({ data }: PageProps<Project[]>) {
  if (!data) {
    return (
      <MainLayout>
        <p>No projects found.</p>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div>
        {/* Mobile: Vertical Layout */}
        <div class="md:hidden">
          <div class="grid grid-cols-1 gap-8">
            {data.map((project) => (
              <div class="mb-8" key={project.id}>
                <a href={`/projects/${project.id}`}>
                  <p class="text-xl font-sans truncate">{project.title}</p>
                  <p class="text-xl font-sans mb-2">År: {project.year}</p>
                  <img
                    class="w-full h-[400px] object-cover transition-all duration-300 hover:opacity-90"
                    src={project.headerImageUrl}
                    alt={project.title}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Scroll */}
        <div class="hidden md:block relative">
          <div class="overflow-x-auto scrollbar-hide">
            <div class="flex space-x-8 pb-8">
              {data.map((project) => (
                <div 
                  class="flex-none w-[40vh]" 
                  key={project.id}
                >
                  <a href={`/projects/${project.id}`}>
                    <div class="h-full">
                      <p class="text-xl font-sans truncate">{project.title}</p>
                      <p class="text-xl font-sans mb-2">År: {project.year}</p>
                      <img
                        class="min-w-[40vh] min-h-[70vh] h-full object-cover transition-all duration-300 hover:opacity-90"
                        src={project.headerImageUrl}
                        alt={project.title}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
