export interface Article {
  id: string;
  slug: string;  // New explicit slug field
  title: string;
  date: string;
  platform?: string;
  platformUrl?: string;
  headerImageUrl?: string;
  externalUrl?: string;
  content: string;
}