# STATE.md - Research Opportunity Portal

## Current Phase: P0 Foundation
## Active Task: P0-B2
## Attempts: 0
## Evidence: Verified

### Environment
- Node.js: `v24.18.0` (Requirement Node >= 20: PASSED)
- MySQL: `command not found` (Candidate `mysql-server 8.4.11` available in apt; needs install before DB phase)

### Safety & Loop Governance
- `.gitignore`: Configured with `.env`, `node_modules`, `dist`, `.DS_Store`
- Folder structure: backend, frontend, database, bruno, docs matching PRD §8
- `LOOP.md`: Created with task-driven cadence, maker-checker rule, no auto-merge, kill switches
- `docs/safety.md`: Strict path denylist for secrets, `.env`, payment, and deployment files
- `docs/loop-budget.md`: 50k tokens/task, 100k daily project ceiling proposal, 3-strike circuit breaker
- `docs/AI_CONSTRAINTS.md`: H9 updated with Loop Engineering rules
- `docs/CTO_GUIDE.md`: Roadmap updated with P0-B2
- Skills verified: `loop-budget`, `loop-constraints`, `loop-triage`, `loop-verifier`, and `skill-inspector` confirmed available
