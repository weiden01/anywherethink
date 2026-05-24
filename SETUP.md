# 종베 매매일지 웹앱 설정 가이드

## 1. Supabase 설정

### 1.1 테이블 생성

Supabase의 SQL Editor에서 다음 SQL을 실행합니다:

```sql
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE,
  company TEXT NOT NULL,
  signal_detail TEXT,
  target_price TEXT,
  profit_loss DECIMAL(15,2),
  entry_time TEXT,
  first_action TEXT,
  second_action TEXT,
  query_notes TEXT,
  investment DECIMAL(15,2) DEFAULT 10000000,
  profit_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    (profit_loss / investment) * 100
  ) STORED,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 인덱스 생성
CREATE INDEX trades_date_idx ON trades(date DESC);
CREATE INDEX trades_company_idx ON trades(company);
```

### 1.2 Storage 버킷 생성

1. Supabase 대시보드 → Storage
2. "New Bucket" 클릭
3. 버킷 이름: `trade-images`
4. Public: 체크 해제 (RLS로 보안 관리)

### 1.3 RLS 정책 설정

Storage의 RLS 정책:
- `SELECT`: 인증된 사용자만 가능
- `INSERT`: 인증된 사용자만 가능
- `DELETE`: 소유자만 가능

## 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음을 추가합니다:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Supabase 대시보드 → Settings → API에서 값을 복사합니다.

## 3. GitHub Actions 시크릿 설정

GitHub 레포지토리 → Settings → Secrets and variables → Actions:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

## 4. 로컬 개발

```bash
cd trade-journal
npm install
npm run dev
```

브라우저: `http://localhost:5173`

## 5. 빌드 및 배포

```bash
npm run build
npm run preview
```

Cloudflare Pages에 연결하면 자동 배포됩니다.

## 6. 엑셀 데이터 마이그레이션

엑셀 파일에서 Supabase로 데이터를 옮기려면:

```bash
python scripts/migrate_excel.py
```

(마이그레이션 스크립트는 별도로 제공)

## 참고

- 수익률은 자동 계산됨 (profit_loss / investment * 100)
- 모든 사진은 Supabase Storage에 저장됨
- 데이터는 날짜 역순으로 정렬됨
