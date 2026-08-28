<div align="center">

# 🐾 MEOWEAT

### Real food. Fake delivery. Cat courier.

A playful, mobile-first food-delivery simulation built to feel like a real commerce app — right up until Oyen the cat takes the order.

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#roadmap)

</div>

---

## ✨ What is MEOWEAT?

MEOWEAT is a fictional food-delivery experience featuring **real-world food categories**, playful cat branding, and a deliberately absurd delivery payoff.

> Browse → crave → add to cart → checkout → track Oyen → discover the order was never coming.

No real payment is processed. No real delivery takes place.

---

## 🎯 Experience Flow

```text
HOME
  ↓
GLOBAL FOOD CATALOG
  ↓
ADD TO CART
  ↓
CHECKOUT
  ↓
🐾 PESAN SEKARANG
  ↓
🎉 CHA-CHING + CONFETTI
  ↓
🗺️ FAKE DELIVERY MAP
  ↓
🐱 CAT COURIER
  ↓
⏱️ COUNTDOWN
  ↓
💸 ORDER NOT FOUND
```

---

## 🧩 Current Features

- 🌎 Food catalog inspired by cuisines from multiple countries
- 🛒 Cart with React Context + `useReducer`
- 💾 Cart persistence using `localStorage`
- 💳 Fully simulated checkout — no payment gateway
- 🎟️ Working promo codes
- 🔔 Cha-ching sound generated with Web Audio API
- 🎊 CSS confetti feedback
- 🗺️ SVG fake-map delivery route with multiple turns
- 🐱 Cat courier animation following the route
- 📍 User-entered city + address carried into delivery
- ⏱️ Countdown-based fake delivery experience
- 😂 Final “order never arrives” reveal
- 📢 Sponsored/ad carousel with fixed mobile banner sizing
- 🖼️ Admin ad prototype with upload + preview + scheduling

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Brand.jsx
│   ├── Navbar.jsx
│   ├── HeroBanner.jsx
│   ├── ProductCard.jsx
│   ├── CartBar.jsx
│   ├── CartDrawer.jsx
│   ├── FakeMap.jsx
│   ├── CatStatus.jsx
│   ├── Confetti.jsx
│   └── ChaChing.jsx
│
├── context/
│   └── CartContext.jsx
│
├── data/
│   ├── products.js
│   └── ads.js
│
├── pages/
│   ├── Storefront.jsx
│   ├── Checkout.jsx
│   ├── Delivery.jsx
│   ├── Admin.jsx
│   └── AdminAds.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Then open the Vite development URL shown in your terminal.

### Admin

```text
/admin
/admin/ads
```

---

## 📢 Ads System

The current ad manager is intentionally simple so it can be tested without a backend.

### Admin can currently

- Upload desktop creative
- Upload mobile creative
- Set advertiser name
- Set headline / description
- Set CTA and destination URL
- Set start/end date
- Toggle active/inactive
- Preview creatives
- Edit / delete campaigns
- Publish to the homepage carousel

Current prototype storage uses browser `localStorage` + image Data URLs.

### Production plan

```text
Admin UI
   ↓
Supabase Storage
   ↓
PostgreSQL
   ↓
Active Ad Query
   ↓
Homepage Carousel
```

---

## 🎨 Banner Rules

The homepage ad slot is intentionally kept dimensionally stable:

- Mobile: fixed component height
- Desktop: fixed component height
- Mobile creative recommendation: `1080 × 720`
- Desktop creative recommendation: `1200 × 500`
- Use `object-fit: cover` for uploaded creatives

This prevents carousel slides from jumping in height when different sponsor assets are shown.

---

## 🛣️ Roadmap

### Phase 1 — Experience

- [x] Catalog
- [x] Cart
- [x] Checkout
- [x] Fake delivery
- [x] Cat courier
- [x] Promo codes
- [x] Sponsor carousel

### Phase 2 — CMS / Backend

- [ ] Supabase database
- [ ] Supabase image storage
- [ ] Product CRUD
- [ ] Advertisement CRUD
- [ ] Admin authentication
- [ ] Scheduled campaigns
- [ ] Campaign analytics

### Phase 3 — App

- [ ] PWA configuration
- [ ] Offline shell / caching
- [ ] Capacitor integration
- [ ] Android APK build

---

## ⚠️ Disclaimer

MEOWEAT is a fictional interactive simulation.

**No real food orders, payments, or deliveries are created by the application.**

---

<div align="center">

Made with ☕, code, and one very unreliable cat.

</div>
