# Vercel 배포 및 환경변수 설정 가이드

## 🚀 Vercel 배포 방법

### 1. Vercel 프로젝트 생성
1. [Vercel](https://vercel.com) 접속 및 로그인
2. "New Project" 클릭
3. GitHub 저장소 `policy-funds2` Import
4. Deploy 클릭

### 2. 환경변수 설정
프로젝트 배포 후 **Settings** > **Environment Variables**에서 다음 환경변수를 추가:

#### 필수 환경변수:
```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://xodlmdlcelhufeblrfqh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZGxtZGxjZWxodWZlYmxyZnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODM0MDgsImV4cCI6MjA2OTg1OTQwOH0.sLEG4gTfLo_2D81slb4uFvKWaSvpZixBZJd87gvhBaE

# 이메일 설정
EMAIL_TO=seochaetong1@gmail.com
EMAIL_FROM=seochaetong1@gmail.com
GMAIL_APP_PASSWORD=dgyirvjsocfnhtfz
RESEND_API_KEY=re_WoUSGUZ7_3DGJznrNSfpYxBkig4JCwkq9
```

#### 선택적 환경변수:
```bash
# 사이트 URL (이메일 링크용)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# 관리자 인증
ADMIN_USERNAME=qkrtmdska23
ADMIN_PASSWORD=akfqhwl23!
```

### 3. 환경변수 추가 방법
1. Vercel Dashboard에서 프로젝트 선택
2. **Settings** 탭 클릭
3. **Environment Variables** 메뉴 선택
4. **Add New** 버튼으로 각 변수 추가:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xodlmdlcelhufeblrfqh.supabase.co`
   - Environment: `Production, Preview, Development` 모두 선택
5. 모든 환경변수에 대해 반복

### 4. 재배포
환경변수 추가 후:
1. **Deployments** 탭으로 이동
2. 가장 최신 deployment에서 **⋯** > **Redeploy** 클릭
3. **Use existing build cache** 체크 해제 후 **Redeploy**

## ✅ 배포 확인

### 테스트 항목:
- [ ] 메인 페이지 로딩
- [ ] 신청폼 작동 (Supabase 연결)
- [ ] 이메일 전송 (Resend 연결)
- [ ] 관리자 페이지 접속 (`/admin`)

### 문제 해결:
1. **500 에러**: Supabase URL/키 확인
2. **이메일 미전송**: Resend API 키 확인  
3. **관리자 페이지 접속 안됨**: 환경변수 확인

## 🔗 링크
- **메인 페이지**: https://your-domain.vercel.app
- **관리자 페이지**: https://your-domain.vercel.app/admin
- **로그인**: qkrtmdska23 / akfqhwl23!

배포 완료 후 URL을 확인하시고 모든 기능이 정상 작동하는지 테스트해주세요!