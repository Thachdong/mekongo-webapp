import Joi from "joi";

import { REGISTER_TYPES } from "@/features/auth/types/register.type";
import type { ChangePasswordFormValues } from "@/features/auth/types/change-password.type";

const PHONE_PATTERN = /^[0-9]{9,11}$/;
const CODE_PATTERN = /^[0-9]{6}$/;
// basic strong-password rule: 8+ chars, at least one lowercase, one uppercase, one digit
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const changePasswordValidationSchema = Joi.object<ChangePasswordFormValues>({
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
    "string.pattern.base": "Mã xác thực phải gồm 6 chữ số",
  }),
  newPassword: Joi.string().pattern(PASSWORD_PATTERN).required().messages({
    "string.pattern.base":
      "Mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số",
  }),
  repeatNewPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Mật khẩu nhập lại không khớp",
    }),
});
