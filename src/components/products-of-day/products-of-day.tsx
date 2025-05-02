"use client";
import { formatPrice } from "@/utils/format-price";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useCart } from "../context/cart";
import { CartProduct } from "../icons/cart-product";
import { LeftIcon } from "../icons/left";
import { RatingIcon } from "../icons/rating";
import { RightIcon } from "../icons/right";

export const ProductsOfDay = ({ productsOfDay }: { productsOfDay: any }) => {
  const swiperRef = useRef<null | SwiperRef>(null);
  const { addToCart } = useCart();

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
        className="hidden text-white xl:flex absolute top-[50%] left-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
        onClick={handleButtonLeftClick}
      >
        <LeftIcon />
      </button>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        speed={700}
        loop
        ref={swiperRef}
      >
        {productsOfDay.map((product) => (
          <SwiperSlide key={product.documentId}>
            <div className="flex gap-[20px] min-h-[288px] lg:min-h-[251px] ">
              <div className="w-[calc(50%-10px)] relative bg-bg-grey rounded-[8px] ">
                <Link href={`/catalog/${product.slug}`}>
                  <Image
                    src={getStrapiMedia(product.image.url)}
                    fill
                    alt="Изображение товара"
                    className="object-contain"
                  />
                </Link>
                {product.is_promotion && (
                  <div className="py-[3px] px-[5px] rounded-[2px] bg-bg-orange text-white absolute top-[10px] right-[10px]">
                    Акция
                  </div>
                )}
                <div className="p-[4px] flex gap-[8px] items-center bg-white absolute bottom-[10px] left-[10px] rounded-[2px]">
                  <RatingIcon />
                  <span className="text-[16px] text-grey">
                    {product.rating}
                  </span>
                </div>
              </div>
              <div className="w-[calc(50%-10px)] flex flex-col justify-between">
                <Link href={`/catalog/${product.slug}`}>
                  <p>{product.title}</p>
                </Link>
                <div className="mt-auto">
                  <button
                    className="p-[12px] mb-[12px] rounded-[4px] bg-bg-red hover:bg-main2 text-white flex gap-[14px] justify-center w-full items-center cursor-pointer transition-colors duration-300"
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                  >
                    <CartProduct />
                    <span className="text-[18px] font-medium">
                      {formatPrice(product.price)}
                    </span>
                  </button>
                  <Link
                    href="/cart"
                    className="p-[12px] text-[18px] rounded-[4px] bg-bg-grey w-full block text-center font-medium hover:bg-bg-red hover:text-white transition-colors duration-300"
                  >
                    Купить сейчас
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        aria-label="Вправо"
        className="hidden text-white xl:flex absolute top-[50%] right-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
        onClick={handleButtonRightClick}
      >
        <RightIcon />
      </button>
    </>
  );
};
