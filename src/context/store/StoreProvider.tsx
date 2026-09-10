import { useEffect, useState, type ReactNode } from "react";
import { StoreContext } from "./StoreContext";
import type { StoreModel } from "../../models/storeModel";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [stores, setStores] = useState<StoreModel[]>([]);

  const addStore = ( newStore: StoreModel ) => {
    setStores(prev => [...prev, newStore])
  }
  useEffect(() => {
    console.log("Stores updated:", stores);
  }, [stores]);
  return (
    <StoreContext.Provider value={{ stores, addStore, setStores }}>
      {children}
    </StoreContext.Provider>
  );
};