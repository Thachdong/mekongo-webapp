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
 * Reads the `exp` claim off a JWT without verifying its signature —
 * the backend verifies on every API call, this is only to decide
 * whether proxy should attempt a refresh before letting a request through.
 */
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8"),
    );
    return !payload.exp || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  if (accessToken && !isTokenExpired(accessToken)) {
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
