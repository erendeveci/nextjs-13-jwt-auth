import { NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/auth";

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];
const isAuthPages = (url) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  console.log("token ", token);
  const hasVerifiedToken = token && (await verifyJwtToken(token));

  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next(); // istekler devam etsin
      return response;
    }

    // login,register,forgot-password sayfalarına gitmez cunku token verifiy edildi
    const response = NextResponse.redirect(new URL("/", url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    return NextResponse.redirect(new URL(`/login?${searchParams}`, url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/panel/:path*"],
};
