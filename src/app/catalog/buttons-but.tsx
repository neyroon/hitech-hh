"use client";
import { useCart } from "@/components/context/cart";
import { CartProduct } from "@/components/icons/cart-product";
import { formatPrice } from "@/utils/format-price";
import { useRouter } from "next/navigation";

export const ButtonsBuy = ({ product }: { product: any }) => {
  const { addToCart, buyNow } = useCart();
  const router = useRouter();
  return (
    <div>
      <button
        className="p-[12px] mb-[12px] rounded-[4px] bg-main2 text-white flex gap-[14px] justify-center w-full items-center cursor-pointer hover:bg-bg-red hover:text-white transition-colors duration-300"
        onClick={() => addToCart(product, 1)}
      >
        <CartProduct />
        <span className="text-[18px] font-medium">
          {formatPrice(product.price)}
        </span>
      </button>
      <button
        className="p-[12px] rounded-[4px] text-[18px] font-medium bg-bg-grey w-full block text-center cursor-pointer hover:bg-bg-red hover:text-white transition-colors duration-300 "
        onClick={() => {
          buyNow(product);
          router.push("/checkout?buyNow=true");
        }}
      >
        Купить сейчас
      </button>
    </div>
  );
};
