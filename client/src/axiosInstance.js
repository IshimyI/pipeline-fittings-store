import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TARGET,
  withCredentials: true, // Essential for cross-origin cookie handling
});

let accessToken = "";

// Initialize access token from localStorage if a user is logged in
try {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    // Token will be set via refresh on app load
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
  // Also clear user data from localStorage
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
    // Prevent infinite loops with a flag
    if (error.response?.status === 401 && !prevReq.sent) {
      try {
        // Use withCredentials to ensure cookies are sent with the request
        const response = await axios.get(
          `${import.meta.env.VITE_TARGET}tokens/refresh`,
          {
            withCredentials: true,
            // Add headers to ensure proper CORS handling
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        accessToken = response.data.accessToken;
        // Update user data in localStorage
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
