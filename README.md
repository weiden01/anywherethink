# 📈 종베 매매일지

모든 거래를 기록하고 분석하는 동적 웹앱

## 🌟 주요 기능

- ✅ **거래 기록 관리** - 날짜, 종목, 신호, 수익 등 모든 정보 저장
- ✅ **수익률 자동 계산** - 비중 대비 수익률을 자동으로 계산 (1억 기준)
- ✅ **사진 업로드** - 거래 관련 차트 사진 업로드 및 관리
- ✅ **실시간 동기화** - Supabase를 통한 모든 기기 동기화
- ✅ **모바일 지원** - 어디서든 접근 가능한 반응형 디자인
- ✅ **부드러운 애니메이션** - Framer Motion으로 구현한 동적 UI

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Animation**: Framer Motion
- **Backend**: Supabase (PostgreSQL + Storage)
- **Deployment**: Cloudflare Pages
- **Version Control**: GitHub

## 🚀 빠른 시작

### 전제 조건
- Node.js 16+
- npm 또는 yarn

### 설치

```bash
cd trade-journal
npm install
```

### 환경 설정

`.env.local` 파일을 생성하고 Supabase 자격증명을 추가합니다:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 로컬 개발

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

### 빌드

```bash
npm run build
npm run preview
```

## 📋 사용 방법

### 거래 추가

1. "+ 새 거래 추가" 버튼 클릭
2. 거래 정보 입력:
   - 날짜: 거래 날짜
   - 종목: 거래 종목명
   - 수익: 실제 수익 (원)
   - 비중: 투자 비중 (기본값: 1억)
   - 신호/이유: 거래 신호
   - 진입시점: 진입 시점
   - 추가/재추가: 추가 거래 내용
   - 차트 Q: 차트 분석 메모

3. "추가하기" 클릭

### 사진 업로드

1. 테이블에서 사진 열 클릭
2. 사진 드래그 & 드롭 또는 클릭으로 선택
3. 자동으로 업로드됨

### 거래 삭제

1. 테이블 우측의 휴지통 아이콘 클릭
2. 확인

## 📊 수익률 계산

수익률은 자동으로 계산됩니다:

```
수익률(%) = (수익금액 / 비중) × 100
```

**예시:**
- 비중: 1억원, 수익: 300만원 → **3%**
- 비중: 1억원, 수익: -350만원 → **-3.5%**
- 비중: 1억원, 수익: 5800만원 → **58%**

## 🔐 보안

- 모든 데이터는 Supabase에 암호화되어 저장됨
- 사진은 Supabase Storage에 안전하게 저장됨
- RLS(행 수준 보안)로 사용자 데이터 보호

## 📱 모바일 지원

완벽한 반응형 디자인으로 모바일에서도 모든 기능 사용 가능

## 🚀 배포

### Cloudflare Pages

1. GitHub 레포지토리 연결
2. 환경 변수 설정
3. 자동 배포 활성화

## 📚 추가 설정

자세한 설정 가이드는 [SETUP.md](./SETUP.md) 참고

## 📝 엑셀 데이터 마이그레이션

```bash
npm install supabase-py
python scripts/migrate_excel.py
```

## 🤝 기여

자유롭게 수정하고 개선해주세요!

## 📄 라이선스

MIT
