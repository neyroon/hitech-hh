import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductsHits } from "@/components/products-hits";
import { Section } from "@/components/section";
import { fetchAPI } from "@/utils/strapi";
import QueryString from "qs";
import { ProductBlock } from "./product";

export default async function Product({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { color: colorFromParams } = await searchParams;

  const query = QueryString.stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      populate: {
        device_types: { populate: "*" },
        category: { populate: "*" },
        images: { populate: "*" },
        characters: { populate: "*" },
        colors: { populate: "*" },
        certificates: { populate: "*" },
        instruction: { populate: "*" },
        promocodes: { populate: "*" },
        marketplaces: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
      skipNulls: true,
    }
  );
  const productWithData = await fetchAPI(`/products?${query}`);
  const product = productWithData.data[0];
  const characters = [
    { title: "Артикул:", description: product.wb_article },
    { title: "Категория товара:", description: product.category.name },
    {
      title: "Тип устройства:",
      description: product.device_types[0].name,
    },
    {
      title: "Ситуация:",
      description: product.device_types[0]?.situation?.name,
    },
    ...product.characters.map((character) => ({
      title: character.character,
      description: character.character_value,
    })),
  ];

  const producSimilar = await fetchAPI(
    `/products?filters\[category\]\[slug\][$eq]=${product.category.slug}&populate=*&pagination[page]=1&pagination[pageSize]=10`
  );
  // const reviews = product.wb_article
  //   ? await fetchFromServer(
  //       "https://feedbacks-api.wildberries.ru/api/v1/feedbacks",
  //       {
  //         isAnswered: true,
  //         take: 70,
  //         skip: 0,
  //         nmId: product.wb_article,
  //       },
  //       { headers: { Authorization: process.env.NEXT_PUBLIC_WB_TOKEN } }
  //     )
  //   : { data: { feedbacks: [] } };

  return (
    <>
      <Breadcrumbs
        items={[{ text: "Каталог", link: "/catalog" }, { text: product.title }]}
      />
      <Section className="pt-[30px] pb-[60px]">
        <ProductBlock
          product={product}
          characters={characters}
          colorFromParams={colorFromParams}
        />
      </Section>
      <Section className="py-[50px] lg:py-[100px]">
        <h2 className="text-[22px] font-medium lg:text-[24px] lg:font-semibold mb-[50px]">
          С этим товаром покупают
        </h2>
        <div className="relative">
          <ProductsHits productsOfDay={producSimilar.data} />
        </div>
      </Section>
      <Section className="py-[50px] lg:py-[100px]">
        <h2 className="text-[22px] font-medium lg:text-[24px] lg:font-semibold mb-[50px]">
          Похожие товары:
        </h2>
        <div className="relative">
          <ProductsHits productsOfDay={producSimilar.data} />
        </div>
      </Section>
    </>
  );
}
