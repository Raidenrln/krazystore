import { useEffect, useState, type ReactNode } from "react";
import {
  CategoryContext,
  type ProductCategoryModel,
  type StoreCategoryModel,
} from "./CategoryContext";

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [storeCategories, setStoreCategories] = useState<StoreCategoryModel[]>(() => {
    const storeCategoriesSave = localStorage.getItem("storeCategoriesSave");
    return storeCategoriesSave ? JSON.parse(storeCategoriesSave) : [];
  });

  const [productCategories, setProductCategories] = useState<ProductCategoryModel[]>(() => {
    const productCategoriesSave = localStorage.getItem("productCategoriesSave");
    return productCategoriesSave ? JSON.parse(productCategoriesSave) : [];
  });

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

  useEffect(() => {
    localStorage.setItem("storeCategoriesSave", JSON.stringify(storeCategories));
  }, [storeCategories]);
  useEffect(() => {
    localStorage.setItem("productCategoriesSave", JSON.stringify(productCategories));
  }, [productCategories]);
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
