"use client";
import { useCart } from "@/components/context/cart";
import { CartProduct } from "@/components/icons/cart-product";

export const ButtonsBuy = ({
  product,
  selectedColorIndex,
}: {
  product: any;
  selectedColorIndex: number;
}) => {
  const { cart, addToCart } = useCart();
  return (
    <div className="flex flex-wrap gap-[10px]  mb-[20px]">
      <div className="flex gap-[10px]  w-full grow lg:w-auto">
        <button className="px-[20px] grow w-full  py-[8px] rounded-[4px] text-[18px] font-medium bg-white text-center text-black border border-main2 cursor-pointer hover:bg-bg-red hover:border-bg-red hover:text-white transition-colors duration-300">
          Купить сейчас
        </button>

        <button
          className="p-[12px] w-full rounded-[4px] bg-bg-red transition-colors duration-300 hover:bg-main2 text-white flex gap-[10px] justify-center items-center cursor-pointer"
          onClick={() => {
            addToCart(product, 1, selectedColorIndex);
          }}
        >
          <CartProduct />
          <span className="text-[18px] font-medium">В корзину</span>
        </button>
      </div>
    </div>
  );
};
