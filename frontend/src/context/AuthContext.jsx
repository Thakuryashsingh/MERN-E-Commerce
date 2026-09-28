import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { currentUserRequest, loginRequest, registerRequest } from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = useCallback(async () => {
    const { data } = await currentUserRequest();
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback(async credentials => {
    const { data } = await loginRequest(credentials);
    localStorage.setItem('accessToken', data.accessToken);
    try {
      return await getCurrentUser();
    } catch (error) {
      localStorage.removeItem('accessToken');
      throw error;
    }
  }, [getCurrentUser]);

  const register = useCallback(async details => {
    const { data } = await registerRequest(details);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .catch(() => {
        localStorage.removeItem('accessToken');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [getCurrentUser]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
    getCurrentUser
  }), [user, loading, login, register, logout, getCurrentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
