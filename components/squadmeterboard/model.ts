import type { RankedFriend, Player } from "@/lib/fconline";

export type Opponent = Player;

export type PlayerVM = {
  player: RankedFriend;
  opponents: Opponent[];
  vsByOpponentId: Map<string, RankedFriend["vs"][number]>;
};

export function buildPlayerVM(
  player: RankedFriend,
  allPlayers: Player[],
): PlayerVM {
  const opponents = allPlayers.filter((p) => p.ouid !== player.ouid);

  const vsByOpponentId = new Map(
    player.vs.map((v) => [v.opponentId, v] as const),
  );

  return { player, opponents, vsByOpponentId };
}
