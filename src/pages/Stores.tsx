import { Search, Plus, Pencil, Trash, MapPin, Clock, Calendar } from "lucide-react";
import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddingStore from "../components/modals/AddingStore";
import { StoreContext } from "../context/store/StoreContext";
import { CategoryContext } from "../context/category/CategoryContext";
import EditingStore from "../components/modals/EditingProduct";

interface NavbarContextType {
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Stores = () => {
  const { setShowNavbar } = useOutletContext<NavbarContextType>();
  const { stores, deleteStore } = useContext(StoreContext)!;
  const [isAddingStoreOpen, setIsAddingStoreOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { storeCategories } = useContext(CategoryContext)!;
  const [searchValue, setSearchValue] = useState("");
  const [editing, setEditing] = useState(false);
  const [targetStore, setTargetStore] = useState("");
  const handleOpenAddStore = () => {
    setIsAddingStoreOpen(true);
    setShowNavbar(false);
  };

  const handleCloseAddProduct = () => {
    setIsAddingStoreOpen(false);
    setShowNavbar(true);
  };

  const handleEditing = (store: string) => {
    setEditing(true)
    setTargetStore(store)
  }
  const handleCloseEdit = () => {
    setEditing(false)
  }

  const hoursToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const isStoreOpen = (openTime: string, closeTime: string) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const open = hoursToMinutes(openTime);
    const close = hoursToMinutes(closeTime);

    if (open <= close) {
      return currentTime >= open && currentTime < close;
    } else {
      return currentTime >= open || currentTime < close;
    }
  };

  const filteredStores = stores.filter((store) => {
    const matchesCategory =
      activeTab === "all" ||
      (activeTab === "open"
        ? isStoreOpen(store.opentime, store.closetime)
        : store.category.trim().toLowerCase() === activeTab.trim().toLowerCase());

    const matchesSearch = store.name.toLowerCase().includes(searchValue.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen w-full flex flex-col ">
      {/* Mobile devices store list */}
      <div className="sm:hidden flex flex-col gap-4 p-4">
        <div className="text-white flex w-full justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Stores</h1>
            <p className="text-[12px] text-(--text-muted)">
              Every store you visit with open/closed status.
            </p>
          </div>
          <button
            onClick={() => handleOpenAddStore()}
            className="bg-(--primary-color) text-(--bg-panel) px-4 h-10 rounded-lg font-semibold text-[13px] flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="max-[411px]:hidden">Add Store</span>
          </button>
        </div>
        {/* Search store */}
        <div className="text-white relative flex flex-col w-full gap-3 tems-center">
          <div className="flex w-full items-center gap-2">
            <input
              className="rounded-lg py-2 pl-10 flex-1 bg-(--bg-panel) text-[14px]"
              type="search"
              placeholder="Search by name, name of the store"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span className="text-(--text-muted) text-[12px]">1 of 1 stores</span>
            <Search size={18} className="absolute left-3 top-4.5 -translate-y-1/2 text-stone-400" />
          </div>

          <div className="flex overflow-x-scroll gap-2 w-full" style={{ scrollbarWidth: "none" }}>
            <div
              className={`w-auto px-4 py-1 rounded-full  border border-(--border-light) ${activeTab === "all" ? "bg-(--primary-color) text-white" : "bg-(--bg-panel) text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("all")}
            >
              <span className="text-[13px]">All</span>
            </div>
            <div
              className={` w-auto px-4 py-1 rounded-full border border-(--border-light) ${activeTab === "open" ? "bg-(--primary-color) text-white" : "bg-(--bg-panel) text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("open")}
            >
              <span className="text-[13px]">Open</span>
            </div>
            {storeCategories.map((s) => {
              return (
                <div
                  key={s.id}
                  className={` w-auto px-4 py-1 rounded-full border border-(--border-light) ${activeTab === s.name ? "bg-(--primary-color) text-white" : "bg-(--bg-panel) text-gray-400 hover:text-white"}`}
                  onClick={() => setActiveTab(s.name)}
                >
                  <span className="text-[13px]">{s.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Store list content */}
        <div className="flex flex-col gap-4 pb-18">
          {filteredStores.map((s) => {
            return (
              <div
                key={s.id}
                className="w-full bg-(--bg-panel) border border-(--border-light) rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="text-white flex justify-between items-center">
                  <span className="font-bold text-[14px]">{s.name}</span>
                  {isStoreOpen(s.opentime, s.closetime) ? (
                    <div className="flex bg-(--open-bg) px-2 py-0.5 rounded-full">
                      <span className="text-[12px] text-(--open) font-semibold">• Open</span>
                    </div>
                  ) : (
                    <div className="flex bg-red-500/10 px-2 py-0.5 rounded-full">
                      <span className="text-[12px] text-red-500 font-semibold">• Closed</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-(--primary-color) bg-(--primary-bg-color) flex items-center rounded-full px-2">
                    {s.category}
                  </span>
                  <div className="flex gap-3">
                    <Pencil size={18} className="text-(--text-muted)" onClick={() => {handleEditing(s.id); setShowNavbar(false);}} />
                    <Trash size={18} className="text-(--text-muted)" onClick={() => deleteStore(s.id)}/>
                  </div>
                </div>

                <div className="flex flex-col text-(--text-muted) text-[12px] gap-2">
                  <div className="flex gap-2">
                    <MapPin size={16} />
                    <span>{s.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <Clock size={16} />
                    <span>
                      {s.opentime} - {s.closetime}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Calendar size={16} />
                    <span>Added {s.createdDate}</span>
                  </div>
                </div>

                <hr className="w-[95%] text-(--border-light)"></hr>

                <div className="flex items-center justify-between text-(--text-muted) text-[12px]">
                  <span>{s.facebook ? s.facebook : "no facebook page"}</span>
                  <span>
                    {s.products.length} products • ₱{s.totalSpend} spent
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isAddingStoreOpen && (
        <div className="fixed bottom-0 w-full">
          <AddingStore onClose={handleCloseAddProduct} />
        </div>
      )}
      {editing && (
        <div className="fixed bottom-0 w-full">
          <EditingStore store={targetStore} onClose={handleCloseEdit}/>
        </div>
      )}
    </main>
  );
};

export default Stores;
