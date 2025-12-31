## Copilot instructions — Amazon clone (vanilla JS + Express/MongoDB)

Quick summary

- Frontend: vanilla ES modules single-page app (no bundler). Hash-based router mounts views into `#main`.
- Backend: Express + Mongoose REST API under `backend/server/`.

Run (development)

- Backend (local):
  - cd into `backend/`
  - install: `npm install`
  - run: `npm run dev` (nodemon) or `npm start`
  - Important env vars: `MONGO_URI` (Mongo connection), `PORT` (server default in code is 5502). Create a `.env` in `backend/` when missing.
- Frontend (local): serve project root (no build). Examples:
  - `python -m http.server 8000`
  - Use VS Code Live Server or any static file server.

What an AI coder needs to know (concrete, actionable)

- Router: `js/modules/Router.js` is a lightweight hash router that lazy-imports view modules from `js/Layout/views/...`. Views use several export styles: preferred `export async function render(params, store)`, common `export default (...) => HTMLElement`, or plain named function exports. When editing views keep imports relative (no bundler).
- State: `js/modules/Store.js` (exported as `initStore()` in `main.js`) is a closure-based store. Cart persistence key: `localStorage.amazon_cart_items`. Header and other layout components subscribe with `store.subscribe(fn)`.
- API layer: `js/services/Api.js` centralizes fetch calls. Default base URL is set in the file (currently `http://localhost:3000`) — note: backend server default PORT in `backend/server/server.js` is 5502. Either align the API_BASE_URL or set the backend PORT to 3000 in `.env` for local development. ApiService adds `Authorization: Bearer ${localStorage.getItem('authToken')}`.
- Auth: `js/services/Auth.service.js` contains multiple / overlapping implementations (see `AuthModule` and `AuthService` in the file). Endpoints used are inconsistent (some call `auth/login`, others `/api/auth/login`). Audit this file before making changes; prefer calling `ApiService.post('auth/login', payload)` and storing token under a consistent key (recommend `authToken`).

Project-specific conventions and gotchas

- Do NOT rename files/folders with intentional typos — e.g. `RigesterView.js`, `contrrollers/`, `middlware/`, `utilis/`. Many imports and routes reference these exact names.
- No bundler: all frontend imports must be relative paths and work from the served root. Avoid absolute or Node-style imports in browser code.
- Multiple token keys are used across code (`token`, `authToken`, `AUTH_TOKEN_KEY`, `TOKEN_KEY`). Standardize to `authToken` when fixing auth flows; Router route guards currently check `localStorage.getItem('token')` (see `js/modules/Router.js`).
- Router parse behavior: `parseRoute` in `Router.js` splits on `?` and passes parsed params object to view modules — prefer `render(params, store)` signature.
- DOM mount points: `mainroot` (container) and `#main` (router mount). Header/Nav/Footer are mounted once in `main.js`; they must subscribe to store if they need dynamic updates.

Integration points to inspect (high value)

- Frontend focal files:

  - `main.js` — bootstrap, mounts Header/Nav/Footer and starts router
  - `js/modules/Router.js` — hash router, lazy imports, route parsing
  - `js/modules/Store.js` — central store and localStorage cart persistence
  - `js/services/Api.js` — HTTP layer (adjust API_BASE_URL to match backend)
  - `js/services/Auth.service.js` — contains duplicate/contradictory auth functions; audit before edits
  - `js/Layout/views/head/Header.js`, `js/Layout/views/head/Nav.js` — layout components that should subscribe to store for dynamic state
  - `js/Layout/views/*` — page/view modules (many export styles)

- Backend focal files:
  - `backend/server/server.js` — server entry, default PORT = 5502, CORS origin controlled by `ALLOWED_ORIGINS` env
  - `backend/server/config/db.js` — MongoDB connect helper (uses `MONGO_URI`)
  - `backend/contrrollers/*` — controllers pattern (note folder name typo `contrrollers`)
  - `backend/module/*` — Mongoose models and helpers (e.g., `User.js`, `Product.js`, `Order.js`, `generateToken.js`)

Concrete starter tasks (examples you can implement immediately)

- Align API base URL: update `js/services/Api.js` API_BASE_URL or set backend `PORT` to 3000 in `backend/.env` so frontend calls succeed.
- Clean up `js/services/Auth.service.js`: remove duplicated implementations, pick one consistent endpoint namespace (`auth/*` vs `/api/auth/*`), and standardize token storage to `authToken`.
- Make Header/Nav subscribe to the store to display cart count and user name (see `initStore()` and `store.subscribe`).

Small code examples (copy-paste ready)

- Lazy-load a view (Router style):

  const m = await import('../Layout/views/auth/RegisterView.js');
  const el = (typeof m.render === 'function') ? await m.render(params, store) : m.default?.(params, store);
  document.querySelector('#main').appendChild(el);

- API call using ApiService (frontend):
  await ApiService.get('products');
  const r = await ApiService.post('auth/login', { email, password }); // expect { token, user }
  localStorage.setItem('authToken', r.token);

Notes and constraints

- No bundlers: keep ES module paths relative and consistent.
- Preserve intentionally misspelled files/folders — renaming will break imports.
- Frontend and backend run separately. Either set `API_BASE_URL` in `js/services/Api.js` to `http://localhost:5502` or set `PORT=3000` in `backend/.env` for the default frontend expectation.

If any part of the app behaves unexpectedly, start by:

1. Verifying backend is running: `cd backend && npm run dev` (ensure `.env` includes `MONGO_URI`).
2. Serving frontend root (e.g., `python -m http.server 8000`) and open `http://localhost:8000`.
3. Check browser console/network for 4xx/5xx errors — most failures are API base-url or token key mismatches.

If you want, I can further tighten these instructions (standardize token key, fix `Auth.service.js` duplicates, or add simple unit tests). What should I expand or change?
