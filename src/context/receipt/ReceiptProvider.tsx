import { useContext, useEffect, useState, type ReactNode } from "react";
import { ReceiptContext } from "./ReceiptContext";
import type { ReceiptModel } from "../../models/receipt";
import { CartContext } from "../cart/CartContext";

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const { clearCart } = useContext(CartContext)!;
  const [receipt, setReceipt] = useState<ReceiptModel[]>(() => {
    const savedReceipts = localStorage.getItem("savingReceipts");
    return savedReceipts ? JSON.parse(savedReceipts) : [];
  });

  const addReceipt = (newReceipt: ReceiptModel) => {
    setReceipt((prev) => [...prev, newReceipt]);
    clearCart();
  };
  const removeReceipt = (receiptId: string) => {
    setReceipt(prev => prev.filter(p => p.id !== receiptId));
  }
  useEffect(() => {
    localStorage.setItem("savingReceipts", JSON.stringify(receipt));
    console.log("Receipt:", receipt);
  }, [receipt]);

  return (
    <ReceiptContext.Provider value={{ receipt, addReceipt, removeReceipt }}>{children}</ReceiptContext.Provider>
  );
};
