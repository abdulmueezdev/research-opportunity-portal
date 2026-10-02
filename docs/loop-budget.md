# Loop Budget, Token Caps & Cost Observability — Research Opportunity Portal

> **Target Workspace:** `/home/alucard/Documents/Antigraivty_Data/research-opportunity-portal`  
> **Cost Policy:** Strict Token Quotas & Circuit Breakers

---

## 1. Token Caps & Allocation

To avoid runaway LLM loops and prevent excessive context consumption, all autonomous processes adhere to strict token budgets:

| Tier | Allocation / Cap | Scope | Action on Exceeding |
| :--- | :--- | :--- | :--- |
| **Atomic Task Budget** | `50,000` tokens | Single atomic task | Task pauses; yields back to planner |
| **Single Loop Iteration** | `25,000` tokens | One iteration loop pass | Graceful early exit |
| **Daily Project Ceiling** | `100,000` tokens | Total usage in 24 hours | Hard stop; all loops blocked until next cycle |

> **Architectural Proposal (Per-Agent vs Total):**  
> We propose that the **100,000 token daily ceiling apply as a TOTAL aggregate across all agents/subagents**, rather than per-agent. In a monotasking, phase-gated setup, tracking a single global total prevents multi-agent token inflation, keeps cost observable, and guarantees deterministic limits.

---

## 2. Max Retry Limits: The 3 Strikes Policy

Autonomous self-healing is strictly bounded:
* **Attempt 1:** Standard task execution and verification.
* **Attempt 2:** Targeted self-heal based on specific error output / verification feedback.
* **Attempt 3:** Alternative fallback implementation.
* **Strike 3 (Failure):** **Circuit Breaker Trips.**
  - Execution stops immediately with exit code 2.
  - An entry is logged in `STATE.md` under Human Escalation Log (`needs human review`).
  - Agent halts all tool calls and escalates to human operator.

---

## 3. Emergency Kill Switch

- If unexpected loop iteration or cost inflation is detected:
  1. Create `.kill-switch` in the project root.
  2. Or invoke `loop-pause-all`.
- All loop execution processes must inspect for the existence of `.kill-switch` before running tool operations.
