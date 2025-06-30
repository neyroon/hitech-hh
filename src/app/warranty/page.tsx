import { Breadcrumbs } from "@/components/breadcrumbs";
import { TgFormIcon } from "@/components/icons/tg-form";
import { Section } from "@/components/section";
import { isMobileDevice } from "@/utils/is-mobile";
import Image from "next/image";
import Link from "next/link";
import { Form } from "./form";

export default async function Warranty() {
  const isMobile = await isMobileDevice();
  return (
    <>
      <Breadcrumbs items={[{ text: "Условия гарантии" }]} />
      <Section className="pt-[30px] pb-[60px] bg-bg-grey">
        <div className="gradient-blue-2   lg:px-[60px] relative overflow-hidden flex flex-col gap-[20px] lg:flex-row text-white rounded-[10px]">
          <div className="flex flex-col gap-[20px] px-[10px] pt-[40px] lg:px-0 lg:py-[60px] lg:max-w-[681px]">
            <h1 className="font-semibold text-[22px] lg:text-[24px]">
              Ваша техника под защитой
            </h1>
            <p className="text-[16px]">
              Мы продаём только сертифицированные товары и предоставляем
              <b> официальную расширенную гарантию </b>сроком от 3 до 5 лет — в
              зависимости от модели.
            </p>
            <p className="text-[18px] font-medium">
              Гарантийное обслуживание включает:
            </p>
            <ul className="list-disc text-[18px]">
              <li className="ml-[20px]">
                Проверку и диагностику неисправностей
              </li>
              <li className="ml-[20px]">
                Ремонт или замену товара и комплектующих
              </li>
              <li className="ml-[20px]">
                Консультации по правильному использованию техники, если
                неисправность связана с условиями эксплуатации
              </li>
            </ul>
            <div className="p-[10px] lg:p-[30px] bg-white rounded-[10px] lg:w-[612px]">
              <p className="text-bg-red font-semibold text-[18px] mb-[20px]">
                ОБРАТИТЕ ВНИМАНИЕ
              </p>
              <p className="text-black text-[18px]">
                Гарантия не распространяется на:
              </p>
              <ul className="text-black list-disc text-[18px]">
                <li className="ml-[20px]">Механические повреждения</li>
                <li className="ml-[20px]">Следы попадания влаги</li>
                <li className="ml-[20px]">Естественный износ</li>
                <li className="ml-[20px]">
                  Косметические дефекты, не влияющие на работу устройства
                </li>
              </ul>
            </div>
          </div>
          <Image
            src={isMobile ? "/warranty-mobile.png" : "/warranty.png"}
            width={397}
            height={533}
            alt="Гарантия"
            className=" w-[491px] lg:w-[607px] h-auto  lg:absolute right-[-125px] lg:right-[-115px] xl:right-[0] self-end  lg:mx-auto mt-[-70px] lg:top-auto lg:bottom-[-65px] lg:h-[687px] grow  lg:self-auto object-cover lg:object-contain"
          />
        </div>
      </Section>
      <Section className="py-[50px] lg:py-[100px] ">
        <div className="flex flex-col lg:flex-row items-center">
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
              Что делать, если что-то пошло не так?
            </h2>
            <ul className="list-decimal">
              <li className="ml-[25px]">
                Заполните форму ниже — расскажите, что случилось
              </li>
              <li className="ml-[25px]">Приложите чек и фотографии товара</li>
              <li className="ml-[25px]">
                Мы свяжемся с вами и подскажем, как будет организован ремонт или
                обмен
              </li>
            </ul>
            <Form />
          </div>
          <Image
            src="/form.png"
            width={429}
            height={453}
            alt="Форма"
            className="w-[248px] lg:ml-[83px] h-[262px] mt-[23px] lg:mt-0 lg:w-[429px] lg:h-[453px] self-center lg:self-auto object-contain"
          />
        </div>
      </Section>
    </>
  );
}
