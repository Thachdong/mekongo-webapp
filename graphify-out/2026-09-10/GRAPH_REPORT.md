# Graph Report - .  (2026-09-09)

## Corpus Check
- Corpus is ~9,165 words - fits in a single context window. You may not need a graph.

## Summary
- 304 nodes · 309 edges · 32 communities (20 shown, 12 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.86)
- Token cost: 336,788 input · 0 output

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
- ESLint Config
- Next.js Config
- PostCSS Config
- Axios Client Singleton
- Storybook Main Config
- Storybook Preview Config
- File Icon Asset
- Globe Icon Asset
- Next.js Logo Asset
- Vercel Logo Asset
- Window Icon Asset

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Mekongo API OpenAPI spec (v0.0.1)` - 11 edges
3. `AccountController` - 11 edges
4. `CONSTITUTION.md — Project Constitution` - 10 edges
5. `paths` - 9 edges
6. `include` - 9 edges
7. `AuthController` - 9 edges
8. `scripts` - 7 edges
9. `CommentController` - 7 edges
10. `tailwind` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Login route sets httpOnly accessToken+refreshToken cookies` --shares_data_with--> `POST /auth/login — Đăng nhập, trả accessToken+refreshToken`  [INFERRED]
  CONSTITUTION.md → guide/openapi.yml
- `Root middleware.ts auto-refreshes expired accessToken` --shares_data_with--> `POST /auth/refresh — Cấp lại accessToken+refreshToken mới`  [INFERRED]
  CONSTITUTION.md → guide/openapi.yml
- `Short-lived WebSocket token, separate from HTTP accessToken/refreshToken, no refresh` --shares_data_with--> `POST /auth/ws-token — Cấp wsToken riêng biệt khỏi accessToken cho WebSocket gateway`  [INFERRED]
  CONSTITUTION.md → guide/openapi.yml
- `webapp CLAUDE.md project instructions` --references--> `CONSTITUTION.md — Project Constitution`  [EXTRACTED]
  CLAUDE.md → CONSTITUTION.md
- `Proxy catch-all route forwards Authorization: Bearer <token> to backend` --conceptually_related_to--> `access-token security scheme (Bearer JWT)`  [INFERRED]
  CONSTITUTION.md → guide/openapi.yml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **BFF authentication flow: login route + refresh middleware + proxy catch-all route** — constitution_bff, constitution_login_route, constitution_refresh_token_middleware, constitution_proxy_catch_all_route [EXTRACTED 1.00]
- **Mekongo backend auth API surface (register/login/refresh/logout/ws-token)** — guide_openapi_authcontroller, guide_openapi_authcontroller_login, guide_openapi_authcontroller_refresh, guide_openapi_authcontroller_logout, guide_openapi_authcontroller_issuewstoken, guide_openapi_security_access_token [EXTRACTED 1.00]

## Communities (32 total, 12 thin omitted)

### Community 0 - "Dev Tooling Dependencies"
Cohesion: 0.04
Nodes (45): @chromatic-com/storybook, eslint, eslint-config-next, eslint-plugin-storybook, devDependencies, @chromatic-com/storybook, eslint, eslint-config-next (+37 more)

### Community 1 - "Chat API Endpoints"
Cohesion: 0.08
Nodes (27): AppController, GET / (AppController_getHello), ChatController, GET /chats/messages — Lịch sử tin nhắn của 1 room, phân trang, GET /chats/rooms — Danh sách room chat của tôi, GET /chats/unread-count — Số room có tin nhắn chưa đọc, POST /chats/rooms/read — Đánh dấu 1 room đã đọc, ChatMessageResponseDto (+19 more)

### Community 2 - "Component Aliases & UI Menu"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 3 - "Account API Endpoints"
Cohesion: 0.10
Nodes (22): AccountController, POST /account/change-password — Đổi mật khẩu account đang đăng nhập, POST /account/address — Tạo address mới, POST /account/profile — Tạo profile mới (max 3 per account), DELETE /account/address — Xoá address, GET /account — Lấy thông tin account đang đăng nhập, GET /account/address — Lấy danh sách address, GET /account/profile — Lấy danh sách profile (+14 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.10
Nodes (21): axios, @base-ui/react, class-variance-authority, cn, lucide-react, next, dependencies, axios (+13 more)

### Community 5 - "Auth API Endpoints"
Cohesion: 0.10
Nodes (21): ActivateRequestDto, AuthController, POST /auth/activate — Xác thực OTP kích hoạt account, POST /auth/change-password — Xác thực OTP và đổi mật khẩu, POST /auth/ws-token — Cấp wsToken riêng biệt khỏi accessToken cho WebSocket gateway, POST /auth/login — Đăng nhập, trả accessToken+refreshToken, POST /auth/logout — Thu hồi refresh token của session hiện tại, POST /auth/refresh — Cấp lại accessToken+refreshToken mới (+13 more)

### Community 6 - "Architecture Constitution Rules"
Cohesion: 0.19
Nodes (19): UI Atomic Design (atoms/molecules/organisms) built on shadcn, Axios client singleton (shared, has 401/error interceptor), Axios server instance (stateless, no default token, token passed per call), BFF (Backend For Frontend) pattern via Next.js route handlers, Design tokens as CSS variables in app/globals.css, Top-level repo directory structure (app/, features/, widgets/, shared/, providers/), CONSTITUTION.md — Project Constitution, Feature-based architecture (vertical slices per features/<feature-name>) (+11 more)

### Community 7 - "AI Agent Instructions"
Cohesion: 0.13
Nodes (16): Non-standard Next.js breaking-changes warning, node_modules/next/dist/docs/ reference guides, generate-agent-files.js regenerates AGENTS.md block on next dev, Next.js (modified/non-standard fork used in this project), webapp CLAUDE.md project instructions, graphify-out/GRAPH_REPORT.md broad architecture doc, graphify-out/ knowledge graph (god nodes, community structure), graphify query / path / explain commands (+8 more)

### Community 8 - "Comment API Endpoints"
Cohesion: 0.12
Nodes (18): CommentAuthorResponseDto, CommentController, POST /comments — Tạo comment mới (hoặc reply), DELETE /comments — Xóa comment (chưa có phản hồi), GET /comments/{parentId}/children — Danh sách comment con trực tiếp, GET /comments — Danh sách comment gốc (level 0), phân trang, CommentListItemResponseDto, CommentResponseDto (+10 more)

### Community 9 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+10 more)

### Community 10 - "TS Path Aliases"
Cohesion: 0.12
Nodes (17): ./features/*, ./providers/*, ./shared/*, ./shared/components/*, ./shared/hooks/*, ./shared/libs/*, ./shared/types/*, ./shared/utils/* (+9 more)

### Community 11 - "TSConfig Include Files"
Cohesion: 0.17
Nodes (11): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, .storybook/**/*.ts, .storybook/**/*.tsx, **/*.ts (+3 more)

### Community 12 - "Package Scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, build-storybook, dev, lint, start (+2 more)

### Community 13 - "Root Layout Component"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

## Ambiguous Edges - Review These
- `AGENTS.md` → `README.md`  [AMBIGUOUS]
  AGENTS.md · relation: conceptually_related_to

## Knowledge Gaps
- **152 isolated node(s):** `config`, `preview`, `geistSans`, `geistMono`, `metadata` (+147 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `AGENTS.md` and `README.md`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Mekongo API OpenAPI spec (v0.0.1)` connect `Chat API Endpoints` to `Comment API Endpoints`, `Account API Endpoints`, `Auth API Endpoints`, `Architecture Constitution Rules`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `AuthController` connect `Auth API Endpoints` to `Chat API Endpoints`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `CONSTITUTION.md — Project Constitution` connect `Architecture Constitution Rules` to `AI Agent Instructions`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `config`, `preview`, `geistSans` to the rest of the system?**
  _152 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Tooling Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `Chat API Endpoints` be split into smaller, more focused modules?**
  _Cohesion score 0.07977207977207977 - nodes in this community are weakly interconnected._