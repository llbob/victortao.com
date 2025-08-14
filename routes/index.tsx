import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { getIndex } from "../utils/index.ts";
import type { Index } from "../types/index.ts";

export const handler: Handlers<Index> = {
  async GET(_req, ctx) {
    const index = await getIndex();
    if (!index) {
      return ctx.render({ title: "", imageUrl: "", message: "", content: "" });
    }
    return ctx.render(index);
  },
};

export default function Home({ data }: PageProps<Index>) {
  return (
    <MainLayout>
      <div class="max-w-4xl mx-auto md:px-8">
        <div class="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* <h1 class="title">{data.title}</h1> */}
          <div className="w-full md:w-1/2 flex items-center">
            <div class="message" dangerouslySetInnerHTML={{ __html: data.message }} />
          </div>
          <div className="w-full md:w-1/2">
            <img
              className="index-image w-full h-auto object-cover"
              src={data.imageUrl}
              alt={data.title}
            />
          </div>
        </div>
        {data.content && (
          <div class="mt-8" dangerouslySetInnerHTML={{ __html: data.content }} />
        )}
      </div>
    </MainLayout>
  );
}
