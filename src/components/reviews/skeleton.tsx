import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ReviewsFallback = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      {isMobile ? (
        <div className="flex gap-[10px]  [&_*]:rounded-[8px] mr-[-20px] ">
          <Skeleton
            inline
            height={363}
            baseColor="#e5e5e5"
            containerClassName="w-[80%] shrink-0"
          />
          <Skeleton
            inline
            height={363}
            baseColor="#e5e5e5"
            containerClassName="grow"
          />
        </div>
      ) : (
        <div className="flex gap-[10px] [&_*]:w-full  [&_*]:rounded-[8px]">
          <Skeleton inline height={431} baseColor="#e5e5e5" />
          <Skeleton inline height={431} baseColor="#e5e5e5" />
          <Skeleton inline height={431} baseColor="#e5e5e5" />
        </div>
      )}
    </>
  );
};
