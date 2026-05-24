# 🚀 종베 매매일지 배포 체크리스트

## 1️⃣ Supabase 설정 (필수)

### 데이터베이스 테이블 생성
- [ ] Supabase 대시보드 → SQL Editor 열기
- [ ] `scripts/setup_supabase.sql` 내용 복사
- [ ] 모든 SQL 실행
- [ ] 테이블이 생성되었는지 확인

### Storage 버킷 생성
- [ ] Supabase 대시보드 → Storage
- [ ] "New Bucket" 클릭
- [ ] 버킷 이름: `trade-images`
- [ ] Public: **체크 해제** (보안)
- [ ] 생성 확인

### API 키 복사
- [ ] Settings → API
- [ ] Project URL 복사 (VITE_SUPABASE_URL)
- [ ] anon public 키 복사 (VITE_SUPABASE_ANON_KEY)

---

## 2️⃣ GitHub 설정

### 레포지토리 확인
- [ ] https://github.com/weiden01/anywherethink 접속
- [ ] trade-journal 폴더가 보이는지 확인
- [ ] README, SETUP.md, DEPLOYMENT.md 파일 확인

### Secrets 추가 (필수)
GitHub Settings → Secrets and variables → Actions

필수 시크릿:
- [ ] `VITE_SUPABASE_URL` (Supabase Project URL)
- [ ] `VITE_SUPABASE_ANON_KEY` (Supabase anon key)
- [ ] `CLOUDFLARE_API_TOKEN` (Cloudflare 토큰)
- [ ] `CLOUDFLARE_ACCOUNT_ID` (Cloudflare Account ID)

상세 가이드: [GITHUB_SECRETS.md](./GITHUB_SECRETS.md)

---

## 3️⃣ 로컬 개발 테스트

```bash
cd trade-journal
npm run dev
```

- [ ] http://localhost:5173 에서 앱 열림
- [ ] "새 거래 추가" 버튼 보임
- [ ] 폼을 입력하고 제출 가능
- [ ] 에러 없이 로드됨

**문제 발생 시:**
```bash
# 환경 변수 확인
cat .env.local

# 의존성 재설치
npm install

# 캐시 삭제
rm -rf node_modules/.vite
npm run dev
```

---

## 4️⃣ Cloudflare Pages 설정

### 프로젝트 생성
- [ ] [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
- [ ] Pages → "Create a project"
- [ ] "Connect to Git" 선택
- [ ] GitHub 계정 연결
- [ ] weiden01/anywherethink 레포지토리 선택

### 배포 설정
- [ ] Project name: `trade-journal`
- [ ] Build command: `npm run build`
- [ ] Build output directory: `dist`
- [ ] Environment variables 추가:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] "Save and Deploy" 클릭

- [ ] 배포 시작 (Pages → Builds 탭)
- [ ] 배포 완료까지 대기 (보통 2-5분)
- [ ] https://trade-journal.pages.dev 에서 앱 확인

---

## 5️⃣ 기능 테스트

### 거래 추가 테스트
- [ ] "+ 새 거래 추가" 버튼 클릭
- [ ] 폼 입력:
  - 날짜: 오늘
  - 종목: "테스트종목"
  - 수익: 3000000 (300만)
  - 비중: 100000000 (1억, 기본값)
- [ ] 수익률이 3%로 표시되는지 확인
- [ ] "추가하기" 클릭
- [ ] 테이블에 새 항목 나타나는지 확인

### 사진 업로드 테스트
- [ ] 테이블의 사진 열 클릭
- [ ] 사진 파일 선택 또는 드래그
- [ ] 업로드 완료 대기
- [ ] 모달 자동 종료 확인
- [ ] 테이블에 사진 아이콘 표시 확인

### 거래 삭제 테스트
- [ ] 테이블에서 휴지통 아이콘 클릭
- [ ] 항목이 삭제되는지 확인

---

## 6️⃣ 배포 확인

### GitHub Actions 배포
- [ ] 이 체크리스트를 GitHub에 푸시
```bash
cd trade-journal
git add .
git commit -m "Add deployment checklist and setup docs"
git push origin main
```

- [ ] GitHub → Actions 탭 확인
- [ ] 배포 워크플로우 실행 중인지 확인
- [ ] 배포 완료될 때까지 대기 (2-5분)

### 배포 완료 확인
- [ ] https://trade-journal.pages.dev 에서 앱 열림
- [ ] 모든 기능이 작동하는지 확인
- [ ] 모바일에서도 확인

---

## 7️⃣ 엑셀 데이터 마이그레이션 (선택)

기존 엑셀 데이터를 웹앱으로 옮기려면:

```bash
# Python 의존성 설치
pip install supabase python-dateutil

# Supabase 환경 변수 설정
export VITE_SUPABASE_URL="your_url"
export VITE_SUPABASE_ANON_KEY="your_key"

# 마이그레이션 실행
python scripts/migrate_excel.py
```

- [ ] 마이그레이션 완료
- [ ] 웹앱에서 데이터 확인

---

## 8️⃣ 최종 확인

### 기능 완성도
- [ ] ✅ 거래 추가/수정/삭제
- [ ] ✅ 사진 업로드 (드래그&드롭)
- [ ] ✅ 수익률 자동 계산
- [ ] ✅ 모바일 반응형
- [ ] ✅ 부드러운 애니메이션
- [ ] ✅ 실시간 동기화

### 배포 상태
- [ ] ✅ GitHub에 모든 코드 저장됨
- [ ] ✅ Cloudflare Pages에서 실행 중
- [ ] ✅ 환경 변수 안전하게 설정됨
- [ ] ✅ 자동 배포 활성화

---

## 🎉 완료!

모든 체크 항목을 완료했다면 배포가 완벽하게 설정된 것입니다!

### 앞으로의 관리
- 새로운 거래 데이터는 웹앱에서 직접 입력
- GitHub push → 자동으로 Cloudflare Pages에 배포
- 언제 어디서든 https://trade-journal.pages.dev 에서 접속 가능

### 도움말
- SETUP.md: Supabase 상세 설정
- DEPLOYMENT.md: Cloudflare 배포 상세
- GITHUB_SECRETS.md: 시크릿 설정 상세
- README.md: 사용 가이드

---

**모든 설정이 완료되었으니 이제 거래를 기록하세요! 📊**
