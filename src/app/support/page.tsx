import { EmailIcon } from "@/components/icons/email";
import { InstagramIcon } from "@/components/icons/instagram";
import { LogoIcon } from "@/components/icons/logo";
import { RefreshIcon } from "@/components/icons/refresh";
import { TgIcon } from "@/components/icons/tg";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

export default function Support() {
  return (
    <>
      <Section className="mb-[100px]">
        <div className="flex gap-[30px] justify-between flex-col lg:flex-row">
          <div className="mt-[50px] lg:mt-[97px]">
            <h1 className="text-[18px] lg:text-[32px] font-semibold mb-[20px]">
              Служба сервиса <br /> и гарантийного обслуживания
            </h1>
            <p className="text-[16px] lg:text-[18px] lg:font-semibold mb-[40px]">
              Для быстрой связи с тех.поддержкой выберите способ и свяжитесь
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-[10px] sm:gap-[20px] sm:max-w-[450px]">
              <Link href="https://t.me/+79811895734" className="">
                <div className="flex items-center justify-center gap-[10px] py-[16px] px-[15px] rounded-[4px] text-[16px] font-semibold bg-tg text-white">
                  <TgIcon />
                  Telegram менеджер
                </div>
              </Link>
              <Link href="https://wa.me/+79811895734">
                <div className="flex items-center justify-center gap-[10px] py-[16px] px-[15px] rounded-[4px] text-[16px] font-semibold bg-whatsapp text-white">
                  <WhatsAppIcon />
                  WhatsApp
                </div>
              </Link>
              <Link href="mailto:hitech.comp@mail.ru">
                <div className="flex items-center justify-center gap-[10px] py-[16px] px-[15px] rounded-[4px] text-[16px] font-semibold bg-bg-email text-white">
                  <EmailIcon />
                  Электронная почта
                </div>
              </Link>
              <Link href="https://t.me/hitech_hh_bot">
                <div className="flex items-center justify-center gap-[10px] py-[16px] px-[15px] rounded-[4px] text-[16px] font-semibold bg-tg text-white">
                  <TgIcon />
                  Telegram бот
                </div>
              </Link>
            </div>
          </div>
          <Image
            src="/form.png"
            priority
            width={500}
            height={500}
            alt="Свяжитесь с нами"
            className="self-center"
          />
        </div>
      </Section>
      <Section className="bg-bg-grey py-[50px] mb-[100px]">
        <h2 className="text-center font-medium text-[16px] mb-[40px]">
          SAFERET или HITECH? Два имени — бренд один.
        </h2>
        <div className="flex flex-col lg:flex-row gap-[40px] items-center justify-center">
          <div className="bg-white w-full lg:w-[482px] h-[46px] lg:h-[111px] flex items-center justify-center rounded-[2px]">
            <Image
              src="/before-logo.png"
              width={262}
              height={46}
              alt="Логотип до ребрендинга"
            />
          </div>
          <div className="flex flex-col items-center gap-[20px] text-[14px]">
            <span className="bg-bg-green w-[119px] text-center py-[3px] rounded-[2px] text-white">
              Ранее было
            </span>
            <RefreshIcon />
            <span className="bg-bg-green w-[119px] text-center py-[3px] rounded-[2px] text-white">
              Нововведение
            </span>
          </div>
          <div className="bg-white w-full lg:w-[482px] h-[72px] lg:h-[111px] flex items-center justify-center rounded-[2px] text-main2">
            <LogoIcon />
          </div>
        </div>
      </Section>
      <Section className="mb-[100px]">
        <div className="flex gap-[30px] justify-between flex-col lg:flex-row">
          <div>
            <h2 className="hidden lg:block text-[24px] lg:text-[32px] font-semibold mb-[20px]">
              Присоединяйтесь к нам в соцсетях!
            </h2>
            <h2 className="block lg:hidden text-[24px] lg:text-[32px] font-semibold mb-[20px]">
              Присоединяйтесь <br /> к нам в соцсетях!
            </h2>
            <p className="text-[18px] font-semibold mb-[15px] lg:mb-[10px]">
              Будьте в центре событий:
            </p>
            <div className="text-[18px] flex gap-[10px] flex-wrap items-center max-w-[680px] mb-[40px]">
              <span>узнавайте первыми о</span>
              <span className="px-[10px] py-[5px] bg-bg-grey rounded-[4px]">
                новинках
              </span>
              <span>получайте</span>
              <span className="px-[10px] py-[5px] bg-bg-grey rounded-[4px]">
                лайфхаки и рецепты
              </span>
              <span>а также участвуйте в </span>
              <span className="px-[10px] py-[5px] bg-bg-grey rounded-[4px]">
                розыгрышах с классными призами!
              </span>
              <span>
                Мы с нетерпением ждем вас в нашем активном и дружном сообществе!
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-[20px] ">
              <Link href="https://t.me/HH_HITECH" className="">
                <div className="flex items-center justify-center gap-[10px] py-[16px] px-[15px] rounded-[4px] text-[16px] font-semibold bg-tg text-white">
                  <TgIcon />
                  Telegram канал
                </div>
              </Link>
              <Link href="https://www.instagram.com/hitech.hh" className="">
                <div className="flex items-center justify-center gap-[10px] py-[16px] px-[15px] rounded-[4px] text-[16px] font-semibold bg-bg-inst text-white">
                  <InstagramIcon />
                  Инстаграм
                </div>
              </Link>
            </div>
          </div>
          <Image
            src="/form-2.png"
            width={558}
            height={372}
            alt="Присоединяйтесь к нам"
            className="self-center"
          />
        </div>
      </Section>
    </>
  );
}
