import { ApiService } from "./Api.js";

const TOKEN_KEY = "authToken";

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
    return ApiService.get("#/profile");
  },
};

export default AuthService;
