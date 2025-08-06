import { isMobileDevice } from "@/utils/is-mobile";
import Image from "next/image";
import Link from "next/link";

export const BannerTop = async () => {
  const isMobile = await isMobileDevice();
  return (
    <div className="bg-bg-grey">
      <div className="gradient-red h-[165px] lg:h-auto rounded-[20px] lg:rounded-[80px] overflow-hidden flex justify-center lg:justify-between 2xl:justify-normal items-center relative">
        <Image
          src={
            isMobile ? "/banner-top-left-mobile.png" : "/banner-top-left.png"
          }
          alt="изображение"
          width={544}
          height={108}
          className="w-[110px] lg:w-[17%] absolute left-0 lg:left-auto lg:static h-[165px] lg:h-[108px] object-cover"
        />
        <div className="flex items-center z-10 flex-col lg:gap-[30px] xl:flex-row">
          <p className="font-medium text-[16px] text-center lg:text-[20px] 2xl:text-[26px] text-white">
            РОЗЫГРЫШ <span className="font-bold">ПОДАРКОВ</span>{" "}
            {isMobile && <br />} В ТЕЛЕГРАМ-КАНАЛЕ
          </p>
          <Link
            href="https://t.me/HH_HITECH"
            target="_blank"
            className="bg-white text-[18px] font-medium py-[13px] px-[10px] lg:py-[13px] lg:px-[26px] rounded-[6px] 2xl:mt-0 2xl:ml-[92px] z-10  text-bg-red"
          >
            ПРИНЯТЬ УЧАСТИЕ
          </Link>
        </div>
        <Image
          src={
            isMobile ? "/banner-top-right-mobile.png" : "/banner-top-right.png"
          }
          alt="изображение"
          width={544}
          height={108}
          className="absolute right-0 lg:right-auto lg:static 2xl:absolute 2xl:right-0 w-[168px] lg:w-[17%] h-[165px] lg:h-[108px] object-cover"
        />
      </div>
    </div>
  );
};
