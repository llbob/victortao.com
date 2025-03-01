export interface CVSection {
  title: string;
  items: string[];
}

export interface CV {
  sections: CVSection[];
  content: string;
} 