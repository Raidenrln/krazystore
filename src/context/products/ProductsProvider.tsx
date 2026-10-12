import { useContext, useEffect, useState, type ReactNode } from "react";
import { ProductContext } from "./ProductsContext";
import type { ProductModel } from "../../models/productModel";
import { StoreContext } from "../store/StoreContext";

export type EditingProductModel = {
  name: string;
  price: number;
  storeBelong: string;
  category: string;
  unit: string;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { deleteProductFromStore } = useContext(StoreContext)!;
  const [products, setProducts] = useState<ProductModel[]>(() =>  {
    const savingProducts = localStorage.getItem("savedProducts");
    return savingProducts ? JSON.parse(savingProducts) : []});
  const { setStores } = useContext(StoreContext)!;
  const now = new Date();
  const addingProduct = (newProduct: ProductModel, storeId: string) => {
    setProducts((prev) => [...prev, newProduct]);
    setStores((prev) =>
      prev.map((s) => (s.id === storeId ? { ...s, products: [...s.products, newProduct] } : s)),
    );
  };

  const editingProduct = (productId: string, targetProduct: EditingProductModel) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;

        if (p.price !== targetProduct.price) {
          return {
            ...p,
            ...targetProduct,
            priceHistory: [
              ...p.priceHistory,
              { previousPrice: p.price, newPrice: targetProduct.price, changedAt: now.toISOString() },
            ],
          };
        }

        return { ...p, ...targetProduct };
      }),
    );
  };

  const deleteProduct = (productId: string) => {
  deleteProductFromStore(productId)

  setProducts((prev) => prev.filter((p) => p.id !== productId));
};

  useEffect(() => {
    localStorage.setItem("savedProducts", JSON.stringify(products))
    console.log("Products:", products);
  }, [products]);
  return (
    <ProductContext.Provider value={{ products, addingProduct, editingProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
