import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Section className="[&>div]:px-0  py-[20px] lg:py-[80px] bg-bg-grey">
      <div className="flex gap-[20px]">
        <div className="bg-main2 px-[20px] pt-[40px] pb-0 lg:p-[30px] lg:h-[366px] flex flex-col justify-between gap-[20px] lg:flex-row text-white rounded-[10px] relative w-full lg:w-[61%]">
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
              className="bg-white self-center lg:self-auto flex justify-center items-center w-[230px] h-[45px] rounded-[4px] text-black text-[18px] font-medium"
            >
              Перейти в каталог
            </Link>
          </div>
          <Image
            src="/main-banner.png"
            width={409}
            height={264}
            alt="Гарантия"
            className="w-full h-[248px] mt-[20px] lg:mt-0 relative lg:top-[27px] lg:w-[409px] lg:h-[264px] object-contain  self-center lg:self-auto"
          />
        </div>
      </div>
    </Section>
  );
}
