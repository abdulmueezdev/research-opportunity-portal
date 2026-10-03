---
name: Research Board (Slush Adaptation)
colors:
  # Primary Foundation & Surfaces
  carbon: '#000000'
  paper-white: '#ffffff'
  sky-wash: '#dceeff'
  concrete-gray: '#cccccc'
  soft-mist: '#e9e9e9'
  # Accent & Sticker Palette
  electric-blue: '#4da2ff'
  mint-pop: '#55db9c'
  lavender: '#e9ccff'
  ember: '#fb4903'
  sunburst: '#ffd731'
  voltage-violet: '#5c4ade'
  # Stitch Injected Material Design 3 Tokens (Audit Reference)
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary: '#0060aa'
  on-secondary: '#ffffff'
  secondary-container: '#4ba1fe'
  on-secondary-container: '#003664'
  secondary-fixed: '#d3e4ff'
  secondary-fixed-dim: '#a2c9ff'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#004881'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002112'
  on-tertiary-container: '#009763'
  tertiary-fixed: '#77fbb9'
  tertiary-fixed-dim: '#58de9f'
  on-tertiary-fixed: '#002112'
  on-tertiary-fixed-variant: '#005233'
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  surface-variant: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  inverse-primary: '#c6c6c6'
typography:
  display-lg:
    fontFamily: Bowlby One
    fontSize: 640px
    fontWeight: '800'
    lineHeight: '0.75'
    letterSpacing: '0px'
  display:
    fontFamily: Bowlby One
    fontSize: 200px
    fontWeight: '800'
    lineHeight: '0.80'
    letterSpacing: '0px'
  display-lg-mobile:
    fontFamily: Bowlby One
    fontSize: 160px
    fontWeight: '800'
    lineHeight: '0.80'
    letterSpacing: '0px'
  heading:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.00'
    letterSpacing: '-0.01px'
  heading-sm:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.10'
    letterSpacing: '-0.01px'
  subheading:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.20'
    letterSpacing: '-0.01px'
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '500'
    lineHeight: '1.39'
    letterSpacing: '-0.01px'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.56'
    letterSpacing: '0.032em'
rounded:
  sm: 4px
  DEFAULT: 16px
  input: 16px
  card: 20px
  modal: 32px
  elevated: 40px
  pill: 1600px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section-gap: 48px
  page-max-width: 1440px
---

# Design System: Research Board — Slush Adaptation (Stitch Extracted)

**Stitch Project ID:** `6478147352126813991`  
**Bound Design System Asset:** `assets/104d5c708be244d9826a89e6b9e312d3`  
**Extracted Source:** Google Stitch UI screens (S1–S9)  
**Spec Authority:** Root `DESIGN.md` & `docs/UI_DESIGN_SPEC.md` (§3 Tokens)

---

## 1. Visual Theme & Atmosphere

The "Research Board" design system is an adaptation of the **Slush** aesthetic ("inflatable sticker universe on pastel paper") engineered for a high-agency university research CRUD portal. The visual atmosphere is tactile, graphic, and intentionally physical — resembling a pale blue pinboard where academic postings, student badges, and departmental opportunities are affixed like die-cut stickers.

Every element is defined by strict, unyielding flat color fills, high-contrast 1px solid Carbon (`#000000`) hand-cut outlines, and zero elevation artifacts. Drop shadows, neon glows, gradient fills, and decorative blurs are strictly banned. Tactility is achieved through bold border radii (1600px pill buttons and badges, 20px opportunity cards, 32px modals), vivid rotating pastel card headers, and playful sticker clusters (atom, flask, lightbulb, graduation cap, checkmark). While the visual language retains an energetic, collage-like spirit, the scale is disciplined: monumental display typography is confined exclusively to the hero section, while forms, cards, and modal dialogs rely on a crisp, legible UI type scale.

---

## 2. Color Palette & Roles

Stitch generated screens using the bound design system tokens alongside an automatic Material Design 3 (MD3) expansion. The authoritative system is strictly anchored to the **11 core tokens**, with Stitch MD3 tokens cataloged below for normalization.

### 2.1 Core Palette (Authoritative Single Source of Truth)

| Token Name | Hex Value | CSS Variable | Functional Role |
|:---|:---|:---|:---|
| **Carbon** | `#000000` | `--color-carbon` | Primary typography, 1px solid outlines on all elements, primary CTA background fill, marquee strip background, 50% flat modal scrim overlay. |
| **Paper White** | `#ffffff` | `--color-paper-white` | Primary card surfaces, modal dialog bodies, input backgrounds, outlined button fills, text on dark fills. |
| **Sky Wash** | `#dceeff` | `--color-sky-wash` | Hero section background, pastel canvas ground, primary visual atmosphere. |
| **Concrete Gray** | `#cccccc` | `--color-concrete-gray` | Secondary section background, neutral breathing interlude, footer band. |
| **Soft Mist** | `#e9e9e9` | `--color-soft-mist` | Disabled control fills, "Closed" status badge background, button hover surface, skeleton card fill. |
| **Electric Blue** | `#4da2ff` | `--color-electric-blue` | Dominant brand accent — card header wash rotation (`id % 3 === 2`), decorative banner ribbons, atom sticker fill. |
| **Mint Pop** | `#55db9c` | `--color-mint-pop` | Card header wash rotation (`id % 3 === 1`), success checkmark sticker, decorative highlight badges. |
| **Lavender** | `#e9ccff` | `--color-lavender` | Card header wash rotation (`id % 3 === 0`), "Open" status badge fill, modal header strip wash, gentle sticker ground. |
| **Ember** | `#fb4903` | `--color-ember` | Hot destructive accent — error sticker icon ("!"), delete icon sticker, required form field indicator dot. |
| **Sunburst** | `#ffd731` | `--color-sunburst` | Playful highlight sticker fills (lightbulb, science coin, auto-apply chip); **never** used for text background surfaces. |
| **Voltage Violet** | `#5c4ade` | `--color-voltage-violet` | Interactive focus ring (2px solid with 2px offset), selected filter chip fill (with white text), wallet sticker fill. |

### 2.2 Functional Role Mapping & Rules

1. **Card Header Wash Rotation:** Card header bands rotate on `id % 3`:
   - `0` → Lavender (`#e9ccff`)
   - `1` → Mint Pop (`#55db9c`)
   - `2` → Electric Blue (`#4da2ff`)
   All text placed on header wash bands must be Carbon (`#000000`), guaranteeing a minimum contrast ratio of `7.5:1` (WCAG AAA).
2. **Action Fill Ban on Blue:** Blue (`#4da2ff`) must **never** be used as a CTA button fill or hyperlink color. Primary actions must be black-filled (`#000000`); secondary actions must be white-filled (`#ffffff`) with 1px black outline.
3. **Semantic Fill Ban on Green:** Mint Pop (`#55db9c`) is an illustrative sticker color, not a semantic success fill. Status is communicated through white toast surfaces paired with a green checkmark sticker and explicit descriptive text.
4. **Destructive Action Rule:** The delete confirmation dialog must feature a black-filled primary action with white text and an Ember sticker icon, rather than an all-red fill.

### 2.3 Stitch Injected MD3 Tokens (Audit & Normalization Reference)

During screen generation, Stitch augmented `tailwind.config` with 47 default Material Design 3 tokens. In the generated HTML markup, Stitch frequently substituted these tokens for the core design tokens:
- `border-primary` was generated 501 times instead of `border-carbon` (both resolve to `#000000`).
- `text-on-surface-variant` (`#4c4546`) was generated 137 times for secondary labels instead of `text-carbon`.
- `bg-surface-variant` (`#e2e2e2`) and `bg-surface` (`#f9f9f9`) were used instead of `bg-paper-white` or `bg-soft-mist`.
- `bg-secondary` (`#0060aa`) and `bg-secondary-container` (`#4ba1fe`) were generated in `tailwind.config` but avoided in button fills.
- `error` (`#ba1a1a`) was injected in MD3 config; however, the UI spec mandates Ember (`#fb4903`) for validation states.

---

## 3. Typography Rules

The typography system pairs an expressive, heavy display face with a disciplined, high-density neo-grotesque UI font.

### 3.1 Font Stacks

| Role | Spec Font | Package | OpenType Features | Fallbacks |
|:---|:---|:---|:---|:---|
| **Display** | **Bowlby One** | `@fontsource/bowlby-one` | Single weight 800 heavy | Antonio 700, cursive, sans-serif |
| **UI & Body** | **Inter** | `@fontsource-variable/inter` | `"ss01" 1, "tnum" 1` | Aeonik Pro, system-ui, sans-serif |

*Note on Stitch Drift:* In screens S2, S8, and S9, Stitch drifted to `Plus Jakarta Sans`, and in S6 to `Space Grotesk`. In the React implementation, these must all be strictly normalized to `@fontsource/bowlby-one` and `@fontsource-variable/inter`.

### 3.2 Typographic Hierarchy & Scale

| Style Token | Font Family | Weight | Size | Line Height | Letter Spacing | Case | Role |
|:---|:---|:---|:---|:---|:---|:---|:---|
| `display-lg` | Bowlby One | 800 | 640px | 0.75 | 0px | Uppercase | Hero marketing display (reference max) |
| `display` | Bowlby One | 800 | `clamp(96px, 17vw, 190px)` | 0.80 | 0px | Uppercase | S1 hero wordmark 'RESEARCH' |
| `display-lg-mobile` | Bowlby One | 800 | 160px | 0.80 | 0px | Uppercase | Mobile viewport display heading |
| `heading` | Inter | 700 | 64px | 1.00 | -0.01px | Normal | Major section titles |
| `heading-sm` | Inter | 700 | 30px | 1.10 | -0.01px | Normal | Card titles, modal titles |
| `subheading` | Inter | 700 | 24px | 1.20 | -0.01px | Normal | Hero tagline, section subheads |
| `body-lg` | Inter | 500 | 15px | 1.39 | -0.01px | Normal | Primary body copy, project descriptions |
| `caption` | Inter | 700 | 12px | 1.56 | 0.032em | Uppercase | Nav links, button labels, badges, stickers |

### 3.3 Typographic Rules
- **Crushed Leading on Display:** Any text set in Bowlby One must have `line-height <= 0.85` (0.80 standard).
- **Label Letter-Spacing:** All navigation, button text, filter chips, and badges must use `letter-spacing: 0.032em` with uppercase casing for optimal readability on pill shapes.
- **Form Body Text:** Form inputs and helper descriptions must maintain a minimum font size of `14px` (15px preferred) to prevent automatic iOS zoom and ensure legibility.

---

## 4. Component Stylings

All UI components adhere to the "sticker-on-paper" aesthetic: flat fills, crisp 1px Carbon borders, and generous radii.

### 4.1 Buttons
- **Pill Outlined Button (Secondary / Default):**
  - Radius: `1600px` (`rounded-full`)
  - Border: `1px solid #000000` (`border-carbon`)
  - Background: `#ffffff` (`bg-paper-white`)
  - Text: Carbon `#000000`, Inter 700, 13px, `letter-spacing: 0.032em`, uppercase.
  - Hover: Opacity-free background swap to Soft Mist `#e9e9e9`.
  - Active: Tactile `-1px` translation (`active:translate-y-[1px]`).
- **Pill Filled Button (Primary CTA):**
  - Radius: `1600px` (`rounded-full`)
  - Border: `1px solid #000000`
  - Background: Carbon `#000000` (`bg-carbon`)
  - Text: Paper White `#ffffff`, Inter 700, 13px, uppercase.
  - Hover: Opacity-free swap to `#1a1a1a`.
- **Icon Sticker Button:**
  - Shape: `40px` circular button (`w-10 h-10 rounded-full`)
  - Border: `1px solid #000000`
  - Fills: Paper White `#ffffff` with Carbon glyph or Ember `#fb4903` icon sticker.
- **Button Radius Enforcement:** Interactive controls must never have sharp or boxy corners (no `rounded-md`, no `rounded-lg`). All buttons must be `rounded-full` (1600px).

### 4.2 Opportunity Cards
- **Container:**
  - Radius: `20px` (`rounded-[20px]`)
  - Border: `1px solid #000000` (`border-carbon`)
  - Background: Paper White `#ffffff`
  - Internal Padding: `24px`
  - Overflow: `hidden` (ensures header wash matches card radius)
- **Header Wash Band:**
  - Height: `56px`
  - Fill: Rotating between Lavender (`#e9ccff`), Mint Pop (`#55db9c`), and Electric Blue (`#4da2ff`).
  - Layout: Research area chip on left; StatusBadge on right.
- **Action Footer:**
  - Layout: Horizontal flex container with `gap: 8px` containing View (outlined pill), Edit (outlined pill), Close (outlined pill, hidden if Closed), and Delete (circular icon button).

### 4.3 Status Badges & Chips
- **Open Badge:** `1600px` pill, `1px solid #000000`, filled with Lavender (`#e9ccff`), text "OPEN" in Carbon Inter 700 12px uppercase.
- **Closed Badge:** `1600px` pill, `1px solid #000000`, filled with Soft Mist (`#e9e9e9`), text "CLOSED" in Carbon with lock icon.
- **Skill Chips:** `1600px` pill, `1px solid #000000`, white fill or Soft Mist fill, Inter 500 12px.

### 4.4 Form Fields & Inputs
- **Inputs & Textareas:**
  - Radius: `16px` (`rounded-[16px]`)
  - Border: `1px solid #000000` (`border-carbon`)
  - Background: Paper White `#ffffff`
  - Min Height: `44px` (touch-target compliance)
  - Focus State: `outline: 2px solid #5c4ade` (Voltage Violet) with `outline-offset: 2px`.
- **Validation Error State:**
  - Border: `2px solid #fb4903` (Ember)
  - Helper Line: 14px Carbon text paired with an Ember "!" circular sticker icon (`w-4 h-4 rounded-full bg-ember border border-carbon`).
- **Required Field Marker:**
  - Small Ember dot (`w-1.5 h-1.5 rounded-full bg-ember inline-block ml-1`).

### 4.5 Modals & Scrim
- **Modal Container:**
  - Radius: `32px` (`rounded-[32px]`)
  - Border: `1px solid #000000` (`border-carbon`)
  - Background: Paper White `#ffffff`
  - Max Width: 640px (form) / 720px (detail) / 440px (confirm dialog)
  - Shadows: Strictly `0px` (`box-shadow: none !important`)
- **Scrim Overlay:**
  - Position: `fixed inset-0 z-50`
  - Fill: Flat 50% Carbon scrim (`rgba(0, 0, 0, 0.5)` or `bg-carbon/50`).
  - Backdrop Filter: Strictly zero blur (`backdrop-filter: none`).

### 4.6 Toasts & Notifications
- **Toast Container:**
  - Position: Floating top-center (`top-6 left-1/2 -translate-x-1/2 z-50`)
  - Radius: `1600px` pill (`rounded-full`)
  - Border: `1px solid #000000` (`border-carbon`)
  - Background: Paper White `#ffffff`
  - Shadows: Zero box-shadow
  - Success Variant: Mint Pop checkmark sticker (`w-6 h-6 rounded-full bg-mint-pop border border-carbon`) + "Opportunity saved" text.
  - Error Variant: Ember exclamation sticker (`w-6 h-6 rounded-full bg-ember border border-carbon`) + error text + Retry button.

---

## 5. Layout Principles

1. **Full-Bleed Colored Section Bands:**
   - Marquee Band: Carbon `#000000` (32px tall, infinite horizontal translateX loop).
   - Navigation: Paper White `#ffffff` with 1px bottom border.
   - Hero Band: Sky Wash `#dceeff` (full-bleed pastel canvas).
   - List & Content Band: Paper White `#ffffff`.
   - Secondary / Footer Band: Concrete Gray `#cccccc`.
2. **Grid & Responsiveness:**
   - Maximum content width: `1440px` (`max-w-[1440px] mx-auto`).
   - Card Grid:
     - Desktop (>= 1024px): 3 columns (`grid-cols-3`), `gap: 24px`.
     - Tablet (640px - 1023px): 2 columns (`grid-cols-2`), `gap: 24px`.
     - Mobile (< 640px): 1 column (`grid-cols-1`), `gap: 16px`.
3. **Collage Stickers:**
   - Decorative sticker clusters float around the hero wordmark and empty states, rotated between `-12deg` and `+11deg`.
   - Each sticker has a 1px solid black border and flat color fill.
   - Stickers are strictly decorative and marked `aria-hidden="true"`.
4. **Motion Restraint:**
   - Motion is strictly restricted to continuous marquee translation and subtle button hover feedback.
   - All animations must respect `prefers-reduced-motion: reduce` (pausing marquee).

---

## 6. Design System Notes for Stitch Generation & React Conversion

When translating Stitch generated screens into React components:
1. **Purge MD3 Tokens:** Map all `border-primary` to `border-carbon`, `text-on-surface-variant` to `text-carbon`, `bg-surface-variant` to `bg-soft-mist`, and `error` to `ember`.
2. **Normalize Fonts:** Import `@fontsource/bowlby-one` for display text and `@fontsource-variable/inter` for UI text. Remove references to `Plus Jakarta Sans` and `Space Grotesk`.
3. **Normalize Button Shapes:** Replace any instances of `rounded-md` or `rounded` on interactive controls with `rounded-full`.
4. **Fix S8 Delete Button:** Revert S8's `bg-ember` filled button to a black-filled button (`bg-carbon`) with white text and an Ember sticker icon.
5. **Replace Emoji Glyphs:** Replace the literal test tube emoji `🧪` (S1) and lightbulb emoji `💡` (S3) with clean inline SVG sticker components.
6. **Global Shadow Reset:** Enforce `* { box-shadow: none !important; text-shadow: none !important; }` in `frontend/src/styles/theme.css`.
