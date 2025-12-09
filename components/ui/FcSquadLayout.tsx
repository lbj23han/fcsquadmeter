// components/ui/FcSquadLayout.tsx
import type { ReactNode } from "react";
import { FCS_TITLE, FCS_DESCRIPTION } from "@/constants/fcsquadmeter";

type Props = {
  children: ReactNode;
};

export function FcSquadLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {FCS_TITLE}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">{FCS_DESCRIPTION}</p>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
