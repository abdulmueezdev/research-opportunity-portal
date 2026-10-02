# PRD — University Research Opportunity Portal

| | |
|---|---|
| **Course** | Computer Networks (CN), BS CS 5B, Fall-2026, FAST-NUCES Peshawar |
| **Deliverable** | Assignment #1 — individual |
| **Doc status** | v1.0 — authoritative requirements for the build |
| **Owner** | Abdulmueez (human) · **Supervisor AI:** CTO (see `CTO_GUIDE.md`) · **Builder AI:** Antigravity 2.0 |

---

## 0. Source priority (what wins in a conflict)

1. `Assignment_1.pdf` (professor) → 2. **this PRD** → 3. `DESIGN.md` / `UI_DESIGN_SPEC.md` → 4. `AI_CONSTRAINTS.md` → 5. NotebookLM blueprint, `Complete_guide.md`, `AI_ORCHESTRATOR_GUIDE.md` (advisory only) → 6. official docs → 7. general practice.

Nothing below may silently override an assignment line. Where this PRD deliberately departs from the NotebookLM blueprint, it is listed in §14.

---

## 1. Problem & goal

Research openings are scattered over email, WhatsApp and noticeboards. Build **one place** where faculty can post, view, update, close and delete research opportunities, and students can browse them.

**Goal:** a correct, clean, easily-run full-stack CRUD system (REST API + MySQL + React UI) that satisfies every line of the assignment, looks distinctive (per design spec), and is built with a professional Git history.

**Non-goals (do not build):** authentication/roles, student applications, email, search engine, pagination, file upload, Docker, CI/CD, cloud deploy, Redux/Zustand, ORMs, GraphQL, WebSockets, Supabase/Firebase. Rationale in §12.

## 2. Users

| User | Need |
|---|---|
| Faculty member | Post, edit, close, delete openings quickly. |
| Student | See all openings and full details at a glance. |
| Grader/instructor | Clone → follow README → run → verify every rubric line in ≤ 1 min video + Bruno collection. |

(No login: assignment specifies none. Everyone using the UI can do everything. State this in README "Known limitations".)

## 3. Scope — functional requirements

IDs are used in tests, commits and the compliance matrix.

### 3.1 Backend (assignment §2)

| ID | Requirement | Source |
|---|---|---|
| BE-01 | `POST /api/opportunities` creates a record in MySQL → `201`. | §2.1 |
| BE-02 | `GET /api/opportunities` returns all records → `200`. | §2.2 |
| BE-03 | `GET /api/opportunities/:id` returns one record → `200`, or `404`. | §2.3 |
| BE-04 | `PUT /api/opportunities/:id` updates a record (title, skills, positions, deadline, status…) → `200`, `400`, or `404`. | §2.4 |
| BE-05 | `DELETE /api/opportunities/:id` hard-deletes → `200`, or `404`. | §2.5 |
| BE-06 | Status codes used: 200, 201, 400, 404, 500. | §2.6 |
| BE-07 | Every CRUD op hits the database; no hard-coded data. | §9 |
| BE-08 | Credentials only in `.env` (git-ignored); `.env.example` committed. | §5, §9 |

### 3.2 Frontend (assignment §3)

| ID | Requirement |
|---|---|
| FE-01 | Display all opportunities (fetched from API). |
| FE-02 | Display full details of a selected opportunity. |
| FE-03 | Form to create an opportunity. |
| FE-04 | Option to update an existing opportunity. |
| FE-05 | Change status Open → Closed in one action. |
| FE-06 | Delete an opportunity (with confirmation). |
| FE-07 | Success **and** error messages (toasts / inline). |
| FE-08 | Client-side validation of required fields before submit. |
| FE-09 | No hard-coded data; all state from REST API. |
| FE-10 *(design, not assignment)* | Loading, empty and error-fetch states. |

### 3.3 Process deliverables (assignment §5–8)

| ID | Deliverable |
|---|---|
| PR-01 | GitHub repo with backend, frontend, DB schema, README, exported Bruno/Postman collection; accessible to instructor. |
| PR-02 | Meaningful, incremental commits (not one final upload). |
| PR-03 | README with setup/run steps **and** the repo URL. |
| PR-04 | Bruno/Postman demo covering the 8 required cases (§9 here). |
| PR-05 | ≤ 60 s video (see §10). |
| PR-06 | ZIP named `P24_0000_NAME_CLASS.zip` (replace with real values; underscores) containing code, schema, collection, README, repo link, video or link. |
| PR-07 | No passwords/keys/tokens in the repo or ZIP. |

## 4. Data model

One table. No relationships are required, so no extra tables.

```sql
CREATE DATABASE IF NOT EXISTS research_portal
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE research_portal;

CREATE TABLE IF NOT EXISTS opportunities (
  id                  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title               VARCHAR(255)  NOT NULL,
  description         TEXT          NOT NULL,
  area                VARCHAR(100)  NOT NULL,
  faculty_name        VARCHAR(100)  NOT NULL,
  department          VARCHAR(100)  NOT NULL,
  required_skills     VARCHAR(255)  NOT NULL,          -- comma-separated text
  available_positions INT UNSIGNED  NOT NULL,
  deadline            DATE          NOT NULL,
  status              ENUM('Open','Closed') NOT NULL DEFAULT 'Open',
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_status (status)
) ENGINE=InnoDB;
```

Notes
- `INT UNSIGNED` makes negative positions impossible at the DB level (works on every MySQL 8.x; avoids relying on `CHECK`, which is enforced only from 8.0.16). The API still validates and returns a friendly 400 first.
- `schema.sql` = structure only. `seed.sql` is **optional** and separate (so the demo can start from an empty DB and show the empty state, and so "create three" in Bruno is genuinely creating).
- `required_skills` stays a comma-separated string (assignment lists it as a single field). UI renders it as chips by splitting on commas.

### Validation split

| Layer | Responsibility |
|---|---|
| Frontend | Required, trimmed non-empty, positions integer ≥ 0, date present. UX only — never trusted. |
| Backend (Zod) | Types, trimming, lengths, integer ≥ 0, strict `YYYY-MM-DD` real calendar date, status ∈ {Open, Closed}, `:id` positive integer, PUT body has ≥ 1 known field, unknown keys stripped. **Source of truth for 400s.** |
| Database | NOT NULL, ENUM, UNSIGNED, lengths. Last line of defence. |

## 5. API contract

Base URL (dev): `http://localhost:4000`. JSON only. CORS allows only `FRONTEND_ORIGIN` (default `http://localhost:5173`).

### Response envelope

```jsonc
// success
{ "success": true, "data": <object|array>, "message": "optional" }

// error
{ "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "Validation failed",
             "details": [ { "field": "available_positions", "message": "Must be an integer ≥ 0" } ] } }
```

Error codes: `VALIDATION_ERROR` (400), `INVALID_JSON` (400), `NOT_FOUND` (404), `INTERNAL_ERROR` (500). 500 never leaks SQL or stack traces; it is logged server-side only.

### Endpoints

| # | Method & path | Body | Success | Errors |
|---|---|---|---|---|
| 1 | `POST /api/opportunities` | all 8 fields (`status` optional → `Open`) | `201` + created record | 400, 500 |
| 2 | `GET /api/opportunities` | — | `200` + array (newest first; `[]` if none) | 500 |
| 3 | `GET /api/opportunities/:id` | — | `200` + record | 400 (bad id), 404, 500 |
| 4 | `PUT /api/opportunities/:id` | any subset of the 8 fields, ≥ 1 | `200` + updated record | 400, 404, 500 |
| 5 | `DELETE /api/opportunities/:id` | — | `200` + `{ "id": n }` and message | 400 (bad id), 404, 500 |

Decisions (deliberate, documented in README):
- **PUT accepts partial bodies.** The assignment says update "such as title… or status", and the UI's "Close" button sends `{ "status": "Closed" }`. (Strict REST would use PATCH; the assignment specifies PUT, so PUT it is.)
- **DELETE returns 200 with a body**, not 204, because the assignment lists 200 and the UI/Bruno need the confirmation message.
- Non-numeric/zero/negative `:id` → **400**; well-formed id that doesn't exist → **404**.
- Unknown route → `404 NOT_FOUND` in the same envelope.
- Past deadlines are **allowed** (needed for Closed records). Not specified by the assignment → not enforced.
- The assignment PDF's spaced rendering (`/ a pi / o p p o r t u n i t i e s`) is a LaTeX typesetting artefact; the real path is `/api/opportunities`.

## 6. Frontend requirements (functional behaviour)

Visual rules live in `UI_DESIGN_SPEC.md`; this section is behaviour only.

- **Single page**, no router required. Modals for Detail, Create/Edit, Delete-confirm.
- On mount: `GET /api/opportunities` → loading state → list, empty state, or error state with Retry.
- After any successful mutation: refetch the list (simple and correct; no optimistic updates).
- Card actions: **View**, **Edit**, **Close** (hidden/disabled when already Closed), **Delete**.
- Form: same component for create/edit; edit pre-fills from the record; inline per-field errors + a toast for server errors; Submit disabled while in flight (prevents double-POST).
- Server `400 details[]` are mapped back onto the matching form fields.
- All network calls go through one module `src/api/opportunities.ts`. Base URL from `VITE_API_BASE_URL`.
- `fetch` is used (no Axios): zero dependency, sufficient.
- Dates displayed as `DD MMM YYYY`; sent as `YYYY-MM-DD`; never run through `new Date()` timezone conversion for storage.

## 7. Non-functional requirements

| Area | Requirement |
|---|---|
| Correctness | All 10 required Bruno cases pass on a clean DB. |
| Security | Parameterised queries only (`pool.execute` with `?`); `.env` ignored; CORS locked to the frontend origin; error masking; `express.json({limit:'100kb'})`. No auth (out of scope). |
| Reliability | `mysql2` connection **pool**; graceful startup error if DB unreachable; global error middleware. |
| Dates | Pool created with `dateStrings: true` so `DATE` columns return `"2026-11-30"`, not a timezone-shifted JS Date. (Common silent bug.) |
| Usability | Works at 360 px and 1440 px; keyboard operable; visible focus; modals trap focus and close on Esc; colour is never the only status signal. |
| Maintainability | Small files, clear folders, no dead code, ESLint + Prettier clean, no `any`. |
| Setup | Fresh clone → running app in ≤ 6 README commands. |
| Performance | No pagination needed (assignment scale). |

## 8. Architecture & stack

```
React (Vite, TS, Tailwind v4)  --fetch/JSON-->  Express routes
    --> validate (Zod) middleware --> controller --> repository --(mysql2 pool, ? params)--> MySQL 8
                                  <-- errorHandler (uniform envelope)
```

| Layer | Choice | Why |
|---|---|---|
| Backend | Node.js ≥ 20 LTS + **Express 5** (JavaScript, ESM) | Assignment allows Node; one language with the frontend; Express 5 forwards rejected async handlers to the error middleware natively (no wrapper). Verify installed version with `npm ls express`. |
| DB driver | `mysql2/promise` | Raw parameterised SQL; transparent for a grader; no ORM overhead. |
| Validation | `zod` | Declarative schemas → precise 400 `details[]`. |
| Config | `dotenv`, `cors` | Standard. |
| Frontend | React 19 + Vite + TypeScript + Tailwind v4 | Matches `DESIGN.md` Tailwind v4 `@theme` block; Stitch→React conversion skill targets React. |
| Fonts | `@fontsource/*` packages (local) | Offline-safe for the demo video; see UI spec for substitutes. |
| API testing | **Bruno** (or Postman) | Required by assignment; Bruno collections are plain files, git-friendly. |
| DB | **MySQL 8.0+ running locally** | The only DB the assignment permits. |

**No service layer.** There is no business logic beyond CRUD; controller → repository is the simplest clean separation. (NotebookLM proposed an extra service layer; this PRD removes it as pass-through boilerplate — §14.)

### Folder structure

```
research-opportunity-portal/
├── backend/
│   ├── src/
│   │   ├── config/        db.js (pool), env.js
│   │   ├── schemas/       opportunity.schema.js (Zod)
│   │   ├── middleware/    validate.js, notFound.js, errorHandler.js
│   │   ├── repositories/  opportunity.repository.js (all SQL lives here)
│   │   ├── controllers/   opportunity.controller.js
│   │   ├── routes/        opportunity.routes.js
│   │   ├── app.js         (express app, no listen)
│   │   └── server.js      (listen)
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           opportunities.ts
│   │   ├── components/    atoms/ molecules/ organisms/   (Atomic, from Stitch)
│   │   ├── hooks/         useOpportunities.ts, useToast.ts
│   │   ├── types/         opportunity.ts
│   │   ├── styles/        theme.css (@theme tokens), fonts.css
│   │   ├── App.tsx  main.tsx
│   ├── .env.example       (VITE_API_BASE_URL)
│   └── package.json
├── database/              schema.sql · seed.sql (optional)
├── bruno/                 Research Portal API/ (collection) + exports/research-portal.bruno.json
├── docs/                  PRD.md · UI_DESIGN_SPEC.md · AI_CONSTRAINTS.md · CTO_GUIDE.md · STITCH_WORKFLOW.md
│                          design/ (Stitch exports, screenshots)
├── DESIGN.md              (source-of-truth design tokens — do not overwrite)
├── README.md  ·  .gitignore  ·  STATE.md (loop memory; may be git-ignored)
```

## 9. Test plan (Bruno) — maps to assignment §6

Use Bruno collection variables: each create saves its id (`bru.setVar("id1", res.body.data.id)`) so tests don't depend on auto-increment values. Add `expect(res.status)` and shape assertions per request.

| # | Request | Expected | Proves |
|---|---|---|---|
| 1 | POST create #1 (valid) | 201, `data.id` present, status "Open" | BE-01 |
| 2 | POST create #2 | 201 | §6.1 |
| 3 | POST create #3 | 201 | §6.1 (≥ 3) |
| 4 | GET all | 200, array length ≥ 3 | BE-02 |
| 5 | GET `/:id1` | 200, matches #1 | BE-03 |
| 6 | PUT `/:id1` title + skills + positions + deadline | 200, fields changed | BE-04 |
| 7 | PUT `/:id1` `{ "status": "Closed" }` | 200, status "Closed" | §6.5 |
| 8 | DELETE `/:id3` | 200 | BE-05 |
| 9 | GET `/:id3` again | **404** | §6.7 |
| 10 | POST missing `title` + `available_positions: -1` | **400** with `details[]` for both | §6.8 |

Extra (cheap, shows rigour): `GET /abc` → 400 · `GET /999999` → 404 · `PUT /999999` → 404 · `DELETE /999999` → 404 · PUT `{}` → 400 · PUT `{ "status": "Pending" }` → 400 · POST `deadline: "2026-02-31"` → 400 · malformed JSON → 400 `INVALID_JSON` · `GET /api/nope` → 404.

Run order inside the collection: 1→10, then extras. Export: *Bruno → Collection → Export* to `bruno/exports/`.

**Frontend manual checklist** (record once before video): empty state → create (success toast) → list updates → view details → edit → close → delete confirm → submit empty form (inline errors) → stop backend, reload (error state + Retry) → restart, Retry works.

## 10. One-minute demo script (hard cap 60 s — rehearse to ~52 s)

| Time | Show |
|---|---|
| 0:00–0:06 | Two terminals: backend log "listening :4000" + Vite on :5173. |
| 0:06–0:16 | App loads list from DB → **Post Opportunity** → fill form → success toast, card appears. |
| 0:16–0:24 | View details modal → Edit title → save. |
| 0:24–0:30 | **Close** → badge flips to Closed. |
| 0:30–0:38 | Submit empty form → inline validation errors. Delete a card → confirm → gone. |
| 0:38–0:56 | Bruno: run collection — 201s, 200s, deleted id → **404**, bad payload → **400**. Show request + response body. |
| 0:56–1:00 | Repo URL / README on screen (optional). |

Tips: pre-fill `.env`, pre-start servers, pre-open Bruno, use 1.25× UI zoom, no talking-head intro.

## 11. Git plan (meaningful commits, Conventional Commits)

1. `chore: initialise repo, .gitignore, README skeleton, docs`
2. `feat(db): add MySQL schema`
3. `feat(api): scaffold Express app, env config and DB pool`
4. `feat(api): add opportunity repository (parameterised SQL)`
5. `feat(api): implement POST and GET endpoints`
6. `feat(api): implement PUT and DELETE endpoints`
7. `feat(api): add Zod validation, 404 and error-handling middleware`
8. `test(api): add Bruno collection and export`
9. `feat(ui): scaffold Vite React app with design tokens and fonts`
10. `feat(ui): add API client and opportunity list with loading/empty/error states`
11. `feat(ui): add detail modal`
12. `feat(ui): add create/edit form with validation`
13. `feat(ui): add close-status and delete flows with toasts`
14. `style(ui): apply Stitch-derived layout, stickers and marquee`
15. `docs: complete README, screenshots, limitations`
16. `chore: final cleanup, verify no secrets, build ZIP`

Rules: one logical change per commit; every commit builds; `git log --stat` must show no `.env`; push after each phase. Run `git ls-files | grep -i env` before the final push.

## 12. Technology decisions: needed vs. not needed

| Technology | Needed? | Decision |
|---|---|---|
| Custom backend (Express) | **Yes** | Assignment requires "backend REST API" you implement with the listed endpoints and status codes. |
| MySQL (local) | **Yes** | Only DB the assignment permits. |
| **Supabase** | **No** | Postgres (not MySQL), and its auto-generated API/RLS would replace the REST API you're being graded on. Violates §2/§4. Also adds accounts, keys and network dependence → breaks "runs from README". |
| Firebase, Prisma/TypeORM, Redux | No | Violate "MySQL + own API" spirit or add needless weight. |
| Auth/JWT | No | Not specified; adds surface area and demo friction. |
| Docker | No | Optional extra at best; risks setup failures on grader machines. |
| Cloud deploy | No | Everything runs locally per README. |
| Google Stitch | Design-time only | Generates UI screens/HTML; **nothing from Stitch runs in production**. Output is converted to React and committed. Needs internet + Google account while designing; the finished app needs neither. |
| Tailwind v4 | Yes | `DESIGN.md` ships a v4 `@theme`. |
| `motion`, `lenis`, GSAP, magic-ui, magic-21st, shadcn MCP | No | Design spec restricts motion to marquee + hover; see `AI_CONSTRAINTS.md`. |
| Reticle MCP | Yes (dev) | Live DOM proof of UI behaviour during verification. |

**Everything runs locally:** MySQL on your machine + `npm run dev` ×2. The internet is only needed for `npm install`, GitHub, and Stitch.

## 13. Hidden risks (easy to miss)

1. **DATE timezone shift** → `dateStrings: true`.
2. **MySQL < 8.0.16 ignores CHECK** → use UNSIGNED + API validation (done).
3. **Seed data masking "create three"** → keep seed optional.
4. **Hard-coded UI data** — even placeholder cards fail "no hard-coded data". Stitch-generated screens contain fake text: strip it all when converting to React.
5. **Committed `.env` / DB password** — check history, not just working tree (a deleted-later secret is still in history).
6. **Single-commit upload** → follow §11.
7. **Video > 60 s** — rehearse; trim.
8. **ZIP name** exact format; repo link present in README **and** ZIP.
9. **Repo private** → add instructor or make public before submit.
10. **Collection not exported** or missing the 404/400 cases.
11. **Slush brand assets** — design reference is another company's site: use own wordmark/stickers, never the Slush logo/name.
12. **AI-use policy** — the assignment says copied/plagiarised work scores zero and doesn't mention AI. Confirm your instructor's stance, and make sure you can explain every file in a viva.
13. Express 5 vs 4 behaviour differences if a tutorial is followed blindly (path syntax, async errors).
14. Port clashes (macOS uses :5000) → backend defaults to **4000**.

## 14. Deliberate departures from the NotebookLM blueprint

| Blueprint | This PRD | Reason |
|---|---|---|
| Service layer | Removed | Pass-through; not "simplest clean". |
| `schema.sql` contains seed rows | Seed in separate optional file | Rubric clarity (§13.3). |
| `CHECK (available_positions >= 0)` | `INT UNSIGNED` + Zod | Works on all MySQL 8.x. |
| 12 commits | 16 commits | More meaningful granularity. |
| Port 5000 | Port 4000 | Avoids common OS clash. |
| Postman file under `postman/` | `bruno/` with Bruno + exported JSON | Assignment allows either; Bruno is git-friendly. |
| Delete + re-GET uses fixed ids | Variables | Auto-increment ids are not predictable. |

## 15. Acceptance — definition of done

- [ ] BE-01…08, FE-01…10, PR-01…07 all ticked with evidence recorded in `STATE.md`.
- [ ] Fresh clone on a clean machine/DB runs using README only.
- [ ] Bruno run: 10/10 + extras green.
- [ ] `git ls-files` contains no secrets; history clean.
- [ ] Video ≤ 60 s shows all §10 items.
- [ ] ZIP name and contents verified against assignment §8.

## 16. Open questions for the student

1. Exact ZIP name values (`P24_0000_NAME_CLASS`) — roll number, name, section.
2. Is the repo public or will the instructor be added as collaborator (username)?
3. Course policy on AI-assisted code?
4. Should past deadlines be rejected on create? (Default: no.)
5. Is a Bruno/Postman preference given by the instructor? (Default: Bruno.)
