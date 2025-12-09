import {
  calculateFriendsStats,
  buildRanking,
  type FriendStats,
} from "@/lib/fconline";
import { FcSquadLayout } from "@/components/ui/FcSquadLayout";
import { SquadMeterBoard } from "@/components/ui/SquadMeterBoard";

export default async function HomePage() {
  let stats: FriendStats[] = [];

  try {
    stats = await calculateFriendsStats();
  } catch (error) {
    console.error("Failed to load friends stats:", error);

    const message =
      error instanceof Error && error.message === "FC_API_RATE_LIMIT"
        ? "넥슨 FC API 호출 제한에 걸렸습니다. 잠시 후 다시 시도해주세요."
        : "데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

    return (
      <FcSquadLayout>
        <p className="text-sm text-red-400">{message}</p>
      </FcSquadLayout>
    );
  }

  const ranked = buildRanking(stats);

  return (
    <FcSquadLayout>
      <SquadMeterBoard players={ranked} />
    </FcSquadLayout>
  );
}
