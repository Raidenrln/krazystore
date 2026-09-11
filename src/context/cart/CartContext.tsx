import { createContext } from "react";
import type { CartItem } from "../../models/cartModel";

interface CartContextModel {
  cartItem: CartItem[]
  addCartItem: (id: string, quantity: number) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const CartContext = createContext<CartContextModel | null>(null);
