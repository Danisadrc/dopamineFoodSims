export const ADS_STORAGE_KEY = "meoweat-ads-v1";

export const defaultAds = [
  {
    id: "ad-001",
    advertiser: "MEOWEAT",
    eyebrow: "GLOBAL FOOD WEEK",
    title: "Real food from around the world.",
    description: "Ramen, pizza, tacos, chicken, and more. Pick your craving before Oyen gets distracted.",
    badge: "UP TO 60% OFF",
    cta: "Explore food",
    href: "#explore",
    desktopImage: "",
    mobileImage: "",
    startDate: "2026-01-01",
    endDate: "2027-12-31",
    active: true,
  },
];

export function loadAds() {
  try {
    const raw = localStorage.getItem(ADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultAds;
  } catch {
    return defaultAds;
  }
}

export function saveAds(ads) {
  localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(ads));
}

export function isAdLive(ad, date = new Date()) {
  const current = new Date(date);
  const start = new Date(`${ad.startDate}T00:00:00`);
  const end = new Date(`${ad.endDate}T23:59:59`);
  return ad.active && current >= start && current <= end;
}
