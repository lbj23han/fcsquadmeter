import type { Player, FriendStats } from "./types";
import { parseMatchDetail } from "./parsers";
import { getClassicMatchIds } from "./apiClient";

function isFriendMatch(ouids: string[], playerOuids: string[]) {
  return ouids.filter((id) => playerOuids.includes(id)).length === 2;
}

export async function calculateFriendsStats(
  players: Player[],
): Promise<FriendStats[]> {
  const playerOuids = players.map((p) => p.ouid);
  const ouidToId = new Map(players.map((p) => [p.ouid, p.id]));

  const allMatchIds = new Set<string>();

  // 1) 플레이어별 matchId 모으기
  for (const p of players) {
    const ids = await getClassicMatchIds(p.ouid);
    ids.forEach((id) => allMatchIds.add(id));
  }

  // 2) 초기 stats 세팅
  const stats = new Map<string, FriendStats>();

  for (const p of players) {
    stats.set(p.ouid, {
      id: p.id,
      ouid: p.ouid,
      nickname: p.nickname,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      vs: players.filter((o) => o.ouid !== p.ouid).map((o) => ({
        opponentId: o.id,
        wins: 0,
        draws: 0,
        losses: 0,
        matchIds: [],
      })),
    });
  }

  // 3) 각 match-detail 분석
  for (const matchId of allMatchIds) {
    const match = await parseMatchDetail(matchId);
    const ouids = match.players.map((p) => p.ouid);

    if (!isFriendMatch(ouids, playerOuids)) continue;

    const [A, B] = match.players;

    const sA = stats.get(A.ouid);
    const sB = stats.get(B.ouid);
    if (!sA || !sB) continue;

    const idA = ouidToId.get(A.ouid);
    const idB = ouidToId.get(B.ouid);
    if (!idA || !idB) continue;

    const vsA = sA.vs.find((v) => v.opponentId === idB);
    const vsB = sB.vs.find((v) => v.opponentId === idA);
    if (!vsA || !vsB) continue;

    // matchId 기록
    vsA.matchIds.push(matchId);
    vsB.matchIds.push(matchId);

    // 득실
    sA.goalsFor += A.goals;
    sA.goalsAgainst += B.goals;
    sB.goalsFor += B.goals;
    sB.goalsAgainst += A.goals;

    // 승무패
    if (A.result === "승") {
      sA.wins++;
      sB.losses++;
      vsA.wins++;
      vsB.losses++;
    } else if (A.result === "패") {
      sB.wins++;
      sA.losses++;
      vsB.wins++;
      vsA.losses++;
    } else {
      sA.draws++;
      sB.draws++;
      vsA.draws++;
      vsB.draws++;
    }
  }

  return Array.from(stats.values());
}
