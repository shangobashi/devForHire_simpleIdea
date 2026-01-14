# DevHire Proto

A premium developer job board prototype with search, filters, job details, and a paid-post flow.

## Overview
- Curated job board experience with a hero search, featured listings, and company proof section.
- Browse and filter roles, view job details, and submit a job posting.
- Admin view for managing postings (mock data).

## Key Features
- Search by role, tech, or company
- Filter by job type (full-time / contract)
- Job detail view with requirements, salary range, and apply link
- Post-a-job flow with a mocked payment step
- Admin dashboard view for job status (mocked)

## Tech Stack
- React 19 + TypeScript
- Vite 6
- React Router (HashRouter)
- Tailwind-style utility classes

## Local Development
Prerequisites: Node.js 18+

1) Install dependencies
```bash
npm install
```

2) Set environment variables
```bash
GEMINI_API_KEY=your_key_here
```

3) Run the dev server
```bash
npm run dev
```

## Notes
- Job data is mocked in `services/data.ts`.
- Payment processing is simulated; no real charges are made.

## Deployment
This project is configured to deploy on Vercel with a `vite build` output to `dist`.

## Authorship
Created solely by Shango Bashi. No other person or entity contributed to the creation of this app.
