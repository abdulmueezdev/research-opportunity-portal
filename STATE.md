# STATE.md - Research Opportunity Portal

## Current Phase: P2 Backend
## Active Task: P2-C-VERIFY
## Attempts: 2
## Evidence: Failed (MySQL Authentication)

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
- `docs/loop-budget.md`: Budget caps active (Attempt 2/3 recorded; 3rd failure will trip circuit breaker)

### Database Layer
- Port 3306 is open and responsive.
- MySQL returned: `Access denied for user 'portal'@'localhost' (using password: YES)`.
- Root cause: Credential mismatch between `backend/.env` (`DB_PASSWORD`) and MySQL database user `portal` privileges/password.

### Backend Layer
- `backend/src/app.js`: Configured for `/api/opportunities`.
- `backend/src/controllers/opportunity.controller.js`: Handlers for `create` and `getAll`.
- `backend/src/routes/opportunity.routes.js`: Router mapping `POST /` and `GET /`.
- Verification Evidence: Server launched successfully, bound to port 4000. Requests sent to `POST /api/opportunities` and `GET /api/opportunities` resulted in HTTP 500 with MySQL access denied error.
