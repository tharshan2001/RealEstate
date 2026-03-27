import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../utils/api';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        console.log('[authStore] Login attempt:', { email });
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login({ email, password });
          console.log('[authStore] Login success:', response.data);
          const { user } = response.data;
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          console.error('[authStore] Login error:', error);
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            isLoading: false 
          });
          return false;
        }
      },

      logout: async () => {
        console.log('[authStore] Logout attempt');
        try {
          await authApi.logout();
          console.log('[authStore] Logout success');
        } catch (error) {
          console.error('[authStore] Logout error:', error);
        }
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        console.log('[authStore] Checking auth status');
        try {
          const response = await authApi.getMe();
          console.log('[authStore] Check auth success:', response.data);
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          console.error('[authStore] Check auth error:', error);
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
