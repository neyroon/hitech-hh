import Link from "next/link";
import { LogoIcon } from "../icons/logo";
import { TgFooterIcon } from "../icons/tg-footer";
import { TTIcon } from "../icons/tt";
import { VkFooterIcon } from "../icons/vk-footer";
import { WhatsappFooterIcon } from "../icons/whatsapp-footer";
import { YoutubeFooterIcon } from "../icons/youtube-footer";

export const Footer = () => {
  const navItems = [
    { text: "Главная", link: "/" },
    { text: "Статьи", link: "/articles" },
    { text: "О компании", link: "/about" },
    { text: "Доставка и оплата", link: "/delivery" },
    { text: "Условия гарантии", link: "/warranty" },
  ];
  const catalogItems = [
    { text: "Пылесосы", link: "/" },
    { text: "Отпариватели", link: "/articles" },
    { text: "Техника для кухни", link: "/about" },
    { text: "Техника для уборки", link: "/delivery" },
    { text: "Аксессуары и расходные материалы", link: "/warranty" },
  ];
  return (
    <footer className="flex justify-center bg-main2 py-[50px]">
      <div className=" px-[20px]  w-full xl:px-0 xl:w-[1264px] flex justify-between gap-[30px] flex-col lg:flex-row">
        <div className="text-white flex flex-col gap-[20px]">
          <LogoIcon width={211} height={50} />
          <span className="text-[12px]">2025 © Все права защищены</span>
        </div>
        <nav className="flex flex-col gap-[14px] text-grey">
          <p className="text-[16px] mb-[6px] text-white">Навигация</p>
          {navItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className="hover:text-white   transition-colors duration-300"
            >
              {item.text}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-[14px] text-grey">
          <p className="text-[16px] mb-[6px] text-white">Каталог</p>
          {catalogItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className="hover:text-white   transition-colors duration-300"
            >
              {item.text}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-[20px] text-white">
          <p>Контакты</p>
          <div>
            <div className="flex justify-between mb-[10px]">
              <span>Пн-Вс с 9:00 до 21:00</span>
            </div>
            <Link href="mailto:hitech.comp@mail.ru">hitech.comp@mail.ru</Link>
          </div>
          <div className="flex gap-[10px]">
            <Link href="https://t.me/+79811895734">
              <TgFooterIcon />
            </Link>
            <Link href="https://vk.com/hitech_hh">
              <VkFooterIcon />
            </Link>
            <Link href="https://gclnk.com/ZkM4pMWG">
              <TTIcon />
            </Link>
            <Link href="https://gclnk.com/jctxufUT">
              <YoutubeFooterIcon />
            </Link>
            <Link href="https://wa.me/79811895734">
              <WhatsappFooterIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
