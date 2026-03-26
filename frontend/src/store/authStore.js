import { create } from 'zustand';
import { authApi } from '../utils/api';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login({ email, password });
      const { user } = response.data;
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const response = await authApi.getMe();
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;