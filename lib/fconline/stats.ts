// lib/fconline/stats.ts
import { FRIENDS } from "../friends";
import type { FriendStats } from "./types";
import { parseMatchDetail } from "./parsers";
import { getClassicMatchIds } from "./apiClient";

function isFriendMatch(ouids: string[], friendOuids: string[]) {
  return ouids.filter((id) => friendOuids.includes(id)).length === 2;
}

export async function calculateFriendsStats(): Promise<FriendStats[]> {
  const friendOuids = FRIENDS.map((f) => f.ouid!).filter(Boolean);
  const ouidToId = new Map(FRIENDS.map((f) => [f.ouid!, f.id]));

  const allMatchIds = new Set<string>();

  // 1) 친구별 matchId 모으기
  // (나중에 성능 튜닝할 때 여기 Promise.all 로 병렬로 바꾸면 됨)
  for (const f of FRIENDS) {
    const ids = await getClassicMatchIds(f.ouid!);
    ids.forEach((id) => allMatchIds.add(id));
  }

  // 2) 초기 stats 세팅
  const stats = new Map<string, FriendStats>();

  for (const f of FRIENDS) {
    if (!f.ouid) continue;

    stats.set(f.ouid, {
      id: f.id,
      ouid: f.ouid,
      nickname: f.nickname,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      vs: FRIENDS.filter((o) => o.ouid !== f.ouid).map((o) => ({
        opponentId: o.id,
        wins: 0,
        draws: 0,
        losses: 0,
      })),
    });
  }

  // 3) 각 match-detail 분석
  for (const matchId of allMatchIds) {
    const match = await parseMatchDetail(matchId);
    const ouids = match.players.map((p) => p.ouid);

    if (!isFriendMatch(ouids, friendOuids)) continue;

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
