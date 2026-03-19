import type { MatchDetailResponse, OuidResponse } from "./types";

const FC_BASE_URL = "https://open.api.nexon.com/fconline/v1";

async function fcFetch<T>(path: string): Promise<T> {
  const apiKey = process.env.NEXON_API_KEY;
  if (!apiKey) throw new Error("NEXON_API_KEY is not set");

  const res = await fetch(`${FC_BASE_URL}${path}`, {
    headers: { "x-nxopen-api-key": apiKey },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error("FC_API_RATE_LIMIT");
    if (res.status === 404) throw new Error("FC_NICKNAME_NOT_FOUND");
    throw new Error(`FC API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ① ouid 조회 (닉네임 → ouid)
export async function getOuidByNickname(nickname: string): Promise<string> {
  const encoded = encodeURIComponent(nickname);
  const data = await fcFetch<OuidResponse>(`/id?nickname=${encoded}`);
  return data.ouid;
}

// ② matchId 리스트 조회 (클래식 1on1 = 40)
export async function getClassicMatchIds(ouid: string): Promise<string[]> {
  return fcFetch<string[]>(
    `/user/match?ouid=${ouid}&matchtype=40&offset=0&limit=20`,
  );
}

// ③ match-detail 조회
export async function getMatchDetail(
  matchId: string,
): Promise<MatchDetailResponse> {
  return fcFetch<MatchDetailResponse>(`/match-detail?matchid=${matchId}`);
}
