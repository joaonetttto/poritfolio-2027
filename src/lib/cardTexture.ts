import { CanvasTexture } from "three";
import type { Card } from "@/data/portfolio";

const MU = "#A9A69E", SO = "#D9D5CB", FG = "#F4F1EA", AC = "#FF5B2E";

/** Desenha o card em um canvas (340x220 lógicos, 3x de resolução). */
export function makeCardTexture(card: Card): CanvasTexture {
  const k = document.createElement("canvas");
  k.width = 1020; k.height = 660;
  const x = k.getContext("2d")!;
  x.setTransform(3, 0, 0, 3, 0, 0);
  x.fillStyle = "#17171a"; x.fillRect(0, 0, 340, 220);
  const g = x.createRadialGradient(300, 200, 0, 300, 200, 200);
  g.addColorStop(0, "rgba(255,91,46,.22)"); g.addColorStop(1, "rgba(255,91,46,0)");
  x.fillStyle = g; x.fillRect(0, 0, 340, 220);
  const t = (s: string, px: number, py: number, sz: number, c = FG, w = 700) => {
    x.fillStyle = c; x.font = `${w} ${sz}px Arial, sans-serif`; x.fillText(s, px, py);
  };
  const chip = (s: string, px: number, py: number) => {
    x.font = "700 11px Arial"; const w = x.measureText(s).width + 14;
    x.strokeStyle = FG; x.lineWidth = 1; x.strokeRect(px, py, w, 20);
    x.fillStyle = FG; x.fillText(s, px + 7, py + 14); return px + w + 6;
  };
  x.fillStyle = AC; x.fillRect(20, 196, 48, 4);
  const L = card.lines ?? [], T = card.title.split("|");
  switch (card.kind) {
    case "about":
      x.beginPath(); x.arc(276, 62, 42, 0, 6.283); x.fillStyle = "#2a2a2e"; x.fill();
      x.strokeStyle = AC; x.lineWidth = 3; x.stroke(); t("sua foto", 252, 66, 11, MU, 500);
      t("Sobre mim", 20, 36, 13, MU); t(card.title, 20, 76, 28);
      L.forEach((l, j) => t(l, 20, 108 + j * 22, 14, SO, 500)); break;
    case "edu":
      x.strokeStyle = FG; x.lineWidth = 2; x.strokeRect(20, 20, 84, 56);
      t("ETEC", 32, 56, 26); t("(logo oficial)", 30, 92, 10, MU, 500);
      t("Formação", 120, 36, 13, MU); t(T[0], 120, 62, 20); t(T[1] ?? "", 120, 86, 18);
      t(L[0] ?? "", 20, 140, 16, SO, 500); t(L[1] ?? "", 20, 166, 14, MU, 500); break;
    case "tech":
      t(card.title, 20, 36, 22); t(L[0] ?? "", 20, 60, 12, MU, 500); break;
    case "title":
      T.forEach((l, j) => t(l, 20, 70 + j * 38, 34, j === 2 ? AC : FG));
      t("3", 250, 160, 170, "rgba(244,241,234,.14)"); break;
    case "project":
      x.fillStyle = "#26262b"; x.fillRect(16, 16, 308, 100);
      x.fillStyle = "#17171a"; x.fillRect(16, 16, 308, 16);
      [AC, FG, MU].forEach((c, j) => { x.beginPath(); x.arc(28 + j * 12, 24, 3, 0, 6.283); x.fillStyle = c; x.fill(); });
      x.fillStyle = "#34343a"; x.fillRect(28, 44, 120, 10); x.fillRect(28, 62, 200, 8);
      x.fillRect(28, 76, 160, 8); x.fillRect(240, 44, 70, 60);
      t("foto da cara do sistema", 100, 108, 10, MU, 500);
      t(card.title, 20, 142, 20); t(L[0] ?? "", 20, 162, 12, MU, 500);
      { let cx = 20; (card.chips ?? []).forEach((c) => (cx = chip(c, cx, 170))); } break;
    case "social":
      t(card.title, 20, 36, 22); t(L[0] ?? "", 20, 62, 13, MU, 500);
      [0, 1, 2].forEach((j) => { x.beginPath(); x.arc(50 + j * 70, 122, 26, 0, 6.283);
        x.strokeStyle = j === 1 ? AC : FG; x.lineWidth = 2; x.stroke(); t("@", 41 + j * 70, 131, 24); });
      t(L[1] ?? "", 20, 180, 12, MU, 500); break;
    case "contact":
      t(card.title, 20, 36, 22); t(L[0] ?? "", 20, 62, 13, MU, 500);
      t(L[1] ?? "", 20, 110, 16, SO, 500); t(L[2] ?? "", 20, 140, 16, SO, 500); break;
  }
  const tex = new CanvasTexture(k);
  tex.anisotropy = 8;
  return tex;
}
