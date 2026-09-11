import type { RegisterType } from "@/features/auth/types/register.type";

export type ActivateFormValues = {
  identifier: string;
  loginType: RegisterType;
  code: string;
};

/** sessionStorage key: hand-off {identifier, loginType, registeredAt} from register → activate without exposing it in the URL. */
export const ACTIVATION_STORAGE_KEY = "auth:activation";

export type ActivationHandoff = {
  identifier: string;
  loginType: RegisterType;
  /** ISO timestamp of the successful register call — anchors the resend countdown on the activate page. */
  registeredAt: string;
};

/** Payload for POST /auth/activate (ActivateRequestDto). */
export type ActivatePayload = {
  identifier: string;
  code: string;
};

export const RESEND_PURPOSES = ["ACCOUNT_VERIFICATION", "RESET_PASSWORD"] as const;
export type ResendPurpose = (typeof RESEND_PURPOSES)[number];

/** Payload for POST /verification/re-send (ReSendRequestDto). */
export type ResendPayload = {
  identifier: string;
  purpose: ResendPurpose;
};
