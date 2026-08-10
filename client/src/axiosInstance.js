import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TARGET,
  withCredentials: true,
});

let accessToken = "";

try {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    console.log("User found in localStorage, token will be refreshed");
  }
} catch (e) {
  console.error("Error accessing localStorage:", e);
}

export function setAccessToken(newToken) {
  accessToken = newToken;
}

export function clearAccessToken() {
  accessToken = "";
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.error("Error clearing localStorage:", e);
  }
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
        const response = await axios.get(
          `${import.meta.env.VITE_TARGET}tokens/refresh`,
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        accessToken = response.data.accessToken;
        try {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (e) {
          console.error("Error updating localStorage:", e);
        }
        prevReq.sent = true;
        prevReq.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(prevReq);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        clearAccessToken();
        try {
          localStorage.removeItem("user");
        } catch (e) {
          console.error("Error clearing localStorage:", e);
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
