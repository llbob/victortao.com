export interface ProjectImage {
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  year: number;
  headerImageUrl: string;
  images: ProjectImage[];
  content: string;
} 