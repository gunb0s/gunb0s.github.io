import { getAllPosts } from "@/lib/api";
import PostCard from "./post-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

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

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Generate page URLs
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set("page", page.toString());
    }
    return params.toString() ? `?${params.toString()}` : "";
  };

  // Don't render pagination if there's only one page or no posts
  const shouldShowPagination = totalPages > 1;

  return (
    <main className="max-w-2xl mx-auto px-6 pb-16">
      <div className="space-y-8">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {shouldShowPagination && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    currentPage > 1 ? getPageUrl(currentPage - 1) : undefined
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={getPageUrl(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href={
                    currentPage < totalPages
                      ? getPageUrl(currentPage + 1)
                      : undefined
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}
