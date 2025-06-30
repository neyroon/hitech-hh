"use client";
import { formatPrice } from "@/utils/format-price";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useCart } from "../context/cart";
import { CartProduct } from "../icons/cart-product";
import { LeftIcon } from "../icons/left";
import { RatingIcon } from "../icons/rating";
import { RightIcon } from "../icons/right";

export const ProductsHits = ({ productsOfDay }: { productsOfDay: any }) => {
  const swiperRef = useRef<null | SwiperRef>(null);
  const { addToCart, buyNow } = useCart();
  const router = useRouter();

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
        className="hidden xl:flex absolute  text-white top-[50%] left-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
        onClick={handleButtonLeftClick}
      >
        <LeftIcon />
      </button>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.2}
        speed={700}
        breakpoints={{ 1024: { slidesPerView: 4.2 } }}
        loop
        ref={swiperRef}
      >
        {productsOfDay.map((product) => (
          <SwiperSlide key={product.documentId} className="h-auto!">
            <div className="flex flex-col gap-[20px] p-[15px] bg-bg-grey h-full rounded-[8px]">
              <div className=" relative bg-bg-grey rounded-[8px] ">
                <Link href={`/catalog/${product.slug}`}>
                  <Image
                    src={getStrapiMedia(product.images[0]?.url)}
                    width={300}
                    height={340}
                    alt="Изображение товара"
                    className="h-[340px] object-contain bg-white rounded-[8px]"
                  />
                </Link>
                {product.is_promotion && (
                  <div className="py-[3px] px-[5px] rounded-[2px] bg-bg-orange text-white absolute top-[10px] right-[10px]">
                    Акция
                  </div>
                )}
                {product.is_hit && (
                  <div className="py-[3px] px-[5px] rounded-[2px] bg-red-like text-white absolute top-[10px] right-[10px]">
                    Хит продаж
                  </div>
                )}
                <div className="p-[4px] flex gap-[8px] items-center bg-white absolute bottom-[10px] left-[10px] rounded-[2px]">
                  <RatingIcon />
                  <span className="text-[16px] text-grey">
                    {product.rating}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between h-full">
                <Link href={`/catalog/${product.slug}`}>
                  <p className="mb-[14px]">{product.title}</p>
                </Link>
                <div>
                  <button
                    className="p-[12px] mb-[12px] rounded-[4px] bg-main2 transition-colors duration-300 hover:bg-bg-red text-white flex gap-[14px] justify-center w-full items-center cursor-pointer"
                    onClick={() => addToCart(product, 1)}
                  >
                    <CartProduct />
                    <span className="text-[18px] font-medium">
                      {formatPrice(product.price)}
                    </span>
                  </button>
                  <button
                    className="p-[12px] rounded-[4px] bg-bg-grey hover:bg-bg-red hover:text-white transition-colors duration-300 w-full block text-center text-[18px] font-medium cursor-pointer"
                    onClick={() => {
                      buyNow(product);
                      router.push("/checkout?buyNow=true");
                    }}
                  >
                    Купить сейчас
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        aria-label="Вправо"
        className="hidden xl:flex absolute text-white top-[50%] right-0 w-[31px] h-[31px] justify-center items-center translate-y-[-50%] z-10 rounded-full bg-black opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
        onClick={handleButtonRightClick}
      >
        <RightIcon />
      </button>
    </>
  );
};
