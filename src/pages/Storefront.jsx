import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import CartBar from "../components/CartBar";
import CartDrawer from "../components/CartDrawer";
import { countries, products } from "../data/products";

export default function Storefront() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(
    () => selectedCountry === "all" ? products : products.filter((product) => product.country === selectedCountry),
    [selectedCountry]
  );

  return (
    <>
      <Navbar onCart={() => setCartOpen(true)} />
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 sm:px-6 sm:pt-8">
        <div className="mb-1"><HeroBanner /></div>
        <section id="explore" className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Explore by country</p><h2 className="mt-1 text-2xl font-black sm:text-3xl">Cravings know no borders.</h2></div>
            <button onClick={() => setSelectedCountry("all")} className="hidden items-center gap-1 text-sm font-bold text-black/55 sm:flex">View all <ChevronRight size={16} /></button>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setSelectedCountry("all")} className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-bold ${selectedCountry === "all" ? "bg-[#2d2019] text-white" : "bg-white text-black/60"}`}>🌎 All</button>
            {countries.map((country) => <button key={country.id} onClick={() => setSelectedCountry(country.id)} className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-bold ${selectedCountry === country.id ? "bg-[#2d2019] text-white" : "bg-white text-black/60"}`}>{country.flag} {country.name}</button>)}
          </div>
        </section>
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Trending now</p><h2 className="mt-1 text-2xl font-black">Looks suspiciously delicious.</h2></div><div className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black/45">{filteredProducts.length} menus</div></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>
      </main>
      <CartBar onOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
