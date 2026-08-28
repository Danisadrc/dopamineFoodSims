import { ArrowUp, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatIDR } from "../data/products";

export default function CartBar({ onOpen }) {
  const { itemCount, total } = useCart();
  if (!itemCount) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <button onClick={onOpen} className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl bg-[#2d2019] p-3 text-left text-white shadow-2xl">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><ShoppingBag size={19} /></div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-white/55">{itemCount} item{itemCount > 1 ? "s" : ""}</div>
          <div className="truncate text-sm font-black">{formatIDR(total)}</div>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-[#ff8c42] px-3 py-2.5 text-sm font-black">Cart <ArrowUp size={15} /></div>
      </button>
    </div>
  );
}
