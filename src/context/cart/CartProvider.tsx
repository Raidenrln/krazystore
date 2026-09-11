import { useEffect, useState, type ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../models/cartModel";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  const addCartItem = (id: string, quantity: number) => {
    setCartItem((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { id, quantity }];
    });
  };
  
  const increaseQuantity = (id: string) => {
    setCartItem((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItem((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItem((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItem([])
  }

  useEffect(() => {
    console.log(cartItem);
  }, [cartItem]);

  return (
    <CartContext.Provider
      value={{ cartItem, addCartItem, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
