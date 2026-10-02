# STATE.md - Research Opportunity Portal

## Current Phase: P2 Backend
## Active Task: P2-C-VERIFY
## Attempts: 0
## Evidence: Verified

### Multi-Agent Roster
- **Backend Maker:** Owns `backend/` and `database/` implementation.
- **Test Agent:** Owns `bruno/` test collection and assertions.
- **Design Agent:** Owns `docs/design/` and UI tokens/specifications.
- **Independent Verifier:** Read-only on source code; executes external verification (`curl`, Bruno, Reticle).

### Safety & Loop Governance
- `.gitignore`: Configured with `.env`, `node_modules`, `dist`, `.DS_Store`
- Folder structure: backend, frontend, database, bruno, docs matching PRD §8
- `LOOP.md`: Active
- `docs/safety.md`: Zero-trust denylist active
- `docs/loop-budget.md`: Budget caps active

### Database Layer
- `database/schema.sql`: Created matching PRD §4 data model exactly. Host MySQL service pending human execution.

### Backend Layer
- `backend/src/app.js`: Removed out-of-scope `/api/health` route; strictly routes `/api/opportunities`.
- `backend/src/controllers/opportunity.controller.js`: Handlers for `create` and `getAll`. Zero try/catch blocks.
- `backend/src/routes/opportunity.routes.js`: Router mapping `POST /` and `GET /`.
- Verification: Attempted `POST /api/opportunities` and `GET /api/opportunities`. Router correctly executes repository handlers; rejected with `ECONNREFUSED 127.0.0.1:3306` awaiting live MySQL database container/daemon.
