import { ApiService } from "../../services/Api.js";
import { Router } from "../Router.js";

const AUTH_TOKEN_KEY = "authToken"; //key for localStorage

// ۱. منطق ثبت‌نام (Register)
async function register(name, email, password) {
  try {
    // فراخوانی API برای ثبت‌نام
    const response = await ApiService.post("auth/register", {
      name,
      email,
      password,
    });
    // expected response: { token, user }
    if (response && response.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      updateHeaderGreeting(response.user?.name || name);
    }
    return response;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
}

//update ui header greeting element
const userGreetingElement = document.getElementById("user-greeting");
function updateHeaderGreeting(username = null) {
  if (!userGreetingElement) return;
  const greetingText = username ? `Hello ${username}` : "Hello, please log in";
  userGreetingElement.textContent = greetingText;

  // می‌توانید در اینجا کلاس‌های CSS مرتبط با وضعیت ورود را نیز تغییر دهید.
}

// ۲. بررسی وضعیت کاربر (در هنگام بارگذاری اولیه برنامه)
async function checkStatus() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    try {
      // فرض می‌کنیم یک API برای دریافت مشخصات کاربر بر اساس توکن وجود دارد
      const userData = await ApiService.get("users/me");
      updateHeaderGreeting(userData.name || "کاربر عزیز");
      return true;
    } catch (error) {
      // توکن منقضی شده یا نامعتبر است
      console.error("توکن نامعتبر یا منقضی شده، خروج خودکار");
      logout(false); // خروج بدون ارسال مجدد به سرور
      return false;
    }
  }
  updateHeaderGreeting(null);
  return false;
}

// ۳. منطق ورود (Login)
async function login(email, password) {
  try {
    const response = await ApiService.post("auth/login", { email, password });
    if (response && response.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      updateHeaderGreeting(response.user?.name || response.user?.email || null);
      Router.navigate("/");
    } 
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// ۵. منطق خروج (Logout)
function logout(shouldNavigate = true) {
  // حذف توکن از Local Storage
  localStorage.removeItem(AUTH_TOKEN_KEY);

  // به‌روزرسانی UI
  updateHeaderGreeting(null);

  // انتقال به صفحه ورود یا صفحه اصلی
  if (shouldNavigate) {
    Router.navigate("/login");
  }
}

// ۶. توابع در معرض دید عمومی
export const AuthModule = {
  checkStatus,
  login,
  register,
  logout,
  // توابع کمکی
  isLoggedIn: () => !!localStorage.getItem(AUTH_TOKEN_KEY),
};
