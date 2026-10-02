# STATE.md - Research Opportunity Portal

## Current Phase: P2 Backend
## Active Task: P2-B
## Attempts: 0
## Evidence: Verified

### Environment
- Node.js: `v24.18.0` (Requirement Node >= 20: PASSED)
- Express: `5.2.1` (ESM module mode: PASSED)

### Safety & Loop Governance
- `.gitignore`: Configured with `.env`, `node_modules`, `dist`, `.DS_Store`
- Folder structure: backend, frontend, database, bruno, docs matching PRD §8
- `LOOP.md`: Active
- `docs/safety.md`: Zero-trust denylist active
- `docs/loop-budget.md`: Budget caps active

### Database Layer
- `database/schema.sql`: Created matching PRD §4 data model exactly (idempotent, single table `opportunities`, `INT UNSIGNED` for `id` and `available_positions`, `status` ENUM).

### Backend Layer
- `backend/package.json`: Configured with express@5, mysql2, dotenv, cors, zod; scripts `dev` and `start`.
- `backend/.env.example`: Committed template with placeholder DB credentials and `FRONTEND_ORIGIN`.
- `backend/src/config/env.js`: Environment configuration loader.
- `backend/src/config/db.js`: `mysql2/promise` connection pool with `dateStrings: true`, `waitForConnections: true`, `connectionLimit: 10`.
- `backend/src/app.js`: Express app configured with `express.json({ limit: "100kb" })`, CORS restricted to `FRONTEND_ORIGIN`, and `/api/health` route.
- `backend/src/server.js`: Server entrypoint listening on PORT (4000).
- `backend/src/repositories/opportunity.repository.js`: Fully implemented CRUD repository with parameterized SQL statements (`pool.execute` with `?` placeholders) and strict column whitelist for dynamic updates. Zero string concatenation.
- Evidence: `node --check` passed with 0 errors; ESM dynamic import verified exports `[create, getAll, getById, update, remove]`.
