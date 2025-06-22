import { NextRequest, NextResponse } from "next/server";

interface MiddlewareRequest extends NextRequest {}

export function middleware(request: MiddlewareRequest): NextResponse {
    const accessToken = request.cookies.get("accessToken");
    if (!accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};