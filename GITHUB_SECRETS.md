# GitHub Actions 시크릿 설정 가이드

## 1단계: GitHub 레포지토리 설정 페이지 열기

```
https://github.com/weiden01/anywherethink/settings/secrets/actions
```

## 2단계: 필수 시크릿 추가

### 📌 Supabase 환경 변수

#### `VITE_SUPABASE_URL`
1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. Settings → API 또는 Project settings
4. "Project URL" 복사
5. GitHub Actions → New repository secret
6. Name: `VITE_SUPABASE_URL`
7. Secret: (복사한 URL)
8. "Add secret" 클릭

**예시:**
```
https://your-project-id.supabase.co
```

#### `VITE_SUPABASE_ANON_KEY`
1. Supabase 대시보드 → Settings → API
2. "anon public" 키 복사
3. GitHub Actions → New repository secret
4. Name: `VITE_SUPABASE_ANON_KEY`
5. Secret: (복사한 키)
6. "Add secret" 클릭

---

### 🌐 Cloudflare Pages 배포 시크릿

#### `CLOUDFLARE_API_TOKEN`
1. [Cloudflare 대시보드](https://dash.cloudflare.com/) 접속
2. 우측 하단 → "My Profile" 클릭
3. "API Tokens" 탭
4. "Create Token" 클릭
5. 템플릿 선택: "Edit Cloudflare Workers"
6. 또는 커스텀 설정:
   - **Permissions:**
     - Account → Cloudflare Pages: Edit
     - User → API Tokens: Read
   - **Account Resources:** All accounts
   - **Zone Resources:** All zones

7. "Continue to summary" → "Create Token"
8. 토큰 복사
9. GitHub Actions → New repository secret
10. Name: `CLOUDFLARE_API_TOKEN`
11. Secret: (복사한 토큰)
12. "Add secret" 클릭

#### `CLOUDFLARE_ACCOUNT_ID`
1. Cloudflare 대시보드 홈
2. 우측 하단에 "Account ID:" 표시
3. ID 복사 (또는 마우스 오버하면 복사 버튼 나타남)
4. GitHub Actions → New repository secret
5. Name: `CLOUDFLARE_ACCOUNT_ID`
6. Secret: (복사한 ID)
7. "Add secret" 클릭

---

## 3단계: 시크릿 확인

GitHub Settings → Secrets and variables → Actions에서 확인:

- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ✅ `CLOUDFLARE_API_TOKEN`
- ✅ `CLOUDFLARE_ACCOUNT_ID`

모두 체크되어 있으면 배포 준비 완료!

---

## 4단계: 배포 테스트

```bash
cd trade-journal
git push origin main
```

GitHub → Actions 탭에서 배포 진행 상황 확인 가능

배포 완료 후:
```
https://trade-journal.pages.dev
```

또는 커스텀 도메인으로 접속 가능

---

## ⚠️ 보안 주의사항

- 시크릿은 절대 public하게 노출하지 마세요
- `.env.local` 파일은 절대 GitHub에 푸시하지 마세요
- API 토큰을 누군가에게 공유하지 마세요
- 정기적으로 토큰을 재생성하는 것을 권장합니다

---

## 🆘 문제 해결

### 배포 실패 - 환경 변수 오류
- 시크릿이 올바르게 설정되었는지 확인
- Supabase URL과 키가 맞는지 확인
- GitHub Actions 로그 확인

### Supabase 연결 불가
- Supabase 프로젝트가 활성화되어 있는지 확인
- API가 공개로 설정되어 있는지 확인
- 네트워크 상태 확인

### Cloudflare 배포 실패
- API 토큰 권한 확인
- Account ID가 정확한지 확인
- Cloudflare Pages 프로젝트가 생성되어 있는지 확인
