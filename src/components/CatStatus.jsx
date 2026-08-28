export default function getCatStatus(progress) {
  if (progress < 8) return { title: "Finding your courier...", sub: "Oyen sedang mencari helm yang ukurannya pas." };
  if (progress < 24) return { title: "Courier found!", sub: "Dia sudah online. Secara teknis." };
  if (progress < 45) return { title: "Picked up your order.", sub: "Semuanya terlihat sangat profesional." };
  if (progress < 63) return { title: "Heading to your address.", sub: "Oyen mengikuti rute merah dengan percaya diri." };
  if (progress < 78) return { title: "Making a tiny detour...", sub: "Katanya jalan ini lebih estetik." };
  if (progress < 91) return { title: "Smells the food.", sub: "Ini perkembangan yang mengkhawatirkan." };
  if (progress < 99) return { title: "Almost there!", sub: "Atau... hampir tidak." };
  return { title: "Status: meow.", sub: "Kami mulai kehilangan kepercayaan diri." };
}
