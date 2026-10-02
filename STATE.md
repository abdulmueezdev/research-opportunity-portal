# STATE.md - Research Opportunity Portal

## Current Phase: P2 Backend
## Active Task: P2-D
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

### Backend Layer
- `backend/src/app.js`: Configured for `/api/opportunities`.
- `backend/src/controllers/opportunity.controller.js`: Handlers for `create`, `getAll`, and `getById`.
- `backend/src/routes/opportunity.routes.js`: Router mapping `POST /`, `GET /`, and `GET /:id`.
- Verification Evidence:
  - `GET /api/opportunities/1`: Returned `HTTP/1.1 200 OK` with JSON envelope and entity object.
  - `GET /api/opportunities/abc`: Returned `HTTP/1.1 400 Bad Request` with `VALIDATION_ERROR`.
  - `GET /api/opportunities/999`: Returned `HTTP/1.1 404 Not Found` with `NOT_FOUND`.
  - Zero 500 errors or unhandled promise rejections.
