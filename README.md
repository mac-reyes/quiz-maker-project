# Quiz Maker (React + Vite + TypeScript)

A small quiz builder/player app with a server-graded attempt flow.

---

## Features

- **Quizzes list** (landing): view, publish/unpublish, play
- **Quiz Builder**: create quiz + questions (MCQ/short/code)
- **Quiz Player**: start attempt, answer per question, submit to server for grading
- **Shared domain entities**: single source of truth for types (`src/domain/entities.ts`)

> **Note:** Anti-cheat signals feature has **not** been implemented

---

## Tech

- **React** + **Vite** + **TypeScript**
- Minimal UI primitives: `Button`, `Input`, `TextArea`, `Select`
- API calls via `fetch` wrapper (`src/services/apiClient.ts`)
- Env vars via **Vite `.env`** (`VITE_*`), typed for TS

---

## Getting Started (Local)

### Prerequisites

- Node 18+ and npm

## Quick start

```bash
# 1) Install deps
npm i

# 2) Build
npm run build

# 3) Start the server
npm run dev
```

By default the app runs on **http://localhost:5173**

## Architecture & Trade-offs

### Current Approach

- Entities centralized in src/domain/entities.ts — used across features, services, and UI.
- Services are thin HTTP wrappers — easy to maintain; minimal abstraction.
- Features follow a simple pattern: page + custom hook where hooks expose { state, actions }. Pages are presentational/dumb.
- UI primitives (Button, Input, TextArea, Select) let you style once and apply everywhere later.

### Trade-offs

- I kept the existing folder structure instead of introducing a separate Application/Infrastructure layer — less boilerplate, faster iteration.
- Use cases are implicit inside feature hooks rather than in a separate “application” layer — simpler, but with fewer formal boundaries.
- Styling is intentionally minimal; the primitives make it easy to scale design later without rewriting pages.

## Future Improvements

- **State management** (e.g. Redux)
- **Optimization of components** — use `useContext`, `useMemo`, `useCallback`
- **Styling** — either create own CSS or implement a UI library
