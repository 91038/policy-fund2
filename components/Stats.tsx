export default function Stats() {
  const stats = [
    {
      number: '7,834',
      unit: '건',
      label: '월평균 진단',
      description: '매달 수천 건의 상담 진행'
    },
    {
      number: '134',
      unit: '억원',
      label: '월평균 승인금액',
      description: '실제 승인된 정책자금'
    },
    {
      number: '81',
      unit: '%',
      label: '평균 승인율',
      description: '전문 컨설팅의 힘'
    },
    {
      number: '10',
      unit: '년+',
      label: '전문가 경력',
      description: '검증된 전문성'
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          믿을 수 있는 실적
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          숫자로 증명하는 전문성과 신뢰
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
                <span className="text-2xl md:text-3xl">{stat.unit}</span>
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}