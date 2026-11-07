"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";
import { profile } from "@/data/portfolio";
import { buildParticles, updateParticles } from "@/lib/particles";
import { scroll } from "@/lib/scroll";
import { sample } from "@/lib/timeline";

/** O nome formado por partículas que se juntam no começo do scroll. */
export default function NameParticles() {
  const ref = useRef<Points>(null);
  const data = useMemo(() => buildParticles(profile.shortName), []);
  useFrame(({ camera }) => {
    const e = sample(scroll.current).intro;
    updateParticles(data, e);
    if (!ref.current) return;
    ref.current.rotation.set((1 - e) * 0.6, (1 - e) * 2, 0);
    ref.current.visible = camera.position.z > -2;
  });
  return <points ref={ref} geometry={data.geo}><pointsMaterial size={0.09} color="#F4F1EA" /></points>;
}
