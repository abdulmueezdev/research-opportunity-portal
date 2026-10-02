# UI Design Spec — Research Opportunity Portal

**Purpose:** turn the root `DESIGN.md` (a style reference extracted from the Slush wallet site) into a concrete, buildable design for a CRUD app. This file is the **brief for Google Stitch** and the **checklist for the React conversion**.

**Authority:** `DESIGN.md` owns *tokens and rules* (colours, type, radii, do/don't). This file owns *screens, components, states and adaptations*. Assignment functional requirements (PRD §3) outrank both. Never edit root `DESIGN.md`.

---

## 1. Design concept

> "Sticker-book research board." A pale-blue paper wall where each research opportunity is a hand-cut, black-outlined sticker card. Loud display type, flat colour, no shadows, no gradients.

Adaptation principle: the reference is a *marketing poster*; ours is a *working tool*. Keep the **identity** (palette, outlines, pills, sticker accents, crushed display type, marquee) and tone down the **scale** (display type only in the hero band; everything data-heavy uses the UI type scale).

## 2. Adaptation decisions (where the reference meets a CRUD app)

| Reference rule | Problem for the portal | Decision |
|---|---|---|
| Display 200–640 px, line-height 0.75–0.80 | 640 px is unusable for a tool. | Hero only: `clamp(96px, 17vw, 200px)`, line-height 0.8. Section headings use `heading` (64) / `heading-sm` (30). Never above 0.85 line-height on display text. |
| "Pair every display headline with 3D ribbon or sticker cluster" | We can't render a grainy 3D ribbon. | Satisfy with the **"or sticker cluster"** branch: 3–4 flat SVG stickers around the hero word. Optional: one static ribbon image *if Stitch or an asset provides it*; never block on it. |
| No green as success state | Assignment requires success messages. | Success = white toast + **Mint checkmark sticker** (decorative, allowed) + text "Saved". Error = white toast + **Ember "!" sticker** + text. State is conveyed by icon + words, not colour fill. |
| Blue is never a CTA/link colour | — | Primary CTA black fill; secondary black outline. Blue only as washes/ribbon/card header bands. |
| No box-shadows | Modals normally need elevation. | Modal = white card, 1 px black outline, 30–40 px radius, over a **flat 50 % Carbon scrim** (flat colour, not a gradient). |
| Sunburst never a text background | — | Sunburst only on stickers/icons. |
| No gradients | — | None, anywhere. |
| Min radius 16 px on cards, 1600 px (pill) on buttons/tags | Inputs unspecified. | Inputs 16 px radius, 1 px black. Buttons/tags/nav pill. |
| Page max-width ≥ 1280 | — | Content container `max-width: 1440px`, fluid padding 16/24/48 px by breakpoint. |
| Motion: marquee + hover only | — | Same. No page-load or scroll animation. `prefers-reduced-motion` → marquee paused. |
| Fonts Lateral / Aeonik Pro | Commercial, not installable offline. | Substitutes (see §3). Never hot-link a paid font. |
| Brand "Slush" assets (logo S, rocket, coin, wallet) | Another company's identity. | Use own wordmark **"RESEARCH BOARD"** and own stickers: flask, atom, magnifier, graduation cap, lightbulb, checkmark. |

## 3. Tokens

All colour/spacing/radius tokens: copy from `DESIGN.md` "Quick Start → Tailwind v4" into `frontend/src/styles/theme.css`. Do not rename.

### Fonts (substitutes, installed locally via npm)

| Role | Reference | Use | Package |
|---|---|---|---|
| Display | Lateral 800 | **Bowlby One** (single weight; heavy, compact) — fallback `Antonio` 700 | `@fontsource/bowlby-one` |
| UI | Aeonik Pro 500/700 | **Inter** 500/700, `font-feature-settings: "ss01","tnum"` | `@fontsource-variable/inter` |

Type scale (from `DESIGN.md`): caption 12/1.56 · body-lg 15/1.39 · subheading 24/1.2 · heading-sm 30/1.1 · heading 64/1.0 · display clamp(96–200)/0.8.
Labels/buttons/nav: Inter 700, letter-spacing 0.032em, uppercase for labels. Body minimum **14 px** in forms (15 px preferred) for readability.

### Colour usage map

| Token | Where |
|---|---|
| Carbon `#000` | Text, all 1 px outlines, primary CTA fill, marquee, scrim (50 %) |
| Paper White `#fff` | Cards, nav, inputs, modals, outlined button fill |
| Sky Wash `#dceeff` | Page background / hero band |
| Concrete Gray `#ccc` | Secondary band (footer/"how it works" strip) |
| Soft Mist `#e9e9e9` | Disabled controls, "Closed" badge fill |
| Electric Blue `#4da2ff` | Card header wash (rotation), hero ribbon if used |
| Mint Pop `#55db9c` | Card header wash (rotation), checkmark sticker |
| Lavender `#e9ccff` | Card header wash (rotation), **Open** badge fill, modal header |
| Ember `#fb4903` | Error sticker, delete-icon sticker, required-field marker sticker |
| Sunburst `#ffd731` | Stickers only (flask, bulb) |
| Voltage Violet `#5c4ade` | Focus ring (2 px solid + 2 px offset), selected-chip fill with white text |

Card header wash rotation: `id % 3` → Lavender, Mint Pop, Electric Blue. Text on every wash is Carbon (all ≥ 7:1).

## 4. Layout

Full-bleed bands, no sidebar.

```
[ MARQUEE (black, 32px) ]  ← "OPEN POSITIONS • APPLY BEFORE THE DEADLINE • ..." repeated
[ NAV: logo-circle | pill nav (Opportunities) | [ + POST OPPORTUNITY ] (black fill) ]
[ HERO band  #dceeff : display "RESEARCH" + tagline + stat pills + sticker cluster ]
[ LIST band  #ffffff : toolbar (status filter chips) + responsive card grid ]
[ FOOTER band #cccccc : one line "Built for CN Assignment #1" + repo link ]
```

- Grid: 1 col < 640 px, 2 cols 640–1023, 3 cols ≥ 1024; gap 24 px; card padding 24 px; section gap 48 px.
- Hero tagline: Inter 500, 24 px: "Find, post and manage university research openings in one place."
- Stat pills (computed from API data, **not hard-coded**): "N open", "M closed".
- Mobile: marquee stays; nav collapses to logo + "+" circular button; pill nav hidden (single page).

## 5. Components

| Component | Spec |
|---|---|
| **MarqueeBanner** | Full-bleed black, white Inter 700 12 px uppercase 0.032em, CSS translateX loop, `aria-hidden`, paused under reduced motion. |
| **Logo mark** | 1 px black circle, white fill, letter "R" Inter 700. |
| **PillButton (outlined)** | 1600 px radius, 1 px black, white fill, Inter 700 13 px, 0.032em, padding 10×12 → min touch height 40 px. Hover: fill Soft Mist. |
| **PrimaryButton** | 40 px radius (or pill), black fill, white text. One per screen region. Hover: opacity-free swap to `#1a1a1a`. |
| **IconStickerButton** | 40 px circle, 1 px black; delete variant has Ember sticker icon. |
| **OpportunityCard** | White, 20 px radius, 1 px black. Header band 56 px tall in wash colour with area text + StatusBadge. Body: title (subheading 24/1.2, 2-line clamp), faculty · department (body 15), deadline "DEADLINE 30 NOV 2026" label, positions "3 POSITIONS". Footer: View (outlined), Edit (outlined), **Close** (outlined, hidden if Closed), Delete (icon). Hover: translateY(-2px) + background change only (no shadow). Fully keyboard focusable. |
| **StatusBadge** | Pill, 1 px black, label "OPEN" (Lavender fill) / "CLOSED" (Soft Mist fill + line-through-free, icon lock). Always shows the word. |
| **SkillChip** | Pill, 1 px black, white fill, 12–13 px. Wraps. |
| **Modal** | Centered, max-width 640 px (form) / 720 px (detail) / 440 px (confirm); 30–40 px radius; 1 px black; header strip in Lavender with title + close pill; scroll inside body on small screens; Esc + scrim click close (except while submitting); focus trap; returns focus to trigger. |
| **FormField** | Label (Inter 700 12 px uppercase, Ember sticker dot for required) → input (16 px radius, 1 px black, white, 44 px min height) → helper/error line (14 px black text with Ember "!" sticker; never red-only). `aria-invalid`, `aria-describedby`. Textarea 5 rows. Date input native `type="date"`. Positions `type="number" min=0 step=1`. Status: segmented pill toggle Open/Closed (edit only; create defaults Open). |
| **Toast** | Top-center under nav, white, 20 px radius, 1 px black, sticker icon + message + dismiss; auto-dismiss 4 s (errors 6 s); `role="status"` (success) / `role="alert"` (error). Stack max 3. |
| **ConfirmDialog** | Title "Delete this opportunity?", shows record title, buttons: "Cancel" (outlined, default focus) and "Delete" (black fill). Destructive weight comes from wording + Ember sticker, not red fill. |
| **Skeleton (loading)** | 6 cards in Soft Mist with black 1 px outline, flat (no shimmer gradient; optional opacity pulse, disabled under reduced motion). |
| **EmptyState** | Large sticker cluster + "No opportunities yet" + PrimaryButton "Post the first one". |
| **ErrorState** | Ember "!" sticker + "Couldn't reach the server" + body: "Check that the backend is running on port 4000." + outlined Retry. |

## 6. Screen inventory (what Stitch must produce)

| ID | Screen / state | Desktop | Mobile |
|---|---|---|---|
| S1 | Home – populated list (6 sample cards incl. 1 Closed) | ✔ | ✔ |
| S2 | Home – loading skeleton | ✔ | – |
| S3 | Home – empty state | ✔ | – |
| S4 | Home – fetch error state | ✔ | – |
| S5 | Detail modal | ✔ | ✔ |
| S6 | Create form modal (empty) | ✔ | ✔ |
| S7 | Create/Edit form with validation errors | ✔ | – |
| S8 | Delete confirm dialog | ✔ | – |
| S9 | Toast variants (success, error) | ✔ | – |

Sample text in Stitch screens is **placeholder only**. During React conversion every card/stat/label that shows data is bound to API state; no sample strings survive in source.

## 7. Interaction & state rules

- Primary flows ≤ 3 clicks: Create (CTA → fill → Save), Close (card → Close), Delete (card → icon → Confirm).
- Buttons show in-flight state: label "Saving…", disabled, `aria-busy`.
- After success: close modal, toast, list refetch, new/edited card briefly outlined with Voltage Violet for 1.2 s (non-shadow, reduced-motion safe) — optional.
- Server field errors map to inputs; unmapped errors → error toast.
- Focus ring: 2 px Voltage Violet outline, 2 px offset, on every interactive element (never `outline: none` without replacement).

## 8. Accessibility checklist (WCAG 2.2 AA target)

- Contrast: all text Carbon on light surfaces (≥ 7:1). White on Voltage Violet ≥ 6:1. **Never** Ember or Sunburst as small text colour.
- Status/errors not by colour alone (words + icons).
- Landmarks: `header`, `main`, `footer`; one `h1` (hero); modal `role="dialog" aria-modal aria-labelledby`.
- Marquee `aria-hidden`; decorative stickers `aria-hidden`/empty alt.
- Touch targets ≥ 40 px; reflow at 320 px without horizontal scroll.
- `prefers-reduced-motion` respected.

## 9. Compliance table (verify at Phase 5)

| Rule | Check |
|---|---|
| No `box-shadow` anywhere | `grep -R "shadow" frontend/src` → none (except Tailwind reset) |
| No `gradient` | `grep -Ri "gradient"` → none |
| No radius < 16 on cards/inputs; pills 1600 | visual + grep |
| All interactive elements 1 px black outline | visual |
| Display line-height ≤ 0.85 | computed style via Reticle |
| Blue not used for CTA/link | grep + visual |
| Green not used as semantic fill | visual |
| Max 2 font families | network/computed |
| No Slush logo/name/stickers | visual |
| No hard-coded opportunity data | `grep` for sample titles in `src/` |
