import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { Blog } from "../types/blog.ts";
import { getBlogs } from "../utils/blog.ts";

export const handler: Handlers<Blog[]> = {
  async GET(_req, ctx) {
    const blogs = await getBlogs();
    return ctx.render(blogs);
  },
};

export default function BlogsPage({ data }: PageProps<Blog[]>) {
  if (!data || data.length === 0) {
    return (
      <MainLayout>
        <p>Ingen blog posts fundet.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-4xl mx-auto md:px-8">
        <div class="grid grid-cols-1 gap-8">
          {data.map((blog) => (
            <div class="mb-8 group" key={blog.id}>
              <a href={`/blog/${blog.slug}`} class="hover:text-yellow-800 block mb-4">
                {blog.headerImageUrl && (
                  <div class="flex justify-center">
                    <img
                      class="w-full h-auto max-h-96 w-auto mb-4"
                      src={blog.headerImageUrl}
                      alt={blog.title}
                    />
                  </div>
                )}
                <p class="text-sm italic">Blog&nbsp;-&nbsp;{new Date(blog.date).toLocaleDateString('no', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).replace(/\//g, '.')}</p>
                <p class="text-xl font-serif mb-4">{blog.title}</p>
              </a>
              <div class="mb-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}