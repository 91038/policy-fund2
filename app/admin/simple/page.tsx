'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const AdminDashboard = dynamic(() => import('../../../components/AdminDashboard'), {
  ssr: false
})

export default function SimpleAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const authStatus = sessionStorage.getItem('simple_admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    console.log('Simple login attempt:', { username, password })

    // 간단한 하드코딩된 인증 (환경변수 없이)
    if (username === 'qkrtmdska24' && password === 'akfqhwl23!') {
      console.log('Simple login successful')
      sessionStorage.setItem('simple_admin_authenticated', 'true')
      setIsAuthenticated(true)
      alert('로그인 성공!')
    } else {
      console.log('Simple login failed')
      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('simple_admin_authenticated')
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
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인 (Simple)</h1>
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
              로그인
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/admin" className="text-blue-600 hover:text-blue-800 text-sm">
              API 로그인으로 전환
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard onLogout={handleLogout} />
}