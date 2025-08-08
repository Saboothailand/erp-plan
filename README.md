# 🌟 화장품 제조업 통합 플랫폼

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cosmetic-manufacturing-platform)
[![Supabase](https://img.shields.io/badge/Powered%20by-Supabase-green)](https://supabase.com)

170개 이상의 테이블을 가진 완전 통합된 화장품 제조업 관리 시스템

## 🚀 주요 기능

### 📊 Core ERP System (40개 테이블)
- 💰 영업관리 - 주문, 견적, 계약 관리
- 🛒 구매관리 - 발주, 입고, 공급업체 관리  
- 📦 재고관리 - 재고 추적, 자동 발주
- 💳 재무관리 - 회계, 결산, 자금 관리
- 👥 인사관리 - 직원, 급여, 근태 관리
- 🤝 고객관리 - CRM, 고객 서비스

### 🧪 GMP 22716 (25개 테이블)
- 🏭 생산관리 - 제조 계획 및 실행
- 📊 배치관리 - 배치 추적 및 기록
- 🧴 원자재관리 - 원료 입고 및 품질 관리
- ⚙️ 설비관리 - 장비 유지보수 및 검증
- 🧽 위생관리 - 청소 및 위생 기준 준수
- 📋 문서관리 - SOP 및 기록 관리

### 🏆 ISO 9001 (30개 테이블)
- 📊 품질경영 - 품질 방침 및 목표 관리
- 🔍 내부감사 - 정기 감사 및 개선 사항
- 🔧 시정예방조치 - CAPA 시스템
- 👔 경영검토 - 경영진 검토 회의
- 📚 교육훈련 - 직원 교육 및 자격 관리
- 📈 성과측정 - KPI 및 성과 지표

### 🔬 R&D Management (24개 테이블)
- 🧪 제형개발 - 신제품 포뮬러 개발
- ⏱️ 안정성시험 - 제품 안정성 평가
- ✨ 효능시험 - 제품 효능 검증
- 🚀 신제품출시 - NPI 프로세스
- ⚖️ 특허관리 - 지적재산권 관리
- 🔄 제품수명 - PLM 시스템

### 🤝 Supplier Portal (20개 테이블)
- 🏢 업체관리 - 공급업체 마스터 데이터
- ✅ 자격심사 - 공급업체 평가 및 승인
- 📊 성과평가 - 공급업체 성과 모니터링
- 📝 계약관리 - 계약 체결 및 갱신
- 🌐 협력포털 - 온라인 협력 시스템
- 💰 결제관리 - 대금 지급 및 정산

### 📦 Reverse Logistics (15개 테이블)
- 📦 반품처리 - 제품 반품 및 교환
- 📞 고객불만 - 컴플레인 접수 및 처리
- 🔍 품질조사 - 품질 이슈 조사
- 🚨 제품회수 - 리콜 관리
- 💰 고객보상 - 손해 배상 및 보상
- 🗑️ 폐기관리 - 제품 폐기 및 처리

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Deployment**: Vercel
- **Database**: PostgreSQL with 170+ tables across 15 schemas
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for file uploads
- **Real-time**: Supabase Realtime for live updates

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/cosmetic-manufacturing-platform.git
cd cosmetic-manufacturing-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
cp .env.example .env.local
# .env.local 파일에 Supabase 키 입력
```

### 4. 로컬 개발 서버 실행
```bash
npm run dev
```

### 5. Vercel로 배포
```bash
npm run deploy
```

## 🗄️ 데이터베이스 스키마

### 스키마 구조
```
├── core (8 tables)     - 시스템 기본 설정
├── ref (5 tables)      - 마스터 데이터
├── ecom (20 tables)    - B2C + B2B 전자상거래
├── scm (15 tables)     - 공급망 관리 + 역물류
├── fin (12 tables)     - 재무 관리
├── hr (4 tables)       - 인사 관리
├── mfg (15 tables)     - 제조 실행 시스템
├── gmp (25 tables)     - GMP 22716 준수
├── iso (30 tables)     - ISO 9001 품질 경영
├── qc (15 tables)      - 품질 실험실
├── sup (20 tables)     - 공급업체 관리
├── rd (24 tables)      - R&D + NPI
├── reg (20 tables)     - 규제 관리
├── bi (15 tables)      - BI + 분석
└── comm (2 tables)     - 이벤트 통합
```

## 🚀 배포 방법

### Vercel 배포
1. Vercel 계정 생성 및 GitHub 연동
2. 프로젝트 import
3. 환경 변수 설정
4. 자동 배포 완료

### Supabase 설정
1. Supabase 프로젝트 생성
2. SQL 에디터에서 스키마 실행
3. API 키 및 URL 복사
4. Vercel 환경 변수에 추가

## 📈 예상 효과

- 📊 **95%** 업무 효율성 개선
- 💰 **70%** 규제 준수 비용 절감
- 🤖 **90%** 문서 작업 자동화
- 🔍 **100%** 제품 추적 가능성
- 🚀 **50%** 신제품 출시 기간 단축
- 📞 **80%** 고객 불만 처리 시간 단축

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🔗 링크

- [Live Demo](https://cosmetic-platform.vercel.app)
- [Supabase Dashboard](https://app.supabase.com/project/your-project)
- [Documentation](https://github.com/yourusername/cosmetic-manufacturing-platform/wiki)
- [Issues](https://github.com/yourusername/cosmetic-manufacturing-platform/issues)

## 📞 지원

문의사항이나 지원이 필요한 경우:
- 📧 Email: support@yourcompany.com
- 🐛 Issues: [GitHub Issues](http