import type { ProductModel } from "./productModel"

export type StoreModel = {
  id: string
  name: string
  location: string
  category: string
  opentime: string
  closetime: string
  facebook: string
  products: ProductModel[]
  totalSpend: number
  isFavorite: boolean
  createdDate: string
}