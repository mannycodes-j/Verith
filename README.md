# Verith Frontend

Verith is an evidence-first investigation and Media and Information Literacy
platform. This repository contains the Next.js frontend only. The NestJS API is
maintained separately in `samscript18/verith-be`.

## Requirements

- Node.js 24
- npm
- A running Verith backend

## Local development

```bash
cp .env.example .env.local
npm ci
npm run dev
```

The application runs at `http://localhost:3000`. `BACKEND_API_URL` defaults to
`http://localhost:4000`; Next.js proxies `/api/v1/*` requests to that backend.
The browser deliberately calls the frontend origin so authentication cookies
remain first-party.

Google authentication does not require a client ID in frontend environment
variables. The frontend reads the enabled state and public client ID from
`GET /api/v1/auth/google/config`; configure `GOOGLE_CLIENT_ID` on the backend.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Browser reports and test results are ignored by Git. The repository has its own
GitHub Actions workflow under `.github/workflows/frontend-ci.yml`; backend CI is
kept in the backend repository.

## Vercel deployment

Import this frontend repository directly. Do not configure it as a subdirectory
of the backend repository.

```text
Framework Preset:   Next.js
Install Command:    npm ci
Build Command:      npm run build
Output Directory:   leave empty
```

Set:

```text
BACKEND_API_URL=https://your-api.onrender.com
```

Do not append `/api/v1`. Redeploy after changing the value because Next.js
resolves the rewrite during the build. `NEXT_PUBLIC_API_URL` remains a
backward-compatible fallback, but new deployments should use the server-only
`BACKEND_API_URL` variable.

On the backend, configure the exact Vercel origin:

```text
FRONTEND_URL=https://your-project.vercel.app
ALLOWED_ORIGINS=https://your-project.vercel.app
COOKIE_DOMAIN=
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax
TRUST_PROXY=true
```

Leaving `COOKIE_DOMAIN` empty is intentional: Vercel and Render do not share a
parent domain. Requests are proxied through the frontend origin instead.

## Docker deployment

The image uses Next.js standalone output, runs as an unprivileged user, and
contains only the standalone server, static output, and public assets.

```bash
docker build \
  --build-arg BACKEND_API_URL=https://your-api.example.com \
  --build-arg VCS_REF="$(git rev-parse HEAD)" \
  -t verith-frontend .

docker run --rm -p 3000:3000 verith-frontend
```

`BACKEND_API_URL` is a build argument because the Next.js rewrite is compiled
into the application. Rebuild the image when the backend origin changes. The
container exposes port `3000`, includes a liveness health check, responds to
`SIGTERM`, and runs `node server.js` from the standalone build.

## Deployment relationship

Deployments are independent:

| Application | Repository | Normal deployment |
| ----------- | ---------- | ----------------- |
| Frontend | `mannycodes-j/Verith` | Vercel or frontend container |
| Backend | `samscript18/verith-be` | Render or backend container |

Deploying one repository does not deploy the other. When an API contract or
environment origin changes, redeploy both applications as appropriate.
