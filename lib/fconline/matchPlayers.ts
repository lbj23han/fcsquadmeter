import { getMatchDetail } from "./apiClient";
import { getPlayerName } from "./metadata";
import type { PlayerStatSummary } from "./types";

type Acc = {
  totalRating: number;
  totalGoals: number;
  totalAssists: number;
  appearances: number;
};

export async function getTopPlayersByRating(
  matchIds: string[],
  ouid: string,
  topN = 3,
): Promise<PlayerStatSummary[]> {
  const acc = new Map<number, Acc>();

  for (const matchId of matchIds) {
    const detail = await getMatchDetail(matchId);
    const info = detail.matchInfo.find((m) => m.ouid === ouid);
    if (!info) continue;

    for (const p of info.player) {
      const existing = acc.get(p.spId) ?? {
        totalRating: 0,
        totalGoals: 0,
        totalAssists: 0,
        appearances: 0,
      };

      acc.set(p.spId, {
        totalRating: existing.totalRating + p.status.spRating,
        totalGoals: existing.totalGoals + p.status.goal,
        totalAssists: existing.totalAssists + p.status.assist,
        appearances: existing.appearances + 1,
      });
    }
  }

  const sorted = Array.from(acc.entries())
    .map(([spId, data]) => ({
      spId,
      avgRating: data.totalRating / data.appearances,
      totalGoals: data.totalGoals,
      totalAssists: data.totalAssists,
      appearances: data.appearances,
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, topN);

  return Promise.all(
    sorted.map(async (p) => ({
      ...p,
      name: await getPlayerName(p.spId),
    })),
  );
}
