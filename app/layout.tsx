import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AS Braz | Rede de Influenciadores",
  description: "Campanha de indicação para venda de imóvel com links rastreáveis e atendimento pelo WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
