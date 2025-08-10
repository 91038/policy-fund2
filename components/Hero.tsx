import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'

interface HeroProps {
  onConsultClick: () => void
}

export default function Hero({ onConsultClick }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* 배경 애니메이션 원소들 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* 떠다니는 입자들 */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400 opacity-60" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 flex items-center min-h-screen">
        <div className="text-center w-full">
          <div className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-bold text-lg shadow-2xl transform hover:scale-105 transition-transform">
            🎯 2025년 정책 예산 8조 7천억원
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fadeInUp">
            중소기업·소상공인<br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              정책자금 지원
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 font-light text-blue-100 animate-fadeInUp animation-delay-500">
            ✨ 최대 금리 <span className="font-bold text-yellow-400">1.9%</span> · 최대 <span className="font-bold text-yellow-400">30년</span> 상환
          </p>
          
          <div className="flex justify-center mb-16 animate-fadeInUp animation-delay-1000">
            <button 
              onClick={onConsultClick}
              className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-2xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="text-xl">🚀 무료 상담 신청하기</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fadeInUp animation-delay-1500">
            {[
              { icon: "🎯", text: "무료 1:1 맞춤 컨설팅" },
              { icon: "📊", text: "평균 승인율 81%" },
              { icon: "⚡", text: "서류 준비부터 대출까지" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center justify-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <span className="text-lg font-semibold">{item.text}</span>
              </div>
            ))}
          </div>

          {/* 하단 스크롤 인디케이터 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <TrendingUp className="w-8 h-8 text-white/60" />
          </div>
        </div>
      </div>
    </section>
  )
}