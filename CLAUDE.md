# CLAUDE.md — Pomodoro App Redesign

> Persistent context for Claude Code. Read this fully before every session.

---

## Project Overview

This is a redesign of an existing Pomodoro timer app originally built with Vite + React + TypeScript + SCSS + Context API. The app is functional and battle-tested. The goal of this redesign is **not** to rebuild from scratch — it is a targeted upgrade focused on three things:

1. Replacing SCSS with Tailwind CSS
2. Converting the app into a PWA (installable, offline-capable)
3. Migrating to a features-based folder structure
4. Adding one new feature: a **Session Counter** (Pomodoro round tracker)

The core timer logic, animations, and UX patterns are proven and should be preserved unless a specific instruction says otherwise.

---

## Tech Stack

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Build tool | Vite                                               |
| Framework  | React 18                                           |
| Language   | TypeScript (strict)                                |
| Styling    | Tailwind CSS v4.2                                  |
| Animation  | Framer Motion                                      |
| State      | Context API + `useReducer` (keep existing pattern) |
| PWA        | `vite-plugin-pwa` + Workbox                        |
| Icons      | `react-icons` (keep existing icon imports)         |
| Responsive | `react-responsive` (keep for mobile breakpoints)   |
| Audio      | Native `Audio` constructor (keep existing pattern) |

**Do not introduce** Zustand, Redux, React Query, or any additional state libraries. The existing Context architecture is intentional and sufficient.

---

## Folder Structure

Migrate from the current flat structure to a **features-based** architecture:

```
src/
├── features/
│   ├── timer/
│   │   ├── components/
│   │   │   ├── Timer.tsx
│   │   │   ├── TimerButton.tsx
│   │   │   ├── RestartTimer.tsx
│   │   │   ├── CircleProgressBar.tsx
│   │   │   ├── AlarmBell.tsx
│   │   │   └── SessionCounter.tsx       ← new feature
│   │   ├── context/
│   │   │   └── TimerContext.tsx
│   │   ├── hooks/
│   │   │   └── useCountdown.ts          ← extract countdown logic from Timer.tsx
│   │   └── index.ts
│   │
│   ├── settings/
│   │   ├── components/
│   │   │   ├── Settings.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── TimeInputForm.tsx
│   │   │   ├── NumberInput.tsx
│   │   │   ├── FontSelector.tsx
│   │   │   ├── ColorSelector.tsx
│   │   │   └── ApplyBtn.tsx
│   │   ├── context/
│   │   │   ├── ColorContext.tsx
│   │   │   ├── FontContext.tsx
│   │   │   └── ModalContext.tsx
│   │   └── index.ts
│   │
│   └── switch/
│       ├── components/
│       │   └── Switch.tsx
│       └── index.ts
│
├── lib/
│   └── helpers.ts                       ← getDuration() lives here
│
├── types/
│   └── index.ts                         ← shared TypeScript types
│
├── App.tsx
├── main.tsx
└── index.css                            ← Tailwind directives only
```

**Rules:**

- Each feature owns its own components, context, and hooks
- Cross-feature imports go through the feature's `index.ts` barrel file
- No feature imports directly from another feature's internals
- Shared utilities live in `lib/`, shared types in `types/`

---

## New Feature: Session Counter

### What it is

A row of 4 circular indicator dots displayed below the timer circle. Each completed Pomodoro session fills one dot. After 4 dots are filled (a full Pomodoro cycle), they reset on the next long break.

### Why it belongs

The original Pomodoro Technique defines a full cycle as 4 work sessions followed by a long break. The existing app has no awareness of this cycle — the counter makes the technique complete without adding any UI complexity.

### Behaviour rules

- Only Pomodoro sessions (not breaks) increment the counter
- The counter increments when the timer reaches `00:00` while `runCount` is true
- After 4 sessions, the dots stay full until the user takes a Long Break, which resets them to 0
- Switching timer mode manually does NOT reset the counter (only a completed Long Break does)
- The counter persists in `localStorage` under the key `"sessionCount"` so page refresh doesn't lose progress
- Display: 4 small circles, unfilled = `border` only, filled = `background: var(--main-color)`

### State additions to `TimerContext`

```typescript
// Add to TimerStateType
sessionCount: number; // 0–4

// Add actions
type IncrementSessionAction = { type: "INCREMENT_SESSION" };
type ResetSessionAction    = { type: "RESET_SESSION" };

// Add to TimerContextValue
incrementSession: () => void;
resetSession: () => void;
```

### Component: `SessionCounter.tsx`

```tsx
// Located at: src/features/timer/components/SessionCounter.tsx
// Renders 4 dots. Reads sessionCount from TimerContext.
// No props needed — pulls state directly from context.
```

---

## PWA Setup

Use `vite-plugin-pwa` with the following requirements:

### `vite.config.ts` additions

```ts
import { VitePWA } from "vite-plugin-pwa";

VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "assets/alarm.mp3"],
  manifest: {
    name: "Pomodoro",
    short_name: "Pomodoro",
    description: "A focused Pomodoro timer",
    theme_color: "#1E213F",
    background_color: "#1E213F",
    display: "standalone",
    icons: [
      { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,mp3}"],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "CacheFirst",
      },
    ],
  },
});
```

**PWA requirements:**

- App must be fully functional offline (audio, timer, settings)
- Google Fonts must be cached via Workbox runtime caching
- `alarm.mp3` must be included in the precache manifest
- Generate PWA icons at `192x192` and `512x512` before first build

---

## Tailwind CSS Migration

> **Version: Tailwind CSS v4.2** — v4 is a complete architecture change from v3. There is no `tailwind.config.ts`. Configuration lives entirely in CSS via the `@theme` directive.

### Installation

```bash
pnpm add tailwindcss @tailwindcss/vite
```

No PostCSS config needed. The `@tailwindcss/vite` plugin handles everything.

### `vite.config.ts` — Add the v4 Vite Plugin

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // ← replaces postcss/tailwind pipeline
  ],
})
```

### `src/index.css` — Single Import + Theme Block

v4 replaces the three `@tailwind` directives with a single import. Design tokens are defined inline using `@theme`:

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  /* ── Colors (mapped from SCSS variables) ── */
  --color-dark-1:        #1E213F;   /* was --dark-blue-shade-1 */
  --color-dark-2:        #161932;   /* was --dark-blue-shade-2 */
  --color-faded-blue:    #D7E0FF;   /* was --faded-blue        */
  --color-off-white:     #EFF1FA;   /* was --off-white         */
  --color-accent-red:    #F87070;
  --color-accent-cyan:   #70F3F8;
  --color-accent-purple: #D881F8;

  /* ── Fonts ── */
  --font-kumbh:  "Kumbh Sans", sans-serif;
  --font-roboto: "Roboto Slab", serif;
  --font-space:  "Space Mono", monospace;

  /* ── Border Radius ── */
  --radius-pill: 26.5px;
}
```

These automatically generate utility classes: `bg-dark-1`, `text-accent-red`, `font-kumbh`, `rounded-pill`, etc. Do **not** use `tailwind.config.ts` — it is not used in v4.

### v4 Utility Class Changes to Know

| v3 class | v4 equivalent | Note |
|----------|--------------|-------|
| `bg-opacity-50` | `bg-black/50` | Opacity now uses slash syntax |
| `shadow-sm` | `shadow-xs` | Shadows shifted down one step |
| `shadow` | `shadow-sm` | — |
| `outline-none` | `outline-hidden` | — |
| `!flex` (important) | `flex!` | Important modifier moves to end |
| `bg-[--my-var]` | `bg-(--my-var)` | CSS var arbitrary syntax |

### CSS Custom Properties

Keep `--main-color` as a CSS custom property for the dynamic accent color — v4 `@theme` values are static. The runtime color switching must remain as-is:

```tsx
// Still valid alongside Tailwind v4
document.documentElement.style.setProperty('--main-color', color)

// In JSX, use inline style only for the dynamic accent
<div style={{ stroke: 'var(--main-color)' }} />
```

Do **not** define `--main-color` inside `@theme` — it changes at runtime and would break the static theme contract.

### Upgrading from v3 (if needed)

```bash
npx @tailwindcss/upgrade
```

This CLI auto-migrates `tailwind.config.ts` and class names to v4 syntax.

---

## Preserved Business Logic

These rules must never be broken when refactoring:

| Rule                   | Detail                                                                        |
| ---------------------- | ----------------------------------------------------------------------------- |
| Timer min/max          | Pomodoro: 5–60 min. Short Break: 2–60 min. Long Break: 5–60 min               |
| No auto-start          | Timer starts only on user click, never on mount or mode switch                |
| Mode switch resets     | Switching mode resets count and stops alarm (and pauses timer)                |
| Settings are deferred  | Color, font, and time changes only apply on "Apply" click                     |
| Alarm loops            | `audio.loop = true` — alarm continues until user dismisses                    |
| localStorage           | Persist `color` and `sessionCount`. Font is not persisted (resets to `kumbh`) |
| Alarm stops on dismiss | Clicking the `AlarmBell` close button stops audio immediately                 |
| Disabled state         | Timer controls show `opacity-30` when count is 0 (timer not started)          |

---

## Custom Hooks

Extract the following logic from `Timer.tsx` into `useCountdown.ts`:

```ts
// src/features/timer/hooks/useCountdown.ts
// Responsible for:
// - count state
// - runCount state
// - isLoaded state
// - the setInterval countdown logic
// - triggering alarm when count hits 0
// - triggering session increment when Pomodoro reaches 0
// Returns: { count, runCount, isLoaded, setRunCount, percentage }
```

This keeps `Timer.tsx` as a pure layout/composition component.

---

## Code Conventions

| Convention           | Rule                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Components           | PascalCase, one component per file                                                              |
| Hooks                | `use` prefix, camelCase (`useCountdown`, `useTimer`)                                            |
| Types                | Suffix with `Type` for state shapes (`TimerStateType`), suffix with `Props` for component props |
| Context files        | One context per domain, always export a custom hook (`useTimer`, `useColor`, etc.)              |
| No `any`             | Use `unknown` or proper generics. `any` is banned                                               |
| No inline styles     | Except for `--main-color` dynamic CSS custom property and SVG attributes                        |
| Tailwind class order | Follow `prettier-plugin-tailwindcss` order (compatible with v4). Install: `pnpm add -D prettier prettier-plugin-tailwindcss` |
| Barrel exports       | Each feature exports public API through `index.ts`                                              |

---

## What NOT To Do

- Do not refactor working context reducers unless instructed
- Do not auto-start the timer on any lifecycle event
- Do not add a task list, to-do, or any productivity feature beyond the Session Counter
- Do not use arbitrary Tailwind values (e.g. `w-[410px]`) for the design tokens defined in `@theme` — use the generated utility classes instead
- Do not create a `tailwind.config.ts` — v4 uses CSS-based config via `@theme` in `index.css`
- Do not use v3 CSS variable arbitrary syntax `bg-[--my-var]` — use v4 syntax `bg-(--my-var)`
- Do not import from a feature's internal subfolder from outside that feature — use barrel exports
- Do not remove the Framer Motion animations from `Switch.tsx` or `AlarmBell.tsx`
- Do not change the modal to a non-`<dialog>` implementation
- Do not replace `react-responsive` with CSS-only breakpoints — the JS value is needed for the SVG `radius` calculation in `CircleProgressBar.tsx`

---

## Commands

```bash
# Development
pnpm dev

# Build (includes PWA asset generation)
pnpm build

# Preview production build (required to test PWA)
pnpm preview

# Type check
pnpm tsc --noEmit

# Lint
pnpm eslint . --ext .ts,.tsx
```

> **Note:** PWA service worker only activates in production (`pnpm preview`), not in `pnpm dev`.

---

## Migration Checklist

Work through this in order. Do not skip ahead.

- [ ] Set up Tailwind CSS, remove all SCSS files and imports
- [ ] Extend `tailwind.config.ts` with design tokens
- [ ] Restructure folders to features-based layout
- [ ] Extract `useCountdown` hook from `Timer.tsx`
- [ ] Add `sessionCount` state + actions to `TimerContext`
- [ ] Build `SessionCounter.tsx` component
- [ ] Wire session counter logic into `useCountdown`
- [ ] Install and configure `vite-plugin-pwa`
- [ ] Generate PWA icons (`pwa-192x192.png`, `pwa-512x512.png`)
- [ ] Verify offline functionality with `pnpm preview`
- [ ] Test on mobile viewport (≤ 451px breakpoint)
- [ ] Confirm `localStorage` persistence works for `color` and `sessionCount`
