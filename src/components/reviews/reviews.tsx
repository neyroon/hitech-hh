"use client";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { LeftIcon } from "../icons/left";
import { RightIcon } from "../icons/right";
import { Rating } from "../rating";

export const Reviews = ({
  reviews,
  isMobile,
}: {
  reviews: any;
  isMobile: boolean;
}) => {
  const swiperRef = useRef<null | SwiperRef>(null);
  const handleButtonLeftClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleButtonRightClick = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <div className="relative mr-[-20px] lg:mx-0">
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
        breakpoints={{ 1024: { slidesPerView: 3 } }}
        ref={swiperRef}
        className=""
      >
        {reviews.map((feedback) => (
          <SwiperSlide key={feedback.id} className="h-auto!">
            <div className="bg-white p-[10px] lg:px-[20px] lg:py-[30px] rounded-[8px] flex gap-[10px] h-full">
              <Image
                src="/avatar.png"
                height={45}
                width={45}
                alt="Аватар пользователя"
                className="hidden lg:block w-[45px] h-[45px] rounded-[45px] shrink-0"
              />
              <div className="flex flex-col gap-[10px] grow">
                <div className="lg:hidden flex gap-[4px]">
                  <Image
                    src="/avatar.png"
                    height={26}
                    width={26}
                    alt="Аватар пользователя"
                    className="block lg:hidden w-[26px] h-[26px] rounded-[26px] shrink-0"
                  />
                  <div className="flex flex-col">
                    <p className="text-grey text-[10px]">{feedback.userName}</p>
                    <p className="text-[10px] text-grey ">
                      {feedback.createdDate
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </p>
                  </div>
                  <Rating
                    count={feedback.productValuation}
                    className="ml-auto"
                  />
                </div>
                <p className="hidden lg:block text-grey">{feedback.userName}</p>
                <p className="text-[12px] lg:text-[14px]">Достоинства:</p>
                <p className="text-grey text-[12px] lg:text-[14px] line-clamp-3">
                  {feedback.pros}
                </p>
                <p className="text-[12px] lg:text-[14px] mt-auto">
                  Недостатки:
                </p>
                <p className="text-grey text-[12px] lg:text-[14px] line-clamp-3">
                  {feedback.cons}
                </p>
                <div className="flex gap-[10px]">
                  {feedback.photoLinks
                    .slice(0, isMobile ? 2 : 3)
                    .map((link, i) => (
                      <Image
                        key={i}
                        src={link.miniSize}
                        width={136}
                        height={165}
                        alt="Фото отзыва"
                        className="rounded-[8px] w-[136px] h-[165px]"
                      />
                    ))}
                </div>
              </div>
              <div className="shrink-0">
                <Rating
                  count={feedback.productValuation}
                  className="hidden lg:flex!"
                />
                <p className="hidden lg:block text-[12px] text-grey mt-[8px] text-right">
                  {feedback.createdDate
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}
                </p>
              </div>
            </div>
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
    </div>
  );
};
