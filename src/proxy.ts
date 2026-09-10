import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { axiosServer } from "@/shared-libs/axios/server";

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/**
 * Optimistic check (see Next.js authentication guide): presence of
 * accessToken is enough to let the request through. Real validity is
 * enforced by the backend on each API call and by axiosClient's 401
 * interceptor — proxy is not a full session-management solution.
 */
export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  if (accessToken) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const { data } = await axiosServer.post("/auth/refresh", {
      refreshToken,
    });

    const response = NextResponse.next();
    response.cookies.set(
      "accessToken",
      data.data.accessToken,
      AUTH_COOKIE_OPTIONS,
    );
    response.cookies.set(
      "refreshToken",
      data.data.refreshToken,
      AUTH_COOKIE_OPTIONS,
    );
    return response;
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};
