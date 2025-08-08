# 🌟 ERP Saboo Plan

화장품 제조업 통합 플랫폼 구축 프로젝트

## 📋 프로젝트 개요

ERP Saboo는 화장품 제조업을 위한 완전한 통합 플랫폼입니다. B2C + B2B, GMP 22716, ISO 9001, R&D, 공급업체 관리, 역물류까지 모든 비즈니스 프로세스를 통합 관리하는 완전한 ERP 시스템을 구축합니다.

## 🎯 주요 기능

### 🔧 시스템 모듈
- **🛒 Core ERP System** (40 tables) - 주문관리, 재고관리, 재무관리 통합 시스템
- **🧪 GMP 22716** (25 tables) - 화장품 우수제조관리기준 준수 시스템
- **🏆 ISO 9001** (30 tables) - 품질경영시스템 인증 관리
- **🔬 R&D Management** (24 tables) - 신제품 개발 및 혁신 관리 시스템
- **🤝 Supplier Portal** (20 tables) - 공급업체 관리 및 협력 시스템
- **📦 Reverse Logistics** (15 tables) - 반품 처리 및 고객 불만 관리 시스템

### 📊 총 170+ 데이터 테이블
모든 비즈니스 프로세스를 지원하는 완전한 데이터베이스 구조

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel
- **Infrastructure**: Railway
- **Project Management**: GitHub, Timetable
- **UI/UX**: Framer Motion, Lucide React, Headless UI

## 📅 구현 일정 (20주)

### Phase 1 (Week 1-4): 핵심 ERP
- 기본 ERP + B2C/B2B (60 tables)
- 통합 마스터 데이터
- 주문-재고-송장 시스템
- 기본 재무 모듈

### Phase 2 (Week 5-8): 품질 시스템
- GMP 22716 + ISO 9001 (55 tables)
- GMP 준수 모듈 구축
- ISO 9001 품질경영시스템
- 배치 생산 관리

### Phase 3 (Week 9-12): R&D + 공급업체
- R&D/NPI + 공급업체 관리 (30 tables)
- 신제품 개발 시스템
- 공급업체 포털
- 포뮬러 관리

### Phase 4 (Week 13-16): 역물류 + 규제
- 역물류 + 규제 관리 (25 tables)
- 고객 불만 처리
- 글로벌 규제 준수
- CAPA 시스템

### Phase 5 (Week 17-18): 통합 & 최적화
- 시스템 통합 및 성능 최적화
- 전체 시스템 통합 테스트
- 성능 튜닝
- 보안 강화

### Phase 6 (Week 19-20): 교육 & Go-Live
- 사용자 교육 및 실운영 시작
- 사용자 교육 프로그램
- 데이터 마이그레이션
- Go-Live 및 안정화

## 📈 기대 효과

- **95%** 전체 업무 효율성 향상
- **70%** 규제 준수 비용 절감
- **90%** 문서 작업 자동화
- **100%** 제품 추적 가능성
- **50%** 신제품 출시 시간 단축
- **80%** 고객 불만 해결 시간 단축
- **60%** 인증 유지 비용 절감
- **40%** 공급업체 관리 효율화
- **85%** 재고 최적화
- **25%** 전체 운영비용 절감

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn
- Supabase 계정
- Vercel 계정
- Railway 계정

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/erp-saboo-plan.git
cd erp-saboo-plan

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 Supabase 설정 추가

# 개발 서버 실행
npm run dev
```

### 환경 변수 설정

`.env.local` 파일에 다음 변수들을 설정하세요:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Railway Configuration
RAILWAY_TOKEN=your_railway_token_here

# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here

# GitHub Configuration
GITHUB_TOKEN=your_github_token_here
```

## 🏗️ 프로젝트 구조

```
erp-saboo-plan/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # 메인 페이지
│   │   ├── layout.tsx      # 레이아웃
│   │   └── globals.css     # 전역 스타일
│   ├── lib/                # 유틸리티 및 설정
│   │   └── supabase.ts     # Supabase 클라이언트
│   └── components/         # 재사용 가능한 컴포넌트
├── public/                 # 정적 파일
├── package.json           # 프로젝트 의존성
└── README.md             # 프로젝트 문서
```

## 📊 데이터베이스 스키마

### 주요 스키마
- **core** (8 tables) - 시스템 기반
- **ref** (5 tables) - 마스터 데이터
- **ecom** (20 tables) - B2C + B2B
- **scm** (15 tables) - 공급망 + 역물류
- **fin** (12 tables) - 재무 + 신용관리
- **hr** (4 tables) - 인사 관리
- **mfg** (15 tables) - 제조 실행
- **gmp** (25 tables) - GMP 22716
- **iso** (30 tables) - ISO 9001
- **qc** (15 tables) - 품질 실험실
- **sup** (10 tables) - 공급업체 관리
- **rd** (12 tables) - R&D + NPI
- **reg** (8 tables) - 규제 관리
- **bi** (12 tables) - BI + 분석
- **comm** (2 tables) - 이벤트 통합

## 🏆 규제 준수

- **🛒 B2C + B2B** - 이중 채널 지원
- **📊 Full ERP** - 완전한 ERP 시스템
- **🧪 GMP 22716** - 화장품 우수제조관리기준
- **🏆 ISO 9001** - 품질경영시스템
- **🔄 Reverse Logistics** - 역물류 관리
- **🔬 R&D Management** - 연구개발 관리
- **🤝 Supplier Portal** - 공급업체 포털
- **🇪🇺 Global Compliance** - 글로벌 규제 준수

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/your-username/erp-saboo-plan](https://github.com/your-username/erp-saboo-plan)

---

**ERP Saboo Plan** - 화장품 제조업의 디지털 혁신을 위한 완벽한 통합 플랫폼 🌟
