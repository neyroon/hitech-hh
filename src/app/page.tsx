import { ArticleWithSwiperHorizontal } from "@/components/article-card";
import { ProductsHits } from "@/components/products-hits";
import { ProductsOfDay } from "@/components/products-of-day";
import { Reviews } from "@/components/reviews";
import { Section } from "@/components/section";
import { SituationsMobile } from "@/components/situations-mobile";
import { fetchFromServer } from "@/utils/fetch";
import { isMobileDevice } from "@/utils/is-mobile";
import { fetchAPI, getStrapiMedia } from "@/utils/strapi";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
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
  const reviews = await fetchFromServer(
    "https://feedbacks-api.wildberries.ru/api/v1/feedbacks",
    {
      isAnswered: true,
      take: 70,
      skip: 0,
    },
    { headers: { Authorization: process.env.NEXT_PUBLIC_WB_TOKEN } }
  );
  const reviewsWithFilter = reviews.data.feedbacks.filter(
    (feedback) => feedback.pros && feedback.cons && feedback.photoLinks
  );
  const situations = await fetchAPI(
    `/situations?populate[device_types][populate]=*&populate[image][populate]=*&populate[category][populate]=*`
  );
  const isMobile = await isMobileDevice();

  return (
    <>
      <Section className="[&>div]:px-0 pt-[20px] pb-[50px] lg:py-[80px] bg-bg-grey">
        <div className="flex flex-col lg:flex-row gap-[20px]">
          <div className="bg-main2 px-[20px] pt-[40px] pb-0 lg:p-[30px] lg:pr-0 lg:min-h-[366px] flex flex-col justify-between gap-[20px] lg:flex-row text-white rounded-[10px] relative w-full lg:w-[calc(61%-10px)]">
            <div className="flex flex-col  gap-[20px]">
              <h1 className="font-semibold text-[24px] lg:text-[32px]">
                Производитель <br /> бытовой техники Hitech
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
              src="/main-banner.png"
              width={409}
              height={264}
              priority
              alt="Гарантия"
              className="w-full h-[248px] mt-[20px] lg:mt-0 relative lg:top-[27px] lg:w-[278px] lg:h-[264px] object-contain  self-center lg:self-auto"
            />
          </div>
          <div className="lg:w-[calc(39%-10px)] p-[30px] bg-white rounded-[10px] relative">
            <h2 className="text-[18px] font-semibold mb-[30px]">Товары дня</h2>
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
                      className="bg-bg-grey rounded-[8px] flex  gap-[10px] p-[10px] lg:p-[20px] hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] transition-shadow duration-300"
                    >
                      <Markdown className="grow text-[12px] lg:text-[14px]">
                        {item.name}
                      </Markdown>
                      <Image
                        src={getStrapiMedia(item.image.url)}
                        alt="Изображение ситуации"
                        width={167}
                        height={123}
                        className="mt-[-20px] h-[80px] w-[108px] lg:h-[123px] object-contain lg:w-[167px]"
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
        <Reviews reviews={reviewsWithFilter} isMobile={isMobile} />
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
