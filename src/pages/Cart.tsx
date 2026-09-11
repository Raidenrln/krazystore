import { ShoppingCart, Trash2 } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/cart/CartContext";
import { ProductContext } from "../context/products/ProductsContext";

const Cart = () => {
  const { cartItem, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext)!;
  const { products } = useContext(ProductContext)!;

  const carthasItem = cartItem.length;

  const total = cartItem.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <main className="min-h-screen w-full">
      <div className="flex w-full flex-col gap-5 p-4 pb-22 sm:hidden">
        <header className="w-full">
          <h1 className="text-2xl font-bold tracking-tight text-white">Cart</h1>
          <p className="mt-1 text-xs text-(--text-muted)">Review your items before checking out.</p>
        </header>

        <section className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Items</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1.5 text-[11px] font-semibold text-white">
                {carthasItem}
              </span>
            </div>
          </div>

          {carthasItem === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <ShoppingCart className="h-6 w-6 text-(--text-muted)" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Your cart is empty</p>
                <p className="text-xs text-(--text-muted)">
                  Add some products to your cart to get started.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {cartItem.map((item) => {
                const product = products.find((p) => p.id === item.id);

                if (!product) return null;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[2fr_1fr_1fr_auto] items-center gap-2 p-4"
                  >
                    <h2 className="truncate pr-2 text-left text-sm font-semibold text-white">
                      {product.name}
                    </h2>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-sm text-(--text-muted) transition hover:bg-white/10 hover:text-white"
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center text-sm font-semibold text-white">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-sm text-(--text-muted) transition hover:bg-white/10 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-right text-sm font-semibold text-violet-400">
                      ₱{product.price * item.quantity}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex justify-end text-(--text-muted) transition hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Total + Checkout */}
        {carthasItem > 0 && (
          <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm text-(--text-muted)">
              <span>Total</span>
              <span className="text-lg font-bold text-white">₱{total}</span>
            </div>

            <button
              type="button"
              className="mt-3 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Check Out
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default Cart;