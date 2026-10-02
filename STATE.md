# STATE.md - Research Opportunity Portal

## Current Phase: P2 Backend
## Active Task: P2-C
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
- `database/schema.sql`: Created matching PRD §4 data model exactly. Host MySQL service pending human execution.

### Backend Layer
- `backend/package.json`: Configured with dependencies; scripts `dev` and `start`.
- `backend/.env.example`: Committed template.
- `backend/src/config/env.js`: Environment configuration loader.
- `backend/src/config/db.js`: `mysql2/promise` connection pool.
- `backend/src/repositories/opportunity.repository.js`: CRUD queries using parameterized SQL.
- `backend/src/controllers/opportunity.controller.js`: Handlers for `create` and `getAll` using PRD §5 envelope. No try/catch blocks used.
- `backend/src/routes/opportunity.routes.js`: Router mapping `POST /` and `GET /`.
- `backend/src/app.js`: Mounted `opportunityRoutes` at `/api/opportunities`.
- Evidence: Server routes verified. Handlers properly invoke repository methods; rejected DB connection is forwarded to Express 5 error handling.
