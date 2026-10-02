# Loop Operational Specification & Governance — Research Opportunity Portal

> **Project Root:** `/home/alucard/Documents/Antigraivty_Data/research-opportunity-portal`  
> **Governance Mode:** Phase-Gated Atomic Monotasking  
> **Status:** ACTIVE

---

## 1. Operational Cadence & Pattern

- **Cadence:** Task-driven loop execution. The loop wakes upon receiving an explicit atomic directive or scheduled task event.
- **Pattern:** Maker/Checker split.
  - **Maker Agent:** Develops the feature or applies the fix within an atomic task scope (1–3 files).
  - **Checker Agent (`loop-verifier`):** Validates the outcome independently using tests, shell checks, or Reticle assertions before declaring completion.
- **Isolation:** Changes must be verified against git working tree status prior to staging or committing.

---

## 2. Safety Gates & Auto-Merge Policy

- **Approval Gates:** Explicit human gates required for dependencies, schema alterations, and architectural decisions.
- **Auto-Merge Policy:** **STRICTLY PROHIBITED.** Auto-merging to `main` without human review is forbidden. All changes remain local until human inspection.
- **Protected Paths & Denylists:** Governed strictly by `docs/safety.md` and `docs/AI_CONSTRAINTS.md`. Any task attempting to touch denylisted paths triggers an immediate halt and human hand-off.

---

## 3. Budget, Token Caps & Kill Switch

- **Task Budget:** 50,000 tokens maximum per single atomic task.
- **Daily Project Token Cap:** 100,000 tokens maximum across all automated operations per 24-hour window.
- **Circuit Breaker:** 3 consecutive failed verification attempts trips the breaker; stops execution and requests human intervention (`needs human review`).
- **Emergency Kill Switch:**
  - Create `.kill-switch` in the project root or invoke `loop-pause-all`.
  - When `.kill-switch` is present, the agent runtime immediately aborts all operations cleanly.

---

## 4. Multi-Agent & Skill Integration

- Loop governance supported by local skills: `loop-triage`, `loop-verifier`, `loop-budget`, `loop-constraints`, and `skill-inspector`.
- Verifiers operate independently of makers to maintain impartial quality gates.
