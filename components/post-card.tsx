import { Post } from "@/interface/post";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="cursor-pointer">
      <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
        <div className="mb-2">
          <h2 className="text-lg font-medium text-foreground hover:text-primary transition-colors leading-tight">
            {post.title}
          </h2>
        </div>
        <time className="text-sm text-muted-foreground">
          {post.displayDate}
        </time>

        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          {post.excerpt}
        </p>

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
      </Link>
    </article>
  );
}
