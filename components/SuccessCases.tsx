import { Coffee, Cpu, Store, Factory } from 'lucide-react'

const cases = [
  {
    icon: Coffee,
    type: '카페 창업',
    amount: '5,000만원',
    rate: '1.9%',
    period: '5년',
    description: '프랜차이즈 카페 창업자금 지원'
  },
  {
    icon: Cpu,
    type: 'IT 스타트업',
    amount: '3억원',
    rate: '2.1%',
    period: '7년',
    description: '기술개발 및 운영자금 지원'
  },
  {
    icon: Store,
    type: '무인매장',
    amount: '8,000만원',
    rate: '2.3%',
    period: '5년',
    description: '무인매장 3개점 확장자금'
  },
  {
    icon: Factory,
    type: '제조업',
    amount: '5억원',
    rate: '2.5%',
    period: '10년',
    description: '설비투자 및 운전자금'
  }
]

export default function SuccessCases() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          성공 사례
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          실제 승인받은 고객들의 이야기
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((case_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <case_.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{case_.type}</h3>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">승인금액</span>
                  <span className="font-semibold text-blue-600">{case_.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">금리</span>
                  <span className="font-semibold">{case_.rate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">상환기간</span>
                  <span className="font-semibold">{case_.period}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{case_.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}