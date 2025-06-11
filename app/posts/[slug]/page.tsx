import { getAllPosts, getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return getAllPosts();
}

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <article className="mb-32"></article>
    </main>
  );
}
