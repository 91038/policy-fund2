'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">금손대부</h3>
            <p className="text-sm text-gray-600">
              정부지원 정책자금 전문 컨설팅<br />
              맞춤형 자금 지원으로 성장을 돕습니다
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">사업자 정보</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>상호명: 금손대부</li>
              <li>대표자: 이선희</li>
              <li>사업자등록번호: 827-64-00776</li>
              <li>업태: 금융 및 보험업</li>
              <li>종목: 그 외 기타 여신 금융업</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">연락처</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>주소: 인천광역시 연수구 능허대로 133,<br />4층 479호 (송도동, 빅프라자)</li>
              <li>전화: 032-670-9224</li>
              <li>개업일: 2025년 7월 16일</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 금손대부. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}