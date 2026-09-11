import { Box, LayoutDashboard, ReceiptText, Settings, ShoppingCart, Store } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const navigationBar = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Stores",
      path: "/stores",
      icon: Store
    },
    {
      name: "Products",
      path: "/products",
      icon: Box
    },
    {
      name: "Cart",
      path: "/cart",
      icon: ShoppingCart
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: ReceiptText
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];

  return (
    <main>
      {/* Mobile device navigation */}
      <div className="sm:hidden fixed bottom-5 left-1/2 z-50 flex w-fit -translate-x-1/2 items-center justify-evenly gap-2 rounded-2xl border border-(--primary-color) bg-[#181B24] px-3 py-2 shadow-lg">
        {navigationBar.map((n) => {
          const Icon = n.icon;

          return (
            <NavLink key={n.name} to={n.path}>
              {({ isActive }) => (
                <div
                  className={`flex items-center justify-center gap-2 rounded-full p-2 transition-all ${
                    isActive ? "bg-(--primary-bg-color) text-[#8158DF]" : "text-[#9BAAAC]"
                  }`}
                >
                  <Icon size={20} />

                  {isActive && <span className="text-xs font-medium text-white">{n.name}</span>}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </main>
  );
};

export default NavBar;
