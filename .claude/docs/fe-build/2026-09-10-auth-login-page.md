# Trang Login (auth/login) — Toggle LoginType, Identifier, Password, navigate "/", protect /profile

Status: done

## 1. UI
- [x] `@/features/auth/components/login-form.tsx` — form login: Toggle loginType, Input identifier, PasswordInput password, Button submit, links Register + Reset Password
- [x] `@/app/auth/login/page.tsx` — route `/auth/login`, render `LoginForm`
- [x] `@/app/(main)/profile/page.tsx` — placeholder tối thiểu, route bị proxy bảo vệ

## 2. Logic
- [x] `@/features/auth/types/login.type.ts` — `LoginType` (re-export `RegisterType`), `LoginFormValues`, `LoginPayload`, `LoginResult`
- [x] `@/features/auth/validations/login.validation.ts` — Joi schema
- [x] sửa `@/features/auth/repositories/auth.repository.ts` — thêm `login()` (client, override baseURL để gọi `/api/auth/login`)
- [x] `@/features/auth/hooks/use-login.ts` — gọi repository, `router.push("/")` khi thành công

## 3. Khác
- [x] route BFF `@/app/api/auth/login/route.ts` — set httpOnly `accessToken`/`refreshToken` cookie
- [x] `@/proxy.ts` (root, thay `middleware.ts` rỗng — Next 16 đổi tên middleware→proxy) — bảo vệ `/profile`, refresh-token optimistic check theo CONSTITUTION §2.2
- [x] xoá thư mục `middleware.ts` rỗng (dead leftover)

## Chunk order
1. `login.type.ts` + `login.validation.ts`
2. sửa `auth.repository.ts`
3. `use-login.ts`
4. `login-form.tsx`
5. `app/auth/login/page.tsx`
6. `app/api/auth/login/route.ts`
7. `proxy.ts` + xoá `middleware.ts` rỗng + `app/(main)/profile/page.tsx`
