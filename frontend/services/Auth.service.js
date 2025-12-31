import { ApiService } from "./Api.js";
import { Router } from "../modules/Router.js";

const AUTH_TOKEN_KEY = "authToken";

// بروزرسانی نام کاربر در هدر
function updateHeaderGreeting(username = null) {
  const userGreetingElement = document.getElementById("user-greeting");
  if (!userGreetingElement) return;
  userGreetingElement.textContent = username
    ? `Hello, ${username}`
    : "Hello, please log in";
}

export const AuthService = {
  // ۱. ثبت‌نام
  async register(userData) {
    const response = await ApiService.post("auth/register", userData);
    if (response?.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      updateHeaderGreeting(response.user?.name || name);
    }
    return response;
  },

  // ۲. ورود
  async login(email, password) {
    const response = await ApiService.post("auth/login", { email, password });
    if (response?.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      updateHeaderGreeting(response.user?.name || "کاربر عزیز");
      Router.navigate("/home");
    }
    return response;
  },

  // ۳. بررسی وضعیت (اصلاح شده: روت پروفایل به جای رجیستر)
  async checkStatus() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      updateHeaderGreeting(null);
      return false;
    }
    try {
      // 🛑 اصلاح شد: به جای auth/register از auth/profile استفاده کنید
      const userData = await ApiService.get("auth/profile");
      updateHeaderGreeting(userData.name);
      return true;
    } catch (error) {
      this.logout(false);
      return false;
    }
  },

  // ۴. خروج
  logout(shouldNavigate = true) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    updateHeaderGreeting(null);
    if (shouldNavigate) Router.navigate("#/login");
  },

  isLoggedIn: () => !!localStorage.getItem(AUTH_TOKEN_KEY),
};

export default AuthService;
