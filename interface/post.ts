import { Author } from "@/interface/author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  tags: string[];
};
