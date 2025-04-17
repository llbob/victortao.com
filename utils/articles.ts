import { extract } from "$std/front_matter/yaml.ts";
import { Article } from "../types/article.ts";
import { join } from "$std/path/mod.ts";

export async function getArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  
  for await (const dirEntry of Deno.readDir("_articles")) {
    if (dirEntry.name.endsWith('.md')) {
      const mdContent = await Deno.readTextFile(
        join("_articles", dirEntry.name)
      );
      
      const { attrs, body } = extract(mdContent);
      const { title, date, platform, platformUrl, headerImageUrl, externalUrl, slug } = attrs as {
        title: string;
        date: string;
        platform?: string;
        platformUrl?: string;
        headerImageUrl?: string;
        externalUrl?: string;
        slug?: string;
      };
      
      // Generate slug from title if not provided
      const safeSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
      
      articles.push({
        id: safeSlug,
        slug: safeSlug,
        title,
        date,
        platform,
        platformUrl,
        headerImageUrl,
        externalUrl,
        content: body
      });
    }
  }

  // Sort by date (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find(article => article.slug === id || article.id === id) || null;
}