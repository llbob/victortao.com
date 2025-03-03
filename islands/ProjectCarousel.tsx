import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { Project } from "../types/project.ts";

interface ProjectCarouselProps {
  project: Project;
  showNavigation?: boolean;
}

export default function ProjectCarousel({ project, showNavigation = true }: ProjectCarouselProps) {
  const currentImageIndex = useSignal(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % project.images.length;
  };

  const previousSlide = () => {
    currentImageIndex.value = (currentImageIndex.value - 1 + project.images.length) % project.images.length;
  };

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft") {
        event.preventDefault();
        previousSlide();
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        nextSlide();
      }
    };

    carouselRef.current?.addEventListener("keydown", keydownHandler);
    return () => carouselRef.current?.removeEventListener("keydown", keydownHandler);
  }, []);

  const currentImage = project.images[currentImageIndex.value];

  return (
    <div className="relative flex flex-col h-[650px] md:h-[700px]">
      <div className="relative flex-grow w-auto overflow-hidden" ref={carouselRef} tabIndex={0}>
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={currentImage.url}
              alt={currentImage.caption || `${project.title} image ${currentImageIndex.value + 1}`}
              className="max-h-[650px] w-full object-contain transition-opacity duration-300"
            />
            <div className="absolute bottom-3 right-3 flex justify-center">
            <p className="text-sm text-black bg-backgroundColor rounded-full px-2 py-1">({currentImageIndex.value + 1} / {project.images.length})</p>
            </div>
          </div>
        </div>
        {showNavigation && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              className="p-2 text-black focus:outline-none transition-colors duration-300"
              onClick={previousSlide}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="p-2 text-black focus:outline-none transition-colors duration-300"
              onClick={nextSlide}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {
        currentImage.caption && (
          <div className="text-black text-center p-4 mt-auto">
            {/* place in front the number of the image */}
            <p className="text-lg italic">({currentImageIndex.value + 1}.) {currentImage.caption}</p>
          </div>
        )
      }
    </div>
  );
}
