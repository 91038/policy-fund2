export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4">금손대부</h3>
            <p className="text-gray-400">
              중소기업·소상공인을 위한<br />
              정책자금 전문 컨설팅
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <p className="text-gray-400">
              전화: 1688-0000<br />
              이메일: info@example.com<br />
              상담시간: 평일 09:00 - 18:00
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">사업자 정보</h4>
            <p className="text-gray-400">
              대표: 이선희<br />
              사업자등록번호: 827-64-00776<br />
              통신판매업 신고번호: 제2024-서울-0001호
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 금손대부. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
                개인정보처리방침
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}