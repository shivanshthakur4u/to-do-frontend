import axios from "axios";
import config from "./config";
import { getToken } from "../utils/auth";

const defaultOptions = {
    baseURL: config.BACKEND_URL,
};

const AxiosInstance = axios.create(defaultOptions);

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
