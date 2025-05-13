import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section } from "@/components/section";
import { CartBlock } from "./cart-block";

export default async function Cart() {
  return (
    <>
      <Breadcrumbs items={[{ text: "Корзина" }]} />
      <Section className="pt-[30px] pb-[50px] lg:pb-[100px] bg-bg-grey">
        <CartBlock />
      </Section>
    </>
  );
}
