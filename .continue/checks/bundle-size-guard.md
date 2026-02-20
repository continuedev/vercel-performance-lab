## Bundle Size Guard

Prevent bundle size regressions on every PR. Based on Vercel's react-best-practices bundle optimization rules.

### Barrel Imports:
Flag imports from package barrel files for:
- lucide-react: use lucide-react/icons/[IconName]
- @mui/material: use @mui/material/[Component]
- @radix-ui/react-*: use specific component imports
- lodash: use lodash/[function]
- date-fns: use date-fns/[function]
- react-icons: use react-icons/[set]/[Icon]
Suggest the specific deep import path.

### 'use client' Validation:
Flag 'use client' directives on components that don't use:
- useState, useEffect, useRef, useCallback, useMemo
- Event handlers (onClick, onChange, onSubmit, etc.)
- Browser APIs (window, document, localStorage, etc.)
These components can be server components. Suggest removing the directive.

### Dynamic Imports:
Flag static imports of heavy libraries not needed on initial render. Suggest next/dynamic with ssr: false where appropriate. Watch for: recharts, chart.js, @monaco-editor/react, mapbox-gl, three.js, @react-pdf/renderer.

### How to respond:
- Pass if no bundle size issues found.
- Fail with: which rule was violated, estimated bundle impact, and a suggested fix.
