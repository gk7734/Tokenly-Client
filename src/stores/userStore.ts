import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from '@web3auth/base';

interface UserState {
  user: Partial<UserInfo> | null;
  walletAddress: string | null;
  avatarUrl: string | null;
  setUser: (user: Partial<UserInfo> | null) => void;
  setWalletAddress: (address: string | null) => void;
  setAvatarUrl: (url: string | null) => void;
  clearUser: () => void;
}

const getAvatarUrl = (address: string): string => {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      walletAddress: null,
      avatarUrl: null,

      setUser: (user) => set({ user }),

      setWalletAddress: (address) =>
        set({
          walletAddress: address,
          avatarUrl: address ? getAvatarUrl(address) : null
        }),

      setAvatarUrl: (url) => set({ avatarUrl: url }),

      clearUser: () =>
        set({
          user: null,
          walletAddress: null,
          avatarUrl: null
        }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        walletAddress: state.walletAddress,
      }),
    }
  )
);