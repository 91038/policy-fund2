'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), {
  ssr: false
})

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    console.log('Frontend: Login attempt with username:', username)

    // 입력값 검증
    if (!username || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.')
      return
    }

    try {
      console.log('Frontend: Sending login request...')
      
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password 
        }),
      })

      console.log('Frontend: Response status:', response.status)
      
      if (!response.ok) {
        console.error('Frontend: Response not ok:', response.status, response.statusText)
      }

      const result = await response.json()
      console.log('Frontend: Response data:', result)

      if (result.success) {
        console.log('Frontend: Login successful, setting session storage')
        sessionStorage.setItem('admin_authenticated', 'true')
        setIsAuthenticated(true)
        alert('로그인 성공!')
      } else {
        console.error('Frontend: Login failed:', result.message)
        alert(result.message || '아이디 또는 비밀번호가 올바르지 않습니다.')
      }
    } catch (error) {
      console.error('Frontend: Login error:', error)
      alert('로그인 처리 중 네트워크 오류가 발생했습니다. 네트워크 연결을 확인해주세요.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아이디
              </label>
              <input
                type="text"
                name="username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="아이디 입력"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="비밀번호 입력"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              API 로그인
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/admin/simple" className="text-red-600 hover:text-red-800 text-sm font-medium">
              🚨 API 안 되면 여기 클릭 (Simple 로그인)
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard onLogout={handleLogout} />
}