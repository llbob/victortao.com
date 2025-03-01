export interface ProjectImage {
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  year: number;
  images: ProjectImage[];
  content: string;
} 