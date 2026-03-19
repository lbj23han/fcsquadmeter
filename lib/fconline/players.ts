import { getOuidByNickname } from "./apiClient";
import type { Player } from "./types";

export async function resolvePlayers(nicknames: string[]): Promise<Player[]> {
  return Promise.all(
    nicknames.map(async (nickname) => {
      const ouid = await getOuidByNickname(nickname);
      return { id: nickname, nickname, ouid };
    }),
  );
}
