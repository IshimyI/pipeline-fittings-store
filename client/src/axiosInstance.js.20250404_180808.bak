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
  const userDataWithAdmin = {
    ...userData,
    isAdmin: userData.isAdmin ?? false,
  };
  localStorage.setItem("user", JSON.stringify(userDataWithAdmin));
  sessionStorage.setItem("user", JSON.stringify(userDataWithAdmin));
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
    // Check for cookie errors in response
    if (res.data?.cookieError) {
      console.warn("Cookie operation warning:", res.data.cookieError);
      // We still have the access token, so we can continue
    }
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
          console.log("Attempting token refresh...");
          const response = await axios.get(
            `${import.meta.env.VITE_TARGET}/api/tokens/refresh`,
            { 
              withCredentials: true,
              headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
              }
            }
          );
          
          // Log the response for debugging
          console.log("Token refresh response:", {
            hasAccessToken: !!response.data.accessToken,
            hasUser: !!response.data.user,
            cookieStatus: response.data.cookieStatus || 'unknown',
            cookieError: response.data.cookieError || 'none'
          });
          
          // Check for required data
          if (!response.data.accessToken) {
            throw new Error("Invalid response: missing access token");
          }
          
          if (!response.data.user) {
            throw new Error("Invalid response: missing user data");
          }
          
          // Update the access token
          accessToken = response.data.accessToken;
          
          // Save user data with isAdmin flag
          const userDataWithAdmin = {
            ...response.data.user,
            isAdmin: response.data.user.isAdmin ?? false,
          };
          saveUserData(userDataWithAdmin);
          
          // Even if there was a cookie error, we can still use the access token
          if (response.data.cookieError) {
            console.warn("Cookie error during token refresh:", response.data.cookieError);
            // Continue anyway since we have the access token
          }
          
          prevReq.sent = true;
          prevReq.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(prevReq);
        } catch (refreshError) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Token refresh failed, retrying (${retryCount}/${maxRetries})...`);
            await new Promise((resolve) =>
              setTimeout(resolve, retryDelay * retryCount)
            );
            return attemptRefresh();
          }
          
          console.error("Token refresh failed after retries:", {
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