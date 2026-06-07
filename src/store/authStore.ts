import { create } from "zustand";
import { User, AuthResponse } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  hydrated: boolean;

  setHydrated: () => void;

  setAuth: (response: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  hydrated: false,

  setHydrated: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    set({
      token,
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token,
      hydrated: true,
    });
  },

  setAuth: (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    set({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));