import { isMobileDevice } from "@/utils/is-mobile";
import { fetchAPI } from "@/utils/strapi";
import Link from "next/link";
import { CatalogButton } from "../caralog-button";
import { LogoIcon } from "../icons/logo";
import { TgFooterIcon } from "../icons/tg-footer";
import { WhatsappFooterIcon } from "../icons/whatsapp-footer";
import { SearchBar } from "../search-bar";
import { HeaderCart } from "./header-cart";
import { HeaderMobile } from "./header-mobile";
import { StatusBar } from "./status-bar";

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
              <ul className="flex  gap-[20px]">
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
                    Условия гарантии
                  </Link>
                </li>
              </ul>
              <ul className="flex items-center gap-[20px]">
                <li>
                  <Link href="https://t.me/@HELP_Saferet">
                    <TgFooterIcon className="w-[30px] h-[30px]" />
                  </Link>
                </li>
                <li>
                  <Link href="https://wa.me/79811895734">
                    <WhatsappFooterIcon className="w-[30px] h-[30px]" />
                  </Link>
                </li>
                <li className="text-grey text-[12px]">Тех. поддержка</li>
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
