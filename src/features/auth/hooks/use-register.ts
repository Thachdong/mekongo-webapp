"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { getApiErrorMessage } from "@/shared-libs/axios/error";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { RegisterPayload } from "@/features/auth/types/register.type";

export function useRegister() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setIsSubmitting(true);
      setError(null);

      try {
        await authRepository.register(payload);
        router.push("/auth/activate");
      } catch (err) {
        setError(
          getApiErrorMessage(err, "Đăng ký thất bại. Vui lòng thử lại."),
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  return { register, isSubmitting, error };
}
