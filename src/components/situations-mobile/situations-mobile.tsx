"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const SituationsMobile = ({ situations }: { situations: any }) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} speed={700} loop>
      {situations.map((situation, i) => (
        <SwiperSlide key={i}>
          <div className="bg-bg-grey rounded-[8px] flex  gap-[10px] p-[10px] lg:p-[20px]">
            <p className="grow text-[12px] lg:text-[14px]">{situation.text}</p>
            <Image
              src={situation.imageLink}
              alt="Изображение ситуации"
              width={167}
              height={123}
              className="mt-[-20px] h-[80px] w-[108px] lg:h-[123px] object-contain lg:w-[167px]"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
