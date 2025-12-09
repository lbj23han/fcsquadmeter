// lib/fconline/types.ts

// ② match-detail 타입
export type MatchDetailResponse = {
  matchId: string;
  matchDate: string;
  matchInfo: Array<{
    ouid: string;
    nickname: string;
    matchDetail: { matchResult: "승" | "무" | "패" | string };
    shoot: { goalTotal: number };
  }>;
};

export type OpponentRecord = {
  opponentId: string;
  wins: number;
  draws: number;
  losses: number;
};

export type FriendStats = {
  id: string;
  ouid: string;
  nickname: string;

  wins: number;
  draws: number;
  losses: number;

  goalsFor: number;
  goalsAgainst: number;

  vs: OpponentRecord[];
};
