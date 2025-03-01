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
      const { title, date, platform, platformUrl, headerImageUrl, externalUrl } = attrs as {
        title: string;
        date: string;
        platform?: string;
        platformUrl?: string;
        headerImageUrl?: string;
        externalUrl?: string;
      };
      
      articles.push({
        id: title.toLowerCase().replace(/\s+/g, '-'),
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
  return articles.find(article => article.id === id) || null;
} 