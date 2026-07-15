import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Lag konto | Kids Tennis",
  robots: { index: false, follow: false },
};

export default function LagKontoPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap auth-wrap">
        <AuthForm initialMode="ny" />
      </main>
      <SiteFooter />
    </>
  );
}
