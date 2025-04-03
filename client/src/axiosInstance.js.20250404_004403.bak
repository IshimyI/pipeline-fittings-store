import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_TARGET}/api`,
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(newToken) {
  accessToken = newToken;
}

export function clearAccessToken() {
  accessToken = "";
}

export function getUserData() {
  return JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
  );
}

export function saveUserData(userData) {
  localStorage.setItem("user", JSON.stringify(userData));
  sessionStorage.setItem("user", JSON.stringify(userData));
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
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: prevReq?.url,
      method: prevReq?.method,
      message: error.message,
      data: error.response?.data,
      headers: prevReq?.headers,
    });

    if (
      error.response?.status === 401 &&
      !prevReq.sent &&
      accessToken &&
      typeof accessToken === "string" &&
      accessToken.length > 0
    ) {
      let retryCount = 0;
      const maxRetries = 3;
      const retryDelay = 1000; // 1 second

      async function attemptRefresh() {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_TARGET}/api/tokens/refresh`,
            { withCredentials: true }
          );
          accessToken = response.data.accessToken;
          if (response.data.user) {
            saveUserData(response.data.user);
          }
          prevReq.sent = true;
          prevReq.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(prevReq);
        } catch (refreshError) {
          if (retryCount < maxRetries) {
            retryCount++;
            await new Promise((resolve) =>
              setTimeout(resolve, retryDelay * retryCount)
            );
            return attemptRefresh();
          }
          console.error("Token refresh failed:", {
            error: refreshError,
            message: refreshError.message,
            status: refreshError.response?.status,
            data: refreshError.response?.data,
            timestamp: new Date().toISOString(),
          });
          clearAccessToken();
          localStorage.removeItem("user");
          sessionStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(
            new Error("Authentication failed. Please login again.")
          );
        }
      }
      return attemptRefresh();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
