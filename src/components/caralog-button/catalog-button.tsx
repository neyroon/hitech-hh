"use client";
import React, { useState } from "react";
import classnames from "classnames";

export const CatalogButton = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <button
      className={classnames(
        "bg-bg-red transition-colors duration-300 flex gap-[8px] p-[15px] items-center cursor-pointer text-white rounded-[8px]",
        { "bg-main2": isCatalogOpen }
      )}
      onClick={() => setIsCatalogOpen((isOpen) => !isOpen)}
    >
      <div className="w-[24px] relative rotate-0 transition-all duration-500 h-[14px]">
        <span
          className={classnames(
            "block absolute rounded-[10px] left-0 opacity-100 rotate-0 transition-all duration-300 w-full h-[2px] bg-white top-0 origin-left",
            { "rotate-45 top-[-3px] left-[4px]": isCatalogOpen }
          )}
        ></span>
        <span
          className={classnames(
            "block absolute rounded-[10px] left-0  rotate-0 transition-all duration-300  h-[2px] bg-white top-[6px] origin-left",

            {
              "w-[0%] opacity-0": isCatalogOpen,
              "w-full opacity-100": !isCatalogOpen,
            }
          )}
        ></span>
        <span
          className={classnames(
            "block absolute rounded-[10px] opacity-100  transition-all duration-300 rotate-0 left-0 top-[12px] w-full h-[2px] bg-white  origin-left",
            {
              "rotate-[-45deg] top-[14px] left-[4px]": isCatalogOpen,
            }
          )}
        ></span>
      </div>
      <span className="text-[16px]">Каталог</span>
    </button>
  );
};
