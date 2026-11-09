import { useSyncExternalStore } from "react";

// Qual card está aberto no painel de detalhes (null = fechado). Fica fora do React para a cena 3D poder abrir.
let current: number | null = null;
const subs = new Set<() => void>();

export const panel = {
  get: () => current,
  set(i: number | null) { current = i; subs.forEach((f) => f()); },
  subscribe(f: () => void) { subs.add(f); return () => { subs.delete(f); }; },
};

export const usePanel = () => useSyncExternalStore(panel.subscribe, panel.get, () => null);
