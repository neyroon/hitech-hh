"use client";
import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import { useState } from "react";

export const Description = ({ product }: { product: any }) => {
  const [isTruncate, setIsTruncate] = useState(true);
  return (
    <div>
      <p className="text-[16px] mb-[14px]">Описание</p>
      <div className="mb-[10px]">
        <Markdown
          className={classNames("text-[12px]  ", {
            "truncate line-clamp-6": isTruncate,
          })}
        >
          {product.description}
        </Markdown>
      </div>
      <button
        className="text-grey border-b border-grey border-dashed self-start cursor-pointer"
        onClick={() => setIsTruncate((prev) => !prev)}
      >
        Показать все
      </button>
    </div>
  );
};
