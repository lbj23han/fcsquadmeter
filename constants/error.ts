// constants/error.ts

export const FC_ERROR_MESSAGES = {
  API_RATE_LIMIT:
    "넥슨 FC API 호출 제한에 걸렸습니다. 잠시 후 다시 시도해주세요.",
  GENERIC:
    "데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
} as const;

export type FcErrorCode = keyof typeof FC_ERROR_MESSAGES;
