import { toast } from "react-toastify";

export const authenticate = (data) => {
  if (window !== "undefined") {
    localStorage.setItem("access_token", JSON.stringify(data.access));
    localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

export const setToken = (data) => {
  if (window !== "undefined") {
    localStorage.setItem("access_token", JSON.stringify(data.access));
    localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getToken = () => {
  if (typeof window !== "undefined") {
    // Check if the window object is defined
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    // Check if both tokens exist
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    } else {
      return false;
    }
  }
  return false;
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

export const logout = () => {
  if (window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  }
};

// Notify success message using Toastify
export const notifySuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Notify error message using Toastify
export const notifyError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Format Date
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getBorderColor = (fieldName, errors, touchedFields) => {
  if (errors[fieldName]) {
    return "border-red-500"; // Red border for errors
  }
  if (touchedFields[fieldName]) {
    return "border-green-500"; // Green border for successful validation after interaction
  }
  return "border-gray-200"; // Gray border by default
};
