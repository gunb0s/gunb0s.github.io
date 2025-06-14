import { getAllPosts, getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <main className="max-w-2xl mx-auto px-6 py-8">
      <Link
        href="/"
        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to posts
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-medium text-foreground mb-3 leading-tight">
            {post.title}
          </h1>
          <time className="text-sm text-muted-foreground mb-4 block">
            {post.displayDate}
          </time>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-none">
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
    </main>
  );
}
