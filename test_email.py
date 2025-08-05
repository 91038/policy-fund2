import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import ssl

# Gmail 설정
GMAIL_USER = "qkrtmdska2642@gmail.com"
GMAIL_APP_PASSWORD = "dgyirvjsocfnhtfz"
TO_EMAIL = "qkrtmdska2642@gmail.com"

def send_test_email():
    try:
        # 이메일 메시지 생성
        message = MIMEMultipart("alternative")
        message["Subject"] = "[테스트] 정책자금 신청 알림"
        message["From"] = GMAIL_USER
        message["To"] = TO_EMAIL
        
        # 텍스트 버전
        text = """\
안녕하세요,
이것은 이메일 테스트입니다.

정책자금 상담 신청이 접수되었습니다.
- 성함: 홍길동
- 연락처: 010-1234-5678
- 직군: 개인사업자
- 희망금액: 1천만원~3천만원

빠른 시일 내에 연락 부탁드립니다.
"""
        
        # HTML 버전
        html = """\
<html>
  <body>
    <h2>정책자금 상담 신청이 접수되었습니다.</h2>
    <hr>
    <p><strong>신청 시간:</strong> 2025-08-03 19:00:00</p>
    <p><strong>성함:</strong> 홍길동</p>
    <p><strong>연락처:</strong> 010-1234-5678</p>
    <p><strong>직군:</strong> 개인사업자</p>
    <p><strong>희망금액:</strong> 1천만원~3천만원</p>
    <hr>
    <p>빠른 시일 내에 연락 부탁드립니다.</p>
  </body>
</html>
"""
        
        # MIMEText 객체 생성
        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")
        
        # 메시지에 추가
        message.attach(part1)
        message.attach(part2)
        
        # SSL 컨텍스트 생성
        context = ssl.create_default_context()
        
        # Gmail SMTP 서버 연결 및 이메일 전송
        print("Gmail 서버에 연결 중...")
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            print("서버 연결 성공")
            
            server.ehlo()
            print("EHLO 명령 완료")
            
            server.starttls(context=context)
            print("TLS 연결 시작")
            
            server.ehlo()
            print("TLS 후 EHLO 명령 완료")
            
            print(f"로그인 시도: {GMAIL_USER}")
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            print("로그인 성공!")
            
            print("이메일 전송 중...")
            result = server.sendmail(GMAIL_USER, TO_EMAIL, message.as_string())
            print(f"이메일 전송 완료! 결과: {result}")
            
    except smtplib.SMTPAuthenticationError as e:
        print(f"인증 오류: {e}")
        print("앱 비밀번호를 확인하세요.")
    except smtplib.SMTPException as e:
        print(f"SMTP 오류: {e}")
    except Exception as e:
        print(f"오류 발생: {type(e).__name__}: {e}")

if __name__ == "__main__":
    print("이메일 전송 테스트 시작...")
    send_test_email()