import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  getAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,

  setAuth: (token, user) => {
    // Store the token and user in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Update the state
    set({ token, user });
  },

  clearAuth: () => {
    // Remove the token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Clear the state
    set({ token: null, user: null });
  },

  getAuth: () => {
    // Fetch the token and user from localStorage
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Set the state with the fetched data
    set({ token, user });
  },
}));
