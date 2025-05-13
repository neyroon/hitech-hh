"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/cart";
import { CartIcon } from "../icons/cart";
import { CatalogIcon } from "../icons/catalog";
import { HomeIcon } from "../icons/home";
import { HomeStatusBarIcon } from "../icons/home-status-bar";

export const StatusBar = () => {
  const pathname = usePathname();
  const { cart } = useCart();
  return (
    <nav className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white  py-[14px] px-[20px] z-[49]">
      <div className="flex items-center justify-between gap-[6px]">
        <Link
          href="/"
          className={classNames(
            "text-center flex flex-col items-center gap-[4px] w-[80px] text-[12px] ",
            { "text-grey": pathname !== "/", "text-bg-red": pathname === "/" }
          )}
        >
          {pathname === "/" ? (
            <HomeStatusBarIcon />
          ) : (
            <HomeIcon className="w-[24px] h-[24px] " />
          )}
          <span className="text-grey">Главная</span>
        </Link>
        <Link
          href="/catalog"
          className={classNames(
            "text-center flex flex-col items-center gap-[4px] w-[80px] text-[12px] ",
            {
              "text-grey": pathname !== "/catalog",
              "text-bg-red": pathname === "/catalog",
            }
          )}
        >
          <CatalogIcon />
          <span className="text-grey">Каталог</span>
        </Link>
        <Link
          href="/cart"
          className={classNames(
            "text-center flex flex-col items-center gap-[4px] w-[80px] text-[12px] relative",
            {
              "text-grey": pathname !== "/cart",
              "text-bg-red": pathname === "/cart",
            }
          )}
        >
          <CartIcon />

          <div className="bg-bg-red text-white rounded-[5px] text-[12px] h-[22px] w-[22px] absolute right-[15px] top-[-10px] flex items-center justify-center font-(family-name:--font-roboto)">
            <span>{cart.totalQuantity}</span>
          </div>
          <span className="text-grey">Корзина</span>
        </Link>
      </div>
    </nav>
  );
};
