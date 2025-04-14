import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header>
      <nav className="flex justify-between">
        <ul>
          <li>
            <Link href="/">О компании</Link>
          </li>
          <li>
            <Link href="/">Доставка и оплата</Link>
          </li>
          <li>
            <Link href="/">Гарантия и сервисные центры</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/">+7 000 000-00-00</Link>
          </li>
          <li>
            <Link href="/">почта@gmail.ru</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
