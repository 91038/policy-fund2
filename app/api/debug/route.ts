import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    adminUsername: process.env.ADMIN_USERNAME ? 'SET' : 'NOT SET',
    adminPassword: process.env.ADMIN_PASSWORD ? 'SET' : 'NOT SET',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    resendApiKey: process.env.RESEND_API_KEY ? 'SET' : 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
    actualUsername: process.env.ADMIN_USERNAME || 'DEFAULT: qkrtmdska23',
    // 보안을 위해 실제 비밀번호는 표시하지 않음
  })
}