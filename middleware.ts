import { auth } from "./auth";

export default auth(
  (req: {
    auth: any;
    nextUrl: { origin: string | URL | undefined; pathname: string };
  }) => {
    const session = req.auth;
    const loginUrl = new URL("/login", req.nextUrl.origin);
    // const adminDashboardUrl = new URL("/admin-dashboard", req.nextUrl.origin);
    // const dashboardUrl = new URL("/dashboard/data-diri", req.nextUrl.origin);
    // const homeUrl = new URL("/", req.nextUrl.origin);

    // const protectedApiRoutes = ["/api/vouchers"];

    if (!session) {
      return Response.redirect(loginUrl);
    }

    // const isAccessingAdmin =
    //   req.nextUrl.pathname.startsWith("/admin-dashboard");
    // const isAccessingDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    // const isAccessingAPIAdmin = protectedApiRoutes.includes(
    //   req.nextUrl.pathname,
    // );

    // if (isAccessingAPIAdmin && session.user.role !== "admin") {
    //   return Response.redirect(homeUrl);
    // }

    // if (isAccessingAdmin && session.user.role !== "admin") {
    //   return Response.redirect(dashboardUrl);
    // }

    // if (isAccessingDashboard && session.user.role !== "user") {
    //   return Response.redirect(adminDashboardUrl);
    // }
  },
);

export const config = {
  matcher: [
    "/",
    // "/admin-dashboard",
    // "/admin-dashboard/:path*",
    // "/api/vouchers",
  ],
};
