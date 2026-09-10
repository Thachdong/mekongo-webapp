"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { getApiErrorCode, getApiErrorMessage } from "@/shared-libs/axios/error";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { LoginPayload } from "@/features/auth/types/login.type";

const ACCOUNT_NOT_ACTIVE_CODE = "ACCOUNT_NOT_ACTIVE";

export function useLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsActivation, setNeedsActivation] = useState(false);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setIsSubmitting(true);
      setError(null);
      setNeedsActivation(false);

      try {
        await authRepository.login(payload);
        router.push("/");
      } catch (err) {
        setError(
          getApiErrorMessage(err, "Đăng nhập thất bại. Vui lòng thử lại."),
        );
        setNeedsActivation(getApiErrorCode(err) === ACCOUNT_NOT_ACTIVE_CODE);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  return { login, isSubmitting, error, needsActivation };
}
