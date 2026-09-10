# Activate page (auth/activate) — OTP code activation after register

Status: in progress

> Deviation (theo yêu cầu user sau khi duyệt plan): CodeInput đổi từ single-input thin-wrapper sang 6 ô vuông riêng biệt, auto-focus ô kế tiếp (kiểu OTP mobile). Component giờ là controlled (`value`/`onChange`), phải dùng RHF `Controller` trong activate-form.tsx thay vì `register()` trực tiếp — giống pattern `avatar-file-input.tsx`, không phải `password-input.tsx` nữa.
>
> Bug fix theo test case user báo (click ô 3 → gõ số → bị điền vào ô 1): nguyên nhân do `value` nội bộ compact digit lại (join bỏ ô trống) làm mất vị trí. Sửa bằng cách giữ `value` cố định 6 ký tự, pad " " cho ô trống, nên gõ ở ô bất kỳ giữ đúng vị trí, gõ tiếp nhảy sang ô kế (index+1). Đã verify bằng type-check, chưa chạy Storybook thủ công.

## 1. UI
- [x] @/shared/components/molecules/code-input.tsx — 6 ô nhập số riêng biệt (OTP-style), auto-focus ô kế tiếp, controlled value/onChange
- [ ] @/features/auth/components/activate-form.tsx — form: identifier readonly + label theo loginType, CodeInput, nút Activate, countdown+resend
- [x] @/features/auth/validations/activate.validation.ts — Joi schema {identifier, code 6 digit}

## 2. Logic
- [x] @/features/auth/types/activate.type.ts — ActivateFormValues, ActivatePayload, ResendPayload
- [ ] @/features/auth/repositories/auth.repository.ts — thêm activate(), resendVerification() (sửa file có sẵn)
- [ ] @/features/auth/hooks/use-activate.ts — submit + resend + countdown 5 phút (client)

## 3. Khác
- [ ] @/app/auth/activate/page.tsx — route mới, đọc identifier/loginType từ query, render ActivateForm
- [ ] @/features/auth/hooks/use-register.ts — sửa router.push kèm query identifier/loginType
- [x] stories: @/stories/shared/components/molecules/code-input.stories.tsx
- middleware/proxy.ts thay đổi: không
- env var mới: không
