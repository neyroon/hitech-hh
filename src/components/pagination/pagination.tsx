"use client";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

export const Pagination = ({
  paginationData,
  setCurrentPage,
}: {
  paginationData: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  setCurrentPage?: (page: number) => void;
}) => {
  const visiblePages = [];

  visiblePages.push(1);

  if (paginationData.page > 3) {
    visiblePages.push("...");
  }

  for (
    let i = Math.max(paginationData.page - 1, 2);
    i <=
    Math.min(
      Math.max(paginationData.page + 1, 4),
      paginationData.pageCount - 1
    );
    i++
  ) {
    visiblePages.push(i);
  }

  if (paginationData.page < paginationData.pageCount - 2) {
    visiblePages.push("...");
  }

  visiblePages.push(paginationData.pageCount);
  return (
    <div className="flex justify-center items-center gap-[10px] mt-[40px]">
      {paginationData.pageCount > 1 &&
        visiblePages.map((el, i) => {
          if (el === "...")
            return (
              <span
                key={`...${i}`}
                className="w-[14px] h-[32px]  text-[16px] text-grey "
              >
                {el}
              </span>
            );
          return setCurrentPage ? (
            <button
              key={el}
              className="w-[40px] h-[40px]  flex items-center justify-center text-[16px] cursor-pointer"
              onClick={() => setCurrentPage(el)}
            >
              {el}
            </button>
          ) : (
            <Link
              key={el}
              href={`/articles/page/${el}`}
              className={classNames(
                "w-[40px] h-[40px]  flex items-center justify-center text-[16px]",
                {
                  "text-grey": el === paginationData.page || el === "...",
                }
              )}
            >
              {el}
            </Link>
          );
        })}
    </div>
  );
};
