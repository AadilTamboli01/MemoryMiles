import axios from "axios"
// https://memorymiles-uzac.onrender.com
const BASE_URL = "http://127.0.0.1:3000/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
})

export default axiosInstance;