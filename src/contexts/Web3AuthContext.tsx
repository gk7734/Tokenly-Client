'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { IProvider, UserInfo } from "@web3auth/base";
import { web3auth } from "@/lib/web3auth";
import { useUserStore } from "@/stores/userStore";

export interface Web3AuthContextType {
  provider: IProvider | null;
  loggedIn: boolean;
  loading: boolean;
  user: Partial<UserInfo> | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<Partial<UserInfo> | null>;
  getAccounts: () => Promise<string[]>;
  getBalance: () => Promise<string>;
  signMessage: (message: string) => Promise<string>;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);

const WEI_TO_ETH = 10 ** 18;
const BALANCE_DECIMALS = 4;
const INITIAL_BALANCE = "0";

export const useWeb3Auth = (): Web3AuthContextType => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth must be used within a Web3AuthProvider");
  }
  return context;
};

interface Web3AuthProviderProps {
  children: ReactNode;
}

export const Web3AuthProvider: React.FC<Web3AuthProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, setUser: setUserStore, clearUser } = useUserStore();

  const initializeWeb3Auth = useCallback(async () => {
    try {
      await web3auth.init();

      if (web3auth.connected && web3auth.provider) {
        setProvider(web3auth.provider);
        setLoggedIn(true);

        try {
          const userInfo = await web3auth.getUserInfo();
          setUserStore(userInfo);
        } catch (error) {
          console.warn("Could not get user info:", error);
        }
      }
    } catch (error) {
      console.error("Error initializing Web3Auth:", error);
    } finally {
      setLoading(false);
    }
  }, [setUserStore]);

  useEffect(() => {
    void initializeWeb3Auth();
  }, [initializeWeb3Auth]);

  const login = useCallback(async (): Promise<void> => {
    if (loading) {
      console.warn("Web3Auth is still initializing, please wait...");
      return;
    }

    if (!web3auth) {
      console.error("Web3Auth not initialized yet");
      return;
    }

    try {
      await web3auth.connect();

      if (web3auth.connected && web3auth.provider) {
        setProvider(web3auth.provider);
        setLoggedIn(true);

        try {
          const userInfo = await web3auth.getUserInfo();
          setUserStore(userInfo);
        } catch (err) {
          console.warn("No social login user info (external wallet)");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }, [loading, setUserStore]);

  const logout = useCallback(async (): Promise<void> => {
    if (!web3auth) {
      console.error("Web3Auth not initialized yet");
      return;
    }

    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      clearUser();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [clearUser]);

  const getUserInfo = useCallback(async (): Promise<Partial<UserInfo> | null> => {
    if (!web3auth.connected) {
      return null;
    }

    try {
      return await web3auth.getUserInfo();
    } catch (error) {
      console.error("Error getting user info:", error);
      return null;
    }
  }, []);

  const getAccounts = useCallback(async (): Promise<string[]> => {
    if (!provider) {
      console.warn("Provider not initialized yet");
      return [];
    }

    try {
      const accounts = await provider.request({
        method: "eth_accounts",
      }) as string[];
      return accounts;
    } catch (error) {
      console.error("Error getting accounts:", error);
      return [];
    }
  }, [provider]);

  const getBalance = useCallback(async (): Promise<string> => {
    if (!provider) {
      console.warn("Provider not initialized yet");
      return INITIAL_BALANCE;
    }

    try {
      const accounts = await getAccounts();
      if (accounts.length === 0) {
        return INITIAL_BALANCE;
      }

      const balanceHex = await provider.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      }) as string;

      const balanceWei = parseInt(balanceHex, 16);
      const balanceEth = balanceWei / WEI_TO_ETH;

      return balanceEth.toFixed(BALANCE_DECIMALS);
    } catch (error) {
      console.error("Error getting balance:", error);
      return INITIAL_BALANCE;
    }
  }, [provider, getAccounts]);

  const signMessage = useCallback(async (message: string): Promise<string> => {
    if (!provider) {
      throw new Error("Provider not initialized yet");
    }

    const accounts = await getAccounts();
    if (accounts.length === 0) {
      throw new Error("No accounts found");
    }

    try {
      const signature = await provider.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      }) as string;

      return signature;
    } catch (error) {
      console.error("Error signing message:", error);
      throw error;
    }
  }, [provider, getAccounts]);

  const contextValue = useMemo<Web3AuthContextType>(() => ({
    provider,
    loggedIn,
    loading,
    user,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
  }), [provider, loggedIn, loading, user, login, logout, getUserInfo, getAccounts, getBalance, signMessage]);

  return (
    <Web3AuthContext.Provider value={contextValue}>
      {children}
    </Web3AuthContext.Provider>
  );
};