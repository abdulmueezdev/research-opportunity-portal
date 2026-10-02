# Safety & Security Governance Policy — Research Opportunity Portal

> **Target Workspace:** `/home/alucard/Documents/Antigraivty_Data/research-opportunity-portal`  
> **Status:** ENFORCED  
> **Governance Standard:** Zero-Trust Autonomous Operations

---

## 1. Protected Paths Denylist

Autonomous agents and automated loop scripts are **STRICTLY PROHIBITED** from modifying, deleting, reading, or printing files matching the following paths without explicit, pre-verified human approval:

```yaml
denylist_paths:
  # Environment & Credentials
  - ".env"
  - ".env.*"
  - "**/*credential*"
  - "**/*secret*"
  - "**/*.pem"
  - "**/*.key"
  - "**/*id_rsa*"

  # Payment, Billing & Monetary Logic
  - "**/payment/**"
  - "**/billing/**"
  - "**/checkout/**"
  - "**/stripe/**"
  - "**/subscriptions/**"

  # Production Infrastructure & Deployment Configs
  - "**/deploy/**"
  - "**/k8s/**"
  - "**/terraform/**"
  - ".github/workflows/deploy*.yml"
  - ".github/workflows/release*.yml"

  # Core Loop Safety Invariants
  - "docs/safety.md"
  - "docs/AI_CONSTRAINTS.md"
```

Any attempt by an automated loop to stage edits to any denylisted path must immediately halt execution, log an alert, and escalate to a human operator.

---

## 2. Auto-Merge Policy: Strictly Prohibited

- Autonomous loops and subagents **must never auto-merge** pull requests or push commits directly to `main` or release branches.
- All code changes must be submitted as atomic, verified git commits on local branches requiring human review and approval.
- Automated tests or verification steps must pass 100% before human review, but green tests never substitute for human authorization.

---

## 3. Least-Privilege Execution

- Exploration and research operate with read-only tools.
- Write access is bounded strictly to the project root and subdirectories (`backend/`, `frontend/`, `database/`, `bruno/`, `docs/`).
- Never execute commands with `sudo` or request administrative privileges.
- Never read or output `.env` contents to chat logs or commit history.
