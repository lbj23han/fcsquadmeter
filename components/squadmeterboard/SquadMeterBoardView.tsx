import type { PlayerVM } from "./model";
import { PlayerCard } from "./PlayerCard";

type Props = {
  items: PlayerVM[];
};

export function SquadMeterBoardView({ items }: Props) {
  return (
    <>
      {items.map((vm) => (
        <PlayerCard key={vm.player.ouid} vm={vm} />
      ))}
    </>
  );
}
