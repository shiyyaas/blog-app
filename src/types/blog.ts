export type ColorBlockVariant =
  | 'block-lime'
  | 'block-lilac'
  | 'block-cream'
  | 'block-pink'
  | 'block-mint'
  | 'block-coral'
  | 'block-navy';

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  body: string;
  excerpt: string;
  author: Author;
  date: string;
  formattedDate: string;
  readTime: string;
  category: string;
  colorTheme: ColorBlockVariant;
}
