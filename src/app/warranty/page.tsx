import { Breadcrumbs } from "@/components/breadcrumbs";
import { TgFormIcon } from "@/components/icons/tg-form";
import { UploadIcon } from "@/components/icons/upload";
import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

export default function Warranty() {
  return (
    <>
      <Breadcrumbs items={[{ text: "Гарантия и сервисные центры" }]} />
      <Section className="pt-[30px] pb-[60px] bg-bg-grey">
        <div className="bg-main2 px-[10px]  lg:px-[60px] flex flex-col gap-[20px] lg:flex-row text-white rounded-[10px]">
          <div className="flex flex-col gap-[20px] pt-[40px]  lg:py-[60px] lg:max-w-[681px]">
            <h1 className="font-semibold text-[22px] lg:text-[24px]">
              Гарантия и сервисные центры
            </h1>
            <p className="text-[16px]">
              Мы продаем только сертифицированную технику и предоставляем
              официальную гарантию от 3 до 5 лет в зависимости от модели
            </p>
            <p className="text-[18px]">Гарантийное обслуживание включает:</p>
            <ul className="list-disc text-[18px]">
              <li className="ml-[20px]">Замена товара и комплектующих</li>
              <li className="ml-[20px]">
                Проверка и диагностика неисправностей
              </li>
            </ul>
            <div className="p-[10px] lg:p-[30px] bg-white rounded-[10px] lg:w-[612px]">
              <p className="text-bg-red font-semibold text-[18px] mb-[20px]">
                Предупреждение: Важно!
              </p>
              <p className="text-black text-[18px]">
                Гарантия не распространяется на механические повреждения,
                попадание влаги, естественный износ или косметический дефект
              </p>
            </div>
          </div>
          <Image
            src="/warranty.png"
            width={397}
            height={533}
            alt="Гарантия"
            className=" w-[315px] lg:w-[397px] h-[470px] lg:h-[533px] grow self-center lg:self-auto object-contain"
          />
        </div>
      </Section>
      <Section className="py-[50px] lg:py-[100px] ">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="px-[10px] py-[20px] lg:p-[30px] flex flex-col gap-[20px] lg:max-w-[674px]">
            <Link
              href="https://t.me/hitech_hh_bot"
              className="flex gap-[10px] items-center self-start bg-tg-form px-[15px] py-[10px] rounded-[4px]"
            >
              <TgFormIcon />
              <span className="text-white text-[14px]">
                Воспользоваться telegram-ботом
              </span>
            </Link>
            <h2 className="text-[24px] lg:text-[24px] font-medium lg:font-semibold">
              Как воспользоваться гарантией?
            </h2>
            <ul className="list-disc">
              <li className="ml-[25px]">Свяжитесь с нашей поддержкой</li>
              <li className="ml-[25px]">
                Опишите проблему, предоставьте чек и фото товара
              </li>
              <li className="ml-[25px]">
                Дождитесь инструкций по ремонту или обмен
              </li>
            </ul>
            <form className="flex flex-col gap-[20px]">
              <input
                type="text"
                placeholder="Ваше имя"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
              <input
                type="tel"
                placeholder="Ваш номер телефона"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
              <input
                type="text"
                placeholder="Опишите проблему"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
            </form>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[20px]">
              <div className="flex items-center gap-[8px] p-[10px] rounded-[6px] bg-bg-grey">
                <UploadIcon />
                <span>Прикрепить изображение</span>
              </div>
              <div className="flex items-center gap-[8px] p-[10px] rounded-[6px] bg-bg-grey">
                <UploadIcon />
                <span>Прикрепить чек</span>
              </div>
            </div>
            <Link
              href="/"
              className="bg-bg-red flex justify-center items-center lg:w-[213px] h-[45px] rounded-[4px] text-white text-[18px] font-medium"
            >
              Связаться
            </Link>
          </div>
          <Image
            src="/form.png"
            width={500}
            height={500}
            alt="Форма"
            className="w-[315px] h-[315px] lg:w-[500px] lg:h-[500px] self-center lg:self-auto object-contain"
          />
        </div>
      </Section>
    </>
  );
}
