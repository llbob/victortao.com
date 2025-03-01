export interface ProjectImage {
  url: string;
  caption?: string;
}

export interface CultProject {
  id: string;
  title: string;
  year: number;
  headerImageUrl?: string;
  externalUrl?: string;
  images: ProjectImage[];
  content: string;
} 