export interface Blog {
  id: string;
  slug: string;  // New explicit slug field
  title: string;
  date: string;
  headerImageUrl?: string;
  content: string;
}