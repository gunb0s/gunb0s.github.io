import { getAllPosts } from "@/lib/api";
import PostCard from "./post-card";
import Pagination from "./pagination";

interface PostListProps {
  searchParams?: {
    page?: string;
  };
}

export default function PostList({ searchParams }: PostListProps) {
  const posts = getAllPosts();
  const postsPerPage = 10;

  // Get current page from URL search params, default to 1
  const currentPage = parseInt(searchParams?.page || "1", 10);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <main className="max-w-2xl mx-auto px-6 pb-16">
      <div className="space-y-8">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination
        totalItems={posts.length}
        itemsPerPage={postsPerPage}
        currentPage={currentPage}
      />
    </main>
  );
}
