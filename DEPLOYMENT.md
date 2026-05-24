# Cloudflare Pages 배포 가이드

## 1. GitHub에 코드 푸시

```bash
cd trade-journal
git init
git add .
git commit -m "Initial commit: Trade journal web app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trade-journal.git
git push -u origin main
```

## 2. GitHub Actions 시크릿 설정

레포지토리 → Settings → Secrets and variables → Actions:

다음 시크릿 추가:

### 필수
```
VITE_SUPABASE_URL
  값: https://your-project.supabase.co

VITE_SUPABASE_ANON_KEY
  값: (Supabase 대시보드에서 복사)
```

### Cloudflare Pages 배포용
```
CLOUDFLARE_API_TOKEN
  - Cloudflare 대시보드 → My Profile → API Tokens
  - "Create Token" → "Edit Cloudflare Workers" 템플릿 사용
  - 권한: Account, Workers, Pages 선택

CLOUDFLARE_ACCOUNT_ID
  - Cloudflare 대시보드 우측 하단에서 확인
```

## 3. Cloudflare Pages 설정

### 방법 A: GitHub 연결 (추천)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. Pages → "Create a project"
3. "Connect to Git" 선택
4. GitHub 계정 연결
5. `trade-journal` 레포지토리 선택
6. 프로젝트 이름: `trade-journal`
7. Build settings:
   - Framework preset: None
   - Build command: `npm run build`
   - Build output directory: `dist`

8. Environment variables 설정:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

9. "Save and Deploy" 클릭

### 방법 B: Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy dist --project-name trade-journal
```

## 4. 도메인 연결 (선택)

Cloudflare Pages 프로젝트 → Settings → Domains:

- `pages.dev` 서브도메인 사용 (기본)
- 또는 커스텀 도메인 연결

## 5. 확인

배포 후:
```
https://trade-journal.pages.dev
```

또는 커스텀 도메인으로 접속 가능

## 6. 자동 배포

- GitHub main 브랜치에 push → 자동으로 배포됨
- PR 생성 → Preview URL 자동 생성

## 문제 해결

### 빌드 실패
- GitHub Actions 로그 확인
- 환경 변수가 올바르게 설정되었는지 확인
- `npm run build` 로컬에서 테스트

### Supabase 연결 실패
- VITE_SUPABASE_URL과 KEY가 올바른지 확인
- Supabase 대시보드에서 프로젝트 활성화 확인
- RLS 정책 설정 확인

### 사진 업로드 불가
- Supabase Storage 버킷 생성 확인
- RLS 정책 설정 확인 (public: false)
- 파일 크기 제한 확인 (기본 25MB)
