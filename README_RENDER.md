Render deployment notes

- This repository runs a Node/Express API that serves a built React client from `client/build`.
- The server expects the frontend to be built before start; the provided `render.yaml` runs `npm ci && npm run build` as the build step.

How Render will deploy
- Build command: `npm ci && npm run build` (root `package.json` will run the client build)
- Start command: `npm start` (runs `node server.js`)

Required environment variables (set these in the Render dashboard for the service):
- `MONGODB_URI` — connection string for MongoDB
- `JWT_SECRET` — JWT signing secret
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — mailer credentials

Notes
- The root `package.json` `start` script was simplified to `node server.js` so Render doesn't need `cross-env` in production.
- If you prefer to host the frontend as a separate static site on Render, create a separate static site service pointing to `client/build` instead.

Next steps
- Connect the Git repo to Render and import the `render.yaml` during service creation, or create a new Web Service and copy the build/start commands above.
