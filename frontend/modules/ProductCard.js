// js/components/ProductCard.js

import { CartModule } from "./Cart.js";

export function setupProductCardEvents(productId) {
  const addButton = document.getElementById(`add-to-cart-${productId}`);

  if (addButton) {
    addButton.addEventListener("click", (event) => {
      event.preventDefault();
      // فراخوانی منطق کسب‌وکار
      CartModule.addToCart(productId, 1);
    });
  }
}
l