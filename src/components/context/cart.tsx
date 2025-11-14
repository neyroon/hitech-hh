"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartType {
  products: any[];
  totalQuantity: number;
  totalPrice: number;
  totalPriceWithPromo?: number;
  totalPriceDiscount: number;
  totalPriceDiscountWithPromo?: number;
  buyNowProduct: any | null;
}

export interface CartContextType {
  cart: CartType;
  addToCart: (product: any, quantity: number, colorIndex?: number) => void;
  applyPromocode: (promocode: string) => void;
  removeFromCart: (documentId: number, colorSlug: string) => void;
  increaseQuantity: (
    documentId: number,
    colorSlug: string,
    currentProduct: any
  ) => void;
  decreaseQuantity: (
    documentId: number,
    colorSlug: string,
    currentProduct: any
  ) => void;
  buyNow: (product: any, colorIndex?: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartType>({
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
    totalPriceDiscount: 0,
    buyNowProduct: null,
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const sessionCart = sessionStorage.getItem("cart");
    if (sessionCart) {
      setCart(JSON.parse(sessionCart));
    }
  }, []);

  // Добавление товара в корзину (увеличение количества, если товар уже есть)
  const addToCart = (
    product: any,
    quantity: number,
    colorIndex: number = 0
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.products.find(
        (item) =>
          item.documentId === product.documentId &&
          item.pickedColor === product.colors[colorIndex]
      );
      if (existingItem) {
        return {
          products: prevCart.products.map((item) =>
            item.documentId === product.documentId &&
            item.pickedColor === product.colors[colorIndex]
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          totalPrice:
            prevCart.totalPrice +
            (existingItem.colors[colorIndex]?.price || existingItem.price),
          totalQuantity: prevCart.totalQuantity + quantity,
          totalPriceDiscount:
            prevCart.totalPriceDiscount +
            (existingItem.colors[colorIndex]?.price_discount ||
              existingItem.price_discount ||
              existingItem.price),
        };
      }
      return {
        products: [
          ...prevCart.products,
          { ...product, quantity, pickedColor: product.colors[colorIndex] },
        ],
        totalPrice:
          prevCart.totalPrice +
          (product.colors[colorIndex]?.price || product.price),
        totalQuantity: prevCart.totalQuantity + quantity,
        totalPriceDiscount:
          prevCart.totalPriceDiscount +
          (product.colors[colorIndex]?.price_discount ||
            product.price_discount ||
            product.price),
      };
    });
  };

  const buyNow = (product: any, colorIndex: number = 0) => {
    product.pickedColor = product.colors[colorIndex];
    product.quantity = 1;
    setCart((prevCart) => {
      return {
        products: prevCart.products,
        totalPrice: prevCart.totalPrice,
        totalQuantity: prevCart.totalQuantity,
        totalPriceDiscount: prevCart.totalPriceDiscount,
        buyNowProduct: product,
      };
    });
  };

  const applyPromocode = (promocode: string) => {
    setCart((prevCart) => {
      let currentPromo = null;
      const existingItems = prevCart.products.filter((item) =>
        item.promocodes.find((promo) => {
          if (promo.slug === promocode) {
            currentPromo = promo;
            return true;
          }
          return false;
        })
      );

      if (existingItems.length > 0) {
        let totalPriceToMinus = 0;
        return {
          products: prevCart.products.map((item) => {
            return existingItems.find((product) => {
              if (product.documentId === item.documentId) {
                totalPriceToMinus +=
                  item.quantity *
                  item.price *
                  (currentPromo.percentage_discount / 100);
                return {
                  ...item,
                  price:
                    item.price -
                    item.price * (currentPromo.percentage_discount / 100),
                };
              } else return item;
            });
          }),
          totalPrice: prevCart.totalPrice,
          totalQuantity: prevCart.totalQuantity,
          totalPriceDiscount: prevCart.totalPriceDiscount,
          totalPriceWithPromo: prevCart.totalPrice - totalPriceToMinus,
          totalPriceDiscountWithPromo:
            prevCart.totalPriceDiscount + totalPriceToMinus,
        };
      }

      return {
        products: prevCart.products,
        totalPrice: prevCart.totalPrice,
        totalQuantity: prevCart.totalQuantity,
        totalPriceDiscount: prevCart.totalPriceDiscount,
        totalPriceWithPromo: undefined,
        totalPriceDiscountWithPromo: undefined,
      };
    });
  };

  // Удаление товара из корзины по id
  const removeFromCart = (documentId: number, colorSlug: string) => {
    setCart((prevCart) => {
      const product = prevCart.products.find(
        (item) =>
          item.documentId === documentId &&
          item.pickedColor?.color?.slug === colorSlug
      );
      console.log(product);
      return {
        products: prevCart.products.filter(
          (item) =>
            item.documentId !== documentId &&
            item.pickedColor?.color?.slug !== colorSlug
        ),
        totalPrice:
          prevCart.totalPrice -
          (product?.colors?.find((colors) => {
            console.log(colors, "colors");
            return colors.color.slug === colorSlug;
          })?.price || product.price),
        totalQuantity: prevCart.totalQuantity - product.quantity,
        totalPriceDiscount:
          prevCart.totalPriceDiscount -
          (product?.colors?.find((colors) => colors.color.slug === colorSlug)
            ?.price_discount ||
            product?.price_discount ||
            product.price),
      };
    });
  };

  // Увеличение количества товара в корзине
  const increaseQuantity = (
    documentId: number,
    colorSlug: string,
    currentProduct: any
  ) => {
    setCart((prevCart) => {
      const product = prevCart.products.find(
        (item) =>
          item.documentId === documentId &&
          item.pickedColor?.color?.slug === colorSlug
      );
      if (!product) return prevCart;
      return {
        ...prevCart,
        products: prevCart.products.map((item) =>
          item.documentId === documentId &&
          item.pickedColor?.color?.slug === colorSlug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalPrice:
          prevCart.totalPrice +
          (product.colors?.find((colors) => colors.color.slug === colorSlug)
            ?.price || product.price),
        totalQuantity: prevCart.totalQuantity + 1,
        totalPriceDiscount:
          prevCart.totalPriceDiscount +
          (product.colors?.find((colors) => colors.color.slug === colorSlug)
            ?.price_discount ||
            product.price_discount ||
            product.price),
      };
    });
  };

  // Уменьшение количества товара в корзине, удаление если количество становится 0
  const decreaseQuantity = (
    documentId: number,
    colorSlug: string,
    currentProduct: any
  ) => {
    setCart((prevCart) => {
      const product = prevCart.products.find(
        (item) =>
          item.documentId === documentId &&
          item.pickedColor?.color?.slug === colorSlug
      );
      if (!product) return prevCart;
      return {
        ...prevCart,
        products: prevCart.products
          .map((item) =>
            item.documentId === documentId &&
            item.pickedColor?.color?.slug === colorSlug
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
        totalPrice:
          prevCart.totalPrice -
          (product.colors?.find((colors) => colors.color.slug === colorSlug)
            ?.price || product.price),
        totalQuantity: prevCart.totalQuantity - 1,
        totalPriceDiscount:
          prevCart.totalPriceDiscount -
          (product.colors?.find((colors) => colors.color.slug === colorSlug)
            ?.price_discount ||
            product.price_discount ||
            product.price ||
            0),
      };
    });
  };

  // Очистка всей корзины
  const clearCart = () => {
    setCart({
      products: [],
      totalPrice: 0,
      totalQuantity: 0,
      totalPriceDiscount: 0,
      buyNowProduct: null,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        applyPromocode,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        buyNow,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста корзины
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
