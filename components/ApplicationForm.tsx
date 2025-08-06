'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

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
      const { data, error } = await supabase
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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <div className="space-y-6">
        {/* 성함 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성함 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1. 성함 입력"
          />
        </div>

        {/* 연락처 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연락처 *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2. 연락처 입력 (010-1234-5678)"
          />
        </div>

        {/* 직군 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            직군 *
          </label>
          <select
            name="business_type"
            value={formData.business_type}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">3. 직군 선택</option>
            <option value="근로자">근로자</option>
            <option value="개인사업자">개인사업자</option>
            <option value="법인사업자">법인사업자</option>
            <option value="프리랜서">프리랜서</option>
            <option value="주부">주부</option>
          </select>
        </div>

        {/* 희망 금액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            희망 금액 *
          </label>
          <select
            name="funding_amount"
            value={formData.funding_amount}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">4. 희망 금액 선택</option>
            <option value="1천만원 이하">1천만원 이하</option>
            <option value="1천만원~3천만원">1천만원~3천만원</option>
            <option value="3천만원~5천만원">3천만원~5천만원</option>
            <option value="5천만원~1억원">5천만원~1억원</option>
            <option value="1억원~3억원">1억원~3억원</option>
            <option value="3억원~5억원">3억원~5억원</option>
            <option value="5억원 이상">5억원 이상</option>
          </select>
        </div>

        {/* 사업자등록번호 (조건부 표시) */}
        {showBusinessNumber && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사업자등록번호 *
            </label>
            <input
              type="text"
              name="business_registration_number"
              value={formData.business_registration_number}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 rounded-lg mb-4 text-gray-800 text-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5. 사업자등록번호 입력 (123-45-67890)"
            />
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? '제출 중...' : '💬 무료 상담 신청하기'}
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        * 표시는 필수 입력 항목입니다.<br />
        제출하신 정보는 상담 목적으로만 사용되며, 24시간 내 연락드립니다.
      </p>
    </form>
  )
}