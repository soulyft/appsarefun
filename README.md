# Apps Are Fun

This repository contains the marketing website for **Apps Are Fun**, an iOS app studio that designs and ships native SwiftUI experiences.

## Featured apps

The site showcases several iOS apps built by the studio:

- **[Chime](https://apps.apple.com/us/app/chime-turn-noise-into-music/id6692633791)** – turn noise into music with touch.
- **[Gradient Synth](https://apps.apple.com/us/app/gradient-synth/id6477543878)** – make music from color.
- **[Winter Zen](https://apps.apple.com/us/app/winter-zen-snow-globe-music/id1659934804)** – a musical snow globe for relaxation.
- **Promote PDX** – discover Portland's live music scene. Want to know when it launches? [Fill out the interest form](https://docs.google.com/forms/d/e/1FAIpQLSc5TX2Z_rLcJ7q8VFa9j97jFT61vFCgRV5JiACBjVfqcV5Wsw/viewform?usp=sharing&ouid=115128560275753879378) to learn more.

## Development

This project uses [Vite](https://vitejs.dev/) with React and TypeScript. To run the site locally:

```sh
npm install
npm run dev
```

To create a production build:

```sh
npm run build
```

## Routing and Vercel deployment

This site is a **single-page app (SPA)** that uses `react-router-dom` with `BrowserRouter`.
That means URLs like `/droplet` are client-side routes, not separate server-rendered pages.

When deployed on Vercel, direct requests to deep links (for example, loading `/droplet` in a fresh tab) must be rewritten to `/index.html` so the React app can boot and resolve the route in the browser.

The repo includes a `vercel.json` fallback route for this:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### Rule for future routes

If you add new client-side routes in React Router, keep the SPA fallback rewrite in `vercel.json`. Without it, direct navigation to those routes will return Vercel `404 / NOT_FOUND` even though in-app navigation still works.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## License

This project is licensed under the MIT License.
