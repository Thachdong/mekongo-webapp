import type { RegisterType } from "@/features/auth/types/register.type";

export type ChangePasswordFormValues = {
  loginType: RegisterType;
  identifier: string;
  code: string;
  newPassword: string;
  repeatNewPassword: string;
};

/** Payload for POST /auth/change-password (ChangePasswordRequestDto). */
export type ChangePasswordPayload = {
  identifier: string;
  code: string;
  password: string;
};
