import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../../components/MainLayout.tsx";
import { Blog } from "../../types/blog.ts";
import { getBlogById } from "../../utils/blog.ts";

export const handler: Handlers<Blog | null> = {
  async GET(_req, ctx) {
    const blog = await getBlogById(ctx.params.title);
    return ctx.render(blog);
  },
};

export default function BlogPage({ data }: PageProps<Blog>) {
  if (!data) {
    return (
      <MainLayout>
        <p>Blog post not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-4xl mx-auto my-4 md:my-8 md:px-8">
        <div class="mb-8">
          {data.headerImageUrl && (
            <div class="flex justify-center">
              <img
                class="w-full h-auto max-h-96 w-auto mb-4"
                src={data.headerImageUrl}
                alt={data.title}
              />
            </div>
          )}
          <p class="text-sm font-serif italic">Blog&nbsp;-&nbsp;{new Date(data.date).toLocaleDateString('no', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '.')}</p>
          <p class="text-xl font-serif mb-4">{data.title}</p>

          <div class="mb-4" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </MainLayout>
  );
} 