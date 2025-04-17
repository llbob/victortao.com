import { extract } from "$std/front_matter/yaml.ts";
import { Blog } from "../types/blog.ts";
import { join } from "$std/path/mod.ts";

export async function getBlogs(): Promise<Blog[]> {
  const blogs: Blog[] = [];
  
  for await (const dirEntry of Deno.readDir("_blog")) {
    if (dirEntry.name.endsWith('.md')) {
      const mdContent = await Deno.readTextFile(
        join("_blog", dirEntry.name)
      );
      
      const { attrs, body } = extract(mdContent);
      const { title, date, headerImageUrl, slug } = attrs as {
        title: string;
        date: string;
        headerImageUrl?: string;
        slug?: string;
      };
      
      // Generate slug from title if not provided
      const safeSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
      
      blogs.push({
        id: safeSlug,
        slug: safeSlug,
        title,
        date,
        headerImageUrl,
        content: body
      });
    }
  }

  // Sort by date (newest first)
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const blogs = await getBlogs();
  return blogs.find(blog => blog.slug === id || blog.id === id) || null;
}