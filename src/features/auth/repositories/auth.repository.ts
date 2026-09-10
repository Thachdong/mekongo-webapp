import { axiosClient } from "@/shared-libs/axios/client";
import type {
  RegisterPayload,
  RegisterResponseDto,
} from "@/features/auth/types/register.type";
import type {
  ActivatePayload,
  ResendPayload,
} from "@/features/auth/types/activate.type";

type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown> | null;
};

export const authRepository = {
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
