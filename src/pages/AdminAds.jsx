import {
  CalendarDays,
  Check,
  Eye,
  ImagePlus,
  Megaphone,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { defaultAds, isAdLive, loadAds, saveAds } from "../data/ads";
import Brand from "../components/Brand";

const emptyForm = {
  id: "",
  advertiser: "",
  eyebrow: "SPONSORED",
  title: "",
  description: "",
  badge: "",
  cta: "Learn more",
  href: "#explore",
  desktopImage: "",
  mobileImage: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: "2027-12-31",
  active: true,
};

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    if (!file.type.startsWith("image/")) return reject(new Error("File harus berupa gambar."));
    if (file.size > 5 * 1024 * 1024) return reject(new Error("Ukuran maksimal gambar 5 MB."));
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.readAsDataURL(file);
  });
}

export default function AdminAds() {
  const [ads, setAds] = useState(loadAds);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    saveAds(ads);
  }, [ads]);

  const activeAds = useMemo(() => ads.filter((ad) => isAdLive(ad)).length, [ads]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const newAd = () => {
    setForm({ ...emptyForm, id: `ad-${Date.now()}` });
    setEditing(false);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editAd = (ad) => {
    setForm(ad);
    setEditing(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeAd = (id) => {
    if (!window.confirm("Hapus advertisement ini?")) return;
    setAds((current) => current.filter((ad) => ad.id !== id));
  };

  const save = () => {
    if (!form.advertiser.trim() || !form.title.trim()) {
      setMessage("Advertiser dan headline wajib diisi.");
      return;
    }
    if (!form.desktopImage && !form.mobileImage) {
      setMessage("Upload minimal satu banner image.");
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setMessage("End date tidak boleh sebelum start date.");
      return;
    }

    setAds((current) => {
      const exists = current.some((ad) => ad.id === form.id);
      if (exists) return current.map((ad) => ad.id === form.id ? form : ad);
      return [form, ...current];
    });

    setMessage("Advertisement berhasil disimpan.");
    setEditing(true);
  };

  const handleUpload = async (key, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      update(key, dataUrl);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1eb]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6">
          <Brand />
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-[#eaf8f3] px-3 py-1.5 text-xs font-black text-[#16866f] sm:inline-flex">
              {activeAds} live ads
            </span>
            <button onClick={newAd} className="inline-flex items-center gap-2 rounded-2xl bg-[#2d2019] px-4 py-3 text-sm font-black text-white">
              <Plus size={17} /> New Ad
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6">
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-black/35">
            <Megaphone size={14} /> Advertisement manager
          </div>
          <h1 className="mt-1 text-3xl font-black">Sponsored banners</h1>
          <p className="mt-1 text-sm text-black/45">
            Upload creative, atur jadwal, preview, lalu publish ke hero carousel.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
          <section className="space-y-4">
            <div className="overflow-hidden rounded-[1.8rem] bg-white card-shadow">
              <div className="border-b border-black/5 px-5 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">
                  {editing ? "Edit advertisement" : "Create advertisement"}
                </div>
                <h2 className="mt-0.5 text-xl font-black">
                  {editing ? form.advertiser || "Untitled ad" : "New sponsored banner"}
                </h2>
              </div>

              <div className="space-y-5 p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-black/45">Advertiser *</span>
                    <input value={form.advertiser} onChange={(e) => update("advertiser", e.target.value)} placeholder="Brand XYZ" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm outline-none focus:border-[#ff8c42]" />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-black/45">Eyebrow</span>
                    <input value={form.eyebrow} onChange={(e) => update("eyebrow", e.target.value)} placeholder="SPONSORED · SUMMER" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm outline-none focus:border-[#ff8c42]" />
                  </label>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-black/45">Banner creative *</span>
                    <span className="text-[10px] font-bold text-black/30">Max 5 MB / image</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["desktopImage", "Desktop", "1200 × 500"],
                      ["mobileImage", "Mobile", "1080 × 720"],
                    ].map(([key, label, ratio]) => (
                      <div key={key} className="overflow-hidden rounded-2xl border border-dashed border-black/10 bg-[#fffaf5]">
                        <div className="flex items-center justify-between px-4 py-3">
                          <div><div className="text-sm font-black">{label}</div><div className="text-[10px] text-black/35">{ratio}</div></div>
                          {form[key] && <span className="rounded-full bg-[#eaf8f3] px-2 py-1 text-[9px] font-black text-[#16866f]">Uploaded</span>}
                        </div>
                        <div className={`relative flex items-center justify-center overflow-hidden bg-black/3 ${label === "Mobile" ? "aspect-[3/2]" : "aspect-[12/5]"}`}>
                          {form[key] ? (
                            <img src={form[key]} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="text-center text-black/30">
                              <ImagePlus size={24} className="mx-auto" />
                              <div className="mt-1 text-[11px] font-bold">No image</div>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2d2019] px-3 py-2.5 text-xs font-black text-white">
                            <Upload size={14} /> Upload {label}
                            <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => handleUpload(key, e)} />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-black/45">Headline *</span>
                    <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Crispy chicken. Spicy nights." className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-base font-bold outline-none focus:border-[#ff8c42]" />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-black/45">Description</span>
                    <textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="A short sponsor message..." className="w-full resize-none rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm outline-none focus:border-[#ff8c42]" />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label>
                      <span className="mb-1.5 block text-xs font-bold text-black/45">CTA text</span>
                      <input value={form.cta} onChange={(e) => update("cta", e.target.value)} placeholder="Shop now" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm outline-none focus:border-[#ff8c42]" />
                    </label>
                    <label>
                      <span className="mb-1.5 block text-xs font-bold text-black/45">Badge</span>
                      <input value={form.badge} onChange={(e) => update("badge", e.target.value)} placeholder="20% OFF" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm outline-none focus:border-[#ff8c42]" />
                    </label>
                  </div>
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-black/45">Destination URL</span>
                    <input value={form.href} onChange={(e) => update("href", e.target.value)} placeholder="https://brand.com/campaign" className="w-full rounded-xl border border-black/8 bg-[#fffaf5] px-3.5 py-3 text-sm outline-none focus:border-[#ff8c42]" />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-black/45">Start date</span>
                    <div className="relative">
                      <CalendarDays size={15} className="absolute left-3 top-3.5 text-black/30" />
                      <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} className="w-full rounded-xl border border-black/8 bg-[#fffaf5] py-3 pl-9 pr-3 text-sm outline-none focus:border-[#ff8c42]" />
                    </div>
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-black/45">End date</span>
                    <div className="relative">
                      <CalendarDays size={15} className="absolute left-3 top-3.5 text-black/30" />
                      <input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} className="w-full rounded-xl border border-black/8 bg-[#fffaf5] py-3 pl-9 pr-3 text-sm outline-none focus:border-[#ff8c42]" />
                    </div>
                  </label>
                </div>

                <label className="flex items-center justify-between rounded-2xl bg-[#fffaf5] px-4 py-3">
                  <span><span className="block text-sm font-black">Active</span><span className="block text-xs text-black/40">Tampilkan saat tanggalnya aktif.</span></span>
                  <button type="button" onClick={() => update("active", !form.active)} className={`relative h-7 w-12 rounded-full transition ${form.active ? "bg-[#1da68b]" : "bg-black/15"}`}>
                    <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${form.active ? "right-1" : "left-1"}`} />
                  </button>
                </label>

                {message && (
                  <div className={`rounded-xl px-3 py-2.5 text-xs font-bold ${message.includes("berhasil") ? "bg-[#eaf8f3] text-[#16866f]" : "bg-[#fff0ef] text-red-600"}`}>
                    {message}
                  </div>
                )}

                <div className="flex flex-wrap justify-end gap-2">
                  <button onClick={() => form.desktopImage || form.mobileImage ? setPreview(form) : setMessage("Upload image dulu untuk preview.")} className="inline-flex items-center gap-2 rounded-xl bg-[#f2ebe3] px-4 py-3 text-xs font-black">
                    <Eye size={15} /> Preview
                  </button>
                  <button onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-[#2d2019] px-4 py-3 text-xs font-black text-white">
                    <Save size={15} /> {editing ? "Update Ad" : "Publish Ad"}
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.8rem] bg-white card-shadow">
              <div className="border-b border-black/5 px-5 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Campaigns</div>
                <div className="mt-0.5 flex items-center justify-between"><h2 className="font-black">Your advertisements</h2><span className="text-xs font-bold text-black/35">{ads.length} total</span></div>
              </div>

              <div className="divide-y divide-black/5">
                {ads.map((ad) => {
                  const live = isAdLive(ad);
                  return (
                    <div key={ad.id} className="flex gap-4 p-4">
                      <div className="hidden h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-[#f5eee7] sm:block">
                        {(ad.desktopImage || ad.mobileImage) && <img src={ad.desktopImage || ad.mobileImage} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2 py-1 text-[9px] font-black ${live ? "bg-[#eaf8f3] text-[#16866f]" : "bg-black/5 text-black/35"}`}>{live ? "LIVE" : "OFF"}</span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-black/30">{ad.advertiser}</span>
                        </div>
                        <div className="mt-1 truncate font-black">{ad.title}</div>
                        <div className="mt-1 text-xs text-black/40">{ad.startDate} → {ad.endDate}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setPreview(ad)} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f7f1eb] text-black/50"><Eye size={15} /></button>
                        <button onClick={() => editAd(ad)} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f7f1eb] text-black/50"><Pencil size={15} /></button>
                        <button onClick={() => removeAd(ad.id)} className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0ef] text-red-500"><Trash2 size={15} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="h-fit space-y-4 lg:sticky lg:top-20">
            <div className="rounded-[1.8rem] bg-[#2d2019] p-5 text-white">
              <div className="flex items-center gap-2 text-[#ffd79a]">
                <Megaphone size={17} />
                <span className="text-[10px] font-black uppercase tracking-[0.16em]">Ad inventory</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4"><div className="text-[10px] text-white/40">Total</div><div className="mt-1 text-2xl font-black">{ads.length}</div></div>
                <div className="rounded-2xl bg-white/5 p-4"><div className="text-[10px] text-white/40">Live</div><div className="mt-1 text-2xl font-black">{activeAds}</div></div>
              </div>
              <p className="mt-4 text-xs leading-5 text-white/45">Saat ini data disimpan di browser untuk prototyping. Saat backend masuk, storage akan dipindah ke cloud storage + database.</p>
            </div>

            <div className="rounded-[1.8rem] bg-white p-5 card-shadow">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Creative rules</div>
              <div className="mt-3 space-y-2 text-xs leading-5 text-black/55">
                <div>• Mobile: <strong>1080 × 720</strong></div>
                <div>• Desktop: <strong>1200 × 500</strong></div>
                <div>• JPG / PNG / WEBP</div>
                <div>• Max 5 MB per image</div>
                <div>• Label Sponsored selalu tampil</div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {preview && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full max-w-4xl items-center justify-center">
            <div className="w-full overflow-hidden rounded-[2rem] bg-[#fffaf5] shadow-2xl">
              <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
                <div><div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">Preview</div><div className="font-black">{preview.advertiser}</div></div>
                <button onClick={() => setPreview(null)} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f7f1eb]"><X size={17} /></button>
              </div>
              <div className="space-y-5 p-5">
                <div>
                  <div className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-black/35">Desktop</div>
                  <div className="overflow-hidden rounded-2xl bg-[#f1eae2]">
                    {preview.desktopImage ? <img src={preview.desktopImage} alt="" className="aspect-[12/5] w-full object-cover" /> : <div className="grid aspect-[12/5] place-items-center text-sm text-black/30">No desktop image</div>}
                  </div>
                </div>
                <div className="max-w-sm">
                  <div className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-black/35">Mobile</div>
                  <div className="overflow-hidden rounded-2xl bg-[#f1eae2]">
                    {preview.mobileImage || preview.desktopImage ? <img src={preview.mobileImage || preview.desktopImage} alt="" className="aspect-[3/2] w-full object-cover" /> : <div className="grid aspect-[3/2] place-items-center text-sm text-black/30">No mobile image</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
