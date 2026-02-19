import { type FC, useEffect, useMemo } from "react";

import { useBreakpoints } from "@hooks";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui-kit";
import { cn } from "@utils";

interface PaginationSectionProps {
  currentPage: number;
  length: number;
}

export const PaginationSection: FC<PaginationSectionProps> = ({
  currentPage,
  length,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { xs } = useBreakpoints();
  const totalPagesCount = Array.from({ length: length }, (_, i) => i + 1);
  const pagesCount = useMemo(
    () =>
      xs
        ? totalPagesCount.slice(
          currentPage > 2 ? currentPage - 1 : 0,
          currentPage > 2 ? currentPage : 3,
        )
        : totalPagesCount.slice(
          currentPage > 3 ? currentPage - 3 : 0,
          currentPage > 3 ? currentPage + 2 : 5,
        ),
    [xs, currentPage, totalPagesCount],
  );
  const showFirstPage = useMemo(
    () => (xs ? currentPage > 2 : currentPage > 3),
    [xs, currentPage],
  );
  const showFirstPageEllipsis = useMemo(
    () =>
      xs
        ? totalPagesCount.length > 3 && currentPage > 2
        : totalPagesCount.length > 5 && currentPage > 3,
    [xs, currentPage, totalPagesCount.length],
  );
  const showLastPage = useMemo(
    () =>
      xs
        ? totalPagesCount.length > 3 && currentPage < totalPagesCount.length
        : totalPagesCount.length > 5 &&
        currentPage < totalPagesCount.length - 2,
    [xs, currentPage, totalPagesCount.length],
  );
  const showLastPageEllipsis = useMemo(
    () =>
      xs
        ? totalPagesCount.length > 3 && currentPage < totalPagesCount.length
        : totalPagesCount.length > 5 &&
        currentPage < totalPagesCount.length - 2,
    [xs, currentPage, totalPagesCount.length],
  );

  const goToPage = (page: number) => {
    navigate({ to: pathname, search: (prev) => ({ ...prev, page: page, }) });
  };

  useEffect(() => {
    if (!currentPage || currentPage < 1) {
      navigate({ to: "/substances", search: { page: 1 }, replace: true });
    }
  }, [currentPage, navigate]);

  return (
    <Pagination className="pt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => { e.preventDefault(); goToPage(currentPage - 1) }}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
        {showFirstPage && (
          <PaginationItem>
            <PaginationLink
              onClick={(e) => { e.preventDefault(); goToPage(1) }}
            >1</PaginationLink>
          </PaginationItem>
        )}
        {showFirstPageEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagesCount.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={(e) => { e.preventDefault(); goToPage(page) }}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {showLastPageEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {showLastPage && (
          <PaginationItem>
            <PaginationLink
              onClick={(e) => { e.preventDefault(); goToPage(totalPagesCount.length) }}
            >
              {totalPagesCount.length}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => { e.preventDefault(); goToPage(currentPage + 1) }}
            className={cn(
              currentPage === totalPagesCount.length &&
              "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
