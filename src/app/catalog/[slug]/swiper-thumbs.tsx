"use client";
import { LeftIcon } from "@/components/icons/left";
import { RightIcon } from "@/components/icons/right";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

export const SwiperThumbs = ({
  product,
  selectedColorIndex,
}: {
  product: any;
  selectedColorIndex: number;
}) => {
  const [thumbs, setThumbs] = useState(null);
  const mainSwiper = useRef<null | SwiperRef>(null);
  const thumbSwiper = useRef<null | SwiperRef>(null);

  const swiperRef = useRef<null | SwiperRef>(null);

  useEffect(() => {
    mainSwiper.current?.swiper.update();
    mainSwiper.current?.swiper.slideTo(0);
    thumbSwiper.current?.swiper.update();
    thumbSwiper.current?.swiper.slideTo(0);
  }, [selectedColorIndex]);

  const handleButtonLeftClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleButtonRightClick = () => {
    swiperRef.current?.swiper.slideNext();
  };

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
        ref={mainSwiper}
        pagination
      >
        {(product.colors[selectedColorIndex]?.images || product.images).map(
          (image) => (
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
          )
        )}
      </Swiper>
      <div className="relative">
        <button
          aria-label="Влево"
          className="hidden xl:flex absolute top-[50%] left-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black text-white opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
          onClick={handleButtonLeftClick}
        >
          <LeftIcon />
        </button>
        <Swiper
          slidesPerView={3}
          speed={700}
          spaceBetween={10}
          ref={thumbSwiper}
          onSwiper={setThumbs}
          className="mt-[10px]"
        >
          {(product.colors[selectedColorIndex]?.images || product.images).map(
            (image) => (
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
            )
          )}
        </Swiper>
        <button
          aria-label="Вправо"
          className="hidden xl:flex absolute top-[50%] right-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black text-white opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
          onClick={handleButtonRightClick}
        >
          <RightIcon />
        </button>
      </div>
    </>
  );
};
