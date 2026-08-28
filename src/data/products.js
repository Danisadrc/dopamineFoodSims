export const countries = [
  { id: "japan", name: "Japan", flag: "🇯🇵" },
  { id: "korea", name: "Korea", flag: "🇰🇷" },
  { id: "italy", name: "Italy", flag: "🇮🇹" },
  { id: "thailand", name: "Thailand", flag: "🇹🇭" },
  { id: "mexico", name: "Mexico", flag: "🇲🇽" },
  { id: "indonesia", name: "Indonesia", flag: "🇮🇩" }
];

export const products = [
  { id: 1, country: "japan", name: "Tonkotsu Ramen", category: "Ramen", price: 59000, originalPrice: 95000, rating: 4.9, sold: 2400, badge: "Best Seller", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85" },
  { id: 2, country: "japan", name: "Salmon Sushi Set", category: "Sushi", price: 78000, originalPrice: 115000, rating: 4.8, sold: 1800, badge: "Popular", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85" },
  { id: 3, country: "korea", name: "Korean Fried Chicken", category: "Chicken", price: 72000, originalPrice: 105000, rating: 4.9, sold: 3100, badge: "Trending", image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=900&q=85" },
  { id: 4, country: "korea", name: "Tteokbokki", category: "Street Food", price: 45000, originalPrice: 69000, rating: 4.7, sold: 2100, badge: "Hot", image: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?auto=format&fit=crop&w=900&q=85" },
  { id: 5, country: "italy", name: "Neapolitan Pizza", category: "Pizza", price: 89000, originalPrice: 125000, rating: 4.8, sold: 1700, badge: "Chef Pick", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85" },
  { id: 6, country: "italy", name: "Classic Tiramisu", category: "Dessert", price: 52000, originalPrice: 74000, rating: 4.9, sold: 1300, badge: "Sweet", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85" },
  { id: 7, country: "thailand", name: "Pad Thai", category: "Noodles", price: 49000, originalPrice: 71000, rating: 4.8, sold: 1900, badge: "Popular", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=85" },
  { id: 8, country: "mexico", name: "Street Tacos", category: "Tacos", price: 61000, originalPrice: 88000, rating: 4.7, sold: 1400, badge: "Fan Fav", image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=85" },
  { id: 9, country: "indonesia", name: "Nasi Goreng Kampung", category: "Rice", price: 38000, originalPrice: 55000, rating: 4.9, sold: 4200, badge: "Local Fav", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85" }
];

export const formatIDR = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
