import { useContext, useEffect, useState, type ReactNode } from "react";
import { ProductContext } from "./ProductsContext";
import type { ProductModel } from "../../models/productModel";
import { StoreContext } from "../store/StoreContext";

export type EditingProductModel = {
  name: string
  price: number
  storeBelong: string
  category: string
  unit: string
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { setStores } = useContext(StoreContext)!;

  const addingProduct = (newProduct: ProductModel, storeId: string) => {
    setProducts((prev) => [...prev, newProduct]);
    setStores((prev) =>
      prev.map((s) => (s.id === storeId ? { ...s, products: [...s.products, newProduct] } : s)),
    );
  };

  const editingProduct = (productId: string, targetProduct: EditingProductModel) => {
    setProducts(prev => prev.map(p => p.id === productId ? {...p, ...targetProduct} : p))
  }

  useEffect(() => {
    console.log("Products:", products);
  }, [products]);
  return (
    <ProductContext.Provider value={{ products, addingProduct, editingProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
