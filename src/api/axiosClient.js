import axios from 'axios';

const baseURL = process.env.VITE_API_BASE_URL || 'http://localhost:5000';

const axiosClient = axios.create({
    baseURL: baseURL,
});


axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;