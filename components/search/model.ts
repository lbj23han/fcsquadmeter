import { SEARCH_LABELS } from "@/constants/search";

export type SearchVM = {
  nicknames: string[];
  isValid: boolean;
  errorMessage: string | null;
};

export function buildSearchVM(raw: string): SearchVM {
  const nicknames = raw
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  if (nicknames.length > 0 && nicknames.length < 2) {
    return { nicknames, isValid: false, errorMessage: SEARCH_LABELS.minPlayersError };
  }

  if (nicknames.length > 4) {
    return { nicknames, isValid: false, errorMessage: SEARCH_LABELS.maxPlayersError };
  }

  return { nicknames, isValid: true, errorMessage: null };
}
