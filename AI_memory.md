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

## 4. Immediate Next Steps
- **P2-E (Backend Maker):** Implement `PUT /api/opportunities/:id` (partial update via `ALLOWED_COLUMNS` whitelist, 200/400/404).
- **P2-F (Backend Maker):** Implement `DELETE /api/opportunities/:id` (hard delete, 200 with body).
- **P2-G (Backend Maker):** Add Zod validation schema, 404 fallback, and global error handler.
- **P3-A (Test Agent):** Scaffold Bruno collection (10 required cases + extras with variables).
- **P4-S0 (Design Agent):** Preflight Stitch MCP.

## 5. Hard Constraints (Never Violate)
- Assignment PDF > PRD.md > DESIGN.md > AI_CONSTRAINTS.md.
- Endpoints exactly: POST/GET `/api/opportunities`, GET/PUT/DELETE `/api/opportunities/:id`.
- No secrets in git. `.env` stays ignored.
- 1-3 files per task. Verify with curl. Report evidence. Wait for CTO.
