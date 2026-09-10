export type ActivateFormValues = {
  identifier: string;
  code: string;
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
