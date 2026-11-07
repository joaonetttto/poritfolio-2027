"use client";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { scroll } from "@/lib/scroll";
import { sample } from "@/lib/timeline";

/** Move a câmera ao longo do roteiro conforme o scroll. */
export default function CameraRig() {
  useFrame(({ camera }, delta) => {
    scroll.current = MathUtils.damp(scroll.current, scroll.target, 5, delta);
    const s = sample(scroll.current);
    camera.position.copy(s.pos);
    camera.up.set(-Math.sin(s.roll), Math.cos(s.roll), 0);
    camera.lookAt(s.look);
  });
  return null;
}
