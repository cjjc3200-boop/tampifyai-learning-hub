# TampifyAI Learning Hub

An AI-skills and tech-careers learning app for ages 13+. Free tier plus a **Pro** tier ($9.99/month or $100/year). Built as a single static site — no backend, progress saved in the browser.

## What's inside

- **9 tracks, 45 lessons** with full lesson bodies
  - Free: AI Foundations, Prompt Engineering, Tech Careers 101
  - Pro: ML Deep Dive, Python for AI, AI Automation & No-Code, Cybersecurity, Data Science, AI Entrepreneurship
- **Retention layer:** daily streak, XP + 5 levels, 10 badges, 6 multi-day challenges, and a "This Week in AI" feed (+20 XP per article)
- **Pages:** Dashboard, Courses, Challenges, AI Feed, Careers, Profile
- **Paywall:** plan chooser (monthly/yearly) + access-code entry

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App shell |
| `styles.css` | Theme (dark navy, cyan accent) |
| `data-core.js` | Config (checkout links), tracks, free lesson content |
| `data-pro-a.js` / `data-pro-b.js` | Pro lesson content |
| `data-meta.js` | Badges, challenges, feed, careers |
| `app.js` | App logic |

## Set your checkout links

Edit the top of `data-core.js` (or `CONFIG` in the standalone file):

```js
CHECKOUT_MONTHLY: "https://buy.stripe.com/...",
CHECKOUT_YEARLY:  "https://buy.stripe.com/...",
```

Until these are set, the plan buttons show a friendly note instead of erroring. `ACCESS_CODES` holds optional manual unlock codes.

## Local preview

Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8000
```

## Deploy

Static host (Netlify, Vercel, GitHub Pages, Railway). Netlify: **Add new site → Import from Git → pick this repo**, then add `learn.tampifyai.com` as a custom domain.
