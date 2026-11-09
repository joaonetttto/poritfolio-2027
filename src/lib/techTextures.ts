import { CanvasTexture } from "three";

export type Tech = { name: string; icon: string };
const FG = "#F4F1EA", AC = "#FF5B2E", BG = "#26262b";

/** Cria as duas faces do cubo de uma tecnologia: uma com a imagem (fundo claro) e outra com o nome. */
export function makeTechFaces(t: Tech, j: number) {
  const border = j % 2 ? AC : FG;
  const mk = () => { const c = document.createElement("canvas"); c.width = c.height = 256; return c; };
  const nameC = mk(), iconC = mk();

  const drawName = () => {
    const x = nameC.getContext("2d")!;
    x.fillStyle = BG; x.fillRect(0, 0, 256, 256);
    x.strokeStyle = border; x.lineWidth = 14; x.strokeRect(7, 7, 242, 242);
    let size = 64;
    x.textAlign = "center";
    do { x.font = `700 ${size}px Arial, sans-serif`; size -= 4; } while (x.measureText(t.name).width > 200 && size > 16);
    x.fillStyle = FG; x.fillText(t.name, 128, 128 + size / 3);
  };
  const drawIcon = (img?: HTMLImageElement) => {
    const x = iconC.getContext("2d")!;
    x.fillStyle = FG; x.fillRect(0, 0, 256, 256);
    if (img) {
      const sc = Math.min(190 / img.width, 190 / img.height), w = img.width * sc, h = img.height * sc;
      x.drawImage(img, (256 - w) / 2, (256 - h) / 2, w, h);
    }
    x.strokeStyle = border; x.lineWidth = 14; x.strokeRect(7, 7, 242, 242);
  };
  drawName(); drawIcon();

  const nameTex = new CanvasTexture(nameC), iconTex = new CanvasTexture(iconC);
  nameTex.anisotropy = iconTex.anisotropy = 8;
  const img = new Image();
  img.onload = () => { drawIcon(img); iconTex.needsUpdate = true; };
  img.src = t.icon;
  return { nameTex, iconTex };
}
