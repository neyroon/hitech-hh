"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCart } from "@/components/context/cart";
import { Section } from "@/components/section";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart } = useCart();
  const searchParams = useSearchParams();
  const buyNow = Boolean(searchParams.get("buyNow"));
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    if (isScriptReady) {
      const widget = new SafeRouteCartWidget("saferoute-cart-widget", {
        apiScript: "/saferoute-widget-api.php",
        discount: buyNow
          ? cart.buyNowProduct.price_discount
          : cart.totalPriceDiscount - cart.totalPrice,
        enableAcquiring: true,
        splitFullnameInput: true,
        products: buyNow
          ? [
              {
                name: cart.buyNowProduct.title,
                count: cart.buyNowProduct.quantity,
                price: cart.buyNowProduct.price,
              },
            ]
          : cart.products.map((product) => ({
              name: product.title,
              count: product.quantity,
              price: product.price,
            })),
      });
      widget.on("start", () => console.log("start"));
    }
  }, [isScriptReady]);

  return (
    <>
      <Script
        src="https://widgets.saferoute.ru/cart/api.js"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      <Breadcrumbs items={[{ text: "Оформление заказа" }]} />
      <Section className="pt-[30px] pb-[50px] lg:pb-[100px] bg-bg-grey">
        <div id="saferoute-cart-widget"></div>
      </Section>
    </>
  );
}
