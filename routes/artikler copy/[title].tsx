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
      <div class="max-w-3xl">
        <div class="mb-8">
          <p class="text-sm font-serif italic">Blog&nbsp;-&nbsp;{new Date(data.date).toLocaleDateString('no', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '.')}</p>
          <p class="text-md font-serif italic">
            {/* <span class="">
              {data.platform && `${data.platform}`}
            </span>
            {data.platform && data.date && <span class="">&nbsp;-&nbsp;</span>} */}
            {data.date && (
              <span class="">

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