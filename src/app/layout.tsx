import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const montserattSans = Montserrat({
  weight: ["600", "400", "500"],
  variable: "--font-montserrat-sans",
  subsets: ["cyrillic", "latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserattSans.variable} antialiased`}>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
