import axios from "axios";
import { getToken, setToken } from "./Helpers";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_LINK}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  const { refreshToken } = getToken() || {};
  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_LINK}/auth/refresh`,
      {
        refresh_token: refreshToken,
      }
    );

    // Save new tokens
    const { accessToken, refreshToken: newRefreshToken } = response.data; // Adjust based on your API response structure
    setToken({ accessToken, refreshToken: newRefreshToken }); // Update the token in local storage or your state management
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error; // Rethrow error to handle in the request interceptor
  }
};

// Add a request interceptor to attach the access token to headers
client.interceptors.request.use(
  (config) => {
    const { accessToken } = getToken() || {};
    if (accessToken) {
      const cleanedToken = accessToken.replace(/^["']|["']$/g, "");
      config.headers["Authorization"] = `Bearer ${cleanedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
client.interceptors.request.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    try {
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return client(originalRequest);
    } catch (refreshError) {
      console.error("Failed to refresh token", refreshError);
    }
    return Promise.reject(error);
  }
);

export default client;
