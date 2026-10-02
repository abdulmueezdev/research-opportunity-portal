# AI Constraints — Research Opportunity Portal

**Applies to:** Antigravity 2.0 (builder), the CTO AI (supervisor), and any other AI that touches this repo.
**Priority:** Assignment PDF > `PRD.md` > `DESIGN.md` / `UI_DESIGN_SPEC.md` > this file > skill/guide defaults.
Constraints here narrow (never widen) the general behaviour in `Complete_guide.md` and `AI_ORCHESTRATOR_GUIDE.md`.

---

## 1. Hard rules (violating any = stop and report)

| # | Rule |
|---|---|
| H1 | **Assignment is the boundary.** Build only what `PRD.md` lists. No auth, Docker, ORM, Redux, Supabase/Firebase, GraphQL, CI/CD, cloud deploy, pagination, extra tables. |
| H2 | **Stack is fixed:** Node ≥ 20 + Express 5 (JS/ESM) + `mysql2/promise` + Zod + dotenv + cors · React 19 + Vite + TypeScript + Tailwind v4 · MySQL 8 · Bruno. Adding a dependency requires a one-line justification and CTO approval. |
| H3 | **Secrets:** never read, print, commit or paste `.env` values. Only `.env.example` with placeholders is committed. `.env` stays in `.gitignore` from the first commit. Do not use the `magic-21st`/`reticle` keys for this project. |
| H4 | **No hard-coded data in the frontend.** No sample arrays, no `mockData`, no placeholder cards left in source. Stitch placeholder text must be removed during conversion. |
| H5 | **SQL only via parameterised queries** (`pool.execute(sql, [params])`). No string concatenation of user input into SQL. All SQL lives in `repositories/`. |
| H6 | **Validation lives in the backend** (Zod) and is mirrored in the UI for UX. The API returns the PRD error envelope and the right status code (200/201/400/404/500) — never `200` with an error body. |
| H7 | **Do not edit root `DESIGN.md`.** If a Stitch/design skill generates a design file, write to `docs/design/extracted-design.md`. |
| H8 | **No auto-merge, no force-push, no history rewrite.** Commits are local and small; the human pushes (or approves pushes). |
| H9 | **One atomic task at a time** (1–3 files), verify, report, then wait. |
| H10 | **No fake verification.** "It should work" is not evidence. Evidence = command output, HTTP status + body, Bruno run result, or a Reticle `verified: "yes"`. |
| H11 | **Do not use Slush branding** (name, logo, rocket/coin/wallet stickers). |
| H12 | **Don't touch** anything outside the project folder, installed global config, or other projects in the Antigravity workspace. |

## 2. Technology constraints

### Backend
- ESM (`"type": "module"`), `node --watch` for dev (no nodemon needed). Scripts: `dev`, `start`.
- Layers: `routes → validate middleware → controller → repository`. **No service layer.** Controllers contain no SQL; repositories contain no HTTP.
- Pool created once in `config/db.js` with `dateStrings: true`, `waitForConnections: true`, `connectionLimit: 10`.
- `app.js` exports the Express app; `server.js` calls `listen` (keeps it testable).
- Express 5 async handlers are not wrapped in try/catch unless they translate a specific error.
- `express.json({ limit: "100kb" })`; JSON parse failure → `400 INVALID_JSON`.
- CORS origin from `FRONTEND_ORIGIN` env; no wildcard.
- Errors: one `errorHandler`; unexpected → log server-side, respond `500 INTERNAL_ERROR` generic.
- `PORT` default **4000**.
- No `console.log` of request bodies. Minimal startup/error logging only.

### Database
- `database/schema.sql` is idempotent (`IF NOT EXISTS`), structure only. Optional `seed.sql` separate.
- Exactly the columns in PRD §4. Changing the schema needs CTO sign-off and a PRD update.

### Frontend
- Vite + React + TypeScript (`strict: true`), Tailwind v4 with tokens in `src/styles/theme.css` copied from `DESIGN.md`.
- State: `useState`/`useReducer` + small hooks. No state libraries, no router unless the CTO approves.
- Network: `fetch` through `src/api/opportunities.ts` only; base URL from `import.meta.env.VITE_API_BASE_URL`.
- Atomic structure (atoms → molecules → organisms) via the `react-components` skill, but **no premature abstraction**: a component exists only if used ≥ 2 times or is a clear unit (Modal, Card, Toast).
- Fonts via `@fontsource` packages, not CDN links.
- **Banned in this project:** `motion/react`, `lenis`, GSAP/ScrollTrigger, `magic-ui`/`magic-21st`/`shadcn-ui` MCP blocks, any animation library. (Marquee = CSS keyframes; hover = CSS transitions on `background-color`/`transform` ≤ 200 ms.)
- Headless accessible primitives are allowed for modal focus-trap **only if** native `<dialog>` proves insufficient (prefer native `<dialog>`).
- Design rules: see `UI_DESIGN_SPEC.md` §2 and §9. In short: no shadows, no gradients, black 1 px outlines, pill buttons, ≥ 16 px card radius.

### Testing
- Bruno collection is mandatory (PRD §9). Optional extras (supertest/Vitest/Playwright) are **not** required — add only if the CTO confirms time remains after all must-haves are green.

## 3. Skill constraints (Antigravity)

Antigravity only obeys a skill when the prompt (a) names it and (b) cites its `SKILL.md` path and requires `view_file` first. Every directive must do both.

| Phase | Skills to activate | Notes |
|---|---|---|
| Planning chunking | `gsd-core` | Task slicing, 1–3 files each. |
| Backend / DB | `database-architect`, `api-security-best-practices`, `lint-and-validate` | Use only for review/hardening; **do not** let `backend-architect` introduce microservices/queues, nor `senior-architect` add C4 diagrams beyond one page. |
| Stitch design | `manage-design-system` → `generate-design` → `taste-design` → `stitch-loop` → `extract-design-md` (output redirected per H7) | See `STITCH_WORKFLOW.md`. |
| Stitch → React | `react-components`, `baseline-ui`, `react-patterns` | Stitch-derived tokens must equal `DESIGN.md` tokens. |
| Quality | `antislop-ui`, `antislop-code`, `antislop-copywriting`, `fixing-accessibility`, `code-review-excellence` | Run after each UI organism and before final. |
| Verification | `reticle` (live DOM), `testing-qa`, `phase-gated-debugging` on failure | `verified: "yes"` required. |
| Token discipline (optional) | `chisle` | Use for terse reports. |
| Never for this project | `motion`, `lenis`, `firebase-auth-basics`, `backend-architect` (microservice parts), `api-gateway-configurator`, `connecting-lambda-to-api-gateway`, `langgraph`, `rag-engineer`, `multi-agent-architect`, `react-native`, `remotion`, `android-cli`, `claude-seo` | Out of scope (H1). |

Skill-vs-spec conflicts: where a skill default contradicts `DESIGN.md`/PRD (e.g. a skill suggesting `shadow-md`, `rounded-md`, or a 3-layer service architecture), **the project docs win**; report the conflict to the CTO.

## 4. Stitch / MCP constraints

1. Stitch is **design-time only**. No Stitch SDK/runtime in the app bundle.
2. Before any design work, Antigravity must prove the Stitch MCP is mounted (list its tools). If it isn't, **stop** — do not improvise a different design tool (see `STITCH_WORKFLOW.md` Phase S0).
3. The design system bound to the Stitch project must be derived from root `DESIGN.md` via `manage-design-system`/`upload-to-stitch`; no free-form colours.
4. Stitch output is a **draft**. Every screen is reviewed against `UI_DESIGN_SPEC.md` §9 before conversion.
5. Do not give Stitch confidential data (no `.env`, no credentials). Prompts contain only design text.
6. Mount only MCP servers needed here: **Stitch** (+ **Reticle** for verification). Leave `shadcn-ui`, `magic-ui`, `gsap-master`, `magic-21st` unused.

## 5. Process constraints (from the Phase-Gated Monotasking Protocol)

- Before each task: read `STATE.md` (attempt counter < 3), `docs/safety.md` denylist, `LOOP.md`.
- Each task has: ID, phase, single objective, target files, invariants, verification, evidence format.
- Fail → diagnose (`phase-gated-debugging`: reproduce → isolate → fix) → re-verify. **3 strikes** → halt and escalate to CTO/human. Budget: 50k tokens per task (per `loop-budget.md`).
- After every passing task: update `STATE.md`, make one Conventional Commit (PRD §11), report.
- Reports must contain: files changed (paths + line counts), commands run with real output excerpts, HTTP/DB/UI evidence, deviations, next proposed task. Terse.

## 6. Code-quality constraints

- No dead code, no commented-out blocks, no TODOs left, no `any`, no `@ts-ignore`, no `eslint-disable` without a reason.
- No mechanical comments ("// handle click"). Comment only the *why* (e.g. why `dateStrings: true`).
- Names: SQL columns `snake_case`; JSON fields identical to columns; TS types mirror JSON; React components `PascalCase`; files match export.
- ESLint + Prettier pass; `npm run build` passes for both apps before every phase gate.
- Accessibility (UI spec §8) enforced in code, not as an afterthought.
- Copy tone: plain, human, no hype or filler words; no emoji in UI text.

## 7. Student-integrity constraints

The assignment forbids copied/plagiarised work and is individual. Therefore:
- The human must be able to explain every file. The builder AI adds a 2–3 line "what/why" in each task report so the student can learn from it.
- Do not paste large third-party code (tutorials, GitHub repos) into the project; cite any non-trivial external snippet in the PR/commit message.
- Confirm the course's AI-assistance policy before submission (PRD §16 Q3).

## 8. Escalation triggers (always ask the human)

Missing/failed Stitch MCP · DB won't connect · need to add a dependency · requirement ambiguity · any conflict between assignment and another doc · 3-strike halt · anything touching credentials or git remotes · deviation from PRD scope.
