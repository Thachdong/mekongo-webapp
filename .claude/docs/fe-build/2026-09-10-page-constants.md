# Khai báo constant PAGES (pathname + title) dùng cho navigate và metadata

Status: done

## 1. Constant (file mới)
- [x] `src/shared/constants/page.constant.ts` — object `PAGES` chứa pathname + title cho từng page, nguồn duy nhất dùng cho navigate & metadata.

## 2. Áp dụng cho metadata (sửa file có sẵn)
- [x] `src/app/auth/login/page.tsx` — metadata.title lấy từ `PAGES.LOGIN.title`
- [x] `src/app/auth/register/page.tsx` — metadata.title lấy từ `PAGES.REGISTER.title`
- [x] `src/app/auth/activate/page.tsx` — metadata.title lấy từ `PAGES.ACTIVATE.title`
- [x] `src/app/(main)/profile/page.tsx` — metadata.title lấy từ `PAGES.PROFILE.title`

## 3. Áp dụng cho navigate (sửa file có sẵn)
- [x] `src/app/auth/layout.tsx` — Link href="/" → `PAGES.HOME.pathname`
- [x] `src/features/auth/components/login-form.tsx` — href tới register/reset-password/activate → `PAGES.*.pathname`
- [x] `src/features/auth/components/register-form.tsx` — href liên quan → `PAGES.*.pathname`
- [x] `src/features/auth/hooks/use-login.ts` — router.push("/") → `PAGES.HOME.pathname`
- [x] `src/features/auth/hooks/use-register.ts` — router.push("/auth/activate") → `PAGES.ACTIVATE.pathname`
- [x] `src/features/auth/hooks/use-activate.ts` — router.push("/auth/login") → `PAGES.LOGIN.pathname`
