import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://playathome.no"),
  // Privat forhåndsvisning: holdes ute av søkemotorer til ekte lansering.
  robots: { index: false, follow: false },
  title: "Kids Tennis: tennistrening hjemme for de minste (3 til 5 år)",
  description:
    "Korte tennisøvelser dere gjør hjemme i stua eller hagen, uten bane. 100 øvelser, 10 ferdigheter, laget av tennistrener Espen Foss. Gratis i lanseringsperioden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
