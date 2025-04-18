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
      <div class="max-w-4xl mx-auto my-4 md:my-8 md:px-8">
        <div class="grid grid-cols-1 gap-8">
          {data.map((project) => (
            <div class="mb-8 group" key={project.id}>
              {project.externalUrl ? (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" class="hover:text-green-800 block">
                  {project.headerImageUrl && (
                    <img
                      class="w-full h-auto min-h-[400px] object-cover mt-2"
                      src={project.headerImageUrl}
                      alt={project.title}
                    />
                  )}
                  <p class="text-sm pt-2 italic">Kulturprojekt - {project.year}</p>
                  <p class="text-xl font-serif flex justify-between pt-1">
                    <span class="relative overflow-hidden inline-block">
                      <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                    </span>
                  </p>

                </a>
              ) : (
                <a href={`/kulturprojekter/${project.slug}`} class="hover:text-green-800 block">
                  {project.headerImageUrl && (
                    <img
                      class="w-full h-auto min-h-[400px] object-cover mt-2"
                      src={project.headerImageUrl}
                      alt={project.title}
                    />
                  )}
                  <p class="text-sm pt-2 italic">Kulturprojekt - {project.year}</p>
                  <p class="text-xl font-serif flex justify-between pt-1">
                    <span class="relative overflow-hidden inline-block">
                      <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                    </span>
                  </p>

                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}