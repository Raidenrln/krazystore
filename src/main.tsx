import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/store/StoreProvider.tsx";
import { ProductProvider } from "./context/products/ProductsProvider.tsx";
import { CartProvider } from "./context/cart/CartProvider.tsx";
import { ReceiptContext } from "./context/receipt/ReceiptContext.tsx";
import { ReceiptProvider } from "./context/receipt/ReceiptProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ProductProvider>
          <CartProvider>
            <ReceiptProvider>
              <App />
            </ReceiptProvider>
          </CartProvider>
        </ProductProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
