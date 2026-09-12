import Joi from "joi";

import { REGISTER_TYPES } from "@/features/auth/types/register.type";
import type { ActivateFormValues } from "@/features/auth/types/activate.type";

const PHONE_PATTERN = /^[0-9]{9,11}$/;
const CODE_PATTERN = /^[0-9]{6}$/;

export const activateValidationSchema = Joi.object<ActivateFormValues>({
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
    .required(),
  code: Joi.string().pattern(CODE_PATTERN).required().messages({
    "string.pattern.base": "Mã kích hoạt phải gồm 6 chữ số",
  }),
});
