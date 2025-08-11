'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface ApplicationFormProps {
  onSuccess?: () => void
}

export default function ApplicationForm({ onSuccess }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false)
  const [showBusinessNumber, setShowBusinessNumber] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business_type: '', // 직군
    funding_amount: '',
    business_registration_number: '' // 사업자일 경우
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 직군이 사업자 관련인 경우 사업자등록번호 표시
    if (name === 'business_type') {
      const businessTypes = ['개인사업자', '법인사업자']
      setShowBusinessNumber(businessTypes.includes(value))
      
      // 사업자가 아닌 경우 사업자등록번호 초기화
      if (!businessTypes.includes(value)) {
        setFormData(prev => ({
          ...prev,
          business_registration_number: ''
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 사업자인 경우 사업자등록번호 필수 검증
      if (showBusinessNumber && !formData.business_registration_number.trim()) {
        alert('사업자등록번호를 입력해주세요.')
        setLoading(false)
        return
      }
      const { error } = await supabase
        .from('policy_fund_applications')
        .insert([formData])

      if (error) throw error

      // 이메일 전송
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ applicationData: formData }),
        })
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError)
      }

      alert('신청이 완료되었습니다! 곧 연락드리겠습니다.')
      
      setFormData({
        name: '',
        phone: '',
        business_type: '',
        funding_amount: '',
        business_registration_number: ''
      })

      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error:', error)
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl blur opacity-20"></div>
      
      <form onSubmit={handleSubmit} className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            ✨ 무료 상담 신청
          </h3>
          <p className="text-gray-600">간단한 정보만 입력하시면 24시간 내 연락드립니다</p>
        </div>

        <div className="space-y-8">
        {/* 성함 */}
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
            성함
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-5 rounded-2xl text-gray-800 text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-purple-300"
              placeholder="성함을 입력해주세요"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* 연락처 */}
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
            연락처
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-6 py-5 rounded-2xl text-gray-800 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-blue-300"
              placeholder="010-1234-5678"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* 직군 */}
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
            직군
          </label>
          <div className="relative">
            <select
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              required
              className="w-full px-6 py-5 rounded-2xl text-gray-800 text-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-green-300 appearance-none"
            >
              <option value="">직군을 선택해주세요</option>
              <option value="근로자">👔 근로자</option>
              <option value="개인사업자">🏪 개인사업자</option>
              <option value="법인사업자">🏢 법인사업자</option>
              <option value="프리랜서">💻 프리랜서</option>
              <option value="주부">🏠 주부</option>
            </select>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* 희망 금액 */}
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
            희망 금액
          </label>
          <div className="relative">
            <select
              name="funding_amount"
              value={formData.funding_amount}
              onChange={handleChange}
              required
              className="w-full px-6 py-5 rounded-2xl text-gray-800 text-lg border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-yellow-300 appearance-none"
            >
              <option value="">희망 금액을 선택해주세요</option>
              <option value="1천만원 이하">💰 1천만원 이하</option>
              <option value="1천만원~3천만원">💵 1천만원~3천만원</option>
              <option value="3천만원~5천만원">💸 3천만원~5천만원</option>
              <option value="5천만원~1억원">🏦 5천만원~1억원</option>
              <option value="1억원~3억원">💎 1억원~3억원</option>
              <option value="3억원~5억원">🏛️ 3억원~5억원</option>
              <option value="5억원 이상">🚀 5억원 이상</option>
            </select>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* 사업자등록번호 (조건부 표시) */}
        {showBusinessNumber && (
          <div className="group animate-fadeInUp">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">5</span>
              사업자등록번호
            </label>
            <div className="relative">
              <input
                type="text"
                name="business_registration_number"
                value={formData.business_registration_number}
                onChange={handleChange}
                required
                className="w-full px-6 py-5 rounded-2xl text-gray-800 text-lg border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-red-300"
                placeholder="123-45-67890"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        )}
      </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-black text-xl rounded-2xl hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 animate-glow"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full"></div>
                  처리 중입니다...
                </>
              ) : (
                <>
                  🚀 무료 상담 신청하기
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    →
                  </div>
                </>
              )}
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            ✅ <strong>개인정보 보호</strong> - 상담 목적으로만 안전하게 사용됩니다
          </p>
          <p className="text-sm text-gray-600">
            ⚡ <strong>빠른 응답</strong> - 24시간 내 전문 상담사가 연락드립니다
          </p>
          <p className="text-sm text-gray-600">
            🎯 <strong>맞춤 컨설팅</strong> - 귀하의 상황에 최적화된 솔루션 제공
          </p>
        </div>
      </form>
    </div>
  )
}