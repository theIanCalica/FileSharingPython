import axios from "axios";
import { getToken } from "./Helpers";
const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_LINK}`,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export default client;
