export interface Article {
  id: string;
  title: string;
  date: string;
  platform?: string;
  platformUrl?: string;
  headerImageUrl?: string;
  externalUrl?: string;
  content: string;
} 