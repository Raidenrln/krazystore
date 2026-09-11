import { Search, Calendar, Scale, ShoppingCart, PenLine, Trash, Plus } from "lucide-react";
import AddingProduct from "../components/modals/AddingProduct";
import { useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../context/products/ProductsContext";
import { StoreContext } from "../context/store/StoreContext";
import { CartContext } from "../context/cart/CartContext";

interface NavbarContextType {
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Products = () => {
  const { products } = useContext(ProductContext)!;
  const { stores } = useContext(StoreContext)!;
  const { addCartItem } = useContext(CartContext)!;
  const { setShowNavbar } = useOutletContext<NavbarContextType>();
  const [isAddingProductOpen, setIsAddingProductOpen] = useState(false);
  const handleOpenAddProduct = () => {
    setIsAddingProductOpen(true);
    setShowNavbar(false);
  };
  const handleCloseAddProduct = () => {
    setIsAddingProductOpen(false);
    setShowNavbar(true);
  };
  // type StoreCategory =
  //   | "Convenience Store"
  //   | "Grocery"
  //   | "Restaurant"
  //   | "Karinderya"
  //   | "Fast Food"
  //   | "Cafe"
  //   | "Bakery"
  //   | "Food Stall"
  //   | "Public Market"
  //   | "Other";

  return (
    <main className="min-h-screen w-full flex flex-col">
      <div className="sm:hidden w-full items-center flex flex-col p-4 gap-4 2">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-(--text-light) text-">Products</h1>
            <p className="text-[12px] text-(--text-muted)">
              Prices you track across stores — compare and shop smarter.
            </p>
          </div>
          <button
            onClick={() => handleOpenAddProduct()}
            className="bg-(--primary-color) text-(--bg-panel) px-3 h-10 rounded-lg font-semibold text-[13px] flex items-center gap-2"
          >
            <Plus size={20} /> <span className="max-[508px]:hidden">Add Product</span>
          </button>
        </div>

        {/* Input and Product Categories */}
        <div className="w-full flex flex-col gap-3 scrollbar-hide">
          <div className="text-white relative flex w-full gap-2 items-center">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              className="rounded-lg py-2 pl-10 pr-2 flex-1 bg-(--bg-panel) text-[14px]"
              type="search"
              placeholder="Search an Products"
            />
          </div>
          <div className="flex overflow-x-scroll gap-2 w-full" style={{ scrollbarWidth: "none" }}>
            <div className="bg-(--primary-color) w-auto px-4 py-1 rounded-full">
              <span className="text-[13px]">All</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Grocery</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Convenience Store</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Karinderya</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Fast Food</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Cafe</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Bakery</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Food Stall</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Public Market</span>
            </div>
            <div className="bg-(--primary-color) shrink-0 px-2 py-1 rounded-full">
              <span className="text-[13px]">Other</span>
            </div>
          </div>
        </div>

        {/*  */}
        {products.map((e) => {
          const targetStore = stores.find(s => s.id === e.storebelong);
          
          return (
            <div key={e.id} className="bg-(--bg-panel) w-full rounded-2xl">
              <div className="flex justify-between text-white p-4">
                <div>
                  <h1 className="text-[16px]">{e.name}</h1>
                  <span className="text-[14px] text-(--text-muted)">Other • {targetStore?.name ?? "unknown store"}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[24px]">₱{e.price}</span>
                  <span className="text-[14px] text-(--text-muted)">/ {e.unit}</span>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <hr className="w-[95%] border-t border-dashed border-(--border-light)" />
              </div>
              <div className="w-full flex p-4 justify-between text-white">
                <div className="flex gap-2 text-[12px] text-(--text-muted) items-center">
                  <Calendar size={14} />
                  <span>{e.dateCreated}</span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-(--bg-button) p-2 rounded-xl">
                    <Scale size={16} />
                  </button>
                  <button onClick={() => addCartItem(e.id, 1)} className="bg-(--bg-button) p-2 rounded-xl">
                    <ShoppingCart size={16} />
                  </button>
                  <button className="bg-(--bg-button) p-2 rounded-xl">
                    <PenLine size={16} />
                  </button>
                  <button className="bg-(--bg-button) p-2 rounded-xl">
                    <Trash size={16} color="red" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/*  */}
      {isAddingProductOpen && (
        <div className="fixed bottom-0 w-full">
          <AddingProduct onClose={handleCloseAddProduct} />
        </div>
      )}
    </main>
  );
};

export default Products;
