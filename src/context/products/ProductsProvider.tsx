import { useContext, useState, type ReactNode } from "react";
import { ProductContext } from "./ProductsContext";
import type { ProductModel } from "../../models/productModel";
import { StoreContext } from "../store/StoreContext";

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { setStores } = useContext(StoreContext)!;
  const addingProduct = (newProduct: ProductModel, storeId: string) => {
    setProducts((prev) => [...prev, newProduct]);
    setStores((prev) => prev.map((s) => s.id === storeId ? { ...s, products: [...s.products, newProduct] }: s ));
  };

  return (
    <ProductContext.Provider value={{ products, addingProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
