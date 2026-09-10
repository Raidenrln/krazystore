import { X } from "lucide-react";
import { useContext, useState, type FormEvent } from "react";
import { StoreContext } from "../../context/store/StoreContext";
import type { StoreModel } from "../../models/storeModel";
import { v4 as uuidv4 } from 'uuid';
interface AddingStoreProps {
  onClose: () => void;
}

const AddingStore = ({ onClose }: AddingStoreProps) => {
  const { addStore } = useContext(StoreContext)!;
  const [IsStorename, setStorename] = useState("");
  const [IsStoreLocation, setStoreLocation] = useState("")
  const [IsStoreCategory, setStoreCategory] = useState("")
  const [isOpenTime, setOpentime] = useState("08:00")
  const [isCloseTime, setCloseTime] = useState("20:00")
  const [isfacebook, setFacebookPage] = useState("")
  
  const createdDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const handleAddingStore = (e: FormEvent) => {
    e.preventDefault();
    const newStore: StoreModel = {
      id: uuidv4(),
      name: IsStorename,
      location: IsStoreLocation,
      category: IsStoreCategory,
      opentime: isOpenTime,
      closetime: isCloseTime,
      facebook: isfacebook,
      products: [],
      totalSpend: 0,
      isFavorite: false,
      createdDate: createdDate
    }
    addStore(newStore);
    onClose();
  }
  return (
    <main className="w-full">
      <div className="text-white flex bg-(--bg-panel) rounded-t-2xl flex-col">
        <div className="flex justify-between w-full p-4">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">Track a Store</h1>
            <p className="text-[13px] text-(--text-muted)">Track a store you regularly visit.</p>
          </div>
          <X onClick={() => onClose()} />
        </div>
        <hr className="border-0 border-t border-(--text-muted)/50" />
        <form onSubmit={handleAddingStore} id="storeForm" className="p-4 flex gap-4 flex-col">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="Store name" className="text-[12.5px] font-semibold">
              Store name*
            </label>
            <input
              id="Store name"
              type="text"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2"
              value={IsStorename}
              onChange={e => setStorename(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="Location" className="text-[12.5px] font-semibold">
              Location*
            </label>
            <input
              id="Location"
              type="text"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2"
              value={IsStoreLocation}
              onChange={e => setStoreLocation(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1 relative">
            <label htmlFor="Category" className="text-[12.5px] font-semibold">
              Category*
            </label>
            <input
              id="Category"
              type="text"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2"
              value={IsStoreCategory}
              onChange={e => setStoreCategory(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex gap-1 items-center">
            <label htmlFor="Open at" className="text-[12.5px] font-semibold">
              Open*
            </label>
            <input
              id="Open at"
              type="time"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2 scheme-dark"
              value={isOpenTime}
              onChange={e => setOpentime(e.target.value)}
              required
            />
            <label htmlFor="Close" className="text-[12.5px] font-semibold">
              Close*
            </label>
            <input
              id="Close"
              type="time"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2 scheme-dark"
              value={isCloseTime}
              onChange={e => setCloseTime(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1 relative">
            <label htmlFor="Facebook page" className="text-[12.5px] font-semibold">
              Facebook page*
            </label>
            <input
              id="Facebook page"
              type="text"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2"
              value={isfacebook}
              onChange={e => setFacebookPage(e.target.value)}
            />
          </div>
        </form>
        <hr className="border-0 border-t border-(--text-muted)/50" />
        <div className="flex justify-end py-2 px-4 gap-3">
          <button
            onClick={() => onClose()}
            className="py-2 px-4 border border-(--border-light) rounded-xl"
          >
            Cancel
          </button>
          <button type="submit" form="storeForm" className="py-2 px-4 border border-(--border-light) rounded-xl bg-(--primary-color)">
            Add Store
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddingStore;
