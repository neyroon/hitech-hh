"use client";
import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import React, { useState } from "react";

export const Description = ({ product }: { product: any }) => {
  const [isTruncate, setIsTruncate] = useState(true);
  return (
    <div>
      <p className="text-[16px] mb-[14px]">Описание</p>
      <Markdown
        className={classNames("text-[12px]  mb-[10px]", {
          "truncate line-clamp-6": isTruncate,
        })}
      >
        {product.data[0].description}
      </Markdown>
      <button
        className="text-grey border-b border-grey border-dashed self-start cursor-pointer"
        onClick={() => setIsTruncate((prev) => !prev)}
      >
        Показать все
      </button>
    </div>
  );
};
