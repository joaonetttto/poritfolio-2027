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
  cover?: string; // capa do projeto (imagem em /public)
  description?: string; // texto completo (aparece no painel ao clicar)
  stack?: string[]; // tecnologias completas do projeto
  link?: { label: string; href: string }; // botão do painel (site ou GitHub)
  video?: string; // link de incorporação do vídeo (ex.: YouTube "não listado")
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
  {
    kind: "project", caption: "TechRumo", title: "TechRumo",
    lines: ["Roadmaps de estudo personalizados"], chips: ["React", "TypeScript", "Supabase"],
    cover: "/logos/techrumo.png",
    description:
      "TechRumo é uma plataforma que gera roadmaps de estudo personalizados para quem quer entrar em tecnologia. A pessoa responde a um quiz rápido e recebe uma trilha com cursos selecionados, com acompanhamento de progresso e pagamento via Pix.",
    stack: ["React", "TypeScript", "Supabase", "Asaas", "Cloudflare Turnstile", "Lovable"],
    link: { label: "Visitar o site", href: "https://techrumo.com/" },
  },
  {
    kind: "project", caption: "ClinicaPro", title: "ClinicaPro",
    lines: ["Gestão de clínicas médicas · TCC"], chips: ["React", "TypeScript", "Supabase"],
    cover: "/logos/clicinicapro.png",
    description:
      "ClinicaPro é um sistema web de gestão de clínicas médicas que reúne pacientes, agenda, prontuário eletrônico, serviços, financeiro e relatórios em um só lugar. Cada clínica tem seus dados isolados, e o acesso é por perfil (administrador, médico e recepcionista). Entre os recursos de segurança estão o log de auditoria dos prontuários, o logout por inatividade e o CPF mascarado. Foi o meu TCC do curso técnico em Desenvolvimento de Sistemas.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase (PostgreSQL, autenticação e RLS)", "Lovable"],
    // video: "cole aqui o link de incorporação do vídeo (ex.: https://www.youtube.com/embed/ID)",
  },
  {
    kind: "project", caption: "Clínica psiquiátrica", title: "Clínica psiquiátrica",
    lines: ["Landing page · sistema em Node"], chips: ["Node.js", "Landing page"],
    cover: "/logos/clinicapsquiatrica.png",
    description: "Landing page simples de uma clínica psiquiátrica, com sistema desenvolvido em Node.",
    stack: ["Node.js"],
    link: { label: "Ver no GitHub", href: "https://github.com/joaonetttto/clinica-medica" },
  },
  { kind: "social", caption: "conteúdo", title: "Conteúdo", lines: ["humor e informativo", "minhas redes sociais"] },
  { kind: "contact", caption: "contato", title: "Contato", lines: ["vamos conversar?", "e-mail: seu e-mail aqui", "redes: seus @ aqui"] },
];
