import { NextRequest, NextResponse } from "next/server";
import { getTopPlayersByRating } from "@/lib/fconline/matchPlayers";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const rawMatchIds = searchParams.get("matchIds") ?? "";
  const ouid = searchParams.get("ouid") ?? "";

  if (!ouid || !rawMatchIds) {
    return NextResponse.json({ topPlayers: [] });
  }

  const matchIds = rawMatchIds.split(",").filter(Boolean);

  try {
    const topPlayers = await getTopPlayersByRating(matchIds, ouid);
    return NextResponse.json({ topPlayers });
  } catch (error) {
    console.error("opponent-stats error:", error);
    return NextResponse.json({ topPlayers: [] }, { status: 500 });
  }
}
