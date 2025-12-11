// lib/resolveError.ts

import { FC_ERROR_MESSAGES } from "@/constants/error";

export function resolveFcErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message === "FC_API_RATE_LIMIT") {
    return FC_ERROR_MESSAGES.API_RATE_LIMIT;
  }

  return FC_ERROR_MESSAGES.GENERIC;
}
