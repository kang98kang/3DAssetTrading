import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const errorParam = url.searchParams.get("error");

  if (
    url.pathname === "/api/auth/signin" &&
    errorParam === "OAuthAccountNotLinked"
  ) {
    const response = NextResponse.redirect(new URL("/register", request.url));
    response.cookies.set("alert", "true", {
      path: "/",
      maxAge: 5,
    });
    return response;
  }
}
