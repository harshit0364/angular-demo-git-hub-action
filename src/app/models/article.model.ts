export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date;
  category: string;
  tags: string[];
}
