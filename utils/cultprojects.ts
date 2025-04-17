import { extract } from "$std/front_matter/yaml.ts";
import { CultProject, ProjectImage } from "../types/cultproject.ts";
import { join } from "$std/path/mod.ts";

export async function getCultProjects(): Promise<CultProject[]> {
  const cultprojects: CultProject[] = [];
  
  for await (const dirEntry of Deno.readDir("_cultprojects")) {
    if (dirEntry.name.endsWith('.md')) {
      const mdContent = await Deno.readTextFile(
        join("_cultprojects", dirEntry.name)
      );
      
      const { attrs, body } = extract(mdContent);
      const { title, year, headerImageUrl, externalUrl, carouselImages, slug } = attrs as {
        title: string;
        year: number;
        headerImageUrl?: string;
        externalUrl?: string;
        carouselImages?: Array<{url: string; caption?: string}>;
        slug?: string;
      };

      // Generate slug from title if not provided
      const safeSlug = slug || title.toLowerCase().replace(/\s+/g, '-');

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
      
      cultprojects.push({
        id: safeSlug,
        slug: safeSlug,
        title,
        year,
        headerImageUrl,
        externalUrl,
        images: processedImages,
        content: body
      });
    }
  }

  return cultprojects.sort((a, b) => b.year - a.year);
}

export async function getCultProjectById(id: string): Promise<CultProject | null> {
  const cultprojects = await getCultProjects();
  return cultprojects.find(project => project.slug === id || project.id === id) || null;
}