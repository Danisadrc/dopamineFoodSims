import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 font-black tracking-tight">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#2d2019] text-xl text-white">🐾</span>
      <span className="text-lg">MEOWEAT</span>
    </Link>
  );
}
