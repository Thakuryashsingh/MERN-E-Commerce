import api from './api';

export const registerRequest = body => api.post('/auth/register', body);
export const loginRequest = body => api.post('/auth/login', body);
export const currentUserRequest = () => api.get('/auth/me');
