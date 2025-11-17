import { BannerTop } from "@/components/banner-top";
import { CartProvider } from "@/components/context/cart";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { YandexMetrika } from "@/components/metrica";
import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
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
        <Script id="metrika-counter" strategy="afterInteractive">
          {` (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105326975', 'ym');

    ym(105326975, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});

`}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/105326975"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>
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
