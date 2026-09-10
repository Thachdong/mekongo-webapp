# Build page auth/register (+ shared auth layout)

Status: planned

Flags:
- avatar: RegisterRequestDto (openapi) không có field avatar → form giữ UI chọn file nhưng không gửi trong payload register (chưa wire upload).
- provinceCode: API bắt buộc, không có trong spec UI (province/ward tạm là text field theo TODO của bạn) → gửi placeholder tạm, cần fix khi có select thật.

## 1. UI
- [ ] @/app/auth/layout.tsx — fixed header (PLACEHOLDER logo + back-to-home link) + centered max-w-1024 scrollable bordered content card, dùng chung mọi page auth
- [ ] @/app/auth/register/page.tsx — route entry, render RegisterForm
- [ ] @/shared-components/atoms/{button,input,label,select,textarea,toggle-group}.tsx — shadcn add, primitive còn thiếu trong repo
- [ ] @/shared-components/molecules/password-input.tsx — Input + eye icon toggle, reusable
- [ ] @/shared-components/molecules/avatar-file-input.tsx — file picker + preview, optional, reusable
- [ ] @/features/auth/components/register-form.tsx — toggle EMAIL/PHONE, identifier, password, profile type select, displayName, avatar, address (province/ward text + TODO comment cho select), details textarea, error dưới title, bottom links login/reset-password
- [ ] @/features/auth/validations/register.validation.ts — joi: identifier theo loginType, password strength cơ bản

## 2. Logic
- [ ] @/features/auth/types/register.type.ts — RegisterType, ProfileType, RegisterFormValues, RegisterPayload
- [ ] @/features/auth/repositories/auth.repository.ts — register(payload) qua axiosClient POST /auth/register (client)
- [ ] @/features/auth/hooks/use-register.ts — gọi repository, loading/error state, success → router.push("/auth/activate")

## 3. Khác
- [ ] package.json: thêm react-hook-form, joi, @hookform/resolvers (chưa cài, cần cho §7)
- test/storybook: không
