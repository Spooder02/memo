// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5001', // Flask 서버 주소
});

// 모든 요청에 JWT 토큰을 포함시키는 인터셉터
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;