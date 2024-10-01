import {
  Pagination as PaginationShad,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from 'components//ui/pagination';
import { Button } from 'components//ui/button';
import { cn } from 'lib/utils';

export default function ClientPagination({
  currentPage,
  totalPages,
  changePage,
}: {
  currentPage: number;
  totalPages: number;
  changePage: (newPage: number) => void;
}) {
  const pageNumbers = [];

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationShad className="mt-[70px]">
      <PaginationContent
        className="
"
      >
        {currentPage > 3 && (
          <>
            <PaginationItem>
              <Button
                onClick={() => changePage(1)}
                className={cn(
                  'h-12 w-8 bg-gray-2 text-xl font-medium text-gray hover:bg-blue-2 hover:text-white focus-visible:bg-blue-2 focus-visible:text-white',
                  currentPage === 1 && 'bg-blue-2'
                )}
              >
                1
              </Button>
            </PaginationItem>
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <Button
              onClick={() => changePage(page)}
              className={cn(
                'h-12 w-8 bg-gray-2 text-xl font-medium text-gray hover:bg-blue-2 hover:text-white focus-visible:bg-blue-2 focus-visible:text-white',
                currentPage === page && 'bg-blue-2 text-white'
              )}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}
        {endPage < totalPages && (
          <>
            {totalPages - endPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <Button
                onClick={() => changePage(totalPages)}
                className="h-12 w-8 bg-gray-2 text-xl font-medium text-gray hover:bg-blue-2 hover:text-white focus-visible:bg-blue-2 focus-visible:text-white"
              >
                {totalPages}
              </Button>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </PaginationShad>
  );
}
