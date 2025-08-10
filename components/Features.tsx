import { TrendingUp, Users, Zap, Target, Award } from 'lucide-react'

const features = [
  {
    icon: Target,
    emoji: "🎯",
    title: '기업 규모별 맞춤',
    description: '소상공인부터 중소기업까지 규모에 맞는 최적의 정책자금을 추천합니다',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: '업종 특화 분석',
    description: '제조업, 서비스업, IT 등 업종별 특성을 고려한 맞춤형 컨설팅',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    emoji: "👥",
    title: '전문가 1:1 상담',
    description: '10년 이상 경력의 정책자금 전문가가 직접 상담해드립니다',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: '원스톱 서비스',
    description: '서류 준비부터 신청, 승인까지 모든 과정을 함께합니다',
    color: 'from-yellow-500 to-orange-500'
  }
]

export default function Features() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
            왜 선택해야 할까요?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            정책자금 전문가와 함께라면 성공률이 다릅니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* 카드 배경 */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>
              
              {/* 메인 카드 */}
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fadeInUp">
                {/* 아이콘 배경 */}
                <div className={`relative w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                  <div className="text-3xl">{feature.emoji}</div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                </div>
                
                {/* 제목 */}
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-purple-800 transition-colors">
                  {feature.title}
                </h3>
                
                {/* 설명 */}
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* 호버 효과 - 빛나는 테두리 */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse">
            <Award className="w-6 h-6" />
            <span>전문성과 신뢰성을 인정받은 파트너</span>
          </div>
        </div>
      </div>
    </section>
  )
}