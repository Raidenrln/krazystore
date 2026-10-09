import { createContext } from "react";

export type StoreCategoryModel = {
  id: string;
  name: string;
};

export type ProductCategoryModel = {
  id: string;
  name: string;
};

interface CategoryContextModel {
  storeCategories: StoreCategoryModel[];
  addingStoreCategories: (name: string) => void;
  productCategories: ProductCategoryModel[];
  addingProductCategories: (name: string) => void;
  removeStoreCategory: (id: string) => void;
  removeProductCategory: (id: string) => void;
}

export const CategoryContext = createContext<CategoryContextModel | null>(null);
