import type { RegisterType } from "@/features/auth/types/register.type";

export type LoginType = RegisterType;

export type LoginFormValues = {
  loginType: LoginType;
  identifier: string;
  password: string;
};

/** Payload for POST /auth/login (LoginRequestDto). */
export type LoginPayload = {
  loginType: LoginType;
  identifier: string;
  password: string;
};

/**
 * Response the BFF login route returns to the client — tokens stay server-side
 * as httpOnly cookies (CONSTITUTION.md 2.1), only these fields cross to JS.
 */
export type LoginResult = {
  accountId: string;
  profileId: string | null;
};
