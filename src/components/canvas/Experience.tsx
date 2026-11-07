"use client";
import { Canvas } from "@react-three/fiber";
import CameraRig from "./CameraRig";
import NameParticles from "./NameParticles";
import Tunnel from "./Tunnel";
import CardSpiral from "./CardSpiral";

export default function Experience() {
  return (
    <div className="fixed inset-0" aria-hidden="true">
      <Canvas camera={{ fov: 60, near: 0.1, far: 400, position: [0, 0, 8] }} dpr={[1, 2]}>
        <color attach="background" args={["#0b0b0c"]} />
        <CameraRig />
        <NameParticles />
        <Tunnel />
        <CardSpiral />
      </Canvas>
    </div>
  );
}
