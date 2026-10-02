# STATE.md - Research Opportunity Portal

## Current Phase: P1 Database
## Active Task: P1-A
## Attempts: 0
## Evidence: Verified

### Environment
- Node.js: `v24.18.0` (Requirement Node >= 20: PASSED)
- MySQL: Host CLI pending; schema prepared for execution by human operator

### Safety & Loop Governance
- `.gitignore`: Configured with `.env`, `node_modules`, `dist`, `.DS_Store`
- Folder structure: backend, frontend, database, bruno, docs matching PRD §8
- `LOOP.md`: Active
- `docs/safety.md`: Zero-trust denylist active
- `docs/loop-budget.md`: Budget caps active

### Database Layer
- `database/schema.sql`: Created matching PRD §4 data model exactly (idempotent, single table `opportunities`, `INT UNSIGNED` for `id` and `available_positions`, `status` ENUM).
- Awaiting human verification run:
  - `mysql -u portal -p research_portal < database/schema.sql`
  - `mysql -u portal -p -e "DESCRIBE research_portal.opportunities;"`
