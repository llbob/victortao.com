import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { Project } from "../types/project.ts";
import { getProjects } from "../utils/projects.ts";

export const handler: Handlers<Project[]> = {
  async GET(_req, ctx) {
    const projects = await getProjects();
    return ctx.render(projects);
  },
};

export default function ProjectsPage({ data }: PageProps<Project[]>) {
  if (!data) {
    return (
      <MainLayout>
        <p>No projects found.</p>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div>
        {/* Mobile: Vertical Layout */}
        <div class="md:hidden">
          <div class="grid grid-cols-1 gap-8">
            {data.map((project) => (
              <div class="mb-8 group" key={project.id}>
                <a href={`/projects/${project.id}`} class="hover:text-pink block">
                  <p class="text-xs">Udstilling</p>
                  <p class="text-xl font-sans">
                    <span class="relative overflow-hidden inline-block">
                      <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                    </span>
                  </p>
                  <p class="text-xl font-sans mb-2">År: {project.year}</p>
                  <img
                    class="w-full h-[400px] object-cover transition-all duration-300 hover:opacity-90"
                    src={project.headerImageUrl}
                    alt={project.title}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Scroll */}
        <div class="hidden md:block relative">
          <div class="overflow-x-auto scrollbar-hide">
            <div class="flex space-x-8 pb-8">
              {data.map((project) => (
                <div 
                  class="flex-none w-[40vh] group" 
                  key={project.id}
                >
                  <a href={`/projects/${project.id}`} class="hover:text-pink block">
                    <div class="h-full">
                      <p class="text-xs">Udstilling</p>
                      <p class="text-xl font-sans">
                        <span class="relative overflow-hidden inline-block">
                          <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                        </span>
                      </p>
                      <p class="text-xl font-sans mb-2">År: {project.year}</p>
                      <img
                        class="min-w-[40vh] min-h-[70vh] h-full object-cover transition-all duration-300 hover:opacity-90"
                        src={project.headerImageUrl}
                        alt={project.title}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div class="mt-4 flex justify-center items-center">
            <div class="w-full max-w-md h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                id="scrollIndicator" 
                class="h-full bg-black rounded-full transition-all duration-300"
                style="width: 0%"
              ></div>
            </div>
            <div id="scrollCounter" class="ml-4 text-sm font-mono">
              (0/{data.length})
            </div>
          </div>
          
          {/* Script to update scroll indicator */}
          <script dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const scrollContainer = document.querySelector('.overflow-x-auto');
                const indicator = document.getElementById('scrollIndicator');
                const counter = document.getElementById('scrollCounter');
                const totalItems = ${data.length};
                
                if (scrollContainer && indicator && counter) {
                  scrollContainer.addEventListener('scroll', () => {
                    const scrollLeft = scrollContainer.scrollLeft;
                    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                    const scrollPercentage = (scrollLeft / maxScroll) * 100;
                    
                    // Update the indicator width
                    indicator.style.width = scrollPercentage + '%';
                    
                    // Calculate current item based on scroll percentage
                    // This ensures we reach the last item when fully scrolled
                    const currentItem = Math.min(
                      Math.round((scrollPercentage / 100) * (totalItems - 1)),
                      totalItems - 1
                    );
                    
                    // Update the counter text
                    counter.textContent = '(' + (currentItem + 1) + '/' + totalItems + ')';
                  });
                }
              });
            `
          }} />
        </div>
      </div>
    </MainLayout>
  );
}
