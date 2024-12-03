import { getToken } from 'next-auth/jwt'
// import {  withAuth} from 'next-auth/middleware'
import {  NextRequest, NextResponse } from 'next/server'

export default async function middleware(
  req: NextRequest,
) {
  const token = await getToken({ req })

  const isAuthenticated = !!token

  if (req.nextUrl.pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // const authMiddleware = withAuth({
  //   pages: {
  //     signIn: '/',
  //   //   error: '/auth/error',
  //   },
  // })

  // return authMiddleware(req, event)
  return
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|register).*)'],
}