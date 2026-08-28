import { Search, ShoppingBag, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Brand from "./Brand";

export default function Navbar({ onCart }) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fffaf5]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Brand />
        <div className="hidden flex-1 md:block">
          <label className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2.5 text-sm text-black/45">
            <Search size={17} />
            Cari makanan dari seluruh dunia...
          </label>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/admin" className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-black/55 hover:bg-white md:flex">
            <Shield size={15} /> Admin
          </Link>
          <button onClick={onCart} className="relative grid h-11 w-11 place-items-center rounded-2xl bg-[#2d2019] text-white">
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ff8c42] px-1 text-[11px] font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
