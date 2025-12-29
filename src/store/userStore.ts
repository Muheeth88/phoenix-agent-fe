import { create } from "zustand";

type UserStore = {
  user: any;
  accessToken: string | null;
  setUser: (user: any) => void;
  setAccessToken: (token: string | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user: any) => set({ user }),
  setAccessToken: (token: string | null) => set({ accessToken: token }),
}));

export { useUserStore };
