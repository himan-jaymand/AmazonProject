import { ApiService } from "./Api.js";
import { Router } from "../modules/Router.js";

const TOKEN_KEY = "authToken";
const AUTH_TOKEN_KEY = "authToken"; //key for localStorage


async function register(name,username, password, email) {
  try {

    const response = await ApiService.post("auth/register", {
      name,
      username,
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
function updateHeaderGreeting(username = null) {
  // Query the element at use-time to ensure DOM is ready
  const userGreetingElement = document.getElementById("user-greeting");

  // Guard: check if element exists before accessing
  if (!userGreetingElement) {
    console.warn("User greeting element #user-greeting not found in DOM");
    return;
  }

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
      updateHeaderGreeting(
        response.user?.name || response.user?.email || "کاربر عزیز"
      );
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

export const AuthService = {
  async register({ name, lastname, birthday, email, password }) {
    const payload = { name, lastname, birthday, email, password };
    const data = await ApiService.post("#/register", payload);
    if (data && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  },

  async login({ email, password }) {
    const payload = { email, password };
    const data = await ApiService.post("#/login", payload);
    if (data && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  async getProfile() {
    return ApiService.get("/api/auth/profile");
  },
};

export default AuthService;
