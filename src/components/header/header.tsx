import Link from "next/link";
import React from "react";
import { LogoIcon } from "../icons/logo";
import { CatalogButton } from "../caralog-button";
import { SearchIcon } from "../icons/search";
import { HeaderMobile } from "./header-mobile";
import { fetchAPI } from "@/utils/strapi";
import { isMobileDevice } from "@/utils/is-mobile";
import { HeaderCart } from "./header-cart";
import { StatusBar } from "./status-bar";
import { SearchBar } from "../search-bar";

export const Header = async () => {
  const categories = await fetchAPI(
    `/categories?populate[device_types][populate]=*&populate[image][populate]=*`
  );
  const isMobile = await isMobileDevice();
  return (
    <>
      <header className="lg:flex lg:justify-center bg-white sticky top-0 z-50 py-[10px] ">
        {!isMobile && (
          <div className="hidden lg:block w-[1264px] px-[20px] xl:px-0">
            <nav className="flex justify-between text-grey mb-[10px]">
              <ul className="flex gap-[20px]">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-main2   transition-colors duration-300"
                  >
                    О компании
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delivery"
                    className="hover:text-main2  transition-colors duration-300"
                  >
                    Доставка и оплата
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warranty"
                    className="hover:text-main2  transition-colors duration-300"
                  >
                    Гарантия и сервисные центры
                  </Link>
                </li>
              </ul>
              <ul className="flex gap-[20px]">
                <li>
                  <Link
                    href="tel:+79811895734"
                    className="hover:text-main2  transition-colors duration-300"
                  >
                    +7 (981) 189-57-34
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:hitech.comp@mail.ru"
                    className="hover:text-main2  transition-colors duration-300"
                  >
                    hitech.comp@mail.ru
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className="flex items-center gap-[20px] text-grey">
              <Link href="/" className="text-main2">
                <LogoIcon width={211} height={50} />
              </Link>
              <CatalogButton categories={categories.data} />
              <Link
                href="/"
                className="hover:text-main2  transition-colors duration-300"
              >
                Главная
              </Link>
              <Link
                href="/articles"
                className="hover:text-main2  transition-colors duration-300"
              >
                Статьи
              </Link>
              <SearchBar />
              <HeaderCart />
            </nav>
          </div>
        )}
        {isMobile && <HeaderMobile categories={categories.data} />}
      </header>
      <StatusBar />
    </>
  );
};
