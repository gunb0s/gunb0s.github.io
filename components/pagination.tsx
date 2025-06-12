import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page URLs
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set("page", page.toString());
    }
    return params.toString() ? `?${params.toString()}` : "";
  };

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12">
      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? getPageUrl(currentPage - 1) : undefined}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageUrl(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

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
      </PaginationRoot>
    </div>
  );
}
