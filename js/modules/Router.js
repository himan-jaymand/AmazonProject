// document.addEventListener("click", (e) => {
//   const { target } = e;
//   if (!target.matches("nav a")) return;
//   e.preventDefault();
//   handleRoute();
// });

// import { render } from './renderer.js';
// import { NotFound } from "../views/notFound.js";

// js/router/Router.js

import { render } from "./renderer.js";

const routes = [
  // note: the project contains `RigesterView.js` (typo) — point the router to that file
  {
    path: "#/register",
    view: () => import("../Layout/views/auth/RigesterView.js"),
  },
  { path: "#/home", view: () => import("../Layout/views/main/Home.js") },
  { path: "#/login", view: () => import("../Layout/views/auth/Login.js") },
  { path: "#/product", view: () => import("../Layout/views/Product.js") },
  { path: "#/checkout", view: () => import("../Layout/views/Checkout.js") },
  { path: "#/cart", view: () => import("../Layout/views/cartView.js") },
];

// گرفتن کوئری پارامترها
function parseQuery(queryString) {
  const params = {};
  queryString?.split("&").forEach((pair) => {
    const [key, val] = pair.split("=");
    params[key] = decodeURIComponent(val || "");
  });
  return params;
}

function parseRoute(hash) {
  const [path, query] = hash.split("?");
  return {
    path,
    params: parseQuery(query),
  };
}

export function initRouter(mountSelector, store) {
  const mountEl = document.querySelector(mountSelector);
  if (!mountEl) throw new Error("mount element not found");

  async function handleRoute() {
    const hash = location.hash || "#/home";
    const { path, params } = parseRoute(hash);

    let route = routes.find((r) => r.path === path);

    // اگر نبود → NotFound
    if (!route) {
      mountEl.innerHTML = "<h2>404 - Not Found</h2>";
      return;
    }

    // اگر guard داشت (مثل نیاز به لاگین)
    if (route.guard === "auth" && !localStorage.getItem("token")) {
      location.hash = "#/login";
      return;
    }

    try {
      const module = await route.view();

      // Support multiple view export styles used across the repo:
      // - module.render(params, store)  (preferred)
      // - module.default(params, store) (common here: default export returns element)
      // - module (if it directly exports an HTMLElement)
      let viewEl;
      if (module && typeof module.render === "function") {
        viewEl = await module.render(params, store);
      } else if (module && typeof module.default === "function") {
        // call default export; some modules return an element directly
        viewEl = await module.default(params, store);
      } else if (module && module instanceof HTMLElement) {
        viewEl = module;
      } else {
        // try to find any named export that is a render function (e.g., export function Home)
        const fn = Object.values(module).find((v) => typeof v === "function");
        if (fn) {
          viewEl = await fn(params, store);
        } else {
          throw new Error("Unsupported view module format");
        }
      }

      render(mountEl, viewEl);
    } catch (err) {
      console.error("router error:", err);
      mountEl.innerHTML = "<h2>Error loading page</h2>";
    }
  }

  return {
    start() {
      window.addEventListener("hashchange", handleRoute);
      handleRoute(); // render initial route
    },
  };
}

export const Router = {
  navigate(path) {
    location.hash = path.startsWith("#") ? path : `#${path}`;
  },
};
