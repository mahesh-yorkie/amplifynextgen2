import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn");
  console.log("request.nextUrl.pathname",request.nextUrl.pathname,isLoggedIn);
  if (
    (isLoggedIn?.value === "false" || isLoggedIn?.value === undefined )&&
     request.nextUrl.pathname !== "/auth/signin" &&
      request.nextUrl.pathname !== "/sign-in" &&
      request.nextUrl.pathname !== "/confirm-password"
  ) {
    console.log(" i am inside the middlewe to redirect")
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  } else if (
    isLoggedIn?.value === "true" &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/auth/signin" ||
      request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/confirm-password")
  ) {
    return NextResponse.redirect(new URL("/home-page", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/home-page/:path*",
    "/sign-up",
    "/sign-in",
    "/confirm-password",
  ],
};