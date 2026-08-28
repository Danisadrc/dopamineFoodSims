import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Gift,
  Home,
  LockKeyhole,
  MapPin,
  Minus,
  Plus,
  Pencil,
  Receipt,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { formatIDR } from "../data/products";
import { PROMO_CODES, calculateOrder, useCart } from "../context/CartContext";
import Confetti from "../components/Confetti";
import { playChaChing } from "../components/ChaChing";

const ORDER_KEY = "meoweat-pending-order";

export default function Checkout() {
  const { items, addItem, decrement } = useCart();
  const navigate = useNavigate();

  const [celebrate, setCelebrate] = useState(false);
  const [city, setCity] = useState(localStorage.getItem("meoweat-city") || "Jakarta");
  const [address, setAddress] = useState(localStorage.getItem("meoweat-address") || "Jl. Kucing Bahagia No. 12");
  const [note, setNote] = useState("");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [payment, setPayment] = useState("MeowPay Demo");
  const [editingAddress, setEditingAddress] = useState(!localStorage.getItem("meoweat-city"));
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const pricing = useMemo(
    () => calculateOrder(items, promoApplied),
    [items, promoApplied]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) return <Navigate to="/" replace />;

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();

    if (!code) {
      setPromoApplied("");
      setPromoMessage("Masukkan kode promo dulu.");
      return;
    }

    if (!PROMO_CODES[code]) {
      setPromoApplied("");
      setPromoMessage("Kode promo tidak ditemukan. Coba MEOW15.");
      return;
    }

    setPromoApplied(code);
    setPromoMessage(`Promo ${code} berhasil digunakan.`);
  };

  const removePromo = () => {
    setPromoApplied("");
    setPromo("");
    setPromoMessage("");
  };

  const handleSaveAddress = () => {
    const safeCity = city.trim() || "Jakarta";
    const safeAddress = address.trim() || "Jl. Kucing Bahagia No. 12";
    setCity(safeCity);
    setAddress(safeAddress);
    localStorage.setItem("meoweat-city", safeCity);
    localStorage.setItem("meoweat-address", safeAddress);
    setEditingAddress(false);
  };

  const handleOrder = () => {
    const safeCity = city.trim() || "Jakarta";
    const safeAddress = address.trim() || "Jl. Kucing Bahagia No. 12";

    localStorage.setItem("meoweat-city", safeCity);
    localStorage.setItem("meoweat-address", safeAddress);

    localStorage.setItem(
      ORDER_KEY,
      JSON.stringify({
        orderId: `MEOW${Math.floor(1000 + Math.random() * 8999)}`,
        city: safeCity,
        address: safeAddress,
        subtotal: pricing.subtotal,
        discount: pricing.discount,
        promoDiscount: pricing.promoDiscount,
        serviceFee: pricing.serviceFee,
        tax: pricing.tax,
        total: pricing.total,
        paymentAmount: pricing.total,
        promoCode: promoApplied,
        savings: pricing.total,
        createdAt: Date.now(),
      })
    );

    playChaChing();
    setCelebrate(true);
    window.setTimeout(() => navigate("/delivery"), 1050);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      {celebrate && <Confetti count={65} />}

      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#fffaf5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-black/60">
            <ArrowLeft size={17} /> Back
          </Link>
          <div className="text-sm font-black">Checkout</div>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
            <LockKeyhole size={13} /> Demo checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5 pb-12 sm:px-6 lg:py-7">
        <div className="mb-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/35">Review & confirm</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Hampir selesai. 🐾</h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-black/45">
            Cek alamat dan pesananmu sebelum Oyen menerima misi yang seharusnya tidak pernah berhasil.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            <section className="overflow-hidden rounded-[1.7rem] bg-white card-shadow">
              <div className="flex items-center justify-between gap-4 border-b border-black/5 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff3dc]"><MapPin size={18} /></div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Delivery address</div>
                    <div className="font-black">Alamat pengantaran</div>
                  </div>
                </div>
                {!editingAddress && (
                  <button onClick={() => setEditingAddress(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-[#fff7ed] px-3 py-2 text-xs font-black text-[#b96731]">
                    <Pencil size={13} /> Ubah
                  </button>
                )}
              </div>

              {!editingAddress ? (
                <div className="flex items-start gap-3 px-5 py-4">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-black/5 bg-[#fffaf5]"><Home size={16} className="text-black/55" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black">Home</span>
                      <span className="rounded-full bg-[#eef8f4] px-2 py-0.5 text-[10px] font-black text-[#16866f]">Utama</span>
                    </div>
                    <div className="mt-1 text-sm font-bold text-black/70">{city}</div>
                    <div className="mt-0.5 text-sm leading-5 text-black/45">{address}</div>
                    {note && <div className="mt-2 text-xs text-black/40">Catatan: {note}</div>}
                  </div>
                  <ChevronRight size={17} className="mt-1 text-black/20" />
                </div>
              ) : (
                <div className="px-5 py-4">
                  <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                    <label>
                      <span className="mb-1.5 block text-xs font-bold text-black/45">Kota</span>
                      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Jakarta" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm font-semibold outline-none focus:border-[#ff8c42] focus:ring-4 focus:ring-[#ff8c42]/10" />
                    </label>
                    <label>
                      <span className="mb-1.5 block text-xs font-bold text-black/45">Alamat</span>
                      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Jl. Contoh No. 123" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm font-semibold outline-none focus:border-[#ff8c42] focus:ring-4 focus:ring-[#ff8c42]/10" />
                    </label>
                  </div>
                  <label className="mt-3 block">
                    <span className="mb-1.5 block text-xs font-bold text-black/45">Catatan untuk kurir <span className="font-normal text-black/25">(opsional)</span></span>
                    <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Contoh: rumah pagar putih" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm outline-none focus:border-[#ff8c42] focus:ring-4 focus:ring-[#ff8c42]/10" />
                  </label>
                  <div className="mt-3 flex justify-end gap-2">
                    <button onClick={() => setEditingAddress(false)} className="rounded-xl px-3.5 py-2.5 text-xs font-black text-black/45">Batal</button>
                    <button onClick={handleSaveAddress} className="rounded-xl bg-[#2d2019] px-4 py-2.5 text-xs font-black text-white">Simpan alamat</button>
                  </div>
                </div>
              )}
            </section>

            <section className="overflow-hidden rounded-[1.7rem] bg-white card-shadow">
              <div className="border-b border-black/5 px-5 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Order details</div>
                <div className="mt-0.5 flex items-center justify-between"><h2 className="font-black">Pesanan kamu</h2><span className="text-xs font-bold text-black/35">{pricing.itemCount} items</span></div>
              </div>

              <div className="divide-y divide-black/5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-5 py-4">
                    <img src={item.image} alt="" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-extrabold">{item.name}</div>
                      <div className="mt-1 text-xs text-black/40">{formatIDR(item.price)} per item</div>
                    </div>
                    <div className="flex items-center rounded-xl bg-[#fffaf5]">
                      <button onClick={() => decrement(item.id)} className="p-2"><Minus size={13} /></button>
                      <span className="min-w-6 text-center text-xs font-black">{item.quantity}</span>
                      <button onClick={() => addItem(item)} className="p-2"><Plus size={13} /></button>
                    </div>
                    <div className="hidden min-w-[92px] text-right text-sm font-black sm:block">{formatIDR(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[1.7rem] bg-white card-shadow">
              <div className="border-b border-black/5 px-5 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Payment method</div>
                <div className="mt-0.5 font-black">Cara pembayaran</div>
              </div>
              <div className="p-5">
                <button onClick={() => setShowPaymentOptions((v) => !v)} className="flex w-full items-center justify-between rounded-2xl border border-black/7 bg-[#fffaf5] px-4 py-3">
                  <span className="flex items-center gap-3 text-left">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white">{payment === "Cash" ? "💵" : "🐾"}</span>
                    <span><span className="block text-sm font-black">{payment}</span><span className="block text-xs text-black/40">No charge · prototype mode</span></span>
                  </span>
                  <ChevronDown size={17} className={`transition ${showPaymentOptions ? "rotate-180" : ""}`} />
                </button>
                {showPaymentOptions && (
                  <div className="mt-2 grid gap-2 rounded-2xl bg-[#fffaf5] p-2">
                    {["MeowPay Demo", "Cash"].map((option) => (
                      <button key={option} onClick={() => { setPayment(option); setShowPaymentOptions(false); }} className={`rounded-xl px-3 py-3 text-left text-sm ${payment === option ? "bg-white font-black" : "text-black/55"}`}>
                        {option === "Cash" ? "💵" : "🐾"} {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.7rem] bg-white p-5 card-shadow">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4edff]"><Gift size={18} /></div>
                  <div><div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Promo</div><div className="font-black">Kode promo</div></div>
                </div>

                <div className="mt-4 flex gap-2">
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value.toUpperCase())}
                    placeholder="MEOW15"
                    className="min-w-0 flex-1 rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm font-bold outline-none focus:border-[#ff8c42]"
                  />
                  {promoApplied ? (
                    <button onClick={removePromo} className="rounded-xl bg-[#fce7e6] px-3.5 py-3 text-xs font-black text-red-600">Hapus</button>
                  ) : (
                    <button onClick={applyPromo} className="rounded-xl bg-[#f0e7db] px-3.5 py-3 text-xs font-black">Pakai</button>
                  )}
                </div>

                {promoMessage && (
                  <div className={`mt-2 text-xs font-bold ${promoApplied ? "text-emerald-700" : "text-red-500"}`}>
                    {promoMessage}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {Object.keys(PROMO_CODES).map((code) => (
                    <button key={code} onClick={() => setPromo(code)} className="rounded-full bg-[#fffaf5] px-2.5 py-1 text-[10px] font-black text-black/45 hover:bg-[#f5ede5]">
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.7rem] bg-[#2d2019] p-5 text-white">
                <div className="flex items-center gap-2 text-[#ffd79a]"><Receipt size={17} /><span className="text-[10px] font-black uppercase tracking-[0.16em]">Simulation</span></div>
                <p className="mt-3 text-sm leading-5 text-white/50">
                  Checkout ini tidak terhubung ke payment gateway dan tidak akan menagih uang sungguhan.
                </p>
              </div>
            </section>
          </section>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.8rem] bg-white card-shadow">
              <div className="border-b border-black/5 px-5 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Payment summary</div>
                <h2 className="mt-0.5 text-lg font-black">Ringkasan pembayaran</h2>
              </div>

              <div className="p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-black/50"><span>Subtotal</span><span>{formatIDR(pricing.subtotal)}</span></div>
                  <div className="flex justify-between text-emerald-700"><span>Discount</span><span>-{formatIDR(pricing.discount)}</span></div>
                  {pricing.promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700"><span>Promo {promoApplied}</span><span>-{formatIDR(pricing.promoDiscount)}</span></div>
                  )}
                  <div className="flex justify-between text-black/50"><span>Service fee</span><span>{formatIDR(pricing.serviceFee)}</span></div>
                  <div className="flex justify-between text-black/50"><span>Tax</span><span>{formatIDR(pricing.tax)}</span></div>
                </div>

                <div className="my-4 border-t border-dashed border-black/10" />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-black/40">Total pembayaran</div>
                    <div className="mt-0.5 text-2xl font-black">{formatIDR(pricing.total)}</div>
                  </div>
                  <div className="rounded-xl bg-[#fff3dc] px-3 py-2 text-right">
                    <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#9a6a32]">Promo save</div>
                    <div className="text-sm font-black text-[#7e5b2d]">{formatIDR(pricing.discount + pricing.promoDiscount)}</div>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={celebrate}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff8c42] px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-[#ff8c42]/15 transition ${celebrate ? "scale-[1.01] opacity-85" : "hover:-translate-y-0.5"}`}
                >
                  {celebrate ? <><Check size={17} /> Order confirmed</> : <>🐾 Pesan sekarang · {formatIDR(pricing.total)}</>}
                </button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-black/25">
                  <LockKeyhole size={11} /> Demo only · no real payment
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-[#f4eee7] px-4 py-3 text-center text-xs leading-5 text-black/45">
              Oyen akan menerima order setelah kamu menekan tombol di atas. Nasib pesananmu? Itu cerita lain.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
