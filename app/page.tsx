'use client'

import dynamic from 'next/dynamic'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import SuccessCases from '../components/SuccessCases'
import Process from '../components/Process'
import Footer from '../components/Footer'
import FloatingCTA from '../components/FloatingCTA'

const ApplicationForm = dynamic(() => import('../components/ApplicationForm'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero onConsultClick={() => {
        const formSection = document.getElementById('consultation-form')
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }} />
      <Features />
      <Stats />
      <SuccessCases />
      <Process />
      <section id="consultation-form" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            지금 바로 무료 상담 신청하세요
          </h2>
          <ApplicationForm />
        </div>
      </section>
      <Footer />
      
      {/* 고정 CTA 버튼 추가 */}
      <FloatingCTA />
    </main>
  )
}
