// lib/fcHomePage.ts

import { calculateFriendsStats, buildRanking } from "@/lib/fconline";
import { resolveFcErrorMessage } from "@/lib/resolveError";

type RankedPlayers = ReturnType<typeof buildRanking>;

export type HomePageData =
  | {
      status: "success";
      players: RankedPlayers;
    }
  | {
      status: "error";
      message: string;
    };

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const stats = await calculateFriendsStats();
    const ranked = buildRanking(stats);

    return {
      status: "success",
      players: ranked,
    };
  } catch (error) {
    console.error("Failed to load friends stats:", error);
    const message = resolveFcErrorMessage(error);

    return {
      status: "error",
      message,
    };
  }
}
