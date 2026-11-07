"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EdgesGeometry, LineBasicMaterial, PlaneGeometry } from "three";

const N = 40;
/** Molduras que acendem em laranja conforme a câmera passa por elas. */
export default function Tunnel() {
  const geo = useMemo(() => new EdgesGeometry(new PlaneGeometry(6, 6)), []);
  const mats = useRef<LineBasicMaterial[]>([]);
  useFrame(({ camera }) => {
    mats.current.forEach((m, i) => m.color.set(camera.position.z < -6 - i * 3 ? "#FF5B2E" : "#F4F1EA"));
  });
  return (
    <group>
      {Array.from({ length: N }, (_, i) => (
        <lineSegments key={i} geometry={geo} position={[0, 0, -6 - i * 3]} rotation={[0, 0, i * 0.12]}>
          <lineBasicMaterial ref={(m) => { if (m) mats.current[i] = m; }} color="#F4F1EA" />
        </lineSegments>
      ))}
    </group>
  );
}
