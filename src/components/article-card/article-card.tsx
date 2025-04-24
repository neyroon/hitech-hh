import { convertDate } from "@/utils/date";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ArticleCard = ({ article }: { article: any }) => {
  return (
    <Link href={`/articles/${article.slug}`} className="block ">
      <div className="bg-white  rounded-[8px]">
        <Image
          src={getStrapiMedia(article.preview.url)}
          width={308}
          height={165}
          alt="Превью статьи"
          className="rounded-[8px] h-[165px] w-full"
        />
        <div className="px-[5px] pb-[20px]">
          <span className="mt-[10px] inline-block text-grey text-[12px] p-[5px] rounded-[4px] bg-bg-grey">
            {convertDate(new Date(article.updatedAt))}
          </span>
          <p className="mt-[15px] text-[16px]">{article.title}</p>
        </div>
      </div>
    </Link>
  );
};
