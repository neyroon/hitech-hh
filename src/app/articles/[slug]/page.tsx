import { ArticleWithSwiper } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section } from "@/components/section";
import { fetchAPI } from "@/utils/strapi";
import Markdown from "markdown-to-jsx";
import React from "react";

export default async function Articles({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articleItem = await fetchAPI(
    `/articles?filters\[slug\][$eq]=${slug}&populate=*`
  );
  const articleItems = await fetchAPI(
    `/articles?populate=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=10`
  );
  return (
    <>
      <Breadcrumbs
        items={[
          { text: "Статьи", link: "/articles/page/1" },
          { text: articleItem.data[0].title },
        ]}
      />
      <Section className="pt-[30px] pb-[50px] lg:pb-0 bg-bg-grey">
        <div className="flex flex-col lg:flex-row gap-[50px] items-start ">
          <div className="p-[20px] lg:p-[30px] bg-white lg:mb-[100px] rounded-[10px] w-full">
            <h1 className="text-[22px] font-medium mb-[20px]">
              {articleItem.data[0].title}
            </h1>
            <Markdown className="flex flex-col gap-[20px] text-[16px] [&_img]:w-full [&_img]:h-[381px] [&_img]:rounded-[8px]">
              {articleItem.data[0].content}
            </Markdown>
          </div>
          <div className="p-[30px] bg-white pb-0 lg:w-[362px] shrink-0 w-full">
            <ArticleWithSwiper articleItems={articleItems} />
          </div>
        </div>
      </Section>
    </>
  );
}
