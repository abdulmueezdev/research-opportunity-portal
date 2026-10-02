# STATE.md - Research Opportunity Portal

## Current Phase: P0 Foundation
## Active Task: P0-A
## Attempts: 0
## Evidence: Verified

### Environment
- Node.js: `v24.18.0` (Requirement Node >= 20: PASSED)
- MySQL: `command not found` (Candidate `mysql-server 8.4.11` available in apt; needs install before DB phase)

### Safety & Structure
- `.gitignore`: Configured with `.env`, `node_modules`, `dist`, `.DS_Store`
- Folder structure: backend, frontend, database, bruno, docs matching PRD §8
- All empty directories tracked via `.gitkeep`
