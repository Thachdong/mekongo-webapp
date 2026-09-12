# Activate page (auth/activate) — OTP code activation after register

Status: done

> Deviation (theo yêu cầu user sau khi duyệt plan): CodeInput đổi từ single-input thin-wrapper sang 6 ô vuông riêng biệt, auto-focus ô kế tiếp (kiểu OTP mobile). Component giờ là controlled (`value`/`onChange`), phải dùng RHF `Controller` trong activate-form.tsx thay vì `register()` trực tiếp — giống pattern `avatar-file-input.tsx`, không phải `password-input.tsx` nữa.
>
> Bug fix theo test case user báo (click ô 3 → gõ số → bị điền vào ô 1): nguyên nhân do `value` nội bộ compact digit lại (join bỏ ô trống) làm mất vị trí. Sửa bằng cách giữ `value` cố định 6 ký tự, pad " " cho ô trống, nên gõ ở ô bất kỳ giữ đúng vị trí, gõ tiếp nhảy sang ô kế (index+1). Đã verify bằng type-check, chưa chạy Storybook thủ công.
>
> Deviation (theo yêu cầu user): không đưa identifier/loginType lên query string (lộ trên URL/history). Đổi sang sessionStorage — `use-register.ts` set trước khi `router.push("/auth/activate")` (không query), `activate-form.tsx` đọc + xoá sau khi dùng. Thêm wrapper `session-storage.ts` theo CONSTITUTION §6 (storage client phải wrap qua shared/libs). Thêm `ACTIVATION_STORAGE_KEY`/`ActivationHandoff` vào `activate.type.ts`.
>
> Deviation (theo yêu cầu user): khi không có sessionStorage handoff (vào thẳng /auth/activate, hoặc đã dùng), form hiện thêm Toggle chọn loginType + cho phép nhập identifier (giống register-form), field identifier chuyển từ readonly sang editable. `ActivateFormValues` thêm `loginType`, `activate.validation.ts` thêm điều kiện email/phone giống register.validation.ts (chỉ `identifier`+`code` được gửi lên API activate, loginType chỉ dùng cho UI/validate).

## 1. UI
- [x] @/shared/components/molecules/code-input.tsx — 6 ô nhập số riêng biệt (OTP-style), auto-focus ô kế tiếp, controlled value/onChange
- [x] @/features/auth/components/activate-form.tsx — form: đọc identifier/loginType từ sessionStorage (rồi xoá); nếu có → identifier readonly + label theo loginType; nếu không → hiện Toggle loginType + identifier editable; CodeInput, nút Activate, countdown+resend
- [x] @/features/auth/validations/activate.validation.ts — Joi schema {loginType, identifier (email/phone theo loginType), code 6 digit}

## 2. Logic
- [x] @/features/auth/types/activate.type.ts — ActivateFormValues, ActivatePayload, ResendPayload, ACTIVATION_STORAGE_KEY, ActivationHandoff
- [x] @/features/auth/repositories/auth.repository.ts — thêm activate(), resendVerification() (sửa file có sẵn)
- [x] @/features/auth/hooks/use-activate.ts — submit + resend + countdown 5 phút (client)
- [x] @/shared/libs/storage/session-storage.ts — wrap sessionStorage (get/set/remove, JSON + SSR-safe)

## 3. Khác
- [x] @/app/auth/activate/page.tsx — route mới, render ActivateForm (không đọc query nữa)
- [x] UX tweak (theo yêu cầu user): CodeInput canh giữa (`self-center`); autoFocus — có handoff focus ô code đầu, không có focus identifier; nhập đủ + hợp lệ 6 số tự focus nút Activate (`CodeInput` thêm props `autoFocus`, `onComplete`)
- [x] @/features/auth/hooks/use-register.ts — sửa: lưu identifier/loginType vào sessionStorage trước khi push("/auth/activate")
- [x] stories: @/stories/shared/components/molecules/code-input.stories.tsx
- middleware/proxy.ts thay đổi: không
- env var mới: không
