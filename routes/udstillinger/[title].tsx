import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../../components/MainLayout.tsx";
import { Project } from "../../types/project.ts";
import { getProjectById } from "../../utils/projects.ts";
import ProjectCarousel from "../../islands/ProjectCarousel.tsx";

export const handler: Handlers<Project | null> = {
  async GET(_req, ctx) {
    const project = await getProjectById(ctx.params.title);
    return ctx.render(project);
  },
};

export default function ProjectPage({ data }: PageProps<Project>) {
  if (!data) {
    return (
      <MainLayout>
        <p>Project not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-4xl mx-auto my-4 md:my-8 md:px-8">
        <div class="flex justify-center">
          <img src={data.headerImageUrl} alt={data.title} class="w-full h-auto max-h-96 w-auto mb-4" />
        </div>
        <p class="text-sm font-serif italic">Udstilling - {data.year}</p>
        <p class="text-xl font-serif mb-2 pt-1">{data.title}</p>
        <div class="mb-4" dangerouslySetInnerHTML={{ __html: data.content }} />
        <ProjectCarousel project={data} />
      </div>
    </MainLayout>
  );
}
