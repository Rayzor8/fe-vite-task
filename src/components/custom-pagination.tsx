import type React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type CustomPaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  selectItemsPerPage: { label: string; value: string }[];
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPagesToShow,
  onItemsPerPageChange,
  selectItemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginationRange = (
    currentPage: number,
    totalPages: number,
    maxPagesToShow: number = 5
  ) => {
    let startPage: number, endPage: number;
    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    return Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );
  };

  const pagesToShow = getPaginationRange(
    currentPage,
    totalPages,
    maxPagesToShow
  );

  if(!totalItems) return
  
  return (
    <div className="flex justify-between w-full">
      <Select
        onValueChange={onItemsPerPageChange}
        defaultValue={itemsPerPage.toString()}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Items" />
        </SelectTrigger>
        <SelectContent>
          {selectItemsPerPage.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              isActive={currentPage > 1}
            />
          </PaginationItem>

          {pagesToShow[0] > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pagesToShow.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => onPageChange(pageNumber)}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {pagesToShow[pagesToShow.length - 1] < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
