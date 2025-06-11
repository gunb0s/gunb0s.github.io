import PostCard from "./post-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

export default function PostList() {
  const posts = [
    {
      id: "1",
      title:
        "Deep Dive into React Server Components: Architecture and Implementation",
      date: "Dec 8, 2024",
      tags: ["React", "Server Components", "Performance"],
      excerpt:
        "An in-depth analysis of React Server Components, exploring the architectural decisions and implementation details.",
    },
    {
      id: "2",
      title:
        "Understanding RAFT Consensus Algorithm Through etcd Implementation",
      date: "Dec 5, 2024",
      tags: ["Distributed Systems", "Consensus", "etcd"],
      excerpt:
        "A practical exploration of the RAFT consensus algorithm by examining its implementation in etcd.",
    },
    {
      id: "3",
      title:
        "Contributing to Kubernetes: A Journey Through the Scheduler Codebase",
      date: "Dec 2, 2024",
      tags: ["Kubernetes", "Go", "Cloud Native"],
      excerpt:
        "My experience contributing to Kubernetes scheduler, from understanding the codebase to implementing features.",
    },
    {
      id: "4",
      title:
        "MapReduce Paper Analysis: Lessons for Modern Distributed Computing",
      date: "Nov 28, 2024",
      tags: ["MapReduce", "Distributed Computing", "Research"],
      excerpt:
        "Revisiting the seminal MapReduce paper and analyzing its influence on modern frameworks.",
    },
    {
      id: "5",
      title: "Building a High-Performance Parser: Lessons from Tree-sitter",
      date: "Nov 25, 2024",
      tags: ["Parsing", "Tree-sitter", "Performance"],
      excerpt:
        "Exploring the architecture of Tree-sitter and how it achieves high performance for syntax highlighting.",
    },
    {
      id: "6",
      title: "Understanding WebAssembly: Performance and Security Analysis",
      date: "Nov 22, 2024",
      tags: ["WebAssembly", "Performance", "Security"],
      excerpt:
        "A comprehensive look at WebAssembly performance characteristics and security implications.",
    },
    {
      id: "7",
      title: "Exploring Rust's Ownership Model in Practice",
      date: "Nov 18, 2024",
      tags: ["Rust", "Memory Management", "Systems"],
      excerpt:
        "Real-world examples of how Rust's ownership model prevents common programming errors.",
    },
  ];

  const totalPages = 10;
  const currentPage = 1;
  const currentPosts = posts.slice(0, 10);

  return (
    <main className="max-w-2xl mx-auto px-6 pb-16">
      <div className="space-y-8">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext className="pointer-events-none opacity-50" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
