import { ArrowLeft, CheckCircle2, Clock3, Home, Phone, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import FakeMap from "../components/FakeMap";
import getCatStatus from "../components/CatStatus";
import Confetti from "../components/Confetti";
import { formatIDR } from "../data/products";
import { useCart } from "../context/CartContext";


const DURATION = 18;
const ORDER_KEY = "meoweat-pending-order";

function readOrder() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
  } catch {
    return null;
  }
}

export default function Delivery() {
  const navigate = useNavigate();
  const { clear } = useCart();
  const [order] = useState(readOrder);
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [finished, setFinished] = useState(false);

  const progress = Math.min(100, ((DURATION - secondsLeft) / DURATION) * 100);
  const status = useMemo(() => getCatStatus(progress), [progress]);

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate, order]);

  useEffect(() => {
    if (secondsLeft !== 0) return;
    const timer = setTimeout(() => {
      clear();
      setFinished(true);
    }, 650);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      {finished && <Confetti count={70} />}

      {!finished ? (
        <>
          <header className="border-b border-black/5 bg-[#fffaf5]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-black/60"><ArrowLeft size={17} /> Home</Link>
              <div><div className="text-sm font-black">Order #{order.orderId}</div><div className="text-[10px] text-black/35">{order.city} · paid Rp0 demo</div></div>
              <div className="rounded-full bg-[#e6f8f2] px-3 py-1.5 text-xs font-black text-[#16866f]">ON THE WAY</div>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_350px]">
              <section>
                <div className="mb-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Delivery tracking</div>
                  <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Your order is on the way! 🐾</h1>
                  <p className="mt-2 text-sm text-black/45">Route disimulasikan dan mengikuti jalan berbelok, bukan garis lurus.</p>
                </div>

                <FakeMap progress={progress} city={order.city} />

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["Order confirmed", progress >= 0],
                    ["Kitchen cooking", progress >= 20],
                    ["Rider picked up", progress >= 45],
                    ["Almost at door", progress >= 82],
                  ].map(([label, active]) => (
                    <div key={label} className={`rounded-2xl bg-white p-4 card-shadow ${active ? "" : "opacity-40"}`}>
                      <CheckCircle2 size={18} className={active ? "text-[#1da68b]" : "text-black/20"} />
                      <div className="mt-2 text-xs font-bold leading-4">{label}</div>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="h-fit rounded-[2rem] bg-[#2d2019] p-5 text-white lg:sticky lg:top-6">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Courier</div>
                  <div className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black">LIVE</div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-3xl">🐱</div>
                  <div>
                    <div className="text-lg font-black">Oyen Delivery</div>
                    <div className="mt-1 text-xs text-white/45">rolling downhill to save energy 🐾</div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold"><Clock3 size={15} /> Arriving in ~4 min</div>
                  <div className="mt-1 text-4xl font-black tabular-nums">00:{String(secondsLeft).padStart(2, "0")}</div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#ff8c42] transition-all duration-700" style={{ width: `${progress}%` }} /></div>
                </div>

                <div className="mt-4 rounded-2xl bg-white/5 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">Current status</div>
                  <div className="mt-2 font-black">{status.title}</div>
                  <p className="mt-1 text-sm leading-5 text-white/50">{status.sub}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-black text-white/70"><Phone size={14} /> Contact</button>
                  <button className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-black text-white/70"><Home size={14} className="mr-1 inline" /> {order.city}</button>
                </div>

                <div className="mt-5 text-center text-[10px] leading-5 text-white/30">
                  Please keep your phone nearby.<br />The cat absolutely does not need it.
                </div>
              </aside>
            </div>
          </main>
        </>
      ) : (
        <main className="grid min-h-screen place-items-center px-4 py-8">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-[#fff0dd] text-6xl floaty">🐱</div>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-black/35">Delivery complete*</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Order not found.</h1>
            <p className="mt-4 text-lg leading-7 text-black/55">
              Pesanan ke <strong className="text-black/75">{order.city}</strong> tidak akan pernah datang.
              <br />Tapi dompetmu selamat malam ini.
            </p>

            <div className="mt-7 rounded-[2rem] bg-[#2d2019] p-6 text-white shadow-2xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-white/35">You successfully saved</div>
              <div className="mt-2 text-4xl font-black">{formatIDR(order.savings)}</div>
              <div className="mt-2 text-sm text-white/45">💰 That\'s the money you kept in your wallet tonight.</div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link to="/" className="rounded-2xl bg-[#2d2019] px-4 py-3.5 text-sm font-black text-white">Shop again</Link>
              <button onClick={() => navigate("/", { replace: true })} className="rounded-2xl bg-white px-4 py-3.5 text-sm font-black text-black/70"><RotateCcw className="mr-1 inline" size={15} /> Reset</button>
            </div>

            <p className="mt-4 text-[10px] font-bold text-black/25">*Simulasi satir · tidak ada transaksi nyata.</p>
          </div>
        </main>
      )}
    </div>
  );
}
