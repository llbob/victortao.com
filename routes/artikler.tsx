import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { Article } from "../types/article.ts";
import { getArticles } from "../utils/articles.ts";

export const handler: Handlers<Article[]> = {
  async GET(_req, ctx) {
    const articles = await getArticles();
    return ctx.render(articles);
  },
};

export default function ArticlesPage({ data }: PageProps<Article[]>) {
  if (!data || data.length === 0) {
    return (
      <MainLayout>
        <p>No articles found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-4xl">
        <div class="grid grid-cols-1 gap-8">
          {data.map((article) => (
            <div class="mb-8 group" key={article.id}>
              {article.externalUrl ? (
                <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" class="hover:text-pink block">
                  {article.headerImageUrl && (
                    <img
                      class="w-full h-auto min-h-[400px] object-cover mt-2"
                      src={article.headerImageUrl}
                      alt={article.title}
                    />
                  )}
                  <p class="text-sm pt-2 italic">Artikel</p>
                  <p class="text-md font-serif pt-1 italic">
                    <span class="">
                      {article.platform && ` ${article.platform}`}
                    </span>
                    <span class="">&nbsp;-&nbsp;
                      {new Date(article.date).toLocaleDateString('no', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }).replace(/\//g, '.')}
                    </span>
                  </p>
                  <p class="text-xl font-serif">
                    <span class="relative overflow-hidden inline-block">
                      <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{article.title}</span>
                    </span>
                  </p>

                </a>
              ) : (
                <a href={`/artikler/${article.slug}`} class="hover:text-yellow-800 block">
                  {article.headerImageUrl && (
                    <img
                      class="w-full h-auto min-h-[400px] object-cover mt-2"
                      src={article.headerImageUrl}
                      alt={article.title}
                    />
                  )}
                  <p class="text-sm pt-2 italic">Artikel</p>
                  <p class="text-md font-serif pt-1 italic">
                    <span class="">
                      {article.platform && ` ${article.platform}`}
                    </span>
                    <span class="">&nbsp;-&nbsp;
                      {new Date(article.date).toLocaleDateString('no', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }).replace(/\//g, '.')}
                    </span>
                  </p>
                  <p class="text-xl font-serif">
                    <span class="relative overflow-hidden inline-block">
                      <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{article.title}</span>
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