export function Checkout() {
  const cartItems = [
    {
      id: 1,
      name: "VISA",
      data: "visa",
      imagePath: "../assets/images/icon/carticon/visa.png",
    },
    {
      id: 2,
      name: "MasterCard",
      data: "mastercard",
      imagePath: "../assets/images/icon/carticon/mastercard.png",
    },
    {
      id: 3,
      name: "American Express",
      data: "amex",
      imagePath: "../assets/images/icon/carticon/visa2.png",
    },
    {
      id: 4,
      name: "PayPal",
      data: "paypal",
      imagePath: "../assets/images/icon/carticon/paypal.png",
    },
  ];
  const productData = {
    id: 1,
    name: "Sample Product",
    price: 29.99,
    quantity: 2,
  };

  const userData = {
    id: "200123",
    name: "John Doe",
    address: "123 Main St, Anytown, USA",
    paymentMethod: "Visa ",
    cartNumber: "5894 **** 4598 5879",
  };

  // Note: DOM elements for the custom selector are created below inside `checkout.innerHTML`.
  // We'll query them from the `checkout` element after the HTML is inserted.

  // انتخاب گزینه
  // options.forEach(option => {
  //   option.addEventListener('click', () => {
  //     const val = option.getAttribute('data-value');
  //     const img = option.getAttribute('data-img');
  //     const text = option.querySelector('span').innerText;

  //     // به روزرسانی هدر
  //     document.getElementById('selectedCardImg').src = img;
  //     document.getElementById('selectedCardName').innerText = text;

  //     // به روزرسانی مقدار مخفی
  //     hiddenInput.value = val;

  //     // بستن دراپ داون
  //     selector.classList.remove('open');
  //   });
  // });

  // // بستن با کلیک به بیرون
  // window.addEventListener('click', (e) => {
  //   if (!selector.contains(e.target)) {
  //     selector.classList.remove('open');
  //   }
  // });

  const checkout = document.createElement("div");
  checkout.classList = "checkout-view";
  checkout.innerHTML = `
          <head class="checkout-head">
      <ul class="tabmenu">
        <li class="selected">
          <img
            class="checkout-head-logo"
            src="../assets/Images/icon/amazon_logo_dark.png"
            alt="logo"
          />
        </li>
            <li><p>Checkout(  )</p></li>
        <li>
          <img
            class="checkout-head-luck"
            src="../assets/Images/icon/user.png"
            alt="luck"
          />
        </li>
      </ul>
    </head>

<div class="main-checkout">
    
<section class="chk-columns">

  <div class="adrs-line">
    <div class="adrs-title">
      <h3>Shipping addres</h3>
    </div>

    <div class="addres">
       <p>${userData.name}</p>
       <p>${userData.id}</p>
       <p>${userData.address}</p>
      <p><a href="">Add delivery instruction</a></p>
    </div>

       <a class="adrs-btn">
        <button>change</button>
       </a>

    </div>

<hr>

  <div class="pymnt-line">

   <div class="pymnt-title">
     <h3>Payment method</h3>
   </div>

 <div class="cart-info">

   <div class="cart-method-container">
<div class="card-selector" id="cardSelector">
  <input type="hidden" name="card_type" id="cardTypeValue" value="visa">

  <div class="selector-header">
    <div class="current-card">
      <img src="${cartItems[0].imagePath}"   data-img="${cartItems[0].data}" alt="Visa" id="selectedCardImg">
      <span id="selectedCardName">Visa Card</span>
    </div>
    <span class="arrow">▼</span>
  </div>

  <ul class="selector-options">
    <li class="option-item" data-value="visa" data-img="${cartItems[1].data}">
      <img src="${cartItems[1].imagePath}" alt="Visa">
      <span>Visa Card</span>
    </li>
    <li class="option-item" data-value="mastercard" data-img="${cartItems[2].data}">
      <img src="${cartItems[2].imagePath}" alt="Mastercard">
      <span>Mastercard</span>
    </li>
    <li class="option-item" data-value="paypal" data-img="${cartItems[3].data}">
      <img src="${cartItems[3].imagePath}" alt="PayPal">
      <span>PayPal</span>
    </li>
  </ul>
</div>
        <span>${userData.paymentMethod}</span>
        <p>${userData.cartNumber}</p>
    </div>
      
    <div class="billing-addres">
        <p>Billing addres:</p>
       <span>${userData.address}</span>
    </div>
      
    <div class="gift-code-card">
      <div class="inpt-gift-crd">
          <select>
            <option value="gift-code">Add a gift code or promption code or vocher</option>
            <option value="promotion-code">Promotion Code</option>
            <option value="voucher">Voucher</option>
          </select>

      </div>
      
        <div class="verify-container">
           <input type="text" placeholder="Enter gift code or promotion code or voucher" />
           <button>Apply</button>
         </div>
    </div>
 </div>
</div>
        <a class="adrs-btn">
        <button>change</button>
        </a>
</div>

 <hr>
</section>


<section class="ordr">
  <div class="ordr-container">
     
    <div class="ordr-head">
      <button>Use these delivery options</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
        consectetur distinctio accusantium deleniti, velit.
      </p>
    </div>

    <hr />

       <h3>Order Symmary</h3>
    <div class="ordr-sum">
     <div class="-price-container">
      <div class="price">
        <p>Items(${productData.quantity})</p>
        <label for="">${productData.price}</label>
       </div>
      <div class="price">
        <p>Services()</p>
        <label for="">${productData.price}</label>
      </div>
      <div class="price">
        <p>Shipping & handling</p>
        <label for="">${productData.price}</label>
      </div>
      <div class="price">
        <p>Total before tax:</p>
        <label for="">${productData.price}</label>
      </div>
       <hr />
      <div class="ordr-total">
        <div class="price">
          <h1>Order total:</h1>
          <label for="">${productData.price}</label>
        </div>
    </div>
    <hr />
    <p class = "how-shipping-calculated"><a href="">How are shipping costs calculated?</a></p>
      </div>
    </section>
</div>


          
          `;
  // Initialize the custom card selector within the created element
  const selector = checkout.querySelector("#cardSelector");
  if (selector) {
    const header = selector.querySelector(".selector-header");
    const options = selector.querySelectorAll(".option-item");
    const hiddenInput = selector.querySelector("#cardTypeValue");
    const selectedImg = selector.querySelector("#selectedCardImg");
    const selectedName = selector.querySelector("#selectedCardName");

    header &&
      header.addEventListener("click", () => {
        selector.classList.toggle("open");
      });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const val = option.getAttribute("data-value");
        const imgSrc = option.querySelector("img")?.getAttribute("src");
        const text = option.querySelector("span")?.innerText || "";

        if (selectedImg && imgSrc) selectedImg.src = imgSrc;
        if (selectedName) selectedName.innerText = text;
        if (hiddenInput) hiddenInput.value = val;

        selector.classList.remove("open");
      });
    });

    // Close the selector when clicking outside
    document.addEventListener("click", (e) => {
      if (!selector.contains(e.target) && selector.classList.contains("open")) {
        selector.classList.remove("open");
      }
    });
  }

  return checkout;
}
