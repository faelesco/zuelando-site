import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zuelando | Ancestralidade, ritmo e muito axé",
  description: "Projeto Zuelando: Eventos culturais, biblioteca de pontos sagrados, vivências e locação de espaço para a cultura de matriz africana. Rua Condor, 535 - Nova Cintra.",
  keywords: "Zuelando, terreiro, eventos de axé, ogãs, atabaque, pontos de umbanda, candomblé, ancestralidade, Nova Cintra",
  icons: {
    icon: "/ico.svg",
  },
  openGraph: {
    title: "Zuelando | Ancestralidade e Ritmo",
    description: "Conheça a raiz do Zuelando, nossos próximos eventos e a biblioteca de cantos sagrados.",
    url: "https://www.zuelando.com.br",
    siteName: "Zuelando",
    images: [
      {
        url: "/zuelando-site.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F5F0] text-[#1c1917]">
        {children}
      </body>
    </html>
  );
}