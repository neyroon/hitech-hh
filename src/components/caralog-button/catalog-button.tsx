"use client";
import { useOutsideClick } from "@/hooks/click-outside";
import { getStrapiMedia } from "@/utils/strapi";
import classnames from "classnames";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RightIcon } from "../icons/right";

export const CatalogButton = ({ categories }: { categories: any }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const outsideRef = useOutsideClick(() => setIsCatalogOpen(false));

  useEffect(() => {
    setIsCatalogOpen(false);
  }, [searchParams, pathname]);

  return (
    <div ref={outsideRef}>
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
      <div
        className={classnames(
          "absolute h-fit top-[103px] left-[0] right-[0] flex justify-center  py-[20px] bg-white z-50 invisible opacity-0 transition-opacity duration-300 max-h-[calc(100vh-103px-20px)] overflow-y-auto",
          { "opacity-100 visible": isCatalogOpen }
        )}
      >
        <div className="flex gap-[20px] xl:w-[1264px] ">
          <div className="flex flex-col gap-[10px]">
            {categories.map((category) => (
              <button
                className={classnames(
                  "flex items-center justify-between p-[10px] w-[290px] rounded-[10px] cursor-pointer",
                  {
                    "shadow-[0px_4px_19px_0px_rgba(0,0,0,0.08)]":
                      category.name === currentCategory.name,
                  }
                )}
                key={category.name}
                onClick={() => setCurrentCategory(category)}
              >
                <div className="flex  gap-[10px] items-center">
                  <Image
                    src={getStrapiMedia(category.image.url)}
                    width={40}
                    height={40}
                    alt="Изображение категории"
                    className="w-[40px] h-[40px]"
                  />
                  <span className="text-black text-left">{category.name}</span>
                </div>
                {category.name === currentCategory.name && (
                  <div className="text-black">
                    <RightIcon />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="h-full">
            <h3 className="text-[16px] text-black font-semibold mb-[30px]">
              {currentCategory.name}
            </h3>
            <div className="flex flex-wrap gap-[20px] items-stretch">
              {currentCategory.device_types.map((type) => (
                <a
                  href={`/catalog?category=${currentCategory.slug}&deviceTypes=${type.slug}`}
                  key={type.name}
                >
                  <div className="w-[175px]">
                    <Image
                      width={175}
                      height={179}
                      src={getStrapiMedia(type.image.url)}
                      alt="Изображение типа товара"
                      className="h-[179px] w-[175px] object-contain"
                    />
                    <p className="text-center text-black">{type.name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
