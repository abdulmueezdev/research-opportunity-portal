# Design Refinement Report: Aesthetics & Token Compliance Audit

**Task:** P4-S4-A (Aesthetics & Tokens)  
**Agent:** Design Refinement Agent  
**Date:** 2026-10-03  
**Target Codebase:** Research Opportunity Portal  
**Audit Scope:** 9 Generated Stitch Screens (S1, S2, S3, S4, S5, S6, S7, S8, S9)  
**Authorities:** Root `DESIGN.md`, `docs/UI_DESIGN_SPEC.md` (§3 Tokens), `taste-design` Skill, `extract-design-md` Skill  
**Deliverable Artifacts:**
- `docs/design/extracted-design.md`
- `docs/design/p4-s4-a-refinement-report.md`

---

## 1. Executive Summary & Audit Scorecard

An exhaustive visual, code, and token audit of the 9 generated Google Stitch screens (`S1` through `S9`) was conducted to evaluate visual quality, token compliance, and adherence to the "Slush" sticker-book aesthetic principles.

Overall, the generated Stitch screens capture the intended tactile "sticker-book research board" aesthetic with high fidelity: full-bleed pastel section grounds, bold hand-cut 1px solid black outlines, high-contrast pill buttons and badges, crushed monumental display typography in the hero band, and completely flat elevation (zero drop shadows and zero gradients across all screens).

However, the audit identified several **systematic AI generation artifacts, font drift inconsistencies, and Material Design 3 (MD3) token leaks** that must be rigorously normalized during the React implementation (Phase 5).

### Compliance Scorecard

| Checkpoint | Spec Requirement | Stitch Screen Result | Status | Action for React Conversion |
|:---|:---|:---|:---|:---|
| **Drop Shadows** | Strictly zero box-shadows / text-shadows | Zero `shadow-*` utility classes found. 8 of 9 screens include explicit `box-shadow: none !important;` overrides. S7 missing style tag. | **PASS (Minor S7 defect)** | Enforce global `* { box-shadow: none !important; }` in `theme.css`. |
| **Gradients** | Strictly zero gradients anywhere | 0 gradient classes or styles found across all 9 screens. | **PASS** | Maintain 100% flat color fills. |
| **Color Palette** | 11 core tokens only (Carbon, Paper White, Sky Wash, Concrete Gray, Soft Mist, Electric Blue, Mint Pop, Lavender, Ember, Sunburst, Voltage Violet) | Core 11 tokens present, but Stitch injected 47 MD3 tokens into `tailwind.config` and HTML (`border-primary` 501x, `text-on-surface-variant` 137x, `#f9f9f9` in scrollbars). | **DRIFT DETECTED** | Purge MD3 tokens; remap all classes strictly to the 11 core CSS variables. |
| **Button Pill Radii** | All buttons/nav/tags pill-shaped (1600px / `rounded-full`) | 99% of buttons are `rounded-full`. 2 stepper buttons in S7 use `rounded` (16px). | **PASS (Minor S7 defect)** | Force `rounded-full` on all interactive buttons and chips. |
| **Card & Modal Radii** | Cards: 20px (`rounded-[20px]`); Modals: 30–40px (`rounded-[32px]`); Inputs: 16px (`rounded-[16px]`) | Main cards and modals strictly conform to 20px and 32px. Background cards in S6/S7 use `rounded-lg` (8px). | **PASS (Minor S6/S7 defect)** | Ensure all opportunity cards use `rounded-[20px]`. |
| **Button Action Fill** | Primary: Black fill; Secondary: White outlined; Blue is NEVER a CTA fill | Zero blue buttons found. Primary actions are black-filled; secondary are white-outlined. However, S8 Delete button has red/ember fill. | **DEFECT (S8)** | Revert S8 Delete button to black fill with white text and Ember sticker icon. |
| **Font Family Count** | Max 2 families: Bowlby One (Display) and Inter (UI) | Font drift across screens: S1/S3/S4/S5 use Inter; S2/S8/S9 drifted to `Plus Jakarta Sans`; S6 drifted to `Space Grotesk`. | **DEFECT** | Normalize all screens to `@fontsource/bowlby-one` and `@fontsource-variable/inter`. |
| **Display Line-Height** | Line-height <= 0.85 on Bowlby One | S1 hero wordmark uses `leading-[0.8]`. Display tokens set to `0.80` and `0.75`. | **PASS** | Retain `leading-[0.8]` on hero display word. |
| **Emoji Ban** | Zero emojis anywhere | 2 literal Unicode emojis found: `🧪` (S1 line 202) and `💡` (S3 line 390). | **DEFECT** | Replace emojis with clean inline SVG stickers. |
| **Theme System** | Single light theme ("inflatable sticker universe on pastel paper") | S1, S4, S5, S6, S7, S9 contain hallucinated `dark:` Tailwind classes. | **DEFECT** | Strip all `dark:` classes; enforce pure light theme. |

---

## 2. Screen-by-Screen Visual Quality & Defect Matrix

### Screen S1: Home Populated (Desktop)
- **Stitch Screen ID:** `295d3f758bc74bd4b880d94d5fba2bb5` (Resolution: `2560 x 4186`)
- **Aesthetic Quality:** Excellent. Strong visual rhythm with the black marquee banner, sky wash hero band, monumental `RESEARCH` wordmark (~190px, `leading-[0.8]`), and 3-column card grid with rotating header washes (Lavender, Mint Pop, Electric Blue).
- **Token Compliance:** High. Correct 1px solid black borders, 20px card radii, and 1600px pill buttons.
- **Defects Identified:**
  1. *Emoji in Sticker Cluster:* Line 202 contains a literal Unicode test tube emoji `🧪` inside a Voltage Violet sticker circle. Must be replaced with an SVG icon.
  2. *Injected MD3 Tokens:* Uses `border-primary` instead of `border-carbon`, and `text-on-surface-variant` (`#4c4546`) for secondary text.
  3. *Hallucinated Dark Classes:* Contains 24 `dark:` classes (e.g. `dark:bg-inverse-surface`).

### Screen S2: Home Loading Skeleton (Desktop)
- **Stitch Screen ID:** `a286fed80cab4a448ac39acf54c4cdee` (Resolution: `2560 x 3922`)
- **Aesthetic Quality:** Very Good. 6 skeleton opportunity cards with Soft Mist (`#e9e9e9`) placeholder blocks and 1px solid black outlines.
- **Token Compliance:** Good. Cards use `rounded-[20px]`.
- **Defects Identified:**
  1. *Font Drift:* `fontFamily` in `tailwind.config` maps `heading`, `subheading`, `body-lg`, and `caption` to `Plus Jakarta Sans` instead of `Inter`.
  2. *Skeleton Text Placeholder Radii:* Placeholder bars use `rounded-lg` (8px) and `rounded-md` (6px). In the React implementation, these should use standard `rounded-full` or `rounded-[4px]`.
  3. *Container Radius:* Search filter wrapper uses `rounded-2xl` (24px) instead of standard pill `rounded-full` or card `rounded-[20px]`.

### Screen S3: Home Empty State (Desktop)
- **Stitch Screen ID:** `9937b7283bf14ac0917b82b41f1d36db` (Resolution: `2560 x 3692`)
- **Aesthetic Quality:** Good. Retains the top marquee, nav bar, and sky wash hero band, with a centered empty-state canvas and sticker cluster.
- **Token Compliance:** Acceptable.
- **Defects Identified:**
  1. *Emoji in Tip Section:* Line 390 contains a literal Unicode lightbulb emoji `<span class="text-base">💡</span>`. Must be replaced with an SVG lightbulb sticker.
  2. *Empty State Container Radius:* Container uses `rounded-lg` (8px in standard Tailwind) instead of `rounded-[20px]` or `rounded-[32px]`.
  3. *Background Surface Color:* Container background is `bg-surface` (`#f9f9f9`), an MD3 injected color, instead of `bg-paper-white` (`#ffffff`).

### Screen S4: Home Fetch Error State (Desktop)
- **Stitch Screen ID:** `1c84bb8cf9f241e2b6de38cebc623711` (Resolution: `2560 x 3360`)
- **Aesthetic Quality:** Strong. Centered error card with 1px black outline, Ember "!" sticker badge, clear copy ("Check that the backend is running on port 4000."), and outlined RETRY button.
- **Token Compliance:** High. Error container is `rounded-[20px]`, button is `rounded-full`.
- **Defects Identified:**
  1. *MD3 Neutral Drift:* Body text uses `text-on-surface-variant` (`#4c4546`).
  2. *Hallucinated Dark Classes:* 26 `dark:` utility classes present.

### Screen S5: Opportunity Detail Modal
- **Stitch Screen ID:** `9b5424242f6f4b6d890efdca2f1c6437` (Resolution: `2560 x 2526`)
- **Aesthetic Quality:** Outstanding. 32px radius modal container with 1px black outline, Lavender header strip with CLOSE pill button, organized metadata grid, and flat 50% Carbon scrim (`rgba(0,0,0,0.5)`).
- **Token Compliance:** High. Zero drop shadows, flat scrim with zero blur.
- **Defects Identified:**
  1. *Non-token Scrollbar Track Color:* Line 148 defines `::-webkit-scrollbar-track { background: #f9f9f9; }`. `#f9f9f9` is a non-token MD3 color; should be `Paper White` (`#ffffff`) or `Soft Mist` (`#e9e9e9`).
  2. *MD3 Neutral Drift:* Extensive use of `border-primary` and `text-on-surface-variant`.

### Screen S6: Post Opportunity Create Form Modal
- **Stitch Screen ID:** `cd978b0c52644a13bd4b8fae60956c61` (Resolution: `2560 x 2048`)
- **Aesthetic Quality:** Very Good. Form inputs have 16px radius, uppercase labels with Ember required dots, and pill footer buttons (CANCEL and SAVE OPPORTUNITY).
- **Token Compliance:** Moderate.
- **Defects Identified:**
  1. *Critical Font Drift:* Injects Google font `Space Grotesk:wght@500;700` and `Bowlby One SC`, mapping `heading` and `subheading` to `Space Grotesk`! Must be purged and normalized to `Inter`.
  2. *Background Card Radii:* Background decorative cards visible behind scrim use `rounded-lg` (8px) instead of `rounded-[20px]`.
  3. *Scrollbar Color:* Line 198 sets scrollbar track to `#f9f9f9`.

### Screen S7: Form Validation State Modal
- **Stitch Screen ID:** `4288c6d6aebb42cab2340b055e053e05` (Resolution: `2560 x 2048`)
- **Aesthetic Quality:** Good. Clear validation feedback: empty Title and negative Positions fields feature 2px Ember borders and inline Ember "!" error messages. Top-center alert toast pill is present.
- **Token Compliance:** Moderate.
- **Defects Identified:**
  1. *Missing Style Tag:* S7 is the **only screen** lacking the `<style>` block containing `* { box-shadow: none !important; }`.
  2. *Non-pill Radii on Stepper Buttons:* Stepper buttons `▲` and `▼` (lines 377–378) use `rounded` (16px) instead of `rounded-full` (1600px).
  3. *Missing Google Font Links in Head:* S7 omitted the `<link>` tags for `Bowlby One` and `Inter`, linking only `Material Symbols Outlined`.

### Screen S8: Delete Confirmation Dialog Modal
- **Stitch Screen ID:** `969553f2d88b4390895b9d18bbec0670` (Resolution: `2560 x 2048`)
- **Aesthetic Quality:** Good. Compact dialog with 32px radius, 1px black outline, Ember warning badge, and flat 50% scrim.
- **Token Compliance:** Significant defect on action button.
- **Defects Identified:**
  1. *Delete Button Fill Violation:* The DELETE button is styled with `bg-ember` (solid hot orange-red fill with white text). This directly violates `docs/UI_DESIGN_SPEC.md` §5: *"buttons: 'Cancel' (outlined, default focus) and 'Delete' (black fill). Destructive weight comes from wording + Ember sticker, not red fill."*
  2. *Font Drift:* Maps typography to `Plus Jakarta Sans` in `tailwind.config`.

### Screen S9: Notification Toast States (Desktop)
- **Stitch Screen ID:** `7e55d9026a2540729f99dec5000d38b0` (Resolution: `2560 x 3284`)
- **Aesthetic Quality:** Excellent. Top-center floating toast pills (white container, 1px black outline, zero drop shadow). Success toast features a Mint Pop checkmark sticker; error toast features an Ember "!" sticker.
- **Token Compliance:** High.
- **Defects Identified:**
  1. *Font Drift:* Uses `Plus Jakarta Sans` in `tailwind.config`.
  2. *Hallucinated Dark Classes:* Contains 26 `dark:` utility classes.

---

## 3. Taste-Design & Aesthetic Evaluation

Applying the core directives from the `taste-design` skill:

### 3.1 Color Harmony & Calibration
- **Neutral Ground:** The alternating section bands (`#dceeff` Sky Wash → `#ffffff` Paper White → `#cccccc` Concrete Gray) create a calm, tactile foundation that grounds the high-contrast sticker elements.
- **Singular Accent Rule vs Rainbow Sticker Palette:** While `taste-design` warns against multiple accents, the Slush style reference explicitly mandates a **shared six-color sticker palette** (`#4da2ff`, `#55db9c`, `#e9ccff`, `#fb4903`, `#ffd731`, `#5c4ade`). The Stitch screens successfully confine these colors to sticker icons, badges, and card header wash bands, ensuring they function as playful collage cutouts without turning into chaotic gradients.
- **Zero AI Purple/Blue Glow:** There are zero neon glows, zero ambient box-shadows, and zero purple button washes. All active and focus states use flat color borders.

### 3.2 Typography Contrast & Visual Scale
- **Display Restraint:** The crushed display typography (Bowlby One, `leading-[0.8]`) is appropriately isolated to the hero wordmark (`RESEARCH`) and modal headers. Data-dense cards, tables, and form inputs strictly use the UI type scale (`Inter 500/700`, 12px–24px).
- **Legibility:** All text placed over pastel wash bands (Lavender, Mint Pop, Electric Blue) is rendered in Carbon (`#000000`), exceeding WCAG AAA standards with a contrast ratio greater than `7.5:1`.

### 3.3 Visual Balance & Anti-Pattern Audit
- **Anti-Pattern 1 (No Emojis):** **FAILED by Stitch.** Two literal emojis (`🧪` in S1 and `💡` in S3) were found. Must be converted to SVG vectors in React.
- **Anti-Pattern 2 (No 3-Column Equal AI Cards):** S1 uses a 3-column grid, but each card is individualized with rotating header washes (Lavender, Mint Pop, Electric Blue), varying tag counts, and distinct status badges, avoiding the sterile "AI template" look.
- **Anti-Pattern 3 (No Fake Data / Fake Metrics):** Stitch generated plausible university research postings ("Autonomous Drone Navigation", "Neural Plasticity", "Urban Heat Island Mitigation") without fake uptime or percentage metrics ("99.99% SLA"). In React, all mock data will be completely replaced with live API state.
- **Anti-Pattern 4 (No Gradients):** 100% compliant. Zero gradients exist in any generated screen.

---

## 4. Discovered Defect Catalog

A detailed index of all defects identified across the 9 screens, categorized by severity:

| Defect ID | Category | Affected Screens | Severity | Description & Root Cause |
|:---|:---|:---|:---|:---|
| **DEF-01** | Token Leaks | All (S1–S9) | **HIGH** | **Material Design 3 Token Drift:** Stitch's backend generator injected 47 MD3 tokens into `tailwind.config`. In the HTML, Stitch used `border-primary` (501 occurrences) instead of `border-carbon`, `text-on-surface-variant` (`#4c4546`, 137 occurrences) instead of `text-carbon`, and `bg-surface-variant` / `bg-surface-dim` instead of `bg-paper-white` / `bg-soft-mist`. |
| **DEF-02** | Typography | S2, S6, S8, S9 | **HIGH** | **Font Family Drift:** Inconsistent font family declarations across screens. S2, S8, and S9 mapped UI text to `Plus Jakarta Sans`. S6 linked and applied `Space Grotesk` and `Bowlby One SC`. S7 omitted font stylesheet links. |
| **DEF-03** | Button Spec | S8 | **HIGH** | **Delete Button Red Fill Violation:** In S8 (Delete Confirmation), the DELETE button was given `bg-ember` (solid orange-red fill with white text). The UI Design Spec (§5) mandates black fill with white text and an Ember sticker icon (`ConfirmDialog`). |
| **DEF-04** | Radii Spec | S7 | **MEDIUM** | **Non-Pill Stepper Buttons:** In S7, the number stepper increment/decrement buttons (`▲` and `▼`) were assigned `rounded` (16px) instead of `rounded-full` (1600px pill). |
| **DEF-05** | Radii Spec | S2, S6, S7 | **LOW** | **Non-Token Card Radii in Mockups:** S6 and S7 background cards use `rounded-lg` (8px in default Tailwind). S2 search container uses `rounded-2xl` (24px). Must be normalized to `rounded-[20px]` (cards) and `rounded-full` (filters). |
| **DEF-06** | Aesthetic Ban | S1, S3 | **MEDIUM** | **Literal Unicode Emojis:** S1 line 202 contains `🧪` (U+1F9EA); S3 line 390 contains `💡` (U+1F4A1). Both violate the Taste Design anti-emoji rule. |
| **DEF-07** | CSS Override | S7 | **MEDIUM** | **Missing Box-Shadow Override in S7:** S7 lacks the `<style>` block containing `* { box-shadow: none !important; text-shadow: none !important; }` present in the other 8 screens. |
| **DEF-08** | Color Spec | S5, S6 | **LOW** | **Non-Token Scrollbar Color:** S5 line 148 and S6 line 198 set `::-webkit-scrollbar-track { background: #f9f9f9; }`. `#f9f9f9` is an unapproved MD3 neutral. |
| **DEF-09** | Architecture | S1, S4, S5, S6, S7, S9 | **LOW** | **Hallucinated Dark Mode Classes:** Multiple screens contain `dark:*` Tailwind classes. The application is strictly a light-theme pastel paper system. |

---

## 5. Prescriptive Fixes for the React Implementation

During Phase 5 (Frontend Implementation), frontend engineers must follow these prescriptive directives to ensure 100% compliance with the design specification:

### 5.1 Token & CSS Variable Normalization (`theme.css`)
In `frontend/src/styles/theme.css`, configure Tailwind v4 to declare **only** the 11 core design tokens:
```css
@theme {
  --color-carbon: #000000;
  --color-paper-white: #ffffff;
  --color-sky-wash: #dceeff;
  --color-concrete-gray: #cccccc;
  --color-soft-mist: #e9e9e9;
  --color-electric-blue: #4da2ff;
  --color-mint-pop: #55db9c;
  --color-lavender: #e9ccff;
  --color-ember: #fb4903;
  --color-sunburst: #ffd731;
  --color-voltage-violet: #5c4ade;

  --font-display: 'Bowlby One', cursive, sans-serif;
  --font-ui: 'Inter', ui-sans-serif, system-ui, sans-serif;

  --radius-card: 20px;
  --radius-modal: 32px;
  --radius-input: 16px;
  --radius-pill: 1600px;
}

/* Global Strict Flat Aesthetic Override */
*, *::before, *::after {
  box-shadow: none !important;
  text-shadow: none !important;
}

/* Scrollbar Track Normalization */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-paper-white);
}
::-webkit-scrollbar-thumb {
  background: var(--color-carbon);
  border-radius: 9999px;
}
```

### 5.2 Remapping Stitch HTML Classes to Core Tokens

| Stitch HTML Class Found | Approved React / Tailwind Class | CSS Property Value |
|:---|:---|:---|
| `border-primary` | `border-carbon` or `border-black` | `1px solid #000000` |
| `text-on-surface-variant` (`#4c4546`) | `text-carbon` | `#000000` |
| `bg-surface-variant` (`#e2e2e2`) | `bg-soft-mist` | `#e9e9e9` |
| `bg-surface` (`#f9f9f9`) | `bg-paper-white` | `#ffffff` |
| `text-outline` (`#7e7576`) | `text-carbon/60` (placeholder only) | `rgba(0,0,0,0.6)` |
| `error` (`#ba1a1a`) | `border-ember` / `text-ember` | `#fb4903` |
| `rounded-lg` (on cards) | `rounded-[20px]` | `20px` |
| `rounded` (on stepper buttons) | `rounded-full` | `1600px` |
| `dark:*` | *(Remove entirely)* | Light-theme only |

### 5.3 Component-Specific Prescriptive Corrections

1. **Delete Confirmation Dialog (`ConfirmDialog.tsx`):**
   - Correct the action buttons from Stitch S8:
   ```tsx
   {/* Cancel Button */}
   <button 
     type="button"
     onClick={onCancel}
     className="px-6 py-3 rounded-full border border-carbon bg-paper-white text-carbon font-bold uppercase tracking-wider text-xs hover:bg-soft-mist active:translate-y-[1px] transition-transform"
   >
     Cancel
   </button>

   {/* Delete Button: Black fill with white text and Ember sticker icon */}
   <button 
     type="button"
     onClick={onConfirm}
     className="flex items-center gap-2 px-6 py-3 rounded-full border border-carbon bg-carbon text-paper-white font-bold uppercase tracking-wider text-xs hover:bg-[#1a1a1a] active:translate-y-[1px] transition-transform"
   >
     <span className="w-4 h-4 rounded-full bg-ember border border-carbon flex items-center justify-center text-carbon text-[10px] font-black leading-none">
       !
     </span>
     Delete Opportunity
   </button>
   ```

2. **Form Stepper Control (`FormField.tsx`):**
   - Ensure stepper buttons in number inputs use pill or fully rounded container integration:
   ```tsx
   <div className="flex items-center border border-carbon rounded-[16px] bg-paper-white overflow-hidden p-1">
     <input 
       type="number"
       min={0}
       step={1}
       className="w-full px-3 py-2 bg-transparent text-carbon font-medium focus:outline-none"
     />
   </div>
   ```

3. **Sticker Icon Replacement:**
   - Convert `🧪` and `💡` into SVG components or Lucide icons wrapped in flat 1px outlined sticker containers:
   ```tsx
   {/* Science Lab Sticker */}
   <div className="w-8 h-8 rounded-full bg-mint-pop border border-carbon flex items-center justify-center">
     <FlaskConical className="w-4 h-4 text-carbon stroke-[2.5]" />
   </div>

   {/* Idea / Tips Sticker */}
   <div className="w-8 h-8 rounded-full bg-sunburst border border-carbon flex items-center justify-center">
     <Lightbulb className="w-4 h-4 text-carbon stroke-[2.5]" />
   </div>
   ```

4. **Card Header Wash Rotation Helper:**
   ```typescript
   export function getHeaderWashClass(id: number): string {
     const washes = ['bg-lavender', 'bg-mint-pop', 'bg-electric-blue'];
     return washes[Math.abs(id) % washes.length];
   }
   ```

---

## 6. Conclusion

The Stitch screen generation phase successfully realized the visual identity, structure, and aesthetic posture of the "Research Board" portal across all 9 required states. With the defects cataloged and prescriptive normalizations documented above, the design system is fully audited, token-mapped, and ready for clean, defect-free React implementation in Phase 5.
