export default function Cart(data) {
  const cartData = document.createElement("div");
  cartData.classList = "main-view";
  cartData.innerHTML = `
    <div class="container"> 
     <section class="main-cart">
        <div class="cart-header">
       <h1>Shopping Cart</h1>
       <span class="price-label">Price</span>
    </div>
    
    <hr>
    
    <article class="cart-item">
    <div class="item-image">
    <img src="../assets/images/dresswoman/dress-woman (6).jpg" alt="WDIRARA Women's Dress">
    </div>
    
    <div class="item-details">
    <h2 class="item-title">WDIRARA Women's Square Neck Puff Short Sleeve Cut Out Waist Tie Back Flared A Line Dress, Black, L</h2>
    <p class="stock-info">Usually ships within 4 to 5 days</p>
    <p class="seller-info">sold by: <a href="#">Monatik LLC</a></p>
    <p class="attr-info">Size: L</p>
    <p class="attr-info">Color: Black</p>
    
    <div class="item-actions">
          <select class="qty-select">
          <option>Qty: 1</option>
          <option>Qty: 2</option>
          </select>
          <span class="action-separator">|</span>
          <button class="link-btn">Delete</button>
          <button class="link-btn">Save for later</button>
          <button class="link-btn">Share</button>
          </div>
          </div>
          
          <div class="item-price">
          <strong>SAR 203.14</strong>
          </div>
          </article>

          <hr>

          <div class="subtotal-footer">
          Subtotal (1 item): <strong>SAR 203.14</strong>
          </div>
     </section>



          <aside class="cart-sidebar">
    <div class="summary-box">
      <p class="subtotal-text">Subtotal (1 item): <strong>SAR 203.14</strong></p>
      <button class="btn-proceed">Proceed to Buy</button>
    </div>

    <div class="recommendations">
      <h3>Customers Who Bought Items in Your Recent History Also Bought</h3>
      
      <div class="rec-item">
        <img src="rec1.jpg" alt="">
        <div class="rec-info">
          <a href="#">Trendyol womens Seasonal Fashion Dress...</a>
          <div class="stars">★★★★☆ 43</div>
          <p class="rec-price">SAR 69.70</p>
          <button class="btn-outline">See all buying options</button>
          </div>
          </div>
          </aside>
          </div>
            <div class="slider-wrapper">
          <button class="nav-btn prev" aria-label="Previous">&#10094;</button>
          <button class="nav-btn next" aria-label="Next">&#10095;</button>
          
          <ul class="product-track">
  
          
          <li class="product-card">
          <div class="img-box">
           <img src="../assets/images/dresswoman/dress-woman (6).jpg" alt="WDIRARA Women's Dress">
          </div>
          <a href="#" class="product-name">ZESICA Women's 2023 Summer Short Puff Sleeve...</a>
          <div class="rating">
          <span class="stars">★★★★☆</span> <span class="count">970</span>
          </div>
          <p class="price"><span class="cur">SAR</span> 374.56</p>
          </li>
          
          </ul>
          </div>
          
          <div class="carousel-footer-line">
          <span class="cross-icon">✕</span>
          </div>
          `;
  return cartData;
}
