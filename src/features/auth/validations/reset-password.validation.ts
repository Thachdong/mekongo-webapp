import Joi from "joi";

import { REGISTER_TYPES } from "@/features/auth/types/register.type";
import type { ResetPasswordFormValues } from "@/features/auth/types/reset-password.type";

const PHONE_PATTERN = /^[0-9]{9,11}$/;

export const resetPasswordValidationSchema = Joi.object<ResetPasswordFormValues>({
  loginType: Joi.string()
    .valid(...REGISTER_TYPES)
    .required(),
  identifier: Joi.string()
    .when("loginType", {
      is: "EMAIL",
      then: Joi.string().email({ tlds: { allow: false } }).messages({
        "string.email": "Email không hợp lệ",
      }),
      otherwise: Joi.string().pattern(PHONE_PATTERN).messages({
        "string.pattern.base": "Số điện thoại không hợp lệ",
      }),
    })
    .required()
    .messages({
      "string.empty": "Vui lòng nhập email hoặc số điện thoại",
    }),
});
