# Anti-Slop and SEO Semantic Specification
> Research Opportunity Portal: Frontend Architecture, Anti-Slop Audit, and Semantic HTML5/ARIA/SEO Standards

- **Project:** Research Opportunity Portal (Campus Research Board)
- **Document ID:** P4-S4-B
- **Status:** APPROVED FOR IMPLEMENTATION
- **Target Audience:** React Frontend Developers, UI/UX Engineers, Accessibility Auditors
- **Governance:** `antislop.md` (Core Filter), `skills/antislop-ui/SKILL.md` (UI/Visual Rules), `skills/claude-seo/SKILL.md` (SEO & Semantic Structure), `DESIGN.md` (Slush Style Reference)

---

## 1. Executive Summary and Purpose

This specification establishes the structural, semantic, accessibility, and anti-slop rules for translating the Google Stitch HTML/CSS prototypes (Screens S1 through S9) into a production-grade React application. 

While Stitch provides a rapid visual mockup of the "Sticker-Book Research Board" aesthetic (pale-blue paper canvas, hand-cut black outlines, vibrant pastel washes, and bold display type), raw AI output inevitably introduces characteristic "AI slop":
- Meaningless decorative status dots and endless pulsing loops
- Hardcoded fictional statistics and hallucinated claims
- Tautological eyebrow badges duplicating headlines
- Unsemantic `div`/`span` soups masquerading as buttons and landmarks
- Generic call-to-action labels
- Pervasive em dashes (`—`) violating Rule R-02
- Bloated, hallucinated Material 3 design tokens and unused dark-mode classes

This document eliminates all generic AI artifacts and defines a rigorous semantic HTML5, ARIA 1.2, and Schema.org JSON-LD architecture.

---

## 2. Anti-Slop Audit of Stitch Screen Outputs

The following audit evaluates Stitch Screen S1 (Home Desktop) and Screens S2 through S9 against the mandatory rules of `antislop.md` and `antislop-ui/SKILL.md`.

### 2.1 Em Dash Violations (Rule R-02 Hard Gate)

| Location | Stitch Raw Output | Violation Analysis | Production Fix (R-02 Compliant) |
|---|---|---|---|
| S1 Page Title | `Research Board — University Portal` | Em dash used in page `<title>` | `Research Board: University Research Opportunities Portal` |
| S1 Screen Title | `Research Board — University Research Opportunities` | Em dash in screen identifier | `Research Board: University Research Opportunities` |
| S5 Detail Modal Title | `Research Board — Opportunity Detail Modal` | Em dash in modal title | `Research Board: Opportunity Details` |
| S6 Create Modal Title | `Research Board — Post Opportunity Modal` | Em dash in modal title | `Research Board: Post Opportunity` |
| S7 Validation Modal | `Research Board — Post Opportunity Validation Modal` | Em dash in validation header | `Research Board: Post Opportunity (Validation Required)` |
| S8 Delete Modal | `Research Board — Delete Confirmation Modal` | Em dash in dialog title | `Research Board: Delete Opportunity Confirmation` |
| S9 Toast States | `Research Board — Notification Toast States` | Em dash in toast state titles | `Research Board: Notification Messages` |
| UI Copy / Metadata | `Dr. Elena Rostova — Computational Neuroscience` | Em dash used as author delimiter | `Dr. Elena Rostova, Dept. of Computational Neuroscience` |

*Rule R-02 Enforcement:* No em dash character (`—`) may appear in any UI copy, button label, modal heading, page title, or error string. Developers must use commas, colons, or parentheses.

---

### 2.2 Generic vs Contextual CTAs (Rule R-15)

Generic button labels ("Get Started", "Learn More", "Click Here", "View") fail to communicate intent, degrade screen-reader usability, and read as template slop.

| Component / Screen | Stitch Raw Button Text | Issue | Required Contextual React Implementation |
|---|---|---|---|
| Top Navigation (S1) | `+ POST OPPORTUNITY` | Acceptable intent, but lacks accessible labeling | Label: `Post Opportunity` / `aria-label="Post new research opportunity"` |
| Hero Search (S1) | `SEARCH` | Generic verb | Label: `Search Opportunities` / `aria-label="Submit search for research opportunities"` |
| Opportunity Card (S1) | `VIEW` | Vague 1-word verb; identical across all 6 cards | Label: `View Details` / `aria-label="View details for {opportunity.title}"` |
| Opportunity Card (S1) | `EDIT` | Ambiguous target for assistive technology | Label: `Edit Listing` / `aria-label="Edit research opportunity: {opportunity.title}"` |
| Opportunity Card (S1) | `CLOSE` | Ambiguous action (close modal vs close opening) | Label: `Close Listing` / `aria-label="Close applications for {opportunity.title}"` |
| Opportunity Card (S1) | `[Trash Icon]` | Icon-only button with generic `aria-label="Delete Opportunity"` | Button text `Delete` (or icon with `aria-label="Delete listing: {opportunity.title}"`) |
| Filter Toolbar (S1) | `ALL (7)`, `OPEN (6)`, `CLOSED (1)` | Hardcoded text without filter semantics | Pill buttons with `aria-pressed="true|false"`: `All Listings ({count})`, `Open Positions ({count})`, `Closed Positions ({count})` |
| Empty State (S3) | `POST THE FIRST ONE` | Overly colloquial AI template text | `Post First Opportunity` |
| Error State (S4) | `RETRY` | Generic button | `Retry Loading Opportunities` |
| Delete Modal (S8) | `DELETE` / `CANCEL` | Terse actions | Primary: `Confirm Deletion` (with Ember accent); Secondary: `Keep Opportunity` |
| Footer Newsletter (S1) | `CAMPUS DISPATCH` | Ambiguous CTA button/link | `Subscribe to Campus Dispatch` |

---

### 2.3 Tautological Eyebrow Badges and Redundant Ornamentation (R-09)

In Stitch S1, an eyebrow pill was placed directly above the monumental `<h1>RESEARCH</h1>`:
```html
<!-- STITCH SLOP IN S1 (Line 222): -->
<div class="inline-flex items-center gap-2 bg-paper-white border border-carbon px-4 py-1.5 rounded-full mb-6">
  <span class="w-2.5 h-2.5 rounded-full bg-mint-pop border border-carbon inline-block"></span>
  <span class="text-xs font-bold uppercase tracking-[0.03em] text-carbon">CAMPUS-WIDE OPPORTUNITY FEED · 2026/2027</span>
</div>
```
- **Violation:** This badge tells the user "CAMPUS-WIDE OPPORTUNITY FEED" directly above the H1, which is followed by the tagline "Discover faculty-led lab positions...". It duplicates meaning, clutters vertical rhythm, and uses a faux status dot.
- **Production Fix:** Delete this eyebrow pill completely. Let the page title, subheadline, and dynamic stat counters carry the narrative cleanly.

---

### 2.4 Meaningless Status Dots and Endless Pulsing Animations (R-13, R-19, R-31)

- **Faux System-Status Dots:** Stitch placed small green dots inside badges and gray dots inside stat pills (`1 CLOSED`). In web UI conventions, glowing/filled dots represent live WebSocket feeds, audio recording, or server health. Using them on static text is slop.
  - *Fix:* Remove all decorative dots. Status is communicated through explicit typography and contextual sticker badges (`StatusBadge` with Mint checkmark for Open, Soft Mist lock for Closed).
- **Endless Marquee & Shimmer Loops (R-19):**
  - In S1, the top marquee (`animate-marquee`) runs indefinitely.
  - In S2, skeleton loading cards use CSS shimmer pulses on infinite loops.
  - *Fix:*
    1. The marquee banner must include `aria-hidden="true"`, must pause when hovered or when child elements have focus (`group-hover:pause`, `focus-within:pause`), and must completely stop under `@media (prefers-reduced-motion: reduce)`.
    2. Skeleton loading cards must use static Soft Mist (`#e9e9e9`) blocks with 1px black borders. If an opacity pulse is included, it must be capped at 1.5s gentle pulse and disabled when reduced motion is preferred.

---

### 2.5 Uniform Bento Grid vs Authentic Content Hierarchy (R-05, R-14)

Stitch generated 6 identical cards in a 3-column grid, labeling it "3-Column Bento/Card Grid":
- **Violation:** Every card had identical vertical height, identical tag structure, and identical buttons, presenting an artificially uniform mockup rather than accommodating real data variability.
- **Production Fix:**
  - Open vs Closed visual differentiation: Closed opportunities are styled with a Soft Mist header, subdued title color, `DEADLINE PASSED` tag, and suppression of the `Close Listing` button.
  - Dynamic skill chips: Cards render variable tags (`skills.map()`) with natural line wrapping, maintaining minimum 40px touch targets for action buttons.
  - Grid layout: CSS Grid reflowing dynamically from 1 column (< 640px) to 2 columns (640px to 1023px) to 3 columns (≥ 1024px) with `gap-6`, responding to actual viewport constraints rather than fixed marketing card heights.

---

### 2.6 Fake Statistics and Hallucinated Marketing Claims (R-16, R-17, R-36, R-38)

Stitch generated several fictional statistics and promotional claims in S1:
1. `14 DEPARTMENTS` hardcoded stat pill.
2. `6 OPEN`, `1 CLOSED` hardcoded in static HTML.
3. Marquee: `★ FALL 2026 UNDERGRADUATE & GRADUATE RESEARCH GRANTS OPEN ★ SUBMIT PROPOSALS BY NOV 30...`
4. Intermediate Callout: `Verified labs receive central grant stipend matching.`
5. Footer: `Pinned in an inflatable sticker universe.` (Internal prompt artifact).

- **Production Fix:**
  - **Dynamic Stats Only (R-17):** Stat pills must compute in React from active state:
    ```tsx
    const openCount = opportunities.filter(o => o.status === 'open').length;
    const closedCount = opportunities.filter(o => o.status === 'closed').length;
    ```
    If data is loading or zero, display honest counts or skeleton pills; never display hardcoded dummy numbers.
  - **Eradicate Buzzwords (R-16, R-36):** Delete promotional claims about "grant stipend matching" unless backed by the database model. Replace the footer tagline with:
    `© 2026 University Research Opportunity Portal. Computer Network Architecture Project.`

---

### 2.7 Purge of Unused Tokens and Spurious Dark-Mode Classes (R-01, R-29, R-34)

Stitch's CDN Tailwind config dumped 35+ Material Theme color tokens (`surface-dim`, `on-tertiary-fixed`, `secondary-container`, etc.) and peppered markup with `dark:` variants (`dark:bg-inverse-surface`, `dark:border-outline-variant`).
- **Violation:** The approved design system (`DESIGN.md`) specifies a single Light Theme inspired by the physical collage aesthetic, with exactly 11 color tokens. The dark-mode classes are incomplete hallucinations that break contrast.
- **Production Fix:**
  - Remove all `dark:` classes completely.
  - Enforce the exact 11 tokens in Tailwind config:
    `carbon` (`#000000`), `paper-white` (`#ffffff`), `sky-wash` (`#dceeff`), `concrete-gray` (`#cccccc`), `soft-mist` (`#e9e9e9`), `electric-blue` (`#4da2ff`), `mint-pop` (`#55db9c`), `lavender` (`#e9ccff`), `ember` (`#fb4903`), `sunburst` (`#ffd731`), `voltage-violet` (`#5c4ade`).
  - Zero box shadows, zero gradients, zero backdrop blurs, 1px solid black borders on all interactive components and cards.

---

## 3. Semantic HTML5 Architecture and Landmark Structure

To satisfy `claude-seo` and WCAG 2.2 Level AA requirements, the entire application DOM must be structured using standard semantic landmarks and HTML5 native elements.

### 3.1 Landmark Elements Layout

```
+-------------------------------------------------------------------------+
| <aside aria-label="Campus announcements" aria-hidden="true">           |
|   Marquee text: announcements, application deadlines                    |
+-------------------------------------------------------------------------+
| <header role="banner">                                                  |
|   <a href="/" aria-label="Research Board Home"> [Logo 'R'] </a>         |
|   <nav aria-label="Main Navigation">                                    |
|     <a href="#browse">Browse</a>                                        |
|   </nav>                                                                |
|   <div>                                                                 |
|     <button type="button"> + Post Opportunity </button>                 |
|   </div>                                                                |
+-------------------------------------------------------------------------+
| <main id="main-content" tabIndex="-1">                                  |
|                                                                         |
|   <!-- HERO SECTION -->                                                 |
|   <section aria-labelledby="hero-title">                               |
|     <h1 id="hero-title">RESEARCH OPPORTUNITIES</h1>                    |
|     <p>Find, post and manage university research openings...</p>        |
|     <div role="status" aria-label="Opportunity statistics">             |
|       <span>{openCount} OPEN</span> <span>{closedCount} CLOSED</span>   |
|     </div>                                                              |
|     <form role="search" aria-label="Search opportunities">              |
|       <label for="search-input" class="sr-only">Search</label>          |
|       <input id="search-input" type="search" />                         |
|       <button type="submit">Search Opportunities</button>               |
|     </form>                                                             |
|   </section>                                                            |
|                                                                         |
|   <!-- OPPORTUNITIES DIRECTORY SECTION -->                             |
|   <section id="browse" aria-labelledby="directory-heading">            |
|     <h2 id="directory-heading">Current Research Opportunities</h2>       |
|                                                                         |
|     <!-- FILTER TOOLBAR -->                                             |
|     <div role="region" aria-label="Filter listings by status">          |
|       <button aria-pressed="true">All</button>                          |
|       <button aria-pressed="false">Open</button>                        |
|       <button aria-pressed="false">Closed</button>                      |
|     </div>                                                              |
|                                                                         |
|     <!-- RESULTS LIVE REGION -->                                        |
|     <div aria-live="polite" aria-atomic="true" class="sr-only">         |
|       Showing {filteredCount} research opportunities                    |
|     </div>                                                              |
|                                                                         |
|     <!-- CARD GRID (LIST OF ARTICLES) -->                               |
|     <ul role="list" class="grid ...">                                   |
|       <li>                                                              |
|         <article aria-labelledby="opp-title-1">                         |
|           <header>                                                      |
|             <span>NEUROSCIENCE & AI</span>                              |
|             <span role="status">OPEN</span>                             |
|           </header>                                                     |
|           <h3 id="opp-title-1">Synaptic Plasticity Modeling...</h3>     |
|           <p>Dr. Elena Rostova, Dept. of Computational Neuroscience</p> |
|           <footer>                                                      |
|             <button>View Details</button>                               |
|             <button>Edit Listing</button>                               |
|             <button>Close Listing</button>                              |
|             <button aria-label="Delete listing...">Delete</button>      |
|           </footer>                                                     |
|         </article>                                                      |
|       </li>                                                             |
|     </ul>                                                               |
|   </section>                                                            |
|                                                                         |
|   <!-- MODALS (NATIVE DIALOG ELEMENTS) -->                              |
|   <dialog id="detail-modal" aria-labelledby="detail-title" ...>         |
|     <h2 id="detail-title">Opportunity Details</h2>                      |
|   </dialog>                                                             |
|                                                                         |
|   <dialog id="create-modal" aria-labelledby="create-title" ...>         |
|     <h2 id="create-title">Post New Research Opportunity</h2>            |
|   </dialog>                                                             |
|                                                                         |
|   <dialog id="delete-modal" aria-labelledby="delete-title" ...>         |
|     <h2 id="delete-title">Delete Opportunity Confirmation</h2>          |
|   </dialog>                                                             |
|                                                                         |
+-------------------------------------------------------------------------+
| <footer role="contentinfo">                                             |
|   <p>© 2026 University Research Opportunity Portal</p>                  |
|   <nav aria-label="Footer Navigation">...</nav>                         |
+-------------------------------------------------------------------------+
```

---

## 4. Heading Hierarchy and Navigation Matrix

Search engine crawlers and screen readers rely on a strict, un-broken heading hierarchy. 

### 4.1 Global Heading Map

```
H1: Research Board: University Research Opportunities
 │
 ├── H2: Current Research Opportunities (Directory Section)
 │    │
 │    ├── H3: Synaptic Plasticity Modeling via Spiking Neural Networks (Card 1)
 │    ├── H3: Cryogenic Qubit Calibration & Error Suppression (Card 2)
 │    ├── H3: Bio-Composite Polymers from Algal Cellulose (Card 3)
 │    ├── H3: CRISPR Off-Target Screening in Pediatric Oncology (Card 4)
 │    ├── H3: Autonomous Drone Swarm Navigation in Dense Canopy (Card 5)
 │    └── H3: Exoplanet Atmospheric Spectroscopy Analysis (Card 6)
 │
 ├── H2: Opportunity Details (Detail Modal - Native <dialog>)
 │    ├── H3: Project Description
 │    ├── H3: Required Skills & Qualifications
 │    └── H3: Department & Contact Information
 │
 ├── H2: Post Research Opportunity (Create Modal - Native <dialog>)
 │
 ├── H2: Edit Research Opportunity (Edit Modal - Native <dialog>)
 │
 └── H2: Delete Opportunity Confirmation (Confirm Dialog - Native <dialog>)
```

### 4.2 Heading Rules for Frontend Engineers
1. **Exactly One `<h1>` Per Page:** The hero section holds the sole `<h1>`. If the visual design renders the huge display word `RESEARCH` in Bowlby One, the markup must be:
   ```html
   <h1 class="font-display uppercase text-carbon leading-[0.8] text-[82px] md:text-[170px]">
     Research
     <span class="sr-only">: University Research Opportunities Board</span>
   </h1>
   ```
2. **Never Skip Heading Levels:** Never jump from `<h1>` directly to `<h3>`. Every opportunity card title is an `<h3>` housed within the `<section aria-labelledby="directory-heading">` which is introduced by an `<h2>`.
3. **Modal Dialog Headings:** Each modal dialog is treated as an isolated accessibility sub-tree containing an `<h2>` that serves as the modal title referenced by `aria-labelledby`.

---

## 5. ARIA and Keyboard Focus Management Specification

### 5.1 Native `<dialog>` Specification for Modals

To ensure robust accessibility without heavy third-party modal libraries, all modals (Detail S5, Create S6, Edit S7, Delete Confirmation S8) must use the native HTML5 `<dialog>` element.

```tsx
// React Dialog Wrapper Pattern
export function ModalDialog({
  isOpen,
  onClose,
  titleId,
  titleText,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      if (!dialog.open) {
        dialog.showModal(); // Native browser modal handles scrim and initial focus
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      aria-labelledby={titleId}
      aria-modal="true"
      className="bg-paper-white border border-carbon rounded-[32px] p-0 max-w-[640px] w-full backdrop:bg-carbon/50 backdrop:backdrop-blur-none"
    >
      <header className="h-14 bg-lavender border-b border-carbon px-6 flex items-center justify-between">
        <h2 id={titleId} className="text-base font-bold uppercase tracking-wider text-carbon">
          {titleText}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="px-3 py-1 bg-paper-white border border-carbon rounded-full text-xs font-bold uppercase hover:bg-soft-mist focus-visible:outline-voltage-violet"
        >
          Close
        </button>
      </header>
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </dialog>
  );
}
```

#### Accessibility Features of this Implementation:
- **`dialog.showModal()`** automatically locks focus inside the modal and prevents interaction with background content (`inert` behavior).
- **`Escape` Key Handling:** The browser natively fires the `cancel` event when `Escape` is pressed; `onCancel` ensures state synchronization.
- **Focus Restoration:** When closed, focus is automatically returned to `previousActiveElement` (the card button that triggered the modal).
- **Scrim Aesthetics:** Handled via `::backdrop` using `rgba(0, 0, 0, 0.5)` flat color (zero backdrop blur).

---

### 5.2 Form Accessibility and Validation States (S6, S7)

Every form input in the Post/Edit modal must be explicitly linked to its label, required state, and inline validation error container.

```tsx
// Form Field Pattern
<div className="flex flex-col gap-1.5 mb-4">
  <label
    htmlFor="opp-title"
    className="text-xs font-bold uppercase tracking-[0.032em] text-carbon flex items-center gap-1.5"
  >
    Opportunity Title
    <span className="w-2 h-2 rounded-full bg-ember inline-block" aria-hidden="true" />
    <span class="sr-only">(Required)</span>
  </label>

  <input
    id="opp-title"
    name="title"
    type="text"
    required
    aria-required="true"
    aria-invalid={Boolean(errors.title)}
    aria-describedby={errors.title ? "opp-title-error" : "opp-title-helper"}
    value={formData.title}
    onChange={handleChange}
    className={`h-11 px-4 bg-paper-white border rounded-[16px] text-sm font-medium text-carbon focus-visible:outline-2 focus-visible:outline-voltage-violet ${
      errors.title ? "border-ember border-2" : "border-carbon"
    }`}
  />

  {errors.title ? (
    <p
      id="opp-title-error"
      role="alert"
      className="text-xs font-bold text-carbon flex items-center gap-1.5 mt-1"
    >
      <span className="w-4 h-4 rounded-full bg-ember text-paper-white flex items-center justify-center text-[10px] font-black" aria-hidden="true">
        !
      </span>
      <span>{errors.title}</span>
    </p>
  ) : (
    <p id="opp-title-helper" className="text-[11px] font-medium text-concrete-gray">
      Enter a descriptive research title (e.g. Synaptic Plasticity Modeling).
    </p>
  )}
</div>
```

---

### 5.3 Live Regions and Toast Notifications (S9)

Toast notifications provide feedback for async operations (e.g., "Opportunity posted successfully" or "Failed to connect to backend").

```tsx
// Toasts Live Region Container
<div
  aria-live="polite"
  aria-atomic="false"
  className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none"
>
  {toasts.map((toast) => (
    <div
      key={toast.id}
      role={toast.type === "error" ? "alert" : "status"}
      className="pointer-events-auto flex items-center gap-3 px-5 py-3 bg-paper-white border border-carbon rounded-full text-xs font-bold uppercase tracking-wider text-carbon shadow-none"
    >
      {toast.type === "success" ? (
        <span className="w-5 h-5 rounded-full bg-mint-pop border border-carbon flex items-center justify-center text-carbon text-xs" aria-hidden="true">
          ✓
        </span>
      ) : (
        <span className="w-5 h-5 rounded-full bg-ember border border-carbon flex items-center justify-center text-paper-white text-xs font-black" aria-hidden="true">
          !
        </span>
      )}
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
        className="ml-2 text-concrete-gray hover:text-carbon"
      >
        ✕
      </button>
    </div>
  ))}
</div>
```

---

### 5.4 Focus Ring and Visible Keyboard Indicators

In accordance with WCAG 2.2 SC 2.4.7 (Focus Visible) and SC 2.4.11 (Focus Appearance):
- **Rule:** Never use `outline: none` without a custom replacement.
- **Project Focus Token:** Voltage Violet (`#5c4ade`), 2px solid with 2px offset.
- **Tailwind Utility:** `focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2`.

---

## 6. SEO Metadata, OpenGraph, and Structured Data (JSON-LD)

To ensure Google and academic search engines index research opportunities properly, the application must provide accurate metadata and Schema.org markup.

### 6.1 Meta Tags and Social Graph (HTML `<head>`)

```html
<!-- Primary Metadata -->
<title>Research Board: University Research Opportunities Portal</title>
<meta name="description" content="Discover, apply for, and manage undergraduate and graduate university research openings across campus departments. Connect directly with faculty lab leads." />
<link rel="canonical" href="https://research-board.university.edu/" />
<meta name="robots" content="index, follow" />

<!-- OpenGraph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://research-board.university.edu/" />
<meta property="og:title" content="Research Board: University Research Opportunities Portal" />
<meta property="og:description" content="Explore campus-wide research lab positions, faculty projects, and grant-funded student research opportunities." />
<meta property="og:image" content="https://research-board.university.edu/og-card.png" />
<meta property="og:site_name" content="University Research Board" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Research Board: University Research Opportunities Portal" />
<meta name="twitter:description" content="Explore campus-wide research lab positions, faculty projects, and grant-funded student research opportunities." />
<meta name="twitter:image" content="https://research-board.university.edu/og-card.png" />
```

---

### 6.2 Schema.org JSON-LD Specification

Research opportunities represent real academic positions. We adapt Schema.org `JobPosting` and `EducationalOccupationalProgram` to provide machine-readable metadata.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://research-board.university.edu/#website",
      "url": "https://research-board.university.edu/",
      "name": "University Research Opportunity Portal",
      "description": "Central repository for undergraduate and graduate research listings.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://research-board.university.edu/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "CollegeOrUniversity",
      "@id": "https://research-board.university.edu/#university",
      "name": "University Research Initiative",
      "url": "https://research-board.university.edu/"
    },
    {
      "@type": "ItemList",
      "name": "Current Research Opportunities",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "JobPosting",
            "@id": "https://research-board.university.edu/opportunities/1",
            "title": "Synaptic Plasticity Modeling via Spiking Neural Networks",
            "description": "Investigate long-term potentiation and depression algorithms mapped onto custom neuromorphic silicon architectures. Experience with Python, PyTorch, and spike-train metrics preferred.",
            "datePosted": "2026-10-01",
            "validThrough": "2026-11-30T23:59:59Z",
            "employmentType": "PART_TIME",
            "hiringOrganization": {
              "@type": "CollegeOrUniversity",
              "name": "University Department of Computational Neuroscience",
              "department": "Computational Neuroscience"
            },
            "jobLocation": {
              "@type": "Place",
              "name": "Neuroscience Research Center Lab 402",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "University Campus",
                "addressRegion": "State",
                "addressCountry": "US"
              }
            },
            "occupationalCategory": "Research Assistant",
            "skills": "Python, PyTorch, Neuromorphic Hardware, Spiking Neural Networks",
            "totalJobOpenings": 3
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "JobPosting",
            "@id": "https://research-board.university.edu/opportunities/2",
            "title": "Cryogenic Qubit Calibration & Error Suppression",
            "description": "Hands-on RF microwave pulse shaping at 15 mK dilution temperatures. Project focuses on dynamical decoupling sequences to minimize two-qubit gate randomized benchmarking errors.",
            "datePosted": "2026-10-02",
            "validThrough": "2026-11-30T23:59:59Z",
            "employmentType": "PART_TIME",
            "hiringOrganization": {
              "@type": "CollegeOrUniversity",
              "name": "Applied Physics Laboratory",
              "department": "Applied Physics"
            },
            "jobLocation": {
              "@type": "Place",
              "name": "Quantum Materials Lab"
            },
            "occupationalCategory": "Physics Student Researcher",
            "skills": "RF Pulse Shaping, Quantum Computing, Python, Cryogenics",
            "totalJobOpenings": 2
          }
        }
      ]
    }
  ]
}
</script>
```

---

## 7. React Component Conversion Guide

When translating Stitch HTML/CSS exports into React components, engineers must follow these exact component boundaries and clean styling conventions.

### 7.1 Component Architecture Map

```
frontend/src/components/
├── atoms/
│   ├── OutlinedButton.tsx         # Pill button with 1px black outline, white fill
│   ├── PrimaryButton.tsx          # Pill button with black fill, white text
│   ├── StatusBadge.tsx             # Open (Lavender fill) / Closed (Soft Mist fill)
│   ├── StickerIcon.tsx             # Flat SVG stickers (atom, flask, bulb, check)
│   └── SkillChip.tsx               # Small pill tag for required skills
├── molecules/
│   ├── MarqueeBanner.tsx          # Top ticker with reduced-motion support
│   ├── StatCounterPill.tsx        # Dynamically calculated open/closed counts
│   ├── FormField.tsx              # Input with label, required dot, error message
│   └── ConfirmDialog.tsx          # Native <dialog> for delete confirmation
├── organisms/
│   ├── TopNav.tsx                 # Header landmark with logo and action cluster
│   ├── HeroSection.tsx            # H1 display text, tagline, search bar, stickers
│   ├── FilterToolbar.tsx          # Status filter pills and results counter
│   ├── OpportunityCard.tsx        # Article card with rotating header wash
│   ├── OpportunityList.tsx        # Responsive 3-col grid and empty/error states
│   ├── DetailModal.tsx            # Native <dialog> viewing single listing details
│   ├── OpportunityFormModal.tsx   # Native <dialog> for Create / Edit operations
│   └── ToastContainer.tsx         # Floating polite/assertive live region
└── templates/
    └── BoardLayout.tsx            # Main shell with header, main, and footer
```

---

### 7.2 Header Wash Rotation Logic (`OpportunityCard.tsx`)

In accordance with `UI_DESIGN_SPEC.md §3`:
```tsx
const HEADER_WASHES = [
  "bg-lavender",      // id % 3 === 0
  "bg-mint-pop",      // id % 3 === 1
  "bg-electric-blue"  // id % 3 === 2
] as const;

export function getCardHeaderWash(id: number, status: "open" | "closed"): string {
  if (status === "closed") {
    return "bg-soft-mist"; // Closed cards always use Soft Mist
  }
  return HEADER_WASHES[Math.abs(id) % 3];
}
```

---

### 7.3 Delivery Verification Checklist (R-01 through R-38)

Frontend engineers must verify all items before delivering the React implementation:

- [ ] **R-01 (Palette):** Exact 11 project tokens used. No blue-purple gradients, no neon glows.
- [ ] **R-02 (Copywriting):** Zero em dashes (`—`) in UI code, titles, placeholders, or copy.
- [ ] **R-03 (Responsiveness):** 320px reflow without horizontal scrolling; touch targets ≥ 40px.
- [ ] **R-04 (Icons):** Relevant domain icons (flask, atom, checkmark, lock) with `aria-hidden="true"`.
- [ ] **R-05 (Layout):** Content-driven layout; no generic bento boxes or fake pricing tiers.
- [ ] **R-09 (Badges):** No tautological eyebrow badges above H1; status badges reflect actual database states.
- [ ] **R-10 (Glassmorphism):** Zero backdrop-filter blur; clean solid surfaces only.
- [ ] **R-12 (Shadows):** Zero box-shadows anywhere (`box-shadow: none !important`).
- [ ] **R-13 (Glow):** Zero glowing text, borders, or buttons.
- [ ] **R-15 (CTAs):** Contextual verbs only ("Post Opportunity", "View Details", "Close Listing").
- [ ] **R-16 (Buzzwords):** No "revolutionary", "seamless", "cutting-edge", or "inflatable sticker universe".
- [ ] **R-17 & R-38 (Real Data):** All counters and stats computed dynamically from API data.
- [ ] **R-19 (Motion):** `prefers-reduced-motion` pauses the marquee and disables skeleton pulses.
- [ ] **R-21 & R-34 (Theme):** Single robust Light theme on pale blue paper canvas. No broken dark styles.
- [ ] **R-25 (Contrast):** Carbon `#000` text on all pastel surfaces satisfies ≥ 7:1 WCAG AAA.
- [ ] **R-26 & R-35 (Interactivity):** Every button triggers a real state change or modal; no dead clicks.
- [ ] **R-27 (UI States):** S2 Loading Skeleton, S3 Empty State, and S4 Error State fully implemented.
- [ ] **R-32 (Keyboard):** Full Tab keyboard navigation; native `<dialog>` handles focus trapping and Esc.

---

*Authored by:* Anti-Slop & SEO Agent  
*Approved for Phase 4 Step 4:* Research Opportunity Portal Architecture
