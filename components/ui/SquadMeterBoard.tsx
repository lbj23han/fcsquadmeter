// components/ui/SquadMeterBoard.tsx
import { FRIENDS } from "@/lib/friends";
import type { RankedFriend } from "@/lib/fconline";
import { BADGE } from "@/constants/fcsquadmeter";
import { LABELS } from "@/constants/squadmeterboard";
type Props = {
  players: RankedFriend[];
};

export function SquadMeterBoard({ players }: Props) {
  return (
    <>
      {players.map((p) => {
        const opponents = FRIENDS.filter((f) => f.ouid !== p.ouid);
        const full = p;

        return (
          <article
            key={p.ouid}
            className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm"
          >
            {/* 상단: 순위 + id + 배지 */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  {p.rank}
                  {LABELS.rankSuffix} · {p.id}
                </h2>

                <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
                  {p.isChampion && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-300 border border-amber-500/40">
                      {BADGE.champion.emoji} {BADGE.champion.label}
                    </span>
                  )}
                  {p.isTopScorer && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300 border border-emerald-500/40">
                      {BADGE.topScorer.emoji} {BADGE.topScorer.label}
                    </span>
                  )}
                  {p.isMostConceded && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-red-300 border border-red-500/40">
                      {BADGE.mostConceded.emoji} {BADGE.mostConceded.label}
                    </span>
                  )}
                </div>
              </div>

              {/* 총 전적 요약 */}
              <div className="text-right text-xs text-zinc-400">
                <div className="flex justify-end gap-1">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                    {LABELS.winsShort} {p.wins}
                  </span>
                  <span className="rounded bg-zinc-500/10 px-2 py-0.5 text-zinc-300">
                    {LABELS.drawsShort} {p.draws}
                  </span>
                  <span className="rounded bg-red-500/10 px-2 py-0.5 text-red-300">
                    {LABELS.lossesShort} {p.losses}
                  </span>
                </div>

                <div className="mt-1 text-[11px] text-zinc-500">
                  {LABELS.goalsFor} {p.goalsFor} · {LABELS.goalsAgainst}{" "}
                  {p.goalsAgainst}
                </div>
              </div>
            </div>

            {/* 상대전적 */}
            <div className="mt-4 text-sm">
              <div className="mb-1 text-zinc-300 font-medium">
                {LABELS.opponentHeader}
              </div>

              {opponents.map((opp) => {
                const vs = full.vs.find((v) => v.opponentId === opp.id);

                if (!vs) {
                  return (
                    <div
                      key={opp.id}
                      className="ml-2 text-[13px] text-zinc-500"
                    >
                      {opp.id}: {LABELS.noRecord}
                    </div>
                  );
                }

                return (
                  <div
                    key={opp.id}
                    className="ml-2 flex justify-between text-[13px]"
                  >
                    <span className="text-zinc-400">{opp.id}</span>
                    <span className="text-zinc-200">
                      {vs.wins}
                      {LABELS.win} {vs.draws}
                      {LABELS.draw} {vs.losses}
                      {LABELS.loss}
                    </span>
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
    </>
  );
}
