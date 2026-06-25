// Verts-agnostisk videospiller. Bygger kun inn gjenkjente verter (Vimeo, YouTube)
// eller spiller av direkte videofiler; ukjente lenker vises som en trygg lenke i stedet
// for å bygge inn vilkårlige URL-er. Innholdet kommer fra CMS, redigert av oss.

type Embed =
  | { kind: "iframe"; src: string }
  | { kind: "file"; src: string }
  | { kind: "link"; src: string }
  | null;

function resolve(url: string | undefined): Embed {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "");

  // Vimeo: vimeo.com/<id>[/<hash>] eller player.vimeo.com/video/<id>
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const parts = u.pathname.split("/").filter(Boolean);
    const id = parts.find((p) => /^\d+$/.test(p));
    if (id) {
      const hash = parts.find((p) => /^[a-z0-9]+$/i.test(p) && p !== id);
      const q = hash ? `?h=${hash}` : "";
      return { kind: "iframe", src: `https://player.vimeo.com/video/${id}${q}` };
    }
  }

  // YouTube: youtube.com/watch?v=<id>, youtu.be/<id>, youtube.com/embed/<id>
  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = u.searchParams.get("v") || u.pathname.split("/embed/")[1]?.split("/")[0];
    if (id) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${id}?rel=0` };
  }
  if (host === "youtu.be") {
    const id = u.pathname.split("/").filter(Boolean)[0];
    if (id) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${id}?rel=0` };
  }

  // Kun https for fil/lenke (lukker javascript:, data:, blob: ved komponentgrensen,
  // uavhengig av hva CMS-feltet skulle slippe gjennom)
  if (u.protocol !== "https:") return null;

  // Direkte videofil
  if (/\.(mp4|webm|ogg)$/i.test(u.pathname)) return { kind: "file", src: u.href };

  return { kind: "link", src: u.href };
}

export default function VideoPlayer({ url, title }: { url?: string; title: string }) {
  const embed = resolve(url);
  if (!embed) return null;

  if (embed.kind === "iframe") {
    return (
      <iframe
        className="video-frame"
        src={embed.src}
        title={`Video: ${title}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
      />
    );
  }

  if (embed.kind === "file") {
    return (
      <video className="video-frame" src={embed.src} controls playsInline preload="metadata" />
    );
  }

  // Ukjent vert: ikke bygg inn, vis en trygg lenke i stedet.
  return (
    <a className="video-link" href={embed.src} target="_blank" rel="noopener noreferrer">
      ▶ Åpne video
    </a>
  );
}
