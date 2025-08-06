# 정책자금 랜딩 페이지 설정 가이드

## 🚀 빠른 시작

### 1. Supabase 설정

1. [Supabase](https://supabase.com) 접속 후 회원가입/로그인
2. "New Project" 클릭하여 새 프로젝트 생성
3. 프로젝트 생성 완료 후 SQL Editor 탭으로 이동
4. `supabase-schema.sql` 파일의 내용을 복사하여 실행
5. Settings > API 메뉴에서 다음 정보 복사:
   - Project URL
   - anon public key
   - service_role key (secret)

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 복사한 정보 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

ADMIN_EMAIL=koung@example.com  # 본인 이메일로 변경
```

### 3. 실행

```bash
npm install
npm run dev
```

## 📱 주요 기능 테스트

### 랜딩 페이지
1. http://localhost:3000 접속
2. "무료 상담 신청하기" 버튼 클릭
3. 폼 작성 후 제출
4. 성공 메시지 확인

### 관리자 페이지
1. http://localhost:3000/admin 접속
2. 로그인 (ID: admin, PW: admin123)
3. 신청자 목록 확인
4. 상태 변경 및 메모 작성 테스트
5. CSV 다운로드 테스트

## ⚠️ 운영 전 필수 변경사항

1. **관리자 비밀번호 변경**
   - `/app/admin/page.tsx` 파일의 32번째 줄에서 비밀번호 변경

2. **이메일 설정**
   - `.env.local`의 `ADMIN_EMAIL`을 실제 이메일로 변경

3. **회사 정보 수정**
   - `/components/Footer.tsx`에서 회사 정보 수정

## 🌐 배포 방법

### Vercel 배포 (무료, 추천)

1. GitHub에 코드 업로드
2. [Vercel](https://vercel.com) 가입
3. "Import Project" > GitHub 저장소 선택
4. 환경 변수 입력 (Settings > Environment Variables)
5. Deploy 클릭

배포 완료 후 제공되는 URL로 접속 가능합니다.

## 💡 추가 기능 구현 가이드

### 실제 이메일 전송 구현

Resend 사용 예시:
1. [Resend](https://resend.com) 가입 및 API Key 발급
2. `npm install resend` 설치
3. `/app/api/send-email/route.ts` 수정

### 문자 알림 추가

Twilio 사용 예시:
1. [Twilio](https://twilio.com) 가입
2. `npm install twilio` 설치
3. API 라우트 추가

## 📞 문의사항

문제가 발생하거나 추가 기능이 필요한 경우 언제든 문의해주세요!