import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post } from "@/interface/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}
