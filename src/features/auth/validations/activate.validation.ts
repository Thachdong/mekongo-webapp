import Joi from "joi";

import type { ActivateFormValues } from "@/features/auth/types/activate.type";

const CODE_PATTERN = /^[0-9]{6}$/;

export const activateValidationSchema = Joi.object<ActivateFormValues>({
  identifier: Joi.string().required(),
  code: Joi.string().pattern(CODE_PATTERN).required().messages({
    "string.pattern.base": "Mã kích hoạt phải gồm 6 chữ số",
  }),
});
