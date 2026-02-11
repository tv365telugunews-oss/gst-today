export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  location: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  comments: number;
  trustScore: number;
  source: string;
  language: string;
  isBreaking?: boolean;
  tags?: string[];
}

export type Category = 
  | 'All News'
  | 'Breaking'
  | 'Politics'
  | 'Cinema'
  | 'Business'
  | 'Sports'
  | 'Technology'
  | 'Education'
  | 'Crime'
  | 'Health';
