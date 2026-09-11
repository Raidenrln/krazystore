import { createContext } from "react";
import type { StoreModel } from "../../models/storeModel";

export type StoreContextType = {
  stores: StoreModel[];
  setStores: React.Dispatch<React.SetStateAction<StoreModel[]>>;
  addStore: (newStore: StoreModel) => void;
};

export const StoreContext = createContext<StoreContextType | null>(null);