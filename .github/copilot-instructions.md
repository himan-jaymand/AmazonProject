## Copilot instructions — Amazon clone (vanilla JS + Express/MongoDB)

Quick summary

- Frontend: vanilla ES modules single-page app (no bundler). Hash-based router mounts views into `#main`.
- Backend: Express + Mongoose REST API under `backend/`.

Run (development)

- Backend (local):
  - cd into `backend/`
  - install: `npm install`
  - run: `npm run dev` (nodemon) or `npm start`
  - Important env vars: `MONGO_URI` (Mongo connection), `PORT` (optional). If none exists, create a `.env` with placeholders.
- Frontend (local): serve project root (no build). Examples:
  - `python -m http.server 8000`
  - Use VS Code Live Server or any static file server.

What an AI coder needs to know (concrete, actionable)

- Router: `js/modules/Router.js` implements a minimal hash router and lazy-imports view modules. Views are ES modules that default-export a function returning a DOM node (see `js/views/RigesterView.js` and `js/views/Product.js`). When editing views keep imports relative (no bundler).
- State: `js/modules/Store.js` is a closure-based pub/sub store. It's initialized from `main.js` and exposed as `window.__APP_STORE__` for debugging. Cart persistence uses `localStorage.amazon_cart_items`.
- API layer: `js/services/Api.js` is a small wrapper around fetch. Verify `ApiService.baseUrl` is set to `http://localhost:3000` for local work. The service adds `Authorization: Bearer ${localStorage.authToken}` when `localStorage.authToken` exists. Use ApiService.get/post/put/delete patterns in frontend modules.
- Auth: `js/services/Auth.service.js` contains the auth glue (login/register/logout). Persist tokens on successful auth to `localStorage.authToken`. Backend token helper: `backend/module/generateToken.js`.

Project-specific conventions and gotchas

- Do NOT rename files/folders with intentional typos — e.g. `RigesterView.js`, `contrrollers/`, `middlware/`, `utilis/`. Other code references rely on these names.
- Header/Nav/Footer are mounted once (in `main.js`) and do not auto-subscribe to the store. If you need dynamic UI updates (cart count, user state), call `store.subscribe()` inside those components.
- Router does not parse query parameters — views should read and parse `location.hash` (e.g., `#/product?id=...`).
- Preserve Persian/Farsi comments found across files; they contain domain/design intent and debugging hints.

Integration points to inspect (high value)

- Frontend focal files:

  - `main.js` — app bootstrap and component mounting
  - `js/modules/Router.js` — hash router and view loader
  - `js/modules/Store.js` — central store, cart persistence
  - `js/services/Api.js` — HTTP layer (baseUrl + auth header)
  - `js/services/Auth.service.js` — auth flows and token persistence
  - `js/Layout/Header.js`, `js/Layout/Nav.js` — UI components that should subscribe to store for dynamic state
  - `js/views/*` — view modules. Example: `js/views/RigesterView.js`, `js/views/Product.js`

- Backend focal files:
  - `backend/server/server.js` — server entry
  - `backend/config/db.js` — mongoose connection setup (uses `MONGO_URI`)
  - `backend/contrrollers/*` — controllers pattern (note folder name typo `contrrollers`)
  - `backend/module/*` — Mongoose models and helpers (e.g., `User.js`, `Product.js`, `Order.js`, `generateToken.js`)

Concrete starter tasks (examples you can implement immediately)

- Wire auth: implement missing pieces in `js/services/Auth.service.js` (login/register/logout) and ensure `localStorage.authToken` is set on success so `ApiService` sends it.
- Product backend: inspect and complete `backend/contrrollers/productController.js` following patterns in other controllers.
- Header dynamic state: make `js/Layout/Header.js` subscribe to the store to display cart count and logged-in user.

Small code examples (copy-paste ready)

- Lazy-load a view:

  - const m = await import('../views/RigesterView.js'); const el = m.default(); document.querySelector('#main').appendChild(el);

- API call using ApiService (frontend):
  - await ApiService.get('products');
  - await ApiService.post('auth/login', { email, password }); // returns token -> store in localStorage.authToken

Notes and constraints

- No bundlers: keep ES module paths relative and consistent.
- Do not rename intentionally misspelled folders/files — many imports reference them verbatim.
- Frontend and backend run separately. Frontend expects backend at `http://localhost:3000` by default.

If anything here is unclear or you want more detail on any file or workflow, tell me which area to expand and I’ll iterate.
