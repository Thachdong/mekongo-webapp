import { axiosClient } from "@/shared-libs/axios/client";
import type {
  RegisterPayload,
  RegisterResponseDto,
} from "@/features/auth/types/register.type";

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
};
