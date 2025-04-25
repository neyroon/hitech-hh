import Link from "next/link";
import React from "react";
import { LogoIcon } from "../icons/logo";
import { CatalogButton } from "../caralog-button";
import { SearchIcon } from "../icons/search";
import { CartIcon } from "../icons/cart";
import { HeaderMobile } from "./header-mobile";

export const Header = () => {
  return (
    <header className="lg:flex lg:justify-center">
      <div className="hidden lg:block w-[1264px] px-[20px]">
        <nav className="flex justify-between text-grey py-[14px]">
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
          <CatalogButton />
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
          <div className="px-[15px] py-[9px] gap-[20px] flex items-center bg-bg-grey rounded-[8px] w-[42%]">
            <SearchIcon />
            <input
              type="search"
              className="grow text-[16px] text-main2 placeholder:text-grey"
              placeholder="Поиск по сайту"
            />
          </div>
          <Link
            href="/card"
            className="p-[12px] text-grey hover:text-bg-red group  transition-colors duration-300 font-(family-name:--font-roboto) relative"
          >
            <CartIcon />
            <div className="bg-bg-red text-white rounded-[5px] text-[12px] h-[22px] w-[22px] absolute right-[-4px] top-[-4px] flex items-center justify-center">
              <span className="">10</span>
            </div>
          </Link>
        </nav>
      </div>
      <HeaderMobile />
    </header>
  );
};
