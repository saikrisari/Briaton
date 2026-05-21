import { openBasket } from "./components/basket.js";
import { openFaq } from "./components/faq.js";
import { validate } from "./components/form.js";
import { openLocationList } from "./components/locationList.js";
import { openMainMenu } from "./components/mainMenu.js";
import { renderCatalog } from "./components/renderCatalog.js";
import { initSlider, renderProductsOfDay } from "./components/slider.js";

window.addEventListener("DOMContentLoaded", () => {
  openMainMenu();
  openLocationList();
  renderCatalog();
  openBasket();
  openFaq();
  renderProductsOfDay();
  initSlider();
  validate();
});
