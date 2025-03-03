import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../../components/MainLayout.tsx";
import { CultProject } from "../../types/cultproject.ts";
import { getCultProjectById } from "../../utils/cultprojects.ts";
import ProjectCarousel from "../../islands/ProjectCarousel.tsx";
import { Project } from "../../types/project.ts";

export const handler: Handlers<CultProject | null> = {
  async GET(_req, ctx) {
    const project = await getCultProjectById(ctx.params.title);
    return ctx.render(project);
  },
};

export default function CultProjectPage({ data }: PageProps<CultProject>) {
  if (!data) {
    return (
      <MainLayout>
        <p>Cultural project not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-3xl">
        {/* {data.headerImageUrl && (
          <div class="flex justify-center">
            <img 
              src={data.headerImageUrl} 
              alt={data.title} 
              class="w-full h-auto max-h-96 w-auto mb-4" 
            />
          </div>
        )} */}
        <p class="text-sm font-serif italic">Kulturprojekt - {data.year}</p>
        <p class="text-xl font-serif mb-2 pt-1">{data.title}</p>
        <div class="mb-4" dangerouslySetInnerHTML={{ __html: data.content }} />
        {data.images.length > 0 && <ProjectCarousel project={data as unknown as Project} />}
      </div>
    </MainLayout>
  );
} 