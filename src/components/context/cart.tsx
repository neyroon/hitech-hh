"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CartType {
  products: any[];
  totalQuantity: number;
  totalPrice: number;
  totalPriceDiscount: number;
}

export interface CartContextType {
  cart: CartType;
  addToCart: (product: any, quantity: number, colorIndex?: number) => void;
  removeFromCart: (documentId: number, colorSlug: string) => void;
  increaseQuantity: (documentId: number, colorSlug: string) => void;
  decreaseQuantity: (documentId: number, colorSlug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartType>({
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
    totalPriceDiscount: 0,
  });

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
          totalPrice: prevCart.totalPrice + existingItem.price,
          totalQuantity: prevCart.totalQuantity + quantity,
          totalPriceDiscount:
            prevCart.totalPriceDiscount +
            (existingItem.price_discount || existingItem.price),
        };
      }
      return {
        products: [
          ...prevCart.products,
          { ...product, quantity, pickedColor: product.colors[colorIndex] },
        ],
        totalPrice: prevCart.totalPrice + product.price,
        totalQuantity: prevCart.totalQuantity + quantity,
        totalPriceDiscount:
          prevCart.totalPriceDiscount +
          (product.price_discount || product.price),
      };
    });
  };

  // Удаление товара из корзины по id
  const removeFromCart = (documentId: number, colorSlug: string) => {
    setCart((prevCart) => {
      const product = prevCart.products.find(
        (item) =>
          item.documentId === documentId &&
          item.pickedColor.color.slug === colorSlug
      );
      return {
        products: prevCart.products.filter(
          (item) =>
            item.documentId !== documentId &&
            item.pickedColor.color.slug === colorSlug
        ),
        totalPrice: prevCart.totalPrice - product.price,
        totalQuantity: prevCart.totalQuantity - product.quantity,
        totalPriceDiscount:
          prevCart.totalPriceDiscount +
          (product.price_discount || product.price),
      };
    });
  };

  // Увеличение количества товара в корзине
  const increaseQuantity = (documentId: number, colorSlug: string) => {
    setCart((prevCart) => {
      const product = prevCart.products.find(
        (item) =>
          item.documentId === documentId &&
          item.pickedColor.color.slug === colorSlug
      );
      return {
        products: prevCart.products.map((item) =>
          item.documentId === documentId &&
          item.pickedColor.color.slug === colorSlug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalPrice: prevCart.totalPrice + product.price,
        totalQuantity: prevCart.totalQuantity + 1,
        totalPriceDiscount:
          prevCart.totalPriceDiscount +
          (product.price_discount || product.price),
      };
    });
  };

  // Уменьшение количества товара в корзине, удаление если количество становится 0
  const decreaseQuantity = (documentId: number, colorSlug: string) => {
    setCart((prevCart) => {
      const product = prevCart.products.find(
        (item) =>
          item.documentId === documentId &&
          item.pickedColor.color.slug === colorSlug
      );
      if (product.quantity === 1) return prevCart;
      return {
        products: prevCart.products
          .map((item) =>
            item.documentId === documentId &&
            item.pickedColor.color.slug === colorSlug
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
        totalPrice: prevCart.totalPrice - product.price,
        totalQuantity: prevCart.totalQuantity - 1,
        totalPriceDiscount:
          prevCart.totalPriceDiscount +
          (product.price_discount || product.price),
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
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
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
