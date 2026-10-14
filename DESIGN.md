# Design System & Tokens: Abhicode

"A problem set, not a SaaS landing page."
Calm, dense, typographic. The problem statement is the hero. Inspired by the reading comfort of technical monographs, Codeforces' information density, and Linear's mechanical restraint.

---

## 1. Color Tokens

All colors are exposed as CSS variables on `:root` and `[data-theme="dark"]` / `[data-theme="light"]`.

### Theme: "Ink" (Dark - Default)
| Token | Hex | Role | Contrast Ratio |
|---|---|---|---|
| `--color-bg` | `#151210` | Page backdrop | Base |
| `--color-surface` | `#1D1915` | Resting containers, table rows | 1.15:1 step |
| `--color-raised` | `#262019` | Dialogs, popovers, active inputs | 1.35:1 step |
| `--color-line` | `#342D25` | 1px hairline dividers, borders | High subtlety |
| `--color-line-focus` | `#584B3E` | Secondary border emphasis | Structural |
| `--color-text` | `#EAE3D6` | Primary body, titles, headings | 13.8:1 (AAA) |
| `--color-text-muted` | `#A0968A` | Secondary meta, labels, row numbers | 6.3:1 (AA) |
| `--color-accent` | `#F0562D` | Vermilion accent (links, primary button, focus ring, cursor) | 5.0:1 (AA) |
| `--color-accent-subtle` | `rgba(240, 86, 45, 0.12)` | Selection, active tag background | - |
| `--color-diff-easy` | `#86A87A` | Sage green (Easy pip & label) | 7.4:1 (AA) |
| `--color-diff-medium` | `#D4A03A` | Ochre amber (Medium pip & label) | 7.6:1 (AA) |
| `--color-diff-hard` | `#D1624B` | Brick red (Hard pip & label) | 4.8:1 (AA) |

### Theme: "Paper" (Light)
| Token | Hex | Role | Contrast Ratio |
|---|---|---|---|
| `--color-bg` | `#F3EEE4` | Page backdrop | Base |
| `--color-surface` | `#FAF7F0` | Resting containers, table rows | 1.1:1 step |
| `--color-raised` | `#FFFDF8` | Dialogs, popovers, active inputs | 1.2:1 step |
| `--color-line` | `#D9D0C0` | 1px hairline dividers, borders | Structural |
| `--color-line-focus` | `#B5A893` | Secondary border emphasis | Structural |
| `--color-text` | `#1E1914` | Primary body, titles, headings | 13.6:1 (AAA) |
| `--color-text-muted` | `#6B6155` | Secondary meta, labels, row numbers | 4.8:1 (AA) |
| `--color-accent` | `#C23A15` | Vermilion accent (links, primary button, focus ring, cursor) | 5.3:1 (AA) |
| `--color-accent-subtle` | `rgba(194, 58, 21, 0.1)` | Selection, active tag background | - |
| `--color-diff-easy` | `#3D6E31` | Deep Sage (Easy pip & label) | 5.5:1 (AA) |
| `--color-diff-medium` | `#825700` | Deep Ochre (Medium pip & label) | 5.4:1 (AA) |
| `--color-diff-hard` | `#8F2A1E` | Deep Brick (Hard pip & label) | 6.8:1 (AA) |

---

## 2. Typography

Three typeface families loaded via Google Fonts:
1. **UI & Headings**: `Schibsted Grotesk` (weights 500, 700)
2. **Editorial Reading Body**: `Newsreader` (weights 400, 500, italic; optical size 16-72)
3. **Code, Numbers, IDs, Meta**: `IBM Plex Mono` (weights 400, 500, tabular figures enabled)

### Modular Type Scale (Base: 15px, Ratio: 1.25)
| Step | Token | Size (px) | Size (rem) | Typical Usage |
|---|---|---|---|---|
| `-2` | `--text-xs` | `9.6px` / `10px` | `0.64rem` | Tiny pill badges, pip micro-labels |
| `-1` | `--text-sm` | `12px` | `0.8rem` | Row numbers, meta rail, timestamp, table headers |
| `0` | `--text-base` | `15px` | `1.0rem` | UI buttons, navigation, input fields, form labels |
| `1` | `--text-md` | `18.75px` | `1.25rem` | Problem title in list, section headings, editorial body (17.5px) |
| `2` | `--text-lg` | `23.44px` | `1.5625rem` | Detail title `<h1>`, subheadings |
| `3` | `--text-xl` | `29.3px` | `1.953rem` | Page title headers |
| `4` | `--text-2xl` | `36.62px` | `2.441rem` | Hero title banner |

### Editorial Reading Column
- Font: `Newsreader`, serif
- Font size: `1.125rem` (18px)
- Line height: `1.65`
- Max width: `68ch`
- Paragraph spacing: `1.15em`

---

## 3. Shape, Depth, and Borders

- **Border radius**: `2px` for buttons, inputs, pills, tags, code blocks; `4px` maximum for dialogs.
- **Hairlines**: `1px solid var(--color-line)`. Never thicker unless focus ring.
- **Focus ring**: `2px solid var(--color-accent)` with `2px` offset.
- **Depth**: Controlled purely by surface tone gradation (`bg` -> `surface` -> `raised`).
- **No shadows**: Drop shadows, blur filters, glassmorphism, glow effects are banned.

---

## 4. Components & Editorial Patterns

### 4.1 Wordmark
- Lowercase monospace: `abhicode` in `IBM Plex Mono`, font-weight 500.
- Trailing solid vermilion square block: `8px x 8px` inline block (`#F0562D` / `#C23A15`).

### 4.2 Difficulty Meter
- Never color alone (WCAG requirement).
- Format: 3-pip meter followed by difficulty label.
  - Easy: `● ○ ○ easy`
  - Medium: `● ● ○ medium`
  - Hard: `● ● ● hard`
- Pips are drawn as `6px` circles with filled/unfilled stroke in `--color-diff-*`.

### 4.3 Table-of-Contents Problem Index Row
- Mono index sequence (`001`, `002`, `003`...) in `--color-text-muted`.
- Clean title in `Schibsted Grotesk` 500.
- Difficulty badge with 3-pip meter.
- Test cases count / badge (`2 test cases` / `0 test cases`).
- Hairline separator between rows (`1px solid var(--color-line)`).

### 4.4 Problem Detail View
- Editorial left column: max `68ch`, `Newsreader` font, syntax-highlighted code blocks, test case input/output specimen cards.
- Sticky right metadata rail (desktop): Difficulty, Test Cases summary, Manage quick action (Edit/Delete).
- Collapsible inline metadata summary bar on mobile (< 768px).

---

## 5. Motion Tokens

- Route transitions: `140ms ease-out` opacity and `translateY(4px)`.
- List row entrance: `120ms ease-out` staggered (max 6 items, 20ms step).
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all animations and transitions.

---

## 6. Prohibited Visual Patterns Checklist

- [x] No Inter, Roboto, Arial, Open Sans, Lato, Poppins, Geist, Plus Jakarta Sans, Space Grotesk.
- [x] No purple, indigo, violet colors.
- [x] No gradients on text, buttons, backgrounds, or borders.
- [x] No glassmorphism (`backdrop-filter: blur`), glows, neon effects.
- [x] No floating cards with rounded-2xl or blurred shadows.
- [x] No marketing landing page fluff ("unlock your potential", "modern platform").
- [x] No fake avatars, fake stats, fake submission buttons.
