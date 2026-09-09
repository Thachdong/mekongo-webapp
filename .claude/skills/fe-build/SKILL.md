---
name: fe-build
description: "Use when implementing a frontend feature/task in this codebase (new page, form, widget, component, or any change touching UI + data). Produces a short UI/Logic report first, waits for approval, then implements one reviewable chunk at a time, pausing after each for review/commit. Trigger: /fe-build <task description>, or any request to build/add a FE feature."
---

# /fe-build

Report-before-code workflow for FE tasks in this repo. Goal: user sees file-level plan, approves, then implementation follows CONSTITUTION.md exactly — no surprises about where files land.

## When to use full flow

Full report required when the task creates ≥1 new file, or touches ≥2 features/layers.

Skip the report (implement directly) when the task is a trivial edit — fix 1-2 existing files, no new file, no new feature. Say so in one line instead of a full report.

## Step 1 — Reuse check (before planning)

Before listing anything to create, check whether it already exists:
- `shared/components/{atoms,molecules,organisms}` — reusable pure UI
- `widgets/` — data-bound component already shared across ≥2 features
- `features/<name>/` — same feature already has similar component/repository/hook

If something reusable exists, reference it in the report instead of creating a duplicate.

## Step 2 — Placement decisions (apply CONSTITUTION.md)

For every component, decide which bucket it goes in:
- pure UI, no data/repository call → `shared/components/{atoms,molecules,organisms}` (shadcn-based)
- has data/repository call, used by ≥2 features → `widgets/<widget-name>`
- has data/repository call, used by 1 feature only → `features/<feature>/components`

For every data-fetching piece, decide client vs server component:
- Client component → repository called directly, uses `shared/libs/axios/client.ts` (`axiosClient`, via BFF proxy, no manual token)
- Server component → repository wrapped with `shared/hocs/with-server-token.tsx` (`withServerToken`), uses `shared/libs/axios/server.ts` (`axiosServer`), token passed per-call

## Step 3 — File naming (per CONSTITUTION.md §1, kebab-case)

Layers are subfolders under the feature, not flat files:
- `features/<feature>/components/<Name>.tsx`
- `features/<feature>/repositories/<name>.repository.ts`
- `features/<feature>/hooks/use-<name>.ts`
- `features/<feature>/types/<name>.type.ts`
- `features/<feature>/validations/<name>.validation.ts` (joi schema, §7)

Never place a `.repository.ts`/`.type.ts`/`.validation.ts` file directly under `features/<feature>/` — always inside its layer subfolder.

## Step 4 — Report format

Output exactly this structure. One line per item: path + short purpose. No code, no implementation detail, no step-by-step how.

```
1. UI
- tạo component @/features/<feature>/components/<Name>.tsx — <mục đích 1 dòng>
- tạo component @/shared-components/<atoms|molecules|organisms>/<Name>.tsx — <mục đích>
- tạo schema @/features/<feature>/validations/<name>.validation.ts — <mục đích>

2. Logic
- tạo repository @/features/<feature>/repositories/<name>.repository.ts — <mục đích> (client/server: <which>)
- tạo type @/features/<feature>/types/<name>.type.ts — <mục đích>
- tạo hook @/features/<feature>/hooks/use-<name>.ts — <mục đích>

3. Khác (nếu có)
- route BFF mới: <path> — <mục đích>
- middleware/proxy.ts thay đổi: <có/không>
- env var mới: <tên> — <mục đích>
- test/storybook: <có/không>
```

Omit section 3 lines that don't apply; drop the whole section if nothing applies.

## Step 5 — Approval gate

After the report, stop. Do not write any code until the user explicitly approves or requests changes to the plan. This gate applies even under an auto-approve/auto-mode session default — it's a workflow the user asked for explicitly, so it overrides the general "keep going without asking" bias.

## Step 6 — Break the plan into chunks

Once approved, split the report bullets into ordered implementation chunks before writing any code. A chunk is one coherent, reviewable unit — usually one file, or a few files that are inseparable (e.g. a type + its validation schema, or two axios instances created together). Order chunks by dependency (types/schemas before the repository that uses them, repository before the hook, hook before the component that calls it).

State the chunk order briefly (one line per chunk) so the user knows what "next" means.

## Step 7 — Implement one chunk at a time

Implement exactly one chunk. Apply CONSTITUTION.md rules throughout:
- repository pattern only, no raw fetch/axios in components (§3)
- axios only via `shared/libs/axios/{client,server}.ts` wrappers, never import axios directly elsewhere (§4, §6)
- forms: react-hook-form + joi + `@hookform/resolvers/joi` (§7)
- UI base via shadcn, customized in `shared/components/atoms|molecules` (§8)
- Tailwind first; `*.module.scss` only when Tailwind can't express it, colors via `var(--token)` from `app/globals.css` (§8.1)

After the chunk is done: stop. State what changed (files touched, 1 line each) and what the next chunk is. Do not continue to the next chunk in the same turn — wait for the user to review/commit and explicitly ask to continue, even though the overall plan was already approved. Never batch multiple chunks into one turn unless the user asks to.

If implementation reveals the report was wrong (e.g. reuse missed, wrong bucket), pause and flag the deviation instead of silently diverging from the approved plan.
