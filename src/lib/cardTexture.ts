import { CanvasTexture } from "three";
import type { Card } from "@/data/portfolio";

const MU = "#A9A69E", SO = "#D9D5CB", FG = "#F4F1EA", AC = "#FF5B2E";

/** Desenha o card no canvas (340x220 lógicos, 3x de resolução). `logo` (imagem do card: logo da formação ou foto do "Sobre mim") e `cover` (projetos) são opcionais. */
function paint(k: HTMLCanvasElement, card: Card, logo?: HTMLImageElement, cover?: HTMLImageElement) {
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
      if (logo) { // foto redonda: preenche o círculo; imageFocusY (0 a 1) escolhe qual parte da altura aparece
        const sc = Math.max(84 / logo.width, 84 / logo.height), w = logo.width * sc, h = logo.height * sc;
        x.save(); x.beginPath(); x.arc(276, 62, 42, 0, 6.283); x.clip();
        x.drawImage(logo, 276 - w / 2, 20 - (h - 84) * (card.imageFocusY ?? 0.3), w, h); x.restore();
      } else t("sua foto", 252, 66, 11, MU, 500);
      x.beginPath(); x.arc(276, 62, 42, 0, 6.283); x.strokeStyle = AC; x.lineWidth = 3; x.stroke();
      t("Sobre mim", 20, 36, 13, MU); t(card.title, 20, 76, 28);
      L.forEach((l, j) => t(l, 20, 108 + j * 22, 14, SO, 500)); break;
    case "edu":
      if (logo) {
        const sc = Math.min(84 / logo.width, 56 / logo.height), w = logo.width * sc, h = logo.height * sc;
        x.drawImage(logo, 20, 20 + (56 - h) / 2, w, h);
      } else {
        x.strokeStyle = FG; x.lineWidth = 2; x.strokeRect(20, 20, 84, 56);
        t("ETEC", 32, 56, 26);
      }
      t("Formação", 120, 36, 13, MU); t(T[0], 120, 62, 20); t(T[1] ?? "", 120, 86, 18);
      t(L[0] ?? "", 20, 140, 16, SO, 500); t(L[1] ?? "", 20, 166, 14, MU, 500); break;
    case "tech":
      t(card.title, 20, 36, 22); t(L[0] ?? "", 20, 60, 12, MU, 500); break;
    case "title":
      T.forEach((l, j) => t(l, 20, 70 + j * 38, 34, j === 2 ? AC : FG));
      t("3", 250, 160, 170, "rgba(244,241,234,.14)"); break;
    case "project":
      x.fillStyle = "#26262b"; x.fillRect(16, 16, 308, 100);
      if (cover) { // capa preenchendo o retângulo, alinhada ao topo
        const sc = Math.max(308 / cover.width, 100 / cover.height), w = cover.width * sc, h = cover.height * sc;
        x.save(); x.beginPath(); x.rect(16, 16, 308, 100); x.clip();
        x.drawImage(cover, 16 + (308 - w) / 2, 16, w, h); x.restore();
      } else {
        x.fillStyle = "#17171a"; x.fillRect(16, 16, 308, 16);
        [AC, FG, MU].forEach((c, j) => { x.beginPath(); x.arc(28 + j * 12, 24, 3, 0, 6.283); x.fillStyle = c; x.fill(); });
        x.fillStyle = "#34343a"; x.fillRect(28, 44, 120, 10); x.fillRect(28, 62, 200, 8);
        x.fillRect(28, 76, 160, 8); x.fillRect(240, 44, 70, 60);
        t("foto da cara do sistema", 100, 108, 10, MU, 500);
      }
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
}

export function makeCardTexture(card: Card): CanvasTexture {
  const k = document.createElement("canvas");
  k.width = 1020; k.height = 660;
  paint(k, card);
  const tex = new CanvasTexture(k);
  tex.anisotropy = 8;
  // Imagens carregam depois; a cada uma que chega, o card é redesenhado.
  const imgs: { logo?: HTMLImageElement; cover?: HTMLImageElement } = {};
  const load = (src: string | undefined, key: "logo" | "cover") => {
    if (!src) return;
    const img = new Image();
    img.onload = () => { imgs[key] = img; paint(k, card, imgs.logo, imgs.cover); tex.needsUpdate = true; };
    img.src = src;
  };
  load(card.image, "logo");
  load(card.cover, "cover");
  return tex;
}
