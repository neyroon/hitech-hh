"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LogoIcon } from "../icons/logo";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { SearchBar } from "../search-bar";

export const HeaderMobile = ({ categories }: { categories: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [isOpen]);

  return (
    <div className="flex justify-between lg:hidden px-[20px] py-[5px]">
      <Link href="/" className="text-main2">
        <LogoIcon width={143} height={34} />
      </Link>
      <button
        className={classnames(
          "bg-bg-red transition-colors duration-300 z-[50] px-[7px] py-[10px] items-center cursor-pointer text-white rounded-[4px]",
          { "bg-white": isOpen }
        )}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <div className="w-[24px] relative rotate-0 transition-all duration-500 h-[14px]">
          <span
            className={classnames(
              "block absolute rounded-[10px] left-0 opacity-100 rotate-0 transition-all duration-300 w-full h-[2px]  top-0 origin-left",
              {
                "rotate-45 top-[-3px] left-[4px] bg-black": isOpen,
                "bg-white": !isOpen,
              }
            )}
          ></span>
          <span
            className={classnames(
              "block absolute rounded-[10px] left-0  rotate-0 transition-all duration-300  h-[2px] bg-white top-[6px] origin-left",

              {
                "w-[0%] opacity-0  bg-black": isOpen,
                "w-full opacity-100": !isOpen,
              }
            )}
          ></span>
          <span
            className={classnames(
              "block absolute rounded-[10px] opacity-100  transition-all duration-300 rotate-0 left-0 top-[12px] w-full h-[2px] origin-left",
              {
                "rotate-[-45deg] top-[14px] left-[4px]  bg-black": isOpen,
                "bg-white": !isOpen,
              }
            )}
          ></span>
        </div>
      </button>
      <aside
        className={classnames(
          {
            "translate-x-[0]": isOpen,
            "translate-x-[-100%]": !isOpen,
          },
          " bg-white fixed top-0 left-0 bottom-0 right-0 w-[100%] px-[20px]  z-20  transition-transform duration-300 supports-[-webkit-touch-callout: none]:h-[webkit-fill-available] overflow-auto"
        )}
      >
        {!isCatalogOpen && (
          <>
            <SearchBar />
            <nav className="flex flex-col gap-[20px] my-[30px] text-grey">
              <Link href="/" className="text-[16px] text-grey">
                Главная
              </Link>
              <button
                className="bg-bg-red px-[15px] flex justify-between items-center w-full h-[38px] rounded-[4px] text-white text-[16px] font-medium"
                onClick={() => setIsCatalogOpen((isOpen) => !isOpen)}
              >
                <span>Каталог</span>
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.6665 1.33366L6.33317 6.00033L1.6665 10.667"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <Link href="/articles" className="text-[16px] text-grey">
                Статьи
              </Link>
              <Link href="/about" className="text-[16px] text-grey">
                О компании
              </Link>
              <Link href="/delivery" className="text-[16px] text-grey">
                Доставка и оплата
              </Link>
              <Link href="/warranty" className="text-[16px] text-grey">
                Гарантия и сервисные центры
              </Link>
            </nav>
            <Link href="tel:+79811895734" className="text-grey">
              +7 (981) 189-57-34
            </Link>
            <Link href="mailto:hitech.comp@mail.ru" className="text-grey">
              hitech.comp@mail.ru
            </Link>
          </>
        )}
        {isCatalogOpen && (
          <>
            <button
              className="bg-main2 px-[15px] flex gap-[20px] items-center w-full h-[38px] rounded-[4px] text-white text-[16px] font-medium mt-[50px]"
              onClick={() => setIsCatalogOpen((isOpen) => !isOpen)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.333 3.33366L5.66634 8.00033L10.333 12.667"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Каталог</span>
            </button>
            <div
              className={classnames(
                "flex flex-col gap-[20px] py-[10px] bg-white "
              )}
            >
              <div className="flex flex-col gap-[10px]">
                {categories.map((category) => (
                  <>
                    <button
                      className={classnames(
                        "flex items-center justify-between p-[10px]  rounded-[10px] cursor-pointer",
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
                        <span className="text-black">{category.name}</span>
                      </div>
                    </button>
                    {category.name === currentCategory.name && (
                      <div className="mb-[40px] mt-[20px]">
                        <div className="flex flex-wrap gap-[10px] items-stretch">
                          {category.device_types.map((type) => (
                            <Link
                              href={`/catalog?category=${currentCategory.slug}&deviceTypes=${type.slug}`}
                              key={type.name}
                            >
                              <div className="w-[105px]">
                                <Image
                                  width={105}
                                  height={107}
                                  src={getStrapiMedia(type.image.url)}
                                  alt="Изображение типа товара"
                                  className="h-[107px] w-[105px] object-contain"
                                />
                                <p className="text-[10px] text-center text-black">
                                  {type.name}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
