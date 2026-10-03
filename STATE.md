# STATE.md - Research Opportunity Portal

## Current Phase: AUDIT
## Active Task: AUDIT-1
## Attempts: 0
## Evidence: Verified PASS (docs/audit/AUDIT-1.md)

### Multi-Agent Roster
- **Backend Maker:** Owns `backend/` and `database/` implementation.
- **Frontend Maker:** Owns `frontend/` implementation.
- **Test Agent:** Owns `bruno/` test collection and assertions.
- **Design Agent:** Owns `docs/design/` and UI tokens/specifications.
- **Independent Verifier:** Read-only on source code; executes external verification (`curl`, Bruno, Reticle, audits).

### Safety & Loop Governance
- `.gitignore`: Configured with `.env`, `node_modules`, `dist`, `.DS_Store`
- Folder structure: backend, frontend, database, bruno, docs matching PRD §8
- `LOOP.md`: Active
- `docs/safety.md`: Zero-trust denylist active
- `docs/loop-budget.md`: Budget caps active

### Database Layer
- MySQL 8.4 live on `127.0.0.1:3306`.
- `schema.sql` active with `research_portal.opportunities` table.

### Backend Layer
- `backend/src/app.js`: Configured for `/api/opportunities`.
- Live API Matrix: 20/20 test cases verified PASS via `curl -i`.
- Zero raw SQL queries; 100% `pool.execute` with whitelist.
- Error envelope matches PRD §5 across all routes and middleware.

### Audit Status
- **AUDIT-1:** Complete. Report generated at `docs/audit/AUDIT-1.md`.
  - Stack complies with assignment §4: YES
  - Known findings: Missing `frontend/.env.example`; DB name mismatch in `docs/ARCHITECTURE.md` (`portal_db` vs `research_portal`).
- **AUDIT-2:** Pending human review and authorization.
- **AUDIT-3:** Pending.
