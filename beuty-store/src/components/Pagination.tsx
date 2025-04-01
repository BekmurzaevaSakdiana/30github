"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
//   totalItems: number;
//   itemsPerPage: number;
next?:null | string;
back?:null | string;

}

export default function Pagination({
//   totalItems,
//   itemsPerPage,
next,
back
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("offset") || 1);
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   console.log(totalPages);

  const updatePage = (newPage: number) => {
    // if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", (newPage || 1) + '');
    router.push(`?${params.toString()}`, { scroll: false });
  };

//   if (totalPages <= 1) return null;

  return (
    <div className="pagination flex items-center gap-4 mt-6 justify-center">
      <button
        onClick={() => updatePage(currentPage - 1)}
        // disabled={currentPage === 1}
        disabled={!back}
        className={`disabled:opacity-50`}
      >
        <img src="/svg/left.png" alt="Previous" />
      </button>

      <span className="text-lg font-medium">
        {/* {currentPage} / {totalPages} */}
      </span>

      <button
        disabled={!next}
        onClick={() => updatePage(currentPage + 1)}
        // disabled={currentPage === totalPages}
        className="disabled:opacity-50"
      >
        <img className="-rotate-180" src="/svg/left.png" alt="Previous" />
      </button>
    </div>
  );
}
