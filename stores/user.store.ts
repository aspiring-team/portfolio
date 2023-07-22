import { create } from "zustand";

import { User } from "firebase/auth";
import { auth } from "@/utils";

import { Profile } from "@/models";

type UserStoreProps = {
  loading: boolean;
  user: User | null;
  profile: Profile | null;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
};

const useUserStore = create<UserStoreProps>((set) => ({
  loading: true,
  profile: null,
  user: auth.currentUser,
  setLoading: (loading) => set({ loading }),
  setProfile: (profile) => set({ profile }),
  setUser: (user) => set({ user }),
}));

export { useUserStore };
