"use client";
import { useCart } from "@/components/context/cart";
import { LogoIcon } from "@/components/icons/logo";
import { RatingIcon } from "@/components/icons/rating";
import { formatPrice } from "@/utils/format-price";
import { getStrapiMedia } from "@/utils/strapi";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonsBuy } from "./buttons-buy";
import { Characters } from "./characters";
import { Description } from "./description";
import { SwiperThumbs } from "./swiper-thumbs";

export const ProductBlock = ({
  product,
  characters,
  colorFromParams,
}: {
  product: any;
  characters: any;
  colorFromParams?: string | string[];
}) => {
  const { buyNow, addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(() => {
    const el = colorFromParams
      ? product.colors.findIndex((item) => item.color.slug === colorFromParams)
      : null;
    return el !== null ? el : 0;
  });
  const selectedColor = product.colors[selectedColorIndex]?.color?.name;
  const selectedColorSlug = product.colors[selectedColorIndex]?.color?.slug;
  const selectedPrice =
    product.colors[selectedColorIndex]?.price || product.price;
  const selectedPriceDiscount =
    product.colors[selectedColorIndex]?.price_discount ||
    product.price_discount;

  const withSearchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(withSearchParams);
    params.set("color", selectedColorSlug);

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, [selectedColorIndex]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-[30px] ">
        <div className="lg:w-[461px] ">
          <SwiperThumbs
            product={product}
            selectedColorIndex={selectedColorIndex}
          />
        </div>
        <div className="grow">
          <h1 className="text-[24px] font-semibold mb-[20px]">
            {product.title}
          </h1>
          <div className="flex items-center justify-between mb-[20px]">
            <div className="flex items-center gap-[8px]">
              <span className="text-[22px] font-medium">
                {formatPrice(selectedPrice)}
              </span>
              {selectedPriceDiscount && (
                <span className="text-[12px] text-grey line-through">
                  {formatPrice(selectedPriceDiscount)}
                </span>
              )}
            </div>
            <div className="text-[22px] font-medium flex items-center">
              <RatingIcon />
              <span className="text-[16px] text-grey">{product.rating}</span>
            </div>
          </div>
          <ButtonsBuy
            product={product}
            selectedColorIndex={selectedColorIndex}
          />
          <div className="mb-[14px] pb-[8px]">
            {selectedColor && (
              <p className="mb-[10px]">Цвет: {selectedColor}</p>
            )}
            <div className="flex items-center gap-[10px]">
              {product.colors.map((item, i) => (
                <Image
                  src={getStrapiMedia(item.images[0].url)}
                  key={i}
                  width={44}
                  height={63}
                  style={{
                    borderColor:
                      selectedColorIndex === i ? item.color.value : null,
                  }}
                  className={classNames(
                    "w-[44px] h-[63px] border rounded-[8px] cursor-pointer bg-bg-grey object-contain shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)]"
                  )}
                  alt="Изображение цвета"
                  onClick={() => setSelectedColorIndex(i)}
                />
              ))}
            </div>
          </div>
          <Characters characters={characters} />
          <div className="p-[20px] rounded-[8px] bg-bg-grey flex flex-col gap-[20px] mb-[20px]">
            <p className="text-[16px] font-semibold">Где нас купить:</p>
            <div className="flex flex-col lg:flex-row gap-[14px] justify-between items-center">
              <div className="w-full lg:w-[169px] h-[55px] text-main2 bg-white rounded-[8px] flex items-center justify-center">
                <LogoIcon width={144} height={17} />
              </div>
              <div className="flex gap-[20px] w-full lg:w-auto items-center">
                <span className="text-[18px] text-bg-green">
                  {formatPrice(selectedPrice)}
                </span>
                <button
                  className="px-[16px] bg-bg-red text-white grow py-[8px] rounded-[4px] text-center cursor-pointer"
                  onClick={() => {
                    buyNow(product);
                    router.push("/checkout?buyNow=true");
                  }}
                >
                  Купить
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-[14px] justify-between items-center">
              <div className="w-full lg:w-[169px] h-[55px] bg-bg-purple rounded-[8px] flex items-center justify-center">
                <Image
                  src="/wb-logo.png"
                  width={129}
                  height={35}
                  alt="Логотип WB"
                />
              </div>
              <div className="flex gap-[20px] w-full lg:w-auto items-center">
                <span className="text-[18px] text-bg-green">
                  {formatPrice(product.wb_price)}
                </span>
                <Link
                  href={product.wb_link}
                  className="bg-white px-[20px] grow py-[8px] rounded-[4px] text-center"
                >
                  Купить
                </Link>
              </div>
            </div>
          </div>
          <Description product={product} />
        </div>
        <div className="grow lg:max-w-[246px] shrink-0 flex flex-col gap-[10px]">
          <div className="  p-[20px] rounded-[8px] bg-bg-grey flex flex-col gap-[20px]">
            <p className="text-[16px] font-semibold">Способы оплаты:</p>
            <div>
              <p className="mb-[10px]">На сайте</p>
              <ul className="list-disc">
                <li className="ml-[20px]">Банковские карты</li>
                <li className="ml-[20px]">QR кодом</li>
                <li className="ml-[20px]">MIR PAY</li>
              </ul>
            </div>
            <div>
              <p className="mb-[10px]">При получении</p>
              <ul className="list-disc">
                <li className="ml-[20px]">
                  Наличными или картой в пунктах выдачи CDEK, 5Post, Boxberry,
                  Почта России, DPD
                </li>
                <li className="ml-[20px]">
                  Курьеру при доставке (наличными или картой)
                </li>
              </ul>
            </div>
          </div>
          <div className="  p-[20px] rounded-[8px] bg-bg-grey flex flex-col gap-[20px]">
            <p className="text-[16px] font-semibold">Доставка:</p>
            <div>
              <p className="mb-[10px]">Бесплатная доставка</p>
            </div>
            <div>
              <ul className="list-disc">
                <li className="ml-[20px]">
                  Курьером до двери – привезут на дом
                </li>
                <li className="ml-[20px]">
                  В пункте выдачи – можно забрать в CDEK, 5Post, DPD, Boxberry
                  или Почте России.
                </li>
                <li className="ml-[20px]">
                  Экспресс-доставка – для тех, кому нужно срочно
                </li>
              </ul>
            </div>
          </div>
          {(product?.certificates?.[0] || product?.instruction) && (
            <div className="  p-[20px] rounded-[8px] bg-bg-grey flex flex-col gap-[20px]">
              <p className="text-[16px] font-semibold">Дополнение:</p>
              <div className="flex gap-[10px]">
                {product?.certificates?.[0] && (
                  <Link
                    href={getStrapiMedia(product.certificates[0].url)}
                    className="bg-white rounded-[4px] p-[12px] flex flex-col items-center gap-[10px] border border-white hover:border-bg-red transition-colors duration-300 "
                  >
                    <Image
                      src="/cert.png"
                      width={40}
                      height={40}
                      alt="Сертификат"
                      className="w-[40px] h-[40px] "
                    />
                    <p className="text-[12px]">Сертификат</p>
                  </Link>
                )}
                {product?.instruction?.url && (
                  <Link
                    href={getStrapiMedia(product.instruction?.url)}
                    className="bg-white rounded-[4px] p-[12px] flex flex-col items-center gap-[10px] border border-white hover:border-bg-red transition-colors duration-300 "
                  >
                    <Image
                      src="/instruction.png"
                      width={40}
                      height={40}
                      alt="Инструкция"
                      className="w-[40px] h-[40px] "
                    />
                    <p className="text-[12px]">Инструкция</p>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex lg:hidden justify-between fixed bg-white w-full left-0 bottom-[74px] px-[20px] py-[10px] z-[49] border-y border-bg-grey">
        <div className="flex items-center gap-[8px] shrink-0">
          <span className="text-[16px] font-medium">
            {formatPrice(selectedPrice)}
          </span>
          {selectedPriceDiscount && (
            <span className="text-[12px] text-grey line-through">
              {formatPrice(selectedPriceDiscount)}
            </span>
          )}
        </div>
        <button
          className="px-[12px] shrink py-[8px] w-auto rounded-[4px] bg-bg-red transition-colors duration-300 hover:bg-main2 text-white flex gap-[10px] justify-center items-center cursor-pointer"
          onClick={() => {
            addToCart(product, 1, selectedColorIndex);
          }}
        >
          <span className="">В корзину</span>
        </button>
      </div>
    </>
  );
};
