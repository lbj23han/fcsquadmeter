import type { ReactNode } from "react";
import { FCS_TITLE, FCS_DESCRIPTION } from "@/constants/fcsquadmeter";

import {
  LAYOUT_MAIN,
  LAYOUT_CONTAINER,
  LAYOUT_HEADER,
  LAYOUT_TITLE,
  LAYOUT_SUBTITLE,
} from "@/styles/layout";

type Props = {
  children: ReactNode;
};

export function FcSquadLayout({ children }: Props) {
  return (
    <main className={LAYOUT_MAIN}>
      <div className={LAYOUT_CONTAINER}>
        <header className={LAYOUT_HEADER}>
          <div>
            <h1 className={LAYOUT_TITLE}>{FCS_TITLE}</h1>
            <p className={LAYOUT_SUBTITLE}>{FCS_DESCRIPTION}</p>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
