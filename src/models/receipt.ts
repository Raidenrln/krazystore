type ProductReceiptModel = {
  id: string
  storebelong: string
  price: number
}

export type ReceiptModel = {
  id: string
  createdAt: string
  products: ProductReceiptModel[]
} 