import { extract } from "$std/front_matter/yaml.ts";
import { Project, ProjectImage } from "../types/project.ts";
import { join } from "$std/path/mod.ts";

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = [];
  
  for await (const dirEntry of Deno.readDir("_projects")) {
    if (dirEntry.name.endsWith('.md')) {
      const mdContent = await Deno.readTextFile(
        join("_projects", dirEntry.name)
      );
      
      const { attrs, body } = extract(mdContent);
      const { title, year, carouselImages } = attrs as {
        title: string;
        year: number;
        carouselImages: Array<{url: string; caption?: string}>;
      };

      // Handle both old and new image format
      const processedImages: ProjectImage[] = carouselImages?.map(img => {
        if (typeof img === 'string') {
          return { url: (img as string).replace(/^\/?(public\/)?/, '/') };
        }
        return {
          url: img.url.replace(/^\/?(public\/)?/, '/'),
          caption: img.caption
        };
      }) || [];
      
      projects.push({
        id: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        year,
        images: processedImages,
        content: body
      });
    }
  }

  return projects.sort((a, b) => b.year - a.year);
} 