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
  robots: { index: true, follow: true },
  title: "Kids Tennis: tennistrening hjemme og på banen (3 til 5 år)",
  description:
    "Korte tennisøvelser dere gjør hjemme og på tennisbanen. Øvelsene henger sammen: det barnet lærer i stua, bruker det på banen. 100 øvelser, laget av tennistrener Espen Foss. Gratis i lanseringsperioden.",
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
