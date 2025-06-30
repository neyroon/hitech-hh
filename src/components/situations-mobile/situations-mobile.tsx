"use client";
import { getStrapiMedia } from "@/utils/strapi";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export const SituationsMobile = ({ situations }: { situations: any }) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} speed={700} loop>
      {situations.map((situation, i) => (
        <SwiperSlide key={i}>
          <Link
            href={`/catalog?category=${situation.category.slug}`}
            className="gradient-blue relative min-h-[80px] rounded-[8px] flex  gap-[10px] p-[10px] lg:p-[20px]"
          >
            <Markdown className="grow text-[14px] z-10 [&_p_strong]:font-bold  text-white">
              {situation.name}
            </Markdown>
            <Image
              src={getStrapiMedia(situation.image.url)}
              alt="Изображение ситуации"
              fill
              className="h-[80px] w-[108px] lg:h-[123px] lg:w-[167px] object-cover"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
