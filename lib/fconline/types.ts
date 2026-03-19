export type OuidResponse = { ouid: string };

export type Player = {
  id: string;
  nickname: string;
  ouid: string;
};

export type MatchPlayerStatus = {
  assist: number;
  goal: number;
  spRating: number;
};

export type MatchPlayerEntry = {
  spId: number;
  spPosition: number;
  spGrade: number;
  status: MatchPlayerStatus;
};

export type MatchDetailResponse = {
  matchId: string;
  matchDate: string;
  matchInfo: Array<{
    ouid: string;
    nickname: string;
    matchDetail: { matchResult: "승" | "무" | "패" | string };
    shoot: { goalTotal: number };
    player: MatchPlayerEntry[];
  }>;
};

export type OpponentRecord = {
  opponentId: string;
  wins: number;
  draws: number;
  losses: number;
  matchIds: string[];
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

export type PlayerStatSummary = {
  spId: number;
  name: string;
  appearances: number;
  avgRating: number;
  totalGoals: number;
  totalAssists: number;
};
