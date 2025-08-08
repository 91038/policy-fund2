'use client'

import { MessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    // 스크롤 시작 시 표시
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      // 스크롤 중 애니메이션
      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    // 폼이 있는 섹션으로 부드럽게 스크롤
    const formSection = document.getElementById('consultation-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <>
      {/* 메인 플로팅 버튼 */}
      <button
        onClick={handleClick}
        className={`fixed bottom-8 right-8 z-40 group transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        } ${isScrolling ? 'scale-95' : 'scale-100'}`}
      >
        <div className="relative">
          {/* 펄스 애니메이션 배경 */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping animation-delay-200 opacity-50"></div>
          
          {/* 메인 버튼 */}
          <div className="relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 cursor-pointer">
            <MessageSquare className="w-6 h-6 animate-bounce" />
            <span className="font-bold text-lg whitespace-nowrap">무료 상담 바로가기</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* 호버 시 툴팁 */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          클릭하면 신청 폼으로 이동합니다
        </div>
      </button>


      {/* 추가 플로팅 요소 - 왼쪽 상단 알림 */}
      <div 
        className={`fixed top-24 left-8 z-30 transition-all duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-200 animate-slideInLeft">
          <p className="text-sm font-bold text-gray-800">
            🔥 지금 <span className="text-purple-600">87명</span>이 상담 중입니다
          </p>
        </div>
      </div>
    </>
  )
}