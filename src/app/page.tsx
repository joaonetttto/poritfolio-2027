import ScrollProvider from "@/components/ScrollProvider";
import ExperienceLoader from "@/components/canvas/ExperienceLoader";
import Hud from "@/components/ui/Hud";
import { cards, profile } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <ScrollProvider />
      <ExperienceLoader />
      <Hud />
      {/* Esta altura é o "trilho" do scroll: quanto maior, mais lenta a viagem. */}
      <main style={{ height: "1000vh" }}>
        {/* Conteúdo em texto normal: bom para Google e leitores de tela. */}
        <div className="sr-only">
          <h1>{profile.name} — {profile.role}</h1>
          {cards.map((c, i) => (
            <section key={i}>
              <h2>{c.title.replace(/\|/g, " ")}</h2>
              {c.lines?.map((l, j) => <p key={j}>{l}</p>)}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
