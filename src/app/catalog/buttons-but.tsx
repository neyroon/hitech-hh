"use client";
import { useCart } from "@/components/context/cart";
import { CartProduct } from "@/components/icons/cart-product";
import { formatPrice } from "@/utils/format-price";
import React from "react";

export const ButtonsBuy = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  console.log(product);
  return (
    <div>
      <button
        className="p-[12px] mb-[12px] rounded-[4px] bg-main2 text-white flex gap-[14px] justify-center w-full items-center cursor-pointer"
        onClick={() => addToCart(product, 1)}
      >
        <CartProduct />
        <span className="text-[18px] font-medium">
          {formatPrice(product.price)}
        </span>
      </button>
      <button className="p-[12px] rounded-[4px] text-[18px] font-medium bg-bg-grey w-full block text-center cursor-pointer">
        Купить сейчас
      </button>
    </div>
  );
};
