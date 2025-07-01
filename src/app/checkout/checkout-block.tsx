"use client";
import { useCart } from "@/components/context/cart";
import Script from "next/script";
import { useEffect, useState } from "react";

export const CheckoutBlock = ({ buyNow }: { buyNow: boolean }) => {
  const { cart } = useCart();
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
      <div id="saferoute-cart-widget"></div>
    </>
  );
};
