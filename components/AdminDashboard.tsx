'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Application } from '@/lib/supabase'
import { LogOut, Download, Search, Phone, Mail } from 'lucide-react'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  useEffect(() => {
    fetchApplications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      let query = supabase.from('policy_fund_applications').select('*').order('created_at', { ascending: false })
      
      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query
      
      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      alert('데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('policy_fund_applications')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      fetchApplications()
      alert('상태가 업데이트되었습니다.')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('상태 업데이트 중 오류가 발생했습니다.')
    }
  }

  const updateNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('policy_fund_applications')
        .update({ notes })
        .eq('id', id)

      if (error) throw error

      fetchApplications()
      alert('메모가 저장되었습니다.')
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('메모 저장 중 오류가 발생했습니다.')
    }
  }

  const exportToCSV = () => {
    const headers = ['신청일시', '이름', '연락처', '이메일', '업종', '회사명', '희망자금', '상태']
    const csvContent = [
      headers.join(','),
      ...filteredApplications.map(app => [
        new Date(app.created_at!).toLocaleString('ko-KR'),
        app.name,
        app.phone,
        app.email || '',
        app.business_type,
        app.company_name || '',
        app.funding_amount,
        app.status || 'pending'
      ].join(','))
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `신청자_명단_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const filteredApplications = applications.filter(app => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      app.name.toLowerCase().includes(searchLower) ||
      app.phone.includes(searchTerm) ||
      app.company_name?.toLowerCase().includes(searchLower) ||
      app.business_type.toLowerCase().includes(searchLower)
    )
  })

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    contacted: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    pending: '대기중',
    contacted: '연락완료',
    completed: '완료',
    rejected: '거절'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">관리자 대시보드</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
              <div className="text-sm text-gray-600">전체 신청</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {applications.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">대기중</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">완료</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {applications.filter(a => {
                  const today = new Date().toDateString()
                  return new Date(a.created_at!).toDateString() === today
                }).length}
              </div>
              <div className="text-sm text-gray-600">오늘 신청</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 연락처, 회사명, 업종으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체 상태</option>
              <option value="pending">대기중</option>
              <option value="contacted">연락완료</option>
              <option value="completed">완료</option>
              <option value="rejected">거절</option>
            </select>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              CSV 다운로드
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      신청일시
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      연락처
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      업종
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      희망자금
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(app.created_at!).toLocaleString('ko-KR')}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {app.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <a href={`tel:${app.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                          <Phone className="w-3 h-3" />
                          {app.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {app.business_type}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {app.funding_amount}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[app.status as keyof typeof statusColors] || statusColors.pending}`}>
                          {statusLabels[app.status as keyof typeof statusLabels] || '대기중'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredApplications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">신청 상세 정보</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">이름</label>
                  <p className="font-medium">{selectedApplication.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">연락처</label>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">이메일</label>
                  <p className="font-medium">{selectedApplication.email || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">업종</label>
                  <p className="font-medium">{selectedApplication.business_type}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">회사명</label>
                  <p className="font-medium">{selectedApplication.company_name || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">사업자등록번호</label>
                  <p className="font-medium">{selectedApplication.business_registration_number || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">희망자금</label>
                  <p className="font-medium">{selectedApplication.funding_amount}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">기업규모</label>
                  <p className="font-medium">{selectedApplication.company_size || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">사업연수</label>
                  <p className="font-medium">{selectedApplication.business_years ? `${selectedApplication.business_years}년` : '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">연매출</label>
                  <p className="font-medium">{selectedApplication.annual_revenue || '-'}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">자금용도</label>
                <p className="font-medium">{selectedApplication.funding_purpose || '-'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-2">상태 변경</label>
                <select
                  value={selectedApplication.status || 'pending'}
                  onChange={(e) => updateStatus(selectedApplication.id!, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">대기중</option>
                  <option value="contacted">연락완료</option>
                  <option value="completed">완료</option>
                  <option value="rejected">거절</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-2">관리자 메모</label>
                <textarea
                  defaultValue={selectedApplication.notes || ''}
                  onBlur={(e) => updateNotes(selectedApplication.id!, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="메모를 입력하세요..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <a
                  href={`tel:${selectedApplication.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  전화하기
                </a>
                {selectedApplication.email && (
                  <a
                    href={`mailto:${selectedApplication.email}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    이메일 보내기
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}