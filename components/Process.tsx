import { Phone, Users, FileText, Send, CheckCircle2, PartyPopper } from 'lucide-react'

const steps = [
  {
    icon: Phone,
    title: '무료 상담',
    description: '온라인 또는 전화로 간단한 상담 신청'
  },
  {
    icon: Users,
    title: '전문가 매칭',
    description: '업종별 전문 컨설턴트 배정'
  },
  {
    icon: FileText,
    title: '맞춤 진단',
    description: '기업 현황 분석 및 최적 상품 추천'
  },
  {
    icon: Send,
    title: '서류 준비',
    description: '필요 서류 안내 및 작성 지원'
  },
  {
    icon: CheckCircle2,
    title: '신청 접수',
    description: '정책자금 신청 대행'
  },
  {
    icon: PartyPopper,
    title: '승인 완료',
    description: '자금 수령 및 사후 관리'
  }
]

export default function Process() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          간단한 신청 프로세스
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          복잡한 절차는 저희가 대신 처리해드립니다
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  <step.icon className="w-8 h-8" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-x-1/2"></div>
                )}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-semibold mb-1 text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}