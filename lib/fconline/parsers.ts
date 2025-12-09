// lib/fconline/parsers.ts
import { getMatchDetail } from "./apiClient";
import type { MatchDetailResponse } from "./types";

export type ParsedMatch = {
  matchId: string;
  date: string;
  players: Array<{
    ouid: string;
    nickname: string;
    goals: number;
    result: "승" | "무" | "패" | string;
  }>;
};

// ④ 필요한 정보만 추출
export async function parseMatchDetail(matchId: string): Promise<ParsedMatch> {
  const detail: MatchDetailResponse = await getMatchDetail(matchId);

  return {
    matchId,
    date: detail.matchDate,
    players: detail.matchInfo.map((p) => ({
      ouid: p.ouid,
      nickname: p.nickname,
      goals: p.shoot.goalTotal,
      result: p.matchDetail.matchResult,
    })),
  };
}
