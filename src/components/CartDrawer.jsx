import { Minus, Plus, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { formatIDR } from "../data/products";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, discount, serviceFee, tax, total, addItem, decrement, removeItem } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} aria-label="Close cart" />
      <aside className="absolute bottom-0 right-0 h-[90dvh] w-full max-w-md overflow-hidden rounded-t-[2rem] bg-[#fffaf5] p-5 shadow-2xl sm:bottom-4 sm:right-4 sm:h-[calc(100dvh-2rem)] sm:rounded-[2rem]">
        <div className="flex items-center justify-between">
          <div><div className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Your cart</div><h2 className="mt-1 text-2xl font-black">Sedikit impulsif 😼</h2></div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white"><X size={18} /></button>
        </div>
        <div className="mt-5 space-y-3 overflow-y-auto pb-60">
          {items.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center"><div className="text-5xl">🐈</div><p className="mt-3 font-bold">Keranjang masih kosong.</p><p className="mt-1 text-sm text-black/45">Kucing kita sedang menunggu order.</p></div>
          ) : items.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-2xl bg-white p-3">
              <img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-extrabold">{item.name}</div>
                <div className="mt-1 text-sm font-bold">{formatIDR(item.price)}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center rounded-xl bg-[#f6eee6]">
                    <button onClick={() => decrement(item.id)} className="p-2"><Minus size={14} /></button>
                    <span className="min-w-7 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => addItem(item)} className="p-2"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-black/35 hover:text-red-500"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-5 bottom-5 rounded-3xl bg-[#2d2019] p-4 text-white">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-white/55"><span>Subtotal</span><span>{formatIDR(subtotal)}</span></div>
            <div className="flex justify-between text-emerald-300"><span>Simulated discount</span><span>-{formatIDR(discount)}</span></div>
            <div className="flex justify-between text-white/55"><span>Service fee</span><span>{formatIDR(serviceFee)}</span></div>
            <div className="flex justify-between text-white/55"><span>Tax</span><span>{formatIDR(tax)}</span></div>
          </div>
          <div className="my-3 border-t border-white/10" />
          <div className="flex items-center justify-between"><span className="text-sm text-white/60">Total</span><span className="text-xl font-black">{formatIDR(total)}</span></div>
          <Link to="/checkout" onClick={onClose} className={`mt-3 block w-full rounded-2xl bg-[#ff8c42] px-4 py-3.5 text-center font-black ${items.length === 0 ? "pointer-events-none opacity-40" : ""}`}>Checkout →</Link>
          <div className="mt-2 text-center text-[10px] text-white/40">DEMO ONLY · NO REAL PAYMENT</div>
        </div>
      </aside>
    </div>
  );
}
