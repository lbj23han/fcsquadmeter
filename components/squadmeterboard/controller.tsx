import type { RankedFriend } from "@/lib/fconline";
import { buildPlayerVM } from "./model";
import { SquadMeterBoardView } from "./SquadMeterBoardView";

type Props = {
  players: RankedFriend[];
};

export function SquadMeterBoard({ players }: Props) {
  const vms = players.map(buildPlayerVM);
  return <SquadMeterBoardView items={vms} />;
}
