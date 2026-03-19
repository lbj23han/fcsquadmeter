import { calculateFriendsStats, buildRanking, resolvePlayers } from "@/lib/fconline";
import type { Player } from "@/lib/fconline";
import { resolveFcErrorMessage } from "@/lib/resolveError";

type RankedPlayers = ReturnType<typeof buildRanking>;

export type SearchPageData =
  | { status: "idle" }
  | { status: "success"; players: RankedPlayers; allPlayers: Player[] }
  | { status: "error"; message: string };

export async function getSearchPageData(
  nicknames: string[],
): Promise<SearchPageData> {
  if (nicknames.length === 0) return { status: "idle" };

  try {
    const resolved = await resolvePlayers(nicknames);
    const stats = await calculateFriendsStats(resolved);
    const ranked = buildRanking(stats);

    return { status: "success", players: ranked, allPlayers: resolved };
  } catch (error) {
    console.error("Failed to load stats:", error);
    const message = resolveFcErrorMessage(error);

    return { status: "error", message };
  }
}
