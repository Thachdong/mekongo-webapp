"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getApiErrorMessage } from "@/shared-libs/axios/error";
import { sessionStorageClient } from "@/shared-libs/storage/session-storage";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { RegisterPayload } from "@/features/auth/types/register.type";
import { ACTIVATION_STORAGE_KEY } from "@/features/auth/types/activate.type";

export function useRegister() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authRepository.register(payload),
    onSuccess: (_data, payload) => {
      sessionStorageClient.set(ACTIVATION_STORAGE_KEY, {
        identifier: payload.identifier,
        loginType: payload.loginType,
      });
      router.push("/auth/activate");
    },
  });

  return {
    register: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error
      ? getApiErrorMessage(mutation.error, "Đăng ký thất bại. Vui lòng thử lại.")
      : null,
  };
}
