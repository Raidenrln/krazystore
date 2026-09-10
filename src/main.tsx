import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/store/StoreProvider.tsx";
import { ProductProvider } from "./context/products/ProductsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
