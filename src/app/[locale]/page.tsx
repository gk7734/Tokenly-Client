'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWeb3Auth } from '@/contexts/Web3AuthContext';
import { useUserStore } from '@/stores/userStore';
import styles from './page.module.css';
import Navbar from "@/components/common/Navbar";
import Feed from "@/components/main/feed/Feed";

export default function Home() {
  const {
    loggedIn,
    loading,
    login,
    logout,
    getAccounts,
    getBalance,
    signMessage,
    provider
  } = useWeb3Auth();

  const { user, walletAddress, avatarUrl, setWalletAddress } = useUserStore();

  const [balance, setBalance] = useState<string>('');
  const [signature, setSignature] = useState<string>('');

  const handleGetAccounts = useCallback(async () => {
    const accs = await getAccounts();
    if (accs.length > 0) {
      setWalletAddress(accs[0]);
    }
  }, [getAccounts, setWalletAddress]);

  // Auto-fetch accounts on login for external wallets
  useEffect(() => {
    const hasUserInfo = user && Object.keys(user).length > 0;
    if (loggedIn && !hasUserInfo && provider) {
      void handleGetAccounts();
    }
  }, [loggedIn, user, provider, handleGetAccounts]);

  const handleLogin = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
    setBalance('');
    setSignature('');
  };

  const handleGetBalance = async () => {
    const bal = await getBalance();
    setBalance(bal);
  };

  const handleSignMessage = async () => {
    try {
      const sig = await signMessage('Hello from Tokenly!');
      setSignature(sig);
    } catch (error) {
      console.error('Sign failed:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Loading Web3Auth...</h1>
        </main>
      </div>
    );
  }

  return (
      <main className={styles.home}>
        <Navbar />
        <div className={styles.feedFlexBox}>
          <Feed />
          <Feed />
          <Feed />
        </div>
      </main>
  );
}
