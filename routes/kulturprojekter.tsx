import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { CultProject } from "../types/cultproject.ts";
import { getCultProjects } from "../utils/cultprojects.ts";

export const handler: Handlers<CultProject[]> = {
  async GET(_req, ctx) {
    const cultprojects = await getCultProjects();
    return ctx.render(cultprojects);
  },
};

export default function CultProjectsPage({ data }: PageProps<CultProject[]>) {
  if (!data || data.length === 0) {
    return (
      <MainLayout>
        <p>No cultural projects found.</p>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div class="max-w-3xl">
        <div class="grid grid-cols-1 gap-8">
          {data.map((project) => (
            <div class="mb-8 group" key={project.id}>
              {project.externalUrl ? (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" class="hover:text-green-500 block">
                  <p class="text-xs">Kulturprojekt</p>
                  <p class="text-xl font-sans flex justify-between pt-1">
                    <span class="relative overflow-hidden inline-block">
                      <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                    </span>
                    <span class="">{project.year}</span>
                  </p>
                  {project.headerImageUrl && (
                    <img
                      class="w-full h-auto object-cover mt-2"
                      src={project.headerImageUrl}
                      alt={project.title}
                    />
                  )}
                </a>
              ) : (
                <a href={`/kulturprojekter/${project.id}`} class="hover:text-green-500 block">
                  <p class="text-xs">Kulturprojekt</p>
                  <p class="text-xl font-sans flex justify-between pt-1">
                    <span class="relative overflow-hidden inline-block">
                      <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                    </span>
                    <span class="">{project.year}</span>
                  </p>
                  {project.headerImageUrl && (
                    <img
                      class="w-full h-auto object-cover mt-2"
                      src={project.headerImageUrl}
                      alt={project.title}
                    />
                  )}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 