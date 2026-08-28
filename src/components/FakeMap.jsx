import { useEffect, useRef, useState } from "react";

const ROUTE = "M 78 302 L 160 302 L 160 216 L 310 216 L 310 276 L 438 276 L 438 128 L 508 128";

export default function FakeMap({ progress, city }) {
  const pathRef = useRef(null);
  const [point, setPoint] = useState({ x: 78, y: 302 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const totalLength = path.getTotalLength();
    const distance = (Math.max(0, Math.min(100, progress)) / 100) * totalLength;
    const current = path.getPointAtLength(distance);
    setPoint({ x: current.x, y: current.y });
  }, [progress]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#e6dfd7] shadow-inner">
      <div className="map-grid absolute inset-0 opacity-70" />
      <svg viewBox="0 0 580 390" className="relative block h-auto w-full">
        {/* city blocks */}
        <g fill="#dfe4e2">
          <rect x="20" y="36" width="120" height="62" rx="8" />
          <rect x="166" y="36" width="105" height="62" rx="8" />
          <rect x="290" y="34" width="118" height="64" rx="8" />
          <rect x="432" y="35" width="112" height="63" rx="8" />
          <rect x="22" y="116" width="126" height="72" rx="8" />
          <rect x="176" y="116" width="116" height="72" rx="8" />
          <rect x="316" y="116" width="93" height="72" rx="8" />
          <rect x="431" y="118" width="113" height="72" rx="8" />
          <rect x="24" y="206" width="116" height="70" rx="8" />
          <rect x="174" y="206" width="112" height="70" rx="8" />
          <rect x="330" y="206" width="79" height="70" rx="8" />
          <rect x="22" y="294" width="125" height="64" rx="8" />
          <rect x="172" y="294" width="112" height="64" rx="8" />
          <rect x="309" y="294" width="101" height="64" rx="8" />
        </g>

        {/* green park */}
        <path d="M420 213 Q480 195 542 227 L542 360 Q490 378 425 346 Z" fill="#c3e6c7" />
        <path d="M441 226 Q472 210 504 224 T535 272" fill="none" stroke="#a6d3ab" strokeWidth="8" strokeLinecap="round" />

        {/* road underlay */}
        <path ref={pathRef} d={ROUTE} fill="none" stroke="#c6b9ab" strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" />
        <path d={ROUTE} fill="none" stroke="#fffaf5" strokeWidth="41" strokeLinecap="round" strokeLinejoin="round" />
        <path d={ROUTE} fill="none" stroke="#ec5d52" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

        {/* destination */}
        <circle cx="508" cy="128" r="24" fill="#fffaf5" stroke="#1da68b" strokeWidth="5" />
        <text x="508" y="135" textAnchor="middle" fontSize="18">🏠</text>
        <rect x="468" y="151" width="80" height="27" rx="13.5" fill="#fffaf5" />
        <text x="508" y="169" textAnchor="middle" fontSize="13" fontWeight="800" fill="#4d4038">{city || "Home"}</text>

        {/* restaurant */}
        <circle cx="78" cy="302" r="23" fill="#fffaf5" stroke="#ef6b61" strokeWidth="5" />
        <text x="78" y="309" textAnchor="middle" fontSize="17">🍜</text>
        <rect x="39" y="324" width="79" height="27" rx="13.5" fill="#fffaf5" />
        <text x="78" y="342" textAnchor="middle" fontSize="13" fontWeight="800" fill="#4d4038">Restaurant</text>

        {/* courier pin */}
        <g transform={`translate(${point.x} ${point.y})`}>
          <circle cx="0" cy="0" r="29" fill="#1da68b" opacity=".15" />
          <circle cx="0" cy="0" r="19" fill="#1da68b" />
          <text x="0" y="8" textAnchor="middle" fontSize="18">🐱</text>
        </g>
      </svg>

      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black shadow-sm">
        Live-ish tracking
      </div>
      <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 text-[10px] font-bold leading-4 text-black/55">
        Route is fictional.<br />Cat navigation is not.
      </div>
    </div>
  );
}
