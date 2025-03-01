import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { CultProject } from "../types/cultproject.ts";
import { getCultProjects } from "../utils/cultprojects.ts";
import ArchiveCarousel from "../islands/ArchiveCarousel.tsx";

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
              <p class="text-xs">Kulturprojekt</p>
              <p class="text-xl font-sans flex justify-between pt-1">
                <a href={project.externalUrl || `/kulturprojekter/${project.id}`} 
                   target={project.externalUrl ? "_blank" : undefined} 
                   rel={project.externalUrl ? "noopener noreferrer" : undefined}
                   class="hover:text-pink">
                  <span class="relative overflow-hidden inline-block">
                    <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                  </span>
                </a>
                <span class="">{project.year}</span>
              </p>
              
              {/* Use carousel if multiple images exist, otherwise show single header image */}
              {project.images && project.images.length > 0 ? (
                <ArchiveCarousel 
                  images={project.images} 
                  title={project.title} 
                  linkUrl={project.externalUrl || `/kulturprojekter/${project.id}`}
                />
              ) : project.headerImageUrl && (
                <a href={project.externalUrl || `/kulturprojekter/${project.id}`}
                   target={project.externalUrl ? "_blank" : undefined} 
                   rel={project.externalUrl ? "noopener noreferrer" : undefined}>
                  <img
                    class="w-full h-auto object-cover mt-2"
                    src={project.headerImageUrl}
                    alt={project.title}
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 