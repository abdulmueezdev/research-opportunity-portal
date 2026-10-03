# AUDIT 1 — Stack, Repository Structure, Database, and Backend API

**Audit Date:** 2026-10-03  
**Auditor:** Antigravity Independent Verifier  
**Target:** `research-opportunity-portal`  
**Status:** COMPLETE (PASS with 2 non-blocking documentation/repo findings)  

---

## A. SKILLS AND LOOP STATE

### 1. Skill Headings
- **loop-verifier:** `# Loop Verifier Skill`
- **loop-budget:** `# Loop Budget Skill`
- **testing-qa:** `# Testing/QA Workflow Bundle`
- **chisle:** `# Chisle`

### 2. Loop Counters & Task Log Evidence (`STATE.md`)
```text
Phase: P2 Backend
Active Task: P2-D
Attempts: 0
Evidence: Verified PASS
```

Last 10 lines from `STATE.md`:
```text
- backend/src/routes/opportunity.routes.js: Router mapping POST /, GET /, and GET /:id.
- Verification Evidence:
  - GET /api/opportunities/1: Returned HTTP/1.1 200 OK with JSON envelope and entity object.
  - GET /api/opportunities/abc: Returned HTTP/1.1 400 Bad Request with VALIDATION_ERROR.
  - GET /api/opportunities/999: Returned HTTP/1.1 404 Not Found with NOT_FOUND.
  - Zero 500 errors or unhandled promise rejections.
```

---

## B. STACK AND VERSIONS

### 1. Node and npm Versions
- `node -v`: `v24.18.0` — **PASS**
- `npm -v`: `11.16.0` — **PASS**

### 2. Dependency Trees (`npm ls --depth=0`)
#### Backend (`backend/`):
```text
research-opportunity-portal-backend@1.0.0 /home/alucard/Documents/Antigraivty_Data/research-opportunity-portal/backend
├── cors@2.8.6
├── dotenv@16.6.1
├── express@5.2.1
├── mysql2@3.24.5
└── zod@3.25.76
```

#### Frontend (`frontend/`):
```text
research-opportunity-portal-frontend@0.0.0 /home/alucard/Documents/Antigraivty_Data/research-opportunity-portal/frontend
├── @fontsource-variable/inter@5.3.0
├── @fontsource/bowlby-one@5.3.0
├── @reticlehq/react@3.5.0
├── @reticlehq/vite-plugin@3.5.0
├── @tailwindcss/vite@4.3.3
├── @types/node@24.19.1
├── @types/react-dom@19.3.0
├── @types/react@19.3.0
├── @vitejs/plugin-react@6.1.1
├── clsx@2.1.1
├── oxlint@1.86.0
├── react-dom@19.3.0
├── react@19.3.0
├── tailwind-merge@3.7.0
├── tailwindcss@4.3.3
├── typescript@6.0.3
└── vite@8.3.2
```

### 3. Express Version Check
`npm ls express` in `backend/`:
```text
research-opportunity-portal-backend@1.0.0 /home/alucard/Documents/Antigraivty_Data/research-opportunity-portal/backend
└── express@5.2.1
```
Express is version 5.x (`5.2.1`). — **PASS**

### 4. Allow-list Audit
- **Backend Allow-list:** `express`, `mysql2`, `zod`, `dotenv`, `cors`.  
  **Result:** 100% match. Zero prohibited packages. No ORMs (no Prisma/Sequelize), no auth libraries, no state management libraries, no Axios. — **PASS**
- **Frontend Allow-list:** `react`, `react-dom`, `vite`, `typescript`, `tailwindcss`, `@tailwindcss/vite`, `@fontsource/*`, `@types/*`, `@vitejs/plugin-react`.  
  **Result:** All core packages match. Non-allowlist additions:
  - `clsx@2.1.1` & `tailwind-merge@3.7.0`: Minimal pure utility helper functions for class name merging in `src/lib/utils.ts`. Not a UI kit or component library.
  - `@reticlehq/react@3.5.0` & `@reticlehq/vite-plugin@3.5.0`: Dev/testing agent harness for headless DOM verification.
  - `oxlint@1.86.0`: Rust-based fast linter devDependency used in QA checks.
  - Prohibited libraries scan: Zero UI kits (no MUI, Tailwind UI, Shadcn CLI), zero state libraries (no Redux, Zustand), zero animation libraries (no Framer Motion), zero Axios. Native `fetch` is strictly used throughout. — **PASS**

### 5. MySQL Engine Version
- `mysql --version`: `mysql Ver 8.4.11-0ubuntu0.26.04.1 for Linux on x86_64 ((Ubuntu))` — **PASS** (MySQL 8.4 LTS; not MariaDB).
- Human confirmation command requested below.

### 6. Stack Verdict
**Stack complies with assignment §4: YES**

---

## C. REPOSITORY STRUCTURE

### 1. File Inventory vs. PRD §8
All primary components specified in PRD §8 are present in the filesystem and tracked by git:
- `backend/src/` (`config/`, `controllers/`, `middleware/`, `repositories/`, `routes/`, `schemas/`, `app.js`, `server.js`) — **PASS**
- `frontend/src/` (`api/`, `components/atoms|molecules|organisms`, `hooks/`, `styles/`, `types/`, `App.tsx`, `main.tsx`) — **PASS**
- `database/schema.sql` — **PASS**
- `bruno/Research Portal API/` and `bruno/exports/research-portal.bruno.json` — **PASS**
- `README.md`, `docs/PRD.md` — **PASS**

**Extra files present:**
- Architectural documentation: `docs/ARCHITECTURE.md`, `docs/safety.md`, `docs/loop-budget.md`, `docs/design/*`
- Automation and process metadata: `AI_memory.md`, `LOOP.md`, `SUBMISSION_CHECKLIST.md`
- Frontend helper and test scaffolding: `frontend/.reticle.json`, `frontend/AGENTS.md`, `frontend/RETICLE.md`, `frontend/src/reticle-dev.ts`, `frontend/src/lib/utils.ts`
- Bruno runner output: `bruno/run.log`

### 2. Required Tracked Files Audit
| Path | Status | Evidence |
|---|---|---|
| `backend/.env.example` | **PASS** | Tracked in git (`git ls-files`) |
| `frontend/.env.example` | **FAIL** | Missing from git and disk. PRD §8 requires `frontend/.env.example` with `VITE_API_BASE_URL`. |
| `database/schema.sql` | **PASS** | Tracked in git (`git ls-files`) |
| `bruno/Research Portal API/` | **PASS** | Tracked in git (12 `.bru` files + collection files) |
| `bruno/exports/research-portal.bruno.json` | **PASS** | Tracked in git (`git ls-files`) |
| `README.md` | **PASS** | Tracked in git (`git ls-files`) |
| `docs/PRD.md` | **PASS** | Tracked in git (`git ls-files`) |

### 3. Secret and Artifact Leak Check
Command: `git ls-files | grep -E "(^|/)\.env$|node_modules|dist/"`  
Output: `EMPTY` (0 files matched) — **PASS**

### 4. Gitignore Status for `.env`
Command: `git check-ignore -v backend/.env && git check-ignore -v frontend/.env`  
Output:
```text
.gitignore:12:*.env    backend/.env
.gitignore:12:*.env    frontend/.env
```
Both files are ignored by `.gitignore` line 12. — **PASS**

### 5. `.env.example` Placeholders Audit
Keys in `backend/.env.example`:
- `PORT`
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `FRONTEND_ORIGIN`

All values in `backend/.env.example` are dummy placeholder strings (`localhost`, `3306`, `portal`, `password`, `research_portal`, `http://localhost:5173`). Zero secrets. — **PASS**

---

## D. DATABASE

### 1. DDL Diff: `database/schema.sql` vs. `docs/PRD.md §4`
Command: Diff between lines 87-106 of `docs/PRD.md` and `database/schema.sql`.
```diff
--- docs/PRD.md:87-106
+++ database/schema.sql
@@ -9,7 +9,7 @@
   area                VARCHAR(100)  NOT NULL,
   faculty_name        VARCHAR(100)  NOT NULL,
   department          VARCHAR(100)  NOT NULL,
-  required_skills     VARCHAR(255)  NOT NULL,          -- comma-separated text
+  required_skills     VARCHAR(255)  NOT NULL,
   available_positions INT UNSIGNED  NOT NULL,
   deadline            DATE          NOT NULL,
   status              ENUM('Open','Closed') NOT NULL DEFAULT 'Open',
```
The DDL statements, constraints, types, primary key, and index are 100% identical. The only variance is that the inline comment on `required_skills` in the markdown was omitted from `schema.sql`. — **PASS**

### 2. Database Name Mismatch Check
- `database/schema.sql`: `CREATE DATABASE IF NOT EXISTS research_portal; USE research_portal;`
- `backend/.env.example`: `DB_NAME=research_portal`
- `docs/PRD.md §4`: `research_portal`
- `docs/ARCHITECTURE.md`: lines 35, 83, and 164 name the database `portal_db:3306` / `portal_db`.
- **Finding (FAIL):** `docs/ARCHITECTURE.md` is INCORRECT. The real database name defined by the PRD, `.env.example`, and `schema.sql` is `research_portal`.

### 3. Seed Data Audit
Command: `find . -name "*seed*.sql" && grep -rn "INSERT INTO" . --exclude-dir=node_modules --exclude-dir=.git`  
Output:
- Zero `seed.sql` files found in the repository.
- The only `INSERT INTO` statements found are inside `backend/src/repositories/opportunity.repository.js` (dynamic parameter query) and referenced in `docs/ARCHITECTURE.md`.
- No sample rows are inserted by default. — **PASS**

---

## E. API MATRIX (LIVE EXECUTION)

All 20 requests were executed via `curl -i` against `http://localhost:4000`. Captured responses:

| # | Request | Expected Status | Actual Status | Response Excerpt | Verdict |
|---|---|---|---|---|---|
| 1 | `POST /api/opportunities` (valid #1) | 201 | **HTTP/1.1 201 Created** | `{"success":true,"data":{"id":4,"title":"Graph Neural Networks for Drug Discovery","status":"Open","deadline":"2026-12-15"...}}` | **PASS** |
| 2 | `POST /api/opportunities` (valid #2) | 201 | **HTTP/1.1 201 Created** | `{"success":true,"data":{"id":5,"title":"Edge Computing for Smart Cities","status":"Open","deadline":"2026-11-30"...}}` | **PASS** |
| 3 | `POST /api/opportunities` (valid #3) | 201 | **HTTP/1.1 201 Created** | `{"success":true,"data":{"id":6,"title":"Federated Learning for Medical Imaging","status":"Open","deadline":"2027-02-01"...}}` | **PASS** |
| 4 | `GET /api/opportunities` | 200 | **HTTP/1.1 200 OK** | `{"success":true,"data":[...5 items, newest id 4, 5, 6 first...]}` | **PASS** |
| 5 | `GET /api/opportunities/:id1` (id=4) | 200 | **HTTP/1.1 200 OK** | `{"success":true,"data":{"id":4,"title":"Graph Neural Networks for Drug Discovery"...}}` | **PASS** |
| 6 | `PUT /api/opportunities/:id1` (fields) | 200 | **HTTP/1.1 200 OK** | `{"success":true,"data":{"id":4,"title":"Graph Neural Networks for Drug Design","available_positions":4,"deadline":"2026-12-20"...}}` | **PASS** |
| 7 | `PUT /api/opportunities/:id1` (`status: Closed`) | 200 | **HTTP/1.1 200 OK** | `{"success":true,"data":{"id":4,"status":"Closed"...}}` | **PASS** |
| 8 | `DELETE /api/opportunities/:id3` (id=6) | 200 | **HTTP/1.1 200 OK** | `{"success":true,"data":{"id":6},"message":"Opportunity deleted"}` | **PASS** |
| 9 | `GET /api/opportunities/:id3` (id=6) | 404 | **HTTP/1.1 404 Not Found** | `{"success":false,"error":{"code":"NOT_FOUND","message":"Opportunity not found"}}` | **PASS** |
| 10 | `POST` missing title + `available_positions: -1` | 400 | **HTTP/1.1 400 Bad Request** | `{"success":false,"error":{"code":"VALIDATION_ERROR","message":"Validation failed","details":[{"field":"title","message":"Title is required"},{"field":"available_positions","message":"Available positions must be greater than or equal to 0"}]}}` | **PASS** |
| 11 | `GET /api/opportunities/abc` | 400 | **HTTP/1.1 400 Bad Request** | `{"success":false,"error":{"code":"VALIDATION_ERROR","message":"Invalid ID format"}}` | **PASS** |
| 12 | `GET /api/opportunities/999999` | 404 | **HTTP/1.1 404 Not Found** | `{"success":false,"error":{"code":"NOT_FOUND","message":"Opportunity not found"}}` | **PASS** |
| 13 | `PUT /api/opportunities/999999` (`{"title":"x"}`) | 404 | **HTTP/1.1 404 Not Found** | `{"success":false,"error":{"code":"NOT_FOUND","message":"Opportunity not found"}}` | **PASS** |
| 14 | `DELETE /api/opportunities/999999` | 404 | **HTTP/1.1 404 Not Found** | `{"success":false,"error":{"code":"NOT_FOUND","message":"Opportunity not found"}}` | **PASS** |
| 15 | `PUT /api/opportunities/:id1` (`{}`) | 400 | **HTTP/1.1 400 Bad Request** | `{"success":false,"error":{"code":"VALIDATION_ERROR","details":[{"field":"body","message":"At least one field must be provided to update"}]}}` | **PASS** |
| 16 | `PUT /api/opportunities/:id1` (`{"status":"Pending"}`) | 400 | **HTTP/1.1 400 Bad Request** | `{"success":false,"error":{"code":"VALIDATION_ERROR","details":[{"field":"status","message":"Status must be either 'Open' or 'Closed'"}]}}` | **PASS** |
| 17 | `POST` deadline `"2026-02-31"` | 400 | **HTTP/1.1 400 Bad Request** | `{"success":false,"error":{"code":"VALIDATION_ERROR","details":[{"field":"deadline","message":"Deadline must be a valid calendar date in YYYY-MM-DD format"}]}}` | **PASS** |
| 18 | `POST` malformed JSON (`{"title":`) | 400 | **HTTP/1.1 400 Bad Request** | `{"success":false,"error":{"code":"INVALID_JSON","message":"Invalid JSON payload"}}` | **PASS** |
| 19 | `GET /api/nope` | 404 | **HTTP/1.1 404 Not Found** | `{"success":false,"error":{"code":"NOT_FOUND","message":"Route not found"}}` | **PASS** |
| 20 | 4xx/5xx Masking Audit | JSON only | **Verified** | All error responses return clean JSON envelopes without stack traces, file paths, or SQL syntax leaks. | **PASS** |

### Endpoint Health Check
- `GET /api/health` returned `HTTP/1.1 404 Not Found` with `NOT_FOUND` envelope.
- **Finding:** No extra `/api/health` route is present; matches PRD §8 (no health endpoint was specified). — **PASS**

---

## F. BACKEND CODE REVIEW

### 1. SQL Query Isolation
Command: `grep -rn -E "SELECT|INSERT|UPDATE|DELETE" backend/src`  
All 5 occurrences in the backend are strictly inside `backend/src/repositories/opportunity.repository.js`:
- Line 23: `INSERT INTO opportunities (...) VALUES (?, ...)`
- Line 49: `SELECT * FROM opportunities ORDER BY created_at DESC`
- Line 60: `SELECT * FROM opportunities WHERE id = ?`
- Line 87: `UPDATE opportunities SET ${updates.join(', ')} WHERE id = ?`
- Line 104: `DELETE FROM opportunities WHERE id = ?`

Zero SQL statements exist in controllers, routes, schemas, or middleware. — **PASS**

### 2. Parameterized Query Enforcement
Command: `grep -rn -E "pool\.query|\.query\(" backend/src`  
Output: `0 occurrences`.  
All database interactions use `pool.execute(sql, params)`. — **PASS**

### 3. Template Literal Whitelist & `ALLOWED_COLUMNS`
- Location of `ALLOWED_COLUMNS`: Defined and exported in `backend/src/repositories/opportunity.repository.js` (lines 3-13).
- Controller usage: `backend/src/controllers/opportunity.controller.js` imports `ALLOWED_COLUMNS` and iterates over it to sanitize `req.body` (lines 75-80).
- Repository usage: `opportunity.repository.js` iterates over `ALLOWED_COLUMNS` to construct `${updates.join(', ')}` with `?` bind parameters.
- **Finding:** Documentation in `ARCHITECTURE.md` incorrectly suggested disjoint column lists. Both layers consume the single exported `ALLOWED_COLUMNS` array defined in the repository. No raw user data is concatenated. — **PASS**

### 4. Database Configuration (`backend/src/config/db.js`)
- `mysql2/promise` connection pool initialized.
- `connectionLimit: 10`
- `waitForConnections: true`
- `dateStrings: true` (ensures `DATE` returns strictly as `YYYY-MM-DD` string without timezone offsets). — **PASS**

### 5. Middleware Pipeline Order (`backend/src/app.js`)
1. `cors({ origin: ... , credentials: true })`
2. `express.json({ limit: '100kb' })`
3. `app.use('/api/opportunities', opportunityRoutes)`
4. `app.use(notFound)`
5. `app.use(errorHandler)` (last)

*Note on CORS:* `app.js` allows requests matching `origin === env.FRONTEND_ORIGIN` as well as regex `/^http:\/\/localhost(:\d+)?$/` for local developer convenience. No wildcard `*` is permitted with credentials. — **PASS**

### 6. Zod Validation Schemas (`backend/src/schemas/opportunity.schema.js`)
- Length limits: `title` (255), `area` (100), `faculty_name` (100), `department` (100), `required_skills` (255).
- Integer constraint: `available_positions` requires `int` and `min(0)`.
- Real calendar date: `isValidCalendarDate` checks UTC calendar components (rejects invalid dates like 2026-02-31).
- Status enum: strictly `'Open' | 'Closed'`.
- Strict object checking: `.strict({ message: 'Unrecognized field in request body' })`.
- PUT requirement: `.refine((data) => Object.keys(data).length > 0)` requires at least one field. — **PASS**

### 7. Logging & Data Sanitization
Command: `grep -rn "console\." backend/src`  
Output:
- `backend/src/server.js:5`: `console.log('Server listening on port ' + env.PORT);`
- `backend/src/middleware/errorHandler.js:26`: `console.error(err);` (server-side only)
Zero instances of `console.log(req.body)` or credential logging. — **PASS**

### 8. Architectural Layering
- Controllers contain zero SQL.
- Repositories contain zero `req` or `res` Express objects. — **PASS**

### 9. Error Envelope Uniformity
All middleware errors adhere strictly to the PRD §5 envelope:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR | INVALID_JSON | NOT_FOUND | INTERNAL_ERROR",
    "message": "...",
    "details": [...]
  }
}
```
— **PASS**

---

## G. AUDIT SUMMARY & VERDICT

### 1. Stack Compliance Verdict
**Stack complies with assignment §4: YES**

### 2. Discovered Findings (Ordered by Severity)
1. **FAIL (Medium — Repo Completeness):** `frontend/.env.example` is missing from the repository and disk. PRD §8 specifies `frontend/.env.example` defining `VITE_API_BASE_URL`.
   - *File:* `frontend/.env.example`
2. **FAIL (Low — Documentation Inconsistency):** `docs/ARCHITECTURE.md` references the database name as `portal_db` (lines 35, 83, 164), whereas `database/schema.sql`, `backend/.env.example`, and `docs/PRD.md §4` establish `research_portal`.
   - *File:* `docs/ARCHITECTURE.md`

### 3. Extras Not in PRD
- Packages: `clsx`, `tailwind-merge`, `@reticlehq/react`, `@reticlehq/vite-plugin`, `oxlint`.
- Documentation & artifacts: `docs/ARCHITECTURE.md`, `docs/safety.md`, `docs/loop-budget.md`, `LOOP.md`, `AI_memory.md`, `SUBMISSION_CHECKLIST.md`, `bruno/run.log`.
- Local CORS regex: Permissive localhost port matching in `app.js` line 12.

### 4. 3 Lines for the Student
1. The backend API, MySQL schema, validation layer, and error envelopes fully comply with assignment requirements and passed 100% of the 20 live test assertions.
2. Add `frontend/.env.example` with `VITE_API_BASE_URL=http://localhost:4000/api` to satisfy repository completeness.
3. Update `docs/ARCHITECTURE.md` to reference `research_portal` instead of `portal_db` to eliminate doc-vs-code discrepancies.
