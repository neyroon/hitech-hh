import { Breadcrumbs } from "@/components/breadcrumbs";
import { PayReceiptIcon } from "@/components/icons/pay-receipt";
import { PaySiteIcon } from "@/components/icons/pay-site";
import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

export default function Delivery() {
  const cardItems = [
    {
      title: (
        <>
          Клиент <br />
          оформляет заказ
        </>
      ),
      description: "Выбирает товар и удобный способ доставки прямо на сайте",
    },
    {
      title: "Мы передаём посылку в службу доставки",
      description:
        "Отвозим в пункт выдачи CDEK, Почты России, 5Post, DPD, Boxberry или вызываем курьера",
    },
    {
      title: "Клиент получает заказ удобным способом",
      description: [
        "Курьером до двери – привезут на дом",
        "В пункте выдачи – можно забрать в CDEK, 5Post, DPD, Boxberry или Почте России.",
        "Экспресс-доставка – для тех, кому нужно срочно",
      ],
    },
  ];

  const payItems = [
    {
      title: "На сайте",
      description: ["Банковские карты", "QR кодом", "MIR PAY"],
      icon: <PaySiteIcon />,
    },
    {
      title: "При получении",
      description: [
        "Наличными или картой в пунктах выдачи CDEK, 5Post, Boxberry, Почта России, DPD",
        "Курьеру при доставке (наличными или картой)",
      ],
      icon: <PayReceiptIcon />,
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ text: "Доставка и оплата" }]} />
      <Section className="pt-[30px] pb-[50px] lg:py-[50px] bg-bg-grey">
        <div className="bg-main2 px-[20px] lg:px-[60px] flex flex-col justify-between gap-[20px] lg:flex-row text-white rounded-[10px]">
          <div className="flex flex-col gap-[20px] pt-[60px] pb-[20px] lg:py-[60px] lg:max-w-[681px]">
            <h1 className="font-medium lg:font-semibold text-[22px] lg:text-[32px]">
              Доставка и оплата
            </h1>
            <p className="text-[16px] mb-[20px]">Способы доставки и оплаты</p>
            <Link
              href="/catalog"
              className="bg-white flex justify-center items-center lg:w-[264px] h-[45px] rounded-[4px] text-black text-[18px] font-medium hover:bg-bg-red hover:text-white transition-colors duration-300"
            >
              Перейти в каталог
            </Link>
          </div>
          <Image
            src="/delivery.png"
            width={464}
            height={292}
            alt="Доставка"
            className="w-[295px] h-[175px] lg:w-[464px] lg:h-[292px] object-cover lg:mr-[97px]  self-center lg:self-auto"
          />
        </div>
      </Section>
      <Section className="py-[50px] lg:py-[60px] bg-bg-grey">
        <h2 className="text-[24px] font-semibold mb-[40px]">
          Как работает доставка
        </h2>
        <div className="flex gap-[10px] flex-col lg:flex-row">
          {cardItems.map((item) => (
            <div
              key={item.title}
              className="p-[20px] rounded-[10px] bg-white w-full lg:h-[285px] flex flex-col  hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] transition-shadow duration-300"
            >
              <p className="text-[18px] font-semibold mb-[10px]">
                {item.title}
              </p>
              {Array.isArray(item.description) ? (
                <ul className="list-disc">
                  {item.description.map((desc) => (
                    <li key={desc} className="ml-[15px] lg:ml-[20px]">
                      {desc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{item.description}</p>
              )}

              <Link
                href="/catalog"
                className="text-[16px] text-grey mt-[30px] lg:mt-auto border-b-[1px] border-dashed border-grey self-start hover:text-main2   transition-colors duration-300"
              >
                Перейти в каталог
              </Link>
            </div>
          ))}
        </div>
      </Section>
      <Section className="py-[50px] lg:py-[60px] bg-bg-grey">
        <h2 className="text-[24px] font-semibold mb-[40px]">Способ оплаты</h2>
        <div className="flex gap-[10px] flex-col lg:flex-row ">
          {payItems.map((item) => (
            <div
              key={item.title}
              className="p-[10px] lg:p-[20px] rounded-[10px] bg-white w-full  flex flex-row lg:gap-[40px] justify-between hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] transition-shadow duration-300"
            >
              <div>
                <p className="text-[16px] lg:text-[18px] font-medium lg:font-semibold mb-[10px]">
                  {item.title}
                </p>
                <ul className="list-disc text-[10px] lg:text-[14px]">
                  {item.description.map((desc) => (
                    <li key={desc} className="ml-[15px] lg:ml-[20px]">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:mr-[19px] [&>svg]:w-[97px] [&>svg]:h-[97px] lg:[&>svg]:w-[160px] lg:[&>svg]:h-[160px]">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section className="py-[50px] lg:py-[100px] ">
        <h2 className="text-[22px] lg:text-[24px] font-medium lg:font-semibold mb-[40px]">
          Индивидуальные условия для вашего бизнеса
        </h2>
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="flex flex-col gap-[30px] lg:w-[566px] shrink-0">
            <p className="text-[18px] lg:text-[22px] font-semibold lg:font-medium ">
              Заполните форму и мы свяжемся <br /> с вами в течении дня:
            </p>
            <form className="flex flex-col gap-[20px]">
              <input
                type="text"
                placeholder="Ваше имя"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
              <input
                type="text"
                placeholder="Название компании"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
              <input
                type="tel"
                placeholder="Ваш номер телефона"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
              <input
                type="email"
                placeholder="Ваш e-mail"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
              <input
                type="text"
                placeholder="Комментарий (не обязательно)"
                className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
              />
            </form>

            <Link
              href="/"
              className="bg-bg-red flex justify-center text-center items-center lg:w-[436px] h-[55px] rounded-[4px] text-white text-[18px] font-medium hover:bg-main2 transition-colors duration-300"
            >
              Получить индивидуальное предложение
            </Link>
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-grey pt-[50px] mt-[50px] lg:pt-0 lg:mt-0 lg:pl-[50px] lg:ml-[50px] shrink">
            <p className="mb-[20px] text-[18px]">
              Мы знаем, что каждому бизнесу нужны особые условия. Поэтому для
              юридических лиц предлагаем гибкую систему оплаты и цены – до 90%
              скидки
            </p>
            <Image
              src="/form-2.png"
              width={594}
              height={396}
              alt="Форма"
              className="w-[335px] h-[223px] lg:w-[594px] lg:h-[396px] self-center lg:self-auto object-contain"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
