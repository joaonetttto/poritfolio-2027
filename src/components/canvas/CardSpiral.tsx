"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, Color, DoubleSide, EdgesGeometry, Group, PlaneGeometry } from "three";
import { cards, techIcons } from "@/data/portfolio";
import { makeCardTexture } from "@/lib/cardTexture";
import { O, cardPos } from "@/lib/timeline";

/** Cubos 3D girando na frente do card "O que eu uso" (trocar por logos reais depois). */
function TechCubes() {
  const g = useRef<Group>(null!);
  const tex = useMemo(() => techIcons.map((label, j) => {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const y = c.getContext("2d")!;
    y.fillStyle = "#26262b"; y.fillRect(0, 0, 128, 128);
    y.strokeStyle = j % 2 ? "#FF5B2E" : "#F4F1EA"; y.lineWidth = 8; y.strokeRect(4, 4, 120, 120);
    y.fillStyle = "#F4F1EA"; y.font = `700 ${label.length > 3 ? 32 : 46}px Arial`; y.textAlign = "center";
    y.fillText(label, 64, label.length > 3 ? 76 : 80);
    return new CanvasTexture(c);
  }), []);
  useFrame(({ clock }) => g.current.children.forEach((m, j) => {
    m.rotation.y += 0.012; m.rotation.x = Math.sin(clock.elapsedTime * 1.1 + j) * 0.35;
  }));
  return (
    <group ref={g}>
      {tex.map((t, j) => (
        <mesh key={j} position={[-1.2 + j * 0.6, -0.3, 0.45]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} /><meshBasicMaterial map={t} />
        </mesh>
      ))}
    </group>
  );
}

/** A espiral de cards: cada item de data/portfolio.ts vira um card. */
export default function CardSpiral() {
  const planeGeo = useMemo(() => new PlaneGeometry(3.4, 2.2), []);
  const edgeGeo = useMemo(() => new EdgesGeometry(planeGeo), [planeGeo]);
  const textures = useMemo(() => cards.map(makeCardTexture), []);
  return (
    <group>
      {cards.map((c, i) => {
        const p = cardPos(i);
        const edge = new Color("#F4F1EA").lerp(new Color("#FF5B2E"), i / cards.length);
        return (
          <group key={i} position={p} ref={(g) => { g?.lookAt(O.x, p.y, O.z); }}>
            <mesh geometry={planeGeo}><meshBasicMaterial map={textures[i]} side={DoubleSide} /></mesh>
            <lineSegments geometry={edgeGeo}><lineBasicMaterial color={edge} /></lineSegments>
            {c.kind === "tech" && <TechCubes />}
          </group>
        );
      })}
    </group>
  );
}
