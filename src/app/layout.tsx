import { BannerTop } from "@/components/banner-top";
import { CartProvider } from "@/components/context/cart";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Выберите бытовую технику для дома и бизнеса",
  description:
    "Купите бытовую технику для дома и бизнеса с гарантией до 5 лет! Пылесосы, отпариватели, кофемашины, микроволновки, грили, блендеры, посудомоечные машины, паровые швабры и расходные материалы. Быстрая доставка по РФ! Перейдите в каталог и выберите лучшее!",
  openGraph: {
    title: "Выберите бытовую технику для дома и бизнеса",
    description:
      "Купите бытовую технику для дома и бизнеса с гарантией до 5 лет! Пылесосы, отпариватели, кофемашины, микроволновки, грили, блендеры, посудомоечные машины, паровые швабры и расходные материалы. Быстрая доставка по РФ! Перейдите в каталог и выберите лучшее!",
  },
};

const montserattSans = Montserrat({
  weight: ["700", "600", "400", "500", "300"],
  variable: "--font-montserrat-sans",
  subsets: ["cyrillic", "latin"],
});

const RobotoSans = Roboto({
  weight: ["600", "400", "500"],
  variable: "--font-roboto",
  subsets: ["cyrillic", "latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${montserattSans.variable} ${RobotoSans.variable} antialiased pb-[75px] lg:pb-0`}
      >
        <BannerTop />
        <CartProvider>
          <Header />
          <main className="min-h-[246px] lg:min-h-[512px]">{children}</main>
        </CartProvider>

        <Footer />
      </body>
    </html>
  );
}
