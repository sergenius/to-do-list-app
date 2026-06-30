# TaskFlow

A beautiful, modern TODO productivity dashboard built with React, Vite, and Tailwind CSS.

## Features

- Add, edit, complete, and delete tasks
- Priority levels (Low, Medium, High) and categories (Personal, Work, Health, Finance, Learning, Other)
- Search, filter by status/priority/category, and sort tasks
- Dashboard stats with progress bar
- Dark mode with persisted preference
- localStorage persistence — no backend required
- Responsive glassmorphism UI for desktop, tablet, and mobile

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Local component state + localStorage

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Netlify (free)

This repo includes a GitHub Actions workflow that builds and deploys to [Netlify](https://www.netlify.com/) on every push to `main`. Netlify’s free tier is enough for a static app like TaskFlow (100 GB bandwidth / month, 300 build minutes / month).

### One-time setup

1. **Create a Netlify account** at https://app.netlify.com (free).

2. **Create a site** (either option works):
   - **Option A — Link GitHub in Netlify:** Add new site → Import from Git → select this repo. Netlify will read [`netlify.toml`](netlify.toml). You can still use the GitHub Action for deploys if you prefer Actions over Netlify’s built-in hook.
   - **Option B — Manual site for Actions:** Sites → Add new site → Deploy manually (empty site). Note the **Site ID** under Site configuration → General.

3. **Create a Netlify personal access token:**
   - User settings → Applications → Personal access tokens → New access token.

4. **Add GitHub repository secrets** (Settings → Secrets and variables → Actions):
   | Secret | Value |
   |--------|--------|
   | `NETLIFY_AUTH_TOKEN` | Your Netlify personal access token |
   | `NETLIFY_SITE_ID` | Site ID from Netlify dashboard |

5. **Merge to `main`** — the workflow in [`.github/workflows/deploy-netlify.yml`](.github/workflows/deploy-netlify.yml) runs automatically and publishes `./dist`.

### Manual deploy trigger

In GitHub: **Actions → Deploy to Netlify → Run workflow**.

### Alternative: GitHub Pages (also free)

If you prefer staying entirely on GitHub, GitHub Pages can host the `dist` folder with a similar Actions workflow — no Netlify account needed. Netlify is often simpler for SPAs and gives you instant preview URLs on PRs.

## License

MIT
