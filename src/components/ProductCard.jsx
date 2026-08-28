import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatIDR } from "../data/products";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 700);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <article className="group overflow-hidden rounded-3xl bg-white card-shadow transition duration-200 hover:-translate-y-1">
      <div className="relative aspect-[1.05] overflow-hidden bg-[#f5ede5]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-black">-{discount}%</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white">🐾 {product.badge}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-extrabold leading-5">{product.name}</h3>
            <p className="mt-1 text-xs text-black/45">{product.category} · {product.sold.toLocaleString("id-ID")} terjual</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#fff3dc] px-2 py-1 text-xs font-bold text-[#7e5b2d]">★ {product.rating}</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs text-black/35 line-through">{formatIDR(product.originalPrice)}</div>
            <div className="text-lg font-black">{formatIDR(product.price)}</div>
          </div>
          <button
            onClick={() => { addItem(product); setAdded(true); }}
            className={`grid h-11 w-11 place-items-center rounded-2xl text-white shadow-lg transition active:scale-95 ${added ? "scale-105 bg-[#39a96b]" : "bg-[#ff8c42] hover:scale-105"}`}
            aria-label={`Add ${product.name}`}
          >
            {added ? <Check size={19} strokeWidth={3} /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    </article>
  );
}
