import type { RankedFriend, Player } from "@/lib/fconline";
import { buildPlayerVM } from "./model";
import { SquadMeterBoardView } from "./SquadMeterBoardView";

type Props = {
  players: RankedFriend[];
  allPlayers: Player[];
};

export function SquadMeterBoard({ players, allPlayers }: Props) {
  const vms = players.map((p) => buildPlayerVM(p, allPlayers));
  return <SquadMeterBoardView items={vms} />;
}
