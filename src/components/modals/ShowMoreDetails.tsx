import { useContext } from "react";
import { X } from "lucide-react";
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
  };

  const targetProducts = products
    .map((product) => {
      const receiptProduct = targetReceipt?.products.find((rp) => rp.id === product.id);
      if (!receiptProduct) return null;
      return { ...product, quantity: receiptProduct.quantity };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const total = targetProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (!targetReceipt) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleCloseDetails}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-(--border-light) bg-(--bg-panel) text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-4 pb-2.5">
          <div className="flex flex-col">
            <h2 className="text-[15px] font-semibold">Receipt details</h2>
            <p className="break-all text-[13px] text-(--text-muted)">{targetReceipt.id}</p>
          </div>
          <button
            type="button"
            onClick={handleCloseDetails}
            className="ml-4 shrink-0 rounded-2xl bg-(--bg-button) p-2"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 px-4 pb-3 text-[13px] text-(--text-muted)">
          <span>{targetReceipt.createdAt}</span>
          <span className="h-1 w-1 rounded-full bg-(--border-light)" />
          <span>
            {targetProducts.length} {targetProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Product list */}
        <div className="max-h-80 space-y-2 overflow-y-auto px-4 pb-4">
          {targetProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-2xl border border-(--border-light) bg-(--bg-button) px-3 py-3"
            >
              <div className="flex flex-col gap-1">
                <p className="text-[13px] font-bold">{product.name}</p>
                <p className="text-[12px] text-(--text-muted)">
                  Qty: {product.quantity} × {formatCurrency(product.price)}
                </p>
              </div>
              <p className="text-[15px] font-bold">
                {formatCurrency(product.price * product.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer / total */}
        <div className="flex items-center justify-between border-t border-(--border-light) px-4 py-4">
          <span className="text-[13px] font-medium text-(--text-muted)">Total</span>
          <span className="text-[22px] font-bold text-emerald-300">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowMoreDetails;