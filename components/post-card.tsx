import { Post } from "@/interface/post";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="mb-2">
        <h2 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
          <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
            {post.title}
          </Link>
        </h2>
        <time className="text-sm text-muted-foreground">{post.date}</time>
      </div>

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
    </article>
  );
}
