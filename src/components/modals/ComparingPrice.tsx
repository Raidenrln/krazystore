import { useContext, useState } from "react";
import { ProductContext } from "../../context/products/ProductsContext";
import { X } from "lucide-react";
import { StoreContext } from "../../context/store/StoreContext";

type ComparingPriceModel = {
  name: string;
  onClose: () => void;
};

const ComparingPrice = ({ name, onClose }: ComparingPriceModel) => {
  const { products } = useContext(ProductContext)!;
  const { stores } = useContext(StoreContext)!;
  const productName = products.filter(
    (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
  );
  const [category, setCategory] = useState<"lowest" | "highest">("lowest");

  const productComparedList = [...productName].sort((a, b) =>
    category === "lowest" ? a.price - b.price : b.price - a.price,
  );
  console.log("Products", productName);
  return (
    <main className="w-full flex flex-col">
      <div className="text-white flex bg-(--bg-panel) rounded-t-2xl flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2.5">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">Comparing prices</h1>
            <p className="text-[13px] text-(--text-muted)">
              {name} • {productName.length} Stores Tracking.
            </p>
          </div>
          <div className="bg-(--bg-button) p-2 rounded-2xl">
            <X onClick={() => onClose()} />
          </div>
        </div>
        {/* Compared Price */}
        <div className="w-full flex items-center px-4 pb-4">
          <div className="w-full flex items-center justify-between bg-(--bg-button) px-2 py-4 rounded-xl">
            <div className="w-full flex flex-col justify-center border-r border-(--border-light) px-2">
              <span className="text-[12px] text-(--text-muted)">LOWEST PRICE</span>
              <span className="text-[22px] font-bold">₱20.00</span>
            </div>
            <div className="w-full flex flex-col justify-center text-end border-l border-(--border-light) px-2">
              <span className="text-[12px] text-(--text-muted)">YOU COULD SAVE</span>
              <span className="text-[22px] font-bold">₱7.00</span>
            </div>
          </div>
        </div>
        {/* Category Tab */}
        <div className="w-full flex items-center px-4 pb-4 gap-2">
          <button
            onClick={() => setCategory("lowest")}
            className={`px-4 py-2 rounded-3xl text-[12px] font-semibold ${category === "lowest" ? "bg-(--primary-color) border border-(--border-light)" : "bg-(--bg-panel) border border-(--border-light)"}`}
          >
            Lowest price
          </button>
          <button
            onClick={() => setCategory("highest")}
            className={`px-4 py-2 rounded-3xl text-[12px] font-semibold ${category === "highest" ? "bg-(--primary-color) border border-(--border-light)" : "bg-(--bg-panel) border border-(--border-light)"}`}
          >
            Highest price
          </button>
        </div>
        {/* Compared List */}
        {productComparedList.map((p) => {
          return (
            <div className="w-full flex items-center px-4 pb-4">
              <div className="w-full flex items-center bg-(--bg-button) h-16 border border-emerald-300 p-2 rounded-2xl">
                <div className="flex pr-2">
                  <span className="bg-(--primary-color) w-7 h-7 text-[12px] rounded-full flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex text-[13px] gap-1">
                    <span className="font-bold">{p.storebelong}</span>
                    <div className="bg-emerald-300 text-[10px] text-(--primary-bg) font-bold flex items-center rounded px-1">
                      <span>BEST</span>
                    </div>
                    <span className="flex bg-violet-1100 text-[10px] text-violet-300 font-bold items-center rounded px-1 border border-violet-500">
                      Selected
                    </span>
                  </div>
                  <div className="text-(--text-muted) text-[12px]">
                    <span>10/10/2026</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col pr-2">
                    <span className="text-[18px] font-bold">₱{p.price.toFixed(2)}</span>
                    <span className="text-[12px] text-end text-emerald-300">Lowest</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ComparingPrice;
