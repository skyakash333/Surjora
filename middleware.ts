import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware() {
    // All matched routes are protected by default when a token is absent.
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        if (path === '/admin/login') return true;
        return Boolean(token);
      },
    },
  },
);

export const config = {
  matcher: ['/admin/:path*'],
};
