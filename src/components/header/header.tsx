import Link from "next/link";
import React from "react";
import { LogoIcon } from "../icons/logo";
import { CatalogButton } from "../caralog-button";

export const Header = () => {
  return (
    <header className="flex justify-center">
      <div className="w-[1264px] ">
        <nav className="flex justify-between text-grey py-[14px]">
          <ul className="flex gap-[20px]">
            <li>
              <Link
                href="/"
                className="hover:text-main2   transition-colors duration-300"
              >
                О компании
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-main2  transition-colors duration-300"
              >
                Доставка и оплата
              </Link>
            </li>
            <li>
              <Link
                href="/"
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
          <Link href="/">
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
            href="/"
            className="hover:text-main2  transition-colors duration-300"
          >
            Статьи
          </Link>
        </nav>
      </div>
    </header>
  );
};
