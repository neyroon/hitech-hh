"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export const Partners = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.2}
      direction="horizontal"
      speed={700}
      breakpoints={{ 1024: { slidesPerView: 3 } }}
      className=""
    >
      <SwiperSlide className="h-auto!">
        <Link
          href="https://www.wildberries.ru/brands/saferet"
          className="h-[141px] bg-bg-purple flex items-center justify-center rounded-[8px]"
          target="_blank"
        >
          <Image src="/wb-logo.png" alt="wb" width={187} height={51} />
        </Link>
      </SwiperSlide>
      <SwiperSlide className="h-auto!">
        <Link
          href="https://www.ozon.ru/category/moyushchie-pylesosy-10653/saferet-100081929/"
          className="h-[141px] bg-bg-blue flex items-center justify-center rounded-[8px]"
          target="_blank"
        >
          <Image src="/ozon-logo.png" alt="ozon" width={207} height={91} />
        </Link>
      </SwiperSlide>
      <SwiperSlide className="h-auto!">
        <Link
          href="https://market.yandex.ru/catalog--vertikalnye-pylesosy/83800/list?hid=16302537&rs=eJwz4vnEyMnBIMGgcLL5MTsAFy0DsQ%2C%2C&glfilter=7893318%3A33436630"
          className="h-[141px] bg-bg-orange flex items-center justify-center rounded-[8px]"
          target="_blank"
        >
          <Image src="/ym-logo.png" alt="yandex" width={262} height={62} />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};
