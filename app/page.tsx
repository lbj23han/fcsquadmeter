// app/page.tsx

import { FcSquadLayout } from "@/components/ui/FcSquadLayout";
import { SquadMeterBoard } from "@/components/ui/SquadMeterBoard";
import { getHomePageData } from "@/lib/fcHomePage";
import { ERROR_TEXT } from "@/styles/error";

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <FcSquadLayout>
      {data.status === "success" ? (
        <SquadMeterBoard players={data.players} />
      ) : (
        <p className={ERROR_TEXT}>{data.message}</p>
      )}
    </FcSquadLayout>
  );
}
