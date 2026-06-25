import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <span className="foot-brand">
              <span className="brand">
                <span className="dot" aria-hidden="true" />
              </span>{" "}
              Kids Tennis
            </span>
            <p style={{ opacity: 0.85, marginTop: 12, maxWidth: "34ch", fontWeight: 600 }}>
              Tennistrening hjemme for barn 3 til 5 år. Laget av Espen Foss.
            </p>
          </div>
          <nav aria-label="Sidekart">
            <strong style={{ fontFamily: "var(--font-head)" }}>Innhold</strong>
            <Link href="/#slik">Slik funker det</Link>
            <Link href="/#town">Tennis Town</Link>
            <Link href="/ovelser">Alle øvelsene</Link>
            <Link href="/#coach">Om Espen</Link>
            <Link href="/#faq">Vanlige spørsmål</Link>
          </nav>
          <nav aria-label="Kontakt">
            <strong style={{ fontFamily: "var(--font-head)" }}>Kontakt</strong>
            <a href="mailto:espenfosstennis@gmail.com">espenfosstennis@gmail.com</a>
            <a href="tel:+4794883618">+47 948 83 618</a>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© {year} Kids Tennis · Play at Home</span>
          <span>Gratis i lanseringsperioden</span>
        </div>
      </div>
    </footer>
  );
}
