# 🏆 FC SquadMeter

친구들의 **FC Online 전적을 자동으로 수집·정리**해서  
📊 **개인 랭킹 / 득점왕 / 허벌왕(최다 실점) / 상대전적** 등을 한 눈에 보여주는 웹 애플리케이션입니다.

Next.js App Router + Server Components 기반으로 만들어졌으며,  
Vercel 환경에서 자동 배포 및 SSR로 동작합니다.

---

## ✨ Features

### 🔹 1. 자동 전적 수집 (Nexon Open API 사용)

- FC Online 공식 API에서 친구들의 OUID를 기반으로 경기 데이터를 가져옵니다.
- 경기 결과, 승/무/패, 득점/실점, 상대 기록 등 다양한 데이터를 자동으로 분석합니다.

### 🔹 2. 개인 랭킹 시스템

각 플레이어에게 아래 지표를 기준으로 순위를 매깁니다.

- 승 수 (W)
- 무승부 (D)
- 패 수 (L)
- 득점 / 실점
- 친구 간 상대전적 (vs 친구)

### 🔹 3. 특별 배지 시스템

특정 지표에서 1위를 차지한 플레이어에게 특별 배지를 부여합니다.

- 🏆 **우승** — 최다 승리
- ⚽ **득점왕** — 최다 득점
- 🥲 **허벌왕** — 최다 실점

### 🔹 4. SSR + ISR 기반 캐싱

넥슨 API 호출 제한(429)을 피하기 위해:

- 페이지는 **ISR (Incremental Static Regeneration)** 으로 일정 시간 동안 캐싱됩니다.
- 불필요한 API 호출을 줄여, 더 안정적이고 빠른 응답을 제공합니다.

---

## 🛠 Tech Stack

### Frontend / Backend

- **Next.js 16 (App Router)**
- **React Server Components**
- **TypeScript**

### Deployment

- **Vercel** (자동 빌드 & 배포, 서버 캐싱)

### Styles

- **Tailwind CSS**
- 커스텀 UI 프리미티브 컴포넌트 구조 (`UI.PlayerCard`, `UI.BadgePill` 등)

### API

- **Nexon Open API (fconline/v1)**
  - `/user/match`
  - `/match-detail`

---

## 📁 Project Structure (요약)

```txt
lib/
  fconline/
    apiClient.ts       # Nexon API fetch + 키 관리
    stats.ts           # 친구들 전체 전적 계산 로직
    ranking.ts         # 정렬/랭킹/배지 플래그 계산
    types.ts           # FC/도메인 타입 정의
    index.ts           # barrel export

components/
  ui/
    squad/
      Primitives.tsx   # PlayerCard, BadgeRow 등 UI 프리미티브
      index.ts         # export const UI = { ... }
    SquadMeterBoard.tsx
    FcSquadLayout.tsx

constants/
  fcsquadmeter.ts      # 배지 텍스트/이모지
  fcsquadmeter-ui.ts   # UI 텍스트 상수들

app/
  page.tsx             # 데이터 로딩 + UI 조립 (SSR + ISR)
```
