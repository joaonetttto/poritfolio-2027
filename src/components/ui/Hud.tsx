"use client";
import { useEffect, useRef, useState } from "react";
import { scroll } from "@/lib/scroll";
import { sample } from "@/lib/timeline";

/** Legenda grande no centro + barra de progresso. */
export default function Hud() {
  const [caption, setCaption] = useState("");
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let id = 0, last = "";
    const loop = () => {
      const q = scroll.current, c = sample(q).caption;
      if (c !== last) { last = c; setCaption(c); }
      if (bar.current) bar.current.style.width = `${q * 100}%`;
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 flex flex-col justify-between p-6 text-[#F4F1EA]">
      <div className="text-xs uppercase tracking-[0.18em] text-[#A9A69E]">João Renato · portfólio</div>
      <div key={caption} className="animate-[fade_.4s_ease-out] text-center text-5xl font-bold tracking-tight [text-shadow:0_0_24px_#0b0b0c] md:text-7xl">
        {caption}
      </div>
      <div>
        <div className="h-0.5 bg-[#333]"><div ref={bar} className="h-full w-0 bg-[#FF5B2E]" /></div>
        <div className="mt-2.5 text-xs uppercase tracking-[0.18em] text-[#A9A69E]">role devagar ↓</div>
      </div>
    </div>
  );
}
