import { Home } from "../pages/Home/Home.js";
import { Guide } from "../pages/Guide/Guide.js";
import { Offers } from "../pages/Offers/Offers.js";
import { Login, loginEvents, record } from "../pages/Login/Login.js";
import { Stores } from "../pages/Stores/Stores.js";

export const routes = {
  "/home": Home,
  "/guide": Guide,
  "/offers": Offers,
  "/login": Login,
  "/searchProduct": Stores
};

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

window.navigateTo = navigate;

export function router() {
  const path = window.location.pathname;
  
  const isAuthenticated = localStorage.getItem("userActive") === "true";

  if (path === "/offers" && !isAuthenticated) {
    window.navigateTo("/login"); 
    return;
  }

  const view = routes[path] || routes["/home"];
  document.getElementById("app").innerHTML = view();

  if (path === "/login") {
    loginEvents();
    record();
  }
}

window.addEventListener("popstate", router);
router();