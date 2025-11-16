// src/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'
import { DecodedToken } from '@/types/auth'

interface AuthState {
  role: 'SELLER' | 'USER' | null
  name: string | null
  accessToken: string | null
  isAuthenticated: boolean

  // Actions
  setAccessToken: (token: string) => void
  setEmail: (email: string) => void
  login: (
    accessToken: string,
    name: string,
    role: 'SELLER' | 'USER' | null,
  ) => void
  logout: () => void
  isTokenValid: () => boolean
  getTokenExpiry: () => number | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({

      role: null,
      name: null,
      accessToken: null,
      isAuthenticated: false,

      setAccessToken: (token: string) => {
        set({ accessToken: token, isAuthenticated: true });
      },

      setEmail: (email: string) => {
        set({ name: email });
      },

      login: (accessToken: string, name: string, role: 'SELLER' | "USER" | null) => {
        set({
          name: name,
          role,
          accessToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          accessToken: null,
          name: null,
          role: null,
          isAuthenticated: false,
        });
      },

      isTokenValid: () => {
        const { accessToken } = get();

        if (!accessToken) {
          return false;
        }

        try {
          const decoded = jwtDecode<DecodedToken>(accessToken);
          const currentTime = Date.now() / 1000;

          // 토큰이 만료되었는지 확인 (1초 버퍼 추가)
          return decoded.exp > currentTime + 1;
        } catch (error) {
          console.error('Token decode error:', error);
          return false;
        }
      },

      getTokenExpiry: () => {
        const { accessToken } = get();

        if (!accessToken) return null;

        try {
          const decoded = jwtDecode<DecodedToken>(accessToken);
          return decoded.exp;
        } catch (error) {
          console.error('Token decode error:', error);
          return null;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        name: state.name,
        role: state.role,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);