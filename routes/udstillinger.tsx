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
        <p>Ingen udstillinger fundet.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-4xl mx-auto md:px-8">
        <div class="grid grid-cols-1 gap-8">
          {data.map((project) => (
            <div class="mb-8 group" key={project.id}>
              <a href={`/udstillinger/${project.slug}`} class="hover:text-mimosa block">
                {project.headerImageUrl && (
                  <img
                    class="w-full h-auto min-h-[400px] object-cover mt-2"
                    src={project.headerImageUrl}
                    alt={project.title}
                  />
                )}
                <p class="text-sm pt-2 italic">Udstilling - {project.year}</p>
                <p class="text-xl font-serif flex justify-between pt-1">
                  <span class="relative overflow-hidden inline-block">
                    <span class="inline-block break-words group-hover:animate-text-scroll lg:whitespace-nowrap">{project.title}</span>
                  </span>
                </p>

              </a>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>);
}
