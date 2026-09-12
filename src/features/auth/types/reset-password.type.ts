import type { RegisterType } from "@/features/auth/types/register.type";

export type ResetPasswordFormValues = {
  loginType: RegisterType;
  identifier: string;
};

/** Payload for POST /auth/reset-password (ResetPasswordRequestDto). */
export type ResetPasswordPayload = {
  identifier: string;
};

/** Response of POST /auth/reset-password (ResetPasswordResponseDto). */
export type ResetPasswordResult = {
  otpId: string;
  otpExpiredAt: string;
};

/** sessionStorage key: hand-off {identifier, loginType} from reset-password → change-password without exposing it in the URL. */
export const RESET_PASSWORD_STORAGE_KEY = "auth:reset-password";

export type ResetPasswordHandoff = {
  identifier: string;
  loginType: RegisterType;
};
