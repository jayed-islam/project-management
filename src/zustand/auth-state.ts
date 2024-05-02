import { create } from "zustand";

export interface IUser {
  email: string;
  password: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  signIn: (token: string, user: IUser) => void;
  logOut: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: (token: string, user: IUser) => {
    // const expiryTime = new Date().getTime() + 30 * 60 * 1000;
    const currentTime = new Date().getTime();

    const expiryTime = currentTime + 2 * 60 * 60 * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", expiryTime.toString());
    set({ isAuthenticated: true, user });
  },
  logOut: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
