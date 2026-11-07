// Tudo que aparece no site fica aqui. Para atualizar o portfólio, edite só este arquivo.
export const profile = {
  name: "João Renato",
  shortName: "JOÃO",
  role: "Full stack developer",
  city: "São José dos Campos",
};

// Legendas da abertura e do túnel (intervalos de scroll de 0 a 1)
export const intro = [
  { from: 0, to: 0.1, text: "olá, eu sou o João Renato" },
  { from: 0.1, to: 0.18, text: "full stack developer" },
  { from: 0.18, to: 0.27, text: "Next.js" },
  { from: 0.27, to: 0.36, text: "React" },
  { from: 0.36, to: 0.45, text: "Tailwind" },
  { from: 0.45, to: 0.54, text: "Python" },
  { from: 0.54, to: 0.62, text: "SQL" },
  { from: 0.62, to: 0.72, text: "me conheça melhor" },
];

export type CardKind = "about" | "edu" | "tech" | "title" | "project" | "social" | "contact";
export type Card = {
  kind: CardKind;
  caption: string;
  title: string; // use "|" para quebrar linha
  lines?: string[];
  chips?: string[];
  image?: string; // caminho em /public (ex.: "/logos/etec.png")
};

export const techIcons = ["Py", "SQL", "Next", "React", "TW"];

export const cards: Card[] = [
  { kind: "about", caption: "sobre mim", title: "João Renato",
    lines: ["Full stack developer", "São José dos Campos", "Técnico em desenv. de sistemas", "Quero cursar eng. de software"] },
  { kind: "edu", caption: "formação", title: "Técnico em|Desenv. de Sistemas",
    lines: ["Curso técnico · ETEC", "Formatura prevista: dez/2026"], image: "/logos/etec.png" },
  { kind: "tech", caption: "o que eu uso", title: "O que eu uso",
    lines: ["Python · SQL · Next.js · React · Tailwind"] },
  { kind: "title", caption: "meus 3 principais projetos", title: "Meus 3|principais|projetos" },
  { kind: "project", caption: "projeto 01", title: "Projeto 01", lines: ["Descrição curta do sistema."], chips: ["Next.js", "Python", "SQL"] },
  { kind: "project", caption: "projeto 02", title: "Projeto 02", lines: ["Descrição curta do sistema."], chips: ["Next.js", "Python", "SQL"] },
  { kind: "project", caption: "projeto 03", title: "Projeto 03", lines: ["Descrição curta do sistema."], chips: ["Next.js", "Python", "SQL"] },
  { kind: "social", caption: "conteúdo", title: "Conteúdo", lines: ["humor e informativo", "minhas redes sociais"] },
  { kind: "contact", caption: "contato", title: "Contato", lines: ["vamos conversar?", "e-mail: seu e-mail aqui", "redes: seus @ aqui"] },
];
