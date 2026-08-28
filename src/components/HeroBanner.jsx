import { ChevronLeft, ChevronRight, ExternalLink, Megaphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { defaultAds, isAdLive, loadAds } from "../data/ads";

const fallbackVisuals = ["🍜", "🍗", "🍕"];

export default function HeroBanner() {
  const [ads, setAds] = useState([]);
  const [active, setActive] = useState(0);
  const touchStart = useRef(null);

  useEffect(() => {
    const liveAds = loadAds().filter((ad) => isAdLive(ad));
    setAds(liveAds.length ? liveAds : defaultAds);
  }, []);

  useEffect(() => {
    if (ads.length <= 1) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % ads.length),
      5000
    );
    return () => window.clearInterval(timer);
  }, [ads.length]);

  useEffect(() => {
    if (active >= ads.length) setActive(0);
  }, [active, ads.length]);

  if (!ads.length) return null;

  const slide = ads[active];

  const move = (direction) => {
    setActive((current) => (current + direction + ads.length) % ads.length);
  };

  const onTouchStart = (event) => {
    touchStart.current = event.changedTouches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 45 && ads.length > 1) move(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const handleCta = () => {
    if (slide.href?.startsWith("#")) {
      document.querySelector(slide.href)?.scrollIntoView({ behavior: "smooth" });
    } else if (slide.href) {
      window.location.href = slide.href;
    }
  };

  const mobileImage = slide.mobileImage || slide.desktopImage;
  const desktopImage = slide.desktopImage || slide.mobileImage;
  const visual = fallbackVisuals[active % fallbackVisuals.length];

  return (
    <section
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative h-[320px] w-full overflow-hidden rounded-[2rem] bg-[#ffd79a] sm:h-[350px]"
      aria-label="Sponsored advertisements"
    >
      {desktopImage && (
        <picture className="absolute inset-0 block">
          <source media="(max-width: 639px)" srcSet={mobileImage} />
          <img
            src={desktopImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d2019]/65 via-[#2d2019]/20 to-transparent" />
        </picture>
      )}

      {!desktopImage && (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffd79a,#ffc786)]" />
      )}

      <div className="absolute inset-y-0 right-0 w-[36%] sm:w-[34%]">
        {!desktopImage && (
          <>
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[5.2rem] leading-none drop-shadow-md sm:text-[8rem]">{visual}</div>
            </div>
            <div className="absolute bottom-8 right-4 text-[3rem] leading-none sm:bottom-10 sm:right-8 sm:text-[4rem]">🐱</div>
          </>
        )}
      </div>

      <div className="relative z-10 flex h-full w-[76%] flex-col justify-between p-5 sm:w-[68%] sm:p-8">
        <div className="min-h-0">
          <div className="flex h-7 items-center gap-2 overflow-hidden">
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#6d4730]">
              <Megaphone size={10} /> Sponsored
            </span>
            <span className="truncate rounded-full bg-white/75 px-2.5 py-1 text-[9px] font-bold text-[#6d4730]">
              {slide.advertiser}
            </span>
          </div>

          <div className="mt-2 flex h-7 items-center overflow-hidden">
            <span className="truncate text-[9px] font-black uppercase tracking-[0.14em] text-[#6d4730]">
              {slide.eyebrow}
            </span>
          </div>

          <h1 className={`mt-2 line-clamp-3 max-w-[18rem] text-[2rem] font-black leading-[0.98] tracking-tight sm:max-w-[30rem] sm:text-5xl ${desktopImage ? "text-white" : "text-[#271c15]"}`}>
            {slide.title}
          </h1>

          <p className={`mt-3 line-clamp-3 max-w-[19rem] text-xs leading-5 sm:max-w-xl sm:text-sm sm:leading-6 ${desktopImage ? "text-white/80" : "text-[#634936]"}`}>
            {slide.description}
          </p>
        </div>

        <div className="flex min-h-[46px] max-w-[19rem] flex-wrap items-center gap-2 sm:max-w-xl sm:gap-3">
          <button
            onClick={handleCta}
            className="h-11 shrink-0 rounded-2xl bg-[#2d2019] px-4 text-xs font-black text-white shadow-lg shadow-black/10 sm:px-5 sm:text-sm"
          >
            {slide.cta || "Learn more"} →
          </button>
          {slide.badge && (
            <span className="flex h-11 items-center rounded-2xl bg-white/85 px-3.5 text-[10px] font-black text-[#6d4730] sm:px-4 sm:text-xs">
              {slide.badge}
            </span>
          )}
        </div>
      </div>

      {ads.length > 1 && (
        <div className="absolute right-4 top-4 z-20 hidden gap-1.5 sm:flex">
          <button onClick={() => move(-1)} className="grid h-9 w-9 place-items-center rounded-xl bg-white/80 text-[#2d2019]" aria-label="Previous advertisement">
            <ChevronLeft size={17} />
          </button>
          <button onClick={() => move(1)} className="grid h-9 w-9 place-items-center rounded-xl bg-white/80 text-[#2d2019]" aria-label="Next advertisement">
            <ChevronRight size={17} />
          </button>
        </div>
      )}

      <div className="absolute bottom-4 left-5 z-20 flex h-2 items-center gap-1.5 sm:left-8">
        {ads.map((ad, index) => (
          <button
            key={ad.id}
            onClick={() => setActive(index)}
            aria-label={`Show advertisement ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-[#2d2019]" : "w-1.5 bg-[#2d2019]/25"}`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-5 z-20 hidden items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/60 sm:flex">
        <ExternalLink size={10} /> Ad
      </div>
    </section>
  );
}
