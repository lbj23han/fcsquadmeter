"use client";

import { useState } from "react";
import { LABELS } from "@/constants/squadmeterboard";
import type { OpponentRecord } from "@/lib/fconline";
import type { PlayerStatSummary } from "@/lib/fconline/types";
import type { Opponent } from "./model";
import {
  DETAIL_CONTAINER,
  DETAIL_PLAYER_ROW,
  DETAIL_PLAYER_NAME,
  DETAIL_PLAYER_STATS,
  DETAIL_RANK,
  DETAIL_LOADING,
  DETAIL_EMPTY,
} from "@/styles/opponentDetail";

type Props = {
  opponent: Opponent;
  vs: OpponentRecord;
  playerOuid: string;
};

export function OpponentRow({ opponent, vs, playerOuid }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topPlayers, setTopPlayers] = useState<PlayerStatSummary[] | null>(
    null,
  );

  const hasRecord = vs.wins > 0 || vs.draws > 0 || vs.losses > 0;

  async function handleToggle() {
    if (!hasRecord) return;

    if (expanded) {
      setExpanded(false);
      return;
    }

    setExpanded(true);
    if (topPlayers !== null) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        matchIds: vs.matchIds.join(","),
        ouid: playerOuid,
      });
      const res = await fetch(`/api/opponent-stats?${params}`);
      const data: { topPlayers: PlayerStatSummary[] } = await res.json();
      setTopPlayers(data.topPlayers);
    } catch {
      setTopPlayers([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        className={`ml-2 flex justify-between text-[13px] ${
          hasRecord ? "cursor-pointer hover:text-zinc-100 transition-colors" : ""
        }`}
        onClick={handleToggle}
      >
        <span className="text-zinc-400">{opponent.id}</span>
        <span className="text-zinc-200">
          {vs.wins}
          {LABELS.win} {vs.draws}
          {LABELS.draw} {vs.losses}
          {LABELS.loss}
          {hasRecord && (
            <span className="ml-1.5 text-zinc-600 text-[10px]">
              {expanded ? "▲" : "▼"}
            </span>
          )}
        </span>
      </div>

      {expanded && (
        <div className={DETAIL_CONTAINER}>
          {loading && <p className={DETAIL_LOADING}>{LABELS.loadingPlayers}</p>}

          {!loading && topPlayers && topPlayers.length === 0 && (
            <p className={DETAIL_EMPTY}>{LABELS.noPlayerData}</p>
          )}

          {!loading &&
            topPlayers &&
            topPlayers.map((p, i) => (
              <div key={p.spId} className={DETAIL_PLAYER_ROW}>
                <span className={DETAIL_PLAYER_NAME}>
                  <span className={DETAIL_RANK}>{i + 1}.</span>
                  {p.name}
                </span>
                <span className={DETAIL_PLAYER_STATS}>
                  {LABELS.ratingLabel} {p.avgRating.toFixed(1)} ·{" "}
                  {p.totalGoals}
                  {LABELS.goalLabel} {p.totalAssists}
                  {LABELS.assistLabel}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
