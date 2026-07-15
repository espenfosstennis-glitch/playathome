"use client";

import KidSVG from "./KidSVG";

// Enkel wrapper: håndterer bump-animasjon og glød — selve figuren + utstyret
// tegnes nå fullt inne i KidSVG, ingen emoji-overlay lenger.
export default function CharacterAvatar({
  buddyId, gearId, bump,
}: {
  buddyId: string; gearId: string; bump: boolean;
}) {
  return (
    <div className={`avatar-stage${bump ? " bump" : ""}`} aria-hidden="true">
      <div className="avatar-glow" />
      <div className="avatar-svg-wrap">
        <KidSVG id={buddyId} gearId={gearId} size={100} />
      </div>
      <div className="avatar-shadow" />
    </div>
  );
}
