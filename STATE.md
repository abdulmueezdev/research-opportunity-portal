# STATE.md - Research Opportunity Portal

## Current Phase: P2 Backend
## Active Task: P2-C-VERIFY (PASSED)
## Attempts: 0
## Evidence: Verified PASS

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
- MySQL 8 live on `127.0.0.1:3306`.
- `schema.sql` active with `opportunities` table.
- Credentials verified authenticating successfully via `backend/.env`.

### Backend Layer
- `backend/src/app.js`: Configured for `/api/opportunities`.
- `backend/src/controllers/opportunity.controller.js`: Handlers for `create` and `getAll`.
- `backend/src/routes/opportunity.routes.js`: Router mapping `POST /` and `GET /`.
- Verification Evidence:
  - `POST /api/opportunities`: Returned `HTTP/1.1 201 Created` with full JSON envelope, `data.id = 1`, `data.status = "Open"`, and exact unshifted date string `"deadline": "2026-12-31"`.
  - `GET /api/opportunities`: Returned `HTTP/1.1 200 OK` with JSON envelope containing array with the created opportunity.
  - Zero 500 errors or stack traces.
