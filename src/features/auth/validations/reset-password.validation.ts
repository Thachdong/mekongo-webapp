import Joi from "joi";

import type { ResetPasswordFormValues } from "@/features/auth/types/reset-password.type";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{9,11}$/;

export const resetPasswordValidationSchema = Joi.object<ResetPasswordFormValues>({
  identifier: Joi.string()
    .required()
    .pattern(new RegExp(`(${EMAIL_PATTERN.source})|(${PHONE_PATTERN.source})`))
    .messages({
      "string.empty": "Vui lòng nhập email hoặc số điện thoại",
      "string.pattern.base": "Email hoặc số điện thoại không hợp lệ",
    }),
});
