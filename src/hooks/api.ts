import axios from "axios";

export const acessToken = () => localStorage.getItem("token");

const apiUrl = "http://localhost:8080/";
export const axiosApi = axios.create({
  baseURL: apiUrl,
});

const api = {
  get: (url: string, config = {}) =>
    axiosApi.get(url, { headers: { ...config, Authorization: acessToken() } }),
  put: (url: string, data = {}, config = {}) =>
    axiosApi.put(url, data, {
      headers: { ...config, Authorization: acessToken() },
    }),
  post: (url: string, data = {}, config = {}) =>
    axiosApi.post(url, data, {
      headers: { ...config, Authorization: acessToken() },
    }),
  delete: (url: string, config = {}) =>
    axiosApi.delete(url, {
      headers: { ...config, Authorization: acessToken() },
    }),
  patch: (url: string, data = {}, config = {}) =>
    axiosApi.patch(url, data, {
      headers: { ...config, Authorization: acessToken() },
    }),
};

/* axiosApi.interceptors.request.use(
  (config) => {
    const tenant = localStorage.getItem("tenant");
    config.headers["x-tenant-id"] = tenant;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
