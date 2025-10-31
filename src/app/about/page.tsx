import { Breadcrumbs } from "@/components/breadcrumbs";
import { TgFooterIcon } from "@/components/icons/tg-footer";
import { TTIcon } from "@/components/icons/tt";
import { VkFooterIcon } from "@/components/icons/vk-footer";
import { WhatsappFooterIcon } from "@/components/icons/whatsapp-footer";
import { YoutubeFooterIcon } from "@/components/icons/youtube-footer";
import { Partners } from "@/components/partners";
import { Section } from "@/components/section";
import { isMobileDevice } from "@/utils/is-mobile";
import Image from "next/image";
import Link from "next/link";

export default async function About() {
  const cardItems = [
    {
      title: "Как все начиналось",
      description: (
        <>
          История HITECH (изначально SAFERET) началась почти 10 лет назад.
          Основатели бренда, Артем и Юля, арендовали небольшой офис площадью 10
          квадратных метров. Первыми товарами стали автомобильные пылесосы —
          всего 50 штук. Этот скромный старт стал основой для бурного роста
          компании. Чтобы продолжить развитие и расширить ассортимент, Артем не
          побоялся сделать смелый шаг — продал свой автомобиль и вложил все
          средства в будущее бренда.
        </>
      ),
    },
    {
      title: "Рост и развитие",
      description: (
        <>
          Автомобильные пылесосы быстро завоевали популярность и позволили
          HITECH занять лидирующие позиции в своей категории. Однако со временем
          конкуренция обострилась: на рынке были игроки, желающие вытеснить
          перспективного новичка. Вместо борьбы демпингом Артем и Юля приняли
          стратегическое решение — сменить вектор развития и сфокусироваться на
          инновационных продуктах, которых еще не было на рынке. Так появились
          флагманские модели: вертикальные сенсорные пылесосы с 8 режимами
          работы и аккумулятором на 60 минут, моющие пылесосы для мебели и
          полов, а также другие передовые устройства. Это позволило не просто
          удержаться бренду на рынке, но и выйти в новые ниши.
        </>
      ),
    },
    {
      title: "Философия бренда",
      description: (
        <>
          <p>
            Артем и Юля выбирают лучшие идеи в сфере бытовой техники, адаптируют
            их под запросы рынка и предлагают покупателям стильные, удобные и
            функциональные устройства.
          </p>
          <br />
          <p>Основные принципы:</p>
          <ul className="list-disc ml-[20px]">
            <li>Качественная техника по доступным ценам.</li>
            <li>Современный минималистичный дизайн. </li>
            <li>Простота использования и надежность.</li>
            <li>Быстрая доставка через маркетплейсы и собственный сайт.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Маскот бренда — Хайтеша",
      description: (
        <>
          <p>
            Наш цифровой помощник — это обаятельный и умный робот Хайтеша. Он
            обожает наводить порядок, тестировать новые рецепты и делиться
            лайфхаками, как упростить быт с помощью техники. Хайтеша говорит
            просто о сложном, помогает лучше понимать возможности устройств и
            делает общение с брендом живым и дружелюбным.
          </p>
        </>
      ),
    },
    {
      title: "Будущее и цели",
      description: (
        <>
          <p>
            HITECH активно развивается и строит планы на будущее. В ближайшее
            время планируется:
          </p>
          <br />
          <ul className="list-disc ml-[15px]">
            <li>
              Открытие флагманских магазинов, где клиенты смогут протестировать
              технику.
            </li>
            <li>Расширение ассортимента новыми инновационными продуктами.</li>
            <li>
              Поддержка собственного сайта и активное продвижение в соцсетях.
            </li>
            <li>Укрепление позиций на рынке и выход в новые регионы России.</li>
          </ul>
          <br />
          <p>
            Мы уверены, что процессы уборки и приготовления еду могут быть
            легкими и приятными. HITECH делает технологии доступными, а
            повседневные заботы — проще!
          </p>
        </>
      ),
    },
  ];

  const isMobile = await isMobileDevice();

  return (
    <>
      <Breadcrumbs items={[{ text: "О компании" }]} />
      <Section className="pt-[30px] pb-[50px] bg-bg-grey">
        <div className="gradient-blue-2 overflow-hidden relative px-[20px] lg:px-[60px] flex flex-col justify-between gap-[20px] lg:flex-row text-white rounded-[10px]">
          <div className="flex flex-col gap-[20px] pt-[50px] pb-[10px] lg:py-[60px] lg:max-w-[632px]">
            <h1 className="font-medium lg:font-semibold text-[22px] lg:text-[24px]">
              О компании
            </h1>
            <p className="text-[18px] lg:text-[22px] font-medium ">
              Техника, на которую не надо работать — она работает на вас.
            </p>
            <p className="text-[16px] ">
              HITECH — это история о том, как из крошечного офиса вырос бренд,
              который сегодня помогает тысячам людей делать уборку и готовку
              проще. Мы создаём технику, которая сочетает в себе передовые
              технологии, стиль и доступность — чтобы каждый мог позволить себе
              комфортный быт.
            </p>
            <Link
              href="/catalog"
              className="bg-white flex justify-center items-center lg:w-[264px] h-[45px] rounded-[4px] text-black text-[18px] font-medium hover:bg-bg-red hover:text-white transition-colors duration-300"
            >
              Перейти в каталог
            </Link>
          </div>
          <Image
            src={isMobile ? "/about-mobile.png" : "/about.png"}
            width={800}
            height={557}
            alt="Изображение"
            className=" self-center mt-[-50%] lg:mt-0 lg:absolute bottom-0 lg:right-[-200px] xl:right-0 lg:self-auto"
          />
        </div>
      </Section>
      <Section className="py-[50px] bg-bg-grey">
        <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold mb-[20px]">
          История компании
        </h2>
        <p className="text-[12px] lg:text-[18px] mb-[40px]">
          HITECH — это стремительно развивающийся российский бренд бытовой
          техники, который завоевал доверие и любовь клиентов благодаря своему
          качеству за разумную стоимость.
        </p>
        <div className="flex flex-col lg:flex-row gap-[40px]">
          <div className="flex flex-col gap-[20px]">
            {cardItems.map((item) => (
              <div
                key={item.title}
                className="px-[20px] py-[30px] rounded-[10px] bg-white"
              >
                <p className="mb-[20px] text-[18px] font-semibold">
                  {item.title}
                </p>
                <div className="text-[16px]">{item.description}</div>
              </div>
            ))}
          </div>
          <div className="p-[20px] lg:py-0 rounded-[10px] bg-bg-grey">
            <div className="lg:sticky lg:top-[103px] lg:pt-[20px]">
              <p className="text-[18px] font-semibold mb-[20px]">Наша миссия</p>
              <p className="text-[18px]">
                Мы стремимся к тому, чтобы каждая семья могла позволить себе
                качественную и инновационную бытовую технику. <br /> Мы создаём
                решения, которые экономят время, силы и делают быт легче.
              </p>
            </div>
          </div>
        </div>
      </Section>
      {/* <Section className="py-[50px] lg:py-[100px] bg-bg-grey">
        <div className="flex flex-wrap items-center gap-[10px] lg:gap-[20px] mb-[50px]">
          <h2 className="text-[24px] font-semibold">Отзывы покупателей</h2>
          <div className="text-white bg-bg-purple py-[8px] px-[12px] rounded-[3px]">
            Wildberries
          </div>
        </div>
        <Suspense fallback={<ReviewsFallback isMobile={isMobile} />}>
          <ReviewsSuspense />
        </Suspense>
      </Section> */}
      <Section className="py-[50px] lg:py-[100px] bg-bg-grey">
        <h2 className="text-[24px] font-semibold mb-[50px]">
          Наши официальные партнеры
        </h2>
        <Partners />
      </Section>
      <Section className="py-[50px] lg:py-[100px] ">
        <div className="flex flex-col lg:flex-row gap-[40px] justify-between">
          <div>
            <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold mb-[40px]">
              Контакты
            </h2>
            <p className="text-[18px] mb-[20px]">
              Адрес: Санкт-Петербург, Обводный канал 199-201
            </p>
            <p className="text-[18px] mb-[20px]">Пн-Вс с 9:00 до 21:00</p>

            <Link
              href="mailto:hitech.comp@mail.ru"
              className="text-[18px]  mb-[40px] underline"
            >
              hitech.comp@mail.ru
            </Link>
            <div className="flex mt-[20px] items-center gap-[10px]">
              <Link href="https://t.me/HH_HITECH">
                <TgFooterIcon />
              </Link>
              <Link href="https://wa.me/79811895734">
                <WhatsappFooterIcon />
              </Link>
              <Link href="https://vk.com/hitech_hh">
                <VkFooterIcon />
              </Link>
              <Link href="https://gclnk.com/ZkM4pMWG">
                <TTIcon />
              </Link>
              <Link href="https://gclnk.com/jctxufUT">
                <YoutubeFooterIcon />
              </Link>
            </div>
          </div>

          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2ee97a497c5220a13fe34ae8e3f3b559a3ebfb31922e7ca238854d6e95a6a7e9&amp;source=constructor"
            width="100%"
            height="272"
            loading="lazy"
            className="lg:w-[710px] rounded-[8px]"
            frameBorder="0"
          ></iframe>
        </div>
      </Section>
    </>
  );
}
