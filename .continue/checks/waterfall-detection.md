## React Waterfall Detection

Catch async waterfalls before they ship. Based on Vercel's react-best-practices CRITICAL rules (1.1-1.5).

### What to check:

1. **Deferred await (rule 1.1):** Flag functions where await executes before a conditional branch that doesn't use the result. Suggest moving the await into the branch where the result is needed.

2. **Independent parallelization (rule 1.2):** Flag sequential await statements where operations don't depend on each other's results. Two operations are independent if operation B doesn't reference the return value of operation A. Suggest Promise.all().

3. **Missing Suspense (rule 1.5):** In async server components, flag data fetching that blocks the full page render when parts of the page could be wrapped in Suspense for streaming.

### Important:
If sequential awaits ARE dependent (operation B uses the result of operation A), they should remain sequential. Pass these without flagging.

### How to respond:
- Pass if no waterfall patterns detected, noting what was verified.
- Fail with: the rule violated, why it's a waterfall, estimated latency impact, and a suggested fix showing the correct pattern.
