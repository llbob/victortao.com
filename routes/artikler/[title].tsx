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
        <p>Article not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-3xl">
        <div class="mb-8">
          {data.headerImageUrl && (
            <div class="flex justify-center mb-4">
              <img 
                src={data.headerImageUrl} 
                alt={data.title} 
                class="w-full h-auto max-h-96 object-cover" 
              />
            </div>
          )}
          <p class="text-3xl font-sans mb-2">{data.title}</p>
          <p class="text-xl font-sans mb-4">
            {new Date(data.date).toLocaleDateString()} 
            {data.platform && (
              <>
                {" • "}
                {data.platformUrl ? (
                  <a href={data.platformUrl} target="_blank" rel="noopener noreferrer" class="hover:underline">
                    {data.platform}
                  </a>
                ) : (
                  data.platform
                )}
              </>
            )}
          </p>
          <div class="mb-4" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </MainLayout>
  );
} 