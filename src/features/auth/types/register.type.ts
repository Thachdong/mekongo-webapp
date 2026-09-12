export const REGISTER_TYPES = ["EMAIL", "PHONE"] as const;
export type RegisterType = (typeof REGISTER_TYPES)[number];

export const PROFILE_TYPES = ["INDIVIDUAL", "DISTRIBUTOR", "FACTORY"] as const;
export type ProfileType = (typeof PROFILE_TYPES)[number];

export type RegisterFormValues = {
  loginType: RegisterType;
  identifier: string;
  password: string;
  profileType: ProfileType;
  displayName: string;
  avatar: File | null;
  province: string;
  ward: string;
  details: string;
};

/**
 * Payload for POST /auth/register (RegisterRequestDto).
 * `avatar` has no field on this endpoint — dropped before sending.
 * `provinceCode` is required by the API but has no UI yet (province/ward are
 * temporary text fields, see register.validation.ts) — placeholder until a
 * real province select lands.
 */
export type RegisterPayload = {
  loginType: RegisterType;
  identifier: string;
  password: string;
  profileType: ProfileType;
  label: string;
  province: string;
  provinceCode: number;
  ward: string;
  details: string;
};

/** POST /auth/register success response (RegisterResponseDto). */
export type RegisterResponseDto = {
  accountId: string;
  otpId: string;
  otpExpiredAt: string;
};
