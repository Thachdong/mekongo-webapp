"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getApiErrorMessage } from "@/shared-libs/axios/error";
import { authRepository } from "@/features/auth/repositories/auth.repository";
import type { ActivatePayload } from "@/features/auth/types/activate.type";
import { PAGES } from "@/shared/constants/page.constant";

export const RESEND_COUNTDOWN_SECONDS = 5 * 60;

export function useActivate() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (!isCounting) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isCounting]);

  const startCountdown = useCallback((seconds: number = RESEND_COUNTDOWN_SECONDS) => {
    setSecondsLeft(seconds);
    setIsCounting(seconds > 0);
  }, []);

  const activateMutation = useMutation({
    mutationFn: (payload: ActivatePayload) => authRepository.activate(payload),
    onSuccess: () => {
      router.push(PAGES.LOGIN.pathname);
    },
  });

  const resendMutation = useMutation({
    mutationFn: (identifier: string) =>
      authRepository.resendVerification({
        identifier,
        purpose: "ACCOUNT_VERIFICATION",
      }),
    onSuccess: () => {
      startCountdown();
    },
  });

  return {
    activate: activateMutation.mutate,
    startCountdown,
    isSubmitting: activateMutation.isPending,
    error: activateMutation.error
      ? getApiErrorMessage(activateMutation.error, "Kích hoạt thất bại. Vui lòng thử lại.")
      : resendMutation.error
        ? getApiErrorMessage(resendMutation.error, "Gửi lại mã thất bại. Vui lòng thử lại.")
        : null,
    resend: resendMutation.mutate,
    isResending: resendMutation.isPending,
    secondsLeft,
    canResend: secondsLeft <= 0,
  };
}
