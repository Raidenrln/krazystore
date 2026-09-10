import { createContext } from "react";
import type { ProductModel } from "../../models/productModel";

export interface ProductContextModel {
  products: ProductModel[]
  addingProduct: (newProduct: ProductModel, storeId: string) => void
}

export const ProductContext = createContext<ProductContextModel | null>(null)
