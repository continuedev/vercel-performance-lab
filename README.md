# Continue + Vercel Performance Lab

Sample Next.js 15 app for the Continue + Vercel hands-on lab.

## What's in this repo

A Next.js App Router application with dashboard, products, and settings pages. The repo has `.continue/checks/` with two performance checks based on Vercel's react-best-practices rules.

## Checks

- **waterfall-detection.md**: Catches async waterfalls (sequential independent awaits, deferred awaits, missing Suspense)
- **bundle-size-guard.md**: Catches barrel imports, unnecessary 'use client', missing dynamic imports for heavy libraries

## Test branches

- `test/waterfall-api-route`: Should fail (three independent sequential awaits)
- `test/barrel-imports-and-use-client`: Should fail (barrel imports + unnecessary 'use client')
- `test/legitimate-sequential`: Should pass (genuinely dependent sequential awaits)
- `test/clean-component`: Should pass (well-optimized code)
