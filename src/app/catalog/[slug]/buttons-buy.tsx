"use client";
import { useCart } from "@/components/context/cart";
import { CartProduct } from "@/components/icons/cart-product";
import { MinusIcon } from "@/components/icons/minus";
import { PlusIcon } from "@/components/icons/plus";
import React, { useState } from "react";

export const ButtonsBuy = ({ product }: { product: any }) => {
  const [productCount, setProductCount] = useState(1);
  const { addToCart } = useCart();
  return (
    <div className="flex flex-wrap gap-[10px]  mb-[20px]">
      <div className="flex gap-[10px]  w-full grow lg:w-auto">
        <div className="px-[14px] py-[6px] w-[120px] h-[50px] bg-bg-grey rounded-[8px] flex items-center justify-between ">
          <button
            onClick={() => setProductCount((prev) => prev - 1)}
            className="text-grey cursor-pointer"
          >
            <MinusIcon />
          </button>
          <span className="text-[16px]">{productCount}</span>
          <button
            onClick={() => setProductCount((prev) => prev + 1)}
            className="cursor-pointer"
          >
            <PlusIcon />
          </button>
        </div>
        <button className="px-[20px] grow w-full lg:w-auto py-[8px] rounded-[4px] text-[18px] font-medium bg-white text-center text-black border border-main2 cursor-pointer">
          Купить сейчас
        </button>
      </div>
      <button
        className="p-[12px] w-full lg:w-auto rounded-[4px] bg-bg-red text-white flex gap-[10px] justify-center items-center cursor-pointer"
        onClick={() => addToCart(product, 1)}
      >
        <CartProduct />
        <span className="text-[18px] font-medium">В корзину</span>
      </button>
    </div>
  );
};
