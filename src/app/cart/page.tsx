import { Section } from "@/components/section";
import React from "react";
import { CartBlock } from "./cart-block";
import { CartProvider } from "@/components/context/cart";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function Cart() {
  return (
    <>
      <Breadcrumbs items={[{ text: "Корзина" }]} />
      <Section className="pt-[30px] pb-[100px] bg-bg-grey">
        <CartBlock />
      </Section>
    </>
  );
}
