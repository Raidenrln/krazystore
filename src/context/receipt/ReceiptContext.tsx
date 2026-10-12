import { createContext } from "react";
import type { ReceiptModel } from "../../models/receipt";

interface ReceiptModelContext {
  receipt: ReceiptModel[]
  addReceipt: (newReceipt: ReceiptModel) => void;
  removeReceipt: (receiptId: string) => void;
}

export const ReceiptContext = createContext<ReceiptModelContext | null>(null)