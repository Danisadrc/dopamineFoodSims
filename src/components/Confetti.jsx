import { useMemo } from "react";

export default function Confetti({ count = 50 }) {
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    x: `${(Math.random() - 0.5) * 280}px`,
    r: `${Math.random() * 900 - 450}deg`,
    delay: `${Math.random() * 100}ms`,
    bg: ["#ff8c42", "#ffd166", "#3abf80", "#7c7ce7", "#ff6fae"][i % 5],
  })), [count]);

  return pieces.map((p) => <span key={p.id} className="confetti" style={{ left: `${p.left}%`, background: p.bg, "--x": p.x, "--r": p.r, animationDelay: p.delay }} />);
}
