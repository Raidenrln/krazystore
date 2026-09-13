import { useState } from "react";
import { Store, Package, Plus, X } from "lucide-react";

type CategoryCardProps = {
  icon: React.ElementType;
  label: string;
  placeholder: string;
  categories: string[];
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
    if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setInput("");
      return;
    }
    onAdd(name);
    setInput("");
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="px-1 text-[12px] font-medium text-(--text-muted)">{label}</span>

      <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-(--bg-panel)">
        <div className="flex items-center gap-2 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--bg-button)">
            <Icon size={16} className="text-(--primary-color)" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-(--text-muted) outline-none"
          />
          <button
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
            {categories.map((name) => (
              <span
                key={name}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 py-1.5 pl-3 pr-2 text-[13px] text-zinc-200"
              >
                {name}
                <button
                  onClick={() => onRemove(name)}
                  aria-label={`Remove ${name}`}
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
  const [storeCategories, setStoreCategories] = useState<string[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([]);

  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Mobile devices Settings */}
      <div className="sm:hidden w-full items-center flex flex-col p-4 gap-4 pb-22">
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
          onAdd={(name) => setStoreCategories((prev) => [...prev, name])}
          onRemove={(name) => setStoreCategories((prev) => prev.filter((c) => c !== name))}
        />

        <CategoryCard
          icon={Package}
          label="Product categories"
          placeholder="Product category name"
          categories={productCategories}
          onAdd={(name) => setProductCategories((prev) => [...prev, name])}
          onRemove={(name) => setProductCategories((prev) => prev.filter((c) => c !== name))}
        />
      </div>
    </main>
  );
};

export default Settings;
