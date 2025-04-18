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
                <a href={`/udstillinger/${project.slug}`} class="hover:text-pink block">
                  <div class="h-full">
                    <img
                      class="w-full w-min-[600px] h-[400px] object-cover transition-all duration-300 hover:opacity-90"
                      src={project.headerImageUrl}
                      alt={project.title}
                    />
                    <p class="text-sm pt-2 italic">Udstilling - {project.year}</p>
                    <p class="text-xl font-serif truncate">
                      <span class="relative overflow-hidden truncate inline-block">
                        <span class="whitespace-nowrap inline-block group-hover:animate-text-scroll">{project.title}</span>
                      </span>
                    </p>
                    <p class="text-xl font-serif mb-2">År: {project.year}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Scroll */}
        <div class="hidden md:block relative">
          <div class="mx-auto my-4 md:my-8 md:px-8 overflow-x-auto scrollbar-hide">
            <div class="flex space-x-8 pb-8">
              {data.map((project) => (
                <div
                  class="flex-none w-[50vh] group"
                  key={project.id}
                >
                  <a href={`/udstillinger/${project.slug}`} class="hover:text-pink block">
                    <div class="h-full">
                      <img
                        class="min-w-[50vh] min-h-[70vh] h-full object-cover transition-all duration-300 hover:opacity-90"
                        src={project.headerImageUrl}
                        alt={project.title}
                      />
                      <p class="text-sm pt-2 italic">Udstilling - {project.year}</p>
                      <p class="text-xl font-serif truncate group-hover:overflow-visible group-hover:whitespace-normal">
                        <span class="inline-block group-hover:animate-text-scroll group-hover:whitespace-nowrap">
                          {project.title}
                        </span>
                      </p>

                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div class="mt-4 flex justify-center items-center">
            <div class="w-full max-w-md h-1 bg-gray-200 rounded-full overflow-visible relative">
              <div
                id="scrollIndicator"
                class="h-full bg-black rounded-full transition-all duration-300"
                style="width: 0%"
              ></div>
              <div id="glitchSymbolsContainer" class="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-start overflow-visible">
                {/* Glitch symbols will be added here dynamically */}
              </div>
            </div>
            <div id="scrollCounter" class="ml-4 text-sm font-serif">
              (0 / {data.length})
            </div>
          </div>

          {/* Script to update scroll indicator */}
          <script dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const scrollContainer = document.querySelector('.overflow-x-auto');
                const indicator = document.getElementById('scrollIndicator');
                const glitchContainer = document.getElementById('glitchSymbolsContainer');
                const counter = document.getElementById('scrollCounter');
                const totalItems = ${data.length};
                const glitchSymbols = ['⁕', '🫧', '🌻', 'τ', '⁂', '⁀', '⁖', '⁘', '⁙'];
                
                if (scrollContainer && indicator && counter && glitchContainer) {
                  scrollContainer.addEventListener('scroll', () => {
                    const scrollLeft = scrollContainer.scrollLeft;
                    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                    const scrollPercentage = (scrollLeft / maxScroll) * 100;
                    
                    // Update the indicator width
                    indicator.style.width = scrollPercentage + '%';
                    
                    // Calculate current item based on scroll percentage
                    const currentItem = Math.min(
                      Math.round((scrollPercentage / 100) * (totalItems - 1)),
                      totalItems - 1
                    );
                    
                    // Update the counter text
                    counter.textContent = '(' + (currentItem + 1) + ' / ' + totalItems + ')';
                    
                    // Add random glitch symbols occasionally
                    if (Math.random() > 0.85) {
                      const randomSymbol = glitchSymbols[Math.floor(Math.random() * glitchSymbols.length)];
                      const symbolElement = document.createElement('div');
                      symbolElement.textContent = randomSymbol;
                      symbolElement.style.position = 'absolute';
                      symbolElement.style.left = (scrollPercentage * 0.95) + '%';
                      symbolElement.style.top = (Math.random() > 0.5 ? '-10px' : '0px');
                      symbolElement.style.fontSize = '16px';
                      symbolElement.style.color = Math.random() > 0.5 ? 'black' : 'rgb(147, 123, 151)';
                      symbolElement.style.transform = 'rotate(' + (Math.random() * 40 - 20) + 'deg)';
                      symbolElement.style.opacity = '0.8';
                      glitchContainer.appendChild(symbolElement);
                      
                      // Remove after a short delay
                      setTimeout(() => {
                        glitchContainer.removeChild(symbolElement);
                      }, 300 + Math.random() * 200);
                    }
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
