# 🚀 ERP Saboo Plan 배포 가이드

이 문서는 ERP Saboo Plan 프로젝트를 Railway, Vercel, GitHub, Supabase를 사용하여 배포하는 방법을 설명합니다.

## 📋 사전 준비사항

### 1. 계정 생성
- [GitHub](https://github.com) 계정
- [Vercel](https://vercel.com) 계정
- [Railway](https://railway.app) 계정
- [Supabase](https://supabase.com) 계정

### 2. 필요한 도구
- Node.js 18+
- Git
- 코드 에디터 (VS Code 권장)

## 🔧 1단계: Supabase 설정

### 1.1 Supabase 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름: `erp-saboo-plan`
4. 데이터베이스 비밀번호 설정
5. 지역 선택 (가까운 지역 권장)

### 1.2 환경 변수 설정
프로젝트 설정에서 다음 정보를 복사:
- Project URL
- anon/public key

## 🌐 2단계: Vercel 배포

### 2.1 Vercel 프로젝트 생성
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 설정:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2.2 환경 변수 설정
Vercel 프로젝트 설정에서 다음 환경 변수 추가:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2.3 Vercel 토큰 생성
1. Vercel 계정 설정 → Tokens
2. "Create Token" 클릭
3. 토큰 이름: `erp-saboo-plan-deploy`
4. 토큰 복사 (나중에 GitHub Secrets에 사용)

## 🚂 3단계: Railway 배포

### 3.1 Railway 프로젝트 생성
1. [Railway Dashboard](https://railway.app/dashboard)에 로그인
2. "New Project" 클릭
3. "Deploy from GitHub repo" 선택
4. GitHub 저장소 연결

### 3.2 Railway 설정
1. 프로젝트 설정에서 다음 환경 변수 추가:
```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3.3 Railway 토큰 생성
1. Railway 계정 설정 → Tokens
2. "Create Token" 클릭
3. 토큰 복사 (나중에 GitHub Secrets에 사용)

## 🔗 4단계: GitHub 설정

### 4.1 저장소 생성
1. GitHub에서 새 저장소 생성: `erp-saboo-plan`
2. 로컬 저장소를 GitHub에 푸시:
```bash
git remote add origin https://github.com/your-username/erp-saboo-plan.git
git branch -M main
git push -u origin main
```

### 4.2 GitHub Secrets 설정
저장소 설정 → Secrets and variables → Actions에서 다음 secrets 추가:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
RAILWAY_TOKEN=your_railway_token
RAILWAY_SERVICE_NAME=erp-saboo-plan
```

### 4.3 Vercel 프로젝트 ID 확인
Vercel 프로젝트 설정에서 Project ID와 Org ID를 찾아서 GitHub Secrets에 추가

## 🔄 5단계: 자동 배포 설정

### 5.1 GitHub Actions 활성화
1. GitHub 저장소 → Actions 탭
2. "Deploy ERP Saboo Plan" 워크플로우 활성화
3. main 브랜치에 푸시하면 자동 배포 시작

### 5.2 배포 확인
- Vercel: `https://your-project.vercel.app`
- Railway: `https://your-project.railway.app`

## 📊 6단계: 모니터링 설정

### 6.1 Vercel Analytics
1. Vercel 프로젝트 → Analytics
2. Web Analytics 활성화
3. 성능 모니터링 설정

### 6.2 Railway Monitoring
1. Railway 프로젝트 → Metrics
2. 로그 및 성능 모니터링 확인

## 🛠️ 7단계: 개발 워크플로우

### 7.1 로컬 개발
```bash
# 저장소 클론
git clone https://github.com/your-username/erp-saboo-plan.git
cd erp-saboo-plan

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 실제 값 입력

# 개발 서버 실행
npm run dev
```

### 7.2 배포 프로세스
1. 로컬에서 개발 및 테스트
2. 변경사항을 GitHub에 푸시
3. GitHub Actions가 자동으로 테스트 및 배포
4. Vercel과 Railway에 동시 배포

## 🔒 8단계: 보안 설정

### 8.1 환경 변수 보안
- 민감한 정보는 절대 코드에 하드코딩하지 않음
- 모든 환경 변수는 GitHub Secrets 사용
- 프로덕션과 개발 환경 분리

### 8.2 도메인 설정
1. Vercel에서 커스텀 도메인 설정
2. SSL 인증서 자동 발급
3. DNS 설정 확인

## 📈 9단계: 성능 최적화

### 9.1 빌드 최적화
- Next.js 이미지 최적화 사용
- 코드 스플리팅 확인
- 번들 크기 모니터링

### 9.2 데이터베이스 최적화
- Supabase 인덱스 설정
- 쿼리 성능 모니터링
- 연결 풀 설정

## 🚨 10단계: 문제 해결

### 10.1 일반적인 문제
1. **빌드 실패**: 환경 변수 확인
2. **배포 실패**: GitHub Secrets 확인
3. **데이터베이스 연결 실패**: Supabase 설정 확인

### 10.2 로그 확인
- Vercel: Functions → Logs
- Railway: Deployments → Logs
- GitHub Actions: Actions 탭

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. [GitHub Issues](https://github.com/your-username/erp-saboo-plan/issues)
2. [Vercel Documentation](https://vercel.com/docs)
3. [Railway Documentation](https://docs.railway.app)
4. [Supabase Documentation](https://supabase.com/docs)

---

**ERP Saboo Plan** - 성공적인 배포를 위한 완벽한 가이드 🌟 