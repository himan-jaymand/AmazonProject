// این رشته HTML شامل ID های لازم برای اتصال JS است: cart-count و user-greeting-text
// const LOGO_SRC = './assets/Images/amazon_logo.png';
// const LOCATION_ICON_SRC = './assets/Images/location_icon.png';
// const CART_ICON_SRC = './assets/Images/cart_icon.png';
// const DROPDOWN_ICON_SRC = './assets/Images/dropdown_icon.png';

export function Header() {
  //   const state = store.getState();

  // ساخت ریشه هدر
  const header = document.createElement("div");
  header.className = "header";

  header.innerHTML = `
  <div class="logo">
         <a href="#/home"><img src="../assets/Images/icon/amazon_logo.png"></img></a>
     </div>
   
    <div class="country liBorder">
       <img src="../assets/Images/icon/location_icon_dark.png" alt="1" class="location" width="20">
     
         <div class="nav-country-name">
            <p>Deliver to</p>
            <h4>United kingdom</h4>
        </div>
   </div>
     <div class="search-bar-container" liBorder>
          <button>All  <img src="../assets/Images/icon/dropdown_icon.png" alt="2" height="12px"></button>
          
            <input type="text"  placeholder="Search Amazon">
            <i class='bx  bx-search'>0</i>    
        </div>  

        <div class="nav-links">
           <div class="nav-languge liBorder">
             <img src="../assets/Images/flags/us_flag.png" alt="" width="25">
              <p>EN</p>
             <img src="../assets/Images/icon/dropdown_icon.png" alt="dropdown" height="8px" >
           </div>   

           <div class="nav-signIn liBorder">
            <a href="#/register">
             <p>Hello</p> 
               <h4>Account & List <img src="../assets/Images/icon/dropdown_icon.png" alt="dropdown" width="8px"></h4>
            </a> 
           </div>

           <div class="return liBorder">
             <p>Returns</p>
              <h4>& Orders </h4></a>
            </div>
             <div class="cart-view liBorder">
                <span class="cart-count-badge">0</span>  
              <a href="#/cart" class="cart-icon-wrapper">
                  <img src="../assets/Images/icon/cart_icon.png" alt="cartt" width="45px" >
              </a>
            </div>
        </div>
      </div>

`;
  // ۱. تابع برای آپدیت کردن عدد روی آیکون سبد خرید
  function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-count-badge");
    if (!cartBadge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // جمع زدن تمام تعدادها:
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartBadge.textContent = totalItems;

    // مخفی کردن نشانگر اگر سبد خالی بود
    cartBadge.style.display = totalItems > 0 ? "block" : "none";
  }

  // Named handler for cleanup
  const handleCartUpdate = () => updateCartBadge();

  // ۲. ثبت listeners بعد از اینکه element در DOM قرار گیرد
  // Check if DOM is already loaded, otherwise wait
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleCartUpdate, {
      once: true,
    });
  } else {
    // DOM is already loaded, update immediately
    updateCartBadge();
  }

  // ۳. گوش دادن به رویداد اختصاصی برای آپدیت آنی
  window.addEventListener("cartUpdated", handleCartUpdate);

  // Store reference to handler on header for cleanup
  header._handleCartUpdate = handleCartUpdate;

  return header;
}
