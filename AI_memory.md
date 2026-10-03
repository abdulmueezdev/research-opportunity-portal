# AI MEMORY — Research Opportunity Portal

## 1. Workspace & Paths (Strict)
- **Monorepo Root:** `/home/alucard/Documents/Antigraivty_Data/research-opportunity-portal`
- **Backend Dir:** `research-opportunity-portal/backend`
- **Frontend Dir:** `research-opportunity-portal/frontend` (not yet scaffolded)
- **DB Schema:** `research-opportunity-portal/database/schema.sql`
- **Docs:** `research-opportunity-portal/docs/`
- **RESTRICT ALL SEARCHES TO THIS ROOT.** Do not touch `~/.bash_history` or `~/Downloads`.

## 2. Stack Rules (Fixed)
- **Backend:** Node 20+ + Express 5 (JS/ESM) + `mysql2/promise` + Zod + dotenv + cors.
  - No service layer (Controller → Repository).
  - No try/catch blocks (Express 5 handles async rejections natively).
  - `mysql2` pool created with `dateStrings: true`.
  - All SQL via `pool.execute(sql, [params])` in `repositories/`.
- **Frontend:** React 19 + Vite + TypeScript + Tailwind v4. (No motion, no lenis, no GSAP, native `<dialog>`).
- **DB:** MySQL 8.4. `INT UNSIGNED` for positions/IDs. No hard-coded data.

## 3. Completed & Verified Phases
- **P0 Foundation:** Git initialized, `.gitignore` (with `.env`), folder skeleton, Loop Engineering spine.
- **P1 Database:** MySQL 8.4.11 installed. `portal` user. `database/schema.sql` applied. 
- **P2-A/B Backend Scaffold:** Express 5.2.1 (ESM). `app.js`/`server.js` split. No `/api/health` route.
- **P2-B Repository:** `opportunity.repository.js` with parameterized SQL and `ALLOWED_COLUMNS`.
- **P2-C POST/GET (List):** POST returns 201, GET returns 200. Verified against live DB.
- **P2-D GET One:** `GET /api/opportunities/:id`. 
  - Validation: `const id = Number(req.params.id); if (!Number.isInteger(id) || id <= 0)` -> 400.
  - Valid ID -> 200. Non-existent -> 404. All 6 edge cases verified.
- **P2-E:** PUT endpoint implemented.
- **P2-F:** DELETE endpoint implemented.
- **P2-G:** Zod validation, 404 fallback, global error handler added. Backend API 100% complete.
- **P3-A:** Bruno collection scaffolded.
- **P3-B:** Bruno collection executed against live API — 12/12 pass, 38/38 assertions.
- **P4-S0:** Stitch preflight complete.
- **P4-S1:** Design system bound to Stitch.
- **P4-S2:** Stitch S1 Home screen generated.
- **P4-S3:** All 9 Stitch screens generated: S1-S9.
- **P4-S4-A:** Design refinement report & extracted tokens.
- **P4-S4-B:** Anti-slop rules & SEO semantic spec.
- **P4-S4-C:** TypeScript contracts & Atomic Design component map.

## 4. Immediate Next Steps
- **P5-A:** Scaffold Vite React App with Tailwind v4 & TypeScript.
- **P5-B:** Build Atoms and Molecules.
- **P5-C:** Build Organisms & Wire API.

## 5. Hard Constraints (Never Violate)
- Assignment PDF > PRD.md > DESIGN.md > AI_CONSTRAINTS.md.
- Endpoints exactly: POST/GET `/api/opportunities`, GET/PUT/DELETE `/api/opportunities/:id`.
- No secrets in git. `.env` stays ignored.
- 1-3 files per task. Verify with curl. Report evidence. Wait for CTO.
