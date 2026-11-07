import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const font = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "João Renato — Full stack developer",
  description: "Portfólio de João Renato: projetos, tecnologias, formação e contato.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
