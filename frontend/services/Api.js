// ۱. تنظیمات اولیه
const TOKEN_KEY = "authToken";

// منطق انتخاب آدرس سرور (لوکال یا کلاود)
const API_BASE_URL =
  (typeof window !== "undefined" && window.__API_BASE__) ||
  "http://127.0.0.1:5502";

// ۲. تابع اصلی برای برقراری ارتباط با سرور
async function request(endpoint, method = "GET", data = null) {
  // پاکسازی آدرس برای جلوگیری از ایجاد اسلش دوگانه
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${API_BASE_URL}/${cleanEndpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      // تزریق خودکار توکن در صورت وجود در localStorage
      "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY) || ""}`,
    },
  };

  // اگر داده‌ای برای ارسال وجود داشت، آن را به رشته JSON تبدیل کن
  if (data) {
    options.body = JSON.stringify(data);
    console.log('hey data', data)
  }

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type") || "";

    // ۳. مدیریت خطاهای HTTP (4xx و 5xx)
    if (!response.ok) {
      if (contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `API Error: ${response.status}`);
      }
    }

    // ۴. مدیریت پاسخ‌های موفق (204 No Content)
    if (response.status === 204) return null;

    // ۵. پارس کردن داده‌های دریافتی بر اساس نوع محتوا
    if (contentType.includes("application/json")) {
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }

    return await response.text();

  } catch (error) {
    console.error("🌐 API Request Failed:", error.message);
    throw error;
  }
}

// ۶. خروجی نهایی برای استفاده در کل پروژه
export const ApiService = {
  get: (endpoint) => request(endpoint, "GET"),
  post: (endpoint, data) => request(endpoint, "POST", data),
  put: (endpoint, data) => request(endpoint, "PUT", data),
  delete: (endpoint) => request(endpoint, "DELETE"),
};

export default ApiService;