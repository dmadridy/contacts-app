import type { User } from "firebase/auth";
import { create, useStore } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useUserStore = <T>(selector: (state: UserStore) => T): T =>
  useStore(userStore, selector);
