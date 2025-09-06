# 🌟 ERP Saboo Plan - 화장품 제조업 통합 플랫폼

완전한 화장품 제조업 ERP 시스템 구축 프로젝트입니다. B2C + B2B, GMP 22716, ISO 9001, R&D, 공급업체 관리, 역물류까지 모든 비즈니스 프로세스를 통합 관리하는 현대적인 플랫폼입니다.

## 🚀 주요 기능

### 📊 핵심 모듈
- **🛒 Core ERP System**: 주문관리, 재고관리, 재무관리 통합 시스템
- **🧪 GMP 22716**: 화장품 우수제조관리기준 준수 시스템
- **🏆 ISO 9001**: 품질경영시스템 인증 관리
- **🔬 R&D Management**: 신제품 개발 및 혁신 관리 시스템
- **🤝 Supplier Portal**: 공급업체 관리 및 협력 시스템
- **📦 Reverse Logistics**: 반품 처리 및 고객 불만 관리 시스템

### 🌐 다국어 지원
- 🇰🇷 한국어 (기본)
- 🇺🇸 English
- 🇹🇭 ภาษาไทย

### 🛒 Shopify 연동
- 기존 Shopify 쇼핑몰과 실시간 연동
- Webhook 및 REST API를 통한 데이터 동기화
- 재고 관리 자동화
- 주문 처리 효율 90% 향상

## 🛠️ 기술 스택

### Frontend
- **Next.js 15** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 모던 UI 디자인
- **Framer Motion** - 부드러운 애니메이션
- **Recharts** - 데이터 시각화

### Backend & Database
- **Supabase** - PostgreSQL 기반 백엔드
- **Next.js API Routes** - 서버리스 API
- **Next-intl** - 국제화 지원

### Deployment
- **Vercel** - 프론트엔드 배포
- **Railway** - 백엔드 인프라
- **GitHub** - 버전 관리

## 📈 프로젝트 통계

- **총 데이터 테이블**: 170+
- **주요 모듈**: 6개
- **구현 일정**: 20주
- **언어 지원**: 3개국어
- **현재 진행률**: 15%

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn
- Git

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/your-username/erp-saboo-plan.git
cd erp-saboo-plan
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
```

3. **환경 변수 설정**
```bash
cp .env.example .env.local
```

`.env.local` 파일에 다음 환경 변수를 설정하세요:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
```

5. **브라우저에서 확인**
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
erp-saboo-plan/
├── src/
│   ├── app/
│   │   ├── [locale]/           # 다국어 라우팅
│   │   │   ├── page.tsx        # 메인 페이지
│   │   │   ├── shopify/        # Shopify 연동 페이지
│   │   │   └── layout.tsx      # 레이아웃
│   │   ├── globals.css         # 전역 스타일
│   │   └── layout.tsx          # 루트 레이아웃
│   ├── components/             # 재사용 컴포넌트
│   │   ├── Dashboard.tsx       # 대시보드
│   │   ├── ModuleCard.tsx      # 모듈 카드
│   │   ├── ProgressCard.tsx    # 진행률 카드
│   │   └── LanguageSelector.tsx # 언어 선택기
│   ├── i18n/                   # 국제화
│   │   ├── config.ts           # 설정
│   │   └── locales/            # 번역 파일
│   │       ├── ko.json         # 한국어
│   │       ├── en.json         # 영어
│   │       └── th.json         # 태국어
│   └── lib/
│       └── supabase.ts         # Supabase 클라이언트
├── public/                     # 정적 파일
├── package.json
└── README.md
```

## 📊 구현 일정 (20주)

### Phase 1: 핵심 ERP (Week 1-4)
- 통합 마스터 데이터
- 주문-재고-송장 시스템
- 기본 재무 모듈

### Phase 2: 품질 시스템 (Week 5-8)
- GMP 준수 모듈 구축
- ISO 9001 품질경영시스템
- 배치 생산 관리

### Phase 3: R&D + 공급업체 (Week 9-12)
- 신제품 개발 시스템
- 공급업체 포털
- 포뮬러 관리

### Phase 4: 역물류 + 규제 (Week 13-16)
- 고객 불만 처리
- 글로벌 규제 준수
- CAPA 시스템

### Phase 5: 통합 & 최적화 (Week 17-18)
- 전체 시스템 통합 테스트
- 성능 튜닝
- 보안 강화

### Phase 6: 교육 & Go-Live (Week 19-20)
- 사용자 교육 프로그램
- 데이터 마이그레이션
- Go-Live 및 안정화

## 🎯 기대 효과

- **전체 업무 효율성**: 95% 향상
- **규제 준수 비용**: 70% 절감
- **문서 작업 자동화**: 90% 달성
- **제품 추적 가능성**: 100% 보장
- **신제품 출시 시간**: 50% 단축
- **고객 불만 해결 시간**: 80% 단축
- **인증 유지 비용**: 60% 절감
- **공급업체 관리 효율화**: 40% 향상
- **재고 최적화**: 85% 달성
- **전체 운영비용**: 25% 절감

## 🛒 Shopify 연동 전략

### 현재 상황
- 기존 Shopify 쇼핑몰 안정적 운영
- 신규 ERP 시스템 구축 진행

### 연동 목표
기존 Shopify 쇼핑몰과 신규 ERP 시스템의 완전한 실시간 연동을 통한 업무 효율성 극대화

### 연동 방식
- **Webhook (Shopify → ERP)**: 주문 정보 실시간 전송
- **REST API (ERP → Shopify)**: 재고 정보 실시간 업데이트

### 예상 비용
- **연동 개발비**: $15,000
- **인프라 비용**: $500/월
- **유지보수비**: $1,000/월

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **프로젝트 관리자**: ERP Saboo Team
- **이메일**: contact@erp-saboo.com
- **웹사이트**: https://erp-saboo.com

## 🙏 감사의 말

이 프로젝트는 다음과 같은 오픈소스 프로젝트들의 도움을 받았습니다:

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---

**🌟 ERP Saboo Plan** - 화장품 제조업의 미래를 만들어갑니다.
