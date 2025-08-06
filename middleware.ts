import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Admin 페이지는 클라이언트 사이드에서만 처리
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const response = NextResponse.next()
    response.headers.set('x-middleware-cache', 'no-cache')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}