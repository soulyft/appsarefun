# AGENTS.md

## Repository guardrails

- This project is a Vite + React SPA using `react-router-dom` and `BrowserRouter`.
- Deep links (for example `/droplet`) require an SPA fallback on static hosts.
- Keep `vercel.json` configured with a filesystem handler and catch-all rewrite to `/index.html`.
- If you add or modify routes, validate both:
  - in-app navigation from `/`
  - direct browser load of the deep link path

## Pre-merge checks for routing changes

Run:

```sh
npm run build
```

Then verify `vercel.json` still contains the SPA fallback route.
