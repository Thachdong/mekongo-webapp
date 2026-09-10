# Build page auth/register (+ shared auth layout)

Status: in progress

## Chunk order
1. shadcn atoms: button, input, label, select, textarea, toggle-group
2. molecules: password-input, avatar-file-input
3. deps: react-hook-form, joi, @hookform/resolvers
4. types + validation: register.type.ts, register.validation.ts
5. repository: auth.repository.ts
6. hook: use-register.ts
7. app/auth/layout.tsx
8. features/auth/components/register-form.tsx
9. app/auth/register/page.tsx

Flags:
- avatar: RegisterRequestDto (openapi) không có field avatar → form giữ UI chọn file nhưng không gửi trong payload register (chưa wire upload).
- provinceCode: API bắt buộc, không có trong spec UI (province/ward tạm là text field theo TODO của bạn) → gửi placeholder tạm, cần fix khi có select thật.

## 1. UI
- [ ] @/app/auth/layout.tsx — fixed header (PLACEHOLDER logo + back-to-home link) + centered max-w-1024 scrollable bordered content card, dùng chung mọi page auth
- [ ] @/app/auth/register/page.tsx — route entry, render RegisterForm
- [x] @/shared-components/atoms/{button,input,label,select,textarea,toggle}.tsx — shadcn add, primitive còn thiếu trong repo (toggle gộp chung group+item vào 1 file theo yêu cầu, border quanh cả nhóm, active item highlight bg+text)
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
- [x] test/storybook: stories/shared/components/atoms/{button,input,label,select,textarea,toggle}.stories.tsx — theo yêu cầu, cover các atom vừa tạo (bổ sung sau khi report, không nằm trong plan gốc)
