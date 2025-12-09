import {
  calculateFriendsStats,
  buildRanking,
  type FriendStats,
} from "@/lib/fconline";
import { FcSquadLayout } from "@/components/ui/FcSquadLayout";
import { SquadMeterBoard } from "@/components/ui/SquadMeterBoard";

export default async function HomePage() {
  const stats: FriendStats[] = await calculateFriendsStats();
  const ranked = buildRanking(stats);

  return (
    <FcSquadLayout>
      <SquadMeterBoard players={ranked} />
    </FcSquadLayout>
  );
}
