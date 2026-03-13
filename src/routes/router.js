import { Home } from "../pages/Home/Home.js";
import { Guide } from "../pages/Guide/Guide.js";
import { Offers } from "../pages/Offers/Offers.js";
import { Login, loginEvents, record } from "../pages/Login/Login.js";
import { Stores, initStores } from "../pages/Stores/Stores.js";

export const routes = {
  "/home": Home,
  "/guide": Guide,
  "/offers": Offers,
  "/login": Login,
  "/searchProduct": Stores // Asegúrate de que este sea el link correcto
};

// Navegación por clicks en enlaces data-link
document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigateTo(link.getAttribute("href"));
  }
});

function navigate(route) {
  window.history.pushState({}, "", route);
  router();
}

window.navigateTo = navigate;

export function router() {
  const path = window.location.pathname;
  const appContainer = document.getElementById("app");
  
  // Guard de seguridad para Ofertas
  const isAuthenticated = localStorage.getItem("userActive") === "true";
  if (path === "/offers" && !isAuthenticated) {
    navigateTo("/login"); 
    return;
  }

  // Renderizado de la vista
  const view = routes[path] || routes["/home"];
  appContainer.innerHTML = view();

  // Inicialización de eventos específicos por ruta
  switch (path) {
    case "/login":
      loginEvents();
      record();
      break;
    case "/searchProduct":
      initStores(); // Activa toda la lógica de ZYNTRA
      if (typeof record === "function") record();
      break;
  }
}

window.addEventListener("popstate", router);
router(); // Carga inicial