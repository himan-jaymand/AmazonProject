export default function Product(data) {
  const productData = {
      id: data.id || 101,
    title: data.title || "...",
    price: data?.price || 203.99,
    imagePaths: data?.path || [
      "../assets/Images/tech & gaming/imgi_289_710GQJJHx2L._AC_SY400_.jpg",
      "../assets/Images/tech & gaming/imgi_289_710GQJJHx2L._AC_SY400_.jpg",
      "../assets/Images/tech & gaming/imgi_289_710GQJJHx2L._AC_SY400_.jpg",
      "../assets/Images/tech & gaming/imgi_289_710GQJJHx2L._AC_SY400_.jpg",
      "../assets/Images/tech & gaming/imgi_289_710GQJJHx2L._AC_SY400_.jpg",
    ],
  };
  const product = document.createElement("div");
  product.classList = "product";
  // fall back to local productData if caller didn't pass `data`
  const imageList =
    data && Array.isArray(data.imagePaths)
      ? data.imagePaths
      : productData.imagePaths;
  const imagesHtml = imageList
    .map(
      (path) => `
    <div class="img-wrapper active ">
      <img src="${path}" alt="${
        (data && data.title) || productData.title
      }" class="gallery-thumb" />
    </div>
  `
    )
    .join("");

  product.innerHTML = `
<div class="product-page">

 <section class="product-gallery" aria-label="Product Images">
  <aside class="thumbnails-container">
    <ul class="thumbnail-list ">
      <li class="thumb-item ">
       ${imagesHtml}
      </li>
    </ul>
  </aside>


  
    <div class="main-viewer">
    <figure class="zoom-wrapper" id="main-image-zoom">
      <img src="${productData.imagePaths[0]}" alt="${
    productData.title
  }" class="main-image">
    </figure>
  </div>
        </section>

    <section>


      <div class="product-info-container">
       <header class="product-header">
        <a href="#" class="brand-link">Brand: WDIRARA</a>
          <h1 class="product-title">WDIRARA Women's Square Neck Puff Short Sleeve Cut Out Waist Tie Back Flared A Line Dress</h1>
      <div class="rating-summary">
         <span class="stars">★★★★☆</span>
         <a href="#" class="rating-count">70 ratings</a>
    </div>
  </header>  
      <hr>
        <span class="currency">SAR</span>
         <span class="amount">${data.price}</span>
        <span class="decimals">14</span>
    </div>

   <p class="vat-note">All prices include VAT.</p>
    
    <div class="promo-badge">
      <span class="badge-green">Extra 20% off</span>
      <p>with meem credit cards. Use code: <strong>MEEM20</strong></p>
    </div>
    







    <section class="product-details">
    <div class="service-badges">
    <div class="badge-item">
      <img src="" alt="">
      <span>Electronic payment Only</span>
    </div>
    <div class="badge-item">
      <img src="" alt="">
      <span>30 days Returnable</span>
    </div>
    <div class="">
      <img src="" alt="">
      <span>Secure transaction</span>
    </div>
  </div>
</section>
  <hr>
  <section class="product-specs">
    <h2>Product details</h2>
    <dl class="specs-list">
      <dt>Material compostion</dt> <dd>99% Polyester, 1% Elastane</dd>
      <dt>Clousre type</dt> <dd>Pull On</dd>
      <dt>Neck style</dt> <dd>Scoop Neck</dd>
      <dt>Sleeve type</dt> <dd>Short Sleeve</dd>
    </dl>
  </section>
  <section class="product-description">
    <h2>About this item</h2>
    <ul class="feature-bullets">
      <li>Feature: square neck, cutout, puff sleeve, ruffle hem, tie back aline dress</li>
      <li>Fabric has some stretch, and it's soft and comfortable</li>
      <li>Suitable for daily wear, holidays, dating, vacation, weekend casual</li>
    </ul>
    <a href="#" class="see-more">See more</a>
  </section>
</article>
   </section>
   
<aside class="buy-box" aria-labelledby="price-info">
  
  <div class="price-container" id="price-info">
    <span class="currency">SAR</span><span class="amount">${Math.floor(
      productData.price
    )}</span>
    <span class="decimals">${
      (productData.price % 1).toFixed(2).split(".")[1]
    }</span>
  </div>

  <div class="delivery-info">
    <p><strong>SAR96</strong> delivery <strong>6-9 October</strong>.</p>
    <a href="#" class="details-link">Details</a>
  </div>

  <div class="location-picker">
    <i class="icon-location"></i>
    <a href="#">Delivery to Riyadh - Update Location</a>
  </div>

  <p class="stock-status">Usually ships within 4 to 5 days</p>

  <div class="intl-shipping">
    <span class="badge">International Shipping</span>
    <p>Ships from outside the KSA. <a href="#">Learn more</a></p>
  </div>

  <div class="quantity-wrapper">
    <label for="qtyselect">Quantity:</label>
    <select id="qtyselect" name="quantity">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  </div>

  <div class="actions">
    <button class="btn btn-primary btn-yellow">Add to Cart</button>
    <button class="btn btn-primary btn-orange">Buy Now</button>
    <span class="cart-count-badge" style="display:none; margin-left:8px; padding:2px 6px; background:#ff6f00; color:#fff; border-radius:12px; font-size:0.9rem;">0</span>
  </div>

  <div class="seller-details">
    <div class="detail-row">
      <span class="label">Ships from</span>
      <span class="value">Monatik LLC</span>
    </div>
    <div class="detail-row">
      <span class="label">Sold by</span>
      <span class="value"><a href="#">Monatik LLC</a></span>
    </div>
    <div class="detail-row">
      <span class="label">Payment</span>
      <span class="value">Secure transaction</span>
    </div>
  </div>

  <button class="btn btn-secondary">Add to List</button>

</aside>
      
    </section>
   
        </section>

    </div>
`;

  // // تابع کمکی برای اضافه کردن به سبد خرید
  //   const addToCartLogic = () => {
  //     const selectedQty = parseInt(qtyselect.value);
  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //     // بررسی تکراری بودن کالا
  //     const existingProductIndex = cart.findIndex(item => item.id === productData.id);

  //     if (existingProductIndex > -1) {
  //       // اگر کالا موجود بود، فقط تعداد را اضافه کن
  //       cart[existingProductIndex].quantity += selectedQty;
  //       cart[existingProductIndex].totalPrice = cart[existingProductIndex].quantity * productData.price;
  //     } else {
  //       // اگر کالا جدید بود، آبجکت جدید بساز
  //       cart.push({
  //         ...productData,
  //         quantity: selectedQty,
  //         totalPrice: selectedQty * productData.price
  //       });
  //     }

  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     console.log(`تعداد ${selectedQty} عدد از "${productData.title}" به سبد اضافه شد.`);
  //   };

  //   // رویداد دکمه Add to Cart
  //   product.querySelector(".btn-yellow").addEventListener("click", addToCartLogic);

  //   // رویداد دکمه Buy Now
  //   product.querySelector(".btn-orange").addEventListener("click", () => {
  //     addToCartLogic(); // ابتدا به سبد اضافه کن
  //     window.location.hash = "#/checkout"; // سپس به صفحه پرداخت برو
  //   });

  // داخل تابع handleAddToCart بعد از ذخیره در localStorage:
  // helper: update the visible cart count badge
  function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-count-badge");
    if (!cartBadge) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "inline-block" : "none";
  }

  // core add-to-cart logic
  function handleAddToCart(productData, quantity = 1) {
    try {
      console.log(
        "[handleAddToCart] Starting with productData:",
        productData,
        "quantity:",
        quantity
      );

      const qty = parseInt(quantity, 10) || 1;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("[handleAddToCart] Current cart:", cart);

      const idx = cart.findIndex((item) => item.id === productData.id);
      console.log("[handleAddToCart] Product index in cart:", idx);

      if (idx > -1) {
        cart[idx].quantity = (cart[idx].quantity || 0) + qty;
        cart[idx].totalPrice = cart[idx].quantity * (productData.price || 0);
        console.log(
          "[handleAddToCart] Updated existing product quantity to:",
          cart[idx].quantity
        );
      } else {
        const newItem = {
          id: productData.id,
          title: productData.title,
          price: productData.price,
          quantity: qty,
          totalPrice: qty * (productData.price || 0),
          imagePaths: productData.imagePaths || productData.path || [],
        };
        cart.push(newItem);
        console.log("[handleAddToCart] Added new product to cart:", newItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("[handleAddToCart] Cart saved to localStorage");

      updateCartBadge();
      window.dispatchEvent(new Event("cartUpdated"));
      console.log("[handleAddToCart] cartUpdated event dispatched");
    } catch (err) {
      console.error("[handleAddToCart] Error:", err);
    }
  }

  // expose update on load and custom event
  window.addEventListener("cartUpdated", updateCartBadge);
  document.addEventListener("DOMContentLoaded", updateCartBadge);

  // attach button listeners to buttons inside this product element
  const addBtn = product.querySelector(".btn-yellow");
  const buyBtn = product.querySelector(".btn-orange");
  const qtySelect = product.querySelector("#qtyselect");

  console.log(
    "[Product] Attaching handlers. addBtn:",
    addBtn,
    "buyBtn:",
    buyBtn,
    "qtySelect:",
    qtySelect
  );

  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("[Add to Cart] Clicked. ProductData:", productData);
      const qty = parseInt(qtySelect?.value, 10) || 1;
      console.log("[Add to Cart] Quantity:", qty);
      handleAddToCart(productData, qty);
      console.log("[Add to Cart] Handler complete");
    });
  }

  if (buyBtn) {
    buyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("[Buy Now] Clicked. ProductData:", productData);
      const qty = parseInt(qtySelect?.value, 10) || 1;
      console.log("[Buy Now] Quantity:", qty);
      handleAddToCart(productData, qty);
      console.log("[Buy Now] Navigating to checkout");
      window.location.hash = "#/checkout";
    });
  }

  // initialize badge when this view is created
  updateCartBadge();

  return product;
}
