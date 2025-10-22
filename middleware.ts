import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Voeg extra logica toe als nodig
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
