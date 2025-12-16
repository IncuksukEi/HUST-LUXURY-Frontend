import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Link Backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm Interceptor để tự động gắn Token vào mỗi request (nếu đã đăng nhập)
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lấy token từ bộ nhớ trình duyệt
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;