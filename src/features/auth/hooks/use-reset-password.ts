"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getApiErrorMessage } from "@/shared-libs/axios/error";
import { sessionStorageClient } from "@/shared-libs/storage/session-storage";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { ResetPasswordFormValues } from "@/features/auth/types/reset-password.type";
import { RESET_PASSWORD_STORAGE_KEY } from "@/features/auth/types/reset-password.type";
import { PAGES } from "@/shared/constants/page.constant";

export function useResetPassword() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: ResetPasswordFormValues) =>
      authRepository.resetPassword({ identifier: payload.identifier }),
    onSuccess: (_data, payload) => {
      sessionStorageClient.set(RESET_PASSWORD_STORAGE_KEY, {
        identifier: payload.identifier,
        loginType: payload.loginType,
      });
      router.push(PAGES.CHANGE_PASSWORD.pathname);
    },
  });

  return {
    resetPassword: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error
      ? getApiErrorMessage(mutation.error, "Yêu cầu đặt lại mật khẩu thất bại. Vui lòng thử lại.")
      : null,
  };
}
