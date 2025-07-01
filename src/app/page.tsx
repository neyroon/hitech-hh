import { ArticleWithSwiperHorizontal } from "@/components/article-card";
import { ProductsHits } from "@/components/products-hits";
import { ProductsOfDay } from "@/components/products-of-day";
import { ReviewsFallback } from "@/components/reviews/skeleton";
import { ReviewsSuspense } from "@/components/reviews/suspense";
import { Section } from "@/components/section";
import { SituationsMobile } from "@/components/situations-mobile";
import { isMobileDevice } from "@/utils/is-mobile";
import { fetchAPI, getStrapiMedia } from "@/utils/strapi";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import "swiper/css";

export default async function Home() {
  const itemsCount = 10;

  const productsOfDay = await fetchAPI(
    `/products-day?populate[products][populate]=*`
  );
  const productHits = await fetchAPI(
    `/products?filters\[is_hit\][$eq]=true&populate=*&pagination[page]=1&pagination[pageSize]=${itemsCount}`
  );
  const articleItems = await fetchAPI(
    `/articles?populate=*&sort=updatedAt:desc&&pagination[page]=1&pagination[pageSize]=${itemsCount}`
  );

  const situations = await fetchAPI(
    `/situations?populate[device_types][populate]=*&populate[image][populate]=*&populate[category][populate]=*`
  );
  const isMobile = await isMobileDevice();

  return (
    <>
      <Section className="[&>div]:px-0 pt-[20px] pb-[50px] lg:py-[80px] bg-bg-grey">
        <div className="flex flex-col lg:flex-row gap-[20px]">
          <div className="bg-main2 gradient-blue-mobile lg:min-h-[366px] flex flex-col justify-between gap-[20px] lg:flex-row text-white rounded-[10px] relative w-full lg:w-[calc(61%-10px)]">
            <div className="flex flex-col  gap-[20px] px-[20px] pt-[40px] pb-0 lg:p-[30px] lg:pr-0">
              <h1 className="font-semibold text-[24px] lg:text-[32px]">
                Производитель <br /> бытовой техники HITECH
              </h1>
              <p className="text-[16px] mb-[30px]">
                Выберите бытовую технику <br />
                для вашего дома и бизнеса
              </p>

              <Link
                href="/catalog"
                className="bg-white self-center lg:self-auto flex justify-center items-center w-full lg:w-[230px] h-[45px] rounded-[4px] hover:bg-bg-red hover:text-white text-black text-[18px] font-medium transition-colors duration-300"
              >
                Перейти в каталог
              </Link>
            </div>
            <Image
              src={isMobile ? "/main-banner-mobile.png" : "/main-banner.png"}
              width={409}
              height={336}
              priority
              alt="изображение"
              className="w-full h-auto mt-[-20px] lg:mt-0 relative lg:absolute lg:right-0 lg:bottom-0  lg:w-[409px] lg:h-[336px] object-cover  self-center lg:self-auto"
            />
          </div>
          <div className="lg:w-[calc(39%-10px)] p-[30px] bg-white rounded-[10px] relative">
            <h2 className="text-[18px] font-semibold mb-[30px]">Новинки</h2>
            <ProductsOfDay productsOfDay={productsOfDay.data.products} />
          </div>
        </div>
      </Section>
      <Section className=" py-[50px] lg:py-[80px] ">
        <div className="flex gap-[10px] justify-between items-center mb-[50px]">
          <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold ">
            Хиты продаж
          </h2>
          <Link
            href="/catalog"
            className="text-grey border-b-[1px] border-dashed border-grey hover:text-main2   transition-colors duration-300"
          >
            Смотреть все
          </Link>
        </div>
        <div className="relative mr-[-20px] lg:mr-0">
          <ProductsHits productsOfDay={productHits.data} />
        </div>
      </Section>
      <Section className=" py-[50px] lg:py-[80px] ">
        <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold mb-[50px]">
          Ситуации и решения
        </h2>
        <div className="lg:grid grid-cols-3 gap-[10px] mr-[-20px] lg:mr-0">
          <>
            {isMobile ? (
              <SituationsMobile situations={situations.data} />
            ) : (
              <>
                {situations.data.map((item, i) => {
                  return (
                    <Link
                      key={item.documentId}
                      href={`/catalog?category=${
                        item.category.slug
                      }${item.device_types
                        .map((item) => `&deviceTypes=${item.slug}`)
                        .join("")}`}
                      className="gradient-blue relative overflow-hidden rounded-[8px] flex  gap-[10px] min-h-[143px] p-[10px] lg:p-[20px] hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] transition-shadow duration-300"
                    >
                      <Markdown className="grow  z-10 [&_p_strong]:font-bold lg:text-[14px] text-white">
                        {item.name}
                      </Markdown>
                      <Image
                        src={getStrapiMedia(item.image.url)}
                        alt="Изображение ситуации"
                        fill
                        className=" h-[80px] w-[108px] lg:h-[123px] object-contain lg:w-[167px]"
                      />
                    </Link>
                  );
                })}
              </>
            )}
          </>
        </div>
      </Section>
      <Section className="py-[50px] lg:py-[80px] bg-bg-grey ">
        <div className="flex flex-wrap items-center gap-[10px] lg:gap-[20px] mb-[50px]">
          <h2 className="text-[24px] font-semibold">Отзывы покупателей</h2>
          <div className="text-white bg-bg-purple py-[8px] px-[12px] rounded-[3px]">
            Wildberries
          </div>
        </div>
        <Suspense fallback={<ReviewsFallback isMobile={isMobile} />}>
          <ReviewsSuspense />
        </Suspense>
      </Section>
      <Section className=" py-[50px] lg:py-[80px] ">
        <div className="flex flex-col lg:flex-row gap-[10px] justify-between lg:items-center mb-[50px]">
          <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold ">
            Полезный материал
          </h2>
          <Link
            href="/articles"
            className="text-grey border-b-[1px] self-start border-dashed border-grey hover:text-main2   transition-colors duration-300"
          >
            Смотреть все
          </Link>
        </div>
        <div className="relative mr-[-20px] lg:mr-0">
          <ArticleWithSwiperHorizontal articleItems={articleItems} />
        </div>
      </Section>
    </>
  );
}
