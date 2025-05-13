import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section } from "@/components/section";
import { CheckoutBlock } from "./checkout-block";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { buyNow } = await searchParams;
  return (
    <>
      <Breadcrumbs items={[{ text: "Оформление заказа" }]} />
      <Section className="pt-[30px] pb-[50px] lg:pb-[100px] bg-bg-grey">
        <CheckoutBlock buyNow={Boolean(buyNow)} />
      </Section>
    </>
  );
}
