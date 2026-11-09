"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { scroll } from "@/lib/scroll";
import { panel } from "@/lib/panel";

/** Scroll suave (Lenis) que alimenta o progresso 0..1 usado pela cena 3D. */
export default function ScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    lenis.on("scroll", update);
    const offPanel = panel.subscribe(() => (panel.get() !== null ? lenis.stop() : lenis.start()));
    update();
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); offPanel(); lenis.destroy(); };
  }, []);
  return null;
}
