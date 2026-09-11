import { Eye, Trash } from "lucide-react";
import { useContext, useState } from "react";
import { ReceiptContext } from "../context/receipt/ReceiptContext";
import { ProductContext } from "../context/products/ProductsContext";
import ShowMoreDetails from "../components/modals/ShowMoreDetails";
import { useOutletContext } from "react-router-dom";

interface NavbarContextType {
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Expenses = () => {
  const { products } = useContext(ProductContext)!;
  const { receipt } = useContext(ReceiptContext)!;
  const [showDetails, setShowDetails] = useState(false);
  const { setShowNavbar } = useOutletContext<NavbarContextType>();
  const [receiptId, setReceiptId] = useState("");

  const handleShowDetails = (id: string) => {
    setReceiptId(id);
    setShowDetails(true)
    setShowNavbar(false)
  }
  return (
    <main>
      <div className="sm:hidden w-full items-center flex flex-col p-4 gap-4 pb-22">
        <div className="w-full text-white">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-[12px] text-(--text-muted)">
            Tracked prices, check out, and keep every receipt.
          </p>
        </div>

        <div className="w-full bg-(--bg-panel) border border-(--border-light) rounded-2xl">
          <div className="w-full p-4 flex gap-1.5 items-center">
            <span className="font-bold text-[14px] text-white">Receipts</span>

            <div className="min-w-6 h-6 px-1 flex items-center justify-center rounded-full bg-(--primary-color) shrink-0">
              <span className="text-[10px] leading-none">{receipt.length}</span>
            </div>
          </div>

          <hr className="w-full border-t border-(--border-light)" />

          {receipt.map((r) => {
            const total = r.products.reduce((sum, receiptProduct) => {
              const product = products.find((p) => p.id === receiptProduct.id);

              return sum + (product?.price ?? 0) * receiptProduct.quantity;
            }, 0);

            const totalQuantity = r.products.reduce((sum, product) => sum + product.quantity, 0);

            return (
              <div key={r.id} className="flex w-full justify-between p-4">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-[13px] text-white">{r.id}</span>

                  <span className="text-(--text-muted) text-[12px]">
                    {r.createdAt} • {totalQuantity} items
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="text-[14px] text-white">₱{total.toFixed(2)}</span>

                  <Eye onClick={() => handleShowDetails(r.id)} size={16} className="text-(--text-muted)" />

                  <Trash size={16} className="text-(--text-muted)" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0">
          <ShowMoreDetails receiptId={receiptId} onClose={() => setShowDetails(false)} openNav={() => setShowNavbar(true)}/>
        </div>
      )}
    </main>
  );
};

export default Expenses;
