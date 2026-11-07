import { BufferAttribute, BufferGeometry } from "three";

export type Particles = { tg: number[]; st: Float32Array; ps: Float32Array; geo: BufferGeometry };

/** Amostra o texto em um canvas e cria as partículas (posição solta + posição final no nome). */
export function buildParticles(text: string): Particles {
  const c = document.createElement("canvas"); c.width = 600; c.height = 240;
  const x = c.getContext("2d")!;
  x.fillStyle = "#fff"; x.font = "900 150px Arial, sans-serif"; x.textAlign = "center";
  x.fillText(text, 300, 190);
  const d = x.getImageData(0, 0, 600, 240).data, tg: number[] = [];
  for (let y = 0; y < 240; y += 2) for (let i = 0; i < 600; i += 2)
    if (d[(y * 600 + i) * 4 + 3] > 128) tg.push((i - 300) / 34, -(y - 120) / 34, 0);
  const n = tg.length / 3, st = new Float32Array(n * 3), ps = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 6 + Math.random() * 10, a = Math.random() * 6.28, b = Math.acos(Math.random() * 2 - 1);
    st[i * 3] = r * Math.sin(b) * Math.cos(a); st[i * 3 + 1] = r * Math.sin(b) * Math.sin(a); st[i * 3 + 2] = r * Math.cos(b);
  }
  const geo = new BufferGeometry(); geo.setAttribute("position", new BufferAttribute(ps, 3));
  return { tg, st, ps, geo };
}

/** e = 0 (espalhadas) até 1 (formando o nome). */
export function updateParticles(p: Particles, e: number) {
  for (let i = 0; i < p.ps.length; i++) p.ps[i] = p.st[i] + (p.tg[i] - p.st[i]) * e;
  p.geo.attributes.position.needsUpdate = true;
}
