import axios from 'axios';

const api = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } });
let refreshRequest = null;

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh-token');
  const isLoginOrRegister = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/register');

  if (error.response?.status !== 401 || isLoginOrRegister) {
    return Promise.reject(error);
  }

  if (originalRequest?._retried || isRefreshRequest) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.dispatchEvent(new Event('auth:expired'));
    return Promise.reject(error);
  }

  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    localStorage.removeItem('accessToken');
    window.dispatchEvent(new Event('auth:expired'));
    return Promise.reject(error);
  }

  originalRequest._retried = true;

  try {
    refreshRequest ||= api.post('/auth/refresh-token', { refreshToken }).finally(() => {
      refreshRequest = null;
    });

    const { data } = await refreshRequest;
    localStorage.setItem('accessToken', data.accessToken);
    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
    return api(originalRequest);
  } catch (refreshError) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.dispatchEvent(new Event('auth:expired'));
    return Promise.reject(refreshError);
  }
});

export default api;
