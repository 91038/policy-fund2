# Supabase 데이터베이스 설정 가이드

## 1. Supabase Dashboard 접속
https://supabase.com/dashboard 에서 프로젝트로 이동

## 2. SQL Editor에서 테이블 생성

SQL Editor 탭으로 이동 후 아래 SQL을 실행하세요:

```sql
-- 기존 테이블과 중복되지 않게 새로운 테이블명 사용
-- 기존에 applications 테이블이 있다면 삭제하지 않고 새로운 테이블로 생성

-- 정책자금 신청자 정보 테이블
CREATE TABLE IF NOT EXISTS policy_fund_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- 개인 정보
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  
  -- 사업 정보
  business_type VARCHAR(100) NOT NULL,
  company_name VARCHAR(255),
  business_registration_number VARCHAR(20),
  
  -- 자금 정보
  funding_amount VARCHAR(50) NOT NULL,
  funding_purpose TEXT,
  
  -- 추가 정보
  company_size VARCHAR(50),
  business_years INTEGER,
  annual_revenue VARCHAR(50),
  
  -- 상태 및 메타데이터
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_policy_fund_applications_created_at ON policy_fund_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_policy_fund_applications_status ON policy_fund_applications(status);
CREATE INDEX IF NOT EXISTS idx_policy_fund_applications_phone ON policy_fund_applications(phone);

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
DROP TRIGGER IF EXISTS update_policy_fund_applications_updated_at ON policy_fund_applications;
CREATE TRIGGER update_policy_fund_applications_updated_at BEFORE UPDATE ON policy_fund_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE policy_fund_applications ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (혹시 있다면)
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON policy_fund_applications;
DROP POLICY IF EXISTS "Enable read access for all users" ON policy_fund_applications;
DROP POLICY IF EXISTS "Enable insert for all users" ON policy_fund_applications;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON policy_fund_applications;
DROP POLICY IF EXISTS "Enable update for all users" ON policy_fund_applications;

-- 새로운 정책 생성
CREATE POLICY "Enable read access for all users" ON policy_fund_applications
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON policy_fund_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON policy_fund_applications
  FOR UPDATE USING (true);
```

## 3. 테이블 확인

Table Editor 탭에서 `policy_fund_applications` 테이블이 생성되었는지 확인

## 4. 테스트 데이터 삽입 (선택사항)

```sql
INSERT INTO policy_fund_applications (
  name, phone, email, business_type, company_name, 
  funding_amount, funding_purpose, company_size
) VALUES (
  '홍길동', '010-1234-5678', 'test@example.com', 
  '제조업', '테스트회사', '3천만원~5천만원', 
  '운전자금', '소기업'
);
```

## 5. 문제 해결

### 권한 오류가 발생하는 경우:
1. Authentication > Policies 메뉴 확인
2. RLS가 활성화되어 있는지 확인
3. 정책이 올바르게 설정되어 있는지 확인

### 테이블이 보이지 않는 경우:
1. Table Editor 새로고침
2. SQL Editor에서 다음 실행:
```sql
SELECT * FROM policy_fund_applications LIMIT 1;
```

## 현재 프로젝트 정보
- Project URL: https://xodlmdlcelhufeblrfqh.supabase.co
- 테이블명: policy_fund_applications

## 주의사항
- 실제 운영 시에는 RLS 정책을 더 엄격하게 설정하세요
- Service Role Key는 서버 사이드에서만 사용하세요
- 민감한 데이터는 암호화하여 저장하세요