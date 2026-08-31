<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Production workflow

- Work on `main` unless the user explicitly requests another branch.
- After completing an authorized code change, run `npm run lint`, `npm test`, and
  `npm run build` before committing.
- Stage only files that belong to the current task. Never stage unrelated or
  pre-existing untracked files.
- When the checks pass, commit the task with a descriptive message and push it
  directly to `origin/main` without waiting for an additional prompt.
- A successful GitHub check on `main` is deployed automatically by the VPS
  timer. Verify `https://toanvui.tinhocsaoviet.com/api/health` and the affected
  production page before reporting completion.
