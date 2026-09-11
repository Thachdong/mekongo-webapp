# auth/change-password page

Status: done

## 1. UI
- [x] @/features/auth/components/change-password-form.tsx — header, Toggle Email|Phone, identifier field, New/Repeat password, CodeInput, submit, Login/Register links

## 2. Logic
- [x] @/features/auth/types/change-password.type.ts — ChangePasswordFormValues, ChangePasswordPayload
- [x] @/features/auth/validations/change-password.validation.ts — joi schema
- [x] @/features/auth/repositories/auth.repository.ts — add changePassword()
- [x] @/features/auth/hooks/use-change-password.ts — mutation, session cleanup, redirect

## 3. Khác
- [x] @/app/auth/change-password/page.tsx — page wrapper
