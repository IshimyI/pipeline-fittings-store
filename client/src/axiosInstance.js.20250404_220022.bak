import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_TARGET}/api`,
  withCredentials: true, // Essential for cross-origin cookie handling
});

let accessToken = "";

export function setAccessToken(newToken) {
  accessToken = newToken;
}

export function clearAccessToken() {
  accessToken = "";
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
    // Prevent infinite loops with a flag
    if (error.response?.status === 401 && !prevReq.sent) {
      try {
        // Use withCredentials to ensure cookies are sent with the request
        const response = await axios.get(
          `${import.meta.env.VITE_TARGET}/api/tokens/refresh`,
          { 
            withCredentials: true,
            // Add headers to ensure proper CORS handling
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        accessToken = response.data.accessToken;
        prevReq.sent = true;
        prevReq.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(prevReq);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        clearAccessToken();
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;