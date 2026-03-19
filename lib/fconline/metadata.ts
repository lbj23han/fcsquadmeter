type SpidEntry = { id: number; name: string };

let cache: Map<number, string> | null = null;

async function loadSpidCache(): Promise<Map<number, string>> {
  if (cache) return cache;

  const res = await fetch(
    "https://open.api.nexon.com/static/fconline/meta/spid.json",
    { cache: "force-cache" },
  );
  const data: SpidEntry[] = await res.json();
  cache = new Map(data.map((e) => [e.id, e.name]));
  return cache;
}

export async function getPlayerName(spId: number): Promise<string> {
  const map = await loadSpidCache();
  return map.get(spId) ?? `#${spId}`;
}
