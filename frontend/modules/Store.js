/**
 * ایجاد کننده وضعیت سراسری برنامه (Global State Store)
 * از الگوی Closure برای کپسوله‌سازی متغیر 'state' استفاده می‌کند.
 * @returns {object} شیئی شامل توابع برای دسترسی و به‌روزرسانی وضعیت.
 */ // store.js
export function createStore(initialState = {}) {
  let state = initialState;
  const listeners = new Set();

  function getState() {
    return structuredClone(state);
  }
 
  function setState(updater) {
    // updater can be object or function(prev)=>newPartial
    const patch = typeof updater === "function" ? updater(state) : updater;
    state = { ...state, ...patch };
    listeners.forEach((fn) => fn(getState()));
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { getState, setState, subscribe };
}

export function initStore() {
  // ۱. وضعیت اولیه (Initial State)
  // این متغیر فقط از داخل این تابع قابل دسترسی و تغییر است (Closure)
  let state = {
    // وضعیت احراز هویت (Auth State)
    auth: {
      isLoggedIn: false,
      user: null, // شیء کاربر پس از ورود موفق
    },
    // وضعیت سبد خرید (Cart State)
    cart: {
      // بارگذاری اولیه از localStorage (برای حفظ وضعیت پس از رفرش)
      items: JSON.parse(localStorage.getItem("amazon_cart_items") || "[]"),
      count: 0,
    },
    // وضعیت رندرینگ (به عنوان مثال برای Loading Spinner)
    isLoading: false,
    // ... سایر وضعیت‌ها
  };

  // به‌روزرسانی شمارش اولیه آیتم‌های سبد خرید
  state.cart.count = state.cart.items.length;

  // ۲. توابع کمکی برای به‌روزرسانی UI (در آینده)
  // این توابع به ماژول‌های دیگر اجازه می‌دهند تا به تغییرات Store واکنش نشان دهند.
  const subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach((callback) => callback(state));
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
    // فراخوانی اولیه برای رندر شدن با وضعیت فعلی
    callback(state);
  };

  // ۳. متدهای اصلی (API) برای دسترسی به Store

  const getStore = () => {
    // بازگرداندن یک کپی از وضعیت برای جلوگیری از دستکاری مستقیم
    return JSON.parse(JSON.stringify(state));
  };

  const updateAuth = (userData) => {
    state.auth.isLoggedIn = !!userData; // اگر userData شیء باشد، true می‌شود
    state.auth.user = userData;
    // پس از تغییر وضعیت، به مشترکین اطلاع می‌دهیم تا UI به‌روز شود
    notifySubscribers();
  };
 
  const updateCart = (newItems) => {
    state.cart.items = newItems;
    state.cart.count = newItems.length;
    // ذخیره در localStorage برای حفظ وضعیت
    localStorage.setItem("amazon_cart_items", JSON.stringify(newItems));
    // اطلاع‌رسانی برای به‌روزرسانی هدر (شمارش سبد خرید)
    notifySubscribers();
  };

  // ۴. بازگرداندن API عمومی
  return {
    getStore,
    updateAuth,
    updateCart,
    subscribe, // برای استفاده Header در به‌روزرسانی خودکار
    // ...
  };
  // // store.js
  // // ---- Simple State Manager (Vanilla JS + ES Modules) ----

  // // مقدار اولیه State
  // let state = {
  //   user: null,
  //   theme: "light",
  //   cart: [],
  // };

  // // لیست Subscriber ها (تمام بخش‌هایی که باید تغییر را گوش کنند)
  // let listeners = [];

  // // تابعی برای برگرداندن state
  // export function getState() {
  //   return state;
  // }

  // // تابعی برای آپدیت کردن state
  // export function setState(newState) {
  //   state = { ...state, ...newState };
  //   notify();
  // }

  // // ثبت Subscriber جدید
  // export function subscribe(fn) {
  //   listeners.push(fn);
  // }

  // // اطلاع رسانی به تمام Listener ها
  // function notify() {
  //   listeners.forEach((fn) => fn(state));
  // }

  // // اکشن آماده برای استفاده
  // export const actions = {
  //   setUser(user) {
  //     setState({ user });
  //   },

  //   toggleTheme() {
  //     setState({ theme: state.theme === "light" ? "dark" : "light" });
  //   },

  //   addToCart(item) {
  //     setState({ cart: [...state.cart, item] });
  //   },
  // };

  // /js/store.js
}
