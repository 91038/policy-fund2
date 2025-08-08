'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import SuccessCases from '@/components/SuccessCases'
import Process from '@/components/Process'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

const ApplicationForm = dynamic(() => import('@/components/ApplicationForm'), {
  ssr: false
})

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero onConsultClick={() => setShowForm(true)} />
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
      <FloatingCTA onConsultClick={() => setShowForm(true)} />
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <button 
              onClick={() => setShowForm(false)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6">무료 상담 신청</h3>
            <ApplicationForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </main>
  )
}
