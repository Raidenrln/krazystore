import { useState, type ReactNode } from "react";
import {
  CategoryContext,
  type ProductCategoryModel,
  type StoreCategoryModel,
} from "./CategoryContext";

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [storeCategories, setStoreCategories] = useState<StoreCategoryModel[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategoryModel[]>([]);

  const addingStoreCategories = (name: string) => {
    const newCategory: StoreCategoryModel = {
      id: crypto.randomUUID(),
      name,
    };

    setStoreCategories((prev) => [...prev, newCategory]);
  };

  const addingProductCategories = (name: string) => {
    const newCategory: ProductCategoryModel = {
      id: crypto.randomUUID(),
      name,
    };

    setProductCategories((prev) => [...prev, newCategory]);
  };

  const removeStoreCategory = (id: string) => {
    setStoreCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const removeProductCategory = (id: string) => {
    setProductCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{
        storeCategories,
        addingStoreCategories,
        removeStoreCategory,
        productCategories,
        addingProductCategories,
        removeProductCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
