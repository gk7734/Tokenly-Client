'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useWeb3Auth } from '@/contexts/Web3AuthContext';
import styles from './page.module.css';

export default function Home() {
  const {
    loggedIn,
    loading,
    user,
    login,
    logout,
    getAccounts,
    getBalance,
    signMessage
  } = useWeb3Auth();

  const [accounts, setAccounts] = useState<string[]>([]);
  const [balance, setBalance] = useState<string>('');
  const [signature, setSignature] = useState<string>('');

  const handleLogin = async () => {
    await login();
  };

  // Generate avatar for external wallets
  const getAvatarUrl = (address: string) => {
    // Using DiceBear API for avatar generation
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`;
  };

  const handleLogout = async () => {
    await logout();
    setAccounts([]);
    setBalance('');
    setSignature('');
  };

  const handleGetAccounts = async () => {
    const accs = await getAccounts();
    setAccounts(accs);
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
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                  {user?.name && <p>Name: {user.name}</p>}
                  {user?.email && <p>Email: {user.email}</p>}
                  <p>Login Method: {(user as any)?.authConnection?.toUpperCase() || 'Social Login'}</p>
                  <p>User ID: {(user as any)?.userId || 'N/A'}</p>
                </>
              ) : (
                <>
                  {accounts.length > 0 && (
                    <Image
                      src={getAvatarUrl(accounts[0])}
                      alt="Wallet Avatar"
                      width={50}
                      height={50}
                      style={{ borderRadius: '50%' }}
                      unoptimized
                    />
                  )}
                  <p>Connected with external wallet</p>
                  {accounts.length > 0 && (
                    <p style={{ fontSize: '12px' }}>
                      {accounts[0].slice(0, 6)}...{accounts[0].slice(-4)}
                    </p>
                  )}
                </>
              )}
              <details>
                <summary>Debug: User Object</summary>
                <pre style={{ fontSize: '12px', textAlign: 'left' }}>
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

            {accounts.length > 0 && (
              <div className={styles.result}>
                <h3>Wallet Address:</h3>
                <code>{accounts[0]}</code>
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
                <code style={{ fontSize: '10px', wordBreak: 'break-all' }}>
                  {signature}
                </code>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
