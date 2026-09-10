import { axiosClient } from "@/shared-libs/axios/client";
import type {
  RegisterPayload,
  RegisterResponseDto,
} from "@/features/auth/types/register.type";
import type {
  ActivatePayload,
  ResendPayload,
} from "@/features/auth/types/activate.type";
import type {
  LoginPayload,
  LoginResult,
} from "@/features/auth/types/login.type";

type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown> | null;
};

export const authRepository = {
  /**
   * Hits the dedicated BFF route (not the generic /api/proxy) — the response
   * sets httpOnly accessToken/refreshToken cookies server-side, which the
   * generic proxy forward doesn't do. baseURL override bypasses axiosClient's
   * "/api/proxy" default to reach "/api/auth/login" directly.
   */
  login: async (payload: LoginPayload) => {
    const { data } = await axiosClient.post<LoginResult>(
      "/api/auth/login",
      payload,
      { baseURL: "", skipAuthRedirect: true },
    );
    return data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await axiosClient.post<ApiEnvelope<RegisterResponseDto>>(
      "/auth/register",
      payload,
    );
    return data.data;
  },

  activate: async (payload: ActivatePayload) => {
    const { data } = await axiosClient.post<ApiEnvelope<null>>(
      "/auth/activate",
      payload,
    );
    return data.data;
  },

  resendVerification: async (payload: ResendPayload) => {
    const { data } = await axiosClient.post<ApiEnvelope<null>>(
      "/verification/re-send",
      payload,
    );
    return data.data;
  },
};
