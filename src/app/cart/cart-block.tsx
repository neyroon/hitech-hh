"use client";
import { useCart } from "@/components/context/cart";
import { MinusIcon } from "@/components/icons/minus";
import { PlusIcon } from "@/components/icons/plus";
import { morph } from "@/utils/morph";
import { getStrapiMedia } from "@/utils/strapi";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";

export const CartBlock = () => {
  const { cart, decreaseQuantity, increaseQuantity, removeFromCart } =
    useCart();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (isReady) {
      const widget = new SafeRouteCartWidget("saferoute-cart-widget", {
        apiScript: "http://localhost:3200/php/saferoute-widget-api.php",

        products: cart.products.map((product) => ({
          name: product.title,
          count: product.quantity,
          price: product.price,
        })),
      });
    }
  }, [isReady]);

  return (
    <>
      <Script src="https://widgets.saferoute.ru/cart/api.js" />
      {cart.products.length > 0 ? (
        <>
          {isReady ? (
            <>
              <div id="saferoute-cart-widget"></div>
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-semibold mb-[50px]">Корзина</h1>
              <div className="flex gap-[20px]">
                <div className="flex flex-col grow gap-[20px] p-[30px] bg-white rounded-[10px]">
                  <span className="text-[16px]">Вы набрали:</span>
                  <div className="flex flex-col ">
                    {cart.products.map((product) => (
                      <div
                        key={product.documentId}
                        className="flex gap-[30px] items-center justify-between"
                      >
                        <div className="flex gap-[10px]">
                          <Image
                            src={getStrapiMedia(product.image.url)}
                            width={88}
                            height={88}
                            alt="Изображение товара"
                            className="w-[88px] h-[88px] object-contain"
                          />
                          <div className="flex flex-col gap-[14px] w-[383px]">
                            <p>{product.title}</p>
                            <div>
                              <Markdown className="text-[12px]">
                                {product.description}
                              </Markdown>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                          <span className="text-[18px]">{product.price}</span>
                          <span className="text-[12px] text-grey line-through">
                            {product.price_discount}
                          </span>
                        </div>
                        <div className="px-[14px] py-[6px] w-[120px] h-[50px] bg-bg-grey rounded-[8px] flex items-center justify-between ">
                          <button
                            onClick={() => decreaseQuantity(product.documentId)}
                            className="text-grey cursor-pointer"
                          >
                            <MinusIcon />
                          </button>
                          <span className="text-[16px]">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(product.documentId)}
                            className="cursor-pointer"
                          >
                            <PlusIcon />
                          </button>
                        </div>
                        <button
                          className="text-[12px] text-grey cursor-pointer"
                          onClick={() => removeFromCart(product.documentId)}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <div className="bg-white p-[30px] rounded-[10px]">
                    <h3 className="mb-[20px] text-[22px] font-medium">
                      Условия заказа:
                    </h3>
                    <p>Доставка: бесплатно.</p>
                    <p>Способы оплаты:</p>
                  </div>
                  <div className="bg-white p-[30px] rounded-[10px]">
                    <div className="mb-[20px] flex items-center justify-between">
                      <h3 className="text-[22px] font-medium">Итого:</h3>
                      <span className="text-[24px] font-semibold">
                        {cart.totalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {cart.totalQuantity} {morph(cart.totalQuantity)}
                      </span>
                      <span>{cart.totalPriceDiscount}</span>
                    </div>
                    {cart.totalPriceDiscount - cart.totalPrice > 0 && (
                      <div className="flex justify-between mt-[12px]">
                        <span>Общая скидка:</span>
                        <span className="text-red-like">
                          - {cart.totalPriceDiscount - cart.totalPrice}
                        </span>
                      </div>
                    )}
                    <button
                      className="bg-bg-red mt-[20px] px-[20px] py-[15px] text-[18px] text-white rounded-[4px] cursor-pointer"
                      onClick={() => setReady(true)}
                    >
                      Перейти к оформлению
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center ">
          <p className="text-center text-[16px] mb-[30px]">
            У вас пока нет ни одного товара <br /> в корзине
          </p>
          <Link
            href="/catalog"
            className="bg-bg-red flex justify-center items-center w-[217px] h-[45px] rounded-[4px] text-white text-[18px] font-medium"
          >
            Перейти в каталог
          </Link>
        </div>
      )}
    </>
  );
};
