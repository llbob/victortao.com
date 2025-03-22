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
        <p>No blog posts found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-4xl">
        <div class="grid grid-cols-1 gap-8">
          {data.map((blog) => (
            <div class="mb-8 group" key={blog.id}>
              <a href={`/blog/${blog.id}`} class="hover:text-yellow-800 block">
                {blog.headerImageUrl && (
                  <img
                    class="w-full h-auto min-h-[400px] object-cover mt-2"
                    src={blog.headerImageUrl}
                    alt={blog.title}
                  />
                )}
                <p class="text-sm pt-2 italic">Blog&nbsp;-&nbsp;{new Date(blog.date).toLocaleDateString('no', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }).replace(/\//g, '.')}</p>
                <p class="text-xl font-serif">
                  <span class="relative overflow-hidden inline-block">
                    <span class="whitespace-nowrap inline-block">{blog.title}</span>
                  </span>
                </p>
              </a>
              <div class="mb-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 