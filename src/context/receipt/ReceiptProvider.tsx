import { useContext, useEffect, useState, type ReactNode } from "react";
import { ReceiptContext } from "./ReceiptContext";
import type { ReceiptModel } from "../../models/receipt";
import { CartContext } from "../cart/CartContext";

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const { clearCart } = useContext(CartContext)!;
  const [receipt, setReceipt] = useState<ReceiptModel[]>([]);

  const addReceipt = (newReceipt: ReceiptModel) => {
    setReceipt((prev) => [...prev, newReceipt]);
    clearCart();
  };

  useEffect(() => {
    console.log(receipt);
  }, [receipt]);

  return (
    <ReceiptContext.Provider value={{ receipt, addReceipt }}>{children}</ReceiptContext.Provider>
  );
};
