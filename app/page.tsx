import { FcSquadLayout } from "@/components/ui/FcSquadLayout";
import { SquadMeterBoard } from "@/components/squadmeterboard/controller";
import { SearchForm } from "@/components/search/controller";
import { getSearchPageData } from "@/lib/fcHomePage";
import { ERROR_TEXT } from "@/styles/error";
import { SEARCH_EMPTY } from "@/styles/search";
import { SEARCH_LABELS } from "@/constants/search";

type Props = {
  searchParams: Promise<{ nicknames?: string }>;
};

function parseNicknames(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
}

export default async function HomePage({ searchParams }: Props) {
  const { nicknames: rawNicknames } = await searchParams;
  const nicknames = parseNicknames(rawNicknames);
  const data = await getSearchPageData(nicknames);

  return (
    <FcSquadLayout>
      <SearchForm defaultValue={nicknames.join(", ")} />

      {data.status === "success" && (
        <SquadMeterBoard players={data.players} allPlayers={data.allPlayers} />
      )}

      {data.status === "error" && (
        <p className={ERROR_TEXT}>{data.message}</p>
      )}

      {data.status === "idle" && (
        <p className={SEARCH_EMPTY}>{SEARCH_LABELS.emptyState}</p>
      )}
    </FcSquadLayout>
  );
}
