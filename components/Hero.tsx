import { ArrowRight, Phone, CheckCircle } from 'lucide-react'

interface HeroProps {
  onConsultClick: () => void
}

export default function Hero({ onConsultClick }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold text-sm">
            2025년 정책 예산 8조 7천억원
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            중소기업·소상공인<br />
            <span className="text-yellow-400">정책자금 지원</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            최대 금리 1.9% · 최대 30년 상환
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={onConsultClick}
              className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
            >
              무료 상담 신청하기
              <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="tel:1688-0000"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              전화 상담하기
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-400" />
              <span>무료 1:1 맞춤 컨설팅</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-400" />
              <span>평균 승인율 81%</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-400" />
              <span>서류 준비부터 대출까지</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}