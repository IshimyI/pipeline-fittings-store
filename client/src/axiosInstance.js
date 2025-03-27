import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_TARGET}/api`,
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(newToken) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const prevReq = error.config;
    if (error.response?.status === 401 && !prevReq.sent) {
      try {
        console.log('Attempting to refresh token...');
        prevReq.sent = true;
        const response = await axios.get(
          `${import.meta.env.VITE_TARGET}/api/tokens/refresh`,
          { withCredentials: true }
        );
        if (response.data.accessToken) {
          console.log('Token refreshed successfully');
          accessToken = response.data.accessToken;
          prevReq.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(prevReq);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Возможно, перенаправление на страницу логина при неудачном обновлении токена
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
