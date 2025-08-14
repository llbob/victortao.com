import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../../components/MainLayout.tsx";
import { Article } from "../../types/article.ts";
import { getArticleById } from "../../utils/articles.ts";

export const handler: Handlers<Article | null> = {
  async GET(_req, ctx) {
    const article = await getArticleById(ctx.params.title);
    return ctx.render(article);
  },
};

export default function ArticlePage({ data }: PageProps<Article>) {
  if (!data) {
    return (
      <MainLayout>
        <p>Artikel ikke fundet.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-4xl mx-auto md:px-8">
        <div class="mb-8">
          <p class="text-sm font-serif italic">Artikel</p>
          <p class="text-md font-serif italic">
            <span class="">
              {data.platform && (
                data.platformUrl ? (
                  <a
                    href={data.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-pink"
                  >
                    {data.platform}
                  </a>
                ) : (
                  `${data.platform}`
                )
              )}
            </span>
            {data.platform && data.date && <span class="">&nbsp;-&nbsp;</span>}
            {data.date && (
              <span class="">
                {new Date(data.date).toLocaleDateString('no', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).replace(/\//g, '.')}
              </span>
            )}
          </p>
          <p class="text-xl font-serif mb-4">{data.title}</p>
          
          {data.headerImageUrl && (
            <div class="mb-4">
              <img 
                src={data.headerImageUrl} 
                alt={data.title} 
                class="w-full h-auto object-cover" 
              />
            </div>
          )}
          
          <div class="mb-4" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </MainLayout>
  );
}