import { useContext } from "react";
import { ReceiptContext } from "../../context/receipt/ReceiptContext";
import { ProductContext } from "../../context/products/ProductsContext";

interface ShowMoreDetailsProps {
  receiptId: string;
  onClose: () => void;
  openNav: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

const ShowMoreDetails = ({ receiptId, onClose, openNav }: ShowMoreDetailsProps) => {
  const { receipt } = useContext(ReceiptContext)!;
  const { products } = useContext(ProductContext)!;
  
  const targetReceipt = receipt.find((r) => r.id === receiptId);

  const handleCloseDetails = () => {
    onClose();
    openNav();
  }

  const targetProducts = products
    .map((product) => {
      const receiptProduct = targetReceipt?.products.find(
        (rp) => rp.id === product.id
      );
      if (!receiptProduct) return null;
      return { ...product, quantity: receiptProduct.quantity };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const total = targetProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  if (!targetReceipt) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleCloseDetails}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-white">Receipt Details</h2>
            <p className="mt-1 break-all text-xs text-neutral-500">
              {targetReceipt.id}
            </p>
          </div>
          <button
            onClick={handleCloseDetails}
            className="ml-4 shrink-0 rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 px-6 pt-4 text-sm text-neutral-400">
          <span>{targetReceipt.createdAt}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span>{targetProducts.length} items</span>
        </div>

        {/* Product list */}
        <div className="mt-3 max-h-80 space-y-2 overflow-y-auto px-6 py-2">
          {targetProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {product.name}
                </p>
                <p className="text-xs text-neutral-500">
                  Qty: {product.quantity} × {formatCurrency(product.price)}
                </p>
              </div>
              <p className="text-sm font-semibold text-white">
                {formatCurrency(product.price * product.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer / total */}
        <div className="flex items-center justify-between border-t border-neutral-800 px-6 py-5">
          <span className="text-sm font-medium text-neutral-400">Total</span>
          <span className="text-xl font-bold text-purple-400">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowMoreDetails;