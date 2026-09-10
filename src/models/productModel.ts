type PriceHistoryModel = {
  previousPrice: number
  newPrice?: number
  changedAt: string
}

export type ProductModel = {
  id: string
  name: string
  dateCreated: string
  price: number
  storebelong: string
  boughtQuantity: number
  category: string
  priceHistory: PriceHistoryModel[]
  unit: string
}
