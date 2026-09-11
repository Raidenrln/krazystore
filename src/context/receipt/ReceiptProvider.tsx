import { useState, type ReactNode } from "react";
import { ReceiptContext } from "./ReceiptContext";
import type { ReceiptModel } from "../../models/receipt";


export const ReceiptProvider = ({ children } : {children: ReactNode}) => {
  const [receipt, setReceipt] = useState<ReceiptModel[]>([])

  const addReceipt = (newReceipt: ReceiptModel) => {
    setReceipt(prev => [...prev, newReceipt])
  }
  
  return (
    <ReceiptContext.Provider value={{ receipt, addReceipt }}>
      {children}
    </ReceiptContext.Provider>
  )
}