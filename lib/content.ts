// Innhold for Fase 1 (hardkodet). Flyttes til Sanity CMS i Fase 2,
// så Klara kan redigere ferdigheter, øvelser og video uten kode.

export type Skill = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
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
  { slug: "ballkontroll", name: "Ballkontroll", emoji: "🎾", tagline: "Bli venn med ballen" },
  { slug: "folg-ballen", name: "Følg ballen", emoji: "👀", tagline: "Øye og fokus" },
  { slug: "fotarbeid", name: "Fotarbeid", emoji: "🦶", tagline: "Smidige bein" },
  { slug: "balanse", name: "Balanse", emoji: "⚖️", tagline: "Stå støtt" },
  { slug: "bevegelse", name: "Bevegelse", emoji: "🏃", tagline: "Løpe og stoppe" },
  { slug: "grep", name: "Grep", emoji: "🤲", tagline: "Holde racketen" },
  { slug: "sikte", name: "Sikte", emoji: "🎯", tagline: "Treffe et mål" },
  { slug: "timing", name: "Timing", emoji: "⏱️", tagline: "Riktig øyeblikk" },
  { slug: "samspill", name: "Samspill", emoji: "🤝", tagline: "Leke sammen" },
  { slug: "utholdenhet", name: "Utholdenhet", emoji: "💪", tagline: "Litt hver dag" },
];

export const EXERCISES: Exercise[] = [
  { slug: "sprett-og-fang", skill: "ballkontroll", emoji: "🎾", title: "Sprett og fang", description: "La ballen sprette én gang, og fang den med begge hender. Tell hvor mange dere klarer på rad.", minutes: "2 min", level: "Nivå 1", done: true },
  { slug: "triller-pa-rekke", skill: "ballkontroll", emoji: "🎾", title: "Triller på rekke", description: "Trill ballen frem og tilbake mellom dere på gulvet, og stopp den med flat hånd.", minutes: "2 min", level: "Nivå 1" },
  { slug: "folg-ballongen", skill: "folg-ballen", emoji: "👀", title: "Følg ballongen", description: "Hold blikket på en ballong som svever sakte gjennom rommet, uten å miste den av syne.", minutes: "3 min", level: "Nivå 1" },
  { slug: "sidesteghopp", skill: "fotarbeid", emoji: "🦶", title: "Sidesteghopp", description: "Hopp fra side til side over en strek på gulvet. Begynn rolig, og øk farten litt etter litt.", minutes: "2 min", level: "Nivå 2", done: true },
  { slug: "flamingo-med-ball", skill: "balanse", emoji: "⚖️", title: "Flamingo med ball", description: "Stå på ett bein og hold ballen helt i ro. Tell hvor lenge dere klarer det.", minutes: "2 min", level: "Nivå 2" },
  { slug: "linegang", skill: "balanse", emoji: "⚖️", title: "Linegang", description: "Gå langs en strek på gulvet med ballen i hånda, sakte og rolig.", minutes: "2 min", level: "Nivå 1" },
  { slug: "stopp-og-ga", skill: "bevegelse", emoji: "🏃", title: "Stopp og gå", description: "Løp på plass, og frys helt når en voksen roper stopp. Bytt på å være den som roper.", minutes: "3 min", level: "Nivå 1" },
  { slug: "pannekakegrepet", skill: "grep", emoji: "🤲", title: "Pannekakegrepet", description: "Hold racketen flatt som en panne og balanser ballen oppå mens dere går et par skritt.", minutes: "2 min", level: "Nivå 2" },
  { slug: "treff-botta", skill: "sikte", emoji: "🎯", title: "Treff bøtta", description: "Rull eller kast ballen ned i en bøtte. Flytt bøtta lenger unna når det blir lett.", minutes: "3 min", level: "Nivå 1" },
  { slug: "klapp-og-fang", skill: "timing", emoji: "⏱️", title: "Klapp og fang", description: "Klapp én gang i hendene før dere fanger ballen. Klarer dere to klapp?", minutes: "2 min", level: "Nivå 2" },
  { slug: "send-og-ta-imot", skill: "samspill", emoji: "🤝", title: "Send og ta imot", description: "Send ballen til hverandre uten å miste den. Ta et skritt bakover for hver gang det går bra.", minutes: "3 min", level: "Nivå 1" },
  { slug: "ti-pa-rad", skill: "utholdenhet", emoji: "💪", title: "Ti på rad", description: "Hold ballen i gang ti ganger uten stopp. Tell høyt sammen for hver gang.", minutes: "3 min", level: "Nivå 2" },
];
