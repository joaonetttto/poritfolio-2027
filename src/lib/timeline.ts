import { Vector3 } from "three";
import { cards, intro } from "@/data/portfolio";

export const O = new Vector3(0, 0, -150); // centro da espiral
export const RADIUS = 6.5;
const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

export const cardPos = (i: number) => {
  const a = Math.PI + i * 0.62;
  return new Vector3(O.x + Math.sin(a) * RADIUS, O.y + i * 1.6, O.z + Math.cos(a) * RADIUS);
};

/** Dado o progresso do scroll (0..1), devolve câmera, legenda e estados da cena. */
export function sample(q: number) {
  const NC = cards.length;
  const u = cl((q - 0.1) / 0.52);
  const z = 8 - 158 * (u * u * (3 - 2 * u));
  const sp = cl((q - 0.72) / 0.28) * NC;
  const k = Math.min(NC - 1, Math.floor(sp));
  const fk = sp >= NC ? 1 : sp - k;
  const mv = k < NC - 1 ? ease(cl((fk - 0.8) / 0.2)) : 0; // saída para o próximo card
  const ci = k + mv;
  const y = ci * 1.6;
  const zoom = q >= 0.72 ? ease(cl((fk - 0.25) / 0.2)) * (1 - mv) : 0; // aproxima do card
  const roll = u * 1.6 * (1 - ease(cl((q - 0.6) / 0.1)));
  const w = ease(cl((q - 0.6) / 0.12));
  const c = cardPos(ci);
  const pos = new Vector3((c.x - O.x) * 0.62 * zoom, y, z + (c.z - O.z) * 0.62 * zoom);
  const look = new Vector3(0, y, z - 10).lerp(c, w);
  let caption = "";
  if (q >= 0.72) caption = fk < 0.3 ? cards[k].caption : "";
  else caption = intro.find((s) => q >= s.from && q < s.to)?.text ?? "";
  return { pos, look, roll, caption, intro: ease(cl(q / 0.12)) };
}
