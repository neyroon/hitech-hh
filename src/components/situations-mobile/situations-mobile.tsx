"use client";
import { getStrapiMedia } from "@/utils/strapi";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const SituationsMobile = ({ situations }: { situations: any }) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} speed={700} loop>
      {situations.map((situation, i) => (
        <SwiperSlide key={i}>
          <div className="bg-bg-grey rounded-[8px] flex  gap-[10px] p-[10px] lg:p-[20px]">
            <Markdown className="grow text-[12px] lg:text-[14px]">
              {situation.name}
            </Markdown>
            <Image
              src={getStrapiMedia(situation.image.url)}
              alt="Изображение ситуации"
              width={167}
              height={123}
              className="h-[80px] w-[108px] lg:h-[123px] object-contain lg:w-[167px]"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
