import { LABELS } from "@/constants/squadmeterboard";
import type { OpponentRecord } from "@/lib/fconline";
import type { Opponent } from "./model";
import { OpponentRow } from "./OpponentRow";

type Props = {
  opponents: Opponent[];
  vsByOpponentId: Map<string, OpponentRecord>;
  playerOuid: string;
};

export function OpponentRows({ opponents, vsByOpponentId, playerOuid }: Props) {
  return (
    <>
      {opponents.map((opp) => {
        const vs = vsByOpponentId.get(opp.id);

        if (!vs) {
          return (
            <div key={opp.id} className="ml-2 text-[13px] text-zinc-500">
              {opp.id}: {LABELS.noRecord}
            </div>
          );
        }

        return (
          <OpponentRow
            key={opp.id}
            opponent={opp}
            vs={vs}
            playerOuid={playerOuid}
          />
        );
      })}
    </>
  );
}
