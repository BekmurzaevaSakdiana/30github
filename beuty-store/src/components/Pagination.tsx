"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
  next?: null | string;
  back?: null | string;
  limit: number;
}

export default function Pagination({ next, back, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const isPrevDisabled = page <= 1;
  const isNextDisabled = !next;

  return (
    <div className="pagination flex items-center gap-4 mt-6 justify-center">
      <button
        onClick={() => updatePage(page - 1)}
        disabled={isPrevDisabled}
        className={`w-12 h-12 flex items-center justify-center transition-opacity duration-300 ${
          isPrevDisabled ? "opacity-50 cursor-not-allowed" : "opacity-80 hover:opacity-50"
        }`}
      >
        <img src="/svg/left.png" alt="Previous" />
      </button>

      <button
        onClick={() => updatePage(page + 1)}
        disabled={isNextDisabled}
        className={`w-12 h-12 flex items-center justify-center transition-opacity duration-300 ${
          isNextDisabled ? "opacity-50 cursor-not-allowed" : "opacity-80 hover:opacity-50"
        }`}
      >
        <img className="-rotate-180" src="/svg/left.png" alt="Next" />
      </button>
    </div>
  );
}
