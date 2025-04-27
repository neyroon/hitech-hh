"use client";
import React, { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ArticleCard } from "./article-card";
import "swiper/css";
import { LeftIcon } from "../icons/left";
import { RightIcon } from "../icons/right";

export const ArticleWithSwiperHorizontal = ({
  articleItems,
}: {
  articleItems: any;
}) => {
  const swiperRef = useRef<null | SwiperRef>(null);

  const handleButtonLeftClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleButtonRightClick = () => {
    swiperRef.current?.swiper.slideNext();
  };
  return (
    <>
      <button
        aria-label="Влево"
        className="hidden xl:flex absolute top-[50%] left-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black text-white opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
        onClick={handleButtonLeftClick}
      >
        <LeftIcon />
      </button>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.3}
        direction="horizontal"
        speed={700}
        breakpoints={{ 1024: { slidesPerView: 4 } }}
        ref={swiperRef}
        className=""
      >
        {articleItems.data.map((article) => (
          <SwiperSlide key={article.documentId}>
            <ArticleCard article={article} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        aria-label="Вправо"
        className="hidden xl:flex absolute top-[50%] right-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black text-white opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
        onClick={handleButtonRightClick}
      >
        <RightIcon />
      </button>
    </>
  );
};
