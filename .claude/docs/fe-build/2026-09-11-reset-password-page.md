# Reset Password page (auth/reset-password)

Status: done

## 1. UI
- [x] `src/app/auth/reset-password/page.tsx` — route Next.js, render `ResetPasswordForm`
- [x] `src/features/auth/components/reset-password-form.tsx` — form Identifier + button Reset Password + links Login/Register/Activate

## 2. Logic
- [x] `src/features/auth/types/reset-password.type.ts` — form values, handoff type, storage key
- [x] `src/features/auth/validations/reset-password.validation.ts` — joi validate identifier
- [x] `src/features/auth/hooks/use-reset-password.ts` — useMutation reuse `authRepository.resendVerification` purpose RESET_PASSWORD, onSuccess handoff sessionStorage + navigate change-password

## 3. Khác
- [x] `src/shared/constants/page.constant.ts` — thêm `PAGES.CHANGE_PASSWORD` (chỉ constant, trang đích ngoài scope)

## Chunk order
1. type + validation
2. PAGES.CHANGE_PASSWORD constant
3. hook use-reset-password
4. component reset-password-form
5. page route
