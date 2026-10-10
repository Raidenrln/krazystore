import { useContext, useEffect, useState, type FormEvent } from "react";
import { StoreContext } from "../../context/store/StoreContext"
import { CategoryContext } from "../../context/category/CategoryContext";
import { ChevronDown, X } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import type { EditedStore } from "../../context/store/StoreProvider";

type EditingStoreModel = {
  store: string
  onClose: () => void;
}

interface NavbarContextType {
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditingStore = ({ store, onClose }: EditingStoreModel) => {
  const { stores, editingStore } = useContext(StoreContext)!;
  const { setShowNavbar } = useOutletContext<NavbarContextType>();
  const storeTarget = stores.find(s => s.id === store);
  const { storeCategories } = useContext(CategoryContext)!;
  const [IsStorename, setStorename] = useState(storeTarget!.name);
  const [IsStoreLocation, setStoreLocation] = useState(storeTarget!.location)
  const [IsStoreCategory, setStoreCategory] = useState(storeTarget!.category)
  const [isOpenTime, setOpentime] = useState(storeTarget!.opentime)
  const [isCloseTime, setCloseTime] = useState(storeTarget!.closetime)
  const [isfacebook, setFacebookPage] = useState(storeTarget!.facebook)
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowNavbar(true)
    const editedStore: EditedStore = {
      name: IsStorename,
      location: IsStoreLocation,
      category: IsStoreCategory,
      opentime: isOpenTime,
      closetime: isCloseTime,
      facebook: isfacebook,
    }
    editingStore(storeTarget!.id, editedStore);
    onClose();
  }

  

  useEffect(() => {console.log("shesh", storeTarget)})
  return (
    <main className="w-full">
      <div className="text-white flex bg-(--bg-panel) rounded-t-2xl flex-col">
        <div className="flex justify-between w-full p-4">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">Edit Store</h1>
            <p className="text-[13px] text-(--text-muted)">Update the details you track.</p>
          </div>
          <X onClick={() => {onClose(); setShowNavbar(true)}} />
        </div>
        <hr className="border-0 border-t border-(--text-muted)/50" />
        <form onSubmit={handleSubmit} id="storeForm" className="p-4 flex gap-4 flex-col">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="Store name" className="text-[12.5px] font-semibold">
              Store name
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
              Location
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
            <label htmlFor="Store" className="text-[12.5px] font-semibold">
              Store*
            </label>
            <select
              name="store"
              id="Store"
              className="w-full border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] appearance-none px-3"
              required
              value={IsStoreCategory}
              onChange={e => setStoreCategory(e.target.value)}
            >
              <option key="placeholder" value="" hidden className="text-(--text-muted)">
                Choose store
              </option>
              {storeCategories.map((s) => (
                <option key={s.id} value={s.name} className="text-(--text-muted) bg-(--bg-panel)">
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute top-8 right-2" />
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
              Close
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
              Facebook page
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
            onClick={() => {onClose(); setShowNavbar(true)}}
            className="py-2 px-4 border border-(--border-light) rounded-xl"
          >
            Cancel
          </button>
          <button type="submit" form="storeForm" className="py-2 px-4 border border-(--border-light) rounded-xl bg-(--primary-color)">
            Save
          </button>
        </div>
      </div>
    </main>
  )
}

export default EditingStore