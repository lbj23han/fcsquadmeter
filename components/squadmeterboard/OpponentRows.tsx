import { LABELS } from "@/constants/squadmeterboard";
import type { Opponent } from "./model";

type Vs = {
  opponentId: string;
  wins: number;
  draws: number;
  losses: number;
};

type Props = {
  opponents: Opponent[];
  vsByOpponentId: Map<string, Vs>;
};

export function OpponentRows({ opponents, vsByOpponentId }: Props) {
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
          <div key={opp.id} className="ml-2 flex justify-between text-[13px]">
            <span className="text-zinc-400">{opp.id}</span>
            <span className="text-zinc-200">
              {vs.wins}
              {LABELS.win} {vs.draws}
              {LABELS.draw} {vs.losses}
              {LABELS.loss}
            </span>
          </div>
        );
      })}
    </>
  );
}
