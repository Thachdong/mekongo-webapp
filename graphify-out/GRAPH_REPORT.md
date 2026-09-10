# Graph Report - webapp  (2026-09-10)

## Corpus Check
- 71 files · ~17,741 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 515 nodes · 648 edges · 38 communities (28 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.69)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `161d69ba`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Dev Tooling Dependencies
- Chat API Endpoints
- Component Aliases & UI Menu
- Account API Endpoints
- Runtime Dependencies
- Auth API Endpoints
- Architecture Constitution Rules
- AI Agent Instructions
- Comment API Endpoints
- TypeScript Compiler Config
- TS Path Aliases
- TSConfig Include Files
- Package Scripts
- Root Layout Component
- BFF Proxy Route
- Home Page
- ESLint Config
- Next.js Config
- PostCSS Config
- Axios Client Singleton
- Storybook Main Config
- Storybook Preview Config
- Query Client Provider
- Socket Provider
- File Icon Asset
- Globe Icon Asset
- Next.js Logo Asset
- Vercel Logo Asset
- Window Icon Asset
- Shared Utils
- auth/layout.tsx
- profile/page.tsx
- query-client.provider.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `PAGES` - 11 edges
3. `Project Constitution` - 11 edges
4. `/fe-build` - 11 edges
5. `Mekongo API OpenAPI spec (v0.0.1)` - 11 edges
6. `AccountController` - 11 edges
7. `paths` - 9 edges
8. `include` - 9 edges
9. `AuthController` - 9 edges
10. `Button()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `CodeInput()` --references--> `react`  [EXTRACTED]
  src/shared/components/molecules/code-input.tsx → package.json
- `ControlledAvatarFileInput()` --references--> `react`  [EXTRACTED]
  stories/shared/components/molecules/avatar-file-input.stories.tsx → package.json
- `AvatarFileInput()` --references--> `react`  [EXTRACTED]
  src/shared/components/molecules/avatar-file-input.tsx → package.json
- `PasswordInput()` --references--> `react`  [EXTRACTED]
  src/shared/components/molecules/password-input.tsx → package.json
- `ActivateForm()` --calls--> `useActivate()`  [EXTRACTED]
  src/features/auth/components/activate-form.tsx → src/features/auth/hooks/use-activate.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Mekongo backend auth API surface (register/login/refresh/logout/ws-token)** — guide_openapi_authcontroller, guide_openapi_authcontroller_login, guide_openapi_authcontroller_refresh, guide_openapi_authcontroller_logout, guide_openapi_authcontroller_issuewstoken, guide_openapi_security_access_token [EXTRACTED 1.00]

## Communities (38 total, 10 thin omitted)

### Community 0 - "Dev Tooling Dependencies"
Cohesion: 0.04
Nodes (45): @chromatic-com/storybook, eslint, eslint-config-next, eslint-plugin-storybook, devDependencies, @chromatic-com/storybook, eslint, eslint-config-next (+37 more)

### Community 1 - "Chat API Endpoints"
Cohesion: 0.05
Nodes (46): AppController, GET / (AppController_getHello), ChatController, GET /chats/messages — Lịch sử tin nhắn của 1 room, phân trang, GET /chats/rooms — Danh sách room chat của tôi, GET /chats/unread-count — Số room có tin nhắn chưa đọc, POST /chats/rooms/read — Đánh dấu 1 room đã đọc, ChatMessageResponseDto (+38 more)

### Community 2 - "Component Aliases & UI Menu"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 3 - "Account API Endpoints"
Cohesion: 0.10
Nodes (22): AccountController, POST /account/change-password — Đổi mật khẩu account đang đăng nhập, POST /account/address — Tạo address mới, POST /account/profile — Tạo profile mới (max 3 per account), DELETE /account/address — Xoá address, GET /account — Lấy thông tin account đang đăng nhập, GET /account/address — Lấy danh sách address, GET /account/profile — Lấy danh sách profile (+14 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (39): axios, @base-ui/react, class-variance-authority, cn, @hookform/resolvers, joi, lucide-react, next (+31 more)

### Community 5 - "Auth API Endpoints"
Cohesion: 0.07
Nodes (35): ActivateForm(), DEFAULT_VALUES, formatCountdown(), DEFAULT_VALUES, LoginForm(), useLogin(), Button(), buttonVariants (+27 more)

### Community 6 - "Architecture Constitution Rules"
Cohesion: 0.09
Nodes (21): DEFAULT_VALUES, PROFILE_TYPE_LABELS, TODO: province/ward are temporary text fields (no real select yet),, RegisterForm(), useRegister(), PROFILE_TYPES, RegisterFormValues, registerValidationSchema (+13 more)

### Community 7 - "AI Agent Instructions"
Cohesion: 0.13
Nodes (16): Non-standard Next.js breaking-changes warning, node_modules/next/dist/docs/ reference guides, generate-agent-files.js regenerates AGENTS.md block on next dev, Next.js (modified/non-standard fork used in this project), webapp CLAUDE.md project instructions, graphify-out/GRAPH_REPORT.md broad architecture doc, graphify-out/ knowledge graph (god nodes, community structure), graphify query / path / explain commands (+8 more)

### Community 8 - "Comment API Endpoints"
Cohesion: 0.10
Nodes (21): ActivateRequestDto, AuthController, POST /auth/activate — Xác thực OTP kích hoạt account, POST /auth/change-password — Xác thực OTP và đổi mật khẩu, POST /auth/ws-token — Cấp wsToken riêng biệt khỏi accessToken cho WebSocket gateway, POST /auth/login — Đăng nhập, trả accessToken+refreshToken, POST /auth/logout — Thu hồi refresh token của session hiện tại, POST /auth/refresh — Cấp lại accessToken+refreshToken mới (+13 more)

### Community 9 - "TypeScript Compiler Config"
Cohesion: 0.07
Nodes (29): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+21 more)

### Community 10 - "TS Path Aliases"
Cohesion: 0.12
Nodes (17): ./src/features/*, ./src/providers/*, ./src/shared/*, ./src/shared/components/*, ./src/shared/hooks/*, ./src/shared/libs/*, ./src/shared/types/*, ./src/shared/utils/* (+9 more)

### Community 11 - "TSConfig Include Files"
Cohesion: 0.15
Nodes (5): metadata, metadata, metadata, metadata, PAGES

### Community 12 - "Package Scripts"
Cohesion: 0.09
Nodes (27): useActivate(), ApiEnvelope, authRepository, ActivateFormValues, ActivatePayload, ActivationHandoff, RESEND_PURPOSES, ResendPayload (+19 more)

### Community 13 - "Root Layout Component"
Cohesion: 0.12
Nodes (15): 10. Tổng hợp cấu trúc thư mục, 1. Architecture — Feature-based, 2.1 Login route, 2.2 Refresh-token middleware, 2.3 Proxy catch-all route, 2. BFF (Backend For Frontend), 3. Repository pattern, 4. Axios instances (+7 more)

### Community 14 - "BFF Proxy Route"
Cohesion: 0.17
Nodes (11): /fe-build, Step 0 — Enter plan mode, Step 1 — Reuse check (before planning), Step 2 — Placement decisions (apply CONSTITUTION.md), Step 3 — File naming (per CONSTITUTION.md §1, kebab-case), Step 4 — Report format, Step 5 — Save report to file, Step 6 — Approval gate (native plan-mode UI) (+3 more)

### Community 15 - "Home Page"
Cohesion: 0.19
Nodes (6): ApiEnvelope, AUTH_COOKIE_OPTIONS, LoginResponseDto, AUTH_COOKIE_OPTIONS, config, axiosServer

### Community 19 - "Axios Client Singleton"
Cohesion: 0.33
Nodes (5): 1. UI, 2. Logic, 3. Khác, Build page auth/register (+ shared auth layout), Chunk order

### Community 22 - "Query Client Provider"
Cohesion: 0.33
Nodes (5): 1. UI, 2. Logic, 3. Khác, Chunk order, Trang Login (auth/login) — Toggle LoginType, Identifier, Password, navigate "/", protect /profile

### Community 23 - "Socket Provider"
Cohesion: 0.40
Nodes (4): 1. UI, 2. Logic, 3. Khác, Activate page (auth/activate) — OTP code activation after register

### Community 29 - "Shared Utils"
Cohesion: 0.29
Nodes (5): geistMono, geistSans, metadata, queryClientConfig, QueryProvider()

### Community 32 - "auth/layout.tsx"
Cohesion: 0.13
Nodes (14): react, react, AvatarFileInput(), AvatarFileInputProps, PasswordInput(), ControlledAvatarFileInput(), Default, Disabled (+6 more)

### Community 33 - "profile/page.tsx"
Cohesion: 0.40
Nodes (4): 1. Constant (file mới), 2. Áp dụng cho metadata (sửa file có sẵn), 3. Áp dụng cho navigate (sửa file có sẵn), Khai báo constant PAGES (pathname + title) dùng cho navigate và metadata

### Community 36 - "query-client.provider.ts"
Cohesion: 0.40
Nodes (4): 1. UI, 2. Logic, 3. Khác, Cài đặt & cấu hình React Query, áp dụng cho auth hooks

## Ambiguous Edges - Review These
- `AGENTS.md` → `README.md`  [AMBIGUOUS]
  AGENTS.md · relation: conceptually_related_to

## Knowledge Gaps
- **255 isolated node(s):** `config`, `preview`, `$schema`, `style`, `rsc` (+250 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `AGENTS.md` and `README.md`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Runtime Dependencies` to `auth/layout.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Why does `react` connect `auth/layout.tsx` to `Runtime Dependencies`, `Auth API Endpoints`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Tooling Dependencies` to `Runtime Dependencies`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `config`, `preview`, `$schema` to the rest of the system?**
  _255 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Tooling Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `Chat API Endpoints` be split into smaller, more focused modules?**
  _Cohesion score 0.04830917874396135 - nodes in this community are weakly interconnected._