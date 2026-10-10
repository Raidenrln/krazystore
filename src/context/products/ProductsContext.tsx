import { createContext } from "react";
import type { ProductModel } from "../../models/productModel";
import type { EditingProductModel } from "./ProductsProvider";

export interface ProductContextModel {
  products: ProductModel[];
  addingProduct: (newProduct: ProductModel, storeId: string) => void;
  editingProduct: (productId: string, targetProduct: EditingProductModel) => void;
}

export const ProductContext = createContext<ProductContextModel | null>(null);
