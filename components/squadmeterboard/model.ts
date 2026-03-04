import { FRIENDS } from "@/lib/friends";
import type { RankedFriend } from "@/lib/fconline";

export type Opponent = (typeof FRIENDS)[number];

export type PlayerVM = {
  player: RankedFriend;
  opponents: Opponent[];
  vsByOpponentId: Map<string, RankedFriend["vs"][number]>;
};

export function buildPlayerVM(player: RankedFriend): PlayerVM {
  const opponents = FRIENDS.filter((f) => f.ouid !== player.ouid);

  const vsByOpponentId = new Map(
    player.vs.map((v) => [v.opponentId, v] as const),
  );

  return { player, opponents, vsByOpponentId };
}
