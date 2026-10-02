# Stitch → React Workflow

How Antigravity (via the Stitch MCP and its Stitch skills) produces the UI, how the CTO supervises it, and how it becomes committed React code.

**Inputs:** root `DESIGN.md`, `docs/UI_DESIGN_SPEC.md`, `docs/PRD.md` §3.2/§6, `docs/AI_CONSTRAINTS.md`.
**Outputs:** approved Stitch screens (S1–S9) → `docs/design/` exports → React components in `frontend/src/components/` → verified UI.

Skill paths below are relative to `/home/alucard/Documents/Antigraivty_Data/.agents/skills/`.

---

## Pipeline at a glance

```
S0 Preflight ─► S1 Bind design system ─► S2 Generate screens ─► S3 Review & refine
     │                (DESIGN.md)            (generate-design)      (taste-design, CTO)
     ▼                                                                   │
 STOP if Stitch                                                          ▼
 MCP missing                      S6 Verify UI  ◄── S5 Wire to API ◄── S4 Convert to React
                                  (reticle)         (hooks, fetch)      (react-components, baseline-ui)
```

Roles: **Human** pastes directives/reports and approves gates · **CTO AI** writes directives, reviews evidence, approves gates · **Antigravity** executes.

---

## Phase S0 — Preflight (blocking)

Why: `Complete_guide.md` lists 5 mounted MCP servers (`shadcn-ui`, `magic-ui`, `gsap-master`, `magic-21st`, `reticle`) — **Stitch is not among them**. The Stitch skills assume Stitch MCP tools exist, so confirm before anything else.

Checks Antigravity must perform and report with evidence:

1. List MCP servers from `.agents/mcp.json` / `mcp_config.json`. Is a Stitch server present and running? List its tool names.
2. If absent → **stop**. The human adds the Stitch MCP server (Stitch requires a Google account and an API key/credential; follow the current Stitch documentation for the exact server command — do not guess it) and restarts Antigravity. Credentials go in `.env`/MCP config, never in chat or git.
3. Read these skills' `SKILL.md` (view_file) and report the first lines of each so the CTO can see they loaded: `manage-design-system`, `generate-design`, `taste-design`, `stitch-loop`, `extract-design-md`, `react-components`, `baseline-ui`.
4. Create/select a Stitch project named **"Research Opportunity Portal"**; report its ID/name.

**Gate S0:** MCP tool list + project ID + 7 skill confirmations. Fail → no S1.

Fallback if Stitch cannot be mounted within a reasonable time: build the UI directly from `UI_DESIGN_SPEC.md` using `baseline-ui` + `react-components` conventions (spec is detailed enough). Tell the CTO; do not substitute another design service silently.

---

## Phase S1 — Bind the design system

Skills: `upload-to-stitch` (push `DESIGN.md` + `UI_DESIGN_SPEC.md` text into the project) → `manage-design-system` (create the design system from tokens).

Requirements:
- Colours = the 11 tokens in `DESIGN.md`; fonts = Bowlby One + Inter substitutes (spec §3); radii pills/16–40; **no shadow, no gradient**.
- Antigravity echoes back the design system as it exists in Stitch (token table) so the CTO can diff it against `DESIGN.md`.

**Gate S1:** token table matches `DESIGN.md` exactly (11 colours, radii, fonts). Any extra colour → reject and redo.

---

## Phase S2 — Generate screens

Skill: `generate-design`. Generate **one screen per call** (Stitch handles focused prompts better than mega-prompts), desktop first, then mobile variants for S1/S5/S6.

Order: **S1 → S5 → S6 → S7 → S8 → S9 → S2/S3/S4 → mobile S1/S5/S6**.

### Master context block (prepend to every Stitch prompt)

```
Product: "Research Board" — a university portal where faculty post research opportunities and students browse them.
Style: sticker-book collage on pastel paper. Flat colour only — NO gradients, NO drop shadows.
Palette ONLY: black #000000, white #ffffff, sky wash #dceeff, concrete gray #cccccc, soft mist #e9e9e9,
electric blue #4da2ff, mint #55db9c, lavender #e9ccff, ember #fb4903, sunburst #ffd731, violet #5c4ade.
Every card, button, input and tag has a 1px solid black outline. Buttons/tags/nav are fully pill-shaped; cards 20px radius, modals 32px, inputs 16px.
Fonts: Bowlby One for the big display word only (line-height 0.8); Inter 500/700 for everything else. Button/label text Inter 700, uppercase labels, letter-spacing 0.03em.
Primary action = black-filled pill with white text. Secondary = white pill, black outline. Blue is decorative, never a button colour.
Success/error shown with sticker icons (mint check / ember "!") plus words, not by colour alone.
Decorative flat stickers (flask, atom, magnifier, graduation cap, lightbulb, checkmark) with black outline, slightly rotated.
Top of page: full-width black marquee strip with white uppercase scrolling text.
Do not use any real brand logos. Placeholder text only.
```

### Per-screen prompts (append after the master block)

**S1 Home (desktop, 1440 px):**
"Black marquee strip, then nav: circular 'R' logo left, pill link 'Opportunities' centre, black-filled pill button '+ POST OPPORTUNITY' right. Hero band on #dceeff: huge Bowlby One word 'RESEARCH' (~190px, line-height 0.8) with a flat sticker cluster overlapping it, a 24px Inter tagline, and two outlined stat pills ('6 OPEN', '1 CLOSED'). Below, a white band with status filter pills (ALL / OPEN / CLOSED) and a 3-column grid of 6 opportunity cards. Each card: 56px header band in lavender, mint or electric blue (rotate) containing the research area and an OPEN/CLOSED pill badge; title in Inter 700 24px; faculty · department; 'DEADLINE 30 NOV 2026' label; '3 POSITIONS'; footer with outlined pills VIEW, EDIT, CLOSE and a circular delete icon button. One card is CLOSED (soft mist badge, no CLOSE button). Footer band on #cccccc."

**S5 Detail modal:** "Card-style modal, 32px radius, black outline, over a flat 50% black scrim. Lavender header strip with the title and an outlined CLOSE pill. Body: status badge, area, faculty, department, deadline, positions, description paragraph, required skills as outlined pill chips. Footer: EDIT and CLOSE OPPORTUNITY pills."

**S6 Create form modal:** "Same modal shell. Fields (labels uppercase Inter 700 12px with a tiny ember sticker dot for required): Title, Description (textarea), Research area, Faculty name, Department, Required skills (helper: comma-separated), Available positions (number), Application deadline (date). Footer: outlined CANCEL and black-filled SAVE OPPORTUNITY."

**S7 Validation state:** "Same form with errors: empty Title and Positions = -1. Fields get an ember 2px border; under each, a black 14px message with a small ember '!' sticker ('Title is required', 'Must be 0 or more'). A toast top-centre: white, black outline, ember '!' sticker, 'Please fix the highlighted fields'."

**S8 Delete confirm:** "Small modal: 'Delete this opportunity?', the title in bold, one-line warning, buttons CANCEL (outlined) and DELETE (black filled). Small ember sticker icon at top."

**S9 Toasts:** "Two toasts: success (mint check sticker, 'Opportunity saved') and error (ember '!' sticker, 'Could not reach the server')."

**S2/S3/S4:** loading skeleton cards (flat soft-mist, outlined); empty state (sticker cluster + 'No opportunities yet' + black pill 'POST THE FIRST ONE'); error state (ember sticker + 'Couldn't reach the server' + outlined RETRY).

**Mobile (390 px):** S1 (1 column, nav collapses to logo + circular '+' button, hero word ~96px), S5, S6 (modals become full-height sheets with 24px radius top).

**Gate S2:** each screen exported/recorded under `docs/design/` (PNG + HTML via `extract-static-html`) and listed with its Stitch screen ID.

---

## Phase S3 — Review and refine (CTO-supervised loop)

1. Antigravity runs `taste-design` on each screen: colour harmony, type contrast, balance. Output = list of findings.
2. **CTO review checklist** (reject on any ✗) — compare the screen to `UI_DESIGN_SPEC.md` §9:
   - ✗ shadows / gradients / off-palette colours / a 12th colour
   - ✗ radius < 16 on cards/inputs or non-pill buttons
   - ✗ blue used as button/link
   - ✗ green as semantic fill
   - ✗ display text line-height > 0.85, or display used for data text
   - ✗ missing required UI element (FE-01…FE-10 coverage)
   - ✗ Slush logo/wordmark or copied brand assets
   - ✗ text-on-colour contrast problems, tiny text (< 12 px)
3. Refinement prompts are **specific and surgical** ("remove the shadow from the cards; make the CLOSE button an outlined pill") — one defect class per iteration, max **3 iterations per screen** (matches the 3-strike rule). Still failing → human decides: accept deviation or hand-fix in code.
4. `stitch-loop` is used **only** to keep screens consistent across S1→S9 (shared nav, tokens), not to autonomously invent extra pages. Constraint: **no pages beyond the S-list.**
5. `extract-design-md` (output → `docs/design/extracted-design.md`, per H7) to confirm Stitch's final tokens still equal `DESIGN.md`. Diff reported.

**Gate S3:** CTO signs off all S1–S9 (desktop + required mobile). Record in `STATE.md`: "Design approved, N iterations".

---

## Phase S4 — Convert to React

Skills: `react-components` (Atomic conversion), `baseline-ui`, `react-patterns`, `antislop-ui`.

Preconditions: frontend scaffolded (Vite + TS + Tailwind v4 + `theme.css` tokens + fonts) and **backend Phase 2 complete** so the API exists.

Conversion rules:
- Source of truth for look = approved Stitch HTML; source of truth for tokens = `theme.css` (no raw hex in components — use token classes).
- Strip all Stitch placeholder data; props come from `Opportunity` type.
- Atoms: `PillButton`, `PrimaryButton`, `IconStickerButton`, `StatusBadge`, `SkillChip`, `Sticker`, `FormField`, `Input`, `Textarea`. Molecules: `OpportunityCard`, `StatPill`, `Toast`, `FilterPills`. Organisms: `MarqueeBanner`, `NavBar`, `Hero`, `OpportunityGrid`, `OpportunityFormModal`, `OpportunityDetailModal`, `ConfirmDialog`, `StateViews` (loading/empty/error).
- Native `<dialog>` for modals; focus management per spec §8.
- Run `baseline-ui` (Tailwind defaults, `cn()`, `h-dvh`, `text-balance` on headings, no gradients/layout-animation) **and** reconcile with `DESIGN.md` — project docs win on conflict.
- Each organism = one atomic task, built and visually checked before the next.

**Gate S4 (per organism):** `npm run build` + `eslint` pass, component renders with props, no hex literals, no shadow/gradient classes (grep evidence).

---

## Phase S5 — Wire to the API

`src/api/opportunities.ts` (typed `fetch` wrappers with envelope parsing → throws `ApiError{status, code, details}`), `useOpportunities` hook (load, create, update, remove, refetch; `status: 'loading'|'ready'|'error'`), `useToast`. Map `details[]` to form fields. Disable submit while pending. No optimistic updates.

**Gate S5:** with backend running, create/list/edit/close/delete work end-to-end; stop the backend → error state with Retry works.

---

## Phase S6 — Verify (live)

Skills: `reticle`, `fixing-accessibility`, `antislop-ui`, `code-review-excellence`.

Reticle protocol (from guide §4): `reticle_session` → declare `intent` → `reticle_act_and_wait` → require `verified: "yes"` → completion gate `npx @reticlehq/server gate --since HEAD~1`.

Scenarios Antigravity must prove (each with DOM/network evidence):
1. List renders N cards equal to the API count (network 200).
2. Create with valid data → POST 201 → toast text present → new card in DOM.
3. Submit empty form → no network call; inline errors present with `aria-invalid="true"`.
4. Server 400 (force via invalid positions bypassing client check) → field error shown.
5. Edit → PUT 200 → card text updates.
6. Close → PUT 200 → badge text "CLOSED", Close button gone.
7. Delete → confirm → DELETE 200 → card removed; list count −1.
8. Computed styles: hero line-height ≤ 0.85; card `border-radius` ≥ 16 px; no `box-shadow` ≠ none on cards/buttons/modals; button radius ≥ 1000 px.
9. Keyboard: Tab order, focus ring visible, Esc closes modal, focus returns to trigger.
10. 360 px viewport: no horizontal scroll.

**Gate S6:** all ten verified; screenshots only as a supplement (Reticle is primary evidence).

---

## What the CTO does at every gate

1. Receive the report (files, commands, evidence).
2. Check the evidence is real (output excerpts, not claims).
3. Compare to the relevant spec section; list pass/fail per item.
4. Reply with **APPROVE → next directive** or **REJECT → exact remediation prompt** (templates in `CTO_GUIDE.md` §7).
5. Ensure `STATE.md` and the commit list stay in sync with PRD §11.

## Known Stitch limitations to plan around

- Stitch can't produce the grainy 3D ribbon; use sticker cluster (spec §2). Optional static ribbon image may be added by the human.
- Stitch tends to add soft shadows and gradients by default → state "no shadows/gradients" in every prompt and check each screen.
- Stitch may regenerate neighbouring screens inconsistently → freeze approved screens; edit only the target.
- Usage quotas and model availability change — check in the Stitch UI before a long session; don't loop endlessly against a quota.
- Generated HTML isn't production code (div-soup, inline styles, missing a11y) → that's why S4 rebuilds it as components rather than copy-pasting.
