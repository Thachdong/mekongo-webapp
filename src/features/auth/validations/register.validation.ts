import Joi from "joi";

import {
  PROFILE_TYPES,
  REGISTER_TYPES,
  type RegisterFormValues,
} from "@/features/auth/types/register.type";

const PHONE_PATTERN = /^[0-9]{9,11}$/;
// basic strong-password rule: 8+ chars, at least one lowercase, one uppercase, one digit
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const registerValidationSchema = Joi.object<RegisterFormValues>({
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
  password: Joi.string().pattern(PASSWORD_PATTERN).required().messages({
    "string.pattern.base":
      "Mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số",
  }),
  profileType: Joi.string()
    .valid(...PROFILE_TYPES)
    .required(),
  displayName: Joi.string().min(1).max(120).required(),
  avatar: Joi.any().optional().allow(null),
  province: Joi.string().min(1).required(),
  ward: Joi.string().min(1).required(),
  details: Joi.string().min(1).required(),
});
