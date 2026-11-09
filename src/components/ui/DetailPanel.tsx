"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { cards } from "@/data/portfolio";
import { panel, usePanel } from "@/lib/panel";

/** Aceita qualquer link do YouTube (watch, youtu.be ou embed) e devolve o link de incorporação. */
function toEmbed(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

/** Painel que abre por cima da cena ao clicar em um card (descrição, tecnologias, vídeo e link). */
export default function DetailPanel() {
  const i = usePanel();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (i === null) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") panel.set(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i]);

  if (i === null) return null;
  const c = cards[i];
  const title = c.title.replace("|", " ");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-[fade_.3s_ease-out]"
      onClick={() => panel.set(null)}
    >
      <div
        role="dialog" aria-modal="true" aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#17171a] text-[#F4F1EA] shadow-2xl"
      >
        <button
          ref={closeBtn} onClick={() => panel.set(null)} aria-label="Fechar"
          className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm hover:bg-black"
        >✕</button>

        {c.cover && (
          <div className="relative aspect-[16/7] w-full">
            <Image src={c.cover} alt={`Capa do projeto ${title}`} fill sizes="672px" className="object-cover object-top" />
          </div>
        )}

        <div className="space-y-5 p-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          {c.description && <p className="leading-relaxed text-[#D9D5CB]">{c.description}</p>}

          {c.stack && (
            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.18em] text-[#A9A69E]">Tecnologias</div>
              <div className="flex flex-wrap gap-2">
                {c.stack.map((t) => (
                  <span key={t} className="rounded-full border border-[#F4F1EA]/40 px-3 py-1 text-sm">{t}</span>
                ))}
              </div>
            </div>
          )}

          {c.video && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                src={toEmbed(c.video)} title={`Vídeo: ${title}`} loading="lazy" allowFullScreen
                allow="accelerometer; encrypted-media; picture-in-picture"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          )}
          {c.note && <p className="text-sm text-[#A9A69E]">{c.note}</p>}

          {c.link && (
            <a
              href={c.link.href} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-full bg-[#FF5B2E] px-5 py-2.5 font-bold text-[#0b0b0c] hover:brightness-110"
            >{c.link.label} ↗</a>
          )}
        </div>
      </div>
    </div>
  );
}
