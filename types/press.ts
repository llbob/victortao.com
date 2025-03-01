export interface PressItem {
  title: string;
  articleDate?: string;
  url: string;
}

export interface Press {
  items: PressItem[];
  content: string;
} 