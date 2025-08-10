import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    // Vercel 환경변수에서 어드민 계정 정보 가져오기
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials not configured in environment variables')
      return NextResponse.json(
        { success: false, message: '서버 설정 오류' },
        { status: 500 }
      )
    }
    
    // 인증 확인
    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json(
        { success: true, message: '로그인 성공' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}