"use client";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const SwiperThumbs = ({ product }: { product: any }) => {
  const [thumbs, setThumbs] = useState(null);

  return (
    <>
      <Swiper
        slidesPerView={1}
        speed={700}
        spaceBetween={10}
        modules={[Pagination, Thumbs]}
        thumbs={{
          swiper: thumbs,
        }}
        pagination
      >
        {product.images.map((image) => (
          <SwiperSlide key={image.documentId}>
            <div className="relative rounded-[8px] ">
              <Image
                src={getStrapiMedia(image.url)}
                width={461}
                height={583}
                alt="Изображение товара"
                className="lg:w-[461px] h-[419px] rounded-[8px] lg:h-[583px] border border-grey"
              />
              <div className="absolute top-[10px] right-[10px] flex gap-[5px]">
                {product.is_hit && (
                  <span className="px-[5px] py-[3px] text-[10px] bg-bg-green text-white rounded-[2px]">
                    Хит
                  </span>
                )}
                {product.is_new && (
                  <span className="px-[5px] py-[3px] text-[10px] bg-white rounded-[2px]">
                    Новинка
                  </span>
                )}
                {product.is_promotion && (
                  <span className="px-[5px] py-[3px] text-[10px] bg-bg-orange text-white rounded-[2px]">
                    Акция
                  </span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        slidesPerView={3}
        speed={700}
        spaceBetween={10}
        onSwiper={setThumbs}
        className="mt-[10px]"
      >
        {product.images.map((image) => (
          <SwiperSlide key={image.documentId}>
            <div className="cursor-pointer rounded-[8px] ">
              <Image
                src={getStrapiMedia(image.url)}
                width={147}
                height={165}
                alt="Изображение товара"
                className="w-[147px] h-[123px] lg:h-[165px] rounded-[8px] border border-grey"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
