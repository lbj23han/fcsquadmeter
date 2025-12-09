// lib/friends.ts

export type Friend = {
  id: string; // 내부에서 쓸 id (닉네임이랑 같게 써도 됨)
  nickname: string; // FC 온라인 닉네임
  ouid?: string; // FC 온라인 ouid
};

export const FRIENDS: Friend[] = [
  {
    id: "중한",
    nickname: "LewisSkeiiy",
    ouid: "c3af963ea3b5c35e4b9e550587b57eb9",
  },
  {
    id: "찬희",
    nickname: "EZE10",
    ouid: "563b7830db450f64caf6f7605632ba4d",
  },
  {
    id: "진상훈",
    nickname: "FloriWirtz",
    ouid: "a547e7ce2133b7055c0d71c131f0d358",
  },
  {
    id: "빤지",
    nickname: "괴로워서",
    ouid: "05cc3e69d8a4d3915637552c56018ff2",
  },
];
