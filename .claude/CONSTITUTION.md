# Project Constitution

Quy tắc kiến trúc bắt buộc cho toàn bộ codebase. Mọi PR / code do người hoặc AI agent viết phải tuân theo tài liệu này. Đây là base layer — chưa cần đầy đủ tính năng, nhưng mọi phần được thêm vào phải đi đúng khuôn dưới đây.

## 1. Architecture — Feature-based

- Code chia theo `features/<feature-name>`, không chia theo loại file (không có folder `controllers/`, `services/` dùng chung cho toàn app).
- Mỗi feature là một lát cắt dọc (vertical slice), tự chứa phần logic của nó: components (có tương tác data/repository), repository, hooks, types riêng của feature đó.
- Không bắt buộc feature nào cũng phải đầy đủ tất cả các layer — chỉ tạo layer khi feature thực sự cần.

Cấu trúc gợi ý cho một feature:

```
features/<feature-name>/
  components/        # UI có tương tác data/repository của riêng feature
  repositories/       # gọi API cho feature này
  hooks/               # hook riêng của feature (dùng repository)
  types/               # type/schema riêng của feature
  validations/         # joi schema cho form của feature
```

- Component thuần UI, tái sử dụng nhiều feature → đưa lên `shared/components` (atomic) hoặc `widgets/` (xem mục 6, 7).

## 2. BFF (Backend For Frontend)

Next.js route handlers đóng vai trò BFF, xử lý authen bằng cookie (`accessToken` + `refreshToken`), không expose token cho client JS.

### 2.1 Login route

- Route riêng (vd `app/api/auth/login/route.ts`) nhận credentials, gọi API backend thật, nhận `accessToken` + `refreshToken`.
- Set cả hai token vào cookie `httpOnly`, `secure`, `sameSite` phù hợp. Client không bao giờ đọc trực tiếp token từ JS.

### 2.2 Refresh-token middleware

- `middleware.ts` (root) kiểm tra `accessToken` mỗi request tới route cần authen.
- Khi `accessToken` hết hạn nhưng `refreshToken` còn hạn → middleware tự gọi API refresh, set lại cookie mới trước khi cho request đi tiếp.
- Khi cả hai hết hạn/invalid → redirect về trang login hoặc trả 401 tuỳ loại route (page vs API).

### 2.3 Proxy catch-all route

- Route catch-all (vd `app/api/proxy/[...path]/route.ts`) nhận mọi request client gửi lên BFF, đọc `accessToken` từ cookie, gắn `Authorization: Bearer <token>` vào header, forward sang API backend thật.
- Đây là điểm duy nhất client cần gọi tới cho các API cần auth — client không tự gắn Bearer token.

## 3. Repository pattern

- Mọi giao tiếp API đi qua repository, **không được gọi API trực tiếp trong component** (không `fetch`/`axios` rải rác trong component/hook UI).
- Mỗi repository là 1 module xuất các hàm gọi API cho 1 domain/feature, dùng axios instance đã wrap sẵn (mục 4).
- Repository được thiết kế để gọi được ở **cả client và server component**:
  - **Client component**: gọi thẳng repository, dùng axios client singleton (đã có cookie/token qua BFF, không cần truyền token thủ công).
  - **Server component**: repository nhận thêm `token` qua tham số, lấy token này thông qua một **HOC** wrap server component (HOC đọc cookie ở server, truyền token xuống). Không tự ý đọc cookie rải rác trong nhiều nơi.

## 4. Axios instances

- **Client instance**: singleton, tạo 1 lần dùng chung toàn app cho mọi client component. Có interceptor xử lý lỗi chung, redirect khi 401, v.v. Gọi qua BFF proxy (mục 2.3), không cần tự gắn Bearer.
- **Server instance**: không dùng chung 1 singleton mang state — vẫn có thể là 1 instance dùng chung vì **không có interceptor** phía server (mỗi lần gọi, token được truyền vào qua tham số/HOC, không lưu state toàn cục). Không set token mặc định lên instance dùng chung.

## 5. WebSocket

- Dùng token riêng biệt cho kết nối WebSocket, **không dùng chung** `accessToken`/`refreshToken` của HTTP.
- Token WebSocket có **lifetime ngắn**, cấp riêng qua endpoint dành cho việc này, hết hạn phải xin cấp lại — không refresh kiểu giống access token HTTP.

## 6. Wrap external packages

- Mọi package bên ngoài có tương tác với API hoặc resource bên ngoài (axios, socket client, SDK bên thứ ba, storage client, v.v.) phải được wrap lại trong `shared/libs`, không import thẳng package đó ở nơi khác trong app.
- Mục đích: đổi/upgrade package chỉ sửa 1 chỗ, kiểm soát được interface dùng trong toàn app.

## 7. Form & Validation

- Dùng **react-hook-form** để quản lý form.
- Dùng **joi** để định nghĩa schema validate, resolver nối joi với react-hook-form (`@hookform/resolvers/joi`).
- Schema joi đặt cùng feature liên quan (`features/<feature>/validations`), tái sử dụng schema con qua `shared/libs` nếu dùng nhiều nơi.

## 8. UI — Atomic Design & shadcn

- `shared/components` tổ chức theo Atomic Design, chỉ chứa UI thuần (không gọi repository/data):
  - `atoms/` — UI nhỏ nhất, không chia nhỏ thêm được (Button, Input, Badge...).
  - `molecules/` — tổ hợp vài atoms thành 1 khối có nghĩa (SearchBox, FormField...).
  - `organisms/` — khối UI lớn hơn, có thể tổ hợp molecules/atoms (Header, Sidebar...).
- Component có tương tác data/repository (dù dùng UI atomic bên trong) đặt ở `features/<feature>/components`, không đặt trong `shared/components`.
- UI base dựng bằng **shadcn** — thêm component qua shadcn CLI, tuỳ biến trong `shared/components/atoms` hoặc `molecules` tương ứng, không fork/copy tay từ nơi khác.

### 8.1 SCSS

- Ưu tiên Tailwind utility class trước. Chỉ dùng SCSS (`*.module.scss`, CSS Modules) khi Tailwind không diễn đạt được (selector phức tạp, keyframes dài, style phụ thuộc lẫn nhau nhiều dòng).
- File `*.module.scss` đặt cạnh component dùng nó (`Component.tsx` + `Component.module.scss`), import class qua `styles.xxx`, không viết global class ngoài `app/globals.css`.
- Không định nghĩa lại design token (màu, spacing, radius...) bằng SCSS variable — luôn lấy từ CSS variable đã khai báo ở `app/globals.css` (mục màu) qua `var(--tên-token)`.

## 9. Widgets — component dùng chung nhiều feature

- Component có tương tác data/repository nhưng được dùng bởi **từ 2 feature trở lên** → đặt ở `widgets/<widget-name>`, không lặp lại trong từng feature.
- Widget khác `shared/components` ở chỗ: widget được phép có data/repository, `shared/components` thì không.

## 10. Tổng hợp cấu trúc thư mục

```
src/
  app/                         # Next.js routes (page + BFF route handlers)
    api/
      auth/login/route.ts       # 2.1 login route
      proxy/[...path]/route.ts  # 2.3 proxy catch-all
  middleware.ts                 # 2.2 refresh-token middleware
  features/
    <feature>/
      components/
      repositories/
      hooks/
      types/
      validations/
  widgets/
    <widget-name>/
  shared/
    components/
      atoms/
      molecules/
      organisms/
    hooks/
    libs/                        # wrap external packages (axios, socket, sdk...)
    types/
    utils/
  providers/
```

Mọi thay đổi kiến trúc lệch khỏi tài liệu này cần cập nhật lại file này trước, không code lệch rồi để tài liệu lỗi thời.
