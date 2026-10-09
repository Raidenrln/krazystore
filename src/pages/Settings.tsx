import { useContext, useState } from "react";
import { Store, Package, Plus, X } from "lucide-react";
import { CategoryContext } from "../context/category/CategoryContext";

type CategoryCardProps = {
  icon: typeof Store;
  label: string;
  placeholder: string;
  categories: { id: string; name: string }[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
};

const CategoryCard = ({
  icon: Icon,
  label,
  placeholder,
  categories,
  onAdd,
  onRemove,
}: CategoryCardProps) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const name = input.trim();

    if (!name) return;

    if (categories.some((category) => category.name.toLowerCase() === name.toLowerCase())) {
      setInput("");
      return;
    }

    onAdd(name);
    setInput("");
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="px-1 text-[12px] font-medium text-(--text-muted)">{label} </span>
      <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-(--bg-panel)">
        <div className="flex items-center gap-2 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--bg-button)">
            <Icon size={16} className="text-(--primary-color)" />
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-(--text-muted) outline-none"
          />

          <button
            type="button"
            onClick={handleAdd}
            disabled={!input.trim()}
            aria-label={`Add ${label.toLowerCase()}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--primary-bg) text-(--primary-color) transition-opacity disabled:opacity-30"
          >
            <Plus size={18} strokeWidth={2} />
          </button>
        </div>

        {categories.length > 0 ? (
          <div className="flex flex-wrap gap-2 border-t border-white/6 p-3">
            {categories.map((category) => (
              <span
                key={category.id}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 py-1.5 pl-3 pr-2 text-[13px] text-zinc-200"
              >
                {category.name}

                <button
                  type="button"
                  onClick={() => onRemove(category.id)}
                  aria-label={`Remove ${category.id}`}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-(--text-muted) hover:text-white"
                >
                  <X size={12} strokeWidth={2} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="border-t border-white/6 p-3 text-[12px] text-(--text-muted)">
            No categories yet. Add one above.
          </p>
        )}
      </div>
    </div>
  );
};

const Settings = () => {
  const categoryContext = useContext(CategoryContext);

  if (!categoryContext) {
    throw new Error("Settings must be used inside a CategoryProvider.");
  }

  const { storeCategories, addingStoreCategories, productCategories, addingProductCategories } =
    categoryContext;

  const removeStoreCategory = (name: string) => {
    categoryContext.removeStoreCategory(name);
  };

  const removeProductCategory = (name: string) => {
    categoryContext.removeProductCategory(name);
  };

  return (
    <main className="min-h-screen w-full">
      <div className="flex w-full flex-col items-center gap-4 p-4 pb-22 sm:hidden">
        <div className="w-full text-white">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-[12px] text-(--text-muted)">
            Manage your account, preferences, and categories.
          </p>
        </div>
        <CategoryCard
          icon={Store}
          label="Store categories"
          placeholder="Store category name"
          categories={storeCategories}
          onAdd={addingStoreCategories}
          onRemove={removeStoreCategory}
        />
        <CategoryCard
          icon={Package}
          label="Product categories"
          placeholder="Product category name"
          categories={productCategories}
          onAdd={addingProductCategories}
          onRemove={removeProductCategory}
        />
      </div>
    </main>
  );
};

export default Settings;
