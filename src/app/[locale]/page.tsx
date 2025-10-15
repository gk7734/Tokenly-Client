'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useWeb3Auth } from '@/contexts/Web3AuthContext';
import { useUserStore } from '@/stores/userStore';
import styles from './page.module.css';
import Navbar from "@/components/common/Navbar";

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
      <>
        <Navbar />
        <div className={styles.page}>
          <main className={styles.main}>
            <h1>Tokenly - Web3Auth Demo</h1>

            {!loggedIn ? (
                <div className={styles.loginSection}>
                  <p>Connect your wallet to get started</p>
                  <button onClick={handleLogin} className={styles.primary}>
                    Login with Web3Auth
                  </button>
                </div>
            ) : (
                <div className={styles.dashboard}>
                  <div className={styles.userInfo}>
                    <h2>Welcome!</h2>
                    {user && Object.keys(user).length > 0 ? (
                        <>
                          {user?.profileImage && (
                              <Image
                                  src={user.profileImage}
                                  alt="Profile"
                                  width={50}
                                  height={50}
                                  style={{borderRadius: '50%'}}
                              />
                          )}
                          {user?.name && <p>Name: {user.name}</p>}
                          {user?.email && <p>Email: {user.email}</p>}
                          <p>Login Method: {(user as any)?.authConnection?.toUpperCase() || 'Social Login'}</p>
                          <p>User ID: {(user as any)?.userId || 'N/A'}</p>
                        </>
                    ) : (
                        <>
                          {avatarUrl && walletAddress && (
                              <Image
                                  src={avatarUrl}
                                  alt="Wallet Avatar"
                                  width={50}
                                  height={50}
                                  style={{borderRadius: '50%'}}
                                  unoptimized
                              />
                          )}
                          <p>Connected with external wallet</p>
                          {walletAddress && (
                              <p style={{fontSize: '12px'}}>
                                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                              </p>
                          )}
                        </>
                    )}
                    <details>
                      <summary>Debug: User Object</summary>
                      <pre style={{fontSize: '12px', textAlign: 'left'}}>
                  {JSON.stringify(user, null, 2) || 'No user info (external wallet)'}
                </pre>
                    </details>
                  </div>

                  <div className={styles.actions}>
                    <button onClick={handleGetAccounts} className={styles.secondary}>
                      Get Wallet Address
                    </button>

                    <button onClick={handleGetBalance} className={styles.secondary}>
                      Get Balance
                    </button>

                    <button onClick={handleSignMessage} className={styles.secondary}>
                      Sign Message
                    </button>

                    <button onClick={handleLogout} className={styles.primary}>
                      Logout
                    </button>
                  </div>

                  {walletAddress && (
                      <div className={styles.result}>
                        <h3>Wallet Address:</h3>
                        <code>{walletAddress}</code>
                      </div>
                  )}

                  {balance && (
                      <div className={styles.result}>
                        <h3>Balance:</h3>
                        <code>{balance} ETH</code>
                      </div>
                  )}

                  {signature && (
                      <div className={styles.result}>
                        <h3>Signature:</h3>
                        <code style={{fontSize: '10px', wordBreak: 'break-all'}}>
                          {signature}
                        </code>
                      </div>
                  )}
                </div>
            )}
          </main>
        </div>
      </>
  );
}
