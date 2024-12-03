import { NextResponse, type NextRequest } from "next/server";
import { loggedIn } from "./utils/authService";

const signInRoutes = ["/", "/sign-in", "/sign-up"];
const apiPrefix = "/api";
const servicesPrefix = "/services";

export async function middleware(request: NextRequest) {
  const { authenticated, expired } = await loggedIn();

  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiPrefix);
  const isServicesRoute = request.nextUrl.pathname.startsWith(servicesPrefix);
  const isSignInRoute = signInRoutes.includes(request.nextUrl.pathname);

  // if the session is expired delete the cookie and redirect to homepage
  if (expired) {
    if (!isSignInRoute && !isApiAuthRoute && !isServicesRoute) {
      return NextResponse.redirect(
        new URL("/services/auth/logout", request.url),
      );
    }
  }

  if (isApiAuthRoute) {
    return;
  }

  if (!authenticated && !isSignInRoute)
    return NextResponse.redirect(new URL("/", request.nextUrl));

  if (authenticated && isSignInRoute)
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
