import { Navigate, Route, Routes } from "react-router-dom";
import Storefront from "./pages/Storefront";
import Checkout from "./pages/Checkout";
import Delivery from "./pages/Delivery";
import Admin from "./pages/Admin";
import AdminAds from "./pages/AdminAds";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Storefront />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/ads" element={<AdminAds />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
