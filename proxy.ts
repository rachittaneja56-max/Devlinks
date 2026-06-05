import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasValidBasicAuth } from '@/lib/basic-auth';

function unauthorizedResponse() {
  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="DevLinks Admin"',
    },
  });
}

export function proxy(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isResourceDelete =
    request.method === 'DELETE' &&
    request.nextUrl.pathname.startsWith('/api/resources/');

  if (!isAdminPage && !isResourceDelete) {
    return NextResponse.next();
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (
    !username ||
    !password ||
    !hasValidBasicAuth(request.headers.get('authorization'), username, password)
  ) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/resources/:path*'],
};
