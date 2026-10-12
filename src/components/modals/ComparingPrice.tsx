import { useContext, useMemo, useState } from "react";
import { ProductContext } from "../../context/products/ProductsContext";
import { ShoppingCart, X } from "lucide-react";
import { StoreContext } from "../../context/store/StoreContext";
import { CartContext } from "../../context/cart/CartContext";

type ComparingPriceModel = {
  name: string;
  onClose: () => void;
  targetProduct: string;
};

const formatPrice = (value: number) => `₱${value.toFixed(2)}`;

const SelectedBadge = () => (
  <span className="flex bg-violet-950 text-[10px] text-violet-300 font-bold items-center rounded px-1 border border-violet-500">
    Selected
  </span>
);

const ComparingPrice = ({ name, onClose, targetProduct }: ComparingPriceModel) => {
  const { products } = useContext(ProductContext)!;
  const { stores } = useContext(StoreContext)!;
  const { addCartItem } = useContext(CartContext)!;

  const [category, setCategory] = useState<"lowest" | "highest">("lowest");
  const [choosingProduct, setChoosingProduct] = useState(targetProduct);

  // All products with the same name (every store that sells it).
  const sameNameProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase() === name.toLowerCase()),
    [products, name],
  );

  const targetProductShow = products.find((p) => p.id === targetProduct);
  const targetStore = stores.find((s) => s.id === targetProductShow?.storebelong);

  const prices = sameNameProducts.map((p) => p.price);
  const lowestPrice = prices.length ? Math.min(...prices) : 0;
  const highestPrice = prices.length ? Math.max(...prices) : 0;
  const hasPriceRange = lowestPrice !== highestPrice;

  // Rank across ALL stores (including the target) so the numbers are meaningful,
  // then hide the target from the list since it already has its own card above.
  const rankedList = useMemo(() => {
    const sorted = [...sameNameProducts].sort((a, b) =>
      category === "lowest" ? a.price - b.price : b.price - a.price,
    );
    return sorted
      .map((p, i) => ({ product: p, rank: i + 1 }))
      .filter(({ product }) => product.id !== targetProduct);
  }, [sameNameProducts, category, targetProduct]);

  if (!targetProductShow) return null;

  const handleAddCart = () => {
    if (!choosingProduct) return;
    addCartItem(choosingProduct, 1);
    onClose();
  };

  const priceTag = (price: number) => {
    if (!hasPriceRange) return null;
    if (price === lowestPrice) return { label: "Lowest", className: "text-emerald-300" };
    if (price === highestPrice) return { label: "Highest", className: "text-red-300" };
    return null;
  };

  const targetTag = priceTag(targetProductShow.price);

  return (
    <main className="w-full flex flex-col">
      <div className="text-white flex bg-(--bg-panel) rounded-t-2xl flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2.5">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">Comparing prices</h1>
            <p className="text-[13px] text-(--text-muted)">
              {name} • {sameNameProducts.length}{" "}
              {sameNameProducts.length === 1 ? "store" : "stores"} tracking
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="bg-(--bg-button) p-2 rounded-2xl"
          >
            <X />
          </button>
        </div>

        {/* Target product */}
        <div className="w-full flex items-center px-4 pb-4">
          <button
            type="button"
            className={`w-full flex items-center justify-between bg-(--bg-button) px-2 py-3 rounded-xl border text-left ${
              choosingProduct === targetProductShow.id
                ? "border-emerald-300"
                : "border-(--border-light)"
            }`}
            onClick={() => setChoosingProduct(targetProduct)}
          >
            <div className="w-full flex flex-col justify-center border-r border-(--border-light) px-2 gap-1">
              <div className="flex gap-1">
                <span className="text-[13px] font-bold">{targetStore?.name}</span>
                {choosingProduct === targetProduct && <SelectedBadge />}
              </div>
              <span className="text-(--text-muted) text-[12px]">{targetStore?.category}</span>
            </div>
            <div className="w-full flex flex-col justify-center text-end px-2">
              <span className="text-[22px] font-bold">{formatPrice(targetProductShow.price)}</span>
              <span className="text-[12px] text-(--text-muted)">
                / {targetProductShow.unit}
                {targetTag && (
                  <span className={`ml-1 ${targetTag.className}`}>• {targetTag.label}</span>
                )}
              </span>
            </div>
          </button>
        </div>

        {/* Category Tab */}
        <div className="w-full flex items-center px-4 pb-4 gap-2">
          {(["lowest", "highest"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-3xl text-[12px] font-semibold border border-(--border-light) ${
                category === c ? "bg-(--primary-color)" : "bg-(--bg-panel)"
              }`}
            >
              {c === "lowest" ? "Lowest price" : "Highest price"}
            </button>
          ))}
        </div>

        {/* Compared List */}
        {rankedList.length === 0 && (
          <p className="px-4 pb-4 text-[13px] text-(--text-muted)">
            No other stores are tracking this product yet.
          </p>
        )}
        {rankedList.map(({ product: p, rank }) => {
          const store = stores.find((s) => s.id === p.storebelong);
          const tag = priceTag(p.price);
          const diff = p.price - targetProductShow.price;
          return (
            <div key={p.id} className="w-full flex items-center px-4 pb-4">
              <button
                type="button"
                onClick={() => setChoosingProduct(p.id)}
                className={`w-full flex items-center bg-(--bg-button) h-16 border p-2 rounded-2xl text-left ${
                  choosingProduct === p.id ? "border-emerald-300" : "border-(--border-light)"
                }`}
              >
                <div className="flex pr-2">
                  <span className="bg-(--primary-color) w-7 h-7 text-[12px] rounded-full flex items-center justify-center">
                    {rank}
                  </span>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex text-[13px] gap-1">
                    <span className="font-bold">{store?.name}</span>
                    {tag?.label === "Lowest" && (
                      <div className="bg-emerald-300 text-[10px] text-(--primary-bg) font-bold flex items-center rounded px-1">
                        <span>BEST</span>
                      </div>
                    )}
                    {tag?.label === "Highest" && (
                      <div className="bg-red-300 text-[10px] text-(--primary-bg) font-bold flex items-center rounded px-1">
                        <span>HIGHEST</span>
                      </div>
                    )}
                    {choosingProduct === p.id && <SelectedBadge />}
                  </div>
                  <span className="text-(--text-muted) text-[12px]">{store?.category}</span>
                </div>
                <div className="flex flex-col pr-2 items-end">
                  <span className="text-[18px] font-bold">{formatPrice(p.price)}</span>
                  <span
                    className={`text-[12px] ${
                      diff < 0 ? "text-emerald-300" : diff > 0 ? "text-red-300" : "text-(--text-muted)"
                    }`}
                  >
                    {diff === 0
                      ? "Same price"
                      : `${diff < 0 ? "-" : "+"}${formatPrice(Math.abs(diff))}`}
                  </span>
                </div>
              </button>
            </div>
          );
        })}

        {/* Add to Cart button */}
        <div className="px-4 pb-4">
          <button
            type="button"
            disabled={!choosingProduct}
            onClick={handleAddCart}
            className="w-full flex items-center justify-center gap-4 bg-(--primary-color) p-4 rounded-2xl disabled:opacity-50"
          >
            <ShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ComparingPrice;