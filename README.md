# Moo Dairy Farms — Investment Platform Prototype

Virtual dairy cow investment platform with investor and admin dashboards.

## Quick Start (Local)

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deploy to Vercel

### Option A: Via Git (recommended)

1. Push this repo to GitHub:
```bash
git init
git add .
git commit -m "Moo Dairy Farms prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moo-dairy-farms.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
3. Click **"Add New Project"**
4. Import `moo-dairy-farms` repo
5. Click **Deploy** (Vercel auto-detects Vite)
6. Your URL: `https://moo-dairy-farms.vercel.app`

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Done in 30 seconds.

## What's Inside

- **Homepage** — Hero, How Virtual Farming Works, Platform Stats, Tiered Returns, CTA, FAQ, Footer
- **Investor Dashboard** — Overview, My Cows, Payouts, Documents, Purchase Flow (Plaid + Stripe)
- **Admin Dashboard** — Task Queue, Investor Management, Cow Data (XLS upload), Payouts, Documents, Settings

## Tech Stack

- React 18 + Vite
- Single-file app (no external dependencies beyond React)
- Embedded assets (logo + hero image as base64)
- DM Serif Display + Outfit fonts (Google Fonts)
