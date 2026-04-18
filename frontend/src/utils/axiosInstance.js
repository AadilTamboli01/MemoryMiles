import axios from "axios"
// https://memorymiles-uzac.onrender.com
const BASE_URL = "https://memorymiles-uzac.onrender.com/api";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
})

export default axiosInstance;