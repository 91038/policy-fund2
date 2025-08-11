import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY not found in environment variables'
      })
    }
    
    const resend = new Resend(apiKey)
    
    // 간단한 테스트 이메일
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'qkrtmdska2642@gmail.com',
      subject: '테스트 이메일 - 정책자금 시스템',
      html: `
        <h1>테스트 이메일</h1>
        <p>이 이메일이 도착했다면 Resend API가 정상 작동합니다.</p>
        <p>현재 시간: ${new Date().toLocaleString('ko-KR')}</p>
      `
    })
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Failed to send test email',
        details: {
          message: error.message,
          name: error.name,
          statusCode: (error as any).statusCode,
          ...error
        },
        apiKeyPresent: !!apiKey,
        apiKeyLength: apiKey.length
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      data: data
    })
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Exception occurred',
      details: {
        message: error.message,
        stack: error.stack,
        name: error.name
      }
    })
  }
}