import config from "./config";
import axios from "axios";

const defaultOptions = {
    baseURL: config.BACKEND_URL,
};


const AxiosInstance = axios.create(defaultOptions);

export default AxiosInstance;