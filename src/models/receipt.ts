type ProductReceiptModel = {
  id: string
  quantity: number
}

export type ReceiptModel = {
  id: string
  createdAt: string
  products: ProductReceiptModel[]
} 