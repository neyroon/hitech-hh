import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section } from "@/components/section";
import { fetchAPI } from "@/utils/strapi";
import React from "react";
import { SwiperThumbs } from "./swiper-thumbs";
import { RatingIcon } from "@/components/icons/rating";
import { MinusIcon } from "@/components/icons/minus";
import { PlusIcon } from "@/components/icons/plus";
import { ButtonsBuy } from "./buttons-buy";
import QueryString from "qs";
import { Characters } from "./characters";
import Image from "next/image";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import classNames from "classnames";
import { Description } from "./description";
import { CartProvider } from "@/components/context/cart";
import { formatPrice } from "@/utils/format-price";

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = QueryString.stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      populate: {
        device_types: { populate: "*" },
        category: { populate: "*" },
        images: { populate: "*" },
        characters: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
      skipNulls: true,
    }
  );
  const product = await fetchAPI(`/products?${query}`);
  const characters = [
    { title: "Категория товара:", description: product.data[0].category.name },
    {
      title: "Тип устройства:",
      description: product.data[0].device_types[0].name,
    },
    {
      title: "Ситуация:",
      description: product.data[0].device_types[0]?.situation?.name,
    },
    ...product.data[0].characters.map((character) => ({
      title: character.character,
      description: character.character_value,
    })),
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { text: "Каталог", link: "/catalog" },
          { text: product.data[0].title },
        ]}
      />
      <Section className="pt-[30px] pb-[60px]">
        <div className="flex flex-col lg:flex-row gap-[30px] ">
          <div className="lg:w-[461px] ">
            <SwiperThumbs product={product.data[0]} />
          </div>
          <div className="grow">
            <h1 className="text-[24px] font-semibold mb-[20px]">
              {product.data[0].title}
            </h1>
            <div className="flex items-center justify-between mb-[20px]">
              <div className="flex items-center gap-[8px]">
                <span className="text-[22px] font-medium">
                  {formatPrice(product.data[0].price)}
                </span>
                {product.data[0].price_discount && (
                  <span className="text-[12px] text-grey line-through">
                    {formatPrice(product.data[0].price_discount)}
                  </span>
                )}
              </div>
              <div className="text-[22px] font-medium flex items-center">
                <RatingIcon />
                <span className="text-[16px] text-grey">
                  {product.data[0].rating}
                </span>
              </div>
            </div>
            <ButtonsBuy product={product.data[0]} />
            <Characters characters={characters} />
            <div className="p-[20px] rounded-[8px] bg-bg-grey flex flex-col gap-[20px] mb-[20px]">
              <p className="text-[16px] font-semibold">Где нас купить:</p>
              <div className="flex flex-col lg:flex-row gap-[14px] justify-between items-center">
                <button className="w-full lg:w-[169px] h-[55px] bg-bg-purple rounded-[8px] flex items-center justify-center">
                  <Image
                    src="/wb-logo.png"
                    width={129}
                    height={35}
                    alt="Логотип WB"
                  />
                </button>
                <div className="flex gap-[20px] w-full lg:w-auto items-center">
                  <span className="text-[18px] text-bg-green">
                    {product.data[0].wb_price}
                  </span>
                  <Link
                    href={product.data[0].wb_link}
                    className="bg-white px-[20px] grow py-[8px] rounded-[4px] text-center"
                  >
                    Купить
                  </Link>
                </div>
              </div>
            </div>
            <Description product={product} />
          </div>
          <div className="grow lg:max-w-[246px] flex flex-col gap-[10px]">
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
            <div className="  p-[20px] rounded-[8px] bg-bg-grey flex flex-col gap-[20px]">
              <p className="text-[16px] font-semibold">Дополнение:</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
