"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getApiErrorCode, getApiErrorMessage } from "@/shared-libs/axios/error";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { LoginPayload } from "@/features/auth/types/login.type";

const ACCOUNT_NOT_ACTIVE_CODE = "ACCOUNT_NOT_ACTIVE";

export function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => authRepository.login(payload),
    onSuccess: () => {
      router.push("/");
    },
  });

  return {
    login: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error
      ? getApiErrorMessage(mutation.error, "Đăng nhập thất bại. Vui lòng thử lại.")
      : null,
    needsActivation: getApiErrorCode(mutation.error) === ACCOUNT_NOT_ACTIVE_CODE,
  };
}
