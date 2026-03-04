import type { RankedFriend } from "@/lib/fconline";
import { BADGE } from "@/constants/fcsquadmeter";

type Props = {
  player: RankedFriend;
};

function BadgeChip({
  emoji,
  label,
  tone,
}: {
  emoji: string;
  label: string;
  tone: "amber" | "emerald" | "red";
}) {
  const toneClass =
    tone === "amber"
      ? "bg-amber-500/10 text-amber-300 border-amber-500/40"
      : tone === "emerald"
        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
        : "bg-red-500/10 text-red-300 border-red-500/40";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 border ${toneClass}`}
    >
      {emoji} {label}
    </span>
  );
}

export function PlayerBadges({ player }: Props) {
  return (
    <>
      {player.isChampion && (
        <BadgeChip
          emoji={BADGE.champion.emoji}
          label={BADGE.champion.label}
          tone="amber"
        />
      )}
      {player.isTopScorer && (
        <BadgeChip
          emoji={BADGE.topScorer.emoji}
          label={BADGE.topScorer.label}
          tone="emerald"
        />
      )}
      {player.isMostConceded && (
        <BadgeChip
          emoji={BADGE.mostConceded.emoji}
          label={BADGE.mostConceded.label}
          tone="red"
        />
      )}
    </>
  );
}
