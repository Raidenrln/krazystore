import { X, ChevronDown } from "lucide-react";
import { StoreContext } from "../../context/store/StoreContext";
import { useContext, useState, type FormEvent } from "react";
import { ProductContext } from "../../context/products/ProductsContext";
import type { ProductModel } from "../../models/productModel";
import { v4 as uuidv4 } from "uuid";
interface AddingProductProps {
  onClose: () => void;
}
const AddingProduct = ({ onClose }: AddingProductProps) => {
  const { stores } = useContext(StoreContext)!;
  const { addingProduct } = useContext(ProductContext)!;
  const [name, setName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [chooseStore, setChooseStore] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productUnit, setProductUnit] = useState("");

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const newProduct: ProductModel = {
      id: uuidv4(),
      name: name,
      dateCreated: now.toLocaleDateString(),
      price: productPrice,
      storebelong: chooseStore,
      boughtQuantity: 0,
      category: productCategory,
      unit: productUnit,
      priceHistory: [],
    };
    addingProduct(newProduct, chooseStore);
    onClose();
  };
  return (
    <main className="w-full">
      <div className="text-white flex bg-(--bg-panel) rounded-t-2xl flex-col">
        <div className="flex justify-between w-full p-4">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">Track a Product</h1>
            <p className="text-[13px] text-(--text-muted)">
              Record a product price at one of your stores.
            </p>
          </div>
          <X onClick={() => onClose()} />
        </div>
        <hr className="border-0 border-t border-(--text-muted)/50" />
        <form onSubmit={handleAdd} id="productForm" className="p-4 flex gap-4 flex-col">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-[12.5px] font-semibold">
              Product name*
            </label>
            <input
              id="name"
              type="text"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="product-category" className="text-[12.5px] font-semibold">
              Product category*
            </label>
            <input
              id="product-category"
              type="text"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
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
              value={chooseStore}
              onChange={(e) => setChooseStore(e.target.value)}
              required
            >
              <option key="placeholder" value="" hidden className="text-(--text-muted)">
                Choose store
              </option>
              {stores.map((s) => (
                <option key={s.id} value={s.id} className="text-(--text-muted) bg-(--bg-panel)">
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute top-8 right-2" />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="price" className="text-[12.5px] font-semibold">
              Price(₱)*
            </label>
            <input
              id="price"
              type="text"
              className="border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] p-2"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1 relative">
            <label htmlFor="Price type / unit*" className="text-[12.5px] font-semibold">
              Price type / unit*
            </label>
            <select
              value={productUnit}
              name=""
              id="Price type / unit*"
              className="w-full border border-(--border-light) focus:outline-none focus:ring-1 focus:ring-(--primary-color) rounded-lg h-9 text-[12px] appearance-none px-3"
              onChange={(e) => setProductUnit(e.target.value)}
            >
              <option value="" hidden className="text-(--text-muted)">
                Choose type
              </option>
              <option value="perPiece" className="text-(--text-muted) bg-(--bg-panel)">
                Per piece
              </option>
              <option value="perKilo" className="text-(--text-muted) bg-(--bg-panel)">
                Per kilo
              </option>
              <option value="perLiter" className="text-(--text-muted) bg-(--bg-panel)">
                Per liter
              </option>
            </select>
            <ChevronDown size={18} className="absolute top-8 right-2" />
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
          <button
            type="submit"
            form="productForm"
            className="py-2 px-4 border border-(--border-light) rounded-xl bg-(--primary-color)"
          >
            Add Product
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddingProduct;
