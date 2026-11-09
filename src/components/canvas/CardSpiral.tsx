"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, DoubleSide, EdgesGeometry, Group, PlaneGeometry } from "three";
import { cards, techs } from "@/data/portfolio";
import { makeCardTexture } from "@/lib/cardTexture";
import { makeTechFaces } from "@/lib/techTextures";
import { panel } from "@/lib/panel";
import { O, cardPos } from "@/lib/timeline";

/** Cubos 3D girando na frente do card "O que eu uso": faces com a imagem alternando com faces com o nome. */
function TechCubes() {
  const g = useRef<Group>(null);
  const faces = useMemo(() => techs.map(makeTechFaces), []);
  useFrame(({ clock }) => g.current?.children.forEach((m, j) => {
    m.rotation.y += 0.012; m.rotation.x = Math.sin(clock.elapsedTime * 1.1 + j) * 0.35;
  }));
  return (
    <group ref={g}>
      {faces.map((f, j) => (
        <mesh key={j} position={[-1.24 + j * 0.62, -0.3, 0.45]}>
          <boxGeometry args={[0.56, 0.56, 0.56]} />
          <meshBasicMaterial attach="material-0" map={f.nameTex} />
          <meshBasicMaterial attach="material-1" map={f.nameTex} />
          <meshBasicMaterial attach="material-2" color="#26262b" />
          <meshBasicMaterial attach="material-3" color="#26262b" />
          <meshBasicMaterial attach="material-4" map={f.iconTex} />
          <meshBasicMaterial attach="material-5" map={f.iconTex} />
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
            <mesh
              geometry={planeGeo}
              onClick={c.description ? (e) => { e.stopPropagation(); panel.set(i); } : undefined}
              onPointerOver={c.description ? () => { document.body.style.cursor = "pointer"; } : undefined}
              onPointerOut={c.description ? () => { document.body.style.cursor = ""; } : undefined}
            >
              <meshBasicMaterial map={textures[i]} side={DoubleSide} />
            </mesh>
            <lineSegments geometry={edgeGeo}><lineBasicMaterial color={edge} /></lineSegments>
            {c.kind === "tech" && <TechCubes />}
          </group>
        );
      })}
    </group>
  );
}
