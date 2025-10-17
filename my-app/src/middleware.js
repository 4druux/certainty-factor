import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const decodedToken = token ? await verifyJWT(token) : null;

  if (path.startsWith("/dashboard") && !decodedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (decodedToken && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
