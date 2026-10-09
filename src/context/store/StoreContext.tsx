import { createContext } from "react";
import type { StoreModel } from "../../models/storeModel";
import type { EditedStore } from "./StoreProvider";

export type StoreContextType = {
  stores: StoreModel[];
  setStores: React.Dispatch<React.SetStateAction<StoreModel[]>>;
  addStore: (newStore: StoreModel) => void;
  editingStore: (storeId: string, store: EditedStore) => void;
  deleteStore: (storeId: string) => void;
};

export const StoreContext = createContext<StoreContextType | null>(null);