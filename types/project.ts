export interface ProjectImage {
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;  // New explicit slug field
  title: string;
  year: number;
  headerImageUrl: string;
  images: ProjectImage[];
  content: string;
}