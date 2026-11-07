"use client";
import dynamic from "next/dynamic";
// A cena 3D só roda no navegador (usa canvas e WebGL).
const Experience = dynamic(() => import("./Experience"), { ssr: false });
export default function ExperienceLoader() { return <Experience />; }
