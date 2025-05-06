"use client";
import { useCart } from "@/components/context/cart";
import { MinusIcon } from "@/components/icons/minus";
import { PlusIcon } from "@/components/icons/plus";
import { formatPrice } from "@/utils/format-price";
import { morph } from "@/utils/morph";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ChangeEvent, useEffect, useState } from "react";

export const CartBlock = ({ buyNow }: { buyNow: boolean }) => {
  const {
    cart,
    applyPromocode,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCart();
  const [isReady, setReady] = useState(false);
  const [promo, setPromo] = useState("");
  const [isPromoClicked, setIsPromoClicked] = useState(false);
  const [isPromoApplied, setisPromoApplied] = useState(false);

  useEffect(() => {
    if (isReady) {
      console.log("from ready");
      const widget = new SafeRouteCartWidget("saferoute-cart-widget", {
        apiScript: "/saferoute-widget-api.php",
        discount: buyNow
          ? cart.buyNowProduct.price_discount
          : cart.totalPriceDiscount - cart.totalPrice,
        enableAcquiring: true,
        splitFullnameInput: true,
        products: buyNow
          ? [cart.buyNowProduct]
          : cart.products.map((product) => ({
              name: product.title,
              count: product.quantity,
              price: product.price,
            })),
      });
      console.log(widget);
      widget.on("start", () => console.log("start"));
    }
  }, [isReady]);

  const handlePromoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromo(e.currentTarget.value);
  };

  const handlePromoApplied = () => {
    setIsPromoClicked(true);
    applyPromocode(promo);
    const promoElements = cart.products.find((el) =>
      el.promocodes.find((promocode) => {
        return promocode.slug === promo;
      })
    );

    if (promoElements) {
      setisPromoApplied(true);
    } else setisPromoApplied(false);
  };

  return (
    <>
      <Script
        src="https://widgets.saferoute.ru/cart/api.js"
        onReady={() => {
          console.log(buyNow && cart.buyNowProduct ? true : false);
          setReady(buyNow && cart.buyNowProduct ? true : false);
        }}
      />
      {cart.products.length > 0 || isReady ? (
        <>
          {isReady ? (
            <>
              <div id="saferoute-cart-widget"></div>
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-semibold mb-[30px] lg:mb-[50px]">
                Корзина
              </h1>
              <div className="flex flex-col lg:flex-row gap-[20px]">
                <div className="flex flex-col grow gap-[20px] px-[10px] py-[20px] lg:p-[30px] bg-white rounded-[10px]">
                  <span className="text-[16px]">Вы набрали:</span>
                  <div className="flex flex-col gap-[20px]">
                    {cart.products.map((product) => (
                      <div
                        key={`${product.documentId}${
                          product.pickedColor?.color?.slug || ""
                        }`}
                        className="flex flex-col lg:flex-row gap-[30px] items-center justify-between"
                      >
                        <div className="flex flex-row gap-[10px]">
                          <Image
                            src={getStrapiMedia(product?.images[0]?.url)}
                            width={88}
                            height={88}
                            alt="Изображение товара"
                            className="w-[88px] h-[88px] object-contain"
                          />
                          <div className="flex flex-col gap-[14px] lg:w-[383px]">
                            <p>{product.title}</p>
                            {product.pickedColor?.color?.name && (
                              <p className="text-grey">
                                Цвет: {product.pickedColor.color.name}
                              </p>
                            )}
                            <p className="text-grey">
                              Артикул: {product.wb_article}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full justify-between items-center flex-row">
                          <div className="flex flex-col lg:gap-[8px]">
                            <span className="text-[16px] lg:text-[18px]">
                              {formatPrice(
                                product.pickedColor?.price || product.price
                              )}
                            </span>
                            {product.price_discount && (
                              <span className="text-[12px] text-grey line-through">
                                {formatPrice(
                                  product.pickedColor?.price_discount ||
                                    product.price_discount
                                )}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-[20px]">
                            <div className="px-[8px] lg:px-[14px] py-[6px] w-[124px] lg:w-[120px] lg:h-[50px] bg-bg-grey rounded-[8px] flex items-center justify-between ">
                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    product.documentId,
                                    product.pickedColor?.color?.slug
                                  )
                                }
                                className="text-grey cursor-pointer"
                              >
                                <MinusIcon />
                              </button>
                              <span className="text-[16px]">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    product.documentId,
                                    product.pickedColor?.color?.slug
                                  )
                                }
                                className="cursor-pointer"
                              >
                                <PlusIcon />
                              </button>
                            </div>
                            <button
                              className="text-[12px] text-grey cursor-pointer"
                              onClick={() =>
                                removeFromCart(
                                  product.documentId,
                                  product.pickedColor?.color?.slug
                                )
                              }
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
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
                  <div className="bg-white p-[20px] lg:p-[30px] rounded-[10px]">
                    <div className="mb-[20px] flex items-center justify-between">
                      <h3 className="text-[22px] font-medium">Итого:</h3>
                      <span className="text-[24px] font-semibold">
                        {formatPrice(
                          cart.totalPriceWithPromo || cart.totalPrice
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {cart.totalQuantity} {morph(cart.totalQuantity)}
                      </span>
                      <span>
                        {formatPrice(
                          cart.totalPriceDiscountWithPromo ||
                            cart.totalPriceDiscount
                        )}
                      </span>
                    </div>
                    {(cart.totalPriceDiscountWithPromo ||
                      cart.totalPriceDiscount) -
                      cart.totalPrice >
                      0 && (
                      <div className="flex justify-between mt-[12px]">
                        <span>Общая скидка:</span>
                        <span className="text-red-like">
                          -{" "}
                          {formatPrice(
                            (cart.totalPriceDiscountWithPromo ||
                              cart.totalPriceDiscount) - cart.totalPrice
                          )}
                        </span>
                      </div>
                    )}
                    <label className="mt-[20px]  bg-bg-grey rounded-[10px] text-grey flex flex-wrap gap-[20px] items-center  w-full">
                      <input
                        type="text"
                        value={promo}
                        className="py-[15px] grow px-[14px]"
                        placeholder="Промокод"
                        onChange={handlePromoChange}
                      />
                      <button
                        className="mr-[15px] cursor-pointer"
                        onClick={handlePromoApplied}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="22" height="22" rx="4" fill="#00A43D" />
                          <path
                            d="M7.8125 10.9999L9.935 13.1224L14.1875 8.87744"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </label>
                    {isPromoClicked && (
                      <>
                        {isPromoApplied ? (
                          <p className="mt-[10px] text-center text-bg-green">
                            Промокод применен
                          </p>
                        ) : (
                          <p className="mt-[10px] text-center text-bg-red">
                            Не удалось применить промокод
                          </p>
                        )}
                      </>
                    )}
                    <button
                      className="bg-bg-red mt-[20px] w-full px-[33px] lg:px-[20px] py-[15px] text-[18px] text-white rounded-[4px] cursor-pointer"
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
