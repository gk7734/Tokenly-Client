'use client';

import React from 'react';
import { useWeb3Auth } from '@/contexts/Web3AuthContext';

interface LoginButtonProps {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className = '' }) => {
  const { login, loading } = useWeb3Auth();

  return (
    <button
      onClick={login}
      disabled={loading}
      className={`login-button ${className}`}
      type="button"
    >
      {loading ? 'Loading...' : 'Connect Wallet'}
    </button>
  );
};

export default LoginButton;