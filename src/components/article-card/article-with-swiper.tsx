"use client";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArticleCard } from "./article-card";

export const ArticleWithSwiper = ({ articleItems }: { articleItems: any }) => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.3}
      direction="horizontal"
      speed={700}
      breakpoints={{ 1024: { slidesPerView: 5.5, direction: "vertical" } }}
      className=""
    >
      {articleItems.data.map((article) => (
        <SwiperSlide key={article.documentId} className="h-auto!">
          <ArticleCard article={article} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
