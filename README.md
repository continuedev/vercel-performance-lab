# Hands-On Lab: Build a React Performance Agent From Vercel's Rules

Sign up for Continue, connect this sample Next.js app, and watch two performance checks catch real antipatterns on your PRs.

## What You'll Build

Two Continue checks that run as GitHub status checks on every PR:

1. **Waterfall Detection** (`.continue/checks/waterfall-detection.md`): Catches async waterfalls based on Vercel's CRITICAL rules (1.1-1.5). Flags sequential awaits that could be parallelized, but correctly passes legitimately dependent operations.

2. **Bundle Size Guard** (`.continue/checks/bundle-size-guard.md`): Catches barrel imports, unnecessary `'use client'` directives, and missing dynamic imports for heavy libraries.

Both checks are already in this repo. You don't need to write them from scratch. The lab walks you through connecting the repo, opening test PRs, and watching the checks work.

## What's in This Repo

A Next.js 15 App Router application with dashboard, products, and settings pages. The main branch is clean. The test branches introduce deliberate antipatterns.

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Landing page (server component)
│   ├── dashboard/
│   │   ├── page.tsx                # Dashboard (server component)
│   │   └── components/
│   │       ├── StatsPanel.tsx      # Server component (no 'use client')
│   │       ├── ActivityFeed.tsx    # Async server component
│   │       └── ChartSection.tsx    # Client component, dynamic recharts
│   ├── api/
│   │   ├── users/route.ts         # API route (clean)
│   │   └── analytics/route.ts     # API route (clean)
│   ├── products/
│   │   ├── page.tsx               # Product listing
│   │   └── [id]/page.tsx          # Product detail
│   └── settings/
│       └── page.tsx               # Settings page
├── components/
│   ├── ui/                        # Shared UI components
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── api.ts                     # API client functions
│   ├── auth.ts                    # Auth utilities
│   └── db.ts                      # Database queries
├── .continue/
│   └── checks/
│       ├── waterfall-detection.md # Check 1: Async waterfall detection
│       └── bundle-size-guard.md   # Check 2: Bundle size enforcement
├── package.json
├── next.config.js
└── tsconfig.json
```

## Prerequisites

- GitHub account
- Node.js 18+
## Step 1: Sign Up for Continue

1. Go to [continue.dev](https://continue.dev) and sign up for Mission Control
2. Connect your GitHub account

## Step 2: Fork and Connect the Repo

1. Fork this repo to your GitHub account
2. In Mission Control, connect the forked repo

**Checkpoint:** You should see the repo in your Mission Control dashboard.

## Step 3: Review the Checks

Open `.continue/checks/` in your fork. Two checks are already defined:

- **`waterfall-detection.md`** catches three patterns: deferred awaits (rule 1.1), independent sequential operations that should use `Promise.all()` (rule 1.2), and missing Suspense boundaries (rule 1.5). Critically, it knows to pass genuinely dependent sequential awaits.
- **`bundle-size-guard.md`** catches barrel imports from lucide-react, @mui/material, @radix-ui, lodash, date-fns, and react-icons. It flags unnecessary `'use client'` directives and static imports of heavy libraries that should use `next/dynamic`.

These are plain markdown files in your repo. Version-controlled, reviewable, editable. This is what standards-as-code looks like.

## Step 4: Open Test PR #1, Waterfall

1. In your fork, open a PR from `test/waterfall-api-route` to `main`
2. Wait for checks to run (30-60 seconds)
3. **Expected:** Waterfall Detection check flags the sequential awaits:
   - `getUser`, `getPreferences`, and `getNotifications` are awaited sequentially but all depend only on `userId`. Use `Promise.all()`.
   - Estimated savings: ~200-400ms per request
4. Bundle Size Guard passes (no import or directive issues)
5. Accept the waterfall suggestion
6. Check goes green

**What you're learning:** The check identified three independent operations and suggested parallelizing them. It understood that `userId` was the only input each needed, and none depended on another's result.

## Step 5: Open Test PR #2, Barrel Imports + 'use client'

1. Open a PR from `test/barrel-imports-and-use-client` to `main`
2. Wait for checks
3. **Expected:**
   - Bundle Size Guard flags barrel imports from `lucide-react` (~200KB) and `@radix-ui`, suggests deep imports
   - Bundle Size Guard flags `'use client'` on a component that only renders props, suggests removing it
   - Waterfall Detection passes (no async code in this PR)
4. Accept all suggestions
5. Checks go green

**What you're learning:** Two different kinds of bundle size issues caught in one PR. The icon imports and the unnecessary client directive both add JavaScript to the bundle that doesn't need to be there.

## Step 6: Open Test PR #3, The False Positive Test

This is the most important test.

1. Open a PR from `test/legitimate-sequential` to `main`
2. Wait for checks
3. **Expected:** Waterfall Detection check **passes**:
   - "Sequential awaits verified: `getPlan` depends on `user.planId` from `getUser`. `getInvoices` depends on `plan.billingId` from `getPlan`. No waterfall, operations are genuinely sequential."
4. No suggestions needed. Green check.

**What you're learning:** The check doesn't blindly flag every sequential await. It checks whether the operations actually depend on each other. This is why an AI check is better than a lint rule: it can reason about data flow.

## Step 7: Open Test PR #4, The Green Check

1. Open a PR from `test/clean-component` to `main`
2. Wait for checks
3. **Expected:** Both checks pass. Clean code. Green checks.

**What you're learning:** This is what most of your PRs look like once the checks are running. Verified. Passed. You move on.

## Step 8: Customize, Add a HIGH-Tier Rule

Open `.continue/checks/waterfall-detection.md` in your fork and add a rule:

```markdown
4. **Start promises early (rule 1.4):** In API routes and server
   actions, flag patterns where a promise could be started at the
   beginning of the function and awaited later, after other
   synchronous work has been done. Suggest starting the promise
   early and awaiting where the result is actually needed.
```

Commit the change. This is now a more comprehensive waterfall check, and updating it took 30 seconds.

**What you're learning:** The check's rules are just markdown. Adding a rule is adding a paragraph. You control what's enforced and how strictly.

## Lab Complete

By the end of this lab you have:

- Two performance checks running on your repo (waterfall detection + bundle size)
- Verified they catch real violations (waterfall, barrel imports, unnecessary `'use client'`)
- Verified they pass legitimate code (dependent sequential operations, clean components)
- Added a custom rule to expand coverage

You've seen the checks handle four scenarios correctly: catch a real waterfall, flag barrel imports and unnecessary directives, pass legitimately sequential code, and verify clean components.

**Next step:** Add `.continue/checks/` to your production Next.js repo. Start with the CRITICAL rules and expand from there.
