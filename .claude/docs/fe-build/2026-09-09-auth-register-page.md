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
- [x] @/shared-components/molecules/password-input.tsx — Input + eye icon toggle, reusable
- [x] @/shared-components/molecules/avatar-file-input.tsx — file picker + preview (circular avatar), optional, reusable, controlled (value/onChange)
- [ ] @/features/auth/components/register-form.tsx — toggle EMAIL/PHONE, identifier, password, profile type select, displayName, avatar, address (province/ward text + TODO comment cho select), details textarea, error dưới title, bottom links login/reset-password
- [x] @/features/auth/validations/register.validation.ts — joi: identifier theo loginType, password strength cơ bản

## 2. Logic
- [x] @/features/auth/types/register.type.ts — RegisterType, ProfileType, RegisterFormValues, RegisterPayload
- [x] @/features/auth/repositories/auth.repository.ts — register(payload) qua axiosClient POST /auth/register (client), trả về RegisterResponseDto (accountId/otpId/otpExpiredAt, thêm vào register.type.ts)
- [x] @/features/auth/hooks/use-register.ts — gọi repository, loading/error state, success → router.push("/auth/activate")
- [x] @/shared-libs/axios/error.ts — getApiErrorMessage(), trích message lỗi từ axios error (400: string[], 500: string); cần thiết vì §6 cấm import thẳng axios ngoài shared/libs (bổ sung phát sinh khi làm hook, không nằm trong plan gốc)

## 3. Khác
- [x] package.json: thêm react-hook-form@7.87.0, joi@18.2.8, @hookform/resolvers@5.9.1
- [x] test/storybook: stories/shared/components/atoms/{button,input,label,select,textarea,toggle}.stories.tsx + stories/shared/components/molecules/{password-input,avatar-file-input}.stories.tsx — theo yêu cầu, cover các component vừa tạo (bổ sung sau khi report, không nằm trong plan gốc)
