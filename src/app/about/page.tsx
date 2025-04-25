import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function About() {
  const cardItems = [
    {
      title: "Как всё началось: решение, которого не было",
      description: (
        <>
          В 1995 году инженер и автолюбитель{" "}
          <span className="font-semibold">Марк Шульц</span> столкнулся с
          проблемой — поддерживать чистоту в машине было неудобно. Обычные
          пылесосы были громоздкими, слабомощными или требовали розетки. Тогда
          он решил создать{" "}
          <span className="font-semibold">
            компактный, но мощный автомобильный пылесос
          </span>
          , который работал от прикуривателя. Это устройство стало настоящим
          <span className="font-semibold">хитом</span>, и так родился бренд{" "}
          <span className="font-semibold">HiTech</span>.
        </>
      ),
    },
    {
      title: "Из авто в дом: технологии, которые завоевали доверие",
      description: (
        <>
          После успеха автомобильных моделей{" "}
          <span className="font-semibold">в 2000 году</span> HiTech расширил
          линейку и выпустил{" "}
          <span className="font-semibold">пылесосы для дома</span>. Их ключевой
          особенностью стали <span className="font-semibold">HEPA-фильтры</span>
          , задерживающие 99,9% пыли и аллергенов. Это сделало технику
          незаменимой для семей и людей с аллергией.
        </>
      ),
    },
    {
      title: "Прорыв: робот-пылесос, который изменил уборку",
      description: (
        <>
          В <span className="font-semibold">2005 году</span>HiTech представил
          первый <span className="font-semibold">робот-пылесос</span>. Он не
          просто убирал автоматически, а{" "}
          <span className="font-semibold">запоминал планировку</span>,
          оптимизировал маршрут и подстраивался под покрытия. Это стало
          революцией в уборке.
        </>
      ),
    },
    {
      title: "Больше, чем уборка: расширение ассортимента",
      description: (
        <>
          <span className="font-semibold">2010</span> – запуск{" "}
          <span className="font-semibold">кофемашин</span> с точной настройкой
          крепости и температуры. <br />
          <span className="font-semibold">
            2015 – пылесосы с влажной уборкой
          </span>
          , которые одновременно собирали пыль и мыли пол. <br />
          <span className="font-semibold">
            2018 – пылесосы для химчистки мебели
          </span>
          , справляющиеся с любыми загрязнениями
        </>
      ),
    },
    {
      title: "HiTech сегодня: инновации без границ",
      description: (
        <>
          К <span className="font-semibold">2025</span> году HiTech стал одним
          из <span className="font-semibold">лидеров рынка Европы и Азии</span>.
          Компания делает ставку на{" "}
          <span className="font-semibold">
            экологичность, энергоэффективность и умные технологии
          </span>
          . Последний прорыв –{" "}
          <span className="font-semibold">&quot;умная кухня&quot;</span>, где
          вся техника объединена в единую экосистему и управляется голосом или
          приложением.
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ text: "О компании" }]} />
      <Section className="pt-[30px] pb-[50px] bg-bg-grey">
        <div className="bg-main2 px-[20px] lg:px-[60px] flex flex-col justify-between gap-[20px] lg:flex-row text-white rounded-[10px]">
          <div className="flex flex-col gap-[20px] pt-[50px] pb-[10px] lg:py-[60px] lg:max-w-[632px]">
            <h1 className="font-medium lg:font-semibold text-[22px] lg:text-[24px]">
              О компании
            </h1>
            <p className="text-[18px] lg:text-[22px] font-medium ">
              HiTech — техника, которая освобождает ваше время
            </p>
            <p className="text-[16px] ">
              Мы производим умную бытовую технику для дома и бизнеса: пылесосы,
              отпариватели, кофемашины, аэрогрили и многое другое. HiTech берет
              рутину на себя, чтобы у вас было больше времени на важное.
            </p>
            <Link
              href="/catalog"
              className="bg-white flex justify-center items-center lg:w-[264px] h-[45px] rounded-[4px] text-black text-[18px] font-medium"
            >
              Перейти в каталог
            </Link>
          </div>
          <Image
            src="/about.png"
            width={399}
            height={358}
            alt="Гарантия"
            className="w-[335px] h-[300px] lg:w-[399px] lg:h-[358px] object-cover  self-center lg:self-auto"
          />
        </div>
      </Section>
      <Section className="py-[50px] bg-bg-grey">
        <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold mb-[20px]">
          История компании
        </h2>
        <p className="text-[12px] lg:text-[18px] mb-[40px]">
          История бренда HiTech: как идея одного человека изменила миллионы
          домов
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
                <p className="text-[16px]">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="p-[20px] lg:py-0 rounded-[10px] bg-bg-grey">
            <div className="lg:sticky lg:top-0 lg:pt-[20px]">
              <p className="text-[18px] font-semibold mb-[20px]">Наша миссия</p>
              <p className="text-[18px]">
                Мы создаём технику,{" "}
                <span className="font-semibold">
                  которая освобождает вас от рутины и даёт больше свободы для
                  жизни
                </span>
                . С HiTech вы забываете о сложностях быта и делаете только то,
                что приносит удовольствие.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section className="py-[50px] ">
        <div className="flex flex-col lg:flex-row gap-[40px] justify-between">
          <div>
            <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold mb-[40px]">
              Контакты
            </h2>
            <p className="text-[18px] mb-[20px]">Адрес: г. Москва </p>
            <p className="text-[18px] mb-[20px]">+7 000 000-00-00</p>
            <p className="text-[18px] mb-[40px]">вт-вс 11:00-20:00</p>
            <Link
              href="/"
              className="bg-bg-red flex justify-center items-center w-[213px] h-[45px] rounded-[4px] text-white text-[18px] font-medium"
            >
              Связаться
            </Link>
          </div>

          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2ee97a497c5220a13fe34ae8e3f3b559a3ebfb31922e7ca238854d6e95a6a7e9&amp;source=constructor"
            width="100%"
            height="272"
            loading="lazy"
            className="lg:w-[710px]"
            frameBorder="0"
          ></iframe>
        </div>
      </Section>
    </>
  );
}
