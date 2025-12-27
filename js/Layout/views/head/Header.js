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
           
            <div class="contury">
               <img src="../assets/Images/icon/location_icon_dark.png" alt="1" class="location" width="20">
             
                 <div class="nav-contury-name">
                    <p>Deliver to</p>
                    <h4>United kingdom</h4>
                </div>
           </div>

             <div class="search-bar-container">
                  <button>All  <img src="../assets/Images/icon/dropdown_icon.png" alt="2" height="12px"></button>
                  
                    <input type="text"  placeholder="Search Amazon">
                    <i class='bx  bx-search'></i>    
                </div>  

            <nav class="nav-links">
                   <div class="nav-languge">
                     <img src="../assets/Images/flags/us_flag.png" alt="" width="25">
                     <p>EN</p>
                     <img src="" alt="" height="8px" >
                   </div>

          <a href="#/register">
            <div class="nav-text">
               <p>Hello</p> 
               <h4>Account & List <img src="../assets/Images/icon/" alt="" width="8px"></h4>
            </div>
          </a>

        <div class="nav-text">
            <p>Returns</p>
            <h4>& Orders </h4>
        </div>
        <span class="cart-count-badge">0000</span>  

        <a href="#/cart" class="cart-icon-wrapper">
        <img src="../assets/Images/icon/cart_icon.png" alt="cartt" width="45px" >
        </a>
            </nav>

        `;
        // ۱. تابع برای آپدیت کردن عدد روی آیکون سبد خرید
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

// ۲. گوش دادن به رویداد اختصاصی برای آپدیت آنی
window.addEventListener("cartUpdated", updateCartBadge);

// ۳. اجرای اولیه در هنگام لود سایت
document.addEventListener("DOMContentLoaded", updateCartBadge);
  return header;
}
