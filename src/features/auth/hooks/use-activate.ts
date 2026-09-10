"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getApiErrorMessage } from "@/shared-libs/axios/error";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { ActivatePayload } from "@/features/auth/types/activate.type";

const RESEND_COUNTDOWN_SECONDS = 5 * 60;

export function useActivate() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COUNTDOWN_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activate = useCallback(
    async (payload: ActivatePayload) => {
      setIsSubmitting(true);
      setError(null);

      try {
        await authRepository.activate(payload);
        router.push("/auth/login");
      } catch (err) {
        setError(
          getApiErrorMessage(err, "Kích hoạt thất bại. Vui lòng thử lại."),
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  const resend = useCallback(async (identifier: string) => {
    setIsResending(true);
    setError(null);

    try {
      await authRepository.resendVerification({
        identifier,
        purpose: "ACCOUNT_VERIFICATION",
      });
      setSecondsLeft(RESEND_COUNTDOWN_SECONDS);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Gửi lại mã thất bại. Vui lòng thử lại."),
      );
    } finally {
      setIsResending(false);
    }
  }, []);

  return {
    activate,
    isSubmitting,
    error,
    resend,
    isResending,
    secondsLeft,
    canResend: secondsLeft <= 0,
  };
}
