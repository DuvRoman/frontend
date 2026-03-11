import { Home } from "../pages/Home/Home.js";
import { Guide } from "../pages/Guide/Guide.js";
import { Offers } from "../pages/Offers/Offers.js";
import { Login, loginEvents } from "../pages/Login/Login.js";
import { Stores } from "../pages/Stores/Stores.js";

export const routes = {
  "/home": Home,
  "/guide": Guide,
  "/offers": Offers,
  "/login": Login,
  "/searchProduct": Stores
};

// Detectar clicks en links SPA
document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});

function navigate(route) {
  window.history.pushState({}, "", route);
  router();
}

// ✅ Exponer globalmente para usar en onclick="navigateTo(...)"
window.navigateTo = navigate;

export function router() {
  const path = window.location.pathname;
  const view = routes[path] || routes["/home"];

  document.getElementById("app").innerHTML = view();

  if (path === "/login" && loginEvents) {
    loginEvents();
  }
}

window.addEventListener("popstate", router);
router();