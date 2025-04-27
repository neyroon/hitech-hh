"use client";
import Link from "next/link";
import React from "react";
import { CartIcon } from "../icons/cart";
import { useCart } from "../context/cart";

export const HeaderCart = () => {
  const { cart } = useCart();
  console.log(cart, "cartheader");
  return (
    <Link
      href="/cart"
      className="p-[12px] text-grey hover:text-bg-red group  transition-colors duration-300 font-(family-name:--font-roboto) relative"
    >
      <CartIcon />
      <div className="bg-bg-red text-white rounded-[5px] text-[12px] h-[22px] w-[22px] absolute right-[-4px] top-[-4px] flex items-center justify-center">
        <span>{cart.totalQuantity}</span>
      </div>
    </Link>
  );
};
