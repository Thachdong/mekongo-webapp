import Joi from "joi";

import { REGISTER_TYPES } from "@/features/auth/types/register.type";
import type { LoginFormValues } from "@/features/auth/types/login.type";

const PHONE_PATTERN = /^[0-9]{9,11}$/;

export const loginValidationSchema = Joi.object<LoginFormValues>({
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
  password: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập mật khẩu",
  }),
});
