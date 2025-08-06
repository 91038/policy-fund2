-- 정책자금 신청자 정보 테이블 (기존 테이블과 구분)
CREATE TABLE IF NOT EXISTS policy_fund_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- 개인 정보
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  
  -- 사업 정보
  business_type VARCHAR(100) NOT NULL, -- 업종
  company_name VARCHAR(255),
  business_registration_number VARCHAR(20), -- 사업자등록번호
  
  -- 자금 정보
  funding_amount VARCHAR(50) NOT NULL, -- 희망자금금액
  funding_purpose TEXT, -- 자금용도
  
  -- 추가 정보
  company_size VARCHAR(50), -- 기업규모 (소상공인, 중소기업 등)
  business_years INTEGER, -- 사업년수
  annual_revenue VARCHAR(50), -- 연매출
  
  -- 상태 및 메타데이터
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, completed, rejected
  notes TEXT, -- 관리자 메모
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 인덱스 생성
CREATE INDEX idx_policy_fund_applications_created_at ON policy_fund_applications(created_at DESC);
CREATE INDEX idx_policy_fund_applications_status ON policy_fund_applications(status);
CREATE INDEX idx_policy_fund_applications_phone ON policy_fund_applications(phone);

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_policy_fund_applications_updated_at BEFORE UPDATE ON policy_fund_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE policy_fund_applications ENABLE ROW LEVEL SECURITY;

-- 정책 생성 (모든 사용자가 조회 가능 - 관리자 페이지용)
CREATE POLICY "Enable read access for all users" ON policy_fund_applications
  FOR SELECT USING (true);

-- 정책 생성 (누구나 삽입 가능 - 신청폼 제출용)
CREATE POLICY "Enable insert for all users" ON policy_fund_applications
  FOR INSERT WITH CHECK (true);

-- 정책 생성 (모든 사용자가 업데이트 가능 - 관리자 페이지용)
CREATE POLICY "Enable update for all users" ON policy_fund_applications
  FOR UPDATE USING (true);