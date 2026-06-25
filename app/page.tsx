import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TennisTown from "@/components/TennisTown";
import { getSkills } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "https://playathome.no/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    title: "Kids Tennis: tennistrening hjemme for de minste",
    description:
      "Korte øvelser dere gjør hjemme, uten bane. 100 øvelser laget av Espen Foss. Gratis i lanseringsperioden.",
    url: "https://playathome.no/",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kids Tennis",
  applicationCategory: "EducationApplication",
  operatingSystem: "Web",
  inLanguage: "nb-NO",
  offers: { "@type": "Offer", price: "0", priceCurrency: "NOK" },
  description:
    "Tennistrening hjemme for barn 3 til 5 år. 100 korte øvelser i 10 ferdigheter, laget av Espen Foss.",
  author: { "@type": "Person", name: "Espen Foss", jobTitle: "Tennistrener" },
};

const faq = [
  {
    q: "Trenger vi tennisbane eller utstyr?",
    a: "Nei. En myk ball og litt plass i stua eller hagen er alt dere trenger. Racket er fint, men ikke nødvendig for å komme i gang.",
  },
  {
    q: "Hvor gammelt bør barnet være?",
    a: "Øvelsene er laget for barn mellom 3 og 5 år, og tilpasses nivået etter hvert som barnet mestrer mer.",
  },
  {
    q: "Hvor lang tid tar det hver dag?",
    a: "2 til 5 minutter. Litt hver dag gir bedre effekt enn lange økter en sjelden gang.",
  },
  {
    q: "Må jeg som voksen være med?",
    a: "Ja. Øvelsene gjøres sammen med en voksen, og det er en stor del av moroa for de minste.",
  },
  {
    q: "Er det virkelig gratis?",
    a: "Ja, appen er helt gratis for alle i lanseringsperioden.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "nb-NO",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function Home() {
  const skills = await getSkills();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <a className="skip" href="#top">
        Hopp til innhold
      </a>
      <SiteHeader />

      <main id="top" tabIndex={-1}>
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Tennis for de minste · 3 til 5 år</span>
              <h1>
                Tennistrening hjemme <span className="hl">som føles som lek</span>
              </h1>
              <p className="lead">
                Korte øvelser dere gjør i stua eller hagen. Ingen bane og ingen påmelding, bare
                deg, barnet og ballen.
              </p>
              <div className="hero-cta">
                <Link href="/ovelser" className="btn btn-primary">
                  Se dagens øvelse →
                </Link>
                <Link href="#slik" className="btn btn-ghost">
                  Slik funker det
                </Link>
              </div>
              <p className="hero-note">
                <span className="pill">Gratis nå</span> Helt gratis for alle i lanseringsperioden.
              </p>
            </div>

            <div>
              <div
                className="phone"
                role="img"
                aria-label="Skjermbilde av appen som viser dagens øvelse og fremgang"
              >
                <div className="screen">
                  <span className="day">Dag 12 · Ballkontroll</span>
                  <h3>Dagens øvelse</h3>
                  <div className="play-card">
                    <span className="ic" aria-hidden="true">
                      🎾
                    </span>
                    <span>
                      <b>Sprett og fang</b>
                      <small>2 min · sammen med en voksen</small>
                    </span>
                  </div>
                  <div className="progress">
                    <div className="bar">
                      <span />
                    </div>
                    <small>
                      <span>Nybegynner</span>
                      <span>Tennisstjerne ⭐</span>
                    </small>
                  </div>
                </div>
                <div className="badge-float badge-1">🔥 5 dager på rad</div>
                <div className="badge-float badge-2">🎾 +3 baller</div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <div className="trust">
          <div className="wrap">
            <div className="stat">
              <b>100</b>
              <span>korte øvelser</span>
            </div>
            <div className="stat">
              <b>10</b>
              <span>ferdigheter å mestre</span>
            </div>
            <div className="stat">
              <b>2 til 5 min</b>
              <span>per dag er nok</span>
            </div>
            <div className="stat">
              <b>36 år</b>
              <span>trenererfaring bak</span>
            </div>
          </div>
        </div>

        {/* 3 steps */}
        <section id="slik" className="wrap section">
          <div className="sec-head center">
            <span className="eyebrow">Slik funker det</span>
            <h2>Tre enkle steg, hver dag</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="num">01</span>
              <div className="em">🎯</div>
              <h3>Velg dagens øvelse</h3>
              <p>Appen foreslår én øvelse tilpasset barnets nivå.</p>
            </div>
            <div className="step">
              <span className="num">02</span>
              <div className="em">🤸</div>
              <h3>Gjør den sammen</h3>
              <p>En kort video viser leken. Dere gjør den på 2 til 5 minutter, inne eller ute.</p>
            </div>
            <div className="step">
              <span className="num">03</span>
              <div className="em">⭐</div>
              <h3>Stig i nivå</h3>
              <p>
                Når øvelsen er gjort, samler barnet tennisballer og stiger fra nybegynner til
                tennisstjerne.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="wrap section" style={{ paddingTop: 0 }}>
          <div className="sec-head center">
            <span className="eyebrow">10 ferdigheter</span>
            <h2>Alt en liten spiller trenger å bli kjent med</h2>
            <p>Hver ferdighet har egne øvelser som blir litt vanskeligere etter hvert.</p>
          </div>
          <div className="skills">
            {skills.map((s) => (
              <Link key={s.slug} className="skill" href={`/ovelser?ferdighet=${s.slug}`}>
                <span className="em">{s.emoji}</span>
                {s.name}
                <small>{s.tagline}</small>
              </Link>
            ))}
          </div>
        </section>

        {/* Tennis Town */}
        <section id="town" className="wrap section">
          <div className="sec-head center">
            <span className="eyebrow">Tennis Town</span>
            <h2>Velg tenniskompis, lås opp nye premier</h2>
            <p>
              For hver øvelse barnet fullfører samler dere tennisballer og låser opp nye venner og
              utstyr.
            </p>
          </div>
          <TennisTown />
        </section>

        {/* Method */}
        <section id="metode" className="wrap section">
          <div className="method">
            <span className="quote-mark" aria-hidden="true">
              ”
            </span>
            <h2 className="sr-only">Metoden bak Kids Tennis</h2>
            <span className="eyebrow" style={{ color: "var(--ball)" }}>
              Metoden
            </span>
            <p className="q" style={{ marginTop: 14 }}>
              En treåring trenger ikke en <span className="ball">forehand</span>. Hun trenger å ha
              det gøy og bli kjent med ballen.
            </p>
            <div className="by">
              <span className="avatar" aria-hidden="true">
                🎾
              </span>
              <span>
                <b>Espen Foss</b>
                <span>Tennistrener gjennom 36 år</span>
              </span>
            </div>
          </div>
        </section>

        {/* Coach */}
        <section id="coach" className="wrap section" style={{ paddingTop: 0 }}>
          <div className="coach">
            <div className="coach-photo">[ Bilde av Espen Foss kommer her ]</div>
            <div>
              <span className="eyebrow">Om coachen</span>
              <h2
                className="h"
                style={{ fontSize: "clamp(1.7rem,4.4vw,2.6rem)", margin: "10px 0 6px" }}
              >
                Trener for de minste og for trenerne deres
              </h2>
              <p style={{ color: "var(--muted)", fontWeight: 600, fontSize: "1.08rem" }}>
                Espen har bygget tennisglede i Norge og internasjonalt i over tre tiår.
              </p>
              <ul className="coach-list">
                <li>
                  <span className="tick">✓</span> 36 års erfaring fra Spania, De forente arabiske
                  emirater og Norges Tennisforbund
                </li>
                <li>
                  <span className="tick">✓</span> Grunnla TennisKids, rundt 10 000 barn hvert år
                </li>
                <li>
                  <span className="tick">✓</span> Har utdannet over 1 350 trenere (ITF nivå 1 og 2)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="wrap section">
          <div className="sec-head center">
            <span className="eyebrow">Vanlige spørsmål</span>
            <h2>Det foreldre lurer på</h2>
          </div>
          <div className="faq">
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="wrap section">
          <div className="cta-band">
            <h2>Begynn tennisreisen til barnet ditt</h2>
            <p>Start med de første øvelsene i dag. Gratis for alle i lanseringsperioden.</p>
            <Link href="/ovelser" className="btn btn-primary">
              Kom i gang gratis →
            </Link>
            <div className="contact">
              <a href="mailto:espenfosstennis@gmail.com">📧 espenfosstennis@gmail.com</a>
              <a href="tel:+4794883618">📞 +47 948 83 618</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
