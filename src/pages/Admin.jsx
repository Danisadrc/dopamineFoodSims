import { LayoutDashboard, Package, Globe2, Settings, Plus, Search, MoreHorizontal, Megaphone } from "lucide-react";
import { useMemo, useState } from "react";
import Brand from "../components/Brand";
import { countries, products, formatIDR } from "../data/products";

export default function Admin() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="min-h-screen bg-[#f7f1eb]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6">
          <Brand />
          <div className="rounded-full bg-[#fff3dc] px-3 py-1.5 text-xs font-black text-[#745126]">ADMIN · DEMO</div>
        </div>
      </header>
      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 py-5 sm:px-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-3xl bg-[#2d2019] p-3 text-white">
          {[[LayoutDashboard, "Dashboard"],[Package, "Products"],[Megaphone, "Advertisements"],[Globe2, "Countries"],[Settings, "Settings"]].map(([Icon, label], i) => {
            const content = <><Icon size={17} /> {label}</>;
            if (label === "Advertisements") {
              return <a key={label} href="/admin/ads" className="mb-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-white/55 hover:bg-white/5">{content}</a>;
            }
            return <button key={label} className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold ${i === 1 ? "bg-white/10" : "text-white/55 hover:bg-white/5"}`}>{content}</button>;
          })}
          <div className="mt-10 rounded-2xl bg-white/5 p-4"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Step 3.1</div><p className="mt-2 text-xs leading-5 text-white/55">Public flow sekarang sudah membawa city/address ke delivery simulation.</p></div>
        </aside>
        <section>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Content management</p><h1 className="mt-1 text-3xl font-black">Products</h1><p className="mt-1 text-sm text-black/45">Admin UI masih demo; database CRUD masuk tahap berikutnya.</p></div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2d2019] px-4 py-3 text-sm font-black text-white"><Plus size={17} /> Add menu</button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Total menu", products.length],["Countries", countries.length],["Published", products.length]].map(([label, value]) => <div key={label} className="rounded-3xl bg-white p-5 card-shadow"><div className="text-xs font-black uppercase tracking-[0.15em] text-black/35">{label}</div><div className="mt-2 text-3xl font-black">{value}</div></div>)}</div>
          <div className="mt-5 overflow-hidden rounded-3xl bg-white card-shadow">
            <div className="flex flex-col gap-3 border-b border-black/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 rounded-2xl bg-[#f7f1eb] px-3 py-2.5 text-sm text-black/45"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="w-full bg-transparent outline-none placeholder:text-black/30" /></label>
              <div className="text-xs font-bold text-black/35">{filtered.length} result</div>
            </div>
            <div className="divide-y divide-black/5">{filtered.map((product) => {
              const country = countries.find((c) => c.id === product.country);
              return <div key={product.id} className="flex items-center gap-3 p-4 sm:gap-4"><img src={product.image} alt="" className="h-16 w-16 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="truncate font-extrabold">{product.name}</div><div className="mt-1 text-xs text-black/45">{country?.flag} {country?.name} · {product.category}</div></div><div className="hidden text-right sm:block"><div className="font-black">{formatIDR(product.price)}</div><div className="text-xs text-black/35">★ {product.rating}</div></div><button className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7f1eb] text-black/45"><MoreHorizontal size={18} /></button></div>;
            })}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
