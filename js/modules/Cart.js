// // js/modules/Cart.js

import { Router } from "./Router.js";
// import { ApiService } from '../services/Api.js';
// import { updateCartUI } from '../components/Header.js'; // فرض کنید کامپوننت هدر این تابع را دارد

// const STORAGE_KEY = 'localCart';
// let cartItems = [];

// // ۱. بارگذاری وضعیت سبد خرید از Local Storage یا API
// function loadCart() {
//     // ترجیحاً از API بگیرید تا بین دستگاه‌ها همگام باشد، اگر نه از Local Storage
//     const localData = localStorage.getItem(STORAGE_KEY);
//     cartItems = localData ? JSON.parse(localData) : [];
// }

// // ۲. ذخیره وضعیت جدید
// function saveCart() {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
//     updateCartUI(cartItems.length); // به‌روزرسانی ویجت سبد خرید در هدر
// }

// // ۳. افزودن محصول
// async function addToCart(productId, quantity = 1) {
//     // ارسال به سرور (فرض می‌کنیم سرور، سبد خرید را مدیریت می‌کند)
//     try {
//         const response = await ApiService.post('cart/add', { productId, quantity });
//         // اگر از Local Storage استفاده می‌کنید:
//         const existingItem = cartItems.find(item => item.id === productId);
//         if (existingItem) {
//             existingItem.quantity += quantity;
//         } else {
//             cartItems.push({ id: productId, quantity: quantity });
//         }
//         saveCart();
//         alert('محصول با موفقیت به سبد خرید اضافه شد!');
//     } catch (error) {
//         alert('خطا در افزودن به سبد خرید: ' + error.message);
//     }
// }

// // ۴. دریافت مجموع قیمت (یک منطق کسب‌وکار مهم)
// function getTotalPrice() {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
// }

// // ۵. Initializer (توابع در معرض دید)
// export function initCart() {
//     loadCart();
// }

// export const CartModule = {
//     addToCart,
//     getTotalPrice,
//     getItems: () => [...cartItems], // برگرداندن یک کپی برای جلوگیری از تغییر مستقیم
//     // ... توابع دیگر مثل removeItem, updateQuantity
// };

// js/modules/Cart.js

// عنصر DOM برای نمایش تعداد آیتم‌های سبد خرید
// ⚠️ Initialize in initCart() to avoid null queries at module load
let cartCountElement = null;
let cartIconElement = null;

let cartItems = [];
let isInitialized = false;

// ۱. به‌روزرسانی UI
function updateCartUI() {
  // Guard: ensure DOM elements are initialized
  if (!cartCountElement) {
    console.warn("Cart UI not initialized. Call initCart() first.");
    return;
  }

  const count = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = count;
  // می‌توانید هنگام خالی بودن سبد خرید، کلاس خاصی برای پنهان کردن عدد به آیکون دهید.
}

// ۲. بارگذاری و ذخیره (منطق در ماژول قبل کامل توضیح داده شد)
function loadCart() {
  // ... منطق بارگذاری از API یا Local Storage
  cartItems = JSON.parse(localStorage.getItem("localCart") || "[]");
  updateCartUI();
}

function addToCart(productId, quantity = 1) {
  const existingItem = cartItems.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ id: productId, quantity });
  }
  localStorage.setItem("localCart", JSON.stringify(cartItems));
  updateCartUI(); // به‌روزرسانی UI
}
// ۳. اتصال به رویداد (برای مثال، کلیک روی آیکون سبد خرید)
// Moved to initCart() to ensure DOM is ready

export function initCart() {
  // Initialize DOM elements after the DOM is parsed
  cartCountElement = document.getElementById("cart-count");
  cartIconElement = document.getElementById("cart-icon");

  // Guard: check if elements exist
  if (!cartCountElement || !cartIconElement) {
    console.error(
      "Cart initialization failed: Missing #cart-count or #cart-icon elements in DOM"
    );
    isInitialized = false;
    return;
  }

  // Attach event listener only after elements are confirmed
  cartIconElement.addEventListener("click", () => {
    // Navigate to cart page
    Router.navigate("/cart");
  });

  // Load cart data and update UI
  loadCart();
  isInitialized = true;

  console.log("Cart module initialized successfully");
}

export const CartModule = {
  addToCart,
  // ...
};

// // تمپلیت HTML برای صفحه سبد خرید (Cart View)
// const CART_PAGE_HTML = `
//     <div class="cart-page-container main-container">
//         <h2 class="cart-title">سبد خرید شما</h2>
//         <div class="cart-content-wrapper">

//             <div class="cart-items-list" id="cart-items-container">
//                 <p id="empty-cart-message">سبد خرید شما خالی است.</p>
//             </div>

//             <div class="cart-summary-box">
//                 <p class="summary-free-shipping">سفارش شما شامل ارسال رایگان است!</p>
//                 <div class="summary-subtotal">
//                     جمع کل محصولات (<span id="total-items-count">0</span> آیتم):
//                     <span class="subtotal-price" id="cart-total-price">0 تومان</span>
//                 </div>
//                 <button class="btn btn-primary btn-checkout" id="btn-checkout-proceed">
//                     پرداخت و ادامه خرید
//                 </button>
//             </div>

//         </div>
//     </div>
// `;

// // تمپلیت یک آیتم محصول در سبد خرید (برای استفاده در حلقه JS)
// export function renderCartItem(item) {
//     return `
//         <div class="cart-item" data-product-id="${item.id}">
//             <img src="${item.image}" alt="${item.name}" class="item-image">
//             <div class="item-details">
//                 <h4 class="item-name">${item.name}</h4>
//                 <p class="item-price">${item.price} تومان</p>
//                 <p class="item-status">موجود</p>
//             </div>
//             <div class="item-controls">
//                 <select class="quantity-select" data-id="${item.id}">
//                     </select>
//                 <button class="btn-remove-item" data-id="${item.id}">حذف</button>
//             </div>
//         </div>

// js/views/CartView.js (View Logic)

import { CartModule, removeItem } from "../modules/Cart.js"; // منطق
import { renderCartItem, CART_VIEW_HTML } from "../components/CartTemplates.js"; // تمپلیت‌ها
import { CART_VIEW_HTML, renderCartItem } from "../components/CartTemplates.js";
import { CartModule, removeItem } from "../modules/Cart.js";
// ۱. تابع اصلی رندر
export function renderCartView(containerElement) {
  // ۱. تزریق ساختار اصلی
  containerElement.innerHTML = CART_VIEW_HTML;
    const itemsContainer = document.getElementById("cart-items-container");
  const emptyMessage = document.getElementById("empty-cart-message");
    const items = CartModule.getItems();
  if (items.length === 0) {
    itemsContainer.style.textAlign = "center";
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  // رندر آیتم‌ها
  items.forEach((item) => {
    itemsContainer.innerHTML += renderCartItem(item);
  });

  // ۳. به‌روزرسانی جمع‌بندی
  updateSummary(items.length, CartModule.getTotalPrice());

  // ۴. اتصال شنونده‌های رویداد
  attachCartEventListeners();
}

// ۲. به‌روزرسانی باکس جمع‌بندی
function updateSummary(count, total) {
  document.getElementById("total-items-count").textContent = count;
  document.getElementById(
    "cart-total-price"
  ).textContent = `${total.toLocaleString()} تومان`;
}

// ۳. اتصال شنونده‌های رویداد
function attachCartEventListeners() {
  const itemsContainer = document.getElementById("cart-items-container");

  // شنونده رویداد حذف
  itemsContainer.querySelectorAll(".btn-remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      removeItem(productId);
      // پس از حذف، دوباره کل ویو را رندر می‌کنیم (ساده‌ترین راه)
      renderCartView(document.getElementById("app-view-container"));
    });
  });

  // شنونده رویداد پرداخت
  document
    .getElementById("btn-checkout-proceed")
    .addEventListener("click", () => {
      // Router.navigate('/checkout'); // فرستادن کاربر به صفحه پرداخت
      alert("انتقال به صفحه پرداخت");
    });

  // شنونده رویداد تغییر تعداد (quantity-select)
  // ...
}
