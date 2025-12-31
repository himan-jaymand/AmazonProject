// js/services/Api.js
const TOKEN_KEY = "authToken";
const AUTH_TOKEN_KEY = "authToken"; //key for localStorage


const API_BASE_URL =
  (typeof window !== "undefined" && window.__API_BASE__) ||
  "http://127.0.0.1:5502";

async function request(endpoint, method = "GET", data = null) {
  const url = `${API_BASE_URL}/${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",

      // توکن احراز هویت را از Local Storage اضافه کنید
    
      Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, options);
    // اگر پاسخ در محدوده‌ی 4xx یا 5xx بود، خطا پرتاب کن
    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      // Try to parse JSON error body if present, otherwise read text
      if (contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            JSON.stringify(errorData) ||
            `API Error: ${response.status}`
        );
      } else {
        const txt = await response.text().catch(() => null);
        throw new Error(txt || `API Error: ${response.status}`);
      }
    }

    // No content
    if (response.status === 204) return null;

    // Parse JSON when available, otherwise return text
    if (contentType.includes("application/json")) {
      // handle empty body that would cause JSON parse error
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }

    return await response.text();
  } catch (error) {
    console.error("API Request Failed:", error);
    // می‌توانید یک رویداد سفارشی (Custom Event) برای نمایش پیام خطا به کاربر پرتاب کنید.
    throw error;
  }
}

// توابع عمومی که ماژول‌های دیگر از آن‌ها استفاده می‌کنند
export const ApiService = {
  get: (endpoint) => request(endpoint, "GET"),
  post: (endpoint, data) => request(endpoint, "POST", data),
  put: (endpoint, data) => request(endpoint, "PUT", data),
  delete: (endpoint) => request(endpoint, "DELETE"),
};

// نشان دادید که از الگوهای مدرن (ES6 Modules، Async/Await، Fetch API) استفاده کرده و مدیریت خطا (Error Handling) را در لایه‌ی شبکه پیاده‌سازی کرده‌اید.
