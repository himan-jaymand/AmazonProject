import { initRouter } from "./frontend/modules/Router.js";
import { Header } from "./frontend/Layout/views/head/Header.js";
import { Nav } from "./frontend/Layout/views/head/Nav.js";
import { initStore } from "./frontend/modules/Store.js";
import { Footer } from "./frontend/Layout/views/Footer.js";

const store = initStore();
window.__APP_STORE__ = store; // debugging only

// Mount static header and nav into #app
const mainroot = document.getElementById("mainroot");
if (!mainroot) throw new Error("#mainroot not found in index.html");

let headerEl = null;
try {
  headerEl = Header ? Header() : null;
  if (headerEl) mainroot.appendChild(headerEl);
} catch (e) {
  console.warn("Footer render failed:", e.message);
}

let navEl = null;
try {
  navEl = Nav ? Nav() : null;
  if (navEl) mainroot.appendChild(navEl);
} catch (e) {
  console.warn("nav render failed", e.message);
}
// let sliderEl = null;
// try {
//   sliderEl = Slider ? Slider() : null;
//   if (sliderEl) mainroot.appendChild(sliderEl);
// } catch (e) {
//   console.warn("sliderEl render failed:", e.message);
// }
// Main area for Router (pages mount here)
const mainRoot = document.createElement("main");
mainRoot.className = "container";
mainRoot.id = "main";
mainroot.appendChild(mainRoot);

// Footer (append AFTER router so it doesn't get cleared by renderer)
let footerEl = null;
try {
  footerEl = Footer ? Footer() : null;
  if (footerEl) mainroot.appendChild(footerEl);
} catch (e) {
  console.warn("Footer render failed:", e.message);
}

// Start the router to handle navigation
initRouter("#main", store).start();
