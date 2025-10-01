'use client';

import React from 'react';
import { useWeb3Auth } from '@/contexts/Web3AuthContext';
import LoginButton from './LoginButton';
import UserProfile from './UserProfile';

interface AuthButtonProps {
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ className = '' }) => {
  const { loggedIn } = useWeb3Auth();

  return (
    <div className={`auth-button ${className}`}>
      {loggedIn ? (
        <UserProfile />
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default AuthButton;