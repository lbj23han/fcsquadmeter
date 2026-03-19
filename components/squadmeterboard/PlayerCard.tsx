import type { PlayerVM } from "./model";
import { LABELS } from "@/constants/squadmeterboard";
import { PlayerBadges } from "./PlayerBadges";
import { OpponentRows } from "./OpponentRows";

type Props = {
  vm: PlayerVM;
};

export function PlayerCard({ vm }: Props) {
  const p = vm.player;

  return (
    <article className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">
            {p.rank}
            {LABELS.rankSuffix} · {p.id}
          </h2>

          <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
            <PlayerBadges player={p} />
          </div>
        </div>

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

      <div className="mt-4 text-sm">
        <div className="mb-1 text-zinc-300 font-medium">
          {LABELS.opponentHeader}
        </div>

        <OpponentRows
          opponents={vm.opponents}
          vsByOpponentId={vm.vsByOpponentId}
          playerOuid={p.ouid}
        />
      </div>
    </article>
  );
}
