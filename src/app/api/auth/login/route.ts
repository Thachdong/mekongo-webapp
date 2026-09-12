import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { axiosServer } from "@/shared-libs/axios/server";
import type {
  LoginPayload,
  LoginResult,
} from "@/features/auth/types/login.type";

type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown> | null;
};

type LoginResponseDto = LoginResult & {
  accessToken: string;
  refreshToken: string;
};

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as LoginPayload;

  try {
    const { data } = await axiosServer.post<ApiEnvelope<LoginResponseDto>>(
      "/auth/login",
      payload,
    );
    const { accessToken, refreshToken, accountId, profileId } = data.data;

    const response = NextResponse.json<LoginResult>({ accountId, profileId });
    response.cookies.set("accessToken", accessToken, AUTH_COOKIE_OPTIONS);
    response.cookies.set("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
