This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production on the Toan Vui VPS

The production image uses Next.js standalone output, runs as the unprivileged
`node` user, and is routed through the VPS's existing Traefik network.

```bash
npm ci
npm test
npm run lint
npm run build
docker compose -f docker-compose.vps.yml up -d --build
curl --fail https://toanvui.tinhocsaoviet.com/api/health
```

The compiler endpoints are intentionally disabled when `NODE_ENV=production`.

## Question bank administration

The question backend uses SQLite and automatically imports the curated JSON
question bank the first time the database is opened. For a local import/check:

```bash
npm run questions:build:math1
node scripts/validate_questions.js
npm run db:sync
```

The Grade 1 mathematics generator creates 400 reviewed questions covering all
41 lessons across both semester books. Each question retains its lesson,
learning objective, difficulty, book reference and printed source page.
Generated book questions are imported as `published`; synchronization is
idempotent and does not overwrite later administrator edits.

Open `/admin/login` to manage questions by grade, subject, type and publication
status. Local development defaults to `admin` / `admin123`. Production does not
have a default password: set these environment variables before deploying:

```bash
export ADMIN_USERNAME=admin
export ADMIN_PASSWORD='use-a-long-random-password'
export ADMIN_SESSION_SECRET='use-a-different-random-value-of-at-least-32-characters'
docker compose -f docker-compose.vps.yml up -d --build
```

The Compose deployment stores `questions.sqlite` in the persistent
`question-data` volume. Deleting and rebuilding the application container does
not delete the question bank.
