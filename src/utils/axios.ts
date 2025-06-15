import axios from "axios";

export const baseURL =
  "https://chatappapi-hdc7fkf8a4dxh4dj.canadacentral-01.azurewebsites.net/api/";

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const token = localStorage.getItem("token");
      if (refreshToken) {
        try {
          const response = await axios.post(`${baseURL}user/refresh`, {
            token: token,
            refreshToken: refreshToken,
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return instance(originalRequest);
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
