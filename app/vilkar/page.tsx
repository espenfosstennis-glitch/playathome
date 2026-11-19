import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase/server";
import {
  CURRENT_TERMS_VERSION,
  hasAcceptedCurrentTerms,
  safeAppPath,
} from "@/lib/terms";
import { acceptTerms } from "./actions";

export const metadata: Metadata = {
  title: "Vilkår for bruk | Kids Tennis",
  robots: { index: false, follow: false },
};

export default async function VilkarPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const returnTo = safeAppPath(next);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && (await hasAcceptedCurrentTerms(supabase, user.id))) {
    redirect(returnTo);
  }

  return (
    <>
      <SiteHeader />
      <main className="wrap legal-wrap">
        <article className="legal-card">
          <span className="eyebrow">Kids Tennis · Play at Home</span>
          <h1>Vilkår for bruk</h1>
          <p className="legal-draft">
            Utkast til juridisk gjennomgang. Vilkårene må vurderes før tjenesten tilbys offentlig.
          </p>
          <p className="legal-updated">Sist oppdatert 19. november 2026</p>

          <h2>1. Hvem avtalen gjelder</h2>
          <p>
            Vilkårene gjelder for Kids Tennis, også kalt Play at Home. Avtalen er mellom deg som
            voksen kontoinnehaver og ESPEN FOSS TENNIS, enkeltpersonforetak med organisasjonsnummer
            918 614 117. Forretningsadressen er Kirkeveien 50, 0368 Oslo. Du kan kontakte oss på{" "}
            <a href="mailto:espenfosstennis@gmail.com">espenfosstennis@gmail.com</a> eller{" "}
            <a href="tel:+4794883618">+47 948 83 618</a>.
          </p>
          <p>
            Tjenesten er laget for foreldre og andre voksne omsorgspersoner. Du må være minst 18 år
            og ha rett til å opprette en konto og legge inn opplysninger om barnet du følger opp.
            Barn skal ikke opprette konto eller bruke tjenesten uten en voksen.
          </p>

          <h2>2. Konto og bruk</h2>
          <p>
            Du er ansvarlig for å holde innloggingsopplysningene dine hemmelige og for aktiviteten
            på kontoen. Opplysningene du legger inn, skal være riktige. Ikke bruk tjenesten til
            ulovlige formål, forsøk å få tilgang til andres kontoer eller forstyrre tjenesten.
          </p>
          <p>
            Når du krysser av for at du godtar vilkårene og velger «Godta og fortsett», bekrefter
            du at du har lest dem og inngår avtale med ESPEN FOSS TENNIS. Vi lagrer hvilken versjon
            du godtok, sammen med tidspunktet. Du må godta gjeldende versjon for å bruke
            kontofunksjonene.
          </p>

          <h2>3. Innhold og sikkerhet</h2>
          <p>
            Øvelsene er generell inspirasjon til lek og bevegelse for barn fra 3 til 5 år. De er
            ikke medisinske råd eller individuell vurdering av barnets helse, utvikling eller
            ferdigheter. Resultater kan variere.
          </p>
          <p>
            En voksen må være til stede, velge øvelser som passer barnet og tilpasse dem etter
            barnets alder og evner. Sjekk at området er ryddig og trygt, og bruk egnet utstyr. Stopp
            dersom barnet opplever smerte, ubehag eller blir utrygt. En øvelse skal aldri brukes
            som erstatning for råd fra helsepersonell.
          </p>

          <h2>4. Pris, betaling og angrerett</h2>
          <p>
            Konto og innhold er gratis i den nåværende lanseringsperioden. Det er ikke mulig å
            kjøpe et abonnement gjennom tjenesten nå. Før eventuelle betalte funksjoner lanseres,
            skal pris, betalingsintervall, automatisk fornyelse, oppsigelse, skatter og relevant
            informasjon om angrerett vises før bestilling.
          </p>
          <p>
            Du beholder alle ufravikelige rettigheter etter loven, også rettigheter knyttet til
            angrerett, mangler og tilbakebetaling. Disse vilkårene innfører ikke et generelt forbud
            mot refusjon. Vilkår for et eventuelt abonnement blir lagt frem særskilt før du kjøper.
          </p>

          <h2>5. Innhold, tilgjengelighet og endringer</h2>
          <p>
            Innholdet er beskyttet av opphavsrett. Du kan bruke det privat sammen med barnet du
            følger opp. Du kan ikke kopiere, dele videre eller selge innholdet uten skriftlig
            tillatelse, med mindre loven gir deg rett til det.
          </p>
          <p>
            Vi arbeider for at tjenesten skal fungere, men kan ikke love at den alltid er
            tilgjengelig uten avbrudd eller feil. Vi kan endre eller avslutte funksjoner. Slike
            endringer begrenser ikke rettigheter du har etter ufravikelig lov.
          </p>

          <h2>6. Ansvar og lovbestemte rettigheter</h2>
          <p>
            Ingen tekst kan utelukke ansvar eller rettigheter som ikke kan fravikes etter loven.
            Eventuelle ansvarsbegrensninger gjelder bare så langt de er tillatt. Tjenesten og
            øvelsene erstatter ikke tilsyn av en voksen eller faglige råd tilpasset barnet.
          </p>

          <h2>7. Personopplysninger og kontakt</h2>
          <p>
            Når du bruker kontoen, behandler vi opplysninger som e-postadresse, opplysninger du
            legger inn om barnet, og registrert fremgang. Ta kontakt på
            espenfosstennis@gmail.com hvis du har spørsmål om opplysningene dine. Denne
            vilkårsteksten erstatter ikke en personvernerklæring.
          </p>

          <h2>8. Lovvalg og oppdateringer</h2>
          <p>
            Norsk lov gjelder så langt dette ikke begrenser ufravikelige rettigheter du har som
            forbruker i landet der du bor. Vi kan oppdatere vilkårene når tjenesten endres.
            Dersom en oppdatert versjon krever nytt samtykke, ber vi deg godta den før du bruker
            kontofunksjonene videre.
          </p>

          {user ? (
            <form action={acceptTerms} className="terms-accept">
              <input type="hidden" name="next" value={returnTo} />
              <label className="terms-check">
                <input type="checkbox" name="accepted" required />
                <span>Jeg har lest og godtar vilkårene for bruk.</span>
              </label>
              {error === "required" && (
                <p className="form-error" role="alert">
                  Du må bekrefte at du godtar vilkårene.
                </p>
              )}
              <button type="submit" className="btn btn-primary">
                Godta og fortsett
              </button>
            </form>
          ) : (
            <div className="terms-login">
              <p>Logg inn eller opprett en foreldrekonto for å godta vilkårene og bruke appen.</p>
              <Link className="btn btn-primary" href="/logg-inn">
                Logg inn
              </Link>
              <Link className="btn btn-ghost" href="/lag-konto">
                Lag konto
              </Link>
            </div>
          )}
          <p className="legal-version">Vilkårsversjon {CURRENT_TERMS_VERSION}</p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
