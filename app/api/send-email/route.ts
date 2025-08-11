import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const { applicationData } = await request.json()
    
    // 환경변수에서 이메일 주소 가져오기
    const notificationEmail = process.env.EMAIL_TO || process.env.EMAIL_FROM || 'seochaetong1@gmail.com'
    
    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('Email configuration not complete')
      return NextResponse.json({ success: true, message: 'Email not configured, but application saved' })
    }

    const currentDate = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>새로운 정책자금 상담 신청</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px;">🏢 새로운 정책자금 상담 신청</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">${currentDate} 접수</p>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <div style="display: grid; gap: 20px;">
            
            <div>
              <strong style="color: #2d3748; font-size: 16px;">👤 성함</strong><br />
              <span style="font-size: 18px; font-weight: 600;">${applicationData.name}</span>
            </div>
            
            <div>
              <strong style="color: #2d3748; font-size: 16px;">📞 연락처</strong><br />
              <span style="color: #3182ce; font-weight: 600; font-size: 18px;">${applicationData.phone}</span>
            </div>
            
            <div>
              <strong style="color: #2d3748; font-size: 16px;">💼 직군</strong><br />
              <span style="background: #bee3f8; padding: 4px 12px; border-radius: 6px; font-weight: 600; font-size: 16px;">${applicationData.business_type}</span>
            </div>
            
            <div>
              <strong style="color: #2d3748; font-size: 16px;">💰 희망 금액</strong><br />
              <span style="color: #d69e2e; font-weight: 700; font-size: 20px;">${applicationData.funding_amount}</span>
            </div>
            
            ${applicationData.business_registration_number ? `
            <div>
              <strong style="color: #2d3748; font-size: 16px;">🏢 사업자등록번호</strong><br />
              <span style="font-size: 16px; font-weight: 600;">${applicationData.business_registration_number}</span>
            </div>
            ` : ''}
            
          </div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/admin" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            📊 관리자 페이지에서 확인하기
          </a>
        </div>

        <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center; color: #718096; font-size: 14px;">
          <p>이 이메일은 정책자금 랜딩 페이지에서 자동으로 발송되었습니다.</p>
          <p>신속한 응답을 위해 가능한 빠른 시일 내에 연락드리시기 바랍니다.</p>
        </div>
      </body>
      </html>
    `

    // Resend를 사용하여 실제 이메일 전송
    console.log('Attempting to send email to:', notificationEmail)
    console.log('Using Resend API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing')
    
    const { data, error } = await resend.emails.send({
      from: 'Policy Fund <onboarding@resend.dev>',
      to: [notificationEmail],
      subject: `새로운 정책자금 상담 신청 - ${applicationData.name}`,
      html: emailContent,
    })

    if (error) {
      console.error('Failed to send email:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // Resend API 에러 상세 정보
      const errorDetails = {
        message: error.message || error.toString(),
        name: error.name,
        ...error
      }
      
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send email',
        details: errorDetails,
        apiKey: process.env.RESEND_API_KEY ? 'Set' : 'Not Set',
        to: notificationEmail
      }, { status: 500 })
    }

    console.log('Email sent successfully:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}