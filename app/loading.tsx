import { FCS_TITLE, FCS_DESCRIPTION } from "@/constants/fcsquadmeter";
import {
  LAYOUT_MAIN,
  LAYOUT_CONTAINER,
  LAYOUT_HEADER,
  LAYOUT_TITLE,
  LAYOUT_SUBTITLE,
} from "@/styles/layout";

export default function Loading() {
  return (
    <main className={LAYOUT_MAIN}>
      <div className={LAYOUT_CONTAINER}>
        <header className={LAYOUT_HEADER}>
          <div>
            <h1 className={LAYOUT_TITLE}>{FCS_TITLE}</h1>
            <p className={LAYOUT_SUBTITLE}>{FCS_DESCRIPTION}</p>
          </div>
        </header>

        <div className="flex items-center justify-center gap-3 py-20">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
          <span className="text-sm text-zinc-400">전적 불러오는 중...</span>
        </div>
      </div>
    </main>
  );
}
