"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getApiErrorMessage } from "@/shared-libs/axios/error";
import { sessionStorageClient } from "@/shared-libs/storage/session-storage";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { ChangePasswordFormValues } from "@/features/auth/types/change-password.type";
import { RESET_PASSWORD_STORAGE_KEY } from "@/features/auth/types/reset-password.type";
import { PAGES } from "@/shared/constants/page.constant";

export function useChangePassword() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (values: ChangePasswordFormValues) =>
      authRepository.changePassword({
        identifier: values.identifier,
        code: values.code,
        password: values.newPassword,
      }),
    onSuccess: () => {
      sessionStorageClient.remove(RESET_PASSWORD_STORAGE_KEY);
      router.push(PAGES.LOGIN.pathname);
    },
  });

  return {
    changePassword: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error
      ? getApiErrorMessage(mutation.error, "Đổi mật khẩu thất bại. Vui lòng thử lại.")
      : null,
  };
}
