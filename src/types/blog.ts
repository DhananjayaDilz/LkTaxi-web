export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown style content for the body, or we can use structured content
  coverImage: string;
  coverImageAlt?: string;
  gallery: string[];
  author: string;
  date: string;
  dateModified?: string;
  readTime: string;
  tags: string[];
  seoTitle?: string;
  metaDescription?: string;
  faqs?: { q: string; a: string }[];
}
