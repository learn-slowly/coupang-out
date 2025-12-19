# 쿠팡 탈퇴 캠페인 웹사이트 PRD

## 1. 프로젝트 개요

**목적**: 쿠팡의 구조적 문제를 알리고, 탈퇴 인증 및 피해사례를 수집하는 캠페인 사이트

**타겟**: 모바일 사용자 우선 (70% 이상 모바일 트래픽 예상)

**핵심 가치**: 
- 명확한 팩트 전달
- 쉬운 참여 (2탭 이내로 액션 완료)
- 바이럴 최적화 (SNS 공유)

## 2. 기술 스택

```yaml
Frontend:
  - Next.js 15.1 (App Router)
  - TypeScript
  - Tailwind CSS 4.0
  - shadcn/ui (latest)
  - Framer Motion (애니메이션)

Backend:
  - Supabase (PostgreSQL, Storage, Auth)

Image Processing:
  - sharp (서버사이드 리사이징)
  - Client: browser-image-compression (업로드 전 압축)

Security:
  - reCAPTCHA v3
  - Rate limiting (Vercel Edge)

Analytics:
  - Vercel Analytics
  - Plausible (GDPR 준수 선택사항)

Deployment:
  - Vercel
  - CDN: Vercel Edge Network
```

## 3. 사이트 구조

```
/                    → 메인 페이지 (랜딩)
/issues              → 문제점 정리
/unsubscribe         → 탈퇴 인증
/reports             → 피해사례
/action              → 행동하기
/about               → 캠페인 소개
```

## 4. 페이지별 상세 요구사항

### 4.1 메인 페이지 (/)

**레이아웃 (모바일 우선)**

```typescript
// 섹션 구성
1. Hero Section
   - 임팩트 헤드라인: "쿠팡의 진실"
   - 서브헤드: "25명의 죽음, 3,370만 개인정보 유출"
   - CTA: "문제점 보기" (스크롤 다운)
   
2. Stats Section (4개 카드)
   - 산재율 10배
   - 노동자 25명 사망
   - 3,370만 개인정보 유출
   - 주 72시간 노동
   - 각 카드: 큰 숫자 + 짧은 설명 + 출처 링크
   
3. Quick Actions (3개 버튼)
   - "탈퇴 인증하기" → /unsubscribe
   - "피해 제보하기" → /reports
   - "공유하기" → SNS 공유 모달
   
4. Recent Activities
   - 최근 탈퇴 인증 3개 (썸네일)
   - "더 보기" → /unsubscribe
   
5. Footer
   - 연대 단체 링크
   - 문의
```

**디자인 스펙 (모바일 기준)**
```css
/* 컬러 스킴 */
Primary: #DC2626 (Red-600) /* 경고, 위험 */
Secondary: #1F2937 (Gray-800) /* 텍스트 */
Accent: #FCD34D (Yellow-300) /* 하이라이트 */
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
Button Height: 48px (터치 영역 확보)

/* 애니메이션 */
Fade-in on scroll (Framer Motion)
Stagger children: 0.1s delay
```

### 4.2 문제점 정리 (/issues)

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
  description: string
  facts: string[]        // 팩트 리스트
  sources: Source[]      // 출처
  shareImage: string     // SNS 공유용 이미지 (1080x1080)
}
```

**기능**
- 카테고리 필터 (탭)
- 각 이슈 카드:
  - 제목 + 요약
  - "더 보기" 펼치기
  - "공유하기" 버튼 (이미지 다운로드 + SNS 공유)
- 전체 이슈 PDF 다운로드 버튼

**SNS 공유 기능**
```typescript
// 공유 시 동작
1. 이미지 자동 생성 (캔버스 API 또는 미리 만든 이미지)
2. 공유 텍스트 자동 생성:
   "쿠팡의 {카테고리} 문제를 알고 계신가요? 
   {핵심 팩트}
   #쿠팡탈퇴 #쿠팡불매
   {사이트 URL}/issues"
3. 클립보드 복사 + 공유 UI
```

### 4.3 탈퇴 인증 (/unsubscribe)

**레이아웃**
```typescript
1. 탈퇴 가이드
   - 6단계→2단계 변경 안내
   - 스크린샷 예시
   
2. 업로드 폼
   - 이미지 업로드 (드래그앤드롭)
   - 소감 입력 (선택, 최대 200자)
   - reCAPTCHA v3 (백그라운드)
   - "인증 완료" 버튼
   
3. 참여 현황
   - 실시간 카운터: "○○○명 참여"
   - 애니메이션: 숫자 증가
   
4. 인증샷 갤러리
   - 무한 스크롤 (또는 페이지네이션)
   - 모자이크 레이아웃 (Masonry)
   - 이미지 클릭 → 모달 (확대 + 소감)
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
5. 파일 타입 검증 (MIME)
6. 파일 크기 제한 (5MB)
7. reCAPTCHA 점수 확인 (>0.5)
```

**데이터 모델**
```sql
CREATE TABLE unsubscribe_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  comment TEXT,
  ip_hash TEXT,  -- 중복 제출 방지
  recaptcha_score FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT TRUE,  -- 추후 검토 기능
  
  INDEX idx_created_at DESC,
  INDEX idx_is_approved WHERE is_approved = TRUE
);
```

### 4.4 피해사례 제보 (/reports)

**제보 폼**
```typescript
interface DamageReport {
  category: 
    | 'overwork'      // 과로
    | 'injury'        // 산재
    | 'privacy'       // 개인정보
    | 'unfair'        // 갑질
    | 'other'         // 기타
  
  description: string       // 최대 1000자
  isAnonymous: boolean      // 익명 여부
  contactEmail?: string     // 실명 시에만
  attachments?: File[]      // 증빙 자료 (선택)
}
```

**기능**
- 카테고리 선택
- 상세 설명 입력 (리치 텍스트 에디터 - Tiptap 또는 Quill)
- 익명/실명 토글
- 파일 첨부 (최대 3개, 각 5MB)
- reCAPTCHA v3
- 제출 후 → 감사 메시지 + 공유 유도

**데이터 모델**
```sql
CREATE TABLE damage_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE,
  contact_email TEXT,
  ip_hash TEXT,
  recaptcha_score FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT FALSE,  -- 검토 후 공개
  admin_notes TEXT,
  
  INDEX idx_created_at DESC,
  INDEX idx_category,
  INDEX idx_is_published WHERE is_published = TRUE
);

CREATE TABLE report_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES damage_reports(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**피해사례 표시**
```typescript
// 공개된 피해사례 목록
- 카테고리 필터
- 시간순 정렬
- 카드 레이아웃:
  - 카테고리 뱃지
  - 날짜
  - 설명 (요약, "더 보기")
  - 익명/실명 표시
```

### 4.5 행동하기 (/action)

**콘텐츠**
```typescript
1. 대안 서비스
   - 쿠팡 대신 쓸 수 있는 서비스 목록
   - 마켓컬리, 네이버쇼핑, SSG, 오아시스마켓 등
   - 각 서비스 특징 + 링크
   
2. 법적 대응
   - 집단소송 참여 링크
   - 과징금 청원 링크
   
3. 연대 활동
   - 택배노조 후원
   - 시민단체 연대
   
4. SNS 액션
   - 해시태그 캠페인
   - 공유용 이미지팩 다운로드
```

## 5. API 설계

### 5.1 인증샷 업로드

```typescript
// POST /api/unsubscribe
interface UploadRequest {
  image: File
  comment?: string
  recaptchaToken: string
}

interface UploadResponse {
  success: boolean
  postId: string
  error?: string
}

// 처리 순서
1. reCAPTCHA 검증
2. Rate limiting 체크 (IP별 10분당 1회)
3. 이미지 압축 및 리사이징
4. Supabase Storage 업로드
5. DB 레코드 생성
6. 성공 응답
```

### 5.2 인증샷 조회

```typescript
// GET /api/unsubscribe?page=1&limit=20
interface ListResponse {
  posts: UnsubscribePost[]
  total: number
  hasMore: boolean
}

// 최적화
- DB 쿼리: WHERE is_approved = TRUE
- ORDER BY created_at DESC
- 페이지네이션
- CDN 캐싱 (10분)
```

### 5.3 피해사례 제보

```typescript
// POST /api/reports
interface ReportRequest {
  category: string
  description: string
  isAnonymous: boolean
  contactEmail?: string
  attachments?: File[]
  recaptchaToken: string
}

// 처리
1. reCAPTCHA 검증
2. Rate limiting (IP별 1시간당 3회)
3. 파일 업로드
4. DB 저장 (is_published = false)
5. 관리자 알림 (이메일 또는 슬랙)
```

### 5.4 통계

```typescript
// GET /api/stats
interface StatsResponse {
  totalUnsubscribes: number
  totalReports: number
  recentActivity: {
    last24h: number
    last7d: number
  }
}

// 캐싱: 5분
```

## 6. 보안 요구사항

### 6.1 reCAPTCHA v3 구현

```typescript
// Client
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

// Form submit 시
const { executeRecaptcha } = useGoogleReCaptcha()
const token = await executeRecaptcha('upload_action')

// Server
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  body: JSON.stringify({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token
  })
})

// Score > 0.5 만 허용
if (score < 0.5) {
  return { error: 'Please try again' }
}
```

### 6.2 Rate Limiting

```typescript
// Vercel Edge Middleware
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 m'), // 10 requests per 10 minutes
  analytics: true
})

// 또는 간단하게 Supabase에 IP 해시 저장 후 체크
```

### 6.3 파일 업로드 보안

```typescript
// 허용 MIME 타입
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// 파일 크기 제한
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

// 파일명 sanitize
const sanitizeFilename = (filename: string) => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .substring(0, 100)
}

// 업로드 경로 구조
// /uploads/{year}/{month}/{uuid}-{sanitized-filename}
```

## 7. 성능 최적화

### 7.1 이미지 최적화

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-supabase-project.supabase.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
}

// 컴포넌트
<Image
  src={post.thumbnail_url}
  alt="탈퇴 인증"
  width={400}
  height={400}
  loading="lazy"
  placeholder="blur"
/>
```

### 7.2 데이터 로딩

```typescript
// React Query 사용
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['unsubscribe'],
  queryFn: ({ pageParam = 1 }) => 
    fetch(`/api/unsubscribe?page=${pageParam}`),
  getNextPageParam: (lastPage) => 
    lastPage.hasMore ? lastPage.page + 1 : undefined,
  staleTime: 5 * 60 * 1000, // 5분
})

// Intersection Observer로 무한 스크롤
```

### 7.3 빌드 최적화

```typescript
// Dynamic Import (코드 스플리팅)
const ImageUploader = dynamic(() => import('@/components/ImageUploader'), {
  loading: () => <Skeleton />,
  ssr: false
})

// Edge Runtime for API routes
export const runtime = 'edge'
```

## 8. 디자인 시스템

### 8.1 컴포넌트 라이브러리

```bash
# shadcn/ui components 설치
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add skeleton
```

### 8.2 모바일 우선 브레이크포인트

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile Large
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Desktop Large
    },
  },
}

// 사용 예시
<div className="p-4 sm:p-6 md:p-8 lg:p-12">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    Title
  </h1>
</div>
```

### 8.3 터치 최적화

```css
/* 최소 터치 영역 */
.touch-target {
  min-height: 48px;
  min-width: 48px;
}

/* 버튼 active 상태 */
.button:active {
  transform: scale(0.98);
  transition: transform 0.1s;
}

/* 스크롤 스냅 (갤러리용) */
.gallery {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
```

## 9. 환경 변수

```bash
# .env.local
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Upstash Redis (Rate Limiting, 선택)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Email (알림용, 선택)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
ADMIN_EMAIL=
```

## 10. 배포 체크리스트

```markdown
- [ ] 환경 변수 설정 (Vercel)
- [ ] Supabase Row Level Security (RLS) 설정
- [ ] reCAPTCHA 도메인 등록
- [ ] OG 이미지 생성 (/public/og-image.png)
- [ ] robots.txt 설정
- [ ] sitemap.xml 생성
- [ ] Google Analytics / Plausible 연동
- [ ] 에러 모니터링 (Sentry, 선택)
- [ ] SSL 인증서 (Vercel 자동)
- [ ] 커스텀 도메인 연결 (선택)
- [ ] 성능 테스트 (Lighthouse)
- [ ] 모바일 테스트 (실제 디바이스)
```

## 11. 개발 우선순위

**Phase 1 (MVP - 3일)**
- [ ] 프로젝트 초기화
- [ ] 메인 페이지
- [ ] 문제점 정리 페이지 (정적)
- [ ] 기본 디자인 시스템

**Phase 2 (핵심 기능 - 3일)**
- [ ] Supabase 설정
- [ ] 탈퇴 인증 업로드
- [ ] 갤러리 표시
- [ ] reCAPTCHA 연동

**Phase 3 (추가 기능 - 2일)**
- [ ] 피해사례 제보
- [ ] 이미지 리사이징
- [ ] Rate limiting
- [ ] SNS 공유 최적화

**Phase 4 (마무리 - 1일)**
- [ ] 모바일 반응형 체크
- [ ] 성능 최적화
- [ ] 배포
- [ ] 모니터링 설정

---

## 12. Cursor용 초기 프롬프트

```
Create a Next.js 15 project for a Coupang boycott campaign website with:

Tech Stack:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4.0
- shadcn/ui
- Supabase (PostgreSQL + Storage)
- sharp for image processing
- browser-image-compression
- reCAPTCHA v3
- Framer Motion

Requirements:
1. Mobile-first responsive design
2. Dark red (#DC2626) primary color theme
3. Image upload with compression and thumbnail generation
4. Rate limiting on API routes
5. reCAPTCHA v3 on all forms
6. Infinite scroll for gallery
7. SEO optimized with proper meta tags

Project structure:
- app/page.tsx (landing)
- app/issues/page.tsx (static content)
- app/unsubscribe/page.tsx (image upload + gallery)
- app/reports/page.tsx (damage report form)
- app/action/page.tsx (static content)

Install shadcn/ui components: button, card, dialog, form, input, textarea, tabs, toast, skeleton

Set up Supabase tables:
1. unsubscribe_posts (id, image_url, thumbnail_url, comment, created_at)
2. damage_reports (id, category, description, is_anonymous, contact_email, created_at)

All buttons must be at least 48px tall for touch optimization.
Use proper TypeScript types for all data structures.
```

이 PRD로 Cursor와 작업하시면 됩니다! 추가로 필요한 스펙이나 수정사항 있으면 말씀해주세요.