# 🏆 FC SquadMeter

친구들의 **FC Online 전적을 자동으로 수집·정리**해서  
📊 **개인 랭킹 / 득점왕 / 허벌왕(최다 실점) / 상대전적** 등을 한 눈에 보여주는 웹 애플리케이션입니다.

**Next.js App Router + Server Components** 기반으로 구성되어 있고,  
**Vercel 배포 환경에서 SSR + 캐싱 전략(ISR/route cache)** 으로 안정적으로 동작합니다.

---

## ✨ Features

### 1) 자동 전적 수집 (Nexon Open API)

- FC Online 공식 API에서 친구들의 **OUID 기반 경기 데이터**를 가져옵니다.
- 경기 결과(승/무/패), 득점/실점, 상대 기록(vs) 등 다양한 데이터를 자동 분석합니다.

### 2) 개인 랭킹 시스템

각 플레이어에게 아래 지표를 기준으로 순위를 매깁니다.

- 승 수 (W)
- 무승부 (D)
- 패 수 (L)
- 득점 / 실점
- 친구 간 상대전적 (vs friends)

### 3) 특별 배지 시스템

특정 지표에서 1위를 차지한 플레이어에게 특별 배지를 부여합니다.

- 🏆 **우승** — 최다 승리
- ⚽ **득점왕** — 최다 득점
- 🥲 **허벌왕** — 최다 실점

### 4) SSR + 캐싱 기반 안정화 (429 회피)

넥슨 API 호출 제한(429)을 피하기 위해:

- 페이지/데이터 호출 흐름을 **캐싱 가능한 형태**로 구성합니다.
- 불필요한 API 호출을 줄여 **더 안정적이고 빠른 응답**을 제공합니다.

> 캐싱은 Next.js/Vercel 환경의 동작(요청 캐시/ISR 등)에 맞춰 구성하며,
> 필요 시 `revalidate` 기반으로 갱신 주기를 조절합니다.

---

## 🛠 Tech Stack

### Frontend / Backend

- **Next.js (App Router)**
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

## 📁 Project Structure

> `refactor/homepage-split` 브랜치에서는  
> **홈페이지 조립 로직 분리** + **UI/도메인/데이터 로직 경계 정리**를 목표로 합니다.

```txt
app/
  page.tsx                      # 데이터 로딩 + UI 조립 (Server Component)

lib/
  fcHomePage.ts                 # 홈에서 필요한 데이터 조립 (getHomePageData)
  friends.ts                    # 친구 목록/메타 정보
  resolveError.ts               # 에러 메시지 표준화
  matchtype.ts                  # 매치 타입 관련 유틸/상수
  division.ts                   # 디비전 관련 유틸/상수

  fconline/
    apiClient.ts                # Nexon API fetch + 키 관리/요청 유틸
    parsers.ts                  # API 응답 파싱/정규화
    stats.ts                    # 친구들 전체 전적 계산 로직
    ranking.ts                  # 정렬/랭킹/배지 플래그 계산
    types.ts                    # FC/도메인 타입 정의
    index.ts                    # barrel export

components/
  ui/
    FcSquadLayout.tsx           # 페이지 레이아웃(UI facade)
    SquadMeterBoard.tsx         # 보드 엔트리(UI facade: 내부 feature를 re-export)

  squadmeterboard/              # (feature) board 모듈: MVC 분리
    model.ts                    # 파생 데이터/VM 생성 (opponents, vsMap 등)
    controller.tsx              # players → VM 변환 후 view에 전달
    SquadMeterBoardView.tsx     # 보드 리스트 렌더링
    PlayerCard.tsx              # 카드 레이아웃
    PlayerBadges.tsx            # 배지 렌더링
    OpponentRows.tsx            # 상대 전적 rows

constants/
  fcsquadmeter.ts               # 배지 텍스트/이모지
  squadmeterboard.ts            # UI 라벨(승/무/패, noRecord 등)

styles/
  error.ts                      # 에러 텍스트 클래스
  layout.ts                     # 공통 레이아웃 스타일(분리 예정/신규)
```

---

## 🧩 Data Flow

- 1. app/page.tsx
- 2. getHomePageData() 에서 넥슨 API 호출/가공
- 3. ranking/stats 로직으로 랭킹/배지/상대전적 계산
- 4. View 컴포넌트에서 카드/배지/상대전적 표시

---

## Notes

- 이 프로젝트는 친구 간 전적 비교에 최적화되어 있습니다.
- 넥슨 API rate limit(429)을 고려하여 캐싱/갱신 전략을 조절합니다.
