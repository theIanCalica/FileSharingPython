import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_LINK}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
