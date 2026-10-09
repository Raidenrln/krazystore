import { useEffect, useState, type ReactNode } from "react";
import { StoreContext } from "./StoreContext";
import type { StoreModel } from "../../models/storeModel";

export type EditedStore = {
  name: string;
  location: string;
  category: string;
  opentime: string;
  closetime: string;
  facebook: string;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [stores, setStores] = useState<StoreModel[]>([]);

  const addStore = ( newStore: StoreModel ) => {
    setStores(prev => [...prev, newStore])
  }

  const editingStore = (storeId: string, editedStore: EditedStore) => {
    setStores(prev => prev.map(store => store.id === storeId ? {...store, ...editedStore} : store))
    console.log(stores)
  }

  const deleteStore = (store: string) => {
    setStores(prev => prev.filter(s => s.id !== store))
  }

  useEffect(() => {
    console.log("Stores updated:", stores);
  }, [stores]);
  return (
    <StoreContext.Provider value={{ stores, addStore, setStores, editingStore, deleteStore }}>
      {children}
    </StoreContext.Provider>
  );
};