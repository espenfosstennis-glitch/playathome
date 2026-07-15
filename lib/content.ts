// Innhold for Fase 1 (hardkodet). Flyttes til Sanity CMS i Fase 2,
// så Klara kan redigere ferdigheter, øvelser og video uten kode.

export type Skill = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  parent?: string; // slug til foreldrekategori
};

export type Exercise = {
  slug: string;
  skill: string; // refererer til Skill.slug
  emoji: string;
  title: string;
  description: string;
  minutes: string;
  level: string;
  videoUrl?: string; // Vimeo/YouTube-lenke eller direkte videofil (fra Sanity)
  done?: boolean;
};

export const SKILLS: Skill[] = [
  { slug: "hjemmetrening", name: "Lek hjemme", emoji: "🏠", tagline: "Øv hjemme i stua eller hagen" },
  { slug: "pa-tennisbanen", name: "Lek på banen", emoji: "🎾", tagline: "Øvelser på tennisbanen" },
  { slug: "mottak-trillende-ifra", name: "Mottak trillende ifra", emoji: "🎳", tagline: "", parent: "hjemmetrening" },
  { slug: "mottak-trillende-imot", name: "Mottak trillende imot", emoji: "🎯", tagline: "", parent: "hjemmetrening" },
  { slug: "mottak-sprettende-opp-ned", name: "Mottak sprettende rett opp og ned", emoji: "⬆️", tagline: "", parent: "hjemmetrening" },
  { slug: "mottak-sprettende-ifra", name: "Mottak sprettende ifra", emoji: "🏃", tagline: "", parent: "hjemmetrening" },
  { slug: "mottak-sprettende-imot", name: "Mottak sprettende imot", emoji: "🤲", tagline: "", parent: "hjemmetrening" },
  { slug: "trille", name: "Trille", emoji: "🎱", tagline: "", parent: "hjemmetrening" },
  { slug: "kaste", name: "Kaste", emoji: "🤾", tagline: "", parent: "hjemmetrening" },
  { slug: "sprette", name: "Sprette", emoji: "🏀", tagline: "", parent: "hjemmetrening" },
  { slug: "romorientering", name: "Romorientering", emoji: "🗺️", tagline: "", parent: "hjemmetrening" },
  { slug: "ballong", name: "Ballong", emoji: "🎈", tagline: "", parent: "hjemmetrening" },
];

export const EXERCISES: Exercise[] = [
  { slug: "hoppe", skill: "hjemmetrening", emoji: "🏠", title: "Hoppe", description: "Hopp frem og tilbake over en strek på gulvet. Tell hvor mange hopp dere klarer på rad.", minutes: "2 min", level: "Nivå 1" },
  { slug: "mottak-sprettende-imot", skill: "hjemmetrening", emoji: "🏠", title: "Mottak sprettende imot", description: "La ballen sprette mot deg og ta imot den med begge hender.", minutes: "2 min", level: "Nivå 1" },
  { slug: "mottak-sprettende-ifra", skill: "hjemmetrening", emoji: "🏠", title: "Mottak sprettende ifra", description: "Kast ballen slik at den spretter bort fra deg, og løp etter for å ta imot.", minutes: "2 min", level: "Nivå 2" },
  { slug: "trille", skill: "hjemmetrening", emoji: "🏠", title: "Trille", description: "Trill ballen frem og tilbake mellom dere på gulvet. Stopp den med flat hånd.", minutes: "2 min", level: "Nivå 1" },
  { slug: "romorientering", skill: "hjemmetrening", emoji: "🏠", title: "Romorientering", description: "Løp til ulike steder i rommet når en voksen roper et tall eller en farge.", minutes: "3 min", level: "Nivå 1" },
  { slug: "kaste-hjem", skill: "hjemmetrening", emoji: "🏠", title: "Kaste", description: "Kast ballen til hverandre. Ta et skritt bakover for hver gang det går bra.", minutes: "2 min", level: "Nivå 1" },
  { slug: "sprette-ball", skill: "hjemmetrening", emoji: "🏠", title: "Sprette ball", description: "Sprett ballen i gulvet og fang den. Tell hvor mange ganger på rad.", minutes: "2 min", level: "Nivå 1" },
  { slug: "ballong-hjem", skill: "hjemmetrening", emoji: "🏠", title: "Ballong", description: "Hold en ballong i luften uten at den treffer gulvet. Bruk hendene eller racketen.", minutes: "3 min", level: "Nivå 1" },
  { slug: "balanse-hjem", skill: "hjemmetrening", emoji: "🏠", title: "Balanse", description: "Stå på ett bein og hold ballen helt i ro. Tell hvor lenge dere klarer det.", minutes: "2 min", level: "Nivå 2" },
  { slug: "mottak-rett-opp-og-ned", skill: "hjemmetrening", emoji: "🏠", title: "Mottak rett opp og ned", description: "Kast ballen rett opp og ta imot den når den faller ned. Prøv uten å flytte beina.", minutes: "2 min", level: "Nivå 1" },
  { slug: "mottak-trillende-ifra", skill: "hjemmetrening", emoji: "🏠", title: "Mottak trillende ifra", description: "Trill ballen bort fra deg og løp etter for å stoppe den.", minutes: "2 min", level: "Nivå 2" },
  { slug: "mottak-trillende-imot", skill: "hjemmetrening", emoji: "🏠", title: "Mottak trillende imot", description: "En voksen triller ballen mot deg. Stopp den med føttene eller hendene.", minutes: "2 min", level: "Nivå 1" },
  { slug: "ta-imot-rullende-ifra", skill: "pa-tennisbanen", emoji: "🎾", title: "Ta imot rullende ifra", description: "Trill ballen bort fra deg langs bakken og løp etter.", minutes: "2 min", level: "Nivå 1" },
  { slug: "ta-imot-rullende-imot", skill: "pa-tennisbanen", emoji: "🎾", title: "Ta imot rullende imot", description: "En annen ruller ballen mot deg. Ta imot med racketen eller hendene.", minutes: "2 min", level: "Nivå 1" },
  { slug: "ta-imot-med-sprett", skill: "pa-tennisbanen", emoji: "🎾", title: "Ta imot med sprett", description: "La ballen sprette én gang på banen og slå den tilbake.", minutes: "3 min", level: "Nivå 2" },
  { slug: "sende-langs-bakken", skill: "pa-tennisbanen", emoji: "🎾", title: "Sende langs bakken", description: "Slå ballen langs bakken til en annen. Prøv å treffe racketen midt på.", minutes: "3 min", level: "Nivå 2" },
  { slug: "sende-rett-opp-og-ned", skill: "pa-tennisbanen", emoji: "🎾", title: "Sende rett opp og ned", description: "Drible ballen rett ned i bakken med racketen. Tell hvor mange ganger på rad.", minutes: "2 min", level: "Nivå 1" },
  { slug: "trille-ball-bane", skill: "pa-tennisbanen", emoji: "🎾", title: "Trille ball", description: "Trill ballen langs banelinjen uten at den triller ut.", minutes: "2 min", level: "Nivå 1" },
  { slug: "stigen", skill: "pa-tennisbanen", emoji: "🎾", title: "Stigen", description: "Hopp inn og ut av rutene i en stige tegnet på bakken. Øk farten litt etter litt.", minutes: "3 min", level: "Nivå 2" },
  { slug: "ballong-bane", skill: "pa-tennisbanen", emoji: "🎾", title: "Ballong", description: "Hold en ballong i luften med racketen. Tell hvor mange slag dere klarer.", minutes: "3 min", level: "Nivå 1" },
  { slug: "tolv-poengern", skill: "pa-tennisbanen", emoji: "🎾", title: "12 Poenger'n", description: "Spill til 12 poeng. Den som sender ballen over nettet og treffer innenfor linjen får poeng.", minutes: "5 min", level: "Nivå 3" },
  { slug: "mottak-sprettende-ifra-bane", skill: "pa-tennisbanen", emoji: "🎾", title: "Mottak sprettende ifra", description: "Slå ballen slik at den spretter bort, og la makkeren løpe etter.", minutes: "3 min", level: "Nivå 2" },
  { slug: "mottak-sprettende-imot-bane", skill: "pa-tennisbanen", emoji: "🎾", title: "Mottak sprettende imot", description: "Ta imot en ball som spretter mot deg og slå den tilbake.", minutes: "3 min", level: "Nivå 2" },
  { slug: "kaste-bane", skill: "pa-tennisbanen", emoji: "🎾", title: "Kaste", description: "Kast ballen over nettet til hverandre. Ta et skritt bakover for hver gang det går bra.", minutes: "3 min", level: "Nivå 1" },
];
