# Cài đặt & cấu hình React Query, áp dụng cho auth hooks

Status: done

## 1. UI
(không có)

## 2. Logic
- [x] `package.json` — thêm `@tanstack/react-query@^5.102.8`, `@tanstack/react-query-devtools@^5.102.8`
- [x] `src/providers/query-client.provider.tsx` — tạo `QueryClient` + export `QueryProvider` client component (đổi đuôi `.ts` → `.tsx` vì cần JSX)
- [x] `src/app/layout.tsx` — wire `QueryProvider` vào root layout
- [x] `src/features/auth/hooks/use-login.ts` — chuyển sang `useMutation`
- [x] `src/features/auth/hooks/use-register.ts` — chuyển sang `useMutation`
- [x] `src/features/auth/hooks/use-activate.ts` — chuyển `activate` + `resend` sang `useMutation`

## 3. Khác
- dependency mới: `@tanstack/react-query`, `@tanstack/react-query-devtools`
- env var mới: không
- test/storybook: không
