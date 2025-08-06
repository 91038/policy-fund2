import { Building2, TrendingUp, Users, FileCheck } from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: '기업 규모별 맞춤',
    description: '소상공인부터 중소기업까지 규모에 맞는 최적의 정책자금을 추천합니다'
  },
  {
    icon: TrendingUp,
    title: '업종 특화 분석',
    description: '제조업, 서비스업, IT 등 업종별 특성을 고려한 맞춤형 컨설팅'
  },
  {
    icon: Users,
    title: '전문가 1:1 상담',
    description: '10년 이상 경력의 정책자금 전문가가 직접 상담해드립니다'
  },
  {
    icon: FileCheck,
    title: '원스톱 서비스',
    description: '서류 준비부터 신청, 승인까지 모든 과정을 함께합니다'
  }
]

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          왜 선택해야 할까요?
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          정책자금 전문가와 함께라면 성공률이 다릅니다
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <feature.icon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}