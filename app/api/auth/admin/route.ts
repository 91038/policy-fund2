import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    console.log('Login attempt received:', { username })
    
    // 환경변수에서 어드민 계정 정보 가져오기 (폴백 값 포함)
    const adminUsername = process.env.ADMIN_USERNAME || 'qkrtmdska23'
    const adminPassword = process.env.ADMIN_PASSWORD || 'akfqhwl23!'
    
    console.log('Environment variables check:', {
      hasEnvUsername: !!process.env.ADMIN_USERNAME,
      hasEnvPassword: !!process.env.ADMIN_PASSWORD,
      usingUsername: adminUsername
    })
    
    // 입력값 검증
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }
    
    // 인증 확인
    const isUsernameMatch = username.trim() === adminUsername.trim()
    const isPasswordMatch = password === adminPassword
    
    console.log('Auth check:', {
      isUsernameMatch,
      isPasswordMatch,
      inputUsername: username,
      expectedUsername: adminUsername
    })
    
    if (isUsernameMatch && isPasswordMatch) {
      console.log('Login successful')
      return NextResponse.json(
        { success: true, message: '로그인 성공' },
        { status: 200 }
      )
    } else {
      console.log('Login failed - credentials do not match')
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