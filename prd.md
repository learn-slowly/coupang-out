# 쿠팡아웃 캠페인 웹사이트 PRD

## 1. 프로젝트 개요

**사이트명**: 쿠팡아웃 (Coupang Out)

**도메인**: 
- 메인: **coupang-out.com**
- 한글: **쿠팡아웃.com** (메인으로 리다이렉트)

**목표**: 12/22까지 2개 핵심 메뉴 완성 (풀 기능)

**포함 메뉴**:
- ✅ 미션: 쿠팡아웃 인증 (풀 스펙)
- ✅ 왜 쿠팡아웃인가? (풀 스펙)

**제외 메뉴 (v2 업데이트 예정)**:
- ⏳ 쿠팡이 가져간 것들 (인터랙티브 웹 다큐멘터리)
- ⏳ 쿠없세 (쿠팡 없는 세상: 대안 플랫폼 큐레이션)
- ⏳ 제도개혁 (입법 청원 및 서명운동)

## 13. Future Plan (v2)

### 13.1 쿠팡이 가져간 것들 (Interactive Documentary)
- 스크롤텔링 방식으로 쿠팡의 성장과 노동자의 희생을 대조
- 인터랙티브 데이터 시각화 (매출 성장 vs 산재 증가)

### 13.2 쿠없세 (Life Without Coupang)
- "쿠팡 없이도 잘 산다" 대안 라이프스타일 제안
- 로켓배송 대체 서비스 큐레이션 (컬리, 오아시스, 네이버 등 비교)
- 동네 마트/시장 지도 (Kakao Map API)

### 13.3 제도개혁 (Act Now)
- 국회 입법 청원 연동
- 서명 운동 페이지 구현
- 정치인/정당별 쿠팡 관련 발언 아카이브

## 2. 기술 스택

```yaml
Frontend:
  - Next.js 15 (App Router)
  - TypeScript
  - Tailwind CSS 4.0
  - shadcn/ui (button, card, dialog, form, input, textarea, tabs, toast, skeleton, badge)
  - Framer Motion

Backend:
  - Supabase (PostgreSQL, Storage)

Image Processing:
  - sharp (서버사이드 리사이징)
  - browser-image-compression (클라이언트 압축)

Security:
  - reCAPTCHA v3
  - Rate limiting (Vercel Edge or Upstash Redis)

Analytics:
  - Vercel Analytics

Deployment:
  - Vercel
```

## 3. 사이트 구조

```
/                    → 메인 페이지 (랜딩)
/mission             → 미션: 쿠팡아웃 인증
/why                 → 왜 쿠팡아웃인가?
/about               → 캠페인 소개 (간단한 정적 페이지)
```

## 4. 페이지별 상세 요구사항

### 4.1 메인 페이지 (/)

**레이아웃 (모바일 우선)**

```typescript
// 섹션 구성
1. Hero Section
   - 임팩트 헤드라인: "쿠팡아웃"
   - 서브헤드: "25명의 죽음, 3,370만 개인정보 유출"
   - CTA: "문제점 보기" (→ /why)
   
2. Stats Section (4개 카드)
   - 산재율 10배 (한국 평균 대비)
   - 노동자 25명 사망
   - 3,370만 개인정보 유출
   - 주 72시간 노동
   - 각 카드: 큰 숫자 + 짧은 설명 + 출처 링크
   - Fade-in 애니메이션 (Framer Motion)
   
3. Quick Actions (2개 네비게이션 카드)
   - "미션: 쿠팡아웃" → /mission
   - "왜 쿠팡아웃인가?" → /why
   
4. Recent Activities
   - 최근 인증샷 6개 (썸네일)
   - 애니메이션: stagger children
   - "더 보기" → /mission
   
5. Footer
   - 캠페인 소개 링크
   - 문의
   - SNS
```

**디자인 스펙**
```css
/* 컬러 스킴 */
Primary: #DC2626 (Red-600)
Secondary: #1F2937 (Gray-800)
Accent: #FCD34D (Yellow-300)
Background: #FFFFFF
Surface: #F9FAFB (Gray-50)

/* 타이포그래피 */
Heading XL: 32px / Bold / -0.02em
Heading L: 24px / Bold / -0.01em  
Body: 16px / Regular / 0
Caption: 14px / Regular / 0

/* 간격 */
Section Padding: 24px (mobile), 48px (desktop)
Card Gap: 16px
Button Height: 48px

/* 애니메이션 */
Fade-in on scroll (Framer Motion)
Stagger children: 0.1s delay
```

### 4.2 미션: 쿠팡아웃 (/mission) - **풀 스펙**

**목적**: 인증 업로드 및 참여 독려

**레이아웃**
```typescript
1. 헤더
   - 제목: "미션: 쿠팡아웃"
   - 서브: "당신의 선택이 변화를 만듭니다"
   
2. 탈퇴 가이드
   - 쿠팡 탈퇴 방법 (6단계→2단계 간소화 안내)
   - 스크린샷 예시 이미지
   - 주의사항 (환불, 쿠팡페이 등)
   - Accordion 또는 Collapsible로 접기/펼치기
   
3. 참여 현황 대시보드
   - 실시간 카운터: "○○○명 참여" (애니메이션)
   - 최근 24시간/7일 참여자 수
   - 간단한 그래프 (선택사항)
   
4. 인증샷 업로드 폼
   - 드래그앤드롭 업로드 영역
   - 파일 선택 버튼 (대체 옵션)
   - 이미지 미리보기
   - 간단한 소감 입력 (선택, 최대 200자)
   - 업로드 진행률 표시
   - "인증 완료" 버튼
   - reCAPTCHA v3 (백그라운드)
   
5. 인증샷 갤러리
   - 무한 스크롤 (React Query + Intersection Observer)
   - Masonry 레이아웃 (react-masonry-css)
   - 각 카드: 이미지 + 소감 미리보기 + 날짜
   - 클릭 시 모달 확대 (이미지 + 전체 소감)
   - 로딩 스켈레톤
```

**이미지 처리 플로우**
```typescript
// Client Side
1. browser-image-compression
   - 최대 크기: 1920px
   - 품질: 0.8
   - 예상 크기: 500KB 이하
   
2. 업로드 진행률 표시

// Server Side (Next.js API Route)
3. sharp 리사이징
   - Thumbnail: 400x400 (갤러리용)
   - Display: 1200x1200 (모달용)
   - Original: Supabase Storage
   
4. 메타데이터 DB 저장

// Security
5. 파일 타입 검증 (MIME: image/jpeg, image/png, image/webp)
6. 파일 크기 제한 (5MB)
7. reCAPTCHA 점수 확인 (>0.5)
8. Rate limiting: IP별 10분당 1회
```

**데이터 모델**
```sql
CREATE TABLE mission_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  display_url TEXT NOT NULL,  -- 1200x1200
  comment TEXT,
  ip_hash TEXT,  -- SHA-256(IP + SALT)
  recaptcha_score FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  
  INDEX idx_created_at DESC,
  INDEX idx_is_approved WHERE is_approved = TRUE
);

-- 통계 캐시 테이블
CREATE TABLE mission_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_count INTEGER DEFAULT 0,
  last_24h_count INTEGER DEFAULT 0,
  last_7d_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (id = 1)
);
```

**API Routes**
```typescript
// POST /api/mission
interface UploadRequest {
  image: File
  comment?: string
  recaptchaToken: string
}

// GET /api/mission?cursor=<timestamp>&limit=20
interface ListResponse {
  posts: MissionPost[]
  nextCursor: string | null
  hasMore: boolean
}

// GET /api/mission/stats
interface StatsResponse {
  total: number
  last24h: number
  last7d: number
}
```

### 4.3 왜 쿠팡아웃인가? (/why) - **풀 스펙**

**목적**: 쿠팡 문제점 정리 + SNS 바이럴 최적화

**카테고리별 탭**
```typescript
type IssueCategory = 
  | 'labor'           // 노동 문제
  | 'privacy'         // 개인정보
  | 'unfair-practice' // 갑질
  | 'union-busting'   // 노조 탄압

interface Issue {
  id: string
  category: IssueCategory
  title: string
  subtitle: string
  description: string
  facts: Fact[]
  sources: Source[]
  shareImages: {
    instagram: string    // 1080x1080
    instagramStory: string // 1080x1920
    twitter: string      // 1200x675
    facebook: string     // 1200x630
  }
  shareText: {
    instagram: string
    twitter: string
    facebook: string
    kakao: string
  }
  hashtags: string[]
  viewCount: number
  shareCount: number
}
```

**레이아웃**
```typescript
1. 헤더
   - 제목: "왜 쿠팡아웃인가?"
   - 인트로: "쿠팡의 구조적 문제, 하나씩 알아보세요"
   
2. 카테고리 탭 네비게이션
   - 전체
   - 노동 문제 (25명 사망)
   - 개인정보 (3,370만 유출)
   - 갑질 (납품업체)
   - 노조 탄압
   
3. 이슈 카드 목록
   각 카드:
   - 카테고리 뱃지
   - 제목 + 서브타이틀
   - 핵심 팩트 3개
   - "자세히 보기" 버튼
   - "공유하기" 버튼 (강조)
   - 공유 카운트
   
4. 이슈 상세 (확장 시)
   - 전체 설명
   - 팩트 리스트 (출처 링크)
   - 타임라인
   - 관련 이슈 링크
```

**SNS 공유 최적화**
```typescript
// 공유 플로우
1. "공유하기" 버튼 클릭
   
2. 플랫폼 선택 모달
   - 인스타그램 (Feed)
   - 인스타그램 (Story)
   - 트위터/X
   - 페이스북
   - 카카오톡
   - 링크 복사
   
3. 플랫폼별 동작
   
   Instagram Feed:
   - 1080x1080 이미지 다운로드
   - 캡션 텍스트 클립보드 복사
   - "인스타그램 앱 열기" 버튼
   
   Instagram Story:
   - 1080x1920 이미지 다운로드
   - 캡션 복사
   
   Twitter:
   - 텍스트 + 링크 + 해시태그 복사
   - Twitter Web Intent 오픈
   
   Facebook:
   - Share Dialog (Web Share API)
   
   Kakao:
   - Kakao SDK 공유
   
   링크 복사:
   - URL 클립보드 복사
   
4. 공유 완료
   - 감사 메시지
   - 공유 카운트 +1
```

**공유 텍스트 템플릿**
```typescript
const shareTemplates = {
  labor: {
    instagram: `쿠팡에서 2020년 이후 25명이 사망했습니다.
주 72시간 과로 노동, 더 이상 방치할 수 없습니다.

자세히 보기: coupang-out.com/why

#쿠팡아웃 #쿠팡불매 #노동자의생명 #과로사`,

    twitter: `쿠팡 노동자 25명 사망 (2020~)
주 72시간 과로 노동

우리의 편의가 누군가의 생명을 앗아갑니다.

#쿠팡아웃 #쿠팡불매
coupang-out.com/why`,

    facebook: `쿠팡의 진실: 25명의 죽음

2020년 이후 과로사로 목숨을 잃은 노동자가 25명.
주 72시간 노동, 산재율은 한국 평균의 10배입니다.

더 이상 침묵할 수 없습니다.
coupang-out.com/why`,

    kakao: `쿠팡 노동자 25명 사망 | 쿠팡아웃`
  },
  
  privacy: {
    instagram: `쿠팡 3,370만 개인정보 유출.
국민 65%의 정보가 5개월간 무방비 상태였습니다.

자세히 보기: coupang-out.com/why

#쿠팡개인정보유출 #쿠팡아웃 #개인정보보호`,

    twitter: `쿠팡 3,370만 개인정보 유출
- 국민 65% 규모
- 5개월간 방치
- 5년간 4차례 유출

당신의 정보도 포함되어 있습니다.

#쿠팡아웃 #개인정보유출
coupang-out.com/why`,

    facebook: `쿠팡 3,370만 개인정보 유출 사건

단일 기업 최근 10년 최대 규모.
5개월간 방치, 고객 민원으로 뒤늦게 발각.
지난 5년간 4차례 유출, 배상 0건.

우리의 정보를 지킬 수 없다면 거부합니다.
coupang-out.com/why`,

    kakao: `쿠팡 3,370만 개인정보 유출 | 쿠팡아웃`
  },
  
  unfairPractice: {
    instagram: `쿠팡의 갑질.
납품업체에 타 플랫폼 가격 조정 강요.
공정위 과징금 32억 9,700만원.

자세히 보기: coupang-out.com/why

#쿠팡아웃 #쿠팡갑질 #공정거래`,

    twitter: `쿠팡 갑질 문제:
- 납품업체 가격 조정 강요
- 중소업체 유사제품 판매
- 직원 리뷰 조작

공정위 과징금 32억 9,700만원

#쿠팡아웃 #공정거래
coupang-out.com/why`,

    facebook: `쿠팡의 갑질 행태

납품업체에 타 플랫폼 가격 조정 강요.
중소업체 유사제품 판매, 직원 리뷰 조작.
공정거래위원회 과징금 32억 9,700만원.

중소상인이 무너지면 우리 모두가 무너집니다.
coupang-out.com/why`,

    kakao: `쿠팡 갑질 문제 | 쿠팡아웃`
  },
  
  unionBusting: {
    instagram: `쿠팡의 노조 탄압.
노조활동 방해, 단체협약 미이행.
노동자의 목소리를 묵살합니다.

자세히 보기: coupang-out.com/why

#쿠팡아웃 #노조탄압 #노동권`,

    twitter: `쿠팡 노조 탄압:
- 노조활동 방해
- 단체협약 미이행
- 노동자 목소리 묵살

노동권은 헌법이 보장하는 기본권입니다.

#쿠팡아웃 #노동권
coupang-out.com/why`,

    facebook: `쿠팡의 노조 탄압

노조활동 방해, 단체협약 미이행.
노동자의 정당한 권리 행사를 막고 있습니다.

노동권은 헌법이 보장하는 기본권입니다.
coupang-out.com/why`,

    kakao: `쿠팡 노조 탄압 문제 | 쿠팡아웃`
  }
}
```

**Kakao Share SDK**
```typescript
// SDK 로드
useEffect(() => {
  if (!window.Kakao?.isInitialized()) {
    window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
  }
}, [])

// 공유 함수
const shareToKakao = (issue: Issue) => {
  window.Kakao?.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: issue.title,
      description: issue.subtitle,
      imageUrl: issue.shareImages.facebook,
      link: {
        mobileWebUrl: `https://coupang-out.com/why#${issue.id}`,
        webUrl: `https://coupang-out.com/why#${issue.id}`,
      },
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: `https://coupang-out.com/why#${issue.id}`,
          webUrl: `https://coupang-out.com/why#${issue.id}`,
        },
      },
    ],
  })
}
```

**데이터 모델**
```sql
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  facts JSONB NOT NULL,
  sources JSONB NOT NULL,
  share_images JSONB NOT NULL,
  share_text JSONB NOT NULL,
  hashtags TEXT[] NOT NULL,
  share_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  INDEX idx_category,
  INDEX idx_display_order,
  INDEX idx_share_count DESC
);

CREATE TABLE share_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id),
  platform TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  INDEX idx_issue_id,
  INDEX idx_created_at DESC,
  INDEX idx_platform
);
```

**API Routes**
```typescript
// GET /api/issues?category=all
// POST /api/issues/:id/share
// POST /api/issues/:id/view
```

## 5. 네비게이션 구조

### 5.1 헤더 메뉴

```typescript
// Desktop
[Logo/쿠팡아웃] | 미션 | 왜 쿠팡아웃인가?

// Mobile (햄버거 메뉴)
☰
  - 미션: 쿠팡아웃
  - 왜 쿠팡아웃인가?
  ---
  - 캠페인 소개
  - 문의
```

### 5.2 Footer

```
[로고/쿠팡아웃]

메뉴
- 미션
- 왜 쿠팡아웃인가?
- 캠페인 소개

문의
- 이메일: contact@coupang-out.com
- 제보하기

SNS
- 인스타그램: @coupangout
- 트위터: @coupangout

© 2025 쿠팡아웃 캠페인
```

## 6. 보안 요구사항

### 6.1 reCAPTCHA v3
```typescript
const token = await executeRecaptcha('upload_action')
// Server: 점수 > 0.5만 허용
```

### 6.2 Rate Limiting
```typescript
/api/mission (POST): 10분당 1회 (IP별)
/api/issues/:id/share: 1분당 10회
/api/issues/:id/view: 1분당 30회
```

### 6.3 파일 업로드 보안
```typescript
// MIME 검증 + 크기 제한 + 파일명 sanitize
// 업로드 경로: /uploads/{year}/{month}/{uuid}-{sanitized}
```

## 7. 성능 최적화

- Next.js Image (AVIF/WebP)
- React Query (5분 캐싱)
- Dynamic Import
- Edge Runtime
- CDN 캐싱 (5-10분)

## 8. SEO & 메타태그

```typescript
export const metadata = {
  metadataBase: new URL('https://coupang-out.com'),
  title: {
    default: '쿠팡아웃 - 25명의 죽음, 3,370만 개인정보 유출',
    template: '%s | 쿠팡아웃'
  },
  description: '쿠팡의 구조적 문제를 알리고 변화를 만드는 캠페인',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://coupang-out.com',
    siteName: '쿠팡아웃',
    title: '쿠팡아웃 캠페인',
    description: '노동자 25명 사망, 3,370만 개인정보 유출. 더 이상 침묵하지 않겠습니다.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coupangout',
    creator: '@coupangout',
    title: '쿠팡아웃',
    description: '쿠팡의 진실을 알려주세요',
    images: ['/twitter-image.png'],
  }
}
```

## 9. 환경 변수

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://coupang-out.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Kakao
NEXT_PUBLIC_KAKAO_JS_KEY=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## 10. 개발 일정 (7일)

### Day 1 (12/20) - 6시간
- 프로젝트 초기화
- 메인 페이지

### Day 2 (12/21) - 8시간
- Supabase 설정
- /mission 페이지 (업로드 폼)

### Day 3 (12/22) - 8시간
- /mission API + 갤러리
- reCAPTCHA + Rate limiting

### Day 4 (12/23) - 6시간
- /why 페이지 (이슈 카드)
- 공유 이미지 제작

### Day 5 (12/24) - 8시간
- 공유 모달 + 로직
- Kakao SDK

### Day 6 (12/25) - 6시간
- 모바일 반응형
- 성능 최적화

### Day 7 (12/26) - 4시간
- 배포 + 테스트

**총: 46시간**

## 11. 배포 체크리스트

```markdown
- [ ] Supabase 설정
- [ ] Vercel 환경변수
- [ ] 도메인 연결
  - [ ] coupang-out.com (메인)
  - [ ] 쿠팡아웃.com → coupang-out.com 리다이렉트
- [ ] reCAPTCHA 등록
- [ ] Kakao 앱 등록
- [ ] Upstash Redis
- [ ] OG 이미지 (17개)
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] 테스트 (모바일/크로스브라우저)
```

## 12. Cursor 프롬프트

```
Create Coupang Out (쿠팡아웃) campaign website.

Site: coupang-out.com
Also: 쿠팡아웃.com (redirect to main)

Tech: Next.js 15, TypeScript, Tailwind, Supabase, sharp, reCAPTCHA v3, Framer Motion

Pages:
1. / - Landing (Hero + Stats + Recent)
2. /mission - Upload & Gallery (Masonry + Infinite scroll)
3. /why - Issues with SNS share optimization

Key Features:
- Image upload: compression → resize → Supabase
- SNS share: Platform-specific (Instagram/Story/Twitter/Facebook/Kakao)
- Image download for Instagram (1080x1080, 1080x1920)
- Text copy for each platform
- Share count tracking
- reCAPTCHA v3 + Rate limiting

Install:
@supabase/supabase-js @tanstack/react-query browser-image-compression 
sharp framer-motion react-masonry-css @upstash/ratelimit @upstash/redis

shadcn/ui: button card dialog form input textarea tabs toast skeleton badge

Primary: #DC2626
Mobile-first, 48px buttons
```

---

이제 **쿠팡아웃** 브랜딩으로 모든 내용이 업데이트되었습니다! 🚀

- 사이트명: 쿠팡아웃
- 메인 도메인: coupang-out.com
- 한글 도메인: 쿠팡아웃.com (리다이렉트)
- 해시태그: #쿠팡아웃
- 이메일: contact@coupang-out.com
- SNS: @coupangout