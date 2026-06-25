import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" href="/">
          <span className="dot" aria-hidden="true" /> Kids&nbsp;Tennis
        </Link>
        <nav className="nav-links" aria-label="Hovedmeny">
          <Link href="/#slik">Slik funker det</Link>
          <Link href="/#town">Tennis&nbsp;Town</Link>
          <Link href="/#metode">Metoden</Link>
          <Link href="/ovelser">Øvelser</Link>
          <Link href="/#coach">Om Espen</Link>
          <Link href="/logg-inn">Logg inn</Link>
        </nav>
        <Link href="/ovelser" className="btn btn-ball nav-cta">
          Start gratis
        </Link>
      </div>
    </header>
  );
}
