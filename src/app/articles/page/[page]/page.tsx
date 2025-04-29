import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/section";
import { isMobileDevice } from "@/utils/is-mobile";
import { fetchAPI } from "@/utils/strapi";

export default async function Articles({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageSize = (await isMobileDevice()) ? 10 : 16;

  const articleItems = await fetchAPI(
    `/articles?populate=*&sort=updatedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

  return (
    <>
      <Breadcrumbs items={[{ text: "Статьи" }]} />
      <Section className="pt-[30px] pb-[100px] bg-bg-grey">
        <h1 className="text-[24px] font-semibold mb-[50px]">Статьи</h1>
        <div className="grid lg:grid-cols-4 gap-[10px]">
          {articleItems.data.map((article) => (
            <ArticleCard key={article.documentId} article={article} />
          ))}
        </div>
        <Pagination paginationData={articleItems.meta.pagination} />
      </Section>
    </>
  );
}
