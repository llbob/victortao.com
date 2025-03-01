import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { ProjectImage } from "../types/cultproject.ts";

interface ArchiveCarouselProps {
  images: ProjectImage[];
  title: string;
  linkUrl: string;
}

export default function ArchiveCarousel({ images, title, linkUrl }: ArchiveCarouselProps) {
  const currentImageIndex = useSignal(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const nextSlide = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  };

  const previousSlide = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length;
  };

  // Add keyboard navigation similar to ProjectCarousel
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft") {
        event.preventDefault();
        previousSlide(event as unknown as MouseEvent);
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        nextSlide(event as unknown as MouseEvent);
      }
    };

    carouselRef.current?.addEventListener("keydown", keydownHandler);
    return () => carouselRef.current?.removeEventListener("keydown", keydownHandler);
  }, []);

  const currentImage = images[currentImageIndex.value];

  return (
    <div className="relative group" ref={carouselRef} tabIndex={0}>
      {/* Main image with link - using fixed height container */}
      <div className="h-[550px] overflow-hidden">
        <a href={linkUrl} className="block h-full">
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative h-full max-h-full w-auto">
              <img
                src={currentImage.url}
                alt={currentImage.caption || title}
                className="max-h-full max-w-full object-contain"
              />
              {/* Image counter positioned on the image */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-backgroundColor rounded-full px-2 py-1 text-xs">
                  {currentImageIndex.value + 1} / {images.length}
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      
      {/* Navigation arrows and counter */}
      {images.length > 1 && (
        <>
          {/* Left arrow - responsive positioning */}
          <button
            className="absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 md:-translate-x-12 p-2 bg-backgroundColor rounded-full text-black focus:outline-none z-10"
            onClick={previousSlide}
            aria-label="Previous image"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Right arrow - responsive positioning */}
          <button
            className="absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 md:translate-x-12 p-2 bg-backgroundColor rounded-full text-black focus:outline-none z-10"
            onClick={nextSlide}
            aria-label="Next image"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Caption display */}
      {/* {currentImage.caption && (
        <div className="text-black text-center p-2 mt-2">
          <p className="text-sm">({currentImageIndex.value + 1}.) {currentImage.caption}</p>
        </div>
      )} */}
    </div>
  );
} 