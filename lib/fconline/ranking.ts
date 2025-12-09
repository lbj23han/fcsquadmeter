// lib/fconline/ranking.ts
import type { FriendStats } from "./types";

export type RankedFriend = FriendStats & {
  rank: number;
  isChampion: boolean;
  isTopScorer: boolean;
  isMostConceded: boolean;
};

// 정렬 + 배지 기준값 계산 + 플래그 세팅까지 한 번에
export function buildRanking(stats: FriendStats[]): RankedFriend[] {
  if (stats.length === 0) return [];

  const maxGoalsFor = Math.max(...stats.map((s) => s.goalsFor));
  const maxGoalsAgainst = Math.max(...stats.map((s) => s.goalsAgainst));
  const maxWins = Math.max(...stats.map((s) => s.wins));

  // 정렬: 승 많은 순 → 패 적은 순 → 무 많은 순
  const sorted = [...stats].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (a.losses !== b.losses) return a.losses - b.losses;
    return b.draws - a.draws;
  });

  return sorted.map((p, idx) => ({
    ...p,
    rank: idx + 1,
    isChampion: maxWins > 0 && p.wins === maxWins,
    isTopScorer: maxGoalsFor > 0 && p.goalsFor === maxGoalsFor,
    isMostConceded: maxGoalsAgainst > 0 && p.goalsAgainst === maxGoalsAgainst,
  }));
}
