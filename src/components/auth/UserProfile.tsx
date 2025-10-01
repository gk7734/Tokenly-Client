'use client';

import React, { useState, useEffect } from 'react';
import { useWeb3Auth } from '@/contexts/Web3AuthContext';

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className = '' }) => {
  const { user, logout, getAccounts, getBalance, loading } = useWeb3Auth();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (user) {
        try {
          const accountsList = await getAccounts();
          const userBalance = await getBalance();
          setAccounts(accountsList);
          setBalance(userBalance);
        } catch (error) {
          console.error('Error fetching account info:', error);
        }
      }
    };

    fetchAccountInfo();
  }, [user, getAccounts, getBalance]);

  if (loading) {
    return <div className={`user-profile ${className}`}>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={`user-profile ${className}`}>
      <div className="user-info">
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-image"
            width={32}
            height={32}
          />
        )}
        <div className="user-details">
          <div className="user-name">
            {user.name || 'Anonymous'}
          </div>
          {accounts.length > 0 && (
            <div className="user-address">
              {shortenAddress(accounts[0])}
            </div>
          )}
          <div className="user-balance">
            {balance} ETH
          </div>
        </div>
      </div>
      <button
        onClick={logout}
        className="logout-button"
        type="button"
      >
        Disconnect
      </button>
    </div>
  );
};

export default UserProfile;